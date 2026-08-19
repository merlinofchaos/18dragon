# C07: Specify the region-permit mechanic

- **ID:** C07
- **Type:** content
- **Epics:** Rules & Balance, Permits
- **Sprint:** sprint-18
- **Status:** done
- **Created:** 2026-08-19

## Story

As the designer,
I want the region-permit mechanic captured completely and accurately — the gate, every
permit source, how permits enter majors, the properties, and the edge cases — in one
place,
so that the rulebook (C22/C23) can lift it later. **The mechanics doc is a staging/
capture artifact, not a deliverable in itself** — the rulebook is the real output, so
the bar is *complete and correct rules content*, not polished rulebook prose.

## Acceptance Criteria

1. **Deliverable:** create **`docs/signature-mechanics.md`** and write its first
   section, **"Region Permits"** — the mechanic captured completely. (This is the
   sprint's combined mechanics **capture doc**, feeding the rulebook C22/C23; C08 appends
   "Verantum Ruins" and C13 appends "Mergers." Include a brief doc intro noting its
   staging role and placeholder headers for those two, marked → C08 / → C13.) Keep it
   plain and content-focused — no rulebook-grade formatting.
2. **The gate rule.** Laying a **new yellow tile** in a region requires the operating
   company to **hold that region's permit**. **Upgrading needs no permit**; once a hex
   is opened with yellow, **any** company may upgrade it regardless of permit. The
   permit is **necessary but not sufficient** — normal 1822 track rules still apply
   (legal route/connection, phase tile-color gate, terrain cost, tile availability).
3. **Permit sources — exactly three, fully specified:**
   - **Minor home region** — each minor automatically holds a permit for its home region.
   - **The 5 region-permit privates** — one per region; pay $10 while player-owned; when
     **bought into a company** they **close** and become a **permanent** permit for that
     region in the company. *(These 5 are the only privates that grant permits.)*
   - **Merger / acquisition** — when a minor is **merged into** or **acquired by** a
     major, the **minor's certificate acts as a permit** for the minor's region inside
     the major.
4. **Permit properties.** Permanent — **never consumed, never lost, no cap**; a company
   may hold permits for **multiple regions**. A freshly **merged major** holds **both**
   merged minors' region permits (different regions); each later minor acquired adds its
   region. Holding a region's permit more than once (e.g. two minors from the same
   region) has **no stacking effect** — the company simply holds that region.
5. **Representation at the table.** A company's permits are shown by the **absorbed minor
   certificates and closed permit-private cards** kept with its charter; a minor shows
   its home-region permit via the **charter** itself. **No separate permit component**
   (ties to C17 charters / C46 permit-block backs).
6. **Edge cases resolved in-spec:**
   - **Formation is never permit-blocked** — a minor auto-holds its home permit, and a
     major is born from minors that already hold permits, so placing a home token is
     never gated.
   - **Verantum (region A)** building requires the **A permit** (from Verantum's home
     minors + the A permit private) and behaves like any other region — the island's
     isolation is a **routing/bridge** matter, not a permit matter.
   - **Cross-region building** needs the permit **and** a legal reach — a permit grants
     the *right* to lay new yellow in a region, not access to it.
7. **Cross-references.** Link to PRD §6.1, the divergences doc §5.7, C13 (the merger /
   exchange-token half of acquisition), C04 (minor home permits), C05 (the permit
   privates), and C17/C46 (charter representation).

## Tasks / Subtasks

- [x] Create `docs/signature-mechanics.md` with a short intro + section headers
  (Region Permits, Verantum Ruins → C08, Mergers → C13) (AC: 1)
- [x] Write the **gate rule** (new-yellow-only, upgrades free, necessary-but-not-
  sufficient) (AC: 2)
- [x] Write the **three permit sources** precisely (AC: 3)
- [x] Write the **properties** (permanent/never-lost/no-cap/multi-region; merged-major
  holds both; no same-region stacking) (AC: 4)
- [x] Write the **representation** paragraph (certs/cards on charter; no new component)
  (AC: 5)
- [x] Write the **edge cases** (formation never blocked; Verantum A; cross-region reach)
  (AC: 6)
- [x] Add cross-reference links (AC: 7)
- [x] Designer review of the section for completeness/accuracy (AC: 1–7)

## Dev Notes

**Consolidation, not invention** — like C06. PRD §6.1 already carries the mechanic;
C07 makes it complete and rulebook-ready and resolves the edge cases the PRD leaves
implicit. The designer's decisions (2026-08-19) that shape it:

- **Combined mechanics doc** — `docs/signature-mechanics.md`, one section per mechanic
  (not a per-mechanic file). C07 seeds it; C08/C13 append.
- **Only the 5 permit privates** grant permits — Pillar 2's vague "via some privates"
  means exactly those five. No other private grants a permit.
- **Permits are never lost** — no event removes one.
- **Representation = the minor cert / closed permit-private card** on the charter; no
  dedicated permit token/component.

**Source:** PRD §6.1 (region permits), §5.5 (track laying & permits in play), §4.2–4.3
(minors / privates), §5.1 (merger & acquisition — the exchange-token half is C13, not
here). Divergences doc §5.7 is the headline this fleshes out.

**Scope boundary:** the **merger** mechanic and the **exchange-token** conversion are
C13 — C07 references them but does not specify them. C07 owns only the *permit* half of
"acquiring a minor grants its region permit."

**Deliverable location:** `docs/` (deliverable documentation), never `_artifacts/`.

## Validation

- `docs/signature-mechanics.md` exists with a complete "Region Permits" section: the
  gate rule, three sources, properties, representation, and edge cases, cross-linked.
  Designer confirms it is complete and accurate — no invented rules, nothing intended
  left out. §5.7 of the divergences doc now has a real mechanic behind its pointer.

## References

- [Source: _artifacts/prd-game.md#6.1 Region permits]
- [Source: _artifacts/prd-game.md#5.5 Track laying & permits in play]
- [Source: docs/divergences-from-1822.md §5.7 (the permit-gate headline)]
- [Related: C13 (merger + exchange-token mechanic — the other half of acquisition)]
- [Related: C04 (minor home permits), C05 (the 5 permit privates)]
- [Related: C17 charters / C46 permit-block backs (physical representation)]

## Work Log

### Model Used

claude-opus-4-8

### Completion Notes

**Deliverable:** created `docs/signature-mechanics.md` (the sprint's combined mechanics
**capture doc**, feeding the rulebook C22/C23) with its full **§1 Region Permits**
section + placeholder headers for §2 Verantum Ruins (→ C08) and §3 Mergers (→ C13).
Kept plain and content-focused per the designer — it is staging for the rulebook, not a
finished deliverable.

**§1 covers:** the gate (new-yellow-only, upgrades permit-free, necessary-but-not-
sufficient); the three permit sources (minor home region / the 5 permit privates /
merged-or-acquired minor cert); properties (permanent, never lost, no cap, multi-region,
no same-region stacking, majors never permit-starved at birth); representation (minor
certs + closed permit-private cards on the charter — no separate component); and the
edge cases (formation never blocked, Verantum's A permit is normal, cross-region needs
permit + reach).

**Consolidation, not invention** — sourced from PRD §6.1/§5.5 plus the designer's
2026-08-19 decisions (combined capture doc; only the 5 privates grant permits; permits
never lost; represented by the cert/card on the charter). The **merger + exchange-token**
half of acquisition is deliberately deferred to C13; C07 states only the permit effect.

### Files Changed

- `docs/signature-mechanics.md` — **new**; intro + §1 Region Permits (the deliverable);
  §2/§3 stubbed as → C08 / → C13.
