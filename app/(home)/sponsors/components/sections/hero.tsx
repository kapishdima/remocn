import { LAVENDER, MINT, PEACH, SECTION } from "@/config/landing";
import { FadeUp } from "../../../components/fade-up";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-44 pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 50% at 50% 30%, ${LAVENDER}18, transparent 70%), radial-gradient(40% 40% at 20% 80%, ${PEACH}12, transparent 60%), radial-gradient(40% 40% at 80% 20%, ${MINT}12, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />
      <div className={SECTION}>
        <div className="flex flex-col items-center text-center">
          <FadeUp delay={0.08}>
            <h1 className="max-w-4xl text-balance font-sans text-5xl font-semibold leading-[1.05] -tracking-[0.04em] text-[#EDEDED] md:text-7xl">
              Support the future of video.
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-6 max-w-2xl text-balance text-xl font-light leading-relaxed text-white">
              remocn is open-source and free. Your sponsorship helps us spend
              more time building premium animations and keeping the project
              alive.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
