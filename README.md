# Pretext Frontend Motion

Pretext Frontend Motion is a multi-CLI installable bundle for text-driven frontend work:
measured UI, routed editorial layout, and kinetic typography with strong visual direction.

It is designed to help assistants generate better frontend style and motion, not just call Pretext APIs mechanically.

## What It Solves

- installable bundles for multiple assistants and CLIs
- AI-facing rules for stronger typography, layout, and motion
- runnable example families instead of abstract placeholder templates
- contribution flow for bugs, forks, and PRs

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

Platform metadata lives in [platforms](platforms). Platform notes for humans live in [docs/platforms](docs/platforms).

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
npm run cli -- versions
npm run cli -- init codex --force
npm run cli -- init claude-code --force
```

Batch install:

```bash
npx pretext-skill init all --force
```

Preferred target names follow the actual CLI or assistant name:
`claude-code`, `gemini-cli`, `github-copilot`, `roo-code`.
Short aliases still work for compatibility, but the docs now prefer the real names.
Inside this repo, prefer `npm run cli -- ...` so the current workspace build is used directly.

## Command Table

| Goal | Command |
| --- | --- |
| Install one target from this repo | `npm run cli -- init codex --force` |
| Install Claude Code from this repo | `npm run cli -- init claude-code --force` |
| Install Gemini CLI from this repo | `npm run cli -- init gemini-cli --force` |
| Install all targets from this repo | `npm run cli -- init all --force` |
| Update installed targets from this repo | `npm run cli -- update --offline --force` |
| Show package versions from this repo | `npm run cli -- versions` |
| Inspect local install state from this repo | `npm run cli -- doctor` |

If a target assistant is already open, restart it after install or update so it reloads the bundle.

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
- [docs/troubleshooting.md](docs/troubleshooting.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)

## Current Constraints

- The installer is usable from the repo today after `npm install && npm run build`.
- The bundle is browser-first.
- Fonts still need deliberate selection; see the installed `references/font-strategy.md`.

## Reporting Issues And Contributing

- Report installer, recognition, style, or example problems through the issue flow in [CONTRIBUTING.md](CONTRIBUTING.md).
- Use the included bug report template under [.github/ISSUE_TEMPLATE](.github/ISSUE_TEMPLATE).
- Fork and open a PR when fixing install paths, bundle content, examples, or docs.
