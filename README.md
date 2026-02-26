# ts-stellar-xdr

A modern, TypeScript-native XDR codec for the Stellar network.

This project provides generated Stellar protocol types and codecs, plus hand-written utilities for StrKey handling, transaction hashing, SCVal ergonomics, JSON conversion helpers, and framed XDR streams.

## Purpose

`ts-stellar-xdr` is designed as a low-level foundation for Stellar SDK tooling:

- Encode/decode Stellar XDR with strict validation.
- Keep generated protocol coverage current from `stellar/stellar-xdr`.
- Provide tree-shakable ESM modules with strong TypeScript types.
- Support XDR-JSON style workflows (SEP-0051 alignment) through generated `toJson*` / `fromJson*` APIs.

## Key Features

- TypeScript-first generated surface from upstream `.x` definitions.
- Zero runtime dependencies in the core codec layer.
- ESM-only package with `sideEffects: false` for tree shaking.
- Strict decode safety:
  - depth and byte limits (`XdrLimits`),
  - full-buffer consumption checks,
  - strict UTF-8 string decoding.
- Generated per-type helpers:
  - `read*` / `write*`,
  - `encode*` / `decode*`,
  - `toJson*` / `fromJson*`.
- StrKey support for Stellar address/key formats:
  - `G`, `S`, `C`, `M`, `T`, `X`, `P`, `B`, `L`.
- Hashing utilities for network IDs and transaction signature payload hashing.
- SCVal utilities:
  - native JS ↔ `SCVal` conversion helpers,
  - Soroban-oriented SCVal validation and SCMap sorting/ordering helpers.
- RFC5531 record-marked framed XDR encode/decode support.
- Differential and schema conformance tests against Stellar ecosystem references.

## Scope

This package is an XDR codec and protocol-type layer. It is not a full transaction-builder, RPC client, or Horizon client.

## Installation

### As a dependency

```bash
bun add ts-stellar-xdr
# or
npm install ts-stellar-xdr
```

### For local development

```bash
bun install
```

## Quick Start

### 1) Decode and re-encode a transaction envelope

```ts
import { decodeTransactionEnvelope, encodeTransactionEnvelope } from 'ts-stellar-xdr/transaction'

const env = decodeTransactionEnvelope('AAAAAgAAAADL13HWIyocdKsZ...')
const bytes = encodeTransactionEnvelope(env)
```

### 2) Use low-level codec primitives

```ts
import { createWriter, toBytes, writeUint32, decode, readUint32 } from 'ts-stellar-xdr/codec'

const w = createWriter()
writeUint32(w, 42)
const bytes = toBytes(w)

const value = decode(bytes, readUint32) // 42
```

### 3) Use generated JSON conversion helpers

```ts
import {
  decodeTransactionEnvelope,
  toJsonTransactionEnvelope,
  fromJsonTransactionEnvelope,
} from 'ts-stellar-xdr/transaction'

const env = decodeTransactionEnvelope('AAAAAgAAAADL13HWIyocdKsZ...')
const json = toJsonTransactionEnvelope(env)
const envRoundtrip = fromJsonTransactionEnvelope(json)
```

## Module Overview

- `ts-stellar-xdr`:
  - re-exports core modules plus all generated modules.
- `ts-stellar-xdr/codec`:
  - primitive XDR read/write, base64/hex utils, stream decode, limits, errors.
- `ts-stellar-xdr/transaction`, `.../contract`, `.../asset`, `.../ledger`, etc.:
  - generated protocol-specific types/codecs/JSON helpers.
- `ts-stellar-xdr/strkey`:
  - StrKey encode/decode and validators.
- `ts-stellar-xdr/hashing`:
  - SHA-256, network IDs, tx signature base/hash helpers.
- `ts-stellar-xdr/validate`:
  - `validateScVal`, `validateScMap`, `compareScVal`, `buildSortedScMap`.
- `ts-stellar-xdr/scval`:
  - `nativeToScVal`, `scValToNative`, `scValToBigInt`.
- `ts-stellar-xdr/helpers`:
  - helpers like `ledgerEntryToKey`, envelope wrapping/hash/auth extraction.
- `ts-stellar-xdr/framed`:
  - RFC5531 record-marked framed XDR encode/decode.
- `ts-stellar-xdr/introspection`:
  - generated enum/union introspection metadata.

## Safety and Validation Model

- Decode uses configurable limits:
  - default `maxDepth: 500`,
  - default `maxBytes: 32 MiB`.
- Padding bytes are validated as zero on decode.
- `decode(...)` requires full input consumption.
- `validate(...)` / `validateXDR(...)` provide fast pass/fail checks.
- Invalid UTF-8 in XDR strings is rejected with `XdrReadError`.

## Code Generation and Protocol Channels

Generated files live in `src/generated` and are produced by `scripts/codegen/`.

- Source lock: `scripts/codegen/source-lock.json`.
- Default channel: `curr` (currently pinned via source lock).
- Optional channel generation: `next` into `src/generated-next`.

Run:

```bash
bun run codegen
bun run codegen:next
```

Do not manually edit files in `src/generated`.

## Development Commands

```bash
bun run build
bun run test
bun run typecheck
bun run lint
bun run fmt:check
```

Additional utilities:

```bash
bun run sync:schemas   # sync xdr-json schemas used by schema conformance tests
bun run verify:exports # verify package export targets exist after build
```

## Test and Conformance Coverage

The repository includes:

- codec primitive/property-style tests,
- transaction/fee-bump/v0-v1 roundtrip vectors,
- differential tests against `@stellar/stellar-base`,
- JSON schema conformance checks using `rs-stellar-xdr` xdr-json schemas,
- parity-oriented tests for SEP-0051/rs-stellar-xdr JSON conventions.

## License

Apache-2.0
