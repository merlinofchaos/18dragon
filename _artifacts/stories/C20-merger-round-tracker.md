# C20: Add Merger round to the rounds tracker (JSON)

- **ID:** C20
- **Type:** content
- **Epics:** Game Components, Rules & Balance
- **Sprint:** sprint-15
- **Status:** done
- **Created:** 2026-08-17

## Story

As the designer,
I want the 18Dragon round structure reflected in `18dragon.json` — the Merger
round added to the `rounds` tracker and the stale 1822 concession references
removed from the phase notes,
so that the rendered round tracker and phase table match 18Dragon's rules
(mergers replace concessions; a Merger round follows every OR from phase 2 on).

## Acceptance Criteria

1. **Merger round in the tracker.** The top-level `rounds` array reads, in display
   (reverse) order, as the **phase-2+ operating cycle**:
   `SR → OR1 → MR → OR2 → MR` — i.e. a Merger round after **each** Operating Round
   (PRD §5.4). The MR entries use name **"MR"** and color **`blue`** (`#2165ae`,
   already defined in `colors`). SR stays white, OR1 green, OR2 brown.
2. **Phase-1 exception recorded.** Phase 1's single OR (starting packet) has **no**
   Merger round (PRD §5.4). Since the `rounds` tracker is a fixed repeating
   template and can't vary per phase, capture the exception as a **`pools` note**
   (or equivalent visible note in the file) rather than trying to encode it in the
   tracker — "Phase 1: one OR, no Merger round."
3. **Concession references removed from phase notes** (settled — 18Dragon has no
   concessions, PRD §5.1):
   - Phases 2/3/4: drop **"Concessions may be converted"** entirely.
   - Phase 5: drop **"Concessions close."**; **keep** "Minors may be acquired from
     bidbox for 200gp".
4. **Merger-economics notes left provisional (NOT redesigned here).** "Full
   capitalisation" (phases 6/7) and the "Minors may be acquired from bidbox for
   200gp" text stay as inherited-1822, **flagged provisional pending C13** (merger
   mechanic). C20 does not touch merger economics.
5. **Loads clean.** `18dragon.json` still parses and loads in 18xxMaker with no
   schema error/crash; the round tracker renders showing SR/OR1/MR/OR2/MR.

## Tasks / Subtasks

- [ ] Edit the top-level `rounds` array to `SR, OR1, MR, OR2, MR` in the file's
  reverse-display order, with the two MR entries `{ "name": "MR", "color": "blue" }`
  (AC: 1)
- [ ] Add the phase-1 no-MR exception as a `pools` note (or nearest visible note)
  (AC: 2)
- [ ] Remove "Concessions may be converted" from phases 2/3/4; remove "Concessions
  close." from phase 5, keeping the bidbox-minor clause (AC: 3)
- [ ] Leave phases 6/7 "Full capitalisation" text as-is; note it provisional
  pending C13 in the story Dev Notes (AC: 4)
- [ ] Load `18dragon.json` in 18xxMaker; confirm no error and the tracker renders
  the new sequence (AC: 5)

## Dev Notes

**Design (settled).** PRD §5.4: round structure follows PNW — each Stock Round →
the phase's Operating Rounds, with a **Merger Round after every Operating Round
from phase 2 onward**; phase 1's single OR has none. 1822's **Choices round is
dropped** (it existed for concession conversion; no concessions → no choices
round) — confirm no choices round lingers in the file.

**Tracker representation.** The `rounds` tracker is a single fixed template, not
per-phase; showing the full phase-2+ cycle (`SR → OR1 → MR → OR2 → MR`) is the
literal-to-rules choice (designer's call, 2026-08-17). CLAUDE.md: `rounds` is
listed **reverse order** (last round first). MR color `blue` reuses the existing
`colors.blue` (#2165ae).

**Out of scope (→ C13).** Merger *resolution* — the double-market-price ÷ par
formula, exchange tokens, absorption, "full capitalisation" semantics — is the
merger mechanic (C13), undesigned. C20 only places the round and removes the
definitively-wrong concession text. The `turns` section's *merger-round steps*
also wait on C13 (and/or the C19 reference cards); C20 does not add merger turn
steps.

**Provisional (pending C13).** Phases 6/7 "Full capitalisation" and the phase-5+
"Minors may be acquired from bidbox for 200gp" are inherited-1822; kept as-is and
flagged for revisit once C13 settles merger economics and §5.2's item mix.

## Validation

- `18dragon.json` loads in 18xxMaker (dev server, File > Open) with **no schema
  error/crash**, and the **round tracker renders** the sequence SR / OR1 / MR /
  OR2 / MR with MR in blue.
- Phase table shows no concession references; phases 6/7 retain their provisional
  capitalisation note.

## References

- [Source: _artifacts/prd-game.md#5.1 mergers], [Source: prd-game.md#5.4 round structure]
- [Source: 18dragon.json] (`rounds`, `phases`, `colors`, `pools`)
- [Source: CLAUDE.md#rounds] (reverse-order tracker; name/color fields)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- **`rounds`** = `[SR, OR1, MR, OR2, MR]` (**forward** play order) → the play
  sequence **SR → OR1 → MR → OR2 → MR**. **All circles `white`** — the designer
  dropped per-round colors (the SR-white/OR-green/MR-blue/OR2-brown scheme didn't
  match play reality); the ring reads by label + arrows, not color.
  - **Order correction (surfaced by C16's render):** first authored in reverse
    order per CLAUDE.md's old note, but a `"round"` tracker draws arrows in array
    order, so reverse ran the ring **backwards**. Forward order is correct for
    `"round"` (and plain `"row"`) trackers — confirmed against **1861**
    (`[SR, OR1, MR, OR2, MR]`, same structure). CLAUDE.md § `rounds` updated to
    make the ordering tracker-type-dependent.
- **Phase-1 exception** captured as a phase note: `"Single OR; no Merger round"`
  (renders in the phase chart against phase 1 — the natural "equivalent visible
  note" the AC allowed, clearer than a Market-pool note).
- **Concession text removed:** phases 2/3/4 notes dropped entirely; phase 5's
  "Concessions close." stripped, keeping "Minors may be acquired from bidbox for
  200gp".
- **Provisional (pending C13):** phases 6/7 "Full capitalisation…" and the phase-5+
  bidbox-minor note left as inherited-1822.
- **Verified:** `18dragon.json` parses (JSON valid); loads in 18xxMaker (dev server
  :3000) with **no console errors** ("Game Loaded"). `rounds`/phase-notes confirmed
  correct programmatically.
- **Visual-render note:** the round tracker is **config-gated** (`config.*.
  roundTracker`) and its map placement + visual are **C16** (done, signed off) —
  the ring renders the sequence correctly.
- **Phase notes are app-only (do not re-examine):** the `phases[].notes` in
  `18dragon.json` are consumed **only** by 18xxMaker's `Phase.jsx` reference page,
  which we don't print. The phase reference that actually prints is the charter
  generator's own `PHASES` array (`tools/gen-charters.mjs`), which is already
  correct/merger-based (no concessions). So C20's phase-notes cleanup was
  game-file correctness only, not a deliverable change. **Signed off** 2026-08-17.

### Files Changed

- `18dragon.json` — `rounds` (now `[SR, OR1, MR, OR2, MR]` forward order, two
  `MR`/blue entries); `phases` (phase-1 note added; concession notes removed from
  2/3/4/5)
- `CLAUDE.md` — § `rounds` corrected: array order is tracker-type-dependent
  (forward for `"round"`/`"row"`; reverse only for `-reverse` types)
