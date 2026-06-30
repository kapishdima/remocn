# top-down-letters

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 60f @ 30fps

Letters descend from above in a pronounced staircase — one character at a time — with a large vertical offset and zero blur. Sharp, structural, and authoritative; each letter snaps into its baseline position in sequence.

## Install

```bash
shadcn add @remocn/top-down-letters
```

Lands at `components/remocn/top-down-letters.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `staggerDelay` | `number` | `3` |
| `distance` | `number` | `46` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<TopDownLetters text="LAUNCH" staggerDelay={3} distance={46} fontSize={72} />
```

## Use when

- A single uppercase word or short acronym should enter with structural weight — each letter landing like a stamp.
- The scene calls for a sharp, graphic title card where the sequential drop reinforces the word's rhythm.
- You want per-letter stagger with a pronounced vertical distance (default 46px) that reads clearly at large font sizes.

## Don't use when

- The text is more than ~8 characters — many letters dropping sequentially stretches the animation and the last letters feel delayed; use `staggered-fade-up` for longer phrases.
- You want blur or softness on entry — `top-down-letters` is zero-blur by design; use `soft-blur-in` for the Apple-style per-character blur reveal.
- The stagger direction should be horizontal or spatial — use `short-slide-right` for a left-to-right group glide or `tracking-in` for a letter-spacing collapse instead.
- The letters should rise from below rather than drop from above — use `bottom-up-letters`, the identical-cadence upward mirror.
