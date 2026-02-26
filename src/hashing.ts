/**
 * SHA-256 hashing and Stellar transaction hashing utilities.
 *
 * SHA-256 is implemented inline (FIPS 180-4) to maintain zero dependencies.
 * The implementation is synchronous, which is required for signing workflows.
 */

import { createWriter, toBytes, writeInt32 } from './codec.js'

// ---------------------------------------------------------------------------
// Well-known Stellar network passphrases
// ---------------------------------------------------------------------------

export const Networks = {
  PUBLIC: 'Public Global Stellar Network ; September 2015',
  TESTNET: 'Test SDF Network ; September 2015',
  FUTURENET: 'Test SDF Future Network ; October 2022',
  SANDBOX: 'Local Sandbox Stellar Network ; September 2022',
  STANDALONE: 'Standalone Network ; February 2017',
} as const

export type NetworkPassphrase = (typeof Networks)[keyof typeof Networks]

// ---------------------------------------------------------------------------
// SHA-256 (FIPS 180-4)
// ---------------------------------------------------------------------------

/** SHA-256 initial hash values (first 32 bits of fractional parts of sqrt of first 8 primes). */
const H0 = /*#__PURE__*/ new Uint32Array([
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
  0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
])

/** SHA-256 round constants (first 32 bits of fractional parts of cube roots of first 64 primes). */
const K = /*#__PURE__*/ new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
])

const textEncoder = /*#__PURE__*/ new TextEncoder()

/**
 * Compute SHA-256 hash of the input.
 * Accepts Uint8Array or string (UTF-8 encoded).
 * Returns a 32-byte Uint8Array.
 */
export function sha256(input: Uint8Array | string): Uint8Array {
  const data = typeof input === 'string' ? textEncoder.encode(input) : input
  const dataLen = data.length

  // Pre-processing: padding
  // Message + 1 byte (0x80) + padding zeros + 8-byte big-endian length
  const bitLen = dataLen * 8
  // We need: dataLen + 1 + padding + 8 bytes, total must be multiple of 64
  const paddedLen = Math.ceil((dataLen + 9) / 64) * 64
  const padded = new Uint8Array(paddedLen)
  padded.set(data)
  padded[dataLen] = 0x80

  // Append length in bits as big-endian 64-bit integer (last 8 bytes)
  // For messages < 2^32 bytes, high 32 bits are 0
  const view = new DataView(padded.buffer)
  view.setUint32(paddedLen - 4, bitLen >>> 0, false)
  // High 32 bits of bit length (for messages > 512 MB)
  if (bitLen > 0xffffffff) {
    view.setUint32(paddedLen - 8, Math.floor(bitLen / 0x100000000), false)
  }

  // Initialize hash values
  const h = new Uint32Array(H0)
  const w = new Uint32Array(64)

  // Process each 512-bit (64-byte) block
  for (let offset = 0; offset < paddedLen; offset += 64) {
    // Prepare message schedule
    for (let i = 0; i < 16; i++) {
      w[i] = view.getUint32(offset + i * 4, false)
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15]!, 7) ^ rotr(w[i - 15]!, 18) ^ (w[i - 15]! >>> 3)
      const s1 = rotr(w[i - 2]!, 17) ^ rotr(w[i - 2]!, 19) ^ (w[i - 2]! >>> 10)
      w[i] = (w[i - 16]! + s0 + w[i - 7]! + s1) >>> 0
    }

    // Initialize working variables
    let a = h[0]!, b = h[1]!, c = h[2]!, d = h[3]!
    let e = h[4]!, f = h[5]!, g = h[6]!, hh = h[7]!

    // Compression
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)
      const ch = (e & f) ^ (~e & g)
      const temp1 = (hh + S1 + ch + K[i]! + w[i]!) >>> 0
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)
      const maj = (a & b) ^ (a & c) ^ (b & c)
      const temp2 = (S0 + maj) >>> 0

      hh = g; g = f; f = e
      e = (d + temp1) >>> 0
      d = c; c = b; b = a
      a = (temp1 + temp2) >>> 0
    }

    // Add compressed chunk to hash
    h[0] = (h[0]! + a) >>> 0
    h[1] = (h[1]! + b) >>> 0
    h[2] = (h[2]! + c) >>> 0
    h[3] = (h[3]! + d) >>> 0
    h[4] = (h[4]! + e) >>> 0
    h[5] = (h[5]! + f) >>> 0
    h[6] = (h[6]! + g) >>> 0
    h[7] = (h[7]! + hh) >>> 0
  }

  // Produce the final hash
  const result = new Uint8Array(32)
  const resultView = new DataView(result.buffer)
  for (let i = 0; i < 8; i++) {
    resultView.setUint32(i * 4, h[i]!, false)
  }
  return result
}

