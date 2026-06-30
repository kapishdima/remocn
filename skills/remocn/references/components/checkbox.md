# checkbox

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

A checkbox whose checked/unchecked state is a pure function of the timeline; the box fill, border, and checkmark draw are keyframed presets.

## Install

```bash
shadcn add @remocn/checkbox
```

Lands at `components/remocn/checkbox.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `state` | `CheckboxState` | `"unchecked"` |
| `style` | `CheckboxStyle` | — |
| `label` | `string` | — |
| `size` | `CheckboxSize` | `"default"` |
| `theme` | `Partial<RemocnTheme>` | — |
| `primary` | `string` | — |
| `align` | `"start" \| "center" \| "end"` | `"center"` |

## Example

```tsx
<Checkbox state="unchecked" label="I accept the terms and conditions" />
```

## Use when

- Showing a task being checked off in a to-do or onboarding list.
- Demonstrating a boolean form option toggling on (or off) at a timeline-driven moment.
- Composing inside `checkout-flow` or `onboarding-stepper-flow` for a terms-acceptance step.

## Don't use when

- The choice is mutually exclusive within a group — use `radio` instead.
- You need a toggle switch metaphor — use `switch` instead.
- The user picks one option from a long or searchable list — use `combobox` instead (a checkbox group already is the multi-select metaphor).
