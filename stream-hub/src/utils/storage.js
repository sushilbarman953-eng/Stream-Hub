import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  DEFAULT_LANDING: '@streamhub_default_landing',
  CONTINUE_WATCHING: '@streamhub_continue_watching',
  WATCHLIST: '@streamhub_watchlist',
};

export const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key}:`, e);
  }
};

export const getItem = async (key, fallback = null) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : fallback;
  } catch (e) {
    console.error(`Error reading ${key}:`, e);
    return fallback;
  }
};
