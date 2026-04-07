import { AlertTriangleIcon, InfoIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function CalloutBase({
  icon,
  title,
  children,
  className,
}: {
  icon: ReactNode;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "not-prose my-6 flex max-w-3xl gap-3 rounded-xl bg-muted px-4 py-3 text-sm",
        className,
      )}
    >
      <div className="mt-0.5 shrink-0 text-muted-foreground">{icon}</div>
      <div className="flex-1 space-y-1 leading-relaxed">
        {title && <div className="font-medium text-foreground">{title}</div>}
        <div className="text-muted-foreground [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}

export function Note({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <CalloutBase icon={<InfoIcon className="size-4" />} title={title}>
      {children}
    </CalloutBase>
  );
}

export function Warning({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <CalloutBase
      icon={<AlertTriangleIcon className="size-4 text-amber-500" />}
      title={title}
    >
      {children}
    </CalloutBase>
  );
}
