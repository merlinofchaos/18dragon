# Sprint 03: Caelimor (region N) laid out

- **Status:** complete
- **Created:** 2026-07-27
- **Completed:** 2026-07-27
- **Goal:** Caelimor (region N, the leftmost/NW mainland region) is laid out on the board — its hexes with N permit letters, terrain (with costs), dits, and cities (capital Draeven, some special-tiled). Placed incrementally; the full 5-region map skeleton stays deferred.

## Committed stories

View of `sprints.sprint-03.stories` in `sprint-status.yaml` (canonical). All
`stub` — flesh each with `agile-story` before building. **8 points total.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C29 | Caelimor (N) — hexes & permit letters (region footprint) | content | 3 | ✅ done |
| 2 | C30 | Caelimor (N) — terrain & dits | content | 2 | ✅ done |
| 3 | C31 | Caelimor (N) — cities (Draeven + special tiles) | content | 3 | ✅ done |

**Outcome: 3/3 done.** Caelimor (region N) is fully laid out east of the island —
56 hexes with N permits, coastline + bridge tie-in, river + graded hills (custom
icons), 6 named dits, 9 named cities, minor homes 7–12, and a region-boundary border.
In-session extras: custom hill terrain icons (fork), the region-border feature (with
a named-color gotcha found), and Draeven's yellow capital tile.

## Scope notes

**Why these together.** First mainland region. Caelimor (N) is the **leftmost/NW**
region (world-bible: coastal/plains, Celtic-ish, capital **Draeven**). Building it
end-to-end proves the per-region workflow before the other three mainland regions.

**Finer split (designer choice):** unlike the pre-drafted island, Caelimor is built
from scratch, so geography is split — **C29** (hexes + the region footprint + N
permit letters) → **C30** (terrain with costs + dits) → **C31** (cities, some with
special tiles). C29 first (everything sits on its hexes).

**Incremental placement (designer choice).** The current map is *only* the Verantum
island and fills the grid. Adding Caelimor means **expanding the hex grid**; we place
the leftmost region's footprint now and let the other regions fit around it later —
the full 5-region skeleton (backlog **C02**) stays deferred and may become redundant.

**⚠ First elicitation item for C29:** where Caelimor sits relative to the island,
how far the grid expands, and whether/how it connects to the island (the bridges at
F19/M12 are candidates). Draw this with the designer against the doodle map before
laying hexes.

**Deferred / out of scope:** the other mainland regions (D/E/S); company/minor
*rosters* (C03/C04) — C31 only places cities, not who homes there; the region-permit
*mechanic* rules (C07).

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM).
     Date · what changed · why. Stories added/removed/re-scoped mid-sprint. -->

## Retrospective

### What went well

- **The Sprint-2 elicitation step paid off.** Front-loading the footprint (C29),
  terrain/dit plan (C30), and 9-city plan (C31) meant each story started from the
  designer's real intent — fewer cold-start surprises. The retro-2 change worked.
- **Scripted map-surgery scaled to a whole region** — Python generating 55+ hex
  groups is the only viable way to build a region; hand-editing wouldn't survive it.
- **Custom-SVG pipeline extended cleanly to terrain icons** (the hill icons).
- **Propose → render → iterate** kept steering the visual work well.

### What didn't

- **The `hex.borders` named-color gotcha cost ~an hour** — hex-coded borders render
  invisibly; found only after red / all-6-sides / named-color tests.
- **File reformatting** — `json.dump` surgeries flattened `18dragon.json` to one item
  per line and ballooned it, accepted mid-flight with no policy.
- **C31 sprawled** — a "cities" story absorbed hill icons (C30/dev), the whole
  region-border feature, and letter/value tuning. Inherent (retro-2), but pronounced.
- **Positioning was trial-and-error** — the label/value angle convention wasn't fully
  documented, so Draeven's D/30 took extra render cycles.

### Lessons / workflow adjustments (made real)

1. **Angle convention documented** — measured all 6 corners (0=bottom, CCW: 60=SW,
   120=NW, 180=N, 240=NE, 300=SE) + the formula, in `docs/18xxmaker-cookbook.md`. No
   more guessing.
2. **File-format policy** — `18dragon.json` is now declared **script-managed** in the
   cookbook (accept `json.dump` reformatting; generate per-hex groups via script).
3. **Cookbook gotchas** — `hex.borders` needs *named* colors (not hex codes); custom
   terrain icons via `src/data/icons/`.
4. *(Considered but not adopted: logging mid-story features in In-flight changes —
   designer opted out; sprawl stays inherent.)*

### Action items

- [x] Document the angle convention (cookbook).
- [x] Declare `18dragon.json` script-managed (cookbook).
- [x] Record border named-color + terrain-icon gotchas (cookbook).
- [ ] **Next sprint:** Gördum (region D, mountains — center-north, capital Brekheim),
      built east/around Caelimor. Split geo (hexes/terrain) + cities per the pattern.
