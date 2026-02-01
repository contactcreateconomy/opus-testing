export const SITE_NAME = "Createconomy";
export const SITE_DESCRIPTION = "Premium AI Creator Community";

export const CATEGORIES = [
  { id: "news", label: "News", icon: "Newspaper", emoji: "📰" },
  { id: "review", label: "Review", icon: "Star", emoji: "⭐" },
  { id: "compare", label: "Compare", icon: "GitCompare", emoji: "⚖️" },
  { id: "list", label: "List", icon: "List", emoji: "📋" },
  { id: "help", label: "Help", icon: "HelpCircle", emoji: "❓" },
  { id: "showcase", label: "Showcase", icon: "Image", emoji: "🖼️" },
  { id: "tutorial", label: "Tutorial", icon: "BookOpen", emoji: "📖" },
] as const;

export const PREMIUM_CATEGORIES = [
  { id: "debate", label: "Debate", icon: "MessageSquare", pointsRequired: 500, emoji: "💬" },
  { id: "launch", label: "Launch", icon: "Rocket", pointsRequired: 1000, emoji: "🚀" },
] as const;

export const FEED_TABS = [
  { id: "top", label: "Top", emoji: "🔥" },
  { id: "hot", label: "Hot", emoji: "⚡" },
  { id: "new", label: "New", emoji: "✨" },
  { id: "fav", label: "Favorites", emoji: "❤️" },
] as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const ANIMATION_DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;

export const CAROUSEL_AUTO_PLAY_INTERVAL = 5000;
export const VIBING_CYCLE_INTERVAL = 4000;
export const INFINITE_SCROLL_THRESHOLD = 200;
