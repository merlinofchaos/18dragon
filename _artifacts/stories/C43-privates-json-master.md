# C43: Canonical privates.json (custom-schema data master)

- **ID:** C43
- **Type:** content
- **Epics:** Privates, Game Components
- **Sprint:** sprint-08
- **Status:** done
- **Created:** 2026-07-29

## Story

As the designer,
I want a canonical, machine-readable `privates.json` in our custom 18Dragon schema,
so that the private roster has a single tool-agnostic source of truth that any
renderer (18xxMaker or an alternative) can consume — independent of `18dragon.json`,
which is just one rendering target.

## Acceptance Criteria

1. `privates.json` at the repo root holds all **30** privates (P1–P30), one entry
   per card, mirroring `docs/privates-roster.md`.
2. **Custom 18Dragon schema** (NOT the stock 18xxMaker `privates` schema): fields
   `id, name, function_label, category, class, badge, phase, player_revenue,
   company_revenue, cadence, players_required, reverse, source, rules_text, extra`.
   A `schema` block documents each field; a `meta` block gives game/count/source.
3. Data matches the roster doc exactly: names, classes/badges, phases, revenues,
   cadence, **players_required gates** (4+ = P9/P15/P30; 5+ = P8/P11/P19; rest 3+),
   and verbatim sourced `rules_text`.
4. `extra` carries card-specific structured data (region/grant for permits;
   bridge_locations+toll; discount+terrain for troupes; bonus/target; +train; etc.).
5. Valid JSON; automated cross-checks pass (IDs contiguous, gate tally 24/3/3,
   class↔badge consistent, categories sum to 30).

## Tasks / Subtasks

- [x] Design the custom schema + author `privates.json` (30 entries) (AC: 1, 2, 4)
- [x] Transcribe all fields from the roster doc, incl. gates + sourced text (AC: 3)
- [x] Validate JSON + cross-check counts/gates/consistency (AC: 5)
- [x] Point `docs/privates-roster.md` at `privates.json` as the data master (AC: 1)

## Dev Notes

- **Why separate from `18dragon.json`:** the designer treats `18dragon.json` as a
  *rendering* target, not the master list. Our card schema (two-sided,
  `players_required`, class badge, `function_label` vs `name`) is richer than
  18xxMaker's stock `privates` fields, so a custom master is warranted — especially
  if C42 selects a non-18xxMaker renderer.
- **Feeds C42.** C42 (produce the cards) consumes `privates.json` whatever renderer
  is chosen; if 18xxMaker is picked, a transform maps the subset it supports.
- Created via a direct designer request during Sprint 8 (after C11a/C11b/C12); this
  story records the deliverable so `sprint-status.yaml` stays honest.

## Validation

- `python3 -c "import json; json.load(open('privates.json'))"` parses; cross-checks:
  30 privates, P1–P30 contiguous, gate tally {3:24, 4:3, 5:3}, no class/badge
  mismatch, categories {opener:1, permit:5, perm-train:3, original:13, sourced:8}.
  `18dragon.json` untouched.

## References

- [Source: docs/privates-roster.md] (the human-readable companion)
- [Source: _artifacts/prd-game.md#4.3 Privates], [#6.3 Player-count scaling]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Authored `privates.json` (repo root): `meta` + `schema` blocks + 30-entry
  `privates` array in the custom schema. Cross-checks pass (see Validation).
- Roster doc header now names `privates.json` as the canonical data master.
- No JSON wiring into `18dragon.json` (still deferred / C42-dependent).

### Files Changed

- `privates.json` (new) — canonical data master.
- `docs/privates-roster.md` — header now references the data master.
