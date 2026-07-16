import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'mcpspy.dev',
  description: 'Free & open-source observability proxy for the Model Context Protocol. See every call between your AI and its tools.',
  alternates: {
    types: {
      "text/markdown": "/llms.txt",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased bg-paper text-ink`}>
        {children}
      </body>
    </html>
  )
}
