# Aligning ts-xdr Types with SEP-0051 (XDR-JSON)

## Goal

Make the TypeScript types produced by ts-xdr structurally resemble [SEP-0051 XDR-JSON](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0051.md) as closely as possible, so that:

1. `JSON.stringify(value)` on a ts-xdr value is close to valid XDR-JSON
2. `JSON.parse(json)` on an XDR-JSON document is close to a valid ts-xdr value
3. Developers working with both formats share a single mental model

## Current State vs SEP-0051

### Already aligned

| Type        | ts-xdr             | SEP-0051     | Status                   |
| ----------- | ------------------ | ------------ | ------------------------ |
| int32       | `number`           | JSON number  | Aligned                  |
| uint32      | `number`           | JSON number  | Aligned                  |
| bool        | `boolean`          | JSON boolean | Aligned                  |
| string      | `string`           | JSON string  | Aligned                  |
| fixed array | `readonly T[]`     | JSON array   | Aligned                  |
| var array   | `readonly T[]`     | JSON array   | Aligned                  |
| struct      | object with fields | JSON object  | Aligned (naming differs) |

### Structural divergences

| Type                      | ts-xdr current                             | SEP-0051                        | Gap               |
| ------------------------- | ------------------------------------------ | ------------------------------- | ----------------- |
| **Union (void arm)**      | `{ tag: 'Native' }`                        | `"native"`                      | Different shape   |
| **Union (non-void)**      | `{ tag: 'CreditAlphanum4', value: {...} }` | `{ "credit_alphanum4": {...} }` | Different shape   |
| **Union (int, void)**     | `{ tag: 0 }`                               | `"v0"`                          | Different shape   |
| **Union (int, non-void)** | `{ tag: 1, value: {...} }`                 | `{ "v1": {...} }`               | Different shape   |
| **Enum**                  | `'Native'` (PascalCase)                    | `"native"` (snake_case)         | Naming            |
| **Struct fields**         | `camelCase`                                | `snake_case`                    | Naming            |
| **Optional (absent)**     | `T \| undefined`                           | `T \| null`                     | Null vs undefined |
| **Opaque**                | `Uint8Array`                               | hex string `"61626364"`         | Type-level        |
| **int64/uint64**          | `bigint`                                   | string `"9223372036854775807"`  | Type-level        |

## Proposed Changes

### 1. Union representation → externally tagged

**This is the biggest structural change.** SEP-0051 uses "externally tagged" unions:

- Void arms are a plain string (the discriminant name)
- Non-void arms are an object with a single key (the discriminant name) mapping to the value

#### Enum-discriminated

```xdr
union Asset switch (AssetType type) {
  case ASSET_TYPE_NATIVE: void;
  case ASSET_TYPE_CREDIT_ALPHANUM4: AlphaNum4 alphaNum4;
  case ASSET_TYPE_CREDIT_ALPHANUM12: AlphaNum12 alphaNum12;
};
```

**Current ts-xdr:**

```typescript
type Asset =
  | { readonly tag: 'Native' }
  | { readonly tag: 'CreditAlphanum4'; readonly value: AlphaNum4 }
  | { readonly tag: 'CreditAlphanum12'; readonly value: AlphaNum12 }

// Usage:
const a: Asset = { tag: 'Native' }
const b: Asset = { tag: 'CreditAlphanum4', value: { assetCode, issuer } }
switch (asset.tag) {
  case 'Native':
    break
  case 'CreditAlphanum4':
    asset.value.assetCode
    break
}
```

**Proposed (SEP-0051 aligned):**

```typescript
type Asset =
  | 'native'
  | { readonly credit_alphanum4: AlphaNum4 }
  | { readonly credit_alphanum12: AlphaNum12 };

// Usage:
const a: Asset = 'native';
const b: Asset = { credit_alphanum4: { asset_code, issuer } };
if (asset === 'native') { ... }
else if ('credit_alphanum4' in asset) { asset.credit_alphanum4.asset_code; }
```

#### Int-discriminated

```xdr
union SorobanTransactionMetaExt switch (int v) {
  case 0: void;
  case 1: SorobanTransactionMetaExtV1 v1;
};
```

SEP-0051 names these by suffixing the discriminant name with the integer: `"v0"`, `{ "v1": ... }`.

**Current ts-xdr:**

```typescript
type SorobanTransactionMetaExt =
  | { readonly tag: 0 }
  | { readonly tag: 1; readonly value: SorobanTransactionMetaExtV1 }
```

