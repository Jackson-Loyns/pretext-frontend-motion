# Prompt Recipes

Good prompts specify:

1. the official demo family or a very close equivalent
2. the visual direction
3. the exact role of Pretext
4. the motion logic, if motion matters

## Visual prompt ingredients that help

- typography-first
- poster-like
- editorial
- severe or atmospheric palette
- asymmetrical composition
- motion tied to line geometry or glyph anchors

Avoid empty phrases like:

- make it cool
- make it modern
- add nice animations

Those do not constrain the result enough.

## Strong prompt examples

### Accordion

Build an accordion for release notes where expanding a panel uses Pretext height prediction instead of DOM text measurement. Keep the visual language compact, premium, and editorial rather than dashboard-like.

### Bubbles

Create a multilingual chat surface with tight multiline bubbles. The point is that line count and height are known before paint, so the layout stays stable as messages appear.

### Dynamic Layout

Build a fixed-height editorial spread where the headline and body reroute around a moving circular obstacle. Use `layoutNextLine()` for the changing line widths.

### Variable Typographic ASCII

Create a canvas-based ASCII poster where measured lines provide anchor positions and the glyph field reacts to the pointer before settling back into place.

### Editorial Engine

Build an editorial engine demo with a pull quote, animated orbs, and two-column text flow. The composition should reflow live while staying in Pretext instead of DOM measurement.

### Masonry

Build a masonry-like bulletin where card heights are predicted from Pretext and the packing stays stable with mixed-length copy.
