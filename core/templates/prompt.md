# {{title}}

Use this workflow when the request maps to one of the official Pretext demo families:
Accordion, Bubbles, Dynamic Layout, Variable Typographic ASCII, Editorial Engine,
Justification Comparison, Rich Text, or Masonry.

Typical trigger patterns:

- measure text height without DOM reflow
- auto-fit text into a fixed number of lines
- route text around an obstacle
- build shrink-wrap bubbles
- create algorithmic typography motion

Required constraints:

- Keep Pretext in the real layout path.
- Do not use DOM text measurement in the resize or interaction hot path.
- Treat `prepare()` as one-time work and `layout()` as the cheap relayout path.
- Use named fonts for precision-critical layout, not `system-ui`.

Bundled references:

- `references/official-notes.md`
- `references/demo-family-map.md`
- `references/prompt-recipes.md`
- `references/design-rules.md`
- `references/font-strategy.md`
- `references/style-profiles.md`
- `references/integration-gotchas.md`
- `examples/README.md`
- `examples/`
- `integrations/README.md`
- `integrations/`
- `blueprints/`

Recommended workflow:

1. Match the request to an official demo family.
2. Choose the matching style profile before implementation.
3. Start from the corresponding bundled example or blueprint.
4. Keep the visual direction bold, intentional, and non-generic.
5. Explain how Pretext is being used in the final result.
