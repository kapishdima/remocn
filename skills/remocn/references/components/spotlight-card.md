# spotlight-card

**Tier:** `remocn` (animation) · **Vibe:** premium · **Natural length:** 240f @ 30fps

A card with a moonlight-cool radial spotlight that follows a synthetic cursor path and illuminates its micro-border. The spotlight moves deterministically so renders are frame-identical. Accepts `children` to replace the default title/body layout.

## Install

```bash
shadcn add @remocn/spotlight-card
```

Lands at `components/remocn/spotlight-card.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | `"Spotlight Card"` |
| `body` | `string` | `"Soft radial light follows the cursor"` |
| `cardWidth` | `number` | `520` |
| `cardHeight` | `number` | `320` |
| `glowSize` | `number` | `600` |
| `glowOpacity` | `number` | `0.08` |
| `cardColor` | `string` | `"#0a0a0a"` |
| `textColor` | `string` | `"#fafafa"` |
| `mutedColor` | `string` | `"#71717a"` |
| `speed` | `number` | `1` |
| `children` | `ReactNode` | — |

## Example

```tsx
<Backdrop fill="#080808" padding={0}>
  <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <SpotlightCard
      title="Ship your demo video"
      body="Composable Remotion components, ready in seconds."
      cardWidth={580}
      cardHeight={340}
    />
  </AbsoluteFill>
</Backdrop>
```

## Use when

- A hero or feature card needs a premium, editorial feel — the moving spotlight creates a subtle live-lit aesthetic without competing with text.
- You need a standalone dark card scene with visual interest but zero distraction from the message.
- The video background itself should feel premium — use as the `fill` of a `Backdrop` to make the entire frame a lit surface.

## Don't use when

- The scene has a light or colorful background — `spotlight-card` defaults are dark-on-dark; forcing it light washes the glow effect; use a `dynamic-grid` or solid `Backdrop` fill instead.
- You need multiple cards side-by-side — the spotlight tracks a single synthetic cursor per instance; two competing spotlights look conflicted; compose a custom layout with individual `children` slots.
- The card content is data-dense (tables, code blocks, long lists) — the narrow default height clips content; use a plain framed layout via `Backdrop` with `padding` and `radius` instead.
