# CLI Guide

## Included Commands

This repo exposes one main command entry:

```bash
python3 scripts/pretext_cli.py --help
```

## Unified CLI

| Goal | Command |
| --- | --- |
| List available modes | `python3 scripts/pretext_cli.py list-kinds` |
| List all presets | `python3 scripts/pretext_cli.py list-presets` |
| List presets for one mode | `python3 scripts/pretext_cli.py list-presets --kind kinetic-typography` |
| Scaffold a demo | `python3 scripts/pretext_cli.py scaffold --kind predictive-ui --preset multilingual-feed --title "Measured Dispatch" --out output/measured-dispatch` |
| Validate this skill repo | `python3 scripts/pretext_cli.py validate .` |
| Install into Codex via symlink | `python3 scripts/pretext_cli.py install-symlink` |
| Pull updates from git | `python3 scripts/pretext_cli.py update origin main` |

## Lower-Level Scripts

Use these if you want the raw underlying tools instead of the unified entrypoint.

| Script | Purpose | Example |
| --- | --- | --- |
| `scripts/new_pretext_demo.py` | Copy a starter and apply a preset | `python3 scripts/new_pretext_demo.py --kind editorial-routing --preset routed-manifesto --title "Field Notes" --out output/field-notes` |
| `scripts/validate_skill.py` | Check file structure and starter presence | `python3 scripts/validate_skill.py .` |
| `scripts/install_symlink.sh` | Install this repo into Codex as a symlink | `./scripts/install_symlink.sh` |
| `scripts/update_from_git.sh` | Fast-forward the current branch from a git remote | `./scripts/update_from_git.sh upstream main` |

## Upstream Pretext Commands

These are the original project commands you will need when you want to inspect or compare against the source library.

| Goal | Command |
| --- | --- |
| Install the library in a project | `npm install @chenglou/pretext` |
| Run the upstream demo repo locally | `bun install && bun start` |

Upstream command source:
- [pretext README](https://github.com/chenglou/pretext/blob/main/README.md)
- [pretext DEVELOPMENT.md](https://github.com/chenglou/pretext/blob/main/DEVELOPMENT.md)

## Practical Workflow

### 1. Inspect available shapes

```bash
python3 scripts/pretext_cli.py list-kinds
python3 scripts/pretext_cli.py list-presets --kind predictive-ui
```

### 2. Create a demo

```bash
python3 scripts/pretext_cli.py scaffold \
  --kind predictive-ui \
  --preset tight-masonry \
  --title "Packed Signals" \
  --out output/packed-signals
```

### 3. Run it

```bash
cd output/packed-signals
npm install
npm run dev
```

### 4. Validate the skill repo before sharing

```bash
python3 scripts/pretext_cli.py validate .
```
