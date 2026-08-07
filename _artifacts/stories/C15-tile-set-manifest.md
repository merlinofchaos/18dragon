# C15: Define track tile set + tile manifest

- **ID:** C15
- **Type:** content
- **Epics:** World & Map, Game Components
- **Sprint:** sprint-14
- **Status:** ready
- **Created:** 2026-08-07

## Story

As the designer,
I want the full 18Dragon track-tile set defined as the `tiles`/`upgrades` sections
of `18dragon.json` plus a tile manifest,
so that 18xxMaker renders the complete tile sheet and the board's special cities
and Verantum ruins have the tiles they need.

## Acceptance Criteria

1. **Standard track tiles** — inherit the **1822 manifest** (`g_1822/map.rb`
   `TILES`): the standard yellow/green/brown/gray numbered track & city tiles, at
   **1822 counts as-is** (tune later via playtest). Include 1822's **gray-tier
   standard tiles** so a small number of *normal* cities can upgrade to gray (as in
   PNW/1822).
2. **Special-city upgrade families — shared tiers** (not bespoke per label). Two
   custom families, each a yellow→green→brown→**gray** progression:
   - **B-family** — revenues **30 / 40 / 50 / 60** (y/g/b/gray). Used by the
     **B-label** cities (Corvium F17, Lavinia L11, Marsal R25, Alveem N13) **and**
     the **K/P** cities (Dunmael E20, Kaeldun K18, Pendrael J27).
   - **Capital-family** — revenues **30 / 50 / 70 / 90** (y/g/b/gray), with
     **Brekheim (H, I36) → 100 at gray**. Used by the capitals: **D** Draeven F29,
     **H** Brekheim I36, **R** Varstgrad I44, **V** Kalavar R21.
3. **City token slots (holes):**
   - **Capitals:** start **2 slots** (yellow), **3 slots** at brown; **Brekheim →
     4 slots** at gray. Capital **brown** tiles are **"splat"** (6 track legs /
     all directions) **where geometry allows** — some are blocked and get
     individually tweaked.
   - **B / K / P cities:** B-family values; **1 slot** by default, **some go to 3
     slots** — decided case-by-case in the tweak pass.
   - **Draeven F29** already starts **size-2** on the map (consistent with the
     capital 2-slot start).
4. **Verantum ruins tiles** — the special ruins **development tiles** (tile shapes
   only; the *lay rules* — when/where/cost — are deferred, per designer):
   - **Yellow ruins tile:** a **dead-end** tile — a single track leg with an
     **arrow pointing backward** and **+10gp**.
   - **Green upgrade A (value):** the single dead-end, value raised to **+20gp**.
   - **Green upgrade B (branch):** **adds a second dead-end** in another direction;
     **each dead-end is +10gp**.
   - The **central ruins city** (Verantia H9) stays the fixed **gray, 4-slot, base
     10gp** tile already on the map; its value grows via these adjacent dead-end
     tiles (metros). Value cap ~100gp (PRD §6.2).
5. **Tile manifest** — a `docs/` doc listing every tile (standard + special + ruins)
   with **quantity**, color, and which cities/hexes use it. Counts for the special
   families and ruins tiles seeded sensibly (enough capital/B tiles for the labeled
   cities; ruins tiles enough for the 6 metro hexes) and flagged as tweakable.
