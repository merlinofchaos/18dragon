# C35: Muravel (M) — hexes, coastline & permit letters (region footprint)

- **ID:** C35
- **Type:** content
- **Epics:** World & Map, Permits
- **Sprint:** sprint-05
- **Status:** done
- **Created:** 2026-07-27

## Story

As the 18Dragon designer,
I want Muravel's land footprint placed as a wide maritime band below the existing board, with its enclosing coastline (sea, interior lake, inlet, bridge-approach) and its M permit letters,
so that the southern region has a coast-shaped hex base for its terrain (C36) and cities (C37), tied to the regions above.

## Acceptance Criteria

1. The hex grid is **extended downward** — new rows **N, O, P, Q, (R)** below row M; the island,
   its water, Caelimor, and Gördum are otherwise unchanged.
2. Muravel's land footprint is placed as **plain** hexes carrying the **M** permit letter, forming a
   **wide southern band ~4–5 rows deep**, with a **variable (non-straight) southern coastline**.
3. **Sea on all three outer sides** — the **west**, **south**, and **east** edges are `water` (open
   sea), enclosing the land. **East capped at col 42** (M42 is already the furthest-east hex; Muravel
   does not extend past col 42).
4. **Interior lake (west)** — a patch of `water` inside the western portion of the land (not connected
   to the outer sea, or only narrowly).
5. **Inlet south of Caelimor** — a finger of `water` biting up into the north edge, roughly under
   Caelimor (cols ~19–30), separating some of Muravel's land from Caelimor's southern border.
