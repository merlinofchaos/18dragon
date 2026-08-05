# 18Dragon — Claude Context

## Project Overview

**18Dragon** is an 18xx board game with a fantasy theme, designed by E. Halsey Miles.
It is a variant of **1822** (not 1830). The game file is `18dragon.json` in this directory.

- Currency: `#gp` (gold pieces — may be renamed after world design)
- Subtitle: "Railways in a Fantasy Land"
- Players: 2–7
- Bank: 12,000 gp
- Source of truth for 1822 rules/data: `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/`

### Repository layout

- `18dragon.json` — the **18xxMaker game file** (root; loaded via File > Open). A
  *rendering* of the design, not the source of truth.
- `data/` — **tool-agnostic JSON masters** the component generators read:
  `companies.json` (10 majors + 30 minors), `privates.json` (30 privates),
  `trains.json` (train roster).
- `tools/` — component generators. JS decks (`gen-*.mjs`) + shared `cardkit.mjs`;
  `stickers.py` (token stickers). Each reads a `data/` master and writes to `print/`.
- `print/` — **generated components** (committed): `certs-*.html`, `charters-*.html`,
  `private-cards.html`, `train-cards.html`, `stickers.{png,_cut.svg,_print_and_cut.svg}`.
  Rebuild by running the generator with no args (defaults point at `data/` → `print/`).
- `docs/` — deliverable documentation, mockups, reference images (incl. the doodle map).
- `_artifacts/` — agile planning/tracking (backlog, epics, sprints, stories).

## 18xxMaker

### App location
`/Applications/18xx Maker.app`

### Loading a game
The app loads game files via **File > Open** — there is no built-in game browser.
Select `18dragon.json` from this directory.

### Source code
Local checkout: `/Users/earlmiles/Projects/18xx-maker/`

Key paths within the source:
- `src/schemas/` — JSON schema files (game.schema.json, tiles.defs.json, etc.)
- `src/data/games/` — example game JSON files (1858, 1861, 1867, 1889, etc.)
- `src/data/tiles/` — tile definitions
- `src/data/companies/` — company logo data

The `.asar` bundle at `/Applications/18xx Maker.app/Contents/Resources/app.asar`
contains the compiled versions of the above but the source checkout is preferred.

### Reference game
A working 1830 implementation is at `/Users/earlmiles/Projects/Notes/1830.json`.
Useful for understanding field formats in practice.

---

## 18xxMaker JSON Schema — Key Facts

> **Practical recipes & gotchas** (city values, numbered tokens, dits, bridges,
> the angle convention, the render-iterate loop) live in
> **`docs/18xxmaker-cookbook.md`** — check there before hand-deriving a render.
> Add to it whenever a render surprises you.

### Top-level keys (all optional except as noted)
```
info, colors, links, bank, capital, certLimit, floatPercent, tokenTypes,
number_cards, shareTypes, companies, map, phases, players, pools, privates,
rounds, stock, tiles, tokens, turns, trains, upgrades, wip, prototype
```
`minors` is **not** a valid top-level key. Minor companies go in `companies`.

### `info`
```json
{
  "title": "18Dragon",
  "subtitle": "Railways in a Fantasy Land",
  "designer": "E. Halsey Miles",
  "background": "gray",
  "currency": "#gp"
}
```
Currency format: `#` is replaced by the value. So `#gp` → `150gp`.

### `players`
Array of objects with `number`, `certLimit`, `capital`.
1822 values (used as base for 18Dragon):
```json
[
  { "number": 2, "certLimit": 40, "capital": 1000 },
  { "number": 3, "certLimit": 26, "capital": 700 },
  { "number": 4, "certLimit": 20, "capital": 525 },
  { "number": 5, "certLimit": 16, "capital": 420 },
  { "number": 6, "certLimit": 13, "capital": 350 },
  { "number": 7, "certLimit": 11, "capital": 300 }
]
```

### `shareTypes`
Defines certificate structures by name. Major company default (1822 style):
```json
{
  "default": [
    { "quantity": 1, "label": "President's Certificate", "percent": 20, "shares": 2 },
    { "quantity": 8, "percent": 10, "shares": 1 }
  ]
}
```

### `tokenTypes`
Named token cost arrays. First element is always `"Home"` (free), rest are costs:
```json
{
  "two":  ["Home", 40],
  "three": ["Home", 40, 100],
  "four":  ["Home", 40, 100, 100],
  "five":  ["Home", 40, 60, 80, 100]
}
```
Referenced by name in each company's `"tokens"` field.

