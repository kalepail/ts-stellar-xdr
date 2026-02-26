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

import type { LedgerCloseMeta } from './ledger.js'
import { readLedgerCloseMeta, writeLedgerCloseMeta, toJsonLedgerCloseMeta, fromJsonLedgerCloseMeta } from './ledger.js'
import type { uint32 } from './types.js'
import { readuint32, writeuint32, toJsonuint32, fromJsonuint32 } from './types.js'


/** Batch of ledgers along with their transaction metadata */
export interface LedgerCloseMetaBatch {
  /** starting ledger sequence number in the batch */
  readonly startSequence: uint32
  /** ending ledger sequence number in the batch */
  readonly endSequence: uint32
  /** Ledger close meta for each ledger within the batch */
  readonly ledgerCloseMetas: LedgerCloseMeta[]
}

export function readLedgerCloseMetaBatch(r: XdrReader): LedgerCloseMetaBatch {
  beginComposite(r)
  try {
    const startSequence = readuint32(r)
    const endSequence = readuint32(r)
    const ledgerCloseMetas = readVarArray(r, UINT32_MAX, readLedgerCloseMeta)
    return { startSequence, endSequence, ledgerCloseMetas }
  } finally {
    endComposite(r)
  }
}

export function writeLedgerCloseMetaBatch(w: XdrWriter, v: LedgerCloseMetaBatch): void {
  writeuint32(w, v.startSequence)
  writeuint32(w, v.endSequence)
  writeVarArray(w, v.ledgerCloseMetas, UINT32_MAX, writeLedgerCloseMeta)
}

export function encodeLedgerCloseMetaBatch(v: LedgerCloseMetaBatch): Uint8Array {
  return encode(v, writeLedgerCloseMetaBatch)
}

export function decodeLedgerCloseMetaBatch(input: Uint8Array | string): LedgerCloseMetaBatch {
  return decode(input, readLedgerCloseMetaBatch)
}

export function toJsonLedgerCloseMetaBatch(v: LedgerCloseMetaBatch): Record<string, unknown> {
  return {
    'start_sequence': toJsonuint32(v.startSequence),
    'end_sequence': toJsonuint32(v.endSequence),
    'ledger_close_metas': v.ledgerCloseMetas.map((item: any) => toJsonLedgerCloseMeta(item)),
  }
}

export function fromJsonLedgerCloseMetaBatch(json: unknown): LedgerCloseMetaBatch {
  const o = json as Record<string, unknown>
  return {
    startSequence: fromJsonuint32(o['start_sequence']),
    endSequence: fromJsonuint32(o['end_sequence']),
    ledgerCloseMetas: ((o['ledger_close_metas']) as unknown[]).map((item: unknown) => fromJsonLedgerCloseMeta(item)),
  }
}
