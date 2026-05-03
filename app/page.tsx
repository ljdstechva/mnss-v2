import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Projects from '@/components/sections/Projects'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'
import { getMnssPublicContent, getSiteInformationByKey } from '@/lib/mnss-content'

export const revalidate = 0

export default async function Home() {
  const { hero, siteInformation, projects, certifications } = await getMnssPublicContent()
  const featuredProjects = projects.filter((project) => project.is_featured).slice(0, 4)

  return (
    <>
      <Hero hero={hero} />
      <About siteInformation={siteInformation} />
      <Services serviceOverview={getSiteInformationByKey(siteInformation, 'services_overview')} />
      <Projects projects={featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4)} />
      <Certifications certifications={certifications} />
      <Contact />
    </>
  )
}
