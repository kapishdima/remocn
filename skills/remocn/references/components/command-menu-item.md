# command-menu-item

**Tier:** `remocn-ui` (primitive) · **Vibe:** tech · **Natural length:** 120f @ 30fps

A command-palette row whose idle/hover/press/selected state is a pure function of the timeline. Leading icon + label + trailing shortcut kbd. Exports an inline `CommandMenuItemRow` (reused by `command-menu`) and a standalone `CommandMenuItem` atom; the row background, label color, and icon color are keyframed presets.

## Install

```bash
shadcn add @remocn/command-menu-item
```

Lands at `components/remocn/command-menu-item.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `CommandMenuItemState` | `"idle"` |
| `style` | `CommandMenuItemStyle` | — |
| `label` | `string` | — |
| `icon` | `CommandMenuIcon` | — |
| `shortcut` | `string` | — |
| `width` | `number` | — |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<CommandMenuItemRow state="idle" label="Profile" icon="user" shortcut="⌘ P" />
```

## Use when

- Isolating a single row's hover/press animation independently from the full palette.
- Building a custom command palette layout where `command-menu` is too opinionated.
- Animating one specific row's state separately from the rest (e.g., highlighting the chosen action).

## Don't use when

- You want the full palette with search, backdrop, and multiple rows — use `command-menu` instead.
- The row has no icon or shortcut and belongs to a simple dropdown — use `dropdown-menu-item` instead.
- You need a standalone action button, not a menu row — use `button` instead.
