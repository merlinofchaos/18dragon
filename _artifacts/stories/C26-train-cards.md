# C26: Train cards — trains.json master + printable deck (+ perm-train private backs)

- **ID:** C26
- **Type:** content
- **Epics:** Game Components, Privates
- **Sprint:** sprint-09
- **Status:** ready
- **Created:** 2026-07-29

## Story

As the designer,
I want the train roster rendered as a printable cut-and-play deck (from a canonical
`trains.json`), with the two-sided L/2 handled and the permanent/prize trains put on
their private backs,
so that the trains are a finished component and the privates are fully closed out.

## Acceptance Criteria

1. **`trains.json`** master (repo root), like `privates.json`: all trains with card
   fields + a `deck` flag. Verified against `18dragon.json` / base-1822 roster.
   - **Deck** (`deck: true`): L (with a `back` = the 2), 3, 4, 5, 6, 7, E.
   - **Private-backs only** (`deck: false`): 2P (P2/P3), LP (P4), 5P (P1),
     P+ (P29/P30) — with the private id(s) they back.
2. **`tools/gen-train-cards.mjs`** (reuses `cardkit`) emits self-contained
   `train-cards.html`: **US Letter landscape, duplex**, same recipe as C42
   (crop marks, `print-color-adjust`, F/B interleave, long-edge → mirror rows).
3. **All physical copies** laid out: 22 L/2, 9×3, 6×4, 3×5, 3×6, 20×7, 20×E.
4. **Card face (per the designer's reference photo):**
   - **Size numeral** upper-left — big, **black outline**, filled by phase color:
     **L/2 yellow · 3/4 green · 5/6 brown · 7/E gray**.
   - **Cost** upper-right — **coin glyph** (`cardkit` `gp()`), e.g. 🪙200.
   - **Train image** center — **blank** for now (deferred, like private art).
   - Bottom banner: **"RUSTED BY n"** tinted by the **rusting train's phase color**
     (L→3 green, 2→4 green, 3→6 brown, 4→7 gray shown "7/E"), **or** a gold
     **"PERMANENT"** banner (5, 6, 7, E).
   - L card also notes **"upgrades to 2 for +60"** (small).
5. **Two-sided L/2:** one physical card, **L front / 2 back** (22 copies). Other
   deck cards get a **uniform simple back** so duplex prints cleanly.
6. **Finish the privates:** the private generator renders the **actual train face**
   on the perm-train backs — **P1 (5P), P2/P3 (2P), P4 (LP)** and the **Pullman
   privates P29/P30 (P+)** — replacing the current placeholder train back. Uses a
   shared train-face renderer (in `cardkit` or a shared module) so both generators
   agree.
7. Validation: both HTML files open, print correctly (colors, duplex, sizing), card
   counts correct; `privates.json`/`trains.json`/`18dragon.json` valid. Design review.

## Tasks / Subtasks

- [ ] Author `trains.json` (deck + private-back trains; L has `back`=2) (AC: 1)
- [ ] Add a shared **train-face renderer** to `cardkit` (numeral+outline+phase color,
  coin cost, rusted-by/permanent banner) (AC: 4)
- [ ] `tools/gen-train-cards.mjs`: paginate all copies, duplex sheets, L/2 two-sided,
  uniform back for the rest (AC: 2, 3, 5)
- [ ] Wire perm-train faces onto the private backs in `gen-private-cards.mjs`
  (P1/P2/P3/P4 + P29/P30) (AC: 6)
- [ ] Generate + eyeball both decks; verify counts + a duplex test (AC: 7)
- [ ] (Optional) publish `train-cards.html` as an Artifact for review

## Dev Notes

- **Roster (18dragon.json, = 1822):** L 60/rust3, 2 120/rust4 (variant of L), 3
  200/rust6, 4 300/rust7, 5 500 perm, 6 600 perm, 7 750 perm, E 1000 perm (variant
  of 7, doubles city revenue), 2P/LP/5P/P+ permanent (prize/private).
- **Phase-color tiers** differ from the private phase-chip (which only went to
  brown@5): trains use the 4-tier tile scale **yellow/green/brown/gray**. Keep the
  two mappings separate.
- **`cardkit` is the shared kit** (coin glyph today; add the train-face renderer +
  the phase-color palette here so privates' perm-train backs and the train deck
  render identically).
- **Uniform back** for non-L deck cards: a simple "18Dragon · Train" back (or plain)
  so the duplex sheet is consistent; only L's back differs (the 2).
- **P+ Pullman art** on P29/P30: the P+ is a permanent Pullman "+train"; render a
  simple P+ train face (matches the Pullman rules text on the front).

## Validation

- `node tools/gen-train-cards.mjs` + `node tools/gen-private-cards.mjs` run clean;
  `train-cards.html` shows all copies with correct phase colors, coin costs, and
  rusted-by/permanent banners; L/2 is two-sided; the private perm-train backs now
  show real trains. `trains.json` valid JSON. Design review with the designer.

## References

- [Source: 18dragon.json] (trains roster)
- [Source: CLAUDE.md] (1822 train roster table)
- [Source: privates.json] (perm-train → private mapping: P1/P2/P3/P4/P29/P30)
- [Source: docs/18xxmaker-cookbook.md#Printing cards]
- [Source: tools/cardkit.mjs] (shared coin glyph + train-face renderer)

## Work Log

### Model Used

### Completion Notes

### Files Changed