**Proposed:**

```typescript
type SorobanTransactionMetaExt = 'v0' | { readonly v1: SorobanTransactionMetaExtV1 }
```

#### TypeScript ergonomics

The `{ tag, value }` pattern gives clean `switch` narrowing. The externally-tagged pattern requires `in` checks or string equality:

```typescript
// { tag, value } pattern — clean switch
switch (asset.tag) {
  case 'Native': break;
  case 'CreditAlphanum4': asset.value; break;  // narrowed
}

// Externally tagged — requires if/else with 'in' checks
if (asset === 'native') { ... }
else if ('credit_alphanum4' in asset) { asset.credit_alphanum4; }
```

However, TypeScript does support narrowing via `in` checks, and a helper function can make this cleaner:

```typescript
// Type guard helper (provided by ts-xdr):
function is<K extends string>(union: string | object, key: K): union is { readonly [P in K]: any } {
  return typeof union === 'object' && union !== null && key in union
}

if (is(asset, 'credit_alphanum4')) {
  asset.credit_alphanum4 // narrowed to AlphaNum4
}
```

#### Tradeoffs

|                      | `{ tag, value }` (current)             | Externally tagged (SEP-0051)             |
| -------------------- | -------------------------------------- | ---------------------------------------- |
| TypeScript narrowing | `switch (x.tag)` — excellent           | `'key' in x` — good, needs helper        |
| JSON roundtrip       | Needs conversion                       | Direct `JSON.stringify`/`parse`          |
| Mental model         | ts-xdr-specific                        | Shared with XDR-JSON, Rust, CLI tools    |
| Void arm ergonomics  | Object: `{ tag: 'Native' }`            | String: `'native'` — more concise        |
| Construct a value    | `{ tag: 'CreditAlphanum4', value: v }` | `{ credit_alphanum4: v }` — more concise |

**Recommendation: adopt externally tagged.** The structural alignment with SEP-0051 is significant. The TypeScript ergonomics are adequate with `in` checks. Construction is more concise. And the mental model shared across Rust, CLI, and TypeScript is a strong argument.

### 2. Naming convention → snake_case

SEP-0051 uses snake_case for:

- Struct field names: `live_until_ledger_seq`, `source_account`
- Enum values: `native`, `credit_alphanum4`, `u32`, `bool`
- Union discriminant keys: `credit_alphanum4`, `v1`

ts-xdr currently uses:

- Struct field names: `liveUntilLedgerSeq`, `sourceAccount` (camelCase)
- Enum values: `Native`, `CreditAlphanum4` (PascalCase)
- Union keys: via `tag` field (changing per above)

**Proposed: switch to snake_case everywhere.**

```typescript
// Current:
interface TtlEntry {
  readonly keyHash: Uint8Array
  readonly liveUntilLedgerSeq: number
}
type AssetType = 'Native' | 'CreditAlphanum4' | 'CreditAlphanum12' | 'PoolShare'

// Proposed:
interface TtlEntry {
  readonly key_hash: Uint8Array
  readonly live_until_ledger_seq: number
}
type AssetType = 'native' | 'credit_alphanum4' | 'credit_alphanum12' | 'pool_share'
```

**Rationale:**

- 1:1 alignment with SEP-0051 — field names and enum values match exactly
- Consistent with Rust `rs-stellar-xdr` naming (also snake_case)
- Eliminates a naming transformation layer between JSON and TypeScript
- The XDR field names are already snake_case in the `.x` files; the current camelCase conversion is an additional transformation that SEP-0051 doesn't do

**Concern:** snake_case is not conventional TypeScript. However, since these are generated types representing a wire protocol (not hand-written application code), protocol fidelity is more valuable than language convention. Precedent: Protobuf TypeScript codegen also preserves snake_case field names.

### 3. Optional values → `T | null`

SEP-0051 uses `null` for absent optional values. ts-xdr currently uses `undefined`.

**Proposed: change to `T | null`.**

```typescript
// Current:
readonly inflation_dest: PublicKey | undefined;

// Proposed:
readonly inflation_dest: PublicKey | null;
```

**Rationale:**

- `null` survives JSON roundtrips (`JSON.stringify`/`JSON.parse`); `undefined` does not
- Aligns with SEP-0051
- Explicit presence in the object (`{ inflation_dest: null }` vs key being absent)

### 4. Opaque data → keep `Uint8Array`

SEP-0051 uses hex strings for opaque data. ts-xdr uses `Uint8Array`.

