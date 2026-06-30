# micro-scale-fade

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 60f @ 30fps

A calm, tiny scale pop — text fades in while scaling up from `scaleFrom` to 1.0. The movement is almost imperceptible at the default value, providing premium polish without visible animation drama.

## Install

```bash
shadcn add @remocn/micro-scale-fade
```

Lands at `components/remocn/micro-scale-fade.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `scaleFrom` | `number` | `0.96` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<MicroScaleFade text="Coming soon." scaleFrom={0.96} fontSize={48} />
```

## Use when

- A label, subheading, or supporting text needs an entrance that feels polished without drawing attention to itself.
- The scene already has a hero animation and supporting text should enter quietly underneath it.
- A single block of text needs to appear in a neutral, cross-tone way that works for product, SaaS, or corporate video.

## Don't use when

- The reveal should be the hero moment with visible kinetic weight — use `kinetic-center-build` or `per-character-rise` for entrances that command attention.
- Text should enter per-character or per-word rather than as a unified block — use `bottom-up-letters`, `per-character-rise`, or `per-word-crossfade` for staged reveals.
- The text needs to also exit — `micro-scale-fade` is entrance-only; use `blur-out-up` or `fade-through` when an exit arc is required.
