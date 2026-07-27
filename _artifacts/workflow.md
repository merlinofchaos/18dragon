# 18Dragon — Agile Workflow

Lightweight agile process for 18Dragon, adapted from BMAD's artifact shapes but
with our own model. This file is the process definition; the artifacts it
describes live alongside it in `_artifacts/`.

> **`_artifacts/` = agile planning & tracking. `docs/` = deliverable
> documentation** (the game rules, tooling docs — what we ship). Keep them
> separate.

## Two work tracks

| Track | Produces | Lives in |
|-------|----------|----------|
| **dev** | Changes to the forked 18xxMaker renderer | `/Users/earlmiles/Projects/18xx-maker` (branch `18dragon`) |
| **content** | Game material — companies, minors, privates, map, tiles, rules, balance | `18dragon.json`, `docs/` |

Every story is `Type: dev` or `Type: content`.

## The core distinction: epics vs sprints

These are **orthogonal** groupings of stories. This is the point of our model.

- **Epic** — a *concept cluster*. Stories that share ideas/subject matter.
  Organizational, not a schedule. **A story may belong to multiple epics.**
  Epics help us see clusters; they do **not** imply the stories ship together.
- **Sprint** — an *execution batch*. The stories we've committed to doing
  together right now. A story is in **at most one active sprint**.

A story is the atomic unit with a stable ID. Epics tag it by concept; a sprint
schedules it for execution. The two never conflate.

## Story IDs

Epic-independent (a story can be in many epics, so IDs can't be epic-derived):

- **dev:** `D01`, `D02`, … · **content:** `C01`, `C02`, …

IDs are stable for the life of the story. Epics and sprints reference stories by ID.

## Artifacts

```
_artifacts/
├── workflow.md         ← this file (prose)
├── prd-game.md         ← requirements for the GAME (board-game GDD) (prose)
├── prd-tooling.md      ← requirements for the 18xxMaker FORK (prose)
│   # --- data layer (YAML; machine-readable for the sprint-board script/app) ---
├── backlog.yaml        ← story catalog: id → title, type, epics, points (NO status)
├── epics.yaml          ← epic definitions: name → concept, track, prd, story IDs
├── sprint-status.yaml  ← CANONICAL: stories bucketed into `backlog` or a sprint,
│                          each with a status; sprints carry goal + status
│   # --- prose views ---
├── sprints/
│   ├── _template.md
│   └── sprint-NN.md    ← sprint goal · member stories (view) · retrospective
├── stories/
│   ├── _template.md
│   └── {id}-slug.md    ← full story; tags its epic(s); Status: is a snapshot
└── party/
    └── roster.md       ← party-mode personalities
```

**Data vs prose.** The structured "database" is YAML — `backlog.yaml` (stable
catalog + points), `epics.yaml` (epic definitions), `sprint-status.yaml` (status
by bucket) — so an external script/app can render a live sprint board by watching
`sprint-status.yaml` and joining `backlog.yaml`/`epics.yaml` by ID. The PRDs, this
workflow, stories, sprints, and roster stay Markdown prose.

**Status store.** `sprint-status.yaml` is the **single source of truth** for each
story's `status` and its **bucket** — every story sits in exactly one of
`backlog` (unscheduled) or a `sprints.<id>.stories` block; a story's sprint is
implied by its bucket (no separate sprint field). Sprint entries carry `status`
and `goal`. `backlog.yaml` holds descriptive data + `points` only. Story/sprint
Markdown may show a snapshot, but the yaml wins. **Skills write status/bucket to
the yaml only.**

**Points.** Each `backlog.yaml` story has a `points` field, `null` until pointed.
Pointing happens in `agile-sprint-plan` when a story is pulled into a sprint.

## Phases (each is a skill)

1. **PRD** — `agile-prd`: write/refine `prd-game.md` or `prd-tooling.md`.
2. **Epics & stubs** — `agile-epics`: derive epics + one-line story stubs into
   `epics.yaml` and `backlog.yaml` from the PRDs (and seed `sprint-status.yaml`).
3. **Flesh a story** — `agile-story`: turn a stub into a ready, implementable story.
4. **Sprint planning** — `agile-sprint-plan`: pull backlog stories into a new
   sprint with a goal.
5. **Implement** — `agile-dev` (dev track) / `agile-content` (content track).
6. **Sprint retrospective** — `agile-retro`: after a sprint, inspect what
   happened, capture lessons, and adjust *this workflow*.
7. **Party mode** — `agile-party`: multi-persona discussion; the PM persona can
   adjust the sprint/backlog **in flight** (course-correction).

## Story lifecycle

```
stub → ready → in-progress → review → done
```

- **stub** — catalogued in `backlog.yaml`, no story file yet.
- **ready** — story file written with AC + tasks.
- **in-progress** — actively worked (usually because it's in the active sprint).
- **review** — implemented; awaiting the designer's sign-off.
- **done** — accepted.

A story's current status and sprint live **only** in `sprint-status.yaml`. Skills
update that file; any status shown in a story or sprint Markdown file is a
snapshot rendered from it.

## Definition of Done

**dev:** AC met · renders correctly on the dev server (http://localhost:3000)
with `18dragon.json` loaded, no console errors · change isolated on `18dragon`
branch, additive where reasonable · story closed out (tasks, Files Changed;
status → `review` in `sprint-status.yaml`).

> **`done` requires committed.** A dev story only reaches `done` once every fork
> code/asset change is **committed on `18dragon`** (working-file-only edits like
> `18dragon.json` — not version-controlled — are flagged N/A in Files Changed).
> The story file's `Files Changed` must name the commit(s) or the N/A reason, and
> the story + `sprint-status.yaml` must agree. *(Sprint-01: D01 had drifted to
> `done` with no story and uncommitted code — this closes that gap.)*

**content:** AC met · `18dragon.json` still loads in 18xxMaker without schema
error/crash (if touched) · design decisions recorded · story closed out (status →
`review` in `sprint-status.yaml`).

## Key paths

- Fork: `/Users/earlmiles/Projects/18xx-maker` — branch `18dragon` · `pnpm start` → http://localhost:3000
- Game file: `/Users/earlmiles/Projects/18dragon/18dragon.json`
- 1822 source of truth: `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/`
