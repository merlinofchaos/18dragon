// print-cdp.mjs — render a local HTML to PDF via headless Chrome over the DevTools
// Protocol, WAITING for Paged.js to finish (window.__pagedDone) before printing.
// Dependency-free: uses Node's built-in fetch + WebSocket (Node 22+). C54.
//
// Raw `chrome --print-to-pdf` snapshots the page before Paged.js's async pagination
// completes, silently truncating the PDF. CDP lets us poll the completion hook first.

import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// minimal CDP client over one page target's websocket
class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map();
    ws.addEventListener("message", (e) => {
      const m = JSON.parse(e.data);
      if (m.id && this.pending.has(m.id)) {
        const { resolve, reject } = this.pending.get(m.id); this.pending.delete(m.id);
        m.error ? reject(new Error(m.error.message)) : resolve(m.result);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

async function connectWS(url) {
  const ws = new WebSocket(url);
  await new Promise((res, rej) => { ws.addEventListener("open", res); ws.addEventListener("error", rej); });
  return ws;
}

export async function printToPdf(fileUrl, outPath, { paperWidth = 8.5, paperHeight = 11, timeoutMs = 30000 } = {}) {
  const port = 9200 + Math.floor((Date.now() % 500));
  const userDir = mkdtempSync(join(tmpdir(), "rb-chrome-"));
  const chrome = spawn(CHROME, [
    "--headless", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
    `--remote-debugging-port=${port}`, `--user-data-dir=${userDir}`, fileUrl,
  ], { stdio: "ignore" });

  try {
    // wait for the DevTools endpoint + a page target
    let target;
    for (let i = 0; i < 100 && !target; i++) {
      await sleep(100);
      try {
        const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
        target = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      } catch { /* not up yet */ }
    }
    if (!target) throw new Error("Chrome DevTools endpoint did not come up");

    const cdp = new CDP(await connectWS(target.webSocketDebuggerUrl));
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    // poll for Paged.js completion hook
    const deadline = Date.now() + timeoutMs;
    for (;;) {
      const { result } = await cdp.send("Runtime.evaluate", {
        expression: "window.__pagedDone === true", returnByValue: true,
      });
      if (result.value === true) break;
      if (Date.now() > deadline) throw new Error("Paged.js did not finish before timeout");
      await sleep(200);
    }

    const { data } = await cdp.send("Page.printToPDF", {
      printBackground: true, preferCSSPageSize: true,
      marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
      paperWidth, paperHeight,
    });
    const { writeFileSync } = await import("node:fs");
    writeFileSync(outPath, Buffer.from(data, "base64"));
  } finally {
    chrome.kill();
  }
}
