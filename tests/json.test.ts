/**
 * Tests for JSON serialization/deserialization (toJson/fromJson).
 * Covers: runtime helpers (json.ts), enum JSON, struct JSON, union JSON,
 * typedef JSON, and custom types (PublicKey, MuxedAccount, AssetCode, Int128/256 Parts).
 */
import { describe, it, expect } from 'vitest'
import {
  int128PartsToDecimal,
  decimalToInt128Parts,
  uint128PartsToDecimal,
  decimalToUint128Parts,
  int256PartsToDecimal,
  decimalToInt256Parts,
  uint256PartsToDecimal,
  decimalToUint256Parts,
  escapeAssetCode4,
  escapeAssetCode12,
  unescapeAssetCode,
  assetCodeByteLength,
  escapeXdrString,
  unescapeXdrString,
  unionKey,
} from '../src/json.js'
import {
  // Enums
  toJsonMemoType,
  fromJsonMemoType,
  // Unions
  toJsonMemo,
  fromJsonMemo,
  // Structs
  toJsonDecoratedSignature,
  fromJsonDecoratedSignature,
  // Custom: MuxedAccount (StrKey)
  toJsonMuxedAccount,
  fromJsonMuxedAccount,
  // TransactionEnvelope
  toJsonTransactionEnvelope,
  fromJsonTransactionEnvelope,
  encodeTransactionEnvelope,
  decodeTransactionEnvelope,
} from '../src/generated/transaction.js'
import type { TransactionEnvelope } from '../src/generated/transaction.js'
import {
  // Custom: PublicKey (StrKey)
  toJsonPublicKey,
  fromJsonPublicKey,
  // Typedef: Hash (hex)
  toJsonHash,
  fromJsonHash,
  // Custom: SignerKey (StrKey)
  toJsonSignerKey,
  fromJsonSignerKey,
  // Custom: ClaimableBalanceID (StrKey B-address)
  toJsonClaimableBalanceID,
  fromJsonClaimableBalanceID,
  // Custom: PoolID (StrKey L-address)
  toJsonPoolID,
  fromJsonPoolID,
} from '../src/generated/types.js'
import {
  // Custom: Int128/UInt128/Int256/UInt256 Parts
  toJsonInt128Parts,
  fromJsonInt128Parts,
  toJsonUInt128Parts,
  fromJsonUInt128Parts,
  toJsonInt256Parts,
  fromJsonInt256Parts,
  toJsonUInt256Parts,
  fromJsonUInt256Parts,
  // Custom: SCAddress (StrKey)
  toJsonSCAddress,
  fromJsonSCAddress,
  // Custom: SCVal (union with 64-bit arms)
  toJsonSCVal,
  fromJsonSCVal,
  // Struct: SCNonceKey (64-bit field)
  toJsonSCNonceKey,
  fromJsonSCNonceKey,
} from '../src/generated/contract.js'
import {
  // Custom: AssetCode, AssetCode4/12
  toJsonAssetCode,
  fromJsonAssetCode,
  toJsonAssetCode4,
  fromJsonAssetCode4,
  toJsonAssetCode12,
  fromJsonAssetCode12,
  // Custom: Asset (full union)
  toJsonAsset,
  fromJsonAsset,
} from '../src/generated/ledger-entries.js'
import {
  // ConfigSettingEntry (uint64 array)
  toJsonConfigSettingEntry,
  fromJsonConfigSettingEntry,
} from '../src/generated/contract-config-setting.js'
import {
  // SequenceNumber typedef (int64)
  toJsonSequenceNumber,
  fromJsonSequenceNumber,
} from '../src/generated/ledger-entries.js'
import { bytesToHex, hexToBytes } from '../src/codec.js'
import {
  encodeSignedPayload,
  decodeSignedPayload,
  encodeEd25519PublicKey,
  encodeContract,
  encodeMuxedAccountStrKey,
  encodeClaimableBalance,
  encodeLiquidityPool,
  encodeSha256Hash,
} from '../src/strkey.js'

// ---------------------------------------------------------------------------
// Runtime helpers (json.ts)
// ---------------------------------------------------------------------------

describe('Int128Parts ↔ decimal', () => {
  it('converts zero', () => {
    expect(int128PartsToDecimal(0n, 0n)).toBe('0')
    const [hi, lo] = decimalToInt128Parts('0')
    expect(hi).toBe(0n)
    expect(lo).toBe(0n)
  })

  it('converts small positive', () => {
    expect(int128PartsToDecimal(0n, 42n)).toBe('42')
    const [hi, lo] = decimalToInt128Parts('42')
    expect(hi).toBe(0n)
    expect(lo).toBe(42n)
  })

  it('converts large positive spanning hi', () => {
    // 2^64 + 2 = 18446744073709551618
    const decimal = '18446744073709551618'
    expect(int128PartsToDecimal(1n, 2n)).toBe(decimal)
    const [hi, lo] = decimalToInt128Parts(decimal)
    expect(hi).toBe(1n)
    expect(lo).toBe(2n)
  })

  it('converts negative', () => {
    // -1 in two's complement 128-bit: hi=-1, lo=0xFFFFFFFFFFFFFFFF
    const decimal = '-1'
    const [hi, lo] = decimalToInt128Parts(decimal)
    expect(hi).toBe(-1n)
    expect(lo).toBe(0xFFFFFFFFFFFFFFFFn)
    expect(int128PartsToDecimal(hi, lo)).toBe(decimal)
  })

  // rs-stellar-xdr str.rs boundary values
  it('converts max int128 (rs-stellar-xdr vector)', () => {
    expect(int128PartsToDecimal(0x7FFFFFFFFFFFFFFFn, 0xFFFFFFFFFFFFFFFFn))
      .toBe('170141183460469231731687303715884105727')
  })

  it('converts min int128 (rs-stellar-xdr vector)', () => {
    expect(int128PartsToDecimal(-0x8000000000000000n, 0n))
      .toBe('-170141183460469231731687303715884105728')
  })

  it('roundtrips max int128', () => {
    const max = '170141183460469231731687303715884105727'
    const [hi, lo] = decimalToInt128Parts(max)
    expect(hi).toBe(0x7FFFFFFFFFFFFFFFn)
    expect(lo).toBe(0xFFFFFFFFFFFFFFFFn)
    expect(int128PartsToDecimal(hi, lo)).toBe(max)
  })

  it('roundtrips min int128', () => {
    const min = '-170141183460469231731687303715884105728'
    const [hi, lo] = decimalToInt128Parts(min)
    expect(hi).toBe(-0x8000000000000000n)
    expect(lo).toBe(0n)
    expect(int128PartsToDecimal(hi, lo)).toBe(min)
  })
})

describe('UInt128Parts ↔ decimal', () => {
  it('roundtrips max uint128', () => {
    const maxU128 = ((1n << 128n) - 1n).toString()
    const [hi, lo] = decimalToUint128Parts(maxU128)
    expect(uint128PartsToDecimal(hi, lo)).toBe(maxU128)
  })

  // rs-stellar-xdr str.rs exact vector
  it('max uint128 matches rs-stellar-xdr value', () => {
    expect(uint128PartsToDecimal(0xFFFFFFFFFFFFFFFFn, 0xFFFFFFFFFFFFFFFFn))
      .toBe('340282366920938463463374607431768211455')
  })

  it('converts 1', () => {
    expect(uint128PartsToDecimal(0n, 1n)).toBe('1')
  })
})

describe('Int256Parts ↔ decimal', () => {
  it('converts zero', () => {
    expect(int256PartsToDecimal(0n, 0n, 0n, 0n)).toBe('0')
    const [a, b, c, d] = decimalToInt256Parts('0')
    expect(a).toBe(0n)
    expect(b).toBe(0n)
    expect(c).toBe(0n)
    expect(d).toBe(0n)
  })

  it('roundtrips negative', () => {
    const decimal = '-1'
    const parts = decimalToInt256Parts(decimal)
    expect(int256PartsToDecimal(...parts)).toBe(decimal)
  })

  // rs-stellar-xdr str.rs exact vectors
  it('converts max int256 (rs-stellar-xdr vector)', () => {
    expect(int256PartsToDecimal(
      0x7FFFFFFFFFFFFFFFn, 0xFFFFFFFFFFFFFFFFn,
      0xFFFFFFFFFFFFFFFFn, 0xFFFFFFFFFFFFFFFFn,
    )).toBe('57896044618658097711785492504343953926634992332820282019728792003956564819967')
  })

  it('converts min int256 (rs-stellar-xdr vector)', () => {
    expect(int256PartsToDecimal(-0x8000000000000000n, 0n, 0n, 0n))
      .toBe('-57896044618658097711785492504343953926634992332820282019728792003956564819968')
  })

  it('roundtrips max int256', () => {
    const max = '57896044618658097711785492504343953926634992332820282019728792003956564819967'
    const parts = decimalToInt256Parts(max)
    expect(int256PartsToDecimal(...parts)).toBe(max)
  })

  it('roundtrips min int256', () => {
    const min = '-57896044618658097711785492504343953926634992332820282019728792003956564819968'
    const parts = decimalToInt256Parts(min)
    expect(int256PartsToDecimal(...parts)).toBe(min)
  })
})

