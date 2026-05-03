'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type HeroInsert = Database['public']['Tables']['mnss_hero_sections']['Insert']
type SiteInfoInsert = Database['public']['Tables']['mnss_site_information']['Insert']
type ProjectInsert = Database['public']['Tables']['mnss_projects']['Insert']
type CertificationInsert = Database['public']['Tables']['mnss_certifications']['Insert']

const ADMIN_PATH = '/admin'
const LOGIN_PATH = '/admin/login'
const ADMIN_SCHEMA_SETUP_MESSAGE =
  'MNSS database setup is not installed yet. Reconnect the Supabase connector in Codex or run npm run setup:mnss-supabase with SUPABASE_ACCESS_TOKEN, then reload /admin.'

export async function loginAdmin(formData: FormData) {
  const email = getRequiredString(formData, 'email')
  const password = getRequiredString(formData, 'password')
  const nextPath = normalizeAdminPath(getString(formData, 'next')) ?? ADMIN_PATH
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`${LOGIN_PATH}?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(nextPath)}`)
  }

  redirect(nextPath)
}

export async function logoutAdmin() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect(LOGIN_PATH)
}

export async function createFirstAdmin() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user || !user.email) {
    redirect(LOGIN_PATH)
  }

  const { data: hasActiveAdmin, error: setupError } = await supabase.rpc('mnss_has_active_admin')

  if (setupError) {
    redirect(`${ADMIN_PATH}?error=${encodeURIComponent(formatAdminError(setupError.message))}`)
  }

  if (hasActiveAdmin) {
    redirect(`${ADMIN_PATH}?error=${encodeURIComponent('An MNSS admin already exists.')}`)
  }

  const { error } = await supabase.from('mnss_admin_users').insert({
    user_id: user.id,
    email: user.email,
    role: 'owner',
    is_active: true,
  })

  handleMutationResult(error)
}

export async function saveHeroSection(formData: FormData) {
  const supabase = await requireAdmin()
  const id = getString(formData, 'id')
  const slug = slugify(getString(formData, 'slug') || 'home')
  const headline = getRequiredString(formData, 'headline')
  const payload: HeroInsert = {
    slug,
    eyebrow: getString(formData, 'eyebrow'),
    headline,
    highlighted_text: getString(formData, 'highlighted_text'),
    body: getString(formData, 'body'),
    primary_cta_label: getString(formData, 'primary_cta_label'),
    primary_cta_href: getString(formData, 'primary_cta_href'),
    secondary_cta_label: getString(formData, 'secondary_cta_label'),
    secondary_cta_href: getString(formData, 'secondary_cta_href'),
    image_url: getString(formData, 'image_url'),
    sort_order: getNumber(formData, 'sort_order') ?? 0,
    is_active: getCheckbox(formData, 'is_active'),
  }

  const { error } = id
    ? await supabase.from('mnss_hero_sections').update(payload).eq('id', id)
    : await supabase.from('mnss_hero_sections').insert(payload)

  handleMutationResult(error)
}

export async function saveSiteInformation(formData: FormData) {
  const supabase = await requireAdmin()
  const id = getString(formData, 'id')
  const title = getRequiredString(formData, 'title')
  const sectionKey = slugify(getString(formData, 'section_key') || title).replaceAll('-', '_')
  const payload: SiteInfoInsert = {
    section_key: sectionKey,
    title,
    body: getString(formData, 'body'),
    sort_order: getNumber(formData, 'sort_order') ?? 0,
    is_active: getCheckbox(formData, 'is_active'),
  }

  const { error } = id
    ? await supabase.from('mnss_site_information').update(payload).eq('id', id)
    : await supabase.from('mnss_site_information').insert(payload)

  handleMutationResult(error)
}

export async function deleteSiteInformation(formData: FormData) {
  await deleteRow('mnss_site_information', formData)
}

