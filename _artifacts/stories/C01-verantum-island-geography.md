# C01: Verantum island — geography (dits, ruins markers, terrain)

- **ID:** C01
- **Type:** content
- **Epics:** World & Map, Verantum
- **Sprint:** sprint-02
- **Status:** done
- **Created:** 2026-07-27

## Story

As the 18Dragon designer,
I want the Verantum island's terrain finished — dits, ruins markers, and offboard revenue,
so that the island geography is complete alongside its cities (C27) and bridges (C28).

## Acceptance Criteria

1. **Dits** placed at **H13, H15, G16** (nameless center-towns).
2. **Ruins markers** present on the ruins hexes (delivered in D07 + C27 — carried, no change).
3. **Atlanteum** offboard revenue set to **yellow 0 · green 10 · brown 50 · gray 60**.
4. `18dragon.json` loads in 18xxMaker with no schema error/crash; island renders; no console errors.
5. The island is intentionally **sparsely populated** — no further terrain/features this pass.

## Tasks / Subtasks

- [x] Pulled H13, H15, G16 out of the plain group; added dits as named `centerTowns` (AC: 1)
- [x] Named the dits: **Velia** (H13), **Larium** (H15), **Calvia** (G16) (AC: 1)
- [x] Updated Atlanteum `offBoardRevenue.revenues` to 0/10/50/60 (yellow/green/brown/gray) (AC: 3)
- [x] Added Verantia **$10** base value at the bottom hex point (designer request) (AC: 3)
- [x] Rendered in 18xxMaker; dits + revenue + value show, no console errors (AC: 4)

## Dev Notes

- Game file `18dragon.json`. Dits per designer (2026-07-27): H13, H15, G16 — all currently plain
  island hexes (keep the region-A "A" permit label).
- A **dit** = a nameless `centerTowns` entry (renders as a small town marker).
- Ruins markers/color were finalized in D07 (marker asset) and C27 (12-hex ruins cluster) — nothing
  to do here.
- Designer: island is sparse; no mountains/rivers/extra towns beyond the above.

## Validation

- `18dragon.json` loads; dits show at H13/H15/G16; Atlanteum shows 0/10/50/60; no console errors.

## References

- [Source: _artifacts/prd-game.md#6.2 Verantum island]
- [Source: _artifacts/stories/C27 (cities), C28 (bridges), D07 (ruins marker)]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Dits (3):** **Velia** (H13), **Larium** (H15), **Calvia** (G16) — named `centerTowns` on plain
  island hexes (each pulled into its own group so it can carry a distinct name). Latin/Roman per
  the Verantum world-bible. Values deferred (rules).
- **Atlanteum** offboard revenue set to **yellow 0 · green 10 · brown 50 · gray 60**.
- **Verantia base value $10** (designer request, in-session) — a `hex.values` entry positioned at
  the bottom hex point (`angle 0, percent 0.86`) to clear the tokens, 6-way track, name, and "A"
  permit. Note the value-angle convention here: `angle 0` = bottom, `180` = top.
- Ruins markers/cluster were already done (D07 + C27) — nothing to do.
- Island is intentionally sparse; no further terrain.
- Verified in-app throughout; JSON valid; no console errors.

### Files Changed

- `18dragon.json` `map.hexes` — 3 named dit groups (H13/H15/G16); Atlanteum revenues → 0/10/50/60;
  Verantia `values` = $10. Working file, not version-controlled.
