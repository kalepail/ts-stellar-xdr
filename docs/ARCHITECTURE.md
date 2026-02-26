# ts-stellar-xdr Architecture

A from-scratch, TypeScript-native, tree-shakable XDR codec for the Stellar network. Replaces
`@stellar/js-xdr` + `curr_generated.js` with zero runtime dependencies and proper ESM support.

---

## Guiding Principles

1. **TypeScript-native** — source is `.ts`, output is `.js + .d.ts`. No hand-maintained declaration files.
2. **Zero runtime dependencies** — the codec layer uses only `DataView`, `Uint8Array`, and native `BigInt`.
3. **ESM-only** — `"type": "module"`, `"sideEffects": false`. No CJS, no UMD.
4. **Tree-shakable** — one domain per file, pure function exports. Unused types don't end up in bundles.
5. **Spec as source of truth** — all types and codecs are generated from `stellar/stellar-xdr` `.x` files. No manual drift.
6. **No Ruby** — the code generator (`scripts/codegen/`) is TypeScript, runs with `node`.

---

## What This Package Is (and Isn't)

**Is:** An XDR codec. Encode/decode any Stellar protocol type to/from `Uint8Array`.

**Is not:** A transaction builder, keypair library, RPC client, or Horizon client. Those are higher-level concerns for a future `@stellar/base`, `@stellar/rpc`, etc.

---

## TypeScript Type Mapping

| XDR type | TypeScript type |
|---|---|
| `int` (i32) | `number` |
| `unsigned int` (u32) | `number` |
| `hyper` (i64) | `bigint` |
| `unsigned hyper` (u64) | `bigint` |
| `bool` | `boolean` |
| `void` | `void` (omitted in structs) |
| `opaque[N]` | `Uint8Array` (exactly N bytes) |
| `opaque<N>` | `Uint8Array` (0 to N bytes) |
| `string<N>` | `string` |
| `enum` | string literal union |
| `struct` | `interface` |
| `union` | discriminated union |
| `T[N]` (fixed array) | `[T, T, ...]` (tuple) or `T[]` |
| `T<N>` (var array) | `T[]` |
| `T*` (optional) | `T \| undefined` |
| `typedef T Foo` | `type Foo = T` |

### Enums → String Literal Unions

```typescript
// XDR: enum OperationType { CREATE_ACCOUNT = 0, PAYMENT = 1, ... }
type OperationType =
  | 'CREATE_ACCOUNT'
  | 'PAYMENT'
  | 'PATH_PAYMENT_STRICT_RECEIVE'
  // ...

// Value map lives in the codec (not in the type):
const OPERATION_TYPE_VALUE: Record<OperationType, number> = /*#__PURE__*/ {
  CREATE_ACCOUNT: 0,
  PAYMENT: 1,
  // ...
}
```

String literal unions are:
- Fully erased at runtime (zero cost)
- Exhaustively checkable with `switch`/`if`
- Readable in debug output

### Unions → Discriminated Unions

```typescript
// XDR: union TransactionEnvelope switch (EnvelopeType type) { ... }
type TransactionEnvelope =
  | { type: 'ENVELOPE_TYPE_TX_V0';       v0:      TransactionV0Envelope }
  | { type: 'ENVELOPE_TYPE_TX';          v1:      TransactionV1Envelope }
  | { type: 'ENVELOPE_TYPE_TX_FEE_BUMP'; feeBump: FeeBumpTransactionEnvelope }
```

TypeScript narrows automatically:
```typescript
if (env.type === 'ENVELOPE_TYPE_TX') {
  env.v1.tx.operations  // TS knows this is TransactionV1Envelope
}
```

### Structs → Interfaces

```typescript
// XDR: struct Transaction { MuxedAccount sourceAccount; uint32 fee; ... }
interface Transaction {
  sourceAccount: MuxedAccount
  fee: number            // uint32
  seqNum: bigint         // int64
  cond: Preconditions
  memo: Memo
  operations: Operation[]
  ext: TransactionExt
}
```

---

## Codec API

### Low-Level: Reader/Writer Functions

The primary API passes `XdrReader`/`XdrWriter` explicitly. Every read/write function is a named
export — unused functions are tree-shaken away.

```typescript
import { XdrReader, XdrWriter, createReader, createWriter, toBytes } from 'ts-stellar-xdr/codec'
import { readTransactionEnvelope, writeTransactionEnvelope } from 'ts-stellar-xdr/transaction'

// Decode
const r = createReader(bytes)
const tx = readTransactionEnvelope(r)

// Encode
const w = createWriter()
writeTransactionEnvelope(w, tx)
const encoded = toBytes(w)
```

