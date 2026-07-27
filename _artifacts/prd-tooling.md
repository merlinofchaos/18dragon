# 18Dragon — Tooling Requirements (PRD: 18xxMaker Fork)

**Status:** 🚧 skeleton — to be written in a focused pass
**Fork:** `/Users/earlmiles/Projects/18xx-maker` — branch `18dragon`
**Upstream:** `18xx-maker/18xx-maker` (kept on `origin`; not upstreaming)

> Requirements for the *renderer fork*. 18xxMaker is used as a **static reference
> renderer** — it draws the printable game reference; it is not a play engine.
> We forked because upstream can't express a few 18Dragon-specific needs and we
> won't be releasing the maker files.

---

## 1. Why we forked

Upstream 18xxMaker lacks rendering support for several 18Dragon needs, and since
we won't release the maker files, a private fork is cleaner than upstream PRs.

## 2. Capabilities Required

### 2.1 Custom SVG artwork on tiles/hexes

Render arbitrary full-color SVG artwork (fantasy theme) positioned on a hex,
layerable as background or foreground, via named art files.

- **Chosen approach:** named art files in `src/data/art/*.svg`, auto-compiled to
  React components by the existing `vite-plugin-fast-react-svg`, referenced from
  hex JSON (e.g. `{ "type": "art", "art": "dragon" }`), added as a new `Shape` type.
- Status: `art` glob registered in `src/data/index.js`; atom + Shape mapping pending.

### 2.2 Permit letters visible under tiles

The region-permit corner letter must stay visible even when a colored track tile
sits on the hex. Currently the label renders inside the clipped tile-layer group
(`Hex.jsx`) and can be buried. Requirement: promote permit letters to a top-most
per-hex overlay drawn after everything else.

### 2.3 Ruins hex styling (render only)

Render the special ruins hexes with a distinct visual identity so they read as
ruins terrain. The ruins **marker itself** signals that ruins tile-lays are allowed
on the hex; actual placement follows normal tile rules (track must connect, etc.),
covered by the rulebook. No per-hex upgrade-target annotation and no engine-level
upgrade validation — visual only. (Delivered by D07; the earlier "annotate upgrade
targets" story D08 was dropped 2026-07-24 as unnecessary.)

## 3. Constraints & Non-Goals

- **Static reference renderer** — no interactive tile placement, no game engine.
- **Self-contained** — art assets committed to the fork, not fetched at runtime.
- **Prefer additive changes** — keep the renderer upstream-mergeable where cheap;
  new atoms/types over invasive rewrites.
- **Non-goal:** enforcing 18Dragon rules (upgrade legality, metro value math) in code.

## 4. Environment

- pnpm + vite; Node 25. `pnpm start` → http://localhost:3000.
- Build scripts approved via `pnpm-workspace.yaml` `allowBuilds` (fixed on fork).

## 5. Open Questions

_TBD_
