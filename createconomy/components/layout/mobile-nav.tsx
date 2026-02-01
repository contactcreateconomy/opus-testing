"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Search, PlusCircle, Bell, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarLeft } from "./sidebar-left/sidebar-left";

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "search", icon: Search, label: "Search" },
  { id: "create", icon: PlusCircle, label: "Create" },
  { id: "notifications", icon: Bell, label: "Alerts" },
  { id: "profile", icon: User, label: "Profile" },
];

export function MobileNav() {
  const [activeItem, setActiveItem] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button (visible on tablet) */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full glass"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="h-full overflow-y-auto">
              <SidebarLeft />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Bottom navigation bar (mobile only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="glass-navbar border-t border-border/50 px-2 py-2 safe-area-pb">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              const isCreate = item.id === "create";

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={cn(
                    "relative flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
                    isCreate
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4"
                      : isActive
                      ? "text-indigo-500"
                      : "text-muted-foreground"
                  )}
                >
                  {isActive && !isCreate && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute inset-0 bg-indigo-500/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={cn("h-5 w-5 relative z-10", isCreate && "h-6 w-6")} />
                  {!isCreate && (
                    <span className="text-[10px] font-medium relative z-10">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
