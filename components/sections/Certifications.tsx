'use client'

import { motion } from 'framer-motion'
import { Award, CalendarCheck, ExternalLink, ShieldCheck } from 'lucide-react'
import type { MnssCertification } from '@/types/database'
import { ManagedImage } from '@/components/ui/ManagedImage'

type CertificationsProps = {
  certifications: MnssCertification[]
}

export default function Certifications({ certifications }: CertificationsProps) {
  if (certifications.length === 0) {
    return null
  }

  return (
    <section id="certifications" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Certifications
          </h2>
          <p className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Credentials and qualifications maintained for environmental consulting work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((certification, index) => (
            <motion.article
              key={certification.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="overflow-hidden rounded-3xl border border-border bg-background shadow-[0_20px_70px_rgba(27,67,50,0.06)]"
            >
              {certification.image_url ? (
                <div className="relative h-56">
                  <ManagedImage
                    src={certification.image_url}
                    alt={certification.title}
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              ) : null}
              <div className="p-8">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-primary">
                    <ShieldCheck size={16} aria-hidden="true" />
                    {formatStatus(certification.status)}
                  </span>
                  {certification.issuer ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-primary">
                      <Award size={16} aria-hidden="true" />
                      {certification.issuer}
                    </span>
                  ) : null}
                </div>
                <h3 className="text-2xl font-bold text-primary">{certification.title}</h3>
                {certification.credential_holder ? (
                  <p className="mt-3 text-foreground/65">
                    Credential holder:{' '}
                    <span className="font-semibold text-foreground">
                      {certification.credential_holder}
                    </span>
                  </p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-foreground/60">
                  {certification.issue_date ? (
                    <span className="inline-flex items-center gap-2">
                      <CalendarCheck size={16} aria-hidden="true" />
                      Issued {certification.issue_date}
                    </span>
                  ) : null}
                  {certification.expiry_date ? (
                    <span className="inline-flex items-center gap-2">
                      <CalendarCheck size={16} aria-hidden="true" />
                      Valid until {certification.expiry_date}
                    </span>
                  ) : null}
                </div>
                {certification.document_url ? (
                  <a
                    href={certification.document_url}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-black text-primary transition hover:gap-3"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View credential <ExternalLink size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function formatStatus(status: MnssCertification['status']) {
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
