# Guide

## Product Shape

This repo has three layers:

- `core/` for shared installable content
- `platforms/` for assistant-specific install metadata
- `packages/cli/` for the installer

The root README and docs explain the product to humans. The installed bundle under each target is the AI-facing runtime content.

## How To Work From A Request

1. Match the request to an official demo family.
2. Choose the bundled runnable example or blueprint for that family.
3. Keep the implementation inside the correct Pretext API lane.
4. Keep the visual result intentional rather than generic.
5. Explain where Pretext is doing the real layout work.

## API Lanes

| Demo family | Correct lane |
| --- | --- |
| Accordion / Bubbles / Masonry | `prepare` + `layout` |
| Dynamic Layout / Editorial Engine | `prepareWithSegments` + `layoutNextLine` |
| Variable Typographic ASCII | `prepareWithSegments` + `layoutWithLines` |
| Justification Comparison | `walkLineRanges` |
| Rich Text | `prepareWithSegments` + richer inline segmentation |

## Keep / Avoid

Keep:

- cached prepared text
- browser-first delivery
- named fonts
- visible relationship between text geometry and motion

Avoid:

- DOM text measurement in the relayout hot path
- vague “text motion” prompts with no official demo family
- generic SaaS templates with Pretext added as decoration
