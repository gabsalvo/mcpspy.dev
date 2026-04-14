import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import path from 'path';
import os from 'os';
import fs from 'fs';

interface LogRow {
  id: string;
  timestamp: number;
  method: string;
  request_payload: string;
  response_payload: string;
  duration_ms: number;
  status: number;
}

function getDb() {
  // Dynamic import to avoid bundling issues — better-sqlite3 is a native module
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require('better-sqlite3');
  const dbPath = path.join(os.homedir(), '.mcp-spy', 'mcp_logs.db');
  return new Database(dbPath, { readonly: true });
}

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200);

  const dbPath = path.join(os.homedir(), '.mcp-spy', 'mcp_logs.db');

  // If CLI has never run, the DB won't exist yet — return empty array
  if (!fs.existsSync(dbPath)) {
    return NextResponse.json([]);
  }

  try {
    const db = getDb();
    const rows = db.prepare(
      `SELECT id, timestamp, method, request_payload, response_payload, duration_ms, status
       FROM logs
       ORDER BY timestamp DESC
       LIMIT ?`
    ).all(limit) as LogRow[];

    db.close();

    const parsed = rows.map((row) => ({
      ...row,
      request_payload: tryParse(row.request_payload),
      response_payload: tryParse(row.response_payload),
    }));

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Failed to read logs from SQLite:', error.message);
    return NextResponse.json({ error: 'Failed to read logs' }, { status: 500 });
  }
}

function tryParse(str: string) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}
