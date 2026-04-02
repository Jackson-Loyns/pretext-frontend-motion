# Example Requests

Use these as request patterns for assistants. Each one maps directly to an official Pretext family.

The runnable entries are static ESM packages that depend directly on `@chenglou/pretext`.
They no longer require Vite or a build step before local preview.

## Runnable Families

| Demo family | Use this when the request sounds like | Start from |
| --- | --- | --- |
| Accordion | "Build an accordion where panel copy height is predicted before expansion so the transition stays stable." | `core/bundle/examples/accordion` |
| Bubbles | "Create a multilingual messaging surface with tight multiline bubbles and no wasted vertical space." | `core/bundle/examples/bubbles` |
| Dynamic Layout | "Build a fixed-height editorial spread where text reroutes around a moving obstacle." | `core/bundle/examples/dynamic-layout` |
| Variable Typographic ASCII | "Make a canvas ASCII poster where measured lines drive a reactive glyph field." | `core/bundle/examples/variable-typographic-ascii` |
| Editorial Engine | "Create an editorial engine demo with moving geometry, a pull quote, and multi-column reflow." | `core/bundle/examples/editorial-engine` |
| Masonry | "Build a text-card bulletin board where card heights are predicted before packing." | `core/bundle/examples/masonry` |

## Blueprint Families

| Demo family | Use this when the request sounds like | Start from |
| --- | --- | --- |
| Justification Comparison | "Compare paragraph layout strategies and show the line-breaking tradeoffs clearly." | `core/bundle/blueprints/justification-comparison.md` |
| Rich Text | "Lay out links, chips, code spans, and inline text in one measured flow." | `core/bundle/blueprints/rich-text.md` |

## What Good Requests Usually Include

- the official family or a clear visual equivalent
- the surface type: panel, chat, editorial spread, poster, grid
- whether the output is DOM-first or canvas-first
- the style profile: editorial-paper, technical-lab-white, kinetic-dark-poster, compact-measured-ui
- the interaction model: hover, resize, pointer, scroll, drag

## Preset Ideas

These starter presets are now available through the CLI:

- `predictive-ui`: `signal-bubbles`, `tight-masonry`, `multilingual-feed`, `lab-signal-board`, `gallery-ribbon`
- `editorial-routing`: `orbital-essay`, `pull-quote-spread`, `routed-manifesto`, `paper-atlas`, `lab-schematic`
- `kinetic-typography`: `pulse-type`, `ribbon-ascii`, `pointer-poster`, `algo-signal-field`, `ivory-data-cloud`, `infrared-poster`
