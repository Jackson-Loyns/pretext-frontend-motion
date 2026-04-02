# Examples

## Runnable Official Families

### Accordion

```text
Build an accordion where panel copy height is predicted with Pretext before expansion, so the layout stays stable and the transition does not guess from DOM reads.
```

### Bubbles

```text
Create a multilingual message surface with tight multiline bubbles. Use Pretext so each bubble knows its text height before paint and the layout stays compact.
```

### Dynamic Layout

```text
Build a fixed-height editorial spread where text reroutes around a moving obstacle. Use `layoutNextLine()` to recalculate each line against the available slot.
```

### Variable Typographic ASCII

```text
Make a canvas ASCII poster where measured lines create proportional anchor positions and the glyph field reacts to the pointer before settling back.
```

### Editorial Engine

```text
Create an editorial engine demo with moving circular geometry, a pull quote, and multi-column text reflow with no DOM text measurement in the relayout path.
```

### Masonry

```text
Build a masonry-like bulletin where card height prediction comes from Pretext and the packing stays stable with mixed-length copy.
```

## Blueprint Families

### Justification Comparison

Use when the request is about paragraph layout tradeoffs instead of a single poster-like demo.

### Rich Text

Use when the request is about mixed inline content such as links, chips, and code spans flowing together.
