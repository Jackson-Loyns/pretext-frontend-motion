# Install

## Local Repo Setup

```bash
npm install
npm run build
```

After the build, the local workspace exposes the `pretext-skill` binary through `npx`.

## Install One Target

```bash
npx pretext-skill init --ai codex --offline --force
```

Replace `codex` with any supported target from [cli.md](cli.md).

## Install Every Target

```bash
npx pretext-skill init --ai all --offline --force
```

## Verify

```bash
npx pretext-skill versions
npx pretext-skill doctor
```

The installer writes a `.pretext-install.json` manifest inside each installed bundle.
