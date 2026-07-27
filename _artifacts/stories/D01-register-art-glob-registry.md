# D01: Register art glob + registry export

- **ID:** D01
- **Type:** dev
- **Epics:** Custom SVG, Renderer Foundations
- **Sprint:** sprint-01
- **Status:** done
- **Created:** 2026-07-24

> **Backfill note:** this story was retroactively pulled into sprint-01. A partial
> implementation already exists in the working tree — the art glob + `art` export
> were hand-added to `src/data/index.js` during fork setup but never committed and
> never written up. This story ratifies that change against real AC and finishes it
> correctly (verify → commit). Treat the existing edit as a starting point, not a
> given: confirm it matches the AC below before closing.

## Story

As the 18Dragon renderer,
I want a registry of custom art SVGs exported from `@/data`,
so that hex elements can reference full-color artwork by name (the foundation the
`Art` atom and `Shape` mapping build on).

## Acceptance Criteria

1. `src/data/index.js` registers a Vite glob over `./art/*.svg` (`eager: true`,
   `import: "default"`), mirroring the existing `icons` glob convention.
2. The registry is exported as `art`, keyed by filename stem via `mapKeys(getID, …)`
   (so `dragon.svg` → `art["dragon"]`), consistent with `icons`/`themes`.
3. The app builds and runs with an **empty or absent** `src/data/art/` directory —
   the `art` export is `{}` and no error is thrown (assets arrive in D04).
4. The change is additive: only `src/data/index.js` (no edits to atoms, `Shape.jsx`,
   or `Hex.jsx`); `art` is consumed by D02/D03, not defined by them.
5. The change is committed on branch `18dragon` (it is currently working-tree only).

## Tasks / Subtasks

- [x] Verify the existing `src/data/index.js` edit matches AC 1–2 (glob + `art` export) (AC: 1,2)
- [x] Confirm the app loads with no `src/data/art/` assets present — `art` resolves to `{}` (AC: 3)
- [x] Confirm no other files were changed by this edit (AC: 4)
- [x] Commit on `18dragon`, folding in the `pnpm-workspace.yaml` `allowBuilds` fork-bootstrap
      fix per the reconciliation decision (AC: 5)

## Dev Notes

- Fork: `/Users/earlmiles/Projects/18xx-maker`, branch `18dragon`. Additive, upstream-mergeable
  (PRD-tooling §2.1).
- The edit already present in the working tree adds, after the `icons` glob:
  ```js
  const artFiles = import.meta.glob("./art/*.svg", { eager: true, import: "default" });
  export const art = mapKeys(getID, artFiles);
  ```
  This matches the `icons`/`themes` pattern exactly — verify, don't rewrite.
- `getID`/`mapKeys` are the same helpers used by the sibling registries in this file.
- Vite's `import.meta.glob` over a non-existent directory yields an empty object rather than
  erroring, so an absent `src/data/art/` is fine until D04 adds the first asset.
- **Folded-in change:** `pnpm-workspace.yaml` (`allowBuilds` fix, PRD-tooling §4) is committed
  together with this story per the D-01 reconciliation decision — it's fork bootstrap that the
  build depends on, not new to this story's concept.

## Validation

- `pnpm start` (http://localhost:3000) runs with no console errors and `art` importable from
  `@/data` (already exercised transitively by the committed D02/D03 work).
- `git log` on `18dragon` shows the `src/data/index.js` art-glob change committed.

## References

- [Source: _artifacts/prd-tooling.md#2.1 Custom SVG artwork on tiles/hexes]
- [Source: _artifacts/epics.yaml — "Custom SVG", "Renderer Foundations"]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/data/index.js (icons glob = the pattern to mirror)]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- Backfill of an ad-hoc change: the art glob + `art` export already existed in the working tree
  (uncommitted, no story). Verified it against AC rather than rewriting — it matches the
  `icons`/`themes` registry pattern exactly (`index.js:73–77`).
- AC-3 confirmed: `src/data/art/` does not exist yet, `art` resolves to `{}`, dev server healthy
  (200) — the eager glob over an absent dir does not error. First asset lands in D04.
- Committed on `18dragon` as `febf45c5`, folding in `pnpm-workspace.yaml` (`allowBuilds`
  bootstrap) per the reconciliation decision. All commit hooks passed.
- **Ordering blemish (noted, not fixed):** D02/D03 (`e644d456`) was committed before this one,
  so that earlier commit imports `art` from an as-yet-uncommitted `index.js` — i.e. `e644d456`
  in isolation would not build. Harmless for a solo, non-upstreamed fork; flagged in case a
  clean bisectable history is ever wanted (would require an interactive reorder).

### Files Changed

- `src/data/index.js` (art glob + `art` export) — fork repo `/Users/earlmiles/Projects/18xx-maker`
- `pnpm-workspace.yaml` (new; `allowBuilds` fork-bootstrap fix, folded in)
