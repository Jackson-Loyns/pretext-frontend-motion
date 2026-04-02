# Update

## Local Bundle Refresh

When you have already installed one or more targets from this repo, refresh them with:

```bash
npm run cli -- update --offline --force
```

This scans the supported install locations under your home directory and rewrites any bundle that already exists.

## When To Rebuild First

Re-run `npm run build` before `update` when:

- installer code changed
- shared content in `core/` changed
- platform metadata in `platforms/` changed

## Inspect Current State

```bash
npm run cli -- doctor
```

Use this to see which targets are installed and where they live.
