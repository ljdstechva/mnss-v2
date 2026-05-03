begin;

create or replace function public.mnss_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.mnss_has_active_admin() from anon;
revoke execute on function public.mnss_is_admin() from anon;
grant execute on function public.mnss_has_active_admin() to authenticated;
grant execute on function public.mnss_is_admin() to authenticated;

drop policy if exists mnss_admin_users_select_self_or_admin on public.mnss_admin_users;
drop policy if exists mnss_admin_users_bootstrap_first_admin on public.mnss_admin_users;
drop policy if exists mnss_admin_users_admin_manage on public.mnss_admin_users;
drop policy if exists mnss_admin_users_insert_bootstrap_or_admin on public.mnss_admin_users;
drop policy if exists mnss_admin_users_admin_update on public.mnss_admin_users;
drop policy if exists mnss_admin_users_admin_delete on public.mnss_admin_users;

create policy mnss_admin_users_select_self_or_admin on public.mnss_admin_users
  for select to authenticated
  using (
    public.mnss_is_admin()
    or user_id = (select auth.uid())
    or lower(email) = lower(coalesce((select auth.jwt()) ->> 'email', ''))
  );

create policy mnss_admin_users_insert_bootstrap_or_admin on public.mnss_admin_users
  for insert to authenticated
  with check (
    public.mnss_is_admin()
    or (
      public.mnss_has_active_admin() = false
      and user_id = (select auth.uid())
      and lower(email) = lower(coalesce((select auth.jwt()) ->> 'email', ''))
      and is_active = true
    )
  );

create policy mnss_admin_users_admin_update on public.mnss_admin_users
  for update to authenticated
  using (public.mnss_is_admin())
  with check (public.mnss_is_admin());

create policy mnss_admin_users_admin_delete on public.mnss_admin_users
  for delete to authenticated
  using (public.mnss_is_admin());

drop policy if exists mnss_hero_sections_public_read_active on public.mnss_hero_sections;
drop policy if exists mnss_hero_sections_authenticated_crud on public.mnss_hero_sections;
drop policy if exists mnss_hero_sections_anon_read_active on public.mnss_hero_sections;
drop policy if exists mnss_hero_sections_authenticated_select on public.mnss_hero_sections;
drop policy if exists mnss_hero_sections_authenticated_insert on public.mnss_hero_sections;
drop policy if exists mnss_hero_sections_authenticated_update on public.mnss_hero_sections;
drop policy if exists mnss_hero_sections_authenticated_delete on public.mnss_hero_sections;

create policy mnss_hero_sections_anon_read_active on public.mnss_hero_sections
  for select to anon
  using (is_active = true);

create policy mnss_hero_sections_authenticated_select on public.mnss_hero_sections
  for select to authenticated
  using (is_active = true or public.mnss_is_admin());

create policy mnss_hero_sections_authenticated_insert on public.mnss_hero_sections
  for insert to authenticated
  with check (public.mnss_is_admin());

create policy mnss_hero_sections_authenticated_update on public.mnss_hero_sections
  for update to authenticated
  using (public.mnss_is_admin())
  with check (public.mnss_is_admin());

create policy mnss_hero_sections_authenticated_delete on public.mnss_hero_sections
  for delete to authenticated
  using (public.mnss_is_admin());

drop policy if exists mnss_site_information_public_read_active on public.mnss_site_information;
drop policy if exists mnss_site_information_authenticated_crud on public.mnss_site_information;
drop policy if exists mnss_site_information_anon_read_active on public.mnss_site_information;
drop policy if exists mnss_site_information_authenticated_select on public.mnss_site_information;
drop policy if exists mnss_site_information_authenticated_insert on public.mnss_site_information;
drop policy if exists mnss_site_information_authenticated_update on public.mnss_site_information;
drop policy if exists mnss_site_information_authenticated_delete on public.mnss_site_information;

create policy mnss_site_information_anon_read_active on public.mnss_site_information
  for select to anon
  using (is_active = true);

create policy mnss_site_information_authenticated_select on public.mnss_site_information
  for select to authenticated
  using (is_active = true or public.mnss_is_admin());

create policy mnss_site_information_authenticated_insert on public.mnss_site_information
  for insert to authenticated
  with check (public.mnss_is_admin());

create policy mnss_site_information_authenticated_update on public.mnss_site_information
  for update to authenticated
  using (public.mnss_is_admin())
  with check (public.mnss_is_admin());

create policy mnss_site_information_authenticated_delete on public.mnss_site_information
  for delete to authenticated
  using (public.mnss_is_admin());

drop policy if exists mnss_projects_public_read_active on public.mnss_projects;
drop policy if exists mnss_projects_authenticated_crud on public.mnss_projects;
drop policy if exists mnss_projects_anon_read_active on public.mnss_projects;
drop policy if exists mnss_projects_authenticated_select on public.mnss_projects;
drop policy if exists mnss_projects_authenticated_insert on public.mnss_projects;
drop policy if exists mnss_projects_authenticated_update on public.mnss_projects;
drop policy if exists mnss_projects_authenticated_delete on public.mnss_projects;

create policy mnss_projects_anon_read_active on public.mnss_projects
  for select to anon
  using (is_active = true);

create policy mnss_projects_authenticated_select on public.mnss_projects
  for select to authenticated
  using (is_active = true or public.mnss_is_admin());

create policy mnss_projects_authenticated_insert on public.mnss_projects
  for insert to authenticated
  with check (public.mnss_is_admin());

create policy mnss_projects_authenticated_update on public.mnss_projects
  for update to authenticated
  using (public.mnss_is_admin())
  with check (public.mnss_is_admin());

create policy mnss_projects_authenticated_delete on public.mnss_projects
  for delete to authenticated
  using (public.mnss_is_admin());

drop policy if exists mnss_certifications_public_read_active on public.mnss_certifications;
drop policy if exists mnss_certifications_authenticated_crud on public.mnss_certifications;
drop policy if exists mnss_certifications_anon_read_active on public.mnss_certifications;
drop policy if exists mnss_certifications_authenticated_select on public.mnss_certifications;
drop policy if exists mnss_certifications_authenticated_insert on public.mnss_certifications;
drop policy if exists mnss_certifications_authenticated_update on public.mnss_certifications;
drop policy if exists mnss_certifications_authenticated_delete on public.mnss_certifications;

create policy mnss_certifications_anon_read_active on public.mnss_certifications
  for select to anon
  using (is_active = true);

create policy mnss_certifications_authenticated_select on public.mnss_certifications
  for select to authenticated
  using (is_active = true or public.mnss_is_admin());

create policy mnss_certifications_authenticated_insert on public.mnss_certifications
  for insert to authenticated
  with check (public.mnss_is_admin());

create policy mnss_certifications_authenticated_update on public.mnss_certifications
  for update to authenticated
  using (public.mnss_is_admin())
  with check (public.mnss_is_admin());

create policy mnss_certifications_authenticated_delete on public.mnss_certifications
  for delete to authenticated
  using (public.mnss_is_admin());

commit;
