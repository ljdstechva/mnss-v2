import Contact from '@/components/sections/Contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | MNS Suarez Environmental Studies Consultants',
  description: 'Get in touch with our expert consultants for your environmental study needs.',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Contact />
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-8 rounded-[40px] border border-border bg-primary/5 p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/60">
                Consultation coverage
              </p>
              <h2 className="mt-4 text-3xl font-bold text-primary">Philippines-based environmental support</h2>
            </div>
            <p className="text-lg leading-relaxed text-foreground/65">
              MNSS supports project owners with environmental documentation, regulatory planning,
              and stakeholder-ready compliance materials. Use the contact form above to send the
              project location, service needed, and target timeline.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
