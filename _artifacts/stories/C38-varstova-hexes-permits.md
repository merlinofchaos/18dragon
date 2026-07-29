# C38: Varstova (V) — hexes & permit letters (region footprint)

- **ID:** C38
- **Type:** content
- **Epics:** World & Map, Permits
- **Sprint:** sprint-06
- **Status:** done
- **Created:** 2026-07-29

## Story

As the 18Dragon designer,
I want Varstova's land footprint placed as a NE wedge east of Gördum with its V permit letters, a straight east map-edge, and row-M sea,
so that the fifth and final region has a hex base for its hills terrain (C39) and cities (C40) — completing the map skeleton.

## Acceptance Criteria

1. The hex grid is **extended east** to hold Varstova; the island, water, Caelimor, Gördum, and Muravel
   are otherwise unchanged.
2. Varstova's land footprint is placed as **plain** hexes carrying the **V** permit letter, forming a
   **NE wedge east of Gördum's diagonal east edge** — **wider in the north**, **narrowing to ~4 hexes
   wide in the south**.
3. **West edge abuts Gördum's diagonal** exactly — the hexes immediately east of Gördum's east edge
   (C38, D39, E40, F39, G40, H39, I40, J41, K42, **L43**). **L43 is the anchor** already promised by
   Muravel's M42/Tarseem offboard NE spike.
4. **Straight N/S east edge** (the map boundary on the east — no sea there, just the grid edge).
5. **Sea hexes in row M** along the south (e.g. M44/M46/M48) — the region's only water; the rest is
   landlocked hills.
6. **Region border** where Varstova land **abuts Gördum land** (its west edge). The east (map edge),
   north (map edge), and row-M-sea sides need no border (edge/water divide).
7. Every Varstova land hex carries the **V** permit letter — top-most overlay (`permit: true`), same
   corner/style as A/N/G/M, in Varstova's teal **`#009E73`**.
8. Varstova stays **hex/permit only** this story — **no terrain, no dits, no cities** (C39 / C40).
9. `18dragon.json` loads with no schema error/crash; Varstova renders as a distinct teal-V wedge east
   of Gördum with a straight east edge + row-M sea + west border; no console errors.

## Tasks / Subtasks

- [x] Extended the grid east (to col 48); island/water/Caelimor/Gördum/Muravel intact (AC: 1)
- [x] Placed Varstova's plain land wedge, rows C–L, hugging Gördum's diagonal, straight east edge,
      wider-north/narrower-south (AC: 2,3,4)
- [x] Added the **row-M sea** (M44/M46 — M48 removed per designer) (AC: 5)
- [x] Added the **V** permit label (`permit: true`, `#009E73`) to every Varstova land hex (AC: 7)
- [x] Added the **west region border** where Varstova land abuts Gördum land (AC: 6)
- [x] Kept it terrain/dit/city-free — footprint only (AC: 8)
- [x] Rendered + iterated (M48 removed); no console errors (AC: 9)

## Dev Notes

**Elicitation (designer, 2026-07-29):**
- Varstova = the doodle's **northeast hills**; a **wedge east of Gördum**, grid extended east.
- **~4 hexes wide on the south, wider at the top**; the **eastmost border runs straight N/S**.
- **Sea hexes in row M**; the **east side is the map edge** (no sea there). Otherwise landlocked.
- Permit **V** (shares the glyph with Kalavar's special-tile "V" — different hexes/regions,
  designer-confirmed OK). Capital **Varstgrad** (C40).

