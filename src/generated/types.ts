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


export type Hash = Uint8Array

export function readHash(r: XdrReader): Hash {
  return readFixedOpaque(r, 32)
}

export function writeHash(w: XdrWriter, v: Hash): void {
  writeFixedOpaque(w, v, 32)
}

export function encodeHash(v: Hash): Uint8Array {
  return encode(v, writeHash)
}

export function decodeHash(input: Uint8Array | string): Hash {
  return decode(input, readHash)
}

export function toJsonHash(v: Hash): unknown {
  return bytesToHex(v)
}

export function fromJsonHash(json: unknown): Hash {
  return hexToBytes((json) as string)
}

export type uint256 = Uint8Array

export function readuint256(r: XdrReader): uint256 {
  return readFixedOpaque(r, 32)
}

export function writeuint256(w: XdrWriter, v: uint256): void {
  writeFixedOpaque(w, v, 32)
}

export function encodeuint256(v: uint256): Uint8Array {
  return encode(v, writeuint256)
}

export function decodeuint256(input: Uint8Array | string): uint256 {
  return decode(input, readuint256)
}

export function toJsonuint256(v: uint256): unknown {
  return bytesToHex(v)
}

export function fromJsonuint256(json: unknown): uint256 {
  return hexToBytes((json) as string)
}

export type uint32 = number

export function readuint32(r: XdrReader): uint32 {
  return readUint32(r)
}

export function writeuint32(w: XdrWriter, v: uint32): void {
  writeUint32(w, v)
}

export function encodeuint32(v: uint32): Uint8Array {
  return encode(v, writeuint32)
}

export function decodeuint32(input: Uint8Array | string): uint32 {
  return decode(input, readuint32)
}

export function toJsonuint32(v: uint32): unknown {
  return v
}

export function fromJsonuint32(json: unknown): uint32 {
  return (json) as number
}

export type int32 = number

export function readint32(r: XdrReader): int32 {
  return readInt32(r)
}

export function writeint32(w: XdrWriter, v: int32): void {
  writeInt32(w, v)
}

export function encodeint32(v: int32): Uint8Array {
  return encode(v, writeint32)
}

export function decodeint32(input: Uint8Array | string): int32 {
  return decode(input, readint32)
}

export function toJsonint32(v: int32): unknown {
  return v
}

export function fromJsonint32(json: unknown): int32 {
  return (json) as number
}

export type uint64 = bigint

export function readuint64(r: XdrReader): uint64 {
  return readUint64(r)
}

export function writeuint64(w: XdrWriter, v: uint64): void {
  writeUint64(w, v)
}

export function encodeuint64(v: uint64): Uint8Array {
  return encode(v, writeuint64)
}

export function decodeuint64(input: Uint8Array | string): uint64 {
  return decode(input, readuint64)
}

export function toJsonuint64(v: uint64): unknown {
  return String(v)
}

export function fromJsonuint64(json: unknown): uint64 {
  return BigInt((json) as string | number)
}

export type int64 = bigint

export function readint64(r: XdrReader): int64 {
  return readInt64(r)
}

export function writeint64(w: XdrWriter, v: int64): void {
  writeInt64(w, v)
}

export function encodeint64(v: int64): Uint8Array {
  return encode(v, writeint64)
}

export function decodeint64(input: Uint8Array | string): int64 {
  return decode(input, readint64)
}

export function toJsonint64(v: int64): unknown {
  return String(v)
}

export function fromJsonint64(json: unknown): int64 {
  return BigInt((json) as string | number)
}

export type TimePoint = uint64

export function readTimePoint(r: XdrReader): TimePoint {
  return readuint64(r)
}

export function writeTimePoint(w: XdrWriter, v: TimePoint): void {
  writeuint64(w, v)
}

export function encodeTimePoint(v: TimePoint): Uint8Array {
  return encode(v, writeTimePoint)
}

export function decodeTimePoint(input: Uint8Array | string): TimePoint {
  return decode(input, readTimePoint)
}

export function toJsonTimePoint(v: TimePoint): unknown {
  return toJsonuint64(v)
}

export function fromJsonTimePoint(json: unknown): TimePoint {
  return fromJsonuint64(json)
}

export type Duration = uint64

export function readDuration(r: XdrReader): Duration {
  return readuint64(r)
}

export function writeDuration(w: XdrWriter, v: Duration): void {
  writeuint64(w, v)
}

export function encodeDuration(v: Duration): Uint8Array {
  return encode(v, writeDuration)
}

export function decodeDuration(input: Uint8Array | string): Duration {
  return decode(input, readDuration)
}

export function toJsonDuration(v: Duration): unknown {
  return toJsonuint64(v)
}

export function fromJsonDuration(json: unknown): Duration {
  return fromJsonuint64(json)
}

/**
 * An ExtensionPoint is always marshaled as a 32-bit 0 value.  At a
 * later point, it can be replaced by a different union so as to
 * extend a structure.
 */
export type ExtensionPoint =
  | { readonly v: 0 }

