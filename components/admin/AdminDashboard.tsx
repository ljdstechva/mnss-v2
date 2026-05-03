import type { ReactNode } from 'react'
import { Award, Database, FileText, Folder, LogOut, Plus, Save, Trash2 } from 'lucide-react'
import {
  createFirstAdmin,
  deleteCertification,
  deleteProject,
  deleteSiteInformation,
  logoutAdmin,
  saveCertification,
  saveHeroSection,
  saveProject,
  saveSiteInformation,
} from '@/app/admin/actions'
import type {
  MnssCertification,
  MnssHeroSection,
  MnssProject,
  MnssSiteInformation,
} from '@/types/database'

type AdminDashboardProps = {
  userEmail: string
  heroSections: MnssHeroSection[]
  siteInformation: MnssSiteInformation[]
  projects: MnssProject[]
  certifications: MnssCertification[]
  errors: string[]
  statusMessage?: string
}

const panelClass = 'rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(27,67,50,0.08)] dark:bg-white/5'
const fieldClass = 'mt-2 w-full rounded-2xl border border-primary/10 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-4 focus:ring-primary/10'
const labelClass = 'block text-sm font-bold text-primary'

export default function AdminDashboard({
  userEmail,
  heroSections,
  siteInformation,
  projects,
  certifications,
  errors,
  statusMessage,
}: AdminDashboardProps) {
  const primaryHero = heroSections[0]

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="flex flex-col gap-6 border-b border-primary/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary/60">
              MNS Admin
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Manage site content and portfolio records.
            </h1>
            <p className="mt-4 max-w-2xl text-foreground/60">
              Signed in as <span className="font-semibold text-primary">{userEmail}</span>. All
              forms write only to tables prefixed with <code className="font-mono">mnss_</code>.
            </p>
          </div>

          <form action={logoutAdmin}>
            <button className="inline-flex items-center gap-2 rounded-full border border-primary/15 px-5 py-3 text-sm font-black text-primary transition hover:bg-primary hover:text-white">
              <LogOut size={18} aria-hidden="true" />
              Sign out
            </button>
          </form>
        </header>

        {statusMessage ? (
          <div className="mt-6 rounded-2xl border border-secondary/30 bg-secondary/10 p-4 text-sm font-semibold text-primary">
            {statusMessage}
          </div>
        ) : null}

        {errors.length > 0 ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">
            <p className="font-bold">Admin data setup needs attention</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <section className="mt-10 grid gap-5 md:grid-cols-4">
          <Metric label="Hero entries" value={heroSections.length} icon={<FileText size={20} />} />
          <Metric label="Info blocks" value={siteInformation.length} icon={<Database size={20} />} />
          <Metric label="Projects" value={projects.length} icon={<Folder size={20} />} />
          <Metric label="Certifications" value={certifications.length} icon={<Award size={20} />} />
        </section>

        <section className="mt-8 grid gap-3 md:grid-cols-4" aria-label="Admin quick actions">
          <QuickAction href="#hero-editor-title" icon={<FileText size={18} />} label="Edit homepage hero" />
          <QuickAction href="#new-info-block" icon={<Database size={18} />} label="Add site information" />
          <QuickAction href="#new-project" icon={<Folder size={18} />} label="Add project portfolio" />
          <QuickAction href="#new-certification" icon={<Award size={18} />} label="Add certification" />
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[420px_1fr]" aria-labelledby="hero-editor-title">
          <div>
            <h2 id="hero-editor-title" className="text-2xl font-bold text-primary">
              Homepage hero
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60">
              Update the primary homepage content. The seeded copy is intentionally marked for owner
              review before public use.
            </p>
          </div>
          <HeroForm hero={primaryHero} />
        </section>

        <section className="mt-16" aria-labelledby="site-info-title">
          <SectionHeader
            id="site-info-title"
            title="Site information"
            description="Company profile, mission, service overview, and reusable information blocks."
          />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <SiteInformationForm formId="new-info-block" />
            {siteInformation.map((item) => (
              <SiteInformationForm key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="projects-title">
          <SectionHeader
            id="projects-title"
            title="Project portfolios"
            description="Create, update, publish, archive, and remove project records."
          />
          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            <ProjectForm formId="new-project" />
            {projects.map((project) => (
              <ProjectForm key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="certifications-title">
          <SectionHeader
            id="certifications-title"
            title="Certifications"
            description="Track accreditations, issuers, validity dates, documents, and public visibility."
          />
          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            <CertificationForm formId="new-certification" />
            {certifications.map((certification) => (
              <CertificationForm key={certification.id} certification={certification} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function QuickAction({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/12 bg-white/80 px-4 py-3 text-sm font-black text-primary shadow-sm transition hover:bg-primary hover:text-white dark:bg-white/5"
    >
      {icon}
      {label}
    </a>
  )
}

function Metric({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className={panelClass}>
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="text-3xl font-black text-primary">{value}</p>
      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/45">
        {label}
      </p>
    </div>
  )
}

function SectionHeader({
  id,
  title,
  description,
}: {
  id: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 id={id} className="text-2xl font-bold text-primary md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/60">
          {description}
        </p>
      </div>
    </div>
  )
}

function HeroForm({ hero }: { hero?: MnssHeroSection }) {
  return (
    <form action={saveHeroSection} className={panelClass}>
      <FormTitle icon={<FileText size={20} />} title={hero ? 'Edit hero' : 'Create hero'} />
      <HiddenId id={hero?.id} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="slug" label="Slug" defaultValue={hero?.slug ?? 'home'} required />
        <Field name="eyebrow" label="Small label" defaultValue={hero?.eyebrow} />
      </div>
      <Field name="headline" label="Headline" defaultValue={hero?.headline} required />
      <Field name="highlighted_text" label="Highlighted text" defaultValue={hero?.highlighted_text} />
      <TextArea name="body" label="Body copy" defaultValue={hero?.body} rows={4} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="primary_cta_label" label="Primary CTA label" defaultValue={hero?.primary_cta_label} />
        <Field name="primary_cta_href" label="Primary CTA href" defaultValue={hero?.primary_cta_href} />
        <Field name="secondary_cta_label" label="Secondary CTA label" defaultValue={hero?.secondary_cta_label} />
        <Field name="secondary_cta_href" label="Secondary CTA href" defaultValue={hero?.secondary_cta_href} />
      </div>
      <Field name="image_url" label="Image URL" defaultValue={hero?.image_url} />
      <FormFooter isActive={hero?.is_active ?? true} sortOrder={hero?.sort_order ?? 0} />
    </form>
  )
}

function SiteInformationForm({
  item,
  formId,
}: {
  item?: MnssSiteInformation
  formId?: string
}) {
  return (
    <form id={formId} action={saveSiteInformation} className={panelClass}>
      <FormTitle
        icon={<Database size={20} />}
        title={item ? item.title : 'Add new site information block'}
      />
      <HiddenId id={item?.id} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="section_key" label="Section key" defaultValue={item?.section_key} required />
        <Field name="title" label="Title" defaultValue={item?.title} required />
      </div>
      <TextArea name="body" label="Body" defaultValue={item?.body} rows={5} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FormFooter isActive={item?.is_active ?? true} sortOrder={item?.sort_order ?? 0} />
        {item ? <DeleteButton action={deleteSiteInformation} label="Delete block" /> : null}
      </div>
    </form>
  )
}

function ProjectForm({ project, formId }: { project?: MnssProject; formId?: string }) {
  return (
    <form id={formId} action={saveProject} className={panelClass}>
      <FormTitle
        icon={<Folder size={20} />}
        title={project ? project.title : 'Add new project portfolio'}
      />
      <HiddenId id={project?.id} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="title" label="Title" defaultValue={project?.title} required />
        <Field name="slug" label="Slug" defaultValue={project?.slug} />
        <Field name="category" label="Category" defaultValue={project?.category} />
        <Field name="client_name" label="Client name" defaultValue={project?.client_name} />
        <Field name="location" label="Location" defaultValue={project?.location} />
        <Field name="service_type" label="Service type" defaultValue={project?.service_type} />
        <Field name="project_year" label="Year" type="number" defaultValue={project?.project_year?.toString()} />
        <Field name="capacity" label="Capacity" defaultValue={project?.capacity} />
      </div>
      <TextArea name="summary" label="Summary" defaultValue={project?.summary} rows={4} />
      <div className="grid gap-4 md:grid-cols-2">
        <Select
          name="status"
          label="Status"
          defaultValue={project?.status ?? 'draft'}
          options={['draft', 'review', 'published', 'archived']}
        />
        <Field name="source_url" label="Source URL" defaultValue={project?.source_url} />
      </div>
      <Field name="image_url" label="Image URL" defaultValue={project?.image_url} />
      <div className="flex flex-wrap items-center gap-5 pt-2">
        <Checkbox name="is_featured" label="Featured" defaultChecked={project?.is_featured ?? false} />
        <Checkbox name="is_active" label="Visible" defaultChecked={project?.is_active ?? true} />
        <Field
          name="sort_order"
          label="Sort"
          type="number"
          defaultValue={(project?.sort_order ?? 0).toString()}
          compact
        />
      </div>
      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <SaveButton label={project ? 'Save project' : 'Create project portfolio'} />
        {project ? <DeleteButton action={deleteProject} label="Delete project" /> : null}
      </div>
    </form>
  )
}

function CertificationForm({
  certification,
  formId,
}: {
  certification?: MnssCertification
  formId?: string
}) {
  return (
    <form id={formId} action={saveCertification} className={panelClass}>
      <FormTitle
        icon={<Award size={20} />}
        title={certification ? certification.title : 'Add new certification'}
      />
      <HiddenId id={certification?.id} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="title" label="Title" defaultValue={certification?.title} required />
        <Field name="issuer" label="Issuer" defaultValue={certification?.issuer} />
        <Field
          name="credential_holder"
          label="Credential holder"
          defaultValue={certification?.credential_holder}
        />
        <Field name="credential_id" label="Credential ID" defaultValue={certification?.credential_id} />
        <Field name="issue_date" label="Issue date" type="date" defaultValue={certification?.issue_date} />
        <Field name="expiry_date" label="Expiry date" type="date" defaultValue={certification?.expiry_date} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Select
          name="status"
          label="Status"
          defaultValue={certification?.status ?? 'active'}
          options={['active', 'expired', 'pending', 'archived']}
        />
        <Field name="document_url" label="Document URL" defaultValue={certification?.document_url} />
      </div>
      <Field name="image_url" label="Image URL" defaultValue={certification?.image_url} />
      <div className="flex flex-wrap items-center gap-5 pt-2">
        <Checkbox name="is_active" label="Visible" defaultChecked={certification?.is_active ?? true} />
        <Field
          name="sort_order"
          label="Sort"
          type="number"
          defaultValue={(certification?.sort_order ?? 0).toString()}
          compact
        />
      </div>
      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <SaveButton label={certification ? 'Save certification' : 'Create certification record'} />
        {certification ? (
          <DeleteButton action={deleteCertification} label="Delete certification" />
        ) : null}
      </div>
    </form>
  )
}

function FormTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-primary">{title}</h3>
    </div>
  )
}

function HiddenId({ id }: { id?: string }) {
  return id ? <input type="hidden" name="id" value={id} /> : null
}

function Field({
  name,
  label,
  defaultValue,
  type = 'text',
  required,
  compact,
}: {
  name: string
  label: string
  defaultValue?: string | null
  type?: string
  required?: boolean
  compact?: boolean
}) {
  return (
    <label className={compact ? 'block w-28' : 'block'}>
      <span className={labelClass}>{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ''}
        required={required}
        className={fieldClass}
      />
    </label>
  )
}

function TextArea({
  name,
  label,
  defaultValue,
  rows,
}: {
  name: string
  label: string
  defaultValue?: string | null
  rows: number
}) {
  return (
    <label className="mt-4 block">
      <span className={labelClass}>{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ''}
        className={`${fieldClass} resize-y`}
      />
    </label>
  )
}

function Select({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string
  label: string
  defaultValue: string
  options: string[]
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <select name={name} defaultValue={defaultValue} className={fieldClass}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string
  label: string
  defaultChecked: boolean
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm font-bold text-primary">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-primary/20 accent-primary"
      />
      {label}
    </label>
  )
}

function FormFooter({ isActive, sortOrder }: { isActive: boolean; sortOrder: number }) {
  return (
    <div className="flex flex-wrap items-center gap-5 pt-4">
      <Checkbox name="is_active" label="Visible" defaultChecked={isActive} />
      <Field name="sort_order" label="Sort" type="number" defaultValue={sortOrder.toString()} compact />
      <SaveButton label="Save changes" />
    </div>
  )
}

function SaveButton({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-black text-white transition hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20">
      <Save size={17} aria-hidden="true" />
      {label}
    </button>
  )
}

function DeleteButton({
  action,
  label,
}: {
  action: (formData: FormData) => void | Promise<void>
  label: string
}) {
  return (
    <button
      formAction={action}
      formNoValidate
      className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-black text-red-700 transition hover:bg-red-50"
    >
      <Trash2 size={17} aria-hidden="true" />
      {label}
    </button>
  )
}

export function EmptyDatabaseState() {
  return (
    <div className={panelClass}>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Plus size={22} aria-hidden="true" />
      </div>
      <h2 className="text-2xl font-bold text-primary">MNSS tables are ready to connect</h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground/60">
        Apply the migration at <code className="font-mono">supabase/migrations/001_mnss_content_schema.sql</code>
        {' '}to create the required content tables when Supabase access is available.
      </p>
    </div>
  )
}

export function AdminSetupState({
  userEmail,
  error,
  canCreateAdmin = true,
}: {
  userEmail: string
  error?: string
  canCreateAdmin?: boolean
}) {
  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className={panelClass}>
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-primary">
            <Plus size={22} aria-hidden="true" />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary/55">
            First admin setup
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Create the first MNSS admin record.
          </h1>
          <p className="mt-5 text-foreground/65">
            You are signed in as <span className="font-semibold text-primary">{userEmail}</span>.
            This creates a row in <code className="font-mono">mnss_admin_users</code> and only
            works while there are no active MNSS admins.
          </p>
          {error ? (
            <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
              {error}
            </p>
          ) : null}
          <form action={createFirstAdmin} className="mt-8">
            <button
              disabled={!canCreateAdmin}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-white transition hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-primary/45"
            >
              <Save size={18} aria-hidden="true" />
              {canCreateAdmin ? 'Create first admin' : 'Schema setup required'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export function AdminDeniedState({ userEmail, error }: { userEmail: string; error?: string }) {
  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className={panelClass}>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary/55">
            Admin access required
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-5xl">
            This account is signed in but is not an MNSS admin.
          </h1>
          <p className="mt-5 text-foreground/65">
            Current account: <span className="font-semibold text-primary">{userEmail}</span>.
            Ask an existing MNSS admin to add this user in <code className="font-mono">mnss_admin_users</code>.
          </p>
          {error ? (
            <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
              {error}
            </p>
          ) : null}
          <form action={logoutAdmin} className="mt-8">
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 px-6 py-3 text-sm font-black text-primary transition hover:bg-primary hover:text-white">
              <LogOut size={18} aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
