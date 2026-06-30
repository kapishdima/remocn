# mask-reveal-up

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 90f @ 30fps

Lines reveal upward through a soft clip mask with a compact stagger between each line. Text stays in place after the reveal — no exit animation.

## Install

```bash
shadcn add @remocn/mask-reveal-up
```

Lands at `components/remocn/mask-reveal-up.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `distance` | `number` | `30` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<MaskRevealUp text={"Build.\nShip.\nRepeat."} distance={30} fontSize={72} />
```

## Use when

- A multi-line headline or stacked list needs a clean, contained upward reveal that holds on screen.
- The reveal should feel composed and intentional — no overshooting, no blur, no lateral movement.
- A neutral entrance is needed that works across tones (product, editorial, corporate) without imposing personality.

## Don't use when

- You need an exit animation too — `mask-reveal-up` holds in place after reveal; use `line-by-line-slide` for a reveal that also exits to the right.
- The reveal should be character-level rather than line-level — use `per-character-rise` (clean, sharp) or `bottom-up-letters` (staircase, dramatic) for letter-by-letter entrances.
- Blur or atmospheric softness should accompany the upward motion — use `blur-out-up` (blurred exit) or `focus-blur-resolve` (blurred entrance) instead.
