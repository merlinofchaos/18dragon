# Sprint 16: Card decks — one size, print together

- **Status:** active
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
| 4 | C50 | Redesign train + private card faces (mockup-driven) | content | 5 | review |

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

<!-- Filled by agile-retro at sprint end. -->

### What went well

### What didn't

### Lessons / workflow adjustments

### Action items
