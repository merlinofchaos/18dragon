# Sprint 19: The rulebook — authored, rendered, illustrated

- **Status:** active
- **Created:** 2026-08-20
- **Goal:** Ship the **18Dragon rulebook** as a finished **PDF (+ EPUB)** that matches the
  original 1822 rulebook's quality — 2-column, with images and worked examples — authored
  the standard 1822-variant way (start from base 1822, mark every add/remove/change with a
  reference to the 1822 rule). Markdown source → HTML/CSS paged-media → PDF; Pandoc → EPUB.

## Committed stories

Canonical assignment is in `sprint-status.yaml`. The table below is a **view**. **21 points**
(≈2× a normal batch — a deliberately large sprint for the headline deliverable).

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C22 | Extract base 1822 rulebook (scaffold) | content | 3 | stub |
| 2 | C54 | Rulebook render pipeline (md → 2-col PDF + EPUB) | content | 5 | stub |
| 3 | C23 | Author 18Dragon rulebook (1822-diff style) | content | 8 | stub |
| 4 | C55 | Rulebook figures & worked examples | content | 5 | stub |

## Decisions (designer, 2026-08-20)

- **Source = Markdown** (repo-friendly, tool-agnostic, like `data/*.json`).
- **Render = HTML/CSS paged-media → PDF**, **Pandoc → EPUB**. Chosen over Typst/LaTeX to
  **reuse the house pipeline** (the project already renders HTML+CSS to print PDFs via
  `cardkit` / `gen-*.mjs` / `print/*.html`) and to **embed already-generated assets**
  (tiles via `Tile.jsx`, the map, board mat, cards) directly as figures.
- **Quality bar:** match the original `1822_Rules.pdf` — 2-column, color diagrams, worked
  examples.
- **Scope = the whole rulebook this sprint** (prose + pipeline + figures), accepted as a
  large batch.

## Scope notes

**Why now:** sprint-18 produced the entire substrate — `divergences-from-1822.md` (the
delta list in 1822-section order) and `signature-mechanics.md` (permits/ruins/mergers).
The rulebook is the headline deliverable (PRD §10.1) and everything it needs is captured.

**Sequencing:** C22 + C54 can start in parallel (scaffold and pipeline are independent),
then C23 (prose) into the pipeline, then C55 (figures) once the prose says which examples
are needed.
1. **C22 — base scaffold.** Extract/organize base 1822 (`1822_Rules.pdf`) into a `docs/`
   markdown scaffold: section structure + inherited rules, in C06's section order. Settle
   at fleshing how much base text to reproduce vs. reference.
2. **C54 — pipeline.** Markdown → HTML (2-column CSS paged-media) → PDF (headless
   Chrome/WeasyPrint) + Pandoc → EPUB. Prove it renders a styled 2-col page with an
   embedded figure early, so C23/C55 author into a real target. New `tools/` build.
3. **C23 — author the rulebook.** Mark every delta onto the C22 base with its 1822
   reference, weaving in `divergences-from-1822.md` + `signature-mechanics.md`. Largest
   deltas: concessions→mergers, permits, Verantum ruins, the 1D market, modular board,
   setup numbers. Output: `docs/rulebook.md`.
4. **C55 — figures & worked examples.** The hex diagrams, market/token illustrations, and
   worked examples (merger walkthrough, permit gate, ruins/metro, bidding). Reuse existing
   renders (map, tiles, board mat, cards) where possible; author new diagrams where not.

**Finish risk (flagged):** 21 points is ~2× a normal sprint. Sequenced so partial
completion still ships value — a rendered, figure-light rulebook (C22+C54+C23) is a
usable deliverable even if **C55 (figures) trails** into a follow-up. If it runs long,
C55 is the natural split point.

**Out of scope:** balance (C09), stock-market finalization (C21), component polish
(C44–C47), D09 sign-off.

**All four start as stubs** — each fleshed with `agile-story` before `agile-content`.
C22 is a `content` extraction and C54 is `content` build-tooling (a new `tools/` script,
not an 18xxMaker fork change, so it stays content-track like the other generators).

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM).
     Date · what changed · why. Stories added/removed/re-scoped mid-sprint. -->

## Retrospective

<!-- Filled by agile-retro at sprint end. -->

### What went well

### What didn't

### Lessons / workflow adjustments

### Action items
