# simulated-cursor

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 150f @ 30fps

Animated mouse cursor moving between waypoints with click ripple feedback. The cursor follows a path of `CursorPoint` positions on a deterministic frame timeline, firing a ripple animation on click events.

## Install

```bash
shadcn add @remocn/simulated-cursor
```

Lands at `components/remocn/simulated-cursor.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `points` | `CursorPoint[]` | `DEFAULT_POINTS` |
| `color` | `string` | `"#ffffff"` |
| `size` | `number` | `32` |
| `speed` | `number` | `1` |

## Example

```tsx
<AbsoluteFill>
  <Backdrop fill="#f4f4f5" padding={0}>
    <img src="/dashboard-screenshot.png" style={{ width: "100%", height: "100%" }} />
  </Backdrop>
  <SimulatedCursor
    points={[
      { x: 0.3, y: 0.4, frame: 0 },
      { x: 0.6, y: 0.55, frame: 40, click: true },
      { x: 0.8, y: 0.3, frame: 80 },
    ]}
    color="#171717"
    size={28}
  />
</AbsoluteFill>
```

## Use when

- You are recording a screen demo and need a synthetic cursor that moves predictably over a UI screenshot or recording.
- You want to direct viewer attention to a specific UI element by having the cursor hover and click it.
- Pairs with `typewriter` to simulate a user typing into a field after the cursor positions over it.

## Don't use when

- You need a real screen recording — `simulated-cursor` draws a synthetic cursor overlay, not a capture of actual mouse movement; use an actual screen capture tool for that.
- The video is abstract or non-UI (motion graphics, product reveal, text animation) — a floating cursor arrow reads as a UI tutorial and breaks the mood; omit it entirely.
- Cursor path needs sub-pixel precision relative to a dynamic layout — waypoints are normalized 0–1 to frame dimensions; if the UI shifts between scenes, coordinates will misalign.
