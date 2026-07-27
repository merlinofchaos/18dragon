# C28: Verantum bridge hexes (native bridge rendering)

- **ID:** C28
- **Type:** content
- **Epics:** World & Map, Verantum
- **Sprint:** sprint-02
- **Status:** done
- **Created:** 2026-07-24

## Story

As the 18Dragon designer,
I want the two Verantum bridge hexes marked on the board,
so that players can see where a bridge may be built to cross the water (the enabling private
comes later).

## Acceptance Criteria

1. Hexes **M12** and **F19** (both currently water) are marked as **bridge hexes** using
   18xxMaker's native bridge rendering, visibly distinct on the water.
2. The bridge marker reads clearly on the blue water hex; `18dragon.json` loads with no schema
   error/crash; no console errors.
3. **Deferred:** the bridge-enabling **private** and the bridge **cost** (rules/privates work,
   not this story).

## Tasks / Subtasks

- [x] Pulled M12 and F19 out of the water group into their own bridge groups (AC: 1)
- [x] Added the native **bridge icon** + **offboard-style orientation spikes** (AC: 1,2)
- [x] Rendered; visible on water; no console errors (AC: 2)

## Dev Notes

- Game file `18dragon.json`; bridge hexes **M12**, **F19** (designer, 2026-07-24).
- **Native options:** the `Bridge` atom (`hex.bridges: [{cost, angle, percent}]`) renders a
  **water-colored cost triangle** — designed for a land hex's river edge, so it may blend on a
  full water hex. The `bridge` **icon** (`hex.icons: [{type:"bridge"}]`) is a visible bridge
  graphic. Pick whichever reads clearly on water (verify by render) — flag to designer.
- Cost is omitted (the bridge private sets it — deferred).

## Validation

- `18dragon.json` loads in 18xxMaker; M12 and F19 show a clear bridge marker; no console errors.
  Screenshot.

## References

- [Source: _artifacts/prd-game.md#6.2 Verantum island] · [backlog.yaml C28 note — M12/F19]
- [Code: /Users/earlmiles/Projects/18xx-maker/src/components/atoms/Bridge.jsx; Hex.jsx `hex.bridges`]

## Work Log

### Model Used

claude-opus-4-8[1m]

### Completion Notes

- **Bridge graphic:** used the core `bridge` **icon** (a real bridge glyph, `noCircle`), not the
  `Bridge` atom — the atom renders a water-colored cost *triangle* that blends on water and isn't a
  bridge shape. Designer confirmed they wanted the actual bridge graphic.
- **Orientation spikes:** each bridge hex shows two **offboard-style** spikes (`{"type":"offboard",
  "side":N}`) on the sides of the straight bridge tile — matching the Atlanteum offboard spikes
  (designer preferred these over partial-track stubs).
- **Orientations** (straight tile from the adjacent city): **F19** → 1–4 (west spike at Corvium/
  F17), bridge icon `angle 0`; **M12** → 2–5 (upper-left spike at Lavinia/L11), bridge icon
  `angle 60`.
- **Cost omitted** — set by the bridge-enabling private (deferred, Privates track).
- Verified in-app; JSON valid; no console errors.

### Files Changed

- `18dragon.json` `map.hexes` — pulled M12/F19 from the water group into two bridge groups (bridge
  icon + offboard spikes). Also trimmed water at H1 (island cleanup). Working file, not versioned.
