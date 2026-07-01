"use client";

import {
  MeshGradient,
  type MeshGradientProps,
} from "@paper-design/shaders-react";
import { useCallback, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const NEUTRAL_COLORS = ["#12121a", "#232338", "#3a3a5c", "#52527a"];

export interface ShaderMeshGradientProps
  extends Omit<MeshGradientProps, "frame" | "ref"> {}

export function ShaderMeshGradient({
  speed = 1,
  colors = NEUTRAL_COLORS,
  distortion = 0.6,
  swirl = 0.1,
  className,
  ...rest
}: ShaderMeshGradientProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const [handle] = useState(() => delayRender("shader-mesh-gradient"));
  const gate = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => continueRender(handle)),
      );
    },
    [handle],
  );

  return (
    <div
      ref={gate}
      className={className}
      style={{ position: "absolute", inset: 0 }}
    >
      <MeshGradient
        speed={0}
        frame={(frame / fps) * speed * 1000}
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        fit="cover"
        width={width}
        height={height}
        {...rest}
      />
    </div>
  );
}
