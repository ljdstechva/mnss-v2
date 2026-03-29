'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10 h-[120%] w-full">
        <Image
          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop"
          alt="Environmental Sustainability"
          fill
          className="object-cover"
          priority
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-semibold mb-6 backdrop-blur-sm border border-secondary/30">
            Sustainable Farming Tech & Consultancy
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
            Bringing Innovation to Your <span className="text-secondary">Green</span> Journey.
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-xl">
            From precision agriculture to sustainable practices, we help you grow more efficiently and profitably. Join us in transforming the way we impact our planet.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="bg-secondary text-primary font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-secondary/90 transition-all hover:scale-105"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              href="#about"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Floating Card - Inspired by Farmora */}
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
                    10+
                  </div>
                  <h3 className="text-xl font-bold text-white">Years of Innovation</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  With a decade of experience, we've pioneered advancements in precision agriculture, helping partners increase yields while reducing water consumption by 25%.
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
