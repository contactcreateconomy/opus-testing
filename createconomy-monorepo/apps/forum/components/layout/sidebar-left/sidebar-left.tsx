"use client";

import { useState } from "react";
import { StartDiscussion } from "./start-discussion";
import { DiscoverSection } from "./discover-section";
import { PremiumSection } from "./premium-section";
import { ActiveCampaign } from "./active-campaign";

export function SidebarLeft() {
  const [activeCategory, setActiveCategory] = useState<string>();

  return (
    <div className="p-4 space-y-6">
      <StartDiscussion />

      <DiscoverSection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <PremiumSection userPoints={2450} />

      <ActiveCampaign />
    </div>
  );
}
