import { describe, expect, it } from 'vitest'

import {
  fromJsonSequenceNumber,
  fromJsonAssetCode,
  fromJsonThresholds,
  toJsonSequenceNumber,
  toJsonAssetCode,
  toJsonAssetCode4,
  toJsonAssetCode12,
  toJsonThresholds,
} from '../src/generated/ledger-entries.ts'
import {
  fromJsonSignerKey,
  fromJsonPoolID,
  fromJsonClaimableBalanceID,
  fromJsonAccountID,
  fromJsonContractID,
  fromJsonNodeID,
  fromJsonHash,
  fromJsonSignatureHint,
  toJsonSignerKey,
  toJsonPoolID,
  toJsonClaimableBalanceID,
  toJsonAccountID,
  toJsonContractID,
  toJsonNodeID,
  toJsonHash,
  toJsonSignatureHint,
} from '../src/generated/types.ts'
import {
  fromJsonSCVal,
  fromJsonSCNonceKey,
  fromJsonSCAddress,
  fromJsonMuxedEd25519Account,
  fromJsonInt128Parts,
  toJsonSCVal,
  toJsonSCNonceKey,
  toJsonSCAddress,
  toJsonMuxedEd25519Account,
  toJsonInt128Parts,
} from '../src/generated/contract.ts'
import {
  fromJsonConfigSettingEntry,
  toJsonConfigSettingEntry,
} from '../src/generated/contract-config-setting.ts'
import {
  fromJsonTransactionEnvelope,
  toJsonTransactionEnvelope,
} from '../src/generated/transaction.ts'

// Canonical values from rs-stellar-xdr tests/str.rs
const G_ADDR = 'GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ'
const C_ADDR = 'CA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUWDA'
const M_ADDR = 'MA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVAAAAAAAAAAAAAJLK'
const P_ADDR =
  'PA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUAAAAAQACAQDAQCQMBYIBEFAWDANBYHRAEISCMKBKFQXDAMRUGY4DUPB6IBZGM'
const T_ADDR = 'TA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUPUI'
const X_ADDR = 'XA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVLRR'
const B_ADDR = 'BAADMPVKHBTYIH522D2O3CGHPHSP4ZXFNISHBXEYYDWJYBZ5AXD3CA3GDE'
const L_ADDR = 'LA3D5KRYM6CB7OWQ6TWYRR3Z4T7GNZLKERYNZGGA5SOAOPIFY6YQGZ5J'
const MUXED_123456 = 'MA3D5KRYM6CB7OWQ6TWYRR3Z4T7GNZLKERYNZGGA5SOAOPIFY6YQGAAAAAAAAAPCICBKU'

describe('rs-stellar-xdr parity: serde_ints.rs', () => {
  it('serializes/deserializes SequenceNumber as JSON string', () => {
    expect(toJsonSequenceNumber(123n)).toBe('123')
    expect(fromJsonSequenceNumber('123')).toBe(123n)
  })

  it('serializes/deserializes SCVal i64/u64 union arms as JSON strings', () => {
    const i64 = { type: 'SCV_I64' as const, i64: -123n }
    const u64 = { type: 'SCV_U64' as const, u64: 123n }

    expect(toJsonSCVal(i64)).toEqual({ i64: '-123' })
    expect(toJsonSCVal(u64)).toEqual({ u64: '123' })

    expect(fromJsonSCVal({ i64: '-123' })).toEqual(i64)
    expect(fromJsonSCVal({ u64: '123' })).toEqual(u64)
  })

  it('serializes/deserializes struct field nonce as JSON string', () => {
    const nonce = { nonce: 123n }
    expect(toJsonSCNonceKey(nonce)).toEqual({ nonce: '123' })
    expect(fromJsonSCNonceKey({ nonce: '123' })).toEqual(nonce)
  })

  it('serializes/deserializes u64 vectors as JSON string arrays', () => {
    const x = {
      configSettingID: 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW' as const,
      liveSorobanStateSizeWindow: [1n, 2n, 3n, 18446744073709551615n],
    }

    expect(toJsonConfigSettingEntry(x)).toEqual({
      live_soroban_state_size_window: ['1', '2', '3', '18446744073709551615'],
    })
    expect(
      fromJsonConfigSettingEntry({
        live_soroban_state_size_window: ['1', '2', '3', '18446744073709551615'],
      }),
    ).toEqual(x)
  })
})

describe('rs-stellar-xdr parity: serde.rs', () => {
  it('serializes/deserializes AccountID as a G-address string', () => {
    const account = fromJsonAccountID('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF')
    expect(toJsonAccountID(account)).toBe(
      'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF',
    )
  })

  it('serializes/deserializes ContractID as a C-address string', () => {
    const contract = fromJsonContractID(C_ADDR)
    expect(toJsonContractID(contract)).toBe(C_ADDR)
  })

  it('serializes/deserializes NodeID as a G-address string', () => {
    const node = fromJsonNodeID(G_ADDR)
    expect(toJsonNodeID(node)).toBe(G_ADDR)
  })

  it('serializes/deserializes Hash as lowercase hex string', () => {
    const source = new TextEncoder().encode('01234567890123456789013456789012')
    expect(source.length).toBe(32)
    const hex = '3031323334353637383930313233343536373839303133343536373839303132'
    expect(toJsonHash(source)).toBe(hex)
    expect(fromJsonHash(hex)).toEqual(source)
  })

  it('keeps Int128Parts string serialization and dual deserialization', () => {
    const value = { hi: 1n, lo: 2n }
    const decimal = '18446744073709551618'
    expect(toJsonInt128Parts(value)).toBe(decimal)
    expect(fromJsonInt128Parts(decimal)).toEqual(value)
    expect(fromJsonInt128Parts({ hi: 1, lo: 2 })).toEqual(value)
  })

  it('serializes/deserializes SignatureHint as 4-byte hex string', () => {
    const hint = fromJsonSignatureHint('01020304')
    expect(toJsonSignatureHint(hint)).toBe('01020304')
  })

  it('serializes/deserializes Thresholds as 4-byte hex string', () => {
    const thresholds = fromJsonThresholds('01020304')
    expect(toJsonThresholds(thresholds)).toBe('01020304')
  })
})

