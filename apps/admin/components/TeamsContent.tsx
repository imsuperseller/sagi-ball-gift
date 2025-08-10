'use client';

import React, { useEffect, useState } from 'react';
import { getAdminClient } from '../lib/supabaseAdmin';
import { createTeam } from '../app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';
import { useI18n } from '@/lib/i18n';
import { Plus } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  grade?: string;
  training_day?: string;
  created_at: string;
}

export default function TeamsContent() {
  const { t } = useI18n();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const supabase = getAdminClient();
        const { data } = await supabase.from('teams').select('*').order('created_at', { ascending: false });
        setTeams(data || []);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader 
        title={t.pages.teams.title} 
        subtitle={t.pages.teams.subtitle} 
      />

      <Card className="rounded-2xl shadow-card border border-pitch/10 max-w-xl">
        <CardHeader className="text-right">
          <CardTitle className="flex items-center gap-2 justify-end">
            <Plus className="w-5 h-5 text-pitch" />
            הוסף קבוצה
          </CardTitle>
          <CardDescription>צור קבוצה חדשה</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createTeam} className="space-y-3">
            <Input name="name" placeholder="שם קבוצה" required className="text-right" />
            <div className="grid grid-cols-2 gap-3">
              <Input name="grade" placeholder="כיתה" className="text-right" />
              <Input name="training_day" placeholder="יום אימון" className="text-right" />
            </div>
            <Button type="submit" className="bg-pitch hover:bg-pitch/90 w-full">
              <Plus className="w-4 h-4 ml-2" />
              צור קבוצה
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((t) => (
          <Card key={t.id} className="rounded-2xl shadow-card border border-pitch/10">
            <CardHeader className="text-right">
              <CardTitle>{t.name}</CardTitle>
              <CardDescription>{t.grade} {t.training_day}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
