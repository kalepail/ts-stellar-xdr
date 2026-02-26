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

import type { GeneralizedTransactionSet, TransactionSet } from './ledger.js'
import { readGeneralizedTransactionSet, writeGeneralizedTransactionSet, toJsonGeneralizedTransactionSet, fromJsonGeneralizedTransactionSet, readTransactionSet, writeTransactionSet, toJsonTransactionSet, fromJsonTransactionSet } from './ledger.js'
import type { SCPEnvelope, SCPQuorumSet } from './scp.js'
import { readSCPEnvelope, writeSCPEnvelope, toJsonSCPEnvelope, fromJsonSCPEnvelope, readSCPQuorumSet, writeSCPQuorumSet, toJsonSCPQuorumSet, fromJsonSCPQuorumSet } from './scp.js'
import type { TransactionEnvelope } from './transaction.js'
import { readTransactionEnvelope, writeTransactionEnvelope, toJsonTransactionEnvelope, fromJsonTransactionEnvelope } from './transaction.js'
import type { Curve25519Public, Hash, HmacSha256Mac, NodeID, Signature, uint256, uint32, uint64 } from './types.js'
import { readCurve25519Public, writeCurve25519Public, toJsonCurve25519Public, fromJsonCurve25519Public, readHash, writeHash, toJsonHash, fromJsonHash, readHmacSha256Mac, writeHmacSha256Mac, toJsonHmacSha256Mac, fromJsonHmacSha256Mac, readNodeID, writeNodeID, toJsonNodeID, fromJsonNodeID, readSignature, writeSignature, toJsonSignature, fromJsonSignature, readuint256, writeuint256, toJsonuint256, fromJsonuint256, readuint32, writeuint32, toJsonuint32, fromJsonuint32, readuint64, writeuint64, toJsonuint64, fromJsonuint64 } from './types.js'


export type ErrorCode =
  | 'ERR_MISC'
  | 'ERR_DATA'
  | 'ERR_CONF'
  | 'ERR_AUTH'
  | 'ERR_LOAD'

export const ERROR_CODE_TO_INT: Record<ErrorCode, number> = /*#__PURE__*/ {
  ERR_MISC: 0,
  ERR_DATA: 1,
  ERR_CONF: 2,
  ERR_AUTH: 3,
  ERR_LOAD: 4,
}

export const ERROR_CODE_FROM_INT: Record<number, ErrorCode> = /*#__PURE__*/ {
  0: 'ERR_MISC',
  1: 'ERR_DATA',
  2: 'ERR_CONF',
  3: 'ERR_AUTH',
  4: 'ERR_LOAD',
}

export function readErrorCode(r: XdrReader): ErrorCode {
  const v = readInt32(r)
  const result = ERROR_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ErrorCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeErrorCode(w: XdrWriter, v: ErrorCode): void {
  writeInt32(w, ERROR_CODE_TO_INT[v])
}

export function encodeErrorCode(v: ErrorCode): Uint8Array {
  return encode(v, writeErrorCode)
}

export function decodeErrorCode(input: Uint8Array | string): ErrorCode {
  return decode(input, readErrorCode)
}

const _ERROR_CODE_TO_JSON: Record<ErrorCode, string> = /*#__PURE__*/ {
  ERR_MISC: 'misc',
  ERR_DATA: 'data',
  ERR_CONF: 'conf',
  ERR_AUTH: 'auth',
  ERR_LOAD: 'load',
}

const _ERROR_CODE_FROM_JSON: Record<string, ErrorCode> = /*#__PURE__*/ {
  'misc': 'ERR_MISC',
  'data': 'ERR_DATA',
  'conf': 'ERR_CONF',
  'auth': 'ERR_AUTH',
  'load': 'ERR_LOAD',
}

export function toJsonErrorCode(v: ErrorCode): string {
  return _ERROR_CODE_TO_JSON[v]
}

export function fromJsonErrorCode(json: unknown): ErrorCode {
  const result = _ERROR_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ErrorCode JSON value: ${json}`)
  return result
}

export interface Error {
  readonly code: ErrorCode
  readonly msg: string
}

export function readError(r: XdrReader): Error {
  beginComposite(r)
  try {
    const code = readErrorCode(r)
    const msg = readString(r, 100)
    return { code, msg }
  } finally {
    endComposite(r)
  }
}

export function writeError(w: XdrWriter, v: Error): void {
  writeErrorCode(w, v.code)
  writeString(w, v.msg, 100)
}

export function encodeError(v: Error): Uint8Array {
  return encode(v, writeError)
}

export function decodeError(input: Uint8Array | string): Error {
  return decode(input, readError)
}

export function toJsonError(v: Error): Record<string, unknown> {
  return {
    'code': toJsonErrorCode(v.code),
    'msg': escapeXdrString(v.msg),
  }
}

export function fromJsonError(json: unknown): Error {
  const o = json as Record<string, unknown>
  return {
    code: fromJsonErrorCode(o['code']),
    msg: unescapeXdrString((o['msg']) as string),
  }
}

export interface SendMore {
  readonly numMessages: uint32
}

export function readSendMore(r: XdrReader): SendMore {
  beginComposite(r)
  try {
    const numMessages = readuint32(r)
    return { numMessages }
  } finally {
    endComposite(r)
  }
}

export function writeSendMore(w: XdrWriter, v: SendMore): void {
  writeuint32(w, v.numMessages)
}

export function encodeSendMore(v: SendMore): Uint8Array {
  return encode(v, writeSendMore)
}

export function decodeSendMore(input: Uint8Array | string): SendMore {
  return decode(input, readSendMore)
}

export function toJsonSendMore(v: SendMore): Record<string, unknown> {
  return {
    'num_messages': toJsonuint32(v.numMessages),
  }
}

export function fromJsonSendMore(json: unknown): SendMore {
  const o = json as Record<string, unknown>
  return {
    numMessages: fromJsonuint32(o['num_messages']),
  }
}

export interface SendMoreExtended {
  readonly numMessages: uint32
  readonly numBytes: uint32
}

export function readSendMoreExtended(r: XdrReader): SendMoreExtended {
  beginComposite(r)
  try {
    const numMessages = readuint32(r)
    const numBytes = readuint32(r)
    return { numMessages, numBytes }
  } finally {
    endComposite(r)
  }
}

export function writeSendMoreExtended(w: XdrWriter, v: SendMoreExtended): void {
  writeuint32(w, v.numMessages)
  writeuint32(w, v.numBytes)
}

export function encodeSendMoreExtended(v: SendMoreExtended): Uint8Array {
  return encode(v, writeSendMoreExtended)
}

export function decodeSendMoreExtended(input: Uint8Array | string): SendMoreExtended {
  return decode(input, readSendMoreExtended)
}

export function toJsonSendMoreExtended(v: SendMoreExtended): Record<string, unknown> {
  return {
    'num_messages': toJsonuint32(v.numMessages),
    'num_bytes': toJsonuint32(v.numBytes),
  }
}

export function fromJsonSendMoreExtended(json: unknown): SendMoreExtended {
  const o = json as Record<string, unknown>
  return {
    numMessages: fromJsonuint32(o['num_messages']),
    numBytes: fromJsonuint32(o['num_bytes']),
  }
}

export interface AuthCert {
  readonly pubkey: Curve25519Public
  readonly expiration: uint64
  readonly sig: Signature
}

export function readAuthCert(r: XdrReader): AuthCert {
  beginComposite(r)
  try {
    const pubkey = readCurve25519Public(r)
    const expiration = readuint64(r)
    const sig = readSignature(r)
    return { pubkey, expiration, sig }
  } finally {
    endComposite(r)
  }
}

export function writeAuthCert(w: XdrWriter, v: AuthCert): void {
  writeCurve25519Public(w, v.pubkey)
  writeuint64(w, v.expiration)
  writeSignature(w, v.sig)
}

export function encodeAuthCert(v: AuthCert): Uint8Array {
  return encode(v, writeAuthCert)
}

export function decodeAuthCert(input: Uint8Array | string): AuthCert {
  return decode(input, readAuthCert)
}

export function toJsonAuthCert(v: AuthCert): Record<string, unknown> {
  return {
    'pubkey': toJsonCurve25519Public(v.pubkey),
    'expiration': toJsonuint64(v.expiration),
    'sig': toJsonSignature(v.sig),
  }
}

export function fromJsonAuthCert(json: unknown): AuthCert {
  const o = json as Record<string, unknown>
  return {
    pubkey: fromJsonCurve25519Public(o['pubkey']),
    expiration: fromJsonuint64(o['expiration']),
    sig: fromJsonSignature(o['sig']),
  }
}

export interface Hello {
  readonly ledgerVersion: uint32
  readonly overlayVersion: uint32
  readonly overlayMinVersion: uint32
  readonly networkID: Hash
  readonly versionStr: string
  readonly listeningPort: number
  readonly peerID: NodeID
  readonly cert: AuthCert
  readonly nonce: uint256
}

export function readHello(r: XdrReader): Hello {
  beginComposite(r)
  try {
    const ledgerVersion = readuint32(r)
    const overlayVersion = readuint32(r)
    const overlayMinVersion = readuint32(r)
    const networkID = readHash(r)
    const versionStr = readString(r, 100)
    const listeningPort = readInt32(r)
    const peerID = readNodeID(r)
    const cert = readAuthCert(r)
    const nonce = readuint256(r)
    return { ledgerVersion, overlayVersion, overlayMinVersion, networkID, versionStr, listeningPort, peerID, cert, nonce }
  } finally {
    endComposite(r)
  }
}

export function writeHello(w: XdrWriter, v: Hello): void {
  writeuint32(w, v.ledgerVersion)
  writeuint32(w, v.overlayVersion)
  writeuint32(w, v.overlayMinVersion)
  writeHash(w, v.networkID)
  writeString(w, v.versionStr, 100)
  writeInt32(w, v.listeningPort)
  writeNodeID(w, v.peerID)
  writeAuthCert(w, v.cert)
  writeuint256(w, v.nonce)
}

export function encodeHello(v: Hello): Uint8Array {
  return encode(v, writeHello)
}

export function decodeHello(input: Uint8Array | string): Hello {
  return decode(input, readHello)
}

export function toJsonHello(v: Hello): Record<string, unknown> {
  return {
    'ledger_version': toJsonuint32(v.ledgerVersion),
    'overlay_version': toJsonuint32(v.overlayVersion),
    'overlay_min_version': toJsonuint32(v.overlayMinVersion),
    'network_id': toJsonHash(v.networkID),
    'version_str': escapeXdrString(v.versionStr),
    'listening_port': v.listeningPort,
    'peer_id': toJsonNodeID(v.peerID),
    'cert': toJsonAuthCert(v.cert),
    'nonce': toJsonuint256(v.nonce),
  }
}

export function fromJsonHello(json: unknown): Hello {
  const o = json as Record<string, unknown>
  return {
    ledgerVersion: fromJsonuint32(o['ledger_version']),
    overlayVersion: fromJsonuint32(o['overlay_version']),
    overlayMinVersion: fromJsonuint32(o['overlay_min_version']),
    networkID: fromJsonHash(o['network_id']),
    versionStr: unescapeXdrString((o['version_str']) as string),
    listeningPort: (o['listening_port']) as number,
    peerID: fromJsonNodeID(o['peer_id']),
    cert: fromJsonAuthCert(o['cert']),
    nonce: fromJsonuint256(o['nonce']),
  }
}

/**
 * During the roll-out phrase, nodes can disable flow control in bytes.
 * Therefore, we need a way to communicate with other nodes
 * that we want/don't want flow control in bytes.
 * We use the `flags` field in the Auth message with a special value
 * set to communicate this. Note that AUTH_MSG_FLAG_FLOW_CONTROL_BYTES_REQUESTED != 0
 * AND AUTH_MSG_FLAG_FLOW_CONTROL_BYTES_REQUESTED != 100 (as previously
 * that value was used for other purposes).
 */
export const AUTH_MSG_FLAG_FLOW_CONTROL_BYTES_REQUESTED = 200


export interface Auth {
  readonly flags: number
}

export function readAuth(r: XdrReader): Auth {
  beginComposite(r)
  try {
    const flags = readInt32(r)
    return { flags }
  } finally {
    endComposite(r)
  }
}

export function writeAuth(w: XdrWriter, v: Auth): void {
  writeInt32(w, v.flags)
}

export function encodeAuth(v: Auth): Uint8Array {
  return encode(v, writeAuth)
}

export function decodeAuth(input: Uint8Array | string): Auth {
  return decode(input, readAuth)
}

export function toJsonAuth(v: Auth): Record<string, unknown> {
  return {
    'flags': v.flags,
  }
}

export function fromJsonAuth(json: unknown): Auth {
  const o = json as Record<string, unknown>
  return {
    flags: (o['flags']) as number,
  }
}

export type IPAddrType =
  | 'IPv4'
  | 'IPv6'

export const I_P_ADDR_TYPE_TO_INT: Record<IPAddrType, number> = /*#__PURE__*/ {
  IPv4: 0,
  IPv6: 1,
}

export const I_P_ADDR_TYPE_FROM_INT: Record<number, IPAddrType> = /*#__PURE__*/ {
  0: 'IPv4',
  1: 'IPv6',
}

export function readIPAddrType(r: XdrReader): IPAddrType {
  const v = readInt32(r)
  const result = I_P_ADDR_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown IPAddrType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeIPAddrType(w: XdrWriter, v: IPAddrType): void {
  writeInt32(w, I_P_ADDR_TYPE_TO_INT[v])
}

export function encodeIPAddrType(v: IPAddrType): Uint8Array {
  return encode(v, writeIPAddrType)
}

export function decodeIPAddrType(input: Uint8Array | string): IPAddrType {
  return decode(input, readIPAddrType)
}

const _I_P_ADDR_TYPE_TO_JSON: Record<IPAddrType, string> = /*#__PURE__*/ {
  IPv4: 'ipv4',
  IPv6: 'ipv6',
}

const _I_P_ADDR_TYPE_FROM_JSON: Record<string, IPAddrType> = /*#__PURE__*/ {
  'ipv4': 'IPv4',
  'ipv6': 'IPv6',
}

export function toJsonIPAddrType(v: IPAddrType): string {
  return _I_P_ADDR_TYPE_TO_JSON[v]
}

export function fromJsonIPAddrType(json: unknown): IPAddrType {
  const result = _I_P_ADDR_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown IPAddrType JSON value: ${json}`)
  return result
}

