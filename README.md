# mcpspy.dev

```
      .----.
      | -o )==>
      '--. \
         |  |
         |  |
  ~~~~~~~|  |~~~~~~~
```

The website and documentation for **mcp-spy** — browser devtools, but for AI tool calls.

mcp-spy is a free & open-source observability proxy for the [Model Context Protocol](https://modelcontextprotocol.io). It sits between your AI client (Claude Desktop, Cursor, Windsurf…) and any MCP server, and shows every JSON-RPC message — request, response, duration, status — live in a terminal UI.

The CLI is published on npm as [`mcp-spy`](https://www.npmjs.com/package/mcp-spy):

```bash
npx mcp-spy
```

No account. No cloud. No telemetry. Logs live in a local SQLite database on your machine.

## This repo

This repository contains the [mcpspy.dev](https://mcpspy.dev) website: a static landing page and the full documentation, built with [Next.js](https://nextjs.org) and Tailwind CSS. It shares its paper-and-ink, ASCII-art design language with [gabsalvo.com](https://gabsalvo.com) and [domoroshi.tech](https://domoroshi.tech).

### Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Deployed on [Vercel](https://vercel.com) — every push to `main` redeploys automatically.

## Contributing

Found a bug or a typo? Open an issue. Want a feature? PRs welcome.

## License

[MIT](LICENSE) © Gabriele Salvo
