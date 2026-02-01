import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

// User roles in the system
export const userRoleValidator = v.union(
  v.literal("user"),
  v.literal("seller"),
  v.literal("admin"),
  v.literal("superadmin")
);

// Badge types for gamification
export const badgeValidator = v.union(
  v.literal("gold"),
  v.literal("silver"),
  v.literal("bronze")
);

// App identifiers for user preferences
export const appValidator = v.union(
  v.literal("marketplace"),
  v.literal("forum"),
  v.literal("admin"),
  v.literal("seller")
);

const schema = defineSchema({
  // Convex Auth tables
  ...authTables,

  // Extended users table
  users: defineTable({
    // Basic info
    email: v.string(),
    name: v.optional(v.string()),
    handle: v.optional(v.string()),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),

    // Role and permissions
    role: userRoleValidator,

    // Seller profile (if role is seller)
    sellerProfile: v.optional(
      v.object({
        storeName: v.string(),
        storeDescription: v.optional(v.string()),
        storeImage: v.optional(v.string()),
        verified: v.boolean(),
        rating: v.optional(v.number()),
        totalSales: v.optional(v.number()),
        joinedAt: v.optional(v.string()),
      })
    ),

    // Forum gamification
    points: v.optional(v.number()),
    rank: v.optional(v.number()),
    badge: v.optional(badgeValidator),

    // Metadata
    emailVerified: v.optional(v.boolean()),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_handle", ["handle"])
    .index("by_role", ["role"]),

  // User preferences per app
  userPreferences: defineTable({
    userId: v.id("users"),
    app: appValidator,
    preferences: v.any(), // Flexible JSON for app-specific preferences
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_app", ["userId", "app"]),
});

export default schema;
