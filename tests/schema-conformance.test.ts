import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import Ajv2019 from 'ajv/dist/2019'
import type { ErrorObject, ValidateFunction } from 'ajv'

import {
  decodeTransactionEnvelope,
  fromJsonTransactionEnvelope,
  fromJsonMemo,
  toJsonMemo,
  toJsonTransactionEnvelope,
} from '../src/generated/transaction.ts'
import { fromJsonAsset, toJsonAsset } from '../src/generated/ledger-entries.ts'
import {
  fromJsonSignerKey,
  fromJsonPoolID,
  fromJsonClaimableBalanceID,
  toJsonSignerKey,
  toJsonPoolID,
  toJsonClaimableBalanceID,
} from '../src/generated/types.ts'
import { fromJsonSCAddress, toJsonSCAddress } from '../src/generated/contract.ts'
import {
  fromJsonConfigSettingEntry,
  toJsonConfigSettingEntry,
} from '../src/generated/contract-config-setting.ts'
import { base64ToBytes } from '../src/codec.ts'

function loadSchema(name: string): Record<string, unknown> {
  return JSON.parse(
    readFileSync(new URL(`./fixtures/xdr-json/curr/${name}`, import.meta.url), 'utf8'),
  ) as Record<string, unknown>
}

const ajv = new Ajv2019({
  strict: false,
  allErrors: true,
  validateFormats: false,
  unevaluated: true,
})

const validateTransactionEnvelope = ajv.compile(loadSchema('TransactionEnvelope.json'))
const validateAsset = ajv.compile(loadSchema('Asset.json'))
const validateMemo = ajv.compile(loadSchema('Memo.json'))
const validateSignerKey = ajv.compile(loadSchema('SignerKey.json'))
const validateScAddress = ajv.compile(loadSchema('ScAddress.json'))
const validateClaimableBalanceId = ajv.compile(loadSchema('ClaimableBalanceId.json'))
const validatePoolId = ajv.compile(loadSchema('PoolId.json'))
const validateConfigSettingEntry = ajv.compile(loadSchema('ConfigSettingEntry.json'))

const V1_ENVELOPE_VECTOR =
  'AAAAAgAAAADL13HWIyocdKsZ7A7HM8Srqmv+uZWc+rI4xx3M8oedCQAAAMgAAAAAAAAAAQAAAAEAAAAAAAAwOQAAAAAAAN3VAAAAAgAAAAAAAABkAAAAAQAAAAAAAAABAAAAANKYxYFXEWWR6TIJ6Vx6W/8SGy4dP2GLaND8yO/l5eRwAAAAAAAAAAJUC+QAAAAAAAAAAAHyh50JAAAAQCXOQnmno3he687bKRtDc6+BXRUf8t+RnTuHy+sKf35UjfFiQbIge+txehmg0N61JsFWfwbL0JtgOjzyeZw5JAs='

const G_ADDR = 'GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ'
const C_ADDR = 'CA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUWDA'
const M_ADDR = 'MA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVAAAAAAAAAAAAAJLK'
const P_ADDR =
  'PA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUAAAAAQACAQDAQCQMBYIBEFAWDANBYHRAEISCMKBKFQXDAMRUGY4DUPB6IBZGM'
const T_ADDR = 'TA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUPUI'
const X_ADDR = 'XA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVLRR'
const B_ADDR = 'BAADMPVKHBTYIH522D2O3CGHPHSP4ZXFNISHBXEYYDWJYBZ5AXD3CA3GDE'
const L_ADDR = 'LA3D5KRYM6CB7OWQ6TWYRR3Z4T7GNZLKERYNZGGA5SOAOPIFY6YQGZ5J'

function validationErrorText(validate: ValidateFunction): string {
  if (!(validate.errors as ErrorObject[] | null)?.length) {
    return 'unknown validation error'
  }
  return (validate.errors as ErrorObject[])
    .map((e) => `${e.instancePath || '/'} ${e.message ?? ''}`.trim())
    .join('; ')
}

