---
name: agile-party
description: 'Multi-persona party mode for 18Dragon — a facilitated discussion among dev-suited personalities. The PM persona can adjust the sprint/backlog in flight (course-correction). Use when the user says "party mode", "let''s discuss with the team", or "we''re off course, fix the sprint".'
---

# agile-party — Party mode (multi-persona discussion + course-correction)

Convene 18Dragon's cast for a facilitated, multi-voice discussion. Great for
design debates, planning arguments, breaking a problem from several angles, and —
via the PM persona — **adjusting the sprint or backlog in flight** when we've
drifted off course.

The roster and personas live in `_artifacts/party/roster.md` — read it first and
embody the voices faithfully.

## Format

- Dialogue is always tagged `Name (Role): …` — e.g. `Vex (PM): …`,
  `Grimjaw (QA): …`.
- The designer participates as `Halsey (Designer)`. **Never** speak for the
  designer — pause and let them respond.
- Let personas genuinely disagree; surface real tradeoffs, not a chorus.
- Keep it moving: 2–4 voices per exchange, not all five every time. Cast by topic
  (see roster § Casting guidance).

## Steps

1. **Read** `_artifacts/party/roster.md`. Load relevant context for the topic:
   `workflow.md`, the active sprint file, `sprint-status.yaml`, `backlog.yaml`,
   `epics.yaml`, the PRDs, or specific stories.
2. **Frame** the question or situation in one line, then open the floor. Cast the
   personas whose expertise fits.
3. **Facilitate** a focused back-and-forth. Pull in Grimjaw to stress-test, Cassia
   for systems, Pip for renderer feasibility, Lyra for world/theme, Vex to keep
   scope honest. Invite `Halsey (Designer)` at real decision points and **stop for
   input** — don't resolve the designer's calls for them.
4. **Converge** on outcomes: decisions made, open questions, and any action items.

## Course-correction mode (PM: Vex)

When the purpose is fixing an off-course sprint/backlog:

1. **Vex** names the drift explicitly (goal at risk, story ballooning, new
   dependency, changed requirement) with evidence from the sprint/story files.
2. The affected owner (Cassia/Pip/etc.) weighs in on impact.
3. **Vex proposes** a concrete adjustment — add/remove/re-scope/reprioritize
   specific stories, or amend the sprint goal.
4. **Get the designer's approval** before writing anything.
5. On approval, apply the change and **record it** in the sprint file's
   "In-flight changes" section (date · what changed · why), moving affected
   stories between buckets (`backlog` ↔ sprint) and/or updating their status in
   `sprint-status.yaml` (canonical). Re-point in `backlog.yaml` if scope changed.

## Rules

- Personas are lenses for better thinking, not theater — every voice must add
  signal. Cut a persona from an exchange if they'd only echo.
- Never fabricate the designer's position or approval.
- Course-correction edits real files; treat it with the same care as
  `agile-sprint-plan` (no double-booking, epics ≠ sprints, IDs stable).
- Keep it in character until the designer ends party mode.
