# Contributing

## Reporting Problems

Open an issue when you find:

- installer failures
- assistant-specific install path problems
- skill recognition or trigger problems
- weak visual output from the AI-facing bundle
- example build failures
- documentation mistakes

Include:

- target assistant or CLI
- operating system
- exact command you ran
- expected behavior
- actual behavior
- logs or screenshots when relevant

## Fork And PR Workflow

1. Fork the repository.
2. Create a branch from `main`.
3. Make the change.
4. Run local checks:
   - `python3 scripts/validate_skill.py .`
   - `npm run build`
   - `npm test`
5. If you changed examples, build the affected example(s).
6. Open a pull request with:
   - problem summary
   - change summary
   - validation steps

## What Needs Extra Care

- `platforms/*.json` because they affect install locations
- `packages/cli/` because they affect distribution behavior
- `core/bundle/references/` because they affect AI output quality
- `core/bundle/examples/` because they are the public proof that the bundle works
