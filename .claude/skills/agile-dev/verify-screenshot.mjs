// Headless visual verification for a dev story (18xxMaker fork).
// Renders a game's map in the running dev server and screenshots it, reporting
// any browser console errors. Used because the app has no File>Open automation.
//
// Setup: the game is reachable at /games/<slug>/map because the fork serves any
// `src/data/games/*.json` via a glob. `18dragon.json` there is a SYMLINK to the real
// project file (gitignored in the fork), so it's always live — no copy step, and do
// NOT remove it (the designer views the map through this route). If it's missing:
//   ln -s /Users/earlmiles/Projects/18dragon/18dragon.json \
//         /Users/earlmiles/Projects/18xx-maker/src/data/games/18dragon.json
//
// Usage (run from the fork so playwright resolves):
//   node verify-screenshot.mjs <out.png> [slug=18dragon] [clip=x,y,w,h] [scale=2] [viewport=WxH]
// Requires chromium once: `npx playwright install chromium`.
//
// The map has grown WIDER than a default viewport (Gördum reaches col 42), so a
// far-east region is off-screen at the default 1800px. Pass a wide viewport to
// capture it — e.g. `... 18dragon '' 2 4400x2800` — then optionally `clip` into it.
// Clip coords are in the CHOSEN viewport's pixel space. This lives in the skill dir
// (survives scratchpad cleanup) — prefer it over ad-hoc one-off render scripts.

import pkg from "/Users/earlmiles/Projects/18xx-maker/node_modules/playwright/index.js";
const { chromium } = pkg;

const [out, slug = "18dragon", clipArg, scaleArg, viewportArg] = process.argv.slice(2);
if (!out) {
  console.error("usage: node verify-screenshot.mjs <out.png> [slug] [x,y,w,h] [scale] [WxH]");
  process.exit(1);
}
const clip = clipArg ? (([x, y, w, h]) => ({ x, y, width: w, height: h }))(clipArg.split(",").map(Number)) : null;
const deviceScaleFactor = scaleArg ? Number(scaleArg) : 2;
const viewport = viewportArg
  ? (([w, h]) => ({ width: w, height: h }))(viewportArg.split("x").map(Number))
  : { width: 1800, height: 1300 };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport, deviceScaleFactor });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

// domcontentloaded (NOT networkidle — vite HMR never idles). Wait out any
// recompile the game-copy triggered, then screenshot.
await page.goto(`http://localhost:3000/games/${slug}/map`, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(4000);

const info = await page.evaluate(() => {
  const texts = [...document.querySelectorAll("text")].map((t) => t.textContent);
  let area = 0;
  document.querySelectorAll("svg").forEach((s) => { const r = s.getBoundingClientRect(); area = Math.max(area, r.width * r.height); });
  return { svgCount: document.querySelectorAll("svg").length, mapArea: Math.round(area), textSample: texts.slice(0, 40) };
});
console.log("INFO:" + JSON.stringify(info));
console.log("CONSOLE_ERRORS:" + JSON.stringify(errors));

await page.screenshot(clip ? { path: out, clip } : { path: out, fullPage: true });
await browser.close();
