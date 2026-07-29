# C32: Gördum (D) — hexes & permit letters (region footprint)

- **ID:** C32
- **Type:** content
- **Epics:** World & Map, Permits
- **Sprint:** sprint-04
- **Status:** done
- **Created:** 2026-07-27

## Story

As the 18Dragon designer,
I want Gördum's land footprint placed on the (further-eastward-extended) map with its G permit letters,
so that the second mainland region has a hex base for its mountain terrain (C33) and cities (C34), tied cleanly to Caelimor's eastern border.

## Acceptance Criteria

1. The hex grid is **extended east** of Caelimor to hold Gördum; the island, its water, and all of
   Caelimor are otherwise unchanged.
2. Gördum's land footprint is placed as **amber `#E69F00`** hexes, **landlocked** (all buildable land,
   no water), spanning **rows C–M** (aligned with Caelimor).
3. Silhouette: **~4 hexes across in the north**, **spreading to ~7 across toward the south** where it
   wraps below Caelimor's westward-curving SE edge. Its **west edge abuts Caelimor's existing eastern
   border** (the black divider on C30/D29/E28/F29/G30/H29/I28/J29/K28/L27/M26), and it **reclaims the
   four hexes Caelimor left open for it — K30, L29, M28, M30** — as part of its southern spread.
4. Every Gördum land hex carries the **G** permit letter — top-most overlay (`permit: true`), same
   corner/style as Verantum's "A" and Caelimor's "N", in Gördum's amber `#E69F00`.
5. Gördum stays **hex/permit only** this story — **no terrain costs, no dits, no cities** (those are
   C33 / C34). Base color is amber `plain`-style land; mountain *terrain* is added in C33.
6. `18dragon.json` loads with no schema error/crash; Gördum renders as a distinct amber region east of
   Caelimor, abutting the divider with the correct narrow-north / wide-south silhouette; no console
   errors.

## Tasks / Subtasks

- [x] Extend the grid east far enough to hold Gördum (col 42); island/water/Caelimor intact (AC: 1)
- [x] Place Gördum's land hexes, rows C–M: ~4 across in the north, widening to ~7–8 across in the
      south, abutting Caelimor's E border and reclaiming K30/L29/M28/M30 (AC: 2,3)
- [x] Add the **G** permit label (`permit: true`, `#E69F00`) to every Gördum hex (AC: 4)
- [x] Keep it terrain/dit/city-free — a clean footprint only (AC: 5)
- [x] Render + iterate the silhouette with the designer (edge-tuning pass; S/W/E region border with
      both staircases closed); confirm no console errors (AC: 6)

## Dev Notes

**Elicitation (designer, 2026-07-27):**
- Gördum = the doodle's center-north **mountains**; on our grid it sits **east of Caelimor** (grid
  extended east). **G** permit letter (chosen over "D" to avoid clashing with Draeven's "D"
  special-tile letter).
- **~4 hexes across in the north**, **spreading to ~7 across at the south end** where Caelimor's
  border curved west.
- **Landlocked** — no sea/water; the whole footprint is buildable land.
- **N–S extent = Caelimor's** (rows C–M).

**Tie-in geometry (measured from `18dragon.json`):** Caelimor's eastern border hexes carry side-4
(E) borders down C30, D29, E28, F29, G30, H29, I28, J29, K28, L27, and the SE corner M26; M20/M22/M24
carry south borders. Gördum's western hexes are the eastern neighbours of those (east neighbour = same
row, col+2 → C32, D31, E30, F31, G32, H31, I30, J31, K30, L29, M28), which is exactly the K30/L29/M28
(+M30) set Caelimor left open. Mind the odd-row-even-col / even-row-odd-col convention when laying the
grid east.

**Boundaries / deferrals:**
- C32 = **amber land hexes + G labels only.** Mountain terrain (3 cost bands 60/80/120) + dits = **C33**.
  Cities (capital **Brekheim** just S of center + sparse settlements + minor homes 13–18) = **C34**.
- Region color **`#E69F00`** (world-bible, Okabe-Ito amber). Permit letters use `permit: true`
  (D05/D06 overlay); color is effectively moot at label size (as noted for Caelimor).
