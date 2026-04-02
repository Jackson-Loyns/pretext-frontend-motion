---
name: pretext-frontend-motion
description: Build polished Pretext-powered frontend demos, text-driven layouts, and kinetic typography experiments with Vanilla TypeScript and Canvas. Use when the user wants predictive text sizing, zero-CLS text UI, editorial text routing around obstacles, canvas typography, text animation, or visually strong landing pages and experiments that should be powered by @chenglou/pretext rather than ordinary DOM measurement.
---

# Pretext Frontend Motion

## Overview

Use this skill to turn text into a layout primitive, not a passive DOM byproduct.

Default to `Vanilla TypeScript + Canvas + @chenglou/pretext`. Generate complete demos that are visually intentional, use Pretext in the actual layout path, and avoid DOM text measurement in hot paths.

## Prerequisites

- Confirm the project can run a modern frontend toolchain. The bundled starters use `Vite + TypeScript`.
- Install dependencies before running a generated starter:

```bash
npm install
npm run dev
```

- Use named fonts for measurement-critical text. Avoid `system-ui` when accuracy matters.
- Treat browser rendering as the target. Do not promise exact SSR parity.

## Mode Selection

Choose exactly one primary mode before implementing:

| Mode | Use for | Typical output |
| --- | --- | --- |
| `predictive-ui` | Zero-CLS message bubbles, accordions, masonry cards, tooltip sizing, virtualized text lists | Interactive UI demo with stable text sizing |
| `editorial-routing` | Text flowing around shapes, multi-column stories, pull quotes, obstacle-aware headlines | Magazine-style interactive layout |
| `kinetic-typography` | Canvas text motion, particle text, ASCII experiments, scroll morph, text-reactive effects | Visually expressive motion-driven demo |

If the prompt spans multiple categories, pick the dominant mode and borrow secondary ideas only after the core layout works.

## Required Workflow

1. Classify the request into one mode.
2. Start from the matching starter in `assets/`.
3. Keep Pretext in the real layout path:
   - Use `prepare()` / `prepareWithSegments()` for one-time text analysis.
   - Use `layout()`, `layoutWithLines()`, `layoutNextLine()`, or `walkLineRanges()` for relayout.
   - On resize or interaction, recompute layout from cached prepared text instead of reading DOM text metrics.
4. Build visuals with strong direction:
   - Pick a clear type system and color system.
   - Make motion meaningful to text layout, line positions, or glyph placement.
   - Avoid generic SaaS templates, default font stacks, and decorative-only animation.
5. Validate before finishing:
   - Desktop and mobile viewport both render correctly.
   - Resize causes clean reflow.
   - The demo does not depend on `getBoundingClientRect()`, `offsetHeight`, or similar DOM text measurement in the hot path.

## Bundled Resources

- Read `references/official-notes.md` when you need the upstream author position before making claims about Pretext.
- Read `references/capabilities.md` when you need official API boundaries and limitations.
- Read `references/patterns.md` when deciding how to structure a demo.
- Read `references/design-rules.md` before touching visual direction or animation.
- Read `references/react-migration.md` only when the user wants to port the starter into a React app.
- Use `scripts/pretext_cli.py scaffold ...` to scaffold a starter from `assets/starter-*`.

## Validation Checklist

- [ ] Chosen mode matches the request.
- [ ] Starter copied instead of rebuilding boilerplate from scratch.
- [ ] Pretext is used for measurement and line layout, not just installed as a dependency.
- [ ] No DOM text measurement in the relayout hot path.
- [ ] Visual style is deliberate and not template-like.
- [ ] Animation is tied to text layout, geometry, or typography behavior.
- [ ] Demo works on desktop and mobile widths.
- [ ] Resize produces stable reflow without visible jitter.