### `companies`
Array of company objects. Currently empty — to be filled with 18Dragon fantasy companies.
Fields include: `name`, `abbrev`, `logo`, `color`, `tokens` (references a `tokenTypes` key).

### `trains`
Array of train objects. **Required fields**: `name`, `quantity`.

Optional fields:
- `price` (number or string)
- `color` — phase color: `"yellow"`, `"green"`, `"brown"`, `"gray"`
- `rust` — name of train that causes this to rust (e.g. `"3"`)
- `permanent` — boolean, true if train never rusts
- `variant` — name of parent train this is a variant of
- `available` — phase name when this becomes available
- `description` — free text note
- `quantity_label` — override display of quantity
- `discount` — object
- `phased` / `obsolete` — train events

**1822 train roster** (exact, from `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/game.rb`):

| Name | Qty | Price | Rust | Notes |
|------|-----|-------|------|-------|
| L    | 22  | 60    | 3    | Upgrades to 2 for +60gp |
| 2    | 22  | 120   | 4    | Variant of L; shares L quota |
| 3    | 9   | 200   | 6    | |
| 4    | 6   | 300   | 7    | |
| 5    | 3   | 500   | —    | Permanent |
| 6    | 3   | 600   | —    | Permanent |
| 7    | 20  | 750   | —    | Permanent |
| E    | 20  | 1000  | —    | Permanent; variant of 7; doubles city revenue |
| 2P   | 2   | 0     | —    | Permanent; prize only, not purchasable |
| LP   | 1   | 0     | —    | Permanent; prize only, not purchasable |
| 5P   | 1   | 500   | —    | Permanent |
| P+   | 2   | 0     | —    | Permanent Pullman |

### `phases`
Array of phase objects. Fields:
- `name` — phase name (string)
- `on` — train name(s) that trigger this phase (string or array of strings)
- `limit` — train limit; use `"M/N"` pattern for minor/major split (e.g. `"2/4"`)
- `tiles` — highest tile color available: `"yellow"`, `"green"`, `"brown"`, `"gray"`
- `rounds` — number of operating rounds in this phase (integer)
- `notes` — string or array of strings

**1822 phases** (base for 18Dragon):

| Phase | Triggered by | Limit | Tiles | ORs | Notes |
|-------|-------------|-------|-------|-----|-------|
| 1 | (start) | 2/4 | yellow | 1 | |
| 2 | 2 or 3 | 2/4 | yellow | 2 | Concessions may be converted |
| 3 | 3 | 2/4 | green | 2 | Concessions may be converted |
| 4 | 4 | 1/3 | green | 2 | Concessions may be converted |
| 5 | 5 | 1/2 | brown | 2 | Concessions close; minors acquirable from bidbox |
| 6 | 6 | 1/2 | brown | 2 | Full capitalisation |
| 7 | 7 | 1/2 | gray | 2 | Full capitalisation |

### `stock`
- `type`: `"1D"` or `"2D"`
- 1822 uses **`"1D"`** — a flat single-row track
- `par.values`: array of par price options
- `movement`: object with `right`, `left`, `up`, `down` keys (arrays of strings)
- For `"1D"`: `market` is a flat array (not nested)

**Market cell formats:**
- Plain number: `100`
- Par cell: `{ "value": 100, "par": true }`
- Bankrupt zone cell: `{ "value": 45, "legend": 0 }`
- End-of-track cell: `{ "value": 600, "arrow": "up" }`
- Empty cell (non-rectangular grid): `null`

**IMPORTANT — 1D market rotation bug:** In a 1D market, any cell with a `"label"` field
gets rotated 90° (vertical text). This is because `Cell.jsx` checks
`data.type !== "2D" && cell.label` to decide rotation. Plain numbers have no `label`
so they stay horizontal. **Never include `"label"` on 1D market cells** — use `"value"`
only; the renderer uses `value` for display when both are present.

**1822 par values**: `[50, 60, 70, 80, 90, 100]`
- 50 = `p` (peach, minors only, phases 1–7)
- 60–100 = `xp` (red, majors and minors, phases 2–7)

### `map`
Can be a single object or an array of map objects (for games with variant maps).

```json
{
  "map": {
    "hexes": [ ... ]
  }
}
```

