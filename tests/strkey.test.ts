import { describe, it, expect } from 'vitest'
import {
  encodeStrKey, decodeStrKey,
  isValidStrKey, isValidStrKeyOfType,
  encodeEd25519PublicKey, decodeEd25519PublicKey,
  encodeEd25519SecretSeed, decodeEd25519SecretSeed,
  encodeContract, decodeContract,
  encodeMuxedAccountStrKey, decodeMuxedAccountStrKey,
  encodePreAuthTx, decodePreAuthTx,
  encodeSha256Hash, decodeSha256Hash,
  encodeSignedPayload, decodeSignedPayload,
  encodeClaimableBalance, decodeClaimableBalance,
  encodeLiquidityPool, decodeLiquidityPool,
  StrKeyVersion,
  StrKeyError,
} from '../src/strkey.ts'

// Test vector: 32 zero bytes
const ZERO_32 = new Uint8Array(32)

// Test vector: 32 bytes from SEP-0023
// The key used in SEP-0023 test vectors (GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ)
// is the base32 decode of the inner 32 bytes.

describe('StrKey version bytes', () => {
  it('has correct version byte values', () => {
    expect(StrKeyVersion.ed25519PublicKey).toBe(48)
    expect(StrKeyVersion.ed25519SecretSeed).toBe(144)
    expect(StrKeyVersion.muxedAccount).toBe(96)
    expect(StrKeyVersion.preAuthTx).toBe(152)
    expect(StrKeyVersion.sha256Hash).toBe(184)
    expect(StrKeyVersion.signedPayload).toBe(120)
    expect(StrKeyVersion.contract).toBe(16)
  })
})

describe('Ed25519 public key (G...)', () => {
  it('encodes 32 zero bytes to a G address', () => {
    const strkey = encodeEd25519PublicKey(ZERO_32)
    expect(strkey).toMatch(/^G/)
    expect(strkey.length).toBe(56)
  })

  it('round-trips 32 zero bytes', () => {
    const strkey = encodeEd25519PublicKey(ZERO_32)
    const decoded = decodeEd25519PublicKey(strkey)
    expect(decoded).toEqual(ZERO_32)
  })

  it('round-trips random bytes', () => {
    const key = new Uint8Array(32)
    for (let i = 0; i < 32; i++) key[i] = i * 7 + 3
    const strkey = encodeEd25519PublicKey(key)
    expect(strkey).toMatch(/^G/)
    expect(strkey.length).toBe(56)
    const decoded = decodeEd25519PublicKey(strkey)
    expect(decoded).toEqual(key)
  })

  it('rejects wrong-length payload', () => {
    expect(() => encodeEd25519PublicKey(new Uint8Array(31))).toThrow(StrKeyError)
    expect(() => encodeEd25519PublicKey(new Uint8Array(33))).toThrow(StrKeyError)
  })

  it('rejects S address when decoding as public key', () => {
    const seed = encodeEd25519SecretSeed(ZERO_32)
    expect(() => decodeEd25519PublicKey(seed)).toThrow(StrKeyError)
    expect(() => decodeEd25519PublicKey(seed)).toThrow(/Expected ed25519PublicKey/)
  })

  it('known test vector: GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF', () => {
    // 32 zero bytes should encode to a specific known address
    const strkey = encodeEd25519PublicKey(ZERO_32)
    expect(strkey).toBe('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF')
  })
})

describe('Ed25519 secret seed (S...)', () => {
  it('encodes to an S address', () => {
    const strkey = encodeEd25519SecretSeed(ZERO_32)
    expect(strkey).toMatch(/^S/)
    expect(strkey.length).toBe(56)
  })

  it('round-trips', () => {
    const seed = new Uint8Array(32).fill(0xab)
    const strkey = encodeEd25519SecretSeed(seed)
    const decoded = decodeEd25519SecretSeed(strkey)
    expect(decoded).toEqual(seed)
  })

  it('rejects G address when decoding as secret seed', () => {
    const pubkey = encodeEd25519PublicKey(ZERO_32)
    expect(() => decodeEd25519SecretSeed(pubkey)).toThrow(/Expected ed25519SecretSeed/)
  })
})

