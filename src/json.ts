/**
 * JSON serialization runtime helpers for Stellar XDR types.
 *
 * These helpers are used by the generated toJson/fromJson functions to handle
 * types that need special encoding: Int128/Int256 parts as decimal strings,
 * AssetCode as escaped ASCII strings (SEP-0051), and XDR strings with
 * byte-level ASCII escaping.
 */

const MASK64 = 0xffffffffffffffffn
const MIN_I128 = -(1n << 127n)
const MAX_I128 = (1n << 127n) - 1n
const MAX_U128 = (1n << 128n) - 1n
const MIN_I256 = -(1n << 255n)
const MAX_I256 = (1n << 255n) - 1n
const MAX_U256 = (1n << 256n) - 1n
const MIN_I64 = -(1n << 63n)
const MAX_I64 = (1n << 63n) - 1n
const MAX_U64 = (1n << 64n) - 1n
const MIN_I32 = -0x80000000
const MAX_I32 = 0x7fffffff
const MAX_U32 = 0xffffffff

function assertRange(name: string, value: bigint, min: bigint, max: bigint): void {
  if (value < min || value > max) {
    throw new RangeError(`${name} out of range: ${value} not in [${min}, ${max}]`)
  }
}

// ---------------------------------------------------------------------------
// Int128Parts ↔ decimal string
// ---------------------------------------------------------------------------

export function int128PartsToDecimal(hi: bigint, lo: bigint): string {
  return ((hi << 64n) | (lo & MASK64)).toString()
}

export function decimalToInt128Parts(s: string | number): [hi: bigint, lo: bigint] {
  const v = BigInt(s)
  assertRange('Int128Parts', v, MIN_I128, MAX_I128)
  const lo = v & MASK64
  let hi = (v >> 64n) & MASK64
  // Sign-extend hi to int64 range
  if (hi >= 0x8000000000000000n) hi -= 0x10000000000000000n
  return [hi, lo]
}

// ---------------------------------------------------------------------------
// UInt128Parts ↔ decimal string
// ---------------------------------------------------------------------------

export function uint128PartsToDecimal(hi: bigint, lo: bigint): string {
  return ((hi << 64n) | lo).toString()
}

export function decimalToUint128Parts(s: string | number): [hi: bigint, lo: bigint] {
  const v = BigInt(s)
  assertRange('UInt128Parts', v, 0n, MAX_U128)
  return [(v >> 64n) & MASK64, v & MASK64]
}

// ---------------------------------------------------------------------------
// Int256Parts ↔ decimal string
// ---------------------------------------------------------------------------

export function int256PartsToDecimal(
  hiHi: bigint,
  hiLo: bigint,
  loHi: bigint,
  loLo: bigint,
): string {
  return (
    (hiHi << 192n) |
    ((hiLo & MASK64) << 128n) |
    ((loHi & MASK64) << 64n) |
    (loLo & MASK64)
  ).toString()
}

export function decimalToInt256Parts(
  s: string | number,
): [hiHi: bigint, hiLo: bigint, loHi: bigint, loLo: bigint] {
  const v = BigInt(s)
  assertRange('Int256Parts', v, MIN_I256, MAX_I256)
  const loLo = v & MASK64
  const loHi = (v >> 64n) & MASK64
  const hiLo = (v >> 128n) & MASK64
  let hiHi = (v >> 192n) & MASK64
  if (hiHi >= 0x8000000000000000n) hiHi -= 0x10000000000000000n
  return [hiHi, hiLo, loHi, loLo]
}

// ---------------------------------------------------------------------------
// UInt256Parts ↔ decimal string
// ---------------------------------------------------------------------------

export function uint256PartsToDecimal(
  hiHi: bigint,
  hiLo: bigint,
  loHi: bigint,
  loLo: bigint,
): string {
  return ((hiHi << 192n) | (hiLo << 128n) | (loHi << 64n) | loLo).toString()
}

