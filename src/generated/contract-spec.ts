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

import type { SCSymbol } from './contract.js'
import { readSCSymbol, writeSCSymbol, toJsonSCSymbol, fromJsonSCSymbol } from './contract.js'
import type { uint32 } from './types.js'
import { readuint32, writeuint32, toJsonuint32, fromJsonuint32 } from './types.js'


export const SC_SPEC_DOC_LIMIT = 1024


export type SCSpecType =
  | 'SC_SPEC_TYPE_VAL'
  | 'SC_SPEC_TYPE_BOOL'
  | 'SC_SPEC_TYPE_VOID'
  | 'SC_SPEC_TYPE_ERROR'
  | 'SC_SPEC_TYPE_U32'
  | 'SC_SPEC_TYPE_I32'
  | 'SC_SPEC_TYPE_U64'
  | 'SC_SPEC_TYPE_I64'
  | 'SC_SPEC_TYPE_TIMEPOINT'
  | 'SC_SPEC_TYPE_DURATION'
  | 'SC_SPEC_TYPE_U128'
  | 'SC_SPEC_TYPE_I128'
  | 'SC_SPEC_TYPE_U256'
  | 'SC_SPEC_TYPE_I256'
  | 'SC_SPEC_TYPE_BYTES'
  | 'SC_SPEC_TYPE_STRING'
  | 'SC_SPEC_TYPE_SYMBOL'
  | 'SC_SPEC_TYPE_ADDRESS'
  | 'SC_SPEC_TYPE_MUXED_ADDRESS'
  | 'SC_SPEC_TYPE_OPTION'
  | 'SC_SPEC_TYPE_RESULT'
  | 'SC_SPEC_TYPE_VEC'
  | 'SC_SPEC_TYPE_MAP'
  | 'SC_SPEC_TYPE_TUPLE'
  | 'SC_SPEC_TYPE_BYTES_N'
  | 'SC_SPEC_TYPE_UDT'

export const S_C_SPEC_TYPE_TO_INT: Record<SCSpecType, number> = /*#__PURE__*/ {
  SC_SPEC_TYPE_VAL: 0,
  SC_SPEC_TYPE_BOOL: 1,
  SC_SPEC_TYPE_VOID: 2,
  SC_SPEC_TYPE_ERROR: 3,
  SC_SPEC_TYPE_U32: 4,
  SC_SPEC_TYPE_I32: 5,
  SC_SPEC_TYPE_U64: 6,
  SC_SPEC_TYPE_I64: 7,
  SC_SPEC_TYPE_TIMEPOINT: 8,
  SC_SPEC_TYPE_DURATION: 9,
  SC_SPEC_TYPE_U128: 10,
  SC_SPEC_TYPE_I128: 11,
  SC_SPEC_TYPE_U256: 12,
  SC_SPEC_TYPE_I256: 13,
  SC_SPEC_TYPE_BYTES: 14,
  SC_SPEC_TYPE_STRING: 16,
  SC_SPEC_TYPE_SYMBOL: 17,
  SC_SPEC_TYPE_ADDRESS: 19,
  SC_SPEC_TYPE_MUXED_ADDRESS: 20,
  SC_SPEC_TYPE_OPTION: 1000,
  SC_SPEC_TYPE_RESULT: 1001,
  SC_SPEC_TYPE_VEC: 1002,
  SC_SPEC_TYPE_MAP: 1004,
  SC_SPEC_TYPE_TUPLE: 1005,
  SC_SPEC_TYPE_BYTES_N: 1006,
  SC_SPEC_TYPE_UDT: 2000,
}

export const S_C_SPEC_TYPE_FROM_INT: Record<number, SCSpecType> = /*#__PURE__*/ {
  0: 'SC_SPEC_TYPE_VAL',
  1: 'SC_SPEC_TYPE_BOOL',
  2: 'SC_SPEC_TYPE_VOID',
  3: 'SC_SPEC_TYPE_ERROR',
  4: 'SC_SPEC_TYPE_U32',
  5: 'SC_SPEC_TYPE_I32',
  6: 'SC_SPEC_TYPE_U64',
  7: 'SC_SPEC_TYPE_I64',
  8: 'SC_SPEC_TYPE_TIMEPOINT',
  9: 'SC_SPEC_TYPE_DURATION',
  10: 'SC_SPEC_TYPE_U128',
  11: 'SC_SPEC_TYPE_I128',
  12: 'SC_SPEC_TYPE_U256',
  13: 'SC_SPEC_TYPE_I256',
  14: 'SC_SPEC_TYPE_BYTES',
  16: 'SC_SPEC_TYPE_STRING',
  17: 'SC_SPEC_TYPE_SYMBOL',
  19: 'SC_SPEC_TYPE_ADDRESS',
  20: 'SC_SPEC_TYPE_MUXED_ADDRESS',
  1000: 'SC_SPEC_TYPE_OPTION',
  1001: 'SC_SPEC_TYPE_RESULT',
  1002: 'SC_SPEC_TYPE_VEC',
  1004: 'SC_SPEC_TYPE_MAP',
  1005: 'SC_SPEC_TYPE_TUPLE',
  1006: 'SC_SPEC_TYPE_BYTES_N',
  2000: 'SC_SPEC_TYPE_UDT',
}

