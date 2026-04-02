# Justification Comparison Blueprint

Use this when the user wants to compare paragraph layout strategies rather than ship a single glossy demo.

## Goal

Show multiple paragraph layout strategies side by side:

- CSS justified text
- greedy line breaking / hyphenation
- a more balanced algorithm such as Knuth-Plass

## Where Pretext fits

- probe width choices with `walkLineRanges()`
- inspect line counts and paragraph height at candidate widths
- support comparison UI without DOM text measurement loops

## Delivery shape

- side-by-side comparison view
- visible explanation of rivers, spacing, and tradeoffs
- clear statement that Pretext is not pretending to be a full typography engine
