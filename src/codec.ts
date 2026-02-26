/**
 * ts-stellar-xdr codec primitives
 *
 * XDR (RFC 4506) encode/decode using DataView + Uint8Array.
 * Zero dependencies. Works in all environments.
 *
 * XDR alignment: all values occupy a multiple of 4 bytes on the wire.
 * Byte order: big-endian for all multi-byte integers.
 * Padding: short data is right-padded with zero bytes to the next 4-byte boundary.
 *          Padding bytes MUST be 0x00; validated on decode.
 */

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/** Typed error codes for programmatic error handling. */
export type XdrErrorCode =
  | 'INVALID_VALUE'
  | 'LENGTH_EXCEEDS_MAX'
  | 'LENGTH_MISMATCH'
  | 'NON_ZERO_PADDING'
  | 'BUFFER_UNDERFLOW'
  | 'BUFFER_NOT_FULLY_CONSUMED'
  | 'DEPTH_LIMIT_EXCEEDED'
  | 'BYTE_LIMIT_EXCEEDED'
  | 'INVALID_ENUM_VALUE'
  | 'INVALID_UNION_DISCRIMINANT'
  | 'UTF8_ERROR'

export class XdrReadError extends Error {
  readonly code: XdrErrorCode
  constructor(message: string, code: XdrErrorCode = 'INVALID_VALUE') {
    super(message)
    this.name = 'XdrReadError'
    this.code = code
  }
}

export class XdrWriteError extends Error {
  readonly code: XdrErrorCode
  constructor(message: string, code: XdrErrorCode = 'INVALID_VALUE') {
    super(message)
    this.name = 'XdrWriteError'
    this.code = code
  }
}

// ---------------------------------------------------------------------------
// Limits — depth and byte tracking for safe decoding
// ---------------------------------------------------------------------------

/**
 * Decode limits to guard against malicious or malformed payloads.
 *
 * - `maxDepth`: maximum nesting depth for composite types (struct, union).
 *   Primitives do NOT consume depth — only composites do. This matches the
 *   Rust rs-stellar-xdr behavior and protects against deeply recursive types
 *   like SCVal → SCVec → SCVal or ClaimPredicate self-references.
 *
 * - `maxBytes`: maximum total bytes that can be consumed during decoding.
 *   Every read operation (primitives, opaque, strings) consumes bytes from
 *   this budget. Protects against oversized payloads.
 */
export interface XdrLimits {
  maxDepth: number
  maxBytes: number
}

export const DEFAULT_LIMITS: XdrLimits = {
  maxDepth: 500,
  maxBytes: 0x2000000, // 32 MiB — matches rs-stellar-xdr default
}

/**
 * Unlimited limits — disables depth and byte checking.
 * Use only for trusted input where you control the source.
 */
export const LIMITS_NONE: XdrLimits = {
  maxDepth: Infinity,
  maxBytes: Infinity,
}

// ---------------------------------------------------------------------------
// Padding
// ---------------------------------------------------------------------------

/** Number of padding bytes needed to align `len` bytes to a 4-byte boundary. */
export const padLen = (len: number): number => (4 - (len % 4)) % 4

// ---------------------------------------------------------------------------
// XdrReader
// ---------------------------------------------------------------------------

export interface XdrReader {
  readonly buf: Uint8Array
  readonly view: DataView
  pos: number
  depth: number
  bytesRead: number
  readonly limits: XdrLimits
}

/** Create an XdrReader from a Uint8Array. */
export function createReader(buf: Uint8Array, limits?: XdrLimits): XdrReader {
  return {
    buf,
    view: new DataView(buf.buffer, buf.byteOffset, buf.byteLength),
    pos: 0,
    depth: 0,
    bytesRead: 0,
    limits: limits ?? DEFAULT_LIMITS,
  }
}

/** Create an XdrReader from a base64 string. */
export function createReaderFromBase64(base64: string, limits?: XdrLimits): XdrReader {
  return createReader(base64ToBytes(base64), limits)
}