6. **Renders in 18xxMaker** — `18dragon.json` still loads with no schema error and
   the tiles render via 18xxMaker's `Tile.jsx` (valid tile defs). `upgrades` wires
   the color→color paths (incl. the special families and ruins upgrades). *(The
   physical **Print & Cut** sheets are **D09**, which reuses that same `Tile.jsx`
   rendering headlessly — so C15's tile defs must be valid 18xxMaker tiles.)*
7. **Explicit tweak pass** — after the sheet renders, a **design-by-seeing tweak
   phase** to adjust per-city slot counts, splat/blocked brown tiles, Kroddheim
   K36 (unlabeled yellow city — classify as normal or B-family here), and any
   values. Baked into the story as a task, not a follow-up.

## Tasks / Subtasks

- [ ] Pull the **1822 standard tile manifest** (names + counts) from
  `g_1822/map.rb` `TILES`; map each to its 18xxMaker standard tile def; keep 1822
  counts. Confirm the gray-tier standard tiles are included (AC: 1)
- [ ] Define the **B-family** upgrade tiles (30/40/50/60, y→g→b→gray) and assign the
  B + K/P cities' labels to it (AC: 2)
- [ ] Define the **Capital-family** upgrade tiles (30/50/70/90, y→g→b→gray;
  Brekheim gray=100); encode the **slot progression** (2→3, Brekheim →4) and
  **splat brown** where geometry allows (AC: 2, 3)
- [ ] Define the **3 ruins tiles** (yellow dead-end +10; green +20; green
  double-dead-end +10/+10) as tile `code`; leave Verantia H9 as the fixed gray
  4-slot base-10 city (AC: 4)
- [ ] Write the `tiles` + `upgrades` sections into `18dragon.json`; verify it loads
  in 18xxMaker and the tile sheet renders (AC: 6)
- [ ] Write the **tile manifest** doc in `docs/` (every tile: qty, color, users) (AC: 5)
- [ ] **Tweak pass:** render, then adjust per-city slots (some K/P → 3), splat vs
  blocked brown tiles, classify Kroddheim K36, tune values (AC: 7)

## Dev Notes

**Deliverable form.** Tiles render **in 18xxMaker** — top-level `tiles` (inventory)
and `upgrades` (paths) in `18dragon.json`. Follow the 18xxMaker tiles schema
(`/Users/earlmiles/Projects/18xx-maker/src/schemas/tiles.defs.json`) and copy the
`tiles`/`upgrades` shape from a reference game with custom tiles (e.g.
`src/data/games/1858` or the local `1830.json`). Special/custom tiles use a `code`
string (label + city/town/path) exactly like 1822's `X`-tiles in `g_1822/map.rb`
(e.g. `city=revenue:40,slots:2;path=...;label=T`).

**1822 source.** `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/map.rb` —
`TILES` (line 7) is the count basis; the `X`-tiles there (X1–X5, X20, X21, 405,
767–769) are the model for our special-city `code` format.

**Label → family map.**
- B-family (30/40/50/60): B = Corvium F17, Lavinia L11, Marsal R25, Alveem N13;
  K = Dunmael E20, Kaeldun K18; P = Pendrael J27.
- Capital-family (30/50/70/90): D = Draeven F29, H = Brekheim I36 (gray→100,
  4 slots), R = Varstgrad I44, V = Kalavar R21.
- Fixed gray (no upgrade family): Verantia H9 (ruins city, 4-slot, base 10),
  Litoria J3 (size-2). Kroddheim K36 (yellow, unlabeled) — classify in the tweak pass.

**Ruins dead-end tiles** = "metros" (PRD §6.2): a backward-arrow stub that adds
revenue to a route reaching it, boosting the adjacent ruins city. Yellow = +10;
green either raises to +20 (value) or adds a second +10 stub (branch). The **lay
rules** (which hexes, cost, ≥1 plain-track constraint on the 6 neighbors, the
emergent 2nd city) are **out of scope here** — tiles only.

**Normal city baseline** = 20/30/40 (y/g/b), standard 1822 tiles; special cities
sit one tier above. A few normal cities may reach gray via 1822's gray standard
tiles.

**Expect iteration.** The designer tunes by rendering — AC 7's tweak pass is
first-class, not cleanup.

## Validation

- `18dragon.json` loads in 18xxMaker (dev server http://localhost:3000, File >
  Open) with **no schema error/crash**, and the **tile sheet renders** with the
  standard, B-family, capital-family, and ruins tiles present.
- Special-city tiles show the designed revenues (B 30/40/50/60; capitals
  30/50/70/90, Brekheim gray 100) and slot counts (capitals 2→3, Brekheim →4).
- The 3 ruins tiles render (yellow dead-end +10; green +20; green +10/+10).
- Tile manifest doc lists every tile with quantity; counts sanity-checked against
  the labeled cities and the 6 ruins-metro hexes.

## References

- [Source: _artifacts/prd-game.md#6.2 ruins & metros], [Source: prd-game.md#11 components]
- [Source: /Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/map.rb] (`TILES`, `X`-tiles)
- [Source: /Users/earlmiles/Projects/18xx-maker/src/schemas/tiles.defs.json] (tiles schema)
- [Source: 18dragon.json] (map special-city labels B/D/H/K/P/R/V; Verantia H9)

## Work Log

### Model Used

### Completion Notes

### Files Changed
