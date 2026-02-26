# Codex SEP-0051 Compliance Plan (2026-02-26)

## Scope Reviewed
- `https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0051.md`
- `https://raw.githubusercontent.com/stellar/rs-stellar-xdr/main/xdr-json/curr/TransactionEnvelope.json`
- `XDR_JSON_ALIGNMENT.md`
- local `sep-0051.md`
- `stellar/rs-stellar-xdr/tests` (especially `serde.rs`, `serde_ints.rs`, `serde_tx.rs`, `serde_tx_schema.rs`, `str.rs`)

## Baseline Reality (Important)
This worktree is behind the root project on SEP-0051 JSON progress.

- In **this worktree**, several Stellar-specific types still serialize as object/hex forms.
- In **root project**, those specific gaps are already addressed (e.g. `SignerKey`, `SCAddress`, `PoolID`, `ClaimableBalanceID`, muxed subtypes).

Action item zero is to sync those upstream root fixes into this worktree before doing new work, otherwise we re-solve already-solved problems and create merge churn.

## Compliance Matrix (SEP-0051)

| SEP area | Requirement | Status in this worktree | Gap severity |
|---|---|---|---|
| 32-bit ints | JSON number | Implemented | Low |
| 64-bit ints | JSON string; parse numbers when possible | Implemented | Low |
| bool | JSON boolean | Implemented (parse is permissive cast) | Medium |
| fixed/var opaque | JSON hex string | Implemented (length/type validation too permissive at parse) | Medium |
| arrays | JSON arrays | Implemented | Low |
| enums | snake_case string, prefix stripping | Implemented | Low |
| structs | snake_case object fields | Implemented | Low |
| unions | externally tagged + `vN` integer-tag names + `$schema` tolerated | Implemented | Low |
| optional | absent value represented as `null` | Wire JSON uses null, TS model still `undefined` | High |
| String type | ASCII + SEP escaping (`\0`, `\t`, `\n`, `\r`, `\\`, `\xNN`) | **Not implemented** (UTF-8 decode/encode behavior instead) | **Critical** |
| Stellar-specific: `PublicKey`/`AccountID`/`ContractID`/`MuxedAccount` | StrKey string | Implemented | Low |
| Stellar-specific: `SignerKey` | StrKey string (G/T/X/P) | **Not implemented in this worktree** | **Critical** |
| Stellar-specific: `SignerKeyEd25519SignedPayload` | P-strkey string | **Not implemented in this worktree** | **Critical** |
| Stellar-specific: `SCAddress` | StrKey string (G/C/M/B/L) | **Not implemented in this worktree** | **Critical** |
| Stellar-specific: `ClaimableBalanceID` | B-strkey string | **Not implemented in this worktree** | **Critical** |
| Stellar-specific: `PoolID` | L-strkey string | **Not implemented in this worktree** | **Critical** |
| Stellar-specific: `MuxedAccountMed25519`/`MuxedEd25519Account` | M-strkey string | **Not implemented in this worktree** | **Critical** |
| `Int128/UInt128/Int256/UInt256` | decimal string | Implemented with range checks | Low |
| JSON Schema interoperability | `$schema` optional property allowed | Implemented for unions; no schema-validation harness yet | Medium |

## rs-stellar-xdr Test Alignment Gaps

### Already aligned
- `serde_ints.rs`: 64-bit fields/union arms/typedefs render as strings.
- `serde_tx.rs`: external tagging and major transaction shape are aligned.

### Not aligned or at risk
1. `tests/str.rs` custom string conversions
- This file is the strongest oracle for Stellar-specific custom string behavior.
- Current worktree mismatches multiple custom string types (listed above).
- AssetCode escape semantics (`\0`, `\xNN`) are not fully aligned.

2. `tests/serde.rs` dual deserialization for `Int128Parts`
- Rust accepts both decimal-string and object form (`{"hi":...,"lo":...}`) for backward compatibility.
- Current worktree fails object form.

3. `tests/serde_tx_schema.rs`
- We currently do not validate our JSON output against official schema files in CI.

## Detailed Plan

## Phase 0: Sync Worktree to Root’s Existing SEP Fixes
Goal: stop drifting and start from the latest known-good baseline.

