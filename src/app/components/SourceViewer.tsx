import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Printer, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Minimize2
} from 'lucide-react';
import { CitationData } from '../contexts/CitationContext';

interface SourceViewerProps {
  citation: CitationData;
  onClose: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function SourceViewer({ citation, onClose, isExpanded, onToggleExpand }: SourceViewerProps) {
  const [zoom, setZoom] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // Mock content generation based on citation type
  const getMockContent = () => {
    // Generate dummy paragraphs
    const paragraphs = [];
    for (let i = 0; i < 5; i++) {
      paragraphs.push(
        <p key={`p-${i}`} className="mb-4 text-justify leading-relaxed text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      );
    }
    
    // Insert the snippet in the middle with highlighting
    paragraphs.splice(2, 0, 
      <p key="highlight" className="mb-4 text-justify leading-relaxed text-gray-800" id="highlight-target">
        Starting from the premise that <span className="bg-orange-200 selection:bg-orange-300 px-1 rounded">{citation.snippet}</span> As we can see from the evidence presented...
      </p>
    );

    for (let i = 5; i < 10; i++) {
      paragraphs.push(
        <p key={`p-${i}`} className="mb-4 text-justify leading-relaxed text-gray-800">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      );
    }
    
    return paragraphs;
  };

  useEffect(() => {
    // Scroll to highlight
    const element = document.getElementById('highlight-target');
    if (element) {
      setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500); // Delay to allow layout to settle
    }
  }, [citation]);

  return (
    <div className="flex flex-col h-full bg-[#333] w-full relative border-l border-[#333]">
      
      {/* Header / Toolbar - Dark Theme, height 44px */}
      <div className="bg-[#333] border-b border-[#444] px-4 flex items-center justify-between shrink-0 h-[44px] shadow-sm z-10 text-gray-300">
        
        {/* Left: Document Title */}
        <div className="flex items-center gap-3 truncate flex-1 min-w-0 mr-4">
           <span className="text-sm font-semibold text-gray-100 truncate">{citation.title}</span>
           <span className="text-xs text-gray-400 truncate shrink-0 font-medium">{citation.source}</span>
        </div>

        {/* Right Controls: Actions */}
        <div className="flex items-center gap-2">
           <button 
             className="p-1.5 hover:bg-[#333] rounded-full text-gray-400 hover:text-white transition-colors"
             onClick={onToggleExpand}
             title={isExpanded ? "Collapse" : "Expand"}
           >
             {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
           </button>
           <button className="p-1.5 hover:bg-[#333] rounded-full text-gray-400 hover:text-white transition-colors">
             <Download className="size-4" />
           </button>
           <div className="h-4 w-px bg-[#444] mx-1"></div>
           <button 
             className="p-1.5 hover:bg-[#333] rounded-full text-gray-400 hover:text-white transition-colors"
             onClick={onClose}
           >
             <X className="size-5" />
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={containerRef} className="flex-1 overflow-auto p-8 relative scroll-smooth flex justify-center bg-[#333]">
        <div 
          ref={pageRef}
          className="bg-white shadow-xl shadow-black/50 mx-auto min-h-full p-12 transition-all duration-200 origin-top text-gray-900"
          style={{ 
            width: '816px', // Standard A4 width at 96dpi
            height: 'min-content',
            transform: `scale(${zoom/100})`,
            transformOrigin: 'top center',
            marginBottom: `${Math.max(40, (1056 * (zoom/100)) - 1056 + 100)}px` // Approximate height compensation
          }}
        >
          {/* Header of the mock doc */}
          <div className="mb-8 border-b-2 border-black pb-4">
             <h1 className="text-2xl font-serif font-bold text-black mb-2">{citation.title}</h1>
             <p className="text-sm font-serif text-gray-600 uppercase tracking-widest">{citation.source}</p>
          </div>

          <div className="font-serif text-[15px] leading-7 text-gray-900">
             {getMockContent()}
          </div>
          
          {/* Footer Page Number */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between text-xs text-gray-400 font-sans">
             <span>Case ID: {citation.id}</span>
             <span>Page 22 of 156</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#252526] rounded-full shadow-lg border border-[#333] px-4 py-2 flex items-center gap-4 z-20 whitespace-nowrap">
         <button className="text-gray-400 hover:text-white transition-colors">
           <ChevronLeft className="size-5" />
         </button>
         <span className="text-xs font-medium text-gray-300 tabular-nums min-w-[60px] text-center">
           22 / 156
         </span>
         <button className="text-gray-400 hover:text-white transition-colors">
           <ChevronRight className="size-5" />
         </button>
         <div className="h-4 w-px bg-[#444] mx-1"></div>
         <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => setZoom(Math.max(30, zoom - 10))}
          >
            <ZoomOut className="size-4" />
          </button>
          <span className="text-xs font-medium text-gray-300 min-w-[32px] text-center select-none tabular-nums">{zoom}%</span>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
          >
            <ZoomIn className="size-4" />
          </button>
      </div>

    </div>
  );
}