# 18xxMaker rendering cookbook

Practical recipes and gotchas discovered while actually building the board.
Complements the schema reference in `CLAUDE.md` (this file is the "how, in
practice / things we paid to learn"). Add to it whenever a render surprises us.

---

## Positioning — the angle convention

Elements positioned by `angle` + `percent` (labels, values, icons, terrain,
towns) use `angle` in degrees and `percent` = 0 (center) → ~0.9 (edge).

**The full convention (measured, pointy-top). `angle 0` = bottom; increasing angle
rotates *counterclockwise*:**

| angle | position | | angle | position |
|-------|----------|-|-------|----------|
| **0** | bottom (S) | | **180** | top (N) |
| **60** | lower-left (SW) | | **240** | upper-right (NE) |
| **120** | upper-left (NW) | | **300** | lower-right (SE) |

- Formula: screen offset from center = `(−75·percent·sin θ, 75·percent·cos θ)`
  (x right, y down). `percent` scales the distance out toward the edge.
- The **permit letter** (`angle 300, percent 0.85`) therefore sits at the
  **lower-right (SE)** corner. Put a second label (special-tile letter) somewhere
  else — e.g. `angle 60` (SW) — to keep clear of it.
- These apply to `labels`, `values`, `centerTowns`, `icons`, `terrain`, `towns`
  (anything via `Position`). Values default-auto-position if you omit angle/percent.
- Place things to dodge tokens, the 6 track spokes, and the city name — but you can
  now pick the corner directly instead of guessing.

## City revenue value

```json
"values": [{ "value": 10, "angle": 0, "percent": 0.86 }]
```

A number shown near the city (e.g. a fixed gray city's base value).

## Tokens as numbers (minor homes)

Minor homes are rendered as **numbered tokens**, not named:

```json
"tokens": [{ "label": "1", "x": -25, "y": -25 }]
```

In a **size-4** city the 4 slots sit at the quadrant offsets **(±25, ±25)**.
Place a numbered token in each slot you want filled; omit one to leave it open.

## City name position (the arced-vs-straight gotcha)

A city's name renders on a **curved arc** over the top of the hex by default.
**That arced name ignores position offsets** — `angle`, `percent`, `x`, and `y` on
the `name` object all do *nothing* while it's arced. So if a pre-placed track (or a
neighbouring element) crosses the top of the hex and the name disappears under it,
you *cannot* nudge the arced name out of the way.

**Fix:** set `"straight": true` on the name — a straight label **does** honor `x`
(right +) and `y` (down +). (`City.jsx`: `straight` nulls the arc path, then applies
`x`/`y`; it also auto-raises the label ~32 up.)

```json
"cities": [{ "size": 1, "name": { "name": "Brekheim", "straight": true, "x": 26, "y": 4 } }]
```
Used for Brekheim (I36) — its NW–SE mainline ran straight through the arced name;
switching to a straight label shifted up-and-right cleared it.

## Curved (gentle/sharp) pre-placed track

For a single **curved** track through a hex (e.g. a gray "pass" connecting two
non-opposite sides), use **one** entry with a `type` + a `side`, NOT two straight
`{"side":N}` stubs (two stubs meet in a **sharp V-kink** at center):

```json
"track": [{ "type": "gentle", "side": 6 }]
```
- `type`: `"gentle"` (2 sides apart, e.g. 6↔2) or `"sharp"` (adjacent sides).
- `side` orients it: the renderer rotates by `(side-1)·60°`. For **gentle**,
  `side` = one end; it connects to the side **2 steps clockwise**. `side:6`
  connects edges **6 (SW) ↔ 2 (NW)**; `side:1` → 1(W)↔3(NE); etc.
- Reference examples live in `src/data/games/*.json` (search `"type": "gentle"`).

## Dits (small towns)

A dit = a `centerTowns` entry.

- Nameless (plain dot): `"centerTowns": [{}]`
- Named: `"centerTowns": [{ "name": { "name": "Velia" } }]`
- **One hex per group** when each dit needs a *distinct* name — a group's
  `centerTowns` value applies to every hex in that group.

## Bridges (water crossings)

- **Graphic:** use the core **`bridge` icon**, not the `Bridge` atom:
  ```json
  "icons": [{ "type": "bridge", "noCircle": true, "angle": 0 }]
  ```
  It's an actual bridge glyph.
- **Avoid** the `Bridge` atom / `hex.bridges` on a water hex — it renders a
  **water-colored cost triangle** that blends into the water (it's designed for a
  land hex's river edge, with a cost).
- **Orientation spikes** (which way the straight bridge tile lays): offboard-style
  wedges on the two straight sides —
  ```json
  "track": [{ "type": "offboard", "side": 2 }, { "type": "offboard", "side": 5 }]
  ```
  (matches the offboard-hex spikes; preferred over a partial straight-track stub).
- Bridge-icon `angle` to match the straight: **0** for a 1–4 straight, **60** for
  2–5, **120** for 3–6.

## Terrain (costs, hills, custom terrain icons)

- Terrain = `"terrain": [{ "type": "<icon>", "cost": N }]` — renders the icon + cost.
  Omit `type` for **cost-only** terrain (generic hills before we had an icon):
  `[{ "cost": 40 }]`.
- **River:** `{ "type": "river", "cost": 20 }` (wavy icon + cost).
- **Custom terrain icons** (e.g. hills): drop an SVG in the fork's
  `src/data/icons/*.svg` (auto-registered, same glob as art — so **no apostrophes**),
  then reference it as a terrain `type`. 18Dragon added `hills` (2 gentle humps, used
  at 20gp) and `hillsLarge` (bigger central hump + side hills tucked behind for depth,
  used at 40gp). Commit the icons to the fork.

## Offboard hexes (red destinations) — spikes face LAND only

An offboard hex (`color: offboard`) shows **track spikes** on the sides listed in its
`track: [{ "type": "offboard", "side": N }, …]`. Each spike is a place a train can
enter *from an adjacent hex* — so **every spike side must face a LAND hex** (a plain/
city/track hex), **never water and never empty space**. A spike facing sea is wrong
(retro-5: Almareem/O10 first shipped with a water-facing NE spike).

- **Verify each spike's neighbour** before finalising: for the offboard at (r,c), the
  side→offset map (1=W(0,-2) 2=NW(-1,-1) 3=NE(-1,+1) 4=E(0,+2) 5=SE(+1,+1) 6=SW(+1,-1))
  gives the neighbour hex; assert it's classified land, not `water`/absent.
- **Anticipating future land is OK**: if an adjacent region isn't built yet but *will*
  put land on a side, that spike may be added now (Tarseem/M42 got an NE spike toward
  the not-yet-placed L43 — designer's explicit call). Note it so it isn't mistaken for
  a bug later.
- Revenue ladder: `offBoardRevenue.revenues` = one entry per phase colour —
  `yellow`/`green`/`brown` + the gray tier as **`{"color":"gray","value":N}`** (matches
  Atlanteum; renders a gray box). **Do NOT use `{"color":"black","textColor":"white"}`** for
  the gray tier — that renders a *black* box (retro/late fix in C40; all offboards use `gray`).
  Values need **not** be monotonic (Muravel's Almareem is 30/50/40/30 — rises then falls).
- Converting a land hex to offboard **removes its permit label + any region border**
  (M42 lost its G permit and corner border when it became Tarseem).

## Region borders (dividers between regions)

- `"borders": [{ "side": N, "color": "black" }]` — a thick (~10px) line on a hex side,
  drawn via `Position` (so `side` picks the edge). Good for a region-boundary divider.
- **GOTCHA — border `color` must be a NAMED color** (`"black"`, `"orange"`), **not a
  hex code**. The Border atom resolves color through the *companies* `Color` context,
  which returns nothing for `"#000000"` → the border renders **invisibly**. Named
  colors work.
- Borders are **per-hex**: to border a region perimeter, pull each perimeter hex into
  its own group (carrying its terrain/labels/etc.) + a `borders` array. Compute the
  outward-facing sides where the neighbor hex is undefined.
- **The staircase-closure rule (do this symmetrically or the outline reads *thin*).**
  Border every exposed **straight/diagonal** side (1/4/5/6). But where a coast
  *steps* row-to-row, the outermost hex also exposes a **corner** side that must be
  closed, or the border shows a gap/thin spot at each step:
  - **East coast** that juts east vs. the row above → add **side 3 (NE)**.
  - **West coast** that juts west vs. the row above → add **side 2 (NW)**.
  - Leftover side-2/3 exposures that *don't* jut (the region's true top row) are the
    **map edge** — leave them open.
  Gördum (C32) needed *both* closures; doing only the east side left the west
  staircase visibly thin. The remaining open edge is whichever side is the map
  boundary (north for Gördum).

## Custom art SVGs

See `CLAUDE.md` § *Custom art (SVG) pipeline*. Key gotcha: **no apostrophes** in a
`src/data/art/*.svg` file (comments included) — the vite plugin inlines the SVG
into a single-quoted string and an apostrophe breaks the build. Render via
`hex.shapes`; `background: true` draws under placed tiles.

## `18dragon.json` is script-managed

The map has outgrown hand-formatting (5 regions of hexes). Treat `18dragon.json` as
**tool/script-managed**: it's fine to load-modify-`json.dump` it (one item per line);
don't fuss over preserving compact hand-layout. Per-hex features (borders, distinct
terrain/dits/values) mean **one group per hex** — generate those groups with a Python
script rather than by hand. Targeted `Edit`s still work for small tweaks; match the
current (reformatted) layout.

## Parity-check designer-supplied hex coordinates

The designer places from a **mental map** and finds visually-turning-hexes-into-
coordinates genuinely hard (their words, retro-5), so a batch of coords routinely
contains several that violate the grid's parity (odd rows A/C/E/G/I/K/M/O/Q/S use
**even** cols; even rows B/D/F/H/J/L/N/P/R use **odd** cols). **A coord that breaks
parity is a typo, not a new hex** — the hex simply doesn't exist. Don't silently
build the nearest hex, and don't build the invalid one.

- **PRE-FLIGHT THE WHOLE BATCH (retro-5 rule).** Before writing any map-edit script,
  run every supplied coord through the validator:
  `python3 .claude/skills/agile-content/check-parity.py N12 O25 R34 …`
  It reports VALID / INVALID + the two nearest valid columns. Then **batch-confirm
  all the typos in one question** (with the nearest-valid options), rather than
  discovering them one at a time via failed script asserts. Sprint 5 had ~7 typos in
  one region; pre-flighting turns 7 round-trips into 1.
- Picking the *intended* neighbour also depends on surrounding track/geometry, so
  confirm rather than guess. (Examples caught this way: J36→J37, L34→L39, R34→R33,
  O25→O26, N24→N25, N12→N13.)

## Rendering the wide map (viewport)

The board now spans to ~col 42 (Gördum), **wider than the default 1800px viewport** —
a far-east region is off-screen at default size. Use the enhanced
`verify-screenshot.mjs` with a **viewport arg**:
```
node verify-screenshot.mjs out.png 18dragon '' 2 4400x2800   # slug '' , scale 2, big viewport
node verify-screenshot.mjs out.png 18dragon x,y,w,h 2 4400x2800   # + clip (coords in that viewport)
```
Prefer this permanent helper over ad-hoc scratchpad render scripts — the scratchpad
is wiped by temp cleanup mid-session; the skill-dir helper survives.

## Working mode for map / visual content stories

**Propose → render → iterate.** Make one change, screenshot it in the running app
(`.claude/skills/agile-dev/verify-screenshot.mjs`), react to what you see, repeat.
Don't batch visual changes blind. Bring naming/placement decisions to the designer.

**Region tweaks are expected.** Laying a region's cities routinely reshapes its
terrain and surfaces novel rendering needs (special-city track geometry, label
placement, new mechanics). This is accepted-inherent (affirmed retros 3 & 4) — the
cities story absorbs it; don't try to eliminate the churn, just render-and-iterate.

**The game is symlinked into the fork.** `18xx-maker/src/data/games/18dragon.json`
is a **symlink** to the real `18dragon.json`, so the `/games/18dragon/map` route (how
the designer views it) always reflects the live file — no copy step, and **never
remove it**. If the symlink is missing, recreate it:
`ln -s /Users/earlmiles/Projects/18dragon/18dragon.json 18xx-maker/src/data/games/18dragon.json`
(it's gitignored in the fork). Edits to the real file are live on reload.
