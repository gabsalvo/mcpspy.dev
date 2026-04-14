"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Activity, Clock, Server, ArrowRightLeft, ShieldCheck, Zap, Copy, Check, ExternalLink, Terminal, Download, Trash2 } from 'lucide-react';
import ProUpgradeModal from '../../components/ProUpgradeModal';
import { UserButton, useUser, useAuth } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

function fmtTokens(n: number) {
  if (!n) return null;
  return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
}

function toCurl(log: Record<string, unknown>, port = 4000) {
  let payload = typeof log.requestPayload === 'string' ? log.requestPayload : JSON.stringify(log.requestPayload);
  try { payload = JSON.stringify(JSON.parse(payload), null, 2); } catch { /* leave */ }
  const escaped = payload.replace(/'/g, "'\\''");
  return `curl -s -X POST http://localhost:${port} \\\n  -H 'Content-Type: application/json' \\\n  -d '${escaped}'`;
}

const CLI_API = 'http://localhost:4001';

const syntaxHighlight = (json: unknown) => {
  if (!json) return '';
  // Always pretty-print: parse strings first, then re-stringify with indentation
  let parsed: unknown = json;
  if (typeof json === 'string') {
    try { parsed = JSON.parse(json); } catch { parsed = json; }
  }
  let jsonStr = typeof parsed !== 'string' ? JSON.stringify(parsed, null, 2) : parsed;
  jsonStr = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'text-sky-600'; // number
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'text-slate-700 font-semibold'; // key
      } else {
        cls = 'text-emerald-600'; // string
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-amber-600 font-bold'; // boolean
    } else if (/null/.test(match)) {
      cls = 'text-slate-400 italic'; // null
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
};

function Dashboard() {
  const { user, isLoaded } = useUser();
  const { has } = useAuth();
  // Check Clerk native billing plan first, fall back to publicMetadata set by Clerk webhook
  const isPro = has?.({ plan: 'pro' }) || user?.publicMetadata?.plan === 'pro';

  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverFilter, setServerFilter] = useState<string | undefined>(undefined);
  const [costModel, setCostModel] = useState('claude-sonnet-4.6');

  // Edit & Replay
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [replayPayload, setReplayPayload] = useState('');
  const [replayResult, setReplayResult] = useState<{ status: number; durationMs: number; response: unknown } | null>(null);
  const [replayLoading, setReplayLoading] = useState(false);
  const [replayError, setReplayError] = useState<string | null>(null);
  const [cliOnline, setCliOnline] = useState<boolean | null>(null);

  // Share Trace
  const [shareCopied, setShareCopied] = useState(false);
  const [curlCopied, setCurlCopied] = useState(false);
  const [plainKey, setPlainKey] = useState<string | null>(null);
  const [keyCopied, setKeyCopied] = useState(false);

  // convexUser: undefined = Convex auth not ready, null = no record yet, object = ready
  const convexUser = useQuery(api.users.me);
  const getOrCreate = useMutation(api.users.getOrCreate);
  const rotateKey = useMutation(api.users.rotateApiKey);
  const removeLog = useMutation(api.logs.remove);
  const removeAllLogs = useMutation(api.logs.removeAll);

  // Only run logs query once Convex auth is confirmed (convexUser !== undefined)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convexLogs = useQuery(api.logs.list, isPro && convexUser !== undefined ? { limit: 50, serverName: serverFilter } : 'skip') as any[] | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logs = convexLogs ?? [];

  // Ensure the user record exists in Convex on first dashboard load
  useEffect(() => {
    if (isPro && convexUser === null) {
      getOrCreate().then((result) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((result as any)?._plainKey) setPlainKey((result as any)._plainKey);
      }).catch(console.error);
    }
  }, [isPro, convexUser, getOrCreate]);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  const handleRotateKey = async () => {
    const result = await rotateKey();
    setPlainKey(result._plainKey);
  };

  // Check if CLI local server is reachable
  const checkCli = useCallback(async () => {
    try {
      const res = await fetch(`${CLI_API}/api/health`, { signal: AbortSignal.timeout(2000) });
      setCliOnline(res.ok);
    } catch {
      setCliOnline(false);
    }
  }, []);

  // Poll CLI health every 5s so the status dot stays accurate
  useEffect(() => {
    checkCli();
    const interval = setInterval(checkCli, 5000);
    return () => clearInterval(interval);
  }, [checkCli]);

  const openReplay = useCallback((log: Record<string, unknown>) => {
    let pretty: string;
    try {
      const parsed = typeof log.requestPayload === 'string'
        ? JSON.parse(log.requestPayload)
        : log.requestPayload;
      pretty = JSON.stringify(parsed, null, 2);
    } catch {
      pretty = String(log.requestPayload ?? '');
    }
    setReplayPayload(pretty);
    setReplayResult(null);
    setReplayError(null);
    setIsReplayOpen(true);
    checkCli();
  }, [checkCli]);

  const runReplay = async () => {
    setReplayLoading(true);
    setReplayError(null);
    setReplayResult(null);
    try {
      let parsed: unknown;
      try { parsed = JSON.parse(replayPayload); } catch { parsed = replayPayload; }
      const res = await fetch(`${CLI_API}/api/replay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: parsed }),
      });
      const data = await res.json();
      if (!res.ok) setReplayError(data.error ?? 'Replay failed');
      else setReplayResult(data);
    } catch (err: unknown) {
      setReplayError(err instanceof Error ? err.message : 'Could not reach CLI. Is mcp-spy running?');
    } finally {
      setReplayLoading(false);
    }
  };

  const handleShare = (logId: string) => {
    const url = `${window.location.origin}/trace/${logId}`;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const handleCopyCurl = (log: Record<string, unknown>) => {
    navigator.clipboard.writeText(toCurl(log));
    setCurlCopied(true);
    setTimeout(() => setCurlCopied(false), 2500);
  };

  const handleDownloadPostman = () => {
    const items = logs.map((log: Record<string, unknown>) => {
      let body = typeof log.requestPayload === 'string' ? log.requestPayload : JSON.stringify(log.requestPayload);
      try { body = JSON.stringify(JSON.parse(body), null, 2); } catch { /* leave */ }
      return {
        name: String(log.method ?? 'unknown'),
        request: {
          method: 'POST',
          header: [{ key: 'Content-Type', value: 'application/json' }],
          body: { mode: 'raw', raw: body, options: { raw: { language: 'json' } } },
          url: { raw: 'http://localhost:4000', protocol: 'http', host: ['localhost'], port: '4000' },
        },
      };
    });
    const collection = JSON.stringify({ info: { name: 'MCP-Spy Export', schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' }, item: items }, null, 2);
    const blob = new Blob([collection], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'mcp-spy-collection.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteLog = async (logId: string) => {
    await removeLog({ id: logId as never });
    if (selectedLogId === logId) setSelectedLogId(null);
  };

  const handleClearAll = async () => {
    if (!window.confirm(serverFilter
      ? `Delete all logs from "${serverFilter}"?`
      : 'Delete all logs? This cannot be undone.'
    )) return;
    await removeAllLogs({ serverName: serverFilter });
    setSelectedLogId(null);
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  // ?verify=1 is appended by the PricingTable successUrl — signals user just paid
  const justPaid = searchParams.get('verify') === '1';

  const isVerifyingRef = useRef(false);

  // Auto-select first log when logs arrive
  useEffect(() => {
    if (logs.length > 0 && !selectedLogId) {
      setSelectedLogId(logs[0]._id);
    }
  }, [logs, selectedLogId]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isPro) return;

    // If the user didn't just come from checkout, send them to pricing immediately
    if (!justPaid) {
      router.replace('/pricing');
      return;
    }

    // They just paid — poll for up to ~20s for the webhook to propagate
    if (isVerifyingRef.current) return;
    isVerifyingRef.current = true;

    let cancelled = false;

    const verifyPlan = async () => {
      for (let i = 0; i < 8; i++) {
        await user?.reload();
        if (cancelled) return;
        if (user?.publicMetadata?.plan === 'pro') {
          isVerifyingRef.current = false;
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 2500));
        if (cancelled) return;
      }
      isVerifyingRef.current = false;
      if (!cancelled) router.replace('/pricing');
    };

    verifyPlan();

    return () => { cancelled = true; isVerifyingRef.current = false; };
  }, [isLoaded, isPro, justPaid, user, router]);

  if (!isLoaded) return <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-500">Loading Auth...</div>;
  if (!isPro) {
    return <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-500 font-sans">Verifying your subscription status...</div>;
  }

  const selectedLog = logs.find((l) => l._id === selectedLogId);

  return (
    <div className="flex h-screen w-full bg-slate-50 font-mono text-slate-800 overflow-hidden">

      {/* Sidebar */}
      <div className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0 z-10 shadow-sm">

        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-white shrink-0 select-none">
          <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-wider text-sm">
            <Zap className="w-5 h-5 fill-slate-100 text-slate-400" />
            MCP-SPY
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1.5" title={cliOnline === true ? 'CLI online' : cliOnline === false ? 'CLI offline — run mcp-spy' : 'Checking CLI...'}>
              {cliOnline === true ? (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="bg-emerald-500 relative inline-flex rounded-full h-2.5 w-2.5"></span>
                </span>
              ) : cliOnline === false ? (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="bg-slate-300 relative inline-flex rounded-full h-2.5 w-2.5"></span>
                </span>
              ) : (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="bg-amber-400 relative inline-flex rounded-full h-2.5 w-2.5 animate-pulse"></span>
                </span>
              )}
              <span className="text-[9px] font-medium uppercase tracking-wide text-slate-400">
                {cliOnline === true ? 'live' : cliOnline === false ? 'offline' : '...'}
              </span>
            </div>
            <UserButton />
          </div>
        </div>

        {/* Server filter nav */}
        <div className="px-3 py-3 border-b border-slate-100 space-y-1 bg-slate-50 shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Servers</p>
          <button
            onClick={() => setServerFilter(undefined)}
            className={`w-full flex items-center text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${!serverFilter ? 'bg-white border border-slate-200 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent'}`}
          >
            All servers
          </button>
          {[...new Set((convexLogs ?? []).map((l: Record<string, string>) => l.serverName).filter(Boolean))].map((name) => (
            <button
              key={name as string}
              onClick={() => setServerFilter(name as string)}
              className={`w-full flex items-center text-left px-3 py-2 rounded-lg text-xs font-mono transition-all ${serverFilter === name ? 'bg-violet-50 border border-violet-200 text-violet-800 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent'}`}
            >
              {name as string}
            </button>
          ))}
          {(convexLogs ?? []).length > 0 && [...new Set((convexLogs ?? []).map((l: Record<string, string>) => l.serverName).filter(Boolean))].length === 0 && (
            <p className="text-[10px] text-slate-400 px-3 py-1">No server labels yet.<br />Use <code className="bg-slate-100 px-1 rounded">--name</code> flag.</p>
          )}
        </div>

        {/* Token Analytics */}
        {logs.length > 0 && (() => {
          const visibleLogs = serverFilter ? logs.filter((l: Record<string, unknown>) => l.serverName === serverFilter) : logs;
          const totalReq = visibleLogs.reduce((s: number, l: Record<string, unknown>) => s + ((l.tokenCountReq as number) ?? 0), 0);
          const totalRes = visibleLogs.reduce((s: number, l: Record<string, unknown>) => s + ((l.tokenCountRes as number) ?? 0), 0);
          const total = totalReq + totalRes;
          if (total === 0) return null;

          // Per-method breakdown (top 5)
          const byMethod: Record<string, number> = {};
          for (const l of visibleLogs as Record<string, unknown>[]) {
            const m = String(l.method ?? 'unknown');
            byMethod[m] = (byMethod[m] ?? 0) + ((l.tokenCountReq as number) ?? 0) + ((l.tokenCountRes as number) ?? 0);
          }
          const topMethods = Object.entries(byMethod).sort((a, b) => b[1] - a[1]).slice(0, 5);
          const maxTokens = topMethods[0]?.[1] ?? 1;

          return (
            <div className="px-3 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Token Analytics</p>
              {/* Totals row */}
              <div className="flex gap-2 mb-3">
                <div className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-center">
                  <div className="text-[11px] font-bold text-slate-900">{fmtTokens(total)}</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wide">total</div>
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-center">
                  <div className="text-[11px] font-bold text-sky-600">{fmtTokens(totalReq)}</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wide">req</div>
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-center">
                  <div className="text-[11px] font-bold text-emerald-600">{fmtTokens(totalRes)}</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wide">res</div>
                </div>
              </div>
              {/* Per-method bars */}
              <div className="space-y-1.5">
                {topMethods.map(([method, tokens]) => (
                  <div key={method}>
                    <div className="flex justify-between text-[9px] text-slate-500 mb-0.5">
                      <span className="truncate max-w-35 font-mono">{method}</span>
                      <span className="shrink-0 ml-1">~{fmtTokens(tokens)}</span>
                    </div>
                    <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-400 rounded-full"
                        style={{ width: `${Math.round((tokens / maxTokens) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Model picker + cost estimate */}
              {(() => {
                const MODELS: Record<string, { label: string; rate: number }> = {
                  // ── Anthropic ──────────────────────────────
                  'claude-opus-4.6': { label: 'Claude Opus 4.6', rate: 5.00 }, //
                  'claude-sonnet-4.6': { label: 'Claude Sonnet 4.6', rate: 3.00 }, //
                  'claude-haiku-4.5': { label: 'Claude Haiku 4.5', rate: 1.00 }, //

                  // ── OpenAI ─────────────────────────────────
                  'gpt-5.4': { label: 'GPT-5.4', rate: 2.50 }, //
                  'gpt-5.4-mini': { label: 'GPT-5.4 Mini', rate: 0.75 }, //
                  'gpt-5.2': { label: 'GPT-5.2', rate: 1.75 }, //
                  'gpt-5': { label: 'GPT-5', rate: 1.25 }, //
                  'gpt-5-mini': { label: 'GPT-5 Mini', rate: 0.25 }, //
                  'o4-mini': { label: 'o4-mini', rate: 1.10 }, //

                  // ── Google ─────────────────────────────────
                  'gemini-3.1-pro': { label: 'Gemini 3.1 Pro', rate: 2.00 }, //
                  'gemini-2.5-pro': { label: 'Gemini 2.5 Pro', rate: 1.25 }, //
                  'gemini-2.0-flash-lite': { label: 'Gemini 2.0 Flash-Lite', rate: 0.075 }, //

                  // ── Open Weights / Others ──────────────────
                  'grok-4': { label: 'Grok 4', rate: 3.00 }, //
                  'deepseek-r1': { label: 'DeepSeek R1', rate: 0.80 }, //
                  'deepseek-v3.2': { label: 'DeepSeek V3.2', rate: 0.28 }, //
                  'llama-4-maverick': { label: 'Llama 4 Maverick', rate: 0.15 } //
                };
                const { rate } = MODELS[costModel] ?? MODELS['claude-sonnet-4.6'];
                const cost = (total / 1_000_000) * rate;
                return (
                  <div className="mt-2 px-1 flex items-center justify-between gap-2">
                    <span className="text-[9px] text-slate-400">~${cost.toFixed(4)} est.</span>
                    <select
                      value={costModel}
                      onChange={e => setCostModel(e.target.value)}
                      className="text-[9px] text-slate-500 bg-transparent border border-slate-200 rounded px-1 py-0.5 cursor-pointer hover:border-slate-300 transition-colors outline-none"
                    >
                      {Object.entries(MODELS).map(([key, { label }]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                );
              })()}
            </div>
          );
        })()}

        {/* API Key Section */}
        <div className="px-3 py-3 border-b border-slate-100 bg-white shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cloud Sync Key</p>
          {plainKey ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 bg-slate-900 rounded-lg px-2 py-1.5">
                <code className="text-[10px] text-emerald-400 flex-1 truncate">{plainKey}</code>
                <button onClick={() => handleCopyKey(plainKey)} className="text-slate-400 hover:text-white text-[10px] shrink-0">
                  {keyCopied ? '✓' : 'copy'}
                </button>
              </div>
              <p className="text-[9px] text-slate-400">Use with: <code className="text-slate-600">--sync &lt;key&gt;</code></p>
              <button onClick={handleRotateKey} className="text-[9px] text-slate-400 hover:text-red-500 transition-colors">
                Generate new key (invalidates current)
              </button>
            </div>
          ) : convexUser ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2 py-1.5">
                <code className="text-[10px] text-slate-500 flex-1 truncate">{convexUser.apiKeyPrefix}••••••••</code>
              </div>
              <p className="text-[9px] text-slate-400">Use with: <code className="text-slate-600">--sync &lt;key&gt;</code></p>
              <button onClick={handleRotateKey} className="text-[9px] text-slate-500 hover:text-slate-900 transition-colors underline underline-offset-2">
                Generate new key
              </button>
            </div>
          ) : (
            <p className="text-[10px] text-slate-400">Loading...</p>
          )}
        </div>

        {/* Server filter pill */}
        {serverFilter && (
          <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2 bg-violet-50 shrink-0">
            <span className="text-[10px] text-violet-700 font-medium">Filtering:</span>
            <span className="text-[10px] font-mono bg-white text-violet-700 border border-violet-200 px-2 py-0.5 rounded">{serverFilter}</span>
            <button onClick={() => setServerFilter(undefined)} className="ml-auto text-[10px] text-violet-400 hover:text-violet-700 transition-colors">✕ clear</button>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto py-2 space-y-1 px-3">
          {logs.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              <Activity className="w-8 h-8 mx-auto mb-3 opacity-20" />
              Waiting for traffic...
            </div>
          ) : (
            logs.map((log) => {
              const isSelected = selectedLogId === log._id;
              const hasError = log.status >= 400;
              const isSlow = log.durationMs > 1000;

              return (
                <button
                  key={log._id}
                  onClick={() => setSelectedLogId(log._id)}
                  className={`${isSelected ? 'bg-white border-slate-300 shadow-sm' : 'bg-transparent border-transparent hover:bg-slate-100 cursor-pointer'} w-full text-left p-3 rounded-lg border transition-all duration-200 group`}
                >
                  <div className="flex justify-between items-start mb-1 text-sm font-semibold truncate pr-2">
                    <span className={hasError ? 'text-red-500' : (isSelected ? 'text-slate-900' : 'text-slate-600')}>
                      {log.method}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-wide">
                    <span className="flex items-center gap-1">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {fmtTokens((log.tokenCountReq ?? 0) + (log.tokenCountRes ?? 0)) && (
                        <span className="text-[10px] text-slate-400">~{fmtTokens((log.tokenCountReq ?? 0) + (log.tokenCountRes ?? 0))}t</span>
                      )}
                      {log.wasRedacted && <span title="PII was redacted" className="text-amber-500 text-[10px]">🔒</span>}
                      <span className={`${hasError ? 'text-red-500' : (isSlow ? 'text-amber-500' : 'text-emerald-500')} flex items-center gap-1`}>
                        <Clock className="w-3 h-3" />
                        {log.durationMs}ms
                      </span>
                    </div>
                  </div>
                  {log.serverName && (
                    <div className="mt-1">
                      <span
                        className="text-[10px] bg-violet-50 text-violet-600 border border-violet-100 px-1.5 py-0.5 rounded font-mono cursor-pointer hover:bg-violet-100 transition-colors"
                        onClick={e => { e.stopPropagation(); setServerFilter(f => f === log.serverName ? undefined : log.serverName); }}
                      >
                        {log.serverName}
                      </span>
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Clear logs button */}
        {logs.length > 0 && (
          <div className="px-3 py-2 border-t border-slate-100 shrink-0">
            <button
              onClick={handleClearAll}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all"
            >
              <Trash2 className="w-3 h-3" />
              {serverFilter ? `Clear "${serverFilter}" logs` : 'Clear all logs'}
            </button>
          </div>
        )}
      </div>

      {/* Main Area: Inspection View */}
      <div className="flex-1 flex flex-col bg-slate-50 relative">

        {/* Top Nav / Ribbon */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            {selectedLog ? (
              <>
                <span className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                  <Server className="w-3.5 h-3.5" /> {selectedLog.method}
                </span>
                <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${selectedLog.status >= 500 ? 'bg-red-50 text-red-600 border border-red-100' : selectedLog.status >= 400 ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                  <ShieldCheck className="w-3.5 h-3.5" /> HTTP {selectedLog.status}
                </span>
                {selectedLog.serverName && (
                  <span className="text-[11px] bg-violet-50 text-violet-600 border border-violet-100 px-2.5 py-1 rounded-full font-mono">
                    {selectedLog.serverName}
                  </span>
                )}
                {((selectedLog.tokenCountReq ?? 0) + (selectedLog.tokenCountRes ?? 0)) > 0 && (
                  <span className="text-[11px] bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-full font-mono">
                    ~{fmtTokens((selectedLog.tokenCountReq ?? 0) + (selectedLog.tokenCountRes ?? 0))} tokens
                  </span>
                )}
                {selectedLog.wasRedacted && (
                  <span className="text-[11px] bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full font-medium">
                    🔒 redacted
                  </span>
                )}
              </>
            ) : (
              <span className="text-slate-400">Select a request to inspect payloads</span>
            )}

            {/* Context Action Buttons */}
            {selectedLog && (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
                <button
                  onClick={() => openReplay(selectedLog)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-600 transition-colors border border-slate-200 text-xs shadow-sm hover:shadow"
                >
                  <span className="text-[11px]">🔄</span> Edit &amp; Replay
                </button>
                <button
                  onClick={() => handleCopyCurl(selectedLog)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-600 transition-colors border border-slate-200 text-xs shadow-sm"
                >
                  {curlCopied
                    ? <><Check className="w-3 h-3 text-emerald-500" /> Copied!</>
                    : <><Terminal className="w-3 h-3" /> Copy cURL</>
                  }
                </button>
                <button
                  onClick={() => handleShare(selectedLog._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-600 transition-colors border border-slate-200 text-xs shadow-sm"
                >
                  {shareCopied
                    ? <><Check className="w-3 h-3 text-emerald-500" /> Copied!</>
                    : <><ExternalLink className="w-3 h-3" /> Share</>
                  }
                </button>
                <button
                  onClick={() => handleDeleteLog(selectedLog._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors border border-slate-200 text-xs shadow-sm"
                  title="Delete this log"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {logs.length > 0 && (
              <button
                onClick={handleDownloadPostman}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-500 text-xs font-medium transition-all border border-slate-200 shadow-sm"
                title="Export all visible logs as a Postman collection"
              >
                <Download className="w-3 h-3" /> Postman
              </button>
            )}
            <a
              href="/"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium tracking-wide transition-all border border-slate-200 shadow-sm">
              ← Home
            </a>
          </div>
        </div>

        {/* Body: Split View */}
        {selectedLog ? (
          <div className="flex-1 flex gap-px bg-slate-200 overflow-hidden">
            {/* Request Pane */}
            <div className="flex-1 flex flex-col bg-white min-w-0">
              <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 shrink-0 shadow-sm z-10">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Request Payload</span>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-white shadow-inner">
                <pre className="text-[13px] leading-relaxed">
                  <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(selectedLog.requestPayload) }} />
                </pre>
              </div>
            </div>

            {/* Response Pane */}
            <div className="flex-1 flex flex-col bg-white min-w-0 border-l border-slate-200">
              <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 shrink-0 shadow-sm z-10">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Response Payload</span>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-white shadow-inner">
                {selectedLog.responsePayload ? (
                  <pre className="text-[13px] leading-relaxed">
                    <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(selectedLog.responsePayload) }} />
                  </pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 italic text-sm">
                    No response data available
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-50">
            <div className="text-center text-slate-400">
              <Server className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-sm">Waiting for JSON-RPC payloads to intercept...</p>
            </div>
          </div>
        )}
      </div>

      <ProUpgradeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Edit & Replay Modal */}
      {isReplayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-6xl flex flex-col" style={{ height: '80vh' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-sm font-bold text-slate-900">Edit &amp; Replay</h2>
                <span className="text-xs">
                  {cliOnline === true && <span className="text-emerald-500 font-medium">● CLI online</span>}
                  {cliOnline === false && <span className="text-red-500 font-medium">● CLI offline — run <code className="bg-red-50 px-1 rounded">mcp-spy --target ...</code> first</span>}
                  {cliOnline === null && <span className="text-slate-400">Checking CLI...</span>}
                </span>
              </div>
              <button onClick={() => setIsReplayOpen(false)} className="text-slate-400 hover:text-slate-700 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">×</button>
            </div>

            <div className="flex flex-1 gap-px bg-slate-200 overflow-hidden rounded-b-2xl min-h-0">
              {/* Left: editable request */}
              <div className="flex-1 flex flex-col bg-white min-w-0">
                <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Request — edit &amp; send</span>
                  <button
                    onClick={runReplay}
                    disabled={replayLoading || cliOnline === false}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all"
                  >
                    {replayLoading ? '⏳ Sending...' : '▶ Send'}
                  </button>
                </div>
                <textarea
                  value={replayPayload}
                  onChange={e => setReplayPayload(e.target.value)}
                  spellCheck={false}
                  className="flex-1 p-5 font-mono text-[13px] leading-relaxed text-slate-800 resize-none outline-none bg-white min-h-0"
                />
              </div>

              {/* Right: response */}
              <div className="flex-1 flex flex-col bg-white min-w-0">
                <div className="px-4 py-2.5 border-b border-slate-100 flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Response</span>
                  {replayResult && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${replayResult.status >= 400 ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50'}`}>
                      HTTP {replayResult.status} · {replayResult.durationMs}ms
                    </span>
                  )}
                </div>
                <div className="flex-1 overflow-auto p-5 min-h-0">
                  {replayError && (
                    <div className="text-red-600 text-sm font-mono bg-red-50 border border-red-100 rounded-xl p-4">{replayError}</div>
                  )}
                  {replayResult && !replayError && (
                    <pre className="text-[13px] leading-relaxed font-mono text-slate-800">
                      <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(replayResult.response) }} />
                    </pre>
                  )}
                  {!replayResult && !replayError && !replayLoading && (
                    <div className="h-full flex items-center justify-center text-slate-300 text-sm italic">
                      Edit the request and click Send
                    </div>
                  )}
                  {replayLoading && (
                    <div className="h-full flex items-center justify-center text-slate-400 text-sm">Sending...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-500">Loading...</div>}>
      <Dashboard />
    </React.Suspense>
  );
}






