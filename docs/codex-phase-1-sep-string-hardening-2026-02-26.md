# Codex Phase 1: SEP-0051 String Hardening (2026-02-26)

## Objective

Implement strict, byte-accurate SEP-0051 string escaping/unescaping semantics and close the highest-risk parser gaps.

## Implemented

### 1. Strict escape parser in `src/json.ts`

Updated `unescapeAsciiToBytes` to:

- parse escapes over UTF-8 bytes (`TextEncoder`) to preserve byte-accuracy for literal non-ASCII input,
- accept only valid escapes: `\0`, `\t`, `\n`, `\r`, `\\`, `\xNN`,
- reject malformed inputs instead of silently coercing:
  - trailing backslash,
  - unknown escapes (`\q`),
  - malformed hex escapes (`\x1`, `\xGG`).

### 2. Correct asset-code byte-length accounting

Updated `assetCodeByteLength` to use actual decoded-byte length via the strict unescape parser, rather than heuristic counting.

### 3. Prevent silent truncation for fixed-width asset codes

Updated `unescapeAssetCode(s, len)` to throw `RangeError` if decoded bytes exceed the target fixed width (`4` or `12`), instead of silently truncating.

## Test Coverage Added

In `tests/json.test.ts`:

- invalid escape rejection for asset-code parsing,
- overlength asset-code rejection (`AssetCode4`, `AssetCode12`, and union path),
- strict unescape error cases for XDR strings,
- literal non-ASCII UTF-8 handling check.

## Validation

- `bun run test` passed: **10 files, 333 tests**.
- `bun run typecheck` passed.
- `bun run build` passed (including export verification).

## Notes on Behavior

- Parser is now intentionally strict for escape syntax and fixed-width overflow.
- Serializer behavior remains SEP-oriented and byte-preserving (`\0`, `\xNN`, etc.).
- This phase intentionally did **not** change optional/null representation (Phase 2 scope).

## Next Recommended Step

Proceed to Phase 2 (optional/null fidelity) or Phase 4 (schema-backed conformance harness), depending on whether API-shape correctness or spec-validation automation should be prioritized first.