export function decimalToUint256Parts(
  s: string | number,
): [hiHi: bigint, hiLo: bigint, loHi: bigint, loLo: bigint] {
  const v = BigInt(s)
  assertRange('UInt256Parts', v, 0n, MAX_U256)
  return [(v >> 192n) & MASK64, (v >> 128n) & MASK64, (v >> 64n) & MASK64, v & MASK64]
}

// ---------------------------------------------------------------------------
// SEP-0051 byte-level ASCII escaping (§String)
// ---------------------------------------------------------------------------

const _encoder = /*#__PURE__*/ new TextEncoder()
const _decoder = /*#__PURE__*/ new TextDecoder('utf-8', { fatal: true })

/**
 * Escape raw bytes per SEP-0051 §String.
 *
 * Each byte is encoded as:
 * - 0x00 (NUL) → \0
 * - 0x09 (TAB) → \t
 * - 0x0A (LF)  → \n
 * - 0x0D (CR)  → \r
 * - 0x5C (\)   → \\
 * - 0x20..0x7E (printable ASCII, except \) → literal char
 * - Everything else → \xNN
 */
function escapeBytesToAscii(bytes: Uint8Array): string {
  let result = ''
  for (const b of bytes) {
    switch (b) {
      case 0x00:
        result += '\\0'
        break
      case 0x09:
        result += '\\t'
        break
      case 0x0a:
        result += '\\n'
        break
      case 0x0d:
        result += '\\r'
        break
      case 0x5c:
        result += '\\\\'
        break
      default:
        if (b >= 0x20 && b <= 0x7e) {
          result += String.fromCharCode(b)
        } else {
          result += `\\x${b.toString(16).padStart(2, '0')}`
        }
    }
  }
  return result
}

/**
 * Parse SEP-0051 escape sequences back to raw bytes.
 */
function hexValue(byte: number): number {
  if (byte >= 0x30 && byte <= 0x39) return byte - 0x30 // 0-9
  if (byte >= 0x41 && byte <= 0x46) return byte - 0x41 + 10 // A-F
  if (byte >= 0x61 && byte <= 0x66) return byte - 0x61 + 10 // a-f
  return -1
}

function unescapeAsciiToBytes(s: string): Uint8Array {
  // Parse escapes over UTF-8 bytes so literal non-ASCII input remains byte-accurate.
  const source = _encoder.encode(s)
  const bytes: number[] = []

  for (let i = 0; i < source.length; i++) {
    const b = source[i]!

    if (b !== 0x5c) {
      bytes.push(b)
      continue
    }

    if (i + 1 >= source.length) {
      throw new Error('Invalid escape sequence: trailing backslash')
    }

    const next = source[++i]!
    switch (next) {
      case 0x30: // 0
        bytes.push(0x00)
        break
      case 0x74: // t
        bytes.push(0x09)
        break
      case 0x6e: // n
        bytes.push(0x0a)
        break
      case 0x72: // r
        bytes.push(0x0d)
        break
      case 0x5c: // \
        bytes.push(0x5c)
        break
      case 0x78: {
        // x
        if (i + 2 >= source.length) {
          throw new Error('Invalid \\x escape sequence: expected two hex digits')
        }
        const hi = hexValue(source[++i]!)
        const lo = hexValue(source[++i]!)
        if (hi === -1 || lo === -1) {
          throw new Error('Invalid \\x escape sequence: expected hex digits')
        }
        bytes.push((hi << 4) | lo)
        break
      }
      default:
        throw new Error(`Invalid escape sequence: \\${String.fromCharCode(next)}`)
    }
  }

  return new Uint8Array(bytes)
}

// ---------------------------------------------------------------------------
// XDR String ↔ SEP-0051 escaped string
// ---------------------------------------------------------------------------

