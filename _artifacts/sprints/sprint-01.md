# Sprint 01: Renderer supports the board

- **Status:** complete *(canonical status lives in `sprint-status.yaml`)*
- **Created:** 2026-07-24
- **Completed:** 2026-07-24
- **Goal:** The 18xxMaker fork renders every board feature 18Dragon needs — custom full-color SVG art, permit-letter overlays that survive placed tiles, and styled ruins hexes — so the board content (map) can be laid out and rendered correctly. *(Original goal said "ruins hexes with upgrade annotations"; redefined mid-sprint — see In-flight changes.)*

## Committed stories

View of the `sprints.sprint-01.stories` bucket in `sprint-status.yaml` (canonical).
All are `stub` today — flesh each with `agile-story` before it's built. Points
from `backlog.yaml`. **16 points total.**

Final outcome: **7/7 done** (D01 pulled in + reconciled mid-sprint; D08 dropped).

| ID | Title | Type | Points | Status |
|----|-------|------|--------|--------|
| D01 | Register art glob + registry export | dev | 1 | ✅ done |
| D02 | Art shape atom (sized/positioned/layerable) | dev | 3 | ✅ done |
| D03 | Wire `art` type into `Shape.jsx` mapping | dev | 2 | ✅ done |
| D04 | Sample art asset proves render on a hex | dev | 1 | ✅ done |
| D05 | Permit letters → top-most overlay layer | dev | 3 | ✅ done |
| D06 | Permit letter stays visible over placed tiles | dev | 2 | ✅ done |
| D07 | Render special ruins hex styling | dev | 3 | ✅ done |
| ~~D08~~ | ~~Annotate ruins upgrade targets~~ | dev | ~~2~~ | dropped |

## Scope notes

**Why these together.** The Sprint 1 directive: the *underlying dev work needed
to complete the board*. Every 18Dragon board feature the stock 18xxMaker renderer
can't yet draw lives in the dev track — custom fantasy artwork on hexes, the
region-permit letter overlay, and the Verantum ruins hexes. Landing all of it now
unblocks the content track (World & Map: C01/C02) to lay out and render the real
board without hitting renderer gaps.

**Three independent chains** (sequence within each; chains can run in parallel):

1. **Custom SVG** — D02 → D03 → D04. D01 (register `art` glob + registry export)
   is already **done**, so this chain starts at the shape atom. D04 is the
   end-to-end proof: a sample asset renders on a hex at :3000.
2. **Permit overlay** — D05 → D06. D05 is also tagged *Renderer Foundations*
   (top-most overlay layer); D06 verifies the letter stays visible once a track
   tile is placed on the hex.
3. **Ruins rendering** — D07 → D08. D07 is the special hex styling; D08 annotates
   the upgrade targets (plain/dit/town/metro).

**Recommended start.** D02 — root of the Custom SVG chain and D01's follow-on. The
custom-art capability is the most broadly reusable of the three chains (permit and
ruins visuals may lean on it).

**Left out.** All content stories (C01–C26). The board *layout* (C01/C02) is
deliberately deferred until the renderer can draw what the layout needs — that's
the point of doing this sprint first. Content resumes in Sprint 2.

**Fleshing.** Every committed story is a `stub`. Flesh each with `agile-story`
before implementing (start with D02), then hand to `agile-dev`.

## In-flight changes

- **2026-07-24 · D01 pulled into the sprint + reconciled.** D01 was falsely
  `done` in the backlog with no story file and its `src/data/index.js` art-glob
  edit uncommitted (branch wouldn't build clean). Pulled into sprint-01, written
  up, verified, and committed (`febf45c5`, folding in the `pnpm-workspace.yaml`
  bootstrap fix).
- **2026-07-24 · D08 dropped.** "Annotate ruins upgrade targets" removed as
  unnecessary: the D07 ruins marker already signals ruins-tile eligibility, and
  placement follows normal tile rules (rulebook). Goal redefined accordingly;
  epics/backlog/PRD-tooling §2.3 updated to match.

## Retrospective

### What went well

- **Custom SVG chain became the reusable spine, exactly as the plan bet.** Permit
  Overlay (D05) and Ruins (D07) both built on the art pipeline — "most broadly
  reusable, do it first" paid off.
- **Verification was real, not rubber-stamped.** Every visual story was proven in
  the running app via Playwright screenshots, catching genuine behavior (opacity
  passthrough, layer order, over-tile burying) that lint alone would miss.
- **Adversarial A/B proofs** (permit-vs-normal label) gave decisive evidence.
- **Scope honesty at both ends** — reconciled D01 instead of papering over it;
  dropped D08 instead of building busywork.

### What didn't

- **D01 drifted to `done` without a story or commit** — status diverged from
  reality; caught only by noticing uncommitted changes.
- **Commit-ordering blemish** — D02/D03 committed before D01, so an intermediate
  commit didn't build. Same root cause as the D01 gap.
- **Sprint goal baked in undesigned scope** — "upgrade annotations" (D08) assumed
  rules that weren't designed (C07/C08) and turned out unnecessary.
- **Verification scaffolding reinvented each story** — the copy-into-fork +
  Playwright screenshot dance was hand-rolled four times.
- **Minor tooling friction** — commitlint rejected a non-conventional subject; a
  heredoc apostrophe broke a commit; an apostrophe in an SVG comment cost a debug
  cycle (a `vite:import-analysis` 500).

### Lessons / workflow adjustments (made real)

1. **`done` requires committed** — added to the dev Definition of Done in
   `workflow.md`. Closes the D01 drift.
2. **Verification harness captured** — documented the games-glob + Playwright
   pattern in `agile-dev/SKILL.md` and added a reusable
   `agile-dev/verify-screenshot.mjs`.
3. **Cross-track dependencies flagged at planning** — `agile-sprint-plan/SKILL.md`
   now says not to commit (or bake into a goal) a story that depends on an
   undesigned rule from the other track.
4. **Art-pipeline apostrophe gotcha** recorded in `CLAUDE.md` (new "Custom art
   (SVG) pipeline" section).

### Action items

- [x] Add "committed" to dev DoD (`workflow.md`).
- [x] Document + script the visual-verification harness (`agile-dev`).
- [x] Flag cross-track deps in `agile-sprint-plan`.
- [x] Record the SVG-apostrophe gotcha in `CLAUDE.md`.
- [ ] **Sprint-2 planning:** content track is unblocked — the renderer can now draw
      custom art, permit overlays, and ruins. Candidate first stories: C01 (finalize
      Verantum island — reworks the F17/L11 pre-placed cities) and C02 (lay out the
      4 mainland regions).
