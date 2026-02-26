import {
  type XdrLimits,
  type XdrReader,
  type XdrWriter,
  XdrReadError,
  XdrWriteError,
  base64ToBytes,
  decode,
  encode,
} from './codec.js'

const FRAME_LAST_FRAGMENT_MASK = 0x80000000
const FRAME_LENGTH_MASK = 0x7FFFFFFF

/**
 * Encode an XDR value using RFC5531 record marking.
 *
 * A framed record is one or more fragments:
 * - 4-byte big-endian header
 * - 31 low bits: fragment length
 * - high bit: last-fragment marker
 * - fragment payload bytes
 */
export function encodeFramed<T>(
  value: T,
  writeFn: (w: XdrWriter, value: T) => void,
): Uint8Array {
  const payload = encode(value, writeFn)
  if (payload.length > FRAME_LENGTH_MASK) {
    throw new XdrWriteError(
      `Framed payload exceeds max fragment size (${FRAME_LENGTH_MASK}): ${payload.length}`,
      'LENGTH_EXCEEDS_MAX',
    )
  }

  const out = new Uint8Array(4 + payload.length)
  const view = new DataView(out.buffer, out.byteOffset, out.byteLength)
  view.setUint32(0, FRAME_LAST_FRAGMENT_MASK | payload.length, false)
  out.set(payload, 4)
  return out
}

/**
 * Decode a single framed XDR record.
 * Throws if trailing bytes remain after the first record.
 */
export function decodeFramed<T>(
  input: Uint8Array | string,
  readFn: (r: XdrReader) => T,
  limits?: XdrLimits,
): T {
  const bytes = typeof input === 'string' ? base64ToBytes(input) : input
  const { payload, nextOffset } = readFramedRecord(bytes, 0)
  if (nextOffset !== bytes.length) {
    throw new XdrReadError(
      `Framed input not fully consumed: ${bytes.length - nextOffset} trailing bytes`,
      'BUFFER_NOT_FULLY_CONSUMED',
    )
  }
  return decode(payload, readFn, limits)
}

/**
 * Decode a byte stream containing multiple framed records.
 * Returns values lazily as each record is reassembled and decoded.
 */
export function* decodeFramedStream<T>(
  input: Uint8Array | string,
  readFn: (r: XdrReader) => T,
  limits?: XdrLimits,
): Generator<T, void, undefined> {
  const bytes = typeof input === 'string' ? base64ToBytes(input) : input
  let offset = 0
  while (offset < bytes.length) {
    const { payload, nextOffset } = readFramedRecord(bytes, offset)
    yield decode(payload, readFn, limits)
    offset = nextOffset
  }
}

function readFramedRecord(
  bytes: Uint8Array,
  startOffset: number,
): { payload: Uint8Array; nextOffset: number } {
  let offset = startOffset
  const fragments: Uint8Array[] = []
  let totalLength = 0

  while (true) {
    if (offset + 4 > bytes.length) {
      throw new XdrReadError(
        `Unexpected end of framed input at header offset ${offset}`,
        'BUFFER_UNDERFLOW',
      )
    }

    const view = new DataView(bytes.buffer, bytes.byteOffset + offset, 4)
    const header = view.getUint32(0, false)
    const isLast = (header & FRAME_LAST_FRAGMENT_MASK) !== 0
    const len = header & FRAME_LENGTH_MASK
    offset += 4

    if (offset + len > bytes.length) {
      throw new XdrReadError(
        `Unexpected end of framed input: fragment length ${len} exceeds remaining ${bytes.length - offset}`,
        'BUFFER_UNDERFLOW',
      )
    }

    const fragment = bytes.subarray(offset, offset + len)
    fragments.push(fragment)
    totalLength += len
    offset += len

    if (isLast) break
  }

  const payload = concatFragments(fragments, totalLength)
  return { payload, nextOffset: offset }
}

function concatFragments(fragments: Uint8Array[], totalLength: number): Uint8Array {
  if (fragments.length === 0) return new Uint8Array(0)
  if (fragments.length === 1) return fragments[0]!.slice()

  const out = new Uint8Array(totalLength)
  let offset = 0
  for (const fragment of fragments) {
    out.set(fragment, offset)
    offset += fragment.length
  }
  return out
}
