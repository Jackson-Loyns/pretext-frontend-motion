# Official Notes

These notes compress the upstream `chenglou/pretext` repo into a small set of rules.

## Core claims from upstream

- `prepare()` is the one-time pass.
- `layout()` is the cheap hot relayout path.
- The whole point is to avoid DOM reads like `getBoundingClientRect()` and `offsetHeight` in the text relayout path.
- `prepareWithSegments()`, `layoutWithLines()`, `walkLineRanges()`, and `layoutNextLine()` are first-class APIs for manual line routing and Canvas/SVG workflows.
- `system-ui` is unsafe for precision-critical layout on macOS.
- Browser-first is the honest default. Do not overclaim server-side parity.

## Skill implications

- Cache prepared handles.
- Recompute layout on width or geometry changes; do not re-run `prepare()` on every resize.
- Use named fonts when line accuracy matters.
- Treat Pretext as the layout engine, not a decorative dependency.

Primary sources:
- upstream README
- upstream RESEARCH.md
- upstream STATUS.md
