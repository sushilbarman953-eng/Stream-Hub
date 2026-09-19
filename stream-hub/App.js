import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { WatchlistProvider } from './src/context/WatchlistContext';
import { HistoryProvider } from './src/context/HistoryContext';
import { COLORS } from './src/constants/theme';

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <WatchlistProvider>
        <HistoryProvider>
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
