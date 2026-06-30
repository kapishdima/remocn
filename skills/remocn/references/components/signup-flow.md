# signup-flow

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** state-driven

Signup card composition: a shadcn-style card (Full Name, Email, Password, Confirm fields, primary + Google-outline buttons, sign-in footer) whose cursor fills each field top-to-bottom, then clicks Create account (hover → press → loading → success) as a success toast slides in. A pure orchestrator — every channel comes from composed primitive transition hooks.

## Install

```bash
shadcn add @remocn/signup-flow
```

Lands at `components/remocn/signup-flow.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/cursor`, `@remocn/input`, `@remocn/button`, `@remocn/toast`, `@remocn/field`, `@remocn/blur-in` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `"Create an account"` |
| `description` | `string` | `"Enter your information below to create your accou…"` |
| `fullName` | `string` | `"John Doe"` |
| `email` | `string` | `"m@example.com"` |
| `password` | `string` | `"••••••••"` |
| `createLabel` | `string` | `"Create account"` |
| `googleLabel` | `string` | — |
| `signinText` | `string` | — |
| `toastTitle` | `string` | `"Account created"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<SignupFlow title="Create an account" toastTitle="Account created" email="hello@example.com" />
```

## Use when

- Showing a full onboarding or signup flow in a product launch or demo video.
- Demonstrating a realistic form-fill interaction with animated cursor and field progression.
- You need a production-ready auth scene with zero assembly and the default field layout fits.

## Don't use when

- You need a generic form with custom fields — compose `input` + `button` + `cursor` manually instead.
- You only need the success notification — use `toast` directly.
- You need a settings interaction walkthrough — use `settings-toggle-flow` instead.
