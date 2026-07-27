---
name: agile-prd
description: 'Write or refine a 18Dragon PRD (game or tooling). Use when the user says "write the PRD", "work on prd-game", or "capture the requirements".'
---

# agile-prd — Write / refine a PRD

Phase 1 of planning. Produce or refine the requirements docs that everything else
derives from:

- `_artifacts/prd-game.md` — the **game** (board-game GDD): world, regions,
  companies, mechanics, Verantum specials, balance.
- `_artifacts/prd-tooling.md` — the **18xxMaker fork**: renderer capabilities,
  constraints, non-goals.

This is a guided collaboration, not a form. Work section by section with the
designer; don't invent balance-significant decisions unilaterally.

## Steps

1. **Pick the target.** Ask which PRD (game or tooling) unless obvious from the
   request. Read its current skeleton.
2. **Gather source material.** Pull from:
   - `CLAUDE.md` — especially § World Design, § Naming, § Verantum mechanics, and
     the schema notes. For the game PRD, **consolidate this content into the PRD**
     as the new source of truth (the user has chosen this).
   - `18dragon.json` — what's already drafted (island map, trains, phases, market).
   - 1822 source: `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/` for
     inherited rules.
3. **Fill sections collaboratively.** For each section: propose a draft grounded
   in the sources, mark open questions explicitly, and get the designer's call on
   anything that shapes play or scope. Keep prose tight.
4. **Flag divergences from 1822** clearly — future stories reference these.
5. **After the game PRD absorbs CLAUDE.md content:** trim CLAUDE.md's design
   sections down to a pointer to `_artifacts/prd-game.md`, keeping only
   schema/tech reference and paths. Confirm before editing CLAUDE.md.
6. **Leave open questions** in the PRD's Open Questions section rather than
   papering over them.

## Rules

- The PRD captures *requirements and decisions*, not implementation. Stories
  (via `agile-epics` / `agile-story`) carry the how.
- Requirements live in `_artifacts/`; shipped documentation lives in `docs/`.
- When requirements change later, update the PRD first, then let
  `agile-party` / `agile-retro` propagate to backlog/epics/sprints.
