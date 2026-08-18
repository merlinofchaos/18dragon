# C16: Board furniture — round tracker + player chart on the map

- **ID:** C16
- **Type:** content
- **Epics:** World & Map, Game Components
- **Sprint:** sprint-15
- **Status:** done
- **Created:** 2026-08-17

## Story

As the designer,
I want the board-furniture charts placed on the 18Dragon map — the SR/OR1/MR/OR2/MR
round-marker ring and the player-count chart (cert limit / starting capital / bank)
— in open board space,
so that the printed board shows the round order and the per-player-count setup at
the table (phase details stay on the separate Phases reference chart).

## Acceptance Criteria

1. **Round tracker placed on the map.** Add `map.roundTracker` to `18dragon.json`
   with `"type": "round"` (circular layout) and an `x`/`y` position in open board
   space (sea / a map corner) that **does not overlap hexes, cities, terrain, or
   labels**.
2. **Shows the C20 sequence.** The ring renders the top-level `rounds` markers —
   post-C20 that is **SR, OR1, MR, OR2, MR** with their colors (SR white, OR1
   green, MR blue, OR2 brown, MR blue). *(Depends on C20 landing first.)*
3. **Placed by seeing.** Position is tuned via the render-and-inspect loop
   (`bin/render-map.mjs`), not guessed — the rendered ring sits cleanly in empty
   space and reads clearly. The designer reviews the render and adjusts.
4. **Phase info NOT on the map.** No phase-progression strip is drawn on the board
   (that would be a fork/dev change, deliberately out of scope) — phase details
   remain on 18xxMaker's separate Phases chart (`Phase.jsx`).
5. **Loads/renders clean.** `18dragon.json` still loads in 18xxMaker with no schema
   error; with the round-tracker map display enabled, the map renders the ring.
