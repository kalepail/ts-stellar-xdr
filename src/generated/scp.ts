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

import type { Hash, NodeID, Signature, uint32, uint64 } from './types.js'
import { readHash, writeHash, toJsonHash, fromJsonHash, readNodeID, writeNodeID, toJsonNodeID, fromJsonNodeID, readSignature, writeSignature, toJsonSignature, fromJsonSignature, readuint32, writeuint32, toJsonuint32, fromJsonuint32, readuint64, writeuint64, toJsonuint64, fromJsonuint64 } from './types.js'


export type Value = Uint8Array

export function readValue(r: XdrReader): Value {
  return readVarOpaque(r, UINT32_MAX)
}

export function writeValue(w: XdrWriter, v: Value): void {
  writeVarOpaque(w, v, UINT32_MAX)
}

export function encodeValue(v: Value): Uint8Array {
  return encode(v, writeValue)
}

export function decodeValue(input: Uint8Array | string): Value {
  return decode(input, readValue)
}

export function toJsonValue(v: Value): unknown {
  return bytesToHex(v)
}

export function fromJsonValue(json: unknown): Value {
  return hexToBytes((json) as string)
}

export interface SCPBallot {
  readonly counter: uint32
  /** n */
  readonly value: Value
}

export function readSCPBallot(r: XdrReader): SCPBallot {
  beginComposite(r)
  try {
    const counter = readuint32(r)
    const value = readValue(r)
    return { counter, value }
  } finally {
    endComposite(r)
  }
}

export function writeSCPBallot(w: XdrWriter, v: SCPBallot): void {
  writeuint32(w, v.counter)
  writeValue(w, v.value)
}

export function encodeSCPBallot(v: SCPBallot): Uint8Array {
  return encode(v, writeSCPBallot)
}

export function decodeSCPBallot(input: Uint8Array | string): SCPBallot {
  return decode(input, readSCPBallot)
}

export function toJsonSCPBallot(v: SCPBallot): Record<string, unknown> {
  return {
    'counter': toJsonuint32(v.counter),
    'value': toJsonValue(v.value),
  }
}

export function fromJsonSCPBallot(json: unknown): SCPBallot {
  const o = json as Record<string, unknown>
  return {
    counter: fromJsonuint32(o['counter']),
    value: fromJsonValue(o['value']),
  }
}

export type SCPStatementType =
  | 'SCP_ST_PREPARE'
  | 'SCP_ST_CONFIRM'
  | 'SCP_ST_EXTERNALIZE'
  | 'SCP_ST_NOMINATE'

export const S_C_P_STATEMENT_TYPE_TO_INT: Record<SCPStatementType, number> = /*#__PURE__*/ {
  SCP_ST_PREPARE: 0,
  SCP_ST_CONFIRM: 1,
  SCP_ST_EXTERNALIZE: 2,
  SCP_ST_NOMINATE: 3,
}

export const S_C_P_STATEMENT_TYPE_FROM_INT: Record<number, SCPStatementType> = /*#__PURE__*/ {
  0: 'SCP_ST_PREPARE',
  1: 'SCP_ST_CONFIRM',
  2: 'SCP_ST_EXTERNALIZE',
  3: 'SCP_ST_NOMINATE',
}

