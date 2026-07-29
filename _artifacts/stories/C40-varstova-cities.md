# C40: Varstova (V) — cities (capital Varstgrad + settlements)

- **ID:** C40
- **Type:** content
- **Epics:** World & Map
- **Sprint:** sprint-06
- **Status:** done
- **Created:** 2026-07-29

## Story

As the 18Dragon designer,
I want Varstova's 9 cities placed — the capital Varstgrad on the river plus settlements — with the region's minor homes,
so that the final region's destinations sit on the board on top of the C38 footprint and C39 river/dits — completing the five-region map.

## Acceptance Criteria

1. **9 cities total** in Varstova: **6 minor-home cities (homes 19–24) — including Varstgrad** — plus
   **3 non-minor-home (open) cities**.
2. **Varstgrad (capital)** is a **plain (cream base) city with a special-tile letter "R"** (vaRstgrad;
   "V" is taken by the permit + Kalavar). It sits **on a river hex** (one of C39's river hexes
   G40/H41/H43/I44/I46/I48 — proposed **I44**, exact hex confirmed at build). It **keeps the river's
   20gp** terrain (the river runs through the capital) and **hosts a minor home** (one of 19–24).
   *Plain city = no pre-placed track/revenue (unlike Brekheim/Kalavar) — just the city + R marker.*
3. **5 more minor-home cities** — blank cities (`size 1`), named (Slavic-ish), hosting the rest of
   **19–24**. Homes numbered **north→south** (northernmost = 19).
4. **3 non-home cities** — blank cities, named, **spread fairly randomly but NOT on the east edge
   (cols ~47/48) or the north edge (row C)**. No home token.
5. All city hexes keep the **V** permit letter; the region border, row-M sea, river, and dits (C38/C39)
   are preserved. Names follow Varstova's **Slavic-ish** phonetics (**-ov / -esh / -var / -ova**).
6. `18dragon.json` loads with no schema error/crash; all 9 cities render (Varstgrad plain + R marker on
   the river, 5 home cities, 3 non-home cities), the 19–24 home tokens present, V permits intact; no
   console errors. **This completes the five-region map.**

## Tasks / Subtasks

- [x] Placed **Varstgrad** on **I44** (river hex): plain city, **R** special letter, kept the 20gp
      river terrain, home token 21 (AC: 2)
- [x] Placed **5 more minor-home cities** (Danilov/Bereshov/Miralova/Zorvar/Ludova), homes 19–24 (AC: 3)
- [x] Placed **3 non-home cities** (Tavesh/Kremova/Ranov), off the east/north edges (AC: 4)
- [x] Assigned **home tokens 19–24** north→south (Danilov 19 → Ludova 24) (AC: 1,3)
- [x] Named all cities (Slavic-ish), designer-approved (AC: 5)
- [x] Rendered; added NE offboard **Novgorov** (40/40/60/60); fixed all offboards' gray tier;
      no errors (AC: 6)

## Dev Notes

**Elicitation (designer, 2026-07-29):**
- **Varstgrad** = capital, **on the river**, a **plain city with a special-tile letter** (→ **R**).
- **3 non-minor-home cities** as well, spread randomly, **not on the east or north edge**.
- **9 cities total**: 6 minor-home (incl. Varstgrad) + 3 non-home.

