begin;

create table if not exists public.mnss_admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  email text not null,
  role text not null default 'admin',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mnss_admin_users_role_check check (role in ('owner', 'admin', 'editor'))
);

create table if not exists public.mnss_hero_sections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  eyebrow text,
  headline text not null,
  highlighted_text text,
  body text,
  primary_cta_label text,
  primary_cta_href text,
  secondary_cta_label text,
  secondary_cta_href text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mnss_site_information (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  title text not null,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mnss_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text,
  summary text,
  client_name text,
  location text,
  service_type text,
  project_year integer,
  capacity text,
  status text not null default 'draft',
  source_url text,
  image_url text,
  sort_order integer not null default 0,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mnss_projects_status_check check (status in ('draft', 'review', 'published', 'archived'))
);

create table if not exists public.mnss_certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  credential_holder text,
  credential_id text,
  issue_date date,
  expiry_date date,
  status text not null default 'active',
  document_url text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mnss_certifications_status_check check (status in ('active', 'expired', 'pending', 'archived'))
);

create or replace function public.mnss_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.mnss_has_active_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.mnss_admin_users
    where is_active = true
  );
$$;

create or replace function public.mnss_is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.mnss_admin_users
    where is_active = true
      and (
        user_id = auth.uid()
        or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
  );
$$;

grant execute on function public.mnss_has_active_admin() to anon, authenticated;
grant execute on function public.mnss_is_admin() to anon, authenticated;

drop trigger if exists mnss_admin_users_set_updated_at on public.mnss_admin_users;
create trigger mnss_admin_users_set_updated_at
before update on public.mnss_admin_users
for each row execute function public.mnss_set_updated_at();

drop trigger if exists mnss_hero_sections_set_updated_at on public.mnss_hero_sections;
create trigger mnss_hero_sections_set_updated_at
before update on public.mnss_hero_sections
for each row execute function public.mnss_set_updated_at();

drop trigger if exists mnss_site_information_set_updated_at on public.mnss_site_information;
create trigger mnss_site_information_set_updated_at
before update on public.mnss_site_information
for each row execute function public.mnss_set_updated_at();

drop trigger if exists mnss_projects_set_updated_at on public.mnss_projects;
create trigger mnss_projects_set_updated_at
before update on public.mnss_projects
for each row execute function public.mnss_set_updated_at();

drop trigger if exists mnss_certifications_set_updated_at on public.mnss_certifications;
create trigger mnss_certifications_set_updated_at
before update on public.mnss_certifications
for each row execute function public.mnss_set_updated_at();

create unique index if not exists mnss_admin_users_email_lower_idx on public.mnss_admin_users (lower(email));
create index if not exists mnss_admin_users_active_user_idx on public.mnss_admin_users (is_active, user_id);
create index if not exists mnss_hero_sections_active_sort_idx on public.mnss_hero_sections (is_active, sort_order);
create index if not exists mnss_site_information_active_sort_idx on public.mnss_site_information (is_active, sort_order);
create index if not exists mnss_projects_active_featured_sort_idx on public.mnss_projects (is_active, is_featured, sort_order);
create index if not exists mnss_certifications_active_sort_idx on public.mnss_certifications (is_active, sort_order);

alter table public.mnss_admin_users enable row level security;
alter table public.mnss_hero_sections enable row level security;
alter table public.mnss_site_information enable row level security;
alter table public.mnss_projects enable row level security;
alter table public.mnss_certifications enable row level security;

grant select on public.mnss_admin_users to authenticated;
grant select on public.mnss_hero_sections to anon, authenticated;
grant select on public.mnss_site_information to anon, authenticated;
grant select on public.mnss_projects to anon, authenticated;
grant select on public.mnss_certifications to anon, authenticated;
grant insert, update, delete on public.mnss_admin_users to authenticated;
grant insert, update, delete on public.mnss_hero_sections to authenticated;
grant insert, update, delete on public.mnss_site_information to authenticated;
grant insert, update, delete on public.mnss_projects to authenticated;
grant insert, update, delete on public.mnss_certifications to authenticated;

