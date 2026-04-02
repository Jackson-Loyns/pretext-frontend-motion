# Patterns

## Predictive UI

### Goal

Know text size before paint so layout can be stable.

### Typical structure

1. `prepare()` each text item once.
2. Store the prepared handle with the item data.
3. On width changes, call `layout()` to compute height.
4. Render cards, bubbles, or rows using the predicted height.

### Good fits

- message bubbles
- accordions
- card grids
- tooltips
- virtualized lists

## Editorial Routing

### Goal

Treat text as a stream that can route around geometry.

### Typical structure

1. `prepareWithSegments()` long text once.
2. Define obstacles and compute free line slots by band.
3. Use `layoutNextLine()` or `walkLineRanges()` to place lines into those slots.
4. Recompute when obstacles move or the viewport changes.

### Good fits

- routed headlines
- obstacle-aware stories
- multi-column handoff
- pull quotes and carved text bands

## Kinetic Typography

### Goal

Use measured text geometry as the base state for motion.

### Typical structure

1. `prepareWithSegments()` text once.
2. `layoutWithLines()` to get line and glyph anchor positions.
3. Render to canvas.
4. Animate around those anchors instead of replacing layout with random motion.

### Good fits

- particle text
- scroll morph
- ASCII experiments
- text-reactive pointer systems

## Pattern Selection

| If the main problem is... | Choose |
| --- | --- |
| size before paint | `predictive-ui` |
| lines reacting to shapes | `editorial-routing` |
| text as animated visual material | `kinetic-typography` |
