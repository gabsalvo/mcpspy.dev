import Link from 'next/link';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-hidden">
      {/* Dark mode spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-linear-to-r from-cyan-500/10 to-blue-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <nav className="w-full max-w-6xl flex items-center justify-between py-6 px-4 z-10 relative">
        <div className="text-xl font-bold tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          MCP-SPY
        </div>
        <div className="flex items-center gap-4">
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors mr-2 border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              Dashboard
            </Link>
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors px-3 py-2">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-5 py-2 rounded-xl bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-sm shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all border border-cyan-400/30">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl z-10 relative mt-16">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-br from-white to-zinc-500 mb-6 drop-shadow-sm leading-tight pb-2">
          Stop flying blind.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed font-light">
          The ultimate zero-config local observability proxy for the Model Context Protocol. Intercept, replay, and share payloads in seconds.
        </p>

        <div className="flex flex-col items-center gap-4 mb-14">
          <div className="flex flex-wrap justify-center gap-4">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all border border-cyan-400/30">
                  Start 7-Day Free Trial
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link 
                href="/dashboard"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all border border-cyan-400/30"
              >
                Go to Dashboard
              </Link>
            </Show>
            <a 
              href="https://github.com/your-repo/mcp-spy"
              className="px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-lg border border-zinc-800 transition-all flex items-center gap-2"
            >
              View GitHub Repo (Local Core)
            </a>
          </div>
          <span className="text-xs text-zinc-500 tracking-wide">Requires credit card. Cancel anytime before trial ends.</span>
        </div>

        {/* Global CLI Demo Box */}
        <div className="w-full max-w-2xl bg-black/60 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-left shadow-2xl backdrop-blur-sm relative overflow-hidden group">
           <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-blue-500/5 pointer-events-none" />
           <div className="flex items-center gap-2 text-zinc-500 mb-3 border-b border-zinc-800/50 pb-2">
             <div className="w-3 h-3 rounded-full bg-red-500/40" />
             <div className="w-3 h-3 rounded-full bg-amber-500/40" />
             <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
             <span className="ml-2 text-xs font-mono">Terminal</span>
           </div>
           <p className="text-cyan-400 mb-1">$ npx mcp-spy --target 3000 --sync mcp_live_4829xA92...</p>
           <p className="text-zinc-300">🚀 Starting MCP-Spy...</p>
           <p className="text-zinc-300">✨ [PRO] Cloud sync authenticated!</p>
           <p className="text-zinc-300">📡 Listening on localhost:4000 ➡️ localhost:3000</p>
        </div>
      </div>
    </main>
  );
}
