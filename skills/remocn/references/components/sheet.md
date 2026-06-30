# sheet

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Side panel whose opened/closed state is a pure function of the timeline; the backdrop dim and right-edge slide-in are keyframed presets, with a close button and a primary action. Self-contained — pair it with the Button as a trigger.

## Install

```bash
shadcn add @remocn/sheet
```

Lands at `components/remocn/sheet.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `SheetState` | `"closed"` |
| `style` | `SheetStyle` | — |
| `title` | `string` | `"Edit profile"` |
| `description` | `string` | `"Make changes to your profile here. Click save when…"` |
| `actionLabel` | `string` | `"Save changes"` |
| `cancelLabel` | `string` | `"Cancel"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Sheet state="closed" title="Edit profile" actionLabel="Save changes" />
```

## Use when

- Showing a slide-in edit panel or settings drawer with backdrop dim in a product demo.
- Demonstrating an offcanvas overlay opening from the right edge of the frame.
- Pairing with a `button` trigger to animate open → interact → close across the timeline.

## Don't use when

- You need a full blocking modal with centered placement — use `alert-dialog` instead.
- The overlay is a floating contextual card near a target element — use `popover` instead.
- You only need a brief notification — use `toast` instead (no backdrop, no action panel).
- The panel should slide up from the bottom edge — use `drawer` instead; `sheet` enters from a side edge.
