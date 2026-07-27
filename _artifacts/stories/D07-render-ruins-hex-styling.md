# D07: Render special ruins hex styling

- **ID:** D07
- **Type:** dev
- **Epics:** Ruins Rendering, Verantum
- **Sprint:** sprint-01
- **Status:** done
- **Created:** 2026-07-24

## Story

As the 18Dragon board author,
I want the Verantum ruins hexes rendered with a distinct visual identity,
so that the island's special ruins terrain reads as ruins at a glance — separate from ordinary
mainland plain hexes — before any upgrade annotations are added (D08).

## Acceptance Criteria

1. A `ruins` background color is defined in `18dragon.json` `colors` and applied to the Verantum
   ruins hex group, so ruins hexes are visually distinguishable from mainland `plain` hexes.
2. A committed ruins art asset (`src/data/art/ruins.svg`, full-color placeholder — broken
   columns/rubble) renders as a subtle **background** marker on the ruins hexes via the existing
   Custom-SVG pipeline (D02/D04) — no new renderer code.
3. The gray 4-slot central ruins city (H9) plus the styled ruins hexes together read as the
   Verantum ruins; the permit **"A"** corner letters (D06) remain legible over the new fill.
4. Renders on the 18Dragon map at :3000 with no console errors; ruins hexes are clearly distinct
   from mainland plain. Screenshot captured.
5. Additive & self-contained: one committed fork asset + `18dragon.json` styling only. No fork
   renderer-code change (reuses `Art` atom / `Shape` / hex color support). Final color + art are
   **placeholder pending world design** — this story delivers the identity mechanism, not final art.

## Tasks / Subtasks

- [x] Add a `"ruins"` entry to `colors` in `18dragon.json` (`#d9d9d9` light gray per designer) (AC: 1,3)
- [x] Create + commit `src/data/art/ruins.svg` — multi-fill broken-columns/rubble placeholder (AC: 2,5)
- [x] Apply `color: "ruins"` + a `background: true` ruins-art `shapes` entry (width 34) to the
      island ruins hex group (the 46 "A" hexes) (AC: 1,2)
- [x] Keep H9 gray as the central ruins city; permit "A" letters confirmed legible (AC: 3)
- [x] Verify in-app: whole island reads as ruins, distinct hub, console clean; screenshots (AC: 4)

## Dev Notes

- Fork: `/Users/earlmiles/Projects/18xx-maker`, branch `18dragon`. Test file:
  `/Users/earlmiles/Projects/18dragon/18dragon.json`. Static reference renderer, additive
  (PRD-tooling §2.3, §3).
- **Verantum = region A island** (PRD-game §6.2): 46 plain `"A"` ruins hexes + gray H9 central
  4-slot ruins city + F17/L11 pre-placed cities (the latter to be reworked in content story C01 —
  leave them alone here).
- **Reuse the Custom-SVG pipeline** (D02 `Art` atom, D04 proof): commit `ruins.svg` like
  `dragon.svg`, render it via `hex.shapes` with `background: true` so track/tokens/annotations
  (D08) stay readable on top. No `Shape`/`Hex` code change needed.
- Icons available have no literal "ruins" glyph (`mountain`, `mining`, `tree`, … — see
  `src/data/icons/`), which is why a custom art marker is the right tool here.
- `colors` already defines `blue`; add `ruins`. Suggested placeholder: a muted stone/lavender tied
  to region A (`#7B2D8B`) but light enough for the purple letter to read — pick during
  implementation and flag as provisional for world design.
- **If** the intended ruins look needs a renderer capability 18xxMaker lacks (e.g. a hex fill
  *texture/pattern* rather than a flat color + art marker), **pause and reconcile** (AC-5 / skill
  rule) rather than building an invasive change.
- **Boundary with D08:** D07 = ruins visual identity (color + marker). D08 = annotating each ruins
  hex's allowed upgrade targets (plain / dit / town / metro). Keep upgrade annotations out of D07.

## Validation

- `pnpm start` (http://localhost:3000), load `18dragon.json`: the island ruins hexes render with
  the ruins color + marker, clearly distinct from mainland plain hexes; permit "A" letters legible;
  no console errors. Screenshot.
- Verify via a temp copy into the fork's `src/data/games/` + Playwright (as in D04–D06), or File >
  Open. Do not leave a stray copy in the fork.

## References

- [Source: _artifacts/prd-tooling.md#2.3 Ruins hex upgrade annotations (render + annotate)]
- [Source: _artifacts/prd-game.md#6.2 Verantum island — ruins & metros]
- [Source: _artifacts/stories/D04-sample-art-render-on-hex.md — the art pipeline this reuses]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/atoms/shapes/Art.jsx]
- [Data: /Users/earlmiles/Projects/18dragon/18dragon.json (region-A island hexes; `colors`)]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **No renderer code change** — delivered entirely with the existing pipeline: a `ruins` hex
  color (`#d9d9d9` light gray, per designer) + a committed ruins art marker rendered as a
  `background: true` shape (width 34) on the 46-hex island group.
- `src/data/art/ruins.svg`: hand-authored full-color vector (broken columns + rubble, weathered
  stone tones). svgo optimized it on commit. Committed `16dce472` on `18dragon`.
- **Verified in-app** (temp copy + Playwright, real file untouched): the whole Verantum island now
  reads as light-gray ruins terrain with a ruin marker per hex; the gray H9 4-slot city stands out
  as the central hub; permit "A" letters legible on the new fill; **zero console errors**. F17/L11
  cream cities intentionally still stand out (left for C01).
- **Gotcha found (worth recording for the art pipeline):** `vite-plugin-fast-react-svg` inlines the
  SVG's inner content into a **single-quoted** JS string, so any **apostrophe** in an SVG comment
  (e.g. "Dragon's") breaks compilation with a `vite:import-analysis` "invalid JS syntax" 500. Keep
  apostrophes out of `src/data/art/*.svg` (comments included). `dragon.svg` avoided it by luck.
- Placeholder art + color are provisional pending world design (AC-5).

### Files Changed

- `src/data/art/ruins.svg` (new; committed `16dce472`) — fork repo `/Users/earlmiles/Projects/18xx-maker`
- `18dragon.json` (`colors.ruins` = `#d9d9d9`; island group → `color: ruins` + ruins-art
  `background` shape) — project working file, not version-controlled