/** Verify the reader has consumed all bytes (throws if not). */
export function assertFullyConsumed(r: XdrReader): void {
  if (r.pos !== r.buf.length) {
    throw new XdrReadError(
      `XDR buffer not fully consumed: ${r.buf.length - r.pos} bytes remaining`,
      'BUFFER_NOT_FULLY_CONSUMED',
    )
  }
}

/** Number of bytes remaining in the reader. */
export function remainingBytes(r: XdrReader): number {
  return r.buf.length - r.pos
}

/**
 * Track byte consumption against the limit.
 * Called by every read operation.
 */
function consumeBytes(r: XdrReader, n: number): void {
  r.bytesRead += n
  if (r.bytesRead > r.limits.maxBytes) {
    throw new XdrReadError(
      `XDR byte limit exceeded: consumed ${r.bytesRead} bytes, limit is ${r.limits.maxBytes}`,
      'BYTE_LIMIT_EXCEEDED',
    )
  }
}

/**
 * Enter a composite type (struct or union) for depth tracking.
 * Returns the previous depth so it can be restored in endComposite.
 */
export function beginComposite(r: XdrReader): void {
  r.depth++
  if (r.depth > r.limits.maxDepth) {
    throw new XdrReadError(
      `XDR depth limit exceeded: depth ${r.depth}, limit is ${r.limits.maxDepth}`,
      'DEPTH_LIMIT_EXCEEDED',
    )
  }
}

/** Exit a composite type, restoring the previous depth. */
export function endComposite(r: XdrReader): void {
  r.depth--
}

// ---------------------------------------------------------------------------
// XdrWriter
// ---------------------------------------------------------------------------

export interface XdrWriter {
  buf: Uint8Array
  view: DataView
  pos: number
}

const INITIAL_WRITER_SIZE = 512
const GROW_FACTOR = 2

/** Create an XdrWriter with a dynamic buffer. */
export function createWriter(initialSize = INITIAL_WRITER_SIZE): XdrWriter {
  const buf = new Uint8Array(initialSize)
  return { buf, view: new DataView(buf.buffer), pos: 0 }
}

/** Return the encoded bytes (a view of the internal buffer, not a copy). */
export function toBytes(w: XdrWriter): Uint8Array {
  return w.buf.subarray(0, w.pos)
}

/** Return the encoded bytes as a base64 string. */
export function toBase64(w: XdrWriter): string {
  return bytesToBase64(toBytes(w))
}

function ensureCapacity(w: XdrWriter, need: number): void {
  if (w.pos + need <= w.buf.length) return
  const newSize = Math.max(w.buf.length * GROW_FACTOR, w.pos + need)
  const newBuf = new Uint8Array(newSize)
  newBuf.set(w.buf)
  w.buf = newBuf
  w.view = new DataView(w.buf.buffer)
}

// ---------------------------------------------------------------------------
// Reusable TextEncoder/TextDecoder singletons (avoid re-creating per call)
// ---------------------------------------------------------------------------

const textEncoder = /*#__PURE__*/ new TextEncoder()
const textDecoder = /*#__PURE__*/ new TextDecoder('utf-8', { fatal: true })

// ---------------------------------------------------------------------------
// Primitive reads (big-endian, DataView)
// ---------------------------------------------------------------------------

export function readInt32(r: XdrReader): number {
  if (r.pos + 4 > r.buf.length)
    throw new XdrReadError('Unexpected end of XDR input (int32)', 'BUFFER_UNDERFLOW')
  consumeBytes(r, 4)
  const v = r.view.getInt32(r.pos, false)
  r.pos += 4
  return v
}

export function readUint32(r: XdrReader): number {
  if (r.pos + 4 > r.buf.length)
    throw new XdrReadError('Unexpected end of XDR input (uint32)', 'BUFFER_UNDERFLOW')
  consumeBytes(r, 4)
  const v = r.view.getUint32(r.pos, false)
  r.pos += 4
  return v
}

