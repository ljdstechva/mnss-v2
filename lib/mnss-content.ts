import { createSupabaseServerClient } from '@/lib/supabase/server'
import type {
  MnssCertification,
  MnssHeroSection,
  MnssProject,
  MnssSiteInformation,
} from '@/types/database'
import { fallbackHero, fallbackProjects, fallbackSiteInformation } from '@/lib/mnss-fallbacks'

export type MnssPublicContent = {
  hero: MnssHeroSection
  siteInformation: MnssSiteInformation[]
  projects: MnssProject[]
  certifications: MnssCertification[]
}

export async function getMnssPublicContent(): Promise<MnssPublicContent> {
  try {
    const supabase = await createSupabaseServerClient()
    const [heroResult, siteInfoResult, projectsResult, certificationsResult] = await Promise.all([
      supabase
        .from('mnss_hero_sections')
        .select('*')
        .eq('slug', 'home')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(1),
      supabase
        .from('mnss_site_information')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
      supabase
        .from('mnss_projects')
        .select('*')
        .eq('is_active', true)
        .neq('status', 'archived')
        .order('sort_order', { ascending: true }),
      supabase
        .from('mnss_certifications')
        .select('*')
        .eq('is_active', true)
        .neq('status', 'archived')
        .order('sort_order', { ascending: true }),
    ])

    return {
      hero: heroResult.error ? fallbackHero : heroResult.data?.[0] ?? fallbackHero,
      siteInformation: siteInfoResult.error
        ? fallbackSiteInformation
        : siteInfoResult.data ?? [],
      projects: projectsResult.error ? fallbackProjects : projectsResult.data ?? [],
      certifications: certificationsResult.error ? [] : certificationsResult.data ?? [],
    }
  } catch {
    return {
      hero: fallbackHero,
      siteInformation: fallbackSiteInformation,
      projects: fallbackProjects,
      certifications: [],
    }
  }
}

export function getSiteInformationByKey(
  siteInformation: MnssSiteInformation[],
  sectionKey: string
) {
  return siteInformation.find((item) => item.section_key === sectionKey) ?? null
}
