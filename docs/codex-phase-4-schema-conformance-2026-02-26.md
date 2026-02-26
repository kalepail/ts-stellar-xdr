# Codex Phase 4: Schema-Backed Conformance Harness (2026-02-26)

## Objective

Continuously verify SEP-0051 JSON compatibility against canonical `rs-stellar-xdr` JSON Schema definitions.

## Implemented

### 1. Added JSON Schema validator dependency

- Added dev dependency: `ajv@8` (draft-2019 schema validation support).

### 2. Added canonical schema fixtures

- Added local fixtures copied from `rs-stellar-xdr`:
  - `tests/fixtures/xdr-json/curr/TransactionEnvelope.json`
  - `tests/fixtures/xdr-json/curr/Asset.json`
  - `tests/fixtures/xdr-json/curr/Memo.json`
  - `tests/fixtures/xdr-json/curr/SignerKey.json`
  - `tests/fixtures/xdr-json/curr/ScAddress.json`
  - `tests/fixtures/xdr-json/curr/ClaimableBalanceId.json`
  - `tests/fixtures/xdr-json/curr/PoolId.json`
  - `tests/fixtures/xdr-json/curr/ConfigSettingEntry.json`

This keeps tests deterministic and independent of network availability at test runtime.

### 3. Added schema conformance test suite

- Added/expanded `tests/schema-conformance.test.ts` with checks for:
  1. `TransactionEnvelope` (`toJson` validates, `fromJson` accepts valid payloads, malformed payload rejected).
  2. `Asset` schema + converter roundtrip.
  3. `Memo` schema + converter roundtrip.
  4. `SignerKey` schema + converter roundtrip (`G/T/X/P`).
  5. `ScAddress` schema + converter roundtrip (`G/C/M/B/L`).
  6. `ClaimableBalanceId` / `PoolId` schemas + converter roundtrip.
  7. `ConfigSettingEntry` complex union arm validation (`live_soroban_state_size_window`).

### 4. Added fixture sync automation

- Added `scripts/sync-xdr-json-schemas.mjs`.
- Added npm script: `sync:schemas`.
- Script default set matches current fixture set and supports custom filename arguments.

## Validation

- `bun run test` passed: **12 files, 367 tests**.
- `bun run typecheck` passed.
- `bun run build` passed.

## Notes

- Validator is configured for draft-2019 semantics used by Stellar schemas (including `unevaluatedProperties` behavior).
- Format validation is disabled (`validateFormats: false`) because Stellar schemas use protocol-specific format labels (for example `uint32`) rather than standard JSON Schema format registry terms.
- Some canonical schemas are intentionally broad for stellar string IDs (for example `type: "string"` without StrKey prefix constraints). Prefix strictness is therefore validated in converter tests, not via schema alone.

## Remaining Planned Work

- Continue broadening schema coverage to additional high-value types if needed.
- Keep fixture set in sync with upstream when schema revisions land.
