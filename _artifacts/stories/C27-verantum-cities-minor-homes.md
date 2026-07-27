# C27: Verantum island — cities & the 6 minor homes

- **ID:** C27
- **Type:** content
- **Epics:** World & Map, Verantum
- **Sprint:** sprint-02
- **Status:** done
- **Created:** 2026-07-24

## Story

As the 18Dragon designer,
I want the Verantum island's cities finished and its 6 minor-company home locations set,
so that region A has a complete, named city structure ready to host its minors once they're
defined (C04) — without yet committing to ruins values or the emergent second city.

## Acceptance Criteria

1. The **central ruins city** (H9, currently `size 4`, gray) is finished: **named** (the
   Verantum capital, **Verantia**), retains **4 token slots** — **3 hold numbered minor home
   tokens** and **1 is left empty** — and has **track in all 6 directions** (a 6-way hub).
2. A **third outer city** is added to the island (alongside F17 and L11), `size 1`, at a hex
   chosen with the designer, named per Verantum phonetics.
3. The **6 region-A minor homes** are placed as **numbered home tokens 1–6** on the board:
   **3 in Verantia + 1 each in the 3 single outer cities** (F17, L11, new). The board shows the
   **numbers** — minors are identified on the map by number, so no name is needed here.
4. All island cities are **named** (capital Verantia; outer cities honor Verantum's phonetic
   signature from the world-bible).
5. `18dragon.json` loads in 18xxMaker with no schema error/crash; the island renders with **4
   cities** at correct slot counts, the **6 numbered home tokens**, and legible permit "A"
   letters; no console errors.
6. **Deferred / out of scope (noted, not built):** minor **names & certificates** (done at
   certificate time — C04/C25 map numbers 1–6 → names); ruins-city **value / metro** system
   (C08). Major homes are **not printed on the board** — out of scope entirely.

## Tasks / Subtasks

- [x] Name the central city **Verantia**; `size 4`; 3 numbered home tokens (1/2/3) + empty slot;
      **track on all 6 sides** (AC: 1)
- [x] Added **3rd outer city Ostia at I14** (east coast), `size 1` (AC: 2)
- [x] Named outer cities **Corvium** (F17), **Lavinia** (L11) (AC: 4)
- [x] Placed **6 numbered home tokens**: Verantia 1/2/3, Corvium 4, Ostia 5, Lavinia 6 (AC: 3)
- [x] Rendered in 18xxMaker: 4 cities + 6 numbered tokens, "A" letters legible, no console errors (AC: 5)
- [x] Extra (designer, in-session): reduced ruins hexes to a **12-hex cluster** around Verantia
      (rest of island → plain); trimmed water at B7/B9 for title clearance

## Dev Notes

- **Work section-by-section** — every placement/name decision (3rd-city hex, city names, the
  open-slot purpose) goes to the designer *before* it's written. Do not decide autonomously.
- Current island cities: `H9` (size 4, gray, central), `F17` (size 1), `L11` (size 1) — all
  currently unnamed, labelled `A`. This story adds **one** outer city (→ 4 total) and names all.
- **Minors render as numbers.** On the board a minor is shown by its **number** (1–6 for
  region A), not a name — numbered home tokens make them easy to find. Names/certificates are
  assigned later (C04/C25); the map only needs the numbers. Global numbering across all 30
  minors, if it diverges from per-region 1–6, is reconciled in C04.
- **Home math (PRD §4.2 — 6 minors/region):** Verantia holds 3 numbered home tokens (1 of 4
  slots empty) + 3 single outer cities × 1 = **6**. Each region-A minor carries the region-A
  permit (§6.1).
- **Majors are not printed on the board** — out of scope. No major-home slots to reserve; the
  empty Verantia slot is simply left open (no special purpose to assign on the printed board).
- **Naming:** capital = **Verantia** (world-bible §"The Five Regions"); outer-city names should
  honor Verantum's phonetic signature (world-bible §"Naming Conventions"). Bring name options to
  the designer.
- **Second city:** per the corrected PRD §6.2, the second city is an *optional, emergent
  play-time* development — **not** pre-placed. Do not add it to the map; the pre-placed cities
  are the legitimate starting cities.
- Schema: cities use `{ "size": N, "name": { "name": "Verantia" } }`; a numbered home token is a
  `hex.tokens` entry like `{ "label": "1" }` (renders after labels/cities — sits in the city).

## Validation

- `18dragon.json` loads in 18xxMaker without schema error; the Verantum island renders with 4
  named cities at correct slot counts and legible permit letters; no console errors. Screenshot
  (headless harness or File > Open). Design review with the designer on names + placements.

## References

- [Source: _artifacts/prd-game.md#4.2 Minor companies] · [#6.2 Verantum island]
- [Source: docs/world-bible.md — Verantum / capital Verantia / naming conventions]
- [Source: _artifacts/stories/C04 (minor names/certificates — maps numbers 1–6 → identities later)]
- [Ref: /Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/ — 1822 minor home conventions]
- [Data: /Users/earlmiles/Projects/18dragon/18dragon.json — island city hexes H9/F17/L11]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Cities (4):** **Verantia** (H9, central ruins city, size 4, 6-way track, home tokens 1/2/3 +
  one empty slot), **Corvium** (F17, east), **Ostia** (I14, east coast — the added 3rd city),
  **Lavinia** (L11, south). Names are Latin/Roman per the Verantum world-bible.
- **6 minor homes as numbered tokens:** Verantia 1/2/3 · Corvium 4 · Ostia 5 · Lavinia 6. Names/
  certificates deferred to C04/C25 (map shows numbers only).
- **Ruins reduced (designer, iterated in-session):** from ~45 down to a **12-hex cluster** around
  Verantia — final set `G8 G10 H7 H11 I6 I8 I10 J7 J9 J11 K8 K10`. All other island hexes moved to
  a new `plain` group (keeping the region-A "A" permit label). Verantia stays gray; cities stay
  cream `plain`.
- **Water trim:** removed B7/B9 so the game title has clearance.
- **Deferred:** minor names/certs (C04); ruins-city value/metro (C08); **bridges → C28** (next).
- Verified each iteration in the running app (headless harness); JSON valid, no console errors.

### Files Changed

- `18dragon.json` `map.hexes` — added `plain` island group; shrank `ruins` group to 12; named 4
  cities + placed 6 numbered home tokens; Verantia 6-way track; trimmed water B7/B9. (Working
  file, not version-controlled.)
