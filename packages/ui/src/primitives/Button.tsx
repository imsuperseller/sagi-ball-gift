import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const Button: React.FC<Props> = ({ title, onPress, disabled, loading }) => {
  const isDisabled = disabled || loading;
  return (
    <Pressable style={[styles.btn, isDisabled && styles.disabled]} onPress={onPress} disabled={isDisabled}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  text: { color: 'white', fontWeight: '600' },
  disabled: { opacity: 0.6 }
});


