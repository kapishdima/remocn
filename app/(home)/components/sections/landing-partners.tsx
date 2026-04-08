"use client";

import { SECTION } from "@/config/landing";
import { type Sponsor, sponsors } from "@/config/sponsors";
import { cn } from "@/lib/utils";
import { FadeUp } from "../fade-up";

function PartnerLogoCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noreferrer noopener"
      className="group relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] px-6 py-10 transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
    >
      {/** biome-ignore lint/performance/noImgElement: sponsor logos are SVGs of arbitrary sizes */}
      <img
        src={sponsor.logoUrl}
        alt={sponsor.name}
        className={cn(
          "max-h-20 w-auto object-contain opacity-60 transition-all duration-300 [filter:grayscale(1)_brightness(0)_invert(1)] group-hover:opacity-100",
          sponsor.customStyles,
        )}
        style={{ transform: `scale(${sponsor.logoScale ?? 1})` }}
      />
    </a>
  );
}

export function LandingPartners() {
  const partners = sponsors.filter((s) => s.tier === "partner");
  if (partners.length === 0) return null;

  return (
    <section id="partners" className="relative py-24">
      <div className={SECTION}>
        <FadeUp>
          <div className="mb-12 max-w-2xl">
            <h2 className="text-4xl font-semibold -tracking-wide text-[#EDEDED] md:text-5xl">
              Trusted by builders
            </h2>
            <p className="mt-4 text-[#8B8A91]">
              Companies powering their videos with remocn
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((s) => (
              <PartnerLogoCard key={s.id} sponsor={s} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
