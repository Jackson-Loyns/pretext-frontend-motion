# Pretext Frontend Motion

Pretext Frontend Motion is a multi-CLI installable skill bundle built around
[`@chenglou/pretext`](https://github.com/chenglou/pretext) and the official
[Pretext demos](https://chenglou.me/pretext/).

The goal is not to wrap Pretext in vague “cool animation” prompts. The goal is
to turn the upstream library and demo patterns into a usable, installable bundle
for multiple AI coding assistants and CLIs.

## Why This Repo Exists

The upstream project already shows a clear design space:

- Accordion
- Bubbles
- Dynamic Layout
- Variable Typographic ASCII
- Editorial Engine
- Justification Comparison
- Rich Text
- Masonry

This repo packages that design space into:

- a shared content core
- platform templates for multiple assistants
- an installer CLI
- runnable examples for the first six official demo families

## Supported Assistants / CLIs

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
| Antigravity / Generic Agent | `~/.agents/skills/pretext-frontend-motion` |

Platform metadata lives in [platforms](platforms).

## Official Demo Coverage

| Official demo | Status here | Primary APIs |
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

## Quick Install

Local repo usage:

```bash
npm install
npm run build
npx pretext-skill versions
npx pretext-skill init --ai codex --offline --force
```

Batch install:

```bash
npx pretext-skill init --ai all --offline --force
```

## Command Table

| Goal | Command |
| --- | --- |
| Install one target | `npx pretext-skill init --ai codex --offline --force` |
| Install all targets | `npx pretext-skill init --ai all --offline --force` |
| Update installed targets | `npx pretext-skill update --offline --force` |
| Show package versions | `npx pretext-skill versions` |
| Inspect local install state | `npx pretext-skill doctor` |

## Repo Layout

```text
core/          shared installable content
platforms/     platform install metadata
packages/cli/  Node.js + TypeScript installer CLI
docs/          user-facing documentation
```

## Documentation

- [docs/quick-reference.md](docs/quick-reference.md)
- [docs/cli.md](docs/cli.md)
- [docs/official-demos.md](docs/official-demos.md)
- [docs/examples.md](docs/examples.md)
- [docs/platforms](docs/platforms)
- [references/official-notes.md](references/official-notes.md)

## Current Constraints

- The installer is publish-ready in structure, but this repo is not automatically published to npm from here.
- Local usage works today after `npm install && npm run build`.
- The bundle is browser-first and follows upstream limits around `system-ui`, DOM measurement, and server-side claims.
