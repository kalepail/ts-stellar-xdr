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

import type { ConfigSettingEntry, ConfigSettingID } from './contract-config-setting.js'
import { readConfigSettingEntry, writeConfigSettingEntry, toJsonConfigSettingEntry, fromJsonConfigSettingEntry, readConfigSettingID, writeConfigSettingID, toJsonConfigSettingID, fromJsonConfigSettingID } from './contract-config-setting.js'
import type { SCAddress, SCVal } from './contract.js'
import { readSCAddress, writeSCAddress, toJsonSCAddress, fromJsonSCAddress, readSCVal, writeSCVal, toJsonSCVal, fromJsonSCVal } from './contract.js'
import type { AccountID, ClaimableBalanceID, ExtensionPoint, Hash, PoolID, SignerKey, TimePoint, int32, int64, uint32 } from './types.js'
import { readAccountID, writeAccountID, toJsonAccountID, fromJsonAccountID, readClaimableBalanceID, writeClaimableBalanceID, toJsonClaimableBalanceID, fromJsonClaimableBalanceID, readExtensionPoint, writeExtensionPoint, toJsonExtensionPoint, fromJsonExtensionPoint, readHash, writeHash, toJsonHash, fromJsonHash, readPoolID, writePoolID, toJsonPoolID, fromJsonPoolID, readSignerKey, writeSignerKey, toJsonSignerKey, fromJsonSignerKey, readTimePoint, writeTimePoint, toJsonTimePoint, fromJsonTimePoint, readint32, writeint32, toJsonint32, fromJsonint32, readint64, writeint64, toJsonint64, fromJsonint64, readuint32, writeuint32, toJsonuint32, fromJsonuint32 } from './types.js'


export type Thresholds = Uint8Array

export function readThresholds(r: XdrReader): Thresholds {
  return readFixedOpaque(r, 4)
}

export function writeThresholds(w: XdrWriter, v: Thresholds): void {
  writeFixedOpaque(w, v, 4)
}

export function encodeThresholds(v: Thresholds): Uint8Array {
  return encode(v, writeThresholds)
}

export function decodeThresholds(input: Uint8Array | string): Thresholds {
  return decode(input, readThresholds)
}

export function toJsonThresholds(v: Thresholds): unknown {
  return bytesToHex(v)
}

export function fromJsonThresholds(json: unknown): Thresholds {
  return hexToBytes((json) as string)
}

export type string32 = string

export function readstring32(r: XdrReader): string32 {
  return readString(r, 32)
}

export function writestring32(w: XdrWriter, v: string32): void {
  writeString(w, v, 32)
}

export function encodestring32(v: string32): Uint8Array {
  return encode(v, writestring32)
}

export function decodestring32(input: Uint8Array | string): string32 {
  return decode(input, readstring32)
}

export function toJsonstring32(v: string32): unknown {
  return escapeXdrString(v)
}

export function fromJsonstring32(json: unknown): string32 {
  return unescapeXdrString((json) as string)
}

export type string64 = string

export function readstring64(r: XdrReader): string64 {
  return readString(r, 64)
}

export function writestring64(w: XdrWriter, v: string64): void {
  writeString(w, v, 64)
}

export function encodestring64(v: string64): Uint8Array {
  return encode(v, writestring64)
}

export function decodestring64(input: Uint8Array | string): string64 {
  return decode(input, readstring64)
}

export function toJsonstring64(v: string64): unknown {
  return escapeXdrString(v)
}

export function fromJsonstring64(json: unknown): string64 {
  return unescapeXdrString((json) as string)
}

export type SequenceNumber = int64

export function readSequenceNumber(r: XdrReader): SequenceNumber {
  return readint64(r)
}

export function writeSequenceNumber(w: XdrWriter, v: SequenceNumber): void {
  writeint64(w, v)
}

export function encodeSequenceNumber(v: SequenceNumber): Uint8Array {
  return encode(v, writeSequenceNumber)
}

export function decodeSequenceNumber(input: Uint8Array | string): SequenceNumber {
  return decode(input, readSequenceNumber)
}

export function toJsonSequenceNumber(v: SequenceNumber): unknown {
  return toJsonint64(v)
}

export function fromJsonSequenceNumber(json: unknown): SequenceNumber {
  return fromJsonint64(json)
}

export type DataValue = Uint8Array

export function readDataValue(r: XdrReader): DataValue {
  return readVarOpaque(r, 64)
}

export function writeDataValue(w: XdrWriter, v: DataValue): void {
  writeVarOpaque(w, v, 64)
}

export function encodeDataValue(v: DataValue): Uint8Array {
  return encode(v, writeDataValue)
}

export function decodeDataValue(input: Uint8Array | string): DataValue {
  return decode(input, readDataValue)
}

export function toJsonDataValue(v: DataValue): unknown {
  return bytesToHex(v)
}

export function fromJsonDataValue(json: unknown): DataValue {
  return hexToBytes((json) as string)
}

/** 1-4 alphanumeric characters right-padded with 0 bytes */
export type AssetCode4 = Uint8Array

export function readAssetCode4(r: XdrReader): AssetCode4 {
  return readFixedOpaque(r, 4)
}

export function writeAssetCode4(w: XdrWriter, v: AssetCode4): void {
  writeFixedOpaque(w, v, 4)
}

export function encodeAssetCode4(v: AssetCode4): Uint8Array {
  return encode(v, writeAssetCode4)
}

export function decodeAssetCode4(input: Uint8Array | string): AssetCode4 {
  return decode(input, readAssetCode4)
}

export function toJsonAssetCode4(v: AssetCode4): string {
  return escapeAssetCode4(v)
}

export function fromJsonAssetCode4(json: unknown): AssetCode4 {
  return unescapeAssetCode(json as string, 4)
}

/** 5-12 alphanumeric characters right-padded with 0 bytes */
export type AssetCode12 = Uint8Array

export function readAssetCode12(r: XdrReader): AssetCode12 {
  return readFixedOpaque(r, 12)
}

export function writeAssetCode12(w: XdrWriter, v: AssetCode12): void {
  writeFixedOpaque(w, v, 12)
}

export function encodeAssetCode12(v: AssetCode12): Uint8Array {
  return encode(v, writeAssetCode12)
}

export function decodeAssetCode12(input: Uint8Array | string): AssetCode12 {
  return decode(input, readAssetCode12)
}

export function toJsonAssetCode12(v: AssetCode12): string {
  return escapeAssetCode12(v)
}

export function fromJsonAssetCode12(json: unknown): AssetCode12 {
  return unescapeAssetCode(json as string, 12)
}

export type AssetType =
  | 'ASSET_TYPE_NATIVE'
  | 'ASSET_TYPE_CREDIT_ALPHANUM4'
  | 'ASSET_TYPE_CREDIT_ALPHANUM12'
  | 'ASSET_TYPE_POOL_SHARE'

export const ASSET_TYPE_TO_INT: Record<AssetType, number> = /*#__PURE__*/ {
  ASSET_TYPE_NATIVE: 0,
  ASSET_TYPE_CREDIT_ALPHANUM4: 1,
  ASSET_TYPE_CREDIT_ALPHANUM12: 2,
  ASSET_TYPE_POOL_SHARE: 3,
}

export const ASSET_TYPE_FROM_INT: Record<number, AssetType> = /*#__PURE__*/ {
  0: 'ASSET_TYPE_NATIVE',
  1: 'ASSET_TYPE_CREDIT_ALPHANUM4',
  2: 'ASSET_TYPE_CREDIT_ALPHANUM12',
  3: 'ASSET_TYPE_POOL_SHARE',
}

