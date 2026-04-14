import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

// POST /ingest — called by the CLI's --sync flag for each intercepted request
// Body: { method, requestPayload, responsePayload, durationMs, status, timestamp }
// Header: Authorization: Bearer <api_key>
http.route({
  path: "/ingest",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    // Validate API key
    const authHeader = req.headers.get("Authorization") ?? "";
    const apiKey = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashed = btoa(apiKey);
    const user = await ctx.runQuery(internal.users.findByApiKey, { hashedKey: hashed });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body: {
      method?: string;
      requestPayload?: string;
      responsePayload?: string;
      durationMs?: number;
      status?: number;
      timestamp?: number;
      serverName?: string;
      tokenCountReq?: number;
      tokenCountRes?: number;
      wasRedacted?: boolean;
    };
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await ctx.runMutation(internal.logs.insert, {
      userId: user.tokenIdentifier,
      method: body.method ?? "unknown",
      requestPayload: body.requestPayload ?? "",
      responsePayload: body.responsePayload,
      durationMs: body.durationMs ?? 0,
      status: body.status ?? 200,
      timestamp: body.timestamp ?? Date.now(),
      serverName: body.serverName,
      tokenCountReq: body.tokenCountReq,
      tokenCountRes: body.tokenCountRes,
      wasRedacted: body.wasRedacted,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;
