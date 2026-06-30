# blur-out-up

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 90f @ 30fps

Words arrive clean then depart upward with increasing blur, producing an airy, editorial exit. The in-phase is an instant appearance; the motion happens entirely on the way out.

## Install

```bash
shadcn add @remocn/blur-out-up
```

Lands at `components/remocn/blur-out-up.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `staggerDelay` | `number` | `1` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<BlurOutUp text="Move fast." staggerDelay={1} fontSize={72} />
```

## Use when

- A title or tagline needs a graceful upward exit before the next scene cuts in.
- The scene calls for an airy, editorial tone — text that drifts rather than snaps away.
- You need a per-word stagger on exit without any blur-in entrance (the arrival is clean).

## Don't use when

- You want a blurred entrance that resolves to crisp — that is `focus-blur-resolve`, which opens blurry and sharpens in.
- The text is a paragraph or multi-line block where per-word stagger would drag too long; use `line-by-line-slide` for multi-line exits instead.
- The scene needs a hard cut or a simple opacity fade, not an upward drift — use `fade-through` for a clean A→B replacement.
