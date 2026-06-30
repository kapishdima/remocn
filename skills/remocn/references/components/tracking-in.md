# tracking-in

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 90f @ 30fps

Letter-spacing collapses from wide to normal while a blur simultaneously clears, both driven by a springy motion curve. The wide-to-tight tracking movement is the designed essence of this component — intentional typographic choreography, not decoration.

## Install

```bash
shadcn add @remocn/tracking-in
```

Lands at `components/remocn/tracking-in.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `startTracking` | `number` | `0.5` |
| `startBlur` | `number` | `12` |
| `fontSize` | `number` | `96` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `700` |
| `speed` | `number` | `1` |

## Example

```tsx
<TrackingIn text="PRECISION" startTracking={0.5} startBlur={12} fontSize={96} />
```

## Use when

- A title word or brand name should feel like it is focusing into place — tracking collapse is the right metaphor for clarity, precision, or sharpness.
- The design is typographically driven and the letter-spacing motion is the centerpiece of the entrance.
- A premium or cinematic tone is required — the spring-driven collapse reads as designed and intentional, not incidental.

## Don't use when

- You want per-character stagger — `tracking-in` moves all letters as one unit; use `soft-blur-in` for a per-character blur-and-rise stagger instead.
- The text is a sentence rather than a single bold word — wide initial tracking on a long phrase is illegible until it collapses; use `staggered-fade-up` for multi-word body text.
- The scene is playful or casual — the typographic tracking motion reads as serious and editorial; use `spring-scale-in` for a bouncy entrance instead.