**Proposed: keep `Uint8Array` in TypeScript types.**

Hex strings are a JSON serialization concern, not a natural TypeScript representation. Working with binary data as `Uint8Array` is idiomatic in TypeScript — passing hex strings through crypto functions, XDR codecs, and array operations would require constant hex↔bytes conversion.

The `toJson()`/`fromJson()` methods (see below) handle hex encoding for JSON output.

### 5. 64-bit integers → keep `bigint`

SEP-0051 uses string representation for 64-bit integers (JSON number safety). ts-xdr uses native `bigint`.

**Proposed: keep `bigint` in TypeScript types.**

Native `bigint` is the correct TypeScript type for 64-bit integers. String representation is a JSON serialization concern. The `toJson()`/`fromJson()` methods handle string↔bigint conversion.

### 6. Stellar-specific rendering → generated layer, not ts-xdr core

SEP-0051 defines special rendering for Stellar-specific types:

- Address types (`AccountID`, `PublicKey`, `ScAddress`, etc.) → StrKey strings
- Asset codes (`AssetCode4`, `AssetCode12`) → trimmed strings
- Large integers (`Int128Parts`, `Int256Parts`) → base10 strings

These are **not part of the generic XDR codec**. They belong in the generated Stellar-specific layer (or in `stellar-base`), applied via custom JSON serialization hooks for those specific types.

## New API: `toJson()` / `fromJson()`

Add JSON serialization methods to `XdrCodec<T>` that produce/consume SEP-0051-compliant JSON:

```typescript
interface XdrCodec<T> {
  // Existing:
  toXdr(value: T, limits?: Limits): Uint8Array
  fromXdr(input: Uint8Array, limits?: Limits): T
  toBase64(value: T, limits?: Limits): string
  fromBase64(input: string, limits?: Limits): T

  // New:
  toJsonValue(value: T): unknown // T → JSON-safe value
  fromJsonValue(json: unknown): T // JSON-safe value → T
  toJson(value: T): string // T → JSON string
  fromJson(input: string): T // JSON string → T
}
```

These methods handle the conversions that differ between TypeScript types and JSON:

| TypeScript type | JSON value      | Conversion                                               |
| --------------- | --------------- | -------------------------------------------------------- |
| `Uint8Array`    | hex string      | `toJsonValue` encodes to hex, `fromJsonValue` decodes    |
| `bigint`        | string (base10) | `toJsonValue` converts to string, `fromJsonValue` parses |
| everything else | identity        | Structs, enums, unions, arrays pass through unchanged    |

With snake_case naming and externally-tagged unions, `toJsonValue` for most types is trivial — the TypeScript value IS the JSON value, except for `Uint8Array` and `bigint` fields.

## Impact on Generated Code

### Enums

```xdr
enum AssetType {
    ASSET_TYPE_NATIVE = 0,
    ASSET_TYPE_CREDIT_ALPHANUM4 = 1,
    ASSET_TYPE_CREDIT_ALPHANUM12 = 2,
    ASSET_TYPE_POOL_SHARE = 3
};
```

→

```typescript
export type AssetType = 'native' | 'credit_alphanum4' | 'credit_alphanum12' | 'pool_share'
export const AssetType = xdrEnum({
  native: 0,
  credit_alphanum4: 1,
  credit_alphanum12: 2,
  pool_share: 3,
})
```

**Prefix stripping + snake_case**: Strip common prefix (`ASSET_TYPE_`), convert remainder to snake_case.

### Structs

```xdr
struct TtlEntry {
    Hash keyHash;
    uint32 liveUntilLedgerSeq;
};
```

→

```typescript
export interface TtlEntry {
  readonly key_hash: Uint8Array
  readonly live_until_ledger_seq: number
}
export const TtlEntry: XdrCodec<TtlEntry> = xdrStruct<TtlEntry>([
  ['key_hash', Hash],
  ['live_until_ledger_seq', uint32],
])
```

**Field naming**: XDR field names are already typically camelCase in the `.x` files (`keyHash`, `liveUntilLedgerSeq`). The generator converts these to snake_case.

### Unions (enum-discriminated)

```xdr
union Asset switch (AssetType type) {
  case ASSET_TYPE_NATIVE: void;
  case ASSET_TYPE_CREDIT_ALPHANUM4: AlphaNum4 alphaNum4;
  case ASSET_TYPE_CREDIT_ALPHANUM12: AlphaNum12 alphaNum12;
};
```

→

