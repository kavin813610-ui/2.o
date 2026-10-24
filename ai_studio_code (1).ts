import React, { createContext, useContext, useState, useEffect } from 'react';
import { Watch, WatchStatus } from '../types/watch';
import { INITIAL_WATCHES } from '../data/defaultWatches';

interface WatchContextType {
  watches: Watch[];
  selectedWatch: Watch | null;
  setSelectedWatch: (watch: Watch | null) => void;
  inquiryWatch: Watch | null;
  setInquiryWatch: (watch: Watch | null) => void;
  isManagerOpen: boolean;
  setIsManagerOpen: (open: boolean) => void;
  addWatch: (newWatch: Omit<Watch, 'id' | 'dateAdded'>) => void;
  updateWatch: (id: string, updates: Partial<Watch>) => void;
  toggleStatus: (id: string, newStatus: WatchStatus) => void;
  deleteWatch: (id: string) => void;
  resetToDefaults: () => void;
  importWatches: (imported: Watch[]) => void;
}

const STORAGE_KEY = 'n_collection_watches_inr_v1';

const WatchContext = createContext<WatchContextType | undefined>(undefined);

export const WatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watches, setWatches] = useState<Watch[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (parsed[0].price >= 2000) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('Could not read saved watches from localStorage', e);
    }
    return INITIAL_WATCHES;
  });

  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [inquiryWatch, setInquiryWatch] = useState<Watch | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watches));
    } catch (e) {
      console.error('Failed to save watches to localStorage', e);
    }
  }, [watches]);

  useEffect(() => {
    if (selectedWatch) {
      const updated = watches.find(w => w.id === selectedWatch.id);
      if (updated) {
        setSelectedWatch(updated);
      }
    }
  }, [watches]);

  const addWatch = (newWatchData: Omit<Watch, 'id' | 'dateAdded'>) => {
    const newWatch: Watch = {
      ...newWatchData,
      id: `w-${Date.now().toString().slice(-6)}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setWatches(prev => [newWatch, ...prev]);
  };

  const updateWatch = (id: string, updates: Partial<Watch>) => {
    setWatches(prev =>
      prev.map(w => (w.id === id ? { ...w, ...updates } : w))
    );
  };

  const toggleStatus = (id: string, newStatus: WatchStatus) => {
    updateWatch(id, { status: newStatus });
  };

  const deleteWatch = (id: string) => {
    setWatches(prev => prev.filter(w => w.id !== id));
    if (selectedWatch?.id === id) setSelectedWatch(null);
    if (inquiryWatch?.id === id) setInquiryWatch(null);
  };

  const resetToDefaults = () => {
    setWatches(INITIAL_WATCHES);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WATCHES));
    } catch {
      // ignore
    }
  };

  const importWatches = (imported: Watch[]) => {
    if (Array.isArray(imported) && imported.length > 0) {
      setWatches(imported);
    }
  };

  return (
    <WatchContext.Provider
      value={{
        watches,
        selectedWatch,
        setSelectedWatch,
        inquiryWatch,
        setInquiryWatch,
        isManagerOpen,
        setIsManagerOpen,
        addWatch,
        updateWatch,
        toggleStatus,
        deleteWatch,
        resetToDefaults,
        importWatches
      }}
    >
      {children}
    </WatchContext.Provider>
  );
};

export const useWatches = () => {
  const context = useContext(WatchContext);
  if (!context) {
    throw new Error('useWatches must be used within a WatchProvider');
  }
  return context;
};