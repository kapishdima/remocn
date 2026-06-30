# fade-through

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 90f @ 30fps

A Material-style content transition: the outgoing text fades to zero, then the incoming text fades in with a soft delay between the two phases. Neither text moves — only opacity changes.

## Install

```bash
shadcn add @remocn/fade-through
```

Lands at `components/remocn/fade-through.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `fromText` | `string` | required |
| `toText` | `string` | required |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<FadeThrough fromText="Before" toText="After" fontSize={72} />
```

## Use when

- One label, stat, or short phrase needs to swap cleanly into another in the same slot.
- The transition should be neutral and unobtrusive — content changes, nothing moves.
- You're following Material motion guidelines where the gap between out and in reinforces the content change.

## Don't use when

- You want the incoming words to arrive one by one — use `per-word-crossfade` for a sequential word-level fade instead.
- The A→B swap should carry kinetic weight or directional momentum — use `line-by-line-slide` (slide direction) or `blur-out-up` (upward drift).
- There is no outgoing text (first entrance only) — skip the "from" slot and use `micro-scale-fade` or `mask-reveal-up` for a single entrance.
