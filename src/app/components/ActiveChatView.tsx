import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../../imports/svg-1wkqh0ufu9';
import { FileText, Folder, Table, X, MessageCircleQuestion, ChevronUp, ChevronDown, ChevronRight, Search, BookOpen, Scale, FileCheck, ClipboardList, NotebookPen, Copy, Minimize2, MoreHorizontal, Download, ExternalLink, Share2, FolderInput, Trash2, Sparkles, CheckCircle2, Bell, Circle, CircleDot } from 'lucide-react';
import { PromptInput } from './PromptInput';
import { SkillClarifyingQuestions } from './SkillClarifyingQuestions';
import { SkillBuildingMessage } from './SkillBuildingMessage';
import { streamChat, streamChatHybrid } from '../services/ChatService';
import { ScrollableDropdown } from './ScrollableDropdown';
import { ConvertToMonitorButton } from './monitoring/ConvertToMonitorButton';
import { getReasoningContent, getSourceContent } from '../utils/chatReasoningContent';
import { DynamicReasoningSteps } from './chat/DynamicReasoningSteps';
import { DynamicSourceItems } from './chat/DynamicSourceItems';
import { HorizonScanResults, RegulatoryScanSummary } from './regulatory';
import { CPCHandoffScreen } from './CPCHandoffScreen';
import { CPCScanSummary } from './regulatory/CPCScanSummary';

interface StagedItem {
    id: string;
    name: string;
    type: string;
}

interface ActiveChatViewProps {
  prompt: string;
  attachments: StagedItem[];
  onNewPrompt: (prompt: string, attachments: StagedItem[]) => void;
  onThinkingChange?: (isThinking: boolean) => void;
  onOpenTab?: (item: { name: string, type: string }) => void;
  initialMessages?: any[];
  onMessagesChange?: (messages: any[]) => void;
  onArtifactCreated?: (item: { name: string, type: string, sourceChatMessages?: any[] }) => void;
  mode?: 'chatgpt' | 'hybrid';
  cocounselToken?: string;
  isSkillCreation?: boolean;
  showClarifyingQuestions?: boolean;
  onSubmitQuestions?: (answers: any) => void;
  onSkipQuestions?: () => void;
  currentTabId?: string;
  appendCPCPrompt?: string; // New: append CPC workflow to existing chat without remounting
  onCPCAppended?: () => void; // New: callback when CPC has been appended
}

const LOGO_PATHS = [
  'p37580740', 'p20148880', 'p3c433c00', 'pea82d00', 'p38cb7f00', 'p154c6e00', 
  'p16b47400', 'p10dd9f00', 'p287133f0', 'p5e1d900', 'pd01f8c0', 'p3aa1ff80', 
  'pb176790', 'p1dc50600', 'p304ab800', 'pfe8800', 'p6131b80', 'p924cb00', 
  'p131ab400', 'pa197b00', 'p3bc9d900', 'p194d1c80', 'pa4ca400', 'p3d0aa680', 
  'p115b9f80', 'p12ebfd00', 'p15c7d400', 'p4d2e200'
];

function ThinkingSpinner() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Vector">
            {LOGO_PATHS.map((key, index) => (
                <motion.path 
                  key={key} 
                  d={(svgPaths as any)[key]} 
                  fill="#D64000"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.05
                  }}
                />
            ))}
          </g>
        </svg>
    </div>
  );
}

function FileChip({ file }: { file: StagedItem }) {
  return (
    <div className="bg-white h-[32px] max-h-[32px] max-w-[240px] relative rounded-[4px] shrink-0 border border-[#E5E5E5] flex items-center px-2 gap-2">
        {file.type === 'folder' && <Folder className="size-3.5 text-[#DE6633] fill-[#F8EADD]" />}
        {file.type === 'file' && <FileText className="size-3.5 text-[#054688]" />}
        {(file.type === 'table' || file.type === 'doc') && <FileText className="size-3.5 text-[#666666]" />}
        {file.type === 'research' && <MessageCircleQuestion className="size-3.5 text-[#666666]" />}
        <span className="text-[13px] text-[#212223] truncate">{file.name}</span>
    </div>
  );
}

// --- Figma Components for Agent Response ---

function Skill() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="skill">
      <div className="relative shrink-0 size-[20px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Vector">
            <path d={svgPaths.p37580740} fill="#D64000" />
            <path d={svgPaths.p20148880} fill="#D64000" />
            <path d={svgPaths.p3c433c00} fill="#D64000" />
            <path d={svgPaths.pea82d00} fill="#D64000" />
            <path d={svgPaths.p38cb7f00} fill="#D64000" />
            <path d={svgPaths.p154c6e00} fill="#D64000" />
            <path d={svgPaths.p16b47400} fill="#D64000" />
            <path d={svgPaths.p10dd9f00} fill="#D64000" />
            <path d={svgPaths.p287133f0} fill="#D64000" />
            <path d={svgPaths.p5e1d900} fill="#D64000" />
            <path d={svgPaths.pd01f8c0} fill="#D64000" />
            <path d={svgPaths.p3aa1ff80} fill="#D64000" />
            <path d={svgPaths.pb176790} fill="#D64000" />
            <path d={svgPaths.p1dc50600} fill="#D64000" />
            <path d={svgPaths.p304ab800} fill="#D64000" />
            <path d={svgPaths.pfe8800} fill="#D64000" />
            <path d={svgPaths.p6131b80} fill="#D64000" />
            <path d={svgPaths.p924cb00} fill="#D64000" />
            <path d={svgPaths.p131ab400} fill="#D64000" />
            <path d={svgPaths.pa197b00} fill="#D64000" />
            <path d={svgPaths.p3bc9d900} fill="#D64000" />
            <path d={svgPaths.p194d1c80} fill="#D64000" />
            <path d={svgPaths.pa4ca400} fill="#D64000" />
            <path d={svgPaths.p3d0aa680} fill="#D64000" />
            <path d={svgPaths.p115b9f80} fill="#D64000" />
            <path d={svgPaths.p12ebfd00} fill="#D64000" />
            <path d={svgPaths.p15c7d400} fill="#D64000" />
            <path d={svgPaths.p4d2e200} fill="#D64000" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[#8a8a8a] text-[14px] text-ellipsis whitespace-nowrap">
        <p className="leading-[1.35] overflow-hidden">CoCounsel</p>
      </div>
    </div>
  );
}

function NonSkillHeader() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between max-w-[800px] relative shrink-0 w-full z-[3]" data-name="non-skill-header">
      <Skill />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[6px] h-[23px] items-center leading-[0] relative shrink-0 w-full whitespace-nowrap z-[6]">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Solid',sans-serif] justify-center not-italic relative shrink-0 text-[#404040] text-[14px] text-center">
        <p className="leading-[normal]"></p>
      </div>
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#212223] text-[15px]">
        <p className="leading-[1.5]">Workflow steps</p>
      </div>
    </div>
  );
}

function Icon({ char, color = "#8a8a8a" }: { char: string, color?: string }) {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pt-[2px] relative shrink-0 size-[20px]" data-name="Icon">
      <div className="flex flex-col font-['Font_Awesome_6_Sharp:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center w-[14px]" style={{ color }}>
        <p className="leading-[normal] whitespace-pre-wrap">{char}</p>
      </div>
    </div>
  );
}

function StepItem({ iconChar, text, iconColor }: { iconChar: string, text: string, iconColor?: string }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex gap-[6px] items-start p-[4px] relative w-full">
        <Icon char={iconChar} color={iconColor} />
        <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px relative">
          <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#212223] text-[15px] w-full">
            <p className="leading-[1.5] whitespace-pre-wrap">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plan() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Plan">
      <StepItem iconChar="" text="Summarize complaint" iconColor="#d64000" />
      <StepItem iconChar="" text="Choose arguments" />
      <StepItem iconChar="" text="Choose authorities" />
      <StepItem iconChar="" text="Distinguish citations" />
      <StepItem iconChar="" text="Choose a template" />
      <StepItem iconChar="" text="Confirm outline and specifications" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[5]">
      <Plan />
    </div>
  );
}

function Frame() {
  return (
    <div className="col-1 ml-0 mt-0 relative row-1 size-[24px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p28462800} fill="white" id="Vector" />
          <path d={svgPaths.p1170c200} fill="white" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p1d481700} fill="#605E5C" fillRule="evenodd" id="Vector_3" opacity="0.64" />
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

function Text({ isContentGenerating, artifactCategory, artifactName }: { isContentGenerating?: boolean; artifactCategory?: string; artifactName?: string }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[0] min-h-px min-w-px relative whitespace-nowrap" data-name="text">
      <div className={`flex flex-col font-['Clario:Medium',sans-serif] justify-center min-w-full not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis w-[min-content] ${isContentGenerating ? 'text-[#8a8a8a] animate-shimmer' : 'text-[#212223]'}`}>
        <p className="leading-[1.35] overflow-hidden font-medium">{artifactCategory || 'Motion draft'}</p>
      </div>
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#404040] text-[12px]">
        <p className="leading-[1.35]">{artifactName || 'Motion to Dismiss - Personal Jurisdiction'}</p>
      </div>
    </div>
  );
}

function TitleGroup({ isContentGenerating, artifactCategory, artifactName }: { isContentGenerating?: boolean; artifactCategory?: string; artifactName?: string }) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="title group">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] relative w-full">
          <FileIcon3 />
          <Text isContentGenerating={isContentGenerating} artifactCategory={artifactCategory} artifactName={artifactName} />
        </div>
      </div>
    </div>
  );
}

function StatusOfReport({ onClick, isContentGenerating, artifactCategory, artifactName }: { onClick?: () => void; isContentGenerating?: boolean; artifactCategory?: string; artifactName?: string }) {
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
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap gap-y-[4px] items-center py-[8px] relative w-full">
          <div className="flex-[1_0_0] min-h-px min-w-px relative cursor-pointer" onClick={onClick}>
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center pl-[8px] relative w-full">
                <FileIcon3 />
                <Text isContentGenerating={isContentGenerating} artifactCategory={artifactCategory} artifactName={artifactName} />
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
                className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#e5e5e5] rounded-lg shadow-lg z-50 py-1"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    // Handle download
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#212223] hover:bg-[#f5f5f5] transition-colors"
                >
                  <Download className="size-4 text-[#8a8a8a]" />
                  <span>Download</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    onClick?.();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#212223] hover:bg-[#f5f5f5] transition-colors"
                >
                  <ExternalLink className="size-4 text-[#8a8a8a]" />
                  <span>Open in...</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    // Handle share
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#212223] hover:bg-[#f5f5f5] transition-colors"
                >
                  <Share2 className="size-4 text-[#8a8a8a]" />
                  <span>Share</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    // Handle move
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#212223] hover:bg-[#f5f5f5] transition-colors"
                >
                  <FolderInput className="size-4 text-[#8a8a8a]" />
                  <span>Move</span>
                </button>
                
                <div className="border-t border-[#e5e5e5] my-1" />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    // Handle delete
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#d64000] hover:bg-[#fef2ee] transition-colors"
                >
                  <Trash2 className="size-4" />
                  <span>Delete</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ onArtifactClick }: { onArtifactClick?: () => void }) {
  return (
    <div className="content-stretch flex flex-col isolate items-start max-w-[800px] relative shrink-0 w-full" data-name="Card">
      <StatusOfReport onClick={onArtifactClick} />
    </div>
  );
}

function GuidedResearchPlan({ onArtifactClick }: { onArtifactClick?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[4]" data-name="Guided research plan">
      <Card onArtifactClick={onArtifactClick} />
    </div>
  );
}

function Intake({ onArtifactClick }: { onArtifactClick?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] isolate items-start max-w-[800px] p-[24px] relative rounded-[8px] shrink-0 w-full border border-[#e5e5e5] bg-white z-[1]" data-name="Intake">
      <Frame9 />
      <Frame2 />
      <GuidedResearchPlan onArtifactClick={onArtifactClick} />
    </div>
  );
}

function MessageContent({ onArtifactClick }: { onArtifactClick?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] isolate items-start max-w-[800px] relative shrink-0 w-full" data-name="message content">
      <NonSkillHeader />
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[#212223] text-[15px] w-[min-content] z-[2]">
        <p className="leading-[1.5] whitespace-pre-wrap">I've outlined a motion to dismiss based on the complaint and precedent provided.</p>
      </div>
      <Intake onArtifactClick={onArtifactClick} />
    </div>
  );
}

