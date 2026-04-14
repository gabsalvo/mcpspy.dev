import Link from 'next/link';
import { ArrowLeft, BookOpen, Terminal, Zap, Shield, Code, Cpu, Settings, ExternalLink } from 'lucide-react';
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
                <li><a href="#introduction" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Introduction</a></li>
                <li><a href="#quick-start" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Quick Start</a></li>
                <li><a href="#architecture" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Architecture</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-2">Pro Features</h3>
              <ul className="space-y-1">
                <li><a href="#cloud-sync" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors flex items-center justify-between">Cloud Sync <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded font-bold uppercase">Pro</span></a></li>
                <li><a href="#replays" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors flex items-center justify-between">Advanced Replay <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded font-bold uppercase">Pro</span></a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-2">Integrations</h3>
              <ul className="space-y-1">
                <li><a href="#claude-desktop" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Claude Desktop</a></li>
                <li><a href="#cursor" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Cursor</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-2">Language Examples</h3>
              <ul className="space-y-1">
                <li><a href="#example-nodejs" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Node.js / TypeScript</a></li>
                <li><a href="#example-python" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Python (FastAPI / Standard)</a></li>
                <li><a href="#example-go" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Go</a></li>
                <li><a href="#example-rust" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">Rust</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-2">Reference</h3>
              <ul className="space-y-1">
                <li><a href="#cli-reference" className="block px-2 py-1.5 text-sm text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-md font-medium transition-colors">CLI Commands</a></li>
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Mastering MCP-Spy</h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              Everything you need to master MCP-Spy: from local CLI debugging and TUI inspection to advanced cloud sync functionality for pro teams.
            </p>
          </div>

          <div className="prose prose-slate prose-lg max-w-none">
            
            {/* INTRODUCTION */}
            <section id="introduction" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-sky-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Introduction</h2>
              </div>
              <p>
                The <strong>Model Context Protocol (MCP)</strong> is the emerging standard for how AI systems interact with external data sources safely. However, developing MCP servers is challenging: protocols operate over raw <code>stdio</code> or obscure SSE loops, making traditional HTTP debugging tools like Postman completely useless.
              </p>
              <p>
                <strong>MCP-Spy</strong> is a dedicated observability proxy designed <em>specifically</em> for the Model Context Protocol. It sits between your AI Client and your MCP Server, intercepting every JSON-RPC message, logging it locally, and displaying it in a beautiful Terminal User Interface (TUI).
              </p>
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 my-8">
                <h4 className="flex items-center gap-2 text-sky-900 mt-0 mb-2 font-bold"><Zap className="w-5 h-5 fill-sky-200" /> "I just want to see the JSON!"</h4>
                <p className="text-sky-800 m-0 text-base">
                  Yes. If you've ever thought, <em>"I just want to see the exact JSON the LLM is sending to my local tool before it crashes"</em>, you are in the right place.
                </p>
              </div>
            </section>

            {/* QUICK START */}
            <section id="quick-start" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-8 h-8 text-emerald-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Quick Start</h2>
              </div>
              <p>You can run MCP-Spy entirely without installation via <code>npx</code> if you just want to test it locally.</p>
              
              <div className="bg-slate-900 rounded-xl p-4 my-6 shadow-lg overflow-x-auto border border-slate-800">
                <pre className="text-emerald-400 font-mono text-sm m-0"><code>npx mcp-spy --target 3000 --port 3001</code></pre>
              </div>
              
              <ul className="space-y-4 list-none pl-0">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">1</span>
                  <div className="pt-1">Start your real MCP server on port <code>3000</code>.</div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">2</span>
                  <div className="pt-1">Start MCP-Spy using the command above. It will listen on <code>3001</code> and forward to <code>3000</code>.</div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">3</span>
                  <div className="pt-1">Update your AI Client configuration to point to port <code>3001</code>.</div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-emerald-500 bg-emerald-50 border border-emerald-200">4</span>
                  <div className="pt-1 font-medium text-slate-900">Watch the terminal. The TUI will light up with intercepted payloads.</div>
                </li>
              </ul>
            </section>

            {/* ARCHITECTURE */}
            <section id="architecture" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="w-8 h-8 text-indigo-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Architecture & Flow</h2>
              </div>
              <p>
                MCP-Spy is fundamentally a transparent TCP/HTTP proxy that injects itself into the transport layer.
              </p>
              <div className="grid md:grid-cols-3 gap-6 my-10 not-prose">
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center relative">
                  <h4 className="font-bold text-slate-900 mb-2">1. AI Client</h4>
                  <p className="text-sm text-slate-500">Claude Desktop, Cursor, etc., sends a tool call via standard MCP.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl text-center relative">
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white animate-pulse"></div>
                  <h4 className="font-bold text-white mb-2">2. MCP-Spy</h4>
                  <p className="text-sm text-slate-400">Intercepts, parses the JSON-RPC, logs the event, and forwards it.</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center relative">
                  <h4 className="font-bold text-slate-900 mb-2">3. Your Server</h4>
                  <p className="text-sm text-slate-500">Receives the exact payload, processes it, and responds back.</p>
                </div>
              </div>
            </section>

            {/* CLOUD SYNC & REPLAY (PRO) */}
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
                  While local TUI debugging is free, professional teams benefit from persistent log histories and team collaboration on the web platform.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-8 mb-10 relative z-10">
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Share Permalinks</h4>
                    <p className="text-sm text-slate-400 m-0">Instantly generate a URL to share an LLM hallucination with a teammate.</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm" id="replays">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-400" /> Advanced Replay</h4>
                    <p className="text-sm text-slate-400 m-0">Edit payloads directly in the browser and shoot them back at your local server.</p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <p className="text-sm text-slate-400 mb-2 font-medium uppercase tracking-wider">Activate in CLI:</p>
                  <code className="text-sky-300 bg-black/50 px-4 py-3 rounded-xl block font-mono text-sm border border-slate-700 shadow-inner">
                    npx mcp-spy --target 3000 --sync mcp_live_XXXXXXXX
                  </code>
                </div>
                
                {/* Decorative background element */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
              </div>
            </section>

            {/* INTEGRATIONS - CLAUDE */}
            <section id="claude-desktop" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-orange-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Claude Desktop Integration</h2>
              </div>
              <p>
                Integrating with the official Claude Desktop app is the most common use case. Claude uses the <code>claude_desktop_config.json</code> file to map tools.
              </p>
              
              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400">claude_desktop_config.json</span>
                </div>
<pre className="text-slate-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`{
  "mcpServers": {
    "my-local-server": {
      "command": "node",
      "args": ["server.js"],
      "env": {
        "PORT": "3001", // Make Claude hit MCP-Spy
        "MCP_SPY_TARGET": "3000" // MCP-Spy hits the real server
      }
    }
  }
}`}</code></pre>
              </div>
            </section>

            {/* INTEGRATIONS - CURSOR */}
            <section id="cursor" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-8 h-8 text-blue-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Cursor Integration</h2>
              </div>
              <p>
                Cursor supports adding MCP servers directly inside the editor settings. Go to <strong>Cursor Settings &gt; Features &gt; MCP</strong> and add a new server.
              </p>
              <ul className="space-y-2 mt-4 ml-6 list-disc marker:text-slate-300">
                <li><strong>Name:</strong> <code>my-local-server</code></li>
                <li><strong>Type:</strong> <code>command</code></li>
                <li><strong>Command:</strong> <code>npx mcp-spy --target 3000 --port 3001</code></li>
              </ul>
              <p className="mt-6 text-sm text-slate-500 italic">
                * Note: Cursor will run this command internally and communicate via stdio. MCP-spy will intercept and log before passing it to your real server.
              </p>
            </section>

             {/* CODE EXAMPLES */}
             <section id="example-nodejs" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Node.js Example</h2>
              </div>
              <p>
                Because MCP-Spy is an external proxy, <strong>you do not need to change your server code at all.</strong>
              </p>
              <p>However, if you are building a Node.js MCP server, you typically use the official <code>@modelcontextprotocol/sdk</code>. Just start your server normally:</p>
              
              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <span className="text-xs font-mono text-slate-400">server.ts</span>
                </div>
<pre className="text-cyan-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "weather-tool",
  version: "1.0.0",
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Server running on port 3000. Attach MCP-Spy now!");`}</code></pre>
              </div>
            </section>

             {/* PYTHON EXAMPLE */}
             <section id="example-python" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-blue-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Python Example</h2>
              </div>
              <p>
                Using the official <code>mcp</code> Python package, your setup is extremely straightforward. MCP-Spy intercepts the <code>stdio</code> stream between the LLM client and your Python process seamlessly.
              </p>
              
              <div className="bg-slate-900 rounded-2xl p-6 shadow-xl overflow-x-auto border border-slate-800 mt-8 relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                  <span className="text-xs font-mono text-slate-400">app.py</span>
                </div>
