# Integration Gotchas

## Font Loading

Do not measure immediately on startup if the chosen font is still loading. Wait for `document.fonts.ready` before the first `prepare()` pass when layout precision matters.

## `prepare()` vs `layout()`

- `prepare()` is for text and font changes
- `layout()` is for width and line-height changes

Do not rerun `prepare()` on every resize.

## `lineHeight`

Use pixel values in the integration layer. Do not pass ratio-style values and assume the same line geometry.

## DOM Hot Path

Do not put `getBoundingClientRect()`, `offsetHeight`, or text remeasurement in the same loop that recomputes line layout from width changes.

## Framework Lifecycle

- React: prepare on data or font changes, relayout on width changes
- Vue: same split through refs, watchers, and `ResizeObserver`
- Svelte: same split through `onMount`, state, and resize handling

## SSR And Hydration

Do not assume text metrics are stable on the server. Treat Pretext layout as a client-side concern unless you fully control the font environment.
