"use client";

import { Stepper } from "@/registry/remocn-ui/stepper";
import { useStepperTransition } from "@/registry/remocn-ui/stepper/use-stepper-transition";

export const StepperExampleScene = () => {
  // Advance through 3 steps: "Account" (0) → "Plan" (1) → "Done" (2).
  // Start explicitly at index 0 (else the timeline holds the first step's index
  // before it fires); each step arrives at the end of a 24-frame ease.
  const stepperStyle = useStepperTransition([
    { at: 0,   index: 0 },
    { at: 50,  index: 1, duration: 24 },
    { at: 110, index: 2, duration: 24 },
  ]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Stepper renders position:absolute;inset:0 — it fills and centers itself. */}
      <Stepper style={stepperStyle} />
    </div>
  );
};

export const stepperExampleCode = `import { Stepper } from "@/components/remocn/stepper";
import { useStepperTransition } from "@/components/remocn/use-stepper-transition";

export const Scene = () => {
  // Advance through 3 steps: "Account" → "Plan" → "Done".
  // Start explicitly at index 0; each step arrives after a 24-frame ease.
  const stepperStyle = useStepperTransition([
    { at: 0,   index: 0 },
    { at: 50,  index: 1, duration: 24 },
    { at: 110, index: 2, duration: 24 },
  ]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Stepper style={stepperStyle} />
    </div>
  );
};`;
