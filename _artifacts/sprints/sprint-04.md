# Sprint 04: Gördum (region D) laid out

- **Status:** complete
- **Created:** 2026-07-27
- **Goal:** Gördum (region D, the center-north mountains) is laid out on the board east of Caelimor — its hexes with **G** permit letters, three graded bands of mountain terrain (60/80/120gp) with named dits, and its (sparser) cities including the capital Brekheim. Placed incrementally, tying into Caelimor's eastern border.

## Committed stories

View of `sprints.sprint-04.stories` in `sprint-status.yaml` (canonical). All
`stub` — flesh each with `agile-story` before building. **8 points total.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C32 | Gördum (G) — hexes & permit letters (region footprint) | content | 3 | ✅ done |
| 2 | C33 | Gördum (G) — mountain terrain (3 cost bands) & dits | content | 3 | ✅ done |
| 3 | C34 | Gördum (G) — cities (capital Brekheim + sparse settlements) | content | 2 | ✅ done |

**Outcome: 3/3 done, 8/8 points.** Gördum (region D) is fully laid out east of
Caelimor — 55 landlocked hexes with G permits + an S/W/E region border (C32), a
concentric 3-band mountain massif (60/80/120) with graded custom icons + 4 SE dits
(C33), and 7 cities incl. the cream-but-runnable capital Brekheim with its gentle
mountain pass to Kroddheim, homes 13–18 (C34). Second mainland region complete.

## Scope notes

**Why these together.** Second mainland region, immediately reusing the proven
Caelimor pattern (geo → terrain → cities) so the per-region workflow keeps
compounding. Gördum (D) is the **center-north mountains** (world-bible:
dwarven/Norse, capital **Brekheim**), placed **east of Caelimor** with **G**
permits.

**Split — rebalanced from Caelimor (designer elicitation, 2026-07-27):**
- **C32 (3pts)** — footprint hexes + **G** permit letters. Peer-sized to Caelimor
  (~5 across, comparable N–S extent). Its **western edge adjoins Caelimor's
  eastern border** (the black region divider). Reclaims the hexes Caelimor
  deliberately dropped "for the next region over" (K30/L29/M28/M30).
- **C33 (3pts)** — the **heavy** story this sprint (why terrain is split out):
  **three graded bands of mountain terrain — 60 / 80 / 120gp**, heavier down the
  middle in ~3 bands, plus a **custom mountain SVG icon** (new fork work, like the
  hills icons from Sprint 3). Named dits (Germanic/Norse) sprinkled.
- **C34 (2pts)** — the **light** story: **sparser cities** (mountains support
  fewer settlements — ~6–7 vs Caelimor's 9), including the **capital Brekheim**
  (special tile, letter "B") sitting **just south of the region's center** in the
  120gp core band. Region-D minors home as **numbered tokens 13–18** (continuing
  Verantum 1–6 / Caelimor 7–12). Kept lean deliberately — the Sprint-3 retro
  flagged the cities story absorbing extras.

**Sequencing.** C32 first (everything sits on its hexes) → C33 (terrain on those
hexes) → C34 (cities on top). Same order as Caelimor.

**Designer elicitation captured (2026-07-27):**
- Footprint: **similar to Caelimor** (~5 across, comparable extent), east of it.
- Cities: **fewer** (mountains = sparser); Brekheim the special capital.
- Terrain: **3 mountain cost levels — 60/80/120**, roughly 3 bands, heavier down
  the middle; **capital sits very nearly in the middle, slightly south**.
- Permit letter: **G** (not D — keeps clear of Draeven's "D" special-tile letter).

**⚠ First elicitation item for C32:** the exact eastern extent, the western
tie-in to Caelimor's border hexes, and any coastline/offboard edges — draw
against the doodle map with the designer before laying hexes.

**Deferred / out of scope:** the remaining mainland regions (Varstova E, Muravel
S); company/minor *rosters* (C03/C04) — C34 only places cities, not who homes
there; the region-permit *mechanic* rules (C07).

## In-flight changes

- **2026-07-27 · C32 silhouette edge-tuning** — removed C38/F39/G40/H39/I40/J41, added
  E38/M42 to give a staircased SE coast; then added an S/W/E region border (north = map edge).
- **2026-07-27 · C34 designer refinements to Brekheim** — cream base (not yellow) but
  pre-built + runnable unupgraded; +40gp upgrade cost; J37 pass changed sharp→gentle;
  name switched to a straight label to clear the mainline. All render-and-iterate, no re-scope.

## Retrospective

### What went well

- **The per-region pattern transferred cleanly.** The geo→terrain→cities split proven on
  Caelimor (C29–31) ran a second time with **zero rework** — the workflow is now established,
  not just tried once.
- **Front-loaded elicitation paid off again** — band layout (concentric core) and the
  Brekheim/K36 track geometry were gathered before building, so each story started from intent.
- **Reusable geometry generalized** — the staircase-border closure became a **symmetric**
  NW+NE rule; the graded mountain icons extended the custom-icon pipeline a third time.
- **Two real renderer discoveries, both documented** — the `{type:"gentle",side:N}` curved-track
  recipe and the arced-vs-`straight` city-name-offset gotcha.

### What didn't

- **The cities story sprawled again** — C34 absorbed a stream of emergent tweaks (gentle-curve
  fix, 40gp cost, cream-runnable Brekheim, name overlap). **Second region running** where this
  happened (C31 too). Confirmed pattern → **accepted-inherent** (designer, retro 4).
- **The border rule took two passes** — east notches closed first, west staircase caught later.
  Should've been one symmetric rule; now it is (and documented).
- **Parity typos in supplied coords** (J36→J37, L34→L39) cost clarification rounds — inherent to
  designing from a mental map, but catchable up front.
- **Recurring tooling friction** — the dev server went down mid-session (also Sprint 3), and
  ad-hoc scratchpad render scripts got wiped by temp cleanup and had to be recreated.

### Lessons / workflow adjustments (made real)

1. **Render-helper hardened** — `verify-screenshot.mjs` (permanent, in the skill dir) now takes a
   **viewport arg** (`WxH`), so far-east regions (map now spans col 42) are capturable without
   throwaway scratchpad scripts. Cookbook § *Rendering the wide map* documents it.
2. **Symmetric staircase-border rule** — cookbook § *Region borders* now says to close **both**
   NW and NE jut-out notches (was east-only), leaving only the map-edge side open.
3. **Parity-check supplied coords** — cookbook § *Parity-check…* codifies: a coord that breaks
   row/col parity is a typo; propose the nearest valid hex and confirm before building.
4. **Region-tweak churn affirmed inherent** — cookbook § *Working mode* now states cities stories
   routinely reshape terrain + surface new rendering needs; render-and-iterate, don't fight it.

### Action items

- [x] Add viewport arg to `verify-screenshot.mjs` + document (cookbook).
- [x] Document the symmetric staircase-border rule (cookbook).
- [x] Document parity-checking designer coords (cookbook).
- [x] Record the gentle-track recipe + city-name-offset gotcha (cookbook, during C34).
- [x] Commit the graded mountain icons to the fork.
- [ ] **Next sprint:** third mainland region. Candidates — **Varstova (E, hills, NE, capital
      Varstgrad)** or **Muravel (S, plains, south, capital Kalavar)**, built adjacent to the
      done regions. Same geo→terrain→cities split.
