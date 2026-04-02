# Font Strategy

Pretext can measure named fonts accurately when they actually exist in the target environment.

## Practical rule

Prefer one of these strategies:

1. load web fonts explicitly
2. use named local fonts with clear fallbacks
3. choose a design direction that still works with the fallback stack

## Safe guidance for AI-generated demos

- when the user asks for a specific aesthetic, pick fonts that support that mood
- when using a web demo, it is acceptable to import a suitable font from Google Fonts
- if a font may not exist locally, pair it with a deliberate fallback stack instead of collapsing to `system-ui`

## Suggested pairings by mood

| Mood | Display | Text |
| --- | --- | --- |
| Editorial / literary | Cormorant Garamond, Iowan Old Style, Playfair Display | Source Serif 4, Georgia |
| Modern premium | Sora, Manrope, Neue Montreal-like alternatives | Inter, Source Sans 3 |
| Experimental poster | Space Grotesk, Archivo, Bebas Neue | IBM Plex Sans, IBM Plex Mono |
| Technical / ASCII / code-poetry | IBM Plex Mono, Geist Mono | Inter, IBM Plex Sans |

## Constraints

- avoid `system-ui` for precision-critical measured text on macOS
- keep the measured font declaration synchronized with the rendered font declaration
- if the font changes, re-run `prepare()` for that text
