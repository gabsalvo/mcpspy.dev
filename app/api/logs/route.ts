import { NextResponse } from 'next/server';

export async function GET() {
  // In a real cloud setup, we would fetch logs belonging to the authenticated user from a database
  const demoLogs = [
    {
      id: 1,
      method: "mcp/initialize",
      timestamp: new Date().toISOString(),
      duration_ms: 120,
      status: 200,
      request_payload: { method: "initialize", params: { protocolVersion: "1.0", capabilities: {} } },
      response_payload: { result: { serverInfo: { name: "Mock MCP", version: "1.0" } } }
    },
    {
      id: 2,
      method: "mcp/listTools",
      timestamp: new Date().toISOString(),
      duration_ms: 45,
      status: 200,
      request_payload: { method: "listTools" },
      response_payload: { result: { tools: [{ name: "search", description: "Search docs" }] } }
    }
  ];

  return NextResponse.json(demoLogs);
}
