/**
 * XDR code generator CLI
 * Usage: bun scripts/codegen/index.ts [--ref <git-ref>]
 *
 * Fetches Stellar XDR .x files from stellar/stellar-xdr and generates
 * TypeScript types + codec functions in src/generated/.
 */

import { tokenize } from './lexer.js'
import { parse } from './parser.js'
import {
  computeEnumPrefix,
  enumMemberJsonName,
  generateTypeScript,
  setEnumPrefixMap,
  setKindRegistry,
  setValueResolver,
} from './generator.js'
import type { XdrDefinition, XdrFile, XdrTypeRef } from './ast.js'

const STELLAR_XDR_BASE_PREFIX = 'https://raw.githubusercontent.com/stellar/stellar-xdr'
const DEFAULT_REF = 'curr'

const XDR_FILES = [
  'Stellar-types.x',
  'Stellar-SCP.x',
  'Stellar-contract.x',
  'Stellar-contract-spec.x',
  'Stellar-contract-env-meta.x',
  'Stellar-contract-meta.x',
  'Stellar-contract-config-setting.x',
  'Stellar-ledger-entries.x',
  'Stellar-ledger.x',
  'Stellar-transaction.x',
  'Stellar-overlay.x',
  'Stellar-internal.x',
  'Stellar-exporter.x',
] as const

const FILE_MAP: Record<string, string> = {
  'Stellar-types.x': 'types.ts',
  'Stellar-SCP.x': 'scp.ts',
  'Stellar-contract.x': 'contract.ts',
  'Stellar-contract-spec.x': 'contract-spec.ts',
  'Stellar-contract-env-meta.x': 'contract-env-meta.ts',
  'Stellar-contract-meta.x': 'contract-meta.ts',
  'Stellar-contract-config-setting.x': 'contract-config-setting.ts',
  'Stellar-ledger-entries.x': 'ledger-entries.ts',
  'Stellar-ledger.x': 'ledger.ts',
  'Stellar-transaction.x': 'transaction.ts',
  'Stellar-overlay.x': 'overlay.ts',
  'Stellar-internal.x': 'internal.ts',
  'Stellar-exporter.x': 'exporter.ts',
}

const OUT_DIR = 'src/generated'

export interface CodegenCliArgs {
  ref: string
}

export function parseCodegenCliArgs(argv: readonly string[]): CodegenCliArgs {
  let ref = DEFAULT_REF
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i]!
    if (arg === '--ref') {
      const value = argv[i + 1]
      if (value === undefined || value.startsWith('-')) {
        throw new Error('Missing value for --ref')
      }
      ref = value
      i++
      continue
    }
    if (arg.startsWith('--ref=')) {
      const value = arg.slice('--ref='.length)
      if (!value) throw new Error('Missing value for --ref')
      ref = value
      continue
    }
    if (arg === '--help' || arg === '-h') {
      printUsage()
      return { ref }
    }
    throw new Error(`Unknown argument: ${arg}`)
  }
  return { ref }
}

export function getStellarXdrBase(ref: string): string {
  return `${STELLAR_XDR_BASE_PREFIX}/${ref}`
}

