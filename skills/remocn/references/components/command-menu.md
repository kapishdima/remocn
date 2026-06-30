# command-menu

**Tier:** `remocn-ui` (primitive) · **Vibe:** tech · **Natural length:** 120f @ 30fps

A ⌘K command palette whose opened/closed state is a pure function of the timeline; the panel zoom + backdrop dim are dialog-like keyframed presets. The search row reveals the typed query, the list is filtered by a pure case-insensitive substring on the visible query prefix, and rows reuse the CommandMenuItem row.

## Install

```bash
shadcn add @remocn/command-menu
```

Lands at `components/remocn/command-menu.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/command-menu-item` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `CommandMenuState` | `"closed"` |
| `style` | `CommandMenuStyle` | — |
| `query` | `string` | `""` |
| `revealCount` | `number` | — |
| `items` | `CommandMenuEntry[]` | `[ { icon: "user", label: "Profile", shortcut: "⌘ P…` |
| `selectedIndex` | `number` | `-1` |
| `highlightedIndex` | `number` | `-1` |
| `pressedIndex` | `number` | `-1` |
| `itemStyles` | `(CommandMenuItemStyle \| undefined)[]` | — |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<CommandMenu state="closed" query="Pro" items={[{ icon: "user", label: "Profile", shortcut: "⌘ P" }]} />
```

## Use when

- Demoing a ⌘K palette opening with a typed query filtering icon-labeled commands.
- Showing keyboard-first navigation UX in a developer or power-user product video.
- Demonstrating item hover/press states with trailing keyboard shortcuts in a command palette.

## Don't use when

- The list has no icons or keyboard shortcuts and is triggered from a button — use `dropdown-menu` instead.
- The overlay is a right-click contextual menu — use `context-menu` instead.
- You only need a filterable input without a modal overlay — use `combobox` instead.
