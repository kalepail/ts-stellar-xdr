/**
 * StrKey encoding/decoding for Stellar addresses
 *
 * StrKey = BASE32_NOPAD(versionByte + payload + CRC16_XMODEM_LE(versionByte + payload))
 *
 * - Base32: RFC 4648 standard alphabet (A-Z, 2-7), no padding
 * - CRC16: XMODEM polynomial 0x1021, init 0x0000, little-endian output
 * - Spec: SEP-0023
 */

// ---------------------------------------------------------------------------
// Version bytes
// ---------------------------------------------------------------------------

export const StrKeyVersion = {
  ed25519PublicKey: 6 << 3, // 48  → G
  ed25519SecretSeed: 18 << 3, // 144 → S
  muxedAccount: 12 << 3, // 96  → M
  preAuthTx: 19 << 3, // 152 → T
  sha256Hash: 23 << 3, // 184 → X
  signedPayload: 15 << 3, // 120 → P
  contract: 2 << 3, // 16  → C
  claimableBalance: 1 << 3, // 8   → B
  liquidityPool: 11 << 3, // 88  → L
} as const

export type StrKeyVersionName = keyof typeof StrKeyVersion

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class StrKeyError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'StrKeyError'
  }
}

// ---------------------------------------------------------------------------
// CRC16-XMODEM
// ---------------------------------------------------------------------------

/** CRC16-XMODEM lookup table (polynomial 0x1021, init 0x0000). */
const CRC16_TABLE: readonly number[] = /*#__PURE__*/ (() => {
  const table = Array.from({ length: 256 }, () => 0)
  for (let i = 0; i < 256; i++) {
    let crc = i << 8
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
    table[i] = crc
  }
  return table
})()

/**
 * Compute CRC16-XMODEM checksum.
 * Returns 2 bytes in little-endian order.
 */
function crc16xmodem(data: Uint8Array): Uint8Array {
  let crc = 0x0000
  for (let i = 0; i < data.length; i++) {
    const index = ((crc >> 8) ^ data[i]!) & 0xff
    crc = ((crc << 8) ^ CRC16_TABLE[index]!) & 0xffff
  }
  return new Uint8Array([crc & 0xff, (crc >> 8) & 0xff])
}

// ---------------------------------------------------------------------------
// Base32 (RFC 4648, no padding)
// ---------------------------------------------------------------------------

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

/** Reverse lookup: charCode → 5-bit value (255 = invalid). */
const BASE32_DECODE = /*#__PURE__*/ (() => {
  const table = new Uint8Array(128).fill(255)
  for (let i = 0; i < BASE32_ALPHABET.length; i++) {
    table[BASE32_ALPHABET.charCodeAt(i)] = i
  }
  return table
})()

/** Encode bytes to base32 string (no padding). */
function base32Encode(data: Uint8Array): string {
  let result = ''
  let bits = 0
  let buffer = 0

  for (let i = 0; i < data.length; i++) {
    buffer = (buffer << 8) | data[i]!
    bits += 8
    while (bits >= 5) {
      bits -= 5
      result += BASE32_ALPHABET[(buffer >> bits) & 0x1f]
    }
  }

  // Remaining bits (if any) — left-shift to fill 5-bit group
  if (bits > 0) {
    result += BASE32_ALPHABET[(buffer << (5 - bits)) & 0x1f]
  }

  return result
}

/** Decode base32 string to bytes (no padding accepted). */
function base32Decode(input: string): Uint8Array {
  // Reject padding characters
  if (input.includes('=')) {
    throw new StrKeyError('Invalid base32: padding characters not allowed')
  }

  // Validate length — lengths congruent to 1, 3, or 6 (mod 8) are invalid
  const mod8 = input.length % 8
  if (mod8 === 1 || mod8 === 3 || mod8 === 6) {
    throw new StrKeyError(`Invalid base32 length: ${input.length}`)
  }

  const outputLen = Math.floor((input.length * 5) / 8)
  const result = new Uint8Array(outputLen)
  let bits = 0
  let buffer = 0
  let byteIndex = 0

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i)
    if (charCode >= 128) {
      throw new StrKeyError(`Invalid base32 character: ${input[i]}`)
    }
    const value = BASE32_DECODE[charCode]!
    if (value === 255) {
      throw new StrKeyError(`Invalid base32 character: ${input[i]}`)
    }
    buffer = (buffer << 5) | value
    bits += 5
    if (bits >= 8) {
      bits -= 8
      result[byteIndex++] = (buffer >> bits) & 0xff
    }
  }

  // Verify unused trailing bits are zero
  if (bits > 0 && (buffer & ((1 << bits) - 1)) !== 0) {
    throw new StrKeyError('Invalid base32: non-zero trailing bits')
  }

  return result
}

