import React from 'react';
import { getAdminClient } from '../../lib/supabaseAdmin';
import { updateUserRole } from '../actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';

export default async function UsersPage() {
  const supabase = getAdminClient();
  const { data: profiles } = await supabase.from('profiles').select('id,full_name,role,created_at');

  return (
    <div className="space-y-8">
      <PageHeader title="Users" subtitle="Manage roles" />

      <Card className="rounded-2xl shadow-card border border-pitch/10">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Change roles inline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(profiles ?? []).map((p: any) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.full_name ?? p.id}</TableCell>
                    <TableCell className="capitalize">{p.role}</TableCell>
                    <TableCell>
                      <form action={updateUserRole} className="flex items-center gap-2">
                        <input type="hidden" name="user_id" value={p.id} />
                        <select name="role" defaultValue={p.role} className="h-9 rounded-md border px-3 py-1 bg-transparent">
                          <option value="admin">admin</option>
                          <option value="coach">coach</option>
                          <option value="parent">parent</option>
                        </select>
                        <Button type="submit">Save</Button>
                      </form>
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


