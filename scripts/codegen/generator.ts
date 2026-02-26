/**
 * XDR AST → TypeScript source code generator
 *
 * Takes a parsed XDR AST (array of XdrDefinition nodes) and produces
 * TypeScript source with:
 *   1. TypeScript TYPE definitions (interfaces, type aliases, string literal unions)
 *   2. XDR CODEC functions (read* and write* functions)
 *   3. Convenience encode/decode helpers
 *   4. JSON serialization functions (toJson* / fromJson*)
 */

import type {
  XdrDefinition,
  XdrConst,
  XdrTypedef,
  XdrEnum,
  XdrStruct,
  XdrUnion,
  XdrTypeRef,
} from './ast.js'

// ---------------------------------------------------------------------------
// Output interface
// ---------------------------------------------------------------------------

export interface GeneratorOutput {
  filename: string
  content: string
}

// ---------------------------------------------------------------------------
// File header (codec imports only — cross-file imports are appended separately)
// ---------------------------------------------------------------------------

const CODEC_IMPORTS = `\
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
const UINT32_MAX = 0xffffffff`

// ---------------------------------------------------------------------------
// Identifier helpers
// ---------------------------------------------------------------------------

/**
 * JavaScript/TypeScript reserved words that cannot be used as variable names.
 * If an XDR field name collides with one of these, we suffix it with `_` for
 * use as a local variable (while keeping the property name in the struct).
 */
const JS_RESERVED_WORDS = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
  'default', 'delete', 'do', 'else', 'export', 'extends', 'false',
  'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof',
  'let', 'new', 'null', 'return', 'static', 'super', 'switch', 'this',
  'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with',
  'yield', 'enum', 'implements', 'interface', 'package', 'private',
  'protected', 'public', 'abstract', 'as', 'async', 'await', 'declare',
  'from', 'get', 'module', 'namespace', 'of', 'override', 'readonly',
  'require', 'set', 'type',
])

/**
 * Escape a field name for use as a local variable name.
 * If the name is a reserved word, append an underscore.
 */
function safeVarName(name: string): string {
  return JS_RESERVED_WORDS.has(name) ? `${name}_` : name
}

/**
 * Convert an XDR type name to a read function name.
 * e.g. TransactionEnvelope → readTransactionEnvelope
 *      Hash → readHash
 */
function toReadFnName(typeName: string): string {
  return `read${typeName}`
}

/**
 * Convert an XDR type name to a write function name.
 * e.g. TransactionEnvelope → writeTransactionEnvelope
 */
function toWriteFnName(typeName: string): string {
  return `write${typeName}`
}

/**
 * Convert an XDR type name to an encode function name.
 * e.g. TransactionEnvelope → encodeTransactionEnvelope
 */
function toEncodeFnName(typeName: string): string {
  return `encode${typeName}`
}

/**
 * Convert an XDR type name to a decode function name.
 * e.g. TransactionEnvelope → decodeTransactionEnvelope
 */
function toDecodeFnName(typeName: string): string {
  return `decode${typeName}`
}

/**
 * Convert an enum name (e.g. "OperationType") to the internal map name prefix.
 * e.g. OperationType → OPERATION_TYPE
 * Converts PascalCase to SCREAMING_SNAKE_CASE for the internal lookup table names.
 */
function toScreamingSnake(name: string): string {
  return name
    .replace(/([A-Z])/g, '_$1')
    .toUpperCase()
    .replace(/^_/, '')
}

// ---------------------------------------------------------------------------
// JSON naming helpers
// ---------------------------------------------------------------------------

/**
 * Types with custom JSON serialization (matching rs-stellar-xdr custom_str_impl).
 * These types serialize to a single string instead of their default struct/union form.
 */
const CUSTOM_JSON_TYPES = new Set([
  'PublicKey', 'MuxedAccount', 'AssetCode',
  'AssetCode4', 'AssetCode12', 'ContractID',
  'Int128Parts', 'UInt128Parts', 'Int256Parts', 'UInt256Parts',
  'SignerKey', 'SignerKey_ed25519SignedPayload',
  'SCAddress', 'ClaimableBalanceID', 'PoolID',
  'MuxedAccount_med25519', 'MuxedEd25519Account',
])

/**
 * Module-level registry: enum type name → common member prefix.
 * Computed by index.ts before generation starts.
 */
let _enumPrefixMap: Map<string, string> = new Map()

export function setEnumPrefixMap(map: Map<string, string>): void {
  _enumPrefixMap = map
}

/**
 * Compute the longest common prefix of enum member names (word-boundary aligned).
 * e.g. ['MEMO_NONE', 'MEMO_TEXT', 'MEMO_ID'] → 'MEMO_'
 *      ['CREATE_ACCOUNT', 'PAYMENT'] → '' (no common prefix)
 */
export function computeEnumPrefix(members: string[]): string {
  if (members.length < 2) return ''
  const wordArrays = members.map(m => m.split('_'))
  const minLen = Math.min(...wordArrays.map(a => a.length))

  let prefixLen = 0
  for (let i = 0; i < minLen; i++) {
    const word = wordArrays[0]![i]
    if (wordArrays.every(arr => arr[i] === word)) {
      prefixLen = i + 1
    } else {
      break
    }
  }

  // Don't strip all words from the shortest member
  if (prefixLen >= minLen) prefixLen = minLen - 1
  if (prefixLen <= 0) return ''

  return wordArrays[0]!.slice(0, prefixLen).join('_') + '_'
}

/**
 * Convert an enum member name to its JSON name by stripping the common prefix
 * and lowercasing. Matches rs-stellar-xdr serde(rename_all = "snake_case") behavior.
 */
function enumMemberJsonName(memberName: string, prefix: string): string {
  return memberName.slice(prefix.length).toLowerCase()
}

/**
 * Convert a camelCase XDR field name to snake_case for JSON struct keys.
 * Matches Ruby's .underscore used by xdrgen.
 */
function camelToSnakeCase(s: string): string {
  return s
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase()
}

/**
 * Get the JSON key name for a union arm case value.
 * - Enum-discriminated: stripped/lowercased enum member name
 * - Integer-discriminated: 'v' + number (e.g. 'v0', 'v1')
 */
function unionCaseJsonName(
  caseVal: string | number,
  isEnumDiscriminant: boolean,
  enumTypeName?: string,
): string {
  if (isEnumDiscriminant) {
    const prefix = _enumPrefixMap.get(enumTypeName!) ?? ''
    return enumMemberJsonName(String(caseVal), prefix)
  }
  return `v${caseVal}`
}

// ---------------------------------------------------------------------------
// JSON expression generation
// ---------------------------------------------------------------------------

/**
 * Generate a TypeScript expression that converts a value to its JSON form.
 * Used for struct fields, union arm values, array elements, etc.
 */
function toJsonExpr(ref: XdrTypeRef, val: string): string {
  switch (ref.kind) {
    case 'primitive':
      switch (ref.primitive) {
        case 'int':
        case 'unsigned int':
        case 'bool':
        case 'float':
        case 'double':
          return val
        case 'hyper':
        case 'unsigned hyper':
          return `String(${val})`
        case 'void':
          return 'undefined'
      }
      break
    case 'named':
      return `toJson${ref.name}(${val})`
    case 'opaque':
    case 'varOpaque':
      return `bytesToHex(${val})`
    case 'string':
      return `escapeXdrString(${val})`
    case 'fixedArray':
      return `${val}.map((item: any) => ${toJsonExpr(ref.elementType, 'item')})`
    case 'varArray':
      return `${val}.map((item: any) => ${toJsonExpr(ref.elementType, 'item')})`
    case 'optional':
      return `${val} !== undefined ? ${toJsonExpr(ref.elementType, val)} : null`
  }
}

