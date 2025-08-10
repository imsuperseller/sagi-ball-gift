import React from 'react';
import { getAdminClient } from '../../lib/supabaseAdmin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageHeader } from '@/components/PageHeader';
import EmptyState from '@/components/EmptyState';

export default async function AttendancePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const supabase = getAdminClient();
  const sp = await searchParams;
  const teamId = typeof sp?.team_id === 'string' ? sp.team_id : '';
  const date = typeof sp?.date === 'string' ? sp.date : '';
  const { data: teams } = await supabase.from('teams').select('id,name');
  const query = supabase.from('attendance_logs').select('*, players(first_name,last_name)');
  if (teamId) query.eq('team_id', teamId);
  if (date) query.eq('training_date', date);
  const { data: logs } = await query.order('logged_at', { ascending: false });

  return (
    <div className="space-y-8">
      <PageHeader title="Matchday Attendance" subtitle="Filter and export attendance logs" />

      <div className="grid grid-cols-1 gap-6">
        <Card className="rounded-2xl shadow-card border border-pitch/10">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Narrow down logs by team and date</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-wrap gap-3 items-center" action="/attendance" method="get">
              <select name="team_id" defaultValue={teamId} className="h-9 rounded-md border px-3 py-1 bg-transparent">
                <option value="">All teams</option>
                {(teams ?? []).map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              <Input type="date" name="date" defaultValue={date} className="w-auto" />
              <Button type="submit" className="bg-pitch hover:bg-pitch/90">Apply</Button>
              <a
                href={`/attendance/export${teamId || date ? `?${new URLSearchParams({ ...(teamId && { team_id: teamId }), ...(date && { start: date, end: date }) }).toString()}` : ''}`}
                className="ml-auto inline-flex items-center h-9 px-4 rounded-md bg-accent text-ink"
              >
                Export CSV
              </a>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-card border border-pitch/10">
          <CardHeader>
            <CardTitle>Attendance Logs</CardTitle>
            <CardDescription>Latest entries first</CardDescription>
          </CardHeader>
          <CardContent>
            {!logs || logs.length === 0 ? (
              <EmptyState title="No logs found" subtitle="Try adjusting filters or pick a different date" />
            ) : (
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead>Logged At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(logs ?? []).map((l: any) => (
                      <TableRow key={l.id}>
                        <TableCell>{l.training_date}</TableCell>
                        <TableCell>{l.players?.first_name} {l.players?.last_name}</TableCell>
                        <TableCell className={l.arrived ? 'text-pitch' : 'text-destructive'}>
                          {l.arrived ? 'Arrived' : 'Absent'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{l.note ?? ''}</TableCell>
                        <TableCell>{new Date(l.logged_at).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


