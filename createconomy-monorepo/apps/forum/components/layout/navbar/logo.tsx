"use client";

import { Circle } from "lucide-react";
import { cn } from "@repo/ui";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <Circle className="h-8 w-8 text-indigo-500 fill-indigo-500/20" strokeWidth={2.5} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-indigo-500">C</span>
        </div>
      </div>
      {showText && (
        <span className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Createconomy
        </span>
      )}
    </Link>
  );
}