// ---------------------------------------------------------------------------
// StrKey encode/decode
// ---------------------------------------------------------------------------

/**
 * Encode a raw key payload to a StrKey string.
 *
 * @param version - The key type version name (e.g. 'ed25519PublicKey')
 * @param payload - The raw key bytes (e.g. 32 bytes for an ed25519 public key)
 * @returns The encoded StrKey string (e.g. 'GABC...')
 */
export function encodeStrKey(version: StrKeyVersionName, payload: Uint8Array): string {
  const versionByte = StrKeyVersion[version]
  const data = new Uint8Array(1 + payload.length)
  data[0] = versionByte
  data.set(payload, 1)
  const checksum = crc16xmodem(data)
  const full = new Uint8Array(data.length + 2)
  full.set(data)
  full.set(checksum, data.length)
  return base32Encode(full)
}

/**
 * Decode a StrKey string to its version and raw payload bytes.
 *
 * @param strkey - The StrKey string (e.g. 'GABC...')
 * @returns Object with `version` name and `payload` bytes
 * @throws StrKeyError if the string is invalid
 */
export function decodeStrKey(strkey: string): { version: StrKeyVersionName; payload: Uint8Array } {
  if (strkey.length < 5) {
    throw new StrKeyError('StrKey too short')
  }

  const decoded = base32Decode(strkey.toUpperCase())
  if (decoded.length < 3) {
    throw new StrKeyError('StrKey decoded data too short')
  }

  const versionByte = decoded[0]!
  const payload = decoded.subarray(1, decoded.length - 2)
  const checksum = decoded.subarray(decoded.length - 2)

  // Verify checksum
  const data = decoded.subarray(0, decoded.length - 2)
  const expected = crc16xmodem(data)
  if (checksum[0] !== expected[0] || checksum[1] !== expected[1]) {
    throw new StrKeyError('Invalid StrKey checksum')
  }

  // Resolve version byte to a named version
  const version = resolveVersionByte(versionByte)

  return { version, payload }
}

/**
 * Check if a string is a valid StrKey of any type.
 */
export function isValidStrKey(strkey: string): boolean {
  try {
    decodeStrKey(strkey)
    return true
  } catch {
    return false
  }
}

/**
 * Check if a string is a valid StrKey of a specific type.
 */
