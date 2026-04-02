# Quick Reference

## Use This Bundle When

- the request clearly matches one of the official Pretext demos
- text measurement is the point, not a detail
- the layout must avoid DOM text measurement in the hot path
- motion is driven by text geometry rather than decorative animation

## Pick The Official Demo Family First

| If the request sounds like... | Pick |
| --- | --- |
| expandable sections with known text height | Accordion |
| tight multiline chat bubbles | Bubbles |
| routed text around shapes | Dynamic Layout |
| animated editorial spread with live reflow | Editorial Engine |
| ASCII / canvas poster with measured text anchors | Variable Typographic ASCII |
| card grid with predicted heights | Masonry |
| comparison of paragraph layout strategies | Justification Comparison |
| mixed inline pills, links, and text | Rich Text |

## Install Fast

```bash
npm install
npm run build
npx pretext-skill init --ai codex --offline --force
```

## Main Commands

```bash
npx pretext-skill init --ai cursor --offline --force
npx pretext-skill init --ai all --offline --force
npx pretext-skill update --offline --force
npx pretext-skill versions
npx pretext-skill doctor
```

## Non-Negotiables

- `prepare()` is one-time work.
- `layout()` is the relayout hot path.
- `prepareWithSegments()` is the route into manual line layout.
- DOM text measurement is not allowed in the relayout hot path.
- named fonts are required when line accuracy matters.
