---
name: remocn
description: >
  Build Remotion videos with remocn — a shadcn registry of copy-paste animation components and
  timeline-driven UI primitives. Use when composing video scenes, adding text animations,
  transitions, backgrounds, UI blocks, brand/social cards, or full compositions in a Remotion
  project. Triggers include "remocn", "video component", "add animation", "text reveal",
  "scene transition", "product demo video", "remotion component", "typewriter", "terminal
  simulator", "glass code block", and the UI-primitive tier: "video dialog", "video button",
  "command menu", "video select", "video tooltip". Even if the user doesn't mention remocn,
  activate when they need polished video primitives for Remotion.
---

# remocn

Copy-paste components for Remotion videos. Components install via `shadcn` and land in
`components/remocn/` — you own the code.

## Installation

Prerequisites: a Remotion project (`npx create-video@latest`).

```bash
# Add any component (namespaced shadcn registry)
shadcn add @remocn/blur-out-up

# Component lands at components/remocn/blur-out-up.tsx
```

`@remocn/<name>` is the canonical namespaced form (configured under `registries` in
`components.json`). The plain registry URL `https://remocn.dev/r/<name>.json` also works.

### Dependencies install automatically

Many components pull others via `registryDependencies` — `shadcn` installs them transitively.
For example, `shadcn add @remocn/typewriter` also pulls `@remocn/remocn-ui` and `@remocn/caret`.

- **`@remocn/remocn-ui`** is the shared core lib (timeline-fold hook, theme context, color math).
  Most UI Primitives depend on it. You rarely install it directly.

## Two tiers

remocn has two kinds of components — they have **different APIs**:

- **Animation tier** (`remocn`) — text animations, transitions, backgrounds, UI-block sims,
  brand/social cards, full compositions. Frame-driven. Shared props: `speed` (time multiplier),
  and for text: `fontSize`, `color`, `fontWeight`.
- **UI Primitives** (`remocn-ui`) — timeline-driven shadcn-style primitives (button, dialog,
  select, command-menu, tooltip…). State-based props (`state`, `style`, `variant`, `theme`).
  **No `speed` prop.** Built on `@remocn/remocn-ui`.

## Component categories

Pick by what you're building. The **full catalog with props, defaults, and dependencies** is
`references/components.md` — read it before installing.

| Category | Tier | Use for |
|---|---|---|
| **Text Animations** | `remocn` | Reveal/replace/emphasize text (`typewriter`, `blur-out-up`, `tracking-in`, `rolling-number`, `shimmer-sweep`…) |
| **Backgrounds & Effects** | `remocn` | Animated foundations, cursors, one-shot effects (`mesh-gradient-bg`, `dynamic-grid`, `spotlight-card`, `confetti`, `backdrop`) |
| **Transitions & Wipes** | `remocn` | Swap between two scenes (`directional-wipe`, `frosted-glass-wipe`, `spatial-push`, `zoom-through-transition`…) |
| **UI Blocks** | `remocn` | Interface sims for product demos (`terminal-simulator`, `glass-code-block`, `animated-bar-chart`, `progress-steps`…) |
| **AI & Social Cards** | `remocn` | Brand/product card scenes (`chat-gpt`, `claude-code`, `v0`, `github-stars`, `x-follow-card`…) |
| **Compositions** | `remocn` | Ready multi-scene sequences (`dashboard-populate`, `terminal-to-browser-deploy`, `hero-device-assemble`…) |
| **UI Primitives** | `remocn-ui` | shadcn-style primitives for video (`button`, `dialog`, `select`, `command-menu`, `tooltip`…) |

## Component patterns

Conventions differ by tier — don't assume animation-tier props on a primitive.

### Animation tier (`remocn`)

- Named `Props` interface per component (e.g. `BlurOutUpProps`).
- `speed?: number` — global time multiplier (default `1`), applied as `frame * speed`.
- Text components: `fontSize`, `color`, `fontWeight`.
- Transitions: take `from` / `to` as `ReactNode` (the two scenes), plus `transitionDuration`.
- `className?: string` on the root.

### UI Primitives (`remocn-ui`)

- State-based, **not** `speed`-based: `state` (e.g. `"open"` / `"closed"`), `style`, `variant`,
  `size`, `theme?: Partial<RemocnTheme>`.
