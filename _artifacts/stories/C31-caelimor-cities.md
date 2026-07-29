# C31: Caelimor (N) — cities (Draeven + special tiles)

- **ID:** C31
- **Type:** content
- **Epics:** World & Map
- **Sprint:** sprint-03
- **Status:** done
- **Created:** 2026-07-27

## Story

As the 18Dragon designer,
I want Caelimor's 9 cities placed — including the capital Draeven and a second special-tile city,
so that the region's destinations are on the board on top of its hexes (C29) and terrain (C30).

## Acceptance Criteria

1. **9 cities total** in Caelimor.
2. **Draeven (capital)** at **F29**: pre-placed **yellow** tile, **2 token slots** (`size 2`), named
   **Draeven**, with the **special-tile letter "D"**, and track pointing **east, west, southwest**
   (sides 4 / 1 / 6). *(F29 is currently a 20gp hill from C30 — Draeven replaces it.)*
3. **Second special city** at **K18**: named (Celtic-ish), with a **special-tile letter = the first
   letter of its chosen name**.
4. **Normal city at F21** (the hex adjoining the F19 bridge, reserved in C29).
5. **6 more normal cities**, scattered on plain hexes (chosen with the designer at build).
6. All city hexes keep the **N** permit letter; cities are **named** per Caelimor's Celtic-ish
   phonetics (ae/ei; -mor / -dun / -ael).
7. The **6 region-N minors** home in Caelimor cities as **numbered tokens 7–12** (continuing
   Verantum's 1–6), assigned **north→south** (northernmost home = 7). Which cities host homes is
   chosen at build; Draeven's 2 slots may hold a home + an open slot (designer's call at build).
8. `18dragon.json` loads with no schema error/crash; the 9 cities (Draeven's yellow tile + track +
   2 slots, both special letters, the 7–12 home tokens) render; no console errors.

## Tasks / Subtasks

- [ ] Place **Draeven** at F29: `color: yellow`, city + name, `"D"` special letter, track sides 1/4/6;
      pull F29 out of the C30 hill-20 group (AC: 2)
- [ ] Place the **second special city** at K18: city + name + special letter (= name's initial) (AC: 3)
- [ ] Place the **normal city at F21** (AC: 4)
- [ ] Place **6 scattered normal cities** on plain hexes — pick hexes with the designer (AC: 5)
- [ ] Name all cities (Celtic-ish); confirm names/letters with the designer (AC: 6)
- [ ] Place the **6 minor home tokens 7–12** in cities, numbered north→south (AC: 7)
- [ ] Render; iterate placement/names/numbers; confirm no console errors (AC: 8)

## Dev Notes

**Elicitation (designer, 2026-07-27):**
- **9 cities.** 2 special (special-tile letters): **Draeven** = **D** at **F29**, yellow start,
  track E/W/SW. Second special at **K18**, letter = first letter of its name.
- **1 normal** at **F21**. **6 more normal**, scattered "basically randomly."

**Schema / build notes:**
- Draeven: `{"color":"yellow", "cities":[{"size":1,"name":{"name":"Draeven"}}],
  "track":[{"side":1},{"side":4},{"side":6}], "labels":[<N permit>, <"D" special letter>], ...}`.
  The **special-tile letter** is a second `label` (not `permit`) placed clear of the N permit
  (which sits at angle 300) — pick a position at render time.
- Track sides for F29 (even row, odd col): **1** = west, **4** = east, **6** = southwest.
- City size: **Draeven = size 2**; all others default **size 1**.
- Names: Celtic-ish (world-bible). Propose at build (e.g. K18 → "Kaerdun"/K, plus 7 others).

**Minor homes (designer-confirmed):** Caelimor's 6 minors home as **numbered tokens 7–12**
(global sequence after Verantum's 1–6), placed **north→south** (northernmost = 7). Which of the 9
cities host homes is decided at build; a numbered token is a `hex.tokens` entry (see cookbook —
size-4 slot offsets; for size-2 use the two-slot positions).

## Validation

- `18dragon.json` loads in 18xxMaker; 9 Caelimor cities render, Draeven yellow with D + E/W/SW
  track, K18 special with its letter, F21 city, 6 scattered — all named, N permits intact; no
  console errors. Screenshot; designer review of placements + names.

## References

- [Source: docs/world-bible.md — Caelimor (N): capital Draeven, Celtic-ish phonetics]
- [Source: _artifacts/prd-game.md#4 Companies (6 minors/region)] · CLAUDE.md § Cities/Labels
- [Source: _artifacts/stories/C29 (footprint; F21 reserved), C30 (F29 was a hill)]
- [Data: 18dragon.json — Caelimor groups (rows C–M, cols ~19–30)]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **9 cities** (all Celtic-ish names): **Draeven** (F29, capital — yellow, size 2, letter **D**,
  **$30** value, track W/E/SW), **Kaeldun** (K18, special, letter **K**), **Rhydmor** (F21, bridge),
  **Braemael** (C24), **Dunmael** (E20), **Gwyndael** (H25), **Taeldun** (M20), **Caerdun** (D27),
  **Lyrmor** (J21).
- **Minor homes 7–12** (both specials + 4 scattered), numbered north→south: Braemael 7, Dunmael 8,
  Draeven 9, Gwyndael 10, Kaeldun 11, Taeldun 12. Rhydmor/Caerdun/Lyrmor are home-less.
- **In-session additions beyond the base story (designer):**
  - Custom **hill terrain icons** `hills`/`hillsLarge` (committed to the fork `0f2364d6`); C30's
    hills now use them (20gp/40gp).
  - **Region-boundary borders** on the 14 E/S perimeter hexes (thick black divider). Fixed the
    `hex.borders` **named-color** gotcha (hex codes render invisibly). Added side-3 to the 3 jut-out
    hexes (F29/G30/J29).
  - D/K letters enlarged (fontSize 18) vs the permit N; D/30 repositioned on Draeven.
- Built propose→render→iterate over many passes. Verified in-app; JSON valid; no console errors.
- Cookbook updated: terrain custom icons + the border named-color gotcha.

### Files Changed

- `18dragon.json` — 9 Caelimor city groups (Draeven yellow/size-2/track/value; special letters;
  home tokens 7–12); hill terrain now typed `hills`/`hillsLarge`; borders on 14 perimeter hexes.
  (Working file; reformatted by the border script. Not version-controlled.)
- `18xx-maker` fork: `src/data/icons/hills.svg`, `hillsLarge.svg` (committed `0f2364d6`).
- `docs/18xxmaker-cookbook.md` — terrain icons + region-border gotcha.
