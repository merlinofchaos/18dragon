# C41: Map fine-tuning pass (post-completion tweaks)

- **ID:** C41
- **Type:** content
- **Epics:** World & Map, Verantum
- **Sprint:** backlog (schedule into the next sprint)
- **Status:** done
- **Created:** 2026-07-29

## Story

As the 18Dragon designer,
I want to fine-tune the completed map — shrink Verantum from the north, add a few cities/dits, and relocate a minor home,
so that the finished five-region board reflects the adjustments I see now that it all renders together.

## Acceptance Criteria

### A. Verantum — shrink the island from the north
1. **Remove Verantum's rows C and D entirely** — all island hexes in those rows:
   land **C10, C12, D7, D9, D11, D13** and their water **C6, C8, C14, C16, C18, D5, D15, D17**.
   Row **E** land (E6–E14) becomes the **new north coast**.
2. **Adjust the sea to match** — clean up now-orphaned/mismatched water (e.g. **B11/B13** above the old
   rows; the E-row water **E4/E16/E18**) so the new north coastline reads clean. (Exact sea shape
   propose→render→iterate.) Verantia (H9), Corvium (F17), Ostia (I14), the ruins cluster, and Atlanteum
   (H3) are **unaffected**.

### B. Verantum — new north-coast city + dit
3. **Add a city on the new north coast** (a row-E land hex — propose at build), with a Latin/Roman
   name, and a **dit next to it** (also named). Blank city (`size 1`) unless specified.