export function readExtensionPoint(r: XdrReader): ExtensionPoint {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: ExtensionPoint
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown ExtensionPoint discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeExtensionPoint(w: XdrWriter, v: ExtensionPoint): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeExtensionPoint(v: ExtensionPoint): Uint8Array {
  return encode(v, writeExtensionPoint)
}

export function decodeExtensionPoint(input: Uint8Array | string): ExtensionPoint {
  return decode(input, readExtensionPoint)
}

export function toJsonExtensionPoint(v: ExtensionPoint): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonExtensionPoint(json: unknown): ExtensionPoint {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as ExtensionPoint
    throw new Error(`Unknown ExtensionPoint variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown ExtensionPoint variant: ${key}`)
  }
}

export type CryptoKeyType =
  | 'KEY_TYPE_ED25519'
  | 'KEY_TYPE_PRE_AUTH_TX'
  | 'KEY_TYPE_HASH_X'
  | 'KEY_TYPE_ED25519_SIGNED_PAYLOAD'
  | 'KEY_TYPE_MUXED_ED25519'

export const CRYPTO_KEY_TYPE_TO_INT: Record<CryptoKeyType, number> = /*#__PURE__*/ {
  KEY_TYPE_ED25519: 0,
  KEY_TYPE_PRE_AUTH_TX: 1,
  KEY_TYPE_HASH_X: 2,
  KEY_TYPE_ED25519_SIGNED_PAYLOAD: 3,
  KEY_TYPE_MUXED_ED25519: 256,
}

export const CRYPTO_KEY_TYPE_FROM_INT: Record<number, CryptoKeyType> = /*#__PURE__*/ {
  0: 'KEY_TYPE_ED25519',
  1: 'KEY_TYPE_PRE_AUTH_TX',
  2: 'KEY_TYPE_HASH_X',
  3: 'KEY_TYPE_ED25519_SIGNED_PAYLOAD',
  256: 'KEY_TYPE_MUXED_ED25519',
}

export function readCryptoKeyType(r: XdrReader): CryptoKeyType {
  const v = readInt32(r)
  const result = CRYPTO_KEY_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown CryptoKeyType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeCryptoKeyType(w: XdrWriter, v: CryptoKeyType): void {
  writeInt32(w, CRYPTO_KEY_TYPE_TO_INT[v])
}

export function encodeCryptoKeyType(v: CryptoKeyType): Uint8Array {
  return encode(v, writeCryptoKeyType)
}

export function decodeCryptoKeyType(input: Uint8Array | string): CryptoKeyType {
  return decode(input, readCryptoKeyType)
}

const _CRYPTO_KEY_TYPE_TO_JSON: Record<CryptoKeyType, string> = /*#__PURE__*/ {
  KEY_TYPE_ED25519: 'ed25519',
  KEY_TYPE_PRE_AUTH_TX: 'pre_auth_tx',
  KEY_TYPE_HASH_X: 'hash_x',
  KEY_TYPE_ED25519_SIGNED_PAYLOAD: 'ed25519_signed_payload',
  KEY_TYPE_MUXED_ED25519: 'muxed_ed25519',
}

const _CRYPTO_KEY_TYPE_FROM_JSON: Record<string, CryptoKeyType> = /*#__PURE__*/ {
  'ed25519': 'KEY_TYPE_ED25519',
  'pre_auth_tx': 'KEY_TYPE_PRE_AUTH_TX',
  'hash_x': 'KEY_TYPE_HASH_X',
  'ed25519_signed_payload': 'KEY_TYPE_ED25519_SIGNED_PAYLOAD',
  'muxed_ed25519': 'KEY_TYPE_MUXED_ED25519',
}

export function toJsonCryptoKeyType(v: CryptoKeyType): string {
  return _CRYPTO_KEY_TYPE_TO_JSON[v]
}

export function fromJsonCryptoKeyType(json: unknown): CryptoKeyType {
  const result = _CRYPTO_KEY_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown CryptoKeyType JSON value: ${json}`)
  return result
}

export type PublicKeyType =
  | 'PUBLIC_KEY_TYPE_ED25519'

export const PUBLIC_KEY_TYPE_TO_INT: Record<PublicKeyType, number> = /*#__PURE__*/ {
  PUBLIC_KEY_TYPE_ED25519: 0,
}

export const PUBLIC_KEY_TYPE_FROM_INT: Record<number, PublicKeyType> = /*#__PURE__*/ {
  0: 'PUBLIC_KEY_TYPE_ED25519',
}

export function readPublicKeyType(r: XdrReader): PublicKeyType {
  const v = readInt32(r)
  const result = PUBLIC_KEY_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown PublicKeyType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writePublicKeyType(w: XdrWriter, v: PublicKeyType): void {
  writeInt32(w, PUBLIC_KEY_TYPE_TO_INT[v])
}

export function encodePublicKeyType(v: PublicKeyType): Uint8Array {
  return encode(v, writePublicKeyType)
}

export function decodePublicKeyType(input: Uint8Array | string): PublicKeyType {
  return decode(input, readPublicKeyType)
}

const _PUBLIC_KEY_TYPE_TO_JSON: Record<PublicKeyType, string> = /*#__PURE__*/ {
  PUBLIC_KEY_TYPE_ED25519: 'public_key_type_ed25519',
}

const _PUBLIC_KEY_TYPE_FROM_JSON: Record<string, PublicKeyType> = /*#__PURE__*/ {
  'public_key_type_ed25519': 'PUBLIC_KEY_TYPE_ED25519',
}

export function toJsonPublicKeyType(v: PublicKeyType): string {
  return _PUBLIC_KEY_TYPE_TO_JSON[v]
}

export function fromJsonPublicKeyType(json: unknown): PublicKeyType {
  const result = _PUBLIC_KEY_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown PublicKeyType JSON value: ${json}`)
  return result
}

