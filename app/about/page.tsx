import About from '@/components/sections/About'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | MNS Suarez Environmental Studies Consultants',
  description: 'Learn more about our mission, vision, and the expert team behind our environmental consultancy.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About />
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-foreground/70 leading-relaxed text-lg">
                To empower industries and communities with scientific knowledge and strategic environmental solutions that foster sustainable development and ecological integrity.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Vision</h2>
              <p className="text-foreground/70 leading-relaxed text-lg">
                To be the leading environmental consultancy firm recognized for technical excellence, advocacy for the environment, and pioneering sustainable innovations across the Philippines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
