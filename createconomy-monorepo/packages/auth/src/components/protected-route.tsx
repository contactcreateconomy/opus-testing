"use client";

import { ReactNode } from "react";
import { useConvexAuth } from "convex/react";
import type { UserRole } from "@repo/types";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  roles?: UserRole[];
  userRole?: UserRole;
}

export function ProtectedRoute({
  children,
  fallback,
  roles,
  userRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  // Show loading state
  if (isLoading) {
    return fallback || <div>Loading...</div>;
  }

  // Check authentication
  if (!isAuthenticated) {
    return fallback || <div>Please sign in to continue</div>;
  }

  // Check role if specified
  if (roles && roles.length > 0 && userRole) {
    if (!roles.includes(userRole)) {
      return fallback || <div>You do not have permission to view this page</div>;
    }
  }

  return <>{children}</>;
}
