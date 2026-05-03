import About from '@/components/sections/About'
import Certifications from '@/components/sections/Certifications'
import { Metadata } from 'next'
import { getMnssPublicContent, getSiteInformationByKey } from '@/lib/mnss-content'

export const metadata: Metadata = {
  title: 'About Us | MNS Suarez Environmental Studies Consultants',
  description: 'Learn more about our mission, vision, and the expert team behind our environmental consultancy.',
}

export const revalidate = 0

export default async function AboutPage() {
  const { siteInformation, certifications } = await getMnssPublicContent()
  const companyProfile = getSiteInformationByKey(siteInformation, 'company_profile')
  const mission = getSiteInformationByKey(siteInformation, 'mission')

  return (
    <div className="pt-20">
      <About siteInformation={siteInformation} />
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                {mission?.title ?? 'Our Mission'}
              </h2>
              <p className="text-foreground/70 leading-relaxed text-lg">
                {mission?.body ??
                  'To empower industries and communities with scientific knowledge and strategic environmental solutions that foster sustainable development and ecological integrity.'}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                {companyProfile?.title ?? 'Company Profile'}
              </h2>
              <p className="text-foreground/70 leading-relaxed text-lg">
                {companyProfile?.body ??
                  'MNS Suarez Environmental Studies Consultants provides technical environmental study and compliance support for public and private development projects.'}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Certifications certifications={certifications} />
    </div>
  )
}
