# Repository Structure

## Top-Level Areas

| Path | Purpose |
| --- | --- |
| `packages/cli` | published npm CLI and installer |
| `core` | bundled skill content, templates, references, metadata |
| `assets` | starter projects used by scaffold |
| `integrations` | real TypeScript framework integrations |
| `docs` | user-facing documentation |
| `references` | deeper technical references outside the installed bundle |
| `scripts` | local validation, scaffold, and maintenance scripts |

## What To Edit

### If you are changing the published CLI

Edit:

- `packages/cli/src`
- `packages/cli/scripts`

Validate with:

```bash
npm run build
npm test
```

### If you are changing the installed skill behavior

Edit:

- `core/templates`
- `core/bundle/references`
- `core/bundle/examples`
- `core/bundle/blueprints`

Validate with:

```bash
python3 scripts/validate_skill.py .
```

### If you are changing real framework integrations

Edit:

- `integrations/vanilla-bubbles`
- `integrations/react-bubbles`
- `integrations/vue-bubbles`
- `integrations/svelte-bubbles`

Validate with:

```bash
npm run check:integrations
```

## Design Intent

This repository is intentionally split between:

- installed skill content for assistants
- runnable examples for official Pretext families
- framework integrations for real project adoption

Do not collapse those layers into one directory or one document. They serve different users.
