# Sprint 12: Certificates

- **Status:** complete
- **Created:** 2026-08-04
- **Goal:** The certificates are a printable deck from **`companies.json`** (via
  `cardkit`) — **major** certs (per major: 1 President's 20%/2-share + 8 regular
  10%/1-share) and the **30 minor** certs (single card, 2 shares / 50%) — matching
  the designer's cert reference. **Mockup-first** before building.

## Committed stories

View of `sprints.sprint-12.stories` in `sprint-status.yaml` (canonical). **3 points.**

| Seq | ID | Title | Type | Points | Status |
|-----|----|-------|------|--------|--------|
| 1 | C25a | Major certificates (9/major — president 20% + 8×10%) | content | 2 | ✅ done |
| 2 | C25b | Minor certificates (30 — single 2-share / 50% card) | content | 1 | ✅ done |

## Scope notes

**Reference (designer photo).** Cert layout: **color left band** with **stripes =
share count**, **logo roundel(s)**, company name (serif), a yellow **PRESIDENT'S
CERTIFICATE** banner (president only), "N Shares" (bottom-left), **percentage**
(bottom-right).

**Share encoding (designer 2026-08-04):**
- **Major President** — 2 shares → **2 stripes**, 20%.
- **Major regular** — 1 share → **1 stripe**, 10%. (8 per major.)
- **Minor** — single card = **Two Shares / 50%** (you own half; the other half is
  not available for purchase) → **2 stripes** in the **region color** (quick region
  reference) + number badge (circle) centered over the stripes.

**Counts:** majors 9 × 10 = **90** certs; minors **30**. Print all physical copies
(card deck) — reuse the card print recipe.

**Mockup-first** (codified pattern): wireframe president / regular / minor certs,
iterate to approval, then build `tools/gen-certs.mjs` (reusing `cardkit`).

**Open at fleshing:** card size; the minor band color (gray vs region); logo =
abbrev placeholder until **C45**; whether a market/par value appears on the cert.

**Deferred / out of scope:** token stickers (C24), board mats, the share/market
*mechanics*.

## In-flight changes

<!-- Course-corrections made during the sprint (usually via agile-party PM). -->

## Retrospective

**Outcome: goal fully met.** C25a (90 major certs) + C25b (30 minor certs) both
done — `tools/gen-certs.mjs` emits both decks from `companies.json`.

### What went well

- **Mockup-first again** — many quick cert iterations (stripes, logo count, minor
  PNW band, permit block, sizes) converged to a locked spec before the generator.
- **Shared `companyLogo()` extraction** (designer's "use the same code" push) —
  factored into `cardkit`, now used by charters + certs (+ later stickers), and
  `gen-charters.mjs` refactored onto it so they can never drift. Good reuse payoff.
- **Print-cut + generic-generator patterns reused** cleanly.

### What didn't

- Normal design churn during the mockup (minor 100→50%, stripes-encode-shares then
  not, president 1→2 logos). That's the mockup doing its job, not a failure.
- **Tooling papercut:** the cert commit's `printf` message truncated on `%` (50%)
  and dropped the co-author trailer; had to `--amend -F`. Recurring shell-quoting
  pain (also apostrophes in heredocs earlier).

### Lessons / workflow adjustments

- **Commit messages via file + `git commit -F`** (real change) — codified as a
  memory (`reference-git-commit-messages`). Stop building messages inline with
  `printf`/heredoc; apostrophes and `%` break them (silently).
- Fixed a stale note: the minor cert is **Two Shares / 50%**, not 100% (corrected
  in the stories; sprint goal here left as historical).

### Action items

- **Follow-ups still open:** **C45** auto-logos (replaces the `companyLogo()`
  placeholder), **C46** permit-block private backs, **C47** no-edge/bleed for the
  card generators, **C44** pro per-card bleed.
- **Next sprint candidates:** **C24** token stickers (needs the final major colors;
  Silhouette Cameo) · the **board mats** (C16/C18/C21) + board-size question ·
  **C15** hex tiles.
