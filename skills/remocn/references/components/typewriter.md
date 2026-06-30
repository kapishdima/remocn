# typewriter

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Character-by-character text reveal with a deterministic blinking cursor. Text appears one glyph at a time at a fixed characters-per-second rate; the caret blinks on a frame-derived cycle, never on a timer.

## Install

```bash
shadcn add @remocn/typewriter
```

Lands at `components/remocn/typewriter.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/caret` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `cursor` | `boolean` | `true` |
| `charsPerSecond` | `number` | `22` |
| `speed` | `number` | `1` |
| `fontSize` | `number` | `48` |
| `color` | `string` | `"#171717"` |
| `cursorColor` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |

## Example

```tsx
<Typewriter text="npm install remocn" charsPerSecond={22} fontSize={72} />
```

## Use when

- Simulating a command being typed into a terminal or input — pairs with `terminal-simulator`.
- A title should feel "authored live" rather than appearing all at once.
- You need the reveal duration to track text length predictably (`charsPerSecond` makes it deterministic).

## Don't use when

- The text is long — typing a paragraph at a readable speed eats far more frames than a viewer will wait; use `staggered-fade-up` or `blur-out-up` instead.
- You want a designed, weighted entrance (springy, blurred, kinetic) — typing reads as plain/utilitarian; reach for `tracking-in` or `kinetic-center-build`.
- Multiple lines should reveal together — typing is inherently sequential and single-stream.
