# github-stars

**Tier:** `remocn` (animation) · **Vibe:** data · **Natural length:** 120f @ 30fps

Inertial fly-through of a repo's stargazers with a synced count-up odometer that locks on the total. Horizontal 16:9 or vertical 9:16.

## Install

```bash
shadcn add @remocn/github-stars
```

Lands at `components/remocn/github-stars.tsx`. Pulls `@remocn/number-wheel` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `repo` | `string` | — |
| `totalStars` | `number` | — |
| `stargazers` | `Stargazer[]` | — |
| `orientation` | `"horizontal" \| "vertical"` | — |
| `accentColor` | `string` | — |
| `speed` | `number` | `1` |
| `theme` | `"light" \| "dark"` | — |
| `repoAvatarUrl` | `string` | — |

## Example

```tsx
<GithubStars repo="kapishdima/remocn" totalStars={1709} stargazers={STARGAZERS} orientation="horizontal" />
```

## Use when

- Celebrating an OSS milestone — the count-up odometer landing on a star total is the payoff beat.
- A repo-showcase or social-proof scene needs real stargazer faces flying past.
- You want one self-contained card that pairs the avatar fly-through with the synced counter.

## Don't use when

- You only need the number to roll up without the stargazer fly-through — use `number-wheel` or `rolling-number`.
- The metric isn't GitHub stars — use a generic counter (`rolling-number`) or `animated-bar-chart` for compared values.
- You're depicting follower growth on X — use `x-followers-overview`.
