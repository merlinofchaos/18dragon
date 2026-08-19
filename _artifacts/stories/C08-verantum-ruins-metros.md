# C08: Specify the Verantum ruins/metro value system

- **ID:** C08
- **Type:** content
- **Epics:** Rules & Balance, Verantum
- **Sprint:** sprint-18
- **Status:** done
- **Created:** 2026-08-19

## Story

As the designer,
I want the Verantum ruins/metro system captured completely — how ruins hexes develop,
how metros raise a ruins city's value, the costs and caps, and how a second city
emerges — with the PRD §9 Verantum open questions resolved,
so that the rulebook (C22/C23) can lift it. (Capture doc, not finished prose — the bar
is complete/correct rules content.)

## Acceptance Criteria

1. **Deliverable:** append **§2 "Verantum Ruins & Metros"** to
   `docs/signature-mechanics.md` (created in C07). Plain, content-focused.
2. **The central ruins city.** Verantia (H9): **gray, permanent, 4 token slots, base
   value 10gp**. Its value grows only via adjacent **metros**, hard-capped (AC 4).
3. **Metros — the only special ruins tile.** A metro is the **dead-end stub tile**
   (C15): **+10gp** (yellow) → **+20gp** (green value upgrade) or **+10/+10** (green
   branch upgrade). A metro **raises the printed value of the adjacent ruins city** by
   its amount (it is *not* separately-routed stub revenue). Laying the (yellow) metro
   stub **costs 10gp**.
4. **Hard value cap = 100gp.** A ruins city's effective value (base 10 + its metros)
   **can never exceed 100gp**, even if the metros would sum higher.
5. **All other ruins development uses normal tiles.** A ruins hex may also be developed
   into **plain track, a dit, or a town/city** using **regular yellow tiles**, laid and
   upgraded along **normal** paths. A **town tile costs 20gp**; plain track / dit are
   standard-cost. *(Confirm plain/dit are free unless terrain — see Open.)*
6. **Permit + phase gating.** Laying **any new yellow** on Verantum (metro stub, town,
   plain) requires the **region A permit** (per C07) and follows normal phase
   color-gating (yellow in a yellow-legal phase; green upgrades once green is available).
   Green **upgrades** (incl. the metro value/branch upgrades) need no permit.
7. **Commitment.** Once a yellow tile is laid on a ruins hex, it **cannot be switched**
   to another development type — only **upgraded along normal paths** (e.g. a yellow
   metro stub → green value/branch metro; a yellow town → larger city). Standard 1822,
   stated here because ruins hexes start undeveloped.
8. **No "≥1 plain track" rule — it's emergent.** There is **no rule** forcing one of the
   6 hexes around the central city to stay plain track. Because metros are **dead-ends**,
   a route to the ruins city needs at least one **non-metro** connection; metroing all 6
   adjacent hexes strands the city (no runnable route once L-trains rust), so it is
   **self-defeating, not prohibited**. **Correct the PRD §6.2 "at least 1 must become
   plain track" line accordingly.**
9. **The second city — emergent, not a subsystem.** Founding a second city is just
   **laying a yellow town/city tile on a ruins hex** (AC 5): it upgrades normally and can
   **receive metros** pointed at it exactly like the central city (same +values, same
   **100gp hard cap**). It is **never pre-placed** and **not guaranteed** to happen.
10. **PRD reconciliation.** Update PRD §6.2 to the final system (metro = raise-city-value,
    hard cap 100, emergent 1-plain-track, second city = normal town tile) and mark the
    **§9 Verantum open questions resolved** (metro increments via C15; tile-lay rules and
    second-city conditions via this story).

## Tasks / Subtasks

- [x] Write `docs/signature-mechanics.md` §2 covering: central city; metros (values,
  10gp, raise-city-value, cap 100); normal-tile development (plain/dit/city, 20gp city);
  permit+phase gating; commitment; emergent no-all-metros; second city (AC 1–9)
- [x] Correct PRD §6.2: metro raises city value; hard cap 100; drop the "≥1 plain track"
  rule (emergent); second city = normal city tile (AC 8, 10)
- [x] Mark PRD §9 Verantum open questions **resolved** (AC 10)
- [x] Cross-link: C15 (ruins tiles), C07 (permit gate), divergences doc §7 / §5.7b
- [x] Designer review for completeness/accuracy (AC 1–10)

## Dev Notes

