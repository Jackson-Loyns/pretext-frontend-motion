---
name: pretext-frontend-motion
description: Build official Pretext-style demos across Accordion, Bubbles, Dynamic Layout, Variable Typographic ASCII, Editorial Engine, Justification Comparison, Rich Text, and Masonry. Use when the request needs real text measurement, line routing, width-tight multiline UI, or kinetic typography driven by @chenglou/pretext instead of DOM text measurement.
---

# Pretext Frontend Motion

## Overview

Use this skill when the request clearly maps to an official Pretext demo family.

Do not treat Pretext as a decorative dependency. Keep it in the actual layout path.

## Required Workflow

1. Pick the official demo family.
2. Use the matching bundled example or blueprint.
3. Stay in the correct API lane:
   - `prepare` + `layout` for Accordion, Bubbles, Masonry
   - `prepareWithSegments` + `layoutNextLine` for Dynamic Layout and Editorial Engine
   - `prepareWithSegments` + `layoutWithLines` for Variable Typographic ASCII
   - `walkLineRanges` for width probing and layout comparison flows
4. Keep the design intentional.
5. Validate resize, mobile, and hot-path measurement rules.

## Bundled Resources

- `core/bundle/references/official-notes.md`
- `core/bundle/references/demo-family-map.md`
- `core/bundle/references/prompt-recipes.md`
- `core/bundle/examples/`
- `core/bundle/blueprints/`

## Validation Checklist

- Official demo family is explicit.
- Pretext is used for real measurement and layout.
- No DOM text measurement in the relayout hot path.
- `prepare()` is not rerun on every resize.
- The result still looks intentional on mobile widths.