export async function saveProject(formData: FormData) {
  const supabase = await requireAdmin()
  const id = getString(formData, 'id')
  const title = getRequiredString(formData, 'title')
  const payload: ProjectInsert = {
    title,
    slug: slugify(getString(formData, 'slug') || title),
    category: getString(formData, 'category'),
    summary: getString(formData, 'summary'),
    client_name: getString(formData, 'client_name'),
    location: getString(formData, 'location'),
    service_type: getString(formData, 'service_type'),
    project_year: getNumber(formData, 'project_year'),
    capacity: getString(formData, 'capacity'),
    status: getProjectStatus(formData),
    source_url: getString(formData, 'source_url'),
    image_url: getString(formData, 'image_url'),
    sort_order: getNumber(formData, 'sort_order') ?? 0,
    is_featured: getCheckbox(formData, 'is_featured'),
    is_active: getCheckbox(formData, 'is_active'),
  }

  const { error } = id
    ? await supabase.from('mnss_projects').update(payload).eq('id', id)
    : await supabase.from('mnss_projects').insert(payload)

  handleMutationResult(error)
}

export async function deleteProject(formData: FormData) {
  await deleteRow('mnss_projects', formData)
}

export async function saveCertification(formData: FormData) {
  const supabase = await requireAdmin()
  const id = getString(formData, 'id')
  const payload: CertificationInsert = {
    title: getRequiredString(formData, 'title'),
    issuer: getString(formData, 'issuer'),
    credential_holder: getString(formData, 'credential_holder'),
    credential_id: getString(formData, 'credential_id'),
    issue_date: getString(formData, 'issue_date'),
    expiry_date: getString(formData, 'expiry_date'),
    status: getCertificationStatus(formData),
    document_url: getString(formData, 'document_url'),
    image_url: getString(formData, 'image_url'),
    sort_order: getNumber(formData, 'sort_order') ?? 0,
    is_active: getCheckbox(formData, 'is_active'),
  }

  const { error } = id
    ? await supabase.from('mnss_certifications').update(payload).eq('id', id)
    : await supabase.from('mnss_certifications').insert(payload)

  handleMutationResult(error)
}

export async function deleteCertification(formData: FormData) {
  await deleteRow('mnss_certifications', formData)
}

async function deleteRow(
  table: 'mnss_site_information' | 'mnss_projects' | 'mnss_certifications',
  formData: FormData
) {
  const supabase = await requireAdmin()
  const id = getRequiredString(formData, 'id')
  const { error } = await supabase.from(table).delete().eq('id', id)
  handleMutationResult(error)
}

async function requireAdmin() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect(LOGIN_PATH)
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('mnss_is_admin')

  if (adminError || !isAdmin) {
    redirect(
      `${ADMIN_PATH}?error=${encodeURIComponent(
        adminError ? formatAdminError(adminError.message) : 'Admin access is required.'
      )}`
    )
  }

  return supabase
}

function handleMutationResult(error: { message: string } | null) {
  if (error) {
    redirect(`${ADMIN_PATH}?error=${encodeURIComponent(formatAdminError(error.message))}`)
  }

  revalidatePath(ADMIN_PATH)
  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/services')
  revalidatePath('/projects')
  revalidatePath('/contact')
  redirect(ADMIN_PATH)
}

function getRequiredString(formData: FormData, key: string) {
  const value = getString(formData, key)

  if (!value) {
    redirect(`${ADMIN_PATH}?error=${encodeURIComponent(`${key} is required`)}`)
  }

  return value
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function getNumber(formData: FormData, key: string) {
  const value = getString(formData, key)

  if (!value) {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function getCheckbox(formData: FormData, key: string) {
  return formData.get(key) === 'on'
}

function getProjectStatus(formData: FormData): ProjectInsert['status'] {
  const value = getString(formData, 'status')

  if (value === 'draft' || value === 'review' || value === 'published' || value === 'archived') {
    return value
  }

  return 'draft'
}

function getCertificationStatus(formData: FormData): CertificationInsert['status'] {
  const value = getString(formData, 'status')

  if (value === 'active' || value === 'expired' || value === 'pending' || value === 'archived') {
    return value
  }

  return 'active'
}

function normalizeAdminPath(value: string | null) {
  if (!value || !value.startsWith('/admin') || value.startsWith('/admin/login')) {
    return null
  }

  return value
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'entry'
}

function formatAdminError(message: string) {
  return isMissingMnssSchemaError(message) ? ADMIN_SCHEMA_SETUP_MESSAGE : message
}

function isMissingMnssSchemaError(message: string) {
  const lowerMessage = message.toLowerCase()

  return (
    lowerMessage.includes('schema cache') ||
    lowerMessage.includes('could not find the function') ||
    lowerMessage.includes('could not find the table') ||
    lowerMessage.includes('mnss_is_admin') ||
    lowerMessage.includes('mnss_has_active_admin')
  )
}
