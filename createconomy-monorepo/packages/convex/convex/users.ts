import { v } from "convex/values";
import { query, mutation, QueryCtx, MutationCtx } from "./_generated/server";
import { userRoleValidator } from "./schema";

// Helper to get current user identity
async function getIdentity(ctx: QueryCtx | MutationCtx) {
  return await ctx.auth.getUserIdentity();
}

// Get current authenticated user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    const identity = await getIdentity(ctx);
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q: any) => q.eq("email", identity.email!))
      .first();

    return user;
  },
});

// Get user by ID
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx: QueryCtx, args: { userId: any }) => {
    return await ctx.db.get(args.userId);
  },
});

// Get user by handle
export const getUserByHandle = query({
  args: { handle: v.string() },
  handler: async (ctx: QueryCtx, args: { handle: string }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_handle", (q: any) => q.eq("handle", args.handle))
      .first();
  },
});

// Create or update user (called after auth)
export const upsertUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx: MutationCtx, args: { email: string; name?: string; image?: string }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q: any) => q.eq("email", args.email))
      .first();

    const now = new Date().toISOString();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        name: args.name || existingUser.name,
        image: args.image || existingUser.image,
        updatedAt: now,
      });
      return existingUser._id;
    } else {
      // Create new user
      return await ctx.db.insert("users", {
        email: args.email,
        name: args.name,
        image: args.image,
        role: "user",
        points: 0,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    handle: v.optional(v.string()),
    bio: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx: MutationCtx, args: { name?: string; handle?: string; bio?: string; image?: string }) => {
    const identity = await getIdentity(ctx);
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q: any) => q.eq("email", identity.email!))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Check handle uniqueness if updating
    if (args.handle && args.handle !== user.handle) {
      const existingHandle = await ctx.db
        .query("users")
        .withIndex("by_handle", (q: any) => q.eq("handle", args.handle))
        .first();

      if (existingHandle) {
        throw new Error("Handle already taken");
      }
    }

    await ctx.db.patch(user._id, {
      ...args,
      updatedAt: new Date().toISOString(),
    });

    return user._id;
  },
});

// Update user role (admin only)
export const updateUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: userRoleValidator,
  },
  handler: async (ctx: MutationCtx, args: { userId: any; role: "user" | "seller" | "admin" | "superadmin" }) => {
    const identity = await getIdentity(ctx);
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q: any) => q.eq("email", identity.email!))
      .first();

    if (!currentUser || !["admin", "superadmin"].includes(currentUser.role)) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.userId, {
      role: args.role,
      updatedAt: new Date().toISOString(),
    });

    return args.userId;
  },
});

// Get leaderboard
export const getLeaderboard = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx: QueryCtx, args: { limit?: number }) => {
    const limit = args.limit || 10;

    // Get users sorted by points
    const users = await ctx.db
      .query("users")
      .order("desc")
      .take(100);

    // Sort by points and take top N
    return users
      .filter((u: any) => u.points !== undefined && u.points > 0)
      .sort((a: any, b: any) => (b.points || 0) - (a.points || 0))
      .slice(0, limit)
      .map((user: any, index: number) => ({
        ...user,
        rank: index + 1,
      }));
  },
});
