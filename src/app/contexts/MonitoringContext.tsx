import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SavedAlert {
  id: string;
  topic: string;
  criteria: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'instant';
  practiceAreas: string[];
  jurisdictions: string[];
  status: 'active' | 'paused';
  lastScan: string;
  nextScan: string;
  alertCount: number;
  createdDate: string;
  sourceType?: 'regulatory-table' | 'manual';
}

interface MonitoringContextType {
  savedAlerts: SavedAlert[];
  addAlert: (alert: Omit<SavedAlert, 'id' | 'createdDate'>) => void;
  removeAlert: (id: string) => void;
  updateAlert: (id: string, alert: Partial<SavedAlert>) => void;
}

const MonitoringContext = createContext<MonitoringContextType | undefined>(undefined);

export function MonitoringProvider({ children }: { children: ReactNode }) {
  const [savedAlerts, setSavedAlerts] = useState<SavedAlert[]>([]);

  const addAlert = (alert: Omit<SavedAlert, 'id' | 'createdDate'>) => {
    const newAlert: SavedAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setSavedAlerts(prev => [...prev, newAlert]);
  };

  const removeAlert = (id: string) => {
    setSavedAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const updateAlert = (id: string, updates: Partial<SavedAlert>) => {
    setSavedAlerts(prev =>
      prev.map(alert => (alert.id === id ? { ...alert, ...updates } : alert))
    );
  };

  return (
    <MonitoringContext.Provider value={{ savedAlerts, addAlert, removeAlert, updateAlert }}>
      {children}
    </MonitoringContext.Provider>
  );
}

export function useMonitoring() {
  const context = useContext(MonitoringContext);
  if (context === undefined) {
    throw new Error('useMonitoring must be used within a MonitoringProvider');
  }
  return context;
}
