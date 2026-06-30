# progress-steps

**Tier:** `remocn` (animation) · **Vibe:** data · **Natural length:** 150f @ 30fps

Multi-step pipeline with sequentially activating nodes and filling lines. Each step node lights up in turn and the connector line between nodes fills to signal completion, giving a clear left-to-right or top-to-bottom "progress through a workflow" read.

## Install

```bash
shadcn add @remocn/progress-steps
```

Lands at `components/remocn/progress-steps.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `steps` | `Array<{ label: string }>` | `[{ label: "Connect" }, { label: "Process" }, { lab…` |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `activeColor` | `string` | `"#22c55e"` |
| `inactiveColor` | `string` | `"#27272a"` |
| `textColor` | `string` | `"white"` |
| `stepDuration` | `number` | `30` |
| `speed` | `number` | `1` |

## Example

```tsx
<ProgressSteps steps={[{ label: "Connect" }, { label: "Process" }, { label: "Deploy" }]} />
```

## Use when

- Showing a CI/CD pipeline, onboarding checklist, or multi-phase workflow completing step by step.
- A SaaS demo needs to convey "how it works in 3 steps" with a visual progress metaphor.
- Vertical orientation fits a feature list reveal; horizontal fits a timeline or funnel.

## Don't use when

- The data is quantitative and you need to show magnitudes — use `animated-bar-chart` or `animated-line-chart` instead.
- The relationship between nodes is a graph/mesh rather than a linear chain — use `data-flow-pipes` instead.
- You have only one step; a single activated node conveys nothing; use a text animation or icon pop-in instead.