**Schema / build notes:**
- **Varstgrad (plain + R):** `color: plain`, `cities:[{size:1,name:{name:"Varstgrad"}}]`,
  `terrain:[{type:"river",cost:20}]` (kept — it's on the river), a second `label` = **"R"** special
  letter (black, angle ~60, fontSize 18 — Draeven/Brekheim/Kalavar pattern), `tokens:[{label:"…"}]` for
  its home. **No pre-placed track/revenue** (it's a plain base city, not a Brekheim/Kalavar-style
  pre-built one). ⚠ Watch crowding on the river hex (city circle + R + V permit + 20gp + wavy icon) —
  reposition the value/icon at build if needed.
- **Blank cities:** `cities:[{size:1,name:{name:"…"}}]`; a home = `tokens:[{label:"N"}]` (cookbook).
- **Proposed layout** (confirm/adjust at build; parity-checked):
  - Home cities (N→S, 19–24): **Danilov** (D43, 19), **Bereshov** (F41, 20), **Varstgrad** (I44, 21,
    on river), **Miralova** (J47, 22), **Zorvar** (K42, 23), **Ludova** (L45, 24).
  - Non-home (off E/N edges): **Tavesh** (E44), **Kremova** (G44), **Ranov** (J43).
- **Parity pre-flight:** run all supplied/proposed coords through `check-parity.py` before scripting.
- **Rendering:** large viewport (`5000x3600`) clipped east.
- **Script-managed** — per-hex city/home groups via Python load-modify-`json.dump`; preserve V permits
  and any west border on affected hexes.

**Boundaries / deferrals:**
- C40 = the 9 cities + homes 19–24. **No offboards** in Varstova (none requested). On completion the
  **five-region 18Dragon map is done** — Verantum · Caelimor (N) · Gördum (D) · Muravel (S) ·
  Varstova (E). Global minor-home sequence closes at 1–30.
- Next: the **privates/companies track** (designer already drafting) — a future sprint.

## Validation

- `18dragon.json` loads in 18xxMaker; 9 Varstova cities render — Varstgrad (plain, R, on the river,
  home), 5 home cities, 3 non-home (off E/N edges) — homes 19–24 present, V permits + border + river +
  dits + sea intact; no console errors. Screenshot (large viewport); placements + names + numbers
  reviewed with the designer. **Confirm the full 5-region map reads correctly.**

## References

- [Source: docs/world-bible.md — Varstova (E): hills, Slavic-ish (-ov/-esh/-var/-ova), capital Varstgrad]
- [Source: _artifacts/prd-game.md#4 Companies (6 minors/region)] · CLAUDE.md § Cities/Labels
- [Pattern: C34 (Brekheim capital + homes), C37 (Kalavar + homes 25–30)]
- [Source: _artifacts/stories/C38 (footprint), C39 (river hexes + dits)]
- [Data: 18dragon.json — Varstova groups (rows C–L); river G40…I48]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **9 cities** placed (Slavic-ish names). **Home cities (19–24, N→S):** Danilov (D43, 19), Bereshov
  (F41, 20), **Varstgrad** (I44, 21), Miralova (J47, 22), Zorvar (K42, 23), Ludova (L45, 24).
  **Non-home (off E/N edges):** Tavesh (E44), Kremova (G44), Ranov (J43).
- **Varstgrad** = capital, **plain (cream) city with special-tile letter "R"** (V taken), on the
  **I44 river hex** — **keeps the 20gp river terrain** (river runs through it), home token 21. No
  pre-placed track/revenue (plain base city). Renders cleanly (21 / name / R / 20gp / V permit).
- **NE offboard added (designer):** **Novgorov** (C48, the upper-right corner) — **40/40/60/60**,
  land-only spikes W→C46 + SW→D47.
- **Gray-tier fix (designer):** the rightmost revenue tier on **all** offboards (Almareem, Qasval,
  Tarseem, Novgorov) changed from `{"color":"black","textColor":"white"}` → **`{"color":"gray"}`** to
  match Atlanteum (renders a gray box, not black). Cookbook § Offboard hexes corrected.
- **Parity pre-flight (retro-5):** all 9 city coords ran clean through `check-parity.py`.
- Verified in-app; **JSON valid; no console errors.**
- **🎉 This completes the five-region 18Dragon map** — Verantum · Caelimor (N) · Gördum (D) ·
  Muravel (S) · Varstova (E). Global minor-home sequence 1–30 fully placed.

### Files Changed

- `18dragon.json` `map.hexes` — 9 Varstova city groups (Varstgrad plain/R/river/home; 5 home cities;
  3 non-home) + Novgorov offboard (C48); all offboards' gray tier normalised to `color:gray`. Working
  file (script-managed via scratchpad `c40*.py`).
- `docs/18xxmaker-cookbook.md` — offboard gray-tier note corrected (`gray`, not `black`).