/** Bitwise right rotation for uint32. */
function rotr(x: number, n: number): number {
  return ((x >>> n) | (x << (32 - n))) >>> 0
}

// ---------------------------------------------------------------------------
// Network ID helper
// ---------------------------------------------------------------------------

/**
 * Compute the network ID from a network passphrase.
 * networkId = SHA256(networkPassphrase)
 */
export function networkId(passphrase: string): Uint8Array {
  return sha256(passphrase)
}

// ---------------------------------------------------------------------------
// Transaction hashing
// ---------------------------------------------------------------------------

/**
 * Envelope type values used in transaction signature payloads.
 * These are the XDR int32 values for the EnvelopeType enum.
 */
const ENVELOPE_TYPE_TX = 2
const ENVELOPE_TYPE_TX_FEE_BUMP = 5

/**
 * Build the signature base bytes for a regular transaction (V0 or V1).
 *
 * signatureBase = networkId || ENVELOPE_TYPE_TX (int32) || xdr(transaction)
 *
 * For V0 transactions, the caller must first convert to a V1 Transaction
 * by prepending the publicKeyTypeEd25519 discriminant (0x00000000).
 *
 * @param networkPassphrase - The network passphrase (e.g. Networks.TESTNET)
 * @param transactionXdr - The XDR-encoded Transaction body (NOT the envelope)
 * @returns The signature base bytes
 */
export function transactionSignatureBase(
  networkPassphrase: string,
  transactionXdr: Uint8Array,
): Uint8Array {
  return signaturePayload(networkPassphrase, ENVELOPE_TYPE_TX, transactionXdr)
}

/**
 * Build the signature base bytes for a fee bump transaction.
 *
 * signatureBase = networkId || ENVELOPE_TYPE_TX_FEE_BUMP (int32) || xdr(feeBumpTransaction)
 *
 * @param networkPassphrase - The network passphrase (e.g. Networks.TESTNET)
 * @param feeBumpXdr - The XDR-encoded FeeBumpTransaction body (NOT the envelope)
 * @returns The signature base bytes
 */
export function feeBumpSignatureBase(
  networkPassphrase: string,
  feeBumpXdr: Uint8Array,
): Uint8Array {
  return signaturePayload(networkPassphrase, ENVELOPE_TYPE_TX_FEE_BUMP, feeBumpXdr)
}

/**
 * Hash a regular transaction.
 *
 * transactionHash = SHA256(signatureBase)
 *
 * @param networkPassphrase - The network passphrase
 * @param transactionXdr - The XDR-encoded Transaction body
 * @returns The 32-byte transaction hash
 */
export function hashTransaction(
  networkPassphrase: string,
  transactionXdr: Uint8Array,
): Uint8Array {
  return sha256(transactionSignatureBase(networkPassphrase, transactionXdr))
}

/**
 * Hash a fee bump transaction.
 *
 * @param networkPassphrase - The network passphrase
 * @param feeBumpXdr - The XDR-encoded FeeBumpTransaction body
 * @returns The 32-byte transaction hash
 */
export function hashFeeBumpTransaction(
  networkPassphrase: string,
  feeBumpXdr: Uint8Array,
): Uint8Array {
  return sha256(feeBumpSignatureBase(networkPassphrase, feeBumpXdr))
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Build a TransactionSignaturePayload as raw bytes:
 *   [32 bytes: networkId] [4 bytes: envelopeType as int32] [N bytes: tagged XDR]
 */
function signaturePayload(
  networkPassphrase: string,
  envelopeType: number,
  taggedXdr: Uint8Array,
): Uint8Array {
  const netId = networkId(networkPassphrase)
  const w = createWriter(32 + 4 + taggedXdr.length)
  // Write network ID (raw 32 bytes, no XDR wrapping)
  w.buf.set(netId, w.pos)
  w.pos += 32
  // Write envelope type as XDR int32 (big-endian)
  writeInt32(w, envelopeType)
  // Write the tagged transaction XDR bytes
  w.buf.set(taggedXdr, w.pos)
  w.pos += taggedXdr.length
  return toBytes(w).slice()
}
