# CLI Guide

## Two Ways To Run The CLI

Use the global package if you install it once:

```bash
pretext-skill <command>
```

Use the published package outside this repository when you do not want a global install:

```bash
npx pretext-skill@0.3.1 <command>
```

Use the workspace command during development:

```bash
npm run cli -- <command>
```

The workspace form uses the current local build directly.

## Main Commands

| Goal | Global package command | Local repo command | Published package command |
| --- | --- | --- | --- |
| Show versions | `pretext-skill versions` | `npm run cli -- versions` | `npx pretext-skill@0.3.1 versions` |
| Install one target | `pretext-skill init claude-code --force` | `npm run cli -- init claude-code --force` | `npx pretext-skill@0.3.1 init claude-code --force` |
| Install all targets | `pretext-skill init all --force` | `npm run cli -- init all --force` | `npx pretext-skill@0.3.1 init all --force` |
| Update installed targets | `pretext-skill update --offline --force` | `npm run cli -- update --offline --force` | `npx pretext-skill@0.3.1 update --offline --force` |
| Check install state | `pretext-skill doctor` | `npm run cli -- doctor` | `npx pretext-skill@0.3.1 doctor` |
| Scaffold a starter | `pretext-skill scaffold --kind predictive-ui --out demo` | `npm run cli -- scaffold --kind predictive-ui --out demo` | `npx pretext-skill@0.3.1 scaffold --kind predictive-ui --out demo` |
| List starter presets | `pretext-skill list-presets --kind kinetic-typography` | `npm run cli -- list-presets --kind kinetic-typography` | `npx pretext-skill@0.3.1 list-presets --kind kinetic-typography` |
| Validate the repo | `pretext-skill validate .` | `npm run cli -- validate .` | `npx pretext-skill@0.3.1 validate .` |

## Preferred Target Names

Use the real assistant or CLI name in commands:

- `claude-code`
- `codex`
- `cursor`
- `windsurf`
- `gemini-cli`
- `opencode`
- `continue`
- `github-copilot`
- `roo-code`
- `qoder`
- `kiro`
- `trae`
- `antigravity`
- `all`

Compatibility aliases still work, but they are not the preferred names in the docs.

## Recommended Install Flow

```bash
npm install -g pretext-skill@0.3.1
pretext-skill versions
pretext-skill init claude-code --force
pretext-skill list-presets --kind kinetic-typography
pretext-skill doctor
```

## Recommended Development Flow

```bash
npm install
npm run build
npm run cli -- versions
npm run cli -- init claude-code --force
npm run cli -- list-presets --kind kinetic-typography
npm run cli -- scaffold --kind kinetic-typography --preset algo-signal-field --out demo
npm run cli -- doctor
```

## Update Flow

```bash
npm run cli -- update --offline --force
npx pretext-skill@0.3.1 update --offline --force
```

Restart the target assistant after install or update so it reloads the bundle.

## Example Runtime

Bundled examples and generated starters are static ESM packages.
After `npm install`, run them with:

```bash
npm start
```
