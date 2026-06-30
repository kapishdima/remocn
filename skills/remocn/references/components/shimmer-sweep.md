# shimmer-sweep

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 120f @ 30fps

A light-shine sweeps horizontally across muted text via `background-clip: text`, transitioning each character from the `baseColor` to the bright `shineColor` and back. Reads like a reflection passing over polished metal or glass.

## Install

```bash
shadcn add @remocn/shimmer-sweep
```

Lands at `components/remocn/shimmer-sweep.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `baseColor` | `string` | `"#3f3f46"` |
| `shineColor` | `string` | `"#fafafa"` |
| `fontSize` | `number` | `96` |
| `fontWeight` | `number` | `700` |
| `speed` | `number` | `1` |

## Example

```tsx
<ShimmerSweep text="Pro plan" baseColor="#3f3f46" shineColor="#fafafa" fontSize={96} />
```

## Use when

- Highlighting a product name or pricing tier with a refined, metallic gleam — luxury SaaS, pricing slides.
- The text is already visible and you want a continuous or looped attention effect rather than an entrance.
- The design calls for a dark background where a light sweep across dark text creates contrast without a harsh cut.

## Don't use when

- You need the text to enter the scene — shimmer-sweep does not animate the text in; use `tracking-in` or `soft-blur-in` for the entrance, then layer a shimmer if needed.
- The brand aesthetic is casual or energetic — the metallic sweep reads as premium/luxury; use `spring-scale-in` or `staggered-fade-up` for a lighter feel.
- You want per-character color or gradient control — `shimmer-sweep` sweeps a single shine beam; use `rgb-glitch-text` for character-level color splitting.
