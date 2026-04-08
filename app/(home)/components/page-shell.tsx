import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-black font-sans text-[#EDEDED] antialiased"
      style={{ colorScheme: "dark" }}
    >
      {children}
    </div>
  );
}
