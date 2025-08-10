import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routines } from '../screens/Routines';
import { Notifications } from '../screens/Notifications';

const Stack = createNativeStackNavigator();

export function ParentNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Routines" component={Routines as any} />
      <Stack.Screen name="Notifications" component={Notifications as any} />
    </Stack.Navigator>
  );
}