export function readAssetType(r: XdrReader): AssetType {
  const v = readInt32(r)
  const result = ASSET_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown AssetType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeAssetType(w: XdrWriter, v: AssetType): void {
  writeInt32(w, ASSET_TYPE_TO_INT[v])
}

export function encodeAssetType(v: AssetType): Uint8Array {
  return encode(v, writeAssetType)
}

export function decodeAssetType(input: Uint8Array | string): AssetType {
  return decode(input, readAssetType)
}

const _ASSET_TYPE_TO_JSON: Record<AssetType, string> = /*#__PURE__*/ {
  ASSET_TYPE_NATIVE: 'native',
  ASSET_TYPE_CREDIT_ALPHANUM4: 'credit_alphanum4',
  ASSET_TYPE_CREDIT_ALPHANUM12: 'credit_alphanum12',
  ASSET_TYPE_POOL_SHARE: 'pool_share',
}

const _ASSET_TYPE_FROM_JSON: Record<string, AssetType> = /*#__PURE__*/ {
  'native': 'ASSET_TYPE_NATIVE',
  'credit_alphanum4': 'ASSET_TYPE_CREDIT_ALPHANUM4',
  'credit_alphanum12': 'ASSET_TYPE_CREDIT_ALPHANUM12',
  'pool_share': 'ASSET_TYPE_POOL_SHARE',
}

export function toJsonAssetType(v: AssetType): string {
  return _ASSET_TYPE_TO_JSON[v]
}

export function fromJsonAssetType(json: unknown): AssetType {
  const result = _ASSET_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown AssetType JSON value: ${json}`)
  return result
}

export type AssetCode =
  | { readonly type: 'ASSET_TYPE_CREDIT_ALPHANUM4'; readonly assetCode4: AssetCode4 }
  | { readonly type: 'ASSET_TYPE_CREDIT_ALPHANUM12'; readonly assetCode12: AssetCode12 }

export function readAssetCode(r: XdrReader): AssetCode {
  beginComposite(r)
  try {
    const type = readAssetType(r)
    let result: AssetCode
    switch (type) {
      case 'ASSET_TYPE_CREDIT_ALPHANUM4':
        result = { type, assetCode4: readAssetCode4(r) }; break
      case 'ASSET_TYPE_CREDIT_ALPHANUM12':
        result = { type, assetCode12: readAssetCode12(r) }; break
      default:
        throw new XdrReadError(`Unknown AssetCode discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeAssetCode(w: XdrWriter, v: AssetCode): void {
  writeAssetType(w, v.type)
  switch (v.type) {
    case 'ASSET_TYPE_CREDIT_ALPHANUM4':
      writeAssetCode4(w, (v as any).assetCode4); break
    case 'ASSET_TYPE_CREDIT_ALPHANUM12':
      writeAssetCode12(w, (v as any).assetCode12); break
  }
}

export function encodeAssetCode(v: AssetCode): Uint8Array {
  return encode(v, writeAssetCode)
}

export function decodeAssetCode(input: Uint8Array | string): AssetCode {
  return decode(input, readAssetCode)
}

export function toJsonAssetCode(v: AssetCode): string {
  switch (v.type) {
    case 'ASSET_TYPE_CREDIT_ALPHANUM4':
      return toJsonAssetCode4((v as any).assetCode4)
    case 'ASSET_TYPE_CREDIT_ALPHANUM12':
      return toJsonAssetCode12((v as any).assetCode12)
  }
}

export function fromJsonAssetCode(json: unknown): AssetCode {
  const s = json as string
  if (assetCodeByteLength(s) <= 4) {
    return { type: 'ASSET_TYPE_CREDIT_ALPHANUM4', assetCode4: fromJsonAssetCode4(s) }
  }
  return { type: 'ASSET_TYPE_CREDIT_ALPHANUM12', assetCode12: fromJsonAssetCode12(s) }
}

export interface AlphaNum4 {
  readonly assetCode: AssetCode4
  readonly issuer: AccountID
}

export function readAlphaNum4(r: XdrReader): AlphaNum4 {
  beginComposite(r)
  try {
    const assetCode = readAssetCode4(r)
    const issuer = readAccountID(r)
    return { assetCode, issuer }
  } finally {
    endComposite(r)
  }
}

export function writeAlphaNum4(w: XdrWriter, v: AlphaNum4): void {
  writeAssetCode4(w, v.assetCode)
  writeAccountID(w, v.issuer)
}

export function encodeAlphaNum4(v: AlphaNum4): Uint8Array {
  return encode(v, writeAlphaNum4)
}

export function decodeAlphaNum4(input: Uint8Array | string): AlphaNum4 {
  return decode(input, readAlphaNum4)
}

export function toJsonAlphaNum4(v: AlphaNum4): Record<string, unknown> {
  return {
    'asset_code': toJsonAssetCode4(v.assetCode),
    'issuer': toJsonAccountID(v.issuer),
  }
}

export function fromJsonAlphaNum4(json: unknown): AlphaNum4 {
  const o = json as Record<string, unknown>
  return {
    assetCode: fromJsonAssetCode4(o['asset_code']),
    issuer: fromJsonAccountID(o['issuer']),
  }
}

export interface AlphaNum12 {
  readonly assetCode: AssetCode12
  readonly issuer: AccountID
}

export function readAlphaNum12(r: XdrReader): AlphaNum12 {
  beginComposite(r)
  try {
    const assetCode = readAssetCode12(r)
    const issuer = readAccountID(r)
    return { assetCode, issuer }
  } finally {
    endComposite(r)
  }
}

export function writeAlphaNum12(w: XdrWriter, v: AlphaNum12): void {
  writeAssetCode12(w, v.assetCode)
  writeAccountID(w, v.issuer)
}

export function encodeAlphaNum12(v: AlphaNum12): Uint8Array {
  return encode(v, writeAlphaNum12)
}

export function decodeAlphaNum12(input: Uint8Array | string): AlphaNum12 {
  return decode(input, readAlphaNum12)
}

export function toJsonAlphaNum12(v: AlphaNum12): Record<string, unknown> {
  return {
    'asset_code': toJsonAssetCode12(v.assetCode),
    'issuer': toJsonAccountID(v.issuer),
  }
}

export function fromJsonAlphaNum12(json: unknown): AlphaNum12 {
  const o = json as Record<string, unknown>
  return {
    assetCode: fromJsonAssetCode12(o['asset_code']),
    issuer: fromJsonAccountID(o['issuer']),
  }
}

export type Asset =
  | { readonly type: 'ASSET_TYPE_NATIVE' }
  | { readonly type: 'ASSET_TYPE_CREDIT_ALPHANUM4'; readonly alphaNum4: AlphaNum4 }
  | { readonly type: 'ASSET_TYPE_CREDIT_ALPHANUM12'; readonly alphaNum12: AlphaNum12 }

export function readAsset(r: XdrReader): Asset {
  beginComposite(r)
  try {
    const type = readAssetType(r)
    let result: Asset
    switch (type) {
      case 'ASSET_TYPE_NATIVE':
        result = { type }; break
      case 'ASSET_TYPE_CREDIT_ALPHANUM4':
        result = { type, alphaNum4: readAlphaNum4(r) }; break
      case 'ASSET_TYPE_CREDIT_ALPHANUM12':
        result = { type, alphaNum12: readAlphaNum12(r) }; break
      default:
        throw new XdrReadError(`Unknown Asset discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeAsset(w: XdrWriter, v: Asset): void {
  writeAssetType(w, v.type)
  switch (v.type) {
    case 'ASSET_TYPE_NATIVE':
      break
    case 'ASSET_TYPE_CREDIT_ALPHANUM4':
      writeAlphaNum4(w, (v as any).alphaNum4); break
    case 'ASSET_TYPE_CREDIT_ALPHANUM12':
      writeAlphaNum12(w, (v as any).alphaNum12); break
  }
}

export function encodeAsset(v: Asset): Uint8Array {
  return encode(v, writeAsset)
}

export function decodeAsset(input: Uint8Array | string): Asset {
  return decode(input, readAsset)
}

export function toJsonAsset(v: Asset): unknown {
  switch (v.type) {
    case 'ASSET_TYPE_NATIVE':
      return 'native'
    case 'ASSET_TYPE_CREDIT_ALPHANUM4':
      return { 'credit_alphanum4': toJsonAlphaNum4((v as any).alphaNum4) }
    case 'ASSET_TYPE_CREDIT_ALPHANUM12':
      return { 'credit_alphanum12': toJsonAlphaNum12((v as any).alphaNum12) }
  }
}

export function fromJsonAsset(json: unknown): Asset {
  if (typeof json === 'string') {
    if (json === 'native') return { type: 'ASSET_TYPE_NATIVE' } as Asset
    throw new Error(`Unknown Asset variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'credit_alphanum4':
      return { type: 'ASSET_TYPE_CREDIT_ALPHANUM4', alphaNum4: fromJsonAlphaNum4(obj[key]) } as Asset
    case 'credit_alphanum12':
      return { type: 'ASSET_TYPE_CREDIT_ALPHANUM12', alphaNum12: fromJsonAlphaNum12(obj[key]) } as Asset
    default: throw new Error(`Unknown Asset variant: ${key}`)
  }
}

/** price in fractional representation */
export interface Price {
  readonly n: int32
  /** numerator */
  readonly d: int32
}

export function readPrice(r: XdrReader): Price {
  beginComposite(r)
  try {
    const n = readint32(r)
    const d = readint32(r)
    return { n, d }
  } finally {
    endComposite(r)
  }
}

export function writePrice(w: XdrWriter, v: Price): void {
  writeint32(w, v.n)
  writeint32(w, v.d)
}

export function encodePrice(v: Price): Uint8Array {
  return encode(v, writePrice)
}

export function decodePrice(input: Uint8Array | string): Price {
  return decode(input, readPrice)
}

export function toJsonPrice(v: Price): Record<string, unknown> {
  return {
    'n': toJsonint32(v.n),
    'd': toJsonint32(v.d),
  }
}

export function fromJsonPrice(json: unknown): Price {
  const o = json as Record<string, unknown>
  return {
    n: fromJsonint32(o['n']),
    d: fromJsonint32(o['d']),
  }
}

export interface Liabilities {
  readonly buying: int64
  readonly selling: int64
}

export function readLiabilities(r: XdrReader): Liabilities {
  beginComposite(r)
  try {
    const buying = readint64(r)
    const selling = readint64(r)
    return { buying, selling }
  } finally {
    endComposite(r)
  }
}

export function writeLiabilities(w: XdrWriter, v: Liabilities): void {
  writeint64(w, v.buying)
  writeint64(w, v.selling)
}

export function encodeLiabilities(v: Liabilities): Uint8Array {
  return encode(v, writeLiabilities)
}

export function decodeLiabilities(input: Uint8Array | string): Liabilities {
  return decode(input, readLiabilities)
}

export function toJsonLiabilities(v: Liabilities): Record<string, unknown> {
  return {
    'buying': toJsonint64(v.buying),
    'selling': toJsonint64(v.selling),
  }
}

export function fromJsonLiabilities(json: unknown): Liabilities {
  const o = json as Record<string, unknown>
  return {
    buying: fromJsonint64(o['buying']),
    selling: fromJsonint64(o['selling']),
  }
}

/**
 * the 'Thresholds' type is packed uint8_t values
 * defined by these indexes
 */
export type ThresholdIndexes =
  | 'THRESHOLD_MASTER_WEIGHT'
  | 'THRESHOLD_LOW'
  | 'THRESHOLD_MED'
  | 'THRESHOLD_HIGH'

export const THRESHOLD_INDEXES_TO_INT: Record<ThresholdIndexes, number> = /*#__PURE__*/ {
  THRESHOLD_MASTER_WEIGHT: 0,
  THRESHOLD_LOW: 1,
  THRESHOLD_MED: 2,
  THRESHOLD_HIGH: 3,
}

export const THRESHOLD_INDEXES_FROM_INT: Record<number, ThresholdIndexes> = /*#__PURE__*/ {
  0: 'THRESHOLD_MASTER_WEIGHT',
  1: 'THRESHOLD_LOW',
  2: 'THRESHOLD_MED',
  3: 'THRESHOLD_HIGH',
}

export function readThresholdIndexes(r: XdrReader): ThresholdIndexes {
  const v = readInt32(r)
  const result = THRESHOLD_INDEXES_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ThresholdIndexes value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeThresholdIndexes(w: XdrWriter, v: ThresholdIndexes): void {
  writeInt32(w, THRESHOLD_INDEXES_TO_INT[v])
}

export function encodeThresholdIndexes(v: ThresholdIndexes): Uint8Array {
  return encode(v, writeThresholdIndexes)
}

export function decodeThresholdIndexes(input: Uint8Array | string): ThresholdIndexes {
  return decode(input, readThresholdIndexes)
}

const _THRESHOLD_INDEXES_TO_JSON: Record<ThresholdIndexes, string> = /*#__PURE__*/ {
  THRESHOLD_MASTER_WEIGHT: 'master_weight',
  THRESHOLD_LOW: 'low',
  THRESHOLD_MED: 'med',
  THRESHOLD_HIGH: 'high',
}

const _THRESHOLD_INDEXES_FROM_JSON: Record<string, ThresholdIndexes> = /*#__PURE__*/ {
  'master_weight': 'THRESHOLD_MASTER_WEIGHT',
  'low': 'THRESHOLD_LOW',
  'med': 'THRESHOLD_MED',
  'high': 'THRESHOLD_HIGH',
}

export function toJsonThresholdIndexes(v: ThresholdIndexes): string {
  return _THRESHOLD_INDEXES_TO_JSON[v]
}

export function fromJsonThresholdIndexes(json: unknown): ThresholdIndexes {
  const result = _THRESHOLD_INDEXES_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ThresholdIndexes JSON value: ${json}`)
  return result
}

export type LedgerEntryType =
  | 'ACCOUNT'
  | 'TRUSTLINE'
  | 'OFFER'
  | 'DATA'
  | 'CLAIMABLE_BALANCE'
  | 'LIQUIDITY_POOL'
  | 'CONTRACT_DATA'
  | 'CONTRACT_CODE'
  | 'CONFIG_SETTING'
  | 'TTL'

export const LEDGER_ENTRY_TYPE_TO_INT: Record<LedgerEntryType, number> = /*#__PURE__*/ {
  ACCOUNT: 0,
  TRUSTLINE: 1,
  OFFER: 2,
  DATA: 3,
  CLAIMABLE_BALANCE: 4,
  LIQUIDITY_POOL: 5,
  CONTRACT_DATA: 6,
  CONTRACT_CODE: 7,
  CONFIG_SETTING: 8,
  TTL: 9,
}

export const LEDGER_ENTRY_TYPE_FROM_INT: Record<number, LedgerEntryType> = /*#__PURE__*/ {
  0: 'ACCOUNT',
  1: 'TRUSTLINE',
  2: 'OFFER',
  3: 'DATA',
  4: 'CLAIMABLE_BALANCE',
  5: 'LIQUIDITY_POOL',
  6: 'CONTRACT_DATA',
  7: 'CONTRACT_CODE',
  8: 'CONFIG_SETTING',
  9: 'TTL',
}

export function readLedgerEntryType(r: XdrReader): LedgerEntryType {
  const v = readInt32(r)
  const result = LEDGER_ENTRY_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown LedgerEntryType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeLedgerEntryType(w: XdrWriter, v: LedgerEntryType): void {
  writeInt32(w, LEDGER_ENTRY_TYPE_TO_INT[v])
}

export function encodeLedgerEntryType(v: LedgerEntryType): Uint8Array {
  return encode(v, writeLedgerEntryType)
}

export function decodeLedgerEntryType(input: Uint8Array | string): LedgerEntryType {
  return decode(input, readLedgerEntryType)
}

const _LEDGER_ENTRY_TYPE_TO_JSON: Record<LedgerEntryType, string> = /*#__PURE__*/ {
  ACCOUNT: 'account',
  TRUSTLINE: 'trustline',
  OFFER: 'offer',
  DATA: 'data',
  CLAIMABLE_BALANCE: 'claimable_balance',
  LIQUIDITY_POOL: 'liquidity_pool',
  CONTRACT_DATA: 'contract_data',
  CONTRACT_CODE: 'contract_code',
  CONFIG_SETTING: 'config_setting',
  TTL: 'ttl',
}

const _LEDGER_ENTRY_TYPE_FROM_JSON: Record<string, LedgerEntryType> = /*#__PURE__*/ {
  'account': 'ACCOUNT',
  'trustline': 'TRUSTLINE',
  'offer': 'OFFER',
  'data': 'DATA',
  'claimable_balance': 'CLAIMABLE_BALANCE',
  'liquidity_pool': 'LIQUIDITY_POOL',
  'contract_data': 'CONTRACT_DATA',
  'contract_code': 'CONTRACT_CODE',
  'config_setting': 'CONFIG_SETTING',
  'ttl': 'TTL',
}

export function toJsonLedgerEntryType(v: LedgerEntryType): string {
  return _LEDGER_ENTRY_TYPE_TO_JSON[v]
}

export function fromJsonLedgerEntryType(json: unknown): LedgerEntryType {
  const result = _LEDGER_ENTRY_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown LedgerEntryType JSON value: ${json}`)
  return result
}

export interface Signer {
  readonly key: SignerKey
  readonly weight: uint32
}

export function readSigner(r: XdrReader): Signer {
  beginComposite(r)
  try {
    const key = readSignerKey(r)
    const weight = readuint32(r)
    return { key, weight }
  } finally {
    endComposite(r)
  }
}

export function writeSigner(w: XdrWriter, v: Signer): void {
  writeSignerKey(w, v.key)
  writeuint32(w, v.weight)
}

export function encodeSigner(v: Signer): Uint8Array {
  return encode(v, writeSigner)
}

export function decodeSigner(input: Uint8Array | string): Signer {
  return decode(input, readSigner)
}

export function toJsonSigner(v: Signer): Record<string, unknown> {
  return {
    'key': toJsonSignerKey(v.key),
    'weight': toJsonuint32(v.weight),
  }
}

export function fromJsonSigner(json: unknown): Signer {
  const o = json as Record<string, unknown>
  return {
    key: fromJsonSignerKey(o['key']),
    weight: fromJsonuint32(o['weight']),
  }
}

export type AccountFlags =
  | 'AUTH_REQUIRED_FLAG'
  | 'AUTH_REVOCABLE_FLAG'
  | 'AUTH_IMMUTABLE_FLAG'
  | 'AUTH_CLAWBACK_ENABLED_FLAG'

export const ACCOUNT_FLAGS_TO_INT: Record<AccountFlags, number> = /*#__PURE__*/ {
  AUTH_REQUIRED_FLAG: 1,
  AUTH_REVOCABLE_FLAG: 2,
  AUTH_IMMUTABLE_FLAG: 4,
  AUTH_CLAWBACK_ENABLED_FLAG: 8,
}

export const ACCOUNT_FLAGS_FROM_INT: Record<number, AccountFlags> = /*#__PURE__*/ {
  1: 'AUTH_REQUIRED_FLAG',
  2: 'AUTH_REVOCABLE_FLAG',
  4: 'AUTH_IMMUTABLE_FLAG',
  8: 'AUTH_CLAWBACK_ENABLED_FLAG',
}

export function readAccountFlags(r: XdrReader): AccountFlags {
  const v = readInt32(r)
  const result = ACCOUNT_FLAGS_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown AccountFlags value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeAccountFlags(w: XdrWriter, v: AccountFlags): void {
  writeInt32(w, ACCOUNT_FLAGS_TO_INT[v])
}

export function encodeAccountFlags(v: AccountFlags): Uint8Array {
  return encode(v, writeAccountFlags)
}

export function decodeAccountFlags(input: Uint8Array | string): AccountFlags {
  return decode(input, readAccountFlags)
}

const _ACCOUNT_FLAGS_TO_JSON: Record<AccountFlags, string> = /*#__PURE__*/ {
  AUTH_REQUIRED_FLAG: 'required_flag',
  AUTH_REVOCABLE_FLAG: 'revocable_flag',
  AUTH_IMMUTABLE_FLAG: 'immutable_flag',
  AUTH_CLAWBACK_ENABLED_FLAG: 'clawback_enabled_flag',
}

const _ACCOUNT_FLAGS_FROM_JSON: Record<string, AccountFlags> = /*#__PURE__*/ {
  'required_flag': 'AUTH_REQUIRED_FLAG',
  'revocable_flag': 'AUTH_REVOCABLE_FLAG',
  'immutable_flag': 'AUTH_IMMUTABLE_FLAG',
  'clawback_enabled_flag': 'AUTH_CLAWBACK_ENABLED_FLAG',
}

export function toJsonAccountFlags(v: AccountFlags): string {
  return _ACCOUNT_FLAGS_TO_JSON[v]
}

export function fromJsonAccountFlags(json: unknown): AccountFlags {
  const result = _ACCOUNT_FLAGS_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown AccountFlags JSON value: ${json}`)
  return result
}

/** mask for all valid flags */
export const MASK_ACCOUNT_FLAGS = 7


export const MASK_ACCOUNT_FLAGS_V17 = 15


/** maximum number of signers */
export const MAX_SIGNERS = 20


export type SponsorshipDescriptor = AccountID | undefined

export function readSponsorshipDescriptor(r: XdrReader): SponsorshipDescriptor {
  return readOptional(r, readAccountID)
}

export function writeSponsorshipDescriptor(w: XdrWriter, v: SponsorshipDescriptor): void {
  writeOptional(w, v, writeAccountID)
}

export function encodeSponsorshipDescriptor(v: SponsorshipDescriptor): Uint8Array {
  return encode(v, writeSponsorshipDescriptor)
}

export function decodeSponsorshipDescriptor(input: Uint8Array | string): SponsorshipDescriptor {
  return decode(input, readSponsorshipDescriptor)
}

export function toJsonSponsorshipDescriptor(v: SponsorshipDescriptor): unknown {
  return v !== undefined ? toJsonAccountID(v) : null
}

export function fromJsonSponsorshipDescriptor(json: unknown): SponsorshipDescriptor {
  return (json) != null ? fromJsonAccountID(json) : undefined
}

export interface AccountEntryExtensionV3 {
  /**
   * We can use this to add more fields, or because it is first, to
   * change AccountEntryExtensionV3 into a union.
   */
  readonly ext: ExtensionPoint
  /** Ledger number at which `seqNum` took on its present value. */
  readonly seqLedger: uint32
  /** Time at which `seqNum` took on its present value. */
  readonly seqTime: TimePoint
}

export function readAccountEntryExtensionV3(r: XdrReader): AccountEntryExtensionV3 {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const seqLedger = readuint32(r)
    const seqTime = readTimePoint(r)
    return { ext, seqLedger, seqTime }
  } finally {
    endComposite(r)
  }
}

export function writeAccountEntryExtensionV3(w: XdrWriter, v: AccountEntryExtensionV3): void {
  writeExtensionPoint(w, v.ext)
  writeuint32(w, v.seqLedger)
  writeTimePoint(w, v.seqTime)
}

export function encodeAccountEntryExtensionV3(v: AccountEntryExtensionV3): Uint8Array {
  return encode(v, writeAccountEntryExtensionV3)
}

export function decodeAccountEntryExtensionV3(input: Uint8Array | string): AccountEntryExtensionV3 {
  return decode(input, readAccountEntryExtensionV3)
}

export function toJsonAccountEntryExtensionV3(v: AccountEntryExtensionV3): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'seq_ledger': toJsonuint32(v.seqLedger),
    'seq_time': toJsonTimePoint(v.seqTime),
  }
}

export function fromJsonAccountEntryExtensionV3(json: unknown): AccountEntryExtensionV3 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    seqLedger: fromJsonuint32(o['seq_ledger']),
    seqTime: fromJsonTimePoint(o['seq_time']),
  }
}

export type AccountEntryExtensionV2_ext =
  | { readonly v: 0 }
  | { readonly v: 3; readonly v3: AccountEntryExtensionV3 }

export function readAccountEntryExtensionV2_ext(r: XdrReader): AccountEntryExtensionV2_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: AccountEntryExtensionV2_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 3:
        result = { v, v3: readAccountEntryExtensionV3(r) }; break
      default:
        throw new XdrReadError(`Unknown AccountEntryExtensionV2_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeAccountEntryExtensionV2_ext(w: XdrWriter, v: AccountEntryExtensionV2_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 3:
      writeAccountEntryExtensionV3(w, (v as any).v3); break
  }
}

export function encodeAccountEntryExtensionV2_ext(v: AccountEntryExtensionV2_ext): Uint8Array {
  return encode(v, writeAccountEntryExtensionV2_ext)
}

export function decodeAccountEntryExtensionV2_ext(input: Uint8Array | string): AccountEntryExtensionV2_ext {
  return decode(input, readAccountEntryExtensionV2_ext)
}

export function toJsonAccountEntryExtensionV2_ext(v: AccountEntryExtensionV2_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 3:
      return { 'v3': toJsonAccountEntryExtensionV3((v as any).v3) }
  }
}

export function fromJsonAccountEntryExtensionV2_ext(json: unknown): AccountEntryExtensionV2_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as AccountEntryExtensionV2_ext
    throw new Error(`Unknown AccountEntryExtensionV2_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v3':
      return { v: 3, v3: fromJsonAccountEntryExtensionV3(obj[key]) } as AccountEntryExtensionV2_ext
    default: throw new Error(`Unknown AccountEntryExtensionV2_ext variant: ${key}`)
  }
}

export interface AccountEntryExtensionV2 {
  readonly numSponsored: uint32
  readonly numSponsoring: uint32
  readonly signerSponsoringIDs: SponsorshipDescriptor[]
  readonly ext: AccountEntryExtensionV2_ext
}

export function readAccountEntryExtensionV2(r: XdrReader): AccountEntryExtensionV2 {
  beginComposite(r)
  try {
    const numSponsored = readuint32(r)
    const numSponsoring = readuint32(r)
    const signerSponsoringIDs = readVarArray(r, MAX_SIGNERS, readSponsorshipDescriptor)
    const ext = readAccountEntryExtensionV2_ext(r)
    return { numSponsored, numSponsoring, signerSponsoringIDs, ext }
  } finally {
    endComposite(r)
  }
}

export function writeAccountEntryExtensionV2(w: XdrWriter, v: AccountEntryExtensionV2): void {
  writeuint32(w, v.numSponsored)
  writeuint32(w, v.numSponsoring)
  writeVarArray(w, v.signerSponsoringIDs, MAX_SIGNERS, writeSponsorshipDescriptor)
  writeAccountEntryExtensionV2_ext(w, v.ext)
}

export function encodeAccountEntryExtensionV2(v: AccountEntryExtensionV2): Uint8Array {
  return encode(v, writeAccountEntryExtensionV2)
}

export function decodeAccountEntryExtensionV2(input: Uint8Array | string): AccountEntryExtensionV2 {
  return decode(input, readAccountEntryExtensionV2)
}

export function toJsonAccountEntryExtensionV2(v: AccountEntryExtensionV2): Record<string, unknown> {
  return {
    'num_sponsored': toJsonuint32(v.numSponsored),
    'num_sponsoring': toJsonuint32(v.numSponsoring),
    'signer_sponsoring_i_ds': v.signerSponsoringIDs.map((item: any) => toJsonSponsorshipDescriptor(item)),
    'ext': toJsonAccountEntryExtensionV2_ext(v.ext),
  }
}

export function fromJsonAccountEntryExtensionV2(json: unknown): AccountEntryExtensionV2 {
  const o = json as Record<string, unknown>
  return {
    numSponsored: fromJsonuint32(o['num_sponsored']),
    numSponsoring: fromJsonuint32(o['num_sponsoring']),
    signerSponsoringIDs: ((o['signer_sponsoring_i_ds']) as unknown[]).map((item: unknown) => fromJsonSponsorshipDescriptor(item)),
    ext: fromJsonAccountEntryExtensionV2_ext(o['ext']),
  }
}

export type AccountEntryExtensionV1_ext =
  | { readonly v: 0 }
  | { readonly v: 2; readonly v2: AccountEntryExtensionV2 }

export function readAccountEntryExtensionV1_ext(r: XdrReader): AccountEntryExtensionV1_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: AccountEntryExtensionV1_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 2:
        result = { v, v2: readAccountEntryExtensionV2(r) }; break
      default:
        throw new XdrReadError(`Unknown AccountEntryExtensionV1_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeAccountEntryExtensionV1_ext(w: XdrWriter, v: AccountEntryExtensionV1_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 2:
      writeAccountEntryExtensionV2(w, (v as any).v2); break
  }
}

export function encodeAccountEntryExtensionV1_ext(v: AccountEntryExtensionV1_ext): Uint8Array {
  return encode(v, writeAccountEntryExtensionV1_ext)
}

export function decodeAccountEntryExtensionV1_ext(input: Uint8Array | string): AccountEntryExtensionV1_ext {
  return decode(input, readAccountEntryExtensionV1_ext)
}

export function toJsonAccountEntryExtensionV1_ext(v: AccountEntryExtensionV1_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 2:
      return { 'v2': toJsonAccountEntryExtensionV2((v as any).v2) }
  }
}

export function fromJsonAccountEntryExtensionV1_ext(json: unknown): AccountEntryExtensionV1_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as AccountEntryExtensionV1_ext
    throw new Error(`Unknown AccountEntryExtensionV1_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v2':
      return { v: 2, v2: fromJsonAccountEntryExtensionV2(obj[key]) } as AccountEntryExtensionV1_ext
    default: throw new Error(`Unknown AccountEntryExtensionV1_ext variant: ${key}`)
  }
}

export interface AccountEntryExtensionV1 {
  readonly liabilities: Liabilities
  readonly ext: AccountEntryExtensionV1_ext
}

export function readAccountEntryExtensionV1(r: XdrReader): AccountEntryExtensionV1 {
  beginComposite(r)
  try {
    const liabilities = readLiabilities(r)
    const ext = readAccountEntryExtensionV1_ext(r)
    return { liabilities, ext }
  } finally {
    endComposite(r)
  }
}

export function writeAccountEntryExtensionV1(w: XdrWriter, v: AccountEntryExtensionV1): void {
  writeLiabilities(w, v.liabilities)
  writeAccountEntryExtensionV1_ext(w, v.ext)
}

export function encodeAccountEntryExtensionV1(v: AccountEntryExtensionV1): Uint8Array {
  return encode(v, writeAccountEntryExtensionV1)
}

export function decodeAccountEntryExtensionV1(input: Uint8Array | string): AccountEntryExtensionV1 {
  return decode(input, readAccountEntryExtensionV1)
}

export function toJsonAccountEntryExtensionV1(v: AccountEntryExtensionV1): Record<string, unknown> {
  return {
    'liabilities': toJsonLiabilities(v.liabilities),
    'ext': toJsonAccountEntryExtensionV1_ext(v.ext),
  }
}

export function fromJsonAccountEntryExtensionV1(json: unknown): AccountEntryExtensionV1 {
  const o = json as Record<string, unknown>
  return {
    liabilities: fromJsonLiabilities(o['liabilities']),
    ext: fromJsonAccountEntryExtensionV1_ext(o['ext']),
  }
}

export type AccountEntry_ext =
  | { readonly v: 0 }
  | { readonly v: 1; readonly v1: AccountEntryExtensionV1 }

export function readAccountEntry_ext(r: XdrReader): AccountEntry_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: AccountEntry_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, v1: readAccountEntryExtensionV1(r) }; break
      default:
        throw new XdrReadError(`Unknown AccountEntry_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeAccountEntry_ext(w: XdrWriter, v: AccountEntry_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeAccountEntryExtensionV1(w, (v as any).v1); break
  }
}

export function encodeAccountEntry_ext(v: AccountEntry_ext): Uint8Array {
  return encode(v, writeAccountEntry_ext)
}

export function decodeAccountEntry_ext(input: Uint8Array | string): AccountEntry_ext {
  return decode(input, readAccountEntry_ext)
}

export function toJsonAccountEntry_ext(v: AccountEntry_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonAccountEntryExtensionV1((v as any).v1) }
  }
}

export function fromJsonAccountEntry_ext(json: unknown): AccountEntry_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as AccountEntry_ext
    throw new Error(`Unknown AccountEntry_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, v1: fromJsonAccountEntryExtensionV1(obj[key]) } as AccountEntry_ext
    default: throw new Error(`Unknown AccountEntry_ext variant: ${key}`)
  }
}

/**
 * AccountEntry
 * 
 * Main entry representing a user in Stellar. All transactions are
 * performed using an account.
 * 
 * Other ledger entries created require an account.
 * 
 */
export interface AccountEntry {
  readonly accountID: AccountID
  /** master public key for this account */
  readonly balance: int64
  /** in stroops */
  readonly seqNum: SequenceNumber
  /** last sequence number used for this account */
  readonly numSubEntries: uint32
  /**
   * number of sub-entries this account has
   * drives the reserve
   */
  readonly inflationDest: AccountID | undefined
  /** Account to vote for during inflation */
  readonly flags: uint32
  readonly homeDomain: string32
  /**
   * fields used for signatures
   * thresholds stores unsigned bytes: [weight of master|low|medium|high]
   */
  readonly thresholds: Thresholds
  readonly signers: Signer[]
  /** reserved for future use */
  readonly ext: AccountEntry_ext
}

export function readAccountEntry(r: XdrReader): AccountEntry {
  beginComposite(r)
  try {
    const accountID = readAccountID(r)
    const balance = readint64(r)
    const seqNum = readSequenceNumber(r)
    const numSubEntries = readuint32(r)
    const inflationDest = readOptional(r, readAccountID)
    const flags = readuint32(r)
    const homeDomain = readstring32(r)
    const thresholds = readThresholds(r)
    const signers = readVarArray(r, MAX_SIGNERS, readSigner)
    const ext = readAccountEntry_ext(r)
    return { accountID, balance, seqNum, numSubEntries, inflationDest, flags, homeDomain, thresholds, signers, ext }
  } finally {
    endComposite(r)
  }
}

export function writeAccountEntry(w: XdrWriter, v: AccountEntry): void {
  writeAccountID(w, v.accountID)
  writeint64(w, v.balance)
  writeSequenceNumber(w, v.seqNum)
  writeuint32(w, v.numSubEntries)
  writeOptional(w, v.inflationDest, writeAccountID)
  writeuint32(w, v.flags)
  writestring32(w, v.homeDomain)
  writeThresholds(w, v.thresholds)
  writeVarArray(w, v.signers, MAX_SIGNERS, writeSigner)
  writeAccountEntry_ext(w, v.ext)
}

export function encodeAccountEntry(v: AccountEntry): Uint8Array {
  return encode(v, writeAccountEntry)
}

export function decodeAccountEntry(input: Uint8Array | string): AccountEntry {
  return decode(input, readAccountEntry)
}

export function toJsonAccountEntry(v: AccountEntry): Record<string, unknown> {
  return {
    'account_id': toJsonAccountID(v.accountID),
    'balance': toJsonint64(v.balance),
    'seq_num': toJsonSequenceNumber(v.seqNum),
    'num_sub_entries': toJsonuint32(v.numSubEntries),
    'inflation_dest': v.inflationDest !== undefined ? toJsonAccountID(v.inflationDest) : null,
    'flags': toJsonuint32(v.flags),
    'home_domain': toJsonstring32(v.homeDomain),
    'thresholds': toJsonThresholds(v.thresholds),
    'signers': v.signers.map((item: any) => toJsonSigner(item)),
    'ext': toJsonAccountEntry_ext(v.ext),
  }
}

export function fromJsonAccountEntry(json: unknown): AccountEntry {
  const o = json as Record<string, unknown>
  return {
    accountID: fromJsonAccountID(o['account_id']),
    balance: fromJsonint64(o['balance']),
    seqNum: fromJsonSequenceNumber(o['seq_num']),
    numSubEntries: fromJsonuint32(o['num_sub_entries']),
    inflationDest: (o['inflation_dest']) != null ? fromJsonAccountID(o['inflation_dest']) : undefined,
    flags: fromJsonuint32(o['flags']),
    homeDomain: fromJsonstring32(o['home_domain']),
    thresholds: fromJsonThresholds(o['thresholds']),
    signers: ((o['signers']) as unknown[]).map((item: unknown) => fromJsonSigner(item)),
    ext: fromJsonAccountEntry_ext(o['ext']),
  }
}

export type TrustLineFlags =
  | 'AUTHORIZED_FLAG'
  | 'AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG'
  | 'TRUSTLINE_CLAWBACK_ENABLED_FLAG'

export const TRUST_LINE_FLAGS_TO_INT: Record<TrustLineFlags, number> = /*#__PURE__*/ {
  AUTHORIZED_FLAG: 1,
  AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG: 2,
  TRUSTLINE_CLAWBACK_ENABLED_FLAG: 4,
}

export const TRUST_LINE_FLAGS_FROM_INT: Record<number, TrustLineFlags> = /*#__PURE__*/ {
  1: 'AUTHORIZED_FLAG',
  2: 'AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG',
  4: 'TRUSTLINE_CLAWBACK_ENABLED_FLAG',
}

export function readTrustLineFlags(r: XdrReader): TrustLineFlags {
  const v = readInt32(r)
  const result = TRUST_LINE_FLAGS_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown TrustLineFlags value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeTrustLineFlags(w: XdrWriter, v: TrustLineFlags): void {
  writeInt32(w, TRUST_LINE_FLAGS_TO_INT[v])
}

export function encodeTrustLineFlags(v: TrustLineFlags): Uint8Array {
  return encode(v, writeTrustLineFlags)
}

export function decodeTrustLineFlags(input: Uint8Array | string): TrustLineFlags {
  return decode(input, readTrustLineFlags)
}

const _TRUST_LINE_FLAGS_TO_JSON: Record<TrustLineFlags, string> = /*#__PURE__*/ {
  AUTHORIZED_FLAG: 'authorized_flag',
  AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG: 'authorized_to_maintain_liabilities_flag',
  TRUSTLINE_CLAWBACK_ENABLED_FLAG: 'trustline_clawback_enabled_flag',
}

const _TRUST_LINE_FLAGS_FROM_JSON: Record<string, TrustLineFlags> = /*#__PURE__*/ {
  'authorized_flag': 'AUTHORIZED_FLAG',
  'authorized_to_maintain_liabilities_flag': 'AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG',
  'trustline_clawback_enabled_flag': 'TRUSTLINE_CLAWBACK_ENABLED_FLAG',
}

export function toJsonTrustLineFlags(v: TrustLineFlags): string {
  return _TRUST_LINE_FLAGS_TO_JSON[v]
}

export function fromJsonTrustLineFlags(json: unknown): TrustLineFlags {
  const result = _TRUST_LINE_FLAGS_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown TrustLineFlags JSON value: ${json}`)
  return result
}

