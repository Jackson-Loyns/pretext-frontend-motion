# {{title}}

Use this workflow when the request maps to one of the official Pretext demo families:
Accordion, Bubbles, Dynamic Layout, Variable Typographic ASCII, Editorial Engine,
Justification Comparison, Rich Text, or Masonry.

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
- `examples/README.md`
- `examples/`
- `blueprints/`

Recommended workflow:

1. Match the request to an official demo family.
2. Start from the corresponding bundled example or blueprint.
3. Keep the visual direction bold, intentional, and non-generic.
4. Explain how Pretext is being used in the final result.
