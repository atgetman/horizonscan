import { X, Plus, Trash2, FileText, MailPlus, ScanText, GitCompare, Sheet, SquarePen, Scale, ListTree, Check, Pencil, ChevronDown, ChevronsUpDown, MoreHorizontal, Share, Star, StarOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PromptInput } from "./PromptInput";
import { SingleSelect } from "./SingleSelect";
import { MultiSelect } from "./MultiSelect";
import { ShareModal } from "./ShareModal";

interface PromptFile {
  id: string;
  name: string;
  type: string;
}

type TaskType = 'drafting' | 'analysis' | 'research' | 'summarization' | 'multi-doc-research' | 'communication';
type PracticeArea = 'litigation' | 'corporate' | 'general' | 'contracts';

interface PromptDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: {
    id: string;
    title: string;
    description: string;
    promptText: string;
    files: PromptFile[];
    tags?: string[];
    taskType?: TaskType;
    practiceArea?: PracticeArea;
    iconName?: string;
    iconColor?: string;
    isFavorite?: boolean;
  } | null;
  onSave: (prompt: {
    id: string;
    title: string;
    description: string;
    promptText: string;
    files: PromptFile[];
    tags: string[];
    taskType: TaskType;
    practiceArea: PracticeArea;
    iconName?: string;
    iconColor?: string;
    isFavorite?: boolean;
  }) => void;
}

const ICON_OPTIONS = [
  { name: 'MailPlus', Icon: MailPlus, label: 'Email' },
  { name: 'ScanText', Icon: ScanText, label: 'Summary' },
  { name: 'GitCompare', Icon: GitCompare, label: 'Compare' },
  { name: 'Sheet', Icon: Sheet, label: 'Table' },
  { name: 'SquarePen', Icon: SquarePen, label: 'Draft' },
  { name: 'Scale', Icon: Scale, label: 'Research' },
  { name: 'ListTree', Icon: ListTree, label: 'Outline' },
];

const COLOR_OPTIONS = [
  { name: 'Amber', color: 'text-amber-600', bgPreview: 'bg-amber-600' },
  { name: 'Blue', color: 'text-blue-600', bgPreview: 'bg-blue-600' },
  { name: 'Emerald', color: 'text-emerald-600', bgPreview: 'bg-emerald-600' },
  { name: 'Cyan', color: 'text-cyan-600', bgPreview: 'bg-cyan-600' },
  { name: 'Gray', color: 'text-gray-600', bgPreview: 'bg-gray-600' },
];

