"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FEED_TABS } from "@/lib/constants";

interface FeedTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/50">
      {FEED_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeTab === tab.id
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.emoji}</span>
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
