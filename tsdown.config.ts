import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    'index':                      'src/index.ts',
    'codec':                      'src/codec.ts',
    'strkey':                     'src/strkey.ts',
    'hashing':                    'src/hashing.ts',
    'validate':                   'src/validate.ts',
    'json':                       'src/json.ts',
    'generated/transaction':      'src/generated/transaction.ts',
    'generated/contract':         'src/generated/contract.ts',
    'generated/ledger-entries':   'src/generated/ledger-entries.ts',
    'generated/scp':              'src/generated/scp.ts',
    'generated/overlay':          'src/generated/overlay.ts',
  },
  format: 'esm',
  dts: true,
  clean: true,
  treeshake: true,
})
