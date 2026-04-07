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
- technical-lab white field
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

### Technical Lab White

Create a near-white technical landing scene inspired by sparse algorithm visualization rather than a SaaS hero. Use `prepareWithSegments()` and `layoutWithLines()` so the main word or phrase is built from measured glyph anchors, while small peripheral labels drift across the field. Keep the typography restrained, airy, and precise. Avoid centered startup-template composition, oversized gradient blobs, or warm editorial paper styling.

### Technical Lab White, Dense Sample

Build a sparse white signal field similar to a computational research intro page. Use a large measured central word, many tiny distributed labels, and low-contrast accents in violet, graphite, and soft magenta. Motion should come from local drift, aggregation, and dispersal around the measured anchors. Do not use a standard headline-plus-subtitle hero.

### Editorial Paper, Dense Sample

Build a warm editorial spread with a serif-led title, routed body text, and one strong compositional interruption such as a quote marker or circular annotation. The page should feel like a curated printed piece, not a startup landing page painted beige.

### Kinetic Dark Poster, Dense Sample

Create a dark kinetic poster with a single dominant phrase, luminous glyph fragments, and a measured field that pulses around the pointer. Use Pretext line anchors as the structure behind the motion and avoid UI chrome, dashboards, and app-like sections.

### Editorial Engine

Build an editorial engine demo with a pull quote, animated orbs, and two-column text flow. The composition should reflow live while staying in Pretext instead of DOM measurement.

### Masonry

Build a masonry-like bulletin where card heights are predicted from Pretext and the packing stays stable with mixed-length copy.
