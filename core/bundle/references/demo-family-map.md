# Demo Family Map

Use the official demo family as the primary routing decision.

| Demo family | What it proves | Primary APIs | Bundled path |
| --- | --- | --- | --- |
| Accordion | Expand/collapse text whose height is known before paint | `prepare`, `layout` | `examples/accordion` |
| Bubbles | Tight multiline chat/message surfaces | `prepare`, `layout` | `examples/bubbles` |
| Dynamic Layout | Fixed-height editorial spread with routed text | `prepareWithSegments`, `layoutNextLine` | `examples/dynamic-layout` |
| Variable Typographic ASCII | Canvas glyph field anchored to measured lines | `prepareWithSegments`, `layoutWithLines` | `examples/variable-typographic-ascii` |
| Editorial Engine | Multi-column live reflow and animated geometry | `prepareWithSegments`, `layoutNextLine`, `walkLineRanges` | `examples/editorial-engine` |
| Justification Comparison | Width probing and paragraph comparison workflow | `walkLineRanges` | `blueprints/justification-comparison.md` |
| Rich Text | Mixed inline layout with non-breakable pills | `prepareWithSegments`, `layoutWithLines` | `blueprints/rich-text.md` |
| Masonry | Card height prediction without DOM reads | `prepare`, `layout` | `examples/masonry` |

Do not collapse the request into a generic three-mode answer when one of these official demo families is a clearer fit.