/**
 * Escape a JS string to SEP-0051 XDR-JSON string format.
 * Re-encodes the string to UTF-8 bytes, then applies byte-level ASCII escaping.
 * For pure printable ASCII (the common case), returns the string unchanged.
 */
export function escapeXdrString(s: string): string {
  const bytes = _encoder.encode(s)
  return escapeBytesToAscii(bytes)
}

/**
 * Unescape a SEP-0051 XDR-JSON string back to a JS string.
 * Parses escape sequences to raw bytes, then decodes as UTF-8.
 */
export function unescapeXdrString(s: string): string {
  const bytes = unescapeAsciiToBytes(s)
  return _decoder.decode(bytes)
}

// ---------------------------------------------------------------------------
// AssetCode ↔ SEP-0051 escaped ASCII string
// ---------------------------------------------------------------------------

/**
 * Escape AssetCode4 bytes to SEP-0051 string.
 * Trims all trailing null bytes, then applies ASCII escaping.
 */
export function escapeAssetCode4(bytes: Uint8Array): string {
  let end = bytes.length
  while (end > 0 && bytes[end - 1] === 0) end--
  return escapeBytesToAscii(bytes.subarray(0, end))
}

/**
 * Escape AssetCode12 bytes to SEP-0051 string.
 * Trims trailing null bytes but keeps at least 5 bytes (to distinguish from AssetCode4),
 * then applies ASCII escaping.
 */
export function escapeAssetCode12(bytes: Uint8Array): string {
  let end = bytes.length
  while (end > 5 && bytes[end - 1] === 0) end--
  return escapeBytesToAscii(bytes.subarray(0, end))
}

/**
 * Unescape a SEP-0051 asset code string back to a fixed-size Uint8Array.
 * Parses escape sequences to raw bytes, then pads with null bytes to `len`.
 */
export function unescapeAssetCode(s: string, len: number): Uint8Array {
  const raw = unescapeAsciiToBytes(s)
  if (raw.length > len) {
    throw new RangeError(`Decoded asset code is ${raw.length} bytes, max is ${len}`)
  }
  const result = new Uint8Array(len)
  result.set(raw)
  return result
}

/**
 * Count the number of raw bytes represented by an escaped asset code string.
 * Used to discriminate between AssetCode4 (≤4 bytes) and AssetCode12 (≥5 bytes).
 */
export function assetCodeByteLength(s: string): number {
  return unescapeAsciiToBytes(s).length
}

// ---------------------------------------------------------------------------
// Union discriminant key extraction (SEP-0051 §JSON Schema)
// ---------------------------------------------------------------------------

function jsonTypeOf(value: unknown): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

export function parseJsonObject(json: unknown): Record<string, unknown> {
  if (json === null || typeof json !== 'object' || Array.isArray(json)) {
    throw new Error(`Expected JSON object, got ${jsonTypeOf(json)}`)
  }
  return json as Record<string, unknown>
}

export function parseJsonArray(json: unknown): unknown[] {
  if (!Array.isArray(json)) {
    throw new Error(`Expected JSON array, got ${jsonTypeOf(json)}`)
  }
  return json
}

export function parseJsonFixedArray(json: unknown, len: number): unknown[] {
  const arr = parseJsonArray(json)
  if (arr.length !== len) {
    throw new Error(`Expected JSON array length ${len}, got ${arr.length}`)
  }
  return arr
}

export function parseJsonVarArray(json: unknown, maxLen: number): unknown[] {
  const arr = parseJsonArray(json)
  if (arr.length > maxLen) {
    throw new Error(`Expected JSON array length <= ${maxLen}, got ${arr.length}`)
  }
  return arr
}

export function parseJsonString(json: unknown): string {
  if (typeof json !== 'string') {
    throw new Error(`Expected JSON string, got ${jsonTypeOf(json)}`)
  }
  return json
}

export function parseJsonBool(json: unknown): boolean {
  if (typeof json !== 'boolean') {
    throw new Error(`Expected JSON boolean, got ${jsonTypeOf(json)}`)
  }
  return json
}

