# Codex Parallel Resource Audit and Fixes (2026-02-26)

Date: 2026-02-26
Branch: `codex/xdr-gap-closure`
Worktree: `/Users/kalepail/Desktop/ts-stellar-xdr-codex-wt/ts-stellar-xdr`

## Objective

Run a fresh, parallel audit across every entry in `RESOURCES.md`, confirm what is still missing for a modern TypeScript Stellar XDR foundation, and implement the highest-confidence fixes immediately.

## Parallel Research Streams Used

1. GitHub MCP release/tag/commit sweeps (freshness and maintenance status).
2. GitHub MCP README/source extraction (feature and behavior confirmation).
3. SEP-0051 and schema extraction (XDR-JSON compatibility expectations).
4. Local gap scan of `src/`, `tests/`, and codegen behavior.

## Freshness Snapshot (all `RESOURCES.md` entries)

1. `stellar/dts-xdr`

- Latest commit: 2026-02-25 (`Int union constructors`).
- No releases/tags.
- Still relevant for js-xdr declaration generation, but not the long-term TS-first direction.

2. `stellar/js-xdr`

- Latest release: `v3.1.2` (2024-07-18).
- Latest commit: 2026-02-24 (`fast fail array decoding`), unreleased improvements in changelog.
- Still active and a strong behavioral baseline for codec safety checks.

3. `stellar/js-stellar-base`

- Latest release: `v14.0.4` (2025-12-22).
- Latest commit: 2026-02-20.
- Confirms continued dual-channel/pinned-XDR operational concerns and generator workaround burden.

4. `stellar/js-stellar-sdk`

- Latest release: `v14.5.0` (2026-01-26).
- Confirms layering (`stellar-base` beneath high-level SDK surface).

5. `tomerweller/ts-xdr`

- Repository path in `RESOURCES.md` is stale; current repository is `tomerweller/ts-stellar-xdr`.
- Latest commit: 2026-02-26 includes 128/256-bit JSON integer range validation.

6. `stellar/rs-stellar-xdr`

- Latest release: `v25.0.0` (2025-12-03).
- Latest commit: 2026-02-19.
- Confirms channel model, SCVal validation semantics, and JSON schema tooling (`schemars`/draft-2019-09 behaviors).

7. `stellar/xdrgen`

- No releases/tags.
- Latest commit: 2026-02-06.
- Reiterates recommendation: use as library for custom maintained generators.

8. `stellar/stellar-xdr`

- Latest release: `v25.0` (2025-11-26), commit `0a621ec...`.
- Confirms `curr`/`next` branch policy and modification guidance.

9. `stellar/js-stellar-xdr-json`

- Latest release: `v23.0.0` (2025-09-03).
- Exposes `decode`, `encode`, `guess`, `types`, `schema` APIs via WASM.

10. `stellar/go-xdr`

- No releases/tags.
- Latest commit: 2023-11-22 (slower cadence; still useful as a codec-reference implementation).

11. `stellar/go-stellar-xdr-json`

- Latest release: `23.0.0` (2025-09-04).
- Latest commit: 2026-02-26 (`Fix memory leak when decoding to JSON`).
- Confirms active maintenance and parity relevance for XDR-JSON bridge behavior.

12. `stellar-protocol` SEP-0051

- Status: Draft (updated 2025-05-13, version 2.0.0).
- Specifies optional `$schema` property support in JSON objects.

13. `rs-stellar-xdr` TransactionEnvelope JSON schema

- Draft 2019-09 schema includes optional `$schema` and strict union/object structure (`unevaluatedProperties: false`).

## Missing Problems Confirmed as Worth Solving

1. Union JSON decoding was not robust to optional `$schema`.

- Generated `fromJson*` union decoders selected `Object.keys(obj)[0]` directly.
- If `$schema` appeared first (a SEP-0051-supported pattern), decoding could fail.

2. Int128/UInt128/Int256/UInt256 decimal parsing could silently overflow.

- Runtime helpers accepted arbitrarily large decimals and truncated via masking/shifting.
- This can create silent data corruption vs. fixed-width integer semantics.

3. Asset code JSON handling needed stricter semantics.

- Union selection used JS string length (not encoded byte length).
- `AssetCode12` parser accepted too-short values.
- SEP guidance expects byte-oriented semantics and AssetCode12 distinction behavior.

## Implemented in This Pass

1. Strict fixed-width range checks for large integer JSON helpers.

- File: `src/json.ts`
- Added bounded checks for:
  - `decimalToInt128Parts`
  - `decimalToUint128Parts`
  - `decimalToInt256Parts`
  - `decimalToUint256Parts`
- Out-of-range values now throw `RangeError`.

2. Asset code helper improvements in runtime JSON layer.

- File: `src/json.ts`
- Added:
  - `assetCodeByteLength`
  - `trimAssetCode4`
  - `trimAssetCode12` (keeps at least 5 bytes)
  - `padAssetCode4` (1-4 byte enforcement)
  - `padAssetCode12` (5-12 byte enforcement)

3. Codegen changes for global union JSON robustness.

- File: `scripts/codegen/generator.ts`
- Generated `fromJson*` union decoders now:
  - reject non-object/array inputs for object-arm cases,
  - ignore optional `$schema` keys,
  - require exactly one non-`$schema` union variant key.

4. Codegen changes for AssetCode behavior.

- File: `scripts/codegen/generator.ts`
- Generated AssetCode JSON functions now use byte-length aware selection and strict AssetCode4/12 helper functions.

5. Regenerated XDR modules with pinned source lock.

- Files: `src/generated/*.ts`, `src/generated/index.ts`, `src/generated/.codegen-meta.json`

6. Expanded tests for the new guarantees.

- File: `tests/json.test.ts`
- Added coverage for:
  - integer overflow rejection,
  - `$schema` acceptance in union JSON decode,
  - rejection of ambiguous union JSON objects with multiple non-schema keys,
  - AssetCode4/12 bounds and byte-length semantics.

## Validation

- `bun run typecheck` passed.
- `bun run test` passed (`281` tests).
- `bun run build` passed (including export verification).

## Remaining High-Value Work

1. Complete SEP-0051 string-escaping parity for non-printable byte cases (currently not fully modeled end-to-end).
2. Add generic JSON/schema tooling surface (`types`, `schema`, `guess`, `decodeStream`) inspired by `js-stellar-xdr-json`.
3. Expand differential conformance against broader rs-stellar-xdr/XDR-JSON corpora (positive + negative cases).
4. Add fuzz/property tests for recursive/hostile payload classes.

## Sources

- `RESOURCES.md` URLs plus direct GitHub MCP reads of README/changelog/Makefile/source files and release/tag/commit metadata on 2026-02-26.
- SEP-0051: https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0051.md
- TransactionEnvelope schema: https://raw.githubusercontent.com/stellar/rs-stellar-xdr/main/xdr-json/curr/TransactionEnvelope.json
