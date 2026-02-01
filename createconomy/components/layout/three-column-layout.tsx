"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ThreeColumnLayoutProps {
  leftSidebar: ReactNode;
  mainContent: ReactNode;
  rightSidebar: ReactNode;
  className?: string;
}

export function ThreeColumnLayout({
  leftSidebar,
  mainContent,
  rightSidebar,
  className,
}: ThreeColumnLayoutProps) {
  return (
    <div className={cn("flex min-h-screen", className)}>
      {/* Left Sidebar - hidden on mobile and tablet */}
      <aside className="hidden lg:flex lg:w-[250px] lg:flex-shrink-0 flex-col sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
        {leftSidebar}
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 px-4 lg:px-6">
        {mainContent}
      </main>

      {/* Right Sidebar - hidden on mobile and tablet */}
      <aside className="hidden xl:flex xl:w-[320px] xl:flex-shrink-0 flex-col sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
        {rightSidebar}
      </aside>
    </div>
  );
}
