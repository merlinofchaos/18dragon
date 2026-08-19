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

Verantum (region A) is an isolated island. Its ruins hexes start undeveloped and are
built out during play; a central ruins city that starts nearly worthless can grow, via
adjacent **metros**, into one of the map's richest destinations. Building on Verantum is
permit-gated like any region (§1) — new yellow needs the **A permit**.

### 2.1 The central ruins city

- **Verantia (H9)** is a fixed **gray, permanent** city with **4 token slots** and a
  **base value of 10gp**. It is pre-placed on the map; it is never upgraded by a normal
  city tile. Its value grows only through adjacent metros (§2.3), up to the cap.

### 2.2 Developing a ruins hex

A ruins hex is developed by laying tiles on it. There are four things it can become; all
follow normal 1822 track rules (legal connection, phase color, the A permit for new
yellow) except where noted:

| Development | Tile | Lay cost | Notes |
|---|---|---|---|
| **Plain track** | regular yellow track | standard (free unless terrain) | ordinary track |
| **Dit / town** | regular yellow with a dit | standard | a dit does **not** upgrade into a city |
| **City** | regular yellow **city** tile (a token slot) | **20gp** | upgrades along normal city paths; can receive metros; this is how a **second city** is founded (§2.5) |
| **Metro** | the special dead-end **stub** tile (C15) | **10gp** | raises an adjacent ruins city's value (§2.3) |

- **Permit + phase.** Laying **any new yellow** on a ruins hex (metro stub, city, plain,
  dit) requires the **A permit** (§1) and the phase must allow that tile color. Green
  **upgrades** (including the metro upgrades below) need no permit.
- **Commitment.** Once a yellow tile is laid on a ruins hex, the hex **cannot be switched**
  to a different development type — it can only be **upgraded along normal paths** (a
  yellow metro stub → a green metro; a yellow city → a larger city). Stated explicitly
  because ruins hexes start blank.

### 2.3 Metros and city value

A **metro** is the special dead-end stub tile. It **raises the printed value of the
ruins city it is adjacent to** by the tile's amount — it is not separately-routed stub
revenue; the boost is added to the city a reaching train collects.

- **Metro tile values (C15):**
  - **Yellow stub:** **+10gp** (one dead-end leg).
  - **Green value upgrade:** the single stub raised to **+20gp**.
  - **Green branch upgrade:** a **second dead-end leg** in another direction, **+10gp
    each** — so one ruins hex can point a metro at **two** different adjacent cities
    (e.g. the central city and a second city), +10 to each.
- **Hard value cap = 100gp.** A ruins city's effective value (base 10 + the metros
  boosting it) **can never exceed 100gp**, even if its metros would sum higher.

### 2.4 Routing — the emergent metro limit

There is **no rule** requiring any of the 6 hexes around the central city to stay plain
track. It is **self-limiting**: metros are **dead-ends**, so a train can only reach the
ruins city through a **non-metro** connection. If all 6 surrounding hexes are built as
metros, no route can reach the city at all — once the L-trains rust, a company based
there can run no route and cannot pay out. Ringing a city entirely in metros is therefore
**self-defeating, not prohibited**; players leave at least one open approach by choice.

### 2.5 The second city (emergent)

A second high-value city is **not a special subsystem** — it is simply a ruins hex
developed with a **yellow city tile** (§2.2, 20gp). It:

- has a **token slot** and **upgrades along normal city paths** (unlike a dit, which
  never becomes a city);
- **receives metros** pointed at it from its own adjacent ruins hexes, exactly like the
  central city, under the **same 100gp hard cap**;
- is **never pre-placed** and **not guaranteed** to appear — it emerges only if players
  choose to found it.

Late game, a fully-developed second city can rival the central city as the island's top
destination.

---

## 3. Mergers

*→ To be written in story C13 (the full merger mechanic: eligibility, procedure, the
share/par math, exchange tokens, and the PRD §9 merger open questions).*
