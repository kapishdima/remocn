import { STACK } from "@/config/landing";

export function StackMarquee() {
  return (
    <section className="relative py-20">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex w-max animate-[remocn-marquee_36s_linear_infinite] gap-16">
          {[...STACK, ...STACK, ...STACK].map((item, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: marquee duplication
              key={i}
              className="whitespace-nowrap font-[var(--font-display)] text-2xl font-medium -tracking-wide text-white/30"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
