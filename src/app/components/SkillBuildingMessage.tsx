import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Save, Share2, Download, Blocks } from 'lucide-react';

interface BuildingStep {
  step: string;
  status: 'pending' | 'thinking' | 'complete';
}

interface SkillCard {
  name: string;
  description: string;
  practiceArea: string;
  jurisdiction: string;
  tone?: string;
}

interface SkillBuildingMessageProps {
  msg: {
    isBuilding?: boolean;
    buildingSteps?: BuildingStep[];
    skillCard?: SkillCard;
    text?: string;
  };
  onOpenSkillPanel?: (skillData: SkillCard) => void;
  onShare?: (skillData: SkillCard) => void;
  onSave?: (skillData: SkillCard) => void;
  onDownload?: (skillData: SkillCard) => void;
}

function PulsingDots() {
  return (
    <div className="flex items-center gap-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-[#D64000] rounded-full"
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Green checkmark SVG (teal outline with cream background)
function CheckmarkIcon() {
  return (
    <svg className="shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9.5" fill="#F3F2EE" stroke="#307A68" strokeWidth="1"/>
      <path d="M5 10.5L8.5 14L15 7.5" stroke="#307A68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function OrangeDiamond() {
  return (
    <motion.div 
      className="w-2.5 h-2.5 rotate-45 bg-[#D64000] shrink-0"
      animate={{ rotate: [45, 405] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

function ConnectorLine() {
  return (
    <div className="flex flex-[1_0_0] items-center justify-center min-h-px relative w-[1.06px]">
      <div className="flex-none rotate-[89.82deg] w-[100cqh]">
        <div className="h-px relative w-full">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 1">
            <path d="M19 0V1H0V0H19Z" fill="#D2D2D2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function OrangeConnectorLine() {
  return (
    <div className="flex flex-[1_0_0] items-center justify-center min-h-px relative w-[2px]">
      <div className="w-full h-full bg-[#D64000]" />
    </div>
  );
}

export function SkillBuildingMessage({ msg, onOpenSkillPanel, onShare, onSave, onDownload }: SkillBuildingMessageProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [reasoningExpanded, setReasoningExpanded] = useState(false);
  const [analyzingExpanded, setAnalyzingExpanded] = useState(false);
  const [buildingExpanded, setBuildingExpanded] = useState(false);

  // Track which phase we're in
  const [currentPhase, setCurrentPhase] = useState<'reasoning' | 'analyzing' | 'building' | 'complete'>('reasoning');

  useEffect(() => {
    if (msg.isBuilding && msg.buildingSteps) {
      const completedCount = msg.buildingSteps.filter(s => s.status === 'complete').length;
      const hasThinking = msg.buildingSteps.some(s => s.status === 'thinking');
      
      // Determine phase based on completed count
      if (completedCount === 0 && !hasThinking) {
        // Just starting - reasoning phase
        setCurrentPhase('reasoning');
        setReasoningExpanded(true);
        setAnalyzingExpanded(false);
        setBuildingExpanded(false);
      } else if (completedCount >= 1 && completedCount < 2) {
        // Reasoning done, analyzing phase
        setCurrentPhase('analyzing');
        setReasoningExpanded(false);
        setAnalyzingExpanded(true);
        setBuildingExpanded(false);
      } else if (completedCount >= 2 || hasThinking) {
        // Building phase
        setCurrentPhase('building');
        setReasoningExpanded(false);
        setAnalyzingExpanded(false);
        setBuildingExpanded(true);
      }
      
      // Check if all complete
      if (msg.buildingSteps.every(s => s.status === 'complete')) {
        setCurrentPhase('complete');
        setBuildingExpanded(false); // Collapse when complete
      }
    } else if (msg.skillCard) {
      // FINAL STATE - ensure everything is collapsed
      setReasoningExpanded(false);
      setAnalyzingExpanded(false);
      setBuildingExpanded(false);
    }
  }, [msg.isBuilding, msg.buildingSteps, msg.skillCard]);

  if (msg.isBuilding && msg.buildingSteps) {
    const completedSteps = msg.buildingSteps.filter(s => s.status === 'complete');
    const currentStep = msg.buildingSteps.find(s => s.status === 'thinking');
    const allComplete = msg.buildingSteps.every(s => s.status === 'complete');
    
    // Determine which sections to show
    const showReasoning = true;
    const showAnalyzing = currentPhase === 'analyzing' || currentPhase === 'building' || currentPhase === 'complete';
    const showBuilding = currentPhase === 'building' || currentPhase === 'complete';

    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="text-[#212223] text-[15px] leading-[1.5]">
          Perfect, I have everything I need. Let me start drafting your skill.
        </div>
        
        {/* Main card container */}
        <div className="max-w-[800px] border border-[#e5e5e5] rounded-lg">
          <div className="flex flex-col gap-2 px-6 py-4">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              <div className="font-['Clario',sans-serif] font-medium text-[15px] text-[#212223] leading-[1.5]">
                Contract amendment review
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="font-['Clario',sans-serif] text-[14px] text-[#212223] leading-[1.2] hover:text-[#1d4b34] transition-colors"
              >
                {isExpanded ? 'Hide steps' : 'Show steps'}
              </button>
            </div>

            {/* Collapsible Steps */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-1 overflow-hidden"
                >
                  {/* Reasoning step */}
                  {showReasoning && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex gap-[6px] items-start w-full"
                    >
                      <div className="flex flex-col items-center w-[22px]" style={{ containerType: "size" } as React.CSSProperties}>
                        <CheckmarkIcon />
                        {showAnalyzing && <ConnectorLine />}
                      </div>
                      <div className="flex-1 pb-[18px]">
                        <button
                          onClick={() => setReasoningExpanded(!reasoningExpanded)}
                          className="flex gap-2 items-center w-full text-left hover:text-[#1d4b34] transition-colors"
                        >
                          <span className="text-[#212223] text-[14px] leading-[1.5]">
                            Reasoning
                          </span>
                          {reasoningExpanded ? (
                            <ChevronUp className="size-4 text-[#404040]" />
                          ) : (
                            <ChevronDown className="size-4 text-[#404040]" />
                          )}
                        </button>
                        <AnimatePresence>
                          {reasoningExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 overflow-hidden"
                            >
                              <div className="space-y-4 text-[14px]">
                                <p className="text-[#404040] leading-relaxed">
                                  Identifying the key steps involved in contract amendment review:
                                </p>
                                <ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
                                  <li className="flex items-start gap-2">
                                    <span className="text-[#d64000] shrink-0">•</span>
                                    <span>Understanding what makes a good amendment review process</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-[#d64000] shrink-0">•</span>
                                    <span>Identifying the key decision points and analysis steps</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-[#d64000] shrink-0">•</span>
                                    <span>Structuring the workflow for repeatability</span>
                                  </li>
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {/* Analyzing patterns step */}
                  {showAnalyzing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex gap-[6px] items-start w-full"
                    >
                      <div className="flex flex-col items-center w-[22px]" style={{ containerType: "size" } as React.CSSProperties}>
                        <CheckmarkIcon />
                        {showBuilding && <ConnectorLine />}
                      </div>
                      <div className="flex-1 pb-[18px]">
                        <button
                          onClick={() => setAnalyzingExpanded(!analyzingExpanded)}
                          className="flex gap-2 items-center w-full text-left hover:text-[#1d4b34] transition-colors"
                        >
                          <span className="text-[#212223] text-[14px] leading-[1.5]">
                            Analyzing patterns
                          </span>
                          {analyzingExpanded ? (
                            <ChevronUp className="size-4 text-[#404040]" />
                          ) : (
                            <ChevronDown className="size-4 text-[#404040]" />
                          )}
                        </button>
                        <AnimatePresence>
                          {analyzingExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 overflow-hidden"
                            >
                              <div className="space-y-4 text-[14px]">
                                <ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
                                  <li className="flex items-start gap-2">
                                    <span className="text-[#d64000] shrink-0">•</span>
                                    <span>Looking at common patterns in contract amendment reviews</span>
                                  </li>
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {/* Building skill step - with orange diamond */}
                  {showBuilding && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex gap-[6px] items-start w-full"
                    >
                      <div className="flex flex-col items-center w-[22px]">
                        {allComplete ? <CheckmarkIcon /> : <OrangeDiamond />}
                        {!allComplete && <OrangeConnectorLine />}
                      </div>
                      <div className="flex-1 pb-[18px]">
                        <button
                          onClick={() => setBuildingExpanded(!buildingExpanded)}
                          className="flex gap-2 items-center w-full text-left hover:text-[#1d4b34] transition-colors"
                        >
                          <span className="text-[#212223] text-[14px] leading-[1.5]">
                            Building skill
                          </span>
                          {buildingExpanded ? (
                            <ChevronUp className="size-4 text-[#404040]" />
                          ) : (
                            <ChevronDown className="size-4 text-[#404040]" />
                          )}
                        </button>
                        <AnimatePresence>
                          {buildingExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 overflow-hidden"
                            >
                              <div className="space-y-2 text-[14px]">
                                <ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
                                  {msg.buildingSteps.slice(0, completedSteps.length + (currentStep ? 1 : 0)).map((step, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="text-[#d64000] shrink-0">•</span>
                                      <span>{step.step}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                                {!allComplete && <PulsingDots />}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  if (msg.skillCard) {
    const skillName = msg.skillCard.name;
    
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="text-[#212223] text-[15px] leading-[1.5]">
          Perfect, I have everything I need. Let me start drafting your skill.
        </div>
        
        {/* Main card container - completed state */}
        <div className="max-w-[800px] border border-[#e5e5e5] rounded-lg">
          <div className="flex flex-col gap-2 px-6 py-4">
            {/* Header */}
            <div className="flex items-center justify-between w-full pb-2">
              <div className="font-['Clario',sans-serif] font-medium text-[15px] text-[#212223] leading-[1.5]">
                {skillName}
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="font-['Clario',sans-serif] text-[14px] text-[#212223] leading-[1.2] hover:text-[#1d4b34] transition-colors"
              >
                {isExpanded ? 'Hide steps' : 'Show steps'}
              </button>
            </div>

            {/* Collapsible Steps - ALL COLLAPSED by default */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-1 overflow-hidden"
                >
                  {/* Reasoning step - COLLAPSED */}
                  <div className="flex gap-[6px] items-start w-full">
                    <div className="flex flex-col items-center w-[22px]" style={{ containerType: "size" } as React.CSSProperties}>
                      <CheckmarkIcon />
                      <ConnectorLine />
                    </div>
                    <div className="flex-1 pb-[18px]">
                      <button
                        onClick={() => setReasoningExpanded(!reasoningExpanded)}
                        className="flex gap-2 items-center w-full text-left hover:text-[#1d4b34] transition-colors"
                      >
                        <span className="text-[#212223] text-[14px] leading-[1.5]">
                          Reasoning
                        </span>
                        {reasoningExpanded ? (
                          <ChevronUp className="size-4 text-[#404040]" />
                        ) : (
                          <ChevronDown className="size-4 text-[#404040]" />
                        )}
                      </button>
                      <AnimatePresence>
                        {reasoningExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 overflow-hidden"
                          >
                            <div className="space-y-4 text-[14px]">
                              <p className="text-[#404040] leading-relaxed">
                                Identifying the key steps involved in {skillName.toLowerCase()}:
                              </p>
                              <ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
                                <li className="flex items-start gap-2">
                                  <span className="text-[#d64000] shrink-0">•</span>
                                  <span>Understanding what makes a good review process</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#d64000] shrink-0">•</span>
                                  <span>Identifying the key decision points and analysis steps</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#d64000] shrink-0">•</span>
                                  <span>Structuring the workflow for repeatability</span>
                                </li>
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Analyzing patterns step - COLLAPSED */}
                  <div className="flex gap-[6px] items-start w-full">
                    <div className="flex flex-col items-center w-[22px]" style={{ containerType: "size" } as React.CSSProperties}>
                      <CheckmarkIcon />
                      <ConnectorLine />
                    </div>
                    <div className="flex-1 pb-[18px]">
                      <button
                        onClick={() => setAnalyzingExpanded(!analyzingExpanded)}
                        className="flex gap-2 items-center w-full text-left hover:text-[#1d4b34] transition-colors"
                      >
                        <span className="text-[#212223] text-[14px] leading-[1.5]">
                          Analyzing patterns
                        </span>
                        {analyzingExpanded ? (
                          <ChevronUp className="size-4 text-[#404040]" />
                        ) : (
                          <ChevronDown className="size-4 text-[#404040]" />
                        )}
                      </button>
                      <AnimatePresence>
                        {analyzingExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 overflow-hidden"
                          >
                            <div className="space-y-4 text-[14px]">
                              <ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
                                <li className="flex items-start gap-2">
                                  <span className="text-[#d64000] shrink-0">•</span>
                                  <span>Looking at common patterns in {skillName.toLowerCase()}</span>
                                </li>
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Building skill step - COLLAPSED with CHECKMARK */}
                  <div className="flex gap-[6px] items-start w-full">
                    <div className="flex flex-col items-center w-[22px]">
                      <CheckmarkIcon />
                    </div>
                    <div className="flex-1 pb-[18px]">
                      <button
                        onClick={() => setBuildingExpanded(!buildingExpanded)}
                        className="flex gap-2 items-center w-full text-left hover:text-[#1d4b34] transition-colors"
                      >
                        <span className="text-[#212223] text-[14px] leading-[1.5]">
                          Building skill
                        </span>
                        {buildingExpanded ? (
                          <ChevronUp className="size-4 text-[#404040]" />
                        ) : (
                          <ChevronDown className="size-4 text-[#404040]" />
                        )}
                      </button>
                      <AnimatePresence>
                        {buildingExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 overflow-hidden"
                          >
                            <div className="space-y-4 text-[14px]">
                              <ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
                                <li className="flex items-start gap-2">
                                  <span className="text-[#d64000] shrink-0">•</span>
                                  <span>Compare the amendment to the underlying agreement.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#d64000] shrink-0">•</span>
                                  <span>Assess materiality and prioritize.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#d64000] shrink-0">•</span>
                                  <span>Research the rationale and market standard for priority issues.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#d64000] shrink-0">•</span>
                                  <span>Benchmark the priority issues.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#d64000] shrink-0">•</span>
                                  <span>Draft a counter-proposal and negotiation memo.</span>
                                </li>
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final output section */}
            <div className="pt-2 flex flex-col gap-2">
              {/* "Here's your new skill" text */}
              <div className="text-[#212223] text-[15px] leading-[1.5]">
                Here's your new <span className="font-['Clario',sans-serif] font-medium">{skillName}</span> skill.
              </div>
              
              {/* "When to use this" section */}
              <div className="pb-2">
                <p className="font-['Clario',sans-serif] font-medium text-[15px] text-[#212223] mb-2">When to use this:</p>
                <p className="text-[#212223] text-[15px] leading-[1.5]">{msg.skillCard.description}</p>
              </div>
              
              {/* Skill Card - clickable with hover */}
              <button
                onClick={() => {
                  console.log('🎯 Skill card clicked!', msg.skillCard);
                  console.log('🔍 onOpenSkillPanel exists?', !!onOpenSkillPanel);
                  if (msg.skillCard && onOpenSkillPanel) {
                    console.log('✅ Calling onOpenSkillPanel');
                    onOpenSkillPanel(msg.skillCard);
                  }
                }}
                className="bg-white h-[48px] border border-[#8a8a8a] rounded-lg w-full hover:bg-[#edf2f0] transition-colors text-left"
              >
                <div className="flex items-center justify-between px-3 h-full">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex items-center justify-center shrink-0">
                      <Blocks className="size-5 text-[#DE6633]" strokeWidth={1.5} fill="#f8eadd" />
                    </div>
                    <span className="font-['Clario',sans-serif] font-medium text-[16px] text-[#212223] leading-[1.5] truncate">{skillName}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('⬇️ Download button clicked!', msg.skillCard);
                        if (msg.skillCard) onDownload?.(msg.skillCard);
                      }}
                      className="p-1.5 hover:bg-[#f5f5f5] rounded transition-colors"
                      title="Download"
                    >
                      <Download className="size-4 text-[#666666]" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('📤 Share button clicked!', msg.skillCard);
                        console.log('🔍 onShare exists?', !!onShare);
                        if (msg.skillCard && onShare) {
                          console.log('✅ Calling onShare');
                          onShare(msg.skillCard);
                        }
                      }}
                      className="p-1.5 hover:bg-[#f5f5f5] rounded transition-colors"
                      title="Share"
                    >
                      <Share2 className="size-4 text-[#666666]" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('💾 Save button clicked!', msg.skillCard);
                        if (msg.skillCard) onSave?.(msg.skillCard);
                      }}
                      className="p-1.5 hover:bg-[#f5f5f5] rounded transition-colors"
                      title="Save"
                    >
                      <Save className="size-4 text-[#666666]" />
                    </button>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default message rendering
  if (typeof msg.text === 'string') {
    return (
      <div className="text-[#212223] text-[15px] whitespace-pre-wrap leading-[1.5]">
        {msg.text}
      </div>
    );
  }

  return (
    <div className="text-[#212223] text-[15px] leading-[1.5] w-full">
      {msg.text}
    </div>
  );
}