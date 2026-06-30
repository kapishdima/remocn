# animated-line-chart

**Tier:** `remocn` (animation) · **Vibe:** data · **Natural length:** 90f @ 30fps

Line chart whose SVG path draws on from left to right with a leading dot. The stroke length is driven by `useCurrentFrame`, making the draw speed deterministic and preview-scrub-safe.

## Install

```bash
shadcn add @remocn/animated-line-chart
```

Lands at `components/remocn/animated-line-chart.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `data` | `number[]` | `[12, 19, 8, 15, 22, 18, 28, 25, 32]` |
| `width` | `number` | `1000` |
| `height` | `number` | `500` |
| `strokeColor` | `string` | `"#22c55e"` |
| `strokeWidth` | `number` | `4` |
| `gridColor` | `string` | `"#27272a"` |
| `showDot` | `boolean` | `true` |
| `speed` | `number` | `1` |

## Example

```tsx
<AnimatedLineChart data={[12, 19, 8, 15, 22, 18, 28, 25, 32]} />
```

## Use when

- Showing growth or trend over time — revenue curve, DAU climb, error-rate drop.
- A SaaS demo needs a "hockey stick" moment where the line visibly inflects upward.
- You want a single continuous reveal motion rather than per-bar stagger.

## Don't use when

- The data is categorical (not time-ordered) — use `animated-bar-chart` to compare discrete values side by side.
- You have only 2–3 data points; a near-straight line adds little; use a number counter or a headline stat instead.
- You need to show pipeline or workflow stages — use `progress-steps` instead.
