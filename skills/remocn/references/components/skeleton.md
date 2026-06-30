# skeleton

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Skeleton→content crossfade whose loading/loaded state is a pure function of the timeline. The Skeleton renderer is pure (reads no frame); only the composed SkeletonBlock shimmer reads it. Real children sit in normal flow and the placeholder (a lines/card layout or a custom node) is an absolute overlay; SkeletonStyle opacities sum to 1 so the box never dims.

## Install

```bash
shadcn add @remocn/skeleton
```

Lands at `components/remocn/skeleton.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/skeleton-block` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `SkeletonState` | `"loading"` |
| `style` | `SkeletonStyle` | `{ display: "flex", gap: 14, alignItems: "center", … }` |
| `children` | `ReactNode` | — |
| `placeholder` | `ReactNode` | — |
| `layout` | `SkeletonLayout` | `"lines"` |
| `speed` | `number` | — |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Skeleton state="loading" layout="lines">
  <p>Content loaded here</p>
</Skeleton>
```

## Use when

- Showing a loading state resolving to real content — the skeleton fades out as real UI fades in.
- Demonstrating content that "loads in" as a crossfade moment in a product walkthrough.
- You need a full skeleton layout (lines or card) wrapping real children, not just a single shimmer block.

## Don't use when

- You only need a single shimmer rectangle — use `skeleton-block` directly (no state API, no crossfade overhead).
- Content has no loading state — render children directly without a wrapper.
- You need a spinner-style loading indicator — use `spinner` instead (arc, no placeholder layout).
