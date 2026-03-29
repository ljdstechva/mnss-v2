import Projects from '@/components/sections/Projects'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Projects | MNS Suarez Environmental Studies Consultants',
  description: 'Explore our portfolio of successful environmental studies and sustainability projects.',
}

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <Projects />
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-primary p-12 md:p-20 rounded-[60px] text-white text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Have a specific project in mind?</h2>
            <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
              Our expertise spans across various industries and environments. Let's discuss how we can bring sustainable success to your next endeavor.
            </p>
            <button className="bg-secondary text-primary font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform">
              Discuss Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
