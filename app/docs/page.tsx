import Link from 'next/link';
import { ArrowLeft, BookOpen, Terminal, Zap, Shield, Code, Cpu, Settings, ExternalLink, Eye, RefreshCw, Share2, Users, Search, AlertTriangle, Keyboard } from 'lucide-react';
import { CopyAsMarkdownButton } from './CopyAsMarkdownButton';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <CopyAsMarkdownButton />
      <div className="md:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-30 flex items-center justify-between">
        <Link href="/" className="font-bold text-slate-900 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span className="font-semibold text-slate-600">Documentation</span>
      </div>

      <aside className="w-full md:w-64 lg:w-72 bg-white border-r border-slate-200 h-auto md:h-screen md:sticky md:top-0 overflow-y-auto hidden md:block shrink-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <nav className="space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-2">Getting Started</h3>
              <ul className="space-y-1">
                <li><a href="#introduction" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">What is MCP-Spy?</a></li>
                <li><a href="#who-is-this-for" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Who is this for?</a></li>
                <li><a href="#how-it-works" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">How it works</a></li>
                <li><a href="#quick-start" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Quick Start</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-2">Use Cases</h3>
              <ul className="space-y-1">
                <li><a href="#existing-mcps" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Using with any MCP server</a></li>
                <li><a href="#debugging" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Debugging common errors</a></li>
                <li><a href="#building-mcps" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Building your own MCP</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-2">Integrations</h3>
              <ul className="space-y-1">
                <li><a href="#claude-desktop" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Claude Desktop</a></li>
                <li><a href="#cursor" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Cursor</a></li>
                <li><a href="#windsurf" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Windsurf</a></li>
                <li><a href="#other-clients" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Other MCP clients</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-2">Pro Features</h3>
              <ul className="space-y-1">
                <li><a href="#cloud-sync" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors flex items-center justify-between">Cloud Sync <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded font-bold uppercase">Pro</span></a></li>
                <li><a href="#edit-replay" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors flex items-center justify-between">Edit & Replay <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded font-bold uppercase">Pro</span></a></li>
                <li><a href="#share-trace" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors flex items-center justify-between">Share Trace <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded font-bold uppercase">Pro</span></a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-2">Server Examples</h3>
              <ul className="space-y-1">
                <li><a href="#example-nodejs" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Node.js / TypeScript</a></li>
                <li><a href="#example-python" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Python</a></li>
                <li><a href="#example-go" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Go</a></li>
                <li><a href="#example-rust" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Rust</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-2">Reference</h3>
              <ul className="space-y-1">
                <li><a href="#tui-shortcuts" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">TUI Keyboard Shortcuts</a></li>
                <li><a href="#cli-reference" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">CLI Commands</a></li>
                <li><a href="#data-storage" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Data Storage</a></li>
                <li><a href="#activating-premium-features" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Premium Activation</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      <main className="flex-1 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 lg:px-12">

          <div className="mb-16">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest">Documentation v1.0</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">MCP-Spy Docs</h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              A complete guide to inspecting, debugging, and understanding everything that happens between your AI assistant and its tools — whether you built those tools or not.
            </p>
          </div>

          <div className="prose prose-slate prose-lg max-w-none">

            {/* INTRODUCTION */}
            <section id="introduction" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-sky-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">What is MCP-Spy?</h2>
              </div>
              <p>
                The <strong>Model Context Protocol (MCP)</strong> is the standard that lets AI assistants like Claude call external tools — reading files, querying databases, searching the web, running code, and much more. Every time Claude uses a tool, it sends a structured message behind the scenes. MCP-Spy lets you see those messages.
              </p>
              <p>
                Think of it like browser DevTools, but for AI tool calls. You see the exact request the AI made, the exact response it got back, how long it took, and whether it succeeded or failed. No guessing, no black boxes.
              </p>
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 my-8">
                <h4 className="flex items-center gap-2 text-sky-900 mt-0 mb-3 font-bold text-base"><Zap className="w-5 h-5 fill-sky-200" /> Why does this matter?</h4>
                <p className="text-sky-800 m-0 text-base">
                  When an AI tool call fails or gives wrong results, it is nearly impossible to diagnose without seeing the raw data. Was the AI&apos;s request malformed? Did the tool return bad data? Did it time out? MCP-Spy answers all of these questions instantly.
                </p>
              </div>
            </section>

            {/* WHO IS THIS FOR */}
            <section id="who-is-this-for" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-violet-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Who is this for?</h2>
              </div>
              <p className="text-slate-600">MCP-Spy is useful in three different situations, even if you have never written a line of code in your life.</p>

              <div className="grid md:grid-cols-3 gap-5 mt-8 not-prose">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <Eye className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">AI Power Users</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">You use Claude Desktop or Cursor with MCP servers like the filesystem MCP, GitHub MCP, or Slack MCP — but you don&apos;t write code. MCP-Spy lets you see exactly what your AI assistant is doing with those tools in real time.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
                    <Code className="w-5 h-5 text-sky-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">MCP Developers</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">You are building an MCP server and need to inspect payloads, reproduce bugs, test edge cases, and iterate fast. MCP-Spy is your primary debugging tool during development.</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">Teams & Auditors</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">You need a log of every AI tool call for compliance, security review, or team debugging. Cloud Sync gives you a persistent, shareable record of all MCP activity.</p>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="w-8 h-8 text-indigo-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">How it works</h2>
              </div>
              <p>
                MCP-Spy is a <strong>transparent proxy</strong>. It sits between your AI client (Claude, Cursor, etc.) and the MCP server, intercepting every message in both directions without changing anything about how either side works.
              </p>
              <p>
                You do not need to modify the MCP server. You do not need to change the AI client. You just insert MCP-Spy in the middle by telling your AI client to talk to MCP-Spy&apos;s port instead of the server&apos;s port directly.
              </p>
              <div className="grid md:grid-cols-3 gap-6 my-10 not-prose">
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center">
                  <div className="text-2xl mb-3">🤖</div>
                  <h4 className="font-bold text-slate-900 mb-2">AI Client</h4>
                  <p className="text-sm text-slate-500">Claude, Cursor, Windsurf, or any MCP-compatible app sends a tool call.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl text-center relative">
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white animate-pulse"></div>
                  <div className="text-2xl mb-3">🔍</div>
                  <h4 className="font-bold text-white mb-2">MCP-Spy</h4>
                  <p className="text-sm text-slate-400">Intercepts the message, logs it, then forwards it unchanged to the real server.</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center">
                  <div className="text-2xl mb-3">🛠️</div>
                  <h4 className="font-bold text-slate-900 mb-2">MCP Server</h4>
                  <p className="text-sm text-slate-500">Any MCP server — filesystem, GitHub, Slack, or one you built yourself. It never knows MCP-Spy is there.</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm text-center italic">MCP-Spy is invisible to both sides. It only observes.</p>
            </section>

            {/* QUICK START */}
            <section id="quick-start" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-8 h-8 text-emerald-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Quick Start</h2>
              </div>
              <p>No installation needed. Run MCP-Spy with <code>npx</code> directly:</p>

              <div className="bg-slate-900 rounded-xl p-4 my-6 shadow-lg overflow-x-auto border border-slate-800">
                <pre className="text-emerald-400 font-mono text-sm m-0"><code>npx mcp-spy --target 3000</code></pre>
              </div>

              <p>This starts MCP-Spy on port <code>4000</code> (its default listen port) and forwards traffic to port <code>3000</code> where your MCP server is running. Then tell your AI client to connect to <code>http://localhost:4000</code> instead.</p>

              <ul className="space-y-4 list-none pl-0 mt-8">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">1</span>
                  <div className="pt-1">Your MCP server is already running on some port (e.g. <code>3000</code>).</div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">2</span>
                  <div className="pt-1">Run <code>npx mcp-spy --target 3000</code> in your terminal. MCP-Spy starts listening on <code>4000</code>.</div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">3</span>
                  <div className="pt-1">Update your AI client config to point to <code>http://localhost:4000</code> instead of <code>3000</code>.</div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-sm">4</span>
                  <div className="pt-1 font-medium text-slate-900">The TUI opens in your terminal. Every tool call appears in real time — request, response, duration, status code.</div>
                </li>
              </ul>
            </section>

            {/* USING WITH EXISTING MCPs */}
            <section id="existing-mcps" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-8 h-8 text-teal-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Using with any MCP server</h2>
              </div>
              <p>
                You do <strong>not</strong> need to build an MCP server to use MCP-Spy. It works with any existing MCP server — including all the popular ones that the community and Anthropic provide out of the box.
              </p>
              <p>
                Common examples include the <strong>filesystem MCP</strong> (lets Claude read and write your local files), the <strong>GitHub MCP</strong> (lets Claude interact with your repos), the <strong>Slack MCP</strong> (lets Claude read and send messages), and many others.
              </p>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
                <h4 className="text-amber-900 font-bold mt-0 mb-2 text-base">The core idea</h4>
                <p className="text-amber-800 m-0 text-sm">
                  Instead of telling Claude Desktop to run <code>npx @modelcontextprotocol/server-filesystem /Users/you</code> directly, you tell it to run MCP-Spy, and MCP-Spy wraps that command for you. You don&apos;t change the MCP server at all — you just add MCP-Spy in front of it.
                </p>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">Example: Wrapping the Filesystem MCP</h3>
              <p>Normally your <code>claude_desktop_config.json</code> might look like this:</p>

              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-4 mb-6 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400">Before — without MCP-Spy</span>
                </div>
