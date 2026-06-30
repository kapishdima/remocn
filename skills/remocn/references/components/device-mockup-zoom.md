# device-mockup-zoom

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 120f @ 30fps

Pulls back from a close UI view to reveal it sitting inside a laptop or phone frame. The camera starts zoomed in on content and eases out to show the full device mockup — a classic app demo reveal.

## Install

```bash
shadcn add @remocn/device-mockup-zoom
```

Lands at `components/remocn/device-mockup-zoom.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | — |
| `device` | `"laptop" \| "phone"` | `"laptop"` |
| `frameColor` | `string` | `"#1f1f1f"` |
| `screenColor` | `string` | `"#0a0a0a"` |
| `speed` | `number` | `1` |

## Example

```tsx
<DeviceMockupZoom device="laptop" frameColor="#1a1a1a">
  <img src="/app-screenshot.png" style={{ width: "100%", height: "100%" }} />
</DeviceMockupZoom>
```

## Use when

- An app demo video needs the classic "zoom out to reveal the product in a device" moment.
- You want to frame a UI screenshot or screen recording inside a recognizable hardware context.
- The scene transitions from a feature detail into a full product shot — pass the detail view as `children`.

## Don't use when

- You are transitioning between two unrelated scenes — this is a reveal effect for a single piece of UI content, not a scene-to-scene swap; use `directional-wipe`, `spatial-push`, or `frosted-glass-wipe` instead.
- The content inside is already framed in a mockup — double-wrapping creates a device-within-a-device; nest the raw UI as `children` instead.
- The video format is vertical/portrait and `device="laptop"` — the wide laptop frame will clash with a 9:16 canvas; switch to `device="phone"` or use a full-bleed layout instead.
