import {
  type SCAddress,
  type SCError,
  type SCMap,
  type SCMapEntry,
  type SCVal,
  type Int128Parts,
  type Int256Parts,
  type UInt128Parts,
  type UInt256Parts,
  toJsonSCAddress,
} from './generated/contract.js'
import {
  decodeClaimableBalance,
  decodeContract,
  decodeEd25519PublicKey,
  decodeLiquidityPool,
  decodeMuxedAccountStrKey,
} from './strkey.js'
import {
  int128PartsToDecimal,
  int256PartsToDecimal,
  uint128PartsToDecimal,
  uint256PartsToDecimal,
  decimalToInt128Parts,
  decimalToInt256Parts,
  decimalToUint128Parts,
  decimalToUint256Parts,
} from './json.js'
import { buildSortedScMap } from './validate.js'

export type ScValIntegerType =
  | 'u32'
  | 'i32'
  | 'u64'
  | 'i64'
  | 'timepoint'
  | 'duration'
  | 'u128'
  | 'i128'
  | 'u256'
  | 'i256'

export type ScValTypeHint =
  | ScValIntegerType
  | 'string'
  | 'symbol'
  | 'address'
  | 'bytes'

export type ScValMapTypeHints = Record<
  string,
  readonly [ScValTypeHint | null | undefined, ScValTypeHint | null | undefined]
>

export interface NativeToScValOptions {
  type?:
    | ScValTypeHint
    | readonly (ScValTypeHint | null | undefined)[]
    | ScValMapTypeHints
}

const UINT32_MAX = 0xFFFFFFFFn
const INT32_MIN = -0x80000000n
const INT32_MAX = 0x7FFFFFFFn
const UINT64_MAX = 0xFFFFFFFFFFFFFFFFn
const INT64_MIN = -0x8000000000000000n
const INT64_MAX = 0x7FFFFFFFFFFFFFFFn
const UINT128_MAX = (1n << 128n) - 1n
const INT128_MIN = -(1n << 127n)
const INT128_MAX = (1n << 127n) - 1n
const UINT256_MAX = (1n << 256n) - 1n
const INT256_MIN = -(1n << 255n)
const INT256_MAX = (1n << 255n) - 1n

const textDecoder = /*#__PURE__*/ new TextDecoder('utf-8', { fatal: true })

export function nativeToScVal(val: unknown, opts: NativeToScValOptions = {}): SCVal {
  if (val === null || val === undefined) {
    return { type: 'SCV_VOID' }
  }

  if (isScVal(val)) {
    return val
  }

  if (typeof val === 'boolean') {
    return { type: 'SCV_BOOL', b: val }
  }

  if (typeof val === 'number' || typeof val === 'bigint') {
    return numberLikeToScVal(val, asTypeHint(opts.type))
  }

  if (typeof val === 'string') {
    const hint = asTypeHint(opts.type)
    if (hint === undefined || hint === 'string') {
      return { type: 'SCV_STRING', str: val }
    }
    if (hint === 'symbol') {
      return { type: 'SCV_SYMBOL', sym: val }
    }
    if (hint === 'address') {
      return { type: 'SCV_ADDRESS', address: strKeyToScAddress(val) }
    }
    if (isIntegerType(hint)) {
      return numberLikeToScVal(BigInt(val), hint)
    }
    throw new TypeError(`Invalid type hint (${hint}) for string input`)
  }

  if (typeof val === 'function') {
    return nativeToScVal(val(), opts)
  }

  if (isBytesLike(val)) {
    const bytes = Uint8Array.from(val)
    const hint = asTypeHint(opts.type) ?? 'bytes'
    switch (hint) {
      case 'bytes':
        return { type: 'SCV_BYTES', bytes }
      case 'string':
        return { type: 'SCV_STRING', str: textDecoder.decode(bytes) }
      case 'symbol':
        return { type: 'SCV_SYMBOL', sym: textDecoder.decode(bytes) }
      default:
        throw new TypeError(`Invalid type hint (${hint}) for bytes input`)
    }
  }

  if (Array.isArray(val)) {
    const types = Array.isArray(opts.type) ? opts.type : undefined
    return {
      type: 'SCV_VEC',
      vec: val.map((item, i) => {
        const hintedType = types?.[i]
        return nativeToScVal(item, hintedType === null || hintedType === undefined ? {} : { type: hintedType })
      }),
    }
  }

  if (isPlainObject(val)) {
    const typeHints = isMapTypeHints(opts.type) ? opts.type : undefined
    const entries: SCMapEntry[] = Object.entries(val)
      .sort(([k1], [k2]) => k1.localeCompare(k2))
      .map(([key, value]) => {
        const [keyType, valueType] = typeHints?.[key] ?? [null, null]
        return {
          key: nativeToScVal(key, keyType === null || keyType === undefined ? {} : { type: keyType }),
          val: nativeToScVal(value, valueType === null || valueType === undefined ? {} : { type: valueType }),
        }
      })

    return { type: 'SCV_MAP', map: buildSortedScMap(entries) }
  }

  throw new TypeError(`Cannot convert value of type ${typeof val} to SCVal`)
}

