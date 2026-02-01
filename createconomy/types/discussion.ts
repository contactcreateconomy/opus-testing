import { User } from "./user";

export interface Discussion {
  id: string;
  title: string;
  summary: string;
  author: User;
  category: string;
  createdAt: string;
  upvotes: number;
  comments: number;
  participants: User[];
  previewImage?: string;
  isFavorited?: boolean;
  isUpvoted?: boolean;
  tags?: string[];
}

export interface FeaturedDiscussion {
  id: string;
  title: string;
  image: string;
  category: string;
  author: User;
  gradient?: string;
}

export interface VibingItem {
  id: string;
  title: string;
  author: User;
  trend: "up" | "down" | "stable";
  engagement: number;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  sponsor: string;
  sponsorLogo: string;
  endDate: string;
  prize: string;
  participants: number;
  gradient: string;
}
