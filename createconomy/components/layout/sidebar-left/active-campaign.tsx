"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Trophy } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { mockCampaign } from "@/lib/mock-data";

function calculateTimeLeft(endDate: string) {
  const difference = new Date(endDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
  };
}

export function ActiveCampaign() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(mockCampaign.endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(mockCampaign.endDate));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <GlassCard className="overflow-hidden" hover={false}>
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${mockCampaign.gradient} opacity-10`}
      />

      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">{mockCampaign.title}</h3>
          <Trophy className="h-5 w-5 text-amber-500" />
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {mockCampaign.description}
        </p>

        {/* Countdown */}
        <div className="flex items-center gap-1 text-xs">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Ends in:</span>
          <motion.span
            key={`${timeLeft.days}-${timeLeft.hours}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-semibold text-indigo-500"
          >
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
          </motion.span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{mockCampaign.participants.toLocaleString()} joined</span>
          </div>
          <span className="font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            {mockCampaign.prize}
          </span>
        </div>

        {/* Join button */}
        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all">
          Join Campaign
        </button>
      </div>
    </GlassCard>
  );
}
