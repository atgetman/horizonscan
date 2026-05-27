import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PromptInput } from './PromptInput';
import { FileText, Folder, Table, X, MessageCircleMore, MessageCircleQuestion, MoreHorizontal } from 'lucide-react';
import svgPaths from '../../imports/svg-1wkqh0ufu9';
import { WorkflowPhases } from './WorkflowPhases';

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

// Reusing types and components from ActiveChatView or redefining them if not exported
// Since ActiveChatView doesn't export them, I'll redefine them here for simplicity
// ideally we would refactor them into a shared file.

export interface StagedItem {
    id: string;
    name: string;
    type: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string | React.ReactNode;
  attachments?: StagedItem[];
  isFigmaContent?: boolean;
  workflowData?: {
    showReasoning?: boolean;
    showSources?: boolean;
    showPreparing?: boolean;
    documentTitle?: string;
    artifactIntro?: string;
    artifactDescription?: string;
  };
}

interface ChatSidebarProps {
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
  onClose?: () => void;
}

export function ChatSidebar({ messages, onMessagesChange, onClose }: ChatSidebarProps) {
  const [showThinking, setShowThinking] = useState(false);
  const [stagedFiles, setStagedFiles] = useState<StagedItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showThinking]);

  const handleFollowUp = (text: string, files: StagedItem[]) => {
      onMessagesChange([...messages, { role: 'user', text, attachments: files }]);
      setShowThinking(true);
      
      // Simulate reply after delay
      setTimeout(() => {
          setShowThinking(false);
          onMessagesChange([...messages, { role: 'user', text, attachments: files }, { role: 'assistant', text: 'I can help you with that. I\'ve updated the document based on your request.' }]);
      }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#FCFCFC] w-[350px] border-l border-[#E3E4E6] shadow-xl">
      {/* Message List */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MessageCircleMore className="size-8 mb-3 opacity-20" />
            <p className="text-sm">Start a conversation about this document.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                   {msg.role === 'user' ? (
                       <div className="bg-white border border-[#E3E4E6] rounded-lg p-3">
                           <div className="text-[#212223] text-[14px] whitespace-pre-wrap leading-[1.4] mb-2">
                             {msg.text}
                           </div>
                           {msg.attachments && msg.attachments.length > 0 && (
                             <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                               {msg.attachments.map(file => (
                                 <FileChip key={file.id} file={file} />
                               ))}
                             </div>
                           )}
                       </div>
                   ) : (
                       <div className="bg-white border border-[#E3E4E6] rounded-lg p-3">
                           {msg.isFigmaContent && msg.workflowData ? (
                               <div className="flex flex-col gap-3 w-full">
                                   <WorkflowPhases 
                                       showReasoning={msg.workflowData.showReasoning}
                                       showSources={msg.workflowData.showSources}
                                       showPreparing={msg.workflowData.showPreparing}
                                       artifactTitle={msg.workflowData.documentTitle}
                                       artifactIntro={msg.workflowData.artifactIntro}
                                       artifactDescription={msg.workflowData.artifactDescription}
                                   />
                               </div>
                           ) : (
                               typeof msg.text === 'string' ? (
                                   <div className="text-[#212223] text-[14px] whitespace-pre-wrap leading-[1.4]">
                                       {msg.text}
                                   </div>
                               ) : (
                                   <div className="text-[#212223] text-[14px] leading-[1.4] w-full">
                                       {msg.text}
                                   </div>
                               )
                           )}
                       </div>
                   )}
                </motion.div>
            ))}

            {/* Thinking Indicator */}
            {showThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-[#E3E4E6] rounded-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <ThinkingSpinner />
                  <span className="text-[#8a8a8a] text-[13px] animate-shimmer bg-gradient-to-r from-[#8a8a8a] via-[#555] to-[#8a8a8a] bg-[length:200%_100%] bg-clip-text text-transparent">
                     Thinking...
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#E5E5E5] bg-white shrink-0 z-10">
         <PromptInput 
            placeholder="Ask a follow up..."
            compact={messages.length > 0}
            files={stagedFiles}
            onFilesChange={setStagedFiles}
            onSubmit={(text, files) => {
                handleFollowUp(text, files);
                setStagedFiles([]);
            }}
         />
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