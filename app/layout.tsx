import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VibeFinder',
  description: 'Stop doomscrolling, start discovering: Your AI guide to trending local spots.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className="min-h-screen bg-background">
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
