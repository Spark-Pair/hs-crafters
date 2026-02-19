// import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AppProviders } from '@/components/providers/AppProviders'

// const _geist = Geist({ subsets: ['latin'] })
// const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'HS Crafters - Turning Life into Art',
  description: 'Handcrafted arts and crafts for your home and lifestyle',
  generator: 'v0.app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abel&family=Amarante&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