**Consolidation + resolution.** The tile *shapes/values* were fixed in **C15** (yellow
stub +10; green value +20; green branch +10/+10). C08 resolves the **§9 open
questions** — the lay rules and the second-city conditions — from the designer's
decisions (2026-08-19):

- **Metro = raises the adjacent ruins city's printed value** by the tile's amount (not
  route-add revenue on the stub). **Hard cap 100gp.**
- **Ruins lays cost a fee:** metro stub **10gp**, town tile **20gp**.
- **Only the metro is a special tile;** plain/dit/town are normal yellow tiles on normal
  upgrade paths. Once laid, a hex is committed to its type (upgrade only).
- **Permit required for new yellow** (all yellow, per C07); normal phase gating.
- **No forced-plain-track rule** — metros are dead-ends, so all-6-metros self-strands the
  city; emergent, not a rule (fixes the PRD wording).
- **Second city = a normal yellow town/city tile** on a ruins hex; upgrades normally,
  takes metros, same 100 cap. Not special, not pre-placed.

**Reconcile with C15's framing:** C15 described the stub as "adds revenue to a route
reaching it" — the designer's model is cleaner: the metro **adds its value to the
adjacent city's printed value**. The C15 *tiles* stand; C08 pins the *mechanic*.

**Central-city facts** (gray, 4-slot, base 10, Verantia H9) come from the map / C15 —
restate, don't redesign.

**Open items — resolved (designer, 2026-08-19):**
- Plain track / dit lay cost = **standard (free unless terrain)**; only metro (10gp) and
  city (20gp) carry fees. ✅
- The second city is founded by a **yellow city tile (a token slot), 20gp** — **not a
  dit** (dits don't upgrade to cities). Same **100gp** cap; upgrades along normal city
  paths. ✅

**Scope:** Verantum ruins/metro only. The island's map layout (hexes, bridges, the two
pre-placed minor-home cities) is already built (C01/C27/C28/C41) — not redone here.

**Deliverable location:** `docs/` (never `_artifacts/`).

## Validation

- `docs/signature-mechanics.md` §2 fully specifies the ruins/metro system; PRD §6.2 is
  corrected and §9 Verantum questions marked resolved. Designer confirms complete and
  accurate — no invented rules, nothing intended left out; the "≥1 plain track" line is
  fixed to emergent.

## References

- [Source: _artifacts/prd-game.md#6.2 Verantum island — ruins & metros]
- [Source: _artifacts/prd-game.md#9 Open Questions (Verantum)]
- [Source: _artifacts/stories/C15-tile-set-manifest.md] (the 3 ruins tiles + central city)
- [Source: docs/divergences-from-1822.md §7 Verantum / §5.7b ruins tile lays]
- [Related: C07 (permit gate — new yellow on Verantum needs the A permit)]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

**Deliverable:** wrote `docs/signature-mechanics.md` **§2 Verantum Ruins & Metros** —
central city (gray, 4-slot, base 10); developing a ruins hex (plain / dit / city 20gp /
metro 10gp, with permit+phase gating and commitment); metros raise the adjacent city's
printed value (+10 yellow / +20 green value / +10+10 green branch), **hard cap 100gp**;
the emergent no-all-metros consequence; and the second city as a normal yellow city tile.

**§9 open questions resolved.** Both PRD §9 Verantum questions are answered: metro
increments (from C15's tiles) and the tile-lay rules + second-city conditions (this
story). The system came out **much simpler** than the PRD implied — the *only* special
tile is the metro stub; everything else is normal 1822 tiles on normal paths.

**Key resolutions (designer, 2026-08-19):**
- Metro **raises the adjacent city's printed value** (not route-add stub revenue); hard
  cap **100gp**.
- Lay fees: **metro 10gp, city 20gp**; plain/dit standard (free unless terrain).
- Second city = a **yellow city tile (token slot), 20gp** — not a dit; dits never upgrade
  to cities. Same 100 cap, normal upgrade paths.
- **No "≥1 plain track" rule** — emergent (dead-end metros strand a fully-ringed city).
  Corrected the PRD wording.

**Reconciliations:** PRD §6.2 rewritten to the final system; PRD §9 Verantum marked ✅
resolved. C15's tiles stand; C08 pinned the *mechanic* (raise-city-value) over C15's
looser "adds route revenue" framing.

### Files Changed

- `docs/signature-mechanics.md` — new **§2 Verantum Ruins & Metros** (the deliverable).
- `_artifacts/prd-game.md` — §6.2 rewritten to the final system; §9 Verantum resolved.
