"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { morphCard } from "@/lib/animations";
import { GlassCard } from "@/components/shared/glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockVibingItems } from "@/lib/mock-data";
import { VIBING_CYCLE_INTERVAL } from "@/lib/constants";

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColors = {
  up: "text-emerald-500",
  down: "text-rose-500",
  stable: "text-muted-foreground",
};

export function WhatsVibing() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockVibingItems.length);
    }, VIBING_CYCLE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const currentItem = mockVibingItems[currentIndex];
  const TrendIcon = trendIcons[currentItem.trend];

  return (
    <GlassCard hover={false} className="relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Flame className="h-5 w-5 text-orange-500" />
        <h3 className="font-semibold text-sm">What's Vibing</h3>
        <div className="ml-auto flex gap-1">
          {mockVibingItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-4 bg-indigo-500"
                  : "w-1.5 bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Morphing card stack */}
      <div className="relative h-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            variants={morphCard}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
            <div className="p-3 rounded-xl bg-secondary/50 h-full">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentItem.author.avatar} />
                  <AvatarFallback>{currentItem.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-2 mb-1">
                    {currentItem.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{currentItem.author.name}</span>
                    <span>·</span>
                    <div className={cn("flex items-center gap-1", trendColors[currentItem.trend])}>
                      <TrendIcon className="h-3 w-3" />
                      <span>{currentItem.engagement.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background cards stack effect */}
      <div className="absolute bottom-4 left-6 right-6 h-16 -z-10">
        <div className="absolute inset-0 rounded-xl bg-secondary/30 transform translate-y-2 scale-[0.95]" />
        <div className="absolute inset-0 rounded-xl bg-secondary/20 transform translate-y-4 scale-[0.9]" />
      </div>
    </GlassCard>
  );
}
