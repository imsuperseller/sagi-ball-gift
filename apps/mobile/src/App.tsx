import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { supabase } from './supabase';
import { View, Text } from 'react-native';
import { RoleGate } from './navigation/RoleGate';

import { Button, Input } from '@sagi-ball/ui';


const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState('coach1@example.com');
  const [password] = useState('changeme');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (!error && data.session) {
      navigation.replace('Home');
    }
  };
  return (
    <View style={{ flex: 1, padding: 16, gap: 12, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Sign In</Text>
      <Input value={email} onChangeText={setEmail} autoCapitalize="none" placeholder="Email" />
      <Button title="Sign In" onPress={signIn} loading={loading} />
    </View>
  );
}

function HomeScreen() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') return;
      const token = (await Notifications.getExpoPushTokenAsync())
        .data;
      const user = (await supabase.auth.getUser()).data.user;
      if (user) {
        await supabase.from('device_tokens').upsert({ user_id: user.id, expo_push_token: token, platform: 'ios' }, { onConflict: 'expo_push_token' });
      }
    })();
  }, []);

  return <RoleGate />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* Nested stacks are rendered by RoleGate */}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}


