# staggered-fade-up

**Tier:** `remocn` (animation) · **Vibe:** clean · **Natural length:** 90f @ 30fps

Words fade in and slide upward one after another with a configurable stagger delay. The workhorse text entrance for body copy and multi-word headlines — readable at any length, no blur or bounce.

## Install

```bash
shadcn add @remocn/staggered-fade-up
```

Lands at `components/remocn/staggered-fade-up.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `staggerDelay` | `number` | `4` |
| `distance` | `number` | `20` |
| `fontSize` | `number` | `72` |
| `color` | `string` | `"#171717"` |
| `fontWeight` | `number` | `600` |
| `speed` | `number` | `1` |

## Example

```tsx
<StaggeredFadeUp text="Build demo videos in minutes." staggerDelay={4} fontSize={72} />
```

## Use when

- A headline or body sentence is long and a simpler single-unit entrance would feel flat.
- You want a neutral, versatile word-by-word reveal that works across any brand tone.
- You need the text fully on screen by a known frame — `staggerDelay` × word count gives a predictable total duration.

## Don't use when

- The text is very short (1–2 words) and the stagger has nothing to reveal gradually — use `scale-down-fade` or `spring-scale-in` for a single-unit entrance with more impact.
- You want a per-character (not per-word) reveal — use `soft-blur-in` for character-level stagger with a premium blur feel.
- The scene needs an exit animation — staggered-fade-up is entrance only; compose with a separate exit primitive inside a `<Sequence>`.
