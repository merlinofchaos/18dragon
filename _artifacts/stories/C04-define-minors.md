# C04: Define the 30 minor companies

- **ID:** C04
- **Type:** content
- **Epics:** Companies, Permits
- **Sprint:** sprint-10
- **Status:** done
- **Created:** 2026-07-30

## Story

As the designer,
I want the 30 minors defined in `companies.json` — each numbered (its home hex),
named with an old-timey-railroad-with-fantasy-twist flavor, tied to its region and
home-region permit, with a couple carrying special powers,
so that the minor roster is complete and ready to feed certs (C25) and the map.

## Acceptance Criteria

1. **30 minors, 6 per region**, in `companies.json` `minors` array, each with:
   - **`number`** (1–30) — the home-token number already on the map (referenced by
     number in play).
   - **`name`** — old-timey railroad name + fantasy twist; **flavor only**,
     **sometimes tied to the home city**. Fits the region's naming convention.
   - **`region`** (A/N/G/M/V) and **`hex`** — from the home-token mapping (below).
   - **`home_city`** — the city on the home hex.
   - **`permit`** — the minor's **home-region permit** (each minor carries it, §6.1).
   - **`color`: none — minor tokens are always white** (record explicitly / omit).
   - **`power`** (optional) — a special ability on the **couple** of minors that
     have one (designer specifies which numbers + the ability at implementation).
2. **No unique colors** — minors are white-token, number-referenced (unlike majors).
3. **Home-token mapping (from `18dragon.json`, do not re-place):**

   | # | Region | Hex | Home city |   | # | Region | Hex | Home city |
   |---|---|---|---|---|---|---|---|---|
   | 1 | A | H9 | Verantia |   | 16 | G | I36 | Brekheim |
   | 2 | A | H9 | Verantia |   | 17 | G | K36 | Kroddheim |
   | 3 | A | J3 | Litoria |   | 18 | G | L33 | Drakgeld |
   | 4 | A | F17 | Corvium |   | 19 | V | D43 | Danilov |
   | 5 | A | I14 | Ostia |   | 20 | V | F41 | Bereshov |
   | 6 | A | L11 | Lavinia |   | 21 | V | I44 | Varstgrad |
   | 7 | N | C24 | Braemael |   | 22 | V | J47 | Miralova |
   | 8 | N | E20 | Dunmael |   | 23 | V | K42 | Zorvar |
   | 9 | N | F29 | Draeven |   | 24 | V | L45 | Ludova |
   | 10 | N | H25 | Gwyndael |   | 25 | M | N13 | Alveem |
   | 11 | N | K18 | Kaeldun |   | 26 | M | N37 | Qalvel |
   | 12 | N | M20 | Taeldun |   | 27 | M | O32 | Sabreem |
   | 13 | G | D33 | Baldrok |   | 28 | M | P23 | Medeem |
   | 14 | G | G34 | Volheim |   | 29 | M | R21 | Kalavar |
   | 15 | G | I32 | Ragnheim |   | 30 | M | R31 | Tazeem |

   (Verantia H9 holds **two** minor homes: #1 and #2.)
4. **Two minors have special powers** (designer 2026-08-04) — "auction safety
   valves" so a company that most needs a card can reach it even if the auction
   buries it. Both trigger **on the minor's first operating turn** and require the
   target private be **neither owned nor currently in a bid box**:
   - **#4 Corvium (F17)** — pay **🪙40** to take a **Bridge Tile** private
     (**P10 The Aurelian Span** or **P11 Halvard's Crossing**). Chosen as the
     Verantum minor adjacent to the **F19** bridge.
   - **#16 Brekheim (I36)** — pay **🪙40** to take a **Mountain Discount** (dwarven
     Mining Troupe) private (**P14 Durgrok Delvers** or **P15 Stonebeard Hewers**).
   All other 28 minors are plain.
5. Output is the **`companies.json`** master (`minors` array; `meta.minors` → 30).
   No `18dragon.json` wiring (map home tokens already exist; company/logo wiring is
   later).

## Tasks / Subtasks

- [ ] Fill `companies.json` `minors` with 30 entries from the mapping (AC: 1, 3, 5)
- [ ] Propose the 30 **names** for designer approval (AC: 1):
  - [ ] Region-convention flavor; tie some to their home city
  - [ ] Present per-region so the designer can react in batches
- [ ] Confirm the **special-power minors** (which numbers + abilities) (AC: 4)
- [ ] Set `meta.minors` = 30; each minor `permit` = its region (AC: 1, 5)
- [ ] Cross-check: 6 per region; numbers 1–30 unique; regions match the mapping (AC: 1)

## Dev Notes

- **Sources:** PRD §4.2 (30 minors, 6/region, each carries home-region permit),
  §6.1 (permits), world-bible §Naming, and the home-token mapping above (extracted
  from `18dragon.json` `tokens` labels).
- **Referenced by number in play** — names are pure flavor. Keep them evocative but
  don't over-invest; the number is the handle.
- **Majors (C03) are done** in the same file — append `minors`; don't touch `majors`.
- **Naming tie-ins:** e.g. Draeven (#9) → a Draeven-named line; Kalavar (#29) is a
  minor even though Meridian Kalavar (MK major) also references the city — that's
  fine (minor flavor vs major abbrev).

## Validation

- `companies.json` valid; 30 minors, 6 per region, numbers 1–30, regions match the
  map; special powers captured; `meta.minors` = 30. `18dragon.json` unchanged.
  Design review with the designer.

## References

- [Source: _artifacts/prd-game.md#4.2 Minor companies], [#6.1 Region permits]
- [Source: docs/world-bible.md#Naming Conventions]
- [Source: 18dragon.json] (home-token numbering 1–30)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Filled `companies.json` `minors` (30) + `meta.minors` = 30. Each: number, name,
  region, home_city, hex, permit (home region), token "white".
- **Names** are placeholder-grade flavor (old-timey railroad + fantasy twist, tied
  to home city, per region convention) — designer expects to approve unless awful.
- **Powers** on **#4 Corvium** (Bridge Tile safety-valve) and **#16 Brekheim**
  (Mountain Discount safety-valve): first-OR, pay 40gp to take the named private if
  neither owned nor in a bid box.
- Checks pass: 30 minors, 6/region, numbers 1–30 unique, powers on 4 & 16.
- No `18dragon.json` wiring (home tokens already on the map).

### Files Changed

- `companies.json` — `minors` array (30) + `meta.minors`.
