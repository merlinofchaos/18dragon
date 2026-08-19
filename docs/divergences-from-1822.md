# 18Dragon — Divergences from 1822

The canonical list of every deliberate way **18Dragon** differs from base **1822**.
It is written to be read alongside the 1822 rulebook: a rulebook-diff, organized in
1822's own section order, so the 18Dragon rulebook can be authored as a set of
overrides rather than from scratch.

**Baseline.** 18Dragon is an 1822 variant that also borrows from **1822PNW**. Each
entry names the baseline it diffs against:

- **[1822]** — the baseline is base 1822, and 18Dragon differs from it.
- **[PNW]** — the baseline is **1822PNW**: either 18Dragon follows PNW here (where PNW
  itself already differs from base 1822), or it deliberately **declines** something PNW
  added. The entry text says which.
- **[new]** — 18Dragon-original, in neither game.

**Section references.** A bare `§N.N` is a **rulebook** section — this doc's own numbering,
which mirrors `1822_Rules.pdf` (PNW numbers are called out as "PNW §N.N"). References to
the design record are always written **`PRD §N.N`**.

**Scope.** Mechanics and numbers. Purely cosmetic changes (currency name `gp`,
fantasy theme and naming) are not catalogued. Numbers marked *(provisional)* are
balance experiments to be validated in playtest (PRD §7).

**How to read an entry.** *1822:* what the base game does · *18Dragon:* the change ·
*Why/ref:* one-line rationale or a pointer to the PRD / a later story that owns the
full mechanic.

> Rulebook sources: `~/Documents/18xx rulebooks/1822_Rules.pdf` and
> `1822PNW Draft Rules.pdf`. This doc consolidates the design in `_artifacts/prd-game.md`
> (which keeps the rationale); where they differ, the PRD is the record and this doc
> the summary.

---

## 1. Overview

### 1.1 Sequence of play — round structure `[PNW]`

- *1822:* alternating stock rounds and operating rounds — one OR after the first SR,
  two ORs per SR once the first 2-train is bought.