<pre className="text-slate-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents"]
    }
  }
}`}</code></pre>
              </div>

              <p>To add MCP-Spy, you wrap that command with <code>mcp-spy --target</code>, but since this MCP uses <code>stdio</code> (not HTTP), you use the <code>--wrap</code> mode by passing the original command as the target:</p>

              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-4 mb-2 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400">After — with MCP-Spy wrapping it</span>
                </div>
<pre className="text-slate-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "mcp-spy",
        "--target", "3000",
        "--",
        "npx", "-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents"
      ]
    }
  }
}`}</code></pre>
              </div>
              <p className="text-sm text-slate-500 mt-2">MCP-Spy starts the real MCP server as a child process and intercepts all stdio communication. Nothing changes for Claude — it still gets the same responses, but now you can see every call.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">Other popular MCP servers you can wrap</h3>
              <div className="grid sm:grid-cols-2 gap-4 not-prose mt-4">
                {[
                  { name: 'GitHub MCP', pkg: '@modelcontextprotocol/server-github', desc: 'Read repos, issues, PRs, and code.' },
                  { name: 'Filesystem MCP', pkg: '@modelcontextprotocol/server-filesystem', desc: 'Read and write local files.' },
                  { name: 'Slack MCP', pkg: '@modelcontextprotocol/server-slack', desc: 'Read channels, send messages.' },
                  { name: 'Brave Search MCP', pkg: '@modelcontextprotocol/server-brave-search', desc: 'Web search results via Brave.' },
                  { name: 'PostgreSQL MCP', pkg: '@modelcontextprotocol/server-postgres', desc: 'Query your database directly.' },
                  { name: 'Puppeteer MCP', pkg: '@modelcontextprotocol/server-puppeteer', desc: 'Browser automation and screenshots.' },
                ].map(s => (
                  <div key={s.name} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="font-bold text-slate-900 text-sm mb-1">{s.name}</div>
                    <div className="font-mono text-xs text-sky-600 mb-2">{s.pkg}</div>
                    <div className="text-xs text-slate-500">{s.desc}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-4">Any MCP server that follows the standard protocol can be wrapped with MCP-Spy — these are just the most common ones.</p>
            </section>

            {/* DEBUGGING */}
            <section id="debugging" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Debugging common errors</h2>
              </div>
              <p>
                MCP failures can be confusing because the AI assistant usually gives a vague error message. Here is how to use MCP-Spy to diagnose the most common problems.
              </p>

              <div className="space-y-6 mt-8">
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-red-50 px-5 py-3 border-b border-red-100">
                    <span className="font-bold text-red-700 text-sm">Problem: Claude says &ldquo;I wasn&apos;t able to use that tool&rdquo;</span>
                  </div>
                  <div className="p-5 text-sm text-slate-600 space-y-2">
                    <p className="m-0">Open MCP-Spy TUI and look at the <strong>status code</strong> column for the failed call.</p>
                    <ul className="list-disc ml-5 space-y-1 m-0">
                      <li><strong className="text-red-600">500</strong> — The server crashed. Check the response payload for a stack trace.</li>
                      <li><strong className="text-amber-600">404</strong> — Claude called a tool that doesn&apos;t exist (wrong tool name or version mismatch).</li>
                      <li><strong className="text-amber-600">401 / 403</strong> — Missing or expired API key in the server&apos;s environment.</li>
                      <li><strong className="text-slate-600">No entry at all</strong> — MCP-Spy never received the request. Your client config is still pointing to the old port.</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
                    <span className="font-bold text-amber-700 text-sm">Problem: The tool returns wrong or incomplete results</span>
                  </div>
                  <div className="p-5 text-sm text-slate-600 space-y-2">
                    <p className="m-0">Click on the log entry in the TUI to expand the full request and response payloads. Check:</p>
                    <ul className="list-disc ml-5 space-y-1 m-0">
                      <li>Did Claude send the right arguments? (Check <strong>Request Payload</strong>)</li>
                      <li>What did the server actually return? (Check <strong>Response Payload</strong>)</li>
                      <li>Is the data truncated, malformed, or missing fields the AI expected?</li>
                    </ul>
                    <p className="m-0 mt-2">With Cloud Pro you can use <strong>Edit & Replay</strong> to modify the request and resend it to isolate exactly what causes the problem.</p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                    <span className="font-bold text-slate-700 text-sm">Problem: Everything is slow</span>
                  </div>
                  <div className="p-5 text-sm text-slate-600">
                    <p className="m-0">The <strong>duration</strong> column in the TUI shows how long each call takes. If specific tool calls are slow (e.g. &gt;2 seconds), inspect the response to see if the server is returning large payloads that could be paginated or filtered.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* BUILDING MCPs */}
            <section id="building-mcps" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-pink-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Building your own MCP server</h2>
              </div>
              <p>
                If you are <em>developing</em> an MCP server, MCP-Spy is even more valuable. You get live feedback on every tool call during development without adding any logging code to your server.
              </p>
              <p>
                The setup is the same — run your server, start MCP-Spy pointing at it, and connect your AI client to MCP-Spy&apos;s port. As you make changes to your server, MCP-Spy keeps logging. No restarts needed.
              </p>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 my-6">
                <h4 className="text-emerald-900 font-bold mt-0 mb-2 text-base">The development loop</h4>
                <ol className="text-emerald-800 text-sm space-y-1 m-0 pl-4">
                  <li>Start your MCP server (e.g. <code>node server.js</code> on port 3000)</li>
                  <li>Start MCP-Spy (<code>npx mcp-spy --target 3000</code>)</li>
                  <li>Ask Claude to call your tool</li>
                  <li>See the exact JSON-RPC in the TUI</li>
                  <li>Fix the bug, restart your server, repeat</li>
                </ol>
              </div>
              <p>Language-specific examples are below in the <a href="#example-nodejs" className="text-sky-600 hover:underline">Server Examples</a> section.</p>
            </section>

            {/* INTEGRATIONS - CLAUDE */}
            <section id="claude-desktop" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-orange-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Claude Desktop</h2>
              </div>
              <p>
                Claude Desktop reads its MCP server config from <code>claude_desktop_config.json</code>. The file lives at:
              </p>
              <ul className="text-sm space-y-1 font-mono bg-slate-50 border border-slate-200 rounded-xl p-4 not-prose">
                <li className="text-slate-600"><span className="text-slate-400">macOS: </span>~/Library/Application Support/Claude/claude_desktop_config.json</li>
                <li className="text-slate-600"><span className="text-slate-400">Windows: </span>%APPDATA%\Claude\claude_desktop_config.json</li>
              </ul>
              <p className="mt-4">To spy on any MCP server in Claude Desktop, change its <code>command</code> and <code>args</code> to go through MCP-Spy. Here is a complete example wrapping an HTTP-based custom server:</p>

              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400">claude_desktop_config.json</span>
                </div>
<pre className="text-slate-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["mcp-spy", "--target", "3000"],
      "env": {}
    }
  }
}`}</code></pre>
              </div>
              <p className="text-sm text-slate-500 mt-3">Claude Desktop launches this command when it starts. MCP-Spy listens on port 4000, forwards to your server on 3000, and logs everything. <strong>Restart Claude Desktop</strong> after editing the config file.</p>
            </section>

            {/* INTEGRATIONS - CURSOR */}
            <section id="cursor" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-blue-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Cursor</h2>
              </div>
              <p>
                Go to <strong>Cursor Settings → Features → MCP</strong> and add a new server entry. Set the command to launch MCP-Spy instead of your server directly.
              </p>
              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <span className="ml-2 text-xs font-mono text-slate-400">Cursor MCP config (JSON)</span>
                </div>
<pre className="text-slate-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["mcp-spy", "--target", "3000"]
    }
  }
}`}</code></pre>
              </div>
              <p className="text-sm text-slate-500 mt-3">Cursor will launch MCP-Spy on startup and route all tool calls through it.</p>
            </section>

            {/* WINDSURF */}
            <section id="windsurf" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-teal-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Windsurf</h2>
              </div>
              <p>
                Windsurf (by Codeium) also supports MCP servers. Edit the <code>~/.codeium/windsurf/mcp_config.json</code> file and add MCP-Spy as a wrapper the same way as Claude Desktop.
              </p>
              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <span className="ml-2 text-xs font-mono text-slate-400">~/.codeium/windsurf/mcp_config.json</span>
                </div>
