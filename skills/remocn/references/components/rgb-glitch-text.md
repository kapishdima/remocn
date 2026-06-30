# rgb-glitch-text

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 90f @ 30fps

Three RGB-offset copies of the text jitter and separate for a brief glitch window before snapping back into register. The displacement is deterministic via a `seed` string so the same glitch plays identically every render.

## Install

```bash
shadcn add @remocn/rgb-glitch-text
```

Lands at `components/remocn/rgb-glitch-text.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `fontSize` | `number` | `96` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `700` |
| `glitchAt` | `number` | `20` |
| `glitchDuration` | `number` | `8` |
| `intensity` | `number` | `6` |
| `seed` | `string` | `"glitch"` |
| `speed` | `number` | `1` |

## Example

```tsx
<RGBGlitchText text="SYSTEM ERROR" fontSize={96} glitchAt={20} intensity={6} />
```

## Use when

- A tech, hacker, or cyberpunk scene needs a moment of digital corruption on a title.
- You want a deterministic glitch that renders identically every time (use `seed` to vary it per clip).
- The entrance is already complete and you want a brief mid-scene disruption rather than a full reveal animation.

## Don't use when

- You need a full text entrance animation — the glitch is a momentary effect, not a reveal; use `tracking-in` or `soft-blur-in` to bring text in.
- The brand aesthetic is clean or premium — RGB splits read as intentionally broken; use `shimmer-sweep` for a high-end shimmer moment instead.
- The text is long — offset copies of a full paragraph are illegible during the glitch window; keep it to a short word or phrase.
