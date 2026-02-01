"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar/navbar";
import { ThreeColumnLayout } from "@/components/layout/three-column-layout";
import { SidebarLeft } from "@/components/layout/sidebar-left/sidebar-left";
import { SidebarRight } from "@/components/layout/sidebar-right/sidebar-right";
import { MobileNav } from "@/components/layout/mobile-nav";
import { DotBackground } from "@/components/shared/dot-background";
import { FeaturedCarousel } from "@/components/feed/featured-carousel";
import { FeedTabs } from "@/components/feed/feed-tabs";
import { DiscussionFeed } from "@/components/feed/discussion-feed";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("top");

  return (
    <DotBackground>
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="max-w-[1800px] mx-auto">
        <ThreeColumnLayout
          leftSidebar={<SidebarLeft />}
          mainContent={
            <div className="py-4 space-y-6 pb-24 md:pb-4">
              {/* Featured carousel */}
              <section>
                <FeaturedCarousel />
              </section>

              {/* Feed tabs */}
              <section className="flex items-center justify-between">
                <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
              </section>

              {/* Discussion feed */}
              <section>
                <DiscussionFeed activeTab={activeTab} />
              </section>
            </div>
          }
          rightSidebar={<SidebarRight />}
        />
      </div>

      {/* Mobile navigation */}
      <MobileNav />
    </DotBackground>
  );
}
