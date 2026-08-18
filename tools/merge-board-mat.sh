#!/usr/bin/env bash
# Merge the 3 single-page board-mat segment PDFs into one print-ready file.
#
#   tools/merge-board-mat.sh
#
# The board mat prints as 3 hinged US-Letter segments. gen-board-mat.mjs writes the
# 3 single-page HTMLs (print/board-mat-segments/board-mat-{1,2,3}.html); render each to
# PDF at TRUE size (browser "Save as PDF", 100% scale, or a headless print) into the same
# subdir, then this merges them into print/board-mat.pdf — the single file you actually
# print. Requires pdfunite (poppler).
set -euo pipefail
cd "$(dirname "$0")/.."
SEG=print/board-mat-segments
for n in 1 2 3; do
  [ -f "$SEG/board-mat-$n.pdf" ] || { echo "missing $SEG/board-mat-$n.pdf — render it from board-mat-$n.html first" >&2; exit 1; }
done
pdfunite "$SEG/board-mat-1.pdf" "$SEG/board-mat-2.pdf" "$SEG/board-mat-3.pdf" print/board-mat.pdf
echo "wrote print/board-mat.pdf (3 segments merged)"
