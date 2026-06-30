# select-item

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Select option row whose idle/hover/press/selected state is a pure function of the timeline; the row background, label color, and check icon are keyframed presets. Composed inside the Select panel — this is the inline row atom, not a standalone dropdown.

## Install

```bash
shadcn add @remocn/select-item
```

Lands at `components/remocn/select-item.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `SelectItemState` | `"idle"` |
| `style` | `SelectItemStyle` | — |
| `label` | `string` | — |
| `width` | `number` | — |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<SelectItemRow state="idle" label="Pro plan" />
```

## Use when

- Building a custom select panel and needing item rows to animate their state independently.
- Highlighting a specific row in isolation before the parent `select` handles the full open/close sequence.
- Composing a custom list that must follow the same row-state visual language as the `select` panel.

## Don't use when

- You want the full dropdown with trigger button and panel — use `select` (the container) instead; it composes this row automatically.
- You need a standalone option with a radio-style dot indicator — use `radio` instead.
- You need an on/off toggle row — use `switch` instead.