export type PeerAddress_ip =
  | { readonly type: 'IPv4'; readonly ipv4: Uint8Array }
  | { readonly type: 'IPv6'; readonly ipv6: Uint8Array }

export function readPeerAddress_ip(r: XdrReader): PeerAddress_ip {
  beginComposite(r)
  try {
    const type = readIPAddrType(r)
    let result: PeerAddress_ip
    switch (type) {
      case 'IPv4':
        result = { type, ipv4: readFixedOpaque(r, 4) }; break
      case 'IPv6':
        result = { type, ipv6: readFixedOpaque(r, 16) }; break
      default:
        throw new XdrReadError(`Unknown PeerAddress_ip discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writePeerAddress_ip(w: XdrWriter, v: PeerAddress_ip): void {
  writeIPAddrType(w, v.type)
  switch (v.type) {
    case 'IPv4':
      writeFixedOpaque(w, (v as any).ipv4, 4); break
    case 'IPv6':
      writeFixedOpaque(w, (v as any).ipv6, 16); break
  }
}

export function encodePeerAddress_ip(v: PeerAddress_ip): Uint8Array {
  return encode(v, writePeerAddress_ip)
}

export function decodePeerAddress_ip(input: Uint8Array | string): PeerAddress_ip {
  return decode(input, readPeerAddress_ip)
}

export function toJsonPeerAddress_ip(v: PeerAddress_ip): unknown {
  switch (v.type) {
    case 'IPv4':
      return { 'ipv4': bytesToHex((v as any).ipv4) }
    case 'IPv6':
      return { 'ipv6': bytesToHex((v as any).ipv6) }
  }
}

export function fromJsonPeerAddress_ip(json: unknown): PeerAddress_ip {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for PeerAddress_ip: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'ipv4':
      return { type: 'IPv4', ipv4: hexToBytes((obj[key]) as string) } as PeerAddress_ip
    case 'ipv6':
      return { type: 'IPv6', ipv6: hexToBytes((obj[key]) as string) } as PeerAddress_ip
    default: throw new Error(`Unknown PeerAddress_ip variant: ${key}`)
  }
}

export interface PeerAddress {
  readonly ip: PeerAddress_ip
  readonly port: uint32
  readonly numFailures: uint32
}

export function readPeerAddress(r: XdrReader): PeerAddress {
  beginComposite(r)
  try {
    const ip = readPeerAddress_ip(r)
    const port = readuint32(r)
    const numFailures = readuint32(r)
    return { ip, port, numFailures }
  } finally {
    endComposite(r)
  }
}

export function writePeerAddress(w: XdrWriter, v: PeerAddress): void {
  writePeerAddress_ip(w, v.ip)
  writeuint32(w, v.port)
  writeuint32(w, v.numFailures)
}

export function encodePeerAddress(v: PeerAddress): Uint8Array {
  return encode(v, writePeerAddress)
}

export function decodePeerAddress(input: Uint8Array | string): PeerAddress {
  return decode(input, readPeerAddress)
}

export function toJsonPeerAddress(v: PeerAddress): Record<string, unknown> {
  return {
    'ip': toJsonPeerAddress_ip(v.ip),
    'port': toJsonuint32(v.port),
    'num_failures': toJsonuint32(v.numFailures),
  }
}

export function fromJsonPeerAddress(json: unknown): PeerAddress {
  const o = json as Record<string, unknown>
  return {
    ip: fromJsonPeerAddress_ip(o['ip']),
    port: fromJsonuint32(o['port']),
    numFailures: fromJsonuint32(o['num_failures']),
  }
}

/** Next ID: 25 */
export type MessageType =
  | 'ERROR_MSG'
  | 'AUTH'
  | 'DONT_HAVE'
  | 'PEERS'
  | 'GET_TX_SET'
  | 'TX_SET'
  | 'GENERALIZED_TX_SET'
  | 'TRANSACTION'
  | 'GET_SCP_QUORUMSET'
  | 'SCP_QUORUMSET'
  | 'SCP_MESSAGE'
  | 'GET_SCP_STATE'
  | 'HELLO'
  | 'SEND_MORE'
  | 'SEND_MORE_EXTENDED'
  | 'FLOOD_ADVERT'
  | 'FLOOD_DEMAND'
  | 'TIME_SLICED_SURVEY_REQUEST'
  | 'TIME_SLICED_SURVEY_RESPONSE'
  | 'TIME_SLICED_SURVEY_START_COLLECTING'
  | 'TIME_SLICED_SURVEY_STOP_COLLECTING'

export const MESSAGE_TYPE_TO_INT: Record<MessageType, number> = /*#__PURE__*/ {
  ERROR_MSG: 0,
  AUTH: 2,
  DONT_HAVE: 3,
  PEERS: 5,
  GET_TX_SET: 6,
  TX_SET: 7,
  GENERALIZED_TX_SET: 17,
  TRANSACTION: 8,
  GET_SCP_QUORUMSET: 9,
  SCP_QUORUMSET: 10,
  SCP_MESSAGE: 11,
  GET_SCP_STATE: 12,
  HELLO: 13,
  SEND_MORE: 16,
  SEND_MORE_EXTENDED: 20,
  FLOOD_ADVERT: 18,
  FLOOD_DEMAND: 19,
  TIME_SLICED_SURVEY_REQUEST: 21,
  TIME_SLICED_SURVEY_RESPONSE: 22,
  TIME_SLICED_SURVEY_START_COLLECTING: 23,
  TIME_SLICED_SURVEY_STOP_COLLECTING: 24,
}

export const MESSAGE_TYPE_FROM_INT: Record<number, MessageType> = /*#__PURE__*/ {
  0: 'ERROR_MSG',
  2: 'AUTH',
  3: 'DONT_HAVE',
  5: 'PEERS',
  6: 'GET_TX_SET',
  7: 'TX_SET',
  17: 'GENERALIZED_TX_SET',
  8: 'TRANSACTION',
  9: 'GET_SCP_QUORUMSET',
  10: 'SCP_QUORUMSET',
  11: 'SCP_MESSAGE',
  12: 'GET_SCP_STATE',
  13: 'HELLO',
  16: 'SEND_MORE',
  20: 'SEND_MORE_EXTENDED',
  18: 'FLOOD_ADVERT',
  19: 'FLOOD_DEMAND',
  21: 'TIME_SLICED_SURVEY_REQUEST',
  22: 'TIME_SLICED_SURVEY_RESPONSE',
  23: 'TIME_SLICED_SURVEY_START_COLLECTING',
  24: 'TIME_SLICED_SURVEY_STOP_COLLECTING',
}

export function readMessageType(r: XdrReader): MessageType {
  const v = readInt32(r)
  const result = MESSAGE_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown MessageType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeMessageType(w: XdrWriter, v: MessageType): void {
  writeInt32(w, MESSAGE_TYPE_TO_INT[v])
}

export function encodeMessageType(v: MessageType): Uint8Array {
  return encode(v, writeMessageType)
}

export function decodeMessageType(input: Uint8Array | string): MessageType {
  return decode(input, readMessageType)
}

const _MESSAGE_TYPE_TO_JSON: Record<MessageType, string> = /*#__PURE__*/ {
  ERROR_MSG: 'error_msg',
  AUTH: 'auth',
  DONT_HAVE: 'dont_have',
  PEERS: 'peers',
  GET_TX_SET: 'get_tx_set',
  TX_SET: 'tx_set',
  GENERALIZED_TX_SET: 'generalized_tx_set',
  TRANSACTION: 'transaction',
  GET_SCP_QUORUMSET: 'get_scp_quorumset',
  SCP_QUORUMSET: 'scp_quorumset',
  SCP_MESSAGE: 'scp_message',
  GET_SCP_STATE: 'get_scp_state',
  HELLO: 'hello',
  SEND_MORE: 'send_more',
  SEND_MORE_EXTENDED: 'send_more_extended',
  FLOOD_ADVERT: 'flood_advert',
  FLOOD_DEMAND: 'flood_demand',
  TIME_SLICED_SURVEY_REQUEST: 'time_sliced_survey_request',
  TIME_SLICED_SURVEY_RESPONSE: 'time_sliced_survey_response',
  TIME_SLICED_SURVEY_START_COLLECTING: 'time_sliced_survey_start_collecting',
  TIME_SLICED_SURVEY_STOP_COLLECTING: 'time_sliced_survey_stop_collecting',
}

const _MESSAGE_TYPE_FROM_JSON: Record<string, MessageType> = /*#__PURE__*/ {
  'error_msg': 'ERROR_MSG',
  'auth': 'AUTH',
  'dont_have': 'DONT_HAVE',
  'peers': 'PEERS',
  'get_tx_set': 'GET_TX_SET',
  'tx_set': 'TX_SET',
  'generalized_tx_set': 'GENERALIZED_TX_SET',
  'transaction': 'TRANSACTION',
  'get_scp_quorumset': 'GET_SCP_QUORUMSET',
  'scp_quorumset': 'SCP_QUORUMSET',
  'scp_message': 'SCP_MESSAGE',
  'get_scp_state': 'GET_SCP_STATE',
  'hello': 'HELLO',
  'send_more': 'SEND_MORE',
  'send_more_extended': 'SEND_MORE_EXTENDED',
  'flood_advert': 'FLOOD_ADVERT',
  'flood_demand': 'FLOOD_DEMAND',
  'time_sliced_survey_request': 'TIME_SLICED_SURVEY_REQUEST',
  'time_sliced_survey_response': 'TIME_SLICED_SURVEY_RESPONSE',
  'time_sliced_survey_start_collecting': 'TIME_SLICED_SURVEY_START_COLLECTING',
  'time_sliced_survey_stop_collecting': 'TIME_SLICED_SURVEY_STOP_COLLECTING',
}

export function toJsonMessageType(v: MessageType): string {
  return _MESSAGE_TYPE_TO_JSON[v]
}

export function fromJsonMessageType(json: unknown): MessageType {
  const result = _MESSAGE_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown MessageType JSON value: ${json}`)
  return result
}

export interface DontHave {
  readonly type: MessageType
  readonly reqHash: uint256
}

export function readDontHave(r: XdrReader): DontHave {
  beginComposite(r)
  try {
    const type_ = readMessageType(r)
    const reqHash = readuint256(r)
    return { type: type_, reqHash }
  } finally {
    endComposite(r)
  }
}

export function writeDontHave(w: XdrWriter, v: DontHave): void {
  writeMessageType(w, v.type)
  writeuint256(w, v.reqHash)
}

export function encodeDontHave(v: DontHave): Uint8Array {
  return encode(v, writeDontHave)
}

export function decodeDontHave(input: Uint8Array | string): DontHave {
  return decode(input, readDontHave)
}

export function toJsonDontHave(v: DontHave): Record<string, unknown> {
  return {
    'type': toJsonMessageType(v.type),
    'req_hash': toJsonuint256(v.reqHash),
  }
}

export function fromJsonDontHave(json: unknown): DontHave {
  const o = json as Record<string, unknown>
  return {
    type: fromJsonMessageType(o['type']),
    reqHash: fromJsonuint256(o['req_hash']),
  }
}

export type SurveyMessageCommandType =
  | 'TIME_SLICED_SURVEY_TOPOLOGY'

export const SURVEY_MESSAGE_COMMAND_TYPE_TO_INT: Record<SurveyMessageCommandType, number> = /*#__PURE__*/ {
  TIME_SLICED_SURVEY_TOPOLOGY: 1,
}

export const SURVEY_MESSAGE_COMMAND_TYPE_FROM_INT: Record<number, SurveyMessageCommandType> = /*#__PURE__*/ {
  1: 'TIME_SLICED_SURVEY_TOPOLOGY',
}

export function readSurveyMessageCommandType(r: XdrReader): SurveyMessageCommandType {
  const v = readInt32(r)
  const result = SURVEY_MESSAGE_COMMAND_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SurveyMessageCommandType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSurveyMessageCommandType(w: XdrWriter, v: SurveyMessageCommandType): void {
  writeInt32(w, SURVEY_MESSAGE_COMMAND_TYPE_TO_INT[v])
}

export function encodeSurveyMessageCommandType(v: SurveyMessageCommandType): Uint8Array {
  return encode(v, writeSurveyMessageCommandType)
}

export function decodeSurveyMessageCommandType(input: Uint8Array | string): SurveyMessageCommandType {
  return decode(input, readSurveyMessageCommandType)
}

const _SURVEY_MESSAGE_COMMAND_TYPE_TO_JSON: Record<SurveyMessageCommandType, string> = /*#__PURE__*/ {
  TIME_SLICED_SURVEY_TOPOLOGY: 'time_sliced_survey_topology',
}

const _SURVEY_MESSAGE_COMMAND_TYPE_FROM_JSON: Record<string, SurveyMessageCommandType> = /*#__PURE__*/ {
  'time_sliced_survey_topology': 'TIME_SLICED_SURVEY_TOPOLOGY',
}

export function toJsonSurveyMessageCommandType(v: SurveyMessageCommandType): string {
  return _SURVEY_MESSAGE_COMMAND_TYPE_TO_JSON[v]
}

export function fromJsonSurveyMessageCommandType(json: unknown): SurveyMessageCommandType {
  const result = _SURVEY_MESSAGE_COMMAND_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SurveyMessageCommandType JSON value: ${json}`)
  return result
}

export type SurveyMessageResponseType =
  | 'SURVEY_TOPOLOGY_RESPONSE_V2'

export const SURVEY_MESSAGE_RESPONSE_TYPE_TO_INT: Record<SurveyMessageResponseType, number> = /*#__PURE__*/ {
  SURVEY_TOPOLOGY_RESPONSE_V2: 2,
}

export const SURVEY_MESSAGE_RESPONSE_TYPE_FROM_INT: Record<number, SurveyMessageResponseType> = /*#__PURE__*/ {
  2: 'SURVEY_TOPOLOGY_RESPONSE_V2',
}

export function readSurveyMessageResponseType(r: XdrReader): SurveyMessageResponseType {
  const v = readInt32(r)
  const result = SURVEY_MESSAGE_RESPONSE_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SurveyMessageResponseType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSurveyMessageResponseType(w: XdrWriter, v: SurveyMessageResponseType): void {
  writeInt32(w, SURVEY_MESSAGE_RESPONSE_TYPE_TO_INT[v])
}

export function encodeSurveyMessageResponseType(v: SurveyMessageResponseType): Uint8Array {
  return encode(v, writeSurveyMessageResponseType)
}

export function decodeSurveyMessageResponseType(input: Uint8Array | string): SurveyMessageResponseType {
  return decode(input, readSurveyMessageResponseType)
}

const _SURVEY_MESSAGE_RESPONSE_TYPE_TO_JSON: Record<SurveyMessageResponseType, string> = /*#__PURE__*/ {
  SURVEY_TOPOLOGY_RESPONSE_V2: 'survey_topology_response_v2',
}

const _SURVEY_MESSAGE_RESPONSE_TYPE_FROM_JSON: Record<string, SurveyMessageResponseType> = /*#__PURE__*/ {
  'survey_topology_response_v2': 'SURVEY_TOPOLOGY_RESPONSE_V2',
}

export function toJsonSurveyMessageResponseType(v: SurveyMessageResponseType): string {
  return _SURVEY_MESSAGE_RESPONSE_TYPE_TO_JSON[v]
}

export function fromJsonSurveyMessageResponseType(json: unknown): SurveyMessageResponseType {
  const result = _SURVEY_MESSAGE_RESPONSE_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SurveyMessageResponseType JSON value: ${json}`)
  return result
}

export interface TimeSlicedSurveyStartCollectingMessage {
  readonly surveyorID: NodeID
  readonly nonce: uint32
  readonly ledgerNum: uint32
}

export function readTimeSlicedSurveyStartCollectingMessage(r: XdrReader): TimeSlicedSurveyStartCollectingMessage {
  beginComposite(r)
  try {
    const surveyorID = readNodeID(r)
    const nonce = readuint32(r)
    const ledgerNum = readuint32(r)
    return { surveyorID, nonce, ledgerNum }
  } finally {
    endComposite(r)
  }
}

export function writeTimeSlicedSurveyStartCollectingMessage(w: XdrWriter, v: TimeSlicedSurveyStartCollectingMessage): void {
  writeNodeID(w, v.surveyorID)
  writeuint32(w, v.nonce)
  writeuint32(w, v.ledgerNum)
}

export function encodeTimeSlicedSurveyStartCollectingMessage(v: TimeSlicedSurveyStartCollectingMessage): Uint8Array {
  return encode(v, writeTimeSlicedSurveyStartCollectingMessage)
}

export function decodeTimeSlicedSurveyStartCollectingMessage(input: Uint8Array | string): TimeSlicedSurveyStartCollectingMessage {
  return decode(input, readTimeSlicedSurveyStartCollectingMessage)
}

export function toJsonTimeSlicedSurveyStartCollectingMessage(v: TimeSlicedSurveyStartCollectingMessage): Record<string, unknown> {
  return {
    'surveyor_id': toJsonNodeID(v.surveyorID),
    'nonce': toJsonuint32(v.nonce),
    'ledger_num': toJsonuint32(v.ledgerNum),
  }
}

export function fromJsonTimeSlicedSurveyStartCollectingMessage(json: unknown): TimeSlicedSurveyStartCollectingMessage {
  const o = json as Record<string, unknown>
  return {
    surveyorID: fromJsonNodeID(o['surveyor_id']),
    nonce: fromJsonuint32(o['nonce']),
    ledgerNum: fromJsonuint32(o['ledger_num']),
  }
}

export interface SignedTimeSlicedSurveyStartCollectingMessage {
  readonly signature: Signature
  readonly startCollecting: TimeSlicedSurveyStartCollectingMessage
}

export function readSignedTimeSlicedSurveyStartCollectingMessage(r: XdrReader): SignedTimeSlicedSurveyStartCollectingMessage {
  beginComposite(r)
  try {
    const signature = readSignature(r)
    const startCollecting = readTimeSlicedSurveyStartCollectingMessage(r)
    return { signature, startCollecting }
  } finally {
    endComposite(r)
  }
}

export function writeSignedTimeSlicedSurveyStartCollectingMessage(w: XdrWriter, v: SignedTimeSlicedSurveyStartCollectingMessage): void {
  writeSignature(w, v.signature)
  writeTimeSlicedSurveyStartCollectingMessage(w, v.startCollecting)
}

export function encodeSignedTimeSlicedSurveyStartCollectingMessage(v: SignedTimeSlicedSurveyStartCollectingMessage): Uint8Array {
  return encode(v, writeSignedTimeSlicedSurveyStartCollectingMessage)
}

export function decodeSignedTimeSlicedSurveyStartCollectingMessage(input: Uint8Array | string): SignedTimeSlicedSurveyStartCollectingMessage {
  return decode(input, readSignedTimeSlicedSurveyStartCollectingMessage)
}

export function toJsonSignedTimeSlicedSurveyStartCollectingMessage(v: SignedTimeSlicedSurveyStartCollectingMessage): Record<string, unknown> {
  return {
    'signature': toJsonSignature(v.signature),
    'start_collecting': toJsonTimeSlicedSurveyStartCollectingMessage(v.startCollecting),
  }
}

export function fromJsonSignedTimeSlicedSurveyStartCollectingMessage(json: unknown): SignedTimeSlicedSurveyStartCollectingMessage {
  const o = json as Record<string, unknown>
  return {
    signature: fromJsonSignature(o['signature']),
    startCollecting: fromJsonTimeSlicedSurveyStartCollectingMessage(o['start_collecting']),
  }
}

export interface TimeSlicedSurveyStopCollectingMessage {
  readonly surveyorID: NodeID
  readonly nonce: uint32
  readonly ledgerNum: uint32
}

export function readTimeSlicedSurveyStopCollectingMessage(r: XdrReader): TimeSlicedSurveyStopCollectingMessage {
  beginComposite(r)
  try {
    const surveyorID = readNodeID(r)
    const nonce = readuint32(r)
    const ledgerNum = readuint32(r)
    return { surveyorID, nonce, ledgerNum }
  } finally {
    endComposite(r)
  }
}

export function writeTimeSlicedSurveyStopCollectingMessage(w: XdrWriter, v: TimeSlicedSurveyStopCollectingMessage): void {
  writeNodeID(w, v.surveyorID)
  writeuint32(w, v.nonce)
  writeuint32(w, v.ledgerNum)
}

export function encodeTimeSlicedSurveyStopCollectingMessage(v: TimeSlicedSurveyStopCollectingMessage): Uint8Array {
  return encode(v, writeTimeSlicedSurveyStopCollectingMessage)
}

export function decodeTimeSlicedSurveyStopCollectingMessage(input: Uint8Array | string): TimeSlicedSurveyStopCollectingMessage {
  return decode(input, readTimeSlicedSurveyStopCollectingMessage)
}

export function toJsonTimeSlicedSurveyStopCollectingMessage(v: TimeSlicedSurveyStopCollectingMessage): Record<string, unknown> {
  return {
    'surveyor_id': toJsonNodeID(v.surveyorID),
    'nonce': toJsonuint32(v.nonce),
    'ledger_num': toJsonuint32(v.ledgerNum),
  }
}

export function fromJsonTimeSlicedSurveyStopCollectingMessage(json: unknown): TimeSlicedSurveyStopCollectingMessage {
  const o = json as Record<string, unknown>
  return {
    surveyorID: fromJsonNodeID(o['surveyor_id']),
    nonce: fromJsonuint32(o['nonce']),
    ledgerNum: fromJsonuint32(o['ledger_num']),
  }
}

export interface SignedTimeSlicedSurveyStopCollectingMessage {
  readonly signature: Signature
  readonly stopCollecting: TimeSlicedSurveyStopCollectingMessage
}

export function readSignedTimeSlicedSurveyStopCollectingMessage(r: XdrReader): SignedTimeSlicedSurveyStopCollectingMessage {
  beginComposite(r)
  try {
    const signature = readSignature(r)
    const stopCollecting = readTimeSlicedSurveyStopCollectingMessage(r)
    return { signature, stopCollecting }
  } finally {
    endComposite(r)
  }
}

export function writeSignedTimeSlicedSurveyStopCollectingMessage(w: XdrWriter, v: SignedTimeSlicedSurveyStopCollectingMessage): void {
  writeSignature(w, v.signature)
  writeTimeSlicedSurveyStopCollectingMessage(w, v.stopCollecting)
}

export function encodeSignedTimeSlicedSurveyStopCollectingMessage(v: SignedTimeSlicedSurveyStopCollectingMessage): Uint8Array {
  return encode(v, writeSignedTimeSlicedSurveyStopCollectingMessage)
}

export function decodeSignedTimeSlicedSurveyStopCollectingMessage(input: Uint8Array | string): SignedTimeSlicedSurveyStopCollectingMessage {
  return decode(input, readSignedTimeSlicedSurveyStopCollectingMessage)
}

export function toJsonSignedTimeSlicedSurveyStopCollectingMessage(v: SignedTimeSlicedSurveyStopCollectingMessage): Record<string, unknown> {
  return {
    'signature': toJsonSignature(v.signature),
    'stop_collecting': toJsonTimeSlicedSurveyStopCollectingMessage(v.stopCollecting),
  }
}

export function fromJsonSignedTimeSlicedSurveyStopCollectingMessage(json: unknown): SignedTimeSlicedSurveyStopCollectingMessage {
  const o = json as Record<string, unknown>
  return {
    signature: fromJsonSignature(o['signature']),
    stopCollecting: fromJsonTimeSlicedSurveyStopCollectingMessage(o['stop_collecting']),
  }
}

export interface SurveyRequestMessage {
  readonly surveyorPeerID: NodeID
  readonly surveyedPeerID: NodeID
  readonly ledgerNum: uint32
  readonly encryptionKey: Curve25519Public
  readonly commandType: SurveyMessageCommandType
}

export function readSurveyRequestMessage(r: XdrReader): SurveyRequestMessage {
  beginComposite(r)
  try {
    const surveyorPeerID = readNodeID(r)
    const surveyedPeerID = readNodeID(r)
    const ledgerNum = readuint32(r)
    const encryptionKey = readCurve25519Public(r)
    const commandType = readSurveyMessageCommandType(r)
    return { surveyorPeerID, surveyedPeerID, ledgerNum, encryptionKey, commandType }
  } finally {
    endComposite(r)
  }
}

export function writeSurveyRequestMessage(w: XdrWriter, v: SurveyRequestMessage): void {
  writeNodeID(w, v.surveyorPeerID)
  writeNodeID(w, v.surveyedPeerID)
  writeuint32(w, v.ledgerNum)
  writeCurve25519Public(w, v.encryptionKey)
  writeSurveyMessageCommandType(w, v.commandType)
}

export function encodeSurveyRequestMessage(v: SurveyRequestMessage): Uint8Array {
  return encode(v, writeSurveyRequestMessage)
}

export function decodeSurveyRequestMessage(input: Uint8Array | string): SurveyRequestMessage {
  return decode(input, readSurveyRequestMessage)
}

export function toJsonSurveyRequestMessage(v: SurveyRequestMessage): Record<string, unknown> {
  return {
    'surveyor_peer_id': toJsonNodeID(v.surveyorPeerID),
    'surveyed_peer_id': toJsonNodeID(v.surveyedPeerID),
    'ledger_num': toJsonuint32(v.ledgerNum),
    'encryption_key': toJsonCurve25519Public(v.encryptionKey),
    'command_type': toJsonSurveyMessageCommandType(v.commandType),
  }
}

export function fromJsonSurveyRequestMessage(json: unknown): SurveyRequestMessage {
  const o = json as Record<string, unknown>
  return {
    surveyorPeerID: fromJsonNodeID(o['surveyor_peer_id']),
    surveyedPeerID: fromJsonNodeID(o['surveyed_peer_id']),
    ledgerNum: fromJsonuint32(o['ledger_num']),
    encryptionKey: fromJsonCurve25519Public(o['encryption_key']),
    commandType: fromJsonSurveyMessageCommandType(o['command_type']),
  }
}

export interface TimeSlicedSurveyRequestMessage {
  readonly request: SurveyRequestMessage
  readonly nonce: uint32
  readonly inboundPeersIndex: uint32
  readonly outboundPeersIndex: uint32
}

export function readTimeSlicedSurveyRequestMessage(r: XdrReader): TimeSlicedSurveyRequestMessage {
  beginComposite(r)
  try {
    const request = readSurveyRequestMessage(r)
    const nonce = readuint32(r)
    const inboundPeersIndex = readuint32(r)
    const outboundPeersIndex = readuint32(r)
    return { request, nonce, inboundPeersIndex, outboundPeersIndex }
  } finally {
    endComposite(r)
  }
}

export function writeTimeSlicedSurveyRequestMessage(w: XdrWriter, v: TimeSlicedSurveyRequestMessage): void {
  writeSurveyRequestMessage(w, v.request)
  writeuint32(w, v.nonce)
  writeuint32(w, v.inboundPeersIndex)
  writeuint32(w, v.outboundPeersIndex)
}

export function encodeTimeSlicedSurveyRequestMessage(v: TimeSlicedSurveyRequestMessage): Uint8Array {
  return encode(v, writeTimeSlicedSurveyRequestMessage)
}

export function decodeTimeSlicedSurveyRequestMessage(input: Uint8Array | string): TimeSlicedSurveyRequestMessage {
  return decode(input, readTimeSlicedSurveyRequestMessage)
}

export function toJsonTimeSlicedSurveyRequestMessage(v: TimeSlicedSurveyRequestMessage): Record<string, unknown> {
  return {
    'request': toJsonSurveyRequestMessage(v.request),
    'nonce': toJsonuint32(v.nonce),
    'inbound_peers_index': toJsonuint32(v.inboundPeersIndex),
    'outbound_peers_index': toJsonuint32(v.outboundPeersIndex),
  }
}

export function fromJsonTimeSlicedSurveyRequestMessage(json: unknown): TimeSlicedSurveyRequestMessage {
  const o = json as Record<string, unknown>
  return {
    request: fromJsonSurveyRequestMessage(o['request']),
    nonce: fromJsonuint32(o['nonce']),
    inboundPeersIndex: fromJsonuint32(o['inbound_peers_index']),
    outboundPeersIndex: fromJsonuint32(o['outbound_peers_index']),
  }
}

export interface SignedTimeSlicedSurveyRequestMessage {
  readonly requestSignature: Signature
  readonly request: TimeSlicedSurveyRequestMessage
}

export function readSignedTimeSlicedSurveyRequestMessage(r: XdrReader): SignedTimeSlicedSurveyRequestMessage {
  beginComposite(r)
  try {
    const requestSignature = readSignature(r)
    const request = readTimeSlicedSurveyRequestMessage(r)
    return { requestSignature, request }
  } finally {
    endComposite(r)
  }
}

export function writeSignedTimeSlicedSurveyRequestMessage(w: XdrWriter, v: SignedTimeSlicedSurveyRequestMessage): void {
  writeSignature(w, v.requestSignature)
  writeTimeSlicedSurveyRequestMessage(w, v.request)
}

export function encodeSignedTimeSlicedSurveyRequestMessage(v: SignedTimeSlicedSurveyRequestMessage): Uint8Array {
  return encode(v, writeSignedTimeSlicedSurveyRequestMessage)
}

export function decodeSignedTimeSlicedSurveyRequestMessage(input: Uint8Array | string): SignedTimeSlicedSurveyRequestMessage {
  return decode(input, readSignedTimeSlicedSurveyRequestMessage)
}

export function toJsonSignedTimeSlicedSurveyRequestMessage(v: SignedTimeSlicedSurveyRequestMessage): Record<string, unknown> {
  return {
    'request_signature': toJsonSignature(v.requestSignature),
    'request': toJsonTimeSlicedSurveyRequestMessage(v.request),
  }
}

export function fromJsonSignedTimeSlicedSurveyRequestMessage(json: unknown): SignedTimeSlicedSurveyRequestMessage {
  const o = json as Record<string, unknown>
  return {
    requestSignature: fromJsonSignature(o['request_signature']),
    request: fromJsonTimeSlicedSurveyRequestMessage(o['request']),
  }
}

export type EncryptedBody = Uint8Array

export function readEncryptedBody(r: XdrReader): EncryptedBody {
  return readVarOpaque(r, 64000)
}

export function writeEncryptedBody(w: XdrWriter, v: EncryptedBody): void {
  writeVarOpaque(w, v, 64000)
}

export function encodeEncryptedBody(v: EncryptedBody): Uint8Array {
  return encode(v, writeEncryptedBody)
}

export function decodeEncryptedBody(input: Uint8Array | string): EncryptedBody {
  return decode(input, readEncryptedBody)
}

export function toJsonEncryptedBody(v: EncryptedBody): unknown {
  return bytesToHex(v)
}

export function fromJsonEncryptedBody(json: unknown): EncryptedBody {
  return hexToBytes((json) as string)
}

export interface SurveyResponseMessage {
  readonly surveyorPeerID: NodeID
  readonly surveyedPeerID: NodeID
  readonly ledgerNum: uint32
  readonly commandType: SurveyMessageCommandType
  readonly encryptedBody: EncryptedBody
}

export function readSurveyResponseMessage(r: XdrReader): SurveyResponseMessage {
  beginComposite(r)
  try {
    const surveyorPeerID = readNodeID(r)
    const surveyedPeerID = readNodeID(r)
    const ledgerNum = readuint32(r)
    const commandType = readSurveyMessageCommandType(r)
    const encryptedBody = readEncryptedBody(r)
    return { surveyorPeerID, surveyedPeerID, ledgerNum, commandType, encryptedBody }
  } finally {
    endComposite(r)
  }
}

export function writeSurveyResponseMessage(w: XdrWriter, v: SurveyResponseMessage): void {
  writeNodeID(w, v.surveyorPeerID)
  writeNodeID(w, v.surveyedPeerID)
  writeuint32(w, v.ledgerNum)
  writeSurveyMessageCommandType(w, v.commandType)
  writeEncryptedBody(w, v.encryptedBody)
}

export function encodeSurveyResponseMessage(v: SurveyResponseMessage): Uint8Array {
  return encode(v, writeSurveyResponseMessage)
}

export function decodeSurveyResponseMessage(input: Uint8Array | string): SurveyResponseMessage {
  return decode(input, readSurveyResponseMessage)
}

export function toJsonSurveyResponseMessage(v: SurveyResponseMessage): Record<string, unknown> {
  return {
    'surveyor_peer_id': toJsonNodeID(v.surveyorPeerID),
    'surveyed_peer_id': toJsonNodeID(v.surveyedPeerID),
    'ledger_num': toJsonuint32(v.ledgerNum),
    'command_type': toJsonSurveyMessageCommandType(v.commandType),
    'encrypted_body': toJsonEncryptedBody(v.encryptedBody),
  }
}

export function fromJsonSurveyResponseMessage(json: unknown): SurveyResponseMessage {
  const o = json as Record<string, unknown>
  return {
    surveyorPeerID: fromJsonNodeID(o['surveyor_peer_id']),
    surveyedPeerID: fromJsonNodeID(o['surveyed_peer_id']),
    ledgerNum: fromJsonuint32(o['ledger_num']),
    commandType: fromJsonSurveyMessageCommandType(o['command_type']),
    encryptedBody: fromJsonEncryptedBody(o['encrypted_body']),
  }
}

export interface TimeSlicedSurveyResponseMessage {
  readonly response: SurveyResponseMessage
  readonly nonce: uint32
}

export function readTimeSlicedSurveyResponseMessage(r: XdrReader): TimeSlicedSurveyResponseMessage {
  beginComposite(r)
  try {
    const response = readSurveyResponseMessage(r)
    const nonce = readuint32(r)
    return { response, nonce }
  } finally {
    endComposite(r)
  }
}

export function writeTimeSlicedSurveyResponseMessage(w: XdrWriter, v: TimeSlicedSurveyResponseMessage): void {
  writeSurveyResponseMessage(w, v.response)
  writeuint32(w, v.nonce)
}

export function encodeTimeSlicedSurveyResponseMessage(v: TimeSlicedSurveyResponseMessage): Uint8Array {
  return encode(v, writeTimeSlicedSurveyResponseMessage)
}

export function decodeTimeSlicedSurveyResponseMessage(input: Uint8Array | string): TimeSlicedSurveyResponseMessage {
  return decode(input, readTimeSlicedSurveyResponseMessage)
}

export function toJsonTimeSlicedSurveyResponseMessage(v: TimeSlicedSurveyResponseMessage): Record<string, unknown> {
  return {
    'response': toJsonSurveyResponseMessage(v.response),
    'nonce': toJsonuint32(v.nonce),
  }
}

export function fromJsonTimeSlicedSurveyResponseMessage(json: unknown): TimeSlicedSurveyResponseMessage {
  const o = json as Record<string, unknown>
  return {
    response: fromJsonSurveyResponseMessage(o['response']),
    nonce: fromJsonuint32(o['nonce']),
  }
}

export interface SignedTimeSlicedSurveyResponseMessage {
  readonly responseSignature: Signature
  readonly response: TimeSlicedSurveyResponseMessage
}

export function readSignedTimeSlicedSurveyResponseMessage(r: XdrReader): SignedTimeSlicedSurveyResponseMessage {
  beginComposite(r)
  try {
    const responseSignature = readSignature(r)
    const response = readTimeSlicedSurveyResponseMessage(r)
    return { responseSignature, response }
  } finally {
    endComposite(r)
  }
}

export function writeSignedTimeSlicedSurveyResponseMessage(w: XdrWriter, v: SignedTimeSlicedSurveyResponseMessage): void {
  writeSignature(w, v.responseSignature)
  writeTimeSlicedSurveyResponseMessage(w, v.response)
}

export function encodeSignedTimeSlicedSurveyResponseMessage(v: SignedTimeSlicedSurveyResponseMessage): Uint8Array {
  return encode(v, writeSignedTimeSlicedSurveyResponseMessage)
}

export function decodeSignedTimeSlicedSurveyResponseMessage(input: Uint8Array | string): SignedTimeSlicedSurveyResponseMessage {
  return decode(input, readSignedTimeSlicedSurveyResponseMessage)
}

export function toJsonSignedTimeSlicedSurveyResponseMessage(v: SignedTimeSlicedSurveyResponseMessage): Record<string, unknown> {
  return {
    'response_signature': toJsonSignature(v.responseSignature),
    'response': toJsonTimeSlicedSurveyResponseMessage(v.response),
  }
}

export function fromJsonSignedTimeSlicedSurveyResponseMessage(json: unknown): SignedTimeSlicedSurveyResponseMessage {
  const o = json as Record<string, unknown>
  return {
    responseSignature: fromJsonSignature(o['response_signature']),
    response: fromJsonTimeSlicedSurveyResponseMessage(o['response']),
  }
}

export interface PeerStats {
  readonly id: NodeID
  readonly versionStr: string
  readonly messagesRead: uint64
  readonly messagesWritten: uint64
  readonly bytesRead: uint64
  readonly bytesWritten: uint64
  readonly secondsConnected: uint64
  readonly uniqueFloodBytesRecv: uint64
  readonly duplicateFloodBytesRecv: uint64
  readonly uniqueFetchBytesRecv: uint64
  readonly duplicateFetchBytesRecv: uint64
  readonly uniqueFloodMessageRecv: uint64
  readonly duplicateFloodMessageRecv: uint64
  readonly uniqueFetchMessageRecv: uint64
  readonly duplicateFetchMessageRecv: uint64
}

export function readPeerStats(r: XdrReader): PeerStats {
  beginComposite(r)
  try {
    const id = readNodeID(r)
    const versionStr = readString(r, 100)
    const messagesRead = readuint64(r)
    const messagesWritten = readuint64(r)
    const bytesRead = readuint64(r)
    const bytesWritten = readuint64(r)
    const secondsConnected = readuint64(r)
    const uniqueFloodBytesRecv = readuint64(r)
    const duplicateFloodBytesRecv = readuint64(r)
    const uniqueFetchBytesRecv = readuint64(r)
    const duplicateFetchBytesRecv = readuint64(r)
    const uniqueFloodMessageRecv = readuint64(r)
    const duplicateFloodMessageRecv = readuint64(r)
    const uniqueFetchMessageRecv = readuint64(r)
    const duplicateFetchMessageRecv = readuint64(r)
    return { id, versionStr, messagesRead, messagesWritten, bytesRead, bytesWritten, secondsConnected, uniqueFloodBytesRecv, duplicateFloodBytesRecv, uniqueFetchBytesRecv, duplicateFetchBytesRecv, uniqueFloodMessageRecv, duplicateFloodMessageRecv, uniqueFetchMessageRecv, duplicateFetchMessageRecv }
  } finally {
    endComposite(r)
  }
}

export function writePeerStats(w: XdrWriter, v: PeerStats): void {
  writeNodeID(w, v.id)
  writeString(w, v.versionStr, 100)
  writeuint64(w, v.messagesRead)
  writeuint64(w, v.messagesWritten)
  writeuint64(w, v.bytesRead)
  writeuint64(w, v.bytesWritten)
  writeuint64(w, v.secondsConnected)
  writeuint64(w, v.uniqueFloodBytesRecv)
  writeuint64(w, v.duplicateFloodBytesRecv)
  writeuint64(w, v.uniqueFetchBytesRecv)
  writeuint64(w, v.duplicateFetchBytesRecv)
  writeuint64(w, v.uniqueFloodMessageRecv)
  writeuint64(w, v.duplicateFloodMessageRecv)
  writeuint64(w, v.uniqueFetchMessageRecv)
  writeuint64(w, v.duplicateFetchMessageRecv)
}

export function encodePeerStats(v: PeerStats): Uint8Array {
  return encode(v, writePeerStats)
}

export function decodePeerStats(input: Uint8Array | string): PeerStats {
  return decode(input, readPeerStats)
}

export function toJsonPeerStats(v: PeerStats): Record<string, unknown> {
  return {
    'id': toJsonNodeID(v.id),
    'version_str': escapeXdrString(v.versionStr),
    'messages_read': toJsonuint64(v.messagesRead),
    'messages_written': toJsonuint64(v.messagesWritten),
    'bytes_read': toJsonuint64(v.bytesRead),
    'bytes_written': toJsonuint64(v.bytesWritten),
    'seconds_connected': toJsonuint64(v.secondsConnected),
    'unique_flood_bytes_recv': toJsonuint64(v.uniqueFloodBytesRecv),
    'duplicate_flood_bytes_recv': toJsonuint64(v.duplicateFloodBytesRecv),
    'unique_fetch_bytes_recv': toJsonuint64(v.uniqueFetchBytesRecv),
    'duplicate_fetch_bytes_recv': toJsonuint64(v.duplicateFetchBytesRecv),
    'unique_flood_message_recv': toJsonuint64(v.uniqueFloodMessageRecv),
    'duplicate_flood_message_recv': toJsonuint64(v.duplicateFloodMessageRecv),
    'unique_fetch_message_recv': toJsonuint64(v.uniqueFetchMessageRecv),
    'duplicate_fetch_message_recv': toJsonuint64(v.duplicateFetchMessageRecv),
  }
}

export function fromJsonPeerStats(json: unknown): PeerStats {
  const o = json as Record<string, unknown>
  return {
    id: fromJsonNodeID(o['id']),
    versionStr: unescapeXdrString((o['version_str']) as string),
    messagesRead: fromJsonuint64(o['messages_read']),
    messagesWritten: fromJsonuint64(o['messages_written']),
    bytesRead: fromJsonuint64(o['bytes_read']),
    bytesWritten: fromJsonuint64(o['bytes_written']),
    secondsConnected: fromJsonuint64(o['seconds_connected']),
    uniqueFloodBytesRecv: fromJsonuint64(o['unique_flood_bytes_recv']),
    duplicateFloodBytesRecv: fromJsonuint64(o['duplicate_flood_bytes_recv']),
    uniqueFetchBytesRecv: fromJsonuint64(o['unique_fetch_bytes_recv']),
    duplicateFetchBytesRecv: fromJsonuint64(o['duplicate_fetch_bytes_recv']),
    uniqueFloodMessageRecv: fromJsonuint64(o['unique_flood_message_recv']),
    duplicateFloodMessageRecv: fromJsonuint64(o['duplicate_flood_message_recv']),
    uniqueFetchMessageRecv: fromJsonuint64(o['unique_fetch_message_recv']),
    duplicateFetchMessageRecv: fromJsonuint64(o['duplicate_fetch_message_recv']),
  }
}

export interface TimeSlicedNodeData {
  readonly addedAuthenticatedPeers: uint32
  readonly droppedAuthenticatedPeers: uint32
  readonly totalInboundPeerCount: uint32
  readonly totalOutboundPeerCount: uint32
  /** SCP stats */
  readonly p75SCPFirstToSelfLatencyMs: uint32
  readonly p75SCPSelfToOtherLatencyMs: uint32
  /** How many times the node lost sync in the time slice */
  readonly lostSyncCount: uint32
  /** Config data */
  readonly isValidator: boolean
  readonly maxInboundPeerCount: uint32
  readonly maxOutboundPeerCount: uint32
}

export function readTimeSlicedNodeData(r: XdrReader): TimeSlicedNodeData {
  beginComposite(r)
  try {
    const addedAuthenticatedPeers = readuint32(r)
    const droppedAuthenticatedPeers = readuint32(r)
    const totalInboundPeerCount = readuint32(r)
    const totalOutboundPeerCount = readuint32(r)
    const p75SCPFirstToSelfLatencyMs = readuint32(r)
    const p75SCPSelfToOtherLatencyMs = readuint32(r)
    const lostSyncCount = readuint32(r)
    const isValidator = readBool(r)
    const maxInboundPeerCount = readuint32(r)
    const maxOutboundPeerCount = readuint32(r)
    return { addedAuthenticatedPeers, droppedAuthenticatedPeers, totalInboundPeerCount, totalOutboundPeerCount, p75SCPFirstToSelfLatencyMs, p75SCPSelfToOtherLatencyMs, lostSyncCount, isValidator, maxInboundPeerCount, maxOutboundPeerCount }
  } finally {
    endComposite(r)
  }
}

export function writeTimeSlicedNodeData(w: XdrWriter, v: TimeSlicedNodeData): void {
  writeuint32(w, v.addedAuthenticatedPeers)
  writeuint32(w, v.droppedAuthenticatedPeers)
  writeuint32(w, v.totalInboundPeerCount)
  writeuint32(w, v.totalOutboundPeerCount)
  writeuint32(w, v.p75SCPFirstToSelfLatencyMs)
  writeuint32(w, v.p75SCPSelfToOtherLatencyMs)
  writeuint32(w, v.lostSyncCount)
  writeBool(w, v.isValidator)
  writeuint32(w, v.maxInboundPeerCount)
  writeuint32(w, v.maxOutboundPeerCount)
}

export function encodeTimeSlicedNodeData(v: TimeSlicedNodeData): Uint8Array {
  return encode(v, writeTimeSlicedNodeData)
}

export function decodeTimeSlicedNodeData(input: Uint8Array | string): TimeSlicedNodeData {
  return decode(input, readTimeSlicedNodeData)
}

export function toJsonTimeSlicedNodeData(v: TimeSlicedNodeData): Record<string, unknown> {
  return {
    'added_authenticated_peers': toJsonuint32(v.addedAuthenticatedPeers),
    'dropped_authenticated_peers': toJsonuint32(v.droppedAuthenticatedPeers),
    'total_inbound_peer_count': toJsonuint32(v.totalInboundPeerCount),
    'total_outbound_peer_count': toJsonuint32(v.totalOutboundPeerCount),
    'p75_scp_first_to_self_latency_ms': toJsonuint32(v.p75SCPFirstToSelfLatencyMs),
    'p75_scp_self_to_other_latency_ms': toJsonuint32(v.p75SCPSelfToOtherLatencyMs),
    'lost_sync_count': toJsonuint32(v.lostSyncCount),
    'is_validator': v.isValidator,
    'max_inbound_peer_count': toJsonuint32(v.maxInboundPeerCount),
    'max_outbound_peer_count': toJsonuint32(v.maxOutboundPeerCount),
  }
}

export function fromJsonTimeSlicedNodeData(json: unknown): TimeSlicedNodeData {
  const o = json as Record<string, unknown>
  return {
    addedAuthenticatedPeers: fromJsonuint32(o['added_authenticated_peers']),
    droppedAuthenticatedPeers: fromJsonuint32(o['dropped_authenticated_peers']),
    totalInboundPeerCount: fromJsonuint32(o['total_inbound_peer_count']),
    totalOutboundPeerCount: fromJsonuint32(o['total_outbound_peer_count']),
    p75SCPFirstToSelfLatencyMs: fromJsonuint32(o['p75_scp_first_to_self_latency_ms']),
    p75SCPSelfToOtherLatencyMs: fromJsonuint32(o['p75_scp_self_to_other_latency_ms']),
    lostSyncCount: fromJsonuint32(o['lost_sync_count']),
    isValidator: (o['is_validator']) as boolean,
    maxInboundPeerCount: fromJsonuint32(o['max_inbound_peer_count']),
    maxOutboundPeerCount: fromJsonuint32(o['max_outbound_peer_count']),
  }
}

export interface TimeSlicedPeerData {
  readonly peerStats: PeerStats
  readonly averageLatencyMs: uint32
}

export function readTimeSlicedPeerData(r: XdrReader): TimeSlicedPeerData {
  beginComposite(r)
  try {
    const peerStats = readPeerStats(r)
    const averageLatencyMs = readuint32(r)
    return { peerStats, averageLatencyMs }
  } finally {
    endComposite(r)
  }
}

export function writeTimeSlicedPeerData(w: XdrWriter, v: TimeSlicedPeerData): void {
  writePeerStats(w, v.peerStats)
  writeuint32(w, v.averageLatencyMs)
}

export function encodeTimeSlicedPeerData(v: TimeSlicedPeerData): Uint8Array {
  return encode(v, writeTimeSlicedPeerData)
}

export function decodeTimeSlicedPeerData(input: Uint8Array | string): TimeSlicedPeerData {
  return decode(input, readTimeSlicedPeerData)
}

export function toJsonTimeSlicedPeerData(v: TimeSlicedPeerData): Record<string, unknown> {
  return {
    'peer_stats': toJsonPeerStats(v.peerStats),
    'average_latency_ms': toJsonuint32(v.averageLatencyMs),
  }
}

export function fromJsonTimeSlicedPeerData(json: unknown): TimeSlicedPeerData {
  const o = json as Record<string, unknown>
  return {
    peerStats: fromJsonPeerStats(o['peer_stats']),
    averageLatencyMs: fromJsonuint32(o['average_latency_ms']),
  }
}

export type TimeSlicedPeerDataList = TimeSlicedPeerData[]

export function readTimeSlicedPeerDataList(r: XdrReader): TimeSlicedPeerDataList {
  return readVarArray(r, 25, readTimeSlicedPeerData)
}

export function writeTimeSlicedPeerDataList(w: XdrWriter, v: TimeSlicedPeerDataList): void {
  writeVarArray(w, v, 25, writeTimeSlicedPeerData)
}

export function encodeTimeSlicedPeerDataList(v: TimeSlicedPeerDataList): Uint8Array {
  return encode(v, writeTimeSlicedPeerDataList)
}

export function decodeTimeSlicedPeerDataList(input: Uint8Array | string): TimeSlicedPeerDataList {
  return decode(input, readTimeSlicedPeerDataList)
}

export function toJsonTimeSlicedPeerDataList(v: TimeSlicedPeerDataList): unknown {
  return v.map((item: any) => toJsonTimeSlicedPeerData(item))
}

export function fromJsonTimeSlicedPeerDataList(json: unknown): TimeSlicedPeerDataList {
  return ((json) as unknown[]).map((item: unknown) => fromJsonTimeSlicedPeerData(item))
}

export interface TopologyResponseBodyV2 {
  readonly inboundPeers: TimeSlicedPeerDataList
  readonly outboundPeers: TimeSlicedPeerDataList
  readonly nodeData: TimeSlicedNodeData
}

export function readTopologyResponseBodyV2(r: XdrReader): TopologyResponseBodyV2 {
  beginComposite(r)
  try {
    const inboundPeers = readTimeSlicedPeerDataList(r)
    const outboundPeers = readTimeSlicedPeerDataList(r)
    const nodeData = readTimeSlicedNodeData(r)
    return { inboundPeers, outboundPeers, nodeData }
  } finally {
    endComposite(r)
  }
}

export function writeTopologyResponseBodyV2(w: XdrWriter, v: TopologyResponseBodyV2): void {
  writeTimeSlicedPeerDataList(w, v.inboundPeers)
  writeTimeSlicedPeerDataList(w, v.outboundPeers)
  writeTimeSlicedNodeData(w, v.nodeData)
}

export function encodeTopologyResponseBodyV2(v: TopologyResponseBodyV2): Uint8Array {
  return encode(v, writeTopologyResponseBodyV2)
}

export function decodeTopologyResponseBodyV2(input: Uint8Array | string): TopologyResponseBodyV2 {
  return decode(input, readTopologyResponseBodyV2)
}

export function toJsonTopologyResponseBodyV2(v: TopologyResponseBodyV2): Record<string, unknown> {
  return {
    'inbound_peers': toJsonTimeSlicedPeerDataList(v.inboundPeers),
    'outbound_peers': toJsonTimeSlicedPeerDataList(v.outboundPeers),
    'node_data': toJsonTimeSlicedNodeData(v.nodeData),
  }
}

export function fromJsonTopologyResponseBodyV2(json: unknown): TopologyResponseBodyV2 {
  const o = json as Record<string, unknown>
  return {
    inboundPeers: fromJsonTimeSlicedPeerDataList(o['inbound_peers']),
    outboundPeers: fromJsonTimeSlicedPeerDataList(o['outbound_peers']),
    nodeData: fromJsonTimeSlicedNodeData(o['node_data']),
  }
}

export type SurveyResponseBody =
  | { readonly type: 'SURVEY_TOPOLOGY_RESPONSE_V2'; readonly topologyResponseBodyV2: TopologyResponseBodyV2 }

export function readSurveyResponseBody(r: XdrReader): SurveyResponseBody {
  beginComposite(r)
  try {
    const type = readSurveyMessageResponseType(r)
    let result: SurveyResponseBody
    switch (type) {
      case 'SURVEY_TOPOLOGY_RESPONSE_V2':
        result = { type, topologyResponseBodyV2: readTopologyResponseBodyV2(r) }; break
      default:
        throw new XdrReadError(`Unknown SurveyResponseBody discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSurveyResponseBody(w: XdrWriter, v: SurveyResponseBody): void {
  writeSurveyMessageResponseType(w, v.type)
  switch (v.type) {
    case 'SURVEY_TOPOLOGY_RESPONSE_V2':
      writeTopologyResponseBodyV2(w, (v as any).topologyResponseBodyV2); break
  }
}

export function encodeSurveyResponseBody(v: SurveyResponseBody): Uint8Array {
  return encode(v, writeSurveyResponseBody)
}

export function decodeSurveyResponseBody(input: Uint8Array | string): SurveyResponseBody {
  return decode(input, readSurveyResponseBody)
}

export function toJsonSurveyResponseBody(v: SurveyResponseBody): unknown {
  switch (v.type) {
    case 'SURVEY_TOPOLOGY_RESPONSE_V2':
      return { 'survey_topology_response_v2': toJsonTopologyResponseBodyV2((v as any).topologyResponseBodyV2) }
  }
}

export function fromJsonSurveyResponseBody(json: unknown): SurveyResponseBody {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for SurveyResponseBody: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'survey_topology_response_v2':
      return { type: 'SURVEY_TOPOLOGY_RESPONSE_V2', topologyResponseBodyV2: fromJsonTopologyResponseBodyV2(obj[key]) } as SurveyResponseBody
    default: throw new Error(`Unknown SurveyResponseBody variant: ${key}`)
  }
}

export const TX_ADVERT_VECTOR_MAX_SIZE = 1000


export type TxAdvertVector = Hash[]

export function readTxAdvertVector(r: XdrReader): TxAdvertVector {
  return readVarArray(r, TX_ADVERT_VECTOR_MAX_SIZE, readHash)
}

export function writeTxAdvertVector(w: XdrWriter, v: TxAdvertVector): void {
  writeVarArray(w, v, TX_ADVERT_VECTOR_MAX_SIZE, writeHash)
}

export function encodeTxAdvertVector(v: TxAdvertVector): Uint8Array {
  return encode(v, writeTxAdvertVector)
}

export function decodeTxAdvertVector(input: Uint8Array | string): TxAdvertVector {
  return decode(input, readTxAdvertVector)
}

export function toJsonTxAdvertVector(v: TxAdvertVector): unknown {
  return v.map((item: any) => toJsonHash(item))
}

export function fromJsonTxAdvertVector(json: unknown): TxAdvertVector {
  return ((json) as unknown[]).map((item: unknown) => fromJsonHash(item))
}

export interface FloodAdvert {
  readonly txHashes: TxAdvertVector
}

export function readFloodAdvert(r: XdrReader): FloodAdvert {
  beginComposite(r)
  try {
    const txHashes = readTxAdvertVector(r)
    return { txHashes }
  } finally {
    endComposite(r)
  }
}

export function writeFloodAdvert(w: XdrWriter, v: FloodAdvert): void {
  writeTxAdvertVector(w, v.txHashes)
}

export function encodeFloodAdvert(v: FloodAdvert): Uint8Array {
  return encode(v, writeFloodAdvert)
}

export function decodeFloodAdvert(input: Uint8Array | string): FloodAdvert {
  return decode(input, readFloodAdvert)
}

export function toJsonFloodAdvert(v: FloodAdvert): Record<string, unknown> {
  return {
    'tx_hashes': toJsonTxAdvertVector(v.txHashes),
  }
}

export function fromJsonFloodAdvert(json: unknown): FloodAdvert {
  const o = json as Record<string, unknown>
  return {
    txHashes: fromJsonTxAdvertVector(o['tx_hashes']),
  }
}

export const TX_DEMAND_VECTOR_MAX_SIZE = 1000


export type TxDemandVector = Hash[]

export function readTxDemandVector(r: XdrReader): TxDemandVector {
  return readVarArray(r, TX_DEMAND_VECTOR_MAX_SIZE, readHash)
}

export function writeTxDemandVector(w: XdrWriter, v: TxDemandVector): void {
  writeVarArray(w, v, TX_DEMAND_VECTOR_MAX_SIZE, writeHash)
}

export function encodeTxDemandVector(v: TxDemandVector): Uint8Array {
  return encode(v, writeTxDemandVector)
}

export function decodeTxDemandVector(input: Uint8Array | string): TxDemandVector {
  return decode(input, readTxDemandVector)
}

export function toJsonTxDemandVector(v: TxDemandVector): unknown {
  return v.map((item: any) => toJsonHash(item))
}

export function fromJsonTxDemandVector(json: unknown): TxDemandVector {
  return ((json) as unknown[]).map((item: unknown) => fromJsonHash(item))
}

export interface FloodDemand {
  readonly txHashes: TxDemandVector
}

export function readFloodDemand(r: XdrReader): FloodDemand {
  beginComposite(r)
  try {
    const txHashes = readTxDemandVector(r)
    return { txHashes }
  } finally {
    endComposite(r)
  }
}

export function writeFloodDemand(w: XdrWriter, v: FloodDemand): void {
  writeTxDemandVector(w, v.txHashes)
}

export function encodeFloodDemand(v: FloodDemand): Uint8Array {
  return encode(v, writeFloodDemand)
}

export function decodeFloodDemand(input: Uint8Array | string): FloodDemand {
  return decode(input, readFloodDemand)
}

export function toJsonFloodDemand(v: FloodDemand): Record<string, unknown> {
  return {
    'tx_hashes': toJsonTxDemandVector(v.txHashes),
  }
}

export function fromJsonFloodDemand(json: unknown): FloodDemand {
  const o = json as Record<string, unknown>
  return {
    txHashes: fromJsonTxDemandVector(o['tx_hashes']),
  }
}

export type StellarMessage =
  | { readonly type: 'ERROR_MSG'; readonly error: Error }
  | { readonly type: 'HELLO'; readonly hello: Hello }
  | { readonly type: 'AUTH'; readonly auth: Auth }
  | { readonly type: 'DONT_HAVE'; readonly dontHave: DontHave }
  | { readonly type: 'PEERS'; readonly peers: PeerAddress[] }
  | { readonly type: 'GET_TX_SET'; readonly txSetHash: uint256 }
  | { readonly type: 'TX_SET'; readonly txSet: TransactionSet }
  | { readonly type: 'GENERALIZED_TX_SET'; readonly generalizedTxSet: GeneralizedTransactionSet }
  | { readonly type: 'TRANSACTION'; readonly transaction: TransactionEnvelope }
  | { readonly type: 'TIME_SLICED_SURVEY_REQUEST'; readonly signedTimeSlicedSurveyRequestMessage: SignedTimeSlicedSurveyRequestMessage }
  | { readonly type: 'TIME_SLICED_SURVEY_RESPONSE'; readonly signedTimeSlicedSurveyResponseMessage: SignedTimeSlicedSurveyResponseMessage }
  | { readonly type: 'TIME_SLICED_SURVEY_START_COLLECTING'; readonly signedTimeSlicedSurveyStartCollectingMessage: SignedTimeSlicedSurveyStartCollectingMessage }
  | { readonly type: 'TIME_SLICED_SURVEY_STOP_COLLECTING'; readonly signedTimeSlicedSurveyStopCollectingMessage: SignedTimeSlicedSurveyStopCollectingMessage }
  | { readonly type: 'GET_SCP_QUORUMSET'; readonly qSetHash: uint256 }
  | { readonly type: 'SCP_QUORUMSET'; readonly qSet: SCPQuorumSet }
  | { readonly type: 'SCP_MESSAGE'; readonly envelope: SCPEnvelope }
  | { readonly type: 'GET_SCP_STATE'; readonly getSCPLedgerSeq: uint32 }
  | { readonly type: 'SEND_MORE'; readonly sendMoreMessage: SendMore }
  | { readonly type: 'SEND_MORE_EXTENDED'; readonly sendMoreExtendedMessage: SendMoreExtended }
  | { readonly type: 'FLOOD_ADVERT'; readonly floodAdvert: FloodAdvert }
  | { readonly type: 'FLOOD_DEMAND'; readonly floodDemand: FloodDemand }

export function readStellarMessage(r: XdrReader): StellarMessage {
  beginComposite(r)
  try {
    const type = readMessageType(r)
    let result: StellarMessage
    switch (type) {
      case 'ERROR_MSG':
        result = { type, error: readError(r) }; break
      case 'HELLO':
        result = { type, hello: readHello(r) }; break
      case 'AUTH':
        result = { type, auth: readAuth(r) }; break
      case 'DONT_HAVE':
        result = { type, dontHave: readDontHave(r) }; break
      case 'PEERS':
        result = { type, peers: readVarArray(r, 100, readPeerAddress) }; break
      case 'GET_TX_SET':
        result = { type, txSetHash: readuint256(r) }; break
      case 'TX_SET':
        result = { type, txSet: readTransactionSet(r) }; break
      case 'GENERALIZED_TX_SET':
        result = { type, generalizedTxSet: readGeneralizedTransactionSet(r) }; break
      case 'TRANSACTION':
        result = { type, transaction: readTransactionEnvelope(r) }; break
      case 'TIME_SLICED_SURVEY_REQUEST':
        result = { type, signedTimeSlicedSurveyRequestMessage: readSignedTimeSlicedSurveyRequestMessage(r) }; break
      case 'TIME_SLICED_SURVEY_RESPONSE':
        result = { type, signedTimeSlicedSurveyResponseMessage: readSignedTimeSlicedSurveyResponseMessage(r) }; break
      case 'TIME_SLICED_SURVEY_START_COLLECTING':
        result = { type, signedTimeSlicedSurveyStartCollectingMessage: readSignedTimeSlicedSurveyStartCollectingMessage(r) }; break
      case 'TIME_SLICED_SURVEY_STOP_COLLECTING':
        result = { type, signedTimeSlicedSurveyStopCollectingMessage: readSignedTimeSlicedSurveyStopCollectingMessage(r) }; break
      case 'GET_SCP_QUORUMSET':
        result = { type, qSetHash: readuint256(r) }; break
      case 'SCP_QUORUMSET':
        result = { type, qSet: readSCPQuorumSet(r) }; break
      case 'SCP_MESSAGE':
        result = { type, envelope: readSCPEnvelope(r) }; break
      case 'GET_SCP_STATE':
        result = { type, getSCPLedgerSeq: readuint32(r) }; break
      case 'SEND_MORE':
        result = { type, sendMoreMessage: readSendMore(r) }; break
      case 'SEND_MORE_EXTENDED':
        result = { type, sendMoreExtendedMessage: readSendMoreExtended(r) }; break
      case 'FLOOD_ADVERT':
        result = { type, floodAdvert: readFloodAdvert(r) }; break
      case 'FLOOD_DEMAND':
        result = { type, floodDemand: readFloodDemand(r) }; break
      default:
        throw new XdrReadError(`Unknown StellarMessage discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeStellarMessage(w: XdrWriter, v: StellarMessage): void {
  writeMessageType(w, v.type)
  switch (v.type) {
    case 'ERROR_MSG':
      writeError(w, (v as any).error); break
    case 'HELLO':
      writeHello(w, (v as any).hello); break
    case 'AUTH':
      writeAuth(w, (v as any).auth); break
    case 'DONT_HAVE':
      writeDontHave(w, (v as any).dontHave); break
    case 'PEERS':
      writeVarArray(w, (v as any).peers, 100, writePeerAddress); break
    case 'GET_TX_SET':
      writeuint256(w, (v as any).txSetHash); break
    case 'TX_SET':
      writeTransactionSet(w, (v as any).txSet); break
    case 'GENERALIZED_TX_SET':
      writeGeneralizedTransactionSet(w, (v as any).generalizedTxSet); break
    case 'TRANSACTION':
      writeTransactionEnvelope(w, (v as any).transaction); break
    case 'TIME_SLICED_SURVEY_REQUEST':
      writeSignedTimeSlicedSurveyRequestMessage(w, (v as any).signedTimeSlicedSurveyRequestMessage); break
    case 'TIME_SLICED_SURVEY_RESPONSE':
      writeSignedTimeSlicedSurveyResponseMessage(w, (v as any).signedTimeSlicedSurveyResponseMessage); break
    case 'TIME_SLICED_SURVEY_START_COLLECTING':
      writeSignedTimeSlicedSurveyStartCollectingMessage(w, (v as any).signedTimeSlicedSurveyStartCollectingMessage); break
    case 'TIME_SLICED_SURVEY_STOP_COLLECTING':
      writeSignedTimeSlicedSurveyStopCollectingMessage(w, (v as any).signedTimeSlicedSurveyStopCollectingMessage); break
    case 'GET_SCP_QUORUMSET':
      writeuint256(w, (v as any).qSetHash); break
    case 'SCP_QUORUMSET':
      writeSCPQuorumSet(w, (v as any).qSet); break
    case 'SCP_MESSAGE':
      writeSCPEnvelope(w, (v as any).envelope); break
    case 'GET_SCP_STATE':
      writeuint32(w, (v as any).getSCPLedgerSeq); break
    case 'SEND_MORE':
      writeSendMore(w, (v as any).sendMoreMessage); break
    case 'SEND_MORE_EXTENDED':
      writeSendMoreExtended(w, (v as any).sendMoreExtendedMessage); break
    case 'FLOOD_ADVERT':
      writeFloodAdvert(w, (v as any).floodAdvert); break
    case 'FLOOD_DEMAND':
      writeFloodDemand(w, (v as any).floodDemand); break
  }
}

export function encodeStellarMessage(v: StellarMessage): Uint8Array {
  return encode(v, writeStellarMessage)
}

export function decodeStellarMessage(input: Uint8Array | string): StellarMessage {
  return decode(input, readStellarMessage)
}

export function toJsonStellarMessage(v: StellarMessage): unknown {
  switch (v.type) {
    case 'ERROR_MSG':
      return { 'error_msg': toJsonError((v as any).error) }
    case 'HELLO':
      return { 'hello': toJsonHello((v as any).hello) }
    case 'AUTH':
      return { 'auth': toJsonAuth((v as any).auth) }
    case 'DONT_HAVE':
      return { 'dont_have': toJsonDontHave((v as any).dontHave) }
    case 'PEERS':
      return { 'peers': (v as any).peers.map((item: any) => toJsonPeerAddress(item)) }
    case 'GET_TX_SET':
      return { 'get_tx_set': toJsonuint256((v as any).txSetHash) }
    case 'TX_SET':
      return { 'tx_set': toJsonTransactionSet((v as any).txSet) }
    case 'GENERALIZED_TX_SET':
      return { 'generalized_tx_set': toJsonGeneralizedTransactionSet((v as any).generalizedTxSet) }
    case 'TRANSACTION':
      return { 'transaction': toJsonTransactionEnvelope((v as any).transaction) }
    case 'TIME_SLICED_SURVEY_REQUEST':
      return { 'time_sliced_survey_request': toJsonSignedTimeSlicedSurveyRequestMessage((v as any).signedTimeSlicedSurveyRequestMessage) }
    case 'TIME_SLICED_SURVEY_RESPONSE':
      return { 'time_sliced_survey_response': toJsonSignedTimeSlicedSurveyResponseMessage((v as any).signedTimeSlicedSurveyResponseMessage) }
    case 'TIME_SLICED_SURVEY_START_COLLECTING':
      return { 'time_sliced_survey_start_collecting': toJsonSignedTimeSlicedSurveyStartCollectingMessage((v as any).signedTimeSlicedSurveyStartCollectingMessage) }
    case 'TIME_SLICED_SURVEY_STOP_COLLECTING':
      return { 'time_sliced_survey_stop_collecting': toJsonSignedTimeSlicedSurveyStopCollectingMessage((v as any).signedTimeSlicedSurveyStopCollectingMessage) }
    case 'GET_SCP_QUORUMSET':
      return { 'get_scp_quorumset': toJsonuint256((v as any).qSetHash) }
    case 'SCP_QUORUMSET':
      return { 'scp_quorumset': toJsonSCPQuorumSet((v as any).qSet) }
    case 'SCP_MESSAGE':
      return { 'scp_message': toJsonSCPEnvelope((v as any).envelope) }
    case 'GET_SCP_STATE':
      return { 'get_scp_state': toJsonuint32((v as any).getSCPLedgerSeq) }
    case 'SEND_MORE':
      return { 'send_more': toJsonSendMore((v as any).sendMoreMessage) }
    case 'SEND_MORE_EXTENDED':
      return { 'send_more_extended': toJsonSendMoreExtended((v as any).sendMoreExtendedMessage) }
    case 'FLOOD_ADVERT':
      return { 'flood_advert': toJsonFloodAdvert((v as any).floodAdvert) }
    case 'FLOOD_DEMAND':
      return { 'flood_demand': toJsonFloodDemand((v as any).floodDemand) }
  }
}

export function fromJsonStellarMessage(json: unknown): StellarMessage {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for StellarMessage: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'error_msg':
      return { type: 'ERROR_MSG', error: fromJsonError(obj[key]) } as StellarMessage
    case 'hello':
      return { type: 'HELLO', hello: fromJsonHello(obj[key]) } as StellarMessage
    case 'auth':
      return { type: 'AUTH', auth: fromJsonAuth(obj[key]) } as StellarMessage
    case 'dont_have':
      return { type: 'DONT_HAVE', dontHave: fromJsonDontHave(obj[key]) } as StellarMessage
    case 'peers':
      return { type: 'PEERS', peers: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonPeerAddress(item)) } as StellarMessage
    case 'get_tx_set':
      return { type: 'GET_TX_SET', txSetHash: fromJsonuint256(obj[key]) } as StellarMessage
    case 'tx_set':
      return { type: 'TX_SET', txSet: fromJsonTransactionSet(obj[key]) } as StellarMessage
    case 'generalized_tx_set':
      return { type: 'GENERALIZED_TX_SET', generalizedTxSet: fromJsonGeneralizedTransactionSet(obj[key]) } as StellarMessage
    case 'transaction':
      return { type: 'TRANSACTION', transaction: fromJsonTransactionEnvelope(obj[key]) } as StellarMessage
    case 'time_sliced_survey_request':
      return { type: 'TIME_SLICED_SURVEY_REQUEST', signedTimeSlicedSurveyRequestMessage: fromJsonSignedTimeSlicedSurveyRequestMessage(obj[key]) } as StellarMessage
    case 'time_sliced_survey_response':
      return { type: 'TIME_SLICED_SURVEY_RESPONSE', signedTimeSlicedSurveyResponseMessage: fromJsonSignedTimeSlicedSurveyResponseMessage(obj[key]) } as StellarMessage
    case 'time_sliced_survey_start_collecting':
      return { type: 'TIME_SLICED_SURVEY_START_COLLECTING', signedTimeSlicedSurveyStartCollectingMessage: fromJsonSignedTimeSlicedSurveyStartCollectingMessage(obj[key]) } as StellarMessage
    case 'time_sliced_survey_stop_collecting':
      return { type: 'TIME_SLICED_SURVEY_STOP_COLLECTING', signedTimeSlicedSurveyStopCollectingMessage: fromJsonSignedTimeSlicedSurveyStopCollectingMessage(obj[key]) } as StellarMessage
    case 'get_scp_quorumset':
      return { type: 'GET_SCP_QUORUMSET', qSetHash: fromJsonuint256(obj[key]) } as StellarMessage
    case 'scp_quorumset':
      return { type: 'SCP_QUORUMSET', qSet: fromJsonSCPQuorumSet(obj[key]) } as StellarMessage
    case 'scp_message':
      return { type: 'SCP_MESSAGE', envelope: fromJsonSCPEnvelope(obj[key]) } as StellarMessage
    case 'get_scp_state':
      return { type: 'GET_SCP_STATE', getSCPLedgerSeq: fromJsonuint32(obj[key]) } as StellarMessage
    case 'send_more':
      return { type: 'SEND_MORE', sendMoreMessage: fromJsonSendMore(obj[key]) } as StellarMessage
    case 'send_more_extended':
      return { type: 'SEND_MORE_EXTENDED', sendMoreExtendedMessage: fromJsonSendMoreExtended(obj[key]) } as StellarMessage
    case 'flood_advert':
      return { type: 'FLOOD_ADVERT', floodAdvert: fromJsonFloodAdvert(obj[key]) } as StellarMessage
    case 'flood_demand':
      return { type: 'FLOOD_DEMAND', floodDemand: fromJsonFloodDemand(obj[key]) } as StellarMessage
    default: throw new Error(`Unknown StellarMessage variant: ${key}`)
  }
}

export interface AuthenticatedMessage_v0 {
  readonly sequence: uint64
  readonly message: StellarMessage
  readonly mac: HmacSha256Mac
}

export function readAuthenticatedMessage_v0(r: XdrReader): AuthenticatedMessage_v0 {
  beginComposite(r)
  try {
    const sequence = readuint64(r)
    const message = readStellarMessage(r)
    const mac = readHmacSha256Mac(r)
    return { sequence, message, mac }
  } finally {
    endComposite(r)
  }
}

export function writeAuthenticatedMessage_v0(w: XdrWriter, v: AuthenticatedMessage_v0): void {
  writeuint64(w, v.sequence)
  writeStellarMessage(w, v.message)
  writeHmacSha256Mac(w, v.mac)
}

export function encodeAuthenticatedMessage_v0(v: AuthenticatedMessage_v0): Uint8Array {
  return encode(v, writeAuthenticatedMessage_v0)
}

export function decodeAuthenticatedMessage_v0(input: Uint8Array | string): AuthenticatedMessage_v0 {
  return decode(input, readAuthenticatedMessage_v0)
}

export function toJsonAuthenticatedMessage_v0(v: AuthenticatedMessage_v0): Record<string, unknown> {
  return {
    'sequence': toJsonuint64(v.sequence),
    'message': toJsonStellarMessage(v.message),
    'mac': toJsonHmacSha256Mac(v.mac),
  }
}

export function fromJsonAuthenticatedMessage_v0(json: unknown): AuthenticatedMessage_v0 {
  const o = json as Record<string, unknown>
  return {
    sequence: fromJsonuint64(o['sequence']),
    message: fromJsonStellarMessage(o['message']),
    mac: fromJsonHmacSha256Mac(o['mac']),
  }
}

export type AuthenticatedMessage =
  | { readonly v: 0; readonly v0: AuthenticatedMessage_v0 }

export function readAuthenticatedMessage(r: XdrReader): AuthenticatedMessage {
  beginComposite(r)
  try {
    const v = readuint32(r)
    let result: AuthenticatedMessage
    switch (v) {
      case 0:
        result = { v, v0: readAuthenticatedMessage_v0(r) }; break
      default:
        throw new XdrReadError(`Unknown AuthenticatedMessage discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeAuthenticatedMessage(w: XdrWriter, v: AuthenticatedMessage): void {
  writeuint32(w, v.v)
  switch (v.v) {
    case 0:
      writeAuthenticatedMessage_v0(w, (v as any).v0); break
  }
}

export function encodeAuthenticatedMessage(v: AuthenticatedMessage): Uint8Array {
  return encode(v, writeAuthenticatedMessage)
}

export function decodeAuthenticatedMessage(input: Uint8Array | string): AuthenticatedMessage {
  return decode(input, readAuthenticatedMessage)
}

export function toJsonAuthenticatedMessage(v: AuthenticatedMessage): unknown {
  switch (v.v) {
    case 0:
      return { 'v0': toJsonAuthenticatedMessage_v0((v as any).v0) }
  }
}

export function fromJsonAuthenticatedMessage(json: unknown): AuthenticatedMessage {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for AuthenticatedMessage: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v0':
      return { v: 0, v0: fromJsonAuthenticatedMessage_v0(obj[key]) } as AuthenticatedMessage
    default: throw new Error(`Unknown AuthenticatedMessage variant: ${key}`)
  }
}
