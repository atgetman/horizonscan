import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CitationData {
  id: string;
  source: string;
  title: string;
  snippet: string;
  type: 'case' | 'statute' | 'article' | 'record';
}

interface CitationContextType {
  activeCitation: CitationData | null;
  openCitation: (data: CitationData) => void;
  closeCitation: () => void;
}

const CitationContext = createContext<CitationContextType | undefined>(undefined);

export function CitationProvider({ children }: { children: ReactNode }) {
  const [activeCitation, setActiveCitation] = useState<CitationData | null>(null);

  const openCitation = (data: CitationData) => {
    setActiveCitation(data);
  };

  const closeCitation = () => {
    setActiveCitation(null);
  };

  return (
    <CitationContext.Provider value={{ activeCitation, openCitation, closeCitation }}>
      {children}
    </CitationContext.Provider>
  );
}

export function useCitation() {
  const context = useContext(CitationContext);
  if (context === undefined) {
    throw new Error('useCitation must be used within a CitationProvider');
  }
  return context;
}
