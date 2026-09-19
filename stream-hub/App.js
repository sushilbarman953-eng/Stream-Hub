import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { WatchlistProvider } from './src/context/WatchlistContext';
import { HistoryProvider } from './src/context/HistoryContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <WatchlistProvider>
        <HistoryProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </HistoryProvider>
      </WatchlistProvider>
    </SafeAreaProvider>
  );
}
