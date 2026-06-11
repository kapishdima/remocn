"use client";

import { CheckoutFlow } from "@/registry/remocn-ui/checkout-flow";

/**
 * Fixed lifecycle demo for the `checkout-flow` block: a cursor flips the billing
 * toggle monthly → yearly, clicks Upgrade, a payment Dialog opens, the card
 * number types in, the confirm button runs press → loading → success, the Dialog
 * closes and a success Toast slides in. The block is a pure orchestrator — every
 * channel comes from a composed primitive's hook.
 *
 * Timeline (US-B003 beat table): toggle click 24 ≡ toggle slide 24; Upgrade
 * click 50 ≡ button press 50; dialog open 56; card typing 70→120; confirm press
 * 124 → loading 128 → success 165; dialog close 175; toast enter 178 → dismiss
 * 235. durationInFrames 245 (235 + ~10 settle).
 */
export const CheckoutFlowExampleScene = () => <CheckoutFlow />;

export const checkoutFlowExampleCode = (): string => {
  return `import { CheckoutFlow } from "@/components/remocn/checkout-flow";

export const Scene = () => <CheckoutFlow />;`;
};
