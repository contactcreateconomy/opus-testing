"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/animations";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  animate = true,
}: GlassCardProps) {
  if (!animate) {
    return (
      <div className={cn("glass-card rounded-2xl p-4", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("glass-card rounded-2xl p-4", className)}
      variants={hover ? cardHover : undefined}
      initial="rest"
      whileHover={hover ? "hover" : undefined}
    >
      {children}
    </motion.div>
  );
}
