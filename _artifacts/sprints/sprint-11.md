# Sprint 11: Company charters

- **Status:** active
- **Created:** 2026-08-04
- **Goal:** The **major and minor charters** are rendered as printable player mats
  from **`companies.json`** (via `cardkit`) — token slots, share structure,
  destination, permit, and the two minor safety-valve powers — for all 10 majors
  and 30 minors.

## Committed stories

View of `sprints.sprint-11.stories` in `sprint-status.yaml` (canonical). Flesh with
`agile-story` before building. **4 points.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C17a | Major charters (10 — shares, 6 tokens, destination) | content | 2 | ✅ done |
| 2 | C17b | Minor charters (30 — simpler) | content | 2 | ready |

**C17 split into C17a + C17b at planning** (major vs minor layouts differ). Sequence
C17a → C17b (majors set the charter design; minors are the simpler variant).

## Scope notes

**Why now.** Companies (C03/C04) are defined, so their charters can be produced.
Reuses `cardkit` + the cookbook print recipe (same pipeline as privates/trains).

**Data = `companies.json`.** Charters render from the master (majors: abbrev, name,
colors, tokens, destination, region; minors: number, name, home city, permit,
power). No new company data — but the charter surfaces a few **undecided structural
bits** to settle at fleshing:
- **Major token costs** — majors have **6 tokens (home + 4 + destination)**, but the
  existing `tokenTypes` only cover 2–5 slots. The charter's token circles need costs.
- **Minor share/charter structure** — `shareTypes.default` is the major structure
  (President 20% + 8×10%); minors have **none defined**. What does a minor's charter
  show (single cert? 1 token? revenue box)?
- **Major vs minor layouts differ** — C17 **split into C17a (majors) + C17b (minors)**
  at planning.

**Output:** a `tools/gen-charters.mjs` generator (reusing `cardkit`) → charter
HTML, print-ready like the cards. Likely one charter per company (larger than a
card) — page/size layout decided at fleshing from the designer's reference.

**Deferred / out of scope:** certificates (C25), token stickers (C24), the 18dragon.json
company/logo map wiring, and the merger/share *mechanics* (rules track).

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM). -->

## Retrospective

<!-- Filled by agile-retro at sprint end. -->

### What went well

### What didn't

### Lessons / workflow adjustments

### Action items
