import { FOOTER_NAV, HOME_NAV } from "@/config/landing";
import { PageShell } from "./components/page-shell";
import { BentoRegistry } from "./components/sections/bento-registry";
import { FinalCTA } from "./components/sections/final-cta";
import { Hero } from "./components/sections/hero";
import { LandingCodeShowcase } from "./components/sections/landing-code-showcase";
import { UseCases } from "./components/sections/use-cases";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function Page() {
  return (
    <PageShell>
      <SiteHeader navLinks={HOME_NAV} />
      <main className="relative">
        <Hero />
        <LandingCodeShowcase />
        <BentoRegistry />
        <UseCases />
        <FinalCTA />
        <SiteFooter navLinks={FOOTER_NAV} className="mt-12" />
      </main>
    </PageShell>
  );
}
