# C48: Resize cert deck to 67×44mm (adapt existing design)

- **ID:** C48
- **Type:** content
- **Epics:** Game Components
- **Sprint:** sprint-16
- **Status:** done
- **Created:** 2026-08-17

## Story

As the designer,
I want the certificate deck resized from 89×55mm to **67×44mm** (the shared card
size used by privates, trains, and the bid-box centers), keeping the liked
mockup-driven design,
so that all card decks are one size and can print together (C49).

## Acceptance Criteria

1. **Card size = 67×44mm** in `gen-certs.mjs` (was 89×55). All cards (major
   president, major regular, minor) at the new size.
2. **New print-cut grid** for 67×44 landscape on US-Letter portrait — e.g. **3×6 =
   18/page** (was 2×4=8) — with the existing crop-mark / no-border print-cut
   treatment preserved.
3. **Design adapted, not redesigned.** Keep the approved layout (left color **band**
   with stripe + logos/number badge; right **main** with company name,
   President's-bar / permit-bar, and the shares + % footer). Re-proportion the band
   width, logo/badge size, and font sizes to fit 67×44 without clipping or crowding.
4. **Both decks** — `certs-major.html` (10 majors × 9) and `certs-minor.html` (30
   minors) — regenerate cleanly and open/print without layout breakage.
5. **Renders verified** — a major president, a major regular, and a minor cert each
   render legibly at 67×44 (checked at real size, not just thumbnail).

## Tasks / Subtasks

- [ ] Change `CW/CH` 89/55 → 67/44; recompute the grid (COLS/ROWS, margins,
  crop marks) for 67×44 on Letter portrait (AC: 1, 2)
- [ ] Re-proportion the `.band` width, `.logos`/`.numbadge`/`.clogo` sizes, and the
  `.cname`/`.presbar`/`.permitbar`/`.foot` font sizes for the smaller card (AC: 3)
- [ ] Regenerate both decks; render major-president, major-regular, minor at real
  size and adjust until legible/clean (AC: 4, 5)
- [ ] Cross-check the final card size **= 67×44** against gen-private-cards /
  gen-train-cards (single source of truth) (AC: 1)

## Dev Notes

**Origin:** `gen-certs.mjs` was written (C25) at 89×55 — an assumed size never
matched to the 67×44 that privates/trains use; surfaced during C18 (the bid-box
center inherited 89×55 and inflated the whole board mat). Fix = adapt down.

**Design source:** `docs/mockups/cert-mockup.html` (approved v8) is the 89×55
design; this story fits it to 67×44. The cert *look* is liked — adapt, don't
redesign (any real redesign is out of scope).

**Face structure** (`gen-certs.mjs`): `.cert` = `.band` (left, color stripe +
`.logos`) + `.main` (right: `.cname`, `.presbar`/`.permitbar`, `.foot` = shares +
pct). Minor uses `.numbadge` + `.permitbar`; major president uses 2 logos + presbar.

**Aspect note:** 89×55 = 1.62; 67×44 = 1.52 — slightly less wide, so the band + main
split needs a small re-balance, not just a scale.

**Deliverable form:** committed HTML decks in `print/` (`certs-major.html`,
`certs-minor.html`), same as now. Prereq for **C49** (unified printing).

## Validation

- Both cert decks regenerate no-arg and open/print with no layout breakage;
  cards measure **67×44mm**.
- Major-president, major-regular, and minor certs render legible and uncrowded at
  real size (verified from an actual render).

## References

- [Source: tools/gen-certs.mjs] (current 89×55 generator)
- [Source: tools/gen-private-cards.mjs, tools/gen-train-cards.mjs] (67×44 source of truth)
- [Source: docs/mockups/cert-mockup.html] (approved cert design, v8)
- [Source: _artifacts/sprints/sprint-15.md] (retro — the 89×55 cascade)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- **Card 89×55 → 67×44** in `gen-certs.mjs` (matches privates/trains/board-mat).
  Verified cards measure exactly 67×44.
- **Grid: US-Letter LANDSCAPE, 3×4 = 12/page** (was portrait 2×4=8). 3 cols of
  67mm don't leave safe margins on *portrait* Letter — the crop marks landed in the
  printer's no-print zone. Landscape gives generous, safe margins **and** matches
  the trains/privates orientation for C49.
- **Design adapted, not redesigned** (the look is liked): band 16→12mm, logos
  13.2→10mm, numbadge 12.5→9.5mm, fonts ~0.78× (cname 19→15px, foot pct 20→16px,
  etc.).
- **President's Certificate on one line** — `white-space:nowrap` + 8px.
- **Title centered consistently + bars centered** (designer request): the
  `.presbar`/`.permitbar` are now **`position:absolute` + centered** (out of flow),
  so the title + foot lay out identically with or without a bar — the title never
  gets pushed up, and the bar is horizontally centered like the title. Bars nudged
  up (`bottom:10.5mm`) for spacing off the footer.
- **Verified** at real size: major-president, major-regular, minor all render
  legible, consistent, safe-margined (Playwright screenshots).

### Files Changed

- `tools/gen-certs.mjs` — card size 67×44, landscape 3×4 grid, re-proportioned
  face, absolute-centered bars
- `print/certs-major.html`, `print/certs-minor.html` — regenerated at 67×44
