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

import type { ConfigSettingEntry } from './contract-config-setting.js'
import { readConfigSettingEntry, writeConfigSettingEntry, toJsonConfigSettingEntry, fromJsonConfigSettingEntry } from './contract-config-setting.js'
import type { SCVal } from './contract.js'
import { readSCVal, writeSCVal, toJsonSCVal, fromJsonSCVal } from './contract.js'
import type { LedgerEntry, LedgerKey } from './ledger-entries.js'
import { readLedgerEntry, writeLedgerEntry, toJsonLedgerEntry, fromJsonLedgerEntry, readLedgerKey, writeLedgerKey, toJsonLedgerKey, fromJsonLedgerKey } from './ledger-entries.js'
import type { SCPEnvelope, SCPQuorumSet } from './scp.js'
import { readSCPEnvelope, writeSCPEnvelope, toJsonSCPEnvelope, fromJsonSCPEnvelope, readSCPQuorumSet, writeSCPQuorumSet, toJsonSCPQuorumSet, fromJsonSCPQuorumSet } from './scp.js'
import type { TransactionEnvelope, TransactionResult } from './transaction.js'
import { readTransactionEnvelope, writeTransactionEnvelope, toJsonTransactionEnvelope, fromJsonTransactionEnvelope, readTransactionResult, writeTransactionResult, toJsonTransactionResult, fromJsonTransactionResult } from './transaction.js'
import type { ContractID, ExtensionPoint, Hash, NodeID, Signature, TimePoint, int64, uint32, uint64 } from './types.js'
import { readContractID, writeContractID, toJsonContractID, fromJsonContractID, readExtensionPoint, writeExtensionPoint, toJsonExtensionPoint, fromJsonExtensionPoint, readHash, writeHash, toJsonHash, fromJsonHash, readNodeID, writeNodeID, toJsonNodeID, fromJsonNodeID, readSignature, writeSignature, toJsonSignature, fromJsonSignature, readTimePoint, writeTimePoint, toJsonTimePoint, fromJsonTimePoint, readint64, writeint64, toJsonint64, fromJsonint64, readuint32, writeuint32, toJsonuint32, fromJsonuint32, readuint64, writeuint64, toJsonuint64, fromJsonuint64 } from './types.js'


export type UpgradeType = Uint8Array

export function readUpgradeType(r: XdrReader): UpgradeType {
  return readVarOpaque(r, 128)
}

export function writeUpgradeType(w: XdrWriter, v: UpgradeType): void {
  writeVarOpaque(w, v, 128)
}

export function encodeUpgradeType(v: UpgradeType): Uint8Array {
  return encode(v, writeUpgradeType)
}

export function decodeUpgradeType(input: Uint8Array | string): UpgradeType {
  return decode(input, readUpgradeType)
}

export function toJsonUpgradeType(v: UpgradeType): unknown {
  return bytesToHex(v)
}

export function fromJsonUpgradeType(json: unknown): UpgradeType {
  return hexToBytes((json) as string)
}

export type StellarValueType =
  | 'STELLAR_VALUE_BASIC'
  | 'STELLAR_VALUE_SIGNED'

export const STELLAR_VALUE_TYPE_TO_INT: Record<StellarValueType, number> = /*#__PURE__*/ {
  STELLAR_VALUE_BASIC: 0,
  STELLAR_VALUE_SIGNED: 1,
}

export const STELLAR_VALUE_TYPE_FROM_INT: Record<number, StellarValueType> = /*#__PURE__*/ {
  0: 'STELLAR_VALUE_BASIC',
  1: 'STELLAR_VALUE_SIGNED',
}

