# C30: Caelimor (N) — terrain & dits

- **ID:** C30
- **Type:** content
- **Epics:** World & Map
- **Sprint:** sprint-03
- **Status:** done
- **Created:** 2026-07-27

## Story

As the 18Dragon designer,
I want Caelimor's terrain (a river and graded hills) and its dits placed,
so that the region has building-cost texture and small revenue stops on top of its hex footprint (C29).

## Acceptance Criteria

1. A **river** runs across Caelimor's **G row** (G22, G24, G26, G28, G30) — `river` terrain with a
   crossing **cost of 20 gp**.
2. **Hills** cover **most of the eastern side** of Caelimor, mixing **20 gp and 40 gp** costs and
   getting **thicker toward the south** — more hill hexes / more 40s in rows J–M, lighter (20s,
   fewer) toward the north. Hills = **cost-only** terrain (no hill icon exists).
3. **6 dits** (`centerTowns`) are **sprinkled** across Caelimor at spread-out hexes, each **named**
   per Caelimor's Celtic-ish phonetics (ae/ei digraphs; endings -mor / -dun / -ael).
4. `18dragon.json` loads with no schema error/crash; river + hill costs + the 6 named dits render;
   no console errors.
5. Cities (capital **Draeven** + the F19 coastal city) are **C31** — not placed here.

## Tasks / Subtasks

- [x] Added `river` terrain (cost 20) to G22, G24, G26, G28, G30 (AC: 1)
- [x] Added hill terrain — 20gp (7 hexes, north/mid) + 40gp (13 hexes, south) south-thickening gradient (AC: 2)
- [x] Placed **6 named dits** (Celtic-ish): Aeldun, Caermor, Brynael, Maeldun, Faeldun, Vaelmor (AC: 3)
- [x] Rendered; designer reviewed; no console errors (AC: 4)

## Dev Notes

**Elicitation (designer, 2026-07-27):**
- **River across the G row.**
- **Right (east) side = 20/40 hills, getting thicker toward the south.**
- **6 dits, sprinkled fairly randomly, named.**

**Schema:**
- River: `"terrain": [{ "type": "river", "cost": 20 }]` (river icon + cost).
- Hills: `"terrain": [{ "cost": 20 }]` / `{ "cost": 40 }` — no `type` (no hill icon), so only the
  cost text renders (per CLAUDE.md § Terrain).
- Dit: `"centerTowns": [{ "name": { "name": "…" } }]` — **one hex per group** so each dit gets a
  distinct name (see `docs/18xxmaker-cookbook.md`).

**Notes:**
- Caelimor phonetics (world-bible): Celtic-ish — *ae/ei*; endings *-mor, -dun, -ael*. Capital
  **Draeven** is a city (C31); dit names should share the sound (e.g. Aeldun, Caermor, Brynael…).
- **River cost = 20** (designer-confirmed). Hills are a **gradient**; exact hexes and the 20-vs-40
  split get drawn propose→render→iterate with the designer.
- Watch overlaps: a dit hex and a hill hex can coexist, but keep dits legible; the F19-adjoining
  city hex (F21) is reserved for C31 — don't put a dit there.
- Terrain/dits sit on the C29 Caelimor footprint (rows C–M, cols ~19–30); grid already extended.

## Validation

- `18dragon.json` loads in 18xxMaker; the G-row river, the eastern 20/40 hill gradient, and the 6
  named dits all render; no console errors. Screenshot; designer review of costs + names.

## References

- [Source: docs/world-bible.md — Caelimor (N) phonetics; capital Draeven]
- [Source: CLAUDE.md § Terrain; docs/18xxmaker-cookbook.md]
- [Source: _artifacts/stories/C29 (the footprint these sit on)]
- [Data: 18dragon.json — Caelimor `plain` group (rows C–M, cols ~19–30)]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **River:** `river` terrain, **cost 20**, on G22/G24/G26/G28/G30 (renders as the wavy river icon +
  "20gp").
- **Hills** (cost-only terrain, no icon), south-thickening gradient:
  - **20gp** (7): C30, D29, E28, F29, H27, I26, J25 (north/mid, thin band)
  - **40gp** (13): H29, I28, J27, J29, K24, K26, K28, L23, L25, L27, M22, M24, M26 (thick south)
- **6 named dits** (`centerTowns`, Celtic-ish per Caelimor): **Aeldun** C26 · **Caermor** E22 ·
  **Brynael** F27 · **Maeldun** H23 · **Faeldun** J23 · **Vaelmor** L21.
- Implemented by splitting the single Caelimor `plain` group into plain (25) / river / hill-20 /
  hill-40 / 6 dit groups (all keep the N permit label). Backup taken pre-split.
- Verified in-app; JSON valid (149 hex refs, no dupes); no console errors.

### Files Changed

- `18dragon.json` `map.hexes` — Caelimor `plain` group split into 10 groups (plain + river + 2 hill
  + 6 dit). Working file, not version-controlled.
