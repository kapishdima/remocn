# image-expand-to-fullscreen

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 180f @ 30fps

An image lifts out of a social feed post thumbnail and morphs into a fullscreen editor UI with toolbars sliding in. The morph interpolates position, size, and border-radius simultaneously — a native-feeling shared-element transition for app demo storytelling.

## Install

```bash
shadcn add @remocn/image-expand-to-fullscreen
```

Lands at `components/remocn/image-expand-to-fullscreen.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `from` | `ImageExpandRect` | `DEFAULT_FROM` |
| `to` | `ImageExpandRect` | `DEFAULT_TO` |
| `borderRadiusFrom` | `number` | `12` |
| `borderRadiusTo` | `number` | `16` |
| `morphAt` | `number` | `30` |
| `imageColorA` | `string` | `"#ff6b6b"` |
| `imageColorB` | `string` | `"#845ec2"` |
| `imageColorC` | `string` | `"#4d8dff"` |
| `feedBackground` | `string` | `"#f4f4f5"` |
| `editorBackground` | `string` | `"#0a0a0a"` |
| `accent` | `string` | `"#fafafa"` |
| `postAuthor` | `string` | `"Maya Larsson"` |
| … | +2 more | |

## Example

```tsx
<ImageExpandToFullscreen
  borderRadiusFrom={16}
  borderRadiusTo={0}
  morphAt={24}
  imageColorA="#6366f1"
  imageColorB="#8b5cf6"
  imageColorC="#a78bfa"
  feedBackground="#f9f9fb"
  editorBackground="#09090b"
/>
```

## Use when

- You are demoing an image editing, content creation, or media app and want to show the "tap to open" interaction as a cinematic moment.
- A product storytelling video needs to show a social context (feed) transitioning into the full product UI.
- You want a shared-element morph feel without building custom frame interpolation.

## Don't use when

- You need a generic scene-to-scene swap — this component encodes a specific feed→editor narrative; use `directional-wipe`, `spatial-push`, or `frosted-glass-wipe` for neutral transitions instead.
- Your app is not image-editing or media-focused — the built-in toolbar chrome implies an editor UI that will confuse the narrative if your product is unrelated.
- You need to drive the transition from actual scene ReactNodes — `from`/`to` here are `ImageExpandRect` geometry objects, not arbitrary scene components; for full scene swaps use the wipe family.