describe('Contract (C...)', () => {
  it('encodes to a C address', () => {
    const strkey = encodeContract(ZERO_32)
    expect(strkey).toMatch(/^C/)
    expect(strkey.length).toBe(56)
  })

  it('round-trips', () => {
    const hash = new Uint8Array(32).fill(0xcd)
    const strkey = encodeContract(hash)
    const decoded = decodeContract(strkey)
    expect(decoded).toEqual(hash)
  })

  it('rejects G address when decoding as contract', () => {
    const pubkey = encodeEd25519PublicKey(ZERO_32)
    expect(() => decodeContract(pubkey)).toThrow(/Expected contract/)
  })
})

describe('Muxed account (M...)', () => {
  it('encodes to an M address', () => {
    const strkey = encodeMuxedAccountStrKey(ZERO_32, 0n)
    expect(strkey).toMatch(/^M/)
    expect(strkey.length).toBe(69)
  })

  it('round-trips with memo ID 0', () => {
    const { ed25519, memoId } = decodeMuxedAccountStrKey(encodeMuxedAccountStrKey(ZERO_32, 0n))
    expect(ed25519).toEqual(ZERO_32)
    expect(memoId).toBe(0n)
  })

  it('round-trips with large memo ID', () => {
    const key = new Uint8Array(32).fill(0x42)
    const id = 9223372036854775808n // 2^63
    const strkey = encodeMuxedAccountStrKey(key, id)
    const { ed25519, memoId } = decodeMuxedAccountStrKey(strkey)
    expect(ed25519).toEqual(key)
    expect(memoId).toBe(id)
  })

  it('round-trips with max memo ID', () => {
    const maxId = 18446744073709551615n // 2^64 - 1
    const { memoId } = decodeMuxedAccountStrKey(encodeMuxedAccountStrKey(ZERO_32, maxId))
    expect(memoId).toBe(maxId)
  })
})

describe('Pre-auth tx (T...)', () => {
  it('encodes and round-trips', () => {
    const hash = new Uint8Array(32).fill(0xee)
    const strkey = encodeStrKey('preAuthTx', hash)
    expect(strkey).toMatch(/^T/)
    expect(strkey.length).toBe(56)
    const { version, payload } = decodeStrKey(strkey)
    expect(version).toBe('preAuthTx')
    expect(payload).toEqual(hash)
  })
})

describe('SHA256 hash (X...)', () => {
  it('encodes and round-trips', () => {
    const hash = new Uint8Array(32).fill(0xff)
    const strkey = encodeStrKey('sha256Hash', hash)
    expect(strkey).toMatch(/^X/)
    expect(strkey.length).toBe(56)
    const { version, payload } = decodeStrKey(strkey)
    expect(version).toBe('sha256Hash')
    expect(payload).toEqual(hash)
  })
})

describe('isValidStrKey', () => {
  it('returns true for valid G address', () => {
    expect(isValidStrKey(encodeEd25519PublicKey(ZERO_32))).toBe(true)
  })

  it('returns true for valid S address', () => {
    expect(isValidStrKey(encodeEd25519SecretSeed(ZERO_32))).toBe(true)
  })

  it('returns true for valid C address', () => {
    expect(isValidStrKey(encodeContract(ZERO_32))).toBe(true)
  })

  it('returns false for empty string', () => {
    expect(isValidStrKey('')).toBe(false)
  })

  it('returns false for random garbage', () => {
    expect(isValidStrKey('not-a-valid-strkey')).toBe(false)
  })

  it('returns false for corrupted checksum', () => {
    const valid = encodeEd25519PublicKey(ZERO_32)
    // Corrupt the last character
    const corrupted = valid.slice(0, -1) + (valid.endsWith('A') ? 'B' : 'A')
    expect(isValidStrKey(corrupted)).toBe(false)
  })
})

describe('isValidStrKeyOfType', () => {
  it('validates type correctly', () => {
    const gAddr = encodeEd25519PublicKey(ZERO_32)
    expect(isValidStrKeyOfType(gAddr, 'ed25519PublicKey')).toBe(true)
    expect(isValidStrKeyOfType(gAddr, 'ed25519SecretSeed')).toBe(false)
    expect(isValidStrKeyOfType(gAddr, 'contract')).toBe(false)
  })
})

