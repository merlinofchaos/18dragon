# D09: Cameo Print & Cut hex-tile sheet renderer

- **ID:** D09
- **Type:** dev
- **Epics:** Tile Printing
- **Sprint:** sprint-14
- **Status:** review
- **Created:** 2026-08-07

## Story

As the designer,
I want a custom hex-tile renderer that **reuses 18xxMaker's `Tile.jsx` drawing
headlessly** and emits **Silhouette Cameo Print & Cut** sheets (print PNG +
registered hex cut SVG),
so that I can print and cut the physical 18Dragon tiles — which 18xxMaker's built-in
tile output can't do (its `die`/`smallDie` layouts are for pin-registered cutting
dies, not the Cameo's camera-registered Print & Cut, and it doesn't produce a clean
cut-path `.svg`).

## Context / decision

The Silhouette Cameo is **not** a die-cutter. It prints artwork with **registration
marks**, then its camera reads them and cuts **software-defined paths**. 18xxMaker's
`die`/`smallDie`/`Cutlines` path is the wrong model and is **not reused**. We reuse
only the **tile art** (`Tile.jsx` + its atoms: Track/City/Town/Label/…) and own the
sheet, cut geometry, and output file — mirroring `stickers.py`'s Cameo pipeline, but
for hexes instead of circles.

## Acceptance Criteria

1. **Headless tile → static SVG (the spike).** A script renders a given tile
   definition (from the C15 tiles in `18dragon.json`) through 18xxMaker's `Tile.jsx`
   to a **static SVG string**, reusing the existing atoms — **no re-implementation**
   of track/city/label drawing. Proven on a sample standard tile *and* a custom
   special-city / ruins tile.
2. **Cameo-safe placement.** Hex tiles laid on **US Letter** avoiding the Cameo
   **no-cut zones** (edge ~16.9mm, corner ~35.7mm — the `stickers.py` constants),
   paginating across sheets as needed.
3. **Registered hex cut paths.** Per-tile **hexagon cut path**, matching each tile's
   orientation/size from `Tile.jsx`, registered to the printed art (correct scale @
   the print DPI), emitted as a distinct cut layer.
4. **Registration marks.** Cameo Print & Cut registration marks on each sheet, in the
   position/format Silhouette Studio expects.
5. **Output files (stickers convention).** Per sheet: `<name>.png` (300dpi print art),
   `<name>_cut.svg` (hex cut paths only, registered), `<name>_print_and_cut.svg`
   (combined) — written to **`print/`**.
6. **Driven by the tile set (C15).** Reads the tile inventory/counts from
   `18dragon.json` (`tiles`), rendering the right quantity of each; a plain run
   regenerates the sheet(s) in place.
7. **Round-trips into Silhouette Studio** — the designer imports the output, the
   registration marks + cut layer are recognized, and a test cut aligns to the
   printed hexes. (Designer-verified.)
8. **Lives in the fork** (`/Users/earlmiles/Projects/18xx-maker`, branch `18dragon`)
   since it imports `Tile.jsx`; documented run command. Never modifies upstream `main`.

## Tasks / Subtasks

- [x] **Spike:** render `Tile.jsx` to a static SVG headlessly. **DONE — succeeded
  via the Playwright route** (Express `dist/site` + chromium, i.e. 18xxMaker's own
  `pnpm print` backbone), not SSR. `bin/spike-tile-svg.mjs` extracts a self-contained
  tile SVG from `/games/<slug>/tiles/<id>`. Proven on tiles 5/57/9 (city + track),
  standalone-rasterized correctly, zero console errors. (AC: 1)
- [ ] Sheet layout: hex placement on Letter avoiding the Cameo no-cut zones;
  paginate. Port the `stickers.py` no-cut constants/logic. (AC: 2, 6)
- [ ] Hex cut-path geometry: outline matching `Tile.jsx`'s hex orientation/size,
  registered to the print art at the chosen DPI. (AC: 3)
- [ ] Cameo registration marks on the sheet. (AC: 4)
- [ ] Emit `png` + `_cut.svg` + `_print_and_cut.svg` to `print/`. (AC: 5)
- [ ] Wire quantities from `18dragon.json` `tiles`; regenerate in place. (AC: 6)
- [ ] Designer round-trip test in Silhouette Studio; adjust reg-mark/cut specifics. (AC: 7)

## Dev Notes