export function isValidStrKeyOfType(strkey: string, version: StrKeyVersionName): boolean {
  try {
    const decoded = decodeStrKey(strkey)
    return decoded.version === version
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// Convenience helpers for common key types
// ---------------------------------------------------------------------------

/**
 * Encode a 32-byte Ed25519 public key to a G... address.
 */
export function encodeEd25519PublicKey(publicKey: Uint8Array): string {
  if (publicKey.length !== 32) {
    throw new StrKeyError(`Ed25519 public key must be 32 bytes, got ${publicKey.length}`)
  }
  return encodeStrKey('ed25519PublicKey', publicKey)
}

/**
 * Decode a G... address to a 32-byte Ed25519 public key.
 */
export function decodeEd25519PublicKey(strkey: string): Uint8Array {
  const { version, payload } = decodeStrKey(strkey)
  if (version !== 'ed25519PublicKey') {
    throw new StrKeyError(`Expected ed25519PublicKey (G...), got ${version}`)
  }
  if (payload.length !== 32) {
    throw new StrKeyError(`Expected 32-byte payload, got ${payload.length}`)
  }
  return payload
}

/**
 * Encode a 32-byte Ed25519 secret seed to an S... string.
 */
export function encodeEd25519SecretSeed(seed: Uint8Array): string {
  if (seed.length !== 32) {
    throw new StrKeyError(`Ed25519 secret seed must be 32 bytes, got ${seed.length}`)
  }
  return encodeStrKey('ed25519SecretSeed', seed)
}

/**
 * Decode an S... string to a 32-byte Ed25519 secret seed.
 */
export function decodeEd25519SecretSeed(strkey: string): Uint8Array {
  const { version, payload } = decodeStrKey(strkey)
  if (version !== 'ed25519SecretSeed') {
    throw new StrKeyError(`Expected ed25519SecretSeed (S...), got ${version}`)
  }
  if (payload.length !== 32) {
    throw new StrKeyError(`Expected 32-byte payload, got ${payload.length}`)
  }
  return payload
}

/**
 * Encode a 32-byte contract hash to a C... address.
 */
export function encodeContract(contractHash: Uint8Array): string {
  if (contractHash.length !== 32) {
    throw new StrKeyError(`Contract hash must be 32 bytes, got ${contractHash.length}`)
  }
  return encodeStrKey('contract', contractHash)
}

/**
 * Decode a C... address to a 32-byte contract hash.
 */
export function decodeContract(strkey: string): Uint8Array {
  const { version, payload } = decodeStrKey(strkey)
  if (version !== 'contract') {
    throw new StrKeyError(`Expected contract (C...), got ${version}`)
  }
  if (payload.length !== 32) {
    throw new StrKeyError(`Expected 32-byte payload, got ${payload.length}`)
  }
  return payload
}

/**
 * Encode a muxed account (32-byte ed25519 key + uint64 memo ID) to an M... address.
 */
export function encodeMuxedAccountStrKey(ed25519: Uint8Array, memoId: bigint): string {
  if (ed25519.length !== 32) {
    throw new StrKeyError(`Ed25519 key must be 32 bytes, got ${ed25519.length}`)
  }
  // Payload: 32 bytes ed25519 + 8 bytes memo ID (big-endian)
  const payload = new Uint8Array(40)
  payload.set(ed25519)
  const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength)
  view.setBigUint64(32, memoId, false) // big-endian
  return encodeStrKey('muxedAccount', payload)
}

/**
 * Decode an M... address to ed25519 key bytes and memo ID.
 */
export function decodeMuxedAccountStrKey(strkey: string): { ed25519: Uint8Array; memoId: bigint } {
  const { version, payload } = decodeStrKey(strkey)
  if (version !== 'muxedAccount') {
    throw new StrKeyError(`Expected muxedAccount (M...), got ${version}`)
  }
  if (payload.length !== 40) {
    throw new StrKeyError(`Expected 40-byte payload, got ${payload.length}`)
  }
  const ed25519 = payload.slice(0, 32)
  const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength)
  const memoId = view.getBigUint64(32, false) // big-endian
  return { ed25519, memoId }
}

/**
 * Encode a 32-byte pre-auth transaction hash to a T... string.
 */
export function encodePreAuthTx(hash: Uint8Array): string {
  if (hash.length !== 32) {
    throw new StrKeyError(`Pre-auth tx hash must be 32 bytes, got ${hash.length}`)
  }
  return encodeStrKey('preAuthTx', hash)
}

/**
 * Decode a T... string to a 32-byte pre-auth transaction hash.
 */
export function decodePreAuthTx(strkey: string): Uint8Array {
  const { version, payload } = decodeStrKey(strkey)
  if (version !== 'preAuthTx') {
    throw new StrKeyError(`Expected preAuthTx (T...), got ${version}`)
  }
  if (payload.length !== 32) {
    throw new StrKeyError(`Expected 32-byte payload, got ${payload.length}`)
  }
  return payload
}

/**
 * Encode a 32-byte SHA-256 hash to an X... string.
 */
export function encodeSha256Hash(hash: Uint8Array): string {
  if (hash.length !== 32) {
    throw new StrKeyError(`SHA-256 hash must be 32 bytes, got ${hash.length}`)
  }
  return encodeStrKey('sha256Hash', hash)
}

/**
 * Decode an X... string to a 32-byte SHA-256 hash.
 */
export function decodeSha256Hash(strkey: string): Uint8Array {
  const { version, payload } = decodeStrKey(strkey)
  if (version !== 'sha256Hash') {
    throw new StrKeyError(`Expected sha256Hash (X...), got ${version}`)
  }
  if (payload.length !== 32) {
    throw new StrKeyError(`Expected 32-byte payload, got ${payload.length}`)
  }
  return payload
}

/**
 * Encode an Ed25519 signed payload signer key to a P... string.
 * Payload is XDR var-opaque encoded: 32-byte ed25519 key + 4-byte length + payload + padding.
 */
