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
| **Dit / town** | regular yellow with a dit | standard | a dit does **not** upgrade into a city — *exception:* private **P21 Verantum Recolonization** may develop a Verantum dit into a city (private powers override, 1822 §1.3) |
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

18Dragon has **no concessions**. A major company comes into being **only** by merging
two minor companies — this is the sole path to majors. Mergers follow **1822PNW's**
merger round, with one large change: **there are no associated/unassociated minors.** Any
two qualifying minors can merge, and the player **chooses** which major to form.

### 3.1 The merger round

- A merger round runs **after every operating round from phase 2 onward** (phase 1's
  single OR has none).
- Mergers are resolved in **descending share-price order** — the highest-valued eligible
  minor gets the first opportunity to merge. A minor that passes may still be merged
  later, when a lower-valued minor is offered its opportunity.

### 3.2 Eligibility

Two minors may merge only if **all** of these hold:

- it is **Phase 2 or later**;
- **one player is president of both** minors;
- the two minors are in **different regions**;
- their tracks are **connected** by a route (any length) **not blocked by tokens**.

### 3.3 Choosing the major

The initiating player:

- chooses **which minor provides the home token** — the major's home station is placed
  at that minor's location; and
- chooses an **available major associated with the home minor's region**.

If the home minor's region has **no available major**, that minor cannot be the home
token — the player may try the other minor as home instead, otherwise the merger cannot
be formed.

### 3.4 Procedure

1. **Value.** Double each minor's current market price and add them together. This total
   is what the player must be compensated by the new major.
2. **Par.** Choose a par from the major par values **55 / 60 / 65 / 70 / 75 / 80 / 90 /
   100** (50 is minors-only). The par must be **≥ total ÷ 6**; if the total exceeds
   **600**, par **must be 100**. *(The ÷6 floor caps the payout at 6 shares.)*
3. **Shares.** Divide the total by the chosen par and round to whole shares. Round **up**
   → the player pays the company the difference; round **down** → the company pays the
   player the difference. (The president's 20% certificate counts as its two shares.)
4. **Assets.** Move both minors' **cash, trains, and privates** onto the major's charter;
   **both minors are removed** from play.
5. **Home token.** The chosen minor's board token becomes the major's **home station**.
6. **Tokens.** The major takes onto its charter its placed **home token**, **2 exchange
   tokens** (held in reserve), and a **destination token** (base-1822 destination rules).
7. **The non-home minor's board token — president's choice.** Remove it and **either**
   place a major token there (moved from exchange) **or** leave the hex vacant and move a
   token from **exchange → available**.
8. **Capitalisation.** A merged major always uses **incremental** capitalisation (see
   §divergences 2.3 — full capitalisation applies only to stock-round flotation, which a
   major never does).
9. The major is ready and **runs in the next operating round** (its first turn).

### 3.5 Exchange tokens

An **exchange token** is a reserve token on the charter (not on the board). A major
gains **2** at formation. It becomes a placeable (**available**) token by:

- **Acquiring a minor** (§3.6) — each acquisition converts one exchange token; or
- the **P21 Verantum Recolonization** / **P28 Station Token Swap** private powers —
  **P28** moves a token between exchange and available (one-time, then closes); certain
  Verantum privates (e.g. **P21**) place an exchange token directly on the board.
  *(These are private powers, detailed in the privates roster, not core merger rules.)*

### 3.6 Acquiring a minor (post-formation growth)

After forming, a major grows by **acquiring minors** — inherited from 1822 (from a
willing player in phases 2–7; from a bid box in phases 5–7 for **200gp**; see
§divergences 5.16–5.18). Acquiring a minor:

- absorbs the minor's assets;
- makes the minor's certificate a **permit** for its region inside the major (§1); and
- **converts one exchange token** to available.
