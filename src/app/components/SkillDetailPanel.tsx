import { X, Eye, Code, Save, Share2, Download } from 'lucide-react';
import { useState } from 'react';
import { SaveSkillModal } from './SaveSkillModal';

interface SkillCard {
  name: string;
  description: string;
  practiceArea: string;
  jurisdiction: string;
  tone?: string;
}

interface SkillDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  skill: SkillCard | null;
  onShare?: () => void;
  onSave?: () => void;
  onDownload?: () => void;
}

const skillSteps = [
  {
    number: 1,
    title: 'Compare',
    description: 'Review the amendment against the underlying agreement. Identify every modified, added, or deleted provision and summarize how each change affects the client\'s rights, obligations, and risk exposure.'
  },
  {
    number: 2,
    title: 'Prioritize',
    description: 'Evaluate which changes are significant enough to address in negotiation. Consider the client\'s exposure, the deal context, and the cost of pushing back.'
  },
  {
    number: 3,
    title: 'Confirm scope',
    description: 'Present the issues analysis and priority list for user\'s review before proceeding. Flag any provisions where deal context or negotiating history would affect the analysis.'
  },
  {
    number: 4,
    title: 'Research',
    description: 'For each priority issue, research why the counterparty is likely seeking the change and what market practice looks like. Draw on Practical Law resources to establish the baseline.'
  },
  {
    number: 5,
    title: 'Benchmark',
    description: 'Compare the proposed language against recently executed comparable agreements and the firm\'s prior deals. Identify where the proposed terms deviate from what the client has accepted or obtained before.'
  },
  {
    number: 6,
    title: 'Draft',
    description: 'For each priority issue, propose revised language with supporting rationale. Define opening positions and fallbacks.'
  }
];

export function SkillDetailPanel({ isOpen, onClose, skill, onShare, onSave, onDownload }: SkillDetailPanelProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [codeContent, setCodeContent] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  if (!isOpen || !skill) return null;

  const generateSkillYAML = () => {
    return `---
name: ${skill.name}
description: >
  ${skill.description}
---

# ${skill.name}

${skill.description}

---

## When to use this skill

${skill.description}

## Steps

${skillSteps.map((step, idx) => 
  `${idx + 1}. **${step.title}** - ${step.description}`
).join('\n')}`;
  };

  // Initialize code content when switching to code view
  const handleViewChange = (mode: 'preview' | 'code') => {
    if (mode === 'code' && codeContent === '') {
      setCodeContent(generateSkillYAML());
    }
    setViewMode(mode);
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const handleSaveConfirm = () => {
    onSave?.();
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Border across the top with rounded corner */}
      <div className="h-px bg-[#E5E5E5] rounded-tl-lg" />
      
      {/* Header */}
      <div className="h-[52px] border-b border-[#E5E5E5] bg-white flex items-center justify-between px-4 gap-3 shrink-0">
        {/* Left side - Action buttons */}
        <div className="flex items-center gap-2">
          {/* Preview/Code Toggle */}
          <div className="flex items-center bg-[#F6F6F6] rounded-lg p-1">
            <button 
              className={`flex items-center justify-center size-8 rounded transition-all ${
                viewMode === 'preview' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
              }`}
              title="Preview"
              onClick={() => handleViewChange('preview')}
            >
              <Eye className="size-[18px] text-[#666]" />
            </button>
            <button 
              className={`flex items-center justify-center size-8 rounded transition-all ${
                viewMode === 'code' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
              }`}
              title="Code"
              onClick={() => handleViewChange('code')}
            >
              <Code className="size-[18px] text-[#666]" />
            </button>
          </div>
          
          {/* Divider */}
          <div className="h-5 w-px bg-[#E5E5E5]" />
          
          {/* Save */}
          <button 
            className="flex items-center justify-center size-8 hover:bg-gray-100 rounded transition-colors"
            title="Save"
            onClick={handleSaveClick}
          >
            <Save className="size-[18px] text-[#666]" />
          </button>
          
          {/* Share */}
          <button 
            className="flex items-center justify-center size-8 hover:bg-gray-100 rounded transition-colors"
            title="Share"
            onClick={onShare}
          >
            <Share2 className="size-[18px] text-[#666]" />
          </button>
          
          {/* Divider */}
          <div className="h-5 w-px bg-[#E5E5E5]" />
          
          {/* Download */}
          <button 
            className="flex items-center justify-center size-8 hover:bg-gray-100 rounded transition-colors"
            title="Download"
            onClick={onDownload}
          >
            <Download className="size-[18px] text-[#666]" />
          </button>
        </div>

        {/* Right side - Close */}
        <button 
          onClick={onClose}
          className="flex items-center justify-center size-8 hover:bg-gray-100 rounded transition-colors ml-auto"
          title="Close"
        >
          <X className="size-[18px] text-[#666]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'code' ? (
          // Code Editor View - Editable, Light Mode
          <div className="h-full flex flex-col">
            <textarea
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              className="flex-1 w-full p-6 bg-white text-[#212223] font-mono text-[13px] leading-[1.6] resize-none focus:outline-none border-none"
              spellCheck={false}
            />
          </div>
        ) : (
          // Regular content view
          <div className="p-8">
            {/* Skill Name */}
            <h1 className="font-['Clario',sans-serif] text-[28px] font-medium text-[#212223] mb-8">
              {skill.name}
            </h1>

            {/* When to use this */}
            <div className="mb-8">
              <h2 className="font-['Clario',sans-serif] text-[17px] font-medium text-[#212223] mb-3">
                When to use this
              </h2>
              <p className="text-[15px] text-[#404040] leading-[1.6]">
                {skill.description}
              </p>
            </div>

            {/* Steps */}
            <div>
              <h2 className="font-['Clario',sans-serif] text-[17px] font-medium text-[#212223] mb-4">
                Steps
              </h2>
              <div className="space-y-6">
                {skillSteps.map((step) => (
                  <div key={step.number} className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-['Clario',sans-serif] text-[15px] font-medium text-[#212223]">
                        {step.number}.
                      </span>
                      <h3 className="font-['Clario',sans-serif] text-[15px] font-medium text-[#212223]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[15px] text-[#404040] leading-[1.6] pl-6">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Skill Modal */}
      <SaveSkillModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        skillName={skill.name}
        onConfirm={handleSaveConfirm}
      />
    </div>
  );
}