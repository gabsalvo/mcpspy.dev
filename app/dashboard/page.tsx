"use client";
import React, { useEffect, useState } from 'react';
import { Activity, Clock, Server, ArrowRightLeft, ShieldCheck, Zap } from 'lucide-react';
import ProUpgradeModal from '../../components/ProUpgradeModal';
import { UserButton, useUser } from '@clerk/nextjs';
import { Lock } from 'lucide-react';

const syntaxHighlight = (json: any) => {
  if (!json) return '';
  let jsonStr = typeof json !== 'string' ? JSON.stringify(json, null, 2) : json;
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

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const isPro = user?.publicMetadata?.plan === 'pro';

  const [logs, setLogs] = useState<any[]>([]);
  const [selectedLogId, setSelectedLogId] = useState<number | null>(null);
  const [isPolling, setIsPolling] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isLoaded) return <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-500">Loading Auth...</div>;
  if (!isPro) {
    if (typeof window !== 'undefined') {
       window.location.href = '/pricing';
    }
    return <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-500 font-sans">Redirecting to checkout session...</div>;
  }

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs?limit=50');
      if(res.ok) {
        const data = await res.json();
        setLogs(prevLogs => JSON.stringify(data) !== JSON.stringify(prevLogs) ? data : prevLogs);
        setSelectedLogId(prevId => prevId || (data.length > 0 ? data[0].id : null));
      }
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  };

  useEffect(() => {
    fetchLogs();
    let interval: NodeJS.Timeout | undefined;
    if (isPolling) {
      interval = setInterval(fetchLogs, 1500);
    }
    return () => clearInterval(interval);
  }, [isPolling]);

  const selectedLog = logs.find((l) => l.id === selectedLogId);

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
          <div className="flex items-center justify-center gap-4">
            <span className="relative flex h-2.5 w-2.5">
              {isPolling && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
              <span className={"\${isPolling ? 'bg-emerald-500' : 'bg-red-500'} relative inline-flex rounded-full h-2.5 w-2.5"}></span>
            </span>
            <UserButton />
          </div>
        </div>

        {/* Sidebar Pro Nav hooks */}
        <div className="px-3 py-3 border-b border-slate-100 space-y-1 bg-slate-50 shrink-0">
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent transition-all group"
          >
            <span className="flex items-center gap-2">🌐 Unified Multi-MCP View</span>
            <span className="text-[9px] font-bold bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded border border-sky-200 transition-colors">PRO</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent transition-all group"
          >
            <span className="flex items-center gap-2">💸 Token Spend Analytics</span>
            <span className="text-[9px] font-bold bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded border border-sky-200 transition-colors">PRO</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-2 space-y-1 px-3">
          {logs.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              <Activity className="w-8 h-8 mx-auto mb-3 opacity-20" />
              Waiting for traffic...
            </div>
          ) : (
            logs.map((log) => {
              const isSelected = selectedLogId === log.id;
              const hasError = log.status >= 400;
              const isSlow = log.duration_ms > 1000;

              return (
                <button
                  key={log.id}
                  onClick={() => setSelectedLogId(log.id)}
                  className={"\${isSelected ? 'bg-white border-slate-300 shadow-sm' : 'bg-transparent border-transparent hover:bg-slate-100 cursor-pointer'} w-full text-left p-3 rounded-lg border transition-all duration-200 group"}
                >
                  <div className="flex justify-between items-start mb-1 text-sm font-semibold truncate pr-2">
                    <span className={`hasError ? 'text-red-500' : (isSelected ? 'text-slate-900' : 'text-slate-600')`} >
                      {log.method}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-wide">
                    <span className="flex items-center gap-1">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <span className={`hasError ? 'text-red-500' : (isSlow ? 'text-amber-500' : 'text-emerald-500') flex items-center gap-1`} >
                      <Clock className="w-3 h-3" />
                      {log.duration_ms}ms
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
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
                <span className={`$1 border`}>
                  <ShieldCheck className="w-3.5 h-3.5" /> HTTP {selectedLog.status}
                </span>
              </>
            ) : (
              <span className="text-slate-400">Select a request to inspect payloads</span>
            )}
            
            {/* Context Action Buttons */}
            {selectedLog && (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-600 transition-colors border border-slate-200 text-xs shadow-sm hover:shadow group"
                >
                  <span className="text-[11px]">🔄</span> Edit & Replay
                  <span className="text-[8px] font-bold text-sky-600 ml-0.5 mt-0.5">PRO</span>
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-600 transition-colors border border-slate-200 text-xs shadow-sm group"
                >
                  <span className="text-[11px]">🔗</span> Share Trace
                  <span className="text-[8px] font-bold text-sky-600 ml-0.5 mt-0.5">PRO</span>
                </button>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide transition-all shadow border border-slate-800">
            🚀 Upgrade to Cloud Pro
          </button>
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
                  <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(selectedLog.request_payload) }} />
                </pre>
              </div>
            </div>

            {/* Response Pane */}
            <div className="flex-1 flex flex-col bg-white min-w-0 border-l border-slate-200">
              <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 shrink-0 shadow-sm z-10">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Response Payload</span>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-white shadow-inner">
                {selectedLog.response_payload ? (
                  <pre className="text-[13px] leading-relaxed">
                    <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(selectedLog.response_payload) }} />
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
    </div>
  );
}






