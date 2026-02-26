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

import type { ContractExecutable, SCAddress, SCSymbol, SCVal } from './contract.js'
import { readContractExecutable, writeContractExecutable, toJsonContractExecutable, fromJsonContractExecutable, readSCAddress, writeSCAddress, toJsonSCAddress, fromJsonSCAddress, readSCSymbol, writeSCSymbol, toJsonSCSymbol, fromJsonSCSymbol, readSCVal, writeSCVal, toJsonSCVal, fromJsonSCVal } from './contract.js'
import type { AlphaNum12, AlphaNum4, Asset, AssetCode, AssetType, Claimant, DataValue, EnvelopeType, LedgerKey, LiquidityPoolConstantProductParameters, LiquidityPoolType, OfferEntry, Price, SequenceNumber, Signer, string32, string64 } from './ledger-entries.js'
import { readAlphaNum12, writeAlphaNum12, toJsonAlphaNum12, fromJsonAlphaNum12, readAlphaNum4, writeAlphaNum4, toJsonAlphaNum4, fromJsonAlphaNum4, readAsset, writeAsset, toJsonAsset, fromJsonAsset, readAssetCode, writeAssetCode, toJsonAssetCode, fromJsonAssetCode, readAssetType, writeAssetType, toJsonAssetType, fromJsonAssetType, readClaimant, writeClaimant, toJsonClaimant, fromJsonClaimant, readDataValue, writeDataValue, toJsonDataValue, fromJsonDataValue, readEnvelopeType, writeEnvelopeType, toJsonEnvelopeType, fromJsonEnvelopeType, readLedgerKey, writeLedgerKey, toJsonLedgerKey, fromJsonLedgerKey, readLiquidityPoolConstantProductParameters, writeLiquidityPoolConstantProductParameters, toJsonLiquidityPoolConstantProductParameters, fromJsonLiquidityPoolConstantProductParameters, readLiquidityPoolType, writeLiquidityPoolType, toJsonLiquidityPoolType, fromJsonLiquidityPoolType, readOfferEntry, writeOfferEntry, toJsonOfferEntry, fromJsonOfferEntry, readPrice, writePrice, toJsonPrice, fromJsonPrice, readSequenceNumber, writeSequenceNumber, toJsonSequenceNumber, fromJsonSequenceNumber, readSigner, writeSigner, toJsonSigner, fromJsonSigner, readstring32, writestring32, toJsonstring32, fromJsonstring32, readstring64, writestring64, toJsonstring64, fromJsonstring64 } from './ledger-entries.js'
import type { AccountID, ClaimableBalanceID, CryptoKeyType, Duration, ExtensionPoint, Hash, PoolID, Signature, SignatureHint, SignerKey, TimePoint, int64, uint256, uint32, uint64 } from './types.js'
import { readAccountID, writeAccountID, toJsonAccountID, fromJsonAccountID, readClaimableBalanceID, writeClaimableBalanceID, toJsonClaimableBalanceID, fromJsonClaimableBalanceID, readCryptoKeyType, writeCryptoKeyType, toJsonCryptoKeyType, fromJsonCryptoKeyType, readDuration, writeDuration, toJsonDuration, fromJsonDuration, readExtensionPoint, writeExtensionPoint, toJsonExtensionPoint, fromJsonExtensionPoint, readHash, writeHash, toJsonHash, fromJsonHash, readPoolID, writePoolID, toJsonPoolID, fromJsonPoolID, readSignature, writeSignature, toJsonSignature, fromJsonSignature, readSignatureHint, writeSignatureHint, toJsonSignatureHint, fromJsonSignatureHint, readSignerKey, writeSignerKey, toJsonSignerKey, fromJsonSignerKey, readTimePoint, writeTimePoint, toJsonTimePoint, fromJsonTimePoint, readint64, writeint64, toJsonint64, fromJsonint64, readuint256, writeuint256, toJsonuint256, fromJsonuint256, readuint32, writeuint32, toJsonuint32, fromJsonuint32, readuint64, writeuint64, toJsonuint64, fromJsonuint64 } from './types.js'


/** maximum number of operations per transaction */
export const MAX_OPS_PER_TX = 100


export type LiquidityPoolParameters =
  | { readonly type: 'LIQUIDITY_POOL_CONSTANT_PRODUCT'; readonly constantProduct: LiquidityPoolConstantProductParameters }

export function readLiquidityPoolParameters(r: XdrReader): LiquidityPoolParameters {
  beginComposite(r)
  try {
    const type = readLiquidityPoolType(r)
    let result: LiquidityPoolParameters
    switch (type) {
      case 'LIQUIDITY_POOL_CONSTANT_PRODUCT':
        result = { type, constantProduct: readLiquidityPoolConstantProductParameters(r) }; break
      default:
        throw new XdrReadError(`Unknown LiquidityPoolParameters discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLiquidityPoolParameters(w: XdrWriter, v: LiquidityPoolParameters): void {
  writeLiquidityPoolType(w, v.type)
  switch (v.type) {
    case 'LIQUIDITY_POOL_CONSTANT_PRODUCT':
      writeLiquidityPoolConstantProductParameters(w, (v as any).constantProduct); break
  }
}

export function encodeLiquidityPoolParameters(v: LiquidityPoolParameters): Uint8Array {
  return encode(v, writeLiquidityPoolParameters)
}

export function decodeLiquidityPoolParameters(input: Uint8Array | string): LiquidityPoolParameters {
  return decode(input, readLiquidityPoolParameters)
}

export function toJsonLiquidityPoolParameters(v: LiquidityPoolParameters): unknown {
  switch (v.type) {
    case 'LIQUIDITY_POOL_CONSTANT_PRODUCT':
      return { 'liquidity_pool_constant_product': toJsonLiquidityPoolConstantProductParameters((v as any).constantProduct) }
  }
}

export function fromJsonLiquidityPoolParameters(json: unknown): LiquidityPoolParameters {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for LiquidityPoolParameters: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'liquidity_pool_constant_product':
      return { type: 'LIQUIDITY_POOL_CONSTANT_PRODUCT', constantProduct: fromJsonLiquidityPoolConstantProductParameters(obj[key]) } as LiquidityPoolParameters
    default: throw new Error(`Unknown LiquidityPoolParameters variant: ${key}`)
  }
}

export interface MuxedAccount_med25519 {
  readonly id: uint64
  readonly ed25519: uint256
}

export function readMuxedAccount_med25519(r: XdrReader): MuxedAccount_med25519 {
  beginComposite(r)
  try {
    const id = readuint64(r)
    const ed25519 = readuint256(r)
    return { id, ed25519 }
  } finally {
    endComposite(r)
  }
}

export function writeMuxedAccount_med25519(w: XdrWriter, v: MuxedAccount_med25519): void {
  writeuint64(w, v.id)
  writeuint256(w, v.ed25519)
}

export function encodeMuxedAccount_med25519(v: MuxedAccount_med25519): Uint8Array {
  return encode(v, writeMuxedAccount_med25519)
}

export function decodeMuxedAccount_med25519(input: Uint8Array | string): MuxedAccount_med25519 {
  return decode(input, readMuxedAccount_med25519)
}

export function toJsonMuxedAccount_med25519(v: MuxedAccount_med25519): string {
  return encodeMuxedAccountStrKey(v.ed25519, v.id)
}

export function fromJsonMuxedAccount_med25519(json: unknown): MuxedAccount_med25519 {
  const { ed25519, memoId } = decodeMuxedAccountStrKey(json as string)
  return { id: memoId, ed25519 }
}

/** Source or destination of a payment operation */
export type MuxedAccount =
  | { readonly type: 'KEY_TYPE_ED25519'; readonly ed25519: uint256 }
  | { readonly type: 'KEY_TYPE_MUXED_ED25519'; readonly med25519: MuxedAccount_med25519 }

export function readMuxedAccount(r: XdrReader): MuxedAccount {
  beginComposite(r)
  try {
    const type = readCryptoKeyType(r)
    let result: MuxedAccount
    switch (type) {
      case 'KEY_TYPE_ED25519':
        result = { type, ed25519: readuint256(r) }; break
      case 'KEY_TYPE_MUXED_ED25519':
        result = { type, med25519: readMuxedAccount_med25519(r) }; break
      default:
        throw new XdrReadError(`Unknown MuxedAccount discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeMuxedAccount(w: XdrWriter, v: MuxedAccount): void {
  writeCryptoKeyType(w, v.type)
  switch (v.type) {
    case 'KEY_TYPE_ED25519':
      writeuint256(w, (v as any).ed25519); break
    case 'KEY_TYPE_MUXED_ED25519':
      writeMuxedAccount_med25519(w, (v as any).med25519); break
  }
}

export function encodeMuxedAccount(v: MuxedAccount): Uint8Array {
  return encode(v, writeMuxedAccount)
}

export function decodeMuxedAccount(input: Uint8Array | string): MuxedAccount {
  return decode(input, readMuxedAccount)
}

export function toJsonMuxedAccount(v: MuxedAccount): string {
  switch (v.type) {
    case 'KEY_TYPE_ED25519':
      return encodeEd25519PublicKey((v as any).ed25519)
    case 'KEY_TYPE_MUXED_ED25519':
      return encodeMuxedAccountStrKey((v as any).med25519.ed25519, (v as any).med25519.id)
  }
}

export function fromJsonMuxedAccount(json: unknown): MuxedAccount {
  const s = json as string
  if (s.startsWith('M')) {
    const { ed25519, memoId } = decodeMuxedAccountStrKey(s)
    return { type: 'KEY_TYPE_MUXED_ED25519', med25519: { id: memoId, ed25519 } }
  }
  return { type: 'KEY_TYPE_ED25519', ed25519: decodeEd25519PublicKey(s) }
}

export interface DecoratedSignature {
  readonly hint: SignatureHint
  /** last 4 bytes of the public key, used as a hint */
  readonly signature: Signature
}

export function readDecoratedSignature(r: XdrReader): DecoratedSignature {
  beginComposite(r)
  try {
    const hint = readSignatureHint(r)
    const signature = readSignature(r)
    return { hint, signature }
  } finally {
    endComposite(r)
  }
}

export function writeDecoratedSignature(w: XdrWriter, v: DecoratedSignature): void {
  writeSignatureHint(w, v.hint)
  writeSignature(w, v.signature)
}

export function encodeDecoratedSignature(v: DecoratedSignature): Uint8Array {
  return encode(v, writeDecoratedSignature)
}

export function decodeDecoratedSignature(input: Uint8Array | string): DecoratedSignature {
  return decode(input, readDecoratedSignature)
}

export function toJsonDecoratedSignature(v: DecoratedSignature): Record<string, unknown> {
  return {
    'hint': toJsonSignatureHint(v.hint),
    'signature': toJsonSignature(v.signature),
  }
}

export function fromJsonDecoratedSignature(json: unknown): DecoratedSignature {
  const o = json as Record<string, unknown>
  return {
    hint: fromJsonSignatureHint(o['hint']),
    signature: fromJsonSignature(o['signature']),
  }
}

export type OperationType =
  | 'CREATE_ACCOUNT'
  | 'PAYMENT'
  | 'PATH_PAYMENT_STRICT_RECEIVE'
  | 'MANAGE_SELL_OFFER'
  | 'CREATE_PASSIVE_SELL_OFFER'
  | 'SET_OPTIONS'
  | 'CHANGE_TRUST'
  | 'ALLOW_TRUST'
  | 'ACCOUNT_MERGE'
  | 'INFLATION'
  | 'MANAGE_DATA'
  | 'BUMP_SEQUENCE'
  | 'MANAGE_BUY_OFFER'
  | 'PATH_PAYMENT_STRICT_SEND'
  | 'CREATE_CLAIMABLE_BALANCE'
  | 'CLAIM_CLAIMABLE_BALANCE'
  | 'BEGIN_SPONSORING_FUTURE_RESERVES'
  | 'END_SPONSORING_FUTURE_RESERVES'
  | 'REVOKE_SPONSORSHIP'
  | 'CLAWBACK'
  | 'CLAWBACK_CLAIMABLE_BALANCE'
  | 'SET_TRUST_LINE_FLAGS'
  | 'LIQUIDITY_POOL_DEPOSIT'
  | 'LIQUIDITY_POOL_WITHDRAW'
  | 'INVOKE_HOST_FUNCTION'
  | 'EXTEND_FOOTPRINT_TTL'
  | 'RESTORE_FOOTPRINT'

export const OPERATION_TYPE_TO_INT: Record<OperationType, number> = /*#__PURE__*/ {
  CREATE_ACCOUNT: 0,
  PAYMENT: 1,
  PATH_PAYMENT_STRICT_RECEIVE: 2,
  MANAGE_SELL_OFFER: 3,
  CREATE_PASSIVE_SELL_OFFER: 4,
  SET_OPTIONS: 5,
  CHANGE_TRUST: 6,
  ALLOW_TRUST: 7,
  ACCOUNT_MERGE: 8,
  INFLATION: 9,
  MANAGE_DATA: 10,
  BUMP_SEQUENCE: 11,
  MANAGE_BUY_OFFER: 12,
  PATH_PAYMENT_STRICT_SEND: 13,
  CREATE_CLAIMABLE_BALANCE: 14,
  CLAIM_CLAIMABLE_BALANCE: 15,
  BEGIN_SPONSORING_FUTURE_RESERVES: 16,
  END_SPONSORING_FUTURE_RESERVES: 17,
  REVOKE_SPONSORSHIP: 18,
  CLAWBACK: 19,
  CLAWBACK_CLAIMABLE_BALANCE: 20,
  SET_TRUST_LINE_FLAGS: 21,
  LIQUIDITY_POOL_DEPOSIT: 22,
  LIQUIDITY_POOL_WITHDRAW: 23,
  INVOKE_HOST_FUNCTION: 24,
  EXTEND_FOOTPRINT_TTL: 25,
  RESTORE_FOOTPRINT: 26,
}

export const OPERATION_TYPE_FROM_INT: Record<number, OperationType> = /*#__PURE__*/ {
  0: 'CREATE_ACCOUNT',
  1: 'PAYMENT',
  2: 'PATH_PAYMENT_STRICT_RECEIVE',
  3: 'MANAGE_SELL_OFFER',
  4: 'CREATE_PASSIVE_SELL_OFFER',
  5: 'SET_OPTIONS',
  6: 'CHANGE_TRUST',
  7: 'ALLOW_TRUST',
  8: 'ACCOUNT_MERGE',
  9: 'INFLATION',
  10: 'MANAGE_DATA',
  11: 'BUMP_SEQUENCE',
  12: 'MANAGE_BUY_OFFER',
  13: 'PATH_PAYMENT_STRICT_SEND',
  14: 'CREATE_CLAIMABLE_BALANCE',
  15: 'CLAIM_CLAIMABLE_BALANCE',
  16: 'BEGIN_SPONSORING_FUTURE_RESERVES',
  17: 'END_SPONSORING_FUTURE_RESERVES',
  18: 'REVOKE_SPONSORSHIP',
  19: 'CLAWBACK',
  20: 'CLAWBACK_CLAIMABLE_BALANCE',
  21: 'SET_TRUST_LINE_FLAGS',
  22: 'LIQUIDITY_POOL_DEPOSIT',
  23: 'LIQUIDITY_POOL_WITHDRAW',
  24: 'INVOKE_HOST_FUNCTION',
  25: 'EXTEND_FOOTPRINT_TTL',
  26: 'RESTORE_FOOTPRINT',
}

export function readOperationType(r: XdrReader): OperationType {
  const v = readInt32(r)
  const result = OPERATION_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown OperationType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeOperationType(w: XdrWriter, v: OperationType): void {
  writeInt32(w, OPERATION_TYPE_TO_INT[v])
}

export function encodeOperationType(v: OperationType): Uint8Array {
  return encode(v, writeOperationType)
}

export function decodeOperationType(input: Uint8Array | string): OperationType {
  return decode(input, readOperationType)
}

const _OPERATION_TYPE_TO_JSON: Record<OperationType, string> = /*#__PURE__*/ {
  CREATE_ACCOUNT: 'create_account',
  PAYMENT: 'payment',
  PATH_PAYMENT_STRICT_RECEIVE: 'path_payment_strict_receive',
  MANAGE_SELL_OFFER: 'manage_sell_offer',
  CREATE_PASSIVE_SELL_OFFER: 'create_passive_sell_offer',
  SET_OPTIONS: 'set_options',
  CHANGE_TRUST: 'change_trust',
  ALLOW_TRUST: 'allow_trust',
  ACCOUNT_MERGE: 'account_merge',
  INFLATION: 'inflation',
  MANAGE_DATA: 'manage_data',
  BUMP_SEQUENCE: 'bump_sequence',
  MANAGE_BUY_OFFER: 'manage_buy_offer',
  PATH_PAYMENT_STRICT_SEND: 'path_payment_strict_send',
  CREATE_CLAIMABLE_BALANCE: 'create_claimable_balance',
  CLAIM_CLAIMABLE_BALANCE: 'claim_claimable_balance',
  BEGIN_SPONSORING_FUTURE_RESERVES: 'begin_sponsoring_future_reserves',
  END_SPONSORING_FUTURE_RESERVES: 'end_sponsoring_future_reserves',
  REVOKE_SPONSORSHIP: 'revoke_sponsorship',
  CLAWBACK: 'clawback',
  CLAWBACK_CLAIMABLE_BALANCE: 'clawback_claimable_balance',
  SET_TRUST_LINE_FLAGS: 'set_trust_line_flags',
  LIQUIDITY_POOL_DEPOSIT: 'liquidity_pool_deposit',
  LIQUIDITY_POOL_WITHDRAW: 'liquidity_pool_withdraw',
  INVOKE_HOST_FUNCTION: 'invoke_host_function',
  EXTEND_FOOTPRINT_TTL: 'extend_footprint_ttl',
  RESTORE_FOOTPRINT: 'restore_footprint',
}

const _OPERATION_TYPE_FROM_JSON: Record<string, OperationType> = /*#__PURE__*/ {
  'create_account': 'CREATE_ACCOUNT',
  'payment': 'PAYMENT',
  'path_payment_strict_receive': 'PATH_PAYMENT_STRICT_RECEIVE',
  'manage_sell_offer': 'MANAGE_SELL_OFFER',
  'create_passive_sell_offer': 'CREATE_PASSIVE_SELL_OFFER',
  'set_options': 'SET_OPTIONS',
  'change_trust': 'CHANGE_TRUST',
  'allow_trust': 'ALLOW_TRUST',
  'account_merge': 'ACCOUNT_MERGE',
  'inflation': 'INFLATION',
  'manage_data': 'MANAGE_DATA',
  'bump_sequence': 'BUMP_SEQUENCE',
  'manage_buy_offer': 'MANAGE_BUY_OFFER',
  'path_payment_strict_send': 'PATH_PAYMENT_STRICT_SEND',
  'create_claimable_balance': 'CREATE_CLAIMABLE_BALANCE',
  'claim_claimable_balance': 'CLAIM_CLAIMABLE_BALANCE',
  'begin_sponsoring_future_reserves': 'BEGIN_SPONSORING_FUTURE_RESERVES',
  'end_sponsoring_future_reserves': 'END_SPONSORING_FUTURE_RESERVES',
  'revoke_sponsorship': 'REVOKE_SPONSORSHIP',
  'clawback': 'CLAWBACK',
  'clawback_claimable_balance': 'CLAWBACK_CLAIMABLE_BALANCE',
  'set_trust_line_flags': 'SET_TRUST_LINE_FLAGS',
  'liquidity_pool_deposit': 'LIQUIDITY_POOL_DEPOSIT',
  'liquidity_pool_withdraw': 'LIQUIDITY_POOL_WITHDRAW',
  'invoke_host_function': 'INVOKE_HOST_FUNCTION',
  'extend_footprint_ttl': 'EXTEND_FOOTPRINT_TTL',
  'restore_footprint': 'RESTORE_FOOTPRINT',
}

export function toJsonOperationType(v: OperationType): string {
  return _OPERATION_TYPE_TO_JSON[v]
}

export function fromJsonOperationType(json: unknown): OperationType {
  const result = _OPERATION_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown OperationType JSON value: ${json}`)
  return result
}

/**
 * CreateAccount
 * Creates and funds a new account with the specified starting balance.
 * 
 * Threshold: med
 * 
 * Result: CreateAccountResult
 * 
 */
export interface CreateAccountOp {
  readonly destination: AccountID
  /** account to create */
  readonly startingBalance: int64
}

export function readCreateAccountOp(r: XdrReader): CreateAccountOp {
  beginComposite(r)
  try {
    const destination = readAccountID(r)
    const startingBalance = readint64(r)
    return { destination, startingBalance }
  } finally {
    endComposite(r)
  }
}

export function writeCreateAccountOp(w: XdrWriter, v: CreateAccountOp): void {
  writeAccountID(w, v.destination)
  writeint64(w, v.startingBalance)
}

export function encodeCreateAccountOp(v: CreateAccountOp): Uint8Array {
  return encode(v, writeCreateAccountOp)
}

export function decodeCreateAccountOp(input: Uint8Array | string): CreateAccountOp {
  return decode(input, readCreateAccountOp)
}

export function toJsonCreateAccountOp(v: CreateAccountOp): Record<string, unknown> {
  return {
    'destination': toJsonAccountID(v.destination),
    'starting_balance': toJsonint64(v.startingBalance),
  }
}

export function fromJsonCreateAccountOp(json: unknown): CreateAccountOp {
  const o = json as Record<string, unknown>
  return {
    destination: fromJsonAccountID(o['destination']),
    startingBalance: fromJsonint64(o['starting_balance']),
  }
}

/**
 * Payment
 * 
 * Send an amount in specified asset to a destination account.
 * 
 * Threshold: med
 * 
 * Result: PaymentResult
 */
export interface PaymentOp {
  readonly destination: MuxedAccount
  /** recipient of the payment */
  readonly asset: Asset
  /** what they end up with */
  readonly amount: int64
}

export function readPaymentOp(r: XdrReader): PaymentOp {
  beginComposite(r)
  try {
    const destination = readMuxedAccount(r)
    const asset = readAsset(r)
    const amount = readint64(r)
    return { destination, asset, amount }
  } finally {
    endComposite(r)
  }
}

export function writePaymentOp(w: XdrWriter, v: PaymentOp): void {
  writeMuxedAccount(w, v.destination)
  writeAsset(w, v.asset)
  writeint64(w, v.amount)
}

export function encodePaymentOp(v: PaymentOp): Uint8Array {
  return encode(v, writePaymentOp)
}

export function decodePaymentOp(input: Uint8Array | string): PaymentOp {
  return decode(input, readPaymentOp)
}

export function toJsonPaymentOp(v: PaymentOp): Record<string, unknown> {
  return {
    'destination': toJsonMuxedAccount(v.destination),
    'asset': toJsonAsset(v.asset),
    'amount': toJsonint64(v.amount),
  }
}

export function fromJsonPaymentOp(json: unknown): PaymentOp {
  const o = json as Record<string, unknown>
  return {
    destination: fromJsonMuxedAccount(o['destination']),
    asset: fromJsonAsset(o['asset']),
    amount: fromJsonint64(o['amount']),
  }
}

/**
 * PathPaymentStrictReceive
 * 
 * send an amount to a destination account through a path.
 * (up to sendMax, sendAsset)
 * (X0, Path[0]) .. (Xn, Path[n])
 * (destAmount, destAsset)
 * 
 * Threshold: med
 * 
 * Result: PathPaymentStrictReceiveResult
 */
export interface PathPaymentStrictReceiveOp {
  readonly sendAsset: Asset
  /** asset we pay with */
  readonly sendMax: int64
  readonly destination: MuxedAccount
  /** recipient of the payment */
  readonly destAsset: Asset
  /** what they end up with */
  readonly destAmount: int64
  readonly path: Asset[]
}

export function readPathPaymentStrictReceiveOp(r: XdrReader): PathPaymentStrictReceiveOp {
  beginComposite(r)
  try {
    const sendAsset = readAsset(r)
    const sendMax = readint64(r)
    const destination = readMuxedAccount(r)
    const destAsset = readAsset(r)
    const destAmount = readint64(r)
    const path = readVarArray(r, 5, readAsset)
    return { sendAsset, sendMax, destination, destAsset, destAmount, path }
  } finally {
    endComposite(r)
  }
}

export function writePathPaymentStrictReceiveOp(w: XdrWriter, v: PathPaymentStrictReceiveOp): void {
  writeAsset(w, v.sendAsset)
  writeint64(w, v.sendMax)
  writeMuxedAccount(w, v.destination)
  writeAsset(w, v.destAsset)
  writeint64(w, v.destAmount)
  writeVarArray(w, v.path, 5, writeAsset)
}

export function encodePathPaymentStrictReceiveOp(v: PathPaymentStrictReceiveOp): Uint8Array {
  return encode(v, writePathPaymentStrictReceiveOp)
}

export function decodePathPaymentStrictReceiveOp(input: Uint8Array | string): PathPaymentStrictReceiveOp {
  return decode(input, readPathPaymentStrictReceiveOp)
}

export function toJsonPathPaymentStrictReceiveOp(v: PathPaymentStrictReceiveOp): Record<string, unknown> {
  return {
    'send_asset': toJsonAsset(v.sendAsset),
    'send_max': toJsonint64(v.sendMax),
    'destination': toJsonMuxedAccount(v.destination),
    'dest_asset': toJsonAsset(v.destAsset),
    'dest_amount': toJsonint64(v.destAmount),
    'path': v.path.map((item: any) => toJsonAsset(item)),
  }
}

export function fromJsonPathPaymentStrictReceiveOp(json: unknown): PathPaymentStrictReceiveOp {
  const o = json as Record<string, unknown>
  return {
    sendAsset: fromJsonAsset(o['send_asset']),
    sendMax: fromJsonint64(o['send_max']),
    destination: fromJsonMuxedAccount(o['destination']),
    destAsset: fromJsonAsset(o['dest_asset']),
    destAmount: fromJsonint64(o['dest_amount']),
    path: ((o['path']) as unknown[]).map((item: unknown) => fromJsonAsset(item)),
  }
}

/**
 * PathPaymentStrictSend
 * 
 * send an amount to a destination account through a path.
 * (sendMax, sendAsset)
 * (X0, Path[0]) .. (Xn, Path[n])
 * (at least destAmount, destAsset)
 * 
 * Threshold: med
 * 
 * Result: PathPaymentStrictSendResult
 */
export interface PathPaymentStrictSendOp {
  readonly sendAsset: Asset
  /** asset we pay with */
  readonly sendAmount: int64
  readonly destination: MuxedAccount
  /** recipient of the payment */
  readonly destAsset: Asset
  /** what they end up with */
  readonly destMin: int64
  readonly path: Asset[]
}

export function readPathPaymentStrictSendOp(r: XdrReader): PathPaymentStrictSendOp {
  beginComposite(r)
  try {
    const sendAsset = readAsset(r)
    const sendAmount = readint64(r)
    const destination = readMuxedAccount(r)
    const destAsset = readAsset(r)
    const destMin = readint64(r)
    const path = readVarArray(r, 5, readAsset)
    return { sendAsset, sendAmount, destination, destAsset, destMin, path }
  } finally {
    endComposite(r)
  }
}

export function writePathPaymentStrictSendOp(w: XdrWriter, v: PathPaymentStrictSendOp): void {
  writeAsset(w, v.sendAsset)
  writeint64(w, v.sendAmount)
  writeMuxedAccount(w, v.destination)
  writeAsset(w, v.destAsset)
  writeint64(w, v.destMin)
  writeVarArray(w, v.path, 5, writeAsset)
}

export function encodePathPaymentStrictSendOp(v: PathPaymentStrictSendOp): Uint8Array {
  return encode(v, writePathPaymentStrictSendOp)
}

export function decodePathPaymentStrictSendOp(input: Uint8Array | string): PathPaymentStrictSendOp {
  return decode(input, readPathPaymentStrictSendOp)
}

export function toJsonPathPaymentStrictSendOp(v: PathPaymentStrictSendOp): Record<string, unknown> {
  return {
    'send_asset': toJsonAsset(v.sendAsset),
    'send_amount': toJsonint64(v.sendAmount),
    'destination': toJsonMuxedAccount(v.destination),
    'dest_asset': toJsonAsset(v.destAsset),
    'dest_min': toJsonint64(v.destMin),
    'path': v.path.map((item: any) => toJsonAsset(item)),
  }
}

export function fromJsonPathPaymentStrictSendOp(json: unknown): PathPaymentStrictSendOp {
  const o = json as Record<string, unknown>
  return {
    sendAsset: fromJsonAsset(o['send_asset']),
    sendAmount: fromJsonint64(o['send_amount']),
    destination: fromJsonMuxedAccount(o['destination']),
    destAsset: fromJsonAsset(o['dest_asset']),
    destMin: fromJsonint64(o['dest_min']),
    path: ((o['path']) as unknown[]).map((item: unknown) => fromJsonAsset(item)),
  }
}

/**
 * Creates, updates or deletes an offer
 * 
 * Threshold: med
 * 
 * Result: ManageSellOfferResult
 * 
 */
export interface ManageSellOfferOp {
  readonly selling: Asset
  readonly buying: Asset
  readonly amount: int64
  /** amount being sold. if set to 0, delete the offer */
  readonly price: Price
  /** 0=create a new offer, otherwise edit an existing offer */
  readonly offerID: int64
}

export function readManageSellOfferOp(r: XdrReader): ManageSellOfferOp {
  beginComposite(r)
  try {
    const selling = readAsset(r)
    const buying = readAsset(r)
    const amount = readint64(r)
    const price = readPrice(r)
    const offerID = readint64(r)
    return { selling, buying, amount, price, offerID }
  } finally {
    endComposite(r)
  }
}

export function writeManageSellOfferOp(w: XdrWriter, v: ManageSellOfferOp): void {
  writeAsset(w, v.selling)
  writeAsset(w, v.buying)
  writeint64(w, v.amount)
  writePrice(w, v.price)
  writeint64(w, v.offerID)
}

export function encodeManageSellOfferOp(v: ManageSellOfferOp): Uint8Array {
  return encode(v, writeManageSellOfferOp)
}

export function decodeManageSellOfferOp(input: Uint8Array | string): ManageSellOfferOp {
  return decode(input, readManageSellOfferOp)
}

export function toJsonManageSellOfferOp(v: ManageSellOfferOp): Record<string, unknown> {
  return {
    'selling': toJsonAsset(v.selling),
    'buying': toJsonAsset(v.buying),
    'amount': toJsonint64(v.amount),
    'price': toJsonPrice(v.price),
    'offer_id': toJsonint64(v.offerID),
  }
}

export function fromJsonManageSellOfferOp(json: unknown): ManageSellOfferOp {
  const o = json as Record<string, unknown>
  return {
    selling: fromJsonAsset(o['selling']),
    buying: fromJsonAsset(o['buying']),
    amount: fromJsonint64(o['amount']),
    price: fromJsonPrice(o['price']),
    offerID: fromJsonint64(o['offer_id']),
  }
}

/**
 * Creates, updates or deletes an offer with amount in terms of buying asset
 * 
 * Threshold: med
 * 
 * Result: ManageBuyOfferResult
 * 
 */
export interface ManageBuyOfferOp {
  readonly selling: Asset
  readonly buying: Asset
  readonly buyAmount: int64
  /** amount being bought. if set to 0, delete the offer */
  readonly price: Price
  /** 0=create a new offer, otherwise edit an existing offer */
  readonly offerID: int64
}

export function readManageBuyOfferOp(r: XdrReader): ManageBuyOfferOp {
  beginComposite(r)
  try {
    const selling = readAsset(r)
    const buying = readAsset(r)
    const buyAmount = readint64(r)
    const price = readPrice(r)
    const offerID = readint64(r)
    return { selling, buying, buyAmount, price, offerID }
  } finally {
    endComposite(r)
  }
}

export function writeManageBuyOfferOp(w: XdrWriter, v: ManageBuyOfferOp): void {
  writeAsset(w, v.selling)
  writeAsset(w, v.buying)
  writeint64(w, v.buyAmount)
  writePrice(w, v.price)
  writeint64(w, v.offerID)
}

export function encodeManageBuyOfferOp(v: ManageBuyOfferOp): Uint8Array {
  return encode(v, writeManageBuyOfferOp)
}

export function decodeManageBuyOfferOp(input: Uint8Array | string): ManageBuyOfferOp {
  return decode(input, readManageBuyOfferOp)
}

export function toJsonManageBuyOfferOp(v: ManageBuyOfferOp): Record<string, unknown> {
  return {
    'selling': toJsonAsset(v.selling),
    'buying': toJsonAsset(v.buying),
    'buy_amount': toJsonint64(v.buyAmount),
    'price': toJsonPrice(v.price),
    'offer_id': toJsonint64(v.offerID),
  }
}

export function fromJsonManageBuyOfferOp(json: unknown): ManageBuyOfferOp {
  const o = json as Record<string, unknown>
  return {
    selling: fromJsonAsset(o['selling']),
    buying: fromJsonAsset(o['buying']),
    buyAmount: fromJsonint64(o['buy_amount']),
    price: fromJsonPrice(o['price']),
    offerID: fromJsonint64(o['offer_id']),
  }
}

/**
 * Creates an offer that doesn't take offers of the same price
 * 
 * Threshold: med
 * 
 * Result: CreatePassiveSellOfferResult
 * 
 */
export interface CreatePassiveSellOfferOp {
  readonly selling: Asset
  /** A */
  readonly buying: Asset
  /** B */
  readonly amount: int64
  /** amount taker gets */
  readonly price: Price
}

export function readCreatePassiveSellOfferOp(r: XdrReader): CreatePassiveSellOfferOp {
  beginComposite(r)
  try {
    const selling = readAsset(r)
    const buying = readAsset(r)
    const amount = readint64(r)
    const price = readPrice(r)
    return { selling, buying, amount, price }
  } finally {
    endComposite(r)
  }
}

export function writeCreatePassiveSellOfferOp(w: XdrWriter, v: CreatePassiveSellOfferOp): void {
  writeAsset(w, v.selling)
  writeAsset(w, v.buying)
  writeint64(w, v.amount)
  writePrice(w, v.price)
}

export function encodeCreatePassiveSellOfferOp(v: CreatePassiveSellOfferOp): Uint8Array {
  return encode(v, writeCreatePassiveSellOfferOp)
}

export function decodeCreatePassiveSellOfferOp(input: Uint8Array | string): CreatePassiveSellOfferOp {
  return decode(input, readCreatePassiveSellOfferOp)
}

export function toJsonCreatePassiveSellOfferOp(v: CreatePassiveSellOfferOp): Record<string, unknown> {
  return {
    'selling': toJsonAsset(v.selling),
    'buying': toJsonAsset(v.buying),
    'amount': toJsonint64(v.amount),
    'price': toJsonPrice(v.price),
  }
}

export function fromJsonCreatePassiveSellOfferOp(json: unknown): CreatePassiveSellOfferOp {
  const o = json as Record<string, unknown>
  return {
    selling: fromJsonAsset(o['selling']),
    buying: fromJsonAsset(o['buying']),
    amount: fromJsonint64(o['amount']),
    price: fromJsonPrice(o['price']),
  }
}

/**
 * Set Account Options
 * 
 * updates "AccountEntry" fields.
 * note: updating thresholds or signers requires high threshold
 * 
 * Threshold: med or high
 * 
 * Result: SetOptionsResult
 */
export interface SetOptionsOp {
  readonly inflationDest: AccountID | undefined
  readonly clearFlags: uint32 | undefined
  /** which flags to clear */
  readonly setFlags: uint32 | undefined
  /** account threshold manipulation */
  readonly masterWeight: uint32 | undefined
  /** weight of the master account */
  readonly lowThreshold: uint32 | undefined
  readonly medThreshold: uint32 | undefined
  readonly highThreshold: uint32 | undefined
  readonly homeDomain: string32 | undefined
  /**
   * Add, update or remove a signer for the account
   * signer is deleted if the weight is 0
   */
  readonly signer: Signer | undefined
}

export function readSetOptionsOp(r: XdrReader): SetOptionsOp {
  beginComposite(r)
  try {
    const inflationDest = readOptional(r, readAccountID)
    const clearFlags = readOptional(r, readuint32)
    const setFlags = readOptional(r, readuint32)
    const masterWeight = readOptional(r, readuint32)
    const lowThreshold = readOptional(r, readuint32)
    const medThreshold = readOptional(r, readuint32)
    const highThreshold = readOptional(r, readuint32)
    const homeDomain = readOptional(r, readstring32)
    const signer = readOptional(r, readSigner)
    return { inflationDest, clearFlags, setFlags, masterWeight, lowThreshold, medThreshold, highThreshold, homeDomain, signer }
  } finally {
    endComposite(r)
  }
}

export function writeSetOptionsOp(w: XdrWriter, v: SetOptionsOp): void {
  writeOptional(w, v.inflationDest, writeAccountID)
  writeOptional(w, v.clearFlags, writeuint32)
  writeOptional(w, v.setFlags, writeuint32)
  writeOptional(w, v.masterWeight, writeuint32)
  writeOptional(w, v.lowThreshold, writeuint32)
  writeOptional(w, v.medThreshold, writeuint32)
  writeOptional(w, v.highThreshold, writeuint32)
  writeOptional(w, v.homeDomain, writestring32)
  writeOptional(w, v.signer, writeSigner)
}

export function encodeSetOptionsOp(v: SetOptionsOp): Uint8Array {
  return encode(v, writeSetOptionsOp)
}

export function decodeSetOptionsOp(input: Uint8Array | string): SetOptionsOp {
  return decode(input, readSetOptionsOp)
}

export function toJsonSetOptionsOp(v: SetOptionsOp): Record<string, unknown> {
  return {
    'inflation_dest': v.inflationDest !== undefined ? toJsonAccountID(v.inflationDest) : null,
    'clear_flags': v.clearFlags !== undefined ? toJsonuint32(v.clearFlags) : null,
    'set_flags': v.setFlags !== undefined ? toJsonuint32(v.setFlags) : null,
    'master_weight': v.masterWeight !== undefined ? toJsonuint32(v.masterWeight) : null,
    'low_threshold': v.lowThreshold !== undefined ? toJsonuint32(v.lowThreshold) : null,
    'med_threshold': v.medThreshold !== undefined ? toJsonuint32(v.medThreshold) : null,
    'high_threshold': v.highThreshold !== undefined ? toJsonuint32(v.highThreshold) : null,
    'home_domain': v.homeDomain !== undefined ? toJsonstring32(v.homeDomain) : null,
    'signer': v.signer !== undefined ? toJsonSigner(v.signer) : null,
  }
}

export function fromJsonSetOptionsOp(json: unknown): SetOptionsOp {
  const o = json as Record<string, unknown>
  return {
    inflationDest: (o['inflation_dest']) != null ? fromJsonAccountID(o['inflation_dest']) : undefined,
    clearFlags: (o['clear_flags']) != null ? fromJsonuint32(o['clear_flags']) : undefined,
    setFlags: (o['set_flags']) != null ? fromJsonuint32(o['set_flags']) : undefined,
    masterWeight: (o['master_weight']) != null ? fromJsonuint32(o['master_weight']) : undefined,
    lowThreshold: (o['low_threshold']) != null ? fromJsonuint32(o['low_threshold']) : undefined,
    medThreshold: (o['med_threshold']) != null ? fromJsonuint32(o['med_threshold']) : undefined,
    highThreshold: (o['high_threshold']) != null ? fromJsonuint32(o['high_threshold']) : undefined,
    homeDomain: (o['home_domain']) != null ? fromJsonstring32(o['home_domain']) : undefined,
    signer: (o['signer']) != null ? fromJsonSigner(o['signer']) : undefined,
  }
}

export type ChangeTrustAsset =
  | { readonly type: 'ASSET_TYPE_NATIVE' }
  | { readonly type: 'ASSET_TYPE_CREDIT_ALPHANUM4'; readonly alphaNum4: AlphaNum4 }
  | { readonly type: 'ASSET_TYPE_CREDIT_ALPHANUM12'; readonly alphaNum12: AlphaNum12 }
  | { readonly type: 'ASSET_TYPE_POOL_SHARE'; readonly liquidityPool: LiquidityPoolParameters }

export function readChangeTrustAsset(r: XdrReader): ChangeTrustAsset {
  beginComposite(r)
  try {
    const type = readAssetType(r)
    let result: ChangeTrustAsset
    switch (type) {
      case 'ASSET_TYPE_NATIVE':
        result = { type }; break
      case 'ASSET_TYPE_CREDIT_ALPHANUM4':
        result = { type, alphaNum4: readAlphaNum4(r) }; break
      case 'ASSET_TYPE_CREDIT_ALPHANUM12':
        result = { type, alphaNum12: readAlphaNum12(r) }; break
      case 'ASSET_TYPE_POOL_SHARE':
        result = { type, liquidityPool: readLiquidityPoolParameters(r) }; break
      default:
        throw new XdrReadError(`Unknown ChangeTrustAsset discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeChangeTrustAsset(w: XdrWriter, v: ChangeTrustAsset): void {
  writeAssetType(w, v.type)
  switch (v.type) {
    case 'ASSET_TYPE_NATIVE':
      break
    case 'ASSET_TYPE_CREDIT_ALPHANUM4':
      writeAlphaNum4(w, (v as any).alphaNum4); break
    case 'ASSET_TYPE_CREDIT_ALPHANUM12':
      writeAlphaNum12(w, (v as any).alphaNum12); break
    case 'ASSET_TYPE_POOL_SHARE':
      writeLiquidityPoolParameters(w, (v as any).liquidityPool); break
  }
}

export function encodeChangeTrustAsset(v: ChangeTrustAsset): Uint8Array {
  return encode(v, writeChangeTrustAsset)
}

export function decodeChangeTrustAsset(input: Uint8Array | string): ChangeTrustAsset {
  return decode(input, readChangeTrustAsset)
}

export function toJsonChangeTrustAsset(v: ChangeTrustAsset): unknown {
  switch (v.type) {
    case 'ASSET_TYPE_NATIVE':
      return 'native'
    case 'ASSET_TYPE_CREDIT_ALPHANUM4':
      return { 'credit_alphanum4': toJsonAlphaNum4((v as any).alphaNum4) }
    case 'ASSET_TYPE_CREDIT_ALPHANUM12':
      return { 'credit_alphanum12': toJsonAlphaNum12((v as any).alphaNum12) }
    case 'ASSET_TYPE_POOL_SHARE':
      return { 'pool_share': toJsonLiquidityPoolParameters((v as any).liquidityPool) }
  }
}

export function fromJsonChangeTrustAsset(json: unknown): ChangeTrustAsset {
  if (typeof json === 'string') {
    if (json === 'native') return { type: 'ASSET_TYPE_NATIVE' } as ChangeTrustAsset
    throw new Error(`Unknown ChangeTrustAsset variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'credit_alphanum4':
      return { type: 'ASSET_TYPE_CREDIT_ALPHANUM4', alphaNum4: fromJsonAlphaNum4(obj[key]) } as ChangeTrustAsset
    case 'credit_alphanum12':
      return { type: 'ASSET_TYPE_CREDIT_ALPHANUM12', alphaNum12: fromJsonAlphaNum12(obj[key]) } as ChangeTrustAsset
    case 'pool_share':
      return { type: 'ASSET_TYPE_POOL_SHARE', liquidityPool: fromJsonLiquidityPoolParameters(obj[key]) } as ChangeTrustAsset
    default: throw new Error(`Unknown ChangeTrustAsset variant: ${key}`)
  }
}

/**
 * Creates, updates or deletes a trust line
 * 
 * Threshold: med
 * 
 * Result: ChangeTrustResult
 * 
 */
export interface ChangeTrustOp {
  readonly line: ChangeTrustAsset
  /** if limit is set to 0, deletes the trust line */
  readonly limit: int64
}

export function readChangeTrustOp(r: XdrReader): ChangeTrustOp {
  beginComposite(r)
  try {
    const line = readChangeTrustAsset(r)
    const limit = readint64(r)
    return { line, limit }
  } finally {
    endComposite(r)
  }
}

export function writeChangeTrustOp(w: XdrWriter, v: ChangeTrustOp): void {
  writeChangeTrustAsset(w, v.line)
  writeint64(w, v.limit)
}

export function encodeChangeTrustOp(v: ChangeTrustOp): Uint8Array {
  return encode(v, writeChangeTrustOp)
}

export function decodeChangeTrustOp(input: Uint8Array | string): ChangeTrustOp {
  return decode(input, readChangeTrustOp)
}

export function toJsonChangeTrustOp(v: ChangeTrustOp): Record<string, unknown> {
  return {
    'line': toJsonChangeTrustAsset(v.line),
    'limit': toJsonint64(v.limit),
  }
}

export function fromJsonChangeTrustOp(json: unknown): ChangeTrustOp {
  const o = json as Record<string, unknown>
  return {
    line: fromJsonChangeTrustAsset(o['line']),
    limit: fromJsonint64(o['limit']),
  }
}

/**
 * Updates the "authorized" flag of an existing trust line
 * this is called by the issuer of the related asset.
 * 
 * note that authorize can only be set (and not cleared) if
 * the issuer account does not have the AUTH_REVOCABLE_FLAG set
 * Threshold: low
 * 
 * Result: AllowTrustResult
 */
export interface AllowTrustOp {
  readonly trustor: AccountID
  readonly asset: AssetCode
  /** One of 0, AUTHORIZED_FLAG, or AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG */
  readonly authorize: uint32
}

export function readAllowTrustOp(r: XdrReader): AllowTrustOp {
  beginComposite(r)
  try {
    const trustor = readAccountID(r)
    const asset = readAssetCode(r)
    const authorize = readuint32(r)
    return { trustor, asset, authorize }
  } finally {
    endComposite(r)
  }
}

export function writeAllowTrustOp(w: XdrWriter, v: AllowTrustOp): void {
  writeAccountID(w, v.trustor)
  writeAssetCode(w, v.asset)
  writeuint32(w, v.authorize)
}

export function encodeAllowTrustOp(v: AllowTrustOp): Uint8Array {
  return encode(v, writeAllowTrustOp)
}

export function decodeAllowTrustOp(input: Uint8Array | string): AllowTrustOp {
  return decode(input, readAllowTrustOp)
}

export function toJsonAllowTrustOp(v: AllowTrustOp): Record<string, unknown> {
  return {
    'trustor': toJsonAccountID(v.trustor),
    'asset': toJsonAssetCode(v.asset),
    'authorize': toJsonuint32(v.authorize),
  }
}

export function fromJsonAllowTrustOp(json: unknown): AllowTrustOp {
  const o = json as Record<string, unknown>
  return {
    trustor: fromJsonAccountID(o['trustor']),
    asset: fromJsonAssetCode(o['asset']),
    authorize: fromJsonuint32(o['authorize']),
  }
}

/**
 * ManageData
 * Adds, Updates, or Deletes a key value pair associated with a particular
 * account.
 * 
 * Threshold: med
 * 
 * Result: ManageDataResult
 */
export interface ManageDataOp {
  readonly dataName: string64
  readonly dataValue: DataValue | undefined
}

export function readManageDataOp(r: XdrReader): ManageDataOp {
  beginComposite(r)
  try {
    const dataName = readstring64(r)
    const dataValue = readOptional(r, readDataValue)
    return { dataName, dataValue }
  } finally {
    endComposite(r)
  }
}

export function writeManageDataOp(w: XdrWriter, v: ManageDataOp): void {
  writestring64(w, v.dataName)
  writeOptional(w, v.dataValue, writeDataValue)
}

export function encodeManageDataOp(v: ManageDataOp): Uint8Array {
  return encode(v, writeManageDataOp)
}

export function decodeManageDataOp(input: Uint8Array | string): ManageDataOp {
  return decode(input, readManageDataOp)
}

export function toJsonManageDataOp(v: ManageDataOp): Record<string, unknown> {
  return {
    'data_name': toJsonstring64(v.dataName),
    'data_value': v.dataValue !== undefined ? toJsonDataValue(v.dataValue) : null,
  }
}

export function fromJsonManageDataOp(json: unknown): ManageDataOp {
  const o = json as Record<string, unknown>
  return {
    dataName: fromJsonstring64(o['data_name']),
    dataValue: (o['data_value']) != null ? fromJsonDataValue(o['data_value']) : undefined,
  }
}

/**
 * Bump Sequence
 * 
 * increases the sequence to a given level
 * 
 * Threshold: low
 * 
 * Result: BumpSequenceResult
 */
export interface BumpSequenceOp {
  readonly bumpTo: SequenceNumber
}

export function readBumpSequenceOp(r: XdrReader): BumpSequenceOp {
  beginComposite(r)
  try {
    const bumpTo = readSequenceNumber(r)
    return { bumpTo }
  } finally {
    endComposite(r)
  }
}

export function writeBumpSequenceOp(w: XdrWriter, v: BumpSequenceOp): void {
  writeSequenceNumber(w, v.bumpTo)
}

export function encodeBumpSequenceOp(v: BumpSequenceOp): Uint8Array {
  return encode(v, writeBumpSequenceOp)
}

export function decodeBumpSequenceOp(input: Uint8Array | string): BumpSequenceOp {
  return decode(input, readBumpSequenceOp)
}

export function toJsonBumpSequenceOp(v: BumpSequenceOp): Record<string, unknown> {
  return {
    'bump_to': toJsonSequenceNumber(v.bumpTo),
  }
}

export function fromJsonBumpSequenceOp(json: unknown): BumpSequenceOp {
  const o = json as Record<string, unknown>
  return {
    bumpTo: fromJsonSequenceNumber(o['bump_to']),
  }
}

/**
 * Creates a claimable balance entry
 * 
 * Threshold: med
 * 
 * Result: CreateClaimableBalanceResult
 */
export interface CreateClaimableBalanceOp {
  readonly asset: Asset
  readonly amount: int64
  readonly claimants: Claimant[]
}

export function readCreateClaimableBalanceOp(r: XdrReader): CreateClaimableBalanceOp {
  beginComposite(r)
  try {
    const asset = readAsset(r)
    const amount = readint64(r)
    const claimants = readVarArray(r, 10, readClaimant)
    return { asset, amount, claimants }
  } finally {
    endComposite(r)
  }
}

export function writeCreateClaimableBalanceOp(w: XdrWriter, v: CreateClaimableBalanceOp): void {
  writeAsset(w, v.asset)
  writeint64(w, v.amount)
  writeVarArray(w, v.claimants, 10, writeClaimant)
}

export function encodeCreateClaimableBalanceOp(v: CreateClaimableBalanceOp): Uint8Array {
  return encode(v, writeCreateClaimableBalanceOp)
}

export function decodeCreateClaimableBalanceOp(input: Uint8Array | string): CreateClaimableBalanceOp {
  return decode(input, readCreateClaimableBalanceOp)
}

export function toJsonCreateClaimableBalanceOp(v: CreateClaimableBalanceOp): Record<string, unknown> {
  return {
    'asset': toJsonAsset(v.asset),
    'amount': toJsonint64(v.amount),
    'claimants': v.claimants.map((item: any) => toJsonClaimant(item)),
  }
}

export function fromJsonCreateClaimableBalanceOp(json: unknown): CreateClaimableBalanceOp {
  const o = json as Record<string, unknown>
  return {
    asset: fromJsonAsset(o['asset']),
    amount: fromJsonint64(o['amount']),
    claimants: ((o['claimants']) as unknown[]).map((item: unknown) => fromJsonClaimant(item)),
  }
}

/**
 * Claims a claimable balance entry
 * 
 * Threshold: low
 * 
 * Result: ClaimClaimableBalanceResult
 */
export interface ClaimClaimableBalanceOp {
  readonly balanceID: ClaimableBalanceID
}

export function readClaimClaimableBalanceOp(r: XdrReader): ClaimClaimableBalanceOp {
  beginComposite(r)
  try {
    const balanceID = readClaimableBalanceID(r)
    return { balanceID }
  } finally {
    endComposite(r)
  }
}

export function writeClaimClaimableBalanceOp(w: XdrWriter, v: ClaimClaimableBalanceOp): void {
  writeClaimableBalanceID(w, v.balanceID)
}

export function encodeClaimClaimableBalanceOp(v: ClaimClaimableBalanceOp): Uint8Array {
  return encode(v, writeClaimClaimableBalanceOp)
}

export function decodeClaimClaimableBalanceOp(input: Uint8Array | string): ClaimClaimableBalanceOp {
  return decode(input, readClaimClaimableBalanceOp)
}

export function toJsonClaimClaimableBalanceOp(v: ClaimClaimableBalanceOp): Record<string, unknown> {
  return {
    'balance_id': toJsonClaimableBalanceID(v.balanceID),
  }
}

export function fromJsonClaimClaimableBalanceOp(json: unknown): ClaimClaimableBalanceOp {
  const o = json as Record<string, unknown>
  return {
    balanceID: fromJsonClaimableBalanceID(o['balance_id']),
  }
}

/**
 * BeginSponsoringFutureReserves
 * 
 * Establishes the is-sponsoring-future-reserves-for relationship between
 * the source account and sponsoredID
 * 
 * Threshold: med
 * 
 * Result: BeginSponsoringFutureReservesResult
 */
export interface BeginSponsoringFutureReservesOp {
  readonly sponsoredID: AccountID
}

export function readBeginSponsoringFutureReservesOp(r: XdrReader): BeginSponsoringFutureReservesOp {
  beginComposite(r)
  try {
    const sponsoredID = readAccountID(r)
    return { sponsoredID }
  } finally {
    endComposite(r)
  }
}

export function writeBeginSponsoringFutureReservesOp(w: XdrWriter, v: BeginSponsoringFutureReservesOp): void {
  writeAccountID(w, v.sponsoredID)
}

export function encodeBeginSponsoringFutureReservesOp(v: BeginSponsoringFutureReservesOp): Uint8Array {
  return encode(v, writeBeginSponsoringFutureReservesOp)
}

export function decodeBeginSponsoringFutureReservesOp(input: Uint8Array | string): BeginSponsoringFutureReservesOp {
  return decode(input, readBeginSponsoringFutureReservesOp)
}

export function toJsonBeginSponsoringFutureReservesOp(v: BeginSponsoringFutureReservesOp): Record<string, unknown> {
  return {
    'sponsored_id': toJsonAccountID(v.sponsoredID),
  }
}

export function fromJsonBeginSponsoringFutureReservesOp(json: unknown): BeginSponsoringFutureReservesOp {
  const o = json as Record<string, unknown>
  return {
    sponsoredID: fromJsonAccountID(o['sponsored_id']),
  }
}

/**
 * RevokeSponsorship
 * 
 * If source account is not sponsored or is sponsored by the owner of the
 * specified entry or sub-entry, then attempt to revoke the sponsorship.
 * If source account is sponsored, then attempt to transfer the sponsorship
 * to the sponsor of source account.
 * 
 * Threshold: med
 * 
 * Result: RevokeSponsorshipResult
 */
export type RevokeSponsorshipType =
  | 'REVOKE_SPONSORSHIP_LEDGER_ENTRY'
  | 'REVOKE_SPONSORSHIP_SIGNER'

export const REVOKE_SPONSORSHIP_TYPE_TO_INT: Record<RevokeSponsorshipType, number> = /*#__PURE__*/ {
  REVOKE_SPONSORSHIP_LEDGER_ENTRY: 0,
  REVOKE_SPONSORSHIP_SIGNER: 1,
}

export const REVOKE_SPONSORSHIP_TYPE_FROM_INT: Record<number, RevokeSponsorshipType> = /*#__PURE__*/ {
  0: 'REVOKE_SPONSORSHIP_LEDGER_ENTRY',
  1: 'REVOKE_SPONSORSHIP_SIGNER',
}

export function readRevokeSponsorshipType(r: XdrReader): RevokeSponsorshipType {
  const v = readInt32(r)
  const result = REVOKE_SPONSORSHIP_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown RevokeSponsorshipType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeRevokeSponsorshipType(w: XdrWriter, v: RevokeSponsorshipType): void {
  writeInt32(w, REVOKE_SPONSORSHIP_TYPE_TO_INT[v])
}

export function encodeRevokeSponsorshipType(v: RevokeSponsorshipType): Uint8Array {
  return encode(v, writeRevokeSponsorshipType)
}

export function decodeRevokeSponsorshipType(input: Uint8Array | string): RevokeSponsorshipType {
  return decode(input, readRevokeSponsorshipType)
}

const _REVOKE_SPONSORSHIP_TYPE_TO_JSON: Record<RevokeSponsorshipType, string> = /*#__PURE__*/ {
  REVOKE_SPONSORSHIP_LEDGER_ENTRY: 'ledger_entry',
  REVOKE_SPONSORSHIP_SIGNER: 'signer',
}

const _REVOKE_SPONSORSHIP_TYPE_FROM_JSON: Record<string, RevokeSponsorshipType> = /*#__PURE__*/ {
  'ledger_entry': 'REVOKE_SPONSORSHIP_LEDGER_ENTRY',
  'signer': 'REVOKE_SPONSORSHIP_SIGNER',
}

export function toJsonRevokeSponsorshipType(v: RevokeSponsorshipType): string {
  return _REVOKE_SPONSORSHIP_TYPE_TO_JSON[v]
}

export function fromJsonRevokeSponsorshipType(json: unknown): RevokeSponsorshipType {
  const result = _REVOKE_SPONSORSHIP_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown RevokeSponsorshipType JSON value: ${json}`)
  return result
}

export interface RevokeSponsorshipOp_signer {
  readonly accountID: AccountID
  readonly signerKey: SignerKey
}

export function readRevokeSponsorshipOp_signer(r: XdrReader): RevokeSponsorshipOp_signer {
  beginComposite(r)
  try {
    const accountID = readAccountID(r)
    const signerKey = readSignerKey(r)
    return { accountID, signerKey }
  } finally {
    endComposite(r)
  }
}

export function writeRevokeSponsorshipOp_signer(w: XdrWriter, v: RevokeSponsorshipOp_signer): void {
  writeAccountID(w, v.accountID)
  writeSignerKey(w, v.signerKey)
}

export function encodeRevokeSponsorshipOp_signer(v: RevokeSponsorshipOp_signer): Uint8Array {
  return encode(v, writeRevokeSponsorshipOp_signer)
}

export function decodeRevokeSponsorshipOp_signer(input: Uint8Array | string): RevokeSponsorshipOp_signer {
  return decode(input, readRevokeSponsorshipOp_signer)
}

export function toJsonRevokeSponsorshipOp_signer(v: RevokeSponsorshipOp_signer): Record<string, unknown> {
  return {
    'account_id': toJsonAccountID(v.accountID),
    'signer_key': toJsonSignerKey(v.signerKey),
  }
}

export function fromJsonRevokeSponsorshipOp_signer(json: unknown): RevokeSponsorshipOp_signer {
  const o = json as Record<string, unknown>
  return {
    accountID: fromJsonAccountID(o['account_id']),
    signerKey: fromJsonSignerKey(o['signer_key']),
  }
}

export type RevokeSponsorshipOp =
  | { readonly type: 'REVOKE_SPONSORSHIP_LEDGER_ENTRY'; readonly ledgerKey: LedgerKey }
  | { readonly type: 'REVOKE_SPONSORSHIP_SIGNER'; readonly signer: RevokeSponsorshipOp_signer }

export function readRevokeSponsorshipOp(r: XdrReader): RevokeSponsorshipOp {
  beginComposite(r)
  try {
    const type = readRevokeSponsorshipType(r)
    let result: RevokeSponsorshipOp
    switch (type) {
      case 'REVOKE_SPONSORSHIP_LEDGER_ENTRY':
        result = { type, ledgerKey: readLedgerKey(r) }; break
      case 'REVOKE_SPONSORSHIP_SIGNER':
        result = { type, signer: readRevokeSponsorshipOp_signer(r) }; break
      default:
        throw new XdrReadError(`Unknown RevokeSponsorshipOp discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeRevokeSponsorshipOp(w: XdrWriter, v: RevokeSponsorshipOp): void {
  writeRevokeSponsorshipType(w, v.type)
  switch (v.type) {
    case 'REVOKE_SPONSORSHIP_LEDGER_ENTRY':
      writeLedgerKey(w, (v as any).ledgerKey); break
    case 'REVOKE_SPONSORSHIP_SIGNER':
      writeRevokeSponsorshipOp_signer(w, (v as any).signer); break
  }
}

export function encodeRevokeSponsorshipOp(v: RevokeSponsorshipOp): Uint8Array {
  return encode(v, writeRevokeSponsorshipOp)
}

export function decodeRevokeSponsorshipOp(input: Uint8Array | string): RevokeSponsorshipOp {
  return decode(input, readRevokeSponsorshipOp)
}

export function toJsonRevokeSponsorshipOp(v: RevokeSponsorshipOp): unknown {
  switch (v.type) {
    case 'REVOKE_SPONSORSHIP_LEDGER_ENTRY':
      return { 'ledger_entry': toJsonLedgerKey((v as any).ledgerKey) }
    case 'REVOKE_SPONSORSHIP_SIGNER':
      return { 'signer': toJsonRevokeSponsorshipOp_signer((v as any).signer) }
  }
}

export function fromJsonRevokeSponsorshipOp(json: unknown): RevokeSponsorshipOp {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for RevokeSponsorshipOp: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'ledger_entry':
      return { type: 'REVOKE_SPONSORSHIP_LEDGER_ENTRY', ledgerKey: fromJsonLedgerKey(obj[key]) } as RevokeSponsorshipOp
    case 'signer':
      return { type: 'REVOKE_SPONSORSHIP_SIGNER', signer: fromJsonRevokeSponsorshipOp_signer(obj[key]) } as RevokeSponsorshipOp
    default: throw new Error(`Unknown RevokeSponsorshipOp variant: ${key}`)
  }
}

/**
 * Claws back an amount of an asset from an account
 * 
 * Threshold: med
 * 
 * Result: ClawbackResult
 */
export interface ClawbackOp {
  readonly asset: Asset
  readonly from: MuxedAccount
  readonly amount: int64
}

export function readClawbackOp(r: XdrReader): ClawbackOp {
  beginComposite(r)
  try {
    const asset = readAsset(r)
    const from_ = readMuxedAccount(r)
    const amount = readint64(r)
    return { asset, from: from_, amount }
  } finally {
    endComposite(r)
  }
}

export function writeClawbackOp(w: XdrWriter, v: ClawbackOp): void {
  writeAsset(w, v.asset)
  writeMuxedAccount(w, v.from)
  writeint64(w, v.amount)
}

export function encodeClawbackOp(v: ClawbackOp): Uint8Array {
  return encode(v, writeClawbackOp)
}

export function decodeClawbackOp(input: Uint8Array | string): ClawbackOp {
  return decode(input, readClawbackOp)
}

export function toJsonClawbackOp(v: ClawbackOp): Record<string, unknown> {
  return {
    'asset': toJsonAsset(v.asset),
    'from': toJsonMuxedAccount(v.from),
    'amount': toJsonint64(v.amount),
  }
}

export function fromJsonClawbackOp(json: unknown): ClawbackOp {
  const o = json as Record<string, unknown>
  return {
    asset: fromJsonAsset(o['asset']),
    from: fromJsonMuxedAccount(o['from']),
    amount: fromJsonint64(o['amount']),
  }
}

/**
 * Claws back a claimable balance
 * 
 * Threshold: med
 * 
 * Result: ClawbackClaimableBalanceResult
 */
export interface ClawbackClaimableBalanceOp {
  readonly balanceID: ClaimableBalanceID
}

export function readClawbackClaimableBalanceOp(r: XdrReader): ClawbackClaimableBalanceOp {
  beginComposite(r)
  try {
    const balanceID = readClaimableBalanceID(r)
    return { balanceID }
  } finally {
    endComposite(r)
  }
}

export function writeClawbackClaimableBalanceOp(w: XdrWriter, v: ClawbackClaimableBalanceOp): void {
  writeClaimableBalanceID(w, v.balanceID)
}

export function encodeClawbackClaimableBalanceOp(v: ClawbackClaimableBalanceOp): Uint8Array {
  return encode(v, writeClawbackClaimableBalanceOp)
}

export function decodeClawbackClaimableBalanceOp(input: Uint8Array | string): ClawbackClaimableBalanceOp {
  return decode(input, readClawbackClaimableBalanceOp)
}

export function toJsonClawbackClaimableBalanceOp(v: ClawbackClaimableBalanceOp): Record<string, unknown> {
  return {
    'balance_id': toJsonClaimableBalanceID(v.balanceID),
  }
}

export function fromJsonClawbackClaimableBalanceOp(json: unknown): ClawbackClaimableBalanceOp {
  const o = json as Record<string, unknown>
  return {
    balanceID: fromJsonClaimableBalanceID(o['balance_id']),
  }
}

/**
 * SetTrustLineFlagsOp
 * 
 * Updates the flags of an existing trust line.
 * This is called by the issuer of the related asset.
 * 
 * Threshold: low
 * 
 * Result: SetTrustLineFlagsResult
 */
export interface SetTrustLineFlagsOp {
  readonly trustor: AccountID
  readonly asset: Asset
  readonly clearFlags: uint32
  /** which flags to clear */
  readonly setFlags: uint32
}

export function readSetTrustLineFlagsOp(r: XdrReader): SetTrustLineFlagsOp {
  beginComposite(r)
  try {
    const trustor = readAccountID(r)
    const asset = readAsset(r)
    const clearFlags = readuint32(r)
    const setFlags = readuint32(r)
    return { trustor, asset, clearFlags, setFlags }
  } finally {
    endComposite(r)
  }
}

export function writeSetTrustLineFlagsOp(w: XdrWriter, v: SetTrustLineFlagsOp): void {
  writeAccountID(w, v.trustor)
  writeAsset(w, v.asset)
  writeuint32(w, v.clearFlags)
  writeuint32(w, v.setFlags)
}

export function encodeSetTrustLineFlagsOp(v: SetTrustLineFlagsOp): Uint8Array {
  return encode(v, writeSetTrustLineFlagsOp)
}

export function decodeSetTrustLineFlagsOp(input: Uint8Array | string): SetTrustLineFlagsOp {
  return decode(input, readSetTrustLineFlagsOp)
}

export function toJsonSetTrustLineFlagsOp(v: SetTrustLineFlagsOp): Record<string, unknown> {
  return {
    'trustor': toJsonAccountID(v.trustor),
    'asset': toJsonAsset(v.asset),
    'clear_flags': toJsonuint32(v.clearFlags),
    'set_flags': toJsonuint32(v.setFlags),
  }
}

export function fromJsonSetTrustLineFlagsOp(json: unknown): SetTrustLineFlagsOp {
  const o = json as Record<string, unknown>
  return {
    trustor: fromJsonAccountID(o['trustor']),
    asset: fromJsonAsset(o['asset']),
    clearFlags: fromJsonuint32(o['clear_flags']),
    setFlags: fromJsonuint32(o['set_flags']),
  }
}

export const LIQUIDITY_POOL_FEE_V18 = 30


/**
 * Deposit assets into a liquidity pool
 * 
 * Threshold: med
 * 
 * Result: LiquidityPoolDepositResult
 */
export interface LiquidityPoolDepositOp {
  readonly liquidityPoolID: PoolID
  readonly maxAmountA: int64
  /** maximum amount of first asset to deposit */
  readonly maxAmountB: int64
  /** maximum amount of second asset to deposit */
  readonly minPrice: Price
  /** minimum depositA/depositB */
  readonly maxPrice: Price
}

export function readLiquidityPoolDepositOp(r: XdrReader): LiquidityPoolDepositOp {
  beginComposite(r)
  try {
    const liquidityPoolID = readPoolID(r)
    const maxAmountA = readint64(r)
    const maxAmountB = readint64(r)
    const minPrice = readPrice(r)
    const maxPrice = readPrice(r)
    return { liquidityPoolID, maxAmountA, maxAmountB, minPrice, maxPrice }
  } finally {
    endComposite(r)
  }
}

export function writeLiquidityPoolDepositOp(w: XdrWriter, v: LiquidityPoolDepositOp): void {
  writePoolID(w, v.liquidityPoolID)
  writeint64(w, v.maxAmountA)
  writeint64(w, v.maxAmountB)
  writePrice(w, v.minPrice)
  writePrice(w, v.maxPrice)
}

export function encodeLiquidityPoolDepositOp(v: LiquidityPoolDepositOp): Uint8Array {
  return encode(v, writeLiquidityPoolDepositOp)
}

export function decodeLiquidityPoolDepositOp(input: Uint8Array | string): LiquidityPoolDepositOp {
  return decode(input, readLiquidityPoolDepositOp)
}

export function toJsonLiquidityPoolDepositOp(v: LiquidityPoolDepositOp): Record<string, unknown> {
  return {
    'liquidity_pool_id': toJsonPoolID(v.liquidityPoolID),
    'max_amount_a': toJsonint64(v.maxAmountA),
    'max_amount_b': toJsonint64(v.maxAmountB),
    'min_price': toJsonPrice(v.minPrice),
    'max_price': toJsonPrice(v.maxPrice),
  }
}

export function fromJsonLiquidityPoolDepositOp(json: unknown): LiquidityPoolDepositOp {
  const o = json as Record<string, unknown>
  return {
    liquidityPoolID: fromJsonPoolID(o['liquidity_pool_id']),
    maxAmountA: fromJsonint64(o['max_amount_a']),
    maxAmountB: fromJsonint64(o['max_amount_b']),
    minPrice: fromJsonPrice(o['min_price']),
    maxPrice: fromJsonPrice(o['max_price']),
  }
}

/**
 * Withdraw assets from a liquidity pool
 * 
 * Threshold: med
 * 
 * Result: LiquidityPoolWithdrawResult
 */
export interface LiquidityPoolWithdrawOp {
  readonly liquidityPoolID: PoolID
  readonly amount: int64
  /** amount of pool shares to withdraw */
  readonly minAmountA: int64
  /** minimum amount of first asset to withdraw */
  readonly minAmountB: int64
}

export function readLiquidityPoolWithdrawOp(r: XdrReader): LiquidityPoolWithdrawOp {
  beginComposite(r)
  try {
    const liquidityPoolID = readPoolID(r)
    const amount = readint64(r)
    const minAmountA = readint64(r)
    const minAmountB = readint64(r)
    return { liquidityPoolID, amount, minAmountA, minAmountB }
  } finally {
    endComposite(r)
  }
}

export function writeLiquidityPoolWithdrawOp(w: XdrWriter, v: LiquidityPoolWithdrawOp): void {
  writePoolID(w, v.liquidityPoolID)
  writeint64(w, v.amount)
  writeint64(w, v.minAmountA)
  writeint64(w, v.minAmountB)
}

export function encodeLiquidityPoolWithdrawOp(v: LiquidityPoolWithdrawOp): Uint8Array {
  return encode(v, writeLiquidityPoolWithdrawOp)
}

export function decodeLiquidityPoolWithdrawOp(input: Uint8Array | string): LiquidityPoolWithdrawOp {
  return decode(input, readLiquidityPoolWithdrawOp)
}

export function toJsonLiquidityPoolWithdrawOp(v: LiquidityPoolWithdrawOp): Record<string, unknown> {
  return {
    'liquidity_pool_id': toJsonPoolID(v.liquidityPoolID),
    'amount': toJsonint64(v.amount),
    'min_amount_a': toJsonint64(v.minAmountA),
    'min_amount_b': toJsonint64(v.minAmountB),
  }
}

export function fromJsonLiquidityPoolWithdrawOp(json: unknown): LiquidityPoolWithdrawOp {
  const o = json as Record<string, unknown>
  return {
    liquidityPoolID: fromJsonPoolID(o['liquidity_pool_id']),
    amount: fromJsonint64(o['amount']),
    minAmountA: fromJsonint64(o['min_amount_a']),
    minAmountB: fromJsonint64(o['min_amount_b']),
  }
}

export type HostFunctionType =
  | 'HOST_FUNCTION_TYPE_INVOKE_CONTRACT'
  | 'HOST_FUNCTION_TYPE_CREATE_CONTRACT'
  | 'HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM'
  | 'HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2'

export const HOST_FUNCTION_TYPE_TO_INT: Record<HostFunctionType, number> = /*#__PURE__*/ {
  HOST_FUNCTION_TYPE_INVOKE_CONTRACT: 0,
  HOST_FUNCTION_TYPE_CREATE_CONTRACT: 1,
  HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM: 2,
  HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2: 3,
}

export const HOST_FUNCTION_TYPE_FROM_INT: Record<number, HostFunctionType> = /*#__PURE__*/ {
  0: 'HOST_FUNCTION_TYPE_INVOKE_CONTRACT',
  1: 'HOST_FUNCTION_TYPE_CREATE_CONTRACT',
  2: 'HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM',
  3: 'HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2',
}

export function readHostFunctionType(r: XdrReader): HostFunctionType {
  const v = readInt32(r)
  const result = HOST_FUNCTION_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown HostFunctionType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeHostFunctionType(w: XdrWriter, v: HostFunctionType): void {
  writeInt32(w, HOST_FUNCTION_TYPE_TO_INT[v])
}

export function encodeHostFunctionType(v: HostFunctionType): Uint8Array {
  return encode(v, writeHostFunctionType)
}

export function decodeHostFunctionType(input: Uint8Array | string): HostFunctionType {
  return decode(input, readHostFunctionType)
}

const _HOST_FUNCTION_TYPE_TO_JSON: Record<HostFunctionType, string> = /*#__PURE__*/ {
  HOST_FUNCTION_TYPE_INVOKE_CONTRACT: 'invoke_contract',
  HOST_FUNCTION_TYPE_CREATE_CONTRACT: 'create_contract',
  HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM: 'upload_contract_wasm',
  HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2: 'create_contract_v2',
}

const _HOST_FUNCTION_TYPE_FROM_JSON: Record<string, HostFunctionType> = /*#__PURE__*/ {
  'invoke_contract': 'HOST_FUNCTION_TYPE_INVOKE_CONTRACT',
  'create_contract': 'HOST_FUNCTION_TYPE_CREATE_CONTRACT',
  'upload_contract_wasm': 'HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM',
  'create_contract_v2': 'HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2',
}

export function toJsonHostFunctionType(v: HostFunctionType): string {
  return _HOST_FUNCTION_TYPE_TO_JSON[v]
}

export function fromJsonHostFunctionType(json: unknown): HostFunctionType {
  const result = _HOST_FUNCTION_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown HostFunctionType JSON value: ${json}`)
  return result
}

export type ContractIDPreimageType =
  | 'CONTRACT_ID_PREIMAGE_FROM_ADDRESS'
  | 'CONTRACT_ID_PREIMAGE_FROM_ASSET'

export const CONTRACT_I_D_PREIMAGE_TYPE_TO_INT: Record<ContractIDPreimageType, number> = /*#__PURE__*/ {
  CONTRACT_ID_PREIMAGE_FROM_ADDRESS: 0,
  CONTRACT_ID_PREIMAGE_FROM_ASSET: 1,
}

export const CONTRACT_I_D_PREIMAGE_TYPE_FROM_INT: Record<number, ContractIDPreimageType> = /*#__PURE__*/ {
  0: 'CONTRACT_ID_PREIMAGE_FROM_ADDRESS',
  1: 'CONTRACT_ID_PREIMAGE_FROM_ASSET',
}

export function readContractIDPreimageType(r: XdrReader): ContractIDPreimageType {
  const v = readInt32(r)
  const result = CONTRACT_I_D_PREIMAGE_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ContractIDPreimageType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeContractIDPreimageType(w: XdrWriter, v: ContractIDPreimageType): void {
  writeInt32(w, CONTRACT_I_D_PREIMAGE_TYPE_TO_INT[v])
}

export function encodeContractIDPreimageType(v: ContractIDPreimageType): Uint8Array {
  return encode(v, writeContractIDPreimageType)
}

export function decodeContractIDPreimageType(input: Uint8Array | string): ContractIDPreimageType {
  return decode(input, readContractIDPreimageType)
}

const _CONTRACT_I_D_PREIMAGE_TYPE_TO_JSON: Record<ContractIDPreimageType, string> = /*#__PURE__*/ {
  CONTRACT_ID_PREIMAGE_FROM_ADDRESS: 'address',
  CONTRACT_ID_PREIMAGE_FROM_ASSET: 'asset',
}

const _CONTRACT_I_D_PREIMAGE_TYPE_FROM_JSON: Record<string, ContractIDPreimageType> = /*#__PURE__*/ {
  'address': 'CONTRACT_ID_PREIMAGE_FROM_ADDRESS',
  'asset': 'CONTRACT_ID_PREIMAGE_FROM_ASSET',
}

export function toJsonContractIDPreimageType(v: ContractIDPreimageType): string {
  return _CONTRACT_I_D_PREIMAGE_TYPE_TO_JSON[v]
}

export function fromJsonContractIDPreimageType(json: unknown): ContractIDPreimageType {
  const result = _CONTRACT_I_D_PREIMAGE_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ContractIDPreimageType JSON value: ${json}`)
  return result
}

export interface ContractIDPreimage_fromAddress {
  readonly address: SCAddress
  readonly salt: uint256
}

export function readContractIDPreimage_fromAddress(r: XdrReader): ContractIDPreimage_fromAddress {
  beginComposite(r)
  try {
    const address = readSCAddress(r)
    const salt = readuint256(r)
    return { address, salt }
  } finally {
    endComposite(r)
  }
}

export function writeContractIDPreimage_fromAddress(w: XdrWriter, v: ContractIDPreimage_fromAddress): void {
  writeSCAddress(w, v.address)
  writeuint256(w, v.salt)
}

export function encodeContractIDPreimage_fromAddress(v: ContractIDPreimage_fromAddress): Uint8Array {
  return encode(v, writeContractIDPreimage_fromAddress)
}

export function decodeContractIDPreimage_fromAddress(input: Uint8Array | string): ContractIDPreimage_fromAddress {
  return decode(input, readContractIDPreimage_fromAddress)
}

export function toJsonContractIDPreimage_fromAddress(v: ContractIDPreimage_fromAddress): Record<string, unknown> {
  return {
    'address': toJsonSCAddress(v.address),
    'salt': toJsonuint256(v.salt),
  }
}

export function fromJsonContractIDPreimage_fromAddress(json: unknown): ContractIDPreimage_fromAddress {
  const o = json as Record<string, unknown>
  return {
    address: fromJsonSCAddress(o['address']),
    salt: fromJsonuint256(o['salt']),
  }
}

export type ContractIDPreimage =
  | { readonly type: 'CONTRACT_ID_PREIMAGE_FROM_ADDRESS'; readonly fromAddress: ContractIDPreimage_fromAddress }
  | { readonly type: 'CONTRACT_ID_PREIMAGE_FROM_ASSET'; readonly fromAsset: Asset }

export function readContractIDPreimage(r: XdrReader): ContractIDPreimage {
  beginComposite(r)
  try {
    const type = readContractIDPreimageType(r)
    let result: ContractIDPreimage
    switch (type) {
      case 'CONTRACT_ID_PREIMAGE_FROM_ADDRESS':
        result = { type, fromAddress: readContractIDPreimage_fromAddress(r) }; break
      case 'CONTRACT_ID_PREIMAGE_FROM_ASSET':
        result = { type, fromAsset: readAsset(r) }; break
      default:
        throw new XdrReadError(`Unknown ContractIDPreimage discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeContractIDPreimage(w: XdrWriter, v: ContractIDPreimage): void {
  writeContractIDPreimageType(w, v.type)
  switch (v.type) {
    case 'CONTRACT_ID_PREIMAGE_FROM_ADDRESS':
      writeContractIDPreimage_fromAddress(w, (v as any).fromAddress); break
    case 'CONTRACT_ID_PREIMAGE_FROM_ASSET':
      writeAsset(w, (v as any).fromAsset); break
  }
}

export function encodeContractIDPreimage(v: ContractIDPreimage): Uint8Array {
  return encode(v, writeContractIDPreimage)
}

export function decodeContractIDPreimage(input: Uint8Array | string): ContractIDPreimage {
  return decode(input, readContractIDPreimage)
}

export function toJsonContractIDPreimage(v: ContractIDPreimage): unknown {
  switch (v.type) {
    case 'CONTRACT_ID_PREIMAGE_FROM_ADDRESS':
      return { 'address': toJsonContractIDPreimage_fromAddress((v as any).fromAddress) }
    case 'CONTRACT_ID_PREIMAGE_FROM_ASSET':
      return { 'asset': toJsonAsset((v as any).fromAsset) }
  }
}

export function fromJsonContractIDPreimage(json: unknown): ContractIDPreimage {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for ContractIDPreimage: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'address':
      return { type: 'CONTRACT_ID_PREIMAGE_FROM_ADDRESS', fromAddress: fromJsonContractIDPreimage_fromAddress(obj[key]) } as ContractIDPreimage
    case 'asset':
      return { type: 'CONTRACT_ID_PREIMAGE_FROM_ASSET', fromAsset: fromJsonAsset(obj[key]) } as ContractIDPreimage
    default: throw new Error(`Unknown ContractIDPreimage variant: ${key}`)
  }
}

export interface CreateContractArgs {
  readonly contractIDPreimage: ContractIDPreimage
  readonly executable: ContractExecutable
}

export function readCreateContractArgs(r: XdrReader): CreateContractArgs {
  beginComposite(r)
  try {
    const contractIDPreimage = readContractIDPreimage(r)
    const executable = readContractExecutable(r)
    return { contractIDPreimage, executable }
  } finally {
    endComposite(r)
  }
}

export function writeCreateContractArgs(w: XdrWriter, v: CreateContractArgs): void {
  writeContractIDPreimage(w, v.contractIDPreimage)
  writeContractExecutable(w, v.executable)
}

export function encodeCreateContractArgs(v: CreateContractArgs): Uint8Array {
  return encode(v, writeCreateContractArgs)
}

export function decodeCreateContractArgs(input: Uint8Array | string): CreateContractArgs {
  return decode(input, readCreateContractArgs)
}

export function toJsonCreateContractArgs(v: CreateContractArgs): Record<string, unknown> {
  return {
    'contract_id_preimage': toJsonContractIDPreimage(v.contractIDPreimage),
    'executable': toJsonContractExecutable(v.executable),
  }
}

export function fromJsonCreateContractArgs(json: unknown): CreateContractArgs {
  const o = json as Record<string, unknown>
  return {
    contractIDPreimage: fromJsonContractIDPreimage(o['contract_id_preimage']),
    executable: fromJsonContractExecutable(o['executable']),
  }
}

export interface CreateContractArgsV2 {
  readonly contractIDPreimage: ContractIDPreimage
  readonly executable: ContractExecutable
  /** Arguments of the contract's constructor. */
  readonly constructorArgs: SCVal[]
}

export function readCreateContractArgsV2(r: XdrReader): CreateContractArgsV2 {
  beginComposite(r)
  try {
    const contractIDPreimage = readContractIDPreimage(r)
    const executable = readContractExecutable(r)
    const constructorArgs = readVarArray(r, UINT32_MAX, readSCVal)
    return { contractIDPreimage, executable, constructorArgs }
  } finally {
    endComposite(r)
  }
}

export function writeCreateContractArgsV2(w: XdrWriter, v: CreateContractArgsV2): void {
  writeContractIDPreimage(w, v.contractIDPreimage)
  writeContractExecutable(w, v.executable)
  writeVarArray(w, v.constructorArgs, UINT32_MAX, writeSCVal)
}

export function encodeCreateContractArgsV2(v: CreateContractArgsV2): Uint8Array {
  return encode(v, writeCreateContractArgsV2)
}

export function decodeCreateContractArgsV2(input: Uint8Array | string): CreateContractArgsV2 {
  return decode(input, readCreateContractArgsV2)
}

export function toJsonCreateContractArgsV2(v: CreateContractArgsV2): Record<string, unknown> {
  return {
    'contract_id_preimage': toJsonContractIDPreimage(v.contractIDPreimage),
    'executable': toJsonContractExecutable(v.executable),
    'constructor_args': v.constructorArgs.map((item: any) => toJsonSCVal(item)),
  }
}

export function fromJsonCreateContractArgsV2(json: unknown): CreateContractArgsV2 {
  const o = json as Record<string, unknown>
  return {
    contractIDPreimage: fromJsonContractIDPreimage(o['contract_id_preimage']),
    executable: fromJsonContractExecutable(o['executable']),
    constructorArgs: ((o['constructor_args']) as unknown[]).map((item: unknown) => fromJsonSCVal(item)),
  }
}

export interface InvokeContractArgs {
  readonly contractAddress: SCAddress
  readonly functionName: SCSymbol
  readonly args: SCVal[]
}

export function readInvokeContractArgs(r: XdrReader): InvokeContractArgs {
  beginComposite(r)
  try {
    const contractAddress = readSCAddress(r)
    const functionName = readSCSymbol(r)
    const args = readVarArray(r, UINT32_MAX, readSCVal)
    return { contractAddress, functionName, args }
  } finally {
    endComposite(r)
  }
}

export function writeInvokeContractArgs(w: XdrWriter, v: InvokeContractArgs): void {
  writeSCAddress(w, v.contractAddress)
  writeSCSymbol(w, v.functionName)
  writeVarArray(w, v.args, UINT32_MAX, writeSCVal)
}

export function encodeInvokeContractArgs(v: InvokeContractArgs): Uint8Array {
  return encode(v, writeInvokeContractArgs)
}

export function decodeInvokeContractArgs(input: Uint8Array | string): InvokeContractArgs {
  return decode(input, readInvokeContractArgs)
}

export function toJsonInvokeContractArgs(v: InvokeContractArgs): Record<string, unknown> {
  return {
    'contract_address': toJsonSCAddress(v.contractAddress),
    'function_name': toJsonSCSymbol(v.functionName),
    'args': v.args.map((item: any) => toJsonSCVal(item)),
  }
}

export function fromJsonInvokeContractArgs(json: unknown): InvokeContractArgs {
  const o = json as Record<string, unknown>
  return {
    contractAddress: fromJsonSCAddress(o['contract_address']),
    functionName: fromJsonSCSymbol(o['function_name']),
    args: ((o['args']) as unknown[]).map((item: unknown) => fromJsonSCVal(item)),
  }
}

export type HostFunction =
  | { readonly type: 'HOST_FUNCTION_TYPE_INVOKE_CONTRACT'; readonly invokeContract: InvokeContractArgs }
  | { readonly type: 'HOST_FUNCTION_TYPE_CREATE_CONTRACT'; readonly createContract: CreateContractArgs }
  | { readonly type: 'HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM'; readonly wasm: Uint8Array }
  | { readonly type: 'HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2'; readonly createContractV2: CreateContractArgsV2 }

export function readHostFunction(r: XdrReader): HostFunction {
  beginComposite(r)
  try {
    const type = readHostFunctionType(r)
    let result: HostFunction
    switch (type) {
      case 'HOST_FUNCTION_TYPE_INVOKE_CONTRACT':
        result = { type, invokeContract: readInvokeContractArgs(r) }; break
      case 'HOST_FUNCTION_TYPE_CREATE_CONTRACT':
        result = { type, createContract: readCreateContractArgs(r) }; break
      case 'HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM':
        result = { type, wasm: readVarOpaque(r, UINT32_MAX) }; break
      case 'HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2':
        result = { type, createContractV2: readCreateContractArgsV2(r) }; break
      default:
        throw new XdrReadError(`Unknown HostFunction discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeHostFunction(w: XdrWriter, v: HostFunction): void {
  writeHostFunctionType(w, v.type)
  switch (v.type) {
    case 'HOST_FUNCTION_TYPE_INVOKE_CONTRACT':
      writeInvokeContractArgs(w, (v as any).invokeContract); break
    case 'HOST_FUNCTION_TYPE_CREATE_CONTRACT':
      writeCreateContractArgs(w, (v as any).createContract); break
    case 'HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM':
      writeVarOpaque(w, (v as any).wasm, UINT32_MAX); break
    case 'HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2':
      writeCreateContractArgsV2(w, (v as any).createContractV2); break
  }
}

export function encodeHostFunction(v: HostFunction): Uint8Array {
  return encode(v, writeHostFunction)
}

export function decodeHostFunction(input: Uint8Array | string): HostFunction {
  return decode(input, readHostFunction)
}

export function toJsonHostFunction(v: HostFunction): unknown {
  switch (v.type) {
    case 'HOST_FUNCTION_TYPE_INVOKE_CONTRACT':
      return { 'invoke_contract': toJsonInvokeContractArgs((v as any).invokeContract) }
    case 'HOST_FUNCTION_TYPE_CREATE_CONTRACT':
      return { 'create_contract': toJsonCreateContractArgs((v as any).createContract) }
    case 'HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM':
      return { 'upload_contract_wasm': bytesToHex((v as any).wasm) }
    case 'HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2':
      return { 'create_contract_v2': toJsonCreateContractArgsV2((v as any).createContractV2) }
  }
}

export function fromJsonHostFunction(json: unknown): HostFunction {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for HostFunction: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'invoke_contract':
      return { type: 'HOST_FUNCTION_TYPE_INVOKE_CONTRACT', invokeContract: fromJsonInvokeContractArgs(obj[key]) } as HostFunction
    case 'create_contract':
      return { type: 'HOST_FUNCTION_TYPE_CREATE_CONTRACT', createContract: fromJsonCreateContractArgs(obj[key]) } as HostFunction
    case 'upload_contract_wasm':
      return { type: 'HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM', wasm: hexToBytes((obj[key]) as string) } as HostFunction
    case 'create_contract_v2':
      return { type: 'HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2', createContractV2: fromJsonCreateContractArgsV2(obj[key]) } as HostFunction
    default: throw new Error(`Unknown HostFunction variant: ${key}`)
  }
}

export type SorobanAuthorizedFunctionType =
  | 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN'
  | 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN'
  | 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN'

export const SOROBAN_AUTHORIZED_FUNCTION_TYPE_TO_INT: Record<SorobanAuthorizedFunctionType, number> = /*#__PURE__*/ {
  SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN: 0,
  SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN: 1,
  SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN: 2,
}

export const SOROBAN_AUTHORIZED_FUNCTION_TYPE_FROM_INT: Record<number, SorobanAuthorizedFunctionType> = /*#__PURE__*/ {
  0: 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN',
  1: 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN',
  2: 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN',
}

export function readSorobanAuthorizedFunctionType(r: XdrReader): SorobanAuthorizedFunctionType {
  const v = readInt32(r)
  const result = SOROBAN_AUTHORIZED_FUNCTION_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SorobanAuthorizedFunctionType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSorobanAuthorizedFunctionType(w: XdrWriter, v: SorobanAuthorizedFunctionType): void {
  writeInt32(w, SOROBAN_AUTHORIZED_FUNCTION_TYPE_TO_INT[v])
}

export function encodeSorobanAuthorizedFunctionType(v: SorobanAuthorizedFunctionType): Uint8Array {
  return encode(v, writeSorobanAuthorizedFunctionType)
}

export function decodeSorobanAuthorizedFunctionType(input: Uint8Array | string): SorobanAuthorizedFunctionType {
  return decode(input, readSorobanAuthorizedFunctionType)
}

const _SOROBAN_AUTHORIZED_FUNCTION_TYPE_TO_JSON: Record<SorobanAuthorizedFunctionType, string> = /*#__PURE__*/ {
  SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN: 'contract_fn',
  SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN: 'create_contract_host_fn',
  SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN: 'create_contract_v2_host_fn',
}

const _SOROBAN_AUTHORIZED_FUNCTION_TYPE_FROM_JSON: Record<string, SorobanAuthorizedFunctionType> = /*#__PURE__*/ {
  'contract_fn': 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN',
  'create_contract_host_fn': 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN',
  'create_contract_v2_host_fn': 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN',
}

export function toJsonSorobanAuthorizedFunctionType(v: SorobanAuthorizedFunctionType): string {
  return _SOROBAN_AUTHORIZED_FUNCTION_TYPE_TO_JSON[v]
}

export function fromJsonSorobanAuthorizedFunctionType(json: unknown): SorobanAuthorizedFunctionType {
  const result = _SOROBAN_AUTHORIZED_FUNCTION_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SorobanAuthorizedFunctionType JSON value: ${json}`)
  return result
}

export type SorobanAuthorizedFunction =
  | { readonly type: 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN'; readonly contractFn: InvokeContractArgs }
  | { readonly type: 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN'; readonly createContractHostFn: CreateContractArgs }
  | { readonly type: 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN'; readonly createContractV2HostFn: CreateContractArgsV2 }

export function readSorobanAuthorizedFunction(r: XdrReader): SorobanAuthorizedFunction {
  beginComposite(r)
  try {
    const type = readSorobanAuthorizedFunctionType(r)
    let result: SorobanAuthorizedFunction
    switch (type) {
      case 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN':
        result = { type, contractFn: readInvokeContractArgs(r) }; break
      case 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN':
        result = { type, createContractHostFn: readCreateContractArgs(r) }; break
      case 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN':
        result = { type, createContractV2HostFn: readCreateContractArgsV2(r) }; break
      default:
        throw new XdrReadError(`Unknown SorobanAuthorizedFunction discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSorobanAuthorizedFunction(w: XdrWriter, v: SorobanAuthorizedFunction): void {
  writeSorobanAuthorizedFunctionType(w, v.type)
  switch (v.type) {
    case 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN':
      writeInvokeContractArgs(w, (v as any).contractFn); break
    case 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN':
      writeCreateContractArgs(w, (v as any).createContractHostFn); break
    case 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN':
      writeCreateContractArgsV2(w, (v as any).createContractV2HostFn); break
  }
}

export function encodeSorobanAuthorizedFunction(v: SorobanAuthorizedFunction): Uint8Array {
  return encode(v, writeSorobanAuthorizedFunction)
}

export function decodeSorobanAuthorizedFunction(input: Uint8Array | string): SorobanAuthorizedFunction {
  return decode(input, readSorobanAuthorizedFunction)
}

export function toJsonSorobanAuthorizedFunction(v: SorobanAuthorizedFunction): unknown {
  switch (v.type) {
    case 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN':
      return { 'contract_fn': toJsonInvokeContractArgs((v as any).contractFn) }
    case 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN':
      return { 'create_contract_host_fn': toJsonCreateContractArgs((v as any).createContractHostFn) }
    case 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN':
      return { 'create_contract_v2_host_fn': toJsonCreateContractArgsV2((v as any).createContractV2HostFn) }
  }
}

export function fromJsonSorobanAuthorizedFunction(json: unknown): SorobanAuthorizedFunction {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for SorobanAuthorizedFunction: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'contract_fn':
      return { type: 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN', contractFn: fromJsonInvokeContractArgs(obj[key]) } as SorobanAuthorizedFunction
    case 'create_contract_host_fn':
      return { type: 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN', createContractHostFn: fromJsonCreateContractArgs(obj[key]) } as SorobanAuthorizedFunction
    case 'create_contract_v2_host_fn':
      return { type: 'SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN', createContractV2HostFn: fromJsonCreateContractArgsV2(obj[key]) } as SorobanAuthorizedFunction
    default: throw new Error(`Unknown SorobanAuthorizedFunction variant: ${key}`)
  }
}

export interface SorobanAuthorizedInvocation {
  readonly function: SorobanAuthorizedFunction
  readonly subInvocations: SorobanAuthorizedInvocation[]
}

export function readSorobanAuthorizedInvocation(r: XdrReader): SorobanAuthorizedInvocation {
  beginComposite(r)
  try {
    const function_ = readSorobanAuthorizedFunction(r)
    const subInvocations = readVarArray(r, UINT32_MAX, readSorobanAuthorizedInvocation)
    return { function: function_, subInvocations }
  } finally {
    endComposite(r)
  }
}

export function writeSorobanAuthorizedInvocation(w: XdrWriter, v: SorobanAuthorizedInvocation): void {
  writeSorobanAuthorizedFunction(w, v.function)
  writeVarArray(w, v.subInvocations, UINT32_MAX, writeSorobanAuthorizedInvocation)
}

export function encodeSorobanAuthorizedInvocation(v: SorobanAuthorizedInvocation): Uint8Array {
  return encode(v, writeSorobanAuthorizedInvocation)
}

export function decodeSorobanAuthorizedInvocation(input: Uint8Array | string): SorobanAuthorizedInvocation {
  return decode(input, readSorobanAuthorizedInvocation)
}

export function toJsonSorobanAuthorizedInvocation(v: SorobanAuthorizedInvocation): Record<string, unknown> {
  return {
    'function': toJsonSorobanAuthorizedFunction(v.function),
    'sub_invocations': v.subInvocations.map((item: any) => toJsonSorobanAuthorizedInvocation(item)),
  }
}

export function fromJsonSorobanAuthorizedInvocation(json: unknown): SorobanAuthorizedInvocation {
  const o = json as Record<string, unknown>
  return {
    function: fromJsonSorobanAuthorizedFunction(o['function']),
    subInvocations: ((o['sub_invocations']) as unknown[]).map((item: unknown) => fromJsonSorobanAuthorizedInvocation(item)),
  }
}

export interface SorobanAddressCredentials {
  readonly address: SCAddress
  readonly nonce: int64
  readonly signatureExpirationLedger: uint32
  readonly signature: SCVal
}

export function readSorobanAddressCredentials(r: XdrReader): SorobanAddressCredentials {
  beginComposite(r)
  try {
    const address = readSCAddress(r)
    const nonce = readint64(r)
    const signatureExpirationLedger = readuint32(r)
    const signature = readSCVal(r)
    return { address, nonce, signatureExpirationLedger, signature }
  } finally {
    endComposite(r)
  }
}

export function writeSorobanAddressCredentials(w: XdrWriter, v: SorobanAddressCredentials): void {
  writeSCAddress(w, v.address)
  writeint64(w, v.nonce)
  writeuint32(w, v.signatureExpirationLedger)
  writeSCVal(w, v.signature)
}

export function encodeSorobanAddressCredentials(v: SorobanAddressCredentials): Uint8Array {
  return encode(v, writeSorobanAddressCredentials)
}

export function decodeSorobanAddressCredentials(input: Uint8Array | string): SorobanAddressCredentials {
  return decode(input, readSorobanAddressCredentials)
}

export function toJsonSorobanAddressCredentials(v: SorobanAddressCredentials): Record<string, unknown> {
  return {
    'address': toJsonSCAddress(v.address),
    'nonce': toJsonint64(v.nonce),
    'signature_expiration_ledger': toJsonuint32(v.signatureExpirationLedger),
    'signature': toJsonSCVal(v.signature),
  }
}

export function fromJsonSorobanAddressCredentials(json: unknown): SorobanAddressCredentials {
  const o = json as Record<string, unknown>
  return {
    address: fromJsonSCAddress(o['address']),
    nonce: fromJsonint64(o['nonce']),
    signatureExpirationLedger: fromJsonuint32(o['signature_expiration_ledger']),
    signature: fromJsonSCVal(o['signature']),
  }
}

export type SorobanCredentialsType =
  | 'SOROBAN_CREDENTIALS_SOURCE_ACCOUNT'
  | 'SOROBAN_CREDENTIALS_ADDRESS'

export const SOROBAN_CREDENTIALS_TYPE_TO_INT: Record<SorobanCredentialsType, number> = /*#__PURE__*/ {
  SOROBAN_CREDENTIALS_SOURCE_ACCOUNT: 0,
  SOROBAN_CREDENTIALS_ADDRESS: 1,
}

export const SOROBAN_CREDENTIALS_TYPE_FROM_INT: Record<number, SorobanCredentialsType> = /*#__PURE__*/ {
  0: 'SOROBAN_CREDENTIALS_SOURCE_ACCOUNT',
  1: 'SOROBAN_CREDENTIALS_ADDRESS',
}

export function readSorobanCredentialsType(r: XdrReader): SorobanCredentialsType {
  const v = readInt32(r)
  const result = SOROBAN_CREDENTIALS_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SorobanCredentialsType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSorobanCredentialsType(w: XdrWriter, v: SorobanCredentialsType): void {
  writeInt32(w, SOROBAN_CREDENTIALS_TYPE_TO_INT[v])
}

export function encodeSorobanCredentialsType(v: SorobanCredentialsType): Uint8Array {
  return encode(v, writeSorobanCredentialsType)
}

export function decodeSorobanCredentialsType(input: Uint8Array | string): SorobanCredentialsType {
  return decode(input, readSorobanCredentialsType)
}

const _SOROBAN_CREDENTIALS_TYPE_TO_JSON: Record<SorobanCredentialsType, string> = /*#__PURE__*/ {
  SOROBAN_CREDENTIALS_SOURCE_ACCOUNT: 'source_account',
  SOROBAN_CREDENTIALS_ADDRESS: 'address',
}

const _SOROBAN_CREDENTIALS_TYPE_FROM_JSON: Record<string, SorobanCredentialsType> = /*#__PURE__*/ {
  'source_account': 'SOROBAN_CREDENTIALS_SOURCE_ACCOUNT',
  'address': 'SOROBAN_CREDENTIALS_ADDRESS',
}

export function toJsonSorobanCredentialsType(v: SorobanCredentialsType): string {
  return _SOROBAN_CREDENTIALS_TYPE_TO_JSON[v]
}

export function fromJsonSorobanCredentialsType(json: unknown): SorobanCredentialsType {
  const result = _SOROBAN_CREDENTIALS_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SorobanCredentialsType JSON value: ${json}`)
  return result
}

export type SorobanCredentials =
  | { readonly type: 'SOROBAN_CREDENTIALS_SOURCE_ACCOUNT' }
  | { readonly type: 'SOROBAN_CREDENTIALS_ADDRESS'; readonly address: SorobanAddressCredentials }

export function readSorobanCredentials(r: XdrReader): SorobanCredentials {
  beginComposite(r)
  try {
    const type = readSorobanCredentialsType(r)
    let result: SorobanCredentials
    switch (type) {
      case 'SOROBAN_CREDENTIALS_SOURCE_ACCOUNT':
        result = { type }; break
      case 'SOROBAN_CREDENTIALS_ADDRESS':
        result = { type, address: readSorobanAddressCredentials(r) }; break
      default:
        throw new XdrReadError(`Unknown SorobanCredentials discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSorobanCredentials(w: XdrWriter, v: SorobanCredentials): void {
  writeSorobanCredentialsType(w, v.type)
  switch (v.type) {
    case 'SOROBAN_CREDENTIALS_SOURCE_ACCOUNT':
      break
    case 'SOROBAN_CREDENTIALS_ADDRESS':
      writeSorobanAddressCredentials(w, (v as any).address); break
  }
}

export function encodeSorobanCredentials(v: SorobanCredentials): Uint8Array {
  return encode(v, writeSorobanCredentials)
}

export function decodeSorobanCredentials(input: Uint8Array | string): SorobanCredentials {
  return decode(input, readSorobanCredentials)
}

export function toJsonSorobanCredentials(v: SorobanCredentials): unknown {
  switch (v.type) {
    case 'SOROBAN_CREDENTIALS_SOURCE_ACCOUNT':
      return 'source_account'
    case 'SOROBAN_CREDENTIALS_ADDRESS':
      return { 'address': toJsonSorobanAddressCredentials((v as any).address) }
  }
}

export function fromJsonSorobanCredentials(json: unknown): SorobanCredentials {
  if (typeof json === 'string') {
    if (json === 'source_account') return { type: 'SOROBAN_CREDENTIALS_SOURCE_ACCOUNT' } as SorobanCredentials
    throw new Error(`Unknown SorobanCredentials variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'address':
      return { type: 'SOROBAN_CREDENTIALS_ADDRESS', address: fromJsonSorobanAddressCredentials(obj[key]) } as SorobanCredentials
    default: throw new Error(`Unknown SorobanCredentials variant: ${key}`)
  }
}

/**
 * Unit of authorization data for Soroban.
 * 
 * Represents an authorization for executing the tree of authorized contract 
 * and/or host function calls by the user defined by `credentials`.
 */
export interface SorobanAuthorizationEntry {
  readonly credentials: SorobanCredentials
  readonly rootInvocation: SorobanAuthorizedInvocation
}

export function readSorobanAuthorizationEntry(r: XdrReader): SorobanAuthorizationEntry {
  beginComposite(r)
  try {
    const credentials = readSorobanCredentials(r)
    const rootInvocation = readSorobanAuthorizedInvocation(r)
    return { credentials, rootInvocation }
  } finally {
    endComposite(r)
  }
}

export function writeSorobanAuthorizationEntry(w: XdrWriter, v: SorobanAuthorizationEntry): void {
  writeSorobanCredentials(w, v.credentials)
  writeSorobanAuthorizedInvocation(w, v.rootInvocation)
}

export function encodeSorobanAuthorizationEntry(v: SorobanAuthorizationEntry): Uint8Array {
  return encode(v, writeSorobanAuthorizationEntry)
}

export function decodeSorobanAuthorizationEntry(input: Uint8Array | string): SorobanAuthorizationEntry {
  return decode(input, readSorobanAuthorizationEntry)
}

export function toJsonSorobanAuthorizationEntry(v: SorobanAuthorizationEntry): Record<string, unknown> {
  return {
    'credentials': toJsonSorobanCredentials(v.credentials),
    'root_invocation': toJsonSorobanAuthorizedInvocation(v.rootInvocation),
  }
}

export function fromJsonSorobanAuthorizationEntry(json: unknown): SorobanAuthorizationEntry {
  const o = json as Record<string, unknown>
  return {
    credentials: fromJsonSorobanCredentials(o['credentials']),
    rootInvocation: fromJsonSorobanAuthorizedInvocation(o['root_invocation']),
  }
}

export type SorobanAuthorizationEntries = SorobanAuthorizationEntry[]

export function readSorobanAuthorizationEntries(r: XdrReader): SorobanAuthorizationEntries {
  return readVarArray(r, UINT32_MAX, readSorobanAuthorizationEntry)
}

export function writeSorobanAuthorizationEntries(w: XdrWriter, v: SorobanAuthorizationEntries): void {
  writeVarArray(w, v, UINT32_MAX, writeSorobanAuthorizationEntry)
}

export function encodeSorobanAuthorizationEntries(v: SorobanAuthorizationEntries): Uint8Array {
  return encode(v, writeSorobanAuthorizationEntries)
}

export function decodeSorobanAuthorizationEntries(input: Uint8Array | string): SorobanAuthorizationEntries {
  return decode(input, readSorobanAuthorizationEntries)
}

export function toJsonSorobanAuthorizationEntries(v: SorobanAuthorizationEntries): unknown {
  return v.map((item: any) => toJsonSorobanAuthorizationEntry(item))
}

export function fromJsonSorobanAuthorizationEntries(json: unknown): SorobanAuthorizationEntries {
  return ((json) as unknown[]).map((item: unknown) => fromJsonSorobanAuthorizationEntry(item))
}

/**
 * Upload Wasm, create, and invoke contracts in Soroban.
 * 
 * Threshold: med
 * Result: InvokeHostFunctionResult
 */
export interface InvokeHostFunctionOp {
  /** Host function to invoke. */
  readonly hostFunction: HostFunction
  /** Per-address authorizations for this host function. */
  readonly auth: SorobanAuthorizationEntry[]
}

export function readInvokeHostFunctionOp(r: XdrReader): InvokeHostFunctionOp {
  beginComposite(r)
  try {
    const hostFunction = readHostFunction(r)
    const auth = readVarArray(r, UINT32_MAX, readSorobanAuthorizationEntry)
    return { hostFunction, auth }
  } finally {
    endComposite(r)
  }
}

export function writeInvokeHostFunctionOp(w: XdrWriter, v: InvokeHostFunctionOp): void {
  writeHostFunction(w, v.hostFunction)
  writeVarArray(w, v.auth, UINT32_MAX, writeSorobanAuthorizationEntry)
}

export function encodeInvokeHostFunctionOp(v: InvokeHostFunctionOp): Uint8Array {
  return encode(v, writeInvokeHostFunctionOp)
}

export function decodeInvokeHostFunctionOp(input: Uint8Array | string): InvokeHostFunctionOp {
  return decode(input, readInvokeHostFunctionOp)
}

export function toJsonInvokeHostFunctionOp(v: InvokeHostFunctionOp): Record<string, unknown> {
  return {
    'host_function': toJsonHostFunction(v.hostFunction),
    'auth': v.auth.map((item: any) => toJsonSorobanAuthorizationEntry(item)),
  }
}

export function fromJsonInvokeHostFunctionOp(json: unknown): InvokeHostFunctionOp {
  const o = json as Record<string, unknown>
  return {
    hostFunction: fromJsonHostFunction(o['host_function']),
    auth: ((o['auth']) as unknown[]).map((item: unknown) => fromJsonSorobanAuthorizationEntry(item)),
  }
}

/**
 * Extend the TTL of the entries specified in the readOnly footprint
 * so they will live at least extendTo ledgers from lcl.
 * 
 * Threshold: low
 * Result: ExtendFootprintTTLResult
 */
export interface ExtendFootprintTTLOp {
  readonly ext: ExtensionPoint
  readonly extendTo: uint32
}

export function readExtendFootprintTTLOp(r: XdrReader): ExtendFootprintTTLOp {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    const extendTo = readuint32(r)
    return { ext, extendTo }
  } finally {
    endComposite(r)
  }
}

export function writeExtendFootprintTTLOp(w: XdrWriter, v: ExtendFootprintTTLOp): void {
  writeExtensionPoint(w, v.ext)
  writeuint32(w, v.extendTo)
}

export function encodeExtendFootprintTTLOp(v: ExtendFootprintTTLOp): Uint8Array {
  return encode(v, writeExtendFootprintTTLOp)
}

export function decodeExtendFootprintTTLOp(input: Uint8Array | string): ExtendFootprintTTLOp {
  return decode(input, readExtendFootprintTTLOp)
}

export function toJsonExtendFootprintTTLOp(v: ExtendFootprintTTLOp): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
    'extend_to': toJsonuint32(v.extendTo),
  }
}

export function fromJsonExtendFootprintTTLOp(json: unknown): ExtendFootprintTTLOp {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
    extendTo: fromJsonuint32(o['extend_to']),
  }
}

/**
 * Restore the archived entries specified in the readWrite footprint.
 * 
 * Threshold: low
 * Result: RestoreFootprintOp
 */
export interface RestoreFootprintOp {
  readonly ext: ExtensionPoint
}

export function readRestoreFootprintOp(r: XdrReader): RestoreFootprintOp {
  beginComposite(r)
  try {
    const ext = readExtensionPoint(r)
    return { ext }
  } finally {
    endComposite(r)
  }
}

export function writeRestoreFootprintOp(w: XdrWriter, v: RestoreFootprintOp): void {
  writeExtensionPoint(w, v.ext)
}

export function encodeRestoreFootprintOp(v: RestoreFootprintOp): Uint8Array {
  return encode(v, writeRestoreFootprintOp)
}

export function decodeRestoreFootprintOp(input: Uint8Array | string): RestoreFootprintOp {
  return decode(input, readRestoreFootprintOp)
}

export function toJsonRestoreFootprintOp(v: RestoreFootprintOp): Record<string, unknown> {
  return {
    'ext': toJsonExtensionPoint(v.ext),
  }
}

export function fromJsonRestoreFootprintOp(json: unknown): RestoreFootprintOp {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonExtensionPoint(o['ext']),
  }
}

export type Operation_body =
  | { readonly type: 'CREATE_ACCOUNT'; readonly createAccountOp: CreateAccountOp }
  | { readonly type: 'PAYMENT'; readonly paymentOp: PaymentOp }
  | { readonly type: 'PATH_PAYMENT_STRICT_RECEIVE'; readonly pathPaymentStrictReceiveOp: PathPaymentStrictReceiveOp }
  | { readonly type: 'MANAGE_SELL_OFFER'; readonly manageSellOfferOp: ManageSellOfferOp }
  | { readonly type: 'CREATE_PASSIVE_SELL_OFFER'; readonly createPassiveSellOfferOp: CreatePassiveSellOfferOp }
  | { readonly type: 'SET_OPTIONS'; readonly setOptionsOp: SetOptionsOp }
  | { readonly type: 'CHANGE_TRUST'; readonly changeTrustOp: ChangeTrustOp }
  | { readonly type: 'ALLOW_TRUST'; readonly allowTrustOp: AllowTrustOp }
  | { readonly type: 'ACCOUNT_MERGE'; readonly destination: MuxedAccount }
  | { readonly type: 'INFLATION' }
  | { readonly type: 'MANAGE_DATA'; readonly manageDataOp: ManageDataOp }
  | { readonly type: 'BUMP_SEQUENCE'; readonly bumpSequenceOp: BumpSequenceOp }
  | { readonly type: 'MANAGE_BUY_OFFER'; readonly manageBuyOfferOp: ManageBuyOfferOp }
  | { readonly type: 'PATH_PAYMENT_STRICT_SEND'; readonly pathPaymentStrictSendOp: PathPaymentStrictSendOp }
  | { readonly type: 'CREATE_CLAIMABLE_BALANCE'; readonly createClaimableBalanceOp: CreateClaimableBalanceOp }
  | { readonly type: 'CLAIM_CLAIMABLE_BALANCE'; readonly claimClaimableBalanceOp: ClaimClaimableBalanceOp }
  | { readonly type: 'BEGIN_SPONSORING_FUTURE_RESERVES'; readonly beginSponsoringFutureReservesOp: BeginSponsoringFutureReservesOp }
  | { readonly type: 'END_SPONSORING_FUTURE_RESERVES' }
  | { readonly type: 'REVOKE_SPONSORSHIP'; readonly revokeSponsorshipOp: RevokeSponsorshipOp }
  | { readonly type: 'CLAWBACK'; readonly clawbackOp: ClawbackOp }
  | { readonly type: 'CLAWBACK_CLAIMABLE_BALANCE'; readonly clawbackClaimableBalanceOp: ClawbackClaimableBalanceOp }
  | { readonly type: 'SET_TRUST_LINE_FLAGS'; readonly setTrustLineFlagsOp: SetTrustLineFlagsOp }
  | { readonly type: 'LIQUIDITY_POOL_DEPOSIT'; readonly liquidityPoolDepositOp: LiquidityPoolDepositOp }
  | { readonly type: 'LIQUIDITY_POOL_WITHDRAW'; readonly liquidityPoolWithdrawOp: LiquidityPoolWithdrawOp }
  | { readonly type: 'INVOKE_HOST_FUNCTION'; readonly invokeHostFunctionOp: InvokeHostFunctionOp }
  | { readonly type: 'EXTEND_FOOTPRINT_TTL'; readonly extendFootprintTTLOp: ExtendFootprintTTLOp }
  | { readonly type: 'RESTORE_FOOTPRINT'; readonly restoreFootprintOp: RestoreFootprintOp }

export function readOperation_body(r: XdrReader): Operation_body {
  beginComposite(r)
  try {
    const type = readOperationType(r)
    let result: Operation_body
    switch (type) {
      case 'CREATE_ACCOUNT':
        result = { type, createAccountOp: readCreateAccountOp(r) }; break
      case 'PAYMENT':
        result = { type, paymentOp: readPaymentOp(r) }; break
      case 'PATH_PAYMENT_STRICT_RECEIVE':
        result = { type, pathPaymentStrictReceiveOp: readPathPaymentStrictReceiveOp(r) }; break
      case 'MANAGE_SELL_OFFER':
        result = { type, manageSellOfferOp: readManageSellOfferOp(r) }; break
      case 'CREATE_PASSIVE_SELL_OFFER':
        result = { type, createPassiveSellOfferOp: readCreatePassiveSellOfferOp(r) }; break
      case 'SET_OPTIONS':
        result = { type, setOptionsOp: readSetOptionsOp(r) }; break
      case 'CHANGE_TRUST':
        result = { type, changeTrustOp: readChangeTrustOp(r) }; break
      case 'ALLOW_TRUST':
        result = { type, allowTrustOp: readAllowTrustOp(r) }; break
      case 'ACCOUNT_MERGE':
        result = { type, destination: readMuxedAccount(r) }; break
      case 'INFLATION':
        result = { type }; break
      case 'MANAGE_DATA':
        result = { type, manageDataOp: readManageDataOp(r) }; break
      case 'BUMP_SEQUENCE':
        result = { type, bumpSequenceOp: readBumpSequenceOp(r) }; break
      case 'MANAGE_BUY_OFFER':
        result = { type, manageBuyOfferOp: readManageBuyOfferOp(r) }; break
      case 'PATH_PAYMENT_STRICT_SEND':
        result = { type, pathPaymentStrictSendOp: readPathPaymentStrictSendOp(r) }; break
      case 'CREATE_CLAIMABLE_BALANCE':
        result = { type, createClaimableBalanceOp: readCreateClaimableBalanceOp(r) }; break
      case 'CLAIM_CLAIMABLE_BALANCE':
        result = { type, claimClaimableBalanceOp: readClaimClaimableBalanceOp(r) }; break
      case 'BEGIN_SPONSORING_FUTURE_RESERVES':
        result = { type, beginSponsoringFutureReservesOp: readBeginSponsoringFutureReservesOp(r) }; break
      case 'END_SPONSORING_FUTURE_RESERVES':
        result = { type }; break
      case 'REVOKE_SPONSORSHIP':
        result = { type, revokeSponsorshipOp: readRevokeSponsorshipOp(r) }; break
      case 'CLAWBACK':
        result = { type, clawbackOp: readClawbackOp(r) }; break
      case 'CLAWBACK_CLAIMABLE_BALANCE':
        result = { type, clawbackClaimableBalanceOp: readClawbackClaimableBalanceOp(r) }; break
      case 'SET_TRUST_LINE_FLAGS':
        result = { type, setTrustLineFlagsOp: readSetTrustLineFlagsOp(r) }; break
      case 'LIQUIDITY_POOL_DEPOSIT':
        result = { type, liquidityPoolDepositOp: readLiquidityPoolDepositOp(r) }; break
      case 'LIQUIDITY_POOL_WITHDRAW':
        result = { type, liquidityPoolWithdrawOp: readLiquidityPoolWithdrawOp(r) }; break
      case 'INVOKE_HOST_FUNCTION':
        result = { type, invokeHostFunctionOp: readInvokeHostFunctionOp(r) }; break
      case 'EXTEND_FOOTPRINT_TTL':
        result = { type, extendFootprintTTLOp: readExtendFootprintTTLOp(r) }; break
      case 'RESTORE_FOOTPRINT':
        result = { type, restoreFootprintOp: readRestoreFootprintOp(r) }; break
      default:
        throw new XdrReadError(`Unknown Operation_body discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeOperation_body(w: XdrWriter, v: Operation_body): void {
  writeOperationType(w, v.type)
  switch (v.type) {
    case 'CREATE_ACCOUNT':
      writeCreateAccountOp(w, (v as any).createAccountOp); break
    case 'PAYMENT':
      writePaymentOp(w, (v as any).paymentOp); break
    case 'PATH_PAYMENT_STRICT_RECEIVE':
      writePathPaymentStrictReceiveOp(w, (v as any).pathPaymentStrictReceiveOp); break
    case 'MANAGE_SELL_OFFER':
      writeManageSellOfferOp(w, (v as any).manageSellOfferOp); break
    case 'CREATE_PASSIVE_SELL_OFFER':
      writeCreatePassiveSellOfferOp(w, (v as any).createPassiveSellOfferOp); break
    case 'SET_OPTIONS':
      writeSetOptionsOp(w, (v as any).setOptionsOp); break
    case 'CHANGE_TRUST':
      writeChangeTrustOp(w, (v as any).changeTrustOp); break
    case 'ALLOW_TRUST':
      writeAllowTrustOp(w, (v as any).allowTrustOp); break
    case 'ACCOUNT_MERGE':
      writeMuxedAccount(w, (v as any).destination); break
    case 'INFLATION':
      break
    case 'MANAGE_DATA':
      writeManageDataOp(w, (v as any).manageDataOp); break
    case 'BUMP_SEQUENCE':
      writeBumpSequenceOp(w, (v as any).bumpSequenceOp); break
    case 'MANAGE_BUY_OFFER':
      writeManageBuyOfferOp(w, (v as any).manageBuyOfferOp); break
    case 'PATH_PAYMENT_STRICT_SEND':
      writePathPaymentStrictSendOp(w, (v as any).pathPaymentStrictSendOp); break
    case 'CREATE_CLAIMABLE_BALANCE':
      writeCreateClaimableBalanceOp(w, (v as any).createClaimableBalanceOp); break
    case 'CLAIM_CLAIMABLE_BALANCE':
      writeClaimClaimableBalanceOp(w, (v as any).claimClaimableBalanceOp); break
    case 'BEGIN_SPONSORING_FUTURE_RESERVES':
      writeBeginSponsoringFutureReservesOp(w, (v as any).beginSponsoringFutureReservesOp); break
    case 'END_SPONSORING_FUTURE_RESERVES':
      break
    case 'REVOKE_SPONSORSHIP':
      writeRevokeSponsorshipOp(w, (v as any).revokeSponsorshipOp); break
    case 'CLAWBACK':
      writeClawbackOp(w, (v as any).clawbackOp); break
    case 'CLAWBACK_CLAIMABLE_BALANCE':
      writeClawbackClaimableBalanceOp(w, (v as any).clawbackClaimableBalanceOp); break
    case 'SET_TRUST_LINE_FLAGS':
      writeSetTrustLineFlagsOp(w, (v as any).setTrustLineFlagsOp); break
    case 'LIQUIDITY_POOL_DEPOSIT':
      writeLiquidityPoolDepositOp(w, (v as any).liquidityPoolDepositOp); break
    case 'LIQUIDITY_POOL_WITHDRAW':
      writeLiquidityPoolWithdrawOp(w, (v as any).liquidityPoolWithdrawOp); break
    case 'INVOKE_HOST_FUNCTION':
      writeInvokeHostFunctionOp(w, (v as any).invokeHostFunctionOp); break
    case 'EXTEND_FOOTPRINT_TTL':
      writeExtendFootprintTTLOp(w, (v as any).extendFootprintTTLOp); break
    case 'RESTORE_FOOTPRINT':
      writeRestoreFootprintOp(w, (v as any).restoreFootprintOp); break
  }
}

export function encodeOperation_body(v: Operation_body): Uint8Array {
  return encode(v, writeOperation_body)
}

export function decodeOperation_body(input: Uint8Array | string): Operation_body {
  return decode(input, readOperation_body)
}

export function toJsonOperation_body(v: Operation_body): unknown {
  switch (v.type) {
    case 'CREATE_ACCOUNT':
      return { 'create_account': toJsonCreateAccountOp((v as any).createAccountOp) }
    case 'PAYMENT':
      return { 'payment': toJsonPaymentOp((v as any).paymentOp) }
    case 'PATH_PAYMENT_STRICT_RECEIVE':
      return { 'path_payment_strict_receive': toJsonPathPaymentStrictReceiveOp((v as any).pathPaymentStrictReceiveOp) }
    case 'MANAGE_SELL_OFFER':
      return { 'manage_sell_offer': toJsonManageSellOfferOp((v as any).manageSellOfferOp) }
    case 'CREATE_PASSIVE_SELL_OFFER':
      return { 'create_passive_sell_offer': toJsonCreatePassiveSellOfferOp((v as any).createPassiveSellOfferOp) }
    case 'SET_OPTIONS':
      return { 'set_options': toJsonSetOptionsOp((v as any).setOptionsOp) }
    case 'CHANGE_TRUST':
      return { 'change_trust': toJsonChangeTrustOp((v as any).changeTrustOp) }
    case 'ALLOW_TRUST':
      return { 'allow_trust': toJsonAllowTrustOp((v as any).allowTrustOp) }
    case 'ACCOUNT_MERGE':
      return { 'account_merge': toJsonMuxedAccount((v as any).destination) }
    case 'INFLATION':
      return 'inflation'
    case 'MANAGE_DATA':
      return { 'manage_data': toJsonManageDataOp((v as any).manageDataOp) }
    case 'BUMP_SEQUENCE':
      return { 'bump_sequence': toJsonBumpSequenceOp((v as any).bumpSequenceOp) }
    case 'MANAGE_BUY_OFFER':
      return { 'manage_buy_offer': toJsonManageBuyOfferOp((v as any).manageBuyOfferOp) }
    case 'PATH_PAYMENT_STRICT_SEND':
      return { 'path_payment_strict_send': toJsonPathPaymentStrictSendOp((v as any).pathPaymentStrictSendOp) }
    case 'CREATE_CLAIMABLE_BALANCE':
      return { 'create_claimable_balance': toJsonCreateClaimableBalanceOp((v as any).createClaimableBalanceOp) }
    case 'CLAIM_CLAIMABLE_BALANCE':
      return { 'claim_claimable_balance': toJsonClaimClaimableBalanceOp((v as any).claimClaimableBalanceOp) }
    case 'BEGIN_SPONSORING_FUTURE_RESERVES':
      return { 'begin_sponsoring_future_reserves': toJsonBeginSponsoringFutureReservesOp((v as any).beginSponsoringFutureReservesOp) }
    case 'END_SPONSORING_FUTURE_RESERVES':
      return 'end_sponsoring_future_reserves'
    case 'REVOKE_SPONSORSHIP':
      return { 'revoke_sponsorship': toJsonRevokeSponsorshipOp((v as any).revokeSponsorshipOp) }
    case 'CLAWBACK':
      return { 'clawback': toJsonClawbackOp((v as any).clawbackOp) }
    case 'CLAWBACK_CLAIMABLE_BALANCE':
      return { 'clawback_claimable_balance': toJsonClawbackClaimableBalanceOp((v as any).clawbackClaimableBalanceOp) }
    case 'SET_TRUST_LINE_FLAGS':
      return { 'set_trust_line_flags': toJsonSetTrustLineFlagsOp((v as any).setTrustLineFlagsOp) }
    case 'LIQUIDITY_POOL_DEPOSIT':
      return { 'liquidity_pool_deposit': toJsonLiquidityPoolDepositOp((v as any).liquidityPoolDepositOp) }
    case 'LIQUIDITY_POOL_WITHDRAW':
      return { 'liquidity_pool_withdraw': toJsonLiquidityPoolWithdrawOp((v as any).liquidityPoolWithdrawOp) }
    case 'INVOKE_HOST_FUNCTION':
      return { 'invoke_host_function': toJsonInvokeHostFunctionOp((v as any).invokeHostFunctionOp) }
    case 'EXTEND_FOOTPRINT_TTL':
      return { 'extend_footprint_ttl': toJsonExtendFootprintTTLOp((v as any).extendFootprintTTLOp) }
    case 'RESTORE_FOOTPRINT':
      return { 'restore_footprint': toJsonRestoreFootprintOp((v as any).restoreFootprintOp) }
  }
}

export function fromJsonOperation_body(json: unknown): Operation_body {
  if (typeof json === 'string') {
    if (json === 'inflation') return { type: 'INFLATION' } as Operation_body
    if (json === 'end_sponsoring_future_reserves') return { type: 'END_SPONSORING_FUTURE_RESERVES' } as Operation_body
    throw new Error(`Unknown Operation_body variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'create_account':
      return { type: 'CREATE_ACCOUNT', createAccountOp: fromJsonCreateAccountOp(obj[key]) } as Operation_body
    case 'payment':
      return { type: 'PAYMENT', paymentOp: fromJsonPaymentOp(obj[key]) } as Operation_body
    case 'path_payment_strict_receive':
      return { type: 'PATH_PAYMENT_STRICT_RECEIVE', pathPaymentStrictReceiveOp: fromJsonPathPaymentStrictReceiveOp(obj[key]) } as Operation_body
    case 'manage_sell_offer':
      return { type: 'MANAGE_SELL_OFFER', manageSellOfferOp: fromJsonManageSellOfferOp(obj[key]) } as Operation_body
    case 'create_passive_sell_offer':
      return { type: 'CREATE_PASSIVE_SELL_OFFER', createPassiveSellOfferOp: fromJsonCreatePassiveSellOfferOp(obj[key]) } as Operation_body
    case 'set_options':
      return { type: 'SET_OPTIONS', setOptionsOp: fromJsonSetOptionsOp(obj[key]) } as Operation_body
    case 'change_trust':
      return { type: 'CHANGE_TRUST', changeTrustOp: fromJsonChangeTrustOp(obj[key]) } as Operation_body
    case 'allow_trust':
      return { type: 'ALLOW_TRUST', allowTrustOp: fromJsonAllowTrustOp(obj[key]) } as Operation_body
    case 'account_merge':
      return { type: 'ACCOUNT_MERGE', destination: fromJsonMuxedAccount(obj[key]) } as Operation_body
    case 'manage_data':
      return { type: 'MANAGE_DATA', manageDataOp: fromJsonManageDataOp(obj[key]) } as Operation_body
    case 'bump_sequence':
      return { type: 'BUMP_SEQUENCE', bumpSequenceOp: fromJsonBumpSequenceOp(obj[key]) } as Operation_body
    case 'manage_buy_offer':
      return { type: 'MANAGE_BUY_OFFER', manageBuyOfferOp: fromJsonManageBuyOfferOp(obj[key]) } as Operation_body
    case 'path_payment_strict_send':
      return { type: 'PATH_PAYMENT_STRICT_SEND', pathPaymentStrictSendOp: fromJsonPathPaymentStrictSendOp(obj[key]) } as Operation_body
    case 'create_claimable_balance':
      return { type: 'CREATE_CLAIMABLE_BALANCE', createClaimableBalanceOp: fromJsonCreateClaimableBalanceOp(obj[key]) } as Operation_body
    case 'claim_claimable_balance':
      return { type: 'CLAIM_CLAIMABLE_BALANCE', claimClaimableBalanceOp: fromJsonClaimClaimableBalanceOp(obj[key]) } as Operation_body
    case 'begin_sponsoring_future_reserves':
      return { type: 'BEGIN_SPONSORING_FUTURE_RESERVES', beginSponsoringFutureReservesOp: fromJsonBeginSponsoringFutureReservesOp(obj[key]) } as Operation_body
    case 'revoke_sponsorship':
      return { type: 'REVOKE_SPONSORSHIP', revokeSponsorshipOp: fromJsonRevokeSponsorshipOp(obj[key]) } as Operation_body
    case 'clawback':
      return { type: 'CLAWBACK', clawbackOp: fromJsonClawbackOp(obj[key]) } as Operation_body
    case 'clawback_claimable_balance':
      return { type: 'CLAWBACK_CLAIMABLE_BALANCE', clawbackClaimableBalanceOp: fromJsonClawbackClaimableBalanceOp(obj[key]) } as Operation_body
    case 'set_trust_line_flags':
      return { type: 'SET_TRUST_LINE_FLAGS', setTrustLineFlagsOp: fromJsonSetTrustLineFlagsOp(obj[key]) } as Operation_body
    case 'liquidity_pool_deposit':
      return { type: 'LIQUIDITY_POOL_DEPOSIT', liquidityPoolDepositOp: fromJsonLiquidityPoolDepositOp(obj[key]) } as Operation_body
    case 'liquidity_pool_withdraw':
      return { type: 'LIQUIDITY_POOL_WITHDRAW', liquidityPoolWithdrawOp: fromJsonLiquidityPoolWithdrawOp(obj[key]) } as Operation_body
    case 'invoke_host_function':
      return { type: 'INVOKE_HOST_FUNCTION', invokeHostFunctionOp: fromJsonInvokeHostFunctionOp(obj[key]) } as Operation_body
    case 'extend_footprint_ttl':
      return { type: 'EXTEND_FOOTPRINT_TTL', extendFootprintTTLOp: fromJsonExtendFootprintTTLOp(obj[key]) } as Operation_body
    case 'restore_footprint':
      return { type: 'RESTORE_FOOTPRINT', restoreFootprintOp: fromJsonRestoreFootprintOp(obj[key]) } as Operation_body
    default: throw new Error(`Unknown Operation_body variant: ${key}`)
  }
}

/** An operation is the lowest unit of work that a transaction does  */
export interface Operation {
  /**
   * sourceAccount is the account used to run the operation
   * if not set, the runtime defaults to "sourceAccount" specified at
   * the transaction level
   */
  readonly sourceAccount: MuxedAccount | undefined
  readonly body: Operation_body
}

export function readOperation(r: XdrReader): Operation {
  beginComposite(r)
  try {
    const sourceAccount = readOptional(r, readMuxedAccount)
    const body = readOperation_body(r)
    return { sourceAccount, body }
  } finally {
    endComposite(r)
  }
}

export function writeOperation(w: XdrWriter, v: Operation): void {
  writeOptional(w, v.sourceAccount, writeMuxedAccount)
  writeOperation_body(w, v.body)
}

export function encodeOperation(v: Operation): Uint8Array {
  return encode(v, writeOperation)
}

export function decodeOperation(input: Uint8Array | string): Operation {
  return decode(input, readOperation)
}

export function toJsonOperation(v: Operation): Record<string, unknown> {
  return {
    'source_account': v.sourceAccount !== undefined ? toJsonMuxedAccount(v.sourceAccount) : null,
    'body': toJsonOperation_body(v.body),
  }
}

export function fromJsonOperation(json: unknown): Operation {
  const o = json as Record<string, unknown>
  return {
    sourceAccount: (o['source_account']) != null ? fromJsonMuxedAccount(o['source_account']) : undefined,
    body: fromJsonOperation_body(o['body']),
  }
}

export interface HashIDPreimage_operationID {
  readonly sourceAccount: AccountID
  readonly seqNum: SequenceNumber
  readonly opNum: uint32
}

export function readHashIDPreimage_operationID(r: XdrReader): HashIDPreimage_operationID {
  beginComposite(r)
  try {
    const sourceAccount = readAccountID(r)
    const seqNum = readSequenceNumber(r)
    const opNum = readuint32(r)
    return { sourceAccount, seqNum, opNum }
  } finally {
    endComposite(r)
  }
}

export function writeHashIDPreimage_operationID(w: XdrWriter, v: HashIDPreimage_operationID): void {
  writeAccountID(w, v.sourceAccount)
  writeSequenceNumber(w, v.seqNum)
  writeuint32(w, v.opNum)
}

export function encodeHashIDPreimage_operationID(v: HashIDPreimage_operationID): Uint8Array {
  return encode(v, writeHashIDPreimage_operationID)
}

export function decodeHashIDPreimage_operationID(input: Uint8Array | string): HashIDPreimage_operationID {
  return decode(input, readHashIDPreimage_operationID)
}

export function toJsonHashIDPreimage_operationID(v: HashIDPreimage_operationID): Record<string, unknown> {
  return {
    'source_account': toJsonAccountID(v.sourceAccount),
    'seq_num': toJsonSequenceNumber(v.seqNum),
    'op_num': toJsonuint32(v.opNum),
  }
}

export function fromJsonHashIDPreimage_operationID(json: unknown): HashIDPreimage_operationID {
  const o = json as Record<string, unknown>
  return {
    sourceAccount: fromJsonAccountID(o['source_account']),
    seqNum: fromJsonSequenceNumber(o['seq_num']),
    opNum: fromJsonuint32(o['op_num']),
  }
}

export interface HashIDPreimage_revokeID {
  readonly sourceAccount: AccountID
  readonly seqNum: SequenceNumber
  readonly opNum: uint32
  readonly liquidityPoolID: PoolID
  readonly asset: Asset
}

export function readHashIDPreimage_revokeID(r: XdrReader): HashIDPreimage_revokeID {
  beginComposite(r)
  try {
    const sourceAccount = readAccountID(r)
    const seqNum = readSequenceNumber(r)
    const opNum = readuint32(r)
    const liquidityPoolID = readPoolID(r)
    const asset = readAsset(r)
    return { sourceAccount, seqNum, opNum, liquidityPoolID, asset }
  } finally {
    endComposite(r)
  }
}

export function writeHashIDPreimage_revokeID(w: XdrWriter, v: HashIDPreimage_revokeID): void {
  writeAccountID(w, v.sourceAccount)
  writeSequenceNumber(w, v.seqNum)
  writeuint32(w, v.opNum)
  writePoolID(w, v.liquidityPoolID)
  writeAsset(w, v.asset)
}

export function encodeHashIDPreimage_revokeID(v: HashIDPreimage_revokeID): Uint8Array {
  return encode(v, writeHashIDPreimage_revokeID)
}

export function decodeHashIDPreimage_revokeID(input: Uint8Array | string): HashIDPreimage_revokeID {
  return decode(input, readHashIDPreimage_revokeID)
}

export function toJsonHashIDPreimage_revokeID(v: HashIDPreimage_revokeID): Record<string, unknown> {
  return {
    'source_account': toJsonAccountID(v.sourceAccount),
    'seq_num': toJsonSequenceNumber(v.seqNum),
    'op_num': toJsonuint32(v.opNum),
    'liquidity_pool_id': toJsonPoolID(v.liquidityPoolID),
    'asset': toJsonAsset(v.asset),
  }
}

export function fromJsonHashIDPreimage_revokeID(json: unknown): HashIDPreimage_revokeID {
  const o = json as Record<string, unknown>
  return {
    sourceAccount: fromJsonAccountID(o['source_account']),
    seqNum: fromJsonSequenceNumber(o['seq_num']),
    opNum: fromJsonuint32(o['op_num']),
    liquidityPoolID: fromJsonPoolID(o['liquidity_pool_id']),
    asset: fromJsonAsset(o['asset']),
  }
}

export interface HashIDPreimage_contractID {
  readonly networkID: Hash
  readonly contractIDPreimage: ContractIDPreimage
}

export function readHashIDPreimage_contractID(r: XdrReader): HashIDPreimage_contractID {
  beginComposite(r)
  try {
    const networkID = readHash(r)
    const contractIDPreimage = readContractIDPreimage(r)
    return { networkID, contractIDPreimage }
  } finally {
    endComposite(r)
  }
}

export function writeHashIDPreimage_contractID(w: XdrWriter, v: HashIDPreimage_contractID): void {
  writeHash(w, v.networkID)
  writeContractIDPreimage(w, v.contractIDPreimage)
}

export function encodeHashIDPreimage_contractID(v: HashIDPreimage_contractID): Uint8Array {
  return encode(v, writeHashIDPreimage_contractID)
}

export function decodeHashIDPreimage_contractID(input: Uint8Array | string): HashIDPreimage_contractID {
  return decode(input, readHashIDPreimage_contractID)
}

export function toJsonHashIDPreimage_contractID(v: HashIDPreimage_contractID): Record<string, unknown> {
  return {
    'network_id': toJsonHash(v.networkID),
    'contract_id_preimage': toJsonContractIDPreimage(v.contractIDPreimage),
  }
}

export function fromJsonHashIDPreimage_contractID(json: unknown): HashIDPreimage_contractID {
  const o = json as Record<string, unknown>
  return {
    networkID: fromJsonHash(o['network_id']),
    contractIDPreimage: fromJsonContractIDPreimage(o['contract_id_preimage']),
  }
}

export interface HashIDPreimage_sorobanAuthorization {
  readonly networkID: Hash
  readonly nonce: int64
  readonly signatureExpirationLedger: uint32
  readonly invocation: SorobanAuthorizedInvocation
}

export function readHashIDPreimage_sorobanAuthorization(r: XdrReader): HashIDPreimage_sorobanAuthorization {
  beginComposite(r)
  try {
    const networkID = readHash(r)
    const nonce = readint64(r)
    const signatureExpirationLedger = readuint32(r)
    const invocation = readSorobanAuthorizedInvocation(r)
    return { networkID, nonce, signatureExpirationLedger, invocation }
  } finally {
    endComposite(r)
  }
}

export function writeHashIDPreimage_sorobanAuthorization(w: XdrWriter, v: HashIDPreimage_sorobanAuthorization): void {
  writeHash(w, v.networkID)
  writeint64(w, v.nonce)
  writeuint32(w, v.signatureExpirationLedger)
  writeSorobanAuthorizedInvocation(w, v.invocation)
}

export function encodeHashIDPreimage_sorobanAuthorization(v: HashIDPreimage_sorobanAuthorization): Uint8Array {
  return encode(v, writeHashIDPreimage_sorobanAuthorization)
}

export function decodeHashIDPreimage_sorobanAuthorization(input: Uint8Array | string): HashIDPreimage_sorobanAuthorization {
  return decode(input, readHashIDPreimage_sorobanAuthorization)
}

export function toJsonHashIDPreimage_sorobanAuthorization(v: HashIDPreimage_sorobanAuthorization): Record<string, unknown> {
  return {
    'network_id': toJsonHash(v.networkID),
    'nonce': toJsonint64(v.nonce),
    'signature_expiration_ledger': toJsonuint32(v.signatureExpirationLedger),
    'invocation': toJsonSorobanAuthorizedInvocation(v.invocation),
  }
}

export function fromJsonHashIDPreimage_sorobanAuthorization(json: unknown): HashIDPreimage_sorobanAuthorization {
  const o = json as Record<string, unknown>
  return {
    networkID: fromJsonHash(o['network_id']),
    nonce: fromJsonint64(o['nonce']),
    signatureExpirationLedger: fromJsonuint32(o['signature_expiration_ledger']),
    invocation: fromJsonSorobanAuthorizedInvocation(o['invocation']),
  }
}

export type HashIDPreimage =
  | { readonly type: 'ENVELOPE_TYPE_OP_ID'; readonly operationID: HashIDPreimage_operationID }
  | { readonly type: 'ENVELOPE_TYPE_POOL_REVOKE_OP_ID'; readonly revokeID: HashIDPreimage_revokeID }
  | { readonly type: 'ENVELOPE_TYPE_CONTRACT_ID'; readonly contractID: HashIDPreimage_contractID }
  | { readonly type: 'ENVELOPE_TYPE_SOROBAN_AUTHORIZATION'; readonly sorobanAuthorization: HashIDPreimage_sorobanAuthorization }

export function readHashIDPreimage(r: XdrReader): HashIDPreimage {
  beginComposite(r)
  try {
    const type = readEnvelopeType(r)
    let result: HashIDPreimage
    switch (type) {
      case 'ENVELOPE_TYPE_OP_ID':
        result = { type, operationID: readHashIDPreimage_operationID(r) }; break
      case 'ENVELOPE_TYPE_POOL_REVOKE_OP_ID':
        result = { type, revokeID: readHashIDPreimage_revokeID(r) }; break
      case 'ENVELOPE_TYPE_CONTRACT_ID':
        result = { type, contractID: readHashIDPreimage_contractID(r) }; break
      case 'ENVELOPE_TYPE_SOROBAN_AUTHORIZATION':
        result = { type, sorobanAuthorization: readHashIDPreimage_sorobanAuthorization(r) }; break
      default:
        throw new XdrReadError(`Unknown HashIDPreimage discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeHashIDPreimage(w: XdrWriter, v: HashIDPreimage): void {
  writeEnvelopeType(w, v.type)
  switch (v.type) {
    case 'ENVELOPE_TYPE_OP_ID':
      writeHashIDPreimage_operationID(w, (v as any).operationID); break
    case 'ENVELOPE_TYPE_POOL_REVOKE_OP_ID':
      writeHashIDPreimage_revokeID(w, (v as any).revokeID); break
    case 'ENVELOPE_TYPE_CONTRACT_ID':
      writeHashIDPreimage_contractID(w, (v as any).contractID); break
    case 'ENVELOPE_TYPE_SOROBAN_AUTHORIZATION':
      writeHashIDPreimage_sorobanAuthorization(w, (v as any).sorobanAuthorization); break
  }
}

export function encodeHashIDPreimage(v: HashIDPreimage): Uint8Array {
  return encode(v, writeHashIDPreimage)
}

export function decodeHashIDPreimage(input: Uint8Array | string): HashIDPreimage {
  return decode(input, readHashIDPreimage)
}

export function toJsonHashIDPreimage(v: HashIDPreimage): unknown {
  switch (v.type) {
    case 'ENVELOPE_TYPE_OP_ID':
      return { 'op_id': toJsonHashIDPreimage_operationID((v as any).operationID) }
    case 'ENVELOPE_TYPE_POOL_REVOKE_OP_ID':
      return { 'pool_revoke_op_id': toJsonHashIDPreimage_revokeID((v as any).revokeID) }
    case 'ENVELOPE_TYPE_CONTRACT_ID':
      return { 'contract_id': toJsonHashIDPreimage_contractID((v as any).contractID) }
    case 'ENVELOPE_TYPE_SOROBAN_AUTHORIZATION':
      return { 'soroban_authorization': toJsonHashIDPreimage_sorobanAuthorization((v as any).sorobanAuthorization) }
  }
}

export function fromJsonHashIDPreimage(json: unknown): HashIDPreimage {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for HashIDPreimage: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'op_id':
      return { type: 'ENVELOPE_TYPE_OP_ID', operationID: fromJsonHashIDPreimage_operationID(obj[key]) } as HashIDPreimage
    case 'pool_revoke_op_id':
      return { type: 'ENVELOPE_TYPE_POOL_REVOKE_OP_ID', revokeID: fromJsonHashIDPreimage_revokeID(obj[key]) } as HashIDPreimage
    case 'contract_id':
      return { type: 'ENVELOPE_TYPE_CONTRACT_ID', contractID: fromJsonHashIDPreimage_contractID(obj[key]) } as HashIDPreimage
    case 'soroban_authorization':
      return { type: 'ENVELOPE_TYPE_SOROBAN_AUTHORIZATION', sorobanAuthorization: fromJsonHashIDPreimage_sorobanAuthorization(obj[key]) } as HashIDPreimage
    default: throw new Error(`Unknown HashIDPreimage variant: ${key}`)
  }
}

export type MemoType =
  | 'MEMO_NONE'
  | 'MEMO_TEXT'
  | 'MEMO_ID'
  | 'MEMO_HASH'
  | 'MEMO_RETURN'

export const MEMO_TYPE_TO_INT: Record<MemoType, number> = /*#__PURE__*/ {
  MEMO_NONE: 0,
  MEMO_TEXT: 1,
  MEMO_ID: 2,
  MEMO_HASH: 3,
  MEMO_RETURN: 4,
}

export const MEMO_TYPE_FROM_INT: Record<number, MemoType> = /*#__PURE__*/ {
  0: 'MEMO_NONE',
  1: 'MEMO_TEXT',
  2: 'MEMO_ID',
  3: 'MEMO_HASH',
  4: 'MEMO_RETURN',
}

export function readMemoType(r: XdrReader): MemoType {
  const v = readInt32(r)
  const result = MEMO_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown MemoType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeMemoType(w: XdrWriter, v: MemoType): void {
  writeInt32(w, MEMO_TYPE_TO_INT[v])
}

export function encodeMemoType(v: MemoType): Uint8Array {
  return encode(v, writeMemoType)
}

export function decodeMemoType(input: Uint8Array | string): MemoType {
  return decode(input, readMemoType)
}

const _MEMO_TYPE_TO_JSON: Record<MemoType, string> = /*#__PURE__*/ {
  MEMO_NONE: 'none',
  MEMO_TEXT: 'text',
  MEMO_ID: 'id',
  MEMO_HASH: 'hash',
  MEMO_RETURN: 'return',
}

const _MEMO_TYPE_FROM_JSON: Record<string, MemoType> = /*#__PURE__*/ {
  'none': 'MEMO_NONE',
  'text': 'MEMO_TEXT',
  'id': 'MEMO_ID',
  'hash': 'MEMO_HASH',
  'return': 'MEMO_RETURN',
}

export function toJsonMemoType(v: MemoType): string {
  return _MEMO_TYPE_TO_JSON[v]
}

export function fromJsonMemoType(json: unknown): MemoType {
  const result = _MEMO_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown MemoType JSON value: ${json}`)
  return result
}

export type Memo =
  | { readonly type: 'MEMO_NONE' }
  | { readonly type: 'MEMO_TEXT'; readonly text: string }
  | { readonly type: 'MEMO_ID'; readonly id: uint64 }
  | { readonly type: 'MEMO_HASH'; readonly hash: Hash }
  | { readonly type: 'MEMO_RETURN'; readonly retHash: Hash }

export function readMemo(r: XdrReader): Memo {
  beginComposite(r)
  try {
    const type = readMemoType(r)
    let result: Memo
    switch (type) {
      case 'MEMO_NONE':
        result = { type }; break
      case 'MEMO_TEXT':
        result = { type, text: readString(r, 28) }; break
      case 'MEMO_ID':
        result = { type, id: readuint64(r) }; break
      case 'MEMO_HASH':
        result = { type, hash: readHash(r) }; break
      case 'MEMO_RETURN':
        result = { type, retHash: readHash(r) }; break
      default:
        throw new XdrReadError(`Unknown Memo discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeMemo(w: XdrWriter, v: Memo): void {
  writeMemoType(w, v.type)
  switch (v.type) {
    case 'MEMO_NONE':
      break
    case 'MEMO_TEXT':
      writeString(w, (v as any).text, 28); break
    case 'MEMO_ID':
      writeuint64(w, (v as any).id); break
    case 'MEMO_HASH':
      writeHash(w, (v as any).hash); break
    case 'MEMO_RETURN':
      writeHash(w, (v as any).retHash); break
  }
}

export function encodeMemo(v: Memo): Uint8Array {
  return encode(v, writeMemo)
}

export function decodeMemo(input: Uint8Array | string): Memo {
  return decode(input, readMemo)
}

export function toJsonMemo(v: Memo): unknown {
  switch (v.type) {
    case 'MEMO_NONE':
      return 'none'
    case 'MEMO_TEXT':
      return { 'text': escapeXdrString((v as any).text) }
    case 'MEMO_ID':
      return { 'id': toJsonuint64((v as any).id) }
    case 'MEMO_HASH':
      return { 'hash': toJsonHash((v as any).hash) }
    case 'MEMO_RETURN':
      return { 'return': toJsonHash((v as any).retHash) }
  }
}

export function fromJsonMemo(json: unknown): Memo {
  if (typeof json === 'string') {
    if (json === 'none') return { type: 'MEMO_NONE' } as Memo
    throw new Error(`Unknown Memo variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'text':
      return { type: 'MEMO_TEXT', text: unescapeXdrString((obj[key]) as string) } as Memo
    case 'id':
      return { type: 'MEMO_ID', id: fromJsonuint64(obj[key]) } as Memo
    case 'hash':
      return { type: 'MEMO_HASH', hash: fromJsonHash(obj[key]) } as Memo
    case 'return':
      return { type: 'MEMO_RETURN', retHash: fromJsonHash(obj[key]) } as Memo
    default: throw new Error(`Unknown Memo variant: ${key}`)
  }
}

export interface TimeBounds {
  readonly minTime: TimePoint
  readonly maxTime: TimePoint
}

export function readTimeBounds(r: XdrReader): TimeBounds {
  beginComposite(r)
  try {
    const minTime = readTimePoint(r)
    const maxTime = readTimePoint(r)
    return { minTime, maxTime }
  } finally {
    endComposite(r)
  }
}

export function writeTimeBounds(w: XdrWriter, v: TimeBounds): void {
  writeTimePoint(w, v.minTime)
  writeTimePoint(w, v.maxTime)
}

export function encodeTimeBounds(v: TimeBounds): Uint8Array {
  return encode(v, writeTimeBounds)
}

export function decodeTimeBounds(input: Uint8Array | string): TimeBounds {
  return decode(input, readTimeBounds)
}

export function toJsonTimeBounds(v: TimeBounds): Record<string, unknown> {
  return {
    'min_time': toJsonTimePoint(v.minTime),
    'max_time': toJsonTimePoint(v.maxTime),
  }
}

export function fromJsonTimeBounds(json: unknown): TimeBounds {
  const o = json as Record<string, unknown>
  return {
    minTime: fromJsonTimePoint(o['min_time']),
    maxTime: fromJsonTimePoint(o['max_time']),
  }
}

export interface LedgerBounds {
  readonly minLedger: uint32
  readonly maxLedger: uint32
}

export function readLedgerBounds(r: XdrReader): LedgerBounds {
  beginComposite(r)
  try {
    const minLedger = readuint32(r)
    const maxLedger = readuint32(r)
    return { minLedger, maxLedger }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerBounds(w: XdrWriter, v: LedgerBounds): void {
  writeuint32(w, v.minLedger)
  writeuint32(w, v.maxLedger)
}

export function encodeLedgerBounds(v: LedgerBounds): Uint8Array {
  return encode(v, writeLedgerBounds)
}

export function decodeLedgerBounds(input: Uint8Array | string): LedgerBounds {
  return decode(input, readLedgerBounds)
}

export function toJsonLedgerBounds(v: LedgerBounds): Record<string, unknown> {
  return {
    'min_ledger': toJsonuint32(v.minLedger),
    'max_ledger': toJsonuint32(v.maxLedger),
  }
}

export function fromJsonLedgerBounds(json: unknown): LedgerBounds {
  const o = json as Record<string, unknown>
  return {
    minLedger: fromJsonuint32(o['min_ledger']),
    maxLedger: fromJsonuint32(o['max_ledger']),
  }
}

export interface PreconditionsV2 {
  readonly timeBounds: TimeBounds | undefined
  /**
   * Transaction only valid for ledger numbers n such that
   * minLedger <= n < maxLedger (if maxLedger == 0, then
   * only minLedger is checked)
   */
  readonly ledgerBounds: LedgerBounds | undefined
  /**
   * If NULL, only valid when sourceAccount's sequence number
   * is seqNum - 1.  Otherwise, valid when sourceAccount's
   * sequence number n satisfies minSeqNum <= n < tx.seqNum.
   * Note that after execution the account's sequence number
   * is always raised to tx.seqNum, and a transaction is not
   * valid if tx.seqNum is too high to ensure replay protection.
   */
  readonly minSeqNum: SequenceNumber | undefined
  /**
   * For the transaction to be valid, the current ledger time must
   * be at least minSeqAge greater than sourceAccount's seqTime.
   */
  readonly minSeqAge: Duration
  /**
   * For the transaction to be valid, the current ledger number
   * must be at least minSeqLedgerGap greater than sourceAccount's
   * seqLedger.
   */
  readonly minSeqLedgerGap: uint32
  /**
   * For the transaction to be valid, there must be a signature
   * corresponding to every Signer in this array, even if the
   * signature is not otherwise required by the sourceAccount or
   * operations.
   */
  readonly extraSigners: SignerKey[]
}

export function readPreconditionsV2(r: XdrReader): PreconditionsV2 {
  beginComposite(r)
  try {
    const timeBounds = readOptional(r, readTimeBounds)
    const ledgerBounds = readOptional(r, readLedgerBounds)
    const minSeqNum = readOptional(r, readSequenceNumber)
    const minSeqAge = readDuration(r)
    const minSeqLedgerGap = readuint32(r)
    const extraSigners = readVarArray(r, 2, readSignerKey)
    return { timeBounds, ledgerBounds, minSeqNum, minSeqAge, minSeqLedgerGap, extraSigners }
  } finally {
    endComposite(r)
  }
}

export function writePreconditionsV2(w: XdrWriter, v: PreconditionsV2): void {
  writeOptional(w, v.timeBounds, writeTimeBounds)
  writeOptional(w, v.ledgerBounds, writeLedgerBounds)
  writeOptional(w, v.minSeqNum, writeSequenceNumber)
  writeDuration(w, v.minSeqAge)
  writeuint32(w, v.minSeqLedgerGap)
  writeVarArray(w, v.extraSigners, 2, writeSignerKey)
}

export function encodePreconditionsV2(v: PreconditionsV2): Uint8Array {
  return encode(v, writePreconditionsV2)
}

export function decodePreconditionsV2(input: Uint8Array | string): PreconditionsV2 {
  return decode(input, readPreconditionsV2)
}

export function toJsonPreconditionsV2(v: PreconditionsV2): Record<string, unknown> {
  return {
    'time_bounds': v.timeBounds !== undefined ? toJsonTimeBounds(v.timeBounds) : null,
    'ledger_bounds': v.ledgerBounds !== undefined ? toJsonLedgerBounds(v.ledgerBounds) : null,
    'min_seq_num': v.minSeqNum !== undefined ? toJsonSequenceNumber(v.minSeqNum) : null,
    'min_seq_age': toJsonDuration(v.minSeqAge),
    'min_seq_ledger_gap': toJsonuint32(v.minSeqLedgerGap),
    'extra_signers': v.extraSigners.map((item: any) => toJsonSignerKey(item)),
  }
}

export function fromJsonPreconditionsV2(json: unknown): PreconditionsV2 {
  const o = json as Record<string, unknown>
  return {
    timeBounds: (o['time_bounds']) != null ? fromJsonTimeBounds(o['time_bounds']) : undefined,
    ledgerBounds: (o['ledger_bounds']) != null ? fromJsonLedgerBounds(o['ledger_bounds']) : undefined,
    minSeqNum: (o['min_seq_num']) != null ? fromJsonSequenceNumber(o['min_seq_num']) : undefined,
    minSeqAge: fromJsonDuration(o['min_seq_age']),
    minSeqLedgerGap: fromJsonuint32(o['min_seq_ledger_gap']),
    extraSigners: ((o['extra_signers']) as unknown[]).map((item: unknown) => fromJsonSignerKey(item)),
  }
}

export type PreconditionType =
  | 'PRECOND_NONE'
  | 'PRECOND_TIME'
  | 'PRECOND_V2'

export const PRECONDITION_TYPE_TO_INT: Record<PreconditionType, number> = /*#__PURE__*/ {
  PRECOND_NONE: 0,
  PRECOND_TIME: 1,
  PRECOND_V2: 2,
}

export const PRECONDITION_TYPE_FROM_INT: Record<number, PreconditionType> = /*#__PURE__*/ {
  0: 'PRECOND_NONE',
  1: 'PRECOND_TIME',
  2: 'PRECOND_V2',
}

export function readPreconditionType(r: XdrReader): PreconditionType {
  const v = readInt32(r)
  const result = PRECONDITION_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown PreconditionType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writePreconditionType(w: XdrWriter, v: PreconditionType): void {
  writeInt32(w, PRECONDITION_TYPE_TO_INT[v])
}

export function encodePreconditionType(v: PreconditionType): Uint8Array {
  return encode(v, writePreconditionType)
}

export function decodePreconditionType(input: Uint8Array | string): PreconditionType {
  return decode(input, readPreconditionType)
}

const _PRECONDITION_TYPE_TO_JSON: Record<PreconditionType, string> = /*#__PURE__*/ {
  PRECOND_NONE: 'none',
  PRECOND_TIME: 'time',
  PRECOND_V2: 'v2',
}

const _PRECONDITION_TYPE_FROM_JSON: Record<string, PreconditionType> = /*#__PURE__*/ {
  'none': 'PRECOND_NONE',
  'time': 'PRECOND_TIME',
  'v2': 'PRECOND_V2',
}

export function toJsonPreconditionType(v: PreconditionType): string {
  return _PRECONDITION_TYPE_TO_JSON[v]
}

export function fromJsonPreconditionType(json: unknown): PreconditionType {
  const result = _PRECONDITION_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown PreconditionType JSON value: ${json}`)
  return result
}

export type Preconditions =
  | { readonly type: 'PRECOND_NONE' }
  | { readonly type: 'PRECOND_TIME'; readonly timeBounds: TimeBounds }
  | { readonly type: 'PRECOND_V2'; readonly v2: PreconditionsV2 }

export function readPreconditions(r: XdrReader): Preconditions {
  beginComposite(r)
  try {
    const type = readPreconditionType(r)
    let result: Preconditions
    switch (type) {
      case 'PRECOND_NONE':
        result = { type }; break
      case 'PRECOND_TIME':
        result = { type, timeBounds: readTimeBounds(r) }; break
      case 'PRECOND_V2':
        result = { type, v2: readPreconditionsV2(r) }; break
      default:
        throw new XdrReadError(`Unknown Preconditions discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writePreconditions(w: XdrWriter, v: Preconditions): void {
  writePreconditionType(w, v.type)
  switch (v.type) {
    case 'PRECOND_NONE':
      break
    case 'PRECOND_TIME':
      writeTimeBounds(w, (v as any).timeBounds); break
    case 'PRECOND_V2':
      writePreconditionsV2(w, (v as any).v2); break
  }
}

export function encodePreconditions(v: Preconditions): Uint8Array {
  return encode(v, writePreconditions)
}

export function decodePreconditions(input: Uint8Array | string): Preconditions {
  return decode(input, readPreconditions)
}

export function toJsonPreconditions(v: Preconditions): unknown {
  switch (v.type) {
    case 'PRECOND_NONE':
      return 'none'
    case 'PRECOND_TIME':
      return { 'time': toJsonTimeBounds((v as any).timeBounds) }
    case 'PRECOND_V2':
      return { 'v2': toJsonPreconditionsV2((v as any).v2) }
  }
}

export function fromJsonPreconditions(json: unknown): Preconditions {
  if (typeof json === 'string') {
    if (json === 'none') return { type: 'PRECOND_NONE' } as Preconditions
    throw new Error(`Unknown Preconditions variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'time':
      return { type: 'PRECOND_TIME', timeBounds: fromJsonTimeBounds(obj[key]) } as Preconditions
    case 'v2':
      return { type: 'PRECOND_V2', v2: fromJsonPreconditionsV2(obj[key]) } as Preconditions
    default: throw new Error(`Unknown Preconditions variant: ${key}`)
  }
}

/** Ledger key sets touched by a smart contract transaction. */
export interface LedgerFootprint {
  readonly readOnly: LedgerKey[]
  readonly readWrite: LedgerKey[]
}

export function readLedgerFootprint(r: XdrReader): LedgerFootprint {
  beginComposite(r)
  try {
    const readOnly = readVarArray(r, UINT32_MAX, readLedgerKey)
    const readWrite = readVarArray(r, UINT32_MAX, readLedgerKey)
    return { readOnly, readWrite }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerFootprint(w: XdrWriter, v: LedgerFootprint): void {
  writeVarArray(w, v.readOnly, UINT32_MAX, writeLedgerKey)
  writeVarArray(w, v.readWrite, UINT32_MAX, writeLedgerKey)
}

export function encodeLedgerFootprint(v: LedgerFootprint): Uint8Array {
  return encode(v, writeLedgerFootprint)
}

export function decodeLedgerFootprint(input: Uint8Array | string): LedgerFootprint {
  return decode(input, readLedgerFootprint)
}

export function toJsonLedgerFootprint(v: LedgerFootprint): Record<string, unknown> {
  return {
    'read_only': v.readOnly.map((item: any) => toJsonLedgerKey(item)),
    'read_write': v.readWrite.map((item: any) => toJsonLedgerKey(item)),
  }
}

export function fromJsonLedgerFootprint(json: unknown): LedgerFootprint {
  const o = json as Record<string, unknown>
  return {
    readOnly: ((o['read_only']) as unknown[]).map((item: unknown) => fromJsonLedgerKey(item)),
    readWrite: ((o['read_write']) as unknown[]).map((item: unknown) => fromJsonLedgerKey(item)),
  }
}

/**
 * Resource limits for a Soroban transaction.
 * The transaction will fail if it exceeds any of these limits.
 */
export interface SorobanResources {
  /** The ledger footprint of the transaction. */
  readonly footprint: LedgerFootprint
  /** The maximum number of instructions this transaction can use */
  readonly instructions: uint32
  /** The maximum number of bytes this transaction can read from disk backed entries */
  readonly diskReadBytes: uint32
  /** The maximum number of bytes this transaction can write to ledger */
  readonly writeBytes: uint32
}

export function readSorobanResources(r: XdrReader): SorobanResources {
  beginComposite(r)
  try {
    const footprint = readLedgerFootprint(r)
    const instructions = readuint32(r)
    const diskReadBytes = readuint32(r)
    const writeBytes = readuint32(r)
    return { footprint, instructions, diskReadBytes, writeBytes }
  } finally {
    endComposite(r)
  }
}

export function writeSorobanResources(w: XdrWriter, v: SorobanResources): void {
  writeLedgerFootprint(w, v.footprint)
  writeuint32(w, v.instructions)
  writeuint32(w, v.diskReadBytes)
  writeuint32(w, v.writeBytes)
}

export function encodeSorobanResources(v: SorobanResources): Uint8Array {
  return encode(v, writeSorobanResources)
}

export function decodeSorobanResources(input: Uint8Array | string): SorobanResources {
  return decode(input, readSorobanResources)
}

export function toJsonSorobanResources(v: SorobanResources): Record<string, unknown> {
  return {
    'footprint': toJsonLedgerFootprint(v.footprint),
    'instructions': toJsonuint32(v.instructions),
    'disk_read_bytes': toJsonuint32(v.diskReadBytes),
    'write_bytes': toJsonuint32(v.writeBytes),
  }
}

export function fromJsonSorobanResources(json: unknown): SorobanResources {
  const o = json as Record<string, unknown>
  return {
    footprint: fromJsonLedgerFootprint(o['footprint']),
    instructions: fromJsonuint32(o['instructions']),
    diskReadBytes: fromJsonuint32(o['disk_read_bytes']),
    writeBytes: fromJsonuint32(o['write_bytes']),
  }
}

export interface SorobanResourcesExtV0 {
  /**
   * Vector of indices representing what Soroban
   * entries in the footprint are archived, based on the
   * order of keys provided in the readWrite footprint.
   */
  readonly archivedSorobanEntries: uint32[]
}

export function readSorobanResourcesExtV0(r: XdrReader): SorobanResourcesExtV0 {
  beginComposite(r)
  try {
    const archivedSorobanEntries = readVarArray(r, UINT32_MAX, readuint32)
    return { archivedSorobanEntries }
  } finally {
    endComposite(r)
  }
}

export function writeSorobanResourcesExtV0(w: XdrWriter, v: SorobanResourcesExtV0): void {
  writeVarArray(w, v.archivedSorobanEntries, UINT32_MAX, writeuint32)
}

export function encodeSorobanResourcesExtV0(v: SorobanResourcesExtV0): Uint8Array {
  return encode(v, writeSorobanResourcesExtV0)
}

export function decodeSorobanResourcesExtV0(input: Uint8Array | string): SorobanResourcesExtV0 {
  return decode(input, readSorobanResourcesExtV0)
}

export function toJsonSorobanResourcesExtV0(v: SorobanResourcesExtV0): Record<string, unknown> {
  return {
    'archived_soroban_entries': v.archivedSorobanEntries.map((item: any) => toJsonuint32(item)),
  }
}

export function fromJsonSorobanResourcesExtV0(json: unknown): SorobanResourcesExtV0 {
  const o = json as Record<string, unknown>
  return {
    archivedSorobanEntries: ((o['archived_soroban_entries']) as unknown[]).map((item: unknown) => fromJsonuint32(item)),
  }
}

export type SorobanTransactionData_ext =
  | { readonly v: 0 }
  | { readonly v: 1; readonly resourceExt: SorobanResourcesExtV0 }

export function readSorobanTransactionData_ext(r: XdrReader): SorobanTransactionData_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: SorobanTransactionData_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, resourceExt: readSorobanResourcesExtV0(r) }; break
      default:
        throw new XdrReadError(`Unknown SorobanTransactionData_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSorobanTransactionData_ext(w: XdrWriter, v: SorobanTransactionData_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeSorobanResourcesExtV0(w, (v as any).resourceExt); break
  }
}

export function encodeSorobanTransactionData_ext(v: SorobanTransactionData_ext): Uint8Array {
  return encode(v, writeSorobanTransactionData_ext)
}

export function decodeSorobanTransactionData_ext(input: Uint8Array | string): SorobanTransactionData_ext {
  return decode(input, readSorobanTransactionData_ext)
}

export function toJsonSorobanTransactionData_ext(v: SorobanTransactionData_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonSorobanResourcesExtV0((v as any).resourceExt) }
  }
}

export function fromJsonSorobanTransactionData_ext(json: unknown): SorobanTransactionData_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as SorobanTransactionData_ext
    throw new Error(`Unknown SorobanTransactionData_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, resourceExt: fromJsonSorobanResourcesExtV0(obj[key]) } as SorobanTransactionData_ext
    default: throw new Error(`Unknown SorobanTransactionData_ext variant: ${key}`)
  }
}

/** The transaction extension for Soroban. */
export interface SorobanTransactionData {
  readonly ext: SorobanTransactionData_ext
  readonly resources: SorobanResources
  /**
   * Amount of the transaction `fee` allocated to the Soroban resource fees.
   * The fraction of `resourceFee` corresponding to `resources` specified 
   * above is *not* refundable (i.e. fees for instructions, ledger I/O), as
   * well as fees for the transaction size.
   * The remaining part of the fee is refundable and the charged value is
   * based on the actual consumption of refundable resources (events, ledger
   * rent bumps).
   * The `inclusionFee` used for prioritization of the transaction is defined
   * as `tx.fee - resourceFee`.
   */
  readonly resourceFee: int64
}

export function readSorobanTransactionData(r: XdrReader): SorobanTransactionData {
  beginComposite(r)
  try {
    const ext = readSorobanTransactionData_ext(r)
    const resources = readSorobanResources(r)
    const resourceFee = readint64(r)
    return { ext, resources, resourceFee }
  } finally {
    endComposite(r)
  }
}

export function writeSorobanTransactionData(w: XdrWriter, v: SorobanTransactionData): void {
  writeSorobanTransactionData_ext(w, v.ext)
  writeSorobanResources(w, v.resources)
  writeint64(w, v.resourceFee)
}

export function encodeSorobanTransactionData(v: SorobanTransactionData): Uint8Array {
  return encode(v, writeSorobanTransactionData)
}

export function decodeSorobanTransactionData(input: Uint8Array | string): SorobanTransactionData {
  return decode(input, readSorobanTransactionData)
}

export function toJsonSorobanTransactionData(v: SorobanTransactionData): Record<string, unknown> {
  return {
    'ext': toJsonSorobanTransactionData_ext(v.ext),
    'resources': toJsonSorobanResources(v.resources),
    'resource_fee': toJsonint64(v.resourceFee),
  }
}

export function fromJsonSorobanTransactionData(json: unknown): SorobanTransactionData {
  const o = json as Record<string, unknown>
  return {
    ext: fromJsonSorobanTransactionData_ext(o['ext']),
    resources: fromJsonSorobanResources(o['resources']),
    resourceFee: fromJsonint64(o['resource_fee']),
  }
}

export type TransactionV0_ext =
  | { readonly v: 0 }

export function readTransactionV0_ext(r: XdrReader): TransactionV0_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: TransactionV0_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown TransactionV0_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTransactionV0_ext(w: XdrWriter, v: TransactionV0_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeTransactionV0_ext(v: TransactionV0_ext): Uint8Array {
  return encode(v, writeTransactionV0_ext)
}

export function decodeTransactionV0_ext(input: Uint8Array | string): TransactionV0_ext {
  return decode(input, readTransactionV0_ext)
}

export function toJsonTransactionV0_ext(v: TransactionV0_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonTransactionV0_ext(json: unknown): TransactionV0_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as TransactionV0_ext
    throw new Error(`Unknown TransactionV0_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown TransactionV0_ext variant: ${key}`)
  }
}

/**
 * TransactionV0 is a transaction with the AccountID discriminant stripped off,
 * leaving a raw ed25519 public key to identify the source account. This is used
 * for backwards compatibility starting from the protocol 12/13 boundary. If an
 * "old-style" TransactionEnvelope containing a Transaction is parsed with this
 * XDR definition, it will be parsed as a "new-style" TransactionEnvelope
 * containing a TransactionV0.
 */
export interface TransactionV0 {
  readonly sourceAccountEd25519: uint256
  readonly fee: uint32
  readonly seqNum: SequenceNumber
  readonly timeBounds: TimeBounds | undefined
  readonly memo: Memo
  readonly operations: Operation[]
  readonly ext: TransactionV0_ext
}

export function readTransactionV0(r: XdrReader): TransactionV0 {
  beginComposite(r)
  try {
    const sourceAccountEd25519 = readuint256(r)
    const fee = readuint32(r)
    const seqNum = readSequenceNumber(r)
    const timeBounds = readOptional(r, readTimeBounds)
    const memo = readMemo(r)
    const operations = readVarArray(r, MAX_OPS_PER_TX, readOperation)
    const ext = readTransactionV0_ext(r)
    return { sourceAccountEd25519, fee, seqNum, timeBounds, memo, operations, ext }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionV0(w: XdrWriter, v: TransactionV0): void {
  writeuint256(w, v.sourceAccountEd25519)
  writeuint32(w, v.fee)
  writeSequenceNumber(w, v.seqNum)
  writeOptional(w, v.timeBounds, writeTimeBounds)
  writeMemo(w, v.memo)
  writeVarArray(w, v.operations, MAX_OPS_PER_TX, writeOperation)
  writeTransactionV0_ext(w, v.ext)
}

export function encodeTransactionV0(v: TransactionV0): Uint8Array {
  return encode(v, writeTransactionV0)
}

export function decodeTransactionV0(input: Uint8Array | string): TransactionV0 {
  return decode(input, readTransactionV0)
}

export function toJsonTransactionV0(v: TransactionV0): Record<string, unknown> {
  return {
    'source_account_ed25519': toJsonuint256(v.sourceAccountEd25519),
    'fee': toJsonuint32(v.fee),
    'seq_num': toJsonSequenceNumber(v.seqNum),
    'time_bounds': v.timeBounds !== undefined ? toJsonTimeBounds(v.timeBounds) : null,
    'memo': toJsonMemo(v.memo),
    'operations': v.operations.map((item: any) => toJsonOperation(item)),
    'ext': toJsonTransactionV0_ext(v.ext),
  }
}

export function fromJsonTransactionV0(json: unknown): TransactionV0 {
  const o = json as Record<string, unknown>
  return {
    sourceAccountEd25519: fromJsonuint256(o['source_account_ed25519']),
    fee: fromJsonuint32(o['fee']),
    seqNum: fromJsonSequenceNumber(o['seq_num']),
    timeBounds: (o['time_bounds']) != null ? fromJsonTimeBounds(o['time_bounds']) : undefined,
    memo: fromJsonMemo(o['memo']),
    operations: ((o['operations']) as unknown[]).map((item: unknown) => fromJsonOperation(item)),
    ext: fromJsonTransactionV0_ext(o['ext']),
  }
}

export interface TransactionV0Envelope {
  readonly tx: TransactionV0
  /**
   * Each decorated signature is a signature over the SHA256 hash of
   * a TransactionSignaturePayload 
   */
  readonly signatures: DecoratedSignature[]
}

export function readTransactionV0Envelope(r: XdrReader): TransactionV0Envelope {
  beginComposite(r)
  try {
    const tx = readTransactionV0(r)
    const signatures = readVarArray(r, 20, readDecoratedSignature)
    return { tx, signatures }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionV0Envelope(w: XdrWriter, v: TransactionV0Envelope): void {
  writeTransactionV0(w, v.tx)
  writeVarArray(w, v.signatures, 20, writeDecoratedSignature)
}

export function encodeTransactionV0Envelope(v: TransactionV0Envelope): Uint8Array {
  return encode(v, writeTransactionV0Envelope)
}

export function decodeTransactionV0Envelope(input: Uint8Array | string): TransactionV0Envelope {
  return decode(input, readTransactionV0Envelope)
}

export function toJsonTransactionV0Envelope(v: TransactionV0Envelope): Record<string, unknown> {
  return {
    'tx': toJsonTransactionV0(v.tx),
    'signatures': v.signatures.map((item: any) => toJsonDecoratedSignature(item)),
  }
}

export function fromJsonTransactionV0Envelope(json: unknown): TransactionV0Envelope {
  const o = json as Record<string, unknown>
  return {
    tx: fromJsonTransactionV0(o['tx']),
    signatures: ((o['signatures']) as unknown[]).map((item: unknown) => fromJsonDecoratedSignature(item)),
  }
}

export type Transaction_ext =
  | { readonly v: 0 }
  | { readonly v: 1; readonly sorobanData: SorobanTransactionData }

export function readTransaction_ext(r: XdrReader): Transaction_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: Transaction_ext
    switch (v) {
      case 0:
        result = { v }; break
      case 1:
        result = { v, sorobanData: readSorobanTransactionData(r) }; break
      default:
        throw new XdrReadError(`Unknown Transaction_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTransaction_ext(w: XdrWriter, v: Transaction_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
    case 1:
      writeSorobanTransactionData(w, (v as any).sorobanData); break
  }
}

export function encodeTransaction_ext(v: Transaction_ext): Uint8Array {
  return encode(v, writeTransaction_ext)
}

export function decodeTransaction_ext(input: Uint8Array | string): Transaction_ext {
  return decode(input, readTransaction_ext)
}

export function toJsonTransaction_ext(v: Transaction_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
    case 1:
      return { 'v1': toJsonSorobanTransactionData((v as any).sorobanData) }
  }
}

export function fromJsonTransaction_ext(json: unknown): Transaction_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as Transaction_ext
    throw new Error(`Unknown Transaction_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v1':
      return { v: 1, sorobanData: fromJsonSorobanTransactionData(obj[key]) } as Transaction_ext
    default: throw new Error(`Unknown Transaction_ext variant: ${key}`)
  }
}

/**
 * a transaction is a container for a set of operations
 * - is executed by an account
 * - fees are collected from the account
 * - operations are executed in order as one ACID transaction
 * either all operations are applied or none are
 * if any returns a failing code
 */
export interface Transaction {
  /** account used to run the transaction */
  readonly sourceAccount: MuxedAccount
  /** the fee the sourceAccount will pay */
  readonly fee: uint32
  /** sequence number to consume in the account */
  readonly seqNum: SequenceNumber
  /** validity conditions */
  readonly cond: Preconditions
  readonly memo: Memo
  readonly operations: Operation[]
  readonly ext: Transaction_ext
}

export function readTransaction(r: XdrReader): Transaction {
  beginComposite(r)
  try {
    const sourceAccount = readMuxedAccount(r)
    const fee = readuint32(r)
    const seqNum = readSequenceNumber(r)
    const cond = readPreconditions(r)
    const memo = readMemo(r)
    const operations = readVarArray(r, MAX_OPS_PER_TX, readOperation)
    const ext = readTransaction_ext(r)
    return { sourceAccount, fee, seqNum, cond, memo, operations, ext }
  } finally {
    endComposite(r)
  }
}

export function writeTransaction(w: XdrWriter, v: Transaction): void {
  writeMuxedAccount(w, v.sourceAccount)
  writeuint32(w, v.fee)
  writeSequenceNumber(w, v.seqNum)
  writePreconditions(w, v.cond)
  writeMemo(w, v.memo)
  writeVarArray(w, v.operations, MAX_OPS_PER_TX, writeOperation)
  writeTransaction_ext(w, v.ext)
}

export function encodeTransaction(v: Transaction): Uint8Array {
  return encode(v, writeTransaction)
}

export function decodeTransaction(input: Uint8Array | string): Transaction {
  return decode(input, readTransaction)
}

export function toJsonTransaction(v: Transaction): Record<string, unknown> {
  return {
    'source_account': toJsonMuxedAccount(v.sourceAccount),
    'fee': toJsonuint32(v.fee),
    'seq_num': toJsonSequenceNumber(v.seqNum),
    'cond': toJsonPreconditions(v.cond),
    'memo': toJsonMemo(v.memo),
    'operations': v.operations.map((item: any) => toJsonOperation(item)),
    'ext': toJsonTransaction_ext(v.ext),
  }
}

export function fromJsonTransaction(json: unknown): Transaction {
  const o = json as Record<string, unknown>
  return {
    sourceAccount: fromJsonMuxedAccount(o['source_account']),
    fee: fromJsonuint32(o['fee']),
    seqNum: fromJsonSequenceNumber(o['seq_num']),
    cond: fromJsonPreconditions(o['cond']),
    memo: fromJsonMemo(o['memo']),
    operations: ((o['operations']) as unknown[]).map((item: unknown) => fromJsonOperation(item)),
    ext: fromJsonTransaction_ext(o['ext']),
  }
}

export interface TransactionV1Envelope {
  readonly tx: Transaction
  /**
   * Each decorated signature is a signature over the SHA256 hash of
   * a TransactionSignaturePayload 
   */
  readonly signatures: DecoratedSignature[]
}

export function readTransactionV1Envelope(r: XdrReader): TransactionV1Envelope {
  beginComposite(r)
  try {
    const tx = readTransaction(r)
    const signatures = readVarArray(r, 20, readDecoratedSignature)
    return { tx, signatures }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionV1Envelope(w: XdrWriter, v: TransactionV1Envelope): void {
  writeTransaction(w, v.tx)
  writeVarArray(w, v.signatures, 20, writeDecoratedSignature)
}

export function encodeTransactionV1Envelope(v: TransactionV1Envelope): Uint8Array {
  return encode(v, writeTransactionV1Envelope)
}

export function decodeTransactionV1Envelope(input: Uint8Array | string): TransactionV1Envelope {
  return decode(input, readTransactionV1Envelope)
}

export function toJsonTransactionV1Envelope(v: TransactionV1Envelope): Record<string, unknown> {
  return {
    'tx': toJsonTransaction(v.tx),
    'signatures': v.signatures.map((item: any) => toJsonDecoratedSignature(item)),
  }
}

export function fromJsonTransactionV1Envelope(json: unknown): TransactionV1Envelope {
  const o = json as Record<string, unknown>
  return {
    tx: fromJsonTransaction(o['tx']),
    signatures: ((o['signatures']) as unknown[]).map((item: unknown) => fromJsonDecoratedSignature(item)),
  }
}

export type FeeBumpTransaction_innerTx =
  | { readonly type: 'ENVELOPE_TYPE_TX'; readonly v1: TransactionV1Envelope }

export function readFeeBumpTransaction_innerTx(r: XdrReader): FeeBumpTransaction_innerTx {
  beginComposite(r)
  try {
    const type = readEnvelopeType(r)
    let result: FeeBumpTransaction_innerTx
    switch (type) {
      case 'ENVELOPE_TYPE_TX':
        result = { type, v1: readTransactionV1Envelope(r) }; break
      default:
        throw new XdrReadError(`Unknown FeeBumpTransaction_innerTx discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeFeeBumpTransaction_innerTx(w: XdrWriter, v: FeeBumpTransaction_innerTx): void {
  writeEnvelopeType(w, v.type)
  switch (v.type) {
    case 'ENVELOPE_TYPE_TX':
      writeTransactionV1Envelope(w, (v as any).v1); break
  }
}

export function encodeFeeBumpTransaction_innerTx(v: FeeBumpTransaction_innerTx): Uint8Array {
  return encode(v, writeFeeBumpTransaction_innerTx)
}

export function decodeFeeBumpTransaction_innerTx(input: Uint8Array | string): FeeBumpTransaction_innerTx {
  return decode(input, readFeeBumpTransaction_innerTx)
}

export function toJsonFeeBumpTransaction_innerTx(v: FeeBumpTransaction_innerTx): unknown {
  switch (v.type) {
    case 'ENVELOPE_TYPE_TX':
      return { 'tx': toJsonTransactionV1Envelope((v as any).v1) }
  }
}

export function fromJsonFeeBumpTransaction_innerTx(json: unknown): FeeBumpTransaction_innerTx {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for FeeBumpTransaction_innerTx: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'tx':
      return { type: 'ENVELOPE_TYPE_TX', v1: fromJsonTransactionV1Envelope(obj[key]) } as FeeBumpTransaction_innerTx
    default: throw new Error(`Unknown FeeBumpTransaction_innerTx variant: ${key}`)
  }
}

export type FeeBumpTransaction_ext =
  | { readonly v: 0 }

export function readFeeBumpTransaction_ext(r: XdrReader): FeeBumpTransaction_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: FeeBumpTransaction_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown FeeBumpTransaction_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeFeeBumpTransaction_ext(w: XdrWriter, v: FeeBumpTransaction_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeFeeBumpTransaction_ext(v: FeeBumpTransaction_ext): Uint8Array {
  return encode(v, writeFeeBumpTransaction_ext)
}

export function decodeFeeBumpTransaction_ext(input: Uint8Array | string): FeeBumpTransaction_ext {
  return decode(input, readFeeBumpTransaction_ext)
}

export function toJsonFeeBumpTransaction_ext(v: FeeBumpTransaction_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonFeeBumpTransaction_ext(json: unknown): FeeBumpTransaction_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as FeeBumpTransaction_ext
    throw new Error(`Unknown FeeBumpTransaction_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown FeeBumpTransaction_ext variant: ${key}`)
  }
}

export interface FeeBumpTransaction {
  readonly feeSource: MuxedAccount
  readonly fee: int64
  readonly innerTx: FeeBumpTransaction_innerTx
  readonly ext: FeeBumpTransaction_ext
}

export function readFeeBumpTransaction(r: XdrReader): FeeBumpTransaction {
  beginComposite(r)
  try {
    const feeSource = readMuxedAccount(r)
    const fee = readint64(r)
    const innerTx = readFeeBumpTransaction_innerTx(r)
    const ext = readFeeBumpTransaction_ext(r)
    return { feeSource, fee, innerTx, ext }
  } finally {
    endComposite(r)
  }
}

export function writeFeeBumpTransaction(w: XdrWriter, v: FeeBumpTransaction): void {
  writeMuxedAccount(w, v.feeSource)
  writeint64(w, v.fee)
  writeFeeBumpTransaction_innerTx(w, v.innerTx)
  writeFeeBumpTransaction_ext(w, v.ext)
}

export function encodeFeeBumpTransaction(v: FeeBumpTransaction): Uint8Array {
  return encode(v, writeFeeBumpTransaction)
}

export function decodeFeeBumpTransaction(input: Uint8Array | string): FeeBumpTransaction {
  return decode(input, readFeeBumpTransaction)
}

export function toJsonFeeBumpTransaction(v: FeeBumpTransaction): Record<string, unknown> {
  return {
    'fee_source': toJsonMuxedAccount(v.feeSource),
    'fee': toJsonint64(v.fee),
    'inner_tx': toJsonFeeBumpTransaction_innerTx(v.innerTx),
    'ext': toJsonFeeBumpTransaction_ext(v.ext),
  }
}

export function fromJsonFeeBumpTransaction(json: unknown): FeeBumpTransaction {
  const o = json as Record<string, unknown>
  return {
    feeSource: fromJsonMuxedAccount(o['fee_source']),
    fee: fromJsonint64(o['fee']),
    innerTx: fromJsonFeeBumpTransaction_innerTx(o['inner_tx']),
    ext: fromJsonFeeBumpTransaction_ext(o['ext']),
  }
}

export interface FeeBumpTransactionEnvelope {
  readonly tx: FeeBumpTransaction
  /**
   * Each decorated signature is a signature over the SHA256 hash of
   * a TransactionSignaturePayload 
   */
  readonly signatures: DecoratedSignature[]
}

export function readFeeBumpTransactionEnvelope(r: XdrReader): FeeBumpTransactionEnvelope {
  beginComposite(r)
  try {
    const tx = readFeeBumpTransaction(r)
    const signatures = readVarArray(r, 20, readDecoratedSignature)
    return { tx, signatures }
  } finally {
    endComposite(r)
  }
}

export function writeFeeBumpTransactionEnvelope(w: XdrWriter, v: FeeBumpTransactionEnvelope): void {
  writeFeeBumpTransaction(w, v.tx)
  writeVarArray(w, v.signatures, 20, writeDecoratedSignature)
}

export function encodeFeeBumpTransactionEnvelope(v: FeeBumpTransactionEnvelope): Uint8Array {
  return encode(v, writeFeeBumpTransactionEnvelope)
}

export function decodeFeeBumpTransactionEnvelope(input: Uint8Array | string): FeeBumpTransactionEnvelope {
  return decode(input, readFeeBumpTransactionEnvelope)
}

export function toJsonFeeBumpTransactionEnvelope(v: FeeBumpTransactionEnvelope): Record<string, unknown> {
  return {
    'tx': toJsonFeeBumpTransaction(v.tx),
    'signatures': v.signatures.map((item: any) => toJsonDecoratedSignature(item)),
  }
}

export function fromJsonFeeBumpTransactionEnvelope(json: unknown): FeeBumpTransactionEnvelope {
  const o = json as Record<string, unknown>
  return {
    tx: fromJsonFeeBumpTransaction(o['tx']),
    signatures: ((o['signatures']) as unknown[]).map((item: unknown) => fromJsonDecoratedSignature(item)),
  }
}

/** A TransactionEnvelope wraps a transaction with signatures.  */
export type TransactionEnvelope =
  | { readonly type: 'ENVELOPE_TYPE_TX_V0'; readonly v0: TransactionV0Envelope }
  | { readonly type: 'ENVELOPE_TYPE_TX'; readonly v1: TransactionV1Envelope }
  | { readonly type: 'ENVELOPE_TYPE_TX_FEE_BUMP'; readonly feeBump: FeeBumpTransactionEnvelope }

export function readTransactionEnvelope(r: XdrReader): TransactionEnvelope {
  beginComposite(r)
  try {
    const type = readEnvelopeType(r)
    let result: TransactionEnvelope
    switch (type) {
      case 'ENVELOPE_TYPE_TX_V0':
        result = { type, v0: readTransactionV0Envelope(r) }; break
      case 'ENVELOPE_TYPE_TX':
        result = { type, v1: readTransactionV1Envelope(r) }; break
      case 'ENVELOPE_TYPE_TX_FEE_BUMP':
        result = { type, feeBump: readFeeBumpTransactionEnvelope(r) }; break
      default:
        throw new XdrReadError(`Unknown TransactionEnvelope discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTransactionEnvelope(w: XdrWriter, v: TransactionEnvelope): void {
  writeEnvelopeType(w, v.type)
  switch (v.type) {
    case 'ENVELOPE_TYPE_TX_V0':
      writeTransactionV0Envelope(w, (v as any).v0); break
    case 'ENVELOPE_TYPE_TX':
      writeTransactionV1Envelope(w, (v as any).v1); break
    case 'ENVELOPE_TYPE_TX_FEE_BUMP':
      writeFeeBumpTransactionEnvelope(w, (v as any).feeBump); break
  }
}

export function encodeTransactionEnvelope(v: TransactionEnvelope): Uint8Array {
  return encode(v, writeTransactionEnvelope)
}

export function decodeTransactionEnvelope(input: Uint8Array | string): TransactionEnvelope {
  return decode(input, readTransactionEnvelope)
}

export function toJsonTransactionEnvelope(v: TransactionEnvelope): unknown {
  switch (v.type) {
    case 'ENVELOPE_TYPE_TX_V0':
      return { 'tx_v0': toJsonTransactionV0Envelope((v as any).v0) }
    case 'ENVELOPE_TYPE_TX':
      return { 'tx': toJsonTransactionV1Envelope((v as any).v1) }
    case 'ENVELOPE_TYPE_TX_FEE_BUMP':
      return { 'tx_fee_bump': toJsonFeeBumpTransactionEnvelope((v as any).feeBump) }
  }
}

export function fromJsonTransactionEnvelope(json: unknown): TransactionEnvelope {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for TransactionEnvelope: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'tx_v0':
      return { type: 'ENVELOPE_TYPE_TX_V0', v0: fromJsonTransactionV0Envelope(obj[key]) } as TransactionEnvelope
    case 'tx':
      return { type: 'ENVELOPE_TYPE_TX', v1: fromJsonTransactionV1Envelope(obj[key]) } as TransactionEnvelope
    case 'tx_fee_bump':
      return { type: 'ENVELOPE_TYPE_TX_FEE_BUMP', feeBump: fromJsonFeeBumpTransactionEnvelope(obj[key]) } as TransactionEnvelope
    default: throw new Error(`Unknown TransactionEnvelope variant: ${key}`)
  }
}

export type TransactionSignaturePayload_taggedTransaction =
  | { readonly type: 'ENVELOPE_TYPE_TX'; readonly tx: Transaction }
  | { readonly type: 'ENVELOPE_TYPE_TX_FEE_BUMP'; readonly feeBump: FeeBumpTransaction }

export function readTransactionSignaturePayload_taggedTransaction(r: XdrReader): TransactionSignaturePayload_taggedTransaction {
  beginComposite(r)
  try {
    const type = readEnvelopeType(r)
    let result: TransactionSignaturePayload_taggedTransaction
    switch (type) {
      case 'ENVELOPE_TYPE_TX':
        result = { type, tx: readTransaction(r) }; break
      case 'ENVELOPE_TYPE_TX_FEE_BUMP':
        result = { type, feeBump: readFeeBumpTransaction(r) }; break
      default:
        throw new XdrReadError(`Unknown TransactionSignaturePayload_taggedTransaction discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTransactionSignaturePayload_taggedTransaction(w: XdrWriter, v: TransactionSignaturePayload_taggedTransaction): void {
  writeEnvelopeType(w, v.type)
  switch (v.type) {
    case 'ENVELOPE_TYPE_TX':
      writeTransaction(w, (v as any).tx); break
    case 'ENVELOPE_TYPE_TX_FEE_BUMP':
      writeFeeBumpTransaction(w, (v as any).feeBump); break
  }
}

export function encodeTransactionSignaturePayload_taggedTransaction(v: TransactionSignaturePayload_taggedTransaction): Uint8Array {
  return encode(v, writeTransactionSignaturePayload_taggedTransaction)
}

export function decodeTransactionSignaturePayload_taggedTransaction(input: Uint8Array | string): TransactionSignaturePayload_taggedTransaction {
  return decode(input, readTransactionSignaturePayload_taggedTransaction)
}

export function toJsonTransactionSignaturePayload_taggedTransaction(v: TransactionSignaturePayload_taggedTransaction): unknown {
  switch (v.type) {
    case 'ENVELOPE_TYPE_TX':
      return { 'tx': toJsonTransaction((v as any).tx) }
    case 'ENVELOPE_TYPE_TX_FEE_BUMP':
      return { 'tx_fee_bump': toJsonFeeBumpTransaction((v as any).feeBump) }
  }
}

export function fromJsonTransactionSignaturePayload_taggedTransaction(json: unknown): TransactionSignaturePayload_taggedTransaction {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for TransactionSignaturePayload_taggedTransaction: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'tx':
      return { type: 'ENVELOPE_TYPE_TX', tx: fromJsonTransaction(obj[key]) } as TransactionSignaturePayload_taggedTransaction
    case 'tx_fee_bump':
      return { type: 'ENVELOPE_TYPE_TX_FEE_BUMP', feeBump: fromJsonFeeBumpTransaction(obj[key]) } as TransactionSignaturePayload_taggedTransaction
    default: throw new Error(`Unknown TransactionSignaturePayload_taggedTransaction variant: ${key}`)
  }
}

export interface TransactionSignaturePayload {
  readonly networkId: Hash
  readonly taggedTransaction: TransactionSignaturePayload_taggedTransaction
}

export function readTransactionSignaturePayload(r: XdrReader): TransactionSignaturePayload {
  beginComposite(r)
  try {
    const networkId = readHash(r)
    const taggedTransaction = readTransactionSignaturePayload_taggedTransaction(r)
    return { networkId, taggedTransaction }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionSignaturePayload(w: XdrWriter, v: TransactionSignaturePayload): void {
  writeHash(w, v.networkId)
  writeTransactionSignaturePayload_taggedTransaction(w, v.taggedTransaction)
}

export function encodeTransactionSignaturePayload(v: TransactionSignaturePayload): Uint8Array {
  return encode(v, writeTransactionSignaturePayload)
}

export function decodeTransactionSignaturePayload(input: Uint8Array | string): TransactionSignaturePayload {
  return decode(input, readTransactionSignaturePayload)
}

export function toJsonTransactionSignaturePayload(v: TransactionSignaturePayload): Record<string, unknown> {
  return {
    'network_id': toJsonHash(v.networkId),
    'tagged_transaction': toJsonTransactionSignaturePayload_taggedTransaction(v.taggedTransaction),
  }
}

export function fromJsonTransactionSignaturePayload(json: unknown): TransactionSignaturePayload {
  const o = json as Record<string, unknown>
  return {
    networkId: fromJsonHash(o['network_id']),
    taggedTransaction: fromJsonTransactionSignaturePayload_taggedTransaction(o['tagged_transaction']),
  }
}

export type ClaimAtomType =
  | 'CLAIM_ATOM_TYPE_V0'
  | 'CLAIM_ATOM_TYPE_ORDER_BOOK'
  | 'CLAIM_ATOM_TYPE_LIQUIDITY_POOL'

export const CLAIM_ATOM_TYPE_TO_INT: Record<ClaimAtomType, number> = /*#__PURE__*/ {
  CLAIM_ATOM_TYPE_V0: 0,
  CLAIM_ATOM_TYPE_ORDER_BOOK: 1,
  CLAIM_ATOM_TYPE_LIQUIDITY_POOL: 2,
}

export const CLAIM_ATOM_TYPE_FROM_INT: Record<number, ClaimAtomType> = /*#__PURE__*/ {
  0: 'CLAIM_ATOM_TYPE_V0',
  1: 'CLAIM_ATOM_TYPE_ORDER_BOOK',
  2: 'CLAIM_ATOM_TYPE_LIQUIDITY_POOL',
}

export function readClaimAtomType(r: XdrReader): ClaimAtomType {
  const v = readInt32(r)
  const result = CLAIM_ATOM_TYPE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ClaimAtomType value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeClaimAtomType(w: XdrWriter, v: ClaimAtomType): void {
  writeInt32(w, CLAIM_ATOM_TYPE_TO_INT[v])
}

export function encodeClaimAtomType(v: ClaimAtomType): Uint8Array {
  return encode(v, writeClaimAtomType)
}

export function decodeClaimAtomType(input: Uint8Array | string): ClaimAtomType {
  return decode(input, readClaimAtomType)
}

const _CLAIM_ATOM_TYPE_TO_JSON: Record<ClaimAtomType, string> = /*#__PURE__*/ {
  CLAIM_ATOM_TYPE_V0: 'v0',
  CLAIM_ATOM_TYPE_ORDER_BOOK: 'order_book',
  CLAIM_ATOM_TYPE_LIQUIDITY_POOL: 'liquidity_pool',
}

const _CLAIM_ATOM_TYPE_FROM_JSON: Record<string, ClaimAtomType> = /*#__PURE__*/ {
  'v0': 'CLAIM_ATOM_TYPE_V0',
  'order_book': 'CLAIM_ATOM_TYPE_ORDER_BOOK',
  'liquidity_pool': 'CLAIM_ATOM_TYPE_LIQUIDITY_POOL',
}

export function toJsonClaimAtomType(v: ClaimAtomType): string {
  return _CLAIM_ATOM_TYPE_TO_JSON[v]
}

export function fromJsonClaimAtomType(json: unknown): ClaimAtomType {
  const result = _CLAIM_ATOM_TYPE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ClaimAtomType JSON value: ${json}`)
  return result
}

/**
 * ClaimOfferAtomV0 is a ClaimOfferAtom with the AccountID discriminant stripped
 * off, leaving a raw ed25519 public key to identify the source account. This is
 * used for backwards compatibility starting from the protocol 17/18 boundary.
 * If an "old-style" ClaimOfferAtom is parsed with this XDR definition, it will
 * be parsed as a "new-style" ClaimAtom containing a ClaimOfferAtomV0.
 */
export interface ClaimOfferAtomV0 {
  /** emitted to identify the offer */
  readonly sellerEd25519: uint256
  /** Account that owns the offer */
  readonly offerID: int64
  /** amount and asset taken from the owner */
  readonly assetSold: Asset
  readonly amountSold: int64
  /** amount and asset sent to the owner */
  readonly assetBought: Asset
  readonly amountBought: int64
}

export function readClaimOfferAtomV0(r: XdrReader): ClaimOfferAtomV0 {
  beginComposite(r)
  try {
    const sellerEd25519 = readuint256(r)
    const offerID = readint64(r)
    const assetSold = readAsset(r)
    const amountSold = readint64(r)
    const assetBought = readAsset(r)
    const amountBought = readint64(r)
    return { sellerEd25519, offerID, assetSold, amountSold, assetBought, amountBought }
  } finally {
    endComposite(r)
  }
}

export function writeClaimOfferAtomV0(w: XdrWriter, v: ClaimOfferAtomV0): void {
  writeuint256(w, v.sellerEd25519)
  writeint64(w, v.offerID)
  writeAsset(w, v.assetSold)
  writeint64(w, v.amountSold)
  writeAsset(w, v.assetBought)
  writeint64(w, v.amountBought)
}

export function encodeClaimOfferAtomV0(v: ClaimOfferAtomV0): Uint8Array {
  return encode(v, writeClaimOfferAtomV0)
}

export function decodeClaimOfferAtomV0(input: Uint8Array | string): ClaimOfferAtomV0 {
  return decode(input, readClaimOfferAtomV0)
}

export function toJsonClaimOfferAtomV0(v: ClaimOfferAtomV0): Record<string, unknown> {
  return {
    'seller_ed25519': toJsonuint256(v.sellerEd25519),
    'offer_id': toJsonint64(v.offerID),
    'asset_sold': toJsonAsset(v.assetSold),
    'amount_sold': toJsonint64(v.amountSold),
    'asset_bought': toJsonAsset(v.assetBought),
    'amount_bought': toJsonint64(v.amountBought),
  }
}

export function fromJsonClaimOfferAtomV0(json: unknown): ClaimOfferAtomV0 {
  const o = json as Record<string, unknown>
  return {
    sellerEd25519: fromJsonuint256(o['seller_ed25519']),
    offerID: fromJsonint64(o['offer_id']),
    assetSold: fromJsonAsset(o['asset_sold']),
    amountSold: fromJsonint64(o['amount_sold']),
    assetBought: fromJsonAsset(o['asset_bought']),
    amountBought: fromJsonint64(o['amount_bought']),
  }
}

export interface ClaimOfferAtom {
  /** emitted to identify the offer */
  readonly sellerID: AccountID
  /** Account that owns the offer */
  readonly offerID: int64
  /** amount and asset taken from the owner */
  readonly assetSold: Asset
  readonly amountSold: int64
  /** amount and asset sent to the owner */
  readonly assetBought: Asset
  readonly amountBought: int64
}

export function readClaimOfferAtom(r: XdrReader): ClaimOfferAtom {
  beginComposite(r)
  try {
    const sellerID = readAccountID(r)
    const offerID = readint64(r)
    const assetSold = readAsset(r)
    const amountSold = readint64(r)
    const assetBought = readAsset(r)
    const amountBought = readint64(r)
    return { sellerID, offerID, assetSold, amountSold, assetBought, amountBought }
  } finally {
    endComposite(r)
  }
}

export function writeClaimOfferAtom(w: XdrWriter, v: ClaimOfferAtom): void {
  writeAccountID(w, v.sellerID)
  writeint64(w, v.offerID)
  writeAsset(w, v.assetSold)
  writeint64(w, v.amountSold)
  writeAsset(w, v.assetBought)
  writeint64(w, v.amountBought)
}

export function encodeClaimOfferAtom(v: ClaimOfferAtom): Uint8Array {
  return encode(v, writeClaimOfferAtom)
}

export function decodeClaimOfferAtom(input: Uint8Array | string): ClaimOfferAtom {
  return decode(input, readClaimOfferAtom)
}

export function toJsonClaimOfferAtom(v: ClaimOfferAtom): Record<string, unknown> {
  return {
    'seller_id': toJsonAccountID(v.sellerID),
    'offer_id': toJsonint64(v.offerID),
    'asset_sold': toJsonAsset(v.assetSold),
    'amount_sold': toJsonint64(v.amountSold),
    'asset_bought': toJsonAsset(v.assetBought),
    'amount_bought': toJsonint64(v.amountBought),
  }
}

export function fromJsonClaimOfferAtom(json: unknown): ClaimOfferAtom {
  const o = json as Record<string, unknown>
  return {
    sellerID: fromJsonAccountID(o['seller_id']),
    offerID: fromJsonint64(o['offer_id']),
    assetSold: fromJsonAsset(o['asset_sold']),
    amountSold: fromJsonint64(o['amount_sold']),
    assetBought: fromJsonAsset(o['asset_bought']),
    amountBought: fromJsonint64(o['amount_bought']),
  }
}

export interface ClaimLiquidityAtom {
  readonly liquidityPoolID: PoolID
  /** amount and asset taken from the pool */
  readonly assetSold: Asset
  readonly amountSold: int64
  /** amount and asset sent to the pool */
  readonly assetBought: Asset
  readonly amountBought: int64
}

export function readClaimLiquidityAtom(r: XdrReader): ClaimLiquidityAtom {
  beginComposite(r)
  try {
    const liquidityPoolID = readPoolID(r)
    const assetSold = readAsset(r)
    const amountSold = readint64(r)
    const assetBought = readAsset(r)
    const amountBought = readint64(r)
    return { liquidityPoolID, assetSold, amountSold, assetBought, amountBought }
  } finally {
    endComposite(r)
  }
}

export function writeClaimLiquidityAtom(w: XdrWriter, v: ClaimLiquidityAtom): void {
  writePoolID(w, v.liquidityPoolID)
  writeAsset(w, v.assetSold)
  writeint64(w, v.amountSold)
  writeAsset(w, v.assetBought)
  writeint64(w, v.amountBought)
}

export function encodeClaimLiquidityAtom(v: ClaimLiquidityAtom): Uint8Array {
  return encode(v, writeClaimLiquidityAtom)
}

export function decodeClaimLiquidityAtom(input: Uint8Array | string): ClaimLiquidityAtom {
  return decode(input, readClaimLiquidityAtom)
}

export function toJsonClaimLiquidityAtom(v: ClaimLiquidityAtom): Record<string, unknown> {
  return {
    'liquidity_pool_id': toJsonPoolID(v.liquidityPoolID),
    'asset_sold': toJsonAsset(v.assetSold),
    'amount_sold': toJsonint64(v.amountSold),
    'asset_bought': toJsonAsset(v.assetBought),
    'amount_bought': toJsonint64(v.amountBought),
  }
}

export function fromJsonClaimLiquidityAtom(json: unknown): ClaimLiquidityAtom {
  const o = json as Record<string, unknown>
  return {
    liquidityPoolID: fromJsonPoolID(o['liquidity_pool_id']),
    assetSold: fromJsonAsset(o['asset_sold']),
    amountSold: fromJsonint64(o['amount_sold']),
    assetBought: fromJsonAsset(o['asset_bought']),
    amountBought: fromJsonint64(o['amount_bought']),
  }
}

/**
 * This result is used when offers are taken or liquidity is exchanged with a
 * liquidity pool during an operation
 */
export type ClaimAtom =
  | { readonly type: 'CLAIM_ATOM_TYPE_V0'; readonly v0: ClaimOfferAtomV0 }
  | { readonly type: 'CLAIM_ATOM_TYPE_ORDER_BOOK'; readonly orderBook: ClaimOfferAtom }
  | { readonly type: 'CLAIM_ATOM_TYPE_LIQUIDITY_POOL'; readonly liquidityPool: ClaimLiquidityAtom }

export function readClaimAtom(r: XdrReader): ClaimAtom {
  beginComposite(r)
  try {
    const type = readClaimAtomType(r)
    let result: ClaimAtom
    switch (type) {
      case 'CLAIM_ATOM_TYPE_V0':
        result = { type, v0: readClaimOfferAtomV0(r) }; break
      case 'CLAIM_ATOM_TYPE_ORDER_BOOK':
        result = { type, orderBook: readClaimOfferAtom(r) }; break
      case 'CLAIM_ATOM_TYPE_LIQUIDITY_POOL':
        result = { type, liquidityPool: readClaimLiquidityAtom(r) }; break
      default:
        throw new XdrReadError(`Unknown ClaimAtom discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeClaimAtom(w: XdrWriter, v: ClaimAtom): void {
  writeClaimAtomType(w, v.type)
  switch (v.type) {
    case 'CLAIM_ATOM_TYPE_V0':
      writeClaimOfferAtomV0(w, (v as any).v0); break
    case 'CLAIM_ATOM_TYPE_ORDER_BOOK':
      writeClaimOfferAtom(w, (v as any).orderBook); break
    case 'CLAIM_ATOM_TYPE_LIQUIDITY_POOL':
      writeClaimLiquidityAtom(w, (v as any).liquidityPool); break
  }
}

export function encodeClaimAtom(v: ClaimAtom): Uint8Array {
  return encode(v, writeClaimAtom)
}

export function decodeClaimAtom(input: Uint8Array | string): ClaimAtom {
  return decode(input, readClaimAtom)
}

export function toJsonClaimAtom(v: ClaimAtom): unknown {
  switch (v.type) {
    case 'CLAIM_ATOM_TYPE_V0':
      return { 'v0': toJsonClaimOfferAtomV0((v as any).v0) }
    case 'CLAIM_ATOM_TYPE_ORDER_BOOK':
      return { 'order_book': toJsonClaimOfferAtom((v as any).orderBook) }
    case 'CLAIM_ATOM_TYPE_LIQUIDITY_POOL':
      return { 'liquidity_pool': toJsonClaimLiquidityAtom((v as any).liquidityPool) }
  }
}

export function fromJsonClaimAtom(json: unknown): ClaimAtom {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for ClaimAtom: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'v0':
      return { type: 'CLAIM_ATOM_TYPE_V0', v0: fromJsonClaimOfferAtomV0(obj[key]) } as ClaimAtom
    case 'order_book':
      return { type: 'CLAIM_ATOM_TYPE_ORDER_BOOK', orderBook: fromJsonClaimOfferAtom(obj[key]) } as ClaimAtom
    case 'liquidity_pool':
      return { type: 'CLAIM_ATOM_TYPE_LIQUIDITY_POOL', liquidityPool: fromJsonClaimLiquidityAtom(obj[key]) } as ClaimAtom
    default: throw new Error(`Unknown ClaimAtom variant: ${key}`)
  }
}

export type CreateAccountResultCode =
  | 'CREATE_ACCOUNT_SUCCESS'
  | 'CREATE_ACCOUNT_MALFORMED'
  | 'CREATE_ACCOUNT_UNDERFUNDED'
  | 'CREATE_ACCOUNT_LOW_RESERVE'
  | 'CREATE_ACCOUNT_ALREADY_EXIST'

export const CREATE_ACCOUNT_RESULT_CODE_TO_INT: Record<CreateAccountResultCode, number> = /*#__PURE__*/ {
  CREATE_ACCOUNT_SUCCESS: 0,
  CREATE_ACCOUNT_MALFORMED: -1,
  CREATE_ACCOUNT_UNDERFUNDED: -2,
  CREATE_ACCOUNT_LOW_RESERVE: -3,
  CREATE_ACCOUNT_ALREADY_EXIST: -4,
}

export const CREATE_ACCOUNT_RESULT_CODE_FROM_INT: Record<number, CreateAccountResultCode> = /*#__PURE__*/ {
  0: 'CREATE_ACCOUNT_SUCCESS',
  [-1]: 'CREATE_ACCOUNT_MALFORMED',
  [-2]: 'CREATE_ACCOUNT_UNDERFUNDED',
  [-3]: 'CREATE_ACCOUNT_LOW_RESERVE',
  [-4]: 'CREATE_ACCOUNT_ALREADY_EXIST',
}

export function readCreateAccountResultCode(r: XdrReader): CreateAccountResultCode {
  const v = readInt32(r)
  const result = CREATE_ACCOUNT_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown CreateAccountResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeCreateAccountResultCode(w: XdrWriter, v: CreateAccountResultCode): void {
  writeInt32(w, CREATE_ACCOUNT_RESULT_CODE_TO_INT[v])
}

export function encodeCreateAccountResultCode(v: CreateAccountResultCode): Uint8Array {
  return encode(v, writeCreateAccountResultCode)
}

export function decodeCreateAccountResultCode(input: Uint8Array | string): CreateAccountResultCode {
  return decode(input, readCreateAccountResultCode)
}

const _CREATE_ACCOUNT_RESULT_CODE_TO_JSON: Record<CreateAccountResultCode, string> = /*#__PURE__*/ {
  CREATE_ACCOUNT_SUCCESS: 'success',
  CREATE_ACCOUNT_MALFORMED: 'malformed',
  CREATE_ACCOUNT_UNDERFUNDED: 'underfunded',
  CREATE_ACCOUNT_LOW_RESERVE: 'low_reserve',
  CREATE_ACCOUNT_ALREADY_EXIST: 'already_exist',
}

const _CREATE_ACCOUNT_RESULT_CODE_FROM_JSON: Record<string, CreateAccountResultCode> = /*#__PURE__*/ {
  'success': 'CREATE_ACCOUNT_SUCCESS',
  'malformed': 'CREATE_ACCOUNT_MALFORMED',
  'underfunded': 'CREATE_ACCOUNT_UNDERFUNDED',
  'low_reserve': 'CREATE_ACCOUNT_LOW_RESERVE',
  'already_exist': 'CREATE_ACCOUNT_ALREADY_EXIST',
}

export function toJsonCreateAccountResultCode(v: CreateAccountResultCode): string {
  return _CREATE_ACCOUNT_RESULT_CODE_TO_JSON[v]
}

export function fromJsonCreateAccountResultCode(json: unknown): CreateAccountResultCode {
  const result = _CREATE_ACCOUNT_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown CreateAccountResultCode JSON value: ${json}`)
  return result
}

export type CreateAccountResult =
  | { readonly code: 'CREATE_ACCOUNT_SUCCESS' }
  | { readonly code: 'CREATE_ACCOUNT_MALFORMED' }
  | { readonly code: 'CREATE_ACCOUNT_UNDERFUNDED' }
  | { readonly code: 'CREATE_ACCOUNT_LOW_RESERVE' }
  | { readonly code: 'CREATE_ACCOUNT_ALREADY_EXIST' }

export function readCreateAccountResult(r: XdrReader): CreateAccountResult {
  beginComposite(r)
  try {
    const code = readCreateAccountResultCode(r)
    let result: CreateAccountResult
    switch (code) {
      case 'CREATE_ACCOUNT_SUCCESS':
        result = { code }; break
      case 'CREATE_ACCOUNT_MALFORMED':
      case 'CREATE_ACCOUNT_UNDERFUNDED':
      case 'CREATE_ACCOUNT_LOW_RESERVE':
      case 'CREATE_ACCOUNT_ALREADY_EXIST':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown CreateAccountResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeCreateAccountResult(w: XdrWriter, v: CreateAccountResult): void {
  writeCreateAccountResultCode(w, v.code)
  switch (v.code) {
    case 'CREATE_ACCOUNT_SUCCESS':
      break
    case 'CREATE_ACCOUNT_MALFORMED':
    case 'CREATE_ACCOUNT_UNDERFUNDED':
    case 'CREATE_ACCOUNT_LOW_RESERVE':
    case 'CREATE_ACCOUNT_ALREADY_EXIST':
      break
  }
}

export function encodeCreateAccountResult(v: CreateAccountResult): Uint8Array {
  return encode(v, writeCreateAccountResult)
}

export function decodeCreateAccountResult(input: Uint8Array | string): CreateAccountResult {
  return decode(input, readCreateAccountResult)
}

export function toJsonCreateAccountResult(v: CreateAccountResult): unknown {
  switch (v.code) {
    case 'CREATE_ACCOUNT_SUCCESS':
      return 'success'
    case 'CREATE_ACCOUNT_MALFORMED':
      return 'malformed'
    case 'CREATE_ACCOUNT_UNDERFUNDED':
      return 'underfunded'
    case 'CREATE_ACCOUNT_LOW_RESERVE':
      return 'low_reserve'
    case 'CREATE_ACCOUNT_ALREADY_EXIST':
      return 'already_exist'
  }
}

export function fromJsonCreateAccountResult(json: unknown): CreateAccountResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'CREATE_ACCOUNT_SUCCESS' } as CreateAccountResult
    if (json === 'malformed') return { code: 'CREATE_ACCOUNT_MALFORMED' } as CreateAccountResult
    if (json === 'underfunded') return { code: 'CREATE_ACCOUNT_UNDERFUNDED' } as CreateAccountResult
    if (json === 'low_reserve') return { code: 'CREATE_ACCOUNT_LOW_RESERVE' } as CreateAccountResult
    if (json === 'already_exist') return { code: 'CREATE_ACCOUNT_ALREADY_EXIST' } as CreateAccountResult
    throw new Error(`Unknown CreateAccountResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown CreateAccountResult variant: ${key}`)
  }
}

export type PaymentResultCode =
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_MALFORMED'
  | 'PAYMENT_UNDERFUNDED'
  | 'PAYMENT_SRC_NO_TRUST'
  | 'PAYMENT_SRC_NOT_AUTHORIZED'
  | 'PAYMENT_NO_DESTINATION'
  | 'PAYMENT_NO_TRUST'
  | 'PAYMENT_NOT_AUTHORIZED'
  | 'PAYMENT_LINE_FULL'
  | 'PAYMENT_NO_ISSUER'

export const PAYMENT_RESULT_CODE_TO_INT: Record<PaymentResultCode, number> = /*#__PURE__*/ {
  PAYMENT_SUCCESS: 0,
  PAYMENT_MALFORMED: -1,
  PAYMENT_UNDERFUNDED: -2,
  PAYMENT_SRC_NO_TRUST: -3,
  PAYMENT_SRC_NOT_AUTHORIZED: -4,
  PAYMENT_NO_DESTINATION: -5,
  PAYMENT_NO_TRUST: -6,
  PAYMENT_NOT_AUTHORIZED: -7,
  PAYMENT_LINE_FULL: -8,
  PAYMENT_NO_ISSUER: -9,
}

export const PAYMENT_RESULT_CODE_FROM_INT: Record<number, PaymentResultCode> = /*#__PURE__*/ {
  0: 'PAYMENT_SUCCESS',
  [-1]: 'PAYMENT_MALFORMED',
  [-2]: 'PAYMENT_UNDERFUNDED',
  [-3]: 'PAYMENT_SRC_NO_TRUST',
  [-4]: 'PAYMENT_SRC_NOT_AUTHORIZED',
  [-5]: 'PAYMENT_NO_DESTINATION',
  [-6]: 'PAYMENT_NO_TRUST',
  [-7]: 'PAYMENT_NOT_AUTHORIZED',
  [-8]: 'PAYMENT_LINE_FULL',
  [-9]: 'PAYMENT_NO_ISSUER',
}

export function readPaymentResultCode(r: XdrReader): PaymentResultCode {
  const v = readInt32(r)
  const result = PAYMENT_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown PaymentResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writePaymentResultCode(w: XdrWriter, v: PaymentResultCode): void {
  writeInt32(w, PAYMENT_RESULT_CODE_TO_INT[v])
}

export function encodePaymentResultCode(v: PaymentResultCode): Uint8Array {
  return encode(v, writePaymentResultCode)
}

export function decodePaymentResultCode(input: Uint8Array | string): PaymentResultCode {
  return decode(input, readPaymentResultCode)
}

const _PAYMENT_RESULT_CODE_TO_JSON: Record<PaymentResultCode, string> = /*#__PURE__*/ {
  PAYMENT_SUCCESS: 'success',
  PAYMENT_MALFORMED: 'malformed',
  PAYMENT_UNDERFUNDED: 'underfunded',
  PAYMENT_SRC_NO_TRUST: 'src_no_trust',
  PAYMENT_SRC_NOT_AUTHORIZED: 'src_not_authorized',
  PAYMENT_NO_DESTINATION: 'no_destination',
  PAYMENT_NO_TRUST: 'no_trust',
  PAYMENT_NOT_AUTHORIZED: 'not_authorized',
  PAYMENT_LINE_FULL: 'line_full',
  PAYMENT_NO_ISSUER: 'no_issuer',
}

const _PAYMENT_RESULT_CODE_FROM_JSON: Record<string, PaymentResultCode> = /*#__PURE__*/ {
  'success': 'PAYMENT_SUCCESS',
  'malformed': 'PAYMENT_MALFORMED',
  'underfunded': 'PAYMENT_UNDERFUNDED',
  'src_no_trust': 'PAYMENT_SRC_NO_TRUST',
  'src_not_authorized': 'PAYMENT_SRC_NOT_AUTHORIZED',
  'no_destination': 'PAYMENT_NO_DESTINATION',
  'no_trust': 'PAYMENT_NO_TRUST',
  'not_authorized': 'PAYMENT_NOT_AUTHORIZED',
  'line_full': 'PAYMENT_LINE_FULL',
  'no_issuer': 'PAYMENT_NO_ISSUER',
}

export function toJsonPaymentResultCode(v: PaymentResultCode): string {
  return _PAYMENT_RESULT_CODE_TO_JSON[v]
}

export function fromJsonPaymentResultCode(json: unknown): PaymentResultCode {
  const result = _PAYMENT_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown PaymentResultCode JSON value: ${json}`)
  return result
}

export type PaymentResult =
  | { readonly code: 'PAYMENT_SUCCESS' }
  | { readonly code: 'PAYMENT_MALFORMED' }
  | { readonly code: 'PAYMENT_UNDERFUNDED' }
  | { readonly code: 'PAYMENT_SRC_NO_TRUST' }
  | { readonly code: 'PAYMENT_SRC_NOT_AUTHORIZED' }
  | { readonly code: 'PAYMENT_NO_DESTINATION' }
  | { readonly code: 'PAYMENT_NO_TRUST' }
  | { readonly code: 'PAYMENT_NOT_AUTHORIZED' }
  | { readonly code: 'PAYMENT_LINE_FULL' }
  | { readonly code: 'PAYMENT_NO_ISSUER' }

export function readPaymentResult(r: XdrReader): PaymentResult {
  beginComposite(r)
  try {
    const code = readPaymentResultCode(r)
    let result: PaymentResult
    switch (code) {
      case 'PAYMENT_SUCCESS':
        result = { code }; break
      case 'PAYMENT_MALFORMED':
      case 'PAYMENT_UNDERFUNDED':
      case 'PAYMENT_SRC_NO_TRUST':
      case 'PAYMENT_SRC_NOT_AUTHORIZED':
      case 'PAYMENT_NO_DESTINATION':
      case 'PAYMENT_NO_TRUST':
      case 'PAYMENT_NOT_AUTHORIZED':
      case 'PAYMENT_LINE_FULL':
      case 'PAYMENT_NO_ISSUER':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown PaymentResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writePaymentResult(w: XdrWriter, v: PaymentResult): void {
  writePaymentResultCode(w, v.code)
  switch (v.code) {
    case 'PAYMENT_SUCCESS':
      break
    case 'PAYMENT_MALFORMED':
    case 'PAYMENT_UNDERFUNDED':
    case 'PAYMENT_SRC_NO_TRUST':
    case 'PAYMENT_SRC_NOT_AUTHORIZED':
    case 'PAYMENT_NO_DESTINATION':
    case 'PAYMENT_NO_TRUST':
    case 'PAYMENT_NOT_AUTHORIZED':
    case 'PAYMENT_LINE_FULL':
    case 'PAYMENT_NO_ISSUER':
      break
  }
}

export function encodePaymentResult(v: PaymentResult): Uint8Array {
  return encode(v, writePaymentResult)
}

export function decodePaymentResult(input: Uint8Array | string): PaymentResult {
  return decode(input, readPaymentResult)
}

export function toJsonPaymentResult(v: PaymentResult): unknown {
  switch (v.code) {
    case 'PAYMENT_SUCCESS':
      return 'success'
    case 'PAYMENT_MALFORMED':
      return 'malformed'
    case 'PAYMENT_UNDERFUNDED':
      return 'underfunded'
    case 'PAYMENT_SRC_NO_TRUST':
      return 'src_no_trust'
    case 'PAYMENT_SRC_NOT_AUTHORIZED':
      return 'src_not_authorized'
    case 'PAYMENT_NO_DESTINATION':
      return 'no_destination'
    case 'PAYMENT_NO_TRUST':
      return 'no_trust'
    case 'PAYMENT_NOT_AUTHORIZED':
      return 'not_authorized'
    case 'PAYMENT_LINE_FULL':
      return 'line_full'
    case 'PAYMENT_NO_ISSUER':
      return 'no_issuer'
  }
}

export function fromJsonPaymentResult(json: unknown): PaymentResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'PAYMENT_SUCCESS' } as PaymentResult
    if (json === 'malformed') return { code: 'PAYMENT_MALFORMED' } as PaymentResult
    if (json === 'underfunded') return { code: 'PAYMENT_UNDERFUNDED' } as PaymentResult
    if (json === 'src_no_trust') return { code: 'PAYMENT_SRC_NO_TRUST' } as PaymentResult
    if (json === 'src_not_authorized') return { code: 'PAYMENT_SRC_NOT_AUTHORIZED' } as PaymentResult
    if (json === 'no_destination') return { code: 'PAYMENT_NO_DESTINATION' } as PaymentResult
    if (json === 'no_trust') return { code: 'PAYMENT_NO_TRUST' } as PaymentResult
    if (json === 'not_authorized') return { code: 'PAYMENT_NOT_AUTHORIZED' } as PaymentResult
    if (json === 'line_full') return { code: 'PAYMENT_LINE_FULL' } as PaymentResult
    if (json === 'no_issuer') return { code: 'PAYMENT_NO_ISSUER' } as PaymentResult
    throw new Error(`Unknown PaymentResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown PaymentResult variant: ${key}`)
  }
}

export type PathPaymentStrictReceiveResultCode =
  | 'PATH_PAYMENT_STRICT_RECEIVE_SUCCESS'
  | 'PATH_PAYMENT_STRICT_RECEIVE_MALFORMED'
  | 'PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED'
  | 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST'
  | 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED'
  | 'PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION'
  | 'PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST'
  | 'PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED'
  | 'PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL'
  | 'PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER'
  | 'PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS'
  | 'PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF'
  | 'PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX'

export const PATH_PAYMENT_STRICT_RECEIVE_RESULT_CODE_TO_INT: Record<PathPaymentStrictReceiveResultCode, number> = /*#__PURE__*/ {
  PATH_PAYMENT_STRICT_RECEIVE_SUCCESS: 0,
  PATH_PAYMENT_STRICT_RECEIVE_MALFORMED: -1,
  PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED: -2,
  PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST: -3,
  PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED: -4,
  PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION: -5,
  PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST: -6,
  PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED: -7,
  PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL: -8,
  PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER: -9,
  PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS: -10,
  PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF: -11,
  PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX: -12,
}

export const PATH_PAYMENT_STRICT_RECEIVE_RESULT_CODE_FROM_INT: Record<number, PathPaymentStrictReceiveResultCode> = /*#__PURE__*/ {
  0: 'PATH_PAYMENT_STRICT_RECEIVE_SUCCESS',
  [-1]: 'PATH_PAYMENT_STRICT_RECEIVE_MALFORMED',
  [-2]: 'PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED',
  [-3]: 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST',
  [-4]: 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED',
  [-5]: 'PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION',
  [-6]: 'PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST',
  [-7]: 'PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED',
  [-8]: 'PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL',
  [-9]: 'PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER',
  [-10]: 'PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS',
  [-11]: 'PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF',
  [-12]: 'PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX',
}

export function readPathPaymentStrictReceiveResultCode(r: XdrReader): PathPaymentStrictReceiveResultCode {
  const v = readInt32(r)
  const result = PATH_PAYMENT_STRICT_RECEIVE_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown PathPaymentStrictReceiveResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writePathPaymentStrictReceiveResultCode(w: XdrWriter, v: PathPaymentStrictReceiveResultCode): void {
  writeInt32(w, PATH_PAYMENT_STRICT_RECEIVE_RESULT_CODE_TO_INT[v])
}

export function encodePathPaymentStrictReceiveResultCode(v: PathPaymentStrictReceiveResultCode): Uint8Array {
  return encode(v, writePathPaymentStrictReceiveResultCode)
}

export function decodePathPaymentStrictReceiveResultCode(input: Uint8Array | string): PathPaymentStrictReceiveResultCode {
  return decode(input, readPathPaymentStrictReceiveResultCode)
}

const _PATH_PAYMENT_STRICT_RECEIVE_RESULT_CODE_TO_JSON: Record<PathPaymentStrictReceiveResultCode, string> = /*#__PURE__*/ {
  PATH_PAYMENT_STRICT_RECEIVE_SUCCESS: 'success',
  PATH_PAYMENT_STRICT_RECEIVE_MALFORMED: 'malformed',
  PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED: 'underfunded',
  PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST: 'src_no_trust',
  PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED: 'src_not_authorized',
  PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION: 'no_destination',
  PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST: 'no_trust',
  PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED: 'not_authorized',
  PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL: 'line_full',
  PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER: 'no_issuer',
  PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS: 'too_few_offers',
  PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF: 'offer_cross_self',
  PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX: 'over_sendmax',
}

const _PATH_PAYMENT_STRICT_RECEIVE_RESULT_CODE_FROM_JSON: Record<string, PathPaymentStrictReceiveResultCode> = /*#__PURE__*/ {
  'success': 'PATH_PAYMENT_STRICT_RECEIVE_SUCCESS',
  'malformed': 'PATH_PAYMENT_STRICT_RECEIVE_MALFORMED',
  'underfunded': 'PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED',
  'src_no_trust': 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST',
  'src_not_authorized': 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED',
  'no_destination': 'PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION',
  'no_trust': 'PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST',
  'not_authorized': 'PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED',
  'line_full': 'PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL',
  'no_issuer': 'PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER',
  'too_few_offers': 'PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS',
  'offer_cross_self': 'PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF',
  'over_sendmax': 'PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX',
}

export function toJsonPathPaymentStrictReceiveResultCode(v: PathPaymentStrictReceiveResultCode): string {
  return _PATH_PAYMENT_STRICT_RECEIVE_RESULT_CODE_TO_JSON[v]
}

export function fromJsonPathPaymentStrictReceiveResultCode(json: unknown): PathPaymentStrictReceiveResultCode {
  const result = _PATH_PAYMENT_STRICT_RECEIVE_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown PathPaymentStrictReceiveResultCode JSON value: ${json}`)
  return result
}

export interface SimplePaymentResult {
  readonly destination: AccountID
  readonly asset: Asset
  readonly amount: int64
}

export function readSimplePaymentResult(r: XdrReader): SimplePaymentResult {
  beginComposite(r)
  try {
    const destination = readAccountID(r)
    const asset = readAsset(r)
    const amount = readint64(r)
    return { destination, asset, amount }
  } finally {
    endComposite(r)
  }
}

export function writeSimplePaymentResult(w: XdrWriter, v: SimplePaymentResult): void {
  writeAccountID(w, v.destination)
  writeAsset(w, v.asset)
  writeint64(w, v.amount)
}

export function encodeSimplePaymentResult(v: SimplePaymentResult): Uint8Array {
  return encode(v, writeSimplePaymentResult)
}

export function decodeSimplePaymentResult(input: Uint8Array | string): SimplePaymentResult {
  return decode(input, readSimplePaymentResult)
}

export function toJsonSimplePaymentResult(v: SimplePaymentResult): Record<string, unknown> {
  return {
    'destination': toJsonAccountID(v.destination),
    'asset': toJsonAsset(v.asset),
    'amount': toJsonint64(v.amount),
  }
}

export function fromJsonSimplePaymentResult(json: unknown): SimplePaymentResult {
  const o = json as Record<string, unknown>
  return {
    destination: fromJsonAccountID(o['destination']),
    asset: fromJsonAsset(o['asset']),
    amount: fromJsonint64(o['amount']),
  }
}

export interface PathPaymentStrictReceiveResult_success {
  readonly offers: ClaimAtom[]
  readonly last: SimplePaymentResult
}

export function readPathPaymentStrictReceiveResult_success(r: XdrReader): PathPaymentStrictReceiveResult_success {
  beginComposite(r)
  try {
    const offers = readVarArray(r, UINT32_MAX, readClaimAtom)
    const last = readSimplePaymentResult(r)
    return { offers, last }
  } finally {
    endComposite(r)
  }
}

export function writePathPaymentStrictReceiveResult_success(w: XdrWriter, v: PathPaymentStrictReceiveResult_success): void {
  writeVarArray(w, v.offers, UINT32_MAX, writeClaimAtom)
  writeSimplePaymentResult(w, v.last)
}

export function encodePathPaymentStrictReceiveResult_success(v: PathPaymentStrictReceiveResult_success): Uint8Array {
  return encode(v, writePathPaymentStrictReceiveResult_success)
}

export function decodePathPaymentStrictReceiveResult_success(input: Uint8Array | string): PathPaymentStrictReceiveResult_success {
  return decode(input, readPathPaymentStrictReceiveResult_success)
}

export function toJsonPathPaymentStrictReceiveResult_success(v: PathPaymentStrictReceiveResult_success): Record<string, unknown> {
  return {
    'offers': v.offers.map((item: any) => toJsonClaimAtom(item)),
    'last': toJsonSimplePaymentResult(v.last),
  }
}

export function fromJsonPathPaymentStrictReceiveResult_success(json: unknown): PathPaymentStrictReceiveResult_success {
  const o = json as Record<string, unknown>
  return {
    offers: ((o['offers']) as unknown[]).map((item: unknown) => fromJsonClaimAtom(item)),
    last: fromJsonSimplePaymentResult(o['last']),
  }
}

export type PathPaymentStrictReceiveResult =
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_SUCCESS'; readonly success: PathPaymentStrictReceiveResult_success }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_MALFORMED' }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED' }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST' }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED' }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION' }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST' }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED' }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL' }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER'; readonly noIssuer: Asset }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS' }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF' }
  | { readonly code: 'PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX' }

export function readPathPaymentStrictReceiveResult(r: XdrReader): PathPaymentStrictReceiveResult {
  beginComposite(r)
  try {
    const code = readPathPaymentStrictReceiveResultCode(r)
    let result: PathPaymentStrictReceiveResult
    switch (code) {
      case 'PATH_PAYMENT_STRICT_RECEIVE_SUCCESS':
        result = { code, success: readPathPaymentStrictReceiveResult_success(r) }; break
      case 'PATH_PAYMENT_STRICT_RECEIVE_MALFORMED':
      case 'PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED':
      case 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST':
      case 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED':
      case 'PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION':
      case 'PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST':
      case 'PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED':
      case 'PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL':
        result = { code }; break
      case 'PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER':
        result = { code, noIssuer: readAsset(r) }; break
      case 'PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS':
      case 'PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF':
      case 'PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown PathPaymentStrictReceiveResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writePathPaymentStrictReceiveResult(w: XdrWriter, v: PathPaymentStrictReceiveResult): void {
  writePathPaymentStrictReceiveResultCode(w, v.code)
  switch (v.code) {
    case 'PATH_PAYMENT_STRICT_RECEIVE_SUCCESS':
      writePathPaymentStrictReceiveResult_success(w, (v as any).success); break
    case 'PATH_PAYMENT_STRICT_RECEIVE_MALFORMED':
    case 'PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED':
    case 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST':
    case 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED':
    case 'PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION':
    case 'PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST':
    case 'PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED':
    case 'PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL':
      break
    case 'PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER':
      writeAsset(w, (v as any).noIssuer); break
    case 'PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS':
    case 'PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF':
    case 'PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX':
      break
  }
}

export function encodePathPaymentStrictReceiveResult(v: PathPaymentStrictReceiveResult): Uint8Array {
  return encode(v, writePathPaymentStrictReceiveResult)
}

export function decodePathPaymentStrictReceiveResult(input: Uint8Array | string): PathPaymentStrictReceiveResult {
  return decode(input, readPathPaymentStrictReceiveResult)
}

export function toJsonPathPaymentStrictReceiveResult(v: PathPaymentStrictReceiveResult): unknown {
  switch (v.code) {
    case 'PATH_PAYMENT_STRICT_RECEIVE_SUCCESS':
      return { 'success': toJsonPathPaymentStrictReceiveResult_success((v as any).success) }
    case 'PATH_PAYMENT_STRICT_RECEIVE_MALFORMED':
      return 'malformed'
    case 'PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED':
      return 'underfunded'
    case 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST':
      return 'src_no_trust'
    case 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED':
      return 'src_not_authorized'
    case 'PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION':
      return 'no_destination'
    case 'PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST':
      return 'no_trust'
    case 'PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED':
      return 'not_authorized'
    case 'PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL':
      return 'line_full'
    case 'PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER':
      return { 'no_issuer': toJsonAsset((v as any).noIssuer) }
    case 'PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS':
      return 'too_few_offers'
    case 'PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF':
      return 'offer_cross_self'
    case 'PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX':
      return 'over_sendmax'
  }
}

export function fromJsonPathPaymentStrictReceiveResult(json: unknown): PathPaymentStrictReceiveResult {
  if (typeof json === 'string') {
    if (json === 'malformed') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_MALFORMED' } as PathPaymentStrictReceiveResult
    if (json === 'underfunded') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED' } as PathPaymentStrictReceiveResult
    if (json === 'src_no_trust') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST' } as PathPaymentStrictReceiveResult
    if (json === 'src_not_authorized') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED' } as PathPaymentStrictReceiveResult
    if (json === 'no_destination') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION' } as PathPaymentStrictReceiveResult
    if (json === 'no_trust') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST' } as PathPaymentStrictReceiveResult
    if (json === 'not_authorized') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED' } as PathPaymentStrictReceiveResult
    if (json === 'line_full') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL' } as PathPaymentStrictReceiveResult
    if (json === 'too_few_offers') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS' } as PathPaymentStrictReceiveResult
    if (json === 'offer_cross_self') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF' } as PathPaymentStrictReceiveResult
    if (json === 'over_sendmax') return { code: 'PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX' } as PathPaymentStrictReceiveResult
    throw new Error(`Unknown PathPaymentStrictReceiveResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'success':
      return { code: 'PATH_PAYMENT_STRICT_RECEIVE_SUCCESS', success: fromJsonPathPaymentStrictReceiveResult_success(obj[key]) } as PathPaymentStrictReceiveResult
    case 'no_issuer':
      return { code: 'PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER', noIssuer: fromJsonAsset(obj[key]) } as PathPaymentStrictReceiveResult
    default: throw new Error(`Unknown PathPaymentStrictReceiveResult variant: ${key}`)
  }
}

export type PathPaymentStrictSendResultCode =
  | 'PATH_PAYMENT_STRICT_SEND_SUCCESS'
  | 'PATH_PAYMENT_STRICT_SEND_MALFORMED'
  | 'PATH_PAYMENT_STRICT_SEND_UNDERFUNDED'
  | 'PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST'
  | 'PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED'
  | 'PATH_PAYMENT_STRICT_SEND_NO_DESTINATION'
  | 'PATH_PAYMENT_STRICT_SEND_NO_TRUST'
  | 'PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED'
  | 'PATH_PAYMENT_STRICT_SEND_LINE_FULL'
  | 'PATH_PAYMENT_STRICT_SEND_NO_ISSUER'
  | 'PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS'
  | 'PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF'
  | 'PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN'

export const PATH_PAYMENT_STRICT_SEND_RESULT_CODE_TO_INT: Record<PathPaymentStrictSendResultCode, number> = /*#__PURE__*/ {
  PATH_PAYMENT_STRICT_SEND_SUCCESS: 0,
  PATH_PAYMENT_STRICT_SEND_MALFORMED: -1,
  PATH_PAYMENT_STRICT_SEND_UNDERFUNDED: -2,
  PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST: -3,
  PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED: -4,
  PATH_PAYMENT_STRICT_SEND_NO_DESTINATION: -5,
  PATH_PAYMENT_STRICT_SEND_NO_TRUST: -6,
  PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED: -7,
  PATH_PAYMENT_STRICT_SEND_LINE_FULL: -8,
  PATH_PAYMENT_STRICT_SEND_NO_ISSUER: -9,
  PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS: -10,
  PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF: -11,
  PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN: -12,
}

export const PATH_PAYMENT_STRICT_SEND_RESULT_CODE_FROM_INT: Record<number, PathPaymentStrictSendResultCode> = /*#__PURE__*/ {
  0: 'PATH_PAYMENT_STRICT_SEND_SUCCESS',
  [-1]: 'PATH_PAYMENT_STRICT_SEND_MALFORMED',
  [-2]: 'PATH_PAYMENT_STRICT_SEND_UNDERFUNDED',
  [-3]: 'PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST',
  [-4]: 'PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED',
  [-5]: 'PATH_PAYMENT_STRICT_SEND_NO_DESTINATION',
  [-6]: 'PATH_PAYMENT_STRICT_SEND_NO_TRUST',
  [-7]: 'PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED',
  [-8]: 'PATH_PAYMENT_STRICT_SEND_LINE_FULL',
  [-9]: 'PATH_PAYMENT_STRICT_SEND_NO_ISSUER',
  [-10]: 'PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS',
  [-11]: 'PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF',
  [-12]: 'PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN',
}

export function readPathPaymentStrictSendResultCode(r: XdrReader): PathPaymentStrictSendResultCode {
  const v = readInt32(r)
  const result = PATH_PAYMENT_STRICT_SEND_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown PathPaymentStrictSendResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writePathPaymentStrictSendResultCode(w: XdrWriter, v: PathPaymentStrictSendResultCode): void {
  writeInt32(w, PATH_PAYMENT_STRICT_SEND_RESULT_CODE_TO_INT[v])
}

export function encodePathPaymentStrictSendResultCode(v: PathPaymentStrictSendResultCode): Uint8Array {
  return encode(v, writePathPaymentStrictSendResultCode)
}

export function decodePathPaymentStrictSendResultCode(input: Uint8Array | string): PathPaymentStrictSendResultCode {
  return decode(input, readPathPaymentStrictSendResultCode)
}

const _PATH_PAYMENT_STRICT_SEND_RESULT_CODE_TO_JSON: Record<PathPaymentStrictSendResultCode, string> = /*#__PURE__*/ {
  PATH_PAYMENT_STRICT_SEND_SUCCESS: 'success',
  PATH_PAYMENT_STRICT_SEND_MALFORMED: 'malformed',
  PATH_PAYMENT_STRICT_SEND_UNDERFUNDED: 'underfunded',
  PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST: 'src_no_trust',
  PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED: 'src_not_authorized',
  PATH_PAYMENT_STRICT_SEND_NO_DESTINATION: 'no_destination',
  PATH_PAYMENT_STRICT_SEND_NO_TRUST: 'no_trust',
  PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED: 'not_authorized',
  PATH_PAYMENT_STRICT_SEND_LINE_FULL: 'line_full',
  PATH_PAYMENT_STRICT_SEND_NO_ISSUER: 'no_issuer',
  PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS: 'too_few_offers',
  PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF: 'offer_cross_self',
  PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN: 'under_destmin',
}

const _PATH_PAYMENT_STRICT_SEND_RESULT_CODE_FROM_JSON: Record<string, PathPaymentStrictSendResultCode> = /*#__PURE__*/ {
  'success': 'PATH_PAYMENT_STRICT_SEND_SUCCESS',
  'malformed': 'PATH_PAYMENT_STRICT_SEND_MALFORMED',
  'underfunded': 'PATH_PAYMENT_STRICT_SEND_UNDERFUNDED',
  'src_no_trust': 'PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST',
  'src_not_authorized': 'PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED',
  'no_destination': 'PATH_PAYMENT_STRICT_SEND_NO_DESTINATION',
  'no_trust': 'PATH_PAYMENT_STRICT_SEND_NO_TRUST',
  'not_authorized': 'PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED',
  'line_full': 'PATH_PAYMENT_STRICT_SEND_LINE_FULL',
  'no_issuer': 'PATH_PAYMENT_STRICT_SEND_NO_ISSUER',
  'too_few_offers': 'PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS',
  'offer_cross_self': 'PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF',
  'under_destmin': 'PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN',
}

export function toJsonPathPaymentStrictSendResultCode(v: PathPaymentStrictSendResultCode): string {
  return _PATH_PAYMENT_STRICT_SEND_RESULT_CODE_TO_JSON[v]
}

export function fromJsonPathPaymentStrictSendResultCode(json: unknown): PathPaymentStrictSendResultCode {
  const result = _PATH_PAYMENT_STRICT_SEND_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown PathPaymentStrictSendResultCode JSON value: ${json}`)
  return result
}

export interface PathPaymentStrictSendResult_success {
  readonly offers: ClaimAtom[]
  readonly last: SimplePaymentResult
}

export function readPathPaymentStrictSendResult_success(r: XdrReader): PathPaymentStrictSendResult_success {
  beginComposite(r)
  try {
    const offers = readVarArray(r, UINT32_MAX, readClaimAtom)
    const last = readSimplePaymentResult(r)
    return { offers, last }
  } finally {
    endComposite(r)
  }
}

export function writePathPaymentStrictSendResult_success(w: XdrWriter, v: PathPaymentStrictSendResult_success): void {
  writeVarArray(w, v.offers, UINT32_MAX, writeClaimAtom)
  writeSimplePaymentResult(w, v.last)
}

export function encodePathPaymentStrictSendResult_success(v: PathPaymentStrictSendResult_success): Uint8Array {
  return encode(v, writePathPaymentStrictSendResult_success)
}

export function decodePathPaymentStrictSendResult_success(input: Uint8Array | string): PathPaymentStrictSendResult_success {
  return decode(input, readPathPaymentStrictSendResult_success)
}

export function toJsonPathPaymentStrictSendResult_success(v: PathPaymentStrictSendResult_success): Record<string, unknown> {
  return {
    'offers': v.offers.map((item: any) => toJsonClaimAtom(item)),
    'last': toJsonSimplePaymentResult(v.last),
  }
}

export function fromJsonPathPaymentStrictSendResult_success(json: unknown): PathPaymentStrictSendResult_success {
  const o = json as Record<string, unknown>
  return {
    offers: ((o['offers']) as unknown[]).map((item: unknown) => fromJsonClaimAtom(item)),
    last: fromJsonSimplePaymentResult(o['last']),
  }
}

export type PathPaymentStrictSendResult =
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_SUCCESS'; readonly success: PathPaymentStrictSendResult_success }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_MALFORMED' }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_UNDERFUNDED' }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST' }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED' }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_NO_DESTINATION' }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_NO_TRUST' }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED' }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_LINE_FULL' }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_NO_ISSUER'; readonly noIssuer: Asset }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS' }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF' }
  | { readonly code: 'PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN' }

export function readPathPaymentStrictSendResult(r: XdrReader): PathPaymentStrictSendResult {
  beginComposite(r)
  try {
    const code = readPathPaymentStrictSendResultCode(r)
    let result: PathPaymentStrictSendResult
    switch (code) {
      case 'PATH_PAYMENT_STRICT_SEND_SUCCESS':
        result = { code, success: readPathPaymentStrictSendResult_success(r) }; break
      case 'PATH_PAYMENT_STRICT_SEND_MALFORMED':
      case 'PATH_PAYMENT_STRICT_SEND_UNDERFUNDED':
      case 'PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST':
      case 'PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED':
      case 'PATH_PAYMENT_STRICT_SEND_NO_DESTINATION':
      case 'PATH_PAYMENT_STRICT_SEND_NO_TRUST':
      case 'PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED':
      case 'PATH_PAYMENT_STRICT_SEND_LINE_FULL':
        result = { code }; break
      case 'PATH_PAYMENT_STRICT_SEND_NO_ISSUER':
        result = { code, noIssuer: readAsset(r) }; break
      case 'PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS':
      case 'PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF':
      case 'PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown PathPaymentStrictSendResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writePathPaymentStrictSendResult(w: XdrWriter, v: PathPaymentStrictSendResult): void {
  writePathPaymentStrictSendResultCode(w, v.code)
  switch (v.code) {
    case 'PATH_PAYMENT_STRICT_SEND_SUCCESS':
      writePathPaymentStrictSendResult_success(w, (v as any).success); break
    case 'PATH_PAYMENT_STRICT_SEND_MALFORMED':
    case 'PATH_PAYMENT_STRICT_SEND_UNDERFUNDED':
    case 'PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST':
    case 'PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED':
    case 'PATH_PAYMENT_STRICT_SEND_NO_DESTINATION':
    case 'PATH_PAYMENT_STRICT_SEND_NO_TRUST':
    case 'PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED':
    case 'PATH_PAYMENT_STRICT_SEND_LINE_FULL':
      break
    case 'PATH_PAYMENT_STRICT_SEND_NO_ISSUER':
      writeAsset(w, (v as any).noIssuer); break
    case 'PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS':
    case 'PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF':
    case 'PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN':
      break
  }
}

export function encodePathPaymentStrictSendResult(v: PathPaymentStrictSendResult): Uint8Array {
  return encode(v, writePathPaymentStrictSendResult)
}

export function decodePathPaymentStrictSendResult(input: Uint8Array | string): PathPaymentStrictSendResult {
  return decode(input, readPathPaymentStrictSendResult)
}

export function toJsonPathPaymentStrictSendResult(v: PathPaymentStrictSendResult): unknown {
  switch (v.code) {
    case 'PATH_PAYMENT_STRICT_SEND_SUCCESS':
      return { 'success': toJsonPathPaymentStrictSendResult_success((v as any).success) }
    case 'PATH_PAYMENT_STRICT_SEND_MALFORMED':
      return 'malformed'
    case 'PATH_PAYMENT_STRICT_SEND_UNDERFUNDED':
      return 'underfunded'
    case 'PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST':
      return 'src_no_trust'
    case 'PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED':
      return 'src_not_authorized'
    case 'PATH_PAYMENT_STRICT_SEND_NO_DESTINATION':
      return 'no_destination'
    case 'PATH_PAYMENT_STRICT_SEND_NO_TRUST':
      return 'no_trust'
    case 'PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED':
      return 'not_authorized'
    case 'PATH_PAYMENT_STRICT_SEND_LINE_FULL':
      return 'line_full'
    case 'PATH_PAYMENT_STRICT_SEND_NO_ISSUER':
      return { 'no_issuer': toJsonAsset((v as any).noIssuer) }
    case 'PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS':
      return 'too_few_offers'
    case 'PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF':
      return 'offer_cross_self'
    case 'PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN':
      return 'under_destmin'
  }
}

export function fromJsonPathPaymentStrictSendResult(json: unknown): PathPaymentStrictSendResult {
  if (typeof json === 'string') {
    if (json === 'malformed') return { code: 'PATH_PAYMENT_STRICT_SEND_MALFORMED' } as PathPaymentStrictSendResult
    if (json === 'underfunded') return { code: 'PATH_PAYMENT_STRICT_SEND_UNDERFUNDED' } as PathPaymentStrictSendResult
    if (json === 'src_no_trust') return { code: 'PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST' } as PathPaymentStrictSendResult
    if (json === 'src_not_authorized') return { code: 'PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED' } as PathPaymentStrictSendResult
    if (json === 'no_destination') return { code: 'PATH_PAYMENT_STRICT_SEND_NO_DESTINATION' } as PathPaymentStrictSendResult
    if (json === 'no_trust') return { code: 'PATH_PAYMENT_STRICT_SEND_NO_TRUST' } as PathPaymentStrictSendResult
    if (json === 'not_authorized') return { code: 'PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED' } as PathPaymentStrictSendResult
    if (json === 'line_full') return { code: 'PATH_PAYMENT_STRICT_SEND_LINE_FULL' } as PathPaymentStrictSendResult
    if (json === 'too_few_offers') return { code: 'PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS' } as PathPaymentStrictSendResult
    if (json === 'offer_cross_self') return { code: 'PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF' } as PathPaymentStrictSendResult
    if (json === 'under_destmin') return { code: 'PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN' } as PathPaymentStrictSendResult
    throw new Error(`Unknown PathPaymentStrictSendResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'success':
      return { code: 'PATH_PAYMENT_STRICT_SEND_SUCCESS', success: fromJsonPathPaymentStrictSendResult_success(obj[key]) } as PathPaymentStrictSendResult
    case 'no_issuer':
      return { code: 'PATH_PAYMENT_STRICT_SEND_NO_ISSUER', noIssuer: fromJsonAsset(obj[key]) } as PathPaymentStrictSendResult
    default: throw new Error(`Unknown PathPaymentStrictSendResult variant: ${key}`)
  }
}

export type ManageSellOfferResultCode =
  | 'MANAGE_SELL_OFFER_SUCCESS'
  | 'MANAGE_SELL_OFFER_MALFORMED'
  | 'MANAGE_SELL_OFFER_SELL_NO_TRUST'
  | 'MANAGE_SELL_OFFER_BUY_NO_TRUST'
  | 'MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED'
  | 'MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED'
  | 'MANAGE_SELL_OFFER_LINE_FULL'
  | 'MANAGE_SELL_OFFER_UNDERFUNDED'
  | 'MANAGE_SELL_OFFER_CROSS_SELF'
  | 'MANAGE_SELL_OFFER_SELL_NO_ISSUER'
  | 'MANAGE_SELL_OFFER_BUY_NO_ISSUER'
  | 'MANAGE_SELL_OFFER_NOT_FOUND'
  | 'MANAGE_SELL_OFFER_LOW_RESERVE'

export const MANAGE_SELL_OFFER_RESULT_CODE_TO_INT: Record<ManageSellOfferResultCode, number> = /*#__PURE__*/ {
  MANAGE_SELL_OFFER_SUCCESS: 0,
  MANAGE_SELL_OFFER_MALFORMED: -1,
  MANAGE_SELL_OFFER_SELL_NO_TRUST: -2,
  MANAGE_SELL_OFFER_BUY_NO_TRUST: -3,
  MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED: -4,
  MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED: -5,
  MANAGE_SELL_OFFER_LINE_FULL: -6,
  MANAGE_SELL_OFFER_UNDERFUNDED: -7,
  MANAGE_SELL_OFFER_CROSS_SELF: -8,
  MANAGE_SELL_OFFER_SELL_NO_ISSUER: -9,
  MANAGE_SELL_OFFER_BUY_NO_ISSUER: -10,
  MANAGE_SELL_OFFER_NOT_FOUND: -11,
  MANAGE_SELL_OFFER_LOW_RESERVE: -12,
}

export const MANAGE_SELL_OFFER_RESULT_CODE_FROM_INT: Record<number, ManageSellOfferResultCode> = /*#__PURE__*/ {
  0: 'MANAGE_SELL_OFFER_SUCCESS',
  [-1]: 'MANAGE_SELL_OFFER_MALFORMED',
  [-2]: 'MANAGE_SELL_OFFER_SELL_NO_TRUST',
  [-3]: 'MANAGE_SELL_OFFER_BUY_NO_TRUST',
  [-4]: 'MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED',
  [-5]: 'MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED',
  [-6]: 'MANAGE_SELL_OFFER_LINE_FULL',
  [-7]: 'MANAGE_SELL_OFFER_UNDERFUNDED',
  [-8]: 'MANAGE_SELL_OFFER_CROSS_SELF',
  [-9]: 'MANAGE_SELL_OFFER_SELL_NO_ISSUER',
  [-10]: 'MANAGE_SELL_OFFER_BUY_NO_ISSUER',
  [-11]: 'MANAGE_SELL_OFFER_NOT_FOUND',
  [-12]: 'MANAGE_SELL_OFFER_LOW_RESERVE',
}

export function readManageSellOfferResultCode(r: XdrReader): ManageSellOfferResultCode {
  const v = readInt32(r)
  const result = MANAGE_SELL_OFFER_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ManageSellOfferResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeManageSellOfferResultCode(w: XdrWriter, v: ManageSellOfferResultCode): void {
  writeInt32(w, MANAGE_SELL_OFFER_RESULT_CODE_TO_INT[v])
}

export function encodeManageSellOfferResultCode(v: ManageSellOfferResultCode): Uint8Array {
  return encode(v, writeManageSellOfferResultCode)
}

export function decodeManageSellOfferResultCode(input: Uint8Array | string): ManageSellOfferResultCode {
  return decode(input, readManageSellOfferResultCode)
}

const _MANAGE_SELL_OFFER_RESULT_CODE_TO_JSON: Record<ManageSellOfferResultCode, string> = /*#__PURE__*/ {
  MANAGE_SELL_OFFER_SUCCESS: 'success',
  MANAGE_SELL_OFFER_MALFORMED: 'malformed',
  MANAGE_SELL_OFFER_SELL_NO_TRUST: 'sell_no_trust',
  MANAGE_SELL_OFFER_BUY_NO_TRUST: 'buy_no_trust',
  MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED: 'sell_not_authorized',
  MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED: 'buy_not_authorized',
  MANAGE_SELL_OFFER_LINE_FULL: 'line_full',
  MANAGE_SELL_OFFER_UNDERFUNDED: 'underfunded',
  MANAGE_SELL_OFFER_CROSS_SELF: 'cross_self',
  MANAGE_SELL_OFFER_SELL_NO_ISSUER: 'sell_no_issuer',
  MANAGE_SELL_OFFER_BUY_NO_ISSUER: 'buy_no_issuer',
  MANAGE_SELL_OFFER_NOT_FOUND: 'not_found',
  MANAGE_SELL_OFFER_LOW_RESERVE: 'low_reserve',
}

const _MANAGE_SELL_OFFER_RESULT_CODE_FROM_JSON: Record<string, ManageSellOfferResultCode> = /*#__PURE__*/ {
  'success': 'MANAGE_SELL_OFFER_SUCCESS',
  'malformed': 'MANAGE_SELL_OFFER_MALFORMED',
  'sell_no_trust': 'MANAGE_SELL_OFFER_SELL_NO_TRUST',
  'buy_no_trust': 'MANAGE_SELL_OFFER_BUY_NO_TRUST',
  'sell_not_authorized': 'MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED',
  'buy_not_authorized': 'MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED',
  'line_full': 'MANAGE_SELL_OFFER_LINE_FULL',
  'underfunded': 'MANAGE_SELL_OFFER_UNDERFUNDED',
  'cross_self': 'MANAGE_SELL_OFFER_CROSS_SELF',
  'sell_no_issuer': 'MANAGE_SELL_OFFER_SELL_NO_ISSUER',
  'buy_no_issuer': 'MANAGE_SELL_OFFER_BUY_NO_ISSUER',
  'not_found': 'MANAGE_SELL_OFFER_NOT_FOUND',
  'low_reserve': 'MANAGE_SELL_OFFER_LOW_RESERVE',
}

export function toJsonManageSellOfferResultCode(v: ManageSellOfferResultCode): string {
  return _MANAGE_SELL_OFFER_RESULT_CODE_TO_JSON[v]
}

export function fromJsonManageSellOfferResultCode(json: unknown): ManageSellOfferResultCode {
  const result = _MANAGE_SELL_OFFER_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ManageSellOfferResultCode JSON value: ${json}`)
  return result
}

export type ManageOfferEffect =
  | 'MANAGE_OFFER_CREATED'
  | 'MANAGE_OFFER_UPDATED'
  | 'MANAGE_OFFER_DELETED'

export const MANAGE_OFFER_EFFECT_TO_INT: Record<ManageOfferEffect, number> = /*#__PURE__*/ {
  MANAGE_OFFER_CREATED: 0,
  MANAGE_OFFER_UPDATED: 1,
  MANAGE_OFFER_DELETED: 2,
}

export const MANAGE_OFFER_EFFECT_FROM_INT: Record<number, ManageOfferEffect> = /*#__PURE__*/ {
  0: 'MANAGE_OFFER_CREATED',
  1: 'MANAGE_OFFER_UPDATED',
  2: 'MANAGE_OFFER_DELETED',
}

export function readManageOfferEffect(r: XdrReader): ManageOfferEffect {
  const v = readInt32(r)
  const result = MANAGE_OFFER_EFFECT_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ManageOfferEffect value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeManageOfferEffect(w: XdrWriter, v: ManageOfferEffect): void {
  writeInt32(w, MANAGE_OFFER_EFFECT_TO_INT[v])
}

export function encodeManageOfferEffect(v: ManageOfferEffect): Uint8Array {
  return encode(v, writeManageOfferEffect)
}

export function decodeManageOfferEffect(input: Uint8Array | string): ManageOfferEffect {
  return decode(input, readManageOfferEffect)
}

const _MANAGE_OFFER_EFFECT_TO_JSON: Record<ManageOfferEffect, string> = /*#__PURE__*/ {
  MANAGE_OFFER_CREATED: 'created',
  MANAGE_OFFER_UPDATED: 'updated',
  MANAGE_OFFER_DELETED: 'deleted',
}

const _MANAGE_OFFER_EFFECT_FROM_JSON: Record<string, ManageOfferEffect> = /*#__PURE__*/ {
  'created': 'MANAGE_OFFER_CREATED',
  'updated': 'MANAGE_OFFER_UPDATED',
  'deleted': 'MANAGE_OFFER_DELETED',
}

export function toJsonManageOfferEffect(v: ManageOfferEffect): string {
  return _MANAGE_OFFER_EFFECT_TO_JSON[v]
}

export function fromJsonManageOfferEffect(json: unknown): ManageOfferEffect {
  const result = _MANAGE_OFFER_EFFECT_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ManageOfferEffect JSON value: ${json}`)
  return result
}

export type ManageOfferSuccessResult_offer =
  | { readonly effect: 'MANAGE_OFFER_CREATED'; readonly offer: OfferEntry }
  | { readonly effect: 'MANAGE_OFFER_UPDATED'; readonly offer: OfferEntry }
  | { readonly effect: 'MANAGE_OFFER_DELETED' }

export function readManageOfferSuccessResult_offer(r: XdrReader): ManageOfferSuccessResult_offer {
  beginComposite(r)
  try {
    const effect = readManageOfferEffect(r)
    let result: ManageOfferSuccessResult_offer
    switch (effect) {
      case 'MANAGE_OFFER_CREATED':
      case 'MANAGE_OFFER_UPDATED':
        result = { effect, offer: readOfferEntry(r) }; break
      case 'MANAGE_OFFER_DELETED':
        result = { effect }; break
      default:
        throw new XdrReadError(`Unknown ManageOfferSuccessResult_offer discriminant: ${effect}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeManageOfferSuccessResult_offer(w: XdrWriter, v: ManageOfferSuccessResult_offer): void {
  writeManageOfferEffect(w, v.effect)
  switch (v.effect) {
    case 'MANAGE_OFFER_CREATED':
    case 'MANAGE_OFFER_UPDATED':
      writeOfferEntry(w, (v as any).offer); break
    case 'MANAGE_OFFER_DELETED':
      break
  }
}

export function encodeManageOfferSuccessResult_offer(v: ManageOfferSuccessResult_offer): Uint8Array {
  return encode(v, writeManageOfferSuccessResult_offer)
}

export function decodeManageOfferSuccessResult_offer(input: Uint8Array | string): ManageOfferSuccessResult_offer {
  return decode(input, readManageOfferSuccessResult_offer)
}

export function toJsonManageOfferSuccessResult_offer(v: ManageOfferSuccessResult_offer): unknown {
  switch (v.effect) {
    case 'MANAGE_OFFER_CREATED':
      return { 'created': toJsonOfferEntry((v as any).offer) }
    case 'MANAGE_OFFER_UPDATED':
      return { 'updated': toJsonOfferEntry((v as any).offer) }
    case 'MANAGE_OFFER_DELETED':
      return 'deleted'
  }
}

export function fromJsonManageOfferSuccessResult_offer(json: unknown): ManageOfferSuccessResult_offer {
  if (typeof json === 'string') {
    if (json === 'deleted') return { effect: 'MANAGE_OFFER_DELETED' } as ManageOfferSuccessResult_offer
    throw new Error(`Unknown ManageOfferSuccessResult_offer variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'created':
      return { effect: 'MANAGE_OFFER_CREATED', offer: fromJsonOfferEntry(obj[key]) } as ManageOfferSuccessResult_offer
    case 'updated':
      return { effect: 'MANAGE_OFFER_UPDATED', offer: fromJsonOfferEntry(obj[key]) } as ManageOfferSuccessResult_offer
    default: throw new Error(`Unknown ManageOfferSuccessResult_offer variant: ${key}`)
  }
}

export interface ManageOfferSuccessResult {
  /** offers that got claimed while creating this offer */
  readonly offersClaimed: ClaimAtom[]
  readonly offer: ManageOfferSuccessResult_offer
}

export function readManageOfferSuccessResult(r: XdrReader): ManageOfferSuccessResult {
  beginComposite(r)
  try {
    const offersClaimed = readVarArray(r, UINT32_MAX, readClaimAtom)
    const offer = readManageOfferSuccessResult_offer(r)
    return { offersClaimed, offer }
  } finally {
    endComposite(r)
  }
}

export function writeManageOfferSuccessResult(w: XdrWriter, v: ManageOfferSuccessResult): void {
  writeVarArray(w, v.offersClaimed, UINT32_MAX, writeClaimAtom)
  writeManageOfferSuccessResult_offer(w, v.offer)
}

export function encodeManageOfferSuccessResult(v: ManageOfferSuccessResult): Uint8Array {
  return encode(v, writeManageOfferSuccessResult)
}

export function decodeManageOfferSuccessResult(input: Uint8Array | string): ManageOfferSuccessResult {
  return decode(input, readManageOfferSuccessResult)
}

export function toJsonManageOfferSuccessResult(v: ManageOfferSuccessResult): Record<string, unknown> {
  return {
    'offers_claimed': v.offersClaimed.map((item: any) => toJsonClaimAtom(item)),
    'offer': toJsonManageOfferSuccessResult_offer(v.offer),
  }
}

export function fromJsonManageOfferSuccessResult(json: unknown): ManageOfferSuccessResult {
  const o = json as Record<string, unknown>
  return {
    offersClaimed: ((o['offers_claimed']) as unknown[]).map((item: unknown) => fromJsonClaimAtom(item)),
    offer: fromJsonManageOfferSuccessResult_offer(o['offer']),
  }
}

export type ManageSellOfferResult =
  | { readonly code: 'MANAGE_SELL_OFFER_SUCCESS'; readonly success: ManageOfferSuccessResult }
  | { readonly code: 'MANAGE_SELL_OFFER_MALFORMED' }
  | { readonly code: 'MANAGE_SELL_OFFER_SELL_NO_TRUST' }
  | { readonly code: 'MANAGE_SELL_OFFER_BUY_NO_TRUST' }
  | { readonly code: 'MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED' }
  | { readonly code: 'MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED' }
  | { readonly code: 'MANAGE_SELL_OFFER_LINE_FULL' }
  | { readonly code: 'MANAGE_SELL_OFFER_UNDERFUNDED' }
  | { readonly code: 'MANAGE_SELL_OFFER_CROSS_SELF' }
  | { readonly code: 'MANAGE_SELL_OFFER_SELL_NO_ISSUER' }
  | { readonly code: 'MANAGE_SELL_OFFER_BUY_NO_ISSUER' }
  | { readonly code: 'MANAGE_SELL_OFFER_NOT_FOUND' }
  | { readonly code: 'MANAGE_SELL_OFFER_LOW_RESERVE' }

export function readManageSellOfferResult(r: XdrReader): ManageSellOfferResult {
  beginComposite(r)
  try {
    const code = readManageSellOfferResultCode(r)
    let result: ManageSellOfferResult
    switch (code) {
      case 'MANAGE_SELL_OFFER_SUCCESS':
        result = { code, success: readManageOfferSuccessResult(r) }; break
      case 'MANAGE_SELL_OFFER_MALFORMED':
      case 'MANAGE_SELL_OFFER_SELL_NO_TRUST':
      case 'MANAGE_SELL_OFFER_BUY_NO_TRUST':
      case 'MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED':
      case 'MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED':
      case 'MANAGE_SELL_OFFER_LINE_FULL':
      case 'MANAGE_SELL_OFFER_UNDERFUNDED':
      case 'MANAGE_SELL_OFFER_CROSS_SELF':
      case 'MANAGE_SELL_OFFER_SELL_NO_ISSUER':
      case 'MANAGE_SELL_OFFER_BUY_NO_ISSUER':
      case 'MANAGE_SELL_OFFER_NOT_FOUND':
      case 'MANAGE_SELL_OFFER_LOW_RESERVE':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown ManageSellOfferResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeManageSellOfferResult(w: XdrWriter, v: ManageSellOfferResult): void {
  writeManageSellOfferResultCode(w, v.code)
  switch (v.code) {
    case 'MANAGE_SELL_OFFER_SUCCESS':
      writeManageOfferSuccessResult(w, (v as any).success); break
    case 'MANAGE_SELL_OFFER_MALFORMED':
    case 'MANAGE_SELL_OFFER_SELL_NO_TRUST':
    case 'MANAGE_SELL_OFFER_BUY_NO_TRUST':
    case 'MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED':
    case 'MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED':
    case 'MANAGE_SELL_OFFER_LINE_FULL':
    case 'MANAGE_SELL_OFFER_UNDERFUNDED':
    case 'MANAGE_SELL_OFFER_CROSS_SELF':
    case 'MANAGE_SELL_OFFER_SELL_NO_ISSUER':
    case 'MANAGE_SELL_OFFER_BUY_NO_ISSUER':
    case 'MANAGE_SELL_OFFER_NOT_FOUND':
    case 'MANAGE_SELL_OFFER_LOW_RESERVE':
      break
  }
}

export function encodeManageSellOfferResult(v: ManageSellOfferResult): Uint8Array {
  return encode(v, writeManageSellOfferResult)
}

export function decodeManageSellOfferResult(input: Uint8Array | string): ManageSellOfferResult {
  return decode(input, readManageSellOfferResult)
}

export function toJsonManageSellOfferResult(v: ManageSellOfferResult): unknown {
  switch (v.code) {
    case 'MANAGE_SELL_OFFER_SUCCESS':
      return { 'success': toJsonManageOfferSuccessResult((v as any).success) }
    case 'MANAGE_SELL_OFFER_MALFORMED':
      return 'malformed'
    case 'MANAGE_SELL_OFFER_SELL_NO_TRUST':
      return 'sell_no_trust'
    case 'MANAGE_SELL_OFFER_BUY_NO_TRUST':
      return 'buy_no_trust'
    case 'MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED':
      return 'sell_not_authorized'
    case 'MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED':
      return 'buy_not_authorized'
    case 'MANAGE_SELL_OFFER_LINE_FULL':
      return 'line_full'
    case 'MANAGE_SELL_OFFER_UNDERFUNDED':
      return 'underfunded'
    case 'MANAGE_SELL_OFFER_CROSS_SELF':
      return 'cross_self'
    case 'MANAGE_SELL_OFFER_SELL_NO_ISSUER':
      return 'sell_no_issuer'
    case 'MANAGE_SELL_OFFER_BUY_NO_ISSUER':
      return 'buy_no_issuer'
    case 'MANAGE_SELL_OFFER_NOT_FOUND':
      return 'not_found'
    case 'MANAGE_SELL_OFFER_LOW_RESERVE':
      return 'low_reserve'
  }
}

export function fromJsonManageSellOfferResult(json: unknown): ManageSellOfferResult {
  if (typeof json === 'string') {
    if (json === 'malformed') return { code: 'MANAGE_SELL_OFFER_MALFORMED' } as ManageSellOfferResult
    if (json === 'sell_no_trust') return { code: 'MANAGE_SELL_OFFER_SELL_NO_TRUST' } as ManageSellOfferResult
    if (json === 'buy_no_trust') return { code: 'MANAGE_SELL_OFFER_BUY_NO_TRUST' } as ManageSellOfferResult
    if (json === 'sell_not_authorized') return { code: 'MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED' } as ManageSellOfferResult
    if (json === 'buy_not_authorized') return { code: 'MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED' } as ManageSellOfferResult
    if (json === 'line_full') return { code: 'MANAGE_SELL_OFFER_LINE_FULL' } as ManageSellOfferResult
    if (json === 'underfunded') return { code: 'MANAGE_SELL_OFFER_UNDERFUNDED' } as ManageSellOfferResult
    if (json === 'cross_self') return { code: 'MANAGE_SELL_OFFER_CROSS_SELF' } as ManageSellOfferResult
    if (json === 'sell_no_issuer') return { code: 'MANAGE_SELL_OFFER_SELL_NO_ISSUER' } as ManageSellOfferResult
    if (json === 'buy_no_issuer') return { code: 'MANAGE_SELL_OFFER_BUY_NO_ISSUER' } as ManageSellOfferResult
    if (json === 'not_found') return { code: 'MANAGE_SELL_OFFER_NOT_FOUND' } as ManageSellOfferResult
    if (json === 'low_reserve') return { code: 'MANAGE_SELL_OFFER_LOW_RESERVE' } as ManageSellOfferResult
    throw new Error(`Unknown ManageSellOfferResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'success':
      return { code: 'MANAGE_SELL_OFFER_SUCCESS', success: fromJsonManageOfferSuccessResult(obj[key]) } as ManageSellOfferResult
    default: throw new Error(`Unknown ManageSellOfferResult variant: ${key}`)
  }
}

export type ManageBuyOfferResultCode =
  | 'MANAGE_BUY_OFFER_SUCCESS'
  | 'MANAGE_BUY_OFFER_MALFORMED'
  | 'MANAGE_BUY_OFFER_SELL_NO_TRUST'
  | 'MANAGE_BUY_OFFER_BUY_NO_TRUST'
  | 'MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED'
  | 'MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED'
  | 'MANAGE_BUY_OFFER_LINE_FULL'
  | 'MANAGE_BUY_OFFER_UNDERFUNDED'
  | 'MANAGE_BUY_OFFER_CROSS_SELF'
  | 'MANAGE_BUY_OFFER_SELL_NO_ISSUER'
  | 'MANAGE_BUY_OFFER_BUY_NO_ISSUER'
  | 'MANAGE_BUY_OFFER_NOT_FOUND'
  | 'MANAGE_BUY_OFFER_LOW_RESERVE'

export const MANAGE_BUY_OFFER_RESULT_CODE_TO_INT: Record<ManageBuyOfferResultCode, number> = /*#__PURE__*/ {
  MANAGE_BUY_OFFER_SUCCESS: 0,
  MANAGE_BUY_OFFER_MALFORMED: -1,
  MANAGE_BUY_OFFER_SELL_NO_TRUST: -2,
  MANAGE_BUY_OFFER_BUY_NO_TRUST: -3,
  MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED: -4,
  MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED: -5,
  MANAGE_BUY_OFFER_LINE_FULL: -6,
  MANAGE_BUY_OFFER_UNDERFUNDED: -7,
  MANAGE_BUY_OFFER_CROSS_SELF: -8,
  MANAGE_BUY_OFFER_SELL_NO_ISSUER: -9,
  MANAGE_BUY_OFFER_BUY_NO_ISSUER: -10,
  MANAGE_BUY_OFFER_NOT_FOUND: -11,
  MANAGE_BUY_OFFER_LOW_RESERVE: -12,
}

export const MANAGE_BUY_OFFER_RESULT_CODE_FROM_INT: Record<number, ManageBuyOfferResultCode> = /*#__PURE__*/ {
  0: 'MANAGE_BUY_OFFER_SUCCESS',
  [-1]: 'MANAGE_BUY_OFFER_MALFORMED',
  [-2]: 'MANAGE_BUY_OFFER_SELL_NO_TRUST',
  [-3]: 'MANAGE_BUY_OFFER_BUY_NO_TRUST',
  [-4]: 'MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED',
  [-5]: 'MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED',
  [-6]: 'MANAGE_BUY_OFFER_LINE_FULL',
  [-7]: 'MANAGE_BUY_OFFER_UNDERFUNDED',
  [-8]: 'MANAGE_BUY_OFFER_CROSS_SELF',
  [-9]: 'MANAGE_BUY_OFFER_SELL_NO_ISSUER',
  [-10]: 'MANAGE_BUY_OFFER_BUY_NO_ISSUER',
  [-11]: 'MANAGE_BUY_OFFER_NOT_FOUND',
  [-12]: 'MANAGE_BUY_OFFER_LOW_RESERVE',
}

export function readManageBuyOfferResultCode(r: XdrReader): ManageBuyOfferResultCode {
  const v = readInt32(r)
  const result = MANAGE_BUY_OFFER_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ManageBuyOfferResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeManageBuyOfferResultCode(w: XdrWriter, v: ManageBuyOfferResultCode): void {
  writeInt32(w, MANAGE_BUY_OFFER_RESULT_CODE_TO_INT[v])
}

export function encodeManageBuyOfferResultCode(v: ManageBuyOfferResultCode): Uint8Array {
  return encode(v, writeManageBuyOfferResultCode)
}

export function decodeManageBuyOfferResultCode(input: Uint8Array | string): ManageBuyOfferResultCode {
  return decode(input, readManageBuyOfferResultCode)
}

const _MANAGE_BUY_OFFER_RESULT_CODE_TO_JSON: Record<ManageBuyOfferResultCode, string> = /*#__PURE__*/ {
  MANAGE_BUY_OFFER_SUCCESS: 'success',
  MANAGE_BUY_OFFER_MALFORMED: 'malformed',
  MANAGE_BUY_OFFER_SELL_NO_TRUST: 'sell_no_trust',
  MANAGE_BUY_OFFER_BUY_NO_TRUST: 'buy_no_trust',
  MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED: 'sell_not_authorized',
  MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED: 'buy_not_authorized',
  MANAGE_BUY_OFFER_LINE_FULL: 'line_full',
  MANAGE_BUY_OFFER_UNDERFUNDED: 'underfunded',
  MANAGE_BUY_OFFER_CROSS_SELF: 'cross_self',
  MANAGE_BUY_OFFER_SELL_NO_ISSUER: 'sell_no_issuer',
  MANAGE_BUY_OFFER_BUY_NO_ISSUER: 'buy_no_issuer',
  MANAGE_BUY_OFFER_NOT_FOUND: 'not_found',
  MANAGE_BUY_OFFER_LOW_RESERVE: 'low_reserve',
}

const _MANAGE_BUY_OFFER_RESULT_CODE_FROM_JSON: Record<string, ManageBuyOfferResultCode> = /*#__PURE__*/ {
  'success': 'MANAGE_BUY_OFFER_SUCCESS',
  'malformed': 'MANAGE_BUY_OFFER_MALFORMED',
  'sell_no_trust': 'MANAGE_BUY_OFFER_SELL_NO_TRUST',
  'buy_no_trust': 'MANAGE_BUY_OFFER_BUY_NO_TRUST',
  'sell_not_authorized': 'MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED',
  'buy_not_authorized': 'MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED',
  'line_full': 'MANAGE_BUY_OFFER_LINE_FULL',
  'underfunded': 'MANAGE_BUY_OFFER_UNDERFUNDED',
  'cross_self': 'MANAGE_BUY_OFFER_CROSS_SELF',
  'sell_no_issuer': 'MANAGE_BUY_OFFER_SELL_NO_ISSUER',
  'buy_no_issuer': 'MANAGE_BUY_OFFER_BUY_NO_ISSUER',
  'not_found': 'MANAGE_BUY_OFFER_NOT_FOUND',
  'low_reserve': 'MANAGE_BUY_OFFER_LOW_RESERVE',
}

export function toJsonManageBuyOfferResultCode(v: ManageBuyOfferResultCode): string {
  return _MANAGE_BUY_OFFER_RESULT_CODE_TO_JSON[v]
}

export function fromJsonManageBuyOfferResultCode(json: unknown): ManageBuyOfferResultCode {
  const result = _MANAGE_BUY_OFFER_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ManageBuyOfferResultCode JSON value: ${json}`)
  return result
}

export type ManageBuyOfferResult =
  | { readonly code: 'MANAGE_BUY_OFFER_SUCCESS'; readonly success: ManageOfferSuccessResult }
  | { readonly code: 'MANAGE_BUY_OFFER_MALFORMED' }
  | { readonly code: 'MANAGE_BUY_OFFER_SELL_NO_TRUST' }
  | { readonly code: 'MANAGE_BUY_OFFER_BUY_NO_TRUST' }
  | { readonly code: 'MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED' }
  | { readonly code: 'MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED' }
  | { readonly code: 'MANAGE_BUY_OFFER_LINE_FULL' }
  | { readonly code: 'MANAGE_BUY_OFFER_UNDERFUNDED' }
  | { readonly code: 'MANAGE_BUY_OFFER_CROSS_SELF' }
  | { readonly code: 'MANAGE_BUY_OFFER_SELL_NO_ISSUER' }
  | { readonly code: 'MANAGE_BUY_OFFER_BUY_NO_ISSUER' }
  | { readonly code: 'MANAGE_BUY_OFFER_NOT_FOUND' }
  | { readonly code: 'MANAGE_BUY_OFFER_LOW_RESERVE' }

export function readManageBuyOfferResult(r: XdrReader): ManageBuyOfferResult {
  beginComposite(r)
  try {
    const code = readManageBuyOfferResultCode(r)
    let result: ManageBuyOfferResult
    switch (code) {
      case 'MANAGE_BUY_OFFER_SUCCESS':
        result = { code, success: readManageOfferSuccessResult(r) }; break
      case 'MANAGE_BUY_OFFER_MALFORMED':
      case 'MANAGE_BUY_OFFER_SELL_NO_TRUST':
      case 'MANAGE_BUY_OFFER_BUY_NO_TRUST':
      case 'MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED':
      case 'MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED':
      case 'MANAGE_BUY_OFFER_LINE_FULL':
      case 'MANAGE_BUY_OFFER_UNDERFUNDED':
      case 'MANAGE_BUY_OFFER_CROSS_SELF':
      case 'MANAGE_BUY_OFFER_SELL_NO_ISSUER':
      case 'MANAGE_BUY_OFFER_BUY_NO_ISSUER':
      case 'MANAGE_BUY_OFFER_NOT_FOUND':
      case 'MANAGE_BUY_OFFER_LOW_RESERVE':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown ManageBuyOfferResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeManageBuyOfferResult(w: XdrWriter, v: ManageBuyOfferResult): void {
  writeManageBuyOfferResultCode(w, v.code)
  switch (v.code) {
    case 'MANAGE_BUY_OFFER_SUCCESS':
      writeManageOfferSuccessResult(w, (v as any).success); break
    case 'MANAGE_BUY_OFFER_MALFORMED':
    case 'MANAGE_BUY_OFFER_SELL_NO_TRUST':
    case 'MANAGE_BUY_OFFER_BUY_NO_TRUST':
    case 'MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED':
    case 'MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED':
    case 'MANAGE_BUY_OFFER_LINE_FULL':
    case 'MANAGE_BUY_OFFER_UNDERFUNDED':
    case 'MANAGE_BUY_OFFER_CROSS_SELF':
    case 'MANAGE_BUY_OFFER_SELL_NO_ISSUER':
    case 'MANAGE_BUY_OFFER_BUY_NO_ISSUER':
    case 'MANAGE_BUY_OFFER_NOT_FOUND':
    case 'MANAGE_BUY_OFFER_LOW_RESERVE':
      break
  }
}

export function encodeManageBuyOfferResult(v: ManageBuyOfferResult): Uint8Array {
  return encode(v, writeManageBuyOfferResult)
}

export function decodeManageBuyOfferResult(input: Uint8Array | string): ManageBuyOfferResult {
  return decode(input, readManageBuyOfferResult)
}

export function toJsonManageBuyOfferResult(v: ManageBuyOfferResult): unknown {
  switch (v.code) {
    case 'MANAGE_BUY_OFFER_SUCCESS':
      return { 'success': toJsonManageOfferSuccessResult((v as any).success) }
    case 'MANAGE_BUY_OFFER_MALFORMED':
      return 'malformed'
    case 'MANAGE_BUY_OFFER_SELL_NO_TRUST':
      return 'sell_no_trust'
    case 'MANAGE_BUY_OFFER_BUY_NO_TRUST':
      return 'buy_no_trust'
    case 'MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED':
      return 'sell_not_authorized'
    case 'MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED':
      return 'buy_not_authorized'
    case 'MANAGE_BUY_OFFER_LINE_FULL':
      return 'line_full'
    case 'MANAGE_BUY_OFFER_UNDERFUNDED':
      return 'underfunded'
    case 'MANAGE_BUY_OFFER_CROSS_SELF':
      return 'cross_self'
    case 'MANAGE_BUY_OFFER_SELL_NO_ISSUER':
      return 'sell_no_issuer'
    case 'MANAGE_BUY_OFFER_BUY_NO_ISSUER':
      return 'buy_no_issuer'
    case 'MANAGE_BUY_OFFER_NOT_FOUND':
      return 'not_found'
    case 'MANAGE_BUY_OFFER_LOW_RESERVE':
      return 'low_reserve'
  }
}

export function fromJsonManageBuyOfferResult(json: unknown): ManageBuyOfferResult {
  if (typeof json === 'string') {
    if (json === 'malformed') return { code: 'MANAGE_BUY_OFFER_MALFORMED' } as ManageBuyOfferResult
    if (json === 'sell_no_trust') return { code: 'MANAGE_BUY_OFFER_SELL_NO_TRUST' } as ManageBuyOfferResult
    if (json === 'buy_no_trust') return { code: 'MANAGE_BUY_OFFER_BUY_NO_TRUST' } as ManageBuyOfferResult
    if (json === 'sell_not_authorized') return { code: 'MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED' } as ManageBuyOfferResult
    if (json === 'buy_not_authorized') return { code: 'MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED' } as ManageBuyOfferResult
    if (json === 'line_full') return { code: 'MANAGE_BUY_OFFER_LINE_FULL' } as ManageBuyOfferResult
    if (json === 'underfunded') return { code: 'MANAGE_BUY_OFFER_UNDERFUNDED' } as ManageBuyOfferResult
    if (json === 'cross_self') return { code: 'MANAGE_BUY_OFFER_CROSS_SELF' } as ManageBuyOfferResult
    if (json === 'sell_no_issuer') return { code: 'MANAGE_BUY_OFFER_SELL_NO_ISSUER' } as ManageBuyOfferResult
    if (json === 'buy_no_issuer') return { code: 'MANAGE_BUY_OFFER_BUY_NO_ISSUER' } as ManageBuyOfferResult
    if (json === 'not_found') return { code: 'MANAGE_BUY_OFFER_NOT_FOUND' } as ManageBuyOfferResult
    if (json === 'low_reserve') return { code: 'MANAGE_BUY_OFFER_LOW_RESERVE' } as ManageBuyOfferResult
    throw new Error(`Unknown ManageBuyOfferResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'success':
      return { code: 'MANAGE_BUY_OFFER_SUCCESS', success: fromJsonManageOfferSuccessResult(obj[key]) } as ManageBuyOfferResult
    default: throw new Error(`Unknown ManageBuyOfferResult variant: ${key}`)
  }
}

export type SetOptionsResultCode =
  | 'SET_OPTIONS_SUCCESS'
  | 'SET_OPTIONS_LOW_RESERVE'
  | 'SET_OPTIONS_TOO_MANY_SIGNERS'
  | 'SET_OPTIONS_BAD_FLAGS'
  | 'SET_OPTIONS_INVALID_INFLATION'
  | 'SET_OPTIONS_CANT_CHANGE'
  | 'SET_OPTIONS_UNKNOWN_FLAG'
  | 'SET_OPTIONS_THRESHOLD_OUT_OF_RANGE'
  | 'SET_OPTIONS_BAD_SIGNER'
  | 'SET_OPTIONS_INVALID_HOME_DOMAIN'
  | 'SET_OPTIONS_AUTH_REVOCABLE_REQUIRED'

export const SET_OPTIONS_RESULT_CODE_TO_INT: Record<SetOptionsResultCode, number> = /*#__PURE__*/ {
  SET_OPTIONS_SUCCESS: 0,
  SET_OPTIONS_LOW_RESERVE: -1,
  SET_OPTIONS_TOO_MANY_SIGNERS: -2,
  SET_OPTIONS_BAD_FLAGS: -3,
  SET_OPTIONS_INVALID_INFLATION: -4,
  SET_OPTIONS_CANT_CHANGE: -5,
  SET_OPTIONS_UNKNOWN_FLAG: -6,
  SET_OPTIONS_THRESHOLD_OUT_OF_RANGE: -7,
  SET_OPTIONS_BAD_SIGNER: -8,
  SET_OPTIONS_INVALID_HOME_DOMAIN: -9,
  SET_OPTIONS_AUTH_REVOCABLE_REQUIRED: -10,
}

export const SET_OPTIONS_RESULT_CODE_FROM_INT: Record<number, SetOptionsResultCode> = /*#__PURE__*/ {
  0: 'SET_OPTIONS_SUCCESS',
  [-1]: 'SET_OPTIONS_LOW_RESERVE',
  [-2]: 'SET_OPTIONS_TOO_MANY_SIGNERS',
  [-3]: 'SET_OPTIONS_BAD_FLAGS',
  [-4]: 'SET_OPTIONS_INVALID_INFLATION',
  [-5]: 'SET_OPTIONS_CANT_CHANGE',
  [-6]: 'SET_OPTIONS_UNKNOWN_FLAG',
  [-7]: 'SET_OPTIONS_THRESHOLD_OUT_OF_RANGE',
  [-8]: 'SET_OPTIONS_BAD_SIGNER',
  [-9]: 'SET_OPTIONS_INVALID_HOME_DOMAIN',
  [-10]: 'SET_OPTIONS_AUTH_REVOCABLE_REQUIRED',
}

export function readSetOptionsResultCode(r: XdrReader): SetOptionsResultCode {
  const v = readInt32(r)
  const result = SET_OPTIONS_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SetOptionsResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSetOptionsResultCode(w: XdrWriter, v: SetOptionsResultCode): void {
  writeInt32(w, SET_OPTIONS_RESULT_CODE_TO_INT[v])
}

export function encodeSetOptionsResultCode(v: SetOptionsResultCode): Uint8Array {
  return encode(v, writeSetOptionsResultCode)
}

export function decodeSetOptionsResultCode(input: Uint8Array | string): SetOptionsResultCode {
  return decode(input, readSetOptionsResultCode)
}

const _SET_OPTIONS_RESULT_CODE_TO_JSON: Record<SetOptionsResultCode, string> = /*#__PURE__*/ {
  SET_OPTIONS_SUCCESS: 'success',
  SET_OPTIONS_LOW_RESERVE: 'low_reserve',
  SET_OPTIONS_TOO_MANY_SIGNERS: 'too_many_signers',
  SET_OPTIONS_BAD_FLAGS: 'bad_flags',
  SET_OPTIONS_INVALID_INFLATION: 'invalid_inflation',
  SET_OPTIONS_CANT_CHANGE: 'cant_change',
  SET_OPTIONS_UNKNOWN_FLAG: 'unknown_flag',
  SET_OPTIONS_THRESHOLD_OUT_OF_RANGE: 'threshold_out_of_range',
  SET_OPTIONS_BAD_SIGNER: 'bad_signer',
  SET_OPTIONS_INVALID_HOME_DOMAIN: 'invalid_home_domain',
  SET_OPTIONS_AUTH_REVOCABLE_REQUIRED: 'auth_revocable_required',
}

const _SET_OPTIONS_RESULT_CODE_FROM_JSON: Record<string, SetOptionsResultCode> = /*#__PURE__*/ {
  'success': 'SET_OPTIONS_SUCCESS',
  'low_reserve': 'SET_OPTIONS_LOW_RESERVE',
  'too_many_signers': 'SET_OPTIONS_TOO_MANY_SIGNERS',
  'bad_flags': 'SET_OPTIONS_BAD_FLAGS',
  'invalid_inflation': 'SET_OPTIONS_INVALID_INFLATION',
  'cant_change': 'SET_OPTIONS_CANT_CHANGE',
  'unknown_flag': 'SET_OPTIONS_UNKNOWN_FLAG',
  'threshold_out_of_range': 'SET_OPTIONS_THRESHOLD_OUT_OF_RANGE',
  'bad_signer': 'SET_OPTIONS_BAD_SIGNER',
  'invalid_home_domain': 'SET_OPTIONS_INVALID_HOME_DOMAIN',
  'auth_revocable_required': 'SET_OPTIONS_AUTH_REVOCABLE_REQUIRED',
}

export function toJsonSetOptionsResultCode(v: SetOptionsResultCode): string {
  return _SET_OPTIONS_RESULT_CODE_TO_JSON[v]
}

export function fromJsonSetOptionsResultCode(json: unknown): SetOptionsResultCode {
  const result = _SET_OPTIONS_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SetOptionsResultCode JSON value: ${json}`)
  return result
}

export type SetOptionsResult =
  | { readonly code: 'SET_OPTIONS_SUCCESS' }
  | { readonly code: 'SET_OPTIONS_LOW_RESERVE' }
  | { readonly code: 'SET_OPTIONS_TOO_MANY_SIGNERS' }
  | { readonly code: 'SET_OPTIONS_BAD_FLAGS' }
  | { readonly code: 'SET_OPTIONS_INVALID_INFLATION' }
  | { readonly code: 'SET_OPTIONS_CANT_CHANGE' }
  | { readonly code: 'SET_OPTIONS_UNKNOWN_FLAG' }
  | { readonly code: 'SET_OPTIONS_THRESHOLD_OUT_OF_RANGE' }
  | { readonly code: 'SET_OPTIONS_BAD_SIGNER' }
  | { readonly code: 'SET_OPTIONS_INVALID_HOME_DOMAIN' }
  | { readonly code: 'SET_OPTIONS_AUTH_REVOCABLE_REQUIRED' }

export function readSetOptionsResult(r: XdrReader): SetOptionsResult {
  beginComposite(r)
  try {
    const code = readSetOptionsResultCode(r)
    let result: SetOptionsResult
    switch (code) {
      case 'SET_OPTIONS_SUCCESS':
        result = { code }; break
      case 'SET_OPTIONS_LOW_RESERVE':
      case 'SET_OPTIONS_TOO_MANY_SIGNERS':
      case 'SET_OPTIONS_BAD_FLAGS':
      case 'SET_OPTIONS_INVALID_INFLATION':
      case 'SET_OPTIONS_CANT_CHANGE':
      case 'SET_OPTIONS_UNKNOWN_FLAG':
      case 'SET_OPTIONS_THRESHOLD_OUT_OF_RANGE':
      case 'SET_OPTIONS_BAD_SIGNER':
      case 'SET_OPTIONS_INVALID_HOME_DOMAIN':
      case 'SET_OPTIONS_AUTH_REVOCABLE_REQUIRED':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown SetOptionsResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSetOptionsResult(w: XdrWriter, v: SetOptionsResult): void {
  writeSetOptionsResultCode(w, v.code)
  switch (v.code) {
    case 'SET_OPTIONS_SUCCESS':
      break
    case 'SET_OPTIONS_LOW_RESERVE':
    case 'SET_OPTIONS_TOO_MANY_SIGNERS':
    case 'SET_OPTIONS_BAD_FLAGS':
    case 'SET_OPTIONS_INVALID_INFLATION':
    case 'SET_OPTIONS_CANT_CHANGE':
    case 'SET_OPTIONS_UNKNOWN_FLAG':
    case 'SET_OPTIONS_THRESHOLD_OUT_OF_RANGE':
    case 'SET_OPTIONS_BAD_SIGNER':
    case 'SET_OPTIONS_INVALID_HOME_DOMAIN':
    case 'SET_OPTIONS_AUTH_REVOCABLE_REQUIRED':
      break
  }
}

export function encodeSetOptionsResult(v: SetOptionsResult): Uint8Array {
  return encode(v, writeSetOptionsResult)
}

export function decodeSetOptionsResult(input: Uint8Array | string): SetOptionsResult {
  return decode(input, readSetOptionsResult)
}

export function toJsonSetOptionsResult(v: SetOptionsResult): unknown {
  switch (v.code) {
    case 'SET_OPTIONS_SUCCESS':
      return 'success'
    case 'SET_OPTIONS_LOW_RESERVE':
      return 'low_reserve'
    case 'SET_OPTIONS_TOO_MANY_SIGNERS':
      return 'too_many_signers'
    case 'SET_OPTIONS_BAD_FLAGS':
      return 'bad_flags'
    case 'SET_OPTIONS_INVALID_INFLATION':
      return 'invalid_inflation'
    case 'SET_OPTIONS_CANT_CHANGE':
      return 'cant_change'
    case 'SET_OPTIONS_UNKNOWN_FLAG':
      return 'unknown_flag'
    case 'SET_OPTIONS_THRESHOLD_OUT_OF_RANGE':
      return 'threshold_out_of_range'
    case 'SET_OPTIONS_BAD_SIGNER':
      return 'bad_signer'
    case 'SET_OPTIONS_INVALID_HOME_DOMAIN':
      return 'invalid_home_domain'
    case 'SET_OPTIONS_AUTH_REVOCABLE_REQUIRED':
      return 'auth_revocable_required'
  }
}

export function fromJsonSetOptionsResult(json: unknown): SetOptionsResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'SET_OPTIONS_SUCCESS' } as SetOptionsResult
    if (json === 'low_reserve') return { code: 'SET_OPTIONS_LOW_RESERVE' } as SetOptionsResult
    if (json === 'too_many_signers') return { code: 'SET_OPTIONS_TOO_MANY_SIGNERS' } as SetOptionsResult
    if (json === 'bad_flags') return { code: 'SET_OPTIONS_BAD_FLAGS' } as SetOptionsResult
    if (json === 'invalid_inflation') return { code: 'SET_OPTIONS_INVALID_INFLATION' } as SetOptionsResult
    if (json === 'cant_change') return { code: 'SET_OPTIONS_CANT_CHANGE' } as SetOptionsResult
    if (json === 'unknown_flag') return { code: 'SET_OPTIONS_UNKNOWN_FLAG' } as SetOptionsResult
    if (json === 'threshold_out_of_range') return { code: 'SET_OPTIONS_THRESHOLD_OUT_OF_RANGE' } as SetOptionsResult
    if (json === 'bad_signer') return { code: 'SET_OPTIONS_BAD_SIGNER' } as SetOptionsResult
    if (json === 'invalid_home_domain') return { code: 'SET_OPTIONS_INVALID_HOME_DOMAIN' } as SetOptionsResult
    if (json === 'auth_revocable_required') return { code: 'SET_OPTIONS_AUTH_REVOCABLE_REQUIRED' } as SetOptionsResult
    throw new Error(`Unknown SetOptionsResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown SetOptionsResult variant: ${key}`)
  }
}

export type ChangeTrustResultCode =
  | 'CHANGE_TRUST_SUCCESS'
  | 'CHANGE_TRUST_MALFORMED'
  | 'CHANGE_TRUST_NO_ISSUER'
  | 'CHANGE_TRUST_INVALID_LIMIT'
  | 'CHANGE_TRUST_LOW_RESERVE'
  | 'CHANGE_TRUST_SELF_NOT_ALLOWED'
  | 'CHANGE_TRUST_TRUST_LINE_MISSING'
  | 'CHANGE_TRUST_CANNOT_DELETE'
  | 'CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES'

export const CHANGE_TRUST_RESULT_CODE_TO_INT: Record<ChangeTrustResultCode, number> = /*#__PURE__*/ {
  CHANGE_TRUST_SUCCESS: 0,
  CHANGE_TRUST_MALFORMED: -1,
  CHANGE_TRUST_NO_ISSUER: -2,
  CHANGE_TRUST_INVALID_LIMIT: -3,
  CHANGE_TRUST_LOW_RESERVE: -4,
  CHANGE_TRUST_SELF_NOT_ALLOWED: -5,
  CHANGE_TRUST_TRUST_LINE_MISSING: -6,
  CHANGE_TRUST_CANNOT_DELETE: -7,
  CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES: -8,
}

export const CHANGE_TRUST_RESULT_CODE_FROM_INT: Record<number, ChangeTrustResultCode> = /*#__PURE__*/ {
  0: 'CHANGE_TRUST_SUCCESS',
  [-1]: 'CHANGE_TRUST_MALFORMED',
  [-2]: 'CHANGE_TRUST_NO_ISSUER',
  [-3]: 'CHANGE_TRUST_INVALID_LIMIT',
  [-4]: 'CHANGE_TRUST_LOW_RESERVE',
  [-5]: 'CHANGE_TRUST_SELF_NOT_ALLOWED',
  [-6]: 'CHANGE_TRUST_TRUST_LINE_MISSING',
  [-7]: 'CHANGE_TRUST_CANNOT_DELETE',
  [-8]: 'CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES',
}

export function readChangeTrustResultCode(r: XdrReader): ChangeTrustResultCode {
  const v = readInt32(r)
  const result = CHANGE_TRUST_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ChangeTrustResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeChangeTrustResultCode(w: XdrWriter, v: ChangeTrustResultCode): void {
  writeInt32(w, CHANGE_TRUST_RESULT_CODE_TO_INT[v])
}

export function encodeChangeTrustResultCode(v: ChangeTrustResultCode): Uint8Array {
  return encode(v, writeChangeTrustResultCode)
}

export function decodeChangeTrustResultCode(input: Uint8Array | string): ChangeTrustResultCode {
  return decode(input, readChangeTrustResultCode)
}

const _CHANGE_TRUST_RESULT_CODE_TO_JSON: Record<ChangeTrustResultCode, string> = /*#__PURE__*/ {
  CHANGE_TRUST_SUCCESS: 'success',
  CHANGE_TRUST_MALFORMED: 'malformed',
  CHANGE_TRUST_NO_ISSUER: 'no_issuer',
  CHANGE_TRUST_INVALID_LIMIT: 'invalid_limit',
  CHANGE_TRUST_LOW_RESERVE: 'low_reserve',
  CHANGE_TRUST_SELF_NOT_ALLOWED: 'self_not_allowed',
  CHANGE_TRUST_TRUST_LINE_MISSING: 'trust_line_missing',
  CHANGE_TRUST_CANNOT_DELETE: 'cannot_delete',
  CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES: 'not_auth_maintain_liabilities',
}

const _CHANGE_TRUST_RESULT_CODE_FROM_JSON: Record<string, ChangeTrustResultCode> = /*#__PURE__*/ {
  'success': 'CHANGE_TRUST_SUCCESS',
  'malformed': 'CHANGE_TRUST_MALFORMED',
  'no_issuer': 'CHANGE_TRUST_NO_ISSUER',
  'invalid_limit': 'CHANGE_TRUST_INVALID_LIMIT',
  'low_reserve': 'CHANGE_TRUST_LOW_RESERVE',
  'self_not_allowed': 'CHANGE_TRUST_SELF_NOT_ALLOWED',
  'trust_line_missing': 'CHANGE_TRUST_TRUST_LINE_MISSING',
  'cannot_delete': 'CHANGE_TRUST_CANNOT_DELETE',
  'not_auth_maintain_liabilities': 'CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES',
}

export function toJsonChangeTrustResultCode(v: ChangeTrustResultCode): string {
  return _CHANGE_TRUST_RESULT_CODE_TO_JSON[v]
}

export function fromJsonChangeTrustResultCode(json: unknown): ChangeTrustResultCode {
  const result = _CHANGE_TRUST_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ChangeTrustResultCode JSON value: ${json}`)
  return result
}

export type ChangeTrustResult =
  | { readonly code: 'CHANGE_TRUST_SUCCESS' }
  | { readonly code: 'CHANGE_TRUST_MALFORMED' }
  | { readonly code: 'CHANGE_TRUST_NO_ISSUER' }
  | { readonly code: 'CHANGE_TRUST_INVALID_LIMIT' }
  | { readonly code: 'CHANGE_TRUST_LOW_RESERVE' }
  | { readonly code: 'CHANGE_TRUST_SELF_NOT_ALLOWED' }
  | { readonly code: 'CHANGE_TRUST_TRUST_LINE_MISSING' }
  | { readonly code: 'CHANGE_TRUST_CANNOT_DELETE' }
  | { readonly code: 'CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES' }

export function readChangeTrustResult(r: XdrReader): ChangeTrustResult {
  beginComposite(r)
  try {
    const code = readChangeTrustResultCode(r)
    let result: ChangeTrustResult
    switch (code) {
      case 'CHANGE_TRUST_SUCCESS':
        result = { code }; break
      case 'CHANGE_TRUST_MALFORMED':
      case 'CHANGE_TRUST_NO_ISSUER':
      case 'CHANGE_TRUST_INVALID_LIMIT':
      case 'CHANGE_TRUST_LOW_RESERVE':
      case 'CHANGE_TRUST_SELF_NOT_ALLOWED':
      case 'CHANGE_TRUST_TRUST_LINE_MISSING':
      case 'CHANGE_TRUST_CANNOT_DELETE':
      case 'CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown ChangeTrustResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeChangeTrustResult(w: XdrWriter, v: ChangeTrustResult): void {
  writeChangeTrustResultCode(w, v.code)
  switch (v.code) {
    case 'CHANGE_TRUST_SUCCESS':
      break
    case 'CHANGE_TRUST_MALFORMED':
    case 'CHANGE_TRUST_NO_ISSUER':
    case 'CHANGE_TRUST_INVALID_LIMIT':
    case 'CHANGE_TRUST_LOW_RESERVE':
    case 'CHANGE_TRUST_SELF_NOT_ALLOWED':
    case 'CHANGE_TRUST_TRUST_LINE_MISSING':
    case 'CHANGE_TRUST_CANNOT_DELETE':
    case 'CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES':
      break
  }
}

export function encodeChangeTrustResult(v: ChangeTrustResult): Uint8Array {
  return encode(v, writeChangeTrustResult)
}

export function decodeChangeTrustResult(input: Uint8Array | string): ChangeTrustResult {
  return decode(input, readChangeTrustResult)
}

export function toJsonChangeTrustResult(v: ChangeTrustResult): unknown {
  switch (v.code) {
    case 'CHANGE_TRUST_SUCCESS':
      return 'success'
    case 'CHANGE_TRUST_MALFORMED':
      return 'malformed'
    case 'CHANGE_TRUST_NO_ISSUER':
      return 'no_issuer'
    case 'CHANGE_TRUST_INVALID_LIMIT':
      return 'invalid_limit'
    case 'CHANGE_TRUST_LOW_RESERVE':
      return 'low_reserve'
    case 'CHANGE_TRUST_SELF_NOT_ALLOWED':
      return 'self_not_allowed'
    case 'CHANGE_TRUST_TRUST_LINE_MISSING':
      return 'trust_line_missing'
    case 'CHANGE_TRUST_CANNOT_DELETE':
      return 'cannot_delete'
    case 'CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES':
      return 'not_auth_maintain_liabilities'
  }
}

export function fromJsonChangeTrustResult(json: unknown): ChangeTrustResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'CHANGE_TRUST_SUCCESS' } as ChangeTrustResult
    if (json === 'malformed') return { code: 'CHANGE_TRUST_MALFORMED' } as ChangeTrustResult
    if (json === 'no_issuer') return { code: 'CHANGE_TRUST_NO_ISSUER' } as ChangeTrustResult
    if (json === 'invalid_limit') return { code: 'CHANGE_TRUST_INVALID_LIMIT' } as ChangeTrustResult
    if (json === 'low_reserve') return { code: 'CHANGE_TRUST_LOW_RESERVE' } as ChangeTrustResult
    if (json === 'self_not_allowed') return { code: 'CHANGE_TRUST_SELF_NOT_ALLOWED' } as ChangeTrustResult
    if (json === 'trust_line_missing') return { code: 'CHANGE_TRUST_TRUST_LINE_MISSING' } as ChangeTrustResult
    if (json === 'cannot_delete') return { code: 'CHANGE_TRUST_CANNOT_DELETE' } as ChangeTrustResult
    if (json === 'not_auth_maintain_liabilities') return { code: 'CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES' } as ChangeTrustResult
    throw new Error(`Unknown ChangeTrustResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown ChangeTrustResult variant: ${key}`)
  }
}

export type AllowTrustResultCode =
  | 'ALLOW_TRUST_SUCCESS'
  | 'ALLOW_TRUST_MALFORMED'
  | 'ALLOW_TRUST_NO_TRUST_LINE'
  | 'ALLOW_TRUST_TRUST_NOT_REQUIRED'
  | 'ALLOW_TRUST_CANT_REVOKE'
  | 'ALLOW_TRUST_SELF_NOT_ALLOWED'
  | 'ALLOW_TRUST_LOW_RESERVE'

export const ALLOW_TRUST_RESULT_CODE_TO_INT: Record<AllowTrustResultCode, number> = /*#__PURE__*/ {
  ALLOW_TRUST_SUCCESS: 0,
  ALLOW_TRUST_MALFORMED: -1,
  ALLOW_TRUST_NO_TRUST_LINE: -2,
  ALLOW_TRUST_TRUST_NOT_REQUIRED: -3,
  ALLOW_TRUST_CANT_REVOKE: -4,
  ALLOW_TRUST_SELF_NOT_ALLOWED: -5,
  ALLOW_TRUST_LOW_RESERVE: -6,
}

export const ALLOW_TRUST_RESULT_CODE_FROM_INT: Record<number, AllowTrustResultCode> = /*#__PURE__*/ {
  0: 'ALLOW_TRUST_SUCCESS',
  [-1]: 'ALLOW_TRUST_MALFORMED',
  [-2]: 'ALLOW_TRUST_NO_TRUST_LINE',
  [-3]: 'ALLOW_TRUST_TRUST_NOT_REQUIRED',
  [-4]: 'ALLOW_TRUST_CANT_REVOKE',
  [-5]: 'ALLOW_TRUST_SELF_NOT_ALLOWED',
  [-6]: 'ALLOW_TRUST_LOW_RESERVE',
}

export function readAllowTrustResultCode(r: XdrReader): AllowTrustResultCode {
  const v = readInt32(r)
  const result = ALLOW_TRUST_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown AllowTrustResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeAllowTrustResultCode(w: XdrWriter, v: AllowTrustResultCode): void {
  writeInt32(w, ALLOW_TRUST_RESULT_CODE_TO_INT[v])
}

export function encodeAllowTrustResultCode(v: AllowTrustResultCode): Uint8Array {
  return encode(v, writeAllowTrustResultCode)
}

export function decodeAllowTrustResultCode(input: Uint8Array | string): AllowTrustResultCode {
  return decode(input, readAllowTrustResultCode)
}

const _ALLOW_TRUST_RESULT_CODE_TO_JSON: Record<AllowTrustResultCode, string> = /*#__PURE__*/ {
  ALLOW_TRUST_SUCCESS: 'success',
  ALLOW_TRUST_MALFORMED: 'malformed',
  ALLOW_TRUST_NO_TRUST_LINE: 'no_trust_line',
  ALLOW_TRUST_TRUST_NOT_REQUIRED: 'trust_not_required',
  ALLOW_TRUST_CANT_REVOKE: 'cant_revoke',
  ALLOW_TRUST_SELF_NOT_ALLOWED: 'self_not_allowed',
  ALLOW_TRUST_LOW_RESERVE: 'low_reserve',
}

const _ALLOW_TRUST_RESULT_CODE_FROM_JSON: Record<string, AllowTrustResultCode> = /*#__PURE__*/ {
  'success': 'ALLOW_TRUST_SUCCESS',
  'malformed': 'ALLOW_TRUST_MALFORMED',
  'no_trust_line': 'ALLOW_TRUST_NO_TRUST_LINE',
  'trust_not_required': 'ALLOW_TRUST_TRUST_NOT_REQUIRED',
  'cant_revoke': 'ALLOW_TRUST_CANT_REVOKE',
  'self_not_allowed': 'ALLOW_TRUST_SELF_NOT_ALLOWED',
  'low_reserve': 'ALLOW_TRUST_LOW_RESERVE',
}

export function toJsonAllowTrustResultCode(v: AllowTrustResultCode): string {
  return _ALLOW_TRUST_RESULT_CODE_TO_JSON[v]
}

export function fromJsonAllowTrustResultCode(json: unknown): AllowTrustResultCode {
  const result = _ALLOW_TRUST_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown AllowTrustResultCode JSON value: ${json}`)
  return result
}

export type AllowTrustResult =
  | { readonly code: 'ALLOW_TRUST_SUCCESS' }
  | { readonly code: 'ALLOW_TRUST_MALFORMED' }
  | { readonly code: 'ALLOW_TRUST_NO_TRUST_LINE' }
  | { readonly code: 'ALLOW_TRUST_TRUST_NOT_REQUIRED' }
  | { readonly code: 'ALLOW_TRUST_CANT_REVOKE' }
  | { readonly code: 'ALLOW_TRUST_SELF_NOT_ALLOWED' }
  | { readonly code: 'ALLOW_TRUST_LOW_RESERVE' }

export function readAllowTrustResult(r: XdrReader): AllowTrustResult {
  beginComposite(r)
  try {
    const code = readAllowTrustResultCode(r)
    let result: AllowTrustResult
    switch (code) {
      case 'ALLOW_TRUST_SUCCESS':
        result = { code }; break
      case 'ALLOW_TRUST_MALFORMED':
      case 'ALLOW_TRUST_NO_TRUST_LINE':
      case 'ALLOW_TRUST_TRUST_NOT_REQUIRED':
      case 'ALLOW_TRUST_CANT_REVOKE':
      case 'ALLOW_TRUST_SELF_NOT_ALLOWED':
      case 'ALLOW_TRUST_LOW_RESERVE':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown AllowTrustResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeAllowTrustResult(w: XdrWriter, v: AllowTrustResult): void {
  writeAllowTrustResultCode(w, v.code)
  switch (v.code) {
    case 'ALLOW_TRUST_SUCCESS':
      break
    case 'ALLOW_TRUST_MALFORMED':
    case 'ALLOW_TRUST_NO_TRUST_LINE':
    case 'ALLOW_TRUST_TRUST_NOT_REQUIRED':
    case 'ALLOW_TRUST_CANT_REVOKE':
    case 'ALLOW_TRUST_SELF_NOT_ALLOWED':
    case 'ALLOW_TRUST_LOW_RESERVE':
      break
  }
}

export function encodeAllowTrustResult(v: AllowTrustResult): Uint8Array {
  return encode(v, writeAllowTrustResult)
}

export function decodeAllowTrustResult(input: Uint8Array | string): AllowTrustResult {
  return decode(input, readAllowTrustResult)
}

export function toJsonAllowTrustResult(v: AllowTrustResult): unknown {
  switch (v.code) {
    case 'ALLOW_TRUST_SUCCESS':
      return 'success'
    case 'ALLOW_TRUST_MALFORMED':
      return 'malformed'
    case 'ALLOW_TRUST_NO_TRUST_LINE':
      return 'no_trust_line'
    case 'ALLOW_TRUST_TRUST_NOT_REQUIRED':
      return 'trust_not_required'
    case 'ALLOW_TRUST_CANT_REVOKE':
      return 'cant_revoke'
    case 'ALLOW_TRUST_SELF_NOT_ALLOWED':
      return 'self_not_allowed'
    case 'ALLOW_TRUST_LOW_RESERVE':
      return 'low_reserve'
  }
}

export function fromJsonAllowTrustResult(json: unknown): AllowTrustResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'ALLOW_TRUST_SUCCESS' } as AllowTrustResult
    if (json === 'malformed') return { code: 'ALLOW_TRUST_MALFORMED' } as AllowTrustResult
    if (json === 'no_trust_line') return { code: 'ALLOW_TRUST_NO_TRUST_LINE' } as AllowTrustResult
    if (json === 'trust_not_required') return { code: 'ALLOW_TRUST_TRUST_NOT_REQUIRED' } as AllowTrustResult
    if (json === 'cant_revoke') return { code: 'ALLOW_TRUST_CANT_REVOKE' } as AllowTrustResult
    if (json === 'self_not_allowed') return { code: 'ALLOW_TRUST_SELF_NOT_ALLOWED' } as AllowTrustResult
    if (json === 'low_reserve') return { code: 'ALLOW_TRUST_LOW_RESERVE' } as AllowTrustResult
    throw new Error(`Unknown AllowTrustResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown AllowTrustResult variant: ${key}`)
  }
}

export type AccountMergeResultCode =
  | 'ACCOUNT_MERGE_SUCCESS'
  | 'ACCOUNT_MERGE_MALFORMED'
  | 'ACCOUNT_MERGE_NO_ACCOUNT'
  | 'ACCOUNT_MERGE_IMMUTABLE_SET'
  | 'ACCOUNT_MERGE_HAS_SUB_ENTRIES'
  | 'ACCOUNT_MERGE_SEQNUM_TOO_FAR'
  | 'ACCOUNT_MERGE_DEST_FULL'
  | 'ACCOUNT_MERGE_IS_SPONSOR'

export const ACCOUNT_MERGE_RESULT_CODE_TO_INT: Record<AccountMergeResultCode, number> = /*#__PURE__*/ {
  ACCOUNT_MERGE_SUCCESS: 0,
  ACCOUNT_MERGE_MALFORMED: -1,
  ACCOUNT_MERGE_NO_ACCOUNT: -2,
  ACCOUNT_MERGE_IMMUTABLE_SET: -3,
  ACCOUNT_MERGE_HAS_SUB_ENTRIES: -4,
  ACCOUNT_MERGE_SEQNUM_TOO_FAR: -5,
  ACCOUNT_MERGE_DEST_FULL: -6,
  ACCOUNT_MERGE_IS_SPONSOR: -7,
}

export const ACCOUNT_MERGE_RESULT_CODE_FROM_INT: Record<number, AccountMergeResultCode> = /*#__PURE__*/ {
  0: 'ACCOUNT_MERGE_SUCCESS',
  [-1]: 'ACCOUNT_MERGE_MALFORMED',
  [-2]: 'ACCOUNT_MERGE_NO_ACCOUNT',
  [-3]: 'ACCOUNT_MERGE_IMMUTABLE_SET',
  [-4]: 'ACCOUNT_MERGE_HAS_SUB_ENTRIES',
  [-5]: 'ACCOUNT_MERGE_SEQNUM_TOO_FAR',
  [-6]: 'ACCOUNT_MERGE_DEST_FULL',
  [-7]: 'ACCOUNT_MERGE_IS_SPONSOR',
}

export function readAccountMergeResultCode(r: XdrReader): AccountMergeResultCode {
  const v = readInt32(r)
  const result = ACCOUNT_MERGE_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown AccountMergeResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeAccountMergeResultCode(w: XdrWriter, v: AccountMergeResultCode): void {
  writeInt32(w, ACCOUNT_MERGE_RESULT_CODE_TO_INT[v])
}

export function encodeAccountMergeResultCode(v: AccountMergeResultCode): Uint8Array {
  return encode(v, writeAccountMergeResultCode)
}

export function decodeAccountMergeResultCode(input: Uint8Array | string): AccountMergeResultCode {
  return decode(input, readAccountMergeResultCode)
}

const _ACCOUNT_MERGE_RESULT_CODE_TO_JSON: Record<AccountMergeResultCode, string> = /*#__PURE__*/ {
  ACCOUNT_MERGE_SUCCESS: 'success',
  ACCOUNT_MERGE_MALFORMED: 'malformed',
  ACCOUNT_MERGE_NO_ACCOUNT: 'no_account',
  ACCOUNT_MERGE_IMMUTABLE_SET: 'immutable_set',
  ACCOUNT_MERGE_HAS_SUB_ENTRIES: 'has_sub_entries',
  ACCOUNT_MERGE_SEQNUM_TOO_FAR: 'seqnum_too_far',
  ACCOUNT_MERGE_DEST_FULL: 'dest_full',
  ACCOUNT_MERGE_IS_SPONSOR: 'is_sponsor',
}

const _ACCOUNT_MERGE_RESULT_CODE_FROM_JSON: Record<string, AccountMergeResultCode> = /*#__PURE__*/ {
  'success': 'ACCOUNT_MERGE_SUCCESS',
  'malformed': 'ACCOUNT_MERGE_MALFORMED',
  'no_account': 'ACCOUNT_MERGE_NO_ACCOUNT',
  'immutable_set': 'ACCOUNT_MERGE_IMMUTABLE_SET',
  'has_sub_entries': 'ACCOUNT_MERGE_HAS_SUB_ENTRIES',
  'seqnum_too_far': 'ACCOUNT_MERGE_SEQNUM_TOO_FAR',
  'dest_full': 'ACCOUNT_MERGE_DEST_FULL',
  'is_sponsor': 'ACCOUNT_MERGE_IS_SPONSOR',
}

export function toJsonAccountMergeResultCode(v: AccountMergeResultCode): string {
  return _ACCOUNT_MERGE_RESULT_CODE_TO_JSON[v]
}

export function fromJsonAccountMergeResultCode(json: unknown): AccountMergeResultCode {
  const result = _ACCOUNT_MERGE_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown AccountMergeResultCode JSON value: ${json}`)
  return result
}

export type AccountMergeResult =
  | { readonly code: 'ACCOUNT_MERGE_SUCCESS'; readonly sourceAccountBalance: int64 }
  | { readonly code: 'ACCOUNT_MERGE_MALFORMED' }
  | { readonly code: 'ACCOUNT_MERGE_NO_ACCOUNT' }
  | { readonly code: 'ACCOUNT_MERGE_IMMUTABLE_SET' }
  | { readonly code: 'ACCOUNT_MERGE_HAS_SUB_ENTRIES' }
  | { readonly code: 'ACCOUNT_MERGE_SEQNUM_TOO_FAR' }
  | { readonly code: 'ACCOUNT_MERGE_DEST_FULL' }
  | { readonly code: 'ACCOUNT_MERGE_IS_SPONSOR' }

export function readAccountMergeResult(r: XdrReader): AccountMergeResult {
  beginComposite(r)
  try {
    const code = readAccountMergeResultCode(r)
    let result: AccountMergeResult
    switch (code) {
      case 'ACCOUNT_MERGE_SUCCESS':
        result = { code, sourceAccountBalance: readint64(r) }; break
      case 'ACCOUNT_MERGE_MALFORMED':
      case 'ACCOUNT_MERGE_NO_ACCOUNT':
      case 'ACCOUNT_MERGE_IMMUTABLE_SET':
      case 'ACCOUNT_MERGE_HAS_SUB_ENTRIES':
      case 'ACCOUNT_MERGE_SEQNUM_TOO_FAR':
      case 'ACCOUNT_MERGE_DEST_FULL':
      case 'ACCOUNT_MERGE_IS_SPONSOR':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown AccountMergeResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeAccountMergeResult(w: XdrWriter, v: AccountMergeResult): void {
  writeAccountMergeResultCode(w, v.code)
  switch (v.code) {
    case 'ACCOUNT_MERGE_SUCCESS':
      writeint64(w, (v as any).sourceAccountBalance); break
    case 'ACCOUNT_MERGE_MALFORMED':
    case 'ACCOUNT_MERGE_NO_ACCOUNT':
    case 'ACCOUNT_MERGE_IMMUTABLE_SET':
    case 'ACCOUNT_MERGE_HAS_SUB_ENTRIES':
    case 'ACCOUNT_MERGE_SEQNUM_TOO_FAR':
    case 'ACCOUNT_MERGE_DEST_FULL':
    case 'ACCOUNT_MERGE_IS_SPONSOR':
      break
  }
}

export function encodeAccountMergeResult(v: AccountMergeResult): Uint8Array {
  return encode(v, writeAccountMergeResult)
}

export function decodeAccountMergeResult(input: Uint8Array | string): AccountMergeResult {
  return decode(input, readAccountMergeResult)
}

export function toJsonAccountMergeResult(v: AccountMergeResult): unknown {
  switch (v.code) {
    case 'ACCOUNT_MERGE_SUCCESS':
      return { 'success': toJsonint64((v as any).sourceAccountBalance) }
    case 'ACCOUNT_MERGE_MALFORMED':
      return 'malformed'
    case 'ACCOUNT_MERGE_NO_ACCOUNT':
      return 'no_account'
    case 'ACCOUNT_MERGE_IMMUTABLE_SET':
      return 'immutable_set'
    case 'ACCOUNT_MERGE_HAS_SUB_ENTRIES':
      return 'has_sub_entries'
    case 'ACCOUNT_MERGE_SEQNUM_TOO_FAR':
      return 'seqnum_too_far'
    case 'ACCOUNT_MERGE_DEST_FULL':
      return 'dest_full'
    case 'ACCOUNT_MERGE_IS_SPONSOR':
      return 'is_sponsor'
  }
}

export function fromJsonAccountMergeResult(json: unknown): AccountMergeResult {
  if (typeof json === 'string') {
    if (json === 'malformed') return { code: 'ACCOUNT_MERGE_MALFORMED' } as AccountMergeResult
    if (json === 'no_account') return { code: 'ACCOUNT_MERGE_NO_ACCOUNT' } as AccountMergeResult
    if (json === 'immutable_set') return { code: 'ACCOUNT_MERGE_IMMUTABLE_SET' } as AccountMergeResult
    if (json === 'has_sub_entries') return { code: 'ACCOUNT_MERGE_HAS_SUB_ENTRIES' } as AccountMergeResult
    if (json === 'seqnum_too_far') return { code: 'ACCOUNT_MERGE_SEQNUM_TOO_FAR' } as AccountMergeResult
    if (json === 'dest_full') return { code: 'ACCOUNT_MERGE_DEST_FULL' } as AccountMergeResult
    if (json === 'is_sponsor') return { code: 'ACCOUNT_MERGE_IS_SPONSOR' } as AccountMergeResult
    throw new Error(`Unknown AccountMergeResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'success':
      return { code: 'ACCOUNT_MERGE_SUCCESS', sourceAccountBalance: fromJsonint64(obj[key]) } as AccountMergeResult
    default: throw new Error(`Unknown AccountMergeResult variant: ${key}`)
  }
}

export type InflationResultCode =
  | 'INFLATION_SUCCESS'
  | 'INFLATION_NOT_TIME'

export const INFLATION_RESULT_CODE_TO_INT: Record<InflationResultCode, number> = /*#__PURE__*/ {
  INFLATION_SUCCESS: 0,
  INFLATION_NOT_TIME: -1,
}

export const INFLATION_RESULT_CODE_FROM_INT: Record<number, InflationResultCode> = /*#__PURE__*/ {
  0: 'INFLATION_SUCCESS',
  [-1]: 'INFLATION_NOT_TIME',
}

export function readInflationResultCode(r: XdrReader): InflationResultCode {
  const v = readInt32(r)
  const result = INFLATION_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown InflationResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeInflationResultCode(w: XdrWriter, v: InflationResultCode): void {
  writeInt32(w, INFLATION_RESULT_CODE_TO_INT[v])
}

export function encodeInflationResultCode(v: InflationResultCode): Uint8Array {
  return encode(v, writeInflationResultCode)
}

export function decodeInflationResultCode(input: Uint8Array | string): InflationResultCode {
  return decode(input, readInflationResultCode)
}

const _INFLATION_RESULT_CODE_TO_JSON: Record<InflationResultCode, string> = /*#__PURE__*/ {
  INFLATION_SUCCESS: 'success',
  INFLATION_NOT_TIME: 'not_time',
}

const _INFLATION_RESULT_CODE_FROM_JSON: Record<string, InflationResultCode> = /*#__PURE__*/ {
  'success': 'INFLATION_SUCCESS',
  'not_time': 'INFLATION_NOT_TIME',
}

export function toJsonInflationResultCode(v: InflationResultCode): string {
  return _INFLATION_RESULT_CODE_TO_JSON[v]
}

export function fromJsonInflationResultCode(json: unknown): InflationResultCode {
  const result = _INFLATION_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown InflationResultCode JSON value: ${json}`)
  return result
}

export interface InflationPayout {
  readonly destination: AccountID
  readonly amount: int64
}

export function readInflationPayout(r: XdrReader): InflationPayout {
  beginComposite(r)
  try {
    const destination = readAccountID(r)
    const amount = readint64(r)
    return { destination, amount }
  } finally {
    endComposite(r)
  }
}

export function writeInflationPayout(w: XdrWriter, v: InflationPayout): void {
  writeAccountID(w, v.destination)
  writeint64(w, v.amount)
}

export function encodeInflationPayout(v: InflationPayout): Uint8Array {
  return encode(v, writeInflationPayout)
}

export function decodeInflationPayout(input: Uint8Array | string): InflationPayout {
  return decode(input, readInflationPayout)
}

export function toJsonInflationPayout(v: InflationPayout): Record<string, unknown> {
  return {
    'destination': toJsonAccountID(v.destination),
    'amount': toJsonint64(v.amount),
  }
}

export function fromJsonInflationPayout(json: unknown): InflationPayout {
  const o = json as Record<string, unknown>
  return {
    destination: fromJsonAccountID(o['destination']),
    amount: fromJsonint64(o['amount']),
  }
}

export type InflationResult =
  | { readonly code: 'INFLATION_SUCCESS'; readonly payouts: InflationPayout[] }
  | { readonly code: 'INFLATION_NOT_TIME' }

export function readInflationResult(r: XdrReader): InflationResult {
  beginComposite(r)
  try {
    const code = readInflationResultCode(r)
    let result: InflationResult
    switch (code) {
      case 'INFLATION_SUCCESS':
        result = { code, payouts: readVarArray(r, UINT32_MAX, readInflationPayout) }; break
      case 'INFLATION_NOT_TIME':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown InflationResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeInflationResult(w: XdrWriter, v: InflationResult): void {
  writeInflationResultCode(w, v.code)
  switch (v.code) {
    case 'INFLATION_SUCCESS':
      writeVarArray(w, (v as any).payouts, UINT32_MAX, writeInflationPayout); break
    case 'INFLATION_NOT_TIME':
      break
  }
}

export function encodeInflationResult(v: InflationResult): Uint8Array {
  return encode(v, writeInflationResult)
}

export function decodeInflationResult(input: Uint8Array | string): InflationResult {
  return decode(input, readInflationResult)
}

export function toJsonInflationResult(v: InflationResult): unknown {
  switch (v.code) {
    case 'INFLATION_SUCCESS':
      return { 'success': (v as any).payouts.map((item: any) => toJsonInflationPayout(item)) }
    case 'INFLATION_NOT_TIME':
      return 'not_time'
  }
}

export function fromJsonInflationResult(json: unknown): InflationResult {
  if (typeof json === 'string') {
    if (json === 'not_time') return { code: 'INFLATION_NOT_TIME' } as InflationResult
    throw new Error(`Unknown InflationResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'success':
      return { code: 'INFLATION_SUCCESS', payouts: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonInflationPayout(item)) } as InflationResult
    default: throw new Error(`Unknown InflationResult variant: ${key}`)
  }
}

export type ManageDataResultCode =
  | 'MANAGE_DATA_SUCCESS'
  | 'MANAGE_DATA_NOT_SUPPORTED_YET'
  | 'MANAGE_DATA_NAME_NOT_FOUND'
  | 'MANAGE_DATA_LOW_RESERVE'
  | 'MANAGE_DATA_INVALID_NAME'

export const MANAGE_DATA_RESULT_CODE_TO_INT: Record<ManageDataResultCode, number> = /*#__PURE__*/ {
  MANAGE_DATA_SUCCESS: 0,
  MANAGE_DATA_NOT_SUPPORTED_YET: -1,
  MANAGE_DATA_NAME_NOT_FOUND: -2,
  MANAGE_DATA_LOW_RESERVE: -3,
  MANAGE_DATA_INVALID_NAME: -4,
}

export const MANAGE_DATA_RESULT_CODE_FROM_INT: Record<number, ManageDataResultCode> = /*#__PURE__*/ {
  0: 'MANAGE_DATA_SUCCESS',
  [-1]: 'MANAGE_DATA_NOT_SUPPORTED_YET',
  [-2]: 'MANAGE_DATA_NAME_NOT_FOUND',
  [-3]: 'MANAGE_DATA_LOW_RESERVE',
  [-4]: 'MANAGE_DATA_INVALID_NAME',
}

export function readManageDataResultCode(r: XdrReader): ManageDataResultCode {
  const v = readInt32(r)
  const result = MANAGE_DATA_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ManageDataResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeManageDataResultCode(w: XdrWriter, v: ManageDataResultCode): void {
  writeInt32(w, MANAGE_DATA_RESULT_CODE_TO_INT[v])
}

export function encodeManageDataResultCode(v: ManageDataResultCode): Uint8Array {
  return encode(v, writeManageDataResultCode)
}

export function decodeManageDataResultCode(input: Uint8Array | string): ManageDataResultCode {
  return decode(input, readManageDataResultCode)
}

const _MANAGE_DATA_RESULT_CODE_TO_JSON: Record<ManageDataResultCode, string> = /*#__PURE__*/ {
  MANAGE_DATA_SUCCESS: 'success',
  MANAGE_DATA_NOT_SUPPORTED_YET: 'not_supported_yet',
  MANAGE_DATA_NAME_NOT_FOUND: 'name_not_found',
  MANAGE_DATA_LOW_RESERVE: 'low_reserve',
  MANAGE_DATA_INVALID_NAME: 'invalid_name',
}

const _MANAGE_DATA_RESULT_CODE_FROM_JSON: Record<string, ManageDataResultCode> = /*#__PURE__*/ {
  'success': 'MANAGE_DATA_SUCCESS',
  'not_supported_yet': 'MANAGE_DATA_NOT_SUPPORTED_YET',
  'name_not_found': 'MANAGE_DATA_NAME_NOT_FOUND',
  'low_reserve': 'MANAGE_DATA_LOW_RESERVE',
  'invalid_name': 'MANAGE_DATA_INVALID_NAME',
}

export function toJsonManageDataResultCode(v: ManageDataResultCode): string {
  return _MANAGE_DATA_RESULT_CODE_TO_JSON[v]
}

export function fromJsonManageDataResultCode(json: unknown): ManageDataResultCode {
  const result = _MANAGE_DATA_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ManageDataResultCode JSON value: ${json}`)
  return result
}

export type ManageDataResult =
  | { readonly code: 'MANAGE_DATA_SUCCESS' }
  | { readonly code: 'MANAGE_DATA_NOT_SUPPORTED_YET' }
  | { readonly code: 'MANAGE_DATA_NAME_NOT_FOUND' }
  | { readonly code: 'MANAGE_DATA_LOW_RESERVE' }
  | { readonly code: 'MANAGE_DATA_INVALID_NAME' }

export function readManageDataResult(r: XdrReader): ManageDataResult {
  beginComposite(r)
  try {
    const code = readManageDataResultCode(r)
    let result: ManageDataResult
    switch (code) {
      case 'MANAGE_DATA_SUCCESS':
        result = { code }; break
      case 'MANAGE_DATA_NOT_SUPPORTED_YET':
      case 'MANAGE_DATA_NAME_NOT_FOUND':
      case 'MANAGE_DATA_LOW_RESERVE':
      case 'MANAGE_DATA_INVALID_NAME':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown ManageDataResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeManageDataResult(w: XdrWriter, v: ManageDataResult): void {
  writeManageDataResultCode(w, v.code)
  switch (v.code) {
    case 'MANAGE_DATA_SUCCESS':
      break
    case 'MANAGE_DATA_NOT_SUPPORTED_YET':
    case 'MANAGE_DATA_NAME_NOT_FOUND':
    case 'MANAGE_DATA_LOW_RESERVE':
    case 'MANAGE_DATA_INVALID_NAME':
      break
  }
}

export function encodeManageDataResult(v: ManageDataResult): Uint8Array {
  return encode(v, writeManageDataResult)
}

export function decodeManageDataResult(input: Uint8Array | string): ManageDataResult {
  return decode(input, readManageDataResult)
}

export function toJsonManageDataResult(v: ManageDataResult): unknown {
  switch (v.code) {
    case 'MANAGE_DATA_SUCCESS':
      return 'success'
    case 'MANAGE_DATA_NOT_SUPPORTED_YET':
      return 'not_supported_yet'
    case 'MANAGE_DATA_NAME_NOT_FOUND':
      return 'name_not_found'
    case 'MANAGE_DATA_LOW_RESERVE':
      return 'low_reserve'
    case 'MANAGE_DATA_INVALID_NAME':
      return 'invalid_name'
  }
}

export function fromJsonManageDataResult(json: unknown): ManageDataResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'MANAGE_DATA_SUCCESS' } as ManageDataResult
    if (json === 'not_supported_yet') return { code: 'MANAGE_DATA_NOT_SUPPORTED_YET' } as ManageDataResult
    if (json === 'name_not_found') return { code: 'MANAGE_DATA_NAME_NOT_FOUND' } as ManageDataResult
    if (json === 'low_reserve') return { code: 'MANAGE_DATA_LOW_RESERVE' } as ManageDataResult
    if (json === 'invalid_name') return { code: 'MANAGE_DATA_INVALID_NAME' } as ManageDataResult
    throw new Error(`Unknown ManageDataResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown ManageDataResult variant: ${key}`)
  }
}

export type BumpSequenceResultCode =
  | 'BUMP_SEQUENCE_SUCCESS'
  | 'BUMP_SEQUENCE_BAD_SEQ'

export const BUMP_SEQUENCE_RESULT_CODE_TO_INT: Record<BumpSequenceResultCode, number> = /*#__PURE__*/ {
  BUMP_SEQUENCE_SUCCESS: 0,
  BUMP_SEQUENCE_BAD_SEQ: -1,
}

export const BUMP_SEQUENCE_RESULT_CODE_FROM_INT: Record<number, BumpSequenceResultCode> = /*#__PURE__*/ {
  0: 'BUMP_SEQUENCE_SUCCESS',
  [-1]: 'BUMP_SEQUENCE_BAD_SEQ',
}

export function readBumpSequenceResultCode(r: XdrReader): BumpSequenceResultCode {
  const v = readInt32(r)
  const result = BUMP_SEQUENCE_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown BumpSequenceResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeBumpSequenceResultCode(w: XdrWriter, v: BumpSequenceResultCode): void {
  writeInt32(w, BUMP_SEQUENCE_RESULT_CODE_TO_INT[v])
}

export function encodeBumpSequenceResultCode(v: BumpSequenceResultCode): Uint8Array {
  return encode(v, writeBumpSequenceResultCode)
}

export function decodeBumpSequenceResultCode(input: Uint8Array | string): BumpSequenceResultCode {
  return decode(input, readBumpSequenceResultCode)
}

const _BUMP_SEQUENCE_RESULT_CODE_TO_JSON: Record<BumpSequenceResultCode, string> = /*#__PURE__*/ {
  BUMP_SEQUENCE_SUCCESS: 'success',
  BUMP_SEQUENCE_BAD_SEQ: 'bad_seq',
}

const _BUMP_SEQUENCE_RESULT_CODE_FROM_JSON: Record<string, BumpSequenceResultCode> = /*#__PURE__*/ {
  'success': 'BUMP_SEQUENCE_SUCCESS',
  'bad_seq': 'BUMP_SEQUENCE_BAD_SEQ',
}

export function toJsonBumpSequenceResultCode(v: BumpSequenceResultCode): string {
  return _BUMP_SEQUENCE_RESULT_CODE_TO_JSON[v]
}

export function fromJsonBumpSequenceResultCode(json: unknown): BumpSequenceResultCode {
  const result = _BUMP_SEQUENCE_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown BumpSequenceResultCode JSON value: ${json}`)
  return result
}

export type BumpSequenceResult =
  | { readonly code: 'BUMP_SEQUENCE_SUCCESS' }
  | { readonly code: 'BUMP_SEQUENCE_BAD_SEQ' }

export function readBumpSequenceResult(r: XdrReader): BumpSequenceResult {
  beginComposite(r)
  try {
    const code = readBumpSequenceResultCode(r)
    let result: BumpSequenceResult
    switch (code) {
      case 'BUMP_SEQUENCE_SUCCESS':
        result = { code }; break
      case 'BUMP_SEQUENCE_BAD_SEQ':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown BumpSequenceResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeBumpSequenceResult(w: XdrWriter, v: BumpSequenceResult): void {
  writeBumpSequenceResultCode(w, v.code)
  switch (v.code) {
    case 'BUMP_SEQUENCE_SUCCESS':
      break
    case 'BUMP_SEQUENCE_BAD_SEQ':
      break
  }
}

export function encodeBumpSequenceResult(v: BumpSequenceResult): Uint8Array {
  return encode(v, writeBumpSequenceResult)
}

export function decodeBumpSequenceResult(input: Uint8Array | string): BumpSequenceResult {
  return decode(input, readBumpSequenceResult)
}

export function toJsonBumpSequenceResult(v: BumpSequenceResult): unknown {
  switch (v.code) {
    case 'BUMP_SEQUENCE_SUCCESS':
      return 'success'
    case 'BUMP_SEQUENCE_BAD_SEQ':
      return 'bad_seq'
  }
}

export function fromJsonBumpSequenceResult(json: unknown): BumpSequenceResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'BUMP_SEQUENCE_SUCCESS' } as BumpSequenceResult
    if (json === 'bad_seq') return { code: 'BUMP_SEQUENCE_BAD_SEQ' } as BumpSequenceResult
    throw new Error(`Unknown BumpSequenceResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown BumpSequenceResult variant: ${key}`)
  }
}

export type CreateClaimableBalanceResultCode =
  | 'CREATE_CLAIMABLE_BALANCE_SUCCESS'
  | 'CREATE_CLAIMABLE_BALANCE_MALFORMED'
  | 'CREATE_CLAIMABLE_BALANCE_LOW_RESERVE'
  | 'CREATE_CLAIMABLE_BALANCE_NO_TRUST'
  | 'CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED'
  | 'CREATE_CLAIMABLE_BALANCE_UNDERFUNDED'

export const CREATE_CLAIMABLE_BALANCE_RESULT_CODE_TO_INT: Record<CreateClaimableBalanceResultCode, number> = /*#__PURE__*/ {
  CREATE_CLAIMABLE_BALANCE_SUCCESS: 0,
  CREATE_CLAIMABLE_BALANCE_MALFORMED: -1,
  CREATE_CLAIMABLE_BALANCE_LOW_RESERVE: -2,
  CREATE_CLAIMABLE_BALANCE_NO_TRUST: -3,
  CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED: -4,
  CREATE_CLAIMABLE_BALANCE_UNDERFUNDED: -5,
}

export const CREATE_CLAIMABLE_BALANCE_RESULT_CODE_FROM_INT: Record<number, CreateClaimableBalanceResultCode> = /*#__PURE__*/ {
  0: 'CREATE_CLAIMABLE_BALANCE_SUCCESS',
  [-1]: 'CREATE_CLAIMABLE_BALANCE_MALFORMED',
  [-2]: 'CREATE_CLAIMABLE_BALANCE_LOW_RESERVE',
  [-3]: 'CREATE_CLAIMABLE_BALANCE_NO_TRUST',
  [-4]: 'CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED',
  [-5]: 'CREATE_CLAIMABLE_BALANCE_UNDERFUNDED',
}

export function readCreateClaimableBalanceResultCode(r: XdrReader): CreateClaimableBalanceResultCode {
  const v = readInt32(r)
  const result = CREATE_CLAIMABLE_BALANCE_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown CreateClaimableBalanceResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeCreateClaimableBalanceResultCode(w: XdrWriter, v: CreateClaimableBalanceResultCode): void {
  writeInt32(w, CREATE_CLAIMABLE_BALANCE_RESULT_CODE_TO_INT[v])
}

export function encodeCreateClaimableBalanceResultCode(v: CreateClaimableBalanceResultCode): Uint8Array {
  return encode(v, writeCreateClaimableBalanceResultCode)
}

export function decodeCreateClaimableBalanceResultCode(input: Uint8Array | string): CreateClaimableBalanceResultCode {
  return decode(input, readCreateClaimableBalanceResultCode)
}

const _CREATE_CLAIMABLE_BALANCE_RESULT_CODE_TO_JSON: Record<CreateClaimableBalanceResultCode, string> = /*#__PURE__*/ {
  CREATE_CLAIMABLE_BALANCE_SUCCESS: 'success',
  CREATE_CLAIMABLE_BALANCE_MALFORMED: 'malformed',
  CREATE_CLAIMABLE_BALANCE_LOW_RESERVE: 'low_reserve',
  CREATE_CLAIMABLE_BALANCE_NO_TRUST: 'no_trust',
  CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED: 'not_authorized',
  CREATE_CLAIMABLE_BALANCE_UNDERFUNDED: 'underfunded',
}

const _CREATE_CLAIMABLE_BALANCE_RESULT_CODE_FROM_JSON: Record<string, CreateClaimableBalanceResultCode> = /*#__PURE__*/ {
  'success': 'CREATE_CLAIMABLE_BALANCE_SUCCESS',
  'malformed': 'CREATE_CLAIMABLE_BALANCE_MALFORMED',
  'low_reserve': 'CREATE_CLAIMABLE_BALANCE_LOW_RESERVE',
  'no_trust': 'CREATE_CLAIMABLE_BALANCE_NO_TRUST',
  'not_authorized': 'CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED',
  'underfunded': 'CREATE_CLAIMABLE_BALANCE_UNDERFUNDED',
}

export function toJsonCreateClaimableBalanceResultCode(v: CreateClaimableBalanceResultCode): string {
  return _CREATE_CLAIMABLE_BALANCE_RESULT_CODE_TO_JSON[v]
}

export function fromJsonCreateClaimableBalanceResultCode(json: unknown): CreateClaimableBalanceResultCode {
  const result = _CREATE_CLAIMABLE_BALANCE_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown CreateClaimableBalanceResultCode JSON value: ${json}`)
  return result
}

export type CreateClaimableBalanceResult =
  | { readonly code: 'CREATE_CLAIMABLE_BALANCE_SUCCESS'; readonly balanceID: ClaimableBalanceID }
  | { readonly code: 'CREATE_CLAIMABLE_BALANCE_MALFORMED' }
  | { readonly code: 'CREATE_CLAIMABLE_BALANCE_LOW_RESERVE' }
  | { readonly code: 'CREATE_CLAIMABLE_BALANCE_NO_TRUST' }
  | { readonly code: 'CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED' }
  | { readonly code: 'CREATE_CLAIMABLE_BALANCE_UNDERFUNDED' }

export function readCreateClaimableBalanceResult(r: XdrReader): CreateClaimableBalanceResult {
  beginComposite(r)
  try {
    const code = readCreateClaimableBalanceResultCode(r)
    let result: CreateClaimableBalanceResult
    switch (code) {
      case 'CREATE_CLAIMABLE_BALANCE_SUCCESS':
        result = { code, balanceID: readClaimableBalanceID(r) }; break
      case 'CREATE_CLAIMABLE_BALANCE_MALFORMED':
      case 'CREATE_CLAIMABLE_BALANCE_LOW_RESERVE':
      case 'CREATE_CLAIMABLE_BALANCE_NO_TRUST':
      case 'CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED':
      case 'CREATE_CLAIMABLE_BALANCE_UNDERFUNDED':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown CreateClaimableBalanceResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeCreateClaimableBalanceResult(w: XdrWriter, v: CreateClaimableBalanceResult): void {
  writeCreateClaimableBalanceResultCode(w, v.code)
  switch (v.code) {
    case 'CREATE_CLAIMABLE_BALANCE_SUCCESS':
      writeClaimableBalanceID(w, (v as any).balanceID); break
    case 'CREATE_CLAIMABLE_BALANCE_MALFORMED':
    case 'CREATE_CLAIMABLE_BALANCE_LOW_RESERVE':
    case 'CREATE_CLAIMABLE_BALANCE_NO_TRUST':
    case 'CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED':
    case 'CREATE_CLAIMABLE_BALANCE_UNDERFUNDED':
      break
  }
}

export function encodeCreateClaimableBalanceResult(v: CreateClaimableBalanceResult): Uint8Array {
  return encode(v, writeCreateClaimableBalanceResult)
}

export function decodeCreateClaimableBalanceResult(input: Uint8Array | string): CreateClaimableBalanceResult {
  return decode(input, readCreateClaimableBalanceResult)
}

export function toJsonCreateClaimableBalanceResult(v: CreateClaimableBalanceResult): unknown {
  switch (v.code) {
    case 'CREATE_CLAIMABLE_BALANCE_SUCCESS':
      return { 'success': toJsonClaimableBalanceID((v as any).balanceID) }
    case 'CREATE_CLAIMABLE_BALANCE_MALFORMED':
      return 'malformed'
    case 'CREATE_CLAIMABLE_BALANCE_LOW_RESERVE':
      return 'low_reserve'
    case 'CREATE_CLAIMABLE_BALANCE_NO_TRUST':
      return 'no_trust'
    case 'CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED':
      return 'not_authorized'
    case 'CREATE_CLAIMABLE_BALANCE_UNDERFUNDED':
      return 'underfunded'
  }
}

export function fromJsonCreateClaimableBalanceResult(json: unknown): CreateClaimableBalanceResult {
  if (typeof json === 'string') {
    if (json === 'malformed') return { code: 'CREATE_CLAIMABLE_BALANCE_MALFORMED' } as CreateClaimableBalanceResult
    if (json === 'low_reserve') return { code: 'CREATE_CLAIMABLE_BALANCE_LOW_RESERVE' } as CreateClaimableBalanceResult
    if (json === 'no_trust') return { code: 'CREATE_CLAIMABLE_BALANCE_NO_TRUST' } as CreateClaimableBalanceResult
    if (json === 'not_authorized') return { code: 'CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED' } as CreateClaimableBalanceResult
    if (json === 'underfunded') return { code: 'CREATE_CLAIMABLE_BALANCE_UNDERFUNDED' } as CreateClaimableBalanceResult
    throw new Error(`Unknown CreateClaimableBalanceResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'success':
      return { code: 'CREATE_CLAIMABLE_BALANCE_SUCCESS', balanceID: fromJsonClaimableBalanceID(obj[key]) } as CreateClaimableBalanceResult
    default: throw new Error(`Unknown CreateClaimableBalanceResult variant: ${key}`)
  }
}

export type ClaimClaimableBalanceResultCode =
  | 'CLAIM_CLAIMABLE_BALANCE_SUCCESS'
  | 'CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST'
  | 'CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM'
  | 'CLAIM_CLAIMABLE_BALANCE_LINE_FULL'
  | 'CLAIM_CLAIMABLE_BALANCE_NO_TRUST'
  | 'CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED'

export const CLAIM_CLAIMABLE_BALANCE_RESULT_CODE_TO_INT: Record<ClaimClaimableBalanceResultCode, number> = /*#__PURE__*/ {
  CLAIM_CLAIMABLE_BALANCE_SUCCESS: 0,
  CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST: -1,
  CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM: -2,
  CLAIM_CLAIMABLE_BALANCE_LINE_FULL: -3,
  CLAIM_CLAIMABLE_BALANCE_NO_TRUST: -4,
  CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED: -5,
}

export const CLAIM_CLAIMABLE_BALANCE_RESULT_CODE_FROM_INT: Record<number, ClaimClaimableBalanceResultCode> = /*#__PURE__*/ {
  0: 'CLAIM_CLAIMABLE_BALANCE_SUCCESS',
  [-1]: 'CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST',
  [-2]: 'CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM',
  [-3]: 'CLAIM_CLAIMABLE_BALANCE_LINE_FULL',
  [-4]: 'CLAIM_CLAIMABLE_BALANCE_NO_TRUST',
  [-5]: 'CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED',
}

export function readClaimClaimableBalanceResultCode(r: XdrReader): ClaimClaimableBalanceResultCode {
  const v = readInt32(r)
  const result = CLAIM_CLAIMABLE_BALANCE_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ClaimClaimableBalanceResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeClaimClaimableBalanceResultCode(w: XdrWriter, v: ClaimClaimableBalanceResultCode): void {
  writeInt32(w, CLAIM_CLAIMABLE_BALANCE_RESULT_CODE_TO_INT[v])
}

export function encodeClaimClaimableBalanceResultCode(v: ClaimClaimableBalanceResultCode): Uint8Array {
  return encode(v, writeClaimClaimableBalanceResultCode)
}

export function decodeClaimClaimableBalanceResultCode(input: Uint8Array | string): ClaimClaimableBalanceResultCode {
  return decode(input, readClaimClaimableBalanceResultCode)
}

const _CLAIM_CLAIMABLE_BALANCE_RESULT_CODE_TO_JSON: Record<ClaimClaimableBalanceResultCode, string> = /*#__PURE__*/ {
  CLAIM_CLAIMABLE_BALANCE_SUCCESS: 'success',
  CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST: 'does_not_exist',
  CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM: 'cannot_claim',
  CLAIM_CLAIMABLE_BALANCE_LINE_FULL: 'line_full',
  CLAIM_CLAIMABLE_BALANCE_NO_TRUST: 'no_trust',
  CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED: 'not_authorized',
}

const _CLAIM_CLAIMABLE_BALANCE_RESULT_CODE_FROM_JSON: Record<string, ClaimClaimableBalanceResultCode> = /*#__PURE__*/ {
  'success': 'CLAIM_CLAIMABLE_BALANCE_SUCCESS',
  'does_not_exist': 'CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST',
  'cannot_claim': 'CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM',
  'line_full': 'CLAIM_CLAIMABLE_BALANCE_LINE_FULL',
  'no_trust': 'CLAIM_CLAIMABLE_BALANCE_NO_TRUST',
  'not_authorized': 'CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED',
}

export function toJsonClaimClaimableBalanceResultCode(v: ClaimClaimableBalanceResultCode): string {
  return _CLAIM_CLAIMABLE_BALANCE_RESULT_CODE_TO_JSON[v]
}

export function fromJsonClaimClaimableBalanceResultCode(json: unknown): ClaimClaimableBalanceResultCode {
  const result = _CLAIM_CLAIMABLE_BALANCE_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ClaimClaimableBalanceResultCode JSON value: ${json}`)
  return result
}

export type ClaimClaimableBalanceResult =
  | { readonly code: 'CLAIM_CLAIMABLE_BALANCE_SUCCESS' }
  | { readonly code: 'CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST' }
  | { readonly code: 'CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM' }
  | { readonly code: 'CLAIM_CLAIMABLE_BALANCE_LINE_FULL' }
  | { readonly code: 'CLAIM_CLAIMABLE_BALANCE_NO_TRUST' }
  | { readonly code: 'CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED' }

export function readClaimClaimableBalanceResult(r: XdrReader): ClaimClaimableBalanceResult {
  beginComposite(r)
  try {
    const code = readClaimClaimableBalanceResultCode(r)
    let result: ClaimClaimableBalanceResult
    switch (code) {
      case 'CLAIM_CLAIMABLE_BALANCE_SUCCESS':
        result = { code }; break
      case 'CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST':
      case 'CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM':
      case 'CLAIM_CLAIMABLE_BALANCE_LINE_FULL':
      case 'CLAIM_CLAIMABLE_BALANCE_NO_TRUST':
      case 'CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown ClaimClaimableBalanceResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeClaimClaimableBalanceResult(w: XdrWriter, v: ClaimClaimableBalanceResult): void {
  writeClaimClaimableBalanceResultCode(w, v.code)
  switch (v.code) {
    case 'CLAIM_CLAIMABLE_BALANCE_SUCCESS':
      break
    case 'CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST':
    case 'CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM':
    case 'CLAIM_CLAIMABLE_BALANCE_LINE_FULL':
    case 'CLAIM_CLAIMABLE_BALANCE_NO_TRUST':
    case 'CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED':
      break
  }
}

export function encodeClaimClaimableBalanceResult(v: ClaimClaimableBalanceResult): Uint8Array {
  return encode(v, writeClaimClaimableBalanceResult)
}

export function decodeClaimClaimableBalanceResult(input: Uint8Array | string): ClaimClaimableBalanceResult {
  return decode(input, readClaimClaimableBalanceResult)
}

export function toJsonClaimClaimableBalanceResult(v: ClaimClaimableBalanceResult): unknown {
  switch (v.code) {
    case 'CLAIM_CLAIMABLE_BALANCE_SUCCESS':
      return 'success'
    case 'CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST':
      return 'does_not_exist'
    case 'CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM':
      return 'cannot_claim'
    case 'CLAIM_CLAIMABLE_BALANCE_LINE_FULL':
      return 'line_full'
    case 'CLAIM_CLAIMABLE_BALANCE_NO_TRUST':
      return 'no_trust'
    case 'CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED':
      return 'not_authorized'
  }
}

export function fromJsonClaimClaimableBalanceResult(json: unknown): ClaimClaimableBalanceResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'CLAIM_CLAIMABLE_BALANCE_SUCCESS' } as ClaimClaimableBalanceResult
    if (json === 'does_not_exist') return { code: 'CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST' } as ClaimClaimableBalanceResult
    if (json === 'cannot_claim') return { code: 'CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM' } as ClaimClaimableBalanceResult
    if (json === 'line_full') return { code: 'CLAIM_CLAIMABLE_BALANCE_LINE_FULL' } as ClaimClaimableBalanceResult
    if (json === 'no_trust') return { code: 'CLAIM_CLAIMABLE_BALANCE_NO_TRUST' } as ClaimClaimableBalanceResult
    if (json === 'not_authorized') return { code: 'CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED' } as ClaimClaimableBalanceResult
    throw new Error(`Unknown ClaimClaimableBalanceResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown ClaimClaimableBalanceResult variant: ${key}`)
  }
}

export type BeginSponsoringFutureReservesResultCode =
  | 'BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS'
  | 'BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED'
  | 'BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED'
  | 'BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE'

export const BEGIN_SPONSORING_FUTURE_RESERVES_RESULT_CODE_TO_INT: Record<BeginSponsoringFutureReservesResultCode, number> = /*#__PURE__*/ {
  BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS: 0,
  BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED: -1,
  BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED: -2,
  BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE: -3,
}

export const BEGIN_SPONSORING_FUTURE_RESERVES_RESULT_CODE_FROM_INT: Record<number, BeginSponsoringFutureReservesResultCode> = /*#__PURE__*/ {
  0: 'BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS',
  [-1]: 'BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED',
  [-2]: 'BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED',
  [-3]: 'BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE',
}

export function readBeginSponsoringFutureReservesResultCode(r: XdrReader): BeginSponsoringFutureReservesResultCode {
  const v = readInt32(r)
  const result = BEGIN_SPONSORING_FUTURE_RESERVES_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown BeginSponsoringFutureReservesResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeBeginSponsoringFutureReservesResultCode(w: XdrWriter, v: BeginSponsoringFutureReservesResultCode): void {
  writeInt32(w, BEGIN_SPONSORING_FUTURE_RESERVES_RESULT_CODE_TO_INT[v])
}

export function encodeBeginSponsoringFutureReservesResultCode(v: BeginSponsoringFutureReservesResultCode): Uint8Array {
  return encode(v, writeBeginSponsoringFutureReservesResultCode)
}

export function decodeBeginSponsoringFutureReservesResultCode(input: Uint8Array | string): BeginSponsoringFutureReservesResultCode {
  return decode(input, readBeginSponsoringFutureReservesResultCode)
}

const _BEGIN_SPONSORING_FUTURE_RESERVES_RESULT_CODE_TO_JSON: Record<BeginSponsoringFutureReservesResultCode, string> = /*#__PURE__*/ {
  BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS: 'success',
  BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED: 'malformed',
  BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED: 'already_sponsored',
  BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE: 'recursive',
}

const _BEGIN_SPONSORING_FUTURE_RESERVES_RESULT_CODE_FROM_JSON: Record<string, BeginSponsoringFutureReservesResultCode> = /*#__PURE__*/ {
  'success': 'BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS',
  'malformed': 'BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED',
  'already_sponsored': 'BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED',
  'recursive': 'BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE',
}

export function toJsonBeginSponsoringFutureReservesResultCode(v: BeginSponsoringFutureReservesResultCode): string {
  return _BEGIN_SPONSORING_FUTURE_RESERVES_RESULT_CODE_TO_JSON[v]
}

export function fromJsonBeginSponsoringFutureReservesResultCode(json: unknown): BeginSponsoringFutureReservesResultCode {
  const result = _BEGIN_SPONSORING_FUTURE_RESERVES_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown BeginSponsoringFutureReservesResultCode JSON value: ${json}`)
  return result
}

export type BeginSponsoringFutureReservesResult =
  | { readonly code: 'BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS' }
  | { readonly code: 'BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED' }
  | { readonly code: 'BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED' }
  | { readonly code: 'BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE' }

export function readBeginSponsoringFutureReservesResult(r: XdrReader): BeginSponsoringFutureReservesResult {
  beginComposite(r)
  try {
    const code = readBeginSponsoringFutureReservesResultCode(r)
    let result: BeginSponsoringFutureReservesResult
    switch (code) {
      case 'BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS':
        result = { code }; break
      case 'BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED':
      case 'BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED':
      case 'BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown BeginSponsoringFutureReservesResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeBeginSponsoringFutureReservesResult(w: XdrWriter, v: BeginSponsoringFutureReservesResult): void {
  writeBeginSponsoringFutureReservesResultCode(w, v.code)
  switch (v.code) {
    case 'BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS':
      break
    case 'BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED':
    case 'BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED':
    case 'BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE':
      break
  }
}

export function encodeBeginSponsoringFutureReservesResult(v: BeginSponsoringFutureReservesResult): Uint8Array {
  return encode(v, writeBeginSponsoringFutureReservesResult)
}

export function decodeBeginSponsoringFutureReservesResult(input: Uint8Array | string): BeginSponsoringFutureReservesResult {
  return decode(input, readBeginSponsoringFutureReservesResult)
}

export function toJsonBeginSponsoringFutureReservesResult(v: BeginSponsoringFutureReservesResult): unknown {
  switch (v.code) {
    case 'BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS':
      return 'success'
    case 'BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED':
      return 'malformed'
    case 'BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED':
      return 'already_sponsored'
    case 'BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE':
      return 'recursive'
  }
}

export function fromJsonBeginSponsoringFutureReservesResult(json: unknown): BeginSponsoringFutureReservesResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS' } as BeginSponsoringFutureReservesResult
    if (json === 'malformed') return { code: 'BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED' } as BeginSponsoringFutureReservesResult
    if (json === 'already_sponsored') return { code: 'BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED' } as BeginSponsoringFutureReservesResult
    if (json === 'recursive') return { code: 'BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE' } as BeginSponsoringFutureReservesResult
    throw new Error(`Unknown BeginSponsoringFutureReservesResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown BeginSponsoringFutureReservesResult variant: ${key}`)
  }
}

export type EndSponsoringFutureReservesResultCode =
  | 'END_SPONSORING_FUTURE_RESERVES_SUCCESS'
  | 'END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED'

export const END_SPONSORING_FUTURE_RESERVES_RESULT_CODE_TO_INT: Record<EndSponsoringFutureReservesResultCode, number> = /*#__PURE__*/ {
  END_SPONSORING_FUTURE_RESERVES_SUCCESS: 0,
  END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED: -1,
}

export const END_SPONSORING_FUTURE_RESERVES_RESULT_CODE_FROM_INT: Record<number, EndSponsoringFutureReservesResultCode> = /*#__PURE__*/ {
  0: 'END_SPONSORING_FUTURE_RESERVES_SUCCESS',
  [-1]: 'END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED',
}

export function readEndSponsoringFutureReservesResultCode(r: XdrReader): EndSponsoringFutureReservesResultCode {
  const v = readInt32(r)
  const result = END_SPONSORING_FUTURE_RESERVES_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown EndSponsoringFutureReservesResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeEndSponsoringFutureReservesResultCode(w: XdrWriter, v: EndSponsoringFutureReservesResultCode): void {
  writeInt32(w, END_SPONSORING_FUTURE_RESERVES_RESULT_CODE_TO_INT[v])
}

export function encodeEndSponsoringFutureReservesResultCode(v: EndSponsoringFutureReservesResultCode): Uint8Array {
  return encode(v, writeEndSponsoringFutureReservesResultCode)
}

export function decodeEndSponsoringFutureReservesResultCode(input: Uint8Array | string): EndSponsoringFutureReservesResultCode {
  return decode(input, readEndSponsoringFutureReservesResultCode)
}

const _END_SPONSORING_FUTURE_RESERVES_RESULT_CODE_TO_JSON: Record<EndSponsoringFutureReservesResultCode, string> = /*#__PURE__*/ {
  END_SPONSORING_FUTURE_RESERVES_SUCCESS: 'success',
  END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED: 'not_sponsored',
}

const _END_SPONSORING_FUTURE_RESERVES_RESULT_CODE_FROM_JSON: Record<string, EndSponsoringFutureReservesResultCode> = /*#__PURE__*/ {
  'success': 'END_SPONSORING_FUTURE_RESERVES_SUCCESS',
  'not_sponsored': 'END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED',
}

export function toJsonEndSponsoringFutureReservesResultCode(v: EndSponsoringFutureReservesResultCode): string {
  return _END_SPONSORING_FUTURE_RESERVES_RESULT_CODE_TO_JSON[v]
}

export function fromJsonEndSponsoringFutureReservesResultCode(json: unknown): EndSponsoringFutureReservesResultCode {
  const result = _END_SPONSORING_FUTURE_RESERVES_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown EndSponsoringFutureReservesResultCode JSON value: ${json}`)
  return result
}

export type EndSponsoringFutureReservesResult =
  | { readonly code: 'END_SPONSORING_FUTURE_RESERVES_SUCCESS' }
  | { readonly code: 'END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED' }

export function readEndSponsoringFutureReservesResult(r: XdrReader): EndSponsoringFutureReservesResult {
  beginComposite(r)
  try {
    const code = readEndSponsoringFutureReservesResultCode(r)
    let result: EndSponsoringFutureReservesResult
    switch (code) {
      case 'END_SPONSORING_FUTURE_RESERVES_SUCCESS':
        result = { code }; break
      case 'END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown EndSponsoringFutureReservesResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeEndSponsoringFutureReservesResult(w: XdrWriter, v: EndSponsoringFutureReservesResult): void {
  writeEndSponsoringFutureReservesResultCode(w, v.code)
  switch (v.code) {
    case 'END_SPONSORING_FUTURE_RESERVES_SUCCESS':
      break
    case 'END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED':
      break
  }
}

export function encodeEndSponsoringFutureReservesResult(v: EndSponsoringFutureReservesResult): Uint8Array {
  return encode(v, writeEndSponsoringFutureReservesResult)
}

export function decodeEndSponsoringFutureReservesResult(input: Uint8Array | string): EndSponsoringFutureReservesResult {
  return decode(input, readEndSponsoringFutureReservesResult)
}

export function toJsonEndSponsoringFutureReservesResult(v: EndSponsoringFutureReservesResult): unknown {
  switch (v.code) {
    case 'END_SPONSORING_FUTURE_RESERVES_SUCCESS':
      return 'success'
    case 'END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED':
      return 'not_sponsored'
  }
}

export function fromJsonEndSponsoringFutureReservesResult(json: unknown): EndSponsoringFutureReservesResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'END_SPONSORING_FUTURE_RESERVES_SUCCESS' } as EndSponsoringFutureReservesResult
    if (json === 'not_sponsored') return { code: 'END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED' } as EndSponsoringFutureReservesResult
    throw new Error(`Unknown EndSponsoringFutureReservesResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown EndSponsoringFutureReservesResult variant: ${key}`)
  }
}

export type RevokeSponsorshipResultCode =
  | 'REVOKE_SPONSORSHIP_SUCCESS'
  | 'REVOKE_SPONSORSHIP_DOES_NOT_EXIST'
  | 'REVOKE_SPONSORSHIP_NOT_SPONSOR'
  | 'REVOKE_SPONSORSHIP_LOW_RESERVE'
  | 'REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE'
  | 'REVOKE_SPONSORSHIP_MALFORMED'

export const REVOKE_SPONSORSHIP_RESULT_CODE_TO_INT: Record<RevokeSponsorshipResultCode, number> = /*#__PURE__*/ {
  REVOKE_SPONSORSHIP_SUCCESS: 0,
  REVOKE_SPONSORSHIP_DOES_NOT_EXIST: -1,
  REVOKE_SPONSORSHIP_NOT_SPONSOR: -2,
  REVOKE_SPONSORSHIP_LOW_RESERVE: -3,
  REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE: -4,
  REVOKE_SPONSORSHIP_MALFORMED: -5,
}

export const REVOKE_SPONSORSHIP_RESULT_CODE_FROM_INT: Record<number, RevokeSponsorshipResultCode> = /*#__PURE__*/ {
  0: 'REVOKE_SPONSORSHIP_SUCCESS',
  [-1]: 'REVOKE_SPONSORSHIP_DOES_NOT_EXIST',
  [-2]: 'REVOKE_SPONSORSHIP_NOT_SPONSOR',
  [-3]: 'REVOKE_SPONSORSHIP_LOW_RESERVE',
  [-4]: 'REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE',
  [-5]: 'REVOKE_SPONSORSHIP_MALFORMED',
}

export function readRevokeSponsorshipResultCode(r: XdrReader): RevokeSponsorshipResultCode {
  const v = readInt32(r)
  const result = REVOKE_SPONSORSHIP_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown RevokeSponsorshipResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeRevokeSponsorshipResultCode(w: XdrWriter, v: RevokeSponsorshipResultCode): void {
  writeInt32(w, REVOKE_SPONSORSHIP_RESULT_CODE_TO_INT[v])
}

export function encodeRevokeSponsorshipResultCode(v: RevokeSponsorshipResultCode): Uint8Array {
  return encode(v, writeRevokeSponsorshipResultCode)
}

export function decodeRevokeSponsorshipResultCode(input: Uint8Array | string): RevokeSponsorshipResultCode {
  return decode(input, readRevokeSponsorshipResultCode)
}

const _REVOKE_SPONSORSHIP_RESULT_CODE_TO_JSON: Record<RevokeSponsorshipResultCode, string> = /*#__PURE__*/ {
  REVOKE_SPONSORSHIP_SUCCESS: 'success',
  REVOKE_SPONSORSHIP_DOES_NOT_EXIST: 'does_not_exist',
  REVOKE_SPONSORSHIP_NOT_SPONSOR: 'not_sponsor',
  REVOKE_SPONSORSHIP_LOW_RESERVE: 'low_reserve',
  REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE: 'only_transferable',
  REVOKE_SPONSORSHIP_MALFORMED: 'malformed',
}

const _REVOKE_SPONSORSHIP_RESULT_CODE_FROM_JSON: Record<string, RevokeSponsorshipResultCode> = /*#__PURE__*/ {
  'success': 'REVOKE_SPONSORSHIP_SUCCESS',
  'does_not_exist': 'REVOKE_SPONSORSHIP_DOES_NOT_EXIST',
  'not_sponsor': 'REVOKE_SPONSORSHIP_NOT_SPONSOR',
  'low_reserve': 'REVOKE_SPONSORSHIP_LOW_RESERVE',
  'only_transferable': 'REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE',
  'malformed': 'REVOKE_SPONSORSHIP_MALFORMED',
}

export function toJsonRevokeSponsorshipResultCode(v: RevokeSponsorshipResultCode): string {
  return _REVOKE_SPONSORSHIP_RESULT_CODE_TO_JSON[v]
}

export function fromJsonRevokeSponsorshipResultCode(json: unknown): RevokeSponsorshipResultCode {
  const result = _REVOKE_SPONSORSHIP_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown RevokeSponsorshipResultCode JSON value: ${json}`)
  return result
}

export type RevokeSponsorshipResult =
  | { readonly code: 'REVOKE_SPONSORSHIP_SUCCESS' }
  | { readonly code: 'REVOKE_SPONSORSHIP_DOES_NOT_EXIST' }
  | { readonly code: 'REVOKE_SPONSORSHIP_NOT_SPONSOR' }
  | { readonly code: 'REVOKE_SPONSORSHIP_LOW_RESERVE' }
  | { readonly code: 'REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE' }
  | { readonly code: 'REVOKE_SPONSORSHIP_MALFORMED' }

export function readRevokeSponsorshipResult(r: XdrReader): RevokeSponsorshipResult {
  beginComposite(r)
  try {
    const code = readRevokeSponsorshipResultCode(r)
    let result: RevokeSponsorshipResult
    switch (code) {
      case 'REVOKE_SPONSORSHIP_SUCCESS':
        result = { code }; break
      case 'REVOKE_SPONSORSHIP_DOES_NOT_EXIST':
      case 'REVOKE_SPONSORSHIP_NOT_SPONSOR':
      case 'REVOKE_SPONSORSHIP_LOW_RESERVE':
      case 'REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE':
      case 'REVOKE_SPONSORSHIP_MALFORMED':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown RevokeSponsorshipResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeRevokeSponsorshipResult(w: XdrWriter, v: RevokeSponsorshipResult): void {
  writeRevokeSponsorshipResultCode(w, v.code)
  switch (v.code) {
    case 'REVOKE_SPONSORSHIP_SUCCESS':
      break
    case 'REVOKE_SPONSORSHIP_DOES_NOT_EXIST':
    case 'REVOKE_SPONSORSHIP_NOT_SPONSOR':
    case 'REVOKE_SPONSORSHIP_LOW_RESERVE':
    case 'REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE':
    case 'REVOKE_SPONSORSHIP_MALFORMED':
      break
  }
}

export function encodeRevokeSponsorshipResult(v: RevokeSponsorshipResult): Uint8Array {
  return encode(v, writeRevokeSponsorshipResult)
}

export function decodeRevokeSponsorshipResult(input: Uint8Array | string): RevokeSponsorshipResult {
  return decode(input, readRevokeSponsorshipResult)
}

export function toJsonRevokeSponsorshipResult(v: RevokeSponsorshipResult): unknown {
  switch (v.code) {
    case 'REVOKE_SPONSORSHIP_SUCCESS':
      return 'success'
    case 'REVOKE_SPONSORSHIP_DOES_NOT_EXIST':
      return 'does_not_exist'
    case 'REVOKE_SPONSORSHIP_NOT_SPONSOR':
      return 'not_sponsor'
    case 'REVOKE_SPONSORSHIP_LOW_RESERVE':
      return 'low_reserve'
    case 'REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE':
      return 'only_transferable'
    case 'REVOKE_SPONSORSHIP_MALFORMED':
      return 'malformed'
  }
}

export function fromJsonRevokeSponsorshipResult(json: unknown): RevokeSponsorshipResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'REVOKE_SPONSORSHIP_SUCCESS' } as RevokeSponsorshipResult
    if (json === 'does_not_exist') return { code: 'REVOKE_SPONSORSHIP_DOES_NOT_EXIST' } as RevokeSponsorshipResult
    if (json === 'not_sponsor') return { code: 'REVOKE_SPONSORSHIP_NOT_SPONSOR' } as RevokeSponsorshipResult
    if (json === 'low_reserve') return { code: 'REVOKE_SPONSORSHIP_LOW_RESERVE' } as RevokeSponsorshipResult
    if (json === 'only_transferable') return { code: 'REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE' } as RevokeSponsorshipResult
    if (json === 'malformed') return { code: 'REVOKE_SPONSORSHIP_MALFORMED' } as RevokeSponsorshipResult
    throw new Error(`Unknown RevokeSponsorshipResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown RevokeSponsorshipResult variant: ${key}`)
  }
}

export type ClawbackResultCode =
  | 'CLAWBACK_SUCCESS'
  | 'CLAWBACK_MALFORMED'
  | 'CLAWBACK_NOT_CLAWBACK_ENABLED'
  | 'CLAWBACK_NO_TRUST'
  | 'CLAWBACK_UNDERFUNDED'

export const CLAWBACK_RESULT_CODE_TO_INT: Record<ClawbackResultCode, number> = /*#__PURE__*/ {
  CLAWBACK_SUCCESS: 0,
  CLAWBACK_MALFORMED: -1,
  CLAWBACK_NOT_CLAWBACK_ENABLED: -2,
  CLAWBACK_NO_TRUST: -3,
  CLAWBACK_UNDERFUNDED: -4,
}

export const CLAWBACK_RESULT_CODE_FROM_INT: Record<number, ClawbackResultCode> = /*#__PURE__*/ {
  0: 'CLAWBACK_SUCCESS',
  [-1]: 'CLAWBACK_MALFORMED',
  [-2]: 'CLAWBACK_NOT_CLAWBACK_ENABLED',
  [-3]: 'CLAWBACK_NO_TRUST',
  [-4]: 'CLAWBACK_UNDERFUNDED',
}

export function readClawbackResultCode(r: XdrReader): ClawbackResultCode {
  const v = readInt32(r)
  const result = CLAWBACK_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ClawbackResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeClawbackResultCode(w: XdrWriter, v: ClawbackResultCode): void {
  writeInt32(w, CLAWBACK_RESULT_CODE_TO_INT[v])
}

export function encodeClawbackResultCode(v: ClawbackResultCode): Uint8Array {
  return encode(v, writeClawbackResultCode)
}

export function decodeClawbackResultCode(input: Uint8Array | string): ClawbackResultCode {
  return decode(input, readClawbackResultCode)
}

const _CLAWBACK_RESULT_CODE_TO_JSON: Record<ClawbackResultCode, string> = /*#__PURE__*/ {
  CLAWBACK_SUCCESS: 'success',
  CLAWBACK_MALFORMED: 'malformed',
  CLAWBACK_NOT_CLAWBACK_ENABLED: 'not_clawback_enabled',
  CLAWBACK_NO_TRUST: 'no_trust',
  CLAWBACK_UNDERFUNDED: 'underfunded',
}

const _CLAWBACK_RESULT_CODE_FROM_JSON: Record<string, ClawbackResultCode> = /*#__PURE__*/ {
  'success': 'CLAWBACK_SUCCESS',
  'malformed': 'CLAWBACK_MALFORMED',
  'not_clawback_enabled': 'CLAWBACK_NOT_CLAWBACK_ENABLED',
  'no_trust': 'CLAWBACK_NO_TRUST',
  'underfunded': 'CLAWBACK_UNDERFUNDED',
}

export function toJsonClawbackResultCode(v: ClawbackResultCode): string {
  return _CLAWBACK_RESULT_CODE_TO_JSON[v]
}

export function fromJsonClawbackResultCode(json: unknown): ClawbackResultCode {
  const result = _CLAWBACK_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ClawbackResultCode JSON value: ${json}`)
  return result
}

export type ClawbackResult =
  | { readonly code: 'CLAWBACK_SUCCESS' }
  | { readonly code: 'CLAWBACK_MALFORMED' }
  | { readonly code: 'CLAWBACK_NOT_CLAWBACK_ENABLED' }
  | { readonly code: 'CLAWBACK_NO_TRUST' }
  | { readonly code: 'CLAWBACK_UNDERFUNDED' }

export function readClawbackResult(r: XdrReader): ClawbackResult {
  beginComposite(r)
  try {
    const code = readClawbackResultCode(r)
    let result: ClawbackResult
    switch (code) {
      case 'CLAWBACK_SUCCESS':
        result = { code }; break
      case 'CLAWBACK_MALFORMED':
      case 'CLAWBACK_NOT_CLAWBACK_ENABLED':
      case 'CLAWBACK_NO_TRUST':
      case 'CLAWBACK_UNDERFUNDED':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown ClawbackResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeClawbackResult(w: XdrWriter, v: ClawbackResult): void {
  writeClawbackResultCode(w, v.code)
  switch (v.code) {
    case 'CLAWBACK_SUCCESS':
      break
    case 'CLAWBACK_MALFORMED':
    case 'CLAWBACK_NOT_CLAWBACK_ENABLED':
    case 'CLAWBACK_NO_TRUST':
    case 'CLAWBACK_UNDERFUNDED':
      break
  }
}

export function encodeClawbackResult(v: ClawbackResult): Uint8Array {
  return encode(v, writeClawbackResult)
}

export function decodeClawbackResult(input: Uint8Array | string): ClawbackResult {
  return decode(input, readClawbackResult)
}

export function toJsonClawbackResult(v: ClawbackResult): unknown {
  switch (v.code) {
    case 'CLAWBACK_SUCCESS':
      return 'success'
    case 'CLAWBACK_MALFORMED':
      return 'malformed'
    case 'CLAWBACK_NOT_CLAWBACK_ENABLED':
      return 'not_clawback_enabled'
    case 'CLAWBACK_NO_TRUST':
      return 'no_trust'
    case 'CLAWBACK_UNDERFUNDED':
      return 'underfunded'
  }
}

export function fromJsonClawbackResult(json: unknown): ClawbackResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'CLAWBACK_SUCCESS' } as ClawbackResult
    if (json === 'malformed') return { code: 'CLAWBACK_MALFORMED' } as ClawbackResult
    if (json === 'not_clawback_enabled') return { code: 'CLAWBACK_NOT_CLAWBACK_ENABLED' } as ClawbackResult
    if (json === 'no_trust') return { code: 'CLAWBACK_NO_TRUST' } as ClawbackResult
    if (json === 'underfunded') return { code: 'CLAWBACK_UNDERFUNDED' } as ClawbackResult
    throw new Error(`Unknown ClawbackResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown ClawbackResult variant: ${key}`)
  }
}

export type ClawbackClaimableBalanceResultCode =
  | 'CLAWBACK_CLAIMABLE_BALANCE_SUCCESS'
  | 'CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST'
  | 'CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER'
  | 'CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED'

export const CLAWBACK_CLAIMABLE_BALANCE_RESULT_CODE_TO_INT: Record<ClawbackClaimableBalanceResultCode, number> = /*#__PURE__*/ {
  CLAWBACK_CLAIMABLE_BALANCE_SUCCESS: 0,
  CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST: -1,
  CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER: -2,
  CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED: -3,
}

export const CLAWBACK_CLAIMABLE_BALANCE_RESULT_CODE_FROM_INT: Record<number, ClawbackClaimableBalanceResultCode> = /*#__PURE__*/ {
  0: 'CLAWBACK_CLAIMABLE_BALANCE_SUCCESS',
  [-1]: 'CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST',
  [-2]: 'CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER',
  [-3]: 'CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED',
}

export function readClawbackClaimableBalanceResultCode(r: XdrReader): ClawbackClaimableBalanceResultCode {
  const v = readInt32(r)
  const result = CLAWBACK_CLAIMABLE_BALANCE_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ClawbackClaimableBalanceResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeClawbackClaimableBalanceResultCode(w: XdrWriter, v: ClawbackClaimableBalanceResultCode): void {
  writeInt32(w, CLAWBACK_CLAIMABLE_BALANCE_RESULT_CODE_TO_INT[v])
}

export function encodeClawbackClaimableBalanceResultCode(v: ClawbackClaimableBalanceResultCode): Uint8Array {
  return encode(v, writeClawbackClaimableBalanceResultCode)
}

export function decodeClawbackClaimableBalanceResultCode(input: Uint8Array | string): ClawbackClaimableBalanceResultCode {
  return decode(input, readClawbackClaimableBalanceResultCode)
}

const _CLAWBACK_CLAIMABLE_BALANCE_RESULT_CODE_TO_JSON: Record<ClawbackClaimableBalanceResultCode, string> = /*#__PURE__*/ {
  CLAWBACK_CLAIMABLE_BALANCE_SUCCESS: 'success',
  CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST: 'does_not_exist',
  CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER: 'not_issuer',
  CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED: 'not_clawback_enabled',
}

const _CLAWBACK_CLAIMABLE_BALANCE_RESULT_CODE_FROM_JSON: Record<string, ClawbackClaimableBalanceResultCode> = /*#__PURE__*/ {
  'success': 'CLAWBACK_CLAIMABLE_BALANCE_SUCCESS',
  'does_not_exist': 'CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST',
  'not_issuer': 'CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER',
  'not_clawback_enabled': 'CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED',
}

export function toJsonClawbackClaimableBalanceResultCode(v: ClawbackClaimableBalanceResultCode): string {
  return _CLAWBACK_CLAIMABLE_BALANCE_RESULT_CODE_TO_JSON[v]
}

export function fromJsonClawbackClaimableBalanceResultCode(json: unknown): ClawbackClaimableBalanceResultCode {
  const result = _CLAWBACK_CLAIMABLE_BALANCE_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ClawbackClaimableBalanceResultCode JSON value: ${json}`)
  return result
}

export type ClawbackClaimableBalanceResult =
  | { readonly code: 'CLAWBACK_CLAIMABLE_BALANCE_SUCCESS' }
  | { readonly code: 'CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST' }
  | { readonly code: 'CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER' }
  | { readonly code: 'CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED' }

export function readClawbackClaimableBalanceResult(r: XdrReader): ClawbackClaimableBalanceResult {
  beginComposite(r)
  try {
    const code = readClawbackClaimableBalanceResultCode(r)
    let result: ClawbackClaimableBalanceResult
    switch (code) {
      case 'CLAWBACK_CLAIMABLE_BALANCE_SUCCESS':
        result = { code }; break
      case 'CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST':
      case 'CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER':
      case 'CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown ClawbackClaimableBalanceResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeClawbackClaimableBalanceResult(w: XdrWriter, v: ClawbackClaimableBalanceResult): void {
  writeClawbackClaimableBalanceResultCode(w, v.code)
  switch (v.code) {
    case 'CLAWBACK_CLAIMABLE_BALANCE_SUCCESS':
      break
    case 'CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST':
    case 'CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER':
    case 'CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED':
      break
  }
}

export function encodeClawbackClaimableBalanceResult(v: ClawbackClaimableBalanceResult): Uint8Array {
  return encode(v, writeClawbackClaimableBalanceResult)
}

export function decodeClawbackClaimableBalanceResult(input: Uint8Array | string): ClawbackClaimableBalanceResult {
  return decode(input, readClawbackClaimableBalanceResult)
}

export function toJsonClawbackClaimableBalanceResult(v: ClawbackClaimableBalanceResult): unknown {
  switch (v.code) {
    case 'CLAWBACK_CLAIMABLE_BALANCE_SUCCESS':
      return 'success'
    case 'CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST':
      return 'does_not_exist'
    case 'CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER':
      return 'not_issuer'
    case 'CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED':
      return 'not_clawback_enabled'
  }
}

export function fromJsonClawbackClaimableBalanceResult(json: unknown): ClawbackClaimableBalanceResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'CLAWBACK_CLAIMABLE_BALANCE_SUCCESS' } as ClawbackClaimableBalanceResult
    if (json === 'does_not_exist') return { code: 'CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST' } as ClawbackClaimableBalanceResult
    if (json === 'not_issuer') return { code: 'CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER' } as ClawbackClaimableBalanceResult
    if (json === 'not_clawback_enabled') return { code: 'CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED' } as ClawbackClaimableBalanceResult
    throw new Error(`Unknown ClawbackClaimableBalanceResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown ClawbackClaimableBalanceResult variant: ${key}`)
  }
}

export type SetTrustLineFlagsResultCode =
  | 'SET_TRUST_LINE_FLAGS_SUCCESS'
  | 'SET_TRUST_LINE_FLAGS_MALFORMED'
  | 'SET_TRUST_LINE_FLAGS_NO_TRUST_LINE'
  | 'SET_TRUST_LINE_FLAGS_CANT_REVOKE'
  | 'SET_TRUST_LINE_FLAGS_INVALID_STATE'
  | 'SET_TRUST_LINE_FLAGS_LOW_RESERVE'

export const SET_TRUST_LINE_FLAGS_RESULT_CODE_TO_INT: Record<SetTrustLineFlagsResultCode, number> = /*#__PURE__*/ {
  SET_TRUST_LINE_FLAGS_SUCCESS: 0,
  SET_TRUST_LINE_FLAGS_MALFORMED: -1,
  SET_TRUST_LINE_FLAGS_NO_TRUST_LINE: -2,
  SET_TRUST_LINE_FLAGS_CANT_REVOKE: -3,
  SET_TRUST_LINE_FLAGS_INVALID_STATE: -4,
  SET_TRUST_LINE_FLAGS_LOW_RESERVE: -5,
}

export const SET_TRUST_LINE_FLAGS_RESULT_CODE_FROM_INT: Record<number, SetTrustLineFlagsResultCode> = /*#__PURE__*/ {
  0: 'SET_TRUST_LINE_FLAGS_SUCCESS',
  [-1]: 'SET_TRUST_LINE_FLAGS_MALFORMED',
  [-2]: 'SET_TRUST_LINE_FLAGS_NO_TRUST_LINE',
  [-3]: 'SET_TRUST_LINE_FLAGS_CANT_REVOKE',
  [-4]: 'SET_TRUST_LINE_FLAGS_INVALID_STATE',
  [-5]: 'SET_TRUST_LINE_FLAGS_LOW_RESERVE',
}

export function readSetTrustLineFlagsResultCode(r: XdrReader): SetTrustLineFlagsResultCode {
  const v = readInt32(r)
  const result = SET_TRUST_LINE_FLAGS_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SetTrustLineFlagsResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSetTrustLineFlagsResultCode(w: XdrWriter, v: SetTrustLineFlagsResultCode): void {
  writeInt32(w, SET_TRUST_LINE_FLAGS_RESULT_CODE_TO_INT[v])
}

export function encodeSetTrustLineFlagsResultCode(v: SetTrustLineFlagsResultCode): Uint8Array {
  return encode(v, writeSetTrustLineFlagsResultCode)
}

export function decodeSetTrustLineFlagsResultCode(input: Uint8Array | string): SetTrustLineFlagsResultCode {
  return decode(input, readSetTrustLineFlagsResultCode)
}

const _SET_TRUST_LINE_FLAGS_RESULT_CODE_TO_JSON: Record<SetTrustLineFlagsResultCode, string> = /*#__PURE__*/ {
  SET_TRUST_LINE_FLAGS_SUCCESS: 'success',
  SET_TRUST_LINE_FLAGS_MALFORMED: 'malformed',
  SET_TRUST_LINE_FLAGS_NO_TRUST_LINE: 'no_trust_line',
  SET_TRUST_LINE_FLAGS_CANT_REVOKE: 'cant_revoke',
  SET_TRUST_LINE_FLAGS_INVALID_STATE: 'invalid_state',
  SET_TRUST_LINE_FLAGS_LOW_RESERVE: 'low_reserve',
}

const _SET_TRUST_LINE_FLAGS_RESULT_CODE_FROM_JSON: Record<string, SetTrustLineFlagsResultCode> = /*#__PURE__*/ {
  'success': 'SET_TRUST_LINE_FLAGS_SUCCESS',
  'malformed': 'SET_TRUST_LINE_FLAGS_MALFORMED',
  'no_trust_line': 'SET_TRUST_LINE_FLAGS_NO_TRUST_LINE',
  'cant_revoke': 'SET_TRUST_LINE_FLAGS_CANT_REVOKE',
  'invalid_state': 'SET_TRUST_LINE_FLAGS_INVALID_STATE',
  'low_reserve': 'SET_TRUST_LINE_FLAGS_LOW_RESERVE',
}

export function toJsonSetTrustLineFlagsResultCode(v: SetTrustLineFlagsResultCode): string {
  return _SET_TRUST_LINE_FLAGS_RESULT_CODE_TO_JSON[v]
}

export function fromJsonSetTrustLineFlagsResultCode(json: unknown): SetTrustLineFlagsResultCode {
  const result = _SET_TRUST_LINE_FLAGS_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SetTrustLineFlagsResultCode JSON value: ${json}`)
  return result
}

export type SetTrustLineFlagsResult =
  | { readonly code: 'SET_TRUST_LINE_FLAGS_SUCCESS' }
  | { readonly code: 'SET_TRUST_LINE_FLAGS_MALFORMED' }
  | { readonly code: 'SET_TRUST_LINE_FLAGS_NO_TRUST_LINE' }
  | { readonly code: 'SET_TRUST_LINE_FLAGS_CANT_REVOKE' }
  | { readonly code: 'SET_TRUST_LINE_FLAGS_INVALID_STATE' }
  | { readonly code: 'SET_TRUST_LINE_FLAGS_LOW_RESERVE' }

export function readSetTrustLineFlagsResult(r: XdrReader): SetTrustLineFlagsResult {
  beginComposite(r)
  try {
    const code = readSetTrustLineFlagsResultCode(r)
    let result: SetTrustLineFlagsResult
    switch (code) {
      case 'SET_TRUST_LINE_FLAGS_SUCCESS':
        result = { code }; break
      case 'SET_TRUST_LINE_FLAGS_MALFORMED':
      case 'SET_TRUST_LINE_FLAGS_NO_TRUST_LINE':
      case 'SET_TRUST_LINE_FLAGS_CANT_REVOKE':
      case 'SET_TRUST_LINE_FLAGS_INVALID_STATE':
      case 'SET_TRUST_LINE_FLAGS_LOW_RESERVE':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown SetTrustLineFlagsResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSetTrustLineFlagsResult(w: XdrWriter, v: SetTrustLineFlagsResult): void {
  writeSetTrustLineFlagsResultCode(w, v.code)
  switch (v.code) {
    case 'SET_TRUST_LINE_FLAGS_SUCCESS':
      break
    case 'SET_TRUST_LINE_FLAGS_MALFORMED':
    case 'SET_TRUST_LINE_FLAGS_NO_TRUST_LINE':
    case 'SET_TRUST_LINE_FLAGS_CANT_REVOKE':
    case 'SET_TRUST_LINE_FLAGS_INVALID_STATE':
    case 'SET_TRUST_LINE_FLAGS_LOW_RESERVE':
      break
  }
}

export function encodeSetTrustLineFlagsResult(v: SetTrustLineFlagsResult): Uint8Array {
  return encode(v, writeSetTrustLineFlagsResult)
}

export function decodeSetTrustLineFlagsResult(input: Uint8Array | string): SetTrustLineFlagsResult {
  return decode(input, readSetTrustLineFlagsResult)
}

export function toJsonSetTrustLineFlagsResult(v: SetTrustLineFlagsResult): unknown {
  switch (v.code) {
    case 'SET_TRUST_LINE_FLAGS_SUCCESS':
      return 'success'
    case 'SET_TRUST_LINE_FLAGS_MALFORMED':
      return 'malformed'
    case 'SET_TRUST_LINE_FLAGS_NO_TRUST_LINE':
      return 'no_trust_line'
    case 'SET_TRUST_LINE_FLAGS_CANT_REVOKE':
      return 'cant_revoke'
    case 'SET_TRUST_LINE_FLAGS_INVALID_STATE':
      return 'invalid_state'
    case 'SET_TRUST_LINE_FLAGS_LOW_RESERVE':
      return 'low_reserve'
  }
}

export function fromJsonSetTrustLineFlagsResult(json: unknown): SetTrustLineFlagsResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'SET_TRUST_LINE_FLAGS_SUCCESS' } as SetTrustLineFlagsResult
    if (json === 'malformed') return { code: 'SET_TRUST_LINE_FLAGS_MALFORMED' } as SetTrustLineFlagsResult
    if (json === 'no_trust_line') return { code: 'SET_TRUST_LINE_FLAGS_NO_TRUST_LINE' } as SetTrustLineFlagsResult
    if (json === 'cant_revoke') return { code: 'SET_TRUST_LINE_FLAGS_CANT_REVOKE' } as SetTrustLineFlagsResult
    if (json === 'invalid_state') return { code: 'SET_TRUST_LINE_FLAGS_INVALID_STATE' } as SetTrustLineFlagsResult
    if (json === 'low_reserve') return { code: 'SET_TRUST_LINE_FLAGS_LOW_RESERVE' } as SetTrustLineFlagsResult
    throw new Error(`Unknown SetTrustLineFlagsResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown SetTrustLineFlagsResult variant: ${key}`)
  }
}

export type LiquidityPoolDepositResultCode =
  | 'LIQUIDITY_POOL_DEPOSIT_SUCCESS'
  | 'LIQUIDITY_POOL_DEPOSIT_MALFORMED'
  | 'LIQUIDITY_POOL_DEPOSIT_NO_TRUST'
  | 'LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED'
  | 'LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED'
  | 'LIQUIDITY_POOL_DEPOSIT_LINE_FULL'
  | 'LIQUIDITY_POOL_DEPOSIT_BAD_PRICE'
  | 'LIQUIDITY_POOL_DEPOSIT_POOL_FULL'

export const LIQUIDITY_POOL_DEPOSIT_RESULT_CODE_TO_INT: Record<LiquidityPoolDepositResultCode, number> = /*#__PURE__*/ {
  LIQUIDITY_POOL_DEPOSIT_SUCCESS: 0,
  LIQUIDITY_POOL_DEPOSIT_MALFORMED: -1,
  LIQUIDITY_POOL_DEPOSIT_NO_TRUST: -2,
  LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED: -3,
  LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED: -4,
  LIQUIDITY_POOL_DEPOSIT_LINE_FULL: -5,
  LIQUIDITY_POOL_DEPOSIT_BAD_PRICE: -6,
  LIQUIDITY_POOL_DEPOSIT_POOL_FULL: -7,
}

export const LIQUIDITY_POOL_DEPOSIT_RESULT_CODE_FROM_INT: Record<number, LiquidityPoolDepositResultCode> = /*#__PURE__*/ {
  0: 'LIQUIDITY_POOL_DEPOSIT_SUCCESS',
  [-1]: 'LIQUIDITY_POOL_DEPOSIT_MALFORMED',
  [-2]: 'LIQUIDITY_POOL_DEPOSIT_NO_TRUST',
  [-3]: 'LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED',
  [-4]: 'LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED',
  [-5]: 'LIQUIDITY_POOL_DEPOSIT_LINE_FULL',
  [-6]: 'LIQUIDITY_POOL_DEPOSIT_BAD_PRICE',
  [-7]: 'LIQUIDITY_POOL_DEPOSIT_POOL_FULL',
}

export function readLiquidityPoolDepositResultCode(r: XdrReader): LiquidityPoolDepositResultCode {
  const v = readInt32(r)
  const result = LIQUIDITY_POOL_DEPOSIT_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown LiquidityPoolDepositResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeLiquidityPoolDepositResultCode(w: XdrWriter, v: LiquidityPoolDepositResultCode): void {
  writeInt32(w, LIQUIDITY_POOL_DEPOSIT_RESULT_CODE_TO_INT[v])
}

export function encodeLiquidityPoolDepositResultCode(v: LiquidityPoolDepositResultCode): Uint8Array {
  return encode(v, writeLiquidityPoolDepositResultCode)
}

export function decodeLiquidityPoolDepositResultCode(input: Uint8Array | string): LiquidityPoolDepositResultCode {
  return decode(input, readLiquidityPoolDepositResultCode)
}

const _LIQUIDITY_POOL_DEPOSIT_RESULT_CODE_TO_JSON: Record<LiquidityPoolDepositResultCode, string> = /*#__PURE__*/ {
  LIQUIDITY_POOL_DEPOSIT_SUCCESS: 'success',
  LIQUIDITY_POOL_DEPOSIT_MALFORMED: 'malformed',
  LIQUIDITY_POOL_DEPOSIT_NO_TRUST: 'no_trust',
  LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED: 'not_authorized',
  LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED: 'underfunded',
  LIQUIDITY_POOL_DEPOSIT_LINE_FULL: 'line_full',
  LIQUIDITY_POOL_DEPOSIT_BAD_PRICE: 'bad_price',
  LIQUIDITY_POOL_DEPOSIT_POOL_FULL: 'pool_full',
}

const _LIQUIDITY_POOL_DEPOSIT_RESULT_CODE_FROM_JSON: Record<string, LiquidityPoolDepositResultCode> = /*#__PURE__*/ {
  'success': 'LIQUIDITY_POOL_DEPOSIT_SUCCESS',
  'malformed': 'LIQUIDITY_POOL_DEPOSIT_MALFORMED',
  'no_trust': 'LIQUIDITY_POOL_DEPOSIT_NO_TRUST',
  'not_authorized': 'LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED',
  'underfunded': 'LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED',
  'line_full': 'LIQUIDITY_POOL_DEPOSIT_LINE_FULL',
  'bad_price': 'LIQUIDITY_POOL_DEPOSIT_BAD_PRICE',
  'pool_full': 'LIQUIDITY_POOL_DEPOSIT_POOL_FULL',
}

export function toJsonLiquidityPoolDepositResultCode(v: LiquidityPoolDepositResultCode): string {
  return _LIQUIDITY_POOL_DEPOSIT_RESULT_CODE_TO_JSON[v]
}

export function fromJsonLiquidityPoolDepositResultCode(json: unknown): LiquidityPoolDepositResultCode {
  const result = _LIQUIDITY_POOL_DEPOSIT_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown LiquidityPoolDepositResultCode JSON value: ${json}`)
  return result
}

export type LiquidityPoolDepositResult =
  | { readonly code: 'LIQUIDITY_POOL_DEPOSIT_SUCCESS' }
  | { readonly code: 'LIQUIDITY_POOL_DEPOSIT_MALFORMED' }
  | { readonly code: 'LIQUIDITY_POOL_DEPOSIT_NO_TRUST' }
  | { readonly code: 'LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED' }
  | { readonly code: 'LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED' }
  | { readonly code: 'LIQUIDITY_POOL_DEPOSIT_LINE_FULL' }
  | { readonly code: 'LIQUIDITY_POOL_DEPOSIT_BAD_PRICE' }
  | { readonly code: 'LIQUIDITY_POOL_DEPOSIT_POOL_FULL' }

export function readLiquidityPoolDepositResult(r: XdrReader): LiquidityPoolDepositResult {
  beginComposite(r)
  try {
    const code = readLiquidityPoolDepositResultCode(r)
    let result: LiquidityPoolDepositResult
    switch (code) {
      case 'LIQUIDITY_POOL_DEPOSIT_SUCCESS':
        result = { code }; break
      case 'LIQUIDITY_POOL_DEPOSIT_MALFORMED':
      case 'LIQUIDITY_POOL_DEPOSIT_NO_TRUST':
      case 'LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED':
      case 'LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED':
      case 'LIQUIDITY_POOL_DEPOSIT_LINE_FULL':
      case 'LIQUIDITY_POOL_DEPOSIT_BAD_PRICE':
      case 'LIQUIDITY_POOL_DEPOSIT_POOL_FULL':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown LiquidityPoolDepositResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLiquidityPoolDepositResult(w: XdrWriter, v: LiquidityPoolDepositResult): void {
  writeLiquidityPoolDepositResultCode(w, v.code)
  switch (v.code) {
    case 'LIQUIDITY_POOL_DEPOSIT_SUCCESS':
      break
    case 'LIQUIDITY_POOL_DEPOSIT_MALFORMED':
    case 'LIQUIDITY_POOL_DEPOSIT_NO_TRUST':
    case 'LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED':
    case 'LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED':
    case 'LIQUIDITY_POOL_DEPOSIT_LINE_FULL':
    case 'LIQUIDITY_POOL_DEPOSIT_BAD_PRICE':
    case 'LIQUIDITY_POOL_DEPOSIT_POOL_FULL':
      break
  }
}

export function encodeLiquidityPoolDepositResult(v: LiquidityPoolDepositResult): Uint8Array {
  return encode(v, writeLiquidityPoolDepositResult)
}

export function decodeLiquidityPoolDepositResult(input: Uint8Array | string): LiquidityPoolDepositResult {
  return decode(input, readLiquidityPoolDepositResult)
}

export function toJsonLiquidityPoolDepositResult(v: LiquidityPoolDepositResult): unknown {
  switch (v.code) {
    case 'LIQUIDITY_POOL_DEPOSIT_SUCCESS':
      return 'success'
    case 'LIQUIDITY_POOL_DEPOSIT_MALFORMED':
      return 'malformed'
    case 'LIQUIDITY_POOL_DEPOSIT_NO_TRUST':
      return 'no_trust'
    case 'LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED':
      return 'not_authorized'
    case 'LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED':
      return 'underfunded'
    case 'LIQUIDITY_POOL_DEPOSIT_LINE_FULL':
      return 'line_full'
    case 'LIQUIDITY_POOL_DEPOSIT_BAD_PRICE':
      return 'bad_price'
    case 'LIQUIDITY_POOL_DEPOSIT_POOL_FULL':
      return 'pool_full'
  }
}

export function fromJsonLiquidityPoolDepositResult(json: unknown): LiquidityPoolDepositResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'LIQUIDITY_POOL_DEPOSIT_SUCCESS' } as LiquidityPoolDepositResult
    if (json === 'malformed') return { code: 'LIQUIDITY_POOL_DEPOSIT_MALFORMED' } as LiquidityPoolDepositResult
    if (json === 'no_trust') return { code: 'LIQUIDITY_POOL_DEPOSIT_NO_TRUST' } as LiquidityPoolDepositResult
    if (json === 'not_authorized') return { code: 'LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED' } as LiquidityPoolDepositResult
    if (json === 'underfunded') return { code: 'LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED' } as LiquidityPoolDepositResult
    if (json === 'line_full') return { code: 'LIQUIDITY_POOL_DEPOSIT_LINE_FULL' } as LiquidityPoolDepositResult
    if (json === 'bad_price') return { code: 'LIQUIDITY_POOL_DEPOSIT_BAD_PRICE' } as LiquidityPoolDepositResult
    if (json === 'pool_full') return { code: 'LIQUIDITY_POOL_DEPOSIT_POOL_FULL' } as LiquidityPoolDepositResult
    throw new Error(`Unknown LiquidityPoolDepositResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown LiquidityPoolDepositResult variant: ${key}`)
  }
}

export type LiquidityPoolWithdrawResultCode =
  | 'LIQUIDITY_POOL_WITHDRAW_SUCCESS'
  | 'LIQUIDITY_POOL_WITHDRAW_MALFORMED'
  | 'LIQUIDITY_POOL_WITHDRAW_NO_TRUST'
  | 'LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED'
  | 'LIQUIDITY_POOL_WITHDRAW_LINE_FULL'
  | 'LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM'

export const LIQUIDITY_POOL_WITHDRAW_RESULT_CODE_TO_INT: Record<LiquidityPoolWithdrawResultCode, number> = /*#__PURE__*/ {
  LIQUIDITY_POOL_WITHDRAW_SUCCESS: 0,
  LIQUIDITY_POOL_WITHDRAW_MALFORMED: -1,
  LIQUIDITY_POOL_WITHDRAW_NO_TRUST: -2,
  LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED: -3,
  LIQUIDITY_POOL_WITHDRAW_LINE_FULL: -4,
  LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM: -5,
}

export const LIQUIDITY_POOL_WITHDRAW_RESULT_CODE_FROM_INT: Record<number, LiquidityPoolWithdrawResultCode> = /*#__PURE__*/ {
  0: 'LIQUIDITY_POOL_WITHDRAW_SUCCESS',
  [-1]: 'LIQUIDITY_POOL_WITHDRAW_MALFORMED',
  [-2]: 'LIQUIDITY_POOL_WITHDRAW_NO_TRUST',
  [-3]: 'LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED',
  [-4]: 'LIQUIDITY_POOL_WITHDRAW_LINE_FULL',
  [-5]: 'LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM',
}

export function readLiquidityPoolWithdrawResultCode(r: XdrReader): LiquidityPoolWithdrawResultCode {
  const v = readInt32(r)
  const result = LIQUIDITY_POOL_WITHDRAW_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown LiquidityPoolWithdrawResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeLiquidityPoolWithdrawResultCode(w: XdrWriter, v: LiquidityPoolWithdrawResultCode): void {
  writeInt32(w, LIQUIDITY_POOL_WITHDRAW_RESULT_CODE_TO_INT[v])
}

export function encodeLiquidityPoolWithdrawResultCode(v: LiquidityPoolWithdrawResultCode): Uint8Array {
  return encode(v, writeLiquidityPoolWithdrawResultCode)
}

export function decodeLiquidityPoolWithdrawResultCode(input: Uint8Array | string): LiquidityPoolWithdrawResultCode {
  return decode(input, readLiquidityPoolWithdrawResultCode)
}

const _LIQUIDITY_POOL_WITHDRAW_RESULT_CODE_TO_JSON: Record<LiquidityPoolWithdrawResultCode, string> = /*#__PURE__*/ {
  LIQUIDITY_POOL_WITHDRAW_SUCCESS: 'success',
  LIQUIDITY_POOL_WITHDRAW_MALFORMED: 'malformed',
  LIQUIDITY_POOL_WITHDRAW_NO_TRUST: 'no_trust',
  LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED: 'underfunded',
  LIQUIDITY_POOL_WITHDRAW_LINE_FULL: 'line_full',
  LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM: 'under_minimum',
}

const _LIQUIDITY_POOL_WITHDRAW_RESULT_CODE_FROM_JSON: Record<string, LiquidityPoolWithdrawResultCode> = /*#__PURE__*/ {
  'success': 'LIQUIDITY_POOL_WITHDRAW_SUCCESS',
  'malformed': 'LIQUIDITY_POOL_WITHDRAW_MALFORMED',
  'no_trust': 'LIQUIDITY_POOL_WITHDRAW_NO_TRUST',
  'underfunded': 'LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED',
  'line_full': 'LIQUIDITY_POOL_WITHDRAW_LINE_FULL',
  'under_minimum': 'LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM',
}

export function toJsonLiquidityPoolWithdrawResultCode(v: LiquidityPoolWithdrawResultCode): string {
  return _LIQUIDITY_POOL_WITHDRAW_RESULT_CODE_TO_JSON[v]
}

export function fromJsonLiquidityPoolWithdrawResultCode(json: unknown): LiquidityPoolWithdrawResultCode {
  const result = _LIQUIDITY_POOL_WITHDRAW_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown LiquidityPoolWithdrawResultCode JSON value: ${json}`)
  return result
}

export type LiquidityPoolWithdrawResult =
  | { readonly code: 'LIQUIDITY_POOL_WITHDRAW_SUCCESS' }
  | { readonly code: 'LIQUIDITY_POOL_WITHDRAW_MALFORMED' }
  | { readonly code: 'LIQUIDITY_POOL_WITHDRAW_NO_TRUST' }
  | { readonly code: 'LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED' }
  | { readonly code: 'LIQUIDITY_POOL_WITHDRAW_LINE_FULL' }
  | { readonly code: 'LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM' }

export function readLiquidityPoolWithdrawResult(r: XdrReader): LiquidityPoolWithdrawResult {
  beginComposite(r)
  try {
    const code = readLiquidityPoolWithdrawResultCode(r)
    let result: LiquidityPoolWithdrawResult
    switch (code) {
      case 'LIQUIDITY_POOL_WITHDRAW_SUCCESS':
        result = { code }; break
      case 'LIQUIDITY_POOL_WITHDRAW_MALFORMED':
      case 'LIQUIDITY_POOL_WITHDRAW_NO_TRUST':
      case 'LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED':
      case 'LIQUIDITY_POOL_WITHDRAW_LINE_FULL':
      case 'LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown LiquidityPoolWithdrawResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeLiquidityPoolWithdrawResult(w: XdrWriter, v: LiquidityPoolWithdrawResult): void {
  writeLiquidityPoolWithdrawResultCode(w, v.code)
  switch (v.code) {
    case 'LIQUIDITY_POOL_WITHDRAW_SUCCESS':
      break
    case 'LIQUIDITY_POOL_WITHDRAW_MALFORMED':
    case 'LIQUIDITY_POOL_WITHDRAW_NO_TRUST':
    case 'LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED':
    case 'LIQUIDITY_POOL_WITHDRAW_LINE_FULL':
    case 'LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM':
      break
  }
}

export function encodeLiquidityPoolWithdrawResult(v: LiquidityPoolWithdrawResult): Uint8Array {
  return encode(v, writeLiquidityPoolWithdrawResult)
}

export function decodeLiquidityPoolWithdrawResult(input: Uint8Array | string): LiquidityPoolWithdrawResult {
  return decode(input, readLiquidityPoolWithdrawResult)
}

export function toJsonLiquidityPoolWithdrawResult(v: LiquidityPoolWithdrawResult): unknown {
  switch (v.code) {
    case 'LIQUIDITY_POOL_WITHDRAW_SUCCESS':
      return 'success'
    case 'LIQUIDITY_POOL_WITHDRAW_MALFORMED':
      return 'malformed'
    case 'LIQUIDITY_POOL_WITHDRAW_NO_TRUST':
      return 'no_trust'
    case 'LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED':
      return 'underfunded'
    case 'LIQUIDITY_POOL_WITHDRAW_LINE_FULL':
      return 'line_full'
    case 'LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM':
      return 'under_minimum'
  }
}

export function fromJsonLiquidityPoolWithdrawResult(json: unknown): LiquidityPoolWithdrawResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'LIQUIDITY_POOL_WITHDRAW_SUCCESS' } as LiquidityPoolWithdrawResult
    if (json === 'malformed') return { code: 'LIQUIDITY_POOL_WITHDRAW_MALFORMED' } as LiquidityPoolWithdrawResult
    if (json === 'no_trust') return { code: 'LIQUIDITY_POOL_WITHDRAW_NO_TRUST' } as LiquidityPoolWithdrawResult
    if (json === 'underfunded') return { code: 'LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED' } as LiquidityPoolWithdrawResult
    if (json === 'line_full') return { code: 'LIQUIDITY_POOL_WITHDRAW_LINE_FULL' } as LiquidityPoolWithdrawResult
    if (json === 'under_minimum') return { code: 'LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM' } as LiquidityPoolWithdrawResult
    throw new Error(`Unknown LiquidityPoolWithdrawResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown LiquidityPoolWithdrawResult variant: ${key}`)
  }
}

export type InvokeHostFunctionResultCode =
  | 'INVOKE_HOST_FUNCTION_SUCCESS'
  | 'INVOKE_HOST_FUNCTION_MALFORMED'
  | 'INVOKE_HOST_FUNCTION_TRAPPED'
  | 'INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED'
  | 'INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED'
  | 'INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE'

export const INVOKE_HOST_FUNCTION_RESULT_CODE_TO_INT: Record<InvokeHostFunctionResultCode, number> = /*#__PURE__*/ {
  INVOKE_HOST_FUNCTION_SUCCESS: 0,
  INVOKE_HOST_FUNCTION_MALFORMED: -1,
  INVOKE_HOST_FUNCTION_TRAPPED: -2,
  INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED: -3,
  INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED: -4,
  INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE: -5,
}

export const INVOKE_HOST_FUNCTION_RESULT_CODE_FROM_INT: Record<number, InvokeHostFunctionResultCode> = /*#__PURE__*/ {
  0: 'INVOKE_HOST_FUNCTION_SUCCESS',
  [-1]: 'INVOKE_HOST_FUNCTION_MALFORMED',
  [-2]: 'INVOKE_HOST_FUNCTION_TRAPPED',
  [-3]: 'INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED',
  [-4]: 'INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED',
  [-5]: 'INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE',
}

export function readInvokeHostFunctionResultCode(r: XdrReader): InvokeHostFunctionResultCode {
  const v = readInt32(r)
  const result = INVOKE_HOST_FUNCTION_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown InvokeHostFunctionResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeInvokeHostFunctionResultCode(w: XdrWriter, v: InvokeHostFunctionResultCode): void {
  writeInt32(w, INVOKE_HOST_FUNCTION_RESULT_CODE_TO_INT[v])
}

export function encodeInvokeHostFunctionResultCode(v: InvokeHostFunctionResultCode): Uint8Array {
  return encode(v, writeInvokeHostFunctionResultCode)
}

export function decodeInvokeHostFunctionResultCode(input: Uint8Array | string): InvokeHostFunctionResultCode {
  return decode(input, readInvokeHostFunctionResultCode)
}

const _INVOKE_HOST_FUNCTION_RESULT_CODE_TO_JSON: Record<InvokeHostFunctionResultCode, string> = /*#__PURE__*/ {
  INVOKE_HOST_FUNCTION_SUCCESS: 'success',
  INVOKE_HOST_FUNCTION_MALFORMED: 'malformed',
  INVOKE_HOST_FUNCTION_TRAPPED: 'trapped',
  INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED: 'resource_limit_exceeded',
  INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED: 'entry_archived',
  INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE: 'insufficient_refundable_fee',
}

const _INVOKE_HOST_FUNCTION_RESULT_CODE_FROM_JSON: Record<string, InvokeHostFunctionResultCode> = /*#__PURE__*/ {
  'success': 'INVOKE_HOST_FUNCTION_SUCCESS',
  'malformed': 'INVOKE_HOST_FUNCTION_MALFORMED',
  'trapped': 'INVOKE_HOST_FUNCTION_TRAPPED',
  'resource_limit_exceeded': 'INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED',
  'entry_archived': 'INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED',
  'insufficient_refundable_fee': 'INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE',
}

export function toJsonInvokeHostFunctionResultCode(v: InvokeHostFunctionResultCode): string {
  return _INVOKE_HOST_FUNCTION_RESULT_CODE_TO_JSON[v]
}

export function fromJsonInvokeHostFunctionResultCode(json: unknown): InvokeHostFunctionResultCode {
  const result = _INVOKE_HOST_FUNCTION_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown InvokeHostFunctionResultCode JSON value: ${json}`)
  return result
}

export type InvokeHostFunctionResult =
  | { readonly code: 'INVOKE_HOST_FUNCTION_SUCCESS'; readonly success: Hash }
  | { readonly code: 'INVOKE_HOST_FUNCTION_MALFORMED' }
  | { readonly code: 'INVOKE_HOST_FUNCTION_TRAPPED' }
  | { readonly code: 'INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED' }
  | { readonly code: 'INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED' }
  | { readonly code: 'INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE' }

export function readInvokeHostFunctionResult(r: XdrReader): InvokeHostFunctionResult {
  beginComposite(r)
  try {
    const code = readInvokeHostFunctionResultCode(r)
    let result: InvokeHostFunctionResult
    switch (code) {
      case 'INVOKE_HOST_FUNCTION_SUCCESS':
        result = { code, success: readHash(r) }; break
      case 'INVOKE_HOST_FUNCTION_MALFORMED':
      case 'INVOKE_HOST_FUNCTION_TRAPPED':
      case 'INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED':
      case 'INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED':
      case 'INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown InvokeHostFunctionResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeInvokeHostFunctionResult(w: XdrWriter, v: InvokeHostFunctionResult): void {
  writeInvokeHostFunctionResultCode(w, v.code)
  switch (v.code) {
    case 'INVOKE_HOST_FUNCTION_SUCCESS':
      writeHash(w, (v as any).success); break
    case 'INVOKE_HOST_FUNCTION_MALFORMED':
    case 'INVOKE_HOST_FUNCTION_TRAPPED':
    case 'INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED':
    case 'INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED':
    case 'INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE':
      break
  }
}

export function encodeInvokeHostFunctionResult(v: InvokeHostFunctionResult): Uint8Array {
  return encode(v, writeInvokeHostFunctionResult)
}

export function decodeInvokeHostFunctionResult(input: Uint8Array | string): InvokeHostFunctionResult {
  return decode(input, readInvokeHostFunctionResult)
}

export function toJsonInvokeHostFunctionResult(v: InvokeHostFunctionResult): unknown {
  switch (v.code) {
    case 'INVOKE_HOST_FUNCTION_SUCCESS':
      return { 'success': toJsonHash((v as any).success) }
    case 'INVOKE_HOST_FUNCTION_MALFORMED':
      return 'malformed'
    case 'INVOKE_HOST_FUNCTION_TRAPPED':
      return 'trapped'
    case 'INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED':
      return 'resource_limit_exceeded'
    case 'INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED':
      return 'entry_archived'
    case 'INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE':
      return 'insufficient_refundable_fee'
  }
}

export function fromJsonInvokeHostFunctionResult(json: unknown): InvokeHostFunctionResult {
  if (typeof json === 'string') {
    if (json === 'malformed') return { code: 'INVOKE_HOST_FUNCTION_MALFORMED' } as InvokeHostFunctionResult
    if (json === 'trapped') return { code: 'INVOKE_HOST_FUNCTION_TRAPPED' } as InvokeHostFunctionResult
    if (json === 'resource_limit_exceeded') return { code: 'INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED' } as InvokeHostFunctionResult
    if (json === 'entry_archived') return { code: 'INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED' } as InvokeHostFunctionResult
    if (json === 'insufficient_refundable_fee') return { code: 'INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE' } as InvokeHostFunctionResult
    throw new Error(`Unknown InvokeHostFunctionResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'success':
      return { code: 'INVOKE_HOST_FUNCTION_SUCCESS', success: fromJsonHash(obj[key]) } as InvokeHostFunctionResult
    default: throw new Error(`Unknown InvokeHostFunctionResult variant: ${key}`)
  }
}

export type ExtendFootprintTTLResultCode =
  | 'EXTEND_FOOTPRINT_TTL_SUCCESS'
  | 'EXTEND_FOOTPRINT_TTL_MALFORMED'
  | 'EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED'
  | 'EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE'

export const EXTEND_FOOTPRINT_T_T_L_RESULT_CODE_TO_INT: Record<ExtendFootprintTTLResultCode, number> = /*#__PURE__*/ {
  EXTEND_FOOTPRINT_TTL_SUCCESS: 0,
  EXTEND_FOOTPRINT_TTL_MALFORMED: -1,
  EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED: -2,
  EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE: -3,
}

export const EXTEND_FOOTPRINT_T_T_L_RESULT_CODE_FROM_INT: Record<number, ExtendFootprintTTLResultCode> = /*#__PURE__*/ {
  0: 'EXTEND_FOOTPRINT_TTL_SUCCESS',
  [-1]: 'EXTEND_FOOTPRINT_TTL_MALFORMED',
  [-2]: 'EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED',
  [-3]: 'EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE',
}

export function readExtendFootprintTTLResultCode(r: XdrReader): ExtendFootprintTTLResultCode {
  const v = readInt32(r)
  const result = EXTEND_FOOTPRINT_T_T_L_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown ExtendFootprintTTLResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeExtendFootprintTTLResultCode(w: XdrWriter, v: ExtendFootprintTTLResultCode): void {
  writeInt32(w, EXTEND_FOOTPRINT_T_T_L_RESULT_CODE_TO_INT[v])
}

export function encodeExtendFootprintTTLResultCode(v: ExtendFootprintTTLResultCode): Uint8Array {
  return encode(v, writeExtendFootprintTTLResultCode)
}

export function decodeExtendFootprintTTLResultCode(input: Uint8Array | string): ExtendFootprintTTLResultCode {
  return decode(input, readExtendFootprintTTLResultCode)
}

const _EXTEND_FOOTPRINT_T_T_L_RESULT_CODE_TO_JSON: Record<ExtendFootprintTTLResultCode, string> = /*#__PURE__*/ {
  EXTEND_FOOTPRINT_TTL_SUCCESS: 'success',
  EXTEND_FOOTPRINT_TTL_MALFORMED: 'malformed',
  EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED: 'resource_limit_exceeded',
  EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE: 'insufficient_refundable_fee',
}

const _EXTEND_FOOTPRINT_T_T_L_RESULT_CODE_FROM_JSON: Record<string, ExtendFootprintTTLResultCode> = /*#__PURE__*/ {
  'success': 'EXTEND_FOOTPRINT_TTL_SUCCESS',
  'malformed': 'EXTEND_FOOTPRINT_TTL_MALFORMED',
  'resource_limit_exceeded': 'EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED',
  'insufficient_refundable_fee': 'EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE',
}

export function toJsonExtendFootprintTTLResultCode(v: ExtendFootprintTTLResultCode): string {
  return _EXTEND_FOOTPRINT_T_T_L_RESULT_CODE_TO_JSON[v]
}

export function fromJsonExtendFootprintTTLResultCode(json: unknown): ExtendFootprintTTLResultCode {
  const result = _EXTEND_FOOTPRINT_T_T_L_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown ExtendFootprintTTLResultCode JSON value: ${json}`)
  return result
}

export type ExtendFootprintTTLResult =
  | { readonly code: 'EXTEND_FOOTPRINT_TTL_SUCCESS' }
  | { readonly code: 'EXTEND_FOOTPRINT_TTL_MALFORMED' }
  | { readonly code: 'EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED' }
  | { readonly code: 'EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE' }

export function readExtendFootprintTTLResult(r: XdrReader): ExtendFootprintTTLResult {
  beginComposite(r)
  try {
    const code = readExtendFootprintTTLResultCode(r)
    let result: ExtendFootprintTTLResult
    switch (code) {
      case 'EXTEND_FOOTPRINT_TTL_SUCCESS':
        result = { code }; break
      case 'EXTEND_FOOTPRINT_TTL_MALFORMED':
      case 'EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED':
      case 'EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown ExtendFootprintTTLResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeExtendFootprintTTLResult(w: XdrWriter, v: ExtendFootprintTTLResult): void {
  writeExtendFootprintTTLResultCode(w, v.code)
  switch (v.code) {
    case 'EXTEND_FOOTPRINT_TTL_SUCCESS':
      break
    case 'EXTEND_FOOTPRINT_TTL_MALFORMED':
    case 'EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED':
    case 'EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE':
      break
  }
}

export function encodeExtendFootprintTTLResult(v: ExtendFootprintTTLResult): Uint8Array {
  return encode(v, writeExtendFootprintTTLResult)
}

export function decodeExtendFootprintTTLResult(input: Uint8Array | string): ExtendFootprintTTLResult {
  return decode(input, readExtendFootprintTTLResult)
}

export function toJsonExtendFootprintTTLResult(v: ExtendFootprintTTLResult): unknown {
  switch (v.code) {
    case 'EXTEND_FOOTPRINT_TTL_SUCCESS':
      return 'success'
    case 'EXTEND_FOOTPRINT_TTL_MALFORMED':
      return 'malformed'
    case 'EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED':
      return 'resource_limit_exceeded'
    case 'EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE':
      return 'insufficient_refundable_fee'
  }
}

export function fromJsonExtendFootprintTTLResult(json: unknown): ExtendFootprintTTLResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'EXTEND_FOOTPRINT_TTL_SUCCESS' } as ExtendFootprintTTLResult
    if (json === 'malformed') return { code: 'EXTEND_FOOTPRINT_TTL_MALFORMED' } as ExtendFootprintTTLResult
    if (json === 'resource_limit_exceeded') return { code: 'EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED' } as ExtendFootprintTTLResult
    if (json === 'insufficient_refundable_fee') return { code: 'EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE' } as ExtendFootprintTTLResult
    throw new Error(`Unknown ExtendFootprintTTLResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown ExtendFootprintTTLResult variant: ${key}`)
  }
}

export type RestoreFootprintResultCode =
  | 'RESTORE_FOOTPRINT_SUCCESS'
  | 'RESTORE_FOOTPRINT_MALFORMED'
  | 'RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED'
  | 'RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE'

export const RESTORE_FOOTPRINT_RESULT_CODE_TO_INT: Record<RestoreFootprintResultCode, number> = /*#__PURE__*/ {
  RESTORE_FOOTPRINT_SUCCESS: 0,
  RESTORE_FOOTPRINT_MALFORMED: -1,
  RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED: -2,
  RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE: -3,
}

export const RESTORE_FOOTPRINT_RESULT_CODE_FROM_INT: Record<number, RestoreFootprintResultCode> = /*#__PURE__*/ {
  0: 'RESTORE_FOOTPRINT_SUCCESS',
  [-1]: 'RESTORE_FOOTPRINT_MALFORMED',
  [-2]: 'RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED',
  [-3]: 'RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE',
}

export function readRestoreFootprintResultCode(r: XdrReader): RestoreFootprintResultCode {
  const v = readInt32(r)
  const result = RESTORE_FOOTPRINT_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown RestoreFootprintResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeRestoreFootprintResultCode(w: XdrWriter, v: RestoreFootprintResultCode): void {
  writeInt32(w, RESTORE_FOOTPRINT_RESULT_CODE_TO_INT[v])
}

export function encodeRestoreFootprintResultCode(v: RestoreFootprintResultCode): Uint8Array {
  return encode(v, writeRestoreFootprintResultCode)
}

export function decodeRestoreFootprintResultCode(input: Uint8Array | string): RestoreFootprintResultCode {
  return decode(input, readRestoreFootprintResultCode)
}

const _RESTORE_FOOTPRINT_RESULT_CODE_TO_JSON: Record<RestoreFootprintResultCode, string> = /*#__PURE__*/ {
  RESTORE_FOOTPRINT_SUCCESS: 'success',
  RESTORE_FOOTPRINT_MALFORMED: 'malformed',
  RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED: 'resource_limit_exceeded',
  RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE: 'insufficient_refundable_fee',
}

const _RESTORE_FOOTPRINT_RESULT_CODE_FROM_JSON: Record<string, RestoreFootprintResultCode> = /*#__PURE__*/ {
  'success': 'RESTORE_FOOTPRINT_SUCCESS',
  'malformed': 'RESTORE_FOOTPRINT_MALFORMED',
  'resource_limit_exceeded': 'RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED',
  'insufficient_refundable_fee': 'RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE',
}

export function toJsonRestoreFootprintResultCode(v: RestoreFootprintResultCode): string {
  return _RESTORE_FOOTPRINT_RESULT_CODE_TO_JSON[v]
}

export function fromJsonRestoreFootprintResultCode(json: unknown): RestoreFootprintResultCode {
  const result = _RESTORE_FOOTPRINT_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown RestoreFootprintResultCode JSON value: ${json}`)
  return result
}

export type RestoreFootprintResult =
  | { readonly code: 'RESTORE_FOOTPRINT_SUCCESS' }
  | { readonly code: 'RESTORE_FOOTPRINT_MALFORMED' }
  | { readonly code: 'RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED' }
  | { readonly code: 'RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE' }

export function readRestoreFootprintResult(r: XdrReader): RestoreFootprintResult {
  beginComposite(r)
  try {
    const code = readRestoreFootprintResultCode(r)
    let result: RestoreFootprintResult
    switch (code) {
      case 'RESTORE_FOOTPRINT_SUCCESS':
        result = { code }; break
      case 'RESTORE_FOOTPRINT_MALFORMED':
      case 'RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED':
      case 'RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown RestoreFootprintResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeRestoreFootprintResult(w: XdrWriter, v: RestoreFootprintResult): void {
  writeRestoreFootprintResultCode(w, v.code)
  switch (v.code) {
    case 'RESTORE_FOOTPRINT_SUCCESS':
      break
    case 'RESTORE_FOOTPRINT_MALFORMED':
    case 'RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED':
    case 'RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE':
      break
  }
}

export function encodeRestoreFootprintResult(v: RestoreFootprintResult): Uint8Array {
  return encode(v, writeRestoreFootprintResult)
}

export function decodeRestoreFootprintResult(input: Uint8Array | string): RestoreFootprintResult {
  return decode(input, readRestoreFootprintResult)
}

export function toJsonRestoreFootprintResult(v: RestoreFootprintResult): unknown {
  switch (v.code) {
    case 'RESTORE_FOOTPRINT_SUCCESS':
      return 'success'
    case 'RESTORE_FOOTPRINT_MALFORMED':
      return 'malformed'
    case 'RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED':
      return 'resource_limit_exceeded'
    case 'RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE':
      return 'insufficient_refundable_fee'
  }
}

export function fromJsonRestoreFootprintResult(json: unknown): RestoreFootprintResult {
  if (typeof json === 'string') {
    if (json === 'success') return { code: 'RESTORE_FOOTPRINT_SUCCESS' } as RestoreFootprintResult
    if (json === 'malformed') return { code: 'RESTORE_FOOTPRINT_MALFORMED' } as RestoreFootprintResult
    if (json === 'resource_limit_exceeded') return { code: 'RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED' } as RestoreFootprintResult
    if (json === 'insufficient_refundable_fee') return { code: 'RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE' } as RestoreFootprintResult
    throw new Error(`Unknown RestoreFootprintResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown RestoreFootprintResult variant: ${key}`)
  }
}

/** High level Operation Result  */
export type OperationResultCode =
  | 'opINNER'
  | 'opBAD_AUTH'
  | 'opNO_ACCOUNT'
  | 'opNOT_SUPPORTED'
  | 'opTOO_MANY_SUBENTRIES'
  | 'opEXCEEDED_WORK_LIMIT'
  | 'opTOO_MANY_SPONSORING'

export const OPERATION_RESULT_CODE_TO_INT: Record<OperationResultCode, number> = /*#__PURE__*/ {
  opINNER: 0,
  opBAD_AUTH: -1,
  opNO_ACCOUNT: -2,
  opNOT_SUPPORTED: -3,
  opTOO_MANY_SUBENTRIES: -4,
  opEXCEEDED_WORK_LIMIT: -5,
  opTOO_MANY_SPONSORING: -6,
}

export const OPERATION_RESULT_CODE_FROM_INT: Record<number, OperationResultCode> = /*#__PURE__*/ {
  0: 'opINNER',
  [-1]: 'opBAD_AUTH',
  [-2]: 'opNO_ACCOUNT',
  [-3]: 'opNOT_SUPPORTED',
  [-4]: 'opTOO_MANY_SUBENTRIES',
  [-5]: 'opEXCEEDED_WORK_LIMIT',
  [-6]: 'opTOO_MANY_SPONSORING',
}

export function readOperationResultCode(r: XdrReader): OperationResultCode {
  const v = readInt32(r)
  const result = OPERATION_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown OperationResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeOperationResultCode(w: XdrWriter, v: OperationResultCode): void {
  writeInt32(w, OPERATION_RESULT_CODE_TO_INT[v])
}

export function encodeOperationResultCode(v: OperationResultCode): Uint8Array {
  return encode(v, writeOperationResultCode)
}

export function decodeOperationResultCode(input: Uint8Array | string): OperationResultCode {
  return decode(input, readOperationResultCode)
}

const _OPERATION_RESULT_CODE_TO_JSON: Record<OperationResultCode, string> = /*#__PURE__*/ {
  opINNER: 'opinner',
  opBAD_AUTH: 'opbad_auth',
  opNO_ACCOUNT: 'opno_account',
  opNOT_SUPPORTED: 'opnot_supported',
  opTOO_MANY_SUBENTRIES: 'optoo_many_subentries',
  opEXCEEDED_WORK_LIMIT: 'opexceeded_work_limit',
  opTOO_MANY_SPONSORING: 'optoo_many_sponsoring',
}

const _OPERATION_RESULT_CODE_FROM_JSON: Record<string, OperationResultCode> = /*#__PURE__*/ {
  'opinner': 'opINNER',
  'opbad_auth': 'opBAD_AUTH',
  'opno_account': 'opNO_ACCOUNT',
  'opnot_supported': 'opNOT_SUPPORTED',
  'optoo_many_subentries': 'opTOO_MANY_SUBENTRIES',
  'opexceeded_work_limit': 'opEXCEEDED_WORK_LIMIT',
  'optoo_many_sponsoring': 'opTOO_MANY_SPONSORING',
}

export function toJsonOperationResultCode(v: OperationResultCode): string {
  return _OPERATION_RESULT_CODE_TO_JSON[v]
}

export function fromJsonOperationResultCode(json: unknown): OperationResultCode {
  const result = _OPERATION_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown OperationResultCode JSON value: ${json}`)
  return result
}

export type OperationResult_tr =
  | { readonly type: 'CREATE_ACCOUNT'; readonly createAccountResult: CreateAccountResult }
  | { readonly type: 'PAYMENT'; readonly paymentResult: PaymentResult }
  | { readonly type: 'PATH_PAYMENT_STRICT_RECEIVE'; readonly pathPaymentStrictReceiveResult: PathPaymentStrictReceiveResult }
  | { readonly type: 'MANAGE_SELL_OFFER'; readonly manageSellOfferResult: ManageSellOfferResult }
  | { readonly type: 'CREATE_PASSIVE_SELL_OFFER'; readonly createPassiveSellOfferResult: ManageSellOfferResult }
  | { readonly type: 'SET_OPTIONS'; readonly setOptionsResult: SetOptionsResult }
  | { readonly type: 'CHANGE_TRUST'; readonly changeTrustResult: ChangeTrustResult }
  | { readonly type: 'ALLOW_TRUST'; readonly allowTrustResult: AllowTrustResult }
  | { readonly type: 'ACCOUNT_MERGE'; readonly accountMergeResult: AccountMergeResult }
  | { readonly type: 'INFLATION'; readonly inflationResult: InflationResult }
  | { readonly type: 'MANAGE_DATA'; readonly manageDataResult: ManageDataResult }
  | { readonly type: 'BUMP_SEQUENCE'; readonly bumpSeqResult: BumpSequenceResult }
  | { readonly type: 'MANAGE_BUY_OFFER'; readonly manageBuyOfferResult: ManageBuyOfferResult }
  | { readonly type: 'PATH_PAYMENT_STRICT_SEND'; readonly pathPaymentStrictSendResult: PathPaymentStrictSendResult }
  | { readonly type: 'CREATE_CLAIMABLE_BALANCE'; readonly createClaimableBalanceResult: CreateClaimableBalanceResult }
  | { readonly type: 'CLAIM_CLAIMABLE_BALANCE'; readonly claimClaimableBalanceResult: ClaimClaimableBalanceResult }
  | { readonly type: 'BEGIN_SPONSORING_FUTURE_RESERVES'; readonly beginSponsoringFutureReservesResult: BeginSponsoringFutureReservesResult }
  | { readonly type: 'END_SPONSORING_FUTURE_RESERVES'; readonly endSponsoringFutureReservesResult: EndSponsoringFutureReservesResult }
  | { readonly type: 'REVOKE_SPONSORSHIP'; readonly revokeSponsorshipResult: RevokeSponsorshipResult }
  | { readonly type: 'CLAWBACK'; readonly clawbackResult: ClawbackResult }
  | { readonly type: 'CLAWBACK_CLAIMABLE_BALANCE'; readonly clawbackClaimableBalanceResult: ClawbackClaimableBalanceResult }
  | { readonly type: 'SET_TRUST_LINE_FLAGS'; readonly setTrustLineFlagsResult: SetTrustLineFlagsResult }
  | { readonly type: 'LIQUIDITY_POOL_DEPOSIT'; readonly liquidityPoolDepositResult: LiquidityPoolDepositResult }
  | { readonly type: 'LIQUIDITY_POOL_WITHDRAW'; readonly liquidityPoolWithdrawResult: LiquidityPoolWithdrawResult }
  | { readonly type: 'INVOKE_HOST_FUNCTION'; readonly invokeHostFunctionResult: InvokeHostFunctionResult }
  | { readonly type: 'EXTEND_FOOTPRINT_TTL'; readonly extendFootprintTTLResult: ExtendFootprintTTLResult }
  | { readonly type: 'RESTORE_FOOTPRINT'; readonly restoreFootprintResult: RestoreFootprintResult }

export function readOperationResult_tr(r: XdrReader): OperationResult_tr {
  beginComposite(r)
  try {
    const type = readOperationType(r)
    let result: OperationResult_tr
    switch (type) {
      case 'CREATE_ACCOUNT':
        result = { type, createAccountResult: readCreateAccountResult(r) }; break
      case 'PAYMENT':
        result = { type, paymentResult: readPaymentResult(r) }; break
      case 'PATH_PAYMENT_STRICT_RECEIVE':
        result = { type, pathPaymentStrictReceiveResult: readPathPaymentStrictReceiveResult(r) }; break
      case 'MANAGE_SELL_OFFER':
        result = { type, manageSellOfferResult: readManageSellOfferResult(r) }; break
      case 'CREATE_PASSIVE_SELL_OFFER':
        result = { type, createPassiveSellOfferResult: readManageSellOfferResult(r) }; break
      case 'SET_OPTIONS':
        result = { type, setOptionsResult: readSetOptionsResult(r) }; break
      case 'CHANGE_TRUST':
        result = { type, changeTrustResult: readChangeTrustResult(r) }; break
      case 'ALLOW_TRUST':
        result = { type, allowTrustResult: readAllowTrustResult(r) }; break
      case 'ACCOUNT_MERGE':
        result = { type, accountMergeResult: readAccountMergeResult(r) }; break
      case 'INFLATION':
        result = { type, inflationResult: readInflationResult(r) }; break
      case 'MANAGE_DATA':
        result = { type, manageDataResult: readManageDataResult(r) }; break
      case 'BUMP_SEQUENCE':
        result = { type, bumpSeqResult: readBumpSequenceResult(r) }; break
      case 'MANAGE_BUY_OFFER':
        result = { type, manageBuyOfferResult: readManageBuyOfferResult(r) }; break
      case 'PATH_PAYMENT_STRICT_SEND':
        result = { type, pathPaymentStrictSendResult: readPathPaymentStrictSendResult(r) }; break
      case 'CREATE_CLAIMABLE_BALANCE':
        result = { type, createClaimableBalanceResult: readCreateClaimableBalanceResult(r) }; break
      case 'CLAIM_CLAIMABLE_BALANCE':
        result = { type, claimClaimableBalanceResult: readClaimClaimableBalanceResult(r) }; break
      case 'BEGIN_SPONSORING_FUTURE_RESERVES':
        result = { type, beginSponsoringFutureReservesResult: readBeginSponsoringFutureReservesResult(r) }; break
      case 'END_SPONSORING_FUTURE_RESERVES':
        result = { type, endSponsoringFutureReservesResult: readEndSponsoringFutureReservesResult(r) }; break
      case 'REVOKE_SPONSORSHIP':
        result = { type, revokeSponsorshipResult: readRevokeSponsorshipResult(r) }; break
      case 'CLAWBACK':
        result = { type, clawbackResult: readClawbackResult(r) }; break
      case 'CLAWBACK_CLAIMABLE_BALANCE':
        result = { type, clawbackClaimableBalanceResult: readClawbackClaimableBalanceResult(r) }; break
      case 'SET_TRUST_LINE_FLAGS':
        result = { type, setTrustLineFlagsResult: readSetTrustLineFlagsResult(r) }; break
      case 'LIQUIDITY_POOL_DEPOSIT':
        result = { type, liquidityPoolDepositResult: readLiquidityPoolDepositResult(r) }; break
      case 'LIQUIDITY_POOL_WITHDRAW':
        result = { type, liquidityPoolWithdrawResult: readLiquidityPoolWithdrawResult(r) }; break
      case 'INVOKE_HOST_FUNCTION':
        result = { type, invokeHostFunctionResult: readInvokeHostFunctionResult(r) }; break
      case 'EXTEND_FOOTPRINT_TTL':
        result = { type, extendFootprintTTLResult: readExtendFootprintTTLResult(r) }; break
      case 'RESTORE_FOOTPRINT':
        result = { type, restoreFootprintResult: readRestoreFootprintResult(r) }; break
      default:
        throw new XdrReadError(`Unknown OperationResult_tr discriminant: ${type}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeOperationResult_tr(w: XdrWriter, v: OperationResult_tr): void {
  writeOperationType(w, v.type)
  switch (v.type) {
    case 'CREATE_ACCOUNT':
      writeCreateAccountResult(w, (v as any).createAccountResult); break
    case 'PAYMENT':
      writePaymentResult(w, (v as any).paymentResult); break
    case 'PATH_PAYMENT_STRICT_RECEIVE':
      writePathPaymentStrictReceiveResult(w, (v as any).pathPaymentStrictReceiveResult); break
    case 'MANAGE_SELL_OFFER':
      writeManageSellOfferResult(w, (v as any).manageSellOfferResult); break
    case 'CREATE_PASSIVE_SELL_OFFER':
      writeManageSellOfferResult(w, (v as any).createPassiveSellOfferResult); break
    case 'SET_OPTIONS':
      writeSetOptionsResult(w, (v as any).setOptionsResult); break
    case 'CHANGE_TRUST':
      writeChangeTrustResult(w, (v as any).changeTrustResult); break
    case 'ALLOW_TRUST':
      writeAllowTrustResult(w, (v as any).allowTrustResult); break
    case 'ACCOUNT_MERGE':
      writeAccountMergeResult(w, (v as any).accountMergeResult); break
    case 'INFLATION':
      writeInflationResult(w, (v as any).inflationResult); break
    case 'MANAGE_DATA':
      writeManageDataResult(w, (v as any).manageDataResult); break
    case 'BUMP_SEQUENCE':
      writeBumpSequenceResult(w, (v as any).bumpSeqResult); break
    case 'MANAGE_BUY_OFFER':
      writeManageBuyOfferResult(w, (v as any).manageBuyOfferResult); break
    case 'PATH_PAYMENT_STRICT_SEND':
      writePathPaymentStrictSendResult(w, (v as any).pathPaymentStrictSendResult); break
    case 'CREATE_CLAIMABLE_BALANCE':
      writeCreateClaimableBalanceResult(w, (v as any).createClaimableBalanceResult); break
    case 'CLAIM_CLAIMABLE_BALANCE':
      writeClaimClaimableBalanceResult(w, (v as any).claimClaimableBalanceResult); break
    case 'BEGIN_SPONSORING_FUTURE_RESERVES':
      writeBeginSponsoringFutureReservesResult(w, (v as any).beginSponsoringFutureReservesResult); break
    case 'END_SPONSORING_FUTURE_RESERVES':
      writeEndSponsoringFutureReservesResult(w, (v as any).endSponsoringFutureReservesResult); break
    case 'REVOKE_SPONSORSHIP':
      writeRevokeSponsorshipResult(w, (v as any).revokeSponsorshipResult); break
    case 'CLAWBACK':
      writeClawbackResult(w, (v as any).clawbackResult); break
    case 'CLAWBACK_CLAIMABLE_BALANCE':
      writeClawbackClaimableBalanceResult(w, (v as any).clawbackClaimableBalanceResult); break
    case 'SET_TRUST_LINE_FLAGS':
      writeSetTrustLineFlagsResult(w, (v as any).setTrustLineFlagsResult); break
    case 'LIQUIDITY_POOL_DEPOSIT':
      writeLiquidityPoolDepositResult(w, (v as any).liquidityPoolDepositResult); break
    case 'LIQUIDITY_POOL_WITHDRAW':
      writeLiquidityPoolWithdrawResult(w, (v as any).liquidityPoolWithdrawResult); break
    case 'INVOKE_HOST_FUNCTION':
      writeInvokeHostFunctionResult(w, (v as any).invokeHostFunctionResult); break
    case 'EXTEND_FOOTPRINT_TTL':
      writeExtendFootprintTTLResult(w, (v as any).extendFootprintTTLResult); break
    case 'RESTORE_FOOTPRINT':
      writeRestoreFootprintResult(w, (v as any).restoreFootprintResult); break
  }
}

export function encodeOperationResult_tr(v: OperationResult_tr): Uint8Array {
  return encode(v, writeOperationResult_tr)
}

export function decodeOperationResult_tr(input: Uint8Array | string): OperationResult_tr {
  return decode(input, readOperationResult_tr)
}

export function toJsonOperationResult_tr(v: OperationResult_tr): unknown {
  switch (v.type) {
    case 'CREATE_ACCOUNT':
      return { 'create_account': toJsonCreateAccountResult((v as any).createAccountResult) }
    case 'PAYMENT':
      return { 'payment': toJsonPaymentResult((v as any).paymentResult) }
    case 'PATH_PAYMENT_STRICT_RECEIVE':
      return { 'path_payment_strict_receive': toJsonPathPaymentStrictReceiveResult((v as any).pathPaymentStrictReceiveResult) }
    case 'MANAGE_SELL_OFFER':
      return { 'manage_sell_offer': toJsonManageSellOfferResult((v as any).manageSellOfferResult) }
    case 'CREATE_PASSIVE_SELL_OFFER':
      return { 'create_passive_sell_offer': toJsonManageSellOfferResult((v as any).createPassiveSellOfferResult) }
    case 'SET_OPTIONS':
      return { 'set_options': toJsonSetOptionsResult((v as any).setOptionsResult) }
    case 'CHANGE_TRUST':
      return { 'change_trust': toJsonChangeTrustResult((v as any).changeTrustResult) }
    case 'ALLOW_TRUST':
      return { 'allow_trust': toJsonAllowTrustResult((v as any).allowTrustResult) }
    case 'ACCOUNT_MERGE':
      return { 'account_merge': toJsonAccountMergeResult((v as any).accountMergeResult) }
    case 'INFLATION':
      return { 'inflation': toJsonInflationResult((v as any).inflationResult) }
    case 'MANAGE_DATA':
      return { 'manage_data': toJsonManageDataResult((v as any).manageDataResult) }
    case 'BUMP_SEQUENCE':
      return { 'bump_sequence': toJsonBumpSequenceResult((v as any).bumpSeqResult) }
    case 'MANAGE_BUY_OFFER':
      return { 'manage_buy_offer': toJsonManageBuyOfferResult((v as any).manageBuyOfferResult) }
    case 'PATH_PAYMENT_STRICT_SEND':
      return { 'path_payment_strict_send': toJsonPathPaymentStrictSendResult((v as any).pathPaymentStrictSendResult) }
    case 'CREATE_CLAIMABLE_BALANCE':
      return { 'create_claimable_balance': toJsonCreateClaimableBalanceResult((v as any).createClaimableBalanceResult) }
    case 'CLAIM_CLAIMABLE_BALANCE':
      return { 'claim_claimable_balance': toJsonClaimClaimableBalanceResult((v as any).claimClaimableBalanceResult) }
    case 'BEGIN_SPONSORING_FUTURE_RESERVES':
      return { 'begin_sponsoring_future_reserves': toJsonBeginSponsoringFutureReservesResult((v as any).beginSponsoringFutureReservesResult) }
    case 'END_SPONSORING_FUTURE_RESERVES':
      return { 'end_sponsoring_future_reserves': toJsonEndSponsoringFutureReservesResult((v as any).endSponsoringFutureReservesResult) }
    case 'REVOKE_SPONSORSHIP':
      return { 'revoke_sponsorship': toJsonRevokeSponsorshipResult((v as any).revokeSponsorshipResult) }
    case 'CLAWBACK':
      return { 'clawback': toJsonClawbackResult((v as any).clawbackResult) }
    case 'CLAWBACK_CLAIMABLE_BALANCE':
      return { 'clawback_claimable_balance': toJsonClawbackClaimableBalanceResult((v as any).clawbackClaimableBalanceResult) }
    case 'SET_TRUST_LINE_FLAGS':
      return { 'set_trust_line_flags': toJsonSetTrustLineFlagsResult((v as any).setTrustLineFlagsResult) }
    case 'LIQUIDITY_POOL_DEPOSIT':
      return { 'liquidity_pool_deposit': toJsonLiquidityPoolDepositResult((v as any).liquidityPoolDepositResult) }
    case 'LIQUIDITY_POOL_WITHDRAW':
      return { 'liquidity_pool_withdraw': toJsonLiquidityPoolWithdrawResult((v as any).liquidityPoolWithdrawResult) }
    case 'INVOKE_HOST_FUNCTION':
      return { 'invoke_host_function': toJsonInvokeHostFunctionResult((v as any).invokeHostFunctionResult) }
    case 'EXTEND_FOOTPRINT_TTL':
      return { 'extend_footprint_ttl': toJsonExtendFootprintTTLResult((v as any).extendFootprintTTLResult) }
    case 'RESTORE_FOOTPRINT':
      return { 'restore_footprint': toJsonRestoreFootprintResult((v as any).restoreFootprintResult) }
  }
}

export function fromJsonOperationResult_tr(json: unknown): OperationResult_tr {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for OperationResult_tr: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'create_account':
      return { type: 'CREATE_ACCOUNT', createAccountResult: fromJsonCreateAccountResult(obj[key]) } as OperationResult_tr
    case 'payment':
      return { type: 'PAYMENT', paymentResult: fromJsonPaymentResult(obj[key]) } as OperationResult_tr
    case 'path_payment_strict_receive':
      return { type: 'PATH_PAYMENT_STRICT_RECEIVE', pathPaymentStrictReceiveResult: fromJsonPathPaymentStrictReceiveResult(obj[key]) } as OperationResult_tr
    case 'manage_sell_offer':
      return { type: 'MANAGE_SELL_OFFER', manageSellOfferResult: fromJsonManageSellOfferResult(obj[key]) } as OperationResult_tr
    case 'create_passive_sell_offer':
      return { type: 'CREATE_PASSIVE_SELL_OFFER', createPassiveSellOfferResult: fromJsonManageSellOfferResult(obj[key]) } as OperationResult_tr
    case 'set_options':
      return { type: 'SET_OPTIONS', setOptionsResult: fromJsonSetOptionsResult(obj[key]) } as OperationResult_tr
    case 'change_trust':
      return { type: 'CHANGE_TRUST', changeTrustResult: fromJsonChangeTrustResult(obj[key]) } as OperationResult_tr
    case 'allow_trust':
      return { type: 'ALLOW_TRUST', allowTrustResult: fromJsonAllowTrustResult(obj[key]) } as OperationResult_tr
    case 'account_merge':
      return { type: 'ACCOUNT_MERGE', accountMergeResult: fromJsonAccountMergeResult(obj[key]) } as OperationResult_tr
    case 'inflation':
      return { type: 'INFLATION', inflationResult: fromJsonInflationResult(obj[key]) } as OperationResult_tr
    case 'manage_data':
      return { type: 'MANAGE_DATA', manageDataResult: fromJsonManageDataResult(obj[key]) } as OperationResult_tr
    case 'bump_sequence':
      return { type: 'BUMP_SEQUENCE', bumpSeqResult: fromJsonBumpSequenceResult(obj[key]) } as OperationResult_tr
    case 'manage_buy_offer':
      return { type: 'MANAGE_BUY_OFFER', manageBuyOfferResult: fromJsonManageBuyOfferResult(obj[key]) } as OperationResult_tr
    case 'path_payment_strict_send':
      return { type: 'PATH_PAYMENT_STRICT_SEND', pathPaymentStrictSendResult: fromJsonPathPaymentStrictSendResult(obj[key]) } as OperationResult_tr
    case 'create_claimable_balance':
      return { type: 'CREATE_CLAIMABLE_BALANCE', createClaimableBalanceResult: fromJsonCreateClaimableBalanceResult(obj[key]) } as OperationResult_tr
    case 'claim_claimable_balance':
      return { type: 'CLAIM_CLAIMABLE_BALANCE', claimClaimableBalanceResult: fromJsonClaimClaimableBalanceResult(obj[key]) } as OperationResult_tr
    case 'begin_sponsoring_future_reserves':
      return { type: 'BEGIN_SPONSORING_FUTURE_RESERVES', beginSponsoringFutureReservesResult: fromJsonBeginSponsoringFutureReservesResult(obj[key]) } as OperationResult_tr
    case 'end_sponsoring_future_reserves':
      return { type: 'END_SPONSORING_FUTURE_RESERVES', endSponsoringFutureReservesResult: fromJsonEndSponsoringFutureReservesResult(obj[key]) } as OperationResult_tr
    case 'revoke_sponsorship':
      return { type: 'REVOKE_SPONSORSHIP', revokeSponsorshipResult: fromJsonRevokeSponsorshipResult(obj[key]) } as OperationResult_tr
    case 'clawback':
      return { type: 'CLAWBACK', clawbackResult: fromJsonClawbackResult(obj[key]) } as OperationResult_tr
    case 'clawback_claimable_balance':
      return { type: 'CLAWBACK_CLAIMABLE_BALANCE', clawbackClaimableBalanceResult: fromJsonClawbackClaimableBalanceResult(obj[key]) } as OperationResult_tr
    case 'set_trust_line_flags':
      return { type: 'SET_TRUST_LINE_FLAGS', setTrustLineFlagsResult: fromJsonSetTrustLineFlagsResult(obj[key]) } as OperationResult_tr
    case 'liquidity_pool_deposit':
      return { type: 'LIQUIDITY_POOL_DEPOSIT', liquidityPoolDepositResult: fromJsonLiquidityPoolDepositResult(obj[key]) } as OperationResult_tr
    case 'liquidity_pool_withdraw':
      return { type: 'LIQUIDITY_POOL_WITHDRAW', liquidityPoolWithdrawResult: fromJsonLiquidityPoolWithdrawResult(obj[key]) } as OperationResult_tr
    case 'invoke_host_function':
      return { type: 'INVOKE_HOST_FUNCTION', invokeHostFunctionResult: fromJsonInvokeHostFunctionResult(obj[key]) } as OperationResult_tr
    case 'extend_footprint_ttl':
      return { type: 'EXTEND_FOOTPRINT_TTL', extendFootprintTTLResult: fromJsonExtendFootprintTTLResult(obj[key]) } as OperationResult_tr
    case 'restore_footprint':
      return { type: 'RESTORE_FOOTPRINT', restoreFootprintResult: fromJsonRestoreFootprintResult(obj[key]) } as OperationResult_tr
    default: throw new Error(`Unknown OperationResult_tr variant: ${key}`)
  }
}

export type OperationResult =
  | { readonly code: 'opINNER'; readonly tr: OperationResult_tr }
  | { readonly code: 'opBAD_AUTH' }
  | { readonly code: 'opNO_ACCOUNT' }
  | { readonly code: 'opNOT_SUPPORTED' }
  | { readonly code: 'opTOO_MANY_SUBENTRIES' }
  | { readonly code: 'opEXCEEDED_WORK_LIMIT' }
  | { readonly code: 'opTOO_MANY_SPONSORING' }

export function readOperationResult(r: XdrReader): OperationResult {
  beginComposite(r)
  try {
    const code = readOperationResultCode(r)
    let result: OperationResult
    switch (code) {
      case 'opINNER':
        result = { code, tr: readOperationResult_tr(r) }; break
      case 'opBAD_AUTH':
      case 'opNO_ACCOUNT':
      case 'opNOT_SUPPORTED':
      case 'opTOO_MANY_SUBENTRIES':
      case 'opEXCEEDED_WORK_LIMIT':
      case 'opTOO_MANY_SPONSORING':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown OperationResult discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeOperationResult(w: XdrWriter, v: OperationResult): void {
  writeOperationResultCode(w, v.code)
  switch (v.code) {
    case 'opINNER':
      writeOperationResult_tr(w, (v as any).tr); break
    case 'opBAD_AUTH':
    case 'opNO_ACCOUNT':
    case 'opNOT_SUPPORTED':
    case 'opTOO_MANY_SUBENTRIES':
    case 'opEXCEEDED_WORK_LIMIT':
    case 'opTOO_MANY_SPONSORING':
      break
  }
}

export function encodeOperationResult(v: OperationResult): Uint8Array {
  return encode(v, writeOperationResult)
}

export function decodeOperationResult(input: Uint8Array | string): OperationResult {
  return decode(input, readOperationResult)
}

export function toJsonOperationResult(v: OperationResult): unknown {
  switch (v.code) {
    case 'opINNER':
      return { 'opinner': toJsonOperationResult_tr((v as any).tr) }
    case 'opBAD_AUTH':
      return 'opbad_auth'
    case 'opNO_ACCOUNT':
      return 'opno_account'
    case 'opNOT_SUPPORTED':
      return 'opnot_supported'
    case 'opTOO_MANY_SUBENTRIES':
      return 'optoo_many_subentries'
    case 'opEXCEEDED_WORK_LIMIT':
      return 'opexceeded_work_limit'
    case 'opTOO_MANY_SPONSORING':
      return 'optoo_many_sponsoring'
  }
}

export function fromJsonOperationResult(json: unknown): OperationResult {
  if (typeof json === 'string') {
    if (json === 'opbad_auth') return { code: 'opBAD_AUTH' } as OperationResult
    if (json === 'opno_account') return { code: 'opNO_ACCOUNT' } as OperationResult
    if (json === 'opnot_supported') return { code: 'opNOT_SUPPORTED' } as OperationResult
    if (json === 'optoo_many_subentries') return { code: 'opTOO_MANY_SUBENTRIES' } as OperationResult
    if (json === 'opexceeded_work_limit') return { code: 'opEXCEEDED_WORK_LIMIT' } as OperationResult
    if (json === 'optoo_many_sponsoring') return { code: 'opTOO_MANY_SPONSORING' } as OperationResult
    throw new Error(`Unknown OperationResult variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'opinner':
      return { code: 'opINNER', tr: fromJsonOperationResult_tr(obj[key]) } as OperationResult
    default: throw new Error(`Unknown OperationResult variant: ${key}`)
  }
}

export type TransactionResultCode =
  | 'txFEE_BUMP_INNER_SUCCESS'
  | 'txSUCCESS'
  | 'txFAILED'
  | 'txTOO_EARLY'
  | 'txTOO_LATE'
  | 'txMISSING_OPERATION'
  | 'txBAD_SEQ'
  | 'txBAD_AUTH'
  | 'txINSUFFICIENT_BALANCE'
  | 'txNO_ACCOUNT'
  | 'txINSUFFICIENT_FEE'
  | 'txBAD_AUTH_EXTRA'
  | 'txINTERNAL_ERROR'
  | 'txNOT_SUPPORTED'
  | 'txFEE_BUMP_INNER_FAILED'
  | 'txBAD_SPONSORSHIP'
  | 'txBAD_MIN_SEQ_AGE_OR_GAP'
  | 'txMALFORMED'
  | 'txSOROBAN_INVALID'

export const TRANSACTION_RESULT_CODE_TO_INT: Record<TransactionResultCode, number> = /*#__PURE__*/ {
  txFEE_BUMP_INNER_SUCCESS: 1,
  txSUCCESS: 0,
  txFAILED: -1,
  txTOO_EARLY: -2,
  txTOO_LATE: -3,
  txMISSING_OPERATION: -4,
  txBAD_SEQ: -5,
  txBAD_AUTH: -6,
  txINSUFFICIENT_BALANCE: -7,
  txNO_ACCOUNT: -8,
  txINSUFFICIENT_FEE: -9,
  txBAD_AUTH_EXTRA: -10,
  txINTERNAL_ERROR: -11,
  txNOT_SUPPORTED: -12,
  txFEE_BUMP_INNER_FAILED: -13,
  txBAD_SPONSORSHIP: -14,
  txBAD_MIN_SEQ_AGE_OR_GAP: -15,
  txMALFORMED: -16,
  txSOROBAN_INVALID: -17,
}

export const TRANSACTION_RESULT_CODE_FROM_INT: Record<number, TransactionResultCode> = /*#__PURE__*/ {
  1: 'txFEE_BUMP_INNER_SUCCESS',
  0: 'txSUCCESS',
  [-1]: 'txFAILED',
  [-2]: 'txTOO_EARLY',
  [-3]: 'txTOO_LATE',
  [-4]: 'txMISSING_OPERATION',
  [-5]: 'txBAD_SEQ',
  [-6]: 'txBAD_AUTH',
  [-7]: 'txINSUFFICIENT_BALANCE',
  [-8]: 'txNO_ACCOUNT',
  [-9]: 'txINSUFFICIENT_FEE',
  [-10]: 'txBAD_AUTH_EXTRA',
  [-11]: 'txINTERNAL_ERROR',
  [-12]: 'txNOT_SUPPORTED',
  [-13]: 'txFEE_BUMP_INNER_FAILED',
  [-14]: 'txBAD_SPONSORSHIP',
  [-15]: 'txBAD_MIN_SEQ_AGE_OR_GAP',
  [-16]: 'txMALFORMED',
  [-17]: 'txSOROBAN_INVALID',
}

export function readTransactionResultCode(r: XdrReader): TransactionResultCode {
  const v = readInt32(r)
  const result = TRANSACTION_RESULT_CODE_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown TransactionResultCode value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeTransactionResultCode(w: XdrWriter, v: TransactionResultCode): void {
  writeInt32(w, TRANSACTION_RESULT_CODE_TO_INT[v])
}

export function encodeTransactionResultCode(v: TransactionResultCode): Uint8Array {
  return encode(v, writeTransactionResultCode)
}

export function decodeTransactionResultCode(input: Uint8Array | string): TransactionResultCode {
  return decode(input, readTransactionResultCode)
}

const _TRANSACTION_RESULT_CODE_TO_JSON: Record<TransactionResultCode, string> = /*#__PURE__*/ {
  txFEE_BUMP_INNER_SUCCESS: 'txfee_bump_inner_success',
  txSUCCESS: 'txsuccess',
  txFAILED: 'txfailed',
  txTOO_EARLY: 'txtoo_early',
  txTOO_LATE: 'txtoo_late',
  txMISSING_OPERATION: 'txmissing_operation',
  txBAD_SEQ: 'txbad_seq',
  txBAD_AUTH: 'txbad_auth',
  txINSUFFICIENT_BALANCE: 'txinsufficient_balance',
  txNO_ACCOUNT: 'txno_account',
  txINSUFFICIENT_FEE: 'txinsufficient_fee',
  txBAD_AUTH_EXTRA: 'txbad_auth_extra',
  txINTERNAL_ERROR: 'txinternal_error',
  txNOT_SUPPORTED: 'txnot_supported',
  txFEE_BUMP_INNER_FAILED: 'txfee_bump_inner_failed',
  txBAD_SPONSORSHIP: 'txbad_sponsorship',
  txBAD_MIN_SEQ_AGE_OR_GAP: 'txbad_min_seq_age_or_gap',
  txMALFORMED: 'txmalformed',
  txSOROBAN_INVALID: 'txsoroban_invalid',
}

const _TRANSACTION_RESULT_CODE_FROM_JSON: Record<string, TransactionResultCode> = /*#__PURE__*/ {
  'txfee_bump_inner_success': 'txFEE_BUMP_INNER_SUCCESS',
  'txsuccess': 'txSUCCESS',
  'txfailed': 'txFAILED',
  'txtoo_early': 'txTOO_EARLY',
  'txtoo_late': 'txTOO_LATE',
  'txmissing_operation': 'txMISSING_OPERATION',
  'txbad_seq': 'txBAD_SEQ',
  'txbad_auth': 'txBAD_AUTH',
  'txinsufficient_balance': 'txINSUFFICIENT_BALANCE',
  'txno_account': 'txNO_ACCOUNT',
  'txinsufficient_fee': 'txINSUFFICIENT_FEE',
  'txbad_auth_extra': 'txBAD_AUTH_EXTRA',
  'txinternal_error': 'txINTERNAL_ERROR',
  'txnot_supported': 'txNOT_SUPPORTED',
  'txfee_bump_inner_failed': 'txFEE_BUMP_INNER_FAILED',
  'txbad_sponsorship': 'txBAD_SPONSORSHIP',
  'txbad_min_seq_age_or_gap': 'txBAD_MIN_SEQ_AGE_OR_GAP',
  'txmalformed': 'txMALFORMED',
  'txsoroban_invalid': 'txSOROBAN_INVALID',
}

export function toJsonTransactionResultCode(v: TransactionResultCode): string {
  return _TRANSACTION_RESULT_CODE_TO_JSON[v]
}

export function fromJsonTransactionResultCode(json: unknown): TransactionResultCode {
  const result = _TRANSACTION_RESULT_CODE_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown TransactionResultCode JSON value: ${json}`)
  return result
}

export type InnerTransactionResult_result =
  | { readonly code: 'txSUCCESS'; readonly results: OperationResult[] }
  | { readonly code: 'txFAILED'; readonly results: OperationResult[] }
  | { readonly code: 'txTOO_EARLY' }
  | { readonly code: 'txTOO_LATE' }
  | { readonly code: 'txMISSING_OPERATION' }
  | { readonly code: 'txBAD_SEQ' }
  | { readonly code: 'txBAD_AUTH' }
  | { readonly code: 'txINSUFFICIENT_BALANCE' }
  | { readonly code: 'txNO_ACCOUNT' }
  | { readonly code: 'txINSUFFICIENT_FEE' }
  | { readonly code: 'txBAD_AUTH_EXTRA' }
  | { readonly code: 'txINTERNAL_ERROR' }
  | { readonly code: 'txNOT_SUPPORTED' }
  | { readonly code: 'txBAD_SPONSORSHIP' }
  | { readonly code: 'txBAD_MIN_SEQ_AGE_OR_GAP' }
  | { readonly code: 'txMALFORMED' }
  | { readonly code: 'txSOROBAN_INVALID' }

export function readInnerTransactionResult_result(r: XdrReader): InnerTransactionResult_result {
  beginComposite(r)
  try {
    const code = readTransactionResultCode(r)
    let result: InnerTransactionResult_result
    switch (code) {
      case 'txSUCCESS':
      case 'txFAILED':
        result = { code, results: readVarArray(r, UINT32_MAX, readOperationResult) }; break
      case 'txTOO_EARLY':
      case 'txTOO_LATE':
      case 'txMISSING_OPERATION':
      case 'txBAD_SEQ':
      case 'txBAD_AUTH':
      case 'txINSUFFICIENT_BALANCE':
      case 'txNO_ACCOUNT':
      case 'txINSUFFICIENT_FEE':
      case 'txBAD_AUTH_EXTRA':
      case 'txINTERNAL_ERROR':
      case 'txNOT_SUPPORTED':
      case 'txBAD_SPONSORSHIP':
      case 'txBAD_MIN_SEQ_AGE_OR_GAP':
      case 'txMALFORMED':
      case 'txSOROBAN_INVALID':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown InnerTransactionResult_result discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeInnerTransactionResult_result(w: XdrWriter, v: InnerTransactionResult_result): void {
  writeTransactionResultCode(w, v.code)
  switch (v.code) {
    case 'txSUCCESS':
    case 'txFAILED':
      writeVarArray(w, (v as any).results, UINT32_MAX, writeOperationResult); break
    case 'txTOO_EARLY':
    case 'txTOO_LATE':
    case 'txMISSING_OPERATION':
    case 'txBAD_SEQ':
    case 'txBAD_AUTH':
    case 'txINSUFFICIENT_BALANCE':
    case 'txNO_ACCOUNT':
    case 'txINSUFFICIENT_FEE':
    case 'txBAD_AUTH_EXTRA':
    case 'txINTERNAL_ERROR':
    case 'txNOT_SUPPORTED':
    case 'txBAD_SPONSORSHIP':
    case 'txBAD_MIN_SEQ_AGE_OR_GAP':
    case 'txMALFORMED':
    case 'txSOROBAN_INVALID':
      break
  }
}

export function encodeInnerTransactionResult_result(v: InnerTransactionResult_result): Uint8Array {
  return encode(v, writeInnerTransactionResult_result)
}

export function decodeInnerTransactionResult_result(input: Uint8Array | string): InnerTransactionResult_result {
  return decode(input, readInnerTransactionResult_result)
}

export function toJsonInnerTransactionResult_result(v: InnerTransactionResult_result): unknown {
  switch (v.code) {
    case 'txSUCCESS':
      return { 'txsuccess': (v as any).results.map((item: any) => toJsonOperationResult(item)) }
    case 'txFAILED':
      return { 'txfailed': (v as any).results.map((item: any) => toJsonOperationResult(item)) }
    case 'txTOO_EARLY':
      return 'txtoo_early'
    case 'txTOO_LATE':
      return 'txtoo_late'
    case 'txMISSING_OPERATION':
      return 'txmissing_operation'
    case 'txBAD_SEQ':
      return 'txbad_seq'
    case 'txBAD_AUTH':
      return 'txbad_auth'
    case 'txINSUFFICIENT_BALANCE':
      return 'txinsufficient_balance'
    case 'txNO_ACCOUNT':
      return 'txno_account'
    case 'txINSUFFICIENT_FEE':
      return 'txinsufficient_fee'
    case 'txBAD_AUTH_EXTRA':
      return 'txbad_auth_extra'
    case 'txINTERNAL_ERROR':
      return 'txinternal_error'
    case 'txNOT_SUPPORTED':
      return 'txnot_supported'
    case 'txBAD_SPONSORSHIP':
      return 'txbad_sponsorship'
    case 'txBAD_MIN_SEQ_AGE_OR_GAP':
      return 'txbad_min_seq_age_or_gap'
    case 'txMALFORMED':
      return 'txmalformed'
    case 'txSOROBAN_INVALID':
      return 'txsoroban_invalid'
  }
}

export function fromJsonInnerTransactionResult_result(json: unknown): InnerTransactionResult_result {
  if (typeof json === 'string') {
    if (json === 'txtoo_early') return { code: 'txTOO_EARLY' } as InnerTransactionResult_result
    if (json === 'txtoo_late') return { code: 'txTOO_LATE' } as InnerTransactionResult_result
    if (json === 'txmissing_operation') return { code: 'txMISSING_OPERATION' } as InnerTransactionResult_result
    if (json === 'txbad_seq') return { code: 'txBAD_SEQ' } as InnerTransactionResult_result
    if (json === 'txbad_auth') return { code: 'txBAD_AUTH' } as InnerTransactionResult_result
    if (json === 'txinsufficient_balance') return { code: 'txINSUFFICIENT_BALANCE' } as InnerTransactionResult_result
    if (json === 'txno_account') return { code: 'txNO_ACCOUNT' } as InnerTransactionResult_result
    if (json === 'txinsufficient_fee') return { code: 'txINSUFFICIENT_FEE' } as InnerTransactionResult_result
    if (json === 'txbad_auth_extra') return { code: 'txBAD_AUTH_EXTRA' } as InnerTransactionResult_result
    if (json === 'txinternal_error') return { code: 'txINTERNAL_ERROR' } as InnerTransactionResult_result
    if (json === 'txnot_supported') return { code: 'txNOT_SUPPORTED' } as InnerTransactionResult_result
    if (json === 'txbad_sponsorship') return { code: 'txBAD_SPONSORSHIP' } as InnerTransactionResult_result
    if (json === 'txbad_min_seq_age_or_gap') return { code: 'txBAD_MIN_SEQ_AGE_OR_GAP' } as InnerTransactionResult_result
    if (json === 'txmalformed') return { code: 'txMALFORMED' } as InnerTransactionResult_result
    if (json === 'txsoroban_invalid') return { code: 'txSOROBAN_INVALID' } as InnerTransactionResult_result
    throw new Error(`Unknown InnerTransactionResult_result variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'txsuccess':
      return { code: 'txSUCCESS', results: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonOperationResult(item)) } as InnerTransactionResult_result
    case 'txfailed':
      return { code: 'txFAILED', results: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonOperationResult(item)) } as InnerTransactionResult_result
    default: throw new Error(`Unknown InnerTransactionResult_result variant: ${key}`)
  }
}

export type InnerTransactionResult_ext =
  | { readonly v: 0 }

export function readInnerTransactionResult_ext(r: XdrReader): InnerTransactionResult_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: InnerTransactionResult_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown InnerTransactionResult_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeInnerTransactionResult_ext(w: XdrWriter, v: InnerTransactionResult_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeInnerTransactionResult_ext(v: InnerTransactionResult_ext): Uint8Array {
  return encode(v, writeInnerTransactionResult_ext)
}

export function decodeInnerTransactionResult_ext(input: Uint8Array | string): InnerTransactionResult_ext {
  return decode(input, readInnerTransactionResult_ext)
}

export function toJsonInnerTransactionResult_ext(v: InnerTransactionResult_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonInnerTransactionResult_ext(json: unknown): InnerTransactionResult_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as InnerTransactionResult_ext
    throw new Error(`Unknown InnerTransactionResult_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown InnerTransactionResult_ext variant: ${key}`)
  }
}

/**
 * InnerTransactionResult must be binary compatible with TransactionResult
 * because it is be used to represent the result of a Transaction.
 */
export interface InnerTransactionResult {
  /** Always 0. Here for binary compatibility. */
  readonly feeCharged: int64
  readonly result: InnerTransactionResult_result
  /** reserved for future use */
  readonly ext: InnerTransactionResult_ext
}

export function readInnerTransactionResult(r: XdrReader): InnerTransactionResult {
  beginComposite(r)
  try {
    const feeCharged = readint64(r)
    const result = readInnerTransactionResult_result(r)
    const ext = readInnerTransactionResult_ext(r)
    return { feeCharged, result, ext }
  } finally {
    endComposite(r)
  }
}

export function writeInnerTransactionResult(w: XdrWriter, v: InnerTransactionResult): void {
  writeint64(w, v.feeCharged)
  writeInnerTransactionResult_result(w, v.result)
  writeInnerTransactionResult_ext(w, v.ext)
}

export function encodeInnerTransactionResult(v: InnerTransactionResult): Uint8Array {
  return encode(v, writeInnerTransactionResult)
}

export function decodeInnerTransactionResult(input: Uint8Array | string): InnerTransactionResult {
  return decode(input, readInnerTransactionResult)
}

export function toJsonInnerTransactionResult(v: InnerTransactionResult): Record<string, unknown> {
  return {
    'fee_charged': toJsonint64(v.feeCharged),
    'result': toJsonInnerTransactionResult_result(v.result),
    'ext': toJsonInnerTransactionResult_ext(v.ext),
  }
}

export function fromJsonInnerTransactionResult(json: unknown): InnerTransactionResult {
  const o = json as Record<string, unknown>
  return {
    feeCharged: fromJsonint64(o['fee_charged']),
    result: fromJsonInnerTransactionResult_result(o['result']),
    ext: fromJsonInnerTransactionResult_ext(o['ext']),
  }
}

export interface InnerTransactionResultPair {
  readonly transactionHash: Hash
  /** hash of the inner transaction */
  readonly result: InnerTransactionResult
}

export function readInnerTransactionResultPair(r: XdrReader): InnerTransactionResultPair {
  beginComposite(r)
  try {
    const transactionHash = readHash(r)
    const result = readInnerTransactionResult(r)
    return { transactionHash, result }
  } finally {
    endComposite(r)
  }
}

export function writeInnerTransactionResultPair(w: XdrWriter, v: InnerTransactionResultPair): void {
  writeHash(w, v.transactionHash)
  writeInnerTransactionResult(w, v.result)
}

export function encodeInnerTransactionResultPair(v: InnerTransactionResultPair): Uint8Array {
  return encode(v, writeInnerTransactionResultPair)
}

export function decodeInnerTransactionResultPair(input: Uint8Array | string): InnerTransactionResultPair {
  return decode(input, readInnerTransactionResultPair)
}

export function toJsonInnerTransactionResultPair(v: InnerTransactionResultPair): Record<string, unknown> {
  return {
    'transaction_hash': toJsonHash(v.transactionHash),
    'result': toJsonInnerTransactionResult(v.result),
  }
}

export function fromJsonInnerTransactionResultPair(json: unknown): InnerTransactionResultPair {
  const o = json as Record<string, unknown>
  return {
    transactionHash: fromJsonHash(o['transaction_hash']),
    result: fromJsonInnerTransactionResult(o['result']),
  }
}

export type TransactionResult_result =
  | { readonly code: 'txFEE_BUMP_INNER_SUCCESS'; readonly innerResultPair: InnerTransactionResultPair }
  | { readonly code: 'txFEE_BUMP_INNER_FAILED'; readonly innerResultPair: InnerTransactionResultPair }
  | { readonly code: 'txSUCCESS'; readonly results: OperationResult[] }
  | { readonly code: 'txFAILED'; readonly results: OperationResult[] }
  | { readonly code: 'txTOO_EARLY' }
  | { readonly code: 'txTOO_LATE' }
  | { readonly code: 'txMISSING_OPERATION' }
  | { readonly code: 'txBAD_SEQ' }
  | { readonly code: 'txBAD_AUTH' }
  | { readonly code: 'txINSUFFICIENT_BALANCE' }
  | { readonly code: 'txNO_ACCOUNT' }
  | { readonly code: 'txINSUFFICIENT_FEE' }
  | { readonly code: 'txBAD_AUTH_EXTRA' }
  | { readonly code: 'txINTERNAL_ERROR' }
  | { readonly code: 'txNOT_SUPPORTED' }
  | { readonly code: 'txBAD_SPONSORSHIP' }
  | { readonly code: 'txBAD_MIN_SEQ_AGE_OR_GAP' }
  | { readonly code: 'txMALFORMED' }
  | { readonly code: 'txSOROBAN_INVALID' }

export function readTransactionResult_result(r: XdrReader): TransactionResult_result {
  beginComposite(r)
  try {
    const code = readTransactionResultCode(r)
    let result: TransactionResult_result
    switch (code) {
      case 'txFEE_BUMP_INNER_SUCCESS':
      case 'txFEE_BUMP_INNER_FAILED':
        result = { code, innerResultPair: readInnerTransactionResultPair(r) }; break
      case 'txSUCCESS':
      case 'txFAILED':
        result = { code, results: readVarArray(r, UINT32_MAX, readOperationResult) }; break
      case 'txTOO_EARLY':
      case 'txTOO_LATE':
      case 'txMISSING_OPERATION':
      case 'txBAD_SEQ':
      case 'txBAD_AUTH':
      case 'txINSUFFICIENT_BALANCE':
      case 'txNO_ACCOUNT':
      case 'txINSUFFICIENT_FEE':
      case 'txBAD_AUTH_EXTRA':
      case 'txINTERNAL_ERROR':
      case 'txNOT_SUPPORTED':
      case 'txBAD_SPONSORSHIP':
      case 'txBAD_MIN_SEQ_AGE_OR_GAP':
      case 'txMALFORMED':
      case 'txSOROBAN_INVALID':
        result = { code }; break
      default:
        throw new XdrReadError(`Unknown TransactionResult_result discriminant: ${code}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTransactionResult_result(w: XdrWriter, v: TransactionResult_result): void {
  writeTransactionResultCode(w, v.code)
  switch (v.code) {
    case 'txFEE_BUMP_INNER_SUCCESS':
    case 'txFEE_BUMP_INNER_FAILED':
      writeInnerTransactionResultPair(w, (v as any).innerResultPair); break
    case 'txSUCCESS':
    case 'txFAILED':
      writeVarArray(w, (v as any).results, UINT32_MAX, writeOperationResult); break
    case 'txTOO_EARLY':
    case 'txTOO_LATE':
    case 'txMISSING_OPERATION':
    case 'txBAD_SEQ':
    case 'txBAD_AUTH':
    case 'txINSUFFICIENT_BALANCE':
    case 'txNO_ACCOUNT':
    case 'txINSUFFICIENT_FEE':
    case 'txBAD_AUTH_EXTRA':
    case 'txINTERNAL_ERROR':
    case 'txNOT_SUPPORTED':
    case 'txBAD_SPONSORSHIP':
    case 'txBAD_MIN_SEQ_AGE_OR_GAP':
    case 'txMALFORMED':
    case 'txSOROBAN_INVALID':
      break
  }
}

export function encodeTransactionResult_result(v: TransactionResult_result): Uint8Array {
  return encode(v, writeTransactionResult_result)
}

export function decodeTransactionResult_result(input: Uint8Array | string): TransactionResult_result {
  return decode(input, readTransactionResult_result)
}

export function toJsonTransactionResult_result(v: TransactionResult_result): unknown {
  switch (v.code) {
    case 'txFEE_BUMP_INNER_SUCCESS':
      return { 'txfee_bump_inner_success': toJsonInnerTransactionResultPair((v as any).innerResultPair) }
    case 'txFEE_BUMP_INNER_FAILED':
      return { 'txfee_bump_inner_failed': toJsonInnerTransactionResultPair((v as any).innerResultPair) }
    case 'txSUCCESS':
      return { 'txsuccess': (v as any).results.map((item: any) => toJsonOperationResult(item)) }
    case 'txFAILED':
      return { 'txfailed': (v as any).results.map((item: any) => toJsonOperationResult(item)) }
    case 'txTOO_EARLY':
      return 'txtoo_early'
    case 'txTOO_LATE':
      return 'txtoo_late'
    case 'txMISSING_OPERATION':
      return 'txmissing_operation'
    case 'txBAD_SEQ':
      return 'txbad_seq'
    case 'txBAD_AUTH':
      return 'txbad_auth'
    case 'txINSUFFICIENT_BALANCE':
      return 'txinsufficient_balance'
    case 'txNO_ACCOUNT':
      return 'txno_account'
    case 'txINSUFFICIENT_FEE':
      return 'txinsufficient_fee'
    case 'txBAD_AUTH_EXTRA':
      return 'txbad_auth_extra'
    case 'txINTERNAL_ERROR':
      return 'txinternal_error'
    case 'txNOT_SUPPORTED':
      return 'txnot_supported'
    case 'txBAD_SPONSORSHIP':
      return 'txbad_sponsorship'
    case 'txBAD_MIN_SEQ_AGE_OR_GAP':
      return 'txbad_min_seq_age_or_gap'
    case 'txMALFORMED':
      return 'txmalformed'
    case 'txSOROBAN_INVALID':
      return 'txsoroban_invalid'
  }
}

export function fromJsonTransactionResult_result(json: unknown): TransactionResult_result {
  if (typeof json === 'string') {
    if (json === 'txtoo_early') return { code: 'txTOO_EARLY' } as TransactionResult_result
    if (json === 'txtoo_late') return { code: 'txTOO_LATE' } as TransactionResult_result
    if (json === 'txmissing_operation') return { code: 'txMISSING_OPERATION' } as TransactionResult_result
    if (json === 'txbad_seq') return { code: 'txBAD_SEQ' } as TransactionResult_result
    if (json === 'txbad_auth') return { code: 'txBAD_AUTH' } as TransactionResult_result
    if (json === 'txinsufficient_balance') return { code: 'txINSUFFICIENT_BALANCE' } as TransactionResult_result
    if (json === 'txno_account') return { code: 'txNO_ACCOUNT' } as TransactionResult_result
    if (json === 'txinsufficient_fee') return { code: 'txINSUFFICIENT_FEE' } as TransactionResult_result
    if (json === 'txbad_auth_extra') return { code: 'txBAD_AUTH_EXTRA' } as TransactionResult_result
    if (json === 'txinternal_error') return { code: 'txINTERNAL_ERROR' } as TransactionResult_result
    if (json === 'txnot_supported') return { code: 'txNOT_SUPPORTED' } as TransactionResult_result
    if (json === 'txbad_sponsorship') return { code: 'txBAD_SPONSORSHIP' } as TransactionResult_result
    if (json === 'txbad_min_seq_age_or_gap') return { code: 'txBAD_MIN_SEQ_AGE_OR_GAP' } as TransactionResult_result
    if (json === 'txmalformed') return { code: 'txMALFORMED' } as TransactionResult_result
    if (json === 'txsoroban_invalid') return { code: 'txSOROBAN_INVALID' } as TransactionResult_result
    throw new Error(`Unknown TransactionResult_result variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'txfee_bump_inner_success':
      return { code: 'txFEE_BUMP_INNER_SUCCESS', innerResultPair: fromJsonInnerTransactionResultPair(obj[key]) } as TransactionResult_result
    case 'txfee_bump_inner_failed':
      return { code: 'txFEE_BUMP_INNER_FAILED', innerResultPair: fromJsonInnerTransactionResultPair(obj[key]) } as TransactionResult_result
    case 'txsuccess':
      return { code: 'txSUCCESS', results: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonOperationResult(item)) } as TransactionResult_result
    case 'txfailed':
      return { code: 'txFAILED', results: ((obj[key]) as unknown[]).map((item: unknown) => fromJsonOperationResult(item)) } as TransactionResult_result
    default: throw new Error(`Unknown TransactionResult_result variant: ${key}`)
  }
}

export type TransactionResult_ext =
  | { readonly v: 0 }

export function readTransactionResult_ext(r: XdrReader): TransactionResult_ext {
  beginComposite(r)
  try {
    const v = readInt32(r)
    let result: TransactionResult_ext
    switch (v) {
      case 0:
        result = { v }; break
      default:
        throw new XdrReadError(`Unknown TransactionResult_ext discriminant: ${v}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeTransactionResult_ext(w: XdrWriter, v: TransactionResult_ext): void {
  writeInt32(w, v.v)
  switch (v.v) {
    case 0:
      break
  }
}

export function encodeTransactionResult_ext(v: TransactionResult_ext): Uint8Array {
  return encode(v, writeTransactionResult_ext)
}

export function decodeTransactionResult_ext(input: Uint8Array | string): TransactionResult_ext {
  return decode(input, readTransactionResult_ext)
}

export function toJsonTransactionResult_ext(v: TransactionResult_ext): unknown {
  switch (v.v) {
    case 0:
      return 'v0'
  }
}

export function fromJsonTransactionResult_ext(json: unknown): TransactionResult_ext {
  if (typeof json === 'string') {
    if (json === 'v0') return { v: 0 } as TransactionResult_ext
    throw new Error(`Unknown TransactionResult_ext variant: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    default: throw new Error(`Unknown TransactionResult_ext variant: ${key}`)
  }
}

export interface TransactionResult {
  readonly feeCharged: int64
  readonly result: TransactionResult_result
  /** reserved for future use */
  readonly ext: TransactionResult_ext
}

export function readTransactionResult(r: XdrReader): TransactionResult {
  beginComposite(r)
  try {
    const feeCharged = readint64(r)
    const result = readTransactionResult_result(r)
    const ext = readTransactionResult_ext(r)
    return { feeCharged, result, ext }
  } finally {
    endComposite(r)
  }
}

export function writeTransactionResult(w: XdrWriter, v: TransactionResult): void {
  writeint64(w, v.feeCharged)
  writeTransactionResult_result(w, v.result)
  writeTransactionResult_ext(w, v.ext)
}

export function encodeTransactionResult(v: TransactionResult): Uint8Array {
  return encode(v, writeTransactionResult)
}

export function decodeTransactionResult(input: Uint8Array | string): TransactionResult {
  return decode(input, readTransactionResult)
}

export function toJsonTransactionResult(v: TransactionResult): Record<string, unknown> {
  return {
    'fee_charged': toJsonint64(v.feeCharged),
    'result': toJsonTransactionResult_result(v.result),
    'ext': toJsonTransactionResult_ext(v.ext),
  }
}

export function fromJsonTransactionResult(json: unknown): TransactionResult {
  const o = json as Record<string, unknown>
  return {
    feeCharged: fromJsonint64(o['fee_charged']),
    result: fromJsonTransactionResult_result(o['result']),
    ext: fromJsonTransactionResult_ext(o['ext']),
  }
}