drop policy if exists mnss_admin_users_select_self_or_admin on public.mnss_admin_users;
drop policy if exists mnss_admin_users_bootstrap_first_admin on public.mnss_admin_users;
drop policy if exists mnss_admin_users_admin_manage on public.mnss_admin_users;
drop policy if exists mnss_hero_sections_public_read_active on public.mnss_hero_sections;
drop policy if exists mnss_hero_sections_authenticated_crud on public.mnss_hero_sections;
drop policy if exists mnss_site_information_public_read_active on public.mnss_site_information;
drop policy if exists mnss_site_information_authenticated_crud on public.mnss_site_information;
drop policy if exists mnss_projects_public_read_active on public.mnss_projects;
drop policy if exists mnss_projects_authenticated_crud on public.mnss_projects;
drop policy if exists mnss_certifications_public_read_active on public.mnss_certifications;
drop policy if exists mnss_certifications_authenticated_crud on public.mnss_certifications;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_admin_users' and policyname = 'mnss_admin_users_select_self_or_admin') then
    create policy mnss_admin_users_select_self_or_admin on public.mnss_admin_users
      for select to authenticated
      using (public.mnss_is_admin() or user_id = auth.uid() or lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_admin_users' and policyname = 'mnss_admin_users_bootstrap_first_admin') then
    create policy mnss_admin_users_bootstrap_first_admin on public.mnss_admin_users
      for insert to authenticated
      with check (
        public.mnss_has_active_admin() = false
        and user_id = auth.uid()
        and lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
        and is_active = true
      );
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_admin_users' and policyname = 'mnss_admin_users_admin_manage') then
    create policy mnss_admin_users_admin_manage on public.mnss_admin_users
      for all to authenticated
      using (public.mnss_is_admin())
      with check (public.mnss_is_admin());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_hero_sections' and policyname = 'mnss_hero_sections_public_read_active') then
    create policy mnss_hero_sections_public_read_active on public.mnss_hero_sections for select to public using (is_active = true);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_hero_sections' and policyname = 'mnss_hero_sections_authenticated_crud') then
    create policy mnss_hero_sections_authenticated_crud on public.mnss_hero_sections for all to authenticated using (public.mnss_is_admin()) with check (public.mnss_is_admin());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_site_information' and policyname = 'mnss_site_information_public_read_active') then
    create policy mnss_site_information_public_read_active on public.mnss_site_information for select to public using (is_active = true);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_site_information' and policyname = 'mnss_site_information_authenticated_crud') then
    create policy mnss_site_information_authenticated_crud on public.mnss_site_information for all to authenticated using (public.mnss_is_admin()) with check (public.mnss_is_admin());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_projects' and policyname = 'mnss_projects_public_read_active') then
    create policy mnss_projects_public_read_active on public.mnss_projects for select to public using (is_active = true);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_projects' and policyname = 'mnss_projects_authenticated_crud') then
    create policy mnss_projects_authenticated_crud on public.mnss_projects for all to authenticated using (public.mnss_is_admin()) with check (public.mnss_is_admin());
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_certifications' and policyname = 'mnss_certifications_public_read_active') then
    create policy mnss_certifications_public_read_active on public.mnss_certifications for select to public using (is_active = true);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'mnss_certifications' and policyname = 'mnss_certifications_authenticated_crud') then
    create policy mnss_certifications_authenticated_crud on public.mnss_certifications for all to authenticated using (public.mnss_is_admin()) with check (public.mnss_is_admin());
  end if;
end $$;

insert into public.mnss_hero_sections (
  slug, eyebrow, headline, highlighted_text, body, primary_cta_label, primary_cta_href,
  secondary_cta_label, secondary_cta_href, image_url, sort_order, is_active, metadata
)
values (
  'home',
  'Environmental Studies Consultants',
  'Environmental compliance guidance for responsible project development.',
  'responsible project development',
  'MNS Suarez Environmental Studies Consultants supports environmental impact assessment, ECC documentation, compliance planning, and public consultation work for projects in the Philippines.',
  'Request consultation',
  '/#contact',
  'View projects',
  '/projects',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop',
  0,
  true,
  '{"source":"seed","verification_status":"needs_owner_review"}'::jsonb
)
on conflict (slug) do nothing;

