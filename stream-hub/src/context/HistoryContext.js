import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, saveItem, STORAGE_KEYS } from '../utils/storage';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getItem(STORAGE_KEYS.CONTINUE_WATCHING, []).then((data) => {
      if (Array.isArray(data)) setHistory(data);
    });
  }, []);

  const updateProgress = async (item, progressSeconds, totalDuration) => {
    const record = {
      ...item,
      progressSeconds,
      totalDuration,
      updatedAt: Date.now(),
    };
    const filtered = history.filter((i) => i.id !== item.id);
    const updated = [record, ...filtered];
    setHistory(updated);
    await saveItem(STORAGE_KEYS.CONTINUE_WATCHING, updated);
  };

  const clearHistory = async () => {
    setHistory([]);
    await saveItem(STORAGE_KEYS.CONTINUE_WATCHING, []);
  };

  return (
    <HistoryContext.Provider value={{ history, updateProgress, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
