# Sprint 05: Muravel (region S) laid out

- **Status:** complete
- **Created:** 2026-07-27
- **Goal:** Muravel (region S, the southern plains) is laid out on the board as a wide maritime band below the existing regions — its hexes with **M** permit letters, its enclosing coastline (sea on all three outer sides, an interior west lake, an inlet south of Caelimor, an M12-bridge approach to Verantum), light plains terrain with dits, and its cities including the capital Kalavar. Extends the grid downward; placed incrementally.

## Committed stories

View of `sprints.sprint-05.stories` in `sprint-status.yaml` (canonical). All
`stub` — flesh each with `agile-story` before building. **8 points total.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C35 | Muravel (M) — hexes, coastline & permit letters (region footprint) | content | 3 | ✅ done |
| 2 | C36 | Muravel (M) — terrain & dits | content | 2 | ✅ done |
| 3 | C37 | Muravel (M) — cities (capital Kalavar + settlements) | content | 3 | ✅ done |

## Scope notes

**Why these together.** Third mainland region, reusing the proven Caelimor/Gördum
pattern (geo → terrain → cities). Muravel (S) is the **southern** region
(world-bible: Mediterranean/Arabic plains, capital **Kalavar**, vermillion
`#D55E00`), placed as a **wide band below** the existing board with **M** permits.

**New this region — it extends the grid DOWN, and it's maritime.** Caelimor and
Gördum both extended *east* and were coastal-on-one-side / landlocked. Muravel adds
**new rows south of M** (N, O, P…) and is the most water-heavy region yet, so the
footprint story (C35) carries real coastline shaping, not just a land silhouette.

**Split (3-way, per pattern):**
- **C35 (3pts)** — footprint hexes + **M** permit letters + **the enclosing
  coastline**: sea on the W/S/E outer sides, an **interior lake on the west**, an
  **inlet south of Caelimor**, and a **west approach to Verantum** that comes within
  **one hex of the M12 bridge** (the island's second bridge). **East capped at M42**
  (already the furthest-east hex, from Gördum). Region border where it abuts land
  regions (its north edge against Caelimor/Gördum's south borders).
- **C36 (2pts)** — light **plains** terrain (Mediterranean; little/no mountain cost)
  + dits. Lighter than Gördum's mountains — hence 2 pts.
- **C37 (3pts)** — cities incl. the capital **Kalavar** (special-tile city) +
  settlements; region-S minor homes as numbered tokens **25–30**. **Muravel takes
  25–30 (not the next-in-line 19–24); 19–24 is reserved for the remaining region
  (Varstova, E)** so the token numbers stay easy to follow. Global sequence:
  Verantum 1–6 · Caelimor 7–12 · Gördum 13–18 · **Varstova 19–24 (reserved)** ·
  **Muravel 25–30**.

**Sequencing.** C35 first (everything sits on its hexes + needs the coastline
defined) → C36 (terrain/dits on the land) → C37 (cities on top). Same order as
Caelimor/Gördum.

**Designer elicitation captured (2026-07-27):**
- **Wide band, surrounded by sea**; **interior lake on the west**; **east already
  capped at M42**.
- **Coastal on all 3 outer sides**; on the **west it approaches Verantum**, coming
  **one hex from the M12 bridge**; there is an **inlet south of Caelimor**.
- Permit letter **M**; 3-way split; capital **Kalavar**.

**⚠ First elicitation item for C35:** the exact northern tie-in (which of the
existing M-row south borders Muravel abuts vs. where the inlet/sea separates it),
how many rows deep it runs, and the precise coastline/lake/inlet shape — draw against
the doodle map with the designer before laying hexes.

**Deferred / out of scope:** the last mainland region (Varstova E); company/minor
*rosters* (C03/C04) — C37 only places cities; the region-permit *mechanic* (C07);
the M12-bridge-enabling rule (the bridge graphic exists from Sprint 2; the
connection *rule* is separate).

## In-flight changes

- **2026-07-27 · C35 coastline reshaped** over 2 designer edit passes (inlet→land, coast trims,
  east-tip shaping); footprint border added after the shape settled.
- **2026-07-28 · C37 Kalavar spec drift** — elicited as "cream-runnable", built as **yellow** per the
  designer's build-time call (letter **V**, K being taken). Also: 3 offboards + a 9th dit added during
  the cities story (region-tweak churn, accepted-inherent).

## Retrospective

### What went well

- **The per-region pattern held under the hardest region.** Muravel packed more novelty than any prior
  region (first *vertical* grid extension, first mainland offboards, first inland bridge, 10 cities)
  and still flowed through geo→terrain→cities with no rework.
- **Retro-4's tall-viewport tooling paid for itself immediately** — every render used it; the downward
  grid extension was captured with zero throwaway scripts.
- **Retro-4's parity rule worked exactly as designed** — ~7 coordinate typos were caught and resolved
  to valid hexes *before* building, never placing a city on a wrong hex.

### What didn't

- **Parity typos were frequent (~7) and often caught late** — via mid-build script assert failures
  rather than up front — costing extra round-trips. (Designer confirmed visually mapping hexes→coords
  is genuinely hard for them, so this is a *standing* trait, not a fluke.)
- **Offboard spikes wrong on first pass** — one faced water, one land-facing spike was missing; needed
  a designer correction.
- **Minor spec drift** — Kalavar elicited as cream-runnable, built yellow.

### Lessons / workflow adjustments (made real)

1. **Parity PRE-FLIGHT + a reusable checker.** New tool `\.claude/skills/agile-content/check-parity.py`
   validates a whole batch of coords (VALID/INVALID + nearest valid cols). Rule: run it on every
   designer coord batch **before** scripting, and **batch-confirm all typos in one question**. Cookbook
   § *Parity-check…* updated. Turns N round-trips into 1.
2. **Cookbook gotcha — offboard spikes face LAND only** (new § *Offboard hexes*): every spike side must
   face a land neighbour (never water); verify neighbours; a spike may anticipate *future* adjacent
   land (Tarseem→L43). Also: non-monotonic revenue ladders are fine; offboard conversion drops the
   hex's permit + border.
3. **Affirmed working (kept):** tall-viewport rendering, the parity rule, region-tweak-churn-is-inherent.

### Action items

- [x] Build the parity pre-flight checker + document the batch-confirm rule (cookbook).
- [x] Record the offboard-spike land-only gotcha + revenue-ladder notes (cookbook).
- [ ] **Next sprint:** **Varstova (E)** — the last mainland region (hills, NE, capital Varstgrad),
      homes **19–24** (reserved). Finishes the 5-region map before the privates/companies track starts.
