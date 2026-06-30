# focus-blur-resolve

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 90f @ 30fps

A cinematic focus pull: text opens heavy-blurred, sharpens to full crispness at the climax, then softly blurs out on exit. The full arc — in, hold, out — plays within a single clip.

## Install

```bash
shadcn add @remocn/focus-blur-resolve
```

Lands at `components/remocn/focus-blur-resolve.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `blur` | `number` | `14` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<FocusBlurResolve text="Clarity." blur={14} fontSize={72} />
```

## Use when

- A hero word or short phrase should feel like a camera lens pulling into focus.
- The scene calls for a full in-and-out arc in a single component without composing separate entrance and exit clips.
- Premium cinematic aesthetics are required — the blur depth conveys intentional production quality.

## Don't use when

- You want a clean departure upward after a crisp entrance — that arc belongs to `blur-out-up`, which arrives clean and exits with upward blur.
- The text is multiple lines or a paragraph — the blur radius is designed for a single short phrase; use `mask-reveal-up` or `line-by-line-slide` for multi-line reveals.
- The entrance should be sharp from frame one — use `kinetic-center-build` or `per-character-rise` when there should be no blurry opener.
- You want a blur entrance that holds crisp with no exit — `focus-blur-resolve` forces a blur-out departure; use `soft-blur-in` for an entrance-only blur reveal.
