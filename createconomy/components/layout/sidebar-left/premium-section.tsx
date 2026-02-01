"use client";

import { motion } from "framer-motion";
import { MessageSquare, Rocket, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { PREMIUM_CATEGORIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const iconMap = {
  MessageSquare,
  Rocket,
};

interface PremiumSectionProps {
  userPoints?: number;
}

export function PremiumSection({ userPoints = 0 }: PremiumSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground px-2 flex items-center gap-2">
        Premium
        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-500">
          Exclusive
        </Badge>
      </h3>
      <motion.nav
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {PREMIUM_CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          const isLocked = userPoints < category.pointsRequired;

          const button = (
            <motion.button
              key={category.id}
              variants={fadeInUp}
              disabled={isLocked}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isLocked
                  ? "text-muted-foreground/50 cursor-not-allowed"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
              <span className="ml-auto flex items-center gap-1">
                {isLocked && <Lock className="h-3 w-3" />}
                <span className="text-xs opacity-60">
                  {category.pointsRequired.toLocaleString()}
                </span>
              </span>
            </motion.button>
          );

          if (isLocked) {
            return (
              <Tooltip key={category.id}>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent>
                  <p>
                    Earn {(category.pointsRequired - userPoints).toLocaleString()} more
                    points to unlock
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          }

          return button;
        })}
      </motion.nav>
    </div>
  );
}
