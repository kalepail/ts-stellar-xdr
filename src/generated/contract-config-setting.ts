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

import type { ExtensionPoint, int64, uint32, uint64 } from './types.js'
import { readExtensionPoint, writeExtensionPoint, toJsonExtensionPoint, fromJsonExtensionPoint, readint64, writeint64, toJsonint64, fromJsonint64, readuint32, writeuint32, toJsonuint32, fromJsonuint32, readuint64, writeuint64, toJsonuint64, fromJsonuint64 } from './types.js'


/** General “Soroban execution lane” settings */
export interface ConfigSettingContractExecutionLanesV0 {
  /** maximum number of Soroban transactions per ledger */
  readonly ledgerMaxTxCount: uint32
}

export function readConfigSettingContractExecutionLanesV0(r: XdrReader): ConfigSettingContractExecutionLanesV0 {
  beginComposite(r)
  try {
    const ledgerMaxTxCount = readuint32(r)
    return { ledgerMaxTxCount }
  } finally {
    endComposite(r)
  }
}

export function writeConfigSettingContractExecutionLanesV0(w: XdrWriter, v: ConfigSettingContractExecutionLanesV0): void {
  writeuint32(w, v.ledgerMaxTxCount)
}

export function encodeConfigSettingContractExecutionLanesV0(v: ConfigSettingContractExecutionLanesV0): Uint8Array {
  return encode(v, writeConfigSettingContractExecutionLanesV0)
}

export function decodeConfigSettingContractExecutionLanesV0(input: Uint8Array | string): ConfigSettingContractExecutionLanesV0 {
  return decode(input, readConfigSettingContractExecutionLanesV0)
}

export function toJsonConfigSettingContractExecutionLanesV0(v: ConfigSettingContractExecutionLanesV0): Record<string, unknown> {
  return {
    'ledger_max_tx_count': toJsonuint32(v.ledgerMaxTxCount),
  }
}

export function fromJsonConfigSettingContractExecutionLanesV0(json: unknown): ConfigSettingContractExecutionLanesV0 {
  const o = json as Record<string, unknown>
  return {
    ledgerMaxTxCount: fromJsonuint32(o['ledger_max_tx_count']),
  }
}

/** "Compute" settings for contracts (instructions and memory). */
export interface ConfigSettingContractComputeV0 {
  /** Maximum instructions per ledger */
  readonly ledgerMaxInstructions: int64
  /** Maximum instructions per transaction */
  readonly txMaxInstructions: int64
  /** Cost of 10000 instructions */
  readonly feeRatePerInstructionsIncrement: int64
  /**
   * Memory limit per transaction. Unlike instructions, there is no fee
   * for memory, just the limit.
   */
  readonly txMemoryLimit: uint32
}

export function readConfigSettingContractComputeV0(r: XdrReader): ConfigSettingContractComputeV0 {
  beginComposite(r)
  try {
    const ledgerMaxInstructions = readint64(r)
    const txMaxInstructions = readint64(r)
    const feeRatePerInstructionsIncrement = readint64(r)
    const txMemoryLimit = readuint32(r)
    return { ledgerMaxInstructions, txMaxInstructions, feeRatePerInstructionsIncrement, txMemoryLimit }
  } finally {
    endComposite(r)
  }
}

export function writeConfigSettingContractComputeV0(w: XdrWriter, v: ConfigSettingContractComputeV0): void {
  writeint64(w, v.ledgerMaxInstructions)
  writeint64(w, v.txMaxInstructions)
  writeint64(w, v.feeRatePerInstructionsIncrement)
  writeuint32(w, v.txMemoryLimit)
}

export function encodeConfigSettingContractComputeV0(v: ConfigSettingContractComputeV0): Uint8Array {
  return encode(v, writeConfigSettingContractComputeV0)
}

export function decodeConfigSettingContractComputeV0(input: Uint8Array | string): ConfigSettingContractComputeV0 {
  return decode(input, readConfigSettingContractComputeV0)
}

export function toJsonConfigSettingContractComputeV0(v: ConfigSettingContractComputeV0): Record<string, unknown> {
  return {
    'ledger_max_instructions': toJsonint64(v.ledgerMaxInstructions),
    'tx_max_instructions': toJsonint64(v.txMaxInstructions),
    'fee_rate_per_instructions_increment': toJsonint64(v.feeRatePerInstructionsIncrement),
    'tx_memory_limit': toJsonuint32(v.txMemoryLimit),
  }
}

export function fromJsonConfigSettingContractComputeV0(json: unknown): ConfigSettingContractComputeV0 {
  const o = json as Record<string, unknown>
  return {
    ledgerMaxInstructions: fromJsonint64(o['ledger_max_instructions']),
    txMaxInstructions: fromJsonint64(o['tx_max_instructions']),
    feeRatePerInstructionsIncrement: fromJsonint64(o['fee_rate_per_instructions_increment']),
    txMemoryLimit: fromJsonuint32(o['tx_memory_limit']),
  }
}

/** Settings for running the contract transactions in parallel. */
export interface ConfigSettingContractParallelComputeV0 {
  /**
   * Maximum number of clusters with dependent transactions allowed in a
   * stage of parallel tx set component.
   * This effectively sets the lower bound on the number of physical threads
   * necessary to effectively apply transaction sets in parallel.
   */
  readonly ledgerMaxDependentTxClusters: uint32
}

export function readConfigSettingContractParallelComputeV0(r: XdrReader): ConfigSettingContractParallelComputeV0 {
  beginComposite(r)
  try {
    const ledgerMaxDependentTxClusters = readuint32(r)
    return { ledgerMaxDependentTxClusters }
  } finally {
    endComposite(r)
  }
}

export function writeConfigSettingContractParallelComputeV0(w: XdrWriter, v: ConfigSettingContractParallelComputeV0): void {
  writeuint32(w, v.ledgerMaxDependentTxClusters)
}

export function encodeConfigSettingContractParallelComputeV0(v: ConfigSettingContractParallelComputeV0): Uint8Array {
  return encode(v, writeConfigSettingContractParallelComputeV0)
}

export function decodeConfigSettingContractParallelComputeV0(input: Uint8Array | string): ConfigSettingContractParallelComputeV0 {
  return decode(input, readConfigSettingContractParallelComputeV0)
}

export function toJsonConfigSettingContractParallelComputeV0(v: ConfigSettingContractParallelComputeV0): Record<string, unknown> {
  return {
    'ledger_max_dependent_tx_clusters': toJsonuint32(v.ledgerMaxDependentTxClusters),
  }
}

export function fromJsonConfigSettingContractParallelComputeV0(json: unknown): ConfigSettingContractParallelComputeV0 {
  const o = json as Record<string, unknown>
  return {
    ledgerMaxDependentTxClusters: fromJsonuint32(o['ledger_max_dependent_tx_clusters']),
  }
}

/** Ledger access settings for contracts. */
export interface ConfigSettingContractLedgerCostV0 {
  /** Maximum number of disk entry read operations per ledger */
  readonly ledgerMaxDiskReadEntries: uint32
  /** Maximum number of bytes of disk reads that can be performed per ledger */
  readonly ledgerMaxDiskReadBytes: uint32
  /** Maximum number of ledger entry write operations per ledger */
  readonly ledgerMaxWriteLedgerEntries: uint32
  /** Maximum number of bytes that can be written per ledger */
  readonly ledgerMaxWriteBytes: uint32
  /** Maximum number of disk entry read operations per transaction */
  readonly txMaxDiskReadEntries: uint32
  /** Maximum number of bytes of disk reads that can be performed per transaction */
  readonly txMaxDiskReadBytes: uint32
  /** Maximum number of ledger entry write operations per transaction */
  readonly txMaxWriteLedgerEntries: uint32
  /** Maximum number of bytes that can be written per transaction */
  readonly txMaxWriteBytes: uint32
  readonly feeDiskReadLedgerEntry: int64
  /** Fee per disk ledger entry read */
  readonly feeWriteLedgerEntry: int64
  readonly feeDiskRead1KB: int64
  /**
   * The following parameters determine the write fee per 1KB.
   * Rent fee grows linearly until soroban state reaches this size
   */
  readonly sorobanStateTargetSizeBytes: int64
  /** Fee per 1KB rent when the soroban state is empty */
  readonly rentFee1KBSorobanStateSizeLow: int64
  /** Fee per 1KB rent when the soroban state has reached `sorobanStateTargetSizeBytes` */
  readonly rentFee1KBSorobanStateSizeHigh: int64
  /** Rent fee multiplier for any additional data past the first `sorobanStateTargetSizeBytes` */
  readonly sorobanStateRentFeeGrowthFactor: uint32
}

export function readConfigSettingContractLedgerCostV0(r: XdrReader): ConfigSettingContractLedgerCostV0 {
  beginComposite(r)
  try {
    const ledgerMaxDiskReadEntries = readuint32(r)
    const ledgerMaxDiskReadBytes = readuint32(r)
    const ledgerMaxWriteLedgerEntries = readuint32(r)
    const ledgerMaxWriteBytes = readuint32(r)
    const txMaxDiskReadEntries = readuint32(r)
    const txMaxDiskReadBytes = readuint32(r)
    const txMaxWriteLedgerEntries = readuint32(r)
    const txMaxWriteBytes = readuint32(r)
    const feeDiskReadLedgerEntry = readint64(r)
    const feeWriteLedgerEntry = readint64(r)
    const feeDiskRead1KB = readint64(r)
    const sorobanStateTargetSizeBytes = readint64(r)
    const rentFee1KBSorobanStateSizeLow = readint64(r)
    const rentFee1KBSorobanStateSizeHigh = readint64(r)
    const sorobanStateRentFeeGrowthFactor = readuint32(r)
    return { ledgerMaxDiskReadEntries, ledgerMaxDiskReadBytes, ledgerMaxWriteLedgerEntries, ledgerMaxWriteBytes, txMaxDiskReadEntries, txMaxDiskReadBytes, txMaxWriteLedgerEntries, txMaxWriteBytes, feeDiskReadLedgerEntry, feeWriteLedgerEntry, feeDiskRead1KB, sorobanStateTargetSizeBytes, rentFee1KBSorobanStateSizeLow, rentFee1KBSorobanStateSizeHigh, sorobanStateRentFeeGrowthFactor }
  } finally {
    endComposite(r)
  }
}

