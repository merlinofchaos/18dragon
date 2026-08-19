# 18Dragon — Signature Mechanics (capture doc)

**Status: staging.** This document captures 18Dragon's signature mechanics —
region permits, the Verantum ruins/metro system, and mergers — completely and
accurately, so the **rulebook (C22/C23)** can lift them later. It is a working
capture, not the finished rulebook: the bar here is *correct and complete rules
content*, not polished prose or player-facing formatting.

Baseline conventions and every divergence from 1822/PNW are recorded separately in
[`divergences-from-1822.md`](divergences-from-1822.md); design rationale lives in
`_artifacts/prd-game.md`. Where those and this doc differ, the PRD is the record.

Sections:

1. [Region Permits](#1-region-permits) — *(this story, C07)*
2. Verantum Ruins & Metros — *→ C08*
3. Mergers — *→ C13*

---

## 1. Region Permits

Breaking new ground in 18Dragon is gated by region. Each of the five regions
(A Verantum, N Caelimor, D Gördum, E Varstova, S Muravel) has its own **permit**; a
company must hold a region's permit to start new track there.

### 1.1 The gate

- **Laying a new yellow tile in a region requires the operating company to hold that
  region's permit.** This is checked every operating round, as part of the lay/upgrade
  step.
- **Upgrading an existing tile requires no permit.** Once a hex has been opened with
  yellow, **any** company may upgrade it (to green/brown/gray, per phase), regardless of
  whether it holds the region's permit. Only *new yellow ground* is gated.
- **The permit is necessary, not sufficient.** Holding the permit grants the *right* to
  lay new yellow in that region; the lay must still be legal under normal 1822 track
  rules — a connected route the company can reach, the phase's tile-color availability,
  tile supply, and any terrain cost. A permit is never a substitute for reach.

### 1.2 Permit sources

There are exactly **three** ways a company comes to hold a region's permit:

1. **A minor's home region.** Every minor automatically holds a permit for its home
   region, from the moment it operates. (Each region has 6 home minors.)
2. **A region-permit private.** There is **one permit private per region (5 total)**.
   While owned by a **player** it pays **$10 revenue** each operating round. When it is
   **bought into a company**, it **immediately closes** and becomes a **permanent
   permit** for its region in that company. These five are the **only** privates that
   grant permits.
3. **Merger or acquisition.** When a minor is **merged into** or **acquired by** a
   major, the **minor's certificate acts as a permit** for that minor's region inside
   the major. (Because a merger absorbs two minors in different regions, a freshly
   merged major holds **both** regions' permits; every later minor it acquires adds that
   minor's region.)

> The merger and minor-acquisition mechanics themselves — and the exchange-token
> conversion that acquiring a minor also triggers — are specified in §3 (Mergers, C13).
> Here we state only the *permit* effect.

### 1.3 Properties

- **Permanent.** A permit is **never consumed, never lost, and never removed** by any
  event. Once a company holds a region's permit, it holds it for the rest of the game.
- **No cap; multiple regions.** A company may hold permits for any number of regions.
- **No stacking.** Holding a region's permit more than once — e.g. a major that has
  acquired two minors from the same region — has no additional effect. The company
  simply holds that region; a region permit is binary (held / not held).
- **Majors are never permit-starved at birth.** A major only ever comes into being via a
  merger of two minors that already hold permits, so a newly formed major always holds
  at least its two home-region permits.

### 1.4 Representation at the table

Permits are tracked by the certificates and cards a company already has — there is **no
separate permit token or component**:

- A **minor** shows its home-region permit via its **charter**.
- A **major** shows its permits by the **absorbed minor certificates** and the **closed
  permit-private cards** kept with its charter — each such card/cert *is* a permit for
  its region.

*(Charter/permit presentation is produced by C17 charters and C46 permit-block backs.)*

### 1.5 Edge cases

- **Formation is never permit-blocked.** A minor auto-holds its home permit, and a major
  is built from minors that already hold permits, so placing a **home token** at
  formation is never gated by the permit rule.
- **Verantum (region A).** Building on the Verantum island requires the **A permit** —
  obtained exactly like any other region's, from Verantum's 6 home minors and the A
  permit private. The island's **isolation is a routing/bridge matter, not a permit
  matter**: reaching Verantum still requires a legal route across a bridge hex, but the
  permit itself behaves identically to every other region's.
- **Cross-region building.** A company that holds region X's permit may lay new yellow
  anywhere in X that it can **legally reach** by route. The permit confers the right, not
  the connection.

---

## 2. Verantum Ruins & Metros

*→ To be written in story C08 (the ruins/metro value system, the special ruins tile
lays, and the emergent second-city conditions).*

---

## 3. Mergers

*→ To be written in story C13 (the full merger mechanic: eligibility, procedure, the
share/par math, exchange tokens, and the PRD §9 merger open questions).*
