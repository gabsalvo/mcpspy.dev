import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Called by the dashboard to fetch the authenticated user's logs
export const list = query({
  args: {
    limit: v.optional(v.number()),
    serverName: v.optional(v.string()), // filter by server label; omit for all
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const limit = Math.min(args.limit ?? 50, 200);

    if (args.serverName) {
      return await ctx.db
        .query("logs")
        .withIndex("by_userId_server", (q) =>
          q.eq("userId", identity.tokenIdentifier).eq("serverName", args.serverName)
        )
        .order("desc")
        .take(limit);
    }

    return await ctx.db
      .query("logs")
      .withIndex("by_userId_timestamp", (q) =>
        q.eq("userId", identity.tokenIdentifier)
      )
      .order("desc")
      .take(limit);
  },
});

// Public read — no auth required, used by /trace/[id] share page
export const getPublic = query({
  args: { id: v.id("logs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Delete a single log — only the owning user can delete their own logs
export const remove = mutation({
  args: { id: v.id("logs") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");
    const log = await ctx.db.get(args.id);
    if (!log || log.userId !== identity.tokenIdentifier) throw new Error("Not found");
    await ctx.db.delete(args.id);
  },
});

// Delete all logs for the authenticated user (respects optional serverName filter)
export const removeAll = mutation({
  args: { serverName: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const logs = args.serverName
      ? await ctx.db
          .query("logs")
          .withIndex("by_userId_server", (q) =>
            q.eq("userId", identity.tokenIdentifier).eq("serverName", args.serverName)
          )
          .collect()
      : await ctx.db
          .query("logs")
          .withIndex("by_userId_timestamp", (q) =>
            q.eq("userId", identity.tokenIdentifier)
          )
          .collect();

    await Promise.all(logs.map((l) => ctx.db.delete(l._id)));
    return logs.length;
  },
});

// Internal mutation called by the HTTP ingest action
export const insert = internalMutation({
  args: {
    userId: v.string(),
    method: v.string(),
    requestPayload: v.string(),
    responsePayload: v.optional(v.string()),
    durationMs: v.number(),
    status: v.number(),
    timestamp: v.number(),
    serverName: v.optional(v.string()),
    tokenCountReq: v.optional(v.number()),
    tokenCountRes: v.optional(v.number()),
    wasRedacted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("logs", args);
  },
});
