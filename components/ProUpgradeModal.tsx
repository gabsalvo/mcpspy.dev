import React from 'react';
import { X, Cloud } from 'lucide-react';

export default function ProUpgradeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      {/* Neon border wrapper */}
      <div className="bg-zinc-950 border border-cyan-500/40 neon-border rounded-2xl w-[440px] shadow-2xl relative">
        
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 relative overflow-hidden">
          {/* Subtle glow effect behind the icon */}
          <div className="absolute top-0 left-10 w-32 h-32 bg-cyan-600/20 blur-[50px] -z-10 rounded-full" />

          <div className="w-12 h-12 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center justify-center mb-5 backdrop-blur-sm">
            <Cloud className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">Unlock Cloud Sync Pro</h2>
          
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
            Upgrade to Cloud Sync to aggregate multiple MCP servers, replay payloads instantly, track API spend, and share URLs.
          </p>

          <a 
            href="https://mcpspy.dev/pricing" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-[15px] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all border border-cyan-400/30"
          >
            🚀 Start 7-Day Free Trial
          </a>
        </div>
      </div>
    </div>
  );
}