export function readStellarValueType(r: XdrReader): StellarValueType {
  const v = readInt32(r)
  const result = STELLAR_VALUE_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown StellarValueType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeStellarValueType(w: XdrWriter, v: StellarValueType): void {
  writeInt32(w, STELLAR_VALUE_TYPE_TO_INT[v])
}

export function encodeStellarValueType(v: StellarValueType): Uint8Array {
  return encode(v, writeStellarValueType)
}

export function decodeStellarValueType(input: Uint8Array | string): StellarValueType {
  return decode(input, readStellarValueType)
}

const _STELLAR_VALUE_TYPE_TO_JSON: Record<StellarValueType, string> = /*#__PURE__*/ {
  STELLAR_VALUE_BASIC: 'basic',
  STELLAR_VALUE_SIGNED: 'signed',
}

const _STELLAR_VALUE_TYPE_FROM_JSON: Record<string, StellarValueType> = /*#__PURE__*/ {
  'basic': 'STELLAR_VALUE_BASIC',
  'signed': 'STELLAR_VALUE_SIGNED',
}

export function toJsonStellarValueType(v: StellarValueType): string {
  return _STELLAR_VALUE_TYPE_TO_JSON[v]
}

export function fromJsonStellarValueType(json: unknown): StellarValueType {
  const result = _STELLAR_VALUE_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown StellarValueType JSON value: ${json}`)
  return result
}

export interface LedgerCloseValueSignature {
  readonly nodeID: NodeID
  /** which node introduced the value */
  readonly signature: Signature
}

export function readLedgerCloseValueSignature(r: XdrReader): LedgerCloseValueSignature {
  beginComposite(r)
  try {
    const nodeID = readNodeID(r)
    const signature = readSignature(r)
    return { nodeID, signature }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerCloseValueSignature(w: XdrWriter, v: LedgerCloseValueSignature): void {
  writeNodeID(w, v.nodeID)
  writeSignature(w, v.signature)
}

export function encodeLedgerCloseValueSignature(v: LedgerCloseValueSignature): Uint8Array {
  return encode(v, writeLedgerCloseValueSignature)
}

export function decodeLedgerCloseValueSignature(input: Uint8Array | string): LedgerCloseValueSignature {
  return decode(input, readLedgerCloseValueSignature)
}

export function toJsonLedgerCloseValueSignature(v: LedgerCloseValueSignature): Record<string, unknown> {
  return {
    'node_id': toJsonNodeID(v.nodeID),
    'signature': toJsonSignature(v.signature),
  }
}

export function fromJsonLedgerCloseValueSignature(json: unknown): LedgerCloseValueSignature {
  const o = json as Record<string, unknown>
  return {
    nodeID: fromJsonNodeID(o['node_id']),
    signature: fromJsonSignature(o['signature']),
  }
}

export type StellarValue_ext =
  | { readonly v: 'STELLAR_VALUE_BASIC' }
  | { readonly v: 'STELLAR_VALUE_SIGNED'; readonly lcValueSignature: LedgerCloseValueSignature }

export function readStellarValue_ext(r: XdrReader): StellarValue_ext {
  beginComposite(r)
  try {
    const v = readStellarValueType(r)
    let result: StellarValue_ext
    switch (v) {
      case 'STELLAR_VALUE_BASIC':
        result = { v }; break
      case 'STELLAR_VALUE_SIGNED':
        result = { v, lcValueSignature: readLedgerCloseValueSignature(r) }; break
      default:
        throw new XdrReadError(`Unknown StellarValue_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeStellarValue_ext(w: XdrWriter, v: StellarValue_ext): void {
  writeStellarValueType(w, v.v)
  switch (v.v) {
    case 'STELLAR_VALUE_BASIC':
      break
    case 'STELLAR_VALUE_SIGNED':
      writeLedgerCloseValueSignature(w, (v as any).lcValueSignature); break
  }
}

export function encodeStellarValue_ext(v: StellarValue_ext): Uint8Array {
  return encode(v, writeStellarValue_ext)
}

export function decodeStellarValue_ext(input: Uint8Array | string): StellarValue_ext {
  return decode(input, readStellarValue_ext)
}

export function toJsonStellarValue_ext(v: StellarValue_ext): unknown {
  switch (v.v) {
    case 'STELLAR_VALUE_BASIC':
      return 'basic'
    case 'STELLAR_VALUE_SIGNED':
      return { 'signed': toJsonLedgerCloseValueSignature((v as any).lcValueSignature) }
  }
}

export function fromJsonStellarValue_ext(json: unknown): StellarValue_ext {
  if (typeof json === 'string') {
    if (json === 'basic') return { v: 'STELLAR_VALUE_BASIC' } as StellarValue_ext
    throw new Error(`Unknown StellarValue_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'signed':
      return { v: 'STELLAR_VALUE_SIGNED', lcValueSignature: fromJsonLedgerCloseValueSignature(obj[key]) } as StellarValue_ext
    default: throw new Error(`Unknown StellarValue_ext variant: ${key}`)
  }
}

/** StellarValue is the value used by SCP to reach consensus on a given ledger */
export interface StellarValue {
  readonly txSetHash: Hash
  /** transaction set to apply to previous ledger */
  readonly closeTime: TimePoint
  /**
   * upgrades to apply to the previous ledger (usually empty)
   * this is a vector of encoded 'LedgerUpgrade' so that nodes can drop
   * unknown steps during consensus if needed.
   * see notes below on 'LedgerUpgrade' for more detail
   * max size is dictated by number of upgrade types (+ room for future)
   */
  readonly upgrades: UpgradeType[]
  /** reserved for future use */
  readonly ext: StellarValue_ext
}

export function readStellarValue(r: XdrReader): StellarValue {
  beginComposite(r)
  try {
    const txSetHash = readHash(r)
    const closeTime = readTimePoint(r)
    const upgrades = readVarArray(r, 6, readUpgradeType)
    const ext = readStellarValue_ext(r)
    return { txSetHash, closeTime, upgrades, ext }
  } finally {
    endComposite(r)
  }
}

export function writeStellarValue(w: XdrWriter, v: StellarValue): void {
  writeHash(w, v.txSetHash)
  writeTimePoint(w, v.closeTime)
  writeVarArray(w, v.upgrades, 6, writeUpgradeType)
  writeStellarValue_ext(w, v.ext)
}

export function encodeStellarValue(v: StellarValue): Uint8Array {
  return encode(v, writeStellarValue)
}

export function decodeStellarValue(input: Uint8Array | string): StellarValue {
  return decode(input, readStellarValue)
}

export function toJsonStellarValue(v: StellarValue): Record<string, unknown> {
  return {
    'tx_set_hash': toJsonHash(v.txSetHash),
    'close_time': toJsonTimePoint(v.closeTime),
    'upgrades': v.upgrades.map((item: any) => toJsonUpgradeType(item)),
    'ext': toJsonStellarValue_ext(v.ext),
  }
}

export function fromJsonStellarValue(json: unknown): StellarValue {
  const o = json as Record<string, unknown>
  return {
    txSetHash: fromJsonHash(o['tx_set_hash']),
    closeTime: fromJsonTimePoint(o['close_time']),
    upgrades: ((o['upgrades']) as unknown[]).map((item: unknown) => fromJsonUpgradeType(item)),
    ext: fromJsonStellarValue_ext(o['ext']),
  }
}

export const MASK_LEDGER_HEADER_FLAGS = 7


export type LedgerHeaderFlags =
  | 'DISABLE_LIQUIDITY_POOL_TRADING_FLAG'
  | 'DISABLE_LIQUIDITY_POOL_DEPOSIT_FLAG'
  | 'DISABLE_LIQUIDITY_POOL_WITHDRAWAL_FLAG'

export const LEDGER_HEADER_FLAGS_TO_INT: Record<LedgerHeaderFlags, number> = /*#__PURE__*/ {
  DISABLE_LIQUIDITY_POOL_TRADING_FLAG: 1,
  DISABLE_LIQUIDITY_POOL_DEPOSIT_FLAG: 2,
  DISABLE_LIQUIDITY_POOL_WITHDRAWAL_FLAG: 4,
}

export const LEDGER_HEADER_FLAGS_FROM_INT: Record<number, LedgerHeaderFlags> = /*#__PURE__*/ {
  1: 'DISABLE_LIQUIDITY_POOL_TRADING_FLAG',
  2: 'DISABLE_LIQUIDITY_POOL_DEPOSIT_FLAG',
  4: 'DISABLE_LIQUIDITY_POOL_WITHDRAWAL_FLAG',
}

export function readLedgerHeaderFlags(r: XdrReader): LedgerHeaderFlags {
  const v = readInt32(r)
  const result = LEDGER_HEADER_FLAGS_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown LedgerHeaderFlags value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeLedgerHeaderFlags(w: XdrWriter, v: LedgerHeaderFlags): void {
  writeInt32(w, LEDGER_HEADER_FLAGS_TO_INT[v])
}

export function encodeLedgerHeaderFlags(v: LedgerHeaderFlags): Uint8Array {
  return encode(v, writeLedgerHeaderFlags)
}

export function decodeLedgerHeaderFlags(input: Uint8Array | string): LedgerHeaderFlags {
  return decode(input, readLedgerHeaderFlags)
}

const _LEDGER_HEADER_FLAGS_TO_JSON: Record<LedgerHeaderFlags, string> = /*#__PURE__*/ {
  DISABLE_LIQUIDITY_POOL_TRADING_FLAG: 'trading_flag',
  DISABLE_LIQUIDITY_POOL_DEPOSIT_FLAG: 'deposit_flag',
  DISABLE_LIQUIDITY_POOL_WITHDRAWAL_FLAG: 'withdrawal_flag',
}

const _LEDGER_HEADER_FLAGS_FROM_JSON: Record<string, LedgerHeaderFlags> = /*#__PURE__*/ {
  'trading_flag': 'DISABLE_LIQUIDITY_POOL_TRADING_FLAG',
  'deposit_flag': 'DISABLE_LIQUIDITY_POOL_DEPOSIT_FLAG',
  'withdrawal_flag': 'DISABLE_LIQUIDITY_POOL_WITHDRAWAL_FLAG',
}

export function toJsonLedgerHeaderFlags(v: LedgerHeaderFlags): string {
  return _LEDGER_HEADER_FLAGS_TO_JSON[v]
}

export function fromJsonLedgerHeaderFlags(json: unknown): LedgerHeaderFlags {
  const result = _LEDGER_HEADER_FLAGS_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown LedgerHeaderFlags JSON value: ${json}`)
  return result
}

export type LedgerHeaderExtensionV1_ext =
  | { readonly v: 0 }

export function readLedgerHeaderExtensionV1_ext(r: XdrReader): LedgerHeaderExtensionV1_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: LedgerHeaderExtensionV1_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown LedgerHeaderExtensionV1_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerHeaderExtensionV1_ext(w: XdrWriter, v: LedgerHeaderExtensionV1_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeLedgerHeaderExtensionV1_ext(v: LedgerHeaderExtensionV1_ext): Uint8Array {
  return encode(v, writeLedgerHeaderExtensionV1_ext)
}

export function decodeLedgerHeaderExtensionV1_ext(input: Uint8Array | string): LedgerHeaderExtensionV1_ext {
  return decode(input, readLedgerHeaderExtensionV1_ext)
}

export function toJsonLedgerHeaderExtensionV1_ext(v: LedgerHeaderExtensionV1_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonLedgerHeaderExtensionV1_ext(json: unknown): LedgerHeaderExtensionV1_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as LedgerHeaderExtensionV1_ext
    throw new Error(`Unknown LedgerHeaderExtensionV1_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown LedgerHeaderExtensionV1_ext variant: ${key}`)
  }
}

export interface LedgerHeaderExtensionV1 {
  readonly flags: uint32
  readonly ext: LedgerHeaderExtensionV1_ext
}

export function readLedgerHeaderExtensionV1(r: XdrReader): LedgerHeaderExtensionV1 {
  beginComposite(r)
  try {
    const flags = readuint32(r)
    const ext = readLedgerHeaderExtensionV1_ext(r)
    return { flags, ext }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerHeaderExtensionV1(w: XdrWriter, v: LedgerHeaderExtensionV1): void {
  writeuint32(w, v.flags)
  writeLedgerHeaderExtensionV1_ext(w, v.ext)
}

export function encodeLedgerHeaderExtensionV1(v: LedgerHeaderExtensionV1): Uint8Array {
  return encode(v, writeLedgerHeaderExtensionV1)
}

export function decodeLedgerHeaderExtensionV1(input: Uint8Array | string): LedgerHeaderExtensionV1 {
  return decode(input, readLedgerHeaderExtensionV1)
}

export function toJsonLedgerHeaderExtensionV1(v: LedgerHeaderExtensionV1): Record<string, unknown> {
  return {
    'flags': toJsonuint32(v.flags),
    'ext': toJsonLedgerHeaderExtensionV1_ext(v.ext),
  }
}

export function fromJsonLedgerHeaderExtensionV1(json: unknown): LedgerHeaderExtensionV1 {
  const o = json as Record<string, unknown>
  return {
    flags: fromJsonuint32(o['flags']),
    ext: fromJsonLedgerHeaderExtensionV1_ext(o['ext']),
  }
}

export type LedgerHeader_ext =
  | { readonly v: 0 }
  | { readonly v: 1; readonly v1: LedgerHeaderExtensionV1 }

export function readLedgerHeader_ext(r: XdrReader): LedgerHeader_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: LedgerHeader_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, v1: readLedgerHeaderExtensionV1(r) }; break
      default:
        throw new XdrReadError(`Unknown LedgerHeader_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerHeader_ext(w: XdrWriter, v: LedgerHeader_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeLedgerHeaderExtensionV1(w, (v as any).v1); break
  }
}

export function encodeLedgerHeader_ext(v: LedgerHeader_ext): Uint8Array {
  return encode(v, writeLedgerHeader_ext)
}

export function decodeLedgerHeader_ext(input: Uint8Array | string): LedgerHeader_ext {
  return decode(input, readLedgerHeader_ext)
}

export function toJsonLedgerHeader_ext(v: LedgerHeader_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonLedgerHeaderExtensionV1((v as any).v1) }
  }
}

export function fromJsonLedgerHeader_ext(json: unknown): LedgerHeader_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as LedgerHeader_ext
    throw new Error(`Unknown LedgerHeader_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, v1: fromJsonLedgerHeaderExtensionV1(obj[key]) } as LedgerHeader_ext
    default: throw new Error(`Unknown LedgerHeader_ext variant: ${key}`)
  }
}

/**
 * The LedgerHeader is the highest level structure representing the
 * state of a ledger, cryptographically linked to previous ledgers.
 */
export interface LedgerHeader {
  readonly ledgerVersion: uint32
  /** the protocol version of the ledger */
  readonly previousLedgerHash: Hash
  /** hash of the previous ledger header */
  readonly scpValue: StellarValue
  /** what consensus agreed to */
  readonly txSetResultHash: Hash
  /** the TransactionResultSet that led to this ledger */
  readonly bucketListHash: Hash
  readonly ledgerSeq: uint32
  readonly totalCoins: int64
  readonly feePool: int64
  /** fees burned since last inflation run */
  readonly inflationSeq: uint32
  readonly idPool: uint64
  readonly baseFee: uint32
  /** base fee per operation in stroops */
  readonly baseReserve: uint32
  readonly maxTxSetSize: uint32
  readonly skipList: Hash[]
  /** reserved for future use */
  readonly ext: LedgerHeader_ext
}

export function readLedgerHeader(r: XdrReader): LedgerHeader {
  beginComposite(r)
  try {
    const ledgerVersion = readuint32(r)
    const previousLedgerHash = readHash(r)
    const scpValue = readStellarValue(r)
    const txSetResultHash = readHash(r)
    const bucketListHash = readHash(r)
    const ledgerSeq = readuint32(r)
    const totalCoins = readint64(r)
    const feePool = readint64(r)
    const inflationSeq = readuint32(r)
    const idPool = readuint64(r)
    const baseFee = readuint32(r)
    const baseReserve = readuint32(r)
    const maxTxSetSize = readuint32(r)
    const skipList = readFixedArray(r, 4, readHash)
    const ext = readLedgerHeader_ext(r)
    return { ledgerVersion, previousLedgerHash, scpValue, txSetResultHash, bucketListHash, ledgerSeq, totalCoins, feePool, inflationSeq, idPool, baseFee, baseReserve, maxTxSetSize, skipList, ext }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerHeader(w: XdrWriter, v: LedgerHeader): void {
  writeuint32(w, v.ledgerVersion)
  writeHash(w, v.previousLedgerHash)
  writeStellarValue(w, v.scpValue)
  writeHash(w, v.txSetResultHash)
  writeHash(w, v.bucketListHash)
  writeuint32(w, v.ledgerSeq)
  writeint64(w, v.totalCoins)
  writeint64(w, v.feePool)
  writeuint32(w, v.inflationSeq)
  writeuint64(w, v.idPool)
  writeuint32(w, v.baseFee)
  writeuint32(w, v.baseReserve)
  writeuint32(w, v.maxTxSetSize)
  writeFixedArray(w, v.skipList, 4, writeHash)
  writeLedgerHeader_ext(w, v.ext)
}

export function encodeLedgerHeader(v: LedgerHeader): Uint8Array {
  return encode(v, writeLedgerHeader)
}

export function decodeLedgerHeader(input: Uint8Array | string): LedgerHeader {
  return decode(input, readLedgerHeader)
}

export function toJsonLedgerHeader(v: LedgerHeader): Record<string, unknown> {
  return {
    'ledger_version': toJsonuint32(v.ledgerVersion),
    'previous_ledger_hash': toJsonHash(v.previousLedgerHash),
    'scp_value': toJsonStellarValue(v.scpValue),
    'tx_set_result_hash': toJsonHash(v.txSetResultHash),
    'bucket_list_hash': toJsonHash(v.bucketListHash),
    'ledger_seq': toJsonuint32(v.ledgerSeq),
    'total_coins': toJsonint64(v.totalCoins),
    'fee_pool': toJsonint64(v.feePool),
    'inflation_seq': toJsonuint32(v.inflationSeq),
    'id_pool': toJsonuint64(v.idPool),
    'base_fee': toJsonuint32(v.baseFee),
    'base_reserve': toJsonuint32(v.baseReserve),
    'max_tx_set_size': toJsonuint32(v.maxTxSetSize),
    'skip_list': v.skipList.map((item: any) => toJsonHash(item)),
    'ext': toJsonLedgerHeader_ext(v.ext),
  }
}

export function fromJsonLedgerHeader(json: unknown): LedgerHeader {
  const o = json as Record<string, unknown>
  return {
    ledgerVersion: fromJsonuint32(o['ledger_version']),
    previousLedgerHash: fromJsonHash(o['previous_ledger_hash']),
    scpValue: fromJsonStellarValue(o['scp_value']),
    txSetResultHash: fromJsonHash(o['tx_set_result_hash']),
    bucketListHash: fromJsonHash(o['bucket_list_hash']),
    ledgerSeq: fromJsonuint32(o['ledger_seq']),
    totalCoins: fromJsonint64(o['total_coins']),
    feePool: fromJsonint64(o['fee_pool']),
    inflationSeq: fromJsonuint32(o['inflation_seq']),
    idPool: fromJsonuint64(o['id_pool']),
    baseFee: fromJsonuint32(o['base_fee']),
    baseReserve: fromJsonuint32(o['base_reserve']),
    maxTxSetSize: fromJsonuint32(o['max_tx_set_size']),
    skipList: ((o['skip_list']) as unknown[]).map((item: unknown) => fromJsonHash(item)),
    ext: fromJsonLedgerHeader_ext(o['ext']),
  }
}

/**
 * Ledger upgrades
 * note that the `upgrades` field from StellarValue is normalized such that
 * it only contains one entry per LedgerUpgradeType, and entries are sorted
 * in ascending order
 */
export type LedgerUpgradeType =
  | 'LEDGER_UPGRADE_VERSION'
  | 'LEDGER_UPGRADE_BASE_FEE'
  | 'LEDGER_UPGRADE_MAX_TX_SET_SIZE'
  | 'LEDGER_UPGRADE_BASE_RESERVE'
  | 'LEDGER_UPGRADE_FLAGS'
  | 'LEDGER_UPGRADE_CONFIG'
  | 'LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE'

export const LEDGER_UPGRADE_TYPE_TO_INT: Record<LedgerUpgradeType, number> = /*#__PURE__*/ {
  LEDGER_UPGRADE_VERSION: 1,
  LEDGER_UPGRADE_BASE_FEE: 2,
  LEDGER_UPGRADE_MAX_TX_SET_SIZE: 3,
  LEDGER_UPGRADE_BASE_RESERVE: 4,
  LEDGER_UPGRADE_FLAGS: 5,
  LEDGER_UPGRADE_CONFIG: 6,
  LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE: 7,
}

export const LEDGER_UPGRADE_TYPE_FROM_INT: Record<number, LedgerUpgradeType> = /*#__PURE__*/ {
  1: 'LEDGER_UPGRADE_VERSION',
  2: 'LEDGER_UPGRADE_BASE_FEE',
  3: 'LEDGER_UPGRADE_MAX_TX_SET_SIZE',
  4: 'LEDGER_UPGRADE_BASE_RESERVE',
  5: 'LEDGER_UPGRADE_FLAGS',
  6: 'LEDGER_UPGRADE_CONFIG',
  7: 'LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE',
}

export function readLedgerUpgradeType(r: XdrReader): LedgerUpgradeType {
  const v = readInt32(r)
  const result = LEDGER_UPGRADE_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown LedgerUpgradeType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeLedgerUpgradeType(w: XdrWriter, v: LedgerUpgradeType): void {
  writeInt32(w, LEDGER_UPGRADE_TYPE_TO_INT[v])
}

export function encodeLedgerUpgradeType(v: LedgerUpgradeType): Uint8Array {
  return encode(v, writeLedgerUpgradeType)
}

export function decodeLedgerUpgradeType(input: Uint8Array | string): LedgerUpgradeType {
  return decode(input, readLedgerUpgradeType)
}

const _LEDGER_UPGRADE_TYPE_TO_JSON: Record<LedgerUpgradeType, string> = /*#__PURE__*/ {
  LEDGER_UPGRADE_VERSION: 'version',
  LEDGER_UPGRADE_BASE_FEE: 'base_fee',
  LEDGER_UPGRADE_MAX_TX_SET_SIZE: 'max_tx_set_size',
  LEDGER_UPGRADE_BASE_RESERVE: 'base_reserve',
  LEDGER_UPGRADE_FLAGS: 'flags',
  LEDGER_UPGRADE_CONFIG: 'config',
  LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE: 'max_soroban_tx_set_size',
}

const _LEDGER_UPGRADE_TYPE_FROM_JSON: Record<string, LedgerUpgradeType> = /*#__PURE__*/ {
  'version': 'LEDGER_UPGRADE_VERSION',
  'base_fee': 'LEDGER_UPGRADE_BASE_FEE',
  'max_tx_set_size': 'LEDGER_UPGRADE_MAX_TX_SET_SIZE',
  'base_reserve': 'LEDGER_UPGRADE_BASE_RESERVE',
  'flags': 'LEDGER_UPGRADE_FLAGS',
  'config': 'LEDGER_UPGRADE_CONFIG',
  'max_soroban_tx_set_size': 'LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE',
}

export function toJsonLedgerUpgradeType(v: LedgerUpgradeType): string {
  return _LEDGER_UPGRADE_TYPE_TO_JSON[v]
}

export function fromJsonLedgerUpgradeType(json: unknown): LedgerUpgradeType {
  const result = _LEDGER_UPGRADE_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown LedgerUpgradeType JSON value: ${json}`)
  return result
}

export interface ConfigUpgradeSetKey {
  readonly contractID: ContractID
  readonly contentHash: Hash
}

export function readConfigUpgradeSetKey(r: XdrReader): ConfigUpgradeSetKey {
  beginComposite(r)
  try {
    const contractID = readContractID(r)
    const contentHash = readHash(r)
    return { contractID, contentHash }
  } finally {
    endComposite(r)
  }
}

export function writeConfigUpgradeSetKey(w: XdrWriter, v: ConfigUpgradeSetKey): void {
  writeContractID(w, v.contractID)
  writeHash(w, v.contentHash)
}

export function encodeConfigUpgradeSetKey(v: ConfigUpgradeSetKey): Uint8Array {
  return encode(v, writeConfigUpgradeSetKey)
}

export function decodeConfigUpgradeSetKey(input: Uint8Array | string): ConfigUpgradeSetKey {
  return decode(input, readConfigUpgradeSetKey)
}

export function toJsonConfigUpgradeSetKey(v: ConfigUpgradeSetKey): Record<string, unknown> {
  return {
    'contract_id': toJsonContractID(v.contractID),
    'content_hash': toJsonHash(v.contentHash),
  }
}

export function fromJsonConfigUpgradeSetKey(json: unknown): ConfigUpgradeSetKey {
  const o = json as Record<string, unknown>
  return {
    contractID: fromJsonContractID(o['contract_id']),
    contentHash: fromJsonHash(o['content_hash']),
  }
}

export type LedgerUpgrade =
  | { readonly type: 'LEDGER_UPGRADE_VERSION'; readonly newLedgerVersion: uint32 }
  | { readonly type: 'LEDGER_UPGRADE_BASE_FEE'; readonly newBaseFee: uint32 }
  | { readonly type: 'LEDGER_UPGRADE_MAX_TX_SET_SIZE'; readonly newMaxTxSetSize: uint32 }
  | { readonly type: 'LEDGER_UPGRADE_BASE_RESERVE'; readonly newBaseReserve: uint32 }
  | { readonly type: 'LEDGER_UPGRADE_FLAGS'; readonly newFlags: uint32 }
  | { readonly type: 'LEDGER_UPGRADE_CONFIG'; readonly newConfig: ConfigUpgradeSetKey }
  | { readonly type: 'LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE'; readonly newMaxSorobanTxSetSize: uint32 }

export function readLedgerUpgrade(r: XdrReader): LedgerUpgrade {
  beginComposite(r)
  try {
    const type = readLedgerUpgradeType(r)
    let result: LedgerUpgrade
    switch (type) {
      case 'LEDGER_UPGRADE_VERSION':
        result = { type, newLedgerVersion: readuint32(r) }; break
      case 'LEDGER_UPGRADE_BASE_FEE':
        result = { type, newBaseFee: readuint32(r) }; break
      case 'LEDGER_UPGRADE_MAX_TX_SET_SIZE':
        result = { type, newMaxTxSetSize: readuint32(r) }; break
      case 'LEDGER_UPGRADE_BASE_RESERVE':
        result = { type, newBaseReserve: readuint32(r) }; break
      case 'LEDGER_UPGRADE_FLAGS':
        result = { type, newFlags: readuint32(r) }; break
      case 'LEDGER_UPGRADE_CONFIG':
        result = { type, newConfig: readConfigUpgradeSetKey(r) }; break
      case 'LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE':
        result = { type, newMaxSorobanTxSetSize: readuint32(r) }; break
      default:
        throw new XdrReadError(`Unknown LedgerUpgrade discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerUpgrade(w: XdrWriter, v: LedgerUpgrade): void {
  writeLedgerUpgradeType(w, v.type)
  switch (v.type) {
    case 'LEDGER_UPGRADE_VERSION':
      writeuint32(w, (v as any).newLedgerVersion); break
    case 'LEDGER_UPGRADE_BASE_FEE':
      writeuint32(w, (v as any).newBaseFee); break
    case 'LEDGER_UPGRADE_MAX_TX_SET_SIZE':
      writeuint32(w, (v as any).newMaxTxSetSize); break
    case 'LEDGER_UPGRADE_BASE_RESERVE':
      writeuint32(w, (v as any).newBaseReserve); break
    case 'LEDGER_UPGRADE_FLAGS':
      writeuint32(w, (v as any).newFlags); break
    case 'LEDGER_UPGRADE_CONFIG':
      writeConfigUpgradeSetKey(w, (v as any).newConfig); break
    case 'LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE':
      writeuint32(w, (v as any).newMaxSorobanTxSetSize); break
  }
}

export function encodeLedgerUpgrade(v: LedgerUpgrade): Uint8Array {
  return encode(v, writeLedgerUpgrade)
}

export function decodeLedgerUpgrade(input: Uint8Array | string): LedgerUpgrade {
  return decode(input, readLedgerUpgrade)
}

export function toJsonLedgerUpgrade(v: LedgerUpgrade): unknown {
  switch (v.type) {
    case 'LEDGER_UPGRADE_VERSION':
      return { 'version': toJsonuint32((v as any).newLedgerVersion) }
    case 'LEDGER_UPGRADE_BASE_FEE':
      return { 'base_fee': toJsonuint32((v as any).newBaseFee) }
    case 'LEDGER_UPGRADE_MAX_TX_SET_SIZE':
      return { 'max_tx_set_size': toJsonuint32((v as any).newMaxTxSetSize) }
    case 'LEDGER_UPGRADE_BASE_RESERVE':
      return { 'base_reserve': toJsonuint32((v as any).newBaseReserve) }
    case 'LEDGER_UPGRADE_FLAGS':
      return { 'flags': toJsonuint32((v as any).newFlags) }
    case 'LEDGER_UPGRADE_CONFIG':
      return { 'config': toJsonConfigUpgradeSetKey((v as any).newConfig) }
    case 'LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE':
      return { 'max_soroban_tx_set_size': toJsonuint32((v as any).newMaxSorobanTxSetSize) }
  }
}

export function fromJsonLedgerUpgrade(json: unknown): LedgerUpgrade {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for LedgerUpgrade: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'version':
      return { type: 'LEDGER_UPGRADE_VERSION', newLedgerVersion: fromJsonuint32(obj[key]) } as LedgerUpgrade
    case 'base_fee':
      return { type: 'LEDGER_UPGRADE_BASE_FEE', newBaseFee: fromJsonuint32(obj[key]) } as LedgerUpgrade
    case 'max_tx_set_size':
      return { type: 'LEDGER_UPGRADE_MAX_TX_SET_SIZE', newMaxTxSetSize: fromJsonuint32(obj[key]) } as LedgerUpgrade
    case 'base_reserve':
      return { type: 'LEDGER_UPGRADE_BASE_RESERVE', newBaseReserve: fromJsonuint32(obj[key]) } as LedgerUpgrade
    case 'flags':
      return { type: 'LEDGER_UPGRADE_FLAGS', newFlags: fromJsonuint32(obj[key]) } as LedgerUpgrade
    case 'config':
      return { type: 'LEDGER_UPGRADE_CONFIG', newConfig: fromJsonConfigUpgradeSetKey(obj[key]) } as LedgerUpgrade
    case 'max_soroban_tx_set_size':
      return { type: 'LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE', newMaxSorobanTxSetSize: fromJsonuint32(obj[key]) } as LedgerUpgrade
    default: throw new Error(`Unknown LedgerUpgrade variant: ${key}`)
  }
}

export interface ConfigUpgradeSet {
  readonly updatedEntry: ConfigSettingEntry[]
}

export function readConfigUpgradeSet(r: XdrReader): ConfigUpgradeSet {
  beginComposite(r)
  try {
    const updatedEntry = readVarArray(r, UINT32_MAX, readConfigSettingEntry)
    return { updatedEntry }
  } finally {
    endComposite(r)
  }
}

export function writeConfigUpgradeSet(w: XdrWriter, v: ConfigUpgradeSet): void {
  writeVarArray(w, v.updatedEntry, UINT32_MAX, writeConfigSettingEntry)
}

export function encodeConfigUpgradeSet(v: ConfigUpgradeSet): Uint8Array {
  return encode(v, writeConfigUpgradeSet)
}

export function decodeConfigUpgradeSet(input: Uint8Array | string): ConfigUpgradeSet {
  return decode(input, readConfigUpgradeSet)
}

export function toJsonConfigUpgradeSet(v: ConfigUpgradeSet): Record<string, unknown> {
  return {
    'updated_entry': v.updatedEntry.map((item: any) => toJsonConfigSettingEntry(item)),
  }
}

export function fromJsonConfigUpgradeSet(json: unknown): ConfigUpgradeSet {
  const o = json as Record<string, unknown>
  return {
    updatedEntry: ((o['updated_entry']) as unknown[]).map((item: unknown) => fromJsonConfigSettingEntry(item)),
  }
}

export type TxSetComponentType =
  | 'TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE'

export const TX_SET_COMPONENT_TYPE_TO_INT: Record<TxSetComponentType, number> = /*#__PURE__*/ {
  TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE: 0,
}

export const TX_SET_COMPONENT_TYPE_FROM_INT: Record<number, TxSetComponentType> = /*#__PURE__*/ {
  0: 'TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE',
}

export function readTxSetComponentType(r: XdrReader): TxSetComponentType {
  const v = readInt32(r)
  const result = TX_SET_COMPONENT_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown TxSetComponentType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeTxSetComponentType(w: XdrWriter, v: TxSetComponentType): void {
  writeInt32(w, TX_SET_COMPONENT_TYPE_TO_INT[v])
}

export function encodeTxSetComponentType(v: TxSetComponentType): Uint8Array {
  return encode(v, writeTxSetComponentType)
}

export function decodeTxSetComponentType(input: Uint8Array | string): TxSetComponentType {
  return decode(input, readTxSetComponentType)
}

const _TX_SET_COMPONENT_TYPE_TO_JSON: Record<TxSetComponentType, string> = /*#__PURE__*/ {
  TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE: 'txset_comp_txs_maybe_discounted_fee',
}

const _TX_SET_COMPONENT_TYPE_FROM_JSON: Record<string, TxSetComponentType> = /*#__PURE__*/ {
  'txset_comp_txs_maybe_discounted_fee': 'TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE',
}

export function toJsonTxSetComponentType(v: TxSetComponentType): string {
  return _TX_SET_COMPONENT_TYPE_TO_JSON[v]
}

export function fromJsonTxSetComponentType(json: unknown): TxSetComponentType {
  const result = _TX_SET_COMPONENT_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown TxSetComponentType JSON value: ${json}`)
  return result
}

/**
 * A collection of transactions that *may* have arbitrary read-write data
 * dependencies between each other, i.e. in a general case the transaction
 * execution order within a cluster may not be arbitrarily shuffled without
 * affecting the end result.
 */
export type DependentTxCluster = TransactionEnvelope[]

export function readDependentTxCluster(r: XdrReader): DependentTxCluster {
  return readVarArray(r, UINT32_MAX, readTransactionEnvelope)
}

export function writeDependentTxCluster(w: XdrWriter, v: DependentTxCluster): void {
  writeVarArray(w, v, UINT32_MAX, writeTransactionEnvelope)
}

export function encodeDependentTxCluster(v: DependentTxCluster): Uint8Array {
  return encode(v, writeDependentTxCluster)
}

export function decodeDependentTxCluster(input: Uint8Array | string): DependentTxCluster {
  return decode(input, readDependentTxCluster)
}

export function toJsonDependentTxCluster(v: DependentTxCluster): unknown {
  return v.map((item: any) => toJsonTransactionEnvelope(item))
}

export function fromJsonDependentTxCluster(json: unknown): DependentTxCluster {
  return ((json) as unknown[]).map((item: unknown) => fromJsonTransactionEnvelope(item))
}

/**
 * A collection of clusters such that are *guaranteed* to not have read-write 
 * data dependencies in-between clusters, i.e. such that the cluster execution 
 * order can be arbitrarily shuffled without affecting the end result. Thus
 * clusters can be executed in parallel with respect to each other.
 */
export type ParallelTxExecutionStage = DependentTxCluster[]

export function readParallelTxExecutionStage(r: XdrReader): ParallelTxExecutionStage {
  return readVarArray(r, UINT32_MAX, readDependentTxCluster)
}

export function writeParallelTxExecutionStage(w: XdrWriter, v: ParallelTxExecutionStage): void {
  writeVarArray(w, v, UINT32_MAX, writeDependentTxCluster)
}

export function encodeParallelTxExecutionStage(v: ParallelTxExecutionStage): Uint8Array {
  return encode(v, writeParallelTxExecutionStage)
}

export function decodeParallelTxExecutionStage(input: Uint8Array | string): ParallelTxExecutionStage {
  return decode(input, readParallelTxExecutionStage)
}

export function toJsonParallelTxExecutionStage(v: ParallelTxExecutionStage): unknown {
  return v.map((item: any) => toJsonDependentTxCluster(item))
}

export function fromJsonParallelTxExecutionStage(json: unknown): ParallelTxExecutionStage {
  return ((json) as unknown[]).map((item: unknown) => fromJsonDependentTxCluster(item))
}

/**
 * Transaction set component that contains transactions organized in a 
 * parallelism-friendly fashion.
 * 
 * The component consists of several stages that have to be executed in 
 * sequential order, each stage consists of several clusters that can be 
 * executed in parallel, and the cluster itself consists of several 
 * transactions that have to be executed in sequential order in a general case.
 */
export interface ParallelTxsComponent {
  readonly baseFee: int64 | undefined
  /**
   * A sequence of stages that *may* have arbitrary data dependencies between
   * each other, i.e. in a general case the stage execution order may not be
   * arbitrarily shuffled without affecting the end result.
   */
  readonly executionStages: ParallelTxExecutionStage[]
}

export function readParallelTxsComponent(r: XdrReader): ParallelTxsComponent {
  beginComposite(r)
  try {
    const baseFee = readOptional(r, readint64)
    const executionStages = readVarArray(r, UINT32_MAX, readParallelTxExecutionStage)
    return { baseFee, executionStages }
  } finally {
    endComposite(r)
  }
}

export function writeParallelTxsComponent(w: XdrWriter, v: ParallelTxsComponent): void {
  writeOptional(w, v.baseFee, writeint64)
  writeVarArray(w, v.executionStages, UINT32_MAX, writeParallelTxExecutionStage)
}

export function encodeParallelTxsComponent(v: ParallelTxsComponent): Uint8Array {
  return encode(v, writeParallelTxsComponent)
}

export function decodeParallelTxsComponent(input: Uint8Array | string): ParallelTxsComponent {
  return decode(input, readParallelTxsComponent)
}

export function toJsonParallelTxsComponent(v: ParallelTxsComponent): Record<string, unknown> {
  return {
    'base_fee': v.baseFee !== undefined ? toJsonint64(v.baseFee) : null,
    'execution_stages': v.executionStages.map((item: any) => toJsonParallelTxExecutionStage(item)),
  }
}

export function fromJsonParallelTxsComponent(json: unknown): ParallelTxsComponent {
  const o = json as Record<string, unknown>
  return {
    baseFee: (o['base_fee']) != null ? fromJsonint64(o['base_fee']) : undefined,
    executionStages: ((o['execution_stages']) as unknown[]).map((item: unknown) => fromJsonParallelTxExecutionStage(item)),
  }
}

export interface TxSetComponent_txsMaybeDiscountedFee {
  readonly baseFee: int64 | undefined
  readonly txs: TransactionEnvelope[]
}

export function readTxSetComponent_txsMaybeDiscountedFee(r: XdrReader): TxSetComponent_txsMaybeDiscountedFee {
  beginComposite(r)
  try {
    const baseFee = readOptional(r, readint64)
    const txs = readVarArray(r, UINT32_MAX, readTransactionEnvelope)
    return { baseFee, txs }
  } finally {
    endComposite(r)
  }
}

export function writeTxSetComponent_txsMaybeDiscountedFee(w: XdrWriter, v: TxSetComponent_txsMaybeDiscountedFee): void {
  writeOptional(w, v.baseFee, writeint64)
  writeVarArray(w, v.txs, UINT32_MAX, writeTransactionEnvelope)
}

export function encodeTxSetComponent_txsMaybeDiscountedFee(v: TxSetComponent_txsMaybeDiscountedFee): Uint8Array {
  return encode(v, writeTxSetComponent_txsMaybeDiscountedFee)
}

export function decodeTxSetComponent_txsMaybeDiscountedFee(input: Uint8Array | string): TxSetComponent_txsMaybeDiscountedFee {
  return decode(input, readTxSetComponent_txsMaybeDiscountedFee)
}

export function toJsonTxSetComponent_txsMaybeDiscountedFee(v: TxSetComponent_txsMaybeDiscountedFee): Record<string, unknown> {
  return {
    'base_fee': v.baseFee !== undefined ? toJsonint64(v.baseFee) : null,
    'txs': v.txs.map((item: any) => toJsonTransactionEnvelope(item)),
  }
}

export function fromJsonTxSetComponent_txsMaybeDiscountedFee(json: unknown): TxSetComponent_txsMaybeDiscountedFee {
  const o = json as Record<string, unknown>
  return {
    baseFee: (o['base_fee']) != null ? fromJsonint64(o['base_fee']) : undefined,
    txs: ((o['txs']) as unknown[]).map((item: unknown) => fromJsonTransactionEnvelope(item)),
  }
}

export type TxSetComponent =
  | { readonly type: 'TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE'; readonly txsMaybeDiscountedFee: TxSetComponent_txsMaybeDiscountedFee }

export function readTxSetComponent(r: XdrReader): TxSetComponent {
  beginComposite(r)
  try {
    const type = readTxSetComponentType(r)
    let result: TxSetComponent
    switch (type) {
      case 'TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE':
        result = { type, txsMaybeDiscountedFee: readTxSetComponent_txsMaybeDiscountedFee(r) }; break
      default:
        throw new XdrReadError(`Unknown TxSetComponent discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTxSetComponent(w: XdrWriter, v: TxSetComponent): void {
  writeTxSetComponentType(w, v.type)
  switch (v.type) {
    case 'TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE':
      writeTxSetComponent_txsMaybeDiscountedFee(w, (v as any).txsMaybeDiscountedFee); break
  }
}

export function encodeTxSetComponent(v: TxSetComponent): Uint8Array {
  return encode(v, writeTxSetComponent)
}

export function decodeTxSetComponent(input: Uint8Array | string): TxSetComponent {
  return decode(input, readTxSetComponent)
}

export function toJsonTxSetComponent(v: TxSetComponent): unknown {
  switch (v.type) {
    case 'TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE':
      return { 'txset_comp_txs_maybe_discounted_fee': toJsonTxSetComponent_txsMaybeDiscountedFee((v as any).txsMaybeDiscountedFee) }
  }
}

export function fromJsonTxSetComponent(json: unknown): TxSetComponent {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for TxSetComponent: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'txset_comp_txs_maybe_discounted_fee':
      return { type: 'TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE', txsMaybeDiscountedFee: fromJsonTxSetComponent_txsMaybeDiscountedFee(obj[key]) } as TxSetComponent
    default: throw new Error(`Unknown TxSetComponent variant: ${key}`)
  }
}

export type TransactionPhase =
  | { readonly v: 0; readonly v0Components: TxSetComponent[] }
  | { readonly v: 1; readonly parallelTxsComponent: ParallelTxsComponent }

export function readTransactionPhase(r: XdrReader): TransactionPhase {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: TransactionPhase
    switch (v) {
      case 0:
        result = { v, v0Components: readVarArray(r, UINT32_MAX, readTxSetComponent) }; break
      case 1:
        result = { v, parallelTxsComponent: readParallelTxsComponent(r) }; break
      default:
        throw new XdrReadError(`Unknown TransactionPhase discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTransactionPhase(w: XdrWriter, v: TransactionPhase): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      writeVarArray(w, (v as any).v0Components, UINT32_MAX, writeTxSetComponent); break
    case 1:
      writeParallelTxsComponent(w, (v as any).parallelTxsComponent); break
  }
}

export function encodeTransactionPhase(v: TransactionPhase): Uint8Array {
  return encode(v, writeTransactionPhase)
}

export function decodeTransactionPhase(input: Uint8Array | string): TransactionPhase {
  return decode(input, readTransactionPhase)
}

export function toJsonTransactionPhase(v: TransactionPhase): unknown {
  switch (v.v) {
    case 0:
      return { 'v0': (v as any).v0Components.map((item: any) => toJsonTxSetComponent(item)) }
    case 1:
      return { 'v1': toJsonParallelTxsComponent((v as any).parallelTxsComponent) }
  }
}

export function fromJsonTransactionPhase(json: unknown): TransactionPhase {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for TransactionPhase: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v0':
      return { v: 0, v0Components: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonTxSetComponent(item)) } as TransactionPhase
    case 'v1':
      return { v: 1, parallelTxsComponent: fromJsonParallelTxsComponent(obj[key]) } as TransactionPhase
    default: throw new Error(`Unknown TransactionPhase variant: ${key}`)
  }
}

/**
 * Transaction sets are the unit used by SCP to decide on transitions
 * between ledgers
 */
export interface TransactionSet {
  readonly previousLedgerHash: Hash
  readonly txs: TransactionEnvelope[]
}

export function readTransactionSet(r: XdrReader): TransactionSet {
  beginComposite(r)
  try {
    const previousLedgerHash = readHash(r)
    const txs = readVarArray(r, UINT32_MAX, readTransactionEnvelope)
    return { previousLedgerHash, txs }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionSet(w: XdrWriter, v: TransactionSet): void {
  writeHash(w, v.previousLedgerHash)
  writeVarArray(w, v.txs, UINT32_MAX, writeTransactionEnvelope)
}

export function encodeTransactionSet(v: TransactionSet): Uint8Array {
  return encode(v, writeTransactionSet)
}

export function decodeTransactionSet(input: Uint8Array | string): TransactionSet {
  return decode(input, readTransactionSet)
}

export function toJsonTransactionSet(v: TransactionSet): Record<string, unknown> {
  return {
    'previous_ledger_hash': toJsonHash(v.previousLedgerHash),
    'txs': v.txs.map((item: any) => toJsonTransactionEnvelope(item)),
  }
}

export function fromJsonTransactionSet(json: unknown): TransactionSet {
  const o = json as Record<string, unknown>
  return {
    previousLedgerHash: fromJsonHash(o['previous_ledger_hash']),
    txs: ((o['txs']) as unknown[]).map((item: unknown) => fromJsonTransactionEnvelope(item)),
  }
}

export interface TransactionSetV1 {
  readonly previousLedgerHash: Hash
  readonly phases: TransactionPhase[]
}

export function readTransactionSetV1(r: XdrReader): TransactionSetV1 {
  beginComposite(r)
  try {
    const previousLedgerHash = readHash(r)
    const phases = readVarArray(r, UINT32_MAX, readTransactionPhase)
    return { previousLedgerHash, phases }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionSetV1(w: XdrWriter, v: TransactionSetV1): void {
  writeHash(w, v.previousLedgerHash)
  writeVarArray(w, v.phases, UINT32_MAX, writeTransactionPhase)
}

export function encodeTransactionSetV1(v: TransactionSetV1): Uint8Array {
  return encode(v, writeTransactionSetV1)
}

export function decodeTransactionSetV1(input: Uint8Array | string): TransactionSetV1 {
  return decode(input, readTransactionSetV1)
}

export function toJsonTransactionSetV1(v: TransactionSetV1): Record<string, unknown> {
  return {
    'previous_ledger_hash': toJsonHash(v.previousLedgerHash),
    'phases': v.phases.map((item: any) => toJsonTransactionPhase(item)),
  }
}

export function fromJsonTransactionSetV1(json: unknown): TransactionSetV1 {
  const o = json as Record<string, unknown>
  return {
    previousLedgerHash: fromJsonHash(o['previous_ledger_hash']),
    phases: ((o['phases']) as unknown[]).map((item: unknown) => fromJsonTransactionPhase(item)),
  }
}

export type GeneralizedTransactionSet =
  | { readonly v: 1; readonly v1TxSet: TransactionSetV1 }

export function readGeneralizedTransactionSet(r: XdrReader): GeneralizedTransactionSet {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: GeneralizedTransactionSet
    switch (v) {
      case 1:
        result = { v, v1TxSet: readTransactionSetV1(r) }; break
      default:
        throw new XdrReadError(`Unknown GeneralizedTransactionSet discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeGeneralizedTransactionSet(w: XdrWriter, v: GeneralizedTransactionSet): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 1:
      writeTransactionSetV1(w, (v as any).v1TxSet); break
  }
}

export function encodeGeneralizedTransactionSet(v: GeneralizedTransactionSet): Uint8Array {
  return encode(v, writeGeneralizedTransactionSet)
}

export function decodeGeneralizedTransactionSet(input: Uint8Array | string): GeneralizedTransactionSet {
  return decode(input, readGeneralizedTransactionSet)
}

export function toJsonGeneralizedTransactionSet(v: GeneralizedTransactionSet): unknown {
  switch (v.v) {
    case 1:
      return { 'v1': toJsonTransactionSetV1((v as any).v1TxSet) }
  }
}

export function fromJsonGeneralizedTransactionSet(json: unknown): GeneralizedTransactionSet {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for GeneralizedTransactionSet: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, v1TxSet: fromJsonTransactionSetV1(obj[key]) } as GeneralizedTransactionSet
    default: throw new Error(`Unknown GeneralizedTransactionSet variant: ${key}`)
  }
}

export interface TransactionResultPair {
  readonly transactionHash: Hash
  readonly result: TransactionResult
}

export function readTransactionResultPair(r: XdrReader): TransactionResultPair {
  beginComposite(r)
  try {
    const transactionHash = readHash(r)
    const result = readTransactionResult(r)
    return { transactionHash, result }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionResultPair(w: XdrWriter, v: TransactionResultPair): void {
  writeHash(w, v.transactionHash)
  writeTransactionResult(w, v.result)
}

export function encodeTransactionResultPair(v: TransactionResultPair): Uint8Array {
  return encode(v, writeTransactionResultPair)
}

export function decodeTransactionResultPair(input: Uint8Array | string): TransactionResultPair {
  return decode(input, readTransactionResultPair)
}

export function toJsonTransactionResultPair(v: TransactionResultPair): Record<string, unknown> {
  return {
    'transaction_hash': toJsonHash(v.transactionHash),
    'result': toJsonTransactionResult(v.result),
  }
}

export function fromJsonTransactionResultPair(json: unknown): TransactionResultPair {
  const o = json as Record<string, unknown>
  return {
    transactionHash: fromJsonHash(o['transaction_hash']),
    result: fromJsonTransactionResult(o['result']),
  }
}

/** TransactionResultSet is used to recover results between ledgers */
export interface TransactionResultSet {
  readonly results: TransactionResultPair[]
}

export function readTransactionResultSet(r: XdrReader): TransactionResultSet {
  beginComposite(r)
  try {
    const results = readVarArray(r, UINT32_MAX, readTransactionResultPair)
    return { results }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionResultSet(w: XdrWriter, v: TransactionResultSet): void {
  writeVarArray(w, v.results, UINT32_MAX, writeTransactionResultPair)
}

export function encodeTransactionResultSet(v: TransactionResultSet): Uint8Array {
  return encode(v, writeTransactionResultSet)
}

export function decodeTransactionResultSet(input: Uint8Array | string): TransactionResultSet {
  return decode(input, readTransactionResultSet)
}

export function toJsonTransactionResultSet(v: TransactionResultSet): Record<string, unknown> {
  return {
    'results': v.results.map((item: any) => toJsonTransactionResultPair(item)),
  }
}

export function fromJsonTransactionResultSet(json: unknown): TransactionResultSet {
  const o = json as Record<string, unknown>
  return {
    results: ((o['results']) as unknown[]).map((item: unknown) => fromJsonTransactionResultPair(item)),
  }
}

export type TransactionHistoryEntry_ext =
  | { readonly v: 0 }
  | { readonly v: 1; readonly generalizedTxSet: GeneralizedTransactionSet }

export function readTransactionHistoryEntry_ext(r: XdrReader): TransactionHistoryEntry_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: TransactionHistoryEntry_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, generalizedTxSet: readGeneralizedTransactionSet(r) }; break
      default:
        throw new XdrReadError(`Unknown TransactionHistoryEntry_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTransactionHistoryEntry_ext(w: XdrWriter, v: TransactionHistoryEntry_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeGeneralizedTransactionSet(w, (v as any).generalizedTxSet); break
  }
}

export function encodeTransactionHistoryEntry_ext(v: TransactionHistoryEntry_ext): Uint8Array {
  return encode(v, writeTransactionHistoryEntry_ext)
}

export function decodeTransactionHistoryEntry_ext(input: Uint8Array | string): TransactionHistoryEntry_ext {
  return decode(input, readTransactionHistoryEntry_ext)
}

export function toJsonTransactionHistoryEntry_ext(v: TransactionHistoryEntry_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonGeneralizedTransactionSet((v as any).generalizedTxSet) }
  }
}

export function fromJsonTransactionHistoryEntry_ext(json: unknown): TransactionHistoryEntry_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as TransactionHistoryEntry_ext
    throw new Error(`Unknown TransactionHistoryEntry_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, generalizedTxSet: fromJsonGeneralizedTransactionSet(obj[key]) } as TransactionHistoryEntry_ext
    default: throw new Error(`Unknown TransactionHistoryEntry_ext variant: ${key}`)
  }
}

export interface TransactionHistoryEntry {
  readonly ledgerSeq: uint32
  readonly txSet: TransactionSet
  /** when v != 0, txSet must be empty */
  readonly ext: TransactionHistoryEntry_ext
}

export function readTransactionHistoryEntry(r: XdrReader): TransactionHistoryEntry {
  beginComposite(r)
  try {
    const ledgerSeq = readuint32(r)
    const txSet = readTransactionSet(r)
    const ext = readTransactionHistoryEntry_ext(r)
    return { ledgerSeq, txSet, ext }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionHistoryEntry(w: XdrWriter, v: TransactionHistoryEntry): void {
  writeuint32(w, v.ledgerSeq)
  writeTransactionSet(w, v.txSet)
  writeTransactionHistoryEntry_ext(w, v.ext)
}

export function encodeTransactionHistoryEntry(v: TransactionHistoryEntry): Uint8Array {
  return encode(v, writeTransactionHistoryEntry)
}

export function decodeTransactionHistoryEntry(input: Uint8Array | string): TransactionHistoryEntry {
  return decode(input, readTransactionHistoryEntry)
}

export function toJsonTransactionHistoryEntry(v: TransactionHistoryEntry): Record<string, unknown> {
  return {
    'ledger_seq': toJsonuint32(v.ledgerSeq),
    'tx_set': toJsonTransactionSet(v.txSet),
    'ext': toJsonTransactionHistoryEntry_ext(v.ext),
  }
}

export function fromJsonTransactionHistoryEntry(json: unknown): TransactionHistoryEntry {
  const o = json as Record<string, unknown>
  return {
    ledgerSeq: fromJsonuint32(o['ledger_seq']),
    txSet: fromJsonTransactionSet(o['tx_set']),
    ext: fromJsonTransactionHistoryEntry_ext(o['ext']),
  }
}

export type TransactionHistoryResultEntry_ext =
  | { readonly v: 0 }

export function readTransactionHistoryResultEntry_ext(r: XdrReader): TransactionHistoryResultEntry_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: TransactionHistoryResultEntry_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown TransactionHistoryResultEntry_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTransactionHistoryResultEntry_ext(w: XdrWriter, v: TransactionHistoryResultEntry_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeTransactionHistoryResultEntry_ext(v: TransactionHistoryResultEntry_ext): Uint8Array {
  return encode(v, writeTransactionHistoryResultEntry_ext)
}

export function decodeTransactionHistoryResultEntry_ext(input: Uint8Array | string): TransactionHistoryResultEntry_ext {
  return decode(input, readTransactionHistoryResultEntry_ext)
}

export function toJsonTransactionHistoryResultEntry_ext(v: TransactionHistoryResultEntry_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonTransactionHistoryResultEntry_ext(json: unknown): TransactionHistoryResultEntry_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as TransactionHistoryResultEntry_ext
    throw new Error(`Unknown TransactionHistoryResultEntry_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown TransactionHistoryResultEntry_ext variant: ${key}`)
  }
}

export interface TransactionHistoryResultEntry {
  readonly ledgerSeq: uint32
  readonly txResultSet: TransactionResultSet
  /** reserved for future use */
  readonly ext: TransactionHistoryResultEntry_ext
}

export function readTransactionHistoryResultEntry(r: XdrReader): TransactionHistoryResultEntry {
  beginComposite(r)
  try {
    const ledgerSeq = readuint32(r)
    const txResultSet = readTransactionResultSet(r)
    const ext = readTransactionHistoryResultEntry_ext(r)
    return { ledgerSeq, txResultSet, ext }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionHistoryResultEntry(w: XdrWriter, v: TransactionHistoryResultEntry): void {
  writeuint32(w, v.ledgerSeq)
  writeTransactionResultSet(w, v.txResultSet)
  writeTransactionHistoryResultEntry_ext(w, v.ext)
}

export function encodeTransactionHistoryResultEntry(v: TransactionHistoryResultEntry): Uint8Array {
  return encode(v, writeTransactionHistoryResultEntry)
}

export function decodeTransactionHistoryResultEntry(input: Uint8Array | string): TransactionHistoryResultEntry {
  return decode(input, readTransactionHistoryResultEntry)
}

export function toJsonTransactionHistoryResultEntry(v: TransactionHistoryResultEntry): Record<string, unknown> {
  return {
    'ledger_seq': toJsonuint32(v.ledgerSeq),
    'tx_result_set': toJsonTransactionResultSet(v.txResultSet),
    'ext': toJsonTransactionHistoryResultEntry_ext(v.ext),
  }
}

export function fromJsonTransactionHistoryResultEntry(json: unknown): TransactionHistoryResultEntry {
  const o = json as Record<string, unknown>
  return {
    ledgerSeq: fromJsonuint32(o['ledger_seq']),
    txResultSet: fromJsonTransactionResultSet(o['tx_result_set']),
    ext: fromJsonTransactionHistoryResultEntry_ext(o['ext']),
  }
}

export type LedgerHeaderHistoryEntry_ext =
  | { readonly v: 0 }

export function readLedgerHeaderHistoryEntry_ext(r: XdrReader): LedgerHeaderHistoryEntry_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: LedgerHeaderHistoryEntry_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown LedgerHeaderHistoryEntry_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerHeaderHistoryEntry_ext(w: XdrWriter, v: LedgerHeaderHistoryEntry_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeLedgerHeaderHistoryEntry_ext(v: LedgerHeaderHistoryEntry_ext): Uint8Array {
  return encode(v, writeLedgerHeaderHistoryEntry_ext)
}

export function decodeLedgerHeaderHistoryEntry_ext(input: Uint8Array | string): LedgerHeaderHistoryEntry_ext {
  return decode(input, readLedgerHeaderHistoryEntry_ext)
}

export function toJsonLedgerHeaderHistoryEntry_ext(v: LedgerHeaderHistoryEntry_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonLedgerHeaderHistoryEntry_ext(json: unknown): LedgerHeaderHistoryEntry_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as LedgerHeaderHistoryEntry_ext
    throw new Error(`Unknown LedgerHeaderHistoryEntry_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown LedgerHeaderHistoryEntry_ext variant: ${key}`)
  }
}

export interface LedgerHeaderHistoryEntry {
  readonly hash: Hash
  readonly header: LedgerHeader
  /** reserved for future use */
  readonly ext: LedgerHeaderHistoryEntry_ext
}

export function readLedgerHeaderHistoryEntry(r: XdrReader): LedgerHeaderHistoryEntry {
  beginComposite(r)
  try {
    const hash = readHash(r)
    const header = readLedgerHeader(r)
    const ext = readLedgerHeaderHistoryEntry_ext(r)
    return { hash, header, ext }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerHeaderHistoryEntry(w: XdrWriter, v: LedgerHeaderHistoryEntry): void {
  writeHash(w, v.hash)
  writeLedgerHeader(w, v.header)
  writeLedgerHeaderHistoryEntry_ext(w, v.ext)
}

export function encodeLedgerHeaderHistoryEntry(v: LedgerHeaderHistoryEntry): Uint8Array {
  return encode(v, writeLedgerHeaderHistoryEntry)
}

export function decodeLedgerHeaderHistoryEntry(input: Uint8Array | string): LedgerHeaderHistoryEntry {
  return decode(input, readLedgerHeaderHistoryEntry)
}

export function toJsonLedgerHeaderHistoryEntry(v: LedgerHeaderHistoryEntry): Record<string, unknown> {
  return {
    'hash': toJsonHash(v.hash),
    'header': toJsonLedgerHeader(v.header),
    'ext': toJsonLedgerHeaderHistoryEntry_ext(v.ext),
  }
}

export function fromJsonLedgerHeaderHistoryEntry(json: unknown): LedgerHeaderHistoryEntry {
  const o = json as Record<string, unknown>
  return {
    hash: fromJsonHash(o['hash']),
    header: fromJsonLedgerHeader(o['header']),
    ext: fromJsonLedgerHeaderHistoryEntry_ext(o['ext']),
  }
}

export interface LedgerSCPMessages {
  readonly ledgerSeq: uint32
  readonly messages: SCPEnvelope[]
}

export function readLedgerSCPMessages(r: XdrReader): LedgerSCPMessages {
  beginComposite(r)
  try {
    const ledgerSeq = readuint32(r)
    const messages = readVarArray(r, UINT32_MAX, readSCPEnvelope)
    return { ledgerSeq, messages }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerSCPMessages(w: XdrWriter, v: LedgerSCPMessages): void {
  writeuint32(w, v.ledgerSeq)
  writeVarArray(w, v.messages, UINT32_MAX, writeSCPEnvelope)
}

export function encodeLedgerSCPMessages(v: LedgerSCPMessages): Uint8Array {
  return encode(v, writeLedgerSCPMessages)
}

export function decodeLedgerSCPMessages(input: Uint8Array | string): LedgerSCPMessages {
  return decode(input, readLedgerSCPMessages)
}

export function toJsonLedgerSCPMessages(v: LedgerSCPMessages): Record<string, unknown> {
  return {
    'ledger_seq': toJsonuint32(v.ledgerSeq),
    'messages': v.messages.map((item: any) => toJsonSCPEnvelope(item)),
  }
}

export function fromJsonLedgerSCPMessages(json: unknown): LedgerSCPMessages {
  const o = json as Record<string, unknown>
  return {
    ledgerSeq: fromJsonuint32(o['ledger_seq']),
    messages: ((o['messages']) as unknown[]).map((item: unknown) => fromJsonSCPEnvelope(item)),
  }
}

/**
 * note: ledgerMessages may refer to any quorumSets encountered
 * in the file so far, not just the one from this entry
 */
export interface SCPHistoryEntryV0 {
  readonly quorumSets: SCPQuorumSet[]
  /** additional quorum sets used by ledgerMessages */
  readonly ledgerMessages: LedgerSCPMessages
}

export function readSCPHistoryEntryV0(r: XdrReader): SCPHistoryEntryV0 {
  beginComposite(r)
  try {
    const quorumSets = readVarArray(r, UINT32_MAX, readSCPQuorumSet)
    const ledgerMessages = readLedgerSCPMessages(r)
    return { quorumSets, ledgerMessages }
  } finally {
    endComposite(r)
  }
}

export function writeSCPHistoryEntryV0(w: XdrWriter, v: SCPHistoryEntryV0): void {
  writeVarArray(w, v.quorumSets, UINT32_MAX, writeSCPQuorumSet)
  writeLedgerSCPMessages(w, v.ledgerMessages)
}

export function encodeSCPHistoryEntryV0(v: SCPHistoryEntryV0): Uint8Array {
  return encode(v, writeSCPHistoryEntryV0)
}

export function decodeSCPHistoryEntryV0(input: Uint8Array | string): SCPHistoryEntryV0 {
  return decode(input, readSCPHistoryEntryV0)
}

export function toJsonSCPHistoryEntryV0(v: SCPHistoryEntryV0): Record<string, unknown> {
  return {
    'quorum_sets': v.quorumSets.map((item: any) => toJsonSCPQuorumSet(item)),
    'ledger_messages': toJsonLedgerSCPMessages(v.ledgerMessages),
  }
}

export function fromJsonSCPHistoryEntryV0(json: unknown): SCPHistoryEntryV0 {
  const o = json as Record<string, unknown>
  return {
    quorumSets: ((o['quorum_sets']) as unknown[]).map((item: unknown) => fromJsonSCPQuorumSet(item)),
    ledgerMessages: fromJsonLedgerSCPMessages(o['ledger_messages']),
  }
}

/** SCP history file is an array of these */
export type SCPHistoryEntry =
  | { readonly v: 0; readonly v0: SCPHistoryEntryV0 }

export function readSCPHistoryEntry(r: XdrReader): SCPHistoryEntry {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: SCPHistoryEntry
    switch (v) {
      case 0:
        result = { v, v0: readSCPHistoryEntryV0(r) }; break
      default:
        throw new XdrReadError(`Unknown SCPHistoryEntry discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSCPHistoryEntry(w: XdrWriter, v: SCPHistoryEntry): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      writeSCPHistoryEntryV0(w, (v as any).v0); break
  }
}

export function encodeSCPHistoryEntry(v: SCPHistoryEntry): Uint8Array {
  return encode(v, writeSCPHistoryEntry)
}

export function decodeSCPHistoryEntry(input: Uint8Array | string): SCPHistoryEntry {
  return decode(input, readSCPHistoryEntry)
}

export function toJsonSCPHistoryEntry(v: SCPHistoryEntry): unknown {
  switch (v.v) {
    case 0:
      return { 'v0': toJsonSCPHistoryEntryV0((v as any).v0) }
  }
}

export function fromJsonSCPHistoryEntry(json: unknown): SCPHistoryEntry {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for SCPHistoryEntry: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v0':
      return { v: 0, v0: fromJsonSCPHistoryEntryV0(obj[key]) } as SCPHistoryEntry
    default: throw new Error(`Unknown SCPHistoryEntry variant: ${key}`)
  }
}

export type LedgerEntryChangeType =
  | 'LEDGER_ENTRY_CREATED'
  | 'LEDGER_ENTRY_UPDATED'
  | 'LEDGER_ENTRY_REMOVED'
  | 'LEDGER_ENTRY_STATE'
  | 'LEDGER_ENTRY_RESTORED'

export const LEDGER_ENTRY_CHANGE_TYPE_TO_INT: Record<LedgerEntryChangeType, number> = /*#__PURE__*/ {
  LEDGER_ENTRY_CREATED: 0,
  LEDGER_ENTRY_UPDATED: 1,
  LEDGER_ENTRY_REMOVED: 2,
  LEDGER_ENTRY_STATE: 3,
  LEDGER_ENTRY_RESTORED: 4,
}

export const LEDGER_ENTRY_CHANGE_TYPE_FROM_INT: Record<number, LedgerEntryChangeType> = /*#__PURE__*/ {
  0: 'LEDGER_ENTRY_CREATED',
  1: 'LEDGER_ENTRY_UPDATED',
  2: 'LEDGER_ENTRY_REMOVED',
  3: 'LEDGER_ENTRY_STATE',
  4: 'LEDGER_ENTRY_RESTORED',
}

export function readLedgerEntryChangeType(r: XdrReader): LedgerEntryChangeType {
  const v = readInt32(r)
  const result = LEDGER_ENTRY_CHANGE_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown LedgerEntryChangeType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeLedgerEntryChangeType(w: XdrWriter, v: LedgerEntryChangeType): void {
  writeInt32(w, LEDGER_ENTRY_CHANGE_TYPE_TO_INT[v])
}

export function encodeLedgerEntryChangeType(v: LedgerEntryChangeType): Uint8Array {
  return encode(v, writeLedgerEntryChangeType)
}

export function decodeLedgerEntryChangeType(input: Uint8Array | string): LedgerEntryChangeType {
  return decode(input, readLedgerEntryChangeType)
}

const _LEDGER_ENTRY_CHANGE_TYPE_TO_JSON: Record<LedgerEntryChangeType, string> = /*#__PURE__*/ {
  LEDGER_ENTRY_CREATED: 'created',
  LEDGER_ENTRY_UPDATED: 'updated',
  LEDGER_ENTRY_REMOVED: 'removed',
  LEDGER_ENTRY_STATE: 'state',
  LEDGER_ENTRY_RESTORED: 'restored',
}

const _LEDGER_ENTRY_CHANGE_TYPE_FROM_JSON: Record<string, LedgerEntryChangeType> = /*#__PURE__*/ {
  'created': 'LEDGER_ENTRY_CREATED',
  'updated': 'LEDGER_ENTRY_UPDATED',
  'removed': 'LEDGER_ENTRY_REMOVED',
  'state': 'LEDGER_ENTRY_STATE',
  'restored': 'LEDGER_ENTRY_RESTORED',
}

export function toJsonLedgerEntryChangeType(v: LedgerEntryChangeType): string {
  return _LEDGER_ENTRY_CHANGE_TYPE_TO_JSON[v]
}

export function fromJsonLedgerEntryChangeType(json: unknown): LedgerEntryChangeType {
  const result = _LEDGER_ENTRY_CHANGE_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown LedgerEntryChangeType JSON value: ${json}`)
  return result
}

export type LedgerEntryChange =
  | { readonly type: 'LEDGER_ENTRY_CREATED'; readonly created: LedgerEntry }
  | { readonly type: 'LEDGER_ENTRY_UPDATED'; readonly updated: LedgerEntry }
  | { readonly type: 'LEDGER_ENTRY_REMOVED'; readonly removed: LedgerKey }
  | { readonly type: 'LEDGER_ENTRY_STATE'; readonly state: LedgerEntry }
  | { readonly type: 'LEDGER_ENTRY_RESTORED'; readonly restored: LedgerEntry }

export function readLedgerEntryChange(r: XdrReader): LedgerEntryChange {
  beginComposite(r)
  try {
    const type = readLedgerEntryChangeType(r)
    let result: LedgerEntryChange
    switch (type) {
      case 'LEDGER_ENTRY_CREATED':
        result = { type, created: readLedgerEntry(r) }; break
      case 'LEDGER_ENTRY_UPDATED':
        result = { type, updated: readLedgerEntry(r) }; break
      case 'LEDGER_ENTRY_REMOVED':
        result = { type, removed: readLedgerKey(r) }; break
      case 'LEDGER_ENTRY_STATE':
        result = { type, state: readLedgerEntry(r) }; break
      case 'LEDGER_ENTRY_RESTORED':
        result = { type, restored: readLedgerEntry(r) }; break
      default:
        throw new XdrReadError(`Unknown LedgerEntryChange discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerEntryChange(w: XdrWriter, v: LedgerEntryChange): void {
  writeLedgerEntryChangeType(w, v.type)
  switch (v.type) {
    case 'LEDGER_ENTRY_CREATED':
      writeLedgerEntry(w, (v as any).created); break
    case 'LEDGER_ENTRY_UPDATED':
      writeLedgerEntry(w, (v as any).updated); break
    case 'LEDGER_ENTRY_REMOVED':
      writeLedgerKey(w, (v as any).removed); break
    case 'LEDGER_ENTRY_STATE':
      writeLedgerEntry(w, (v as any).state); break
    case 'LEDGER_ENTRY_RESTORED':
      writeLedgerEntry(w, (v as any).restored); break
  }
}

export function encodeLedgerEntryChange(v: LedgerEntryChange): Uint8Array {
  return encode(v, writeLedgerEntryChange)
}

export function decodeLedgerEntryChange(input: Uint8Array | string): LedgerEntryChange {
  return decode(input, readLedgerEntryChange)
}

export function toJsonLedgerEntryChange(v: LedgerEntryChange): unknown {
  switch (v.type) {
    case 'LEDGER_ENTRY_CREATED':
      return { 'created': toJsonLedgerEntry((v as any).created) }
    case 'LEDGER_ENTRY_UPDATED':
      return { 'updated': toJsonLedgerEntry((v as any).updated) }
    case 'LEDGER_ENTRY_REMOVED':
      return { 'removed': toJsonLedgerKey((v as any).removed) }
    case 'LEDGER_ENTRY_STATE':
      return { 'state': toJsonLedgerEntry((v as any).state) }
    case 'LEDGER_ENTRY_RESTORED':
      return { 'restored': toJsonLedgerEntry((v as any).restored) }
  }
}

export function fromJsonLedgerEntryChange(json: unknown): LedgerEntryChange {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for LedgerEntryChange: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'created':
      return { type: 'LEDGER_ENTRY_CREATED', created: fromJsonLedgerEntry(obj[key]) } as LedgerEntryChange
    case 'updated':
      return { type: 'LEDGER_ENTRY_UPDATED', updated: fromJsonLedgerEntry(obj[key]) } as LedgerEntryChange
    case 'removed':
      return { type: 'LEDGER_ENTRY_REMOVED', removed: fromJsonLedgerKey(obj[key]) } as LedgerEntryChange
    case 'state':
      return { type: 'LEDGER_ENTRY_STATE', state: fromJsonLedgerEntry(obj[key]) } as LedgerEntryChange
    case 'restored':
      return { type: 'LEDGER_ENTRY_RESTORED', restored: fromJsonLedgerEntry(obj[key]) } as LedgerEntryChange
    default: throw new Error(`Unknown LedgerEntryChange variant: ${key}`)
  }
}

export type LedgerEntryChanges = LedgerEntryChange[]

export function readLedgerEntryChanges(r: XdrReader): LedgerEntryChanges {
  return readVarArray(r, UINT32_MAX, readLedgerEntryChange)
}

export function writeLedgerEntryChanges(w: XdrWriter, v: LedgerEntryChanges): void {
  writeVarArray(w, v, UINT32_MAX, writeLedgerEntryChange)
}

export function encodeLedgerEntryChanges(v: LedgerEntryChanges): Uint8Array {
  return encode(v, writeLedgerEntryChanges)
}

export function decodeLedgerEntryChanges(input: Uint8Array | string): LedgerEntryChanges {
  return decode(input, readLedgerEntryChanges)
}

export function toJsonLedgerEntryChanges(v: LedgerEntryChanges): unknown {
  return v.map((item: any) => toJsonLedgerEntryChange(item))
}

export function fromJsonLedgerEntryChanges(json: unknown): LedgerEntryChanges {
  return ((json) as unknown[]).map((item: unknown) => fromJsonLedgerEntryChange(item))
}

export interface OperationMeta {
  readonly changes: LedgerEntryChanges
}

export function readOperationMeta(r: XdrReader): OperationMeta {
  beginComposite(r)
  try {
    const changes = readLedgerEntryChanges(r)
    return { changes }
  } finally {
    endComposite(r)
  }
}

export function writeOperationMeta(w: XdrWriter, v: OperationMeta): void {
  writeLedgerEntryChanges(w, v.changes)
}

export function encodeOperationMeta(v: OperationMeta): Uint8Array {
  return encode(v, writeOperationMeta)
}

export function decodeOperationMeta(input: Uint8Array | string): OperationMeta {
  return decode(input, readOperationMeta)
}

export function toJsonOperationMeta(v: OperationMeta): Record<string, unknown> {
  return {
    'changes': toJsonLedgerEntryChanges(v.changes),
  }
}

export function fromJsonOperationMeta(json: unknown): OperationMeta {
  const o = json as Record<string, unknown>
  return {
    changes: fromJsonLedgerEntryChanges(o['changes']),
  }
}

export interface TransactionMetaV1 {
  readonly txChanges: LedgerEntryChanges
  /** tx level changes if any */
  readonly operations: OperationMeta[]
}

export function readTransactionMetaV1(r: XdrReader): TransactionMetaV1 {
  beginComposite(r)
  try {
    const txChanges = readLedgerEntryChanges(r)
    const operations = readVarArray(r, UINT32_MAX, readOperationMeta)
    return { txChanges, operations }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionMetaV1(w: XdrWriter, v: TransactionMetaV1): void {
  writeLedgerEntryChanges(w, v.txChanges)
  writeVarArray(w, v.operations, UINT32_MAX, writeOperationMeta)
}

export function encodeTransactionMetaV1(v: TransactionMetaV1): Uint8Array {
  return encode(v, writeTransactionMetaV1)
}

export function decodeTransactionMetaV1(input: Uint8Array | string): TransactionMetaV1 {
  return decode(input, readTransactionMetaV1)
}

export function toJsonTransactionMetaV1(v: TransactionMetaV1): Record<string, unknown> {
  return {
    'tx_changes': toJsonLedgerEntryChanges(v.txChanges),
    'operations': v.operations.map((item: any) => toJsonOperationMeta(item)),
  }
}

export function fromJsonTransactionMetaV1(json: unknown): TransactionMetaV1 {
  const o = json as Record<string, unknown>
  return {
    txChanges: fromJsonLedgerEntryChanges(o['tx_changes']),
    operations: ((o['operations']) as unknown[]).map((item: unknown) => fromJsonOperationMeta(item)),
  }
}

export interface TransactionMetaV2 {
  readonly txChangesBefore: LedgerEntryChanges
  /**
   * tx level changes before operations
   * are applied if any
   */
  readonly operations: OperationMeta[]
  /** meta for each operation */
  readonly txChangesAfter: LedgerEntryChanges
}

export function readTransactionMetaV2(r: XdrReader): TransactionMetaV2 {
  beginComposite(r)
  try {
    const txChangesBefore = readLedgerEntryChanges(r)
    const operations = readVarArray(r, UINT32_MAX, readOperationMeta)
    const txChangesAfter = readLedgerEntryChanges(r)
    return { txChangesBefore, operations, txChangesAfter }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionMetaV2(w: XdrWriter, v: TransactionMetaV2): void {
  writeLedgerEntryChanges(w, v.txChangesBefore)
  writeVarArray(w, v.operations, UINT32_MAX, writeOperationMeta)
  writeLedgerEntryChanges(w, v.txChangesAfter)
}

export function encodeTransactionMetaV2(v: TransactionMetaV2): Uint8Array {
  return encode(v, writeTransactionMetaV2)
}

export function decodeTransactionMetaV2(input: Uint8Array | string): TransactionMetaV2 {
  return decode(input, readTransactionMetaV2)
}

export function toJsonTransactionMetaV2(v: TransactionMetaV2): Record<string, unknown> {
  return {
    'tx_changes_before': toJsonLedgerEntryChanges(v.txChangesBefore),
    'operations': v.operations.map((item: any) => toJsonOperationMeta(item)),
    'tx_changes_after': toJsonLedgerEntryChanges(v.txChangesAfter),
  }
}

export function fromJsonTransactionMetaV2(json: unknown): TransactionMetaV2 {
  const o = json as Record<string, unknown>
  return {
    txChangesBefore: fromJsonLedgerEntryChanges(o['tx_changes_before']),
    operations: ((o['operations']) as unknown[]).map((item: unknown) => fromJsonOperationMeta(item)),
    txChangesAfter: fromJsonLedgerEntryChanges(o['tx_changes_after']),
  }
}

export type ContractEventType =
  | 'SYSTEM'
  | 'CONTRACT'
  | 'DIAGNOSTIC'

export const CONTRACT_EVENT_TYPE_TO_INT: Record<ContractEventType, number> = /*#__PURE__*/ {
  SYSTEM: 0,
  CONTRACT: 1,
  DIAGNOSTIC: 2,
}

export const CONTRACT_EVENT_TYPE_FROM_INT: Record<number, ContractEventType> = /*#__PURE__*/ {
  0: 'SYSTEM',
  1: 'CONTRACT',
  2: 'DIAGNOSTIC',
}

export function readContractEventType(r: XdrReader): ContractEventType {
  const v = readInt32(r)
  const result = CONTRACT_EVENT_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ContractEventType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeContractEventType(w: XdrWriter, v: ContractEventType): void {
  writeInt32(w, CONTRACT_EVENT_TYPE_TO_INT[v])
}

export function encodeContractEventType(v: ContractEventType): Uint8Array {
  return encode(v, writeContractEventType)
}

export function decodeContractEventType(input: Uint8Array | string): ContractEventType {
  return decode(input, readContractEventType)
}

const _CONTRACT_EVENT_TYPE_TO_JSON: Record<ContractEventType, string> = /*#__PURE__*/ {
  SYSTEM: 'system',
  CONTRACT: 'contract',
  DIAGNOSTIC: 'diagnostic',
}

const _CONTRACT_EVENT_TYPE_FROM_JSON: Record<string, ContractEventType> = /*#__PURE__*/ {
  'system': 'SYSTEM',
  'contract': 'CONTRACT',
  'diagnostic': 'DIAGNOSTIC',
}

export function toJsonContractEventType(v: ContractEventType): string {
  return _CONTRACT_EVENT_TYPE_TO_JSON[v]
}

export function fromJsonContractEventType(json: unknown): ContractEventType {
  const result = _CONTRACT_EVENT_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ContractEventType JSON value: ${json}`)
  return result
}

export interface ContractEvent_v0 {
  readonly topics: SCVal[]
  readonly data: SCVal
}

export function readContractEvent_v0(r: XdrReader): ContractEvent_v0 {
  beginComposite(r)
  try {
    const topics = readVarArray(r, UINT32_MAX, readSCVal)
    const data = readSCVal(r)
    return { topics, data }
  } finally {
    endComposite(r)
  }
}

export function writeContractEvent_v0(w: XdrWriter, v: ContractEvent_v0): void {
  writeVarArray(w, v.topics, UINT32_MAX, writeSCVal)
  writeSCVal(w, v.data)
}

export function encodeContractEvent_v0(v: ContractEvent_v0): Uint8Array {
  return encode(v, writeContractEvent_v0)
}

export function decodeContractEvent_v0(input: Uint8Array | string): ContractEvent_v0 {
  return decode(input, readContractEvent_v0)
}

export function toJsonContractEvent_v0(v: ContractEvent_v0): Record<string, unknown> {
  return {
    'topics': v.topics.map((item: any) => toJsonSCVal(item)),
    'data': toJsonSCVal(v.data),
  }
}

export function fromJsonContractEvent_v0(json: unknown): ContractEvent_v0 {
  const o = json as Record<string, unknown>
  return {
    topics: ((o['topics']) as unknown[]).map((item: unknown) => fromJsonSCVal(item)),
    data: fromJsonSCVal(o['data']),
  }
}

export type ContractEvent_body =
  | { readonly v: 0; readonly v0: ContractEvent_v0 }

export function readContractEvent_body(r: XdrReader): ContractEvent_body {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: ContractEvent_body
    switch (v) {
      case 0:
        result = { v, v0: readContractEvent_v0(r) }; break
      default:
        throw new XdrReadError(`Unknown ContractEvent_body discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeContractEvent_body(w: XdrWriter, v: ContractEvent_body): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      writeContractEvent_v0(w, (v as any).v0); break
  }
}

export function encodeContractEvent_body(v: ContractEvent_body): Uint8Array {
  return encode(v, writeContractEvent_body)
}

export function decodeContractEvent_body(input: Uint8Array | string): ContractEvent_body {
  return decode(input, readContractEvent_body)
}

export function toJsonContractEvent_body(v: ContractEvent_body): unknown {
  switch (v.v) {
    case 0:
      return { 'v0': toJsonContractEvent_v0((v as any).v0) }
  }
}

export function fromJsonContractEvent_body(json: unknown): ContractEvent_body {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for ContractEvent_body: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v0':
      return { v: 0, v0: fromJsonContractEvent_v0(obj[key]) } as ContractEvent_body
    default: throw new Error(`Unknown ContractEvent_body variant: ${key}`)
  }
}

export interface ContractEvent {
  /**
   * We can use this to add more fields, or because it
   * is first, to change ContractEvent into a union.
   */
  readonly ext: ExtensionPoint
  readonly contractID: ContractID | undefined
  readonly type: ContractEventType
  readonly body: ContractEvent_body
}

export function readContractEvent(r: XdrReader): ContractEvent {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const contractID = readOptional(r, readContractID)
    const type_ = readContractEventType(r)
    const body = readContractEvent_body(r)
    return { ext, contractID, type: type_, body }
  } finally {
    endComposite(r)
  }
}

export function writeContractEvent(w: XdrWriter, v: ContractEvent): void {
  writeExtensionPoint(w, v.ext)
  writeOptional(w, v.contractID, writeContractID)
  writeContractEventType(w, v.type)
  writeContractEvent_body(w, v.body)
}

export function encodeContractEvent(v: ContractEvent): Uint8Array {
  return encode(v, writeContractEvent)
}

export function decodeContractEvent(input: Uint8Array | string): ContractEvent {
  return decode(input, readContractEvent)
}

export function toJsonContractEvent(v: ContractEvent): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'contract_id': v.contractID !== undefined ? toJsonContractID(v.contractID) : null,
    'type': toJsonContractEventType(v.type),
    'body': toJsonContractEvent_body(v.body),
  }
}

export function fromJsonContractEvent(json: unknown): ContractEvent {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    contractID: (o['contract_id']) != null ? fromJsonContractID(o['contract_id']) : undefined,
    type: fromJsonContractEventType(o['type']),
    body: fromJsonContractEvent_body(o['body']),
  }
}

export interface DiagnosticEvent {
  readonly inSuccessfulContractCall: boolean
  readonly event: ContractEvent
}

export function readDiagnosticEvent(r: XdrReader): DiagnosticEvent {
  beginComposite(r)
  try {
    const inSuccessfulContractCall = readBool(r)
    const event = readContractEvent(r)
    return { inSuccessfulContractCall, event }
  } finally {
    endComposite(r)
  }
}

export function writeDiagnosticEvent(w: XdrWriter, v: DiagnosticEvent): void {
  writeBool(w, v.inSuccessfulContractCall)
  writeContractEvent(w, v.event)
}

export function encodeDiagnosticEvent(v: DiagnosticEvent): Uint8Array {
  return encode(v, writeDiagnosticEvent)
}

export function decodeDiagnosticEvent(input: Uint8Array | string): DiagnosticEvent {
  return decode(input, readDiagnosticEvent)
}

export function toJsonDiagnosticEvent(v: DiagnosticEvent): Record<string, unknown> {
  return {
    'in_successful_contract_call': v.inSuccessfulContractCall,
    'event': toJsonContractEvent(v.event),
  }
}

export function fromJsonDiagnosticEvent(json: unknown): DiagnosticEvent {
  const o = json as Record<string, unknown>
  return {
    inSuccessfulContractCall: (o['in_successful_contract_call']) as boolean,
    event: fromJsonContractEvent(o['event']),
  }
}

export interface SorobanTransactionMetaExtV1 {
  readonly ext: ExtensionPoint
  /**
   * Total amount (in stroops) that has been charged for non-refundable
   * Soroban resources.
   * Non-refundable resources are charged based on the usage declared in
   * the transaction envelope (such as `instructions`, `readBytes` etc.) and 
   * is charged regardless of the success of the transaction.
   */
  readonly totalNonRefundableResourceFeeCharged: int64
  /**
   * Total amount (in stroops) that has been charged for refundable
   * Soroban resource fees.
   * Currently this comprises the rent fee (`rentFeeCharged`) and the
   * fee for the events and return value.
   * Refundable resources are charged based on the actual resources usage.
   * Since currently refundable resources are only used for the successful
   * transactions, this will be `0` for failed transactions.
   */
  readonly totalRefundableResourceFeeCharged: int64
  /**
   * Amount (in stroops) that has been charged for rent.
   * This is a part of `totalNonRefundableResourceFeeCharged`.
   */
  readonly rentFeeCharged: int64
}

export function readSorobanTransactionMetaExtV1(r: XdrReader): SorobanTransactionMetaExtV1 {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const totalNonRefundableResourceFeeCharged = readint64(r)
    const totalRefundableResourceFeeCharged = readint64(r)
    const rentFeeCharged = readint64(r)
    return { ext, totalNonRefundableResourceFeeCharged, totalRefundableResourceFeeCharged, rentFeeCharged }
  } finally {
    endComposite(r)
  }
}

export function writeSorobanTransactionMetaExtV1(w: XdrWriter, v: SorobanTransactionMetaExtV1): void {
  writeExtensionPoint(w, v.ext)
  writeint64(w, v.totalNonRefundableResourceFeeCharged)
  writeint64(w, v.totalRefundableResourceFeeCharged)
  writeint64(w, v.rentFeeCharged)
}

export function encodeSorobanTransactionMetaExtV1(v: SorobanTransactionMetaExtV1): Uint8Array {
  return encode(v, writeSorobanTransactionMetaExtV1)
}

export function decodeSorobanTransactionMetaExtV1(input: Uint8Array | string): SorobanTransactionMetaExtV1 {
  return decode(input, readSorobanTransactionMetaExtV1)
}

export function toJsonSorobanTransactionMetaExtV1(v: SorobanTransactionMetaExtV1): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'total_non_refundable_resource_fee_charged': toJsonint64(v.totalNonRefundableResourceFeeCharged),
    'total_refundable_resource_fee_charged': toJsonint64(v.totalRefundableResourceFeeCharged),
    'rent_fee_charged': toJsonint64(v.rentFeeCharged),
  }
}

export function fromJsonSorobanTransactionMetaExtV1(json: unknown): SorobanTransactionMetaExtV1 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    totalNonRefundableResourceFeeCharged: fromJsonint64(o['total_non_refundable_resource_fee_charged']),
    totalRefundableResourceFeeCharged: fromJsonint64(o['total_refundable_resource_fee_charged']),
    rentFeeCharged: fromJsonint64(o['rent_fee_charged']),
  }
}

export type SorobanTransactionMetaExt =
  | { readonly v: 0 }
  | { readonly v: 1; readonly v1: SorobanTransactionMetaExtV1 }

export function readSorobanTransactionMetaExt(r: XdrReader): SorobanTransactionMetaExt {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: SorobanTransactionMetaExt
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, v1: readSorobanTransactionMetaExtV1(r) }; break
      default:
        throw new XdrReadError(`Unknown SorobanTransactionMetaExt discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSorobanTransactionMetaExt(w: XdrWriter, v: SorobanTransactionMetaExt): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeSorobanTransactionMetaExtV1(w, (v as any).v1); break
  }
}

export function encodeSorobanTransactionMetaExt(v: SorobanTransactionMetaExt): Uint8Array {
  return encode(v, writeSorobanTransactionMetaExt)
}

export function decodeSorobanTransactionMetaExt(input: Uint8Array | string): SorobanTransactionMetaExt {
  return decode(input, readSorobanTransactionMetaExt)
}

export function toJsonSorobanTransactionMetaExt(v: SorobanTransactionMetaExt): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonSorobanTransactionMetaExtV1((v as any).v1) }
  }
}

export function fromJsonSorobanTransactionMetaExt(json: unknown): SorobanTransactionMetaExt {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as SorobanTransactionMetaExt
    throw new Error(`Unknown SorobanTransactionMetaExt variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, v1: fromJsonSorobanTransactionMetaExtV1(obj[key]) } as SorobanTransactionMetaExt
    default: throw new Error(`Unknown SorobanTransactionMetaExt variant: ${key}`)
  }
}

export interface SorobanTransactionMeta {
  readonly ext: SorobanTransactionMetaExt
  readonly events: ContractEvent[]
  /**
   * custom events populated by the
   * contracts themselves.
   */
  readonly returnValue: SCVal
  /**
   * Diagnostics events that are not hashed.
   * This will contain all contract and diagnostic events. Even ones
   * that were emitted in a failed contract call.
   */
  readonly diagnosticEvents: DiagnosticEvent[]
}

export function readSorobanTransactionMeta(r: XdrReader): SorobanTransactionMeta {
  beginComposite(r)
  try {
    const ext = readSorobanTransactionMetaExt(r)
    const events = readVarArray(r, UINT32_MAX, readContractEvent)
    const returnValue = readSCVal(r)
    const diagnosticEvents = readVarArray(r, UINT32_MAX, readDiagnosticEvent)
    return { ext, events, returnValue, diagnosticEvents }
  } finally {
    endComposite(r)
  }
}

export function writeSorobanTransactionMeta(w: XdrWriter, v: SorobanTransactionMeta): void {
  writeSorobanTransactionMetaExt(w, v.ext)
  writeVarArray(w, v.events, UINT32_MAX, writeContractEvent)
  writeSCVal(w, v.returnValue)
  writeVarArray(w, v.diagnosticEvents, UINT32_MAX, writeDiagnosticEvent)
}

export function encodeSorobanTransactionMeta(v: SorobanTransactionMeta): Uint8Array {
  return encode(v, writeSorobanTransactionMeta)
}

export function decodeSorobanTransactionMeta(input: Uint8Array | string): SorobanTransactionMeta {
  return decode(input, readSorobanTransactionMeta)
}

export function toJsonSorobanTransactionMeta(v: SorobanTransactionMeta): Record<string, unknown> {
  return {
    'ext': toJsonSorobanTransactionMetaExt(v.ext),
    'events': v.events.map((item: any) => toJsonContractEvent(item)),
    'return_value': toJsonSCVal(v.returnValue),
    'diagnostic_events': v.diagnosticEvents.map((item: any) => toJsonDiagnosticEvent(item)),
  }
}

export function fromJsonSorobanTransactionMeta(json: unknown): SorobanTransactionMeta {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonSorobanTransactionMetaExt(o['ext']),
    events: ((o['events']) as unknown[]).map((item: unknown) => fromJsonContractEvent(item)),
    returnValue: fromJsonSCVal(o['return_value']),
    diagnosticEvents: ((o['diagnostic_events']) as unknown[]).map((item: unknown) => fromJsonDiagnosticEvent(item)),
  }
}

export interface TransactionMetaV3 {
  readonly ext: ExtensionPoint
  readonly txChangesBefore: LedgerEntryChanges
  /**
   * tx level changes before operations
   * are applied if any
   */
  readonly operations: OperationMeta[]
  /** meta for each operation */
  readonly txChangesAfter: LedgerEntryChanges
  /**
   * tx level changes after operations are
   * applied if any
   */
  readonly sorobanMeta: SorobanTransactionMeta | undefined
}

export function readTransactionMetaV3(r: XdrReader): TransactionMetaV3 {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const txChangesBefore = readLedgerEntryChanges(r)
    const operations = readVarArray(r, UINT32_MAX, readOperationMeta)
    const txChangesAfter = readLedgerEntryChanges(r)
    const sorobanMeta = readOptional(r, readSorobanTransactionMeta)
    return { ext, txChangesBefore, operations, txChangesAfter, sorobanMeta }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionMetaV3(w: XdrWriter, v: TransactionMetaV3): void {
  writeExtensionPoint(w, v.ext)
  writeLedgerEntryChanges(w, v.txChangesBefore)
  writeVarArray(w, v.operations, UINT32_MAX, writeOperationMeta)
  writeLedgerEntryChanges(w, v.txChangesAfter)
  writeOptional(w, v.sorobanMeta, writeSorobanTransactionMeta)
}

export function encodeTransactionMetaV3(v: TransactionMetaV3): Uint8Array {
  return encode(v, writeTransactionMetaV3)
}

export function decodeTransactionMetaV3(input: Uint8Array | string): TransactionMetaV3 {
  return decode(input, readTransactionMetaV3)
}

export function toJsonTransactionMetaV3(v: TransactionMetaV3): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'tx_changes_before': toJsonLedgerEntryChanges(v.txChangesBefore),
    'operations': v.operations.map((item: any) => toJsonOperationMeta(item)),
    'tx_changes_after': toJsonLedgerEntryChanges(v.txChangesAfter),
    'soroban_meta': v.sorobanMeta !== undefined ? toJsonSorobanTransactionMeta(v.sorobanMeta) : null,
  }
}

export function fromJsonTransactionMetaV3(json: unknown): TransactionMetaV3 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    txChangesBefore: fromJsonLedgerEntryChanges(o['tx_changes_before']),
    operations: ((o['operations']) as unknown[]).map((item: unknown) => fromJsonOperationMeta(item)),
    txChangesAfter: fromJsonLedgerEntryChanges(o['tx_changes_after']),
    sorobanMeta: (o['soroban_meta']) != null ? fromJsonSorobanTransactionMeta(o['soroban_meta']) : undefined,
  }
}

export interface OperationMetaV2 {
  readonly ext: ExtensionPoint
  readonly changes: LedgerEntryChanges
  readonly events: ContractEvent[]
}

export function readOperationMetaV2(r: XdrReader): OperationMetaV2 {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const changes = readLedgerEntryChanges(r)
    const events = readVarArray(r, UINT32_MAX, readContractEvent)
    return { ext, changes, events }
  } finally {
    endComposite(r)
  }
}

export function writeOperationMetaV2(w: XdrWriter, v: OperationMetaV2): void {
  writeExtensionPoint(w, v.ext)
  writeLedgerEntryChanges(w, v.changes)
  writeVarArray(w, v.events, UINT32_MAX, writeContractEvent)
}

export function encodeOperationMetaV2(v: OperationMetaV2): Uint8Array {
  return encode(v, writeOperationMetaV2)
}

export function decodeOperationMetaV2(input: Uint8Array | string): OperationMetaV2 {
  return decode(input, readOperationMetaV2)
}

export function toJsonOperationMetaV2(v: OperationMetaV2): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'changes': toJsonLedgerEntryChanges(v.changes),
    'events': v.events.map((item: any) => toJsonContractEvent(item)),
  }
}

export function fromJsonOperationMetaV2(json: unknown): OperationMetaV2 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    changes: fromJsonLedgerEntryChanges(o['changes']),
    events: ((o['events']) as unknown[]).map((item: unknown) => fromJsonContractEvent(item)),
  }
}

export interface SorobanTransactionMetaV2 {
  readonly ext: SorobanTransactionMetaExt
  readonly returnValue: SCVal | undefined
}

export function readSorobanTransactionMetaV2(r: XdrReader): SorobanTransactionMetaV2 {
  beginComposite(r)
  try {
    const ext = readSorobanTransactionMetaExt(r)
    const returnValue = readOptional(r, readSCVal)
    return { ext, returnValue }
  } finally {
    endComposite(r)
  }
}

export function writeSorobanTransactionMetaV2(w: XdrWriter, v: SorobanTransactionMetaV2): void {
  writeSorobanTransactionMetaExt(w, v.ext)
  writeOptional(w, v.returnValue, writeSCVal)
}

export function encodeSorobanTransactionMetaV2(v: SorobanTransactionMetaV2): Uint8Array {
  return encode(v, writeSorobanTransactionMetaV2)
}

export function decodeSorobanTransactionMetaV2(input: Uint8Array | string): SorobanTransactionMetaV2 {
  return decode(input, readSorobanTransactionMetaV2)
}

export function toJsonSorobanTransactionMetaV2(v: SorobanTransactionMetaV2): Record<string, unknown> {
  return {
    'ext': toJsonSorobanTransactionMetaExt(v.ext),
    'return_value': v.returnValue !== undefined ? toJsonSCVal(v.returnValue) : null,
  }
}

export function fromJsonSorobanTransactionMetaV2(json: unknown): SorobanTransactionMetaV2 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonSorobanTransactionMetaExt(o['ext']),
    returnValue: (o['return_value']) != null ? fromJsonSCVal(o['return_value']) : undefined,
  }
}

/**
 * Transaction-level events happen at different stages of the ledger apply flow
 * (as opposed to the operation events that all happen atomically after 
 * a transaction is applied).
 * This enum represents the possible stages during which an event has been
 * emitted.
 */
export type TransactionEventStage =
  | 'TRANSACTION_EVENT_STAGE_BEFORE_ALL_TXS'
  | 'TRANSACTION_EVENT_STAGE_AFTER_TX'
  | 'TRANSACTION_EVENT_STAGE_AFTER_ALL_TXS'

export const TRANSACTION_EVENT_STAGE_TO_INT: Record<TransactionEventStage, number> = /*#__PURE__*/ {
  TRANSACTION_EVENT_STAGE_BEFORE_ALL_TXS: 0,
  TRANSACTION_EVENT_STAGE_AFTER_TX: 1,
  TRANSACTION_EVENT_STAGE_AFTER_ALL_TXS: 2,
}

export const TRANSACTION_EVENT_STAGE_FROM_INT: Record<number, TransactionEventStage> = /*#__PURE__*/ {
  0: 'TRANSACTION_EVENT_STAGE_BEFORE_ALL_TXS',
  1: 'TRANSACTION_EVENT_STAGE_AFTER_TX',
  2: 'TRANSACTION_EVENT_STAGE_AFTER_ALL_TXS',
}

export function readTransactionEventStage(r: XdrReader): TransactionEventStage {
  const v = readInt32(r)
  const result = TRANSACTION_EVENT_STAGE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown TransactionEventStage value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeTransactionEventStage(w: XdrWriter, v: TransactionEventStage): void {
  writeInt32(w, TRANSACTION_EVENT_STAGE_TO_INT[v])
}

export function encodeTransactionEventStage(v: TransactionEventStage): Uint8Array {
  return encode(v, writeTransactionEventStage)
}

export function decodeTransactionEventStage(input: Uint8Array | string): TransactionEventStage {
  return decode(input, readTransactionEventStage)
}

const _TRANSACTION_EVENT_STAGE_TO_JSON: Record<TransactionEventStage, string> = /*#__PURE__*/ {
  TRANSACTION_EVENT_STAGE_BEFORE_ALL_TXS: 'before_all_txs',
  TRANSACTION_EVENT_STAGE_AFTER_TX: 'after_tx',
  TRANSACTION_EVENT_STAGE_AFTER_ALL_TXS: 'after_all_txs',
}

const _TRANSACTION_EVENT_STAGE_FROM_JSON: Record<string, TransactionEventStage> = /*#__PURE__*/ {
  'before_all_txs': 'TRANSACTION_EVENT_STAGE_BEFORE_ALL_TXS',
  'after_tx': 'TRANSACTION_EVENT_STAGE_AFTER_TX',
  'after_all_txs': 'TRANSACTION_EVENT_STAGE_AFTER_ALL_TXS',
}

export function toJsonTransactionEventStage(v: TransactionEventStage): string {
  return _TRANSACTION_EVENT_STAGE_TO_JSON[v]
}

export function fromJsonTransactionEventStage(json: unknown): TransactionEventStage {
  const result = _TRANSACTION_EVENT_STAGE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown TransactionEventStage JSON value: ${json}`)
  return result
}

/**
 * Represents a transaction-level event in metadata.
 * Currently this is limited to the fee events (when fee is charged or 
 * refunded).
 */
export interface TransactionEvent {
  readonly stage: TransactionEventStage
  /** Stage at which an event has occurred. */
  readonly event: ContractEvent
}

export function readTransactionEvent(r: XdrReader): TransactionEvent {
  beginComposite(r)
  try {
    const stage = readTransactionEventStage(r)
    const event = readContractEvent(r)
    return { stage, event }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionEvent(w: XdrWriter, v: TransactionEvent): void {
  writeTransactionEventStage(w, v.stage)
  writeContractEvent(w, v.event)
}

export function encodeTransactionEvent(v: TransactionEvent): Uint8Array {
  return encode(v, writeTransactionEvent)
}

export function decodeTransactionEvent(input: Uint8Array | string): TransactionEvent {
  return decode(input, readTransactionEvent)
}

export function toJsonTransactionEvent(v: TransactionEvent): Record<string, unknown> {
  return {
    'stage': toJsonTransactionEventStage(v.stage),
    'event': toJsonContractEvent(v.event),
  }
}

export function fromJsonTransactionEvent(json: unknown): TransactionEvent {
  const o = json as Record<string, unknown>
  return {
    stage: fromJsonTransactionEventStage(o['stage']),
    event: fromJsonContractEvent(o['event']),
  }
}

export interface TransactionMetaV4 {
  readonly ext: ExtensionPoint
  readonly txChangesBefore: LedgerEntryChanges
  /**
   * tx level changes before operations
   * are applied if any
   */
  readonly operations: OperationMetaV2[]
  /** meta for each operation */
  readonly txChangesAfter: LedgerEntryChanges
  /**
   * tx level changes after operations are
   * applied if any
   */
  readonly sorobanMeta: SorobanTransactionMetaV2 | undefined
  readonly events: TransactionEvent[]
  /** Used for transaction-level events (like fee payment) */
  readonly diagnosticEvents: DiagnosticEvent[]
}

export function readTransactionMetaV4(r: XdrReader): TransactionMetaV4 {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const txChangesBefore = readLedgerEntryChanges(r)
    const operations = readVarArray(r, UINT32_MAX, readOperationMetaV2)
    const txChangesAfter = readLedgerEntryChanges(r)
    const sorobanMeta = readOptional(r, readSorobanTransactionMetaV2)
    const events = readVarArray(r, UINT32_MAX, readTransactionEvent)
    const diagnosticEvents = readVarArray(r, UINT32_MAX, readDiagnosticEvent)
    return { ext, txChangesBefore, operations, txChangesAfter, sorobanMeta, events, diagnosticEvents }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionMetaV4(w: XdrWriter, v: TransactionMetaV4): void {
  writeExtensionPoint(w, v.ext)
  writeLedgerEntryChanges(w, v.txChangesBefore)
  writeVarArray(w, v.operations, UINT32_MAX, writeOperationMetaV2)
  writeLedgerEntryChanges(w, v.txChangesAfter)
  writeOptional(w, v.sorobanMeta, writeSorobanTransactionMetaV2)
  writeVarArray(w, v.events, UINT32_MAX, writeTransactionEvent)
  writeVarArray(w, v.diagnosticEvents, UINT32_MAX, writeDiagnosticEvent)
}

export function encodeTransactionMetaV4(v: TransactionMetaV4): Uint8Array {
  return encode(v, writeTransactionMetaV4)
}

export function decodeTransactionMetaV4(input: Uint8Array | string): TransactionMetaV4 {
  return decode(input, readTransactionMetaV4)
}

export function toJsonTransactionMetaV4(v: TransactionMetaV4): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'tx_changes_before': toJsonLedgerEntryChanges(v.txChangesBefore),
    'operations': v.operations.map((item: any) => toJsonOperationMetaV2(item)),
    'tx_changes_after': toJsonLedgerEntryChanges(v.txChangesAfter),
    'soroban_meta': v.sorobanMeta !== undefined ? toJsonSorobanTransactionMetaV2(v.sorobanMeta) : null,
    'events': v.events.map((item: any) => toJsonTransactionEvent(item)),
    'diagnostic_events': v.diagnosticEvents.map((item: any) => toJsonDiagnosticEvent(item)),
  }
}

export function fromJsonTransactionMetaV4(json: unknown): TransactionMetaV4 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    txChangesBefore: fromJsonLedgerEntryChanges(o['tx_changes_before']),
    operations: ((o['operations']) as unknown[]).map((item: unknown) => fromJsonOperationMetaV2(item)),
    txChangesAfter: fromJsonLedgerEntryChanges(o['tx_changes_after']),
    sorobanMeta: (o['soroban_meta']) != null ? fromJsonSorobanTransactionMetaV2(o['soroban_meta']) : undefined,
    events: ((o['events']) as unknown[]).map((item: unknown) => fromJsonTransactionEvent(item)),
    diagnosticEvents: ((o['diagnostic_events']) as unknown[]).map((item: unknown) => fromJsonDiagnosticEvent(item)),
  }
}

/** This is in Stellar-ledger.x to due to a circular dependency  */
export interface InvokeHostFunctionSuccessPreImage {
  readonly returnValue: SCVal
  readonly events: ContractEvent[]
}

export function readInvokeHostFunctionSuccessPreImage(r: XdrReader): InvokeHostFunctionSuccessPreImage {
  beginComposite(r)
  try {
    const returnValue = readSCVal(r)
    const events = readVarArray(r, UINT32_MAX, readContractEvent)
    return { returnValue, events }
  } finally {
    endComposite(r)
  }
}

export function writeInvokeHostFunctionSuccessPreImage(w: XdrWriter, v: InvokeHostFunctionSuccessPreImage): void {
  writeSCVal(w, v.returnValue)
  writeVarArray(w, v.events, UINT32_MAX, writeContractEvent)
}

export function encodeInvokeHostFunctionSuccessPreImage(v: InvokeHostFunctionSuccessPreImage): Uint8Array {
  return encode(v, writeInvokeHostFunctionSuccessPreImage)
}

export function decodeInvokeHostFunctionSuccessPreImage(input: Uint8Array | string): InvokeHostFunctionSuccessPreImage {
  return decode(input, readInvokeHostFunctionSuccessPreImage)
}

export function toJsonInvokeHostFunctionSuccessPreImage(v: InvokeHostFunctionSuccessPreImage): Record<string, unknown> {
  return {
    'return_value': toJsonSCVal(v.returnValue),
    'events': v.events.map((item: any) => toJsonContractEvent(item)),
  }
}

export function fromJsonInvokeHostFunctionSuccessPreImage(json: unknown): InvokeHostFunctionSuccessPreImage {
  const o = json as Record<string, unknown>
  return {
    returnValue: fromJsonSCVal(o['return_value']),
    events: ((o['events']) as unknown[]).map((item: unknown) => fromJsonContractEvent(item)),
  }
}

/**
 * this is the meta produced when applying transactions
 * it does not include pre-apply updates such as fees
 */
export type TransactionMeta =
  | { readonly v: 0; readonly operations: OperationMeta[] }
  | { readonly v: 1; readonly v1: TransactionMetaV1 }
  | { readonly v: 2; readonly v2: TransactionMetaV2 }
  | { readonly v: 3; readonly v3: TransactionMetaV3 }
  | { readonly v: 4; readonly v4: TransactionMetaV4 }

export function readTransactionMeta(r: XdrReader): TransactionMeta {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: TransactionMeta
    switch (v) {
      case 0:
        result = { v, operations: readVarArray(r, UINT32_MAX, readOperationMeta) }; break
      case 1:
        result = { v, v1: readTransactionMetaV1(r) }; break
      case 2:
        result = { v, v2: readTransactionMetaV2(r) }; break
      case 3:
        result = { v, v3: readTransactionMetaV3(r) }; break
      case 4:
        result = { v, v4: readTransactionMetaV4(r) }; break
      default:
        throw new XdrReadError(`Unknown TransactionMeta discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTransactionMeta(w: XdrWriter, v: TransactionMeta): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      writeVarArray(w, (v as any).operations, UINT32_MAX, writeOperationMeta); break
    case 1:
      writeTransactionMetaV1(w, (v as any).v1); break
    case 2:
      writeTransactionMetaV2(w, (v as any).v2); break
    case 3:
      writeTransactionMetaV3(w, (v as any).v3); break
    case 4:
      writeTransactionMetaV4(w, (v as any).v4); break
  }
}

export function encodeTransactionMeta(v: TransactionMeta): Uint8Array {
  return encode(v, writeTransactionMeta)
}

export function decodeTransactionMeta(input: Uint8Array | string): TransactionMeta {
  return decode(input, readTransactionMeta)
}

export function toJsonTransactionMeta(v: TransactionMeta): unknown {
  switch (v.v) {
    case 0:
      return { 'v0': (v as any).operations.map((item: any) => toJsonOperationMeta(item)) }
    case 1:
      return { 'v1': toJsonTransactionMetaV1((v as any).v1) }
    case 2:
      return { 'v2': toJsonTransactionMetaV2((v as any).v2) }
    case 3:
      return { 'v3': toJsonTransactionMetaV3((v as any).v3) }
    case 4:
      return { 'v4': toJsonTransactionMetaV4((v as any).v4) }
  }
}

export function fromJsonTransactionMeta(json: unknown): TransactionMeta {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for TransactionMeta: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v0':
      return { v: 0, operations: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonOperationMeta(item)) } as TransactionMeta
    case 'v1':
      return { v: 1, v1: fromJsonTransactionMetaV1(obj[key]) } as TransactionMeta
    case 'v2':
      return { v: 2, v2: fromJsonTransactionMetaV2(obj[key]) } as TransactionMeta
    case 'v3':
      return { v: 3, v3: fromJsonTransactionMetaV3(obj[key]) } as TransactionMeta
    case 'v4':
      return { v: 4, v4: fromJsonTransactionMetaV4(obj[key]) } as TransactionMeta
    default: throw new Error(`Unknown TransactionMeta variant: ${key}`)
  }
}

/**
 * This struct groups together changes on a per transaction basis
 * note however that fees and transaction application are done in separate
 * phases
 */
export interface TransactionResultMeta {
  readonly result: TransactionResultPair
  readonly feeProcessing: LedgerEntryChanges
  readonly txApplyProcessing: TransactionMeta
}

export function readTransactionResultMeta(r: XdrReader): TransactionResultMeta {
  beginComposite(r)
  try {
    const result = readTransactionResultPair(r)
    const feeProcessing = readLedgerEntryChanges(r)
    const txApplyProcessing = readTransactionMeta(r)
    return { result, feeProcessing, txApplyProcessing }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionResultMeta(w: XdrWriter, v: TransactionResultMeta): void {
  writeTransactionResultPair(w, v.result)
  writeLedgerEntryChanges(w, v.feeProcessing)
  writeTransactionMeta(w, v.txApplyProcessing)
}

export function encodeTransactionResultMeta(v: TransactionResultMeta): Uint8Array {
  return encode(v, writeTransactionResultMeta)
}

export function decodeTransactionResultMeta(input: Uint8Array | string): TransactionResultMeta {
  return decode(input, readTransactionResultMeta)
}

export function toJsonTransactionResultMeta(v: TransactionResultMeta): Record<string, unknown> {
  return {
    'result': toJsonTransactionResultPair(v.result),
    'fee_processing': toJsonLedgerEntryChanges(v.feeProcessing),
    'tx_apply_processing': toJsonTransactionMeta(v.txApplyProcessing),
  }
}

export function fromJsonTransactionResultMeta(json: unknown): TransactionResultMeta {
  const o = json as Record<string, unknown>
  return {
    result: fromJsonTransactionResultPair(o['result']),
    feeProcessing: fromJsonLedgerEntryChanges(o['fee_processing']),
    txApplyProcessing: fromJsonTransactionMeta(o['tx_apply_processing']),
  }
}

/**
 * This struct groups together changes on a per transaction basis
 * note however that fees and transaction application are done in separate
 * phases
 */
export interface TransactionResultMetaV1 {
  readonly ext: ExtensionPoint
  readonly result: TransactionResultPair
  readonly feeProcessing: LedgerEntryChanges
  readonly txApplyProcessing: TransactionMeta
  readonly postTxApplyFeeProcessing: LedgerEntryChanges
}

export function readTransactionResultMetaV1(r: XdrReader): TransactionResultMetaV1 {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const result = readTransactionResultPair(r)
    const feeProcessing = readLedgerEntryChanges(r)
    const txApplyProcessing = readTransactionMeta(r)
    const postTxApplyFeeProcessing = readLedgerEntryChanges(r)
    return { ext, result, feeProcessing, txApplyProcessing, postTxApplyFeeProcessing }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionResultMetaV1(w: XdrWriter, v: TransactionResultMetaV1): void {
  writeExtensionPoint(w, v.ext)
  writeTransactionResultPair(w, v.result)
  writeLedgerEntryChanges(w, v.feeProcessing)
  writeTransactionMeta(w, v.txApplyProcessing)
  writeLedgerEntryChanges(w, v.postTxApplyFeeProcessing)
}

export function encodeTransactionResultMetaV1(v: TransactionResultMetaV1): Uint8Array {
  return encode(v, writeTransactionResultMetaV1)
}

export function decodeTransactionResultMetaV1(input: Uint8Array | string): TransactionResultMetaV1 {
  return decode(input, readTransactionResultMetaV1)
}

export function toJsonTransactionResultMetaV1(v: TransactionResultMetaV1): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'result': toJsonTransactionResultPair(v.result),
    'fee_processing': toJsonLedgerEntryChanges(v.feeProcessing),
    'tx_apply_processing': toJsonTransactionMeta(v.txApplyProcessing),
    'post_tx_apply_fee_processing': toJsonLedgerEntryChanges(v.postTxApplyFeeProcessing),
  }
}

export function fromJsonTransactionResultMetaV1(json: unknown): TransactionResultMetaV1 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    result: fromJsonTransactionResultPair(o['result']),
    feeProcessing: fromJsonLedgerEntryChanges(o['fee_processing']),
    txApplyProcessing: fromJsonTransactionMeta(o['tx_apply_processing']),
    postTxApplyFeeProcessing: fromJsonLedgerEntryChanges(o['post_tx_apply_fee_processing']),
  }
}

/**
 * this represents a single upgrade that was performed as part of a ledger
 * upgrade
 */
export interface UpgradeEntryMeta {
  readonly upgrade: LedgerUpgrade
  readonly changes: LedgerEntryChanges
}

export function readUpgradeEntryMeta(r: XdrReader): UpgradeEntryMeta {
  beginComposite(r)
  try {
    const upgrade = readLedgerUpgrade(r)
    const changes = readLedgerEntryChanges(r)
    return { upgrade, changes }
  } finally {
    endComposite(r)
  }
}

export function writeUpgradeEntryMeta(w: XdrWriter, v: UpgradeEntryMeta): void {
  writeLedgerUpgrade(w, v.upgrade)
  writeLedgerEntryChanges(w, v.changes)
}

export function encodeUpgradeEntryMeta(v: UpgradeEntryMeta): Uint8Array {
  return encode(v, writeUpgradeEntryMeta)
}

export function decodeUpgradeEntryMeta(input: Uint8Array | string): UpgradeEntryMeta {
  return decode(input, readUpgradeEntryMeta)
}

export function toJsonUpgradeEntryMeta(v: UpgradeEntryMeta): Record<string, unknown> {
  return {
    'upgrade': toJsonLedgerUpgrade(v.upgrade),
    'changes': toJsonLedgerEntryChanges(v.changes),
  }
}

export function fromJsonUpgradeEntryMeta(json: unknown): UpgradeEntryMeta {
  const o = json as Record<string, unknown>
  return {
    upgrade: fromJsonLedgerUpgrade(o['upgrade']),
    changes: fromJsonLedgerEntryChanges(o['changes']),
  }
}

export interface LedgerCloseMetaV0 {
  readonly ledgerHeader: LedgerHeaderHistoryEntry
  /** NB: txSet is sorted in "Hash order" */
  readonly txSet: TransactionSet
  /**
   * NB: transactions are sorted in apply order here
   * fees for all transactions are processed first
   * followed by applying transactions
   */
  readonly txProcessing: TransactionResultMeta[]
  /** upgrades are applied last */
  readonly upgradesProcessing: UpgradeEntryMeta[]
  /** other misc information attached to the ledger close */
  readonly scpInfo: SCPHistoryEntry[]
}

export function readLedgerCloseMetaV0(r: XdrReader): LedgerCloseMetaV0 {
  beginComposite(r)
  try {
    const ledgerHeader = readLedgerHeaderHistoryEntry(r)
    const txSet = readTransactionSet(r)
    const txProcessing = readVarArray(r, UINT32_MAX, readTransactionResultMeta)
    const upgradesProcessing = readVarArray(r, UINT32_MAX, readUpgradeEntryMeta)
    const scpInfo = readVarArray(r, UINT32_MAX, readSCPHistoryEntry)
    return { ledgerHeader, txSet, txProcessing, upgradesProcessing, scpInfo }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerCloseMetaV0(w: XdrWriter, v: LedgerCloseMetaV0): void {
  writeLedgerHeaderHistoryEntry(w, v.ledgerHeader)
  writeTransactionSet(w, v.txSet)
  writeVarArray(w, v.txProcessing, UINT32_MAX, writeTransactionResultMeta)
  writeVarArray(w, v.upgradesProcessing, UINT32_MAX, writeUpgradeEntryMeta)
  writeVarArray(w, v.scpInfo, UINT32_MAX, writeSCPHistoryEntry)
}

export function encodeLedgerCloseMetaV0(v: LedgerCloseMetaV0): Uint8Array {
  return encode(v, writeLedgerCloseMetaV0)
}

export function decodeLedgerCloseMetaV0(input: Uint8Array | string): LedgerCloseMetaV0 {
  return decode(input, readLedgerCloseMetaV0)
}

export function toJsonLedgerCloseMetaV0(v: LedgerCloseMetaV0): Record<string, unknown> {
  return {
    'ledger_header': toJsonLedgerHeaderHistoryEntry(v.ledgerHeader),
    'tx_set': toJsonTransactionSet(v.txSet),
    'tx_processing': v.txProcessing.map((item: any) => toJsonTransactionResultMeta(item)),
    'upgrades_processing': v.upgradesProcessing.map((item: any) => toJsonUpgradeEntryMeta(item)),
    'scp_info': v.scpInfo.map((item: any) => toJsonSCPHistoryEntry(item)),
  }
}

export function fromJsonLedgerCloseMetaV0(json: unknown): LedgerCloseMetaV0 {
  const o = json as Record<string, unknown>
  return {
    ledgerHeader: fromJsonLedgerHeaderHistoryEntry(o['ledger_header']),
    txSet: fromJsonTransactionSet(o['tx_set']),
    txProcessing: ((o['tx_processing']) as unknown[]).map((item: unknown) => fromJsonTransactionResultMeta(item)),
    upgradesProcessing: ((o['upgrades_processing']) as unknown[]).map((item: unknown) => fromJsonUpgradeEntryMeta(item)),
    scpInfo: ((o['scp_info']) as unknown[]).map((item: unknown) => fromJsonSCPHistoryEntry(item)),
  }
}

export interface LedgerCloseMetaExtV1 {
  readonly ext: ExtensionPoint
  readonly sorobanFeeWrite1KB: int64
}

export function readLedgerCloseMetaExtV1(r: XdrReader): LedgerCloseMetaExtV1 {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const sorobanFeeWrite1KB = readint64(r)
    return { ext, sorobanFeeWrite1KB }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerCloseMetaExtV1(w: XdrWriter, v: LedgerCloseMetaExtV1): void {
  writeExtensionPoint(w, v.ext)
  writeint64(w, v.sorobanFeeWrite1KB)
}

export function encodeLedgerCloseMetaExtV1(v: LedgerCloseMetaExtV1): Uint8Array {
  return encode(v, writeLedgerCloseMetaExtV1)
}

export function decodeLedgerCloseMetaExtV1(input: Uint8Array | string): LedgerCloseMetaExtV1 {
  return decode(input, readLedgerCloseMetaExtV1)
}

export function toJsonLedgerCloseMetaExtV1(v: LedgerCloseMetaExtV1): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'soroban_fee_write1_kb': toJsonint64(v.sorobanFeeWrite1KB),
  }
}

export function fromJsonLedgerCloseMetaExtV1(json: unknown): LedgerCloseMetaExtV1 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    sorobanFeeWrite1KB: fromJsonint64(o['soroban_fee_write1_kb']),
  }
}

export type LedgerCloseMetaExt =
  | { readonly v: 0 }
  | { readonly v: 1; readonly v1: LedgerCloseMetaExtV1 }

export function readLedgerCloseMetaExt(r: XdrReader): LedgerCloseMetaExt {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: LedgerCloseMetaExt
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, v1: readLedgerCloseMetaExtV1(r) }; break
      default:
        throw new XdrReadError(`Unknown LedgerCloseMetaExt discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerCloseMetaExt(w: XdrWriter, v: LedgerCloseMetaExt): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeLedgerCloseMetaExtV1(w, (v as any).v1); break
  }
}

export function encodeLedgerCloseMetaExt(v: LedgerCloseMetaExt): Uint8Array {
  return encode(v, writeLedgerCloseMetaExt)
}

export function decodeLedgerCloseMetaExt(input: Uint8Array | string): LedgerCloseMetaExt {
  return decode(input, readLedgerCloseMetaExt)
}

export function toJsonLedgerCloseMetaExt(v: LedgerCloseMetaExt): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonLedgerCloseMetaExtV1((v as any).v1) }
  }
}

export function fromJsonLedgerCloseMetaExt(json: unknown): LedgerCloseMetaExt {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as LedgerCloseMetaExt
    throw new Error(`Unknown LedgerCloseMetaExt variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, v1: fromJsonLedgerCloseMetaExtV1(obj[key]) } as LedgerCloseMetaExt
    default: throw new Error(`Unknown LedgerCloseMetaExt variant: ${key}`)
  }
}

export interface LedgerCloseMetaV1 {
  readonly ext: LedgerCloseMetaExt
  readonly ledgerHeader: LedgerHeaderHistoryEntry
  readonly txSet: GeneralizedTransactionSet
  /**
   * NB: transactions are sorted in apply order here
   * fees for all transactions are processed first
   * followed by applying transactions
   */
  readonly txProcessing: TransactionResultMeta[]
  /** upgrades are applied last */
  readonly upgradesProcessing: UpgradeEntryMeta[]
  /** other misc information attached to the ledger close */
  readonly scpInfo: SCPHistoryEntry[]
  /**
   * Size in bytes of live Soroban state, to support downstream
   * systems calculating storage fees correctly.
   */
  readonly totalByteSizeOfLiveSorobanState: uint64
  /** TTL and data/code keys that have been evicted at this ledger. */
  readonly evictedKeys: LedgerKey[]
  /** Maintained for backwards compatibility, should never be populated. */
  readonly unused: LedgerEntry[]
}

export function readLedgerCloseMetaV1(r: XdrReader): LedgerCloseMetaV1 {
  beginComposite(r)
  try {
    const ext = readLedgerCloseMetaExt(r)
    const ledgerHeader = readLedgerHeaderHistoryEntry(r)
    const txSet = readGeneralizedTransactionSet(r)
    const txProcessing = readVarArray(r, UINT32_MAX, readTransactionResultMeta)
    const upgradesProcessing = readVarArray(r, UINT32_MAX, readUpgradeEntryMeta)
    const scpInfo = readVarArray(r, UINT32_MAX, readSCPHistoryEntry)
    const totalByteSizeOfLiveSorobanState = readuint64(r)
    const evictedKeys = readVarArray(r, UINT32_MAX, readLedgerKey)
    const unused = readVarArray(r, UINT32_MAX, readLedgerEntry)
    return { ext, ledgerHeader, txSet, txProcessing, upgradesProcessing, scpInfo, totalByteSizeOfLiveSorobanState, evictedKeys, unused }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerCloseMetaV1(w: XdrWriter, v: LedgerCloseMetaV1): void {
  writeLedgerCloseMetaExt(w, v.ext)
  writeLedgerHeaderHistoryEntry(w, v.ledgerHeader)
  writeGeneralizedTransactionSet(w, v.txSet)
  writeVarArray(w, v.txProcessing, UINT32_MAX, writeTransactionResultMeta)
  writeVarArray(w, v.upgradesProcessing, UINT32_MAX, writeUpgradeEntryMeta)
  writeVarArray(w, v.scpInfo, UINT32_MAX, writeSCPHistoryEntry)
  writeuint64(w, v.totalByteSizeOfLiveSorobanState)
  writeVarArray(w, v.evictedKeys, UINT32_MAX, writeLedgerKey)
  writeVarArray(w, v.unused, UINT32_MAX, writeLedgerEntry)
}

export function encodeLedgerCloseMetaV1(v: LedgerCloseMetaV1): Uint8Array {
  return encode(v, writeLedgerCloseMetaV1)
}

export function decodeLedgerCloseMetaV1(input: Uint8Array | string): LedgerCloseMetaV1 {
  return decode(input, readLedgerCloseMetaV1)
}

export function toJsonLedgerCloseMetaV1(v: LedgerCloseMetaV1): Record<string, unknown> {
  return {
    'ext': toJsonLedgerCloseMetaExt(v.ext),
    'ledger_header': toJsonLedgerHeaderHistoryEntry(v.ledgerHeader),
    'tx_set': toJsonGeneralizedTransactionSet(v.txSet),
    'tx_processing': v.txProcessing.map((item: any) => toJsonTransactionResultMeta(item)),
    'upgrades_processing': v.upgradesProcessing.map((item: any) => toJsonUpgradeEntryMeta(item)),
    'scp_info': v.scpInfo.map((item: any) => toJsonSCPHistoryEntry(item)),
    'total_byte_size_of_live_soroban_state': toJsonuint64(v.totalByteSizeOfLiveSorobanState),
    'evicted_keys': v.evictedKeys.map((item: any) => toJsonLedgerKey(item)),
    'unused': v.unused.map((item: any) => toJsonLedgerEntry(item)),
  }
}

export function fromJsonLedgerCloseMetaV1(json: unknown): LedgerCloseMetaV1 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonLedgerCloseMetaExt(o['ext']),
    ledgerHeader: fromJsonLedgerHeaderHistoryEntry(o['ledger_header']),
    txSet: fromJsonGeneralizedTransactionSet(o['tx_set']),
    txProcessing: ((o['tx_processing']) as unknown[]).map((item: unknown) => fromJsonTransactionResultMeta(item)),
    upgradesProcessing: ((o['upgrades_processing']) as unknown[]).map((item: unknown) => fromJsonUpgradeEntryMeta(item)),
    scpInfo: ((o['scp_info']) as unknown[]).map((item: unknown) => fromJsonSCPHistoryEntry(item)),
    totalByteSizeOfLiveSorobanState: fromJsonuint64(o['total_byte_size_of_live_soroban_state']),
    evictedKeys: ((o['evicted_keys']) as unknown[]).map((item: unknown) => fromJsonLedgerKey(item)),
    unused: ((o['unused']) as unknown[]).map((item: unknown) => fromJsonLedgerEntry(item)),
  }
}

export interface LedgerCloseMetaV2 {
  readonly ext: LedgerCloseMetaExt
  readonly ledgerHeader: LedgerHeaderHistoryEntry
  readonly txSet: GeneralizedTransactionSet
  /**
   * NB: transactions are sorted in apply order here
   * fees for all transactions are processed first
   * followed by applying transactions
   */
  readonly txProcessing: TransactionResultMetaV1[]
  /** upgrades are applied last */
  readonly upgradesProcessing: UpgradeEntryMeta[]
  /** other misc information attached to the ledger close */
  readonly scpInfo: SCPHistoryEntry[]
  /**
   * Size in bytes of live Soroban state, to support downstream
   * systems calculating storage fees correctly.
   */
  readonly totalByteSizeOfLiveSorobanState: uint64
  /** TTL and data/code keys that have been evicted at this ledger. */
  readonly evictedKeys: LedgerKey[]
}

export function readLedgerCloseMetaV2(r: XdrReader): LedgerCloseMetaV2 {
  beginComposite(r)
  try {
    const ext = readLedgerCloseMetaExt(r)
    const ledgerHeader = readLedgerHeaderHistoryEntry(r)
    const txSet = readGeneralizedTransactionSet(r)
    const txProcessing = readVarArray(r, UINT32_MAX, readTransactionResultMetaV1)
    const upgradesProcessing = readVarArray(r, UINT32_MAX, readUpgradeEntryMeta)
    const scpInfo = readVarArray(r, UINT32_MAX, readSCPHistoryEntry)
    const totalByteSizeOfLiveSorobanState = readuint64(r)
    const evictedKeys = readVarArray(r, UINT32_MAX, readLedgerKey)
    return { ext, ledgerHeader, txSet, txProcessing, upgradesProcessing, scpInfo, totalByteSizeOfLiveSorobanState, evictedKeys }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerCloseMetaV2(w: XdrWriter, v: LedgerCloseMetaV2): void {
  writeLedgerCloseMetaExt(w, v.ext)
  writeLedgerHeaderHistoryEntry(w, v.ledgerHeader)
  writeGeneralizedTransactionSet(w, v.txSet)
  writeVarArray(w, v.txProcessing, UINT32_MAX, writeTransactionResultMetaV1)
  writeVarArray(w, v.upgradesProcessing, UINT32_MAX, writeUpgradeEntryMeta)
  writeVarArray(w, v.scpInfo, UINT32_MAX, writeSCPHistoryEntry)
  writeuint64(w, v.totalByteSizeOfLiveSorobanState)
  writeVarArray(w, v.evictedKeys, UINT32_MAX, writeLedgerKey)
}

export function encodeLedgerCloseMetaV2(v: LedgerCloseMetaV2): Uint8Array {
  return encode(v, writeLedgerCloseMetaV2)
}

export function decodeLedgerCloseMetaV2(input: Uint8Array | string): LedgerCloseMetaV2 {
  return decode(input, readLedgerCloseMetaV2)
}

export function toJsonLedgerCloseMetaV2(v: LedgerCloseMetaV2): Record<string, unknown> {
  return {
    'ext': toJsonLedgerCloseMetaExt(v.ext),
    'ledger_header': toJsonLedgerHeaderHistoryEntry(v.ledgerHeader),
    'tx_set': toJsonGeneralizedTransactionSet(v.txSet),
    'tx_processing': v.txProcessing.map((item: any) => toJsonTransactionResultMetaV1(item)),
    'upgrades_processing': v.upgradesProcessing.map((item: any) => toJsonUpgradeEntryMeta(item)),
    'scp_info': v.scpInfo.map((item: any) => toJsonSCPHistoryEntry(item)),
    'total_byte_size_of_live_soroban_state': toJsonuint64(v.totalByteSizeOfLiveSorobanState),
    'evicted_keys': v.evictedKeys.map((item: any) => toJsonLedgerKey(item)),
  }
}

export function fromJsonLedgerCloseMetaV2(json: unknown): LedgerCloseMetaV2 {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonLedgerCloseMetaExt(o['ext']),
    ledgerHeader: fromJsonLedgerHeaderHistoryEntry(o['ledger_header']),
    txSet: fromJsonGeneralizedTransactionSet(o['tx_set']),
    txProcessing: ((o['tx_processing']) as unknown[]).map((item: unknown) => fromJsonTransactionResultMetaV1(item)),
    upgradesProcessing: ((o['upgrades_processing']) as unknown[]).map((item: unknown) => fromJsonUpgradeEntryMeta(item)),
    scpInfo: ((o['scp_info']) as unknown[]).map((item: unknown) => fromJsonSCPHistoryEntry(item)),
    totalByteSizeOfLiveSorobanState: fromJsonuint64(o['total_byte_size_of_live_soroban_state']),
    evictedKeys: ((o['evicted_keys']) as unknown[]).map((item: unknown) => fromJsonLedgerKey(item)),
  }
}

export type LedgerCloseMeta =
  | { readonly v: 0; readonly v0: LedgerCloseMetaV0 }
  | { readonly v: 1; readonly v1: LedgerCloseMetaV1 }
  | { readonly v: 2; readonly v2: LedgerCloseMetaV2 }

export function readLedgerCloseMeta(r: XdrReader): LedgerCloseMeta {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: LedgerCloseMeta
    switch (v) {
      case 0:
        result = { v, v0: readLedgerCloseMetaV0(r) }; break
      case 1:
        result = { v, v1: readLedgerCloseMetaV1(r) }; break
      case 2:
        result = { v, v2: readLedgerCloseMetaV2(r) }; break
      default:
        throw new XdrReadError(`Unknown LedgerCloseMeta discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLedgerCloseMeta(w: XdrWriter, v: LedgerCloseMeta): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      writeLedgerCloseMetaV0(w, (v as any).v0); break
    case 1:
      writeLedgerCloseMetaV1(w, (v as any).v1); break
    case 2:
      writeLedgerCloseMetaV2(w, (v as any).v2); break
  }
}

export function encodeLedgerCloseMeta(v: LedgerCloseMeta): Uint8Array {
  return encode(v, writeLedgerCloseMeta)
}

export function decodeLedgerCloseMeta(input: Uint8Array | string): LedgerCloseMeta {
  return decode(input, readLedgerCloseMeta)
}

export function toJsonLedgerCloseMeta(v: LedgerCloseMeta): unknown {
  switch (v.v) {
    case 0:
      return { 'v0': toJsonLedgerCloseMetaV0((v as any).v0) }
    case 1:
      return { 'v1': toJsonLedgerCloseMetaV1((v as any).v1) }
    case 2:
      return { 'v2': toJsonLedgerCloseMetaV2((v as any).v2) }
  }
}

export function fromJsonLedgerCloseMeta(json: unknown): LedgerCloseMeta {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for LedgerCloseMeta: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v0':
      return { v: 0, v0: fromJsonLedgerCloseMetaV0(obj[key]) } as LedgerCloseMeta
    case 'v1':
      return { v: 1, v1: fromJsonLedgerCloseMetaV1(obj[key]) } as LedgerCloseMeta
    case 'v2':
      return { v: 2, v2: fromJsonLedgerCloseMetaV2(obj[key]) } as LedgerCloseMeta
    default: throw new Error(`Unknown LedgerCloseMeta variant: ${key}`)
  }
}
