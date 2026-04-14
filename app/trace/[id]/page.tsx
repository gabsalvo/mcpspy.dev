"use client";
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Zap, Clock, Server, ArrowRightLeft, ArrowUpRight } from 'lucide-react';

function syntaxHighlight(json: unknown): string {
  if (!json) return '';
  let parsed: unknown = json;
  if (typeof json === 'string') {
    try { parsed = JSON.parse(json); } catch { parsed = json; }
  }
  let str = typeof parsed !== 'string' ? JSON.stringify(parsed, null, 2) : parsed;
  str = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
    let cls = 'text-sky-600';
    if (/^"/.test(match)) {
      cls = /:$/.test(match) ? 'text-slate-700 font-semibold' : 'text-emerald-600';
    } else if (/true|false/.test(match)) {
      cls = 'text-amber-600 font-bold';
    } else if (/null/.test(match)) {
      cls = 'text-slate-400 italic';
    }
    return `<span class="${cls}">${match}</span>`;
  });
}

function statusColor(code: number) {
  if (code >= 500) return 'text-red-500';
  if (code >= 400) return 'text-amber-500';
  return 'text-emerald-600';
}

function statusBg(code: number) {
  if (code >= 500) return 'bg-red-50 border-red-100 text-red-700';
  if (code >= 400) return 'bg-amber-50 border-amber-100 text-amber-700';
  return 'bg-emerald-50 border-emerald-100 text-emerald-700';
}

export default function TracePage() {
  const params = useParams();
  const id = params.id as string;

  const log = useQuery(api.logs.getPublic, { id: id as Id<'logs'> });

  if (log === undefined) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 font-mono text-sm animate-pulse">Loading trace...</div>
      </div>
    );
  }

  if (log === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center font-mono">
          <p className="text-slate-600 text-lg mb-2 font-semibold">Trace not found</p>
          <p className="text-slate-400 text-sm mb-5">This link may have expired or been deleted.</p>
          <Link href="/" className="text-sky-600 hover:text-sky-500 text-sm font-medium">← mcpspy.dev</Link>
        </div>
      </div>
    );
  }

  const reqPayload = log.requestPayload;
  const resPayload = log.responsePayload ?? null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-mono">

      {/* Top navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-0 flex items-center justify-between h-14 shrink-0">
        {/* Left: brand + shared trace label */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-widest hover:text-slate-600 transition-colors">
            <Zap className="w-4 h-4" />
            MCP-SPY
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400 text-xs font-medium">Shared Trace</span>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 hidden sm:block">Inspect your own MCP traffic →</span>
          <Link
            href="/pricing"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-sm"
          >
            Get MCP-Spy <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Metadata ribbon */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 shrink-0">
        <span className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full font-medium text-slate-700">
          <Server className="w-3.5 h-3.5" />
          {log.method}
        </span>
        <ArrowRightLeft className="w-3.5 h-3.5 text-slate-300" />
        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold ${statusBg(log.status)}`}>
          HTTP {log.status}
        </span>
        <span className="text-slate-300">·</span>
        <span className="flex items-center gap-1 text-slate-500">
          <Clock className="w-3 h-3" />
          {log.durationMs}ms
        </span>
        <span className="text-slate-300">·</span>
        <span className="text-slate-400">{new Date(log.timestamp).toLocaleString()}</span>
      </div>

      {/* Payload split view */}
      <div className="flex flex-1 gap-px bg-slate-200 overflow-hidden" style={{ minHeight: 'calc(100vh - 109px)' }}>

        {/* Request */}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Request Payload</span>
          </div>
          <div className="flex-1 overflow-auto p-5">
            <pre className="text-[13px] leading-relaxed">
              <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(reqPayload) }} />
            </pre>
          </div>
        </div>

        {/* Response */}
        <div className="flex-1 flex flex-col bg-white min-w-0">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Response Payload</span>
          </div>
          <div className="flex-1 overflow-auto p-5">
            {resPayload ? (
              <pre className="text-[13px] leading-relaxed">
                <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(resPayload) }} />
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-300 text-sm italic">
                No response data
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA banner */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
        <div>
          <p className="text-sm font-semibold">Want to inspect your own AI tool calls?</p>
          <p className="text-xs text-slate-400 mt-0.5">MCP-Spy intercepts every MCP request in real time — free locally, or sync to the cloud with Pro.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/docs" className="text-xs text-slate-400 hover:text-white transition-colors font-medium">
            Read the docs
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold transition-all shadow-sm"
          >
            Get started free <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
