import { Paperclip, BookOpen, AtSign, ArrowUp, Sparkles, X, FileText, Table, Folder, MessageCircleQuestion, Database, Landmark, SquareUser, MoreHorizontal, Blocks, Check, Plus, ChevronRight, Bell, Briefcase } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import { createPortal } from "react-dom";

interface PromptInputProps {
  className?: string;
  placeholder?: string;
  files?: any[];
  onFilesChange?: (files: any[]) => void;
  onSubmit?: (text: string, files: any[]) => void;
  value?: string;
  onChange?: (value: string) => void;
  withFlourish?: boolean;
  externalValue?: string;
  onExternalValueUsed?: () => void;
  compact?: boolean;
  activeSkill?: { name: string; onRemove?: () => void } | null;
}

export function PromptInput({
  className = "",
  placeholder = "Ask CoCounsel anything...",
  files = [],
  onFilesChange,
  onSubmit,
  value,
  onChange,
  withFlourish = false,
  externalValue,
  onExternalValueUsed,
  compact = false,
  activeSkill = null,
}: PromptInputProps) {
  const [localText, setLocalText] = useState("");
  const [localFiles, setLocalFiles] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(!compact);
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [knowledgePosition, setKnowledgePosition] = useState<{ top: number; left: number } | null>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [addMenuPosition, setAddMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [sharepointEnabled, setSharepointEnabled] = useState(true);
  const [imanageEnabled, setImanageEnabled] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const knowledgeButtonRef = useRef<HTMLButtonElement>(null);
  const knowledgePopoverRef = useRef<HTMLDivElement>(null);
  const addMenuButtonRef = useRef<HTMLButtonElement>(null);
  const addMenuPopoverRef = useRef<HTMLDivElement>(null);

  // Use controlled or uncontrolled state
  const text = value !== undefined ? value : localText;
  const items = files !== undefined ? files : localFiles;

  // Drag and drop setup
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'FILE_ITEM',
    drop: (item: { name: string; type: string }) => {
      const newItem = { id: Math.random().toString(36).substring(7), ...item };
      const exists = items.some(i => i.name === item.name);

      if (!exists) {
        if (onFilesChange) {
          onFilesChange([...items, newItem]);
        } else {
          setLocalFiles(prev => [...prev, newItem]);
        }
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [items, onFilesChange]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setLocalText(newValue);
    }
  };

  const handleSubmit = () => {
    if (onSubmit && (text?.trim() || items.length > 0)) {
      onSubmit(text, items);
      // Clear local state if uncontrolled
      if (value === undefined) {
        setLocalText("");
      }
      if (files === undefined) {
        setLocalFiles([]);
      }
    }
  };

  const removeStagedItem = (id: string) => {
    if (onFilesChange) {
      onFilesChange(items.filter(item => item.id !== id));
    } else {
      setLocalFiles(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const mockSkills = [
    {
      id: '1',
      name: 'Contract Review - SaaS Agreements',
      description: 'Key provisions and red flags for SaaS customer-side contract review',
      type: 'personal' as const
    },
    {
      id: '2',
      name: 'Employment Law - California',
      description: 'California-specific employment law considerations and compliance',
      type: 'personal' as const
    },
    {
      id: '3',
      name: 'Discovery Response Standards',
      description: 'Firm-wide standards for responding to discovery requests in litigation matters',
      type: 'firm' as const
    },
    {
      id: '4',
      name: 'M&A Due Diligence Checklist',
      description: 'Comprehensive checklist for tech company acquisition due diligence',
      type: 'firm' as const
    }
  ];

  const handleKnowledgeClick = () => {
    if (knowledgeButtonRef.current) {
      const rect = knowledgeButtonRef.current.getBoundingClientRect();
      setKnowledgePosition({
        top: rect.bottom + 8, // Position below the button with 8px gap
        left: rect.left
      });
      setIsKnowledgeOpen(!isKnowledgeOpen);
    }
  };

  const handleToggleSkill = (skillId: string) => {
    setSelectedSkillIds(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleRemoveSkill = (skillId: string) => {
    setSelectedSkillIds(prev => prev.filter(id => id !== skillId));
  };

  const handleAddMenuClick = () => {
    if (addMenuButtonRef.current) {
      const rect = addMenuButtonRef.current.getBoundingClientRect();
      setAddMenuPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
      setIsAddMenuOpen(!isAddMenuOpen);
    }
  };

  // Click outside handler for knowledge popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        knowledgePopoverRef.current &&
        !knowledgePopoverRef.current.contains(event.target as Node) &&
        knowledgeButtonRef.current &&
        !knowledgeButtonRef.current.contains(event.target as Node)
      ) {
        setIsKnowledgeOpen(false);
      }
    };

    if (isKnowledgeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isKnowledgeOpen]);

  // Click outside handler for add menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addMenuPopoverRef.current &&
        !addMenuPopoverRef.current.contains(event.target as Node) &&
        addMenuButtonRef.current &&
        !addMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsAddMenuOpen(false);
        setSubmenuOpen(null);
      }
    };

    if (isAddMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddMenuOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current && (!compact || isExpanded)) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text, compact, isExpanded]);

  // Handle external value from Home page suggestions
  useEffect(() => {
    if (externalValue && externalValue !== text) {
      if (onChange) {
        onChange(externalValue);
      } else {
        setLocalText(externalValue);
      }

      // Expand if compact mode
      if (compact) {
        setIsExpanded(true);
      }

      // Focus textarea and adjust height
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }

        // Notify parent that value has been used
        if (onExternalValueUsed) {
          onExternalValueUsed();
        }
      }, 50);
    }
  }, [externalValue, text, onChange, onExternalValueUsed, compact]);

  const handleFocus = () => {
    if (compact) {
      setIsExpanded(true);
    }
  };

  const handleBlur = () => {
    if (compact && !text && items.length === 0) {
      setIsExpanded(false);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    // Don't focus if clicking on a button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    // Expand and focus the textarea
    if (compact) {
      setIsExpanded(true);
    }
    textareaRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={drop}
        onClick={handleContainerClick}
        className={`flex flex-col bg-white border rounded-xl p-4 transition-all cursor-text ${
          withFlourish
            ? 'border-gray-300 shadow-[0px_8px_32px_0px_rgba(214,64,0,0.1),0px_8px_16px_0px_rgba(0,0,0,0.05)]'
            : compact && !isExpanded
            ? 'border-gray-300 shadow-sm'
            : 'border-gray-300 shadow-md'
        } ${
          isOver && canDrop
            ? 'border-orange-500 ring-2 ring-orange-200 shadow-lg'
            : ''
        }`}
      >
        {/* Staged Items Pills */}
        {items.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {items.map(item => (
              <div key={item.id} className="inline-flex items-center gap-1.5 bg-gray-100 text-[#212223] px-2 py-1 rounded text-[13px] border border-gray-200 animate-in fade-in zoom-in duration-200">
                {item.type === 'folder' && <Folder className="size-3.5 text-[#DE6633] fill-[#F8EADD]" />}
                {item.type === 'file' && <FileText className="size-3.5 text-[#054688]" />}
                {item.type === 'table' && <Table className="size-3.5 text-[#666666]" />}
                {item.type === 'doc' && <FileText className="size-3.5 text-[#666666]" />}
                {item.type === 'research' && <MessageCircleQuestion className="size-3.5 text-[#666666]" />}
                {item.type === 'chat' && <MessageCircleQuestion className="size-3.5 text-[#666666]" />}
                {item.type === 'datasource' && <Database className="size-3.5 text-[#666666]" />}
                {item.type === 'source' && <Landmark className="size-3.5 text-[#666666]" />}
                {item.type === 'judge' && <SquareUser className="size-3.5 text-[#666666]" />}
                {item.type === 'project' && <MoreHorizontal className="size-3.5 text-[#666666]" />}
                <span className="truncate max-w-[150px]">{item.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeStagedItem(item.id);
                  }}
                  className="ml-0.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 p-0.5"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Active Skill Chip */}
        {activeSkill && (
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="inline-flex items-center gap-1 bg-[#edf2f0] text-[#1d4b34] px-2 py-1 rounded text-[13px] border border-[#c9dcd3] animate-in fade-in zoom-in duration-200">
              <Blocks className="size-3" />
              <span className="truncate max-w-[200px] font-['Source_Sans_3'] font-normal">{activeSkill.name}</span>
              {activeSkill.onRemove && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    activeSkill.onRemove?.();
                  }}
                  className="ml-0.5 hover:bg-[#1d4b34]/10 rounded p-0.5 transition-colors"
                >
                  <X className="size-2.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Selected Skill Pills */}
        {selectedSkillIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {mockSkills
              .filter(skill => selectedSkillIds.includes(skill.id))
              .map(skill => (
                <div key={skill.id} className="inline-flex items-center gap-1 bg-[#edf2f0] text-[#1d4b34] px-2 py-1 rounded text-[13px] border border-[#c9dcd3] animate-in fade-in zoom-in duration-200">
                  <Blocks className="size-3" />
                  <span className="truncate max-w-[200px] font-['Source_Sans_3'] font-normal">{skill.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSkill(skill.id);
                    }}
                    className="ml-0.5 hover:bg-[#1d4b34]/10 rounded p-0.5 transition-colors"
                  >
                    <X className="size-2.5" />
                  </button>
                </div>
              ))}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={1}
          className={`w-full resize-none outline-none text-[#212223] placeholder:text-[#999999] text-[15px] bg-transparent ${
            compact && !isExpanded ? 'mb-1' : 'mb-4'
          }`}
          style={{
            minHeight: compact && !isExpanded ? '24px' : '40px',
            maxHeight: '200px',
            overflow: compact && !isExpanded ? 'hidden' : 'auto'
          }}
        />

        {/* Button Row */}
        <div className="flex items-center justify-between">
          {/* Left buttons */}
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-[#666]" strokeWidth={1.5} />
            <button
              ref={addMenuButtonRef}
              type="button"
              onClick={handleAddMenuClick}
              className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                isAddMenuOpen
                  ? 'bg-[#1d4b34] text-white'
                  : 'bg-[#f5f5f5] text-[#666] hover:bg-[#e5e5e5]'
              }`}
              title="Add content"
            >
              <Plus className="size-[14px]" strokeWidth={2.5} />
            </button>
          </div>

          {/* Right button */}
          <div className="flex items-center gap-2">
            <Sparkles className="size-[18px] text-[#999999]" strokeWidth={2} />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!text?.trim() && items.length === 0}
              className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-colors ${
                !text?.trim() && items.length === 0
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-[#1d4b34] hover:bg-[#163f2b]"
              }`}
              title="Submit"
            >
              <ArrowUp className="size-5 text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Knowledge Popover */}
      {isKnowledgeOpen && knowledgePosition && createPortal(
        <div
          ref={knowledgePopoverRef}
          style={{
            position: 'fixed',
            top: `${knowledgePosition.top}px`,
            left: `${knowledgePosition.left}px`,
            zIndex: 9999
          }}
          className="min-w-[280px] bg-white rounded-lg border border-[#E5E5E5] shadow-lg overflow-hidden"
        >
          {/* MY KNOWLEDGE Section */}
          <div className="py-1">
            <div className="px-3 py-1.5 text-[14px] font-['Clario'] font-semibold text-[#212223]">
              My knowledge
            </div>
            {mockSkills.filter(s => s.type === 'personal').map((skill) => {
              const isSelected = selectedSkillIds.includes(skill.id);
              return (
                <button
                  key={skill.id}
                  onClick={() => handleToggleSkill(skill.id)}
                  className="w-full flex items-start gap-2.5 px-3 py-2 hover:bg-[#edf2f0] transition-colors text-left"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className={`relative rounded-[2px] shrink-0 size-[16px] cursor-pointer ${isSelected ? 'bg-[#1d4b34]' : 'bg-white'}`}
                    >
                      <div className="flex items-center justify-center size-full">
                        {isSelected && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7.5L5.5 10L11 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className={`absolute border ${isSelected ? 'border-[#1d4b34]' : 'border-[#d2d2d2]'} border-solid inset-[-1px] pointer-events-none rounded-[3px]`} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-['Clario'] font-light text-[#212223] leading-[1.3]">
                      {skill.name}
                    </div>
                    <div className="text-[13px] text-[#666] leading-[1.3] mt-0.5">
                      {skill.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-[#E5E5E5]" />

          {/* CALDWELL & STERLING Section */}
          <div className="py-1">
            <div className="px-3 py-1.5 text-[14px] font-['Clario'] font-semibold text-[#212223]">
              Caldwell & Sterling
            </div>
            {mockSkills.filter(s => s.type === 'firm').map((skill) => {
              const isSelected = selectedSkillIds.includes(skill.id);
              return (
                <button
                  key={skill.id}
                  onClick={() => handleToggleSkill(skill.id)}
                  className="w-full flex items-start gap-2.5 px-3 py-2 hover:bg-[#edf2f0] transition-colors text-left"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className={`relative rounded-[2px] shrink-0 size-[16px] cursor-pointer ${isSelected ? 'bg-[#1d4b34]' : 'bg-white'}`}
                    >
                      <div className="flex items-center justify-center size-full">
                        {isSelected && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7.5L5.5 10L11 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className={`absolute border ${isSelected ? 'border-[#1d4b34]' : 'border-[#d2d2d2]'} border-solid inset-[-1px] pointer-events-none rounded-[3px]`} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-[14px] font-['Clario'] font-light text-[#212223] leading-[1.3]">
                        {skill.name}
                      </div>
                      <span className="px-1.5 py-0.5 bg-[#edf2f0] text-[#1d4b34] text-[12px] font-['Source_Sans_3'] font-medium rounded-full">
                        Firm
                      </span>
                    </div>
                    <div className="text-[13px] text-[#666] leading-[1.3] mt-0.5">
                      {skill.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Clear All Button - only show if any skills selected */}
          {selectedSkillIds.length > 0 && (
            <>
              <div className="border-t border-[#E5E5E5]" />
              <div className="py-1 px-3">
                <button
                  onClick={() => setSelectedSkillIds([])}
                  className="w-full text-[13px] text-[#666666] hover:text-[#212223] py-1.5 text-left font-['Clario']">
                  Clear all selected skills
                </button>
              </div>
            </>
          )}
        </div>,
        document.body
      )}

      {/* Add Menu Dropdown */}
      {isAddMenuOpen && addMenuPosition && createPortal(
        <div
          ref={addMenuPopoverRef}
          style={{
            position: 'fixed',
            top: `${addMenuPosition.top}px`,
            left: `${addMenuPosition.left}px`,
            zIndex: 9999
          }}
          className="w-[220px] bg-white rounded-[16px] border border-[#E5E5E5] shadow-lg overflow-hidden pt-2"
        >
          {/* My Documents */}
          <button
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setSubmenuPosition({
                top: rect.top,
                left: rect.right + 4
              });
              setSubmenuOpen('documents');
            }}
            className="w-full h-[31px] flex items-center gap-2 px-3 hover:bg-[#F5F5F5] transition-colors text-left"
          >
            <div className="relative shrink-0 size-4">
              <svg className="size-full" fill="none" viewBox="0 0 16 16">
                <path d="M13.3333 13.3333C13.687 13.3333 14.0261 13.1929 14.2761 12.9428C14.5262 12.6928 14.6667 12.3536 14.6667 12V5.33333C14.6667 4.97971 14.5262 4.64057 14.2761 4.39052C14.0261 4.14048 13.687 4 13.3333 4H8.06667C7.84368 4.00219 7.6237 3.94841 7.42687 3.84359C7.23004 3.73877 7.06264 3.58625 6.94 3.4L6.4 2.6C6.27859 2.41565 6.11332 2.26432 5.919 2.1596C5.72468 2.05488 5.50741 2.00004 5.28667 2H2.66667C2.31304 2 1.97391 2.14048 1.72386 2.39052C1.47381 2.64057 1.33333 2.97971 1.33333 3.33333V12C1.33333 12.3536 1.47381 12.6928 1.72386 12.9428C1.97391 13.1929 2.31304 13.3333 2.66667 13.3333H13.3333Z" fill="#F8EADD" stroke="#DE6633" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="flex-1 text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">My Documents</span>
            <ChevronRight className="size-4 text-[#404040]" strokeWidth={1.5} />
          </button>

          {/* Workspaces */}
          <button
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setSubmenuPosition({
                top: rect.top,
                left: rect.right + 4
              });
              setSubmenuOpen('workspaces');
            }}
            className="w-full h-[31px] flex items-center gap-2 px-3 hover:bg-[#F5F5F5] transition-colors text-left"
          >
            <div className="relative shrink-0 size-4">
              <svg className="size-full" fill="none" viewBox="0 0 16 16">
                <path d="M13.3333 13.3333C13.687 13.3333 14.0261 13.1929 14.2761 12.9428C14.5262 12.6928 14.6667 12.3536 14.6667 12V5.33333C14.6667 4.97971 14.5262 4.64057 14.2761 4.39052C14.0261 4.14048 13.687 4 13.3333 4H8.06667C7.84368 4.00219 7.6237 3.94841 7.42687 3.84359C7.23004 3.73877 7.06264 3.58625 6.94 3.4L6.4 2.6C6.27859 2.41565 6.11332 2.26432 5.919 2.1596C5.72468 2.05488 5.50741 2.00004 5.28667 2H2.66667C2.31304 2 1.97391 2.14048 1.72386 2.39052C1.47381 2.64057 1.33333 2.97971 1.33333 3.33333V12C1.33333 12.3536 1.47381 12.6928 1.72386 12.9428C1.97391 13.1929 2.31304 13.3333 2.66667 13.3333H13.3333Z" fill="#F8EADD" stroke="#DE6633" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="flex-1 text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">Workspaces</span>
            <ChevronRight className="size-4 text-[#404040]" strokeWidth={1.5} />
          </button>

          {/* Shared */}
          <button
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setSubmenuPosition({
                top: rect.top,
                left: rect.right + 4
              });
              setSubmenuOpen('shared');
            }}
            className="w-full h-[31px] flex items-center gap-2 px-3 hover:bg-[#F5F5F5] transition-colors text-left"
          >
            <div className="relative shrink-0 size-4">
              <svg className="size-full" fill="none" viewBox="0 0 16 16">
                <path d="M13.3333 13.3333C13.687 13.3333 14.0261 13.1929 14.2761 12.9428C14.5262 12.6928 14.6667 12.3536 14.6667 12V5.33333C14.6667 4.97971 14.5262 4.64057 14.2761 4.39052C14.0261 4.14048 13.687 4 13.3333 4H8.06667C7.84368 4.00219 7.6237 3.94841 7.42687 3.84359C7.23004 3.73877 7.06264 3.58625 6.94 3.4L6.4 2.6C6.27859 2.41565 6.11332 2.26432 5.919 2.1596C5.72468 2.05488 5.50741 2.00004 5.28667 2H2.66667C2.31304 2 1.97391 2.14048 1.72386 2.39052C1.47381 2.64057 1.33333 2.97971 1.33333 3.33333V12C1.33333 12.3536 1.47381 12.6928 1.72386 12.9428C1.97391 13.1929 2.31304 13.3333 2.66667 13.3333H13.3333Z" fill="#F8EADD" stroke="#DE6633" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="flex-1 text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">Shared</span>
            <ChevronRight className="size-4 text-[#404040]" strokeWidth={1.5} />
          </button>

          {/* Skills */}
          <button
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setSubmenuPosition({
                top: rect.top,
                left: rect.right + 4
              });
              setSubmenuOpen('skills');
            }}
            className="w-full h-[31px] flex items-center gap-2 px-3 hover:bg-[#F5F5F5] transition-colors text-left"
          >
            <Blocks className="size-4 text-[#DE6633]" strokeWidth={1.5} fill="#f8eadd" />
            <span className="flex-1 text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">Skills</span>
            <ChevronRight className="size-4 text-[#404040]" strokeWidth={1.5} />
          </button>

          {/* Monitoring & alerts */}
          <button
            className="w-full h-[31px] flex items-center gap-2 px-3 hover:bg-[#F5F5F5] transition-colors text-left"
          >
            <Bell className="size-4 text-[#DE6633]" strokeWidth={1.5} fill="#f8eadd" />
            <span className="flex-1 text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">Monitoring & alerts</span>
            <ChevronRight className="size-4 text-[#404040]" strokeWidth={1.5} />
          </button>

          {/* HighQ */}
          <button
            className="w-full h-[31px] flex items-center gap-2 px-3 hover:bg-[#F5F5F5] transition-colors text-left"
          >
            <div className="bg-[#1d4b34] rounded-[2px] shrink-0 size-4 flex items-center justify-center">
              <span className="text-[8px] font-['Clario'] font-medium text-white">HQ</span>
            </div>
            <span className="flex-1 text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">HighQ</span>
            <ChevronRight className="size-4 text-[#404040]" strokeWidth={1.5} />
          </button>

          {/* Divider */}
          <div className="h-px bg-[#e5e5e5] my-2" />

          {/* SharePoint */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSharepointEnabled(!sharepointEnabled);
            }}
            className="w-full h-[31px] flex items-center gap-2 px-3 hover:bg-[#F5F5F5] transition-colors text-left"
          >
            <div className="relative shrink-0 size-4">
              <svg className="size-full" viewBox="0 0 16 16" fill="none">
                <circle cx="5.5" cy="5.5" r="4.5" fill="#036C70"/>
                <circle cx="10.5" cy="10.5" r="4.5" fill="#03A9AC"/>
                <circle cx="10.5" cy="5.5" r="4.5" fill="#0E7276"/>
                <text x="4" y="10" fontSize="8" fontWeight="600" fill="white" fontFamily="Arial">S</text>
              </svg>
            </div>
            <span className="flex-1 text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">SharePoint</span>
            <div
              className={`w-10 h-5 rounded-full transition-colors ${
                sharepointEnabled ? 'bg-[#1d4b34]' : 'bg-gray-300'
              } flex items-center ${sharepointEnabled ? 'justify-end' : 'justify-start'} px-0.5`}
            >
              <div className="size-4 bg-white rounded-full shadow-sm" />
            </div>
          </button>

          {/* iManage */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImanageEnabled(!imanageEnabled);
            }}
            className="w-full h-[31px] flex items-center gap-2 px-3 hover:bg-[#F5F5F5] transition-colors text-left"
          >
            <div className="relative shrink-0 size-4">
              <svg className="size-full" viewBox="0 0 16 16" fill="none">
                <ellipse cx="8" cy="8" rx="7" ry="6.5" fill="#0047BB" transform="rotate(-15 8 8)"/>
                <ellipse cx="8" cy="8" rx="5.5" ry="5" fill="#0066FF" transform="rotate(-15 8 8)"/>
                <text x="5.5" y="10.5" fontSize="8" fontWeight="700" fill="white" fontFamily="Arial">m</text>
              </svg>
            </div>
            <span className="flex-1 text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">iManage</span>
            <div
              className={`w-10 h-5 rounded-full transition-colors ${
                imanageEnabled ? 'bg-[#1d4b34]' : 'bg-gray-300'
              } flex items-center ${imanageEnabled ? 'justify-end' : 'justify-start'} px-0.5`}
            >
              <div className="size-4 bg-white rounded-full shadow-sm" />
            </div>
          </button>
        </div>,
        document.body
      )}

      {/* Submenu */}
      {submenuOpen && submenuPosition && createPortal(
        <div
          onMouseLeave={() => setSubmenuOpen(null)}
          style={{
            position: 'fixed',
            top: `${submenuPosition.top}px`,
            left: `${submenuPosition.left}px`,
            zIndex: 10000
          }}
          className="w-[240px] bg-white rounded-lg border border-[#E5E5E5] shadow-lg overflow-hidden py-1"
        >
          {submenuOpen === 'workspaces' && (
            <>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left">
                <Plus className="size-4 text-[#666]" strokeWidth={1.5} />
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">New Workspace</span>
              </button>
              <button className="w-full px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left">
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">Blackwell Industries Acquisition</span>
              </button>
              <button className="w-full px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left">
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">Chen v. Metropolitan Health</span>
              </button>
              <button className="w-full px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left">
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">Thornton Family Trust Amendment</span>
              </button>
              <button className="w-full px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left">
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">Global Pharma Merger</span>
              </button>
              <button className="w-full px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left">
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">Finch Data Breach Litigation</span>
              </button>
            </>
          )}
          {submenuOpen === 'documents' && (
            <>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left">
                <FileText className="size-4 text-[#666]" strokeWidth={1.5} />
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">Upload from your device</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left">
                <MessageCircleQuestion className="size-4 text-[#666]" strokeWidth={1.5} />
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">File limit info</span>
              </button>
            </>
          )}
          {submenuOpen === 'skills' && (
            <>
              <button
                onClick={() => {
                  setSubmenuOpen(null);
                  setIsAddMenuOpen(false);
                  handleKnowledgeClick();
                }}
                className="w-full px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left"
              >
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">Contract Review - SaaS Agreements</span>
              </button>
              <button
                onClick={() => {
                  setSubmenuOpen(null);
                  setIsAddMenuOpen(false);
                  handleKnowledgeClick();
                }}
                className="w-full px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left"
              >
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">Employment Law - California</span>
              </button>
              <button
                onClick={() => {
                  setSubmenuOpen(null);
                  setIsAddMenuOpen(false);
                  handleKnowledgeClick();
                }}
                className="w-full px-3 py-2 hover:bg-[#F5F5F5] transition-colors text-left"
              >
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">Discovery Response Standards</span>
              </button>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}