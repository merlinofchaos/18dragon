# C49: Unified card-deck printing — certs + trains + privates

- **ID:** C49
- **Type:** content
- **Epics:** Game Components
- **Sprint:** sprint-16
- **Status:** done
- **Created:** 2026-08-17

## Story

As the designer,
I want certs, trains, and privates (all 67×44mm) pooled onto shared US-Letter
sheets by a single generator,
so that each deck's partial last page stops wasting paper and I print one
consolidated set.

## Acceptance Criteria

1. **One combined generator** (`tools/gen-cards.mjs`) reads `companies.json`,
   `privates.json`, `trains.json` and emits the pooled print deck to `print/`.
2. **Group by sidedness** (designer's call):
   - **Single-sided section — certs.** Pool **all** certs (90 major + 30 minor =
     120) onto single-sided sheets. At 12/page that's **exactly 10 sheets** (no
     partial page). No backs.
   - **Double-sided section — trains + privates.** Pool trains + privates onto
     shared **duplex** sheets (fronts + backs), using the existing recipe: pages
     interleaved **F1, B1, F2, B2 …**, back sheets **mirror rows** (landscape +
     long-edge binding). One front slot ↔ its back slot.
3. **Shared layout, everywhere** — US-Letter **landscape**, **3×4 = 12/page**,
   **67×44mm**, centered margins, the same print-cut crop marks (no card border).
4. **Reuse the existing faces** — cert faces (major president/regular, minor),
   private faces (player-owned front / company-owned or perm-train back), train
   faces (L two-sided; others uniform back). No visual redesign (C50 is separate);
   pull the current face-rendering so output matches today's decks.
5. **Quantities honored** — train copies per `trains.json`, 30 privates, cert
   counts (9/major + 30 minors). Perm/prize trains still ride on their private
   backs (not standalone).
6. **Prints clean at true size** — sheets open/print with safe margins; a duplex
   test aligns front↔back. *(Watch the multi-page `page.pdf` scaling gotcha — if a
   PDF is wanted, render true-size per the workflow rule.)*

## Tasks / Subtasks

- [x] Extract/borrow the face renderers: cert (`gen-certs`), private
  (`gen-private-cards`), train (`gen-train-cards`/`cardkit.trainFace`) (AC: 4)
- [x] Build `tools/gen-cards.mjs`: shared 67×44 landscape 3×4 grid + crop marks
  (lift from the existing generators) (AC: 1, 3)
- [x] **Single-sided section:** pool 120 certs → 10 sheets (AC: 2)
- [x] **Duplex section:** pool trains + privates → F/B interleaved, mirror rows
  (AC: 2)
- [x] Wire quantities from the masters; perm-trains stay on private backs (AC: 5)
- [x] Render/verify: cert sheet, a duplex front + its mirrored back align; safe
  margins; true-size (AC: 6)

## Dev Notes

**All three decks already share the recipe** (confirmed): landscape 3×4=12/page,
67×44, centered (~39mm side / ~20mm top-bottom margins), crop-mark print-cut.
Trains + privates use identical duplex: `MIRROR="rows"`, F1,B1,F2,B2 interleave
(`gen-private-cards.mjs`, `gen-train-cards.mjs`). C48 put certs on the same
landscape layout.

**Why group-by-sidedness (not full interleave):** certs have no back; putting them
on duplex sheets wastes the back slots. Grouping keeps certs single-sided (120 = 10
exact sheets, zero waste) and pools the doubles on duplex sheets — the page saving
comes from removing each deck's partial last page, cleanly.

**Reuse, don't re-draw:** import or copy the face functions so the pooled output is
pixel-identical to today's `certs-*`, `private-cards`, `train-cards`. The
train/private *look* is C50's problem, not this story.

**Output:** likely one `print/cards.html` (cert section then the duplex section) —
or split single vs duplex files if that prints more cleanly. Decide while building.

## Validation

- `node tools/gen-cards.mjs` runs no-arg; pooled sheets in `print/`.
- Certs = 10 single-sided sheets (120 cards); trains+privates on duplex sheets with
  fronts/backs aligned (mirror rows); all cards 67×44 with safe margins.
- Card faces match the current per-deck output.

## References

- [Source: tools/gen-certs.mjs, tools/gen-private-cards.mjs, tools/gen-train-cards.mjs]
- [Source: tools/cardkit.mjs] (`trainFace`, shared helpers)
- [Source: data/companies.json, data/privates.json, data/trains.json]
- [Source: _artifacts/sprints/sprint-16.md] (goal, group-by-sidedness decision)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- **One generator, two files** (`tools/gen-cards.mjs`), grouped by sidedness:
  - `print/cards-single.html` — all 120 certs (90 major + 30 minor) pooled →
    **exactly 10 single-sided sheets**, zero partial page. (Was 8 major + 3 minor =
    11 sheets across two files; saves a sheet and consolidates.)
  - `print/cards-duplex.html` — trains (83) + privates (30) = 113 pooled →
    **10 front + 10 back = 20 duplex sheets**, one duplex job. (Was trains 14 +
    privates 6 = 20 across two files; page-count is already optimal at 10 fronts,
    but the interior deck boundary no longer wastes a page — the train→private
    boundary now lands mid-page-7.)
- **Reuse, not redraw.** Refactored `gen-certs.mjs` and `gen-private-cards.mjs` to
  `export` their face functions + CSS + geometry helpers, guarding their file-writes
  with `process.argv[1] === fileURLToPath(import.meta.url)` so importing them is
  side-effect-free. `gen-cards.mjs` imports `majorCert`/`minorCert`/`makePages`/
  `CERT_STYLE`, `faceHtml`/`mirror`/`cropMarks`/`chunk`/`PER_PAGE`/`PRIVATE_STYLE`,
  and `cardkit.trainFace`. Output faces are pixel-identical to the per-deck decks.
- **Why two files, not one:** cert CSS and the trains/privates CSS collide on class
  names (`.band`, `.foot`, `.grid`). Splitting by sidedness into two documents
  sidesteps the collision cleanly; trains + privates already share CSS by design
  (private-cards already renders `trainFace` on perm-train backs).
- **Duplex correctness verified** (Playwright, true size): mirror-rows alignment is
  correct for landscape long-edge flip (front top row ↔ back bottom row); the
  perm/prize trains (2P/LP/5P/P+) ride on their private backs via the existing
  `backTrain` map (P29/P30 backs render **P+ Pullman**), not as standalone cards.
- **Standalone per-deck generators still work** (verified) — the refactor kept them
  runnable; the unified files are additive.
- **Crop-marks-only, no card borders** (designer, 2026-08-17): dropped the `0.2mm`
  `.card` border from the private + train CSS so every deck matches the cert deck —
  crop marks are the only cut guides, so a slightly inaccurate cut never leaves a
  line on a card edge. Applies to the unified *and* standalone private/train decks.

### Files Changed

- `tools/gen-cards.mjs` — **new** combined generator (single-sided certs +
  duplex trains/privates).
- `tools/gen-certs.mjs` — export `majorCert`/`minorCert`/`makePages`/`CERT_STYLE`;
  guard writes behind a run-directly check.
- `tools/gen-private-cards.mjs` — export `faceHtml`/`mirror`/`cropMarks`/`chunk`/
  `PER_PAGE`/`PRIVATE_STYLE`; guard writes behind a run-directly check.
- `print/cards-single.html`, `print/cards-duplex.html` — **new** pooled decks.
