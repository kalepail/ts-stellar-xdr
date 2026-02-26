// AUTO-GENERATED — do not edit manually
// Run: bun scripts/codegen/index.ts
// Source: https://github.com/stellar/stellar-xdr (curr branch)

import type { XdrReader, XdrWriter } from '../codec.js'
import {
  readInt32, writeInt32, readUint32, writeUint32,
  readInt64, writeInt64, readUint64, writeUint64,
  readBool, writeBool,
  readFloat, writeFloat, readDouble, writeDouble,
  readFixedOpaque, writeFixedOpaque,
  readVarOpaque, writeVarOpaque,
  readString, writeString,
  readOptional, writeOptional,
  readFixedArray, writeFixedArray,
  readVarArray, writeVarArray,
  beginComposite, endComposite,
  XdrReadError,
  encode, decode,
  bytesToHex, hexToBytes,
} from '../codec.js'
import {
  int128PartsToDecimal, decimalToInt128Parts,
  uint128PartsToDecimal, decimalToUint128Parts,
  int256PartsToDecimal, decimalToInt256Parts,
  uint256PartsToDecimal, decimalToUint256Parts,
  escapeAssetCode4, escapeAssetCode12,
  unescapeAssetCode, assetCodeByteLength,
  escapeXdrString, unescapeXdrString,
  unionKey,
} from '../json.js'
import {
  encodeEd25519PublicKey, decodeEd25519PublicKey,
  encodeContract, decodeContract,
  encodeMuxedAccountStrKey, decodeMuxedAccountStrKey,
  encodePreAuthTx, decodePreAuthTx,
  encodeSha256Hash, decodeSha256Hash,
  encodeSignedPayload, decodeSignedPayload,
  encodeClaimableBalance, decodeClaimableBalance,
  encodeLiquidityPool, decodeLiquidityPool,
} from '../strkey.js'

/** Maximum value of an XDR unsigned 32-bit integer — used as the default array/string length limit. */
const UINT32_MAX = 0xffffffff

import type { AccountID, ClaimableBalanceID, ContractID, Duration, Hash, PoolID, TimePoint, int32, int64, uint256, uint32, uint64 } from './types.js'
import { readAccountID, writeAccountID, toJsonAccountID, fromJsonAccountID, readClaimableBalanceID, writeClaimableBalanceID, toJsonClaimableBalanceID, fromJsonClaimableBalanceID, readContractID, writeContractID, toJsonContractID, fromJsonContractID, readDuration, writeDuration, toJsonDuration, fromJsonDuration, readHash, writeHash, toJsonHash, fromJsonHash, readPoolID, writePoolID, toJsonPoolID, fromJsonPoolID, readTimePoint, writeTimePoint, toJsonTimePoint, fromJsonTimePoint, readint32, writeint32, toJsonint32, fromJsonint32, readint64, writeint64, toJsonint64, fromJsonint64, readuint256, writeuint256, toJsonuint256, fromJsonuint256, readuint32, writeuint32, toJsonuint32, fromJsonuint32, readuint64, writeuint64, toJsonuint64, fromJsonuint64 } from './types.js'


export type SCValType =
  | 'SCV_BOOL'
  | 'SCV_VOID'
  | 'SCV_ERROR'
  | 'SCV_U32'
  | 'SCV_I32'
  | 'SCV_U64'
  | 'SCV_I64'
  | 'SCV_TIMEPOINT'
  | 'SCV_DURATION'
  | 'SCV_U128'
  | 'SCV_I128'
  | 'SCV_U256'
  | 'SCV_I256'
  | 'SCV_BYTES'
  | 'SCV_STRING'
  | 'SCV_SYMBOL'
  | 'SCV_VEC'
  | 'SCV_MAP'
  | 'SCV_ADDRESS'
  | 'SCV_CONTRACT_INSTANCE'
  | 'SCV_LEDGER_KEY_CONTRACT_INSTANCE'
  | 'SCV_LEDGER_KEY_NONCE'

