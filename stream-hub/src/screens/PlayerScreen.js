import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function PlayerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stream Player</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: COLORS.text, fontSize: 18 },
});
