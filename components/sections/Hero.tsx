'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ManagedImage } from '@/components/ui/ManagedImage'
import type { MnssHeroSection } from '@/types/database'
import { fallbackHero } from '@/lib/mnss-fallbacks'

type HeroProps = {
  hero?: MnssHeroSection | null
}

export default function Hero({ hero = fallbackHero }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const content = hero ?? fallbackHero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 h-[120%] w-full">
        <ManagedImage
          src={content.image_url}
          alt="Environmental consulting field work"
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ opacity }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-sm font-semibold mb-6 backdrop-blur-md border border-secondary/45 shadow-sm">
            {content.eyebrow ?? 'Environmental Studies Consultants'}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
            <HighlightedHeadline
              headline={content.headline}
              highlightedText={content.highlighted_text}
            />
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-xl">
            {content.body ?? fallbackHero.body}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={content.primary_cta_href ?? '/#contact'}
              className="bg-secondary text-primary font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-secondary/90 transition-all hover:scale-105"
            >
              {content.primary_cta_label ?? 'Request consultation'} <ArrowRight size={20} />
            </Link>
            <Link
              href={content.secondary_cta_href ?? '/projects'}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all"
            >
              {content.secondary_cta_label ?? 'View projects'}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ opacity }}
          className="hidden md:block relative h-[500px]"
        >
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px]">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl">
                    1997
                  </div>
                  <h3 className="text-xl font-bold text-white">Environmental study support</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  From EIA documentation to ECC compliance planning, MNSS helps project owners prepare clearer environmental requirements and stakeholder-ready reports.
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 2, delay: 1 + i * 0.2 }}
                        className="h-full bg-secondary"
                       />
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  )
}

function HighlightedHeadline({
  headline,
  highlightedText,
}: {
  headline: string
  highlightedText?: string | null
}) {
  const highlighted = highlightedText?.trim()

  if (!highlighted) {
    return <>{headline}</>
  }

  const startIndex = headline.toLowerCase().indexOf(highlighted.toLowerCase())

  if (startIndex < 0) {
    return (
      <>
        {headline} <span className="text-secondary">{highlighted}</span>
      </>
    )
  }

  const before = headline.slice(0, startIndex)
  const match = headline.slice(startIndex, startIndex + highlighted.length)
  const after = headline.slice(startIndex + highlighted.length)

  return (
    <>
      {before}
      <span className="text-secondary">{match}</span>
      {after}
    </>
  )
}