**CRITICAL GOTCHA**: `hexes` array **must not be empty**. The renderer calls
`hexes[0].hexes[0]` unconditionally to detect grid orientation. An empty array
causes `Cannot read properties of undefined (reading 'hexes')` crash.
Always keep at least one placeholder hex:
```json
{ "color": "white", "hexes": ["A1"] }
```

#### Hex definition format
Each entry in `map.hexes` is a **group definition** that applies to one or more map cells.
The inner `hexes` array lists the map coordinates that share this definition:
```json
{
  "color": "gray",
  "cities": [ { "name": { "name": "Dragonhaven" } } ],
  "track": [ { "side": 4 }, { "side": 5 } ],
  "hexes": ["D2", "F4"]
}
```

Hex coordinates use letter + number format: `"A1"`, `"B4"`, `"AA12"`, etc.

**Coordinate system (pointy-top hexes, default orientation):**
- Odd-position rows (A, C, E, G...) use **even** column numbers: A2, A4, A6...
- Even-position rows (B, D, F, H...) use **odd** column numbers: B1, B3, B5...
- Visual column N = coordinate col `2N` (odd rows) or `2N-1` (even rows)

**Adjacency for a hex at row R, col C (pointy-top):**
- Odd rows (A,C,E...): neighbors are (prev_row, C-1), (prev_row, C+1), (R, C-2), (R, C+2), (next_row, C-1), (next_row, C+1)
- Even rows (B,D,F...): same pattern

Example — neighbors of D5 (even row):
  C4 (upper-left), C6 (upper-right), D3 (left), D7 (right), E4 (lower-left), E6 (lower-right)

**Hex background colors:**
- `"plain"` — blank/white, standard buildable terrain (most hexes)
- `"water"` — sea/lake, no track allowed
- `"offboard"` — red, off-map destination
- `"gray"` — fixed terrain, no upgrade (permanent cities, blocked terrain)
- `"yellow"`, `"green"`, `"brown"` — pre-placed track tiles
- Custom colors: define in `"colors"` at top level; e.g. `"colors": {"blue": "#2165ae"}`

**Terrain (upgrade cost obstacles):**
```json
"terrain": [
  { "type": "mountain", "cost": 80 }
]
```
Available terrain icon types (from `/src/data/icons/`):
`mountain`, `river`, `swamp`, `tree`, `water`, `cow-skull`, `mining`, `noenter`, `wheat`, `cactus`

If `type` has no matching icon, only the cost text is rendered (useful for hills: `{"cost": 60}`).
All positioning fields (`angle`, `percent`, `side`, `x`, `y`, `size`) are optional.
`size`: `"tiny"`, `"small"`, `"medium"`, `"large"` (default medium).

**Labels (text annotations on hex):**
```json
"labels": [
  { "label": "N", "color": "#56B4E9", "angle": 300, "percent": 0.85, "fontSize": 9 }
]
```
- `angle`: degrees clockwise from top (0 = top-center, 90 = right, 180 = bottom, 270 = left)
- `percent`: 0 = center, 1 = edge. Use ~0.80–0.90 for corner labels.
- `color`: any CSS color or game-defined color name
- `fontSize`: integer ≥ 4

**Cities:**
```json
"cities": [
  { "size": 2, "name": { "name": "Dragonhaven" } }
]
```
- `size` (default 1): number of token slots
- `name.name`: city name string
- `name.reverse`: true = text rendered on dark background
- Position: `angle`, `percent`, `x`, `y`

**Towns and center towns:**
```json
"centerTowns": [{ "name": { "name": "Smallville" } }]
"towns": [{ "angle": 30, "percent": 0.6, "name": { "name": "Hamlet" } }]
```

**Offboard hexes:**
```json
{
  "color": "offboard",
  "track": [ { "type": "offboard", "side": 2 }, { "type": "offboard", "side": 3 } ],
  "offBoardRevenue": {
    "name": { "name": "Far Lands" },
    "revenues": [
      { "color": "yellow", "value": 30 },
      { "color": "green", "value": 40 },
      { "color": "brown", "value": 50 },
      { "color": "gray", "value": 60 }
    ]
  },
  "hexes": ["A22"]
}
```
Track side numbers (pointy-top): 1=left, 2=upper-left, 3=upper-right, 4=right, 5=lower-right, 6=lower-left

**Pre-placed track:**
```json
"track": [ { "side": 3 }, { "side": 5 } ]
```
For gray fixed hexes, list all connected sides. Track `type` options: `"offboard"`, `"sharp"`, `"gentle"`, `"straight"` (default).

