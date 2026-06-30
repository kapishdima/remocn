# toggle-group

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Segmented control whose active value is a pure function of the timeline; a raised thumb slides between segments (position + width derived from a float indicator offset, no jumps) and the labels crossfade color via mixOklch. The tabs precedent without content panels.

## Install

```bash
shadcn add @remocn/toggle-group
```

Lands at `components/remocn/toggle-group.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `ToggleGroupState` | `DEFAULT_ITEMS[0].value` |
| `style` | `ToggleGroupStyle` | — |
| `items` | `ToggleGroupItem[]` | `DEFAULT_ITEMS` |
| `size` | `ToggleGroupSize` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |
| `align` | `"start" \| "center" \| "end"` | `"center"` |

## Example

```tsx
<ToggleGroup items={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]} state="week" />
```

## Use when

- Showing a segmented control switching between view modes, time ranges, or mutually exclusive options.
- Demonstrating a smooth continuous thumb-slide animation between compact segments.
- Replacing a radio group where options are co-located and a sliding-thumb metaphor reads better than individual dots.

## Don't use when

- You need content panels that crossfade below the control — use `tabs` instead (full panel area + indicator).
- Options are sequential numbered steps — use `stepper` instead (connectors + check marks).
- You need a full dropdown with a reveal panel — use `select` instead.