export function writeConfigSettingContractLedgerCostV0(w: XdrWriter, v: ConfigSettingContractLedgerCostV0): void {
  writeuint32(w, v.ledgerMaxDiskReadEntries)
  writeuint32(w, v.ledgerMaxDiskReadBytes)
  writeuint32(w, v.ledgerMaxWriteLedgerEntries)
  writeuint32(w, v.ledgerMaxWriteBytes)
  writeuint32(w, v.txMaxDiskReadEntries)
  writeuint32(w, v.txMaxDiskReadBytes)
  writeuint32(w, v.txMaxWriteLedgerEntries)
  writeuint32(w, v.txMaxWriteBytes)
  writeint64(w, v.feeDiskReadLedgerEntry)
  writeint64(w, v.feeWriteLedgerEntry)
  writeint64(w, v.feeDiskRead1KB)
  writeint64(w, v.sorobanStateTargetSizeBytes)
  writeint64(w, v.rentFee1KBSorobanStateSizeLow)
  writeint64(w, v.rentFee1KBSorobanStateSizeHigh)
  writeuint32(w, v.sorobanStateRentFeeGrowthFactor)
}

export function encodeConfigSettingContractLedgerCostV0(v: ConfigSettingContractLedgerCostV0): Uint8Array {
  return encode(v, writeConfigSettingContractLedgerCostV0)
}

export function decodeConfigSettingContractLedgerCostV0(input: Uint8Array | string): ConfigSettingContractLedgerCostV0 {
  return decode(input, readConfigSettingContractLedgerCostV0)
}

export function toJsonConfigSettingContractLedgerCostV0(v: ConfigSettingContractLedgerCostV0): Record<string, unknown> {
  return {
    'ledger_max_disk_read_entries': toJsonuint32(v.ledgerMaxDiskReadEntries),
    'ledger_max_disk_read_bytes': toJsonuint32(v.ledgerMaxDiskReadBytes),
    'ledger_max_write_ledger_entries': toJsonuint32(v.ledgerMaxWriteLedgerEntries),
    'ledger_max_write_bytes': toJsonuint32(v.ledgerMaxWriteBytes),
    'tx_max_disk_read_entries': toJsonuint32(v.txMaxDiskReadEntries),
    'tx_max_disk_read_bytes': toJsonuint32(v.txMaxDiskReadBytes),
    'tx_max_write_ledger_entries': toJsonuint32(v.txMaxWriteLedgerEntries),
    'tx_max_write_bytes': toJsonuint32(v.txMaxWriteBytes),
    'fee_disk_read_ledger_entry': toJsonint64(v.feeDiskReadLedgerEntry),
    'fee_write_ledger_entry': toJsonint64(v.feeWriteLedgerEntry),
    'fee_disk_read1_kb': toJsonint64(v.feeDiskRead1KB),
    'soroban_state_target_size_bytes': toJsonint64(v.sorobanStateTargetSizeBytes),
    'rent_fee1_kb_soroban_state_size_low': toJsonint64(v.rentFee1KBSorobanStateSizeLow),
    'rent_fee1_kb_soroban_state_size_high': toJsonint64(v.rentFee1KBSorobanStateSizeHigh),
    'soroban_state_rent_fee_growth_factor': toJsonuint32(v.sorobanStateRentFeeGrowthFactor),
  }
}

export function fromJsonConfigSettingContractLedgerCostV0(json: unknown): ConfigSettingContractLedgerCostV0 {
  const o = json as Record<string, unknown>
  return {
    ledgerMaxDiskReadEntries: fromJsonuint32(o['ledger_max_disk_read_entries']),
    ledgerMaxDiskReadBytes: fromJsonuint32(o['ledger_max_disk_read_bytes']),
    ledgerMaxWriteLedgerEntries: fromJsonuint32(o['ledger_max_write_ledger_entries']),
    ledgerMaxWriteBytes: fromJsonuint32(o['ledger_max_write_bytes']),
    txMaxDiskReadEntries: fromJsonuint32(o['tx_max_disk_read_entries']),
    txMaxDiskReadBytes: fromJsonuint32(o['tx_max_disk_read_bytes']),
    txMaxWriteLedgerEntries: fromJsonuint32(o['tx_max_write_ledger_entries']),
    txMaxWriteBytes: fromJsonuint32(o['tx_max_write_bytes']),
    feeDiskReadLedgerEntry: fromJsonint64(o['fee_disk_read_ledger_entry']),
    feeWriteLedgerEntry: fromJsonint64(o['fee_write_ledger_entry']),
    feeDiskRead1KB: fromJsonint64(o['fee_disk_read1_kb']),
    sorobanStateTargetSizeBytes: fromJsonint64(o['soroban_state_target_size_bytes']),
    rentFee1KBSorobanStateSizeLow: fromJsonint64(o['rent_fee1_kb_soroban_state_size_low']),
    rentFee1KBSorobanStateSizeHigh: fromJsonint64(o['rent_fee1_kb_soroban_state_size_high']),
    sorobanStateRentFeeGrowthFactor: fromJsonuint32(o['soroban_state_rent_fee_growth_factor']),
  }
}

/** Ledger access settings for contracts. */
export interface ConfigSettingContractLedgerCostExtV0 {
  /** Maximum number of RO+RW entries in the transaction footprint. */
  readonly txMaxFootprintEntries: uint32
  /**
   * Fee per 1 KB of data written to the ledger.
   * Unlike the rent fee, this is a flat fee that is charged for any ledger
   * write, independent of the type of the entry being written.
   */
  readonly feeWrite1KB: int64
}

export function readConfigSettingContractLedgerCostExtV0(r: XdrReader): ConfigSettingContractLedgerCostExtV0 {
  beginComposite(r)
  try {
    const txMaxFootprintEntries = readuint32(r)
    const feeWrite1KB = readint64(r)
    return { txMaxFootprintEntries, feeWrite1KB }
  } finally {
    endComposite(r)
  }
}

export function writeConfigSettingContractLedgerCostExtV0(w: XdrWriter, v: ConfigSettingContractLedgerCostExtV0): void {
  writeuint32(w, v.txMaxFootprintEntries)
  writeint64(w, v.feeWrite1KB)
}

export function encodeConfigSettingContractLedgerCostExtV0(v: ConfigSettingContractLedgerCostExtV0): Uint8Array {
  return encode(v, writeConfigSettingContractLedgerCostExtV0)
}

export function decodeConfigSettingContractLedgerCostExtV0(input: Uint8Array | string): ConfigSettingContractLedgerCostExtV0 {
  return decode(input, readConfigSettingContractLedgerCostExtV0)
}

export function toJsonConfigSettingContractLedgerCostExtV0(v: ConfigSettingContractLedgerCostExtV0): Record<string, unknown> {
  return {
    'tx_max_footprint_entries': toJsonuint32(v.txMaxFootprintEntries),
    'fee_write1_kb': toJsonint64(v.feeWrite1KB),
  }
}

export function fromJsonConfigSettingContractLedgerCostExtV0(json: unknown): ConfigSettingContractLedgerCostExtV0 {
  const o = json as Record<string, unknown>
  return {
    txMaxFootprintEntries: fromJsonuint32(o['tx_max_footprint_entries']),
    feeWrite1KB: fromJsonint64(o['fee_write1_kb']),
  }
}

/** Historical data (pushed to core archives) settings for contracts. */
export interface ConfigSettingContractHistoricalDataV0 {
  readonly feeHistorical1KB: int64
}

export function readConfigSettingContractHistoricalDataV0(r: XdrReader): ConfigSettingContractHistoricalDataV0 {
  beginComposite(r)
  try {
    const feeHistorical1KB = readint64(r)
    return { feeHistorical1KB }
  } finally {
    endComposite(r)
  }
}

export function writeConfigSettingContractHistoricalDataV0(w: XdrWriter, v: ConfigSettingContractHistoricalDataV0): void {
  writeint64(w, v.feeHistorical1KB)
}

export function encodeConfigSettingContractHistoricalDataV0(v: ConfigSettingContractHistoricalDataV0): Uint8Array {
  return encode(v, writeConfigSettingContractHistoricalDataV0)
}

export function decodeConfigSettingContractHistoricalDataV0(input: Uint8Array | string): ConfigSettingContractHistoricalDataV0 {
  return decode(input, readConfigSettingContractHistoricalDataV0)
}

export function toJsonConfigSettingContractHistoricalDataV0(v: ConfigSettingContractHistoricalDataV0): Record<string, unknown> {
  return {
    'fee_historical1_kb': toJsonint64(v.feeHistorical1KB),
  }
}

export function fromJsonConfigSettingContractHistoricalDataV0(json: unknown): ConfigSettingContractHistoricalDataV0 {
  const o = json as Record<string, unknown>
  return {
    feeHistorical1KB: fromJsonint64(o['fee_historical1_kb']),
  }
}

/** Contract event-related settings. */
export interface ConfigSettingContractEventsV0 {
  /** Maximum size of events that a contract call can emit. */
  readonly txMaxContractEventsSizeBytes: uint32
  /** Fee for generating 1KB of contract events. */
  readonly feeContractEvents1KB: int64
}

export function readConfigSettingContractEventsV0(r: XdrReader): ConfigSettingContractEventsV0 {
  beginComposite(r)
  try {
    const txMaxContractEventsSizeBytes = readuint32(r)
    const feeContractEvents1KB = readint64(r)
    return { txMaxContractEventsSizeBytes, feeContractEvents1KB }
  } finally {
    endComposite(r)
  }
}

export function writeConfigSettingContractEventsV0(w: XdrWriter, v: ConfigSettingContractEventsV0): void {
  writeuint32(w, v.txMaxContractEventsSizeBytes)
  writeint64(w, v.feeContractEvents1KB)
}

