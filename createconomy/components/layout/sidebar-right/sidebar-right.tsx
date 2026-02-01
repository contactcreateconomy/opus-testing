"use client";

import { WhatsVibing } from "./whats-vibing";
import { Leaderboard } from "./leaderboard";
import { CampaignWidget } from "./campaign-widget";

export function SidebarRight() {
  return (
    <div className="p-4 space-y-4">
      <WhatsVibing />
      <Leaderboard />
      <CampaignWidget />
    </div>
  );
}