- The opened/closed/active state is a pure function of the timeline (keyframed presets).
- Compose modal-layer primitives (dialog, alert-dialog, drawer) with a trigger element — see
  each component's example.

### Animation API

```tsx
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
const scale = spring({ fps, frame, config: { damping: 12, mass: 1, stiffness: 100 } });

// Deterministic randomness (NEVER Math.random())
import { random } from "@remotion/random";
const jitter = random(`seed-${frame}`);
```

### Composition structure

```tsx
import { Sequence, Series } from "remotion";

<Sequence from={30} durationInFrames={60}>
  <Typewriter text="npm install remocn" />
</Sequence>

<Series>
  <Series.Sequence durationInFrames={60}><SceneA /></Series.Sequence>
  <Series.Sequence durationInFrames={60}><SceneB /></Series.Sequence>
</Series>
```

### Canvas & timing

- **Canvas standard:** `1280×720 @ 30fps`. Components are laid out for it.
- **Budget each Sequence around the component's natural length** — `components.md` lists it as
  `*Nf @ 30fps*` per component. Under-budgeting clips the animation; over-budgeting leaves dead air.
- **Tone matching:** each catalog entry carries a `vibe` tag (`tech`/`premium`/`data`/`clean`/
  `playful`/`social`) — pick components whose vibe fits the brand.
- **Palette & fonts:** stay within the library's tokens (`references/design.md` → tokens) so your
  own elements don't clash.

## Design defaults — avoid AI-slop

When you write your **own** text, scene chrome, or cards (not the prebuilt components), keep it
restrained:

- **No decorative `letter-spacing`** on body/heading text you add.
- **No `text-transform: uppercase` / ALL-CAPS** defaults — prefer sentence case (`Launch`, not `LAUNCH`).
- **No gradient text-fills or decorative gradient washes** — gradients only as intentional backgrounds.
- **No glow / colored drop-shadows or large blur radii** (`blur > ~24px`, spread, multi-layer) —
  subtle 1px elevation only.

**Exception:** never strip these from components whose essence is the effect — `tracking-in`
(letter-spacing), `mesh-gradient-bg` and social cards (gradients), and intentional elevation are
all legitimate. The rules govern *your* additions, not the library.

Full do/avoid examples: `references/design.md`. For motion quality (timing, anticipation,
staging, easing), see `references/motion-principles.md`.

## Gotchas (remocn-specific)

- **Transitions wrap two scenes** — pass `from` / `to` as `ReactNode`, not as a static instance.
- **Terminal scroll is instant** — step-function `translateY`, never spring/ease the scroll.
- **`overflow: hidden` on split layouts** — prevents content breakage during width animations.
- **Cursor blink is deterministic** — `Math.floor(frame / 15) % 2 === 0`, not intervals.
- **Static files go in `public/`** — load via `staticFile('cursor.svg')`, not imports.
- **Social cards render offline** — `avatarUrl=""` / `coverUrl=""` fall back to gradients; no fetch.

General Remotion rules (no `Math.random()`, no `setInterval`, animate `transform` not `top`/`left`,
load fonts before render) live in the `remotion-best-practices` skill.

## Composing a video

Typical product demo:

1. **Background**: `mesh-gradient-bg` or `dynamic-grid`.
2. **Title reveal**: `blur-out-up`, `staggered-fade-up`, or `tracking-in`.
3. **Show the product**: `browser-flow`, `terminal-simulator`, or `glass-code-block`.
4. **Transition between scenes**: `frosted-glass-wipe`, `spatial-push`, or `directional-wipe`.
5. **End with impact**: `confetti`, `pricing-tier-focus`, or a full composition.

Or drop in a full composition (`dashboard-populate`, `terminal-to-browser-deploy`,
`hero-device-assemble`) and customize its props.

## Reference

- `references/components.md` — full catalog: props, defaults, dependencies, duration & vibe per component.
- `references/design.md` — anti-slop design defaults (do/avoid) + design tokens (palette, fonts, canvas).
- `references/motion-principles.md` — motion-design principles adapted to remocn + Remotion.
- `references/anti-patterns.md` — common generation mistakes and their fixes.
