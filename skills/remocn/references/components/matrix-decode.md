# matrix-decode

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 90f @ 30fps

Random scramble characters resolve left-to-right into the target text, cycling through a configurable charset before each position locks. Default color is terminal green.

## Install

```bash
shadcn add @remocn/matrix-decode
```

Lands at `components/remocn/matrix-decode.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `charset` | `string` | `"!@#$%^&*()_+-=<>?/\\|"` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#22c55e"` |
| `fontWeight` | `number` | `600` |
| `revealDuration` | `number` | `60` |
| `speed` | `number` | `1` |

## Example

```tsx
<MatrixDecode text="ACCESS GRANTED" charset="!@#$%^&*()_+-=<>?/\\|" color="#22c55e" />
```

## Use when

- A hacker, terminal, or cyberpunk aesthetic is required and the scramble-to-reveal glyph effect is on-brand.
- A short code, token, or technical label should appear as if being deciphered in real time.
- The scene needs a reveal that feels procedural and data-driven rather than designed.

## Don't use when

- The content is a human sentence or marketing copy — the glitchy scramble reads as broken text to non-technical audiences; use `typewriter` for a clean character-by-character reveal with a more legible progression.
- The tone is premium or editorial — use `focus-blur-resolve` or `blur-out-up` for atmospheric reveals without the glitch aesthetic.
- The text is long — the left-to-right lock is designed for short labels and codes; long strings extend `revealDuration` to an uncomfortable length.
