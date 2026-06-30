# slot-machine-roll

**Tier:** `remocn` (animation) · **Vibe:** playful · **Natural length:** 90f @ 30fps

A vertical character reel scrolls from one string value to another, like a slot machine drum spinning to a new result. Accepts arbitrary string inputs including currency symbols, units, and mixed characters.

## Install

```bash
shadcn add @remocn/slot-machine-roll
```

Lands at `components/remocn/slot-machine-roll.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `from` | `string` | `"$99"` |
| `to` | `string` | `"$199"` |
| `fontSize` | `number` | `120` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `700` |
| `speed` | `number` | `1` |

## Example

```tsx
<SlotMachineRoll from="$99" to="$199" fontSize={120} />
```

## Use when

- Revealing a price change, plan upgrade, or before/after value where the string includes symbols (`$`, `%`, `×`).
- You want a playful, casino-reel feel on a pricing or comparison slide.
- The values are short (1–6 characters) and the character-by-character drum motion will be legible.

## Don't use when

- The value is a large pure integer like `1,240,000` — use `rolling-number` which animates each decimal place independently and reads as a serious data metric.
- The text is more than ~6 characters — long strings become hard to read while the reel spins; use `staggered-fade-up` to reveal a longer phrase.
- The brand tone is formal or data-driven — the slot machine metaphor is inherently playful; use `rolling-number` for a composed odometer feel.