export function readSCSpecType(r: XdrReader): SCSpecType {
  const v = readInt32(r)
  const result = S_C_SPEC_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCSpecType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCSpecType(w: XdrWriter, v: SCSpecType): void {
  writeInt32(w, S_C_SPEC_TYPE_TO_INT[v])
}

export function encodeSCSpecType(v: SCSpecType): Uint8Array {
  return encode(v, writeSCSpecType)
}

export function decodeSCSpecType(input: Uint8Array | string): SCSpecType {
  return decode(input, readSCSpecType)
}

const _S_C_SPEC_TYPE_TO_JSON: Record<SCSpecType, string> = /*#__PURE__*/ {
  SC_SPEC_TYPE_VAL: 'val',
  SC_SPEC_TYPE_BOOL: 'bool',
  SC_SPEC_TYPE_VOID: 'void',
  SC_SPEC_TYPE_ERROR: 'error',
  SC_SPEC_TYPE_U32: 'u32',
  SC_SPEC_TYPE_I32: 'i32',
  SC_SPEC_TYPE_U64: 'u64',
  SC_SPEC_TYPE_I64: 'i64',
  SC_SPEC_TYPE_TIMEPOINT: 'timepoint',
  SC_SPEC_TYPE_DURATION: 'duration',
  SC_SPEC_TYPE_U128: 'u128',
  SC_SPEC_TYPE_I128: 'i128',
  SC_SPEC_TYPE_U256: 'u256',
  SC_SPEC_TYPE_I256: 'i256',
  SC_SPEC_TYPE_BYTES: 'bytes',
  SC_SPEC_TYPE_STRING: 'string',
  SC_SPEC_TYPE_SYMBOL: 'symbol',
  SC_SPEC_TYPE_ADDRESS: 'address',
  SC_SPEC_TYPE_MUXED_ADDRESS: 'muxed_address',
  SC_SPEC_TYPE_OPTION: 'option',
  SC_SPEC_TYPE_RESULT: 'result',
  SC_SPEC_TYPE_VEC: 'vec',
  SC_SPEC_TYPE_MAP: 'map',
  SC_SPEC_TYPE_TUPLE: 'tuple',
  SC_SPEC_TYPE_BYTES_N: 'bytes_n',
  SC_SPEC_TYPE_UDT: 'udt',
}

const _S_C_SPEC_TYPE_FROM_JSON: Record<string, SCSpecType> = /*#__PURE__*/ {
  'val': 'SC_SPEC_TYPE_VAL',
  'bool': 'SC_SPEC_TYPE_BOOL',
  'void': 'SC_SPEC_TYPE_VOID',
  'error': 'SC_SPEC_TYPE_ERROR',
  'u32': 'SC_SPEC_TYPE_U32',
  'i32': 'SC_SPEC_TYPE_I32',
  'u64': 'SC_SPEC_TYPE_U64',
  'i64': 'SC_SPEC_TYPE_I64',
  'timepoint': 'SC_SPEC_TYPE_TIMEPOINT',
  'duration': 'SC_SPEC_TYPE_DURATION',
  'u128': 'SC_SPEC_TYPE_U128',
  'i128': 'SC_SPEC_TYPE_I128',
  'u256': 'SC_SPEC_TYPE_U256',
  'i256': 'SC_SPEC_TYPE_I256',
  'bytes': 'SC_SPEC_TYPE_BYTES',
  'string': 'SC_SPEC_TYPE_STRING',
  'symbol': 'SC_SPEC_TYPE_SYMBOL',
  'address': 'SC_SPEC_TYPE_ADDRESS',
  'muxed_address': 'SC_SPEC_TYPE_MUXED_ADDRESS',
  'option': 'SC_SPEC_TYPE_OPTION',
  'result': 'SC_SPEC_TYPE_RESULT',
  'vec': 'SC_SPEC_TYPE_VEC',
  'map': 'SC_SPEC_TYPE_MAP',
  'tuple': 'SC_SPEC_TYPE_TUPLE',
  'bytes_n': 'SC_SPEC_TYPE_BYTES_N',
  'udt': 'SC_SPEC_TYPE_UDT',
}

export function toJsonSCSpecType(v: SCSpecType): string {
  return _S_C_SPEC_TYPE_TO_JSON[v]
}

export function fromJsonSCSpecType(json: unknown): SCSpecType {
  const result = _S_C_SPEC_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCSpecType JSON value: ${json}`)
  return result
}

export interface SCSpecTypeOption {
  readonly valueType: SCSpecTypeDef
}

export function readSCSpecTypeOption(r: XdrReader): SCSpecTypeOption {
  beginComposite(r)
  try {
    const valueType = readSCSpecTypeDef(r)
    return { valueType }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecTypeOption(w: XdrWriter, v: SCSpecTypeOption): void {
  writeSCSpecTypeDef(w, v.valueType)
}

export function encodeSCSpecTypeOption(v: SCSpecTypeOption): Uint8Array {
  return encode(v, writeSCSpecTypeOption)
}

export function decodeSCSpecTypeOption(input: Uint8Array | string): SCSpecTypeOption {
  return decode(input, readSCSpecTypeOption)
}

export function toJsonSCSpecTypeOption(v: SCSpecTypeOption): Record<string, unknown> {
  return {
    'value_type': toJsonSCSpecTypeDef(v.valueType),
  }
}

export function fromJsonSCSpecTypeOption(json: unknown): SCSpecTypeOption {
  const o = json as Record<string, unknown>
  return {
    valueType: fromJsonSCSpecTypeDef(o['value_type']),
  }
}

export interface SCSpecTypeResult {
  readonly okType: SCSpecTypeDef
  readonly errorType: SCSpecTypeDef
}

export function readSCSpecTypeResult(r: XdrReader): SCSpecTypeResult {
  beginComposite(r)
  try {
    const okType = readSCSpecTypeDef(r)
    const errorType = readSCSpecTypeDef(r)
    return { okType, errorType }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecTypeResult(w: XdrWriter, v: SCSpecTypeResult): void {
  writeSCSpecTypeDef(w, v.okType)
  writeSCSpecTypeDef(w, v.errorType)
}

export function encodeSCSpecTypeResult(v: SCSpecTypeResult): Uint8Array {
  return encode(v, writeSCSpecTypeResult)
}

export function decodeSCSpecTypeResult(input: Uint8Array | string): SCSpecTypeResult {
  return decode(input, readSCSpecTypeResult)
}

export function toJsonSCSpecTypeResult(v: SCSpecTypeResult): Record<string, unknown> {
  return {
    'ok_type': toJsonSCSpecTypeDef(v.okType),
    'error_type': toJsonSCSpecTypeDef(v.errorType),
  }
}

export function fromJsonSCSpecTypeResult(json: unknown): SCSpecTypeResult {
  const o = json as Record<string, unknown>
  return {
    okType: fromJsonSCSpecTypeDef(o['ok_type']),
    errorType: fromJsonSCSpecTypeDef(o['error_type']),
  }
}

export interface SCSpecTypeVec {
  readonly elementType: SCSpecTypeDef
}

export function readSCSpecTypeVec(r: XdrReader): SCSpecTypeVec {
  beginComposite(r)
  try {
    const elementType = readSCSpecTypeDef(r)
    return { elementType }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecTypeVec(w: XdrWriter, v: SCSpecTypeVec): void {
  writeSCSpecTypeDef(w, v.elementType)
}

export function encodeSCSpecTypeVec(v: SCSpecTypeVec): Uint8Array {
  return encode(v, writeSCSpecTypeVec)
}

export function decodeSCSpecTypeVec(input: Uint8Array | string): SCSpecTypeVec {
  return decode(input, readSCSpecTypeVec)
}

export function toJsonSCSpecTypeVec(v: SCSpecTypeVec): Record<string, unknown> {
  return {
    'element_type': toJsonSCSpecTypeDef(v.elementType),
  }
}

export function fromJsonSCSpecTypeVec(json: unknown): SCSpecTypeVec {
  const o = json as Record<string, unknown>
  return {
    elementType: fromJsonSCSpecTypeDef(o['element_type']),
  }
}

export interface SCSpecTypeMap {
  readonly keyType: SCSpecTypeDef
  readonly valueType: SCSpecTypeDef
}

export function readSCSpecTypeMap(r: XdrReader): SCSpecTypeMap {
  beginComposite(r)
  try {
    const keyType = readSCSpecTypeDef(r)
    const valueType = readSCSpecTypeDef(r)
    return { keyType, valueType }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecTypeMap(w: XdrWriter, v: SCSpecTypeMap): void {
  writeSCSpecTypeDef(w, v.keyType)
  writeSCSpecTypeDef(w, v.valueType)
}

export function encodeSCSpecTypeMap(v: SCSpecTypeMap): Uint8Array {
  return encode(v, writeSCSpecTypeMap)
}

export function decodeSCSpecTypeMap(input: Uint8Array | string): SCSpecTypeMap {
  return decode(input, readSCSpecTypeMap)
}

export function toJsonSCSpecTypeMap(v: SCSpecTypeMap): Record<string, unknown> {
  return {
    'key_type': toJsonSCSpecTypeDef(v.keyType),
    'value_type': toJsonSCSpecTypeDef(v.valueType),
  }
}

export function fromJsonSCSpecTypeMap(json: unknown): SCSpecTypeMap {
  const o = json as Record<string, unknown>
  return {
    keyType: fromJsonSCSpecTypeDef(o['key_type']),
    valueType: fromJsonSCSpecTypeDef(o['value_type']),
  }
}

export interface SCSpecTypeTuple {
  readonly valueTypes: SCSpecTypeDef[]
}

export function readSCSpecTypeTuple(r: XdrReader): SCSpecTypeTuple {
  beginComposite(r)
  try {
    const valueTypes = readVarArray(r, 12, readSCSpecTypeDef)
    return { valueTypes }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecTypeTuple(w: XdrWriter, v: SCSpecTypeTuple): void {
  writeVarArray(w, v.valueTypes, 12, writeSCSpecTypeDef)
}

export function encodeSCSpecTypeTuple(v: SCSpecTypeTuple): Uint8Array {
  return encode(v, writeSCSpecTypeTuple)
}

export function decodeSCSpecTypeTuple(input: Uint8Array | string): SCSpecTypeTuple {
  return decode(input, readSCSpecTypeTuple)
}

export function toJsonSCSpecTypeTuple(v: SCSpecTypeTuple): Record<string, unknown> {
  return {
    'value_types': v.valueTypes.map((item: any) => toJsonSCSpecTypeDef(item)),
  }
}

export function fromJsonSCSpecTypeTuple(json: unknown): SCSpecTypeTuple {
  const o = json as Record<string, unknown>
  return {
    valueTypes: ((o['value_types']) as unknown[]).map((item: unknown) => fromJsonSCSpecTypeDef(item)),
  }
}

export interface SCSpecTypeBytesN {
  readonly n: uint32
}

export function readSCSpecTypeBytesN(r: XdrReader): SCSpecTypeBytesN {
  beginComposite(r)
  try {
    const n = readuint32(r)
    return { n }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecTypeBytesN(w: XdrWriter, v: SCSpecTypeBytesN): void {
  writeuint32(w, v.n)
}

export function encodeSCSpecTypeBytesN(v: SCSpecTypeBytesN): Uint8Array {
  return encode(v, writeSCSpecTypeBytesN)
}

export function decodeSCSpecTypeBytesN(input: Uint8Array | string): SCSpecTypeBytesN {
  return decode(input, readSCSpecTypeBytesN)
}

export function toJsonSCSpecTypeBytesN(v: SCSpecTypeBytesN): Record<string, unknown> {
  return {
    'n': toJsonuint32(v.n),
  }
}

export function fromJsonSCSpecTypeBytesN(json: unknown): SCSpecTypeBytesN {
  const o = json as Record<string, unknown>
  return {
    n: fromJsonuint32(o['n']),
  }
}

export interface SCSpecTypeUDT {
  readonly name: string
}

export function readSCSpecTypeUDT(r: XdrReader): SCSpecTypeUDT {
  beginComposite(r)
  try {
    const name = readString(r, 60)
    return { name }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecTypeUDT(w: XdrWriter, v: SCSpecTypeUDT): void {
  writeString(w, v.name, 60)
}

export function encodeSCSpecTypeUDT(v: SCSpecTypeUDT): Uint8Array {
  return encode(v, writeSCSpecTypeUDT)
}

export function decodeSCSpecTypeUDT(input: Uint8Array | string): SCSpecTypeUDT {
  return decode(input, readSCSpecTypeUDT)
}

export function toJsonSCSpecTypeUDT(v: SCSpecTypeUDT): Record<string, unknown> {
  return {
    'name': escapeXdrString(v.name),
  }
}

export function fromJsonSCSpecTypeUDT(json: unknown): SCSpecTypeUDT {
  const o = json as Record<string, unknown>
  return {
    name: unescapeXdrString((o['name']) as string),
  }
}

export type SCSpecTypeDef =
  | { readonly type: 'SC_SPEC_TYPE_VAL' }
  | { readonly type: 'SC_SPEC_TYPE_BOOL' }
  | { readonly type: 'SC_SPEC_TYPE_VOID' }
  | { readonly type: 'SC_SPEC_TYPE_ERROR' }
  | { readonly type: 'SC_SPEC_TYPE_U32' }
  | { readonly type: 'SC_SPEC_TYPE_I32' }
  | { readonly type: 'SC_SPEC_TYPE_U64' }
  | { readonly type: 'SC_SPEC_TYPE_I64' }
  | { readonly type: 'SC_SPEC_TYPE_TIMEPOINT' }
  | { readonly type: 'SC_SPEC_TYPE_DURATION' }
  | { readonly type: 'SC_SPEC_TYPE_U128' }
  | { readonly type: 'SC_SPEC_TYPE_I128' }
  | { readonly type: 'SC_SPEC_TYPE_U256' }
  | { readonly type: 'SC_SPEC_TYPE_I256' }
  | { readonly type: 'SC_SPEC_TYPE_BYTES' }
  | { readonly type: 'SC_SPEC_TYPE_STRING' }
  | { readonly type: 'SC_SPEC_TYPE_SYMBOL' }
  | { readonly type: 'SC_SPEC_TYPE_ADDRESS' }
  | { readonly type: 'SC_SPEC_TYPE_MUXED_ADDRESS' }
  | { readonly type: 'SC_SPEC_TYPE_OPTION'; readonly option: SCSpecTypeOption }
  | { readonly type: 'SC_SPEC_TYPE_RESULT'; readonly result: SCSpecTypeResult }
  | { readonly type: 'SC_SPEC_TYPE_VEC'; readonly vec: SCSpecTypeVec }
  | { readonly type: 'SC_SPEC_TYPE_MAP'; readonly map: SCSpecTypeMap }
  | { readonly type: 'SC_SPEC_TYPE_TUPLE'; readonly tuple: SCSpecTypeTuple }
  | { readonly type: 'SC_SPEC_TYPE_BYTES_N'; readonly bytesN: SCSpecTypeBytesN }
  | { readonly type: 'SC_SPEC_TYPE_UDT'; readonly udt: SCSpecTypeUDT }

export function readSCSpecTypeDef(r: XdrReader): SCSpecTypeDef {
  beginComposite(r)
  try {
    const type = readSCSpecType(r)
    let result: SCSpecTypeDef
    switch (type) {
      case 'SC_SPEC_TYPE_VAL':
      case 'SC_SPEC_TYPE_BOOL':
      case 'SC_SPEC_TYPE_VOID':
      case 'SC_SPEC_TYPE_ERROR':
      case 'SC_SPEC_TYPE_U32':
      case 'SC_SPEC_TYPE_I32':
      case 'SC_SPEC_TYPE_U64':
      case 'SC_SPEC_TYPE_I64':
      case 'SC_SPEC_TYPE_TIMEPOINT':
      case 'SC_SPEC_TYPE_DURATION':
      case 'SC_SPEC_TYPE_U128':
      case 'SC_SPEC_TYPE_I128':
      case 'SC_SPEC_TYPE_U256':
      case 'SC_SPEC_TYPE_I256':
      case 'SC_SPEC_TYPE_BYTES':
      case 'SC_SPEC_TYPE_STRING':
      case 'SC_SPEC_TYPE_SYMBOL':
      case 'SC_SPEC_TYPE_ADDRESS':
      case 'SC_SPEC_TYPE_MUXED_ADDRESS':
        result = { type }; break
      case 'SC_SPEC_TYPE_OPTION':
        result = { type, option: readSCSpecTypeOption(r) }; break
      case 'SC_SPEC_TYPE_RESULT':
        result = { type, result: readSCSpecTypeResult(r) }; break
      case 'SC_SPEC_TYPE_VEC':
        result = { type, vec: readSCSpecTypeVec(r) }; break
      case 'SC_SPEC_TYPE_MAP':
        result = { type, map: readSCSpecTypeMap(r) }; break
      case 'SC_SPEC_TYPE_TUPLE':
        result = { type, tuple: readSCSpecTypeTuple(r) }; break
      case 'SC_SPEC_TYPE_BYTES_N':
        result = { type, bytesN: readSCSpecTypeBytesN(r) }; break
      case 'SC_SPEC_TYPE_UDT':
        result = { type, udt: readSCSpecTypeUDT(r) }; break
      default:
        throw new XdrReadError(`Unknown SCSpecTypeDef discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecTypeDef(w: XdrWriter, v: SCSpecTypeDef): void {
  writeSCSpecType(w, v.type)
  switch (v.type) {
    case 'SC_SPEC_TYPE_VAL':
    case 'SC_SPEC_TYPE_BOOL':
    case 'SC_SPEC_TYPE_VOID':
    case 'SC_SPEC_TYPE_ERROR':
    case 'SC_SPEC_TYPE_U32':
    case 'SC_SPEC_TYPE_I32':
    case 'SC_SPEC_TYPE_U64':
    case 'SC_SPEC_TYPE_I64':
    case 'SC_SPEC_TYPE_TIMEPOINT':
    case 'SC_SPEC_TYPE_DURATION':
    case 'SC_SPEC_TYPE_U128':
    case 'SC_SPEC_TYPE_I128':
    case 'SC_SPEC_TYPE_U256':
    case 'SC_SPEC_TYPE_I256':
    case 'SC_SPEC_TYPE_BYTES':
    case 'SC_SPEC_TYPE_STRING':
    case 'SC_SPEC_TYPE_SYMBOL':
    case 'SC_SPEC_TYPE_ADDRESS':
    case 'SC_SPEC_TYPE_MUXED_ADDRESS':
      break
    case 'SC_SPEC_TYPE_OPTION':
      writeSCSpecTypeOption(w, (v as any).option); break
    case 'SC_SPEC_TYPE_RESULT':
      writeSCSpecTypeResult(w, (v as any).result); break
    case 'SC_SPEC_TYPE_VEC':
      writeSCSpecTypeVec(w, (v as any).vec); break
    case 'SC_SPEC_TYPE_MAP':
      writeSCSpecTypeMap(w, (v as any).map); break
    case 'SC_SPEC_TYPE_TUPLE':
      writeSCSpecTypeTuple(w, (v as any).tuple); break
    case 'SC_SPEC_TYPE_BYTES_N':
      writeSCSpecTypeBytesN(w, (v as any).bytesN); break
    case 'SC_SPEC_TYPE_UDT':
      writeSCSpecTypeUDT(w, (v as any).udt); break
  }
}

export function encodeSCSpecTypeDef(v: SCSpecTypeDef): Uint8Array {
  return encode(v, writeSCSpecTypeDef)
}

export function decodeSCSpecTypeDef(input: Uint8Array | string): SCSpecTypeDef {
  return decode(input, readSCSpecTypeDef)
}

export function toJsonSCSpecTypeDef(v: SCSpecTypeDef): unknown {
  switch (v.type) {
    case 'SC_SPEC_TYPE_VAL':
      return 'val'
    case 'SC_SPEC_TYPE_BOOL':
      return 'bool'
    case 'SC_SPEC_TYPE_VOID':
      return 'void'
    case 'SC_SPEC_TYPE_ERROR':
      return 'error'
    case 'SC_SPEC_TYPE_U32':
      return 'u32'
    case 'SC_SPEC_TYPE_I32':
      return 'i32'
    case 'SC_SPEC_TYPE_U64':
      return 'u64'
    case 'SC_SPEC_TYPE_I64':
      return 'i64'
    case 'SC_SPEC_TYPE_TIMEPOINT':
      return 'timepoint'
    case 'SC_SPEC_TYPE_DURATION':
      return 'duration'
    case 'SC_SPEC_TYPE_U128':
      return 'u128'
    case 'SC_SPEC_TYPE_I128':
      return 'i128'
    case 'SC_SPEC_TYPE_U256':
      return 'u256'
    case 'SC_SPEC_TYPE_I256':
      return 'i256'
    case 'SC_SPEC_TYPE_BYTES':
      return 'bytes'
    case 'SC_SPEC_TYPE_STRING':
      return 'string'
    case 'SC_SPEC_TYPE_SYMBOL':
      return 'symbol'
    case 'SC_SPEC_TYPE_ADDRESS':
      return 'address'
    case 'SC_SPEC_TYPE_MUXED_ADDRESS':
      return 'muxed_address'
    case 'SC_SPEC_TYPE_OPTION':
      return { 'option': toJsonSCSpecTypeOption((v as any).option) }
    case 'SC_SPEC_TYPE_RESULT':
      return { 'result': toJsonSCSpecTypeResult((v as any).result) }
    case 'SC_SPEC_TYPE_VEC':
      return { 'vec': toJsonSCSpecTypeVec((v as any).vec) }
    case 'SC_SPEC_TYPE_MAP':
      return { 'map': toJsonSCSpecTypeMap((v as any).map) }
    case 'SC_SPEC_TYPE_TUPLE':
      return { 'tuple': toJsonSCSpecTypeTuple((v as any).tuple) }
    case 'SC_SPEC_TYPE_BYTES_N':
      return { 'bytes_n': toJsonSCSpecTypeBytesN((v as any).bytesN) }
    case 'SC_SPEC_TYPE_UDT':
      return { 'udt': toJsonSCSpecTypeUDT((v as any).udt) }
  }
}

export function fromJsonSCSpecTypeDef(json: unknown): SCSpecTypeDef {
  if (typeof json === 'string') {
    if (json === 'val') return { type: 'SC_SPEC_TYPE_VAL' } as SCSpecTypeDef
    if (json === 'bool') return { type: 'SC_SPEC_TYPE_BOOL' } as SCSpecTypeDef
    if (json === 'void') return { type: 'SC_SPEC_TYPE_VOID' } as SCSpecTypeDef
    if (json === 'error') return { type: 'SC_SPEC_TYPE_ERROR' } as SCSpecTypeDef
    if (json === 'u32') return { type: 'SC_SPEC_TYPE_U32' } as SCSpecTypeDef
    if (json === 'i32') return { type: 'SC_SPEC_TYPE_I32' } as SCSpecTypeDef
    if (json === 'u64') return { type: 'SC_SPEC_TYPE_U64' } as SCSpecTypeDef
    if (json === 'i64') return { type: 'SC_SPEC_TYPE_I64' } as SCSpecTypeDef
    if (json === 'timepoint') return { type: 'SC_SPEC_TYPE_TIMEPOINT' } as SCSpecTypeDef
    if (json === 'duration') return { type: 'SC_SPEC_TYPE_DURATION' } as SCSpecTypeDef
    if (json === 'u128') return { type: 'SC_SPEC_TYPE_U128' } as SCSpecTypeDef
    if (json === 'i128') return { type: 'SC_SPEC_TYPE_I128' } as SCSpecTypeDef
    if (json === 'u256') return { type: 'SC_SPEC_TYPE_U256' } as SCSpecTypeDef
    if (json === 'i256') return { type: 'SC_SPEC_TYPE_I256' } as SCSpecTypeDef
    if (json === 'bytes') return { type: 'SC_SPEC_TYPE_BYTES' } as SCSpecTypeDef
    if (json === 'string') return { type: 'SC_SPEC_TYPE_STRING' } as SCSpecTypeDef
    if (json === 'symbol') return { type: 'SC_SPEC_TYPE_SYMBOL' } as SCSpecTypeDef
    if (json === 'address') return { type: 'SC_SPEC_TYPE_ADDRESS' } as SCSpecTypeDef
    if (json === 'muxed_address') return { type: 'SC_SPEC_TYPE_MUXED_ADDRESS' } as SCSpecTypeDef
    throw new Error(`Unknown SCSpecTypeDef variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'option':
      return { type: 'SC_SPEC_TYPE_OPTION', option: fromJsonSCSpecTypeOption(obj[key]) } as SCSpecTypeDef
    case 'result':
      return { type: 'SC_SPEC_TYPE_RESULT', result: fromJsonSCSpecTypeResult(obj[key]) } as SCSpecTypeDef
    case 'vec':
      return { type: 'SC_SPEC_TYPE_VEC', vec: fromJsonSCSpecTypeVec(obj[key]) } as SCSpecTypeDef
    case 'map':
      return { type: 'SC_SPEC_TYPE_MAP', map: fromJsonSCSpecTypeMap(obj[key]) } as SCSpecTypeDef
    case 'tuple':
      return { type: 'SC_SPEC_TYPE_TUPLE', tuple: fromJsonSCSpecTypeTuple(obj[key]) } as SCSpecTypeDef
    case 'bytes_n':
      return { type: 'SC_SPEC_TYPE_BYTES_N', bytesN: fromJsonSCSpecTypeBytesN(obj[key]) } as SCSpecTypeDef
    case 'udt':
      return { type: 'SC_SPEC_TYPE_UDT', udt: fromJsonSCSpecTypeUDT(obj[key]) } as SCSpecTypeDef
    default: throw new Error(`Unknown SCSpecTypeDef variant: ${key}`)
  }
}

export interface SCSpecUDTStructFieldV0 {
  readonly doc: string
  readonly name: string
  readonly type: SCSpecTypeDef
}

export function readSCSpecUDTStructFieldV0(r: XdrReader): SCSpecUDTStructFieldV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const name = readString(r, 30)
    const type_ = readSCSpecTypeDef(r)
    return { doc, name, type: type_ }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecUDTStructFieldV0(w: XdrWriter, v: SCSpecUDTStructFieldV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.name, 30)
  writeSCSpecTypeDef(w, v.type)
}

export function encodeSCSpecUDTStructFieldV0(v: SCSpecUDTStructFieldV0): Uint8Array {
  return encode(v, writeSCSpecUDTStructFieldV0)
}

export function decodeSCSpecUDTStructFieldV0(input: Uint8Array | string): SCSpecUDTStructFieldV0 {
  return decode(input, readSCSpecUDTStructFieldV0)
}

export function toJsonSCSpecUDTStructFieldV0(v: SCSpecUDTStructFieldV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'name': escapeXdrString(v.name),
    'type': toJsonSCSpecTypeDef(v.type),
  }
}

export function fromJsonSCSpecUDTStructFieldV0(json: unknown): SCSpecUDTStructFieldV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    name: unescapeXdrString((o['name']) as string),
    type: fromJsonSCSpecTypeDef(o['type']),
  }
}

export interface SCSpecUDTStructV0 {
  readonly doc: string
  readonly lib: string
  readonly name: string
  readonly fields: SCSpecUDTStructFieldV0[]
}

export function readSCSpecUDTStructV0(r: XdrReader): SCSpecUDTStructV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const lib = readString(r, 80)
    const name = readString(r, 60)
    const fields = readVarArray(r, UINT32_MAX, readSCSpecUDTStructFieldV0)
    return { doc, lib, name, fields }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecUDTStructV0(w: XdrWriter, v: SCSpecUDTStructV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.lib, 80)
  writeString(w, v.name, 60)
  writeVarArray(w, v.fields, UINT32_MAX, writeSCSpecUDTStructFieldV0)
}

export function encodeSCSpecUDTStructV0(v: SCSpecUDTStructV0): Uint8Array {
  return encode(v, writeSCSpecUDTStructV0)
}

export function decodeSCSpecUDTStructV0(input: Uint8Array | string): SCSpecUDTStructV0 {
  return decode(input, readSCSpecUDTStructV0)
}

export function toJsonSCSpecUDTStructV0(v: SCSpecUDTStructV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'lib': escapeXdrString(v.lib),
    'name': escapeXdrString(v.name),
    'fields': v.fields.map((item: any) => toJsonSCSpecUDTStructFieldV0(item)),
  }
}

export function fromJsonSCSpecUDTStructV0(json: unknown): SCSpecUDTStructV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    lib: unescapeXdrString((o['lib']) as string),
    name: unescapeXdrString((o['name']) as string),
    fields: ((o['fields']) as unknown[]).map((item: unknown) => fromJsonSCSpecUDTStructFieldV0(item)),
  }
}

export interface SCSpecUDTUnionCaseVoidV0 {
  readonly doc: string
  readonly name: string
}

export function readSCSpecUDTUnionCaseVoidV0(r: XdrReader): SCSpecUDTUnionCaseVoidV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const name = readString(r, 60)
    return { doc, name }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecUDTUnionCaseVoidV0(w: XdrWriter, v: SCSpecUDTUnionCaseVoidV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.name, 60)
}

export function encodeSCSpecUDTUnionCaseVoidV0(v: SCSpecUDTUnionCaseVoidV0): Uint8Array {
  return encode(v, writeSCSpecUDTUnionCaseVoidV0)
}

export function decodeSCSpecUDTUnionCaseVoidV0(input: Uint8Array | string): SCSpecUDTUnionCaseVoidV0 {
  return decode(input, readSCSpecUDTUnionCaseVoidV0)
}

export function toJsonSCSpecUDTUnionCaseVoidV0(v: SCSpecUDTUnionCaseVoidV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'name': escapeXdrString(v.name),
  }
}

export function fromJsonSCSpecUDTUnionCaseVoidV0(json: unknown): SCSpecUDTUnionCaseVoidV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    name: unescapeXdrString((o['name']) as string),
  }
}

export interface SCSpecUDTUnionCaseTupleV0 {
  readonly doc: string
  readonly name: string
  readonly type: SCSpecTypeDef[]
}

export function readSCSpecUDTUnionCaseTupleV0(r: XdrReader): SCSpecUDTUnionCaseTupleV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const name = readString(r, 60)
    const type_ = readVarArray(r, UINT32_MAX, readSCSpecTypeDef)
    return { doc, name, type: type_ }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecUDTUnionCaseTupleV0(w: XdrWriter, v: SCSpecUDTUnionCaseTupleV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.name, 60)
  writeVarArray(w, v.type, UINT32_MAX, writeSCSpecTypeDef)
}

export function encodeSCSpecUDTUnionCaseTupleV0(v: SCSpecUDTUnionCaseTupleV0): Uint8Array {
  return encode(v, writeSCSpecUDTUnionCaseTupleV0)
}

export function decodeSCSpecUDTUnionCaseTupleV0(input: Uint8Array | string): SCSpecUDTUnionCaseTupleV0 {
  return decode(input, readSCSpecUDTUnionCaseTupleV0)
}

export function toJsonSCSpecUDTUnionCaseTupleV0(v: SCSpecUDTUnionCaseTupleV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'name': escapeXdrString(v.name),
    'type': v.type.map((item: any) => toJsonSCSpecTypeDef(item)),
  }
}

export function fromJsonSCSpecUDTUnionCaseTupleV0(json: unknown): SCSpecUDTUnionCaseTupleV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    name: unescapeXdrString((o['name']) as string),
    type: ((o['type']) as unknown[]).map((item: unknown) => fromJsonSCSpecTypeDef(item)),
  }
}

export type SCSpecUDTUnionCaseV0Kind =
  | 'SC_SPEC_UDT_UNION_CASE_VOID_V0'
  | 'SC_SPEC_UDT_UNION_CASE_TUPLE_V0'

export const S_C_SPEC_U_D_T_UNION_CASE_V0_KIND_TO_INT: Record<SCSpecUDTUnionCaseV0Kind, number> = /*#__PURE__*/ {
  SC_SPEC_UDT_UNION_CASE_VOID_V0: 0,
  SC_SPEC_UDT_UNION_CASE_TUPLE_V0: 1,
}

export const S_C_SPEC_U_D_T_UNION_CASE_V0_KIND_FROM_INT: Record<number, SCSpecUDTUnionCaseV0Kind> = /*#__PURE__*/ {
  0: 'SC_SPEC_UDT_UNION_CASE_VOID_V0',
  1: 'SC_SPEC_UDT_UNION_CASE_TUPLE_V0',
}

export function readSCSpecUDTUnionCaseV0Kind(r: XdrReader): SCSpecUDTUnionCaseV0Kind {
  const v = readInt32(r)
  const result = S_C_SPEC_U_D_T_UNION_CASE_V0_KIND_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCSpecUDTUnionCaseV0Kind value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCSpecUDTUnionCaseV0Kind(w: XdrWriter, v: SCSpecUDTUnionCaseV0Kind): void {
  writeInt32(w, S_C_SPEC_U_D_T_UNION_CASE_V0_KIND_TO_INT[v])
}

export function encodeSCSpecUDTUnionCaseV0Kind(v: SCSpecUDTUnionCaseV0Kind): Uint8Array {
  return encode(v, writeSCSpecUDTUnionCaseV0Kind)
}

export function decodeSCSpecUDTUnionCaseV0Kind(input: Uint8Array | string): SCSpecUDTUnionCaseV0Kind {
  return decode(input, readSCSpecUDTUnionCaseV0Kind)
}

const _S_C_SPEC_U_D_T_UNION_CASE_V0_KIND_TO_JSON: Record<SCSpecUDTUnionCaseV0Kind, string> = /*#__PURE__*/ {
  SC_SPEC_UDT_UNION_CASE_VOID_V0: 'void_v0',
  SC_SPEC_UDT_UNION_CASE_TUPLE_V0: 'tuple_v0',
}

const _S_C_SPEC_U_D_T_UNION_CASE_V0_KIND_FROM_JSON: Record<string, SCSpecUDTUnionCaseV0Kind> = /*#__PURE__*/ {
  'void_v0': 'SC_SPEC_UDT_UNION_CASE_VOID_V0',
  'tuple_v0': 'SC_SPEC_UDT_UNION_CASE_TUPLE_V0',
}

export function toJsonSCSpecUDTUnionCaseV0Kind(v: SCSpecUDTUnionCaseV0Kind): string {
  return _S_C_SPEC_U_D_T_UNION_CASE_V0_KIND_TO_JSON[v]
}

export function fromJsonSCSpecUDTUnionCaseV0Kind(json: unknown): SCSpecUDTUnionCaseV0Kind {
  const result = _S_C_SPEC_U_D_T_UNION_CASE_V0_KIND_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCSpecUDTUnionCaseV0Kind JSON value: ${json}`)
  return result
}

export type SCSpecUDTUnionCaseV0 =
  | { readonly kind: 'SC_SPEC_UDT_UNION_CASE_VOID_V0'; readonly voidCase: SCSpecUDTUnionCaseVoidV0 }
  | { readonly kind: 'SC_SPEC_UDT_UNION_CASE_TUPLE_V0'; readonly tupleCase: SCSpecUDTUnionCaseTupleV0 }

export function readSCSpecUDTUnionCaseV0(r: XdrReader): SCSpecUDTUnionCaseV0 {
  beginComposite(r)
  try {
    const kind = readSCSpecUDTUnionCaseV0Kind(r)
    let result: SCSpecUDTUnionCaseV0
    switch (kind) {
      case 'SC_SPEC_UDT_UNION_CASE_VOID_V0':
        result = { kind, voidCase: readSCSpecUDTUnionCaseVoidV0(r) }; break
      case 'SC_SPEC_UDT_UNION_CASE_TUPLE_V0':
        result = { kind, tupleCase: readSCSpecUDTUnionCaseTupleV0(r) }; break
      default:
        throw new XdrReadError(`Unknown SCSpecUDTUnionCaseV0 discriminant: ${kind}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecUDTUnionCaseV0(w: XdrWriter, v: SCSpecUDTUnionCaseV0): void {
  writeSCSpecUDTUnionCaseV0Kind(w, v.kind)
  switch (v.kind) {
    case 'SC_SPEC_UDT_UNION_CASE_VOID_V0':
      writeSCSpecUDTUnionCaseVoidV0(w, (v as any).voidCase); break
    case 'SC_SPEC_UDT_UNION_CASE_TUPLE_V0':
      writeSCSpecUDTUnionCaseTupleV0(w, (v as any).tupleCase); break
  }
}

export function encodeSCSpecUDTUnionCaseV0(v: SCSpecUDTUnionCaseV0): Uint8Array {
  return encode(v, writeSCSpecUDTUnionCaseV0)
}

export function decodeSCSpecUDTUnionCaseV0(input: Uint8Array | string): SCSpecUDTUnionCaseV0 {
  return decode(input, readSCSpecUDTUnionCaseV0)
}

export function toJsonSCSpecUDTUnionCaseV0(v: SCSpecUDTUnionCaseV0): unknown {
  switch (v.kind) {
    case 'SC_SPEC_UDT_UNION_CASE_VOID_V0':
      return { 'void_v0': toJsonSCSpecUDTUnionCaseVoidV0((v as any).voidCase) }
    case 'SC_SPEC_UDT_UNION_CASE_TUPLE_V0':
      return { 'tuple_v0': toJsonSCSpecUDTUnionCaseTupleV0((v as any).tupleCase) }
  }
}

export function fromJsonSCSpecUDTUnionCaseV0(json: unknown): SCSpecUDTUnionCaseV0 {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for SCSpecUDTUnionCaseV0: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'void_v0':
      return { kind: 'SC_SPEC_UDT_UNION_CASE_VOID_V0', voidCase: fromJsonSCSpecUDTUnionCaseVoidV0(obj[key]) } as SCSpecUDTUnionCaseV0
    case 'tuple_v0':
      return { kind: 'SC_SPEC_UDT_UNION_CASE_TUPLE_V0', tupleCase: fromJsonSCSpecUDTUnionCaseTupleV0(obj[key]) } as SCSpecUDTUnionCaseV0
    default: throw new Error(`Unknown SCSpecUDTUnionCaseV0 variant: ${key}`)
  }
}

export interface SCSpecUDTUnionV0 {
  readonly doc: string
  readonly lib: string
  readonly name: string
  readonly cases: SCSpecUDTUnionCaseV0[]
}

export function readSCSpecUDTUnionV0(r: XdrReader): SCSpecUDTUnionV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const lib = readString(r, 80)
    const name = readString(r, 60)
    const cases = readVarArray(r, UINT32_MAX, readSCSpecUDTUnionCaseV0)
    return { doc, lib, name, cases }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecUDTUnionV0(w: XdrWriter, v: SCSpecUDTUnionV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.lib, 80)
  writeString(w, v.name, 60)
  writeVarArray(w, v.cases, UINT32_MAX, writeSCSpecUDTUnionCaseV0)
}

export function encodeSCSpecUDTUnionV0(v: SCSpecUDTUnionV0): Uint8Array {
  return encode(v, writeSCSpecUDTUnionV0)
}

export function decodeSCSpecUDTUnionV0(input: Uint8Array | string): SCSpecUDTUnionV0 {
  return decode(input, readSCSpecUDTUnionV0)
}

export function toJsonSCSpecUDTUnionV0(v: SCSpecUDTUnionV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'lib': escapeXdrString(v.lib),
    'name': escapeXdrString(v.name),
    'cases': v.cases.map((item: any) => toJsonSCSpecUDTUnionCaseV0(item)),
  }
}

export function fromJsonSCSpecUDTUnionV0(json: unknown): SCSpecUDTUnionV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    lib: unescapeXdrString((o['lib']) as string),
    name: unescapeXdrString((o['name']) as string),
    cases: ((o['cases']) as unknown[]).map((item: unknown) => fromJsonSCSpecUDTUnionCaseV0(item)),
  }
}

export interface SCSpecUDTEnumCaseV0 {
  readonly doc: string
  readonly name: string
  readonly value: uint32
}

export function readSCSpecUDTEnumCaseV0(r: XdrReader): SCSpecUDTEnumCaseV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const name = readString(r, 60)
    const value = readuint32(r)
    return { doc, name, value }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecUDTEnumCaseV0(w: XdrWriter, v: SCSpecUDTEnumCaseV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.name, 60)
  writeuint32(w, v.value)
}

export function encodeSCSpecUDTEnumCaseV0(v: SCSpecUDTEnumCaseV0): Uint8Array {
  return encode(v, writeSCSpecUDTEnumCaseV0)
}

export function decodeSCSpecUDTEnumCaseV0(input: Uint8Array | string): SCSpecUDTEnumCaseV0 {
  return decode(input, readSCSpecUDTEnumCaseV0)
}

export function toJsonSCSpecUDTEnumCaseV0(v: SCSpecUDTEnumCaseV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'name': escapeXdrString(v.name),
    'value': toJsonuint32(v.value),
  }
}

export function fromJsonSCSpecUDTEnumCaseV0(json: unknown): SCSpecUDTEnumCaseV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    name: unescapeXdrString((o['name']) as string),
    value: fromJsonuint32(o['value']),
  }
}

export interface SCSpecUDTEnumV0 {
  readonly doc: string
  readonly lib: string
  readonly name: string
  readonly cases: SCSpecUDTEnumCaseV0[]
}

export function readSCSpecUDTEnumV0(r: XdrReader): SCSpecUDTEnumV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const lib = readString(r, 80)
    const name = readString(r, 60)
    const cases = readVarArray(r, UINT32_MAX, readSCSpecUDTEnumCaseV0)
    return { doc, lib, name, cases }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecUDTEnumV0(w: XdrWriter, v: SCSpecUDTEnumV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.lib, 80)
  writeString(w, v.name, 60)
  writeVarArray(w, v.cases, UINT32_MAX, writeSCSpecUDTEnumCaseV0)
}

export function encodeSCSpecUDTEnumV0(v: SCSpecUDTEnumV0): Uint8Array {
  return encode(v, writeSCSpecUDTEnumV0)
}

export function decodeSCSpecUDTEnumV0(input: Uint8Array | string): SCSpecUDTEnumV0 {
  return decode(input, readSCSpecUDTEnumV0)
}

export function toJsonSCSpecUDTEnumV0(v: SCSpecUDTEnumV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'lib': escapeXdrString(v.lib),
    'name': escapeXdrString(v.name),
    'cases': v.cases.map((item: any) => toJsonSCSpecUDTEnumCaseV0(item)),
  }
}

export function fromJsonSCSpecUDTEnumV0(json: unknown): SCSpecUDTEnumV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    lib: unescapeXdrString((o['lib']) as string),
    name: unescapeXdrString((o['name']) as string),
    cases: ((o['cases']) as unknown[]).map((item: unknown) => fromJsonSCSpecUDTEnumCaseV0(item)),
  }
}

export interface SCSpecUDTErrorEnumCaseV0 {
  readonly doc: string
  readonly name: string
  readonly value: uint32
}

export function readSCSpecUDTErrorEnumCaseV0(r: XdrReader): SCSpecUDTErrorEnumCaseV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const name = readString(r, 60)
    const value = readuint32(r)
    return { doc, name, value }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecUDTErrorEnumCaseV0(w: XdrWriter, v: SCSpecUDTErrorEnumCaseV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.name, 60)
  writeuint32(w, v.value)
}

export function encodeSCSpecUDTErrorEnumCaseV0(v: SCSpecUDTErrorEnumCaseV0): Uint8Array {
  return encode(v, writeSCSpecUDTErrorEnumCaseV0)
}

export function decodeSCSpecUDTErrorEnumCaseV0(input: Uint8Array | string): SCSpecUDTErrorEnumCaseV0 {
  return decode(input, readSCSpecUDTErrorEnumCaseV0)
}

export function toJsonSCSpecUDTErrorEnumCaseV0(v: SCSpecUDTErrorEnumCaseV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'name': escapeXdrString(v.name),
    'value': toJsonuint32(v.value),
  }
}

export function fromJsonSCSpecUDTErrorEnumCaseV0(json: unknown): SCSpecUDTErrorEnumCaseV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    name: unescapeXdrString((o['name']) as string),
    value: fromJsonuint32(o['value']),
  }
}

export interface SCSpecUDTErrorEnumV0 {
  readonly doc: string
  readonly lib: string
  readonly name: string
  readonly cases: SCSpecUDTErrorEnumCaseV0[]
}

export function readSCSpecUDTErrorEnumV0(r: XdrReader): SCSpecUDTErrorEnumV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const lib = readString(r, 80)
    const name = readString(r, 60)
    const cases = readVarArray(r, UINT32_MAX, readSCSpecUDTErrorEnumCaseV0)
    return { doc, lib, name, cases }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecUDTErrorEnumV0(w: XdrWriter, v: SCSpecUDTErrorEnumV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.lib, 80)
  writeString(w, v.name, 60)
  writeVarArray(w, v.cases, UINT32_MAX, writeSCSpecUDTErrorEnumCaseV0)
}

export function encodeSCSpecUDTErrorEnumV0(v: SCSpecUDTErrorEnumV0): Uint8Array {
  return encode(v, writeSCSpecUDTErrorEnumV0)
}

export function decodeSCSpecUDTErrorEnumV0(input: Uint8Array | string): SCSpecUDTErrorEnumV0 {
  return decode(input, readSCSpecUDTErrorEnumV0)
}

export function toJsonSCSpecUDTErrorEnumV0(v: SCSpecUDTErrorEnumV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'lib': escapeXdrString(v.lib),
    'name': escapeXdrString(v.name),
    'cases': v.cases.map((item: any) => toJsonSCSpecUDTErrorEnumCaseV0(item)),
  }
}

export function fromJsonSCSpecUDTErrorEnumV0(json: unknown): SCSpecUDTErrorEnumV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    lib: unescapeXdrString((o['lib']) as string),
    name: unescapeXdrString((o['name']) as string),
    cases: ((o['cases']) as unknown[]).map((item: unknown) => fromJsonSCSpecUDTErrorEnumCaseV0(item)),
  }
}

export interface SCSpecFunctionInputV0 {
  readonly doc: string
  readonly name: string
  readonly type: SCSpecTypeDef
}

export function readSCSpecFunctionInputV0(r: XdrReader): SCSpecFunctionInputV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const name = readString(r, 30)
    const type_ = readSCSpecTypeDef(r)
    return { doc, name, type: type_ }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecFunctionInputV0(w: XdrWriter, v: SCSpecFunctionInputV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.name, 30)
  writeSCSpecTypeDef(w, v.type)
}

export function encodeSCSpecFunctionInputV0(v: SCSpecFunctionInputV0): Uint8Array {
  return encode(v, writeSCSpecFunctionInputV0)
}

export function decodeSCSpecFunctionInputV0(input: Uint8Array | string): SCSpecFunctionInputV0 {
  return decode(input, readSCSpecFunctionInputV0)
}

export function toJsonSCSpecFunctionInputV0(v: SCSpecFunctionInputV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'name': escapeXdrString(v.name),
    'type': toJsonSCSpecTypeDef(v.type),
  }
}

export function fromJsonSCSpecFunctionInputV0(json: unknown): SCSpecFunctionInputV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    name: unescapeXdrString((o['name']) as string),
    type: fromJsonSCSpecTypeDef(o['type']),
  }
}

export interface SCSpecFunctionV0 {
  readonly doc: string
  readonly name: SCSymbol
  readonly inputs: SCSpecFunctionInputV0[]
  readonly outputs: SCSpecTypeDef[]
}

export function readSCSpecFunctionV0(r: XdrReader): SCSpecFunctionV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const name = readSCSymbol(r)
    const inputs = readVarArray(r, UINT32_MAX, readSCSpecFunctionInputV0)
    const outputs = readVarArray(r, 1, readSCSpecTypeDef)
    return { doc, name, inputs, outputs }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecFunctionV0(w: XdrWriter, v: SCSpecFunctionV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeSCSymbol(w, v.name)
  writeVarArray(w, v.inputs, UINT32_MAX, writeSCSpecFunctionInputV0)
  writeVarArray(w, v.outputs, 1, writeSCSpecTypeDef)
}

export function encodeSCSpecFunctionV0(v: SCSpecFunctionV0): Uint8Array {
  return encode(v, writeSCSpecFunctionV0)
}

export function decodeSCSpecFunctionV0(input: Uint8Array | string): SCSpecFunctionV0 {
  return decode(input, readSCSpecFunctionV0)
}

export function toJsonSCSpecFunctionV0(v: SCSpecFunctionV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'name': toJsonSCSymbol(v.name),
    'inputs': v.inputs.map((item: any) => toJsonSCSpecFunctionInputV0(item)),
    'outputs': v.outputs.map((item: any) => toJsonSCSpecTypeDef(item)),
  }
}

export function fromJsonSCSpecFunctionV0(json: unknown): SCSpecFunctionV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    name: fromJsonSCSymbol(o['name']),
    inputs: ((o['inputs']) as unknown[]).map((item: unknown) => fromJsonSCSpecFunctionInputV0(item)),
    outputs: ((o['outputs']) as unknown[]).map((item: unknown) => fromJsonSCSpecTypeDef(item)),
  }
}

export type SCSpecEventParamLocationV0 =
  | 'SC_SPEC_EVENT_PARAM_LOCATION_DATA'
  | 'SC_SPEC_EVENT_PARAM_LOCATION_TOPIC_LIST'

export const S_C_SPEC_EVENT_PARAM_LOCATION_V0_TO_INT: Record<SCSpecEventParamLocationV0, number> = /*#__PURE__*/ {
  SC_SPEC_EVENT_PARAM_LOCATION_DATA: 0,
  SC_SPEC_EVENT_PARAM_LOCATION_TOPIC_LIST: 1,
}

export const S_C_SPEC_EVENT_PARAM_LOCATION_V0_FROM_INT: Record<number, SCSpecEventParamLocationV0> = /*#__PURE__*/ {
  0: 'SC_SPEC_EVENT_PARAM_LOCATION_DATA',
  1: 'SC_SPEC_EVENT_PARAM_LOCATION_TOPIC_LIST',
}

export function readSCSpecEventParamLocationV0(r: XdrReader): SCSpecEventParamLocationV0 {
  const v = readInt32(r)
  const result = S_C_SPEC_EVENT_PARAM_LOCATION_V0_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCSpecEventParamLocationV0 value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCSpecEventParamLocationV0(w: XdrWriter, v: SCSpecEventParamLocationV0): void {
  writeInt32(w, S_C_SPEC_EVENT_PARAM_LOCATION_V0_TO_INT[v])
}

export function encodeSCSpecEventParamLocationV0(v: SCSpecEventParamLocationV0): Uint8Array {
  return encode(v, writeSCSpecEventParamLocationV0)
}

export function decodeSCSpecEventParamLocationV0(input: Uint8Array | string): SCSpecEventParamLocationV0 {
  return decode(input, readSCSpecEventParamLocationV0)
}

const _S_C_SPEC_EVENT_PARAM_LOCATION_V0_TO_JSON: Record<SCSpecEventParamLocationV0, string> = /*#__PURE__*/ {
  SC_SPEC_EVENT_PARAM_LOCATION_DATA: 'data',
  SC_SPEC_EVENT_PARAM_LOCATION_TOPIC_LIST: 'topic_list',
}

const _S_C_SPEC_EVENT_PARAM_LOCATION_V0_FROM_JSON: Record<string, SCSpecEventParamLocationV0> = /*#__PURE__*/ {
  'data': 'SC_SPEC_EVENT_PARAM_LOCATION_DATA',
  'topic_list': 'SC_SPEC_EVENT_PARAM_LOCATION_TOPIC_LIST',
}

export function toJsonSCSpecEventParamLocationV0(v: SCSpecEventParamLocationV0): string {
  return _S_C_SPEC_EVENT_PARAM_LOCATION_V0_TO_JSON[v]
}

export function fromJsonSCSpecEventParamLocationV0(json: unknown): SCSpecEventParamLocationV0 {
  const result = _S_C_SPEC_EVENT_PARAM_LOCATION_V0_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCSpecEventParamLocationV0 JSON value: ${json}`)
  return result
}

export interface SCSpecEventParamV0 {
  readonly doc: string
  readonly name: string
  readonly type: SCSpecTypeDef
  readonly location: SCSpecEventParamLocationV0
}

export function readSCSpecEventParamV0(r: XdrReader): SCSpecEventParamV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const name = readString(r, 30)
    const type_ = readSCSpecTypeDef(r)
    const location = readSCSpecEventParamLocationV0(r)
    return { doc, name, type: type_, location }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecEventParamV0(w: XdrWriter, v: SCSpecEventParamV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.name, 30)
  writeSCSpecTypeDef(w, v.type)
  writeSCSpecEventParamLocationV0(w, v.location)
}

export function encodeSCSpecEventParamV0(v: SCSpecEventParamV0): Uint8Array {
  return encode(v, writeSCSpecEventParamV0)
}

export function decodeSCSpecEventParamV0(input: Uint8Array | string): SCSpecEventParamV0 {
  return decode(input, readSCSpecEventParamV0)
}

export function toJsonSCSpecEventParamV0(v: SCSpecEventParamV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'name': escapeXdrString(v.name),
    'type': toJsonSCSpecTypeDef(v.type),
    'location': toJsonSCSpecEventParamLocationV0(v.location),
  }
}

export function fromJsonSCSpecEventParamV0(json: unknown): SCSpecEventParamV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    name: unescapeXdrString((o['name']) as string),
    type: fromJsonSCSpecTypeDef(o['type']),
    location: fromJsonSCSpecEventParamLocationV0(o['location']),
  }
}

export type SCSpecEventDataFormat =
  | 'SC_SPEC_EVENT_DATA_FORMAT_SINGLE_VALUE'
  | 'SC_SPEC_EVENT_DATA_FORMAT_VEC'
  | 'SC_SPEC_EVENT_DATA_FORMAT_MAP'

export const S_C_SPEC_EVENT_DATA_FORMAT_TO_INT: Record<SCSpecEventDataFormat, number> = /*#__PURE__*/ {
  SC_SPEC_EVENT_DATA_FORMAT_SINGLE_VALUE: 0,
  SC_SPEC_EVENT_DATA_FORMAT_VEC: 1,
  SC_SPEC_EVENT_DATA_FORMAT_MAP: 2,
}

export const S_C_SPEC_EVENT_DATA_FORMAT_FROM_INT: Record<number, SCSpecEventDataFormat> = /*#__PURE__*/ {
  0: 'SC_SPEC_EVENT_DATA_FORMAT_SINGLE_VALUE',
  1: 'SC_SPEC_EVENT_DATA_FORMAT_VEC',
  2: 'SC_SPEC_EVENT_DATA_FORMAT_MAP',
}

export function readSCSpecEventDataFormat(r: XdrReader): SCSpecEventDataFormat {
  const v = readInt32(r)
  const result = S_C_SPEC_EVENT_DATA_FORMAT_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCSpecEventDataFormat value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCSpecEventDataFormat(w: XdrWriter, v: SCSpecEventDataFormat): void {
  writeInt32(w, S_C_SPEC_EVENT_DATA_FORMAT_TO_INT[v])
}

export function encodeSCSpecEventDataFormat(v: SCSpecEventDataFormat): Uint8Array {
  return encode(v, writeSCSpecEventDataFormat)
}

export function decodeSCSpecEventDataFormat(input: Uint8Array | string): SCSpecEventDataFormat {
  return decode(input, readSCSpecEventDataFormat)
}

const _S_C_SPEC_EVENT_DATA_FORMAT_TO_JSON: Record<SCSpecEventDataFormat, string> = /*#__PURE__*/ {
  SC_SPEC_EVENT_DATA_FORMAT_SINGLE_VALUE: 'single_value',
  SC_SPEC_EVENT_DATA_FORMAT_VEC: 'vec',
  SC_SPEC_EVENT_DATA_FORMAT_MAP: 'map',
}

const _S_C_SPEC_EVENT_DATA_FORMAT_FROM_JSON: Record<string, SCSpecEventDataFormat> = /*#__PURE__*/ {
  'single_value': 'SC_SPEC_EVENT_DATA_FORMAT_SINGLE_VALUE',
  'vec': 'SC_SPEC_EVENT_DATA_FORMAT_VEC',
  'map': 'SC_SPEC_EVENT_DATA_FORMAT_MAP',
}

export function toJsonSCSpecEventDataFormat(v: SCSpecEventDataFormat): string {
  return _S_C_SPEC_EVENT_DATA_FORMAT_TO_JSON[v]
}

export function fromJsonSCSpecEventDataFormat(json: unknown): SCSpecEventDataFormat {
  const result = _S_C_SPEC_EVENT_DATA_FORMAT_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCSpecEventDataFormat JSON value: ${json}`)
  return result
}

export interface SCSpecEventV0 {
  readonly doc: string
  readonly lib: string
  readonly name: SCSymbol
  readonly prefixTopics: SCSymbol[]
  readonly params: SCSpecEventParamV0[]
  readonly dataFormat: SCSpecEventDataFormat
}

export function readSCSpecEventV0(r: XdrReader): SCSpecEventV0 {
  beginComposite(r)
  try {
    const doc = readString(r, SC_SPEC_DOC_LIMIT)
    const lib = readString(r, 80)
    const name = readSCSymbol(r)
    const prefixTopics = readVarArray(r, 2, readSCSymbol)
    const params = readVarArray(r, UINT32_MAX, readSCSpecEventParamV0)
    const dataFormat = readSCSpecEventDataFormat(r)
    return { doc, lib, name, prefixTopics, params, dataFormat }
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecEventV0(w: XdrWriter, v: SCSpecEventV0): void {
  writeString(w, v.doc, SC_SPEC_DOC_LIMIT)
  writeString(w, v.lib, 80)
  writeSCSymbol(w, v.name)
  writeVarArray(w, v.prefixTopics, 2, writeSCSymbol)
  writeVarArray(w, v.params, UINT32_MAX, writeSCSpecEventParamV0)
  writeSCSpecEventDataFormat(w, v.dataFormat)
}

export function encodeSCSpecEventV0(v: SCSpecEventV0): Uint8Array {
  return encode(v, writeSCSpecEventV0)
}

export function decodeSCSpecEventV0(input: Uint8Array | string): SCSpecEventV0 {
  return decode(input, readSCSpecEventV0)
}

export function toJsonSCSpecEventV0(v: SCSpecEventV0): Record<string, unknown> {
  return {
    'doc': escapeXdrString(v.doc),
    'lib': escapeXdrString(v.lib),
    'name': toJsonSCSymbol(v.name),
    'prefix_topics': v.prefixTopics.map((item: any) => toJsonSCSymbol(item)),
    'params': v.params.map((item: any) => toJsonSCSpecEventParamV0(item)),
    'data_format': toJsonSCSpecEventDataFormat(v.dataFormat),
  }
}

export function fromJsonSCSpecEventV0(json: unknown): SCSpecEventV0 {
  const o = json as Record<string, unknown>
  return {
    doc: unescapeXdrString((o['doc']) as string),
    lib: unescapeXdrString((o['lib']) as string),
    name: fromJsonSCSymbol(o['name']),
    prefixTopics: ((o['prefix_topics']) as unknown[]).map((item: unknown) => fromJsonSCSymbol(item)),
    params: ((o['params']) as unknown[]).map((item: unknown) => fromJsonSCSpecEventParamV0(item)),
    dataFormat: fromJsonSCSpecEventDataFormat(o['data_format']),
  }
}

export type SCSpecEntryKind =
  | 'SC_SPEC_ENTRY_FUNCTION_V0'
  | 'SC_SPEC_ENTRY_UDT_STRUCT_V0'
  | 'SC_SPEC_ENTRY_UDT_UNION_V0'
  | 'SC_SPEC_ENTRY_UDT_ENUM_V0'
  | 'SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0'
  | 'SC_SPEC_ENTRY_EVENT_V0'

export const S_C_SPEC_ENTRY_KIND_TO_INT: Record<SCSpecEntryKind, number> = /*#__PURE__*/ {
  SC_SPEC_ENTRY_FUNCTION_V0: 0,
  SC_SPEC_ENTRY_UDT_STRUCT_V0: 1,
  SC_SPEC_ENTRY_UDT_UNION_V0: 2,
  SC_SPEC_ENTRY_UDT_ENUM_V0: 3,
  SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0: 4,
  SC_SPEC_ENTRY_EVENT_V0: 5,
}

export const S_C_SPEC_ENTRY_KIND_FROM_INT: Record<number, SCSpecEntryKind> = /*#__PURE__*/ {
  0: 'SC_SPEC_ENTRY_FUNCTION_V0',
  1: 'SC_SPEC_ENTRY_UDT_STRUCT_V0',
  2: 'SC_SPEC_ENTRY_UDT_UNION_V0',
  3: 'SC_SPEC_ENTRY_UDT_ENUM_V0',
  4: 'SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0',
  5: 'SC_SPEC_ENTRY_EVENT_V0',
}

export function readSCSpecEntryKind(r: XdrReader): SCSpecEntryKind {
  const v = readInt32(r)
  const result = S_C_SPEC_ENTRY_KIND_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCSpecEntryKind value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCSpecEntryKind(w: XdrWriter, v: SCSpecEntryKind): void {
  writeInt32(w, S_C_SPEC_ENTRY_KIND_TO_INT[v])
}

export function encodeSCSpecEntryKind(v: SCSpecEntryKind): Uint8Array {
  return encode(v, writeSCSpecEntryKind)
}

export function decodeSCSpecEntryKind(input: Uint8Array | string): SCSpecEntryKind {
  return decode(input, readSCSpecEntryKind)
}

const _S_C_SPEC_ENTRY_KIND_TO_JSON: Record<SCSpecEntryKind, string> = /*#__PURE__*/ {
  SC_SPEC_ENTRY_FUNCTION_V0: 'function_v0',
  SC_SPEC_ENTRY_UDT_STRUCT_V0: 'udt_struct_v0',
  SC_SPEC_ENTRY_UDT_UNION_V0: 'udt_union_v0',
  SC_SPEC_ENTRY_UDT_ENUM_V0: 'udt_enum_v0',
  SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0: 'udt_error_enum_v0',
  SC_SPEC_ENTRY_EVENT_V0: 'event_v0',
}

const _S_C_SPEC_ENTRY_KIND_FROM_JSON: Record<string, SCSpecEntryKind> = /*#__PURE__*/ {
  'function_v0': 'SC_SPEC_ENTRY_FUNCTION_V0',
  'udt_struct_v0': 'SC_SPEC_ENTRY_UDT_STRUCT_V0',
  'udt_union_v0': 'SC_SPEC_ENTRY_UDT_UNION_V0',
  'udt_enum_v0': 'SC_SPEC_ENTRY_UDT_ENUM_V0',
  'udt_error_enum_v0': 'SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0',
  'event_v0': 'SC_SPEC_ENTRY_EVENT_V0',
}

export function toJsonSCSpecEntryKind(v: SCSpecEntryKind): string {
  return _S_C_SPEC_ENTRY_KIND_TO_JSON[v]
}

export function fromJsonSCSpecEntryKind(json: unknown): SCSpecEntryKind {
  const result = _S_C_SPEC_ENTRY_KIND_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCSpecEntryKind JSON value: ${json}`)
  return result
}

export type SCSpecEntry =
  | { readonly kind: 'SC_SPEC_ENTRY_FUNCTION_V0'; readonly functionV0: SCSpecFunctionV0 }
  | { readonly kind: 'SC_SPEC_ENTRY_UDT_STRUCT_V0'; readonly udtStructV0: SCSpecUDTStructV0 }
  | { readonly kind: 'SC_SPEC_ENTRY_UDT_UNION_V0'; readonly udtUnionV0: SCSpecUDTUnionV0 }
  | { readonly kind: 'SC_SPEC_ENTRY_UDT_ENUM_V0'; readonly udtEnumV0: SCSpecUDTEnumV0 }
  | { readonly kind: 'SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0'; readonly udtErrorEnumV0: SCSpecUDTErrorEnumV0 }
  | { readonly kind: 'SC_SPEC_ENTRY_EVENT_V0'; readonly eventV0: SCSpecEventV0 }

export function readSCSpecEntry(r: XdrReader): SCSpecEntry {
  beginComposite(r)
  try {
    const kind = readSCSpecEntryKind(r)
    let result: SCSpecEntry
    switch (kind) {
      case 'SC_SPEC_ENTRY_FUNCTION_V0':
        result = { kind, functionV0: readSCSpecFunctionV0(r) }; break
      case 'SC_SPEC_ENTRY_UDT_STRUCT_V0':
        result = { kind, udtStructV0: readSCSpecUDTStructV0(r) }; break
      case 'SC_SPEC_ENTRY_UDT_UNION_V0':
        result = { kind, udtUnionV0: readSCSpecUDTUnionV0(r) }; break
      case 'SC_SPEC_ENTRY_UDT_ENUM_V0':
        result = { kind, udtEnumV0: readSCSpecUDTEnumV0(r) }; break
      case 'SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0':
        result = { kind, udtErrorEnumV0: readSCSpecUDTErrorEnumV0(r) }; break
      case 'SC_SPEC_ENTRY_EVENT_V0':
        result = { kind, eventV0: readSCSpecEventV0(r) }; break
      default:
        throw new XdrReadError(`Unknown SCSpecEntry discriminant: ${kind}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSCSpecEntry(w: XdrWriter, v: SCSpecEntry): void {
  writeSCSpecEntryKind(w, v.kind)
  switch (v.kind) {
    case 'SC_SPEC_ENTRY_FUNCTION_V0':
      writeSCSpecFunctionV0(w, (v as any).functionV0); break
    case 'SC_SPEC_ENTRY_UDT_STRUCT_V0':
      writeSCSpecUDTStructV0(w, (v as any).udtStructV0); break
    case 'SC_SPEC_ENTRY_UDT_UNION_V0':
      writeSCSpecUDTUnionV0(w, (v as any).udtUnionV0); break
    case 'SC_SPEC_ENTRY_UDT_ENUM_V0':
      writeSCSpecUDTEnumV0(w, (v as any).udtEnumV0); break
    case 'SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0':
      writeSCSpecUDTErrorEnumV0(w, (v as any).udtErrorEnumV0); break
    case 'SC_SPEC_ENTRY_EVENT_V0':
      writeSCSpecEventV0(w, (v as any).eventV0); break
  }
}

export function encodeSCSpecEntry(v: SCSpecEntry): Uint8Array {
  return encode(v, writeSCSpecEntry)
}

export function decodeSCSpecEntry(input: Uint8Array | string): SCSpecEntry {
  return decode(input, readSCSpecEntry)
}

export function toJsonSCSpecEntry(v: SCSpecEntry): unknown {
  switch (v.kind) {
    case 'SC_SPEC_ENTRY_FUNCTION_V0':
      return { 'function_v0': toJsonSCSpecFunctionV0((v as any).functionV0) }
    case 'SC_SPEC_ENTRY_UDT_STRUCT_V0':
      return { 'udt_struct_v0': toJsonSCSpecUDTStructV0((v as any).udtStructV0) }
    case 'SC_SPEC_ENTRY_UDT_UNION_V0':
      return { 'udt_union_v0': toJsonSCSpecUDTUnionV0((v as any).udtUnionV0) }
    case 'SC_SPEC_ENTRY_UDT_ENUM_V0':
      return { 'udt_enum_v0': toJsonSCSpecUDTEnumV0((v as any).udtEnumV0) }
    case 'SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0':
      return { 'udt_error_enum_v0': toJsonSCSpecUDTErrorEnumV0((v as any).udtErrorEnumV0) }
    case 'SC_SPEC_ENTRY_EVENT_V0':
      return { 'event_v0': toJsonSCSpecEventV0((v as any).eventV0) }
  }
}

export function fromJsonSCSpecEntry(json: unknown): SCSpecEntry {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for SCSpecEntry: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'function_v0':
      return { kind: 'SC_SPEC_ENTRY_FUNCTION_V0', functionV0: fromJsonSCSpecFunctionV0(obj[key]) } as SCSpecEntry
    case 'udt_struct_v0':
      return { kind: 'SC_SPEC_ENTRY_UDT_STRUCT_V0', udtStructV0: fromJsonSCSpecUDTStructV0(obj[key]) } as SCSpecEntry
    case 'udt_union_v0':
      return { kind: 'SC_SPEC_ENTRY_UDT_UNION_V0', udtUnionV0: fromJsonSCSpecUDTUnionV0(obj[key]) } as SCSpecEntry
    case 'udt_enum_v0':
      return { kind: 'SC_SPEC_ENTRY_UDT_ENUM_V0', udtEnumV0: fromJsonSCSpecUDTEnumV0(obj[key]) } as SCSpecEntry
    case 'udt_error_enum_v0':
      return { kind: 'SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0', udtErrorEnumV0: fromJsonSCSpecUDTErrorEnumV0(obj[key]) } as SCSpecEntry
    case 'event_v0':
      return { kind: 'SC_SPEC_ENTRY_EVENT_V0', eventV0: fromJsonSCSpecEventV0(obj[key]) } as SCSpecEntry
    default: throw new Error(`Unknown SCSpecEntry variant: ${key}`)
  }
}
