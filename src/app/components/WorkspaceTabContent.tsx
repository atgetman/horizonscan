import React from "react";
import { clsx } from "clsx";
import { DocumentToolbar } from "./DocumentToolbar";
import { SpreadsheetToolbar } from "./SpreadsheetToolbar";
import { DocumentViewer } from "./DocumentViewer";
import { ActiveChatView } from "./ActiveChatView";
import { ChatSidebar, ChatMessage } from "./ChatSidebar";
import { SourcesPanel } from "./SourcesPanel";
import { HistoryPanel } from "./HistoryPanel";
import { CommentsPanel, Comment } from "./CommentsPanel";
import { CellCommentPopover } from "./CellCommentPopover";
import { SourceViewer } from "./SourceViewer";
import { StreamingDocument } from "./StreamingDocument";
import { SPREADSHEET_DATA } from "./DiscoveryOverviewSpreadsheet";
import { HistoryEvent } from "../data/citationAndHistoryData";
import { RegulatoryFindingsTable } from "./regulatory";

interface WorkspaceTab {
  id: string;
  type: string;
  title: string;
  label: string;
  prompt?: string;
  content?: React.ReactNode;
  chatMessages?: ChatMessage[];
  isChatOpen?: boolean;
  isSourcesOpen?: boolean;
  isHistoryOpen?: boolean;
  isCommentsOpen?: boolean;
  citations?: any[];
  history?: HistoryEvent[];
  comments?: Comment[];
  cellComments?: Record<string, Comment[]>;
  workflowKey?: number; // Incremented to force ActiveChatView re-mount
}

interface WorkspaceTabContentProps {
  tab: WorkspaceTab;
  isActive: boolean;
  activeCitation: any;
  containerRef?: React.RefObject<HTMLDivElement>;
  isMountedRef: React.MutableRefObject<boolean>;
  toggleTabChat: (tabId: string) => void;
  toggleTabSources: (tabId: string) => void;
  toggleTabHistory: (tabId: string) => void;
  toggleTabComments: (tabId: string) => void;
  addDocumentHistoryEntry: (tabId: string, entry: HistoryEvent) => void;
  handleThinkingChange: (tabId: string, isThinking: boolean) => void;
  handleOpenItem: (item: any) => void;
  updateTabChatMessages: (tabId: string, messages: ChatMessage[]) => void;
  onCitationClick: (citation: any, sourceTab?: string) => void;
  closeCitation: () => void;
  addComment: (tabId: string, comment: Comment) => void;
  updateComment: (tabId: string, commentId: string, updates: Partial<Comment>) => void;
  deleteComment: (tabId: string, commentId: string) => void;
  addCommentReply: (tabId: string, commentId: string, reply: Comment) => void;
  addCellComment: (tabId: string, cellId: string, comment: Comment) => void;
  updateCellComment: (tabId: string, cellId: string, commentId: string, updates: Partial<Comment>) => void;
  deleteCellComment: (tabId: string, cellId: string, commentId: string) => void;
  addCellCommentReply: (tabId: string, cellId: string, commentId: string, reply: Comment) => void;
  HISTORICAL_CHATS_STRUCTURED: Record<string, { role: 'user' | 'assistant'; text: React.ReactNode }[]>;
}

