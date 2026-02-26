# Codex Phase 2: Optional/Null Fidelity (2026-02-26)

## Objective

Align generated JSON model semantics with SEP-0051 optional representation using `null` as the absent value in the TypeScript model and JSON mapping.

## Implemented

### 1. Generator optional semantics

Updated `scripts/codegen/generator.ts` optional handling:

- Type model: `T | null` (replacing `T | undefined`).
- `toJson*`: absent optionals serialize to explicit `null`.
- `fromJson*`: missing/null JSON values deserialize to `null`.
- XDR decode bridge: `readOptional(...) ?? null`.
- XDR encode bridge: `writeOptional(..., value ?? undefined, ...)`.

### 2. Regenerated all XDR modules

Ran deterministic codegen (`bun run codegen`) and regenerated `src/generated/*.ts` with updated optional/null behavior.

### 3. Null-aware validation internals

Updated `src/validate.ts` to handle generated null-optionals safely:

- `SCV_VEC` / `SCV_MAP` None checks now treat both `null` and `undefined` as absent.
- `compareOptional` now supports `T | null | undefined`.

### 4. Tests updated/added

- Updated roundtrip expectations where absent optionals now decode to `null`.
- Added explicit JSON tests for null semantics on `SetOptionsOp`:
  - missing fields deserialize to `null`,
  - null model values serialize as explicit JSON `null`.

## Validation

- `bun run codegen` passed.
- `bun run test` passed: **10 files, 335 tests**.
- `bun run typecheck` passed.
- `bun run build` passed (including export verification).

## Notes

- This phase intentionally changes the TS-level optional model from `undefined` to `null` for generated XDR types.
- Wire-format XDR optional encoding remains correct and unchanged (presence flag + value).
- Existing code that previously assigned `undefined` to generated optional fields may need to switch to `null`.