export function encodeConfigSettingContractEventsV0(v: ConfigSettingContractEventsV0): Uint8Array {
  return encode(v, writeConfigSettingContractEventsV0)
}

export function decodeConfigSettingContractEventsV0(input: Uint8Array | string): ConfigSettingContractEventsV0 {
  return decode(input, readConfigSettingContractEventsV0)
}

export function toJsonConfigSettingContractEventsV0(v: ConfigSettingContractEventsV0): Record<string, unknown> {
  return {
    'tx_max_contract_events_size_bytes': toJsonuint32(v.txMaxContractEventsSizeBytes),
    'fee_contract_events1_kb': toJsonint64(v.feeContractEvents1KB),
  }
}

export function fromJsonConfigSettingContractEventsV0(json: unknown): ConfigSettingContractEventsV0 {
  const o = json as Record<string, unknown>
  return {
    txMaxContractEventsSizeBytes: fromJsonuint32(o['tx_max_contract_events_size_bytes']),
    feeContractEvents1KB: fromJsonint64(o['fee_contract_events1_kb']),
  }
}

/**
 * Bandwidth related data settings for contracts.
 * We consider bandwidth to only be consumed by the transaction envelopes, hence
 * this concerns only transaction sizes.
 */
export interface ConfigSettingContractBandwidthV0 {
  /** Maximum sum of all transaction sizes in the ledger in bytes */
  readonly ledgerMaxTxsSizeBytes: uint32
  /** Maximum size in bytes for a transaction */
  readonly txMaxSizeBytes: uint32
  /** Fee for 1 KB of transaction size */
  readonly feeTxSize1KB: int64
}

export function readConfigSettingContractBandwidthV0(r: XdrReader): ConfigSettingContractBandwidthV0 {
  beginComposite(r)
  try {
    const ledgerMaxTxsSizeBytes = readuint32(r)
    const txMaxSizeBytes = readuint32(r)
    const feeTxSize1KB = readint64(r)
    return { ledgerMaxTxsSizeBytes, txMaxSizeBytes, feeTxSize1KB }
  } finally {
    endComposite(r)
  }
}

export function writeConfigSettingContractBandwidthV0(w: XdrWriter, v: ConfigSettingContractBandwidthV0): void {
  writeuint32(w, v.ledgerMaxTxsSizeBytes)
  writeuint32(w, v.txMaxSizeBytes)
  writeint64(w, v.feeTxSize1KB)
}

export function encodeConfigSettingContractBandwidthV0(v: ConfigSettingContractBandwidthV0): Uint8Array {
  return encode(v, writeConfigSettingContractBandwidthV0)
}

export function decodeConfigSettingContractBandwidthV0(input: Uint8Array | string): ConfigSettingContractBandwidthV0 {
  return decode(input, readConfigSettingContractBandwidthV0)
}

export function toJsonConfigSettingContractBandwidthV0(v: ConfigSettingContractBandwidthV0): Record<string, unknown> {
  return {
    'ledger_max_txs_size_bytes': toJsonuint32(v.ledgerMaxTxsSizeBytes),
    'tx_max_size_bytes': toJsonuint32(v.txMaxSizeBytes),
    'fee_tx_size1_kb': toJsonint64(v.feeTxSize1KB),
  }
}

export function fromJsonConfigSettingContractBandwidthV0(json: unknown): ConfigSettingContractBandwidthV0 {
  const o = json as Record<string, unknown>
  return {
    ledgerMaxTxsSizeBytes: fromJsonuint32(o['ledger_max_txs_size_bytes']),
    txMaxSizeBytes: fromJsonuint32(o['tx_max_size_bytes']),
    feeTxSize1KB: fromJsonint64(o['fee_tx_size1_kb']),
  }
}

export type ContractCostType =
  | 'WasmInsnExec'
  | 'MemAlloc'
  | 'MemCpy'
  | 'MemCmp'
  | 'DispatchHostFunction'
  | 'VisitObject'
  | 'ValSer'
  | 'ValDeser'
  | 'ComputeSha256Hash'
  | 'ComputeEd25519PubKey'
  | 'VerifyEd25519Sig'
  | 'VmInstantiation'
  | 'VmCachedInstantiation'
  | 'InvokeVmFunction'
  | 'ComputeKeccak256Hash'
  | 'DecodeEcdsaCurve256Sig'
  | 'RecoverEcdsaSecp256k1Key'
  | 'Int256AddSub'
  | 'Int256Mul'
  | 'Int256Div'
  | 'Int256Pow'
  | 'Int256Shift'
  | 'ChaCha20DrawBytes'
  | 'ParseWasmInstructions'
  | 'ParseWasmFunctions'
  | 'ParseWasmGlobals'
  | 'ParseWasmTableEntries'
  | 'ParseWasmTypes'
  | 'ParseWasmDataSegments'
  | 'ParseWasmElemSegments'
  | 'ParseWasmImports'
  | 'ParseWasmExports'
  | 'ParseWasmDataSegmentBytes'
  | 'InstantiateWasmInstructions'
  | 'InstantiateWasmFunctions'
  | 'InstantiateWasmGlobals'
  | 'InstantiateWasmTableEntries'
  | 'InstantiateWasmTypes'
  | 'InstantiateWasmDataSegments'
  | 'InstantiateWasmElemSegments'
  | 'InstantiateWasmImports'
  | 'InstantiateWasmExports'
  | 'InstantiateWasmDataSegmentBytes'
  | 'Sec1DecodePointUncompressed'
  | 'VerifyEcdsaSecp256r1Sig'
  | 'Bls12381EncodeFp'
  | 'Bls12381DecodeFp'
  | 'Bls12381G1CheckPointOnCurve'
  | 'Bls12381G1CheckPointInSubgroup'
  | 'Bls12381G2CheckPointOnCurve'
  | 'Bls12381G2CheckPointInSubgroup'
  | 'Bls12381G1ProjectiveToAffine'
  | 'Bls12381G2ProjectiveToAffine'
  | 'Bls12381G1Add'
  | 'Bls12381G1Mul'
  | 'Bls12381G1Msm'
  | 'Bls12381MapFpToG1'
  | 'Bls12381HashToG1'
  | 'Bls12381G2Add'
  | 'Bls12381G2Mul'
  | 'Bls12381G2Msm'
  | 'Bls12381MapFp2ToG2'
  | 'Bls12381HashToG2'
  | 'Bls12381Pairing'
  | 'Bls12381FrFromU256'
  | 'Bls12381FrToU256'
  | 'Bls12381FrAddSub'
  | 'Bls12381FrMul'
  | 'Bls12381FrPow'
  | 'Bls12381FrInv'
  | 'Bn254EncodeFp'
  | 'Bn254DecodeFp'
  | 'Bn254G1CheckPointOnCurve'
  | 'Bn254G2CheckPointOnCurve'
  | 'Bn254G2CheckPointInSubgroup'
  | 'Bn254G1ProjectiveToAffine'
  | 'Bn254G1Add'
  | 'Bn254G1Mul'
  | 'Bn254Pairing'
  | 'Bn254FrFromU256'
  | 'Bn254FrToU256'
  | 'Bn254FrAddSub'
  | 'Bn254FrMul'
  | 'Bn254FrPow'
  | 'Bn254FrInv'

export const CONTRACT_COST_TYPE_TO_INT: Record<ContractCostType, number> = /*#__PURE__*/ {
  WasmInsnExec: 0,
  MemAlloc: 1,
  MemCpy: 2,
  MemCmp: 3,
  DispatchHostFunction: 4,
  VisitObject: 5,
  ValSer: 6,
  ValDeser: 7,
  ComputeSha256Hash: 8,
  ComputeEd25519PubKey: 9,
  VerifyEd25519Sig: 10,
  VmInstantiation: 11,
  VmCachedInstantiation: 12,
  InvokeVmFunction: 13,
  ComputeKeccak256Hash: 14,
  DecodeEcdsaCurve256Sig: 15,
  RecoverEcdsaSecp256k1Key: 16,
  Int256AddSub: 17,
  Int256Mul: 18,
  Int256Div: 19,
  Int256Pow: 20,
  Int256Shift: 21,
  ChaCha20DrawBytes: 22,
  ParseWasmInstructions: 23,
  ParseWasmFunctions: 24,
  ParseWasmGlobals: 25,
  ParseWasmTableEntries: 26,
  ParseWasmTypes: 27,
  ParseWasmDataSegments: 28,
  ParseWasmElemSegments: 29,
  ParseWasmImports: 30,
  ParseWasmExports: 31,
  ParseWasmDataSegmentBytes: 32,
  InstantiateWasmInstructions: 33,
  InstantiateWasmFunctions: 34,
  InstantiateWasmGlobals: 35,
  InstantiateWasmTableEntries: 36,
  InstantiateWasmTypes: 37,
  InstantiateWasmDataSegments: 38,
  InstantiateWasmElemSegments: 39,
  InstantiateWasmImports: 40,
  InstantiateWasmExports: 41,
  InstantiateWasmDataSegmentBytes: 42,
  Sec1DecodePointUncompressed: 43,
  VerifyEcdsaSecp256r1Sig: 44,
  Bls12381EncodeFp: 45,
  Bls12381DecodeFp: 46,
  Bls12381G1CheckPointOnCurve: 47,
  Bls12381G1CheckPointInSubgroup: 48,
  Bls12381G2CheckPointOnCurve: 49,
  Bls12381G2CheckPointInSubgroup: 50,
  Bls12381G1ProjectiveToAffine: 51,
  Bls12381G2ProjectiveToAffine: 52,
  Bls12381G1Add: 53,
  Bls12381G1Mul: 54,
  Bls12381G1Msm: 55,
  Bls12381MapFpToG1: 56,
  Bls12381HashToG1: 57,
  Bls12381G2Add: 58,
  Bls12381G2Mul: 59,
  Bls12381G2Msm: 60,
  Bls12381MapFp2ToG2: 61,
  Bls12381HashToG2: 62,
  Bls12381Pairing: 63,
  Bls12381FrFromU256: 64,
  Bls12381FrToU256: 65,
  Bls12381FrAddSub: 66,
  Bls12381FrMul: 67,
  Bls12381FrPow: 68,
  Bls12381FrInv: 69,
  Bn254EncodeFp: 70,
  Bn254DecodeFp: 71,
  Bn254G1CheckPointOnCurve: 72,
  Bn254G2CheckPointOnCurve: 73,
  Bn254G2CheckPointInSubgroup: 74,
  Bn254G1ProjectiveToAffine: 75,
  Bn254G1Add: 76,
  Bn254G1Mul: 77,
  Bn254Pairing: 78,
  Bn254FrFromU256: 79,
  Bn254FrToU256: 80,
  Bn254FrAddSub: 81,
  Bn254FrMul: 82,
  Bn254FrPow: 83,
  Bn254FrInv: 84,
}

