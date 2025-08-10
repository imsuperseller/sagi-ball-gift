import React from 'react';
import { getAdminClient } from '../../lib/supabaseAdmin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageHeader } from '@/components/PageHeader';

export default async function AuditPage() {
  const supabase = getAdminClient();
  const { data: entries } = await supabase.from('audit_log').select('*').order('created_at', { ascending: false }).limit(200);
  return (
    <div className="space-y-8">
      <PageHeader title="Audit Trail" subtitle="Recent write actions across the platform" />

      <Card className="rounded-2xl shadow-card border border-pitch/10">
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>Up to 200 most recent entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>When</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Entity ID</TableHead>
                  <TableHead>Meta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(entries ?? []).map((e: any) => (
                  <TableRow key={e.id}>
                    <TableCell>{new Date(e.created_at!).toLocaleString()}</TableCell>
                    <TableCell className="font-mono text-xs">{e.actor_id}</TableCell>
                    <TableCell>{e.action}</TableCell>
                    <TableCell>{e.entity}</TableCell>
                    <TableCell className="font-mono text-xs">{e.entity_id}</TableCell>
                    <TableCell>
                      <pre className="text-xs text-muted-foreground whitespace-pre-wrap">{JSON.stringify(e.meta || {}, null, 2)}</pre>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


