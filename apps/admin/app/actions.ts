'use server';
import { getAdminClient } from '../lib/supabaseAdmin';

export async function createTeam(formData: FormData) {
  const name = String(formData.get('name') || '');
  const grade = String(formData.get('grade') || '');
  const day = String(formData.get('training_day') || '');
  const supabase = getAdminClient();
  const { error } = await supabase.from('teams').insert({ name, grade, training_day: day });
  if (error) throw error;
}

export async function sendNotification(formData: FormData) {
  const message = String(formData.get('message') || '');
  const teamId = (formData.get('team_id') as string) || null;
  const adminId = String(formData.get('admin_id') || '');
  const supabase = getAdminClient();
  const { error } = await supabase.functions.invoke('send_notification', { body: { admin_id: adminId, team_id: teamId, message } });
  if (error) throw error;
}

export async function updateUserRole(formData: FormData) {
  const userId = String(formData.get('user_id') || '');
  const role = String(formData.get('role') || '');
  const supabase = getAdminClient();
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId);
  if (error) throw error;
}

export async function createPlayer(formData: FormData) {
  const first_name = String(formData.get('first_name') || '');
  const last_name = String(formData.get('last_name') || '');
  const team_id = String(formData.get('team_id') || '');
  const date_of_birth = String(formData.get('date_of_birth') || '') || null;
  const supabase = getAdminClient();
  const { error } = await supabase.from('players').insert({ first_name, last_name, team_id, date_of_birth });
  if (error) throw error;
}

export async function linkParent(formData: FormData) {
  const parent_id = String(formData.get('parent_id') || '');
  const player_id = String(formData.get('player_id') || '');
  const relation = String(formData.get('relation') || 'guardian');
  const supabase = getAdminClient();
  const { error } = await supabase.from('parent_links').insert({ parent_id, player_id, relation });
  if (error) throw error;
}

export async function unlinkParent(formData: FormData) {
  const link_id = String(formData.get('link_id') || '');
  const supabase = getAdminClient();
  const { error } = await supabase.from('parent_links').delete().eq('id', link_id);
  if (error) throw error;
}

export async function assignCoach(formData: FormData) {
  const coach_id = String(formData.get('coach_id') || '');
  const team_id = String(formData.get('team_id') || '');
  const supabase = getAdminClient();
  const { error } = await supabase.from('coach_assignments').insert({ coach_id, team_id });
  if (error) throw error;
}

export async function removeCoachAssignment(formData: FormData) {
  const assignment_id = String(formData.get('assignment_id') || '');
  const supabase = getAdminClient();
  const { error } = await supabase.from('coach_assignments').delete().eq('id', assignment_id);
  if (error) throw error;
}

export async function assignRoutine(formData: FormData) {
  const routine_id = String(formData.get('routine_id') || '');
  const team_id = String(formData.get('team_id') || '');
  const supabase = getAdminClient();
  const { error } = await supabase.from('routine_assignments').insert({ routine_id, team_id });
  if (error) throw error;
}

export async function removeRoutineAssignment(formData: FormData) {
  const assignment_id = String(formData.get('assignment_id') || '');
  const supabase = getAdminClient();
  const { error } = await supabase.from('routine_assignments').delete().eq('id', assignment_id);
  if (error) throw error;
}

export async function exportAttendanceCsv(_: FormData) {
  const supabase = getAdminClient();
  // This action is a no-op placeholder: CSV export is served by route /attendance/export
  // Kept for form compatibility if needed later.
  return supabase; // prevent tree-shaking
}


