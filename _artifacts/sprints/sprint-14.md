# Sprint 14: Hex tile set + manifest

- **Status:** active
- **Created:** 2026-08-05
- **Goal:** The complete 18Dragon track-tile set is defined **and printable** —
  C15 captures the tiles (standard + special-city + ruins) as the
  `tiles`/`upgrades` of `18dragon.json` + a manifest; D09 makes them physical via a
  custom **Silhouette Cameo Print & Cut** renderer that reuses 18xxMaker's `Tile.jsx`
  art headlessly and owns the sheet / hex cut paths / registration output.

## Committed stories

View of `sprints.sprint-14.stories` in `sprint-status.yaml` (canonical). **10 points.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C15 | Define track tile set + tile manifest | content | 5 | ready |
| 2 | D09 | Cameo Print & Cut hex-tile sheet renderer (reuse Tile.jsx headless) | dev | 5 | ready |

## Scope notes

**One story, three tile families** (designer chose to keep C15 whole rather than
split a/b):

1. **Standard numbered track tiles** — inherit the 1822 manifest (`g_1822/map.rb`
   `TILES`): the ~35 standard yellow/green/brown/gray tiles (1,2,3,4,5,6,7,8,9,55,
   56,57,58,69,14,15,80–83,141–144,207,208,619,622,63,544–546,611,60). These are
   standard 18xxMaker tile defs referenced by name + count.
2. **Special capital/city upgrade tiles** — the map already declares **7 special
   city labels** (`B, D, H, K, P, R, V`) plus capital/fixed cities (Draeven F29,
   Kalavar R21, Kroddheim K36, Verantia H9, Litoria J3). Each labeled city needs a
   custom yellow→green→brown upgrade family (1822-X-tile style, `label=` matching),
   with 18Dragon revenue/slot progression. Some progression values need the
   designer's input during fleshing.
3. **Verantum ruins tiles** — the special ruins tile-lays for the ruins hexes
   (PRD §6.2).

**Counts:** start from the **1822 counts as-is**; revisit during playtest if the
340-hex board runs short (noted, not computed from the map this sprint).

**Deliverable form:** tiles are rendered **by 18xxMaker** (not a custom generator
like the cards) — the `tiles` + `upgrades` top-level sections of `18dragon.json`,
plus a manifest (quantities) in `docs/`. Validation = the game file still loads in
18xxMaker with the tile sheet rendering and no schema error.

**Dependency to resolve inside C15 (flagged, not blocking):** the **ruins
tile-lay rules are an undesigned PRD open question** (§6.2 / §9 — exact tiles,
costs, conditions). Per our workflow rule, an undesigned rule can't be silently
baked in. The designer chose to include ruins, so **C15's first task is to elicit
and record the ruins tile-lay rules** (and update PRD §6.2), converting the open
question into a decision *before* defining the ruins tiles. If that design proves
large, split it out to a rules story mid-sprint (agile-party course-correction).

**C15 is still a `stub`** — flesh it with `agile-story` first (which is also where
the special-city progressions and ruins rules get elicited from the designer),
then implement with `agile-content`.

**Printing (D09) — added mid-planning.** 18xxMaker's built-in tile output can't
feed the Silhouette Cameo: its `die`/`smallDie`/`Cutlines` path targets
pin-registered **cutting dies**, not the Cameo's camera-registered **Print & Cut**,
and it doesn't emit a clean cut-path `.svg`. Decision (with the designer): build a
**custom renderer that reuses `Tile.jsx` headlessly** (so we don't re-draw
track/city/label geometry) and owns the Cameo sheet — no-cut-zone placement, hex cut
paths, registration marks, and PNG + cut-SVG + combined output (the `stickers.py`
convention). Carries one unknown — the headless `Tile.jsx → static SVG` bridge — so
D09 leads with a **spike**; if the spike fails, stop and reconsider rather than
sliding into a full redraw.

**Sequencing:** C15 (tile defs) feeds D09 (renders them). D09's spike can start in
parallel on a sample tile, but D09's full run needs C15's tiles in `18dragon.json`.

**Deliberately out of scope:** the phase/round track (C16), board mats
(C16/C18/C21), misc cards (C19), the permit mechanic + rulebook (C07/C22/C23).

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM). -->

## Retrospective

<!-- Filled by agile-retro at sprint end. -->

### What went well

### What didn't

### Lessons / workflow adjustments

### Action items
