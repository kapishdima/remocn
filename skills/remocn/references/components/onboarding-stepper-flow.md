# onboarding-stepper-flow

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** state-driven

A multi-step onboarding composition: a horizontal stepper advances through panels of input, radio, and switch fields, finishing on a Finish button that runs to success. Panel crossfade derives linearly from the stepper's exposed position channel; every other channel comes from a composed primitive's hook.

## Install

```bash
shadcn add @remocn/onboarding-stepper-flow
```

Lands at `components/remocn/onboarding-stepper-flow.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/stepper`, `@remocn/input`, `@remocn/radio`, `@remocn/switch`, `@remocn/button` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `steps` | `string[]` | `DEFAULT_STEPS` |
| `name` | `string` | `"jane@acme.com"` |
| `plans` | `string[]` | `DEFAULT_PLANS` |
| `nextLabel` | `string` | `"Next"` |
| `finishLabel` | `string` | `"Finish"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<OnboardingStepperFlow steps={["Account", "Plan", "Settings"]} name="jane@acme.com" finishLabel="Finish" />
```

## Use when

- Demoing a multi-step onboarding UX (account setup → plan selection → preferences) in one scene.
- Showing progressive form completion with a stepper indicator advancing across panels.
- A product video needs a complete new-user flow from input entry to success without custom orchestration.

## Don't use when

- The flow is a payment checkout — use `checkout-flow` instead (cursor-driven, card entry, toast).
- You need a single-step form — compose `field`, `input`, and `button` directly.
- You need custom step content (images, code blocks, non-form panels) — the flow renders fixed primitive panels; orchestrate manually.
- The flow is a single account sign-up (email/password → success), not multi-step onboarding — use `signup-flow` instead.
