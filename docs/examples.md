# Examples

## Prompt to Output Mapping

| Prompt | Best mode | Expected result shape |
| --- | --- | --- |
| Build a zero-CLS text bubble demo for multilingual chat messages | `predictive-ui` | Measured bubble widths and heights, stable list layout, strong messaging visuals |
| Make a magazine-style landing page where the headline wraps around floating marks | `editorial-routing` | Obstacle-aware hero, multi-band text slots, expressive editorial composition |
| Create an ASCII poster with animated glyph particles that return to measured text positions | `kinetic-typography` | Canvas poster, particle field, measured glyph anchors, pointer interaction |

## Good Prompt Pattern

Use prompts that combine product intent, visual intent, and text behavior.

```text
Build a typography-first landing page for an AI publishing tool.
Use a warm editorial palette, dramatic serif display type, and animated floating shapes.
The hero text should route around the shapes and reflow cleanly on resize.
Use Pretext for the real text layout path.
```

## Weak Prompt Pattern

Avoid vague requests like these:

```text
Make a nice page with Pretext.
Add some cool animations.
```

These prompts do not define the visual direction or the text behavior.

## Mode Examples

### Predictive UI

```text
Create a message wall where every card precomputes its text height before render.
Make it feel premium, compact, and typography-led rather than like a normal dashboard.
```

### Editorial Routing

```text
Design a two-column story page with a routed headline, a pull quote, and body text that bends around circular artwork.
```

### Kinetic Typography

```text
Build a canvas-based kinetic typography experiment where the text distorts near the pointer but settles back into measured lines.
```
