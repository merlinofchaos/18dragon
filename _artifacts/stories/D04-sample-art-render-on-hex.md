# D04: Sample art asset proves render on a hex

- **ID:** D04
- **Type:** dev
- **Epics:** Custom SVG
- **Sprint:** sprint-01
- **Status:** done
- **Created:** 2026-07-24

## Story

As the 18Dragon board author,
I want a real sample art SVG rendered on a hex through the full pipeline,
so that the art foundation (D01 registry → D02 atom → D03 mapping) is proven end-to-end
and the "full-color, positioned, layerable" requirement is demonstrably met.

## Acceptance Criteria

1. A sample **full-color** SVG (multiple fills, not a single-color icon) is committed at
   `src/data/art/<name>.svg`; it auto-compiles via `vite-plugin-fast-react-svg` and appears
   in the `art` registry as `art["<name>"]`.
2. A hex in `18dragon.json` carries a `shapes` entry `{ "type": "art", "art": "<name>" }`,
   and the artwork visibly renders on that hex at http://localhost:3000 with **no console errors**.
3. **Layering** works through the existing `hex.shapes` bg/fg split (no renderer change):
   `{ …, "background": true }` draws the art **under** the hex's track/tile; without the flag
   it draws **over**. Both are demonstrated.
4. **Sizing/positioning** works: `width` scales the art (per the D02 scale convention) and
   `angle`/`percent` place it via the existing `Position` wrapper.
5. **Opacity passthrough (carry-over from D02 QA):** a `shapes` entry with `opacity` < 1 renders
   visibly semi-transparent — confirming `vite-plugin-fast-react-svg` spreads `opacity` onto the
   compiled SVG root. If it does **not** pass through, stop and reconcile: either apply the fix in
   `Art.jsx` (apply opacity on the wrapping `<g>` instead of the SVG element) or log a follow-up
   story — do not silently ship a no-op prop.
6. The asset is committed on `18dragon` and self-contained (no runtime fetch).

## Tasks / Subtasks

- [x] Add + commit `src/data/art/dragon.svg` — a small, valid, multi-fill SVG (AC: 1,6)
  - [x] Confirm it resolves as `art["dragon"]` (registry keyed by filename stem)
- [x] Add `shapes` entries to hexes G8/G10/G12 in `18dragon.json` referencing it (AC: 2)
- [x] Load `18dragon.json` in the app; confirm the art renders, console clean (AC: 2)
- [x] Add a `background: true` variant (G10); default is foreground (G8/G12) (AC: 3)
- [x] Exercise `width` + `angle`/`percent` (G8 positioned toward top, width 40); confirm scale/placement (AC: 4)
- [x] Add an `opacity: 0.5` variant (G12); confirmed visibly semi-transparent (AC: 5)
  - [x] Opacity visibly applies — passthrough works, no fix needed
- [x] Capture the rendered result (screenshots in scratchpad; full map + row-G crop)

## Dev Notes

- Fork: `/Users/earlmiles/Projects/18xx-maker`, branch `18dragon`. Test game file:
  `/Users/earlmiles/Projects/18dragon/18dragon.json`.
- **No renderer wiring needed** — `Hex.jsx` already consumes `hex.shapes`:
  `bgShapes = Position(filter background) → <Shape>` (line ~205, rendered ~294, under the tile)
  and foreground `shapes = Position(reject background) → <Shape>` (line ~211, rendered ~341, over
  the tile). `Shape` dispatches `type:"art"` to the D02 atom; `Position` reads `angle`/`percent`.
  So this story is asset + JSON + verification only.
- Attach point: `hex.shapes` is an array on a hex-group definition, e.g.
  ```json
  { "color": "plain", "shapes": [
      { "type": "art", "art": "dragon", "width": 40, "background": true }
    ], "hexes": ["A1"] }
  ```
- Prefer attaching to an existing hex already in `18dragon.json` (the map has at least one
  placeholder hex; see CLAUDE.md map gotcha) rather than inventing map geometry here.
- Sample art: keep it small and self-contained (inline paths, no external refs). A simple
  multi-color dragon glyph or test emblem suffices — the point is proving full-color render,
  not final art (real assets come with the map/world work).

## Validation

- Renders correctly on hot-reload at http://localhost:3000 with `18dragon.json` loaded; no
  console errors. Screenshot the hex showing: (a) foreground art, (b) background art under a
  tile, (c) the semi-transparent (opacity) variant.
- Definition of Done for the Custom SVG chain: D01→D04 all `done`, art visibly on the board.

## References

- [Source: _artifacts/prd-tooling.md#2.1 Custom SVG artwork on tiles/hexes]
- [Source: _artifacts/stories/D02-art-shape-atom.md — atom; opacity-passthrough carry-over]
- [Source: _artifacts/stories/D03-wire-art-into-shape-mapping.md — Shape dispatch]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/Hex.jsx (hex.shapes bg/fg split, ~205–212)]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/atoms/shapes/Art.jsx]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- Added `src/data/art/dragon.svg` (placeholder heraldic dragon, multi-fill full color). The
  fork's `svgo` pre-commit hook optimized it on commit — functionally identical.
- Verified by rendering the real game in the running dev server: temporarily copied
  `18dragon.json` into the fork's `src/data/games/` (glob-registered → route `games/18dragon/map`),
  drove it headless with Playwright, screenshotted, then removed the throwaway copy. **Zero
  console errors**; DOM confirmed the dragon's green fills present on all three demo hexes.
- Demo lives on hexes **G8/G10/G12** (pulled out of the region-A plain group) in `18dragon.json`:
  - **G8** — foreground, `width: 40`, `angle: 180`, `percent: 0.5` → sized + positioned toward top (AC-4)
  - **G10** — `background: true`, centered (AC-3)
  - **G12** — `opacity: 0.5`, centered → visibly semi-transparent (AC-5 **confirmed**: opacity
    passes through the compiled SVG root; no `Art.jsx` fix needed)
- **Layering (AC-3):** confirmed by code path — `Hex.jsx` renders `bgShapes` first (before tracks,
  cities, labels, tokens) and foreground `{shapes}` last (over everything). Both variants render;
  the "under a placed tile" contrast isn't vivid on these plain (trackless) demo hexes, but the
  ordering is the existing, already-working bg/fg split.
- **Positioning answered:** art accepts the full `<Position>` vocabulary — `angle`/`percent`
  (direction + distance), `x`/`y` (nudge), `rotation`/`side` (spin). Note `angle: 0` points to the
  hex bottom (SVG +y is down); use `angle: 180` for the top.
- **Note:** the G8/G10/G12 shapes are placeholder proof content in `18dragon.json` (not git-tracked
  — the project dir is not a repo). Keep as living demo or revert once real map art is designed —
  pending user call.

### Files Changed

- `src/data/art/dragon.svg` (new; committed `18fbb2e9` on `18dragon`) — fork repo
- `18dragon.json` (demo `shapes` on G8/G10/G12; local working file, not version-controlled)
