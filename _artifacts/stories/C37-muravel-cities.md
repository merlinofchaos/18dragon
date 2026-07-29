# C37: Muravel (M) — cities (capital Kalavar + settlements)

- **ID:** C37
- **Type:** content
- **Epics:** World & Map
- **Sprint:** sprint-05
- **Status:** done
- **Created:** 2026-07-27

## Story

As the 18Dragon designer,
I want Muravel's 10 cities placed — the capital Kalavar plus settlements — with three offboard sea-trade destinations and the region's minor homes,
so that the populous southern plains have their destinations on the board on top of the C35 footprint and C36 dits/bridge.

## Acceptance Criteria

1. **10 cities total** in Muravel (the most populous region). 6 host minor homes (**25–30**), 4 open.
2. **Kalavar (capital)** — **cream/plain base but pre-built + runnable while unupgraded** (like
   Brekheim): a `cities` entry (size 1), name **Kalavar**, pre-placed **track + revenue** shown at base
   color, a **special-tile letter**, and a **40gp-style upgrade** treatment if the designer wants
   (confirm). **The letter is "V"** (Kala**v**ar — "K" is taken by Kaeldun; designer-confirmed
   2026-07-27). **Hex + track direction supplied by the designer at build** (as Brekheim was).
3. **9 more cities** — blank cities (`size 1`), named per Muravel's **Mediterranean/Arabic** phonetics
   (open vowels; optional **al-** prefix; endings **-vel / -sal / -eem**). Hexes chosen with the
   designer at build; scattered across the plains.
