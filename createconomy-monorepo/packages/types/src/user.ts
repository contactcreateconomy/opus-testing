export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  email?: string;
  bio?: string;
  verified?: boolean;
  points?: number;
  rank?: number;
  badge?: "gold" | "silver" | "bronze";
  role?: UserRole;
  sellerProfile?: SellerProfile;
  createdAt?: string;
  updatedAt?: string;
}

export type UserRole = "user" | "seller" | "admin" | "superadmin";

export interface LeaderboardUser extends User {
  rank: number;
  points: number;
  badge: "gold" | "silver" | "bronze";
  weeklyChange?: number;
}

export interface SellerProfile {
  storeName: string;
  storeDescription?: string;
  storeImage?: string;
  verified: boolean;
  rating?: number;
  totalSales?: number;
  joinedAt?: string;
}

export interface UserPreferences {
  userId: string;
  app: "marketplace" | "forum" | "admin" | "seller";
  preferences: Record<string, unknown>;
}
