import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'MCP-Spy Dashboard',
  description: 'The ultimate zero-config local observability proxy for the Model Context Protocol',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-zinc-950 text-zinc-300`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: '#06b6d4',
            },
            elements: {
              cardBox: 'border border-zinc-800 shadow-2xl rounded-2xl bg-zinc-950',
              socialButtonsBlockButton: 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-200',
              formFieldInput: 'bg-zinc-900/50 border-zinc-800 text-zinc-100 focus:border-cyan-500/50',
              footerActionLink: 'text-cyan-400 hover:text-cyan-300',
              userButtonPopoverCard: 'border border-zinc-800 bg-zinc-950',
            }
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