- **Reuse, don't redraw.** The whole point is to keep `Tile.jsx` + atoms as the art
  source. The renderer only adds: page/sheet, no-cut placement, hex cut paths,
  registration marks, raster/vector export.
- **Headless render risk.** `Tile.jsx` pulls hooks (`useConfig`) and context
  (`HexContext`). The spike (AC 1) de-risks this first; if SSR needs too much app
  bootstrapping, the Playwright route (drive `src/components/pages/games/Tile.jsx`,
  read the rendered `<svg>`) reuses 100% of rendering incl. CSS. **If the spike
  fails outright, stop and reconsider** (redraw-from-defs was the rejected-heavier
  alternative) rather than plowing on.
- **Cameo pipeline to mirror:** `tools/stickers.py` — no-cut zones (EDGE ~16.9mm /
  CORNER ~35.7mm), 300 DPI, PNG + registered cut SVG + combined; `REVEAL`/`BLEED`
  insets. Hex replaces the circle as the cut shape.
- **Orientation/size:** derive the hex geometry from `Tile.jsx`/`src/util/map.js`
  (`HEX_RATIO`) so the cut path matches the printed tile exactly.
- **NOT used:** `tilesheet.js` `die`/`smallDie` layouts, `Cutlines.jsx` (pin-die model).
- **Where it runs:** a script/tool in the fork repo (it imports fork components).
  Output still lands in the 18Dragon repo's `print/` (or a documented path) for
  consistency with the other component decks.

## Validation

- Running the tool produces `print/` sheet files (PNG + `_cut.svg` +
  `_print_and_cut.svg`) with tiles rendered by the reused `Tile.jsx`, no art/cut in
  the Cameo no-cut zones, correct per-tile counts.
- A sample sheet **imports into Silhouette Studio** with registration marks + cut
  layer recognized and a test cut aligned to the printed hexes (designer-verified).
- Change isolated on the fork's `18dragon` branch; no console errors on the running
  app; `done` requires it **committed** on `18dragon` (per workflow DoD).

## References

