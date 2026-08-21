# C14: Resolve PRD open questions (§9)

- **ID:** C14
- **Type:** content
- **Epics:** Rules & Balance, Mergers, Verantum
- **Sprint:** sprint-18
- **Created:** 2026-08-20
- **Status:** done

## Story

As the designer,
I want the remaining PRD §9 open questions closed and §9 marked fully resolved,
so that the signature-mechanics batch leaves no dangling design questions before the
rulebook (C22/C23).

## Acceptance Criteria

1. **Confirm the mechanic questions are already resolved.** The §9 **Mergers** (C13) and
   **Verantum** (C08) questions were closed and marked ✅ during this sprint — C14 just
   verifies they're recorded, not re-opens them.
2. **Resolve the General questions:**
   - **Currency name** — decide whether `#gp` (gold pieces) is final or renamed. If
     renamed, capture the new name/symbol and note that propagation into `18dragon.json`
     (`info.currency`) and the component generators is a **separate follow-up** (scope it,
     don't do the mass rename inside this closure story).
   - **Target play length** — set a target play time for the game (used in §2 and later
     rulebook front-matter).
3. **Update the PRD:** write the decisions into §2 (currency, length) and mark **§9 fully
   resolved** (or note any question the designer chooses to keep open, with why).

## Tasks / Subtasks

- [x] Confirm §9 Mergers + Verantum are marked resolved (C08/C13) (AC: 1)
- [x] Resolve currency name with the designer; record in PRD §2 (ducats, display gp;
  no propagation needed) (AC: 2, 3)
- [x] Resolve target play length — designer chose to **keep open** (playtest-set); marked
  as the one deliberate §9 deferral (AC: 2, 3)
- [x] Mark PRD §9 resolved (currency ✅; play length ⏳ deliberately open) (AC: 3)
- [x] Reconcile CLAUDE.md currency line (AC: 3)
- [x] Designer review (AC: 1–3)

## Dev Notes

**Closure story — no new mechanics.** The heavy §9 items (merger exchange-token "other
means" / par range / non-home hex; Verantum metro increments / tile-lay rules /
second-city conditions) were resolved in **C13** and **C08**. C14 mops up the two
**General** questions and closes §9.

**Currency:** `#gp` is provisional (CLAUDE.md: "may be renamed after world design"). If
the designer keeps it, mark final; if renamed, the actual string swap across
`18dragon.json` + generators/print is a **separate story**, not this one — C14 records the
decision only.

**Play length:** PRD §2 currently says "target play time TBD."

**Deliverable location:** PRD (`_artifacts/prd-game.md`) — this is a design-record
closure, not a `docs/` deliverable.

## Validation

- PRD §9 shows all questions resolved (or explicitly-kept-open with rationale); §2
  records the currency and play-length decisions. Designer confirms.

## References

- [Source: _artifacts/prd-game.md#9 Open Questions], [#2 Players & Session]
- [Related: C08 (Verantum §9 resolved), C13 (merger §9 resolved)]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

**§9 closed out.** The mechanic questions were already resolved this sprint (Verantum =
C08, mergers = C13). C14 resolved the two General questions:

- **Currency = ducats** (designer, 2026-08-20). Components **keep the `gp` display text**
  (the `#gp` → `150gp` format is retained, so nothing re-renders); "ducats" is the name
  used in prose/the rulebook. A full swap to a ducat name/glyph on components would be a
  separate propagation story — not required.
- **Target play length — deliberately kept open.** The designer chose not to guess a
  number; it will be set from playtest. This is the **one remaining open §9 item**, marked
  ⏳ (a valid deferral, not a gap).

**Reconciliations:** PRD §2 (currency + length) and §9 updated; CLAUDE.md's currency line
updated to match.

### Files Changed

- `_artifacts/prd-game.md` — §2 currency (ducats/gp) + length (open); §9 General resolved.
- `CLAUDE.md` — currency line updated (ducats; `#gp` display retained).
