import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { AttendanceMarkSchema, NotificationPayloadSchema } from '@sagi-ball/types';

export type ClientKind = 'anon' | 'service';

export const createSupabaseClient = (url: string, key: string): SupabaseClient => {
  return createClient(url, key, { auth: { persistSession: false } });
};

export async function markAttendanceBatch(client: SupabaseClient, marks: unknown) {
  const rows = z.array(AttendanceMarkSchema).parse(marks);
  const { data: authData } = await client.auth.getUser();
  const userId = authData?.user?.id;
  const inserts = rows.map((r) => ({
    team_id: r.teamId,
    player_id: r.playerId,
    coach_id: userId,
    training_date: r.trainingDate,
    arrived: r.arrived,
    note: r.note
  }));
  const { error } = await client.from('attendance_logs').insert(inserts);
  if (error) throw error;
  return { inserted: inserts.length };
}

export async function listCoachTeams(client: SupabaseClient) {
  const { data, error } = await client.from('teams').select('*');
  if (error) throw error;
  return data;
}

export async function listTeamRoutines(client: SupabaseClient, teamId: string) {
  const { data, error } = await client
    .from('training_routines')
    .select('id,title,description,video_url,image_url, routine_assignments!inner(team_id)')
    .eq('routine_assignments.team_id', teamId);
  if (error) throw error;
  return data;
}

export async function sendAdminNotification(serviceClient: SupabaseClient, payload: unknown) {
  const p = NotificationPayloadSchema.parse(payload);
  const { error } = await serviceClient.functions.invoke('send_notification', { body: p });
  if (error) throw error;
  return { ok: true };
}


