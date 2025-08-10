-- Schema + RLS for Sagi Ball
-- Extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','coach','parent')),
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Teams
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  grade text,
  training_day text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Coach Assignments
create table if not exists public.coach_assignments (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  unique (coach_id, team_id),
  created_at timestamptz not null default now()
);

-- Players
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  date_of_birth date,
  team_id uuid references public.teams(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Parent Links
create table if not exists public.parent_links (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  relation text,
  unique (parent_id, player_id),
  created_at timestamptz not null default now()
);

-- Attendance Logs (append-only)
create table if not exists public.attendance_logs (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  coach_id uuid not null references public.profiles(id) on delete set null,
  training_date date not null,
  arrived boolean not null,
  note text,
  logged_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists attendance_logs_team_date_idx on public.attendance_logs (team_id, training_date);
create index if not exists attendance_logs_player_date_idx on public.attendance_logs (player_id, training_date);

-- Training Routines
create table if not exists public.training_routines (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  video_url text,
  image_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Routine Assignments
create table if not exists public.routine_assignments (
  id uuid primary key default gen_random_uuid(),
  routine_id uuid not null references public.training_routines(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  unique (routine_id, team_id),
  created_at timestamptz not null default now()
);

-- Admin Notifications
create table if not exists public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.profiles(id) on delete set null,
  team_id uuid references public.teams(id) on delete cascade,
  message text not null check (length(message) <= 500),
  created_at timestamptz not null default now()
);

-- Device Tokens
create table if not exists public.device_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  expo_push_token text not null,
  platform text check (platform in ('ios','android')),
  created_at timestamptz not null default now(),
  unique (expo_push_token)
);

-- Audit Log
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity text,
  entity_id uuid,
  meta jsonb,
  created_at timestamptz not null default now()
);

-- updated_at trigger
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;
drop trigger if exists trg_profiles_upd on public.profiles;
create trigger trg_profiles_upd before update on public.profiles for each row execute procedure set_updated_at();
drop trigger if exists trg_players_upd on public.players;
create trigger trg_players_upd before update on public.players for each row execute procedure set_updated_at();
drop trigger if exists trg_training_routines_upd on public.training_routines;
create trigger trg_training_routines_upd before update on public.training_routines for each row execute procedure set_updated_at();

-- Storage bucket for routine media
insert into storage.buckets (id, name, public) values ('routine-media', 'routine-media', true)
on conflict (id) do nothing;

-- RLS
alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.coach_assignments enable row level security;
alter table public.players enable row level security;
alter table public.parent_links enable row level security;
alter table public.attendance_logs enable row level security;
alter table public.training_routines enable row level security;
alter table public.routine_assignments enable row level security;
alter table public.admin_notifications enable row level security;
alter table public.device_tokens enable row level security;
alter table public.audit_log enable row level security;

-- helpers
create or replace function is_admin() returns boolean language sql as $$
  select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
$$;

-- profiles policies
drop policy if exists profiles_select_self on public.profiles;
create policy profiles_select_self on public.profiles for select using (
  id = auth.uid() or is_admin()
);
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles for update using (id = auth.uid());

-- teams policies
drop policy if exists teams_admin_all on public.teams;
create policy teams_admin_all on public.teams for all using (is_admin()) with check (is_admin());
drop policy if exists teams_coach_select on public.teams;
create policy teams_coach_select on public.teams for select using (
  exists (select 1 from public.coach_assignments ca where ca.coach_id = auth.uid() and ca.team_id = teams.id)
);
drop policy if exists teams_parent_select on public.teams;
create policy teams_parent_select on public.teams for select using (
  exists (
    select 1 from public.players pl
    join public.parent_links l on l.player_id = pl.id
    where l.parent_id = auth.uid() and pl.team_id = teams.id
  )
);

-- coach_assignments policies (admin manage, coach read own)
drop policy if exists ca_admin_all on public.coach_assignments;
create policy ca_admin_all on public.coach_assignments for all using (is_admin()) with check (is_admin());
drop policy if exists ca_coach_select on public.coach_assignments;
create policy ca_coach_select on public.coach_assignments for select using (coach_id = auth.uid());

-- players policies
drop policy if exists players_admin_all on public.players;
create policy players_admin_all on public.players for all using (is_admin()) with check (is_admin());
drop policy if exists coach_select_players on public.players;
create policy coach_select_players on public.players for select using (
  exists (
    select 1 from public.coach_assignments ca where ca.coach_id = auth.uid() and ca.team_id = players.team_id
  )
);
drop policy if exists parent_select_own_players on public.players;
create policy parent_select_own_players on public.players for select using (
  exists (
    select 1 from public.parent_links pl where pl.parent_id = auth.uid() and pl.player_id = players.id
  )
);

-- parent_links policies (admin manage; parent read own links)
drop policy if exists pl_admin_all on public.parent_links;
create policy pl_admin_all on public.parent_links for all using (is_admin()) with check (is_admin());
drop policy if exists pl_parent_select on public.parent_links;
create policy pl_parent_select on public.parent_links for select using (parent_id = auth.uid());

-- attendance_logs policies
drop policy if exists att_admin_all on public.attendance_logs;
create policy att_admin_all on public.attendance_logs for select using (is_admin());
drop policy if exists coach_insert_attendance on public.attendance_logs;
create policy coach_insert_attendance on public.attendance_logs for insert with check (
  coach_id = auth.uid() and exists (select 1 from public.coach_assignments ca where ca.coach_id = auth.uid() and ca.team_id = attendance_logs.team_id)
);
drop policy if exists coach_select_attendance on public.attendance_logs;
create policy coach_select_attendance on public.attendance_logs for select using (
  exists (select 1 from public.coach_assignments ca where ca.coach_id = auth.uid() and ca.team_id = attendance_logs.team_id)
);
drop policy if exists parent_select_attendance on public.attendance_logs;
create policy parent_select_attendance on public.attendance_logs for select using (
  exists (
    select 1 from public.parent_links l where l.parent_id = auth.uid() and l.player_id = attendance_logs.player_id
  )
);

-- training_routines policies
drop policy if exists routines_admin_all on public.training_routines;
create policy routines_admin_all on public.training_routines for all using (is_admin()) with check (is_admin());
drop policy if exists routines_select_assigned on public.training_routines;
create policy routines_select_assigned on public.training_routines for select using (
  exists (
    select 1 from public.routine_assignments ra
    join public.coach_assignments ca on ca.team_id = ra.team_id and ca.coach_id = auth.uid()
    where ra.routine_id = training_routines.id
  )
  or exists (
    select 1 from public.routine_assignments ra
    join public.players p on p.team_id = ra.team_id
    join public.parent_links l on l.player_id = p.id and l.parent_id = auth.uid()
    where ra.routine_id = training_routines.id
  )
);

-- routine_assignments policies
drop policy if exists ra_admin_all on public.routine_assignments;
create policy ra_admin_all on public.routine_assignments for all using (is_admin()) with check (is_admin());
drop policy if exists ra_select_related on public.routine_assignments;
create policy ra_select_related on public.routine_assignments for select using (
  exists (select 1 from public.coach_assignments ca where ca.coach_id = auth.uid() and ca.team_id = routine_assignments.team_id)
  or exists (
    select 1 from public.players p join public.parent_links l on l.player_id = p.id
    where l.parent_id = auth.uid() and p.team_id = routine_assignments.team_id
  )
);

-- admin_notifications policies
drop policy if exists an_admin_insert_select on public.admin_notifications;
create policy an_admin_insert_select on public.admin_notifications for all using (is_admin()) with check (is_admin());
drop policy if exists an_user_select on public.admin_notifications;
create policy an_user_select on public.admin_notifications for select using (
  team_id is null
  or exists (
    select 1 from public.coach_assignments ca where ca.coach_id = auth.uid() and ca.team_id = admin_notifications.team_id
  )
  or exists (
    select 1 from public.players p join public.parent_links l on l.player_id = p.id
    where l.parent_id = auth.uid() and p.team_id = admin_notifications.team_id
  )
);

-- device_tokens policies
drop policy if exists dt_admin_select on public.device_tokens;
create policy dt_admin_select on public.device_tokens for select using (is_admin());
drop policy if exists dt_upsert_own on public.device_tokens;
create policy dt_upsert_own on public.device_tokens for insert with check (user_id = auth.uid());
create policy dt_delete_own on public.device_tokens for delete using (user_id = auth.uid());
create policy dt_select_own on public.device_tokens for select using (user_id = auth.uid());

-- audit_log policies (read admin only, writes via RPC/edge)
drop policy if exists audit_admin_select on public.audit_log;
create policy audit_admin_select on public.audit_log for select using (is_admin());


