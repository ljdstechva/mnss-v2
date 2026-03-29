'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const stats = [
  {
    label: 'Years of Experience',
    value: '25+',
    description: 'Providing expert environmental consultancy since 1997.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop',
    color: 'bg-primary/5',
  },
  {
    label: 'Projects Completed',
    value: '500+',
    description: 'Successful environmental studies and assessments across the country.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-secondary/10',
  },
  {
    label: 'Client Satisfaction',
    value: '98%',
    description: 'Trusted by government agencies and private enterprises.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-accent/20',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-primary font-bold tracking-widest text-sm uppercase">Who We Are</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
               Dedicated to a <span className="text-primary underline decoration-secondary">Sustainable Future</span> Through Expert Guidance.
             </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-foreground/70 text-lg leading-relaxed mb-8">
              Since 1997, MNS Suarez Environmental Studies Consultants has been at the forefront of environmental advocacy and technical excellence. We bridge the gap between development and conservation through rigorous scientific analysis and strategic planning.
            </p>
            <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
               Learn More About Our Journey <ArrowUpRight size={20} />
            </button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group p-8 rounded-3xl ${stat.color} relative overflow-hidden flex flex-col justify-between h-full border border-transparent hover:border-primary/10 transition-all`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-4xl font-black text-primary">{stat.value}</h3>
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary transform rotate-0 group-hover:rotate-45 transition-transform duration-500">
                      <ArrowUpRight size={20} />
                   </div>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">{stat.label}</h4>
                <p className="text-primary/70 text-sm leading-relaxed mb-6">
                  {stat.description}
                </p>
              </div>

              <div className="relative h-48 w-full rounded-2xl overflow-hidden mt-auto">
                 <Image
                   src={stat.image}
                   alt={stat.label}
                   fill
                   className="object-cover group-hover:scale-110 transition-transform duration-1000"
                 />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
