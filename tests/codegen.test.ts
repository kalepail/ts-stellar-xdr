import { describe, expect, it } from 'vitest'
import { toJsonBinaryFuseFilterType, fromJsonBinaryFuseFilterType } from '../src/generated/types.ts'
import { ENUM_INTROSPECTION, UNION_INTROSPECTION } from '../src/generated/introspection.ts'
import { parseCodegenCliArgs, getStellarXdrBase, resolveCodegenOptions } from '../scripts/codegen/index.ts'
import { computeEnumPrefix, enumMemberJsonName } from '../scripts/codegen/generator.ts'

const SOURCE_LOCK_FIXTURE = {
  stellar_xdr: {
    curr: {
      ref: 'v25.0',
      commit: '0a621ec7811db000a60efae5b35f78dee3aa2533',
      released_at: '2025-11-26',
    },
    next: {
      ref: 'next',
      commit: '',
      released_at: '',
    },
  },
} as const

describe('codegen CLI args', () => {
  it('uses curr channel by default', () => {
    expect(parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts'])).toEqual({
      channel: 'curr',
      ref: undefined,
      outDir: undefined,
    })
  })

  it('supports --channel/--ref/--out-dir forms', () => {
    expect(parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--channel', 'next'])).toEqual({
      channel: 'next',
      ref: undefined,
      outDir: undefined,
    })
    expect(parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--channel=curr'])).toEqual({
      channel: 'curr',
      ref: undefined,
      outDir: undefined,
    })
    expect(parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--ref', 'next'])).toEqual({
      channel: 'curr',
      ref: 'next',
      outDir: undefined,
    })
    expect(parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--ref=stable'])).toEqual({
      channel: 'curr',
      ref: 'stable',
      outDir: undefined,
    })
    expect(parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--out-dir', 'src/generated-next'])).toEqual({
      channel: 'curr',
      ref: undefined,
      outDir: 'src/generated-next',
    })
    expect(parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--out-dir=tmp/out'])).toEqual({
      channel: 'curr',
      ref: undefined,
      outDir: 'tmp/out',
    })
  })

  it('rejects missing/unknown args', () => {
    expect(() => parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--ref'])).toThrow(/Missing value/)
    expect(() => parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--channel'])).toThrow(/Missing value/)
    expect(() => parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--out-dir'])).toThrow(/Missing value/)
    expect(() => parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--channel', 'foo'])).toThrow(/Invalid --channel/)
    expect(() => parseCodegenCliArgs(['bun', 'scripts/codegen/index.ts', '--wat'])).toThrow(/Unknown argument/)
  })

  it('builds raw github URL from ref', () => {
    expect(getStellarXdrBase('curr')).toBe('https://raw.githubusercontent.com/stellar/stellar-xdr/curr')
    expect(getStellarXdrBase('next')).toBe('https://raw.githubusercontent.com/stellar/stellar-xdr/next')
  })
})

describe('codegen source-lock resolution', () => {
  it('uses channel defaults from source lock when ref/out-dir are omitted', () => {
    expect(resolveCodegenOptions({ channel: 'curr' }, SOURCE_LOCK_FIXTURE)).toEqual({
      channel: 'curr',
      ref: 'v25.0',
      outDir: 'src/generated',
      lockedCommit: '0a621ec7811db000a60efae5b35f78dee3aa2533',
      sourceDescriptor: 'https://github.com/stellar/stellar-xdr (channel=curr, ref=v25.0, commit=0a621ec7811db000a60efae5b35f78dee3aa2533)',
    })

    expect(resolveCodegenOptions({ channel: 'next' }, SOURCE_LOCK_FIXTURE)).toEqual({
      channel: 'next',
      ref: 'next',
      outDir: 'src/generated-next',
      lockedCommit: '',
      sourceDescriptor: 'https://github.com/stellar/stellar-xdr (channel=next, ref=next)',
    })
  })

  it('lets explicit CLI values override the source lock', () => {
    expect(resolveCodegenOptions({
      channel: 'curr',
      ref: 'next',
      outDir: '/tmp/out',
    }, SOURCE_LOCK_FIXTURE)).toEqual({
      channel: 'curr',
      ref: 'next',
      outDir: '/tmp/out',
      lockedCommit: '',
      sourceDescriptor: 'https://github.com/stellar/stellar-xdr (channel=curr, ref=next)',
    })
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
