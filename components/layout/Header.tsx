'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-[background-color,box-shadow,border-color] duration-300',
        'border-b border-border/70 bg-background/95 shadow-sm backdrop-blur-xl'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="MNS Suarez Environmental Studies Consultants home"
          className="flex min-w-0 items-center gap-2.5"
        >
          <div className="relative h-10 w-10 shrink-0 sm:h-11 sm:w-11">
            <Image
              src="/images/mnss-logo.png"
              alt="MNS Suarez logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="min-w-0 leading-none text-primary transition-colors">
            <span className="block text-base font-black tracking-tight sm:text-lg">
              MNS Suarez
            </span>
            <span className="mt-1 block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.11em] text-primary/68 sm:text-[11px]">
              Environmental Studies Consultants
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'rounded-md px-1 py-1 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70',
                'text-primary/75 hover:text-primary',
                pathname === link.href && 'text-primary'
              )}
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/#contact"
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            className={cn(
              'rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70',
              'text-primary'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border mt-4 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium hover:text-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-between py-2 border-t border-border pt-4 mt-2">
                <span className="text-sm font-medium text-foreground/60">Switch Theme</span>
                <ThemeToggle />
              </div>
              <Link
                href="/#contact"
                className="bg-primary text-white px-5 py-3 rounded-xl text-center font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
