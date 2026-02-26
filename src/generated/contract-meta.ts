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


export interface SCMetaV0 {
  readonly key: string
  readonly val: string
}

export function readSCMetaV0(r: XdrReader): SCMetaV0 {
  beginComposite(r)
  try {
    const key = readString(r, UINT32_MAX)
    const val = readString(r, UINT32_MAX)
    return { key, val }
  } finally {
    endComposite(r)
  }
}

export function writeSCMetaV0(w: XdrWriter, v: SCMetaV0): void {
  writeString(w, v.key, UINT32_MAX)
  writeString(w, v.val, UINT32_MAX)
}

export function encodeSCMetaV0(v: SCMetaV0): Uint8Array {
  return encode(v, writeSCMetaV0)
}

export function decodeSCMetaV0(input: Uint8Array | string): SCMetaV0 {
  return decode(input, readSCMetaV0)
}

export function toJsonSCMetaV0(v: SCMetaV0): Record<string, unknown> {
  return {
    'key': escapeXdrString(v.key),
    'val': escapeXdrString(v.val),
  }
}

export function fromJsonSCMetaV0(json: unknown): SCMetaV0 {
  const o = json as Record<string, unknown>
  return {
    key: unescapeXdrString((o['key']) as string),
    val: unescapeXdrString((o['val']) as string),
  }
}

export type SCMetaKind =
  | 'SC_META_V0'

export const S_C_META_KIND_TO_INT: Record<SCMetaKind, number> = /*#__PURE__*/ {
  SC_META_V0: 0,
}

export const S_C_META_KIND_FROM_INT: Record<number, SCMetaKind> = /*#__PURE__*/ {
  0: 'SC_META_V0',
}

export function readSCMetaKind(r: XdrReader): SCMetaKind {
  const v = readInt32(r)
  const result = S_C_META_KIND_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCMetaKind value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCMetaKind(w: XdrWriter, v: SCMetaKind): void {
  writeInt32(w, S_C_META_KIND_TO_INT[v])
}

export function encodeSCMetaKind(v: SCMetaKind): Uint8Array {
  return encode(v, writeSCMetaKind)
}

export function decodeSCMetaKind(input: Uint8Array | string): SCMetaKind {
  return decode(input, readSCMetaKind)
}

const _S_C_META_KIND_TO_JSON: Record<SCMetaKind, string> = /*#__PURE__*/ {
  SC_META_V0: 'sc_meta_v0',
}

const _S_C_META_KIND_FROM_JSON: Record<string, SCMetaKind> = /*#__PURE__*/ {
  'sc_meta_v0': 'SC_META_V0',
}

export function toJsonSCMetaKind(v: SCMetaKind): string {
  return _S_C_META_KIND_TO_JSON[v]
}

export function fromJsonSCMetaKind(json: unknown): SCMetaKind {
  const result = _S_C_META_KIND_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCMetaKind JSON value: ${json}`)
  return result
}

export type SCMetaEntry =
  | { readonly kind: 'SC_META_V0'; readonly v0: SCMetaV0 }

export function readSCMetaEntry(r: XdrReader): SCMetaEntry {
  beginComposite(r)
  try {
    const kind = readSCMetaKind(r)
    let result: SCMetaEntry
    switch (kind) {
      case 'SC_META_V0':
        result = { kind, v0: readSCMetaV0(r) }; break
      default:
        throw new XdrReadError(`Unknown SCMetaEntry discriminant: ${kind}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSCMetaEntry(w: XdrWriter, v: SCMetaEntry): void {
  writeSCMetaKind(w, v.kind)
  switch (v.kind) {
    case 'SC_META_V0':
      writeSCMetaV0(w, (v as any).v0); break
  }
}

export function encodeSCMetaEntry(v: SCMetaEntry): Uint8Array {
  return encode(v, writeSCMetaEntry)
}

export function decodeSCMetaEntry(input: Uint8Array | string): SCMetaEntry {
  return decode(input, readSCMetaEntry)
}

export function toJsonSCMetaEntry(v: SCMetaEntry): unknown {
  switch (v.kind) {
    case 'SC_META_V0':
      return { 'sc_meta_v0': toJsonSCMetaV0((v as any).v0) }
  }
}

export function fromJsonSCMetaEntry(json: unknown): SCMetaEntry {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for SCMetaEntry: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'sc_meta_v0':
      return { kind: 'SC_META_V0', v0: fromJsonSCMetaV0(obj[key]) } as SCMetaEntry
    default: throw new Error(`Unknown SCMetaEntry variant: ${key}`)
  }
}