function parseJsonNumber(json: unknown): number {
  if (typeof json !== 'number' || !Number.isFinite(json)) {
    throw new Error(`Expected finite JSON number, got ${jsonTypeOf(json)}`)
  }
  return json
}

export function parseJsonInt32(json: unknown): number {
  const n = parseJsonNumber(json)
  if (!Number.isInteger(n) || n < MIN_I32 || n > MAX_I32) {
    throw new Error(`Expected int32 JSON number, got ${n}`)
  }
  return n
}

export function parseJsonUint32(json: unknown): number {
  const n = parseJsonNumber(json)
  if (!Number.isInteger(n) || n < 0 || n > MAX_U32) {
    throw new Error(`Expected uint32 JSON number, got ${n}`)
  }
  return n
}

export function parseJsonFloat(json: unknown): number {
  return parseJsonNumber(json)
}

export function parseJsonDouble(json: unknown): number {
  return parseJsonNumber(json)
}

function parseJsonBigInt(json: unknown): bigint {
  if (typeof json === 'string') {
    if (!/^-?\d+$/.test(json)) {
      throw new Error(`Expected integer JSON string, got ${JSON.stringify(json)}`)
    }
    return BigInt(json)
  }
  if (typeof json === 'number') {
    if (!Number.isSafeInteger(json)) {
      throw new Error(`Expected safe integer JSON number, got ${json}`)
    }
    return BigInt(json)
  }
  throw new Error(`Expected integer JSON string/number, got ${jsonTypeOf(json)}`)
}

export function parseJsonInt64(json: unknown): bigint {
  const v = parseJsonBigInt(json)
  if (v < MIN_I64 || v > MAX_I64) {
    throw new Error(`Expected int64 JSON value, got ${v}`)
  }
  return v
}

export function parseJsonUint64(json: unknown): bigint {
  const v = parseJsonBigInt(json)
  if (v < 0n || v > MAX_U64) {
    throw new Error(`Expected uint64 JSON value, got ${v}`)
  }
  return v
}

export function parseJsonHexBytes(json: unknown): Uint8Array {
  const hex = parseJsonString(json)
  if (hex.length % 2 !== 0) {
    throw new Error(`Expected even-length hex string, got length ${hex.length}`)
  }
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    const hi = hexValue(hex.charCodeAt(i))
    const lo = hexValue(hex.charCodeAt(i + 1))
    if (hi === -1 || lo === -1) {
      throw new Error('Expected hex string containing only [0-9a-fA-F]')
    }
    bytes[i / 2] = (hi << 4) | lo
  }
  return bytes
}

export function parseJsonFixedHexBytes(json: unknown, len: number): Uint8Array {
  const bytes = parseJsonHexBytes(json)
  if (bytes.length !== len) {
    throw new Error(`Expected ${len} bytes (hex), got ${bytes.length}`)
  }
  return bytes
}

export function parseJsonVarHexBytes(json: unknown, maxLen: number): Uint8Array {
  const bytes = parseJsonHexBytes(json)
  if (bytes.length > maxLen) {
    throw new Error(`Expected at most ${maxLen} bytes (hex), got ${bytes.length}`)
  }
  return bytes
}

export function parseJsonXdrString(json: unknown): string {
  return unescapeXdrString(parseJsonString(json))
}

/**
 * Extract the discriminant key from a union JSON object, skipping the
 * optional `$schema` property defined in SEP-0051 §JSON Schema.
 */
export function unionKey(obj: unknown): string {
  const o = parseJsonObject(obj)
  const keys = Object.keys(o).filter((k) => k !== '$schema')
  if (keys.length === 1) {
    return keys[0]!
  }
  if (keys.length === 0) {
    throw new Error('No discriminant key found in union object')
  }
  throw new Error(`Expected exactly one discriminant key, found ${keys.length}`)
}
