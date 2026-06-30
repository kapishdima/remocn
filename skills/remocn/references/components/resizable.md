# resizable

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** 120f @ 30fps

Two panels split by a draggable handle, where the split ratio is a numeric channel plus a handle idle/hover/press channel (dual-channel value-channel deviation). The Resizable renderer is pure; `useResizableTransition` eases both — ratio as numeric lerp, handle visual from state presets. Horizontal and vertical splits; 1px divider + centered grip pill with a derived grab ring.

## Install

```bash
shadcn add @remocn/resizable
```

Lands at `components/remocn/resizable.tsx`. Pulls `@remocn/remocn-ui` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `first` | `ReactNode` | — |
| `second` | `ReactNode` | — |
| `direction` | `ResizableDirection` | `"horizontal"` |
| `ratio` | `number` | `0.5` |
| `handleState` | `ResizableHandleState` | `"idle"` |
| `style` | `ResizableStyle` | `{ width: "100%", height: "100%", display: "flex", … }` |
| `minRatio` | `number` | `0.15` |
| `maxRatio` | `number` | `0.85` |
| `width` | `number` | `440` |
| `height` | `number` | `240` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<Resizable direction="horizontal" ratio={0.4} handleState="hover" />
```

## Use when

- Demonstrating a code/preview split pane layout with its ratio animating across frames.
- Showing a drag-to-resize UI interaction in a product walkthrough with handle hover/press states.
- Visualizing before/after content that morphs its split point on the timeline.

## Don't use when

- You need fixed-width layout panels — plain CSS grid or flex avoids the drag-state overhead entirely.
- The split is purely decorative — `resizable` implies an interactive drag metaphor; use a plain container instead.
- You need more than two panels — `resizable` is two-panel only; compose multiple instances.
