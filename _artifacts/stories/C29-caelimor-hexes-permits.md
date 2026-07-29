# C29: Caelimor (N) — hexes & permit letters (region footprint)

- **ID:** C29
- **Type:** content
- **Epics:** World & Map, Permits
- **Sprint:** sprint-03
- **Status:** done
- **Created:** 2026-07-27

## Story

As the 18Dragon designer,
I want Caelimor's land footprint placed on the (eastward-extended) map with its N permit letters,
so that the first mainland region has a coastline and hex base for its terrain (C30) and cities (C31).

## Acceptance Criteria

1. The hex grid is **extended east** of the Verantum island to hold Caelimor; the island and its
   surrounding water are otherwise unchanged.
2. Caelimor's land footprint is placed: **~5 hexes across** (E–W), **N–S extent ≈ Verantum's**
   (~rows C–M), rendered as **green plains** (`plain`).
3. Caelimor's **west edge is coastal** — a water channel separates it from the island, **reusing
   the island's existing east-water hexes** where possible and adding water to complete the channel.
4. At least one Caelimor land hex **adjoins the F19 bridge** (reserved for the coastal city added in
   C31). *(The M12 bridge is south — likely a different region; out of scope here.)*
5. Every Caelimor land hex carries the **N** permit letter — top-most overlay (`permit: true`), same
   corner/style as Verantum's "A", in Caelimor's color **sky-blue `#56B4E9`**. Verify legibility on
   green (adjust shade if it reads poorly).
6. `18dragon.json` loads with no schema error/crash; Caelimor renders as a distinct green region east
   of the island with a clean coastline; no console errors.

## Tasks / Subtasks

- [x] Extended the grid east (to col 30); island/water intact (AC: 1)
- [x] Placed **56** green-plain hexes (rows C–M) with `N` permit labels (AC: 2,5)
- [x] Defined the west-coast water channel (reused island east-water + added channel water) (AC: 3)
- [x] F21 adjoins the F19 bridge (reserved for the C31 coastal city) (AC: 4)
- [x] Rendered + iterated with the designer (coastline jags, SE-corner trim); no console errors (AC: 6)

## Dev Notes

**Elicitation (designer, 2026-07-27):**
- Caelimor = the doodle's green **NW plains**; on our grid it sits **east of the island** (grid
  extended east). Its **west coast lines up to the F19 bridge**.
- **~5 hexes across**; N–S extent about the same as Verantum.
- **Water separates** Verantum from Caelimor — many of those water hexes already exist (the island's
  east water: E16, E18, I16, K14…). Add water to finish the channel.
- The **existing bridge hex (F19) adjoins a city** (that city = C31).
- **N** permit letter "for now."

**Boundaries:**
- C29 = **plains hexes + N labels + coastline only.** Terrain (mountains/hills/rivers with costs) +
  dits = **C30**. Cities (capital **Draeven** + the bridge-adjoining coastal city) = **C31**.
- Region color **`#56B4E9`** (world-bible). Permit letters use `permit: true` (D05/D06 overlay).
- Coordinate note: island east water at cols ~16–18; F19 bridge at col 19; Caelimor land begins
  ~col 20–21 and runs east ~5 hexes. Mind the odd-row-even-col / even-row-odd-col convention.
- Work **propose → render → iterate** (see `docs/18xxmaker-cookbook.md`); draw the footprint shape
  with the designer against the doodle.

## Validation

- `18dragon.json` loads in 18xxMaker; Caelimor shows as a green, N-lettered region east of the
  island with a coastal west edge and a land hex touching F19; no console errors. Screenshot;
  footprint reviewed with the designer.

## References

- [Source: docs/world-bible.md — Caelimor (N): coastal/plains, Celtic-ish, capital Draeven, `#56B4E9`]
- [Source: _artifacts/prd-game.md#3 Map & regions] · [_artifacts/sprints/sprint-03.md]
- [Ref: 18xx_Dragon doodle map.jpg — green NW plains]
- [Data: 18dragon.json — island east-water hexes; F19/M12 bridges]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Placement:** Caelimor sits **east of the island**; grid extended to **col 30**. **56** green
  `plain` hexes, rows C–M, cols ~19–30, each with an **N** permit label (`permit: true`, `#56B4E9`
  — color is moot at label size per designer, left as region color).
- **Coastline:** a water channel separates island from Caelimor, reusing the island's east-water
  hexes plus added channel water. Designer jagged the west coast by converting **J19, K18, K20,
  L19, M20** from channel-water to land.
- **Bridge:** **F21** adjoins the **F19** bridge (Corvium→Caelimor) — reserved for the coastal city
  in C31.
- **SE corner** (K30, L29, M28, M30) left **open** for the next region.
- Built propose→render→iterate over 4 passes. Deferred: terrain/dits (**C30**), cities incl.
  capital **Draeven** + the bridge city (**C31**).
- Verified in-app each pass; JSON valid; no console errors.

### Files Changed

- `18dragon.json` `map.hexes` — new Caelimor `plain` group (56 hexes, N labels) + new channel
  `water` group; grid now spans to col 30. Working file, not version-controlled.