- [Source: prd-game.md#11 components] (Tiles / tile manifest → physical print)
- [Source: /Users/earlmiles/Projects/18xx-maker/src/components/Tile.jsx] (art to reuse)
- [Source: /Users/earlmiles/Projects/18xx-maker/src/components/atoms/] (Track/City/Town/Label)
- [Source: /Users/earlmiles/Projects/18xx-maker/src/util/tilesheet.js] (existing layouts — die/pin, NOT reused)
- [Source: tools/stickers.py] (Cameo Print & Cut pipeline to mirror)
- [Depends on: C15] (the tile set/definitions this renders)

## Work Log

### Model Used

claude-opus-4-8

### Spike outcome (AC 1) — PASSED

The headless `Tile.jsx → self-contained static SVG` bridge works, and the mechanism
is 18xxMaker's **existing print pipeline**, so there's very little new plumbing:

- **Route:** `startExpress()` (from `#cli/util`, serves the built `dist/site`) +
  Playwright chromium → `GET /games/<slug>/tiles/<id>` renders one tile; extract via
  `page.$eval(".tile svg", el => el.outerHTML)`. Same backbone as `pnpm print`
  (`src/cli/print.js`). **No SSR / context-stubbing needed** (that route would have
  fought Vite `@/` aliases + `useConfig`/`useGame`/4 contexts).
- **Self-contained output:** the tile `<svg>` references `hexClipPath` /
  `hexBleedClipPath`, which are defined **globally** in `src/components/Root.jsx`
  (not per-tile). The spike inlines those two `<clipPath>` defs into each extracted
  SVG → standalone. Confirmed by rasterizing the standalone files.
- **Bonus for AC 3:** `hexClipPath`'s polygon **is** the flat-top hex outline —
  `-86.0252,0 -43.0126,-74.5 43.0126,-74.5 86.0252,0 43.0126,74.5 -43.0126,74.5` in
  the tile's `-100..100` viewBox — so the per-tile **cut path** is this polygon
  scaled to the print size. No hex geometry to derive.
- **Prereq:** `pnpm build` first (Express serves `dist/site`).
- Verified on 1889 tiles **5, 57, 9** (city+track, city+straight, straight):
  self-contained SVGs, correct render, **no console/page errors**.

**Implication:** the remaining D09 work is the parts we always knew we'd own — the
Cameo sheet (no-cut placement from `stickers.py`), per-tile hex cut paths (reuse the
clip polygon), registration marks, and PNG + cut-SVG + combined output — plus reading
quantities from C15's tiles. The risky unknown is retired.

### Files Changed (so far)

- `/Users/earlmiles/Projects/18xx-maker/bin/spike-tile-svg.mjs` (new, on `18dragon`) —
  the spike/proof; seed for the full renderer. **Uncommitted.**

### End-to-end (option A, against 1889 sample tiles) — WORKING

`bin/tile-sheet.mjs` takes the full pipeline end-to-end:
- Extracts each unique tile's self-contained SVG (reused `Tile.jsx`), placing them
  on a Cameo-safe grid (the `stickers.py` no-cut zones) with per-tile flat-top hex
  **cut paths** that register to the art with bleed (art clipped to
  `hexBleedClipPath`, cut on `hexClipPath`).
- Reads tile **counts** from the game (`inventory()`), paginates, and writes
  `tiles[_pN].png` (300 DPI) + `_cut.svg` + `_print_and_cut.svg`.
- **Verified:** 1889 → 63 tiles, 4 sheets, 20/page, cut registers with bleed,
  no-cut zones clear, zero page errors. PNG dims exactly 2550×3300.

Fixes found while building: (1) the extracted `<svg>`'s size is an inline
`style="width:2in;height:2in"`, not width/height attrs — must neutralize it so the
mm container governs scale; (2) art vs cut register because both use the same
`hexClipPath`/`hexBleedClipPath` geometry (no orientation guesswork).

**Layout (designer decision) — TRIHEXAGONAL, long straight cuts.** The blade must
run in **long straight passes** (turning is hard on **chipboard**), so tiles are
laid in a **trihexagonal (kagome)** arrangement: flat-top hexes on a triangular
lattice (centers `2s` apart, `s` = edge; odd rows offset `s`), touching only at
vertices, with **triangular waste** between them. Every hex edge then lies on one of
**3 families of full-length straight lines**; the cut layer merges all colinear hex
edges into those long lines (group by angle + perpendicular offset, span the
extremes). Cutting the straight lines drops the hexes out; the triangles are waste.
Art clipped to the **true** hex. *(An earlier edge-to-edge honeycomb was rejected —
its shared-edge cuts still turn the blade at every vertex. Trihexagonal trades
density (~19/page vs 28) for straight cuts — the right call for chipboard.)*

**Bleed + color seams (designer round of review).** Art bleeds past **every** edge
and vertex (`--bleed`, default 0.8mm) for cutter tolerance. But two tiles touch at
every vertex, so differently-colored bleeds overlap there (a chamfer that pulled the
bleed back was rejected — it removes tolerance exactly where the cut is least
accurate). Fix: **group tiles by color** into contiguous full-width trihex blocks —
within a block (one color) tiles touch with full bleed and straight cuts (same-color
overlap is invisible); between blocks a **seam gap** (`--seam`, default
`max(2, 2·bleed+0.5)` mm) keeps differently-colored bleeds apart. Cut lines merge
**per block**, never across a seam. Tile colors come from 18xxMaker's tile defs
(`loadTiles`) / the game's custom-tile color.

**Tile size (designer).** Flat-to-flat, the standard 18xx measure: `--inch` (default
1.5", standard) or `--mm` (1822-style large maps ~1"). 1889: 1.5"→19/sheet, 1"→45/sheet.

**Registration marks (AC 4) — CONFIRMED:** no marks drawn; Silhouette Studio adds
them at print setup and the no-cut zones reserve their space — the same workflow as
`tools/stickers.py`, which the designer already prints successfully.

**Committed on the fork `18dragon`:** `bin/spike-tile-svg.mjs` (spike) +
`bin/tile-sheet.mjs` (renderer).

**Output location:** the real 18Dragon sheets are generated to the committed
`print/tiles/` dir — `node bin/tile-sheet.mjs 18dragon <repo>/print/tiles --inch 1.0`
(1" flat-to-flat). `samples/` holds only throwaway test renders (gitignored).

**Still open:** point `tile-sheet.mjs` at 18Dragon's real tiles once **C15** lands
(the tool reads any game's `tiles`); write the real run to the 18Dragon `print/`;
designer Silhouette **round-trip** verification (AC 7).

### Completion Notes
