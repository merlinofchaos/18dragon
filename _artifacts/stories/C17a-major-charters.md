# C17a: Major charters (10)

- **ID:** C17a
- **Type:** content
- **Epics:** Companies, Game Components
- **Sprint:** sprint-11
- **Status:** done
- **Created:** 2026-08-04

## Story

As the designer,
I want the 10 major charters rendered as printable player mats from
`companies.json` (via `cardkit`),
so that each major has its play mat — tokens, destination, and the phase/OR
reference — ready to print.

## Locked design (mockup approved 2026-08-04)

Reference: the 1822-style major charter. Layout confirmed via the mockup
(`docs/mockups/charter-mockup.html`, v3).

## Acceptance Criteria

1. **10 major charters**, one per major in `companies.json`, at **178 × 127 mm
   (7 × 5 in, landscape)**, **serif** throughout, coin glyph for all costs.
2. **Header:** region-colored bar (the major's `colors.primary`), full **name** +
   the **abbreviation badge** (majors are called by abbrev).
3. **Token row:**
   - **Home** token (logo, **bold** home hex) · **Destination** token (**round**,
     **bold** destination hex).
   - **Available** ×4 — 🪙100 each.
   - **Exchange Tokens** ×3 — bracketed (filled by acquiring minors).
   - Token math: **home + 4 available + destination = the C03 "6"**; exchange (3)
     are separate. **Update `companies.json`** major `tokens` to
     `{ home:1, available:4, destination:1, exchange:3 }` (rename `regular`→
     `available`, add `exchange`).
4. **Trains table** (left): Phase · Limit · # · Cost (coin) · **Rust** (the train
   that rusts as the phase opens: L@3, 2@4, 3@6, 4@7; phase-colored) · Notes.
   Notes carry the **capitalisation** info (merger/incremental at 2, 50% + inc-cap
   at 5, full cap at 6); **no "permanent" tags**. Phase colors yellow/green/brown/
   gray. Data from `18dragon.json` trains/phases + `trains.json`.
5. **Treasury** (right): "Operating Round Actions" list, adapted to 18Dragon
   (new-yellow needs region permit; check-for-destination; place station 🪙100;
   **acquire a minor** — *not* "merge"; merging is its own phase; issue/redeem
   shares). Destination callout: **Home → Destination doubles the destination's
   value.**
6. **Logo placeholder:** the token shows the **abbrev** until auto-logos exist
   (**C45**). Wire real logos in when C45 lands.
7. Output: **`tools/gen-charters.mjs`** (reuses `cardkit`) → `charters-major.html`,
   print-ready (US Letter, `print-color-adjust`, crop guides). Page layout (1–2 per
   sheet) decided at build. No `18dragon.json` wiring.

## Tasks / Subtasks

- [ ] Update `companies.json` major `tokens` structure (available/exchange) (AC: 3)
- [ ] `gen-charters.mjs` major mat: header, token row, trains table, treasury (AC: 1–5)
- [ ] Phase/train data + phase-colored rust column (AC: 4)
- [ ] Print layout + crop guides at 178×127 mm (AC: 7)
- [ ] Generate all 10; eyeball vs the mockup; publish an Artifact for review (AC: 1)

## Dev Notes

- **Data:** `companies.json` majors (name, abbrev, colors, tokens, destination,
  region); `18dragon.json` phases + `trains.json` for the phase/train table (shared
  across all majors — same table on every charter).
- **`cardkit`:** coin glyph; add a shared phase-color palette + the trains-table
  builder if useful (minor charter C17b reuses it).
- **Mockup is the spec:** `docs/mockups/charter-mockup.html` v3 (major mat). Match it.
- Sequence: C17a first (sets the charter design), then **C17b** (minors).

## Validation

- `gen-charters.mjs` runs clean; `charters-major.html` shows 10 mats matching the
  mockup (sizes, tokens, tables, colors, coins); prints within the 178×127 mm card
  with bottom breathing room. `companies.json` valid. Design review.

## References

- [Source: companies.json] (majors), [Source: 18dragon.json] (phases/trains)
- [Source: docs/mockups/charter-mockup.html] (approved layout)
- [Source: docs/18xxmaker-cookbook.md#Printing cards], [Source: tools/cardkit.mjs]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Built `tools/gen-charters.mjs` (reuses `cardkit` coin) → `charters-major.html`:
  10 major mats, **178×127mm**, US Letter portrait **2/page** (5 pages),
  `print-color-adjust`. Matches the approved mockup.
- Updated `companies.json` major `tokens` → `{home:1, available:4, destination:1,
  exchange:3}` (+ schema note).
- Each mat: region-color header + name + abbrev badge · token row (home · dest
  (round, hex) · available ×4 @🪙100 · exchange ×3) · phase/trains table (phase +
  rust colored, cap notes) · Treasury OR-actions ("Acquire a minor") · destination
  ×2 callout.
- **Home hex resolved:** majors have **no fixed home hex** (formed by merger), so the
  Home token shows **"Home"** (no hex). The **charter region** is shown as a
  **rotated (CCW) region label** ("A Verantum", region-colored) left of the token
  pair. Destination keeps its hex.
- **Review tweaks applied:** print-cut layout (no border/rounded corners, 2 mats
  stacked+touching per Letter page, crop marks); OR-action → "new yellow requires
  region permit"; removed "doubles city revenue" from the E phase note (it's a train
  property, not a phase note).
- **Logo = abbrev placeholder** until C45 auto-logos.
- Artifact: https://claude.ai/code/artifact/cbe768cc-e80d-4549-901e-6a13f250810f
- `18dragon.json` unchanged.

### Files Changed

- `tools/gen-charters.mjs` (new) — charter generator (majors).
- `charters-major.html` (new) — generated major charters.
- `companies.json` — major `tokens` structure (available/exchange).
