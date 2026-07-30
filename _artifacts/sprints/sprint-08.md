# Sprint 08: Privates roster (design doc)

- **Status:** active
- **Created:** 2026-07-29
- **Goal:** The full 30-private roster is captured as **design documentation** (`docs/`) — the 5 region-permit concessions, the bid-box-1 opener, the remaining privates (with sourced rules text), and player-count gates — from the designer's `author-privates.md` draft, **then produced as the rendered 2-sided cards** (C42). Roster stories are design-doc-first; C42 turns the finished roster into the card deliverable.

## Committed stories

View of `sprints.sprint-08.stories` in `sprint-status.yaml` (canonical). Flesh each
`stub` with `agile-story` before building. **12 points total (larger than the usual ~8 —
designer added the card-production story C42, and C11 was split into C11a+C11b mid-sprint).**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C05 | Define the 5 region permit privates | content | 2 | ✅ done |
| 2 | C10 | Define opener private (phlogiston / 5P / bid box 1) | content | 1 | ✅ done |
| 3 | C11a | Detail the 13 18Dragon-original privates (+ master P# numbering) | content | 2 | ready |
| 4 | C11b | Detail the 11 externally-sourced privates (PNW/1822CA text) | content | 2 | ready |
| 5 | C12 | Assign 4+/5+ player-count gates to privates | content | 2 | ✅ done |
| 6 | C43 | Canonical privates.json (custom-schema data master) | content | 1 | ✅ done |
| 7 | C42 | Produce the rendered private cards (2-sided, all 30) | content | 3 | ✅ done |

**C43 added mid-sprint** (designer request) — a tool-agnostic `privates.json` data
master; sprint is now **13 points** across 7 stories.

**C11 was split into C11a + C11b mid-sprint** (see In-flight changes) — sprint is now
**12 points** across 6 stories.

## Scope notes

**Why these together.** First non-map track. The designer's `author-privates.md` is a **complete
30-private roster** (matches the PRD target). Design stories capture it into `docs/` documentation —
**C05** the 5 permits, **C10** the opener (bid box 1), **C11a/C11b** the remaining 24 privates (original
vs externally-sourced), **C12** the player-count gates — and **C42** **produces the finished 2-sided
cards** from that roster. So the sprint takes privates end-to-end: design → rendered deliverable.

**Output: design doc first (designer choice).** Write a `docs/` roster (full rules text + sources +
bid-box/gate structure). **Do NOT wire `18dragon.json` `privates` this sprint** — that's a later
components pass. Deliverable docs go in `docs/`, never `_artifacts/`.

**Roster shape (from `author-privates.md`, 30 total):** 5 region permits · perm-5/perm-2×2/perm-L ·
2 bridges · Mining Troupe×2 + Dwarven Mining Troupe×2 · Wands Delivery · Phlogiston Mine ·
Phlogiston Car×2 · Merger Negotiations · Pullman×2 · Dit-removal×2 · Verantum Recolonization ·
Extra track lay · Station Token Swap · Brekheim Locomotive · Mail Contract×2.

**External text to source (not paraphrase):** several privates cite **PNW** (dit-removal, permanent
trains, extra track lay, mail contract) and **1822CA** (station token swap, Pullman). Pull exact text
from the 18xx engine source: `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822_pnw/` and
`g_1822_ca/`. Note deliberate divergences.

**Open design items to resolve with the designer:**
- **Bid-box structure** (1822-style ordered bid boxes) — how the 30 privates seed the boxes; which is
  the bid-box-1 opener (draft hints perm-5 / "5P").
- **Player-count gates (C12)** — which privates are added only at 4+/5+ players (the draft doesn't yet
  say). Ties to the modular/scaling design (PRD §6.3).
- A few privates have 18Dragon-specific text already (permits, bridges, Wands, Phlogiston, Mining
  Troupes, Verantum Recolonization, Brekheim Locomotive, Coal Mine) — capture verbatim + tidy.


**⚠ Card-rendering tool decision — owned by C42 (designer-raised 2026-07-29):** 1822-style privates
are information-dense and **two-sided** (a player-owned face + a company-owned face). It's **unresolved
whether 18xxMaker can render cards rich/2-sided enough**. C05/C10/C11/C12 are **design-doc-first** so
the finished roster reveals exactly how much each card carries; **C42 then picks the tool and produces
the cards** (18xxMaker if it suffices, else an alternative — possibly a `dev` spin-off if a new tool is
needed). C42 must start only after the roster doc is solid.

**Sequencing.** C05 (permits) → C10 (opener) → **C11a** (13 originals + master P# numbering) →
**C11b** (11 sourced privates) → C12 (gates, needs the full roster) → **C42 last** (needs the finished
roster + the tool decision). C11a defines the P1–P30 numbering the later stories reference; C11b pulls
exact PNW/1822CA text. **C42 is the remaining heavy production story** — if it balloons, split via
`agile-party`.

**Deferred / out of scope:** the 10 majors (C03) & 30 minors (C04) rosters; company charters/certs
(C17/C25); the permit *mechanic* rules (C07 — related but separate); bid-box *components* (C18).

## In-flight changes

- **2026-07-29 — C11 split into C11a + C11b.** After C05/C10, tallying the
  remainder showed C11 covered **24** privates (30 total − 5 permits − 1 opener) —
  too large for one reviewable unit. Split by *source of text*, which is the real
  work-difference: **C11a** = the **13 18Dragon-original** privates (bridges ×2,
  Mining Troupe ×2, Dwarven Mining ×2, Merger Negotiations, Phlogiston Mine,
  Phlogiston Car ×2, Wands Delivery, Verantum Recolonization, Brekheim Locomotive)
  — capture the designer's own draft text + tidy — **plus the master P1–P30
  numbering table**
  (needs the whole roster). **C11b** = the **11 externally-sourced** privates
  (perm-2 ×2, perm-L, Dit-removal ×2, Extra Track Lay, Mail Contract ×2, Station
  Token Swap, Pullman ×2) — pull exact PNW/1822CA text + note divergences.
  Re-pointed 3 → **2 + 2** (sprint 11 → **12** pts). Both stay in Sprint 8;
  sequence C11a → C11b. (Bid-box/numbering decisions: designer confirmed the P#
  ordering is proposed in C11a; bridge locations are M12/F19/R23.)

## Retrospective

<!-- Filled by agile-retro at sprint end. -->

### What went well

### What didn't

### Lessons / workflow adjustments

### Action items
