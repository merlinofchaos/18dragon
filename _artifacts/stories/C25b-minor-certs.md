# C25b: Minor certificates (30)

- **ID:** C25b
- **Type:** content
- **Epics:** Companies, Game Components
- **Sprint:** sprint-12
- **Status:** ready
- **Created:** 2026-08-04

## Story

As the designer,
I want the 30 minor certificates rendered as printable cards from `companies.json`,
so that each minor's ownership share is a physical card.

## Locked design (mockup approved 2026-08-04)

`docs/mockups/cert-mockup.html` (v8) — minor cert.

## Acceptance Criteria

1. **30 minor certs** (one per minor), **89 × 55 mm** landscape, **serif** — same
   card size as the majors, visually **distinct**.
2. **Left band** (inset from the left bleed): **1822PNW-style** — a **wide gray**
   stripe + the **region color** + a **narrow gray** stripe, all **black-outlined**
   (left/right on the grays and the region part), full-height (bleeds top/bottom).
   The stripe set is **reduced** so the number badge clearly sits over/beyond it.
3. **Number badge** (white circle) centered over the band, with the minor's
   **number** enlarged to fill the circle; **2-digit numbers scale down** at build.
4. **Company name** centered **both** axes.
5. **Permit block** in the lower area (the majors' banner spot): **region-colored**
   background, big **permit letter** (A/N/G/M/V), and **"Permit · <region name>"** —
   so the minor carries its permit on the card. Same permit component as the minor
   charter (→ shared with **C46**).
6. **Foot:** "**Two Shares**" bottom-left, "**50%**" bottom-right (you own half; the
   other half is not available for purchase), baseline-aligned.
7. Output: `tools/gen-certs.mjs` (same generator as C25a) → `certs-minor.html`,
   print-cut layout. No `18dragon.json` wiring.

## Tasks / Subtasks

- [ ] `gen-certs.mjs` minor cert: PNW-style band + number badge (2-digit scaling) +
  centered name + permit block + foot (AC: 1–6)
- [ ] Reuse the **permit block** component (shared with the minor charter / C46) (AC: 5)
- [ ] Generate all 30; eyeball vs mockup; publish an Artifact (AC: 1)

## Dev Notes

- **Data:** `companies.json` minors (number, name, region, permit).
- **Minor = 2 shares / 50%** (single card; the other 50% isn't purchasable) — this
  corrects the earlier "100%" note.
- **Region-color band + permit block** double as a quick region/permit reference.
- Reuse C25a's `gen-certs.mjs` + print-cut layout; sequence after C25a.

## Validation

- `certs-minor.html`: 30 cards (PNW band, number badge, centered name, permit block,
  "Two Shares · 50%"); matches the mockup; prints at 89×55mm. `companies.json` valid.
  Design review.

## References

- [Source: companies.json] (minors)
- [Source: docs/mockups/cert-mockup.html], [Source: tools/cardkit.mjs]

## Work Log

### Model Used

### Completion Notes

### Files Changed