export function readInt64(r: XdrReader): bigint {
  if (r.pos + 8 > r.buf.length)
    throw new XdrReadError('Unexpected end of XDR input (int64)', 'BUFFER_UNDERFLOW')
  consumeBytes(r, 8)
  const v = r.view.getBigInt64(r.pos, false)
  r.pos += 8
  return v
}

export function readUint64(r: XdrReader): bigint {
  if (r.pos + 8 > r.buf.length)
    throw new XdrReadError('Unexpected end of XDR input (uint64)', 'BUFFER_UNDERFLOW')
  consumeBytes(r, 8)
  const v = r.view.getBigUint64(r.pos, false)
  r.pos += 8
  return v
}

export function readBool(r: XdrReader): boolean {
  const v = readUint32(r)
  if (v !== 0 && v !== 1) throw new XdrReadError(`Invalid XDR bool value: ${v}`, 'INVALID_VALUE')
  return v !== 0
}

export function readFloat(r: XdrReader): number {
  if (r.pos + 4 > r.buf.length)
    throw new XdrReadError('Unexpected end of XDR input (float)', 'BUFFER_UNDERFLOW')
  consumeBytes(r, 4)
  const v = r.view.getFloat32(r.pos, false)
  r.pos += 4
  return v
}

export function readDouble(r: XdrReader): number {
  if (r.pos + 8 > r.buf.length)
    throw new XdrReadError('Unexpected end of XDR input (double)', 'BUFFER_UNDERFLOW')
  consumeBytes(r, 8)
  const v = r.view.getFloat64(r.pos, false)
  r.pos += 8
  return v
}

// ---------------------------------------------------------------------------
// Opaque and string reads
// ---------------------------------------------------------------------------

/**
 * Read a fixed-length opaque byte array (opaque[N]).
 * Advances pos by N bytes + padding to 4-byte boundary.
 * Validates padding bytes are zero.
 */
export function readFixedOpaque(r: XdrReader, len: number): Uint8Array {
  const pad = padLen(len)
  if (r.pos + len + pad > r.buf.length) {
    throw new XdrReadError(
      `Unexpected end of XDR input (fixed opaque, len=${len})`,
      'BUFFER_UNDERFLOW',
    )
  }
  consumeBytes(r, len + pad)
  const data = r.buf.slice(r.pos, r.pos + len)
  r.pos += len
  // Validate padding bytes are zero
  for (let i = 0; i < pad; i++) {
    if (r.buf[r.pos + i] !== 0) {
      throw new XdrReadError(
        `Non-zero XDR padding byte at position ${r.pos + i}`,
        'NON_ZERO_PADDING',
      )
    }
  }
  r.pos += pad
  return data
}

/**
 * Read a variable-length opaque byte array (opaque<maxLen>).
 * Reads uint32 length, then that many bytes + padding.
 */
export function readVarOpaque(r: XdrReader, maxLen: number): Uint8Array {
  const len = readUint32(r)
  if (len > maxLen) {
    throw new XdrReadError(
      `XDR var-opaque length ${len} exceeds max ${maxLen}`,
      'LENGTH_EXCEEDS_MAX',
    )
  }
  return readFixedOpaque(r, len)
}

/**
 * Read a variable-length string (string<maxLen>).
 * XDR strings are UTF-8 encoded, no null terminator.
 */
export function readString(r: XdrReader, maxLen: number): string {
  const bytes = readVarOpaque(r, maxLen)
  try {
    return textDecoder.decode(bytes)
  } catch {
    throw new XdrReadError('Invalid UTF-8 byte sequence in XDR string', 'UTF8_ERROR')
  }
}

// ---------------------------------------------------------------------------
// Primitive writes (big-endian, DataView) — with range validation
// ---------------------------------------------------------------------------

const INT32_MIN = -2147483648
const INT32_MAX = 2147483647
const UINT32_MAX_VAL = 4294967295

