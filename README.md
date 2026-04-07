# Pretext Frontend Motion

Pretext Frontend Motion is a multi-CLI skill bundle and npm CLI for assistants that need measured typography, routed text layout, and motion driven by real Pretext geometry instead of DOM text reads.

It is built on the official work by Cheng Lou:

- Demo site: [https://chenglou.me/pretext/](https://chenglou.me/pretext/)
- Source repository: [https://github.com/chenglou/pretext](https://github.com/chenglou/pretext)
- Runtime package used by runnable examples and starters: `@chenglou/pretext`
- Installer package for this project: [`pretext-skill`](https://www.npmjs.com/package/pretext-skill)

## Project

This repository is not a wrapper around the upstream package and it is not only a prompt pack.

It combines three things in one place:

- a published installer CLI for multiple assistants
- runnable Pretext examples and starters
- skill content that pushes assistants toward stronger frontend output

The practical goal is simple: when an assistant is asked for measured text layout or typography-driven motion, it should produce something structurally correct and visually intentional instead of a generic landing page.

## Real Project Integration

The bundle now includes real TypeScript integration examples, not only static demos:

- [Vanilla bubbles](/Users/c14h14n3/Desktop/pretext/integrations/vanilla-bubbles)
- [React bubbles](/Users/c14h14n3/Desktop/pretext/integrations/react-bubbles)
- [Vue bubbles](/Users/c14h14n3/Desktop/pretext/integrations/vue-bubbles)
- [Svelte bubbles](/Users/c14h14n3/Desktop/pretext/integrations/svelte-bubbles)

These examples all solve the same problem so the differences stay architectural:

- prepare text once after fonts are ready
- relayout from width changes
- keep DOM text reads out of the hot path
- show how Pretext actually enters a real framework lifecycle

## Install

### Global package

Use this when you want a stable local command:

```bash
npm install -g pretext-skill@0.3.1
pretext-skill versions
pretext-skill init codex --force
pretext-skill init claude-code --force
pretext-skill doctor
```

### One-off package use

Use this when you do not want a global install:

```bash
npx pretext-skill@0.3.1 versions
npx pretext-skill@0.3.1 init codex --force
npx pretext-skill@0.3.1 init claude-code --force
npx pretext-skill@0.3.1 init cursor --force
npx pretext-skill@0.3.1 doctor
```

### Local repository development

Use this only when you are working inside this repository:

```bash
npm install
npm run build
npm run cli -- versions
npm run cli -- init codex --force
npm run cli -- doctor
```

## Supported Platforms

This bundle is installable for these assistants and CLIs:

- Codex
- Claude Code
- Cursor
- Windsurf
- Gemini CLI
- OpenCode
- Continue
- GitHub Copilot
- Roo Code
- Qoder
- Kiro
- Trae
- Antigravity

## Supported Assistants And CLIs

| Target | Install command | Install location |
| --- | --- | --- |
| Codex | `npx pretext-skill@0.3.1 init codex --force` | `~/.codex/skills/pretext-frontend-motion` |
| Claude Code | `npx pretext-skill@0.3.1 init claude-code --force` | `~/.claude/skills/pretext-frontend-motion` |
| Cursor | `npx pretext-skill@0.3.1 init cursor --force` | `~/.cursor/skills/pretext-frontend-motion` |
| Windsurf | `npx pretext-skill@0.3.1 init windsurf --force` | `~/.windsurf/skills/pretext-frontend-motion` |
| Gemini CLI | `npx pretext-skill@0.3.1 init gemini-cli --force` | `~/.gemini/skills/pretext-frontend-motion` |
| OpenCode | `npx pretext-skill@0.3.1 init opencode --force` | `~/.opencode/skills/pretext-frontend-motion` |
| Continue | `npx pretext-skill@0.3.1 init continue --force` | `~/.continue/skills/pretext-frontend-motion` |
| GitHub Copilot | `npx pretext-skill@0.3.1 init github-copilot --force` | `~/.github/prompts/pretext-frontend-motion` |
| Roo Code | `npx pretext-skill@0.3.1 init roo-code --force` | `~/.roo/skills/pretext-frontend-motion` |
| Qoder | `npx pretext-skill@0.3.1 init qoder --force` | `~/.qoder/skills/pretext-frontend-motion` |
| Kiro | `npx pretext-skill@0.3.1 init kiro --force` | `~/.kiro/steering/pretext-frontend-motion` |
| Trae | `npx pretext-skill@0.3.1 init trae --force` | `~/.trae/skills/pretext-frontend-motion` |
| Antigravity | `npx pretext-skill@0.3.1 init antigravity --force` | `~/.agents/skills/pretext-frontend-motion` |

Install every supported target with:

```bash
npm install -g pretext-skill@0.3.1
pretext-skill init all --force
```

or:

```bash
npx pretext-skill@0.3.1 init all --force
```

## When To Use It

This bundle is for requests where text measurement or text geometry is the actual problem.

Strong request shapes:

- "measure text height without DOM reflow"
- "build a shrink-wrap multilingual bubble layout"
- "fit a headline into a fixed number of lines"
- "route body text around a moving circle"
- "make a sparse algorithmic typography intro scene"
- "compare justification or line-breaking strategies"
- "lay out chips, links, and inline text in one measured flow"

Weak request shapes:

- "make a random landing page"
- "add a cool animation"
- "use pretext somewhere if it helps"

If ordinary DOM flow is already enough, this bundle is the wrong tool.

## Visual System

The bundle should not force every task into one visual language. The current profiles are:

| Profile | Best for | Direction |
| --- | --- | --- |
| `editorial-paper` | spreads, essays, routed landing pages | warm paper, serif hierarchy, asymmetry |
| `technical-lab-white` | algorithmic hero fields, sparse technical layouts | near-white field, light sans, signal-map motion |
| `kinetic-dark-poster` | immersive motion pieces, bolder canvas demos | dark field, high contrast, particle or glyph motion |
| `compact-measured-ui` | bubbles, accordions, cards, utility surfaces | tighter spacing, crisp information density |

These are not decorative labels. They change the prompt recipes, font choices, and composition guidance used by the installed skill.

See [docs/examples.md](docs/examples.md) and [docs/quick-reference.md](docs/quick-reference.md) for matching prompts and presets.

## Request Samples

These are the kinds of requests this bundle is designed to handle well.

### Technical Lab White

- "Build a sparse algorithm field with a large central measured word and drifting micro-labels across a near-white canvas."
- "Create a computational typography intro with a restrained sans-serif system, light violet and graphite accents, and motion driven by text aggregation."

### Editorial Paper

- "Design a routed editorial landing page on a warm paper field where the headline and body wrap around a circular annotation."
- "Create a manifesto spread with serif-led hierarchy, a pull quote that changes the layout, and measured body text instead of normal DOM flow."

### Kinetic Dark Poster

- "Make a dark canvas poster where Pretext line anchors drive a bright particle wordmark with drifting text fragments."
- "Create a high-contrast kinetic typography scene that feels cinematic, not like a dashboard hero."

### Compact Measured UI

- "Build a multilingual message wall where bubble sizes are predicted before paint and the visual language stays dense and deliberate."
- "Create a measured note grid with mixed text lengths, stable packing, and a compact utility-surface rhythm."

## Demo Coverage

| Demo family | Status in this repo | Primary APIs |
| --- | --- | --- |
| Accordion | Runnable example | `prepare`, `layout` |
| Bubbles | Runnable example | `prepare`, `layout` |
| Dynamic Layout | Runnable example | `prepareWithSegments`, `layoutNextLine` |
| Variable Typographic ASCII | Runnable example | `prepareWithSegments`, `layoutWithLines` |
| Editorial Engine | Runnable example | `prepareWithSegments`, `layoutNextLine`, `walkLineRanges` |
| Justification Comparison | Blueprint + prompt recipe | `walkLineRanges` |
| Rich Text | Blueprint + prompt recipe | `prepareWithSegments`, `layoutWithLines` |
| Masonry | Runnable example | `prepare`, `layout` |

See [docs/official-demos.md](docs/official-demos.md).

## Command Reference

| Goal | Local repo command | Published package command |
| --- | --- | --- |
| Show versions | `npm run cli -- versions` | `npx pretext-skill@0.3.1 versions` |
| Install one target | `npm run cli -- init claude-code --force` | `npx pretext-skill@0.3.1 init claude-code --force` |
| Install all targets | `npm run cli -- init all --force` | `npx pretext-skill@0.3.1 init all --force` |
| Update installed targets | `npm run cli -- update --offline --force` | `npx pretext-skill@0.3.1 update --offline --force` |
| Check install state | `npm run cli -- doctor` | `npx pretext-skill@0.3.1 doctor` |
| Scaffold a starter | `npm run cli -- scaffold --kind predictive-ui --out demo` | `npx pretext-skill@0.3.1 scaffold --kind predictive-ui --out demo` |
| List presets | `npm run cli -- list-presets --kind kinetic-typography` | `npx pretext-skill@0.3.1 list-presets --kind kinetic-typography` |
| Validate the repo | `npm run cli -- validate .` | `npx pretext-skill@0.3.1 validate .` |
| Build npm tarball | `npm run pack` | not needed |

## How The Bundle Works

1. Install the bundle into your assistant or CLI.
2. Ask for a UI or motion task that clearly maps to a Pretext family and visual profile.
3. The installed skill routes the request toward the right demo family, API path, style profile, and prompt recipe.
4. The runnable examples and starters provide working structure instead of generic layout boilerplate.

## Examples And Starters

Runnable examples and generated starters:

- depend directly on the official `@chenglou/pretext` package
- use the package's own exported type definitions
- run as static ESM packages with `npm install` and `npm start`
- are mapped to style profiles so the assistant can choose a direction instead of defaulting to one look

## Issues And Feedback

Open an issue when you find:

- install failures
- target-specific path problems
- skill recognition failures
- generic or off-style visual output
- example runtime failures
- documentation drift

See [docs/troubleshooting.md](docs/troubleshooting.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## Contributing

Fork the repository, create a branch from `main`, make the change, run local checks, and open a pull request with validation notes.

The recommended local checks are:

```bash
npm run cli -- validate .
npm run build
npm test
```

## Documentation Map

Start here:

- [docs/install.md](docs/install.md)
- [docs/usage.md](docs/usage.md)
- [docs/cli.md](docs/cli.md)
- [docs/quick-reference.md](docs/quick-reference.md)
- [docs/official-demos.md](docs/official-demos.md)
- [docs/examples.md](docs/examples.md)
- [docs/troubleshooting.md](docs/troubleshooting.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [integrations/README.md](integrations/README.md)
- [references/integration-gotchas.md](references/integration-gotchas.md)
