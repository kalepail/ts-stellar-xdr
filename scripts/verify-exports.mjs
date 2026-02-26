import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const packageJsonPath = path.join(cwd, 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

const missing = []

for (const [subpath, target] of Object.entries(packageJson.exports ?? {})) {
  if (typeof target === 'string') {
    const abs = path.join(cwd, target)
    if (!fs.existsSync(abs)) {
      missing.push({ subpath, kind: 'path', file: target })
    }
    continue
  }

  const importFile = target.import
  const typeFile = target.types

  if (typeof importFile === 'string') {
    const abs = path.join(cwd, importFile)
    if (!fs.existsSync(abs)) {
      missing.push({ subpath, kind: 'import', file: importFile })
    }
  }

  if (typeof typeFile === 'string') {
    const abs = path.join(cwd, typeFile)
    if (!fs.existsSync(abs)) {
      missing.push({ subpath, kind: 'types', file: typeFile })
    }
  }
}

if (missing.length > 0) {
  console.error('Export validation failed. Missing files:')
  for (const entry of missing) {
    console.error(`- ${entry.subpath} (${entry.kind}): ${entry.file}`)
  }
  process.exit(1)
}

console.log('Export validation passed.')
