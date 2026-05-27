import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Paperclip, Columns2, Blocks, X, ChevronDown, ChevronUp, Scale, BarChart3, Shield, FileEdit, UserCheck, Library } from 'lucide-react';
import svgPaths from '../../imports/svg-1wkqh0ufu9';
import { PromptInput } from './PromptInput';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Toast } from './Toast';

const SKILL_PROMPTS: Record<string, Array<{ text: string; icon: any }>> = {
  "Contract Risk Scoring": [
    {
      text: "Score the financial and IP risks in this vendor agreement",
      icon: Scale
    },
    {
      text: "What's the overall risk rating for this contract?",
      icon: BarChart3
    }
  ],
  "SaaS Limitation of Liability - Personal Doctrine": [
    {
      text: "Help me with saas limitation of liability - personal doctrine",
      icon: Shield
    }
  ],
  "Memo Routing - Personal Doctrine": [
    {
      text: "Draft a memo analyzing the contract termination clause",
      icon: FileEdit
    },
    {
      text: "Write up formal analysis for the partner's review",
      icon: UserCheck
    }
  ],
  "Indemnification Clause Library": [
    {
      text: "Help me with indemnification clause library - content tool",
      icon: Library
    }
  ]
};

interface SkillTestingContentProps {
  skillName: string;
  onShowTab?: () => void;
}

