import React from 'react';
import { StyleSheet, View, Text, StatusBar, SafeAreaView } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { WatchlistProvider } from './src/context/WatchlistContext';
import { HistoryProvider } from './src/context/HistoryContext';
import { COLORS } from './src/constants/theme';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <WatchlistProvider>
        <HistoryProvider>
          <RootNavigator />
        </HistoryProvider>
      </WatchlistProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
