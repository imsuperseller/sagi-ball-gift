'use client';

import React, { useEffect, useState } from 'react';
import { getAdminClient } from '../lib/supabaseAdmin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageHeader } from '@/components/PageHeader';
import EmptyState from '@/components/EmptyState';
import { useI18n } from '@/lib/i18n';
import { useSearchParams } from 'next/navigation';

interface Team {
  id: string;
  name: string;
}

interface AttendanceLog {
  id: string;
  training_date: string;
  arrived: boolean;
  note?: string;
  logged_at: string;
  players?: {
    first_name: string;
    last_name: string;
  };
}

export default function AttendanceContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const [teams, setTeams] = useState<Team[]>([]);
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState(true);

  const teamId = searchParams.get('team_id') || '';
  const date = searchParams.get('date') || '';

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = getAdminClient();
        
        // Fetch teams
        const { data: teamsData } = await supabase.from('teams').select('id,name');
        setTeams(teamsData || []);

        // Fetch attendance logs
        let query = supabase.from('attendance_logs').select('*, players(first_name,last_name)');
        if (teamId) query = query.eq('team_id', teamId);
        if (date) query = query.eq('training_date', date);
        const { data: logsData } = await query.order('logged_at', { ascending: false });
        setLogs(logsData || []);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [teamId, date]);

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader title={t.pages.attendance.title} subtitle={t.pages.attendance.subtitle} />
        <div className="text-center py-8">טוען...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title={t.pages.attendance.title} subtitle={t.pages.attendance.subtitle} />

      <div className="grid grid-cols-1 gap-6">
        <Card className="rounded-2xl shadow-card border border-pitch/10">
          <CardHeader className="text-right">
            <CardTitle>סינון</CardTitle>
            <CardDescription>צמצם רשומות לפי קבוצה ותאריך</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-wrap gap-3 items-center justify-end" action="/attendance" method="get">
              <select name="team_id" defaultValue={teamId} className="h-9 rounded-md border px-3 py-1 bg-transparent text-right">
                <option value="">כל הקבוצות</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              <Input type="date" name="date" defaultValue={date} className="w-auto text-right" />
              <Button type="submit" className="bg-pitch hover:bg-pitch/90">החל</Button>
              <a
                href={`/attendance/export${teamId || date ? `?${new URLSearchParams({ ...(teamId && { team_id: teamId }), ...(date && { start: date, end: date }) }).toString()}` : ''}`}
                className="inline-flex items-center h-9 px-4 rounded-md bg-accent text-ink"
              >
                ייצא CSV
              </a>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-card border border-pitch/10">
          <CardHeader className="text-right">
            <CardTitle>רשומות נוכחות</CardTitle>
            <CardDescription>הרשומות האחרונות ראשונות</CardDescription>
          </CardHeader>
          <CardContent>
            {!logs || logs.length === 0 ? (
              <EmptyState title="לא נמצאו רשומות" subtitle="נסה לשנות את הסינון או לבחור תאריך אחר" />
            ) : (
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">תאריך</TableHead>
                      <TableHead className="text-right">שחקן</TableHead>
                      <TableHead className="text-right">סטטוס</TableHead>
                      <TableHead className="text-right">הערה</TableHead>
                      <TableHead className="text-right">נרשם ב</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell className="text-right">{l.training_date}</TableCell>
                        <TableCell className="text-right">{l.players?.first_name} {l.players?.last_name}</TableCell>
                        <TableCell className={`text-right ${l.arrived ? 'text-pitch' : 'text-destructive'}`}>
                          {l.arrived ? t.status.arrived : t.status.absent}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">{l.note ?? ''}</TableCell>
                        <TableCell className="text-right">{new Date(l.logged_at).toLocaleString('he-IL')}</TableCell>
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
