# C06: Document 18Dragon divergences from 1822

- **ID:** C06
- **Type:** content
- **Epics:** Rules & Balance
- **Sprint:** sprint-18
- **Status:** done
- **Created:** 2026-08-18

## Story

As the designer,
I want a single canonical reference listing every deliberate way 18Dragon diverges
from base 1822 — mechanics and numbers — organized in 1822-rulebook section order,
so that the 18Dragon rulebook (C23) can be written as a clean 1822-diff and every
divergence is stated in one place instead of scattered across the PRD.

## Acceptance Criteria

1. **Deliverable:** a new `docs/divergences-from-1822.md` — the canonical 1822→18Dragon
   delta. It is the rulebook-ready list; the PRD stays the design-rationale record and
   is cross-referenced, not replaced.
2. **Scope = mechanics + numbers.** Both the rules/systems divergences (concessions→
   mergers, region permits, round structure, no choices round, modular scaling) **and**
   the numeric/component ones (player range 3–6, starting cash, cert limits, any train-
   roster tweaks). Cosmetic-only changes (currency name, fantasy theme/naming) are **out
   of scope** for this catalog.
3. **Organized by 1822 rules-section.** Entries follow the **actual section order of
   `~/Documents/18xx rulebooks/1822_Rules.pdf`** (its table of contents), so the doc maps
   1:1 onto the C23 rulebook-diff. Under each section, the divergences that touch it.
4. **Each entry states three things:** the **1822 baseline** (what the base game does),
   the **18Dragon change**, and a **one-line why** (or a cross-ref to the PRD section
   that argues it). No rationale essays — the PRD holds those.
5. **Completeness — designer-driven.** Every divergence the designer intends is captured.
   The PRD-recorded divergences (§4.1, §5.1–5.4, §6.1, §6.3, §2) are the **seed
   checklist**; the designer confirms/corrects each and adds any not yet written down.
   **No divergence is authored that the designer has not stated** (this story invents
   nothing — it consolidates).
6. **Verantum (§6.2) appears as a headline divergence only** — the ruins/metro *value
   system* is specified in C08; C06 records "Verantum has a special ruins/metro system
   unlike anything in 1822" and points to C08, without duplicating its detail.
7. Where the catalog surfaces a divergence the PRD states loosely or inconsistently,
   flag it for the designer rather than silently pick a reading.

## Tasks / Subtasks

- [x] Extract the **section skeleton** from `1822_Rules.pdf`'s table of contents to
  organize the catalog against (AC: 3)
- [x] Assemble the **seed checklist** of PRD-recorded divergences (cite each to its PRD
  section) and walk it with the designer — confirm, correct, extend (AC: 5)
- [x] Write `docs/divergences-from-1822.md`: header + section-ordered entries, each with
  1822-baseline / 18Dragon-change / why (AC: 1, 2, 3, 4)
- [x] Add the Verantum headline entry pointing to C08; do **not** inline ruins/metro
  detail (AC: 6)
- [x] Cross-link entries to their PRD sections; flag any loose/inconsistent PRD reading
  for the designer (AC: 4, 7)
- [x] Confirm cash (375/375/375/300) and cert limits (16/16/16/13) match the PRD §6.3
  figures exactly; note they are provisional/playtest-pending (AC: 2, 5)

## Dev Notes

**This is a consolidation story, not a design story.** The designer has explicitly said
the rules are already fully formed in their head — **elicit and record; do not invent.**
Seed the walk-through from the PRD's already-recorded divergences and have the designer
confirm/extend each.

**Seed checklist (PRD-sourced — to confirm with the designer, not to treat as final):**
- **Companies (§4.1, §5.1):** no concessions; **mergers are the sole path to majors**;
  majors are **region-associated** (a pool per region).
- **Round structure (§5.4):** PNW-style — SR → phase's ORs, with a **Merger Round after
  every OR from phase 2**; **no Choices round** (it existed for concession conversion).
- **Auction (§5.2):** bidbox items are **minors + privates** (no concessions); the
  **opener private (5P) sits in bid box 1** at start.
- **Track/permits (§5.5, §6.1):** laying **new yellow** in a region needs that region's
  **permit**; **upgrades are permit-free**. (Headline only — full mechanic is C07.)
- **Trains/phases (§5.3):** roster from **base 1822, not PNW**; possible **low-count
  removal of some 3-/4-trains** at 3–4p (under evaluation).
