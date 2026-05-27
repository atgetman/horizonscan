import { useState, useEffect } from "react";
import { Search, Plus, Star, Info, ScanText, GitCompare, Sheet, SquarePen, MailPlus, Scale, ListTree, X, Edit, MoreHorizontal, Share, Trash2 } from "lucide-react";
import { PromptDrawer } from "../components/PromptDrawer";
import { MultiSelect } from "../components/MultiSelect";
import { SingleSelect } from "../components/SingleSelect";
import { CardDropdownMenu } from "../components/CardDropdownMenu";

type TaskType = 'drafting' | 'analysis' | 'research' | 'summarization' | 'multi-doc-research' | 'communication';
type PracticeArea = 'litigation' | 'corporate' | 'general' | 'contracts';

interface Prompt {
  id: string;
  title: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
  promptText: string;
  files: { id: string; name: string; type: string }[];
  taskType: TaskType;
  practiceArea: PracticeArea;
  iconName?: string;
  iconColor?: string;
}

// Helper function to get icon and solid color for prompt (matching Figma design)
const getPromptIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  
  // AI Jurisdiction Surveys - Orange
  if (title === 'AI Jurisdiction Surveys') {
    return { 
      Icon: Scale, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-amber-600',
      borderTopColor: 'border-t-amber-600'
    };
  }
  
  // Agreement Clause Drafting - Blue
  if (title === 'Agreement Clause Drafting') {
    return { 
      Icon: SquarePen, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-blue-600',
      borderTopColor: 'border-t-blue-600'
    };
  }
  
  // AI-Assisted Research US - Orange
  if (title === 'AI-Assisted Research US') {
    return { 
      Icon: Scale, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-amber-600',
      borderTopColor: 'border-t-amber-600'
    };
  }
  
  // Allegation Summary Email - Blue
  if (title === 'Allegation Summary Email') {
    return { 
      Icon: MailPlus, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-blue-600',
      borderTopColor: 'border-t-blue-600'
    };
  }
  
  // Amendment Term Analysis - Green/Teal
  if (title === 'Amendment Term Analysis') {
    return { 
      Icon: Sheet, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }
  
  // Argument and Counterargument Table - Green/Teal
  if (title === 'Argument and Counterargument Table') {
    return { 
      Icon: Sheet, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }
  
  // Argument Outline - Blue
  if (title === 'Argument Outline') {
    return { 
      Icon: ListTree, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-blue-600',
      borderTopColor: 'border-t-blue-600'
    };
  }
  
  // Authority Analysis Table - Green/Teal
  if (title === 'Authority Analysis Table') {
    return { 
      Icon: Sheet, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }
  
  // Bulk Opinion Summary - Cyan
  if (title === 'Bulk Opinion Summary') {
    return { 
      Icon: ScanText, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }
  
  // Claim Identification and Analysis - Green/Teal
  if (title === 'Claim Identification and Analysis') {
    return { 
      Icon: Sheet, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }
  
  // Claim Summary - Cyan
  if (title === 'Claim Summary') {
    return { 
      Icon: ScanText, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }
  
  // Claims Explorer - Orange
  if (title === 'Claims Explorer') {
    return { 
      Icon: Scale, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-amber-600',
      borderTopColor: 'border-t-amber-600'
    };
  }
  
  // Compare Documents - Cyan
  if (title === 'Compare Documents') {
    return { 
      Icon: GitCompare, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }
  
  // Compare Opinions - Cyan
  if (title === 'Compare Opinions') {
    return { 
      Icon: GitCompare, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }
  
  // Contract Provision Analysis - Green/Teal
  if (title === 'Contract Provision Analysis') {
    return { 
      Icon: Sheet, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }
  
  // Default fallback based on type
  if (lowerTitle.includes('research') || lowerTitle.includes('survey') || lowerTitle.includes('explorer')) {
    return { 
      Icon: Scale, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-amber-500',
      borderTopColor: 'border-t-amber-500'
    };
  }
  
  if (lowerTitle.includes('compare')) {
    return { 
      Icon: GitCompare, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }
  
  if (lowerTitle.includes('summary')) {
    return { 
      Icon: ScanText, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-cyan-600',
      borderTopColor: 'border-t-cyan-600'
    };
  }
  
  if (lowerTitle.includes('analysis')) {
    return { 
      Icon: Sheet, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-emerald-600',
      borderTopColor: 'border-t-emerald-600'
    };
  }
  
  if (lowerTitle.includes('drafting')) {
    return { 
      Icon: SquarePen, 
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      iconColor: 'text-blue-600',
      borderTopColor: 'border-t-blue-600'
    };
  }
  
  // Default fallback
  return { 
    Icon: Sheet, 
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    iconColor: 'text-gray-600',
    borderTopColor: 'border-t-gray-600'
  };
};

const INITIAL_PROMPTS: Prompt[] = [
  {
    id: '1',
    title: 'AI Jurisdiction Surveys',
    description: 'Get a survey of the law across jurisdictions based on a legal research question',
    tags: ['Client-Facing'],
    isFavorite: false,
    promptText: 'Please provide a comprehensive survey of the law across different jurisdictions regarding: [LEGAL QUESTION]',
    files: [],
    taskType: 'research',
    practiceArea: 'general',
  },
  {
    id: '2',
    title: 'Agreement Clause Drafting',
    description: 'Create a specific clause for a given agreement type',
    tags: [],
    isFavorite: false,
    promptText: 'Draft a [CLAUSE TYPE] clause for a [AGREEMENT TYPE] that addresses the following requirements: [REQUIREMENTS]',
    files: [],
    taskType: 'drafting',
    practiceArea: 'contracts',
  },
  {
    id: '3',
    title: 'AI-Assisted Research US',
    description: 'Get relevant answers to legal research questions with links to Westlaw authority',
    tags: ['Internal'],
    isFavorite: false,
    promptText: 'Research the following legal question and provide relevant answers with citations to Westlaw authority: [QUESTION]',
    files: [],
    taskType: 'research',
    practiceArea: 'general',
  },
  {
    id: '4',
    title: 'Allegation Summary Email',
    description: 'Compose email explaining allegations and defense steps to client',
    tags: ['Client-Facing', 'Urgent'],
    isFavorite: true,
    promptText: 'Draft a professional email to the client summarizing the allegations and outlining the recommended defense strategy.',
    files: [],
    taskType: 'communication',
    practiceArea: 'litigation',
  },
  {
    id: '5',
    title: 'Amendment Term Analysis',
    description: 'Understand contract terms relating to amending and modifying an agreement',
    tags: ['Due Diligence'],
    isFavorite: true,
    promptText: 'Analyze the amendment and modification provisions in the attached contract and explain their implications.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'contracts',
  },
  {
    id: '6',
    title: 'Argument and Counterargument Table',
    description: 'Visualize arguments and corresponding counterarguments',
    tags: ['Trial Prep'],
    isFavorite: true,
    promptText: 'Create a table showing the main arguments and corresponding counterarguments for this legal matter.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'litigation',
  },
  {
    id: '7',
    title: 'Argument Outline',
    description: 'Breakdown all arguments made within the provided documents',
    tags: ['Trial Prep'],
    isFavorite: true,
    promptText: 'Provide a detailed outline of all arguments presented in the attached documents.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'litigation',
    iconName: 'ListTree',
    iconColor: 'bg-gradient-to-br from-cyan-500 to-blue-600',
  },
  {
    id: '8',
    title: 'Authority Analysis Table',
    description: 'Create a list of case law, statutes, and other precedent cited in a litigation document',
    tags: ['Motion Practice'],
    isFavorite: false,
    promptText: 'Extract and analyze all legal authorities cited in the attached litigation document.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'litigation',
  },
  {
    id: '9',
    title: 'Bulk Opinion Summary',
    description: 'Summarize court holdings and their effects on cases',
    tags: ['Case Law Research'],
    isFavorite: false,
    promptText: 'Provide summaries of the court holdings and their potential impact on similar cases.',
    files: [],
    taskType: 'summarization',
    practiceArea: 'litigation',
  },
  {
    id: '10',
    title: 'Claim Identification and Analysis',
    description: 'Determine claims against defendants and outline supporting facts',
    tags: ['Discovery'],
    isFavorite: false,
    promptText: 'Identify all claims against the defendants and outline the supporting facts for each claim.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'litigation',
  },
  {
    id: '11',
    title: 'Claim Summary',
    description: "Create a formatted summary of a pleading's claims",
    tags: [],
    isFavorite: false,
    promptText: 'Summarize all claims presented in the pleading in a clear, structured format.',
    files: [],
    taskType: 'summarization',
    practiceArea: 'litigation',
  },
  {
    id: '12',
    title: 'Claims Explorer',
    description: 'Find potential claims for your fact pattern and highlight specific statutory, common law, and constitutional cause...',
    tags: ['Case Assessment', 'Internal'],
    isFavorite: false,
    promptText: 'Analyze the fact pattern and identify all potential claims including statutory, common law, and constitutional causes of action.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'litigation',
  },
  {
    id: '13',
    title: 'Compare Documents',
    description: 'Compare documents side by side to identify differences',
    tags: ['Due Diligence'],
    isFavorite: false,
    promptText: 'Compare the attached documents and identify all significant differences and changes.',
    files: [],
    taskType: 'multi-doc-research',
    practiceArea: 'general',
  },
  {
    id: '14',
    title: 'Compare Opinions',
    description: 'Compare substantive analysis in court opinions',
    tags: ['Case Law Research'],
    isFavorite: false,
    promptText: 'Compare the substantive legal analysis in the attached court opinions and highlight key differences.',
    files: [],
    taskType: 'multi-doc-research',
    practiceArea: 'litigation',
  },
  {
    id: '15',
    title: 'Contract Provision Analysis',
    description: 'Identify and group provisions or clause by topic',
    tags: ['Due Diligence'],
    isFavorite: false,
    promptText: 'Analyze the contract and organize all provisions by topic or clause type.',
    files: [],
    taskType: 'analysis',
    practiceArea: 'contracts',
  },
];

export function Library({ 
  onPromptSelect, 
  modalMode, 
  isModal, 
  onClose 
}: { 
  onPromptSelect?: (promptText: string) => void; 
  modalMode?: boolean;
  isModal?: boolean;
  onClose?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'prompts' | 'question-sets' | 'documents'>('prompts');
  const [searchQuery, setSearchQuery] = useState('');
  const [prompts, setPrompts] = useState<Prompt[]>(INITIAL_PROMPTS);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [promptSource, setPromptSource] = useState('my-prompts');
  const [taskTypeFilters, setTaskTypeFilters] = useState<string[]>([]);
  const [practiceAreaFilters, setPracticeAreaFilters] = useState<string[]>([]);
  const [tagsFilters, setTagsFilters] = useState<string[]>([]);
  const [isClosing, setIsClosing] = useState(false);

  // Cleanup: Ensure drawer is closed when Library unmounts
  useEffect(() => {
    return () => {
      // Close drawer on unmount to avoid portal conflicts
      setIsDrawerOpen(false);
    };
  }, []);

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTaskType = taskTypeFilters.length === 0 || taskTypeFilters.includes(prompt.taskType);
    const matchesPracticeArea = practiceAreaFilters.length === 0 || practiceAreaFilters.includes(prompt.practiceArea);
    const matchesTags = tagsFilters.length === 0 || (prompt.tags && tagsFilters.some(tag => prompt.tags.includes(tag)));
    
    return matchesSearch && matchesTaskType && matchesPracticeArea && matchesTags;
  });

  const handleToggleFavorite = (promptId: string) => {
    setPrompts(prompts.map(p =>
      p.id === promptId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handleOpenPrompt = (prompt: Prompt) => {
    // If in modal mode (either isModal or modalMode) and onPromptSelect is provided, send prompt text back
    if ((isModal || modalMode) && onPromptSelect) {
      onPromptSelect(prompt.promptText);
      return;
    }
    
    // Otherwise, open the drawer as normal
    // Enrich prompt with icon information from the getPromptIcon function
    const { Icon: PromptIcon, iconColor } = getPromptIcon(prompt.title);
    const enrichedPrompt = {
      ...prompt,
      iconName: PromptIcon.displayName || PromptIcon.name || 'Sheet',
      iconColor: iconColor || 'text-gray-600',
    };
    setSelectedPrompt(enrichedPrompt);
    setIsDrawerOpen(true);
  };

  const handleNewPrompt = () => {
    setSelectedPrompt(null);
    setIsDrawerOpen(true);
  };

  const handleSavePrompt = (updatedPrompt: Prompt) => {
    if (selectedPrompt) {
      setPrompts(prompts.map(p =>
        p.id === updatedPrompt.id ? updatedPrompt : p
      ));
    } else {
      setPrompts([...prompts, { ...updatedPrompt, isFavorite: false }]);
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#FCFCFC] relative">
      {/* Close Button for Modal */}
      {isModal && onClose && (
        <button
          onClick={() => {
            // Set closing state to prevent drawer issues
            setIsClosing(true);
            // Immediately close drawer
            setIsDrawerOpen(false);
            // Small delay to allow drawer portal to fully cleanup
            requestAnimationFrame(() => {
              setTimeout(() => {
                onClose();
              }, 0);
            });
          }}
          className="absolute top-[18px] right-4 z-10 size-8 flex items-center justify-center text-[#666666] hover:text-[#212223] hover:bg-black/5 rounded-lg transition-colors"
        >
          <X className="size-5" />
        </button>
      )}
      
      {/* Header */}
      <div className={`flex items-center justify-between pl-[24px] ${(isModal || modalMode) ? 'pr-[64px]' : 'pr-[24px]'} pt-[16px] pb-[8px]`}>
        <div className="flex items-center gap-2">
          <h1 className="text-[28px] font-['Clario'] font-medium text-[#314b3e]">Library</h1>
          <button className="size-6 flex items-center justify-center text-[#212223] hover:bg-black/5 rounded transition-colors">
            <Info className="size-4" />
          </button>
        </div>
        
        {/* New Prompt Button - top right */}
        <button
          onClick={handleNewPrompt}
          className="h-9 px-4 flex items-center gap-2 bg-[#314b3e] rounded-lg text-[14px] font-['Clario'] font-medium text-white hover:bg-[#3d5e4d] transition-colors"
        >
          <Plus className="size-4" />
          New prompt
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 2xl:px-10">
        <div className="flex gap-2 -mb-px border-b border-[#e5e5e5]">
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2 text-[14px] font-['Source_Sans_3'] font-semibold rounded-t transition-colors ${
              activeTab === 'prompts'
                ? 'text-[#212223] border-b-3 border-[#314b3e]'
                : 'text-[#666] hover:text-[#212223]'
            }`}
          >
            Prompts
          </button>
          <button
            onClick={() => setActiveTab('question-sets')}
            className={`px-4 py-2 text-[14px] font-['Source_Sans_3'] font-semibold rounded-t transition-colors ${
              activeTab === 'question-sets'
                ? 'text-[#212223] border-b-3 border-[#314b3e]'
                : 'text-[#666] hover:text-[#212223]'
            }`}
          >
            Question sets
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 text-[14px] font-['Source_Sans_3'] font-semibold rounded-t transition-colors ${
              activeTab === 'documents'
                ? 'text-[#212223] border-b-3 border-[#314b3e]'
                : 'text-[#666] hover:text-[#212223]'
            }`}
          >
            Documents
          </button>
        </div>
      </div>

      {/* Filter Bar with Dropdowns - Only show on Prompts tab */}
      {activeTab === 'prompts' && (
      <div className="flex items-center justify-between px-6 2xl:px-10 py-3 pt-4">
        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3">
          {/* Source Filter - Always has a value */}
          <SingleSelect
            label="Prompt source"
            options={[
              { value: 'my-prompts', label: 'My prompts' },
              { value: 'shared-with-me', label: 'Shared with me' },
              { value: 'cocounsel-prompts', label: 'CoCounsel prompts' },
              { value: 'favorites', label: 'Favorites' },
            ]}
            selectedValue={promptSource}
            onChange={setPromptSource}
          />

          {/* Task Type Filter */}
          <MultiSelect
            label="Task type"
            pluralLabel="task types"
            options={[
              { value: 'drafting', label: 'Drafting' },
              { value: 'analysis', label: 'Analysis' },
              { value: 'research', label: 'Research' },
              { value: 'summarization', label: 'Summarization' },
              { value: 'multi-doc-research', label: 'Multi-doc Research' },
              { value: 'communication', label: 'Communication' },
            ]}
            selectedValues={taskTypeFilters}
            onChange={setTaskTypeFilters}
          />

          {/* Practice Area Filter */}
          <MultiSelect
            label="Practice area"
            pluralLabel="practice areas"
            options={[
              { value: 'litigation', label: 'Litigation' },
              { value: 'corporate', label: 'Corporate' },
              { value: 'contracts', label: 'Contracts' },
              { value: 'general', label: 'General' },
            ]}
            selectedValues={practiceAreaFilters}
            onChange={setPracticeAreaFilters}
          />

          {/* Tags Filter */}
          <MultiSelect
            label="Tags"
            pluralLabel="tags"
            options={[
              { value: 'Client-Facing', label: 'Client-Facing' },
              { value: 'Internal', label: 'Internal' },
              { value: 'Trial Prep', label: 'Trial Prep' },
              { value: 'Motion Practice', label: 'Motion Practice' },
              { value: 'Discovery', label: 'Discovery' },
              { value: 'Due Diligence', label: 'Due Diligence' },
              { value: 'Case Assessment', label: 'Case Assessment' },
              { value: 'Case Law Research', label: 'Case Law Research' },
              { value: 'Urgent', label: 'Urgent' },
            ]}
            selectedValues={tagsFilters}
            onChange={setTagsFilters}
          />
        </div>

        {/* Search Input */}
        <div className="relative w-[360px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts"
            className="w-full h-9 pl-3 pr-10 bg-white border border-[#d2d2d2] rounded-lg text-[14px] font-['Source_Sans_3'] text-[#212223] placeholder:text-[#666] focus:outline-none focus:border-blue-500"
          />
          <div className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center">
            <Search className="size-4 text-[#212223]" />
          </div>
        </div>
      </div>
      )}
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 2xl:px-10 py-4">
        {activeTab === 'prompts' && (
          <div className="grid grid-cols-3 gap-4">
            {filteredPrompts.map((prompt) => {
              const { Icon: PromptIcon, bgColor, borderColor, iconColor, borderTopColor } = getPromptIcon(prompt.title);
              
              return (
                <div
                  key={prompt.id}
                  onClick={() => handleOpenPrompt(prompt)}
                  className="bg-white border border-gray-200 rounded-lg p-4 2xl:p-5 cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all group relative"
                >
                  {/* Favorite Star - Upper Right Corner */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(prompt.id);
                    }}
                    className={`absolute top-3 right-3 p-1 rounded transition-colors z-10 ${
                      prompt.isFavorite 
                        ? 'text-[#5a7867] opacity-100' 
                        : 'text-gray-400 opacity-0 group-hover:opacity-100 hover:text-[#5a7867]'
                    }`}
                  >
                    <Star className={`size-4 ${prompt.isFavorite ? 'fill-[#5a7867]' : ''}`} />
                  </button>

                  <div className="flex flex-col gap-3 2xl:gap-4">
                    {/* Title Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className={`w-[24px] h-[24px] rounded-md ${bgColor} border ${borderColor} flex items-center justify-center flex-shrink-0`}>
                          <PromptIcon className={`w-[18px] h-[18px] ${iconColor}`} />
                        </div>
                        <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] truncate">
                          {prompt.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description text */}
                    <p className="text-[14px] font-['Source_Sans_3'] leading-[1.35] text-[#666] line-clamp-2">
                      {prompt.promptText.split(/(\\[.*?\\])/).map((part, index) => {
                        if (part.match(/\\[.*?\\]/)) {
                          return <span key={index} className="text-gray-400">{part}</span>;
                        }
                        return part;
                      })}
                    </p>
                    
                    {/* Action Buttons (shown on hover, replaces tags) */}
                    <div className="flex items-center gap-2 h-6 justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPrompt(prompt);
                          setIsDrawerOpen(true);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 transition-all text-gray-600 hover:text-[#314b3e]"
                        title="Edit"
                      >
                        <Edit className="size-3.5" />
                      </button>
                      
                      {/* Custom Dropdown Menu */}
                      <CardDropdownMenu
                        prompt={prompt}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'question-sets' && (
          <div className="flex items-center justify-center h-64">
            <p className="text-[14px] font-['Source_Sans_3'] text-[#666]">
              Question sets coming soon
            </p>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="flex items-center justify-center h-64">
            <p className="text-[14px] font-['Source_Sans_3'] text-[#666]">
              Documents coming soon
            </p>
          </div>
        )}
      </div>

      {/* Prompt Drawer - Don't render if we're closing the modal */}
      {!isClosing && (
        <PromptDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          prompt={selectedPrompt}
          onSave={handleSavePrompt}
        />
      )}
    </div>
  );
}