export function scValToNative(val: SCVal): unknown {
  switch (val.type) {
    case 'SCV_VOID':
      return null
    case 'SCV_BOOL':
      return val.b
    case 'SCV_U32':
      return val.u32
    case 'SCV_I32':
      return val.i32
    case 'SCV_U64':
      return val.u64
    case 'SCV_I64':
      return val.i64
    case 'SCV_TIMEPOINT':
      return val.timepoint
    case 'SCV_DURATION':
      return val.duration
    case 'SCV_U128':
    case 'SCV_I128':
    case 'SCV_U256':
    case 'SCV_I256':
      return scValToBigInt(val)
    case 'SCV_BYTES':
      return Uint8Array.from(val.bytes)
    case 'SCV_STRING':
      return val.str
    case 'SCV_SYMBOL':
      return val.sym
    case 'SCV_VEC':
      return (val.vec ?? []).map(scValToNative)
    case 'SCV_MAP':
      return Object.fromEntries((val.map ?? []).map((entry) => [scValToNative(entry.key), scValToNative(entry.val)]))
    case 'SCV_ADDRESS':
      return toJsonSCAddress(val.address)
    case 'SCV_ERROR':
      return scErrorToNative(val.error)
    case 'SCV_CONTRACT_INSTANCE':
      return val.instance
    case 'SCV_LEDGER_KEY_CONTRACT_INSTANCE':
      return { type: val.type }
    case 'SCV_LEDGER_KEY_NONCE':
      return { nonce: val.nonce_key.nonce }
  }
}

export function scValToBigInt(val: SCVal): bigint {
  switch (val.type) {
    case 'SCV_U32':
    case 'SCV_I32':
      return BigInt(val.type === 'SCV_U32' ? val.u32 : val.i32)
    case 'SCV_U64':
      return val.u64
    case 'SCV_I64':
      return val.i64
    case 'SCV_TIMEPOINT':
      return val.timepoint
    case 'SCV_DURATION':
      return val.duration
    case 'SCV_U128':
      return BigInt(uint128PartsToDecimal(val.u128.hi, val.u128.lo))
    case 'SCV_I128':
      return BigInt(int128PartsToDecimal(val.i128.hi, val.i128.lo))
    case 'SCV_U256':
      return BigInt(uint256PartsToDecimal(val.u256.hi_hi, val.u256.hi_lo, val.u256.lo_hi, val.u256.lo_lo))
    case 'SCV_I256':
      return BigInt(int256PartsToDecimal(val.i256.hi_hi, val.i256.hi_lo, val.i256.lo_hi, val.i256.lo_lo))
    default:
      throw new TypeError(`Expected integer-like SCVal, got ${val.type}`)
  }
}

function numberLikeToScVal(input: number | bigint, forcedType?: ScValTypeHint): SCVal {
  const value = toBigInt(input)

  if (forcedType !== undefined && !isIntegerType(forcedType)) {
    throw new TypeError(`Invalid type hint (${forcedType}) for integer input`)
  }

  if (forcedType !== undefined) {
    return makeForcedIntegerScVal(value, forcedType)
  }

  if (value >= 0n) {
    if (value <= UINT32_MAX) return { type: 'SCV_U32', u32: Number(value) }
    if (value <= UINT64_MAX) return { type: 'SCV_U64', u64: value }
    if (value <= UINT128_MAX) return { type: 'SCV_U128', u128: toUInt128Parts(value) }
    if (value <= UINT256_MAX) return { type: 'SCV_U256', u256: toUInt256Parts(value) }
    throw new RangeError(`Integer out of range for SCVal unsigned types: ${value}`)
  }

  if (value >= INT32_MIN) return { type: 'SCV_I32', i32: Number(value) }
  if (value >= INT64_MIN) return { type: 'SCV_I64', i64: value }
  if (value >= INT128_MIN) return { type: 'SCV_I128', i128: toInt128Parts(value) }
  if (value >= INT256_MIN) return { type: 'SCV_I256', i256: toInt256Parts(value) }
  throw new RangeError(`Integer out of range for SCVal signed types: ${value}`)
}