<pre className="text-slate-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["mcp-spy", "--target", "3000"]
    }
  }
}`}</code></pre>
              </div>
            </section>

            {/* OTHER CLIENTS */}
            <section id="other-clients" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-slate-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Other MCP clients</h2>
              </div>
              <p>
                Any MCP-compatible client works with MCP-Spy as long as you can configure it to use a custom server address. The pattern is always the same:
              </p>
              <ol className="space-y-2 ml-4">
                <li>Find where the client defines its MCP server (usually a JSON config file)</li>
                <li>Replace the direct server command or URL with MCP-Spy&apos;s address (<code>http://localhost:4000</code>)</li>
                <li>Make sure MCP-Spy is running with <code>--target</code> pointing at the original server</li>
              </ol>
              <p className="text-slate-500 text-sm mt-4">
                Compatible clients include: Claude Desktop, Cursor, Windsurf, VS Code (Continue extension), Zed, and any custom application using the official MCP SDK.
              </p>
            </section>

            {/* CLOUD SYNC */}
            <section id="cloud-sync" className="scroll-mt-32 mb-24 relative">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300 p-10 rounded-[2rem] shadow-2xl relative overflow-hidden border border-slate-700">
                <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-6 py-2 rounded-bl-3xl uppercase tracking-widest shadow-lg">
                  Pro Feature
                </div>
                <div className="flex items-center gap-4 mb-6 border-b border-slate-700/50 pb-6 relative z-10">
                  <Shield className="w-10 h-10 text-sky-400 drop-shadow-md" />
                  <h2 className="text-3xl font-extrabold text-white m-0 tracking-tight">Cloud Sync Dashboard</h2>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed relative z-10 font-light">
                  By default, MCP-Spy stores logs locally in a SQLite database on your machine. With Cloud Sync (Pro), every intercepted call is also uploaded to your personal dashboard at mcpspy.dev in real time.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-8 mb-10 relative z-10">
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm"><Zap className="w-4 h-4 text-amber-400" /> Persistent history</h4>
                    <p className="text-sm text-slate-400 m-0">All your logs are saved in the cloud. Close your terminal and come back later — everything is still there.</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm"><Share2 className="w-4 h-4 text-emerald-400" /> Share with your team</h4>
                    <p className="text-sm text-slate-400 m-0">Generate a public link for any trace. Share it with a teammate or paste it in a GitHub issue.</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm"><RefreshCw className="w-4 h-4 text-sky-400" /> Edit & Replay</h4>
                    <p className="text-sm text-slate-400 m-0">Modify any request payload in the browser and resend it to your local MCP server instantly.</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm"><Eye className="w-4 h-4 text-violet-400" /> Visual inspector</h4>
                    <p className="text-sm text-slate-400 m-0">Syntax-highlighted JSON diff view, filter by status, method, or duration — all in the browser.</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-sm text-slate-400 mb-2 font-medium uppercase tracking-wider">Activate in CLI:</p>
                  <code className="text-sky-300 bg-black/50 px-4 py-3 rounded-xl block font-mono text-sm border border-slate-700 shadow-inner">
                    npx mcp-spy --target 3000 --sync mcp_live_XXXXXXXX
                  </code>
                  <p className="text-xs text-slate-500 mt-3">Get your API key from the dashboard after subscribing at <Link href="/pricing" className="text-sky-400 hover:underline">mcpspy.dev/pricing</Link>.</p>
                </div>

                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
              </div>
            </section>

            {/* EDIT & REPLAY */}
            <section id="edit-replay" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="w-8 h-8 text-emerald-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Edit & Replay <span className="ml-2 text-sm font-normal bg-sky-100 text-sky-700 px-2 py-0.5 rounded uppercase tracking-wider">Pro</span></h2>
              </div>
              <p>
                Edit & Replay lets you take any logged request, modify its JSON payload in the browser, and resend it to your locally running MCP server — without triggering Claude again.
              </p>
              <p>This is useful for:</p>
              <ul className="space-y-1">
                <li>Testing how your server handles edge cases (empty strings, large numbers, missing fields)</li>
                <li>Reproducing a specific failure with slightly different inputs</li>
                <li>Confirming that a bug is in the request (Claude&apos;s side) vs. the response (server side)</li>
              </ul>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-6">
                <h4 className="font-bold text-slate-900 text-sm mb-3">How to use it</h4>
                <ol className="text-sm text-slate-600 space-y-2 m-0 pl-4">
                  <li>Open the <Link href="/dashboard" className="text-sky-600 hover:underline">dashboard</Link> (Pro required)</li>
                  <li>Click any log entry to select it</li>
                  <li>Click <strong>Edit & Replay</strong> — a modal opens with the original JSON request</li>
                  <li>Modify the payload as needed</li>
                  <li>Click <strong>Send</strong> — the response appears immediately below</li>
                </ol>
                <p className="text-xs text-slate-400 mt-3 m-0">Requires the CLI to be running locally (<code>npx mcp-spy --target ...</code>) since Edit & Replay sends the request through your machine&apos;s local proxy.</p>
              </div>
            </section>

            {/* SHARE TRACE */}
            <section id="share-trace" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Share2 className="w-8 h-8 text-violet-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Share Trace <span className="ml-2 text-sm font-normal bg-sky-100 text-sky-700 px-2 py-0.5 rounded uppercase tracking-wider">Pro</span></h2>
              </div>
              <p>
                Any log entry in your dashboard can be turned into a permanent, public link that anyone can view — no login required.
              </p>
              <p>
                The shared trace page shows the full request and response payloads with syntax highlighting, the HTTP method, status code, and duration. It is read-only and works from any device.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-4">
                <h4 className="font-bold text-slate-900 text-sm mb-3">How to share a trace</h4>
                <ol className="text-sm text-slate-600 space-y-2 m-0 pl-4">
                  <li>Open the <Link href="/dashboard" className="text-sky-600 hover:underline">dashboard</Link> and click any log entry</li>
                  <li>Click the <strong>Share</strong> button (chain icon)</li>
                  <li>The link is copied to your clipboard automatically</li>
                  <li>The URL looks like: <code className="text-xs">mcpspy.dev/trace/abc123...</code></li>
                </ol>
              </div>
            </section>

            {/* TUI KEYBOARD SHORTCUTS */}
            <section id="tui-shortcuts" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Keyboard className="w-8 h-8 text-slate-600" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">TUI Keyboard Shortcuts</h2>
              </div>
              <p>
                The Terminal UI (TUI) is the full-screen interface that opens in your terminal when you run <code>npx mcp-spy</code>. It shows a live list of intercepted calls on the left and the selected payload on the right.
              </p>

              <div className="border border-slate-200 rounded-2xl overflow-hidden mt-8 not-prose shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                      <th className="py-3 px-6 font-bold text-sm uppercase tracking-wider w-32">Key</th>
                      <th className="py-3 px-6 font-bold text-sm uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600 divide-y divide-slate-100 bg-white">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-6 font-mono font-bold text-slate-900">↑ / ↓</td>
                      <td className="py-3 px-6">Navigate between log entries</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-6 font-mono font-bold text-slate-900">Enter</td>
                      <td className="py-3 px-6">Expand the selected entry to see full payload</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-6 font-mono font-bold text-slate-900">q</td>
                      <td className="py-3 px-6">Quit MCP-Spy</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-6 font-mono font-bold text-slate-900">Ctrl+C</td>
                      <td className="py-3 px-6">Force quit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-500 mt-4">If you prefer plain terminal output without the TUI (useful in CI pipelines), add the <code>--no-tui</code> flag when starting MCP-Spy.</p>
            </section>

            {/* CODE EXAMPLES */}
            <section id="example-nodejs" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Node.js / TypeScript</h2>
              </div>
              <p>
                MCP-Spy works with any MCP server. You do not need to change your server code at all. If you are building a Node.js MCP server using the official <code>@modelcontextprotocol/sdk</code>:
              </p>

              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <span className="text-xs font-mono text-slate-400">server.ts — no changes needed</span>
                </div>
<pre className="text-cyan-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "my-tool", version: "1.0.0" });

// Your tool definitions...

const transport = new StdioServerTransport();
await server.connect(transport);`}</code></pre>
              </div>
              <p className="text-sm text-slate-500 mt-3">Run your server: <code>node server.js</code> on port 3000. Then start MCP-Spy: <code>npx mcp-spy --target 3000</code>.</p>
            </section>

            <section id="example-python" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-blue-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Python</h2>
              </div>
              <p>
                Using the official <code>mcp</code> Python package. MCP-Spy intercepts the stdio stream transparently.
              </p>

              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <span className="text-xs font-mono text-slate-400">server.py</span>
                </div>