### C. Verantum — new gray city at J4 + relocate home 3
4. **Add a gray city at J3** (designer-confirmed; "J4" was invalid parity). The city is:
   - `color: gray`, **2 token holes** (`size 2`),
   - **2 track legs to its two land neighbours** — **side 3 (NE → I4)** and **side 4 (E → J5)**
     (J3's other four sides face water: J1/I2/K2/K4),
   - **values 30 / 40 / 50 / 60**.
5. **Move minor home token 3** from **Verantia (H9)** to this new gray city. Verantia keeps tokens
   **1 & 2** (still a size-4 city, now 2 filled + 2 open). Global home set stays **1–30** (relocated,
   not renumbered).

### D. Caelimor — new city at J27 + dit
6. **Add a city at J27** (Caelimor, free) with a **special-tile letter** — Celtic-ish name; letter must
   be **unused** (avoid permit letters A/N/G/M/V and special letters D/K/B/V/R). Propose name+letter at build.
7. **Add a dit to its southwest at K26** (Caelimor, free), named (Celtic-ish).

### E. Whole-map
8. `18dragon.json` loads with no schema error/crash; the shrunk Verantum + new cities/dits + relocated
   home 3 render; all other regions untouched; minor homes still **1–30**; no console errors.

## Tasks / Subtasks

- [x] Removed Verantum rows C & D (land + water) + B11/B13; added a 1-hex N/W sea layer (AC: 1,2)
- [x] Added north-coast city **Portium** (E10) + dit **Aquilium** (F11) (AC: 3)
- [x] Added gray city **Litoria** (J3): size 2, track {3,4}, 30/40/50/60 ladder (AC: 4)
- [x] Moved home token 3 → Litoria; Verantia (H9) now shows 1,2 (AC: 5)
- [x] Added **Pendrael** (J27, letter P) + dit **Wyndmor** (K26) (AC: 6,7)
- [x] Parity pre-flighted all coords; rendered large-viewport; no console errors (AC: 8)
- [x] **Added scope (designer, mid-sprint):** moved all 5 offboard revenue ladders down clear of
      their spikes; special-tile letters — bridge cities Corvium/Marsal/Alveem/Lavinia → **B**,
      Brekheim **B→H**, Dunmael → **K** (shared with Kaeldun)

## Dev Notes

**Elicitation (designer, 2026-07-29, reviewing the completed map):**
- Shrink Verantum: **remove rows C & D entirely, adjust sea**.
- Add **2 Verantum cities**: one on the **new north coast** (+ a dit beside it); one at **J4**
  (gray, 2 token holes, 2 track to neighbouring lands, 30/40/50/60). **Home 3 moves to the J4 city.**
- Add a **Caelimor city at J27** with a **special-tile letter**, and a **dit to its SW** (K26).

**Coordinate checks (via `check-parity.py`):**
- **J4 → INVALID** (row J = odd cols) → **designer confirmed J3** (free Verantum land). Its two land
  neighbours are **I4 (NE/side 3)** and **J5 (E/side 4)** → the gray city's two track legs.
- **J27** VALID, free Caelimor (N) land. **K26** VALID, free Caelimor (N) land (SW of J27).

**Schema / build notes:**
- **Gray city (J3/J5):** `color: gray`, `cities:[{size:2,name:{name:"…"}}]`, `track:[{side:a},{side:b}]`
  (the 2 legs to land), `values:[{value:30},…]` — wait, gray-city fixed *revenue* uses the offboard-
  style ladder? No — a **gray city** shows a single fixed value per phase via `values` **or** a
  city-revenue mechanism; here the designer wants a **30/40/50/60 ladder** like a fixed-value
  destination. Confirm rendering approach at build (likely a `values` entry per phase, or treat as a
  gray fixed city with the ladder shown). Home token = `tokens:[{label:"3"}]` in one of its 2 slots.
- **Home 3 relocation:** remove the `label:"3"` token from Verantia's `tokens` (H9 → keep 1,2); add it
  to the new gray city.
- **J27 special city:** `cities:[{size:1,name:{…}}]` + a second `label` (the special letter, black,
  angle ~60, fontSize 18 — Draeven pattern), keep the **N** permit. Dit K26 = `centerTowns`.
- **North-coast city (row E):** pick the hex with the designer once C/D removal + sea reshape renders;
  its adjacent dit on a neighbouring row-E/F hex.
- **Sea reshape** is the fiddly part — do it **propose→render→iterate** with the designer; the goal is a
  clean north coast at row E (no orphaned water).
- **Parity pre-flight** every coord before scripting; **large-viewport render**; **script-managed** edits.

**Open items to confirm at build:** the north-coast city hex + its dit hex; all new names (Latin/Roman
for Verantum, Celtic-ish for Caelimor) + J27's special letter; the exact sea adjustments; how the gray
city's 30/40/50/60 ladder is best rendered. *(J3 + its track sides {3,4} are settled.)*

## Validation

- `18dragon.json` loads in 18xxMaker; Verantum is shrunk (rows C/D gone, clean new north coast), with a
  new north-coast city+dit and a gray J3/J5 city (size 2, 2 legs, 30/40/50/60) holding home 3; Verantia
  shows 1,2; Caelimor has a new special-letter city at J27 + a dit at K26; all other regions unchanged;
  homes 1–30 intact; no console errors. Screenshot (large viewport); reviewed with the designer.

## References

- [Source: docs/world-bible.md — Verantum (Latin/Roman), Caelimor (Celtic-ish)]
- [Recipe: docs/18xxmaker-cookbook.md § Parity-check…, § Dits, § Region borders, § Rendering the wide map]
- [Pattern: C27/C01/C28 (Verantum build); C31 (Caelimor special-letter city)]
- [Data: 18dragon.json — Verantum rows C/D; Verantia H9 tokens 1,2,3; Caelimor J27/K26]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Verantum shrunk:** removed rows C & D (land + water) + the orphaned B11/B13 cap; row E is the new
  north coast. Added a **1-hex sea layer** (row-D water D5–D15) wrapping the N coast; the W layer
  already existed → island reads fully sea-wrapped on N/W.
- **New Verantum cities:** **Portium** (E10, plain, north coast) + dit **Aquilium** (F11). **Litoria**
  (J3) — **gray** city, size 2, track {3,4}→I4/J5, **30/40/50/60** revenue ladder (the offboard-style
  ladder renders on a gray city via `offBoardRevenue` — repositioned to `angle 0, percent 0.62` so it
  clears the two token holes). **Home 3 relocated** from Verantia (now 1,2) to Litoria.
- **Caelimor:** **Pendrael** (J27, special letter **P**) + dit **Wyndmor** (K26).
- **Offboard ladder fix (designer):** all 5 offboards' revenue lines overlapped their spikes; moved
  each ladder down (`offBoardRevenue.angle 0, percent 0.35` — below the mid-height side spikes, above
  the bottom-corner spike tips). Verified clear on Atlanteum/Novgorov/Tarseem (all spike patterns).
- **Special-tile letters (designer):** the four **bridge-endpoint** cities Corvium (F17/F19-bridge),
  Marsal (R25/R23), Alveem (N13/M12), Lavinia (L11/M12) → **B**; **Brekheim** moved **B→H** (freeing B
  for the bridge group); **Dunmael** (E20) → **K** (shares Kaeldun's tile). Final letters: B={Corvium,
  Marsal, Alveem, Lavinia}, D=Draeven, H=Brekheim, K={Kaeldun, Dunmael}, P=Pendrael, R=Varstgrad,
  V=Kalavar. No conflicts.
- **Proposed names** (designer-approvable): Portium, Aquilium, Litoria, Pendrael, Wyndmor.
- Parity pre-flighted every coord; homes still **1–30** (3 relocated, none lost). JSON valid; no
  console errors throughout.

### Files Changed

- `18dragon.json` `map.hexes` — Verantum rows C/D removed + N/W sea layer; Portium/Aquilium/Litoria
  (+ Verantia token edit); Pendrael/Wyndmor; 5 offboard ladders repositioned; 6 city special-letter
  changes. Working file (script-managed via scratchpad `c41-*.py`).
- *(No fork changes.)*
