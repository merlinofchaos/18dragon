# Sprint 09: Train cards (+ finish the privates)

- **Status:** complete
- **Created:** 2026-07-29
- **Goal:** The train deck is a printable **cut-and-play deck** — all physical
  copies of **L/2 (two-sided), 3, 4, 5, 6, 7, E** — rendered from a new
  **`trains.json`** master via the shared `cardkit`. The permanent/prize trains
  (**2P/LP/5P/P+**) are rendered onto their **private card backs**, fully finishing
  the privates.

## Committed stories

View of `sprints.sprint-09.stories` in `sprint-status.yaml` (canonical). **2 points.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C26 | Train cards — trains.json master + printable deck (+ perm-train private backs) | content | 2 | ✅ done |

## Scope notes

**Why now (designer choice).** Trains are simple, the roster already exists, and
finishing them **unblocks the perm-train private backs** — so the privates close
out completely. Reuses the C42 card generator + the cookbook print recipe +
`cardkit` (coin glyph).

**Roster = base 1822 (verified).** `18dragon.json` `trains` matches 1822 exactly
(L, 2, 3, 4, 5, 6, 7, E, 2P, LP, 5P, P+). "Verify roster" is essentially done.

**Deck vs private-backs (designer, 2026-07-29):**
- **Deck cards:** L/2, 3, 4, 5, 6, 7, E — **all physical copies** (22 L/2, 9×3,
  6×4, 3×5, 3×6, 20×7, 20×E ≈ 83 cards).
- **Only as private backs:** 2P (→P2/P3), LP (→P4), 5P (→P1), P+ (→P29/P30) —
  quantities match the privates exactly, so they are the private reverses, not
  deck cards.

**Card layout (from the designer's reference photo):** size numeral upper-left
(black outline, **phase-colored**: L/2 yellow · 3/4 green · 5/6 brown · 7/E gray);
**cost** upper-right (coin glyph via `cardkit`); train image center (blank for
now); bottom banner **"RUSTED BY n"** tinted by the *rusting* train's phase color,
or gold **"PERMANENT"**. L card notes "upgrades to 2 for +60".

**Two-sided L/2 (the gotcha).** One physical card: **L on the front, 2 on the
back** (22 copies). Handled via the duplex machinery; other deck cards get a
uniform simple back (so duplex prints cleanly).

**Output:** a new `tools/gen-train-cards.mjs` (reusing `cardkit`) → `train-cards.html`
(US Letter landscape duplex, same print recipe). Plus wire the perm-train faces
onto the private generator's perm-train backs (P1/P2/P3/P4 + P29/P30 Pullman art).

**Deferred / out of scope:** train *images* (post-playtest, like private art);
pro bleed (C44); the board/market/tiles/companies tracks.

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM). -->

## Retrospective

**Outcome: goal fully met.** C26 done — the train deck (83 cards, L/2 two-sided,
3–E self-backed) renders from `trains.json`, and the 6 perm-train private backs now
show real trains, closing out the privates.

### What went well

- **Sprint-8 investments paid off immediately.** The `cardkit` shared module (coin
  glyph + train-face renderer + phase palette) and the cookbook print recipe made
  trains fast; the `trains.json` master mirrored `privates.json` cleanly. Building
  the coin as a reusable currency glyph (mid-sprint) means costs/prose across all
  future cards get it for free.
- **The 2-sided machinery generalized** from privates → the L/2 train and the
  perm-train private backs with no new plumbing.

### What didn't

- Nothing counted as a failure. The card iterations (coin-as-glyph, banner pill,
  no placeholder, 3–E backs, 80gp upgrade) were normal design-by-seeing review —
  same accepted stance as sprint 8.

### Lessons / workflow adjustments

- **Affirmed — no workflow change** (consistent with the sprint-8 call). Review-driven
  refinement is the process working.
- **Capture (standing cookbook rule):** added a `cardkit` pointer to
  `docs/18xxmaker-cookbook.md` § Printing cards, so the next card stories
  (C17 charters, C25 certs, C19 misc) reuse the coin glyph, train faces, and palette
  rather than rebuilding them.

### Action items

- **Rulebook divergence to record (C06/C23):** L→2 upgrade is **80gp** in 18Dragon
  (1822 = 60).
- **Carry-forward (unchanged):** C44 pro per-card bleed; the `BACK_OFFSET` duplex
  nudge; both low-priority.
- **Next sprint candidate:** the companies track — **C03 (10 majors) + C04 (30
  minors)** — the design chunk that unblocks charters (C17), certs (C25), and
  stickers (C24).
