# ts-stellar-xdr: Research Findings & Improvements

Research conducted across all repositories in RESOURCES.md to identify gaps and
improvements for building a modern, tree-shakeable TypeScript XDR codec library
for the Stellar network.

## Repositories Analyzed

| Repository | What it is |
|---|---|
| [stellar/dts-xdr](https://github.com/stellar/dts-xdr) | TypeScript type declarations for the existing js-xdr library |
| [stellar/js-xdr](https://github.com/stellar/js-xdr) | Current JS XDR runtime (class-based, no tree-shaking) |
| [stellar/js-stellar-base](https://github.com/stellar/js-stellar-base) | JS Stellar primitives: Transaction, Operation, StrKey, signing |
| [stellar/js-stellar-sdk](https://github.com/stellar/js-stellar-sdk) | Full JS SDK: Horizon client, Soroban RPC, contract.Client |
| [tomerweller/ts-xdr](https://github.com/tomerweller/ts-xdr) | Independent TypeScript XDR library with type-value duality |
| [stellar/rs-stellar-xdr](https://github.com/stellar/rs-stellar-xdr) | Rust reference implementation — the gold standard |
| [stellar/xdrgen](https://github.com/stellar/xdrgen) | Ruby-based XDR code generator (supports multiple languages) |
| [stellar/stellar-xdr](https://github.com/stellar/stellar-xdr) | Canonical .x IDL source files for all Stellar XDR types |
| [stellar/js-stellar-xdr-json](https://github.com/stellar/js-stellar-xdr-json) | JSON serialization for Stellar XDR (JS) |
| [stellar/go-xdr](https://github.com/stellar/go-xdr) | Go XDR codec |
| [stellar/go-stellar-xdr-json](https://github.com/stellar/go-stellar-xdr-json) | JSON serialization for Stellar XDR (Go) |

---

## What We Already Have (Implemented)

### Core Codec (`src/codec.ts`)
- **XDR RFC 4506 compliance** — big-endian, 4-byte alignment, zero-padding validation
- **All primitive types** — int32, uint32, int64 (bigint), uint64 (bigint), bool, float, double
- **Opaque/string** — fixed opaque, var opaque, var string (UTF-8)
- **Composites** — optional (T*), fixed array (T[N]), var array (T<N>)
- **Depth + byte limit tracking** — `XdrLimits` with `maxDepth: 500` and `maxBytes: 8 MiB` defaults, matching rs-stellar-xdr's `Limits` system
- **`LIMITS_NONE` escape hatch** — `{ maxDepth: Infinity, maxBytes: Infinity }` for trusted input
- **Write-side range validation** — all integer writes reject NaN, Infinity, and out-of-range values
- **Strict bool decoding** — rejects any value other than 0 or 1
- **`beginComposite`/`endComposite`** — depth tracking in generated struct/union readers
- **`decodeStream()` generator** — streaming decode for reading multiple values from a byte stream
- **Base64 I/O** — encode/decode with whitespace stripping, pure JS fallback
- **Hex utilities** — `bytesToHex`, `hexToBytes`
- **TextEncoder/TextDecoder singletons** — avoid re-creation per call
- **`/*#__PURE__*/` annotations** — tree-shaking hints for bundlers

### Code Generator (`scripts/codegen/`)
- **Custom TypeScript codegen** — no Ruby, no Docker, no xdrgen dependency
- **Lexer → Parser → AST → Generator** pipeline
- **480 definitions across 13 files** from stellar/stellar-xdr `curr` branch
- **String literal enums** with bidirectional `_TO_INT` / `_FROM_INT` lookup maps
- **TypeScript discriminated unions** for XDR union types
- **`readonly` on all generated interface and union fields** — immutability by default
- **Cross-file imports** — automatic import analysis with `import type` for verbatimModuleSyntax
- **Reserved word escaping** — safe variable names for fields like `type`, `default`, etc.
- **Inline anonymous struct/union hoisting** — synthetic top-level definitions
- **Forward-compatible `defaultArm`** — unions with default arms generate catch-all clauses
- **JSON serialization** — `toJson${Type}` / `fromJson${Type}` for all types, enum prefix maps, custom StrKey/AssetCode/Int128-256 handling

### JSON Serialization (`src/json.ts` + generated)
- **Canonical JSON format** — matches rs-stellar-xdr serde output
- **Enum JSON** — prefix-stripped, lowercased names (e.g. `MEMO_NONE` → `"none"`)
- **Union JSON** — void arms as bare strings, non-void as `{"arm_name": value}`
- **Struct JSON** — camelCase fields → snake_case keys
- **Integer JSON** — int32/uint32 as numbers, int64/uint64 as decimal strings
- **Opaque JSON** — lowercase hex strings
- **Custom types** — PublicKey→G-address, MuxedAccount→G/M-address, AssetCode→trimmed ASCII, ContractID→C-address
- **Int128/256 Parts** — decimal string representation via BigInt arithmetic
- **Runtime helpers** — `src/json.ts` (2.35 kB, 0.89 kB gzipped)

### Package Design
- **Multi-entry-point exports** — `./codec`, `./strkey`, `./hashing`, `./validate`, `./json`, `./transaction`, `./contract`, `./ledger-entries`, `./scp`, `./overlay`
- **Tree-shakeable** — `sideEffects: false`, function-based API (no classes)
- **Zero dependencies** — works in all environments (browser, Node, Deno, Bun)
- **ESM-only** — `"type": "module"` with `.js` import extensions

### Tests
- **254 tests passing** — codec primitives, roundtrip tests, strkey, hashing, validation, JSON serialization
- **Write validation tests** — non-integer, NaN, Infinity, out-of-range for all integer types
- **Depth/byte limit tests** — enforcement, tracking, custom limits, LIMITS_NONE
- **Streaming decode tests** — multiple values, empty input, lazy generator, base64
- **JSON tests** — enum prefix stripping, union void/data arms, struct snake_case, custom StrKey/AssetCode/Int128-256, full roundtrips

---

## Remaining Gaps

### Gap 1: JSON Serialization (toJSON / fromJSON)

**Source:** rs-stellar-xdr, js-stellar-xdr-json, go-stellar-xdr-json

**Problem:** XDR is a binary format. For debugging, logging, REST APIs, and
interoperability, a canonical JSON representation is needed.

**Key Finding:** All three implementations (JS, Go, Rust) produce byte-identical
JSON because js-stellar-xdr-json and go-stellar-xdr-json are thin wrappers
around the same Rust code compiled to WASM/CGo respectively. The format is
defined entirely by `serde` annotations in rs-stellar-xdr. There is **no formal
spec document** — it is implementation-defined.

**Canonical JSON Format (from rs-stellar-xdr serde):**

| XDR Concept | JSON Representation | Example |
|---|---|---|
| Enum (plain) | snake_case string | `"none"`, `"text"`, `"id"` |
| Enum (custom_str_impl) | StrKey or Display string | `"GAAA..."` |
| int64 / uint64 | JSON string (decimal) | `"123"`, `"-456"` |
| int32 / uint32 | JSON number | `100`, `0` |
| Int128Parts / UInt128Parts | JSON string (decimal) | `"18446744073709551618"` |
| opaque<> (BytesM) | **Hex string** (not base64) | `"68656c6c6f"` |
| opaque[N] (Hash, Uint256) | **Hex string** | `"3031323334..."` |
| string<> (StringM) | Escaped printable string | `"hello world"` |
| PublicKey / AccountId | StrKey G-address | `"GAAA..."` |
| MuxedAccount | StrKey G/M-address | `"GA6L..."` or `"MAAA..."` |
| ScAddress | StrKey G/C-address | `"GAAA..."` or `"CAAA..."` |
| Asset (union) | Structured union object | `"native"` or `{"credit_alphanum4": {...}}` |
| AssetCode4 / AssetCode12 | Escaped ASCII string | `"ABCD"` |
| Union (data arm) | `{"snake_case_name": value}` | `{"text": "Stellar"}` |
| Union (void arm) | `"snake_case_name"` | `"none"`, `"v0"` |
| Optional present | Value directly | `"GAAA..."` |
| Optional absent | `null` | `null` |
| Struct fields | snake_case keys | `"source_account"`, `"seq_num"` |

**Priority:** High for SDK readiness. Depends on StrKey (Gap 2) for
PublicKey/AccountId/MuxedAccount/ScAddress/Contract serialization.

**Status:** DONE. Implemented in `src/json.ts` (runtime helpers) with generated
`toJson${Type}` / `fromJson${Type}` functions for all 480 XDR definitions.
Runtime helpers handle Int128/UInt128/Int256/UInt256 Parts ↔ decimal string
conversion and AssetCode trim/pad. Codegen emits JSON maps for enums
(prefix-stripped, lowercased), snake_case struct keys, union void arms as
bare strings vs object arms, and custom serialization for PublicKey (G-address),
MuxedAccount (G/M-address), AssetCode (trimmed ASCII), and ContractID (C-address).
54 tests covering all JSON serialization patterns.

### Gap 2: StrKey Encoding/Decoding

**Source:** js-stellar-base, rs-stellar-strkey, SEP-0023

**Problem:** Stellar uses "StrKey" encoding for human-readable addresses.

**Algorithm:** `BASE32_NOPAD(versionByte + payload + CRC16_XMODEM_LE(versionByte + payload))`

- Base32: RFC 4648 standard alphabet (A-Z, 2-7), **no padding** (`=` never used)
- CRC16: XMODEM polynomial 0x1021, init 0x0000, stored **little-endian**
- CRC is computed over `[version_byte ++ payload_data]`, before base32 encoding

**Version Bytes:**

| Key Type | Version Byte | Hex | First Char | Payload | Encoded Length |
|---|---|---|---|---|---|
| ED25519 Public Key | 6 << 3 = 48 | 0x30 | G | 32 bytes | 56 chars |
| ED25519 Secret Seed | 18 << 3 = 144 | 0x90 | S | 32 bytes | 56 chars |
| Muxed Account | 12 << 3 = 96 | 0x60 | M | 32 + 8 bytes | 69 chars |
| Pre-Auth Tx | 19 << 3 = 152 | 0x98 | T | 32 bytes | 56 chars |
| SHA256 Hash | 23 << 3 = 184 | 0xB8 | X | 32 bytes | 56 chars |
| Signed Payload | 15 << 3 = 120 | 0x78 | P | variable | variable |
| Contract | 2 << 3 = 16 | 0x10 | C | 32 bytes | 56 chars |

**Key Gotchas:**
1. CRC16 checksum is little-endian (despite network byte order for data)
2. Muxed account memo ID is big-endian uint64
3. Signed payload inner data uses XDR var-opaque encoding (4-byte length + padding)
4. Unused trailing bits in base32 must be zero
5. Padding characters (`=`) must be rejected
6. Round-trip validation: re-encoding must produce identical string

**Priority:** High for SDK readiness. Required by JSON serialization (Gap 1).

**Status:** DONE. Implemented in `src/strkey.ts` with 34 tests.
Exports: `encodeStrKey`, `decodeStrKey`, `isValidStrKey`, `isValidStrKeyOfType`,
plus typed convenience helpers for G/S/C/M addresses.

### Gap 3: Transaction Hashing

**Source:** js-stellar-base, rs-stellar-xdr

**Problem:** Transaction signatures require a specific hash:
```
SHA256(networkId || envelopeTypeTx || xdr(transaction))
```
Where `networkId` is `SHA256(networkPassphrase)` and `envelopeTypeTx` is the
XDR-encoded `EnvelopeType` discriminant.

This is critical for signing and verifying transactions.

**Priority:** High for SDK readiness.

**Status:** DONE. Implemented in `src/hashing.ts` with 19 tests.
Includes inline SHA-256 (FIPS 180-4, zero dependencies, synchronous),
`networkId()`, `hashTransaction()`, `hashFeeBumpTransaction()`,
`Networks` constants (PUBLIC, TESTNET, FUTURENET, SANDBOX, STANDALONE).

### Gap 4: ScVal Validation

**Source:** rs-stellar-xdr (Validate trait)

**Problem:** `ScVal` (Soroban smart contract values) have semantic constraints
that go beyond XDR structure:

- `SCV_SYMBOL` — only characters `[a-zA-Z0-9_]`, max 32 chars
- `SCV_MAP` — keys must be sorted, no duplicates
- `SCV_VEC` / `SCV_MAP` — elements must not be `SCV_VOID`
- Nested ScVal values must also be valid

The Rust implementation has a `Validate` trait that checks these after decode.

**Priority:** Medium. Important for Soroban contract interactions but not for
basic XDR encode/decode correctness.

**Status:** DONE. Implemented in `src/validate.ts` with 44 tests.
Exports: `validateScVal`, `validateScMap`, `compareScVal`, `ScValValidationError`.
Validates symbol characters, rejects Vec(None)/Map(None), checks map key
strict ascending sort order with no duplicates, and recursively validates
all nested ScVal values.

### Gap 5: Doc Comments from .x Source Files

**Source:** rs-stellar-xdr, stellar-xdr

**Problem:** The .x IDL source files contain comments that describe types,
fields, and enum values. These are currently discarded during parsing. Propagating
them to generated TypeScript as JSDoc comments would significantly improve
developer experience with IDE tooltips and documentation.

**Priority:** Low. Quality-of-life improvement.

**Status:** DONE. Lexer now captures comments and attaches them to tokens.
Parser propagates doc comments to AST nodes (definitions and fields).
Generator emits JSDoc comments on interfaces, types, enums, consts, and
individual struct fields. Both `//` and `/* */` comment styles are supported.
Blank lines between comments and definitions correctly break association.

---

## Round 3 Research Findings (Feb 2026)

Deep parallel research across all 11 RESOURCES.md repositories using full MCP
tool access (deepwiki, web search, GitHub API). 8 agents ran concurrently.
Findings organized by severity and priority.

---

### CRITICAL: JSON Format Incompatibilities (7 types)

**Source:** js-stellar-xdr-json (WASM wrapper around rs-stellar-xdr serde),
confirmed against rs-stellar-xdr `custom_str_impl` list in `xdr-generator/generate.rb`.

rs-stellar-xdr defines 19 types with `custom_str_impl` that serialize as flat
strings (StrKey addresses, decimal numbers, trimmed ASCII) rather than standard
union/struct JSON objects. Our library correctly handles 11 of 19 but misses 8.

**Full `custom_str_impl` type list and our status:**

| Type | rs-stellar-xdr JSON | Our JSON | Match? |
|---|---|---|---|
| `PublicKey` | G-address string | G-address string | YES |
| `AccountId` | G-address string (via PublicKey) | G-address string | YES |
| `ContractId` | C-address string | C-address string | YES |
| `MuxedAccount` | G/M-address string | G/M-address string | YES |
| `AssetCode` | Trimmed ASCII | Trimmed ASCII | YES |
| `AssetCode4` | Trimmed ASCII | Trimmed ASCII | YES |
| `AssetCode12` | Trimmed ASCII | Trimmed ASCII | YES |
| `Int128Parts` | Decimal string | Decimal string | YES |
| `UInt128Parts` | Decimal string | Decimal string | YES |
| `Int256Parts` | Decimal string | Decimal string | YES |
| `UInt256Parts` | Decimal string | Decimal string | YES |
| **`SignerKey`** | **G/T/X/P strkey string** | Union object `{"ed25519":"hex"}` | **NO** |
| **`SignerKeyEd25519SignedPayload`** | **P-strkey string** | Struct object `{"ed25519":"hex","payload":"hex"}` | **NO** |
| **`NodeId`** | **G-address string** | G-address (via PublicKey typedef) | **VERIFY** |
| **`ScAddress`** | **G/C/M strkey string** | Union object `{"account":"G..."}` | **NO** |
| **`ClaimableBalanceId`** | **Strkey string** | Union object `{"claimable_balance_id_type_v0":"hex"}` | **NO** |
| **`PoolId`** | **Strkey string** | Hex hash string | **NO** |
| **`MuxedAccountMed25519`** | **M-strkey string** | Struct object `{"id":"123","ed25519":"hex"}` | **NO** |
| **`MuxedEd25519Account`** | **M-strkey string** | Struct object `{"id":"123","ed25519":"hex"}` | **NO** |

**Fix requires:**
1. Add `SignerKey` to CUSTOM_JSON_TYPES — serialize as G/T/X/P strkey based on variant
2. Add `SignerKeyEd25519SignedPayload` to CUSTOM_JSON_TYPES — serialize as P-strkey
3. Add `ScAddress` to CUSTOM_JSON_TYPES — serialize as flat G/C/M strkey
4. Add `ClaimableBalanceId` to CUSTOM_JSON_TYPES — serialize as strkey
5. Add `PoolId` to CUSTOM_JSON_TYPES — serialize as strkey (need new L-prefix support?)
6. Add `MuxedAccountMed25519` to CUSTOM_JSON_TYPES — serialize as M-strkey
7. Add `MuxedEd25519Account` to CUSTOM_JSON_TYPES — serialize as M-strkey
8. Verify `NodeId` typedef delegates correctly (likely already correct)

**strkey.ts additions needed:** `encodePreAuthTx`, `decodePreAuthTx`,
`encodeSha256Hash`, `decodeSha256Hash`, `encodeSignedPayload`, `decodeSignedPayload`.
May also need claimable balance (B-prefix?) and liquidity pool strkey if those
exist in SEP-23. Need to verify against rs-stellar-xdr Display/FromStr impls.

**Priority:** CRITICAL. JSON interoperability with the canonical format is broken
for these 7 types. Any tool comparing our JSON output with rs-stellar-xdr/
js-stellar-xdr-json will see mismatches.

**Status:** DONE. All 7 types now serialize to match rs-stellar-xdr canonical format.
Added B-prefix (claimableBalance) and L-prefix (liquidityPool) strkey support.
Added `encodePreAuthTx`, `encodeSha256Hash`, `encodeSignedPayload`,
`encodeClaimableBalance`, `encodeLiquidityPool` and their decode counterparts.

---

### HIGH: Exception-Safe Depth Tracking

**Source:** tomerweller/ts-xdr (`withDepth()` pattern)

**Problem:** Our `beginComposite(r)` / `endComposite(r)` pattern is NOT exception-safe.
If decoding throws between the two calls, the depth counter stays incremented,
corrupting the limit state for any subsequent decode on the same reader.

```typescript
// Current (unsafe):
beginComposite(r)         // depth++
const field = readFoo(r)  // throws!
endComposite(r)           // never reached — depth stays incremented

// tomerweller's approach (safe):
withDepth<T>(fn: () => T): T {
  this.currentDepth++
  if (this.currentDepth > this.limits.depth) throw ...
  try { return fn() } finally { this.currentDepth-- }
}
```

**Fix:** Wrap generated struct/union read functions in try/finally:
```typescript
beginComposite(r)
try {
  // ... read fields ...
} finally {
  endComposite(r)
}
```

**Priority:** HIGH. Correctness bug affecting error recovery scenarios.

**Status:** DONE. Generated struct and union readers now wrap the body in
`try { ... } finally { endComposite(r) }` so depth is always decremented
even when decoding throws.

---

### HIGH: UTF-8 Fatal Mode on TextDecoder

**Source:** tomerweller/ts-xdr

**Problem:** Our shared `TextDecoder` does not use `{ fatal: true }`, so invalid
UTF-8 sequences in XDR strings silently pass through with replacement characters
(U+FFFD) instead of throwing an error. This violates XDR string semantics.

**Fix:** `new TextDecoder('utf-8', { fatal: true })` in codec.ts.

**Priority:** HIGH. Silent data corruption on invalid input.

**Status:** DONE. Changed `new TextDecoder()` to `new TextDecoder('utf-8', { fatal: true })`
in `src/codec.ts`. Invalid UTF-8 sequences now throw instead of silently
producing replacement characters (U+FFFD).

---

### MEDIUM: Typed Error Codes

**Source:** tomerweller/ts-xdr (`XdrErrorCode`), go-xdr (`ErrorCode`), rs-stellar-xdr

**Problem:** Our `XdrReadError` / `XdrWriteError` have message strings only.
Three other implementations provide typed error codes for programmatic handling.

**Proposed error codes (11, matching tomerweller/ts-xdr):**

| Code | Meaning |
|---|---|
| `INVALID_VALUE` | Value out of valid range |
| `LENGTH_EXCEEDS_MAX` | Variable-length data exceeds declared maximum |
| `LENGTH_MISMATCH` | Expected vs actual length mismatch |
| `NON_ZERO_PADDING` | XDR padding bytes are not all zeros |
| `BUFFER_UNDERFLOW` | Not enough bytes remaining |
| `BUFFER_NOT_FULLY_CONSUMED` | Trailing bytes after decode |
| `DEPTH_LIMIT_EXCEEDED` | Recursion depth limit hit |
| `BYTE_LIMIT_EXCEEDED` | Byte budget exhausted |
| `INVALID_ENUM_VALUE` | Unknown enum discriminant value |
| `INVALID_UNION_DISCRIMINANT` | Invalid union switch value |
| `UTF8_ERROR` | Invalid UTF-8 in string |

**Implementation:** Single `XdrError` class with `code: XdrErrorCode` property.
Replace `XdrReadError`/`XdrWriteError` (or keep as subclasses for backwards compat).

**Priority:** MEDIUM. Enables `switch(err.code)` instead of string parsing.

**Status:** DONE. `XdrReadError` and `XdrWriteError` now have a `readonly code: XdrErrorCode`
property. All 11 error codes are assigned to every throw site in `codec.ts` and the
generator emits `INVALID_ENUM_VALUE` / `INVALID_UNION_DISCRIMINANT` for generated readers.
`readString` wraps UTF-8 decode errors as `UTF8_ERROR`. Exported `XdrErrorCode` type.

---

### MEDIUM: Int128/256 Parts Dual Deserialization

**Source:** rs-stellar-xdr serde custom deserializer

**Problem:** rs-stellar-xdr accepts BOTH `"18446744073709551618"` (decimal string)
AND `{"hi": 1, "lo": 2}` (struct object) when deserializing Int128Parts/UInt128Parts.
Our `fromJson` only accepts the decimal string form.

**Fix:** In `fromJsonInt128Parts`/`fromJsonUInt128Parts`/etc., check `typeof json`:
- If `string` → decimal conversion (current path)
- If `object` with `hi`/`lo` keys → construct from parts directly

**Priority:** MEDIUM. Improves interoperability with JSON from various sources.

**Status:** DONE. Generated `fromJsonInt128Parts`, `fromJsonUInt128Parts`,
`fromJsonInt256Parts`, `fromJsonUInt256Parts` now check `typeof json === 'object'`
first and accept `{ hi, lo }` / `{ hi_hi, hi_lo, lo_hi, lo_lo }` object forms
with values as either numbers or strings (passed through `BigInt()`).

---

### MEDIUM: Raise Default maxBytes Limit

**Source:** go-stellar-xdr-json, rs-stellar-xdr

**Problem:** Our `DEFAULT_LIMITS.maxBytes` is 8 MiB. The Rust core uses 32 MiB.
Large payloads like transaction sets and full ledger metadata can exceed 8 MiB.

**Fix:** Change `DEFAULT_LIMITS.maxBytes` from `8 * 1024 * 1024` to `32 * 1024 * 1024`.

**Priority:** MEDIUM. Prevents spurious failures on large but valid data.

**Status:** DONE. Changed `DEFAULT_LIMITS.maxBytes` from `0x800000` (8 MiB) to
`0x2000000` (32 MiB) to match rs-stellar-xdr.

---

### MEDIUM: LedgerEntry to LedgerKey Extraction

**Source:** rs-stellar-xdr (`ledgerkey.rs`)

**Problem:** Extracting a `LedgerKey` from a `LedgerEntry` is extremely common
when building Soroban footprints, indexing ledger state, or deduplicating entries.

**Implementation:** Hand-written utility in `src/helpers.ts` or similar:
```typescript
function ledgerEntryToKey(entry: LedgerEntryData): LedgerKey
```
Dispatches on entry type, extracts minimal key fields for all 10 entry types:
Account, Trustline, Offer, Data, ClaimableBalance, LiquidityPool,
ContractData, ContractCode, ConfigSetting, Ttl.

**Priority:** MEDIUM. Essential for Soroban footprint construction.

**Status:** DONE. Implemented in `src/helpers.ts` as `ledgerEntryToKey(data: LedgerEntry_data): LedgerKey`.
Dispatches on all 10 entry types: Account, Trustline, Offer, Data, ClaimableBalance,
LiquidityPool, ContractData, ContractCode, ConfigSetting, TTL. Exported via
`./helpers` entry point.

---

### MEDIUM: Transaction Hash & Envelope Helpers

**Source:** rs-stellar-xdr (`tx_hash.rs`, `transaction_conversions.rs`, `tx_auths.rs`)

**Problem:** Three closely related utilities that every SDK needs:
1. `hashTransactionEnvelope(envelope, networkId)` → the hash you sign
2. `transactionToEnvelope(tx)` → wraps Transaction in unsigned V1 envelope
3. `extractSorobanAuths(envelope)` → gets all SorobanAuthorizationEntry values

We already have `hashTransaction()` in `hashing.ts` but these additional helpers
complete the transaction lifecycle at the XDR layer.

**Priority:** MEDIUM. Required for transaction signing and Soroban auth workflows.

**Status:** DONE. Implemented in `src/helpers.ts`:
- `transactionToEnvelope(tx)` → unsigned V1 envelope
- `feeBumpTransactionToEnvelope(tx)` → unsigned fee bump envelope
- `hashTransactionEnvelope(envelope, networkPassphrase)` → hash dispatching on V0/V1/FeeBump
- `extractSorobanAuths(envelope)` → collects all SorobanAuthorizationEntry from INVOKE_HOST_FUNCTION ops

---

### LOW-MEDIUM: nativeToScVal / scValToNative

**Source:** js-stellar-base (`src/scval.js`), rs-stellar-xdr (`scval_conversions.rs`)

**Problem:** Building `ScVal` discriminated unions from JavaScript primitives requires
manually constructing `{ type: 'SCV_U32', u32: 42 }` objects. Both js-stellar-base
and rs-stellar-xdr provide bidirectional conversion.

**Conversion map (JS → ScVal):**

| JS Input | ScVal Output | Notes |
|---|---|---|
| `null` / `undefined` | `scvVoid` | |
| `boolean` | `scvBool` | |
| `number` / `bigint` | smallest fitting integer | u32/i32/u64/i64/u128/i128/u256/i256 |
| `string` | `scvString` (default) | `opts.type` can override to `symbol`, `address` |
| `Uint8Array` | `scvBytes` | |
| `Array<T>` | `scvVec` | recursive |
| `object` | `scvMap` | recursive, **keys sorted lexicographically** |

**Also includes:** `scValToBigInt()` for extracting bigint from any integer ScVal,
`scvSortedMap()` helper that sorts keys before wrapping (Soroban requirement).

**Priority:** LOW-MEDIUM. More of an SDK concern than XDR codec concern. Could live
in a separate `@stellar/scval` or SDK-layer package. Already have ScVal validation.

**Status:** Not started.

---

### LOW-MEDIUM: validateXDR Convenience Function

**Source:** js-xdr (`validateXDR`), dts-xdr

**Problem:** Users migrating from js-xdr expect `validateXDR(input)` → `boolean`.
Currently they must wrap `decode()` in try/catch.

**Implementation:** Generic codec-level function (not per-type generated):
```typescript
export function validate<T>(input: Uint8Array | string, readFn: (r: XdrReader) => T): boolean
```

**Priority:** LOW-MEDIUM. Simple convenience wrapper.

**Status:** DONE. Added `validate(input, readFn, limits?)` to `src/codec.ts`.

---

### LOW-MEDIUM: Export Enum Lookup Maps

**Source:** js-xdr (`Enum.values()`, `Enum.members()`, `Enum.fromValue()`)

**Problem:** Our generated `_TO_INT` and `_FROM_INT` maps are module-private
(prefixed with `_`). Users who need to iterate enum values, look up by integer,
or build reverse mappings cannot access them.

**Fix:** Either export the maps directly (removing `_` prefix) or add utility
functions like `enumValues(type)`.

**Priority:** LOW-MEDIUM. Required for some tooling use cases.

**Status:** DONE. Removed `_` prefix from generated maps. Now exported as
`{SCREAMING_PREFIX}_TO_INT` and `{SCREAMING_PREFIX}_FROM_INT`
(e.g. `OPERATION_TYPE_TO_INT`, `MEMO_TYPE_FROM_INT`).

---

### LOW: ScMap Sorted Builder

**Source:** rs-stellar-xdr (`scmap.rs`), js-stellar-base (`scvSortedMap`)

**Problem:** Soroban requires map keys strictly sorted. Both Rust and JS provide
sorted builder utilities.

**Implementation:** `buildSortedScMap(entries)` using `compareScVal` from `validate.ts`.

**Priority:** LOW. Pairs naturally with existing ScVal validation.

**Status:** Not started.

---

### LOW: Frame Type for Length-Prefixed Messages

**Source:** rs-stellar-xdr (`Frame<T>`)

**Problem:** Stellar Core's bucket files and network messages use RFC 5531 record
marking: 4-byte big-endian length prefix before each XDR value. rs-stellar-xdr
provides `Frame<T>` and `read_xdr_framed_iter()`.

**Implementation:** `encodeFramed()`, `decodeFramed()`, `decodeFramedStream()`.

**Priority:** LOW. Useful for advanced use cases (bucket file processing, network protocols).

**Status:** Not started.

---

### LOW: Codegen --ref Flag

**Source:** stellar/stellar-xdr branch structure

**Problem:** Our codegen hardcodes `curr` branch.

**Fix:** Accept `--ref` argument: `bun scripts/codegen/index.ts --ref next`

**Priority:** LOW. Useful for testing upcoming protocol changes.

**Status:** Not started.

---

### LOW: Leading-Digit Safeguard in Enum JSON

**Source:** xdrgen (`name_short` in `enum_member.rb`)

**Problem:** When stripping enum prefix, if the remaining name starts with a digit,
xdrgen prepends the first character of the prefix. Our `enumMemberJsonName` does not
handle this. No current Stellar enums trigger this.

**Priority:** LOW. No current Stellar XDR triggers this.

**Status:** Not started.

---

### LOW: Enum/Union Introspection Metadata

**Source:** rs-stellar-xdr (generated), xdrgen Go generator

**Problem:** No way to iterate all enum values or get union arm metadata generically.

**Priority:** LOW. Useful for tooling but not typical application code.

**Status:** Not started.

---

### Confirmed: No Issues Found

- **All 13 .x files processed** — matches all branches/tags of stellar-xdr
- **No missing XDR types** — all 480+ definitions generated
- **Binary codec is correct** — padding validation, depth/byte limits, strict bool decode
- **JSON format matches for 11/19 custom types** (remaining 7-8 identified above)
- **Parser handles all Stellar XDR syntax** — recursive types, anonymous structs, fall-through cases
- **Reserved word escaping** — more thorough than xdrgen (45+ words vs xdrgen's 1)
- **Forward references** — handled naturally by function hoisting (no `lazy()` needed)
- **Tree-shaking** — confirmed superior to both js-xdr (class-based) and tomerweller/ts-xdr
- **`decodeStream` generator** — a feature no other implementation provides natively
- **Hex byte encoding in JSON** — confirmed matches rs-stellar-xdr (lowercase hex, not base64)
- **go-stellar-xdr-json literally calls rs-stellar-xdr** — format is identical by construction

### SDK-Layer XDR Types Inventory

From js-stellar-sdk deep research, these are all XDR types the SDK layer exercises.
All are already generated by our library:

**RPC parsing (base64 decode):** TransactionMeta (V3/V4), TransactionEnvelope,
TransactionResult, DiagnosticEvent, ContractEvent, TransactionEvent, ScVal,
SorobanAuthorizationEntry, LedgerKey, LedgerEntryData, LedgerEntry,
LedgerCloseMeta, LedgerHeaderHistoryEntry, SorobanTransactionData

**Contract spec parsing:** ScSpecEntry, ScSpecFunctionV0, ScSpecTypeDef,
ScSpecUdtStructV0, ScSpecUdtUnionV0, ScSpecUdtEnumV0, ScSpecUdtErrorEnumV0

**Transaction building:** Transaction, FeeBumpTransaction, TransactionEnvelope,
Operation/OperationBody, HostFunction, SorobanAuthorizationEntry

**Auth signing:** HashIdPreimageSorobanAuthorization, SorobanCredentials

---

## SDK-Layer Concerns (Future Package)

These are NOT XDR library concerns but will be built on top of ts-stellar-xdr.
Detailed inventory from js-stellar-base and js-stellar-sdk deep research.

### Transaction Construction (js-stellar-base)
| Feature | Details |
|---|---|
| TransactionBuilder | Fluent builder: `addOperation()`, `setTimeout()`, `setTimebounds()`, `setLedgerbounds()`, `setMinAccountSequence()`, `setExtraSigners()`, `setSorobanData()`, `build()`. Fee = baseFee × ops + resourceFee. Increments sequence on build. |
| TransactionBuilder.cloneFrom | Clone a Transaction back into a builder (for Soroban re-simulation) |
| TransactionBuilder.buildFeeBumpTransaction | Creates FeeBumpTransaction with fee validation |
| TransactionBuilder.fromXDR | Deserializes base64 → Transaction or FeeBumpTransaction |
| Operation factories (30+) | `payment`, `createAccount`, `changeTrust`, `manageSellOffer`, `manageBuyOffer`, `setOptions`, `accountMerge`, `manageData`, `bumpSequence`, `createClaimableBalance`, `claimClaimableBalance`, `beginSponsoringFutureReserves`, `endSponsoringFutureReserves`, `revokeAccountSponsorship`, `clawback`, `setTrustLineFlags`, `liquidityPoolDeposit`, `liquidityPoolWithdraw`, `invokeHostFunction`, `extendFootprintTtl`, `restoreFootprint`, `invokeContractFunction`, `createCustomContract`, `createStellarAssetContract`, `uploadContractWasm`, `addSacTransferOperation` |
| Operation.fromXDRObject | Reverse-parse any Operation XDR to structured JS object |

### Signing & Keypair (js-stellar-base)
| Feature | Details |
|---|---|
| Keypair class | `random()`, `fromSecret(S...)`, `fromPublicKey(G...)`, `fromRawEd25519Seed()`, `master(networkPassphrase)` |
| Signing | `sign(data)`, `verify(data, sig)`, `signDecorated(data)` → DecoratedSignature with hint |
| CAP-40 payload signing | `signPayloadDecorated(data)` — hint = last 4 bytes of payload XOR'd with key hint |
| Transaction signing | `tx.sign(...keypairs)`, `tx.addSignature(pubkey, base64sig)`, `tx.signHashX(preimage)` |
| Crypto backend | `@noble/curves/ed25519` (zip215: false for verification) |

### Amount & Price (js-stellar-base)
| Feature | Details |
|---|---|
| Stroops ↔ XLM | Multiply/divide by 10^7 (ONE constant). Max 7 decimal places, int64 range. |
| Price approximation | Continued fraction algorithm (`best_r`) for rational n/d within int32 range |
| Soroban token amounts | `formatTokenAmount(amount, decimals)`, `parseTokenAmount(value, decimals)` |

### Asset & Liquidity Pool (js-stellar-base)
| Feature | Details |
|---|---|
| Asset class | Constructor validates code (1-12 alphanum) + issuer (G-address). `native()`, `fromOperation()`, `toXDRObject()`, `toChangeTrustXDRObject()`, `contractId(networkPassphrase)`, `equals()`, `compare()` |
| LiquidityPoolAsset | `new LiquidityPoolAsset(assetA, assetB, fee)` — enforces A < B ordering |
| getLiquidityPoolId | SHA-256 of XDR pool params |

### Soroban (js-stellar-base)
| Feature | Details |
|---|---|
| authorizeEntry | Signs SorobanAuthorizationEntry with random nonce, constructs HashIdPreimageSorobanAuthorization |
| authorizeInvocation | Builds fresh auth entry from InvokedContractArgs |
| SorobanDataBuilder | Builder for SorobanTransactionData: `setResourceFee()`, `setResources()`, `setFootprint()`, `appendFootprint()` |
| Contract class | `call(method, ...scVals)` → Operation, `getFootprint()` → LedgerKey |
| nativeToScVal / scValToNative | Bidirectional JS ↔ ScVal conversion with type hints |
| buildInvocationTree | Converts SorobanAuthorizedInvocation to readable tree |
| humanizeEvents | Converts DiagnosticEvent/ContractEvent to `{contractId, type, topics, data}` |

### Horizon Client (js-stellar-sdk)
| Feature | Details |
|---|---|
| Server class | Axios-based, CallBuilder factory methods for all endpoints |
| CallBuilder pattern | Fluent `.cursor()`, `.limit()`, `.order()`, `.join()` → `.call()` or `.stream()` (SSE) |
| Transaction submission | `submitTransaction()` with SEP-29 memo check, offer result parsing from TransactionResult XDR |
| Account loading | `loadAccount(id)` → AccountResponse with sequence management |

### Soroban RPC Client (js-stellar-sdk)
| Feature | Details |
|---|---|
| JSON-RPC 2.0 | `simulateTransaction`, `sendTransaction`, `getTransaction`, `getEvents`, `getLedgerEntries`, `getLatestLedger`, `getTransactions`, `getLedgers` |
| Parser layer | Decodes all base64 XDR from RPC responses: TransactionMeta, TransactionEnvelope, TransactionResult, DiagnosticEvent, ScVal, SorobanAuthorizationEntry, LedgerKey, LedgerEntryData, LedgerCloseMeta |
| assembleTransaction | Combines simulation results with original transaction: adds SorobanData, adjusts fee (classic + resource), replaces auth entries |
| pollTransaction | Configurable retry with SleepStrategy (default 1s interval, 30 attempts) |

### Contract Client (js-stellar-sdk)
| Feature | Details |
|---|---|
| contract.Client | Dynamic method generation from ScSpecEntry: `Client.from({contractId, rpcUrl})`, `fromWasmHash()`, `fromWasm()`, `deploy()` |
| Spec class | Parses WASM custom sections (`contractspecv0`), converts spec types ↔ native JS: `funcArgsToScVals()`, `funcResToNative()`, `nativeToScVal()`, `scValToNative()`, `errorCases()`, `jsonSchema()` |
| AssembledTransaction | Full lifecycle: build → simulate → sign → send → poll. Handles read-only detection, multi-party auth signing, state restoration, JSON serialization for passing between parties |
| Binding generator | Generates standalone typed npm packages from contract specs: `client.ts`, `types.ts`, `package.json` |

### Other (js-stellar-base)
| Feature | Details |
|---|---|
| Memo class | Type-safe wrapper: `none()`, `text(str)`, `id(str)`, `hash(buf)`, `return(buf)` with validation |
| Address class | Universal for Soroban: account (G), contract (C), muxed (M), claimableBalance (B), liquidityPool (P). `toScVal()`, `toScAddress()`, `fromScVal()`, `fromScAddress()` |
| Claimant class | Predicate builders: `predicateAnd()`, `predicateOr()`, `predicateNot()`, `predicateBeforeAbsoluteTime()` |
| SignerKey | Converts between StrKey (G/T/H/P) and xdr.SignerKey |
| Network constants | `PUBLIC`, `TESTNET`, `FUTURENET`, `SANDBOX`, `STANDALONE` passphrases |

---

## Architecture Decisions

### Why function-based, not class-based
The existing `js-xdr` uses a class hierarchy (`XDR.Struct`, `XDR.Union`, etc.)
with dynamic class creation via `config()`. This prevents tree-shaking because
bundlers can't statically determine which methods are used. Our function-based
approach with `readFoo`/`writeFoo` pairs allows dead-code elimination at the
function level.

### Why string literal enums, not TypeScript enums
TypeScript `enum` values are numbers at runtime, requiring bidirectional mapping.
String literal unions (`type MemoType = 'MEMO_NONE' | 'MEMO_TEXT' | ...`) are
self-documenting in debuggers and JSON output, and work naturally with
discriminated union narrowing.

### Why `readonly` on generated fields
Decoded XDR values should be treated as immutable data. Making fields `readonly`
prevents accidental mutation and communicates intent. Writers accept the readonly
types transparently.

### Why `bigint` for int64/uint64
JavaScript `number` can only safely represent integers up to 2^53 - 1. Stellar
uses uint64 extensively (balances in stroops, sequence numbers). `bigint` provides
exact representation with no precision loss.

### Why custom codegen instead of xdrgen
The official `xdrgen` requires Ruby and generates code through ERB templates.
Our custom TypeScript pipeline (lexer → parser → AST → generator) runs with
`bun` directly, produces optimized output tailored to our function-based API,
and gives us full control over the generated code.
