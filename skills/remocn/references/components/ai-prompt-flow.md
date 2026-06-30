# ai-prompt-flow

**Tier:** `remocn-ui` (primitive) · **Vibe:** clean · **Natural length:** state-driven

An AI prompt composition: a prompt types into the field, the Generate button runs hover → press → loading, a skeleton shimmer reveals, then crossfades into the generated answer, and a ready toast slides in. A pure orchestrator — every channel comes from a composed primitive's transition hook.

## Install

```bash
shadcn add @remocn/ai-prompt-flow
```

Lands at `components/remocn/ai-prompt-flow.tsx`. Pulls `@remocn/remocn-ui`, `@remocn/input`, `@remocn/button`, `@remocn/skeleton`, `@remocn/skeleton-block`, `@remocn/toast` automatically.

## Props

| Prop | Type | Default |
|---|---|---|
| `prompt` | `string` | `"Summarize this thread"` |
| `buttonLabel` | `string` | `"Generate"` |
| `answerLines` | `string[]` | `DEFAULT_ANSWER` |
| `toastTitle` | `string` | `"Response ready"` |
| `theme` | `Partial<RemocnTheme>` | — |

## Example

```tsx
<AiPromptFlow prompt="Summarize this thread" buttonLabel="Generate" toastTitle="Response ready" />
```

## Use when

- Demoing an AI product's full prompt-to-answer UX in a single self-contained scene.
- Showing the LLM generation lifecycle — typing, loading skeleton, answer reveal, toast — end-to-end.
- A product walkthrough video needs a polished AI workflow scene with no custom timing work.

## Don't use when

- You only need to show a button press with a loading state — use `button` with `state="loading"` instead.
- You only need a typing input — use `input` directly.
- You need custom orchestration timing or step control across scenes — compose the individual primitives manually.
