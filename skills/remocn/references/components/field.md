# field

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** state-driven

A static layout family for composing labeled form controls, modeled on shadcn's Field: `FieldGroup` ▸ `Field` ▸ `FieldLabel` / `FieldControl` / `FieldDescription`. Reads no frame and holds no state — colors come from the resolved theme. `FieldControl` is a relative fixed-height slot for the absolute remocn-ui controls (`input`, `button`).

## Install

```bash
shadcn add @remocn/field
```

Lands at `components/remocn/field.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | required |
| `gap` | `number` | `16` |
| `style` | `CSSProperties` | — |

## Example

```tsx
<FieldGroup gap={16}>
  <Field>
    <FieldLabel>Email</FieldLabel>
    <FieldControl><Input state="idle" /></FieldControl>
    <FieldDescription>We'll never share your email.</FieldDescription>
  </Field>
</FieldGroup>
```

## Use when

- Laying out one or more labeled form controls (label + animated input + description hint) with consistent vertical spacing.
- Composing a form scene inside `checkout-flow` or `onboarding-stepper-flow` where multiple inputs need structural alignment.
- Wrapping any remocn-ui control that needs a visible label above it without hardcoding layout math.

## Don't use when

- You need the control itself to animate — `field` is static layout only; place `input`, `button`, or other primitives inside it.
- There is only one unlabeled control — skip `field` and use the primitive directly.
- The layout is horizontal or grid-based — `field` only stacks vertically via `FieldGroup`.
