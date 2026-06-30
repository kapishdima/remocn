# dialog

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

A modal dialog whose opened/closed state is a pure function of the timeline; the backdrop dim and popup zoom are keyframed presets, with a close button and a primary action. Self-contained — pair it with `button` as a trigger in a `<AbsoluteFill>`.

## Install

```bash
shadcn add @remocn/dialog
```

Lands at `components/remocn/dialog.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `DialogState` | `"closed"` |
| `style` | `DialogStyle` | — |
| `title` | `string` | `"Edit profile"` |
| `description` | `string` | `"Make changes to your profile here. Click save whe…` |
| `actionLabel` | `string` | `"Save changes"` |
| `cancelLabel` | `string` | `"Cancel"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Dialog state="closed" title="Edit profile" actionLabel="Save changes" cancelLabel="Cancel" />
```

## Use when

- Showing a non-destructive modal (edit form, settings, profile update) opening and closing on the timeline.
- A centered overlay needs a title, description, and primary/cancel actions.
- Composing a trigger-to-modal sequence: `button` state="press" → `dialog` state="open".

## Don't use when

- The action is irreversible or destructive — use `alert-dialog` instead.
- The panel should slide from the bottom edge — use `drawer` instead.
- The overlay is non-modal and contextual — use `dropdown-menu` or `context-menu` instead.