**First-pass wedge (compute from Gördum's east edge; tune at build).** Gördum east edge = C36, D37,
E38, F37, G38, H37, I38, J39, K40, L41 → Varstova west (east neighbours) = C38, D39, E40, F39, G40,
H39, I40, J41, K42, L43. Straight east edge ≈ col 48 (odd rows) / 47 (even rows):

| Row | Cols (first pass) | width |
|-----|-------------------|-------|
| C (odd/even-cols) | 38 40 42 44 46 48 | 6 |
| D (even/odd-cols) | 39 41 43 45 47 | 5 |
| E | 40 42 44 46 48 | 5 |
| F | 39 41 43 45 47 | 5 |
| G | 40 42 44 46 48 | 5 |
| H | 39 41 43 45 47 | 5 |
| I | 40 42 44 46 48 | 5 |
| J | 41 43 45 47 | 4 |
| K | 42 44 46 48 | 4 |
| L | 43 45 47 | 3 |
| **M sea** | 44 46 48 (`water`) | — |

~47 land hexes; wider-north (6) → narrower-south (3–4). Adjust the north width / east-edge column /
row-M sea propose→render→iterate.

**Schema / build notes:**
- Land = `color: plain` + V permit label (region read by permit + border). Row-M sea = `color: water`.
- Region color **`#009E73`** (world-bible, Okabe-Ito teal). Border color **named** `"black"` (cookbook
  gotcha). West border only (abuts Gördum); use the **symmetric staircase-closure rule** where the
  wedge's west edge steps against Gördum's diagonal (cookbook § Region borders). Gördum's existing east
  borders coincide → renders as one line.
- **Parity pre-flight:** run any designer-supplied coords through
  `.claude/skills/agile-content/check-parity.py` **before** scripting (retro-5 rule). Row parity:
  C/E/G/I/K odd→even cols; D/F/H/J/L even→odd cols.
- **Rendering:** the map is now wide *and* tall — use `verify-screenshot.mjs` with a large viewport
  (e.g. `4800x3600`) and clip east (cookbook § Rendering the wide map).
- **Script-managed file** — generate the per-hex/permit/border groups via Python load-modify-`json.dump`.

**Boundaries / deferrals:**
- C38 = teal land + V labels + row-M sea + west border only. **Hills terrain + dits** = **C39** (reuses
  the existing `hills`/`hillsLarge` icons — no new fork art). **Cities** (capital **Varstgrad** +
  settlements + minor homes **19–24**) = **C40**.
- When C40 lands, the **five-region map is complete**.

## Validation

- `18dragon.json` loads in 18xxMaker; Varstova shows as a teal, V-lettered NE wedge east of Gördum —
  wider north, ~4-wide south, straight east map-edge, row-M sea, west border where it abuts Gördum; no
  console errors. Screenshot (large viewport, clipped east); footprint reviewed with the designer.

## References

- [Source: docs/world-bible.md — Varstova (E): hills, Slavic-ish, capital Varstgrad, `#009E73`]
- [Source: _artifacts/prd-game.md#3 Map & regions] · [_artifacts/sprints/sprint-06.md]
- [Ref: 18xx_Dragon doodle map.jpg — northeast hills]
- [Pattern: C32 (Gördum footprint), C35 (Muravel footprint+coast+border)]
- [Recipe: docs/18xxmaker-cookbook.md § Region borders, § Parity-check…, § Rendering the wide map]
- [Data: 18dragon.json — Gördum east edge (C36…L41); M42/Tarseem NE spike → L43]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Placement:** Varstova is the **NE wedge east of Gördum**; grid extended east to **col 48**. **47
  `plain` land hexes**, rows C–L, each with a **V** permit label (`permit: true`, `#009E73`, angle 300 —
  matching the A/N/G/M pattern). Shares the glyph with Kalavar's special-tile "V" (different
  hexes/regions, designer-OK).
- **Silhouette:** west edge hugs Gördum's diagonal exactly (C38/D39/E40/F39/G40/H39/I40/J41/K42/L43);
  **wider north** (row C = 6 hexes) **narrowing south** (row L = 3); **straight N/S east edge** ≈ col
  48 (odd rows) / 47 (even) = the map boundary (no sea east).
- **Row-M sea:** M44/M46 (`water`) along the south; **M48 removed per the designer**. East side is the
  map edge, not sea.
- **L43 anchor confirmed** — Muravel's M42/Tarseem offboard NE spike points into Varstova's L43.
- **West region border:** per-hex, only where Varstova land abuts **Gördum land** (10 hexes, sides
  1/2/6). Excludes offboard (Tarseem) and water/edge sides. Coincides with Gördum's existing east
  border → one line, no doubling. Named color `"black"`.
- **Parity pre-flight (retro-5 tool):** ran all 50 first-pass coords through `check-parity.py` before
  scripting — all VALID (no typos this time). Rendered with a large viewport (`5000x3600`) clipped east.
- Verified in-app; **JSON valid; no console errors.** Grid now spans rows A–S, cols 1–48.
- **Deferred:** hills terrain + dits (**C39**, reuses existing `hills`/`hillsLarge` icons); cities incl.
  capital **Varstgrad** + minor homes **19–24** (**C40**).

### Files Changed

- `18dragon.json` `map.hexes` — new Varstova land groups (47 hexes, V permits; 37 interior + 10 border)
  + Varstova `water` group (M44/M46); grid extended to col 48. Working file (script-managed via
  scratchpad `c38*.py`), not version-controlled.
