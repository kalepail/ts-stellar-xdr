import { describe, expect, it } from 'vitest'
import { encodeContract, encodeEd25519PublicKey } from '../src/strkey.ts'
import { nativeToScVal, scValToBigInt, scValToNative } from '../src/scval.ts'
import type { SCVal } from '../src/generated/contract.ts'

describe('nativeToScVal', () => {
  it('converts null/undefined to void', () => {
    expect(nativeToScVal(null)).toEqual({ type: 'SCV_VOID' })
    expect(nativeToScVal(undefined)).toEqual({ type: 'SCV_VOID' })
  })

  it('passes through existing SCVal', () => {
    const v: SCVal = { type: 'SCV_BOOL', b: true }
    expect(nativeToScVal(v)).toBe(v)
  })

  it('uses smallest fitting signed/unsigned integer variant by default', () => {
    expect(nativeToScVal(7)).toEqual({ type: 'SCV_U32', u32: 7 })
    expect(nativeToScVal(-7)).toEqual({ type: 'SCV_I32', i32: -7 })
    expect(nativeToScVal(1n << 40n)).toEqual({ type: 'SCV_U64', u64: 1n << 40n })
    expect(nativeToScVal(-(1n << 40n))).toEqual({ type: 'SCV_I64', i64: -(1n << 40n) })
  })

  it('supports forced integer/string/symbol/address conversions', () => {
    expect(nativeToScVal('123', { type: 'u32' })).toEqual({ type: 'SCV_U32', u32: 123 })
    expect(nativeToScVal('hello', { type: 'symbol' })).toEqual({ type: 'SCV_SYMBOL', sym: 'hello' })
    expect(nativeToScVal(Uint8Array.from([104, 105]), { type: 'string' })).toEqual({
      type: 'SCV_STRING',
      str: 'hi',
    })

    const g = encodeEd25519PublicKey(new Uint8Array(32).fill(7))
    expect(nativeToScVal(g, { type: 'address' })).toEqual({
      type: 'SCV_ADDRESS',
      address: {
        type: 'SC_ADDRESS_TYPE_ACCOUNT',
        accountId: { type: 'PUBLIC_KEY_TYPE_ED25519', ed25519: new Uint8Array(32).fill(7) },
      },
    })
  })

  it('converts arrays with per-index type hints', () => {
    const scv = nativeToScVal([1, 'a', false, 'tail'], { type: ['i128', 'symbol'] })
    expect(scv.type).toBe('SCV_VEC')
    if (scv.type !== 'SCV_VEC') {
      throw new Error('Expected SCV_VEC')
    }
    expect(scv.vec?.map((v: SCVal) => v.type)).toEqual([
      'SCV_I128',
      'SCV_SYMBOL',
      'SCV_BOOL',
      'SCV_STRING',
    ])
  })

  it('converts plain objects to sorted maps with key/value type overrides', () => {
    const scv = nativeToScVal(
      { c: true, a: 1, b: 'x' },
      {
        type: {
          a: ['symbol', 'i64'],
        },
      },
    )

    expect(scv.type).toBe('SCV_MAP')
    if (scv.type !== 'SCV_MAP') {
      throw new Error('Expected SCV_MAP')
    }
    const keys = scv.map?.map((entry) => entry.key.type)
    expect(keys).toEqual(['SCV_STRING', 'SCV_STRING', 'SCV_SYMBOL'])

    const symbolEntry = scv.map?.find(
      (entry: { key: SCVal; val: SCVal }) => entry.key.type === 'SCV_SYMBOL',
    )
    expect(symbolEntry?.val.type).toBe('SCV_I64')
  })

  it('supports address conversion for contract addresses', () => {
    const c = encodeContract(new Uint8Array(32).fill(9))
    const scv = nativeToScVal(c, { type: 'address' })
    expect(scv).toEqual({
      type: 'SCV_ADDRESS',
      address: { type: 'SC_ADDRESS_TYPE_CONTRACT', contractId: new Uint8Array(32).fill(9) },
    })
  })
})

describe('scValToNative', () => {
  it('converts integer-like variants back to bigint/number', () => {
    expect(scValToNative({ type: 'SCV_U32', u32: 9 })).toBe(9)
    expect(scValToNative({ type: 'SCV_I64', i64: -9n })).toBe(-9n)
    expect(
      scValToNative({
        type: 'SCV_I128',
        i128: { hi: 1n, lo: 2n },
      }),
    ).toBe(18446744073709551618n)
  })

  it('converts map and vec recursively', () => {
    const scv: SCVal = {
      type: 'SCV_MAP',
      map: [
        { key: { type: 'SCV_STRING', str: 'count' }, val: { type: 'SCV_U32', u32: 3 } },
        {
          key: { type: 'SCV_STRING', str: 'items' },
          val: {
            type: 'SCV_VEC',
            vec: [
              { type: 'SCV_SYMBOL', sym: 'a' },
              { type: 'SCV_SYMBOL', sym: 'b' },
            ],
          },
        },
      ],
    }
    expect(scValToNative(scv)).toEqual({ count: 3, items: ['a', 'b'] })
  })

  it('converts address and error variants to native-friendly forms', () => {
    const g = encodeEd25519PublicKey(new Uint8Array(32).fill(3))
    expect(scValToNative(nativeToScVal(g, { type: 'address' }))).toBe(g)

    expect(
      scValToNative({
        type: 'SCV_ERROR',
        error: { type: 'SCE_CONTRACT', contractCode: 99 },
      }),
    ).toEqual({ type: 'contract', code: 99 })
    expect(
      scValToNative({
        type: 'SCV_ERROR',
        error: { type: 'SCE_STORAGE', code: 'SCEC_INTERNAL_ERROR' },
      }),
    ).toEqual({ type: 'system', code: 'SCEC_INTERNAL_ERROR' })
  })
})

describe('scValToBigInt', () => {
  it('supports all integer-like SCVal variants', () => {
    expect(scValToBigInt({ type: 'SCV_U32', u32: 1 })).toBe(1n)
    expect(scValToBigInt({ type: 'SCV_I32', i32: -1 })).toBe(-1n)
    expect(scValToBigInt({ type: 'SCV_U64', u64: 2n })).toBe(2n)
    expect(scValToBigInt({ type: 'SCV_I64', i64: -2n })).toBe(-2n)
    expect(scValToBigInt({ type: 'SCV_TIMEPOINT', timepoint: 3n })).toBe(3n)
    expect(scValToBigInt({ type: 'SCV_DURATION', duration: 4n })).toBe(4n)
    expect(scValToBigInt({ type: 'SCV_U128', u128: { hi: 1n, lo: 5n } })).toBe((1n << 64n) + 5n)
    expect(scValToBigInt({ type: 'SCV_I128', i128: { hi: -1n, lo: 0n } })).toBe(-(1n << 64n))
    expect(
      scValToBigInt({
        type: 'SCV_U256',
        u256: { hi_hi: 0n, hi_lo: 0n, lo_hi: 0n, lo_lo: 9n },
      }),
    ).toBe(9n)
    expect(
      scValToBigInt({
        type: 'SCV_I256',
        i256: { hi_hi: -1n, hi_lo: 0n, lo_hi: 0n, lo_lo: 0n },
      }),
    ).toBe(-(1n << 192n))
  })

  it('throws for non-integer variants', () => {
    expect(() => scValToBigInt({ type: 'SCV_STRING', str: 'x' })).toThrow(
      /Expected integer-like SCVal/,
    )
  })
})
