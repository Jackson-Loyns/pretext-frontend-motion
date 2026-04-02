# Troubleshooting

## The bundle installed but the assistant does not seem to use it

Check these first:

1. the install command completed successfully
2. the target install path exists
3. the assistant was restarted after install or update
4. the installed `SKILL.md` or `PROMPT.md` exists at the target path

Use:

```bash
npm run cli -- doctor
```

## The assistant installed the bundle but still produces generic frontend style

Check whether the installed bundle includes:

- `references/design-rules.md`
- `references/font-strategy.md`
- `references/prompt-recipes.md`

Those files are the main visual guardrails.

## A target path already exists

Re-run with:

```bash
npm run cli -- init <target> --force
```

## I changed the repo but the installed bundle still looks old

Run:

```bash
npm run build
npm run cli -- update --offline --force
```

Then restart the assistant.

## `npx pretext-skill` does not seem to use the current repo build

When you are working inside this repo, prefer:

```bash
npm run cli -- <command>
```

That path uses the current workspace build directly and avoids stale `npx` resolution.
