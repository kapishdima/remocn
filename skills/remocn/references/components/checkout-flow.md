# checkout-flow

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** state-driven

A cursor-driven checkout card: the card and its fields blur-in, then the pointer flips a billing-cycle toggle, types a card number, ticks the terms checkbox, and presses Pay through to success, ending in a toast. A pure orchestrator — every channel comes from a composed primitive's transition hook.

## Install

```bash
shadcn add @remocn/checkout-flow
```

Lands at `components/remocn/checkout-flow.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/toggle-group`, `@remocn/input`, `@remocn/checkbox`, `@remocn/button`, `@remocn/field`, `@remocn/blur-in`, `@remocn/cursor`, `@remocn/toast` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `"Upgrade your plan"` |
| `description` | `string` | `"Complete your purchase to unlock every feature."` |
| `plans` | `ToggleGroupItem[]` | `DEFAULT_PLANS` |
| `cardLabel` | `string` | `"Card number"` |
| `cardPlaceholder` | `string` | `"4242 4242 4242 4242"` |
| `termsLabel` | `string` | `"I accept the terms and conditions"` |
| `payLabel` | `string` | `"Pay $49"` |
| `toastTitle` | `string` | `"Payment successful"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<CheckoutFlow title="Upgrade your plan" payLabel="Pay $49" toastTitle="Payment successful" />
```

## Use when

- Demoing a SaaS payment or upgrade UX end-to-end with cursor navigation and toast confirmation.
- A product video needs a complete purchase journey (plan select → card entry → pay → success) in one scene.
- Showing the full checkout funnel without assembling the individual primitives manually.

## Don't use when

- You only need a payment form without cursor animation — compose `field`, `input`, `button` manually.
- The flow is a multi-step onboarding (not payment) — use `onboarding-stepper-flow` instead.
- You need custom timing control over individual steps — orchestrate the primitives directly.