/** mask for all trustline flags */
export const MASK_TRUSTLINE_FLAGS = 1


export const MASK_TRUSTLINE_FLAGS_V13 = 3


export const MASK_TRUSTLINE_FLAGS_V17 = 7


export type LiquidityPoolType =
  | 'LIQUIDITY_POOL_CONSTANT_PRODUCT'

export const LIQUIDITY_POOL_TYPE_TO_INT: Record<LiquidityPoolType, number> = /*#__PURE__*/ {
  LIQUIDITY_POOL_CONSTANT_PRODUCT: 0,
}

export const LIQUIDITY_POOL_TYPE_FROM_INT: Record<number, LiquidityPoolType> = /*#__PURE__*/ {
  0: 'LIQUIDITY_POOL_CONSTANT_PRODUCT',
}

export function readLiquidityPoolType(r: XdrReader): LiquidityPoolType {
  const v = readInt32(r)
  const result = LIQUIDITY_POOL_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown LiquidityPoolType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeLiquidityPoolType(w: XdrWriter, v: LiquidityPoolType): void {
  writeInt32(w, LIQUIDITY_POOL_TYPE_TO_INT[v])
}

export function encodeLiquidityPoolType(v: LiquidityPoolType): Uint8Array {
  return encode(v, writeLiquidityPoolType)
}

export function decodeLiquidityPoolType(input: Uint8Array | string): LiquidityPoolType {
  return decode(input, readLiquidityPoolType)
}

const _LIQUIDITY_POOL_TYPE_TO_JSON: Record<LiquidityPoolType, string> = /*#__PURE__*/ {
  LIQUIDITY_POOL_CONSTANT_PRODUCT: 'liquidity_pool_constant_product',
}

const _LIQUIDITY_POOL_TYPE_FROM_JSON: Record<string, LiquidityPoolType> = /*#__PURE__*/ {
  'liquidity_pool_constant_product': 'LIQUIDITY_POOL_CONSTANT_PRODUCT',
}

export function toJsonLiquidityPoolType(v: LiquidityPoolType): string {
  return _LIQUIDITY_POOL_TYPE_TO_JSON[v]
}

export function fromJsonLiquidityPoolType(json: unknown): LiquidityPoolType {
  const result = _LIQUIDITY_POOL_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown LiquidityPoolType JSON value: ${json}`)
  return result
}

export type TrustLineAsset =
  | { readonly type: 'ASSET_TYPE_NATIVE' }
  | { readonly type: 'ASSET_TYPE_CREDIT_ALPHANUM4'; readonly alphaNum4: AlphaNum4 }
  | { readonly type: 'ASSET_TYPE_CREDIT_ALPHANUM12'; readonly alphaNum12: AlphaNum12 }
  | { readonly type: 'ASSET_TYPE_POOL_SHARE'; readonly liquidityPoolID: PoolID }

export function readTrustLineAsset(r: XdrReader): TrustLineAsset {
  beginComposite(r)
  try {
    const type = readAssetType(r)
    let result: TrustLineAsset
    switch (type) {
      case 'ASSET_TYPE_NATIVE':
        result = { type }; break
      case 'ASSET_TYPE_CREDIT_ALPHANUM4':
        result = { type, alphaNum4: readAlphaNum4(r) }; break
      case 'ASSET_TYPE_CREDIT_ALPHANUM12':
        result = { type, alphaNum12: readAlphaNum12(r) }; break
      case 'ASSET_TYPE_POOL_SHARE':
        result = { type, liquidityPoolID: readPoolID(r) }; break
      default:
        throw new XdrReadError(`Unknown TrustLineAsset discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTrustLineAsset(w: XdrWriter, v: TrustLineAsset): void {
  writeAssetType(w, v.type)
  switch (v.type) {
    case 'ASSET_TYPE_NATIVE':
      break
    case 'ASSET_TYPE_CREDIT_ALPHANUM4':
      writeAlphaNum4(w, (v as any).alphaNum4); break
    case 'ASSET_TYPE_CREDIT_ALPHANUM12':
      writeAlphaNum12(w, (v as any).alphaNum12); break
    case 'ASSET_TYPE_POOL_SHARE':
      writePoolID(w, (v as any).liquidityPoolID); break
  }
}

export function encodeTrustLineAsset(v: TrustLineAsset): Uint8Array {
  return encode(v, writeTrustLineAsset)
}

export function decodeTrustLineAsset(input: Uint8Array | string): TrustLineAsset {
  return decode(input, readTrustLineAsset)
}

export function toJsonTrustLineAsset(v: TrustLineAsset): unknown {
  switch (v.type) {
    case 'ASSET_TYPE_NATIVE':
      return 'native'
    case 'ASSET_TYPE_CREDIT_ALPHANUM4':
      return { 'credit_alphanum4': toJsonAlphaNum4((v as any).alphaNum4) }
    case 'ASSET_TYPE_CREDIT_ALPHANUM12':
      return { 'credit_alphanum12': toJsonAlphaNum12((v as any).alphaNum12) }
    case 'ASSET_TYPE_POOL_SHARE':
      return { 'pool_share': toJsonPoolID((v as any).liquidityPoolID) }
  }
}

export function fromJsonTrustLineAsset(json: unknown): TrustLineAsset {
  if (typeof json === 'string') {
    if (json === 'native') return { type: 'ASSET_TYPE_NATIVE' } as TrustLineAsset
    throw new Error(`Unknown TrustLineAsset variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'credit_alphanum4':
      return { type: 'ASSET_TYPE_CREDIT_ALPHANUM4', alphaNum4: fromJsonAlphaNum4(obj[key]) } as TrustLineAsset
    case 'credit_alphanum12':
      return { type: 'ASSET_TYPE_CREDIT_ALPHANUM12', alphaNum12: fromJsonAlphaNum12(obj[key]) } as TrustLineAsset
    case 'pool_share':
      return { type: 'ASSET_TYPE_POOL_SHARE', liquidityPoolID: fromJsonPoolID(obj[key]) } as TrustLineAsset
    default: throw new Error(`Unknown TrustLineAsset variant: ${key}`)
  }
}

export type TrustLineEntryExtensionV2_ext =
  | { readonly v: 0 }

export function readTrustLineEntryExtensionV2_ext(r: XdrReader): TrustLineEntryExtensionV2_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: TrustLineEntryExtensionV2_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown TrustLineEntryExtensionV2_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTrustLineEntryExtensionV2_ext(w: XdrWriter, v: TrustLineEntryExtensionV2_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeTrustLineEntryExtensionV2_ext(v: TrustLineEntryExtensionV2_ext): Uint8Array {
  return encode(v, writeTrustLineEntryExtensionV2_ext)
}

export function decodeTrustLineEntryExtensionV2_ext(input: Uint8Array | string): TrustLineEntryExtensionV2_ext {
  return decode(input, readTrustLineEntryExtensionV2_ext)
}

export function toJsonTrustLineEntryExtensionV2_ext(v: TrustLineEntryExtensionV2_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonTrustLineEntryExtensionV2_ext(json: unknown): TrustLineEntryExtensionV2_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as TrustLineEntryExtensionV2_ext
    throw new Error(`Unknown TrustLineEntryExtensionV2_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown TrustLineEntryExtensionV2_ext variant: ${key}`)
  }
}

export interface TrustLineEntryExtensionV2 {
  readonly liquidityPoolUseCount: int32
  readonly ext: TrustLineEntryExtensionV2_ext
}

export function readTrustLineEntryExtensionV2(r: XdrReader): TrustLineEntryExtensionV2 {
  beginComposite(r)
  try {
    const liquidityPoolUseCount = readint32(r)
    const ext = readTrustLineEntryExtensionV2_ext(r)
    return { liquidityPoolUseCount, ext }
  } finally {
    endComposite(r)
  }
}

export function writeTrustLineEntryExtensionV2(w: XdrWriter, v: TrustLineEntryExtensionV2): void {
  writeint32(w, v.liquidityPoolUseCount)
  writeTrustLineEntryExtensionV2_ext(w, v.ext)
}

export function encodeTrustLineEntryExtensionV2(v: TrustLineEntryExtensionV2): Uint8Array {
  return encode(v, writeTrustLineEntryExtensionV2)
}

export function decodeTrustLineEntryExtensionV2(input: Uint8Array | string): TrustLineEntryExtensionV2 {
  return decode(input, readTrustLineEntryExtensionV2)
}

export function toJsonTrustLineEntryExtensionV2(v: TrustLineEntryExtensionV2): Record<string, unknown> {
  return {
    'liquidity_pool_use_count': toJsonint32(v.liquidityPoolUseCount),
    'ext': toJsonTrustLineEntryExtensionV2_ext(v.ext),
  }
}

export function fromJsonTrustLineEntryExtensionV2(json: unknown): TrustLineEntryExtensionV2 {
  const o = json as Record<string, unknown>
  return {
    liquidityPoolUseCount: fromJsonint32(o['liquidity_pool_use_count']),
    ext: fromJsonTrustLineEntryExtensionV2_ext(o['ext']),
  }
}

export type ext =
  | { readonly v: 0 }
  | { readonly v: 2; readonly v2: TrustLineEntryExtensionV2 }

export function readext(r: XdrReader): ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: ext
    switch (v) {
      case 0:
        result = { v }; break
      case 2:
        result = { v, v2: readTrustLineEntryExtensionV2(r) }; break
      default:
        throw new XdrReadError(`Unknown ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeext(w: XdrWriter, v: ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 2:
      writeTrustLineEntryExtensionV2(w, (v as any).v2); break
  }
}

export function encodeext(v: ext): Uint8Array {
  return encode(v, writeext)
}

export function decodeext(input: Uint8Array | string): ext {
  return decode(input, readext)
}

export function toJsonext(v: ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 2:
      return { 'v2': toJsonTrustLineEntryExtensionV2((v as any).v2) }
  }
}

export function fromJsonext(json: unknown): ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as ext
    throw new Error(`Unknown ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v2':
      return { v: 2, v2: fromJsonTrustLineEntryExtensionV2(obj[key]) } as ext
    default: throw new Error(`Unknown ext variant: ${key}`)
  }
}

export interface TrustLineEntry_v1 {
  readonly liabilities: Liabilities
  readonly ext: ext
}

export function readTrustLineEntry_v1(r: XdrReader): TrustLineEntry_v1 {
  beginComposite(r)
  try {
    const liabilities = readLiabilities(r)
    const ext = readext(r)
    return { liabilities, ext }
  } finally {
    endComposite(r)
  }
}

export function writeTrustLineEntry_v1(w: XdrWriter, v: TrustLineEntry_v1): void {
  writeLiabilities(w, v.liabilities)
  writeext(w, v.ext)
}

export function encodeTrustLineEntry_v1(v: TrustLineEntry_v1): Uint8Array {
  return encode(v, writeTrustLineEntry_v1)
}

export function decodeTrustLineEntry_v1(input: Uint8Array | string): TrustLineEntry_v1 {
  return decode(input, readTrustLineEntry_v1)
}

export function toJsonTrustLineEntry_v1(v: TrustLineEntry_v1): Record<string, unknown> {
  return {
    'liabilities': toJsonLiabilities(v.liabilities),
    'ext': toJsonext(v.ext),
  }
}

export function fromJsonTrustLineEntry_v1(json: unknown): TrustLineEntry_v1 {
  const o = json as Record<string, unknown>
  return {
    liabilities: fromJsonLiabilities(o['liabilities']),
    ext: fromJsonext(o['ext']),
  }
}

export type TrustLineEntry_ext =
  | { readonly v: 0 }
  | { readonly v: 1; readonly v1: TrustLineEntry_v1 }

export function readTrustLineEntry_ext(r: XdrReader): TrustLineEntry_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: TrustLineEntry_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, v1: readTrustLineEntry_v1(r) }; break
      default:
        throw new XdrReadError(`Unknown TrustLineEntry_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTrustLineEntry_ext(w: XdrWriter, v: TrustLineEntry_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeTrustLineEntry_v1(w, (v as any).v1); break
  }
}

export function encodeTrustLineEntry_ext(v: TrustLineEntry_ext): Uint8Array {
  return encode(v, writeTrustLineEntry_ext)
}

export function decodeTrustLineEntry_ext(input: Uint8Array | string): TrustLineEntry_ext {
  return decode(input, readTrustLineEntry_ext)
}

export function toJsonTrustLineEntry_ext(v: TrustLineEntry_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonTrustLineEntry_v1((v as any).v1) }
  }
}

export function fromJsonTrustLineEntry_ext(json: unknown): TrustLineEntry_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as TrustLineEntry_ext
    throw new Error(`Unknown TrustLineEntry_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, v1: fromJsonTrustLineEntry_v1(obj[key]) } as TrustLineEntry_ext
    default: throw new Error(`Unknown TrustLineEntry_ext variant: ${key}`)
  }
}

export interface TrustLineEntry {
  readonly accountID: AccountID
  /** account this trustline belongs to */
  readonly asset: TrustLineAsset
  /** type of asset (with issuer) */
  readonly balance: int64
  readonly limit: int64
  /** balance cannot be above this */
  readonly flags: uint32
  /** reserved for future use */
  readonly ext: TrustLineEntry_ext
}

export function readTrustLineEntry(r: XdrReader): TrustLineEntry {
  beginComposite(r)
  try {
    const accountID = readAccountID(r)
    const asset = readTrustLineAsset(r)
    const balance = readint64(r)
    const limit = readint64(r)
    const flags = readuint32(r)
    const ext = readTrustLineEntry_ext(r)
    return { accountID, asset, balance, limit, flags, ext }
  } finally {
    endComposite(r)
  }
}

export function writeTrustLineEntry(w: XdrWriter, v: TrustLineEntry): void {
  writeAccountID(w, v.accountID)
  writeTrustLineAsset(w, v.asset)
  writeint64(w, v.balance)
  writeint64(w, v.limit)
  writeuint32(w, v.flags)
  writeTrustLineEntry_ext(w, v.ext)
}

export function encodeTrustLineEntry(v: TrustLineEntry): Uint8Array {
  return encode(v, writeTrustLineEntry)
}

export function decodeTrustLineEntry(input: Uint8Array | string): TrustLineEntry {
  return decode(input, readTrustLineEntry)
}

export function toJsonTrustLineEntry(v: TrustLineEntry): Record<string, unknown> {
  return {
    'account_id': toJsonAccountID(v.accountID),
    'asset': toJsonTrustLineAsset(v.asset),
    'balance': toJsonint64(v.balance),
    'limit': toJsonint64(v.limit),
    'flags': toJsonuint32(v.flags),
    'ext': toJsonTrustLineEntry_ext(v.ext),
  }
}

export function fromJsonTrustLineEntry(json: unknown): TrustLineEntry {
  const o = json as Record<string, unknown>
  return {
    accountID: fromJsonAccountID(o['account_id']),
    asset: fromJsonTrustLineAsset(o['asset']),
    balance: fromJsonint64(o['balance']),
    limit: fromJsonint64(o['limit']),
    flags: fromJsonuint32(o['flags']),
    ext: fromJsonTrustLineEntry_ext(o['ext']),
  }
}

export type OfferEntryFlags =
  | 'PASSIVE_FLAG'

export const OFFER_ENTRY_FLAGS_TO_INT: Record<OfferEntryFlags, number> = /*#__PURE__*/ {
  PASSIVE_FLAG: 1,
}

export const OFFER_ENTRY_FLAGS_FROM_INT: Record<number, OfferEntryFlags> = /*#__PURE__*/ {
  1: 'PASSIVE_FLAG',
}

export function readOfferEntryFlags(r: XdrReader): OfferEntryFlags {
  const v = readInt32(r)
  const result = OFFER_ENTRY_FLAGS_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown OfferEntryFlags value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeOfferEntryFlags(w: XdrWriter, v: OfferEntryFlags): void {
  writeInt32(w, OFFER_ENTRY_FLAGS_TO_INT[v])
}

export function encodeOfferEntryFlags(v: OfferEntryFlags): Uint8Array {
  return encode(v, writeOfferEntryFlags)
}

export function decodeOfferEntryFlags(input: Uint8Array | string): OfferEntryFlags {
  return decode(input, readOfferEntryFlags)
}

const _OFFER_ENTRY_FLAGS_TO_JSON: Record<OfferEntryFlags, string> = /*#__PURE__*/ {
  PASSIVE_FLAG: 'passive_flag',
}

const _OFFER_ENTRY_FLAGS_FROM_JSON: Record<string, OfferEntryFlags> = /*#__PURE__*/ {
  'passive_flag': 'PASSIVE_FLAG',
}

export function toJsonOfferEntryFlags(v: OfferEntryFlags): string {
  return _OFFER_ENTRY_FLAGS_TO_JSON[v]
}

export function fromJsonOfferEntryFlags(json: unknown): OfferEntryFlags {
  const result = _OFFER_ENTRY_FLAGS_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown OfferEntryFlags JSON value: ${json}`)
  return result
}

