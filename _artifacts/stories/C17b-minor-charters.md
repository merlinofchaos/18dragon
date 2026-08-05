# C17b: Minor charters (30)

- **ID:** C17b
- **Type:** content
- **Epics:** Companies, Game Components
- **Sprint:** sprint-11
- **Status:** done
- **Created:** 2026-08-04

## Story

As the designer,
I want the 30 minor charters rendered as small printable mats from
`companies.json` (via `cardkit`),
so that each minor has its compact play mat — number, name, start, permit, phase
chart, and any special power — ready to print.

## Locked design (mockup approved 2026-08-04)

Reference: the 1822-style minor charter. Confirmed via the mockup
(`docs/mockups/charter-mockup.html`, v3, minor mat).

## Acceptance Criteria

1. **30 minor charters**, one per minor in `companies.json`, at **152 × 76 mm
   (6 × 3 in, landscape)**, **serif**, coin glyph — much smaller than the major.
2. **Layout:**
   - **Number badge** (region-colored) with the minor's number (referred to by
     number in play). *(Badge color kept for now — may revisit.)*
   - **Spine name** (rotated) — the company name.
   - **"Starts at"** — home **city** + **bold** home hex.
   - **Phase chart** — compact Phase · Limit · # · Cost (coin) · Rust (phase-colored),
     same data as the major.
   - **PERMIT block** (cert-sized, right edge): region color, big **permit letter**
     (A/N/G/M/V), the word **PERMIT**, region name — so no separate permit paper is
     needed.
   - **No token row, no OR-actions list** (minors are deliberately minimal).
3. **Power strip** (bottom) **only on the two minors with a power** (#4 Corvium
   Bridge-Tile, #16 Brekheim Mountain-Discount) — the other 28 omit it.
4. **White home token** — minors have a single white marker (not drawn on the mat;
   referred to by number).
5. **Permit letter mapping:** Verantum→A, Caelimor→N, Gördum→G, Muravel→M,
   Varstova→V, colored by region hue.
6. Output: `tools/gen-charters.mjs` (same generator/kit as C17a) → `charters-minor.html`,
   print-ready (US Letter, multiple per sheet, crop guides). No `18dragon.json` wiring.

## Tasks / Subtasks

- [ ] Minor mat in `gen-charters.mjs`: number badge, spine, start, phase chart,
  PERMIT block (AC: 1, 2, 5)
- [ ] Power strip for #4 and #16 only (AC: 3)
- [ ] Print layout (several per sheet) + crop guides at 152×76 mm (AC: 6)
- [ ] Generate all 30; eyeball vs the mockup; publish an Artifact (AC: 1)

## Dev Notes

- **Data:** `companies.json` minors (number, name, region, home_city, hex, permit,
  power). Phase/train table shared with the major (from C17a's builder).
- **Reuse C17a's `gen-charters.mjs`** — the minor is the smaller variant; share the
  phase-table + coin helpers. Sequence C17a → C17b.
- **PERMIT block** foreshadows **C46** (the 5 permit-private backs use the same
  block) — keep the block a reusable component in `cardkit`.
- **Mockup is the spec:** `docs/mockups/charter-mockup.html` v3 (minor mat).

## Validation

- `charters-minor.html` shows 30 mats matching the mockup (number badge, spine,
  start, phase chart, PERMIT block; power only on #4/#16); prints within 152×76 mm.
  `companies.json` valid. Design review.

## References

- [Source: companies.json] (minors)
- [Source: docs/mockups/charter-mockup.html] (approved layout)
- [Source: tools/cardkit.mjs], [Source: docs/18xxmaker-cookbook.md#Printing cards]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Extended `tools/gen-charters.mjs` to also emit **`charters-minor.html`**: 30 minor
  mats, **152×76mm**, US Letter portrait **3/page**, same print-cut layout as the
  majors (no border, crop marks). Generic `makePages()` now serves both sizes.
- Each mat: region-colored **number badge** · **spine name** · "Starts at" city +
  bold hex · compact **phase chart** · **PERMIT block** (region color + letter +
  "PERMIT" + region name). **Power strip** only on **#4** and **#16** (coin glyph in
  the text via `coinize`).
- Checks: 30 mats, 30 permit blocks, 2 power strips.
- Artifact: https://claude.ai/code/artifact/35fa7cbb-c5e7-408e-9837-a3351a1f9e83
- `18dragon.json` unchanged.

### Files Changed

- `tools/gen-charters.mjs` — added minor mats + generic page layout; emits both files.
- `charters-minor.html` (new) — generated minor charters.
