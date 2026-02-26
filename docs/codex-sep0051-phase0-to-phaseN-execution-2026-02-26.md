# Codex SEP-0051 Execution Report (2026-02-26)

## Scope

This report captures the branch-isolated implementation pass requested for:

1. Closing remaining gaps in `docs/claude-research-and-improvements.md`
2. Confirming SEP-0051/XDR-JSON alignment against Stellar primary sources
3. Moving net-forward with tests and generator-level upgrades

Work was performed in:

- Branch: `codex/sep0051-full`
- Worktree: `/tmp/ts-stellar-xdr-codex-sep0051`

## Primary Source Inputs Used

- `sep-0051.md` (local copy)
- `XDR_JSON_ALIGNMENT.md`
- `docs/claude-sep0051-compliance-audit.md`
- `stellar/js-stellar-base` (`src/scval.js`, `test/unit/scval_test.js`)
- `stellar/xdrgen` (`lib/xdrgen/ast/definitions/enum_member.rb`)
- `stellar/rs-stellar-xdr`:
  - `tests/*` index and serde/str-focused vectors
  - `xdr-json/curr/BinaryFuseFilterType.json` (confirming `b8_bit`/`b16_bit`/`b32_bit`)

## Completed Implementation

### 1. SCVal conversion utilities

Added `src/scval.ts`:

- `nativeToScVal(val, opts?)`
- `scValToNative(scv)`
- `scValToBigInt(scv)`

Coverage added in `tests/scval.test.ts` (12 tests), including:

- primitive + bigint coercions
- forced type hints
- address conversion (`G`, `C`, `M`, `B`, `L` paths)
- recursive vec/map conversion behavior

### 2. Sorted SCMap builder + improved complex key ordering

Updated `src/validate.ts`:

- Added `buildSortedScMap(entries)`
- Strengthened `compareScVal` for complex same-discriminant keys by comparing canonical encoded XDR bytes (instead of returning `0`)

Coverage added in `tests/validate.test.ts`.

### 3. Framed XDR (RFC5531 record marking)

Added `src/framed.ts`:

- `encodeFramed(value, writeFn)`
- `decodeFramed(input, readFn, limits?)`
- `decodeFramedStream(input, readFn, limits?)`

Coverage added in `tests/framed.test.ts`:

- single-fragment and multi-fragment decoding
- stream decoding
- truncated/malformed frame safety paths
- trailing-byte rejection for single-record decode

### 4. js-xdr compatibility alias

Updated `src/codec.ts`:

- Added `validateXDR` alias for `validate`

Coverage added in `tests/codec.test.ts`.

### 5. Codegen upgrades

Updated `scripts/codegen/index.ts`:

- Added `--ref` and `--ref=<value>` support (default `curr`)
- Added exported arg/base helpers:
  - `parseCodegenCliArgs(argv)`
  - `getStellarXdrBase(ref)`
- Added generated metadata output:
  - `src/generated/introspection.ts`
  - `ENUM_INTROSPECTION`
  - `UNION_INTROSPECTION`

Updated `scripts/codegen/generator.ts`:

- Added xdrgen-aligned leading-digit safeguard in `enumMemberJsonName`
- Exported `enumMemberJsonName` for direct tests

Regenerated outputs:

- `src/generated/index.ts`
- `src/generated/types.ts`
- `src/generated/introspection.ts` (new)

### 6. Codegen/compliance tests

Added `tests/codegen.test.ts`:

- CLI arg parsing behavior
- prefix computation
- leading-digit JSON naming safeguard (`BINARY_FUSE_FILTER_8_BIT -> b8_bit`)
- introspection metadata sanity checks for enum + union entries

## Validation Summary

Final validation executed after implementation:

1. `bun run codegen`
2. `bun run build`
3. `bun run typecheck`
4. `bun run test`

Results:

- `build`: pass
- `typecheck`: pass
- `test`: pass (`12` files, `454` tests)

## Net-New Public Surface

Added/updated exports:

- `./scval` entrypoint
- `./framed` entrypoint
- root exports now include `scval` and `framed`

## Root Project Divergence Review (2026-02-26)

To confirm whether branch `codex/sep0051-full` should pull additional upstream root
project work, a full ref/state comparison was run:

1. `git fetch --all --prune`
2. compare `main`, `origin/main`, and `codex/sep0051-full` heads
3. inspect branch/worktree status in both root and branch worktree

Result:

- `main` head: `2c2a30831b8d0e42050370bbf1763aab5c1b514b`
- `origin/main` head: `2c2a30831b8d0e42050370bbf1763aab5c1b514b`
- `codex/sep0051-full` head: `2c2a30831b8d0e42050370bbf1763aab5c1b514b`

Conclusion:

- There are no new root project commits to pull into this branch at this time.
- Current divergence is exclusively this branch worktree's local net-new changes.
- No merge conflicts were introduced because no incoming commit-level divergence
  exists yet.

## Remaining Work

No blocking implementation gaps remain from the explicitly tracked “Not started” backlog items in `docs/claude-research-and-improvements.md`.

Potential follow-on (optional):

1. add full fixture-driven differential tests against `rs-stellar-xdr` JSON files in `xdr-json/curr/*` for automated large-scale regression detection
2. add SDK-layer ergonomics wrappers around `scval` primitives when starting the higher-level transaction builder/client package
