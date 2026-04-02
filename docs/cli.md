# CLI Guide

## Overview

The installer CLI lives in `packages/cli` and is exposed locally as `pretext-skill`
after running `npm install && npm run build` in the repo root.

## Commands

| Command | What it does |
| --- | --- |
| `npx pretext-skill init --ai <target> --offline --force` | install one target from bundled assets |
| `npx pretext-skill init --ai all --offline --force` | install every supported target |
| `npx pretext-skill update --offline --force` | refresh all installed targets from bundled assets |
| `npx pretext-skill versions` | print CLI and bundle version |
| `npx pretext-skill doctor` | inspect install paths and install state |

## Supported `--ai` values

- `antigravity`
- `claude`
- `codex`
- `continue`
- `copilot`
- `cursor`
- `gemini`
- `kiro`
- `opencode`
- `qoder`
- `roocode`
- `trae`
- `windsurf`
- `all`

## Options

| Option | Meaning |
| --- | --- |
| `--offline` | use bundled assets only |
| `--force` | overwrite an existing install path |

## Local Workflow

```bash
npm install
npm run build
npx pretext-skill versions
npx pretext-skill init --ai codex --offline --force
npx pretext-skill doctor
```

## Update Workflow

```bash
npx pretext-skill update --offline --force
```

This refreshes all already-installed targets that exist under your home directory.

Restart the target assistant after install or update so it reloads the bundle.