- *18Dragon:* PNW-style — each SR → the phase's ORs, with a **Merger Round after
  every Operating Round from phase 2 onward** (phase 1's single OR has none).
- *Ref:* headline only here; the Merger Round is catalogued in **§6** and the full
  mechanic is story **C13**. (PRD §5.4)

*(§1.2 Etiquette, §1.3 About These Rules — no game-rule divergence; 18Dragon keeps
the Mx / Px company-reference conventions.)*

### 1.4 The map — replaced `[new]`

- *1822:* a fixed map of Great Britain — set cities and labels, the London hex and
  rondel, grey off-board areas.
- *18Dragon:* an entirely new map — **five regions**: **A Verantum** (the island),
  **N Caelimor**, **D Gördum**, **E Varstova**, **S Muravel** — with **permit-gated**
  building (§5.7) and a **modular board** that turns regions on/off by player count
  (§1.7). Verantum's own board rules are in **§7**; region identity and terrain are in
  the world/region design docs.
- *Ref:* PRD §3.1, §6.1, §6.3.

### 1.5 The bank pool — unchanged; bank does not scale `[1822]`

- *1822:* the bank pool holds shares sold to the bank and discarded trains; the bank
  is **£12,000**, including the players' starting money.
- *18Dragon:* pool mechanic unchanged. Bank is **12,000 gp** and **does not scale**
  with player count — unlike the starting cash, which does (§1.7). All money in play
  comes from the bank, so as in 1822 the 12,000 includes the players' starting cash;
  what is left after setup therefore *does* vary — **10,875 / 10,500 / 10,125 / 10,200
  gp** at 3 / 4 / 5 / 6 players, against 1822's constant 9,900. Every count runs a
  larger effective bank than 1822, most of all at 3 players.
- *Ref:* PRD §6.3.

### 1.6 The stock market — PNW 1D market replaces the 1822 2D grid `[PNW]`

- *1822:* a **two-dimensional** stock-market grid (§1.6.1, "shown as a grid"); share
  price moves up/down and left/right across it. Par spaces are **six**: £50 solid red
  (minors only, §1.6.3) and £60/70/80/90/100 red-outlined (majors + minors, §1.6.4).
  Spaces in the lower-left are shaded **yellow**: shares of a company parked there **do
  not count against the certificate limit** (§1.6.5).
- *18Dragon:* the **one-dimensional (linear)** PNW stock market — a single price track,
  price stepping right/left along it — adopted whole, which changes two more things
  besides the dimension:
  - **Nine par values, not six:** 50 (minors only) and **55 / 60 / 65 / 70 / 75 / 80 /
    90 / 100** (majors + minors) — PNW's set (PNW §1.7.3–4).
  - **No yellow zone.** PNW abolishes it (PNW §1.7.6) and 18Dragon follows: **every
    share always counts against the certificate limit.** This bites harder here than in
    PNW, because 18Dragon's cert limits are themselves a deliberate experiment (§1.7).
- *Ref:* PNW §1.7. *(Implemented in `18dragon.json` as `stock.type: "1D"`, par
  `[50,55,60,65,70,75,80,90,100]`, no yellow cells. Note: a line in project `CLAUDE.md`
  mislabels **1822** as 1D — the game data is correct; the characterization of 1822 is
  the error, flagged for cleanup.)*

### 1.7 Setting up the game — player range, cash, cert limits, bid cubes `[1822]`

18Dragon plays **3–6 players** (1822's setup table, §1.7.2, is **3–7**; its 2-player
rules exist only as a variant of the §13 regional scenarios, which 18Dragon does not
adopt) and resets the setup table. Cert limits scale with the number of active majors
(majors are region-associated, §3.3); starting cash is deliberately allowed to **fall at
low player counts** (1822 holds 2100 total constant at every count); bid cubes are a
flat count.

| Setup value | 1822 (per player count) | 18Dragon |
|---|---|---|
| Player counts | 3–7 (2p only via a §13 scenario variant) | **3 / 4 / 5 / 6** |
| Certificate limit | 3–7p: 26 / 20 / 16 / 13 / 11 | **16 / 16 / 16 / 13** *(provisional)* |
| Start money / player | 3–7p: 700 / 525 / 420 / 350 / 300 | **375 / 375 / 375 / 300** gp *(provisional)* |
| Start money total | 2100 (constant, all counts) | **1125 / 1500 / 1875 / 1800** (falls at low counts) |
| Bank | 12,000 (incl. start money) | **12,000** (incl. start money; does not scale) |
| Bid cubes / player | 6 / 5 / 4 / 3 / 3 (by count) | **4** (flat, all counts) *(provisional)* |

- *Setup stacks:* 1822 seeds a **concession** stack, a minor stack, and a private
  stack, then fills the bid boxes. 18Dragon has **no concession stack** (concessions
  removed, §3.4); the **opener private (5P)** occupies **bid box 1** at start, with the
  minor and private stacks filling the remaining boxes.
- *Ref:* PRD §2, §4.3, §6.3. Player-order number cards are dealt as in 1822.

### 1.7b Setup scales the *board*, not just the numbers — the modular map `[new]`

- *1822:* the same full map, company roster, and private roster are used at every
  player count; only cert limit, starting cash, and bid-cube count vary. (1822's
  smaller-map play is a separate **§13 scenario**, not the base game's scaling.)
- *18Dragon:* the board itself is **modular** — regions are switched on as the player
  count rises, and everything belonging to a dropped region leaves the game with it.

  | Players | Live regions | Regions |
  |---|---|---|
  | 3 | A, N, D | 3 |
  | 4 | A, N, D, **E** | 4 |
  | 5 | A, N, D, E, **S** | 5 |
  | 6 | A, N, D, E, S | 5 |

  - **Dropping a region removes** its **6 minors**, its **2 region-associated majors**,
    and its **permit private** — plus any privates carrying a **4+ / 5+ gate** that the
    count excludes (§3.1).
  - **No map area is physically removed.** With the region's permit private and home
    minors gone, no company can ever hold that region's permit, so **no new yellow can
    be laid there** (§5.7) and nothing exists to upgrade — the hexes simply sit
    inaccessible. The three core regions **A, N, D all border each other**, so the
    playable board stays connected with no sealing rule.
  - **Active majors drive the cert limit:** 6 / 8 / 10 / 10 majors at 3 / 4 / 5 / 6
    players is what produces the 16 / 16 / 16 / 13 limits in §1.7.
  - **What does not scale:** bank size (§1.5), the number of ORs per phase, and the
    train roster — with one provisional exception at 3–4 players (§2.6).
- *Ref:* PRD §3.2, §6.3.

---

## 2. Game Phases

The phase structure and **train roster are inherited from base 1822 wholesale** —
train triggers, rusting, train limits (minor 2→1, major 4→3→2), the buy-from-bank →
buy-from-anyone progression, tile availability, off-board values, and tile-lay-per-turn
are all unchanged. Minor-company float and acquisition rows are likewise unchanged
(see §4, §5). The divergences are confined to the concession / major-formation rows,
the added merger rounds, and a provisional low-count train tweak.

### 2.1 Concessions removed from the phase progression `[1822]`

- *1822:* the phase table carries a **Concession Certificates** row (convert to a
  director's certificate with a £100 discount in phases 2–4; unconverted concessions
  removed from play at phase 5), with matching bullets at 2.2.3 and 2.2.6.
- *18Dragon:* **no concessions** — the row and both bullets are gone.
- *Ref:* §3 (Corporate Entities), §4 (Major formation). PRD §5.1.

### 2.2 Major formation & flotation — merger, not concession/50%-sold `[1822]`

- *1822:* majors float via **concession conversion** (phases 2–4, incremental cap) and
  then by being **50% sold** (phases 5–7); the "Major Company Flotation" row is
  phase-gated.
- *18Dragon:* majors **form only by merger** (in a merger round, any phase mergers
  occur) — the phase-gated flotation model is replaced entirely.
- *Ref:* headline only; full mechanic in **§6** / story **C13**. PRD §5.1.

### 2.3 Capitalisation — formation-based, not phase-based `[1822]`

- *1822:* the "Capitalisation on Flotation" row is phase-gated — **incremental**
  capitalisation in phases 2–5, **100%** in phases 6–7.
- *18Dragon:* capitalisation depends on **how a company came to be, not the phase** —
  **merged companies always take incremental capitalisation**, and **full (100%)
  capitalisation applies only to a company floated during a stock round.**
- *Ref:* merger formation §6 / C13; stock-round flotation §4. PRD §5.1.

### 2.4 Merger rounds from phase 2 `[PNW]`

- *1822:* no merger rounds.
- *18Dragon:* a Merger Round follows every operating round from phase 2 onward
  (phase 1's single OR has none) — the per-phase round count gains this step.
- *Ref:* cross-ref §1.1; full treatment §6. PRD §5.4.

### 2.5 Train roster — base 1822, not PNW `[PNW]`

- *Context (not a divergence from 1822):* 18Dragon keeps the **base-1822 train roster
  and counts** rather than PNW's smaller 3-/4-train counts, which play poorly.
- *Ref:* PRD §5.3.

### 2.6 Low-count train removal — provisional `[new]`

- *18Dragon:* at **3–4 players**, some **3- and 4-trains may be removed** (fewer
  companies need fewer trains). *(Provisional — a playtest experiment, not yet fixed.)*
- *Ref:* PRD §5.3, §6.3, §7.

---

## 3. Corporate Entities

The **core mechanics of each company type are inherited from 1822** — private-company
revenue / £0 face value / bidding-only purchase / no-trade rules; minor 50% director's
certificate, half-withheld earnings, and never-past-green track limit; major nine-
certificate structure (20% director + 8×10%) and destination-city rules. 18Dragon's
major hold-limit rule is also unchanged (a player caps at 60% but may reach 100% via
the share exchange when acquiring minors). The divergences are structural: the roster
counts, the permit dimension, region-association, and the removal of concessions.

### 3.1 Private companies — 30, with a permit subtype and player-count gating `[1822]`

- *1822:* **18** private companies (21 with 1822+).
- *18Dragon:* **30** private companies, adding two 18Dragon-specific dimensions:
  - a **permit-private subtype** — **one per region (5 total)** — that pays **10 gp** while
    player-owned and, when **bought into a company, closes and becomes a permanent
    regional permit** for that company (§5.7; PRD §6.1);
  - some privates are **gated by player count** (available only at 4+/5+ players — §1.7b;
    PRD §6.3);
  - the **opener private (carrying the 5P train)** always seeds **bid box 1** at start.
- *Ref:* PRD §4.3, §6.1, §6.3. Roster detail: privates docs / C05, C10, C11, C12.

### 3.2 Minor companies — 30, 6 per region, each holds a home-region permit `[1822]`

- *1822:* **24** minor companies (30 with 1822+), an unstructured roster.
- *18Dragon:* **30** minors, **6 per region** across the five regions. Two additions:
  - **each minor automatically holds a permit for its home region** (§5.7; PRD §6.1);
  - minors are the **sole building block of majors** — two connected minors in
    different regions **merge** to form a major (§6).
  - *(A couple of minors carry special powers; roster detail in C04.)*
- *Ref:* PRD §4.2, §6.1, §5.1. Everything else about minors is inherited from 1822
  (50% director's certificate, half-withheld earnings, one-yellow/upgrade-to-green
  track limit, green-background-privates-only acquisition, must own a train).

### 3.3 Major companies — region-associated, merger-formed, exchange tokens `[1822]`

- *1822:* **10** majors, each started by converting its **concession** (§3.4, §4.7);
  cert structure 20% director + 8×10%.
- *18Dragon:* still **10** majors and the same certificate structure, but:
  - **region-associated** — a **pool of 2 majors per region**; a merger must pick an
    available major for the **home minor's region** (PRD §4.1, §6.3);
  - majors **form only by merger** — there are no concessions and no direct flotation
    (§6 / C13);
  - on formation a major holds its placed **home token**, **2 exchange tokens** in
    reserve (each converts to a placeable station token when the major later **acquires
    a minor**, plus other means — §6/C13), and a **destination token** (base-1822
    destination rules).
- *Ref:* PRD §4.1, §5.1, §6.3. Cert structure, destination rules, and the 60%/100%
  hold limit are inherited.

### 3.4 Concessions — removed entirely `[1822]`

- *1822:* every major has a **concession certificate** (on the back of the director's
  cert) used to start the major in phases 2–4; concessions count against the cert limit
  and are removed from play at phase 5.
- *18Dragon:* **no concessions at all** — the entire §3.4 subsection is deleted. Their
  role (bringing majors into being) is replaced wholesale by **mergers** (§6).
- *Ref:* PRD §5.1. **This is the headline divergence of the whole game.**

### 3.4b Regional Railways (PNW §3.4) — not adopted `[PNW]`

- *PNW:* adds a mid-tier **Regional Railway** company type (PNW §3.4) between minors
  and majors.
- *18Dragon:* **not adopted** — the company tiers are **only minors and majors**.
- *Ref:* PRD §4.

---

## 4. Stock Rounds

The stock round is inherited from 1822 — turn order, player loans (§4.3), selling
(§4.4) and buying (§4.5) shares, minor flotation from bids, the unsold-minor train
export, and the next-SR player order (Player 1 to the most cash) all stand. The
divergences all follow from **concessions being gone** and the **market being 1D**.

### 4.1 Stock-round actions — concession conversion removed `[1822]`

- *1822:* a turn's "one of the following" (§4.1.3 C) is **buy one major share** /
  **convert a concession to a director's certificate** / **place bids** on concessions,
  minors, and privates.
- *18Dragon:* the **"convert a concession" action is gone**, and bids are placed on
  **minors and privates only**. Buying a major share remains available (once a major
  exists — which now happens via merger, §6).
- *Ref:* PRD §5.1, §5.2.

### 4.6–4.9 Major company formation — removed entirely `[1822]`

- *1822:* four subsections govern forming majors — an overview (§4.6), **converting a
  concession** in phases 2–4 (§4.7), **forming directly by 50%-sold** in phases 5–7
  (§4.8), and completing setup (§4.9), including the incremental-vs-full capitalisation
  logic (4.8.4–4.8.6).
- *18Dragon:* **all of it is deleted.** Majors come into being **only through mergers**,
  specified in **§6 / story C13**. The capitalisation question is resolved
  formation-based, not phase-based (see §2.3).
- *Ref:* PRD §5.1.

### 4.10 Bidding — minors + privates only; concession boxes gone `[1822]`

- *1822:* bidding runs over **4 minor boxes + 3 concession boxes + 3 private boxes**;
  each player has bidding tokens by player count (§1.7).
- *18Dragon:* the **bidding mechanism is unchanged** (PRD §5.2), but the **3 concession
  boxes are removed** — the board keeps **4 minor boxes + 3 private boxes**, with the
  **opener private (5P) seeded in box 1** at game start. Bidding tokens are a flat
  **4 per player** (§1.7). *(Bid boxes are built on the board mat, C18.)*
- *Ref:* PRD §5.2, §4.3.

### 4.12 End-of-stock-round share-price movement — 1D linear `[PNW]`

- *1822:* affected tokens move across the **2D** market grid.
- *18Dragon:* movement follows the **1D linear** PNW market (§1.6) — a single price
  track. *(Minors are still never 100% sold, so their tokens move accordingly.)*
- *Ref:* PNW §1.7 (the market) and PNW §4.10 (the same step, PNW's numbering).

---

## 5. Operating Rounds

The operating round is inherited from 1822 almost whole — turn order, routes,
destination doubling (home→destination doubles the destination city; an E-train
doubles it again), running trains, earnings distribution, purchasing trains, forced
purchases and emergency money-raising, issue/redeem, placing station tokens, and
acquiring private companies all stand. Two things change, plus a Verantum pointer.

### 5.7 Lay / upgrade track — the permit gate `[new]`

- *1822:* track-laying is gated only by **phase** (which tile colors are available),
  the per-company **building allowance** (e.g. a major lays two yellow or one upgrade
  from phase 3), and **terrain cost**. Any company may build any legal open hex.
- *18Dragon:* adds the **region-permit gate**, applied every OR — laying a **new yellow
  tile in a region requires the operating company to hold that region's permit**;
  **upgrading an existing tile requires no permit**; and once a hex has been opened with
  yellow, **any** company may upgrade it. This is 18Dragon's building pillar and is
  **not** PNW's builder-cube mechanic (which 18Dragon does not use).
- *Ref:* this is the full catalog entry for the permit gate; the **complete mechanic**
  (permit sources, how permits enter majors, edge cases) is **story C07**. PRD §5.5, §6.1.

### 5.7b Verantum ruins — special tile lays `[new]`

- *18Dragon:* ruins hexes on the Verantum island have their **own tile-lay options**
  (develop into plain track, a dit, a town, a metro, or — emergently — a second city)
  unlike any 1822 track lay.
- *Ref:* pointer only → **§7 / story C08**.

### 5.16–5.18 Acquire a minor company — now also grants a region permit `[1822]`

- *1822:* a major may acquire a minor from a willing player (phases 2–7) or from a bid
  box (phases 5–7, for **£200**), placing an **exchange token** as part of the
  acquisition (§5.9.11).
- *18Dragon:* the acquisition itself is inherited — bid-box price kept at **200 gp** —
  and **extended**: the acquired minor's certificate **acts as a permit for its region
  inside the major** (§5.7; PRD §6.1). So acquiring a minor both **grants that region's
  permit** and **converts an exchange token** to a placeable station token.
- *Ref:* PRD §6.1, §5.1. Merger and acquisition detail: **§6** / story C13.

---

## 6. Merger Round `[PNW]`

A **new top-level section**, following PNW's structure (PNW §6): after **every
operating round from phase 2 onward**, a Merger Round runs. It is the **sole path by
which majors come into being** — replacing 1822's concession-based formation entirely
(§3.4, §§4.6–4.9).

- *Shape:* a single player who is **president of both** of two minors — whose tracks
  are **connected** by an unblocked route and which are in **different regions** — may
  merge them into an available **region-associated major** for the home minor's region.
  All assets of both minors transfer to the major; the player receives major shares per
  a **double-market-price ÷ chosen-par** formula; the major ends with its home token,
  **2 exchange tokens**, and a destination token.
- *Baseline:* PNW has this round, but 18Dragon's version is **less restrictive** — no
  pre-associated minors (PNW ties specific minor pairs to majors; 18Dragon does not).
- *Ref:* **full mechanic + the PRD §9 merger open questions (exchange-token unlocks,
  par-price range, whether the non-home hex is vacated) are specified in story C13.**
  PRD §5.1, §5.4.

## 7. Verantum Ruins `[new]` *(replaces 1822 §§6–9)*

1822 §§6–9 are Great-Britain-specific geography (London, the Metropolitan Railway,
the English Channel & France, Merthyr Tydfil & Pontypool). 18Dragon has **none** of
these; in their place **Verantum (region A)** — one of the five regions (§1.4), and an
island — is the game's signature regional system.

- *Shape:* an island, reachable only at the map's **bridge locations**, whose **central
  ruins city** (gray, permanent, **4 token slots**, base value **10gp**) starts nearly
  worthless but grows
  into a top destination via **metros** — developed ruins hexes adjacent to the city
  that boost its value. Of the 6 hexes around the central city, at least 1 must become
  plain track; up to 5 can become metros. An **optional emergent second city** may be
  founded during play. Ruins-city value **caps at ~100gp**. Ruins hexes use special
  tile-lays (§5.7b).
- *Ref:* **full value system + the PRD §9 Verantum open questions (metro value
  increments, the special ruins tile-lay rules and second-city conditions) are
  specified in story C08.** PRD §6.2.

## 8. Game End `[1822]`

Inherited from 1822, with a simplification — and one place where the two parents
disagree and 18Dragon must pick.

- *Triggers (unchanged):* the game end triggers when the **first stock round ends with
  nothing sold** (ends immediately), when a company's token **reaches the market's
  "game-end" value** (ends at the end of that OR, or after the next OR if reached in an
  SR), or when the **bank is exhausted** (ends after the current/next set of ORs). The
  game-end value now sits on the **1D** market (§1.6).
- *Trigger precedence — parents differ:* 1822 §10.1.2 **locks the first trigger** (the
  game ends when that trigger says, even if a later one would end it sooner); PNW §7.1.8
  gives precedence to whichever trigger ends the game **soonest**. **18Dragon follows
  1822: the first trigger locks** *(designer, 2026-08-19)*.
- *Final wealth (simplified):* stock at current price + cash − outstanding loans;
  private companies and company assets count for nothing. 1822's clause valuing
  **concessions** at face value and PNW's clause valuing **regionals** at 200 **both
  fall away** — neither entity exists in 18Dragon — so the calculation is simpler than
  in either parent. Richest player wins.
- *Ref:* 1822 §10.1, PNW §7.1.

---

## Not adopted / replaced

Sections of the parent games that 18Dragon deliberately does **not** carry over:

- **1822 §§6–9 — London, the Metropolitan Railway (M14), the English Channel & France,
  Merthyr Tydfil & Pontypool** `[1822]`. Great-Britain geography; **replaced** by the
  18Dragon map (five regions) and the Verantum island (§7).
- **1822 §11 Variants / §13 Scenarios** `[1822]` and **PNW's scenarios/variants**
  (short scenario, regional scenarios, starting-packet & L/2 roster variants) — **not
  adopted.**
- **1822 §12 — 1822+ Expansion** `[1822]` — **not adopted.**
- **PNW-specific systems** `[PNW]` — **Regional Railways** (§3.4), **Builder Cubes**
  (§5.7), and the **Timber Trade** (§1.5) are **not adopted**; 18Dragon draws only
  PNW's market, merger round, and round structure.

