# D05: Permit letters → top-most overlay layer

- **ID:** D05
- **Type:** dev
- **Epics:** Permit Overlay, Renderer Foundations
- **Sprint:** sprint-01
- **Status:** done
- **Created:** 2026-07-24

## Story

As the 18Dragon board author,
I want region-permit corner letters to render in a top-most per-hex overlay,
so that they stay visible instead of being buried inside the clipped tile layer when a
colored track tile or hex fill sits on the hex.

## Acceptance Criteria

1. A `hex.labels` entry can be marked as a permit letter via `"permit": true`; such labels
   render in a new per-hex overlay drawn **after all other hex content** — tracks/tiles,
   cities, towns, tokens, terrain, and normal labels.
2. Non-permit labels are **unchanged**: they still render in their current spot/layer. Absence
   of the flag reproduces today's behavior exactly (backward compatible).
3. Permit letters reuse the existing `Label` atom + `Position` (`type: "label"`), so corner
   placement and styling (`angle`, `percent`, `color`, `fontSize`) are identical to a normal label.
4. The overlay is **not** subject to the tile-layer clip group (`hexClipPath`) — the permit
   letter is fully visible regardless of the hex fill or a placed tile's color.
5. Additive change confined to `Hex.jsx` (+ at most a tiny local helper): no new atom (reuses
   `Label`), no changes to `Shape`/`Position` internals, no new dependency.
6. Renders on the 18Dragon map at :3000 with no console errors.

## Tasks / Subtasks

- [x] In `Hex.jsx`, split `hex.labels` into permit vs normal via `R.filter`/`R.reject` on `permit` (AC: 1,2)
- [x] Leave the existing `{labels}` block rendering only the **normal** labels (AC: 2)
- [x] Build a `permits` block: `<Position data={permitLabels} type="label">{(l) => <Label bgColor={hex.color} {...l} />}</Position>` (AC: 1,3)
- [x] Render `{permits}` as the **last** child of the hex output (after `offBoardRevenue`,
      outside the clipped group) so nothing draws over it (AC: 1,4)
- [x] Smoke-test with a temporary `permit: true` label; confirmed it renders on top (AC: 1,6) —
      the full over-placed-tile proof is D06

## Dev Notes

- Fork: `/Users/earlmiles/Projects/18xx-maker`, branch `18dragon`. Static reference renderer,
  additive change (PRD-tooling §2.2, §3).
- **Root cause (PRD §2.2):** `{labels}` renders at `Hex.jsx:169–171` / injected ~`:310`, *inside*
  the `clipPath={hexClipPath}` rotated tile-layer group opened at ~`:283`. Colored tiles/fills in
  that same group can bury a corner letter. The post-clip section (`names`, `shapes`,
  `offBoardRevenue`, ~`:319+`) draws after that group — the correct home for a top-most overlay.
- **Chosen distinguisher:** a `permit: true` flag on `hex.labels` entries (additive, single label
  source, backward compatible). Alt considered — a dedicated `hex.permits` field — rejected to
  avoid a second label source and extra surface; revisit only if permit letters need fields a
  label can't carry.
- Mirror the existing `bgShapes`/`shapes` bg-vs-fg split pattern (`R.filter`/`R.reject`) already
  used for shapes — same idiom keeps it upstream-mergeable.
- Reuse `src/components/atoms/Label.jsx` unchanged; `Position type="label"` keeps auto-positioning
  and corner styling identical.
- The 18Dragon region letters (the "A" corner labels) get migrated to `permit: true` as part of
  the **D06** over-tile proof, not here. D05 delivers the render path only.

## Validation

- `pnpm start` (http://localhost:3000), load `18dragon.json`: a `permit`-flagged label renders,
  positioned/styled like a normal corner letter, with no console errors. Screenshot.
- Definition of Done: mechanism in place; the "stays visible over a placed tile" adversarial
  proof is D06.

## References

- [Source: _artifacts/prd-tooling.md#2.2 Permit letters visible under tiles]
- [Source: _artifacts/stories/D06-... — the paired over-tile proof (stub)]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/Hex.jsx (labels ~169–171/310; clip group ~283; post-clip section ~319+)]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/atoms/Label.jsx]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- `Hex.jsx` only. Split `hex.labels` with `R.reject((l) => l.permit, hex.labels || [])` for the
  existing (clipped) `{labels}` block and `R.filter((l) => l.permit, …)` for a new `permits`
  block, rendered as the **last** child (after `offBoardRevenue`, outside the `hexClipPath` group)
  so nothing draws over it. Guarded `hex.labels || []` since `R.reject/filter` need an array.
- Reuses the `Label` atom + `Position type="label"` unchanged — permit letters keep identical
  corner styling/placement. No new atom, no dependency, backward compatible (no flag = today's
  behavior).
- **Verified** via a temporary A/B game (real `18dragon.json` untouched): two hexes each under a
  large centered dragon shape — one with a **normal** centered label ("N"), one with a **permit**
  centered label ("P"). Result: **P renders on top of the dragon; N is occluded by it** — proving
  the permit overlay draws above foreground content. 49 normal "A" region labels still rendered
  (AC-2 regression clean); **zero console errors** (AC-6).
- Structural confirmation: `{permits}` at `Hex.jsx:344` draws after `{shapes}` (`:341`) and the
  clipped tile-layer group (`:283–317`), so z-order is normal-label < tiles/shapes < permit-label.
- **Boundary with D06:** the decisive "stays visible over a *placed colored track tile*" proof and
  migrating 18Dragon's real "A" region letters to `permit: true` are D06. D05 delivers the render
  path (verified against foreground art as the occluder stand-in).

### Files Changed

- `src/components/Hex.jsx` (split labels into normal/permit; new top-most `permits` overlay) —
  fork repo `/Users/earlmiles/Projects/18xx-maker` (committed `36ec2bbb` on `18dragon`)
