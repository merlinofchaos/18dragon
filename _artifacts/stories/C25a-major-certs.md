# C25a: Major certificates (9 per major)

- **ID:** C25a
- **Type:** content
- **Epics:** Companies, Game Components
- **Sprint:** sprint-12
- **Status:** ready
- **Created:** 2026-08-04

## Story

As the designer,
I want each major's certificates rendered as printable cards from `companies.json`,
so that the shares (1 President's + 8 regular per major) are a physical deck.

## Locked design (mockup approved 2026-08-04)

`docs/mockups/cert-mockup.html` (v8) — major president + regular certs.

## Acceptance Criteria

1. **9 certs per major** (1 **President's** 20%/2-share + 8 **regular** 10%/1-share)
   × 10 majors = **90** cards, at **89 × 55 mm** landscape, **serif**.
2. **Left band** (inset from the left edge so it's out of the left bleed): **one**
   full-height **company-color stripe** (bleeds top/bottom).
3. **Logo(s)** overlaid on the band, vertically centered — **President = 2 logos**,
   **regular = 1** (logo count shows share count). Logo = **shared `companyLogo()`**
   (company-color disc + abbrev placeholder — same as the charter token; **C45**
   makes it a real logo). Roundel ~13.2mm.
4. **Company name** centered **both** axes in the main area.
5. **President only:** yellow **"President's Certificate"** banner in the lower area
   (above the foot).
6. **Foot:** shares text bottom-left ("Two Shares" / "One Share"), **percentage**
   bottom-right (20% / 10%), **baseline-aligned**.
7. Output: **`tools/gen-certs.mjs`** (reuses `cardkit`) → `certs-major.html`,
   **print-cut** layout (no border/rounded corners, crop marks, bleed) like the
   cards/charters. No `18dragon.json` wiring.

## Tasks / Subtasks

- [ ] Factor a shared **`companyLogo(m)`** into `cardkit` (company-color disc +
  abbrev); refactor `gen-charters.mjs` to use it too (AC: 3)
- [ ] `gen-certs.mjs` major cert: band + stripe + logos + centered name + president
  banner + foot (AC: 1–6)
- [ ] Emit all 9 per major (1 president + 8 regular) (AC: 1)
- [ ] Print-cut page layout + crop marks at 89×55mm (AC: 7)
- [ ] Generate all 90; eyeball vs mockup; publish an Artifact (AC: 1)

## Dev Notes

- **Data:** `companies.json` majors (name, abbrev, colors); share structure from
  `shareTypes.default` (president 20%/2 + 8×10%/1).
- **Shared logo:** `companyLogo()` in `cardkit` is used by charters, certs, and
  (later) stickers — one code path, so they always match. Placeholder now, real via
  **C45**.
- **Print-cut** = same recipe as `gen-charters.mjs` (generic `makePages`), reusable.
- Sequence C25a → C25b (minor).

## Validation

- `certs-major.html`: 90 cards (per major: 1 president w/ banner + 2 logos + 20%,
  8 regular w/ 1 logo + 10%); matches the mockup; prints at 89×55mm. `companies.json`
  valid. Design review.

## References

- [Source: companies.json], [Source: 18dragon.json shareTypes]
- [Source: docs/mockups/cert-mockup.html], [Source: tools/cardkit.mjs]

## Work Log

### Model Used

### Completion Notes

### Files Changed