async function fetchXdrFile(stellarXdrBase: string, filename: string): Promise<string> {
  const url = `${stellarXdrBase}/${filename}`
  console.log(`Fetching ${url}...`)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${filename}: ${response.status} ${response.statusText}`)
  }
  return response.text()
}

async function main() {
  const argv = typeof Bun !== 'undefined' ? Bun.argv : process.argv
  const { ref } = parseCodegenCliArgs(argv)
  const stellarXdrBase = getStellarXdrBase(ref)

  console.log(`Fetching Stellar XDR definitions from stellar/stellar-xdr (${ref})...\n`)

  const parsed: Array<{ filename: string; ast: XdrFile }> = []

  for (const filename of XDR_FILES) {
    const source = await fetchXdrFile(stellarXdrBase, filename)
    const tokens = tokenize(source, filename)
    const ast = parse(tokens)
    parsed.push({ filename, ast })
    console.log(`  Parsed ${filename}: ${ast.definitions.length} definitions`)
  }

  const totalDefs = parsed.reduce((sum, f) => sum + f.ast.definitions.length, 0)
  console.log(`\nTotal: ${totalDefs} definitions across ${parsed.length} files`)

  // ---------------------------------------------------------------------------
  // Build type registry: type name → output filename (e.g. "Hash" → "types.ts")
  // Also build kind registry: type name → definition kind
  // ---------------------------------------------------------------------------

  // Maps type name → output .ts filename
  const typeRegistry = new Map<string, string>()
  // Maps type name → definition kind ('const' | 'typedef' | 'enum' | 'struct' | 'union')
  const kindRegistry = new Map<string, string>()

  for (const { filename, ast } of parsed) {
    const outputFile = FILE_MAP[filename]!
    for (const def of ast.definitions) {
      typeRegistry.set(def.name, outputFile)
      kindRegistry.set(def.name, def.kind)
    }
  }

  // Share kind registry with the generator
  setKindRegistry(kindRegistry)

  // ---------------------------------------------------------------------------
  // Build a value resolver: maps const names and enum member names to their
  // resolved numeric values, so that enum member values that reference other
  // consts can be inlined as numbers in the generated maps.
  // ---------------------------------------------------------------------------

  // First pass: resolve all consts to their numeric values
  // (const values are numeric literals or references to earlier consts)
  const valueResolver = new Map<string, number>()

  // Iteratively resolve: some consts may reference other consts
  const unresolvedConsts = new Map<string, string>()

  for (const { ast } of parsed) {
    for (const def of ast.definitions) {
      if (def.kind === 'const') {
        if (typeof def.value === 'number') {
          valueResolver.set(def.name, def.value)
        } else {
          // String reference to another const — collect for resolution
          unresolvedConsts.set(def.name, def.value)
        }
      }
    }
  }

  // Resolve transitive const references
  let changed = true
  while (changed) {
    changed = false
    for (const [name, refName] of unresolvedConsts) {
      const resolved = valueResolver.get(refName)
      if (resolved !== undefined) {
        valueResolver.set(name, resolved)
        unresolvedConsts.delete(name)
        changed = true
        break
      }
    }
  }

  // Second pass: add all enum member values (after consts are resolved)
  for (const { ast } of parsed) {
    for (const def of ast.definitions) {
      if (def.kind === 'enum') {
        for (const member of def.members) {
          if (typeof member.value === 'number') {
            valueResolver.set(member.name, member.value)
          } else {
            // Resolve through the const registry
            const resolved = valueResolver.get(member.value)
            if (resolved !== undefined) {
              valueResolver.set(member.name, resolved)
            }
          }
        }
      }
    }
  }

  setValueResolver(valueResolver)

  // ---------------------------------------------------------------------------
  // Build enum prefix map: enum name → common member name prefix
  // Used by JSON serialization to strip prefixes (e.g. MEMO_NONE → "none")
  // ---------------------------------------------------------------------------

  const enumPrefixMap = new Map<string, string>()
  for (const { ast } of parsed) {
    for (const def of ast.definitions) {
      if (def.kind === 'enum') {
        enumPrefixMap.set(def.name, computeEnumPrefix(def.members.map(m => m.name)))
      }
    }
  }
  setEnumPrefixMap(enumPrefixMap)

  // ---------------------------------------------------------------------------
  // Generate TypeScript for each file and write to src/generated/
  // ---------------------------------------------------------------------------
  console.log('\nGenerating TypeScript...\n')

  const generatedFiles: string[] = []

  for (const { filename, ast } of parsed) {
    const outputFile = FILE_MAP[filename]!
    const output = generateTypeScript(ast.definitions, outputFile, typeRegistry, outputFile)

    const outPath = `${OUT_DIR}/${outputFile}`
    await Bun.write(outPath, output.content)

    const lineCount = output.content.split('\n').length
    console.log(`  Wrote ${outPath} (${lineCount} lines)`)
    generatedFiles.push(outputFile)
  }

  // ---------------------------------------------------------------------------
  // Write enum/union introspection metadata
  // ---------------------------------------------------------------------------
  const introspectionContent = generateIntrospectionMetadata(
    parsed.flatMap(({ ast }) => ast.definitions),
    kindRegistry,
    valueResolver,
    enumPrefixMap,
    ref,
  )
  await Bun.write(`${OUT_DIR}/introspection.ts`, introspectionContent)
  console.log(`  Wrote ${OUT_DIR}/introspection.ts`)
  generatedFiles.push('introspection.ts')

  // ---------------------------------------------------------------------------
  // Write src/generated/index.ts
  // ---------------------------------------------------------------------------
  const indexLines: string[] = [
    '// AUTO-GENERATED — do not edit manually',
    '// Run: bun scripts/codegen/index.ts',
    '',
  ]
  for (const file of generatedFiles) {
    const modulePath = './' + file.replace(/\.ts$/, '.js')
    indexLines.push(`export * from '${modulePath}'`)
  }
  indexLines.push('')

  const indexContent = indexLines.join('\n')
  await Bun.write(`${OUT_DIR}/index.ts`, indexContent)
  console.log(`  Wrote ${OUT_DIR}/index.ts`)

  console.log('\nDone!')
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}

function printUsage(): void {
  console.log('Usage: bun scripts/codegen/index.ts [--ref <git-ref>]')
  console.log('Example: bun scripts/codegen/index.ts --ref next')
}

type EnumIntrospectionMember = {
  name: string
  value: number | null
  jsonName: string
}

type UnionIntrospectionCase = {
  raw: string | number
  numericValue: number | null
  jsonName: string
}

function generateIntrospectionMetadata(
  definitions: XdrDefinition[],
  kindRegistry: Map<string, string>,
  valueResolver: Map<string, number>,
  enumPrefixMap: Map<string, string>,
  ref: string,
): string {
  const lines: string[] = [
    '// AUTO-GENERATED — do not edit manually',
    `// Run: bun scripts/codegen/index.ts --ref ${ref}`,
    '',
    'export interface EnumIntrospectionMember {',
    '  readonly name: string',
    '  readonly value: number | null',
    '  readonly jsonName: string',
    '}',
    '',
    'export interface EnumIntrospection {',
    '  readonly name: string',
    '  readonly prefix: string',
    '  readonly members: readonly EnumIntrospectionMember[]',
    '}',
    '',
    'export interface UnionIntrospectionCase {',
    '  readonly raw: string | number',
    '  readonly numericValue: number | null',
    '  readonly jsonName: string',
    '}',
    '',
    'export interface UnionIntrospectionArm {',
    '  readonly name: string | null',
    '  readonly type: string',
    '  readonly cases: readonly UnionIntrospectionCase[]',
    '}',
    '',
    "export type UnionDiscriminantKind = 'enum' | 'int'",
    '',
    'export interface UnionIntrospection {',
    '  readonly name: string',
    '  readonly discriminantName: string',
    '  readonly discriminantType: string',
    '  readonly discriminantKind: UnionDiscriminantKind',
    '  readonly defaultArmType: string | null',
    '  readonly arms: readonly UnionIntrospectionArm[]',
    '}',
    '',
  ]

  const enumDefs = definitions.filter((def): def is Extract<XdrDefinition, { kind: 'enum' }> => def.kind === 'enum')
  const unionDefs = definitions.filter((def): def is Extract<XdrDefinition, { kind: 'union' }> => def.kind === 'union')

  const enumEntries = enumDefs.map((def) => {
    const prefix = enumPrefixMap.get(def.name) ?? ''
    const members: EnumIntrospectionMember[] = def.members.map((member) => ({
      name: member.name,
      value: typeof member.value === 'number' ? member.value : (valueResolver.get(member.value) ?? null),
      jsonName: enumMemberJsonName(member.name, prefix),
    }))
    return { name: def.name, prefix, members }
  })

  lines.push('export const ENUM_INTROSPECTION: Record<string, EnumIntrospection> = /*#__PURE__*/ {')
  for (const entry of enumEntries) {
    lines.push(`  ${q(entry.name)}: {`)
    lines.push(`    name: ${q(entry.name)},`)
    lines.push(`    prefix: ${q(entry.prefix)},`)
    lines.push('    members: [')
    for (const member of entry.members) {
      lines.push(
        `      { name: ${q(member.name)}, value: ${member.value ?? 'null'}, jsonName: ${q(member.jsonName)} },`,
      )
    }
    lines.push('    ],')
    lines.push('  },')
  }
  lines.push('}')
  lines.push('')

  const unionEntries = unionDefs.map((def) => {
    const discriminantType = typeRefToString(def.discriminant.type)
    const isEnumDiscriminant = def.discriminant.type.kind === 'named'
      && kindRegistry.get(def.discriminant.type.name) === 'enum'
    const enumPrefix = isEnumDiscriminant ? (enumPrefixMap.get(def.discriminant.type.name) ?? '') : ''

    const arms = def.arms.map((arm) => {
      const cases: UnionIntrospectionCase[] = arm.cases.map((caseValue) => ({
        raw: caseValue,
        numericValue: typeof caseValue === 'number' ? caseValue : (valueResolver.get(caseValue) ?? null),
        jsonName: isEnumDiscriminant
          ? enumMemberJsonName(String(caseValue), enumPrefix)
          : `v${caseValue}`,
      }))
      return {
        name: arm.name ?? null,
        type: typeRefToString(arm.type),
        cases,
      }
    })

    return {
      name: def.name,
      discriminantName: def.discriminant.name,
      discriminantType,
      discriminantKind: isEnumDiscriminant ? 'enum' : 'int' as const,
      defaultArmType: def.defaultArm ? typeRefToString(def.defaultArm) : null,
      arms,
    }
  })

  lines.push('export const UNION_INTROSPECTION: Record<string, UnionIntrospection> = /*#__PURE__*/ {')
  for (const entry of unionEntries) {
    lines.push(`  ${q(entry.name)}: {`)
    lines.push(`    name: ${q(entry.name)},`)
    lines.push(`    discriminantName: ${q(entry.discriminantName)},`)
    lines.push(`    discriminantType: ${q(entry.discriminantType)},`)
    lines.push(`    discriminantKind: ${q(entry.discriminantKind)},`)
    lines.push(`    defaultArmType: ${entry.defaultArmType === null ? 'null' : q(entry.defaultArmType)},`)
    lines.push('    arms: [')
    for (const arm of entry.arms) {
      lines.push('      {')
      lines.push(`        name: ${arm.name === null ? 'null' : q(arm.name)},`)
      lines.push(`        type: ${q(arm.type)},`)
      lines.push('        cases: [')
      for (const caseInfo of arm.cases) {
        lines.push(
          `          { raw: ${typeof caseInfo.raw === 'number' ? caseInfo.raw : q(caseInfo.raw)}, numericValue: ${caseInfo.numericValue ?? 'null'}, jsonName: ${q(caseInfo.jsonName)} },`,
        )
      }
      lines.push('        ],')
      lines.push('      },')
    }
    lines.push('    ],')
    lines.push('  },')
  }
  lines.push('}')
  lines.push('')

  return lines.join('\n')
}

function typeRefToString(ref: XdrTypeRef): string {
  switch (ref.kind) {
    case 'primitive':
      return ref.primitive
    case 'named':
      return ref.name
    case 'opaque':
      return `opaque[${ref.len}]`
    case 'varOpaque':
      return ref.maxLen === undefined ? 'opaque<>' : `opaque<${ref.maxLen}>`
    case 'string':
      return ref.maxLen === undefined ? 'string<>' : `string<${ref.maxLen}>`
    case 'fixedArray':
      return `${typeRefToString(ref.elementType)}[${ref.len}]`
    case 'varArray':
      return ref.maxLen === undefined
        ? `${typeRefToString(ref.elementType)}<>`
        : `${typeRefToString(ref.elementType)}<${ref.maxLen}>`
    case 'optional':
      return `${typeRefToString(ref.elementType)}*`
  }
}

function q(value: string): string {
  return JSON.stringify(value)
}
