# number-wheel

**Tier:** `remocn` (animation) · **Vibe:** data · **Natural length:** 112f @ 30fps

A mechanical odometer that rolls an integer up or down to its target value. Direction is inferred automatically from `from` and `to` — no configuration needed.

## Install

```bash
shadcn add @remocn/number-wheel
```

Lands at `components/remocn/number-wheel.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `from` | `number` | required |
| `to` | `number` | required |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `speed` | `number` | `1` |

## Example

```tsx
<NumberWheel from={0} to={9999} fontSize={72} color="#171717" />
```

## Use when

- A metric, stat, or count should animate to its value in a satisfying odometer roll.
- A data-driven scene needs a number to tick up (or down) to convey growth, reduction, or change.
- Dashboard-style video content requires a numeric reveal with clear direction and mechanical rhythm.

## Don't use when

- The value is not an integer — this component is designed for whole numbers; format decimals upstream before passing them in.
- The number should appear all at once without rolling — use `micro-scale-fade` for a static entrance of a pre-formatted number string.
- The scene requires text alongside the number to animate together — compose `NumberWheel` with a static text node in a flex container rather than embedding units in the `to` value.
- The value carries a prefix or suffix like `$99` or `1.2M` — use `slot-machine-roll` (accepts arbitrary strings); for very large multi-digit metrics counting up, `rolling-number` is purpose-tuned.
