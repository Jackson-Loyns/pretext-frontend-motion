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
- technical lab interfaces on near-white backgrounds
- modern posters
- kinetic typography
- asymmetric layouts
- routed headlines
- width-tight UI surfaces

## Style profiles

Choose one profile explicitly instead of blending everything into one default look.

### `editorial-paper`

- asymmetrical spread
- warm paper or muted neutral background
- serif-led hierarchy
- literary, arts, magazine, manifesto, essay

### `technical-lab-white`

- near-white background
- sparse technical labels
- lighter, crisper sans-serif typography
- algorithmic field behavior, measured glyph clouds, subtle signal-map motion
- appropriate for references similar to `algo.qq.com/#intro`

### `kinetic-dark-poster`

- dark field
- stronger contrast and glow
- bold display typography
- particle, glyph, or line-anchor driven motion

### `compact-measured-ui`

- compact shells
- tighter spacing
- utility-first hierarchy
- accordions, cards, bubbles, structured data surfaces

## Motion rules

- tie motion to line position, glyph anchors, routed geometry, or card layout
- keep micro-motion restrained; emphasize one or two strong moves instead
- use reduced-motion fallbacks when practical
- for `technical-lab-white`, prefer aggregation, drift, dispersion, and field response over heavy blobs or parallax

## Typography rules

- use a strong display face and a clearly different text face
- avoid system-only identity stacks for the main concept
- do not choose fonts that contradict the visual brief just because they are safe
- for `technical-lab-white`, keep weight and contrast restrained; the density pattern should carry the drama

## If the result looks replaceable, it failed

If the result could be swapped with a generic startup template and lose nothing,
the design is too weak for this bundle.
