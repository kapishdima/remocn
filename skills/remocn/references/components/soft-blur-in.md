# soft-blur-in

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 60f @ 30fps

Per-character fade-in with a gentle blur that clears and a slight upward drift — Apple's signature hero-title reveal. Each character enters from below with blur, making long text feel effortless rather than heavy.

## Install

```bash
shadcn add @remocn/soft-blur-in
```

Lands at `components/remocn/soft-blur-in.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `blur` | `number` | `12` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<SoftBlurIn text="The fastest way to ship." blur={12} fontSize={72} />
```

## Use when

- A hero headline needs the Apple-style per-character soft reveal — premium, airy, cinematic.
- The text is long enough that a word-by-word stagger would take too long; per-character stagger with blur reads faster.
- The overall scene is clean and bright, letting the blur-clear motion read clearly against the background.

## Don't use when

- You want a hard exit animation — `soft-blur-in` is an entrance only; pair with `blur-out-up` in a `<Sequence>` for a matching exit.
- The vibe is tech, gritty, or high-energy — the soft blur reads as refined and calm; use `rgb-glitch-text` or `tracking-in` for a sharper feel.
- You are swapping between two texts — use `shared-axis-z` or `shared-axis-y` which handle both the outgoing and incoming content.
