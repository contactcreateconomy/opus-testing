"use client";

import { Plus } from "lucide-react";
import { GlowButton } from "@/components/shared/glow-button";

export function StartDiscussion() {
  return (
    <GlowButton className="w-full h-12 rounded-xl text-base" glow>
      <Plus className="h-5 w-5 mr-2" />
      Start Discussion
    </GlowButton>
  );
}
