---
name: agile-retro
description: 'Run a sprint retrospective: inspect how the sprint went, capture lessons, and adjust the workflow. Use when the user says "retro", "retrospective", or "close the sprint".'
---

# agile-retro — Sprint retrospective

Phase 6. After a sprint, inspect what actually happened, extract lessons, and —
crucially — **adjust our own workflow** when the process itself got in the way.
See `_artifacts/workflow.md`.

Facilitation stance: honest but blame-free. Focus on systems and process, not
fault. No time estimates. The designer (E. Halsey Miles) is the participant, not
a subject.

## Steps

1. **Read** the sprint file (`_artifacts/sprints/sprint-NN.md`), the stories it
   committed (their final statuses and Work Logs), and any in-flight changes
   recorded during the sprint.
2. **Assess outcomes:**
   - Which committed stories reached `done` / `review` / slipped? Why?
   - Did the sprint goal get met? Fully, partially, or redefined mid-flight?
   - What surprised us (scope, dependencies, tooling friction, schema gotchas)?
3. **Discuss with the designer** — walk the above, invite specifics. Prefer
   concrete examples over generalities. (May be run inside `agile-party` for
   multiple perspectives.)
4. **Capture** into the sprint file's Retrospective section:
   - What went well · What didn't · Lessons / workflow adjustments · Action items
     (each with a clear next step).
5. **Adjust the workflow for real.** If a lesson implies a process change, edit
   `_artifacts/workflow.md` and/or the relevant `agile-*` skill so the change
   actually sticks — don't just note it. Summarize what you changed.
6. **Prep the next sprint's inputs (in `sprint-status.yaml`):** for slipped/
   unfinished stories, **move** them from the completed sprint's `stories:` block
   back to the `backlog:` bucket, resetting status appropriately; note candidates
   for the next sprint. Set the sprint's `sprints:` entry to `status: complete`
   (its finished stories stay listed under it as the historical record). Update
   the sprint `.md` file to match.
7. **Present** the retro summary and the concrete workflow changes made.

## Rules

- A retro must produce a genuine **assessment** — but not necessarily a change.
  Affirm what's working (and say why), or fix what actually got in the way. Do
  **not** manufacture a workflow change to justify the ceremony: change that isn't
  earned by a real problem can make things worse. "It went well, keep doing X" is a
  valid, complete outcome.
- Keep `sprint-status.yaml` consistent: unfinished stories must not be left
  pointing at a completed sprint.
- Blame-free, systems-focused, specific.
