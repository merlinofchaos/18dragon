# Sprint 11: Company charters

- **Status:** complete
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
| 2 | C17b | Minor charters (30 — simpler) | content | 2 | ✅ done |

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

**Outcome: goal fully met.** C17a (10 major charters) + C17b (30 minor charters)
both done — `tools/gen-charters.mjs` emits both decks from `companies.json`.

### What went well

- **Mockup-first was the win.** Building a static HTML mockup and iterating it to
  approval *before* writing the generator let the designer shape size, orientation,
  token structure, the permit block, the region label, and the print-cut treatment
  through fast rounds — then the generator built cleanly in one pass. The designer
  explicitly values this approach.
- **`cardkit` + `companies.json` paid off again** — coin glyph/coinize reused; the
  master fed both charter types directly.
- **The C17a/C17b split** (by layout difference) held; a generic `makePages()` now
  serves both mat sizes.

### What didn't

- Nothing failed. Items that surfaced mid-mockup — majors have no fixed home hex
  (→ rotated region label), the token-count reconciliation, phase-note vs
  train-note — were all caught in the mockup/review loop. Process working.

### Lessons / workflow adjustments

- **Codified the mockup-first pattern (real change):** added a "Mockup-first for a
  new card/mat format" recipe to `docs/18xxmaker-cookbook.md` (build + approve a
  static mockup before the generator; save it in `docs/mockups/`). Also captured the
  print-cut layout notes there.

### Action items

- **Follow-ups already logged:** **C45** (auto company logos — replaces the
  abbrev-in-token placeholder), **C46** (permit-block backs on the 5 permit
  privates), **C47** (no-edge/bleed for the private + train card generators).
- **Provisional:** major **color palette** still pending the designer's final call
  at stickers (**C24**).
- **Next sprint candidates:** **C25** certificates · **C24** token stickers ·
  or the board mats (**C16/C18/C21**) + the board-size question.