describe('UInt256Parts ↔ decimal', () => {
  it('roundtrips max uint256', () => {
    const maxU256 = ((1n << 256n) - 1n).toString()
    const parts = decimalToUint256Parts(maxU256)
    expect(uint256PartsToDecimal(...parts)).toBe(maxU256)
  })

  // rs-stellar-xdr str.rs exact vector
  it('max uint256 matches rs-stellar-xdr value', () => {
    expect(uint256PartsToDecimal(
      0xFFFFFFFFFFFFFFFFn, 0xFFFFFFFFFFFFFFFFn,
      0xFFFFFFFFFFFFFFFFn, 0xFFFFFFFFFFFFFFFFn,
    )).toBe('115792089237316195423570985008687907853269984665640564039457584007913129639935')
  })

  it('converts 1', () => {
    expect(uint256PartsToDecimal(0n, 0n, 0n, 1n)).toBe('1')
  })
})

describe('AssetCode escape/unescape', () => {
  it('escapeAssetCode4 trims trailing nulls', () => {
    const bytes = new Uint8Array([0x55, 0x53, 0x44, 0x43]) // "USDC"
    expect(escapeAssetCode4(bytes)).toBe('USDC')
  })

  it('escapeAssetCode4 trims trailing nulls from padded', () => {
    const bytes = new Uint8Array([0x55, 0x53, 0x44, 0])
    expect(escapeAssetCode4(bytes)).toBe('USD')
  })

  it('escapeAssetCode12 keeps at least 5 bytes', () => {
    // "ABC" in 12-byte code → keeps 5 bytes (3 content + 2 null)
    const bytes = new Uint8Array(12)
    bytes[0] = 0x41; bytes[1] = 0x42; bytes[2] = 0x43 // ABC
    expect(escapeAssetCode12(bytes)).toBe('ABC\\0\\0')
  })

  it('escapeAssetCode12 trims beyond 5th byte', () => {
    // "VERYLONG" (8 chars) in 12-byte code → trims 4 trailing nulls
    const bytes = new Uint8Array(12)
    const text = new TextEncoder().encode('VERYLONG')
    bytes.set(text)
    expect(escapeAssetCode12(bytes)).toBe('VERYLONG')
  })

  it('unescapeAssetCode pads with nulls', () => {
    const result = unescapeAssetCode('XLM', 4)
    expect(result).toEqual(new Uint8Array([0x58, 0x4c, 0x4d, 0]))
  })

  it('unescapeAssetCode handles escape sequences', () => {
    // "ABC\0\0" → 5 bytes: ABC + 2 null bytes, padded to 12
    const result = unescapeAssetCode('ABC\\0\\0', 12)
    expect(result.length).toBe(12)
    expect(result[0]).toBe(0x41) // A
    expect(result[1]).toBe(0x42) // B
    expect(result[2]).toBe(0x43) // C
    expect(result[3]).toBe(0x00) // null
    expect(result[4]).toBe(0x00) // null
    expect(result[5]).toBe(0x00) // padding
  })

  it('assetCodeByteLength counts unescaped bytes', () => {
    expect(assetCodeByteLength('USDC')).toBe(4)
    expect(assetCodeByteLength('ABC\\0\\0')).toBe(5)
    expect(assetCodeByteLength('VERYLONG')).toBe(8)
    expect(assetCodeByteLength('\\x01\\x02')).toBe(2)
  })

  // rs-stellar-xdr str.rs: AssetCode4 with embedded NUL
  it('escapeAssetCode4 preserves embedded NUL (rs-stellar-xdr vector)', () => {
    // b"a\0cd" → "a\0cd"
    expect(escapeAssetCode4(new Uint8Array([0x61, 0x00, 0x63, 0x64]))).toBe('a\\0cd')
  })

  // rs-stellar-xdr str.rs: AssetCode4 with invalid UTF-8 bytes
  it('escapeAssetCode4 hex-escapes non-UTF8 bytes (rs-stellar-xdr vector)', () => {
    // b"a\xc3\x28d" → "a\xc3(d"
    expect(escapeAssetCode4(new Uint8Array([0x61, 0xc3, 0x28, 0x64]))).toBe('a\\xc3(d')
  })

  it('escapeAssetCode4 hex-escapes multiple non-UTF8 bytes', () => {
    // b"a\xc3\xc3\x28" → "a\xc3\xc3("
    expect(escapeAssetCode4(new Uint8Array([0x61, 0xc3, 0xc3, 0x28]))).toBe('a\\xc3\\xc3(')
  })

  it('escapeAssetCode4 hex-escapes all-non-UTF8', () => {
    // b"a\xc3\xc3\xc3" → "a\xc3\xc3\xc3"
    expect(escapeAssetCode4(new Uint8Array([0x61, 0xc3, 0xc3, 0xc3]))).toBe('a\\xc3\\xc3\\xc3')
  })

  // rs-stellar-xdr str.rs: AssetCode12 with embedded NUL
  it('escapeAssetCode12 preserves embedded NUL (rs-stellar-xdr vector)', () => {
    // b"a\0cd\0\0\0\0\0\0\0\0" → "a\0cd\0"  (keeps min 5 chars)
    const bytes = new Uint8Array([0x61, 0x00, 0x63, 0x64, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(escapeAssetCode12(bytes)).toBe('a\\0cd\\0')
  })

  // rs-stellar-xdr str.rs: AssetCode12 with invalid UTF-8
  it('escapeAssetCode12 hex-escapes non-UTF8 bytes (rs-stellar-xdr vector)', () => {
    // b"a\xc3\x28d\0\0\0\0\0\0\0\0" → "a\xc3(d\0"
    const bytes = new Uint8Array([0x61, 0xc3, 0x28, 0x64, 0, 0, 0, 0, 0, 0, 0, 0])
    expect(escapeAssetCode12(bytes)).toBe('a\\xc3(d\\0')
  })

  it('escapeAssetCode12 hex-escapes double non-UTF8 (rs-stellar-xdr vector)', () => {
    // b"a\xc3\xc3\x28d\0\0\0\0\0\0\0" → "a\xc3\xc3(d"
    const bytes = new Uint8Array([0x61, 0xc3, 0xc3, 0x28, 0x64, 0, 0, 0, 0, 0, 0, 0])
    expect(escapeAssetCode12(bytes)).toBe('a\\xc3\\xc3(d')
  })

  // rs-stellar-xdr str.rs: AssetCode12 minimum 5-char rule with all nulls
  it('escapeAssetCode12 all nulls produces 5-char escaped string', () => {
    const bytes = new Uint8Array(12) // all zeros
    expect(escapeAssetCode12(bytes)).toBe('\\0\\0\\0\\0\\0')
  })

  // rs-stellar-xdr str.rs: roundtrip with escape sequences through unescapeAssetCode
  it('roundtrips AssetCode4 with embedded NUL', () => {
    const original = new Uint8Array([0x61, 0x00, 0x63, 0x64]) // a\0cd
    const escaped = escapeAssetCode4(original)
    expect(escaped).toBe('a\\0cd')
    const restored = unescapeAssetCode(escaped, 4)
    expect(restored).toEqual(original)
  })

  it('roundtrips AssetCode12 with embedded NUL', () => {
    const original = new Uint8Array([0x61, 0x00, 0x63, 0x64, 0, 0, 0, 0, 0, 0, 0, 0])
    const escaped = escapeAssetCode12(original)
    const restored = unescapeAssetCode(escaped, 12)
    expect(restored).toEqual(original)
  })

  // rs-stellar-xdr str.rs: AssetCode union discrimination by byte length
  it('AssetCode union: <=4 escaped bytes → AssetCode4, >=5 → AssetCode12', () => {
    // "ABCD" = 4 bytes → Code4
    expect(assetCodeByteLength('ABCD')).toBe(4)
    // "ABCDE" = 5 bytes → Code12
    expect(assetCodeByteLength('ABCDE')).toBe(5)
    // "a\0cd" = 4 escaped bytes → Code4
    expect(assetCodeByteLength('a\\0cd')).toBe(4)
    // "a\0cd\0" = 5 escaped bytes → Code12
    expect(assetCodeByteLength('a\\0cd\\0')).toBe(5)
    // Hex-escaped: "\xd9\xaa\xd9\xaa" = 4 bytes → Code4
    expect(assetCodeByteLength('\\xd9\\xaa\\xd9\\xaa')).toBe(4)
    // "a\xd9\xaa\xd9\xaa" = 5 bytes → Code12
    expect(assetCodeByteLength('a\\xd9\\xaa\\xd9\\xaa')).toBe(5)
  })
})

// ---------------------------------------------------------------------------
// Enum JSON
// ---------------------------------------------------------------------------

describe('Enum JSON', () => {
  it('serializes MemoType with prefix stripping', () => {
    expect(toJsonMemoType('MEMO_NONE')).toBe('none')
    expect(toJsonMemoType('MEMO_TEXT')).toBe('text')
    expect(toJsonMemoType('MEMO_ID')).toBe('id')
    expect(toJsonMemoType('MEMO_HASH')).toBe('hash')
    expect(toJsonMemoType('MEMO_RETURN')).toBe('return')
  })

  it('deserializes MemoType from JSON', () => {
    expect(fromJsonMemoType('none')).toBe('MEMO_NONE')
    expect(fromJsonMemoType('text')).toBe('MEMO_TEXT')
    expect(fromJsonMemoType('id')).toBe('MEMO_ID')
  })

  it('rejects unknown enum JSON value', () => {
    expect(() => fromJsonMemoType('invalid')).toThrow('Unknown MemoType JSON value')
  })
})

// ---------------------------------------------------------------------------
// Union JSON
// ---------------------------------------------------------------------------

describe('Union JSON (Memo)', () => {
  it('serializes void arm as bare string', () => {
    const memo = { type: 'MEMO_NONE' as const }
    expect(toJsonMemo(memo)).toBe('none')
  })

  it('serializes text arm as object', () => {
    const memo = { type: 'MEMO_TEXT' as const, text: 'hello' }
    expect(toJsonMemo(memo)).toEqual({ text: 'hello' })
  })

  it('serializes id arm as object with string value', () => {
    const memo = { type: 'MEMO_ID' as const, id: 12345n }
    const json = toJsonMemo(memo)
    expect(json).toEqual({ id: '12345' })
  })

  it('serializes hash arm as hex', () => {
    const hash = new Uint8Array(32)
    hash[0] = 0xab
    hash[31] = 0xcd
    const memo = { type: 'MEMO_HASH' as const, hash }
    const json = toJsonMemo(memo) as Record<string, string>
    expect(json.hash).toBe(bytesToHex(hash))
  })

  it('deserializes void arm from string', () => {
    const result = fromJsonMemo('none')
    expect(result.type).toBe('MEMO_NONE')
  })

  it('deserializes text arm from object', () => {
    const result = fromJsonMemo({ text: 'world' })
    expect(result.type).toBe('MEMO_TEXT')
    expect((result as any).text).toBe('world')
  })

  it('deserializes id arm from object with string', () => {
    const result = fromJsonMemo({ id: '99999' })
    expect(result.type).toBe('MEMO_ID')
    expect((result as any).id).toBe(99999n)
  })

  it('deserializes hash arm from hex', () => {
    const hex = 'ab'.repeat(32)
    const result = fromJsonMemo({ hash: hex })
    expect(result.type).toBe('MEMO_HASH')
    expect(bytesToHex((result as any).hash)).toBe(hex)
  })

  it('rejects unknown string variant', () => {
    expect(() => fromJsonMemo('invalid')).toThrow()
  })

  it('rejects unknown object variant', () => {
    expect(() => fromJsonMemo({ bogus: 123 })).toThrow()
  })
})

// ---------------------------------------------------------------------------
// Struct JSON
// ---------------------------------------------------------------------------

describe('Struct JSON (DecoratedSignature)', () => {
  it('serializes to snake_case keys with hex values', () => {
    const sig = {
      hint: new Uint8Array([1, 2, 3, 4]),
      signature: new Uint8Array([0xaa, 0xbb]),
    }
    const json = toJsonDecoratedSignature(sig) as Record<string, unknown>
    expect(json).toHaveProperty('hint')
    expect(json).toHaveProperty('signature')
    expect(json.hint).toBe('01020304')
    expect(json.signature).toBe('aabb')
  })

  it('deserializes from snake_case keys', () => {
    const json = { hint: '01020304', signature: 'aabb' }
    const result = fromJsonDecoratedSignature(json)
    expect(result.hint).toEqual(new Uint8Array([1, 2, 3, 4]))
    expect(result.signature).toEqual(new Uint8Array([0xaa, 0xbb]))
  })
})

// ---------------------------------------------------------------------------
// Typedef JSON (Hash → hex)
// ---------------------------------------------------------------------------

describe('Typedef JSON (Hash → hex)', () => {
  it('serializes hash as hex', () => {
    const hash = new Uint8Array(32)
    hash[0] = 0xde
    hash[31] = 0xad
    const json = toJsonHash(hash)
    expect(typeof json).toBe('string')
    expect((json as string).startsWith('de')).toBe(true)
    expect((json as string).endsWith('ad')).toBe(true)
  })

  it('deserializes hash from hex', () => {
    const hex = 'ff' + '00'.repeat(30) + 'ee'
    const result = fromJsonHash(hex)
    expect(result[0]).toBe(0xff)
    expect(result[31]).toBe(0xee)
  })
})

// ---------------------------------------------------------------------------
// Custom: PublicKey (G-address)
// ---------------------------------------------------------------------------

describe('PublicKey JSON (StrKey)', () => {
  it('serializes to G-address', () => {
    const pk = {
      type: 'PUBLIC_KEY_TYPE_ED25519' as const,
      ed25519: new Uint8Array(32), // all zeros → GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF
    }
    const json = toJsonPublicKey(pk)
    expect(typeof json).toBe('string')
    expect(json.startsWith('G')).toBe(true)
  })

  it('deserializes from G-address', () => {
    // Encode then decode roundtrip
    const pk = {
      type: 'PUBLIC_KEY_TYPE_ED25519' as const,
      ed25519: new Uint8Array(32),
    }
    const json = toJsonPublicKey(pk)
    const result = fromJsonPublicKey(json)
    expect(result.type).toBe('PUBLIC_KEY_TYPE_ED25519')
    expect((result as any).ed25519).toEqual(new Uint8Array(32))
  })
})

// ---------------------------------------------------------------------------
// Custom: MuxedAccount (G/M-address)
// ---------------------------------------------------------------------------

describe('MuxedAccount JSON (StrKey)', () => {
  it('serializes ed25519 to G-address', () => {
    const account = {
      type: 'KEY_TYPE_ED25519' as const,
      ed25519: new Uint8Array(32),
    }
    const json = toJsonMuxedAccount(account)
    expect(json.startsWith('G')).toBe(true)
  })

  it('serializes muxed to M-address', () => {
    const account = {
      type: 'KEY_TYPE_MUXED_ED25519' as const,
      med25519: { id: 0n, ed25519: new Uint8Array(32) },
    }
    const json = toJsonMuxedAccount(account)
    expect(json.startsWith('M')).toBe(true)
  })

  it('roundtrips G-address', () => {
    const original = {
      type: 'KEY_TYPE_ED25519' as const,
      ed25519: new Uint8Array(32),
    }
    const json = toJsonMuxedAccount(original)
    const result = fromJsonMuxedAccount(json)
    expect(result.type).toBe('KEY_TYPE_ED25519')
    expect((result as any).ed25519).toEqual(new Uint8Array(32))
  })

  it('roundtrips M-address', () => {
    const original = {
      type: 'KEY_TYPE_MUXED_ED25519' as const,
      med25519: { id: 12345n, ed25519: new Uint8Array(32) },
    }
    const json = toJsonMuxedAccount(original)
    const result = fromJsonMuxedAccount(json)
    expect(result.type).toBe('KEY_TYPE_MUXED_ED25519')
    expect((result as any).med25519.id).toBe(12345n)
    expect((result as any).med25519.ed25519).toEqual(new Uint8Array(32))
  })
})

// ---------------------------------------------------------------------------
// Custom: AssetCode
// ---------------------------------------------------------------------------

describe('AssetCode JSON', () => {
  it('serializes AssetCode4 as trimmed string', () => {
    const code = new Uint8Array([0x55, 0x53, 0x44, 0x43]) // "USDC"
    expect(toJsonAssetCode4(code)).toBe('USDC')
  })

  it('serializes AssetCode12 as escaped string', () => {
    const code = new Uint8Array(12)
    new TextEncoder().encode('VERYLONG').forEach((b, i) => code[i] = b)
    expect(toJsonAssetCode12(code)).toBe('VERYLONG')
  })

  it('serializes short AssetCode12 with null padding to 5 chars', () => {
    // "AB" in 12 bytes → must produce at least 5 encoded chars
    const code = new Uint8Array(12)
    code[0] = 0x41; code[1] = 0x42 // AB
    expect(toJsonAssetCode12(code)).toBe('AB\\0\\0\\0')
  })

  it('deserializes AssetCode4 from string', () => {
    const result = fromJsonAssetCode4('USD')
    expect(result).toEqual(new Uint8Array([0x55, 0x53, 0x44, 0]))
  })

  it('deserializes AssetCode12 from string', () => {
    const result = fromJsonAssetCode12('VERYLONG')
    expect(result.length).toBe(12)
    expect(escapeAssetCode12(result)).toBe('VERYLONG')
  })

  it('deserializes AssetCode12 from escaped string', () => {
    const result = fromJsonAssetCode12('ABC\\0\\0')
    expect(result.length).toBe(12)
    expect(result[0]).toBe(0x41)
    expect(result[1]).toBe(0x42)
    expect(result[2]).toBe(0x43)
    expect(result[3]).toBe(0x00)
    expect(result[4]).toBe(0x00)
  })

  it('serializes AssetCode union (4-char)', () => {
    const assetCode = {
      type: 'ASSET_TYPE_CREDIT_ALPHANUM4' as const,
      assetCode4: new Uint8Array([0x55, 0x53, 0x44, 0]),
    }
    expect(toJsonAssetCode(assetCode)).toBe('USD')
  })

  it('serializes AssetCode union (12-char)', () => {
    const code = new Uint8Array(12)
    new TextEncoder().encode('LONGASSET').forEach((b, i) => code[i] = b)
    const assetCode = {
      type: 'ASSET_TYPE_CREDIT_ALPHANUM12' as const,
      assetCode12: code,
    }
    expect(toJsonAssetCode(assetCode)).toBe('LONGASSET')
  })

  it('deserializes AssetCode union (<=4 bytes)', () => {
    const result = fromJsonAssetCode('USD')
    expect(result.type).toBe('ASSET_TYPE_CREDIT_ALPHANUM4')
  })

  it('deserializes AssetCode union (>=5 bytes)', () => {
    const result = fromJsonAssetCode('LONGASSET')
    expect(result.type).toBe('ASSET_TYPE_CREDIT_ALPHANUM12')
  })

  it('deserializes short AssetCode12 from escaped string via union', () => {
    // "ABC\0\0" = 5 bytes → AssetCode12
    const result = fromJsonAssetCode('ABC\\0\\0')
    expect(result.type).toBe('ASSET_TYPE_CREDIT_ALPHANUM12')
  })
})

// ---------------------------------------------------------------------------
// Custom: Int128Parts / UInt128Parts
// ---------------------------------------------------------------------------

describe('Int128Parts JSON', () => {
  it('serializes to decimal string', () => {
    const parts = { hi: 0n, lo: 100n }
    expect(toJsonInt128Parts(parts)).toBe('100')
  })

  it('deserializes from decimal string', () => {
    const result = fromJsonInt128Parts('100')
    expect(result.hi).toBe(0n)
    expect(result.lo).toBe(100n)
  })

  it('roundtrips large value', () => {
    const parts = { hi: 1n, lo: 2n }
    const json = toJsonInt128Parts(parts)
    const result = fromJsonInt128Parts(json)
    expect(result.hi).toBe(1n)
    expect(result.lo).toBe(2n)
  })
})

describe('UInt128Parts JSON', () => {
  it('roundtrips', () => {
    const parts = { hi: 5n, lo: 10n }
    const json = toJsonUInt128Parts(parts)
    const result = fromJsonUInt128Parts(json)
    expect(result.hi).toBe(5n)
    expect(result.lo).toBe(10n)
  })
})

// ---------------------------------------------------------------------------
// Dual deserialization: decimal string OR object form
// ---------------------------------------------------------------------------

describe('Int128/256 dual deserialization', () => {
  it('Int128Parts fromJson accepts object with hi/lo', () => {
    const result = fromJsonInt128Parts({ hi: '1', lo: '2' })
    expect(result.hi).toBe(1n)
    expect(result.lo).toBe(2n)
  })

  it('UInt128Parts fromJson accepts object with hi/lo', () => {
    const result = fromJsonUInt128Parts({ hi: 0, lo: 42 })
    expect(result.hi).toBe(0n)
    expect(result.lo).toBe(42n)
  })

  it('Int256Parts fromJson accepts object with 4 parts', () => {
    const result = fromJsonInt256Parts({ hi_hi: '0', hi_lo: '0', lo_hi: '0', lo_lo: '99' })
    expect(result.lo_lo).toBe(99n)
  })

  it('UInt256Parts fromJson accepts object with 4 parts', () => {
    const result = fromJsonUInt256Parts({ hi_hi: 1, hi_lo: 2, lo_hi: 3, lo_lo: 4 })
    expect(result.hi_hi).toBe(1n)
    expect(result.hi_lo).toBe(2n)
    expect(result.lo_hi).toBe(3n)
    expect(result.lo_lo).toBe(4n)
  })

  it('still accepts decimal string (existing behavior)', () => {
    const result = fromJsonInt128Parts('18446744073709551618')
    expect(result.hi).toBe(1n)
    expect(result.lo).toBe(2n)
  })
})

// ---------------------------------------------------------------------------
// Custom: Int256Parts / UInt256Parts
// ---------------------------------------------------------------------------

describe('Int256Parts JSON', () => {
  it('serializes to decimal string', () => {
    const parts = { hi_hi: 0n, hi_lo: 0n, lo_hi: 0n, lo_lo: 42n }
    expect(toJsonInt256Parts(parts)).toBe('42')
  })

  it('roundtrips', () => {
    const parts = { hi_hi: 0n, hi_lo: 1n, lo_hi: 2n, lo_lo: 3n }
    const json = toJsonInt256Parts(parts)
    const result = fromJsonInt256Parts(json)
    expect(result.hi_hi).toBe(0n)
    expect(result.hi_lo).toBe(1n)
    expect(result.lo_hi).toBe(2n)
    expect(result.lo_lo).toBe(3n)
  })
})

describe('UInt256Parts JSON', () => {
  it('roundtrips max', () => {
    const maxU64 = 0xFFFFFFFFFFFFFFFFn
    const parts = { hi_hi: maxU64, hi_lo: maxU64, lo_hi: maxU64, lo_lo: maxU64 }
    const json = toJsonUInt256Parts(parts)
    const result = fromJsonUInt256Parts(json)
    expect(result.hi_hi).toBe(maxU64)
    expect(result.hi_lo).toBe(maxU64)
    expect(result.lo_hi).toBe(maxU64)
    expect(result.lo_lo).toBe(maxU64)
  })
})

// ---------------------------------------------------------------------------
// Full roundtrip: XDR → JSON → XDR
// ---------------------------------------------------------------------------

describe('Full roundtrip: encode → toJson → fromJson → verify', () => {
  it('Memo none roundtrips', () => {
    const original = { type: 'MEMO_NONE' as const }
    const json = toJsonMemo(original)
    const restored = fromJsonMemo(json)
    expect(restored).toEqual(original)
  })

  it('Memo text roundtrips', () => {
    const original = { type: 'MEMO_TEXT' as const, text: 'Stellar!' }
    const json = toJsonMemo(original)
    const restored = fromJsonMemo(json)
    expect(restored).toEqual(original)
  })

  it('Memo id roundtrips', () => {
    const original = { type: 'MEMO_ID' as const, id: 9876543210n }
    const json = toJsonMemo(original)
    const restored = fromJsonMemo(json)
    expect(restored).toEqual(original)
  })

  it('Hash roundtrips through hex', () => {
    const original = new Uint8Array(32)
    for (let i = 0; i < 32; i++) original[i] = i
    const json = toJsonHash(original)
    const restored = fromJsonHash(json)
    expect(restored).toEqual(original)
  })

  it('PublicKey roundtrips through G-address', () => {
    const key = new Uint8Array(32)
    key[0] = 0x12
    key[31] = 0x34
    const original = { type: 'PUBLIC_KEY_TYPE_ED25519' as const, ed25519: key }
    const json = toJsonPublicKey(original)
    const restored = fromJsonPublicKey(json)
    expect(restored.type).toBe('PUBLIC_KEY_TYPE_ED25519')
    expect((restored as any).ed25519).toEqual(key)
  })

  it('Int128Parts roundtrips through decimal', () => {
    const original = { hi: -1n, lo: 0xFFFFFFFFFFFFFFFFn }
    const json = toJsonInt128Parts(original)
    expect(json).toBe('-1')
    const restored = fromJsonInt128Parts(json)
    expect(restored.hi).toBe(-1n)
    expect(restored.lo).toBe(0xFFFFFFFFFFFFFFFFn)
  })
})

// ---------------------------------------------------------------------------
// SEP-0051 String Escaping
// ---------------------------------------------------------------------------

describe('SEP-0051 string escaping', () => {
  it('passes through printable ASCII unchanged', () => {
    expect(escapeXdrString('hello world')).toBe('hello world')
    expect(escapeXdrString('Stellar!')).toBe('Stellar!')
    expect(escapeXdrString('abc123')).toBe('abc123')
  })

  it('escapes NUL as \\0', () => {
    expect(escapeXdrString('\0')).toBe('\\0')
    expect(escapeXdrString('a\0b')).toBe('a\\0b')
  })

  it('escapes TAB as \\t', () => {
    expect(escapeXdrString('\t')).toBe('\\t')
    expect(escapeXdrString('a\tb')).toBe('a\\tb')
  })

  it('escapes LF as \\n', () => {
    expect(escapeXdrString('\n')).toBe('\\n')
  })

  it('escapes CR as \\r', () => {
    expect(escapeXdrString('\r')).toBe('\\r')
  })

  it('escapes backslash as \\\\', () => {
    expect(escapeXdrString('\\')).toBe('\\\\')
    expect(escapeXdrString('a\\b')).toBe('a\\\\b')
  })

  it('hex-escapes non-ASCII bytes', () => {
    // "é" is U+00E9, UTF-8 bytes [0xC3, 0xA9]
    expect(escapeXdrString('é')).toBe('\\xc3\\xa9')
  })

  it('hex-escapes control characters', () => {
    // 0x01 (SOH) → \x01
    expect(escapeXdrString('\x01')).toBe('\\x01')
    // 0x1F (US) → \x1f
    expect(escapeXdrString('\x1f')).toBe('\\x1f')
  })

  it('handles mixed printable and non-printable', () => {
    expect(escapeXdrString('hello\tworld\n')).toBe('hello\\tworld\\n')
  })

  it('unescapes \\0 back to NUL', () => {
    expect(unescapeXdrString('\\0')).toBe('\0')
  })

  it('unescapes \\t back to TAB', () => {
    expect(unescapeXdrString('\\t')).toBe('\t')
  })

  it('unescapes \\n back to LF', () => {
    expect(unescapeXdrString('\\n')).toBe('\n')
  })

  it('unescapes \\r back to CR', () => {
    expect(unescapeXdrString('\\r')).toBe('\r')
  })

  it('unescapes \\\\ back to backslash', () => {
    expect(unescapeXdrString('\\\\')).toBe('\\')
  })

  it('unescapes \\xNN hex sequences', () => {
    expect(unescapeXdrString('\\xc3\\xa9')).toBe('é')
  })

  it('roundtrips printable ASCII', () => {
    const s = 'Hello, Stellar!'
    expect(unescapeXdrString(escapeXdrString(s))).toBe(s)
  })

  it('roundtrips string with special chars', () => {
    const s = 'line1\nline2\ttab\r\nend'
    expect(unescapeXdrString(escapeXdrString(s))).toBe(s)
  })

  it('roundtrips string with backslash', () => {
    const s = 'path\\to\\file'
    expect(unescapeXdrString(escapeXdrString(s))).toBe(s)
  })

  it('Memo text with tab roundtrips through JSON', () => {
    const original = { type: 'MEMO_TEXT' as const, text: 'hello\tworld' }
    const json = toJsonMemo(original)
    // The text should be escaped
    expect((json as any).text).toBe('hello\\tworld')
    const restored = fromJsonMemo(json)
    expect(restored).toEqual(original)
  })

  it('escaping survives JSON.stringify/parse roundtrip', () => {
    const escaped = escapeXdrString('hello\tworld\n')
    // escaped is: hello\tworld\n (with literal backslashes)
    const jsonStr = JSON.stringify(escaped)
    const parsed = JSON.parse(jsonStr)
    // parsed should equal escaped (JSON handles the double-escaping)
    expect(parsed).toBe(escaped)
    // Unescaping should recover original
    expect(unescapeXdrString(parsed)).toBe('hello\tworld\n')
  })
})

// ---------------------------------------------------------------------------
// $schema property filtering (SEP-0051 §JSON Schema)
// ---------------------------------------------------------------------------

describe('$schema property filtering', () => {
  it('unionKey skips $schema property', () => {
    const obj = { $schema: 'https://stellar.org/schema/Asset.json', credit_alphanum4: {} }
    expect(unionKey(obj)).toBe('credit_alphanum4')
  })

  it('unionKey works without $schema', () => {
    const obj = { text: 'hello' }
    expect(unionKey(obj)).toBe('text')
  })

  it('unionKey throws when only $schema present', () => {
    const obj = { $schema: 'https://example.com' }
    expect(() => unionKey(obj)).toThrow('No discriminant key found')
  })

  it('Memo fromJson works with $schema property', () => {
    const json = { $schema: 'https://stellar.org/schema/Memo.json', text: 'Stellar' }
    const result = fromJsonMemo(json)
    expect(result.type).toBe('MEMO_TEXT')
    expect((result as any).text).toBe('Stellar')
  })
})

// ---------------------------------------------------------------------------
// 1. TransactionEnvelope end-to-end JSON roundtrip (rs-stellar-xdr serde_tx.rs)
// ---------------------------------------------------------------------------

describe('TransactionEnvelope JSON roundtrip', () => {
  // Constructed from the exact values in rs-stellar-xdr tests/serde_tx.rs
  const sourceBytes = new Uint8Array([
    0x3c, 0xb3, 0x61, 0xab, 0x62, 0x4b, 0x10, 0x70,
    0x4c, 0x6c, 0xcf, 0x4f, 0xdb, 0x1e, 0x40, 0x79,
    0xd2, 0x3d, 0x68, 0xec, 0x2c, 0xd3, 0x22, 0xc2,
    0x28, 0x34, 0xc4, 0x1a, 0xe1, 0xe6, 0x4b, 0xd3,
  ])
  const opSourceBytes = new Uint8Array([
    0x9b, 0x9f, 0xfa, 0xba, 0xcf, 0x46, 0x65, 0xb3,
    0x57, 0x29, 0x76, 0xfb, 0x85, 0x09, 0x79, 0xcb,
    0xc7, 0x6b, 0x9d, 0x67, 0x9c, 0x6b, 0xca, 0xeb,
    0xd5, 0x9b, 0xbf, 0xb3, 0x43, 0xe8, 0xe9, 0x46,
  ])
  const issuerBytes = new Uint8Array([
    0x43, 0xd0, 0x9f, 0x49, 0x2a, 0x2a, 0xe3, 0xaa,
    0x0a, 0xed, 0x8e, 0xce, 0xdc, 0xb2, 0x26, 0xa4,
    0xf7, 0x50, 0xa9, 0x0e, 0xcb, 0x4e, 0x09, 0xf9,
    0xac, 0x76, 0x4a, 0x55, 0x37, 0xca, 0xd8, 0x77,
  ])

  const envelope: TransactionEnvelope = {
    type: 'ENVELOPE_TYPE_TX',
    v1: {
      tx: {
        sourceAccount: { type: 'KEY_TYPE_ED25519', ed25519: sourceBytes },
        fee: 0,
        seqNum: 1n,
        cond: { type: 'PRECOND_NONE' },
        memo: { type: 'MEMO_TEXT', text: 'Stellar' },
        operations: [{
          sourceAccount: { type: 'KEY_TYPE_ED25519', ed25519: opSourceBytes },
          body: {
            type: 'CHANGE_TRUST',
            changeTrustOp: {
              line: {
                type: 'ASSET_TYPE_CREDIT_ALPHANUM4',
                alphaNum4: {
                  assetCode: new Uint8Array([0x41, 0x42, 0x43, 0x44]), // "ABCD"
                  issuer: {
                    type: 'PUBLIC_KEY_TYPE_ED25519',
                    ed25519: issuerBytes,
                  },
                },
              },
              limit: 9223372036854775807n, // i64::MAX
            },
          },
        }],
        ext: { v: 0 },
      },
      signatures: [],
    },
  }

  it('toJson produces rs-stellar-xdr compatible JSON', () => {
    const json = toJsonTransactionEnvelope(envelope) as any
    // Top-level union key
    expect(json).toHaveProperty('tx')
    const tx = json.tx.tx
    // MuxedAccount as G-address string
    expect(tx.source_account).toBe('GA6LGYNLMJFRA4CMNTHU7WY6IB45EPLI5QWNGIWCFA2MIGXB4ZF5GQGY')
    // uint32 as number
    expect(tx.fee).toBe(0)
    // int64 as string
    expect(tx.seq_num).toBe('1')
    // Void union arm as bare string
    expect(tx.cond).toBe('none')
    // Non-void union arm
    expect(tx.memo).toEqual({ text: 'Stellar' })
    // Operations array
    expect(tx.operations).toHaveLength(1)
    const op = tx.operations[0]
    // Optional source_account present
    expect(op.source_account).toBe('GCNZ76V2Z5DGLM2XFF3PXBIJPHF4O245M6OGXSXL2WN37M2D5DUUNSOO')
    // Operation body union
    expect(op.body).toHaveProperty('change_trust')
    const ct = op.body.change_trust
    // ChangeTrustAsset union
    expect(ct.line).toHaveProperty('credit_alphanum4')
    expect(ct.line.credit_alphanum4.asset_code).toBe('ABCD')
    expect(ct.line.credit_alphanum4.issuer).toBe('GBB5BH2JFIVOHKQK5WHM5XFSE2SPOUFJB3FU4CPZVR3EUVJXZLMHOLOM')
    // int64 limit as string
    expect(ct.limit).toBe('9223372036854775807')
    // TransactionExt void arm
    expect(tx.ext).toBe('v0')
    // Empty signatures array
    expect(json.tx.signatures).toEqual([])
  })

  it('roundtrips through JSON (toJson → fromJson → binary equal)', () => {
    const json = toJsonTransactionEnvelope(envelope)
    const restored = fromJsonTransactionEnvelope(json)
    // Encode both and verify binary equality
    const originalBytes = encodeTransactionEnvelope(envelope)
    const restoredBytes = encodeTransactionEnvelope(restored)
    expect(restoredBytes).toEqual(originalBytes)
  })

  it('roundtrips through binary → JSON → binary', () => {
    // Encode to XDR bytes, decode back, convert to JSON, restore, re-encode
    const bytes = encodeTransactionEnvelope(envelope)
    const decoded = decodeTransactionEnvelope(bytes)
    const json = toJsonTransactionEnvelope(decoded)
    const restored = fromJsonTransactionEnvelope(json)
    const reEncoded = encodeTransactionEnvelope(restored)
    expect(reEncoded).toEqual(bytes)
  })
})

// ---------------------------------------------------------------------------
// 2. SCAddress JSON (all 5 variants)
// ---------------------------------------------------------------------------

describe('SCAddress JSON (StrKey)', () => {
  const keyBytes = new Uint8Array(32)
  keyBytes[0] = 0x3f; keyBytes[1] = 0x0c

  it('serializes Account as G-address', () => {
    const addr = {
      type: 'SC_ADDRESS_TYPE_ACCOUNT' as const,
      accountId: { type: 'PUBLIC_KEY_TYPE_ED25519' as const, ed25519: keyBytes },
    }
    const json = toJsonSCAddress(addr)
    expect(typeof json).toBe('string')
    expect(json.startsWith('G')).toBe(true)
  })

  it('serializes Contract as C-address', () => {
    const addr = {
      type: 'SC_ADDRESS_TYPE_CONTRACT' as const,
      contractId: keyBytes,
    }
    const json = toJsonSCAddress(addr)
    expect(typeof json).toBe('string')
    expect(json.startsWith('C')).toBe(true)
  })

  it('serializes MuxedAccount as M-address', () => {
    const addr = {
      type: 'SC_ADDRESS_TYPE_MUXED_ACCOUNT' as const,
      muxedAccount: { id: 123456n, ed25519: keyBytes },
    }
    const json = toJsonSCAddress(addr)
    expect(typeof json).toBe('string')
    expect(json.startsWith('M')).toBe(true)
  })

  it('serializes ClaimableBalance as B-address', () => {
    const addr = {
      type: 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE' as const,
      claimableBalanceId: { type: 'CLAIMABLE_BALANCE_ID_TYPE_V0' as const, v0: keyBytes },
    }
    const json = toJsonSCAddress(addr)
    expect(typeof json).toBe('string')
    expect(json.startsWith('B')).toBe(true)
  })

  it('serializes LiquidityPool as L-address', () => {
    const addr = {
      type: 'SC_ADDRESS_TYPE_LIQUIDITY_POOL' as const,
      liquidityPoolId: keyBytes,
    }
    const json = toJsonSCAddress(addr)
    expect(typeof json).toBe('string')
    expect(json.startsWith('L')).toBe(true)
  })

  it('roundtrips Account (G) through JSON', () => {
    const original = {
      type: 'SC_ADDRESS_TYPE_ACCOUNT' as const,
      accountId: { type: 'PUBLIC_KEY_TYPE_ED25519' as const, ed25519: keyBytes },
    }
    const json = toJsonSCAddress(original)
    const restored = fromJsonSCAddress(json)
    expect(restored.type).toBe('SC_ADDRESS_TYPE_ACCOUNT')
    expect((restored as any).accountId.ed25519).toEqual(keyBytes)
  })

  it('roundtrips Contract (C) through JSON', () => {
    const original = {
      type: 'SC_ADDRESS_TYPE_CONTRACT' as const,
      contractId: keyBytes,
    }
    const json = toJsonSCAddress(original)
    const restored = fromJsonSCAddress(json)
    expect(restored.type).toBe('SC_ADDRESS_TYPE_CONTRACT')
    expect((restored as any).contractId).toEqual(keyBytes)
  })

  it('roundtrips MuxedAccount (M) through JSON', () => {
    const original = {
      type: 'SC_ADDRESS_TYPE_MUXED_ACCOUNT' as const,
      muxedAccount: { id: 99n, ed25519: keyBytes },
    }
    const json = toJsonSCAddress(original)
    const restored = fromJsonSCAddress(json)
    expect(restored.type).toBe('SC_ADDRESS_TYPE_MUXED_ACCOUNT')
    expect((restored as any).muxedAccount.id).toBe(99n)
    expect((restored as any).muxedAccount.ed25519).toEqual(keyBytes)
  })

  it('roundtrips ClaimableBalance (B) through JSON', () => {
    const original = {
      type: 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE' as const,
      claimableBalanceId: { type: 'CLAIMABLE_BALANCE_ID_TYPE_V0' as const, v0: keyBytes },
    }
    const json = toJsonSCAddress(original)
    const restored = fromJsonSCAddress(json)
    expect(restored.type).toBe('SC_ADDRESS_TYPE_CLAIMABLE_BALANCE')
    expect((restored as any).claimableBalanceId.v0).toEqual(keyBytes)
  })

  it('roundtrips LiquidityPool (L) through JSON', () => {
    const original = {
      type: 'SC_ADDRESS_TYPE_LIQUIDITY_POOL' as const,
      liquidityPoolId: keyBytes,
    }
    const json = toJsonSCAddress(original)
    const restored = fromJsonSCAddress(json)
    expect(restored.type).toBe('SC_ADDRESS_TYPE_LIQUIDITY_POOL')
    expect((restored as any).liquidityPoolId).toEqual(keyBytes)
  })
})

// ---------------------------------------------------------------------------
// 3. SignerKey JSON (all 4 variants: G/T/X/P)
// ---------------------------------------------------------------------------

describe('SignerKey JSON (StrKey)', () => {
  const keyBytes = new Uint8Array(32)
  for (let i = 0; i < 32; i++) keyBytes[i] = i + 1

  it('serializes Ed25519 as G-address', () => {
    const sk = { type: 'SIGNER_KEY_TYPE_ED25519' as const, ed25519: keyBytes }
    const json = toJsonSignerKey(sk)
    expect(json.startsWith('G')).toBe(true)
  })

  it('serializes PreAuthTx as T-address', () => {
    const sk = { type: 'SIGNER_KEY_TYPE_PRE_AUTH_TX' as const, preAuthTx: keyBytes }
    const json = toJsonSignerKey(sk)
    expect(json.startsWith('T')).toBe(true)
  })

  it('serializes HashX as X-address', () => {
    const sk = { type: 'SIGNER_KEY_TYPE_HASH_X' as const, hashX: keyBytes }
    const json = toJsonSignerKey(sk)
    expect(json.startsWith('X')).toBe(true)
  })

  it('serializes SignedPayload as P-address', () => {
    const payload = new Uint8Array([0x01, 0x02, 0x03, 0x04])
    const sk = {
      type: 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD' as const,
      ed25519SignedPayload: { ed25519: keyBytes, payload },
    }
    const json = toJsonSignerKey(sk)
    expect(json.startsWith('P')).toBe(true)
  })

  it('roundtrips Ed25519 (G) through JSON', () => {
    const original = { type: 'SIGNER_KEY_TYPE_ED25519' as const, ed25519: keyBytes }
    const json = toJsonSignerKey(original)
    const restored = fromJsonSignerKey(json)
    expect(restored.type).toBe('SIGNER_KEY_TYPE_ED25519')
    expect((restored as any).ed25519).toEqual(keyBytes)
  })

  it('roundtrips PreAuthTx (T) through JSON', () => {
    const original = { type: 'SIGNER_KEY_TYPE_PRE_AUTH_TX' as const, preAuthTx: keyBytes }
    const json = toJsonSignerKey(original)
    const restored = fromJsonSignerKey(json)
    expect(restored.type).toBe('SIGNER_KEY_TYPE_PRE_AUTH_TX')
    expect((restored as any).preAuthTx).toEqual(keyBytes)
  })

  it('roundtrips HashX (X) through JSON', () => {
    const original = { type: 'SIGNER_KEY_TYPE_HASH_X' as const, hashX: keyBytes }
    const json = toJsonSignerKey(original)
    const restored = fromJsonSignerKey(json)
    expect(restored.type).toBe('SIGNER_KEY_TYPE_HASH_X')
    expect((restored as any).hashX).toEqual(keyBytes)
  })

  it('roundtrips SignedPayload (P) through JSON', () => {
    const payload = new Uint8Array([0x10, 0x20, 0x30, 0x40, 0x50])
    const original = {
      type: 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD' as const,
      ed25519SignedPayload: { ed25519: keyBytes, payload },
    }
    const json = toJsonSignerKey(original)
    const restored = fromJsonSignerKey(json)
    expect(restored.type).toBe('SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD')
    expect((restored as any).ed25519SignedPayload.ed25519).toEqual(keyBytes)
    expect((restored as any).ed25519SignedPayload.payload).toEqual(payload)
  })
})

// ---------------------------------------------------------------------------
// 4. ClaimableBalanceID JSON (B-address StrKey)
// ---------------------------------------------------------------------------

describe('ClaimableBalanceID JSON (StrKey)', () => {
  const hash = new Uint8Array(32)
  hash[0] = 0x36; hash[1] = 0x3e; hash[31] = 0xab

  it('serializes as B-address string', () => {
    const cbid = { type: 'CLAIMABLE_BALANCE_ID_TYPE_V0' as const, v0: hash }
    const json = toJsonClaimableBalanceID(cbid)
    expect(typeof json).toBe('string')
    expect(json.startsWith('B')).toBe(true)
  })

  it('roundtrips through JSON', () => {
    const original = { type: 'CLAIMABLE_BALANCE_ID_TYPE_V0' as const, v0: hash }
    const json = toJsonClaimableBalanceID(original)
    const restored = fromJsonClaimableBalanceID(json)
    expect(restored.type).toBe('CLAIMABLE_BALANCE_ID_TYPE_V0')
    expect((restored as any).v0).toEqual(hash)
  })
})

// ---------------------------------------------------------------------------
// 5. PoolID JSON (L-address StrKey)
// ---------------------------------------------------------------------------

describe('PoolID JSON (StrKey)', () => {
  const hash = new Uint8Array(32)
  hash[0] = 0x36; hash[1] = 0x3e; hash[31] = 0xcd

  it('serializes as L-address string', () => {
    const json = toJsonPoolID(hash)
    expect(typeof json).toBe('string')
    expect(json.startsWith('L')).toBe(true)
  })

  it('roundtrips through JSON', () => {
    const json = toJsonPoolID(hash)
    const restored = fromJsonPoolID(json)
    expect(restored).toEqual(hash)
  })
})

// ---------------------------------------------------------------------------
// 6. SignedPayload StrKey functional test (P-address encode/decode)
// ---------------------------------------------------------------------------

describe('SignedPayload StrKey (P-address)', () => {
  const ed25519 = new Uint8Array(32)
  for (let i = 0; i < 32; i++) ed25519[i] = i + 1

  it('encodes and decodes with small payload', () => {
    const payload = new Uint8Array([0x01, 0x02, 0x03, 0x04])
    const encoded = encodeSignedPayload(ed25519, payload)
    expect(encoded.startsWith('P')).toBe(true)
    const decoded = decodeSignedPayload(encoded)
    expect(decoded.ed25519).toEqual(ed25519)
    expect(decoded.payload).toEqual(payload)
  })

  it('roundtrips with empty payload', () => {
    const payload = new Uint8Array(0)
    const encoded = encodeSignedPayload(ed25519, payload)
    const decoded = decodeSignedPayload(encoded)
    expect(decoded.ed25519).toEqual(ed25519)
    expect(decoded.payload).toEqual(payload)
  })

  it('roundtrips with max-size payload (64 bytes)', () => {
    const payload = new Uint8Array(64)
    for (let i = 0; i < 64; i++) payload[i] = i
    const encoded = encodeSignedPayload(ed25519, payload)
    const decoded = decodeSignedPayload(encoded)
    expect(decoded.ed25519).toEqual(ed25519)
    expect(decoded.payload).toEqual(payload)
  })

  it('roundtrips with odd-length payload (padding test)', () => {
    const payload = new Uint8Array([0xaa, 0xbb, 0xcc]) // 3 bytes, needs 1-byte padding
    const encoded = encodeSignedPayload(ed25519, payload)
    const decoded = decodeSignedPayload(encoded)
    expect(decoded.ed25519).toEqual(ed25519)
    expect(decoded.payload).toEqual(payload)
  })

  it('rejects payload over 64 bytes', () => {
    const payload = new Uint8Array(65)
    expect(() => encodeSignedPayload(ed25519, payload)).toThrow()
  })

  it('works through SignerKey JSON roundtrip', () => {
    const payload = new Uint8Array([0x10, 0x20, 0x30])
    const sk = {
      type: 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD' as const,
      ed25519SignedPayload: { ed25519, payload },
    }
    const json = toJsonSignerKey(sk)
    expect(json.startsWith('P')).toBe(true)
    const restored = fromJsonSignerKey(json)
    expect((restored as any).ed25519SignedPayload.ed25519).toEqual(ed25519)
    expect((restored as any).ed25519SignedPayload.payload).toEqual(payload)
  })
})

// ---------------------------------------------------------------------------
// 7. 64-bit integers in arrays (rs-stellar-xdr serde_ints.rs)
// ---------------------------------------------------------------------------

describe('64-bit integers in arrays', () => {
  it('uint64 array items serialize as strings', () => {
    const entry = {
      configSettingID: 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW' as const,
      liveSorobanStateSizeWindow: [1n, 2n, 3n, 18446744073709551615n],
    }
    const json = toJsonConfigSettingEntry(entry) as any
    expect(json).toHaveProperty('live_soroban_state_size_window')
    const arr = json.live_soroban_state_size_window
    expect(arr).toEqual(['1', '2', '3', '18446744073709551615'])
  })

  it('uint64 array roundtrips through JSON', () => {
    const original = {
      configSettingID: 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW' as const,
      liveSorobanStateSizeWindow: [1n, 2n, 3n, 18446744073709551615n],
    }
    const json = toJsonConfigSettingEntry(original)
    const restored = fromJsonConfigSettingEntry(json)
    expect((restored as any).liveSorobanStateSizeWindow).toEqual([1n, 2n, 3n, 18446744073709551615n])
  })
})

// ---------------------------------------------------------------------------
// 8. Negative 64-bit integers (rs-stellar-xdr serde_ints.rs)
// ---------------------------------------------------------------------------

describe('Negative 64-bit integers in JSON', () => {
  it('ScVal I64 serializes negative as string', () => {
    const val = { type: 'SCV_I64' as const, i64: -123n }
    const json = toJsonSCVal(val) as any
    expect(json).toHaveProperty('i64')
    expect(json.i64).toBe('-123')
  })

  it('ScVal U64 serializes as string', () => {
    const val = { type: 'SCV_U64' as const, u64: 123n }
    const json = toJsonSCVal(val) as any
    expect(json).toHaveProperty('u64')
    expect(json.u64).toBe('123')
  })

  it('SCNonceKey nonce serializes as string', () => {
    const nonce = { nonce: 123n }
    const json = toJsonSCNonceKey(nonce) as any
    expect(json.nonce).toBe('123')
  })

  it('ScVal I64 roundtrips negative value', () => {
    const original = { type: 'SCV_I64' as const, i64: -9223372036854775808n }
    const json = toJsonSCVal(original)
    const restored = fromJsonSCVal(json)
    expect((restored as any).i64).toBe(-9223372036854775808n)
  })

  it('ScVal U64 roundtrips max value', () => {
    const original = { type: 'SCV_U64' as const, u64: 18446744073709551615n }
    const json = toJsonSCVal(original)
    const restored = fromJsonSCVal(json)
    expect((restored as any).u64).toBe(18446744073709551615n)
  })

  it('SCNonceKey roundtrips through JSON', () => {
    const original = { nonce: 999n }
    const json = toJsonSCNonceKey(original)
    const restored = fromJsonSCNonceKey(json)
    expect(restored.nonce).toBe(999n)
  })
})

// ---------------------------------------------------------------------------
// 9. Asset union JSON (full type with nested structs)
// ---------------------------------------------------------------------------

describe('Asset union JSON', () => {
  const issuerBytes = new Uint8Array(32)
  issuerBytes[0] = 0x43; issuerBytes[1] = 0xd0

  it('serializes native as bare string', () => {
    const asset = { type: 'ASSET_TYPE_NATIVE' as const }
    expect(toJsonAsset(asset)).toBe('native')
  })

  it('serializes CreditAlphanum4 as nested object', () => {
    const asset = {
      type: 'ASSET_TYPE_CREDIT_ALPHANUM4' as const,
      alphaNum4: {
        assetCode: new Uint8Array([0x41, 0x42, 0x43, 0x44]), // ABCD
        issuer: { type: 'PUBLIC_KEY_TYPE_ED25519' as const, ed25519: issuerBytes },
      },
    }
    const json = toJsonAsset(asset) as any
    expect(json).toHaveProperty('credit_alphanum4')
    expect(json.credit_alphanum4.asset_code).toBe('ABCD')
    expect(json.credit_alphanum4.issuer).toMatch(/^G/)
  })

  it('serializes CreditAlphanum12 as nested object', () => {
    const code12 = new Uint8Array(12)
    new TextEncoder().encode('LONGASSET').forEach((b, i) => code12[i] = b)
    const asset = {
      type: 'ASSET_TYPE_CREDIT_ALPHANUM12' as const,
      alphaNum12: {
        assetCode: code12,
        issuer: { type: 'PUBLIC_KEY_TYPE_ED25519' as const, ed25519: issuerBytes },
      },
    }
    const json = toJsonAsset(asset) as any
    expect(json).toHaveProperty('credit_alphanum12')
    expect(json.credit_alphanum12.asset_code).toBe('LONGASSET')
    expect(json.credit_alphanum12.issuer).toMatch(/^G/)
  })

  it('deserializes native from string', () => {
    const result = fromJsonAsset('native')
    expect(result.type).toBe('ASSET_TYPE_NATIVE')
  })

  it('deserializes CreditAlphanum4 from object', () => {
    const issuerG = encodeEd25519PublicKey(issuerBytes)
    const json = { credit_alphanum4: { asset_code: 'USD', issuer: issuerG } }
    const result = fromJsonAsset(json)
    expect(result.type).toBe('ASSET_TYPE_CREDIT_ALPHANUM4')
    expect((result as any).alphaNum4.assetCode).toEqual(new Uint8Array([0x55, 0x53, 0x44, 0]))
  })

  it('roundtrips native through JSON', () => {
    const original = { type: 'ASSET_TYPE_NATIVE' as const }
    const json = toJsonAsset(original)
    const restored = fromJsonAsset(json)
    expect(restored).toEqual(original)
  })

  it('roundtrips CreditAlphanum4 through JSON', () => {
    const original = {
      type: 'ASSET_TYPE_CREDIT_ALPHANUM4' as const,
      alphaNum4: {
        assetCode: new Uint8Array([0x55, 0x53, 0x44, 0x43]), // USDC
        issuer: { type: 'PUBLIC_KEY_TYPE_ED25519' as const, ed25519: issuerBytes },
      },
    }
    const json = toJsonAsset(original)
    const restored = fromJsonAsset(json)
    expect(restored.type).toBe('ASSET_TYPE_CREDIT_ALPHANUM4')
    expect((restored as any).alphaNum4.assetCode).toEqual(original.alphaNum4.assetCode)
    expect((restored as any).alphaNum4.issuer.ed25519).toEqual(issuerBytes)
  })
})

// ---------------------------------------------------------------------------
// 10. JSON.stringify/parse end-to-end for complex types
// ---------------------------------------------------------------------------

describe('JSON.stringify/parse roundtrip for complex types', () => {
  it('TransactionEnvelope survives JSON.stringify/parse', () => {
    const sourceBytes = new Uint8Array(32)
    sourceBytes[0] = 0x3c; sourceBytes[1] = 0xb3
    const envelope: TransactionEnvelope = {
      type: 'ENVELOPE_TYPE_TX',
      v1: {
        tx: {
          sourceAccount: { type: 'KEY_TYPE_ED25519', ed25519: sourceBytes },
          fee: 100,
          seqNum: 42n,
          cond: { type: 'PRECOND_NONE' },
          memo: { type: 'MEMO_NONE' },
          operations: [],
          ext: { v: 0 },
        },
        signatures: [],
      },
    }
    const jsonValue = toJsonTransactionEnvelope(envelope)
    // Serialize to JSON string and parse back
    const jsonStr = JSON.stringify(jsonValue)
    const parsed = JSON.parse(jsonStr)
    // fromJson should reconstruct the original
    const restored = fromJsonTransactionEnvelope(parsed)
    const originalBytes = encodeTransactionEnvelope(envelope)
    const restoredBytes = encodeTransactionEnvelope(restored)
    expect(restoredBytes).toEqual(originalBytes)
  })

  it('Asset with special chars survives JSON.stringify/parse', () => {
    // Asset code with non-printable bytes (edge case)
    const code4 = new Uint8Array([0x41, 0x00, 0x43, 0x44]) // A\0CD — embedded NUL
    const issuer = new Uint8Array(32)
    const asset = {
      type: 'ASSET_TYPE_CREDIT_ALPHANUM4' as const,
      alphaNum4: {
        assetCode: code4,
        issuer: { type: 'PUBLIC_KEY_TYPE_ED25519' as const, ed25519: issuer },
      },
    }
    const jsonValue = toJsonAsset(asset)
    const jsonStr = JSON.stringify(jsonValue)
    const parsed = JSON.parse(jsonStr)
    const restored = fromJsonAsset(parsed)
    expect((restored as any).alphaNum4.assetCode).toEqual(code4)
  })

  it('SCVal with I64 survives JSON.stringify/parse', () => {
    const val = { type: 'SCV_I64' as const, i64: -9999999999n }
    const jsonValue = toJsonSCVal(val)
    const jsonStr = JSON.stringify(jsonValue)
    const parsed = JSON.parse(jsonStr)
    const restored = fromJsonSCVal(parsed)
    expect((restored as any).i64).toBe(-9999999999n)
  })

  it('Int128Parts survives JSON.stringify/parse', () => {
    const parts = { hi: 1n, lo: 2n }
    const jsonValue = toJsonInt128Parts(parts)
    const jsonStr = JSON.stringify(jsonValue)
    const parsed = JSON.parse(jsonStr)
    const restored = fromJsonInt128Parts(parsed)
    expect(restored.hi).toBe(1n)
    expect(restored.lo).toBe(2n)
  })
})

// ---------------------------------------------------------------------------
// 11. SequenceNumber typedef (int64 as string) — rs-stellar-xdr serde_ints.rs
// ---------------------------------------------------------------------------

describe('SequenceNumber typedef JSON (int64 as string)', () => {
  it('serializes as string (rs-stellar-xdr vector)', () => {
    expect(toJsonSequenceNumber(123n)).toBe('123')
  })

  it('deserializes from string', () => {
    expect(fromJsonSequenceNumber('123')).toBe(123n)
  })

  it('roundtrips', () => {
    const original = 9876543210n
    const json = toJsonSequenceNumber(original)
    expect(typeof json).toBe('string')
    expect(fromJsonSequenceNumber(json)).toBe(original)
  })

  it('handles zero', () => {
    expect(toJsonSequenceNumber(0n)).toBe('0')
    expect(fromJsonSequenceNumber('0')).toBe(0n)
  })

  it('handles max int64', () => {
    const max = 9223372036854775807n
    expect(toJsonSequenceNumber(max)).toBe('9223372036854775807')
    expect(fromJsonSequenceNumber('9223372036854775807')).toBe(max)
  })
})

// ---------------------------------------------------------------------------
// 12. SCAddress rejection of invalid StrKey types — rs-stellar-xdr str.rs
// ---------------------------------------------------------------------------

describe('SCAddress fromJson rejects invalid types', () => {
  it('rejects X (sha256Hash) address', () => {
    const xAddr = encodeSha256Hash(new Uint8Array(32))
    expect(() => fromJsonSCAddress(xAddr)).toThrow()
  })

  it('rejects S (secret seed) address', () => {
    // Secret seed starts with S but is not a valid SCAddress variant
    expect(() => fromJsonSCAddress('SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVNPT')).toThrow()
  })
})
