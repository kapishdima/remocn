# button

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

A button whose idle/hover/press/loading/success state is a pure function of the timeline; the loading state composes the Spinner motion atom.

## Install

```bash
shadcn add @remocn/button
```

Lands at `components/remocn/button.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/spinner` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `ButtonState` | `"idle"` |
| `style` | `ButtonStyle` | — |
| `label` | `string` | `"Continue"` |
| `variant` | `ButtonVariant` | `"default"` |
| `size` | `ButtonSize` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |
| `primary` | `string` | — |
| `speed` | `number` | `1` |
| `align` | `"start" \| "center" \| "end"` | `"center"` |

## Example

```tsx
<Button state="idle" label="Get started" variant="default" />
```

## Use when

- Showing the full interactive lifecycle of a CTA — hover → press → loading → success — on the timeline.
- A composition needs a trigger visual for a modal-layer primitive (`dialog`, `alert-dialog`, `drawer`).
- Demonstrating a loading/submit state with a spinner inline inside the button.

## Don't use when

- You need a selectable row inside a menu — use `dropdown-menu-item` or `command-menu-item` instead.
- The button must open a searchable dropdown — use `combobox` (which uses an input trigger) instead.
- You only need a static label with no interactive state — render plain text in the composition.