// Thinking spinner component from ChatInterfaceView
function ThinkingSpinner({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-4">
      <svg 
        className={`size-full ${isActive ? 'animate-spin' : ''}`} 
        viewBox="0 0 16 16" 
        fill="none"
      >
        <circle 
          cx="8" 
          cy="8" 
          r="6" 
          stroke="#D1D5DB" 
          strokeWidth="2"
        />
        <path 
          d="M 8 2 A 6 6 0 0 1 14 8" 
          stroke="#8a8a8a" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function SkillTestingContent({ skillName, onShowTab }: SkillTestingContentProps) {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);
  const [reasoningExpanded, setReasoningExpanded] = useState(false);
  const [thinkingContent, setThinkingContent] = useState('');
  const [responseComplete, setResponseComplete] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<'with' | 'without' | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [showReasonsDropdown, setShowReasonsDropdown] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const feedbackReasons = [
    'Follows my doctrine',
    'Better structure',
    'More accurate',
    'More actionable'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowReasonsDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckboxChange = (type: 'with' | 'without') => {
    if (selectedResponse === type) {
      // Uncheck
      setSelectedResponse(null);
      setShowReasonsDropdown(false);
      setSelectedReasons([]);
    } else {
      // Check this one
      setSelectedResponse(type);
      setShowReasonsDropdown(true);
      setSelectedReasons([]);
    }
  };

  const toggleReason = (reason: string) => {
    setSelectedReasons(prev => 
      prev.includes(reason) 
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmitReasons = () => {
    console.log('Submitted:', selectedResponse, 'Reasons:', selectedReasons);
    setShowReasonsDropdown(false);
    setFeedbackSubmitted(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Get prompts for current skill, with fallback
  const currentPrompts = SKILL_PROMPTS[skillName] || [
    { text: "Test this skill with a custom prompt", icon: FileEdit }
  ];

  const handlePromptSelect = (prompt: string) => {
    setCurrentPrompt(prompt);
  };

  const handlePromptSubmit = (text: string, files: any[]) => {
    if (text.trim()) {
      setSubmittedPrompt(text);
      setCurrentPrompt('');
      setShowChat(true);
      setIsThinking(true);
      setResponseComplete(false);
      
      // Show tab after submission
      if (onShowTab) {
        onShowTab();
      }
      
      // Simulate thinking -> reasoning -> response flow
      setTimeout(() => {
        setThinkingContent(`**Understanding the Request**\n\nThe user is asking for a risk assessment of a vendor agreement, specifically focusing on financial and intellectual property (IP) risks. This requires a detailed analysis of the contract terms, potential liabilities, and the overall risk profile.\n\n**Plan**\n\n1. Identify key financial risks such as payment terms, termination clauses, and penalties\n2. Evaluate IP risks including patent, copyright, and trade secret provisions\n3. Assess overall risk rating based on identified risks\n4. Provide recommendations for mitigating identified risks`);
        setShowReasoning(true);
        setReasoningExpanded(true);
        setIsThinking(false);
      }, 1500);
      
      // Complete response
      setTimeout(() => {
        setReasoningExpanded(false);
        setResponseComplete(true);
      }, 3500);
    }
  };

  const CoCounselLogo = () => (
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
  );

  // Initial view with suggested prompts
  const renderSuggestedPromptsView = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-8 w-full max-w-5xl mx-auto -mt-20 pt-[96px]">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-[#de6633]">
          <Blocks className="size-5.5" />
        </div>
        <span className="text-[21px] text-[#666666] font-normal tracking-tight">Testing {skillName}</span>
      </div>
      
      <h1 className="text-[30px] font-medium text-[#123021] mb-8 text-center tracking-tight leading-[1.2]">
        Let's test your skill
      </h1>

      {/* Chat Input Area */}
      <div className="w-full max-w-[750px] mx-auto pb-8">
        <PromptInput
          withFlourish={true}
          onSubmit={handlePromptSubmit}
          value={currentPrompt}
          onChange={setCurrentPrompt}
          placeholder="Use a suggested prompt or send your own message..."
          activeSkill={{ name: skillName }}
        />
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-col gap-4 w-full justify-center items-center mb-8">
        <div className="flex gap-2 flex-wrap justify-center max-w-[750px]">
          {currentPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptSelect(prompt.text)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-[14px] font-['Source_Sans_3'] font-normal bg-white text-[#212223] border border-[#d2d2d2] hover:border-[#999] hover:shadow-sm"
            >
              <prompt.icon className="size-3.5 text-[#404040]" />
              <span>{prompt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Chat view - single column showing response with skill
  const renderChatView = () => (
    <div className="h-full flex flex-col bg-[#FCFCFC]">
      {/* Chat content */}
      {showComparison ? renderComparisonView() : renderSingleChatView()}
    </div>
  );

  // Single chat view (with skill only)
  const renderSingleChatView = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#FCFCFC]">
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-[800px] mx-auto space-y-4">
          {/* User message */}
          <div className="flex flex-col gap-3 items-end ml-auto max-w-[800px]">
            <div className="flex flex-col gap-2 items-end ml-12">
              <div className="bg-[#f2f2f2] px-4 py-3 rounded-2xl rounded-tr-sm text-[#212223] text-[15px] whitespace-pre-wrap leading-[1.5]">
                {submittedPrompt}
              </div>
            </div>
          </div>

          {/* AI response with reasoning */}
          <div className="flex flex-col gap-3 items-start mr-auto max-w-[800px]">
            <div className="flex gap-2 items-center">
              <CoCounselLogo />
              <span className="text-[#8a8a8a] text-[14px]">
                CoCounsel - {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </span>
            </div>

            <div className="flex flex-col gap-5 w-full">
              {/* Reasoning Section */}
              {(isThinking || showReasoning) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col gap-2"
                >
                  <div 
                    className={`flex items-center ${showReasoning ? 'cursor-pointer' : ''}`}
                    onClick={() => showReasoning && setReasoningExpanded(!reasoningExpanded)}
                  >
                    <ThinkingSpinner isActive={isThinking} />
                    <span className={`text-[#8a8a8a] text-[15px] ml-2 ${!showReasoning || (showReasoning && !thinkingContent) ? 'animate-shimmer' : ''}`}>
                      {showReasoning ? 'Reasoning' : 'Thinking...'}
                    </span>
                    {showReasoning && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="ml-1"
                      >
                        {reasoningExpanded ? (
                          <ChevronUp className="size-4 text-[#8a8a8a]" />
                        ) : (
                          <ChevronDown className="size-4 text-[#8a8a8a]" />
                        )}
                      </motion.div>
                    )}
                  </div>

                  <AnimatePresence>
                    {showReasoning && reasoningExpanded && thinkingContent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-white border border-[#e5e5e5] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] max-h-[350px] relative overflow-hidden"
                      >
                        <div className="overflow-y-auto max-h-[350px] py-2 px-4">
                          <div className="text-[15px] text-[#404040] leading-relaxed markdown-content">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {thinkingContent}
                            </ReactMarkdown>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Main Response */}
              {responseComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="text-[#212223] text-[15px] whitespace-pre-wrap leading-[1.5]">
                    <span className="font-semibold">Comprehensive Risk Assessment: Vendor Agreement</span>
                    {'\n\n'}
                    <span className="font-semibold">EXECUTIVE SUMMARY</span>
                    {'\n'}
                    Overall Risk Rating: <span className="text-[#d64000] font-semibold">MODERATE-HIGH (6.5/10)</span>
                    {'\n\n'}
                    <span className="font-semibold">1. FINANCIAL RISKS (Score: 7/10 - HIGH)</span>
                    {'\n\n'}
                    <span className="font-semibold">Payment Terms & Liability Exposure:</span>
                    {' • 30-day payment term with 5% late fee compounds rapidly (effective APR: 60%)\n• Termination clause requires 60-day notice but lacks clear financial settlement provisions\n• Penalty clause for breach is uncapped and may expose organization to significant damages\n• Missing: Force majeure provisions that could excuse payment obligations during unforeseen events'}
                    {'\n\n'}
                    <span className="font-semibold">2. INTELLECTUAL PROPERTY RISKS (Score: 6/10 - MODERATE)</span>
                    {'\n\n'}
                    <span className="font-semibold">IP Protection & Indemnification:</span>
                    {' • Vendor indemnifies against third-party IP claims (positive)\n• However, indemnification is limited to "use as provided" - modifications void protection\n• Patent coverage appears adequate but copyright/trade secret language is vague\n• Missing: Clear ownership provisions for derivative works or customizations\n• Concern: No representations regarding non-infringement of open-source licenses'}
                    {'\n\n'}
                    <span className="font-semibold">3. KEY RECOMMENDATIONS</span>
                    {'\n\n'}
                    <span className="font-semibold">Immediate Actions:</span>
                    {' 1. Negotiate cap on late fees (2% max) and extend payment terms to 45-60 days\n 2. Add specific termination settlement language with prorated refund provisions\n 3. Include liquidated damages cap tied to 12-month contract value\n 4. Expand IP indemnification to cover open-source compliance\n 5. Add force majeure clause covering pandemic, natural disasters, and government actions'}
                    {'\n\n'}
                    <span className="font-semibold">Risk Mitigation Priority Matrix:</span>
                    {' • Critical (address before signing): Late fee cap, penalty limitations\n • High (negotiate strongly): IP ownership of customizations, termination provisions\n • Medium (document in writing): Force majeure, payment term extensions'}
                  </div>

                  {/* Compare Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => setShowComparison(true)}
                      className="bg-white content-stretch flex items-start justify-center relative rounded-[4px] hover:bg-[#edf2f0] group transition-colors"
                    >
                      <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
                      <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
                        <Columns2 className="size-4 text-[#212223] group-hover:text-[#1d4b34]" />
                        <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                          <p className="leading-[1.35]">Compare with and without skill</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Input at bottom */}
      <div className="p-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#ebf0ed] rounded-[13px] shadow-[0px_8px_32px_0px_rgba(214,64,0,0.1),0px_8px_16px_0px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col justify-end size-full">
              <div className="content-stretch flex flex-col items-start justify-end p-px relative size-full">
                <div className="bg-white relative rounded-[12px] w-full">
                  <div className="flex flex-col gap-2 pl-[16px] pr-[12px] py-[8px] min-h-[44px]">
                    {/* Skill Chip - GREEN */}
                    <div className="inline-flex items-center gap-1 bg-[#edf2f0] text-[#1d4b34] px-2 py-1 rounded text-[13px] border border-[#c9dcd3] self-start animate-in fade-in zoom-in duration-200">
                      <Blocks className="size-3" />
                      <span className="truncate max-w-[200px] font-['Source_Sans_3'] font-normal">{skillName}</span>
                      <button
                        onClick={() => {/* Remove skill */}}
                        className="ml-0.5 hover:bg-[#1d4b34]/10 rounded p-0.5 transition-colors"
                      >
                        <X className="size-2.5" />
                      </button>
                    </div>

                    {/* Input row */}
                    <div className="flex items-center gap-[8px]">
                      <textarea
                        value={currentPrompt}
                        onChange={(e) => setCurrentPrompt(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            // Handle follow-up message
                          }
                        }}
                        placeholder="Ask a follow-up question"
                        rows={1}
                        className="flex-1 resize-none outline-none text-[#212223] placeholder:text-[#999] text-[15px] font-['Source_Sans_3'] font-normal leading-[20px] bg-transparent self-center"
                        style={{
                          minHeight: '20px',
                          maxHeight: '200px',
                          overflow: 'auto'
                        }}
                      />

                      <div className="flex gap-[8px] items-center shrink-0">
                        <button
                          type="button"
                          className="text-[#999999] hover:text-[#666666] transition-colors p-[4px]"
                          title="Attach file"
                        >
                          <Paperclip className="size-[16px]" />
                        </button>

                        <button
                          type="button"
                          disabled={!currentPrompt?.trim()}
                          className={`bg-[#1d4b34] relative rounded-full size-[32px] flex items-center justify-center ${
                            !currentPrompt?.trim()
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-[#153826]"
                          }`}
                          title="Submit"
                        >
                          <ArrowUp className="size-[16px] text-[#fcfcfc]" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Comparison view - side by side with synchronized scrolling
  const renderComparisonView = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#FCFCFC]">
      {/* Header with buttons */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic text-[#212223] text-[16px]">
          <p className="leading-[1.35]">Comparison: With and without skill</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEvaluationModal(true)}
            disabled={!feedbackSubmitted}
            className={`content-stretch flex items-center justify-center relative rounded-[4px] group transition-colors ${
              feedbackSubmitted 
                ? 'bg-white hover:bg-[#edf2f0]' 
                : 'bg-[#f2f2f2] cursor-not-allowed'
            }`}
          >
            <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${
              feedbackSubmitted ? 'border-[#8a8a8a]' : 'border-[#d2d2d2]'
            }`} />
            <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0">
              <div className={`flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 ${
                feedbackSubmitted ? 'text-[#212223] group-hover:text-[#1d4b34]' : 'text-[#8a8a8a]'
              } text-[15px] whitespace-nowrap`} >
                <p className="leading-[1.35]">See evaluation results</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setShowComparison(false)}
            className="bg-white content-stretch flex items-center justify-center relative rounded-[4px] hover:bg-[#edf2f0] group transition-colors p-2"
          >
            <div aria-hidden="true" className="absolute border border-[#8a8a8a] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
            <X className="size-4 text-[#212223] group-hover:text-[#1d4b34] relative z-10" />
          </button>
        </div>
      </div>

      {/* Synchronized scrolling container */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 divide-x divide-gray-200 min-h-full">
          {/* With Skill - LEFT SIDE */}
          <div className="flex flex-col bg-white" ref={selectedResponse === 'with' ? dropdownRef : null}>
            <div className="px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Blocks className="size-4 text-[#de6633]" />
                  <h3 className="text-[18px] font-['Clario:Medium',sans-serif] text-[#212223]">With skill</h3>
                </div>
                {/* Checkbox with dropdown */}
                <div className="relative">
                  <button
                    onClick={() => handleCheckboxChange('with')}
                    className={`relative rounded-lg min-h-[40px] px-[12px] py-[10px] flex items-center gap-[12px]`}
                  >
                    <div className="flex items-center shrink-0">
                      <div className={`relative rounded-[2px] size-[16px] ${selectedResponse === 'with' ? 'bg-[#1d4b34]' : 'bg-white'}`}>
                        <div className="flex items-center justify-center size-full">
                          {selectedResponse === 'with' && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M3 7.5L5.5 10L11 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div className={`absolute border ${selectedResponse === 'with' ? 'border-[#1d4b34]' : 'border-[#d2d2d2]'} border-solid inset-[-1px] pointer-events-none rounded-[3px]`} />
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-['Clario:Medium',sans-serif] text-[14px] text-[#212223] leading-[1.2]">This is better</p>
                    </div>
                    {selectedResponse === 'with' && (
                      <ChevronDown className="size-4 text-[#666666]" />
                    )}
                  </button>
                  {/* Absolute positioned dropdown */}
                  {selectedResponse === 'with' && showReasonsDropdown && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-[#d2d2d2] rounded-lg shadow-lg z-50 min-w-[240px]">
                      <div className="p-2 space-y-1">
                        {feedbackReasons.map(reason => (
                          <button
                            key={reason}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleReason(reason);
                            }}
                            className={`relative rounded-lg w-full min-h-[40px] px-[12px] py-[10px] flex items-center gap-[12px] ${selectedReasons.includes(reason) ? 'bg-[#edf2f0]' : 'bg-white hover:bg-gray-50'}`}
                          >
                            <div className="flex items-center shrink-0">
                              <div className={`relative rounded-[2px] size-[16px] ${selectedReasons.includes(reason) ? 'bg-[#1d4b34]' : 'bg-white'}`}>
                                <div className="flex items-center justify-center size-full">
                                  {selectedReasons.includes(reason) && (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                      <path d="M3 7.5L5.5 10L11 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </div>
                                <div className={`absolute border ${selectedReasons.includes(reason) ? 'border-[#1d4b34]' : 'border-[#d2d2d2]'} border-solid inset-[-1px] pointer-events-none rounded-[3px]`} />
                              </div>
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-['Clario:Medium',sans-serif] text-[14px] text-[#212223] leading-[1.2]">{reason}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="px-3 py-2">
                        <button
                          onClick={handleSubmitReasons}
                          disabled={selectedReasons.length === 0}
                          className={`w-full min-h-[32px] relative rounded-[8px] px-4 py-2 text-[14px] font-['Clario:Medium',sans-serif] transition-colors ${
                            selectedReasons.length === 0 
                              ? 'bg-[#f2f2f2] text-[#8a8a8a] cursor-not-allowed' 
                              : 'bg-[#1d4b34] text-white hover:bg-[#153826]'
                          }`}
                        >
                          {selectedReasons.length > 0 && (
                            <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                          )}
                          Send feedback
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-6 py-6 pb-12">
              <div className="text-[#212223] text-[15px] whitespace-pre-wrap leading-[1.5] font-['Source_Sans_3']">
                <span className="font-semibold">Comprehensive Risk Assessment: Vendor Agreement</span>
                {'\n\n'}
                <span className="font-semibold">EXECUTIVE SUMMARY</span>
                {'\n'}
                Overall Risk Rating: <span className="text-[#d64000] font-semibold">MODERATE-HIGH (6.5/10)</span>
                {'\n\n'}
                <span className="font-semibold">1. FINANCIAL RISKS (Score: 7/10 - HIGH)</span>
                {'\n\n'}
                <span className="font-semibold">Payment Terms & Liability Exposure:</span>
                {' • 30-day payment term with 5% late fee compounds rapidly (effective APR: 60%)\n• Termination clause requires 60-day notice but lacks clear financial settlement provisions\n• Penalty clause for breach is uncapped and may expose organization to significant damages\n• Missing: Force majeure provisions that could excuse payment obligations during unforeseen events'}
                {'\n\n'}
                <span className="font-semibold">2. INTELLECTUAL PROPERTY RISKS (Score: 6/10 - MODERATE)</span>
                {'\n\n'}
                <span className="font-semibold">IP Protection & Indemnification:</span>
                {' • Vendor indemnifies against third-party IP claims (positive)\n• However, indemnification is limited to "use as provided" - modifications void protection\n• Patent coverage appears adequate but copyright/trade secret language is vague\n• Missing: Clear ownership provisions for derivative works or customizations\n• Concern: No representations regarding non-infringement of open-source licenses'}
                {'\n\n'}
                <span className="font-semibold">3. KEY RECOMMENDATIONS</span>
                {'\n\n'}
                <span className="font-semibold">Immediate Actions:</span>
                {' 1. Negotiate cap on late fees (2% max) and extend payment terms to 45-60 days\n 2. Add specific termination settlement language with prorated refund provisions\n 3. Include liquidated damages cap tied to 12-month contract value\n 4. Expand IP indemnification to cover open-source compliance\n 5. Add force majeure clause covering pandemic, natural disasters, and government actions'}
                {'\n\n'}
                <span className="font-semibold">Risk Mitigation Priority Matrix:</span>
                {' • Critical (address before signing): Late fee cap, penalty limitations\n • High (negotiate strongly): IP ownership of customizations, termination provisions\n • Medium (document in writing): Force majeure, payment term extensions'}
              </div>
            </div>
          </div>

          {/* Without Skill - RIGHT SIDE */}
          <div className="flex flex-col bg-white" ref={selectedResponse === 'without' ? dropdownRef : null}>
            <div className="px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-['Clario:Medium',sans-serif] text-[#212223]">Without skill</h3>
                {/* Checkbox with dropdown */}
                <div className="relative">
                  <button
                    onClick={() => handleCheckboxChange('without')}
                    className={`relative rounded-lg min-h-[40px] px-[12px] py-[10px] flex items-center gap-[12px]`}
                  >
                    <div className="flex items-center shrink-0">
                      <div className={`relative rounded-[2px] size-[16px] ${selectedResponse === 'without' ? 'bg-[#1d4b34]' : 'bg-white'}`}>
                        <div className="flex items-center justify-center size-full">
                          {selectedResponse === 'without' && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M3 7.5L5.5 10L11 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div className={`absolute border ${selectedResponse === 'without' ? 'border-[#1d4b34]' : 'border-[#d2d2d2]'} border-solid inset-[-1px] pointer-events-none rounded-[3px]`} />
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-['Clario:Medium',sans-serif] text-[14px] text-[#212223] leading-[1.2]">This is better</p>
                    </div>
                    {selectedResponse === 'without' && (
                      <ChevronDown className="size-4 text-[#666666]" />
                    )}
                  </button>
                  {/* Absolute positioned dropdown */}
                  {selectedResponse === 'without' && showReasonsDropdown && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-[#d2d2d2] rounded-lg shadow-lg z-50 min-w-[240px]">
                      <div className="p-2 space-y-1">
                        {feedbackReasons.map(reason => (
                          <button
                            key={reason}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleReason(reason);
                            }}
                            className={`relative rounded-lg w-full min-h-[40px] px-[12px] py-[10px] flex items-center gap-[12px] ${selectedReasons.includes(reason) ? 'bg-[#edf2f0]' : 'bg-white hover:bg-gray-50'}`}
                          >
                            <div className="flex items-center shrink-0">
                              <div className={`relative rounded-[2px] size-[16px] ${selectedReasons.includes(reason) ? 'bg-[#1d4b34]' : 'bg-white'}`}>
                                <div className="flex items-center justify-center size-full">
                                  {selectedReasons.includes(reason) && (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                      <path d="M3 7.5L5.5 10L11 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </div>
                                <div className={`absolute border ${selectedReasons.includes(reason) ? 'border-[#1d4b34]' : 'border-[#d2d2d2]'} border-solid inset-[-1px] pointer-events-none rounded-[3px]`} />
                              </div>
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-['Clario:Medium',sans-serif] text-[14px] text-[#212223] leading-[1.2]">{reason}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="px-3 py-2">
                        <button
                          onClick={handleSubmitReasons}
                          disabled={selectedReasons.length === 0}
                          className={`w-full min-h-[32px] relative rounded-[8px] px-4 py-2 text-[14px] font-['Clario:Medium',sans-serif] transition-colors ${
                            selectedReasons.length === 0 
                              ? 'bg-[#f2f2f2] text-[#8a8a8a] cursor-not-allowed' 
                              : 'bg-[#1d4b34] text-white hover:bg-[#153826]'
                          }`}
                        >
                          {selectedReasons.length > 0 && (
                            <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
                          )}
                          Send feedback
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-6 py-6 pb-12">
              <div className="text-[#666666] text-[15px] whitespace-pre-wrap leading-[1.5] font-['Source_Sans_3']">
                <span className="font-semibold">Risk Assessment of Vendor Agreement</span>
                {'\n\n'}
                <span className="font-semibold">Financial Risks:</span> The agreement includes a 30-day payment term with a 5% late fee, a termination clause with a 60-day notice period, and a penalty clause for breach of contract.
                {'\n\n'}
                <span className="font-semibold">IP Risks:</span> The agreement includes provisions for patent, copyright, and trade secret protection, with the vendor indemnifying the customer against any third-party claims arising from the use of the software.
                {'\n\n'}
                <span className="font-semibold">Overall Risk Rating:</span> Based on the identified risks, the overall risk rating for this contract is moderate.
                {'\n\n'}
                <span className="font-semibold">Recommendations:</span> Consider negotiating a longer payment term, a more flexible termination clause, and additional IP protection provisions to mitigate identified risks.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Results Modal */}
      {showEvaluationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-1">
                <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223]">Evaluation Results</h2>
                <button
                  onClick={() => setShowEvaluationModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0"
                >
                  <X className="size-5 text-gray-500" />
                </button>
              </div>
              <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">Review your feedback for this skill test.</p>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="space-y-4">
                <div className="bg-[#f5f5f5] rounded-lg p-4">
                  <h4 className="text-[15px] font-['Clario'] font-semibold text-[#212223] mb-2">Selected Response</h4>
                  <p className="text-[14px] text-[#666666] font-['Source_Sans_3']">
                    {selectedResponse === 'with' ? 'With skill' : selectedResponse === 'without' ? 'Without skill' : 'No selection made'}
                  </p>
                </div>

                {selectedReasons.length > 0 && (
                  <div className="bg-[#f5f5f5] rounded-lg p-4">
                    <h4 className="text-[15px] font-['Clario'] font-semibold text-[#212223] mb-2">Reasons</h4>
                    <ul className="space-y-1">
                      {selectedReasons.map(reason => (
                        <li key={reason} className="text-[14px] text-[#666666] font-['Source_Sans_3'] flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-[#1d4b34]"></span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-[#f5f5f5] rounded-lg p-4">
                  <h4 className="text-[15px] font-['Clario'] font-semibold text-[#212223] mb-2">Test Summary</h4>
                  <p className="text-[14px] text-[#666666] font-['Source_Sans_3']">
                    Skill: <span className="font-semibold text-[#212223]">{skillName}</span>
                  </p>
                  <p className="text-[14px] text-[#666666] font-['Source_Sans_3'] mt-1">
                    Prompt: <span className="font-semibold text-[#212223]">{submittedPrompt}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6">
              <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 group hover:bg-[#edf2f0]">
                <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]"/>
                <button
                  onClick={() => setShowEvaluationModal(false)}
                  className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
                >
                  <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                    <p className="leading-[1.35]">Close</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-full w-full bg-[#FCFCFC]">
      <div className="flex-1 h-full flex flex-col relative">
        {showChat ? renderChatView() : renderSuggestedPromptsView()}
      </div>
      {showToast && (
        <Toast
          message="Feedback submitted successfully!"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}