# C34: Gördum (G) — cities (Brekheim + sparse settlements)

- **ID:** C34
- **Type:** content
- **Epics:** World & Map
- **Sprint:** sprint-04
- **Status:** done
- **Created:** 2026-07-27

## Story

As the 18Dragon designer,
I want Gördum's 7 cities placed — the capital Brekheim with its pre-placed mainline, a yellow city linked through a gray pass, a plains city, and 4 more scattered through the mountains,
so that the region's destinations sit on top of its hexes (C32) and terrain (C33), with the mountain layout adjusted where cities land.

## Acceptance Criteria

1. **7 cities total** in Gördum (sparser than Caelimor's 9 — mountains).
2. **Brekheim (capital)** at **I36**: **base cream/plain color** (NOT yellow — it can still be
   *upgraded* to yellow), but **special in shipping pre-built and already runnable while unupgraded** —
   **1 token slot** (`size 1`), named **Brekheim**, **revenue 20**, **special-tile letter "B"**, and
   **straight track NW–SE = sides {2, 5}**. Unlike a normal base city (blank, no track/revenue until a
   tile is laid), Brekheim shows its track + 20 revenue at cream. *(I36 is currently a 120 core hex
   from C33 — Brekheim replaces its mountain terrain.)*
3. **Gray pass** at **J37**: `color: gray`, **no city**, **gentle track {2, 6}** linking Brekheim
   (its NW/side-2 neighbour) to K36 (its SW/side-6 neighbour). *(J37 is currently an 80-ring hex —
   the gray pass replaces its terrain.)*
4. **K36** yellow city: **yellow** pre-placed tile, **1 token slot**, **revenue 20**, track **{3, 4}**
   — **NE (3)** toward the J37 pass + a **straight-east (4)** leg. Named (Germanic/Norse). *(K36 is
   currently an 80-ring hex — the city replaces its terrain.)*
5. **Plains city** at **L39** (in the SE plains pocket, amid the dit cluster). Blank city, `size 1`,
   named.
6. **4 more cities** scattered through the mountains, **not in rows C or F**. Blank cities, `size 1`,
   named; hexes chosen with the designer at build. Placing each **clears that hex's mountain terrain**.
7. All city hexes keep the **G** permit letter; the region border (C32) is preserved. Cities named per
   Gördum's Germanic/Norse phonetics (hard K/G/D/R/B; endings *-heim / -dum / -rok / -geld*).
8. The **6 region-D minors** home in Gördum cities as **numbered tokens 13–18** (continuing Verantum
   1–6 / Caelimor 7–12), assigned **north→south** (northernmost home = 13). Which cities host homes is
   chosen at build.
9. `18dragon.json` loads with no schema error/crash; all 7 cities render (Brekheim cream + {2,5} track
   + B marker + 20 runnable-at-base; the J37 gray pass; K36 yellow + {3,4} + 20; L39 + 4 scattered;
   the 13–18 home tokens); terrain cleared under each city; G permits + border intact; no console errors.

## Tasks / Subtasks

- [x] Place **Brekheim** at I36: cream/plain base, city+name, **B** letter, revenue 20, track {2,5},
      40gp upgrade cost (runnable while unupgraded); cleared the C33 120-core terrain (AC: 2)
- [x] Place the **gray pass** at J37: `color: gray`, single **gentle** arc {side:6}, no city (AC: 3)
- [x] Place **K36** (Kroddheim) yellow city: revenue 20, track {3,4}, name; cleared terrain (AC: 4)
- [x] Place the **L39** plains city (Grimgeld) (AC: 5)
- [x] Place **4 scattered mountain cities** (Baldrok/Volheim/Ragnheim/Drakgeld; **not rows C/F**);
      cleared terrain under each (AC: 6)
- [x] Named all cities (Germanic/Norse), designer-approved (AC: 7)
- [x] Placed the **6 minor home tokens 13–18**, numbered north→south (AC: 8)
- [x] Rendered; iterated placement + gentle-curve + name-overlap fixes; no console errors (AC: 9)

## Dev Notes

**Elicitation (designer, 2026-07-27):**
- **Brekheim** = capital at **I36**: 1 token hole, **straight** track **NW→SE** ({2,5}), **20**
  revenue, **B** special-tile marker. **Base cream/plain color** (upgradeable to yellow), but — unlike
  most base cities — **ships with pre-built track and is runnable while unupgraded** (track + revenue
  show at cream).
- **J37 gray pass** (designer said "J36"; corrected to **J37** — J36 is invalid parity, and Brekheim's
  SE leg → J37): gentle track linking Brekheim to K36.
- **K36 yellow city**: 1 hole, **20** revenue; leg to the pass (NE/3) + **straight-east** (4) → {3,4}.
- **L39 city** (designer said "L34"; corrected to **L39** — L34 is invalid parity).
- **4 more cities** "spread out through the mountains"; **no cities in rows C or F**.

**Geometry (verified against `18dragon.json` parity — odd rows even cols, even rows odd cols):**
- I36 side 5 (SE) → J37; I36 side 2 (NW) → H35. Brekheim {2,5} is a **straight** track. ✓
- J37 side 2 (NW) → I36 (Brekheim); J37 side 6 (SW) → K36. J37 {2,6} = **gentle**. ✓
- K36 side 3 (NE) → J37; K36 side 4 (E) → K38. K36 {3,4}. The J37↔K36 shared edge = J37-s6 / K36-s3. ✓
- L39 sits in the SE plains (C33), adjacent to dits K38/L41/M38 — a plains hub, not a mountain city.

**Terrain edits to C33 (the "couple of changes" the designer flagged at C33 sign-off):** placing these
cities **clears mountain terrain** on their hexes — I36 (was 120), J37 (was 80 → now gray pass), K36
(was 80), and each of the 4 scattered mountain-city hexes. L39 was already plains. Update the C33
terrain groups accordingly (script-managed).

**Schema / build notes:**
- **Brekheim (cream base):** hex stays `color: plain` (no yellow), with a `cities` entry (size 1,
  name), `track: [{side:2},{side:5}]`, a revenue `values` entry (20), and a second `label` (the "B"
  special letter, **not** `permit`), placed clear of the G permit (permit at angle 300). The novelty
  vs a normal blank city: it carries pre-built track + a shown revenue at base color (runnable
  unupgraded). Confirm this renders as intended (revenue on a plain city).
- **K36 (yellow):** pre-placed `color: yellow` tile — `cities` (size 1, name), `track` {3,4}, revenue
  `values` 20. Cf. Draeven's pre-placed yellow in C31.
- The **gray pass** J37: `color: gray`, `track: [{side:2},{side:6}]` (gentle by geometry), no `cities`.
- Blank cities (L39 + 4 scattered): `cities: [{"size":1,"name":{"name":"…"}}]`, no pre-set revenue
  (revenue comes from tiles laid in play).
- **Only one special-tile city** in Gördum (Brekheim/B) — unlike Caelimor's two (Draeven, Kaeldun).
- **Minor homes 13–18:** 6 of the 7 cities host a numbered token (north→south). A numbered home token
  is a `hex.tokens` entry (cookbook — size-1 slot). Decide hosts at build; one or two cities stay
  home-less.
- Names: Germanic/Norse. Propose at build, e.g. K36 → *Kroddheim*, L39 → *Grimgeld*, scattered →
  *Durrheim / Skargrok / Baldrok / Volgeld* (designer confirms).

## Validation

- `18dragon.json` loads in 18xxMaker; 7 Gördum cities render — Brekheim (cream base, {2,5}, B, 20,
  runnable unupgraded), the J37 gray pass ({2,6}), K36 (yellow, {3,4}, 20), L39, and 4 scattered (not
  rows C/F) — terrain cleared beneath each, homes 13–18 present, G permits + region border intact; no
  console errors. Screenshot; placements + names + the terrain edits reviewed with the designer.

## References

- [Source: docs/world-bible.md — Gördum (D): capital Brekheim, Germanic/Norse phonetics, `#E69F00`]
- [Source: _artifacts/prd-game.md#4 Companies (6 minors/region)] · CLAUDE.md § Cities/Labels/Track
- [Pattern: _artifacts/stories/C31-caelimor-cities.md — Draeven yellow special-tile city + homes]
- [Source: _artifacts/stories/C32 (footprint; G permits + border), C33 (terrain bands to edit)]
- [Data: 18dragon.json — Gördum groups (rows C–M, cols ~28–42)]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **7 cities placed** (Germanic/Norse names): **Brekheim** (I36, capital), **Kroddheim** (K36, yellow),
  **Baldrok** (D33), **Volheim** (G34), **Ragnheim** (I32), **Drakgeld** (L33), **Grimgeld** (L39,
  SE-plains hub). The 4 scattered (Baldrok/Volheim/Ragnheim/Drakgeld) chosen as interior hexes spread
  N/W/S, **none in rows C or F**, none adjacent to Brekheim.
- **Brekheim (I36)** — designer refinements applied: **base cream/plain** (upgradeable to yellow) but
  **pre-built + runnable unupgraded**: straight track **{2,5}** (NW–SE), **revenue 20**, **B**
  special-tile letter (black, angle 60, fontSize 18 — Draeven pattern), **40gp upgrade cost**
  (`terrain: mtnHigh cost 40`, placed angle 270/E to clear the token/name/track), home token **16**.
- **J37 gray pass** — the connector. First rendered as a **sharp kink** (two `{side}` stubs meeting at
  center); fixed to a **single gentle arc** `{"type":"gentle","side":6}` (side 6 → connects edges
  6/SW ↔ 2/NW = Kroddheim ↔ Brekheim). Smooth curve now.
- **Kroddheim (K36)** — pre-placed **yellow**, revenue **20**, track **{3,4}** (NE to the pass +
  straight-east), home **17**.
- **Minor homes 13–18** (north→south): Baldrok 13, Volheim 14, Ragnheim 15, Brekheim 16, Kroddheim 17,
  Drakgeld 18. **Grimgeld (L39) is home-less** (plains market).
- **Terrain edits (the C33 "couple of changes"):** I36/J37/K36/D33/G34/I32/L33 mountain terrain
  **cleared** where cities/pass landed (Brekheim keeps a reduced 40 upgrade cost). L39 was already
  plains. C33 bands otherwise intact; region border (C32) + G permits preserved.
- Built propose→render→iterate; verified in-app (region + Brekheim-complex clips). **JSON valid; no
  console errors.**
- **Brekheim name overlap fix (designer, 2026-07-27):** the default *arced* city name collided with
  the NW–SE mainline (label disappeared under the track). Found that **arced city names ignore
  `angle/percent` and `x/y`** — only a **`straight` label honors offsets** (`City.jsx`: `straight`
  nulls the arc path and applies `x`/`y`). Set Brekheim's name `{"straight": true, "x": 26, "y": 4}`
  → shifted up-and-right, clear of the track + token. **Cookbook-worthy gotcha.**

### Files Changed

- `18dragon.json` `map.hexes` — 7 city groups + J37 gray pass added; their C33 terrain removed; grid
  otherwise unchanged. Working file (script-managed via scratchpad `c34-cities.py` + `c34-fix.py`).
- *(No fork changes — C33's `mtnHigh` icon reused for Brekheim's upgrade cost.)*