/** Mask for OfferEntry flags */
export const MASK_OFFERENTRY_FLAGS = 1


export type OfferEntry_ext =
  | { readonly v: 0 }

export function readOfferEntry_ext(r: XdrReader): OfferEntry_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: OfferEntry_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown OfferEntry_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeOfferEntry_ext(w: XdrWriter, v: OfferEntry_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeOfferEntry_ext(v: OfferEntry_ext): Uint8Array {
  return encode(v, writeOfferEntry_ext)
}

export function decodeOfferEntry_ext(input: Uint8Array | string): OfferEntry_ext {
  return decode(input, readOfferEntry_ext)
}

export function toJsonOfferEntry_ext(v: OfferEntry_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonOfferEntry_ext(json: unknown): OfferEntry_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as OfferEntry_ext
    throw new Error(`Unknown OfferEntry_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown OfferEntry_ext variant: ${key}`)
  }
}

/**
 * OfferEntry
 * An offer is the building block of the offer book, they are automatically
 * claimed by payments when the price set by the owner is met.
 * 
 * For example an Offer is selling 10A where 1A is priced at 1.5B
 * 
 */
export interface OfferEntry {
  readonly sellerID: AccountID
  readonly offerID: int64
  readonly selling: Asset
  /** A */
  readonly buying: Asset
  /** B */
  readonly amount: int64
  /**
   * price for this offer:
   * price of A in terms of B
   * price=AmountB/AmountA=priceNumerator/priceDenominator
   * price is after fees
   */
  readonly price: Price
  readonly flags: uint32
  /** reserved for future use */
  readonly ext: OfferEntry_ext
}

export function readOfferEntry(r: XdrReader): OfferEntry {
  beginComposite(r)
  try {
    const sellerID = readAccountID(r)
    const offerID = readint64(r)
    const selling = readAsset(r)
    const buying = readAsset(r)
    const amount = readint64(r)
    const price = readPrice(r)
    const flags = readuint32(r)
    const ext = readOfferEntry_ext(r)
    return { sellerID, offerID, selling, buying, amount, price, flags, ext }
  } finally {
    endComposite(r)
  }
}

export function writeOfferEntry(w: XdrWriter, v: OfferEntry): void {
  writeAccountID(w, v.sellerID)
  writeint64(w, v.offerID)
  writeAsset(w, v.selling)
  writeAsset(w, v.buying)
  writeint64(w, v.amount)
  writePrice(w, v.price)
  writeuint32(w, v.flags)
  writeOfferEntry_ext(w, v.ext)
}

export function encodeOfferEntry(v: OfferEntry): Uint8Array {
  return encode(v, writeOfferEntry)
}

export function decodeOfferEntry(input: Uint8Array | string): OfferEntry {
  return decode(input, readOfferEntry)
}

export function toJsonOfferEntry(v: OfferEntry): Record<string, unknown> {
  return {
    'seller_id': toJsonAccountID(v.sellerID),
    'offer_id': toJsonint64(v.offerID),
    'selling': toJsonAsset(v.selling),
    'buying': toJsonAsset(v.buying),
    'amount': toJsonint64(v.amount),
    'price': toJsonPrice(v.price),
    'flags': toJsonuint32(v.flags),
    'ext': toJsonOfferEntry_ext(v.ext),
  }
}

export function fromJsonOfferEntry(json: unknown): OfferEntry {
  const o = json as Record<string, unknown>
  return {
    sellerID: fromJsonAccountID(o['seller_id']),
    offerID: fromJsonint64(o['offer_id']),
    selling: fromJsonAsset(o['selling']),
    buying: fromJsonAsset(o['buying']),
    amount: fromJsonint64(o['amount']),
    price: fromJsonPrice(o['price']),
    flags: fromJsonuint32(o['flags']),
    ext: fromJsonOfferEntry_ext(o['ext']),
  }
}

export type DataEntry_ext =
  | { readonly v: 0 }

export function readDataEntry_ext(r: XdrReader): DataEntry_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: DataEntry_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown DataEntry_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeDataEntry_ext(w: XdrWriter, v: DataEntry_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeDataEntry_ext(v: DataEntry_ext): Uint8Array {
  return encode(v, writeDataEntry_ext)
}

export function decodeDataEntry_ext(input: Uint8Array | string): DataEntry_ext {
  return decode(input, readDataEntry_ext)
}

export function toJsonDataEntry_ext(v: DataEntry_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonDataEntry_ext(json: unknown): DataEntry_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as DataEntry_ext
    throw new Error(`Unknown DataEntry_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown DataEntry_ext variant: ${key}`)
  }
}

/**
 * DataEntry
 * Data can be attached to accounts.
 */
export interface DataEntry {
  readonly accountID: AccountID
  /** account this data belongs to */
  readonly dataName: string64
  readonly dataValue: DataValue
  /** reserved for future use */
  readonly ext: DataEntry_ext
}

export function readDataEntry(r: XdrReader): DataEntry {
  beginComposite(r)
  try {
    const accountID = readAccountID(r)
    const dataName = readstring64(r)
    const dataValue = readDataValue(r)
    const ext = readDataEntry_ext(r)
    return { accountID, dataName, dataValue, ext }
  } finally {
    endComposite(r)
  }
}

export function writeDataEntry(w: XdrWriter, v: DataEntry): void {
  writeAccountID(w, v.accountID)
  writestring64(w, v.dataName)
  writeDataValue(w, v.dataValue)
  writeDataEntry_ext(w, v.ext)
}

export function encodeDataEntry(v: DataEntry): Uint8Array {
  return encode(v, writeDataEntry)
}

export function decodeDataEntry(input: Uint8Array | string): DataEntry {
  return decode(input, readDataEntry)
}

export function toJsonDataEntry(v: DataEntry): Record<string, unknown> {
  return {
    'account_id': toJsonAccountID(v.accountID),
    'data_name': toJsonstring64(v.dataName),
    'data_value': toJsonDataValue(v.dataValue),
    'ext': toJsonDataEntry_ext(v.ext),
  }
}

export function fromJsonDataEntry(json: unknown): DataEntry {
  const o = json as Record<string, unknown>
  return {
    accountID: fromJsonAccountID(o['account_id']),
    dataName: fromJsonstring64(o['data_name']),
    dataValue: fromJsonDataValue(o['data_value']),
    ext: fromJsonDataEntry_ext(o['ext']),
  }
}

export type ClaimPredicateType =
  | 'CLAIM_PREDICATE_UNCONDITIONAL'
  | 'CLAIM_PREDICATE_AND'
  | 'CLAIM_PREDICATE_OR'
  | 'CLAIM_PREDICATE_NOT'
  | 'CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME'
  | 'CLAIM_PREDICATE_BEFORE_RELATIVE_TIME'

export const CLAIM_PREDICATE_TYPE_TO_INT: Record<ClaimPredicateType, number> = /*#__PURE__*/ {
  CLAIM_PREDICATE_UNCONDITIONAL: 0,
  CLAIM_PREDICATE_AND: 1,
  CLAIM_PREDICATE_OR: 2,
  CLAIM_PREDICATE_NOT: 3,
  CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME: 4,
  CLAIM_PREDICATE_BEFORE_RELATIVE_TIME: 5,
}

export const CLAIM_PREDICATE_TYPE_FROM_INT: Record<number, ClaimPredicateType> = /*#__PURE__*/ {
  0: 'CLAIM_PREDICATE_UNCONDITIONAL',
  1: 'CLAIM_PREDICATE_AND',
  2: 'CLAIM_PREDICATE_OR',
  3: 'CLAIM_PREDICATE_NOT',
  4: 'CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME',
  5: 'CLAIM_PREDICATE_BEFORE_RELATIVE_TIME',
}

export function readClaimPredicateType(r: XdrReader): ClaimPredicateType {
  const v = readInt32(r)
  const result = CLAIM_PREDICATE_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ClaimPredicateType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeClaimPredicateType(w: XdrWriter, v: ClaimPredicateType): void {
  writeInt32(w, CLAIM_PREDICATE_TYPE_TO_INT[v])
}

export function encodeClaimPredicateType(v: ClaimPredicateType): Uint8Array {
  return encode(v, writeClaimPredicateType)
}

export function decodeClaimPredicateType(input: Uint8Array | string): ClaimPredicateType {
  return decode(input, readClaimPredicateType)
}

const _CLAIM_PREDICATE_TYPE_TO_JSON: Record<ClaimPredicateType, string> = /*#__PURE__*/ {
  CLAIM_PREDICATE_UNCONDITIONAL: 'unconditional',
  CLAIM_PREDICATE_AND: 'and',
  CLAIM_PREDICATE_OR: 'or',
  CLAIM_PREDICATE_NOT: 'not',
  CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME: 'before_absolute_time',
  CLAIM_PREDICATE_BEFORE_RELATIVE_TIME: 'before_relative_time',
}

const _CLAIM_PREDICATE_TYPE_FROM_JSON: Record<string, ClaimPredicateType> = /*#__PURE__*/ {
  'unconditional': 'CLAIM_PREDICATE_UNCONDITIONAL',
  'and': 'CLAIM_PREDICATE_AND',
  'or': 'CLAIM_PREDICATE_OR',
  'not': 'CLAIM_PREDICATE_NOT',
  'before_absolute_time': 'CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME',
  'before_relative_time': 'CLAIM_PREDICATE_BEFORE_RELATIVE_TIME',
}

export function toJsonClaimPredicateType(v: ClaimPredicateType): string {
  return _CLAIM_PREDICATE_TYPE_TO_JSON[v]
}

export function fromJsonClaimPredicateType(json: unknown): ClaimPredicateType {
  const result = _CLAIM_PREDICATE_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ClaimPredicateType JSON value: ${json}`)
  return result
}

export type ClaimPredicate =
  | { readonly type: 'CLAIM_PREDICATE_UNCONDITIONAL' }
  | { readonly type: 'CLAIM_PREDICATE_AND'; readonly andPredicates: ClaimPredicate[] }
  | { readonly type: 'CLAIM_PREDICATE_OR'; readonly orPredicates: ClaimPredicate[] }
  | { readonly type: 'CLAIM_PREDICATE_NOT'; readonly notPredicate: ClaimPredicate | undefined }
  | { readonly type: 'CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME'; readonly absBefore: int64 }
  | { readonly type: 'CLAIM_PREDICATE_BEFORE_RELATIVE_TIME'; readonly relBefore: int64 }

export function readClaimPredicate(r: XdrReader): ClaimPredicate {
  beginComposite(r)
  try {
    const type = readClaimPredicateType(r)
    let result: ClaimPredicate
    switch (type) {
      case 'CLAIM_PREDICATE_UNCONDITIONAL':
        result = { type }; break
      case 'CLAIM_PREDICATE_AND':
        result = { type, andPredicates: readVarArray(r, 2, readClaimPredicate) }; break
      case 'CLAIM_PREDICATE_OR':
        result = { type, orPredicates: readVarArray(r, 2, readClaimPredicate) }; break
      case 'CLAIM_PREDICATE_NOT':
        result = { type, notPredicate: readOptional(r, readClaimPredicate) }; break
      case 'CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME':
        result = { type, absBefore: readint64(r) }; break
      case 'CLAIM_PREDICATE_BEFORE_RELATIVE_TIME':
        result = { type, relBefore: readint64(r) }; break
      default:
        throw new XdrReadError(`Unknown ClaimPredicate discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeClaimPredicate(w: XdrWriter, v: ClaimPredicate): void {
  writeClaimPredicateType(w, v.type)
  switch (v.type) {
    case 'CLAIM_PREDICATE_UNCONDITIONAL':
      break
    case 'CLAIM_PREDICATE_AND':
      writeVarArray(w, (v as any).andPredicates, 2, writeClaimPredicate); break
    case 'CLAIM_PREDICATE_OR':
      writeVarArray(w, (v as any).orPredicates, 2, writeClaimPredicate); break
    case 'CLAIM_PREDICATE_NOT':
      writeOptional(w, (v as any).notPredicate, writeClaimPredicate); break
    case 'CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME':
      writeint64(w, (v as any).absBefore); break
    case 'CLAIM_PREDICATE_BEFORE_RELATIVE_TIME':
      writeint64(w, (v as any).relBefore); break
  }
}

export function encodeClaimPredicate(v: ClaimPredicate): Uint8Array {
  return encode(v, writeClaimPredicate)
}

export function decodeClaimPredicate(input: Uint8Array | string): ClaimPredicate {
  return decode(input, readClaimPredicate)
}

export function toJsonClaimPredicate(v: ClaimPredicate): unknown {
  switch (v.type) {
    case 'CLAIM_PREDICATE_UNCONDITIONAL':
      return 'unconditional'
    case 'CLAIM_PREDICATE_AND':
      return { 'and': (v as any).andPredicates.map((item: any) => toJsonClaimPredicate(item)) }
    case 'CLAIM_PREDICATE_OR':
      return { 'or': (v as any).orPredicates.map((item: any) => toJsonClaimPredicate(item)) }
    case 'CLAIM_PREDICATE_NOT':
      return { 'not': (v as any).notPredicate !== undefined ? toJsonClaimPredicate((v as any).notPredicate) : null }
    case 'CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME':
      return { 'before_absolute_time': toJsonint64((v as any).absBefore) }
    case 'CLAIM_PREDICATE_BEFORE_RELATIVE_TIME':
      return { 'before_relative_time': toJsonint64((v as any).relBefore) }
  }
}

export function fromJsonClaimPredicate(json: unknown): ClaimPredicate {
  if (typeof json === 'string') {
    if (json === 'unconditional') return { type: 'CLAIM_PREDICATE_UNCONDITIONAL' } as ClaimPredicate
    throw new Error(`Unknown ClaimPredicate variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'and':
      return { type: 'CLAIM_PREDICATE_AND', andPredicates: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonClaimPredicate(item)) } as ClaimPredicate
    case 'or':
      return { type: 'CLAIM_PREDICATE_OR', orPredicates: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonClaimPredicate(item)) } as ClaimPredicate
    case 'not':
      return { type: 'CLAIM_PREDICATE_NOT', notPredicate: (obj[key]) != null ? fromJsonClaimPredicate(obj[key]) : undefined } as ClaimPredicate
    case 'before_absolute_time':
      return { type: 'CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME', absBefore: fromJsonint64(obj[key]) } as ClaimPredicate
    case 'before_relative_time':
      return { type: 'CLAIM_PREDICATE_BEFORE_RELATIVE_TIME', relBefore: fromJsonint64(obj[key]) } as ClaimPredicate
    default: throw new Error(`Unknown ClaimPredicate variant: ${key}`)
  }
}

export type ClaimantType =
  | 'CLAIMANT_TYPE_V0'

export const CLAIMANT_TYPE_TO_INT: Record<ClaimantType, number> = /*#__PURE__*/ {
  CLAIMANT_TYPE_V0: 0,
}

export const CLAIMANT_TYPE_FROM_INT: Record<number, ClaimantType> = /*#__PURE__*/ {
  0: 'CLAIMANT_TYPE_V0',
}

export function readClaimantType(r: XdrReader): ClaimantType {
  const v = readInt32(r)
  const result = CLAIMANT_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ClaimantType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeClaimantType(w: XdrWriter, v: ClaimantType): void {
  writeInt32(w, CLAIMANT_TYPE_TO_INT[v])
}

export function encodeClaimantType(v: ClaimantType): Uint8Array {
  return encode(v, writeClaimantType)
}

export function decodeClaimantType(input: Uint8Array | string): ClaimantType {
  return decode(input, readClaimantType)
}

const _CLAIMANT_TYPE_TO_JSON: Record<ClaimantType, string> = /*#__PURE__*/ {
  CLAIMANT_TYPE_V0: 'claimant_type_v0',
}

const _CLAIMANT_TYPE_FROM_JSON: Record<string, ClaimantType> = /*#__PURE__*/ {
  'claimant_type_v0': 'CLAIMANT_TYPE_V0',
}

export function toJsonClaimantType(v: ClaimantType): string {
  return _CLAIMANT_TYPE_TO_JSON[v]
}

export function fromJsonClaimantType(json: unknown): ClaimantType {
  const result = _CLAIMANT_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ClaimantType JSON value: ${json}`)
  return result
}

export interface Claimant_v0 {
  readonly destination: AccountID
  readonly predicate: ClaimPredicate
}

export function readClaimant_v0(r: XdrReader): Claimant_v0 {
  beginComposite(r)
  try {
    const destination = readAccountID(r)
    const predicate = readClaimPredicate(r)
    return { destination, predicate }
  } finally {
    endComposite(r)
  }
}

export function writeClaimant_v0(w: XdrWriter, v: Claimant_v0): void {
  writeAccountID(w, v.destination)
  writeClaimPredicate(w, v.predicate)
}

export function encodeClaimant_v0(v: Claimant_v0): Uint8Array {
  return encode(v, writeClaimant_v0)
}

export function decodeClaimant_v0(input: Uint8Array | string): Claimant_v0 {
  return decode(input, readClaimant_v0)
}

export function toJsonClaimant_v0(v: Claimant_v0): Record<string, unknown> {
  return {
    'destination': toJsonAccountID(v.destination),
    'predicate': toJsonClaimPredicate(v.predicate),
  }
}

export function fromJsonClaimant_v0(json: unknown): Claimant_v0 {
  const o = json as Record<string, unknown>
  return {
    destination: fromJsonAccountID(o['destination']),
    predicate: fromJsonClaimPredicate(o['predicate']),
  }
}

export type Claimant =
  | { readonly type: 'CLAIMANT_TYPE_V0'; readonly v0: Claimant_v0 }

export function readClaimant(r: XdrReader): Claimant {
  beginComposite(r)
  try {
    const type = readClaimantType(r)
    let result: Claimant
    switch (type) {
      case 'CLAIMANT_TYPE_V0':
        result = { type, v0: readClaimant_v0(r) }; break
      default:
        throw new XdrReadError(`Unknown Claimant discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeClaimant(w: XdrWriter, v: Claimant): void {
  writeClaimantType(w, v.type)
  switch (v.type) {
    case 'CLAIMANT_TYPE_V0':
      writeClaimant_v0(w, (v as any).v0); break
  }
}

export function encodeClaimant(v: Claimant): Uint8Array {
  return encode(v, writeClaimant)
}

export function decodeClaimant(input: Uint8Array | string): Claimant {
  return decode(input, readClaimant)
}

export function toJsonClaimant(v: Claimant): unknown {
  switch (v.type) {
    case 'CLAIMANT_TYPE_V0':
      return { 'claimant_type_v0': toJsonClaimant_v0((v as any).v0) }
  }
}

export function fromJsonClaimant(json: unknown): Claimant {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for Claimant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'claimant_type_v0':
      return { type: 'CLAIMANT_TYPE_V0', v0: fromJsonClaimant_v0(obj[key]) } as Claimant
    default: throw new Error(`Unknown Claimant variant: ${key}`)
  }
}

export type ClaimableBalanceFlags =
  | 'CLAIMABLE_BALANCE_CLAWBACK_ENABLED_FLAG'

export const CLAIMABLE_BALANCE_FLAGS_TO_INT: Record<ClaimableBalanceFlags, number> = /*#__PURE__*/ {
  CLAIMABLE_BALANCE_CLAWBACK_ENABLED_FLAG: 1,
}

export const CLAIMABLE_BALANCE_FLAGS_FROM_INT: Record<number, ClaimableBalanceFlags> = /*#__PURE__*/ {
  1: 'CLAIMABLE_BALANCE_CLAWBACK_ENABLED_FLAG',
}

export function readClaimableBalanceFlags(r: XdrReader): ClaimableBalanceFlags {
  const v = readInt32(r)
  const result = CLAIMABLE_BALANCE_FLAGS_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ClaimableBalanceFlags value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeClaimableBalanceFlags(w: XdrWriter, v: ClaimableBalanceFlags): void {
  writeInt32(w, CLAIMABLE_BALANCE_FLAGS_TO_INT[v])
}

export function encodeClaimableBalanceFlags(v: ClaimableBalanceFlags): Uint8Array {
  return encode(v, writeClaimableBalanceFlags)
}

export function decodeClaimableBalanceFlags(input: Uint8Array | string): ClaimableBalanceFlags {
  return decode(input, readClaimableBalanceFlags)
}

const _CLAIMABLE_BALANCE_FLAGS_TO_JSON: Record<ClaimableBalanceFlags, string> = /*#__PURE__*/ {
  CLAIMABLE_BALANCE_CLAWBACK_ENABLED_FLAG: 'claimable_balance_clawback_enabled_flag',
}

const _CLAIMABLE_BALANCE_FLAGS_FROM_JSON: Record<string, ClaimableBalanceFlags> = /*#__PURE__*/ {
  'claimable_balance_clawback_enabled_flag': 'CLAIMABLE_BALANCE_CLAWBACK_ENABLED_FLAG',
}

export function toJsonClaimableBalanceFlags(v: ClaimableBalanceFlags): string {
  return _CLAIMABLE_BALANCE_FLAGS_TO_JSON[v]
}

export function fromJsonClaimableBalanceFlags(json: unknown): ClaimableBalanceFlags {
  const result = _CLAIMABLE_BALANCE_FLAGS_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ClaimableBalanceFlags JSON value: ${json}`)
  return result
}

export const MASK_CLAIMABLE_BALANCE_FLAGS = 1


export type ClaimableBalanceEntryExtensionV1_ext =
  | { readonly v: 0 }

export function readClaimableBalanceEntryExtensionV1_ext(r: XdrReader): ClaimableBalanceEntryExtensionV1_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: ClaimableBalanceEntryExtensionV1_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown ClaimableBalanceEntryExtensionV1_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeClaimableBalanceEntryExtensionV1_ext(w: XdrWriter, v: ClaimableBalanceEntryExtensionV1_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeClaimableBalanceEntryExtensionV1_ext(v: ClaimableBalanceEntryExtensionV1_ext): Uint8Array {
  return encode(v, writeClaimableBalanceEntryExtensionV1_ext)
}

export function decodeClaimableBalanceEntryExtensionV1_ext(input: Uint8Array | string): ClaimableBalanceEntryExtensionV1_ext {
  return decode(input, readClaimableBalanceEntryExtensionV1_ext)
}

export function toJsonClaimableBalanceEntryExtensionV1_ext(v: ClaimableBalanceEntryExtensionV1_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonClaimableBalanceEntryExtensionV1_ext(json: unknown): ClaimableBalanceEntryExtensionV1_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as ClaimableBalanceEntryExtensionV1_ext
    throw new Error(`Unknown ClaimableBalanceEntryExtensionV1_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown ClaimableBalanceEntryExtensionV1_ext variant: ${key}`)
  }
}

export interface ClaimableBalanceEntryExtensionV1 {
  readonly ext: ClaimableBalanceEntryExtensionV1_ext
  readonly flags: uint32
}

export function readClaimableBalanceEntryExtensionV1(r: XdrReader): ClaimableBalanceEntryExtensionV1 {
  beginComposite(r)
  try {
    const ext = readClaimableBalanceEntryExtensionV1_ext(r)
    const flags = readuint32(r)
    return { ext, flags }
  } finally {
    endComposite(r)
  }
}

export function writeClaimableBalanceEntryExtensionV1(w: XdrWriter, v: ClaimableBalanceEntryExtensionV1): void {
  writeClaimableBalanceEntryExtensionV1_ext(w, v.ext)
  writeuint32(w, v.flags)
}

export function encodeClaimableBalanceEntryExtensionV1(v: ClaimableBalanceEntryExtensionV1): Uint8Array {
  return encode(v, writeClaimableBalanceEntryExtensionV1)
}

export function decodeClaimableBalanceEntryExtensionV1(input: Uint8Array | string): ClaimableBalanceEntryExtensionV1 {
  return decode(input, readClaimableBalanceEntryExtensionV1)
}

export function toJsonClaimableBalanceEntryExtensionV1(v: ClaimableBalanceEntryExtensionV1): Record<string, unknown> {
  return {
    'ext': toJsonClaimableBalanceEntryExtensionV1_ext(v.ext),
    'flags': toJsonuint32(v.flags),
  }
}

export function fromJsonClaimableBalanceEntryExtensionV1(json: unknown): ClaimableBalanceEntryExtensionV1 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonClaimableBalanceEntryExtensionV1_ext(o['ext']),
    flags: fromJsonuint32(o['flags']),
  }
}

export type ClaimableBalanceEntry_ext =
  | { readonly v: 0 }
  | { readonly v: 1; readonly v1: ClaimableBalanceEntryExtensionV1 }

export function readClaimableBalanceEntry_ext(r: XdrReader): ClaimableBalanceEntry_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: ClaimableBalanceEntry_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, v1: readClaimableBalanceEntryExtensionV1(r) }; break
      default:
        throw new XdrReadError(`Unknown ClaimableBalanceEntry_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeClaimableBalanceEntry_ext(w: XdrWriter, v: ClaimableBalanceEntry_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeClaimableBalanceEntryExtensionV1(w, (v as any).v1); break
  }
}

export function encodeClaimableBalanceEntry_ext(v: ClaimableBalanceEntry_ext): Uint8Array {
  return encode(v, writeClaimableBalanceEntry_ext)
}

export function decodeClaimableBalanceEntry_ext(input: Uint8Array | string): ClaimableBalanceEntry_ext {
  return decode(input, readClaimableBalanceEntry_ext)
}

export function toJsonClaimableBalanceEntry_ext(v: ClaimableBalanceEntry_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonClaimableBalanceEntryExtensionV1((v as any).v1) }
  }
}

export function fromJsonClaimableBalanceEntry_ext(json: unknown): ClaimableBalanceEntry_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as ClaimableBalanceEntry_ext
    throw new Error(`Unknown ClaimableBalanceEntry_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, v1: fromJsonClaimableBalanceEntryExtensionV1(obj[key]) } as ClaimableBalanceEntry_ext
    default: throw new Error(`Unknown ClaimableBalanceEntry_ext variant: ${key}`)
  }
}

