# Sprint 12: Certificates

- **Status:** active
- **Created:** 2026-08-04
- **Goal:** The certificates are a printable deck from **`companies.json`** (via
  `cardkit`) — **major** certs (per major: 1 President's 20%/2-share + 8 regular
  10%/1-share) and the **30 minor** certs (single card, 2 shares / 50%) — matching
  the designer's cert reference. **Mockup-first** before building.

## Committed stories

View of `sprints.sprint-12.stories` in `sprint-status.yaml` (canonical). **3 points.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C25a | Major certificates (9/major — president 20% + 8×10%) | content | 2 | ✅ done |
| 2 | C25b | Minor certificates (30 — single 2-share / 50% card) | content | 1 | ✅ done |

## Scope notes

**Reference (designer photo).** Cert layout: **color left band** with **stripes =
share count**, **logo roundel(s)**, company name (serif), a yellow **PRESIDENT'S
CERTIFICATE** banner (president only), "N Shares" (bottom-left), **percentage**
(bottom-right).

**Share encoding (designer 2026-08-04):**
- **Major President** — 2 shares → **2 stripes**, 20%.
- **Major regular** — 1 share → **1 stripe**, 10%. (8 per major.)
- **Minor** — single card = **Two Shares / 50%** (you own half; the other half is
  not available for purchase) → **2 stripes** in the **region color** (quick region
  reference) + number badge (circle) centered over the stripes.

**Counts:** majors 9 × 10 = **90** certs; minors **30**. Print all physical copies
(card deck) — reuse the card print recipe.

**Mockup-first** (codified pattern): wireframe president / regular / minor certs,
iterate to approval, then build `tools/gen-certs.mjs` (reusing `cardkit`).

**Open at fleshing:** card size; the minor band color (gray vs region); logo =
abbrev placeholder until **C45**; whether a market/par value appears on the cert.

**Deferred / out of scope:** token stickers (C24), board mats, the share/market
*mechanics*.

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM). -->

## Retrospective

<!-- Filled by agile-retro at sprint end. -->

### What went well

### What didn't

### Lessons / workflow adjustments

### Action items
