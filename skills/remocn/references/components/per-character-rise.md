# per-character-rise

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 60f @ 30fps

Letters slide up from below with no blur — crisp, deliberate, kinetic. Each character rises independently with an even stagger, landing sharply at the baseline.

## Install

```bash
shadcn add @remocn/per-character-rise
```

Lands at `components/remocn/per-character-rise.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `distance` | `number` | `32` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<PerCharacterRise text="Launch." distance={32} fontSize={72} />
```

## Use when

- A short word or phrase needs a crisp, sharp character-by-character entrance with even, readable stagger.
- The tone is clean and precise — no blur, no dramatic staircase, just steady letters rising into position.
- A heading needs more kinetic energy than `micro-scale-fade` but less theatrical drama than `bottom-up-letters`.

## Don't use when

- You want a dramatic staircase effect where each letter visibly lags the previous — use `bottom-up-letters` for the pronounced, wide-gap stagger instead.
- The text is multiple lines and should reveal line-by-line — use `mask-reveal-up` (upward, masked) or `line-by-line-slide` (directional) for line-level reveals.
- The reveal should include blur or atmospheric softness — use `focus-blur-resolve` (blurred entrance) or `blur-out-up` (blurred exit) when sharpness is not the goal.
