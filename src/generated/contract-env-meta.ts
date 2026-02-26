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

import type { uint32 } from './types.js'
import { readuint32, writeuint32, toJsonuint32, fromJsonuint32 } from './types.js'


export type SCEnvMetaKind =
  | 'SC_ENV_META_KIND_INTERFACE_VERSION'

export const S_C_ENV_META_KIND_TO_INT: Record<SCEnvMetaKind, number> = /*#__PURE__*/ {
  SC_ENV_META_KIND_INTERFACE_VERSION: 0,
}

export const S_C_ENV_META_KIND_FROM_INT: Record<number, SCEnvMetaKind> = /*#__PURE__*/ {
  0: 'SC_ENV_META_KIND_INTERFACE_VERSION',
}

export function readSCEnvMetaKind(r: XdrReader): SCEnvMetaKind {
  const v = readInt32(r)
  const result = S_C_ENV_META_KIND_FROM_INT[v]
  if (result === undefined) throw new XdrReadError(`Unknown SCEnvMetaKind value: ${v}`, 'INVALID_ENUM_VALUE')
  return result
}

export function writeSCEnvMetaKind(w: XdrWriter, v: SCEnvMetaKind): void {
  writeInt32(w, S_C_ENV_META_KIND_TO_INT[v])
}

export function encodeSCEnvMetaKind(v: SCEnvMetaKind): Uint8Array {
  return encode(v, writeSCEnvMetaKind)
}

export function decodeSCEnvMetaKind(input: Uint8Array | string): SCEnvMetaKind {
  return decode(input, readSCEnvMetaKind)
}

const _S_C_ENV_META_KIND_TO_JSON: Record<SCEnvMetaKind, string> = /*#__PURE__*/ {
  SC_ENV_META_KIND_INTERFACE_VERSION: 'sc_env_meta_kind_interface_version',
}

const _S_C_ENV_META_KIND_FROM_JSON: Record<string, SCEnvMetaKind> = /*#__PURE__*/ {
  'sc_env_meta_kind_interface_version': 'SC_ENV_META_KIND_INTERFACE_VERSION',
}

export function toJsonSCEnvMetaKind(v: SCEnvMetaKind): string {
  return _S_C_ENV_META_KIND_TO_JSON[v]
}

export function fromJsonSCEnvMetaKind(json: unknown): SCEnvMetaKind {
  const result = _S_C_ENV_META_KIND_FROM_JSON[json as string]
  if (result === undefined) throw new Error(`Unknown SCEnvMetaKind JSON value: ${json}`)
  return result
}

export interface SCEnvMetaEntry_interfaceVersion {
  readonly protocol: uint32
  readonly preRelease: uint32
}

export function readSCEnvMetaEntry_interfaceVersion(r: XdrReader): SCEnvMetaEntry_interfaceVersion {
  beginComposite(r)
  try {
    const protocol = readuint32(r)
    const preRelease = readuint32(r)
    return { protocol, preRelease }
  } finally {
    endComposite(r)
  }
}

export function writeSCEnvMetaEntry_interfaceVersion(w: XdrWriter, v: SCEnvMetaEntry_interfaceVersion): void {
  writeuint32(w, v.protocol)
  writeuint32(w, v.preRelease)
}

export function encodeSCEnvMetaEntry_interfaceVersion(v: SCEnvMetaEntry_interfaceVersion): Uint8Array {
  return encode(v, writeSCEnvMetaEntry_interfaceVersion)
}

export function decodeSCEnvMetaEntry_interfaceVersion(input: Uint8Array | string): SCEnvMetaEntry_interfaceVersion {
  return decode(input, readSCEnvMetaEntry_interfaceVersion)
}

export function toJsonSCEnvMetaEntry_interfaceVersion(v: SCEnvMetaEntry_interfaceVersion): Record<string, unknown> {
  return {
    'protocol': toJsonuint32(v.protocol),
    'pre_release': toJsonuint32(v.preRelease),
  }
}

export function fromJsonSCEnvMetaEntry_interfaceVersion(json: unknown): SCEnvMetaEntry_interfaceVersion {
  const o = json as Record<string, unknown>
  return {
    protocol: fromJsonuint32(o['protocol']),
    preRelease: fromJsonuint32(o['pre_release']),
  }
}

export type SCEnvMetaEntry =
  | { readonly kind: 'SC_ENV_META_KIND_INTERFACE_VERSION'; readonly interfaceVersion: SCEnvMetaEntry_interfaceVersion }

export function readSCEnvMetaEntry(r: XdrReader): SCEnvMetaEntry {
  beginComposite(r)
  try {
    const kind = readSCEnvMetaKind(r)
    let result: SCEnvMetaEntry
    switch (kind) {
      case 'SC_ENV_META_KIND_INTERFACE_VERSION':
        result = { kind, interfaceVersion: readSCEnvMetaEntry_interfaceVersion(r) }; break
      default:
        throw new XdrReadError(`Unknown SCEnvMetaEntry discriminant: ${kind}`, 'INVALID_UNION_DISCRIMINANT')
    }
    return result
  } finally {
    endComposite(r)
  }
}

export function writeSCEnvMetaEntry(w: XdrWriter, v: SCEnvMetaEntry): void {
  writeSCEnvMetaKind(w, v.kind)
  switch (v.kind) {
    case 'SC_ENV_META_KIND_INTERFACE_VERSION':
      writeSCEnvMetaEntry_interfaceVersion(w, (v as any).interfaceVersion); break
  }
}

export function encodeSCEnvMetaEntry(v: SCEnvMetaEntry): Uint8Array {
  return encode(v, writeSCEnvMetaEntry)
}

export function decodeSCEnvMetaEntry(input: Uint8Array | string): SCEnvMetaEntry {
  return decode(input, readSCEnvMetaEntry)
}

export function toJsonSCEnvMetaEntry(v: SCEnvMetaEntry): unknown {
  switch (v.kind) {
    case 'SC_ENV_META_KIND_INTERFACE_VERSION':
      return { 'sc_env_meta_kind_interface_version': toJsonSCEnvMetaEntry_interfaceVersion((v as any).interfaceVersion) }
  }
}

export function fromJsonSCEnvMetaEntry(json: unknown): SCEnvMetaEntry {
  if (typeof json === 'string') {
    throw new Error(`Unexpected string for SCEnvMetaEntry: ${json}`)
  }
  const obj = json as Record<string, unknown>
  const key = unionKey(obj)
  switch (key) {
    case 'sc_env_meta_kind_interface_version':
      return { kind: 'SC_ENV_META_KIND_INTERFACE_VERSION', interfaceVersion: fromJsonSCEnvMetaEntry_interfaceVersion(obj[key]) } as SCEnvMetaEntry
    default: throw new Error(`Unknown SCEnvMetaEntry variant: ${key}`)
  }
}