- **Players & scaling (§2, §6.3):** **3–6 players** (not 1822's 2–7); **modular board**
  turns regions on/off; **cash 375/375/375/300** (total *falls* at low counts — a
  deliberate divergence from 1822's constant ~2100); **cert limits 16/16/16/13** via
  active majors.
- **Verantum (§6.2):** headline entry only → C08.

**Rulebooks available (designer, 2026-08-18):** `~/Documents/18xx rulebooks/` holds
`1822_Rules.pdf`, `1822PNW Draft Rules.pdf`, and `1822CA_Rules.pdf`. This **resolves the
section-skeleton question** — organize against `1822_Rules.pdf`'s real TOC (AC 3), no
need to wait on C22.

**Baseline-per-divergence — mind which rulebook.** 18Dragon is a hybrid (§5.3): mergers
(§5.1) and round structure (§5.4) are **PNW-derived**, so those entries diff against the
**PNW** rulebook's behavior, not a base-1822 that has no mergers at all. The train roster,
auction, and market diff against **base 1822**. State the baseline rulebook per entry so
the diff is honest.

**1822 engine source (secondary):** `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/`
for exact base-game numbers where the PDF is ambiguous.

*(`~/Documents/18xx rulebooks/18dragon.html` is an early map draft — not a rules source.)*

**Deliverable location:** `docs/` (deliverable documentation), never `_artifacts/`.

## Validation

- `docs/divergences-from-1822.md` exists, is organized in 1822-section order, and every
  entry has the three parts (baseline / change / why). The designer reviews and confirms
  the catalog is **complete and accurate** — no invented rules, nothing intended left
  out. Numbers match PRD §6.3. Verantum detail correctly deferred to C08.

## References

- [Source: _artifacts/prd-game.md#5. Core Mechanics] (mergers, auction, trains, rounds, track)
- [Source: _artifacts/prd-game.md#6. Special Mechanics] (permits, Verantum, scaling)
- [Source: _artifacts/prd-game.md#2. Players & Session] (3–6 player range)
- [Source: _artifacts/prd-game.md#7. Balance Targets] (provisional numbers)
- [Source: `~/Documents/18xx rulebooks/1822_Rules.pdf`] — section skeleton + base-1822 baseline
- [Source: `~/Documents/18xx rulebooks/1822PNW Draft Rules.pdf`] — baseline for PNW-derived divergences (mergers, round structure)
- [Source: 18xx engine g_1822] `/Users/earlmiles/Projects/18xx/lib/engine/game/g_1822/` (exact numbers)
- [Related: C22/C23 (rulebook) — this doc feeds the 1822-diff rulebook]
- [Related: C08 (Verantum ruins/metro detail, deferred-to by AC 6)]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

**Deliverable:** `docs/divergences-from-1822.md` — the divergence catalog across 8
sections (1822's own §1–§10 order, §§6–9 replaced by Verantum) + a "Not adopted /
replaced" tail. Baseline tags `[1822]` (18) / `[PNW]` (9) / `[new]` (7). Each
entry: 1822 baseline → 18Dragon change → PRD/story ref.

**Method:** walked the actual `1822_Rules.pdf` section-by-section with the designer,
diffing against the real rule text (and PNW where 18Dragon is PNW-derived). Nothing
invented — every entry was confirmed or corrected by the designer live.

**Design decisions captured / clarified during the walk:**
- **Stock market:** 18Dragon uses PNW's **1D linear** market; 1822's is **2D** — a real
  divergence. (Flagged: project `CLAUDE.md` mislabels *1822* as 1D; the game data is
  correct, the note is wrong — left for a later cleanup, not touched.)
- **Bid cubes:** flat **4 per player** (provisional), vs 1822's 6/5/4/3.
- **Choices round:** the PRD §5.4 "drops the choices round" line was an **error** — base
  1822 has no such round (concession conversion is in the SR). Corrected in the PRD.
- **Capitalisation:** **formation-based, not phase-based** — merged companies always
  incremental; full cap only for stock-round flotation.
- **Bid boxes:** 4 minor + 3 private, opener (5P) in box 1 (concession boxes removed).
- **Acquire-a-minor:** bid-box price kept at **200gp**; 1822's exchange-token-via-
  acquisition is inherited-and-extended (also grants the region permit).
- **Regionals / builder cubes / timber trade (PNW):** explicitly **not adopted**.
- **Game End:** inherited; wealth calc actually *simpler* (no concession clause of 1822,
  no regional clause of PNW). "first-SR-nothing-sold" is a real rule in both parents.
- **Scope boundaries:** merger detail deferred to **C13**, Verantum ruins/metro to
  **C08** (headline entries + cross-refs only, not front-run).

**PRD reconciliation:** corrected the erroneous "choices round" bullet in
`_artifacts/prd-game.md` §5.4 (dated note), and — after review — recorded the three
decisions the walk-through produced that existed only in the new catalog, so the PRD
stays the design record: **bid cubes flat 4** and the 4+3 bid-box count (§5.2, which
had said the auction was "unchanged"), **formation-based capitalisation**, and the
**200gp** bid-box acquisition price (§5.1).

### Review pass (2026-08-19)

Fresh-eyes review against `1822_Rules.pdf`, `1822PNW Draft Rules.pdf`, the
`g_1822` / `g_1822_pnw` engine sources, `18dragon.json`, and the PRD. Verified
correct: the whole 1822 section skeleton (§1.1–1.7, §3.1–3.4, §4.6–4.10/4.12, §5.7,
§5.9.11, §§6–9, §10–§13), 1822's setup table, the 4/3/3 bid-box counts (§4.10.1), the
§4.1.3C action list, all PNW section numbers, both game-end wealth clauses, the Verantum
numbers, and the 1D-vs-2D catch (`CLAUDE.md` is indeed the thing that's wrong).

Corrections applied:

- **§1.6 stock market was wrong in both details.** It claimed 18Dragon retains 1822's
  six par values and the yellow zone. It retains neither: `18dragon.json` implements
  PNW's **nine** par values (50 + 55/60/65/70/75/80/90/100) and has **no yellow zone** —
  PNW §1.7.6 abolishes it, so **every share always counts against the cert limit**. The
  divergence is larger than written; rewritten with the 1822 baseline cited (§1.6.3–5).
- **§1.4 split Verantum off from the five regions** ("five regions plus the Verantum
  island"). Verantum **is** region A (PRD §3.1). Fixed here and in §7's framing.
- **Modular scaling had no entry** despite being in scope (AC 2) — added **§1.7b**, with
  the region-by-count table, what a dropped region takes with it, why no sealing rule is
  needed, and what does *not* scale (PRD §3.2, §6.3).
- **Ambiguous `§` refs.** Several `(§6.1)` pointed at *PRD* §6.1 while this doc's §6 is
  the Merger Round. Added a "Section references" convention to the header (bare `§` =
  rulebook, `PRD §` = design record) and fixed every site. `§x.x`-style placeholder
  headings replaced with real numbers (§3.4b, §5.7b, §5.16–5.18).
- **Player range.** "1822: 2–7" contradicted the doc's own 3–7 rows; 1822 §1.7.2 is
  **3–7** and 2p exists only as a §13 scenario variant. Corrected.
- **Tag legend.** `[PNW]` was defined as "18Dragon follows PNW" but also used for things
  PNW has that 18Dragon **declines** (train roster, regionals, builder cubes, timber).
  Legend reworded to "the baseline is PNW; the entry says which way it goes."
- **§8 game end** claimed 1822 and PNW are identical. They differ on trigger precedence
  (1822 §10.1.2 locks the first trigger; PNW §7.1.8 lets a sooner one win). **Designer,
  2026-08-19: follow 1822 — the first trigger locks.**
- **§1.5 bank.** "Proportionally larger at low counts" was imprecise — it is larger at
  every count. Added the actual post-setup bank figures. **Designer, 2026-08-19: the
  12,000 includes starting cash by default — all money in play comes from the bank, so
  it needs no special statement.**
- Smaller: 1822's start-money total is exactly 2100 (not "~2100"); currency mixing
  (`$10` → `10 gp`, `$200` → `200`) in 18Dragon-side text; PNW's share-price-movement
  step is PNW §4.10, not §4.12; entry/tag counts above corrected.

**Not changed (designer, 2026-08-19):** the bridge-tile privates' toll rule gets **no**
headline entry — it is clear on the private card itself.

### Files Changed

- `docs/divergences-from-1822.md` — **new**, the divergences catalog (the deliverable);
  revised by the 2026-08-19 review pass above.
- `_artifacts/prd-game.md` — §5.4 choices-round error corrected; §5.1 gains
  formation-based capitalisation + the 200gp acquisition price; §5.2 gains the flat
  4 bid cubes and the 4+3 bid-box count.
