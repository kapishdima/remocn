# spinner

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Deterministic spinning arc that loops on the Remotion frame — a pure motion atom with no state. No deps.

## Install

```bash
shadcn add @remocn/spinner
```

Lands at `components/remocn/spinner.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `size` | `number` | `20` |
| `color` | `string` | `"currentColor"` |
| `speed` | `number` | `1` |
| `strokeWidth` | `number` | `2.5` |

## Example

```tsx
<Spinner size={24} color="#171717" speed={1.2} />
```

## Use when

- Showing a loading indicator inside a button after a click (hover → press → loading state).
- Adding an inline async-operation indicator to any scene without layout overhead.
- Composing with `skeleton` or `button` to illustrate a loading-state moment in a flow.

## Don't use when

- You need a full-width loading bar with a track — use `progress` instead.
- You need a shimmer placeholder block — use `skeleton-block` instead.
- The loading state resolves to real content — use `skeleton` for the crossfade (spinner has no loaded state).
