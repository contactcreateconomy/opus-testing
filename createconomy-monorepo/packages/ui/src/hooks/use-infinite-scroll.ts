"use client";

import { useEffect, RefObject, useCallback } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll(
  containerRef: RefObject<HTMLElement | null>,
  options: UseInfiniteScrollOptions
) {
  const { threshold = 200, hasMore, isLoading, onLoadMore } = options;

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom < threshold) {
      onLoadMore();
    }
  }, [containerRef, isLoading, hasMore, threshold, onLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef, handleScroll]);

  return { isLoading, hasMore };
}
