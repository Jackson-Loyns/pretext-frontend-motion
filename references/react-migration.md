# React Migration

Use this file only when the user wants the Pretext starter logic inside a React app.

## Migration Strategy

1. Keep the measurement model the same.
2. Move `prepare()` or `prepareWithSegments()` into setup code tied to text and font changes.
3. Recompute `layout()` or `layoutWithLines()` only when width or relevant geometry changes.
4. Render from React state, refs, or canvas draw routines without reintroducing DOM text measurement.

## Good React Shapes

- A shell component owns the canvas or container.
- Prepared text handles live in state or refs.
- Resize logic is isolated.
- Canvas drawing stays imperative through a ref and `requestAnimationFrame`.

## Avoid

- Measuring rendered text nodes with `getBoundingClientRect()`
- Re-preparing text every render
- Mixing React layout effects with DOM text sizing as the primary approach

## When React Is Worth It

- integrating into an existing product
- sharing app-level state
- routing and composition already exist in React

## When Vanilla TS Is Better

- standalone visual demos
- canvas-heavy experiments
- editorial one-off pages
- starter projects where layout behavior is the main point
