# Quick Reference

## Start Here

This bundle follows the official Pretext sample set by Cheng Lou:

- Demo site: [https://chenglou.me/pretext/](https://chenglou.me/pretext/)
- Source repository: [https://github.com/chenglou/pretext](https://github.com/chenglou/pretext)

Pick the official demo family first. Then start from the matching bundled example or blueprint.

## Choose The Demo Family

| Request pattern | Demo family |
| --- | --- |
| expandable sections with measured panel height | Accordion |
| compact multiline chat or speech bubbles | Bubbles |
| text routed around shapes or moving obstacles | Dynamic Layout |
| moving editorial spread, pull quote, live reflow | Editorial Engine |
| measured ASCII poster or glyph field on canvas | Variable Typographic ASCII |
| text-card grid with predicted height | Masonry |
| compare paragraph layout choices | Justification Comparison |
| mixed inline pills, links, and text | Rich Text |

## Choose The Style Profile

| If you want | Profile |
| --- | --- |
| asymmetrical spread, warm paper, serif-led hierarchy | `editorial-paper` |
| sparse near-white field, algorithmic labels, signal-map feel | `technical-lab-white` |
| dark field, stronger contrast, glyph or particle motion | `kinetic-dark-poster` |
| tighter cards, bubbles, accordions, measured utility UI | `compact-measured-ui` |

## Use These Commands

Global package:

```bash
npm install -g pretext-skill@0.3.1
pretext-skill init claude-code --force
pretext-skill list-presets --kind kinetic-typography
pretext-skill doctor
```

Published package:

```bash
npx pretext-skill@0.3.1 versions
npx pretext-skill@0.3.1 init claude-code --force
npx pretext-skill@0.3.1 list-presets --kind kinetic-typography
npx pretext-skill@0.3.1 doctor
```

Inside this repo:

```bash
npm install
npm run build
npm run cli -- init claude-code --force
npm run cli -- list-presets --kind kinetic-typography
npm run cli -- doctor
```

To scaffold a runnable starter:

```bash
npm run cli -- scaffold --kind predictive-ui --out demo
```

## Keep These Rules

- `prepare()` is setup work, not a per-frame operation.
- `layout()` is the cheap relayout path.
- `prepareWithSegments()` is the route into manual line logic.
- `layoutNextLine()` is for routed editorial flow.
- `layoutWithLines()` is for canvas and richer line control.
- `walkLineRanges()` is for width probing and comparison work.
- Do not use DOM text measurement in the relayout hot path.
- Use named fonts when line precision matters.

## Read Next

- [docs/cli.md](cli.md)
- [docs/official-demos.md](official-demos.md)
- [docs/examples.md](examples.md)
- [docs/install.md](install.md)
- [docs/usage.md](usage.md)