export function encodeSignedPayload(ed25519: Uint8Array, payload: Uint8Array): string {
  if (ed25519.length !== 32) {
    throw new StrKeyError(`Ed25519 key must be 32 bytes, got ${ed25519.length}`)
  }
  if (payload.length > 64) {
    throw new StrKeyError(`Signed payload must be at most 64 bytes, got ${payload.length}`)
  }
  // Payload format: 32 bytes ed25519 + 4 bytes length (big-endian) + payload bytes + padding to 4-byte boundary
  const padLen = (4 - (payload.length % 4)) % 4
  const buf = new Uint8Array(32 + 4 + payload.length + padLen)
  buf.set(ed25519)
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength)
  view.setUint32(32, payload.length, false) // big-endian
  buf.set(payload, 36)
  // padding bytes are already zero
  return encodeStrKey('signedPayload', buf)
}

/**
 * Decode a P... string to an Ed25519 key and payload.
 */
export function decodeSignedPayload(strkey: string): { ed25519: Uint8Array; payload: Uint8Array } {
  const { version, payload: raw } = decodeStrKey(strkey)
  if (version !== 'signedPayload') {
    throw new StrKeyError(`Expected signedPayload (P...), got ${version}`)
  }
  if (raw.length < 36) {
    throw new StrKeyError(`Signed payload too short: ${raw.length}`)
  }
  const ed25519 = raw.slice(0, 32)
  const view = new DataView(raw.buffer, raw.byteOffset, raw.byteLength)
  const payloadLen = view.getUint32(32, false) // big-endian
  if (payloadLen > 64) {
    throw new StrKeyError(`Signed payload length exceeds 64: ${payloadLen}`)
  }
  const payload = raw.slice(36, 36 + payloadLen)
  return { ed25519, payload }
}

/**
 * Encode a 32-byte claimable balance hash to a B... string.
 * Payload includes a 1-byte V0 discriminant (0x00) followed by the 32-byte hash.
 */
export function encodeClaimableBalance(hash: Uint8Array): string {
  if (hash.length !== 32) {
    throw new StrKeyError(`Claimable balance hash must be 32 bytes, got ${hash.length}`)
  }
  // Payload: 1 byte V0 discriminant (0x00) + 32 bytes hash = 33 bytes
  const payload = new Uint8Array(33)
  payload[0] = 0x00 // V0
  payload.set(hash, 1)
  return encodeStrKey('claimableBalance', payload)
}

/**
 * Decode a B... string to a 32-byte claimable balance hash.
 */
export function decodeClaimableBalance(strkey: string): Uint8Array {
  const { version, payload } = decodeStrKey(strkey)
  if (version !== 'claimableBalance') {
    throw new StrKeyError(`Expected claimableBalance (B...), got ${version}`)
  }
  if (payload.length !== 33) {
    throw new StrKeyError(`Expected 33-byte payload, got ${payload.length}`)
  }
  if (payload[0] !== 0x00) {
    throw new StrKeyError(`Expected V0 claimable balance (discriminant 0x00), got ${payload[0]}`)
  }
  return payload.slice(1)
}

/**
 * Encode a 32-byte liquidity pool hash to an L... string.
 */
export function encodeLiquidityPool(hash: Uint8Array): string {
  if (hash.length !== 32) {
    throw new StrKeyError(`Liquidity pool hash must be 32 bytes, got ${hash.length}`)
  }
  return encodeStrKey('liquidityPool', hash)
}

/**
 * Decode an L... string to a 32-byte liquidity pool hash.
 */
export function decodeLiquidityPool(strkey: string): Uint8Array {
  const { version, payload } = decodeStrKey(strkey)
  if (version !== 'liquidityPool') {
    throw new StrKeyError(`Expected liquidityPool (L...), got ${version}`)
  }
  if (payload.length !== 32) {
    throw new StrKeyError(`Expected 32-byte payload, got ${payload.length}`)
  }
  return payload
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Map a version byte back to its named version. */
function resolveVersionByte(byte: number): StrKeyVersionName {
  for (const [name, value] of Object.entries(StrKeyVersion)) {
    if (value === byte) return name as StrKeyVersionName
  }
  throw new StrKeyError(`Unknown StrKey version byte: ${byte}`)
}
