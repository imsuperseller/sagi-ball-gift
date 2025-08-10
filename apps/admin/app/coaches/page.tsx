import React from 'react';
import { getAdminClient } from '../../lib/supabaseAdmin';
import { assignCoach, removeCoachAssignment } from '../actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';

export default async function CoachesPage() {
  const supabase = getAdminClient();
  const { data: coaches } = await supabase.from('profiles').select('id,full_name').eq('role', 'coach');
  const { data: teams } = await supabase.from('teams').select('id,name');
  const { data: assignments } = await supabase.from('coach_assignments').select('id,coach_id,team_id');

  return (
    <div className="space-y-8">
      <PageHeader title="Coaches" subtitle="Assign coaches to teams" />

      <Card className="rounded-2xl shadow-card border border-pitch/10 max-w-xl">
        <CardHeader>
          <CardTitle>Assign Coach</CardTitle>
          <CardDescription>Select a coach and a team</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={assignCoach} className="flex gap-3 items-center">
            <select name="coach_id" className="h-9 rounded-md border px-3 py-1 bg-transparent">
              {(coaches ?? []).map((c) => <option key={c.id} value={c.id}>{c.full_name ?? c.id}</option>)}
            </select>
            <select name="team_id" className="h-9 rounded-md border px-3 py-1 bg-transparent">
              {(teams ?? []).map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <Button type="submit" className="bg-pitch hover:bg-pitch/90">Assign</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-card border border-pitch/10">
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3">
            {(assignments ?? []).map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded-xl border border-border/50 p-3">
                <div>
                  <div>Coach: {coaches?.find((c) => c.id === a.coach_id)?.full_name ?? a.coach_id}</div>
                  <div className="text-muted-foreground text-sm">Team: {teams?.find((t) => t.id === a.team_id)?.name ?? a.team_id}</div>
                </div>
                <form action={removeCoachAssignment}>
                  <input type="hidden" name="assignment_id" value={a.id} />
                  <Button type="submit" variant="outline" size="sm">Remove</Button>
                </form>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}