export interface ClaimableBalanceEntry {
  /** Unique identifier for this ClaimableBalanceEntry */
  readonly balanceID: ClaimableBalanceID
  /** List of claimants with associated predicate */
  readonly claimants: Claimant[]
  /** Any asset including native */
  readonly asset: Asset
  /** Amount of asset */
  readonly amount: int64
  /** reserved for future use */
  readonly ext: ClaimableBalanceEntry_ext
}

export function readClaimableBalanceEntry(r: XdrReader): ClaimableBalanceEntry {
  beginComposite(r)
  try {
    const balanceID = readClaimableBalanceID(r)
    const claimants = readVarArray(r, 10, readClaimant)
    const asset = readAsset(r)
    const amount = readint64(r)
    const ext = readClaimableBalanceEntry_ext(r)
    return { balanceID, claimants, asset, amount, ext }
  } finally {
    endComposite(r)
  }
}

export function writeClaimableBalanceEntry(w: XdrWriter, v: ClaimableBalanceEntry): void {
  writeClaimableBalanceID(w, v.balanceID)
  writeVarArray(w, v.claimants, 10, writeClaimant)
  writeAsset(w, v.asset)
  writeint64(w, v.amount)
  writeClaimableBalanceEntry_ext(w, v.ext)
}

export function encodeClaimableBalanceEntry(v: ClaimableBalanceEntry): Uint8Array {
  return encode(v, writeClaimableBalanceEntry)
}

export function decodeClaimableBalanceEntry(input: Uint8Array | string): ClaimableBalanceEntry {
  return decode(input, readClaimableBalanceEntry)
}

export function toJsonClaimableBalanceEntry(v: ClaimableBalanceEntry): Record<string, unknown> {
  return {
    'balance_id': toJsonClaimableBalanceID(v.balanceID),
    'claimants': v.claimants.map((item: any) => toJsonClaimant(item)),
    'asset': toJsonAsset(v.asset),
    'amount': toJsonint64(v.amount),
    'ext': toJsonClaimableBalanceEntry_ext(v.ext),
  }
}

export function fromJsonClaimableBalanceEntry(json: unknown): ClaimableBalanceEntry {
  const o = json as Record<string, unknown>
  return {
    balanceID: fromJsonClaimableBalanceID(o['balance_id']),
    claimants: ((o['claimants']) as unknown[]).map((item: unknown) => fromJsonClaimant(item)),
    asset: fromJsonAsset(o['asset']),
    amount: fromJsonint64(o['amount']),
    ext: fromJsonClaimableBalanceEntry_ext(o['ext']),
  }
}

export interface LiquidityPoolConstantProductParameters {
  readonly assetA: Asset
  /** assetA < assetB */
  readonly assetB: Asset
  readonly fee: int32
}

export function readLiquidityPoolConstantProductParameters(r: XdrReader): LiquidityPoolConstantProductParameters {
  beginComposite(r)
  try {
    const assetA = readAsset(r)
    const assetB = readAsset(r)
    const fee = readint32(r)
    return { assetA, assetB, fee }
  } finally {
    endComposite(r)
  }
}

export function writeLiquidityPoolConstantProductParameters(w: XdrWriter, v: LiquidityPoolConstantProductParameters): void {
  writeAsset(w, v.assetA)
  writeAsset(w, v.assetB)
  writeint32(w, v.fee)
}

export function encodeLiquidityPoolConstantProductParameters(v: LiquidityPoolConstantProductParameters): Uint8Array {
  return encode(v, writeLiquidityPoolConstantProductParameters)
}

export function decodeLiquidityPoolConstantProductParameters(input: Uint8Array | string): LiquidityPoolConstantProductParameters {
  return decode(input, readLiquidityPoolConstantProductParameters)
}

export function toJsonLiquidityPoolConstantProductParameters(v: LiquidityPoolConstantProductParameters): Record<string, unknown> {
  return {
    'asset_a': toJsonAsset(v.assetA),
    'asset_b': toJsonAsset(v.assetB),
    'fee': toJsonint32(v.fee),
  }
}

export function fromJsonLiquidityPoolConstantProductParameters(json: unknown): LiquidityPoolConstantProductParameters {
  const o = json as Record<string, unknown>
  return {
    assetA: fromJsonAsset(o['asset_a']),
    assetB: fromJsonAsset(o['asset_b']),
    fee: fromJsonint32(o['fee']),
  }
}

export interface LiquidityPoolEntry_constantProduct {
  readonly params: LiquidityPoolConstantProductParameters
  readonly reserveA: int64
  readonly reserveB: int64
  readonly totalPoolShares: int64
  readonly poolSharesTrustLineCount: int64
}

export function readLiquidityPoolEntry_constantProduct(r: XdrReader): LiquidityPoolEntry_constantProduct {
  beginComposite(r)
  try {
    const params = readLiquidityPoolConstantProductParameters(r)
    const reserveA = readint64(r)
    const reserveB = readint64(r)
    const totalPoolShares = readint64(r)
    const poolSharesTrustLineCount = readint64(r)
    return { params, reserveA, reserveB, totalPoolShares, poolSharesTrustLineCount }
  } finally {
    endComposite(r)
  }
}

export function writeLiquidityPoolEntry_constantProduct(w: XdrWriter, v: LiquidityPoolEntry_constantProduct): void {
  writeLiquidityPoolConstantProductParameters(w, v.params)
  writeint64(w, v.reserveA)
  writeint64(w, v.reserveB)
  writeint64(w, v.totalPoolShares)
  writeint64(w, v.poolSharesTrustLineCount)
}

export function encodeLiquidityPoolEntry_constantProduct(v: LiquidityPoolEntry_constantProduct): Uint8Array {
  return encode(v, writeLiquidityPoolEntry_constantProduct)
}

export function decodeLiquidityPoolEntry_constantProduct(input: Uint8Array | string): LiquidityPoolEntry_constantProduct {
  return decode(input, readLiquidityPoolEntry_constantProduct)
}

export function toJsonLiquidityPoolEntry_constantProduct(v: LiquidityPoolEntry_constantProduct): Record<string, unknown> {
  return {
    'params': toJsonLiquidityPoolConstantProductParameters(v.params),
    'reserve_a': toJsonint64(v.reserveA),
    'reserve_b': toJsonint64(v.reserveB),
    'total_pool_shares': toJsonint64(v.totalPoolShares),
    'pool_shares_trust_line_count': toJsonint64(v.poolSharesTrustLineCount),
  }
}

export function fromJsonLiquidityPoolEntry_constantProduct(json: unknown): LiquidityPoolEntry_constantProduct {
  const o = json as Record<string, unknown>
  return {
    params: fromJsonLiquidityPoolConstantProductParameters(o['params']),
    reserveA: fromJsonint64(o['reserve_a']),
    reserveB: fromJsonint64(o['reserve_b']),
    totalPoolShares: fromJsonint64(o['total_pool_shares']),
    poolSharesTrustLineCount: fromJsonint64(o['pool_shares_trust_line_count']),
  }
}

export type LiquidityPoolEntry_body =
  | { readonly type: 'LIQUIDITY_POOL_CONSTANT_PRODUCT'; readonly constantProduct: LiquidityPoolEntry_constantProduct }

export function readLiquidityPoolEntry_body(r: XdrReader): LiquidityPoolEntry_body {
  beginComposite(r)
  try {
    const type = readLiquidityPoolType(r)
    let result: LiquidityPoolEntry_body
    switch (type) {
      case 'LIQUIDITY_POOL_CONSTANT_PRODUCT':
        result = { type, constantProduct: readLiquidityPoolEntry_constantProduct(r) }; break
      default:
        throw new XdrReadError(`Unknown LiquidityPoolEntry_body discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLiquidityPoolEntry_body(w: XdrWriter, v: LiquidityPoolEntry_body): void {
  writeLiquidityPoolType(w, v.type)
  switch (v.type) {
    case 'LIQUIDITY_POOL_CONSTANT_PRODUCT':
      writeLiquidityPoolEntry_constantProduct(w, (v as any).constantProduct); break
  }
}

export function encodeLiquidityPoolEntry_body(v: LiquidityPoolEntry_body): Uint8Array {
  return encode(v, writeLiquidityPoolEntry_body)
}

export function decodeLiquidityPoolEntry_body(input: Uint8Array | string): LiquidityPoolEntry_body {
  return decode(input, readLiquidityPoolEntry_body)
}

export function toJsonLiquidityPoolEntry_body(v: LiquidityPoolEntry_body): unknown {
  switch (v.type) {
    case 'LIQUIDITY_POOL_CONSTANT_PRODUCT':
      return { 'liquidity_pool_constant_product': toJsonLiquidityPoolEntry_constantProduct((v as any).constantProduct) }
  }
}

export function fromJsonLiquidityPoolEntry_body(json: unknown): LiquidityPoolEntry_body {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for LiquidityPoolEntry_body: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'liquidity_pool_constant_product':
      return { type: 'LIQUIDITY_POOL_CONSTANT_PRODUCT', constantProduct: fromJsonLiquidityPoolEntry_constantProduct(obj[key]) } as LiquidityPoolEntry_body
    default: throw new Error(`Unknown LiquidityPoolEntry_body variant: ${key}`)
  }
}

export interface LiquidityPoolEntry {
  readonly liquidityPoolID: PoolID
  readonly body: LiquidityPoolEntry_body
}

export function readLiquidityPoolEntry(r: XdrReader): LiquidityPoolEntry {
  beginComposite(r)
  try {
    const liquidityPoolID = readPoolID(r)
    const body = readLiquidityPoolEntry_body(r)
    return { liquidityPoolID, body }
  } finally {
    endComposite(r)
  }
}

export function writeLiquidityPoolEntry(w: XdrWriter, v: LiquidityPoolEntry): void {
  writePoolID(w, v.liquidityPoolID)
  writeLiquidityPoolEntry_body(w, v.body)
}

export function encodeLiquidityPoolEntry(v: LiquidityPoolEntry): Uint8Array {
  return encode(v, writeLiquidityPoolEntry)
}

export function decodeLiquidityPoolEntry(input: Uint8Array | string): LiquidityPoolEntry {
  return decode(input, readLiquidityPoolEntry)
}

export function toJsonLiquidityPoolEntry(v: LiquidityPoolEntry): Record<string, unknown> {
  return {
    'liquidity_pool_id': toJsonPoolID(v.liquidityPoolID),
    'body': toJsonLiquidityPoolEntry_body(v.body),
  }
}

export function fromJsonLiquidityPoolEntry(json: unknown): LiquidityPoolEntry {
  const o = json as Record<string, unknown>
  return {
    liquidityPoolID: fromJsonPoolID(o['liquidity_pool_id']),
    body: fromJsonLiquidityPoolEntry_body(o['body']),
  }
}

export type ContractDataDurability =
  | 'TEMPORARY'
  | 'PERSISTENT'

export const CONTRACT_DATA_DURABILITY_TO_INT: Record<ContractDataDurability, number> = /*#__PURE__*/ {
  TEMPORARY: 0,
  PERSISTENT: 1,
}

export const CONTRACT_DATA_DURABILITY_FROM_INT: Record<number, ContractDataDurability> = /*#__PURE__*/ {
  0: 'TEMPORARY',
  1: 'PERSISTENT',
}

export function readContractDataDurability(r: XdrReader): ContractDataDurability {
  const v = readInt32(r)
  const result = CONTRACT_DATA_DURABILITY_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ContractDataDurability value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeContractDataDurability(w: XdrWriter, v: ContractDataDurability): void {
  writeInt32(w, CONTRACT_DATA_DURABILITY_TO_INT[v])
}

export function encodeContractDataDurability(v: ContractDataDurability): Uint8Array {
  return encode(v, writeContractDataDurability)
}

export function decodeContractDataDurability(input: Uint8Array | string): ContractDataDurability {
  return decode(input, readContractDataDurability)
}

const _CONTRACT_DATA_DURABILITY_TO_JSON: Record<ContractDataDurability, string> = /*#__PURE__*/ {
  TEMPORARY: 'temporary',
  PERSISTENT: 'persistent',
}

const _CONTRACT_DATA_DURABILITY_FROM_JSON: Record<string, ContractDataDurability> = /*#__PURE__*/ {
  'temporary': 'TEMPORARY',
  'persistent': 'PERSISTENT',
}

export function toJsonContractDataDurability(v: ContractDataDurability): string {
  return _CONTRACT_DATA_DURABILITY_TO_JSON[v]
}

export function fromJsonContractDataDurability(json: unknown): ContractDataDurability {
  const result = _CONTRACT_DATA_DURABILITY_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ContractDataDurability JSON value: ${json}`)
  return result
}

export interface ContractDataEntry {
  readonly ext: ExtensionPoint
  readonly contract: SCAddress
  readonly key: SCVal
  readonly durability: ContractDataDurability
  readonly val: SCVal
}

export function readContractDataEntry(r: XdrReader): ContractDataEntry {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const contract = readSCAddress(r)
    const key = readSCVal(r)
    const durability = readContractDataDurability(r)
    const val = readSCVal(r)
    return { ext, contract, key, durability, val }
  } finally {
    endComposite(r)
  }
}

export function writeContractDataEntry(w: XdrWriter, v: ContractDataEntry): void {
  writeExtensionPoint(w, v.ext)
  writeSCAddress(w, v.contract)
  writeSCVal(w, v.key)
  writeContractDataDurability(w, v.durability)
  writeSCVal(w, v.val)
}

export function encodeContractDataEntry(v: ContractDataEntry): Uint8Array {
  return encode(v, writeContractDataEntry)
}

export function decodeContractDataEntry(input: Uint8Array | string): ContractDataEntry {
  return decode(input, readContractDataEntry)
}

export function toJsonContractDataEntry(v: ContractDataEntry): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'contract': toJsonSCAddress(v.contract),
    'key': toJsonSCVal(v.key),
    'durability': toJsonContractDataDurability(v.durability),
    'val': toJsonSCVal(v.val),
  }
}

