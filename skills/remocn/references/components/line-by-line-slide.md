# line-by-line-slide

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 90f @ 30fps

Each line of a multi-line text block enters from the left with a staggered slide and exits to the right, creating a flowing paragraph reveal with directional continuity.

## Install

```bash
shadcn add @remocn/line-by-line-slide
```

Lands at `components/remocn/line-by-line-slide.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `distance` | `number` | `48` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<LineByLineSlide text={"Ship fast.\nIterate daily.\nOwn your stack."} distance={48} />
```

## Use when

- A multi-line headline or short paragraph needs a flowing, line-by-line entrance with a matching exit.
- Directional slide motion (left-in / right-out) should underscore the reading rhythm of the text.
- A body-copy-style reveal is needed for bullet points or list items staged as stacked lines.

## Don't use when

- The text is a single short phrase — the stagger has nothing to stage; use `mask-reveal-up` or `per-character-rise` for single-line reveals instead.
- The reveal should move upward rather than slide horizontally — use `mask-reveal-up` (upward, masked) or `blur-out-up` (upward, blurred exit).
- The lines should not exit — this component slides lines out to the right; for a hold-in-place reveal, use `mask-reveal-up`.
