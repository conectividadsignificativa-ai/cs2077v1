import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/cs2077v1' : ''

export const metadata: Metadata = {
  title: 'Colombia 2077 - Experiencia Interactiva',
  description: 'Una experiencia narrativa interactiva sobre corresponsabilidad digital y futuros posibles para Colombia',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: `${BASE_PATH}/icon-light-32x32.png`,
        media: '(prefers-color-scheme: light)',
      },
      {
        url: `${BASE_PATH}/icon-dark-32x32.png`,
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: `${BASE_PATH}/icon.svg`,
        type: 'image/svg+xml',
      },
    ],
    apple: `${BASE_PATH}/apple-icon.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
