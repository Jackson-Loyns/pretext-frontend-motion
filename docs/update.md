# Update

## What "real-time update" means here

For Codex skills, there is usually no built-in live sync from an arbitrary GitHub repo into your local skills folder.

The reliable way to get near-real-time local updates is:

1. keep this skill as a normal git repo
2. install it into Codex via a symlink
3. edit or pull updates in this repo
4. restart Codex when you want to be certain the updated skill is reloaded

That gives you one source of truth instead of copying files around.

## Recommended Setup

### Local development install

Install the skill as a symlink:

```bash
python3 scripts/pretext_cli.py install-symlink
```

This creates:

```text
${CODEX_HOME:-$HOME/.codex}/skills/pretext-frontend-motion -> /path/to/this/repo
```

With that setup:

- edits in this repo are reflected in the installed skill immediately at the filesystem level
- no repeated copy step is needed
- `git pull` here updates the installed skill too

## Updating from the original repo

If this repo has a configured remote, use:

```bash
python3 scripts/pretext_cli.py update origin main
```

The script:

- checks that the working tree is clean
- fetches from the chosen remote
- fast-forwards the current branch

If you cloned from your own fork and want upstream updates too, add an upstream remote first:

```bash
git remote add upstream <upstream-repo-url>
python3 scripts/pretext_cli.py update upstream main
```

## Recommended Workflow

| Goal | Best method |
| --- | --- |
| I want my local edits to affect the installed skill | Symlink install |
| I want upstream repo updates to flow into my local skill | Keep this repo as a git checkout and pull updates here |
| I want a one-command refresh | Use `scripts/update_from_git.sh` |
| I want zero manual copying | Avoid copy install; use symlink install instead |

## Important Limitation

Symlink install keeps files synced, but Codex may still need a restart before it definitely re-reads updated skill metadata or instructions. Treat restart as the safe reload step.