export function WorkspaceTabContent({
  tab,
  isActive,
  activeCitation,
  containerRef,
  isMountedRef,
  toggleTabChat,
  toggleTabSources,
  toggleTabHistory,
  toggleTabComments,
  addDocumentHistoryEntry,
  handleThinkingChange,
  handleOpenItem,
  updateTabChatMessages,
  onCitationClick,
  closeCitation,
  addComment,
  updateComment,
  deleteComment,
  addCommentReply,
  addCellComment,
  updateCellComment,
  deleteCellComment,
  addCellCommentReply,
  HISTORICAL_CHATS_STRUCTURED
}: WorkspaceTabContentProps) {
  if (tab.type === 'new-chat') return null;

  const isDoc = (tab.type === 'file' || tab.type === 'doc' || tab.type === 'research') && 
    !tab.title.endsWith('.pdf') && 
    !tab.title.endsWith('.xlsx') && 
    !tab.title.endsWith('.pst') && 
    !tab.title.endsWith('.csv') && 
    tab.title !== 'Discovery overview';
  
  const isSpreadsheet = tab.type === 'table' || 
    tab.title.endsWith('.xlsx') || 
    tab.title.endsWith('.csv') || 
    tab.title === 'Discovery overview';
  
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
          <div className="pb-1 shrink-0">
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
            {isDoc ? (
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
                  currentTabId={tab.id}
                />
              ) : tab.type === 'regulatory-table' ? (
                <div className="h-full w-full p-8 overflow-y-auto">
                  <RegulatoryFindingsTable
                    findings={[
                      {
                        id: '1',
                        source: 'SEC Climate Disclosure Rules',
                        sourceUrl: 'https://www.sec.gov/rules/final/2024/33-11275.pdf',
                        type: 'TR Product',
                        summary: 'New climate-related disclosure requirements for public companies',
                        rationale: 'Affects M&A due diligence processes and disclosure schedules in acquisition agreements',
                        impact: 'Critical',
                        relevance: 95,
                        complianceDeadline: 'Jan 1, 2027'
                      },
                      {
                        id: '2',
                        source: 'CFPB Consumer Data Rights Rule',
                        sourceUrl: 'https://www.consumerfinance.gov/rules-policy/final-rules/personal-financial-data-rights/',
                        type: 'TR Product',
                        summary: 'Enhanced consumer data portability and access requirements',
                        rationale: 'Impacts data transfer provisions and privacy warranties in asset purchase agreements',
                        impact: 'High',
                        relevance: 87,
                        complianceDeadline: 'Apr 1, 2027'
                      },
                      {
                        id: '3',
                        source: 'FTC Non-Compete Ban Amendments',
                        sourceUrl: 'https://www.ftc.gov/news-events/news/press-releases/2024/04/ftc-announces-rule-banning-noncompetes',
                        type: 'Reuters News',
                        summary: 'Proposed amendments to federal non-compete ban',
                        rationale: 'Affects restrictive covenant provisions in employment agreements transferred in M&A deals',
                        impact: 'High',
                        relevance: 82,
                        complianceDeadline: 'TBD (Pending)'
                      }
                    ]}
                    onSaveAsAlert={() => {
                      console.log('Save as alert clicked');
                    }}
                    onSaveScan={() => {
                      console.log('Save scan clicked');
                    }}
                  />
                </div>
              ) : isSpreadsheet ? (
                <div className="h-full w-full relative">
                  <SPREADSHEET_DATA
                    onCitationClick={(citation) => onCitationClick(citation, tab.id)}
                    cellComments={tab.cellComments || {}}
                    onAddCellComment={(cellId, comment) => addCellComment(tab.id, cellId, comment)}
                    onUpdateCellComment={(cellId, commentId, updates) => updateCellComment(tab.id, cellId, commentId, updates)}
                    onDeleteCellComment={(cellId, commentId) => deleteCellComment(tab.id, cellId, commentId)}
                    onAddCellCommentReply={(cellId, commentId, reply) => addCellCommentReply(tab.id, cellId, commentId, reply)}
                  />
                </div>
              ) : (
                <StreamingDocument documentName={tab.label} />
              )
            )}
          </div>

          {/* Chat Sidebar */}
          {isChatVisible && tab.type !== 'chat' && (
            <div className="w-[400px] border-l border-gray-200 bg-white shrink-0">
              <ChatSidebar 
                onClose={() => toggleTabChat(tab.id)}
                messages={tab.chatMessages || []}
                onMessagesChange={(messages) => updateTabChatMessages(tab.id, messages)}
              />
            </div>
          )}

          {/* Sources Panel for Documents */}
          {isDoc && isSourcesVisible && (
            <div className="w-[300px] border-l border-gray-200 bg-white shrink-0 overflow-hidden flex flex-col">
              <SourcesPanel 
                onClose={() => toggleTabSources(tab.id)}
                citations={tab.citations || []}
              />
            </div>
          )}

          {/* History Panel */}
          {isHistoryVisible && (
            <div className="w-[300px] border-l border-gray-200 bg-white shrink-0 overflow-hidden flex flex-col">
              <HistoryPanel 
                onClose={() => toggleTabHistory(tab.id)}
                history={tab.history || []}
              />
            </div>
          )}

          {/* Comments Panel */}
          {isCommentsVisible && (
            <div className="w-[300px] border-l border-gray-200 bg-white shrink-0 overflow-hidden flex flex-col">
              <CommentsPanel 
                isOpen={isCommentsVisible}
                onClose={() => toggleTabComments(tab.id)}
                comments={tab.comments || []}
                onAddComment={(comment) => addComment(tab.id, comment)}
                onUpdateComment={(commentId, updates) => updateComment(tab.id, commentId, updates)}
                onDeleteComment={(commentId) => deleteComment(tab.id, commentId)}
                onAddReply={(commentId, reply) => addCommentReply(tab.id, commentId, reply)}
                commentType={isDoc ? 'document' : 'spreadsheet'}
                cellComments={tab.cellComments || {}}
                onAddCellComment={(cellId, comment) => addCellComment(tab.id, cellId, comment)}
                onUpdateCellComment={(cellId, commentId, updates) => updateCellComment(tab.id, cellId, commentId, updates)}
                onDeleteCellComment={(cellId, commentId) => deleteCellComment(tab.id, cellId, commentId)}
                onAddCellCommentReply={(cellId, commentId, reply) => addCellCommentReply(tab.id, cellId, commentId, reply)}
              />
            </div>
          )}

          {/* Source Viewer (Citation) Modal */}
          {showSourceViewer && activeCitation && (
            <div className="absolute inset-0 z-50">
              <SourceViewer
                citation={activeCitation}
                onClose={closeCitation}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}