/**
 * Generate a TypeScript expression that converts a JSON value back to the XDR type.
 */
function fromJsonExpr(ref: XdrTypeRef, json: string): string {
  switch (ref.kind) {
    case 'primitive':
      switch (ref.primitive) {
        case 'int':
        case 'unsigned int':
        case 'float':
        case 'double':
          return `(${json}) as number`
        case 'bool':
          return `(${json}) as boolean`
        case 'hyper':
        case 'unsigned hyper':
          return `BigInt((${json}) as string | number)`
        case 'void':
          return 'undefined'
      }
      break
    case 'named':
      return `fromJson${ref.name}(${json})`
    case 'opaque':
    case 'varOpaque':
      return `hexToBytes((${json}) as string)`
    case 'string':
      return `unescapeXdrString((${json}) as string)`
    case 'fixedArray':
      return `((${json}) as unknown[]).map((item: unknown) => ${fromJsonExpr(ref.elementType, 'item')})`
    case 'varArray':
      return `((${json}) as unknown[]).map((item: unknown) => ${fromJsonExpr(ref.elementType, 'item')})`
    case 'optional':
      return `(${json}) != null ? ${fromJsonExpr(ref.elementType, json)} : undefined`
  }
}

// ---------------------------------------------------------------------------
// TypeScript type generation from XdrTypeRef
// ---------------------------------------------------------------------------

/**
 * Map an XdrTypeRef to a TypeScript type string.
 */
function tsType(ref: XdrTypeRef): string {
  switch (ref.kind) {
    case 'primitive':
      switch (ref.primitive) {
        case 'int':
        case 'unsigned int':
        case 'float':
        case 'double':
          return 'number'
        case 'hyper':
        case 'unsigned hyper':
          return 'bigint'
        case 'bool':
          return 'boolean'
        case 'void':
          return 'void'
      }
      break
    case 'named':
      return ref.name
    case 'opaque':
      return 'Uint8Array'
    case 'varOpaque':
      return 'Uint8Array'
    case 'string':
      return 'string'
    case 'fixedArray': {
      const elem = tsType(ref.elementType)
      return `${elem}[]`
    }
    case 'varArray': {
      const elem = tsType(ref.elementType)
      return `${elem}[]`
    }
    case 'optional': {
      const elem = tsType(ref.elementType)
      return `${elem} | undefined`
    }
  }
}

// ---------------------------------------------------------------------------
// Read expression generation from XdrTypeRef
// ---------------------------------------------------------------------------

/**
 * Generate the read expression for a given XdrTypeRef.
 * Returns a string like `readInt32(r)` or `readFixedOpaque(r, 32)` etc.
 */
function readExpr(ref: XdrTypeRef, readerVar = 'r'): string {
  switch (ref.kind) {
    case 'primitive':
      switch (ref.primitive) {
        case 'int':
          return `readInt32(${readerVar})`
        case 'unsigned int':
          return `readUint32(${readerVar})`
        case 'hyper':
          return `readInt64(${readerVar})`
        case 'unsigned hyper':
          return `readUint64(${readerVar})`
        case 'bool':
          return `readBool(${readerVar})`
        case 'float':
          return `readFloat(${readerVar})`
        case 'double':
          return `readDouble(${readerVar})`
        case 'void':
          return '/* void */'
      }
      break
    case 'named':
      return `${toReadFnName(ref.name)}(${readerVar})`
    case 'opaque':
      return `readFixedOpaque(${readerVar}, ${ref.len})`
    case 'varOpaque':
      return `readVarOpaque(${readerVar}, ${ref.maxLen ?? 'UINT32_MAX'})`
    case 'string':
      return `readString(${readerVar}, ${ref.maxLen ?? 'UINT32_MAX'})`
    case 'fixedArray': {
      const readFn = readLambda(ref.elementType, readerVar)
      return `readFixedArray(${readerVar}, ${ref.len}, ${readFn})`
    }
    case 'varArray': {
      const readFn = readLambda(ref.elementType, readerVar)
      return `readVarArray(${readerVar}, ${ref.maxLen ?? 'UINT32_MAX'}, ${readFn})`
    }
    case 'optional': {
      const readFn = readLambda(ref.elementType, readerVar)
      return `readOptional(${readerVar}, ${readFn})`
    }
  }
}

/**
 * Generate a lambda or function reference for use as a readFn callback.
 * For simple named types, we can pass the function directly; for others we need a lambda.
 */
function readLambda(ref: XdrTypeRef, readerVar = 'r'): string {
  if (ref.kind === 'named') {
    return toReadFnName(ref.name)
  }
  if (ref.kind === 'primitive') {
    switch (ref.primitive) {
      case 'int':          return 'readInt32'
      case 'unsigned int': return 'readUint32'
      case 'hyper':        return 'readInt64'
      case 'unsigned hyper': return 'readUint64'
      case 'bool':         return 'readBool'
    }
  }
  // For complex types, generate a lambda
  return `(${readerVar}) => ${readExpr(ref, readerVar)}`
}

// ---------------------------------------------------------------------------
// Write statement generation from XdrTypeRef
// ---------------------------------------------------------------------------

/**
 * Generate the write statement for a given XdrTypeRef.
 * valueExpr is the TS expression for the value being written.
 */
function writeStmt(ref: XdrTypeRef, writerVar: string, valueExpr: string): string {
  switch (ref.kind) {
    case 'primitive':
      switch (ref.primitive) {
        case 'int':
          return `writeInt32(${writerVar}, ${valueExpr})`
        case 'unsigned int':
          return `writeUint32(${writerVar}, ${valueExpr})`
        case 'hyper':
          return `writeInt64(${writerVar}, ${valueExpr})`
        case 'unsigned hyper':
          return `writeUint64(${writerVar}, ${valueExpr})`
        case 'bool':
          return `writeBool(${writerVar}, ${valueExpr})`
        case 'float':
          return `writeFloat(${writerVar}, ${valueExpr})`
        case 'double':
          return `writeDouble(${writerVar}, ${valueExpr})`
        case 'void':
          return '/* void */'
      }
      break
    case 'named':
      return `${toWriteFnName(ref.name)}(${writerVar}, ${valueExpr})`
    case 'opaque':
      return `writeFixedOpaque(${writerVar}, ${valueExpr}, ${ref.len})`
    case 'varOpaque':
      return `writeVarOpaque(${writerVar}, ${valueExpr}, ${ref.maxLen ?? 'UINT32_MAX'})`
    case 'string':
      return `writeString(${writerVar}, ${valueExpr}, ${ref.maxLen ?? 'UINT32_MAX'})`
    case 'fixedArray': {
      const writeFn = writeLambda(ref.elementType, writerVar)
      return `writeFixedArray(${writerVar}, ${valueExpr}, ${ref.len}, ${writeFn})`
    }
    case 'varArray': {
      const writeFn = writeLambda(ref.elementType, writerVar)
      return `writeVarArray(${writerVar}, ${valueExpr}, ${ref.maxLen ?? 'UINT32_MAX'}, ${writeFn})`
    }
    case 'optional': {
      const writeFn = writeLambda(ref.elementType, writerVar)
      return `writeOptional(${writerVar}, ${valueExpr}, ${writeFn})`
    }
  }
}

