---
name: agile-story
description: 'Flesh a backlog stub into a ready, implementable story file. Use when the user says "create the next story", "write story D02", or "flesh out C03".'
---

# agile-story — Turn a backlog stub into a ready story

Take a `stub`-status backlog line and write a full, implementable story file.
Both tracks (`dev` = 18xxMaker fork; `content` = game material). Lightweight —
solo game-design project, not enterprise ceremony. See `_artifacts/workflow.md`.

## Inputs

- A story ID (e.g. `D02`) or title, optionally the skill argument.
- If none given: read `_artifacts/backlog.yaml` + `_artifacts/sprint-status.yaml`
  and pick the next relevant `stub`-status story (prefer the active sprint, then
  the track in play). Confirm with the user.

## Steps

1. **Read context.** `_artifacts/backlog.yaml` (the entry: title, type, epics),
   `_artifacts/sprint-status.yaml` (its status + sprint), `_artifacts/epics.yaml`
   (the concept(s) it belongs to), and the PRD section it
   links to (`_artifacts/prd-game.md` or `_artifacts/prd-tooling.md`). For `dev`,
   skim the renderer files involved. For `content`, check `18dragon.json` and the
   1822 source at `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/`.
2. **Elicit the designer's mental model** (esp. `content` stories for a
   region/section). A lot lives only in the designer's head and otherwise surfaces
   as mid-implementation tweaks. Before drafting, actively ask what they have in
   mind for this section — cities, towns/dits, special hexes, terrain, revenues,
   values, names, adjacencies, "and one more thing…" — and fold the answers into
   the AC/tasks so more is captured up front. This won't eliminate emergent tweaks
   (the designer designs by *seeing* the rendered map), but it shrinks the
   only-in-my-head gap. Ask in a batch; don't over-interrogate.
3. **Draft** by copying `_artifacts/stories/_template.md` to
   `_artifacts/stories/{id}-{slug}.md`. Fill:
   - `ID`, `Type`, `Epics` (copy the list from the `backlog.yaml` entry),
     `Sprint` (which bucket it's in per `sprint-status.yaml` — `backlog` or a
     sprint id), `Status: ready` (snapshot), `Created` (today).
   - `As a / I want / so that`.
   - **Acceptance Criteria** — concrete, checkable, from the PRD/epic.
   - **Tasks / Subtasks** — implementation steps, each tagged with its AC.
   - **Dev Notes** — track-specific context.
   - **Validation** — the Definition-of-Done check from `workflow.md`.
   - **References** — PRD sections + source paths.
4. **Set status** to `ready` for this story in `_artifacts/sprint-status.yaml`
   (canonical); the story file's `Status:` is just a snapshot.
5. **Present** for review. Do not implement — that's `agile-dev` / `agile-content`.

## Rules

- Keep story files tight and specific; no boilerplate padding.
- One story = one coherent, reviewable unit. If a stub is too big, propose
  splitting into multiple stubs rather than writing one giant story.
- `Epics` is a concept tag list (many allowed); `Sprint` is scheduling (one).
  Never collapse the two.
