---
name: agile-sprint-plan
description: 'Plan a sprint: pull stories from the backlog into a new execution batch with a goal. Use when the user says "plan a sprint", "start a sprint", or "what should we do next".'
---

# agile-sprint-plan — Plan a sprint

Phase 3. A **sprint** is an execution batch — the stories we commit to doing
together now. Orthogonal to epics (which are concept clusters). See
`_artifacts/workflow.md`.

## Steps

1. **Read** `_artifacts/backlog.yaml`, `_artifacts/epics.yaml`,
   `_artifacts/sprint-status.yaml` (the `backlog:` bucket for candidate stories +
   the `sprints:` map), and any existing `_artifacts/sprints/` files (to get the
   next sprint number and confirm no active sprint is still open — if one is, ask
   whether to close it via `agile-retro` first).
2. **Agree a sprint goal** with the user — the one outcome this batch delivers
   (e.g. "custom SVG renders end-to-end on a hex"). A good sprint goal is a
   coherent slice of value, often but not necessarily within one epic.
3. **Select stories** from the backlog toward that goal:
   - Prefer `ready` stories; if a needed story is still a `stub`, note it should
     be fleshed with `agile-story` before/early in the sprint.
   - Respect dependencies (e.g. D02 before D03 before D04).
   - **Flag cross-track dependencies.** A dev story that presupposes a rule/design
     from the content track (or vice-versa) is only real if that rule exists. If it
     depends on an **undesigned** rule (e.g. an unset PRD §9 open question), don't
     commit it or bake it into the goal — call it out and leave it in the backlog
     until its dependency lands. *(Sprint-01: D08 "annotate ruins upgrade targets"
     was baked into the goal but the ruins tile-lay rules (C07/C08) were undesigned;
     it was later dropped as unnecessary.)*
   - A story can be pulled regardless of how many epics it's tagged with; pull by
     goal-fit, not by epic.
   - Keep the batch small enough to actually finish.
4. **Create the sprint file** from `_artifacts/sprints/_template.md` as
   `sprint-NN.md`: goal, committed-stories table, scope notes (why these, what's
   left out, sequencing).
5. **Point the stories.** With the user, assign story `points` to each committed
   story (a relative estimate) and write them into `backlog.yaml` (the `points:`
   field). Pointing is part of sprint planning; unscheduled backlog stories stay
   `points: null`.
6. **Schedule in `sprint-status.yaml` (bucket move):** create the sprint entry
   `sprints.sprint-NN: { status: active, goal: "...", stories: {} }`, then **move**
   each committed story from the `backlog:` bucket into that sprint's `stories:`
   block, carrying its current status (e.g. `ready`). A story lives in exactly one
   bucket — remove it from `backlog:` as you add it to the sprint. Update the
   sprint `.md` file and story-file snapshots to match.
7. **Present** the sprint: goal, pointed story list, sequence, and the first story
   to pick up.

## Rules

- A story is in **at most one active sprint**. Don't double-book.
- Don't change a story's `Epics` here — sprint membership is separate from
  concept membership.
- Sprint planning schedules; it does not implement. Hand off to `agile-dev` /
  `agile-content`.
- If mid-sprint the plan needs to change, that's course-correction — use
  `agile-party` (PM persona), which records the change in the sprint's
  "In-flight changes" section.