export function fromJsonContractDataEntry(json: unknown): ContractDataEntry {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    contract: fromJsonSCAddress(o['contract']),
    key: fromJsonSCVal(o['key']),
    durability: fromJsonContractDataDurability(o['durability']),
    val: fromJsonSCVal(o['val']),
  }
}

export interface ContractCodeCostInputs {
  readonly ext: ExtensionPoint
  readonly nInstructions: uint32
  readonly nFunctions: uint32
  readonly nGlobals: uint32
  readonly nTableEntries: uint32
  readonly nTypes: uint32
  readonly nDataSegments: uint32
  readonly nElemSegments: uint32
  readonly nImports: uint32
  readonly nExports: uint32
  readonly nDataSegmentBytes: uint32
}

export function readContractCodeCostInputs(r: XdrReader): ContractCodeCostInputs {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const nInstructions = readuint32(r)
    const nFunctions = readuint32(r)
    const nGlobals = readuint32(r)
    const nTableEntries = readuint32(r)
    const nTypes = readuint32(r)
    const nDataSegments = readuint32(r)
    const nElemSegments = readuint32(r)
    const nImports = readuint32(r)
    const nExports = readuint32(r)
    const nDataSegmentBytes = readuint32(r)
    return { ext, nInstructions, nFunctions, nGlobals, nTableEntries, nTypes, nDataSegments, nElemSegments, nImports, nExports, nDataSegmentBytes }
  } finally {
    endComposite(r)
  }
}

export function writeContractCodeCostInputs(w: XdrWriter, v: ContractCodeCostInputs): void {
  writeExtensionPoint(w, v.ext)
  writeuint32(w, v.nInstructions)
  writeuint32(w, v.nFunctions)
  writeuint32(w, v.nGlobals)
  writeuint32(w, v.nTableEntries)
  writeuint32(w, v.nTypes)
  writeuint32(w, v.nDataSegments)
  writeuint32(w, v.nElemSegments)
  writeuint32(w, v.nImports)
  writeuint32(w, v.nExports)
  writeuint32(w, v.nDataSegmentBytes)
}

export function encodeContractCodeCostInputs(v: ContractCodeCostInputs): Uint8Array {
  return encode(v, writeContractCodeCostInputs)
}

export function decodeContractCodeCostInputs(input: Uint8Array | string): ContractCodeCostInputs {
  return decode(input, readContractCodeCostInputs)
}

export function toJsonContractCodeCostInputs(v: ContractCodeCostInputs): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'n_instructions': toJsonuint32(v.nInstructions),
    'n_functions': toJsonuint32(v.nFunctions),
    'n_globals': toJsonuint32(v.nGlobals),
    'n_table_entries': toJsonuint32(v.nTableEntries),
    'n_types': toJsonuint32(v.nTypes),
    'n_data_segments': toJsonuint32(v.nDataSegments),
    'n_elem_segments': toJsonuint32(v.nElemSegments),
    'n_imports': toJsonuint32(v.nImports),
    'n_exports': toJsonuint32(v.nExports),
    'n_data_segment_bytes': toJsonuint32(v.nDataSegmentBytes),
  }
}

export function fromJsonContractCodeCostInputs(json: unknown): ContractCodeCostInputs {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    nInstructions: fromJsonuint32(o['n_instructions']),
    nFunctions: fromJsonuint32(o['n_functions']),
    nGlobals: fromJsonuint32(o['n_globals']),
    nTableEntries: fromJsonuint32(o['n_table_entries']),
    nTypes: fromJsonuint32(o['n_types']),
    nDataSegments: fromJsonuint32(o['n_data_segments']),
    nElemSegments: fromJsonuint32(o['n_elem_segments']),
    nImports: fromJsonuint32(o['n_imports']),
    nExports: fromJsonuint32(o['n_exports']),
    nDataSegmentBytes: fromJsonuint32(o['n_data_segment_bytes']),
  }
}

export interface ContractCodeEntry_v1 {
  readonly ext: ExtensionPoint
  readonly costInputs: ContractCodeCostInputs
}

export function readContractCodeEntry_v1(r: XdrReader): ContractCodeEntry_v1 {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const costInputs = readContractCodeCostInputs(r)
    return { ext, costInputs }
  } finally {
    endComposite(r)
  }
}

export function writeContractCodeEntry_v1(w: XdrWriter, v: ContractCodeEntry_v1): void {
  writeExtensionPoint(w, v.ext)
  writeContractCodeCostInputs(w, v.costInputs)
}

export function encodeContractCodeEntry_v1(v: ContractCodeEntry_v1): Uint8Array {
  return encode(v, writeContractCodeEntry_v1)
}

export function decodeContractCodeEntry_v1(input: Uint8Array | string): ContractCodeEntry_v1 {
  return decode(input, readContractCodeEntry_v1)
}

export function toJsonContractCodeEntry_v1(v: ContractCodeEntry_v1): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'cost_inputs': toJsonContractCodeCostInputs(v.costInputs),
  }
}

export function fromJsonContractCodeEntry_v1(json: unknown): ContractCodeEntry_v1 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    costInputs: fromJsonContractCodeCostInputs(o['cost_inputs']),
  }
}

export type ContractCodeEntry_ext =
  | { readonly v: 0 }
  | { readonly v: 1; readonly v1: ContractCodeEntry_v1 }

export function readContractCodeEntry_ext(r: XdrReader): ContractCodeEntry_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: ContractCodeEntry_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, v1: readContractCodeEntry_v1(r) }; break
      default:
        throw new XdrReadError(`Unknown ContractCodeEntry_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeContractCodeEntry_ext(w: XdrWriter, v: ContractCodeEntry_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeContractCodeEntry_v1(w, (v as any).v1); break
  }
}

export function encodeContractCodeEntry_ext(v: ContractCodeEntry_ext): Uint8Array {
  return encode(v, writeContractCodeEntry_ext)
}

export function decodeContractCodeEntry_ext(input: Uint8Array | string): ContractCodeEntry_ext {
  return decode(input, readContractCodeEntry_ext)
}

export function toJsonContractCodeEntry_ext(v: ContractCodeEntry_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonContractCodeEntry_v1((v as any).v1) }
  }
}

export function fromJsonContractCodeEntry_ext(json: unknown): ContractCodeEntry_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as ContractCodeEntry_ext
    throw new Error(`Unknown ContractCodeEntry_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, v1: fromJsonContractCodeEntry_v1(obj[key]) } as ContractCodeEntry_ext
    default: throw new Error(`Unknown ContractCodeEntry_ext variant: ${key}`)
  }
}

export interface ContractCodeEntry {
  readonly ext: ContractCodeEntry_ext
  readonly hash: Hash
  readonly code: Uint8Array
}

export function readContractCodeEntry(r: XdrReader): ContractCodeEntry {
  beginComposite(r)
  try {
    const ext = readContractCodeEntry_ext(r)
    const hash = readHash(r)
    const code = readVarOpaque(r, UINT32_MAX)
    return { ext, hash, code }
  } finally {
    endComposite(r)
  }
}

export function writeContractCodeEntry(w: XdrWriter, v: ContractCodeEntry): void {
  writeContractCodeEntry_ext(w, v.ext)
  writeHash(w, v.hash)
  writeVarOpaque(w, v.code, UINT32_MAX)
}

export function encodeContractCodeEntry(v: ContractCodeEntry): Uint8Array {
  return encode(v, writeContractCodeEntry)
}

export function decodeContractCodeEntry(input: Uint8Array | string): ContractCodeEntry {
  return decode(input, readContractCodeEntry)
}

export function toJsonContractCodeEntry(v: ContractCodeEntry): Record<string, unknown> {
  return {
    'ext': toJsonContractCodeEntry_ext(v.ext),
    'hash': toJsonHash(v.hash),
    'code': bytesToHex(v.code),
  }
}

export function fromJsonContractCodeEntry(json: unknown): ContractCodeEntry {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonContractCodeEntry_ext(o['ext']),
    hash: fromJsonHash(o['hash']),
    code: hexToBytes((o['code']) as string),
  }
}

export interface TTLEntry {
  /** Hash of the LedgerKey that is associated with this TTLEntry */
  readonly keyHash: Hash
  readonly liveUntilLedgerSeq: uint32
}

export function readTTLEntry(r: XdrReader): TTLEntry {
  beginComposite(r)
  try {
    const keyHash = readHash(r)
    const liveUntilLedgerSeq = readuint32(r)
    return { keyHash, liveUntilLedgerSeq }
  } finally {
    endComposite(r)
  }
}

export function writeTTLEntry(w: XdrWriter, v: TTLEntry): void {
  writeHash(w, v.keyHash)
  writeuint32(w, v.liveUntilLedgerSeq)
}

export function encodeTTLEntry(v: TTLEntry): Uint8Array {
  return encode(v, writeTTLEntry)
}

export function decodeTTLEntry(input: Uint8Array | string): TTLEntry {
  return decode(input, readTTLEntry)
}

export function toJsonTTLEntry(v: TTLEntry): Record<string, unknown> {
  return {
    'key_hash': toJsonHash(v.keyHash),
    'live_until_ledger_seq': toJsonuint32(v.liveUntilLedgerSeq),
  }
}

export function fromJsonTTLEntry(json: unknown): TTLEntry {
  const o = json as Record<string, unknown>
  return {
    keyHash: fromJsonHash(o['key_hash']),
    liveUntilLedgerSeq: fromJsonuint32(o['live_until_ledger_seq']),
  }
}

export type LedgerEntryExtensionV1_ext =
  | { readonly v: 0 }

export function readLedgerEntryExtensionV1_ext(r: XdrReader): LedgerEntryExtensionV1_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: LedgerEntryExtensionV1_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown LedgerEntryExtensionV1_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerEntryExtensionV1_ext(w: XdrWriter, v: LedgerEntryExtensionV1_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeLedgerEntryExtensionV1_ext(v: LedgerEntryExtensionV1_ext): Uint8Array {
  return encode(v, writeLedgerEntryExtensionV1_ext)
}

export function decodeLedgerEntryExtensionV1_ext(input: Uint8Array | string): LedgerEntryExtensionV1_ext {
  return decode(input, readLedgerEntryExtensionV1_ext)
}

export function toJsonLedgerEntryExtensionV1_ext(v: LedgerEntryExtensionV1_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonLedgerEntryExtensionV1_ext(json: unknown): LedgerEntryExtensionV1_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as LedgerEntryExtensionV1_ext
    throw new Error(`Unknown LedgerEntryExtensionV1_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown LedgerEntryExtensionV1_ext variant: ${key}`)
  }
}

export interface LedgerEntryExtensionV1 {
  readonly sponsoringID: SponsorshipDescriptor
  readonly ext: LedgerEntryExtensionV1_ext
}

