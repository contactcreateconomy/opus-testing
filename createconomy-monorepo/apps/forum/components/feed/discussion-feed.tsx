"use client";

import { useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import { staggerContainer, useInfiniteScroll, INFINITE_SCROLL_THRESHOLD } from "@repo/ui";
import type { Discussion } from "@repo/types";
import { mockDiscussions, generateMoreDiscussions } from "@/lib/mock-data";
import { DiscussionCard } from "./discussion-card";
import { SkeletonCard } from "./skeleton-card";

interface DiscussionFeedProps {
  activeTab: string;
}

async function fetchDiscussions(page: number): Promise<{
  discussions: Discussion[];
  nextPage: number | null;
}> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (page === 0) {
    return {
      discussions: mockDiscussions,
      nextPage: 1,
    };
  }

  if (page > 3) {
    return {
      discussions: [],
      nextPage: null,
    };
  }

  return {
    discussions: generateMoreDiscussions(page),
    nextPage: page + 1,
  };
}

export function DiscussionFeed({ activeTab }: DiscussionFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["discussions", activeTab],
    queryFn: ({ pageParam = 0 }) => fetchDiscussions(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useInfiniteScroll(containerRef, {
    threshold: INFINITE_SCROLL_THRESHOLD,
    hasMore: hasNextPage ?? false,
    isLoading: isFetchingNextPage,
    onLoadMore: handleLoadMore,
  });

  const discussions = data?.pages.flatMap((page) => page.discussions) ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load discussions</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin pr-2"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {discussions.map((discussion, index) => (
            <DiscussionCard
              key={discussion.id}
              discussion={discussion}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {isFetchingNextPage && (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <SkeletonCard key={`loading-${i}`} />
          ))}
        </div>
      )}

      {!hasNextPage && discussions.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            You've reached the end of the feed
          </p>
        </div>
      )}
    </div>
  );
}
