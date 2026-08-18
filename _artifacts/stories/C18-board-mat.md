# C18: Combined board mat — stock market + bid boxes

- **ID:** C18
- **Type:** content
- **Epics:** Game Components
- **Sprint:** sprint-15
- **Status:** done
- **Created:** 2026-08-17

## Story

As the designer,
I want a single printed **board mat** that holds the **1D stock market** and the
**bid boxes** together,
so that the auction and share-price play area is one physical table piece — the
places where minor/private certs go up for bid and where share prices track.

## Acceptance Criteria

1. **Printed board mat in `print/`** (generated, HTML → print), combining the
   stock market and the bid boxes. **Sized for letter-paper printing as hinged
   segments:** at most **2 segments**, each fitting within **7 × 9.5 in**
   (printable area after margins + cutting room), designed so the two abut/**hinge**
   into one mat at the table.
2. **Stock market** rendered from `18dragon.json`'s `stock` section: the **1D**
   flat market (28 cells, `40 … 180`), **par cells** flagged, and the **par value**
   options (`50, 55, 60, 65, 70, 75, 80, 90, 100`). Displays the current market data
   as-is *(verifying those values against the PRD is **C21**, separate — the mat
   just renders them).*
3. **Bid boxes — 4 minor + 3 private** (1822 counts, the 3 concession boxes
   dropped). Each box is a **perimeter bid-price track** (20 positions, **+5**
   increments) wrapping a **center cert slot**, per the designer's references
   `samples/minorbidboxexample.jpg` and `samples/privatebidboxexample.jpg`:
   - **Minor boxes:** perimeter track **100 → 195**, the **100 start corner
     highlighted** (dark).
   - **Private boxes:** perimeter track **0 → 95**, the **0 start corner
     highlighted** (dark).
   - Center holds the minor/private **cert** (label placeholder in the ref); a
     colored **cube** marks the current high bid, riding the track. No printed bid
     tokens — bids are plain cubes.
4. **Seeding indicators:** the **opener private (5P)** seeds **private bid box 1**
   at game start — shown/labelled on that box. The **minor-from-bidbox 200gp**
   acquisition (phase 5+) is noted near the minor boxes.
5. **Auction rules out of scope.** Only the physical layout + the "opener in box 1"
   seeding is shown; the auction *refresh / bidding-order / bid-resolution* rules
   are the **rules track** (rulebook C22/C23), per the privates docs. Don't bake
   rules text beyond the two seeding notes.
6. **Loads/prints clean.** Generator runs no-arg (`data/`/`18dragon.json` →
   `print/`), output opens/prints without layout breakage; box slots are sized for
   the actual cert dimensions.

## Tasks / Subtasks

- [x] Lay the mat out across **≤2 letter segments (each ≤7×9.5 in)** that hinge —
  e.g. one segment the 4 minor boxes, the other the 3 private boxes + market strip;
  balance so nothing exceeds a segment (AC: 1)
- [x] Render the **1D market strip** from `stock` (cells, par-cell styling, par
  values row) — direct HTML is simplest for a flat strip (AC: 2)
- [x] Draw the **7 bid boxes** (4 minor + 3 private) as **perimeter bid tracks**
  (+5 steps) around a center cert slot — minor 100→195, private 0→95, start corner
  highlighted; match the sample refs. Drop concession boxes (AC: 3)
- [x] Add the **opener→private-box-1** seed marker and the **200gp minor-acquire**
  note (AC: 4)
- [x] Wire a generator (`tools/gen-board-mat.mjs`, cardkit conventions) writing to
  `print/`; run it, verify the sheet renders/prints cleanly (AC: 1, 6)
- [x] Confirm slot sizes vs the actual cert size (cross-check the cert generator)
  (AC: 6)

## Dev Notes

**Re-scope (designer, 2026-08-17).** Originally "bid boxes" standalone; the designer
chose to **fold the bid boxes into a combined board mat with the stock market**
(one printed sheet we generate). So C18 is now that mat, not just the boxes.
**Proposed re-point: 3 → 5** (adds the market rendering). *(Not the 18xxMaker board
— that has no bid-box support and would need a D-story.)*

**1822 bid-box structure** (`g_1822/game.rb`): `BIDDING_BOX_MINOR_COUNT = 4`,
`BIDDING_BOX_PRIVATE_COUNT = 3`, concession boxes (3) removed for 18Dragon.
`MINOR_BIDBOX_PRICE = 200`. Bids are colored cubes: `BIDDING_TOKENS` per player
(3–6p: 6/5/4/3), `BIDDING_TOKENS_PER_ACTION = 3` — a rules fact, not a component.

**Market rendering.** Direct HTML (designer's call): the 1D market is a flat strip
(par cells styled; par-values as a small row). No headless 18xxMaker reuse.
- **Width caution:** 28 cells in a single horizontal row is too wide for a 7-in
  segment (~0.25 in/cell max). Expect to **wrap the market into 2 rows**, run it
  **vertically**, or place it along the hinge — settle by seeing at print size.

**Print format (hard constraint).** The designer prints on **letter** paper. Target
**2 hinged segments**, each within **7 × 9.5 in** printable area (margins + cutting
room). Ideally exactly 2. Use `@page`/CSS so each segment lands on its own sheet at
1:1 scale (no browser fit-to-page shrink) — verify by measuring a print/PDF, not
just on-screen.

**Relationship to C21.** C21 (finalize/verify stock market vs PRD) is the *data*
check; this mat *renders* that data. Ideally C21 lands first (or re-render the mat
after), but the mat isn't blocked — it shows current values.

**Deliverable form.** New generator in `tools/` reading `18dragon.json` (`stock`)
+ the fixed bid-box structure, writing a committed sheet to `print/` (e.g.
`print/board-mat.html`) — same pattern as `gen-charters.mjs` / `cardkit.mjs`.

## Validation

- Generator runs no-arg and writes the mat to `print/`; the sheet opens and prints
  with no layout breakage.
- Market strip matches `18dragon.json` `stock` (28 cells, par cells, par values);
  7 bid boxes present (4 minor + 3 private), opener→box-1 and 200gp notes shown.
- Bid-box slots sized for the real cert dimensions.

## References

- [Source: _artifacts/prd-game.md#5.2 Auction & bidbox], [#4.3 opener private]
- [Source: /Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/game.rb]
  (`BIDDING_BOX_*`, `MINOR_BIDBOX_PRICE`, `BIDDING_TOKENS`)
- [Source: 18dragon.json] (`stock` — 1D market + par values)
- [Source: docs/privates-roster.md] (opener seeds box 1; auction refresh = rules track)
- [Source: tools/gen-charters.mjs, tools/cardkit.mjs] (generator pattern)
- [Reference: samples/minorbidboxexample.jpg, samples/privatebidboxexample.jpg]
  (designer's bid-box design — perimeter bid track + center cert slot)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

*(Design evolved substantially during a mockup-driven review — the final differs
from the initial draft.)*

- **New generator `tools/gen-board-mat.mjs`**: a **476 × 240.4 mm** continuous
  hinged board, output as a combined preview (`print/board-mat.html`) **and 3
  single-page files** `print/board-mat-{1,2,3}.html` (one segment each). Reads the
  market from `18dragon.json` `stock`; bid-box structure fixed.
- **Board layout (designer-specified):** market strip on top, **4 minor bidboxes**
  (2 mm gaps) centered in the middle, **3 private bidboxes** centered on the bottom.
  Market (476 mm) is the widest band → board width; **3 segments ≈159 mm (6.25 in)
  wide × 240 mm (9.5 in) tall**, each fits a Letter sheet.
- **Bid box = the approved design** (see `docs/mockups/*-bidbox-mockup.html`): a
  **7×5 perimeter bid track** (+5) facing **outward**, start corner (100/0) in a
  **white disc on a black cell**, wrapping a **card-sized center**. **Card = the
  67×44 mm cert** (landscape) + 1 mm gap = **69×46 opening**; box = **100.2 × 77.2 mm**.
  Center labelled **MINOR/PRIVATE COMPANY n** at 40 pt. Private box = minor box with
  values **−100** (0→95).
  - **⚠ Card-size correction (root cause of a cascade):** first built around an
    **89×55** center because that's what `gen-certs.mjs` produced — but the real
    cert is **67×44** (matching privates/trains). That inflated the whole mat
    (box 122×88, board 494×262). Corrected to 67×44 here; **gen-certs itself is
    wrong and deferred to a C25 fix** (see backlog).
- **Numbers:** embedded **Leftfield Serif Regular** (`fonts/`, data-URI), **32 pt**
  (scaled down for the smaller cells). Rendered as **SVG `<text>`** for reliable
  glyph centering (`dy` + `transform-box:fill-box`); **per-position
  x/y/letter-spacing anchor table** (designer-tuned) since each edge/corner rotates
  differently.
- **Print sizing bug — fixed:** a stacked 3-page HTML scales to ~68 % in headless
  `page.pdf` **and** some browser prints. Fix: the **single-page files print at true
  size** — render each to its own PDF (`print/board-mat-{1,2,3}.pdf`, via headless
  Chrome `page.pdf` Letter/scale 1). The combined `board-mat.html` is preview only.
  Print CSS also scoped the preview grey bg + shadow to `@media screen`.
- **Market:** one long row of **28 cells, 17 mm wide × 80 mm tall** (fits a 15 mm
  token + room; ~6 stackable), values at **35 pt Leftfield Serif**. Per spec:
  **50 shaded muted red**, a **single red
  border** around the 50–100 group, a **yellow line** between 150 and 165, and the
  **600** cell light-blue with vertical **END GAME**. No par track (1822 doesn't
  record par).
- **Print:** each page = one segment centered on Letter with **3 mm bleed**
  (internal edges bleed into the neighbor's continuous artwork; outer edges bleed
  white) and **crop marks** at the four trim corners; segment label at the foot.
- **Verified:** generator runs no-arg; all 3 pages render clean at print size (no
  console errors), each showing the correct third with bleed + crop marks
  (Playwright screenshots).

### Open / deferred

- **Both optional annotations declined** (designer, 2026-08-17): no opener→box-1
  marker; no 200gp minor-from-bidbox note on the mat — the latter, if anywhere,
  belongs on the **phase chart** (already carried by the phase-5+ notes in
  `18dragon.json` and the charter `PHASES`). Mat stays clean.
- Market data is whatever `stock` holds; **C21** verifies those values (mat
  re-renders automatically after). **Card size = 67×44** across all decks; the
  `gen-certs.mjs` correction is **C48**.
- **Designer signed off** 2026-08-17 — "we can be done with this one."

### Files Changed

- `tools/gen-board-mat.mjs` (new) — the 3-segment board-mat generator
- `tools/mockup-minor-bidbox.mjs` (new) — standalone bid-box mockup (minor/private)
  used to dial in the design
- `docs/mockups/minor-bidbox-mockup.html`, `docs/mockups/private-bidbox-mockup.html`
  (new) — approved bid-box mockups
- `fonts/LeftfieldSerif-Regular.otf` (new asset) — the number/label font
- `print/board-mat.html` (preview) + `print/board-mat-{1,2,3}.{html,pdf}` (print,
  single-page, true size)
- `samples/{minor,private}bidboxexample.jpg` — designer's reference images (added)
