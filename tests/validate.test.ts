import { describe, it, expect } from 'vitest'
import {
  validateScVal,
  validateScMap,
  buildSortedScMap,
  compareScVal,
  ScValValidationError,
} from '../src/validate.ts'
import type { SCVal, SCMap, SCMapEntry } from '../src/generated/contract.ts'

describe('validateScVal', () => {
  describe('always-valid variants', () => {
    const validCases: SCVal[] = [
      { type: 'SCV_BOOL', b: true },
      { type: 'SCV_BOOL', b: false },
      { type: 'SCV_VOID' },
      { type: 'SCV_U32', u32: 42 },
      { type: 'SCV_I32', i32: -1 },
      { type: 'SCV_U64', u64: 100n },
      { type: 'SCV_I64', i64: -100n },
      { type: 'SCV_TIMEPOINT', timepoint: 1000n },
      { type: 'SCV_DURATION', duration: 500n },
      { type: 'SCV_BYTES', bytes: new Uint8Array([1, 2, 3]) },
      { type: 'SCV_STRING', str: 'hello world' },
      { type: 'SCV_LEDGER_KEY_CONTRACT_INSTANCE' },
    ]

    for (const val of validCases) {
      it(`accepts ${val.type}`, () => {
        expect(() => validateScVal(val)).not.toThrow()
      })
    }
  })

  describe('SCV_SYMBOL validation', () => {
    it('accepts valid symbol with letters', () => {
      expect(() => validateScVal({ type: 'SCV_SYMBOL', sym: 'hello' })).not.toThrow()
    })

    it('accepts valid symbol with all allowed chars', () => {
      expect(() => validateScVal({ type: 'SCV_SYMBOL', sym: 'hello_World_123' })).not.toThrow()
    })

    it('accepts empty symbol', () => {
      expect(() => validateScVal({ type: 'SCV_SYMBOL', sym: '' })).not.toThrow()
    })

    it('rejects symbol with space', () => {
      expect(() => validateScVal({ type: 'SCV_SYMBOL', sym: 'hello world' })).toThrow(
        ScValValidationError,
      )
    })

    it('rejects symbol with special chars', () => {
      expect(() => validateScVal({ type: 'SCV_SYMBOL', sym: 'hello!' })).toThrow(
        ScValValidationError,
      )
    })

    it('rejects symbol with dash', () => {
      expect(() => validateScVal({ type: 'SCV_SYMBOL', sym: 'hello-world' })).toThrow(
        ScValValidationError,
      )
    })

    it('rejects symbol with dot', () => {
      expect(() => validateScVal({ type: 'SCV_SYMBOL', sym: 'hello.world' })).toThrow(
        ScValValidationError,
      )
    })
  })

  describe('SCV_VEC validation', () => {
    it('rejects Vec(None/undefined)', () => {
      expect(() => validateScVal({ type: 'SCV_VEC', vec: undefined })).toThrow(ScValValidationError)
      expect(() => validateScVal({ type: 'SCV_VEC', vec: undefined })).toThrow(/Vec\(None\)/)
    })

    it('accepts empty vec', () => {
      expect(() => validateScVal({ type: 'SCV_VEC', vec: [] })).not.toThrow()
    })

    it('accepts vec with valid elements', () => {
      const val: SCVal = {
        type: 'SCV_VEC',
        vec: [
          { type: 'SCV_U32', u32: 1 },
          { type: 'SCV_SYMBOL', sym: 'hello' },
        ],
      }
      expect(() => validateScVal(val)).not.toThrow()
    })

    it('rejects vec with invalid nested element', () => {
      const val: SCVal = {
        type: 'SCV_VEC',
        vec: [
          { type: 'SCV_U32', u32: 1 },
          { type: 'SCV_SYMBOL', sym: 'invalid!' },
        ],
      }
      expect(() => validateScVal(val)).toThrow(ScValValidationError)
    })
  })

  describe('SCV_MAP validation', () => {
    it('rejects Map(None/undefined)', () => {
      expect(() => validateScVal({ type: 'SCV_MAP', map: undefined })).toThrow(ScValValidationError)
      expect(() => validateScVal({ type: 'SCV_MAP', map: undefined })).toThrow(/Map\(None\)/)
    })

    it('accepts empty map', () => {
      expect(() => validateScVal({ type: 'SCV_MAP', map: [] })).not.toThrow()
    })

    it('accepts sorted map', () => {
      const val: SCVal = {
        type: 'SCV_MAP',
        map: [
          { key: { type: 'SCV_SYMBOL', sym: 'a' }, val: { type: 'SCV_U32', u32: 1 } },
          { key: { type: 'SCV_SYMBOL', sym: 'b' }, val: { type: 'SCV_U32', u32: 2 } },
          { key: { type: 'SCV_SYMBOL', sym: 'c' }, val: { type: 'SCV_U32', u32: 3 } },
        ],
      }
      expect(() => validateScVal(val)).not.toThrow()
    })

    it('rejects unsorted map', () => {
      const val: SCVal = {
        type: 'SCV_MAP',
        map: [
          { key: { type: 'SCV_SYMBOL', sym: 'b' }, val: { type: 'SCV_U32', u32: 2 } },
          { key: { type: 'SCV_SYMBOL', sym: 'a' }, val: { type: 'SCV_U32', u32: 1 } },
        ],
      }
      expect(() => validateScVal(val)).toThrow(ScValValidationError)
      expect(() => validateScVal(val)).toThrow(/not sorted/)
    })

    it('rejects duplicate keys', () => {
      const val: SCVal = {
        type: 'SCV_MAP',
        map: [
          { key: { type: 'SCV_SYMBOL', sym: 'a' }, val: { type: 'SCV_U32', u32: 1 } },
          { key: { type: 'SCV_SYMBOL', sym: 'a' }, val: { type: 'SCV_U32', u32: 2 } },
        ],
      }
      expect(() => validateScVal(val)).toThrow(ScValValidationError)
      expect(() => validateScVal(val)).toThrow(/duplicate/)
    })

    it('rejects map with invalid key', () => {
      const val: SCVal = {
        type: 'SCV_MAP',
        map: [{ key: { type: 'SCV_SYMBOL', sym: 'invalid!' }, val: { type: 'SCV_U32', u32: 1 } }],
      }
      expect(() => validateScVal(val)).toThrow(ScValValidationError)
    })

    it('rejects map with invalid value', () => {
      const val: SCVal = {
        type: 'SCV_MAP',
        map: [{ key: { type: 'SCV_SYMBOL', sym: 'ok' }, val: { type: 'SCV_VEC', vec: undefined } }],
      }
      expect(() => validateScVal(val)).toThrow(ScValValidationError)
    })
  })

  describe('deeply nested validation', () => {
    it('validates deeply nested valid structure', () => {
      const val: SCVal = {
        type: 'SCV_MAP',
        map: [
          {
            key: { type: 'SCV_SYMBOL', sym: 'data' },
            val: {
              type: 'SCV_VEC',
              vec: [
                {
                  type: 'SCV_MAP',
                  map: [
                    {
                      key: { type: 'SCV_SYMBOL', sym: 'inner' },
                      val: { type: 'SCV_U32', u32: 42 },
                    },
                  ],
                },
              ],
            },
          },
        ],
      }
      expect(() => validateScVal(val)).not.toThrow()
    })

    it('catches deeply nested invalid symbol', () => {
      const val: SCVal = {
        type: 'SCV_MAP',
        map: [
          {
            key: { type: 'SCV_SYMBOL', sym: 'data' },
            val: {
              type: 'SCV_VEC',
              vec: [
                {
                  type: 'SCV_MAP',
                  map: [
                    { key: { type: 'SCV_SYMBOL', sym: 'bad!' }, val: { type: 'SCV_U32', u32: 42 } },
                  ],
                },
              ],
            },
          },
        ],
      }
      expect(() => validateScVal(val)).toThrow(ScValValidationError)
    })
  })
})

