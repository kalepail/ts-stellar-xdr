# Codex Phase 0 Root Sync Review (2026-02-26)

## Scope
- Root project: `/Users/kalepail/Desktop/ts-stellar-xdr`
- Codex worktree: `/Users/kalepail/Desktop/ts-stellar-xdr-codex-wt/ts-stellar-xdr`
- Objective: perform a careful Phase 0 sync, importing high-confidence SEP-0051 and runtime correctness improvements from root while preserving proven worktree upgrades.

## Method
1. Built a full divergence inventory (excluding `node_modules`, `dist`, `.claude`).
2. Classified each divergence by intent:
   - SEP-0051/stellar JSON compliance
   - Runtime correctness/safety
   - Tooling reproducibility/build hygiene
   - Non-SEP domain logic and docs
3. Applied only net-forward changes with conflict-specific merge decisions.

## Decisions

### Adopted from root
- `src/codec.ts`
  - Restored typed XDR error codes, default byte-limit parity (`32 MiB`), and safer generated decoding expectations.
- `src/json.ts`
  - Restored SEP-0051 string/asset escaping semantics (`\0`, `\t`, `\n`, `\r`, `\\`, `\xNN`) and `unionKey` support.
- `scripts/codegen/generator.ts`
  - Restored stellar-specific JSON mappings used by generated code:
    - StrKey string forms for `SignerKey`, `SCAddress`, `PoolID`, `ClaimableBalanceID`, muxed/signed payload shapes, etc.
    - escaped string behavior for XDR strings and AssetCode variants.
- `src/generated/*.ts`
  - Replaced generated surfaces with root-aligned SEP behavior.
- `tests/json.test.ts`, `tests/codec.test.ts`
  - Synced with root behavior assertions.
- `src/helpers.ts`, `tests/helpers.test.ts`
  - Brought in root helper utilities and coverage.

### Kept from worktree (intentional)
- `scripts/codegen/index.ts`
  - Pinned-channel/source-lock workflow and deterministic metadata generation.
- `scripts/codegen/source-lock.json`
- `scripts/verify-exports.mjs`
- `package.json`, `tsdown.config.ts`
  - Broader explicit export map + export validation workflow.
- `src/validate.ts`, `tests/validate.test.ts`
  - More complete SCVal/SCMap comparison logic than root.
- `tests/conformance-stellar-base.test.ts`
  - Differential checks against `@stellar/stellar-base` retained.
- Existing codex docs under `docs/codex-*`.

## Conflict Resolutions
- `scripts/codegen/generator.ts`
  - Merged root runtime semantics with worktree deterministic header support.
  - Kept `sourceDescriptor` parameter support so `scripts/codegen/index.ts` remains compatible.
- `src/json.ts`
  - Kept root SEP escaping implementation.
  - Re-added worktree bigint range assertions for `Int128/UInt128/Int256/UInt256` parsing.
- `tests/roundtrip-v0.test.ts` and `tests/conformance-stellar-base.test.ts`
  - Relaxed UTF-8 error-message regex from `/Invalid UTF-8 string/` to `/Invalid UTF-8/` to avoid brittle message coupling while preserving strict-failure guarantees.
- `src/index.ts`
  - Added `export * from './helpers.js'` so helper functionality is available via main package entry.

## Verification
- `bun run test`
  - Passed: **10 files, 324 tests**.
- `bun run typecheck`
  - Passed (`tsc --noEmit`).
- `bun run build`
  - Passed (`tsdown` + `scripts/verify-exports.mjs`).

## Net Result
Phase 0 now preserves worktree determinism/tooling and stronger SCVal validation while restoring root’s SEP-critical JSON/XDR behavior and generated stellar-specific mappings needed for SEP-0051 alignment.
