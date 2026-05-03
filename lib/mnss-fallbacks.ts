import type { MnssHeroSection, MnssProject, MnssSiteInformation } from '@/types/database'

const fallbackDate = '1970-01-01T00:00:00.000Z'

export const fallbackHero: MnssHeroSection = {
  id: 'fallback-home-hero',
  slug: 'home',
  eyebrow: 'Environmental Studies Consultants',
  headline: 'Environmental compliance guidance for responsible project development.',
  highlighted_text: 'responsible project development',
  body: 'MNS Suarez Environmental Studies Consultants supports environmental impact assessment, ECC documentation, compliance planning, and public consultation work for projects in the Philippines.',
  primary_cta_label: 'Request consultation',
  primary_cta_href: '/#contact',
  secondary_cta_label: 'View projects',
  secondary_cta_href: '/projects',
  image_url:
    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop',
  sort_order: 0,
  is_active: true,
  metadata: {},
  created_at: fallbackDate,
  updated_at: fallbackDate,
}

export const fallbackSiteInformation: MnssSiteInformation[] = [
  {
    id: 'fallback-company-profile',
    section_key: 'company_profile',
    title: 'Company profile',
    body: 'MNS Suarez Environmental Studies Consultants provides technical environmental study and compliance support for public and private development projects.',
    sort_order: 0,
    is_active: true,
    metadata: {},
    created_at: fallbackDate,
    updated_at: fallbackDate,
  },
  {
    id: 'fallback-mission',
    section_key: 'mission',
    title: 'Mission',
    body: 'Deliver practical, science-based environmental guidance that helps projects meet regulatory requirements while reducing ecological impact.',
    sort_order: 1,
    is_active: true,
    metadata: {},
    created_at: fallbackDate,
    updated_at: fallbackDate,
  },
  {
    id: 'fallback-services-overview',
    section_key: 'services_overview',
    title: 'Services overview',
    body: 'Core services include EIS preparation, EPRMP and PEPRMP support, IEE checklist assistance, ECC approval support, environmental auditing, and sustainability planning.',
    sort_order: 2,
    is_active: true,
    metadata: {},
    created_at: fallbackDate,
    updated_at: fallbackDate,
  },
]

export const fallbackProjects: MnssProject[] = [
  {
    id: 'fallback-gas-turbine',
    title: '56 MW Gas Turbine Power Plant',
    slug: '56-mw-gas-turbine-power-plant',
    category: 'EIA / compliance documentation',
    summary:
      'Environmental documentation for a gas turbine power plant project in Zamboanga City. Details should be reviewed against the final approved public record before publication.',
    client_name: 'Malita Power Inc. / San Miguel Consolidated Power Corporation',
    location: 'Zamboanga City',
    service_type: 'EIA preparation support',
    project_year: null,
    capacity: null,
    status: 'review',
    source_url: null,
    image_url:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
    is_featured: true,
    sort_order: 0,
    is_active: true,
    metadata: {},
    created_at: fallbackDate,
    updated_at: fallbackDate,
  },
  {
    id: 'fallback-petroleum-terminal',
    title: 'HPH Petroleum Terminal',
    slug: 'hph-petroleum-terminal',
    category: 'EIS / public scoping',
    summary:
      'Environmental reporting and public scoping support for a petroleum terminal project. Capacity figures require owner confirmation before final publishing.',
    client_name: 'HPH Petroleum (Philippines) Inc.',
    location: 'Sta. Cruz, Davao del Sur',
    service_type: 'EIS and public scoping support',
    project_year: null,
    capacity: null,
    status: 'review',
    source_url: null,
    image_url:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2070&auto=format&fit=crop',
    is_featured: true,
    sort_order: 1,
    is_active: true,
    metadata: {},
    created_at: fallbackDate,
    updated_at: fallbackDate,
  },
]
