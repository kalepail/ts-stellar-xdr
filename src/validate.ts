/**
 * ScVal validation (post-decode semantic checks).
 *
 * Matches the Rust rs-stellar-xdr Validate trait behavior.
 * These rules go beyond XDR structural correctness to enforce
 * Soroban contract value semantics.
 */

import type { SCVal, SCMap, SCMapEntry } from './generated/contract.js'
import { encodeSCVal } from './generated/contract.js'

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class ScValValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ScValValidationError'
  }
}

// ---------------------------------------------------------------------------
// Symbol character validation
// ---------------------------------------------------------------------------

/** Valid characters for SCSymbol: [_0-9A-Za-z] */
const SYMBOL_CHAR_RE = /^[_0-9A-Za-z]*$/

// ---------------------------------------------------------------------------
// ScVal validation
// ---------------------------------------------------------------------------

/**
 * Validate an SCVal according to Soroban contract rules.
 *
 * Rules:
 * - `SCV_SYMBOL`: every character must be `[_0-9A-Za-z]`, empty is valid
 * - `SCV_VEC(undefined)`: always invalid (None vec)
 * - `SCV_MAP(undefined)`: always invalid (None map)
 * - `SCV_VEC(value)`: every element must recursively validate
 * - `SCV_MAP(value)`: keys must be strictly sorted ascending, no duplicates,
 *   and all keys/values must recursively validate
 * - All other variants: always valid
 *
 * @throws ScValValidationError if the value is invalid
 */
export function validateScVal(val: SCVal): void {
  switch (val.type) {
    // Variants that are always valid
    case 'SCV_BOOL':
    case 'SCV_VOID':
    case 'SCV_ERROR':
    case 'SCV_U32':
    case 'SCV_I32':
    case 'SCV_U64':
    case 'SCV_I64':
    case 'SCV_TIMEPOINT':
    case 'SCV_DURATION':
    case 'SCV_U128':
    case 'SCV_I128':
    case 'SCV_U256':
    case 'SCV_I256':
    case 'SCV_BYTES':
    case 'SCV_STRING':
    case 'SCV_ADDRESS':
    case 'SCV_CONTRACT_INSTANCE':
    case 'SCV_LEDGER_KEY_CONTRACT_INSTANCE':
    case 'SCV_LEDGER_KEY_NONCE':
      return

    case 'SCV_SYMBOL':
      if (!SYMBOL_CHAR_RE.test(val.sym)) {
        throw new ScValValidationError(
          `Invalid SCSymbol: contains characters outside [_0-9A-Za-z]: ${JSON.stringify(val.sym)}`,
        )
      }
      return

    case 'SCV_VEC':
      if (val.vec === undefined) {
        throw new ScValValidationError('Invalid SCVal: Vec(None) is not allowed')
      }
      for (const elem of val.vec) {
        validateScVal(elem)
      }
      return

    case 'SCV_MAP':
      if (val.map === undefined) {
        throw new ScValValidationError('Invalid SCVal: Map(None) is not allowed')
      }
      validateScMap(val.map)
      return
  }
}

/**
 * Validate an SCMap:
 * 1. All keys and values must recursively validate
 * 2. Keys must be strictly sorted ascending (no duplicates)
 *
 * @throws ScValValidationError if the map is invalid
 */
export function validateScMap(map: SCMap): void {
  // Validate all keys and values
  for (const entry of map) {
    validateScVal(entry.key)
    validateScVal(entry.val)
  }

  // Check strict ascending key order (no duplicates)
  for (let i = 1; i < map.length; i++) {
    const cmp = compareScVal(map[i - 1]!.key, map[i]!.key)
    if (cmp >= 0) {
      if (cmp === 0) {
        throw new ScValValidationError(`Invalid SCMap: duplicate key at index ${i}`)
      }
      throw new ScValValidationError(
        `Invalid SCMap: keys not sorted at index ${i} (key ${i - 1} > key ${i})`,
      )
    }
  }
}