6. **Player chart placed on the map.** Add `map.players` (a `{x, y}` placement)
   rendering the per-player-count chart from the top-level `players` array —
   number of players, cert limit, starting capital, and bank — in open board space,
   no overlaps. *(Displays the current `players` values, which are still 1822 base
   pending 18Dragon balance review — placement doesn't require finalizing them.)*

## Tasks / Subtasks

- [ ] Add `map.roundTracker: { "type": "round", "x": <n>, "y": <n> }` to
  `18dragon.json` (AC: 1)
- [ ] Render the map (`bin/render-map.mjs 18dragon`) and iterate `x`/`y` until the
  ring sits in clean open space, not over any hex/label (AC: 1, 3)
- [ ] Confirm the ring shows SR/OR1/MR/OR2/MR in the right colors (requires C20
  done) (AC: 2)
- [ ] Verify no schema error and the map renders with the round-tracker display on
  (AC: 5)
- [ ] Add `map.players: { "x": <n>, "y": <n> }`; render and place the chart in
  open space (grouped with the round tracker), verify all rows show (AC: 6)
- [ ] Present the render for the designer's placement review (AC: 3, 6)

## Dev Notes

**Rendering mechanism.** `map.roundTracker` drives `MapRoundTracker.jsx` →
`RoundTracker.jsx`. Fields: `type` (`"row"` | `"col"` | `"round"`), `x`, `y`
(map-coordinate units; `MapRoundTracker` applies `x*scale + 50`), optional
`rotation`. `"round"` lays the markers in a ring (see `src/data/games/1858.json`,
`1861.json` for placement examples). Each marker is a `Token` labelled with the
round `name` in its `color`.

**Rendering caveat (viewer config).** `MapRoundTracker` returns null unless
`config.maps.roundTracker` is enabled in the 18xxMaker viewer (a display toggle,
not a game-file field). The verification render must have it on; the physical board
export likewise needs it enabled. Not a `18dragon.json` concern, but note it so the
tracker isn't mistaken for "not rendering."

**Placement is design-by-seeing.** The 18Dragon map is large (5 regions + the
Verantum island + surrounding sea). Pick an open sea area or corner with no hexes;
tune `x`/`y` against the actual render (workflow rule: render at adequate
resolution and verify — don't guess coordinates). Circular layout is compact and
suits a small empty pocket.

**Dependency.** Sequenced after **C20** (which adds the MR entries to `rounds`);
if C16 is worked before C20 lands, the ring will only show SR/OR1/OR2.

**Scope.** Round tracker only. A phase-progression track drawn on the board is not
native (no map phase component) and was deliberately deferred (designer's call,
2026-08-17) — phase info stays on the Phases chart.

## Validation

- `18dragon.json` loads in 18xxMaker (File > Open) with **no schema error**; with
  the round-tracker map display enabled, the **circular round tracker renders** in
  open board space showing SR/OR1/MR/OR2/MR.
- The rendered ring overlaps no hex, city, terrain, or label (verified from an
  actual map render, not by coordinate reasoning).

## References

- [Source: _artifacts/prd-game.md#5.4 round structure]
- [Source: /Users/earlmiles/Projects/18xx-maker/src/components/map/MapRoundTracker.jsx],
  [Source: .../src/components/RoundTracker.jsx]
- [Source: /Users/earlmiles/Projects/18xx-maker/src/data/games/1858.json] (roundTracker "round" example)
- [Source: 18dragon.json] (`map`, `rounds`) · depends on **C20**

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Added `map.roundTracker: { "type": "round", "x": 265, "y": 1775 }` to
  `18dragon.json`. Renders a circular ring in the **open blank space at the lower-
  left**, **centered over the player chart** so the two form a tidy left-aligned
  cluster (designer's final placement).
- **Coordinate math:** `mapWidth = 150` → `scale = 1`, so tracker svg-center =
  `(x+50, y+50)` = viewBox **(315, 1825)** in the 3775×2611 map space (315 = the
  player chart's horizontal center; row-N band y≈1825). Ring ≈ 250 units
  (marketTokenSize 50). Placed by the render-and-inspect loop, not guessed:
  top-band (y=100) → N2 (x=150) → centered over the chart (x=265), each verified.
- **All circles white** (designer dropped per-round colors — they didn't match
  play reality). **Reads SR → OR1 → MR → OR2 → MR** clockwise. *Correct order
  required fixing the `rounds` array
  order in C20* — a `"round"` tracker draws arrows in array order, so the original
  reverse order ran the ring backwards; forward order `[SR, OR1, MR, OR2, MR]`
  (matching 1861) fixed it. CLAUDE.md § `rounds` updated.
- **Verified:** JSON valid; map renders on the dev server (:3000) with **no console
  errors**; ring sits in clean open space overlapping no hex/city/label (confirmed
  from an actual render, tight crop).
- **Rendering caveat (unchanged):** the tracker shows only when
  `config.maps.roundTracker` is enabled (defaults `true`; a viewer toggle, not a
  game-file field).
- **Player chart** added: `map.players: { "x": 10, "y": 2000 }` (via `MapPlayers.jsx`)
  — a ~390×150-unit chart in the lower-left blank area **below the round tracker**,
  grouping the two board-furniture elements. Renders all four rows from the
  `players` array + top-level `bank`: player counts **3–6**, cert limit
  **16/16/16/13**, starting capital **375/375/375/300gp**, bank **12,000gp**.
  Gated by `config.maps.players` (default true). **Enlarged ~2×** per the designer
  for table legibility: `cellWidth 120, rowHeight 60, fontSize 30`.
- **Corrected the `players` data** while placing the chart (designer flagged the
  stale values): the file still had **1822 base** (2–7 players, cert 40→11, cash
  1000→300). Replaced with 18Dragon's own **3–6 player** values from **PRD §2 /
  §6.3** — cert 16/16/16/13, cash 375/375/375/300 (18Dragon is a 3–6p game;
  majors scale 6/8/10/10). Dropped the 2- and 7-player rows. Resolves the CLAUDE.md
  "verify players cert limits/capital" TODO. Values remain provisional pending
  playtest (PRD §7).
- **Verified:** JSON valid; both charts render on the dev server with no console
  errors; both sit in clean lower-left blank space, no overlaps (confirmed from an
  actual render).
- **Designer signed off** (2026-08-17): ring centered over the enlarged chart in
  the lower-left cluster — "done with this one."

### Files Changed

- `18dragon.json` — `map.roundTracker` (circular, x 265 / y 1775, centered over the
  chart) and `map.players` (x 10 / y 2000; cellWidth 120 / rowHeight 60 / fontSize
  30, ~2×) — plus the top-level `players` array corrected to 18Dragon 3–6p values.
  *(rounds array order/color changes recorded under C20.)*
- `CLAUDE.md` — "Players: 2–7" → "3–6"; players cert-limit/capital TODO checked off.
