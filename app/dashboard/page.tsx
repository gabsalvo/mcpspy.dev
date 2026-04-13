"use client";
import React, { useEffect, useState } from 'react';
import { Activity, Clock, Server, Cloud, Zap, ArrowRightLeft, ShieldCheck, Bug, X } from 'lucide-react';
import ProUpgradeModal from '../../components/ProUpgradeModal';import { UserButton } from '@clerk/nextjs';
// A simple local JSON formatter that adds classes for syntax highlighting
const syntaxHighlight = (json: any) => {
  if (!json) return '';
  let jsonStr = typeof json !== 'string' ? JSON.stringify(json, null, 2) : json;
  jsonStr = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'json-number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'json-key';
      } else {
        cls = 'json-string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'json-boolean';
    } else if (/null/.test(match)) {
      cls = 'json-null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
};

function App() {
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedLogId, setSelectedLogId] = useState<number | null>(null);
  const [isPolling, setIsPolling] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs?limit=50');
      const data = await res.json();
      setLogs(prevLogs => JSON.stringify(data) !== JSON.stringify(prevLogs) ? data : prevLogs);
      setSelectedLogId(prevId => prevId || (data.length > 0 ? data[0].id : null));
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  };

  useEffect(() => {
    fetchLogs();
    let interval: NodeJS.Timeout | undefined;
    if (isPolling) {
      interval = setInterval(fetchLogs, 1500); // Poll every 1.5s
    }
    return () => clearInterval(interval);
  }, [isPolling]);

  const selectedLog = logs.find((l) => l.id === selectedLogId);

  return (
    <div className="flex h-screen w-full bg-zinc-950 font-mono text-zinc-300 overflow-hidden">
      
      {/* Sidebar: Requests Feed */}
      <div className="w-80 border-r border-zinc-800 bg-zinc-950 flex flex-col flex-shrink-0 z-10">
        
        {/* Brand / Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800/80 bg-zinc-950 shrink-0 select-none">
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-sm shadow-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            <Zap className="w-5 h-5 fill-cyan-500/20 text-cyan-400 drop-shadow" />
            MCP-SPY
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className="relative flex h-2.5 w-2.5">
              {isPolling && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPolling ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            </span>
            <UserButton />
          </div>
        </div>

        {/* Sidebar Pro Nav hooks */}
        <div className="px-3 py-3 border-b border-zinc-800/50 space-y-1 bg-zinc-950/80 shrink-0">
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 hover:text-cyan-400 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all group"
          >
            <span className="flex items-center gap-2">🌐 Unified Multi-MCP View</span>
            <span className="text-[9px] font-bold bg-cyan-950/40 text-cyan-500 px-1.5 py-0.5 rounded border border-cyan-900/50 group-hover:border-cyan-500/40 transition-colors">PRO</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 hover:text-cyan-400 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all group"
          >
            <span className="flex items-center gap-2">💸 Token Spend Analytics</span>
            <span className="text-[9px] font-bold bg-cyan-950/40 text-cyan-500 px-1.5 py-0.5 rounded border border-cyan-900/50 group-hover:border-cyan-500/40 transition-colors">PRO</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide py-2 space-y-1 px-3">
          {logs.length === 0 ? (
            <div className="text-center py-10 text-zinc-600 text-xs">
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
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 group ${
                    isSelected 
                      ? 'bg-zinc-900 border-cyan-500/50 neon-border' 
                      : 'bg-zinc-950 border-transparent hover:bg-zinc-900 hover:border-zinc-800 cursor-pointer'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1 text-sm font-semibold truncate pr-2">
                    <span className={`${hasError ? 'text-red-400' : (isSelected ? 'text-cyan-50' : 'text-zinc-200')}`}>
                      {log.method}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 uppercase tracking-wide">
                    <span className="flex items-center gap-1">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <span className={`flex items-center gap-1 ${hasError ? 'text-red-400' : (isSlow ? 'text-amber-400' : 'text-emerald-400/80')}`}>
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
      <div className="flex-1 flex flex-col bg-zinc-900 relative">
        
        {/* Top Nav / Ribbon */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
            {selectedLog ? (
              <>
                <span className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-700/50 shadow-inner">
                  <Server className="w-3.5 h-3.5" /> {selectedLog.method}
                </span>
                <ArrowRightLeft className="w-4 h-4 text-zinc-600" />
                <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-inner ${
                  selectedLog.status >= 400 ? 'bg-red-950/30 text-red-400 border-red-900/50' : 'bg-emerald-950/30 text-emerald-400 border-emerald-900/50'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" /> HTTP {selectedLog.status}
                </span>
              </>
            ) : (
              <span className="text-zinc-600">Select a request to inspect payloads</span>
            )}
            
            {/* Context Action Buttons */}
            {selectedLog && (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-zinc-800/80">
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 transition-colors border border-zinc-700/60 text-xs shadow-sm hover:shadow-[0_0_8px_rgba(6,182,212,0.15)] group"
                >
                  <span className="text-[11px]">🔄</span> Edit & Replay
                  <span className="text-[8px] font-bold text-cyan-400/80 ml-0.5 mt-0.5 group-hover:text-cyan-400">PRO</span>
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 transition-colors border border-zinc-700/60 text-xs shadow-sm"
                >
                  <span className="text-[11px]">🔗</span> Share Trace
                </button>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-cyan-400/30">
            🚀 Start 7-Day Pro Trial
          </button>
        </div>

        {/* Body: Split View */}
        {selectedLog ? (
          <div className="flex-1 flex gap-px bg-zinc-800/50 overflow-hidden">
            {/* Request Pane */}
            <div className="flex-1 flex flex-col bg-zinc-900 min-w-0">
              <div className="h-10 bg-zinc-900/80 border-b border-zinc-800 flex items-center px-4 shrink-0 shadow-sm z-10">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Request Payload</span>
              </div>
              <div className="flex-1 overflow-auto p-4 scollbar-hide bg-[#1e1e24] shadow-inner">
                <pre className="text-[13px] leading-relaxed">
                  <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(selectedLog.request_payload) }} />
                </pre>
              </div>
            </div>

            {/* Response Pane */}
            <div className="flex-1 flex flex-col bg-zinc-900 min-w-0">
              <div className="h-10 bg-zinc-900/80 border-b border-zinc-800 flex items-center px-4 shrink-0 shadow-sm z-10">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">Response Payload</span>
              </div>
              <div className="flex-1 overflow-auto p-4 scollbar-hide bg-[#1e1e24] shadow-inner">
                {selectedLog.response_payload ? (
                   <pre className="text-[13px] leading-relaxed">
                      <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(selectedLog.response_payload) }} />
                   </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-600 gap-2">
                    <Bug className="w-8 h-8 opacity-20" />
                    <span className="text-xs uppercase tracking-widest">No Response Data</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-zinc-900 flex items-center justify-center">
            <div className="w-64 h-64 border border-zinc-800/50 rounded-full flex items-center justify-center bg-zinc-900/20 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
               <Zap className="w-12 h-12 text-zinc-800" />
            </div>
          </div>
        )}
      </div>

      <ProUpgradeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;