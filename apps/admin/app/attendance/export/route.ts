import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../lib/supabaseAdmin';

export async function GET(request: Request) {
  const supabase = getAdminClient();
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get('team_id') || '';
  const start = searchParams.get('start') || '';
  const end = searchParams.get('end') || '';

  let query = supabase.from('attendance_logs').select('training_date,logged_at,arrived,note, players(first_name,last_name), teams(name)').order('logged_at', { ascending: false });
  if (teamId) query = query.eq('team_id', teamId);
  if (start) query = query.gte('training_date', start);
  if (end) query = query.lte('training_date', end);
  const { data } = await query;

  const header = ['team','player_first','player_last','training_date','arrived','note','logged_at'];
  const rows = (data ?? []).map((r: any) => [
    r.teams?.name ?? '',
    r.players?.first_name ?? '',
    r.players?.last_name ?? '',
    r.training_date,
    r.arrived ? 'yes' : 'no',
    (r.note ?? '').replaceAll('\n',' ').replaceAll('"','""'),
    r.logged_at
  ]);
  const csv = [header.join(','), ...rows.map((r) => r.map((v) => /[,\n\"]/.test(String(v)) ? `"${String(v).replaceAll('"','""')}"` : v).join(','))].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename=attendance-${Date.now()}.csv`
    }
  });
}