- Bring over root updates for:
  - `scripts/codegen/generator.ts`
  - `src/strkey.ts`
  - regenerated `src/generated/*.ts`
  - relevant tests (`tests/json.test.ts` and any strkey/custom-json tests)
- Regenerate once after sync to ensure deterministic generated output.
- Confirm these outputs in this worktree:
  - `toJsonSignerKey(...)` returns a string
  - `toJsonSCAddress(...)` returns a string
  - `toJsonPoolID(...)` returns a string
  - `toJsonClaimableBalanceID(...)` returns a string

## Phase 1: Implement True SEP String Escaping
Goal: full compliance with SEP String semantics, including non-printable and non-ASCII byte behavior.

- Add explicit escape/unescape runtime helpers for SEP string representation.
- Replace current UTF-8-only behavior for XDR string JSON rendering/parsing with byte-preserving SEP escaping logic.
- Ensure `AssetCode4/12` uses the same escaping model (including `\0` and `\xNN` cases).
- Add exhaustive tests from SEP examples and `rs-stellar-xdr/tests/str.rs` edge cases.

## Phase 2: Optional Type Fidelity (`null` over `undefined`)
Goal: align TS model with SEP JSON semantics.

- Generator changes:
  - optional TS field types: `T | null`
  - fromJson optional mapping: missing/null -> `null`
  - toJson optional mapping: always explicit `null` when absent
- Keep binary codec behavior safe, but normalize at generated type boundary.
- Update validators/tests accordingly.

## Phase 3: Strict JSON Parse Validation
Goal: reject invalid JSON at `fromJson*` time, not later during encode.

- Add parse-time validators for primitives:
  - `int32`, `uint32`, `bool`, string, array/object shapes
- Enforce fixed-opaque byte lengths at parse time where schema implies exact size.
- Tighten union/struct parse paths for invalid types and malformed values.

## Phase 4: Schema-Backed Conformance Harness
Goal: verify compliance continuously against canonical schema.

- Add a test harness that loads official JSON schemas from `rs-stellar-xdr/xdr-json/curr`.
- Validate `toJsonTransactionEnvelope` and representative type outputs with a JSON Schema validator.
- Add negative tests for disallowed shapes and wrong types.

## Phase 5: rs Test Porting Matrix
Goal: explicitly track compatibility with the Rust oracle.

Port or mirror assertions from:
- `tests/serde.rs`
  - especially dual `Int128Parts` parse compatibility
- `tests/serde_ints.rs`
  - 64-bit string rendering in typedef/struct/union/array contexts
- `tests/serde_tx.rs`
  - canonical pretty JSON snapshot for a known transaction envelope
- `tests/str.rs`
  - all Stellar-specific StrKey/custom-string types
  - AssetCode escape and byte-length edge cases

## Phase 6: Docs and Locking
Goal: keep forward progress and avoid regressions.

- Update `XDR_JSON_ALIGNMENT.md` to reflect final state (not proposals).
- Add explicit note on backward compatibility behavior (e.g. optional dual parses, if retained).
- Keep `scripts/codegen/source-lock.json` and generated metadata pinned and reviewed.

## Parallel Execution Lanes (Sub-agent friendly)

1. Lane A (Generator + custom types)
- Phase 0 sync + custom string type generation checks.

2. Lane B (String escaping engine)
- Phase 1 escape/unescape implementation + asset-code edge handling.

3. Lane C (Conformance tests)
- Phase 4 schema harness + Phase 5 rs test mirrors.

4. Lane D (Optional/null model + validation)
- Phase 2 + Phase 3 with minimal API break strategy.

## Exit Criteria (Definition of Fully SEP-0051 Compliant)
- All Stellar-specific types in SEP serialize/deserialize exactly per spec and schema.
- String escaping behavior matches SEP examples (`\0`, `\xNN`, etc.).
- Optional values are represented as `null` in JSON consistently.
- Canonical JSON snapshots from `serde_tx.rs` and targeted `str.rs`/`serde.rs` cases pass.
- Schema validation tests pass for `TransactionEnvelope` and selected critical types.
- No regression in binary XDR roundtrip tests.