describe('validateScMap', () => {
  it('accepts single-entry map', () => {
    const map: SCMap = [{ key: { type: 'SCV_U32', u32: 1 }, val: { type: 'SCV_VOID' } }]
    expect(() => validateScMap(map)).not.toThrow()
  })

  it('sorts by discriminant type first', () => {
    // U32 (type order 3) < Symbol (type order 15)
    const map: SCMap = [
      { key: { type: 'SCV_U32', u32: 999 }, val: { type: 'SCV_VOID' } },
      { key: { type: 'SCV_SYMBOL', sym: 'a' }, val: { type: 'SCV_VOID' } },
    ]
    expect(() => validateScMap(map)).not.toThrow()
  })

  it('rejects wrong type order', () => {
    // Symbol (15) before U32 (3) is wrong
    const map: SCMap = [
      { key: { type: 'SCV_SYMBOL', sym: 'a' }, val: { type: 'SCV_VOID' } },
      { key: { type: 'SCV_U32', u32: 1 }, val: { type: 'SCV_VOID' } },
    ]
    expect(() => validateScMap(map)).toThrow(ScValValidationError)
  })

  it('accepts complex key ordering via XDR fallback comparison', () => {
    const map: SCMap = [
      {
        key: { type: 'SCV_U128', u128: { hi: 0n, lo: 1n } },
        val: { type: 'SCV_VOID' },
      },
      {
        key: { type: 'SCV_U128', u128: { hi: 0n, lo: 2n } },
        val: { type: 'SCV_VOID' },
      },
    ]
    expect(() => validateScMap(map)).not.toThrow()
  })
})

