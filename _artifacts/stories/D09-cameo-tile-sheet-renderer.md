# D09: Cameo Print & Cut hex-tile sheet renderer

- **ID:** D09
- **Type:** dev
- **Epics:** Tile Printing
- **Sprint:** sprint-14
- **Status:** ready
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

- [ ] **Spike:** render `Tile.jsx` to a static SVG headlessly — try
  `react-dom/server` `renderToStaticMarkup` first (stub `useConfig`/`HexContext`);
  fall back to Vite SSR or a Playwright headless-browser scrape of the existing
  single-tile page if hooks/context make SSR impractical. Record which works. (AC: 1)
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

### Completion Notes

### Files Changed
