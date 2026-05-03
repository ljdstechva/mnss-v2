import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AdminDashboard, {
  AdminDeniedState,
  AdminSetupState,
} from '@/components/admin/AdminDashboard'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const ADMIN_SCHEMA_SETUP_MESSAGE =
  'MNSS database setup is not installed yet. Reconnect the Supabase connector in Codex or run npm run setup:mnss-supabase with SUPABASE_ACCESS_TOKEN, then reload this page.'

export const metadata: Metadata = {
  title: 'Admin | MNS Suarez Environmental Studies Consultants',
  description: 'Private administration workspace for managing MNS site content.',
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/admin/login')
  }

  const query = await searchParams
  const queryError = typeof query.error === 'string' ? query.error : undefined
  const querySetupError = getAdminSetupMessage(queryError)
  const [{ data: isAdmin, error: adminCheckError }, { data: hasActiveAdmin, error: setupCheckError }] =
    await Promise.all([supabase.rpc('mnss_is_admin'), supabase.rpc('mnss_has_active_admin')])

  if (adminCheckError || setupCheckError) {
    const setupError = getAdminSetupMessage(adminCheckError?.message, setupCheckError?.message)

    return (
      <AdminSetupState
        userEmail={user.email ?? 'authenticated user'}
        error={setupError ?? adminCheckError?.message ?? setupCheckError?.message ?? querySetupError ?? queryError}
        canCreateAdmin={!setupError}
      />
    )
  }

  if (!isAdmin) {
    if (!hasActiveAdmin) {
      return (
        <AdminSetupState
          userEmail={user.email ?? 'authenticated user'}
          error={querySetupError ?? queryError}
          canCreateAdmin={!querySetupError}
        />
      )
    }

    return <AdminDeniedState userEmail={user.email ?? 'authenticated user'} error={querySetupError ?? queryError} />
  }

  const [heroResult, siteInfoResult, projectsResult, certificationsResult] = await Promise.all([
    supabase.from('mnss_hero_sections').select('*').order('sort_order', { ascending: true }),
    supabase.from('mnss_site_information').select('*').order('sort_order', { ascending: true }),
    supabase.from('mnss_projects').select('*').order('sort_order', { ascending: true }),
    supabase.from('mnss_certifications').select('*').order('sort_order', { ascending: true }),
  ])

  const errors = [
    heroResult.error ? `mnss_hero_sections: ${heroResult.error.message}` : null,
    siteInfoResult.error ? `mnss_site_information: ${siteInfoResult.error.message}` : null,
    projectsResult.error ? `mnss_projects: ${projectsResult.error.message}` : null,
    certificationsResult.error ? `mnss_certifications: ${certificationsResult.error.message}` : null,
    queryError ?? null,
  ].filter((error): error is string => Boolean(error))

  return (
    <AdminDashboard
      userEmail={user.email ?? 'authenticated user'}
      heroSections={heroResult.data ?? []}
      siteInformation={siteInfoResult.data ?? []}
      projects={projectsResult.data ?? []}
      certifications={certificationsResult.data ?? []}
      errors={errors}
    />
  )
}

function getAdminSetupMessage(...messages: Array<string | undefined>) {
  return messages.some((message) => {
    const lowerMessage = message?.toLowerCase() ?? ''

    return (
      lowerMessage.includes('schema cache') ||
      lowerMessage.includes('could not find the function') ||
      lowerMessage.includes('could not find the table') ||
      lowerMessage.includes('mnss_is_admin') ||
      lowerMessage.includes('mnss_has_active_admin')
    )
  })
    ? ADMIN_SCHEMA_SETUP_MESSAGE
    : null
}
