import { PricingTable } from '@clerk/nextjs';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center py-16 relative overflow-hidden">
      <div className="w-full max-w-6xl px-4 flex flex-col items-center z-10 relative">
        <Link href="/" className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider text-sm mb-12 hover:text-slate-500 transition-colors">
          <Zap className="w-5 h-5 fill-slate-200 text-slate-600" />
          Back to Home
        </Link>

        <h1 className="text-5xl font-extrabold text-slate-900 mb-6 text-center tracking-tight">
          Unlock Cloud Sync Pro
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl text-center mb-16 leading-relaxed font-light">
          Aggregate multiple MCP servers, replay payloads instantly, track API spend, and securely share observation URLs.
        </p>

        <div className="w-full max-w-4xl bg-white p-2 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
          <PricingTable />
        </div>
      </div>
    </main>
  );
}
