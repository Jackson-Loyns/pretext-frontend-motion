# Install

## Global Install

Use the global package if you want one stable command on your machine:

```bash
npm install -g pretext-skill@0.3.1
pretext-skill versions
pretext-skill init codex --force
pretext-skill doctor
```

After a global install, the common commands are:

```bash
pretext-skill init claude-code --force
pretext-skill init all --force
pretext-skill doctor
pretext-skill update --offline --force
```

## One-Off Install

Use `npx` when you do not want a global package:

```bash
npx pretext-skill@0.3.1 init codex --force
npx pretext-skill@0.3.1 init claude-code --force
npx pretext-skill@0.3.1 init cursor --force
npx pretext-skill@0.3.1 doctor
```

Install every supported target:

```bash
npx pretext-skill@0.3.1 init all --force
```

## Local Repository Flow

Use this only when you are working inside the repository itself:

```bash
npm install
npm run build
npm run cli -- versions
npm run cli -- init codex --force
npm run cli -- doctor
```

Inside the repo, prefer `npm run cli -- ...` so you use the current local build directly.

## What Gets Installed

Each installed target receives:

- the skill or prompt entry file for that assistant
- bundled references and examples
- bundled integration references
- a `.pretext-install.json` manifest used by `doctor` and `update`

After install or update, restart the target assistant or CLI so it reloads the bundle.

## Packaging

Build and pack the npm CLI locally with:

```bash
npm run build
npm run pack
```

## Related Docs

- [cli.md](cli.md)
- [usage.md](usage.md)
- [examples.md](examples.md)
