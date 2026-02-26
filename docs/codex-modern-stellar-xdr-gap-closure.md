# Codex: Modern Stellar XDR Gap Closure

Date: 2026-02-25 (updated 2026-02-26)
Branch: `codex/xdr-gap-closure`
Worktree: `/Users/kalepail/Desktop/ts-stellar-xdr-codex-wt/ts-stellar-xdr`

## Goal

Convert `ts-stellar-xdr` from a promising prototype into a reliable foundation for a new TypeScript Stellar SDK focused on transaction reading/crafting, reproducibility, and safe long-term protocol evolution.

## Scope of This Pass

1. Confirm each previously identified gap with fresh evidence.
2. Implement high-impact fixes that unblock package consumption and reproducible generation.
3. Create a concrete path for the remaining strategic items (channeling, conformance depth, JSON/schema tooling).

## Confirmed Findings

### 1) Publishability blocker: export paths did not exist after build

Status: Confirmed critical.

- `package.json` exported `dist/*.js` and `*.d.ts`.
- `tsdown` output was `*.mjs` and `*.d.mts`.
- Direct verification showed exported files were missing.

Why this matters:
- Consumers cannot reliably import subpaths declared in `exports`.
- This blocks using the package as a base dependency for any new SDK modules.

### 2) Generation reproducibility was missing

Status: Confirmed critical.

- Codegen fetched `stellar/stellar-xdr` from moving `curr` branch head.
- No pinned release/commit lock was recorded in-repo.
- Generated files did not capture source channel/ref metadata beyond “curr branch”.

Why this matters:
- Regeneration can drift unexpectedly over time.
- SDK behavior can change without intentional protocol-upgrade actions.

### 3) Channel strategy (`curr`/`next`) lacked implementation path

Status: Confirmed important.

- Current codegen/output was single-channel (`curr`) only.
- Upstream references (`rs-stellar-xdr`, `js-stellar-base`) explicitly model channel behavior and update cadence.

Why this matters:
- A modern SDK foundation needs a safe path for protocol pre-adoption and migration testing.

### 4) Conformance depth is still not enough for “SDK foundation” confidence

Status: Confirmed important.

- Existing tests are strong for codec basics + curated tx roundtrips.
- Missing broad differential/fuzz corpus against reference implementations.

Why this matters:
- Wide XDR surface area and recursive types require stronger automated equivalence guarantees.

### 5) UTF-8 memo edge behavior is known but unresolved

Status: Confirmed medium.

- Existing test documents non-UTF8 memo text roundtrip byte mismatch.
- Policy decision is still open (strict rejection vs raw-preserving representation for invalid text bytes).

Why this matters:
- Without explicit policy, downstream transaction tooling can produce surprising non-lossless behavior.

### 6) `SCMap` key ordering for complex `SCVal` keys was under-specified in runtime validation

Status: Confirmed important.

- `compareScVal` returned `0` for several complex key variants (`SCV_VEC`, `SCV_MAP`, `SCV_ADDRESS`, `SCV_CONTRACT_INSTANCE`, etc.).
- This could misclassify valid maps as duplicate-key maps or fail to enforce strict key ordering semantics.
- `rs-stellar-xdr` validates maps with strict ascending key comparison (`w[0].key < w[1].key`) and no duplicates.

Why this matters:
- Soroban map keys are frequently composite values, so key ordering correctness is a consensus-adjacent safety property for SDK behavior.

## Additional Research Confirmation

### tsdown output extension controls

Confirmed `tsdown` supports `outExtensions(...)` and `fixedExtension` for explicit JS/DTS extension control.

Decision:
- Keep ESM output but force generated filenames to `.js` and `.d.ts` so package exports are conventional and stable.

### Stellar XDR pinning surface

Confirmed:
- `stellar/stellar-xdr` has release tags (latest currently `v25.0`, commit `0a621ec...`).
- `js-stellar-base` Makefile pins XDR source to a specific commit for regeneration.

Decision:
- Introduce a local source lock file and codegen metadata output.
- Default codegen to pinned `curr` release (`v25.0`), with explicit override options.

### Channeling precedence