export function readLedgerEntryExtensionV1(r: XdrReader): LedgerEntryExtensionV1 {
  beginComposite(r)
  try {
    const sponsoringID = readSponsorshipDescriptor(r)
    const ext = readLedgerEntryExtensionV1_ext(r)
    return { sponsoringID, ext }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerEntryExtensionV1(w: XdrWriter, v: LedgerEntryExtensionV1): void {
  writeSponsorshipDescriptor(w, v.sponsoringID)
  writeLedgerEntryExtensionV1_ext(w, v.ext)
}

export function encodeLedgerEntryExtensionV1(v: LedgerEntryExtensionV1): Uint8Array {
  return encode(v, writeLedgerEntryExtensionV1)
}

export function decodeLedgerEntryExtensionV1(input: Uint8Array | string): LedgerEntryExtensionV1 {
  return decode(input, readLedgerEntryExtensionV1)
}

export function toJsonLedgerEntryExtensionV1(v: LedgerEntryExtensionV1): Record<string, unknown> {
  return {
    'sponsoring_id': toJsonSponsorshipDescriptor(v.sponsoringID),
    'ext': toJsonLedgerEntryExtensionV1_ext(v.ext),
  }
}

export function fromJsonLedgerEntryExtensionV1(json: unknown): LedgerEntryExtensionV1 {
  const o = json as Record<string, unknown>
  return {
    sponsoringID: fromJsonSponsorshipDescriptor(o['sponsoring_id']),
    ext: fromJsonLedgerEntryExtensionV1_ext(o['ext']),
  }
}

export type LedgerEntry_data =
  | { readonly type: 'ACCOUNT'; readonly account: AccountEntry }
  | { readonly type: 'TRUSTLINE'; readonly trustLine: TrustLineEntry }
  | { readonly type: 'OFFER'; readonly offer: OfferEntry }
  | { readonly type: 'DATA'; readonly data: DataEntry }
  | { readonly type: 'CLAIMABLE_BALANCE'; readonly claimableBalance: ClaimableBalanceEntry }
  | { readonly type: 'LIQUIDITY_POOL'; readonly liquidityPool: LiquidityPoolEntry }
  | { readonly type: 'CONTRACT_DATA'; readonly contractData: ContractDataEntry }
  | { readonly type: 'CONTRACT_CODE'; readonly contractCode: ContractCodeEntry }
  | { readonly type: 'CONFIG_SETTING'; readonly configSetting: ConfigSettingEntry }
  | { readonly type: 'TTL'; readonly ttl: TTLEntry }

export function readLedgerEntry_data(r: XdrReader): LedgerEntry_data {
  beginComposite(r)
  try {
    const type = readLedgerEntryType(r)
    let result: LedgerEntry_data
    switch (type) {
      case 'ACCOUNT':
        result = { type, account: readAccountEntry(r) }; break
      case 'TRUSTLINE':
        result = { type, trustLine: readTrustLineEntry(r) }; break
      case 'OFFER':
        result = { type, offer: readOfferEntry(r) }; break
      case 'DATA':
        result = { type, data: readDataEntry(r) }; break
      case 'CLAIMABLE_BALANCE':
        result = { type, claimableBalance: readClaimableBalanceEntry(r) }; break
      case 'LIQUIDITY_POOL':
        result = { type, liquidityPool: readLiquidityPoolEntry(r) }; break
      case 'CONTRACT_DATA':
        result = { type, contractData: readContractDataEntry(r) }; break
      case 'CONTRACT_CODE':
        result = { type, contractCode: readContractCodeEntry(r) }; break
      case 'CONFIG_SETTING':
        result = { type, configSetting: readConfigSettingEntry(r) }; break
      case 'TTL':
        result = { type, ttl: readTTLEntry(r) }; break
      default:
        throw new XdrReadError(`Unknown LedgerEntry_data discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerEntry_data(w: XdrWriter, v: LedgerEntry_data): void {
  writeLedgerEntryType(w, v.type)
  switch (v.type) {
    case 'ACCOUNT':
      writeAccountEntry(w, (v as any).account); break
    case 'TRUSTLINE':
      writeTrustLineEntry(w, (v as any).trustLine); break
    case 'OFFER':
      writeOfferEntry(w, (v as any).offer); break
    case 'DATA':
      writeDataEntry(w, (v as any).data); break
    case 'CLAIMABLE_BALANCE':
      writeClaimableBalanceEntry(w, (v as any).claimableBalance); break
    case 'LIQUIDITY_POOL':
      writeLiquidityPoolEntry(w, (v as any).liquidityPool); break
    case 'CONTRACT_DATA':
      writeContractDataEntry(w, (v as any).contractData); break
    case 'CONTRACT_CODE':
      writeContractCodeEntry(w, (v as any).contractCode); break
    case 'CONFIG_SETTING':
      writeConfigSettingEntry(w, (v as any).configSetting); break
    case 'TTL':
      writeTTLEntry(w, (v as any).ttl); break
  }
}

export function encodeLedgerEntry_data(v: LedgerEntry_data): Uint8Array {
  return encode(v, writeLedgerEntry_data)
}

export function decodeLedgerEntry_data(input: Uint8Array | string): LedgerEntry_data {
  return decode(input, readLedgerEntry_data)
}

export function toJsonLedgerEntry_data(v: LedgerEntry_data): unknown {
  switch (v.type) {
    case 'ACCOUNT':
      return { 'account': toJsonAccountEntry((v as any).account) }
    case 'TRUSTLINE':
      return { 'trustline': toJsonTrustLineEntry((v as any).trustLine) }
    case 'OFFER':
      return { 'offer': toJsonOfferEntry((v as any).offer) }
    case 'DATA':
      return { 'data': toJsonDataEntry((v as any).data) }
    case 'CLAIMABLE_BALANCE':
      return { 'claimable_balance': toJsonClaimableBalanceEntry((v as any).claimableBalance) }
    case 'LIQUIDITY_POOL':
      return { 'liquidity_pool': toJsonLiquidityPoolEntry((v as any).liquidityPool) }
    case 'CONTRACT_DATA':
      return { 'contract_data': toJsonContractDataEntry((v as any).contractData) }
    case 'CONTRACT_CODE':
      return { 'contract_code': toJsonContractCodeEntry((v as any).contractCode) }
    case 'CONFIG_SETTING':
      return { 'config_setting': toJsonConfigSettingEntry((v as any).configSetting) }
    case 'TTL':
      return { 'ttl': toJsonTTLEntry((v as any).ttl) }
  }
}

export function fromJsonLedgerEntry_data(json: unknown): LedgerEntry_data {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for LedgerEntry_data: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'account':
      return { type: 'ACCOUNT', account: fromJsonAccountEntry(obj[key]) } as LedgerEntry_data
    case 'trustline':
      return { type: 'TRUSTLINE', trustLine: fromJsonTrustLineEntry(obj[key]) } as LedgerEntry_data
    case 'offer':
      return { type: 'OFFER', offer: fromJsonOfferEntry(obj[key]) } as LedgerEntry_data
    case 'data':
      return { type: 'DATA', data: fromJsonDataEntry(obj[key]) } as LedgerEntry_data
    case 'claimable_balance':
      return { type: 'CLAIMABLE_BALANCE', claimableBalance: fromJsonClaimableBalanceEntry(obj[key]) } as LedgerEntry_data
    case 'liquidity_pool':
      return { type: 'LIQUIDITY_POOL', liquidityPool: fromJsonLiquidityPoolEntry(obj[key]) } as LedgerEntry_data
    case 'contract_data':
      return { type: 'CONTRACT_DATA', contractData: fromJsonContractDataEntry(obj[key]) } as LedgerEntry_data
    case 'contract_code':
      return { type: 'CONTRACT_CODE', contractCode: fromJsonContractCodeEntry(obj[key]) } as LedgerEntry_data
    case 'config_setting':
      return { type: 'CONFIG_SETTING', configSetting: fromJsonConfigSettingEntry(obj[key]) } as LedgerEntry_data
    case 'ttl':
      return { type: 'TTL', ttl: fromJsonTTLEntry(obj[key]) } as LedgerEntry_data
    default: throw new Error(`Unknown LedgerEntry_data variant: ${key}`)
  }
}

export type LedgerEntry_ext =
  | { readonly v: 0 }
  | { readonly v: 1; readonly v1: LedgerEntryExtensionV1 }

export function readLedgerEntry_ext(r: XdrReader): LedgerEntry_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: LedgerEntry_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, v1: readLedgerEntryExtensionV1(r) }; break
      default:
        throw new XdrReadError(`Unknown LedgerEntry_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerEntry_ext(w: XdrWriter, v: LedgerEntry_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeLedgerEntryExtensionV1(w, (v as any).v1); break
  }
}

export function encodeLedgerEntry_ext(v: LedgerEntry_ext): Uint8Array {
  return encode(v, writeLedgerEntry_ext)
}

export function decodeLedgerEntry_ext(input: Uint8Array | string): LedgerEntry_ext {
  return decode(input, readLedgerEntry_ext)
}

export function toJsonLedgerEntry_ext(v: LedgerEntry_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonLedgerEntryExtensionV1((v as any).v1) }
  }
}

export function fromJsonLedgerEntry_ext(json: unknown): LedgerEntry_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as LedgerEntry_ext
    throw new Error(`Unknown LedgerEntry_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, v1: fromJsonLedgerEntryExtensionV1(obj[key]) } as LedgerEntry_ext
    default: throw new Error(`Unknown LedgerEntry_ext variant: ${key}`)
  }
}

export interface LedgerEntry {
  readonly lastModifiedLedgerSeq: uint32
  readonly data: LedgerEntry_data
  /** reserved for future use */
  readonly ext: LedgerEntry_ext
}

export function readLedgerEntry(r: XdrReader): LedgerEntry {
  beginComposite(r)
  try {
    const lastModifiedLedgerSeq = readuint32(r)
    const data = readLedgerEntry_data(r)
    const ext = readLedgerEntry_ext(r)
    return { lastModifiedLedgerSeq, data, ext }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerEntry(w: XdrWriter, v: LedgerEntry): void {
  writeuint32(w, v.lastModifiedLedgerSeq)
  writeLedgerEntry_data(w, v.data)
  writeLedgerEntry_ext(w, v.ext)
}

export function encodeLedgerEntry(v: LedgerEntry): Uint8Array {
  return encode(v, writeLedgerEntry)
}

export function decodeLedgerEntry(input: Uint8Array | string): LedgerEntry {
  return decode(input, readLedgerEntry)
}

export function toJsonLedgerEntry(v: LedgerEntry): Record<string, unknown> {
  return {
    'last_modified_ledger_seq': toJsonuint32(v.lastModifiedLedgerSeq),
    'data': toJsonLedgerEntry_data(v.data),
    'ext': toJsonLedgerEntry_ext(v.ext),
  }
}

export function fromJsonLedgerEntry(json: unknown): LedgerEntry {
  const o = json as Record<string, unknown>
  return {
    lastModifiedLedgerSeq: fromJsonuint32(o['last_modified_ledger_seq']),
    data: fromJsonLedgerEntry_data(o['data']),
    ext: fromJsonLedgerEntry_ext(o['ext']),
  }
}

export interface LedgerKey_account {
  readonly accountID: AccountID
}

export function readLedgerKey_account(r: XdrReader): LedgerKey_account {
  beginComposite(r)
  try {
    const accountID = readAccountID(r)
    return { accountID }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey_account(w: XdrWriter, v: LedgerKey_account): void {
  writeAccountID(w, v.accountID)
}

export function encodeLedgerKey_account(v: LedgerKey_account): Uint8Array {
  return encode(v, writeLedgerKey_account)
}

export function decodeLedgerKey_account(input: Uint8Array | string): LedgerKey_account {
  return decode(input, readLedgerKey_account)
}

export function toJsonLedgerKey_account(v: LedgerKey_account): Record<string, unknown> {
  return {
    'account_id': toJsonAccountID(v.accountID),
  }
}

export function fromJsonLedgerKey_account(json: unknown): LedgerKey_account {
  const o = json as Record<string, unknown>
  return {
    accountID: fromJsonAccountID(o['account_id']),
  }
}

export interface LedgerKey_trustLine {
  readonly accountID: AccountID
  readonly asset: TrustLineAsset
}

export function readLedgerKey_trustLine(r: XdrReader): LedgerKey_trustLine {
  beginComposite(r)
  try {
    const accountID = readAccountID(r)
    const asset = readTrustLineAsset(r)
    return { accountID, asset }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey_trustLine(w: XdrWriter, v: LedgerKey_trustLine): void {
  writeAccountID(w, v.accountID)
  writeTrustLineAsset(w, v.asset)
}

export function encodeLedgerKey_trustLine(v: LedgerKey_trustLine): Uint8Array {
  return encode(v, writeLedgerKey_trustLine)
}

export function decodeLedgerKey_trustLine(input: Uint8Array | string): LedgerKey_trustLine {
  return decode(input, readLedgerKey_trustLine)
}

export function toJsonLedgerKey_trustLine(v: LedgerKey_trustLine): Record<string, unknown> {
  return {
    'account_id': toJsonAccountID(v.accountID),
    'asset': toJsonTrustLineAsset(v.asset),
  }
}

export function fromJsonLedgerKey_trustLine(json: unknown): LedgerKey_trustLine {
  const o = json as Record<string, unknown>
  return {
    accountID: fromJsonAccountID(o['account_id']),
    asset: fromJsonTrustLineAsset(o['asset']),
  }
}

export interface LedgerKey_offer {
  readonly sellerID: AccountID
  readonly offerID: int64
}

export function readLedgerKey_offer(r: XdrReader): LedgerKey_offer {
  beginComposite(r)
  try {
    const sellerID = readAccountID(r)
    const offerID = readint64(r)
    return { sellerID, offerID }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey_offer(w: XdrWriter, v: LedgerKey_offer): void {
  writeAccountID(w, v.sellerID)
  writeint64(w, v.offerID)
}

export function encodeLedgerKey_offer(v: LedgerKey_offer): Uint8Array {
  return encode(v, writeLedgerKey_offer)
}

export function decodeLedgerKey_offer(input: Uint8Array | string): LedgerKey_offer {
  return decode(input, readLedgerKey_offer)
}

export function toJsonLedgerKey_offer(v: LedgerKey_offer): Record<string, unknown> {
  return {
    'seller_id': toJsonAccountID(v.sellerID),
    'offer_id': toJsonint64(v.offerID),
  }
}

export function fromJsonLedgerKey_offer(json: unknown): LedgerKey_offer {
  const o = json as Record<string, unknown>
  return {
    sellerID: fromJsonAccountID(o['seller_id']),
    offerID: fromJsonint64(o['offer_id']),
  }
}

export interface LedgerKey_data {
  readonly accountID: AccountID
  readonly dataName: string64
}

export function readLedgerKey_data(r: XdrReader): LedgerKey_data {
  beginComposite(r)
  try {
    const accountID = readAccountID(r)
    const dataName = readstring64(r)
    return { accountID, dataName }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey_data(w: XdrWriter, v: LedgerKey_data): void {
  writeAccountID(w, v.accountID)
  writestring64(w, v.dataName)
}

export function encodeLedgerKey_data(v: LedgerKey_data): Uint8Array {
  return encode(v, writeLedgerKey_data)
}

export function decodeLedgerKey_data(input: Uint8Array | string): LedgerKey_data {
  return decode(input, readLedgerKey_data)
}

export function toJsonLedgerKey_data(v: LedgerKey_data): Record<string, unknown> {
  return {
    'account_id': toJsonAccountID(v.accountID),
    'data_name': toJsonstring64(v.dataName),
  }
}

export function fromJsonLedgerKey_data(json: unknown): LedgerKey_data {
  const o = json as Record<string, unknown>
  return {
    accountID: fromJsonAccountID(o['account_id']),
    dataName: fromJsonstring64(o['data_name']),
  }
}

export interface LedgerKey_claimableBalance {
  readonly balanceID: ClaimableBalanceID
}

export function readLedgerKey_claimableBalance(r: XdrReader): LedgerKey_claimableBalance {
  beginComposite(r)
  try {
    const balanceID = readClaimableBalanceID(r)
    return { balanceID }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey_claimableBalance(w: XdrWriter, v: LedgerKey_claimableBalance): void {
  writeClaimableBalanceID(w, v.balanceID)
}

export function encodeLedgerKey_claimableBalance(v: LedgerKey_claimableBalance): Uint8Array {
  return encode(v, writeLedgerKey_claimableBalance)
}

export function decodeLedgerKey_claimableBalance(input: Uint8Array | string): LedgerKey_claimableBalance {
  return decode(input, readLedgerKey_claimableBalance)
}

export function toJsonLedgerKey_claimableBalance(v: LedgerKey_claimableBalance): Record<string, unknown> {
  return {
    'balance_id': toJsonClaimableBalanceID(v.balanceID),
  }
}

export function fromJsonLedgerKey_claimableBalance(json: unknown): LedgerKey_claimableBalance {
  const o = json as Record<string, unknown>
  return {
    balanceID: fromJsonClaimableBalanceID(o['balance_id']),
  }
}

export interface LedgerKey_liquidityPool {
  readonly liquidityPoolID: PoolID
}

export function readLedgerKey_liquidityPool(r: XdrReader): LedgerKey_liquidityPool {
  beginComposite(r)
  try {
    const liquidityPoolID = readPoolID(r)
    return { liquidityPoolID }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey_liquidityPool(w: XdrWriter, v: LedgerKey_liquidityPool): void {
  writePoolID(w, v.liquidityPoolID)
}

export function encodeLedgerKey_liquidityPool(v: LedgerKey_liquidityPool): Uint8Array {
  return encode(v, writeLedgerKey_liquidityPool)
}

export function decodeLedgerKey_liquidityPool(input: Uint8Array | string): LedgerKey_liquidityPool {
  return decode(input, readLedgerKey_liquidityPool)
}

export function toJsonLedgerKey_liquidityPool(v: LedgerKey_liquidityPool): Record<string, unknown> {
  return {
    'liquidity_pool_id': toJsonPoolID(v.liquidityPoolID),
  }
}

export function fromJsonLedgerKey_liquidityPool(json: unknown): LedgerKey_liquidityPool {
  const o = json as Record<string, unknown>
  return {
    liquidityPoolID: fromJsonPoolID(o['liquidity_pool_id']),
  }
}

export interface LedgerKey_contractData {
  readonly contract: SCAddress
  readonly key: SCVal
  readonly durability: ContractDataDurability
}

export function readLedgerKey_contractData(r: XdrReader): LedgerKey_contractData {
  beginComposite(r)
  try {
    const contract = readSCAddress(r)
    const key = readSCVal(r)
    const durability = readContractDataDurability(r)
    return { contract, key, durability }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey_contractData(w: XdrWriter, v: LedgerKey_contractData): void {
  writeSCAddress(w, v.contract)
  writeSCVal(w, v.key)
  writeContractDataDurability(w, v.durability)
}

export function encodeLedgerKey_contractData(v: LedgerKey_contractData): Uint8Array {
  return encode(v, writeLedgerKey_contractData)
}

export function decodeLedgerKey_contractData(input: Uint8Array | string): LedgerKey_contractData {
  return decode(input, readLedgerKey_contractData)
}

export function toJsonLedgerKey_contractData(v: LedgerKey_contractData): Record<string, unknown> {
  return {
    'contract': toJsonSCAddress(v.contract),
    'key': toJsonSCVal(v.key),
    'durability': toJsonContractDataDurability(v.durability),
  }
}

export function fromJsonLedgerKey_contractData(json: unknown): LedgerKey_contractData {
  const o = json as Record<string, unknown>
  return {
    contract: fromJsonSCAddress(o['contract']),
    key: fromJsonSCVal(o['key']),
    durability: fromJsonContractDataDurability(o['durability']),
  }
}

export interface LedgerKey_contractCode {
  readonly hash: Hash
}

export function readLedgerKey_contractCode(r: XdrReader): LedgerKey_contractCode {
  beginComposite(r)
  try {
    const hash = readHash(r)
    return { hash }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey_contractCode(w: XdrWriter, v: LedgerKey_contractCode): void {
  writeHash(w, v.hash)
}

export function encodeLedgerKey_contractCode(v: LedgerKey_contractCode): Uint8Array {
  return encode(v, writeLedgerKey_contractCode)
}

export function decodeLedgerKey_contractCode(input: Uint8Array | string): LedgerKey_contractCode {
  return decode(input, readLedgerKey_contractCode)
}

export function toJsonLedgerKey_contractCode(v: LedgerKey_contractCode): Record<string, unknown> {
  return {
    'hash': toJsonHash(v.hash),
  }
}

export function fromJsonLedgerKey_contractCode(json: unknown): LedgerKey_contractCode {
  const o = json as Record<string, unknown>
  return {
    hash: fromJsonHash(o['hash']),
  }
}

export interface LedgerKey_configSetting {
  readonly configSettingID: ConfigSettingID
}

export function readLedgerKey_configSetting(r: XdrReader): LedgerKey_configSetting {
  beginComposite(r)
  try {
    const configSettingID = readConfigSettingID(r)
    return { configSettingID }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey_configSetting(w: XdrWriter, v: LedgerKey_configSetting): void {
  writeConfigSettingID(w, v.configSettingID)
}

export function encodeLedgerKey_configSetting(v: LedgerKey_configSetting): Uint8Array {
  return encode(v, writeLedgerKey_configSetting)
}

export function decodeLedgerKey_configSetting(input: Uint8Array | string): LedgerKey_configSetting {
  return decode(input, readLedgerKey_configSetting)
}

export function toJsonLedgerKey_configSetting(v: LedgerKey_configSetting): Record<string, unknown> {
  return {
    'config_setting_id': toJsonConfigSettingID(v.configSettingID),
  }
}

export function fromJsonLedgerKey_configSetting(json: unknown): LedgerKey_configSetting {
  const o = json as Record<string, unknown>
  return {
    configSettingID: fromJsonConfigSettingID(o['config_setting_id']),
  }
}

export interface LedgerKey_ttl {
  readonly keyHash: Hash
}

export function readLedgerKey_ttl(r: XdrReader): LedgerKey_ttl {
  beginComposite(r)
  try {
    const keyHash = readHash(r)
    return { keyHash }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey_ttl(w: XdrWriter, v: LedgerKey_ttl): void {
  writeHash(w, v.keyHash)
}

export function encodeLedgerKey_ttl(v: LedgerKey_ttl): Uint8Array {
  return encode(v, writeLedgerKey_ttl)
}

export function decodeLedgerKey_ttl(input: Uint8Array | string): LedgerKey_ttl {
  return decode(input, readLedgerKey_ttl)
}

export function toJsonLedgerKey_ttl(v: LedgerKey_ttl): Record<string, unknown> {
  return {
    'key_hash': toJsonHash(v.keyHash),
  }
}

export function fromJsonLedgerKey_ttl(json: unknown): LedgerKey_ttl {
  const o = json as Record<string, unknown>
  return {
    keyHash: fromJsonHash(o['key_hash']),
  }
}

export type LedgerKey =
  | { readonly type: 'ACCOUNT'; readonly account: LedgerKey_account }
  | { readonly type: 'TRUSTLINE'; readonly trustLine: LedgerKey_trustLine }
  | { readonly type: 'OFFER'; readonly offer: LedgerKey_offer }
  | { readonly type: 'DATA'; readonly data: LedgerKey_data }
  | { readonly type: 'CLAIMABLE_BALANCE'; readonly claimableBalance: LedgerKey_claimableBalance }
  | { readonly type: 'LIQUIDITY_POOL'; readonly liquidityPool: LedgerKey_liquidityPool }
  | { readonly type: 'CONTRACT_DATA'; readonly contractData: LedgerKey_contractData }
  | { readonly type: 'CONTRACT_CODE'; readonly contractCode: LedgerKey_contractCode }
  | { readonly type: 'CONFIG_SETTING'; readonly configSetting: LedgerKey_configSetting }
  | { readonly type: 'TTL'; readonly ttl: LedgerKey_ttl }

export function readLedgerKey(r: XdrReader): LedgerKey {
  beginComposite(r)
  try {
    const type = readLedgerEntryType(r)
    let result: LedgerKey
    switch (type) {
      case 'ACCOUNT':
        result = { type, account: readLedgerKey_account(r) }; break
      case 'TRUSTLINE':
        result = { type, trustLine: readLedgerKey_trustLine(r) }; break
      case 'OFFER':
        result = { type, offer: readLedgerKey_offer(r) }; break
      case 'DATA':
        result = { type, data: readLedgerKey_data(r) }; break
      case 'CLAIMABLE_BALANCE':
        result = { type, claimableBalance: readLedgerKey_claimableBalance(r) }; break
      case 'LIQUIDITY_POOL':
        result = { type, liquidityPool: readLedgerKey_liquidityPool(r) }; break
      case 'CONTRACT_DATA':
        result = { type, contractData: readLedgerKey_contractData(r) }; break
      case 'CONTRACT_CODE':
        result = { type, contractCode: readLedgerKey_contractCode(r) }; break
      case 'CONFIG_SETTING':
        result = { type, configSetting: readLedgerKey_configSetting(r) }; break
      case 'TTL':
        result = { type, ttl: readLedgerKey_ttl(r) }; break
      default:
        throw new XdrReadError(`Unknown LedgerKey discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerKey(w: XdrWriter, v: LedgerKey): void {
  writeLedgerEntryType(w, v.type)
  switch (v.type) {
    case 'ACCOUNT':
      writeLedgerKey_account(w, (v as any).account); break
    case 'TRUSTLINE':
      writeLedgerKey_trustLine(w, (v as any).trustLine); break
    case 'OFFER':
      writeLedgerKey_offer(w, (v as any).offer); break
    case 'DATA':
      writeLedgerKey_data(w, (v as any).data); break
    case 'CLAIMABLE_BALANCE':
      writeLedgerKey_claimableBalance(w, (v as any).claimableBalance); break
    case 'LIQUIDITY_POOL':
      writeLedgerKey_liquidityPool(w, (v as any).liquidityPool); break
    case 'CONTRACT_DATA':
      writeLedgerKey_contractData(w, (v as any).contractData); break
    case 'CONTRACT_CODE':
      writeLedgerKey_contractCode(w, (v as any).contractCode); break
    case 'CONFIG_SETTING':
      writeLedgerKey_configSetting(w, (v as any).configSetting); break
    case 'TTL':
      writeLedgerKey_ttl(w, (v as any).ttl); break
  }
}

export function encodeLedgerKey(v: LedgerKey): Uint8Array {
  return encode(v, writeLedgerKey)
}

export function decodeLedgerKey(input: Uint8Array | string): LedgerKey {
  return decode(input, readLedgerKey)
}

export function toJsonLedgerKey(v: LedgerKey): unknown {
  switch (v.type) {
    case 'ACCOUNT':
      return { 'account': toJsonLedgerKey_account((v as any).account) }
    case 'TRUSTLINE':
      return { 'trustline': toJsonLedgerKey_trustLine((v as any).trustLine) }
    case 'OFFER':
      return { 'offer': toJsonLedgerKey_offer((v as any).offer) }
    case 'DATA':
      return { 'data': toJsonLedgerKey_data((v as any).data) }
    case 'CLAIMABLE_BALANCE':
      return { 'claimable_balance': toJsonLedgerKey_claimableBalance((v as any).claimableBalance) }
    case 'LIQUIDITY_POOL':
      return { 'liquidity_pool': toJsonLedgerKey_liquidityPool((v as any).liquidityPool) }
    case 'CONTRACT_DATA':
      return { 'contract_data': toJsonLedgerKey_contractData((v as any).contractData) }
    case 'CONTRACT_CODE':
      return { 'contract_code': toJsonLedgerKey_contractCode((v as any).contractCode) }
    case 'CONFIG_SETTING':
      return { 'config_setting': toJsonLedgerKey_configSetting((v as any).configSetting) }
    case 'TTL':
      return { 'ttl': toJsonLedgerKey_ttl((v as any).ttl) }
  }
}

export function fromJsonLedgerKey(json: unknown): LedgerKey {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for LedgerKey: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'account':
      return { type: 'ACCOUNT', account: fromJsonLedgerKey_account(obj[key]) } as LedgerKey
    case 'trustline':
      return { type: 'TRUSTLINE', trustLine: fromJsonLedgerKey_trustLine(obj[key]) } as LedgerKey
    case 'offer':
      return { type: 'OFFER', offer: fromJsonLedgerKey_offer(obj[key]) } as LedgerKey
    case 'data':
      return { type: 'DATA', data: fromJsonLedgerKey_data(obj[key]) } as LedgerKey
    case 'claimable_balance':
      return { type: 'CLAIMABLE_BALANCE', claimableBalance: fromJsonLedgerKey_claimableBalance(obj[key]) } as LedgerKey
    case 'liquidity_pool':
      return { type: 'LIQUIDITY_POOL', liquidityPool: fromJsonLedgerKey_liquidityPool(obj[key]) } as LedgerKey
    case 'contract_data':
      return { type: 'CONTRACT_DATA', contractData: fromJsonLedgerKey_contractData(obj[key]) } as LedgerKey
    case 'contract_code':
      return { type: 'CONTRACT_CODE', contractCode: fromJsonLedgerKey_contractCode(obj[key]) } as LedgerKey
    case 'config_setting':
      return { type: 'CONFIG_SETTING', configSetting: fromJsonLedgerKey_configSetting(obj[key]) } as LedgerKey
    case 'ttl':
      return { type: 'TTL', ttl: fromJsonLedgerKey_ttl(obj[key]) } as LedgerKey
    default: throw new Error(`Unknown LedgerKey variant: ${key}`)
  }
}

/**
 * list of all envelope types used in the application
 * those are prefixes used when building signatures for
 * the respective envelopes
 */
export type EnvelopeType =
  | 'ENVELOPE_TYPE_TX_V0'
  | 'ENVELOPE_TYPE_SCP'
  | 'ENVELOPE_TYPE_TX'
  | 'ENVELOPE_TYPE_AUTH'
  | 'ENVELOPE_TYPE_SCPVALUE'
  | 'ENVELOPE_TYPE_TX_FEE_BUMP'
  | 'ENVELOPE_TYPE_OP_ID'
  | 'ENVELOPE_TYPE_POOL_REVOKE_OP_ID'
  | 'ENVELOPE_TYPE_CONTRACT_ID'
  | 'ENVELOPE_TYPE_SOROBAN_AUTHORIZATION'

export const ENVELOPE_TYPE_TO_INT: Record<EnvelopeType, number> = /*#__PURE__*/ {
  ENVELOPE_TYPE_TX_V0: 0,
  ENVELOPE_TYPE_SCP: 1,
  ENVELOPE_TYPE_TX: 2,
  ENVELOPE_TYPE_AUTH: 3,
  ENVELOPE_TYPE_SCPVALUE: 4,
  ENVELOPE_TYPE_TX_FEE_BUMP: 5,
  ENVELOPE_TYPE_OP_ID: 6,
  ENVELOPE_TYPE_POOL_REVOKE_OP_ID: 7,
  ENVELOPE_TYPE_CONTRACT_ID: 8,
  ENVELOPE_TYPE_SOROBAN_AUTHORIZATION: 9,
}

export const ENVELOPE_TYPE_FROM_INT: Record<number, EnvelopeType> = /*#__PURE__*/ {
  0: 'ENVELOPE_TYPE_TX_V0',
  1: 'ENVELOPE_TYPE_SCP',
  2: 'ENVELOPE_TYPE_TX',
  3: 'ENVELOPE_TYPE_AUTH',
  4: 'ENVELOPE_TYPE_SCPVALUE',
  5: 'ENVELOPE_TYPE_TX_FEE_BUMP',
  6: 'ENVELOPE_TYPE_OP_ID',
  7: 'ENVELOPE_TYPE_POOL_REVOKE_OP_ID',
  8: 'ENVELOPE_TYPE_CONTRACT_ID',
  9: 'ENVELOPE_TYPE_SOROBAN_AUTHORIZATION',
}

export function readEnvelopeType(r: XdrReader): EnvelopeType {
  const v = readInt32(r)
  const result = ENVELOPE_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown EnvelopeType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeEnvelopeType(w: XdrWriter, v: EnvelopeType): void {
  writeInt32(w, ENVELOPE_TYPE_TO_INT[v])
}

export function encodeEnvelopeType(v: EnvelopeType): Uint8Array {
  return encode(v, writeEnvelopeType)
}

export function decodeEnvelopeType(input: Uint8Array | string): EnvelopeType {
  return decode(input, readEnvelopeType)
}

const _ENVELOPE_TYPE_TO_JSON: Record<EnvelopeType, string> = /*#__PURE__*/ {
  ENVELOPE_TYPE_TX_V0: 'tx_v0',
  ENVELOPE_TYPE_SCP: 'scp',
  ENVELOPE_TYPE_TX: 'tx',
  ENVELOPE_TYPE_AUTH: 'auth',
  ENVELOPE_TYPE_SCPVALUE: 'scpvalue',
  ENVELOPE_TYPE_TX_FEE_BUMP: 'tx_fee_bump',
  ENVELOPE_TYPE_OP_ID: 'op_id',
  ENVELOPE_TYPE_POOL_REVOKE_OP_ID: 'pool_revoke_op_id',
  ENVELOPE_TYPE_CONTRACT_ID: 'contract_id',
  ENVELOPE_TYPE_SOROBAN_AUTHORIZATION: 'soroban_authorization',
}

const _ENVELOPE_TYPE_FROM_JSON: Record<string, EnvelopeType> = /*#__PURE__*/ {
  'tx_v0': 'ENVELOPE_TYPE_TX_V0',
  'scp': 'ENVELOPE_TYPE_SCP',
  'tx': 'ENVELOPE_TYPE_TX',
  'auth': 'ENVELOPE_TYPE_AUTH',
  'scpvalue': 'ENVELOPE_TYPE_SCPVALUE',
  'tx_fee_bump': 'ENVELOPE_TYPE_TX_FEE_BUMP',
  'op_id': 'ENVELOPE_TYPE_OP_ID',
  'pool_revoke_op_id': 'ENVELOPE_TYPE_POOL_REVOKE_OP_ID',
  'contract_id': 'ENVELOPE_TYPE_CONTRACT_ID',
  'soroban_authorization': 'ENVELOPE_TYPE_SOROBAN_AUTHORIZATION',
}

export function toJsonEnvelopeType(v: EnvelopeType): string {
  return _ENVELOPE_TYPE_TO_JSON[v]
}

export function fromJsonEnvelopeType(json: unknown): EnvelopeType {
  const result = _ENVELOPE_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown EnvelopeType JSON value: ${json}`)
  return result
}

export type BucketListType =
  | 'LIVE'
  | 'HOT_ARCHIVE'

export const BUCKET_LIST_TYPE_TO_INT: Record<BucketListType, number> = /*#__PURE__*/ {
  LIVE: 0,
  HOT_ARCHIVE: 1,
}

export const BUCKET_LIST_TYPE_FROM_INT: Record<number, BucketListType> = /*#__PURE__*/ {
  0: 'LIVE',
  1: 'HOT_ARCHIVE',
}

export function readBucketListType(r: XdrReader): BucketListType {
  const v = readInt32(r)
  const result = BUCKET_LIST_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown BucketListType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeBucketListType(w: XdrWriter, v: BucketListType): void {
  writeInt32(w, BUCKET_LIST_TYPE_TO_INT[v])
}

export function encodeBucketListType(v: BucketListType): Uint8Array {
  return encode(v, writeBucketListType)
}

export function decodeBucketListType(input: Uint8Array | string): BucketListType {
  return decode(input, readBucketListType)
}

const _BUCKET_LIST_TYPE_TO_JSON: Record<BucketListType, string> = /*#__PURE__*/ {
  LIVE: 'live',
  HOT_ARCHIVE: 'hot_archive',
}

const _BUCKET_LIST_TYPE_FROM_JSON: Record<string, BucketListType> = /*#__PURE__*/ {
  'live': 'LIVE',
  'hot_archive': 'HOT_ARCHIVE',
}

export function toJsonBucketListType(v: BucketListType): string {
  return _BUCKET_LIST_TYPE_TO_JSON[v]
}

export function fromJsonBucketListType(json: unknown): BucketListType {
  const result = _BUCKET_LIST_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown BucketListType JSON value: ${json}`)
  return result
}

/** Entries used to define the bucket list  */
export type BucketEntryType =
  | 'METAENTRY'
  | 'LIVEENTRY'
  | 'DEADENTRY'
  | 'INITENTRY'

export const BUCKET_ENTRY_TYPE_TO_INT: Record<BucketEntryType, number> = /*#__PURE__*/ {
  METAENTRY: -1,
  LIVEENTRY: 0,
  DEADENTRY: 1,
  INITENTRY: 2,
}

export const BUCKET_ENTRY_TYPE_FROM_INT: Record<number, BucketEntryType> = /*#__PURE__*/ {
  [-1]: 'METAENTRY',
  0: 'LIVEENTRY',
  1: 'DEADENTRY',
  2: 'INITENTRY',
}

export function readBucketEntryType(r: XdrReader): BucketEntryType {
  const v = readInt32(r)
  const result = BUCKET_ENTRY_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown BucketEntryType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeBucketEntryType(w: XdrWriter, v: BucketEntryType): void {
  writeInt32(w, BUCKET_ENTRY_TYPE_TO_INT[v])
}

export function encodeBucketEntryType(v: BucketEntryType): Uint8Array {
  return encode(v, writeBucketEntryType)
}

export function decodeBucketEntryType(input: Uint8Array | string): BucketEntryType {
  return decode(input, readBucketEntryType)
}

const _BUCKET_ENTRY_TYPE_TO_JSON: Record<BucketEntryType, string> = /*#__PURE__*/ {
  METAENTRY: 'metaentry',
  LIVEENTRY: 'liveentry',
  DEADENTRY: 'deadentry',
  INITENTRY: 'initentry',
}

const _BUCKET_ENTRY_TYPE_FROM_JSON: Record<string, BucketEntryType> = /*#__PURE__*/ {
  'metaentry': 'METAENTRY',
  'liveentry': 'LIVEENTRY',
  'deadentry': 'DEADENTRY',
  'initentry': 'INITENTRY',
}

export function toJsonBucketEntryType(v: BucketEntryType): string {
  return _BUCKET_ENTRY_TYPE_TO_JSON[v]
}

export function fromJsonBucketEntryType(json: unknown): BucketEntryType {
  const result = _BUCKET_ENTRY_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown BucketEntryType JSON value: ${json}`)
  return result
}

export type HotArchiveBucketEntryType =
  | 'HOT_ARCHIVE_METAENTRY'
  | 'HOT_ARCHIVE_ARCHIVED'
  | 'HOT_ARCHIVE_LIVE'

export const HOT_ARCHIVE_BUCKET_ENTRY_TYPE_TO_INT: Record<HotArchiveBucketEntryType, number> = /*#__PURE__*/ {
  HOT_ARCHIVE_METAENTRY: -1,
  HOT_ARCHIVE_ARCHIVED: 0,
  HOT_ARCHIVE_LIVE: 1,
}

export const HOT_ARCHIVE_BUCKET_ENTRY_TYPE_FROM_INT: Record<number, HotArchiveBucketEntryType> = /*#__PURE__*/ {
  [-1]: 'HOT_ARCHIVE_METAENTRY',
  0: 'HOT_ARCHIVE_ARCHIVED',
  1: 'HOT_ARCHIVE_LIVE',
}

export function readHotArchiveBucketEntryType(r: XdrReader): HotArchiveBucketEntryType {
  const v = readInt32(r)
  const result = HOT_ARCHIVE_BUCKET_ENTRY_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown HotArchiveBucketEntryType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeHotArchiveBucketEntryType(w: XdrWriter, v: HotArchiveBucketEntryType): void {
  writeInt32(w, HOT_ARCHIVE_BUCKET_ENTRY_TYPE_TO_INT[v])
}

export function encodeHotArchiveBucketEntryType(v: HotArchiveBucketEntryType): Uint8Array {
  return encode(v, writeHotArchiveBucketEntryType)
}

export function decodeHotArchiveBucketEntryType(input: Uint8Array | string): HotArchiveBucketEntryType {
  return decode(input, readHotArchiveBucketEntryType)
}

const _HOT_ARCHIVE_BUCKET_ENTRY_TYPE_TO_JSON: Record<HotArchiveBucketEntryType, string> = /*#__PURE__*/ {
  HOT_ARCHIVE_METAENTRY: 'metaentry',
  HOT_ARCHIVE_ARCHIVED: 'archived',
  HOT_ARCHIVE_LIVE: 'live',
}

const _HOT_ARCHIVE_BUCKET_ENTRY_TYPE_FROM_JSON: Record<string, HotArchiveBucketEntryType> = /*#__PURE__*/ {
  'metaentry': 'HOT_ARCHIVE_METAENTRY',
  'archived': 'HOT_ARCHIVE_ARCHIVED',
  'live': 'HOT_ARCHIVE_LIVE',
}

export function toJsonHotArchiveBucketEntryType(v: HotArchiveBucketEntryType): string {
  return _HOT_ARCHIVE_BUCKET_ENTRY_TYPE_TO_JSON[v]
}

export function fromJsonHotArchiveBucketEntryType(json: unknown): HotArchiveBucketEntryType {
  const result = _HOT_ARCHIVE_BUCKET_ENTRY_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown HotArchiveBucketEntryType JSON value: ${json}`)
  return result
}

export type BucketMetadata_ext =
  | { readonly v: 0 }
  | { readonly v: 1; readonly bucketListType: BucketListType }

export function readBucketMetadata_ext(r: XdrReader): BucketMetadata_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: BucketMetadata_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, bucketListType: readBucketListType(r) }; break
      default:
        throw new XdrReadError(`Unknown BucketMetadata_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeBucketMetadata_ext(w: XdrWriter, v: BucketMetadata_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeBucketListType(w, (v as any).bucketListType); break
  }
}

export function encodeBucketMetadata_ext(v: BucketMetadata_ext): Uint8Array {
  return encode(v, writeBucketMetadata_ext)
}

export function decodeBucketMetadata_ext(input: Uint8Array | string): BucketMetadata_ext {
  return decode(input, readBucketMetadata_ext)
}

export function toJsonBucketMetadata_ext(v: BucketMetadata_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonBucketListType((v as any).bucketListType) }
  }
}

export function fromJsonBucketMetadata_ext(json: unknown): BucketMetadata_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as BucketMetadata_ext
    throw new Error(`Unknown BucketMetadata_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, bucketListType: fromJsonBucketListType(obj[key]) } as BucketMetadata_ext
    default: throw new Error(`Unknown BucketMetadata_ext variant: ${key}`)
  }
}

