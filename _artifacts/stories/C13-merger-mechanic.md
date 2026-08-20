# C13: Specify the merger mechanic

- **ID:** C13
- **Type:** content
- **Epics:** Rules & Balance, Mergers
- **Sprint:** sprint-18
- **Status:** done
- **Created:** 2026-08-20

## Story

As the designer,
I want the merger mechanic captured completely — the merger round, eligibility, choosing
the major, the full procedure (value/par/shares/tokens), exchange tokens, and how a major
grows by acquiring minors — with the PRD §9 merger open questions resolved,
so that the rulebook (C22/C23) can lift it. (Capture doc, not finished prose.)

## Acceptance Criteria

1. **Deliverable:** append **§3 "Mergers"** to `docs/signature-mechanics.md`. Plain,
   content-focused. This replaces the → C13 stub.
2. **The merger round.** Runs after **every operating round from phase 2 onward** (phase
   1's single OR has none). Mergers are resolved in **descending share-price order** —
   the highest-valued eligible minor gets first opportunity; a minor that passes may
   still merge later when a lower-valued minor is offered (PNW §6.1.2).
3. **Eligibility.** All must hold: **Phase 2+**; one player is **president of both**
   minors; the two minors are in **different regions**; and their tracks are **connected**
   by a route not blocked by tokens (any length). *(18Dragon has no
   associated/unassociated distinction — any two qualifying minors.)*
4. **Choosing the major.** The player picks which minor provides the **home token**
   (placed at that minor's location) and an **available major associated with the home
   minor's region**. If that region has no available major, that minor can't be the home
   token (try the other minor as home, else the merger can't form).
5. **Procedure:**
   1. **Value** = double each minor's market price and sum → the total the player is owed.
   2. **Par** — choose from the major par values **55/60/65/70/75/80/90/100**, **≥ total
      ÷ 6**; if total > 600, par **must be 100**. *(The ÷6 floor caps the payout at 6
      shares.)*
   3. **Shares** = total ÷ par, rounded to whole shares. Round **up** → the player pays
      the company the difference; round **down** → the company pays the player. (The
      president's 20% certificate counts as its two shares toward this.)
   4. **Assets** — place both minors' cash, trains, and privates on the major charter;
      **both minors are removed** from play.
   5. **Home** — the chosen minor's board token becomes the major's **home station**.
   6. **Tokens** — the major takes onto its charter its placed **home token**, **2
      exchange tokens** (reserve), and a **destination token** (base-1822 destination
      rules).
   7. **Non-home minor's board token — president's choice** (PNW §6.3.1 step 7): remove
      it and **either** place a major token there (from exchange) **or** leave the hex
      vacant and move a token from exchange → available.
   8. **Capitalisation** — a merged major always uses **incremental** capitalisation
      (§ per C06; full cap is stock-round-flotation only, which majors never do).
   9. The major **runs in the next operating round** (its first turn).
6. **Exchange tokens.** A reserve token on the charter (not the board), 2 gained at
   formation. It converts to a **placeable (available)** token by: **(a) acquiring a
   minor** (each acquisition converts one), and **(b) the P28 Station Token Swap
   private** (moves a token exchange↔available, one-time, then closes). *(Certain
   privates can also place an exchange token directly on the board — private powers, not
   core merger rules; see the privates roster.)*
7. **Acquiring a minor (post-formation growth).** Inherited from 1822 (willing player,
   phases 2–7; bid box, phases 5–7, 200gp — divergences doc §5.16–5.18). Acquisition
   absorbs the minor's assets, makes the minor's certificate a **permit** for its region
   inside the major (§1 / C07), and **converts one exchange token** to available.
8. **PRD reconciliation.** Update PRD §5.1 for the resolved details (par 55–100 + ÷6/600
   rules; non-home hex = president's choice; descending-share-price order) and mark the
   **§9 merger open questions resolved** (exchange-token "other means" = the P28 private;
   par range; non-home hex fate).

## Tasks / Subtasks

- [x] Write `docs/signature-mechanics.md` §3 (merger round, eligibility, choose-major,
  procedure, exchange tokens, acquire-a-minor) (AC: 1–7)
- [x] Update PRD §5.1: par range + floor rules, non-home-hex choice, merger order;
  replace "plus other means — see §9" with the P28 private (AC: 8)
- [x] Mark PRD §9 merger open questions **resolved** (AC: 8)
- [x] Cross-link: C07 (permit half of acquisition), divergences doc §6 / §5.16–5.18,
  PNW §6 (baseline)
- [x] Note the P21 dit→city private as a deliberate exception in §2 (designer, 2026-08-20)
- [x] Designer review for completeness/accuracy (AC: 1–8)

## Dev Notes

**Consolidation + resolution.** PRD §5.1 already carries most of the mechanic; C13
formalizes it and resolves the three §9 merger open questions from the designer's
decisions (2026-08-20):

- **Par:** 55–100 (major par values), **≥ total ÷ 6**; total > 600 → par 100. (PNW's
  rules on 18Dragon's par set; 50 is minors-only so excluded.)
- **Exchange-token "other means":** the **P28 Station Token Swap** private (*The Concord
  Charter*) — moves a token exchange↔available, then closes. So conversion = acquiring a
  minor **or** P28.
- **Non-home minor's board hex:** **president's choice** (PNW step 7) — re-token it with a
  major token from exchange, or vacate it and move exchange→available.
- **Merger order:** **descending share price** (PNW §6.1.2).

**Baseline:** PNW §6 (Merger Round: Introduction / Eligibility / Merger Procedure). The
big 18Dragon change is **no associations** — PNW pairs a specific associated minor with an
unassociated one to form the *corresponding* major; 18Dragon lets any two connected
minors in different regions merge, and the player **chooses** the major from the home
minor's regional pool.

**Scope boundary with C07:** the **permit** effect of acquiring a minor is specified in
C07 (§1); C13 owns the **exchange-token** effect and the merger procedure itself.

**⚠️ Cross-consistency flag (raise with designer):** `data/privates.json:382` has a
private whose text reads *"upgrade a Verantum **dit to a city** … and place an Exchange
token there."* This contradicts the C08 rule that **dits do not upgrade to cities**.
Resolve which stands: (a) it's a deliberate private-power exception (private powers
override rules, 1822 §1.3), or (b) stale text to fix (e.g. "develop a Verantum ruins hex
into a city"). Not a blocker for C13, but the two docs should agree.

**Deliverable location:** `docs/` (never `_artifacts/`).

## Validation

- `docs/signature-mechanics.md` §3 fully specifies the merger mechanic; PRD §5.1 updated
  and §9 merger questions marked resolved. Designer confirms complete and accurate — no
  invented rules, nothing intended left out.

## References

- [Source: _artifacts/prd-game.md#5.1 Mergers], [#9 Open Questions (Mergers)]
- [Source: `~/Documents/18xx rulebooks/1822PNW Draft Rules.pdf` §6 Merger Round]
- [Source: data/privates.json — P28 Station Token Swap (exchange-token conversion)]
- [Source: docs/divergences-from-1822.md §6 Merger Round / §5.16–5.18 acquire-a-minor]
- [Related: C07 (permit half of acquiring a minor)]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

**Deliverable:** wrote `docs/signature-mechanics.md` **§3 Mergers** — the merger round
(descending share-price order, phase 2+); eligibility (president of both, different
regions, connected); choosing the major (home token + available major for the home
region); the full 9-step procedure (value → par → shares → assets → home → tokens →
non-home-hex choice → incremental cap → runs next OR); exchange tokens; and post-formation
minor acquisition.

**§9 merger questions resolved (designer, 2026-08-20):**
- **Par** — 55–100, **≥ doubled-sum ÷ 6**, forced to 100 if the sum > 600 (PNW's rules on
  18Dragon's par set; the ÷6 floor caps the payout at 6 shares).
- **Exchange-token "other means"** — the **P28 Station Token Swap** private (moves a token
  exchange↔available, then closes). Conversion = acquiring a minor **or** P28.
- **Non-home minor's hex** — **president's choice** (PNW step 7): re-token from exchange, or
  vacate and move exchange → available.
- **Order** — descending share price (PNW §6.1.2).

**Baseline:** PNW §6. The big 18Dragon change is **no associations** — any two connected
minors in different regions merge, and the player chooses the major from the home
region's pool.

**Cross-consistency resolved:** the P21 *Verantum Recolonization* private (dit→city) is a
**deliberate private-power exception** to C08's "dits don't upgrade to cities" (designer,
2026-08-20) — noted in `signature-mechanics.md` §2's development table.

**Reconciliations:** PRD §5.1 updated (par range/floor, non-home-hex choice, merger
order, P28 for the exchange-token "other means"); PRD §9 mergers marked ✅ resolved.

### Files Changed

- `docs/signature-mechanics.md` — new **§3 Mergers**; §2 dit-row exception note (P21).
- `_artifacts/prd-game.md` — §5.1 resolved details; §9 mergers marked resolved.
