import { mutation, query, internalQuery } from "./_generated/server";
import { v } from "convex/values";

// Generate a random API key prefixed with mcp_live_
function generateApiKey(): { key: string; prefix: string; hashed: string } {
  const random = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");
  const key = "mcp_live_" + random;
  const prefix = key.slice(0, 17); // "mcp_live_" + 8 chars
  // Simple hash for storage — in prod use a proper bcrypt via an action
  const hashed = btoa(key);
  return { key, prefix, hashed };
}

// Get or create the user record; returns the user doc
export const getOrCreate = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const existing = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (existing) return existing;

    const { key, prefix, hashed } = generateApiKey();
    const id = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      clerkUserId: identity.subject,
      apiKey: hashed,
      apiKeyPrefix: prefix,
    });

    // Return the full key ONCE (on creation) — never stored in plaintext again
    return { ...(await ctx.db.get(id))!, _plainKey: key };
  },
});

// Rotate the API key
export const rotateApiKey = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new Error("User not found");

    const { key, prefix, hashed } = generateApiKey();
    await ctx.db.patch(user._id, { apiKey: hashed, apiKeyPrefix: prefix });

    return { _plainKey: key, apiKeyPrefix: prefix };
  },
});

// Get current user's profile (for dashboard display)
export const me = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
  },
});

// Internal query used by the ingest HTTP action to validate an API key
export const findByApiKey = internalQuery({
  args: { hashedKey: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_apiKey", (q) => q.eq("apiKey", args.hashedKey))
      .unique();
  },
});