export const CONTRACT_COST_TYPE_FROM_INT: Record<number, ContractCostType> = /*#__PURE__*/ {
  0: 'WasmInsnExec',
  1: 'MemAlloc',
  2: 'MemCpy',
  3: 'MemCmp',
  4: 'DispatchHostFunction',
  5: 'VisitObject',
  6: 'ValSer',
  7: 'ValDeser',
  8: 'ComputeSha256Hash',
  9: 'ComputeEd25519PubKey',
  10: 'VerifyEd25519Sig',
  11: 'VmInstantiation',
  12: 'VmCachedInstantiation',
  13: 'InvokeVmFunction',
  14: 'ComputeKeccak256Hash',
  15: 'DecodeEcdsaCurve256Sig',
  16: 'RecoverEcdsaSecp256k1Key',
  17: 'Int256AddSub',
  18: 'Int256Mul',
  19: 'Int256Div',
  20: 'Int256Pow',
  21: 'Int256Shift',
  22: 'ChaCha20DrawBytes',
  23: 'ParseWasmInstructions',
  24: 'ParseWasmFunctions',
  25: 'ParseWasmGlobals',
  26: 'ParseWasmTableEntries',
  27: 'ParseWasmTypes',
  28: 'ParseWasmDataSegments',
  29: 'ParseWasmElemSegments',
  30: 'ParseWasmImports',
  31: 'ParseWasmExports',
  32: 'ParseWasmDataSegmentBytes',
  33: 'InstantiateWasmInstructions',
  34: 'InstantiateWasmFunctions',
  35: 'InstantiateWasmGlobals',
  36: 'InstantiateWasmTableEntries',
  37: 'InstantiateWasmTypes',
  38: 'InstantiateWasmDataSegments',
  39: 'InstantiateWasmElemSegments',
  40: 'InstantiateWasmImports',
  41: 'InstantiateWasmExports',
  42: 'InstantiateWasmDataSegmentBytes',
  43: 'Sec1DecodePointUncompressed',
  44: 'VerifyEcdsaSecp256r1Sig',
  45: 'Bls12381EncodeFp',
  46: 'Bls12381DecodeFp',
  47: 'Bls12381G1CheckPointOnCurve',
  48: 'Bls12381G1CheckPointInSubgroup',
  49: 'Bls12381G2CheckPointOnCurve',
  50: 'Bls12381G2CheckPointInSubgroup',
  51: 'Bls12381G1ProjectiveToAffine',
  52: 'Bls12381G2ProjectiveToAffine',
  53: 'Bls12381G1Add',
  54: 'Bls12381G1Mul',
  55: 'Bls12381G1Msm',
  56: 'Bls12381MapFpToG1',
  57: 'Bls12381HashToG1',
  58: 'Bls12381G2Add',
  59: 'Bls12381G2Mul',
  60: 'Bls12381G2Msm',
  61: 'Bls12381MapFp2ToG2',
  62: 'Bls12381HashToG2',
  63: 'Bls12381Pairing',
  64: 'Bls12381FrFromU256',
  65: 'Bls12381FrToU256',
  66: 'Bls12381FrAddSub',
  67: 'Bls12381FrMul',
  68: 'Bls12381FrPow',
  69: 'Bls12381FrInv',
  70: 'Bn254EncodeFp',
  71: 'Bn254DecodeFp',
  72: 'Bn254G1CheckPointOnCurve',
  73: 'Bn254G2CheckPointOnCurve',
  74: 'Bn254G2CheckPointInSubgroup',
  75: 'Bn254G1ProjectiveToAffine',
  76: 'Bn254G1Add',
  77: 'Bn254G1Mul',
  78: 'Bn254Pairing',
  79: 'Bn254FrFromU256',
  80: 'Bn254FrToU256',
  81: 'Bn254FrAddSub',
  82: 'Bn254FrMul',
  83: 'Bn254FrPow',
  84: 'Bn254FrInv',
}

