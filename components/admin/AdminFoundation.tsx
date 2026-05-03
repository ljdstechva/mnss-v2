import Image from 'next/image'
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  FileText,
  Folder,
  ImageIcon,
  LockKeyhole,
  Settings,
  ShieldCheck,
} from 'lucide-react'

type LoginAction = (formData: FormData) => void | Promise<void>

type AdminFoundationProps = {
  loginAction?: LoginAction
  errorMessage?: string
  nextPath?: string
}

const workspaceAreas = [
  {
    title: 'Hero copy',
    description: 'Homepage headline, supporting message, and primary calls to action.',
    icon: FileText,
    fields: ['Headline', 'Subcopy', 'CTA labels'],
  },
  {
    title: 'Site information',
    description: 'Company profile, mission details, service summaries, and contact basics.',
    icon: Building2,
    fields: ['About copy', 'Services', 'Contact data'],
  },
  {
    title: 'Project portfolios',
    description: 'Featured environmental studies, project categories, and case summaries.',
    icon: Folder,
    fields: ['Project title', 'Scope', 'Location'],
  },
  {
    title: 'Certifications',
    description: 'Accreditations, compliance records, and supporting certificate metadata.',
    icon: Award,
    fields: ['Certificate', 'Issuer', 'Validity'],
  },
]

const publishingSteps = [
  'Draft updates in the relevant content area.',
  'Review copy, images, and compliance notes before publish.',
  'Send approved changes into the public site modules.',
]

const readinessItems = [
  'Server Action login slot',
  'Supabase SSR-compatible form shape',
  'No client-side secrets or auth imports',
]

export default function AdminFoundation({
  loginAction,
  errorMessage,
  nextPath = '/admin',
}: AdminFoundationProps) {
  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Manage the MNS site from a focused editorial workspace.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/65">
            A lightweight admin foundation for homepage messaging, company information,
            project portfolios, and certification records.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['4', 'content areas'],
              ['0', 'new dependencies'],
              ['1', 'auth-ready entry'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-primary/10 bg-white/60 p-5 shadow-[0_24px_80px_rgba(27,67,50,0.08)] dark:bg-white/5"
              >
                <p className="text-3xl font-black text-primary">{value}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/45">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <AdminLoginPanel
          loginAction={loginAction}
          errorMessage={errorMessage}
          nextPath={nextPath}
        />
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-6" aria-labelledby="admin-workspace-areas">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="admin-workspace-areas" className="text-3xl font-bold text-primary">
              Workspace areas
            </h2>
            <p className="mt-3 max-w-2xl text-foreground/60">
              Each area is separated so future data sources, forms, and approval rules can be
              added without reshaping the route.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <Settings size={16} aria-hidden="true" />
            Content modules prepared
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {workspaceAreas.map((area) => {
            const Icon = area.icon

            return (
              <article
                key={area.title}
                className="rounded-3xl border border-primary/10 bg-white/70 p-6 shadow-[0_20px_70px_rgba(27,67,50,0.06)] transition-transform hover:-translate-y-1 dark:bg-white/5"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-primary">{area.title}</h3>
                <p className="mt-3 min-h-20 text-sm leading-relaxed text-foreground/60">
                  {area.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {area.fields.map((field) => (
                    <li key={field} className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                      <CheckCircle2 size={16} className="text-secondary" aria-hidden="true" />
                      {field}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-5 px-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-primary/10 bg-primary p-8 text-white">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <ImageIcon size={24} aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold">Publishing flow</h2>
          <ol className="mt-6 space-y-4">
            {publishingSteps.map((step, index) => (
              <li key={step} className="flex gap-4 text-white/80">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-black text-primary">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-3xl border border-primary/10 bg-white/70 p-8 dark:bg-white/5">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-primary">
            <ShieldCheck size={24} aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-primary">Auth integration posture</h2>
          <p className="mt-4 text-foreground/60">
            The login panel accepts a server-side form action when authentication is ready, so a
            Supabase SSR client can be connected later without changing the page structure.
          </p>
          <ul className="mt-6 space-y-3">
            {readinessItems.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-semibold text-foreground/70">
                <LockKeyhole size={16} className="text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

function AdminLoginPanel({ loginAction, errorMessage, nextPath }: AdminFoundationProps) {
  const authReady = Boolean(loginAction)

  return (
    <aside className="rounded-[2rem] border border-primary/10 bg-white/80 p-7 shadow-[0_30px_90px_rgba(27,67,50,0.14)] backdrop-blur dark:bg-white/10">
      <div className="mb-8 flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-background">
          <Image src="/images/mnss-logo.png" alt="MNS logo" fill className="object-contain p-1.5" />
        </div>
        <div>
          <p className="text-lg font-black text-primary">MNS Admin</p>
          <p className="text-sm text-foreground/55">Private site management</p>
        </div>
      </div>

      <form action={loginAction} aria-describedby="admin-login-status" className="space-y-5">
        <input type="hidden" name="next" value={nextPath ?? '/admin'} />
        <label className="block">
          <span className="text-sm font-bold text-primary">Email address</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            disabled={!authReady}
            required={authReady}
            placeholder="admin@mnsconsultants.com"
            className="mt-2 w-full rounded-2xl border border-primary/10 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-primary">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            disabled={!authReady}
            required={authReady}
            placeholder="Enter password"
            className="mt-2 w-full rounded-2xl border border-primary/10 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        <button
          type={authReady ? 'submit' : 'button'}
          disabled={!authReady}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-white transition hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-primary/50"
        >
          {authReady ? 'Sign in to admin' : 'Auth setup pending'}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>

      {errorMessage ? (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {errorMessage}
        </p>
      ) : null}

      <p id="admin-login-status" className="mt-6 border-t border-primary/10 pt-5 text-sm leading-relaxed text-foreground/55">
        {authReady
          ? 'Authentication uses Supabase Auth users and stores no client-side secrets.'
          : 'Ready for a server-side auth action; this page does not embed client secrets or import auth helpers until they are available.'}
      </p>
    </aside>
  )
}
