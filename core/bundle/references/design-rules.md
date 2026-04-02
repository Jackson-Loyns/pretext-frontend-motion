# Design Rules

This bundle is for visually strong frontend work, not generic template output.

## What “good” means here

- the page has a visible point of view
- typography is a primary design tool, not an afterthought
- motion changes the idea of the result, not just the polish
- text geometry affects composition, spacing, and behavior

## Hard bans

- generic SaaS hero with centered headline and gradient blob
- default Inter-on-white product page unless the user explicitly wants that
- decorative motion with no relationship to text or layout
- DOM text measurement in the relayout hot path
- pretending Pretext is optional

## Preferred directions

- editorial spreads
- modern posters
- kinetic typography
- asymmetric layouts
- routed headlines
- width-tight UI surfaces

## Motion rules

- tie motion to line position, glyph anchors, routed geometry, or card layout
- keep micro-motion restrained; emphasize one or two strong moves instead
- use reduced-motion fallbacks when practical

## Typography rules

- use a strong display face and a clearly different text face
- avoid system-only identity stacks for the main concept
- do not choose fonts that contradict the visual brief just because they are safe

## If the result looks replaceable, it failed

If the result could be swapped with a generic startup template and lose nothing,
the design is too weak for this bundle.
