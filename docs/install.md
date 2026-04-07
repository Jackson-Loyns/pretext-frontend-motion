# Install

## Recommended Flow

If you are an end user, install the published package globally and use `pretext-skill ...`.

```bash
npm install -g pretext-skill@0.3.1
pretext-skill versions
pretext-skill init codex --force
pretext-skill doctor
```

Use `npx pretext-skill@0.3.1 ...` when you want one-off usage without a global install.

## One-Off Published Package Flow

Install one target:

```bash
npx pretext-skill@0.3.1 init codex --force
npx pretext-skill@0.3.1 init claude-code --force
npx pretext-skill@0.3.1 init cursor --force
npx pretext-skill@0.3.1 init gemini-cli --force
npx pretext-skill@0.3.1 init github-copilot --force
```

Install every supported target:

```bash
npx pretext-skill@0.3.1 init all --force
```

Verify the install:

```bash
npx pretext-skill@0.3.1 doctor
```

## Global Package Flow

After a global install:

```bash
pretext-skill init codex --force
pretext-skill init claude-code --force
pretext-skill init all --force
pretext-skill doctor
```

## Local Repository Flow

Use this when you are changing code or docs in this repository:

```bash
npm install
npm run build
npm run cli -- versions
npm run cli -- init codex --force
npm run cli -- doctor
```

Inside the repo, prefer `npm run cli -- ...` so the current workspace build is used directly instead of a cached global copy.

## Installed Output

The installer writes a `.pretext-install.json` manifest inside each installed bundle. That manifest is what `doctor` and `update` inspect later.

After install or update, restart the target assistant or CLI so it reloads the bundle.

## Package The CLI

This repository can build and pack the npm CLI locally:

```bash
npm run build
npm run pack
```

That validates the package boundary with `npm pack`. Publish is a separate step.

## Example Runtime

Bundled examples and generated starters are static ESM packages. In any generated example directory:

```bash
npm install
npm start
```

See [cli.md](cli.md) for the full command list and [examples.md](examples.md) for preset and style guidance.
