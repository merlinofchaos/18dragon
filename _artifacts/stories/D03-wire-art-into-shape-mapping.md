# D03: Wire art type into Shape.jsx mapping

- **ID:** D03
- **Type:** dev
- **Epics:** Custom SVG
- **Sprint:** sprint-01
- **Status:** done
- **Created:** 2026-07-24

## Story

As the 18Dragon board author,
I want the `Art` atom registered as an `art` type in the `Shape` mapping,
so that a hex JSON element like `{ "type": "art", "art": "dragon" }` renders the artwork
through the same `Shape`/`Position` path every other hex element uses.

## Acceptance Criteria

1. `src/components/atoms/shapes/Shape.jsx` maps `type: "art"` to the `Art` atom (D02).
2. A `Shape` element with `type: "art"` renders the named artwork; `art`, `width`, and
   `opacity` props pass through from the element to the atom.
3. Unknown `type` values keep the existing default behavior (falls back to `Circle`) —
   the `art` addition does not change dispatch for any other type.
4. An `art` element with a missing/unknown `art` key renders nothing (inherited from D02),
   with no console error.
5. Change is additive: one import + one mapping entry; no edits to other atoms, `Hex.jsx`,
   `Position.jsx`, or the `Art` atom itself.

## Tasks / Subtasks

- [x] Import `Art` in `Shape.jsx` (AC: 1,5)
- [x] Add `art: Art` to the `mapping` object (AC: 1,2,3)
- [x] Confirm `Shape` spreads `{...props}` so `art`/`width`/`opacity` reach the atom (AC: 2)
- [x] Smoke-test dispatch: `type: "art"` → `Art`; unknown type → `Circle` (AC: 3,4)

## Dev Notes

- Fork: `/Users/earlmiles/Projects/18xx-maker`, branch `18dragon`. Static reference renderer,
  additive change (PRD-tooling §2.1, §3).
- `Shape.jsx` today: a `mapping` object (`circle`, `diamond`, `ellipse`, `hexagon`, `square`,
  `triangle`, `star`) with `Component = mapping[type] || Circle`, rendering `<Component {...props} />`.
  This story adds exactly one import and one key.
- The `Art` atom already exists from D02 and reads `props.art`/`props.width`/`props.opacity`;
  `Shape` already spreads all props, so no prop plumbing is needed beyond the mapping entry.
- Actual on-hex placement + draw order vs. track tiles (where `Shape type:"art"` gets invoked
  from `Hex.jsx`) is exercised by D04, not here. This story is just the dispatch wiring.
- Note: `Shape` is currently only consumed by `Hex.jsx`; no other call sites to update.

## Validation

- `pnpm start` (http://localhost:3000) compiles with no console errors.
- With the mapping in place, a `Shape` given `{ type: "art", art: "<key>" }` resolves to the
  `Art` atom (verified in D04 once a real asset + hex element exist). Unknown types still
  resolve to `Circle`.

## References

- [Source: _artifacts/prd-tooling.md#2.1 Custom SVG artwork on tiles/hexes]
- [Source: _artifacts/stories/D02-art-shape-atom.md — the Art atom this wires in]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/atoms/shapes/Shape.jsx]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/atoms/shapes/Art.jsx]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- Added one import (`Art`) and one mapping entry (`art: Art`) to `Shape.jsx`. The existing
  `Component = mapping[type] || Circle` dispatch and `<Component {...props} />` spread are
  unchanged, so unknown types still fall back to `Circle` (AC-3) and `art`/`width`/`opacity`
  pass straight through to the atom (AC-2).
- Additive only: `git status` shows just `Shape.jsx` modified (plus the untracked `Art.jsx`
  from D02); no edits to other atoms, `Hex.jsx`, `Position.jsx`, or `Art.jsx` (AC-5).
- Verified: ESLint clean (exit 0); dev server healthy. Behavioral render of `type: "art"`
  on a hex is exercised in D04 (needs a real asset + hex element) — including the carried-over
  `opacity` passthrough check now noted on the D04 backlog stub.

### Files Changed

- `src/components/atoms/shapes/Shape.jsx` (import + `art: Art` mapping entry) — fork repo
  `/Users/earlmiles/Projects/18xx-maker`
