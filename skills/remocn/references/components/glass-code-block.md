# glass-code-block

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 180f @ 30fps

A premium frosted-glass code editor window with a regex tokenizer and line-by-line stagger reveal. Lines fade and slide in sequentially against a translucent dark panel with traffic-light chrome, making it suitable as a hero background or feature highlight.

## Install

```bash
shadcn add @remocn/glass-code-block
```

Lands at `components/remocn/glass-code-block.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `code` | `string` | `DEFAULT_CODE` |
| `title` | `string` | `"hero.tsx"` |
| `width` | `number` | `760` |
| `height` | `number` | `460` |
| `fontSize` | `number` | `16` |
| `glassColor` | `string` | `"rgba(10, 10, 10, 0.6)"` |
| `staggerFrames` | `number` | `4` |
| `showTrafficLights` | `boolean` | `true` |
| `speed` | `number` | `1` |

## Example

```tsx
<GlassCodeBlock code={DEFAULT_CODE} />
```

## Use when

- A landing or hero scene needs an animated code backdrop that reads as "premium dev tool."
- You want to showcase a code snippet with a styled editor chrome and no interactive narrative.
- The backdrop must stay transparent so the panel composites over a custom background.

## Don't use when

- The scene requires the code to be visibly typed out character by character — use `terminal-simulator` or `typewriter` instead.
