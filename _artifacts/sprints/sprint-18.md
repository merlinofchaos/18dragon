# Sprint 18: Signature mechanics — specs the rulebook is written from

- **Status:** complete
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
| 1 | C06 | Document 18Dragon divergences from 1822 | content | 2 | done |
| 2 | C07 | Specify the region-permit mechanic | content | 2 | done |
| 3 | C08 | Specify Verantum ruins/metro value system | content | 3 | done |
| 4 | C13 | Specify the merger mechanic (rules writeup) | content | 3 | done |
| 5 | C14 | Resolve PRD open questions (§9) | content | 1 | done |

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

*(2026-08-20. Blame-free, systems-focused.)*

**Outcome: goal fully met.** All 5 stories `done` (11 points). The signature mechanics
are fully specified — the 1822 divergences catalog (`docs/divergences-from-1822.md`) and
the three mechanics (permits/ruins/mergers) in `docs/signature-mechanics.md` — and §9 is
closed except a deliberately-deferred play-length target. The rulebook (C22/C23) now has
a complete, accurate substrate.

### What went well

- **The rulebook-walk method (C06).** Diffing the *actual* `1822_Rules.pdf` and PNW PDFs
  section-by-section with the designer produced a grounded catalog with **nothing
  invented** — every entry confirmed or corrected live. Having the real rulebooks on hand
  was the enabler; the baseline-per-entry `[1822]`/`[PNW]`/`[new]` tagging kept the hybrid
  honest.
- **The combined capture doc.** One `docs/signature-mechanics.md`, one section per
  mechanic (C07/C08/C13 each appended). Reframing it mid-sprint as a **staging doc feeding
  the rulebook** (not a polished deliverable) right-sized the effort.
- **Sequencing held.** C06 as the framing diff; the §9 questions **owned by** C08/C13
  rather than gated through a separate C14 — so C14 was genuine trivial closure, exactly
  as planned.
- **The work fixed real errors and simplified.** Killed the PRD "choices round" myth;
  corrected the 1D-vs-2D market + nine-par-value facts; turned the "≥1 plain track" rule
  into the (correct) emergent consequence; and the Verantum ruins system came out **far
  simpler** than the PRD implied (only the metro is a special tile).

### What didn't

- **C06 finalized in review, not first pass.** Another agent substantially revised it
  (par values, effective-bank math, game-end trigger precedence). All correct/improving —
  but the trigger was that the first-pass §1.6 was written from the PRD/memory (1822's six
  par values) instead of the game file (PNW's nine). A verify-against-data step would have
  caught it at authoring.
- **Cross-doc consistency surfaced late.** The P21 dit→city power vs C08's "dits don't
  upgrade" (resolved as a deliberate exception), and the stale `CLAUDE.md` "1822 is 1D"
  line — separate sources (docs / `data/` / `CLAUDE.md`) drift without a check.

### Lessons / workflow adjustments

- **Verify stated numbers against the game file / data masters while authoring (real
  change).** Added a bullet to the `agile-content` skill's step 3: when a doc states
  concrete values (par values, counts, costs), read them from `18dragon.json` / `data/*`
  during authoring — the PRD and memory drift. Directly from the C06 par-value slip.
- **Affirmed keepers:** walk the primary source (the actual rulebook) section-by-section
  with the designer for consolidation/spec stories; keep a mechanics **capture** doc
  distinct from the eventual rulebook so effort stays right-sized; let open-question owners
  (the mechanic stories) resolve them inline rather than gating a separate closure story.

### Action items

- **Done in the retro:** corrected the `CLAUDE.md` market note (1822 is 2D; 18Dragon uses
  PNW's 1D) and the par-values line (18Dragon's nine PNW values); added the
  `agile-content` verify-against-data note.
- **Carried:** target **play length** stays open (§9) — to be set from playtest, not
  guessed. A currency **display** swap to a ducat name/glyph on components is available as
  a future propagation story if ever wanted (not needed now).
