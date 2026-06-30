# stepper

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Horizontal onboarding stepper whose progress is a pure function of a continuous step index (value-channel deviation). Every circle (fill, number, stroke-dash check) and connector (primary fill fraction) derives purely from the float position; `useStepperTransition` reads the frame and eases position between step indices.

## Install

```bash
shadcn add @remocn/stepper
```

Lands at `components/remocn/stepper.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `steps` | `string[]` | `DEFAULT_STEPS` |
| `activeIndex` | `number` | `0` |
| `style` | `StepperStyle` | — |
| `orientation` | `StepperOrientation` | — |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Stepper steps={["Account", "Profile", "Billing", "Review"]} activeIndex={2} />
```

## Use when

- Showing a multi-step onboarding, checkout, or wizard flow advancing through numbered steps.
- Demonstrating step completion with animated check marks, circle fills, and connector fills.
- Visualizing a user's progress through a sequential workflow with discrete labeled stages.

## Don't use when

- Steps have no sequential order — use `tabs` instead (tab switching without numbered connectors).
- You need a continuous fill bar without numbered steps — use `progress` instead.
- You need a compact segmented control that switches view modes — use `toggle-group` instead.