/**
 * Build a sorted SCMap from arbitrary entries.
 *
 * Soroban requires map keys to be strictly sorted. This helper sorts entries by
 * `compareScVal(entry.key)` so the resulting map is valid for encoding and
 * contract execution.
 */
export function buildSortedScMap(entries: Iterable<SCMapEntry>): SCMap {
  return Array.from(entries).sort((a, b) => compareScVal(a.key, b.key))
}

// ---------------------------------------------------------------------------
// ScVal comparison (for map key ordering)
// ---------------------------------------------------------------------------

/**
 * Ordering index for SCVal discriminants.
 * Matches the Rust-derived PartialOrd: discriminants are compared first by
 * their enum integer value in the XDR definition.
 */
const SCVAL_TYPE_ORDER: Record<SCVal['type'], number> = {
  SCV_BOOL: 0,
  SCV_VOID: 1,
  SCV_ERROR: 2,
  SCV_U32: 3,
  SCV_I32: 4,
  SCV_U64: 5,
  SCV_I64: 6,
  SCV_TIMEPOINT: 7,
  SCV_DURATION: 8,
  SCV_U128: 9,
  SCV_I128: 10,
  SCV_U256: 11,
  SCV_I256: 12,
  SCV_BYTES: 13,
  SCV_STRING: 14,
  SCV_SYMBOL: 15,
  SCV_VEC: 16,
  SCV_MAP: 17,
  SCV_ADDRESS: 18,
  SCV_CONTRACT_INSTANCE: 19,
  SCV_LEDGER_KEY_CONTRACT_INSTANCE: 20,
  SCV_LEDGER_KEY_NONCE: 21,
}

/**
 * Compare two SCVal values for ordering.
 * Returns negative if a < b, 0 if equal, positive if a > b.
 * Matches the Rust derived PartialOrd behavior.
 */
export function compareScVal(a: SCVal, b: SCVal): number {
  // Compare by discriminant type first
  const typeA = SCVAL_TYPE_ORDER[a.type]
  const typeB = SCVAL_TYPE_ORDER[b.type]
  if (typeA !== typeB) return typeA - typeB

  // Same discriminant — compare by inner value
  switch (a.type) {
    case 'SCV_BOOL':
      return compareBool(a.b, (b as typeof a).b)
    case 'SCV_VOID':
    case 'SCV_LEDGER_KEY_CONTRACT_INSTANCE':
      return 0 // no inner value
    case 'SCV_U32':
      return a.u32 - (b as typeof a).u32
    case 'SCV_I32':
      return a.i32 - (b as typeof a).i32
    case 'SCV_U64':
      return compareBigint(a.u64, (b as typeof a).u64)
    case 'SCV_I64':
      return compareBigint(a.i64, (b as typeof a).i64)
    case 'SCV_TIMEPOINT':
      return compareBigint(a.timepoint, (b as typeof a).timepoint)
    case 'SCV_DURATION':
      return compareBigint(a.duration, (b as typeof a).duration)
    case 'SCV_SYMBOL':
      return compareString(a.sym, (b as typeof a).sym)
    case 'SCV_STRING':
      return compareString(a.str, (b as typeof a).str)
    case 'SCV_BYTES':
      return compareBytes(a.bytes, (b as typeof a).bytes)
    default:
      // For complex types (Error, U128, I128, U256, I256, Vec, Map, Address,
      // ContractInstance, LedgerKeyNonce), compare canonical XDR encodings.
      // This provides deterministic total ordering for map key sorting.
      return compareBytes(encodeSCVal(a), encodeSCVal(b as typeof a))
  }
}

function compareBool(a: boolean, b: boolean): number {
  return (a ? 1 : 0) - (b ? 1 : 0)
}

function compareBigint(a: bigint, b: bigint): number {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

function compareString(a: string, b: string): number {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

function compareBytes(a: Uint8Array, b: Uint8Array): number {
  const minLen = Math.min(a.length, b.length)
  for (let i = 0; i < minLen; i++) {
    if (a[i]! !== b[i]!) return a[i]! - b[i]!
  }
  return a.length - b.length
}
