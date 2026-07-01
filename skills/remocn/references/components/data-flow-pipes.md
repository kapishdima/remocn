# data-flow-pipes

**Tier:** `remocn` (animation) · **Vibe:** tech · **Natural length:** 180f @ 30fps

Glowing data packets travel along SVG bezier pipes between system nodes, leaving fading trails. Each pulse travels a fixed-duration path; multiple pulses cycle continuously, giving the impression of live data traffic through an architecture diagram.

## Install

```bash
shadcn add @remocn/data-flow-pipes
```

Lands at `components/remocn/data-flow-pipes.tsx`.

## Props

| Prop | Type | Default |
|---|---|---|
| `nodes` | `DataFlowNode[]` | `DEFAULT_NODES` |
| `edges` | `DataFlowEdge[]` | `DEFAULT_EDGES` |
| `pipeColor` | `string` | `"#1f1f23"` |
| `pulseColor` | `string` | `"#22d3ee"` |
| `pulseLength` | `number` | `60` |
| `pulseDuration` | `number` | `36` |
| `nodeColor` | `string` | `"#0a0a0a"` |
| `textColor` | `string` | `"#fafafa"` |
| `speed` | `number` | `1` |

## Example

```tsx
<DataFlowPipes nodes={DEFAULT_NODES} />
```

## Use when

- Visualizing a microservices or event-driven architecture where data moves between labeled services.
- A platform or infra product demo needs to show "live" data routing without a real dashboard.
- An explainer scene needs to trace a request path through API → database → cache → client.

## Don't use when

- The workflow is sequential with discrete pass/fail steps — use `progress-steps` instead, which shows status clearly.
- You only have two nodes; a single pipe with a pulse looks sparse — use an animated arrow instead.
- The audience needs to read specific data values — pipes convey motion/topology, not data content; use `animated-line-chart` or `animated-bar-chart` for values.
