import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export const Input: React.FC<TextInputProps> = (props) => {
  return <TextInput style={styles.input} placeholderTextColor="#9ca3af" {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12
  }
});


