# C52: Token-piece STL generator (3D-printable)

- **ID:** C52
- **Type:** content
- **Epics:** Game Components
- **Sprint:** sprint-17
- **Status:** done
- **Created:** 2026-08-18

## Story

As the designer,
I want one master 3D-printable STL per physical token type, at the finalized dimensions,
so that I can print the token pieces (duplicating each master on the print bed) that the
C51 stickers ride on.

## Acceptance Criteria

1. **`tools/gen-token-stls.mjs`** (no external deps — pure Node) generates the masters to
   `print/stl/` on a no-arg run.
2. **Three masters, exact dimensions** (units = mm, slicer default):
   - `station-token.stl` — cylinder **Ø10 × 10mm** tall.
   - `market-token.stl` — cylinder **Ø12 × 5mm** tall (serves market markers *and* the
     round marker — same disc).
   - `bid-cube.stl` — **8mm cube**.
3. **Flat tops, no recess, no chamfer** — plain cylinder / plain cube (designer: stickers
   sit flat; one master per type, no plated set).
4. **Watertight, manifold solids** — each cylinder is a closed solid (side wall + top +
   bottom caps); the cube is 12 triangles closed. Cylinders are smooth (≥ 64 facets).
   Every edge shared by exactly two triangles; outward-facing normals.
5. **Valid binary STL** — 80-byte header, `uint32` triangle count, 50 bytes/triangle.
   Parses back cleanly and opens in a slicer/mesh viewer without holes.
6. **Dimensions verified** — the parsed bounding box of each STL equals its spec
   (10×10×10, 12×12×5, 8×8×8mm), sitting on the Z=0 build plate.

## Tasks / Subtasks

- [x] Binary-STL writer: triangle list → `Buffer` (header + count + per-triangle normal +
  3 verts + attr) (AC: 5)
- [x] `cylinder(diameter, height, segments)` → triangles: top cap fan + bottom cap fan +
  side quads (2 tris each), watertight, base on Z=0 (AC: 2, 4)
- [x] `cube(size)` → 12 triangles, base on Z=0 (AC: 2, 4)
- [x] Emit `print/stl/{station-token,market-token,bid-cube}.stl` (mkdir the dir) (AC: 1, 2)
- [x] Validator: re-parse each STL, assert triangle count, bounding box = spec,
  edge-manifold (every edge used exactly twice), and outward normals (AC: 4, 5, 6)

## Dev Notes

**Token spec (designer, 2026-08-18):** station 10mm dia × 10mm cyl; market/round 12mm dia
× 5mm disc; bid cube 8mm (no sticker). Shares the C51 sticker diameters (station-token top
face = the 10mm station sticker; market-token = the 12mm market sticker).

**Binary STL format:** 80-byte header (ignored), `uint32LE` triangle count, then per
triangle: 3× `float32LE` normal, 3× (3× `float32LE`) vertex, `uint16LE` attribute (0).
Little-endian. No external library needed.

**Tessellation:** cylinder with N segments (default 128 for a smooth 10–12mm part) — top
cap as a triangle fan at z=h, bottom cap fan at z=0 (reversed winding), side as N quads
each split into 2 triangles. Keep vertices shared around the ring so the mesh is
watertight. Cube = 6 faces × 2 triangles.

**Output:** `print/stl/` (new subdir, grouped like `print/board-mat-segments/`). One master
each — the designer arrays copies on the print bed; no full plated set.

**Not in scope:** the round-tracker board change (C53); the stickers (C51, done).

## Validation

- `node tools/gen-token-stls.mjs` writes `print/stl/station-token.stl`,
  `market-token.stl`, `bid-cube.stl`.
- Each file is a valid binary STL; re-parsing gives the expected triangle count, a
  bounding box equal to the spec (10×10×10 / 12×12×5 / 8×8×8mm) on Z=0, and passes the
  edge-manifold check (watertight).

## References

- [Source: _artifacts/stories/C51-resize-stickers.md] (shared token diameters)
- [Source: _artifacts/sprints/sprint-17.md] (token spec, sequencing)
- [Source: tools/stickers.py] (the sticker faces these pieces carry)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- **`tools/gen-token-stls.mjs`** (new, pure Node, no deps) writes three binary-STL masters
  to `print/stl/`:
  - `station-token.stl` — Ø10 × 10mm cylinder (512 tris, 128 facets)
  - `market-token.stl` — Ø12 × 5mm cylinder (512 tris) — serves market + round markers
  - `bid-cube.stl` — 8mm cube (12 tris)
- Plain solids, **flat tops, no recess/chamfer**; each sits on the **Z=0 build plate**.
  One master per type (the designer arrays copies on the bed).
- **Validated** by re-parsing each file: exact bounding boxes (10×10×10 / 12×12×5 /
  8×8×8mm), **watertight** (every undirected edge shared by exactly 2 triangles → 0
  non-manifold edges), and **all normals outward** (convex-solid test) — so they slice
  cleanly with no hole/inverted-face fixups.
- Binary STL: 80-byte header, `uint32LE` count, 50 bytes/triangle, little-endian.

### Files Changed

- `tools/gen-token-stls.mjs` — **new** STL generator (binary-STL writer + cylinder/cube).
- `print/stl/station-token.stl`, `print/stl/market-token.stl`, `print/stl/bid-cube.stl` —
  **new** printable masters.
