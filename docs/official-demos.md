# Official Demos

This repo is organized around the official Pretext demo index, not around a vague
"text motion" umbrella.

## Coverage Matrix

| Official demo | Upstream summary | This repo |
| --- | --- | --- |
| Accordion | Expand and collapse sections whose text heights are calculated from Pretext | Runnable example in `core/bundle/examples/accordion` |
| Bubbles | Tight multiline message bubbles with less wasted area | Runnable example in `core/bundle/examples/bubbles` |
| Dynamic Layout | Fixed-height editorial spread with obstacle-aware routing | Runnable example in `core/bundle/examples/dynamic-layout` |
| Variable Typographic ASCII | Particle-driven ASCII art based on measured glyphs | Runnable example in `core/bundle/examples/variable-typographic-ascii` |
| Editorial Engine | Animated orbs, pull quotes, multi-column reflow | Runnable example in `core/bundle/examples/editorial-engine` |
| Justification Comparison | Comparison of paragraph layout strategies | Blueprint in `core/bundle/blueprints/justification-comparison.md` |
| Rich Text | Rich inline text, code, links, chips | Blueprint in `core/bundle/blueprints/rich-text.md` |
| Masonry | Text-card occlusion demo with predicted heights | Runnable example in `core/bundle/examples/masonry` |

## API Pairing

| Demo family | APIs to emphasize |
| --- | --- |
| Accordion | `prepare`, `layout` |
| Bubbles | `prepare`, `layout` |
| Dynamic Layout | `prepareWithSegments`, `layoutNextLine` |
| Variable Typographic ASCII | `prepareWithSegments`, `layoutWithLines` |
| Editorial Engine | `prepareWithSegments`, `layoutNextLine`, `walkLineRanges` |
| Justification Comparison | `walkLineRanges` |
| Rich Text | `prepareWithSegments`, `layoutWithLines` |
| Masonry | `prepare`, `layout` |
