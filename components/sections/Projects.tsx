'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    title: '56 MW Gas Turbine Power Plant',
    category: 'EIS Preparation',
    description: 'Environmental Impact Statement (EIS) for the San Miguel Consolidated Power Corporation expansion in Zamboanga City.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
    size: 'large',
  },
  {
    title: '72.2 ML Petroleum Terminal',
    category: 'EIS & Public Scoping',
    description: 'Comprehensive environmental reporting for HPH Petroleum (Philippines) Inc. in Sta. Cruz, Davao del Sur.',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2070&auto=format&fit=crop',
    size: 'small',
  },
  {
    title: 'People\'s Ville Housing Project',
    category: 'EPRMP Services',
    description: 'Environmental Performance Report and Management Plan for a 7,200-unit socialized housing development in Davao City.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop',
    size: 'small',
  },
  {
    title: 'Santeh Feeds Manufacturing Plant',
    category: 'EIS & Technical Review',
    description: 'Environmental Impact Statement for Santeh Feeds Corporation\'s manufacturing facility in Hagonoy, Davao del Sur.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    size: 'large',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Our Portfolio</h2>
            <p className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Proven Excellence in <span className="text-primary italic font-serif">Environmental</span> Compliance.
            </p>
            <p className="text-foreground/60 text-lg">
              Showcasing our track record of successful ECC approvals for major energy, industrial, and residential projects across the Philippines.
            </p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition-all"
          >
            All Projects <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-[40px] ${
                project.size === 'large' ? 'md:col-span-7' : 'md:col-span-5'
              } h-[400px] md:h-[500px] cursor-pointer`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
