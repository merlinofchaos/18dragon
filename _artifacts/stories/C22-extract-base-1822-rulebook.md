# C22: Extract base 1822 rulebook (working scaffold)

- **ID:** C22
- **Type:** content
- **Epics:** Rulebook
- **Sprint:** sprint-19
- **Status:** done
- **Created:** 2026-08-20

## Story

As the designer,
I want the base 1822 rulebook's inherited-spine sections extracted into clean, structured
markdown as an internal working base,
so that C23 can paraphrase it into the standalone 18Dragon rulebook (marking the deltas)
without re-deriving the base rules from the PDF each time.

## Acceptance Criteria

1. **Deliverable:** a **gitignored** `reference/1822-rulebook.md` — a faithful markdown
   extraction of the base 1822 rulebook's **inherited spine**. Add `/reference/` to
   `.gitignore`. **Not** in `docs/` (that's ship-only), **not committed** — it holds
   verbatim 1822 text, which stays out of version control and out of the shipped PDF.
2. **Scope = inherited spine only:** 1822 **§§1–5** (Overview, Game Phases, Corporate
   Entities, Stock Rounds, Operating Rounds) and **§10** (Game End). **Exclude** the
   1822-only geography (§§6–9 London / Metropolitan / Channel / Merthyr Tydfil) and the
   expansion/scenarios (§§11–13) — 18Dragon doesn't adopt them (divergences doc "Not
   adopted").
3. **Structure preserves 1822's rule numbering.** Markdown headings per section and
   subsection (e.g. `## 5. Operating Rounds`, `### 5.7 Lay/Upgrade Track`) with the
   numbered rules (5.7.1, 5.7.2, …) intact, so C23 can reference "1822 §5.7.6" precisely
   when marking deltas.
4. **Cleaned of PDF artifacts.** Strip the extraction noise — worked-example diagram
   fragments (stray `£40` / company-abbrev tokens), column-break garble, page numbers,
   repeated headers. Keep the actual rule text and the phase table (§2) as a markdown
   table.
5. **Fit for purpose:** readable enough that C23 can paraphrase from it directly. It is a
   working base, not a polished doc — no need to reflow every example perfectly, but the
   rules must be complete and correctly attributed to their numbers.

## Tasks / Subtasks

- [x] Add `/reference/` to `.gitignore`; create `reference/` (AC: 1)
- [x] Extract 1822 §§1–5 + §10 from `~/Documents/18xx rulebooks/1822_Rules.pdf` via
  `pdftotext` (reading-order mode — cleaner than `-layout` for the 2-column book) (AC: 2)
- [x] Clean the extraction: drop EXAMPLE blocks + figure fragments, page numbers, header
  repeats; keep rule text; reconstruct the §1.7 setup + §2 phase tables (AC: 4)
- [x] Structure into markdown with section/subsection headings + preserved rule numbers
  (AC: 3)
- [x] Spot-check: all 6 sections present, numbering intact, no §§6–9/11–13 bleed-in (AC: 2, 3)

## Dev Notes

**C22 is mechanical extraction**, not authoring. The writing/paraphrasing + delta-marking
is C23.

**Shipped-rulebook shape (decided 2026-08-20 — context for C23, not built here):** the
18Dragon rulebook is a **full standalone rulebook** with **1822-differing rules
highlighted in a different text color** inline, **plus a differences appendix** (the C06
divergences content repurposed). C22 supplies the base that C23 rewrites; the verbatim
1822 text never reaches the shipped PDF.

**Why gitignored / not docs/ (designer, 2026-08-20):** the extraction is verbatim 1822
text — an internal authoring aid, kept out of version control and out of `docs/` (which is
ship-only). C23's output (paraphrased) is the shippable artifact.

**Extraction method:** `pdftotext -layout` works (proven during C06); the noise is the
worked-example figures interleaved in the columns (stray revenue values, company
abbreviations). Section page ranges (from the C06 TOC read): §1 ≈ pp2–4, §2 ≈ pp5–6, §3 ≈
pp7–8, §4 ≈ pp9–14, §5 ≈ pp15–24, §10 ≈ p28.

**Preserve rule numbers** — they're the anchor C23 uses to cite "the 1822 rule it
modifies" (PRD §10.1) and that the divergences doc already references (§5.7, §4.6–4.9,
etc.).

**Location:** `reference/` (new, gitignored). Not `docs/`, not `_artifacts/`.

## Validation

- `reference/1822-rulebook.md` exists and is gitignored (`git status` does not list it);
  contains 1822 §§1–5 + §10 as structured markdown with rule numbers preserved and
  example-noise removed; no §§6–9/11–13 content. Designer spot-check that it's a usable
  base for C23.

## References

- [Source: `~/Documents/18xx rulebooks/1822_Rules.pdf` §§1–5, §10]
- [Source: _artifacts/prd-game.md#10.1 Rulebook]
- [Source: docs/divergences-from-1822.md] (section order + the "Not adopted" list)
- [Related: C23 (authors the shipped rulebook from this base), C54 (render pipeline)]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

**Deliverable (gitignored, local-only):** `reference/1822-rulebook.md` — 1822 §§1–5 + §10
extracted to structured markdown. **6 sections, 42 subsections, 316 numbered rules**, ~14.6k
words. Rule numbers preserved (the anchors C23 cites); the §1.7 setup table and §2 phase
table reconstructed as markdown; §§6–9 and §§11–13 excluded.

**Method:** `pdftotext` in **reading-order mode** (cleaner than `-layout` for the 2-column
book — rule number then text). A cleanup script (`reference/_clean.py`, kept for regen)
structured headers/subsections/rules, preserved `•` bullets, and dropped EXAMPLE blocks +
figure fragments. Residual noise hand-fixed (a bidding-figure blob in §4.10.10, an example
fragment in §5.11.29). The two flattened tables were rebuilt by hand from the values
verified during C06.

**Not committed (by design):** `reference/` is gitignored — verbatim 1822 text stays out of
version control and out of the shipped PDF. Only the `.gitignore` change + this story +
status are committed. C23 (next) paraphrases this base into the shipped rulebook.

**Note for C23:** the base is a working aid, not polished — a few worked-example figures are
dropped (rules that referenced them still read fine), and the phase table was reconstructed
(cross-check against the prose §2.2 if a value looks off).

### Files Changed

- `reference/1822-rulebook.md` — **new, gitignored** (the extraction; not committed).
- `reference/_clean.py` — **new, gitignored** (regen script).
- `.gitignore` — add `/reference/`.
