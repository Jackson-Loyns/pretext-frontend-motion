# Usage

## Use It For

Use this bundle when text measurement or text geometry is the actual implementation problem.

Good request patterns:

- "Measure text height without DOM reflow."
- "Build an accordion with predicted panel height."
- "Create multilingual bubbles with tight multiline packing."
- "Wrap body text around a moving circle."
- "Fit a headline to three lines."
- "Make a sparse algorithmic typography intro on a near-white field."
- "Compare justification strategies for the same paragraph."
- "Lay out inline chips, links, and text in one measured flow."

Avoid weak requests such as:

- "Make a cool landing page."
- "Add some animation."
- "Use Pretext if you want."

If plain DOM flow already solves the problem, do not force this bundle into the task.

## How The Skill Should Route The Request

The installed skill should make these decisions in order:

1. pick the official demo family
2. pick the visual profile
3. pick the matching example, blueprint, or preset
4. stay in the correct Pretext API lane

## Family Map

| If the request sounds like | Family |
| --- | --- |
| measured expansion or predicted panel height | Accordion |
| shrink-wrap multiline chat or bubbles | Bubbles |
| obstacle-aware text routing | Dynamic Layout |
| moving editorial spread with pull quotes | Editorial Engine |
| canvas glyph field or ASCII poster | Variable Typographic ASCII |
| predicted card height in a grid | Masonry |
| compare line-breaking or paragraph strategies | Justification Comparison |
| inline chips, code spans, and links | Rich Text |

## Visual Profiles

| If the target feels like | Profile |
| --- | --- |
| warm paper, asymmetry, serif hierarchy | `editorial-paper` |
| sparse technical field, near-white canvas, restrained sans | `technical-lab-white` |
| dark cinematic poster, brighter glyph motion | `kinetic-dark-poster` |
| tighter utility surface, denser cards and bubbles | `compact-measured-ui` |

## What To Avoid

- generic centered SaaS heroes
- decorative motion that ignores text geometry
- DOM text measurement in resize or interaction hot paths
- unspecified font systems when layout precision matters

## Related Docs

- [quick-reference.md](quick-reference.md)
- [examples.md](examples.md)
- [cli.md](cli.md)
