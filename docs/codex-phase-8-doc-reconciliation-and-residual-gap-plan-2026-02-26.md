# Codex Phase 8: Doc Reconciliation and Residual Gap Plan (2026-02-26)

## Objective
Reconcile stale gap/status documentation with the current implementation, close small high-confidence missing pieces, and produce a clean list of true remaining work.

## Audited Documents
- `docs/claude-research-and-improvements.md`
- `docs/codex-modern-stellar-xdr-gap-closure.md`
- `docs/codex-parallel-resource-audit-2026-02-26.md`
- `docs/codex-sep-0051-compliance-plan-2026-02-26.md`
- `XDR_JSON_ALIGNMENT.md`
- local `sep-0051.md`

## Findings
1. The primary stale source was `docs/claude-research-and-improvements.md`, where many medium/low items were still marked "Not started" despite already being implemented in `src/` and covered by tests.
2. Current codebase status for SEP-0051 Stellar-specific types is strong: converters and StrKey forms are implemented across `G/C/M/B/L/T/X/P` paths.
3. Remaining items are mostly convenience/tooling and SDK-layer utilities, not core SEP-0051 blockers.

## Implemented in Phase 8

### 1. Compatibility helper: `validateXDR`
- Added `validateXDR(...)` as a backward-compatible alias to `validate(...)` in `src/codec.ts`.
- Added tests in `tests/codec.test.ts` for valid and malformed payload behavior.

### 2. SCMap sorted builder utility
- Added `buildSortedScMap(entries)` to `src/validate.ts`.
- Behavior:
  - sorts by `compareScVal` key order,
  - rejects duplicate keys.
- Added tests in `tests/validate.test.ts`.

### 3. Expanded SEP stellar-type parity coverage
- Extended `tests/rs-parity.test.ts` with additional checks:
  - `ContractID` as `C...` strkey,
  - `NodeID` as `G...` strkey,
  - `SignatureHint` as fixed 4-byte hex,
  - `Thresholds` as fixed 4-byte hex.

### 4. Reconciled stale status entries
- Updated `docs/claude-research-and-improvements.md` statuses to reflect actual implementation for:
  - typed error codes,
  - int128/int256 dual deserialization,
  - 32 MiB default byte limit,
  - `ledgerEntryToKey`,
  - transaction envelope/hash/auth helpers,
  - `validateXDR` convenience,
  - exported enum lookup maps,
  - sorted SCMap builder,
  - codegen `--ref` support.
- Updated custom-string summary to reflect full 19/19 coverage.

### 5. Alignment baseline update
- Updated `XDR_JSON_ALIGNMENT.md` validation baseline to current suite count.

## Validation
- `bun run test` passed: **12 files, 375 tests**.
- `bun run typecheck` passed.
- `bun run build` passed.

## True Remaining Work (Post-Phase 8)
1. `nativeToScVal` / `scValToNative` (plus integer extraction helpers): valuable, but SDK-layer oriented rather than core XDR-JSON compliance.
2. Framed XDR helpers (`encodeFramed` / `decodeFramed` / `decodeFramedStream`) for RFC5531-style length-prefixed streams.
3. Codegen edge-case parity: leading-digit safeguard for stripped enum JSON names (`enumMemberJsonName`).
4. Optional tooling metadata: generic enum/union introspection structures for downstream tooling.
5. Broader resilience work: additional fuzz/property tests and deeper differential corpus coverage.

## SEP-0051 Compliance Note
No new blocking SEP-0051 compliance gaps were identified in this pass. Remaining work is mostly additive ergonomics, interoperability tooling, and stress-testing depth.
