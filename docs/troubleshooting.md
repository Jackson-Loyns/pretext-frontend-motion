# Troubleshooting

## The bundle installed but the assistant does not seem to use it

Check these first:

1. the install command completed successfully
2. the target install path exists
3. the assistant was restarted after install or update
4. the installed `SKILL.md` or `PROMPT.md` exists at the target path

Use:

```bash
npx pretext-skill doctor
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
npx pretext-skill init --ai <target> --offline --force
```

## I changed the repo but the installed bundle still looks old

Run:

```bash
npm run build
npx pretext-skill update --offline --force
```

Then restart the assistant.
