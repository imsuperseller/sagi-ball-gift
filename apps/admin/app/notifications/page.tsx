import React from 'react';
import { getAdminClient } from '../../lib/supabaseAdmin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';

async function send(formData: FormData) {
  'use server';
  const supabase = getAdminClient();
  const message = String(formData.get('message') || '');
  const team_id = (formData.get('team_id') as string) || null;
  const admin_id = String(formData.get('admin_id') || '');
  const { error } = await supabase.functions.invoke('send_notification', { body: { message, team_id, admin_id } });
  if (error) throw error;
}

export default async function NotificationsPage() {
  const supabase = getAdminClient();
  const { data: teams } = await supabase.from('teams').select('id,name');
  return (
    <div className="space-y-8">
      <PageHeader title="Club Broadcast" subtitle="Compose and send announcements" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-card border border-pitch/10">
          <CardHeader>
            <CardTitle>Composer</CardTitle>
            <CardDescription>Max 500 characters</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={send} className="space-y-4">
              <Textarea name="message" placeholder="Your message (≤500)" maxLength={500} required className="min-h-[120px]" />
              <div className="grid grid-cols-2 gap-4">
                <select name="team_id" defaultValue="" className="h-9 rounded-md border px-3 py-1 bg-transparent">
                  <option value="">All teams</option>
                  {(teams ?? []).map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <Input name="admin_id" placeholder="Admin User ID" required />
              </div>
              <Button type="submit" className="w-full bg-pitch hover:bg-pitch/90">Send Broadcast</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-card border border-pitch/10">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>How it looks to parents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border/50 p-4 bg-white/60 dark:bg-white/5">
              <div className="text-sm text-muted-foreground mb-2">Football Academy</div>
              <div className="h-24 rounded-md bg-muted/60 flex items-center justify-center text-muted-foreground">
                Your message will appear here after sending
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


