# cursor

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

An animated cursor that moves between waypoints, clicks (ripple), and drags. The Cursor renderer is a pure function of a numeric `CursorStyle` channel; `useCursorPath` reads the frame and eases the path, ripple, and press phases.

## Install

```bash
shadcn add @remocn/cursor
```

Lands at `components/remocn/cursor.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `style` | `CursorStyle` | — |
| `variant` | `CursorVariant` | `"arrow"` |
| `size` | `number` | `28` |
| `theme` | `Partial<RemocnTheme>` | — |
| `rippleColor` | `string` | — |

## Example

```tsx
<Cursor variant="arrow" size={28} rippleColor="#3b82f6" />
```

## Use when

- Guiding the viewer's attention through a UI by animating a pointer between elements.
- Showing click, hover, and drag interactions in a product demo without real interactivity.
- Composing inside `checkout-flow` or a custom orchestrator where the cursor drives the narrative.

## Don't use when

- You need a blinking text insertion cursor — use `caret` instead.
- There is no interaction to demonstrate and the cursor would be visual noise.
- You need a crosshair or custom SVG cursor — the variant set is `arrow` / `pointer`; extend or render custom SVG directly.
