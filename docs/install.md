# Install

## Local Repo Setup

```bash
npm install
npm run build
```

After the build, the local workspace exposes the `pretext-skill` binary through `npx`.
Inside the repo, prefer `npm run cli -- ...` so the current workspace build is used directly.

## Install One Target

```bash
npm run cli -- init codex --force
```

Replace `codex` with any supported target from [cli.md](cli.md).

## Install Every Target

```bash
npm run cli -- init all --force
```

## Verify

```bash
npm run cli -- versions
npm run cli -- doctor
```

The installer writes a `.pretext-install.json` manifest inside each installed bundle.

Bundled examples and generated starters run with `npm start` after `npm install`.
