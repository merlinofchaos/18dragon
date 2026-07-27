---
name: agile-epics
description: 'Derive epics and one-line story stubs from the PRDs into epics.yaml and backlog.yaml (seeding sprint-status.yaml). Use when the user says "generate the epics", "create story stubs", or "break down the PRD".'
---

# agile-epics — Generate epics + story stubs

Phase 2 of planning. Read the PRDs and produce the concept clusters (epics) and
the backlog of one-line story stubs. Does **not** write full story files — that's
`agile-story`.

## Model reminders (see `_artifacts/workflow.md`)

- **Epic = concept cluster.** A story may belong to **multiple** epics.
- **Sprint ≠ epic.** Epics never imply a schedule. Do not assign sprints here.
- **Story IDs are epic-independent:** `D01…` (dev), `C01…` (content). Never reuse
  or renumber an existing ID.

## Steps

1. **Read** `_artifacts/prd-game.md`, `_artifacts/prd-tooling.md`, and the current
   `_artifacts/backlog.yaml` + `_artifacts/epics.yaml` + `_artifacts/sprint-status.yaml`
   (to preserve existing IDs and statuses).
2. **Identify epics** — concept clusters implied by the PRDs. Cross-cutting
   clusters (e.g. "Verantum", "Renderer Foundations") are encouraged; a story can
   sit in several.
3. **Derive story stubs** — one implementable-sized unit of work each, as a single
   line. Assign the next free ID per track. Tag each with its epic(s).
4. **Write `epics.yaml`** — `epics:` map, `name → { concept, track, prd, stories: [IDs] }`.
5. **Write `backlog.yaml`** — `stories:` map,
   `id → { title, type, epics: [names], points: null }` (descriptive only; no
   status). **Seed `sprint-status.yaml`**: add each new story to the `backlog:`
   bucket as `id: stub`; **preserve existing statuses and bucket placement** for
   stories already there (never move a story out of its sprint here).
6. **Cross-check:** every stub belongs to ≥1 epic; every epic lists ≥1 stub;
   every PRD requirement maps to at least one stub (flag gaps).
7. **Present** the epic map + stub list; note anything the PRD left ambiguous.

## Rules

- Stubs are one line — no acceptance criteria yet (that's `agile-story`).
- Keep IDs stable forever. Splitting a stub later = new IDs, not renumbering.
- If the PRDs are still skeletons, say so and generate only what's grounded;
  don't fabricate requirements.
