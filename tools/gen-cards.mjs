#!/usr/bin/env node
// C49 — Unified card-deck printing. ONE generator pools every card deck onto shared
// US-Letter sheets, grouped by sidedness, reusing each deck's existing faces verbatim
// (no redesign — that's C50). All cards are 67x44mm, landscape 3x4 = 12/page, with the
// shared crop-mark / no-page-background print-cut treatment.
//
//   print/cards-single.html — ALL certs (90 major + 30 minor = 120) SINGLE-sided,
//     pooled to exactly 10 sheets (12/page, zero partial-page waste). No backs.
//   print/cards-duplex.html — trains (83) + privates (30) + player-order (6) = 119 pooled
//     on DUPLEX sheets: each page a FRONT sheet then a rows-mirrored BACK sheet (landscape
//     long-edge flip), interleaved F1,B1,F2,B2 … Perm/prize trains (2P/LP/5P/P+) still ride
//     on their private backs (via gen-private-cards' backTrain map), not as standalone
//     cards. The 6 player-order cards (67×44, number rotated 90°) pool in at the tail,
//     filling the last page's otherwise-blank slots (C19).
//
// Faces/CSS come straight from gen-certs.mjs, gen-private-cards.mjs, and cardkit.mjs —
// the pooled output is pixel-identical to the per-deck generators. Certs and the
// trains/privates deck have colliding CSS class names (.band, .foot, .grid), so they
// are emitted as two separate documents rather than one.
//
// Usage: node tools/gen-cards.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { majorCert, minorCert, makePages, CERT_STYLE } from "./gen-certs.mjs";
import {
  faceHtml as privateFace,
  mirror,
  cropMarks,
  chunk,
  PER_PAGE,
  PRIVATE_STYLE,
} from "./gen-private-cards.mjs";
import { trainFace } from "./cardkit.mjs";
import { poFront, poBack, SEATS, PLAYER_ORDER_CARD_CSS } from "./gen-player-order.mjs";

const companies = JSON.parse(readFileSync("data/companies.json", "utf8"));
const privates = JSON.parse(readFileSync("data/privates.json", "utf8")).privates;
const trains = JSON.parse(readFileSync("data/trains.json", "utf8")).trains;

const doc = (title, style, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>18Dragon — ${title}</title></head>
<body>
<style>${style}</style>
<main>${body}
</main>
</body></html>
`;

// ---- single-sided section: every cert pooled (per major: president + 8 regular; then
//      the 30 minors) → 120 cards = 10 full sheets, no partial page ----
const certCards = [
  ...companies.majors.flatMap((m) => [
    majorCert(m, true),
    ...Array(8).fill(0).map(() => majorCert(m, false)),
  ]),
  ...companies.minors.map(minorCert),
];
writeFileSync(
  "print/cards-single.html",
  doc("Certificates (pooled, single-sided)", CERT_STYLE, makePages(certCards)),
);

// ---- duplex section: trains + privates pooled. Each item carries its own front/back
//      face; the back sheet renders mirror(page) so each reverse sits behind its front ----
// trainFace() returns a full 67×44 `.tc` card, so it IS the grid cell (no wrapper).
const trainCard = (t) => trainFace(t);
const items = [];
for (const t of trains.filter((t) => t.deck))
  for (let i = 0; i < t.quantity; i++)
    items.push({ front: trainCard(t), back: trainCard(t.back ?? t) });
for (const c of privates)
  items.push({ front: privateFace(c, "front"), back: privateFace(c, "back") });
// Player-order cards (67×44 landscape, number rotated 90°; uniform back) pool in at the
// tail, filling the last duplex page's blanks — "just like every other card" (C19).
for (const n of SEATS) items.push({ front: poFront(n), back: poBack() });

function duplexSheet(cells, label, side) {
  const inner = cells
    .map((it) => (it ? it[side] : `<div class="card blank"></div>`))
    .join("");
  return `\n  <section class="sheet"><div class="sheet-label">${label}</div>${cropMarks()}<div class="grid">${inner}</div></section>`;
}

const pages = chunk(items, PER_PAGE);
let duplex = "";
pages.forEach((page, i) => {
  duplex += duplexSheet(page, `Sheet ${i + 1} — FRONT`, "front");
  duplex += duplexSheet(
    mirror(page),
    `Sheet ${i + 1} — BACK (rows mirrored for landscape long-edge duplex)`,
    "back",
  );
});
writeFileSync(
  "print/cards-duplex.html",
  doc("Trains + Privates + Player-order (pooled, duplex)", PRIVATE_STYLE + PLAYER_ORDER_CARD_CSS, duplex),
);

console.log(
  `Wrote print/cards-single.html: ${certCards.length} certs → ${Math.ceil(certCards.length / PER_PAGE)} single-sided sheets.\n` +
    `Wrote print/cards-duplex.html: ${items.length} cards (trains + privates + ${SEATS.length} player-order) → ${pages.length} front + ${pages.length} back = ${pages.length * 2} duplex sheets (12/page, 67x44mm).`,
);
