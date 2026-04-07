---
name: {{name}}
description: {{frontmatterDescription}}
---

# {{title}}

## Overview

Use this skill when the request maps to one of the official Pretext demo families:
Accordion, Bubbles, Dynamic Layout, Variable Typographic ASCII, Editorial Engine,
Justification Comparison, Rich Text, or Masonry.

Default to browser-first implementations that keep Pretext in the actual layout path.
Do not fall back to DOM text measurement in resize or interaction hot paths.

Typical trigger patterns:

- measure text height without DOM reflow
- auto-fit text into a fixed number of lines
- shrink-wrap multilingual bubbles
- route text around an obstacle
- build algorithmic typography or glyph-field motion
- compare line-breaking strategies

## Required Workflow

1. Pick the official demo family that best matches the request.
2. Pick the style profile that best matches the visual target.
3. Use the corresponding example or blueprint from the bundled resources.
4. Keep Pretext in the real measurement path:
   - `prepare()` and `layout()` for Accordion, Bubbles, Masonry
   - `prepareWithSegments()` and `layoutNextLine()` for Dynamic Layout and Editorial Engine
   - `prepareWithSegments()` and `layoutWithLines()` for Variable Typographic ASCII
   - `walkLineRanges()` for width-tight probing and comparison workflows
5. Keep the design intentional:
   - strong typography
   - clear compositional point of view
   - motion tied to text geometry rather than decorative-only animation
6. Validate:
   - desktop and mobile
   - resize reflow
   - no `getBoundingClientRect()` / `offsetHeight` in the text relayout hot path

## Bundled Resources

- `references/official-notes.md` for upstream author constraints
- `references/demo-family-map.md` for official demo mapping and API pairing
- `references/prompt-recipes.md` for high-quality prompt patterns
- `references/design-rules.md` for visual direction and anti-generic rules
- `references/font-strategy.md` for typeface selection and fallback rules
- `references/style-profiles.md` for choosing the right visual profile before implementation
- `references/integration-gotchas.md` for framework lifecycle, font loading, and SSR constraints
- `examples/README.md` for example selection and recognition hints
- `examples/` for runnable starter examples
- `integrations/README.md` for real TypeScript framework integrations
- `integrations/` for vanilla, React, Vue, and Svelte reference projects
- `blueprints/` for richer but non-runnable cases

{{quickReferenceSection}}
