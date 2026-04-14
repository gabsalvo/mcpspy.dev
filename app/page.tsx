import Link from 'next/link';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-hidden bg-white text-slate-800">
      <header className="w-full max-w-6xl flex items-center justify-between py-6 px-4 z-10 relative border-b border-slate-100">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold tracking-widest text-slate-900">
            MCP-SPY
          </div>
          <nav className="hidden md:flex gap-6" aria-label="Main Navigation">
            <a href="/docs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Docs</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#roadmap" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Roadmap</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors mr-2 border border-slate-200 bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow">
              Dashboard
            </Link>
            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200">
              <UserButton />
            </div>
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2">Login</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm shadow-sm transition-all border border-slate-800">Sign Up</button>
            </SignUpButton>
          </Show>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center text-center px-4 max-w-4xl z-10 relative mt-24 mb-24 w-full">
        
        {/* --- HERO SECTION --- */}
        <section aria-labelledby="hero-heading" className="w-full mb-24 flex flex-col items-center">
          <h1 id="hero-heading" className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight pb-2 tracking-tight">
            Stop flying blind.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-light">
            The ultimate zero-config local observability proxy for the Model Context Protocol. Intercept, replay, and share payloads in seconds across any language workspace.
          </p>

          <div className="flex flex-col items-center gap-4 mb-14">
            <div className="flex flex-wrap justify-center gap-4">
              <Show when="signed-out">
                <SignUpButton mode="modal" forceRedirectUrl="/pricing">
                  <button className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-lg shadow-md hover:shadow-lg transition-all border border-slate-800">
                    Subscribe Now
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link
                  href="/dashboard"
                  className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-lg shadow-md hover:shadow-lg transition-all border border-slate-800"
                >
                  Go to Dashboard
                </Link>
              </Show>
              <a href="https://github.com/gabsalvo/mcpspy.dev" className="px-8 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm text-lg flex items-center justify-center">
                View on GitHub
              </a>
            </div>
            <span className="text-sm text-slate-500">Always free for local use. Pro unlocks cloud sync and replay.</span>
          </div>

          <div aria-hidden="true" className="w-full max-w-2xl bg-black border border-neutral-800 rounded-xl p-5 font-mono text-gray-300 text-left shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-2 text-slate-500 mb-4 border-b border-slate-800 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-mono tracking-widest uppercase">Terminal</span>
            </div>
            <p className="text-sky-400 mb-1">$ npx mcp-spy --target 3000 --sync mcp_live_4829xA92...</p>
            <p className="text-slate-300">Starting MCP-Spy Proxy...</p>
            <p className="text-emerald-400">[PRO] Cloud sync authenticated!</p>
            <p className="text-slate-400">Listening on localhost:4000 -&gt; localhost:3000</p>
          </div>
        </section>

        <hr className="w-full border-slate-200 mb-20" />

        {/* --- TIMELINE / ABOUT SECTION --- */}
        <section id="docs" className="w-full text-center mb-24 max-w-4xl pt-8" aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Need more details?</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Read our extensive documentation on how to setup the Model Context Protocol proxy, connect to language servers, and utilize the CLI/TUI interface.
          </p>
          <a href="/docs" className="inline-block py-3 px-6 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">
            Read the Documentation &rarr;
          </a>
        </section>

        <hr className="w-full border-slate-200 mb-20" />

        {/* --- PRICING SECTION --- */}
        <section id="pricing" className="w-full max-w-3xl pt-8 mb-24 mx-auto" aria-labelledby="pricing-heading">
          <div className="text-center mb-12">
            <h2 id="pricing-heading" className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Get full access.
            </h2>
            <p className="text-slate-600 text-lg">The Web Platform is exclusively for Pro users.</p>
          </div>

          <article className="bg-slate-900 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 shadow-xl relative w-full mb-8">
            <div className="flex-1 w-full text-left order-2 md:order-1">
              <div className="absolute top-0 left-0 bg-sky-500 text-white text-xs font-bold px-4 py-1.5 rounded-br-2xl rounded-tl-3xl uppercase tracking-wider">
                Pro Web Access
              </div>
              <h3 className="text-2xl font-bold text-white mt-4 mb-2">Cloud Sync</h3>
              <p className="text-slate-400 mb-6">
                For professionals and teams sharing payloads, rewriting histories, and collaborating online.
              </p>
              <ul className="space-y-4 mb-8" aria-label="Pro features">
                <li className="flex items-center gap-3 text-slate-300">✓ Web Dashboard GUI</li>
                <li className="flex items-center gap-3 text-slate-300">✓ Cloud Sync</li>
                <li className="flex items-center gap-3 text-slate-300">✓ Shareable Log Permalinks</li>
                <li className="flex items-center gap-3 text-slate-300">✓ Advanced Payload Replay</li>
              </ul>
              <div>
                <Show when="signed-out">
                  <SignUpButton mode="modal" forceRedirectUrl="/pricing">
                    <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-50 font-semibold transition-all hover:shadow-md">
                      Join the Platform
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Link
                    href="/dashboard"
                    className="inline-block text-center w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-50 font-semibold transition-all hover:shadow-md"
                  >
                    Go to Dashboard
                  </Link>
                </Show>
              </div>
            </div>
            
            <div className="w-full md:w-72 bg-slate-800 rounded-2xl p-6 border border-slate-700 order-1 md:order-2 text-left">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-extrabold text-white">$12.50</span>
                <span className="text-xl text-slate-400 font-medium">/mo</span>
              </div>
              <span className="inline-block text-sm text-emerald-400 mb-4 font-medium bg-emerald-400/10 px-3 py-1 rounded-md border border-emerald-500/20">
                Billed annually
              </span>
              <p className="text-sm text-slate-400">or $15 billed monthly</p>
            </div>
          </article>
          
          <div className="text-center border border-slate-200 rounded-2xl p-6 bg-slate-50 flex items-center justify-between flex-col md:flex-row gap-4">
            <p className="text-slate-600">Want the tools for free? Try the local Terminal UI.</p>
            <a href="https://github.com/gabsalvo/mcpspy.dev" className="py-2.5 px-6 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium hover:text-slate-900 shadow-sm transition-all hover:shadow">
              Fork on GitHub
            </a>
          </div>
        </section>

        <hr className="w-full border-slate-200 mb-20" />

        {/* --- ROADMAP SECTION --- */}
        <section id="roadmap" className="w-full text-left max-w-4xl pt-8" aria-labelledby="roadmap-heading">
          <h2 id="roadmap-heading" className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Pro Feature Timeline (2026 Roadmap)</h2>
          <div className="space-y-8 pl-4 border-l-2 border-slate-200">
            <div className="relative">
              <div className="absolute -left-6.25 w-4 h-4 bg-sky-500 rounded-full border-4 border-white" />
              <h3 className="text-xl font-bold text-slate-900 mb-1">Q1: Cloud Sync & Deep Linking</h3>
              <p className="text-slate-600">Instantly securely sync local SQLite logs to the web. Get a unique URL (mcpspy.dev/log/xyz) to share a specific JSON-RPC conversation with peers to debug hallucinations.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-6.25 w-4 h-4 bg-slate-300 rounded-full border-4 border-white" />
              <h3 className="text-xl font-bold text-slate-900 mb-1">Q2: Prompt Injection & Replay Editor</h3>
              <p className="text-slate-600">Edit the payload you just intercepted (e.g. modify the tool input) and instantly shoot it back to the target server from the dashboard to test error handling without setting up the context with Claude again.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-6.25 w-4 h-4 bg-slate-300 rounded-full border-4 border-white" />
              <h3 className="text-xl font-bold text-slate-900 mb-1">Q3: Advanced Metrics & Schema Diffing</h3>
              <p className="text-slate-600">Automatic alerts if your server breaks its own JSON Schema response format. Telemetry tracking token usage per tool execution across your team.</p>
            </div>
          </div>
        </section>

      </div>

      <footer className="w-full border-t border-slate-200 bg-slate-50 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="font-bold text-slate-900 mb-1 tracking-tight">MCP-Spy</div>
            <p className="text-slate-500 text-sm">The missing local proxy for the Model Context Protocol.</p>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/gabsalvo/mcpspy.dev" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
              GitHub
            </a>
            <Link href="/docs" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
              Docs
            </Link>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-600 text-sm font-medium transition-colors" title="AI-Friendly Markdown Documentation">
              llms.txt
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}



