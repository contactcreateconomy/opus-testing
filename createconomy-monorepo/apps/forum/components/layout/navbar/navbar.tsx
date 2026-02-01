"use client";

import { Logo } from "./logo";
import { AnimatedSearch } from "./animated-search";
import { ThemeToggle } from "./theme-toggle";
import { Notifications } from "./notifications";
import { ProfileButton } from "./profile-button";
import { cn } from "@repo/ui";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 glass-navbar",
        className
      )}
    >
      <div className="h-full max-w-[1800px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <AnimatedSearch />
          <ThemeToggle />
          <Notifications />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