4. **3 offboard sea-trade destinations** (`color: offboard`, red), each with `offBoardRevenue` +
   an inward `track` side:
   - **O10** (west coast): revenues **yellow 30 / green 50 / brown 40 / gray 30** (rises then falls —
     non-monotonic, as specified). *(O10 is currently Muravel land — converts to offboard.)*
   - **R33** (SE): revenues **yellow 30 / green 40 / brown 50 / gray 60**. *(Designer confirmed **R33**
     2026-07-27 — the original "R34" broke row parity. R33 is currently Muravel land — converts to
     offboard.)*
   - **M42** (SE corner): revenues **yellow 20 / green 30 / brown 50 / gray 70**. *(M42 is currently
     Gördum's bordered SE corner — converts to offboard; "technically not in this region but it's
     fine" per designer.)*
5. All city hexes keep the **M** permit letter (offboards do not); the region border + coastline (C35)
   and the bridge/dits (C36) are preserved.
6. The **6 region-M minors** home in Muravel cities as **numbered tokens 25–30** (Muravel takes 25–30;
   19–24 reserved for Varstova), assigned **north→south**. Which cities host homes chosen at build.
7. `18dragon.json` loads with no schema error/crash; all 10 cities render (Kalavar cream-runnable with
   its track + revenue + alternate letter; 9 named settlements; the 25–30 home tokens), the 3 offboards
   render with their revenue ladders, M permits intact; no console errors.

## Tasks / Subtasks

- [x] Placed **Kalavar** (R21) — yellow, letter **V**, revenue 30, track {2,4} (E leg → R23 bridge →
      Marsal); home token 29 (AC: 2)
- [x] Placed **9 settlement cities** on plains hexes (AC: 3)
- [x] Placed the **3 offboards** — O10/R33/M42 — revenue ladders + land-only spikes (AC: 4)
- [x] Placed the **6 minor home tokens 25–30**, north→south (AC: 6)
- [x] Kept M permits + border/coastline/bridge/dits intact (AC: 5)
- [x] Rendered (tall viewport); iterated placements/names + offboard spikes; no console errors (AC: 7)

## Dev Notes

**Elicitation (designer, 2026-07-27):**
- **10 cities** ("the most populous region").
- **Kalavar** = capital, **cream-runnable** (like Brekheim); **special-tile letter but NOT K** (K used
  by Kaeldun) → pick a different letter. Hex/track to be given at build.
- **3 offboards:** **O10** = 30/50/40/30 (up in green, down in brown, down again in gray); **R33**
  (designer-corrected from "R34") = 30/40/50/60; **M42** = 20/30/50/70 (M42 is Gördum's corner but
  reused here). **Kalavar letter = V** (K taken).

**Schema / build notes:**
- **Kalavar (cream base, runnable):** `color: plain`, `cities:[{size:1,name:{name:"Kalavar"}}]`,
  `track:[…]` (sides from designer), revenue `values:[{value:…}]`, a second `label` = the alternate
  special letter (black, angle ~60, fontSize 18 — Draeven/Brekheim pattern), `tokens:[{label:…}]` for
  its home. Novelty = track + revenue shown at base color (runnable unupgraded). Cf. Brekheim (C34).
- **Offboards (CLAUDE.md § Offboard hexes):**
  ```json
  { "color": "offboard",
    "track": [{ "type": "offboard", "side": <inward> }],
    "offBoardRevenue": { "name": {"name": "…"},
      "revenues": [ {"color":"yellow","value":30}, {"color":"green","value":50},
                    {"color":"brown","value":40}, {"color":"black","textColor":"white","value":30} ] },
    "hexes": ["O10"] }
  ```
  (gray tier uses `"color":"black"` with white text, per the Atlanteum example.) Track side points
  **inward** toward Muravel land. O10 → track east; M42 → track into Gördum/west; R34 → confirm.
  Offboards **replace** whatever's on the hex (O10 land, M42 Gördum land+border, R33 land) — pull them
  out of their current groups; **M42 loses its G permit + border** when it becomes offboard. O10 → track
  east; M42 → track NW (into Gördum/land); R33 → track inward (confirm side at build).
- **Kalavar letter:** used special letters so far = **A, D, K, B**. Propose **"V"** (Kala**v**ar) or
  another distinct capital; confirm at build.
- **Cities/homes:** blank city = `cities:[{size:1,name:{name:"…"}}]`; a home = a `tokens:[{label:"N"}]`
  entry (cookbook). Homes **25–30** north→south across 6 of the 10 cities.
- **Names:** Mediterranean/Arabic (world-bible). Propose at build (e.g. Kalavar + Marvel, Alsheem,
  Tarsan, Qadvel, Nasseem, Alzahra, Sabral, Medeem, Karsal — confirm).
- **Tall viewport** render (`verify-screenshot.mjs … 4600x3600`); script-managed edits.

**Boundaries / deferrals:**
- C37 = the 10 cities + Kalavar + 3 offboards + homes 25–30. This **closes Muravel** (C35 footprint,
  C36 terrain/dits, C37 cities) and Sprint 5. The **offboard/bridge connection *rules*** are separate.
- Only mainland region left after this: **Varstova (E)** — a future sprint.

## Validation

- `18dragon.json` loads in 18xxMaker; 10 Muravel cities render — Kalavar (cream-runnable, alt letter,
  track+revenue), 9 named settlements, homes 25–30 — plus 3 offboards (O10 30/50/40/30, R33 30/40/50/60,
  M42 20/30/50/70) with inward track; M permits + border + bridge/dits intact; no console errors.
  Screenshot (tall viewport); placements + names + offboards reviewed with the designer.

## References

- [Source: docs/world-bible.md — Muravel (S): plains, Mediterranean/Arabic, capital Kalavar, `#D55E00`]
- [Source: _artifacts/prd-game.md#4 Companies (6 minors/region)] · CLAUDE.md § Cities/Labels/Offboard
- [Pattern: _artifacts/stories/C34-gordum-cities.md — Brekheim cream-runnable capital + homes]
- [Source: _artifacts/stories/C35 (footprint, M permits, border), C36 (bridge, dits)]
- [Data: 18dragon.json — Muravel groups (rows N–S); Atlanteum offboard (Verantum) as the format model]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **10 cities** placed (all Mediterranean/Arabic names): **Kalavar** (R21, capital), **Marsal** (R25),
  **Alveem** (N13), **Tarvel** (O20), **Karsal** (N29), **Medeem** (P23), **Sabreem** (O32),
  **Qalvel** (N37), **Nasval** (Q38), **Tazeem** (R31). 3 given by the designer (Kalavar/Marsal/Alveem);
  7 proposed as a spread and approved.
- **Kalavar** — designer specified **yellow** (not the earlier cream-runnable idea): `color: yellow`,
  size-1 city, letter **V** (K taken by Kaeldun), revenue **30**, track **{2 (NW), 4 (E)}**. The E leg
  runs into the **R23 bridge → Marsal (R25)** — a bridge-linked capital/city pair. Home token 29.
- **3 offboards** (red, `offBoardRevenue` + land-only offboard spikes):
  - **Almareem** (O10, west) — **30/50/40/30** (rises then falls); spikes E/SE (O12, P11).
  - **Qasval** (R33, SE) — **30/40/50/60**; spikes W/NW/NE (R31, Q32, Q34).
  - **Tarseem** (M42, SE corner — was Gördum's bordered corner, now offboard) — **20/30/50/70**; spikes
    W/NW/SW + **NE toward the future L43** land (designer's call).
  - Gray tier uses `{"color":"black","textColor":"white"}` (Atlanteum format).
- **Homes 25–30** (north→south, 6 of 10 cities): 25 Alveem, 26 Qalvel, 27 Sabreem, 28 Medeem,
  **29 Kalavar**, 30 Tazeem. Open (no home): Marsal, Tarvel, Karsal, Nasval.
- **Parity self-catch:** designer coords N12/O25/N24/R34 all broke row parity — resolved with the
  designer to N13/O26/N25/R33 (cookbook parity rule).
- **Offboard-spike correction (designer):** spikes must face land only — removed Almareem's water-facing
  NE spike; added Qasval's NE (Q34) and Tarseem's NE (future L43). Verified each spike's neighbor.
- Built propose→render→iterate (tall viewport); **JSON valid; no console errors.**
- **This closes Muravel** (C35 footprint, C36 terrain/dits, C37 cities) **and Sprint 5.** Only mainland
  region left: **Varstova (E)** — homes 19–24 reserved.

### Files Changed

- `18dragon.json` `map.hexes` — 10 Muravel city groups (Kalavar yellow/V/track/value; 9 settlements;
  home tokens 25–30) + 3 offboard groups (O10/R33/M42) + the dit move (O22→O26) + new dit (N25); M42
  pulled from Gördum (lost G permit + border). Working file (script-managed via scratchpad `c37*.py`).
- *(No fork changes.)*