Confirmed:
- `rs-stellar-xdr` exposes channel model (`curr`, `next`) as first-class.
- `js-stellar-base` keeps both generated surfaces (`curr_generated.js`, `next_generated.js`).

Decision:
- Keep `curr` as default stable generated output.
- Add explicit `codegen:next` command to generate isolated `next` artifacts into a separate directory for migration work.

## Full `RESOURCES.md` Coverage (2026-02-26)

1. `stellar/dts-xdr`: useful as historical context for post-hoc typings; modern TS-first library should generate typed runtime and types together, not patch JS output later.
2. `stellar/js-xdr`: strong primitive/container validation model and explicit read/write boundaries; useful baseline for error handling and RFC behavior.
3. `stellar/js-stellar-base`: critical precedent for pinned-XDR regeneration, dual-channel (`curr`/`next`) handling, and practical generator workaround discipline.
4. `stellar/js-stellar-sdk`: confirms layering boundary (`stellar-base`-style low-level XDR beneath high-level network/transaction API surface).
5. `tomerweller/ts-stellar-xdr` (formerly referenced as `ts-xdr`): confirms modern TS direction (plain objects, discriminated unions, depth/byte limits, rs-compat tests) and validates strategic direction.
6. `stellar/rs-stellar-xdr`: primary reference for channel model, validation semantics, JSON schema generation, and strict map ordering behavior.
7. `stellar/xdrgen`: reinforces generator architecture recommendation: use as a library for custom maintained generators, not legacy CLI built-ins.
8. `stellar/stellar-xdr`: authoritative branch/change policy (`curr`/`next`, protocol vs overlay vs contract spec changes) for safe upgrade strategy.
9. `stellar/js-stellar-xdr-json`: confirms value of JSON/schema/type-guess tooling as a first-class ecosystem affordance.
10. `stellar/go-xdr`: highlights implementation concerns around optionals/unions/size constraints and cross-language conformance expectations.
11. `stellar/go-stellar-xdr-json`: confirms demand for cross-language JSON-XDR bridge and suggests parity target for TS ecosystem utilities.

## Implementation Plan for This Branch

1. Fix build/export mismatch and add export validation guardrail.
2. Add reproducible codegen source lock + metadata + CLI options (`--ref`, `--channel`, `--out-dir`).
3. Add `codegen:next` channel generation entry point (separate output directory).
4. Validate with build/test/typecheck + export verification.
5. Document remaining strategic work for next branch iterations.

## Implementation Update (2026-02-26)

1. Implemented strict complex-key ordering in [`src/validate.ts`](./../src/validate.ts) for `SCMap` validation:
- Added deep/recursive `SCVal` comparison for `SCV_VEC`, `SCV_MAP`, `SCV_CONTRACT_INSTANCE`, signed-int-part structs, `SCV_LEDGER_KEY_NONCE`, and structured address/error ordering.
- Removed the prior “complex fallback to equality” behavior.
2. Added regression coverage in [`tests/validate.test.ts`](./../tests/validate.test.ts):
- Sorted distinct complex keys accepted.
- Unsorted complex keys rejected.
- Duplicate complex keys rejected.
3. Added strict UTF-8 decoding policy in [`src/codec.ts`](./../src/codec.ts):
- `readString` now uses fatal UTF-8 decoding and throws `XdrReadError` on invalid byte sequences instead of silently replacing with U+FFFD.
- Updated non-UTF8 memo vector behavior in [`tests/roundtrip-v0.test.ts`](./../tests/roundtrip-v0.test.ts): invalid UTF-8 now fails decode by policy.
4. Added differential conformance harness against `@stellar/stellar-base` in [`tests/conformance-stellar-base.test.ts`](./../tests/conformance-stellar-base.test.ts):
- Cross-validates envelope type mapping, operation counts, memo arm mapping, outer/inner signature counts, and byte-identical re-encoding for representative V0, V1, and fee-bump vectors (including Soroban fee-bump vectors).
- Documents intentional policy difference on invalid UTF-8 payloads.
5. Revalidated branch health:
- `bun run typecheck` passed.
- `bun run test` passed.
- `bun run build` passed (including export verification).

## Implementation Update (2026-02-26, Parallel Resource Pass)

