# alert-dialog

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

A modal alert dialog whose opened/closed state is a pure function of the timeline; the backdrop dim and popup zoom are keyframed presets. Self-contained — pair it with `button` as a trigger in a `<AbsoluteFill>`.

## Install

```bash
shadcn add @remocn/alert-dialog
```

Lands at `components/remocn/alert-dialog.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `AlertDialogState` | `"closed"` |
| `style` | `AlertDialogStyle` | — |
| `title` | `string` | `"Delete account?"` |
| `description` | `string` | `"This action cannot be undone. This will permanent…` |
| `actionLabel` | `string` | `"Delete"` |
| `cancelLabel` | `string` | `"Cancel"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<AlertDialog state="closed" title="Delete account?" actionLabel="Delete" cancelLabel="Cancel" />
```

## Use when

- Showing a destructive confirmation dialog (delete, reset, revoke) in a product demo.
- Demonstrating the "are you sure?" UX pattern with a backdrop dim and zoom entrance.
- A modal must block the rest of the composition until dismissed by the timeline.

## Don't use when

- The action is non-destructive or form-based — use `dialog` instead.
- You need a non-modal contextual overlay — use `dropdown-menu` or `context-menu` instead.
- The overlay should slide from the bottom edge — use `drawer` instead.
