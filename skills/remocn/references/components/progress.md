# progress

**Tier:** `remocn-ui` (primitive) · **Vibe:** data · **Natural length:** 120f @ 30fps

Progress bar whose fill is a pure function of a numeric value channel. Muted track + primary indicator, optional floored percentage label; `useProgressTransition` eases the fill between value steps.

## Install

```bash
shadcn add @remocn/progress
```

Lands at `components/remocn/progress.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `value` | `number` | `0` |
| `style` | `ProgressStyle` | — |
| `width` | `number` | `320` |
| `showLabel` | `boolean` | `false` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Progress value={72} width={400} showLabel />
```

## Use when

- Showing a loading, upload, or completion bar animating to a target value.
- Visualizing progression through a multi-step flow as a single continuous bar.
- You need a labeled percentage readout alongside the fill indicator.

## Don't use when

- The state is binary (done/not done) — use `switch` instead.
- You need segmented, numbered step-by-step progress — use `stepper` instead (connectors + check marks).
- You need a range input the user can drag — use `slider` instead (thumb + grab-ring interaction).
