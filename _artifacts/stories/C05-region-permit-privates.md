# C05: Define the 5 region permit privates

- **ID:** C05
- **Type:** content
- **Epics:** Privates, Permits
- **Sprint:** sprint-08
- **Status:** done
- **Created:** 2026-07-29

## Story

As the designer,
I want the 5 region-permit privates captured as design documentation — one per
region, with their identical mechanics and region-flavored names,
so that the permit-into-a-company path (PRD §6.1) is fully specified alongside
the rest of the roster, ready to render as cards (C42) later.

## Acceptance Criteria

1. All **5** permit privates are documented — exactly one per region:
   **A** Verantum · **N** Caelimor · **G** Gördum · **M** Muravel · **V** Varstova.
2. Each records the shared mechanics verbatim from `author-privates.md` / PRD §6.1:
   - **Class:** available to **Minor or Major**.
   - **Available:** **Phase 1**.
   - **Player-owned revenue:** **$10**.
   - **On buy-in:** the private **immediately closes** and its company gains a
     **permanent permit for its region** — identical to how a minor's cert grants
     its home-region permit inside a major (PRD §6.1).
   - Permits are permanent, never consumed, uncapped; a company may hold several.
3. Each has a **region-flavored name** consistent with that region's naming
   convention (world-bible §"Naming Conventions"), captured for the designer's
   review (a plain "<Region> Permit" fallback is noted if a name is rejected).
4. Each card records the **full two-sided field set** (per the card anatomy) so
   C42 can render directly:
   - **Top function label** (e.g. "Region Permit"), **in-game title** (the guild
     name), **Phase** (1), **player revenue** ($10).
   - **Ability cadence:** "One Time" (the buy-in permit grant fires once, then the
     private closes).
   - **Class marker:** **Minor/Major → green** number badge, **plus explicit
     "Minor/Major" text** on the card (designer's clarity improvement over PNW).
   - **Company-owned side:** flag the **open question** — a permit private *closes*
     on buy-in, so it likely has **no persistent company-owned face** (the permit
     becomes a marker/token, not a running private). Note this for C42 to resolve.
5. The doc states what these cards do **not** cover, to avoid scope bleed:
   - **Bid-box seeding is out of scope.** Permit privates enter the **general
     randomized auction row** like any private; they are **not** hard-seeded to
     bid box 1. Only the **opener private (C10)** and one specific minor start in
     box 1. (Auction/refresh mechanics belong to the rules track, not here.)
   - **Player-count gates** are C12's call (none assumed here).
   - The **permit mechanic rules** themselves live in C07 (this story documents
     the *cards*, not the gate rules).
   - **Card layout/rendering** is C42's job; C05 records the *field values*, not
     the visual design.
6. Output is **design documentation in `docs/`** (not `18dragon.json`; not
   `_artifacts/`). Fits the shared privates-roster doc structure so C10/C11/C12
   append to the same deliverable.

## Tasks / Subtasks

- [ ] Create/So establish the privates-roster deliverable doc in `docs/`
  (e.g. `docs/privates-roster.md`) with a **Region Permits** section (AC: 5)
  - [ ] Add a shared "how permit privates work" preamble (mechanics once, AC: 2)
- [ ] Document each of the 5 cards: region letter, name, class, phase, revenue,
  buy-in effect (AC: 1, 2, 3)
  - [ ] Propose region-flavored names for designer review (AC: 3):
        - **A / Verantum** (Latin/Roman): *Collegium Verantium* (the Verantine
          road-collegium)
        - **N / Caelimor** (Celtic-ish): *Aeldun Wayfinders* (surveyors' guild)
        - **G / Gördum** (Germanic/Norse, dwarven): *Brekheim Trackgeld* (the
          dwarven railwrights' charter)
        - **M / Muravel** (Mediterranean/Arabic): *al-Kalavar Caravaneers*
        - **V / Varstova** (Slavic-ish): *Varstov Railwrights' Artel*
  - [ ] Note the plain "<Region> Permit" fallback per card (AC: 3)
- [ ] Write the scope-boundary note: bid-box out of scope, gates→C12, rules→C07 (AC: 4)
- [ ] Cross-check the 5 region letters/capitals against the world bible (AC: 1)

## Dev Notes

- **Source of card text:** `_artifacts/author-privates.md` line 1 (the permit
  bullet) + PRD §6.1 (permit privates paragraph) + PRD §4.3 (roster listing).
  These agree — mechanics are identical across all 5, differing only by region.
- **Region letters** (permit overlay letters already on the map): A Verantum,
  N Caelimor, G Gördum, M Muravel, V Varstova (world-bible §regions).
- **Naming**: follow world-bible phonetics per region. Names above are proposals
  for the designer to accept/adjust; capture whatever is chosen verbatim. These
  are the in-world *chartering bodies*, not the capitals.
- **Deliverable location**: `docs/` per the sprint's design-doc-first decision.
  Keep a single roster doc so C10/C11/C12 extend it and C42 renders from it.
- This is the cleanest story in the sprint — mechanics are fully pinned; the only
  live decision is the 5 names.

## Validation

- Design review with the designer: 5 cards present, mechanics match PRD §6.1
  and `author-privates.md`, names approved (or fallback chosen). No JSON touched;
  `18dragon.json` unchanged and still loads. Doc lives in `docs/`.

## References

- [Source: _artifacts/prd-game.md#6.1 Region permits]
- [Source: _artifacts/prd-game.md#4.3 Privates] (roster listing, permit privates)
- [Source: _artifacts/author-privates.md] (line 1 — permit bullet)
- [Source: docs/world-bible.md#Naming Conventions] (region phonetics, capitals)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Created `docs/privates-roster.md` — the shared roster deliverable (C10/C11/C12
  extend it; C42 renders from it). Contains: a **Card anatomy** preamble (two-sided
  1822-style field set, incl. the green/red class badge + the 18Dragon "print the
  class in text" addition, and the two company-side exceptions), and the **Region
  Permits (C05)** section: shared-mechanics table + the 5-card table.
- **5 cards, one per region** — all Minor/Major, Phase 1, $10 player revenue,
  cadence "One Time", function label "Region Permit"; buy-in closes → permanent
  regional permit.
- **Proposed in-game (guild) names** follow each region's naming convention, for
  designer approval: Verantum *Collegium Verantium* · Caelimor *Aeldun Wayfinders*
  · Gördum *Brekheim Trackgeld* · Muravel *al-Kalavar Caravaneers* · Varstova
  *Varstov Railwrights' Artel*. Plain "<Region> Permit" fallback documented.
- **Open items flagged (not decided here):** (1) closing privates likely have no
  company-owned card face — for C42; (2) `P#` numbers assigned once roster order is
  set (C10/C11).
- No JSON touched; `18dragon.json` unchanged and still parses.

### Files Changed

- `docs/privates-roster.md` (new) — roster deliverable; Card anatomy preamble +
  Region Permits section.