insert into public.mnss_site_information (section_key, title, body, metadata, sort_order, is_active)
values
  ('company_profile', 'Company profile', 'MNS Suarez Environmental Studies Consultants provides technical environmental study and compliance support for public and private development projects.', '{"source":"seed","verification_status":"needs_owner_review"}'::jsonb, 0, true),
  ('mission', 'Mission', 'Deliver practical, science-based environmental guidance that helps projects meet regulatory requirements while reducing ecological impact.', '{"source":"seed","verification_status":"needs_owner_review"}'::jsonb, 1, true),
  ('services_overview', 'Services overview', 'Core services include EIS preparation, EPRMP and PEPRMP support, IEE checklist assistance, ECC approval support, environmental auditing, and sustainability planning.', '{"source":"seed","verification_status":"needs_owner_review"}'::jsonb, 2, true)
on conflict (section_key) do nothing;

insert into public.mnss_projects (
  title, slug, category, summary, client_name, location, service_type, capacity, status,
  source_url, image_url, sort_order, is_featured, is_active, metadata
)
values
  ('56 MW Gas Turbine Power Plant', '56-mw-gas-turbine-power-plant', 'EIA / compliance documentation', 'Environmental documentation for a gas turbine power plant project in Zamboanga City. Details should be reviewed against the final approved public record before publication.', 'Malita Power Inc. / San Miguel Consolidated Power Corporation', 'Zamboanga City', 'EIA preparation support', '56 MW', 'review', 'https://r9.emb.gov.ph/emb-ix-facilitates-public-hearing-on-malita-power-inc-expansion-project-in-zamboanga-city/', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop', 0, true, true, '{"source":"seed","verification_status":"needs_owner_review"}'::jsonb),
  ('HPH Petroleum Terminal', 'hph-petroleum-terminal', 'EIS / public scoping', 'Environmental reporting and public scoping support for a petroleum terminal project. Capacity figures require owner confirmation before final publishing.', 'HPH Petroleum (Philippines) Inc.', 'Sta. Cruz, Davao del Sur', 'EIS and public scoping support', null, 'review', 'https://r11.emb.gov.ph/wp-content/uploads/2024/03/15Feb2024_Public-Scoping-Report-of-HPH.pdf', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2070&auto=format&fit=crop', 1, true, true, '{"source":"seed","verification_status":"needs_owner_review"}'::jsonb),
  ('People''s Ville Housing Project', 'peoples-ville-housing-project', 'EPRMP services', 'Environmental performance reporting for a socialized housing development in Davao City. Publication status should be confirmed before marking complete.', 'People''s Ville Housing Project', 'Davao City', 'EPRMP support', '7,200 residential units', 'review', 'https://r11.emb.gov.ph/wp-content/uploads/2024/08/ESP-English-Version.pdf', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop', 2, true, true, '{"source":"seed","verification_status":"needs_owner_review"}'::jsonb),
  ('Santeh Feeds Manufacturing Plant', 'santeh-feeds-manufacturing-plant', 'EIS / technical review', 'Environmental impact study support for a feeds manufacturing facility in Hagonoy, Davao del Sur. Final approval status requires owner confirmation.', 'Santeh Feeds Corporation', 'Hagonoy, Davao del Sur', 'EIS preparation support', '120,000 MT/year', 'review', 'https://r11.emb.gov.ph/wp-content/uploads/2023/07/sp1-SANTEH_FEEDS_-_ESP_Tagalog_merged.pdf', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop', 3, true, true, '{"source":"seed","verification_status":"needs_owner_review"}'::jsonb)
on conflict (slug) do nothing;

insert into public.mnss_certifications (
  title, issuer, credential_holder, status, sort_order, is_active, metadata
)
values (
  'Registered EIA Practitioner',
  'DENR-EMB',
  'Engr. Maria Nicca S. Suarez',
  'pending',
  0,
  true,
  '{"source":"seed","verification_status":"confirm_current_registry_before_publication"}'::jsonb
)
on conflict do nothing;

commit;
