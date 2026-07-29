# C33: Gördum (G) — mountain terrain (3 cost bands) & dits

- **ID:** C33
- **Type:** content
- **Epics:** World & Map
- **Sprint:** sprint-04
- **Status:** done
- **Created:** 2026-07-27

## Story

As the 18Dragon designer,
I want Gördum's mountain terrain laid down as three concentric cost bands (60/80/120) with graded peak icons, plus a few plains dits in the southeast,
so that the mountains region reads as a real barrier — costly at its core, easing to foothills at the edges — on top of the C32 footprint, ready for its cities (C34).

## Acceptance Criteria

1. **Concentric mountain massif** across Gördum, heaviest in the center and easing outward:
   - **120 core** — a **modest ~6–10 hex** expensive heart, centered **slightly south of the region's
     middle** (around I34). This is where the capital **Brekheim** will land (C34).
   - **80 ring** — the band of hexes surrounding the core.
   - **60 outer/foothills** — the remaining mountain hexes toward the N / W / S edges.
2. **SE plains pocket** — the **southeast wedge** (rows ~J–M, easternmost cols) carries **no mountain
   terrain**; it is flat plains and holds the dits. "Dits are all in the southeast, where there won't
   be hills or mountains."
3. **Graded peak icons (3 custom SVGs)** in the existing hills line-art style, one per band, so the
   band shows in the *silhouette* as well as the cost number:
   - 60 → a **small foothill peak**; 80 → a **larger / twin peak**; 120 → a **tall multi-peak massif**.
   - Built as `src/data/icons/*.svg` in the fork (auto-registered, **no apostrophes**), committed.
4. **Every mountain hex** gets `terrain: [{ "type": <band icon>, "cost": <60|80|120> }]`. Costs match
   the band. G permit letters stay intact on all hexes.
5. **3–4 dits** as `centerTowns`, **all in the SE plains pocket**, named per Gördum's Germanic/Norse
   phonetics (hard K/G/D/R/B; endings *-dum / -rok / -geld*). Remaining SE plains hexes stay empty.
6. The **future capital hex** (Brekheim, chosen in C34) sits in the 120 core; its mountain terrain is
   removed/omitted when the city is placed (C34) — a city hex doesn't show a terrain cost. C33 assigns
   terrain to all core hexes; C34 clears the one it uses.
7. `18dragon.json` loads with no schema error/crash; the three bands render with graded icons + correct
   costs, the SE dits show on flat plains, G permits intact; no console errors.

## Tasks / Subtasks

- [x] Build the **3 graded mountain icons** (small peak / twin peak / tall massif) in the fork
      `src/data/icons/`, hills line-art style (`mtnLow`/`mtnMid`/`mtnHigh`) (AC: 3)
- [x] Assign the **120 core** (7 hexes, centered ~I34, slightly south) (AC: 1)
- [x] Assign the **80 ring** around the core (12 hexes) (AC: 1)
- [x] Assign the **60 foothills** to the remaining mountain hexes (26 hexes) (AC: 1)
- [x] Leave the **SE plains pocket** terrain-free (10 hexes) (AC: 2)
- [x] Apply `terrain` (icon + cost) to every mountain hex; keep G permits (AC: 4)
- [x] Place **4 SE dits** (Krossdum/Skarndum/Durrok/Bramgeld), Germanic/Norse (AC: 5)
- [x] Render + iterate; designer approved "for now" (terrain to be revisited in C34); no errors (AC: 7)

## Dev Notes

**Elicitation (designer, 2026-07-27):**
- **Band shape:** *concentric core* — 120 heart, 80 ring, 60 foothills at the edges. "Heavier down
  the middle."
- **Core weight:** *modest* — ~6–10 hexes of 120. Most of the region is 60/80; mountains are a costly
  speed-bump, not an impassable wall.
- **Dits:** only **3 or 4**, and **all in the southeast**, on flat ground (no hills/mountains there).
- **Icons:** *graded by band* — small peak (60) → bigger (80) → tall multi-peak massif (120), built
  in the same line-art style as the existing `hills`/`hillsLarge` icons.

**First-pass band assignment (computed by hex-distance from core center I34; tune at build via
propose→render→iterate).** Total 55 = 7 + 12 + 26 + 10.

| Band | Cost | Icon (proposed) | Hexes |
|------|------|-----------------|-------|
| **Core** | **120** | tall massif | H33 H35 I32 I34 I36 J33 J35 (7) |
| **Ring** | **80** | twin peak | G32 G34 G36 H31 H37 I30 I38 J31 J37 K32 K34 K36 (12) |
| **Foothills** | **60** | small peak | C32 C34 C36 D31 D33 D35 D37 E30 E32 E34 E36 E38 F31 F33 F35 F37 G38 K30 L29 L31 L33 L35 M28 M30 M32 M34 (26) |
| **SE plains** | — (dits) | — | J39 K38 K40 L37 L39 L41 M36 M38 M40 M42 (10) |

