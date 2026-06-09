import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { createPortal } from 'react-dom';
import { ChevronDown, Share, Edit, FolderInput, Trash2, X, Bell, ExternalLink } from 'lucide-react';
import { ActiveChatView } from '../components/ActiveChatView';
import { generateChatTitle } from '../services/ChatService';
import { Dropdown, DropdownItem } from '../components/ui/Dropdown';
import { ShareModal } from '../components/ShareModal';
import { ShareSkillModal } from '../components/ShareSkillModal';
import { ShareConfirmationModal } from '../components/ShareConfirmationModal';
import { SkillDetailPanel } from '../components/SkillDetailPanel';
import { SaveSkillModal } from '../components/SaveSkillModal';
import { Toast } from '../components/Toast';

export function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const initialPrompt = sessionStorage.getItem(`chat_${chatId}_prompt`) || '';
  const isSkillCreation = sessionStorage.getItem(`chat_${chatId}_skillCreation`) === 'true';
  const isHorizonScan = sessionStorage.getItem(`chat_${chatId}_horizonScan`) === 'true';
  const [chatTitle, setChatTitle] = useState('New chat');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareModalItem, setShareModalItem] = useState<{ name: string; type: 'file' | 'folder' | 'output' | 'matter' | 'document' | 'tab' } | null>(null);
  const [shareSkillModalOpen, setShareSkillModalOpen] = useState(false);
  const [shareConfirmationOpen, setShareConfirmationOpen] = useState(false);
  const [skillToShare, setSkillToShare] = useState<any>(null);
  const [skillPanelOpen, setSkillPanelOpen] = useState(false);
  const [skillInPanel, setSkillInPanel] = useState<any>(null);
  const [saveSkillModalOpen, setSaveSkillModalOpen] = useState(false);
  const [skillToSave, setSkillToSave] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const titleRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect a CPC re-entry. When the user clicks "Initiate CPC" from the
  // artifact/table view we navigate back to this chat route. The Layout wraps
  // the routed page in <AnimatePresence mode="wait"> keyed by pathname, which
  // mounts ChatPage TWICE (the first mount is discarded for the enter
  // animation, the second is the one the user actually sees). So we must NOT
  // destructively consume `pendingCPCData` during render — otherwise the
  // discarded first mount eats it and the surviving second mount falls back to
  // re-running the original prompt. Instead we read it purely here (both mounts
  // see it) and clear it later in an effect.
  const [cpcReentry] = useState<{ regulation: string; docsAffected: number; clausesAffected: number; impactLevel: string } | null>(() => {
    try {
      const pendingData = sessionStorage.getItem('pendingCPCData');
      if (pendingData) {
        const parsed = JSON.parse(pendingData);
        // Persist workflow data so ActiveChatView's CPC flow can read it.
        sessionStorage.setItem('pendingCPCWorkflow', JSON.stringify({
          docsAffected: parsed.docsAffected,
          clausesAffected: parsed.clausesAffected,
          impactLevel: parsed.impactLevel,
        }));
        return parsed;
      }
    } catch (e) {
      console.warn('[v0] ChatPage: failed to read pending CPC data', e);
    }
    return null;
  });
  const cpcPromptText = cpcReentry ? `Initiate Cross-Product Clause analysis for: ${cpcReentry.regulation}` : '';

  // Clear the pending CPC payload after the double-mount transition has settled
  // (and after the surviving mount has already captured it at init time). This
  // prevents a later, unrelated visit to this chat from falsely re-triggering
  // CPC, without racing the discarded/surviving mount swap.
  useEffect(() => {
    if (!cpcReentry) return;
    const t = setTimeout(() => {
      sessionStorage.removeItem('pendingCPCData');
      sessionStorage.removeItem('pendingCPCWorkflow');
    }, 4000);
    return () => clearTimeout(t);
  }, [cpcReentry]);

  const openRegulatoryTable = () => {
    sessionStorage.setItem('regulatoryTableSourceTabId', chatId || '');
    navigate(`/chat?open=${encodeURIComponent('M&A regulatory findings')}&type=regulatory-table&from=${chatId}`);
  };

  // Seed the thread with a recap of the prior regulatory scan so the CPC flow
  // appears to continue the existing conversation (length > 1 also tells
  // ActiveChatView to skip re-running the original prompt simulation).
  // React nodes are safe here because this prop is passed in memory, never
  // serialized to sessionStorage.
  const [initialMessages] = useState<any[] | undefined>(() => {
    if (!cpcReentry) return undefined;
    const originalPrompt = initialPrompt || 'Can you scan for any regulatory changes that might affect our M&A contract templates?';
    return [
      { role: 'user', text: originalPrompt, attachments: [] },
      {
        role: 'assistant',
        isFigmaContent: true,
        text: (
          <div className="flex flex-col gap-4 max-w-[800px] mr-auto w-full">
            <div className="text-[15px] text-[#212223] leading-relaxed">
              {`I ran a regulatory horizon scan across federal and state sources and identified ${cpcReentry.regulation}, which may impact your M&A contract templates.`}
            </div>
            <button
              onClick={openRegulatoryTable}
              className="bg-white h-[48px] relative rounded-[8px] w-full hover:bg-[#F9FAFB] transition-colors"
            >
              <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="flex flex-row items-center size-full">
                <div className="content-center flex flex-wrap gap-[4px_8px] items-center pr-[12px] py-[8px] relative size-full">
                  <div className="flex-[1_0_0] min-w-px relative">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex gap-[8px] items-center pl-[8px] relative size-full">
                        <div className="content-stretch flex items-center justify-center max-h-[28px] max-w-[28px] relative shrink-0 size-[28px]">
                          <div className="relative">
                            <Bell className="size-5 text-[#DE6633]" strokeWidth={1.5} />
                            <div className="absolute top-0 right-0 size-2 bg-[#DE6633] rounded-full border border-white" />
                          </div>
                        </div>
                        <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
                          <div className="content-stretch flex items-center relative w-full">
                            <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#212223] text-[16px] text-ellipsis whitespace-nowrap">
                              <p className="leading-[1.5] overflow-hidden text-ellipsis text-left">M&A regulatory findings</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0">
                      <ExternalLink className="size-4 text-[#212223]" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        ),
      },
    ];
  });
  const [cpcPrompt] = useState<string>(cpcPromptText);
  const [appendCPCToExisting, setAppendCPCToExisting] = useState<boolean>(!!cpcReentry);

  // Listen for skill share events
  useEffect(() => {
    const handleSkillShare = (event: Event) => {
      const customEvent = event as CustomEvent;
      const skillData = customEvent.detail;
      if (skillData) {
        setSkillToShare(skillData);
        setShareSkillModalOpen(true);
      }
    };

    const handleSkillSave = (event: Event) => {
      const customEvent = event as CustomEvent;
      const skillData = customEvent.detail;
      if (skillData) {
        setSkillToSave(skillData);
        setSaveSkillModalOpen(true);
      }
    };

    window.addEventListener('openSkillShare', handleSkillShare);
    window.addEventListener('openSkillSave', handleSkillSave);

    return () => {
      window.removeEventListener('openSkillShare', handleSkillShare);
      window.removeEventListener('openSkillSave', handleSkillSave);
    };
  }, []);

  // Generate abbreviated title from initial prompt
  useEffect(() => {
    if (initialPrompt && chatTitle === 'New chat') {
      generateChatTitle(initialPrompt)
        .then(title => setChatTitle(title))
        .catch(err => {
          console.warn("Failed to generate chat title:", err);
          setChatTitle(initialPrompt.length > 50 ? initialPrompt.substring(0, 50) + '...' : initialPrompt);
        });
    }
  }, [initialPrompt, chatTitle]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        titleRef.current &&
        !titleRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleTitleClick = () => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left
      });
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#FCFCFC] overflow-hidden relative">
      {/* Title Bar */}
      <div className="h-[44px] flex items-center px-4 shrink-0 bg-[#FCFCFC]">
        <button
          ref={titleRef}
          onClick={handleTitleClick}
          className="flex items-center gap-1.5 text-[13px] font-medium text-[#212223] hover:bg-gray-100 px-2 py-1 rounded transition-colors"
        >
          <span className="truncate max-w-[400px]">{chatTitle}</span>
          <ChevronDown className="size-3.5 shrink-0" />
        </button>
      </div>

      {/* Tab Dropdown */}
      {isDropdownOpen && dropdownPosition && createPortal(
        <div
          style={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            zIndex: 9999
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Dropdown className="w-40" ref={dropdownRef}>
            <DropdownItem
              onClick={() => {
                setIsDropdownOpen(false);
                setShareModalOpen(true);
              }}
              icon={<Share className="size-3.5" />}
            >
              Share
            </DropdownItem>

            <DropdownItem
              onClick={() => {
                setIsDropdownOpen(false);
                console.log('Rename clicked');
              }}
              icon={<Edit className="size-3.5" />}
            >
              Rename
            </DropdownItem>

            <DropdownItem
              onClick={() => {
                setIsDropdownOpen(false);
                console.log('Move clicked');
              }}
              icon={<FolderInput className="size-3.5" />}
            >
              Move
            </DropdownItem>

            <DropdownItem
              onClick={() => {
                setIsDropdownOpen(false);
                console.log('Delete clicked');
              }}
              icon={<Trash2 className="size-3.5" />}
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>,
        document.body
      )}

      {/* Main Content Area - with flex layout for panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat View */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ActiveChatView
            prompt={initialPrompt}
            attachments={[]}
            onNewPrompt={() => {}}
            isSkillCreation={isSkillCreation}
            initialMessages={initialMessages}
            currentTabId={chatId}
            appendCPCPrompt={appendCPCToExisting ? cpcPrompt : undefined}
            onCPCAppended={() => setAppendCPCToExisting(false)}
            onOpenTab={(item: any) => {
              if (item.type === 'skill') {
                setSkillInPanel(item);
                setSkillPanelOpen(true);
              } else if (item.type === 'cpc-redlines') {
                // Open the clause analysis in a full-page tab (mirrors the
                // regulatory-table tabular view). Closing it returns to chat.
                const regulation = item.regulation || item.name?.replace(/^CPC (Redlines|Analysis) - /, '') || '';
                sessionStorage.setItem('cpcRedlineRegulation', regulation);
                navigate(`/chat?open=${encodeURIComponent('Cross-product clause analysis')}&type=cpc-redlines&from=${chatId}`);
              } else if (item.type === 'regulatory-table') {
                // Navigate to workspace-agnostic standalone view, passing the chat ID
                openRegulatoryTable();
              }
            }}
          />
        </div>

        {/* Skill Detail Panel - slides in from right */}
        {skillPanelOpen && (
          <div className="w-[600px] shrink-0 border-l border-[#E5E5E5] bg-white flex flex-col h-full">
            <SkillDetailPanel
              isOpen={skillPanelOpen}
              onClose={() => setSkillPanelOpen(false)}
              skill={skillInPanel}
              onSave={() => {
                setToastMessage('Skill saved successfully!');
                setShowToast(true);
              }}
              onShare={() => {
                if (skillInPanel) {
                  setSkillToShare(skillInPanel);
                  setShareSkillModalOpen(true);
                }
              }}
              onDownload={() => {
                if (skillInPanel) {
                  const skillContent = JSON.stringify(skillInPanel, null, 2);
                  const blob = new Blob([skillContent], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${skillInPanel.name}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }
              }}
            />
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        itemName={shareModalItem?.name || chatTitle}
        itemType={shareModalItem?.type || 'document'}
      />

      {/* Share Skill Modal */}
      <ShareSkillModal
        isOpen={shareSkillModalOpen}
        onClose={() => setShareSkillModalOpen(false)}
        skillName={skillToShare?.name || ''}
        onShare={(target, workspaceId, note) => {
          console.log('Sharing skill:', skillToShare?.name, 'to', target, workspaceId, note);
          setShareSkillModalOpen(false);
          setShareConfirmationOpen(true);
        }}
        onConfirm={() => setShareConfirmationOpen(true)}
      />

      {/* Share Confirmation Modal */}
      <ShareConfirmationModal
        isOpen={shareConfirmationOpen}
        onClose={() => setShareConfirmationOpen(false)}
        shareTarget="firm"
        onConfirm={() => setShareConfirmationOpen(false)}
        confirmButtonText="Got it"
      />

      {/* Save Skill Modal */}
      <SaveSkillModal
        isOpen={saveSkillModalOpen}
        onClose={() => setSaveSkillModalOpen(false)}
        skillName={skillToSave?.name || ''}
        onConfirm={() => {
          console.log('Skill saved to library:', skillToSave?.name);
          setSaveSkillModalOpen(false);
          setToastMessage('Skill saved successfully!');
          setShowToast(true);
        }}
      />

      {/* Toast */}
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
    </div>
  );
}
