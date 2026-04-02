# Install

## Codex Install

Copy this directory into your Codex skills folder:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R /path/to/pretext "${CODEX_HOME:-$HOME/.codex}/skills/pretext-frontend-motion"
```

Restart Codex after copying the skill.

For local development, prefer the symlink installer instead:

```bash
python3 scripts/pretext_cli.py install-symlink
```

That avoids copy drift and is the recommended setup if you want this repo to stay in sync with the installed skill.

## Local Validation

Run the bundled validator before installing or sharing:

```bash
python3 scripts/pretext_cli.py validate .
```

This checks:

- required files exist
- `SKILL.md` frontmatter contains `name` and `description`
- the scaffold script is executable
- the install and update scripts are executable
- each starter has `package.json`, `index.html`, and a `src/` entrypoint

## Scaffold Smoke Test

Generate each starter at least once:

```bash
python3 scripts/pretext_cli.py scaffold --kind predictive-ui --preset signal-bubbles --title "Signal Bubbles" --out tmp/predictive-ui
python3 scripts/pretext_cli.py scaffold --kind editorial-routing --preset orbital-essay --title "Orbital Essay" --out tmp/editorial-routing
python3 scripts/pretext_cli.py scaffold --kind kinetic-typography --preset pulse-type --title "Pulse Type" --out tmp/kinetic-typography
```

Then build at least one of them:

```bash
cd tmp/predictive-ui
npm install
npm run build
```

## Recommended Share Checklist

- The validator passes.
- At least one starter has been built locally.
- `docs/` and `references/` are present.
- `evals/evals.json` contains realistic prompts for future regression checks.
