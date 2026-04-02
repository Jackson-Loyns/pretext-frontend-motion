# Quick Reference

## When To Use This Skill

Use this skill when the request changes how text is measured, laid out, or animated.

### Must Use

- zero-CLS text UI
- shrink-wrapped message bubbles
- obstacle-aware text flow
- multi-column line handoff
- canvas typography driven by measured lines
- motion systems that depend on text geometry

### Skip

- generic CRUD screens where text measurement is not the point
- purely decorative animation unrelated to layout
- backend or infrastructure work

## Pick a Mode Fast

| If the core problem is... | Choose | Start with |
| --- | --- | --- |
| text height before paint | `predictive-ui` | `signal-bubbles` |
| lines reacting to shapes or changing slots | `editorial-routing` | `orbital-essay` |
| motion derived from measured text structure | `kinetic-typography` | `pulse-type` |

## Command Quick Start

```bash
python3 scripts/pretext_cli.py list-kinds
python3 scripts/pretext_cli.py list-presets --kind editorial-routing
python3 scripts/pretext_cli.py scaffold --kind editorial-routing --preset pull-quote-spread --title "Drift Index" --out output/drift-index
python3 scripts/pretext_cli.py validate .
```

## Author-Backed Rules

| Rule | Why it matters |
| --- | --- |
| `prepare()` is one-time work | Re-running it on resize defeats precomputation |
| `layout()` is the relayout hot path | Keep relayout arithmetic-only and cheap |
| Avoid DOM reads in the hot path | That is the core value proposition of Pretext |
| Use named fonts | Upstream explicitly flags `system-ui` as unsafe on macOS |
| Browser-first by default | Server-side is not the safe default story yet |

Read [../references/official-notes.md](../references/official-notes.md) before making strong claims.

## Prompt Shape

Good prompts state:

1. what is being built
2. what it should look like
3. how text should behave

Example:

```text
Build a compact editorial landing page for a research product.
Use a severe serif display face, warm paper colors, and one moving circular obstacle.
The hero and deck should reroute around the obstacle and stay stable on resize.
Use Pretext in the real layout path.
```