describe('error cases', () => {
  it('rejects string that is too short', () => {
    expect(() => decodeStrKey('GA')).toThrow(StrKeyError)
  })

  it('rejects base32 with padding chars', () => {
    expect(() => decodeStrKey('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF====')).toThrow(StrKeyError)
  })

  it('rejects invalid characters', () => {
    expect(() => decodeStrKey('G!@#$%^&*()_+')).toThrow(StrKeyError)
  })

  it('is case-insensitive (accepts lowercase)', () => {
    const upper = encodeEd25519PublicKey(ZERO_32)
    const lower = upper.toLowerCase()
    const { version, payload } = decodeStrKey(lower)
    expect(version).toBe('ed25519PublicKey')
    expect(payload).toEqual(ZERO_32)
  })
})

describe('cross-compatibility with known Stellar addresses', () => {
  // These are well-known test addresses from the Stellar ecosystem

  it('decodes and re-encodes the all-zeros address', () => {
    const addr = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'
    const { version, payload } = decodeStrKey(addr)
    expect(version).toBe('ed25519PublicKey')
    expect(payload.length).toBe(32)
    // Re-encode must produce the identical string
    const reencoded = encodeEd25519PublicKey(payload)
    expect(reencoded).toBe(addr)
  })

  it('decodes a real testnet account address', () => {
    // Real address from Stellar testnet (Horizon verified)
    const addr = 'GAIH3ULLFQ4DGSECF2AR555KZ4KNDGEKN4AFI4SU2M7B43MGK3QJZNSR'
    const { version, payload } = decodeStrKey(addr)
    expect(version).toBe('ed25519PublicKey')
    expect(payload.length).toBe(32)
    // Round-trip must be identical
    expect(encodeEd25519PublicKey(payload)).toBe(addr)
  })

  it('all-ones key produces a valid G address that round-trips', () => {
    const key = new Uint8Array(32).fill(0xff)
    const strkey = encodeEd25519PublicKey(key)
    expect(strkey).toMatch(/^G/)
    expect(strkey.length).toBe(56)
    expect(decodeEd25519PublicKey(strkey)).toEqual(key)
  })

  it('all-zeros contract produces a valid C address that round-trips', () => {
    const hash = ZERO_32
    const strkey = encodeContract(hash)
    expect(strkey).toMatch(/^C/)
    expect(strkey.length).toBe(56)
    expect(decodeContract(strkey)).toEqual(hash)
  })
})

// ---------------------------------------------------------------------------
// Known test vectors from rs-stellar-xdr/tests/str.rs
// ---------------------------------------------------------------------------

// The standard test key used across rs-stellar-xdr str.rs tests
const RS_KEY = new Uint8Array([
  0x3f, 0x0c, 0x34, 0xbf, 0x93, 0xad, 0x0d, 0x99,
  0x71, 0xd0, 0x4c, 0xcc, 0x90, 0xf7, 0x05, 0x51,
  0x1c, 0x83, 0x8a, 0xad, 0x97, 0x34, 0xa4, 0xa2,
  0xfb, 0x0d, 0x7a, 0x03, 0xfc, 0x7f, 0xe8, 0x9a,
])

