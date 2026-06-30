# drawer

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

A bottom panel whose opened/closed state is a pure function of the timeline; the backdrop dim and bottom-edge slide-up are keyframed presets, with a drag handle and a primary action. Self-contained — pair it with `button` as a trigger in a `<AbsoluteFill>`.

## Install

```bash
shadcn add @remocn/drawer
```

Lands at `components/remocn/drawer.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `DrawerState` | `"closed"` |
| `style` | `DrawerStyle` | — |
| `title` | `string` | `"Edit profile"` |
| `description` | `string` | `"Make changes to your profile here. Click save whe…` |
| `actionLabel` | `string` | `"Save changes"` |
| `cancelLabel` | `string` | `"Cancel"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Drawer state="closed" title="Edit profile" actionLabel="Save changes" cancelLabel="Cancel" />
```

## Use when

- Showing a mobile-style bottom sheet sliding up from the edge of the frame.
- Demonstrating a sheet/tray pattern typical of mobile or bottom-anchored desktop UX.
- Composing a trigger-to-sheet sequence: `button` state="press" → `drawer` state="open".

## Don't use when

- The overlay should be a centered modal — use `dialog` instead.
- The action is destructive and needs an explicit confirmation — use `alert-dialog` instead.
- The overlay is non-modal and contextual — use `dropdown-menu` or `context-menu` instead.
