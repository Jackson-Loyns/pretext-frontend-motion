# Example Index

Start here when the request maps to a concrete official demo family.

Each runnable example is a static ESM package:

- it depends directly on the official `@chenglou/pretext` npm package
- it uses the package's own exported type definitions
- it runs with `npm install` and `npm start`
- it can be steered with the bundled style profiles in `references/style-profiles.md`

Recommended style pairings:

- Accordion, Bubbles, Masonry -> `compact-measured-ui`
- Dynamic Layout, Editorial Engine -> `editorial-paper` or `technical-lab-white`
- Variable Typographic ASCII -> `technical-lab-white` or `kinetic-dark-poster`

| Demo family | Folder | APIs | Use it for |
| --- | --- | --- | --- |
| Accordion | `examples/accordion` | `prepare`, `layout` | measured expand/collapse panels |
| Bubbles | `examples/bubbles` | `prepare`, `layout` | tight multiline message UI |
| Dynamic Layout | `examples/dynamic-layout` | `prepareWithSegments`, `layoutNextLine` | routed text around geometry |
| Editorial Engine | `examples/editorial-engine` | `prepareWithSegments`, `layoutNextLine`, `walkLineRanges` | live editorial reflow |
| Masonry | `examples/masonry` | `prepare`, `layout` | measured text-card grids |
| Variable Typographic ASCII | `examples/variable-typographic-ascii` | `prepareWithSegments`, `layoutWithLines` | canvas text motion and ASCII posters |

If the request is about paragraph comparison or mixed inline layout rather than a runnable poster/page,
use `blueprints/justification-comparison.md` or `blueprints/rich-text.md`.
