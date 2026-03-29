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
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">Office Location</h2>
          <div className="aspect-video w-full rounded-[40px] overflow-hidden bg-background border border-border flex items-center justify-center text-foreground/40">
             [Interactive Map Placeholder]
          </div>
        </div>
      </section>
    </div>
  )
}
