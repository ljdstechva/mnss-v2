begin;

revoke execute on function public.mnss_set_updated_at() from public;
revoke execute on function public.mnss_has_active_admin() from public;
revoke execute on function public.mnss_is_admin() from public;

grant execute on function public.mnss_has_active_admin() to authenticated;
grant execute on function public.mnss_is_admin() to authenticated;

commit;
