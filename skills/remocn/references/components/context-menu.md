# context-menu

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

A right-click context menu whose opened/closed state is a pure function of the timeline; the panel scales from its top-left corner (the click point) with a fade + lift. No trigger — the caller positions it. Rows reuse the `DropdownMenuItem` row; items are plain string labels.

## Install

```bash
shadcn add @remocn/context-menu
```

Lands at `components/remocn/context-menu.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/dropdown-menu-item` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `ContextMenuState` | `"closed"` |
| `style` | `ContextMenuStyle` | — |
| `items` | `string[]` | `["Back", "Reload", "Save As…", "Inspect"]` |
| `highlightedIndex` | `number` | `-1` |
| `pressedIndex` | `number` | `-1` |
| `itemStyles` | `(DropdownMenuItemStyle \| undefined)[]` | — |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<ContextMenu state="closed" items={["Copy", "Paste", "Delete"]} highlightedIndex={0} />
```

## Use when

- Showing a right-click menu appearing at a cursor position over content in a product demo.
- Demonstrating browser-like or OS-like contextual actions (Back, Reload, Inspect).
- A cursor composition needs a pop-up menu that originates from a click point, not a button.

## Don't use when

- The menu is triggered from a button in the UI — use `dropdown-menu` instead.
- The overlay is a searchable command palette — use `command-menu` instead.
- The overlay is a modal that blocks the rest of the scene — use `dialog` or `alert-dialog` instead.