export function readContractCostType(r: XdrReader): ContractCostType {
  const v = readInt32(r)
  const result = CONTRACT_COST_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ContractCostType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeContractCostType(w: XdrWriter, v: ContractCostType): void {
  writeInt32(w, CONTRACT_COST_TYPE_TO_INT[v])
}

export function encodeContractCostType(v: ContractCostType): Uint8Array {
  return encode(v, writeContractCostType)
}

export function decodeContractCostType(input: Uint8Array | string): ContractCostType {
  return decode(input, readContractCostType)
}

const _CONTRACT_COST_TYPE_TO_JSON: Record<ContractCostType, string> = /*#__PURE__*/ {
  WasmInsnExec: 'wasminsnexec',
  MemAlloc: 'memalloc',
  MemCpy: 'memcpy',
  MemCmp: 'memcmp',
  DispatchHostFunction: 'dispatchhostfunction',
  VisitObject: 'visitobject',
  ValSer: 'valser',
  ValDeser: 'valdeser',
  ComputeSha256Hash: 'computesha256hash',
  ComputeEd25519PubKey: 'computeed25519pubkey',
  VerifyEd25519Sig: 'verifyed25519sig',
  VmInstantiation: 'vminstantiation',
  VmCachedInstantiation: 'vmcachedinstantiation',
  InvokeVmFunction: 'invokevmfunction',
  ComputeKeccak256Hash: 'computekeccak256hash',
  DecodeEcdsaCurve256Sig: 'decodeecdsacurve256sig',
  RecoverEcdsaSecp256k1Key: 'recoverecdsasecp256k1key',
  Int256AddSub: 'int256addsub',
  Int256Mul: 'int256mul',
  Int256Div: 'int256div',
  Int256Pow: 'int256pow',
  Int256Shift: 'int256shift',
  ChaCha20DrawBytes: 'chacha20drawbytes',
  ParseWasmInstructions: 'parsewasminstructions',
  ParseWasmFunctions: 'parsewasmfunctions',
  ParseWasmGlobals: 'parsewasmglobals',
  ParseWasmTableEntries: 'parsewasmtableentries',
  ParseWasmTypes: 'parsewasmtypes',
  ParseWasmDataSegments: 'parsewasmdatasegments',
  ParseWasmElemSegments: 'parsewasmelemsegments',
  ParseWasmImports: 'parsewasmimports',
  ParseWasmExports: 'parsewasmexports',
  ParseWasmDataSegmentBytes: 'parsewasmdatasegmentbytes',
  InstantiateWasmInstructions: 'instantiatewasminstructions',
  InstantiateWasmFunctions: 'instantiatewasmfunctions',
  InstantiateWasmGlobals: 'instantiatewasmglobals',
  InstantiateWasmTableEntries: 'instantiatewasmtableentries',
  InstantiateWasmTypes: 'instantiatewasmtypes',
  InstantiateWasmDataSegments: 'instantiatewasmdatasegments',
  InstantiateWasmElemSegments: 'instantiatewasmelemsegments',
  InstantiateWasmImports: 'instantiatewasmimports',
  InstantiateWasmExports: 'instantiatewasmexports',
  InstantiateWasmDataSegmentBytes: 'instantiatewasmdatasegmentbytes',
  Sec1DecodePointUncompressed: 'sec1decodepointuncompressed',
  VerifyEcdsaSecp256r1Sig: 'verifyecdsasecp256r1sig',
  Bls12381EncodeFp: 'bls12381encodefp',
  Bls12381DecodeFp: 'bls12381decodefp',
  Bls12381G1CheckPointOnCurve: 'bls12381g1checkpointoncurve',
  Bls12381G1CheckPointInSubgroup: 'bls12381g1checkpointinsubgroup',
  Bls12381G2CheckPointOnCurve: 'bls12381g2checkpointoncurve',
  Bls12381G2CheckPointInSubgroup: 'bls12381g2checkpointinsubgroup',
  Bls12381G1ProjectiveToAffine: 'bls12381g1projectivetoaffine',
  Bls12381G2ProjectiveToAffine: 'bls12381g2projectivetoaffine',
  Bls12381G1Add: 'bls12381g1add',
  Bls12381G1Mul: 'bls12381g1mul',
  Bls12381G1Msm: 'bls12381g1msm',
  Bls12381MapFpToG1: 'bls12381mapfptog1',
  Bls12381HashToG1: 'bls12381hashtog1',
  Bls12381G2Add: 'bls12381g2add',
  Bls12381G2Mul: 'bls12381g2mul',
  Bls12381G2Msm: 'bls12381g2msm',
  Bls12381MapFp2ToG2: 'bls12381mapfp2tog2',
  Bls12381HashToG2: 'bls12381hashtog2',
  Bls12381Pairing: 'bls12381pairing',
  Bls12381FrFromU256: 'bls12381frfromu256',
  Bls12381FrToU256: 'bls12381frtou256',
  Bls12381FrAddSub: 'bls12381fraddsub',
  Bls12381FrMul: 'bls12381frmul',
  Bls12381FrPow: 'bls12381frpow',
  Bls12381FrInv: 'bls12381frinv',
  Bn254EncodeFp: 'bn254encodefp',
  Bn254DecodeFp: 'bn254decodefp',
  Bn254G1CheckPointOnCurve: 'bn254g1checkpointoncurve',
  Bn254G2CheckPointOnCurve: 'bn254g2checkpointoncurve',
  Bn254G2CheckPointInSubgroup: 'bn254g2checkpointinsubgroup',
  Bn254G1ProjectiveToAffine: 'bn254g1projectivetoaffine',
  Bn254G1Add: 'bn254g1add',
  Bn254G1Mul: 'bn254g1mul',
  Bn254Pairing: 'bn254pairing',
  Bn254FrFromU256: 'bn254frfromu256',
  Bn254FrToU256: 'bn254frtou256',
  Bn254FrAddSub: 'bn254fraddsub',
  Bn254FrMul: 'bn254frmul',
  Bn254FrPow: 'bn254frpow',
  Bn254FrInv: 'bn254frinv',
}

const _CONTRACT_COST_TYPE_FROM_JSON: Record<string, ContractCostType> = /*#__PURE__*/ {
  'wasminsnexec': 'WasmInsnExec',
  'memalloc': 'MemAlloc',
  'memcpy': 'MemCpy',
  'memcmp': 'MemCmp',
  'dispatchhostfunction': 'DispatchHostFunction',
  'visitobject': 'VisitObject',
  'valser': 'ValSer',
  'valdeser': 'ValDeser',
  'computesha256hash': 'ComputeSha256Hash',
  'computeed25519pubkey': 'ComputeEd25519PubKey',
  'verifyed25519sig': 'VerifyEd25519Sig',
  'vminstantiation': 'VmInstantiation',
  'vmcachedinstantiation': 'VmCachedInstantiation',
  'invokevmfunction': 'InvokeVmFunction',
  'computekeccak256hash': 'ComputeKeccak256Hash',
  'decodeecdsacurve256sig': 'DecodeEcdsaCurve256Sig',
  'recoverecdsasecp256k1key': 'RecoverEcdsaSecp256k1Key',
  'int256addsub': 'Int256AddSub',
  'int256mul': 'Int256Mul',
  'int256div': 'Int256Div',
  'int256pow': 'Int256Pow',
  'int256shift': 'Int256Shift',
  'chacha20drawbytes': 'ChaCha20DrawBytes',
  'parsewasminstructions': 'ParseWasmInstructions',
  'parsewasmfunctions': 'ParseWasmFunctions',
  'parsewasmglobals': 'ParseWasmGlobals',
  'parsewasmtableentries': 'ParseWasmTableEntries',
  'parsewasmtypes': 'ParseWasmTypes',
  'parsewasmdatasegments': 'ParseWasmDataSegments',
  'parsewasmelemsegments': 'ParseWasmElemSegments',
  'parsewasmimports': 'ParseWasmImports',
  'parsewasmexports': 'ParseWasmExports',
  'parsewasmdatasegmentbytes': 'ParseWasmDataSegmentBytes',
  'instantiatewasminstructions': 'InstantiateWasmInstructions',
  'instantiatewasmfunctions': 'InstantiateWasmFunctions',
  'instantiatewasmglobals': 'InstantiateWasmGlobals',
  'instantiatewasmtableentries': 'InstantiateWasmTableEntries',
  'instantiatewasmtypes': 'InstantiateWasmTypes',
  'instantiatewasmdatasegments': 'InstantiateWasmDataSegments',
  'instantiatewasmelemsegments': 'InstantiateWasmElemSegments',
  'instantiatewasmimports': 'InstantiateWasmImports',
  'instantiatewasmexports': 'InstantiateWasmExports',
  'instantiatewasmdatasegmentbytes': 'InstantiateWasmDataSegmentBytes',
  'sec1decodepointuncompressed': 'Sec1DecodePointUncompressed',
  'verifyecdsasecp256r1sig': 'VerifyEcdsaSecp256r1Sig',
  'bls12381encodefp': 'Bls12381EncodeFp',
  'bls12381decodefp': 'Bls12381DecodeFp',
  'bls12381g1checkpointoncurve': 'Bls12381G1CheckPointOnCurve',
  'bls12381g1checkpointinsubgroup': 'Bls12381G1CheckPointInSubgroup',
  'bls12381g2checkpointoncurve': 'Bls12381G2CheckPointOnCurve',
  'bls12381g2checkpointinsubgroup': 'Bls12381G2CheckPointInSubgroup',
  'bls12381g1projectivetoaffine': 'Bls12381G1ProjectiveToAffine',
  'bls12381g2projectivetoaffine': 'Bls12381G2ProjectiveToAffine',
  'bls12381g1add': 'Bls12381G1Add',
  'bls12381g1mul': 'Bls12381G1Mul',
  'bls12381g1msm': 'Bls12381G1Msm',
  'bls12381mapfptog1': 'Bls12381MapFpToG1',
  'bls12381hashtog1': 'Bls12381HashToG1',
  'bls12381g2add': 'Bls12381G2Add',
  'bls12381g2mul': 'Bls12381G2Mul',
  'bls12381g2msm': 'Bls12381G2Msm',
  'bls12381mapfp2tog2': 'Bls12381MapFp2ToG2',
  'bls12381hashtog2': 'Bls12381HashToG2',
  'bls12381pairing': 'Bls12381Pairing',
  'bls12381frfromu256': 'Bls12381FrFromU256',
  'bls12381frtou256': 'Bls12381FrToU256',
  'bls12381fraddsub': 'Bls12381FrAddSub',
  'bls12381frmul': 'Bls12381FrMul',
  'bls12381frpow': 'Bls12381FrPow',
  'bls12381frinv': 'Bls12381FrInv',
  'bn254encodefp': 'Bn254EncodeFp',
  'bn254decodefp': 'Bn254DecodeFp',
  'bn254g1checkpointoncurve': 'Bn254G1CheckPointOnCurve',
  'bn254g2checkpointoncurve': 'Bn254G2CheckPointOnCurve',
  'bn254g2checkpointinsubgroup': 'Bn254G2CheckPointInSubgroup',
  'bn254g1projectivetoaffine': 'Bn254G1ProjectiveToAffine',
  'bn254g1add': 'Bn254G1Add',
  'bn254g1mul': 'Bn254G1Mul',
  'bn254pairing': 'Bn254Pairing',
  'bn254frfromu256': 'Bn254FrFromU256',
  'bn254frtou256': 'Bn254FrToU256',
  'bn254fraddsub': 'Bn254FrAddSub',
  'bn254frmul': 'Bn254FrMul',
  'bn254frpow': 'Bn254FrPow',
  'bn254frinv': 'Bn254FrInv',
}

export function toJsonContractCostType(v: ContractCostType): string {
  return _CONTRACT_COST_TYPE_TO_JSON[v]
}

export function fromJsonContractCostType(json: unknown): ContractCostType {
  const result = _CONTRACT_COST_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ContractCostType JSON value: ${json}`)
  return result
}

export interface ContractCostParamEntry {
  /** use `ext` to add more terms (e.g. higher order polynomials) in the future */
  readonly ext: ExtensionPoint
  readonly constTerm: int64
  readonly linearTerm: int64
}

export function readContractCostParamEntry(r: XdrReader): ContractCostParamEntry {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const constTerm = readint64(r)
    const linearTerm = readint64(r)
    return { ext, constTerm, linearTerm }
  } finally {
    endComposite(r)
  }
}

export function writeContractCostParamEntry(w: XdrWriter, v: ContractCostParamEntry): void {
  writeExtensionPoint(w, v.ext)
  writeint64(w, v.constTerm)
  writeint64(w, v.linearTerm)
}

export function encodeContractCostParamEntry(v: ContractCostParamEntry): Uint8Array {
  return encode(v, writeContractCostParamEntry)
}

export function decodeContractCostParamEntry(input: Uint8Array | string): ContractCostParamEntry {
  return decode(input, readContractCostParamEntry)
}

export function toJsonContractCostParamEntry(v: ContractCostParamEntry): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'const_term': toJsonint64(v.constTerm),
    'linear_term': toJsonint64(v.linearTerm),
  }
}

export function fromJsonContractCostParamEntry(json: unknown): ContractCostParamEntry {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    constTerm: fromJsonint64(o['const_term']),
    linearTerm: fromJsonint64(o['linear_term']),
  }
}

export interface StateArchivalSettings {
  readonly maxEntryTTL: uint32
  readonly minTemporaryTTL: uint32
  readonly minPersistentTTL: uint32
  /** rent_fee = wfee_rate_average / rent_rate_denominator_for_type */
  readonly persistentRentRateDenominator: int64
  readonly tempRentRateDenominator: int64
  /** max number of entries that emit archival meta in a single ledger */
  readonly maxEntriesToArchive: uint32
  /** Number of snapshots to use when calculating average live Soroban State size */
  readonly liveSorobanStateSizeWindowSampleSize: uint32
  /** How often to sample the live Soroban State size for the average, in ledgers */
  readonly liveSorobanStateSizeWindowSamplePeriod: uint32
  /** Maximum number of bytes that we scan for eviction per ledger */
  readonly evictionScanSize: uint32
  /** Lowest BucketList level to be scanned to evict entries */
  readonly startingEvictionScanLevel: uint32
}

export function readStateArchivalSettings(r: XdrReader): StateArchivalSettings {
  beginComposite(r)
  try {
    const maxEntryTTL = readuint32(r)
    const minTemporaryTTL = readuint32(r)
    const minPersistentTTL = readuint32(r)
    const persistentRentRateDenominator = readint64(r)
    const tempRentRateDenominator = readint64(r)
    const maxEntriesToArchive = readuint32(r)
    const liveSorobanStateSizeWindowSampleSize = readuint32(r)
    const liveSorobanStateSizeWindowSamplePeriod = readuint32(r)
    const evictionScanSize = readuint32(r)
    const startingEvictionScanLevel = readuint32(r)
    return { maxEntryTTL, minTemporaryTTL, minPersistentTTL, persistentRentRateDenominator, tempRentRateDenominator, maxEntriesToArchive, liveSorobanStateSizeWindowSampleSize, liveSorobanStateSizeWindowSamplePeriod, evictionScanSize, startingEvictionScanLevel }
  } finally {
    endComposite(r)
  }
}

export function writeStateArchivalSettings(w: XdrWriter, v: StateArchivalSettings): void {
  writeuint32(w, v.maxEntryTTL)
  writeuint32(w, v.minTemporaryTTL)
  writeuint32(w, v.minPersistentTTL)
  writeint64(w, v.persistentRentRateDenominator)
  writeint64(w, v.tempRentRateDenominator)
  writeuint32(w, v.maxEntriesToArchive)
  writeuint32(w, v.liveSorobanStateSizeWindowSampleSize)
  writeuint32(w, v.liveSorobanStateSizeWindowSamplePeriod)
  writeuint32(w, v.evictionScanSize)
  writeuint32(w, v.startingEvictionScanLevel)
}

export function encodeStateArchivalSettings(v: StateArchivalSettings): Uint8Array {
  return encode(v, writeStateArchivalSettings)
}

export function decodeStateArchivalSettings(input: Uint8Array | string): StateArchivalSettings {
  return decode(input, readStateArchivalSettings)
}

export function toJsonStateArchivalSettings(v: StateArchivalSettings): Record<string, unknown> {
  return {
    'max_entry_ttl': toJsonuint32(v.maxEntryTTL),
    'min_temporary_ttl': toJsonuint32(v.minTemporaryTTL),
    'min_persistent_ttl': toJsonuint32(v.minPersistentTTL),
    'persistent_rent_rate_denominator': toJsonint64(v.persistentRentRateDenominator),
    'temp_rent_rate_denominator': toJsonint64(v.tempRentRateDenominator),
    'max_entries_to_archive': toJsonuint32(v.maxEntriesToArchive),
    'live_soroban_state_size_window_sample_size': toJsonuint32(v.liveSorobanStateSizeWindowSampleSize),
    'live_soroban_state_size_window_sample_period': toJsonuint32(v.liveSorobanStateSizeWindowSamplePeriod),
    'eviction_scan_size': toJsonuint32(v.evictionScanSize),
    'starting_eviction_scan_level': toJsonuint32(v.startingEvictionScanLevel),
  }
}

export function fromJsonStateArchivalSettings(json: unknown): StateArchivalSettings {
  const o = json as Record<string, unknown>
  return {
    maxEntryTTL: fromJsonuint32(o['max_entry_ttl']),
    minTemporaryTTL: fromJsonuint32(o['min_temporary_ttl']),
    minPersistentTTL: fromJsonuint32(o['min_persistent_ttl']),
    persistentRentRateDenominator: fromJsonint64(o['persistent_rent_rate_denominator']),
    tempRentRateDenominator: fromJsonint64(o['temp_rent_rate_denominator']),
    maxEntriesToArchive: fromJsonuint32(o['max_entries_to_archive']),
    liveSorobanStateSizeWindowSampleSize: fromJsonuint32(o['live_soroban_state_size_window_sample_size']),
    liveSorobanStateSizeWindowSamplePeriod: fromJsonuint32(o['live_soroban_state_size_window_sample_period']),
    evictionScanSize: fromJsonuint32(o['eviction_scan_size']),
    startingEvictionScanLevel: fromJsonuint32(o['starting_eviction_scan_level']),
  }
}

export interface EvictionIterator {
  readonly bucketListLevel: uint32
  readonly isCurrBucket: boolean
  readonly bucketFileOffset: uint64
}

export function readEvictionIterator(r: XdrReader): EvictionIterator {
  beginComposite(r)
  try {
    const bucketListLevel = readuint32(r)
    const isCurrBucket = readBool(r)
    const bucketFileOffset = readuint64(r)
    return { bucketListLevel, isCurrBucket, bucketFileOffset }
  } finally {
    endComposite(r)
  }
}

export function writeEvictionIterator(w: XdrWriter, v: EvictionIterator): void {
  writeuint32(w, v.bucketListLevel)
  writeBool(w, v.isCurrBucket)
  writeuint64(w, v.bucketFileOffset)
}

export function encodeEvictionIterator(v: EvictionIterator): Uint8Array {
  return encode(v, writeEvictionIterator)
}

export function decodeEvictionIterator(input: Uint8Array | string): EvictionIterator {
  return decode(input, readEvictionIterator)
}

export function toJsonEvictionIterator(v: EvictionIterator): Record<string, unknown> {
  return {
    'bucket_list_level': toJsonuint32(v.bucketListLevel),
    'is_curr_bucket': v.isCurrBucket,
    'bucket_file_offset': toJsonuint64(v.bucketFileOffset),
  }
}

export function fromJsonEvictionIterator(json: unknown): EvictionIterator {
  const o = json as Record<string, unknown>
  return {
    bucketListLevel: fromJsonuint32(o['bucket_list_level']),
    isCurrBucket: (o['is_curr_bucket']) as boolean,
    bucketFileOffset: fromJsonuint64(o['bucket_file_offset']),
  }
}

export interface ConfigSettingSCPTiming {
  readonly ledgerTargetCloseTimeMilliseconds: uint32
  readonly nominationTimeoutInitialMilliseconds: uint32
  readonly nominationTimeoutIncrementMilliseconds: uint32
  readonly ballotTimeoutInitialMilliseconds: uint32
  readonly ballotTimeoutIncrementMilliseconds: uint32
}

export function readConfigSettingSCPTiming(r: XdrReader): ConfigSettingSCPTiming {
  beginComposite(r)
  try {
    const ledgerTargetCloseTimeMilliseconds = readuint32(r)
    const nominationTimeoutInitialMilliseconds = readuint32(r)
    const nominationTimeoutIncrementMilliseconds = readuint32(r)
    const ballotTimeoutInitialMilliseconds = readuint32(r)
    const ballotTimeoutIncrementMilliseconds = readuint32(r)
    return { ledgerTargetCloseTimeMilliseconds, nominationTimeoutInitialMilliseconds, nominationTimeoutIncrementMilliseconds, ballotTimeoutInitialMilliseconds, ballotTimeoutIncrementMilliseconds }
  } finally {
    endComposite(r)
  }
}

export function writeConfigSettingSCPTiming(w: XdrWriter, v: ConfigSettingSCPTiming): void {
  writeuint32(w, v.ledgerTargetCloseTimeMilliseconds)
  writeuint32(w, v.nominationTimeoutInitialMilliseconds)
  writeuint32(w, v.nominationTimeoutIncrementMilliseconds)
  writeuint32(w, v.ballotTimeoutInitialMilliseconds)
  writeuint32(w, v.ballotTimeoutIncrementMilliseconds)
}

export function encodeConfigSettingSCPTiming(v: ConfigSettingSCPTiming): Uint8Array {
  return encode(v, writeConfigSettingSCPTiming)
}

export function decodeConfigSettingSCPTiming(input: Uint8Array | string): ConfigSettingSCPTiming {
  return decode(input, readConfigSettingSCPTiming)
}

export function toJsonConfigSettingSCPTiming(v: ConfigSettingSCPTiming): Record<string, unknown> {
  return {
    'ledger_target_close_time_milliseconds': toJsonuint32(v.ledgerTargetCloseTimeMilliseconds),
    'nomination_timeout_initial_milliseconds': toJsonuint32(v.nominationTimeoutInitialMilliseconds),
    'nomination_timeout_increment_milliseconds': toJsonuint32(v.nominationTimeoutIncrementMilliseconds),
    'ballot_timeout_initial_milliseconds': toJsonuint32(v.ballotTimeoutInitialMilliseconds),
    'ballot_timeout_increment_milliseconds': toJsonuint32(v.ballotTimeoutIncrementMilliseconds),
  }
}

export function fromJsonConfigSettingSCPTiming(json: unknown): ConfigSettingSCPTiming {
  const o = json as Record<string, unknown>
  return {
    ledgerTargetCloseTimeMilliseconds: fromJsonuint32(o['ledger_target_close_time_milliseconds']),
    nominationTimeoutInitialMilliseconds: fromJsonuint32(o['nomination_timeout_initial_milliseconds']),
    nominationTimeoutIncrementMilliseconds: fromJsonuint32(o['nomination_timeout_increment_milliseconds']),
    ballotTimeoutInitialMilliseconds: fromJsonuint32(o['ballot_timeout_initial_milliseconds']),
    ballotTimeoutIncrementMilliseconds: fromJsonuint32(o['ballot_timeout_increment_milliseconds']),
  }
}

/** limits the ContractCostParams size to 20kB */
export const CONTRACT_COST_COUNT_LIMIT = 1024


export type ContractCostParams = ContractCostParamEntry[]

export function readContractCostParams(r: XdrReader): ContractCostParams {
  return readVarArray(r, CONTRACT_COST_COUNT_LIMIT, readContractCostParamEntry)
}

export function writeContractCostParams(w: XdrWriter, v: ContractCostParams): void {
  writeVarArray(w, v, CONTRACT_COST_COUNT_LIMIT, writeContractCostParamEntry)
}

export function encodeContractCostParams(v: ContractCostParams): Uint8Array {
  return encode(v, writeContractCostParams)
}

export function decodeContractCostParams(input: Uint8Array | string): ContractCostParams {
  return decode(input, readContractCostParams)
}

export function toJsonContractCostParams(v: ContractCostParams): unknown {
  return v.map((item: any) => toJsonContractCostParamEntry(item))
}

export function fromJsonContractCostParams(json: unknown): ContractCostParams {
  return ((json) as unknown[]).map((item: unknown) => fromJsonContractCostParamEntry(item))
}

/** Identifiers of all the network settings. */
export type ConfigSettingID =
  | 'CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES'
  | 'CONFIG_SETTING_CONTRACT_COMPUTE_V0'
  | 'CONFIG_SETTING_CONTRACT_LEDGER_COST_V0'
  | 'CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0'
  | 'CONFIG_SETTING_CONTRACT_EVENTS_V0'
  | 'CONFIG_SETTING_CONTRACT_BANDWIDTH_V0'
  | 'CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS'
  | 'CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES'
  | 'CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES'
  | 'CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES'
  | 'CONFIG_SETTING_STATE_ARCHIVAL'
  | 'CONFIG_SETTING_CONTRACT_EXECUTION_LANES'
  | 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW'
  | 'CONFIG_SETTING_EVICTION_ITERATOR'
  | 'CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0'
  | 'CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0'
  | 'CONFIG_SETTING_SCP_TIMING'

export const CONFIG_SETTING_I_D_TO_INT: Record<ConfigSettingID, number> = /*#__PURE__*/ {
  CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES: 0,
  CONFIG_SETTING_CONTRACT_COMPUTE_V0: 1,
  CONFIG_SETTING_CONTRACT_LEDGER_COST_V0: 2,
  CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0: 3,
  CONFIG_SETTING_CONTRACT_EVENTS_V0: 4,
  CONFIG_SETTING_CONTRACT_BANDWIDTH_V0: 5,
  CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS: 6,
  CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES: 7,
  CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES: 8,
  CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES: 9,
  CONFIG_SETTING_STATE_ARCHIVAL: 10,
  CONFIG_SETTING_CONTRACT_EXECUTION_LANES: 11,
  CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW: 12,
  CONFIG_SETTING_EVICTION_ITERATOR: 13,
  CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0: 14,
  CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0: 15,
  CONFIG_SETTING_SCP_TIMING: 16,
}

export const CONFIG_SETTING_I_D_FROM_INT: Record<number, ConfigSettingID> = /*#__PURE__*/ {
  0: 'CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES',
  1: 'CONFIG_SETTING_CONTRACT_COMPUTE_V0',
  2: 'CONFIG_SETTING_CONTRACT_LEDGER_COST_V0',
  3: 'CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0',
  4: 'CONFIG_SETTING_CONTRACT_EVENTS_V0',
  5: 'CONFIG_SETTING_CONTRACT_BANDWIDTH_V0',
  6: 'CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS',
  7: 'CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES',
  8: 'CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES',
  9: 'CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES',
  10: 'CONFIG_SETTING_STATE_ARCHIVAL',
  11: 'CONFIG_SETTING_CONTRACT_EXECUTION_LANES',
  12: 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW',
  13: 'CONFIG_SETTING_EVICTION_ITERATOR',
  14: 'CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0',
  15: 'CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0',
  16: 'CONFIG_SETTING_SCP_TIMING',
}

export function readConfigSettingID(r: XdrReader): ConfigSettingID {
  const v = readInt32(r)
  const result = CONFIG_SETTING_I_D_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ConfigSettingID value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeConfigSettingID(w: XdrWriter, v: ConfigSettingID): void {
  writeInt32(w, CONFIG_SETTING_I_D_TO_INT[v])
}

export function encodeConfigSettingID(v: ConfigSettingID): Uint8Array {
  return encode(v, writeConfigSettingID)
}

export function decodeConfigSettingID(input: Uint8Array | string): ConfigSettingID {
  return decode(input, readConfigSettingID)
}

const _CONFIG_SETTING_I_D_TO_JSON: Record<ConfigSettingID, string> = /*#__PURE__*/ {
  CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES: 'contract_max_size_bytes',
  CONFIG_SETTING_CONTRACT_COMPUTE_V0: 'contract_compute_v0',
  CONFIG_SETTING_CONTRACT_LEDGER_COST_V0: 'contract_ledger_cost_v0',
  CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0: 'contract_historical_data_v0',
  CONFIG_SETTING_CONTRACT_EVENTS_V0: 'contract_events_v0',
  CONFIG_SETTING_CONTRACT_BANDWIDTH_V0: 'contract_bandwidth_v0',
  CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS: 'contract_cost_params_cpu_instructions',
  CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES: 'contract_cost_params_memory_bytes',
  CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES: 'contract_data_key_size_bytes',
  CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES: 'contract_data_entry_size_bytes',
  CONFIG_SETTING_STATE_ARCHIVAL: 'state_archival',
  CONFIG_SETTING_CONTRACT_EXECUTION_LANES: 'contract_execution_lanes',
  CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW: 'live_soroban_state_size_window',
  CONFIG_SETTING_EVICTION_ITERATOR: 'eviction_iterator',
  CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0: 'contract_parallel_compute_v0',
  CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0: 'contract_ledger_cost_ext_v0',
  CONFIG_SETTING_SCP_TIMING: 'scp_timing',
}

const _CONFIG_SETTING_I_D_FROM_JSON: Record<string, ConfigSettingID> = /*#__PURE__*/ {
  'contract_max_size_bytes': 'CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES',
  'contract_compute_v0': 'CONFIG_SETTING_CONTRACT_COMPUTE_V0',
  'contract_ledger_cost_v0': 'CONFIG_SETTING_CONTRACT_LEDGER_COST_V0',
  'contract_historical_data_v0': 'CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0',
  'contract_events_v0': 'CONFIG_SETTING_CONTRACT_EVENTS_V0',
  'contract_bandwidth_v0': 'CONFIG_SETTING_CONTRACT_BANDWIDTH_V0',
  'contract_cost_params_cpu_instructions': 'CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS',
  'contract_cost_params_memory_bytes': 'CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES',
  'contract_data_key_size_bytes': 'CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES',
  'contract_data_entry_size_bytes': 'CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES',
  'state_archival': 'CONFIG_SETTING_STATE_ARCHIVAL',
  'contract_execution_lanes': 'CONFIG_SETTING_CONTRACT_EXECUTION_LANES',
  'live_soroban_state_size_window': 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW',
  'eviction_iterator': 'CONFIG_SETTING_EVICTION_ITERATOR',
  'contract_parallel_compute_v0': 'CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0',
  'contract_ledger_cost_ext_v0': 'CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0',
  'scp_timing': 'CONFIG_SETTING_SCP_TIMING',
}

export function toJsonConfigSettingID(v: ConfigSettingID): string {
  return _CONFIG_SETTING_I_D_TO_JSON[v]
}

export function fromJsonConfigSettingID(json: unknown): ConfigSettingID {
  const result = _CONFIG_SETTING_I_D_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ConfigSettingID JSON value: ${json}`)
  return result
}

