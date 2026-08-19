# Sprint 18: Signature mechanics — specs the rulebook is written from

- **Status:** active
- **Created:** 2026-08-18
- **Goal:** The signature 18Dragon mechanics are **fully specified in `docs/`** —
  the 1822 divergences, the region-permit gate, the Verantum ruins/metro value
  system, and the merger mechanic — with every PRD §9 open question resolved. This
  is the design substrate the rulebook (C22/C23, a later sprint) gets authored from;
  no rulebook prose is written here.

## Committed stories

Stories pulled from the backlog for this execution batch. Canonical assignment is
in `sprint-status.yaml`. The table below is a **view** — the yaml wins on conflict.
**11 points.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C06 | Document 18Dragon divergences from 1822 | content | 2 | stub |
| 2 | C07 | Specify the region-permit mechanic | content | 2 | stub |
| 3 | C08 | Specify Verantum ruins/metro value system | content | 3 | stub |
| 4 | C13 | Specify the merger mechanic (rules writeup) | content | 3 | stub |
| 5 | C14 | Resolve PRD open questions (§9) | content | 1 | stub |

## Scope notes

**Why now (designer, 2026-08-18):** the physical components (map, companies,
charters, certs, cards, board mat, tiles, stickers, token STLs) are essentially
complete. The remaining spine is the **rules → rulebook** track, and the rulebook
(C23) can only be written once the signature mechanics it diffs against 1822 are
pinned. This sprint pins them. Deferred to a later sprint: **C09** (balance
targets — playtest-driven, better after the rules read), **C22/C23** (rulebook
authoring), and the component-polish tail (C44–C47, D09/D10).

**The §9 open questions are owned by these stories, not a separate gate.** The
Verantum open questions (metro value increments, special ruins tile-lay rules)
resolve *inside* C08; the merger open questions (exchange-token "other means", par
range for a merged major, whether the non-home hex is vacated) resolve *inside*
C13. **C14** is therefore the closure story: it mops up the general open questions
(currency name, target play length), confirms the mechanic-specific answers landed
in C07/C08/C13, and marks PRD §9 resolved. This batch is self-contained — no
dependency on an undesigned rule outside the sprint.

**Sequencing:** C06 → C07 → C08 → C13 → C14.
1. **C06 — divergences.** The framing doc: the 1822-diff baseline (no concessions,
   mergers, permits, modular scaling, round structure) consolidated from the PRD
   into a single `docs/` reference. Lowest design risk — mostly already decided;
   sets the container the others slot into.
2. **C07 — region permits.** PRD §6.1 is well-developed; a crisp writeup of the
   gate (new-yellow-only, permanent, minor/major/permit-private sources) plus any
   edge cases the designer wants nailed (e.g. permit interaction on Verantum).
3. **C08 — Verantum ruins/metro.** The heaviest design: resolve metro value
   increments and the special ruins tile-lay rules (§9 Verantum) — exact tiles,
   costs, and the conditions to found the emergent second city.
4. **C13 — mergers.** PRD §5.1 is detailed; resolve the §9 merger open questions
   (exchange-token unlocks, par range, non-home hex) and write the full mechanic.
5. **C14 — open-question closure.** General questions (currency, play length) +
   PRD §9 reconciliation.

**All five start as stubs** — each is fleshed with `agile-story` (eliciting the
designer's mental model) before `agile-content`. These are design-elicitation-heavy
(a lot lives only in the designer's head), so expect real back-and-forth per story;
the writeups are `docs/` prose + PRD updates, not `18dragon.json` edits.

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM).
     Date · what changed · why. Stories added/removed/re-scoped mid-sprint. -->

## Retrospective

<!-- Filled by agile-retro at sprint end. -->

### What went well

### What didn't

### Lessons / workflow adjustments

### Action items
