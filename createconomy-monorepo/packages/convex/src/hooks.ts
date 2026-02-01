"use client";

import { useQuery, useMutation } from "convex/react";
import type { FunctionReference } from "convex/server";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";

// Type helper for API functions
type QueryFn = FunctionReference<"query">;
type MutationFn = FunctionReference<"mutation">;

// Hook to get current authenticated user
export function useCurrentUser() {
  const user = useQuery(api.users.getCurrentUser as QueryFn);
  return {
    user,
    isLoading: user === undefined,
    isAuthenticated: user !== null && user !== undefined,
  };
}

// Hook to get user by ID
export function useUser(userId: Id<"users"> | undefined) {
  const user = useQuery(
    api.users.getUserById as QueryFn,
    userId ? { userId } : "skip"
  );
  return {
    user,
    isLoading: user === undefined,
  };
}

// Hook to get user by handle
export function useUserByHandle(handle: string | undefined) {
  const user = useQuery(
    api.users.getUserByHandle as QueryFn,
    handle ? { handle } : "skip"
  );
  return {
    user,
    isLoading: user === undefined,
  };
}

// Hook to update profile
export function useUpdateProfile() {
  return useMutation(api.users.updateProfile as MutationFn);
}

// Hook to get leaderboard
export function useLeaderboard(limit?: number) {
  const leaderboard = useQuery(api.users.getLeaderboard as QueryFn, { limit });
  return {
    leaderboard,
    isLoading: leaderboard === undefined,
  };
}
