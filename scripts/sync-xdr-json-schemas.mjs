#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DEFAULT_FILES = [
  'TransactionEnvelope.json',
  'Asset.json',
  'Memo.json',
  'SignerKey.json',
  'ScAddress.json',
  'ClaimableBalanceId.json',
  'PoolId.json',
  'ConfigSettingEntry.json',
]

const BASE_URL = 'https://raw.githubusercontent.com/stellar/rs-stellar-xdr/main/xdr-json/curr'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const destDir = path.join(rootDir, 'tests', 'fixtures', 'xdr-json', 'curr')

const files = process.argv.slice(2).length > 0 ? process.argv.slice(2) : DEFAULT_FILES

await mkdir(destDir, { recursive: true })

const results = await Promise.allSettled(
  files.map(async (name) => {
    const url = `${BASE_URL}/${name}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`${name}: HTTP ${response.status} from ${url}`)
    }
    const content = await response.text()
    const outPath = path.join(destDir, name)
    await writeFile(outPath, content, 'utf8')
    return outPath
  }),
)

const failures = results
  .map((r, i) => ({ r, i }))
  .filter((x) => x.r.status === 'rejected')

if (failures.length > 0) {
  for (const failure of failures) {
    const file = files[failure.i]
    console.error(`Failed: ${file}: ${String(failure.r.reason)}`)
  }
  process.exit(1)
}

for (const result of results) {
  if (result.status === 'fulfilled') {
    console.log(`Wrote ${path.relative(rootDir, result.value)}`)
  }
}
