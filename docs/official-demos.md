# Official Demo Mapping

This project follows the official sample set published by Cheng Lou.

- Demo site: [https://chenglou.me/pretext/](https://chenglou.me/pretext/)
- Source repository: [https://github.com/chenglou/pretext](https://github.com/chenglou/pretext)

The goal here is not to restate the upstream project everywhere. The goal is to keep the assistant aligned with the same demo families, the same API intent, and the same layout constraints.

## Coverage

| Official demo | What it demonstrates | This repo | Primary APIs |
| --- | --- | --- | --- |
| Accordion | expand and collapse panels whose height can be predicted from text content | Runnable example | `prepare`, `layout` |
| Bubbles | compact multiline bubbles with reduced wasted area | Runnable example | `prepare`, `layout` |
| Dynamic Layout | fixed-height routed layout around obstacles | Runnable example | `prepareWithSegments`, `layoutNextLine` |
| Variable Typographic ASCII | glyph-driven canvas poster work | Runnable example | `prepareWithSegments`, `layoutWithLines` |
| Editorial Engine | moving geometry, pull quotes, and editorial reflow | Runnable example | `prepareWithSegments`, `layoutNextLine`, `walkLineRanges` |
| Justification Comparison | paragraph layout comparison | Blueprint + prompt recipe | `walkLineRanges` |
| Rich Text | inline rich content in a measured flow | Blueprint + prompt recipe | `prepareWithSegments`, `layoutWithLines` |
| Masonry | predicted text-card heights for packed layouts | Runnable example | `prepare`, `layout` |

## Bundle Entry Points

| Family | Entry point |
| --- | --- |
| Accordion | `core/bundle/examples/accordion` |
| Bubbles | `core/bundle/examples/bubbles` |
| Dynamic Layout | `core/bundle/examples/dynamic-layout` |
| Variable Typographic ASCII | `core/bundle/examples/variable-typographic-ascii` |
| Editorial Engine | `core/bundle/examples/editorial-engine` |
| Justification Comparison | `core/bundle/blueprints/justification-comparison.md` |
| Rich Text | `core/bundle/blueprints/rich-text.md` |
| Masonry | `core/bundle/examples/masonry` |

## Interpretation Rules

- Keep Pretext in the real layout path.
- Do not reduce these demos to generic animation wrappers.
- Do not replace line measurement with DOM reads during relayout.
- Keep the visual direction strong enough that the result does not collapse into a generic app shell.
