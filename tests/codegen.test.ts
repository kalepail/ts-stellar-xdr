import { describe, expect, it } from 'vitest'
import { toJsonBinaryFuseFilterType, fromJsonBinaryFuseFilterType } from '../src/generated/types.ts'
import { ENUM_INTROSPECTION, UNION_INTROSPECTION } from '../src/generated/introspection.ts'
import { parseCodegenCliArgs, getStellarXdrBase } from '../scripts/codegen/index.ts'
import { computeEnumPrefix, enumMemberJsonName } from '../scripts/codegen/generator.ts'

describe('codegen CLI args', () => {
  it('uses curr ref by default', () => {
    expect(parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts'])).toEqual({ ref: 'curr' })
  })

  it('supports --ref value forms', () => {
    expect(parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--ref', 'next'])).toEqual({ ref: 'next' })
    expect(parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--ref=stable'])).toEqual({ ref: 'stable' })
  })

  it('rejects missing/unknown args', () => {
    expect(() => parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--ref'])).toThrow(/Missing value/)
    expect(() => parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--wat'])).toThrow(/Unknown argument/)
  })

  it('builds raw github URL from ref', () => {
    expect(getStellarXdrBase('curr')).toBe('https://raw.githubusercontent.com/stellar/stellar-xdr/curr')
    expect(getStellarXdrBase('next')).toBe('https://raw.githubusercontent.com/stellar/stellar-xdr/next')
  })
})

describe('enum json naming helpers', () => {
  it('computes common prefixes on word boundaries', () => {
    expect(computeEnumPrefix(['MEMO_NONE', 'MEMO_TEXT', 'MEMO_ID'])).toBe('MEMO_')
    expect(computeEnumPrefix(['CREATE_ACCOUNT', 'PAYMENT'])).toBe('')
  })

  it('applies leading-digit safeguard when prefix stripping starts with a digit', () => {
    expect(enumMemberJsonName('BINARY_FUSE_FILTER_8_BIT', 'BINARY_FUSE_FILTER_')).toBe('b8_bit')
    expect(enumMemberJsonName('MEMO_NONE', 'MEMO_')).toBe('none')
  })

  it('reflects leading-digit safeguard in generated enum json maps', () => {
    expect(toJsonBinaryFuseFilterType('BINARY_FUSE_FILTER_8_BIT')).toBe('b8_bit')
    expect(fromJsonBinaryFuseFilterType('b8_bit')).toBe('BINARY_FUSE_FILTER_8_BIT')
  })
})

describe('generated introspection metadata', () => {
  it('contains enum metadata with values and json names', () => {
    const memoType = ENUM_INTROSPECTION.MemoType
    expect(memoType?.name).toBe('MemoType')
    const none = memoType?.members.find((m) => m.name === 'MEMO_NONE')
    expect(none).toEqual({ name: 'MEMO_NONE', value: 0, jsonName: 'none' })
  })

  it('contains union metadata for enum and int discriminants', () => {
    const memoUnion = UNION_INTROSPECTION.Memo
    expect(memoUnion?.discriminantKind).toBe('enum')
    expect(memoUnion?.arms.some((arm) => arm.cases.some((c) => c.jsonName === 'text'))).toBe(true)

    const txPhaseUnion = UNION_INTROSPECTION.TransactionPhase
    expect(txPhaseUnion?.discriminantKind).toBe('int')
    expect(txPhaseUnion?.arms.some((arm) => arm.cases.some((c) => c.jsonName === 'v0'))).toBe(true)
  })
})
