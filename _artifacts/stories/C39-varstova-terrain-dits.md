# C39: Varstova (V) — hills terrain & dits

- **ID:** C39
- **Type:** content
- **Epics:** World & Map
- **Sprint:** sprint-06
- **Status:** done
- **Created:** 2026-07-29

## Story

As the 18Dragon designer,
I want Varstova's terrain laid down simply — a single river running southeast (20gp to cross) — plus six dits scattered across the wedge,
so that the final region reads as hill country with one river obstacle on top of the C38 footprint, ready for its cities (C40).

## Acceptance Criteria

1. **Terrain is deliberately simple — one river, no graded hill costs.** ("Hills" stays the region's
   *flavor*; mechanically there is only the river.)
2. **River running southeast** from **G40** to **I48**, as **`river` terrain with a 20gp crossing
   cost** (same as Caelimor's river) on each hex in its course:
   **G40 → H41 → H43 → I44 → I46 → I48** (6 hexes; SE/E alternating steps, all Varstova land).
3. **6 dits** as `centerTowns`, **spread across the wedge** (avoiding the river hexes), named per
   Varstova's **Slavic-ish** phonetics (endings **-ov / -esh / -var / -ova**).
4. All river/dit hexes keep the **V** permit letter; the region border + row-M sea (C38) are preserved.
5. `18dragon.json` loads with no schema error/crash; the SE river renders (wavy icon + 20gp on its 6
   hexes), the 6 named dits show, V permits intact; no console errors.

## Tasks / Subtasks

- [x] Applied **`river` terrain, cost 20** to the 6 river hexes G40/H41/H43/I44/I46/I48 (AC: 2)
- [x] Placed **6 dits** (Volkov/Miresh/Zdanov/Radova/Peshov/Tomavar) off the river; Slavic-ish (AC: 3)
- [x] Kept **V** permits + border/sea intact (AC: 4)
- [x] Rendered (large viewport, clip east); designer approved river course + dits; no errors (AC: 5)

## Dev Notes

**Elicitation (designer, 2026-07-29):**
- **"The terrain is simple"** — just a **river running southeast, G40 → I48**. No graded hills.
- River **crossing cost = 20gp** (matches Caelimor); uses the existing core **`river`** icon.
- **6 dits**, Slavic-ish names.

**River course (traced, all Varstova land, verified adjacent):**
`G40 –SE→ H41 –E→ H43 –SE→ I44 –E→ I46 –E→ I48`. Net direction SE (down 2 rows, right 4 hex-cols).
Each hex gets `terrain: [{ "type": "river", "cost": 20 }]` — the 6-hex line reads as the river's course
(same representation as Caelimor's G-row river; the `river` icon is a wavy glyph, no per-edge flow).

**Schema / build notes:**
- **Dits (cookbook § Dits):** each = `"centerTowns": [{ "name": { "name": "…" } }]`, **one hex per
  group** (distinct names), carrying the V permit (+ border if it lands on a bordered west hex).
- **Proposed dit hexes** (spread; off-river; confirm at build): **C44, D47, E42, F45, H45, K44**.
- **Proposed names** (Slavic-ish; confirm): **Volkov, Miresh, Zdanov, Radova, Peshov, Tomavar**.
- **Parity pre-flight:** run any designer coords through `check-parity.py` before scripting.
- **Rendering:** large viewport (`5000x3600`) clipped east (cookbook § Rendering the wide map).
- **Script-managed** — river-terrain edit + per-hex dit groups via Python load-modify-`json.dump`.

**Boundaries / deferrals:**
- C39 = the river (20gp) + 6 dits only. **Cities** (capital **Varstgrad** + settlements + minor homes
  **19–24**) = **C40**, which **completes the five-region map**.

## Validation

- `18dragon.json` loads in 18xxMaker; Varstova shows a SE river (wavy + 20gp) on G40→I48 and 6 named
  Slavic-ish dits across the wedge; V permits + border + sea intact; no console errors. Screenshot
  (large viewport); river course + dit spots + names reviewed with the designer.

## References

- [Source: docs/world-bible.md — Varstova (E): hills, Slavic-ish (-ov/-esh/-var/-ova), Varstgrad]
- [Recipe: docs/18xxmaker-cookbook.md § Terrain, § Dits, § Rendering the wide map]
- [Pattern: C30-caelimor-terrain-dits.md — the river (cost 20) + dits precedent]
- [Source: _artifacts/stories/C38 (footprint; V permits, border, row-M sea)]
- [Data: 18dragon.json — Varstova groups (rows C–L)]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Terrain kept deliberately simple** — a single **SE river** (`river` terrain, **cost 20**) on
  **G40 → H41 → H43 → I44 → I46 → I48** (SE/E-alternating course; G40 is a west-border hex, border
  preserved). No graded hills — "hills" stays regional flavor, per the designer.
- **6 dits** (Slavic-ish), spread across the wedge off the river: **Volkov** (C44), **Miresh** (D47),
  **Zdanov** (E42), **Radova** (F45), **Peshov** (H45), **Tomavar** (K44). Each its own group carrying
  the V permit.
- **Parity pre-flight (retro-5 tool):** all 12 coords ran clean through `check-parity.py` before
  scripting. Rendered large-viewport clipped east.
- Verified in-app; designer approved; **JSON valid; no console errors.**
- **Deferred:** cities incl. capital **Varstgrad** + minor homes **19–24** (**C40** — completes the map).

### Files Changed

- `18dragon.json` `map.hexes` — 6 river-terrain groups (`river`/20gp) + 6 dit groups; hexes pulled from
  the C38 Varstova land/border groups. Working file (script-managed via scratchpad `c39.py`).
- *(No fork changes — core `river` icon reused.)*
