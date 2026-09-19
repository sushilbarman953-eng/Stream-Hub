import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { WatchlistProvider } from './src/context/WatchlistContext';
import { HistoryProvider } from './src/context/HistoryContext';
import { COLORS } from './src/constants/theme';

export default function App() {
  return (
    <View style={styles.root}>
      <WatchlistProvider>
        <HistoryProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </HistoryProvider>
      </WatchlistProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