- **Region-boundary borders on Gördum's own E/S perimeter** are *not* required here — Caelimor's
  divider already exists on its side, and Gördum's outer (east/south) edge borders are naturally added
  when the next region (Varstova/Muravel) is placed, matching how Caelimor's borders landed during its
  cities pass. Leave as an emergent/later item unless the designer asks for them now.
- **Script-managed file** (cookbook): generate the per-hex/permit groups with a Python
  load-modify-`json.dump` script, not by hand. Work **propose → render → iterate** — draw the
  silhouette with the designer against the doodle before committing it.

## Validation

- `18dragon.json` loads in 18xxMaker; Gördum shows as an amber, G-lettered, landlocked region east of
  Caelimor, abutting the existing divider, narrow in the north and wider in the south; no console
  errors. Screenshot; footprint reviewed with the designer.

## References

- [Source: docs/world-bible.md — Gördum (D): mountains, Germanic/Norse, capital Brekheim, `#E69F00`]
- [Source: _artifacts/prd-game.md#3 Map & regions] · [_artifacts/sprints/sprint-04.md]
- [Ref: 18xx_Dragon doodle map.jpg — center-north mountains]
- [Pattern: _artifacts/stories/C29-caelimor-hexes-permits.md — the analogous footprint story]
- [Data: 18dragon.json — Caelimor eastern border hexes; K30/L29/M28/M30 left open]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Placement:** Gördum sits **east of Caelimor**; grid extended to **col 42**. **55** `plain` land
  hexes, rows C–M, each with a **G** permit label (`permit: true`, `#E69F00`, angle 300, percent 0.85,
  fontSize 9 — matching Caelimor's N pattern exactly).
- **Silhouette (per designer, after edge-tuning pass):** narrow in the north, widening south, with a
  **staircased SE coastline**. The **west edge** steps west as it descends
  (C32→D31→E30→F31→G32→H31→I30→J31→K30→L29→M28), filling the area Caelimor's border curved away from;
  the **east edge** tapers organically (C36 / D37 / E38 / F37 / G38 / H37 / I38 / J39 / K40 / L41 /
  M42). Final per-row counts: C3 D4 E5 F4 G4 H4 I5 J5 K6 L7 M8.
- **Edge-tuning (designer, 2026-07-27):** removed C38, F39, G40, H39, I40, J41; added E38, M42 — to
  pull in the boxy upper-east wall and let the region step out furthest at the south.
- **Region-boundary border (designer, 2026-07-27):** thick black divider on Gördum's **S/W/E**
  perimeter; **north left open** (map edge). Implemented per-hex (28 perimeter hexes split into
  border groups carrying the G label; 27 interior hexes borderless). Rule: border exposed W/E/SE/SW
  sides everywhere, plus close BOTH staircases — **NE (side 3)** at east jut-outs
  (D37/E38/G38/I38/J39/K40/L41/M42) and **NW (side 2)** at west jut-outs
  (D31/E30/H31/I30/K30/L29/M28) — so the outline is a continuous, even-weight line (the leftover
  side-2/3 exposures are the region's true top = the map's north, left open). West coincides with
  Caelimor's existing east/SE divider; adding Gördum's own W/NW borders makes it self-contained and
  uniform (the notch segments no longer read thin). Named-color `"black"` per the cookbook gotcha.
- **Tie-in:** west edge abuts Caelimor's existing eastern divider (no gap/overlap); **reclaims
  K30/L29/M28/M30** as its westernmost southern hexes.
- **Landlocked** — no water added. **No terrain/dits/cities** (deferred to C33/C34).
- **Fill decision:** used `color: plain` (not an amber fill) to match Caelimor's established pattern —
  regions read by colored permit letter + divider, not fill. Flagged to designer; amber tint is a
  trivial change if preferred.
- Verified in-app (wide + clipped render); JSON valid; **no console errors**.

### Files Changed

- `18dragon.json` `map.hexes` — Gördum hexes (55, G permit labels) as 1 interior group + 8 per-hex
  border groups (S/W/E boundary); grid now spans to col 42. Working file (script-managed via
  scratchpad `c32*.py`), not version-controlled.