/**
 * Generate a lambda or function reference for use as a writeFn callback.
 */
function writeLambda(ref: XdrTypeRef, writerVar = 'w'): string {
  if (ref.kind === 'named') {
    return toWriteFnName(ref.name)
  }
  if (ref.kind === 'primitive') {
    switch (ref.primitive) {
      case 'int':            return 'writeInt32'
      case 'unsigned int':   return 'writeUint32'
      case 'hyper':          return 'writeInt64'
      case 'unsigned hyper': return 'writeUint64'
      case 'bool':           return 'writeBool'
    }
  }
  // For complex types, generate a lambda
  return `(${writerVar}, v) => ${writeStmt(ref, writerVar, 'v')}`
}

// ---------------------------------------------------------------------------
// JSDoc comment helper
// ---------------------------------------------------------------------------

/**
 * Format a doc string as a JSDoc comment block.
 * Returns empty string if doc is undefined or empty.
 */
function formatJSDoc(doc: string | undefined, indent = ''): string {
  if (!doc) return ''
  const lines = doc.split('\n')
  if (lines.length === 1) {
    return `${indent}/** ${lines[0]} */\n`
  }
  const result = [`${indent}/**`]
  for (const line of lines) {
    result.push(`${indent} * ${line}`)
  }
  result.push(`${indent} */`)
  return result.join('\n') + '\n'
}

// ---------------------------------------------------------------------------
// Per-definition generators
// ---------------------------------------------------------------------------

function generateConst(def: XdrConst): string {
  return formatJSDoc(def.doc) + `export const ${def.name} = ${def.value}\n`
}

function generateTypedef(def: XdrTypedef): string {
  const lines: string[] = []
  const tsT = tsType(def.type)
  const doc = formatJSDoc(def.doc)
  if (doc) lines.push(doc.trimEnd())
  lines.push(`export type ${def.name} = ${tsT}`)
  lines.push('')

  const readFn = toReadFnName(def.name)
  const writeFn = toWriteFnName(def.name)

  // read function
  lines.push(`export function ${readFn}(r: XdrReader): ${def.name} {`)
  if (def.type.kind === 'primitive' && def.type.primitive === 'void') {
    lines.push(`  // void typedef`)
  } else {
    lines.push(`  return ${readExpr(def.type)}`)
  }
  lines.push(`}`)
  lines.push('')

  // write function
  lines.push(`export function ${writeFn}(w: XdrWriter, v: ${def.name}): void {`)
  if (def.type.kind === 'primitive' && def.type.primitive === 'void') {
    lines.push(`  // void typedef`)
  } else {
    lines.push(`  ${writeStmt(def.type, 'w', 'v')}`)
  }
  lines.push(`}`)
  lines.push('')

  // convenience encode/decode
  lines.push(`export function ${toEncodeFnName(def.name)}(v: ${def.name}): Uint8Array {`)
  lines.push(`  return encode(v, ${writeFn})`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function ${toDecodeFnName(def.name)}(input: Uint8Array | string): ${def.name} {`)
  lines.push(`  return decode(input, ${readFn})`)
  lines.push(`}`)
  lines.push('')

  // JSON toJson/fromJson
  if (def.type.kind === 'primitive' && def.type.primitive === 'void') {
    // skip void typedefs
  } else {
    generateTypedefJson(lines, def)
  }

  return lines.join('\n')
}

function generateTypedefJson(lines: string[], def: XdrTypedef): void {
  // Custom types override default behavior
  if (def.name === 'AssetCode4') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return escapeAssetCode4(v)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  return unescapeAssetCode(json as string, 4)`)
    lines.push(`}`)
    return
  }
  if (def.name === 'AssetCode12') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return escapeAssetCode12(v)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  return unescapeAssetCode(json as string, 12)`)
    lines.push(`}`)
    return
  }
  if (def.name === 'ContractID') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return encodeContract(v)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  return decodeContract(json as string)`)
    lines.push(`}`)
    return
  }
  // PoolID → L-strkey string
  if (def.name === 'PoolID') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return encodeLiquidityPool(v)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  return decodeLiquidityPool(json as string)`)
    lines.push(`}`)
    return
  }

  // Default: delegate to underlying type expression
  lines.push(`export function toJson${def.name}(v: ${def.name}): unknown {`)
  lines.push(`  return ${toJsonExpr(def.type, 'v')}`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
  lines.push(`  return ${fromJsonExpr(def.type, 'json')}`)
  lines.push(`}`)
}

function generateEnum(def: XdrEnum): string {
  const lines: string[] = []
  const prefix = toScreamingSnake(def.name)
  const readFn = toReadFnName(def.name)
  const writeFn = toWriteFnName(def.name)

  // Type alias: string literal union
  const doc = formatJSDoc(def.doc)
  if (doc) lines.push(doc.trimEnd())
  if (def.members.length === 0) {
    lines.push(`export type ${def.name} = never`)
  } else {
    const unionLines = def.members.map((m, i) => {
      const prefix = i === 0 ? '  | ' : '  | '
      return `${prefix}'${m.name}'`
    })
    lines.push(`export type ${def.name} =`)
    lines.push(...unionLines)
  }
  lines.push('')

  // Enum → integer lookup map
  lines.push(`export const ${prefix}_TO_INT: Record<${def.name}, number> = /*#__PURE__*/ {`)
  for (const m of def.members) {
    const resolvedValue = resolveValue(m.value)
    lines.push(`  ${m.name}: ${resolvedValue},`)
  }
  lines.push(`}`)
  lines.push('')

  // Integer → enum lookup map
  lines.push(`export const ${prefix}_FROM_INT: Record<number, ${def.name}> = /*#__PURE__*/ {`)
  for (const m of def.members) {
    const resolvedValue = resolveValue(m.value)
    const isNegative = typeof resolvedValue === 'number' && resolvedValue < 0
    const key = isNegative ? `[${resolvedValue}]` : resolvedValue
    lines.push(`  ${key}: '${m.name}',`)
  }
  lines.push(`}`)
  lines.push('')

  // readFoo
  lines.push(`export function ${readFn}(r: XdrReader): ${def.name} {`)
  lines.push(`  const v = readInt32(r)`)
  lines.push(`  const result = ${prefix}_FROM_INT[v]`)
  lines.push(`  if (result === undefined) throw new XdrReadError(\`Unknown ${def.name} value: \${v}\`, 'INVALID_ENUM_VALUE')`)
  lines.push(`  return result`)
  lines.push(`}`)
  lines.push('')

  // writeFoo
  lines.push(`export function ${writeFn}(w: XdrWriter, v: ${def.name}): void {`)
  lines.push(`  writeInt32(w, ${prefix}_TO_INT[v])`)
  lines.push(`}`)
  lines.push('')

  // encode/decode convenience
  lines.push(`export function ${toEncodeFnName(def.name)}(v: ${def.name}): Uint8Array {`)
  lines.push(`  return encode(v, ${writeFn})`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function ${toDecodeFnName(def.name)}(input: Uint8Array | string): ${def.name} {`)
  lines.push(`  return decode(input, ${readFn})`)
  lines.push(`}`)
  lines.push('')

  // JSON maps and toJson/fromJson
  generateEnumJson(lines, def, prefix)

  return lines.join('\n')
}

function generateEnumJson(lines: string[], def: XdrEnum, screamingPrefix: string): void {
  const enumPrefix = _enumPrefixMap.get(def.name) ?? ''

  // _TO_JSON map: XDR enum member → JSON string
  lines.push(`const _${screamingPrefix}_TO_JSON: Record<${def.name}, string> = /*#__PURE__*/ {`)
  for (const m of def.members) {
    lines.push(`  ${m.name}: '${enumMemberJsonName(m.name, enumPrefix)}',`)
  }
  lines.push(`}`)
  lines.push('')

  // _FROM_JSON map: JSON string → XDR enum member
  lines.push(`const _${screamingPrefix}_FROM_JSON: Record<string, ${def.name}> = /*#__PURE__*/ {`)
  for (const m of def.members) {
    lines.push(`  '${enumMemberJsonName(m.name, enumPrefix)}': '${m.name}',`)
  }
  lines.push(`}`)
  lines.push('')

  lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
  lines.push(`  return _${screamingPrefix}_TO_JSON[v]`)
  lines.push(`}`)
  lines.push('')

  lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
  lines.push(`  const result = _${screamingPrefix}_FROM_JSON[json as string]`)
  lines.push(`  if (result === undefined) throw new Error(\`Unknown ${def.name} JSON value: \${json}\`)`)
  lines.push(`  return result`)
  lines.push(`}`)
}

