import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/animations/SmoothScroll'
import ScrollToTop from '@/components/animations/ScrollToTop'
import { ThemeProvider } from '@/components/animations/ThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://mnsconsultants.com'),
  title: 'MNS Suarez Environmental Studies Consultants',
  description: 'Providing sustainable solutions for environmental studies and consultancy since 1997.',
  openGraph: {
    title: 'MNS Suarez Environmental Studies Consultants',
    description: 'Environmental consultancy based in the Philippines, specialized in sustainability.',
    images: ['/images/mnss-logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SmoothScroll>
            <ScrollToTop />
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