describe('Known test vectors from rs-stellar-xdr str.rs', () => {
  it('Contract (C) address matches rs-stellar-xdr', () => {
    const addr = encodeContract(RS_KEY)
    expect(addr).toBe('CA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUWDA')
    expect(decodeContract(addr)).toEqual(RS_KEY)
  })

  it('MuxedAccount (M) address matches rs-stellar-xdr', () => {
    const id = 9223372036854775808n // 2^63
    const addr = encodeMuxedAccountStrKey(RS_KEY, id)
    expect(addr).toBe('MA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVAAAAAAAAAAAAAJLK')
    const decoded = decodeMuxedAccountStrKey(addr)
    expect(decoded.ed25519).toEqual(RS_KEY)
    expect(decoded.memoId).toBe(id)
  })

  it('G-address matches rs-stellar-xdr', () => {
    const addr = encodeEd25519PublicKey(RS_KEY)
    expect(addr).toBe('GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ')
    expect(decodeEd25519PublicKey(addr)).toEqual(RS_KEY)
  })

  it('PreAuthTx (T) address matches rs-stellar-xdr', () => {
    const addr = encodePreAuthTx(RS_KEY)
    expect(addr).toBe('TA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUPUI')
    expect(decodePreAuthTx(addr)).toEqual(RS_KEY)
  })

  it('SHA256Hash (X) address matches rs-stellar-xdr', () => {
    const addr = encodeSha256Hash(RS_KEY)
    expect(addr).toBe('XA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVLRR')
    expect(decodeSha256Hash(addr)).toEqual(RS_KEY)
  })

  it('SignedPayload (P) address matches rs-stellar-xdr', () => {
    const payload = new Uint8Array([
      0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
      0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
      0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
      0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
    ])
    const addr = encodeSignedPayload(RS_KEY, payload)
    expect(addr).toBe('PA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUAAAAAQACAQDAQCQMBYIBEFAWDANBYHRAEISCMKBKFQXDAMRUGY4DUPB6IBZGM')
    const decoded = decodeSignedPayload(addr)
    expect(decoded.ed25519).toEqual(RS_KEY)
    expect(decoded.payload).toEqual(payload)
  })
})

describe('Claimable balance (B...)', () => {
  it('encodes to a B address', () => {
    const addr = encodeClaimableBalance(RS_KEY)
    expect(addr).toMatch(/^B/)
  })

  it('round-trips', () => {
    const addr = encodeClaimableBalance(RS_KEY)
    const decoded = decodeClaimableBalance(addr)
    expect(decoded).toEqual(RS_KEY)
  })

  it('rejects wrong-length payload', () => {
    expect(() => encodeClaimableBalance(new Uint8Array(31))).toThrow(StrKeyError)
    expect(() => encodeClaimableBalance(new Uint8Array(33))).toThrow(StrKeyError)
  })

  it('rejects G address when decoding as claimable balance', () => {
    const pubkey = encodeEd25519PublicKey(ZERO_32)
    expect(() => decodeClaimableBalance(pubkey)).toThrow(StrKeyError)
  })
})

describe('Liquidity pool (L...)', () => {
  it('encodes to an L address', () => {
    const addr = encodeLiquidityPool(RS_KEY)
    expect(addr).toMatch(/^L/)
  })

  it('round-trips', () => {
    const addr = encodeLiquidityPool(RS_KEY)
    const decoded = decodeLiquidityPool(addr)
    expect(decoded).toEqual(RS_KEY)
  })

  it('rejects wrong-length payload', () => {
    expect(() => encodeLiquidityPool(new Uint8Array(31))).toThrow(StrKeyError)
    expect(() => encodeLiquidityPool(new Uint8Array(33))).toThrow(StrKeyError)
  })

  it('rejects G address when decoding as liquidity pool', () => {
    const pubkey = encodeEd25519PublicKey(ZERO_32)
    expect(() => decodeLiquidityPool(pubkey)).toThrow(StrKeyError)
  })
})

describe('Pre-auth tx (T...) dedicated functions', () => {
  it('encodes to a T address', () => {
    const addr = encodePreAuthTx(RS_KEY)
    expect(addr).toMatch(/^T/)
  })

  it('round-trips', () => {
    const decoded = decodePreAuthTx(encodePreAuthTx(RS_KEY))
    expect(decoded).toEqual(RS_KEY)
  })

  it('rejects G address when decoding as pre-auth tx', () => {
    const pubkey = encodeEd25519PublicKey(ZERO_32)
    expect(() => decodePreAuthTx(pubkey)).toThrow(StrKeyError)
  })
})

describe('SHA-256 hash (X...) dedicated functions', () => {
  it('encodes to an X address', () => {
    const addr = encodeSha256Hash(RS_KEY)
    expect(addr).toMatch(/^X/)
  })

  it('round-trips', () => {
    const decoded = decodeSha256Hash(encodeSha256Hash(RS_KEY))
    expect(decoded).toEqual(RS_KEY)
  })

  it('rejects G address when decoding as sha256 hash', () => {
    const pubkey = encodeEd25519PublicKey(ZERO_32)
    expect(() => decodeSha256Hash(pubkey)).toThrow(StrKeyError)
  })
})
