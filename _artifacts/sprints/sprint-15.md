# Sprint 15: Remaining table pieces

- **Status:** complete
- **Created:** 2026-08-17
- **Goal:** The board's remaining printable table pieces are complete — the
  phase/round track, the bid boxes, the misc (player-order + reference) cards, and
  the Merger round in the rounds tracker — so the physical table setup is finished.

## Committed stories

View of `sprints.sprint-15.stories` in `sprint-status.yaml` (canonical). **11 points.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C20 | Add Merger round to the rounds tracker (JSON) | content | 1 | done |
| 2 | C16 | Board furniture — round tracker + player chart on the map | content | 2 | done |
| 3 | C18 | Combined board mat — stock market + bid boxes | content | 5 | done |
| 4 | C19 | Misc cards (player-order, reference) | content | 3 | stub |

## Scope notes

**Theme:** the physical components largely done (map, tiles, companies, charters,
certs, stickers, trains, privates), this sprint finishes the **remaining table
pieces** — the round/phase furniture and the loose cards — so a table is fully
set up.

**All four are `stub`s.** Each gets fleshed with `agile-story` first (where the
designer's mental model is elicited — bid-box layout, which reference cards, the
phase-track visual), then implemented with `agile-content`.

**Sequencing** (data before the components that display it):

1. **C20 — Merger round in the tracker.** Small JSON change to the top-level
   `rounds` tracker. **Not blocked by the merger mechanic (C13):** PRD §5.1 already
   fixes the round *placement* — a **Merger round after every Operating Round from
   phase 2 onward** (phase 1's single OR has none). C20 only places the round; the
   merger *resolution rules* are C13, out of scope. **Also clean up** the stale
   1822 `"Concessions may be converted"` phase notes in `18dragon.json` — they
   contradict the PRD (concessions removed, replaced by mergers).
2. **C16 — Phase/round track on the board.** The board furniture that displays the
   phase progression + the OR/MR round structure C20 encodes. Draws on the phases
   already in `18dragon.json` and PRD §5.1's round structure.
3. **C18 — Bid boxes.** 1822-inherited bid-box mechanic; content comes from the
   privates/minors roster already captured (sprint-08 privates, sprint-10
   companies). Design + component.
4. **C19 — Misc cards (player-order, reference).** Player-order card + a
   round/phase/turn-sequence reference. **Scope call deferred to the `agile-story`
   fleshing step** (designer's choice). A structural reference (turn order, round
   flow, market, trains) is buildable now; a full *rules-summary* card would depend
   on the undesigned permit (C07) and merger (C13) mechanics — flag at fleshing.

**Cross-track dependency check:** the only presupposed rule is the merger-round
*placement* for C20, which **is** designed (PRD §5.1). No committed story depends
on an undesigned rule. C19's rules-summary content is the one soft edge — scoped
away from undesigned mechanics at fleshing time.

**Deliberately out of scope:** the core undesigned mechanics (permit C07,
ruins/metro C08, merger C13), the rulebook (C22/C23), and print/art polish
(C44–C47). Those are later sprints; this one is the physical table furniture.

## In-flight changes

- **2026-08-17 · C16 scope broadened** — folded the **player-count chart**
  (cert limit / starting capital / bank, via `map.players`) into C16 alongside the
  round tracker, since it's the same board-furniture pattern and the `players` data
  already exists. Surfaced when the designer asked whether a ticket existed (it
  didn't). No points change.
- **2026-08-17 · C18 re-scoped & re-pointed (3→5)** — from standalone "bid boxes"
  to a **combined printed board mat** holding the **stock market + the 7 bid boxes**
  (designer's call). Bid boxes are 1822-style **perimeter bid-price tracks** (minor
  100→195, private 0→95, +5) around a center cert slot, per the designer's refs
  `samples/*bidboxexample.jpg`. Market drawn directly in HTML (not headless reuse).
  Print constraint: **≤2 hinged letter segments, each ≤7×9.5 in**. Sprint total
  9→11 pts. (C21 stock-market *data* verification stays separate in the backlog.)

## Retrospective

**Goal substantially met, then re-prioritized.** The round/phase furniture (C16
round tracker + player chart, C20 merger round) and the big bid-box/market **board
mat (C18)** all reached **done**. The 4th story, **C19 (misc cards), slipped** —
not from trouble but from a deliberate mid-sprint pivot: the designer stepped back
and decided the card decks (certs/trains/privates) should be consolidated and
print together *before* C19's misc cards are authored. So C19 moves to the new
card-decks sprint.

### What went well

- **Mockup-first produced quality.** The bid box was dialed in via a standalone
  `docs/mockups/` mockup (fast iteration on font, rotation, per-position anchors,
  the disc, the center) before touching the generator. It shows — and its absence
  on trains/privates is exactly why C50 exists.
- **C16 folded cleanly** (player chart added to the round tracker) and surfaced +
  fixed the stale `players` data (1822 base → 18Dragon 3–6p values).
- **Systematic root-causing** of two nasty board-mat bugs: the print "empty space"
  was isolated to a headless `page.pdf` **multi-page scaling** issue (single-page
  renders full-size) by bisecting configs; and the oversize board traced back to a
  wrong shared constant.

### What didn't

- **The 89×55 card-size cascade.** The bid-box center was built to hold an 89×55
  card because that's what `gen-certs.mjs` produced — but the real card is **67×44**
  (what privates/trains use). One wrong constant silently inflated the box (122×88)
  and the whole mat (494×262), and wasn't caught until the designer *printed and
  measured*. Large rework.
- **Board mat took heavy iteration** — partly inherent to design-by-seeing, but the
  cascade + the PDF-scaling detour stretched it well beyond its 5 points.
- **Print correctness was assumed from on-screen** for a while; the actual scaling
  only showed in the designer's physical print / the PDF raster.

### Lessons / workflow adjustments

1. **Cross-check shared dimensions against a single source of truth before building
   on them.** *(Codified in `workflow.md`.)* Card size, hex size, token size — when
   a new component reuses a dimension, verify it against the existing generators/
   masters, don't trust the first value you find. (Here: gen-certs' 89×55 vs
   privates/trains' 67×44.)
2. **Mockup-first for visual components.** *(Codified.)* For a new card/board visual,
   iterate a standalone `docs/mockups/` file first, then wire it into the generator.
3. **Verify print deliverables from an actual PDF at true size — and beware
   multi-page `page.pdf`.** *(Codified.)* On-screen ≠ print. A stacked multi-page
   HTML scales down in headless `page.pdf` and some browser prints; render
   **single-page** files for true-size output.

### Action items

- **[next sprint]** Card-decks sprint: **C48** (resize certs 67×44) → **C49**
  (unified printing, single+double-sided) → **C19** (misc cards). **C50** (train/
  private redesign) stays in backlog.
- **[C19]** slipped → moved back to `backlog`; will be pulled into the card sprint.
- **[carry]** the two declined mat annotations (opener marker, 200gp note) — the
  200gp already lives in the phase notes; nothing to do.