export interface BucketMetadata {
  /** Indicates the protocol version used to create / merge this bucket. */
  readonly ledgerVersion: uint32
  /** reserved for future use */
  readonly ext: BucketMetadata_ext
}

export function readBucketMetadata(r: XdrReader): BucketMetadata {
  beginComposite(r)
  try {
    const ledgerVersion = readuint32(r)
    const ext = readBucketMetadata_ext(r)
    return { ledgerVersion, ext }
  } finally {
    endComposite(r)
  }
}

export function writeBucketMetadata(w: XdrWriter, v: BucketMetadata): void {
  writeuint32(w, v.ledgerVersion)
  writeBucketMetadata_ext(w, v.ext)
}

export function encodeBucketMetadata(v: BucketMetadata): Uint8Array {
  return encode(v, writeBucketMetadata)
}

export function decodeBucketMetadata(input: Uint8Array | string): BucketMetadata {
  return decode(input, readBucketMetadata)
}

export function toJsonBucketMetadata(v: BucketMetadata): Record<string, unknown> {
  return {
    'ledger_version': toJsonuint32(v.ledgerVersion),
    'ext': toJsonBucketMetadata_ext(v.ext),
  }
}

export function fromJsonBucketMetadata(json: unknown): BucketMetadata {
  const o = json as Record<string, unknown>
  return {
    ledgerVersion: fromJsonuint32(o['ledger_version']),
    ext: fromJsonBucketMetadata_ext(o['ext']),
  }
}

export type BucketEntry =
  | { readonly type: 'LIVEENTRY'; readonly liveEntry: LedgerEntry }
  | { readonly type: 'INITENTRY'; readonly liveEntry: LedgerEntry }
  | { readonly type: 'DEADENTRY'; readonly deadEntry: LedgerKey }
  | { readonly type: 'METAENTRY'; readonly metaEntry: BucketMetadata }

export function readBucketEntry(r: XdrReader): BucketEntry {
  beginComposite(r)
  try {
    const type = readBucketEntryType(r)
    let result: BucketEntry
    switch (type) {
      case 'LIVEENTRY':
      case 'INITENTRY':
        result = { type, liveEntry: readLedgerEntry(r) }; break
      case 'DEADENTRY':
        result = { type, deadEntry: readLedgerKey(r) }; break
      case 'METAENTRY':
        result = { type, metaEntry: readBucketMetadata(r) }; break
      default:
        throw new XdrReadError(`Unknown BucketEntry discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeBucketEntry(w: XdrWriter, v: BucketEntry): void {
  writeBucketEntryType(w, v.type)
  switch (v.type) {
    case 'LIVEENTRY':
    case 'INITENTRY':
      writeLedgerEntry(w, (v as any).liveEntry); break
    case 'DEADENTRY':
      writeLedgerKey(w, (v as any).deadEntry); break
    case 'METAENTRY':
      writeBucketMetadata(w, (v as any).metaEntry); break
  }
}

export function encodeBucketEntry(v: BucketEntry): Uint8Array {
  return encode(v, writeBucketEntry)
}

export function decodeBucketEntry(input: Uint8Array | string): BucketEntry {
  return decode(input, readBucketEntry)
}

export function toJsonBucketEntry(v: BucketEntry): unknown {
  switch (v.type) {
    case 'LIVEENTRY':
      return { 'liveentry': toJsonLedgerEntry((v as any).liveEntry) }
    case 'INITENTRY':
      return { 'initentry': toJsonLedgerEntry((v as any).liveEntry) }
    case 'DEADENTRY':
      return { 'deadentry': toJsonLedgerKey((v as any).deadEntry) }
    case 'METAENTRY':
      return { 'metaentry': toJsonBucketMetadata((v as any).metaEntry) }
  }
}

export function fromJsonBucketEntry(json: unknown): BucketEntry {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for BucketEntry: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'liveentry':
      return { type: 'LIVEENTRY', liveEntry: fromJsonLedgerEntry(obj[key]) } as BucketEntry
    case 'initentry':
      return { type: 'INITENTRY', liveEntry: fromJsonLedgerEntry(obj[key]) } as BucketEntry
    case 'deadentry':
      return { type: 'DEADENTRY', deadEntry: fromJsonLedgerKey(obj[key]) } as BucketEntry
    case 'metaentry':
      return { type: 'METAENTRY', metaEntry: fromJsonBucketMetadata(obj[key]) } as BucketEntry
    default: throw new Error(`Unknown BucketEntry variant: ${key}`)
  }
}

export type HotArchiveBucketEntry =
  | { readonly type: 'HOT_ARCHIVE_ARCHIVED'; readonly archivedEntry: LedgerEntry }
  | { readonly type: 'HOT_ARCHIVE_LIVE'; readonly key: LedgerKey }
  | { readonly type: 'HOT_ARCHIVE_METAENTRY'; readonly metaEntry: BucketMetadata }

export function readHotArchiveBucketEntry(r: XdrReader): HotArchiveBucketEntry {
  beginComposite(r)
  try {
    const type = readHotArchiveBucketEntryType(r)
    let result: HotArchiveBucketEntry
    switch (type) {
      case 'HOT_ARCHIVE_ARCHIVED':
        result = { type, archivedEntry: readLedgerEntry(r) }; break
      case 'HOT_ARCHIVE_LIVE':
        result = { type, key: readLedgerKey(r) }; break
      case 'HOT_ARCHIVE_METAENTRY':
        result = { type, metaEntry: readBucketMetadata(r) }; break
      default:
        throw new XdrReadError(`Unknown HotArchiveBucketEntry discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeHotArchiveBucketEntry(w: XdrWriter, v: HotArchiveBucketEntry): void {
  writeHotArchiveBucketEntryType(w, v.type)
  switch (v.type) {
    case 'HOT_ARCHIVE_ARCHIVED':
      writeLedgerEntry(w, (v as any).archivedEntry); break
    case 'HOT_ARCHIVE_LIVE':
      writeLedgerKey(w, (v as any).key); break
    case 'HOT_ARCHIVE_METAENTRY':
      writeBucketMetadata(w, (v as any).metaEntry); break
  }
}

export function encodeHotArchiveBucketEntry(v: HotArchiveBucketEntry): Uint8Array {
  return encode(v, writeHotArchiveBucketEntry)
}

export function decodeHotArchiveBucketEntry(input: Uint8Array | string): HotArchiveBucketEntry {
  return decode(input, readHotArchiveBucketEntry)
}

export function toJsonHotArchiveBucketEntry(v: HotArchiveBucketEntry): unknown {
  switch (v.type) {
    case 'HOT_ARCHIVE_ARCHIVED':
      return { 'archived': toJsonLedgerEntry((v as any).archivedEntry) }
    case 'HOT_ARCHIVE_LIVE':
      return { 'live': toJsonLedgerKey((v as any).key) }
    case 'HOT_ARCHIVE_METAENTRY':
      return { 'metaentry': toJsonBucketMetadata((v as any).metaEntry) }
  }
}

export function fromJsonHotArchiveBucketEntry(json: unknown): HotArchiveBucketEntry {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for HotArchiveBucketEntry: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'archived':
      return { type: 'HOT_ARCHIVE_ARCHIVED', archivedEntry: fromJsonLedgerEntry(obj[key]) } as HotArchiveBucketEntry
    case 'live':
      return { type: 'HOT_ARCHIVE_LIVE', key: fromJsonLedgerKey(obj[key]) } as HotArchiveBucketEntry
    case 'metaentry':
      return { type: 'HOT_ARCHIVE_METAENTRY', metaEntry: fromJsonBucketMetadata(obj[key]) } as HotArchiveBucketEntry
    default: throw new Error(`Unknown HotArchiveBucketEntry variant: ${key}`)
  }
}
