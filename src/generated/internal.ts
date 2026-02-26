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

import type { GeneralizedTransactionSet, StellarValue, TransactionSet } from './ledger.js'
import { readGeneralizedTransactionSet, writeGeneralizedTransactionSet, toJsonGeneralizedTransactionSet, fromJsonGeneralizedTransactionSet, readStellarValue, writeStellarValue, toJsonStellarValue, fromJsonStellarValue, readTransactionSet, writeTransactionSet, toJsonTransactionSet, fromJsonTransactionSet } from './ledger.js'
import type { SCPEnvelope, SCPQuorumSet } from './scp.js'
import { readSCPEnvelope, writeSCPEnvelope, toJsonSCPEnvelope, fromJsonSCPEnvelope, readSCPQuorumSet, writeSCPQuorumSet, toJsonSCPQuorumSet, fromJsonSCPQuorumSet } from './scp.js'
import type { uint32 } from './types.js'
import { readuint32, writeuint32, toJsonuint32, fromJsonuint32 } from './types.js'


export type StoredTransactionSet =
  | { readonly v: 0; readonly txSet: TransactionSet }
  | { readonly v: 1; readonly generalizedTxSet: GeneralizedTransactionSet }

export function readStoredTransactionSet(r: XdrReader): StoredTransactionSet {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: StoredTransactionSet
    switch (v) {
      case 0:
        result = { v, txSet: readTransactionSet(r) }; break
      case 1:
        result = { v, generalizedTxSet: readGeneralizedTransactionSet(r) }; break
      default:
        throw new XdrReadError(`Unknown StoredTransactionSet discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeStoredTransactionSet(w: XdrWriter, v: StoredTransactionSet): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      writeTransactionSet(w, (v as any).txSet); break
    case 1:
      writeGeneralizedTransactionSet(w, (v as any).generalizedTxSet); break
  }
}

export function encodeStoredTransactionSet(v: StoredTransactionSet): Uint8Array {
  return encode(v, writeStoredTransactionSet)
}

export function decodeStoredTransactionSet(input: Uint8Array | string): StoredTransactionSet {
  return decode(input, readStoredTransactionSet)
}

export function toJsonStoredTransactionSet(v: StoredTransactionSet): unknown {
  switch (v.v) {
    case 0:
      return { 'v0': toJsonTransactionSet((v as any).txSet) }
    case 1:
      return { 'v1': toJsonGeneralizedTransactionSet((v as any).generalizedTxSet) }
  }
}

export function fromJsonStoredTransactionSet(json: unknown): StoredTransactionSet {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for StoredTransactionSet: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v0':
      return { v: 0, txSet: fromJsonTransactionSet(obj[key]) } as StoredTransactionSet
    case 'v1':
      return { v: 1, generalizedTxSet: fromJsonGeneralizedTransactionSet(obj[key]) } as StoredTransactionSet
    default: throw new Error(`Unknown StoredTransactionSet variant: ${key}`)
  }
}

export interface StoredDebugTransactionSet {
  readonly txSet: StoredTransactionSet
  readonly ledgerSeq: uint32
  readonly scpValue: StellarValue
}

export function readStoredDebugTransactionSet(r: XdrReader): StoredDebugTransactionSet {
  beginComposite(r)
  try {
    const txSet = readStoredTransactionSet(r)
    const ledgerSeq = readuint32(r)
    const scpValue = readStellarValue(r)
    return { txSet, ledgerSeq, scpValue }
  } finally {
    endComposite(r)
  }
}

export function writeStoredDebugTransactionSet(w: XdrWriter, v: StoredDebugTransactionSet): void {
  writeStoredTransactionSet(w, v.txSet)
  writeuint32(w, v.ledgerSeq)
  writeStellarValue(w, v.scpValue)
}

export function encodeStoredDebugTransactionSet(v: StoredDebugTransactionSet): Uint8Array {
  return encode(v, writeStoredDebugTransactionSet)
}

export function decodeStoredDebugTransactionSet(input: Uint8Array | string): StoredDebugTransactionSet {
  return decode(input, readStoredDebugTransactionSet)
}

export function toJsonStoredDebugTransactionSet(v: StoredDebugTransactionSet): Record<string, unknown> {
  return {
    'tx_set': toJsonStoredTransactionSet(v.txSet),
    'ledger_seq': toJsonuint32(v.ledgerSeq),
    'scp_value': toJsonStellarValue(v.scpValue),
  }
}

export function fromJsonStoredDebugTransactionSet(json: unknown): StoredDebugTransactionSet {
  const o = json as Record<string, unknown>
  return {
    txSet: fromJsonStoredTransactionSet(o['tx_set']),
    ledgerSeq: fromJsonuint32(o['ledger_seq']),
    scpValue: fromJsonStellarValue(o['scp_value']),
  }
}

export interface PersistedSCPStateV0 {
  readonly scpEnvelopes: SCPEnvelope[]
  readonly quorumSets: SCPQuorumSet[]
  readonly txSets: StoredTransactionSet[]
}

export function readPersistedSCPStateV0(r: XdrReader): PersistedSCPStateV0 {
  beginComposite(r)
  try {
    const scpEnvelopes = readVarArray(r, UINT32_MAX, readSCPEnvelope)
    const quorumSets = readVarArray(r, UINT32_MAX, readSCPQuorumSet)
    const txSets = readVarArray(r, UINT32_MAX, readStoredTransactionSet)
    return { scpEnvelopes, quorumSets, txSets }
  } finally {
    endComposite(r)
  }
}

export function writePersistedSCPStateV0(w: XdrWriter, v: PersistedSCPStateV0): void {
  writeVarArray(w, v.scpEnvelopes, UINT32_MAX, writeSCPEnvelope)
  writeVarArray(w, v.quorumSets, UINT32_MAX, writeSCPQuorumSet)
  writeVarArray(w, v.txSets, UINT32_MAX, writeStoredTransactionSet)
}

export function encodePersistedSCPStateV0(v: PersistedSCPStateV0): Uint8Array {
  return encode(v, writePersistedSCPStateV0)
}

export function decodePersistedSCPStateV0(input: Uint8Array | string): PersistedSCPStateV0 {
  return decode(input, readPersistedSCPStateV0)
}

export function toJsonPersistedSCPStateV0(v: PersistedSCPStateV0): Record<string, unknown> {
  return {
    'scp_envelopes': v.scpEnvelopes.map((item: any) => toJsonSCPEnvelope(item)),
    'quorum_sets': v.quorumSets.map((item: any) => toJsonSCPQuorumSet(item)),
    'tx_sets': v.txSets.map((item: any) => toJsonStoredTransactionSet(item)),
  }
}

export function fromJsonPersistedSCPStateV0(json: unknown): PersistedSCPStateV0 {
  const o = json as Record<string, unknown>
  return {
    scpEnvelopes: ((o['scp_envelopes']) as unknown[]).map((item: unknown) => fromJsonSCPEnvelope(item)),
    quorumSets: ((o['quorum_sets']) as unknown[]).map((item: unknown) => fromJsonSCPQuorumSet(item)),
    txSets: ((o['tx_sets']) as unknown[]).map((item: unknown) => fromJsonStoredTransactionSet(item)),
  }
}

export interface PersistedSCPStateV1 {
  /** Tx sets are saved separately */
  readonly scpEnvelopes: SCPEnvelope[]
  readonly quorumSets: SCPQuorumSet[]
}

export function readPersistedSCPStateV1(r: XdrReader): PersistedSCPStateV1 {
  beginComposite(r)
  try {
    const scpEnvelopes = readVarArray(r, UINT32_MAX, readSCPEnvelope)
    const quorumSets = readVarArray(r, UINT32_MAX, readSCPQuorumSet)
    return { scpEnvelopes, quorumSets }
  } finally {
    endComposite(r)
  }
}

export function writePersistedSCPStateV1(w: XdrWriter, v: PersistedSCPStateV1): void {
  writeVarArray(w, v.scpEnvelopes, UINT32_MAX, writeSCPEnvelope)
  writeVarArray(w, v.quorumSets, UINT32_MAX, writeSCPQuorumSet)
}

export function encodePersistedSCPStateV1(v: PersistedSCPStateV1): Uint8Array {
  return encode(v, writePersistedSCPStateV1)
}

export function decodePersistedSCPStateV1(input: Uint8Array | string): PersistedSCPStateV1 {
  return decode(input, readPersistedSCPStateV1)
}

export function toJsonPersistedSCPStateV1(v: PersistedSCPStateV1): Record<string, unknown> {
  return {
    'scp_envelopes': v.scpEnvelopes.map((item: any) => toJsonSCPEnvelope(item)),
    'quorum_sets': v.quorumSets.map((item: any) => toJsonSCPQuorumSet(item)),
  }
}

export function fromJsonPersistedSCPStateV1(json: unknown): PersistedSCPStateV1 {
  const o = json as Record<string, unknown>
  return {
    scpEnvelopes: ((o['scp_envelopes']) as unknown[]).map((item: unknown) => fromJsonSCPEnvelope(item)),
    quorumSets: ((o['quorum_sets']) as unknown[]).map((item: unknown) => fromJsonSCPQuorumSet(item)),
  }
}

export type PersistedSCPState =
  | { readonly v: 0; readonly v0: PersistedSCPStateV0 }
  | { readonly v: 1; readonly v1: PersistedSCPStateV1 }

export function readPersistedSCPState(r: XdrReader): PersistedSCPState {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: PersistedSCPState
    switch (v) {
      case 0:
        result = { v, v0: readPersistedSCPStateV0(r) }; break
      case 1:
        result = { v, v1: readPersistedSCPStateV1(r) }; break
      default:
        throw new XdrReadError(`Unknown PersistedSCPState discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writePersistedSCPState(w: XdrWriter, v: PersistedSCPState): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      writePersistedSCPStateV0(w, (v as any).v0); break
    case 1:
      writePersistedSCPStateV1(w, (v as any).v1); break
  }
}

export function encodePersistedSCPState(v: PersistedSCPState): Uint8Array {
  return encode(v, writePersistedSCPState)
}

export function decodePersistedSCPState(input: Uint8Array | string): PersistedSCPState {
  return decode(input, readPersistedSCPState)
}

export function toJsonPersistedSCPState(v: PersistedSCPState): unknown {
  switch (v.v) {
    case 0:
      return { 'v0': toJsonPersistedSCPStateV0((v as any).v0) }
    case 1:
      return { 'v1': toJsonPersistedSCPStateV1((v as any).v1) }
  }
}

export function fromJsonPersistedSCPState(json: unknown): PersistedSCPState {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for PersistedSCPState: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v0':
      return { v: 0, v0: fromJsonPersistedSCPStateV0(obj[key]) } as PersistedSCPState
    case 'v1':
      return { v: 1, v1: fromJsonPersistedSCPStateV1(obj[key]) } as PersistedSCPState
    default: throw new Error(`Unknown PersistedSCPState variant: ${key}`)
  }
}
