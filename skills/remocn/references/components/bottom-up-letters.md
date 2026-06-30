# bottom-up-letters

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 60f @ 30fps

Letters rise from below in a pronounced staircase cadence, one symbol at a time, with zero blur. The large default `distance` makes each character's travel arc highly visible.

## Install

```bash
shadcn add @remocn/bottom-up-letters
```

Lands at `components/remocn/bottom-up-letters.tsx`.

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
<BottomUpLetters text="Launch." staggerDelay={3} distance={46} />
```

## Use when

- A short punchy word or acronym should land with clear, visible per-character energy.
- The scene has a slow reveal cadence where the staircase wave is the hero moment.
- You want a crisp, sharp reveal without any softness or blur at all.

## Don't use when

- The text is a full sentence or phrase — the high stagger makes long strings feel sluggish; use `per-character-rise` (faster, more even) or `mask-reveal-up` (line-level) instead.
- You want blur or softness in the reveal — `blur-out-up` or `focus-blur-resolve` add atmosphere that this component deliberately omits.
- The entrance should read as smooth and unified rather than letter-by-letter theatrical; use `micro-scale-fade` for a single calm pop.
