"use client";

import { cn } from "@/lib/utils";

interface DotBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function DotBackground({ className, children }: DotBackgroundProps) {
  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Dot pattern background */}
      <div
        className="fixed inset-0 dot-background pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse at center, transparent 0%, black 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 0%, black 70%)",
        }}
      />

      {/* Gradient overlay for center fade */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, var(--background) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
