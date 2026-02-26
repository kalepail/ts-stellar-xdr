/**
 * Utility helpers for common XDR operations.
 *
 * These build on the generated types to provide higher-level functionality
 * that every SDK needs: LedgerEntry→LedgerKey extraction, transaction
 * envelope wrapping, and Soroban auth extraction.
 */

import type {
  LedgerEntry_data,
  LedgerKey,
} from './generated/ledger-entries.js'

import type {
  Transaction,
  TransactionEnvelope,
  TransactionV1Envelope,
  FeeBumpTransaction,
  SorobanAuthorizationEntry,
} from './generated/transaction.js'

import {
  encodeTransaction,
  encodeFeeBumpTransaction,
} from './generated/transaction.js'

import { sha256 } from './hashing.js'
import { createWriter, toBytes, writeInt32 } from './codec.js'

// ---------------------------------------------------------------------------
// LedgerEntry → LedgerKey extraction
// ---------------------------------------------------------------------------

/**
 * Extract the minimal `LedgerKey` from a `LedgerEntry_data`.
 *
 * Dispatches on entry type and copies only the key fields needed to
 * identify the entry. Essential for building Soroban footprints, indexing
 * ledger state, and deduplicating entries.
 */
export function ledgerEntryToKey(data: LedgerEntry_data): LedgerKey {
  switch (data.type) {
    case 'ACCOUNT':
      return { type: 'ACCOUNT', account: { accountID: data.account.accountID } }
    case 'TRUSTLINE':
      return { type: 'TRUSTLINE', trustLine: { accountID: data.trustLine.accountID, asset: data.trustLine.asset } }
    case 'OFFER':
      return { type: 'OFFER', offer: { sellerID: data.offer.sellerID, offerID: data.offer.offerID } }
    case 'DATA':
      return { type: 'DATA', data: { accountID: data.data.accountID, dataName: data.data.dataName } }
    case 'CLAIMABLE_BALANCE':
      return { type: 'CLAIMABLE_BALANCE', claimableBalance: { balanceID: data.claimableBalance.balanceID } }
    case 'LIQUIDITY_POOL':
      return { type: 'LIQUIDITY_POOL', liquidityPool: { liquidityPoolID: data.liquidityPool.liquidityPoolID } }
    case 'CONTRACT_DATA':
      return { type: 'CONTRACT_DATA', contractData: { contract: data.contractData.contract, key: data.contractData.key, durability: data.contractData.durability } }
    case 'CONTRACT_CODE':
      return { type: 'CONTRACT_CODE', contractCode: { hash: data.contractCode.hash } }
    case 'CONFIG_SETTING':
      return { type: 'CONFIG_SETTING', configSetting: { configSettingID: data.configSetting.configSettingID } }
    case 'TTL':
      return { type: 'TTL', ttl: { keyHash: data.ttl.keyHash } }
  }
}

// ---------------------------------------------------------------------------
// Transaction envelope helpers
// ---------------------------------------------------------------------------

/** Envelope type values for signature payload construction. */
const ENVELOPE_TYPE_TX = 2
const ENVELOPE_TYPE_TX_FEE_BUMP = 5

/**
 * Wrap a `Transaction` in an unsigned V1 `TransactionEnvelope`.
 */
export function transactionToEnvelope(tx: Transaction): TransactionEnvelope {
  return {
    type: 'ENVELOPE_TYPE_TX',
    v1: { tx, signatures: [] },
  }
}

/**
 * Wrap a `FeeBumpTransaction` in an unsigned `TransactionEnvelope`.
 */
export function feeBumpTransactionToEnvelope(tx: FeeBumpTransaction): TransactionEnvelope {
  return {
    type: 'ENVELOPE_TYPE_TX_FEE_BUMP',
    feeBump: { tx, signatures: [] },
  }
}

/**
 * Hash a `TransactionEnvelope` — returns the hash that signatures are computed over.
 *
 * Dispatches on envelope type:
 * - V0: converts to V1 format then hashes as ENVELOPE_TYPE_TX
 * - V1: hashes as ENVELOPE_TYPE_TX
 * - FeeBump: hashes as ENVELOPE_TYPE_TX_FEE_BUMP
 */
export function hashTransactionEnvelope(
  envelope: TransactionEnvelope,
  networkPassphrase: string,
): Uint8Array {
  switch (envelope.type) {
    case 'ENVELOPE_TYPE_TX_V0': {
      // V0 envelopes hash as ENVELOPE_TYPE_TX with the source account
      // converted from raw ed25519 to a full PublicKey
      const v0tx = envelope.v0.tx
      const tx: Transaction = {
        sourceAccount: { type: 'KEY_TYPE_ED25519', ed25519: v0tx.sourceAccountEd25519 },
        fee: v0tx.fee,
        seqNum: v0tx.seqNum,
        cond: v0tx.timeBounds
          ? { type: 'PRECOND_TIME', timeBounds: v0tx.timeBounds }
          : { type: 'PRECOND_NONE' },
        memo: v0tx.memo,
        operations: v0tx.operations,
        ext: { v: 0 },
      }
      return sha256(signaturePayload(networkPassphrase, ENVELOPE_TYPE_TX, encodeTransaction(tx)))
    }
    case 'ENVELOPE_TYPE_TX':
      return sha256(signaturePayload(networkPassphrase, ENVELOPE_TYPE_TX, encodeTransaction(envelope.v1.tx)))
    case 'ENVELOPE_TYPE_TX_FEE_BUMP':
      return sha256(signaturePayload(networkPassphrase, ENVELOPE_TYPE_TX_FEE_BUMP, encodeFeeBumpTransaction(envelope.feeBump.tx)))
  }
}

// ---------------------------------------------------------------------------
// Soroban auth extraction
// ---------------------------------------------------------------------------

/**
 * Extract all `SorobanAuthorizationEntry` values from a `TransactionEnvelope`.
 *
 * Looks for `INVOKE_HOST_FUNCTION` operations and collects their `auth` arrays.
 * Returns an empty array if the envelope contains no Soroban operations.
 */
export function extractSorobanAuths(envelope: TransactionEnvelope): SorobanAuthorizationEntry[] {
  let ops: { readonly body: { readonly type: string; readonly invokeHostFunctionOp?: { readonly auth: SorobanAuthorizationEntry[] } } }[]

  switch (envelope.type) {
    case 'ENVELOPE_TYPE_TX_V0':
      ops = envelope.v0.tx.operations
      break
    case 'ENVELOPE_TYPE_TX':
      ops = envelope.v1.tx.operations
      break
    case 'ENVELOPE_TYPE_TX_FEE_BUMP':
      // Fee bump inner tx is always V1
      ops = envelope.feeBump.tx.innerTx.v1.tx.operations
      break
  }

  const result: SorobanAuthorizationEntry[] = []
  for (const op of ops) {
    if (op.body.type === 'INVOKE_HOST_FUNCTION') {
      result.push(...(op.body as any).invokeHostFunctionOp.auth)
    }
  }
  return result
}

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

function signaturePayload(
  networkPassphrase: string,
  envelopeType: number,
  taggedXdr: Uint8Array,
): Uint8Array {
  const netId = sha256(networkPassphrase)
  const w = createWriter(32 + 4 + taggedXdr.length)
  w.buf.set(netId, w.pos)
  w.pos += 32
  writeInt32(w, envelopeType)
  w.buf.set(taggedXdr, w.pos)
  w.pos += taggedXdr.length
  return toBytes(w)
}
