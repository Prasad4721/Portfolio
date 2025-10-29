import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { AIAssistant } from '@/components/AIAssistant'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prasad Rahane | AI & Data Science Enthusiast | Portfolio',
  description: 'AI & Data Science Enthusiast | Turning Data into Intelligent Solutions | Innovator • Learner • Creator. Aspiring Software Developer & Cloud Enthusiast with expertise in Python, AWS, Data Analysis, and Web Development.',
  keywords: ['portfolio', 'AI enthusiast', 'data science', 'Python', 'AWS', 'data analysis', 'web development', 'software developer', 'cloud computing', 'machine learning'],
  authors: [{ name: 'Prasad Rahane' }],
  creator: 'Prasad Rahane',
  publisher: 'Prasad Rahane',
  robots: 'index, follow',
  openGraph: {
    title: 'Prasad Rahane | AI & Data Science Enthusiast',
    description: 'AI & Data Science Enthusiast | Turning Data into Intelligent Solutions | Innovator • Learner • Creator',
    url: 'https://prasadrahane.dev',
    siteName: 'Prasad Rahane Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prasad Rahane - AI & Data Science Enthusiast',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prasad Rahane | AI & Data Science Enthusiast',
    description: 'AI & Data Science Enthusiast | Turning Data into Intelligent Solutions | Innovator • Learner • Creator',
    images: ['/og-image.jpg'],
  },
  metadataBase: new URL('https://prasadrahane.dev'),
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00f5ff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00f5ff" />
      </head>
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <ParticlesBackground />
        <Navigation />
        <main className="relative z-10 pt-16">
          {children}
        </main>
        <AIAssistant />
      </body>
    </html>
  )
}

