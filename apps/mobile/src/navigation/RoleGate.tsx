import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import { CoachNavigator } from './coach';
import { ParentNavigator } from './parent';

export function RoleGate() {
  const { data: role, isLoading } = useQuery({
    queryKey: ['profile-role'],
    queryFn: async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return null;
      const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      return data?.role as 'coach' | 'parent' | 'admin' | null;
    }
  });

  if (isLoading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>;
  if (role === 'coach') return <CoachNavigator />;
  return <ParentNavigator />;
}


