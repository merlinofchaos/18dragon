# Sprint 13: Token stickers

- **Status:** complete
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
| 1 | C24 | Token sticker designs (station/market/revenue/destination/misc) | content | 4 | done |

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

**Outcome:** goal fully met. C24 `done`. `tools/stickers.py` generalizes the 1862
generator to read `data/companies.json` and emit one combined Letter Print & Cut sheet
(`print/stickers.*`) — 173 stickers covering every major/minor/market/misc token.

### What went well

- **Generalizing the 1862 script paid off.** The pipeline (PIL raster + registered cut
  SVG + Cameo no-cut zones) ported cleanly; swapping the hardcoded roster for a
  `companies.json` import was the only real change. The sticker logo reuses the same
  placeholder look as `cardkit`'s `companyLogo`, so tokens match charters/certs.
- **Single combined sheet.** The designer pushed back on splitting by size; a mixed-size
  (12mm + 15mm) band packer fit all 173 stickers on one page (~97% of usable height)
  with every cut margin intact — no wasted second sheet.
- **The reorg genuinely tidied the repo.** `data/` (masters) + `print/` (generated
  decks) + `18dragon.json` at root cleared a crowded root and gave the generators a
  clear input→output convention.

### What didn't

- **Wasted artifact uploads.** Review copies were repeatedly published to claude.ai for
  what were local files the designer could just open — flagged twice — and a stale
  published copy caused a "the star didn't change" detour when the generator was already
  correct.
- **Output location drifted.** Stickers first landed in the scratchpad and the repo root
  filled with loose masters + decks; the `data/`/`print/` split only happened because the
  designer called it out mid-sprint.
- **A deferred decision went stale.** "Defer per-major colors until we see them on
  stickers" couldn't be honored — charters and certs had already been generated with
  those colors, so any change would desync the printed decks. The deferral outlived its
  dependents.

### Lessons / workflow adjustments

1. **No claude.ai artifacts for local file deliverables — review by file path.** Codified
   in `workflow.md` (new "Component generation & review" section) and the cookbook's
   printing section.
2. **Generators read `data/`, write committed `print/` — never the scratchpad.** Codified
   in `workflow.md` + cookbook; the layout is documented in `CLAUDE.md`.
3. *(Noted, not codified as a hard rule)* **A deferred decision is only safe if nothing
   between now and its resolution bakes it in.** The color deferral should have been
   resolved before charters/certs, or those decks regenerated afterward. Worth a
   sanity-check at sprint planning when a decision is pushed downstream.

### Action items

- [x] Codify "review local files by path, not artifacts" in `workflow.md` + cookbook.
- [x] Codify "generators: `data/` → committed `print/`" in `workflow.md` + cookbook;
  document repo layout in `CLAUDE.md`.
- [x] Reorganize repo (`data/`, `print/`, `docs/` doodle) and rewire all five generators.
- [ ] **C45** still owns real per-company logo SVGs (shared by charters/certs/stickers);
  the color palette is now locked, so C45 won't reopen it.
