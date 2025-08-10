-- Seed data for Sagi Ball
-- Assumes schema.sql has been applied

-- Create users in auth and profiles
-- Note: For local dev, you may insert into auth.users; in hosted, create via Supabase Auth API.

-- ADMIN
insert into auth.users (id, email) values ('00000000-0000-0000-0000-000000000001', 'admin@example.com') on conflict do nothing;
insert into public.profiles (id, role, full_name) values ('00000000-0000-0000-0000-000000000001','admin','Admin User') on conflict (id) do nothing;

-- COACHES
insert into auth.users (id, email) values ('00000000-0000-0000-0000-000000000002', 'coach1@example.com') on conflict do nothing;
insert into public.profiles (id, role, full_name) values ('00000000-0000-0000-0000-000000000002','coach','Coach One') on conflict (id) do nothing;
insert into auth.users (id, email) values ('00000000-0000-0000-0000-000000000003', 'coach2@example.com') on conflict do nothing;
insert into public.profiles (id, role, full_name) values ('00000000-0000-0000-0000-000000000003','coach','Coach Two') on conflict (id) do nothing;

-- PARENTS (6)
insert into auth.users (id, email) values ('00000000-0000-0000-0000-000000000010', 'parent1@example.com') on conflict do nothing;
insert into public.profiles (id, role, full_name) values ('00000000-0000-0000-0000-000000000010','parent','Parent One') on conflict (id) do nothing;
insert into auth.users (id, email) values ('00000000-0000-0000-0000-000000000011', 'parent2@example.com') on conflict do nothing;
insert into public.profiles (id, role, full_name) values ('00000000-0000-0000-0000-000000000011','parent','Parent Two') on conflict (id) do nothing;
insert into auth.users (id, email) values ('00000000-0000-0000-0000-000000000012', 'parent3@example.com') on conflict do nothing;
insert into public.profiles (id, role, full_name) values ('00000000-0000-0000-0000-000000000012','parent','Parent Three') on conflict (id) do nothing;
insert into auth.users (id, email) values ('00000000-0000-0000-0000-000000000013', 'parent4@example.com') on conflict do nothing;
insert into public.profiles (id, role, full_name) values ('00000000-0000-0000-0000-000000000013','parent','Parent Four') on conflict (id) do nothing;
insert into auth.users (id, email) values ('00000000-0000-0000-0000-000000000014', 'parent5@example.com') on conflict do nothing;
insert into public.profiles (id, role, full_name) values ('00000000-0000-0000-0000-000000000014','parent','Parent Five') on conflict (id) do nothing;
insert into auth.users (id, email) values ('00000000-0000-0000-0000-000000000015', 'parent6@example.com') on conflict do nothing;
insert into public.profiles (id, role, full_name) values ('00000000-0000-0000-0000-000000000015','parent','Parent Six') on conflict (id) do nothing;

-- Teams
insert into public.teams (id, name, grade, training_day) values
  ('10000000-0000-0000-0000-000000000001','First Grade Friday','1st','Friday'),
  ('10000000-0000-0000-0000-000000000002','Second Grade Sunday','2nd','Sunday')
on conflict (id) do nothing;

-- Coach Assignments
insert into public.coach_assignments (coach_id, team_id) values
  ('00000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000003','10000000-0000-0000-0000-000000000002')
on conflict do nothing;

-- Players (20 total; 10 per team)
do $$
declare i int;
begin
  for i in 1..10 loop
    insert into public.players (id, first_name, last_name, team_id)
    values (uuid_generate_v4(), 'Player' || i, 'A', '10000000-0000-0000-0000-000000000001')
    on conflict do nothing;
  end loop;
  for i in 11..20 loop
    insert into public.players (id, first_name, last_name, team_id)
    values (uuid_generate_v4(), 'Player' || i, 'B', '10000000-0000-0000-0000-000000000002')
    on conflict do nothing;
  end loop;
end $$;

-- Parent links: link first 6 players to parents 1..6
with first_six as (
  select id from public.players order by created_at asc limit 6
)
insert into public.parent_links (parent_id, player_id, relation)
select ('00000000-0000-0000-0000-00000000000' || (row_number() over()) )::uuid as parent_id,
       id as player_id,
       'guardian' as relation
from first_six
on conflict do nothing;

-- Sample routines
insert into public.training_routines (id, title, description, created_by)
values
  ('20000000-0000-0000-0000-000000000001','Dribbling Basics','Warmup and cone dribbles','00000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000002','Passing Drill','Pairs passing and movement','00000000-0000-0000-0000-000000000001')
on conflict (id) do nothing;

insert into public.routine_assignments (routine_id, team_id) values
  ('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002')
on conflict do nothing;

-- Attendance logs recent days for first team players 1..3
insert into public.attendance_logs (team_id, player_id, coach_id, training_date, arrived, note)
select '10000000-0000-0000-0000-000000000001', p.id, '00000000-0000-0000-0000-000000000002', (current_date - 1), true, null
from public.players p where p.team_id = '10000000-0000-0000-0000-000000000001' order by p.created_at asc limit 3;
insert into public.attendance_logs (team_id, player_id, coach_id, training_date, arrived, note)
select '10000000-0000-0000-0000-000000000001', p.id, '00000000-0000-0000-0000-000000000002', (current_date - 2), false, 'Sick'
from public.players p where p.team_id = '10000000-0000-0000-0000-000000000001' order by p.created_at asc limit 1;

-- Done

