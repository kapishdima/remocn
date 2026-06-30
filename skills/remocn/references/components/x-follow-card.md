# x-follow-card

**Tier:** `remocn` (animation) · **Vibe:** social · **Natural length:** 165f @ 30fps

Animated X profile follow card — spring bounce-in, staggered blur-in, and a synthetic cursor that clicks Follow and flips it to Following. Light/dark, horizontal or vertical.

## Install

```bash
shadcn add @remocn/x-follow-card
```

Lands at `components/remocn/x-follow-card.tsx`. Pulls `@remocn/cursor` automatically. Renders offline — `avatarUrl=""` / `coverUrl=""` fall back to gradients, no network fetch.

## Props

| Prop | Type | Default |
|---|---|---|
| `name` | `string` | `"remocn"` |
| `handle` | `string` | `"remocn"` |
| `bio` | `string` | `"Building the collaborative video toolkit for small teams"` |
| `avatarUrl` | `string` | `""` |
| `coverUrl` | `string` | `""` |
| `location` | `string` | `"Tunisia"` |
| `website` | `string` | `"remocn.tn"` |
| `joined` | `string` | `"January 2024"` |
| `verified` | `boolean` | `true` |
| `accentColor` | `string` | `"#1d9bf0"` |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `speed` | `number` | `1` |

## Example

```tsx
<XFollowCard name="remocn" handle="remocn" bio="The collaborative video toolkit" verified />
```

## Use when

- Showcasing a single X profile with the recognizable click-to-Follow payoff as the action beat.
- A social-proof or creator-intro scene needs one branded profile card with the cursor interaction.
- You want an offline-safe card (gradient avatar fallback) without wiring real image URLs.

## Don't use when

- You're aggregating follower growth or notifications rather than one profile — use `x-followers-overview`.
- The brand is GitHub, not X — use `github-stars`.
- You need a generic testimonial/quote card, not an X profile — compose a plain card.
