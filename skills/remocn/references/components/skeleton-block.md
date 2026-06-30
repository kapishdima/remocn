# skeleton-block

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Single shimmer placeholder block — a motion atom. A directional highlight gradient sweeps across deterministically from `useCurrentFrame()` and loops seamlessly. Configurable width, height, radius, speed, and base/highlight colors.

## Install

```bash
shadcn add @remocn/skeleton-block
```

Lands at `components/remocn/skeleton-block.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `width` | `number \| string` | `120` |
| `height` | `number` | `16` |
| `radius` | `number` | `6` |
| `speed` | `number` | `1` |
| `baseColor` | `string` | — |
| `highlightColor` | `string` | — |
| `flexShrink` | `number` | — |

## Example

```tsx
<SkeletonBlock width={240} height={20} radius={4} />
```

## Use when

- Building a custom skeleton layout by composing individual shimmer blocks at precise dimensions.
- Adding a single loading placeholder inside another component or composition.
- You need precise control over each shimmer rectangle's size, radius, speed, and colors independently.

## Don't use when

- You want an automatic layout of shimmer + real content crossfade — use `skeleton` instead (loading/loaded state API with children).
- You need a spinning arc loader — use `spinner` instead (arc, not a rectangle).
- The loading placeholder is layout-level (card + avatar + lines) — use `skeleton` with the `layout` prop instead of assembling blocks manually.
