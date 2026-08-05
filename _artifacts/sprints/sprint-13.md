# Sprint 13: Token stickers

- **Status:** active
- **Created:** 2026-08-05
- **Goal:** Token stickers are generated for **Silhouette Cameo Print & Cut** from
  **`companies.json`** — major company tokens (home / available / destination /
  exchange in the finalized two-tone colors), the **30 white minor number tokens**,
  and misc tokens (market / par / revenue / dits) — via a **generalized `stickers.py`**
  that reads our JSON instead of a hardcoded roster.

## Committed stories

View of `sprints.sprint-13.stories` in `sprint-status.yaml` (canonical). **4 points.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C24 | Token sticker designs (station/market/revenue/destination/misc) | content | 4 | stub |

## Scope notes

**Reference to generalize:** `/Users/earlmiles/Projects/3d printing/18xx/1862/stickers.py`
— a working 1862 sheet generator (PNG print art @300dpi Letter + a registered cut
SVG of circles; Cameo no-cut zones; per-company station×7 / home-star / revenue /
par / marketA/B tokens + generic tokens). We want the same pipeline but **importing
the roster/colors from `companies.json`** (+ a small sticker config for counts /
token types), not a hardcoded `COMPANIES` list.

**18Dragon token inventory (to pin at fleshing):**
- **Majors** (10): tokens per `companies.json` `tokens` = **1 home + 4 available +
  1 destination + 3 exchange**, in the **two-tone** company colors; home = star;
  destination distinct. Plus **market/par** share-price markers? **revenue**?
- **Minors** (30): **white** disc with the **number** (no color).
- **Misc/generic:** market/par markers, revenue, dits, "not in play", etc.

**Prerequisite — finalize the major color palette.** The `companies.json` major
`colors` are still the **proposed colorblind-safe placeholders** (designer deferred
to stickers). C24 locks the two-tone (primary + secondary) palette.

**Approach:** mockup-first (per the codified pattern) — render a sample sticker
sheet for approval, then generate all sheets. Output stays PNG + cut-SVG for Cameo.

**Deferred / out of scope:** the board mats, hex tiles, rulebook; the physical
cutting itself.

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM). -->

## Retrospective

<!-- Filled by agile-retro at sprint end. -->

### What went well

### What didn't

### Lessons / workflow adjustments

### Action items
