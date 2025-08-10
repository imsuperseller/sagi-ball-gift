import React from 'react';
import { FlatList, View, Text, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { useTeamStore } from '../store/teamStore';

export function TeamSelector({ navigation }: any) {
  const setSelectedTeamId = useTeamStore((s) => s.setSelectedTeamId);
  const { data } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => (await supabase.from('teams').select('*')).data ?? []
  });

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, gap: 12 }}
      data={data}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }: any) => (
        <Pressable
          style={{ borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 8 }}
          onPress={() => {
            setSelectedTeamId(item.id);
            navigation.navigate('Attendance');
          }}
        >
          <Text style={{ fontWeight: '600' }}>{item.name}</Text>
          {!!item.training_day && <Text style={{ color: '#6b7280' }}>{item.training_day}</Text>}
        </Pressable>
      )}
    />
  );
}


