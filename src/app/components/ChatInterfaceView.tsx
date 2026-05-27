import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, AlertCircle, ChevronDown, ChevronUp, Search, NotebookPen, List, Scale, MessageCircleQuestion, ArrowLeftRight, CheckSquare, FileText, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import svgPaths from '../../imports/svg-1wkqh0ufu9';
import { InputRequestForm } from './InputRequestForm';
import { ArtifactCard } from './ArtifactCard';

// Logo paths for the thinking spinner
const LOGO_PATHS = [
  'p37580740', 'p20148880', 'p3c433c00', 'pea82d00', 'p38cb7f00', 'p154c6e00', 
  'p16b47400', 'p10dd9f00', 'p287133f0', 'p5e1d900', 'pd01f8c0', 'p3aa1ff80', 
  'pb176790', 'p1dc50600', 'p304ab800', 'pfe8800', 'p6131b80', 'p924cb00', 
  'p131ab400', 'pa197b00', 'p3bc9d900', 'p194d1c80', 'pa4ca400', 'p3d0aa680', 
  'p115b9f80', 'p12ebfd00', 'p15c7d400', 'p4d2e200'
];

function ThinkingSpinner({ isActive }: { isActive?: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          {LOGO_PATHS.map((key, index) => (
            <motion.path 
              key={`thinking-${key}-${index}`}
              d={(svgPaths as any)[key]} 
              fill="#D64000"
              initial={{ opacity: 1 }}
              animate={isActive ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
              transition={isActive ? { 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.05
              } : {}}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

function CoCounselLogo() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          {LOGO_PATHS.map((key, index) => (
            <path key={`logo-${key}-${index}`} d={(svgPaths as any)[key]} fill="#D64000" />
          ))}
        </g>
      </svg>
    </div>
  );
}

interface ChatInterfaceViewProps {
  userMessage: string;
  assistantMessage: string;
  thinkingContent: string;
  isThinking: boolean;
  showReasoning: boolean;
  reasoningExpanded: boolean;
  error: string;
  inputRequest: {
    prompt: string;
    inputType: 'text' | 'multichoice' | 'confirmation' | 'choice';
    elicitationId: string;
    choices?: string[];
    context?: string;
  } | null;
  artifacts: Array<{
    artifactId: string;
    title: string;
    content: string;
    artifactType: string;
  }>;
  resources: Array<{
    websiteTitle: string;
    resourceTitle: string;
    url: string;
  }>;
  prepWork: Array<{
    title: string;
    type: 'outline' | 'analysis' | 'research' | 'comparison' | 'checklist';
  }>;
  showSearching: boolean;
  showPreparing: boolean;
  showCompiling: boolean;
  searchingExpanded: boolean;
  preparingExpanded: boolean;
  onReasoningToggle: () => void;
  onSearchingToggle: () => void;
  onPreparingToggle: () => void;
  onInputSubmit: (elicitationId: string, response: any) => void;
}

export function ChatInterfaceView({
  userMessage,
  assistantMessage,
  thinkingContent,
  isThinking,
  showReasoning,
  reasoningExpanded,
  error,
  inputRequest,
  artifacts,
  resources,
  prepWork,
  showSearching,
  showPreparing,
  showCompiling,
  searchingExpanded,
  preparingExpanded,
  onReasoningToggle,
  onSearchingToggle,
  onPreparingToggle,
  onInputSubmit
}: ChatInterfaceViewProps) {
  return (
    <div className="space-y-5">
      {/* User Message */}
      {userMessage && (
        <div className="flex justify-end">
          <div className="bg-[#F5F5F5] rounded-lg px-4 py-3 max-w-[70%]">
            <p className="text-[15px] text-[#212223] leading-[1.5]">{userMessage}</p>
          </div>
        </div>
      )}

      {/* Response Container - wraps all AI response sections */}
      <div className="space-y-5">
        {/* Thinking/Reasoning State */}
        {(isThinking || showReasoning) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col gap-2 max-w-[800px] mr-auto"
          >
            {/* Header Row - Spinner + Text that changes from "Thinking..." to "Reasoning" */}
            <div 
              className={`flex items-center ${showReasoning ? 'cursor-pointer' : ''}`}
              onClick={() => showReasoning && onReasoningToggle()}
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

            {/* Dropdown Content */}
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
                        {thinkingContent.replace(/\\\\n/g, '\n')}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Searching/Resources Section */}
        {showSearching && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: (isThinking || showReasoning) ? 0 : 0.2 }}
            className="flex flex-col gap-2 max-w-[800px] mr-auto"
          >
            <div 
              className="flex items-center cursor-pointer pl-0.5"
              onClick={onSearchingToggle}
            >
              <Search className="size-4 text-[#8a8a8a]" />
              <span className={`text-[#8a8a8a] text-[15px] ml-2 ${resources.length === 0 ? 'animate-shimmer' : ''}`}>
                {resources.length === 0 ? 'Searching...' : 'Search results'}
              </span>
              {resources.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="ml-1"
                >
                  {searchingExpanded ? (
                    <ChevronUp className="size-4 text-[#8a8a8a]" />
                  ) : (
                    <ChevronDown className="size-4 text-[#8a8a8a]" />
                  )}
                </motion.div>
              )}
            </div>

            <AnimatePresence>
              {searchingExpanded && resources.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-white border border-[#e5e5e5] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] max-h-[250px] relative overflow-hidden pl-0.5"
                >
                  <div className="overflow-y-auto max-h-[250px] py-2 px-3">
                    <div className="text-[15px]">
                      {resources.map((resource, index) => {
                        // Check if this is Westlaw or Practical Law - use SVG logo instead of favicon
                        const isWestlawOrPL = resource.websiteTitle.toLowerCase().includes('westlaw') || 
                                             resource.websiteTitle.toLowerCase().includes('practical law');
                        
                        // Extract domain for favicon - use Google's favicon service
                        let faviconUrl = '';
                        let showFallbackIcon = false;
                        if (!isWestlawOrPL) {
                          try {
                            const urlObj = new URL(resource.url);
                            const domain = urlObj.hostname;
                            // Use Google's favicon service which handles CORS and has better reliability
                            faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
                          } catch (e) {
                            // Invalid URL, use fallback
                            showFallbackIcon = true;
                          }
                        }
                        
                        return (
                          <div key={`resource-${index}`} className="flex items-center gap-3 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                            {isWestlawOrPL ? (
                              // Use SVG logo for Westlaw and Practical Law
                              <div className="relative shrink-0 size-4">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                                  <g>
                                    {LOGO_PATHS.map((key) => (
                                      <path key={key} d={(svgPaths as any)[key]} fill="#D64000" />
                                    ))}
                                  </g>
                                </svg>
                              </div>
                            ) : showFallbackIcon ? (
                              <FileText className="size-4 text-[#8a8a8a] shrink-0" />
                            ) : (
                              <img 
                                src={faviconUrl} 
                                alt="" 
                                className="size-4 shrink-0"
                                onError={(e) => {
                                  // Replace with fallback icon on error
                                  const parent = e.currentTarget.parentElement;
                                  if (parent) {
                                    e.currentTarget.style.display = 'none';
                                    const fallbackIcon = document.createElement('div');
                                    fallbackIcon.innerHTML = '<svg class="size-4 text-[#8a8a8a] shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>';
                                    parent.insertBefore(fallbackIcon.firstChild!, e.currentTarget.nextSibling);
                                  }
                                }}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-[#212223] leading-tight text-[14px] truncate">
                                {resource.resourceTitle}
                              </p>
                              <p className="text-[#8a8a8a] text-[13px] truncate mt-0.5">
                                {resource.websiteTitle}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Preparing/Prep Work Section */}
        {showPreparing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: showSearching ? 0 : 0.2 }}
            className="flex flex-col gap-2 max-w-[800px] mr-auto"
          >
            <div 
              className="flex items-center cursor-pointer pl-0.5"
              onClick={onPreparingToggle}
            >
              <NotebookPen className="size-4 text-[#8a8a8a]" />
              <span className={`text-[#8a8a8a] text-[15px] ml-2 ${prepWork.length === 0 ? 'animate-shimmer' : ''}`}>
                {prepWork.length === 0 ? 'Compiling research...' : 'Preliminary materials'}
              </span>
              {prepWork.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="ml-1"
                >
                  {preparingExpanded ? (
                    <ChevronUp className="size-4 text-[#8a8a8a]" />
                  ) : (
                    <ChevronDown className="size-4 text-[#8a8a8a]" />
                  )}
                </motion.div>
              )}
            </div>

            <AnimatePresence>
              {preparingExpanded && prepWork.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-white border border-[#e5e5e5] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] max-h-[250px] relative overflow-hidden pl-0.5"
                >
                  <div className="overflow-y-auto max-h-[250px] py-2 px-3">
                    <div className="text-[15px]">
                      {prepWork.map((item, index) => {
                        // Map type to icon
                        const IconComponent = 
                          item.type === 'outline' ? List :
                          item.type === 'analysis' ? Scale :
                          item.type === 'research' ? MessageCircleQuestion :
                          item.type === 'comparison' ? ArrowLeftRight :
                          CheckSquare; // checklist
                        
                        return (
                          <div key={`prepwork-${index}-${item.title}`} className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors">
                            <IconComponent className="size-4 text-[#8a8a8a] shrink-0" />
                            <p className="text-[#212223] leading-relaxed flex-1 min-w-0 text-[15px]">
                              {item.title}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Compiling Research Section */}
        <AnimatePresence>
          {showCompiling && (
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

        {/* Assistant Message */}
        {assistantMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
            className="flex flex-col gap-2"
          >
            <div className="markdown text-[15px] text-[#212223] leading-[1.5] max-w-[800px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {assistantMessage}
              </ReactMarkdown>
            </div>
            
            {/* Artifacts Display - shown below assistant message */}
            {artifacts.length > 0 && (
              <div className="space-y-[12px] max-w-[500px]">
                {artifacts.map((artifact, index) => (
                  <motion.div
                    key={artifact.artifactId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 + (index * 0.1) }}
                  >
                    <ArtifactCard
                      title={artifact.title}
                      content={artifact.content}
                      artifactId={artifact.artifactId}
                      artifactType={artifact.artifactType}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Input Request Form */}
        {inputRequest && (
          <InputRequestForm
            prompt={inputRequest.prompt}
            inputType={inputRequest.inputType}
            elicitationId={inputRequest.elicitationId}
            choices={inputRequest.choices}
            context={inputRequest.context}
            onSubmit={onInputSubmit}
          />
        )}

        {/* Loading indicator for streaming response */}
        {isThinking && assistantMessage && (
          <div className="flex items-center gap-2">
            <Loader2 className="size-4 text-[#D64000] animate-spin" />
            <span className="text-[14px] text-[#8a8a8a]">Generating response...</span>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="size-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!userMessage && !isThinking && !error && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm">Enter a prompt above to test the API with chat interface</p>
          </div>
        )}
      </div>
    </div>
  );
}