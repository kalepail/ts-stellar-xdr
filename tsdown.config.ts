import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    codec: 'src/codec.ts',
    strkey: 'src/strkey.ts',
    hashing: 'src/hashing.ts',
    validate: 'src/validate.ts',
    json: 'src/json.ts',
    helpers: 'src/helpers.ts',
    scval: 'src/scval.ts',
    framed: 'src/framed.ts',
    'generated/types': 'src/generated/types.ts',
    'generated/asset': 'src/generated/asset.ts',
    'generated/scp': 'src/generated/scp.ts',
    'generated/contract': 'src/generated/contract.ts',
    'generated/contract-spec': 'src/generated/contract-spec.ts',
    'generated/contract-env-meta': 'src/generated/contract-env-meta.ts',
    'generated/contract-meta': 'src/generated/contract-meta.ts',
    'generated/contract-config-setting': 'src/generated/contract-config-setting.ts',
    'generated/ledger-entries': 'src/generated/ledger-entries.ts',
    'generated/ledger': 'src/generated/ledger.ts',
    'generated/transaction': 'src/generated/transaction.ts',
    'generated/overlay': 'src/generated/overlay.ts',
    'generated/internal': 'src/generated/internal.ts',
    'generated/exporter': 'src/generated/exporter.ts',
    'generated/introspection': 'src/generated/introspection.ts',
  },
  format: 'esm',
  dts: true,
  clean: true,
  treeshake: true,
  // Keep extension conventions aligned with package.json exports.
  outExtensions: () => ({
    js: '.js',
    dts: '.d.ts',
  }),
})
