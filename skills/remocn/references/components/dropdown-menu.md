# dropdown-menu

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

A dropdown menu whose opened/closed state is a pure function of the timeline; the trigger reuses the Button primitive and the reveal panel composes `DropdownMenuItem` rows. The panel fade, scale, lift, and chevron are keyframed presets.

## Install

```bash
shadcn add @remocn/dropdown-menu
```

Lands at `components/remocn/dropdown-menu.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/button`, `@remocn/dropdown-menu-item` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `DropdownMenuState` | `"closed"` |
| `style` | `DropdownMenuStyle` | — |
| `label` | `string` | `"Options"` |
| `items` | `string[]` | `["Profile", "Billing", "Settings", "Log out"]` |
| `highlightedIndex` | `number` | `-1` |
| `pressedIndex` | `number` | `-1` |
| `itemStyles` | `(DropdownMenuItemStyle \| undefined)[]` | — |
| `triggerStyle` | `ButtonStyle` | — |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<DropdownMenu state="closed" label="Options" items={["Profile", "Billing", "Log out"]} highlightedIndex={1} />
```

## Use when

- Showing a button that opens an action list — the classic "Options" or account menu pattern.
- Demonstrating hover/press states on individual menu items after the panel opens.
- Composing inside a nav bar or toolbar where a trigger button owns a small action list.

## Don't use when

- The menu is invoked by right-click at a cursor position — use `context-menu` instead.
- The list is searchable or filterable — use `combobox` instead.
- The overlay is a modal that blocks the scene — use `dialog` or `alert-dialog` instead.
