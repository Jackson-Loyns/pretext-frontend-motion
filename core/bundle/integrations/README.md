# Integrations

These examples show how to integrate Pretext into real TypeScript projects instead of using it only inside the skill bundle.

Each integration:

- uses the official `@chenglou/pretext` package
- keeps `prepare()` out of the resize hot path
- uses `layout()` for width-driven relayout
- waits for fonts before the first measured render
- shows the same bubbles use case across frameworks so the differences are architectural, not visual

Current integrations:

- `vanilla-bubbles`
- `react-bubbles`
- `vue-bubbles`
- `svelte-bubbles`
