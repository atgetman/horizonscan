import React from "react";
import { 
  ChevronDown, 
  Quote,
  History,
  LayoutList,
  Share,
  Download,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { clsx } from "clsx";
import { useWorkspaceNavigation } from "../contexts/WorkspaceNavigationContext";
import { ShareModal } from "./ShareModal";

interface DocumentToolbarProps {
  isChatOpen: boolean;
  onToggleChat: () => void;
  isSourcesOpen: boolean;
  onToggleSources: () => void;
  isHistoryOpen: boolean;
  onToggleHistory: () => void;
  isCommentsOpen?: boolean;
  onToggleComments?: () => void;
  documentName?: string;
}

export function DocumentToolbar({ 
  isChatOpen, 
  onToggleChat,
  isSourcesOpen,
  onToggleSources,
  isHistoryOpen,
  onToggleHistory,
  isCommentsOpen,
  onToggleComments,
  documentName = "Untitled Document"
}: DocumentToolbarProps) {
  const [isTocOpen, setIsTocOpen] = React.useState(false);
  const [shareModalOpen, setShareModalOpen] = React.useState(false);
  const tocRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tocRef.current && !tocRef.current.contains(event.target as Node)) {
        setIsTocOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const headings = [
    { id: "h1-1", text: "Introduction", level: 1 },
    { id: "h2-1", text: "Background", level: 2 },
    { id: "h2-2", text: "Legal Framework", level: 2 },
    { id: "h1-2", text: "Analysis", level: 1 },
    { id: "h2-3", text: "Precedents", level: 2 },
    { id: "h3-1", text: "Smith v. Jones", level: 3 },
    { id: "h1-3", text: "Conclusion", level: 1 },
  ];

  return (
    <div className="h-11 border-b border-[#E5E5E5] bg-[#FCFCFC] flex items-center justify-between px-3 gap-4">
      {/* Left Actions */}
      <div className="flex items-center gap-2">
          
          {/* Table of Contents */}
          <div className="relative" ref={tocRef}>
              <button
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  className={clsx(
                      "flex items-center gap-1 px-1.5 h-7 rounded text-[#212223] transition-colors hover:bg-[#E5E5E5]",
                      isTocOpen ? "bg-[#E5E5E5]" : ""
                  )}
                  title="Table of Contents"
              >
                  <LayoutList className="size-3.5" />
                  <ChevronDown className="size-3 text-[#1D4B34]" strokeWidth={3} />
              </button>

              {isTocOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-[#E5E5E5] pb-2 z-50 max-h-[60vh] overflow-y-auto">
                      <div className="px-4 py-2 border-b border-[#F0F0F0] mb-1">
                          <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Table of Contents</span>
                      </div>
                      <div className="py-1">
                          {headings.map((heading) => (
                              <button
                                  key={heading.id}
                                  onClick={() => setIsTocOpen(false)}
                                  className={clsx(
                                      "w-full text-left px-4 py-1.5 text-sm hover:bg-[#F5F5F5] text-[#374151] transition-colors block",
                                      heading.level === 1 ? "font-medium text-gray-900" : "",
                                      heading.level === 2 ? "pl-8 text-gray-700" : "",
                                      heading.level === 3 ? "pl-12 text-gray-600" : ""
                                  )}
                              >
                                  {heading.text}
                              </button>
                          ))}
                      </div>
                  </div>
              )}
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-[#D2D2D2]" />

          {/* Share */}
          <button className="flex items-center gap-2 px-2 h-7 hover:bg-[#E5E5E5] rounded text-[#404040] text-[13px]" onClick={() => setShareModalOpen(true)}>
              <Share className="size-3.5" />
          </button>

          {/* Divider */}
          <div className="h-4 w-px bg-[#D2D2D2]" />

          {/* Download */}
          <button className="flex items-center gap-2 px-2 h-7 hover:bg-[#E5E5E5] rounded text-[#404040] text-[13px]">
              <Download className="size-3.5" />
          </button>

          {/* Divider */}
          <div className="h-4 w-px bg-[#D2D2D2]" />

          {/* Open in... */}
          <button className="flex items-center gap-1 px-1.5 h-7 hover:bg-[#E5E5E5] rounded text-[#404040] text-[13px]">
              <svg className="size-4" viewBox="0 0 2048 2048" focusable="false">
                <path fill="#2B579A" d="M1562 102q74 0 126 53 52 52 53 127v1484q0 74-53 127-52 52-126 53h-948q-99 0-179-58-78-56-110-147h-120q-85 0-145-60-60-60-60-145v-512q0-85 60-145 60-60 145-60h102v-409q0-127 90-218 90-90 217-90h948z m76 1212q-37 18-76 17h-640v205q0 85-60 145-60 60-145 60h-280q27 47 74 74 48 28 103 28h948q32 0 54-22 22-22 22-55v-452z m-980-290l-64 338-68-338h-133l-65 338-66-338h-108l106 512h133l68-307 65 307 132 0 110-512-110 0z m980-325q-37 18-76 18h-948q-56 0-103 28-46 27-74 74h280q85 0 145 60 60 60 60 145v205h640q32 0 54-23 22-22 22-54v-453z m-1024-494q-85 0-144 60-60 60-60 145v283q88-79 204-79h948q32 0 54-22 22-22 22-54v-256q0-32-22-55-22-22-54-22h-948z"/>
                <path fill="#41A5EE" d="M307 1489l717-875 717 518v634q0 74-53 127-52 52-126 53h-948q-127 0-217-90-90-90-90-218v-149z"/>
                <path fill="#2B7CD3" d="M307 872q0-95 68-163 67-67 163-67h1044l159-130v640q0 74-53 127-52 52-126 52h-948q-127 0-217 90-90 90-90 217v-766z"/>
                <path fill="#185ABD" d="M307 410q0-127 90-218 90-90 217-90h948q74 0 126 53 52 52 53 127v256q0 74-53 126-52 52-126 53h-948q-127 0-217 90-90 90-90 217v-614z"/>
                <path fill="#103F91" d="M717 819h-512q-85 0-145 60-60 60-60 145v512q0 85 60 145 60 60 145 60h512q85 0 145-60 60-60 60-145v-512q0-85-60-145-60-60-145-60z"/>
                <path fill="#FFFFFF" d="M768 1024l-110 512-132 0-65-307-68 307h-133l-106-512h108l66 338 65-338h133l68 338 64-338 110 0z"/>
              </svg>
              <ChevronDown className="size-3 text-[#1D4B34]" strokeWidth={3} />
          </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1">
          <button 
              onClick={onToggleChat}
              className={clsx("flex items-center gap-2 rounded text-[13px] transition-colors px-[10px] h-7", isChatOpen ? "bg-white shadow-sm text-[#D64000]" : "hover:bg-[#E5E5E5] text-[#212223]")}
          >
              <Sparkles className="size-3.5" />
              <span>Ask CoCounsel</span>
          </button>
          
          {/* Divider */}
          <div className="h-4 w-px bg-[#D2D2D2]" />
          
          <button 
              onClick={onToggleSources}
              className={clsx(
                  "flex items-center gap-2 px-[10px] h-7 rounded text-[13px] transition-colors",
                  isSourcesOpen ? "bg-white shadow-sm text-[#D64000]" : "hover:bg-[#E5E5E5] text-[#212223]"
              )}
          >
              <Quote className="size-3.5" />
          </button>
          {onToggleComments && (
              <button 
                  onClick={onToggleComments}
                  className={clsx(
                      "flex items-center gap-2 px-[10px] h-7 rounded text-[13px] transition-colors",
                      isCommentsOpen ? "bg-white shadow-sm text-[#D64000]" : "hover:bg-[#E5E5E5] text-[#212223]"
                  )}
              >
                  <MessageSquare className="size-3.5" />
              </button>
          )}
          <button 
              onClick={onToggleHistory}
              className={clsx(
                  "flex items-center gap-2 px-[10px] h-7 rounded text-[13px] transition-colors",
                  isHistoryOpen ? "bg-white shadow-sm text-[#D64000]" : "hover:bg-[#E5E5E5] text-[#212223]"
              )}
          >
              <History className="size-3.5" />
          </button>
      </div>
      
      {/* Share Modal */}
      <ShareModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        itemName={documentName} 
        itemType="document"
      />
    </div>
  );
}