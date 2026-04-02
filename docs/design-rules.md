# Design Rules

## Visual Direction

This skill is not for average-looking UI.

Use these defaults unless the user asks for a different visual language:

| Area | Default rule |
| --- | --- |
| Typography | Use a distinctive display face and a readable body face. Avoid generic system-only stacks as the whole identity. |
| Color | Build a focused palette with atmosphere. Avoid default purple gradients and flat white SaaS canvases. |
| Layout | Use composition, rhythm, and negative space. Let text geometry drive structure. |
| Motion | Use a few meaningful motions tied to text layout, not many decorative micro-animations. |

## Hard Constraints

- Do not produce a generic dashboard unless the user explicitly wants one.
- Do not use motion that could be deleted without changing the idea of the demo.
- Do not rely on a bland hero section with stock gradients and centered text.
- Do not use `system-ui` as the main measured typeface when text accuracy matters.
- Do not make Pretext optional in the implementation.

## Stronger Patterns

Prefer these moves:

- shape-aware headlines
- tight multiline text boxes
- asymmetrical editorial layouts
- canvas text with spatial motion
- typography-led composition
- line-aware interactions

## Common Anti-Patterns

| Anti-pattern | Why it weakens the result | Better alternative |
| --- | --- | --- |
| Generic SaaS card grid | Feels unrelated to Pretext | Use text-driven card heights or obstacle-aware flow |
| Decorative fade-in everywhere | Motion has no idea | Animate text geometry, glyph anchors, or line positions |
| Default Inter + white background + blue CTA | Loses identity fast | Build a clear type and color system |
| Installing Pretext but measuring with DOM | Misses the library's core value | Use `prepare` and `layout` in the real sizing path |

## Motion Guidelines

- Entrance motion: `180ms` to `420ms`
- Small reactive motion: `80ms` to `160ms`
- Use transform and opacity, or animate canvas draw state.
- Respect `prefers-reduced-motion` where practical.

## Responsive Expectations

- Check narrow mobile widths, not just desktop.
- Preserve hierarchy on small screens.
- Avoid dense text blocks with weak margins.
- If the desktop layout is editorial, the mobile version should become a deliberate single-column composition, not a broken collapse.
