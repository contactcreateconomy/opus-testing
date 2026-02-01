"use client";

import { forwardRef, ComponentProps, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { glowPulse } from "../../lib/animations";
import { type VariantProps } from "class-variance-authority";

interface GlowButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  glow?: boolean;
  glowColor?: string;
  asChild?: boolean;
  children?: ReactNode;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, glow = true, children, ...props }, ref) => {
    return (
      <motion.div
        animate={glow ? glowPulse.animate : undefined}
        className="relative"
      >
        <Button
          ref={ref}
          className={cn(
            "relative bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium",
            "transition-all duration-300",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

GlowButton.displayName = "GlowButton";
