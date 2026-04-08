"use client";

import { Player } from "@remotion/player";
import { motion } from "motion/react";
import { PEACH, SECTION, SPRING_SOFT } from "@/config/landing";
import registry from "@/registry/__index__";
import { FadeUp } from "../fade-up";

export function LandingCodeShowcase() {
  const entry = registry["landing-code-showcase"];
  const aspectRatio =
    entry &&
    `${entry.config.compositionWidth} / ${entry.config.compositionHeight}`;

  return (
    <section id="showcase" className="relative py-32">
      {/* Header sits inside the standard SECTION width for readable copy */}
      <div className={SECTION}>
        <FadeUp>
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-semibold  -tracking-wide text-[#EDEDED] md:text-5xl">
              Type a prop
              <span className="text-[#8B8A91]"> ship a frame</span>
            </h2>
            <p className="mt-4 text-[#8B8A91]">
              Every component is just React. Watch the preview react to your
              code in real time
            </p>
          </div>
        </FadeUp>
      </div>

      {/* Showcase block breaks out of the section width so the player has
          room for the wide composition. */}
      <div className="mx-auto w-full max-w-400 px-6">
        <FadeUp delay={0.1}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={SPRING_SOFT}
            className="overflow-hidden rounded-3xl border border-white/6 bg-white/2 backdrop-blur-2xl"
            style={{
              boxShadow: `0 30px 80px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            <div className="w-full" style={{ aspectRatio }}>
              {entry ? (
                <Player
                  component={entry.Component}
                  inputProps={{ accentColor: PEACH }}
                  durationInFrames={entry.config.durationInFrames}
                  fps={entry.config.fps}
                  compositionWidth={entry.config.compositionWidth}
                  compositionHeight={entry.config.compositionHeight}
                  style={{ width: "100%", height: "100%", display: "block" }}
                  autoPlay
                  loop
                  acknowledgeRemotionLicense
                />
              ) : null}
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
