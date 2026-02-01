"use client";

import { motion } from "framer-motion";
import { Crown, TrendingUp, TrendingDown } from "lucide-react";
import { cn, fadeInUp, staggerContainer, GlassCard, Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import { mockLeaderboard } from "@/lib/mock-data";

const badgeColors = {
  gold: "bg-gradient-to-br from-amber-400 to-amber-600 text-white",
  silver: "bg-gradient-to-br from-slate-300 to-slate-500 text-white",
  bronze: "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
};

const rankEmojis = {
  1: "👑",
  2: "🥈",
  3: "🥉",
};

function MiniSparkline({ change }: { change: number }) {
  const isPositive = change >= 0;
  const points = isPositive
    ? "M0,20 L5,15 L10,18 L15,10 L20,5"
    : "M0,5 L5,10 L10,8 L15,15 L20,20";

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="overflow-visible">
      <path
        d={points}
        fill="none"
        stroke={isPositive ? "#10b981" : "#ef4444"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Leaderboard() {
  return (
    <GlassCard hover={false}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Crown className="h-5 w-5 text-amber-500" />
        <h3 className="font-semibold text-sm">Top Creators</h3>
      </div>

      {/* Leaderboard list */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {mockLeaderboard.map((user) => (
          <motion.div
            key={user.id}
            variants={fadeInUp}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            {/* Rank badge */}
            <div
              className={cn(
                "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold",
                badgeColors[user.badge]
              )}
            >
              {user.rank}
            </div>

            {/* Avatar */}
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-medium text-sm truncate">{user.name}</span>
                <span className="text-xs">{rankEmojis[user.rank as 1 | 2 | 3]}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{user.points.toLocaleString()} pts</span>
              </div>
            </div>

            {/* Sparkline & change */}
            <div className="flex items-center gap-2">
              <MiniSparkline change={user.weeklyChange ?? 0} />
              <div
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  (user.weeklyChange ?? 0) >= 0 ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {(user.weeklyChange ?? 0) >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{Math.abs(user.weeklyChange ?? 0)}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View all link */}
      <button className="w-full mt-4 py-2 text-sm text-indigo-500 font-medium hover:underline">
        View full leaderboard
      </button>
    </GlassCard>
  );
}
