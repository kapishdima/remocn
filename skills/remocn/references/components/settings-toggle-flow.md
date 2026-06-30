# settings-toggle-flow

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** state-driven

Two-column settings card composition: the card and its controls blur-in, then a cursor flips a switch, opens a select, drags a labeled slider, and clicks Save, ending in a saved toast. A pure orchestrator — every channel comes from a composed primitive's transition hook.

## Install

```bash
shadcn add @remocn/settings-toggle-flow
```

Lands at `components/remocn/settings-toggle-flow.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/switch`, `@remocn/select`, `@remocn/slider`, `@remocn/button`, `@remocn/blur-in`, `@remocn/cursor`, `@remocn/toast` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `"Notification settings"` |
| `description` | `string` | `"Manage how you receive alerts"` |
| `rows` | `{ label: string }[]` | `DEFAULT_ROWS` |
| `selectItems` | `string[]` | `DEFAULT_SELECT_ITEMS` |
| `saveLabel` | `string` | `"Save settings"` |
| `toastTitle` | `string` | `"Settings saved"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<SettingsToggleFlow title="Notification settings" toastTitle="Settings saved" />
```

## Use when

- Showing a complete settings interaction walkthrough for a product demo — zero assembly required.
- Demonstrating multiple UI primitives orchestrated in sequence: switch, select, slider, then toast.
- You need a production-ready settings scene and the default layout matches your content.

## Don't use when

- You need only one control type — use `switch`, `select`, or `slider` individually instead.
- Your settings layout differs from the default two-column card — compose primitives manually for full control.
- You need custom cursor timing or interaction order — wire `cursor` directly with individual primitives instead.