<pre className="text-cyan-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`import asyncio
from mcp.server.stdio import stdio_server
from mcp.server import Server

app = Server("my-tool")

@app.tool()
async def get_weather(location: str):
    """Returns current weather for a location."""
    return f"It is 72°F and sunny in {location}"

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())`}</code></pre>
              </div>
            </section>

            <section id="example-go" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-cyan-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Go</h2>
              </div>
              <p>
                Using the <code>mark3labs/mcp-go</code> package. Compile your server, run it on a port, and point MCP-Spy at it.
              </p>

              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <span className="text-xs font-mono text-slate-400">main.go</span>
                </div>
<pre className="text-cyan-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`package main

import (
	"context"
	"fmt"
	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
)

func main() {
	s := server.NewMCPServer("my-tool", "1.0.0",
		server.WithToolCapabilities(true),
	)

	tool := mcp.NewTool("get_weather",
		mcp.WithDescription("Get weather for a location"),
		mcp.WithString("location", mcp.Required()),
	)

	s.AddTool(tool, func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		loc := req.Params.Arguments["location"].(string)
		return mcp.NewToolResultText(fmt.Sprintf("Sunny in %s", loc)), nil
	})

	if err := server.ServeStdio(s); err != nil {
		panic(err)
	}
}`}</code></pre>
              </div>
            </section>

            <section id="example-rust" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Rust</h2>
              </div>
              <p>
                Using the <code>mcp-rs</code> crate. Compile your binary and point MCP-Spy at the running process.
              </p>

              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <span className="text-xs font-mono text-slate-400">src/main.rs</span>
                </div>
<pre className="text-cyan-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`use mcp_rs::server::Server;
use mcp_rs::transport::stdio::StdioTransport;
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let transport = StdioTransport::new();
    let mut server = Server::new(transport);

    // Add tools here...

    server.listen().await?;
    Ok(())
}`}</code></pre>
              </div>
            </section>

            {/* CLI REFERENCE */}
            <section id="cli-reference" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-8 h-8 text-slate-800" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">CLI Reference</h2>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden mt-8 not-prose shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                      <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Flag</th>
                      <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Description</th>
                      <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider text-right">Default</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600 divide-y divide-slate-100 bg-white">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-slate-900 whitespace-nowrap">--target &lt;port&gt;</td>
                      <td className="py-4 px-6 leading-relaxed"><strong>Required.</strong> The local port where your actual MCP server is running.</td>
                      <td className="py-4 px-6 font-mono text-slate-400 text-right">—</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-slate-900 whitespace-nowrap">--name &lt;label&gt;</td>
                      <td className="py-4 px-6 leading-relaxed">A human-readable label for this MCP server. Shows in the TUI and dashboard so you can tell servers apart when running multiple instances. E.g. <code>--name filesystem</code> or <code>--name github</code>.</td>
                      <td className="py-4 px-6 font-mono text-slate-400 text-right">port-{'{n}'}</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors bg-sky-50/50">
                      <td className="py-4 px-6 font-mono font-bold text-sky-700 whitespace-nowrap">--sync &lt;token&gt;</td>
                      <td className="py-4 px-6 leading-relaxed text-sky-900">Your Pro API key. Uploads logs to your cloud dashboard in real time.</td>
                      <td className="py-4 px-6 font-mono text-sky-300 text-right">—</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-slate-900 whitespace-nowrap">--no-tui</td>
                      <td className="py-4 px-6 leading-relaxed">Disables the interactive TUI. Useful in CI, scripts, or piped output.</td>
                      <td className="py-4 px-6 font-mono text-slate-400 text-right">false</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4">Running multiple MCP servers simultaneously</h3>
              <p className="text-slate-600 text-sm">Use <code>--name</code> to label each instance. Run each in a separate terminal:</p>
              <div className="bg-slate-900 rounded-xl p-4 mt-4 overflow-x-auto border border-slate-800">
                <pre className="text-emerald-400 font-mono text-sm m-0">{`# Terminal 1 — filesystem MCP