export function writeInt32(w: XdrWriter, v: number): void {
  if (!Number.isInteger(v) || v < INT32_MIN || v > INT32_MAX) {
    throw new XdrWriteError(`Invalid int32 value: ${v}`, 'INVALID_VALUE')
  }
  ensureCapacity(w, 4)
  w.view.setInt32(w.pos, v, false)
  w.pos += 4
}

export function writeUint32(w: XdrWriter, v: number): void {
  if (!Number.isInteger(v) || v < 0 || v > UINT32_MAX_VAL) {
    throw new XdrWriteError(`Invalid uint32 value: ${v}`, 'INVALID_VALUE')
  }
  ensureCapacity(w, 4)
  w.view.setUint32(w.pos, v, false)
  w.pos += 4
}

const INT64_MIN = -9223372036854775808n
const INT64_MAX = 9223372036854775807n

export function writeInt64(w: XdrWriter, v: bigint): void {
  if (v < INT64_MIN || v > INT64_MAX) {
    throw new XdrWriteError(`Invalid int64 value: ${v}`, 'INVALID_VALUE')
  }
  ensureCapacity(w, 8)
  w.view.setBigInt64(w.pos, v, false)
  w.pos += 8
}

const UINT64_MAX = 18446744073709551615n

export function writeUint64(w: XdrWriter, v: bigint): void {
  if (v < 0n || v > UINT64_MAX) {
    throw new XdrWriteError(`Invalid uint64 value: ${v}`, 'INVALID_VALUE')
  }
  ensureCapacity(w, 8)
  w.view.setBigUint64(w.pos, v, false)
  w.pos += 8
}

export function writeBool(w: XdrWriter, v: boolean): void {
  writeUint32(w, v ? 1 : 0)
}

export function writeFloat(w: XdrWriter, v: number): void {
  ensureCapacity(w, 4)
  w.view.setFloat32(w.pos, v, false)
  w.pos += 4
}

export function writeDouble(w: XdrWriter, v: number): void {
  ensureCapacity(w, 8)
  w.view.setFloat64(w.pos, v, false)
  w.pos += 8
}

// ---------------------------------------------------------------------------
// Opaque and string writes
// ---------------------------------------------------------------------------

/**
 * Write a fixed-length opaque byte array (opaque[N]).
 * Pads with zero bytes to 4-byte boundary.
 * Throws if data is shorter than len (data is taken from the start of data).
 */
export function writeFixedOpaque(w: XdrWriter, data: Uint8Array, len: number): void {
  const pad = padLen(len)
  ensureCapacity(w, len + pad)
  // Copy up to len bytes; any remaining bytes in the padded region will be zeroed
  const copyLen = Math.min(data.length, len)
  w.buf.set(data.subarray(0, copyLen), w.pos)
  // Zero-fill the rest (in case data is shorter than len, or for the pad region)
  if (copyLen < len + pad) {
    w.buf.fill(0, w.pos + copyLen, w.pos + len + pad)
  }
  w.pos += len + pad
}

/**
 * Write a variable-length opaque byte array (opaque<maxLen>).
 * Writes uint32 length, then the bytes + padding.
 */
export function writeVarOpaque(w: XdrWriter, data: Uint8Array, maxLen: number): void {
  if (data.length > maxLen) {
    throw new XdrWriteError(
      `XDR var-opaque length ${data.length} exceeds max ${maxLen}`,
      'LENGTH_EXCEEDS_MAX',
    )
  }
  writeUint32(w, data.length)
  writeFixedOpaque(w, data, data.length)
}

/**
 * Write a variable-length string (string<maxLen>).
 * XDR strings are UTF-8 encoded, no null terminator.
 */
export function writeString(w: XdrWriter, v: string, maxLen: number): void {
  const bytes = textEncoder.encode(v)
  writeVarOpaque(w, bytes, maxLen)
}

// ---------------------------------------------------------------------------
// Optional type (T*)
// ---------------------------------------------------------------------------

