/**
 * JSON serialization runtime helpers for Stellar XDR types.
 *
 * These helpers are used by the generated toJson/fromJson functions to handle
 * types that need special encoding: Int128/Int256 parts as decimal strings,
 * AssetCode as escaped ASCII strings (SEP-0051), and XDR strings with
 * byte-level ASCII escaping.
 */

const MASK64 = 0xFFFFFFFFFFFFFFFFn

// ---------------------------------------------------------------------------
// Int128Parts ↔ decimal string
// ---------------------------------------------------------------------------

export function int128PartsToDecimal(hi: bigint, lo: bigint): string {
  return ((hi << 64n) | (lo & MASK64)).toString()
}

export function decimalToInt128Parts(s: string | number): [hi: bigint, lo: bigint] {
  const v = BigInt(s)
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
  return [(v >> 64n) & MASK64, v & MASK64]
}

// ---------------------------------------------------------------------------
// Int256Parts ↔ decimal string
// ---------------------------------------------------------------------------

export function int256PartsToDecimal(
  hiHi: bigint, hiLo: bigint, loHi: bigint, loLo: bigint,
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
  hiHi: bigint, hiLo: bigint, loHi: bigint, loLo: bigint,
): string {
  return ((hiHi << 192n) | (hiLo << 128n) | (loHi << 64n) | loLo).toString()
}

export function decimalToUint256Parts(
  s: string | number,
): [hiHi: bigint, hiLo: bigint, loHi: bigint, loLo: bigint] {
  const v = BigInt(s)
  return [
    (v >> 192n) & MASK64,
    (v >> 128n) & MASK64,
    (v >> 64n) & MASK64,
    v & MASK64,
  ]
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
      case 0x00: result += '\\0'; break
      case 0x09: result += '\\t'; break
      case 0x0A: result += '\\n'; break
      case 0x0D: result += '\\r'; break
      case 0x5C: result += '\\\\'; break
      default:
        if (b >= 0x20 && b <= 0x7E) {
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
function unescapeAsciiToBytes(s: string): Uint8Array {
  const bytes: number[] = []
  let i = 0
  while (i < s.length) {
    if (s[i] === '\\' && i + 1 < s.length) {
      switch (s[i + 1]) {
        case '0': bytes.push(0x00); i += 2; break
        case 't': bytes.push(0x09); i += 2; break
        case 'n': bytes.push(0x0A); i += 2; break
        case 'r': bytes.push(0x0D); i += 2; break
        case '\\': bytes.push(0x5C); i += 2; break
        case 'x':
          if (i + 3 < s.length) {
            bytes.push(parseInt(s.substring(i + 2, i + 4), 16))
            i += 4
          } else {
            bytes.push(s.charCodeAt(i))
            i++
          }
          break
        default:
          bytes.push(0x5C)
          i++
      }
    } else {
      bytes.push(s.charCodeAt(i))
      i++
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
  const result = new Uint8Array(len)
  result.set(raw)
  return result
}

/**
 * Count the number of raw bytes represented by an escaped asset code string.
 * Used to discriminate between AssetCode4 (≤4 bytes) and AssetCode12 (≥5 bytes).
 */
export function assetCodeByteLength(s: string): number {
  let count = 0
  let i = 0
  while (i < s.length) {
    count++
    if (s[i] === '\\' && i + 1 < s.length) {
      if (s[i + 1] === 'x') { i += 4 }
      else { i += 2 }
    } else {
      i++
    }
  }
  return count
}

// ---------------------------------------------------------------------------
// Union discriminant key extraction (SEP-0051 §JSON Schema)
// ---------------------------------------------------------------------------

/**
 * Extract the discriminant key from a union JSON object, skipping the
 * optional `$schema` property defined in SEP-0051 §JSON Schema.
 */
export function unionKey(obj: Record<string, unknown>): string {
  for (const k of Object.keys(obj)) {
    if (k !== '$schema') return k
  }
  throw new Error('No discriminant key found in union object')
}
