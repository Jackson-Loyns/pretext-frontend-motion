# Official Notes

Use this file when you need the short version of what the original `pretext` repository actually says.

## The Two Core Use Cases

The upstream README frames `pretext` around two jobs:

1. measure paragraph height without touching the DOM
2. lay out paragraph lines manually when widths change line by line

Source:
- [pretext README](https://github.com/chenglou/pretext/blob/main/README.md)

## What The Author Explicitly Pushes

### `prepare()` is the one-time pass

Upstream says `prepare()` does the one-time work: whitespace normalization, segmentation, glue rules, and canvas measurement.

Operational implication for this skill:
- do not rerun `prepare()` on every resize
- cache prepared handles

### `layout()` is the cheap hot path

Upstream describes `layout()` as pure arithmetic over cached widths and explicitly says resize should rerun `layout()`, not `prepare()`.

Operational implication for this skill:
- the relayout path should stay cheap
- avoid DOM reads in the critical loop

### DOM measurement is the thing being avoided

The upstream README directly calls out `getBoundingClientRect()` and `offsetHeight` as expensive layout-triggering reads that `pretext` is meant to side-step.

Operational implication for this skill:
- if a demo still depends on DOM text measurement for relayout, it is missing the point

### Manual line APIs are first-class

The upstream README presents `layoutWithLines()`, `walkLineRanges()`, and `layoutNextLine()` as the tools for Canvas, SVG, obstacle-aware flow, shrink-wrap search, and width-changing line placement.

Operational implication for this skill:
- routed editorial layouts and kinetic Canvas demos should use those APIs directly

## Limits The Upstream Repo Clearly Signals

### `system-ui` is unsafe for precision-critical layout on macOS

The upstream README marks `system-ui` as unsafe for accuracy. The research log explains why: Canvas and DOM can resolve different system font variants at certain sizes.

Operational implication for this skill:
- use named fonts when text geometry matters

### Browser-first is the honest default

The upstream README says `pretext` can render to DOM, Canvas, SVG and eventually server-side. That is not the same as promising production-grade SSR parity today.

Operational implication for this skill:
- default to browser-driven demos
- do not overclaim server-side fidelity

### The hot path should stay arithmetic-only

The research log repeatedly says the important keep was architectural:
- do the expensive work once in `prepare()`
- keep `layout()` arithmetic-only

Operational implication for this skill:
- do not reintroduce hidden DOM reads or full-string remeasurement in relayout loops

## Current Status Signal

The upstream `STATUS.md` says:

- `layout()` remains the resize hot path
- `prepare()` is where script-specific cost still lives

Operational implication for this skill:
- a good demo separates one-time text preparation from relayout and rendering

## Primary Sources

- [pretext README](https://github.com/chenglou/pretext/blob/main/README.md)
- [pretext RESEARCH.md](https://github.com/chenglou/pretext/blob/main/RESEARCH.md)
- [pretext STATUS.md](https://github.com/chenglou/pretext/blob/main/STATUS.md)
