# 18xxMaker rendering cookbook

Practical recipes and gotchas discovered while actually building the board.
Complements the schema reference in `CLAUDE.md` (this file is the "how, in
practice / things we paid to learn"). Add to it whenever a render surprises us.

---

## Positioning — the angle convention

Elements positioned by `angle` + `percent` (labels, values, icons, terrain,
towns) use `angle` in degrees and `percent` = 0 (center) → ~0.9 (edge).

- **Empirically, for `hex.values`: `angle 0` = bottom, `angle 180` = top.**
  (`0`/`360` points at the bottom vertex of a pointy-top hex.) Don't trust a
  mental rotation — render and check.
- Place values/labels to dodge tokens, the 6 track spokes, the city name, and the
  permit letter. For a busy central city, the **bottom hex point** (`angle 0,
  percent ~0.86`) is usually the one clear spot.

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

## Custom art SVGs

See `CLAUDE.md` § *Custom art (SVG) pipeline*. Key gotcha: **no apostrophes** in a
`src/data/art/*.svg` file (comments included) — the vite plugin inlines the SVG
into a single-quoted string and an apostrophe breaks the build. Render via
`hex.shapes`; `background: true` draws under placed tiles.

## Working mode for map / visual content stories

**Propose → render → iterate.** Make one change, screenshot it in the running app
(`.claude/skills/agile-dev/verify-screenshot.mjs` — temp-copy the game into the
fork's `src/data/games/`, shoot, remove), react to what you see, repeat. Don't
batch visual changes blind. Bring naming/placement decisions to the designer.
