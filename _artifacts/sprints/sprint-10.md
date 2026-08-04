# Sprint 10: Companies — majors + minors

- **Status:** complete
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

**Outcome: goal fully met.** C03 (10 majors) + C04 (30 minors) both done — the full
company roster is in `companies.json`, ready to feed charters/certs/stickers.

### What went well

- **`companies.json` master pattern held** (majors + minors in one file) — the same
  master-first shape as privates/trains.
- **Grounding design in extracted map data** made it concrete and cut work:
  destinations picked from real cities; the 30 minor home-token numbers/regions/cities
  pulled straight from the board (so C04 was assignment, not placement).
- **The propose→approve loop shone on the abbreviations** (the designer's stated
  priority): iterated VIR→VR, AE→ACL, KV→MK (rename), ZO→ZNR to a clean, distinct set.
- **Designer domain knowledge → the two minor safety-valve powers** (#4 Corvium,
  #16 Brekheim), captured with tightened wording.

### What didn't

- **Real process miss (assistant):** C03 was set to `done` immediately after the
  designer approved one small tweak — they had to say "you jumped ahead to done."
  Not normal review; a genuine boundary error on my part.

### Lessons / workflow adjustments

- **Codified the fix (real change):** added an explicit rule to `workflow.md` §Story
  lifecycle — *the assistant stops at `review`; only the designer's explicit sign-off
  moves a story to `done`* (don't self-advance after a sub-tweak). Also saved as a
  memory so it sticks across sessions.
- Otherwise the workflow held; no other changes.

### Action items

- **Provisional items to revisit** (no new stories needed now):
  - **Major color palette** — proposed colorblind-safe set; designer finalizes when
    the token stickers render (C24).
  - **L→2 = 80gp** (from sprint 9) still owed to the rulebook (C06/C23).
- **Next sprint candidates** (unblocked by companies): **C17** charters · **C25**
  certificates · **C24** token stickers.
