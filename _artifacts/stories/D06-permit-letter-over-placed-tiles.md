# D06: Permit letter stays visible over placed tiles

- **ID:** D06
- **Type:** dev
- **Epics:** Permit Overlay
- **Sprint:** sprint-01
- **Status:** done
- **Created:** 2026-07-24

## Story

As the 18Dragon board author,
I want the region-permit corner letters flagged as permit letters and proven to survive a
placed colored track tile,
so that the exact burying case from PRD §2.2 is demonstrably fixed on the real board.

## Acceptance Criteria

1. 18Dragon's region-permit corner letters (currently the 4 normal `"A"` labels in
   `18dragon.json`) are marked `"permit": true`, so they render via the D05 top-most overlay.
2. **Adversarial proof:** on a hex styled as a placed colored track tile (colored fill + track,
   with track/content overlapping the corner-letter position), the permit letter remains **fully
   visible** (not buried). A control hex with an unflagged label in the same spot is buried by the
   tile — confirming the flag is what saves it.
3. The migrated permit letters render at the **correct corner position and styling** on the actual
   18Dragon map — i.e. the top-most overlay (which draws outside the clipped, rotated tile group)
   places them identically to before for this map. No console errors.
4. No renderer code change expected — D05 provides the mechanism; D06 is the content-flag migration
   plus adversarial verification. If the proof exposes a gap (e.g. rotation offset, or an element
   that still overdraws the letter), **pause and reconcile** rather than patching blindly.

## Tasks / Subtasks

- [x] In `18dragon.json`, add `"permit": true` to each region-A `"A"` label (4 label groups) (AC: 1)
- [x] Confirm all region letters still render correctly on the map (49 render, right corner) (AC: 3)
- [x] Build a temporary placed-tile test: green hex + `track` + a **token disc**, with a permit
      label vs a control normal label at the same center spot (AC: 2)
- [x] Verify in-app: permit letter stays on top of the token; control label is buried; no console
      errors. Screenshot the A/B (AC: 2,3)
- [x] Remove the temporary test hexes (real file kept only the migration; 81 hexes, no dupes) (AC: 1)

## Dev Notes

- Fork: `/Users/earlmiles/Projects/18xx-maker`, branch `18dragon`. Test file:
  `/Users/earlmiles/Projects/18dragon/18dragon.json` (not git-tracked — the migration is a
  working-file content edit; the renderer capability was committed in D05, `36ec2bbb`).
- **Mechanism recap (D05):** labels with `permit: true` render in the `{permits}` block at
  `Hex.jsx:344` — after the clipped tile-layer group (`:283–317`) and all post-clip content — so
  they draw above tiles, tracks, tokens, and normal labels.
- **Current map:** only region **A** is defined (4 `"A"` label groups: the big plain group, F17,
  L11, H9). Migrate all four. Other regions' letters get the flag when those regions are authored
  (content track).
- **No colored track tiles exist yet** (only offboard H3), so the over-tile proof must construct a
  temporary colored+track hex — mirror the D04/D05 verification pattern (temp copy into the fork's
  `src/data/games/`, Playwright screenshot, then remove). Do **not** leave test hexes in the real file.
- **Rotation caveat to check (AC-3):** the `{permits}` overlay renders outside the clipped group's
  `rotate(rotation)`/`rotate(-rotation)` pair. 18Dragon is pointy-top (rotation 0), so placement
  should match exactly — but verify on the real map, since this is the first time the region letters
  render through the overlay path rather than the in-group label path.
- Verified occluder options for AC-2: a colored hex fill sits at the bottom (won't bury), so the
  test tile must include **track and/or tokens** that actually cross the corner-letter position to
  be a fair burying test.

## Validation

- `pnpm start` (http://localhost:3000), load `18dragon.json`: all region-A letters render on top;
  the temporary placed-tile A/B shows permit-on-top vs normal-buried; no console errors. Screenshot.
- Closes the Permit Overlay epic (D05 mechanism + D06 real-board proof).

## References

- [Source: _artifacts/prd-tooling.md#2.2 Permit letters visible under tiles]
- [Source: _artifacts/stories/D05-permit-letters-topmost-overlay.md — the mechanism (committed 36ec2bbb)]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/Hex.jsx (`{permits}` overlay ~:344)]
- [Data: /Users/earlmiles/Projects/18dragon/18dragon.json (4 region-A label groups)]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Migration:** flagged all 4 region-A `"A"` labels `"permit": true` in `18dragon.json`
  (the big plain group, F17, L11, H9). They now render via the D05 top-most overlay.
- **No renderer code change** — D05's mechanism was sufficient (as AC-4 anticipated).
- **Occluder finding:** a city (`cities`) and `track` do **not** bury a normal corner label —
  in the clipped group both render *before* `{labels}`. The elements that render *after* labels
  (and thus bury them) are `tokens`, `terrain`, `icons`. So the fair placed-tile test used a
  **token disc** on a green+track tile. (Worth remembering for future permit/label work.)
- **Adversarial proof (temp game, real file untouched):** two identical green tiles (fill +
  `track` + a token disc over the center), one label normal ("N"), one `permit: true` ("P"),
  both dark so occlusion is pure z-order. Result: **N fully buried under the token; P renders on
  top.** 49 region-A permit letters rendered; **zero console errors**.
- **AC-3 rotation caveat cleared:** 18Dragon is pointy-top (rotation 0); region letters render at
  the correct corner through the overlay path — confirmed on the real map.
- Real `18dragon.json` verified after cleanup: 81 hexes, no duplicates, 4 permit labels, 0 stray
  test hexes. Fork repo untouched (no fork commit for this story).

### Files Changed

- `18dragon.json` (4 region-A labels → `permit: true`) — project working file, not version-controlled
- No fork changes (D05's `Hex.jsx` mechanism, `36ec2bbb`, was sufficient)
