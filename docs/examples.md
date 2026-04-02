# Examples

## Prompt to Result Mapping

| Prompt | Best mode | Suggested preset | Expected result shape | Core APIs |
| --- | --- | --- | --- | --- |
| Build a zero-CLS text bubble demo for multilingual chat messages | `predictive-ui` | `signal-bubbles` | Measured bubble widths and heights, stable list layout, strong messaging visuals | `prepare`, `layout` |
| Build a compact bulletin where cards pack tightly around uneven copy lengths | `predictive-ui` | `tight-masonry` | Masonry-like text cards with stable heights and no reflow jitter | `prepare`, `layout` |
| Make a magazine-style landing page where the headline wraps around floating marks | `editorial-routing` | `orbital-essay` | Obstacle-aware hero, visible routed text bands, editorial composition | `prepareWithSegments`, `layoutNextLine` |
| Create a pull-quote spread where copy bends around a large circular quote mark | `editorial-routing` | `pull-quote-spread` | Routed article layout with compositional interruption | `prepareWithSegments`, `layoutNextLine` |
| Create an ASCII poster with animated glyph particles that return to measured text positions | `kinetic-typography` | `ribbon-ascii` | Canvas poster, animated glyph field, pointer reaction | `prepareWithSegments`, `layoutWithLines` |
| Make a motion poster where text gets pushed by the pointer and settles back into lines | `kinetic-typography` | `pointer-poster` | Kinetic canvas typography anchored to measured positions | `prepareWithSegments`, `layoutWithLines` |

## Scaffold Recipes

### Predictive UI

```bash
python3 scripts/pretext_cli.py scaffold \
  --kind predictive-ui \
  --preset multilingual-feed \
  --title "Measured Dispatch" \
  --out output/measured-dispatch
```

Use when the point is stable text sizing before paint.

### Editorial Routing

```bash
python3 scripts/pretext_cli.py scaffold \
  --kind editorial-routing \
  --preset routed-manifesto \
  --title "Routed Manifesto" \
  --out output/routed-manifesto
```

Use when the point is line-by-line rerouting around geometry.

### Kinetic Typography

```bash
python3 scripts/pretext_cli.py scaffold \
  --kind kinetic-typography \
  --preset pointer-poster \
  --title "Vector Choir" \
  --out output/vector-choir
```

Use when the point is motion derived from measured text structure.

## Good Prompt Shape

Use prompts that specify all three layers:

1. product or content intent
2. visual direction
3. text behavior

Example:

```text
Build a landing page for an AI publishing tool.
Use a warm editorial palette, sharp serif display type, and a restrained motion system.
The headline and deck should route around floating shapes and reflow cleanly on resize.
Use Pretext in the real layout path instead of DOM measurement.
```

## Weak Prompt Shape

Avoid prompts like this:

```text
Make a cool page with Pretext and some animations.
```

That does not define the visual language, the text behavior, or the actual role of Pretext.