export const S_C_VAL_TYPE_TO_INT: Record<SCValType, number> = /*#__PURE__*/ {
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

export const S_C_VAL_TYPE_FROM_INT: Record<number, SCValType> = /*#__PURE__*/ {
  0: 'SCV_BOOL',
  1: 'SCV_VOID',
  2: 'SCV_ERROR',
  3: 'SCV_U32',
  4: 'SCV_I32',
  5: 'SCV_U64',
  6: 'SCV_I64',
  7: 'SCV_TIMEPOINT',
  8: 'SCV_DURATION',
  9: 'SCV_U128',
  10: 'SCV_I128',
  11: 'SCV_U256',
  12: 'SCV_I256',
  13: 'SCV_BYTES',
  14: 'SCV_STRING',
  15: 'SCV_SYMBOL',
  16: 'SCV_VEC',
  17: 'SCV_MAP',
  18: 'SCV_ADDRESS',
  19: 'SCV_CONTRACT_INSTANCE',
  20: 'SCV_LEDGER_KEY_CONTRACT_INSTANCE',
  21: 'SCV_LEDGER_KEY_NONCE',
}

export function readSCValType(r: XdrReader): SCValType {
  const v = readInt32(r)
  const result = S_C_VAL_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCValType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCValType(w: XdrWriter, v: SCValType): void {
  writeInt32(w, S_C_VAL_TYPE_TO_INT[v])
}

export function encodeSCValType(v: SCValType): Uint8Array {
  return encode(v, writeSCValType)
}

export function decodeSCValType(input: Uint8Array | string): SCValType {
  return decode(input, readSCValType)
}

const _S_C_VAL_TYPE_TO_JSON: Record<SCValType, string> = /*#__PURE__*/ {
  SCV_BOOL: 'bool',
  SCV_VOID: 'void',
  SCV_ERROR: 'error',
  SCV_U32: 'u32',
  SCV_I32: 'i32',
  SCV_U64: 'u64',
  SCV_I64: 'i64',
  SCV_TIMEPOINT: 'timepoint',
  SCV_DURATION: 'duration',
  SCV_U128: 'u128',
  SCV_I128: 'i128',
  SCV_U256: 'u256',
  SCV_I256: 'i256',
  SCV_BYTES: 'bytes',
  SCV_STRING: 'string',
  SCV_SYMBOL: 'symbol',
  SCV_VEC: 'vec',
  SCV_MAP: 'map',
  SCV_ADDRESS: 'address',
  SCV_CONTRACT_INSTANCE: 'contract_instance',
  SCV_LEDGER_KEY_CONTRACT_INSTANCE: 'ledger_key_contract_instance',
  SCV_LEDGER_KEY_NONCE: 'ledger_key_nonce',
}

const _S_C_VAL_TYPE_FROM_JSON: Record<string, SCValType> = /*#__PURE__*/ {
  'bool': 'SCV_BOOL',
  'void': 'SCV_VOID',
  'error': 'SCV_ERROR',
  'u32': 'SCV_U32',
  'i32': 'SCV_I32',
  'u64': 'SCV_U64',
  'i64': 'SCV_I64',
  'timepoint': 'SCV_TIMEPOINT',
  'duration': 'SCV_DURATION',
  'u128': 'SCV_U128',
  'i128': 'SCV_I128',
  'u256': 'SCV_U256',
  'i256': 'SCV_I256',
  'bytes': 'SCV_BYTES',
  'string': 'SCV_STRING',
  'symbol': 'SCV_SYMBOL',
  'vec': 'SCV_VEC',
  'map': 'SCV_MAP',
  'address': 'SCV_ADDRESS',
  'contract_instance': 'SCV_CONTRACT_INSTANCE',
  'ledger_key_contract_instance': 'SCV_LEDGER_KEY_CONTRACT_INSTANCE',
  'ledger_key_nonce': 'SCV_LEDGER_KEY_NONCE',
}

export function toJsonSCValType(v: SCValType): string {
  return _S_C_VAL_TYPE_TO_JSON[v]
}

export function fromJsonSCValType(json: unknown): SCValType {
  const result = _S_C_VAL_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCValType JSON value: ${json}`)
  return result
}

export type SCErrorType =
  | 'SCE_CONTRACT'
  | 'SCE_WASM_VM'
  | 'SCE_CONTEXT'
  | 'SCE_STORAGE'
  | 'SCE_OBJECT'
  | 'SCE_CRYPTO'
  | 'SCE_EVENTS'
  | 'SCE_BUDGET'
  | 'SCE_VALUE'
  | 'SCE_AUTH'

export const S_C_ERROR_TYPE_TO_INT: Record<SCErrorType, number> = /*#__PURE__*/ {
  SCE_CONTRACT: 0,
  SCE_WASM_VM: 1,
  SCE_CONTEXT: 2,
  SCE_STORAGE: 3,
  SCE_OBJECT: 4,
  SCE_CRYPTO: 5,
  SCE_EVENTS: 6,
  SCE_BUDGET: 7,
  SCE_VALUE: 8,
  SCE_AUTH: 9,
}

export const S_C_ERROR_TYPE_FROM_INT: Record<number, SCErrorType> = /*#__PURE__*/ {
  0: 'SCE_CONTRACT',
  1: 'SCE_WASM_VM',
  2: 'SCE_CONTEXT',
  3: 'SCE_STORAGE',
  4: 'SCE_OBJECT',
  5: 'SCE_CRYPTO',
  6: 'SCE_EVENTS',
  7: 'SCE_BUDGET',
  8: 'SCE_VALUE',
  9: 'SCE_AUTH',
}

export function readSCErrorType(r: XdrReader): SCErrorType {
  const v = readInt32(r)
  const result = S_C_ERROR_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCErrorType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCErrorType(w: XdrWriter, v: SCErrorType): void {
  writeInt32(w, S_C_ERROR_TYPE_TO_INT[v])
}

export function encodeSCErrorType(v: SCErrorType): Uint8Array {
  return encode(v, writeSCErrorType)
}

export function decodeSCErrorType(input: Uint8Array | string): SCErrorType {
  return decode(input, readSCErrorType)
}

const _S_C_ERROR_TYPE_TO_JSON: Record<SCErrorType, string> = /*#__PURE__*/ {
  SCE_CONTRACT: 'contract',
  SCE_WASM_VM: 'wasm_vm',
  SCE_CONTEXT: 'context',
  SCE_STORAGE: 'storage',
  SCE_OBJECT: 'object',
  SCE_CRYPTO: 'crypto',
  SCE_EVENTS: 'events',
  SCE_BUDGET: 'budget',
  SCE_VALUE: 'value',
  SCE_AUTH: 'auth',
}

const _S_C_ERROR_TYPE_FROM_JSON: Record<string, SCErrorType> = /*#__PURE__*/ {
  'contract': 'SCE_CONTRACT',
  'wasm_vm': 'SCE_WASM_VM',
  'context': 'SCE_CONTEXT',
  'storage': 'SCE_STORAGE',
  'object': 'SCE_OBJECT',
  'crypto': 'SCE_CRYPTO',
  'events': 'SCE_EVENTS',
  'budget': 'SCE_BUDGET',
  'value': 'SCE_VALUE',
  'auth': 'SCE_AUTH',
}

export function toJsonSCErrorType(v: SCErrorType): string {
  return _S_C_ERROR_TYPE_TO_JSON[v]
}

export function fromJsonSCErrorType(json: unknown): SCErrorType {
  const result = _S_C_ERROR_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCErrorType JSON value: ${json}`)
  return result
}

export type SCErrorCode =
  | 'SCEC_ARITH_DOMAIN'
  | 'SCEC_INDEX_BOUNDS'
  | 'SCEC_INVALID_INPUT'
  | 'SCEC_MISSING_VALUE'
  | 'SCEC_EXISTING_VALUE'
  | 'SCEC_EXCEEDED_LIMIT'
  | 'SCEC_INVALID_ACTION'
  | 'SCEC_INTERNAL_ERROR'
  | 'SCEC_UNEXPECTED_TYPE'
  | 'SCEC_UNEXPECTED_SIZE'

export const S_C_ERROR_CODE_TO_INT: Record<SCErrorCode, number> = /*#__PURE__*/ {
  SCEC_ARITH_DOMAIN: 0,
  SCEC_INDEX_BOUNDS: 1,
  SCEC_INVALID_INPUT: 2,
  SCEC_MISSING_VALUE: 3,
  SCEC_EXISTING_VALUE: 4,
  SCEC_EXCEEDED_LIMIT: 5,
  SCEC_INVALID_ACTION: 6,
  SCEC_INTERNAL_ERROR: 7,
  SCEC_UNEXPECTED_TYPE: 8,
  SCEC_UNEXPECTED_SIZE: 9,
}

export const S_C_ERROR_CODE_FROM_INT: Record<number, SCErrorCode> = /*#__PURE__*/ {
  0: 'SCEC_ARITH_DOMAIN',
  1: 'SCEC_INDEX_BOUNDS',
  2: 'SCEC_INVALID_INPUT',
  3: 'SCEC_MISSING_VALUE',
  4: 'SCEC_EXISTING_VALUE',
  5: 'SCEC_EXCEEDED_LIMIT',
  6: 'SCEC_INVALID_ACTION',
  7: 'SCEC_INTERNAL_ERROR',
  8: 'SCEC_UNEXPECTED_TYPE',
  9: 'SCEC_UNEXPECTED_SIZE',
}

export function readSCErrorCode(r: XdrReader): SCErrorCode {
  const v = readInt32(r)
  const result = S_C_ERROR_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCErrorCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCErrorCode(w: XdrWriter, v: SCErrorCode): void {
  writeInt32(w, S_C_ERROR_CODE_TO_INT[v])
}

export function encodeSCErrorCode(v: SCErrorCode): Uint8Array {
  return encode(v, writeSCErrorCode)
}

export function decodeSCErrorCode(input: Uint8Array | string): SCErrorCode {
  return decode(input, readSCErrorCode)
}

const _S_C_ERROR_CODE_TO_JSON: Record<SCErrorCode, string> = /*#__PURE__*/ {
  SCEC_ARITH_DOMAIN: 'arith_domain',
  SCEC_INDEX_BOUNDS: 'index_bounds',
  SCEC_INVALID_INPUT: 'invalid_input',
  SCEC_MISSING_VALUE: 'missing_value',
  SCEC_EXISTING_VALUE: 'existing_value',
  SCEC_EXCEEDED_LIMIT: 'exceeded_limit',
  SCEC_INVALID_ACTION: 'invalid_action',
  SCEC_INTERNAL_ERROR: 'internal_error',
  SCEC_UNEXPECTED_TYPE: 'unexpected_type',
  SCEC_UNEXPECTED_SIZE: 'unexpected_size',
}

const _S_C_ERROR_CODE_FROM_JSON: Record<string, SCErrorCode> = /*#__PURE__*/ {
  'arith_domain': 'SCEC_ARITH_DOMAIN',
  'index_bounds': 'SCEC_INDEX_BOUNDS',
  'invalid_input': 'SCEC_INVALID_INPUT',
  'missing_value': 'SCEC_MISSING_VALUE',
  'existing_value': 'SCEC_EXISTING_VALUE',
  'exceeded_limit': 'SCEC_EXCEEDED_LIMIT',
  'invalid_action': 'SCEC_INVALID_ACTION',
  'internal_error': 'SCEC_INTERNAL_ERROR',
  'unexpected_type': 'SCEC_UNEXPECTED_TYPE',
  'unexpected_size': 'SCEC_UNEXPECTED_SIZE',
}

export function toJsonSCErrorCode(v: SCErrorCode): string {
  return _S_C_ERROR_CODE_TO_JSON[v]
}

export function fromJsonSCErrorCode(json: unknown): SCErrorCode {
  const result = _S_C_ERROR_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCErrorCode JSON value: ${json}`)
  return result
}

export type SCError =
  | { readonly type: 'SCE_CONTRACT'; readonly contractCode: uint32 }
  | { readonly type: 'SCE_WASM_VM'; readonly code: SCErrorCode }
  | { readonly type: 'SCE_CONTEXT'; readonly code: SCErrorCode }
  | { readonly type: 'SCE_STORAGE'; readonly code: SCErrorCode }
  | { readonly type: 'SCE_OBJECT'; readonly code: SCErrorCode }
  | { readonly type: 'SCE_CRYPTO'; readonly code: SCErrorCode }
  | { readonly type: 'SCE_EVENTS'; readonly code: SCErrorCode }
  | { readonly type: 'SCE_BUDGET'; readonly code: SCErrorCode }
  | { readonly type: 'SCE_VALUE'; readonly code: SCErrorCode }
  | { readonly type: 'SCE_AUTH'; readonly code: SCErrorCode }

export function readSCError(r: XdrReader): SCError {
  beginComposite(r)
  try {
    const type = readSCErrorType(r)
    let result: SCError
    switch (type) {
      case 'SCE_CONTRACT':
        result = { type, contractCode: readuint32(r) }; break
      case 'SCE_WASM_VM':
      case 'SCE_CONTEXT':
      case 'SCE_STORAGE':
      case 'SCE_OBJECT':
      case 'SCE_CRYPTO':
      case 'SCE_EVENTS':
      case 'SCE_BUDGET':
      case 'SCE_VALUE':
      case 'SCE_AUTH':
        result = { type, code: readSCErrorCode(r) }; break
      default:
        throw new XdrReadError(`Unknown SCError discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSCError(w: XdrWriter, v: SCError): void {
  writeSCErrorType(w, v.type)
  switch (v.type) {
    case 'SCE_CONTRACT':
      writeuint32(w, (v as any).contractCode); break
    case 'SCE_WASM_VM':
    case 'SCE_CONTEXT':
    case 'SCE_STORAGE':
    case 'SCE_OBJECT':
    case 'SCE_CRYPTO':
    case 'SCE_EVENTS':
    case 'SCE_BUDGET':
    case 'SCE_VALUE':
    case 'SCE_AUTH':
      writeSCErrorCode(w, (v as any).code); break
  }
}

export function encodeSCError(v: SCError): Uint8Array {
  return encode(v, writeSCError)
}

export function decodeSCError(input: Uint8Array | string): SCError {
  return decode(input, readSCError)
}

export function toJsonSCError(v: SCError): unknown {
  switch (v.type) {
    case 'SCE_CONTRACT':
      return { 'contract': toJsonuint32((v as any).contractCode) }
    case 'SCE_WASM_VM':
      return { 'wasm_vm': toJsonSCErrorCode((v as any).code) }
    case 'SCE_CONTEXT':
      return { 'context': toJsonSCErrorCode((v as any).code) }
    case 'SCE_STORAGE':
      return { 'storage': toJsonSCErrorCode((v as any).code) }
    case 'SCE_OBJECT':
      return { 'object': toJsonSCErrorCode((v as any).code) }
    case 'SCE_CRYPTO':
      return { 'crypto': toJsonSCErrorCode((v as any).code) }
    case 'SCE_EVENTS':
      return { 'events': toJsonSCErrorCode((v as any).code) }
    case 'SCE_BUDGET':
      return { 'budget': toJsonSCErrorCode((v as any).code) }
    case 'SCE_VALUE':
      return { 'value': toJsonSCErrorCode((v as any).code) }
    case 'SCE_AUTH':
      return { 'auth': toJsonSCErrorCode((v as any).code) }
  }
}

export function fromJsonSCError(json: unknown): SCError {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for SCError: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'contract':
      return { type: 'SCE_CONTRACT', contractCode: fromJsonuint32(obj[key]) } as SCError
    case 'wasm_vm':
      return { type: 'SCE_WASM_VM', code: fromJsonSCErrorCode(obj[key]) } as SCError
    case 'context':
      return { type: 'SCE_CONTEXT', code: fromJsonSCErrorCode(obj[key]) } as SCError
    case 'storage':
      return { type: 'SCE_STORAGE', code: fromJsonSCErrorCode(obj[key]) } as SCError
    case 'object':
      return { type: 'SCE_OBJECT', code: fromJsonSCErrorCode(obj[key]) } as SCError
    case 'crypto':
      return { type: 'SCE_CRYPTO', code: fromJsonSCErrorCode(obj[key]) } as SCError
    case 'events':
      return { type: 'SCE_EVENTS', code: fromJsonSCErrorCode(obj[key]) } as SCError
    case 'budget':
      return { type: 'SCE_BUDGET', code: fromJsonSCErrorCode(obj[key]) } as SCError
    case 'value':
      return { type: 'SCE_VALUE', code: fromJsonSCErrorCode(obj[key]) } as SCError
    case 'auth':
      return { type: 'SCE_AUTH', code: fromJsonSCErrorCode(obj[key]) } as SCError
    default: throw new Error(`Unknown SCError variant: ${key}`)
  }
}

export interface UInt128Parts {
  readonly hi: uint64
  readonly lo: uint64
}

export function readUInt128Parts(r: XdrReader): UInt128Parts {
  beginComposite(r)
  try {
    const hi = readuint64(r)
    const lo = readuint64(r)
    return { hi, lo }
  } finally {
    endComposite(r)
  }
}

export function writeUInt128Parts(w: XdrWriter, v: UInt128Parts): void {
  writeuint64(w, v.hi)
  writeuint64(w, v.lo)
}

export function encodeUInt128Parts(v: UInt128Parts): Uint8Array {
  return encode(v, writeUInt128Parts)
}

export function decodeUInt128Parts(input: Uint8Array | string): UInt128Parts {
  return decode(input, readUInt128Parts)
}

export function toJsonUInt128Parts(v: UInt128Parts): string {
  return uint128PartsToDecimal(v.hi, v.lo)
}

export function fromJsonUInt128Parts(json: unknown): UInt128Parts {
  if (typeof json === 'object' && json !== null) {
    const o = json as Record<string, unknown>
    return { hi: BigInt(o['hi'] as string | number), lo: BigInt(o['lo'] as string | number) }
  }
  const [hi, lo] = decimalToUint128Parts(json as string)
  return { hi, lo }
}

/**
 * A signed int128 has a high sign bit and 127 value bits. We break it into a
 * signed high int64 (that carries the sign bit and the high 63 value bits) and
 * a low unsigned uint64 that carries the low 64 bits. This will sort in
 * generated code in the same order the underlying int128 sorts.
 */
export interface Int128Parts {
  readonly hi: int64
  readonly lo: uint64
}

export function readInt128Parts(r: XdrReader): Int128Parts {
  beginComposite(r)
  try {
    const hi = readint64(r)
    const lo = readuint64(r)
    return { hi, lo }
  } finally {
    endComposite(r)
  }
}

export function writeInt128Parts(w: XdrWriter, v: Int128Parts): void {
  writeint64(w, v.hi)
  writeuint64(w, v.lo)
}

export function encodeInt128Parts(v: Int128Parts): Uint8Array {
  return encode(v, writeInt128Parts)
}

export function decodeInt128Parts(input: Uint8Array | string): Int128Parts {
  return decode(input, readInt128Parts)
}

export function toJsonInt128Parts(v: Int128Parts): string {
  return int128PartsToDecimal(v.hi, v.lo)
}

export function fromJsonInt128Parts(json: unknown): Int128Parts {
  if (typeof json === 'object' && json !== null) {
    const o = json as Record<string, unknown>
    return { hi: BigInt(o['hi'] as string | number), lo: BigInt(o['lo'] as string | number) }
  }
  const [hi, lo] = decimalToInt128Parts(json as string)
  return { hi, lo }
}

export interface UInt256Parts {
  readonly hi_hi: uint64
  readonly hi_lo: uint64
  readonly lo_hi: uint64
  readonly lo_lo: uint64
}

export function readUInt256Parts(r: XdrReader): UInt256Parts {
  beginComposite(r)
  try {
    const hi_hi = readuint64(r)
    const hi_lo = readuint64(r)
    const lo_hi = readuint64(r)
    const lo_lo = readuint64(r)
    return { hi_hi, hi_lo, lo_hi, lo_lo }
  } finally {
    endComposite(r)
  }
}

export function writeUInt256Parts(w: XdrWriter, v: UInt256Parts): void {
  writeuint64(w, v.hi_hi)
  writeuint64(w, v.hi_lo)
  writeuint64(w, v.lo_hi)
  writeuint64(w, v.lo_lo)
}

export function encodeUInt256Parts(v: UInt256Parts): Uint8Array {
  return encode(v, writeUInt256Parts)
}

export function decodeUInt256Parts(input: Uint8Array | string): UInt256Parts {
  return decode(input, readUInt256Parts)
}

export function toJsonUInt256Parts(v: UInt256Parts): string {
  return uint256PartsToDecimal(v.hi_hi, v.hi_lo, v.lo_hi, v.lo_lo)
}

export function fromJsonUInt256Parts(json: unknown): UInt256Parts {
  if (typeof json === 'object' && json !== null) {
    const o = json as Record<string, unknown>
    return { hi_hi: BigInt(o['hi_hi'] as string | number), hi_lo: BigInt(o['hi_lo'] as string | number), lo_hi: BigInt(o['lo_hi'] as string | number), lo_lo: BigInt(o['lo_lo'] as string | number) }
  }
  const [hi_hi, hi_lo, lo_hi, lo_lo] = decimalToUint256Parts(json as string)
  return { hi_hi, hi_lo, lo_hi, lo_lo }
}

/**
 * A signed int256 has a high sign bit and 255 value bits. We break it into a
 * signed high int64 (that carries the sign bit and the high 63 value bits) and
 * three low unsigned `uint64`s that carry the lower bits. This will sort in
 * generated code in the same order the underlying int256 sorts.
 */
export interface Int256Parts {
  readonly hi_hi: int64
  readonly hi_lo: uint64
  readonly lo_hi: uint64
  readonly lo_lo: uint64
}

export function readInt256Parts(r: XdrReader): Int256Parts {
  beginComposite(r)
  try {
    const hi_hi = readint64(r)
    const hi_lo = readuint64(r)
    const lo_hi = readuint64(r)
    const lo_lo = readuint64(r)
    return { hi_hi, hi_lo, lo_hi, lo_lo }
  } finally {
    endComposite(r)
  }
}

export function writeInt256Parts(w: XdrWriter, v: Int256Parts): void {
  writeint64(w, v.hi_hi)
  writeuint64(w, v.hi_lo)
  writeuint64(w, v.lo_hi)
  writeuint64(w, v.lo_lo)
}

export function encodeInt256Parts(v: Int256Parts): Uint8Array {
  return encode(v, writeInt256Parts)
}

export function decodeInt256Parts(input: Uint8Array | string): Int256Parts {
  return decode(input, readInt256Parts)
}

export function toJsonInt256Parts(v: Int256Parts): string {
  return int256PartsToDecimal(v.hi_hi, v.hi_lo, v.lo_hi, v.lo_lo)
}

export function fromJsonInt256Parts(json: unknown): Int256Parts {
  if (typeof json === 'object' && json !== null) {
    const o = json as Record<string, unknown>
    return { hi_hi: BigInt(o['hi_hi'] as string | number), hi_lo: BigInt(o['hi_lo'] as string | number), lo_hi: BigInt(o['lo_hi'] as string | number), lo_lo: BigInt(o['lo_lo'] as string | number) }
  }
  const [hi_hi, hi_lo, lo_hi, lo_lo] = decimalToInt256Parts(json as string)
  return { hi_hi, hi_lo, lo_hi, lo_lo }
}

export type ContractExecutableType =
  | 'CONTRACT_EXECUTABLE_WASM'
  | 'CONTRACT_EXECUTABLE_STELLAR_ASSET'

export const CONTRACT_EXECUTABLE_TYPE_TO_INT: Record<ContractExecutableType, number> = /*#__PURE__*/ {
  CONTRACT_EXECUTABLE_WASM: 0,
  CONTRACT_EXECUTABLE_STELLAR_ASSET: 1,
}

export const CONTRACT_EXECUTABLE_TYPE_FROM_INT: Record<number, ContractExecutableType> = /*#__PURE__*/ {
  0: 'CONTRACT_EXECUTABLE_WASM',
  1: 'CONTRACT_EXECUTABLE_STELLAR_ASSET',
}

export function readContractExecutableType(r: XdrReader): ContractExecutableType {
  const v = readInt32(r)
  const result = CONTRACT_EXECUTABLE_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ContractExecutableType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeContractExecutableType(w: XdrWriter, v: ContractExecutableType): void {
  writeInt32(w, CONTRACT_EXECUTABLE_TYPE_TO_INT[v])
}

export function encodeContractExecutableType(v: ContractExecutableType): Uint8Array {
  return encode(v, writeContractExecutableType)
}

export function decodeContractExecutableType(input: Uint8Array | string): ContractExecutableType {
  return decode(input, readContractExecutableType)
}

const _CONTRACT_EXECUTABLE_TYPE_TO_JSON: Record<ContractExecutableType, string> = /*#__PURE__*/ {
  CONTRACT_EXECUTABLE_WASM: 'wasm',
  CONTRACT_EXECUTABLE_STELLAR_ASSET: 'stellar_asset',
}

const _CONTRACT_EXECUTABLE_TYPE_FROM_JSON: Record<string, ContractExecutableType> = /*#__PURE__*/ {
  'wasm': 'CONTRACT_EXECUTABLE_WASM',
  'stellar_asset': 'CONTRACT_EXECUTABLE_STELLAR_ASSET',
}

export function toJsonContractExecutableType(v: ContractExecutableType): string {
  return _CONTRACT_EXECUTABLE_TYPE_TO_JSON[v]
}

export function fromJsonContractExecutableType(json: unknown): ContractExecutableType {
  const result = _CONTRACT_EXECUTABLE_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ContractExecutableType JSON value: ${json}`)
  return result
}

export type ContractExecutable =
  | { readonly type: 'CONTRACT_EXECUTABLE_WASM'; readonly wasm_hash: Hash }
  | { readonly type: 'CONTRACT_EXECUTABLE_STELLAR_ASSET' }

export function readContractExecutable(r: XdrReader): ContractExecutable {
  beginComposite(r)
  try {
    const type = readContractExecutableType(r)
    let result: ContractExecutable
    switch (type) {
      case 'CONTRACT_EXECUTABLE_WASM':
        result = { type, wasm_hash: readHash(r) }; break
      case 'CONTRACT_EXECUTABLE_STELLAR_ASSET':
        result = { type }; break
      default:
        throw new XdrReadError(`Unknown ContractExecutable discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeContractExecutable(w: XdrWriter, v: ContractExecutable): void {
  writeContractExecutableType(w, v.type)
  switch (v.type) {
    case 'CONTRACT_EXECUTABLE_WASM':
      writeHash(w, (v as any).wasm_hash); break
    case 'CONTRACT_EXECUTABLE_STELLAR_ASSET':
      break
  }
}

export function encodeContractExecutable(v: ContractExecutable): Uint8Array {
  return encode(v, writeContractExecutable)
}

export function decodeContractExecutable(input: Uint8Array | string): ContractExecutable {
  return decode(input, readContractExecutable)
}

export function toJsonContractExecutable(v: ContractExecutable): unknown {
  switch (v.type) {
    case 'CONTRACT_EXECUTABLE_WASM':
      return { 'wasm': toJsonHash((v as any).wasm_hash) }
    case 'CONTRACT_EXECUTABLE_STELLAR_ASSET':
      return 'stellar_asset'
  }
}

export function fromJsonContractExecutable(json: unknown): ContractExecutable {
  if (typeof json === 'string') {
    if (json === 'stellar_asset') return { type: 'CONTRACT_EXECUTABLE_STELLAR_ASSET' } as ContractExecutable
    throw new Error(`Unknown ContractExecutable variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'wasm':
      return { type: 'CONTRACT_EXECUTABLE_WASM', wasm_hash: fromJsonHash(obj[key]) } as ContractExecutable
    default: throw new Error(`Unknown ContractExecutable variant: ${key}`)
  }
}

export type SCAddressType =
  | 'SC_ADDRESS_TYPE_ACCOUNT'
  | 'SC_ADDRESS_TYPE_CONTRACT'
  | 'SC_ADDRESS_TYPE_MUXED_ACCOUNT'
  | 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE'
  | 'SC_ADDRESS_TYPE_LIQUIDITY_POOL'

export const S_C_ADDRESS_TYPE_TO_INT: Record<SCAddressType, number> = /*#__PURE__*/ {
  SC_ADDRESS_TYPE_ACCOUNT: 0,
  SC_ADDRESS_TYPE_CONTRACT: 1,
  SC_ADDRESS_TYPE_MUXED_ACCOUNT: 2,
  SC_ADDRESS_TYPE_CLAIMABLE_BALANCE: 3,
  SC_ADDRESS_TYPE_LIQUIDITY_POOL: 4,
}

export const S_C_ADDRESS_TYPE_FROM_INT: Record<number, SCAddressType> = /*#__PURE__*/ {
  0: 'SC_ADDRESS_TYPE_ACCOUNT',
  1: 'SC_ADDRESS_TYPE_CONTRACT',
  2: 'SC_ADDRESS_TYPE_MUXED_ACCOUNT',
  3: 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE',
  4: 'SC_ADDRESS_TYPE_LIQUIDITY_POOL',
}

export function readSCAddressType(r: XdrReader): SCAddressType {
  const v = readInt32(r)
  const result = S_C_ADDRESS_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCAddressType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCAddressType(w: XdrWriter, v: SCAddressType): void {
  writeInt32(w, S_C_ADDRESS_TYPE_TO_INT[v])
}

export function encodeSCAddressType(v: SCAddressType): Uint8Array {
  return encode(v, writeSCAddressType)
}

export function decodeSCAddressType(input: Uint8Array | string): SCAddressType {
  return decode(input, readSCAddressType)
}

const _S_C_ADDRESS_TYPE_TO_JSON: Record<SCAddressType, string> = /*#__PURE__*/ {
  SC_ADDRESS_TYPE_ACCOUNT: 'account',
  SC_ADDRESS_TYPE_CONTRACT: 'contract',
  SC_ADDRESS_TYPE_MUXED_ACCOUNT: 'muxed_account',
  SC_ADDRESS_TYPE_CLAIMABLE_BALANCE: 'claimable_balance',
  SC_ADDRESS_TYPE_LIQUIDITY_POOL: 'liquidity_pool',
}

const _S_C_ADDRESS_TYPE_FROM_JSON: Record<string, SCAddressType> = /*#__PURE__*/ {
  'account': 'SC_ADDRESS_TYPE_ACCOUNT',
  'contract': 'SC_ADDRESS_TYPE_CONTRACT',
  'muxed_account': 'SC_ADDRESS_TYPE_MUXED_ACCOUNT',
  'claimable_balance': 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE',
  'liquidity_pool': 'SC_ADDRESS_TYPE_LIQUIDITY_POOL',
}

export function toJsonSCAddressType(v: SCAddressType): string {
  return _S_C_ADDRESS_TYPE_TO_JSON[v]
}

export function fromJsonSCAddressType(json: unknown): SCAddressType {
  const result = _S_C_ADDRESS_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCAddressType JSON value: ${json}`)
  return result
}

export interface MuxedEd25519Account {
  readonly id: uint64
  readonly ed25519: uint256
}

export function readMuxedEd25519Account(r: XdrReader): MuxedEd25519Account {
  beginComposite(r)
  try {
    const id = readuint64(r)
    const ed25519 = readuint256(r)
    return { id, ed25519 }
  } finally {
    endComposite(r)
  }
}

export function writeMuxedEd25519Account(w: XdrWriter, v: MuxedEd25519Account): void {
  writeuint64(w, v.id)
  writeuint256(w, v.ed25519)
}

export function encodeMuxedEd25519Account(v: MuxedEd25519Account): Uint8Array {
  return encode(v, writeMuxedEd25519Account)
}

export function decodeMuxedEd25519Account(input: Uint8Array | string): MuxedEd25519Account {
  return decode(input, readMuxedEd25519Account)
}

export function toJsonMuxedEd25519Account(v: MuxedEd25519Account): string {
  return encodeMuxedAccountStrKey(v.ed25519, v.id)
}

export function fromJsonMuxedEd25519Account(json: unknown): MuxedEd25519Account {
  const { ed25519, memoId } = decodeMuxedAccountStrKey(json as string)
  return { id: memoId, ed25519 }
}

export type SCAddress =
  | { readonly type: 'SC_ADDRESS_TYPE_ACCOUNT'; readonly accountId: AccountID }
  | { readonly type: 'SC_ADDRESS_TYPE_CONTRACT'; readonly contractId: ContractID }
  | { readonly type: 'SC_ADDRESS_TYPE_MUXED_ACCOUNT'; readonly muxedAccount: MuxedEd25519Account }
  | { readonly type: 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE'; readonly claimableBalanceId: ClaimableBalanceID }
  | { readonly type: 'SC_ADDRESS_TYPE_LIQUIDITY_POOL'; readonly liquidityPoolId: PoolID }

export function readSCAddress(r: XdrReader): SCAddress {
  beginComposite(r)
  try {
    const type = readSCAddressType(r)
    let result: SCAddress
    switch (type) {
      case 'SC_ADDRESS_TYPE_ACCOUNT':
        result = { type, accountId: readAccountID(r) }; break
      case 'SC_ADDRESS_TYPE_CONTRACT':
        result = { type, contractId: readContractID(r) }; break
      case 'SC_ADDRESS_TYPE_MUXED_ACCOUNT':
        result = { type, muxedAccount: readMuxedEd25519Account(r) }; break
      case 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE':
        result = { type, claimableBalanceId: readClaimableBalanceID(r) }; break
      case 'SC_ADDRESS_TYPE_LIQUIDITY_POOL':
        result = { type, liquidityPoolId: readPoolID(r) }; break
      default:
        throw new XdrReadError(`Unknown SCAddress discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSCAddress(w: XdrWriter, v: SCAddress): void {
  writeSCAddressType(w, v.type)
  switch (v.type) {
    case 'SC_ADDRESS_TYPE_ACCOUNT':
      writeAccountID(w, (v as any).accountId); break
    case 'SC_ADDRESS_TYPE_CONTRACT':
      writeContractID(w, (v as any).contractId); break
    case 'SC_ADDRESS_TYPE_MUXED_ACCOUNT':
      writeMuxedEd25519Account(w, (v as any).muxedAccount); break
    case 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE':
      writeClaimableBalanceID(w, (v as any).claimableBalanceId); break
    case 'SC_ADDRESS_TYPE_LIQUIDITY_POOL':
      writePoolID(w, (v as any).liquidityPoolId); break
  }
}

export function encodeSCAddress(v: SCAddress): Uint8Array {
  return encode(v, writeSCAddress)
}

export function decodeSCAddress(input: Uint8Array | string): SCAddress {
  return decode(input, readSCAddress)
}

export function toJsonSCAddress(v: SCAddress): string {
  switch (v.type) {
    case 'SC_ADDRESS_TYPE_ACCOUNT':
      return toJsonAccountID((v as any).accountId) as string
    case 'SC_ADDRESS_TYPE_CONTRACT':
      return toJsonContractID((v as any).contractId) as string
    case 'SC_ADDRESS_TYPE_MUXED_ACCOUNT':
      return toJsonMuxedEd25519Account((v as any).muxedAccount)
    case 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE':
      return toJsonClaimableBalanceID((v as any).claimableBalanceId)
    case 'SC_ADDRESS_TYPE_LIQUIDITY_POOL':
      return toJsonPoolID((v as any).liquidityPoolId)
  }
}

export function fromJsonSCAddress(json: unknown): SCAddress {
  const s = json as string
  if (s.startsWith('G')) {
    return { type: 'SC_ADDRESS_TYPE_ACCOUNT', accountId: fromJsonAccountID(s) }
  }
  if (s.startsWith('C')) {
    return { type: 'SC_ADDRESS_TYPE_CONTRACT', contractId: fromJsonContractID(s) }
  }
  if (s.startsWith('M')) {
    return { type: 'SC_ADDRESS_TYPE_MUXED_ACCOUNT', muxedAccount: fromJsonMuxedEd25519Account(s) }
  }
  if (s.startsWith('B')) {
    return { type: 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE', claimableBalanceId: fromJsonClaimableBalanceID(s) }
  }
  if (s.startsWith('L')) {
    return { type: 'SC_ADDRESS_TYPE_LIQUIDITY_POOL', liquidityPoolId: fromJsonPoolID(s) }
  }
  throw new Error(`Invalid SCAddress JSON: ${s}`)
}

export const SCSYMBOL_LIMIT = 32


export type SCVec = SCVal[]

export function readSCVec(r: XdrReader): SCVec {
  return readVarArray(r, UINT32_MAX, readSCVal)
}

export function writeSCVec(w: XdrWriter, v: SCVec): void {
  writeVarArray(w, v, UINT32_MAX, writeSCVal)
}

export function encodeSCVec(v: SCVec): Uint8Array {
  return encode(v, writeSCVec)
}

export function decodeSCVec(input: Uint8Array | string): SCVec {
  return decode(input, readSCVec)
}

export function toJsonSCVec(v: SCVec): unknown {
  return v.map((item: any) => toJsonSCVal(item))
}

export function fromJsonSCVec(json: unknown): SCVec {
  return ((json) as unknown[]).map((item: unknown) => fromJsonSCVal(item))
}

export type SCMap = SCMapEntry[]

export function readSCMap(r: XdrReader): SCMap {
  return readVarArray(r, UINT32_MAX, readSCMapEntry)
}

export function writeSCMap(w: XdrWriter, v: SCMap): void {
  writeVarArray(w, v, UINT32_MAX, writeSCMapEntry)
}

export function encodeSCMap(v: SCMap): Uint8Array {
  return encode(v, writeSCMap)
}

export function decodeSCMap(input: Uint8Array | string): SCMap {
  return decode(input, readSCMap)
}

export function toJsonSCMap(v: SCMap): unknown {
  return v.map((item: any) => toJsonSCMapEntry(item))
}

export function fromJsonSCMap(json: unknown): SCMap {
  return ((json) as unknown[]).map((item: unknown) => fromJsonSCMapEntry(item))
}

export type SCBytes = Uint8Array

export function readSCBytes(r: XdrReader): SCBytes {
  return readVarOpaque(r, UINT32_MAX)
}

export function writeSCBytes(w: XdrWriter, v: SCBytes): void {
  writeVarOpaque(w, v, UINT32_MAX)
}

export function encodeSCBytes(v: SCBytes): Uint8Array {
  return encode(v, writeSCBytes)
}

export function decodeSCBytes(input: Uint8Array | string): SCBytes {
  return decode(input, readSCBytes)
}

export function toJsonSCBytes(v: SCBytes): unknown {
  return bytesToHex(v)
}

export function fromJsonSCBytes(json: unknown): SCBytes {
  return hexToBytes((json) as string)
}

export type SCString = string

export function readSCString(r: XdrReader): SCString {
  return readString(r, UINT32_MAX)
}

export function writeSCString(w: XdrWriter, v: SCString): void {
  writeString(w, v, UINT32_MAX)
}

export function encodeSCString(v: SCString): Uint8Array {
  return encode(v, writeSCString)
}

export function decodeSCString(input: Uint8Array | string): SCString {
  return decode(input, readSCString)
}

export function toJsonSCString(v: SCString): unknown {
  return escapeXdrString(v)
}

export function fromJsonSCString(json: unknown): SCString {
  return unescapeXdrString((json) as string)
}

export type SCSymbol = string

export function readSCSymbol(r: XdrReader): SCSymbol {
  return readString(r, SCSYMBOL_LIMIT)
}

export function writeSCSymbol(w: XdrWriter, v: SCSymbol): void {
  writeString(w, v, SCSYMBOL_LIMIT)
}

export function encodeSCSymbol(v: SCSymbol): Uint8Array {
  return encode(v, writeSCSymbol)
}

export function decodeSCSymbol(input: Uint8Array | string): SCSymbol {
  return decode(input, readSCSymbol)
}

export function toJsonSCSymbol(v: SCSymbol): unknown {
  return escapeXdrString(v)
}

export function fromJsonSCSymbol(json: unknown): SCSymbol {
  return unescapeXdrString((json) as string)
}

export interface SCNonceKey {
  readonly nonce: int64
}

export function readSCNonceKey(r: XdrReader): SCNonceKey {
  beginComposite(r)
  try {
    const nonce = readint64(r)
    return { nonce }
  } finally {
    endComposite(r)
  }
}

export function writeSCNonceKey(w: XdrWriter, v: SCNonceKey): void {
  writeint64(w, v.nonce)
}

export function encodeSCNonceKey(v: SCNonceKey): Uint8Array {
  return encode(v, writeSCNonceKey)
}

export function decodeSCNonceKey(input: Uint8Array | string): SCNonceKey {
  return decode(input, readSCNonceKey)
}

export function toJsonSCNonceKey(v: SCNonceKey): Record<string, unknown> {
  return {
    'nonce': toJsonint64(v.nonce),
  }
}

export function fromJsonSCNonceKey(json: unknown): SCNonceKey {
  const o = json as Record<string, unknown>
  return {
    nonce: fromJsonint64(o['nonce']),
  }
}

export interface SCContractInstance {
  readonly executable: ContractExecutable
  readonly storage: SCMap | undefined
}

export function readSCContractInstance(r: XdrReader): SCContractInstance {
  beginComposite(r)
  try {
    const executable = readContractExecutable(r)
    const storage = readOptional(r, readSCMap)
    return { executable, storage }
  } finally {
    endComposite(r)
  }
}

export function writeSCContractInstance(w: XdrWriter, v: SCContractInstance): void {
  writeContractExecutable(w, v.executable)
  writeOptional(w, v.storage, writeSCMap)
}

export function encodeSCContractInstance(v: SCContractInstance): Uint8Array {
  return encode(v, writeSCContractInstance)
}

export function decodeSCContractInstance(input: Uint8Array | string): SCContractInstance {
  return decode(input, readSCContractInstance)
}

export function toJsonSCContractInstance(v: SCContractInstance): Record<string, unknown> {
  return {
    'executable': toJsonContractExecutable(v.executable),
    'storage': v.storage !== undefined ? toJsonSCMap(v.storage) : null,
  }
}

export function fromJsonSCContractInstance(json: unknown): SCContractInstance {
  const o = json as Record<string, unknown>
  return {
    executable: fromJsonContractExecutable(o['executable']),
    storage: (o['storage']) != null ? fromJsonSCMap(o['storage']) : undefined,
  }
}

export type SCVal =
  | { readonly type: 'SCV_BOOL'; readonly b: boolean }
  | { readonly type: 'SCV_VOID' }
  | { readonly type: 'SCV_ERROR'; readonly error: SCError }
  | { readonly type: 'SCV_U32'; readonly u32: uint32 }
  | { readonly type: 'SCV_I32'; readonly i32: int32 }
  | { readonly type: 'SCV_U64'; readonly u64: uint64 }
  | { readonly type: 'SCV_I64'; readonly i64: int64 }
  | { readonly type: 'SCV_TIMEPOINT'; readonly timepoint: TimePoint }
  | { readonly type: 'SCV_DURATION'; readonly duration: Duration }
  | { readonly type: 'SCV_U128'; readonly u128: UInt128Parts }
  | { readonly type: 'SCV_I128'; readonly i128: Int128Parts }
  | { readonly type: 'SCV_U256'; readonly u256: UInt256Parts }
  | { readonly type: 'SCV_I256'; readonly i256: Int256Parts }
  | { readonly type: 'SCV_BYTES'; readonly bytes: SCBytes }
  | { readonly type: 'SCV_STRING'; readonly str: SCString }
  | { readonly type: 'SCV_SYMBOL'; readonly sym: SCSymbol }
  | { readonly type: 'SCV_VEC'; readonly vec: SCVec | undefined }
  | { readonly type: 'SCV_MAP'; readonly map: SCMap | undefined }
  | { readonly type: 'SCV_ADDRESS'; readonly address: SCAddress }
  | { readonly type: 'SCV_CONTRACT_INSTANCE'; readonly instance: SCContractInstance }
  | { readonly type: 'SCV_LEDGER_KEY_CONTRACT_INSTANCE' }
  | { readonly type: 'SCV_LEDGER_KEY_NONCE'; readonly nonce_key: SCNonceKey }

export function readSCVal(r: XdrReader): SCVal {
  beginComposite(r)
  try {
    const type = readSCValType(r)
    let result: SCVal
    switch (type) {
      case 'SCV_BOOL':
        result = { type, b: readBool(r) }; break
      case 'SCV_VOID':
        result = { type }; break
      case 'SCV_ERROR':
        result = { type, error: readSCError(r) }; break
      case 'SCV_U32':
        result = { type, u32: readuint32(r) }; break
      case 'SCV_I32':
        result = { type, i32: readint32(r) }; break
      case 'SCV_U64':
        result = { type, u64: readuint64(r) }; break
      case 'SCV_I64':
        result = { type, i64: readint64(r) }; break
      case 'SCV_TIMEPOINT':
        result = { type, timepoint: readTimePoint(r) }; break
      case 'SCV_DURATION':
        result = { type, duration: readDuration(r) }; break
      case 'SCV_U128':
        result = { type, u128: readUInt128Parts(r) }; break
      case 'SCV_I128':
        result = { type, i128: readInt128Parts(r) }; break
      case 'SCV_U256':
        result = { type, u256: readUInt256Parts(r) }; break
      case 'SCV_I256':
        result = { type, i256: readInt256Parts(r) }; break
      case 'SCV_BYTES':
        result = { type, bytes: readSCBytes(r) }; break
      case 'SCV_STRING':
        result = { type, str: readSCString(r) }; break
      case 'SCV_SYMBOL':
        result = { type, sym: readSCSymbol(r) }; break
      case 'SCV_VEC':
        result = { type, vec: readOptional(r, readSCVec) }; break
      case 'SCV_MAP':
        result = { type, map: readOptional(r, readSCMap) }; break
      case 'SCV_ADDRESS':
        result = { type, address: readSCAddress(r) }; break
      case 'SCV_CONTRACT_INSTANCE':
        result = { type, instance: readSCContractInstance(r) }; break
      case 'SCV_LEDGER_KEY_CONTRACT_INSTANCE':
        result = { type }; break
      case 'SCV_LEDGER_KEY_NONCE':
        result = { type, nonce_key: readSCNonceKey(r) }; break
      default:
        throw new XdrReadError(`Unknown SCVal discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSCVal(w: XdrWriter, v: SCVal): void {
  writeSCValType(w, v.type)
  switch (v.type) {
    case 'SCV_BOOL':
      writeBool(w, (v as any).b); break
    case 'SCV_VOID':
      break
    case 'SCV_ERROR':
      writeSCError(w, (v as any).error); break
    case 'SCV_U32':
      writeuint32(w, (v as any).u32); break
    case 'SCV_I32':
      writeint32(w, (v as any).i32); break
    case 'SCV_U64':
      writeuint64(w, (v as any).u64); break
    case 'SCV_I64':
      writeint64(w, (v as any).i64); break
    case 'SCV_TIMEPOINT':
      writeTimePoint(w, (v as any).timepoint); break
    case 'SCV_DURATION':
      writeDuration(w, (v as any).duration); break
    case 'SCV_U128':
      writeUInt128Parts(w, (v as any).u128); break
    case 'SCV_I128':
      writeInt128Parts(w, (v as any).i128); break
    case 'SCV_U256':
      writeUInt256Parts(w, (v as any).u256); break
    case 'SCV_I256':
      writeInt256Parts(w, (v as any).i256); break
    case 'SCV_BYTES':
      writeSCBytes(w, (v as any).bytes); break
    case 'SCV_STRING':
      writeSCString(w, (v as any).str); break
    case 'SCV_SYMBOL':
      writeSCSymbol(w, (v as any).sym); break
    case 'SCV_VEC':
      writeOptional(w, (v as any).vec, writeSCVec); break
    case 'SCV_MAP':
      writeOptional(w, (v as any).map, writeSCMap); break
    case 'SCV_ADDRESS':
      writeSCAddress(w, (v as any).address); break
    case 'SCV_CONTRACT_INSTANCE':
      writeSCContractInstance(w, (v as any).instance); break
    case 'SCV_LEDGER_KEY_CONTRACT_INSTANCE':
      break
    case 'SCV_LEDGER_KEY_NONCE':
      writeSCNonceKey(w, (v as any).nonce_key); break
  }
}

export function encodeSCVal(v: SCVal): Uint8Array {
  return encode(v, writeSCVal)
}

export function decodeSCVal(input: Uint8Array | string): SCVal {
  return decode(input, readSCVal)
}

export function toJsonSCVal(v: SCVal): unknown {
  switch (v.type) {
    case 'SCV_BOOL':
      return { 'bool': (v as any).b }
    case 'SCV_VOID':
      return 'void'
    case 'SCV_ERROR':
      return { 'error': toJsonSCError((v as any).error) }
    case 'SCV_U32':
      return { 'u32': toJsonuint32((v as any).u32) }
    case 'SCV_I32':
      return { 'i32': toJsonint32((v as any).i32) }
    case 'SCV_U64':
      return { 'u64': toJsonuint64((v as any).u64) }
    case 'SCV_I64':
      return { 'i64': toJsonint64((v as any).i64) }
    case 'SCV_TIMEPOINT':
      return { 'timepoint': toJsonTimePoint((v as any).timepoint) }
    case 'SCV_DURATION':
      return { 'duration': toJsonDuration((v as any).duration) }
    case 'SCV_U128':
      return { 'u128': toJsonUInt128Parts((v as any).u128) }
    case 'SCV_I128':
      return { 'i128': toJsonInt128Parts((v as any).i128) }
    case 'SCV_U256':
      return { 'u256': toJsonUInt256Parts((v as any).u256) }
    case 'SCV_I256':
      return { 'i256': toJsonInt256Parts((v as any).i256) }
    case 'SCV_BYTES':
      return { 'bytes': toJsonSCBytes((v as any).bytes) }
    case 'SCV_STRING':
      return { 'string': toJsonSCString((v as any).str) }
    case 'SCV_SYMBOL':
      return { 'symbol': toJsonSCSymbol((v as any).sym) }
    case 'SCV_VEC':
      return { 'vec': (v as any).vec !== undefined ? toJsonSCVec((v as any).vec) : null }
    case 'SCV_MAP':
      return { 'map': (v as any).map !== undefined ? toJsonSCMap((v as any).map) : null }
    case 'SCV_ADDRESS':
      return { 'address': toJsonSCAddress((v as any).address) }
    case 'SCV_CONTRACT_INSTANCE':
      return { 'contract_instance': toJsonSCContractInstance((v as any).instance) }
    case 'SCV_LEDGER_KEY_CONTRACT_INSTANCE':
      return 'ledger_key_contract_instance'
    case 'SCV_LEDGER_KEY_NONCE':
      return { 'ledger_key_nonce': toJsonSCNonceKey((v as any).nonce_key) }
  }
}

export function fromJsonSCVal(json: unknown): SCVal {
  if (typeof json === 'string') {
    if (json === 'void') return { type: 'SCV_VOID' } as SCVal
    if (json === 'ledger_key_contract_instance') return { type: 'SCV_LEDGER_KEY_CONTRACT_INSTANCE' } as SCVal
    throw new Error(`Unknown SCVal variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'bool':
      return { type: 'SCV_BOOL', b: (obj[key]) as boolean } as SCVal
    case 'error':
      return { type: 'SCV_ERROR', error: fromJsonSCError(obj[key]) } as SCVal
    case 'u32':
      return { type: 'SCV_U32', u32: fromJsonuint32(obj[key]) } as SCVal
    case 'i32':
      return { type: 'SCV_I32', i32: fromJsonint32(obj[key]) } as SCVal
    case 'u64':
      return { type: 'SCV_U64', u64: fromJsonuint64(obj[key]) } as SCVal
    case 'i64':
      return { type: 'SCV_I64', i64: fromJsonint64(obj[key]) } as SCVal
    case 'timepoint':
      return { type: 'SCV_TIMEPOINT', timepoint: fromJsonTimePoint(obj[key]) } as SCVal
    case 'duration':
      return { type: 'SCV_DURATION', duration: fromJsonDuration(obj[key]) } as SCVal
    case 'u128':
      return { type: 'SCV_U128', u128: fromJsonUInt128Parts(obj[key]) } as SCVal
    case 'i128':
      return { type: 'SCV_I128', i128: fromJsonInt128Parts(obj[key]) } as SCVal
    case 'u256':
      return { type: 'SCV_U256', u256: fromJsonUInt256Parts(obj[key]) } as SCVal
    case 'i256':
      return { type: 'SCV_I256', i256: fromJsonInt256Parts(obj[key]) } as SCVal
    case 'bytes':
      return { type: 'SCV_BYTES', bytes: fromJsonSCBytes(obj[key]) } as SCVal
    case 'string':
      return { type: 'SCV_STRING', str: fromJsonSCString(obj[key]) } as SCVal
    case 'symbol':
      return { type: 'SCV_SYMBOL', sym: fromJsonSCSymbol(obj[key]) } as SCVal
    case 'vec':
      return { type: 'SCV_VEC', vec: (obj[key]) != null ? fromJsonSCVec(obj[key]) : undefined } as SCVal
    case 'map':
      return { type: 'SCV_MAP', map: (obj[key]) != null ? fromJsonSCMap(obj[key]) : undefined } as SCVal
    case 'address':
      return { type: 'SCV_ADDRESS', address: fromJsonSCAddress(obj[key]) } as SCVal
    case 'contract_instance':
      return { type: 'SCV_CONTRACT_INSTANCE', instance: fromJsonSCContractInstance(obj[key]) } as SCVal
    case 'ledger_key_nonce':
      return { type: 'SCV_LEDGER_KEY_NONCE', nonce_key: fromJsonSCNonceKey(obj[key]) } as SCVal
    default: throw new Error(`Unknown SCVal variant: ${key}`)
  }
}

export interface SCMapEntry {
  readonly key: SCVal
  readonly val: SCVal
}

export function readSCMapEntry(r: XdrReader): SCMapEntry {
  beginComposite(r)
  try {
    const key = readSCVal(r)
    const val = readSCVal(r)
    return { key, val }
  } finally {
    endComposite(r)
  }
}

export function writeSCMapEntry(w: XdrWriter, v: SCMapEntry): void {
  writeSCVal(w, v.key)
  writeSCVal(w, v.val)
}

export function encodeSCMapEntry(v: SCMapEntry): Uint8Array {
  return encode(v, writeSCMapEntry)
}

export function decodeSCMapEntry(input: Uint8Array | string): SCMapEntry {
  return decode(input, readSCMapEntry)
}

export function toJsonSCMapEntry(v: SCMapEntry): Record<string, unknown> {
  return {
    'key': toJsonSCVal(v.key),
    'val': toJsonSCVal(v.val),
  }
}

export function fromJsonSCMapEntry(json: unknown): SCMapEntry {
  const o = json as Record<string, unknown>
  return {
    key: fromJsonSCVal(o['key']),
    val: fromJsonSCVal(o['val']),
  }
}
