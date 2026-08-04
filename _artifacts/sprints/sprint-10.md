# Sprint 10: Companies — majors + minors

- **Status:** active
- **Created:** 2026-07-30
- **Goal:** The **10 majors** and **30 minors** are defined in a **`companies.json`**
  master — majors (name, abbrev, color, token count, home region) and minors (name,
  home-hex number 1–30, region, home-region permit; a couple with special powers) —
  ready to feed charters (C17), certs (C25), and stickers (C24), and later the map.

## Committed stories

View of `sprints.sprint-10.stories` in `sprint-status.yaml` (canonical). Flesh each
`stub` with `agile-story` before building. **7 points total.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C03 | Define 10 majors (names/abbrev/colors/tokens/region) | content | 3 | ✅ done |
| 2 | C04 | Define 30 minors (names, 6/region, home hexes 1–30, permits) | content | 4 | ✅ done |

## Scope notes

**Why now.** Companies are the design chokepoint — charters (C17), certificates
(C25), and token stickers (C24) all reference them. Define the roster first (same
"master-first" shape as privates/trains).

**Output = `companies.json` master (designer choice).** Tool-agnostic source of
truth, like `privates.json` / `trains.json`. Keep it canonical to avoid the
double-maintenance we saw with the privates doc. Wiring companies into
`18dragon.json` (map home tokens, logos) is a **later** step, not this sprint.

**Design foundation already on the board:** the **30 minor home hexes are placed**
as numeric labels **1–30** on the map — so C04 is *identity + assignment* (name each
minor, tie it to its home-hex number + region → permit), not placement.

**Roster shape (PRD §4.1–4.2; designer 2026-07-30):**
- **Majors: 10, 2 per region** (region-associated). Fields: **region-themed name**
  (old-timey railroad + fantasy twist, per the region's culture), a **distinct,
  memorable abbreviation** (majors are referred to by abbrev in play, like
  CPR/NYNH — abbreviations must be clearly distinct from each other), a
  **primary + secondary color** for the token (visually distinct **and
  colorblind-safe** — designer will specify the palette), **6 tokens each (1 home +
  4 regular + 1 destination)**, a **fixed destination city** one region away, in a
  region available whenever the major is in play (**Home→Destination doubles the
  destination's value**; distribution in C03), and home region. Majors have **no home
  hex** (they form by merging two minors, §5.1).
- **Minors: 30, 6 per region.** Fields: **name** (old-timey railroad + fantasy
  twist, flavor only — sometimes tied to the minor's home city), home-hex number
  (1–30), region, home-region permit (§6.1). **No color — minor tokens are always
  white.** Referred to **by number** in play. **A couple carry special powers**
  (designer — capture at fleshing).

**Sequencing.** **C03 (majors) → C04 (minors).** Majors set the regional
color/identity palette; minors slot into their regions. C04 is naming-heavy (30
names); if it balloons, split (e.g., by region) via `agile-party` — but no per-minor
colors keeps it lighter than it looks.

**Deferred / out of scope:** charters (C17), certs (C25), stickers (C24), and the
map wiring of company home tokens/logos; the merger *mechanic* rules (C13).

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM). -->

## Retrospective

<!-- Filled by agile-retro at sprint end. -->

### What went well

### What didn't

### Lessons / workflow adjustments

### Action items