```typescript
export type Asset =
  | 'native'
  | { readonly credit_alphanum4: AlphaNum4 }
  | { readonly credit_alphanum12: AlphaNum12 }

export const Asset: XdrCodec<Asset> = taggedUnion({
  switchOn: AssetType,
  arms: [
    { tags: ['native'] },
    { tags: ['credit_alphanum4'], key: 'credit_alphanum4', codec: AlphaNum4 },
    { tags: ['credit_alphanum12'], key: 'credit_alphanum12', codec: AlphaNum12 },
  ],
}) as XdrCodec<Asset>
```

### Unions (int-discriminated)

```xdr
union AccountEntryExt switch (int v) {
  case 0: void;
  case 1: AccountEntryExtensionV1 v1;
};
```

→

```typescript
export type AccountEntryExt = 'v0' | { readonly v1: AccountEntryExtensionV1 }

export const AccountEntryExt: XdrCodec<AccountEntryExt> = taggedUnion({
  switchOn: int32,
  arms: [
    { tags: [0], key: 'v0' },
    { tags: [1], key: 'v1', codec: AccountEntryExtensionV1 },
  ],
}) as XdrCodec<AccountEntryExt>
```

**Naming**: The discriminant variable name (`v`) is suffixed with the integer value: `v0`, `v1`.

### Optional

```xdr
AccountID* inflationDest;
```

→

```typescript
readonly inflation_dest: AccountID | null;
// codec: option(AccountID)  — option now produces null instead of undefined
```

## Impact on ts-xdr Core

### Changes needed

1. **`taggedUnion()` codec** — rework to encode/decode externally-tagged format:
   - Void arms: decode as string, encode from string
   - Non-void arms: decode as single-key object, encode as single-key object
   - The arm key names are provided in the config (no longer a generic `tag`/`value` structure)

2. **`option()` codec** — change to produce `null` instead of `undefined` for absent values

3. **`XdrCodec<T>` interface** — add `toJsonValue()`/`fromJsonValue()`/`toJson()`/`fromJson()` methods to `BaseCodec`

4. **`xdrEnum()` names** — no code change needed; the enum member names just change in the generated code

5. **Struct field names** — no core change; field names just change in the generated code

### No changes needed

- `XdrReader` / `XdrWriter` — binary encoding is unchanged
- Primitives (`int32`, `uint32`, `bool`, etc.) — unchanged
- Container codecs (`fixedOpaque`, `varOpaque`, `xdrString`, `fixedArray`, `varArray`) — unchanged
- `BaseCodec.toXdr()` / `fromXdr()` / `toBase64()` / `fromBase64()` — unchanged

## Summary of Changes

| Area                   | Change                                         | Scope                          |
| ---------------------- | ---------------------------------------------- | ------------------------------ |
| Union types            | `{ tag, value? }` → `string \| { key: value }` | Core codec + generated types   |
| Enum naming            | PascalCase → snake_case                        | Generated code only            |
| Struct field naming    | camelCase → snake_case                         | Generated code only            |
| Optional               | `undefined` → `null`                           | Core codec                     |
| JSON methods           | Add `toJson`/`fromJson` to `XdrCodec`          | Core codec                     |
| Opaque data            | Keep `Uint8Array` (hex in JSON only)           | JSON methods only              |
| 64-bit integers        | Keep `bigint` (string in JSON only)            | JSON methods only              |
| Stellar-specific types | Out of scope for ts-xdr core                   | Generated / stellar-base layer |

## End-to-End Example (after changes)

```typescript
import { Asset, TransactionEnvelope } from './stellar_generated.js'

// Construct
const asset: Asset = { credit_alphanum4: { asset_code, issuer } }
const native: Asset = 'native'

// Decode from XDR binary
const envelope = TransactionEnvelope.fromXdr(bytes)

// Pattern match
const tx = 'tx' in envelope ? envelope.tx : null

// Access fields (snake_case)
if (tx) {
  tx.tx.source_account
  tx.tx.fee
  tx.tx.seq_num // bigint
  tx.tx.operations[0]
}

// JSON roundtrip (SEP-0051 compliant)
const json = TransactionEnvelope.toJson(envelope)
const parsed = TransactionEnvelope.fromJson(json)

// Direct JSON.stringify is close to XDR-JSON
// (except Uint8Array fields appear as arrays, and bigints throw —
//  use toJsonValue() for a fully JSON-safe value)
const jsonSafe = JSON.stringify(TransactionEnvelope.toJsonValue(envelope))
```
