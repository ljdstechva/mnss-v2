import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { loginAdmin } from '@/app/admin/actions'
import AdminFoundation from '@/components/admin/AdminFoundation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Admin Login | MNS Suarez Environmental Studies Consultants',
  description: 'Sign in to manage MNS site content.',
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[]; next?: string | string[] }>
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin')
  }

  const query = await searchParams
  const errorMessage = typeof query.error === 'string' ? query.error : undefined
  const nextPath = typeof query.next === 'string' ? query.next : '/admin'

  return (
    <AdminFoundation
      loginAction={loginAdmin}
      errorMessage={errorMessage}
      nextPath={nextPath.startsWith('/admin') ? nextPath : '/admin'}
    />
  )
}
