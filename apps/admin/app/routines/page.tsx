import React from 'react';
import { getAdminClient } from '../../lib/supabaseAdmin';
import { assignRoutine, removeRoutineAssignment } from '../actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';

async function createRoutine(formData: FormData) {
  'use server';
  const supabase = getAdminClient();
  const title = String(formData.get('title') || '');
  const description = String(formData.get('description') || '');
  const video_url = String(formData.get('video_url') || '');
  const imageFile = formData.get('image') as File | null;
  let image_url: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const path = `routine-${Date.now()}-${imageFile.name}`;
    const { error: upErr } = await supabase.storage.from('routine-media').upload(path, imageFile, {
      cacheControl: '3600', upsert: false, contentType: imageFile.type
    });
    if (upErr) throw upErr;
    const { data: signed } = await supabase.storage.from('routine-media').createSignedUrl(path, 60 * 60 * 24 * 7);
    image_url = signed?.signedUrl;
  }
  const { error } = await supabase.from('training_routines').insert({ title, description, video_url: video_url || null, image_url: image_url || null });
  if (error) throw error;
}

export default async function RoutinesPage() {
  const supabase = getAdminClient();
  const { data: routines } = await supabase.from('training_routines').select('*, routine_assignments(id, team_id), id').order('created_at', { ascending: false });
  const { data: teams } = await supabase.from('teams').select('id,name');
  return (
    <div className="space-y-8">
      <PageHeader title="Training Library" subtitle="Create routines and assign to teams" />

      <Card className="rounded-2xl shadow-card border border-pitch/10">
        <CardHeader>
          <CardTitle>Create Routine</CardTitle>
          <CardDescription>Upload optional image and link a video</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createRoutine} className="space-y-3 max-w-xl">
            <Input name="title" placeholder="Title" required />
            <Textarea name="description" placeholder="Description" />
            <Input name="video_url" placeholder="Video URL (optional)" />
            <Input type="file" name="image" accept="image/*" />
            <Button type="submit" className="bg-pitch hover:bg-pitch/90">Create Routine</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(routines ?? []).map((r: any) => (
          <Card key={r.id} className="rounded-2xl shadow-card border border-pitch/10 overflow-hidden">
            {r.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={r.title} src={r.image_url} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-muted/40 flex items-center justify-center text-muted-foreground">No image</div>
            )}
            <CardHeader>
              <CardTitle>{r.title}</CardTitle>
              {r.description && <CardDescription>{r.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-2">Assignments</div>
                  <ul className="space-y-2">
                    {(r.routine_assignments ?? []).map((a: any) => (
                      <li key={a.id} className="flex items-center gap-2">
                        <span className="text-sm">{teams?.find((t) => t.id === a.team_id)?.name ?? a.team_id}</span>
                        <form action={removeRoutineAssignment}>
                          <input type="hidden" name="assignment_id" value={a.id} />
                          <Button type="submit" variant="outline" size="sm">Remove</Button>
                        </form>
                      </li>
                    ))}
                  </ul>
                </div>

                <form action={assignRoutine} className="flex items-center gap-2">
                  <input type="hidden" name="routine_id" value={r.id} />
                  <select name="team_id" className="h-9 rounded-md border px-3 py-1 bg-transparent">
                    {(teams ?? []).map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                  <Button type="submit" className="bg-pitch hover:bg-pitch/90">Assign</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


