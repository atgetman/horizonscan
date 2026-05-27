import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

type WorkspaceNavigationContextType = {
  // Action to trigger opening an item
  openItem: (item: { name: string; type: string }) => void;
  // Callback registered by the WorkspacePage to handle the open action
  registerOpenHandler: (handler: (item: { name: string; type: string }) => void) => void;
  
  // Action to attach a file
  attachItem: (item: { name: string; type: string }) => void;
  // Callback registered by WorkspacePage to handle attachment
  registerAttachHandler: (handler: (item: { name: string; type: string }) => void) => void;

  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;

  isChatSidebarOpen: boolean;
  setChatSidebarOpen: (isOpen: boolean) => void;

  // Row drawer state for hiding sidebar
  isRowDrawerOpen: boolean;
  setRowDrawerOpen: (isOpen: boolean) => void;

  // Dynamic outputs management
  dynamicOutputs: Array<{ type: string; name: string }>;
  addDynamicOutput: (item: { type: string; name: string }) => void;
};

const WorkspaceNavigationContext = createContext<WorkspaceNavigationContextType | undefined>(undefined);

export function WorkspaceNavigationProvider({ children }: { children: ReactNode }) {
  const [openHandler, setOpenHandler] = useState<((item: { name: string; type: string }) => void) | null>(null);
  const [attachHandler, setAttachHandler] = useState<((item: { name: string; type: string }) => void) | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isChatSidebarOpen, setChatSidebarOpen] = useState(false);
  const [isRowDrawerOpen, setRowDrawerOpen] = useState(false);
  const [dynamicOutputs, setDynamicOutputs] = useState<Array<{ type: string; name: string }>>([]);

  const registerOpenHandler = useCallback((handler: (item: { name: string; type: string }) => void) => {
    setOpenHandler(() => handler);
  }, []);

  const registerAttachHandler = useCallback((handler: (item: { name: string; type: string }) => void) => {
    setAttachHandler(() => handler);
  }, []);

  const openItem = useCallback((item: { name: string; type: string }) => {
    if (openHandler) {
      openHandler(item);
    } else {
      console.warn("No open handler registered");
    }
  }, [openHandler]);

  const attachItem = useCallback((item: { name: string; type: string }) => {
    if (attachHandler) {
      attachHandler(item);
    } else {
      console.warn("No attach handler registered");
    }
  }, [attachHandler]);

  const addDynamicOutput = useCallback((item: { type: string; name: string }) => {
    setDynamicOutputs(prevOutputs => {
      // Check if the item already exists
      const exists = prevOutputs.some(output => output.name === item.name && output.type === item.type);
      if (exists) {
        return prevOutputs; // Don't add duplicate
      }
      return [item, ...prevOutputs]; // Add to the beginning of the array
    });
  }, []);

  const value = useMemo(() => ({
    openItem,
    registerOpenHandler,
    attachItem,
    registerAttachHandler,
    isSidebarOpen,
    setSidebarOpen,
    isChatSidebarOpen,
    setChatSidebarOpen,
    isRowDrawerOpen,
    setRowDrawerOpen,
    dynamicOutputs,
    addDynamicOutput
  }), [openItem, registerOpenHandler, attachItem, registerAttachHandler, isSidebarOpen, isChatSidebarOpen, isRowDrawerOpen, dynamicOutputs, addDynamicOutput]);

  return (
    <WorkspaceNavigationContext.Provider value={value}>
      {children}
    </WorkspaceNavigationContext.Provider>
  );
}

export function useWorkspaceNavigation() {
  const context = useContext(WorkspaceNavigationContext);
  if (context === undefined) {
    throw new Error('useWorkspaceNavigation must be used within a WorkspaceNavigationProvider');
  }
  return context;
}