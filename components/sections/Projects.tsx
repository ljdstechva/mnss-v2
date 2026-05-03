'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import type { MnssProject } from '@/types/database'
import { ManagedImage } from '@/components/ui/ManagedImage'

type ProjectsProps = {
  projects: MnssProject[]
  showAllLink?: boolean
}

export default function Projects({ projects, showAllLink = true }: ProjectsProps) {
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
              Portfolio records are managed from the MNSS admin dashboard and update here as the owner publishes or revises project details.
            </p>
          </motion.div>
          {showAllLink ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href="/projects"
                className="group flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition-all"
              >
                All Projects <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ) : null}
        </div>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-12 gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-[40px] ${
                  index % 4 === 0 || index % 4 === 3 ? 'md:col-span-7' : 'md:col-span-5'
                } h-[400px] md:h-[500px]`}
              >
                <ManagedImage
                  src={project.image_url}
                  alt={project.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  sizes="(min-width: 768px) 55vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-75 group-hover:opacity-100 transition-opacity" />

                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">
                    {project.category ?? project.service_type ?? 'Environmental consulting'}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <div className="mb-4 flex flex-wrap gap-3 text-xs font-semibold text-white/70">
                    {project.location ? (
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} aria-hidden="true" />
                        {project.location}
                      </span>
                    ) : null}
                    {project.project_year ? <span>{project.project_year}</span> : null}
                  </div>
                  {project.summary ? (
                    <p className="text-white/70 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {project.summary}
                    </p>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-primary/10 bg-primary/5 p-10 text-center">
            <p className="text-lg font-bold text-primary">Project portfolio updates are being reviewed.</p>
            <p className="mt-3 text-foreground/60">
              New project records added in the admin dashboard will appear here when marked visible.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
