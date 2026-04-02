# Pretext Frontend Motion

`Pretext Frontend Motion` is a skill package for building frontend demos where text layout is the engine, not an afterthought.

It is designed around [`@chenglou/pretext`](https://github.com/chenglou/pretext): a browser-side text measurement and line layout library that avoids DOM reflow in the hot path. The package focuses on visually strong demos, text-driven interaction, and layout systems that would be awkward or unstable with ordinary DOM measurement loops.

## What This Skill Does

| Capability | What it helps generate |
| --- | --- |
| Predictive text sizing | Zero-CLS accordions, chat bubbles, text cards, masonry grids |
| Editorial routing | Text around logos, circles, pull quotes, multi-column stories |
| Kinetic typography | Canvas text motion, scroll-based morphs, ASCII experiments, particle text |
| Strong visual direction | Better type, stronger composition, more intentional motion |
| Starter-first workflow | Copy a working starter, then adapt it instead of inventing boilerplate each time |

## Why Use It

- It keeps `Pretext` in the real measurement path instead of treating it as a decorative dependency.
- It pushes output away from generic landing-page templates.
- It gives both AI-facing execution rules and human-facing guidance.
- It starts from `Vanilla TypeScript + Canvas` because that matches the strongest public Pretext demos.

## Install

Clone or copy this skill into your Codex skills directory:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R /path/to/pretext "${CODEX_HOME:-$HOME/.codex}/skills/pretext-frontend-motion"
```

Restart Codex after installation so the skill can be discovered.

For a step-by-step install and validation flow, see [`docs/install.md`](docs/install.md).
For update strategies, including symlink-based local development and git-based upstream sync, see [`docs/update.md`](docs/update.md).

## Quick Start

Use the scaffold script to create a starter:

```bash
python3 scripts/new_pretext_demo.py \
  --kind predictive-ui \
  --title "Signal Bubbles" \
  --out output/signal-bubbles
```

Then run the demo:

```bash
cd output/signal-bubbles
npm install
npm run dev
```

## Modes

| Mode | Best for | Start here |
| --- | --- | --- |
| `predictive-ui` | Stable text UI and zero-CLS interactions | [`docs/guide.md`](docs/guide.md) |
| `editorial-routing` | Obstacle-aware typography and multi-column layout | [`docs/guide.md`](docs/guide.md) |
| `kinetic-typography` | Text as motion, texture, and geometry | [`docs/guide.md`](docs/guide.md) |

## Example Prompts

- Build a typography-heavy landing page where the hero text routes around floating shapes and reflows cleanly on resize.
- Create a zero-CLS messaging demo with multilingual text bubbles and width-tight layouts.
- Make a canvas-based ASCII poster that reacts to pointer movement and uses Pretext to place glyphs precisely.
- Build an editorial spread with a multi-column article, a pull quote, and obstacle-aware headline placement.

## Documentation

- [`docs/install.md`](docs/install.md): install, validate, and smoke-test the skill
- [`docs/update.md`](docs/update.md): keep the installed skill synced with this repo or an upstream repo
- [`docs/guide.md`](docs/guide.md): workflow and mode selection
- [`docs/design-rules.md`](docs/design-rules.md): visual and motion constraints
- [`docs/examples.md`](docs/examples.md): prompt-to-output examples
- [`references/capabilities.md`](references/capabilities.md): core API and limitations
- [`references/patterns.md`](references/patterns.md): implementation patterns
- [`references/design-rules.md`](references/design-rules.md): condensed AI-facing design rules
- [`references/react-migration.md`](references/react-migration.md): porting guidance for React projects

## Directory Layout

```text
pretext-frontend-motion/
├── SKILL.md
├── README.md
├── agents/
├── evals/
├── docs/
├── references/
├── scripts/
└── assets/
```

## Notes

- This package targets browser demos first.
- Use named fonts for measurement-critical typography.
- Do not sell SSR accuracy, DOM-free rich text editing, or full CSS text feature parity unless you have implemented and verified those behaviors yourself.
- Run `python3 scripts/validate_skill.py .` before installing or sharing the skill.