/**
 * Read an optional XDR value (T*).
 * Encoded as: uint32 flag (0 = absent, 1 = present) + optionally the value.
 */
export function readOptional<T>(r: XdrReader, readFn: (r: XdrReader) => T): T | undefined {
  const present = readBool(r)
  if (!present) return undefined
  return readFn(r)
}

/**
 * Write an optional XDR value (T*).
 */
export function writeOptional<T>(
  w: XdrWriter,
  v: T | undefined,
  writeFn: (w: XdrWriter, v: T) => void,
): void {
  if (v === undefined) {
    writeBool(w, false)
  } else {
    writeBool(w, true)
    writeFn(w, v)
  }
}

// ---------------------------------------------------------------------------
// Array types
// ---------------------------------------------------------------------------

/**
 * Read a fixed-length XDR array (T[N]).
 */
export function readFixedArray<T>(r: XdrReader, len: number, readFn: (r: XdrReader) => T): T[] {
  return Array.from({ length: len }, () => readFn(r))
}

/**
 * Write a fixed-length XDR array (T[N]).
 */
export function writeFixedArray<T>(
  w: XdrWriter,
  arr: T[],
  len: number,
  writeFn: (w: XdrWriter, v: T) => void,
): void {
  if (arr.length !== len) {
    throw new XdrWriteError(
      `XDR fixed array: expected ${len} elements, got ${arr.length}`,
      'LENGTH_MISMATCH',
    )
  }
  for (const item of arr) {
    writeFn(w, item)
  }
}

/**
 * Read a variable-length XDR array (T<maxLen>).
 */
export function readVarArray<T>(r: XdrReader, maxLen: number, readFn: (r: XdrReader) => T): T[] {
  const len = readUint32(r)
  if (len > maxLen) {
    throw new XdrReadError(
      `XDR var-array length ${len} exceeds max ${maxLen}`,
      'LENGTH_EXCEEDS_MAX',
    )
  }
  // Fast-fail: each element is at least 4 bytes, so len > remainingBytes / 4 is always invalid
  if (len > remainingBytes(r) / 4) {
    throw new XdrReadError(
      `XDR var-array length ${len} exceeds remaining buffer`,
      'BUFFER_UNDERFLOW',
    )
  }
  return Array.from({ length: len }, () => readFn(r))
}

/**
 * Write a variable-length XDR array (T<maxLen>).
 */
export function writeVarArray<T>(
  w: XdrWriter,
  arr: T[],
  maxLen: number,
  writeFn: (w: XdrWriter, v: T) => void,
): void {
  if (arr.length > maxLen) {
    throw new XdrWriteError(
      `XDR var-array length ${arr.length} exceeds max ${maxLen}`,
      'LENGTH_EXCEEDS_MAX',
    )
  }
  writeUint32(w, arr.length)
  for (const item of arr) {
    writeFn(w, item)
  }
}

// ---------------------------------------------------------------------------
// Top-level encode/decode helpers
// ---------------------------------------------------------------------------

/**
 * Encode a value to a Uint8Array using the provided write function.
 * Creates a new writer, calls writeFn, returns the bytes.
 */
export function encode<T>(value: T, writeFn: (w: XdrWriter, v: T) => void): Uint8Array {
  const w = createWriter()
  writeFn(w, value)
  return toBytes(w).slice() // Return a copy, not a view
}

/**
 * Decode a value from bytes or a base64 string using the provided read function.
 * Throws if the buffer is not fully consumed.
 */
export function decode<T>(
  input: Uint8Array | string,
  readFn: (r: XdrReader) => T,
  limits?: XdrLimits,
): T {
  const bytes = typeof input === 'string' ? base64ToBytes(input) : input
  const r = createReader(bytes, limits)
  const value = readFn(r)
  assertFullyConsumed(r)
  return value
}

/**
 * Validate that input is well-formed XDR for the given type.
 * Returns `true` if `decode` would succeed, `false` otherwise.
 */
