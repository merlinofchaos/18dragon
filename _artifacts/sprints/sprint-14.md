# Sprint 14: Hex tile set + manifest

- **Status:** complete
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
| 1 | C15 | Define track tile set + tile manifest | content | 5 | done |
| 2 | D09 | Cameo Print & Cut hex-tile sheet renderer (reuse Tile.jsx headless) | dev | 5 | review |

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

**Goal met.** The full 18Dragon tile set is defined and renders in 18xxMaker
(**C15 → done**), and there's a working custom Cameo Print & Cut renderer that
reuses `Tile.jsx` headlessly and produced the 6 real sheets (**D09 → review**,
pending only the designer's physical cut test on the Silhouette). Both stories
came in on their committed scope; no slip.

### What went well

- **D09's architecture bet paid off.** Reusing 18xxMaker's own `Tile.jsx` via its
  `pnpm print` backbone (headless Playwright over the built site) meant we never
  re-drew track/city/label geometry. The **spike-first** move de-risked the one
  unknown (the `Tile.jsx → static SVG` bridge) before the big build — keep leading
  risky dev stories with a spike.
- **The two stories validated each other.** Rendering C15's *real* tiles through
  D09 proved both at once — and flushed out a D09 bug (`inventory()` read `count`,
  but 18xxMaker custom tiles use `quantity`, so every custom tile rendered 6×).
  Integration-testing the pair beat testing each in isolation.
- **The trihexagonal cut layout converged on a real constraint.** Iterating to
  color-blocks-with-seam-gaps + full bleed + merged-colinear straight cuts came
  directly from the physical requirement (long straight blade passes on chipboard).
- **Design-by-seeing worked once the tooling existed.** The per-family track/value/
  slot tweak pass (AC 7) went fast when the designer could refine against a real
  render.

### What didn't

- **Shipped visual defects and called them "clean."** The core failure: repeatedly
  presented tiles with visible letter/value/track overlap as good — judging from
  small, low-res sheet crops and underestimating atom widths (the `+N` badge is
  ~50 units). The designer had to catch each one. *"I don't like that you looked at
  them, saw the overlap, and called it good."*
- **Guessed map-label coordinates blind.** Moved city labels/names to invented
  coordinates (Kalavar's letter landed under the track) instead of rendering and
  placing by sight — a full round-trip wasted before a working map-render loop
  existed.
- **Output landed in `samples/` again.** The tiles first went to `samples/` rather
  than the committed `print/` — the same class of mistake as sprint-13's
  generator-output lesson, which existed but wasn't applied to a *rendered* (vs
  generated) deliverable.

### Lessons / workflow adjustments

1. **Verify visual output at adequate resolution before presenting; build a
   render-and-inspect loop instead of guessing coordinates.** *(Codified.)* Added a
   bullet to `workflow.md` § Component generation & review, and committed two
   reusable tools to the fork so the loop is standing, not rebuilt each time:
   `bin/render-tile.mjs` (one tile at 4×) and `bin/render-map.mjs` (full board +
   named-city pixel centers). Fork commit `5eee08d0`.
2. **The `print/` vs `samples/` rule applies to rendered deliverables too, not just
   `tools/` generators.** The existing bullet was framed around generators; the
   real deliverable was a *render*. The render-verify bullet now sits alongside it
   so "point at the committed path, verified" reads as one habit.
3. **Spike-first for risky dev stories — affirmed, keep doing it.** D09 is the
   model: isolate the one unknown, prove it, then build.

### Action items

- **[designer]** Physical **Silhouette cut test** of a `print/tiles/` sheet — the
  D09 acceptance gate. D09 stays `review` until it passes; then → `done`.
- **[deferred]** Ruins tile-**lay rules** (PRD §6.2: which hexes, cost, the ≥1
  plain-track constraint, the emergent 2nd city) — explicitly out of C15's scope
  (tiles only). Surfaces as its own rules story later.
- **[carry]** C15 tweak-phase leftovers noted in the story: some B/K/P cities'
  final slot counts, Kroddheim K36 classification, and `7/8/9` physical count
  (placeholder 20) — revisit at playtest.
