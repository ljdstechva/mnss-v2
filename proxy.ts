import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
          Object.entries(headers ?? {}).forEach(([key, value]) => {
            if (key.toLowerCase() !== 'set-cookie') {
              supabaseResponse.headers.set(key, value)
            }
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  if (!user && pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin/login'
    redirectUrl.searchParams.set('next', pathname)
    return withSupabaseSession(NextResponse.redirect(redirectUrl), supabaseResponse)
  }

  if (user && pathname.startsWith('/admin/login')) {
    return withSupabaseSession(NextResponse.redirect(new URL('/admin', request.url)), supabaseResponse)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*'],
}

function withSupabaseSession(response: NextResponse, supabaseResponse: NextResponse) {
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie)
  })

  supabaseResponse.headers.forEach((value, key) => {
    const normalizedKey = key.toLowerCase()

    if (normalizedKey !== 'location' && normalizedKey !== 'set-cookie') {
      response.headers.set(key, value)
    }
  })

  return response
}
