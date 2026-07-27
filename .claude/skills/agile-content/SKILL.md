---
name: agile-content
description: 'Generate and validate a content story''s game material (companies, minors, privates, map, rules, balance). Use when the user says "work the content story", "generate the companies", or "implement story C03".'
---

# agile-content — Produce a content story's game material

Implement a `Type: content` story: create game material — map, companies, minors,
privates, tiles, rules, or balance — as `18dragon.json` edits and/or prose in
`docs/`. See `_artifacts/workflow.md`.

## Preconditions

- Game file: `/Users/earlmiles/Projects/18dragon/18dragon.json`.
- 1822 source of truth: `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/`.
- Schema notes & conventions: project `CLAUDE.md` and `_artifacts/prd-game.md`.

## Steps

1. **Read the story** in `_artifacts/stories/`. Confirm `Type: content`. If it's
   `dev`, redirect to `agile-dev`.
2. Set this story's status to `in-progress` in `_artifacts/sprint-status.yaml`
   (canonical); update the story file's `Status:` snapshot to match.
3. **Design + produce** the material:
   - Ground decisions in `_artifacts/prd-game.md` and, where 18Dragon inherits
     from 1822, the g_1822 source. Note deliberate divergences.
   - Apply per-region naming conventions (CLAUDE.md § Naming conventions).
   - Follow the 18xxMaker JSON schema exactly (CLAUDE.md § Schema). Mind the
     gotchas: non-empty `map.hexes`; no `label` on 1D market cells; `minors` is
     not a top-level key (minors go in `companies`).
   - Rules/balance stories with no JSON output: write to `docs/` (deliverable
     documentation) and/or update the PRD.
4. **Validate:**
   - If `18dragon.json` was touched, confirm it parses and **loads in 18xxMaker
     without schema error or crash** (dev server at http://localhost:3000,
     File > Open; at minimum verify JSON validity + schema-key correctness).
     Report the result honestly.
   - Sanity-check counts/totals vs design targets (30 minors, cert limits, bank).
5. **Close out:** check tasks, record **Design decisions** in Dev Notes, list
   output (JSON sections / doc files) under Files Changed. Set this story's status
   to `review` in `_artifacts/sprint-status.yaml`; update the story file snapshot.
6. **Present** the material and rationale for the designer's review.

## Rules

- Keep `18dragon.json` schema-valid at every step — a game file that won't load
  is worse than an incomplete one.
- Surface design tradeoffs and open questions rather than silently deciding
  balance-significant details; that's the designer's call.
- Record *why* behind non-obvious choices so the reasoning survives.
- Deliverable documentation goes in `docs/`, never in `_artifacts/`.
