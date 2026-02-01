"use client";

import { motion } from "framer-motion";
import {
  Newspaper,
  Star,
  GitCompare,
  List,
  HelpCircle,
  Image,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CATEGORIES } from "@/lib/constants";

const iconMap = {
  Newspaper,
  Star,
  GitCompare,
  List,
  HelpCircle,
  Image,
  BookOpen,
};

interface DiscoverSectionProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function DiscoverSection({
  activeCategory,
  onCategoryChange,
}: DiscoverSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground px-2">
        Discover
      </h3>
      <motion.nav
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          const isActive = activeCategory === category.id;

          return (
            <motion.button
              key={category.id}
              variants={fadeInUp}
              onClick={() => onCategoryChange?.(category.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
              <span className="ml-auto text-xs opacity-60">{category.emoji}</span>
            </motion.button>
          );
        })}
      </motion.nav>
    </div>
  );
}