**Icons (decorative, non-terrain):**
```json
"icons": [ { "type": "port", "percent": 0.5 } ]
```
Same icon names as terrain. No cost displayed.

### `privates`
Array of private company objects. Currently empty — 18Dragon-specific, to be designed.
Key fields: `name`, `price`, `revenue`, `description`, `hex` (optional home hex coord).

### `pools`
Defines the market pool display and rules notes. Uses `color`, `note`, `icon` fields.

### `rounds`
Round tracker entries. Each has `name` and `color`. Listed in reverse order
(last round first) as this is how the tracker reads:
```json
[
  { "name": "OR2", "color": "brown" },
  { "name": "OR1", "color": "green" },
  { "name": "SR",  "color": "white" }
]
```

### `turns`
Describes the turn sequence for display on reference cards.
Each turn has `name`, `steps` (array), `ordered` (bool), optional `optional` (array).

---

## Custom art (SVG) pipeline (fork feature — sprint-01)

Full-color custom artwork on hexes/tiles, added in the `18dragon` fork (stories D01–D07).

- **Add art:** drop a `.svg` in `src/data/art/`. It auto-compiles to a React component via
  `vite-plugin-fast-react-svg` and is exported as the `art` registry from `src/data/index.js`
  (keyed by filename stem: `ruins.svg` → `art["ruins"]`).
- **Place on a hex:** add to the hex group's `shapes` array:
  `{ "type": "art", "art": "ruins", "width": 34, "background": true }`. Positioning uses the
  standard `angle`/`percent`/`x`/`y`/`rotation` fields; `width` scales it (scale = width/50);
  `opacity` (0–1) works. Note `angle: 0` points to the hex **bottom** (SVG +y is down) — use
  `angle: 180` for the top.
- **Layering:** `background: true` draws **under** the tile/track/tokens; default (foreground)
  draws **over** everything. (`Hex.jsx` splits `hex.shapes` into bg/fg.)
- **Permit letters:** a `hex.labels` entry with `"permit": true` renders in a top-most overlay
  (drawn after everything, outside the tile clip) so a placed tile can't bury it. Non-permit
  labels are unchanged.
- **GOTCHA — no apostrophes in art SVGs (comments included):** `vite-plugin-fast-react-svg`
  inlines the SVG's inner content into a **single-quoted** JS string, so any `'` (e.g. a comment
  like "Dragon's") breaks the build with a `vite:import-analysis` "invalid JS syntax" **500**.
  Keep apostrophes out of `src/data/art/*.svg`.

## Schema Validation Notes

- The app does **not** crash hard on unknown keys but may silently fail schema validation
  and return incomplete game objects. Remove any keys not in the schema.
- `_TODO` placeholder objects (used early in development) are **not valid** — they caused
  the game to fail to load with the map appearing as undefined.
- `null` values in `stock.market` rows are used for empty cells in a non-rectangular
  market grid (confirmed working for the 1822-style stepped market).
- The `phases[n].on` field accepts either a string or an array of strings.
- The `phases[n].limit` field accepts `"M/N"` format for minor/major train limits.

---

## World & Game Design

Design content has moved out of this file into the agile artifacts. This file now
keeps only 18xxMaker schema/technical reference.

- **Game requirements & mechanics** (regions, players, companies, mergers,
  permits, Verantum): `_artifacts/prd-game.md`
- **Tooling requirements** (the 18xxMaker fork): `_artifacts/prd-tooling.md`
- **Worldbuilding** (region cultures, capitals, naming conventions):
  `docs/world-bible.md`
- **Planning & tracking** (backlog, epics, sprints, stories, the workflow):
  `_artifacts/` — start at `_artifacts/workflow.md`

## 18Dragon TODO

### World design needed before implementation
- [ ] Fantasy world regions → map hex layout
- [ ] Major company names, abbreviations, colors, token counts
- [ ] Minor company roster
- [ ] Private company / concession roster

### Implementation pending
- [ ] `map.hexes` — full map (doodle photo: `docs/18xx_Dragon doodle map.jpg`)
- [ ] `companies` — major company definitions
- [ ] `privates` — private companies and concessions
- [ ] Verify/adjust `players` cert limits and capital for 18Dragon variant rules
- [ ] Verify/adjust `stock.market` values if diverging from 1822
- [ ] Verify/adjust `phases` if any 18Dragon-specific rule changes apply
- [ ] Choose final currency name/symbol (currently `#gp`)
- [ ] Set `links.bgg` once the game has a BGG page
