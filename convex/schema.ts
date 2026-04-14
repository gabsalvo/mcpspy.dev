import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // One row per Clerk user — created on first sync, stores the API key for CLI --sync
  users: defineTable({
    tokenIdentifier: v.string(),   // from ctx.auth.getUserIdentity().tokenIdentifier
    clerkUserId: v.string(),       // Clerk's user ID (sub claim)
    apiKey: v.string(),            // hashed key used by CLI --sync
    apiKeyPrefix: v.string(),      // first 8 chars shown in dashboard (e.g. mcp_live_)
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_clerkUserId", ["clerkUserId"])
    .index("by_apiKey", ["apiKey"]),

  // One row per intercepted MCP request, written by CLI via HTTP action
  logs: defineTable({
    userId: v.string(),            // tokenIdentifier of the owning user
    method: v.string(),
    requestPayload: v.string(),    // JSON string (kept as string to avoid size issues)
    responsePayload: v.optional(v.string()),
    durationMs: v.number(),
    status: v.number(),
    timestamp: v.number(),         // Unix ms
    serverName: v.optional(v.string()), // label from --name flag, e.g. "filesystem"
  })
    .index("by_userId_timestamp", ["userId", "timestamp"])
    .index("by_userId_server", ["userId", "serverName"]),
});
