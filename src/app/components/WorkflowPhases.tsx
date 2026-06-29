import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp, Search, NotebookPen, BookOpen, Scale, FileCheck, FileText, Table, ClipboardList, MoreHorizontal } from 'lucide-react';
import svgPaths from '../../imports/svg-1wkqh0ufu9';

const LOGO_PATHS = [
  'p37580740', 'p20148880', 'p3c433c00', 'pea82d00', 'p38cb7f00', 'p154c6e00', 
  'p16b47400', 'p10dd9f00', 'p287133f0', 'p5e1d900', 'pd01f8c0', 'p3aa1ff80', 
  'pb176790', 'p1dc50600', 'p304ab800', 'pfe8800', 'p6131b80', 'p924cb00', 
  'p131ab400', 'pa197b00', 'p3bc9d900', 'p194d1c80', 'pa4ca400', 'p3d0aa680', 
  'p115b9f80', 'p12ebfd00', 'p15c7d400', 'p4d2e200'
];

// Artifact Card Components
function Frame() {
  return (
    <div className="col-1 ml-0 mt-0 relative row-1 size-[24px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={(svgPaths as any).p28462800} fill="white" id="Vector" />
          <path d={(svgPaths as any).p1170c200} fill="white" id="Vector_2" />
          <path clipRule="evenodd" d={(svgPaths as any).p1d481700} fill="#605E5C" fillRule="evenodd" id="Vector_3" opacity="0.64" />
          {/* Add document lines - properly centered */}
          <line x1="9" y1="10" x2="15" y2="10" stroke="#605E5C" strokeWidth="0.8" opacity="0.5" />
          <line x1="9" y1="13" x2="15" y2="13" stroke="#605E5C" strokeWidth="0.8" opacity="0.5" />
          <line x1="9" y1="16" x2="13" y2="16" stroke="#605E5C" strokeWidth="0.8" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <Frame />
    </div>
  );
}

function FileIcon3() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-center max-h-[28px] max-w-[28px] p-[10px] relative shrink-0" data-name="File icon">
      <Group />
    </div>
  );
}

function Text({ isContentGenerating, title, subtitle }: { isContentGenerating?: boolean; title?: string; subtitle?: string }) {
  return (
    <div className="flex flex-[1_0_0] flex-col items-start min-h-px min-w-0 relative" data-name="text">
      <div className={`flex flex-col font-['Clario:Medium',sans-serif] justify-center w-full not-italic overflow-hidden relative shrink-0 text-[14px] ${isContentGenerating ? 'text-[#8a8a8a] animate-shimmer' : 'text-[#212223]'}`}>
        <p className="leading-[1.35] overflow-hidden text-ellipsis whitespace-nowrap font-medium">{title || 'Response draft'}</p>
      </div>
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#404040] text-[12px] w-full overflow-hidden">
        <p className="leading-[1.35] overflow-hidden text-ellipsis whitespace-nowrap">{subtitle || 'SEC Comment Letter Response'}</p>
      </div>
    </div>
  );
}

