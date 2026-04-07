# Examples

Use this page to choose the right family, the right visual direction, and the right starter before asking an assistant to generate code.

The runnable entries are static ESM packages that depend directly on `@chenglou/pretext`. They do not need Vite or a build step before local preview.

## Official Family Map

### Runnable Families

| Family | Ask for this when you want | Start from |
| --- | --- | --- |
| Accordion | predicted panel height before expansion | `core/bundle/examples/accordion` |
| Bubbles | tight multiline chat or speech bubbles | `core/bundle/examples/bubbles` |
| Dynamic Layout | text rerouted around a moving obstacle | `core/bundle/examples/dynamic-layout` |
| Variable Typographic ASCII | measured ASCII or glyph field on canvas | `core/bundle/examples/variable-typographic-ascii` |
| Editorial Engine | moving editorial spread with pull quotes and reflow | `core/bundle/examples/editorial-engine` |
| Masonry | text-card grid with predicted heights | `core/bundle/examples/masonry` |

### Blueprint Families

| Family | Ask for this when you want | Start from |
| --- | --- | --- |
| Justification Comparison | compare line-breaking strategies | `core/bundle/blueprints/justification-comparison.md` |
| Rich Text | mixed inline chips, links, code spans, and text | `core/bundle/blueprints/rich-text.md` |

## What A Good Request Includes

- the family name or a clear visual equivalent
- the surface type: panel, spread, poster, field, grid, message wall
- whether the result is DOM-first or canvas-first
- the style profile
- the interaction model: hover, resize, pointer, drag, scroll

## Preset Catalog

These starter presets are available through the CLI.

| Kind | Presets |
| --- | --- |
| `predictive-ui` | `signal-bubbles`, `tight-masonry`, `multilingual-feed`, `lab-signal-board`, `gallery-ribbon` |
| `editorial-routing` | `orbital-essay`, `pull-quote-spread`, `routed-manifesto`, `paper-atlas`, `lab-schematic` |
| `kinetic-typography` | `pulse-type`, `ribbon-ascii`, `pointer-poster`, `algo-signal-field`, `ivory-data-cloud`, `infrared-poster` |

List them from the CLI with:

```bash
npx pretext-skill@0.3.1 list-presets --kind kinetic-typography
```

## Style Profiles

### `editorial-paper`

Use this when you want routed composition, warm paper tones, serif-led hierarchy, and asymmetry that feels like a spread instead of a marketing hero.

Prompt ideas:

- "Build a routed editorial landing page on a warm paper field. Use Pretext to wrap the headline and body around a circular annotation, and keep the composition asymmetrical."
- "Create a manifesto spread with serif-led hierarchy, measured body text, and a pull quote that changes the composition rather than sitting in a generic card."

### `technical-lab-white`

Use this when you want a sparse technical field, near-white background, restrained sans-serif typography, and motion that feels algorithmic rather than decorative.

Prompt ideas:

- "Create a near-white technical field inspired by sparse algorithm visualization. Use Pretext to build a central measured word from drifting micro-labels, with light violet and graphite accents."
- "Build a computational typography intro scene with small satellite tags distributed across the canvas, a restrained sans-serif system, and motion based on aggregation and dispersion."

### `kinetic-dark-poster`

Use this when you want a darker cinematic field, bolder display type, and motion tied to glyph geometry rather than generic effects.

Prompt ideas:

- "Design a dark kinetic poster where measured glyph anchors drive a bright particle wordmark. The result should feel cinematic, not like a dashboard or app landing page."
- "Make a dark motion field with a single large phrase and drifting peripheral fragments. Use Pretext for the line anchors and keep the motion tied to the text geometry."

### `compact-measured-ui`

Use this when you want denser utility surfaces, smaller text blocks, and deliberate spacing instead of roomy product-marketing sections.

Prompt ideas:

- "Build a compact multilingual message surface where bubble height is predicted from Pretext before paint, and the visual language stays dense and deliberate."
- "Create a measured card wall with mixed-length notes. The point is stable packing, strong spacing rhythm, and a compact utility surface without dashboard chrome."

## Recommended Starting Points

| If the target feels like | Start with |
| --- | --- |
| algorithmic landing scene | `kinetic-typography` + `algo-signal-field` + `technical-lab-white` |
| routed essay or manifesto | `editorial-routing` + `pull-quote-spread` + `editorial-paper` |
| compact utility surface | `predictive-ui` + `signal-bubbles` or `tight-masonry` + `compact-measured-ui` |
| dark motion poster | `kinetic-typography` + `infrared-poster` + `kinetic-dark-poster` |
