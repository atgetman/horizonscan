import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useSearchParams, useLocation } from "react-router";
import { clsx } from "clsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";
import { createPortal } from "react-dom";
import {
  MessageCirclePlus,
  MessageCircleMore,
  MessageCircleQuestion,
  FileText,
  Folder,
  Table,
  Plus,
  X,
  Loader2,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Share,
  Download,
  Trash2,
  BrushCleaning,
  Edit,
  BookOpen,
  Blocks,
  MessageSquare,
  UserPlus,
  Activity,
  Sparkles,
  Bell
} from "lucide-react";

import { DocumentToolbar } from "../components/DocumentToolbar";
import { SpreadsheetToolbar } from "../components/SpreadsheetToolbar";
import { MOCK_FILES, MOCK_CHATS, ALL_FILES, getWorkspaceFiles } from "../data/mockData";
import { useWorkspaceNavigation } from "../contexts/WorkspaceNavigationContext";
import { PromptInput } from "../components/PromptInput";
import { ActiveChatView } from "../components/ActiveChatView";
import { generateChatTitle } from "../services/ChatService";
import { useCitation } from "../contexts/CitationContext";
import { SourceViewer } from "../components/SourceViewer";
import { DocumentViewer } from "../components/DocumentViewer";
import { ChatSidebar, ChatMessage } from "../components/ChatSidebar";
import { SourcesPanel } from "../components/SourcesPanel";
import { HistoryPanel } from "../components/HistoryPanel";
import { CommentsPanel, Comment } from "../components/CommentsPanel";
import { CellCommentPopover } from "../components/CellCommentPopover";
import { SPREADSHEET_DATA } from "../components/DiscoveryOverviewSpreadsheet";
import { FILE_CITATIONS, FILE_HISTORY, HistoryEvent } from "../data/citationAndHistoryData";
import { AnimatePresence, motion } from "motion/react";
import { Dropdown, DropdownItem, DropdownSeparator } from "../components/ui/Dropdown";
import { MARegulatoryTable } from "../components/regulatory";
import { StreamingDocument } from "../components/StreamingDocument";
import { ShareModal } from "../components/ShareModal";
import { SkillTestingContent } from "../components/SkillTestingContent";
import { Library } from "./Library";
import { CPCHandoffScreen } from "../components/CPCHandoffScreen";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const HISTORICAL_CHATS_STRUCTURED: Record<string, { role: 'user' | 'assistant'; text: React.ReactNode }[]> = {
  "Research on SEC climate rules": [
    {
      role: 'user',
      text: "Summarize the key SEC requirements for climate-related governance and emissions disclosures in the 10-K."
    },
    {
      role: 'assistant',
      text: (
        <>
          <p className="text-[#212223] leading-relaxed mb-4">Here are the key requirements under the SEC's climate disclosure rules:</p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
             <h4 className="font-bold text-[#054688] mb-1">1. Governance — Regulation S-K Item 1501</h4>
             <p className="text-sm text-gray-600">Requires disclosure of the board's oversight of climate-related risks and management's role in assessing and managing those risks.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
             <h4 className="font-bold text-[#054688] mb-1">2. GHG Metrics — Regulation S-K Item 1505</h4>
             <p className="text-sm text-gray-600">Requires gross Scope 1 and Scope 2 emissions disclosure, including methodology, organizational boundaries, and assurance status, subject to phase-in.</p>
          </div>
        </>
      )
    }
  ],
  "Summary of vendor risk findings": [
    {
      role: 'user',
      text: "Summarize the key compliance gaps from the Cloudspan Inc. vendor review."
    },
    {
      role: 'assistant',
      text: (
        <>
          <p className="text-[#212223] leading-relaxed mb-4">Here are the key compliance gaps identified in the Cloudspan Inc. vendor review on Aug 14, 2024:</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-[#212223]">
            <li>No executed data processing agreement covering EU personal data transfers.</li>
            <li>Standard Contractual Clauses are referenced but not attached or signed.</li>
            <li>Breach-notification commitment is 14 days, exceeding the GDPR 72-hour requirement.</li>
          </ul>
        </>
      )
    }
  ],
  "Drafting disclosure language": [
    {
      role: 'user',
      text: "Help me draft the climate risk governance disclosure for the 10-K."
    },
    {
      role: 'assistant',
      text: (
        <>
          <p className="text-[#212223] leading-relaxed mb-4">Certainly. The disclosure should describe board and management oversight of climate-related risks and how those risks are integrated into the broader risk-management process.</p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
             <h4 className="font-bold text-[#054688] mb-1">Proposed Disclosure Text</h4>
             <p className="text-sm text-gray-600">"The Board's Risk Committee oversees climate-related risks, receiving quarterly reports from management. Material physical and transition risks are assessed through the Company's enterprise risk-management framework and reflected in strategic planning..."</p>
          </div>
        </>
      )
    }
  ]
};

type Tab = {
  id: string;
  title: string;
  type: 'file' | 'chat' | 'new-chat' | 'doc' | 'table' | 'skill-test';
  icon?: React.ElementType;
  content?: React.ReactNode;
  isDirty?: boolean;
  hideBottomInput?: boolean;
  isThinking?: boolean;
  isChatOpen?: boolean;
  isSourcesOpen?: boolean;
  isHistoryOpen?: boolean;
  isCommentsOpen?: boolean;
  chatMessages?: ChatMessage[];
  prompt?: string;
  workflowKey?: number; // Incremented to force ActiveChatView re-mount
  sourceChatMessages?: ChatMessage[]; // Messages from the chat that created this artifact
  sourceTabId?: string; // ID of the tab that created this artifact (for navigating back)
  lastUpdated?: number; // Timestamp for "edited X ago"
  documentHistory?: HistoryEvent[]; // Document-specific history for AI edits
  undoStack?: string[]; // HTML snapshots for undo
  redoStack?: string[]; // HTML snapshots for redo
  skillName?: string; // For skill-test tabs
};

export function WorkspacePage() {
  const { workspaceName } = useParams();
  const decodedName = decodeURIComponent(workspaceName || "Untitled Workspace");
  const { isSidebarOpen, setSidebarOpen, registerOpenHandler, isChatSidebarOpen, addDynamicOutput } = useWorkspaceNavigation();
  const { activeCitation, closeCitation } = useCitation();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Check if URL params want to open something specific
  const openParam = searchParams.get('open');
  const typeParam = searchParams.get('type');
  const hasUrlParams = !!(openParam && typeParam);
  
  // Only start with a default tab if there are NO URL params
  const [tabs, setTabs] = useState<Tab[]>(() => {
    if (hasUrlParams) {
      // Don't create any tabs initially - let the URL param handler create the appropriate tab
      return [];
    }
    return [{ id: 'new-1', title: 'New chat', type: 'new-chat', icon: MessageCirclePlus }];
  });
  const [activeTabId, setActiveTabId] = useState<string>(hasUrlParams ? '' : 'new-1');
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{id: string, name: string, type: string}[]>([]);
  const [promptText, setPromptText] = useState<string>("");
  const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  
  console.log('🏠 WorkspacePage render - promptText:', promptText);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null);
  const [tabDropdownOpen, setTabDropdownOpen] = useState<string | null>(null);
  const [tabDropdownPosition, setTabDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [showOpenInSubmenu, setShowOpenInSubmenu] = useState(false);
  const [hasStreamedMotionToDismiss, setHasStreamedMotionToDismiss] = useState(false);
  const [artifactSourceChats, setArtifactSourceChats] = useState<Record<string, ChatMessage[]>>({});
  const [dismissedRegulatoryChanges, setDismissedRegulatoryChanges] = useState<Set<string>>(new Set());
  
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  
  // Share modal state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareModalItem, setShareModalItem] = useState<{ name: string; type: 'output' | 'file' | 'folder' | 'matter' | 'document' | 'tab'; initialMode?: 'share' | 'manage' }>({ name: '', type: 'document' });

  // Comment popover state
  const [activeComment, setActiveComment] = useState<Comment | null>(null);
  const [commentPopoverVisible, setCommentPopoverVisible] = useState(false);
  const [spreadsheetNavigationRequest, setSpreadsheetNavigationRequest] = useState<{ document: string; column: string } | null>(null);
  
  // Chat mode and CoCounsel token - persisted to localStorage
  const [chatMode, setChatMode] = useState<'chatgpt' | 'hybrid'>(() => {
    const saved = localStorage.getItem('cocounsel_chat_mode');
    return saved === 'hybrid' ? 'hybrid' : 'chatgpt';
  });
  const [cocounselToken, setCocounselToken] = useState<string>(() => {
    return localStorage.getItem('cocounsel_id_token') || '';
  });
  
  useEffect(() => {
    localStorage.setItem('cocounsel_chat_mode', chatMode);
  }, [chatMode]);
  
  useEffect(() => {
    if (cocounselToken) {
      localStorage.setItem('cocounsel_id_token', cocounselToken);
    }
  }, [cocounselToken]);

  // Source Viewer Resizing
  const [sourceViewerWidth, setSourceViewerWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tabDropdownRef = useRef<HTMLDivElement>(null);
  
  // Track mount status to prevent updates during navigation/unmount
  const isMountedRef = useRef(true);

  // Stable ref to the impact-analysis opener so URL-param effects (which run
  // before the function is defined in render order) can invoke it.
  const handleViewImpactAnalysisRef = useRef<(() => void) | null>(null);
  
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Listen for skill share events from ActiveChatView
  useEffect(() => {
    const handleSkillShare = (event: Event) => {
      console.log('🎯 openSkillShare event received:', event);
      const customEvent = event as CustomEvent;
      const skillData = customEvent.detail;
      console.log('📤 Skill data:', skillData);
      if (skillData) {
        console.log('🔧 Setting share modal item and opening modal');
        // Update state directly without setTimeout to test
        setShareModalItem({ name: skillData.name, type: 'file' });
        setShareModalOpen(true);
        console.log('✅ State setters called - shareModalOpen should now be true');
      }
    };

    window.addEventListener('openSkillShare', handleSkillShare);

    return () => {
      window.removeEventListener('openSkillShare', handleSkillShare);
    };
  }, []);

  // Listen for CPC initiation events from regulatory table
  useEffect(() => {
    console.log('🎧 Setting up initiateCPC event listener');
    const handleCPCInitiation = (event: Event) => {
      console.log('========================================');
      console.log('🚀 WORKSPACE PAGE: CPC EVENT RECEIVED!');
      console.log('========================================');
      const customEvent = event as CustomEvent;
      const { regulation, docsAffected, clausesAffected, impactLevel } = customEvent.detail;
      console.log('📊 CPC Details:', { regulation, docsAffected, clausesAffected, impactLevel });
      console.log('📍 Current activeTabId:', activeTabId);
      console.log('📚 All tabs:', tabs.map(t => ({ id: t.id, title: t.title, type: t.type, sourceTabId: t.sourceTabId })));

      // Find the current active tab (should be the regulatory table tab)
      const currentTab = tabs.find(t => t.id === activeTabId);
      console.log('📋 Current active tab:', currentTab);
      if (!currentTab) {
        console.error('❌ No current tab found for activeTabId:', activeTabId);
        return;
      }
      console.log('📋 Current tab type:', currentTab.type);
      console.log('📋 Current tab sourceTabId:', currentTab.sourceTabId);

      // Create CPC prompt text
      const cpcPromptText = `Initiate Cross-Product Clause analysis for: ${regulation}`;

      // Store workflow data in sessionStorage for ActiveChatView to use
      sessionStorage.setItem('pendingCPCWorkflow', JSON.stringify({
        docsAffected,
        clausesAffected,
        impactLevel
      }));
      console.log('💾 Stored CPC workflow data in sessionStorage:', { docsAffected, clausesAffected, impactLevel });

      // Check if the current tab has a sourceTabId (it was opened from a chat)
      if (currentTab.sourceTabId) {
        console.log('📍 Found source tab ID - but creating NEW CPC tab instead of modifying source:', currentTab.sourceTabId);
        
        // ALWAYS create a new CPC chat tab - don't append to existing chat
        const newTabId = `cpc-${Date.now()}`;
        const cpcUserMessage = {
          role: 'user' as const,
          text: cpcPromptText,
        };
        const newTab: Tab = {
          id: newTabId,
          title: 'CPC Analysis',
          type: 'chat',
          prompt: cpcPromptText, // Prompt triggers the workflow
          chatMessages: [cpcUserMessage], // ONLY the CPC message - fresh start
          lastUpdated: Date.now(),
          hideBottomInput: true, // Hide workspace-level input
        };
        // Close the regulatory table tab and add the new CPC chat tab
        setTabs(prev => [...prev.filter(t => t.id !== currentTab.id), newTab]);
        setActiveTabId(newTabId);
      } else {
        // No source tab - this was opened from workspace "View impact analysis"
        // Create a new chat tab with CPC workflow
        console.log('ℹ️ No source tab - creating new chat tab for CPC');
        const newTabId = `cpc-${Date.now()}`;
        const cpcUserMessage = {
          role: 'user' as const,
          text: cpcPromptText,
        };
        const newTab: Tab = {
          id: newTabId,
          title: 'CPC Analysis',
          type: 'chat',
          prompt: cpcPromptText, // Prompt triggers the workflow
          chatMessages: [cpcUserMessage], // Add initial user message
          lastUpdated: Date.now(),
          hideBottomInput: true, // Hide workspace-level input
        };
        // Close the regulatory table tab and add the new CPC chat tab
        setTabs(prev => [...prev.filter(t => t.id !== currentTab.id), newTab]);
        setActiveTabId(newTabId);
      }
    };

    window.addEventListener('initiateCPC', handleCPCInitiation);
    console.log('✅ initiateCPC listener attached');

    return () => {
      console.log('🗑️ Removing initiateCPC listener');
      window.removeEventListener('initiateCPC', handleCPCInitiation);
    };
  }, [tabs, activeTabId]);

  // Refs for stable handler access
  const hasStreamedMotionToDismissRef = useRef(hasStreamedMotionToDismiss);
  const artifactSourceChatsRef = useRef(artifactSourceChats);
  
  useEffect(() => {
    hasStreamedMotionToDismissRef.current = hasStreamedMotionToDismiss;
  }, [hasStreamedMotionToDismiss]);
  
  useEffect(() => {
    artifactSourceChatsRef.current = artifactSourceChats;
  }, [artifactSourceChats]);

  // Check for pending CPC data from StandaloneViewPage
  useEffect(() => {
    const checkPendingCPC = () => {
      console.log('🔍 Checking for pending CPC data in sessionStorage');
      const pendingData = sessionStorage.getItem('pendingCPCData');
      if (pendingData) {
        console.log('✅ Found pending CPC data!');
        const { regulation, docsAffected, clausesAffected, impactLevel, sourceTabId } = JSON.parse(pendingData);
        console.log('📊 CPC data:', { regulation, docsAffected, clausesAffected, impactLevel, sourceTabId });

        // Clear the pending data
        sessionStorage.removeItem('pendingCPCData');
        console.log('🗑️ Cleared pending CPC data from sessionStorage');

        // Store workflow data for ActiveChatView to use
        sessionStorage.setItem('pendingCPCWorkflow', JSON.stringify({
          docsAffected,
          clausesAffected,
          impactLevel
        }));
        console.log('💾 Stored CPC workflow data in sessionStorage');

        const cpcUserMessage = {
          role: 'user' as const,
          text: `Initiate Cross-Product Clause analysis for: ${regulation}`,
        };

        if (sourceTabId) {
          // Continue existing chat - find the tab and add workflow prompt
          console.log('📍 Found source tab ID:', sourceTabId);

          // Wait for tabs to be available
          setTimeout(() => {
            setTabs(prev => {
              const sourceTab = prev.find(t => t.id === sourceTabId);

              if (sourceTab) {
                console.log('✅ Found source tab, adding CPC workflow prompt');
                setActiveTabId(sourceTabId);
                return prev.map(tab => {
                  if (tab.id === sourceTabId) {
                    return {
                      ...tab,
                      chatMessages: [...(tab.chatMessages || []), cpcUserMessage],
                      prompt: cpcUserMessage.text,
                      workflowKey: (tab.workflowKey || 0) + 1, // Force re-mount
                      hideBottomInput: true, // Hide workspace-level input
                    };
                  }
                  return tab;
                });
              } else {
                console.log('⚠️ Source tab not found, creating new tab');
                // Create a new tab if source tab doesn't exist anymore
                const newTabId = `cpc-${Date.now()}`;
                const newTab: Tab = {
                  id: newTabId,
                  title: 'CPC Analysis',
                  type: 'chat',
                  chatMessages: [cpcUserMessage],
                  prompt: cpcUserMessage.text,
                  lastUpdated: Date.now(),
                  hideBottomInput: true, // Hide workspace-level input
                };
                setActiveTabId(newTabId);
                return [...prev, newTab];
              }
            });
          }, 100);
        } else {
          // No source tab - create a new chat tab with CPC workflow
          console.log('➕ No source tab, creating new CPC chat tab');
          const newTabId = `cpc-${Date.now()}`;
          const newTab: Tab = {
            id: newTabId,
            title: 'CPC Analysis',
            type: 'chat',
            chatMessages: [cpcUserMessage],
            prompt: cpcUserMessage.text,
            lastUpdated: Date.now(),
            hideBottomInput: true, // Hide workspace-level input
          };
          setTabs(prev => [...prev, newTab]);
          setActiveTabId(newTabId);
          console.log('✅ CPC chat tab created and activated');
        }
      } else {
        console.log('❌ No pending CPC data found');
      }
    };

    checkPendingCPC();
  }, []); // Run once on mount

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - containerRect.left;
      const newWidthPx = containerRect.width - relativeX;
      
      // Convert to percentage
      let newWidthPercent = (newWidthPx / containerRect.width) * 100;
      
      // Clamp between 20% and 80%
      newWidthPercent = Math.max(20, Math.min(80, newWidthPercent));
      
      setSourceViewerWidth(newWidthPercent);
      
      if (isSourceExpanded) setIsSourceExpanded(false);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [isResizing, isSourceExpanded]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const activeTabIdRef = useRef(activeTabId);
  const tabsRef = useRef(tabs);
  const promptTextRef = useRef(promptText);
  const attachedFilesRef = useRef(attachedFiles);

  // --- Persistence & Initialization ---
  useEffect(() => {
    if (!isMountedRef.current) return; // Don't load if component is unmounting
    
    // 1. Force Sidebar Open on Navigation
    setSidebarOpen(true);

    // 2. Load Tabs from LocalStorage
    const saved = localStorage.getItem(`workspace_tabs_${decodedName}`);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.tabs && Array.isArray(parsed.tabs) && parsed.tabs.length > 0) {
                // Reconstruct tabs with content
                const restoredTabs = parsed.tabs.map((t: any) => {
                    let content: React.ReactNode = null;
                    let icon = FileText;

                    // Restore chat messages by merging historical structure with saved user messages
                    // This handles the issue where React Nodes cannot be serialized/deserialized
                    if (t.type === 'chat') {
                        const historical = HISTORICAL_CHATS_STRUCTURED[t.title] || [];
                        const savedMessages = (t.chatMessages || []).filter((m: any) => typeof m.text === 'string');
                        
                        // Avoid duplicating if we somehow saved historical messages as strings previously (unlikely given the error)
                        // But strictly speaking, historical messages have ReactNode text, so they are filtered out above.
                        // So we just prepend historical.
                        t.chatMessages = [...historical, ...savedMessages];
                    }

                    if (t.type === 'new-chat') {
                        icon = MessageCirclePlus;
                        // Content is rendered conditionally in return, but we can set null here as placeholder
                    } else if (t.type === 'chat') {
                        icon = MessageCircleMore;
                        // Define handlers for this tab
                        const handleThinkingChange = (isThinking: boolean) => {
                            setTabs(prev => prev.map(pt => pt.id === t.id ? { ...pt, isThinking } : pt));
                        };
                        const handleMessagesChange = (msgs: any[]) => {
                             setTabs(prev => prev.map(pt => pt.id === t.id ? { ...pt, chatMessages: msgs } : pt));
                        };

                        content = (
                            <ActiveChatView 
                                prompt={t.prompt || ''} 
                                attachments={[]} 
                                onNewPrompt={(p, f) => {}} 
                                onThinkingChange={handleThinkingChange}
                                onOpenTab={handleOpenItem}
                                initialMessages={t.chatMessages}
                                onMessagesChange={handleMessagesChange}
                                onArtifactCreated={handleArtifactCreated}
                                mode={chatMode}
                                cocounselToken={cocounselToken}
                            />
                        );
                        // Ensure hideBottomInput is set for restored chat tabs
                        t.hideBottomInput = true;
                    } else {
                        // File/Doc/Table/Research
                        if (t.type === 'folder') icon = Folder;
                        else if (t.type === 'table') icon = Table;
                        else if (t.type === 'research') icon = MessageCircleQuestion;
                        
                        // Re-fetch mock content
                        content = MOCK_FILES[t.title];
                        
                        // If content is a function, call it to get the actual component
                        if (typeof content === 'function') {
                          content = content();
                        }
                        
                        if (!content && t.type === 'chat') content = MOCK_CHATS[t.title];
                        if (!content) {
                             content = (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <FileText className="size-16 mb-4 opacity-20" />
                                    <p>Preview not available for {t.title}</p>
                                </div>
                             );
                        }
                    }

                    return {
                        ...t,
                        icon,
                        content
                    };
                });
                
                setTabs(restoredTabs);
                
                // Always default to "New chat" tab
                const existingNewChat = restoredTabs.find(t => t.type === 'new-chat');
                if (existingNewChat) {
                    setActiveTabId(existingNewChat.id);
                } else {
                    // If no "New chat" tab exists (e.g. user closed it), create one and prepend it
                    const newChatTab: Tab = {
                        id: Math.random().toString(36).substr(2, 9),
                        title: 'New chat',
                        type: 'new-chat',
                        icon: MessageCirclePlus
                    };
                    setTabs([newChatTab, ...restoredTabs]);
                    setActiveTabId(newChatTab.id);
                }
            } else {
                // If saved data is empty or invalid, fallback to default
                 setTabs([{ id: 'new-1', title: 'New chat', type: 'new-chat', icon: MessageCirclePlus }]);
                 setActiveTabId('new-1');
            }
        } catch (e) {
            console.error("Failed to parse saved tabs", e);
             setTabs([{ id: 'new-1', title: 'New chat', type: 'new-chat', icon: MessageCirclePlus }]);
             setActiveTabId('new-1');
        }
    } else {
         // Default if nothing saved
         setTabs([{ id: 'new-1', title: 'New chat', type: 'new-chat', icon: MessageCirclePlus }]);
         setActiveTabId('new-1');
    }
    setIsLoaded(true);
  }, [decodedName]);

  // 3. Save Tabs to LocalStorage
  useEffect(() => {
    if (!isLoaded || !isMountedRef.current) return; // Don't save if not loaded or unmounting

    // Filter out circular references and React nodes
    const serializedTabs = tabs.map(t => ({
        id: t.id,
        title: t.title,
        type: t.type,
        prompt: t.prompt,
        // Only save messages where text is a string (user input or simple assistant responses)
        // This avoids serializing React Nodes which causes errors on restore
        chatMessages: t.chatMessages?.filter(m => typeof m.text === 'string'),
        // Save sourceChatMessages (including workflowData)
        sourceChatMessages: t.sourceChatMessages?.map(m => ({
          role: m.role,
          text: typeof m.text === 'string' ? m.text : String(m.text),
          attachments: m.attachments,
          isFigmaContent: m.isFigmaContent,
          workflowData: m.workflowData ? {
            showReasoning: m.workflowData.showReasoning,
            showSources: m.workflowData.showSources,
            showPreparing: m.workflowData.showPreparing,
            documentTitle: m.workflowData.documentTitle,
            artifactIntro: m.workflowData.artifactIntro,
            artifactDescription: m.workflowData.artifactDescription
          } : undefined
        })),
        isChatOpen: t.isChatOpen,
        isSourcesOpen: t.isSourcesOpen,
        isHistoryOpen: t.isHistoryOpen,
        hideBottomInput: t.hideBottomInput
    }));

    const serialized = {
        activeTabId,
        tabs: serializedTabs
    };
    
    localStorage.setItem(`workspace_tabs_${decodedName}`, JSON.stringify(serialized));
  }, [tabs, activeTabId, decodedName, isLoaded]);
  
  // Close citation when changing tabs or component unmounts
  useEffect(() => {
    closeCitation();
  }, [activeTabId]);
  
  useEffect(() => {
    return () => {
       closeCitation();
    }
  }, []);

  // Reset expansion when citation closes
  useEffect(() => {
    if (!activeCitation) {
      setIsSourceExpanded(false);
    }
  }, [activeCitation]);
  
  // Handle sidebar state when citation opens/closes
  const prevCitationRef = useRef(activeCitation);
  const wasSidebarOpenRef = useRef(isSidebarOpen);

  useEffect(() => {
    if (!isMountedRef.current) return; // Don't handle during unmount
    
    const isOpening = !prevCitationRef.current && activeCitation;
    const isClosing = prevCitationRef.current && !activeCitation;

    if (isOpening) {
      wasSidebarOpenRef.current = isSidebarOpen;
      if (window.innerWidth < 1300) {
        setSidebarOpen(false);
      }
    } else if (isClosing) {
      if (wasSidebarOpenRef.current) {
        setSidebarOpen(true);
      }
    }
    
    prevCitationRef.current = activeCitation;
  }, [activeCitation, isSidebarOpen, setSidebarOpen]);

  useEffect(() => {
    tabsRef.current = tabs;
  }, [tabs]);

  useEffect(() => {
    promptTextRef.current = promptText;
  }, [promptText]);

  useEffect(() => {
    attachedFilesRef.current = attachedFiles;
  }, [attachedFiles]);

  useEffect(() => {
    if (!isMountedRef.current) return; // Don't cleanup during unmount
    
    const prevTabId = activeTabIdRef.current;
    if (prevTabId && prevTabId !== activeTabId) {
        // Find the previous tab in the CURRENT tabs list (before we potentially modify it)
        const prevTab = tabsRef.current.find(t => t.id === prevTabId);
        
        // If it was a new-chat tab and input is empty
        if (prevTab && prevTab.type === 'new-chat') {
            const isEmpty = !(promptTextRef.current || '').trim() && attachedFilesRef.current.length === 0;
            
            if (isEmpty) {
                // Remove it
                setTabs(prev => prev.filter(t => t.id !== prevTabId));
            }
        }
    }
    activeTabIdRef.current = activeTabId;
  }, [activeTabId]);

  // Removed handleAttachFile and handleRemoveAttachment as PromptInput handles this logic internally or via onFilesChange

  const handleThinkingChange = useCallback((tabId: string, isThinking: boolean) => {
    if (!isMountedRef.current) return; // Prevent updates during unmount
    setTabs(prev => prev.map(t => 
      t.id === tabId ? { ...t, isThinking } : t
    ));
  }, []); // No external dependencies, uses updater function

  // Wrapper for addDynamicOutput that also stores source chat messages
  const handleArtifactCreated = useCallback((item: { name: string, type: string, sourceChatMessages?: any[] }) => {
    if (!isMountedRef.current) return; // Prevent updates during unmount
    addDynamicOutput({ name: item.name, type: item.type });
    if (item.sourceChatMessages) {
      setArtifactSourceChats(prev => ({
        ...prev,
        [item.name]: item.sourceChatMessages
      }));
    }
  }, [addDynamicOutput]); // addDynamicOutput is from context, should be stable

  const openItemLogic = useCallback((item: { name: string, type: string, sourceTabId?: string }) => {
     // First check if tab already exists
     const existingTab = tabsRef.current.find(t => t.title === item.name);
     if (existingTab) {
       setActiveTabId(existingTab.id);
       return;
     }

     // Special handling for skill-test type
     if (item.type === 'skill-test') {
       const newTab: Tab = {
         id: Math.random().toString(36).substr(2, 9),
         title: item.name,
         type: 'skill-test',
         icon: Blocks,
         skillName: item.name,
         hideBottomInput: true
       };
       
       // Now update tabs FIRST
       setTabs(currentTabs => {
         const currentActiveId = activeTabIdRef.current;
         const activeIndex = currentTabs.findIndex(t => t.id === currentActiveId);
         
         if (activeIndex !== -1) {
             const newTabs = [...currentTabs];
             newTabs.splice(activeIndex + 1, 0, newTab);
             return newTabs;
         }
         
         // Check if there is a "New chat" tab at the beginning
         const firstTab = currentTabs[0];
         if (firstTab && firstTab.type === 'new-chat') {
             return [firstTab, newTab, ...currentTabs.slice(1)];
         }
         
         return [newTab, ...currentTabs];
       });
       
       // THEN set active tab after the tab is added
       setActiveTabId(newTab.id);
       
       return; // Exit early for skill-test
     }

     // Special handling for skill type (opens side panel)
     if (item.type === 'skill') {
       console.log('🔧 Opening skill in side panel:', item.name);
       setSidebarOpen(true);
       // TODO: Implement actual skill details panel
       return;
     }

     // Special handling for regulatory-table type and monitor type
     if (item.type === 'regulatory-table' || item.type === 'monitor') {
       const newTab: Tab = {
         id: Math.random().toString(36).substr(2, 9),
         title: item.name,
         type: 'regulatory-table',
         icon: Table,
         hideBottomInput: true,
         sourceTabId: item.sourceTabId // Store the source tab ID
       };

       // Update tabs and set active tab after the next render
       setTabs(currentTabs => {
         const currentActiveId = activeTabIdRef.current;
         const activeIndex = currentTabs.findIndex(t => t.id === currentActiveId);

         if (activeIndex !== -1) {
             const newTabs = [...currentTabs];
             newTabs.splice(activeIndex + 1, 0, newTab);
             return newTabs;
         }

         // Check if there is a "New chat" tab at the beginning
         const firstTab = currentTabs[0];
         if (firstTab && firstTab.type === 'new-chat') {
             return [firstTab, newTab, ...currentTabs.slice(1)];
         }

         return [newTab, ...currentTabs];
       });

       // Use setTimeout to ensure tab is added before activating
       setTimeout(() => {
         setActiveTabId(newTab.id);
       }, 0);

       return; // Exit early for regulatory-table/monitor
     }

     // Determine content
     let content = MOCK_FILES[item.name];
     
     // If content is a function, call it to get the actual component
     if (typeof content === 'function') {
       content = content();
     }
     
    // Use StreamingDocument for SEC Comment Letter Response
    if (item.name === 'SEC Comment Letter Response') {
       // Only stream on first auto-open, not on subsequent manual opens
       const shouldStream = !hasStreamedMotionToDismissRef.current;
       content = <StreamingDocument shouldStream={shouldStream} />;
       if (shouldStream) {
         setHasStreamedMotionToDismiss(true);
       }
     }
     
     if (!content && item.type === 'chat') {
       content = MOCK_CHATS[item.name];
     }
     
     // Fallback content if no mock data
     if (!content) {
        content = (
         <div className="flex flex-col items-center justify-center h-full text-gray-400">
             <FileText className="size-16 mb-4 opacity-20" />
             <p>Preview not available for {item.name}</p>
         </div>
        );
     }

     const newTab: Tab = {
       id: Math.random().toString(36).substr(2, 9),
       title: item.name,
       type: item.type as any,
       icon: item.type === 'chat' ? MessageCircleMore : (item.type === 'research' ? MessageCircleQuestion : (item.type === 'folder' ? Folder : (item.type === 'table' ? Table : FileText))),
       content: content,
       hideBottomInput: item.type === 'chat',
       sourceChatMessages: artifactSourceChatsRef.current[item.name], // Attach source chat if it exists
       isChatOpen: false // Don't auto-open chat panel when artifact is automatically opened
     };
     
     // Now update tabs FIRST
     setTabs(currentTabs => {
       const currentActiveId = activeTabIdRef.current;
       const activeIndex = currentTabs.findIndex(t => t.id === currentActiveId);
       
       if (activeIndex !== -1) {
           const newTabs = [...currentTabs];
           newTabs.splice(activeIndex + 1, 0, newTab);
           return newTabs;
       }
       
       // Check if there is a "New chat" tab at the beginning
       const firstTab = currentTabs[0];
       if (firstTab && firstTab.type === 'new-chat') {
           return [firstTab, newTab, ...currentTabs.slice(1)];
       }
       
       return [newTab, ...currentTabs];
     });
     
     // THEN set active tab after the tab is added
     setActiveTabId(newTab.id);
  }, []); // Empty array since we use refs for all state access

  const handleOpenItem = useCallback((item: { name: string, type: string }) => {
    // Pass the current active tab ID as the source
    openItemLogic({ ...item, sourceTabId: activeTabId });
  }, [openItemLogic, activeTabId]);
  
  const handleOpenLibraryModal = () => {
    setIsLibraryModalOpen(true);
  };
  
  const handleCloseLibraryModal = () => {
    // Use requestAnimationFrame to ensure proper cleanup
    requestAnimationFrame(() => {
      setIsLibraryModalOpen(false);
    });
  };
  
  const handleLibraryPromptSelect = (prompt: string) => {
    setPromptText(prompt);
    setAttachedFiles([]); // Reset attached files when selecting from library
    setIsLibraryModalOpen(false);
  };
  
  const handleCommentClick = (comment: Comment) => {
    // Find the row index in the spreadsheet data
    const rowIndex = SPREADSHEET_DATA.findIndex(row => row[0] === comment.document);
    
    if (rowIndex !== -1) {
      // Store the navigation request
      setSpreadsheetNavigationRequest({ document: comment.document, column: comment.column });
      
      // Dispatch custom event to navigate to the cell
      const event = new CustomEvent('navigateToSpreadsheetCell', {
        detail: { document: comment.document, column: comment.column }
      });
      window.dispatchEvent(event);
      
      // Show the comment popover
      setActiveComment(comment);
      setCommentPopoverVisible(true);
    }
  };
  
  const handleCloseCommentPopover = () => {
    setCommentPopoverVisible(false);
    setActiveComment(null);
  };

  const handlePromptSubmit = (text: string, files: {id: string, name: string, type: string}[]) => {
      // Create a suitable title (e.g. first 30 chars)
      const title = text.length > 30 ? text.substring(0, 30) + '...' : text;
      
      const tabId = Math.random().toString(36).substr(2, 9);
      
      const handleThinkingChange = (isThinking: boolean) => {
          setTabs(prev => prev.map(t => 
              t.id === tabId ? { ...t, isThinking } : t
          ));
      };

      const handleMessagesChange = (msgs: any[]) => {
          setTabs(prev => prev.map(t => 
              t.id === tabId ? { ...t, chatMessages: msgs } : t
          ));
      };

      // Generate AI title asynchronously
      generateChatTitle(text)
        .then(generatedTitle => {
          setTabs(currentTabs => 
              currentTabs.map(t => 
                  t.id === tabId ? { ...t, title: generatedTitle } : t
              )
          );
        })
        .catch(err => {
            console.warn("Failed to update chat title:", err);
            // Title remains the truncated prompt set initially
        });

      const newChatTab: Tab = {
          id: tabId,
          title: title,
          type: 'chat',
          icon: MessageCircleMore,
          prompt: text, // Store prompt
          hideBottomInput: true
      };

      setTabs(prev => {
        const activeTabIndex = prev.findIndex(t => t.id === activeTabId);
        if (activeTabIndex !== -1 && prev[activeTabIndex].type === 'new-chat') {
            // Replace "New chat" tab
            const newTabs = [...prev];
            newTabs[activeTabIndex] = newChatTab;
            return newTabs;
        } else {
            // Append new tab
            return [...prev, newChatTab];
        }
      });
      
      setActiveTabId(tabId);
      
      // Clear attached files from the main input
      setAttachedFiles([]);
      setPromptText("");
  };

  // Register handlers
  useEffect(() => {
    registerOpenHandler(openItemLogic);
    // attach handler is now registered by PromptInput
  }, []); // Empty dependency array - registerOpenHandler and openItemLogic are stable

  // Handle URL query params for opening items
  useEffect(() => {
    if (!isMountedRef.current) return; // Don't handle params during unmount

    const openParam = searchParams.get('open');
    const typeParam = searchParams.get('type');
    const impactParam = searchParams.get('impact');

    if (openParam && typeParam) {
      openItemLogic({ name: openParam, type: typeParam });
      
      // Clear the URL params after opening the item
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('open');
      newSearchParams.delete('type');
      setSearchParams(newSearchParams, { replace: true });
    }

    // Deep-link from the Horizon Scan toast: auto-open the regulatory impact
    // analysis for this workspace so the user lands directly on the affected docs.
    if (impactParam === '1') {
      handleViewImpactAnalysisRef.current?.();

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('impact');
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [searchParams]); // Only depend on searchParams, openItemLogic is stable with refs

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    
    if (activeTabId === tabId) {
      if (newTabs.length > 0) {
        setActiveTabId(newTabs[newTabs.length - 1].id);
      } else {
        const defaultTab: Tab = { id: 'new-1', title: 'New chat', type: 'new-chat', icon: MessageCirclePlus };
        setTabs([defaultTab]);
        setActiveTabId(defaultTab.id);
      }
    }
  };

  const handleAddChat = () => {
    const existingNewChatTab = tabs.find(t => t.type === 'new-chat');
    if (existingNewChatTab) {
      setActiveTabId(existingNewChatTab.id);
      return;
    }
    const newTab: Tab = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New chat',
      type: 'new-chat',
      icon: MessageCirclePlus
    };
    // Prepend the new chat tab to the beginning of the list
    setTabs([newTab, ...tabs]);
    setActiveTabId(newTab.id);
  };

  const toggleTabChat = (tabId: string) => {
    const wasPreviewerOpen = !!activeCitation; // Check if previewer was open
    closeCitation(); // Close citation if open
    setTabs(prev => prev.map(t => 
        t.id === tabId ? { 
          ...t, 
          // If previewer was open, always turn ON chat (don't toggle)
          isChatOpen: wasPreviewerOpen ? true : !t.isChatOpen,
          isSourcesOpen: false, 
          isHistoryOpen: false,
          isCommentsOpen: false
        } : t
    ));
  };

  const toggleTabSources = (tabId: string) => {
    const wasPreviewerOpen = !!activeCitation; // Check if previewer was open
    closeCitation(); // Close citation if open
    setTabs(prev => prev.map(t => 
        t.id === tabId ? { 
          ...t, 
          // If previewer was open, always turn ON sources (don't toggle)
          isSourcesOpen: wasPreviewerOpen ? true : !t.isSourcesOpen, 
          isChatOpen: false, 
          isHistoryOpen: false,
          isCommentsOpen: false
        } : t
    ));
  };

  const toggleTabHistory = (tabId: string) => {
    const wasPreviewerOpen = !!activeCitation; // Check if previewer was open
    closeCitation(); // Close citation if open
    setTabs(prev => prev.map(t => 
        t.id === tabId ? { 
          ...t, 
          // If previewer was open, always turn ON history (don't toggle)
          isHistoryOpen: wasPreviewerOpen ? true : !t.isHistoryOpen, 
          isChatOpen: false, 
          isSourcesOpen: false,
          isCommentsOpen: false
        } : t
    ));
  };

  const toggleTabComments = (tabId: string) => {
    const wasPreviewerOpen = !!activeCitation; // Check if previewer was open
    closeCitation(); // Close citation if open
    setTabs(prev => prev.map(t => 
        t.id === tabId ? { 
          ...t, 
          // If previewer was open, always turn ON comments (don't toggle)
          isCommentsOpen: wasPreviewerOpen ? true : !t.isCommentsOpen, 
          isChatOpen: false, 
          isSourcesOpen: false,
          isHistoryOpen: false
        } : t
    ));
  };

  // Add history entry to document
  const addDocumentHistoryEntry = (tabId: string, entry: { description: string; editId?: string; originalText?: string; revisedText?: string }) => {
    setTabs(prev => prev.map(t => {
      if (t.id !== tabId) return t;
      
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      const timestamp = `${displayHours}:${displayMinutes} ${ampm} Today`;
      
      const newEntry: HistoryEvent = {
        id: `h-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        user: 'CoCounsel',
        action: 'edited',
        description: entry.description,
        timestamp,
        avatarColor: 'bg-[#de6633]',
        editId: entry.editId,
        originalText: entry.originalText,
        revisedText: entry.revisedText
      };
      
      const existingHistory = t.documentHistory || [];
      return {
        ...t,
        documentHistory: [newEntry, ...existingHistory],
        lastUpdated: Date.now()
      };
    }));
  };

  // Handle history card click - scroll to and highlight the edit
  const handleHistoryClick = (event: HistoryEvent) => {
    if (!event.editId) return;
    
    console.log('History card clicked:', event.id, 'looking for edit:', event.editId);
    
    // Find the element with the edit ID
    const editElement = document.querySelector(`[data-history-edit-id="${event.editId}"]`) as HTMLElement;
    
    if (!editElement) {
      console.warn('Could not find edit element:', event.editId);
      return;
    }
    
    console.log('Found edit element:', editElement);
    
    // Find the scrollable container (the div with overflow-y-auto that contains the DocumentViewer)
    const scrollContainer = editElement.closest('.overflow-y-auto') as HTMLElement;
    
    if (scrollContainer) {
      // Calculate the position of the edit element relative to the scrollable container
      const containerRect = scrollContainer.getBoundingClientRect();
      const editRect = editElement.getBoundingClientRect();
      
      // Calculate how much to scroll to center the element
      const relativeTop = editRect.top - containerRect.top;
      const scrollOffset = scrollContainer.scrollTop + relativeTop - (containerRect.height / 2) + (editRect.height / 2);
      
      // Smooth scroll the container
      scrollContainer.scrollTo({
        top: scrollOffset,
        behavior: 'smooth'
      });
    } else {
      // Fallback to scrollIntoView if we can't find the container
      editElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Add temporary highlight effect
    const originalBg = editElement.style.backgroundColor;
    const originalTransition = editElement.style.transition;
    
    editElement.style.transition = 'background-color 0.3s ease';
    editElement.style.backgroundColor = 'rgba(222, 102, 51, 0.2)'; // CoCounsel orange
    
    // Select the text
    const range = document.createRange();
    range.selectNodeContents(editElement);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    // Remove highlight after 2 seconds
    setTimeout(() => {
      editElement.style.backgroundColor = originalBg;
      setTimeout(() => {
        editElement.style.transition = originalTransition;
      }, 300);
    }, 2000);
  };

  const updateTabChatMessages = useCallback((tabId: string, messages: ChatMessage[]) => {
    if (!isMountedRef.current) return; // Prevent updates during unmount
    setTabs(prev => prev.map(t => 
        t.id === tabId ? { ...t, chatMessages: messages } : t
    ));
  }, []); // No external dependencies, uses updater function

  const handleClearTabs = () => {
    console.log('handleClearTabs called, current tabs:', tabs.length);
    // Close all tabs and create a fresh "New chat" tab
    const defaultTab: Tab = { 
      id: Math.random().toString(36).substr(2, 9), 
      title: 'New chat', 
      type: 'new-chat', 
      icon: MessageCirclePlus 
    };
    console.log('Setting tabs to single new chat tab');
    setTabs([defaultTab]);
    setActiveTabId(defaultTab.id);
    setIsTabMenuOpen(false);
  };

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tabMenuRef.current && 
        !tabMenuRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTabMenuOpen(false);
      }
    };

    if (isTabMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTabMenuOpen]);

  // Click outside handler for tab dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tabDropdownRef.current &&
        !tabDropdownRef.current.contains(event.target as Node)
      ) {
        setTabDropdownOpen(null);
      }
    };

    if (tabDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tabDropdownOpen]);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const showInput = activeTab && ((activeTab.type === 'chat' && !activeTab.hideBottomInput) || activeTab.type === 'new-chat');

  // Get workspace-specific regulatory alert content
  const getRegulatoryAlertContent = () => {
    const workspaceAlerts: Record<string, { title: string; description: string; tableName: string } | null> = {
      'SEC Climate Disclosure Program': {
        title: 'New regulatory changes detected',
        description: '3 regulatory updates may affect documents in this workspace: SEC Climate Disclosure Rules (12 docs), EPA GHG Reporting Updates (8 docs), EU CSRD Alignment Guidance (5 docs).',
        tableName: 'Climate Disclosure Impact Analysis'
      },
      'GDPR Cross-Border Data Transfer Review': {
        title: 'Cross-border transfer requirements updated',
        description: '5 regulatory updates detected: EU-U.S. Data Privacy Framework Changes (18 docs), Updated Standard Contractual Clauses (11 docs), EDPB Transfer Guidance (7 docs), Schrems II Supplementary Measures (9 docs), UK IDTA Revisions (6 docs).',
        tableName: 'Data Transfer Impact Analysis'
      },
      'CCPA & State Privacy Compliance': {
        title: 'State privacy law changes',
        description: '4 new state privacy rules may impact consumer disclosures: CPRA Regulation Amendments (6 docs), New 2025 State Privacy Statutes (10 docs), Sensitive Data Rules (4 docs), Universal Opt-Out Requirements (7 docs).',
        tableName: 'State Privacy Compliance Review'
      },
      'EU AI Act Readiness': null, // No alert for this workspace
      'AML / KYC Policy Refresh': null, // No alert for this workspace
      'Vendor DPA Remediation': {
        title: 'Data processing requirements updated',
        description: '2 new privacy regulations may affect vendor agreements: FTC Safeguards Rule Updates (4 docs), GDPR Article 28 Guidance (3 docs).',
        tableName: 'Vendor DPA Compliance Review'
      }
    };

    // Return specific alert or default for unlisted workspaces
    if (decodedName in workspaceAlerts) {
      return workspaceAlerts[decodedName];
    }

    // Default alert for other workspaces
    return {
      title: 'New regulatory changes detected',
      description: '3 regulatory updates may affect documents in this workspace: Recent compliance changes (8 docs), New disclosure requirements (6 docs), Industry-specific rule updates (4 docs).',
      tableName: 'Regulatory Impact Analysis'
    };
  };

  const handleViewImpactAnalysis = () => {
    const alertContent = getRegulatoryAlertContent();
    const newTabId = `regulatory-${Date.now()}`;
    const newTab: Tab = {
      id: newTabId,
      title: alertContent.tableName,
      type: 'regulatory-table',
      icon: Table,
      content: <MARegulatoryTable />,
      lastUpdated: Date.now(),
    };

    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTabId);
  };

  // Keep the ref pointed at the latest opener so deep-link effects can call it.
  handleViewImpactAnalysisRef.current = handleViewImpactAnalysis;

  return (
    <div className="flex-1 h-full flex bg-[#FCFCFC]">
      {/* Sidebar removed from here, managed by Layout */}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* Top Header / Tab Bar */}
        <style>{`
          @keyframes slideDown {
            0% { transform: translateY(-100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}</style>
        <div 
          className="h-[44px] flex items-end px-2 border-b border-[#E3E4E6] shrink-0 gap-1 pt-2 overflow-visible bg-[#f7f7f7]"
          style={{
            transform: 'translateY(-100%)',
            opacity: 0,
            animation: 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards'
          }}
          data-tour-step="6"
        >
           {!isSidebarOpen && (
               <div className="flex items-center gap-0.5 mr-2 mb-1">
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1.5 rounded-md hover:bg-[#f3f4f6] text-[#666666] shrink-0"
                     >
                        <Folder className="size-4 text-[#D64000] fill-[#D64000]/10" />
                     </button>
                   </TooltipTrigger>
                   <TooltipContent side="right">
                     <p>{decodedName}</p>
                   </TooltipContent>
                 </Tooltip>
               </div>
           )}

           {/* Add Chat Button - only visible when no new-chat tab exists */}
           {!tabs.some(t => t.type === 'new-chat') && (
             <button 
               onClick={handleAddChat}
               className="mr-1 p-1 rounded-[6px] hover:bg-[#C0C0C0] text-[#212223] transition-colors mb-1.5 shrink-0 bg-[#ffffff] border border-[#E3E4E6] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
               title="New chat"
             >
               <Plus className="size-3.5" />
             </button>
           )}

           <div className="flex items-end gap-1 flex-1 min-w-0">
             {tabs.map((tab) => {
               // Helper function to build folder path from the workspace's file tree
               const getFolderPathForFile = (fileName: string): string => {
                 const workspaceFiles = getWorkspaceFiles(decodedName);
                 const fileItem = workspaceFiles.find(f => f.name === fileName);
                 if (!fileItem || !fileItem.parentId) return '';
                 
                 const buildPath = (parentId: string | null): string[] => {
                   if (!parentId) return [];
                   const parent = workspaceFiles.find(f => f.id === parentId);
                   if (!parent) return [];
                   return [...buildPath(parent.parentId), parent.name];
                 };
                 
                 const pathParts = buildPath(fileItem.parentId);
                 return pathParts.length > 0 ? `... / ${pathParts.join(' / ')}` : '';
               };
               
               // Generate metadata for tooltip
               const getTabMetadata = () => {
                 const now = new Date();
                 // Use stored timestamp if available, otherwise generate a stable one based on tab id
                 const lastUpdatedTimestamp = tab.lastUpdated || now.getTime() - Math.abs(parseInt(tab.id, 36) % (7 * 24 * 60 * 60 * 1000));
                 const lastUpdated = new Date(lastUpdatedTimestamp);
                 
                 // Calculate relative time
                 const diff = now.getTime() - lastUpdated.getTime();
                 const minutes = Math.floor(diff / 60000);
                 const hours = Math.floor(diff / 3600000);
                 const days = Math.floor(diff / 86400000);
                 
                 let relativeTime = '';
                 if (minutes < 60) {
                   relativeTime = minutes <= 1 ? '1 minute ago' : `${minutes} minutes ago`;
                 } else if (hours < 24) {
                   relativeTime = hours === 1 ? '1 hour ago' : `${hours} hours ago`;
                 } else {
                   relativeTime = days === 1 ? '1 day ago' : `${days} days ago`;
                 }
                 
                 // For chat tabs (outputs), use "... / Outputs"
                 let folderPath = '';
                 if (tab.type === 'chat') {
                   folderPath = '... / Outputs';
                 } else {
                   folderPath = getFolderPathForFile(tab.title);
                 }
                 
                 return {
                   folderPath,
                   lastUpdated: relativeTime
                 };
               };
               
               const metadata = getTabMetadata();
               const showTooltip = tab.type !== 'new-chat';
               const isTabActive = activeTabId === tab.id;
               
               const handleTabClick = (e: React.MouseEvent) => {
                 // Don't switch tabs if clicking on chevron or close button
                 if ((e.target as HTMLElement).closest('button')) {
                   return;
                 }
                 
                 // If tab is already active, open dropdown
                 if (isTabActive && tab.type !== 'new-chat') {
                   const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                   setTabDropdownPosition({
                     top: rect.bottom + 4,
                     left: rect.left
                   });
                   setTabDropdownOpen(tab.id);
                 } else {
                   // Otherwise just activate the tab
                   setActiveTabId(tab.id);
                 }
               };
               
               const handleChevronClick = (e: React.MouseEvent) => {
                 e.stopPropagation();
                 
                 // Only open dropdown if this tab is already active
                 if (activeTabId !== tab.id) {
                   setActiveTabId(tab.id);
                   return;
                 }
                 
                 // Toggle dropdown
                 if (tabDropdownOpen === tab.id) {
                   setTabDropdownOpen(null);
                 } else {
                   const rect = (e.currentTarget as HTMLElement).closest('.group')?.getBoundingClientRect();
                   if (rect) {
                     setTabDropdownPosition({
                       top: rect.bottom + 4,
                       left: rect.left
                     });
                     setTabDropdownOpen(tab.id);
                   }
                 }
               };
               
               const tabElement = (
                 <div 
                   key={tab.id}
                   onClick={(e) => {
                     // Only switch tabs if not clicking on a button
                     if (!(e.target as HTMLElement).closest('button')) {
                       setActiveTabId(tab.id);
                     }
                   }}
                   className={clsx(
                     "group relative flex items-center gap-1.5 py-1.5 rounded-t-lg cursor-pointer text-[13px] select-none border-t border-x",
                     "transition-[width,background-color,border-color,box-shadow] duration-200 ease-in-out",
                     tab.type === 'new-chat' ? "pl-2 pr-3" : "px-2",
                     activeTabId === tab.id
                       ? "bg-[#FCFCFC] border-[#E3E4E6] text-[#212223] shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.03)] -mb-[1px] z-10 h-[37px] font-medium"
                       : "hover:bg-[#f3f4f6] border-transparent text-[#666666] h-[36px]",
                     tab.type !== 'new-chat' && "min-w-[120px] max-w-[200px]"
                   )}
                 >
                    {tab.isThinking && activeTabId !== tab.id ? (
                      <Loader2 className="size-3.5 shrink-0 animate-spin text-gray-500" />
                    ) : (
                      tab.icon && <tab.icon className={clsx("size-3.5 shrink-0 pl-0.5", tab.type === 'skill-test' ? "text-[#de6633]" : (activeTabId === tab.id ? "text-[#212223]" : "text-[#666666]"))} />
                    )}
                   
                   <span 
                     className="truncate flex-1 min-w-0"
                     onClick={handleTabClick}
                   >
                     {tab.title}
                   </span>
                   
                   {tab.type !== 'new-chat' && (
                   <>
                     {/* Chevron button - shows on hover */}
                     <button 
                       onClick={handleChevronClick}
                       className={clsx(
                         "p-0.5 rounded-md group-hover:bg-black/10 shrink-0",
                         isTabActive ? "block" : "hidden"
                       )}
                     >
                       <ChevronDown className="size-3" />
                     </button>
                     
                     {/* Close button */}
                     <button 
                       onClick={(e) => handleCloseTab(e, tab.id)}
                       className={clsx(
                         "p-0.5 rounded-md hover:bg-black/10 shrink-0",
                         isTabActive ? "block" : "hidden group-hover:block"
                       )}
                     >
                       <X className="size-3" />
                     </button>
                   </>
                   )}
                 </div>
               );
               
               if (!showTooltip) {
                 return tabElement;
               }
               
               return (
                 <Tooltip key={tab.id} delayDuration={0}>
                   <TooltipTrigger asChild>
                     {tabElement}
                   </TooltipTrigger>
                   <TooltipContent side="bottom" hideArrow className="bg-white text-[#212223] border border-gray-200 shadow-lg max-w-[300px] p-3">
                     <div className="space-y-0.5">
                       <p className="font-medium text-sm leading-tight">{tab.title}</p>
                       {metadata.folderPath && (
                         <p className="text-xs text-gray-500 leading-tight">{metadata.folderPath}</p>
                       )}
                       <p className="text-xs text-gray-500 leading-tight">Edited {metadata.lastUpdated}</p>
                     </div>
                   </TooltipContent>
                 </Tooltip>
               );
             })}
           </div>

           <div ref={tabMenuRef} className="relative mb-1 shrink-0">
             <button
               onClick={(e) => {
                 if (!isTabMenuOpen && tabMenuRef.current) {
                   const rect = tabMenuRef.current.getBoundingClientRect();
                   setMenuPosition({
                     top: rect.bottom + 4,
                     right: window.innerWidth - rect.right
                   });
                 }
                 setIsTabMenuOpen(!isTabMenuOpen);
               }}
               disabled={tabs.length === 1 && activeTab?.type === 'new-chat'}
               className="text-[#666666] hover:bg-white p-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
             >
               <MoreHorizontal className="size-4" />
             </button>
           </div>
        </div>

        {/* Portal Dropdown */}
        {isTabMenuOpen && menuPosition && createPortal(
          <div 
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              right: `${menuPosition.right}px`,
              zIndex: 9999
            }}
          >
            <Dropdown className="w-40" ref={dropdownRef}>
              <DropdownItem
                onClick={() => {
                  setIsTabMenuOpen(false);
                  setShareModalItem({ name: activeTab?.label || '', type: 'tab' });
                  setShareModalOpen(true);
                }}
                icon={<Share className="size-3.5" />}
                disabled={activeTab?.type === 'new-chat'}
              >
                Share
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  setIsTabMenuOpen(false);
                  console.log('Download clicked');
                }}
                icon={<Download className="size-3.5" />}
                disabled={activeTab?.type === 'new-chat'}
              >
                Download
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  setIsTabMenuOpen(false);
                  console.log('Delete clicked');
                }}
                icon={<Trash2 className="size-3.5" />}
                disabled={activeTab?.type === 'new-chat'}
              >
                Delete
              </DropdownItem>

              <DropdownSeparator />

              <DropdownItem
                onClick={handleClearTabs}
                icon={<BrushCleaning className="size-3.5" />}
                disabled={tabs.length === 1 && tabs[0]?.type === 'new-chat'}
              >
                Clear tabs
              </DropdownItem>
            </Dropdown>
          </div>,
          document.body
        )}

        {/* Tab Dropdown */}
        {tabDropdownOpen && tabDropdownPosition && createPortal(
          <div
            style={{
              position: 'fixed',
              top: `${tabDropdownPosition.top}px`,
              left: `${tabDropdownPosition.left}px`,
              zIndex: 9999
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Dropdown className="w-40" ref={tabDropdownRef}>
              <DropdownItem
                onClick={() => {
                  setTabDropdownOpen(null);
                  const tabToShare = tabs.find(t => t.id === tabDropdownOpen);
                  if (tabToShare) {
                    setShareModalItem({ name: tabToShare.label, type: 'tab' });
                    setShareModalOpen(true);
                  }
                }}
                icon={<Share className="size-3.5" />}
              >
                Share
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  setTabDropdownOpen(null);
                  console.log('Rename clicked');
                }}
                icon={<Edit className="size-3.5" />}
              >
                Rename
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  setTabDropdownOpen(null);
                  console.log('Download clicked');
                }}
                icon={<Download className="size-3.5" />}
              >
                Download
              </DropdownItem>

              <div 
                className="relative"
                onMouseEnter={() => setShowOpenInSubmenu(true)}
                onMouseLeave={() => setShowOpenInSubmenu(false)}
              >
                <DropdownItem
                  onClick={() => {
                    // Do nothing on click, submenu handles the actions
                  }}
                  icon={
                    <svg className="size-3.5" viewBox="0 0 2048 2048" focusable="false">
                      <path fill="#2B579A" d="M1562 102q74 0 126 53 52 52 53 127v1484q0 74-53 127-52 52-126 53h-948q-99 0-179-58-78-56-110-147h-120q-85 0-145-60-60-60-60-145v-512q0-85 60-145 60-60 145-60h102v-409q0-127 90-218 90-90 217-90h948z m76 1212q-37 18-76 17h-640v205q0 85-60 145-60 60-145 60h-280q27 47 74 74 48 28 103 28h948q32 0 54-22 22-22 22-55v-452z m-980-290l-64 338-68-338h-133l-65 338-66-338h-108l106 512h133l68-307 65 307 132 0 110-512-110 0z m980-325q-37 18-76 18h-948q-56 0-103 28-46 27-74 74h280q85 0 145 60 60 60 60 145v205h640q32 0 54-23 22-22 22-54v-453z m-1024-494q-85 0-144 60-60 60-60 145v283q88-79 204-79h948q32 0 54-22 22-22 22-54v-256q0-32-22-55-22-22-54-22h-948z"/>
                      <path fill="#41A5EE" d="M307 1489l717-875 717 518v634q0 74-53 127-52 52-126 53h-948q-127 0-217-90-90-90-90-218v-149z"/>
                      <path fill="#2B7CD3" d="M307 872q0-95 68-163 67-67 163-67h1044l159-130v640q0 74-53 127-52 52-126 52h-948q-127 0-217 90-90 90-90 217v-766z"/>
                      <path fill="#185ABD" d="M307 410q0-127 90-218 90-90 217-90h948q74 0 126 53 52 52 53 127v256q0 74-53 126-52 52-126 53h-948q-127 0-217 90-90 90-90 217v-614z"/>
                      <path fill="#103F91" d="M717 819h-512q-85 0-145 60-60 60-60 145v512q0 85 60 145 60 60 145 60h512q85 0 145-60 60-60 60-145v-512q0-85-60-145-60-60-145-60z"/>
                      <path fill="#FFFFFF" d="M768 1024l-110 512-132 0-65-307-68 307h-133l-106-512h108l66 338 65-338h133l68 338 64-338 110 0z"/>
                    </svg>
                  }
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Open in...</span>
                    <ChevronRight className="size-3 ml-2" />
                  </div>
                </DropdownItem>

                {/* Submenu */}
                {showOpenInSubmenu && (
                  <div
                    className="absolute left-full top-0 ml-1"
                    style={{ minWidth: '140px' }}
                  >
                    <Dropdown>
                      <DropdownItem
                        onClick={() => {
                          setTabDropdownOpen(null);
                          setShowOpenInSubmenu(false);
                          console.log('Google Docs clicked');
                        }}
                      >
                        Google Docs
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setTabDropdownOpen(null);
                          setShowOpenInSubmenu(false);
                          console.log('Microsoft Word clicked');
                        }}
                      >
                        Microsoft Word
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setTabDropdownOpen(null);
                          setShowOpenInSubmenu(false);
                          console.log('PDF clicked');
                        }}
                      >
                        PDF
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setTabDropdownOpen(null);
                          setShowOpenInSubmenu(false);
                          console.log('SVG clicked');
                        }}
                      >
                        SVG
                      </DropdownItem>
                    </Dropdown>
                  </div>
                )}
              </div>

              <DropdownSeparator />

              <DropdownItem
                onClick={() => {
                  if (tabDropdownOpen) {
                    handleCloseTab(new MouseEvent('click') as any, tabDropdownOpen);
                  }
                  setTabDropdownOpen(null);
                }}
                icon={<Trash2 className="size-3.5" />}
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>,
          document.body
        )}

        <div className="flex-1 flex overflow-hidden relative">
          <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
            {/* Center Content */}
            <>
            {activeTab?.type === 'new-chat' && (
              <div className="flex-1 flex overflow-hidden">
                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto bg-[#FCFCFC]">
                  <div className="flex flex-col items-center px-8 w-full max-w-5xl mx-auto pt-12">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-[#de6633]" style={{ filter: 'drop-shadow(0 4px 12px rgba(222, 102, 51, 0.4))' }}>
                        <Folder className="size-5.5 fill-current" />
                      </div>
                      <span className="text-[21px] text-[#666666] font-normal tracking-tight">{decodedName}</span>
                    </div>

                    <h1 className="text-[30px] font-normal text-[#123021] mb-8 text-center tracking-tight leading-[1.2]">
                      What's next for this workspace?
                    </h1>

                    {/* Chat Input Area */}
                    <div className="w-full max-w-[750px] mx-auto pb-8" data-tour-step="4">
                <PromptInput
                  withFlourish={true}
                  files={attachedFiles}
                  onFilesChange={setAttachedFiles}
                  onSubmit={handlePromptSubmit}
                  value={promptText}
                  onChange={setPromptText}
                />
              </div>

              {/* Regulatory Changes */}
              {!dismissedRegulatoryChanges.has('workspace-reg-alert') && (() => {
                const alertContent = getRegulatoryAlertContent();
                if (!alertContent) return null;

                return (
                  <div className="mb-6 w-full max-w-[750px]">
                    <div className="bg-[#FFF9F0] border border-[#F5D6A3] rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] relative">
                      <button
                        onClick={() => {
                          const newDismissed = new Set(dismissedRegulatoryChanges);
                          newDismissed.add('workspace-reg-alert');
                          setDismissedRegulatoryChanges(newDismissed);
                        }}
                        className="absolute top-3 right-3 p-1 hover:bg-[#F5D6A3] rounded text-[#666666] transition-colors"
                        title="Dismiss"
                      >
                        <X className="size-3.5" />
                      </button>
                      <div className="flex items-start gap-3 pr-8">
                        <div className="w-5 h-5 rounded-full bg-[#F5A623] flex items-center justify-center shrink-0 mt-0.5">
                          <Bell className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[14px] font-medium text-[#1F1F1F] mb-1">
                            {alertContent.title}
                          </h4>
                          <p className="text-[13px] text-[#666] leading-[1.5] mb-3">
                            {alertContent.description}
                          </p>
                          <button
                            onClick={handleViewImpactAnalysis}
                            className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all"
                          >
                            View impact analysis
                            <ChevronRight className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Suggested next steps */}
              <div className="mb-8 w-full max-w-[750px]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="size-5 text-[#666]" />
                  <h3 className="text-[18px] font-medium text-[#1F1F1F] font-['Clario']">
                    Suggested next steps
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4" data-tour-step="8">
                  <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer">
                    <h4 className="text-[16px] font-medium text-[#1F1F1F] mb-2">
                      Refine latest response
                    </h4>
                    <p className="text-[14px] text-[#666] leading-[1.5] mb-4">
                      Review my SEC comment response. The emissions assurance section relies on conclusory language — no methodology, no
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-[#F0F0F0]">
                      <div className="w-5 h-5 rounded border border-[#D0D0D0] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="w-5 h-5 rounded border border-[#D0D0D0] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <div className="w-5 h-5 rounded border border-[#D0D0D0] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer">
                    <h4 className="text-[16px] font-medium text-[#1F1F1F] mb-2">
                      Amend stockholders agreement
                    </h4>
                    <p className="text-[14px] text-[#666] leading-[1.5] mb-4">
                      Please draft an amendment to the uploaded stockholders' agreement reflecting the changes
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-[#F0F0F0]">
                      <div className="w-5 h-5 rounded border border-[#D0D0D0] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="w-5 h-5 rounded border border-[#D0D0D0] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <div className="w-5 h-5 rounded border border-[#D0D0D0] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer">
                    <h4 className="text-[16px] font-medium text-[#1F1F1F] mb-2">
                      Prepare for upcoming negotiation
                    </h4>
                    <p className="text-[14px] text-[#666] leading-[1.5] mb-4">
                      Flag all ambiguous provisions in this agreement, identify which ambiguities favor our
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-[#F0F0F0]">
                      <div className="w-5 h-5 rounded border border-[#D0D0D0] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="w-5 h-5 rounded border border-[#D0D0D0] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer">
                    <h4 className="text-[16px] font-medium text-[#1F1F1F] mb-2">
                      Cross-State Contract Compliance
                    </h4>
                    <p className="text-[14px] text-[#666] leading-[1.5] mb-4">
                      I'm General Counsel for OHL. We're expanding into Texas. Please review the attached
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-[#F0F0F0]">
                      <div className="w-5 h-5 rounded border border-[#D0D0D0] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="w-5 h-5 rounded border border-[#D0D0D0] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* More ideas button */}
                <div className="flex justify-center mt-6">
                  <button className="flex items-center gap-2 px-4 py-2 text-[14px] text-[#666] hover:text-[#1F1F1F] border border-[#E5E5E5] rounded-lg hover:border-[#D0D0D0] transition-colors bg-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    More ideas
                  </button>
                </div>
              </div>
            </div>
          </div>

            {/* Team Activity Sidebar */}
            <div className="w-[340px] border-l border-[#E5E5E5] bg-[#FCFCFC] shrink-0 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="size-5 text-[#1F1F1F]" />
                  <h3 className="text-[18px] font-medium text-[#1F1F1F] font-['Clario']">
                    Team activity
                  </h3>
                  <span className="px-2 py-0.5 bg-[#FFF0E6] text-[#de6633] text-[12px] font-medium rounded">
                    3 @mentions
                  </span>
                </div>

                {/* TODAY section */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#999]" />
                  <span className="text-[13px] font-semibold text-[#999] uppercase tracking-wide">
                    TODAY
                  </span>
                </div>

                <div className="relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-[#E5E5E5]" />

                  <div className="space-y-6 relative">
                    {/* Activity Item 1 - Commented */}
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="relative z-10 bg-[#FCFCFC] pr-1">
                          <MessageSquare className="size-5 text-[#666]" />
                        </div>
                        <span className="text-[15px] text-[#1F1F1F]">
                          <span className="font-semibold">Michael Roberts</span> commented
                        </span>
                      </div>
                      <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 ml-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)] relative">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="size-4 text-[#666]" />
                          <span className="text-[14px] font-medium text-[#1F1F1F]">SEC Comment Letter Response</span>
                        </div>
                        <p className="text-[14px] text-[#1F1F1F] leading-[1.5]">
                          Reviewed the response draft and suggested addressing two more staff comments
                        </p>
                        <span className="absolute bottom-3 right-3 text-[11px] text-[#999]">8:45 AM</span>
                      </div>
                    </div>

                    {/* Activity Item 2 - Added user */}
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="relative z-10 bg-[#FCFCFC] pr-1">
                          <UserPlus className="size-5 text-[#666]" />
                        </div>
                        <span className="text-[15px] text-[#1F1F1F]">
                          <span className="font-semibold">Emily Chen</span> added user
                        </span>
                      </div>
                      <div className="bg-white border border-[#E5E5E5] rounded-lg p-3 ml-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center gap-2 relative">
                        <div className="w-6 h-6 rounded-full bg-[#5B7B6E] flex items-center justify-center text-white text-[11px] font-medium border-2 border-white">
                          K
                        </div>
                        <span className="text-[14px] text-[#1F1F1F]">Kevin Johnson</span>
                        <span className="absolute bottom-3 right-3 text-[11px] text-[#999]">7:30 AM</span>
                      </div>
                    </div>

                    {/* Activity Item 3 - Added 4 comments */}
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="relative z-10 bg-[#FCFCFC] pr-1">
                          <MessageSquare className="size-5 text-[#666]" />
                        </div>
                        <span className="text-[15px] text-[#1F1F1F]">
                          <span className="font-semibold">Michael Roberts</span> added 4 comments
                        </span>
                      </div>
                      <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 ml-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)] relative">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="size-4 text-[#666]" />
                          <span className="text-[14px] font-medium text-[#1F1F1F]">Stockholders agreeement</span>
                        </div>
                        <p className="text-[14px] text-[#1F1F1F] leading-[1.5]">
                          Should we revise the termination clause language to align with the latest case law on contract termination?
                        </p>
                        <span className="absolute bottom-3 right-3 text-[11px] text-[#999]">6:45 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tabs.map((tab) => {
            if (tab.type === 'new-chat') return null;
            const isActive = activeTabId === tab.id;
    const isDoc = (tab.type === 'file' || tab.type === 'doc' || tab.type === 'research') && !tab.title.endsWith('.pdf') && !tab.title.endsWith('.xlsx') && !tab.title.endsWith('.pst') && !tab.title.endsWith('.csv') && tab.title !== 'Vendor Risk Register';
    const isSpreadsheet = tab.type === 'table' || tab.type === 'regulatory-table' || tab.title.endsWith('.xlsx') || tab.title.endsWith('.csv') || tab.title === 'Vendor Risk Register';
            const showSourceViewer = isActive && !!activeCitation;

            // Visibility Logic: Panels are hidden if Source Viewer (Citation) is open
            const isChatVisible = !!tab.isChatOpen && !showSourceViewer;
            const isSourcesVisible = !!tab.isSourcesOpen && !showSourceViewer;
            const isHistoryVisible = !!tab.isHistoryOpen && !showSourceViewer;
            const isCommentsVisible = !!tab.isCommentsOpen && !showSourceViewer;

            return (
              <div 
                key={tab.id}
                className={clsx(
                  "flex-1 flex h-full bg-[#FCFCFC] overflow-hidden",
                  isActive ? "flex" : "hidden"
                )}
              >
                 {/* Left Panel: Content + Toolbar */}
                 <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
                    {isDoc && (
                      <div className="shrink-0 mb-2">
                        <DocumentToolbar 
                           isChatOpen={isChatVisible}
                           onToggleChat={() => toggleTabChat(tab.id)}
                           isSourcesOpen={isSourcesVisible}
                           onToggleSources={() => toggleTabSources(tab.id)}
                           isHistoryOpen={isHistoryVisible}
                           onToggleHistory={() => toggleTabHistory(tab.id)}
                           isCommentsOpen={isCommentsVisible}
                           onToggleComments={() => toggleTabComments(tab.id)}
                           documentName={tab.label}
                        />
                      </div>
                    )}
                    {isSpreadsheet && (
                       <div className="shrink-0 p-[0px]">
                           <SpreadsheetToolbar 
                               isChatOpen={isChatVisible}
                               onToggleChat={() => toggleTabChat(tab.id)}
                               isCommentsOpen={isCommentsVisible}
                               onToggleComments={() => toggleTabComments(tab.id)}
                               isHistoryOpen={isHistoryVisible}
                               onToggleHistory={() => toggleTabHistory(tab.id)}
                            />
                       </div>
                    )}
                    <div 
                        ref={isActive ? containerRef : undefined}
                        className="flex-1 flex overflow-hidden relative"
                    >
                        <div className={clsx("flex-1 h-full", (isDoc || tab.type !== 'chat') ? "overflow-y-auto" : "overflow-hidden", isDoc && "px-4")}>
                            {tab.type === 'skill-test' ? (
                                <SkillTestingContent skillName={tab.skillName || tab.title} />
                            ) : tab.type === 'regulatory-table' ? (
                                <MARegulatoryTable />
                            ) : isDoc ? (
                                tab.content && (
                                    <DocumentViewer
                                        onAddHistoryEntry={(entry) => addDocumentHistoryEntry(tab.id, entry)}
                                    >
                                        {tab.content}
                                    </DocumentViewer>
                                )
                            ) : (
                                tab.type === 'chat' ? (
                                    <ActiveChatView
                                        key={`${tab.id}-${tab.workflowKey || 0}`}
                                        prompt={tab.prompt || ""}
                                        attachments={[]}
                                        onNewPrompt={() => {}}
                                        onThinkingChange={(isThinking) => {
                                          if (isMountedRef.current) {
                                            handleThinkingChange(tab.id, isThinking);
                                          }
                                        }}
                                        onOpenTab={handleOpenItem}
                                        initialMessages={
                                            (tab.chatMessages && tab.chatMessages.length > 0)
                                                ? (tab.chatMessages as any)
                                                : (HISTORICAL_CHATS_STRUCTURED[tab.title] as any)
                                        }
                                        onMessagesChange={(msgs) => {
                                          if (isMountedRef.current) {
                                            updateTabChatMessages(tab.id, msgs);
                                          }
                                        }}
                                        onArtifactCreated={handleArtifactCreated}
                                        mode={chatMode}
                                        cocounselToken={cocounselToken}
                                        currentTabId={tab.id}
                                    />
                                ) : (
                                    tab.content || (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                            <p>No content available</p>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                        <AnimatePresence>
                          {(isDoc || isSpreadsheet) && isChatVisible && (
                            <motion.div 
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="shrink-0 h-full z-30 flex"
                            >
                                <ChatSidebar 
                                    messages={tab.sourceChatMessages || tab.chatMessages || []}
                                    onMessagesChange={(msgs) => updateTabChatMessages(tab.id, msgs)}
                                />
                            </motion.div>
                          )}
                          
                          {isDoc && isSourcesVisible && (
                            <motion.div 
                                key="sources-panel"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="shrink-0 h-full z-30 flex"
                            >
                                <SourcesPanel 
                                  citations={FILE_CITATIONS[tab.title] || []}
                                  onClose={() => toggleTabSources(tab.id)}
                                />
                            </motion.div>
                          )}

                          {isDoc && isHistoryVisible && (
                            <motion.div 
                                key="history-panel"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="shrink-0 h-full z-30 flex"
                            >
                                <HistoryPanel 
                                  history={[...(tab.documentHistory || []), ...(FILE_HISTORY[tab.title] || [])]}
                                  onHistoryClick={handleHistoryClick}
                                  onClose={() => toggleTabHistory(tab.id)}
                                />
                            </motion.div>
                          )}

                          {isDoc && isCommentsVisible && (
                            <motion.div 
                                key="comments-panel"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="shrink-0 h-full z-30 flex"
                            >
                                <CommentsPanel 
                                  isOpen={true}
                                  onClose={() => toggleTabComments(tab.id)}
                                  comments={[
                                    { id: '1', number: 4, scope: 'Master Services Agreement', author: 'Sarah Chen', role: 'Compliance Counsel', timestamp: '2 hours ago', text: 'Should we revise the data processing clause to align with the latest GDPR Article 28 guidance?', mentions: [], avatars: ['S'] },
                                    { id: '2', number: 6, scope: 'Master Services Agreement', author: 'Michael Torres', role: 'Deputy General Counsel', timestamp: '5 hours ago', text: 'The indemnification provision needs stronger language for data breaches. Can we review our standard terms?', mentions: ['Rachel Kim'], avatars: ['M'] },
                                    { id: '3', number: 5, scope: 'Master Services Agreement', author: 'Michael Torres', role: 'Deputy General Counsel', timestamp: '7 hours ago', text: 'Remove the duplicate liability cap section and consolidate into Section 8, correct?', mentions: ['Rachel Kim'], avatars: ['M'] },
                                    { id: '4', number: 3, scope: 'Master Services Agreement', author: 'Jennifer Walsh', role: 'Senior Privacy Counsel', timestamp: '1 day ago', text: 'The security clause should reference our FTC Safeguards Rule controls based on recent updates...', mentions: ['David Park'], avatars: ['J', 'W'] },
                                    { id: '5', number: 2, scope: 'Master Services Agreement', author: 'Jennifer Walsh', role: 'Senior Privacy Counsel', timestamp: '1 day ago', text: 'Could we add sub-processor approval provisions that align with our standard vendor templates?', mentions: ['David Park'], replyCount: 1, avatars: ['J', 'D'] },
                                    { id: '6', number: 1, scope: 'Master Services Agreement', author: 'Rachel Kim', role: 'Compliance Counsel', timestamp: '2 days ago', text: 'Consider adding the Standard Contractual Clauses as an exhibit', mentions: [], avatars: ['R'] }
                                  ]}
                                  type="document"
                                />
                            </motion.div>
                          )}

                          {isSpreadsheet && isCommentsVisible && (
                            <motion.div 
                                key="spreadsheet-comments-panel"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="shrink-0 h-full z-30 flex"
                            >
                                <CommentsPanel 
                                  isOpen={true} 
                                  comments={[
                                    { id: '1', document: 'Vendor_Correspondence_001.pst', column: 'Status', author: 'Sarah Chen', role: 'Senior Compliance Counsel', timestamp: '2 hours ago', text: 'These vendor questionnaire responses need more specificity. Can we schedule a call to get additional details on their data flows?', mentions: ['Michael Torres'], avatar: 'S', avatarColor: 'bg-[#1d4b34]' },
                                    { id: '2', document: 'Privacy_Assessment_2023.pdf', column: 'Status', author: 'Michael Torres', role: 'Deputy General Counsel', timestamp: '4 hours ago', text: 'Agreed. Also flagging potential transfer risk on vendors 18-22. We should review these before renewal.', mentions: ['Sarah Chen', 'Jessica Park'], avatar: 'M', avatarColor: 'bg-[#1d4b34]' },
                                    { id: '3', document: 'Meeting_Minutes_2023.docx', column: 'Source/Type', author: 'Jessica Park', role: 'Compliance Analyst', timestamp: '5 hours ago', text: 'The remediation tracker is ready. Should we include the risk-rating exhibit or wait until the committee review?', mentions: ['Michael Torres'], avatar: 'J', avatarColor: 'bg-[#1d4b34]' },
                                    { id: '4', document: 'Q3_Financials.xlsx', column: 'Custodian', author: 'David Kumar', role: 'Senior Counsel', timestamp: '1 day ago', text: 'The vendor is requesting we accept their standard DPA. This could leave gaps in our breach-notification timelines.', mentions: ['Sarah Chen'], avatar: 'D', avatarColor: 'bg-[#1d4b34]' },
                                    { id: '5', document: 'Vendor_DPAs.pdf', column: 'Status', author: 'Emily Rodriguez', role: 'Compliance Counsel', timestamp: '1 day ago', text: 'Updated DPA tracker attached. Found 47 additional vendors processing personal data without an executed agreement.', mentions: ['Michael Torres', 'David Kumar'], replyCount: 2, avatar: 'E', avatarColor: 'bg-[#1d4b34]' },
                                    { id: '6', document: 'Vendor_Correspondence_003.pst', column: 'Status', author: 'Robert Williams', role: 'General Counsel', timestamp: '2 days ago', text: 'The vendor\'s proposed audit-rights limitation is too narrow. We need to push back and propose broader access.', mentions: [], avatar: 'R', avatarColor: 'bg-[#1d4b34]' }
                                  ]}
                                  onCommentClick={handleCommentClick}
                                  onClose={() => toggleTabComments(tab.id)}
                                  type="spreadsheet"
                                />
                            </motion.div>
                          )}

                          {isSpreadsheet && isHistoryVisible && (
                            <motion.div 
                                key="spreadsheet-history-panel"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="shrink-0 h-full z-30 flex"
                            >
                                <HistoryPanel 
                                  history={FILE_HISTORY[tab.title] || []}
                                  onHistoryClick={handleHistoryClick}
                                  onClose={() => toggleTabHistory(tab.id)}
                                />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Source Viewer */}
                        <AnimatePresence>
                           {showSourceViewer && (
                             <motion.div 
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: isSourceExpanded ? "100%" : `${sourceViewerWidth}%`, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="border-l border-gray-200 shadow-xl z-20 overflow-hidden bg-[#1E1E1E] shrink-0 h-full flex flex-col relative"
                             >
                                <SourceViewer 
                                  citation={activeCitation} 
                                  onClose={closeCitation} 
                                  isExpanded={isSourceExpanded}
                                  onToggleExpand={() => setIsSourceExpanded(!isSourceExpanded)}
                                />
                             </motion.div>
                           )}
                        </AnimatePresence>
                    </div>
                 </div>
              </div>
            );
        })}
        </>

        {/* Chat Input Area */}
        {showInput && activeTab?.type !== 'new-chat' && (
          <div className="w-full max-w-[750px] mx-auto px-8 pb-12 shrink-0 pt-4">
            <PromptInput
              withFlourish={true}
              files={attachedFiles}
              onFilesChange={setAttachedFiles}
            />
          </div>
        )}
      </div>
      </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        itemName={shareModalItem.name}
        itemType={shareModalItem.type}
        initialMode={shareModalItem.initialMode}
      />

      {/* Library Modal */}
      {isLibraryModalOpen && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            // Close modal if clicking the backdrop
            if (e.target === e.currentTarget) {
              handleCloseLibraryModal();
            }
          }}
        >
          <div className="w-full max-w-[95vw] h-[95vh] bg-white rounded-lg shadow-xl overflow-hidden">
            <Library
              key="workspace-library-modal"
              isModal={true}
              onPromptSelect={handleLibraryPromptSelect}
              onClose={handleCloseLibraryModal}
            />
          </div>
        </div>,
        document.body
      )}

      {/* Cell Comment Popover */}
      <CellCommentPopover
        isVisible={commentPopoverVisible}
        onClose={handleCloseCommentPopover}
        comment={activeComment}
        position={undefined}
      />
    </div>
  );
}

