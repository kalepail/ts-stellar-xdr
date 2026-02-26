/**
 * XDR code generator CLI
 * Usage: bun scripts/codegen/index.ts
 *
 * Fetches Stellar XDR .x files from stellar/stellar-xdr (curr branch)
 * and generates TypeScript types + codec functions in src/generated/
 */

import { tokenize } from './lexer.js'
import { parse } from './parser.js'
import { generateTypeScript, setKindRegistry, setValueResolver, setEnumPrefixMap, computeEnumPrefix } from './generator.js'
import type { XdrFile } from './ast.js'

const STELLAR_XDR_BASE = 'https://raw.githubusercontent.com/stellar/stellar-xdr/curr'

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

async function fetchXdrFile(filename: string): Promise<string> {
  const url = `${STELLAR_XDR_BASE}/${filename}`
  console.log(`Fetching ${url}...`)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${filename}: ${response.status} ${response.statusText}`)
  }
  return response.text()
}

async function main() {
  console.log('Fetching Stellar XDR definitions from stellar/stellar-xdr (curr branch)...\n')

  const parsed: Array<{ filename: string; ast: XdrFile }> = []

  for (const filename of XDR_FILES) {
    const source = await fetchXdrFile(filename)
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

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
