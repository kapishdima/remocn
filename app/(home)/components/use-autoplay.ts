import type { PlayerRef } from "@remotion/player";
import { type RefObject, useEffect } from "react";

export function useAutoplay(
  playerRef: RefObject<PlayerRef | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let attempts = 0;
    const MAX_ATTEMPTS = 120; // ~2s at 60fps, longer on a contended mount
    const tick = () => {
      const player = playerRef.current;
      if (player && !player.isPlaying()) player.play();
      attempts += 1;
      if ((!player || !player.isPlaying()) && attempts < MAX_ATTEMPTS) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playerRef, enabled]);
}
