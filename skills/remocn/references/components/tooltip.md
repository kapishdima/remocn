# tooltip

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Tooltip whose hidden/visible state is a pure function of the timeline. The Tooltip renderer is a pure function of a TooltipStyle (opacity, scale, translate); `useTooltipTransition` eases both the show and the hide. The static `side` prop sets the enter translate axis and the arrow placement.

## Install

```bash
shadcn add @remocn/tooltip
```

Lands at `components/remocn/tooltip.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `TooltipState` | `"hidden"` |
| `style` | `TooltipStyle` | — |
| `label` | `string` | required |
| `side` | `TooltipSide` | `"top"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Tooltip label="Copy to clipboard" state="hidden" side="top" />
```

## Use when

- Showing a hover tooltip appearing next to a UI element in a product walkthrough.
- Demonstrating a contextual label that explains an icon or action on the timeline.
- Sequencing a show → read → hide moment — `side` controls which axis the tooltip enters from.

## Don't use when

- You need title + description in the overlay — use `popover` instead (richer two-field content with optional children).
- You need a persistent side panel with actions — use `sheet` instead.
- You need a blocking confirmation — use `alert-dialog` instead.
