# D02: Art shape atom (sized/positioned/layerable)

- **ID:** D02
- **Type:** dev
- **Epics:** Custom SVG
- **Sprint:** sprint-01
- **Status:** done
- **Created:** 2026-07-24

## Story

As the 18Dragon board author,
I want an `Art` shape atom that renders a named full-color SVG at a chosen size and position,
so that fantasy artwork can be placed on hexes as a background or foreground layer.

## Acceptance Criteria

1. A new atom `src/components/atoms/shapes/Art.jsx` looks up its SVG by name from the
   `art` registry exported by `@/data` (the `./art/*.svg` glob already registered in D01).
2. It accepts an `art` prop (the registry key, e.g. `"dragon"`) and renders the matching
   compiled SVG component; an unknown/missing key renders nothing (no crash, no fallback shape).
3. Size is controlled by a `width` prop following the existing shape convention
   (`scale = width / 50`, default 50), and the art is centered on the atom's origin
   (offset `-width/2` on x and y) so the `Position` wrapper places it correctly.
4. It renders the raw SVG group only — no enclosing background circle — so it can layer
   over or under other hex elements (contrast with `Icon.jsx`, which draws a circle).
5. Optional `opacity` prop is honored (default 1); when omitted the art renders fully opaque.
6. The atom is self-contained and additive — no changes to existing atoms, `Shape.jsx`, or
   `Hex.jsx` in this story (that wiring is D03).

## Tasks / Subtasks

- [x] Create `src/components/atoms/shapes/Art.jsx` (AC: 1,2,3,4,5)
  - [x] Import the `art` registry from `@/data`
  - [x] Resolve `Component = art[props.art]`; return `null` when absent (AC: 2)
  - [x] Compute `scale = defaultTo(50, width) / 50`, size `50 * scale`, offset `-25 * scale` (AC: 3)
  - [x] Render `<Component width height x y opacity />` inside a `<g>` (AC: 3,4,5)
- [x] Confirm no import cycle and that the atom is not yet referenced anywhere (AC: 6)

## Dev Notes

- Fork: `/Users/earlmiles/Projects/18xx-maker`, branch `18dragon`. Static reference renderer —
  keep the change additive and upstream-mergeable (PRD-tooling §3).
- Reference atoms: `Circle.jsx` for the `width → scale` convention; `Icon.jsx` for looking up
  a glob-compiled SVG component and applying `width/height/x/y` (Art is Icon minus the circle,
  reading from `art` instead of `icons`).
- Registry: `export const art = mapKeys(getID, artFiles)` in `src/data/index.js` (D01) — keyed
  by filename stem, so `dragon.svg → art["dragon"]`.
- "Layerable" at the atom level = it emits only the SVG group; actual draw order relative to
  track tiles is decided in D03/`Hex.jsx`, not here.
- No sample asset is required to *build* the atom; D04 adds a real asset and proves it renders.
  For a local smoke test, drop any throwaway SVG in `src/data/art/` (do not commit it here).

## Validation

- `pnpm start` (http://localhost:3000) compiles with no console errors after adding the atom.
- Atom is importable and returns `null` for an unknown `art` key (no throw). Full on-hex render
  is validated in D04 once `Shape.jsx` mapping (D03) exists.

## References

- [Source: _artifacts/prd-tooling.md#2.1 Custom SVG artwork on tiles/hexes]
- [Source: _artifacts/epics.yaml — "Custom SVG" (D01–D04)]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/atoms/shapes/Circle.jsx]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/atoms/Icon.jsx]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/data/index.js (art glob, D01)]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- Added `Art.jsx` atom modeled on `Icon.jsx` minus the enclosing circle, reading from the
  `art` registry (`@/data`) instead of `icons`. Uses the `Circle.jsx` scale convention
  (`scale = width / 50`, default 50), centering the SVG at offset `-25 * scale`.
- Unknown/missing `art` key returns `null` — no crash, no fallback shape (AC-2).
- `opacity` defaults to 1 (AC-5). Emits only a `<g>` with the SVG, no background circle,
  so it is layerable (AC-4).
- Additive only: no edits to `Shape.jsx`, `Hex.jsx`, or existing atoms (AC-6, verified via
  `git status` — only the new file is added). Atom is not yet referenced anywhere; the
  `Shape` mapping wiring is D03 and the on-hex render proof is D04.
- Verified: ESLint clean (exit 0) on the new file; dev server healthy. Full on-hex visual
  render intentionally deferred to D04 per the story's Validation section.

### Files Changed

- `src/components/atoms/shapes/Art.jsx` (new) — fork repo `/Users/earlmiles/Projects/18xx-maker`