function generateStruct(def: XdrStruct): string {
  const lines: string[] = []
  const readFn = toReadFnName(def.name)
  const writeFn = toWriteFnName(def.name)

  // Interface
  const structDoc = formatJSDoc(def.doc)
  if (structDoc) lines.push(structDoc.trimEnd())
  lines.push(`export interface ${def.name} {`)
  for (const field of def.fields) {
    const t = tsType(field.type)
    if (t === 'void') continue // skip void fields
    if (field.doc) {
      const fieldDoc = formatJSDoc(field.doc, '  ')
      lines.push(fieldDoc.trimEnd())
    }
    lines.push(`  readonly ${field.name}: ${t}`)
  }
  lines.push(`}`)
  lines.push('')

  // readFoo — with depth tracking for composite types (exception-safe via try/finally)
  lines.push(`export function ${readFn}(r: XdrReader): ${def.name} {`)
  lines.push(`  beginComposite(r)`)
  lines.push(`  try {`)
  const nonVoidFields = def.fields.filter(
    (f) => !(f.type.kind === 'primitive' && f.type.primitive === 'void'),
  )
  for (const field of nonVoidFields) {
    const varName = safeVarName(field.name)
    lines.push(`    const ${varName} = ${readExpr(field.type)}`)
  }
  if (nonVoidFields.length === 0) {
    lines.push(`    return {}`)
  } else {
    // If a field needed renaming, use `fieldName: varName_` shorthand form
    const fieldList = nonVoidFields.map((f) => {
      const varName = safeVarName(f.name)
      return varName === f.name ? f.name : `${f.name}: ${varName}`
    }).join(', ')
    lines.push(`    return { ${fieldList} }`)
  }
  lines.push(`  } finally {`)
  lines.push(`    endComposite(r)`)
  lines.push(`  }`)
  lines.push(`}`)
  lines.push('')

  // writeFoo
  lines.push(`export function ${writeFn}(w: XdrWriter, v: ${def.name}): void {`)
  for (const field of nonVoidFields) {
    lines.push(`  ${writeStmt(field.type, 'w', `v.${field.name}`)}`)
  }
  lines.push(`}`)
  lines.push('')

  // encode/decode convenience
  lines.push(`export function ${toEncodeFnName(def.name)}(v: ${def.name}): Uint8Array {`)
  lines.push(`  return encode(v, ${writeFn})`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function ${toDecodeFnName(def.name)}(input: Uint8Array | string): ${def.name} {`)
  lines.push(`  return decode(input, ${readFn})`)
  lines.push(`}`)
  lines.push('')

  // JSON toJson/fromJson
  generateStructJson(lines, def, nonVoidFields)

  return lines.join('\n')
}

function generateStructJson(
  lines: string[],
  def: XdrStruct,
  nonVoidFields: XdrStruct['fields'],
): void {
  // Custom struct types
  if (def.name === 'Int128Parts') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return int128PartsToDecimal(v.hi, v.lo)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  if (typeof json === 'object' && json !== null) {`)
    lines.push(`    const o = json as Record<string, unknown>`)
    lines.push(`    return { hi: BigInt(o['hi'] as string | number), lo: BigInt(o['lo'] as string | number) }`)
    lines.push(`  }`)
    lines.push(`  const [hi, lo] = decimalToInt128Parts(json as string)`)
    lines.push(`  return { hi, lo }`)
    lines.push(`}`)
    return
  }
  if (def.name === 'UInt128Parts') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return uint128PartsToDecimal(v.hi, v.lo)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  if (typeof json === 'object' && json !== null) {`)
    lines.push(`    const o = json as Record<string, unknown>`)
    lines.push(`    return { hi: BigInt(o['hi'] as string | number), lo: BigInt(o['lo'] as string | number) }`)
    lines.push(`  }`)
    lines.push(`  const [hi, lo] = decimalToUint128Parts(json as string)`)
    lines.push(`  return { hi, lo }`)
    lines.push(`}`)
    return
  }
  if (def.name === 'Int256Parts') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return int256PartsToDecimal(v.hi_hi, v.hi_lo, v.lo_hi, v.lo_lo)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  if (typeof json === 'object' && json !== null) {`)
    lines.push(`    const o = json as Record<string, unknown>`)
    lines.push(`    return { hi_hi: BigInt(o['hi_hi'] as string | number), hi_lo: BigInt(o['hi_lo'] as string | number), lo_hi: BigInt(o['lo_hi'] as string | number), lo_lo: BigInt(o['lo_lo'] as string | number) }`)
    lines.push(`  }`)
    lines.push(`  const [hi_hi, hi_lo, lo_hi, lo_lo] = decimalToInt256Parts(json as string)`)
    lines.push(`  return { hi_hi, hi_lo, lo_hi, lo_lo }`)
    lines.push(`}`)
    return
  }
  if (def.name === 'UInt256Parts') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return uint256PartsToDecimal(v.hi_hi, v.hi_lo, v.lo_hi, v.lo_lo)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  if (typeof json === 'object' && json !== null) {`)
    lines.push(`    const o = json as Record<string, unknown>`)
    lines.push(`    return { hi_hi: BigInt(o['hi_hi'] as string | number), hi_lo: BigInt(o['hi_lo'] as string | number), lo_hi: BigInt(o['lo_hi'] as string | number), lo_lo: BigInt(o['lo_lo'] as string | number) }`)
    lines.push(`  }`)
    lines.push(`  const [hi_hi, hi_lo, lo_hi, lo_lo] = decimalToUint256Parts(json as string)`)
    lines.push(`  return { hi_hi, hi_lo, lo_hi, lo_lo }`)
    lines.push(`}`)
    return
  }
  // SignerKey_ed25519SignedPayload → P-strkey string
  if (def.name === 'SignerKey_ed25519SignedPayload') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return encodeSignedPayload(v.ed25519, v.payload)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  const { ed25519, payload } = decodeSignedPayload(json as string)`)
    lines.push(`  return { ed25519, payload }`)
    lines.push(`}`)
    return
  }
  // MuxedAccount_med25519 → M-strkey string
  if (def.name === 'MuxedAccount_med25519') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return encodeMuxedAccountStrKey(v.ed25519, v.id)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  const { ed25519, memoId } = decodeMuxedAccountStrKey(json as string)`)
    lines.push(`  return { id: memoId, ed25519 }`)
    lines.push(`}`)
    return
  }
  // MuxedEd25519Account → M-strkey string
  if (def.name === 'MuxedEd25519Account') {
    lines.push(`export function toJson${def.name}(v: ${def.name}): string {`)
    lines.push(`  return encodeMuxedAccountStrKey(v.ed25519, v.id)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
    lines.push(`  const { ed25519, memoId } = decodeMuxedAccountStrKey(json as string)`)
    lines.push(`  return { id: memoId, ed25519 }`)
    lines.push(`}`)
    return
  }

  // Default struct toJson
  lines.push(`export function toJson${def.name}(v: ${def.name}): Record<string, unknown> {`)
  lines.push(`  return {`)
  for (const field of nonVoidFields) {
    const jsonKey = camelToSnakeCase(field.name)
    lines.push(`    '${jsonKey}': ${toJsonExpr(field.type, `v.${field.name}`)},`)
  }
  lines.push(`  }`)
  lines.push(`}`)
  lines.push('')

  // Default struct fromJson
  lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
  lines.push(`  const o = json as Record<string, unknown>`)
  lines.push(`  return {`)
  for (const field of nonVoidFields) {
    const jsonKey = camelToSnakeCase(field.name)
    lines.push(`    ${field.name}: ${fromJsonExpr(field.type, `o['${jsonKey}']`)},`)
  }
  lines.push(`  }`)
  lines.push(`}`)
}

