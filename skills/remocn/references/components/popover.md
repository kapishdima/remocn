# popover

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Popover/hover-card whose opened/closed state is a pure function of the timeline. The static `side` prop sets the enter translate axis; renders title + description and/or arbitrary children in a popover card.

## Install

```bash
shadcn add @remocn/popover
```

Lands at `components/remocn/popover.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `PopoverState` | `"closed"` |
| `style` | `PopoverStyle` | — |
| `title` | `string` | — |
| `description` | `string` | — |
| `children` | `ReactNode` | — |
| `side` | `PopoverSide` | `"bottom"` |
| `width` | `number` | `288` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Popover state="closed" title="Keyboard shortcut" description="Press ⌘K to open the command palette." side="bottom" />
```

## Use when

- Showing a hover-card with richer content (title + description) than a single-line tooltip label allows.
- Demonstrating a popover animation keyed to the timeline — open and close sequenced across frames.
- The overlay should enter from a specific axis (`side` prop controls translate direction).

## Don't use when

- You only need a single-line label — use `tooltip` instead (lighter, no title/description structure).
- You need a persistent side panel with a close button and action — use `sheet` instead.
- The overlay needs full blocking modal behavior — use `alert-dialog` instead.
