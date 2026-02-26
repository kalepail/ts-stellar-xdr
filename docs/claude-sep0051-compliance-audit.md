# SEP-0051 (XDR-JSON) Compliance Audit

**Date:** 2026-02-25
**Spec version:** SEP-0051 v2.0.0 (Updated 2025-05-13)
**Reference implementation:** [rs-stellar-xdr](https://github.com/stellar/rs-stellar-xdr) (Rust)
**Sources reviewed:**

- [SEP-0051](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0051.md)
- [TransactionEnvelope.json schema](https://raw.githubusercontent.com/stellar/rs-stellar-xdr/main/xdr-json/curr/TransactionEnvelope.json)
- rs-stellar-xdr test suite (`tests/serde.rs`, `tests/serde_tx.rs`, `tests/serde_ints.rs`, `tests/str.rs`)
- [XDR_JSON_ALIGNMENT.md](../XDR_JSON_ALIGNMENT.md) (design doc)

---

## Overall Assessment: FULLY COMPLIANT

All SEP-0051 requirements are implemented and tested. No blocking issues found.
Minor recommendations for test coverage improvements are listed at the end.

---

## 1. Primitive XDR Types

### 1.1 Integer (32-bit signed/unsigned) — COMPLIANT

| Requirement                   | Implementation                           | Status |
| ----------------------------- | ---------------------------------------- | ------ |
| Maps to JSON number           | `toJsonExpr` returns pass-through number | PASS   |
| Signed range: -2^31 to 2^31-1 | Native JS number, no conversion          | PASS   |
| Unsigned range: 0 to 2^32-1   | Native JS number, no conversion          | PASS   |

**Verified in:** `src/generated/types.ts` — `toJsonuint32(v)` returns `v` directly.
**rs-stellar-xdr match:** `"fee": 0` (number, not string) in `serde_tx.rs`.

### 1.2 Hyper Integer (64-bit signed) — COMPLIANT

| Requirement                                   | Implementation                     | Status |
| --------------------------------------------- | ---------------------------------- | ------ |
| Maps to JSON **string** (v2.0.0)              | `String(val)` in toJson            | PASS   |
| Base10 encoding                               | BigInt.toString() produces base10  | PASS   |
| Backward compat: accept JSON numbers on deser | `BigInt(json as string \| number)` | PASS   |

**Verified in:** `scripts/codegen/generator.ts` lines 264-267 — `toJsonExpr` for `hyper`/`uhyper`.
**rs-stellar-xdr match:** `"seq_num": "1"`, `"limit": "9223372036854775807"` in `serde_tx.rs`.

### 1.3 Boolean — COMPLIANT

Pass-through JS boolean. No conversion needed.

### 1.4 Opaque Data (Fixed + Variable Length) — COMPLIANT

| Requirement         | Implementation                           | Status |
| ------------------- | ---------------------------------------- | ------ |
| Hex string encoding | `bytesToHex(val)` in toJson              | PASS   |
| Lowercase hex       | `bytesToHex` uses lowercase              | PASS   |
| Decode from hex     | `hexToBytes(json as string)` in fromJson | PASS   |

**Verified in:** `scripts/codegen/generator.ts` lines 270-278 — `opaque`/`varOpaque` use hex.
**rs-stellar-xdr match:** `"hint": "47a62d00"` (lowercase hex) in `serde_tx.rs`.

### 1.5 String — COMPLIANT

| Requirement                           | Implementation                                  | Status |
| ------------------------------------- | ----------------------------------------------- | ------ |
| Byte-level ASCII escaping             | `escapeXdrString()` in `src/json.ts`            | PASS   |
| NUL → `\0`                            | `escapeBytesToAscii` case 0x00                  | PASS   |
| TAB → `\t`                            | case 0x09                                       | PASS   |
| LF → `\n`                             | case 0x0A                                       | PASS   |
| CR → `\r`                             | case 0x0D                                       | PASS   |
| Backslash → `\\`                      | case 0x5C                                       | PASS   |
| Printable ASCII (0x20-0x7E) unchanged | default branch                                  | PASS   |
| Other bytes → `\xNN`                  | hex escape branch                               | PASS   |
| JSON double-escaping                  | Automatic: `JSON.stringify` escapes backslashes | PASS   |

**Verified in:** `src/json.ts` lines 110-128 (`escapeBytesToAscii`), lines 131-156 (`unescapeAsciiToBytes`).
**Test coverage:** 15 dedicated tests in `tests/json.test.ts` "SEP-0051 string escaping" section.

### 1.6 Arrays (Fixed + Variable Length) — COMPLIANT

JSON arrays with elements encoded per their type. No special handling needed.

---

## 2. Complex XDR Types

### 2.1 Enum — COMPLIANT

| Requirement                       | Implementation                           | Status |
| --------------------------------- | ---------------------------------------- | ------ |
| JSON string representation        | Enum → string mapping tables             | PASS   |
| snake_case naming                 | `enumMemberJsonName()` lowercases        | PASS   |
| Shared prefix stripping           | `computeEnumPrefix()` at word boundaries | PASS   |
| Single-member enums: no stripping | `members.length < 2` returns `''`        | PASS   |

**Prefix stripping examples verified in generated code:**

- `SCV_BOOL` → `"bool"` (prefix `SCV_` stripped) — matches SEP-0051 example
- `ASSET_TYPE_NATIVE` → `"native"` (prefix `ASSET_TYPE_` stripped)
- `MEMO_NONE` → `"none"` (prefix `MEMO_` stripped)
- `CREATE_ACCOUNT` → `"create_account"` (no shared prefix, just lowercased)
- `KEY_TYPE_ED25519` → `"ed25519"` (prefix `KEY_TYPE_` stripped)

**rs-stellar-xdr match:** `"cond": "none"`, `"memo": {"text": ...}` in `serde_tx.rs`.

### 2.2 Struct — COMPLIANT

| Requirement                      | Implementation                                      | Status |
| -------------------------------- | --------------------------------------------------- | ------ |
| JSON object with key-value pairs | Generated toJson produces `Record<string, unknown>` | PASS   |
| snake_case field names           | `camelToSnakeCase()` converts XDR names             | PASS   |

**Examples verified:**

- `sourceAccount` → `"source_account"`
- `liveUntilLedgerSeq` → `"live_until_ledger_seq"`
- `seqNum` → `"seq_num"`

### 2.3 Discriminated Union — COMPLIANT

| Requirement                                     | Implementation                               | Status |
| ----------------------------------------------- | -------------------------------------------- | ------ |
| Void arm → bare JSON string                     | `return 'none'` in toJson switch             | PASS   |
| Non-void arm → single-key JSON object           | `return { 'text': ... }` in toJson           | PASS   |
| Enum discriminant → prefix-stripped, snake_case | Uses `enumMemberJsonName()`                  | PASS   |
| Int discriminant → name + integer suffix        | `v${caseVal}` pattern (e.g., `"v0"`, `"v1"`) | PASS   |
| `$schema` property allowed in objects           | `unionKey()` skips `$schema` key             | PASS   |

**Examples verified in generated code:**

- `Memo` void arm `MEMO_NONE` → `"none"` (bare string)
- `Memo` text arm `MEMO_TEXT` → `{"text": "Stellar"}` (single-key object)
- `TransactionExt` v=0 → `"v0"` (int discriminant void arm)
- `TransactionExt` v=1 → `{"v1": {...}}` (int discriminant non-void arm)

**rs-stellar-xdr match:** `"cond": "none"`, `"ext": "v0"`, `"memo": {"text": "Stellar"}` in `serde_tx.rs`.

### 2.4 Optional Data — COMPLIANT

| Requirement           | Implementation                                   | Status |
| --------------------- | ------------------------------------------------ | ------ |
| Not set → JSON `null` | `v.field !== undefined ? toJson(v.field) : null` | PASS   |
| Set → value per type  | Direct delegation to type's toJson               | PASS   |

**Example:** `source_account` in Operation: `null` when absent, G-address string when present.
**rs-stellar-xdr match:** `"source_account": null` (not omitted) in `serde_tx.rs`.

### 2.5 Void — COMPLIANT

Void is omitted in JSON. Only relevant in union context (covered above).

---

## 3. Stellar-Specific Types

### 3.1 Address Types (StrKey Encoding)

All address types listed in SEP-0051 are implemented with correct StrKey version bytes.

| Type                              | Prefix | toJson Implementation                            | fromJson Dispatch            | Status |
| --------------------------------- | ------ | ------------------------------------------------ | ---------------------------- | ------ |
| **AccountID**                     | G      | `toJsonPublicKey()` → `encodeEd25519PublicKey()` | Decodes G-address            | PASS   |
| **ContractID**                    | C      | `encodeContract()`                               | Decodes C-address            | PASS   |
| **MuxedAccount** (Ed25519)        | G      | `encodeEd25519PublicKey()`                       | First char `G` → Ed25519     | PASS   |
| **MuxedAccount** (MuxedEd25519)   | M      | `encodeMuxedAccountStrKey()`                     | First char `M` → Muxed       | PASS   |
| **MuxedAccountMed25519**          | M      | `encodeMuxedAccountStrKey(v.ed25519, v.id)`      | `decodeMuxedAccountStrKey()` | PASS   |
| **MuxedEd25519Account**           | M      | `encodeMuxedAccountStrKey(v.ed25519, v.id)`      | `decodeMuxedAccountStrKey()` | PASS   |
| **PoolID**                        | L      | `encodeLiquidityPool()`                          | `decodeLiquidityPool()`      | PASS   |
| **ClaimableBalanceID**            | B      | `encodeClaimableBalance((v as any).v0)`          | `decodeClaimableBalance()`   | PASS   |
| **PublicKey**                     | G      | `encodeEd25519PublicKey((v as any).ed25519)`     | `decodeEd25519PublicKey()`   | PASS   |
| **NodeID**                        | G      | Via `toJsonPublicKey()` (typedef)                | Via `fromJsonPublicKey()`    | PASS   |
| **SignerKey** (Ed25519)           | G      | `encodeEd25519PublicKey()`                       | First char `G`               | PASS   |
| **SignerKey** (PreAuthTx)         | T      | `encodePreAuthTx()`                              | First char `T`               | PASS   |
| **SignerKey** (HashX)             | X      | `encodeSha256Hash()`                             | First char `X`               | PASS   |
| **SignerKey** (SignedPayload)     | P      | `encodeSignedPayload()`                          | First char `P`               | PASS   |
| **SignerKeyEd25519SignedPayload** | P      | `encodeSignedPayload(v.ed25519, v.payload)`      | `decodeSignedPayload()`      | PASS   |
| **ScAddress** (Account)           | G      | Via `toJsonAccountID()`                          | First char `G`               | PASS   |
| **ScAddress** (Contract)          | C      | Via `toJsonContractID()`                         | First char `C`               | PASS   |
| **ScAddress** (MuxedAccount)      | M      | Via `toJsonMuxedEd25519Account()`                | First char `M`               | PASS   |
| **ScAddress** (ClaimableBalance)  | B      | Via `toJsonClaimableBalanceID()`                 | First char `B`               | PASS   |
| **ScAddress** (LiquidityPool)     | L      | Via `toJsonPoolID()`                             | First char `L`               | PASS   |

**Key architectural note:** These types serialize as **flat StrKey strings**, not as union objects. This is correct per SEP-0051. The entire union/struct is collapsed into a single string value. For example, `MuxedAccount::Ed25519` does NOT become `{"ed25519": "hex..."}` — it becomes `"GABCDE..."`.

**StrKey version bytes verified in `src/strkey.ts`:**

- `ed25519PublicKey`: 48 (G), `ed25519SecretSeed`: 144 (S), `muxedAccount`: 96 (M)
- `preAuthTx`: 152 (T), `sha256Hash`: 184 (X), `signedPayload`: 120 (P)
- `contract`: 16 (C), `claimableBalance`: 8 (B), `liquidityPool`: 88 (L)

**rs-stellar-xdr match:**

- `"source_account": "GA6LGYNLMJFRA4CMNTHU7WY6IB45EPLI5QWNGIWCFA2MIGXB4ZF5GQGY"` in `serde_tx.rs`
- `"issuer": "GBB5BH2JFIVOHKQK5WHM5XFSE2SPOUFJB3FU4CPZVR3EUVJXZLMHOLOM"` in `serde_tx.rs`

### 3.2 Asset Code Types — COMPLIANT

| Type                  | Rule                                                    | Implementation          | Status |
| --------------------- | ------------------------------------------------------- | ----------------------- | ------ |
| **AssetCode4**        | Trim all trailing zero bytes. Result ≤ 4 chars.         | `escapeAssetCode4()`    | PASS   |
| **AssetCode12**       | Trim trailing zeros down to 6th byte. Result ≥ 5 chars. | `escapeAssetCode12()`   | PASS   |
| **AssetCode** (union) | Dispatch by byte count: ≤4 → Code4, ≥5 → Code12         | `assetCodeByteLength()` | PASS   |

**AssetCode12 minimum 5-character rule details:**

- `escapeAssetCode12()` uses `while (end > 5 && bytes[end - 1] === 0) end--`
- A 3-byte AssetCode12 like `"ABC"` (padded with 9 zero bytes) produces `"ABC\0\0"` — 5 unescaped bytes
- This distinguishes it from AssetCode4 `"ABC"` which produces `"ABC"` — 3 bytes

**AssetCode4/12 discrimination:**

- `assetCodeByteLength()` counts actual byte count ignoring escape overhead
- Used in `AssetCode` union `fromJson`: `assetCodeByteLength(s) <= 4` → Code4, else → Code12

**Non-ASCII byte handling:**

- Both use `escapeBytesToAscii()` which hex-escapes non-printable bytes
- Matches rs-stellar-xdr: `b"a\xc3\x28d"` → `"a\xc3(d"` (0xc3 hex-escaped, 0x28 = `(` is printable)

**rs-stellar-xdr match:**

- `AssetCode4("ABCD")` → `"ABCD"` in `serde_tx.rs`
- `AssetCode12` all zeros → `"\0\0\0\0\0"` in `tests/str.rs`
- `AssetCode12` 3 bytes `"abc"` → `"abc\0\0"` in `tests/str.rs`

### 3.3 Integer Types (128-bit / 256-bit) — COMPLIANT

| Type             | toJson                                           | fromJson                   | Dual deser                        | Status |
| ---------------- | ------------------------------------------------ | -------------------------- | --------------------------------- | ------ |
| **Int128Parts**  | `int128PartsToDecimal(hi, lo)` → decimal string  | `decimalToInt128Parts(s)`  | Also accepts `{hi, lo}` object    | PASS   |
| **UInt128Parts** | `uint128PartsToDecimal(hi, lo)` → decimal string | `decimalToUint128Parts(s)` | Also accepts `{hi, lo}` object    | PASS   |
| **Int256Parts**  | `int256PartsToDecimal(...)` → decimal string     | `decimalToInt256Parts(s)`  | Also accepts `{hi_hi,...}` object | PASS   |
| **UInt256Parts** | `uint256PartsToDecimal(...)` → decimal string    | `decimalToUint256Parts(s)` | Also accepts `{hi_hi,...}` object | PASS   |

**Conversion formulas (verified against rs-stellar-xdr `num128.rs`/`num256.rs`):**

- u128: `(BigInt(hi) << 64n) | BigInt(lo)` where hi/lo are unsigned 64-bit
- i128: Two's complement with signed hi, unsigned lo
- u256: `(BigInt(hiHi) << 192n) | (BigInt(hiLo) << 128n) | (BigInt(loHi) << 64n) | BigInt(loLo)`
- i256: Two's complement with signed hiHi

**Boundary values verified:**

- `Int128Parts{hi:1, lo:2}` → `"18446744073709551618"` (matches rs-stellar-xdr `serde.rs`)
- Max UInt128 → `"340282366920938463463374607431768211455"`
- Max Int128 → `"170141183460469231731687303715884105727"`
- Min Int128 → `"-170141183460469231731687303715884105728"`

**Dual deserialization:** Both decimal string and expanded object form are accepted on fromJson, matching rs-stellar-xdr behavior where `serde(deserialize_with = "de_str_or_struct")` is used.

---

## 4. JSON Schema Support — COMPLIANT

| Requirement                           | Implementation               | Status |
| ------------------------------------- | ---------------------------- | ------ |
| `$schema` property allowed on objects | `unionKey()` skips `$schema` | PASS   |
| `$schema` not required                | Not enforced                 | PASS   |

**Implementation:** `unionKey()` in `src/json.ts` iterates object keys and skips any key named `$schema`, returning the first non-schema key as the union discriminant.

**Test coverage:** 4 dedicated tests in `tests/json.test.ts` "$schema property filtering" section.

**Usage:** 109 occurrences of `unionKey(obj)` across all generated files (every union `fromJson` function).

---

## 5. Cross-Cutting Concerns

### 5.1 Float/Double — N/A (HANDLED)

SEP-0051 explicitly notes Stellar XDR does not use floating-point types. The generator handles them as pass-through numbers (for completeness), but no generated code actually calls `readFloat`/`readDouble`.

### 5.2 Naming Conventions

| Convention                                             | Where Used                                     | Status |
| ------------------------------------------------------ | ---------------------------------------------- | ------ |
| Struct field names → snake_case                        | `camelToSnakeCase()` in generator              | PASS   |
| Enum values → prefix-stripped + lowercased             | `computeEnumPrefix()` + `enumMemberJsonName()` | PASS   |
| Union discriminant keys → prefix-stripped + lowercased | Same as enum values                            | PASS   |
| Int union discriminant → `v` + integer suffix          | `v${caseVal}` pattern                          | PASS   |

### 5.3 Type Definitions (Typedefs)

Typedefs correctly delegate to their underlying type's toJson/fromJson. Examples:

- `AccountID` = `PublicKey` → delegates to `toJsonPublicKey`
- `NodeID` = `PublicKey` → delegates to `toJsonPublicKey`
- `ContractID` = `Hash` → has custom toJson (C-address StrKey)
- `PoolID` = `Hash` → has custom toJson (L-address StrKey)
- `SequenceNumber` = `int64` → string representation (inherited)

---

## 6. Test Coverage Analysis

### Current Coverage (updated)

- `tests/json.test.ts`: 171 tests
- Additional SEP-adjacent coverage now lives in:
  - `tests/strkey.test.ts`
  - `tests/scval.test.ts`
  - `tests/codegen.test.ts` (includes leading-digit enum JSON naming and introspection checks)
  - `tests/framed.test.ts`

Coverage includes:

1. Primitive and complex SEP-0051 JSON forms
2. Stellar-specific address rendering for G/C/M/B/L variants
3. SignerKey variants G/T/X/P
4. ClaimableBalanceID and PoolID StrKey JSON handling
5. Int128/256 and UInt128/256 decimal string/object dual deserialization paths
6. `$schema` filtering behavior in unions
7. Enum prefix stripping with leading-digit safeguard (`b8_bit`, `b16_bit`, `b32_bit`) aligned with rs-stellar-xdr schema output

### Remaining Recommended Additions (non-blocking)

1. TransactionEnvelope fixture roundtrip locked to `serde_tx.rs` canonical vectors in a single focused end-to-end test
2. JSON Schema validation pass against `xdr-json/curr/TransactionEnvelope.json` in automated CI

---

## 7. Comparison with rs-stellar-xdr Reference

### Key test vector from `serde_tx.rs`:

```json
{
  "tx": {
    "tx": {
      "source_account": "GA6LGYNLMJFRA4CMNTHU7WY6IB45EPLI5QWNGIWCFA2MIGXB4ZF5GQGY",
      "fee": 0,
      "seq_num": "1",
      "cond": "none",
      "memo": { "text": "Stellar" },
      "operations": [
        {
          "source_account": "GCNZ76V2Z5DGLM2XFF3PXBIJPHF4O245M6OGXSXL2WN37M2D5DUUNSOO",
          "body": {
            "change_trust": {
              "line": {
                "credit_alphanum4": {
                  "asset_code": "ABCD",
                  "issuer": "GBB5BH2JFIVOHKQK5WHM5XFSE2SPOUFJB3FU4CPZVR3EUVJXZLMHOLOM"
                }
              },
              "limit": "9223372036854775807"
            }
          }
        }
      ],
      "ext": "v0"
    },
    "signatures": []
  }
}
```

Our implementation would produce identical JSON for this input because:

- `TransactionEnvelope::Tx` → `{"tx": {...}}` (externally tagged union)
- `MuxedAccount::Ed25519` → `"GA..."` (flat StrKey)
- `fee` (uint32) → `0` (number)
- `seq_num` (int64) → `"1"` (string)
- `Preconditions::None` → `"none"` (void arm bare string)
- `Memo::Text` → `{"text": "Stellar"}` (non-void arm)
- Optional `source_account` → present as G-address string
- `ChangeTrustAsset::CreditAlphanum4` → `{"credit_alphanum4": {...}}`
- `AssetCode4("ABCD")` → `"ABCD"` (trimmed string)
- `AccountID` → `"GBB5..."` (G-address StrKey)
- `limit` (int64) → `"9223372036854775807"` (string)
- `TransactionExt::V0` → `"v0"` (int discriminant void arm)
- Empty signatures → `[]`

---

## 8. Summary

| Category                                                                         | Items Checked | Status            |
| -------------------------------------------------------------------------------- | ------------- | ----------------- |
| **Primitive Types** (int32, uint32, int64, uint64, bool, opaque, string, arrays) | 8             | ALL COMPLIANT     |
| **Complex Types** (enum, struct, union, optional, void)                          | 5             | ALL COMPLIANT     |
| **Stellar Address Types** (19 type/variant combinations)                         | 19            | ALL COMPLIANT     |
| **Asset Code Types** (AssetCode4, AssetCode12, AssetCode union)                  | 3             | ALL COMPLIANT     |
| **Integer Types** (Int128/256Parts, UInt128/256Parts)                            | 4             | ALL COMPLIANT     |
| **JSON Schema** ($schema filtering)                                              | 1             | COMPLIANT         |
| **Cross-cutting** (naming, typedefs, float/double)                               | 3             | ALL COMPLIANT     |
| **Total**                                                                        | **43**        | **ALL COMPLIANT** |

The ts-stellar-xdr library is **fully compliant with SEP-0051 v2.0.0**. All primitive types, complex types, and Stellar-specific types produce JSON output that matches the specification and the rs-stellar-xdr reference implementation. The recommended test additions would increase confidence but are not required for compliance.
