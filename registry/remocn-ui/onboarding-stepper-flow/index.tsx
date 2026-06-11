"use client";

import { Button } from "@/components/remocn/button";
import { useButtonTransition } from "@/components/remocn/use-button-transition";
import { Input } from "@/components/remocn/input";
import { useInputTransition } from "@/components/remocn/use-input-transition";
import { Radio } from "@/components/remocn/radio";
import { useRadioTransition } from "@/components/remocn/use-radio-transition";
import { Stepper } from "@/components/remocn/stepper";
import { useStepperTransition } from "@/components/remocn/use-stepper-transition";
import { Switch } from "@/components/remocn/switch";
import { useSwitchTransition } from "@/components/remocn/use-switch-transition";
import { clamp01, type RemocnTheme } from "@/lib/remocn-ui";

/**
 * Onboarding stepper flow — a shippable composition scene. Pure orchestrator:
 * each step is driven by its own primitive hook, navigation is button-driven (no
 * cursor). The stepper advances via `useStepperTransition`, exposing a single
 * continuous `position` float.
 *
 * §0B.3 SANCTIONED EXCEPTION (the ONE motion this block derives itself): each
 * step panel's `opacity` is a PURE LINEAR read of the stepper's exposed
 * `position` channel — `clamp01(1 - |position - i|)`. No new easing/spring, no
 * frame read, no per-element timeline, no state. Everything else lives inside
 * the primitives. This crossfades panels in lockstep with the stepper's own
 * eased advance (the easing already lives in `useStepperTransition`).
 */

const DEFAULT_STEPS = ["Account", "Plan", "Settings"];
const DEFAULT_PLANS = ["Free", "Pro", "Team"];

// Stage geometry (1280×720): stepper rail up top, step content centered below.
const CONTENT_TOP = 300;
const CONTENT_HEIGHT = 220;
const NAV_TOP = 540;

export interface OnboardingStepperFlowProps {
  /** Step labels — their count is the step count. */
  steps?: string[];
  /** Email value typed into the account step's input. */
  name?: string;
  /** Plan options shown as radios on the plan step. */
  plans?: string[];
  /** Label of the advance button on the non-final steps. */
  nextLabel?: string;
  /** Label of the advance button on the final step. */
  finishLabel?: string;
  mode?: "light" | "dark";
  theme?: Partial<RemocnTheme>;
}

export function OnboardingStepperFlow({
  steps = DEFAULT_STEPS,
  name = "jane@acme.com",
  plans = DEFAULT_PLANS,
  nextLabel = "Next",
  finishLabel = "Finish",
  mode = "light",
  theme,
}: OnboardingStepperFlowProps) {
  const opts = { mode, theme };

  // Stepper advances 0 → 1 (at 64) → 2 (at 104); checks draw on completed steps.
  const stepperStyle = useStepperTransition([
    { at: 0, index: 0 },
    { at: 64, index: 1, duration: 20 },
    { at: 104, index: 2, duration: 20 },
  ]);

  // Step 1 — email types in (10 → 55). `at` is the transition START and the reveal
  // ramps over [at, at+duration) (useStateTransition / STYLE-GUIDE §5), so the
  // typing window is [10, 55] — fully revealed by 55, before the stepper advance
  // at 64 (PRD US-B004 beat 2 + AC5). A brief `active` focus precedes it.
  const nameStyle = useInputTransition(
    [
      { at: 2, state: "active", duration: 8 },
      { at: 10, state: "typing", duration: 45 },
    ],
    opts,
  );

  // Step 2 — plan radio checks at 90.
  const planStyle = useRadioTransition(
    [{ at: 90, state: "checked", duration: 14 }],
    opts,
  );

  // Step 3 — settings switch turns on at 130.
  const settingsStyle = useSwitchTransition(
    [{ at: 130, state: "checked", duration: 14 }],
    opts,
  );

  // Nav button — each Next/Finish press immediately precedes the stepper advance
  // (60→64, 100→104), the final press resolves to success at 150.
  const navStyle = useButtonTransition(
    [
      { at: 60, state: "press", duration: 6 },
      { at: 64, state: "idle", duration: 6 },
      { at: 100, state: "press", duration: 6 },
      { at: 104, state: "idle", duration: 6 },
      { at: 150, state: "press", duration: 6 },
      { at: 156, state: "success", duration: 14 },
    ],
    opts,
  );

  // §0B.3: panel visibility = pure linear read of the exposed `position` channel.
  // No easing/spring/frame here — `clamp01` + `|·|` over `position` only.
  const position = stepperStyle.position;
  const panelOpacity = (i: number) => clamp01(1 - Math.abs(position - i));

  // The advance button reads "Finish" once the flow has moved onto the last step.
  const navLabel = position >= steps.length - 1 ? finishLabel : nextLabel;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Stepper rail — its own relative box scopes the primitive's inset:0. */}
      <div
        style={{ position: "absolute", left: 0, right: 0, top: 96, height: 100 }}
      >
        <Stepper style={stepperStyle} steps={steps} mode={mode} theme={theme} />
      </div>

      {/* Step content region — panels crossfade via the linear position read. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: CONTENT_TOP,
          height: CONTENT_HEIGHT,
        }}
      >
        {/* Step 1 — account email input. */}
        <div style={{ position: "absolute", inset: 0, opacity: panelOpacity(0) }}>
          <Input
            style={nameStyle}
            placeholder={name}
            value={name}
            valueWidth={150}
            mode={mode}
            theme={theme}
          />
        </div>

        {/* Step 2 — plan radio. */}
        <div style={{ position: "absolute", inset: 0, opacity: panelOpacity(1) }}>
          <Radio
            style={planStyle}
            label={plans[1] ?? "Pro"}
            mode={mode}
            theme={theme}
          />
        </div>

        {/* Step 3 — settings switch. */}
        <div style={{ position: "absolute", inset: 0, opacity: panelOpacity(2) }}>
          <Switch
            style={settingsStyle}
            label="Email notifications"
            mode={mode}
            theme={theme}
          />
        </div>
      </div>

      {/* Advance button (Next / Finish). */}
      <div
        style={{ position: "absolute", left: 0, right: 0, top: NAV_TOP, height: 64 }}
      >
        <Button label={navLabel} style={navStyle} mode={mode} theme={theme} />
      </div>
    </div>
  );
}
