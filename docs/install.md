# Install

## Local Repository Workflow

Use this flow when you are working from this repository:

```bash
npm install
npm run build
npm run cli -- versions
```

Inside the repo, prefer `npm run cli -- ...` so the current workspace build is always used directly.

## Install One Platform

Use the real assistant or CLI name:

```bash
npm run cli -- init codex --force
npm run cli -- init claude-code --force
npm run cli -- init cursor --force
npm run cli -- init gemini-cli --force
npm run cli -- init github-copilot --force
```

The full platform list lives in [cli.md](cli.md).

## Install Every Platform

```bash
npm run cli -- init all --force
```

## Verify

```bash
npm run cli -- doctor
```

The installer writes a `.pretext-install.json` manifest inside each installed bundle.

## Package The CLI

This repo can generate an npm tarball for the CLI:

```bash
npm run pack
```

That validates the package boundary through `npm pack`. It does not publish to npm by itself.

## Example Runtime

Bundled examples and generated starters are static ESM packages.
After `npm install`, run them with:

```bash
npm start
```