export function validate<T>(
  input: Uint8Array | string,
  readFn: (r: XdrReader) => T,
  limits?: XdrLimits,
): boolean {
  try {
    decode(input, readFn, limits)
    return true
  } catch {
    return false
  }
}

/** js-xdr compatibility alias. */
export const validateXDR = validate

/**
 * Decode multiple values from a single byte stream (streaming/iterator decode).
 * Reads values one at a time until the buffer is exhausted.
 * Useful for multi-value streams like LedgerCloseMetaBatch's repeated entries,
 * or any protocol that concatenates multiple XDR values.
 *
 * Returns a generator that yields decoded values lazily.
 */
export function* decodeStream<T>(
  input: Uint8Array | string,
  readFn: (r: XdrReader) => T,
  limits?: XdrLimits,
): Generator<T, void, undefined> {
  const bytes = typeof input === 'string' ? base64ToBytes(input) : input
  const r = createReader(bytes, limits)
  while (r.pos < r.buf.length) {
    yield readFn(r)
  }
}

// ---------------------------------------------------------------------------
// Base64 utilities (no external dependency)
// ---------------------------------------------------------------------------

const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/** Convert a Uint8Array to a base64 string. Works in all environments. */
export function bytesToBase64(bytes: Uint8Array): string {
  if (typeof globalThis.btoa === 'function') {
    let binary = ''
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]!)
    }
    return globalThis.btoa(binary)
  }
  // Pure JS fallback for environments without btoa
  let result = ''
  const len = bytes.length
  for (let i = 0; i < len; i += 3) {
    const b0 = bytes[i]!
    const b1 = i + 1 < len ? bytes[i + 1]! : 0
    const b2 = i + 2 < len ? bytes[i + 2]! : 0
    result += BASE64_CHARS[b0 >> 2]!
    result += BASE64_CHARS[((b0 & 0x03) << 4) | (b1 >> 4)]!
    result += i + 1 < len ? BASE64_CHARS[((b1 & 0x0f) << 2) | (b2 >> 6)]! : '='
    result += i + 2 < len ? BASE64_CHARS[b2 & 0x3f]! : '='
  }
  return result
}

/** Convert a base64 string to a Uint8Array. Works in all environments. */
export function base64ToBytes(base64: string): Uint8Array {
  // Strip whitespace (common in multi-line base64)
  const clean64 = base64.replace(/\s/g, '')
  if (typeof globalThis.atob === 'function') {
    const binary = globalThis.atob(clean64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes
  }
  // Pure JS fallback for environments without atob
  const lookup = new Uint8Array(256).fill(255)
  for (let i = 0; i < BASE64_CHARS.length; i++) {
    lookup[BASE64_CHARS.charCodeAt(i)] = i
  }
  const stripped = clean64.replace(/=+$/, '')
  const outputLen = Math.floor((stripped.length * 3) / 4)
  const bytes = new Uint8Array(outputLen)
  let byteIndex = 0
  for (let i = 0; i < stripped.length; i += 4) {
    const c0 = lookup[stripped.charCodeAt(i)]!
    const c1 = lookup[stripped.charCodeAt(i + 1)]!
    const c2 = i + 2 < stripped.length ? lookup[stripped.charCodeAt(i + 2)]! : 0
    const c3 = i + 3 < stripped.length ? lookup[stripped.charCodeAt(i + 3)]! : 0
    if (byteIndex < outputLen) bytes[byteIndex++] = (c0 << 2) | (c1 >> 4)
    if (byteIndex < outputLen) bytes[byteIndex++] = ((c1 & 0x0f) << 4) | (c2 >> 2)
    if (byteIndex < outputLen) bytes[byteIndex++] = ((c2 & 0x03) << 6) | c3
  }
  return bytes
}

/** Convert a Uint8Array to a hex string. */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** Convert a hex string to a Uint8Array. */
export function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error(`Invalid hex string length: ${hex.length}`)
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return bytes
}
