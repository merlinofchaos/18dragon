# C36: Muravel (M) — terrain & dits

- **ID:** C36
- **Type:** content
- **Epics:** World & Map
- **Sprint:** sprint-05
- **Status:** done
- **Created:** 2026-07-27

## Story

As the 18Dragon designer,
I want Muravel's plains "terrain" laid down — no terrain-cost tiles at all, a bridge across the R23 water, and eight dits sprinkled through the band,
so that the southern region reads as open trading plains on top of the C35 footprint, ready for its cities (C37).

## Acceptance Criteria

1. **No terrain costs anywhere in Muravel.** Unlike Gördum (mountains) / Caelimor (hills/river),
   Muravel is **open plains** — **zero** `terrain` cost entries on any Muravel hex. (Its cost profile is
   deliberately flat; the region's challenge is distance/water, not upgrade cost.)
2. **Bridge at R23** — a water-crossing bridge like the two off Verantum (M12, F19). R23 is an
   interior-water hex (from C35); it gets the core **`bridge` icon** so track can cross it, oriented
   **straight W–E** (connecting **R21 land ↔ R25 land**, sides **1–4**).
3. **8 dits** as `centerTowns`, **spread across the plains band** (the plains support higher population
   → more waypoints than Caelimor's 6 / Gördum's 4). Named per Muravel's **Mediterranean/Arabic**
   phonetics (open vowels; optional **al-** prefix; endings **-vel / -sal / -eem**).
4. All dit/bridge hexes keep the **M** permit letter; the region border + coastline (C35) are preserved.
5. `18dragon.json` loads with no schema error/crash; the R23 bridge renders (straight W–E, crossable),
   the 8 named dits show on plains, no terrain-cost text anywhere in Muravel, M permits intact; no
   console errors.

## Tasks / Subtasks

- [x] Confirmed **no `terrain`** entries on any Muravel hex (asserted none in the build script) (AC: 1)
- [x] Placed the **R23 bridge** — `bridge` icon (noCircle) + straight 1–4 orientation spikes, W–E (AC: 2)
- [x] Placed **8 dits** (`centerTowns`) spread across the band; Mediterranean/Arabic names (AC: 3)
- [x] Kept **M** permits + border/coastline intact (dit on a bordered hex preserves its border) (AC: 4)
- [x] Rendered (tall viewport); dits + names + bridge confirmed with designer; no console errors (AC: 5)

## Dev Notes

**Elicitation (designer, 2026-07-27):**
- **No tiles with terrain cost** — Muravel is flat plains; the terrain "story" here is really *dits +
  the one bridge*, not cost obstacles.
- **Bridge at R23**, "like the 2 off Verantum." R23 is water (C35); bridge spans **straight W–E**
  (R21↔R25).
- **8 dits** — "the plains lead to higher populations." Mediterranean/Arabic names.

**Schema / build notes:**
- **Bridge (cookbook § Bridges):** on the R23 **water** hex, use the core bridge **icon**, not the
  `Bridge` atom:
  ```json
  "icons": [{ "type": "bridge", "noCircle": true, "angle": 0 }],
  "track": [{ "type": "offboard", "side": 1 }, { "type": "offboard", "side": 4 }]
  ```
  `angle 0` matches a **1–4 straight**; the offboard-style spikes on sides 1/4 show the straight
  orientation (same as M12/F19). Keep R23 `color: water`.
- **Dits (cookbook § Dits):** each dit = `"centerTowns": [{ "name": { "name": "…" } }]`, **one hex per
  group** (distinct names). Pull 8 Muravel land hexes into their own groups (carrying the M permit),
  spread N→S / W→E across the band. Remaining land stays in the interior group.
- **Proposed dit hexes** (spread; confirm/adjust at build): e.g. **N29, O20, O36, P14, P32, Q26, R31,
  S28** — a scatter across the plains avoiding the coast/lake/bridge.
- **Proposed names** (Mediterranean/Arabic; confirm at build): **Alsabel, Marneem, Kesval, Aldeem,
  Tarsal, Naseem, Alzavel, Qadsal**.
- **No terrain** — nothing to place for AC 1; just verify no `terrain` key exists on Muravel hexes.
- **Script-managed file** — generate the per-hex dit groups + the bridge edit via Python
  load-modify-`json.dump`. Render with the **tall viewport** (`verify-screenshot.mjs … 4600x3600`).

**Boundaries / deferrals:**
- C36 = the bridge + 8 dits (and the explicit no-cost plains) only. **Cities** (capital **Kalavar** +
  settlements + minor homes **25–30**) = **C37**. The **M12-bridge / R23-bridge connection *rules***
  are separate from the graphics.

## Validation

- `18dragon.json` loads in 18xxMaker; Muravel shows flat plains (no cost text), a straight W–E bridge
  crossing R23, and 8 named dits scattered across the band; M permits + border intact; no console
  errors. Screenshot (tall viewport); dit spots + names + bridge reviewed with the designer.

## References

- [Source: docs/world-bible.md — Muravel (S): plains, Mediterranean/Arabic (-vel/-sal/-eem, al-), Kalavar]
- [Recipe: docs/18xxmaker-cookbook.md § Bridges, § Dits, § Rendering the wide map]
- [Pattern: _artifacts/stories/C30-caelimor-terrain-dits.md, C33-gordum-terrain-dits.md]
- [Source: _artifacts/stories/C35 (footprint; R23 water, M permits, border)]
- [Data: 18dragon.json — Muravel groups (rows N–S); Verantum bridges M12/F19]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **No terrain costs** — Muravel is flat plains; the build script asserts zero `terrain` on any Muravel
  group. AC 1 satisfied by verification, not placement.
- **Bridge at R23** — the interior-water hex (C35) pulled into its own `water` group with the core
  **`bridge` icon** (`noCircle`, angle 0) + straight **1–4 orientation spikes** (offboard-style), so it
  reads as a straight **W–E** crossing (R21↔R25), matching the M12/F19 Verantum bridges.
- **8 dits** (Mediterranean/Arabic), spread N→S / W→E off the coast, lake, and bridge:
  **Alsabel** (N15), **Marneem** (O22), **Kesval** (O38), **Aldeem** (P13), **Tarsal** (P29),
  **Naseem** (Q18), **Alzavel** (Q34), **Qadsal** (R27). Each is its own group carrying the M permit
  (and its north border, where applicable — none landed on a bordered hex in the final set).
- **Parity self-catch:** two first-draft dit spots were invalid (P14 wrong parity; S-row is all water)
  — repicked against the actual land set (cookbook parity rule, applied to my *own* proposals).
- Verified in-app (tall viewport); **JSON valid; no console errors.**
- **Deferred:** cities incl. capital **Kalavar** + minor homes **25–30** (**C37**).

### Files Changed

- `18dragon.json` `map.hexes` — 8 Muravel dit groups (`centerTowns`, M permit) + 1 R23 bridge group
  (water + bridge icon + spikes); dit/bridge hexes pulled from the C35 land/water groups. Working file
  (script-managed via scratchpad `c36.py`), not version-controlled.
- *(No fork changes — core `bridge` icon reused.)*
