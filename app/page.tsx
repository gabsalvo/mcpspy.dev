import Link from 'next/link';
import { Sky, Ocean } from './scene';

const SUN = `      ;   :   ;
   .   \\_,!,_/   ,
    \`.,'     \`.,'
     /         \\    `;

const PERISCOPE = `      .----.
      | -o )==>
      '--. \\
         |  |
         |  |
  ~~~~~~~|  |~~~~~~~`;

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-paper text-ink overflow-x-hidden">

      {/* ---- sky, sun & horizon (family header) ---- */}
      <header className="w-full pt-2">
        <nav className="w-full flex justify-end items-center gap-5 text-[0.85rem] px-8 pt-6" aria-label="Main Navigation">
          <Link href="/docs" className="text-muted hover:text-ink hover:underline">docs</Link>
          <a href="https://github.com/gabsalvo/mcpspy.dev" className="text-muted hover:text-ink hover:underline">github</a>
          <a href="https://www.npmjs.com/package/mcp-spy" className="text-muted hover:text-ink hover:underline">npm</a>
          <a href="https://gabsalvo.com" className="text-muted hover:text-ink hover:underline">gabsalvo.com</a>
        </nav>
        <Sky>
          <pre className="sun-art absolute left-1/2 -bottom-0.5 -translate-x-1/2">{SUN}</pre>
        </Sky>
        <div className="horizon" role="presentation" />
      </header>

      {/* ---- hero ---- */}
      <div className="flex-1 flex flex-col items-center text-center px-5 w-full">
        {/* the periscope watches the traffic drift past */}
        <div className="relative w-full flex justify-center">
        <Ocean />
        <section aria-labelledby="hero-heading" className="relative z-10 w-full max-w-2xl flex flex-col items-center pt-20 pb-4">
          <h1 id="hero-heading" className="text-[1.15rem] font-medium tracking-[0.01em] mb-3">
            mcpspy.dev
          </h1>
          <p className="text-muted text-[0.9rem] mb-10 max-w-md">
            browser devtools, but for AI tool calls.<br />
            see every message between your assistant and its MCP servers.<br />
            <span className="sunset-text font-medium">free &amp; open source. no account. no cloud.</span>
          </p>

          <pre aria-hidden="true" className="periscope text-ink text-[0.6rem] leading-none mb-8 select-none">{PERISCOPE}</pre>

          {/* the one command */}
          <div className="w-full max-w-md border border-ink bg-paper text-left px-5 py-4 mb-6">
            <p className="text-[0.95rem]">$ <span className="font-medium">npx mcp-spy</span><span className="blink" /></p>
            <p className="text-muted text-[0.8rem] mt-2">guided setup opens in your terminal. no flags, no config, nothing to sign up for.</p>
          </div>

          <div className="flex items-center gap-3 text-[0.85rem]">
            <Link href="/docs" className="border border-ink px-4 py-1.5 hover:bg-ink hover:text-paper transition-colors">
              read the docs
            </Link>
            <a href="https://github.com/gabsalvo/mcpspy.dev" className="text-muted hover:text-ink underline underline-offset-4 decoration-muted hover:decoration-ink">
              star it on github
            </a>
            <a href="https://www.npmjs.com/package/mcp-spy" className="text-muted hover:text-ink underline underline-offset-4 decoration-muted hover:decoration-ink">
              npm
            </a>
          </div>
        </section>
        </div>

        <div className="wave-divider" role="presentation" />

        {/* ---- how it works ---- */}
        <section id="how-it-works" className="w-full max-w-2xl text-left" aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-[0.85rem] font-medium tracking-[0.18em] uppercase text-muted border-b border-ink/10 pb-1.5 mb-5">
            how it works
          </h2>
          <p className="text-[0.95rem] mb-4">
            mcp-spy is a <strong className="font-medium">transparent proxy</strong>. it sits between your AI client
            (claude, cursor, windsurf&hellip;) and the MCP server, intercepting every JSON-RPC message in both
            directions without changing anything about how either side works.
          </p>
          <pre aria-hidden="true" className="text-[0.7rem] sm:text-[0.8rem] leading-relaxed text-muted overflow-x-auto py-4 text-center">{`ai client ────► mcp-spy ────► mcp server
 (claude)      (logs it)      (unchanged)`}</pre>
          <p className="text-[0.95rem] mb-4">
            you don&apos;t modify the server. you don&apos;t modify the client. you just point the client at
            mcp-spy&apos;s port and watch every request, response, duration, and status code roll in — live, in a
            TUI, right in your terminal.
          </p>
          <p className="text-muted text-[0.9rem] italic">it is invisible to both sides. it only observes.</p>
        </section>

        <div className="wave-divider" role="presentation" />

        {/* ---- features ---- */}
        <section id="features" className="w-full max-w-2xl text-left" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-[0.85rem] font-medium tracking-[0.18em] uppercase text-muted border-b border-ink/10 pb-1.5 mb-3">
            what you get
          </h2>
          <p className="text-muted text-[0.88rem] italic mb-5">
            everything runs on your machine. logs live in a local sqlite database.
            nothing ever leaves your computer.
          </p>
          <ul className="list-none p-0 m-0">
            {[
              ['live TUI', 'a full-screen terminal UI with every intercepted call — request, response, duration, status. arrow keys to browse, works fully offline.'],
              ['works with any MCP server', 'filesystem, github, slack, postgres, puppeteer, or one you wrote yourself — wrap any server without touching its code.'],
              ['token profiling', 'every payload is profiled for token count, so you can see which tool calls are eating your context window.'],
              ['auto-redaction', 'strip secrets (aws keys, bearer tokens, emails, passwords) from payloads before they touch disk. --redact-pii.'],
              ['mock mode', 'replay saved responses without a live server (--mock) — deterministic testing, zero api costs.'],
              ['CI test runner', 'replay saved requests against your server and assert valid responses in github actions. mcp-spy test.'],
              ['cURL export', 'turn any captured call into a runnable curl command straight from the TUI. press c.'],
            ].map(([name, desc]) => (
              <li key={name} className="py-3.5 border-b border-dashed border-ink/10 last:border-b-0">
                <span className="text-[1rem] font-medium">{name}</span>
                <p className="mt-1.5 mb-0 text-muted text-[0.9rem]">{desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="wave-divider" role="presentation" />

        {/* ---- roadmap ---- */}
        <section id="roadmap" className="w-full max-w-2xl text-left" aria-labelledby="roadmap-heading">
          <h2 id="roadmap-heading" className="text-[0.85rem] font-medium tracking-[0.18em] uppercase text-muted border-b border-ink/10 pb-1.5 mb-3">
            what&apos;s shipped &amp; what&apos;s next
          </h2>
          <ul className="list-none p-0 m-0">
            {([
              ['zero-config proxy & live TUI', 'transparent stdio/http interception with a real-time terminal UI. the core of the whole thing.', 'shipped'],
              ['token profiling', 'automatic token counts on every request and response, with a session total in the stats bar.', 'shipped'],
              ['auto-redaction, mock mode & CI runner', 'strip secrets before storage (--redact-pii), return saved responses without a live server (--mock), run regression tests in CI (mcp-spy test).', 'shipped'],
              ['session timeline view', 'group all tool calls from a single conversation into a chronological timeline — the full context of what the AI was doing, not just payloads in isolation.', 'wip'],
              ['schema diffing', 'warn when your server breaks its own JSON schema response format between calls.', 'planned'],
            ] as const).map(([name, desc, status]) => (
              <li key={name} className="py-3.5 border-b border-dashed border-ink/10 last:border-b-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className={`text-[1rem] font-medium ${status === 'planned' ? 'text-faint' : ''}`}>{name}</span>
                  {status === 'shipped' && <span className="tag text-terracotta">shipped</span>}
                  {status === 'wip' && <span className="tag text-muted blink">wip</span>}
                  {status === 'planned' && <span className="tag text-faint">someday</span>}
                </div>
                <p className={`mt-1.5 mb-0 text-[0.9rem] ${status === 'planned' ? 'text-faint italic' : 'text-muted'}`}>{desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="wave-divider" role="presentation" />

        {/* ---- open source ---- */}
        <section id="open-source" className="w-full max-w-2xl text-left mb-20" aria-labelledby="oss-heading">
          <h2 id="oss-heading" className="text-[0.85rem] font-medium tracking-[0.18em] uppercase text-muted border-b border-ink/10 pb-1.5 mb-5">
            open source
          </h2>
          <p className="text-[0.95rem] mb-4">
            the whole thing is MIT-licensed on{' '}
            <a href="https://github.com/gabsalvo/mcpspy.dev" className="underline underline-offset-4 decoration-muted hover:decoration-ink">github</a>{' '}
            and published on npm as{' '}
            <a href="https://www.npmjs.com/package/mcp-spy" className="underline underline-offset-4 decoration-muted hover:decoration-ink">mcp-spy</a>.
            there is no paid tier, no telemetry, and no cloud — just a tool.
          </p>
          <p className="text-muted text-[0.9rem]">
            found a bug? open an issue. want a feature? PRs welcome.
          </p>
        </section>
      </div>

      {/* ---- footer ---- */}
      <footer className="w-full text-muted text-[0.8rem] px-8 py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0 text-center">
        <div className="md:text-left">
          <a href="https://github.com/gabsalvo/mcpspy.dev/blob/main/LICENSE" className="hover:text-ink">mit license</a>
          <span className="px-2">&middot;</span>
          <a href="https://github.com/gabsalvo/mcpspy.dev" className="hover:text-ink">github</a>
          <span className="px-2">&middot;</span>
          <a href="https://www.npmjs.com/package/mcp-spy" className="hover:text-ink">npm</a>
        </div>
        <div className="md:text-center">
          built by <a href="https://gabsalvo.com" target="_blank" rel="noopener noreferrer" className="sunset-hover text-ink">gabsalvo.com</a>
        </div>
        <div className="md:text-right">
          <Link href="/docs" className="hover:text-ink">docs</Link>
          <span className="px-2">&middot;</span>
          <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-ink" title="AI-friendly markdown documentation">llms.txt</a>
        </div>
      </footer>
    </main>
  );
}