describe('rs-stellar-xdr parity: serde_tx.rs', () => {
  it('round-trips canonical pretty JSON transaction envelope', () => {
    const canonical = {
      tx: {
        tx: {
          source_account: 'GA6LGYNLMJFRA4CMNTHU7WY6IB45EPLI5QWNGIWCFA2MIGXB4ZF5GQGY',
          fee: 0,
          seq_num: '1',
          cond: 'none',
          memo: { text: 'Stellar' },
          operations: [
            {
              source_account: 'GCNZ76V2Z5DGLM2XFF3PXBIJPHF4O245M6OGXSXL2WN37M2D5DUUNSOO',
              body: {
                change_trust: {
                  line: {
                    credit_alphanum4: {
                      asset_code: 'ABCD',
                      issuer: 'GBB5BH2JFIVOHKQK5WHM5XFSE2SPOUFJB3FU4CPZVR3EUVJXZLMHOLOM',
                    },
                  },
                  limit: '9223372036854775807',
                },
              },
            },
          ],
          ext: 'v0',
        },
        signatures: [],
      },
    }

    const parsed = fromJsonTransactionEnvelope(canonical)
    expect(toJsonTransactionEnvelope(parsed)).toEqual(canonical)
  })
})

describe('rs-stellar-xdr parity: str.rs stellar-specific JSON strings', () => {
  it('round-trips SignerKey G/T/X/P forms', () => {
    expect(toJsonSignerKey(fromJsonSignerKey(G_ADDR))).toBe(G_ADDR)
    expect(toJsonSignerKey(fromJsonSignerKey(T_ADDR))).toBe(T_ADDR)
    expect(toJsonSignerKey(fromJsonSignerKey(X_ADDR))).toBe(X_ADDR)
    expect(toJsonSignerKey(fromJsonSignerKey(P_ADDR))).toBe(P_ADDR)
  })

  it('round-trips SCAddress G/C/M/B/L forms', () => {
    expect(toJsonSCAddress(fromJsonSCAddress(G_ADDR))).toBe(G_ADDR)
    expect(toJsonSCAddress(fromJsonSCAddress(C_ADDR))).toBe(C_ADDR)
    expect(toJsonSCAddress(fromJsonSCAddress(M_ADDR))).toBe(M_ADDR)
    expect(toJsonSCAddress(fromJsonSCAddress(B_ADDR))).toBe(B_ADDR)
    expect(toJsonSCAddress(fromJsonSCAddress(L_ADDR))).toBe(L_ADDR)
  })

  it('round-trips ClaimableBalanceID and PoolID', () => {
    expect(toJsonClaimableBalanceID(fromJsonClaimableBalanceID(B_ADDR))).toBe(B_ADDR)
    expect(toJsonPoolID(fromJsonPoolID(L_ADDR))).toBe(L_ADDR)
  })

  it('round-trips MuxedEd25519Account M-address', () => {
    expect(toJsonMuxedEd25519Account(fromJsonMuxedEd25519Account(MUXED_123456))).toBe(MUXED_123456)
  })

  it('rejects non-B strkeys for ClaimableBalanceID parsing', () => {
    expect(() => fromJsonClaimableBalanceID(L_ADDR)).toThrow()
  })
})

describe('rs-stellar-xdr parity: str.rs asset code edge cases', () => {
  it('matches AssetCode4 escaped-byte rendering', () => {
    expect(toJsonAssetCode4(new Uint8Array([0x61, 0xc3, 0x28, 0x64]))).toBe('a\\xc3(d')
  })

  it('matches AssetCode12 minimum-length null-preserving rendering', () => {
    expect(
      toJsonAssetCode12(new Uint8Array([0x61, 0x00, 0x63, 0x64, 0x00, 0, 0, 0, 0, 0, 0, 0])),
    ).toBe('a\\0cd\\0')
  })

  it('roundtrips escaped-byte strings to the expected AssetCode variant by byte-length', () => {
    const twelve = fromJsonAssetCode('a\\xd9\\xaa\\xd9\\xaa')
    expect(twelve.type).toBe('ASSET_TYPE_CREDIT_ALPHANUM12')
    expect(toJsonAssetCode(twelve)).toBe('a\\xd9\\xaa\\xd9\\xaa')

    const four = fromJsonAssetCode('a\\xc3\\xc3d')
    expect(four.type).toBe('ASSET_TYPE_CREDIT_ALPHANUM4')
    expect(toJsonAssetCode(four)).toBe('a\\xc3\\xc3d')
  })
})
