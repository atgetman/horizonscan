import { useState, useEffect, useRef } from "react";
import { X, Upload, ChevronLeft, ChevronRight, Check, FileText } from "lucide-react";
import { SkillTooShortModal } from "./SkillTooShortModal";

interface NewSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (skill: any) => void;
}

type SkillType = 'directing' | 'output-guideline' | 'capability' | 'content-tool';
type WizardStep = 'form' | 'generating' | 'overlap' | 'questions' | 'building' | 'review';

const SKILL_QUESTIONS = [
  {
    id: 1,
    question: "What should this skill help you accomplish?",
    placeholder: "e.g. Review liability caps in SaaS contracts and flag anything outside our standard position.",
    type: "textarea" as const,
  },
  {
    id: 2,
    question: "What type of legal work do these strict rules apply to?",
    type: "pills" as const,
    options: [
      "Due diligence transactions",
      "All client communications",
      "Document review projects",
      "Court filings and pleadings"
    ],
  },
  {
    id: 3,
    question: "What is the primary jurisdiction or legal system this guideline should apply to?",
    type: "pills" as const,
    options: [
      "Federal law (US)",
      "State law (specify which state)",
      "International/cross-border matters",
      "Administrative/regulatory proceedings"
    ],
  },
  {
    id: 4,
    question: "What tone and level of formality should this output maintain?",
    type: "pills" as const,
    options: [
      "Highly formal and traditional legal language",
      "Professional but conversational business tone",
      "Academic and technical writing style",
      "Casual and approachable communication"
    ],
  },
  {
    id: 5,
    question: "What content should this skill ensure is never included in the output?",
    type: "pills" as const,
    options: [
      "Legal advice or opinions",
      "Confidential client information",
      "Unprofessional or overly casual language",
      "Technical legal citations"
    ],
  },
];

