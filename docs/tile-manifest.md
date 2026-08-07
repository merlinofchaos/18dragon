# 18Dragon — Tile Manifest

Generated from `18dragon.json` `tiles`; physical counts for the print sheet
(rendered by the D09 `bin/tile-sheet.mjs`). Double-dit tiles are omitted —
18Dragon has no double-dit hexes.

**Totals:** 60 types · 254 physical (198 standard + 56 custom).

## Standard track tiles (1822, minus double-dits)

| Tile | Qty |
|------|-----|
| 3 | 6 |
| 4 | 6 |
| 5 | 6 |
| 6 | 8 |
| 7 | 20 |
| 8 | 20 |
| 9 | 20 |
| 57 | 6 |
| 58 | 6 |
| 14 | 6 |
| 15 | 6 |
| 80 | 6 |
| 81 | 6 |
| 82 | 8 |
| 83 | 8 |
| 141 | 4 |
| 142 | 4 |
| 143 | 4 |
| 144 | 4 |
| 207 | 2 |
| 208 | 1 |
| 619 | 6 |
| 622 | 1 |
| 63 | 8 |
| 544 | 6 |
| 545 | 6 |
| 546 | 8 |
| 611 | 4 |
| 60 | 2 |

## Special-city tiles — numbered by letter (B01…H04)

Shared value tiers. B-family (B/K/P) 30/40/50/60; capitals (D/R/V) 30/50/70/90;
Brekheim (H) …/**100** gray. Slots: B-family 1→2→2→2, capitals 2→2→3→3, Brekheim →**4** gray.
Brown/gray = splat. Label = bold Arial, corner (angle 330). **First pass — slots/splat/placement tunable per tile.**

| Tile | Color | Letter | Value | Slots | Qty | Cities |
|------|-------|--------|-------|-------|-----|--------|
| B01 | yellow | B | 30 | 1 | 4 | Corvium, Lavinia, Marsal, Alveem |
| B02 | green | B | 40 | 2 | 4 | Corvium, Lavinia, Marsal, Alveem |
| B03 | brown | B | 50 | 2 | 4 | Corvium, Lavinia, Marsal, Alveem |
| B04 | gray | B | 60 | 2 | 4 | Corvium, Lavinia, Marsal, Alveem |
| K01 | yellow | K | 30 | 1 | 2 | Dunmael, Kaeldun |
| K02 | green | K | 40 | 2 | 2 | Dunmael, Kaeldun |
| K03 | brown | K | 50 | 2 | 2 | Dunmael, Kaeldun |
| K04 | gray | K | 60 | 2 | 2 | Dunmael, Kaeldun |
| P01 | yellow | P | 30 | 1 | 1 | Pendrael |
| P02 | green | P | 40 | 2 | 1 | Pendrael |
| P03 | brown | P | 50 | 2 | 1 | Pendrael |
| P04 | gray | P | 60 | 2 | 1 | Pendrael |
| D01 | yellow | D | 30 | 2 | 1 | Draeven |
| D02 | green | D | 50 | 2 | 1 | Draeven |
| D03 | brown | D | 70 | 3 | 1 | Draeven |
| D04 | gray | D | 90 | 3 | 1 | Draeven |
| R01 | yellow | R | 30 | 2 | 1 | Varstgrad |
| R02 | green | R | 50 | 2 | 1 | Varstgrad |
| R03 | brown | R | 70 | 3 | 1 | Varstgrad |
| R04 | gray | R | 90 | 3 | 1 | Varstgrad |
| V01 | yellow | V | 30 | 2 | 1 | Kalavar |
| V02 | green | V | 50 | 2 | 1 | Kalavar |
| V03 | brown | V | 70 | 3 | 1 | Kalavar |
| V04 | gray | V | 90 | 3 | 1 | Kalavar |
| H01 | yellow | H | 30 | 2 | 1 | Brekheim |
| H02 | green | H | 50 | 2 | 1 | Brekheim |
| H03 | brown | H | 70 | 3 | 1 | Brekheim |
| H04 | gray | H | 100 | 4 | 1 | Brekheim |

## Verantum ruins tiles — X01–X03 (letterless)

Dead-end 'metro' stubs boosting the ruins city (Verantia H9). **First pass — valued towns; backward-arrow dead-end visual needs a pass.**

| Tile | Color | Value(s) | Qty | Note |
|------|-------|----------|-----|------|
| X01 | yellow | +10 | 6 | single dead-end |
| X02 | green | +20 | 3 | value upgrade |
| X03 | green | +10/10 | 3 | adds a 2nd dead-end |

## Deferred / tweak-phase

- Ruins tile-lay **rules** (PRD §6.2, out of scope).
- Per-city slot/splat tuning; classify Kroddheim K36; ruins dead-end visual; `7/8/9` count (20).
