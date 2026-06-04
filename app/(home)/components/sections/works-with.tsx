import type { ComponentType, SVGProps } from "react";
import { SECTION } from "@/config/landing";
import { Remotion } from "@/components/ui/svgs/remotion";
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi";
import { FadeUp } from "../fade-up";

type Logo = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const LOGOS: Logo[] = [
  { label: "Remotion", Icon: Remotion },
  { label: "React", Icon: ReactDark },
  { label: "Next.js", Icon: NextjsIconDark },
  { label: "Tailwind CSS", Icon: Tailwindcss },
  { label: "shadcn/ui", Icon: ShadcnUi },
];

export function WorksWith() {
  return (
    <section className="relative border-y border-border py-12 sm:py-16">
      <div className={SECTION}>
        <FadeUp>
          <div className="flex flex-col items-center gap-8">
            <p className=" text-xl font-medium text-muted-foreground">
              Built on tools you already use
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12">
              {LOGOS.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-x-2 text-sm font-medium text-muted-foreground"
                >
                  <Icon
                    role="img"
                    aria-label={label}
                    className="h-6 w-auto text-muted-foreground transition-colors hover:text-foreground sm:h-7"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
