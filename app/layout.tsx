import type { Metadata, Viewport } from 'next'
import { Inter, Bricolage_Grotesque } from 'next/font/google'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/common/BackToTop'
import FloatingButtons from '@/components/common/FloatingButtons'
import LoadingScreen from '@/components/common/LoadingScreen'
import ScrollProgress from '@/components/common/ScrollProgress'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
})

export const metadata: Metadata = {
  title: {
    default: 'FeedIndia Healthcare & Consultancy | Premium Hospital Solutions',
    template: '%s | FeedIndia Healthcare',
  },
  description:
    'Leading healthcare consultancy offering NABH accreditation, hospital licensing, medical equipment procurement, healthcare recruitment and business consultancy services across India.',
  keywords: [
    'NABH consultancy',
    'hospital consultancy India',
    'healthcare licensing',
    'medical equipment procurement',
    'hospital management',
    'healthcare recruitment',
    'medical tourism',
    'digital healthcare',
  ],
  authors: [{ name: 'FeedIndia Healthcare & Consultancy' }],
  creator: 'FeedIndia Healthcare',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.feedindiahealthcare.com',
    siteName: 'FeedIndia Healthcare & Consultancy',
    title: 'FeedIndia Healthcare & Consultancy | Premium Hospital Solutions',
    description:
      'Leading healthcare consultancy offering NABH accreditation, hospital licensing, and comprehensive healthcare solutions across India.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'FeedIndia Healthcare & Consultancy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FeedIndia Healthcare & Consultancy',
    description: 'Premium hospital consultancy & NABH accreditation services across India.',
    images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F766E' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${bricolage.variable}`}>
      <body className="font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <ThemeProvider>
          <LoadingScreen />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <FloatingButtons />
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