export type SignerKeyType =
  | 'SIGNER_KEY_TYPE_ED25519'
  | 'SIGNER_KEY_TYPE_PRE_AUTH_TX'
  | 'SIGNER_KEY_TYPE_HASH_X'
  | 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD'

export const SIGNER_KEY_TYPE_TO_INT: Record<SignerKeyType, number> = /*#__PURE__*/ {
  SIGNER_KEY_TYPE_ED25519: 0,
  SIGNER_KEY_TYPE_PRE_AUTH_TX: 1,
  SIGNER_KEY_TYPE_HASH_X: 2,
  SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD: 3,
}

export const SIGNER_KEY_TYPE_FROM_INT: Record<number, SignerKeyType> = /*#__PURE__*/ {
  0: 'SIGNER_KEY_TYPE_ED25519',
  1: 'SIGNER_KEY_TYPE_PRE_AUTH_TX',
  2: 'SIGNER_KEY_TYPE_HASH_X',
  3: 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD',
}

export function readSignerKeyType(r: XdrReader): SignerKeyType {
  const v = readInt32(r)
  const result = SIGNER_KEY_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SignerKeyType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSignerKeyType(w: XdrWriter, v: SignerKeyType): void {
  writeInt32(w, SIGNER_KEY_TYPE_TO_INT[v])
}

export function encodeSignerKeyType(v: SignerKeyType): Uint8Array {
  return encode(v, writeSignerKeyType)
}

export function decodeSignerKeyType(input: Uint8Array | string): SignerKeyType {
  return decode(input, readSignerKeyType)
}

const _SIGNER_KEY_TYPE_TO_JSON: Record<SignerKeyType, string> = /*#__PURE__*/ {
  SIGNER_KEY_TYPE_ED25519: 'ed25519',
  SIGNER_KEY_TYPE_PRE_AUTH_TX: 'pre_auth_tx',
  SIGNER_KEY_TYPE_HASH_X: 'hash_x',
  SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD: 'ed25519_signed_payload',
}

const _SIGNER_KEY_TYPE_FROM_JSON: Record<string, SignerKeyType> = /*#__PURE__*/ {
  'ed25519': 'SIGNER_KEY_TYPE_ED25519',
  'pre_auth_tx': 'SIGNER_KEY_TYPE_PRE_AUTH_TX',
  'hash_x': 'SIGNER_KEY_TYPE_HASH_X',
  'ed25519_signed_payload': 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD',
}

export function toJsonSignerKeyType(v: SignerKeyType): string {
  return _SIGNER_KEY_TYPE_TO_JSON[v]
}

export function fromJsonSignerKeyType(json: unknown): SignerKeyType {
  const result = _SIGNER_KEY_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SignerKeyType JSON value: ${json}`)
  return result
}

export type PublicKey =
  | { readonly type: 'PUBLIC_KEY_TYPE_ED25519'; readonly ed25519: uint256 }

export function readPublicKey(r: XdrReader): PublicKey {
  beginComposite(r)
  try {
    const type = readPublicKeyType(r)
    let result: PublicKey
    switch (type) {
      case 'PUBLIC_KEY_TYPE_ED25519':
        result = { type, ed25519: readuint256(r) }; break
      default:
        throw new XdrReadError(`Unknown PublicKey discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writePublicKey(w: XdrWriter, v: PublicKey): void {
  writePublicKeyType(w, v.type)
  switch (v.type) {
    case 'PUBLIC_KEY_TYPE_ED25519':
      writeuint256(w, (v as any).ed25519); break
  }
}

export function encodePublicKey(v: PublicKey): Uint8Array {
  return encode(v, writePublicKey)
}

export function decodePublicKey(input: Uint8Array | string): PublicKey {
  return decode(input, readPublicKey)
}

export function toJsonPublicKey(v: PublicKey): string {
  return encodeEd25519PublicKey((v as any).ed25519)
}

export function fromJsonPublicKey(json: unknown): PublicKey {
  if (typeof json === 'string') {
    return { type: 'PUBLIC_KEY_TYPE_ED25519', ed25519: decodeEd25519PublicKey(json) }
  }
  throw new Error('Invalid PublicKey JSON')
}

export interface SignerKey_ed25519SignedPayload {
  readonly ed25519: uint256
  readonly payload: Uint8Array
}

export function readSignerKey_ed25519SignedPayload(r: XdrReader): SignerKey_ed25519SignedPayload {
  beginComposite(r)
  try {
    const ed25519 = readuint256(r)
    const payload = readVarOpaque(r, 64)
    return { ed25519, payload }
  } finally {
    endComposite(r)
  }
}

export function writeSignerKey_ed25519SignedPayload(w: XdrWriter, v: SignerKey_ed25519SignedPayload): void {
  writeuint256(w, v.ed25519)
  writeVarOpaque(w, v.payload, 64)
}

export function encodeSignerKey_ed25519SignedPayload(v: SignerKey_ed25519SignedPayload): Uint8Array {
  return encode(v, writeSignerKey_ed25519SignedPayload)
}

export function decodeSignerKey_ed25519SignedPayload(input: Uint8Array | string): SignerKey_ed25519SignedPayload {
  return decode(input, readSignerKey_ed25519SignedPayload)
}

export function toJsonSignerKey_ed25519SignedPayload(v: SignerKey_ed25519SignedPayload): string {
  return encodeSignedPayload(v.ed25519, v.payload)
}

export function fromJsonSignerKey_ed25519SignedPayload(json: unknown): SignerKey_ed25519SignedPayload {
  const { ed25519, payload } = decodeSignedPayload(json as string)
  return { ed25519, payload }
}

export type SignerKey =
  | { readonly type: 'SIGNER_KEY_TYPE_ED25519'; readonly ed25519: uint256 }
  | { readonly type: 'SIGNER_KEY_TYPE_PRE_AUTH_TX'; readonly preAuthTx: uint256 }
  | { readonly type: 'SIGNER_KEY_TYPE_HASH_X'; readonly hashX: uint256 }
  | { readonly type: 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD'; readonly ed25519SignedPayload: SignerKey_ed25519SignedPayload }

export function readSignerKey(r: XdrReader): SignerKey {
  beginComposite(r)
  try {
    const type = readSignerKeyType(r)
    let result: SignerKey
    switch (type) {
      case 'SIGNER_KEY_TYPE_ED25519':
        result = { type, ed25519: readuint256(r) }; break
      case 'SIGNER_KEY_TYPE_PRE_AUTH_TX':
        result = { type, preAuthTx: readuint256(r) }; break
      case 'SIGNER_KEY_TYPE_HASH_X':
        result = { type, hashX: readuint256(r) }; break
      case 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD':
        result = { type, ed25519SignedPayload: readSignerKey_ed25519SignedPayload(r) }; break
      default:
        throw new XdrReadError(`Unknown SignerKey discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSignerKey(w: XdrWriter, v: SignerKey): void {
  writeSignerKeyType(w, v.type)
  switch (v.type) {
    case 'SIGNER_KEY_TYPE_ED25519':
      writeuint256(w, (v as any).ed25519); break
    case 'SIGNER_KEY_TYPE_PRE_AUTH_TX':
      writeuint256(w, (v as any).preAuthTx); break
    case 'SIGNER_KEY_TYPE_HASH_X':
      writeuint256(w, (v as any).hashX); break
    case 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD':
      writeSignerKey_ed25519SignedPayload(w, (v as any).ed25519SignedPayload); break
  }
}

export function encodeSignerKey(v: SignerKey): Uint8Array {
  return encode(v, writeSignerKey)
}

export function decodeSignerKey(input: Uint8Array | string): SignerKey {
  return decode(input, readSignerKey)
}

export function toJsonSignerKey(v: SignerKey): string {
  switch (v.type) {
    case 'SIGNER_KEY_TYPE_ED25519':
      return encodeEd25519PublicKey((v as any).ed25519)
    case 'SIGNER_KEY_TYPE_PRE_AUTH_TX':
      return encodePreAuthTx((v as any).preAuthTx)
    case 'SIGNER_KEY_TYPE_HASH_X':
      return encodeSha256Hash((v as any).hashX)
    case 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD':
      return toJsonSignerKey_ed25519SignedPayload((v as any).ed25519SignedPayload)
  }
}

export function fromJsonSignerKey(json: unknown): SignerKey {
  const s = json as string
  if (s.startsWith('G')) {
    return { type: 'SIGNER_KEY_TYPE_ED25519', ed25519: decodeEd25519PublicKey(s) }
  }
  if (s.startsWith('T')) {
    return { type: 'SIGNER_KEY_TYPE_PRE_AUTH_TX', preAuthTx: decodePreAuthTx(s) }
  }
  if (s.startsWith('X')) {
    return { type: 'SIGNER_KEY_TYPE_HASH_X', hashX: decodeSha256Hash(s) }
  }
  if (s.startsWith('P')) {
    return { type: 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD', ed25519SignedPayload: fromJsonSignerKey_ed25519SignedPayload(s) }
  }
  throw new Error(`Invalid SignerKey JSON: ${s}`)
}

/** variable size as the size depends on the signature scheme used */
export type Signature = Uint8Array

export function readSignature(r: XdrReader): Signature {
  return readVarOpaque(r, 64)
}

export function writeSignature(w: XdrWriter, v: Signature): void {
  writeVarOpaque(w, v, 64)
}

export function encodeSignature(v: Signature): Uint8Array {
  return encode(v, writeSignature)
}

export function decodeSignature(input: Uint8Array | string): Signature {
  return decode(input, readSignature)
}

export function toJsonSignature(v: Signature): unknown {
  return bytesToHex(v)
}

export function fromJsonSignature(json: unknown): Signature {
  return hexToBytes((json) as string)
}

export type SignatureHint = Uint8Array

export function readSignatureHint(r: XdrReader): SignatureHint {
  return readFixedOpaque(r, 4)
}

export function writeSignatureHint(w: XdrWriter, v: SignatureHint): void {
  writeFixedOpaque(w, v, 4)
}

export function encodeSignatureHint(v: SignatureHint): Uint8Array {
  return encode(v, writeSignatureHint)
}

export function decodeSignatureHint(input: Uint8Array | string): SignatureHint {
  return decode(input, readSignatureHint)
}

export function toJsonSignatureHint(v: SignatureHint): unknown {
  return bytesToHex(v)
}

export function fromJsonSignatureHint(json: unknown): SignatureHint {
  return hexToBytes((json) as string)
}

export type NodeID = PublicKey

export function readNodeID(r: XdrReader): NodeID {
  return readPublicKey(r)
}

export function writeNodeID(w: XdrWriter, v: NodeID): void {
  writePublicKey(w, v)
}

export function encodeNodeID(v: NodeID): Uint8Array {
  return encode(v, writeNodeID)
}

export function decodeNodeID(input: Uint8Array | string): NodeID {
  return decode(input, readNodeID)
}

export function toJsonNodeID(v: NodeID): unknown {
  return toJsonPublicKey(v)
}

export function fromJsonNodeID(json: unknown): NodeID {
  return fromJsonPublicKey(json)
}

export type AccountID = PublicKey

export function readAccountID(r: XdrReader): AccountID {
  return readPublicKey(r)
}

export function writeAccountID(w: XdrWriter, v: AccountID): void {
  writePublicKey(w, v)
}

export function encodeAccountID(v: AccountID): Uint8Array {
  return encode(v, writeAccountID)
}

export function decodeAccountID(input: Uint8Array | string): AccountID {
  return decode(input, readAccountID)
}

export function toJsonAccountID(v: AccountID): unknown {
  return toJsonPublicKey(v)
}

export function fromJsonAccountID(json: unknown): AccountID {
  return fromJsonPublicKey(json)
}

export type ContractID = Hash

export function readContractID(r: XdrReader): ContractID {
  return readHash(r)
}

export function writeContractID(w: XdrWriter, v: ContractID): void {
  writeHash(w, v)
}

export function encodeContractID(v: ContractID): Uint8Array {
  return encode(v, writeContractID)
}

export function decodeContractID(input: Uint8Array | string): ContractID {
  return decode(input, readContractID)
}

export function toJsonContractID(v: ContractID): string {
  return encodeContract(v)
}

export function fromJsonContractID(json: unknown): ContractID {
  return decodeContract(json as string)
}

export interface Curve25519Secret {
  readonly key: Uint8Array
}

export function readCurve25519Secret(r: XdrReader): Curve25519Secret {
  beginComposite(r)
  try {
    const key = readFixedOpaque(r, 32)
    return { key }
  } finally {
    endComposite(r)
  }
}

export function writeCurve25519Secret(w: XdrWriter, v: Curve25519Secret): void {
  writeFixedOpaque(w, v.key, 32)
}

export function encodeCurve25519Secret(v: Curve25519Secret): Uint8Array {
  return encode(v, writeCurve25519Secret)
}

export function decodeCurve25519Secret(input: Uint8Array | string): Curve25519Secret {
  return decode(input, readCurve25519Secret)
}

export function toJsonCurve25519Secret(v: Curve25519Secret): Record<string, unknown> {
  return {
    'key': bytesToHex(v.key),
  }
}

export function fromJsonCurve25519Secret(json: unknown): Curve25519Secret {
  const o = json as Record<string, unknown>
  return {
    key: hexToBytes((o['key']) as string),
  }
}

export interface Curve25519Public {
  readonly key: Uint8Array
}

export function readCurve25519Public(r: XdrReader): Curve25519Public {
  beginComposite(r)
  try {
    const key = readFixedOpaque(r, 32)
    return { key }
  } finally {
    endComposite(r)
  }
}

export function writeCurve25519Public(w: XdrWriter, v: Curve25519Public): void {
  writeFixedOpaque(w, v.key, 32)
}

export function encodeCurve25519Public(v: Curve25519Public): Uint8Array {
  return encode(v, writeCurve25519Public)
}

export function decodeCurve25519Public(input: Uint8Array | string): Curve25519Public {
  return decode(input, readCurve25519Public)
}

export function toJsonCurve25519Public(v: Curve25519Public): Record<string, unknown> {
  return {
    'key': bytesToHex(v.key),
  }
}

export function fromJsonCurve25519Public(json: unknown): Curve25519Public {
  const o = json as Record<string, unknown>
  return {
    key: hexToBytes((o['key']) as string),
  }
}

export interface HmacSha256Key {
  readonly key: Uint8Array
}

export function readHmacSha256Key(r: XdrReader): HmacSha256Key {
  beginComposite(r)
  try {
    const key = readFixedOpaque(r, 32)
    return { key }
  } finally {
    endComposite(r)
  }
}

export function writeHmacSha256Key(w: XdrWriter, v: HmacSha256Key): void {
  writeFixedOpaque(w, v.key, 32)
}

export function encodeHmacSha256Key(v: HmacSha256Key): Uint8Array {
  return encode(v, writeHmacSha256Key)
}

export function decodeHmacSha256Key(input: Uint8Array | string): HmacSha256Key {
  return decode(input, readHmacSha256Key)
}

export function toJsonHmacSha256Key(v: HmacSha256Key): Record<string, unknown> {
  return {
    'key': bytesToHex(v.key),
  }
}

export function fromJsonHmacSha256Key(json: unknown): HmacSha256Key {
  const o = json as Record<string, unknown>
  return {
    key: hexToBytes((o['key']) as string),
  }
}

export interface HmacSha256Mac {
  readonly mac: Uint8Array
}

export function readHmacSha256Mac(r: XdrReader): HmacSha256Mac {
  beginComposite(r)
  try {
    const mac = readFixedOpaque(r, 32)
    return { mac }
  } finally {
    endComposite(r)
  }
}

export function writeHmacSha256Mac(w: XdrWriter, v: HmacSha256Mac): void {
  writeFixedOpaque(w, v.mac, 32)
}

export function encodeHmacSha256Mac(v: HmacSha256Mac): Uint8Array {
  return encode(v, writeHmacSha256Mac)
}

export function decodeHmacSha256Mac(input: Uint8Array | string): HmacSha256Mac {
  return decode(input, readHmacSha256Mac)
}

export function toJsonHmacSha256Mac(v: HmacSha256Mac): Record<string, unknown> {
  return {
    'mac': bytesToHex(v.mac),
  }
}

export function fromJsonHmacSha256Mac(json: unknown): HmacSha256Mac {
  const o = json as Record<string, unknown>
  return {
    mac: hexToBytes((o['mac']) as string),
  }
}

export interface ShortHashSeed {
  readonly seed: Uint8Array
}

export function readShortHashSeed(r: XdrReader): ShortHashSeed {
  beginComposite(r)
  try {
    const seed = readFixedOpaque(r, 16)
    return { seed }
  } finally {
    endComposite(r)
  }
}

export function writeShortHashSeed(w: XdrWriter, v: ShortHashSeed): void {
  writeFixedOpaque(w, v.seed, 16)
}

export function encodeShortHashSeed(v: ShortHashSeed): Uint8Array {
  return encode(v, writeShortHashSeed)
}

export function decodeShortHashSeed(input: Uint8Array | string): ShortHashSeed {
  return decode(input, readShortHashSeed)
}

export function toJsonShortHashSeed(v: ShortHashSeed): Record<string, unknown> {
  return {
    'seed': bytesToHex(v.seed),
  }
}

export function fromJsonShortHashSeed(json: unknown): ShortHashSeed {
  const o = json as Record<string, unknown>
  return {
    seed: hexToBytes((o['seed']) as string),
  }
}

export type BinaryFuseFilterType =
  | 'BINARY_FUSE_FILTER_8_BIT'
  | 'BINARY_FUSE_FILTER_16_BIT'
  | 'BINARY_FUSE_FILTER_32_BIT'

export const BINARY_FUSE_FILTER_TYPE_TO_INT: Record<BinaryFuseFilterType, number> = /*#__PURE__*/ {
  BINARY_FUSE_FILTER_8_BIT: 0,
  BINARY_FUSE_FILTER_16_BIT: 1,
  BINARY_FUSE_FILTER_32_BIT: 2,
}

export const BINARY_FUSE_FILTER_TYPE_FROM_INT: Record<number, BinaryFuseFilterType> = /*#__PURE__*/ {
  0: 'BINARY_FUSE_FILTER_8_BIT',
  1: 'BINARY_FUSE_FILTER_16_BIT',
  2: 'BINARY_FUSE_FILTER_32_BIT',
}

export function readBinaryFuseFilterType(r: XdrReader): BinaryFuseFilterType {
  const v = readInt32(r)
  const result = BINARY_FUSE_FILTER_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown BinaryFuseFilterType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeBinaryFuseFilterType(w: XdrWriter, v: BinaryFuseFilterType): void {
  writeInt32(w, BINARY_FUSE_FILTER_TYPE_TO_INT[v])
}

export function encodeBinaryFuseFilterType(v: BinaryFuseFilterType): Uint8Array {
  return encode(v, writeBinaryFuseFilterType)
}

export function decodeBinaryFuseFilterType(input: Uint8Array | string): BinaryFuseFilterType {
  return decode(input, readBinaryFuseFilterType)
}

const _BINARY_FUSE_FILTER_TYPE_TO_JSON: Record<BinaryFuseFilterType, string> = /*#__PURE__*/ {
  BINARY_FUSE_FILTER_8_BIT: '8_bit',
  BINARY_FUSE_FILTER_16_BIT: '16_bit',
  BINARY_FUSE_FILTER_32_BIT: '32_bit',
}

const _BINARY_FUSE_FILTER_TYPE_FROM_JSON: Record<string, BinaryFuseFilterType> = /*#__PURE__*/ {
  '8_bit': 'BINARY_FUSE_FILTER_8_BIT',
  '16_bit': 'BINARY_FUSE_FILTER_16_BIT',
  '32_bit': 'BINARY_FUSE_FILTER_32_BIT',
}

export function toJsonBinaryFuseFilterType(v: BinaryFuseFilterType): string {
  return _BINARY_FUSE_FILTER_TYPE_TO_JSON[v]
}

export function fromJsonBinaryFuseFilterType(json: unknown): BinaryFuseFilterType {
  const result = _BINARY_FUSE_FILTER_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown BinaryFuseFilterType JSON value: ${json}`)
  return result
}

export interface SerializedBinaryFuseFilter {
  readonly type: BinaryFuseFilterType
  /** Seed used to hash input to filter */
  readonly inputHashSeed: ShortHashSeed
  /** Seed used for internal filter hash operations */
  readonly filterSeed: ShortHashSeed
  readonly segmentLength: uint32
  readonly segementLengthMask: uint32
  readonly segmentCount: uint32
  readonly segmentCountLength: uint32
  readonly fingerprintLength: uint32
  /** Array of uint8_t, uint16_t, or uint32_t depending on filter type */
  readonly fingerprints: Uint8Array
}

export function readSerializedBinaryFuseFilter(r: XdrReader): SerializedBinaryFuseFilter {
  beginComposite(r)
  try {
    const type_ = readBinaryFuseFilterType(r)
    const inputHashSeed = readShortHashSeed(r)
    const filterSeed = readShortHashSeed(r)
    const segmentLength = readuint32(r)
    const segementLengthMask = readuint32(r)
    const segmentCount = readuint32(r)
    const segmentCountLength = readuint32(r)
    const fingerprintLength = readuint32(r)
    const fingerprints = readVarOpaque(r, UINT32_MAX)
    return { type: type_, inputHashSeed, filterSeed, segmentLength, segementLengthMask, segmentCount, segmentCountLength, fingerprintLength, fingerprints }
  } finally {
    endComposite(r)
  }
}

export function writeSerializedBinaryFuseFilter(w: XdrWriter, v: SerializedBinaryFuseFilter): void {
  writeBinaryFuseFilterType(w, v.type)
  writeShortHashSeed(w, v.inputHashSeed)
  writeShortHashSeed(w, v.filterSeed)
  writeuint32(w, v.segmentLength)
  writeuint32(w, v.segementLengthMask)
  writeuint32(w, v.segmentCount)
  writeuint32(w, v.segmentCountLength)
  writeuint32(w, v.fingerprintLength)
  writeVarOpaque(w, v.fingerprints, UINT32_MAX)
}

export function encodeSerializedBinaryFuseFilter(v: SerializedBinaryFuseFilter): Uint8Array {
  return encode(v, writeSerializedBinaryFuseFilter)
}

export function decodeSerializedBinaryFuseFilter(input: Uint8Array | string): SerializedBinaryFuseFilter {
  return decode(input, readSerializedBinaryFuseFilter)
}

export function toJsonSerializedBinaryFuseFilter(v: SerializedBinaryFuseFilter): Record<string, unknown> {
  return {
    'type': toJsonBinaryFuseFilterType(v.type),
    'input_hash_seed': toJsonShortHashSeed(v.inputHashSeed),
    'filter_seed': toJsonShortHashSeed(v.filterSeed),
    'segment_length': toJsonuint32(v.segmentLength),
    'segement_length_mask': toJsonuint32(v.segementLengthMask),
    'segment_count': toJsonuint32(v.segmentCount),
    'segment_count_length': toJsonuint32(v.segmentCountLength),
    'fingerprint_length': toJsonuint32(v.fingerprintLength),
    'fingerprints': bytesToHex(v.fingerprints),
  }
}

export function fromJsonSerializedBinaryFuseFilter(json: unknown): SerializedBinaryFuseFilter {
  const o = json as Record<string, unknown>
  return {
    type: fromJsonBinaryFuseFilterType(o['type']),
    inputHashSeed: fromJsonShortHashSeed(o['input_hash_seed']),
    filterSeed: fromJsonShortHashSeed(o['filter_seed']),
    segmentLength: fromJsonuint32(o['segment_length']),
    segementLengthMask: fromJsonuint32(o['segement_length_mask']),
    segmentCount: fromJsonuint32(o['segment_count']),
    segmentCountLength: fromJsonuint32(o['segment_count_length']),
    fingerprintLength: fromJsonuint32(o['fingerprint_length']),
    fingerprints: hexToBytes((o['fingerprints']) as string),
  }
}

export type PoolID = Hash

export function readPoolID(r: XdrReader): PoolID {
  return readHash(r)
}

export function writePoolID(w: XdrWriter, v: PoolID): void {
  writeHash(w, v)
}

export function encodePoolID(v: PoolID): Uint8Array {
  return encode(v, writePoolID)
}

export function decodePoolID(input: Uint8Array | string): PoolID {
  return decode(input, readPoolID)
}

export function toJsonPoolID(v: PoolID): string {
  return encodeLiquidityPool(v)
}

export function fromJsonPoolID(json: unknown): PoolID {
  return decodeLiquidityPool(json as string)
}

export type ClaimableBalanceIDType =
  | 'CLAIMABLE_BALANCE_ID_TYPE_V0'

export const CLAIMABLE_BALANCE_I_D_TYPE_TO_INT: Record<ClaimableBalanceIDType, number> = /*#__PURE__*/ {
  CLAIMABLE_BALANCE_ID_TYPE_V0: 0,
}

export const CLAIMABLE_BALANCE_I_D_TYPE_FROM_INT: Record<number, ClaimableBalanceIDType> = /*#__PURE__*/ {
  0: 'CLAIMABLE_BALANCE_ID_TYPE_V0',
}

export function readClaimableBalanceIDType(r: XdrReader): ClaimableBalanceIDType {
  const v = readInt32(r)
  const result = CLAIMABLE_BALANCE_I_D_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ClaimableBalanceIDType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeClaimableBalanceIDType(w: XdrWriter, v: ClaimableBalanceIDType): void {
  writeInt32(w, CLAIMABLE_BALANCE_I_D_TYPE_TO_INT[v])
}

export function encodeClaimableBalanceIDType(v: ClaimableBalanceIDType): Uint8Array {
  return encode(v, writeClaimableBalanceIDType)
}

export function decodeClaimableBalanceIDType(input: Uint8Array | string): ClaimableBalanceIDType {
  return decode(input, readClaimableBalanceIDType)
}

const _CLAIMABLE_BALANCE_I_D_TYPE_TO_JSON: Record<ClaimableBalanceIDType, string> = /*#__PURE__*/ {
  CLAIMABLE_BALANCE_ID_TYPE_V0: 'claimable_balance_id_type_v0',
}

const _CLAIMABLE_BALANCE_I_D_TYPE_FROM_JSON: Record<string, ClaimableBalanceIDType> = /*#__PURE__*/ {
  'claimable_balance_id_type_v0': 'CLAIMABLE_BALANCE_ID_TYPE_V0',
}

export function toJsonClaimableBalanceIDType(v: ClaimableBalanceIDType): string {
  return _CLAIMABLE_BALANCE_I_D_TYPE_TO_JSON[v]
}

export function fromJsonClaimableBalanceIDType(json: unknown): ClaimableBalanceIDType {
  const result = _CLAIMABLE_BALANCE_I_D_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ClaimableBalanceIDType JSON value: ${json}`)
  return result
}

export type ClaimableBalanceID =
  | { readonly type: 'CLAIMABLE_BALANCE_ID_TYPE_V0'; readonly v0: Hash }

export function readClaimableBalanceID(r: XdrReader): ClaimableBalanceID {
  beginComposite(r)
  try {
    const type = readClaimableBalanceIDType(r)
    let result: ClaimableBalanceID
    switch (type) {
      case 'CLAIMABLE_BALANCE_ID_TYPE_V0':
        result = { type, v0: readHash(r) }; break
      default:
        throw new XdrReadError(`Unknown ClaimableBalanceID discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeClaimableBalanceID(w: XdrWriter, v: ClaimableBalanceID): void {
  writeClaimableBalanceIDType(w, v.type)
  switch (v.type) {
    case 'CLAIMABLE_BALANCE_ID_TYPE_V0':
      writeHash(w, (v as any).v0); break
  }
}

export function encodeClaimableBalanceID(v: ClaimableBalanceID): Uint8Array {
  return encode(v, writeClaimableBalanceID)
}

export function decodeClaimableBalanceID(input: Uint8Array | string): ClaimableBalanceID {
  return decode(input, readClaimableBalanceID)
}

export function toJsonClaimableBalanceID(v: ClaimableBalanceID): string {
  switch (v.type) {
    case 'CLAIMABLE_BALANCE_ID_TYPE_V0':
      return encodeClaimableBalance((v as any).v0)
  }
}

export function fromJsonClaimableBalanceID(json: unknown): ClaimableBalanceID {
  const hash = decodeClaimableBalance(json as string)
  return { type: 'CLAIMABLE_BALANCE_ID_TYPE_V0', v0: hash }
}