npx mcp-spy --target 3000 --name filesystem --sync YOUR_KEY

# Terminal 2 — GitHub MCP
npx mcp-spy --target 3001 --name github --sync YOUR_KEY`}</pre>
              </div>
              <p className="text-sm text-slate-500 mt-3">In the dashboard, each log shows its server label. Click a label to filter the list to that server only.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-12 mb-4">Where your data is stored</h3>
              <div className="grid sm:grid-cols-2 gap-4 not-prose mt-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Local (free tier)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">Every intercepted request is saved to a SQLite database on your machine immediately — no network needed.</p>
                  <code className="text-xs bg-slate-900 text-emerald-400 px-3 py-2 rounded-lg block">~/.mcp-spy/mcp_logs.db</code>
                  <ul className="text-xs text-slate-500 mt-3 space-y-1">
                    <li>✓ Persists across terminal restarts</li>
                    <li>✓ No size limit beyond disk space</li>
                    <li>✓ Read by the TUI in real time</li>
                    <li>✗ Lost if you wipe your machine</li>
                  </ul>
                </div>
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-5">
                  <h4 className="font-bold text-sky-900 text-sm mb-2">Cloud (Pro — <code>--sync</code>)</h4>
                  <p className="text-xs text-sky-700 leading-relaxed mb-3">Each log is also sent to your personal Convex database in real time. Available from any device via the dashboard.</p>
                  <code className="text-xs bg-sky-900 text-sky-300 px-3 py-2 rounded-lg block">mcpspy.dev/dashboard</code>
                  <ul className="text-xs text-sky-700 mt-3 space-y-1">
                    <li>✓ Survives machine wipe</li>
                    <li>✓ Accessible from browser anywhere</li>
                    <li>✓ Shareable trace links</li>
                    <li>✓ Real-time live updates</li>
                  </ul>
                </div>
              </div>

              <div id="activating-premium-features" className="scroll-mt-32 mt-12 bg-sky-50 border border-sky-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-sky-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-sky-500" />
                  Activating Premium Features
                </h3>
                <p className="text-sky-800 leading-relaxed mb-4 text-sm">
                  After subscribing at <Link href="/pricing" className="text-sky-700 font-semibold hover:underline">mcpspy.dev/pricing</Link>, go to your <Link href="/dashboard" className="text-sky-700 font-semibold hover:underline">dashboard</Link> to find your API key. Pass it to the CLI with the <code className="bg-sky-100 text-sky-900 px-1.5 py-0.5 rounded">--sync</code> flag to activate Cloud Sync.
                </p>
                <pre className="bg-sky-950 p-4 rounded-xl overflow-x-auto text-sm text-sky-200 mt-4 shadow-inner">
                  <code>{`npx mcp-spy --target 3000 --sync mcp_live_your_api_key_here`}</code>
                </pre>
                <p className="text-sky-700 text-xs mt-4">
                  Without the token, MCP-Spy runs in local mode — free, fully offline, with the TUI only.
                </p>
              </div>
            </section>

          </div>
        </div>

        <footer className="border-t border-slate-200 mt-20 pt-10 pb-12 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="font-bold text-slate-900 mb-1 tracking-tight text-lg">MCP-Spy</div>
              <p className="text-slate-500 text-sm">The missing observability layer for the Model Context Protocol.</p>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/gabsalvo/mcpspy.dev" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors flex items-center gap-1">
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
              <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-600 text-sm font-medium transition-colors" title="AI-Friendly Markdown Documentation">
                llms.txt
              </a>
              <Link href="/pricing" className="text-slate-500 hover:text-sky-600 text-sm font-medium transition-colors">
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
