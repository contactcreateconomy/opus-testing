export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  points?: number;
  rank?: number;
  badge?: "gold" | "silver" | "bronze";
}

export interface LeaderboardUser extends User {
  rank: number;
  points: number;
  badge: "gold" | "silver" | "bronze";
  weeklyChange?: number;
}
