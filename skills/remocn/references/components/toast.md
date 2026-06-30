# toast

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Toast notification whose hidden/visible state is a pure function of the timeline. The Toast renderer is a pure function of a ToastStyle (opacity, translateY, scale); `useToastTransition` eases both the slide-in enter and the auto-dismiss exit. Variants default/success/error change the leading icon and its color.

## Install

```bash
shadcn add @remocn/toast
```

Lands at `components/remocn/toast.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `ToastState` | `"hidden"` |
| `style` | `ToastStyle` | — |
| `title` | `string` | required |
| `description` | `string` | — |
| `variant` | `ToastVariant` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Toast title="Changes saved" description="Your settings have been updated." state="hidden" variant="success" />
```

## Use when

- Showing a success/error notification appear after an action (form submit, save, API call).
- Ending a flow composition with a confirmation sliding in — used as the final beat in `signup-flow` and `settings-toggle-flow`.
- Demonstrating auto-dismiss feedback in a product walkthrough with a `hidden → visible → hidden` sequence.

## Don't use when

- The feedback is persistent and must not auto-dismiss — use a banner or inline alert component instead.
- You need a blocking confirmation with actions — use `alert-dialog` instead.
- You need a persistent side panel — use `sheet` instead.
