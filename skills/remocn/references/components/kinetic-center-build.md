# kinetic-center-build

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 60f @ 30fps

A word appears in the center; each subsequent word enters from the right and pushes the line outward until the full phrase locks into a centered final position. The growing line snaps to center as it builds.

## Install

```bash
shadcn add @remocn/kinetic-center-build
```

Lands at `components/remocn/kinetic-center-build.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `entryOffset` | `number` | `88` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<KineticCenterBuild text="Ship great video." entryOffset={88} fontSize={72} />
```

## Use when

- A short headline should build word by word with satisfying kinetic momentum, locking centered at the end.
- The reveal itself is the hero moment — the growing centered line carries visual weight through motion.
- Premium product or brand video needs a high-energy entrance for a 3–6 word phrase.

## Don't use when

- The text is long (7+ words) — the centering re-balance on each word becomes distracting; use `line-by-line-slide` for multi-word or multi-line phrases.
- The entrance should feel calm and neutral rather than kinetic — use `micro-scale-fade` or `mask-reveal-up` for composed, quiet reveals.
- Words should fade in sequentially with a vertical drift rather than push from the right — use `per-word-crossfade` for that calm keynote rhythm.
