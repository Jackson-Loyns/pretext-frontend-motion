# Capabilities

## Core Pretext APIs

| API | Use it for | Notes |
| --- | --- | --- |
| `prepare(text, font, options?)` | One-time text analysis and measurement | Reuse the returned handle |
| `layout(prepared, maxWidth, lineHeight)` | Fast multiline height and line count | Hot-path safe |
| `prepareWithSegments(text, font, options?)` | Richer layout workflows | Needed for manual line routing |
| `layoutWithLines(prepared, maxWidth, lineHeight)` | Materialized lines and widths | Good for canvas and custom rendering |
| `walkLineRanges(prepared, maxWidth, onLine)` | Line geometry without building strings | Useful for width search and aggregate layout |
| `layoutNextLine(prepared, start, maxWidth)` | One line at a time with changing widths | Useful for obstacles and multi-column handoff |

## What Pretext Is Good At

- Measuring multiline text without DOM layout reads in the hot path
- Predicting text height before render
- Routing lines manually for canvas, SVG, and custom layout systems
- Handling mixed scripts, emoji, and many international text cases
- Enabling shrink-wrapped and obstacle-aware text layout

## What It Is Not

- Not a general animation library
- Not a complete font rendering engine
- Not a drop-in replacement for every CSS text feature
- Not a promise of exact server-side parity

## Practical Limits

- Prefer named fonts. `system-ui` is unsafe for precision-critical layout on macOS.
- Do not assume `letter-spacing` support unless you add and verify it.
- Treat bidi edge cases and some browser-specific quirks as active precision boundaries.
- The library is strongest in browser-driven text measurement workflows.

## Default Technical Shape

For this skill, default to:

- browser runtime
- Vanilla TypeScript
- Canvas for expressive rendering
- CSS only for shell layout and atmosphere

Use React only when the user explicitly wants an existing React project integration.