<pre className="text-cyan-300 font-mono text-sm mt-6 mb-0 bg-transparent"><code>{`import asyncio
from mcp.server.stdio import stdio_server
from mcp.server import Server

app = Server("weather-tool")

@app.tool()
async def get_weather(location: str):
    """Returns current weather for a location."""
    return f"It is 72°F and sunny in {location}"

async def main():
    # Runs the MCP server over stdio
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

             {/* GO EXAMPLE */}
             <section id="example-go" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-cyan-500" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Go Example</h2>
              </div>
              <p>
                With the <code>mark3labs/mcp-go</code> package, you can spin up an MCP server quickly. You run the compiled Go binary exactly like you would a Node.js or Python process, and point MCP-Spy at it.
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
	s := server.NewMCPServer(
		"weather-tool",
		"1.0.0",
		server.WithToolCapabilities(true),
	)

	tool := mcp.NewTool("get_weather",
		mcp.WithDescription("Get weather for a location"),
		mcp.WithString("location",
			mcp.Required(),
			mcp.Description("City name"),
		),
	)

	s.AddTool(tool, func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		location := request.Params.Arguments["location"].(string)
		return mcp.NewToolResultText(fmt.Sprintf("Sunny in %s", location)), nil
	})

	// Start standard stdio server
	if err := server.ServeStdio(s); err != nil {
		panic(err)
	}
}`}</code></pre>
              </div>
            </section>

             {/* RUST EXAMPLE */}
             <section id="example-rust" className="scroll-mt-32 mb-24 border-t border-slate-100 pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-orange-600" />
                <h2 className="text-3xl font-bold text-slate-900 m-0">Rust Example</h2>
              </div>
              <p>
                Using the <code>mcp-rs</code> crate, your low-level high-performance servers can also be intercepted seamlessly. Simply compile and ensure the AI client invokes MCP-spy, which then wraps your <code>cargo run</code> (or compiled binary) command.
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
    
    // Add tools and resources here...
    
    // Start listening on stdin/stdout
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
                      <td className="py-4 px-6 leading-relaxed">The local port where your actual MCP server is running.</td>
                      <td className="py-4 px-6 font-mono text-slate-400 text-right">3000</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-slate-900 whitespace-nowrap">--port &lt;port&gt;</td>
                      <td className="py-4 px-6 leading-relaxed">The port MCP-Spy will listen on to intercept traffic.</td>
                      <td className="py-4 px-6 font-mono text-slate-400 text-right">3001</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors bg-sky-50/50">
                      <td className="py-4 px-6 font-mono font-bold text-sky-700 whitespace-nowrap">--sync &lt;token&gt;</td>
                      <td className="py-4 px-6 leading-relaxed text-sky-900">Your Pro Cloud Sync token. Uploads logs to the web dashboard securely.</td>
                      <td className="py-4 px-6 font-mono text-sky-300 text-right">-</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-slate-900 whitespace-nowrap">--verbose</td>
                      <td className="py-4 px-6 leading-relaxed">Prints the full raw JSON-RPC payload instead of a summary.</td>
                      <td className="py-4 px-6 font-mono text-slate-400 text-right">false</td>
                    </tr>
                  </tbody>
                </table>
              </div>

                <div id="activating-premium-features" className="scroll-mt-32 mt-12 bg-sky-50 border border-sky-100 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-sky-900 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-sky-500" />
                    Activating Premium Features
                  </h3>
                  <p className="text-sky-800 leading-relaxed mb-4 text-sm font-medium">
                    To activate Cloud Sync and unlock the web GUI dashboard, you need to pass your Pro subscription API token to the CLI using the <code className="bg-sky-100 text-sky-900 px-1.5 py-0.5 rounded">--sync</code> or <code className="bg-sky-100 text-sky-900 px-1.5 py-0.5 rounded">-s</code> flag.
                    You can retrieve your token from the dashboard after upgrading.
                  </p>
                  <pre className="bg-sky-950 p-4 rounded-xl overflow-x-auto text-sm text-sky-200 mt-4 shadow-inner">
                    <code>{`npx mcp-spy --target 3000 --port 3001 --sync sk_live_your_premium_api_token_here`}</code>
                  </pre>
                  <p className="text-sky-700 text-xs mt-4">
                    Without the token, MCP-Spy operates in Local TUI Mode entirely offline (Free Tier).
                  </p>
                </div>
              </section>

            </div>
          </div>

        <footer className="border-t border-slate-200 mt-20 pt-10 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="font-bold text-slate-900 mb-1 tracking-tight text-lg">MCP-Spy</div>
              <p className="text-slate-500 text-sm">The missing local proxy for the Model Context Protocol.</p>
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