### Convenience: Encode/Decode Functions

Each domain module also exports top-level helpers that allocate the reader/writer internally:

```typescript
import { encodeTransactionEnvelope, decodeTransactionEnvelope } from 'ts-stellar-xdr/transaction'

const bytes  = encodeTransactionEnvelope(tx)
const tx     = decodeTransactionEnvelope(bytes)
const tx2    = decodeTransactionEnvelope(base64String)  // also accepts base64
```

---

## XdrReader / XdrWriter

Backed by `DataView` + `Uint8Array`. No Node.js `Buffer` dependency.

```typescript
// All reads/writes are big-endian (false = big-endian in DataView)
// XDR padding: padLen(n) = (4 - n % 4) % 4
// Padding bytes MUST be zero; validated on read.

type XdrReader = { buf: Uint8Array; view: DataView; pos: number }
type XdrWriter = { buf: Uint8Array; view: DataView; pos: number }

// Primitives:
readInt32(r):  number     // DataView.getInt32(pos, false)
readUint32(r): number     // DataView.getUint32(pos, false)
readInt64(r):  bigint     // DataView.getBigInt64(pos, false)
readUint64(r): bigint     // DataView.getBigUint64(pos, false)
readBool(r):   boolean    // readUint32 !== 0
readFixedOpaque(r, len): Uint8Array  // reads len bytes + skips padding
readVarOpaque(r, maxLen): Uint8Array  // reads uint32 len, then bytes + padding
readString(r, maxLen): string  // readVarOpaque → TextDecoder
```

---

## File Structure

```
ts-stellar-xdr/
├── package.json          (type: module, sideEffects: false, exports map)
├── tsconfig.json         (target: ES2022, strict, moduleResolution: Bundler)
├── tsdown.config.ts      (format: esm, dts: true, multiple entry points)
├── ARCHITECTURE.md       (this file)
│
├── src/
│   ├── codec.ts          XdrReader, XdrWriter, all primitive read*/write* functions
│   │
│   ├── generated/        ← AUTO-GENERATED (run: node scripts/codegen)
│   │   ├── types.ts          All TypeScript type definitions
│   │   ├── transaction.ts    Transaction, Operations, Envelope codecs
│   │   ├── contract.ts       SCVal, SCAddress, Soroban codecs
│   │   ├── asset.ts          Asset, MuxedAccount, Price codecs
│   │   ├── ledger-entries.ts LedgerEntry, LedgerKey codecs
│   │   ├── scp.ts            SCP consensus types
│   │   ├── overlay.ts        P2P overlay protocol types
│   │   └── index.ts          Re-exports everything generated
│   │
│   └── index.ts          Public entry point (re-exports codec + generated)
│
├── scripts/
│   └── codegen/          ← NOT published; TypeScript XDR .x file → TS generator
│       ├── lexer.ts          Tokenize XDR IDL
│       ├── parser.ts         Parse tokens → AST
│       ├── ast.ts            AST type definitions
│       ├── generator.ts      AST → TypeScript types + read/write functions
│       └── index.ts          CLI: fetch stellar-xdr .x files, generate src/generated/
│
└── tests/
    ├── codec.test.ts
    ├── transaction.test.ts
    └── contract.test.ts
```

---

## Package.json Exports

```json
{
  "type": "module",
  "sideEffects": false,
  "exports": {
    ".":                          "./dist/index.js",
    "./codec":                    "./dist/codec.js",
    "./transaction":              "./dist/generated/transaction.js",
    "./contract":                 "./dist/generated/contract.js",
    "./asset":                    "./dist/generated/asset.js",
    "./ledger-entries":           "./dist/generated/ledger-entries.js",
    "./scp":                      "./dist/generated/scp.js",
    "./overlay":                  "./dist/generated/overlay.js"
  }
}
```

---

## Build Tooling

- **tsdown** (Rolldown-based, official tsup successor)
- Multiple entry points → multiple output files (one per subpath export)
- Tree-shaking enabled by default
- Outputs `.js` + `.d.ts` for each entry

