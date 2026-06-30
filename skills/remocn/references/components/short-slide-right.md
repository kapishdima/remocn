# short-slide-right

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 60f @ 30fps

The whole phrase glides in from the left as one compact horizontal move while individual words reveal sequentially through opacity, landing as a single unified block.

## Install

```bash
shadcn add @remocn/short-slide-right
```

Lands at `components/remocn/short-slide-right.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `distance` | `number` | `24` |
| `staggerDelay` | `number` | `3` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<ShortSlideRight text="Move fast." distance={24} staggerDelay={3} fontSize={72} />
```

## Use when

- A short headline should enter with horizontal momentum — reads as forward motion or progress.
- You want word-level opacity stagger layered on top of a single group translation, giving depth without complexity.
- The composition requires a fast (60f) entrance that feels purposeful and directional.

## Don't use when

- You are transitioning between two texts — use `shared-axis-z` (depth) or `shared-axis-y` (vertical swap) which handle the outgoing content.
- You want vertical stacking motion — use `short-slide-down` where each word drops onto its own line to build a layout.
- The slide distance needs to be large or cinematic — `short-slide-right` is intentionally compact (default 24px); use a custom composition for a wide pan.
