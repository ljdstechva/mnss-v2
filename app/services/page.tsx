import Services from '@/components/sections/Services'
import { Metadata } from 'next'
import { getMnssPublicContent, getSiteInformationByKey } from '@/lib/mnss-content'

export const metadata: Metadata = {
  title: 'Our Services | MNS Suarez Environmental Studies Consultants',
  description: 'Comprehensive environmental consultancy services including EIA, auditing, and waste management.',
}

export const revalidate = 0

export default async function ServicesPage() {
  const { siteInformation } = await getMnssPublicContent()
  const serviceOverview = getSiteInformationByKey(siteInformation, 'services_overview')

  return (
    <div className="pt-20">
      <Services serviceOverview={serviceOverview} />
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Comprehensive Environmental Solutions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Technical Excellence',
                desc: 'Our team of scientists and engineers ensure every assessment is grounded in rigorous technical analysis.'
              },
              {
                title: 'Strategic Planning',
                desc: 'We help you navigate complex regulatory landscapes with clear, actionable environmental strategies.'
              },
              {
                title: 'Sustainable Innovation',
                desc: 'We integrate the latest sustainable technologies into traditional industrial processes.'
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-background border border-border">
                <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
