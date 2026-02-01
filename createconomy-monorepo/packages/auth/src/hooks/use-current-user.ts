"use client";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useCurrentUser as useConvexCurrentUser } from "@repo/convex";

export function useCurrentUser() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const { user, isLoading: isUserLoading } = useConvexCurrentUser();

  return {
    user,
    isAuthenticated,
    isLoading: isAuthLoading || isUserLoading,
  };
}

export function useAuth() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn, signOut } = useAuthActions();

  return {
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
  };
}
