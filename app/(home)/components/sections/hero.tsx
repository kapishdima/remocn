"use client";

import { Player } from "@remotion/player";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Dither from "@/components/Dither";
import { Button } from "@/components/ui/button";
import { SECTION, SPRING_BOUNCE, SPRING_SOFT } from "@/config/landing";
import registry from "@/registry/__index__";
import { FadeUp } from "../fade-up";

export function Hero() {
  const heroEntry = registry["browser-flow"];

  return (
    <section className="relative overflow-hidden pt-44 pb-28">
      <div className="w-full h-screen absolute top-0 left-0">
        <Dither
          waveColor={[
            0.25098039215686274, 0.25098039215686274, 0.25098039215686274,
          ]}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={1}
          colorNum={6}
          pixelSize={2}
          waveAmplitude={0.35}
          waveFrequency={5.5}
          waveSpeed={0.01}
        />
      </div>
      <div className={SECTION}>
        <div className="flex flex-col items-center text-center">
          <FadeUp delay={0.08}>
            <h1 className="mt-8 max-w-8xl text-balance font-sans text-5xl font-semibold leading-[1.05] -tracking-[0.04em] text-[#EDEDED] md:text-7xl">
              Cinematic video components
              <br />
              Now copy-pasteable
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 max-w-2xl text-balance text-xl font-light leading-relaxed text-white">
              Build product demos, changelogs, and launch videos in React. Open
              source and delightfully easy
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SOFT}
              >
                <Button className="hover:bg-white h-14 px-10">
                  <Link href="/docs/getting-started/introduction" className="inline-flex items-center gap-2">
                    Browse components
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </div>

      <FadeUp delay={0.32} className="relative mt-10 w-full">
        <motion.div
          className="relative flex justify-center"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...SPRING_BOUNCE, delay: 0.1 }}
        >
          <div className="relative w-[90vw] h-screen overflow-hidden rounded-3xl">
            {heroEntry ? (
              <Player
                component={heroEntry.Component}
                inputProps={{ url: "remocn.dev" }}
                durationInFrames={heroEntry.config.durationInFrames}
                fps={heroEntry.config.fps}
                compositionWidth={heroEntry.config.compositionWidth}
                compositionHeight={heroEntry.config.compositionHeight}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
                autoPlay
                loop
                acknowledgeRemotionLicense
              />
            ) : null}
          </div>
        </motion.div>
      </FadeUp>
    </section>
  );
}
