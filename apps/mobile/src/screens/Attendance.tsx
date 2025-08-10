import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, Modal, TextInput, Alert } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { useTeamStore } from '../store/teamStore';
import { Button } from '@sagi-ball/ui';

export function Attendance() {
  const teamId = useTeamStore((s) => s.selectedTeamId);
  const [trainingDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [marks, setMarks] = useState<Record<string, { arrived: boolean; note?: string }>>({});
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const qc = useQueryClient();

  const { data: players = [] } = useQuery({
    enabled: !!teamId,
    queryKey: ['players', teamId],
    queryFn: async () => (await supabase.from('players').select('*').eq('team_id', teamId!)).data ?? []
  });

  const canSave = useMemo(() => Object.keys(marks).length > 0, [marks]);

  const mutation = useMutation({
    mutationFn: async () => {
      const user = (await supabase.auth.getUser()).data.user;
      const rows = Object.entries(marks).map(([playerId, v]) => ({
        team_id: teamId!,
        player_id: playerId,
        coach_id: user?.id,
        training_date: trainingDate,
        arrived: v.arrived,
        note: v.note
      }));
      const { error } = await supabase.from('attendance_logs').insert(rows);
      if (error) throw error;
    },
    onSuccess: () => {
      Alert.alert('Saved');
      setMarks({});
      qc.invalidateQueries({ queryKey: ['attendance', teamId, trainingDate] });
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={players}
        keyExtractor={(it: any) => it.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }: any) => {
          const val = marks[item.id]?.arrived;
          return (
            <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12 }}>
              <Text style={{ fontWeight: '600', marginBottom: 8 }}>{item.first_name} {item.last_name}</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Pressable
                  style={{ padding: 8, backgroundColor: val === true ? '#16a34a' : '#e5e7eb', borderRadius: 6 }}
                  onPress={() => setMarks((m) => ({ ...m, [item.id]: { arrived: true } }))}
                >
                  <Text style={{ color: val === true ? 'white' : 'black' }}>Arrived</Text>
                </Pressable>
                <Pressable
                  style={{ padding: 8, backgroundColor: val === false ? '#dc2626' : '#e5e7eb', borderRadius: 6 }}
                  onPress={() => { setMarks((m) => ({ ...m, [item.id]: { arrived: false } })); setNoteFor(item.id); }}
                >
                  <Text style={{ color: val === false ? 'white' : 'black' }}>Absent</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
      <View style={{ padding: 16 }}>
        <Button title="Save Attendance" disabled={!canSave || mutation.isPending} loading={mutation.isPending} onPress={() => mutation.mutate()} />
      </View>

      <Modal transparent visible={!!noteFor} animationType="slide" onRequestClose={() => setNoteFor(null)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 24 }}>
          <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, gap: 12 }}>
            <Text style={{ fontWeight: '700' }}>Add note (optional)</Text>
            <TextInput value={noteText} onChangeText={setNoteText} placeholder="Reason" style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10 }} />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button title="Cancel" onPress={() => { setNoteText(''); setNoteFor(null); }} />
              <Button title="Save" onPress={() => { if (noteFor) setMarks((m) => ({ ...m, [noteFor]: { ...(m[noteFor] ?? { arrived: false }), note: noteText || undefined } })); setNoteText(''); setNoteFor(null); }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


