import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Lora, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'MCP-Spy',
  description: 'The ultimate zero-config local observability proxy for the Model Context Protocol',
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
      <body className={`${lora.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white text-slate-900`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#0f172a',
            },
            elements: {
              cardBox: 'border border-slate-200 shadow-xl rounded-2xl bg-white',
              socialButtonsBlockButton: 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700',
              formFieldInput: 'bg-white border-slate-300 text-slate-900 focus:border-slate-900',
              footerActionLink: 'text-slate-600 hover:text-slate-900',
              userButtonPopoverCard: 'border border-slate-200 bg-white',
            }
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}

