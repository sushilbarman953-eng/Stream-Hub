import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

// Import providers & navigators to verify
import RootNavigator from './src/navigation/RootNavigator';
import { WatchlistProvider } from './src/context/WatchlistContext';
import { HistoryProvider } from './src/context/HistoryContext';
import { COLORS } from './src/constants/theme';

export default function App() {
  const diagnostics = {
    RootNavigator: typeof RootNavigator,
    WatchlistProvider: typeof WatchlistProvider,
    HistoryProvider: typeof HistoryProvider,
  };

  // If any component is undefined, render diagnostics on screen
  const hasUndefined = Object.values(diagnostics).some((type) => type === 'undefined');

  if (hasUndefined) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0D0C13" />
        <Text style={styles.errorTitle}>Diagnostic: Undefined Export Detected</Text>
        {Object.entries(diagnostics).map(([name, type]) => (
          <Text
            key={name}
            style={[styles.itemText, type === 'undefined' ? styles.bad : styles.good]}
          >
            {name}: {type}
          </Text>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS?.background || '#0D0C13'} />
      <WatchlistProvider>
        <HistoryProvider>
          <RootNavigator />
        </HistoryProvider>
      </WatchlistProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0C13',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    color: '#FF334B',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
    marginVertical: 4,
  },
  good: {
    color: '#00E676',
  },
  bad: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
});