// New Artifact Card Component based on screenshot
function ArtifactCard({ onArtifactClick, streamedIntroText, streamedDescText, isContentGenerating, showOpeningMessage, artifactName, artifactCategory }: { 
  onArtifactClick?: () => void;
  streamedIntroText: string;
  streamedDescText: string;
  isContentGenerating: boolean;
  showOpeningMessage: boolean;
  artifactName?: string;
  artifactCategory?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-4 max-w-[800px] mr-auto w-full"
    >
      {/* Introductory Text */}
      {streamedIntroText && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[#212223] text-[15px] leading-[1.5]"
        >
          {streamedIntroText}
        </motion.div>
      )}

      {/* Description Paragraph */}
      {streamedDescText && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#212223] text-[15px] leading-[1.5]"
        >
          {streamedDescText}
        </motion.div>
      )}

      {/* Old Gray Container Artifact Card with max-width */}
      <div className="max-w-[400px]">
        <StatusOfReport onClick={onArtifactClick} isContentGenerating={isContentGenerating} artifactCategory={artifactCategory} artifactName={artifactName} />
      </div>
    </motion.div>
  );
}

export function ActiveChatView({ prompt, attachments, onNewPrompt, onThinkingChange, onOpenTab, initialMessages, onMessagesChange, onArtifactCreated, mode = 'chatgpt', cocounselToken, isSkillCreation = false, showClarifyingQuestions = false, onSubmitQuestions, onSkipQuestions, currentTabId, appendCPCPrompt, onCPCAppended }: ActiveChatViewProps) {
  const navigate = useNavigate();

  console.log('🎬 ActiveChatView rendering with initialMessages:', initialMessages);

  // Restore a previously-completed regulatory scan for this chat. The completed
  // view is purely state-driven (taskType/showArtifact/dropdowns/streamedIntro/
  // isStreamingComplete) and was never persisted, so closing the table tab
  // remounted this component and re-ran the whole thinking simulation. We
  // snapshot the finished state to sessionStorage on completion and restore it
  // here on mount so the chat returns to its completed result instantly.
  // (Skip when this is a CPC re-entry — that path seeds its own initialMessages.)
  const [restoredScan] = useState<{ introText: string; topic: string } | null>(() => {
    try {
      if (!currentTabId) return null;
      if (initialMessages && initialMessages.length > 1) return null;
      const raw = sessionStorage.getItem(`chat_${currentTabId}_completedScan`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string | React.ReactNode, attachments?: StagedItem[], isFigmaContent?: boolean, workflowData?: {showReasoning?: boolean, showSources?: boolean, showPreparing?: boolean, documentTitle?: string, artifactIntro?: string, artifactDescription?: string}}[]>(
    initialMessages ||
    (restoredScan
      ? [
          { role: 'user', text: prompt, attachments },
          { role: 'assistant', text: restoredScan.topic || 'Regulatory Changes', isFigmaContent: true },
        ]
      : [{ role: 'user', text: prompt, attachments }])
  );

  console.log('📨 ActiveChatView messages state:', messages);

  const [showThinking, setShowThinking] = useState(false);
  const [stagedFiles, setStagedFiles] = useState<StagedItem[]>([]);
  const [showReasoningDropdown, setShowReasoningDropdown] = useState(false);
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(false);
  const [reasoningSteps, setReasoningSteps] = useState<number>(0);
  const [showSkillQuestions, setShowSkillQuestions] = useState(false);
  const [isReasoningLoading, setIsReasoningLoading] = useState(false);
  const [showSearching, setShowSearching] = useState(false);
  const [showSourcesDropdown, setShowSourcesDropdown] = useState(false);
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(false);
  const [sourcesItems, setSourcesItems] = useState<number>(0);
  const [isSourcesLoading, setIsSourcesLoading] = useState(false);
  const [showPreparing, setShowPreparing] = useState(false);
  const [showPreparingDropdown, setShowPreparingDropdown] = useState(false);
  const [isPreparingExpanded, setIsPreparingExpanded] = useState(false);
  const [preparingItems, setPreparingItems] = useState<number>(0);
  const [isPreparingLoading, setIsPreparingLoading] = useState(false);
  const [showArtifact, setShowArtifact] = useState(!!restoredScan);
  const [showCreating, setShowCreating] = useState(false);
  const [showCreatingDropdown, setShowCreatingDropdown] = useState(false);
  const [isCreatingExpanded, setIsCreatingExpanded] = useState(false);
  const [creatingItems, setCreatingItems] = useState<number>(0);
  const [isContentGenerating, setIsContentGenerating] = useState(false);
  const [streamedIntroText, setStreamedIntroText] = useState(restoredScan?.introText || '');
  const [streamedDescText, setStreamedDescText] = useState('');
  const [isStreamingComplete, setIsStreamingComplete] = useState(!!restoredScan);
  const [showOpeningMessage, setShowOpeningMessage] = useState(false);
  const [hasDocumentOpened, setHasDocumentOpened] = useState(false);
  const [artifactName, setArtifactName] = useState('Motion to Dismiss');
  const [artifactCategory, setArtifactCategory] = useState('Motion');
  const [artifactSummary, setArtifactSummary] = useState('');
  const [showPreparingFinalOutput, setShowPreparingFinalOutput] = useState(false);
  const [taskType, setTaskType] = useState<'draft' | 'research' | 'analyze' | 'regulatory-scan' | 'cpc-analysis'>(restoredScan ? 'regulatory-scan' : 'draft'); // Track task type
  const [researchTopic, setResearchTopic] = useState('');
  const [reasoningContent, setReasoningContent] = useState(getReasoningContent('draft', ''));
  const [sourceContent, setSourceContent] = useState(getSourceContent('draft', ''));
  const [showMonitoringPrompt, setShowMonitoringPrompt] = useState(true);
  const [showMonitoringConfirmation, setShowMonitoringConfirmation] = useState(false);
  const [prepWorkItems, setPrepWorkItems] = useState<Array<{title: string; type: string}>>([]);
  const [cpcRegulation, setCpcRegulation] = useState('');
  const [cpcDocsAffected, setCpcDocsAffected] = useState(0);
  const [cpcClausesAffected, setCpcClausesAffected] = useState(0);
  const [cpcImpactLevel, setCpcImpactLevel] = useState('');

  // Track component mount state to prevent updates after unmount
  const isMountedRef = useRef(true);
  
  // Store all timer IDs for cleanup
  const timersRef = useRef<number[]>([]);
  const intervalsRef = useRef<number[]>([]);
  
  // Cleanup function to clear all timers - using ref to avoid recreating
  const clearAllTimersRef = useRef(() => {
    timersRef.current.forEach(id => clearTimeout(id));
    intervalsRef.current.forEach(id => clearInterval(id));
    timersRef.current = [];
    intervalsRef.current = [];
  });
  
  // Cleanup on unmount - NO dependencies to prevent re-running
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      clearAllTimersRef.current();
    };
  }, []); // Empty dependency array - run once on mount, cleanup on unmount

  // Helper to add tracked setTimeout
  const safeSetTimeout = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      if (isMountedRef.current) {
        callback();
      }
    }, delay);
    timersRef.current.push(id);
    return id;
  }, []);
  
  // Helper to add tracked setInterval
  const safeSetInterval = useCallback((callback: () => void, delay: number) => {
    const id = window.setInterval(() => {
      if (isMountedRef.current) {
        callback();
      }
    }, delay);
    intervalsRef.current.push(id);
    return id;
  }, []);
  
  // Propagate messages to parent for state management
  const onMessagesChangeRef = useRef(onMessagesChange);
  const messagesUpdateTimerRef = useRef<number | null>(null);
  
  useEffect(() => {
    onMessagesChangeRef.current = onMessagesChange;
  }, [onMessagesChange]);

  useEffect(() => {
    // Debounce messages updates to prevent blocking navigation
    // Clear any pending update
    if (messagesUpdateTimerRef.current) {
      clearTimeout(messagesUpdateTimerRef.current);
    }
    
    // Schedule update (or execute immediately if unmounting)
    if (isMountedRef.current) {
      messagesUpdateTimerRef.current = window.setTimeout(() => {
        if (isMountedRef.current) {
          onMessagesChangeRef.current?.(messages);
        }
      }, 100); // Debounce by 100ms
    }
    
    // Cleanup
    return () => {
      if (messagesUpdateTimerRef.current) {
        clearTimeout(messagesUpdateTimerRef.current);
      }
    };
  }, [messages]);

  // Handle appending CPC workflow to existing chat without remounting
  const hasAppendedCPCRef = useRef(false);
  useEffect(() => {
    if (appendCPCPrompt && appendCPCPrompt.length > 0 && !hasAppendedCPCRef.current) {
      hasAppendedCPCRef.current = true;
      console.log('[v0] ActiveChatView: Appending CPC prompt to existing chat:', appendCPCPrompt);

      // Build the new history explicitly from the current messages (on a CPC
      // re-entry these are the seeded recap messages). Append the CPC user
      // message, then drive the workflow OUTSIDE of any setState updater so the
      // side-effecting processChatHybrid call runs reliably (updaters must be
      // pure and may be invoked twice in StrictMode).
      const cpcMessage = { role: 'user' as const, text: appendCPCPrompt, attachments: [] };
      const nextHistory = [...messages, cpcMessage];
      setMessages(nextHistory);

      // Notify parent that CPC has been appended
      onCPCAppended?.();

      // Trigger the CPC workflow once the new user message has rendered.
      // Use the same processing function the component uses for follow-ups so
      // it matches the active mode (ChatPage defaults to 'chatgpt').
      safeSetTimeout(() => {
        if (mode === 'hybrid') {
          processChatHybrid(nextHistory).catch(err => {
            console.error('[v0] processChatHybrid error (CPC append):', err);
          });
        } else {
          Promise.resolve(processChat(nextHistory)).catch(err => {
            console.error('[v0] processChat error (CPC append):', err);
          });
        }
      }, 200);
    }
  }, [appendCPCPrompt]);

  const processChat = useCallback(async (history: any[]) => {
    // Clear any existing timers before starting new workflow
    clearAllTimersRef.current();
    
    // Use the last user message text for detection (more accurate than prompt prop)
    const lastUserMsg = history.filter(m => m.role === 'user').pop();
    const userPrompt = (lastUserMsg?.text || prompt).toLowerCase();
    let detectedType: 'draft' | 'research' | 'analyze' | 'regulatory-scan' | 'cpc-analysis' = 'draft';
    let topic = '';
    
    // Check for CPC analysis FIRST (highest priority)
    if (userPrompt.includes('initiate cross-product clause analysis') || userPrompt.includes('initiate cpc')) {
      console.log('[v0] processChat: CPC ANALYSIS DETECTED!');
      detectedType = 'cpc-analysis';
      
      // Extract regulation name from prompt
      const regulationMatch = userPrompt.match(/analysis for:\s*(.+)/i);
      const regulation = regulationMatch ? regulationMatch[1].trim() : 'Regulatory Change';
      topic = regulation;
      setCpcRegulation(regulation);
      
      // Get CPC workflow data from sessionStorage
      const workflowData = sessionStorage.getItem('pendingCPCWorkflow');
      if (workflowData) {
        const { docsAffected, clausesAffected, impactLevel } = JSON.parse(workflowData);
        setCpcDocsAffected(docsAffected || 3);
        setCpcClausesAffected(clausesAffected || 12);
        setCpcImpactLevel(impactLevel || 'High');
        // NOTE: do NOT removeItem here. The Layout double-mounts the page, so a
        // discarded mount removing this would starve the surviving mount.
        // ChatPage clears it on a delayed timer instead.
        console.log('[v0] processChat: CPC data loaded from sessionStorage');
      } else {
        // Default values if no data
        setCpcDocsAffected(3);
        setCpcClausesAffected(12);
        setCpcImpactLevel('High');
      }
      // CPC will now run through the full workflow animation below
    }

    // Check for regulatory scan
    if ((userPrompt.includes('scan') || userPrompt.includes('check') || userPrompt.includes('identify')) &&
        (userPrompt.includes('regulatory') || userPrompt.includes('regulation')) &&
        (userPrompt.includes('change') || userPrompt.includes('update') || userPrompt.includes('affect'))) {
      detectedType = 'regulatory-scan';
      topic = 'Regulatory Changes';
    } else if (userPrompt.includes('research') || userPrompt.includes('analyze')) {
      if (userPrompt.includes('analyze') || userPrompt.includes('review')) {
        detectedType = 'analyze';
      } else {
        detectedType = 'research';
      }
      
      // Extract topic for research tasks
      if (userPrompt.includes('jurisdiction')) {
        topic = 'Personal Jurisdiction Requirements';
        setArtifactName('Personal Jurisdiction Research');
        setArtifactCategory('Research memo');
      } else if (userPrompt.includes('statute of limitations')) {
        topic = 'Statute of Limitations Analysis';
        setArtifactName('Statute of Limitations Research');
        setArtifactCategory('Research memo');
      } else if (userPrompt.includes('gdpr') || userPrompt.includes('data privacy') || userPrompt.includes('privacy')) {
        topic = 'GDPR Compliance Requirements';
        setArtifactName('GDPR Compliance Research');
        setArtifactCategory('Research memo');
      } else if (userPrompt.includes('discovery sanction')) {
        topic = 'Discovery Sanctions Standards';
        setArtifactName('Discovery Sanctions Research');
        setArtifactCategory('Research memo');
      } else if (userPrompt.includes('employment') || userPrompt.includes('discrimination')) {
        topic = 'Employment Discrimination Standards';
        setArtifactName('Employment Law Research');
        setArtifactCategory('Research memo');
      } else if (userPrompt.includes('patent')) {
        topic = 'Patent Eligibility Analysis';
        setArtifactName('Patent Law Research');
        setArtifactCategory('Research memo');
      } else if (userPrompt.includes('force majeure')) {
        topic = 'Force Majeure Analysis';
        setArtifactName('Force Majeure Research');
        setArtifactCategory('Research memo');
      } else if (userPrompt.includes('class action')) {
        topic = 'Class Action Certification';
        setArtifactName('Class Action Research');
        setArtifactCategory('Research memo');
      } else {
        topic = 'Legal Research Analysis';
        setArtifactName('Legal Research Memo');
        setArtifactCategory('Research memo');
      }
    } else if (detectedType === 'analyze') {
      setArtifactName('Document Analysis');
      setArtifactCategory('Analysis');
    } else if (detectedType === 'cpc-analysis') {
      setArtifactName('Cross-product clause analysis');
      setArtifactCategory('CPC Analysis');
    } else if (detectedType === 'regulatory-scan') {
      setArtifactName('M&A regulatory findings');
      setArtifactCategory('Regulatory scan');
    } else {
      setArtifactName('Motion to Dismiss');
      setArtifactCategory('Motion');
    }
    
    setTaskType(detectedType);
    setResearchTopic(topic);
    setReasoningContent(getReasoningContent(detectedType, topic));
    setSourceContent(getSourceContent(detectedType, topic));
    
    setShowThinking(true);
    setShowReasoningDropdown(false);
    setIsReasoningExpanded(false);
    setReasoningSteps(0);
    setIsReasoningLoading(false);
    setShowSearching(false);
    setShowSourcesDropdown(false);
    setIsSourcesExpanded(false);
    setSourcesItems(0);
    setIsSourcesLoading(false);
    setShowPreparing(false);
    setShowPreparingDropdown(false);
    setIsPreparingExpanded(false);
    setPreparingItems(0);
    setIsPreparingLoading(false);
    setShowArtifact(false);
    setShowCreating(false);
    setShowCreatingDropdown(false);
    setIsCreatingExpanded(false);
    setCreatingItems(0);
    setIsContentGenerating(false);
    setStreamedIntroText('');
    setStreamedDescText('');
    setIsStreamingComplete(false);
    setShowOpeningMessage(false);
    setHasDocumentOpened(false);
    setArtifactSummary('');
    setShowPreparingFinalOutput(false);
    onThinkingChange?.(true);

    // Surface a proactive Horizon Scan notification mid-task (slides up while
    // the user is working, rather than appearing immediately on load).
    safeSetTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("horizonScanAlert", {
          detail: {
            title: "Documents impacted in M&A Diligence",
            detail: "3 documents affected by new SEC guidance",
          },
        })
      );
    }, 6000);

    try {
        // Add placeholder for assistant response
        setMessages(prev => {
             if (prev.length > 0 && prev[prev.length - 1].role === 'assistant') return prev;
             return [...prev, { role: 'assistant', text: '' }];
        });

        // After 2 seconds, show the reasoning dropdown
        safeSetTimeout(() => {
          setShowReasoningDropdown(true);
          setIsReasoningExpanded(true);
          setIsReasoningLoading(true);
          
          // Stream in reasoning steps
          let step = 0;
          const stepInterval = safeSetInterval(() => {
            step++;
            setReasoningSteps(step);
            if (step >= 5) {
              clearInterval(stepInterval);
              setIsReasoningLoading(false);
              
              // After reasoning completes, start searching phase
              safeSetTimeout(() => {
                setShowThinking(false);
                setIsReasoningExpanded(false); // Collapse reasoning when searching starts
                setShowSearching(true);
                
                // After 800ms of searching (reduced from 1.5s), show searching dropdown with sources
                safeSetTimeout(() => {
                  setShowSourcesDropdown(true);
                  setIsSourcesExpanded(true);
                  setIsSourcesLoading(true);
                  
                  // Stream in sources
                  let sourceIdx = 0;
                  const sourcesInterval = safeSetInterval(() => {
                    sourceIdx++;
                    setSourcesItems(sourceIdx);
                    if (sourceIdx >= 6) {
                      clearInterval(sourcesInterval);
                      setIsSourcesLoading(false);
                      
                      // After sources complete, start preparing phase (underneath searching)
                      safeSetTimeout(() => {
                        setIsSourcesExpanded(false); // Collapse searching when preparing starts
                        setShowPreparing(true);
                        
                        // After 5 seconds of preparing, show preparing dropdown with work items
                        safeSetTimeout(() => {
                          setShowPreparingDropdown(true);
                          setIsPreparingExpanded(true);
                          setIsPreparingLoading(true);
                          
                          // Stream in preparing items with varied, realistic timing
                          const preparingTimings = [1200, 800, 1500, 900, 1100]; // Varied delays in ms
                          let prepIdx = 0;
                          
                          const addNextPreparingItem = () => {
                            prepIdx++;
                            setPreparingItems(prepIdx);
                            
                            if (prepIdx < 5) {
                              safeSetTimeout(addNextPreparingItem, preparingTimings[prepIdx]);
                            } else {
                              setIsPreparingLoading(false);
                              // After preparing completes, collapse it and show "Compiling research..."
                              safeSetTimeout(() => {
                                console.log('>>> Collapsing preparing dropdown');
                                setIsPreparingExpanded(false); // Collapse preparing dropdown
                                
                                // Show "Preparing final output..." text (keep preparing section visible in collapsed state)
                                safeSetTimeout(() => {
                                  // Don't hide preparing section - it should stay visible like reasoning and searching
                                  // setShowPreparing(false); // REMOVED: Keep preparing section visible
                                  setShowPreparingFinalOutput(true);
                                  setIsContentGenerating(true);
                                  
                                  // After 2000ms, hide "Preparing final output..." and show artifact
                                  safeSetTimeout(() => {
                                    setShowPreparingFinalOutput(false);
                                    setShowArtifact(true); // Show the final artifact card
                                  
                                    // Generate dynamic intro and description based on task type and topic
                                    let introText = '';
                                    let descText = '';
                                    
                                    if (detectedType === 'research') {
                                      introText = `I've completed comprehensive research on ${topic.toLowerCase()}.`;
                                      descText = `This research memo synthesizes relevant case law, statutory provisions, and legal standards. It includes sections on legal framework, key precedents, jurisdictional variations, and practical applications. The memo provides citations to primary sources and identifies current trends in this area of law.`;
                                    } else if (detectedType === 'analyze') {
                                      introText = `I've analyzed ${topic.toLowerCase()} based on the information provided.`;
                                      descText = `This analysis examines the legal standards, applies them to the facts, and identifies key considerations. It includes discussion of relevant precedents, potential arguments, and strategic recommendations. Let me know if you'd like me to explore any particular aspect in more detail.`;
                                    } else if (detectedType === 'regulatory-scan') {
                                      introText = `I ran a regulatory horizon scan across federal and state sources to identify any changes that may impact your M&A contract templates.`;
                                      descText = ``;
                                    } else if (detectedType === 'cpc-analysis') {
                                      introText = `I've initiated the Cross-Product Clause analysis for ${topic}. Here's a summary of the affected documents and recommended updates:`;
                                      descText = ``;
                                    } else {
                                      introText = `I've drafted ${topic.toLowerCase()}.`;
                                      descText = `This document includes the necessary legal arguments, supporting precedents, and procedural requirements. It's structured with appropriate sections and citations. Let me know if you'd like to revise any arguments or add additional support.`;
                                    }
                                    
                                    let introIdx = 0;
                                      
                                    const introInterval = safeSetInterval(() => {
                                      if (introIdx < introText.length) {
                                        setStreamedIntroText(introText.slice(0, introIdx + 1));
                                        introIdx++;
                                      } else {
                                        clearInterval(introInterval);
                                        
                                        // Then stream description text character by character after intro completes
                                        safeSetTimeout(() => {
                                          let descIdx = 0;
                                          
                                          const descInterval = safeSetInterval(() => {
                                            if (descIdx < descText.length) {
                                              setStreamedDescText(descText.slice(0, descIdx + 1));
                                              descIdx++;
                                            } else {
                                              clearInterval(descInterval);
                                              
                                              // Mark streaming as complete after description finishes
                                              safeSetTimeout(() => {
                                                setIsStreamingComplete(true);

                                                // Persist a completed regulatory scan so closing the
                                                // table tab and returning to this chat restores the
                                                // result instead of re-running the thinking simulation.
                                                if (detectedType === 'regulatory-scan' && currentTabId) {
                                                  try {
                                                    sessionStorage.setItem(
                                                      `chat_${currentTabId}_completedScan`,
                                                      JSON.stringify({ introText, topic })
                                                    );
                                                  } catch (e) {
                                                    console.warn('[v0] Failed to persist completed scan', e);
                                                  }
                                                }

                                                // Update messages with complete assistant response
                                                setMessages(prev => {
                                                  const updated = [...prev];
                                                  const lastMsg = updated[updated.length - 1];
                                                  if (lastMsg && lastMsg.role === 'assistant') {
                                                    // Build complete assistant response including all phases
                                                    lastMsg.text = topic; // Simple text representation
                                                    lastMsg.isFigmaContent = true; // Mark as containing the full workflow
                                                    // Add workflow data for ChatSidebar display
                                                    (lastMsg as any).workflowData = {
                                                      showReasoning: true,
                                                      showSources: true,
                                                      showPreparing: true,
                                                      documentTitle: topic,
                                                      artifactIntro: introText,
                                                      artifactDescription: descText
                                                    };
                                                  }
                                                  return updated;
                                                });
                                              }, 300); // Brief pause before marking complete
                                            }
                                          }, 5); // 5ms per character for smooth streaming (doubled speed)
                                        }, 300); // Brief pause between intro and description
                                      }
                                    }, 7.5); // 7.5ms per character for intro (doubled speed)
                                    
                                    onThinkingChange?.(false);
                                  }, 2000); // Wait 2000ms showing "Compiling research..." before artifact appears
                                }, 300); // Brief delay before showing "Compiling research..."
                              }, 1000);
                            }
                          };
                          
                          // Start with first item
                          safeSetTimeout(addNextPreparingItem, preparingTimings[0]);
                        }, 5000);
                      }, 1000);
                    }
                  }, 200);
                }, 800); // Reduced from 1.5s to 800ms
              }, 1000);
            }
          }, 400);
        }, 2000);
    } catch (error) {
        console.error("Chat error:", error);
        const errorMessage = error instanceof Error ? error.message : "I'm sorry, I'm having trouble connecting to the server right now.";
        
        setMessages(prev => {
             const newMsgs = [...prev];
             const lastMsg = newMsgs[newMsgs.length - 1];
             
             // If the last message was the assistant thinking (empty text), update it
             if (lastMsg && lastMsg.role === 'assistant' && !lastMsg.text) {
                 lastMsg.text = errorMessage;
             } else {
                 // Otherwise append a new error message
                 return [...newMsgs, { role: 'assistant', text: errorMessage }];
             }
             return newMsgs;
        });
        
        // Clean up on error
        setShowThinking(false);
        setShowPreparing(false);
        setShowCreating(false);
        onThinkingChange?.(false);
    }
  }, [onThinkingChange, safeSetTimeout, safeSetInterval]); // Removed clearAllTimers dependency

  // NEW: Process chat in hybrid mode (ChatGPT workflow + CoCounsel content)
  const processChatHybrid = useCallback(async (history: any[]) => {
    console.log('!!! processChatHybrid CALLED !!!');
    console.log('History length:', history.length);
    console.log('CoCounsel token present:', !!cocounselToken);
    console.log('Mode prop value:', mode);
    
    if (!cocounselToken) {
      console.error('CoCounsel token required for hybrid mode');
      return;
    }

    // Clear any existing timers
    clearAllTimersRef.current();
    
    // Reset all state
    setShowThinking(true);
    setShowReasoningDropdown(false);
    setIsReasoningExpanded(false);
    setReasoningSteps(0);
    setIsReasoningLoading(false);
    setShowSearching(false);
    setShowSourcesDropdown(false);
    setIsSourcesExpanded(false);
    setSourcesItems(0);
    setIsSourcesLoading(false);
    setShowPreparing(false);
    setShowPreparingDropdown(false);
    setIsPreparingExpanded(false);
    setPreparingItems(0);
    setIsPreparingLoading(false);
    setShowArtifact(false);
    setIsContentGenerating(false);
    setStreamedIntroText('');
    setStreamedDescText('');
    setIsStreamingComplete(false);
    setShowOpeningMessage(false);
    setHasDocumentOpened(false);
    setArtifactSummary('');
    onThinkingChange?.(true);

    // Surface a proactive Horizon Scan notification mid-task (slides up while
    // the user is working, rather than appearing immediately on load).
    safeSetTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("horizonScanAlert", {
          detail: {
            title: "Documents impacted in M&A Diligence",
            detail: "3 documents affected by new SEC guidance",
          },
        })
      );
    }, 6000);

    try {
      // Add placeholder for assistant response
      setMessages(prev => {
        if (prev.length > 0 && prev[prev.length - 1].role === 'assistant') return prev;
        return [...prev, { role: 'assistant', text: '' }];
      });

      // Build message history for API call
      const apiMessages = history.map(msg => ({
        role: msg.role,
        content: typeof msg.text === 'string' ? msg.text : ''
      }));

      const userPrompt = apiMessages[apiMessages.length - 1]?.content || '';

      console.log('========================================');
      console.log('=== ACTIVECHATVIEW: HYBRID MODE START ===');
      console.log('========================================');
      console.log('User prompt:', userPrompt);
      console.log('User prompt lowercase:', userPrompt.toLowerCase());
      console.log('CoCounsel token present:', !!cocounselToken);
      console.log('Checking sessionStorage for pendingCPCWorkflow...');
      const checkCPCData = sessionStorage.getItem('pendingCPCWorkflow');
      console.log('pendingCPCWorkflow in sessionStorage:', checkCPCData);

      // Detect task type from user prompt
      const userPromptLower = userPrompt.toLowerCase();
      let detectedType: 'draft' | 'research' | 'analyze' | 'regulatory-scan' | 'cpc-analysis' = 'draft';
      let topic = '';

      // Local variables for CPC data (to avoid async state issues)
      let localCpcRegulation = '';
      let localCpcDocsAffected = 0;
      let localCpcClausesAffected = 0;
      let localCpcImpactLevel = '';

      // Check for CPC initiation first
      console.log('🔍 Checking if prompt includes "initiate cross-product clause analysis":', userPromptLower.includes('initiate cross-product clause analysis'));
      console.log('🔍 Checking if prompt includes "initiate cpc":', userPromptLower.includes('initiate cpc'));

      if (userPromptLower.includes('initiate cross-product clause analysis') || userPromptLower.includes('initiate cpc')) {
        console.log('✅ CPC ANALYSIS DETECTED!');
        detectedType = 'cpc-analysis';
        topic = 'Cross-Product Clause Analysis';

        // Extract regulation name from prompt (format: "Initiate Cross-Product Clause analysis for: REGULATION_NAME")
        const regulationMatch = userPrompt.match(/for:\s*(.+)/i);
        if (regulationMatch) {
          localCpcRegulation = regulationMatch[1].trim();
          setCpcRegulation(localCpcRegulation);

          // Get CPC data from sessionStorage if available
          const cpcData = sessionStorage.getItem('pendingCPCWorkflow');
          if (cpcData) {
            const { docsAffected, clausesAffected, impactLevel } = JSON.parse(cpcData);
            localCpcDocsAffected = docsAffected;
            localCpcClausesAffected = clausesAffected;
            localCpcImpactLevel = impactLevel;
            setCpcDocsAffected(docsAffected);
            setCpcClausesAffected(clausesAffected);
            setCpcImpactLevel(impactLevel);
            // NOTE: cleared by ChatPage on a delayed timer (double-mount safe).
          }
        }
      } else if ((userPromptLower.includes('scan') || userPromptLower.includes('check') || userPromptLower.includes('identify')) &&
          (userPromptLower.includes('regulatory') || userPromptLower.includes('regulation')) &&
          (userPromptLower.includes('change') || userPromptLower.includes('update') || userPromptLower.includes('affect'))) {
        detectedType = 'regulatory-scan';
        topic = 'Regulatory Changes';
      } else if (userPromptLower.includes('research') || userPromptLower.includes('analyze')) {
        if (userPromptLower.includes('analyze') || userPromptLower.includes('review')) {
          detectedType = 'analyze';
        } else {
          detectedType = 'research';
        }
        topic = 'Legal Research Analysis';
      }

      setTaskType(detectedType);
      setResearchTopic(topic);
      setReasoningContent(getReasoningContent(detectedType, topic));
      setSourceContent(getSourceContent(detectedType, topic));

      // STEP 1: Thinking already showing
      console.log('Step 1: Showing Thinking...');

      // STEP 2: Show reasoning (different content for regulatory scans)
      console.log('Step 2: Showing reasoning...');

      let reasoningContent = '';

      if (detectedType === 'cpc-analysis') {
        // Show CPC-specific reasoning
        setShowReasoningDropdown(true);
        setIsReasoningExpanded(true);
        setIsReasoningLoading(true);

        reasoningContent = `To conduct a Cross-Product Clause analysis, I'll:

• Identify all documents in the workspace that may be affected by the new regulation
• Extract and analyze clauses across the document set for compliance gaps
• Generate redline suggestions for each non-compliant clause
• Verify consistency of updates across all affected documents
• Prepare a comprehensive summary report with recommended next steps`;

        // Simulate progressive display
        await new Promise(resolve => setTimeout(resolve, 1500));
        setReasoningSteps(5);
        setIsReasoningLoading(false);
        console.log('Step 2 complete: CPC reasoning shown');
      } else if (detectedType === 'regulatory-scan') {
        // Show regulatory-specific reasoning
        setShowReasoningDropdown(true);
        setIsReasoningExpanded(true);
        setIsReasoningLoading(true);

        reasoningContent = `To conduct a comprehensive regulatory horizon scan, I'll:

• Identify the practice area and jurisdiction scope based on your workspace documents
• Query federal regulatory databases (SEC, CFPB, FTC, DOJ, etc.) for recent final rules and proposed changes
• Check state-level regulatory updates in relevant jurisdictions
• Analyze the potential impact of each change on your existing contract templates
• Prioritize findings by severity and effective date`;

        // Simulate progressive display
        await new Promise(resolve => setTimeout(resolve, 1500));
        setReasoningSteps(5);
        setIsReasoningLoading(false);
        console.log('Step 2 complete: Regulatory scan reasoning shown');
      } else {
        // Call ChatGPT for reasoning for other task types
        const reasoningMessages = [
          {
            role: 'system' as const,
            content: 'You are a legal AI assistant. Provide a brief structured analysis (3-5 bullet points) of how you will approach this legal task.'
          },
          {
            role: 'user' as const,
            content: `Analyze this legal request and explain your reasoning:\n\n${userPrompt}`
          }
        ];

        setShowReasoningDropdown(true);
        setIsReasoningExpanded(true);
        setIsReasoningLoading(true);

        try {
          console.log('Starting reasoning stream...');
          console.log('Reasoning messages:', JSON.stringify(reasoningMessages));
          let chunkCount = 0;
          let firstChunkReceived = false;
          for await (const chunk of streamChat(reasoningMessages)) {
            if (!firstChunkReceived) {
              console.log('First reasoning chunk received!');
              firstChunkReceived = true;
            }
            if (!isMountedRef.current) {
              console.log('Component unmounted, breaking reasoning stream');
              break;
            }
            reasoningContent += chunk;
            chunkCount++;
            setReasoningSteps(Math.min(5, Math.floor(chunkCount / 10)));
          }
          console.log('Reasoning stream complete, chunks received:', chunkCount);
          console.log('Reasoning content length:', reasoningContent.length);
        } catch (error) {
          console.error('=== REASONING API ERROR ===');
          console.error('Error:', error);
          console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
          reasoningContent = 'Analyzing your request...';
        }

        setReasoningSteps(5);
        setIsReasoningLoading(false);
        console.log('Step 2 complete: Reasoning finished');
      }

      // STEP 3: Show Searching
      console.log('Step 3: Showing Searching...');
      await new Promise(resolve => setTimeout(resolve, 300));
      setShowThinking(false);
      setIsReasoningExpanded(false);
      setShowSearching(true);
      console.log('Step 3 complete: Searching visible');

      // STEP 4: Show search results (different sources for regulatory scans)
      console.log('Step 4: Getting search results...');
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log('Step 4: Starting search...');

      let searchResults: any[] = [];

      if (detectedType === 'cpc-analysis') {
        // Show CPC-specific sources
        searchResults = [
          { websiteTitle: 'Project Atlas', resourceTitle: 'Stock Purchase Agreement - Acme Corp', url: '#' },
          { websiteTitle: 'Project Atlas', resourceTitle: 'Disclosure Schedule 4.18 - Material Contracts', url: '#' },
          { websiteTitle: 'Project Atlas', resourceTitle: 'Transition Services Agreement', url: '#' },
          { websiteTitle: 'Westlaw', resourceTitle: localCpcRegulation, url: 'https://westlaw.com' },
          { websiteTitle: 'Practical Law', resourceTitle: 'M&A Compliance Guidance', url: 'https://practicallaw.com' },
          { websiteTitle: 'Thomson Reuters', resourceTitle: 'Regulatory Intelligence', url: 'https://thomsonreuters.com' }
        ];
      } else if (detectedType === 'regulatory-scan') {
        // Show regulatory-specific sources
        searchResults = [
          { websiteTitle: 'Federal Register', resourceTitle: 'Final Rules & Proposed Changes', url: 'https://federalregister.gov' },
          { websiteTitle: 'SEC.gov', resourceTitle: 'Climate Disclosure Rules', url: 'https://sec.gov' },
          { websiteTitle: 'CFPB', resourceTitle: 'Consumer Data Rights Rule', url: 'https://consumerfinance.gov' },
          { websiteTitle: 'FTC.gov', resourceTitle: 'Non-Compete Ban Updates', url: 'https://ftc.gov' },
          { websiteTitle: 'Regulations.gov', resourceTitle: 'Federal Rulemaking Database', url: 'https://regulations.gov' },
          { websiteTitle: 'Thomson Reuters', resourceTitle: 'Regulatory Intelligence', url: 'https://thomsonreuters.com' }
        ];
      } else {
        // Call ChatGPT for search results for other task types
        const searchMessages = [
          {
            role: 'system' as const,
            content: 'Generate 6 legal research sources as JSON: [{"websiteTitle": "Name", "resourceTitle": "Title", "url": "https://..."}]'
          },
          {
            role: 'user' as const,
            content: `Generate 6 legal research sources for: ${userPrompt}`
          }
        ];

        searchResults = [
          { websiteTitle: 'Westlaw', resourceTitle: 'Legal Research Database', url: 'https://westlaw.com' },
          { websiteTitle: 'LexisNexis', resourceTitle: 'Case Law Library', url: 'https://lexisnexis.com' },
          { websiteTitle: 'Practical Law', resourceTitle: 'Practice Notes', url: 'https://practicallaw.com' },
          { websiteTitle: 'Google Scholar', resourceTitle: 'Legal Cases', url: 'https://scholar.google.com' },
          { websiteTitle: 'Cornell LII', resourceTitle: 'US Code', url: 'https://law.cornell.edu' },
          { websiteTitle: 'Justia', resourceTitle: 'Legal Resources', url: 'https://justia.com' }
        ];

        let searchText = '';
        try {
          console.log('=== CALLING SEARCH API ===');
          console.log('Search messages:', JSON.stringify(searchMessages));
          let searchChunkCount = 0;
          for await (const chunk of streamChat(searchMessages)) {
            if (!isMountedRef.current) {
              console.log('Component unmounted during search');
              break;
            }
            if (searchChunkCount === 0) {
              console.log('First search chunk received!');
            }
            searchText += chunk;
            searchChunkCount++;
          }
          console.log('Search stream complete, response length:', searchText.length);
          console.log('Search chunks received:', searchChunkCount);
          console.log('Search text preview:', searchText.substring(0, 200));

          try {
            const parsed = JSON.parse(searchText.trim());
            if (Array.isArray(parsed) && parsed.length > 0) {
              searchResults = parsed.slice(0, 6);
            }
          } catch (e) {
            // Use fallback
          }
        } catch (error) {
          console.error('Search API error:', error);
        }
      }
      
      setShowSourcesDropdown(true);
      setIsSourcesExpanded(true);
      setIsSourcesLoading(true);
      
      for (let i = 1; i <= Math.min(6, searchResults.length); i++) {
        if (!isMountedRef.current) break;
        setSourcesItems(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      setIsSourcesLoading(false);
      console.log('Step 4 complete: Search results shown');

      // STEP 5: Show Preparing
      console.log('Step 5: Showing Preparing...');
      await new Promise(resolve => setTimeout(resolve, 400)); // Reduced from 800ms
      setIsSourcesExpanded(false);
      setShowPreparing(true);

      // STEP 6: Show prep materials (different for regulatory scans)
      console.log('Step 6: Getting prep materials...');
      await new Promise(resolve => setTimeout(resolve, 200));

      let prepWork: any[] = [];

      if (detectedType === 'cpc-analysis') {
        // Show CPC analysis steps
        prepWork = [
          { title: `Analyzed ${localCpcDocsAffected} documents for compliance with ${localCpcRegulation}`, type: 'analysis' },
          { title: `Identified ${localCpcClausesAffected} clauses requiring updates`, type: 'analysis' },
          { title: 'Generated compliance redlines for affected clauses', type: 'drafting' },
          { title: 'Verified consistency across document set', type: 'analysis' },
          { title: 'Prepared summary report and next steps', type: 'analysis' }
        ];

        setPrepWorkItems(prepWork);

        // Simulate minimum time
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else if (detectedType === 'regulatory-scan') {
        // Show regulatory scan steps
        prepWork = [
          { title: 'Identified jurisdictions and practice areas from workspace', type: 'analysis' },
          { title: 'Searched Westlaw for proposed and final regulations', type: 'research' },
          { title: 'Searched Practical Law for M&A guidance and practice notes', type: 'research' },
          { title: 'Evaluating impact on workspace documents', type: 'analysis' }
        ];

        setPrepWorkItems(prepWork);

        // Simulate minimum time
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        // Call ChatGPT for prep materials for other task types
        const prepStartTime = Date.now();
        const prepMessages = [
          {
            role: 'system' as const,
            content: 'Generate 3-5 preliminary work items as JSON: {"prepWork": [{"title": "Item", "type": "research"}]}'
          },
          {
            role: 'user' as const,
            content: `Generate preliminary work for: ${userPrompt}`
          }
        ];

        prepWork = [
          { title: 'Westlaw Deep Research Report', type: 'research' },
          { title: 'Case Law Analysis', type: 'analysis' },
          { title: 'Statutory Review', type: 'research' },
          { title: 'Precedent Comparison', type: 'comparison' },
          { title: 'Compliance Checklist', type: 'checklist' }
        ];

        let prepText = '';
        try {
          console.log('=== CALLING PREP API ===');
          console.log('Prep messages:', JSON.stringify(prepMessages));
          let prepChunkCount = 0;
          for await (const chunk of streamChat(prepMessages)) {
            if (!isMountedRef.current) break;
            if (prepChunkCount === 0) {
              console.log('First prep chunk received!');
            }
            prepText += chunk;
            prepChunkCount++;
          }
          console.log('Prep stream complete, chunks:', prepChunkCount);
          console.log('Prep text preview:', prepText.substring(0, 200));

          try {
            const parsed = JSON.parse(prepText.trim());
            const items = parsed.prepWork || parsed.items || [];
            if (items.length > 0) {
              prepWork = items.slice(0, 5);
            }
          } catch (e) {
            // Use fallback
          }
        } catch (error) {
          console.error('Prep API error:', error);
        }

        setPrepWorkItems(prepWork);

        const prepElapsed = Date.now() - prepStartTime;
        if (prepElapsed < 4000) {
          await new Promise(resolve => setTimeout(resolve, 4000 - prepElapsed));
        }
      }
      
      setShowPreparingDropdown(true);
      setIsPreparingExpanded(true);
      setIsPreparingLoading(true);
      
      for (let i = 1; i <= Math.min(5, prepWork.length); i++) {
        if (!isMountedRef.current) break;
        setPreparingItems(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      setIsPreparingLoading(false);
      console.log('Step 6 complete: Prep materials shown');

      // STEP 7: Show "Preparing final output..."
      console.log('Step 7: Preparing final output...');
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsPreparingExpanded(false);
      setShowPreparingFinalOutput(true); // Show "Preparing final output..." message
      setIsContentGenerating(true);

      // STEP 8: For CPC analysis, show CPC handoff screen
      if (detectedType === 'cpc-analysis') {
        console.log('=== CPC ANALYSIS DETECTED - SHOWING RESULTS ===');
        console.log('CPC Data:', { localCpcRegulation, localCpcDocsAffected, localCpcClausesAffected, localCpcImpactLevel });
        await new Promise(resolve => setTimeout(resolve, 2000));
        setShowPreparingFinalOutput(false);
        setShowArtifact(true);
        setTaskType('cpc-analysis');

        const introText = `I've completed the Cross-Product Clause analysis for ${localCpcRegulation}.`;
        const descText = ``;

        let introIdx = 0;
        const introInterval = setInterval(() => {
          if (introIdx < introText.length) {
            setStreamedIntroText(introText.slice(0, introIdx + 1));
            introIdx++;
          } else {
            clearInterval(introInterval);

            setTimeout(() => {
              let descIdx = 0;
              const descInterval = setInterval(() => {
                if (descIdx < descText.length) {
                  setStreamedDescText(descText.slice(0, descIdx + 1));
                  descIdx++;
                } else {
                  clearInterval(descInterval);
                  setTimeout(() => {
                    setIsStreamingComplete(true);
                    setIsContentGenerating(false);
                    onThinkingChange?.(false);
                  }, 300);
                }
              }, 5);
            }, 300);
          }
        }, 7.5);

        return;
      }

      // STEP 8: For regulatory scan, show results directly without calling CoCounsel
      if (detectedType === 'regulatory-scan') {
        console.log('=== REGULATORY SCAN DETECTED - SHOWING RESULTS ===');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setShowPreparingFinalOutput(false);
        setShowArtifact(true);

        const introText = `I ran a regulatory horizon scan across federal and state sources to identify any changes that may impact your M&A contract templates.`;
        const descText = ``;

        let introIdx = 0;
        const introInterval = setInterval(() => {
          if (introIdx < introText.length) {
            setStreamedIntroText(introText.slice(0, introIdx + 1));
            introIdx++;
          } else {
            clearInterval(introInterval);

            setTimeout(() => {
              let descIdx = 0;
              const descInterval = setInterval(() => {
                if (descIdx < descText.length) {
                  setStreamedDescText(descText.slice(0, descIdx + 1));
                  descIdx++;
                } else {
                  clearInterval(descInterval);
                  setTimeout(() => {
                    setIsStreamingComplete(true);
                    setIsContentGenerating(false);
                    onThinkingChange?.(false);
                    // Persist the completed scan so closing the table tab and
                    // returning to this chat restores the result instead of
                    // re-running the entire thinking simulation.
                    if (currentTabId) {
                      try {
                        sessionStorage.setItem(
                          `chat_${currentTabId}_completedScan`,
                          JSON.stringify({ introText, topic })
                        );
                      } catch (e) {
                        console.warn('[v0] Failed to persist completed scan', e);
                      }
                    }
                  }, 300);
                }
              }, 5);
            }, 300);
          }
        }, 7.5);

        return;
      }

      // STEP 8: Call CoCounsel for artifact
      console.log('=== STEP 8: CALLING COCOUNSEL ===');
      console.log('API messages:', apiMessages);
      console.log('CoCounsel token present:', !!cocounselToken);
      
      let accumulatedContent = '';
      let metadataParsed = false;
      let artifactDetected = false;
      let cocounselChunkCount = 0;
      
      try {
        for await (const chunk of streamChatHybrid(apiMessages, cocounselToken)) {
          if (!isMountedRef.current) break;
          
          if (cocounselChunkCount === 0) {
            console.log('First CoCounsel chunk received!');
          }
          cocounselChunkCount++;
          
          accumulatedContent += chunk;
          
          if (!metadataParsed && accumulatedContent.includes('<<<METADATA_END>>>')) {
            const metadataMatch = accumulatedContent.match(/<<<METADATA_START>>>(.*?)<<<METADATA_END>>>/s);
            if (metadataMatch) {
              try {
                const metadata = JSON.parse(metadataMatch[1]);
                setArtifactName(metadata.name || 'Legal Document');
                setArtifactCategory(metadata.category || 'Document');
                setArtifactSummary(metadata.summary || '');
                setShowPreparingFinalOutput(false); // Hide "Preparing final output..." as soon as we have metadata
                metadataParsed = true;
                accumulatedContent = accumulatedContent.replace(/<<<METADATA_START>>>.*?<<<METADATA_END>>>/s, '');
              } catch (e) {
                console.error('Failed to parse metadata:', e);
              }
            }
          }
          
          if (!artifactDetected && accumulatedContent.includes('<<<ARTIFACT_END>>>')) {
            const artifactMatch = accumulatedContent.match(/<<<ARTIFACT_START>>>(.*?)<<<ARTIFACT_END>>>/s);
            if (artifactMatch) {
              try {
                const artifactInfo = JSON.parse(artifactMatch[1]);
                console.log('Artifact detected:', artifactInfo);
                
                const shouldSuppress = 
                  artifactInfo.artifactId.includes('.db-journal') ||
                  artifactInfo.artifactId.includes('.db') ||
                  artifactInfo.artifactId.toLowerCase().includes('temp') ||
                  artifactInfo.title.includes('.db');
                
                if (!shouldSuppress) {
                  artifactDetected = true;
                  
                  if (isMountedRef.current) {
                    setShowArtifact(true);
                    setIsContentGenerating(false);
                    
                    const summary = artifactSummary || `I've created ${artifactInfo.title}`;
                    let summaryIdx = 0;
                    
                    const summaryInterval = setInterval(() => {
                      if (summaryIdx < summary.length) {
                        setStreamedIntroText(summary.slice(0, summaryIdx + 1));
                        summaryIdx++;
                      } else {
                        clearInterval(summaryInterval);
                        setShowOpeningMessage(true);
                        setIsStreamingComplete(true);
                        onThinkingChange?.(false);
                      }
                    }, 15);
                  }
                }
                
                accumulatedContent = accumulatedContent.replace(/<<<ARTIFACT_START>>>.*?<<<ARTIFACT_END>>>/s, '');
              } catch (e) {
                console.error('Failed to parse artifact:', e);
              }
            }
          }
        }
        
        console.log('Step 8 complete: CoCounsel artifact received');
        console.log('Total CoCounsel chunks:', cocounselChunkCount);
        console.log('Accumulated content length:', accumulatedContent.length);
        console.log('Metadata parsed:', metadataParsed);
        console.log('Artifact detected:', artifactDetected);
        
        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg && lastMsg.role === 'assistant') {
            lastMsg.text = artifactName;
            lastMsg.isFigmaContent = true;
            (lastMsg as any).workflowData = {
              showReasoning: true,
              showSources: true,
              showPreparing: true,
              documentTitle: artifactName,
              artifactIntro: streamedIntroText,
              artifactDescription: streamedDescText
            };
          }
          return updated;
        });
        
      } catch (error) {
        console.error('CoCounsel API error:', error);
        throw error;
      }
      
    } catch (error) {
      console.error('=== HYBRID CHAT ERROR ===');
      console.error('Error type:', error?.constructor?.name);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
      console.error('===========================');
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        if (lastMsg && lastMsg.role === 'assistant' && !lastMsg.text) {
          lastMsg.text = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
        return newMsgs;
      });
      setShowThinking(false);
      setShowSearching(false);
      setShowPreparing(false);
      onThinkingChange?.(false);
    }
  }, [cocounselToken, onThinkingChange, artifactName, artifactSummary, streamedDescText, streamedIntroText]);


  // Handle skill creation flow
  const [skillCreationStep, setSkillCreationStep] = useState(0);
  const hasStartedSkillFlowRef = useRef(false);
  
  const handleSkillCreationFlow = useCallback(() => {
    if (hasStartedSkillFlowRef.current) return;
    hasStartedSkillFlowRef.current = true;
    
    // Step 1: Show "Thinking..." then initial response
    setShowThinking(true);
    safeSetTimeout(() => {
      setShowThinking(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "I'd be happy to help you create a skill. What should this skill do? Describe how you'd like me to write your skill. Share your process, rules, and what must always or never happen."
      }]);
      setSkillCreationStep(1);
    }, 1500);
  }, [safeSetTimeout]);

  // Track if artifact has been added to outputs
  const hasAddedArtifactRef = useRef(false);

  // Rehydrate the completed regulatory-scan view when restoring from a snapshot.
  // The completed layout depends on many granular dropdown/content states that
  // are normally set by the simulation; we set their final (collapsed, done)
  // values once on mount so closing the table tab returns to the finished
  // result instead of replaying the thinking animation.
  const hasRestoredScanRef = useRef(false);
  useEffect(() => {
    if (!restoredScan || hasRestoredScanRef.current) return;
    hasRestoredScanRef.current = true;

    setResearchTopic(restoredScan.topic || 'Regulatory Changes');
    setReasoningContent(getReasoningContent('regulatory-scan', restoredScan.topic || 'Regulatory Changes'));
    setSourceContent(getSourceContent('regulatory-scan', restoredScan.topic || 'Regulatory Changes'));

    // Reasoning row — visible, collapsed, complete
    setShowReasoningDropdown(true);
    setIsReasoningExpanded(false);
    setReasoningSteps(5);
    setIsReasoningLoading(false);

    // Search results row — visible, collapsed, complete
    setShowSearching(true);
    setShowSourcesDropdown(true);
    setIsSourcesExpanded(false);
    setSourcesItems(6);
    setIsSourcesLoading(false);

    // Preliminary materials row — visible, collapsed, complete
    setShowPreparing(true);
    setShowPreparingDropdown(true);
    setIsPreparingExpanded(false);
    setIsPreparingLoading(false);
    setPrepWorkItems([
      { title: 'Identified jurisdictions and practice areas from workspace', type: 'analysis' },
      { title: 'Searched Westlaw for proposed and final regulations', type: 'research' },
      { title: 'Searched Practical Law for M&A guidance and practice notes', type: 'research' },
      { title: 'Evaluating impact on workspace documents', type: 'analysis' },
    ]);
    setPreparingItems(4);

    // Thinking / generating states off — we're showing the finished result
    setShowThinking(false);
    setShowPreparingFinalOutput(false);
    setIsContentGenerating(false);
    onThinkingChange?.(false);
  }, [restoredScan]);

  // Add artifact to outputs when the assistant response is complete
  useEffect(() => {
    // Only run when streaming completes
    if (!isStreamingComplete || hasAddedArtifactRef.current || !isMountedRef.current) {
      return;
    }
    
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === 'assistant' && lastMsg.isFigmaContent) {
      hasAddedArtifactRef.current = true;
      // Add artifact to sidebar outputs with complete chat messages
      onArtifactCreated?.({ 
        name: 'Motion to Dismiss - Personal Jurisdiction', 
        type: 'doc',
        sourceChatMessages: messages 
      });
    }
  }, [isStreamingComplete]); // Only depend on isStreamingComplete, not messages!

  useEffect(() => {
    // If we restored a completed scan for this chat, don't re-run the simulation.
    if (restoredScan) {
        return;
    }
    // If we have initial messages (restored state), don't run the simulation
    if (initialMessages && initialMessages.length > 1) {
        return;
    }

    // If it's a fresh chat (just the user prompt), trigger the LLM or skill creation flow
    if (messages.length === 1 && messages[0].role === 'user') {
        if (isSkillCreation) {
            // Handle skill creation flow
            handleSkillCreationFlow();
            return;
        }
        
       
        if (mode === 'hybrid') {
          processChatHybrid(messages).catch(err => {
            console.error('processChatHybrid error (initial):', err);
          });
        } else {
          processChat(messages);
        }
    }
  }, []); // Run once on mount

  const handleFollowUp = (text: string, files: StagedItem[]) => {
      // Optimistically add user message
      const newMessage = { role: 'user' as const, text, attachments: files };
      
      setMessages(prev => {
          const next = [...prev, newMessage];
          
          // Handle skill creation step 2
          if (isSkillCreation && skillCreationStep === 1 && next.length === 3) {
            // User just described the skill
            // Show "Thinking..." then questions flow
            setShowThinking(true);
            safeSetTimeout(() => {
              setShowThinking(false);
              setMessages(current => [...current, {
                role: 'assistant',
                text: (
                  <div className="flex gap-[8px] items-center">
                    <div className="w-[20px] h-[20px] flex items-center justify-center">
                      <div 
                        className="w-[10px] h-[10px] rotate-45 bg-[#de6633]"
                        style={{ 
                          boxShadow: '0px 4px 33px rgba(247, 93, 27, 0.4)'
                        }}
                      />
                    </div>
                    <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['Clario:Regular',sans-serif] from-[#ededed] justify-center leading-[0] text-[15px] text-[transparent] to-[#e2e2e2] to-[58.173%] via-[#c3c3c3] via-[20.673%] whitespace-nowrap">
                      <p className="leading-[1.5]">Working on it...</p>
                    </div>
                  </div>
                )
              }]);
              
              // Wait then replace with full text and show questions
              safeSetTimeout(() => {
                setMessages(current => {
                  const newMsgs = [...current];
                  newMsgs[newMsgs.length - 1] = {
                    role: 'assistant',
                    text: "Let me ask a few questions to make sure I build exactly what you need. Once I get the following questions answered, then I'll have a better idea for what you are looking for."
                  };
                  return newMsgs;
                });
                
                // Show clarifying questions as overlay
                safeSetTimeout(() => {
                  setShowSkillQuestions(true);
                  setSkillCreationStep(2);
                }, 100);
              }, 2000);
            }, 1500);
            
            return next;
          }
          
          // Trigger API call with updated history for normal chat
          if (!isSkillCreation) {
            if (mode === 'hybrid') {
              processChatHybrid(next).catch(err => {
                console.error('processChatHybrid error (follow-up):', err);
              });
            } else {
              processChat(next);
            }
          }
          return next;
      });
  };

  const handleArtifactClick = useCallback(() => {
      onOpenTab?.({ name: artifactName || 'Motion to Dismiss - Personal Jurisdiction', type: 'doc' });
  }, [onOpenTab, artifactName]);

  // Track if we've already auto-opened to prevent repeated opens
  const hasAutoOpenedRef = useRef(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-open artifact when streaming is complete (but NOT for CPC or regulatory scan - they show inline)
  useEffect(() => {
    if (isStreamingComplete && showArtifact && !hasAutoOpenedRef.current && isMountedRef.current) {
      // Skip auto-open for CPC and regulatory scan - they display results inline
      if (taskType === 'cpc-analysis' || taskType === 'regulatory-scan') {
        hasAutoOpenedRef.current = true;
        setIsContentGenerating(false);
        setShowOpeningMessage(false);
        setHasDocumentOpened(true);
        return;
      }
      
      hasAutoOpenedRef.current = true;
      safeSetTimeout(() => {
        // Double-check component is still mounted before opening
        if (isMountedRef.current && onOpenTab) {
          handleArtifactClick();
          // After document opens, stop shimmer and hide message
          setIsContentGenerating(false);
          setShowOpeningMessage(false);
          setHasDocumentOpened(true);
        }
      }, 500);
    }
  }, [isStreamingComplete, showArtifact, taskType]); // Added taskType dependency

  return (
    <div className="flex flex-col h-full relative bg-[#FCFCFC]">
      <div ref={chatScrollRef} className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-[800px] mx-auto space-y-4">
        {messages.map((msg, idx) => {
          console.log(`💬 Rendering message ${idx}:`, { role: msg.role, isFigmaContent: msg.isFigmaContent, textType: typeof msg.text });
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex flex-col gap-3 max-w-[800px] ${msg.role === 'user' ? 'items-end ml-auto' : 'items-start mr-auto'}`}
            >
               {msg.role === 'user' ? (
                   <>
                       <div className="flex flex-col gap-2 items-end ml-12">
                         <div className="bg-[#f2f2f2] px-4 py-3 rounded-2xl rounded-tr-sm text-[#212223] text-[15px] whitespace-pre-wrap leading-[1.5]">
                           {msg.text}
                         </div>
                         {msg.attachments && msg.attachments.length > 0 && (
                           <div className="flex flex-wrap gap-2 justify-end">
                             {msg.attachments.map(file => (
                               <FileChip key={file.id} file={file} />
                             ))}
                           </div>
                         )}
                       </div>
                   </>
               ) : (
                   msg.isFigmaContent ? (
                       <div className="flex flex-col gap-3 w-full">
                         {/* CoCounsel Header */}
                         <div className="flex gap-2 items-center">
                           <div className="relative shrink-0 size-[20px]">
                             <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                               <g>
                                 <path d={svgPaths.p37580740} fill="#D64000" />
                                 <path d={svgPaths.p20148880} fill="#D64000" />
                                 <path d={svgPaths.p3c433c00} fill="#D64000" />
                                 <path d={svgPaths.pea82d00} fill="#D64000" />
                                 <path d={svgPaths.p38cb7f00} fill="#D64000" />
                                 <path d={svgPaths.p154c6e00} fill="#D64000" />
                                 <path d={svgPaths.p16b47400} fill="#D64000" />
                                 <path d={svgPaths.p10dd9f00} fill="#D64000" />
                                 <path d={svgPaths.p287133f0} fill="#D64000" />
                                 <path d={svgPaths.p5e1d900} fill="#D64000" />
                                 <path d={svgPaths.pd01f8c0} fill="#D64000" />
                                 <path d={svgPaths.p3aa1ff80} fill="#D64000" />
                                 <path d={svgPaths.pb176790} fill="#D64000" />
                                 <path d={svgPaths.p1dc50600} fill="#D64000" />
                                 <path d={svgPaths.p304ab800} fill="#D64000" />
                                 <path d={svgPaths.pfe8800} fill="#D64000" />
                                 <path d={svgPaths.p6131b80} fill="#D64000" />
                                 <path d={svgPaths.p924cb00} fill="#D64000" />
                                 <path d={svgPaths.p131ab400} fill="#D64000" />
                                 <path d={svgPaths.pa197b00} fill="#D64000" />
                                 <path d={svgPaths.p3bc9d900} fill="#D64000" />
                                 <path d={svgPaths.p194d1c80} fill="#D64000" />
                                 <path d={svgPaths.pa4ca400} fill="#D64000" />
                                 <path d={svgPaths.p3d0aa680} fill="#D64000" />
                                 <path d={svgPaths.p115b9f80} fill="#D64000" />
                                 <path d={svgPaths.p12ebfd00} fill="#D64000" />
                                 <path d={svgPaths.p15c7d400} fill="#D64000" />
                                 <path d={svgPaths.p4d2e200} fill="#D64000" />
                               </g>
                             </svg>
                           </div>
                           <span className="text-[#8a8a8a] text-[14px]">
                             CoCounsel - {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                           </span>
                         </div>

                         {/* Figma Content (skip the plain topic title string) */}
                         {typeof msg.text === 'string' ? null : msg.text}
                       </div>
                   ) : (
                       <div className="flex flex-col gap-3 w-full">
                         {/* CoCounsel Header */}
                         <div className="flex gap-2 items-center">
                           <div className="relative shrink-0 size-[20px]">
                             <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                               <g>
                                 <path d={svgPaths.p37580740} fill="#D64000" />
                                 <path d={svgPaths.p20148880} fill="#D64000" />
                                 <path d={svgPaths.p3c433c00} fill="#D64000" />
                                 <path d={svgPaths.pea82d00} fill="#D64000" />
                                 <path d={svgPaths.p38cb7f00} fill="#D64000" />
                                 <path d={svgPaths.p154c6e00} fill="#D64000" />
                                 <path d={svgPaths.p16b47400} fill="#D64000" />
                                 <path d={svgPaths.p10dd9f00} fill="#D64000" />
                                 <path d={svgPaths.p287133f0} fill="#D64000" />
                                 <path d={svgPaths.p5e1d900} fill="#D64000" />
                                 <path d={svgPaths.pd01f8c0} fill="#D64000" />
                                 <path d={svgPaths.p3aa1ff80} fill="#D64000" />
                                 <path d={svgPaths.pb176790} fill="#D64000" />
                                 <path d={svgPaths.p1dc50600} fill="#D64000" />
                                 <path d={svgPaths.p304ab800} fill="#D64000" />
                                 <path d={svgPaths.pfe8800} fill="#D64000" />
                                 <path d={svgPaths.p6131b80} fill="#D64000" />
                                 <path d={svgPaths.p924cb00} fill="#D64000" />
                                 <path d={svgPaths.p131ab400} fill="#D64000" />
                                 <path d={svgPaths.pa197b00} fill="#D64000" />
                                 <path d={svgPaths.p3bc9d900} fill="#D64000" />
                                 <path d={svgPaths.p194d1c80} fill="#D64000" />
                                 <path d={svgPaths.pa4ca400} fill="#D64000" />
                                 <path d={svgPaths.p3d0aa680} fill="#D64000" />
                                 <path d={svgPaths.p115b9f80} fill="#D64000" />
                                 <path d={svgPaths.p12ebfd00} fill="#D64000" />
                                 <path d={svgPaths.p15c7d400} fill="#D64000" />
                                 <path d={svgPaths.p4d2e200} fill="#D64000" />
                               </g>
                             </svg>
                           </div>
                           <span className="text-[#8a8a8a] text-[14px]">
                             CoCounsel - {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                           </span>
                         </div>
                         
                         {/* Message Content */}
                         {msg.isBuilding || msg.skillCard ? (
                           <SkillBuildingMessage 
                              msg={msg} 
                              onOpenSkillPanel={(skillData) => {
                                console.log('🔧 ActiveChatView onOpenSkillPanel called:', skillData);
                                console.log('🔍 onOpenTab exists?', !!onOpenTab);
                                if (onOpenTab) {
                                  console.log('✅ Calling onOpenTab with skill data');
                                  onOpenTab({ ...skillData, type: 'skill' });
                                }
                              }}
                              onShare={(skillData) => {
                                console.log('📤 ActiveChatView onShare called:', skillData);
                                const event = new CustomEvent('openSkillShare', { detail: skillData });
                                console.log('🚀 Dispatching openSkillShare event:', event);
                                window.dispatchEvent(event);
                                console.log('✅ Event dispatched');
                              }}
                              onSave={(skillData) => {
                                console.log('💾 ActiveChatView onSave called:', skillData);
                                const event = new CustomEvent('openSkillSave', { detail: skillData });
                                console.log('🚀 Dispatching openSkillSave event:', event);
                                window.dispatchEvent(event);
                                console.log('✅ Event dispatched');
                              }}
                              onDownload={(skillData) => {
                                const skillContent = JSON.stringify(skillData, null, 2);
                                const blob = new Blob([skillContent], { type: 'application/json' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${skillData.name}.json`;
                                a.click();
                                URL.revokeObjectURL(url);
                              }}
                            />
                         ) : typeof msg.text === 'string' ? (
                             <>
                               <div className="text-[#212223] text-[15px] whitespace-pre-wrap leading-[1.5]">
                                   {msg.text}
                               </div>
                             </>
                         ) : (
                             <>
                               <div className="text-[#212223] text-[15px] leading-[1.5] w-full">
                                   {msg.text}
                               </div>
                             </>
                         )}
                       </div>
                   )
               )}
            </motion.div>
          );
        })}

        {/* Thinking Indicator */}
        {(showThinking || showReasoningDropdown) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-1 max-w-[800px] mr-auto"
          >
             {/* Header Row */}
             <div 
               className={`flex items-center ${showReasoningDropdown ? 'cursor-pointer' : ''}`}
               onClick={() => showReasoningDropdown && setIsReasoningExpanded(!isReasoningExpanded)}
             >
               <div>
                  <ThinkingSpinner />
               </div>
               <span className={`text-[#8a8a8a] text-[14px] ml-2 ${(!showReasoningDropdown) || (showReasoningDropdown && isReasoningLoading) ? 'animate-shimmer' : ''}`}>
                  {showReasoningDropdown ? 'Reasoning' : 'Thinking...'}
               </span>
               {showReasoningDropdown && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.2 }}
                   className="ml-1"
                 >
                   {isReasoningExpanded ? (
                     <ChevronUp className="size-4 text-[#8a8a8a]" />
                   ) : (
                     <ChevronDown className="size-4 text-[#8a8a8a]" />
                   )}
                 </motion.div>
               )}
             </div>

             {/* Dropdown Content */}
             {showReasoningDropdown && isReasoningExpanded && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 transition={{ duration: 0.3 }}
                 className="bg-white border border-[#e5e5e5] rounded-lg shadow-sm max-h-[350px] relative overflow-hidden"
               >
                 <div className="overflow-y-auto max-h-[350px] py-2 px-4">
                   <div className="space-y-4 text-[14px]">
                     <DynamicReasoningSteps 
                       reasoningSteps={reasoningSteps}
                       reasoningContent={reasoningContent}
                     />
                   </div>
                 </div>
                 
                 {/* Bottom fade indicator - fixed to bottom */}
                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
               </motion.div>
             )}
          </motion.div>
        )}

        {/* Searching Indicator */}
        {(showSearching || showSourcesDropdown) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-1 max-w-[800px] mr-auto pl-0.5"
          >
             {/* Header Row */}
             <div 
               className={`flex items-center ${showSourcesDropdown ? 'cursor-pointer' : ''}`}
               onClick={() => showSourcesDropdown && setIsSourcesExpanded(!isSourcesExpanded)}
             >
               <div>
                  <Search className={`size-4 text-[#8a8a8a] ${!showSourcesDropdown ? 'animate-pulse' : ''}`} />
               </div>
               <span className={`text-[#8a8a8a] text-[14px] ml-2 ${(!showSourcesDropdown) || (showSourcesDropdown && isSourcesLoading) ? 'animate-shimmer' : ''}`}>
                  {showSourcesDropdown ? 'Search results' : 'Searching...'}
               </span>
               {showSourcesDropdown && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.2 }}
                   className="ml-1"
                 >
                   {isSourcesExpanded ? (
                     <ChevronUp className="size-4 text-[#8a8a8a]" />
                   ) : (
                     <ChevronDown className="size-4 text-[#8a8a8a]" />
                   )}
                 </motion.div>
               )}
             </div>

             {/* Searching Dropdown Content */}
             {showSourcesDropdown && isSourcesExpanded && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 transition={{ duration: 0.3 }}
                 className="bg-white border border-[#e5e5e5] rounded-lg shadow-sm max-h-[350px] relative overflow-hidden"
               >
                 <div className="overflow-y-auto max-h-[350px] py-2 px-4">
                   <div className="text-[14px]">
                     <DynamicSourceItems 
                       sourcesItems={sourcesItems}
                       sourceContent={sourceContent}
                     />
                   </div>
                 </div>
                 
                 {/* Bottom fade indicator - fixed to bottom */}
                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
               </motion.div>
             )}
          </motion.div>
        )}

        {/* Preparing Indicator */}
        {showPreparing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-1 max-w-[800px] mr-auto pl-0.5"
          >
             {/* Header Row */}
             <div 
               className={`flex items-center ${showPreparingDropdown ? 'cursor-pointer' : ''}`}
               onClick={() => showPreparingDropdown && setIsPreparingExpanded(!isPreparingExpanded)}
             >
               <div>
                  <NotebookPen className={`size-4 text-[#8a8a8a] ${!showPreparingDropdown ? 'animate-pulse' : ''}`} />
               </div>
               <span className={`text-[#8a8a8a] text-[14px] ml-2 ${(!showPreparingDropdown) || (showPreparingDropdown && isPreparingLoading) ? 'animate-shimmer' : ''}`}>
                  {showPreparingDropdown ? 'Preliminary materials' : 'Compiling...'}
               </span>
               {showPreparingDropdown && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.2 }}
                   className="ml-1"
                 >
                   {isPreparingExpanded ? (
                     <ChevronUp className="size-4 text-[#8a8a8a]" />
                   ) : (
                     <ChevronDown className="size-4 text-[#8a8a8a]" />
                   )}
                 </motion.div>
               )}
             </div>

             {/* Preparing Dropdown Content */}
             {showPreparingDropdown && isPreparingExpanded && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 transition={{ duration: 0.3 }}
                 className="bg-white border border-[#e5e5e5] rounded-lg shadow-sm max-h-[350px] relative overflow-hidden"
               >
                 <div className="overflow-y-auto max-h-[350px] py-2 px-4">
                   <div className="text-[14px]">
                     {/* Dynamic Preparing Items */}
                     {prepWorkItems.slice(0, preparingItems).map((item, idx) => (
                       <motion.div
                         key={idx}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.3 }}
                         className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                       >
                         <FileText className="size-4 text-[#8a8a8a] shrink-0" />
                         <p className="text-[#212223] leading-relaxed flex-1 min-w-0">
                           {item.title}
                         </p>
                       </motion.div>
                     ))}
                   </div>
                 </div>
                 
                 {/* Bottom fade indicator - fixed to bottom */}
                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
               </motion.div>
             )}
          </motion.div>
        )}

        {/* Preparing Final Output text - appears briefly before artifact */}
        <AnimatePresence>
          {showPreparingFinalOutput && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center gap-2 max-w-[800px] mr-auto pl-0.5"
            >
              <Sparkles className="size-4 text-[#8a8a8a]" />
              <span className="text-[#8a8a8a] text-[15px] animate-shimmer">
                Preparing final output...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

  {/* Final Artifact Card or Regulatory Scan Results - appears after preparing completes */}
  {showArtifact && taskType === 'cpc-analysis' ? (
  <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="flex flex-col gap-4 max-w-[800px] mr-auto w-full"
  >
  {/* Intro Text */}
  {streamedIntroText && (
  <div className="text-[15px] text-[#212223] leading-relaxed">
  {streamedIntroText}
  </div>
  )}
  
  {/* CPC Results Card - matching horizon scan format */}
  {streamedIntroText && streamedIntroText.length > 0 && (
  <div className="relative rounded-[8px] w-full">
  <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
  <div className="content-stretch flex flex-col gap-[8px] px-[24px] py-[16px] relative">
  <div className="content-stretch flex gap-[8px] items-center w-full">
  <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#212223] text-[12px]">
  <p className="leading-[1.5]">CPC analysis results</p>
  </div>
  </div>
  <button
  onClick={() => {
  onOpenTab?.({ name: `Cross-product clause analysis`, type: 'cpc-redlines', regulation: cpcRegulation });
  }}
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
  <FileCheck className="size-5 text-[#1d4b34]" strokeWidth={1.5} />
  </div>
  </div>
  <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
  <div className="content-stretch flex items-center relative w-full">
  <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#212223] text-[16px] text-ellipsis whitespace-nowrap">
  <p className="leading-[1.5] overflow-hidden text-ellipsis text-left">Cross-product clause analysis</p>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  <div className="flex items-center gap-1 shrink-0 pr-2">
  <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center p-[4px] relative rounded-[4px] shrink-0">
  <ExternalLink className="size-4 text-[#212223]" strokeWidth={1.5} />
  </div>
  </div>
  </div>
  </div>
  </button>

  {/* Supporting documents */}
  <div className="content-stretch flex flex-col gap-[8px] items-start pt-[12px] w-full">
  <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#212223] text-[12px]">
  <p className="leading-[1.5]">Supporting documents</p>
  </div>
  <div className="flex flex-wrap gap-[6px] w-full">
  <div className="bg-white justify-self-stretch max-w-[240px] min-h-[24px] relative rounded-[8px] self-start shrink-0">
  <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
  <div className="flex flex-row items-center justify-center max-w-[inherit] min-h-[inherit] size-full">
  <div className="content-stretch flex gap-[4px] items-center justify-center max-w-[inherit] min-h-[inherit] px-[8px] py-[2px] relative size-full">
  <FileText className="size-3 text-[#8a8a8a]" strokeWidth={1.5} />
  <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
  <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
  <p className="leading-[1.35] overflow-hidden text-ellipsis">M&A Purchase Agreement</p>
  </div>
  </div>
  </div>
  </div>
  </div>
  <div className="bg-white justify-self-stretch max-w-[240px] min-h-[24px] relative rounded-[8px] self-start shrink-0">
  <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
  <div className="flex flex-row items-center justify-center max-w-[inherit] min-h-[inherit] size-full">
  <div className="content-stretch flex gap-[4px] items-center justify-center max-w-[inherit] min-h-[inherit] px-[8px] py-[2px] relative size-full">
  <FileText className="size-3 text-[#8a8a8a]" strokeWidth={1.5} />
  <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
  <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
  <p className="leading-[1.35] overflow-hidden text-ellipsis">Due Diligence Checklist</p>
  </div>
  </div>
  </div>
  </div>
  </div>
  <div className="bg-white justify-self-stretch max-w-[240px] min-h-[24px] relative rounded-[8px] self-start shrink-0">
  <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
  <div className="flex flex-row items-center justify-center max-w-[inherit] min-h-[inherit] size-full">
  <div className="content-stretch flex gap-[4px] items-center justify-center max-w-[inherit] min-h-[inherit] px-[8px] py-[2px] relative size-full">
  <FileText className="size-3 text-[#8a8a8a]" strokeWidth={1.5} />
  <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
  <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
  <p className="leading-[1.35] overflow-hidden text-ellipsis">Disclosure Schedule Template</p>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  )}

  {/* CPC Scan Summary - matching RegulatoryScanSummary format */}
  {streamedIntroText && streamedIntroText.length > 0 && (
  <CPCScanSummary
  regulation={cpcRegulation}
  docsAffected={cpcDocsAffected}
  clausesAffected={cpcClausesAffected}
  impactLevel={cpcImpactLevel}
  onReviewRedlines={() => {
  onOpenTab?.({ name: `CPC Redlines - ${cpcRegulation}`, type: 'cpc-redlines' });
  }}
  onAcceptAllRedlines={() => {
  console.log('Accept all redlines clicked');
  }}
  />
  )}
  </motion.div>
  ) : showArtifact && taskType === 'regulatory-scan' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4 max-w-[800px] mr-auto w-full"
          >
            {/* Intro Text */}
            {streamedIntroText && (
              <div className="text-[15px] text-[#212223] leading-relaxed">
                {streamedIntroText}
              </div>
            )}

            {/* Regulatory Findings Artifact Card */}
            {streamedIntroText && streamedIntroText.length > 0 && (
              <div className="relative rounded-[8px] w-full">
                <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="content-stretch flex flex-col gap-[8px] px-[24px] py-[16px] relative">
                  <div className="content-stretch flex gap-[8px] items-center w-full">
                    <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#212223] text-[12px]">
                      <p className="leading-[1.5]">Regulatory scan results</p>
                    </div>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      // Store the current tab ID for CPC to navigate back to
                      if (currentTabId) {
                        sessionStorage.setItem('regulatoryTableSourceTabId', currentTabId);
                      }
                      onOpenTab?.({ name: 'M&A regulatory findings', type: 'regulatory-table' });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (currentTabId) {
                          sessionStorage.setItem('regulatoryTableSourceTabId', currentTabId);
                        }
                        onOpenTab?.({ name: 'M&A regulatory findings', type: 'regulatory-table' });
                      }
                    }}
                    className="bg-white h-[48px] relative rounded-[8px] w-full hover:bg-[#F9FAFB] transition-colors cursor-pointer"
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
                  </div>

                  {/* Supporting documents */}
                  <div className="content-stretch flex flex-col gap-[8px] items-start pt-[12px] w-full">
                    <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3:Semibold',sans-serif] justify-center leading-[0] not-italic text-[#212223] text-[12px]">
                      <p className="leading-[1.5]">Supporting documents</p>
                    </div>
                    <div className="flex flex-wrap gap-[6px] w-full">
                      <div className="bg-white justify-self-stretch max-w-[240px] min-h-[24px] relative rounded-[8px] self-start shrink-0">
                        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                        <div className="flex flex-row items-center justify-center max-w-[inherit] min-h-[inherit] size-full">
                          <div className="content-stretch flex gap-[4px] items-center justify-center max-w-[inherit] min-h-[inherit] px-[8px] py-[2px] relative size-full">
                            <FileText className="size-3 text-[#8a8a8a]" strokeWidth={1.5} />
                            <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
                              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                                <p className="leading-[1.35] overflow-hidden text-ellipsis">Westlaw Regulatory Database</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white justify-self-stretch max-w-[240px] min-h-[24px] relative rounded-[8px] self-start shrink-0">
                        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                        <div className="flex flex-row items-center justify-center max-w-[inherit] min-h-[inherit] size-full">
                          <div className="content-stretch flex gap-[4px] items-center justify-center max-w-[inherit] min-h-[inherit] px-[8px] py-[2px] relative size-full">
                            <FileText className="size-3 text-[#8a8a8a]" strokeWidth={1.5} />
                            <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
                              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                                <p className="leading-[1.35] overflow-hidden text-ellipsis">Practical Law M&A Guidance</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white justify-self-stretch max-w-[240px] min-h-[24px] relative rounded-[8px] self-start shrink-0">
                        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                        <div className="flex flex-row items-center justify-center max-w-[inherit] min-h-[inherit] size-full">
                          <div className="content-stretch flex gap-[4px] items-center justify-center max-w-[inherit] min-h-[inherit] px-[8px] py-[2px] relative size-full">
                            <FileText className="size-3 text-[#8a8a8a]" strokeWidth={1.5} />
                            <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative">
                              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px overflow-hidden relative text-[#212223] text-[14px] text-ellipsis whitespace-nowrap">
                                <p className="leading-[1.35] overflow-hidden text-ellipsis">Reuters News - Regulatory Updates</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regulatory Scan Summary */}
            {streamedIntroText && streamedIntroText.length > 0 && (
              <RegulatoryScanSummary
                totalFindings={3}
                highestImpact="High"
                topFindings={[
                  { regulation: 'SEC Climate Disclosure Rules', impact: 'High' as const, deadline: 'Jan 1, 2027' },
                  { regulation: 'CFPB Consumer Data Rights Rule', impact: 'High' as const, deadline: 'Apr 1, 2027' },
                  { regulation: 'FTC Non-Compete Ban Amendments', impact: 'Medium' as const, deadline: 'TBD (Pending)' }
                ]}
                documentsAffected={25}
                onViewAffectedClauses={() => {
                  console.log('View affected clauses');
                }}
              />
            )}

            {/* Monitoring setup prompt - simple strip */}
            {streamedDescText && streamedDescText.length > 0 && !isContentGenerating && showMonitoringPrompt && !showMonitoringConfirmation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-4"
              >
                <div className="flex items-center justify-between px-4 py-3 bg-white border border-[#E5E5E5] rounded-lg">
                  <span className="text-[14px] font-['Source_Sans_3'] text-[#212223]">
                    Monitor M&A regulatory changes going forward?
                  </span>
                  <button
                    onClick={() => {
                      setShowMonitoringPrompt(false);
                      setShowMonitoringConfirmation(true);
                    }}
                    className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all shrink-0"
                  >
                    Add to monitoring
                    <ExternalLink className="size-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Monitoring confirmation - shown after user clicks to set up monitoring */}
            {streamedIntroText && streamedIntroText.length > 0 && !isContentGenerating && showMonitoringConfirmation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg px-4 py-3 flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={2} />
                  <div className="flex-1">
                    <p className="text-[14px] font-['Source_Sans_3'] text-[#212223] mb-1">
                      <span className="font-semibold">Now monitoring M&A regulatory changes</span>
                    </p>
                    <p className="text-[13px] font-['Source_Sans_3'] text-[#666]">
                      Weekly scans • High-impact alerts • <button
                        onClick={() => {
                          navigate('/knowledge', { state: { openMonitoring: true } });
                        }}
                        className="text-[#1d4b34] hover:text-[#163f2b] font-['Clario'] font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        Manage in Knowledge
                        <ExternalLink className="size-3 inline" strokeWidth={2} />
                      </button>
                    </p>
                  </div>
                  <button
                    onClick={() => setShowMonitoringConfirmation(false)}
                    className="text-[#666] hover:text-[#212223] transition-colors p-1"
                  >
                    <X className="size-4" strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : null}

        {/* Creating Indicator */}
        {showCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-1 max-w-[800px] mr-auto"
          >
             {/* Header Row */}
             <div 
               className={`flex items-center gap-3 ${showCreatingDropdown ? 'cursor-pointer' : ''}`}
               onClick={() => showCreatingDropdown && setIsCreatingExpanded(!isCreatingExpanded)}
             >
               <div>
                  <NotebookPen className="size-5 text-[#8a8a8a] animate-pulse" />
               </div>
               <span className="text-[#8a8a8a] text-[14px] animate-shimmer">
                  {showCreatingDropdown ? 'Creating' : 'Creating...'}
               </span>
               {showCreatingDropdown && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.2 }}
                 >
                   {isCreatingExpanded ? (
                     <ChevronUp className="size-4 text-[#8a8a8a]" />
                   ) : (
                     <ChevronDown className="size-4 text-[#8a8a8a]" />
                   )}
                 </motion.div>
               )}
             </div>

             {/* Creating Dropdown Content */}
             {showCreatingDropdown && isCreatingExpanded && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 transition={{ duration: 0.3 }}
                 className="bg-white border border-[#e5e5e5] rounded-lg shadow-sm max-h-[350px] relative overflow-hidden"
               >
                 <div className="overflow-y-auto max-h-[350px] py-2 px-4">
                   <div className="space-y-3 text-[14px]">
                     {/* Creating Item 1 - Research Memo */}
                     {creatingItems >= 1 && (
                       <motion.div
                         initial={{ opacity: 0, y: -10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.3 }}
                         className="flex items-start gap-3 py-2 border-b border-[#f0f0f0] last:border-0"
                       >
                         <FileText className="size-5 text-[#666666] shrink-0 mt-0.5" />
                         <div className="flex-1 min-w-0">
                           <p className="text-[#212223] font-medium leading-relaxed">
                             Research Memo: Jurisdiction Analysis
                           </p>
                           <p className="text-[#8a8a8a] text-[13px] mt-0.5">
                             Summary of key precedents and minimum contacts framework
                           </p>
                         </div>
                       </motion.div>
                     )}

                     {/* Creating Item 2 - Comparison Spreadsheet */}
                     {creatingItems >= 2 && (
                       <motion.div
                         initial={{ opacity: 0, y: -10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.3 }}
                         className="flex items-start gap-3 py-2 border-b border-[#f0f0f0] last:border-0"
                       >
                         <Table className="size-5 text-[#217346] shrink-0 mt-0.5" />
                         <div className="flex-1 min-w-0">
                           <p className="text-[#212223] font-medium leading-relaxed">
                             Arguments & Precedents Matrix
                           </p>
                           <p className="text-[#8a8a8a] text-[13px] mt-0.5">
                             Comparing defendant contacts across supporting cases
                           </p>
                         </div>
                       </motion.div>
                     )}

                     {/* Creating Item 3 - Draft Outline */}
                     {creatingItems >= 3 && (
                       <motion.div
                         initial={{ opacity: 0, y: -10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.3 }}
                         className="flex items-start gap-3 py-2 border-b border-[#f0f0f0] last:border-0"
                       >
                         <ClipboardList className="size-5 text-[#666666] shrink-0 mt-0.5" />
                         <div className="flex-1 min-w-0">
                           <p className="text-[#212223] font-medium leading-relaxed">
                             Motion Outline
                           </p>
                           <p className="text-[#8a8a8a] text-[13px] mt-0.5">
                             Structured argument framework with citation placeholders
                           </p>
                         </div>
                       </motion.div>
                     )}

                     {/* Creating Item 4 - Strategy Document */}
                     {creatingItems >= 4 && (
                       <motion.div
                         initial={{ opacity: 0, y: -10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.3 }}
                         className="flex items-start gap-3 py-2 border-b border-[#f0f0f0] last:border-0"
                       >
                         <FileText className="size-5 text-[#666666] shrink-0 mt-0.5" />
                         <div className="flex-1 min-w-0">
                           <p className="text-[#212223] font-medium leading-relaxed">
                             Litigation Strategy Notes
                           </p>
                           <p className="text-[#8a8a8a] text-[13px] mt-0.5">
                             Potential counter-arguments and response tactics
                           </p>
                         </div>
                       </motion.div>
                     )}

                     {/* Creating Item 5 - Case Summary */}
                     {creatingItems >= 5 && (
                       <motion.div
                         initial={{ opacity: 0, y: -10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.3 }}
                         className="flex items-start gap-3 py-2 border-b border-[#f0f0f0] last:border-0"
                       >
                         <FileText className="size-5 text-[#666666] shrink-0 mt-0.5" />
                         <div className="flex-1 min-w-0">
                           <p className="text-[#212223] font-medium leading-relaxed">
                             Case Law Summary
                           </p>
                           <p className="text-[#8a8a8a] text-[13px] mt-0.5">
                             Digest of 6 key jurisdiction cases with holdings
                           </p>
                         </div>
                       </motion.div>
                     )}
                   </div>
                 </div>
                 
                 {/* Bottom fade indicator - fixed to bottom */}
                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
               </motion.div>
             )}
          </motion.div>
        )}
        </div>
      </div>

      {/* Collapsed Input Area or Clarifying Questions */}
      <div className="p-4 border-t border-[#E5E5E5] bg-white">
         {showSkillQuestions ? (
             <div className="flex justify-center w-full">
                 <SkillClarifyingQuestions
                     onSubmit={(answers) => {
                       setShowSkillQuestions(false);
                       // Start the skill building process with reasoning steps
                       const buildingMessage = {
                         role: 'assistant',
                         text: '',
                         isBuilding: true,
                         buildingSteps: [
                           { step: 'Analyzing your requirements', status: 'thinking' },
                           { step: 'Structuring the skill framework', status: 'pending' },
                           { step: 'Incorporating legal guidelines', status: 'pending' },
                           { step: 'Generating skill document', status: 'pending' },
                           { step: 'Validating skill completeness', status: 'pending' }
                         ]
                       };
                       setMessages(msgs => [...msgs, buildingMessage]);
                       
                       // Simulate step-by-step progression
                       let currentStep = 0;
                       const interval = setInterval(() => {
                         currentStep++;
                         if (currentStep <= 5) {
                           setMessages(msgs => {
                             const newMsgs = [...msgs];
                             const lastMsg = newMsgs[newMsgs.length - 1];
                             if (lastMsg.isBuilding) {
                               lastMsg.buildingSteps[currentStep - 1].status = 'complete';
                               if (currentStep < 5) {
                                 lastMsg.buildingSteps[currentStep].status = 'thinking';
                               }
                             }
                             return newMsgs;
                           });
                         } else {
                           clearInterval(interval);
                           // Show final skill card
                           setMessages(msgs => {
                             const newMsgs = msgs.slice(0, -1);
                             return [...newMsgs, {
                               role: 'assistant',
                               text: '',
                               skillCard: {
                                 name: 'Legal Memo - Personal Doctrine',
                                 description: 'A specialized skill for drafting legal memoranda following your personal writing style and jurisdictional requirements.',
                                 practiceArea: 'General Practice',
                                 jurisdiction: answers.q3 || 'Federal law (US)',
                                 tone: answers.q4 || 'Highly formal and traditional legal language'
                               }
                             }];
                           });
                           setSkillCreationStep(3);
                         }
                       }, 1500);
                     }}
                     onSkip={() => {
                       setShowSkillQuestions(false);
                       setMessages(msgs => [...msgs, {
                         role: 'assistant',
                         text: "I'll create your skill with the information provided so far."
                       }]);
                       setSkillCreationStep(3);
                     }}
                 />
             </div>
         ) : (
             <div className="max-w-[800px] mx-auto">
                 <PromptInput
                    placeholder="Ask follow-up..."
                    compact={true}
                    files={stagedFiles}
                    onFilesChange={setStagedFiles}
                    onSubmit={(text, files) => {
                        handleFollowUp(text, files);
                        setStagedFiles([]);
                    }}
                 />
             </div>
         )}
      </div>
      
      <style>{`
        @keyframes shimmer {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
        }
        .animate-shimmer {
            animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
}
