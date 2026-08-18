# C51: Resize stickers to the real token dimensions

- **ID:** C51
- **Type:** content
- **Epics:** Game Components
- **Sprint:** sprint-17
- **Status:** done
- **Created:** 2026-08-18

## Story

As the designer,
I want the Cameo token stickers resized to the finalized physical token dimensions
(station 10mm, market/round 12mm),
so that the printed stickers actually fit the 3D-printed token pieces (C52) instead of
the earlier wrong sizes.

## Acceptance Criteria

1. **Station-type stickers = 10mm** (`D_SMALL` 12 → 10): major logo (×4) / home /
   destination tokens, the 30 minor number tokens, and both `+30gp` bonus stickers.
2. **Market-type stickers = 12mm** (`D_LARGE` 15 → 12): each major's share-price marker
   (front + red→black back), each minor's market marker (front + back), and the **round
   marker** — whose existing sticker moves from `D_SMALL` to `D_LARGE` (it rides the
   12mm round-marker disc).
3. **Geometry: only diameters change** (plus the disc-outline removal, below). `REVEAL`
   (0.5mm), `BLEED`, the star stroke, the Cameo no-cut zones, the mixed-size band packer,
   DPI, and registration are all unchanged. (Sticker cut Ø = token Ø − 2·REVEAL → station
   ≈ **9mm**, market ≈ **11mm**.)
   - **The disc outline at the cut line is removed** (designer, 2026-08-18): it exposed a
     ring if the cut was off. The bleed disc carries the color past the cut instead.
4. **Regenerate `print/stickers.{png,_cut.svg,_print_and_cut.svg}`** — the sheet still
   packs (now 12mm + 10mm bands), stays inside the Letter + Cameo safe zones, and the
   cut circles register to the PNG. No overflow to extra pages unless genuinely needed.
5. **Verified at true size** — measured off a rendered sheet: a station sticker ≈ 9mm,
   a market/round sticker ≈ 11mm cut diameter.

## Tasks / Subtasks

- [x] `tools/stickers.py`: `D_SMALL = 10.0`, `D_LARGE = 12.0` (AC: 1, 2, 3)
- [x] Move the `round` MISC entry from `D_SMALL` to `D_LARGE`; leave the two `+30gp`
  entries at `D_SMALL` (AC: 1, 2)
- [x] Update the geometry-knob comments + the `all_tokens()` docstring (12mm/10mm bands,
  not 15/12) so the file's self-description matches (AC: 3)
- [x] Run `python3 tools/stickers.py`; confirm it regenerates `print/stickers.*` with no
  packing/safe-zone error (AC: 4)
- [x] Measure a rendered sticker of each size at true scale (station ≈ 9mm, market ≈ 11mm)
  (AC: 5)

## Dev Notes

**Token spec (designer, 2026-08-18):** station tokens 10mm dia × 10mm cylinders;
market tokens *and* the round marker 12mm dia × 5mm discs; bid cubes 8mm (no sticker).
Stickers sit **flat** on the top face.

**Sticker → token map:**
- `+30gp` bonus stickers → **station size (10mm)** (designer, 2026-08-18).
- round marker → **12mm** (its sticker already exists; just resize).
- The share-price markers keep their front + red→black back pair (a sticker on each
  circular face of the 5mm disc) — unchanged model, new 12mm size.

**Shared spec:** these diameters are the same numbers C52 (STL masters) and C53 (round
tracker slot) build to — the station-token STL is 10mm, the market/round STL 12mm.

**Not in scope:** the STL pieces (C52), the bid cubes (8mm, no sticker), and the
round-tracker resize (C53). This story is the sticker geometry only.

## Validation

- `python3 tools/stickers.py` regenerates `print/stickers.png`, `_cut.svg`, and
  `_print_and_cut.svg` with no error; the sheet packs within the US-Letter + Cameo safe
  zones and the cut circles register to the PNG.
- At true size, station stickers measure ≈ 9mm and market/round stickers ≈ 11mm cut Ø.

## References

- [Source: tools/stickers.py] (C24 generator — geometry knobs `D_SMALL`/`D_LARGE`/`REVEAL`)
- [Source: data/companies.json] (roster/colors)
- [Source: _artifacts/sprints/sprint-17.md] (token spec, sequencing)
- [Source: _artifacts/prd-game.md] §11 (components)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- `tools/stickers.py`: `D_SMALL` 12 → **10.0** (station tokens), `D_LARGE` 15 → **12.0**
  (market tokens + round marker). `REVEAL` and all Cameo/packing machinery unchanged.
- Moved the `round` MISC entry from `D_SMALL` to `D_LARGE` (it's the 12mm disc); the two
  `+30gp` bonus stickers stay at `D_SMALL` (10mm), per the designer.
- Regenerated `print/stickers.{png,_cut.svg,_print_and_cut.svg}` — **173 stickers on 1
  US-Letter sheet** (92 station @10mm: 60 major + 30 minor + 2 `+30gp`; 81 market @12mm:
  20 major f/b + 60 minor f/b + 1 round).
- **Verified true size** from the cut SVG (612×792 pt viewBox): station r=12.756pt =
  **9.0mm** cut Ø, market r=15.591pt = **11.0mm** cut Ø (= token Ø − 2·REVEAL). Rendered
  sheet packs cleanly inside the Letter + Cameo safe zones, cut circles register to the PNG.
- **Removed the disc outline (designer, 2026-08-18):** the `#111111` ring drawn at the
  cut radius sat exactly on the cut line, so an inaccurate cut exposed it. Dropped it
  (removed the second `_disc` + the `DISC_STROKE_MM` knob) — the bleed disc already
  fills the color past the cut, so stickers are cut-safe with no edge circle. Interior
  art (home star, dest stripe, strikeout backs) unchanged.

### Files Changed

- `tools/stickers.py` — `D_SMALL`/`D_LARGE` diameters, round-marker size, comments/docstring.
- `print/stickers.png`, `print/stickers_cut.svg`, `print/stickers_print_and_cut.svg` —
  regenerated at the corrected sizes.
