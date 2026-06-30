# rolling-number

**Tier:** `remocn` (animation) · **Vibe:** data · **Natural length:** 150f @ 30fps

Odometer-style counter where each decimal place scrolls at its own speed, new digits rising into view and settling exactly on the target value. Built for large numeric metrics — revenue, user counts, impressions — where place-by-place motion communicates scale.

## Install

```bash
shadcn add @remocn/rolling-number
```

Lands at `components/remocn/rolling-number.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `from` | `number` | `0` |
| `to` | `number` | `24813` |
| `fontSize` | `number` | `120` |
| `color` | `string` | `"#171717"` |
| `speed` | `number` | `1` |

## Example

```tsx
<RollingNumber from={0} to={1240000} fontSize={120} />
```

## Use when

- Animating a large integer metric on a stats or milestone slide (revenue, signups, impressions).
- You need each digit place to animate independently so the viewer can read the number building up.
- The `from`/`to` values are pure numbers with no currency symbol or unit mixed into the string.

## Don't use when

- The value includes a prefix or suffix like `$99` or `1.2M` — use `slot-machine-roll` which accepts arbitrary strings instead.
- The number change is small or decorative and you want a playful reel feel rather than a data-serious odometer; `slot-machine-roll` reads friendlier.
- The counter is a secondary UI element that should feel lightweight — 150f is a long animation; shorten with `speed` or pick a simpler fade.
- The value is a small integer or needs to count DOWN — use `number-wheel` (direction inferred from `from`/`to`, lighter 112f); `rolling-number` is tuned for large multi-digit metrics counting up.
