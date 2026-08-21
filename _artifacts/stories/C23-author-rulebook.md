# C23: Author the 18Dragon rulebook (1822-diff style)

- **ID:** C23
- **Type:** content
- **Epics:** Rulebook
- **Sprint:** sprint-19
- **Status:** in-progress
- **Created:** 2026-08-21

## Story

As the designer,
I want the full 18Dragon rulebook authored as `docs/rulebook.md` — a standalone book with
1822-differing rules highlighted in blue and a differences appendix — rendered through the
C54 pipeline,
so that 18Dragon has its headline player-facing deliverable.

## Acceptance Criteria

1. **`docs/rulebook.md`** is the complete standalone rulebook (replaces C54's stub):
   a reader needs no other book. Rules that differ from base 1822 are marked with the
   **delta convention** (`[text]{.delta}` / `::: {.delta}`) → **neutral blue**; a
   **Differences from 1822 appendix** (the C06 catalog, repurposed) lists them.
2. **Front matter:** title page; the **intro story** (`docs/intro-story.md`) as a narrative
   lead-in; a short "How to read this book" (explains the blue deltas + Mx/Px conventions);
   a components list.
3. **Body follows 1822 section order** (from the C22 base), **no standalone Verantum
   section** — Verantum folds in (designer, 2026-08-21):
   1. **Overview** — sequence of play, the map *(incl. a brief **Verantum Island** intro
      and the central **ruins city**)*, bank, the **1D stock market**, **setup** (3–6
      players, cash 375/375/375/300, cert 16/16/16/13, 4 bid cubes, 4 minor + 3 private
      boxes, opener in box 1).
   2. **Game Phases** — the phase table; train roster (base 1822).
   3. **Corporate Entities** — privates (incl. the 5 **permit privates**), 30 minors
      (home permits), 10 majors (region-associated); **concessions removed**.
   4. **Stock Rounds** — cert limit, loans, buy/sell, bidding (minors + privates);
      **major formation removed** (→ merger round).
   5. **Operating Rounds** — routes; **Lay Track** incl. the **permit gate** *and the
      **Verantum ruins tile-lays** (metro stubs 10gp, city 20gp, A-permit, committed
      once laid)*; **Running Trains** incl. destination doubling *and **metros raising a
      ruins city's value** (+10/+20/+10+10, hard cap 100) and the dead-end routing
      consequence*; earnings; trains; acquire-a-minor *(permit + exchange token)*.
   6. **Merger Round** — the full merger mechanic (C13): eligibility, choose the major,
      value/par/shares, tokens, president's-choice non-home hex, incremental cap.
   7. **Game End** — triggers + wealth calc (simpler: no concession/regional clauses).
4. **Sources woven in, not re-derived:** `reference/1822-rulebook.md` (C22 base, to
   paraphrase — **not copy verbatim**), `docs/divergences-from-1822.md` (the deltas),
   `docs/signature-mechanics.md` (permits/ruins/mergers). Numbers verified against
   `18dragon.json` / `data/*` (par values, counts, costs) per the agile-content rule.
5. **Rendered:** each section builds cleanly through `tools/gen-rulebook.mjs` into the
   2-column PDF + EPUB; deltas show blue; figures embed.
6. **Authored section-by-section with review** (see Tasks): author one subtask, render,
   show the designer the PDF pages, sign off, commit, next. Delta-heavy sections (3–6) get
   full review; mostly-inherited ones (1/2/7) lighter, per the designer.

## Tasks / Subtasks

*Each: author → render → designer review → commit. Then the next.*

- [ ] **Front matter** — title page; intro story lead-in (resolve the concession-flavor
  vs. no-concessions inconsistency, see Dev Notes); how-to-read; components (AC 2)
- [ ] **§1 Overview** — sequence, map + Verantum island/ruins-city intro, bank, 1D market,
  setup numbers (AC 3.1)
- [ ] **§2 Game Phases** — phase table + train roster (AC 3.2)
- [ ] **§3 Corporate Entities** — privates/minors/majors, concessions removed (AC 3.3)
- [ ] **§4 Stock Rounds** — bidding, major formation removed (AC 3.4)
- [ ] **§5 Operating Rounds** — lay track (permit gate + ruins tile-lays), running trains
  (metros/ruins-city value + routing), acquire-a-minor (AC 3.5)
- [ ] **§6 Merger Round** (AC 3.6)
- [ ] **§7 Game End** (AC 3.7)
- [ ] **Differences appendix** — repurpose the C06 catalog (AC 1)
- [ ] **Final pass** — full build (PDF + EPUB), TOC, cross-refs, consistent delta marking;
  commit the generated PDF/EPUB as the deliverable (AC 1, 5)

## Dev Notes

**Inputs (weave, don't re-derive):**
- `reference/1822-rulebook.md` — the base to **paraphrase** into our own words (keeps
  1822's verbatim text out of the shipped book).
- `docs/divergences-from-1822.md` — the delta list (what to mark blue); also the appendix
  source.
- `docs/signature-mechanics.md` — the full permit / ruins-metro / merger specs.
- `docs/intro-story.md` — the narrative lead-in.

**Delta convention (from C54):** `[changed]{.delta}` inline, `::: {.delta} … :::` block →
blue in PDF + EPUB. Mark every 1822-differing rule; inherited rules stay black.

**Verantum folded (designer, 2026-08-21):** no standalone section — ruins tile-lays go in
§5 Lay Track, metros/ruins-city value in §5 Running Trains, and a brief island + ruins-city
intro in §1's map. A reader finds ruins rules with the general rules of their kind.

**⚠️ Intro-story consistency:** `docs/intro-story.md` frames the economy with **concessions**
("a concession is granted… so it is floated"; "the kingdoms are granting concessions"), but
18Dragon has **no concessions** (mergers). Resolve when authoring the front matter — reword
toward flotation/mergers, or keep "concession" only as loose period-flavor, not mechanics.
Designer's call.

**Styling note (may need book.css tweaks in-flight):** the **intro story** likely reads
better **full-width single-column** (not the 2-column rules layout) — an `.intro`/`.story`
class. Small `book.css` additions are in scope here; larger figure work is C55.

**Not this story:** the render pipeline (C54, done) and the figures/worked examples (C55).
C23 may embed *existing* renders where handy; new diagrams are C55.

**Deliverable location:** `docs/rulebook.md` (source) → `docs/rulebook.pdf` + `.epub`
(committed deliverables). `docs/rulebook.html` stays gitignored.

## Validation

- `docs/rulebook.md` builds via `tools/gen-rulebook.mjs` into a complete 2-column PDF +
  EPUB: front matter (intro story), body §§1–7, differences appendix; deltas blue;
  numbers match `18dragon.json`. Designer signs off section-by-section, then on the whole.

## References

- [Source: reference/1822-rulebook.md] (C22 base — paraphrase)
- [Source: docs/divergences-from-1822.md] (deltas + appendix)
- [Source: docs/signature-mechanics.md] (permits/ruins/mergers)
- [Source: docs/intro-story.md] (narrative lead-in)
- [Source: _artifacts/prd-game.md#10.1 Rulebook]
- [Related: C54 (pipeline), C55 (figures)]

## Work Log

### Model Used

### Completion Notes

### Files Changed