export type ConfigSettingEntry =
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES'; readonly contractMaxSizeBytes: uint32 }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_COMPUTE_V0'; readonly contractCompute: ConfigSettingContractComputeV0 }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_LEDGER_COST_V0'; readonly contractLedgerCost: ConfigSettingContractLedgerCostV0 }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0'; readonly contractHistoricalData: ConfigSettingContractHistoricalDataV0 }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_EVENTS_V0'; readonly contractEvents: ConfigSettingContractEventsV0 }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_BANDWIDTH_V0'; readonly contractBandwidth: ConfigSettingContractBandwidthV0 }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS'; readonly contractCostParamsCpuInsns: ContractCostParams }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES'; readonly contractCostParamsMemBytes: ContractCostParams }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES'; readonly contractDataKeySizeBytes: uint32 }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES'; readonly contractDataEntrySizeBytes: uint32 }
  | { readonly configSettingID: 'CONFIG_SETTING_STATE_ARCHIVAL'; readonly stateArchivalSettings: StateArchivalSettings }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_EXECUTION_LANES'; readonly contractExecutionLanes: ConfigSettingContractExecutionLanesV0 }
  | { readonly configSettingID: 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW'; readonly liveSorobanStateSizeWindow: uint64[] }
  | { readonly configSettingID: 'CONFIG_SETTING_EVICTION_ITERATOR'; readonly evictionIterator: EvictionIterator }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0'; readonly contractParallelCompute: ConfigSettingContractParallelComputeV0 }
  | { readonly configSettingID: 'CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0'; readonly contractLedgerCostExt: ConfigSettingContractLedgerCostExtV0 }
  | { readonly configSettingID: 'CONFIG_SETTING_SCP_TIMING'; readonly contractSCPTiming: ConfigSettingSCPTiming }

export function readConfigSettingEntry(r: XdrReader): ConfigSettingEntry {
  beginComposite(r)
  try {
    const configSettingID = readConfigSettingID(r)
    let result: ConfigSettingEntry
    switch (configSettingID) {
      case 'CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES':
        result = { configSettingID, contractMaxSizeBytes: readuint32(r) }; break
      case 'CONFIG_SETTING_CONTRACT_COMPUTE_V0':
        result = { configSettingID, contractCompute: readConfigSettingContractComputeV0(r) }; break
      case 'CONFIG_SETTING_CONTRACT_LEDGER_COST_V0':
        result = { configSettingID, contractLedgerCost: readConfigSettingContractLedgerCostV0(r) }; break
      case 'CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0':
        result = { configSettingID, contractHistoricalData: readConfigSettingContractHistoricalDataV0(r) }; break
      case 'CONFIG_SETTING_CONTRACT_EVENTS_V0':
        result = { configSettingID, contractEvents: readConfigSettingContractEventsV0(r) }; break
      case 'CONFIG_SETTING_CONTRACT_BANDWIDTH_V0':
        result = { configSettingID, contractBandwidth: readConfigSettingContractBandwidthV0(r) }; break
      case 'CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS':
        result = { configSettingID, contractCostParamsCpuInsns: readContractCostParams(r) }; break
      case 'CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES':
        result = { configSettingID, contractCostParamsMemBytes: readContractCostParams(r) }; break
      case 'CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES':
        result = { configSettingID, contractDataKeySizeBytes: readuint32(r) }; break
      case 'CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES':
        result = { configSettingID, contractDataEntrySizeBytes: readuint32(r) }; break
      case 'CONFIG_SETTING_STATE_ARCHIVAL':
        result = { configSettingID, stateArchivalSettings: readStateArchivalSettings(r) }; break
      case 'CONFIG_SETTING_CONTRACT_EXECUTION_LANES':
        result = { configSettingID, contractExecutionLanes: readConfigSettingContractExecutionLanesV0(r) }; break
      case 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW':
        result = { configSettingID, liveSorobanStateSizeWindow: readVarArray(r, UINT32_MAX, readuint64) }; break
      case 'CONFIG_SETTING_EVICTION_ITERATOR':
        result = { configSettingID, evictionIterator: readEvictionIterator(r) }; break
      case 'CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0':
        result = { configSettingID, contractParallelCompute: readConfigSettingContractParallelComputeV0(r) }; break
      case 'CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0':
        result = { configSettingID, contractLedgerCostExt: readConfigSettingContractLedgerCostExtV0(r) }; break
      case 'CONFIG_SETTING_SCP_TIMING':
        result = { configSettingID, contractSCPTiming: readConfigSettingSCPTiming(r) }; break
      default:
        throw new XdrReadError(`Unknown ConfigSettingEntry discriminant: ${configSettingID}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeConfigSettingEntry(w: XdrWriter, v: ConfigSettingEntry): void {
  writeConfigSettingID(w, v.configSettingID)
  switch (v.configSettingID) {
    case 'CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES':
      writeuint32(w, (v as any).contractMaxSizeBytes); break
    case 'CONFIG_SETTING_CONTRACT_COMPUTE_V0':
      writeConfigSettingContractComputeV0(w, (v as any).contractCompute); break
    case 'CONFIG_SETTING_CONTRACT_LEDGER_COST_V0':
      writeConfigSettingContractLedgerCostV0(w, (v as any).contractLedgerCost); break
    case 'CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0':
      writeConfigSettingContractHistoricalDataV0(w, (v as any).contractHistoricalData); break
    case 'CONFIG_SETTING_CONTRACT_EVENTS_V0':
      writeConfigSettingContractEventsV0(w, (v as any).contractEvents); break
    case 'CONFIG_SETTING_CONTRACT_BANDWIDTH_V0':
      writeConfigSettingContractBandwidthV0(w, (v as any).contractBandwidth); break
    case 'CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS':
      writeContractCostParams(w, (v as any).contractCostParamsCpuInsns); break
    case 'CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES':
      writeContractCostParams(w, (v as any).contractCostParamsMemBytes); break
    case 'CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES':
      writeuint32(w, (v as any).contractDataKeySizeBytes); break
    case 'CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES':
      writeuint32(w, (v as any).contractDataEntrySizeBytes); break
    case 'CONFIG_SETTING_STATE_ARCHIVAL':
      writeStateArchivalSettings(w, (v as any).stateArchivalSettings); break
    case 'CONFIG_SETTING_CONTRACT_EXECUTION_LANES':
      writeConfigSettingContractExecutionLanesV0(w, (v as any).contractExecutionLanes); break
    case 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW':
      writeVarArray(w, (v as any).liveSorobanStateSizeWindow, UINT32_MAX, writeuint64); break
    case 'CONFIG_SETTING_EVICTION_ITERATOR':
      writeEvictionIterator(w, (v as any).evictionIterator); break
    case 'CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0':
      writeConfigSettingContractParallelComputeV0(w, (v as any).contractParallelCompute); break
    case 'CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0':
      writeConfigSettingContractLedgerCostExtV0(w, (v as any).contractLedgerCostExt); break
    case 'CONFIG_SETTING_SCP_TIMING':
      writeConfigSettingSCPTiming(w, (v as any).contractSCPTiming); break
  }
}

export function encodeConfigSettingEntry(v: ConfigSettingEntry): Uint8Array {
  return encode(v, writeConfigSettingEntry)
}

export function decodeConfigSettingEntry(input: Uint8Array | string): ConfigSettingEntry {
  return decode(input, readConfigSettingEntry)
}

export function toJsonConfigSettingEntry(v: ConfigSettingEntry): unknown {
  switch (v.configSettingID) {
    case 'CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES':
      return { 'contract_max_size_bytes': toJsonuint32((v as any).contractMaxSizeBytes) }
    case 'CONFIG_SETTING_CONTRACT_COMPUTE_V0':
      return { 'contract_compute_v0': toJsonConfigSettingContractComputeV0((v as any).contractCompute) }
    case 'CONFIG_SETTING_CONTRACT_LEDGER_COST_V0':
      return { 'contract_ledger_cost_v0': toJsonConfigSettingContractLedgerCostV0((v as any).contractLedgerCost) }
    case 'CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0':
      return { 'contract_historical_data_v0': toJsonConfigSettingContractHistoricalDataV0((v as any).contractHistoricalData) }
    case 'CONFIG_SETTING_CONTRACT_EVENTS_V0':
      return { 'contract_events_v0': toJsonConfigSettingContractEventsV0((v as any).contractEvents) }
    case 'CONFIG_SETTING_CONTRACT_BANDWIDTH_V0':
      return { 'contract_bandwidth_v0': toJsonConfigSettingContractBandwidthV0((v as any).contractBandwidth) }
    case 'CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS':
      return { 'contract_cost_params_cpu_instructions': toJsonContractCostParams((v as any).contractCostParamsCpuInsns) }
    case 'CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES':
      return { 'contract_cost_params_memory_bytes': toJsonContractCostParams((v as any).contractCostParamsMemBytes) }
    case 'CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES':
      return { 'contract_data_key_size_bytes': toJsonuint32((v as any).contractDataKeySizeBytes) }
    case 'CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES':
      return { 'contract_data_entry_size_bytes': toJsonuint32((v as any).contractDataEntrySizeBytes) }
    case 'CONFIG_SETTING_STATE_ARCHIVAL':
      return { 'state_archival': toJsonStateArchivalSettings((v as any).stateArchivalSettings) }
    case 'CONFIG_SETTING_CONTRACT_EXECUTION_LANES':
      return { 'contract_execution_lanes': toJsonConfigSettingContractExecutionLanesV0((v as any).contractExecutionLanes) }
    case 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW':
      return { 'live_soroban_state_size_window': (v as any).liveSorobanStateSizeWindow.map((item: any) => toJsonuint64(item)) }
    case 'CONFIG_SETTING_EVICTION_ITERATOR':
      return { 'eviction_iterator': toJsonEvictionIterator((v as any).evictionIterator) }
    case 'CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0':
      return { 'contract_parallel_compute_v0': toJsonConfigSettingContractParallelComputeV0((v as any).contractParallelCompute) }
    case 'CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0':
      return { 'contract_ledger_cost_ext_v0': toJsonConfigSettingContractLedgerCostExtV0((v as any).contractLedgerCostExt) }
    case 'CONFIG_SETTING_SCP_TIMING':
      return { 'scp_timing': toJsonConfigSettingSCPTiming((v as any).contractSCPTiming) }
  }
}

export function fromJsonConfigSettingEntry(json: unknown): ConfigSettingEntry {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for ConfigSettingEntry: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'contract_max_size_bytes':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES', contractMaxSizeBytes: fromJsonuint32(obj[key]) } as ConfigSettingEntry
    case 'contract_compute_v0':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_COMPUTE_V0', contractCompute: fromJsonConfigSettingContractComputeV0(obj[key]) } as ConfigSettingEntry
    case 'contract_ledger_cost_v0':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_LEDGER_COST_V0', contractLedgerCost: fromJsonConfigSettingContractLedgerCostV0(obj[key]) } as ConfigSettingEntry
    case 'contract_historical_data_v0':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0', contractHistoricalData: fromJsonConfigSettingContractHistoricalDataV0(obj[key]) } as ConfigSettingEntry
    case 'contract_events_v0':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_EVENTS_V0', contractEvents: fromJsonConfigSettingContractEventsV0(obj[key]) } as ConfigSettingEntry
    case 'contract_bandwidth_v0':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_BANDWIDTH_V0', contractBandwidth: fromJsonConfigSettingContractBandwidthV0(obj[key]) } as ConfigSettingEntry
    case 'contract_cost_params_cpu_instructions':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS', contractCostParamsCpuInsns: fromJsonContractCostParams(obj[key]) } as ConfigSettingEntry
    case 'contract_cost_params_memory_bytes':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES', contractCostParamsMemBytes: fromJsonContractCostParams(obj[key]) } as ConfigSettingEntry
    case 'contract_data_key_size_bytes':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES', contractDataKeySizeBytes: fromJsonuint32(obj[key]) } as ConfigSettingEntry
    case 'contract_data_entry_size_bytes':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES', contractDataEntrySizeBytes: fromJsonuint32(obj[key]) } as ConfigSettingEntry
    case 'state_archival':
      return { configSettingID: 'CONFIG_SETTING_STATE_ARCHIVAL', stateArchivalSettings: fromJsonStateArchivalSettings(obj[key]) } as ConfigSettingEntry
    case 'contract_execution_lanes':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_EXECUTION_LANES', contractExecutionLanes: fromJsonConfigSettingContractExecutionLanesV0(obj[key]) } as ConfigSettingEntry
    case 'live_soroban_state_size_window':
      return { configSettingID: 'CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW', liveSorobanStateSizeWindow: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonuint64(item)) } as ConfigSettingEntry
    case 'eviction_iterator':
      return { configSettingID: 'CONFIG_SETTING_EVICTION_ITERATOR', evictionIterator: fromJsonEvictionIterator(obj[key]) } as ConfigSettingEntry
    case 'contract_parallel_compute_v0':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0', contractParallelCompute: fromJsonConfigSettingContractParallelComputeV0(obj[key]) } as ConfigSettingEntry
    case 'contract_ledger_cost_ext_v0':
      return { configSettingID: 'CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0', contractLedgerCostExt: fromJsonConfigSettingContractLedgerCostExtV0(obj[key]) } as ConfigSettingEntry
    case 'scp_timing':
      return { configSettingID: 'CONFIG_SETTING_SCP_TIMING', contractSCPTiming: fromJsonConfigSettingSCPTiming(obj[key]) } as ConfigSettingEntry
    default: throw new Error(`Unknown ConfigSettingEntry variant: ${key}`)
  }
}