```typescript
// tsdown.config.ts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index:                    'src/index.ts',
    codec:                    'src/codec.ts',
    'generated/transaction':  'src/generated/transaction.ts',
    'generated/contract':     'src/generated/contract.ts',
    'generated/asset':        'src/generated/asset.ts',
    'generated/ledger-entries': 'src/generated/ledger-entries.ts',
    'generated/scp':          'src/generated/scp.ts',
    'generated/overlay':      'src/generated/overlay.ts',
  },
  format: 'esm',
  dts: true,
  clean: true,
})
```

---

## Code Generation

The `scripts/codegen/` directory contains a TypeScript implementation of an XDR IDL parser
and TypeScript code generator. It replaces the Ruby `xdrgen` gem.

### Source: stellar/stellar-xdr (curr branch)

13 `.x` files, fetched at codegen time:
- `Stellar-types.x` — Hash, uint32, int64, PublicKey, etc.
- `Stellar-SCP.x` — consensus ballot types
- `Stellar-contract.x` — SCVal, SCAddress, SCError (Soroban)
- `Stellar-contract-spec.x` — contract ABI spec entries
- `Stellar-contract-env-meta.x` — environment metadata
- `Stellar-contract-meta.x` — contract metadata
- `Stellar-contract-config-setting.x` — Soroban fee/resource settings
- `Stellar-ledger-entries.x` — Assets, AccountEntry, LedgerKey, EnvelopeType
- `Stellar-ledger.x` — LedgerHeader, TransactionSet
- `Stellar-transaction.x` — ALL operations (27), Transaction, results (largest: 60.6 KB)
- `Stellar-overlay.x` — P2P message types
- `Stellar-internal.x` — internal storage
- `Stellar-exporter.x` — exporter types

### Output Grouping

The generator maps each `.x` file to an output file:

| .x files | Output file |
|---|---|
| `Stellar-transaction.x` + `Stellar-types.x` | `transaction.ts` |
| `Stellar-contract.x` + `Stellar-contract-spec.x` + `Stellar-contract-env-meta.x` + `Stellar-contract-meta.x` + `Stellar-contract-config-setting.x` | `contract.ts` |
| `Stellar-ledger-entries.x` (assets, accounts, trustlines) | `asset.ts` + `ledger-entries.ts` |
| `Stellar-SCP.x` | `scp.ts` |
| `Stellar-overlay.x` | `overlay.ts` |

---

## Testing Strategy

Use **vitest** with TypeScript.

1. **Unit tests for codec primitives**: round-trip tests for every primitive type
2. **Round-trip tests for complex types**: encode → decode → compare deep equal
3. **Regression tests against real XDR**: use known Stellar mainnet transaction XDR strings,
   decode them, verify field values match known expected values
4. **Compat tests**: verify our encoded output matches known-good XDR from the current SDK

Real XDR test vectors sourced from:
- Stellar testnet/mainnet transactions
- The existing `js-stellar-base` test suite (port the relevant XDR round-trip tests)

---

## Why Not Just Port js-xdr?

| Problem | js-xdr approach | Our approach |
|---|---|---|
| Code generation | Ruby gem (xdrgen) | TypeScript script |
| Type representation | Runtime OOP classes | Compiled TS interfaces |
| Encode/decode | Class static methods | Pure named functions |
| Bundle size | Monolithic 354 KB file | Split by domain, tree-shakable |
| TypeScript | Separate dts-xdr repo | Native TypeScript source |
| Dependencies | Buffer polyfill (browser) | DataView (zero deps) |
| ESM | "module" field only | Proper "exports" field |
| int64 | LargeInt wrapper class | Native bigint |
| Error messages | Cryptic XDR errors | Clear type-safe errors |

---

## XDR Wire Format Reference

- 4-byte boundary for all types
- Big-endian byte order
- Padding bytes must be `0x00` (validated on decode)
- `padLen(n) = (4 - n % 4) % 4`

```
int      → 4 bytes signed big-endian
uint     → 4 bytes unsigned big-endian
hyper    → 8 bytes signed big-endian
uhyper   → 8 bytes unsigned big-endian
bool     → 4 bytes (0 or 1)
enum     → 4 bytes (as int)
opaque[N]→ N bytes + padLen(N) zero bytes
opaque<N>→ 4-byte length + bytes + padding
string<N>→ 4-byte length + UTF-8 bytes + padding
T[N]     → N × encode(T) concatenated
T<N>     → 4-byte count + count × encode(T)
T*       → 4-byte flag (0/1) + if 1: encode(T)
struct   → fields in declaration order
union    → 4-byte discriminant + active arm
void     → 0 bytes
```
