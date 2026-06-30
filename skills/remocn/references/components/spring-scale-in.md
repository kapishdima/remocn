# spring-scale-in

**Tier:** `remocn` (animation) · **Vibe:** playful · **Natural length:** 60f @ 30fps

Words pop in with a soft overshoot scale, each bouncing slightly past 1× before settling — like a physical spring releasing. The stagger delay controls how quickly successive words snap into position.

## Install

```bash
shadcn add @remocn/spring-scale-in
```

Lands at `components/remocn/spring-scale-in.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `staggerDelay` | `number` | `3` |
| `scaleFrom` | `number` | `0.7` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<SpringScaleIn text="Let's go." staggerDelay={3} scaleFrom={0.7} fontSize={72} />
```

## Use when

- The scene calls for energy and bounce — product launches, celebration moments, fun CTAs.
- You want each word to feel like it physically snaps into place, giving kinetic weight to short phrases.
- The audience is consumer-facing and a playful entrance matches the brand tone.

## Don't use when

- The brand is serious, corporate, or premium — spring bounce reads as casual; use `scale-down-fade` or `soft-blur-in` for a composed entrance instead.
- The text is long — many words bouncing in rapid succession becomes visually noisy; use `staggered-fade-up` for a calmer word-by-word reveal.
- You need precise timing for a word to land on a beat — spring physics are frame-accurate but the overshoot makes the visual "land" slightly after the spring resolves.