- Core center **I34** is slightly south of the region's vertical middle (row H) — matches "capital
  very nearly in the middle, slightly south." Cols skew slightly NW because the SE is plains, so the
  massif reads as mountains-in-the-NW, plains-to-the-SE — coherent.
- **Icon names** (build detail; propose `mountain` / `mountainMid` / `mountainHigh`, or reuse hills
  style names). The **60 foothill** icon may lean toward the `hills` look, grading up to real peaks at
  120 — consistent with the designer's "hills or mountains" phrasing.
- **Dits (SE plains):** pick 3–4 of the SE-plains hexes; propose Germanic/Norse names at build (e.g.
  **Skarndum, Durrok, Bramgeld, Krossdum**). A dit = `"centerTowns": [{ "name": { "name": "X" } }]`,
  one hex per group (per cookbook). Remaining SE plains hexes: empty (no terrain, no dit).
- **Custom-icon pipeline** (cookbook § Terrain + § Custom art): SVGs in `src/data/icons/*.svg`
  auto-register; **no apostrophes**; commit to the fork. Terrain refs the icon by `type`.
- **Script-managed file** — generate the per-hex terrain groups (one group per band-cost, or per-hex
  where a dit/name differs) with a Python load-modify-`json.dump` script.
- **Boundaries:** C33 = terrain + SE dits only. **Cities** (capital **Brekheim** in the core + sparse
  settlements + minor homes 13–18) = **C34**. Don't place cities here; do leave the core ready for one.

## Validation

- `18dragon.json` loads in 18xxMaker; the three concentric bands render with graded peak icons and
  60/80/120 costs, the SE shows flat plains with 3–4 named dits, G permits intact; no console errors.
  Screenshot; band shape + icon grading + dit placement reviewed with the designer.

## References

- [Source: docs/world-bible.md — Gördum (D): mountains, Germanic/Norse, capital Brekheim, `#E69F00`]
- [Source: _artifacts/prd-game.md#3 Map & regions] · [_artifacts/sprints/sprint-04.md]
- [Pattern: _artifacts/stories/C30-caelimor-terrain-dits.md — the analogous terrain story]
- [Recipe: docs/18xxmaker-cookbook.md § Terrain (custom icons), § Dits, § Custom art SVGs]
- [Data: 18dragon.json — Gördum G-permit hexes (C32)]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Three graded mountain icons** built in the fork `src/data/icons/` in the hills line-art style
  (brown `#6b5335`, rounded, stroke-width 2), but with **pointed** peaks so mountains read distinct
  from Caelimor's rounded hills: **`mtnLow`** (single small peak, 60), **`mtnMid`** (twin peaks, 80),
  **`mtnHigh`** (tall three-peak massif, 120). Named to avoid the existing standard `mountain.svg`.
  No apostrophes. *(On disk/working; commit to the fork at finalize, per the C31 hills-icon pattern.)*
- **Concentric bands applied** (first-pass from the story, unchanged after render): **120 core** = 7
  hexes (H33/H35/I32/I34/I36/J33/J35), **80 ring** = 12, **60 foothills** = 26. Each mountain hex gets
  `terrain: [{type: <band icon>, cost: <60|80|120>}]`. Gradient reads clearly center→edge.
- **SE plains pocket** (10 hexes) left terrain-free; **4 dits** placed there (Germanic/Norse):
  **Krossdum** (J39), **Skarndum** (K38), **Durrok** (L41), **Bramgeld** (M38).
- **Capital hex** for C34 (Brekheim) sits in the 120 core; all core hexes carry terrain now — C34
  clears the one it uses.
- Rebuilt the Gördum groups (grouped by border-sig × terrain-sig; dits are per-hex named groups),
  preserving the C32 region borders. Verified in-app (core + edge clips); **JSON valid; no console
  errors**.
- **Designer sign-off (2026-07-27):** approved "for now" — flagged that **C34 (cities) will make a
  couple of additional changes to this mountain layout** given where cities land. Terrain is expected
  to be revisited during C34; treat these band assignments as the pre-cities baseline.

### Files Changed

- `18dragon.json` `map.hexes` — Gördum groups rebuilt with `terrain` (3 bands) + 4 SE `centerTowns`
  dits; C32 borders preserved. Working file (script-managed via scratchpad `c33-terrain.py`).
- `18xx-maker` fork: `src/data/icons/mtnLow.svg`, `mtnMid.svg`, `mtnHigh.svg` (new; to commit at
  finalize).
