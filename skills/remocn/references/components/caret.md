# caret

**Tier:** `remocn-ui` (primitive) · **Vibe:** tech · **Natural length:** 120f @ 30fps

A blinking text caret — a controlled vertical bar, or a pure motion atom that blinks deterministically from `useCurrentFrame`. No external deps; no theme wiring.

## Install

```bash
shadcn add @remocn/caret
```

Lands at `components/remocn/caret.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `color` | `string` | `"currentColor"` |
| `width` | `number` | `2` |
| `height` | `number` | `18` |
| `radius` | `number` | `1` |
| `opacity` | `number` | — |
| `blink` | `boolean` | `false` |
| `blinkPerSecond` | `number` | `1` |
| `speed` | `number` | `1` |
| `marginLeft` | `number` | `0` |
| `style` | `CSSProperties` | — |

## Example

```tsx
<Caret color="#171717" blink blinkPerSecond={1} height={24} />
```

## Use when

- Placing a blinking insertion cursor beside a text node or at the end of a typed string.
- Composing inside a custom typewriter or terminal scene where `typewriter` is too opinionated.
- Indicating an active input position before the `input` primitive's focus ring animation starts.

## Don't use when

- You need the full input UX (focus ring, border, value reveal) — use `input` instead, which owns its own caret.
- The typewriter effect is needed — use `typewriter`, which composes `caret` internally.
- You need a text selection highlight rather than an insertion point.