describe('JSON Schema conformance (rs-stellar-xdr xdr-json/curr)', () => {
  it('toJsonTransactionEnvelope output validates against TransactionEnvelope schema', () => {
    const env = decodeTransactionEnvelope(base64ToBytes(V1_ENVELOPE_VECTOR))
    const json = toJsonTransactionEnvelope(env)
    const valid = validateTransactionEnvelope(json)
    expect(valid, validationErrorText(validateTransactionEnvelope)).toBe(true)
  })

  it('fromJsonTransactionEnvelope accepts schema-valid envelope JSON', () => {
    const env = decodeTransactionEnvelope(base64ToBytes(V1_ENVELOPE_VECTOR))
    const json = toJsonTransactionEnvelope(env)
    const roundtrip = fromJsonTransactionEnvelope(json)
    expect(roundtrip.type).toBe('ENVELOPE_TYPE_TX')
    if (roundtrip.type !== 'ENVELOPE_TYPE_TX') {
      throw new Error('Expected ENVELOPE_TYPE_TX envelope')
    }
    expect(roundtrip.v1.tx.operations.length).toBeGreaterThan(0)
  })

  it('schema rejects malformed envelope JSON', () => {
    const env = decodeTransactionEnvelope(base64ToBytes(V1_ENVELOPE_VECTOR))
    const json = toJsonTransactionEnvelope(env) as Record<string, unknown>
    const malformed = structuredClone(json) as Record<string, any>
    malformed.tx.tx.source_account = 123

    const valid = validateTransactionEnvelope(malformed)
    expect(valid).toBe(false)
    expect(validationErrorText(validateTransactionEnvelope)).toMatch(/must be string/)
  })

  it('validates Asset schema and roundtrips with generated converters', () => {
    const native = 'native'
    const alpha4 = {
      credit_alphanum4: {
        asset_code: 'ABCD',
        issuer: 'GBB5BH2JFIVOHKQK5WHM5XFSE2SPOUFJB3FU4CPZVR3EUVJXZLMHOLOM',
      },
    }
    expect(validateAsset(native), validationErrorText(validateAsset)).toBe(true)
    expect(validateAsset(alpha4), validationErrorText(validateAsset)).toBe(true)
    expect(toJsonAsset(fromJsonAsset(alpha4))).toEqual(alpha4)
    expect(validateAsset({ credit_alphanum4: { asset_code: 'ABCD', issuer: 123 } })).toBe(false)
  })

  it('validates Memo schema and roundtrips with generated converters', () => {
    const none = 'none'
    const text = { text: 'Stellar' }
    const id = { id: '123' }
    expect(validateMemo(none), validationErrorText(validateMemo)).toBe(true)
    expect(validateMemo(text), validationErrorText(validateMemo)).toBe(true)
    expect(validateMemo(id), validationErrorText(validateMemo)).toBe(true)
    expect(toJsonMemo(fromJsonMemo(text))).toEqual(text)
    expect(validateMemo({ id: 123 })).toBe(false)
  })

  it('validates SignerKey schema and converters for G/T/X/P forms', () => {
    for (const value of [G_ADDR, T_ADDR, X_ADDR, P_ADDR]) {
      expect(validateSignerKey(value), validationErrorText(validateSignerKey)).toBe(true)
      expect(toJsonSignerKey(fromJsonSignerKey(value))).toBe(value)
    }
    expect(validateSignerKey(123)).toBe(false)
  })

  it('validates ScAddress schema and converters for G/C/M/B/L forms', () => {
    for (const value of [G_ADDR, C_ADDR, M_ADDR, B_ADDR, L_ADDR]) {
      expect(validateScAddress(value), validationErrorText(validateScAddress)).toBe(true)
      expect(toJsonSCAddress(fromJsonSCAddress(value))).toBe(value)
    }
    // Canonical schema is intentionally broad (type:string), so prefix-level
    // rejection lives in generated converter logic.
    const invalid = 'XBU2RRGLXH3E5CQHTD3ODLDF2BWDCYUSSBLLZ5GNW7JXHDIYKXZWGTOG'
    expect(validateScAddress(invalid), validationErrorText(validateScAddress)).toBe(true)
    expect(() => fromJsonSCAddress(invalid)).toThrow()
  })

  it('validates ClaimableBalanceId and PoolId schemas plus converter roundtrips', () => {
    expect(
      validateClaimableBalanceId(B_ADDR),
      validationErrorText(validateClaimableBalanceId),
    ).toBe(true)
    expect(validatePoolId(L_ADDR), validationErrorText(validatePoolId)).toBe(true)

    expect(toJsonClaimableBalanceID(fromJsonClaimableBalanceID(B_ADDR))).toBe(B_ADDR)
    expect(toJsonPoolID(fromJsonPoolID(L_ADDR))).toBe(L_ADDR)

    // Canonical schemas are broad (type:string), strictness is enforced by converters.
    expect(
      validateClaimableBalanceId(L_ADDR),
      validationErrorText(validateClaimableBalanceId),
    ).toBe(true)
    expect(validatePoolId(B_ADDR), validationErrorText(validatePoolId)).toBe(true)
    expect(() => fromJsonClaimableBalanceID(L_ADDR)).toThrow()
    expect(() => fromJsonPoolID(B_ADDR)).toThrow()
  })

  it('validates ConfigSettingEntry schema on a complex u64-array union arm', () => {
    const json = {
      live_soroban_state_size_window: ['1', '2', '3', '18446744073709551615'],
    }
    expect(validateConfigSettingEntry(json), validationErrorText(validateConfigSettingEntry)).toBe(
      true,
    )
    expect(toJsonConfigSettingEntry(fromJsonConfigSettingEntry(json))).toEqual(json)

    const malformed = {
      live_soroban_state_size_window: ['1', '2', 3, '18446744073709551615'],
    }
    expect(validateConfigSettingEntry(malformed)).toBe(false)
  })
})
