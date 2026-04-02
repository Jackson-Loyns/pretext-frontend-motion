# Rich Text Blueprint

Use this when the user wants mixed inline content instead of a plain paragraph.

## Goal

Lay out rich inline content together:

- body text
- code spans
- links
- pills or chips that should stay whole

## Where Pretext fits

- segment-rich preparation with `prepareWithSegments()`
- line materialization with `layoutWithLines()`
- custom rendering or inline box placement driven by measured line structure

## Delivery shape

- a note or editor-like surface
- mixed inline runs with visible styling differences
- pills remain whole while surrounding text wraps naturally