function makeForcedIntegerScVal(value: bigint, forcedType: ScValIntegerType): SCVal {
  switch (forcedType) {
    case 'u32':
      assertRange(value, 0n, UINT32_MAX, forcedType)
      return { type: 'SCV_U32', u32: Number(value) }
    case 'i32':
      assertRange(value, INT32_MIN, INT32_MAX, forcedType)
      return { type: 'SCV_I32', i32: Number(value) }
    case 'u64':
      assertRange(value, 0n, UINT64_MAX, forcedType)
      return { type: 'SCV_U64', u64: value }
    case 'i64':
      assertRange(value, INT64_MIN, INT64_MAX, forcedType)
      return { type: 'SCV_I64', i64: value }
    case 'timepoint':
      assertRange(value, 0n, UINT64_MAX, forcedType)
      return { type: 'SCV_TIMEPOINT', timepoint: value }
    case 'duration':
      assertRange(value, 0n, UINT64_MAX, forcedType)
      return { type: 'SCV_DURATION', duration: value }
    case 'u128':
      assertRange(value, 0n, UINT128_MAX, forcedType)
      return { type: 'SCV_U128', u128: toUInt128Parts(value) }
    case 'i128':
      assertRange(value, INT128_MIN, INT128_MAX, forcedType)
      return { type: 'SCV_I128', i128: toInt128Parts(value) }
    case 'u256':
      assertRange(value, 0n, UINT256_MAX, forcedType)
      return { type: 'SCV_U256', u256: toUInt256Parts(value) }
    case 'i256':
      assertRange(value, INT256_MIN, INT256_MAX, forcedType)
      return { type: 'SCV_I256', i256: toInt256Parts(value) }
  }
}

function strKeyToScAddress(strKey: string): SCAddress {
  if (strKey.startsWith('G')) {
    return {
      type: 'SC_ADDRESS_TYPE_ACCOUNT',
      accountId: { type: 'PUBLIC_KEY_TYPE_ED25519', ed25519: decodeEd25519PublicKey(strKey) },
    }
  }
  if (strKey.startsWith('C')) {
    return { type: 'SC_ADDRESS_TYPE_CONTRACT', contractId: decodeContract(strKey) }
  }
  if (strKey.startsWith('M')) {
    const { ed25519, memoId } = decodeMuxedAccountStrKey(strKey)
    return {
      type: 'SC_ADDRESS_TYPE_MUXED_ACCOUNT',
      muxedAccount: { id: memoId, ed25519 },
    }
  }
  if (strKey.startsWith('B')) {
    return {
      type: 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE',
      claimableBalanceId: { type: 'CLAIMABLE_BALANCE_ID_TYPE_V0', v0: decodeClaimableBalance(strKey) },
    }
  }
  if (strKey.startsWith('L')) {
    return { type: 'SC_ADDRESS_TYPE_LIQUIDITY_POOL', liquidityPoolId: decodeLiquidityPool(strKey) }
  }
  throw new TypeError(`Unsupported address strkey for SCAddress: ${strKey}`)
}

function scErrorToNative(error: SCError): { type: 'contract'; code: number } | { type: 'system'; code: string } {
  if (error.type === 'SCE_CONTRACT') {
    return { type: 'contract', code: error.contractCode }
  }
  return { type: 'system', code: error.code }
}

function toUInt128Parts(value: bigint): UInt128Parts {
  const [hi, lo] = decimalToUint128Parts(value.toString())
  return { hi, lo }
}

function toInt128Parts(value: bigint): Int128Parts {
  const [hi, lo] = decimalToInt128Parts(value.toString())
  return { hi, lo }
}

function toUInt256Parts(value: bigint): UInt256Parts {
  const [hi_hi, hi_lo, lo_hi, lo_lo] = decimalToUint256Parts(value.toString())
  return { hi_hi, hi_lo, lo_hi, lo_lo }
}

function toInt256Parts(value: bigint): Int256Parts {
  const [hi_hi, hi_lo, lo_hi, lo_lo] = decimalToInt256Parts(value.toString())
  return { hi_hi, hi_lo, lo_hi, lo_lo }
}

function toBigInt(value: number | bigint): bigint {
  if (typeof value === 'bigint') {
    return value
  }
  if (!Number.isInteger(value)) {
    throw new TypeError(`Expected integer number for SCVal conversion, got ${value}`)
  }
  if (!Number.isSafeInteger(value)) {
    throw new TypeError(`Unsafe integer number for SCVal conversion: ${value}`)
  }
  return BigInt(value)
}

function assertRange(value: bigint, min: bigint, max: bigint, type: string): void {
  if (value < min || value > max) {
    throw new RangeError(`Value ${value} is out of range for ${type}`)
  }
}

function isScVal(v: unknown): v is SCVal {
  return typeof v === 'object' && v !== null && typeof (v as { type?: unknown }).type === 'string'
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  if (typeof v !== 'object' || v === null) return false
  return Object.getPrototypeOf(v) === Object.prototype
}

function isBytesLike(v: unknown): v is Uint8Array {
  return v instanceof Uint8Array
}

function isIntegerType(hint: ScValTypeHint): hint is ScValIntegerType {
  return hint === 'u32'
    || hint === 'i32'
    || hint === 'u64'
    || hint === 'i64'
    || hint === 'timepoint'
    || hint === 'duration'
    || hint === 'u128'
    || hint === 'i128'
    || hint === 'u256'
    || hint === 'i256'
}

function asTypeHint(
  type: NativeToScValOptions['type'],
): ScValTypeHint | undefined {
  return typeof type === 'string' ? type : undefined
}

function isMapTypeHints(type: NativeToScValOptions['type']): type is ScValMapTypeHints {
  return typeof type === 'object' && type !== null && !Array.isArray(type)
}
