import Link from 'next/link';
import { CopyAsMarkdownButton } from './CopyAsMarkdownButton';

/* ---- tiny building blocks, family style ---- */

function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-[1.2rem] font-medium mt-0 mb-4">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[1rem] font-medium text-ink mt-10 mb-3">{children}</h3>;
}

function CodeBlock({ label, children }: { label?: string; children: string }) {
  return (
    <div className="my-5">
      {label && <div className="text-[0.75rem] text-muted mb-1.5">{label}</div>}
      <pre className="bg-codebg border-l-2 border-terracotta px-4 py-3.5 overflow-x-auto text-[0.85rem] leading-normal m-0">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-terracotta my-5 py-1 pl-4 text-muted text-[0.9rem]">
      {title && <span className="text-ink font-medium not-italic">{title} — </span>}
      {children}
    </blockquote>
  );
}

function Divider() {
  return <div className="wave-divider !mx-0 !max-w-[200px]" role="presentation" />;
}

const NAV = [
  ['getting started', [
    ['#introduction', 'what is mcp-spy?'],
    ['#who-is-this-for', 'who is this for?'],
    ['#how-it-works', 'how it works'],
    ['#quick-start', 'quick start'],
  ]],
  ['use cases', [
    ['#existing-mcps', 'using with any MCP server'],
    ['#debugging', 'debugging common errors'],
    ['#building-mcps', 'building your own MCP'],
  ]],
  ['integrations', [
    ['#claude-desktop', 'claude desktop'],
    ['#cursor', 'cursor'],
    ['#windsurf', 'windsurf'],
    ['#other-clients', 'other MCP clients'],
  ]],
  ['features', [
    ['#redaction', 'auto-redaction'],
    ['#tokens', 'token profiling'],
    ['#export', 'cURL export'],
    ['#mock', 'mock mode'],
    ['#ci-runner', 'CI/CD test runner'],
  ]],
  ['server examples', [
    ['#example-nodejs', 'node.js / typescript'],
    ['#example-python', 'python'],
    ['#example-go', 'go'],
    ['#example-rust', 'rust'],
  ]],
  ['reference', [
    ['#tui-shortcuts', 'TUI & keyboard shortcuts'],
    ['#cli-reference', 'CLI commands'],
    ['#data-storage', 'data storage'],
  ]],
] as const;

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col md:flex-row">
      <CopyAsMarkdownButton />

      {/* mobile top bar */}
      <div className="md:hidden bg-paper border-b border-ink/10 p-4 sticky top-0 z-30 flex items-center justify-between text-[0.85rem]">
        <Link href="/" className="text-muted hover:text-ink">← mcpspy.dev</Link>
        <span className="text-muted">docs</span>
      </div>

      {/* sidebar */}
      <aside className="w-full md:w-60 lg:w-64 border-r border-ink/10 h-auto md:h-screen md:sticky md:top-0 overflow-y-auto hidden md:block shrink-0 scrollbar-hide">
        <div className="p-6">
          <Link href="/" className="text-muted hover:text-ink text-[0.85rem] block mb-8">← mcpspy.dev</Link>
          <nav className="space-y-7">
            {NAV.map(([group, items]) => (
              <div key={group}>
                <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted mb-2">{group}</h3>
                <ul className="space-y-1 list-none p-0 m-0">
                  {items.map(([href, label]) => (
                    <li key={href}>
                      <a href={href} className="block text-[0.85rem] text-ink/80 hover:text-ink hover:underline underline-offset-4">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* main */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[78ch] mx-auto px-5 py-12 md:py-16 lg:px-10 text-[0.95rem] leading-[1.7]">

          <div className="mb-14">
            <div className="sun-art text-[0.6rem] mb-6" aria-hidden="true">{`      ;   :   ;
   .   \\_,!,_/   ,
    \`.,'     \`.,'
     /         \\    `}</div>
            <h1 className="text-[1.6rem] font-medium tracking-tight mb-3">mcp-spy documentation</h1>
            <p className="text-muted m-0">
              a complete guide to inspecting, debugging, and understanding everything that happens
              between your AI assistant and its tools — whether you built those tools or not.
              free &amp; open source, forever.
            </p>
          </div>

          {/* INTRODUCTION */}
          <section id="introduction" className="scroll-mt-24 mb-16">
            <SectionHeading>what is mcp-spy?</SectionHeading>
            <p className="mb-4">
              the <strong className="font-medium">Model Context Protocol (MCP)</strong> is the standard that lets AI
              assistants like claude call external tools — reading files, querying databases, searching the web,
              running code, and much more. every time claude uses a tool, it sends a structured message behind the
              scenes. mcp-spy lets you see those messages.
            </p>
            <p className="mb-4">
              think of it like browser devtools, but for AI tool calls. you see the exact request the AI made, the
              exact response it got back, how long it took, and whether it succeeded or failed. no guessing, no
              black boxes.
            </p>
            <Callout title="why does this matter?">
              when an AI tool call fails or gives wrong results, it is nearly impossible to diagnose without seeing
              the raw data. was the AI&apos;s request malformed? did the tool return bad data? did it time out?
              mcp-spy answers all of these questions instantly.
            </Callout>
          </section>

          <Divider />

          {/* WHO IS THIS FOR */}
          <section id="who-is-this-for" className="scroll-mt-24 mb-16">
            <SectionHeading>who is this for?</SectionHeading>
            <p className="text-muted mb-6">mcp-spy is useful in three different situations, even if you have never written a line of code in your life.</p>
            <ul className="list-none p-0 m-0">
              {[
                ['AI power users', "you use claude desktop or cursor with MCP servers like the filesystem MCP, github MCP, or slack MCP — but you don't write code. mcp-spy lets you see exactly what your AI assistant is doing with those tools in real time."],
                ['MCP developers', 'you are building an MCP server and need to inspect payloads, reproduce bugs, test edge cases, and iterate fast. mcp-spy is your primary debugging tool during development.'],
                ['the security-curious', 'you want an audit trail of every tool call an AI makes on your machine. mcp-spy logs everything locally, so you can review exactly what was read, written, and sent.'],
              ].map(([name, desc]) => (
                <li key={name} className="py-3.5 border-b border-dashed border-ink/10 last:border-b-0">
                  <span className="font-medium">{name}</span>
                  <p className="mt-1.5 mb-0 text-muted text-[0.9rem]">{desc}</p>
                </li>
              ))}
            </ul>
          </section>

          <Divider />

          {/* HOW IT WORKS */}
          <section id="how-it-works" className="scroll-mt-24 mb-16">
            <SectionHeading>how it works</SectionHeading>
            <p className="mb-4">
              mcp-spy is a <strong className="font-medium">transparent proxy</strong>. it sits between your AI client
              (claude, cursor, etc.) and the MCP server, intercepting every message in both directions without
              changing anything about how either side works.
            </p>
            <p className="mb-4">
              you do not need to modify the MCP server. you do not need to change the AI client. you just insert
              mcp-spy in the middle by telling your AI client to talk to mcp-spy&apos;s port instead of the
              server&apos;s port directly.
            </p>
            <pre aria-hidden="true" className="text-[0.75rem] sm:text-[0.85rem] leading-relaxed text-muted overflow-x-auto py-4 text-center">{`ai client ────► mcp-spy ────► mcp server
 (claude)      (logs it)      (unchanged)`}</pre>
            <p className="text-muted text-[0.9rem] italic text-center">mcp-spy is invisible to both sides. it only observes.</p>
          </section>

          <Divider />

          {/* QUICK START */}
          <section id="quick-start" className="scroll-mt-24 mb-16">
            <SectionHeading>quick start</SectionHeading>
            <p>no installation needed. run mcp-spy with <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">npx</code> directly:</p>
            <CodeBlock>{`npx mcp-spy --target 3000`}</CodeBlock>
            <p className="mb-6">
              this starts mcp-spy on port <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">4000</code> (its default
              listen port) and forwards traffic to port <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">3000</code> where
              your MCP server is running. then tell your AI client to connect to{' '}
              <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">http://localhost:4000</code> instead.
            </p>
            <ol className="list-none p-0 m-0 space-y-3">
              {[
                ['1', 'your MCP server is already running on some port (e.g. 3000).'],
                ['2', 'run npx mcp-spy --target 3000 in your terminal. mcp-spy starts listening on 4000.'],
                ['3', 'update your AI client config to point to http://localhost:4000 instead of 3000.'],
                ['4', 'the TUI opens in your terminal. every tool call appears in real time — request, response, duration, status code.'],
              ].map(([n, step]) => (
                <li key={n} className="flex gap-4">
                  <span className="shrink-0 w-7 h-7 border border-ink/20 flex items-center justify-center text-[0.8rem] text-muted">{n}</span>
                  <span className={`pt-0.5 ${n === '4' ? 'font-medium' : ''}`}>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <Divider />

          {/* USING WITH EXISTING MCPs */}
          <section id="existing-mcps" className="scroll-mt-24 mb-16">
            <SectionHeading>using with any MCP server</SectionHeading>
            <p className="mb-4">
              you do <strong className="font-medium">not</strong> need to build an MCP server to use mcp-spy. it works
              with any existing MCP server — including all the popular ones that the community and anthropic provide
              out of the box.
            </p>
            <p className="mb-4">
              common examples include the <strong className="font-medium">filesystem MCP</strong> (lets claude read and
              write your local files), the <strong className="font-medium">github MCP</strong> (lets claude interact
              with your repos), the <strong className="font-medium">slack MCP</strong> (lets claude read and send
              messages), and many others.
            </p>
            <Callout title="the core idea">
              instead of telling claude desktop to run <code className="text-[0.88em]">npx @modelcontextprotocol/server-filesystem /Users/you</code> directly,
              you tell it to run mcp-spy, and mcp-spy wraps that command for you. you don&apos;t change the MCP
              server at all — you just add mcp-spy in front of it.
            </Callout>

            <SubHeading>example: wrapping the filesystem MCP</SubHeading>
            <p>normally your <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">claude_desktop_config.json</code> might look like this:</p>
            <CodeBlock label="before — without mcp-spy">{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents"]
    }
  }
}`}</CodeBlock>
            <p>
              to add mcp-spy, you wrap that command with <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">mcp-spy --target</code>,
              but since this MCP uses <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">stdio</code> (not HTTP), you use
              the wrap mode by passing the original command as the target:
            </p>
            <CodeBlock label="after — with mcp-spy wrapping it">{`{
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
}`}</CodeBlock>
            <p className="text-muted text-[0.88rem]">
              mcp-spy starts the real MCP server as a child process and intercepts all stdio communication. nothing
              changes for claude — it still gets the same responses, but now you can see every call.
            </p>

            <SubHeading>other popular MCP servers you can wrap</SubHeading>
            <ul className="list-none p-0 m-0">
              {[
                ['github MCP', '@modelcontextprotocol/server-github', 'read repos, issues, PRs, and code.'],
                ['filesystem MCP', '@modelcontextprotocol/server-filesystem', 'read and write local files.'],
                ['slack MCP', '@modelcontextprotocol/server-slack', 'read channels, send messages.'],
                ['brave search MCP', '@modelcontextprotocol/server-brave-search', 'web search results via brave.'],
                ['postgresql MCP', '@modelcontextprotocol/server-postgres', 'query your database directly.'],
                ['puppeteer MCP', '@modelcontextprotocol/server-puppeteer', 'browser automation and screenshots.'],
              ].map(([name, pkg, desc]) => (
                <li key={name} className="py-3 border-b border-dashed border-ink/10 last:border-b-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-medium text-[0.92rem]">{name}</span>
                    <code className="text-terracotta text-[0.78rem]">{pkg}</code>
                  </div>
                  <p className="mt-1 mb-0 text-muted text-[0.85rem]">{desc}</p>
                </li>
              ))}
            </ul>
            <p className="text-muted text-[0.88rem] mt-4">
              any MCP server that follows the standard protocol can be wrapped with mcp-spy — these are just the
              most common ones.
            </p>
          </section>

          <Divider />

          {/* DEBUGGING */}
          <section id="debugging" className="scroll-mt-24 mb-16">
            <SectionHeading>debugging common errors</SectionHeading>
            <p className="mb-6">
              MCP failures can be confusing because the AI assistant usually gives a vague error message. here is
              how to use mcp-spy to diagnose the most common problems.
            </p>

            <div className="border border-ink/15 mb-5">
              <div className="border-b border-ink/15 px-4 py-2.5 bg-codebg">
                <span className="font-medium text-[0.9rem] text-bordeaux">problem: claude says &ldquo;I wasn&apos;t able to use that tool&rdquo;</span>
              </div>
              <div className="p-4 text-[0.9rem] text-muted space-y-2">
                <p className="m-0">open the mcp-spy TUI and look at the <strong className="text-ink font-medium">status code</strong> column for the failed call.</p>
                <ul className="list-disc ml-5 space-y-1 m-0">
                  <li><strong className="text-bordeaux font-medium">500</strong> — the server crashed. check the response payload for a stack trace.</li>
                  <li><strong className="text-flame font-medium">404</strong> — claude called a tool that doesn&apos;t exist (wrong tool name or version mismatch).</li>
                  <li><strong className="text-flame font-medium">401 / 403</strong> — missing or expired api key in the server&apos;s environment.</li>
                  <li><strong className="text-ink font-medium">no entry at all</strong> — mcp-spy never received the request. your client config is still pointing to the old port.</li>
                </ul>
              </div>
            </div>

            <div className="border border-ink/15 mb-5">
              <div className="border-b border-ink/15 px-4 py-2.5 bg-codebg">
                <span className="font-medium text-[0.9rem] text-flame">problem: the tool returns wrong or incomplete results</span>
              </div>
              <div className="p-4 text-[0.9rem] text-muted space-y-2">
                <p className="m-0">select the log entry in the TUI to expand the full request and response payloads. check:</p>
                <ul className="list-disc ml-5 space-y-1 m-0">
                  <li>did claude send the right arguments? (check the request payload)</li>
                  <li>what did the server actually return? (check the response payload)</li>
                  <li>is the data truncated, malformed, or missing fields the AI expected?</li>
                </ul>
                <p className="m-0 mt-2">
                  press <kbd className="bg-codebg border border-ink/20 px-1.5 py-0.5 text-[0.8rem]">c</kbd> to export the call
                  as a cURL command, tweak the arguments in your terminal, and resend it to isolate exactly what causes the problem.
                </p>
              </div>
            </div>

            <div className="border border-ink/15">
              <div className="border-b border-ink/15 px-4 py-2.5 bg-codebg">
                <span className="font-medium text-[0.9rem]">problem: everything is slow</span>
              </div>
              <div className="p-4 text-[0.9rem] text-muted">
                <p className="m-0">
                  the <strong className="text-ink font-medium">duration</strong> column in the TUI shows how long each call
                  takes. if specific tool calls are slow (e.g. &gt;2 seconds), inspect the response to see if the
                  server is returning large payloads that could be paginated or filtered.
                </p>
              </div>
            </div>
          </section>

          <Divider />

          {/* BUILDING MCPs */}
          <section id="building-mcps" className="scroll-mt-24 mb-16">
            <SectionHeading>building your own MCP server</SectionHeading>
            <p className="mb-4">
              if you are <em>developing</em> an MCP server, mcp-spy is even more valuable. you get live feedback on
              every tool call during development without adding any logging code to your server.
            </p>
            <p className="mb-4">
              the setup is the same — run your server, start mcp-spy pointing at it, and connect your AI client to
              mcp-spy&apos;s port. as you make changes to your server, mcp-spy keeps logging. no restarts needed.
            </p>
            <Callout title="the development loop">
              start your MCP server (e.g. <code className="text-[0.88em]">node server.js</code> on port 3000) →
              start mcp-spy (<code className="text-[0.88em]">npx mcp-spy --target 3000</code>) →
              ask claude to call your tool → see the exact JSON-RPC in the TUI → fix the bug, restart your server, repeat.
            </Callout>
            <p>language-specific examples are below in the <a href="#example-nodejs" className="underline underline-offset-4 decoration-muted hover:decoration-ink">server examples</a> section.</p>
          </section>

          <Divider />

          {/* CLAUDE DESKTOP */}
          <section id="claude-desktop" className="scroll-mt-24 mb-16">
            <SectionHeading>claude desktop</SectionHeading>
            <p>claude desktop reads its MCP server config from <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">claude_desktop_config.json</code>. the file lives at:</p>
            <CodeBlock>{`macOS:   ~/Library/Application Support/Claude/claude_desktop_config.json
Windows: %APPDATA%\\Claude\\claude_desktop_config.json`}</CodeBlock>
            <p>
              to spy on any MCP server in claude desktop, change its <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">command</code> and{' '}
              <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">args</code> to go through mcp-spy. here is a complete
              example wrapping an HTTP-based custom server:
            </p>
            <CodeBlock label="claude_desktop_config.json">{`{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["mcp-spy", "--target", "3000"],
      "env": {}
    }
  }
}`}</CodeBlock>
            <p className="text-muted text-[0.88rem]">
              claude desktop launches this command when it starts. mcp-spy listens on port 4000, forwards to your
              server on 3000, and logs everything. <strong className="text-ink font-medium">restart claude desktop</strong> after
              editing the config file.
            </p>
          </section>

          {/* CURSOR */}
          <section id="cursor" className="scroll-mt-24 mb-16">
            <SectionHeading>cursor</SectionHeading>
            <p>
              go to <strong className="font-medium">cursor settings → features → MCP</strong> and add a new server
              entry. set the command to launch mcp-spy instead of your server directly.
            </p>
            <CodeBlock label="cursor MCP config (JSON)">{`{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["mcp-spy", "--target", "3000"]
    }
  }
}`}</CodeBlock>
            <p className="text-muted text-[0.88rem]">cursor will launch mcp-spy on startup and route all tool calls through it.</p>
          </section>

          {/* WINDSURF */}
          <section id="windsurf" className="scroll-mt-24 mb-16">
            <SectionHeading>windsurf</SectionHeading>
            <p>
              windsurf (by codeium) also supports MCP servers. edit the{' '}
              <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">~/.codeium/windsurf/mcp_config.json</code> file and add
              mcp-spy as a wrapper the same way as claude desktop.
            </p>
            <CodeBlock label="~/.codeium/windsurf/mcp_config.json">{`{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["mcp-spy", "--target", "3000"]
    }
  }
}`}</CodeBlock>
          </section>

          {/* OTHER CLIENTS */}
          <section id="other-clients" className="scroll-mt-24 mb-16">
            <SectionHeading>other MCP clients</SectionHeading>
            <p>
              any MCP-compatible client works with mcp-spy as long as you can configure it to use a custom server
              address. the pattern is always the same:
            </p>
            <ol className="list-decimal ml-5 space-y-2 my-4">
              <li>find where the client defines its MCP server (usually a JSON config file)</li>
              <li>replace the direct server command or URL with mcp-spy&apos;s address (<code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">http://localhost:4000</code>)</li>
              <li>make sure mcp-spy is running with <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">--target</code> pointing at the original server</li>
            </ol>
            <p className="text-muted text-[0.88rem]">
              compatible clients include: claude desktop, cursor, windsurf, VS code (continue extension), zed, and
              any custom application using the official MCP SDK.
            </p>
          </section>

          <Divider />

          {/* AUTO-REDACTION */}
          <section id="redaction" className="scroll-mt-24 mb-16">
            <SectionHeading>auto-redaction</SectionHeading>
            <p>
              add <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">--redact-pii</code> to automatically mask secrets
              from all payloads before they are saved. nothing sensitive ever touches the database.
            </p>
            <CodeBlock>{`npx mcp-spy --target 3000 --redact-pii`}</CodeBlock>
            <p>the following patterns are automatically redacted:</p>
            <ul className="list-none p-0 m-0 mb-4">
              {[
                ['aws access keys', 'AKIA… patterns'],
                ['bearer tokens', 'authorization headers in payloads'],
                ['private keys', '-----BEGIN … blocks'],
                ['JSON secrets', '"password", "token", "api_key" fields'],
                ['email addresses', 'user@example.com'],
                ['high-entropy tokens', '32–64 char hex strings'],
              ].map(([name, desc]) => (
                <li key={name} className="py-2 border-b border-dashed border-ink/10 last:border-b-0 flex items-baseline gap-3 flex-wrap">
                  <span className="font-medium text-[0.9rem]">{name}</span>
                  <span className="text-muted text-[0.85rem]">{desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted text-[0.88rem]">
              redacted logs are tagged with a 🔒 badge in the TUI. the original bytes are forwarded to the MCP
              server unmodified — redaction only affects storage.
            </p>
          </section>

          {/* TOKEN PROFILING */}
          <section id="tokens" className="scroll-mt-24 mb-16">
            <SectionHeading>token profiling</SectionHeading>
            <p className="mb-4">
              every intercepted request and response is automatically profiled for token count. this tells you how
              much of an LLM&apos;s context window each tool call consumes.
            </p>
            <p className="mb-4">
              token counts appear as <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">~1.2k</code> badges on every log
              row in the TUI. the stats bar shows the session total. no extra flags needed — it&apos;s always on.
            </p>
            <Callout title="estimation method">
              uses a blended heuristic (word count × 1.3 vs. char count ÷ 4, take the higher). accurate to ±15% for
              JSON/code payloads — adequate for spotting expensive calls without any heavy dependencies.
            </Callout>
          </section>

          {/* EXPORT */}
          <section id="export" className="scroll-mt-24 mb-16">
            <SectionHeading>cURL export</SectionHeading>
            <p>
              turn any captured log into a runnable shell command with one keypress: select a log in the TUI and
              press <kbd className="bg-codebg border border-ink/20 px-1.5 py-0.5 text-[0.8rem]">c</kbd>.
            </p>
            <CodeBlock>{`curl -s -X POST http://localhost:4000 \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","method":"tools/call",...}'`}</CodeBlock>
            <p className="text-muted text-[0.88rem]">
              paste it in a terminal, tweak the arguments, and re-fire the exact call without re-triggering claude —
              perfect for reproducing bugs and testing edge cases.
            </p>
          </section>

          {/* MOCK */}
          <section id="mock" className="scroll-mt-24 mb-16">
            <SectionHeading>mock mode</SectionHeading>
            <p>
              add <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">--mock</code> to make mcp-spy intercept all requests
              and return saved responses from your local database —{' '}
              <strong className="font-medium">without forwarding anything to the real server.</strong>
            </p>
            <CodeBlock>{`npx mcp-spy --target 3000 --mock`}</CodeBlock>
            <p className="mb-4">
              for each incoming <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">method</code> (e.g.{' '}
              <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">tools/call</code>), mcp-spy looks up the most recent
              successful response for that method in sqlite and returns it immediately. if no saved response exists
              for a method, it returns a 404 JSON-RPC error.
            </p>
            <Callout title="when is this useful?">
              testing AI agent behaviour without hitting real APIs or incurring costs · reproducing a specific
              scenario deterministically · running the agent while the real MCP server is offline · frontend
              development where you don&apos;t need live data.
            </Callout>
          </section>

          {/* CI RUNNER */}
          <section id="ci-runner" className="scroll-mt-24 mb-16">
            <SectionHeading>CI/CD test runner</SectionHeading>
            <p>
              use the <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">test</code> subcommand to replay saved requests
              against your MCP server and assert valid JSON-RPC responses. exits{' '}
              <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">0</code> on all pass,{' '}
              <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">1</code> on any failure — works natively in github
              actions, gitlab CI, and any shell pipeline.
            </p>
            <CodeBlock>{`# replay last 10 saved requests against the server on port 3000
npx mcp-spy test --target 3000

# only replay a specific method
npx mcp-spy test --target 3000 --method tools/call

# only replay from a specific server label
npx mcp-spy test --target 3000 --name filesystem --count 20`}</CodeBlock>
            <CodeBlock label=".github/workflows/mcp-test.yml">{`name: MCP Server Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Start MCP server
        run: node server.js &
      - name: Run mcp-spy tests
        run: npx mcp-spy test --target 3000 --count 20`}</CodeBlock>
            <div className="border border-ink/15 overflow-x-auto">
              <table className="w-full text-left border-collapse text-[0.88rem]">
                <thead>
                  <tr className="border-b border-ink/15 bg-codebg text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                    <th className="py-2.5 px-4 font-medium">flag</th>
                    <th className="py-2.5 px-4 font-medium">description</th>
                    <th className="py-2.5 px-4 font-medium text-right">default</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  {[
                    ['--target', 'port of the MCP server to test', 'required'],
                    ['--method', 'filter to only replay this JSON-RPC method', 'all'],
                    ['--name', 'filter to only replay from this server label', 'all'],
                    ['--count', 'max requests to replay', '10'],
                    ['--timeout', 'per-request timeout in ms', '5000'],
                  ].map(([flag, desc, def]) => (
                    <tr key={flag} className="border-b border-dashed border-ink/10 last:border-b-0">
                      <td className="py-2.5 px-4 font-medium text-ink whitespace-nowrap">{flag}</td>
                      <td className="py-2.5 px-4">{desc}</td>
                      <td className="py-2.5 px-4 text-right text-faint">{def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <Divider />

          {/* SERVER EXAMPLES */}
          <section id="example-nodejs" className="scroll-mt-24 mb-16">
            <SectionHeading>node.js / typescript</SectionHeading>
            <p>
              mcp-spy works with any MCP server. you do not need to change your server code at all. if you are
              building a node.js MCP server using the official{' '}
              <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">@modelcontextprotocol/sdk</code>:
            </p>
            <CodeBlock label="server.ts — no changes needed">{`import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "my-tool", version: "1.0.0" });

// Your tool definitions...

const transport = new StdioServerTransport();
await server.connect(transport);`}</CodeBlock>
            <p className="text-muted text-[0.88rem]">
              run your server: <code className="text-[0.88em]">node server.js</code> on port 3000. then start mcp-spy:{' '}
              <code className="text-[0.88em]">npx mcp-spy --target 3000</code>.
            </p>
          </section>

          <section id="example-python" className="scroll-mt-24 mb-16">
            <SectionHeading>python</SectionHeading>
            <p>using the official <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">mcp</code> python package. mcp-spy intercepts the stdio stream transparently.</p>
            <CodeBlock label="server.py">{`import asyncio
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
    asyncio.run(main())`}</CodeBlock>
          </section>

          <section id="example-go" className="scroll-mt-24 mb-16">
            <SectionHeading>go</SectionHeading>
            <p>using the <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">mark3labs/mcp-go</code> package. compile your server, run it on a port, and point mcp-spy at it.</p>
            <CodeBlock label="main.go">{`package main

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
}`}</CodeBlock>
          </section>

          <section id="example-rust" className="scroll-mt-24 mb-16">
            <SectionHeading>rust</SectionHeading>
            <p>using the <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">mcp-rs</code> crate. compile your binary and point mcp-spy at the running process.</p>
            <CodeBlock label="src/main.rs">{`use mcp_rs::server::Server;
use mcp_rs::transport::stdio::StdioTransport;
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let transport = StdioTransport::new();
    let mut server = Server::new(transport);

    // Add tools here...

    server.listen().await?;
    Ok(())
}`}</CodeBlock>
          </section>

          <Divider />

          {/* TUI */}
          <section id="tui-shortcuts" className="scroll-mt-24 mb-16">
            <SectionHeading>TUI — invoking &amp; keyboard shortcuts</SectionHeading>

            <SubHeading>how to launch the TUI</SubHeading>
            <p>
              the terminal UI is a full-screen interface that shows a live list of intercepted MCP calls on the left
              and the selected payload on the right. it opens automatically whenever you start the proxy with a{' '}
              <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">--target</code> port.
            </p>
            <CodeBlock label="terminal — start the TUI alongside the proxy">{`# basic — proxy + TUI in one command
npx mcp-spy -t 3001

# with a human-readable label
npx mcp-spy -t 3001 --name filesystem

# disable TUI, keep plain console output (useful in CI)
npx mcp-spy -t 3001 --no-tui`}</CodeBlock>

            <SubHeading>standalone welcome &amp; guided setup</SubHeading>
            <p>
              running <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">npx mcp-spy</code>{' '}
              <strong className="font-medium">without <code className="text-[0.88em]">--target</code></strong> opens an
              interactive welcome screen instead of the proxy: a 4-step guided setup that shows you how to connect
              the official <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">@modelcontextprotocol/server-filesystem</code>{' '}
              server to mcp-spy and your MCP client. navigate with{' '}
              <kbd className="bg-codebg border border-ink/20 px-1.5 py-0.5 text-[0.8rem]">→</kbd> /{' '}
              <kbd className="bg-codebg border border-ink/20 px-1.5 py-0.5 text-[0.8rem]">N</kbd> and go back with{' '}
              <kbd className="bg-codebg border border-ink/20 px-1.5 py-0.5 text-[0.8rem]">←</kbd> /{' '}
              <kbd className="bg-codebg border border-ink/20 px-1.5 py-0.5 text-[0.8rem]">P</kbd>.
            </p>
            <CodeBlock label="quick demo with the official filesystem server">{`# Terminal 1 — start the MCP server on port 3001
npx -y @modelcontextprotocol/server-filesystem \\
    --transport sse --port 3001 ~/Documents

# Terminal 2 — start mcp-spy proxy (TUI opens automatically)
npx mcp-spy -t 3001 --name filesystem

# Claude Desktop config — point at the PROXY (4000), not the server (3001)
# Edit: ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "filesystem": {
      "url": "http://localhost:4000"
    }
  }
}
# Use "url" — not "command"/"args" — otherwise Claude Desktop
# spawns the server directly and bypasses the proxy entirely.`}</CodeBlock>

            <SubHeading>keyboard shortcuts</SubHeading>
            <div className="border border-ink/15 overflow-x-auto">
              <table className="w-full text-left border-collapse text-[0.88rem]">
                <thead>
                  <tr className="border-b border-ink/15 bg-codebg text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                    <th className="py-2.5 px-4 font-medium w-32">key</th>
                    <th className="py-2.5 px-4 font-medium">action</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  {[
                    ['↑ / ↓', 'navigate between log entries'],
                    ['s', 'cycle server filter — shows all, then each server label in turn'],
                    ['c', 'toggle cURL export view for the selected log'],
                    ['q', 'quit mcp-spy'],
                    ['Ctrl+C', 'force quit'],
                  ].map(([key, action]) => (
                    <tr key={key} className="border-b border-dashed border-ink/10 last:border-b-0">
                      <td className="py-2.5 px-4 font-medium text-ink whitespace-nowrap">{key}</td>
                      <td className="py-2.5 px-4">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted text-[0.88rem] mt-4">
              if you prefer plain terminal output without the TUI (useful in CI pipelines), add the{' '}
              <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">--no-tui</code> flag when starting mcp-spy.
            </p>
          </section>

          {/* CLI REFERENCE */}
          <section id="cli-reference" className="scroll-mt-24 mb-16">
            <SectionHeading>CLI reference</SectionHeading>
            <div className="border border-ink/15 overflow-x-auto">
              <table className="w-full text-left border-collapse text-[0.88rem]">
                <thead>
                  <tr className="border-b border-ink/15 bg-codebg text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                    <th className="py-2.5 px-4 font-medium">flag</th>
                    <th className="py-2.5 px-4 font-medium">description</th>
                    <th className="py-2.5 px-4 font-medium text-right">default</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  {[
                    ['--target <port>', 'required. the local port where your actual MCP server is running.', '—'],
                    ['--name <label>', 'human-readable label for this server. shows in the TUI for multi-MCP setups. e.g. --name filesystem.', 'port-{n}'],
                    ['--redact-pii', 'auto-redact secrets (aws keys, tokens, emails, passwords) from payloads before saving. proxy traffic is unaffected.', 'off'],
                    ['--mock', 'mock mode — return saved responses from the local database instead of forwarding to the real server.', 'off'],
                    ['--no-tui', 'disables the interactive TUI. useful in CI, scripts, or piped output.', 'off'],
                  ].map(([flag, desc, def]) => (
                    <tr key={flag} className="border-b border-dashed border-ink/10 last:border-b-0">
                      <td className="py-2.5 px-4 font-medium text-ink whitespace-nowrap">{flag}</td>
                      <td className="py-2.5 px-4">{desc}</td>
                      <td className="py-2.5 px-4 text-right text-faint whitespace-nowrap">{def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout title="test subcommand">
              <code className="text-[0.88em]">mcp-spy test --target &lt;port&gt;</code> — see the{' '}
              <a href="#ci-runner" className="underline underline-offset-4 decoration-muted hover:decoration-ink">CI/CD test runner</a> section
              for full options.
            </Callout>

            <SubHeading>running multiple MCP servers simultaneously</SubHeading>
            <p className="text-muted text-[0.9rem]">use <code className="bg-codebg px-1.5 py-0.5 text-[0.88em]">--name</code> to label each instance. run each in a separate terminal:</p>
            <CodeBlock>{`# Terminal 1 — filesystem MCP
npx mcp-spy --target 3000 --name filesystem

# Terminal 2 — GitHub MCP
npx mcp-spy --target 3001 --name github`}</CodeBlock>
            <p className="text-muted text-[0.88rem]">
              in the TUI, each log shows its server label. press{' '}
              <kbd className="bg-codebg border border-ink/20 px-1.5 py-0.5 text-[0.8rem]">s</kbd> to cycle the filter
              through each server.
            </p>
          </section>

          {/* DATA STORAGE */}
          <section id="data-storage" className="scroll-mt-24 mb-16">
            <SectionHeading>data storage</SectionHeading>
            <p>
              every intercepted request is saved to a sqlite database on your machine immediately — no network
              needed, and nothing ever leaves your computer.
            </p>
            <CodeBlock>{`~/.mcp-spy/mcp_logs.db`}</CodeBlock>
            <ul className="list-none p-0 m-0 text-[0.9rem] text-muted space-y-1">
              <li>✓ persists across terminal restarts</li>
              <li>✓ no size limit beyond disk space</li>
              <li>✓ read by the TUI in real time</li>
              <li>✓ plain sqlite — query it with any client you like</li>
            </ul>
            <Callout>
              that&apos;s the whole storage story. no accounts, no api keys, no cloud. delete the file and every
              trace of your logs is gone.
            </Callout>
          </section>

        </div>

        {/* footer */}
        <footer className="border-t border-ink/10 mt-8 py-8 px-5">
          <div className="max-w-[78ch] mx-auto lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.8rem] text-muted">
            <div>
              <Link href="/" className="text-ink hover:underline">mcpspy.dev</Link>
              <span className="px-2">&middot;</span>
              free &amp; open source observability for MCP
            </div>
            <div className="flex gap-5">
              <a href="https://github.com/gabsalvo/mcpspy.dev" className="hover:text-ink">github</a>
              <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-ink" title="AI-friendly markdown documentation">llms.txt</a>
              <a href="https://gabsalvo.com" className="sunset-hover text-ink">gabsalvo.com</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
