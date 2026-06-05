import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import ReduxProvider from '@/providers/ReduxProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Trip Vibe Planner',
  description: 'Describe your travel mood in plain words. AI builds a full day-by-day itinerary with a visual vibe board.',
  openGraph: {
    title: 'Trip Vibe Planner',
    description: 'No dropdowns, no filters. Just tell me how you want to feel.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