export function NewSkillModal({ isOpen, onClose, onSave }: NewSkillModalProps) {
  const [step, setStep] = useState<WizardStep>('form');
  const [skillName, setSkillName] = useState('');
  const [practiceArea, setPracticeArea] = useState('');
  const [skillPurpose, setSkillPurpose] = useState('');
  const [skillType, setSkillType] = useState<SkillType>('output-guideline');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedPills, setSelectedPills] = useState<Record<number, string[]>>({});
  const [generationProgress, setGenerationProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<Array<File | { name: string; size: number; type: string; isPasted: boolean; content: string }>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showPasteText, setShowPasteText] = useState(false);
  const [pasteLabel, setPasteLabel] = useState('');
  const [pasteContent, setPasteContent] = useState('');
  const [showTooShortWarning, setShowTooShortWarning] = useState(false);
  const [skillContent, setSkillContent] = useState('');
  const [buildingStage, setBuildingStage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartGeneration = () => {
    setStep('generating');
    setGenerationProgress(0);

    // Stage 1: Identifying reusable knowledge - 3 seconds
    setTimeout(() => setGenerationProgress(1), 3000);

    // Stage 2: Classifying skill type - 3 seconds
    setTimeout(() => setGenerationProgress(2), 6000);

    // Stage 3: Abstracting context-specific details - 3 seconds
    setTimeout(() => setGenerationProgress(3), 9000);

    // Stage 4: Checking firm knowledge - 3 seconds
    setTimeout(() => setGenerationProgress(4), 12000);

    // Stage 5: Preparing refinement questions - 3 seconds
    setTimeout(() => setGenerationProgress(5), 15000);

    // Show overlap modal after all stages complete
    setTimeout(() => setStep('overlap'), 18000);
  };

  const handleContinueAfterOverlap = () => {
    setStep('questions');
    setCurrentQuestion(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < SKILL_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBuildSkillFile = () => {
    setStep('building');

    // Show building for 3 seconds then go directly to review
    setTimeout(() => {
      setStep('review');
    }, 3000);
  };

  const handleSaveToKnowledge = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: skillName,
      type: skillType,
      practiceArea,
      purpose: skillPurpose,
      dateSaved: new Date().toISOString(),
      author: 'You',
      answers,
      selectedPills,
    };
    onSave(newSkill);
    onClose();
    resetForm();
  };

  const handleSaveAsIs = () => {
    const lineCount = skillPurpose.split('\n').length;
    if (lineCount < 180) {
      setShowTooShortWarning(true);
      return;
    }
    proceedWithSaveAsIs();
  };

  const proceedWithSaveAsIs = () => {
    setShowTooShortWarning(false);
    const newSkill = {
      id: Date.now().toString(),
      name: skillName,
      type: skillType,
      practiceArea,
      purpose: skillPurpose,
      dateSaved: new Date().toISOString(),
      author: 'You',
      scope: 'personal',
    };
    onSave(newSkill);
    onClose();
    resetForm();
  };

  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  const resetForm = () => {
    setStep('form');
    setSkillName('');
    setPracticeArea('');
    setSkillPurpose('');
    setSkillType('output-guideline');
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedPills({});
    setGenerationProgress(0);
    setUploadedFiles([]);
  };

  const togglePill = (questionId: number, option: string) => {
    setSelectedPills(prev => {
      const current = prev[questionId] || [];
      const isSelected = current.includes(option);
      return {
        ...prev,
        [questionId]: isSelected
          ? current.filter(o => o !== option)
          : [...current, option]
      };
    });
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const handleFileDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleFileDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPastedText = () => {
    if (pasteLabel && pasteContent) {
      const pastedDoc = {
        name: pasteLabel,
        size: pasteContent.length,
        type: 'text/plain',
        isPasted: true,
        content: pasteContent
      };
      setUploadedFiles(prev => [...prev, pastedDoc]);
      setPasteLabel('');
      setPasteContent('');
      setShowPasteText(false);
    }
  };

  const renderFormStep = () => (
    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
      <div className="p-6 sticky top-0 bg-white z-10">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-[20px] font-['Clario'] font-medium text-[#212223]">Teach CoCounsel something new</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
            <X className="size-5 text-gray-500" />
          </button>
        </div>
        <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">Describe your approach and upload any references. CoCounsel will build the skill from there.</p>
      </div>

      <div className="px-6 pb-6 pt-2 flex-1 overflow-y-auto">
        <div className="space-y-6">
        {/* Skill Name */}
        <div className="content-stretch flex flex-col gap-[8px] items-start">
          <div className="content-stretch flex flex-col items-start shrink-0 w-full">
            <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
              Skill name
            </label>
          </div>
          <input
            type="text"
            placeholder="e.g. SaaS Liability Cap - Client Side"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="w-full h-9 px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Practice Area */}
        <div className="content-stretch flex flex-col gap-[8px] items-start">
          <div className="content-stretch flex flex-col items-start shrink-0 w-full">
            <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
              Practice area
            </label>
          </div>
          <input
            type="text"
            placeholder="e.g. Commercial Contracts"
            value={practiceArea}
            onChange={(e) => setPracticeArea(e.target.value)}
            className="w-full h-9 px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* What do you want this skill to do */}
        <div className="content-stretch flex flex-col gap-[8px] items-start">
          <div className="content-stretch flex flex-col items-start shrink-0 w-full">
            <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
              What do you want this skill to do?
            </label>
            <p className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">
              Describe how you approach this type of work, including your rules and what must always or never happen. You can also paste an existing draft. Skills work best between 180-280 lines.
            </p>
          </div>
          <textarea
            rows={5}
            placeholder="Describe what this skill should do..."
            value={skillPurpose}
            onChange={(e) => setSkillPurpose(e.target.value)}
            className="w-full px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] leading-[1.35] focus:outline-none focus:border-gray-400 resize-none"
          />
        </div>

        {/* References */}
        <div className="content-stretch flex flex-col gap-[8px] items-start">
          <div className="content-stretch flex flex-col items-start shrink-0 w-full">
            <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
              References (optional)
            </label>
            <p className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">
              Upload examples, templates, or reference documents to help define this skill.
            </p>
          </div>
          <div
            className={`content-stretch flex flex-col gap-[8px] items-center justify-center p-[12px] relative rounded-[8px] min-h-[80px] transition-colors w-full ${
              isDragging ? 'bg-[#edf6ff]' : 'bg-white'
            }`}
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={handleFileDragEnter}
            onDragLeave={handleFileDragLeave}
          >
            <div aria-hidden="true" className={`absolute border-2 border-dashed inset-[-2px] pointer-events-none rounded-[10px] transition-colors ${
              isDragging ? 'border-[#054688]' : 'border-[#8a8a8a]'
            }`} />
            <Upload className="size-4 text-[#404040]" />
            <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
              <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap">
                <p className="leading-[1.35]">{isDragging ? '{Drag your file here to attach.}' : '{Or drag file here to attach.}'}</p>
              </div>
            </div>
            {isDragging && uploadedFiles.length > 0 && (
              <div className="absolute right-4 top-3 flex items-center gap-1 bg-[#0062c4] px-2.5 py-0.5 rounded-full">
                <FileText className="size-4 text-[#0062c4]" />
                <span className="text-[14px] font-['Source_Sans_3'] font-normal text-white whitespace-nowrap">
                  {uploadedFiles.length} document{uploadedFiles.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            <input
              type="file"
              multiple
              ref={fileInputRef}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2 w-full">
              {uploadedFiles.map((file, index) => {
                const isPasted = 'isPasted' in file && file.isPasted;
                const fileName = file.name;
                const fileSize = file.size;

                return (
                  <div key={index} className="flex items-center gap-3 px-3 py-2.5 bg-white border border-gray-200 rounded-lg">
                    <FileText className="size-4 text-[#0062c4] shrink-0" />
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">{fileName}</span>
                      {isPasted ? (
                        <span className="inline-block px-2 py-0.5 bg-[#e8d5ff] text-[#7c3aed] text-[12px] font-['Source_Sans_3'] font-medium rounded">
                          Pasted
                        </span>
                      ) : (
                        <span className="text-[13px] font-['Source_Sans_3'] text-gray-500">
                          {fileSize < 1024 ? `${fileSize} B` : fileSize < 1024 * 1024 ? `${(fileSize / 1024).toFixed(1)} KB` : `${(fileSize / (1024 * 1024)).toFixed(1)} MB`}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="size-5 shrink-0 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="size-4 text-gray-500" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}


        </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-[8px] p-6 bg-white sticky bottom-0">
        <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0]">
          <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
          <button
            onClick={onClose}
            className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
          >
            <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
              <p className="leading-[1.35]">Cancel</p>
            </div>
          </button>
        </div>
        <div className={`content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 ${!skillName || !skillPurpose ? 'bg-[#f2f2f2]' : 'bg-[#1d4b34] hover:bg-[#3d5e4d] transition-colors'}`}>
          <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${!skillName || !skillPurpose ? 'border-[#f2f2f2]' : 'border-[#1d4b34]'}`} />
          <button
            onClick={handleStartGeneration}
            disabled={!skillName || !skillPurpose}
            className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0 disabled:cursor-not-allowed"
          >
            <div className={`flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[15px] whitespace-nowrap ${!skillName || !skillPurpose ? 'text-[#8a8a8a]' : 'text-[#fcfcfc]'}`}>
              <p className="leading-[1.35]">Create skill</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderGeneratingStep = () => {
    const stages = [
      'Identifying reusable knowledge',
      'Classifying skill type',
      'Abstracting context-specific details',
      'Checking firm knowledge...',
      'Preparing refinement questions...'
    ];

    return (
      <>
        <style>{`
          @keyframes sparkle-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          .sparkle-icon {
            animation: sparkle-spin 2s linear infinite;
          }
          .shimmer-text {
            background: linear-gradient(90deg, #999 0%, #333 25%, #999 50%, #333 75%, #999 100%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 2s linear infinite;
          }
        `}</style>
        <div className="bg-white rounded-xl w-full max-w-lg">
          <div className="p-6">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-[20px] font-['Clario'] font-medium text-[#212223]">Generating skill</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
                <X className="size-5 text-gray-500" />
              </button>
            </div>
            <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">{skillName}</p>
          </div>

          <div className="p-8">
            <div className="space-y-3">
              {stages.map((stage, index) => {
                const isCompleted = generationProgress > index;
                const isCurrent = generationProgress === index;

                // Only show completed and current stages
                if (!isCompleted && !isCurrent) return null;

                return (
                  <div key={index} className="flex items-start gap-3">
                    {isCompleted ? (
                      <div className="size-5 shrink-0 flex items-center justify-center">
                        <div className="size-5 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg className="size-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="size-6 shrink-0 flex items-center justify-center sparkle-icon">
                        <svg className="size-6 text-[#de6633]" viewBox="0 0 24 24" fill="currentColor" strokeWidth="1" stroke="currentColor">
                          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <span className={`text-[16px] font-['Source_Sans_3'] font-normal ${
                        isCurrent ? 'shimmer-text' : 'text-gray-500'
                      }`}>
                        {stage}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderOverlapStep = () => (
    <div className="bg-white rounded-xl w-full max-w-md">
      <div className="p-6">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-[20px] font-['Clario'] font-medium text-[#212223]">Firm knowledge found</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
            <X className="size-5 text-gray-500" />
          </button>
        </div>
        <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">Your firm already has something similar.</p>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <p className="text-[16px] font-['Source_Sans_3'] font-semibold text-[#212223] mb-0.5">Skill name</p>
          <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">{skillName}</p>
        </div>

        <div className="space-y-3">
          <div className="border border-[#d2d2d2] rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-[14px] font-['Clario'] font-semibold text-[#212223]">
                Master Services Agreement - Firm Standard Positions
              </h3>
              <div className="bg-white content-stretch flex items-start justify-center relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0]">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <button className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
                  <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
                    <p className="leading-[1.2]">Review</p>
                  </div>
                </button>
              </div>
            </div>
            <p className="text-[13px] text-gray-600 mb-2">
              Covers standard MSA doctrine. SaaS liability caps are a specific application of the broader agreement framework...
            </p>
            <div className="bg-[#ffeded] content-stretch flex gap-[4px] items-center justify-center px-[4px] relative rounded-[88px] w-fit h-[20px]">
              <div aria-hidden="true" className="absolute border border-[#dc0a0a] border-solid inset-[-1px] pointer-events-none rounded-[89px]" />
              <span className="font-['Source_Sans_3'] font-normal text-[#dc0a0a] text-[12px] leading-[1.2]">
                High overlap
              </span>
            </div>
          </div>

          <div className="border border-[#d2d2d2] rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-[14px] font-['Clario'] font-semibold text-[#212223]">
                SaaS Vendor Risk - Due Diligence Framework
              </h3>
              <div className="bg-white content-stretch flex items-start justify-center relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0]">
                <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                <button className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
                  <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
                    <p className="leading-[1.2]">Review</p>
                  </div>
                </button>
              </div>
            </div>
            <p className="text-[13px] text-gray-600 mb-2">
              B2B SaaS specifically for SaaS agreements. Liability caps are a key risk mitigation component that should be evaluated with a specific...
            </p>
            <div className="bg-[#fff8e5] content-stretch flex gap-[4px] items-center justify-center px-[4px] relative rounded-[88px] w-fit h-[20px]">
              <div aria-hidden="true" className="absolute border border-[#ab3300] border-solid inset-[-1px] pointer-events-none rounded-[89px]" />
              <span className="font-['Source_Sans_3'] font-normal text-[#ab3300] text-[12px] leading-[1.2]">
                Possible overlap
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 p-6">
        <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 group hover:bg-[#edf2f0]">
          <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
          <button
            onClick={onClose}
            className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
          >
            <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[16px] whitespace-nowrap">
              <p className="leading-[1.35]">Use firm skill</p>
            </div>
          </button>
        </div>
        <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 hover:bg-[#3d5e4d] transition-colors">
          <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
          <button
            onClick={handleContinueAfterOverlap}
            className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
          >
            <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[16px] whitespace-nowrap">
              <p className="leading-[1.35]">Continue</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuestionsStep = () => {
    const question = SKILL_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / SKILL_QUESTIONS.length) * 100;

    return (
      <div className="bg-white rounded-xl w-full max-w-xl">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223] mb-1">
                A few quick questions to improve this skill
              </h2>
              <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">
                Let me ask a few questions to make sure I build exactly what you need. Once I get the following questions answered, then I'll have a better idea for what you are looking for.
              </p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
              <X className="size-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[16px] font-['Source_Sans_3'] font-semibold text-[#212223]">Question {currentQuestion + 1} of {SKILL_QUESTIONS.length}</span>
            <div className="bg-white content-stretch flex items-start justify-center relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0]">
              <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
              <button
                onClick={handleSkipQuestion}
                className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
              >
                <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
                  <p className="leading-[1.2]">Skip</p>
                </div>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-[#314b3e] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h3 className="text-[16px] font-['Clario'] font-medium text-[#212223] mb-4">
            {question.question}
          </h3>

          {question.type === 'textarea' ? (
            <textarea
              rows={6}
              placeholder={question.placeholder}
              value={answers[question.id] || ''}
              onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
              className="w-full px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] leading-[1.35] focus:outline-none focus:border-gray-400 resize-none"
            />
          ) : (
            <div className="flex flex-wrap gap-[6px] mb-4">
              {question.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => togglePill(question.id, option)}
                  className={`h-[35px] px-4 rounded-full text-[15px] font-['Clario'] font-normal transition-all border border-solid ${
                    selectedPills[question.id]?.includes(option)
                      ? 'bg-[rgb(245,247,246)] border-[rgb(80,102,91)] text-[rgb(29,75,52)]'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === 'pills' && (
            <div>
              <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35] block mb-2">
                Or describe it in your own words
              </label>
              <input
                type="text"
                placeholder="Type your answer..."
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                className="w-full h-9 px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6">
          <div className={`content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 group ${currentQuestion === 0 ? 'bg-[#f2f2f2]' : 'bg-white hover:bg-[#edf2f0]'}`}>
            <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[9px] ${currentQuestion === 0 ? 'border-[#f2f2f2]' : 'border-[#d2d2d2]'}`} />
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0 disabled:cursor-not-allowed"
            >
              <ChevronLeft className={`size-4 ${currentQuestion === 0 ? 'text-[#8a8a8a]' : 'text-[#212223] group-hover:text-[#1d4b34]'}`} />
              <div className={`flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] whitespace-nowrap ${currentQuestion === 0 ? 'text-[#8a8a8a]' : 'text-[#212223] group-hover:text-[#1d4b34]'}`}>
                <p className="leading-[1.35]">Back</p>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 hover:bg-[#3d5e4d] transition-colors">
              <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
              <button
                onClick={currentQuestion === SKILL_QUESTIONS.length - 1 ? handleBuildSkillFile : handleNextQuestion}
                className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
              >
                <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
                  <p className="leading-[1.35]">{currentQuestion === SKILL_QUESTIONS.length - 1 ? 'Build skill file' : 'Next'}</p>
                </div>
                {currentQuestion !== SKILL_QUESTIONS.length - 1 && <ChevronRight className="size-4 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBuildingStep = () => {
    return (
      <>
        <style>{`
          @keyframes sparkle-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          .sparkle-icon {
            animation: sparkle-spin 2s linear infinite;
          }
          .shimmer-text {
            background: linear-gradient(90deg, #999 0%, #333 25%, #999 50%, #333 75%, #999 100%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 2s linear infinite;
          }
        `}</style>
        <div className="bg-white rounded-xl w-full max-w-lg">
          <div className="p-6">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-[20px] font-['Clario'] font-medium text-[#212223]">Building skill</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
                <X className="size-5 text-gray-500" />
              </button>
            </div>
            <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">{skillName}</p>
          </div>

          <div className="p-8">
            <div className="flex items-start gap-3">
              <div className="size-6 shrink-0 flex items-center justify-center sparkle-icon">
                <svg className="size-6 text-[#de6633]" viewBox="0 0 24 24" fill="currentColor" strokeWidth="1" stroke="currentColor">
                  <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
                </svg>
              </div>
              <div className="flex-1">
                <span className="text-[16px] font-['Source_Sans_3'] font-normal shimmer-text">
                  Building skill file...
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };


  const renderReviewStep = () => {
    // Initialize skill content if empty
    if (!skillContent) {
      const generatedYAML = `---
name: ${skillName}
type: ${skillType.replace('-', '_')}
areas:
  practice_area: ${practiceArea}
description: ${skillPurpose}
---

# ${skillName}

## My rule

${skillPurpose}

## When to Use

- ${answers[2] || 'When client specifically requests different format'}

## Scope

${selectedPills[5]?.join(', ') || 'Universally applicable across all practice areas'}
`;
      setSkillContent(generatedYAML);
    }

    return (
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-[20px] font-['Clario'] font-medium text-[#212223]">Review skill</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
              <X className="size-5 text-gray-500" />
            </button>
          </div>
          <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">Edit before saving to your knowledge</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
          <div className="content-stretch flex flex-col gap-[8px] items-start mb-6">
            <div className="content-stretch flex flex-col items-start shrink-0 w-full">
              <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                Skill name
              </label>
            </div>
            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="w-full h-9 px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Source_Sans_3'] font-normal text-[#212223] text-[16px] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
            />
            <div className="flex items-center gap-1.5 text-[13px] font-['Source_Sans_3'] text-gray-500">
              <span>by You</span>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <div className="size-1 rounded-full bg-[#8A8A8A]" />
              <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-1 rounded-full">
                {skillType === 'output-guideline' ? 'Output guideline' : skillType === 'directing' ? 'Directing' : skillType === 'capability' ? 'Capability' : 'Content tool'}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <textarea
              value={skillContent}
              onChange={(e) => setSkillContent(e.target.value)}
              rows={16}
              className="w-full px-[12px] py-[4px] border border-[#d2d2d2] rounded-lg font-['Monaco','Courier_New',monospace] text-[#212223] text-[14px] leading-relaxed focus:outline-none focus:border-gray-400 resize-none bg-gray-50 overflow-y-auto"
            />
          </div>

          <div className="content-stretch flex flex-col gap-[8px] items-start">
            <div className="content-stretch flex flex-col items-start shrink-0 w-full">
              <label className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.35]">
                Documents
              </label>
              <p className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223] leading-[1.2]">
                CoCounsel will reference these when running this skill.
              </p>
            </div>

            {uploadedFiles.length > 0 ? (
              <div className="space-y-2 w-full">
                {uploadedFiles.map((file, index) => {
                  const isPasted = 'isPasted' in file && file.isPasted;
                  const fileName = file.name;
                  const fileSize = file.size;

                  return (
                    <div key={index} className="flex items-center gap-3 px-3 py-2.5 bg-white border border-gray-200 rounded-lg">
                      <FileText className="size-4 text-[#0062c4] shrink-0" />
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-[14px] font-['Source_Sans_3'] font-normal text-[#212223]">{fileName}</span>
                        {isPasted ? (
                          <span className="inline-block px-2 py-0.5 bg-[#e8d5ff] text-[#7c3aed] text-[12px] font-['Source_Sans_3'] font-medium rounded">
                            Pasted
                          </span>
                        ) : (
                          <span className="text-[13px] font-['Source_Sans_3'] text-gray-500">
                            {fileSize < 1024 ? `${fileSize} B` : fileSize < 1024 * 1024 ? `${(fileSize / 1024).toFixed(1)} KB` : `${(fileSize / (1024 * 1024)).toFixed(1)} MB`}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="size-5 shrink-0 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                        aria-label="Remove file"
                      >
                        <X className="size-4 text-gray-500" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[14px] font-['Source_Sans_3'] font-normal text-gray-500 w-full">
                No documents included
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 bg-white">
          <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 group hover:bg-[#edf2f0]">
            <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
            <button
              onClick={() => setStep('questions')}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
            >
              <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                <p className="leading-[1.35]">Cancel</p>
              </div>
            </button>
          </div>
          <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 hover:bg-[#3d5e4d] transition-colors">
            <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
            <button
              onClick={handleSaveToKnowledge}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
            >
              <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
                <p className="leading-[1.35]">Save skill</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SkillTooShortModal
        isOpen={showTooShortWarning}
        onClose={() => setShowTooShortWarning(false)}
        onSaveAnyway={proceedWithSaveAsIs}
        lineCount={skillPurpose.split('\n').length}
      />
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          {step === 'form' && renderFormStep()}
          {step === 'generating' && renderGeneratingStep()}
          {step === 'overlap' && renderOverlapStep()}
          {step === 'questions' && renderQuestionsStep()}
          {step === 'building' && renderBuildingStep()}
          {step === 'review' && renderReviewStep()}
        </div>
      )}
    </>
  );
}
