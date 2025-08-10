import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TeamSelector } from '../screens/TeamSelector';
import { Attendance } from '../screens/Attendance';
import { Routines } from '../screens/Routines';
import { Notifications } from '../screens/Notifications';

const Stack = createNativeStackNavigator();

export function CoachNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TeamSelector" component={TeamSelector as any} options={{ title: 'Teams' }} />
      <Stack.Screen name="Attendance" component={Attendance as any} />
      <Stack.Screen name="Routines" component={Routines as any} />
      <Stack.Screen name="Notifications" component={Notifications as any} />
    </Stack.Navigator>
  );
}