export function readSCPStatementType(r: XdrReader): SCPStatementType {
  const v = readInt32(r)
  const result = S_C_P_STATEMENT_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCPStatementType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCPStatementType(w: XdrWriter, v: SCPStatementType): void {
  writeInt32(w, S_C_P_STATEMENT_TYPE_TO_INT[v])
}

export function encodeSCPStatementType(v: SCPStatementType): Uint8Array {
  return encode(v, writeSCPStatementType)
}

export function decodeSCPStatementType(input: Uint8Array | string): SCPStatementType {
  return decode(input, readSCPStatementType)
}

const _S_C_P_STATEMENT_TYPE_TO_JSON: Record<SCPStatementType, string> = /*#__PURE__*/ {
  SCP_ST_PREPARE: 'prepare',
  SCP_ST_CONFIRM: 'confirm',
  SCP_ST_EXTERNALIZE: 'externalize',
  SCP_ST_NOMINATE: 'nominate',
}

const _S_C_P_STATEMENT_TYPE_FROM_JSON: Record<string, SCPStatementType> = /*#__PURE__*/ {
  'prepare': 'SCP_ST_PREPARE',
  'confirm': 'SCP_ST_CONFIRM',
  'externalize': 'SCP_ST_EXTERNALIZE',
  'nominate': 'SCP_ST_NOMINATE',
}

export function toJsonSCPStatementType(v: SCPStatementType): string {
  return _S_C_P_STATEMENT_TYPE_TO_JSON[v]
}

export function fromJsonSCPStatementType(json: unknown): SCPStatementType {
  const result = _S_C_P_STATEMENT_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCPStatementType JSON value: ${json}`)
  return result
}

export interface SCPNomination {
  readonly quorumSetHash: Hash
  /** D */
  readonly votes: Value[]
  /** X */
  readonly accepted: Value[]
}

export function readSCPNomination(r: XdrReader): SCPNomination {
  beginComposite(r)
  try {
    const quorumSetHash = readHash(r)
    const votes = readVarArray(r, UINT32_MAX, readValue)
    const accepted = readVarArray(r, UINT32_MAX, readValue)
    return { quorumSetHash, votes, accepted }
  } finally {
    endComposite(r)
  }
}

export function writeSCPNomination(w: XdrWriter, v: SCPNomination): void {
  writeHash(w, v.quorumSetHash)
  writeVarArray(w, v.votes, UINT32_MAX, writeValue)
  writeVarArray(w, v.accepted, UINT32_MAX, writeValue)
}

export function encodeSCPNomination(v: SCPNomination): Uint8Array {
  return encode(v, writeSCPNomination)
}

export function decodeSCPNomination(input: Uint8Array | string): SCPNomination {
  return decode(input, readSCPNomination)
}

export function toJsonSCPNomination(v: SCPNomination): Record<string, unknown> {
  return {
    'quorum_set_hash': toJsonHash(v.quorumSetHash),
    'votes': v.votes.map((item: any) => toJsonValue(item)),
    'accepted': v.accepted.map((item: any) => toJsonValue(item)),
  }
}

export function fromJsonSCPNomination(json: unknown): SCPNomination {
  const o = json as Record<string, unknown>
  return {
    quorumSetHash: fromJsonHash(o['quorum_set_hash']),
    votes: ((o['votes']) as unknown[]).map((item: unknown) => fromJsonValue(item)),
    accepted: ((o['accepted']) as unknown[]).map((item: unknown) => fromJsonValue(item)),
  }
}

export interface SCPStatement_prepare {
  readonly quorumSetHash: Hash
  readonly ballot: SCPBallot
  readonly prepared: SCPBallot | undefined
  readonly preparedPrime: SCPBallot | undefined
  readonly nC: uint32
  readonly nH: uint32
}

export function readSCPStatement_prepare(r: XdrReader): SCPStatement_prepare {
  beginComposite(r)
  try {
    const quorumSetHash = readHash(r)
    const ballot = readSCPBallot(r)
    const prepared = readOptional(r, readSCPBallot)
    const preparedPrime = readOptional(r, readSCPBallot)
    const nC = readuint32(r)
    const nH = readuint32(r)
    return { quorumSetHash, ballot, prepared, preparedPrime, nC, nH }
  } finally {
    endComposite(r)
  }
}

export function writeSCPStatement_prepare(w: XdrWriter, v: SCPStatement_prepare): void {
  writeHash(w, v.quorumSetHash)
  writeSCPBallot(w, v.ballot)
  writeOptional(w, v.prepared, writeSCPBallot)
  writeOptional(w, v.preparedPrime, writeSCPBallot)
  writeuint32(w, v.nC)
  writeuint32(w, v.nH)
}

export function encodeSCPStatement_prepare(v: SCPStatement_prepare): Uint8Array {
  return encode(v, writeSCPStatement_prepare)
}

export function decodeSCPStatement_prepare(input: Uint8Array | string): SCPStatement_prepare {
  return decode(input, readSCPStatement_prepare)
}

export function toJsonSCPStatement_prepare(v: SCPStatement_prepare): Record<string, unknown> {
  return {
    'quorum_set_hash': toJsonHash(v.quorumSetHash),
    'ballot': toJsonSCPBallot(v.ballot),
    'prepared': v.prepared !== undefined ? toJsonSCPBallot(v.prepared) : null,
    'prepared_prime': v.preparedPrime !== undefined ? toJsonSCPBallot(v.preparedPrime) : null,
    'n_c': toJsonuint32(v.nC),
    'n_h': toJsonuint32(v.nH),
  }
}

export function fromJsonSCPStatement_prepare(json: unknown): SCPStatement_prepare {
  const o = json as Record<string, unknown>
  return {
    quorumSetHash: fromJsonHash(o['quorum_set_hash']),
    ballot: fromJsonSCPBallot(o['ballot']),
    prepared: (o['prepared']) != null ? fromJsonSCPBallot(o['prepared']) : undefined,
    preparedPrime: (o['prepared_prime']) != null ? fromJsonSCPBallot(o['prepared_prime']) : undefined,
    nC: fromJsonuint32(o['n_c']),
    nH: fromJsonuint32(o['n_h']),
  }
}

export interface SCPStatement_confirm {
  readonly ballot: SCPBallot
  readonly nPrepared: uint32
  readonly nCommit: uint32
  readonly nH: uint32
  readonly quorumSetHash: Hash
}

export function readSCPStatement_confirm(r: XdrReader): SCPStatement_confirm {
  beginComposite(r)
  try {
    const ballot = readSCPBallot(r)
    const nPrepared = readuint32(r)
    const nCommit = readuint32(r)
    const nH = readuint32(r)
    const quorumSetHash = readHash(r)
    return { ballot, nPrepared, nCommit, nH, quorumSetHash }
  } finally {
    endComposite(r)
  }
}

export function writeSCPStatement_confirm(w: XdrWriter, v: SCPStatement_confirm): void {
  writeSCPBallot(w, v.ballot)
  writeuint32(w, v.nPrepared)
  writeuint32(w, v.nCommit)
  writeuint32(w, v.nH)
  writeHash(w, v.quorumSetHash)
}

export function encodeSCPStatement_confirm(v: SCPStatement_confirm): Uint8Array {
  return encode(v, writeSCPStatement_confirm)
}

export function decodeSCPStatement_confirm(input: Uint8Array | string): SCPStatement_confirm {
  return decode(input, readSCPStatement_confirm)
}

export function toJsonSCPStatement_confirm(v: SCPStatement_confirm): Record<string, unknown> {
  return {
    'ballot': toJsonSCPBallot(v.ballot),
    'n_prepared': toJsonuint32(v.nPrepared),
    'n_commit': toJsonuint32(v.nCommit),
    'n_h': toJsonuint32(v.nH),
    'quorum_set_hash': toJsonHash(v.quorumSetHash),
  }
}

export function fromJsonSCPStatement_confirm(json: unknown): SCPStatement_confirm {
  const o = json as Record<string, unknown>
  return {
    ballot: fromJsonSCPBallot(o['ballot']),
    nPrepared: fromJsonuint32(o['n_prepared']),
    nCommit: fromJsonuint32(o['n_commit']),
    nH: fromJsonuint32(o['n_h']),
    quorumSetHash: fromJsonHash(o['quorum_set_hash']),
  }
}

export interface SCPStatement_externalize {
  readonly commit: SCPBallot
  readonly nH: uint32
  readonly commitQuorumSetHash: Hash
}

export function readSCPStatement_externalize(r: XdrReader): SCPStatement_externalize {
  beginComposite(r)
  try {
    const commit = readSCPBallot(r)
    const nH = readuint32(r)
    const commitQuorumSetHash = readHash(r)
    return { commit, nH, commitQuorumSetHash }
  } finally {
    endComposite(r)
  }
}

export function writeSCPStatement_externalize(w: XdrWriter, v: SCPStatement_externalize): void {
  writeSCPBallot(w, v.commit)
  writeuint32(w, v.nH)
  writeHash(w, v.commitQuorumSetHash)
}

export function encodeSCPStatement_externalize(v: SCPStatement_externalize): Uint8Array {
  return encode(v, writeSCPStatement_externalize)
}

export function decodeSCPStatement_externalize(input: Uint8Array | string): SCPStatement_externalize {
  return decode(input, readSCPStatement_externalize)
}

export function toJsonSCPStatement_externalize(v: SCPStatement_externalize): Record<string, unknown> {
  return {
    'commit': toJsonSCPBallot(v.commit),
    'n_h': toJsonuint32(v.nH),
    'commit_quorum_set_hash': toJsonHash(v.commitQuorumSetHash),
  }
}

export function fromJsonSCPStatement_externalize(json: unknown): SCPStatement_externalize {
  const o = json as Record<string, unknown>
  return {
    commit: fromJsonSCPBallot(o['commit']),
    nH: fromJsonuint32(o['n_h']),
    commitQuorumSetHash: fromJsonHash(o['commit_quorum_set_hash']),
  }
}

export type SCPStatement_pledges =
  | { readonly type: 'SCP_ST_PREPARE'; readonly prepare: SCPStatement_prepare }
  | { readonly type: 'SCP_ST_CONFIRM'; readonly confirm: SCPStatement_confirm }
  | { readonly type: 'SCP_ST_EXTERNALIZE'; readonly externalize: SCPStatement_externalize }
  | { readonly type: 'SCP_ST_NOMINATE'; readonly nominate: SCPNomination }

export function readSCPStatement_pledges(r: XdrReader): SCPStatement_pledges {
  beginComposite(r)
  try {
    const type = readSCPStatementType(r)
    let result: SCPStatement_pledges
    switch (type) {
      case 'SCP_ST_PREPARE':
        result = { type, prepare: readSCPStatement_prepare(r) }; break
      case 'SCP_ST_CONFIRM':
        result = { type, confirm: readSCPStatement_confirm(r) }; break
      case 'SCP_ST_EXTERNALIZE':
        result = { type, externalize: readSCPStatement_externalize(r) }; break
      case 'SCP_ST_NOMINATE':
        result = { type, nominate: readSCPNomination(r) }; break
      default:
        throw new XdrReadError(`Unknown SCPStatement_pledges discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSCPStatement_pledges(w: XdrWriter, v: SCPStatement_pledges): void {
  writeSCPStatementType(w, v.type)
  switch (v.type) {
    case 'SCP_ST_PREPARE':
      writeSCPStatement_prepare(w, (v as any).prepare); break
    case 'SCP_ST_CONFIRM':
      writeSCPStatement_confirm(w, (v as any).confirm); break
    case 'SCP_ST_EXTERNALIZE':
      writeSCPStatement_externalize(w, (v as any).externalize); break
    case 'SCP_ST_NOMINATE':
      writeSCPNomination(w, (v as any).nominate); break
  }
}

export function encodeSCPStatement_pledges(v: SCPStatement_pledges): Uint8Array {
  return encode(v, writeSCPStatement_pledges)
}

export function decodeSCPStatement_pledges(input: Uint8Array | string): SCPStatement_pledges {
  return decode(input, readSCPStatement_pledges)
}

export function toJsonSCPStatement_pledges(v: SCPStatement_pledges): unknown {
  switch (v.type) {
    case 'SCP_ST_PREPARE':
      return { 'prepare': toJsonSCPStatement_prepare((v as any).prepare) }
    case 'SCP_ST_CONFIRM':
      return { 'confirm': toJsonSCPStatement_confirm((v as any).confirm) }
    case 'SCP_ST_EXTERNALIZE':
      return { 'externalize': toJsonSCPStatement_externalize((v as any).externalize) }
    case 'SCP_ST_NOMINATE':
      return { 'nominate': toJsonSCPNomination((v as any).nominate) }
  }
}

export function fromJsonSCPStatement_pledges(json: unknown): SCPStatement_pledges {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for SCPStatement_pledges: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'prepare':
      return { type: 'SCP_ST_PREPARE', prepare: fromJsonSCPStatement_prepare(obj[key]) } as SCPStatement_pledges
    case 'confirm':
      return { type: 'SCP_ST_CONFIRM', confirm: fromJsonSCPStatement_confirm(obj[key]) } as SCPStatement_pledges
    case 'externalize':
      return { type: 'SCP_ST_EXTERNALIZE', externalize: fromJsonSCPStatement_externalize(obj[key]) } as SCPStatement_pledges
    case 'nominate':
      return { type: 'SCP_ST_NOMINATE', nominate: fromJsonSCPNomination(obj[key]) } as SCPStatement_pledges
    default: throw new Error(`Unknown SCPStatement_pledges variant: ${key}`)
  }
}

export interface SCPStatement {
  readonly nodeID: NodeID
  /** v */
  readonly slotIndex: uint64
  readonly pledges: SCPStatement_pledges
}

export function readSCPStatement(r: XdrReader): SCPStatement {
  beginComposite(r)
  try {
    const nodeID = readNodeID(r)
    const slotIndex = readuint64(r)
    const pledges = readSCPStatement_pledges(r)
    return { nodeID, slotIndex, pledges }
  } finally {
    endComposite(r)
  }
}

export function writeSCPStatement(w: XdrWriter, v: SCPStatement): void {
  writeNodeID(w, v.nodeID)
  writeuint64(w, v.slotIndex)
  writeSCPStatement_pledges(w, v.pledges)
}

export function encodeSCPStatement(v: SCPStatement): Uint8Array {
  return encode(v, writeSCPStatement)
}

export function decodeSCPStatement(input: Uint8Array | string): SCPStatement {
  return decode(input, readSCPStatement)
}

export function toJsonSCPStatement(v: SCPStatement): Record<string, unknown> {
  return {
    'node_id': toJsonNodeID(v.nodeID),
    'slot_index': toJsonuint64(v.slotIndex),
    'pledges': toJsonSCPStatement_pledges(v.pledges),
  }
}

export function fromJsonSCPStatement(json: unknown): SCPStatement {
  const o = json as Record<string, unknown>
  return {
    nodeID: fromJsonNodeID(o['node_id']),
    slotIndex: fromJsonuint64(o['slot_index']),
    pledges: fromJsonSCPStatement_pledges(o['pledges']),
  }
}

export interface SCPEnvelope {
  readonly statement: SCPStatement
  readonly signature: Signature
}

export function readSCPEnvelope(r: XdrReader): SCPEnvelope {
  beginComposite(r)
  try {
    const statement = readSCPStatement(r)
    const signature = readSignature(r)
    return { statement, signature }
  } finally {
    endComposite(r)
  }
}

export function writeSCPEnvelope(w: XdrWriter, v: SCPEnvelope): void {
  writeSCPStatement(w, v.statement)
  writeSignature(w, v.signature)
}

export function encodeSCPEnvelope(v: SCPEnvelope): Uint8Array {
  return encode(v, writeSCPEnvelope)
}

export function decodeSCPEnvelope(input: Uint8Array | string): SCPEnvelope {
  return decode(input, readSCPEnvelope)
}

export function toJsonSCPEnvelope(v: SCPEnvelope): Record<string, unknown> {
  return {
    'statement': toJsonSCPStatement(v.statement),
    'signature': toJsonSignature(v.signature),
  }
}

export function fromJsonSCPEnvelope(json: unknown): SCPEnvelope {
  const o = json as Record<string, unknown>
  return {
    statement: fromJsonSCPStatement(o['statement']),
    signature: fromJsonSignature(o['signature']),
  }
}

/**
 * supports things like: A,B,(C,D,E),(F,G,(H,I,(J,K,(L,M))))
 * only allows 4 levels of nesting
 */
export interface SCPQuorumSet {
  readonly threshold: uint32
  readonly validators: NodeID[]
  readonly innerSets: SCPQuorumSet[]
}

export function readSCPQuorumSet(r: XdrReader): SCPQuorumSet {
  beginComposite(r)
  try {
    const threshold = readuint32(r)
    const validators = readVarArray(r, UINT32_MAX, readNodeID)
    const innerSets = readVarArray(r, UINT32_MAX, readSCPQuorumSet)
    return { threshold, validators, innerSets }
  } finally {
    endComposite(r)
  }
}

export function writeSCPQuorumSet(w: XdrWriter, v: SCPQuorumSet): void {
  writeuint32(w, v.threshold)
  writeVarArray(w, v.validators, UINT32_MAX, writeNodeID)
  writeVarArray(w, v.innerSets, UINT32_MAX, writeSCPQuorumSet)
}

export function encodeSCPQuorumSet(v: SCPQuorumSet): Uint8Array {
  return encode(v, writeSCPQuorumSet)
}

export function decodeSCPQuorumSet(input: Uint8Array | string): SCPQuorumSet {
  return decode(input, readSCPQuorumSet)
}

export function toJsonSCPQuorumSet(v: SCPQuorumSet): Record<string, unknown> {
  return {
    'threshold': toJsonuint32(v.threshold),
    'validators': v.validators.map((item: any) => toJsonNodeID(item)),
    'inner_sets': v.innerSets.map((item: any) => toJsonSCPQuorumSet(item)),
  }
}

export function fromJsonSCPQuorumSet(json: unknown): SCPQuorumSet {
  const o = json as Record<string, unknown>
  return {
    threshold: fromJsonuint32(o['threshold']),
    validators: ((o['validators']) as unknown[]).map((item: unknown) => fromJsonNodeID(item)),
    innerSets: ((o['inner_sets']) as unknown[]).map((item: unknown) => fromJsonSCPQuorumSet(item)),
  }
}
