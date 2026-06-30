# slider

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Slider whose fill is a numeric value channel plus a thumb idle/hover/press channel (dual-channel value-channel deviation). The Slider renderer is pure; `useSliderTransition` eases both — value as numeric lerp, thumb visual from state presets. Muted track + primary range + bordered thumb with a derived grab ring.

## Install

```bash
shadcn add @remocn/slider
```

Lands at `components/remocn/slider.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `value` | `number` | `0` |
| `thumbState` | `SliderThumbState` | `"idle"` |
| `style` | `SliderStyle` | — |
| `width` | `number` | `320` |
| `showValue` | `boolean` | `false` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Slider value={65} thumbState="hover" width={360} showValue />
```

## Use when

- Demonstrating a range control being dragged to a target value with hover/press thumb states.
- Showing an audio, video, or settings slider animating in a product walkthrough.
- Composing a settings scene alongside `switch` and `select` (used in `settings-toggle-flow`).

## Don't use when

- You need to show completion percentage with no thumb — use `progress` instead (fill-only, no interaction states).
- The value is binary — use `switch` instead.
- You need step-by-step progress with connectors and check marks — use `stepper` instead.