export function PromptDrawer({ isOpen, onClose, prompt, onSave }: PromptDrawerProps) {
  const [title, setTitle] = useState('');
  const [promptText, setPromptText] = useState('');
  const [files, setFiles] = useState<PromptFile[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [taskType, setTaskType] = useState<TaskType>('analysis');
  const [practiceArea, setPracticeArea] = useState<PracticeArea>('general');
  const [iconName, setIconName] = useState<string>('Sheet');
  const [iconColor, setIconColor] = useState<string>('text-gray-600');
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [tagInputValue, setTagInputValue] = useState('');
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const optionsMenuRef = useRef<HTMLDivElement>(null);

  // Track initial state for unsaved changes detection
  const [initialState, setInitialState] = useState<string>('');
  const [previousPromptId, setPreviousPromptId] = useState<string | null>(null);

  // Available tags for dropdown (can be extended with user-created tags)
  const [availableTags, setAvailableTags] = useState([
    { value: 'deposition', label: 'Deposition' },
    { value: 'motion', label: 'Motion' },
    { value: 'contract', label: 'Contract' },
    { value: 'discovery', label: 'Discovery' },
    { value: 'research', label: 'Research' },
    { value: 'drafting', label: 'Drafting' },
    { value: 'analysis', label: 'Analysis' },
    { value: 'review', label: 'Review' },
  ]);

  // Mock metadata - in real app would come from prompt data
  const modifiedBy = 'Sarah Chen';
  const modifiedDate = 'Mar 3, 2026, 10:32 AM';

  // Close tags dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagsContainerRef.current && !tagsContainerRef.current.contains(event.target as Node)) {
        setIsTagsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close options menu when clicking outside
  useEffect(() => {
    if (!isOptionsMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target as Node)) {
        setIsOptionsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOptionsMenuOpen]);

  useEffect(() => {
    if (prompt) {
      setTitle(prompt.title);
      setPromptText(prompt.promptText);
      setFiles(prompt.files);
      setTags(prompt.tags || []);
      setTaskType(prompt.taskType || 'analysis');
      setPracticeArea(prompt.practiceArea || 'general');
      setIconName(prompt.iconName || 'Sheet');
      setIconColor(prompt.iconColor || 'text-gray-600');
      setIsFavorite(prompt.isFavorite || false);
      setInitialState(JSON.stringify(prompt));
      setPreviousPromptId(prompt.id);
    } else {
      // New prompt defaults
      setTitle('');
      setPromptText('');
      setFiles([]);
      setTags([]);
      setTaskType('analysis');
      setPracticeArea('general');
      setIconName('Sheet');
      setIconColor('text-gray-600');
      setInitialState(JSON.stringify({
        id: `prompt-${Date.now()}`,
        title: '',
        description: '', // Keep for backwards compatibility but empty
        promptText: '',
        files: [],
        tags: [],
        taskType: 'analysis',
        practiceArea: 'general',
        iconName: 'Sheet',
        iconColor: 'text-gray-600',
      }));
      setPreviousPromptId(null);
    }
  }, [prompt]);

  const handleSave = () => {
    onSave({
      id: prompt?.id || `prompt-${Date.now()}`,
      title,
      description: '', // Keep for backwards compatibility but empty
      promptText,
      files,
      tags,
      taskType,
      practiceArea,
      iconName,
      iconColor,
      isFavorite,
    });
    onClose();
  };

  const handleAddFile = () => {
    const newFile: PromptFile = {
      id: `file-${Date.now()}`,
      name: 'Template.docx',
      type: 'document',
    };
    setFiles([...files, newFile]);
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  // Check if there are unsaved changes
  // Only prompt text, task type, practice area, tags, and files trigger the discard warning
  // Title, icon, color, and favorite status should take effect immediately
  const hasUnsavedChanges = () => {
    if (!prompt) return false; // New prompt - no changes to track
    
    // Compare only the fields that should trigger a warning
    const initialData = {
      promptText: prompt.promptText,
      files: prompt.files,
      tags: prompt.tags || [],
      taskType: prompt.taskType || 'analysis',
      practiceArea: prompt.practiceArea || 'general',
    };
    
    const currentData = {
      promptText,
      files,
      tags,
      taskType,
      practiceArea,
    };
    
    return JSON.stringify(initialData) !== JSON.stringify(currentData);
  };

  // Handle close with unsaved changes check
  const handleClose = () => {
    if (hasUnsavedChanges()) {
      setShowUnsavedWarning(true);
    } else {
      onClose();
    }
  };

  // Discard changes and close
  const handleDiscardChanges = () => {
    setShowUnsavedWarning(false);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Drawer - positioned directly on the right */}
      <div className="fixed top-0 right-0 bottom-0 z-[9999] bg-white w-[640px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
          {/* Icon Picker Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
              className="w-[26px] h-[26px] bg-white border border-gray-200 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              {(() => {
                const SelectedIcon = ICON_OPTIONS.find(icon => icon.name === iconName)?.Icon || Sheet;
                return <SelectedIcon className={`w-[18px] h-[18px] ${iconColor}`} />;
              })()}
            </button>

            {/* Icon & Color Picker Popover */}
            {isIconPickerOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-[10000]" 
                  onClick={() => setIsIconPickerOpen(false)}
                />
                
                {/* Popover */}
                <div className="absolute left-0 top-full mt-2 w-[280px] bg-white border border-gray-200 rounded-lg shadow-xl z-[10001] p-4">
                  {/* Icon Selection */}
                  <div className="mb-4">
                    <label className="block text-[16px] font-['Source_Sans_Pro'] font-semibold text-[#212223] mb-2">
                      Icon
                    </label>
                    <div className="grid grid-cols-7 gap-3 p-1">
                      {ICON_OPTIONS.map(icon => (
                        <button
                          key={icon.name}
                          type="button"
                          onClick={() => setIconName(icon.name)}
                          className={`size-9 flex items-center justify-center rounded transition-all ${
                            iconName === icon.name 
                              ? 'bg-gray-200 ring-2 ring-[#314b3e]' 
                              : 'bg-gray-100 hover:bg-gray-150'
                          }`}
                        >
                          <icon.Icon className="size-4 text-gray-700" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-[16px] font-['Source_Sans_Pro'] font-semibold text-[#212223] mb-2">
                      Color
                    </label>
                    <div className="grid grid-cols-7 gap-3 p-1">
                      {COLOR_OPTIONS.map(color => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setIconColor(color.color)}
                          className={`size-9 flex items-center justify-center rounded transition-all ${
                            iconColor === color.color 
                              ? 'ring-2 ring-[#314b3e]' 
                              : ''
                          }`}
                        >
                          <div className={`size-6 ${color.bgPreview} rounded`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Title - Editable */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            {isEditingTitle ? (
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setIsEditingTitle(false);
                    if (e.key === 'Escape') setIsEditingTitle(false);
                  }}
                  autoFocus
                  placeholder="Enter prompt title"
                  className="w-full pl-2 pr-9 py-1 border border-[#d2d2d2] rounded-lg text-[18px] font-['Clario'] font-medium text-[#212223] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#314b3e] hover:text-[#3d5e4d] transition-colors"
                >
                  <Check className="size-4" />
                </button>
              </div>
            ) : (
              <>
                <h2 
                  onClick={() => setIsEditingTitle(true)}
                  className="text-[18px] font-['Clario'] font-medium text-[#212223] cursor-text"
                >
                  {title || 'Untitled Prompt'}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(true)}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                >
                  <Pencil className="size-4" />
                </button>
              </>
            )}
          </div>

          {/* Options Menu */}
          <div ref={optionsMenuRef} className="relative">
            <button
              onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
              className="flex items-center justify-center size-7 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <MoreHorizontal className="size-5" />
            </button>

            {isOptionsMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-[180px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
                <button
                  onClick={() => {
                    setShareModalOpen(true);
                    setIsOptionsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
                >
                  <Share className="size-4" />
                  Share
                </button>
                <button
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    setIsOptionsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
                >
                  {isFavorite ? (
                    <>
                      <StarOff className="size-4" />
                      Unfavorite
                    </>
                  ) : (
                    <>
                      <Star className="size-4" />
                      Favorite
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    console.log('Delete');
                    setIsOptionsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
                >
                  <Trash2 className="size-4" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex items-center justify-center size-7 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Prompt Input - Reusing from home page */}
          <div>
            <PromptInput
              value={promptText}
              onChange={setPromptText}
              placeholder="Enter your prompt text here..."
              files={files}
              onFilesChange={setFiles}
              libraryMode={true}
            />
          </div>

          {/* Task Type & Practice Area - Same Line */}
          <div className="flex gap-4">
            {/* Task Type */}
            <div className="flex-1">
              <label className="block text-[16px] font-['Source_Sans_Pro'] font-semibold text-[#212223] mb-2">
                Task Type
              </label>
              <SingleSelect
                label="Select task type"
                options={[
                  { value: 'drafting', label: 'Drafting' },
                  { value: 'analysis', label: 'Analysis' },
                  { value: 'research', label: 'Research' },
                  { value: 'summarization', label: 'Summarization' },
                  { value: 'multi-doc-research', label: 'Multi-Document Research' },
                  { value: 'communication', label: 'Communication' },
                ]}
                selectedValue={taskType}
                onChange={(value) => setTaskType(value as TaskType)}
                className="w-full"
              />
            </div>

            {/* Practice Area */}
            <div className="flex-1">
              <label className="block text-[16px] font-['Source_Sans_Pro'] font-semibold text-[#212223] mb-2">
                Practice Area
              </label>
              <SingleSelect
                label="Select practice area"
                options={[
                  { value: 'litigation', label: 'Litigation' },
                  { value: 'corporate', label: 'Corporate' },
                  { value: 'general', label: 'General' },
                  { value: 'contracts', label: 'Contracts' },
                ]}
                selectedValue={practiceArea}
                onChange={(value) => setPracticeArea(value as PracticeArea)}
                className="w-full"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[16px] font-['Source_Sans_Pro'] font-semibold text-[#212223] mb-2">
              Tags
            </label>
            <div ref={tagsContainerRef} className="relative w-full">
              {/* Tags Field with Chips and Input */}
              <div
                onClick={() => {
                  setIsTagsOpen(true);
                  tagInputRef.current?.focus();
                }}
                className="w-full min-h-[40px] pl-3 pr-9 py-2 border border-[#d2d2d2] rounded-lg text-[13px] font-['Source_Sans_3'] bg-white hover:bg-gray-50 transition-colors cursor-text flex flex-wrap gap-2 items-center"
              >
                {tags.map(tagValue => {
                  const tagLabel = availableTags.find(t => t.value === tagValue)?.label || tagValue;
                  return (
                    <div
                      key={tagValue}
                      className="inline-flex items-center gap-1.5 bg-gray-100 text-[#212223] px-2 py-1 rounded text-[13px] border border-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTags(tags.filter(t => t !== tagValue));
                      }}
                    >
                      <span>{tagLabel}</span>
                      <X className="size-3 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    </div>
                  );
                })}
                <input
                  ref={tagInputRef}
                  type="text"
                  value={tagInputValue}
                  onChange={(e) => setTagInputValue(e.target.value)}
                  onFocus={() => setIsTagsOpen(true)}
                  placeholder={tags.length === 0 ? "Add tags..." : ""}
                  className="flex-1 min-w-[120px] outline-none bg-transparent text-[#212223] placeholder:text-[#999]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && tagInputValue.trim()) {
                      e.preventDefault();
                      const newTagValue = tagInputValue.trim().toLowerCase().replace(/\s+/g, '-');
                      const newTagLabel = tagInputValue.trim();
                      
                      // Add to tags if not already present
                      if (!tags.includes(newTagValue)) {
                        setTags([...tags, newTagValue]);
                        
                        // Add to available tags if it's a new tag
                        if (!availableTags.find(t => t.value === newTagValue)) {
                          setAvailableTags([...availableTags, { value: newTagValue, label: newTagLabel }]);
                        }
                      }
                      
                      setTagInputValue('');
                    } else if (e.key === 'Backspace' && !tagInputValue && tags.length > 0) {
                      // Remove last tag on backspace if input is empty
                      e.preventDefault();
                      setTags(tags.slice(0, -1));
                    }
                  }}
                />
              </div>

              <ChevronsUpDown 
                className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#666] cursor-pointer pointer-events-none" 
              />

              {/* Tags Dropdown */}
              {isTagsOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#d2d2d2] rounded-md shadow-lg z-50 max-h-[300px] flex flex-col">
                  {/* Options List */}
                  <div className="overflow-y-auto flex-1 py-1">
                    {availableTags
                      .filter(tag =>
                        tag.label.toLowerCase().includes(tagInputValue.toLowerCase())
                      )
                      .map(tag => {
                        const isSelected = tags.includes(tag.value);
                        return (
                          <button
                            key={tag.value}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setTags(tags.filter(t => t !== tag.value));
                              } else {
                                setTags([...tags, tag.value]);
                              }
                              setTagInputValue('');
                              tagInputRef.current?.focus();
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
                          >
                            <div
                              className={`size-4 flex items-center justify-center border rounded ${
                                isSelected
                                  ? "bg-[#314b3e] border-[#314b3e]"
                                  : "border-[#d2d2d2]"
                              }`}
                            >
                              {isSelected && <Check className="size-3 text-white" />}
                            </div>
                            <span className="flex-1">{tag.label}</span>
                          </button>
                        );
                      })}
                    
                    {/* Show "Press Enter to create" hint when typing new tag */}
                    {tagInputValue.trim() && !availableTags.find(t => t.label.toLowerCase() === tagInputValue.trim().toLowerCase()) && (
                      <div className="px-3 py-2 text-[13px] font-['Source_Sans_3'] text-gray-500 border-t border-gray-100">
                        Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">Enter</kbd> to create "{tagInputValue.trim()}"
                      </div>
                    )}
                  </div>

                  {/* Clear All Button */}
                  {tags.length > 0 && (
                    <div className="p-2 border-t border-[#e5e5e5]">
                      <button
                        type="button"
                        onClick={() => {
                          setTags([]);
                          setTagInputValue('');
                          tagInputRef.current?.focus();
                        }}
                        className="w-full h-8 px-3 text-[13px] font-['Source_Sans_3'] text-[#314b3e] hover:bg-gray-50 rounded transition-colors"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          {/* Metadata - Left aligned */}
          <div className="text-[13px] font-['Source_Sans_3'] text-gray-500">
            Modified by {modifiedBy} on {modifiedDate}
          </div>
          
          {/* Buttons - Right aligned */}
          <div className="flex items-center gap-3">
            <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 group hover:bg-[#edf2f0]">
              <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
              <button
                onClick={handleClose}
                className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
              >
                <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[16px] whitespace-nowrap">
                  <p className="leading-[1.35]">Cancel</p>
                </div>
              </button>
            </div>
            <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0">
              <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
              <button
                onClick={handleSave}
                className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
              >
                <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
                  <p className="leading-[1.35]">Save</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Unsaved Changes Warning Modal */}
      {showUnsavedWarning && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center">
          {/* Modal Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowUnsavedWarning(false)} />
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-2xl w-[440px] p-6 z-10">
            <h3 className="text-[18px] font-['Clario'] font-semibold text-[#212223] mb-2">
              Unsaved changes
            </h3>
            <p className="text-[14px] font-['Source_Sans_3'] text-gray-600 mb-6">
              You have unsaved changes. Are you sure you want to discard them?
            </p>
            
            <div className="flex items-center justify-end gap-3">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 group hover:bg-[#edf2f0]">
                <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                <button
                  onClick={() => setShowUnsavedWarning(false)}
                  className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
                >
                  <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[16px] whitespace-nowrap">
                    <p className="leading-[1.35]">Keep editing</p>
                  </div>
                </button>
              </div>
              <div className="bg-red-600 content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0">
                <div aria-hidden="true" className="absolute border border-red-600 border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                <button
                  onClick={handleDiscardChanges}
                  className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
                >
                  <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-white text-[15px] whitespace-nowrap">
                    <p className="leading-[1.35]">Discard changes</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          itemName={title || 'Untitled Prompt'}
          itemType="document"
          isPrompt={true}
        />
      )}
    </>,
    document.body
  );
}