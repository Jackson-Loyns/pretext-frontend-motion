# Pretext Frontend Motion

`Pretext Frontend Motion` is a Codex skill package for building frontend demos where text layout is the engine, not an afterthought.

It is built around [`@chenglou/pretext`](https://github.com/chenglou/pretext): a browser-side text measurement and line layout library that avoids DOM reflow in the hot path. This repo turns that library into a usable skill with strong defaults, runnable examples, CLI tooling, and author-backed guardrails.

## What This Skill Covers

| Capability | What it helps generate |
| --- | --- |
| Predictive text sizing | Zero-CLS accordions, chat bubbles, text cards, masonry grids |
| Editorial routing | Text around logos, circles, pull quotes, multi-column stories |
| Kinetic typography | Canvas text motion, scroll-based morphs, ASCII experiments, particle text |
| Strong visual direction | Better type, stronger composition, more intentional motion |
| Starter-first workflow | Copy a working starter, then adapt it instead of inventing boilerplate each time |

## Official Basis

This repo follows the original `pretext` project rather than inventing its own rules.

- `prepare()` is the one-time work and `layout()` is the cheap hot path. Resize should usually rerun `layout()`, not `prepare()`.
- The core value is avoiding DOM reads like `getBoundingClientRect()` and `offsetHeight` in the relayout path.
- `layoutNextLine()`, `walkLineRanges()`, and `layoutWithLines()` are the right tools when text must route around geometry or drive Canvas rendering.
- `system-ui` is called out upstream as unsafe for precision-critical layout on macOS.
- The project is browser-first today. Server-side is discussed upstream, but not something this skill should overpromise by default.

Read the condensed source-backed notes in [references/official-notes.md](references/official-notes.md).

Primary upstream sources:
- [pretext README](https://github.com/chenglou/pretext/blob/main/README.md)
- [pretext RESEARCH.md](https://github.com/chenglou/pretext/blob/main/RESEARCH.md)
- [pretext STATUS.md](https://github.com/chenglou/pretext/blob/main/STATUS.md)

## Fast Start

Use the unified CLI:

```bash
python3 scripts/pretext_cli.py list-kinds
python3 scripts/pretext_cli.py list-presets --kind predictive-ui
python3 scripts/pretext_cli.py scaffold --kind predictive-ui --preset signal-bubbles --title "Signal Bubbles" --out output/signal-bubbles
cd output/signal-bubbles
npm install
npm run dev
```

## CLI

| Goal | Command |
| --- | --- |
| List demo modes | `python3 scripts/pretext_cli.py list-kinds` |
| List presets for one mode | `python3 scripts/pretext_cli.py list-presets --kind editorial-routing` |
| Scaffold a runnable demo | `python3 scripts/pretext_cli.py scaffold --kind kinetic-typography --preset pointer-poster --title "Vector Choir" --out output/vector-choir` |
| Validate this skill repo | `python3 scripts/pretext_cli.py validate .` |
| Install into Codex via symlink | `python3 scripts/pretext_cli.py install-symlink` |
| Update from git remote | `python3 scripts/pretext_cli.py update origin main` |

For the full command guide, see [docs/cli.md](/Users/c14h14n3/Desktop/pretext/docs/cli.md).

## Choose a Mode

| Mode | Use it when | Primary APIs |
| --- | --- | --- |
| `predictive-ui` | You need stable text height before paint | `prepare`, `layout` |
| `editorial-routing` | Text must bend around shapes or hand off across changing widths | `prepareWithSegments`, `layoutNextLine`, `walkLineRanges` |
| `kinetic-typography` | Motion should derive from measured line or glyph structure | `prepareWithSegments`, `layoutWithLines` |

## Ready-Made Presets

| Mode | Presets |
| --- | --- |
| `predictive-ui` | `signal-bubbles`, `tight-masonry`, `multilingual-feed` |
| `editorial-routing` | `orbital-essay`, `pull-quote-spread`, `routed-manifesto` |
| `kinetic-typography` | `pulse-type`, `ribbon-ascii`, `pointer-poster` |

## Example Requests

- Build a zero-CLS messaging wall where mixed-language bubbles know their height before render.
- Create an editorial landing page where the headline and body copy reroute around a floating emblem.
- Make a motion poster where the pointer disturbs measured text and the lines settle back into place.
- Build a compact masonry bulletin where card height is driven by measured copy rather than DOM reflow.

## Documentation Map

- [docs/quick-reference.md](docs/quick-reference.md): when to use this skill, which mode to pick, and what commands to run
- [docs/cli.md](docs/cli.md): CLI usage for this repo and the upstream `pretext` project
- [docs/guide.md](docs/guide.md): workflow and delivery rules
- [docs/design-rules.md](docs/design-rules.md): visual and motion constraints
- [docs/examples.md](docs/examples.md): prompt-to-output examples and scaffold recipes
- [docs/install.md](docs/install.md): install and local validation
- [docs/update.md](docs/update.md): sync and update strategy
- [references/official-notes.md](references/official-notes.md): direct notes from the original author repository
- [references/capabilities.md](references/capabilities.md): API boundaries and practical limits
- [references/patterns.md](references/patterns.md): implementation patterns
- [references/design-rules.md](references/design-rules.md): condensed AI-facing design rules
- [references/react-migration.md](references/react-migration.md): React porting guidance

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