6. **West approach to Verantum** — Muravel's land reaches west to about **col 10–12**, coming within
   **one hex of the M12 bridge** (Verantum's second bridge, at M12); sea lies between Muravel and the
   island there.
7. **Region border** where Muravel's land **abuts a land region** (its north edge against Caelimor's /
   Gördum's existing south borders) — a thick divider like the Caelimor↔Gördum boundary. Where **sea**
   separates Muravel from a neighbour (the inlet, the island approach), **no border** is needed (water
   is the divider). North/S/E/W outer sea edges need no border.
8. Every Muravel land hex carries the **M** permit letter — top-most overlay (`permit: true`), same
   corner/style as A/N/G, in Muravel's vermillion **`#D55E00`**.
9. Muravel stays **hex/coastline/permit only** this story — **no terrain costs, no dits, no cities**
   (those are C36 / C37).
10. `18dragon.json` loads with no schema error/crash; Muravel renders as a distinct plains band below
    the board, enclosed by sea with the west lake + Caelimor inlet + M12 approach, M permits + north
    border intact; no console errors.

## Tasks / Subtasks

- [x] Extended the grid down (rows N–S); island/water/Caelimor/Gördum intact (AC: 1)
- [x] Placed Muravel's plain land band, rows N–S, cols ~10–42, variable south coast (AC: 2)
- [x] Added the enclosing **outer sea** (W/S/E) + **interior west lake** + M12 approach (AC: 3,4,6);
      inlet reworked to land per designer (AC: 5 — see notes)
- [x] Added the **M** permit label (`permit: true`, `#D55E00`) to every Muravel land hex (AC: 8)
- [x] Added the **north region border** where Muravel land abuts Caelimor/Gördum land (AC: 7)
- [x] Kept it terrain/dit/city-free — footprint + coastline only (AC: 9)
- [x] Rendered + iterated coast/lake/east-tip with the designer (tall viewport); no console errors (AC: 10)

## Dev Notes

**Elicitation (designer, 2026-07-27):**
- Muravel = the doodle's **southern plains**; a **wide band surrounded by sea**, placed **below** the
  existing board (grid extended *down* — first region to grow the grid vertically).
- **4–5 rows deep, "slightly more variable so the southern coastline isn't just straight."**
- **West reaches toward the island (col ~10–12)**, within **one hex of the M12 bridge**; the
  **interior lake sits in the western portion**.
- **Coastal on all three outer sides**; an **inlet south of Caelimor**; **east already capped at M42**.
- Permit **M**; capital **Kalavar** (C37).

**Geometry notes (verify at build):**
- Row parity below M: **N** (even row → **odd** cols), **O** (odd → even), **P** (even → odd),
  **Q** (odd → even), **R** (even → odd). Mind this when laying each row.
- Existing south edge to tie into: Caelimor/Gördum land ends at rows **L/M, cols 19–42** (M20…M42 carry
  south borders already). The island area (cols 1–18) ends in water around rows J–M; **M12 = the
  bridge hex** (water).
- Muravel's **north border** goes where its top-row land sits directly below Caelimor/Gördum land
  (shared land edge). Where the **inlet** (water) intrudes, that stretch needs no border.
- **Coastline is the bulk of this story** (unlike Gördum's landlocked C32) — expect several
  propose→render→iterate passes on the sea/lake/inlet shape. Draw against the doodle first.

**Schema / build notes:**
- Land = `color: plain` + M permit label (region read by permit + border, per Caelimor/Gördum). Sea =
  `color: water`. Reuse existing island water hexes where the channel already exists; add new water for
  the enclosing sea, the lake, and the inlet.
- Region color **`#D55E00`** (world-bible). Border color **named** `"black"` (cookbook gotcha). Use the
  **symmetric staircase-closure rule** on the north border where the land steps (cookbook § Region
  borders).
- **Rendering:** the map now runs deep as well as wide — use `verify-screenshot.mjs` with a **tall
  viewport** (e.g. `4400x3400`) to capture the new southern rows (cookbook § Rendering the wide map).
- **Script-managed file** — generate the per-hex/permit/border groups with a Python
  load-modify-`json.dump` script.

**Boundaries / deferrals:**
- C35 = plains land + coastline (sea/lake/inlet) + M labels + north border only. **Terrain + dits** =
  **C36**. **Cities** (capital **Kalavar** + settlements + minor homes **25–30**) = **C37**.
- The **M12-bridge connection rule** (crossing to Verantum) is a *rule*, not this story; the bridge
  graphic already exists (Sprint 2). C35 just leaves the land one hex short of M12.

## Validation

- `18dragon.json` loads in 18xxMaker; Muravel shows as a vermillion-M-lettered plains band below the
  board, enclosed by sea with a western interior lake, a Caelimor inlet, and a west approach ending one
  hex from the M12 bridge; north border where it abuts land; no console errors. Screenshot (tall
  viewport); footprint reviewed with the designer.

## References

- [Source: docs/world-bible.md — Muravel (S): plains, Mediterranean/Arabic, capital Kalavar, `#D55E00`]
- [Source: _artifacts/prd-game.md#3 Map & regions] · [_artifacts/sprints/sprint-05.md]
- [Ref: 18xx_Dragon doodle map.jpg — southern plains]
- [Pattern: _artifacts/stories/C32-gordum-hexes-permits.md, C29-caelimor-hexes-permits.md]
- [Recipe: docs/18xxmaker-cookbook.md § Region borders, § Rendering the wide map, § Parity-check coords]
- [Data: 18dragon.json — south edge (M-row borders), M12 bridge (col 12), island south water]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Placement:** Muravel is the **southern band** — grid extended **down** to row **S** (first region to
  grow the grid vertically). **65 `plain` land hexes**, rows N–S, cols ~10–42, each with an **M** permit
  label (`permit: true`, `#D55E00`, angle 300 — matching N/G pattern).
- **Coastline (maritime region):** enclosed by `water` on the outer W/S/E; a **variable/jagged south
  coast** (rows R/S receding); a small **interior west lake** (O16/P17); a **west approach** that ends
  one hex short of the **M12 bridge** (sea between). ~32 new Muravel water hexes (plus reused island
  water).
- **Designer reshaping (propose→render→iterate, 2 edit passes):** removed the first-pass Caelimor inlet
  (N21–25 → land); trimmed SW/SE/east coast (P17/R11/R13/R23/Q22/Q24/P25/S34/R37/R39/R41 → water);
  east NE corner shaped (N41 land tip, N43+O42 water). **O14 filled to land** (the "O4" edit was a typo,
  confirmed → O14). **Two parity typos** in supplied coords (N42, O43) caught and confirmed with the
  designer per the cookbook parity rule.
- **North region border:** computed per-hex — border only the sides where a Muravel hex neighbours
  **another region's LAND** (Caelimor/Gördum), leaving all sea-facing sides open (water divides).
  Result: a clean divider on **N19 (NE)** + **N21–N41 (NW+NE)** following the jagged seam; it overlaps
  the existing Caelimor/Gördum south borders exactly (one line, no doubling). Named color `"black"`.
- **Tooling:** used the retro-hardened `verify-screenshot.mjs` **viewport arg** (`4600x3600`) to capture
  the new southern rows — the Sprint-4 workflow change paid off immediately.
- Verified in-app across passes; **JSON valid; no console errors.** Grid now spans rows A–S, cols 1–43.
- **Deferred:** terrain + dits (**C36**); cities incl. capital **Kalavar** + minor homes **25–30**
  (**C37**).

### Files Changed

- `18dragon.json` `map.hexes` — new Muravel land groups (65 hexes, M permits; 53 interior + 12 border)
  + Muravel `water` group (sea/lake); grid extended to row S / col 43. Working file (script-managed via
  scratchpad `c35*.py`), not version-controlled.
