# Sprint 16: Card decks — one size, print together

- **Status:** complete
- **Created:** 2026-08-17
- **Goal:** The card decks — certs, trains, privates — are all **67×44mm** and
  **print together** on shared US-Letter sheets to kill wasted pages, handling the
  single-sided (certs) vs double-sided (trains/privates) mix. Misc cards are
  authored to join the shared print.

## Committed stories

View of `sprints.sprint-16.stories` in `sprint-status.yaml` (canonical). **10 points.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C48 | Resize cert deck to 67×44 (adapt existing design) | content | 2 | done |
| 2 | C49 | Unified card-deck printing — certs + trains + privates | content | 5 | done |
| 3 | C19 | Player-order cards | content | 3 | done |
| 4 | C50 | Redesign train + private card faces (mockup-driven) | content | 5 | done |

*(C50 pulled in mid-sprint 2026-08-17 — see In-flight changes.)*

## Scope notes

**Why now (from the sprint-15 retro pivot):** the C18 board mat exposed that
`gen-certs.mjs` makes certs at **89×55** while privates, trains, and the bid-box
centers are all **67×44**. All cards must match. And the designer wants the decks
to **print together** to stop wasting pages. So this batch gets the decks
consistent and consolidated *before* C19's misc cards are authored (so they can
join the shared print).

**Sequencing:** C48 → C49 → C19.
1. **C48 — resize certs.** `gen-certs.mjs` 89×55 → 67×44 + new grid. The cert
   *design* is liked (mockup-driven), so **adapt it down**, not a redesign. Prereq
   for C49.
2. **C49 — unified printing.** Lay certs + trains + privates (all 67×44) on combined
   sheets. Handle **single-sided (certs) vs double-sided (trains/privates)** — e.g.
   group all fronts then all backs, certs contribute a blank back (or fill those
   slots). Likely a shared `cardkit` pagination. Uses **current** train/private art.
3. **C19 — player-order cards.** The 6 player-order cards (portrait 44×67, number
   front / uniform back), generated from the approved mockup; joins the shared
   print set. ("Reference cards" were dropped — an unneeded assumption; no such deck.)

**Deliberately out of scope:** **C50** (mockup-driven train/private face *redesign*)
— "unify now, improve the look later" (designer, 2026-08-17). The unified sheets
re-render after C50 lands.

**Source of truth:** card size = **67×44** (`gen-private-cards.mjs` /
`gen-train-cards.mjs`).

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM). -->

- **2026-08-17 — C50 pulled into the sprint (designer).** With C48/C49/C19 done and
  the C50 mockups already designed and signed off, the designer chose to implement
  C50 now rather than defer it. Points: 5. The earlier "C50 deliberately deferred"
  note below is superseded. Task is implementation-only (mockups are the spec).

## Retrospective

*(2026-08-18. Blame-free, systems-focused.)*

**Outcome: goal fully met, and exceeded.** All four stories `done`. The decks are one
size (67×44) and print together (`print/cards-single.html` + `print/cards-duplex.html`),
and **C50 — the face redesign explicitly deferred at planning — was pulled in mid-sprint
and finished too.** 10 committed points + C50's 5 = 15 delivered.

### What went well

- **Mockup-first paid off hard.** C50's private/train faces were already mocked and
  signed off, so implementation was mostly mechanical (fold the CSS/markup in, verify).
  This is exactly the sprint-15 lesson working as intended — the biggest, riskiest-
  looking story became the smoothest because the design was settled first.
- **The C49 architecture composed cleanly.** Exporting each deck's faces + guarding the
  generators' file-writes meant C50's face swap and C19's player-order pooling slotted
  in without fighting each other — one generator, three card types, one document.
- **A consistent print/cut principle landed across every deck:** crop-marks-only (no
  card-edge borders), bleed-symmetric gradients. It started as a one-off note and is now
  uniform — certs, trains, privates, player-order all cut the same safe way.
- **Course-corrections were cheap and healthy.** C19 losing its "reference" half,
  C19 going portrait→landscape to match the family, C50 getting pulled forward, the
  gradient/border tuning — all designer-driven refinements that the mockup-first +
  modular-generator setup absorbed without drama. This is design-by-seeing working, not
  process slipping.

### What didn't

- Nothing that got in the way of shipping. The `print/` directory accumulated a few
  superseded files across the batch (old per-deck decks, the combined board-mat); tidied
  in one deliberate end-of-sprint cleanup pass (segments moved to
  `print/board-mat-segments/`, standalone previews redirected to a gitignored `preview/`,
  board mat merged to a single `board-mat.pdf`). Normal batch hygiene, not a snag.

### Lessons / workflow adjustments

- **No workflow change — affirming what works.** The friction this sprint was normal
  design iteration, not process getting in the way, so no adjustment is earned (a change
  that isn't earned can make things worse). **Keep doing:** mockup-first for visual
  components; the export-faces + guarded-write generator pattern; verifying every deck at
  true size before calling it done; and the crop-marks-only / bleed-symmetric print
  principle as the default for all printed components.

### Action items

- None required — all stories `done`, nothing slipped, no process fix outstanding.
