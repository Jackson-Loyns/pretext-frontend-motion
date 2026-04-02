# CLI Guide

## Use The Workspace Command During Development

Inside this repository, prefer:

```bash
npm run cli -- <command>
```

That uses the current workspace build directly.

For packaged usage outside the repo, use:

```bash
npx pretext-skill <command>
```

## Main Commands

| Goal | Command |
| --- | --- |
| Show versions | `npm run cli -- versions` |
| Install one target | `npm run cli -- init claude-code --force` |
| Install all targets | `npm run cli -- init all --force` |
| Update installed targets | `npm run cli -- update --offline --force` |
| Check install state | `npm run cli -- doctor` |
| Scaffold a starter | `npm run cli -- scaffold --kind predictive-ui --out demo` |
| List starter presets | `npm run cli -- list-presets --kind kinetic-typography` |
| Validate the repo | `npm run cli -- validate .` |

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

## Local Flow

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
```

Restart the target assistant after install or update so it reloads the bundle.

## Example Runtime

Bundled examples and generated starters are static ESM packages.
After `npm install`, run them with:

```bash
npm start
```
