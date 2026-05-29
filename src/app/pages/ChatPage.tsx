import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { createPortal } from 'react-dom';
import { ChevronDown, Share, Edit, FolderInput, Trash2, X } from 'lucide-react';
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
          <div className="flex flex-col gap-3">
            <p className="text-[15px] leading-[1.5] text-[#212223]">
              {`I ran a regulatory horizon scan across federal and state sources and identified ${cpcReentry.regulation}, which may impact your M&A contract templates.`}
            </p>
            <button
              onClick={openRegulatoryTable}
              className="self-start flex items-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2 text-[13px] font-medium text-[#212223] hover:bg-[#F7F7F7] transition-colors"
            >
              <span className="size-2 rounded-full bg-amber-500" />
              {'M&A regulatory findings'}
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
