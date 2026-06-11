"use client";

import { SignupFlow } from "@/registry/remocn-ui/signup-flow";

/**
 * Fixed lifecycle demo for the `signup-flow` block: a cursor clicks the email
 * field, the value types in, the "agree" box checks, the Create button runs
 * idle → press → loading → success, and a success toast slides in. The block is
 * a pure orchestrator — every channel comes from a composed primitive's hook.
 *
 * Timeline (US-B001 beat table): cursor click 30 ≡ input active 30; typing
 * 30→70; checkbox 82; button hover 95 ≡ cursor click 95 → press 104 → loading
 * 110 → success 150 ≡ toast enter 150; toast dismiss 210. durationInFrames 230
 * (210 + ~20 settle).
 */
export const SignupFlowExampleScene = () => <SignupFlow />;

export const signupFlowExampleCode = (): string => {
  return `import { SignupFlow } from "@/components/remocn/signup-flow";

export const Scene = () => <SignupFlow />;`;
};
