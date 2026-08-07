# 18Dragon — Tile Manifest

Generated from `18dragon.json` `tiles`. Physical tile counts for the
print sheet (rendered by 18xxMaker via `tools`/`bin/tile-sheet.mjs`).

**Totals:** 65 tile types · 259 physical tiles (203 standard + 56 custom).

## Standard track tiles (1822 manifest)

Inherited from 1822 (`g_1822/map.rb`), standard 18xxMaker defs. Counts as 1822; `7/8/9` set to a physical 20 (1822 = unlimited).

| Tile | Qty |
|------|-----|
| 1 | 1 |
| 2 | 1 |
| 3 | 6 |
| 4 | 6 |
| 5 | 6 |
| 6 | 8 |
| 7 | 20 |
| 8 | 20 |
| 9 | 20 |
| 55 | 1 |
| 56 | 1 |
| 57 | 6 |
| 58 | 6 |
| 69 | 1 |
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

## Special-city upgrade tiles (custom)

Shared value tiers by label. B-family (B/K/P) = 30/40/50/60 y/g/b/gray; capital-family (D/R/V) = 30/50/70/90; Brekheim (H) = 30/50/70/**100**. Slots: B-family 1→2→2→2, capitals 2→2→3→3, Brekheim →**4** at gray. Brown/gray = splat (6 legs). **First pass — slot counts / splat blocking to be tuned in the tweak phase.**

| Tile | Color | Label | Value | Slots | Qty | Cities |
|------|-------|-------|-------|-------|-----|--------|
| B-y | yellow | B | 30 | 1 | 4 | Corvium, Lavinia, Marsal, Alveem |
| B-g | green | B | 40 | 2 | 4 | Corvium, Lavinia, Marsal, Alveem |
| B-b | brown | B | 50 | 2 | 4 | Corvium, Lavinia, Marsal, Alveem |
| B-x | gray | B | 60 | 2 | 4 | Corvium, Lavinia, Marsal, Alveem |
| K-y | yellow | K | 30 | 1 | 2 | Dunmael, Kaeldun |
| K-g | green | K | 40 | 2 | 2 | Dunmael, Kaeldun |
| K-b | brown | K | 50 | 2 | 2 | Dunmael, Kaeldun |
| K-x | gray | K | 60 | 2 | 2 | Dunmael, Kaeldun |
| P-y | yellow | P | 30 | 1 | 1 | Pendrael |
| P-g | green | P | 40 | 2 | 1 | Pendrael |
| P-b | brown | P | 50 | 2 | 1 | Pendrael |
| P-x | gray | P | 60 | 2 | 1 | Pendrael |
| D-y | yellow | D | 30 | 2 | 1 | Draeven |
| D-g | green | D | 50 | 2 | 1 | Draeven |
| D-b | brown | D | 70 | 3 | 1 | Draeven |
| D-x | gray | D | 90 | 3 | 1 | Draeven |
| R-y | yellow | R | 30 | 2 | 1 | Varstgrad |
| R-g | green | R | 50 | 2 | 1 | Varstgrad |
| R-b | brown | R | 70 | 3 | 1 | Varstgrad |
| R-x | gray | R | 90 | 3 | 1 | Varstgrad |
| V-y | yellow | V | 30 | 2 | 1 | Kalavar |
| V-g | green | V | 50 | 2 | 1 | Kalavar |
| V-b | brown | V | 70 | 3 | 1 | Kalavar |
| V-x | gray | V | 90 | 3 | 1 | Kalavar |
| H-y | yellow | H | 30 | 2 | 1 | Brekheim |
| H-g | green | H | 50 | 2 | 1 | Brekheim |
| H-b | brown | H | 70 | 3 | 1 | Brekheim |
| H-x | gray | H | 100 | 4 | 1 | Brekheim |

## Verantum ruins tiles (custom)

Dead-end 'metro' stubs that boost the adjacent ruins city (Verantia H9). **First pass — modelled as valued towns; the 'backward-arrow' dead-end look needs a visual pass (D07-style).**

| Tile | Color | Value(s) | Qty | Note |
|------|-------|----------|-----|------|
| RUINS-y | yellow | +10 | 6 | single dead-end |
| RUINS-g1 | green | +20 | 3 | value upgrade of the stub |
| RUINS-g2 | green | +10 / +10 | 3 | adds a 2nd dead-end |

## Deferred

- Ruins tile-lay **rules** (when/where/cost, the >=1-plain-track constraint on the 6 metro hexes, the emergent 2nd city) — PRD §6.2 open question, out of scope per designer.
- Per-city slot/splat tuning; classify Kroddheim K36 (unlabeled yellow city).
