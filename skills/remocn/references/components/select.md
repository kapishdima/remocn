# select

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Select whose opened/closed state is a pure function of the timeline; the trigger reuses the Button primitive and the reveal panel composes SelectItem rows. The panel fade, scale, lift, and chevron rotation are keyframed presets.

## Install

```bash
shadcn add @remocn/select
```

Lands at `components/remocn/select.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/button`, `@remocn/select-item` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `SelectState` | `"closed"` |
| `style` | `SelectStyle` | — |
| `label` | `string` | `"Select a fruit"` |
| `triggerStyle` | `ButtonStyle` | — |
| `items` | `string[]` | `["Apple", "Banana", "Orange", "Grape"]` |
| `selectedIndex` | `number` | `-1` |
| `highlightedIndex` | `number` | `-1` |
| `pressedIndex` | `number` | `-1` |
| `itemStyles` | `(SelectItemStyle \| undefined)[]` | — |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Select state="closed" label="Choose a plan" items={["Starter", "Pro", "Enterprise"]} highlightedIndex={1} />
```

## Use when

- Demonstrating a dropdown menu opening and an option being highlighted or selected on the timeline.
- Showing a form field interaction with animated open/close in a product walkthrough.
- Composing a settings scene where one control is a dropdown — pairs naturally with `switch` and `slider`.

## Don't use when

- You only need to show one item row in isolation — use `select-item` directly without the panel overhead.
- The choice is binary — use `switch` instead (simpler, no dropdown).
- You need a compact segmented control without a dropdown — use `toggle-group` instead.
- The items are actions or commands rather than a value being stored — use `dropdown-menu` (or `context-menu`); for a long, type-to-filter list use `combobox`.
