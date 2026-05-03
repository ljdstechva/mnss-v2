'use client'

import { motion } from 'framer-motion'
import { 
  FileCheck, 
  BarChart3, 
  ShieldCheck,
  ClipboardCheck,
  FileSearch,
  Zap
} from 'lucide-react'
import type { MnssSiteInformation } from '@/types/database'
import { fallbackSiteInformation } from '@/lib/mnss-fallbacks'

const services = [
  {
    title: 'EIS Preparation',
    description: 'Preparation of Environmental Impact Statements (EIS) for major projects requiring comprehensive analysis for ECC approval.',
    icon: FileSearch,
  },
  {
    title: 'EPRMP & PEPRMP',
    description: 'Environmental Performance Report and Management Plans for existing projects or programmatic assessments.',
    icon: ClipboardCheck,
  },
  {
    title: 'IEE Checklist',
    description: 'Assistance with Initial Environmental Examination (IEE) checklists for projects with minimal environmental impact.',
    icon: FileCheck,
  },
  {
    title: 'ECC Approval Support',
    description: 'Expert guidance through the Philippine EIS System (PD 1586) to secure Environmental Compliance Certificates.',
    icon: ShieldCheck,
  },
  {
    title: 'Environmental Auditing',
    description: 'Detailed performance audits to ensure ongoing compliance with environmental standards and regulations.',
    icon: BarChart3,
  },
  {
    title: 'Sustainability Solutions',
    description: 'Innovative consultancy to integrate sustainable practices into your project lifecycle.',
    icon: Zap,
  },
]

type ServicesProps = {
  serviceOverview?: MnssSiteInformation | null
}

export default function Services({ serviceOverview }: ServicesProps) {
  const fallbackOverview = fallbackSiteInformation.find(
    (item) => item.section_key === 'services_overview'
  )

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Our Expertise</h2>
            <p className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Expert EIA Services for <span className="text-secondary">ECC Approval.</span>
            </p>
            <p className="text-foreground/60 text-lg">
              {serviceOverview?.body ??
                fallbackOverview?.body ??
                'We specialize in the preparation of regulatory reports under the Philippine EIS System, ensuring your projects meet all legal and ecological requirements.'}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group p-10 rounded-[40px] bg-background border border-border hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary/80 transition-colors">
                {service.title}
              </h3>
              <p className="text-foreground/60 leading-relaxed mb-8">
                {service.description}
              </p>
              <button className="mt-auto text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                 Learn More <div className="w-6 h-[1px] bg-primary group-hover:w-8 transition-all" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
