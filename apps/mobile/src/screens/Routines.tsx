import React from 'react';
import { View, Text, FlatList, Image, Pressable, Linking } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { useTeamStore } from '../store/teamStore';

export function Routines() {
  const teamId = useTeamStore((s) => s.selectedTeamId);
  const { data = [] } = useQuery({
    enabled: !!teamId,
    queryKey: ['routines', teamId],
    queryFn: async () => (await supabase
      .from('training_routines')
      .select('id,title,description,image_url,video_url, routine_assignments!inner(team_id)')
      .eq('routine_assignments.team_id', teamId!)
    ).data ?? []
  });

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, gap: 12 }}
      data={data}
      keyExtractor={(it: any) => it.id}
      renderItem={({ item }: any) => (
        <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, gap: 8 }}>
          {!!item.image_url && <Image source={{ uri: item.image_url }} resizeMode="cover" style={{ height: 160, borderRadius: 8 }} />}
          <Text style={{ fontWeight: '700' }}>{item.title}</Text>
          {!!item.description && <Text style={{ color: '#374151' }}>{item.description}</Text>}
          {!!item.video_url && (
            <Pressable onPress={() => Linking.openURL(item.video_url)}>
              <Text style={{ color: '#2563eb' }}>Open Video</Text>
            </Pressable>
          )}
        </View>
      )}
    />
  );
}


