# scale-down-fade

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 90f @ 30fps

Subtle premium settle-in: text enters slightly oversized and scales down to 1× while fading in, landing with a restrained, confident feel. No bounce, no blur — just a precise scale-and-opacity move.

## Install

```bash
shadcn add @remocn/scale-down-fade
```

Lands at `components/remocn/scale-down-fade.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<ScaleDownFade text="Ship faster." fontSize={72} />
```

## Use when

- A headline needs a confident, minimal entrance without any kinetic exaggeration.
- The surrounding content is already in motion and you need one element to settle calmly into focus.
- The brand is clean or corporate and bounce or blur would feel off-brand.

## Don't use when

- You want energy or playfulness — the scale-down reads as composed, not exciting; use `spring-scale-in` for an overshoot bounce instead.
- The text should feel like it is being revealed rather than settling in — use `staggered-fade-up` or `soft-blur-in` for a character-by-character or word-by-word reveal.
- You need an exit animation — scale-down-fade is an entrance only; compose with a separate exit primitive inside a `<Sequence>`.