describe('compareScVal', () => {
  it('compares by type first', () => {
    const u32: SCVal = { type: 'SCV_U32', u32: 0 }
    const sym: SCVal = { type: 'SCV_SYMBOL', sym: 'z' }
    expect(compareScVal(u32, sym)).toBeLessThan(0)
    expect(compareScVal(sym, u32)).toBeGreaterThan(0)
  })

  it('compares u32 values', () => {
    const a: SCVal = { type: 'SCV_U32', u32: 1 }
    const b: SCVal = { type: 'SCV_U32', u32: 2 }
    expect(compareScVal(a, b)).toBeLessThan(0)
    expect(compareScVal(b, a)).toBeGreaterThan(0)
    expect(compareScVal(a, a)).toBe(0)
  })

  it('compares i32 values', () => {
    const a: SCVal = { type: 'SCV_I32', i32: -1 }
    const b: SCVal = { type: 'SCV_I32', i32: 1 }
    expect(compareScVal(a, b)).toBeLessThan(0)
  })

  it('compares bigint values', () => {
    const a: SCVal = { type: 'SCV_U64', u64: 1n }
    const b: SCVal = { type: 'SCV_U64', u64: 2n }
    expect(compareScVal(a, b)).toBeLessThan(0)
  })

  it('compares symbols lexicographically', () => {
    const a: SCVal = { type: 'SCV_SYMBOL', sym: 'abc' }
    const b: SCVal = { type: 'SCV_SYMBOL', sym: 'abd' }
    expect(compareScVal(a, b)).toBeLessThan(0)
  })

  it('compares bytes lexicographically', () => {
    const a: SCVal = { type: 'SCV_BYTES', bytes: new Uint8Array([1, 2, 3]) }
    const b: SCVal = { type: 'SCV_BYTES', bytes: new Uint8Array([1, 2, 4]) }
    expect(compareScVal(a, b)).toBeLessThan(0)
  })

  it('shorter bytes are less than longer bytes', () => {
    const a: SCVal = { type: 'SCV_BYTES', bytes: new Uint8Array([1, 2]) }
    const b: SCVal = { type: 'SCV_BYTES', bytes: new Uint8Array([1, 2, 3]) }
    expect(compareScVal(a, b)).toBeLessThan(0)
  })

  it('compares bools (false < true)', () => {
    const f: SCVal = { type: 'SCV_BOOL', b: false }
    const t: SCVal = { type: 'SCV_BOOL', b: true }
    expect(compareScVal(f, t)).toBeLessThan(0)
    expect(compareScVal(t, f)).toBeGreaterThan(0)
  })

  it('void equals void', () => {
    const a: SCVal = { type: 'SCV_VOID' }
    const b: SCVal = { type: 'SCV_VOID' }
    expect(compareScVal(a, b)).toBe(0)
  })

  it('compares complex values by XDR bytes', () => {
    const a: SCVal = { type: 'SCV_U128', u128: { hi: 0n, lo: 1n } }
    const b: SCVal = { type: 'SCV_U128', u128: { hi: 0n, lo: 2n } }
    expect(compareScVal(a, b)).toBeLessThan(0)
  })
})

describe('buildSortedScMap', () => {
  it('sorts entries by SCVal key order', () => {
    const sorted = buildSortedScMap([
      { key: { type: 'SCV_SYMBOL', sym: 'b' }, val: { type: 'SCV_VOID' } },
      { key: { type: 'SCV_SYMBOL', sym: 'a' }, val: { type: 'SCV_VOID' } },
      { key: { type: 'SCV_U32', u32: 1 }, val: { type: 'SCV_VOID' } },
    ])

    expect(sorted.map((entry) => entry.key.type)).toEqual(['SCV_U32', 'SCV_SYMBOL', 'SCV_SYMBOL'])
    expect((sorted[1]!.key as SCVal).type).toBe('SCV_SYMBOL')
    expect((sorted[1]!.key as SCVal & { sym: string }).sym).toBe('a')
  })

  it('accepts any iterable input', () => {
    const iterable = new Set<SCMapEntry>([
      { key: { type: 'SCV_U32', u32: 3 }, val: { type: 'SCV_VOID' } },
      { key: { type: 'SCV_U32', u32: 1 }, val: { type: 'SCV_VOID' } },
    ])
    const sorted = buildSortedScMap(iterable)
    expect(sorted.map((entry) => (entry.key as { u32: number }).u32)).toEqual([1, 3])
  })
})
