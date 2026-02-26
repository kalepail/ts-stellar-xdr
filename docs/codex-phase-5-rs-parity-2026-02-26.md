# Codex Phase 5: rs-stellar-xdr Test Parity Matrix (2026-02-26)

## Objective
Mirror high-value assertions from `rs-stellar-xdr/tests` directly in this TypeScript suite so SEP-0051 behavior can be tracked against the Rust oracle.

## Implemented

### 1. Added dedicated parity suite
- Added `tests/rs-parity.test.ts` with targeted parity checks from:
  - `tests/serde_ints.rs`
  - `tests/serde_tx.rs`
  - `tests/str.rs` (stellar-specific string types)

### 2. Ported `serde_ints.rs` behaviors
- 64-bit typedef serialization/parsing as strings:
  - `SequenceNumber` (`"123"`).
- 64-bit union arm serialization/parsing:
  - `SCVal` variants `i64` and `u64`.
- 64-bit struct field serialization/parsing:
  - `SCNonceKey.nonce`.
- 64-bit vector contents serialized as string array:
  - `ConfigSettingEntry.live_soroban_state_size_window`.

### 3. Ported `serde_tx.rs` canonical snapshot behavior
- Added a canonical `TransactionEnvelope` JSON object (from Rust test) and verified:
  - `fromJsonTransactionEnvelope(...)` accepts it.
  - `toJsonTransactionEnvelope(...)` reproduces the same structure.

### 4. Ported stellar-specific string type vectors from `str.rs`
- Added exact string roundtrip checks for:
  - `SignerKey` (`G`, `T`, `X`, `P` forms)
  - `SCAddress` (`G`, `C`, `M`, `B`, `L` forms)
  - `ClaimableBalanceID` (`B` form)
  - `PoolID` (`L` form)
  - `MuxedEd25519Account` (`M` form)
- Added negative parse check:
  - Reject non-`B` strkeys for `ClaimableBalanceID`.

## Validation
- `bun run test` passed: **12 files, 355 tests**.
- `bun run typecheck` passed.
- `bun run build` passed.

## Notes
- This phase focuses on representative parity coverage, not full 1:1 porting of all Rust tests.
- Existing suites already covered significant portions of string escaping and custom type behavior; this phase anchors those checks to canonical Rust vectors.

## Remaining Planned Work
- **Phase 6:** Final alignment lock and documentation update:
  - update `XDR_JSON_ALIGNMENT.md` to reflect implemented reality,
  - capture residual known gaps (if any),
  - finalize regression guardrails and forward-maintenance guidance.