function StatusOfReport({ onClick, isContentGenerating, title, subtitle }: { onClick?: () => void; isContentGenerating?: boolean; title?: string; subtitle?: string }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu]);

  return (
    <div 
        className="bg-white relative rounded-[8px] shrink-0 w-full z-[1] hover:bg-[#fafafa] transition-colors" 
        data-name="status of report"
    >
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]"/>
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap gap-y-[4px] items-center py-[8px] relative w-full">
          <div className="flex-[1_0_0] min-h-px min-w-px relative cursor-pointer" onClick={onClick}>
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center pl-[8px] relative w-full">
                <FileIcon3 />
                <Text isContentGenerating={isContentGenerating} title={title} subtitle={subtitle} />
              </div>
            </div>
          </div>
          
          {/* Ellipsis Menu Button */}
          <div className="relative pr-[12px]" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1.5 hover:bg-[#f0f0f0] rounded transition-colors"
            >
              <MoreHorizontal className="size-4 text-[#8a8a8a]" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-1 w-[180px] bg-white border border-[#e5e5e5] rounded-lg shadow-lg py-1 z-50"
              >
                <button className="w-full text-left px-4 py-2 text-[13px] text-[#212223] hover:bg-[#f5f5f5] transition-colors">
                  Open in new tab
                </button>
                <button className="w-full text-left px-4 py-2 text-[13px] text-[#212223] hover:bg-[#f5f5f5] transition-colors">
                  Download
                </button>
                <button className="w-full text-left px-4 py-2 text-[13px] text-[#212223] hover:bg-[#f5f5f5] transition-colors">
                  Copy link
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface WorkflowPhasesProps {
  showReasoning?: boolean;
  showSources?: boolean;
  showPreparing?: boolean;
  artifactTitle?: string;
  artifactIntro?: string;
  artifactDescription?: string;
  reasoningContent?: string;
}

export function WorkflowPhases({ showReasoning, showSources, showPreparing, artifactTitle, artifactIntro, artifactDescription, reasoningContent }: WorkflowPhasesProps) {
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(false);
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(false);
  const [isPreparingExpanded, setIsPreparingExpanded] = useState(false);
  const [showArtifact, setShowArtifact] = useState(false);

  // Show artifact when we have the title
  useEffect(() => {
    if (artifactTitle && !showArtifact) {
      setShowArtifact(true);
    }
  }, [artifactTitle, showArtifact]);

  return (
    <div className="space-y-3 w-full">
      {/* Reasoning Phase */}
      {showReasoning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-1"
        >
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
          >
            <div className="relative shrink-0 size-[16px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g>
                  {LOGO_PATHS.map((key) => (
                    <path key={key} d={(svgPaths as any)[key]} fill="#D64000" />
                  ))}
                </g>
              </svg>
            </div>
            <span className="text-[#8a8a8a] text-[13px] ml-2">Reasoning</span>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="ml-1"
            >
              {isReasoningExpanded ? (
                <ChevronUp className="size-3.5 text-[#8a8a8a]" />
              ) : (
                <ChevronDown className="size-3.5 text-[#8a8a8a]" />
              )}
            </motion.div>
          </div>

          {isReasoningExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#e5e5e5] rounded-lg shadow-sm max-h-[250px] relative overflow-hidden"
            >
              <div className="overflow-y-auto max-h-[250px] py-2 px-3">
                <div className="text-[13px] text-[#404040] leading-relaxed whitespace-pre-wrap">
                  {reasoningContent || (
                    <div className="space-y-3">
                      <p>
                        Okay, so I need to draft a response to the SEC comment letter on climate disclosures. Let me think through this step by step.
                      </p>
                      <p>
                        First, I'll review the project files to get a clear picture of the filing. I'm looking for what each staff comment asks, the existing disclosure language, and facts that support each response.
                      </p>
                      <p>
                        I should check Practical Law for comment-response templates and make sure I'm following the expected format.
                      </p>
                      <p>
                        Now I'll search Westlaw and the rules for the controlling authorities - the Regulation S-K items and recent SEC guidance on each comment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Search Results Phase */}
      {showSources && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-1"
        >
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
          >
            <Search className="size-3.5 text-[#8a8a8a]" />
            <span className="text-[#8a8a8a] text-[13px] ml-2">Search results</span>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="ml-1"
            >
              {isSourcesExpanded ? (
                <ChevronUp className="size-3.5 text-[#8a8a8a]" />
              ) : (
                <ChevronDown className="size-3.5 text-[#8a8a8a]" />
              )}
            </motion.div>
          </div>

          {isSourcesExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#e5e5e5] rounded-lg shadow-sm max-h-[250px] relative overflow-hidden"
            >
              <div className="overflow-y-auto max-h-[250px] py-2 px-3">
                <div className="text-[13px]">
                  <div className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                    <BookOpen className="size-3.5 text-[#8a8a8a] shrink-0" />
                    <p className="text-[#212223] leading-relaxed flex-1 min-w-0 text-[12px]">
                      Responding to SEC Comment Letters
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                    <Scale className="size-3.5 text-[#8a8a8a] shrink-0" />
                    <p className="text-[#212223] leading-relaxed flex-1 min-w-0 text-[12px]">
                      Regulation S-K Climate Disclosure Requirements
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                    <FileCheck className="size-3.5 text-[#8a8a8a] shrink-0" />
                    <p className="text-[#212223] leading-relaxed flex-1 min-w-0 text-[12px]">
                      Regulation S-K Items 1500-1507
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                    <Scale className="size-3.5 text-[#8a8a8a] shrink-0" />
                    <p className="text-[#212223] leading-relaxed flex-1 min-w-0 text-[12px]">
                      Recent Case Law: Minimum Contacts Analysis
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Preparing Phase */}
      {showPreparing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-1"
        >
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setIsPreparingExpanded(!isPreparingExpanded)}
          >
            <NotebookPen className="size-3.5 text-[#8a8a8a]" />
            <span className="text-[#8a8a8a] text-[13px] ml-2">Preliminary materials</span>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="ml-1"
            >
              {isPreparingExpanded ? (
                <ChevronUp className="size-3.5 text-[#8a8a8a]" />
              ) : (
                <ChevronDown className="size-3.5 text-[#8a8a8a]" />
              )}
            </motion.div>
          </div>

          {isPreparingExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#e5e5e5] rounded-lg shadow-sm max-h-[250px] relative overflow-hidden"
            >
              <div className="overflow-y-auto max-h-[250px] py-2 px-3">
                <div className="text-[13px]">
                  <div className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                    <FileText className="size-3.5 text-[#8a8a8a] shrink-0" />
                    <p className="text-[#212223] leading-relaxed flex-1 min-w-0 text-[12px]">
                      Research Memo: Disclosure Analysis
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                    <Table className="size-3.5 text-[#8a8a8a] shrink-0" />
                    <p className="text-[#212223] leading-relaxed flex-1 min-w-0 text-[12px]">
                      Comments & Authorities Matrix
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                    <ClipboardList className="size-3.5 text-[#8a8a8a] shrink-0" />
                    <p className="text-[#212223] leading-relaxed flex-1 min-w-0 text-[12px]">
                      Response Letter Outline
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                    <FileText className="size-3.5 text-[#8a8a8a] shrink-0" />
                    <p className="text-[#212223] leading-relaxed flex-1 min-w-0 text-[12px]">
                      Regulatory Authority Summary
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Artifact Card */}
      {showArtifact && artifactTitle && (
        <>
          {/* Plain text intro and description with truncation */}
          {artifactIntro && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-[14px] text-[#212223] leading-relaxed line-clamp-3"
            >
              {artifactIntro}
            </motion.p>
          )}
          {artifactDescription && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-[14px] text-[#212223] leading-relaxed line-clamp-2"
            >
              {artifactDescription}
            </motion.p>
          )}
          
          {/* Artifact card with just title and icon - constrained width */}
          <div className="max-w-[400px]">
            <StatusOfReport
              title={artifactTitle}
              subtitle="SEC Comment Letter Response"
            />
          </div>
        </>
      )}
    </div>
  );
}