// ---------------------------------------------------------------------------
// Union generator
// ---------------------------------------------------------------------------

function generateUnion(def: XdrUnion): string {
  const lines: string[] = []
  const readFn = toReadFnName(def.name)
  const writeFn = toWriteFnName(def.name)
  const discriminantType = def.discriminant.type
  const discriminantName = def.discriminant.name
  const discriminantWriteStmt = (val: string) => writeStmt(discriminantType, 'w', val)

  // Determine whether the discriminant is an enum (named enum type) or a plain integer.
  const isEnumDiscriminant =
    discriminantType.kind === 'named' &&
    _kindRegistry.get(discriminantType.name) === 'enum'

  function caseTypeStr(caseVal: string | number): string {
    if (isEnumDiscriminant) {
      return `'${caseVal}'`
    }
    return String(caseVal)
  }

  function caseSwitchStr(caseVal: string | number): string {
    if (isEnumDiscriminant) {
      return `'${caseVal}'`
    }
    return String(caseVal)
  }

  const defaultDiscriminantType = isEnumDiscriminant ? 'string' : 'number'

  // ---- TypeScript discriminated union type ----
  const unionDoc = formatJSDoc(def.doc)
  if (unionDoc) lines.push(unionDoc.trimEnd())
  lines.push(`export type ${def.name} =`)
  for (const arm of def.arms) {
    const isVoid = arm.type.kind === 'primitive' && arm.type.primitive === 'void'
    for (const caseVal of arm.cases) {
      const ct = caseTypeStr(caseVal)
      if (isVoid) {
        lines.push(`  | { readonly ${discriminantName}: ${ct} }`)
      } else {
        const fieldType = tsType(arm.type)
        lines.push(`  | { readonly ${discriminantName}: ${ct}; readonly ${arm.name!}: ${fieldType} }`)
      }
    }
  }
  // default arm
  if (def.defaultArm) {
    const isVoid = def.defaultArm.kind === 'primitive' && def.defaultArm.primitive === 'void'
    if (isVoid) {
      lines.push(`  | { readonly ${discriminantName}: ${defaultDiscriminantType} }`)
    } else {
      const fieldType = tsType(def.defaultArm)
      lines.push(`  | { readonly ${discriminantName}: ${defaultDiscriminantType}; readonly value: ${fieldType} }`)
    }
  }
  lines.push('')

  // ---- readFoo ----
  let discriminantReadFn: string
  if (discriminantType.kind === 'named') {
    discriminantReadFn = toReadFnName(discriminantType.name)
  } else if (discriminantType.kind === 'primitive') {
    switch (discriminantType.primitive) {
      case 'int':          discriminantReadFn = 'readInt32'; break
      case 'unsigned int': discriminantReadFn = 'readUint32'; break
      case 'bool':         discriminantReadFn = 'readBool'; break
      default:             discriminantReadFn = 'readInt32'; break
    }
  } else {
    discriminantReadFn = 'readInt32'
  }

  lines.push(`export function ${readFn}(r: XdrReader): ${def.name} {`)
  lines.push(`  beginComposite(r)`)
  lines.push(`  try {`)
  lines.push(`    const ${discriminantName} = ${discriminantReadFn}(r)`)
  lines.push(`    let result: ${def.name}`)
  lines.push(`    switch (${discriminantName}) {`)

  for (const arm of def.arms) {
    const isVoid = arm.type.kind === 'primitive' && arm.type.primitive === 'void'
    for (const caseVal of arm.cases) {
      lines.push(`      case ${caseSwitchStr(caseVal)}:`)
    }
    if (isVoid) {
      lines.push(`        result = { ${discriminantName} }; break`)
    } else {
      lines.push(`        result = { ${discriminantName}, ${arm.name!}: ${readExpr(arm.type)} }; break`)
    }
  }

  if (def.defaultArm) {
    const isVoid = def.defaultArm.kind === 'primitive' && def.defaultArm.primitive === 'void'
    lines.push(`      default:`)
    if (isVoid) {
      lines.push(`        result = { ${discriminantName} } as ${def.name}; break`)
    } else {
      lines.push(`        result = { ${discriminantName}, value: ${readExpr(def.defaultArm)} } as ${def.name}; break`)
    }
  } else {
    lines.push(`      default:`)
    lines.push(`        throw new XdrReadError(\`Unknown ${def.name} discriminant: \${${discriminantName}}\`, 'INVALID_UNION_DISCRIMINANT')`)
  }

  lines.push(`    }`)
  lines.push(`    return result`)
  lines.push(`  } finally {`)
  lines.push(`    endComposite(r)`)
  lines.push(`  }`)
  lines.push(`}`)
  lines.push('')

  // ---- writeFoo ----
  lines.push(`export function ${writeFn}(w: XdrWriter, v: ${def.name}): void {`)
  lines.push(`  ${discriminantWriteStmt(`v.${discriminantName}`)}`)
  lines.push(`  switch (v.${discriminantName}) {`)

  for (const arm of def.arms) {
    const isVoid = arm.type.kind === 'primitive' && arm.type.primitive === 'void'
    for (let i = 0; i < arm.cases.length; i++) {
      const caseVal = arm.cases[i]!
      lines.push(`    case ${caseSwitchStr(caseVal)}:`)
    }
    if (isVoid) {
      lines.push(`      break`)
    } else {
      lines.push(`      ${writeStmt(arm.type, 'w', `(v as any).${arm.name!}`)}; break`)
    }
  }

  if (def.defaultArm) {
    const isVoid = def.defaultArm.kind === 'primitive' && def.defaultArm.primitive === 'void'
    lines.push(`    default:`)
    if (isVoid) {
      lines.push(`      break`)
    } else {
      lines.push(`      ${writeStmt(def.defaultArm, 'w', `(v as any).value`)}; break`)
    }
  }

  lines.push(`  }`)
  lines.push(`}`)
  lines.push('')

  // encode/decode convenience
  lines.push(`export function ${toEncodeFnName(def.name)}(v: ${def.name}): Uint8Array {`)
  lines.push(`  return encode(v, ${writeFn})`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export function ${toDecodeFnName(def.name)}(input: Uint8Array | string): ${def.name} {`)
  lines.push(`  return decode(input, ${readFn})`)
  lines.push(`}`)
  lines.push('')

  // JSON toJson/fromJson
  const enumTypeName = isEnumDiscriminant ? (discriminantType as { name: string }).name : undefined
  generateUnionJson(lines, def, discriminantName, isEnumDiscriminant, enumTypeName, caseSwitchStr)

  return lines.join('\n')
}

function generateUnionJson(
  lines: string[],
  def: XdrUnion,
  discriminantName: string,
  isEnumDiscriminant: boolean,
  enumTypeName: string | undefined,
  caseSwitchStr: (caseVal: string | number) => string,
): void {
  // Check for custom JSON types
  const customJson = generateCustomUnionJson(lines, def, discriminantName)
  if (customJson) return

  // ---- toJson ----
  lines.push(`export function toJson${def.name}(v: ${def.name}): unknown {`)
  lines.push(`  switch (v.${discriminantName}) {`)

  for (const arm of def.arms) {
    const isVoid = arm.type.kind === 'primitive' && arm.type.primitive === 'void'
    for (const caseVal of arm.cases) {
      const jsonKey = unionCaseJsonName(caseVal, isEnumDiscriminant, enumTypeName)
      lines.push(`    case ${caseSwitchStr(caseVal)}:`)
      if (isVoid) {
        lines.push(`      return '${jsonKey}'`)
      } else {
        lines.push(`      return { '${jsonKey}': ${toJsonExpr(arm.type, `(v as any).${arm.name!}`)} }`)
      }
    }
  }

  if (def.defaultArm) {
    const isVoid = def.defaultArm.kind === 'primitive' && def.defaultArm.primitive === 'void'
    lines.push(`    default:`)
    if (isVoid) {
      if (isEnumDiscriminant) {
        lines.push(`      return toJson${enumTypeName}(v.${discriminantName} as any)`)
      } else {
        lines.push(`      return 'v' + v.${discriminantName}`)
      }
    } else {
      if (isEnumDiscriminant) {
        lines.push(`      return { [toJson${enumTypeName}(v.${discriminantName} as any)]: ${toJsonExpr(def.defaultArm, `(v as any).value`)} }`)
      } else {
        lines.push(`      return { ['v' + v.${discriminantName}]: ${toJsonExpr(def.defaultArm, `(v as any).value`)} }`)
      }
    }
  }

  lines.push(`  }`)
  lines.push(`}`)
  lines.push('')

  // ---- fromJson ----
  lines.push(`export function fromJson${def.name}(json: unknown): ${def.name} {`)
  lines.push(`  if (typeof json === 'string') {`)

  // Handle void arms
  let hasVoidArm = false
  for (const arm of def.arms) {
    const isVoid = arm.type.kind === 'primitive' && arm.type.primitive === 'void'
    if (!isVoid) continue
    hasVoidArm = true
    for (const caseVal of arm.cases) {
      const jsonKey = unionCaseJsonName(caseVal, isEnumDiscriminant, enumTypeName)
      lines.push(`    if (json === '${jsonKey}') return { ${discriminantName}: ${caseSwitchStr(caseVal)} } as ${def.name}`)
    }
  }

  if (def.defaultArm && def.defaultArm.kind === 'primitive' && def.defaultArm.primitive === 'void') {
    if (isEnumDiscriminant) {
      lines.push(`    return { ${discriminantName}: fromJson${enumTypeName}(json) } as ${def.name}`)
    } else {
      lines.push(`    return { ${discriminantName}: parseInt(json.slice(1), 10) } as ${def.name}`)
    }
  } else if (!hasVoidArm) {
    lines.push(`    throw new Error(\`Unexpected string for ${def.name}: \${json}\`)`)
  } else {
    lines.push(`    throw new Error(\`Unknown ${def.name} variant: \${json}\`)`)
  }

  lines.push(`  }`)
  lines.push(`  const obj = json as Record<string, unknown>`)
  lines.push(`  const key = unionKey(obj)`)
  lines.push(`  switch (key) {`)

  // Handle non-void arms
  for (const arm of def.arms) {
    const isVoid = arm.type.kind === 'primitive' && arm.type.primitive === 'void'
    if (isVoid) continue
    for (const caseVal of arm.cases) {
      const jsonKey = unionCaseJsonName(caseVal, isEnumDiscriminant, enumTypeName)
      lines.push(`    case '${jsonKey}':`)
      lines.push(`      return { ${discriminantName}: ${caseSwitchStr(caseVal)}, ${arm.name!}: ${fromJsonExpr(arm.type, `obj[key]`)} } as ${def.name}`)
    }
  }

  if (def.defaultArm && !(def.defaultArm.kind === 'primitive' && def.defaultArm.primitive === 'void')) {
    lines.push(`    default:`)
    if (isEnumDiscriminant) {
      lines.push(`      return { ${discriminantName}: fromJson${enumTypeName}(key), value: ${fromJsonExpr(def.defaultArm, `obj[key]`)} } as ${def.name}`)
    } else {
      lines.push(`      return { ${discriminantName}: parseInt(key.slice(1), 10), value: ${fromJsonExpr(def.defaultArm, `obj[key]`)} } as ${def.name}`)
    }
  } else {
    lines.push(`    default: throw new Error(\`Unknown ${def.name} variant: \${key}\`)`)
  }

  lines.push(`  }`)
  lines.push(`}`)
}

/**
 * Generate custom JSON for special union types (PublicKey, MuxedAccount, etc.)
 * Returns true if custom code was emitted, false for default handling.
 */
function generateCustomUnionJson(
  lines: string[],
  def: XdrUnion,
  discriminantName: string,
): boolean {
  if (def.name === 'PublicKey') {
    lines.push(`export function toJsonPublicKey(v: PublicKey): string {`)
    lines.push(`  return encodeEd25519PublicKey((v as any).ed25519)`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJsonPublicKey(json: unknown): PublicKey {`)
    lines.push(`  if (typeof json === 'string') {`)
    lines.push(`    return { ${discriminantName}: 'PUBLIC_KEY_TYPE_ED25519', ed25519: decodeEd25519PublicKey(json) }`)
    lines.push(`  }`)
    lines.push(`  throw new Error('Invalid PublicKey JSON')`)
    lines.push(`}`)
    return true
  }

  if (def.name === 'MuxedAccount') {
    lines.push(`export function toJsonMuxedAccount(v: MuxedAccount): string {`)
    lines.push(`  switch (v.${discriminantName}) {`)
    lines.push(`    case 'KEY_TYPE_ED25519':`)
    lines.push(`      return encodeEd25519PublicKey((v as any).ed25519)`)
    lines.push(`    case 'KEY_TYPE_MUXED_ED25519':`)
    lines.push(`      return encodeMuxedAccountStrKey((v as any).med25519.ed25519, (v as any).med25519.id)`)
    lines.push(`  }`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJsonMuxedAccount(json: unknown): MuxedAccount {`)
    lines.push(`  const s = json as string`)
    lines.push(`  if (s.startsWith('M')) {`)
    lines.push(`    const { ed25519, memoId } = decodeMuxedAccountStrKey(s)`)
    lines.push(`    return { ${discriminantName}: 'KEY_TYPE_MUXED_ED25519', med25519: { id: memoId, ed25519 } }`)
    lines.push(`  }`)
    lines.push(`  return { ${discriminantName}: 'KEY_TYPE_ED25519', ed25519: decodeEd25519PublicKey(s) }`)
    lines.push(`}`)
    return true
  }

  if (def.name === 'AssetCode') {
    lines.push(`export function toJsonAssetCode(v: AssetCode): string {`)
    lines.push(`  switch (v.${discriminantName}) {`)
    lines.push(`    case 'ASSET_TYPE_CREDIT_ALPHANUM4':`)
    lines.push(`      return toJsonAssetCode4((v as any).assetCode4)`)
    lines.push(`    case 'ASSET_TYPE_CREDIT_ALPHANUM12':`)
    lines.push(`      return toJsonAssetCode12((v as any).assetCode12)`)
    lines.push(`  }`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJsonAssetCode(json: unknown): AssetCode {`)
    lines.push(`  const s = json as string`)
    lines.push(`  if (assetCodeByteLength(s) <= 4) {`)
    lines.push(`    return { ${discriminantName}: 'ASSET_TYPE_CREDIT_ALPHANUM4', assetCode4: fromJsonAssetCode4(s) }`)
    lines.push(`  }`)
    lines.push(`  return { ${discriminantName}: 'ASSET_TYPE_CREDIT_ALPHANUM12', assetCode12: fromJsonAssetCode12(s) }`)
    lines.push(`}`)
    return true
  }

  // SignerKey → G/T/X/P strkey string
  if (def.name === 'SignerKey') {
    lines.push(`export function toJsonSignerKey(v: SignerKey): string {`)
    lines.push(`  switch (v.${discriminantName}) {`)
    lines.push(`    case 'SIGNER_KEY_TYPE_ED25519':`)
    lines.push(`      return encodeEd25519PublicKey((v as any).ed25519)`)
    lines.push(`    case 'SIGNER_KEY_TYPE_PRE_AUTH_TX':`)
    lines.push(`      return encodePreAuthTx((v as any).preAuthTx)`)
    lines.push(`    case 'SIGNER_KEY_TYPE_HASH_X':`)
    lines.push(`      return encodeSha256Hash((v as any).hashX)`)
    lines.push(`    case 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD':`)
    lines.push(`      return toJsonSignerKey_ed25519SignedPayload((v as any).ed25519SignedPayload)`)
    lines.push(`  }`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJsonSignerKey(json: unknown): SignerKey {`)
    lines.push(`  const s = json as string`)
    lines.push(`  if (s.startsWith('G')) {`)
    lines.push(`    return { ${discriminantName}: 'SIGNER_KEY_TYPE_ED25519', ed25519: decodeEd25519PublicKey(s) }`)
    lines.push(`  }`)
    lines.push(`  if (s.startsWith('T')) {`)
    lines.push(`    return { ${discriminantName}: 'SIGNER_KEY_TYPE_PRE_AUTH_TX', preAuthTx: decodePreAuthTx(s) }`)
    lines.push(`  }`)
    lines.push(`  if (s.startsWith('X')) {`)
    lines.push(`    return { ${discriminantName}: 'SIGNER_KEY_TYPE_HASH_X', hashX: decodeSha256Hash(s) }`)
    lines.push(`  }`)
    lines.push(`  if (s.startsWith('P')) {`)
    lines.push(`    return { ${discriminantName}: 'SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD', ed25519SignedPayload: fromJsonSignerKey_ed25519SignedPayload(s) }`)
    lines.push(`  }`)
    lines.push(`  throw new Error(\`Invalid SignerKey JSON: \${s}\`)`)
    lines.push(`}`)
    return true
  }

  // SCAddress → flat G/C/M/B/L strkey string
  if (def.name === 'SCAddress') {
    lines.push(`export function toJsonSCAddress(v: SCAddress): string {`)
    lines.push(`  switch (v.${discriminantName}) {`)
    lines.push(`    case 'SC_ADDRESS_TYPE_ACCOUNT':`)
    lines.push(`      return toJsonAccountID((v as any).accountId) as string`)
    lines.push(`    case 'SC_ADDRESS_TYPE_CONTRACT':`)
    lines.push(`      return toJsonContractID((v as any).contractId) as string`)
    lines.push(`    case 'SC_ADDRESS_TYPE_MUXED_ACCOUNT':`)
    lines.push(`      return toJsonMuxedEd25519Account((v as any).muxedAccount)`)
    lines.push(`    case 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE':`)
    lines.push(`      return toJsonClaimableBalanceID((v as any).claimableBalanceId)`)
    lines.push(`    case 'SC_ADDRESS_TYPE_LIQUIDITY_POOL':`)
    lines.push(`      return toJsonPoolID((v as any).liquidityPoolId)`)
    lines.push(`  }`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJsonSCAddress(json: unknown): SCAddress {`)
    lines.push(`  const s = json as string`)
    lines.push(`  if (s.startsWith('G')) {`)
    lines.push(`    return { ${discriminantName}: 'SC_ADDRESS_TYPE_ACCOUNT', accountId: fromJsonAccountID(s) }`)
    lines.push(`  }`)
    lines.push(`  if (s.startsWith('C')) {`)
    lines.push(`    return { ${discriminantName}: 'SC_ADDRESS_TYPE_CONTRACT', contractId: fromJsonContractID(s) }`)
    lines.push(`  }`)
    lines.push(`  if (s.startsWith('M')) {`)
    lines.push(`    return { ${discriminantName}: 'SC_ADDRESS_TYPE_MUXED_ACCOUNT', muxedAccount: fromJsonMuxedEd25519Account(s) }`)
    lines.push(`  }`)
    lines.push(`  if (s.startsWith('B')) {`)
    lines.push(`    return { ${discriminantName}: 'SC_ADDRESS_TYPE_CLAIMABLE_BALANCE', claimableBalanceId: fromJsonClaimableBalanceID(s) }`)
    lines.push(`  }`)
    lines.push(`  if (s.startsWith('L')) {`)
    lines.push(`    return { ${discriminantName}: 'SC_ADDRESS_TYPE_LIQUIDITY_POOL', liquidityPoolId: fromJsonPoolID(s) }`)
    lines.push(`  }`)
    lines.push(`  throw new Error(\`Invalid SCAddress JSON: \${s}\`)`)
    lines.push(`}`)
    return true
  }

  // ClaimableBalanceID → B-strkey string
  if (def.name === 'ClaimableBalanceID') {
    lines.push(`export function toJsonClaimableBalanceID(v: ClaimableBalanceID): string {`)
    lines.push(`  switch (v.${discriminantName}) {`)
    lines.push(`    case 'CLAIMABLE_BALANCE_ID_TYPE_V0':`)
    lines.push(`      return encodeClaimableBalance((v as any).v0)`)
    lines.push(`  }`)
    lines.push(`}`)
    lines.push('')
    lines.push(`export function fromJsonClaimableBalanceID(json: unknown): ClaimableBalanceID {`)
    lines.push(`  const hash = decodeClaimableBalance(json as string)`)
    lines.push(`  return { ${discriminantName}: 'CLAIMABLE_BALANCE_ID_TYPE_V0', v0: hash }`)
    lines.push(`}`)
    return true
  }

  return false
}

// ---------------------------------------------------------------------------
// Cross-file import analysis
// ---------------------------------------------------------------------------

/**
 * Collect all referenced named type names from a set of definitions.
 * These are names used as types in typedefs, struct fields, union arms, etc.
 */
export function collectNamedRefs(definitions: XdrDefinition[]): Set<string> {
  const refs = new Set<string>()

  function scanTypeRef(t: XdrTypeRef): void {
    if (t.kind === 'named') refs.add(t.name)
    else if (t.kind === 'fixedArray' || t.kind === 'varArray') scanTypeRef(t.elementType)
    else if (t.kind === 'optional') scanTypeRef(t.elementType)
  }

  for (const def of definitions) {
    if (def.kind === 'typedef') {
      scanTypeRef(def.type)
    } else if (def.kind === 'struct') {
      for (const field of def.fields) scanTypeRef(field.type)
    } else if (def.kind === 'union') {
      scanTypeRef(def.discriminant.type)
      for (const arm of def.arms) scanTypeRef(arm.type)
      if (def.defaultArm) scanTypeRef(def.defaultArm)
    }
  }

  return refs
}

/**
 * Build import statements for cross-file references.
 *
 * For each named type referenced in definitions that is NOT defined in the
 * current file, look it up in the registry and emit an import for that file.
 *
 * We split imports into:
 *   - `import type { Foo }` for type-only names (typedef, enum, struct, union types)
 *   - `import { readFoo, writeFoo, toJsonFoo, fromJsonFoo }` for the runtime functions
 *
 * With verbatimModuleSyntax, type-only imports must use `import type`.
 */
function buildCrossFileImports(
  definitions: XdrDefinition[],
  typeRegistry: Map<string, string>,
  currentFile: string,
): string {
  // Set of names defined in the current file
  const localNames = new Set<string>()
  // Track which definitions are `const` (they export a value, not a type)
  const constNames = new Set<string>()
  for (const def of definitions) {
    localNames.add(def.name)
    if (def.kind === 'const') constNames.add(def.name)
  }

  // Collect all referenced named types
  const refs = collectNamedRefs(definitions)

  // Group by source file: file → set of type names to import
  const importsByFile = new Map<string, Set<string>>()

  for (const name of refs) {
    // Skip if defined locally
    if (localNames.has(name)) continue

    const sourceFile = typeRegistry.get(name)
    if (!sourceFile) continue // unknown type (primitive alias etc.)
    if (sourceFile === currentFile) continue // same file (shouldn't happen given localNames check)

    if (!importsByFile.has(sourceFile)) {
      importsByFile.set(sourceFile, new Set())
    }
    importsByFile.get(sourceFile)!.add(name)
  }

  if (importsByFile.size === 0) return ''

  const lines: string[] = []

  // Sort files for deterministic output
  const sortedFiles = Array.from(importsByFile.keys()).sort()

  for (const srcFile of sortedFiles) {
    const names = Array.from(importsByFile.get(srcFile)!).sort()
    // Derive relative import path: e.g. "types.ts" → "./types.js"
    const modulePath = './' + srcFile.replace(/\.ts$/, '.js')

    // Separate type-only names from names that also need codec function imports.
    // `const` definitions in other files export a value; we only import the value.
    // All other definitions (typedef, enum, struct, union) export a type + read/write/toJson/fromJson fns.
    const typeNames: string[] = []
    const codecNames: string[] = []

    for (const name of names) {
      const defKind = getDefKind(name, typeRegistry, definitions)
      if (defKind === 'const') {
        // Only import the value (no read/write)
        codecNames.push(name)
      } else {
        // Import type separately (verbatimModuleSyntax requirement)
        typeNames.push(name)
        // Import the codec and JSON functions as values
        codecNames.push(`read${name}`, `write${name}`, `toJson${name}`, `fromJson${name}`)
      }
    }

    if (typeNames.length > 0) {
      lines.push(`import type { ${typeNames.join(', ')} } from '${modulePath}'`)
    }
    if (codecNames.length > 0) {
      lines.push(`import { ${codecNames.join(', ')} } from '${modulePath}'`)
    }
  }

  return lines.join('\n')
}

/**
 * Look up the kind ('const' | 'typedef' | 'enum' | 'struct' | 'union') for a
 * named type using the global registry info we have.  Since we only have the
 * registry (file name) and not the definitions from other files here, we store
 * an extended registry that maps name → kind as well.
 *
 * In practice this helper is called with a registry that has been extended
 * by the caller to also carry kind info via the kindRegistry parameter.
 */
// We use module-level registries that index.ts populates before calling generateTypeScript.
let _kindRegistry: Map<string, string> = new Map()

export function setKindRegistry(registry: Map<string, string>): void {
  _kindRegistry = registry
}

/**
 * Value resolver: maps const names and enum member names to their resolved numeric values.
 * Used to inline numeric values when enum members reference const identifiers.
 * e.g. `KEY_TYPE_ED25519 → 0` so we can write `0` instead of `KEY_TYPE_ED25519`.
 */
let _valueResolver: Map<string, number> = new Map()

export function setValueResolver(resolver: Map<string, number>): void {
  _valueResolver = resolver
}

/**
 * Resolve a value that may be a number literal or a string const reference.
 * Returns the numeric value, or the original string if not resolvable.
 */
function resolveValue(value: string | number): number | string {
  if (typeof value === 'number') return value
  // Try to resolve the string as a const/enum member name
  const resolved = _valueResolver.get(value)
  if (resolved !== undefined) return resolved
  // Return as-is (will be used as a JS identifier expression)
  return value
}

function getDefKind(
  name: string,
  _typeRegistry: Map<string, string>,
  _localDefs: XdrDefinition[],
): string {
  return _kindRegistry.get(name) ?? 'struct'
}

// ---------------------------------------------------------------------------
// Main generator entry point
// ---------------------------------------------------------------------------

function generateDefinition(def: XdrDefinition): string {
  switch (def.kind) {
    case 'const':
      return generateConst(def)
    case 'typedef':
      return generateTypedef(def)
    case 'enum':
      return generateEnum(def)
    case 'struct':
      return generateStruct(def)
    case 'union':
      return generateUnion(def)
  }
}

export function generateTypeScript(
  definitions: XdrDefinition[],
  filename: string,
  typeRegistry?: Map<string, string>,
  currentFile?: string,
): GeneratorOutput {
  const parts: string[] = []

  // File header (codec imports)
  parts.push(CODEC_IMPORTS)

  // Cross-file imports (if registry provided)
  if (typeRegistry && currentFile) {
    const crossImports = buildCrossFileImports(definitions, typeRegistry, currentFile)
    if (crossImports) {
      parts.push('')
      parts.push(crossImports)
    }
  }

  // One blank line between the header/imports and the definitions
  parts.push('')
  parts.push('')

  // Generate each definition, separated by blank lines
  const defParts: string[] = []
  for (const def of definitions) {
    const code = generateDefinition(def)
    if (code.trim().length > 0) {
      defParts.push(code)
    }
  }

  parts.push(defParts.join('\n\n'))

  // Ensure file ends with a newline
  const content = parts.join('\n').trimEnd() + '\n'

  return { filename, content }
}
