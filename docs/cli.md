# CLI Guide

## Overview

The installer CLI lives in `packages/cli` and is exposed locally as `pretext-skill`
after running `npm install && npm run build` in the repo root.
Inside this repo, prefer `npm run cli -- ...` so you always execute the current workspace build.

## Commands

| Command | What it does |
| --- | --- |
| `npx pretext-skill init <target> --force` | install one target from bundled assets |
| `npx pretext-skill init all --force` | install every supported target |
| `npx pretext-skill update --offline --force` | refresh all installed targets from bundled assets |
| `npx pretext-skill versions` | print CLI and bundle version |
| `npx pretext-skill doctor` | inspect install paths and install state |

Repo-local equivalents:

| Command | What it does |
| --- | --- |
| `npm run cli -- init <target> --force` | install one target from the current workspace |
| `npm run cli -- init all --force` | install every supported target from the current workspace |
| `npm run cli -- update --offline --force` | refresh installs from the current workspace |
| `npm run cli -- versions` | print CLI and bundle version from the current workspace |
| `npm run cli -- doctor` | inspect install state using the current workspace build |

## Supported target values

Preferred target values:

- `antigravity`
- `claude-code`
- `codex`
- `continue`
- `github-copilot`
- `cursor`
- `gemini-cli`
- `kiro`
- `opencode`
- `qoder`
- `roo-code`
- `trae`
- `windsurf`
- `all`

Accepted compatibility aliases:

- `claude`
- `claudecode`
- `copilot`
- `gemini`
- `open-code`
- `roocode`

## Options

| Option | Meaning |
| --- | --- |
| `--offline` | use bundled assets only |
| `--force` | overwrite an existing install path |

## Local Workflow

```bash
npm install
npm run build
npm run cli -- versions
npm run cli -- init codex --force
npm run cli -- init claude-code --force
npm run cli -- init github-copilot --force
npm run cli -- doctor
```

## Update Workflow

```bash
npx pretext-skill update --offline --force
```

This refreshes all already-installed targets that exist under your home directory.

Restart the target assistant after install or update so it reloads the bundle.
