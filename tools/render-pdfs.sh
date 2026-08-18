#!/usr/bin/env bash
# Render the print HTMLs to true-size PDFs with headless Chrome.
#
#   tools/render-pdfs.sh [name ...]      # default: every deck below
#
# WHY: the HTML sheets are exactly US-Letter (279.4x215.9mm) with `@page {margin:0}`.
# If the printing app does NOT honour that margin (Safari always applies printer
# margins; Chrome's dialog does when Margins is anything but "None"), every sheet
# overflows its page by a hair and spills onto a BLANK following page — which also
# destroys duplex registration. Printing a PDF at 100% / "Actual size" sidesteps the
# whole class of problem, so these PDFs are the files you actually print.
#
# Print settings: Scale 100% (NOT "fit to page"), paper US Letter.
#   cards-duplex.pdf -> two-sided, flip on LONG edge (landscape).
#   cards-single.pdf, charters-*.pdf -> single-sided.
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Google Chrome not found at $CHROME" >&2; exit 1; }

DECKS=("$@")
[ ${#DECKS[@]} -gt 0 ] || DECKS=(cards-single cards-duplex charters-major charters-minor)

for name in "${DECKS[@]}"; do
  src="print/$name.html"
  [ -f "$src" ] || { echo "missing $src — run its generator first" >&2; exit 1; }
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="print/$name.pdf" "file://$PWD/$src" >/dev/null 2>&1
  pages=$(pdfinfo "print/$name.pdf" 2>/dev/null | awk '/^Pages:/{print $2}')
  sheets=$(grep -c 'class="sheet"\|class="page"' "$src" || true)
  echo "wrote print/$name.pdf (${pages:-?} pages; html has $sheets sheets)"
  if [ -n "${pages:-}" ] && [ "$pages" != "$sheets" ]; then
    echo "  WARNING: page count != sheet count — check for blank pages" >&2
  fi
done
