import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { useTeamStore } from '../store/teamStore';

export function Notifications() {
  const teamId = useTeamStore((s) => s.selectedTeamId);
  const { data = [] } = useQuery({
    queryKey: ['notifications', teamId],
    queryFn: async () => (await supabase
      .from('admin_notifications')
      .select('*')
      .or(`team_id.is.null,team_id.eq.${teamId ?? ''}`)
      .order('created_at', { ascending: false })
    ).data ?? []
  });

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, gap: 12 }}
      data={data}
      keyExtractor={(it: any) => it.id}
      renderItem={({ item }: any) => (
        <View style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8 }}>
          <Text>{item.message}</Text>
          <Text style={{ color: '#6b7280', marginTop: 4 }}>{new Date(item.created_at).toLocaleString()}</Text>
        </View>
      )}
    />
  );
}


