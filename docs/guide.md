# Guide

## Core Workflow

Use this workflow for every request:

| Step | What to decide | What to do |
| --- | --- | --- |
| 1 | Pick the primary mode | Choose `predictive-ui`, `editorial-routing`, or `kinetic-typography` |
| 2 | Pick the starter | Copy the matching starter from `assets/` |
| 3 | Lock the visual direction | Choose typography, palette, layout rhythm, and motion tone |
| 4 | Implement with Pretext | Prepare text once, relayout from cached geometry |
| 5 | Validate | Check resize, mobile, motion, and hot-path measurement rules |

## Mode Selection

### `predictive-ui`

Use this when the main problem is sizing text before paint.

Good fits:

- accordions
- chat bubbles
- masonry cards
- stable tooltip sizing
- virtualized text surfaces

Avoid turning this into a generic app shell. The text geometry should be the point.

### `editorial-routing`

Use this when text should respond to geometry on the page.

Good fits:

- headlines that avoid logos or art
- body copy around shapes
- pull quotes that carve text bands
- multi-column handoff using `layoutNextLine()`

This mode should feel composed, not random. Use strong vertical rhythm and obvious obstacle logic.

### `kinetic-typography`

Use this when text becomes visual material.

Good fits:

- pointer-reactive text
- particle or field-based typography
- ASCII renderers
- scroll morphing text
- canvas posters with animated layout energy

This mode still needs real layout logic. Motion should build on measured glyph or line positions.

## From Prompt to Demo

| User request shape | Recommended mode | Core Pretext APIs |
| --- | --- | --- |
| "Make the UI stop shifting when text loads" | `predictive-ui` | `prepare`, `layout` |
| "Route the text around shapes or logos" | `editorial-routing` | `prepareWithSegments`, `layoutNextLine`, `walkLineRanges` |
| "Make text feel alive and animated" | `kinetic-typography` | `prepareWithSegments`, `layoutWithLines` |

## Implementation Rules

- Prepare text once and reuse the prepared handle.
- Recompute line layout on resize or geometry changes, not on every frame unless the width actually changes.
- If animation needs per-frame motion, animate the rendered positions, particles, or transforms derived from the last layout result.
- Keep typography and composition intentional. Pretext demos should feel like design experiments, not utility screens.

## Delivery Checklist

- The chosen mode is obvious from the result.
- The demo can be run with `npm install` and `npm run dev`.
- Mobile width still looks intentional.
- Resize reflows cleanly.
- The output contains a short explanation of how Pretext is being used.
