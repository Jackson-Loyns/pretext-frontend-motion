# Pretext Frontend Motion

Pretext Frontend Motion is a multi-CLI installable bundle for assistants that need to build text-driven frontend work with real measurement logic, stronger visual direction, and motion tied to text geometry.

It is based on the official Pretext demos by Cheng Lou and on the upstream repository:

- Demo site: [https://chenglou.me/pretext/](https://chenglou.me/pretext/)
- Source repository: [https://github.com/chenglou/pretext](https://github.com/chenglou/pretext)
- Official npm package used by runnable examples and starters: `@chenglou/pretext`

## When To Use This Bundle

Use it when the request is about one of these jobs:

- width-tight multiline UI
- routed editorial layout
- kinetic typography on canvas
- measured card heights or accordion panels
- mixed inline layout that should stay in the Pretext measurement path

Do not use it when Pretext is only decorative or when ordinary DOM layout is enough.

## Quick Start

Inside this repository, use the workspace command so the current build is always used:

```bash
npm install
npm run build
npm run cli -- init codex --force
npm run cli -- init claude-code --force
npm run cli -- doctor
```

For a packaged install flow, the public command stays:

```bash
npx pretext-skill init claude-code --force
```

If the target assistant is already open, restart it after install or update.

## Supported Targets

| Target | Install location |
| --- | --- |
| Codex | `~/.codex/skills/pretext-frontend-motion` |
| Claude Code | `~/.claude/skills/pretext-frontend-motion` |
| Cursor | `~/.cursor/skills/pretext-frontend-motion` |
| Windsurf | `~/.windsurf/skills/pretext-frontend-motion` |
| Gemini CLI | `~/.gemini/skills/pretext-frontend-motion` |
| OpenCode | `~/.opencode/skills/pretext-frontend-motion` |
| Continue | `~/.continue/skills/pretext-frontend-motion` |
| GitHub Copilot | `~/.github/prompts/pretext-frontend-motion` |
| Roo Code | `~/.roo/skills/pretext-frontend-motion` |
| Qoder | `~/.qoder/skills/pretext-frontend-motion` |
| Kiro | `~/.kiro/steering/pretext-frontend-motion` |
| Trae | `~/.trae/skills/pretext-frontend-motion` |
| Antigravity | `~/.agents/skills/pretext-frontend-motion` |

Preferred target names follow the real tool name: `claude-code`, `gemini-cli`, `github-copilot`, `roo-code`.

## Official Demo Families

This bundle is organized around the official demo families, not around vague style labels.

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

See [docs/official-demos.md](docs/official-demos.md) for the full mapping.

## Commands

| Goal | Command |
| --- | --- |
| Show versions | `npm run cli -- versions` |
| Install one target | `npm run cli -- init claude-code --force` |
| Install all targets | `npm run cli -- init all --force` |
| Update installed targets | `npm run cli -- update --offline --force` |
| Check install state | `npm run cli -- doctor` |
| Scaffold a starter | `npm run cli -- scaffold --kind predictive-ui --out demo` |

## Read Next

- [docs/quick-reference.md](docs/quick-reference.md)
- [docs/cli.md](docs/cli.md)
- [docs/official-demos.md](docs/official-demos.md)
- [docs/examples.md](docs/examples.md)
- [docs/troubleshooting.md](docs/troubleshooting.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)

## Notes

- This bundle is browser-first.
- Pretext stays in the actual layout path.
- Runnable examples and starters depend directly on the official `@chenglou/pretext` package.
- The installed references include font and design rules because generic fonts and generic motion produce weak results.
