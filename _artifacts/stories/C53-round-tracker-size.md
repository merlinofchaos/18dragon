# C53: Enlarge the map round tracker to fit the 12mm marker

- **ID:** C53
- **Type:** dev
- **Epics:** World & Map, Game Components
- **Sprint:** sprint-17
- **Status:** done
- **Created:** 2026-08-18

## Story

As the designer,
I want the round tracker on the map enlarged so the physical 12mm round-marker disc
(C52) fits on it,
so that the printed board holds the token piece it's meant to.

## Acceptance Criteria

1. **Fork `src/defaults.json`: `tokens.marketTokenSize` 50 → 90** (branch `18dragon`).
   The map round tracker (C16, `type: "round"`) reads its size from
   `config.tokens.marketTokenSize` (`MapRoundTracker.jsx:21`), and the marker renders at
   `size / 2` width. 90 → marker Ø **45**, i.e. **1.2× a station token** (Ø
   `stationTokenSize` = 37.5) — the honest render of 12mm vs 10mm physical.
2. **Render-verified** on the map: the round-tracker circles are visibly larger, still
   read as the SR/OR1/MR/OR2/MR ring near N2, and don't collide with the player chart
   (at `y:2000`) or the hexes. If spacing is tight, nudge `map.roundTracker.x/y` in
   `18dragon.json` (content) — position only, not size.
3. **Side effects acknowledged** — bumping the global also grows 18xxMaker's digital
   market tokens + the stock-market round tracker. Fine: 18Dragon uses the printed board
   mat, not those, and 12mm is the intended market-token size regardless (designer,
   2026-08-18).

## Tasks / Subtasks

- [x] `src/defaults.json` (fork, branch `18dragon`): `marketTokenSize` 50 → 90 (AC: 1)
- [x] Render the map (headless harness / dev server) and check the round-tracker size +
  spacing vs the player chart and hexes (AC: 2)
- [x] Nudge `map.roundTracker.y` + `map.players.y` in `18dragon.json` for balanced
  spacing (designer dialed in over several renders) (AC: 2)
- [x] Confirm the marker reads larger than a station token in the render (AC: 1)

## Dev Notes

**Why a fork change:** the round-tracker circle size isn't exposed in the game file —
`MapRoundTracker.jsx` hard-wires `size = config.tokens.marketTokenSize`. The designer
chose to bump that global default rather than add a per-tracker override.

**Value rationale:** `width = diameter` in `Token.jsx` (radius 25 at width 50). Station
tokens render at Ø `stationTokenSize` = 37.5; the round marker at `marketTokenSize / 2`.
For the physical 12:10 ratio, `marketTokenSize / 2 = 1.2 × 37.5 → marketTokenSize = 90`.
The exact physical fit is dialed against the *printed* board by the designer (the map's
mm-per-unit print scale isn't pinned); 90 is the render-honest start.

**Verify harness:** `18dragon.json` is symlinked into the fork at
`src/data/games/18dragon.json`; dev server on :3000. Screenshot the map round-tracker
region and compare the marker to a city station token.

## Validation

- Fork `src/defaults.json` `marketTokenSize` = 90 on branch `18dragon`; the map renders
  the round tracker with markers ~1.2× a station token, near N2, clear of the player
  chart and hexes. No console errors.

## References

- [Source: 18xx-maker `src/components/map/MapRoundTracker.jsx`] (size = marketTokenSize)
- [Source: 18xx-maker `src/components/RoundTracker.jsx`] (marker width = size/2)
- [Source: 18xx-maker `src/defaults.json`] (`tokens.marketTokenSize`)
- [Source: _artifacts/stories/C16-round-tracker-on-map.md] (the tracker this resizes)
- [Source: _artifacts/sprints/sprint-17.md] (token spec)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- **Fork `src/defaults.json` (branch `18dragon`): `tokens.marketTokenSize` 50 → 90.**
  The map round tracker reads its size from this, so the SR/OR/MR circles now render
  larger than the station tokens — sized to hold the 12mm round marker (station 10mm).
- **`18dragon.json` spacing, dialed in over several renders with the designer:**
  - `map.roundTracker.y` 1775 → **1945** (the bigger tracker needed repositioning; it
    sits in the empty lower-left with balanced space above to the hexes and below to
    the chart).
  - `map.players.y` 2000 → **2260** (chart pushed down: first for breathing room, then
    to open real clearance since the enlarged tracker is wedged between hexes + chart).
- **Verified** via the headless map render (dev server + symlinked game file): no
  console errors, tracker reads correctly, spacing designer-approved ("looking fine").
- **Side effect (accepted):** the global bump also enlarges 18xxMaker's digital market
  tokens + stock-market round tracker — fine, 18Dragon prints its own board mat.

### Files Changed

- **Fork** `/Users/earlmiles/Projects/18xx-maker/src/defaults.json` (branch `18dragon`)
  — `marketTokenSize` 50 → 90. *(Separate repo; commit on the `18dragon` branch.)*
- `18dragon.json` — `map.roundTracker.y` 1945, `map.players.y` 2260.
