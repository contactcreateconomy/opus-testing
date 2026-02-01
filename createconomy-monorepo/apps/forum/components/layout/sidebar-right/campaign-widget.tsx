"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { GlassCard, Button } from "@repo/ui";
import { mockCampaign } from "@/lib/mock-data";

export function CampaignWidget() {
  return (
    <GlassCard hover={false} className="relative overflow-hidden">
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${mockCampaign.gradient} opacity-10`}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-indigo-500/30"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${60 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <span className="text-xs font-medium text-indigo-500 uppercase tracking-wider">
            Featured Campaign
          </span>
        </div>

        {/* Content */}
        <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          {mockCampaign.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {mockCampaign.description}
        </p>

        {/* Prize */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-muted-foreground">
            Total Prize Pool
          </div>
          <div className="text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            {mockCampaign.prize}
          </div>
        </div>

        {/* CTA */}
        <Button
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
        >
          <span>Learn More</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </GlassCard>
  );
}
