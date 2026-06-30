# animated-bar-chart

**Tier:** `remocn` (animation) · **Vibe:** data · **Natural length:** 90f @ 30fps

Bars spring up from the baseline in a staggered cascade. Each bar animates independently with a configurable stagger gap, creating a sequential reveal that guides the eye across the dataset.

## Install

```bash
shadcn add @remocn/animated-bar-chart
```

Lands at `components/remocn/animated-bar-chart.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `data` | `number[]` | `[35, 60, 45, 80, 55, 70, 90, 65]` |
| `labels` | `string[]` | — |
| `width` | `number` | `1000` |
| `height` | `number` | `500` |
| `barColor` | `string` | `"#0ea5e9"` |
| `gap` | `number` | `16` |
| `staggerFrames` | `number` | `6` |
| `speed` | `number` | `1` |

## Example

```tsx
<AnimatedBarChart data={[35, 60, 45, 80, 55, 70, 90, 65]} />
```

## Use when

- Showing comparative categorical metrics in a product demo — feature usage, plan distribution, benchmark scores.
- A business KPI or results slide needs a "data revealed" moment rather than a static screenshot.
- The dataset has a clear winner bar to build to (stagger naturally draws attention to the tallest last).

## Don't use when

- The data represents change over time — continuous trends belong in `animated-line-chart`, not bars.
- You want to visualize a sequential workflow or pipeline stages — use `progress-steps` instead.
- You have a single data point; one bar springing up looks degenerate — embed a number counter or use a text animation.
