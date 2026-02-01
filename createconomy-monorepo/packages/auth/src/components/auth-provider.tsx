"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";

interface AuthProviderProps {
  children: ReactNode;
  convexUrl: string;
}

// Create singleton client
let convexClient: ConvexReactClient | null = null;

function getConvexClient(url: string) {
  if (!convexClient) {
    convexClient = new ConvexReactClient(url);
  }
  return convexClient;
}

export function AuthProvider({ children, convexUrl }: AuthProviderProps) {
  const client = getConvexClient(convexUrl);

  return (
    <ConvexAuthProvider client={client}>
      {children}
    </ConvexAuthProvider>
  );
}
