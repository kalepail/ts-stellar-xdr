# Codex Phase 3: Strict Parse-Time JSON Validation (2026-02-26)

## Objective
Reject malformed SEP-0051 JSON inputs at `fromJson*` boundaries, instead of allowing permissive values that fail later during XDR encoding.

## Implemented

### 1. Generator-level strict parsing wiring
Updated `scripts/codegen/generator.ts` so generated `fromJson*` functions call strict parse helpers instead of raw casts.

- Primitive scalars now parse through dedicated validators:
  - `parseJsonInt32`, `parseJsonUint32`, `parseJsonFloat`, `parseJsonDouble`
  - `parseJsonBool`, `parseJsonInt64`, `parseJsonUint64`
- Opaque values now parse through strict hex decoders:
  - `parseJsonFixedHexBytes`, `parseJsonVarHexBytes`
- Strings now parse through `parseJsonXdrString`.
- Arrays now parse through `parseJsonFixedArray` / `parseJsonVarArray`.
- Struct object parsing now goes through `parseJsonObject`.
- Int128/UInt128/Int256/UInt256 object-form compatibility parsing now validates object and part types (`parseJsonObject`, `parseJsonInt64`, `parseJsonUint64`) and validates decimal path via `parseJsonString`.

### 2. Runtime parse helper layer
Extended `src/json.ts` with strict JSON validators used by generated code:

- Shape/type guards:
  - `parseJsonObject`, `parseJsonArray`, `parseJsonFixedArray`, `parseJsonVarArray`
  - `parseJsonString`, `parseJsonBool`
- Number/integer validators:
  - `parseJsonInt32`, `parseJsonUint32`, `parseJsonFloat`, `parseJsonDouble`
  - `parseJsonInt64`, `parseJsonUint64`
- Opaque/hex validators:
  - `parseJsonHexBytes`, `parseJsonFixedHexBytes`, `parseJsonVarHexBytes`
- String validator:
  - `parseJsonXdrString`

Also tightened union key extraction:
- `unionKey` now enforces exactly one discriminant key (excluding optional `$schema`).

### 3. Regenerated all generated modules
Ran `bun run codegen` to propagate generator changes into `src/generated/*.ts`.

### 4. New Phase-3 tests
Expanded `tests/json.test.ts` with explicit strict-parse assertions, including:

- Non-object struct JSON rejected.
- Malformed hex and wrong-length opaque values rejected.
- int32/uint32 and int64/uint64 range/type violations rejected.
- Union objects with multiple discriminant keys rejected.
- Oversize variable-length arrays rejected at parse time.

## Validation
- `bun run codegen` passed.
- `bun run test` passed: **10 files, 342 tests**.
- `bun run typecheck` passed.
- `bun run build` passed (including export verification).

## Notes
- This phase is intentionally stricter and may reject inputs that were previously accepted due to permissive casting.
- Compatibility behavior retained where intended:
  - 64-bit values still accept JSON numbers when they are safe integers.
  - Int128/UInt128/Int256/UInt256 still accept both decimal-string and legacy object-part forms.

## Remaining Planned Work
- **Phase 4:** Schema-backed conformance harness (`rs-stellar-xdr/xdr-json/curr` JSON Schemas).
- **Phase 5:** Explicit `rs-stellar-xdr/tests` parity matrix and mirrored assertions.
- **Phase 6:** Final alignment docs lock-in and long-term regression guards.
