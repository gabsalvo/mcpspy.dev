import React from 'react';
import { X, Cloud } from 'lucide-react';
import Link from 'next/link';

export default function ProUpgradeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
      <div className="bg-white border border-slate-200 rounded-3xl w-110 shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 bg-slate-50 hover:bg-slate-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 relative">
          
          <div className="w-12 h-12 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-center mb-6">
            <Cloud className="w-6 h-6 text-sky-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Unlock Cloud Sync Pro</h2>
          
          <p className="text-slate-600 text-sm mb-8 leading-relaxed">
            Upgrade to Cloud Sync to aggregate multiple MCP servers, replay payloads instantly, track API spend, and share URLs.
          </p>

          <Link 
            href="/pricing"
            onClick={onClose}
            className="flex items-center justify-center w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[15px] shadow-md hover:shadow-lg transition-all border border-slate-800"
          >
            🚀 View Subscription Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
