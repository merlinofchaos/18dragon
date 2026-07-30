# C12: Assign 4+/5+ player-count gates to privates

- **ID:** C12
- **Type:** content
- **Epics:** Privates, Scaling
- **Sprint:** sprint-08
- **Status:** done
- **Created:** 2026-07-29

## Story

As the designer,
I want every private assigned a **Players required** gate (3+/4+/5+) in the roster
doc,
so that the private pool scales with player count alongside the modular board
(§6.3), and the card's Players-required field is filled for all 30.

## Acceptance Criteria

1. All 30 privates carry a **Players required** value (3+/4+/5+) in
   `docs/privates-roster.md`. (6p uses the 5p region set, so no 6+ gate exists.)
2. **Region permits inherit their region's availability** (§6.3 — dropping a
   region removes its permit private). This **corrects C05's "all permits 3+"**:
   - Verantum / Caelimor / Gördum permits (P5/P6/P7) + opener (P1): **3+** (core).
   - **Varstova permit (P9): 4+** (region E added at 4p).
   - **Muravel permit (P8): 5+** (region S added at 5p).
3. **Exactly 3 privates gated at 5+ and 3 at 4+** (6 total, **including the two
   scaling-region permits**); the rest 3+.
4. **Gate only duplicates** — every gated *non-permit* private is a **2nd copy**
   whose sibling stays 3+, so no ability ever disappears at low counts.
5. Final assignment (designer, 2026-07-29):

   | Gate | Privates | Rationale |
   |------|----------|-----------|
   | **4+** | P9 Varstova permit · **P15 Dwarven Mining (Stonebeard Hewers)** · P30 Pullman (Wyvern Coachworks) | region E; a 2nd mountain-discount + 2nd pullman for the larger board |
   | **5+** | P8 Muravel permit · **P11 Bridge (Halvard's Crossing)** · P19 Phlogiston Car (The Emberwain) | region S; the **2nd bridge matches R23 (Muravel's bridge site, only present at 5p)**; a 2nd extra-stop car for the most companies |

   (Flagged pair: Bridge → 5+, Dwarven → 4+. Both regular Mining Troupes stay 3+.)
6. **Resulting pool sizes:** 3p **24** · 4p **27** · 5p **30** · 6p **30**.
7. Both regular Mining Troupes (P12/P13) stay **3+** (designer: expensive center
   needs contestable discounts) — confirmed, not gated.
8. On implementation, update the **C05 permits section** (P8/P9 gates) and the
   **fields tables** so the roster doc is internally consistent.

## Tasks / Subtasks

- [ ] Add a **Players required** value to every private in the roster doc (AC: 1)
- [ ] Correct the **C05 Region-Permits** section: P8 Muravel 5+, P9 Varstova 4+;
  note the §6.3 region-scaling reason (AC: 2, 8)
- [ ] Apply the 6 non-permit gates from the approved table (AC: 3, 4, 5)
- [ ] Add a **"Player-count gates" summary** subsection to the roster doc: the
  3+/4+/5+ lists, the pool-size table, and the "gate only duplicates" principle
  (AC: 4, 6)
- [ ] Note the tie to §6.3 region scaling (permits) and that 6p = 5p set (AC: 1, 2)

## Dev Notes

- **Source:** PRD §6.3 (modular board: A/N/D core, +E at 4p, +S at 5p; dropping a
  region removes its permit private) + §4.3 (4+/5+ gated privates) + the C11a gate
  steer in the roster doc (gate 1 Bridge + 1 Dwarven; keep regular Troupes in).
- **Designer decisions (2026-07-29):** permits inherit region gate (Varstova 4+,
  Muravel 5+); exactly **3 privates gated at 5+ and 3 at 4+ (6 total, incl. the two
  permits)**; Bridge → 5+, Dwarven → 4+.
- **"Gate only duplicates" principle:** the four gated non-permits are all 2nd
  copies (Dwarven P15, Pullman P30 / Bridge P11, Phlogiston Car P19) — the game
  never loses an *ability*, only a redundant second copy, at lower counts.
- **6p:** no region is added beyond 5p, so 6p and 5p share the private set; the
  card field only needs 3+/4+/5+.
- Balance (pool sizes 22/26/30) is provisional — a playtest tunable (§7).

## Validation

- Design review: all 30 privates have a gate; permit corrections applied to the
  C05 section; non-permit gates match the approved table; pool-size table correct;
  regular Troupes confirmed 3+. No JSON touched; `18dragon.json` still loads.

## References

- [Source: _artifacts/prd-game.md#6.3 Player-count scaling]
- [Source: _artifacts/prd-game.md#4.3 Privates] (4+/5+ gated privates)
- [Source: docs/privates-roster.md] (roster + C11a gate steer)

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

- Assigned **Players required** to all 30 privates in `docs/privates-roster.md`.
  Added a **Players req.** column to the C05 permits table, the C11a table, and the
  C11b table; corrected the C05 shared-mechanics line (permits vary by region).
- Added an authoritative **Player-count gates (C12)** summary subsection: the two
  design rules (permits-follow-region, gate-only-duplicates), the 6-gated table,
  and the pool-size table (24/27/30/30).
- **6 gated (3 per level, incl. permits):** 4+ = P9 Varstova permit, P15 Dwarven
  (Stonebeard Hewers), P30 Pullman (Wyvern Coachworks); 5+ = P8 Muravel permit,
  P11 Bridge (Halvard's Crossing), P19 Phlogiston Car (The Emberwain).
- Corrected C05's earlier "all permits 3+" per §6.3 region scaling.
- Both regular Mining Troupes confirmed **3+**.
- No JSON touched; `18dragon.json` unchanged and still parses. Balance provisional
  (playtest tunable, §7).

### Files Changed

- `docs/privates-roster.md` — Players-req columns; permit-gate correction;
  Player-count gates summary subsection.
