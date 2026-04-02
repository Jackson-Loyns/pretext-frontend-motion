# Pretext Frontend Motion

Pretext Frontend Motion is a multi-CLI installable skill bundle for assistants that need strong typography, text-driven layout, and motion tied to real Pretext measurement instead of DOM text reads.

It is built around the official work by Cheng Lou:

- Demo site: [https://chenglou.me/pretext/](https://chenglou.me/pretext/)
- Source repository: [https://github.com/chenglou/pretext](https://github.com/chenglou/pretext)
- Official npm package used by runnable examples and starters: `@chenglou/pretext`

## Installation

### Local repository workflow

Use this when you are developing or testing from this repo:

```bash
npm install
npm run build
npm run cli -- versions
npm run cli -- init codex --force
npm run cli -- init claude-code --force
npm run cli -- init cursor --force
npm run cli -- init gemini-cli --force
npm run cli -- doctor
```

### Packaged workflow

The CLI is packable as an npm package from this repo:

```bash
npm install
npm run build
npm run pack
```

That produces a tarball for `packages/cli`. The package is ready for `npx` style usage after publish, but this repo currently verifies packaging locally through `npm pack`, not a public npm release.

## Supported Platforms

| Platform | Command example | Install location |
| --- | --- | --- |
| Codex | `npm run cli -- init codex --force` | `~/.codex/skills/pretext-frontend-motion` |
| Claude Code | `npm run cli -- init claude-code --force` | `~/.claude/skills/pretext-frontend-motion` |
| Cursor | `npm run cli -- init cursor --force` | `~/.cursor/skills/pretext-frontend-motion` |
| Windsurf | `npm run cli -- init windsurf --force` | `~/.windsurf/skills/pretext-frontend-motion` |
| Gemini CLI | `npm run cli -- init gemini-cli --force` | `~/.gemini/skills/pretext-frontend-motion` |
| OpenCode | `npm run cli -- init opencode --force` | `~/.opencode/skills/pretext-frontend-motion` |
| Continue | `npm run cli -- init continue --force` | `~/.continue/skills/pretext-frontend-motion` |
| GitHub Copilot | `npm run cli -- init github-copilot --force` | `~/.github/prompts/pretext-frontend-motion` |
| Roo Code | `npm run cli -- init roo-code --force` | `~/.roo/skills/pretext-frontend-motion` |
| Qoder | `npm run cli -- init qoder --force` | `~/.qoder/skills/pretext-frontend-motion` |
| Kiro | `npm run cli -- init kiro --force` | `~/.kiro/steering/pretext-frontend-motion` |
| Trae | `npm run cli -- init trae --force` | `~/.trae/skills/pretext-frontend-motion` |
| Antigravity | `npm run cli -- init antigravity --force` | `~/.agents/skills/pretext-frontend-motion` |

Install every supported target with:

```bash
npm run cli -- init all --force
```

## What The Skill Is For

Use this bundle when the request needs one of these:

- width-tight multiline UI
- routed editorial or obstacle-aware layout
- kinetic typography on canvas
- predicted text height for accordions, cards, or bubbles
- mixed inline flows that should stay in the Pretext measurement path

Do not use it when Pretext is decorative or when ordinary DOM layout already solves the problem.

## Style Profiles

This bundle should not collapse into one visual direction. The current style system supports multiple profiles:

- `editorial-paper`: asymmetrical spread, serif-led hierarchy, warm paper tones
- `technical-lab-white`: near-white field, sparse labels, algorithmic motion, light technical typography
- `kinetic-dark-poster`: dark canvas, stronger contrast, bold display type, particle or glyph motion
- `compact-measured-ui`: tighter utility surfaces such as bubbles, cards, and accordions

The bundled references decide which profile fits the prompt. They should not force everything into the editorial-paper path.

## Official Demo Families

| Demo family | Status here | Primary APIs |
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

## Main Commands

| Goal | Command |
| --- | --- |
| Show versions | `npm run cli -- versions` |
| Install one target | `npm run cli -- init claude-code --force` |
| Install all targets | `npm run cli -- init all --force` |
| Update installed targets | `npm run cli -- update --offline --force` |
| Check install state | `npm run cli -- doctor` |
| Scaffold a starter | `npm run cli -- scaffold --kind predictive-ui --out demo` |
| Validate the repo | `npm run cli -- validate .` |
| Create npm tarball | `npm run pack` |

## Examples

Runnable examples and generated starters:

- depend directly on the official `@chenglou/pretext` package
- use the package's own exported type definitions
- run with `npm install` and `npm start`

## Documentation

- [docs/install.md](docs/install.md)
- [docs/cli.md](docs/cli.md)
- [docs/quick-reference.md](docs/quick-reference.md)
- [docs/official-demos.md](docs/official-demos.md)
- [docs/examples.md](docs/examples.md)
- [docs/troubleshooting.md](docs/troubleshooting.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
