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

## Use These Commands

Inside this repo:

```bash
npm install
npm run build
npm run cli -- init claude-code --force
npm run cli -- doctor
```

Packaged usage:

```bash
npx pretext-skill init claude-code --force
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
