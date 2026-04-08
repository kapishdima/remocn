import { FOOTER_NAV, SPONSORS_NAV } from "@/config/landing";
import { PageShell } from "../components/page-shell";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { Hero } from "./components/sections/hero";
import { Tiers } from "./components/sections/tiers";
import { WallOfLove } from "./components/sections/wall-of-love";

export default function SponsorsPage() {
  return (
    <PageShell>
      <SiteHeader navLinks={SPONSORS_NAV} />
      <main className="relative">
        <Hero />
        <Tiers />
        <WallOfLove />
        <SiteFooter navLinks={FOOTER_NAV} className="mt-20" />
      </main>
    </PageShell>
  );
}