1. Added fixed-width range enforcement for JSON integer-part conversions in [`src/json.ts`](./../src/json.ts):
- `decimalToInt128Parts`, `decimalToUint128Parts`, `decimalToInt256Parts`, and `decimalToUint256Parts` now reject out-of-range values with `RangeError` instead of silently truncating.
2. Added stricter asset-code JSON helpers in [`src/json.ts`](./../src/json.ts):
- Introduced `trimAssetCode4`, `trimAssetCode12`, `padAssetCode4`, `padAssetCode12`, and `assetCodeByteLength`.
- `AssetCode12` keeps at least 5 bytes in string form and validates 5-12 byte JSON inputs.
3. Updated codegen in [`scripts/codegen/generator.ts`](./../scripts/codegen/generator.ts) and regenerated [`src/generated`](./../src/generated):
- All generated union `fromJson*` functions now ignore optional `$schema` and require exactly one non-`$schema` variant key.
- AssetCode union JSON deserialization now selects 4/12 forms by encoded byte length, not JS string length.
4. Extended tests in [`tests/json.test.ts`](./../tests/json.test.ts):
- Added overflow rejection coverage for 128/256-bit conversions.
- Added `$schema`-aware union decode coverage and multi-key union rejection.
- Added asset-code byte-length and bounds coverage.
5. Created detailed audit/action log in [`docs/codex-parallel-resource-audit-2026-02-26.md`](./codex-parallel-resource-audit-2026-02-26.md).
6. Revalidated branch health after regeneration:
- `bun run typecheck` passed.
- `bun run test` passed (281 tests).
- `bun run build` passed (including export verification).

## Remaining Work After This Pass

1. Differential conformance harness vs reference implementations (`rs-stellar-xdr` first, then `js-xdr` where relevant).
2. Fuzz/property tests for recursive types and malformed payload classes.
3. Expand differential coverage depth (more envelope variants, additional ops and auth combinations, and negative cases).
4. JSON/schema/stream tooling layer inspired by `js-stellar-xdr-json` and `go-stellar-xdr-json`.
5. Optional: automated curr/next drift report (locked tag/commit vs upstream movement) to make upgrade planning explicit.

## Sources

- `stellar/stellar-xdr` tags/releases: https://github.com/stellar/stellar-xdr
- `stellar/rs-stellar-xdr`: https://github.com/stellar/rs-stellar-xdr
- `stellar/rs-stellar-xdr` SCVal/SCMap validation semantics: https://raw.githubusercontent.com/stellar/rs-stellar-xdr/main/src/curr/scval_validations.rs
- `stellar/js-stellar-base` regeneration workflow (Makefile): https://github.com/stellar/js-stellar-base/blob/master/Makefile
- `stellar/js-stellar-base` regeneration notes: https://raw.githubusercontent.com/stellar/js-stellar-base/master/README.md
- `stellar/js-xdr` changelog/depth+array hardening: https://github.com/stellar/js-xdr/blob/master/CHANGELOG.md
- `stellar/js-xdr` README: https://raw.githubusercontent.com/stellar/js-xdr/master/README.md
- `stellar/dts-xdr` README: https://raw.githubusercontent.com/stellar/dts-xdr/master/README.md
- `tomerweller/ts-stellar-xdr` README: https://raw.githubusercontent.com/tomerweller/ts-stellar-xdr/main/README.md
- `stellar/xdrgen` README: https://raw.githubusercontent.com/stellar/xdrgen/master/README.md
- `stellar/js-stellar-xdr-json`: https://github.com/stellar/js-stellar-xdr-json
- `stellar/js-stellar-xdr-json` README: https://raw.githubusercontent.com/stellar/js-stellar-xdr-json/main/README.md
- `stellar/go-xdr` README: https://raw.githubusercontent.com/stellar/go-xdr/master/README.md
- `stellar/go-stellar-xdr-json` README: https://raw.githubusercontent.com/stellar/go-stellar-xdr-json/main/README.md
- `stellar/js-stellar-sdk` README: https://raw.githubusercontent.com/stellar/js-stellar-sdk/master/README.md
- `@stellar/stellar-base` package (reference impl in tests): https://www.npmjs.com/package/@stellar/stellar-base
- `tsdown` config options (`outExtensions`, `fixedExtension`): https://tsdown.dev
