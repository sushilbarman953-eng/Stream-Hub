import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, saveItem, STORAGE_KEYS } from '../utils/storage';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    getItem(STORAGE_KEYS.WATCHLIST, []).then((data) => {
      if (Array.isArray(data)) setWatchlist(data);
    });
  }, []);

  const toggleWatchlist = async (item) => {
    const exists = watchlist.some((i) => i.id === item.id);
    const updated = exists
      ? watchlist.filter((i) => i.id !== item.id)
      : [item, ...watchlist];

    setWatchlist(updated);
    await saveItem(STORAGE_KEYS.WATCHLIST, updated);
  };

  const isInWatchlist = (id) => watchlist.some((i) => i.id === id);

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
