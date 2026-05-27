import React from 'react';
import { motion } from 'motion/react';
import { Scale, BookOpen, FileText, ExternalLink, MoreHorizontal, X } from 'lucide-react';
import { CitationData } from '../data/citationAndHistoryData';
import { useCitation } from '../contexts/CitationContext';

interface SourcesPanelProps {
  citations: CitationData[];
  onClose?: () => void;
}

export function SourcesPanel({ citations, onClose }: SourcesPanelProps) {
  const { openCitation, activeCitation } = useCitation();

  const handleCitationClick = (citation: CitationData) => {
    // Open the citation in the source viewer
    openCitation(citation);
    
    // Scroll to the footnote in the main document if citation ID exists
    if (citation.id) {
      const footnoteElement = document.getElementById(`footnote-${citation.id}`);
      if (footnoteElement) {
        // Find the scrollable container (the document viewer area)
        const scrollContainer = footnoteElement.closest('.overflow-y-auto');
        
        if (scrollContainer) {
          // Calculate the position to scroll to - position at the top with small offset
          const containerRect = scrollContainer.getBoundingClientRect();
          const elementRect = footnoteElement.getBoundingClientRect();
          const scrollTop = scrollContainer.scrollTop;
          const offset = 80; // Small offset from the top (accounting for toolbar/padding)
          const targetScroll = scrollTop + elementRect.top - containerRect.top - offset;
          
          // Smooth scroll the container
          scrollContainer.scrollTo({
            top: Math.max(0, targetScroll), // Ensure we don't scroll to negative values
            behavior: 'smooth'
          });
        }
        
        // Highlight the entire paragraph containing the footnote
        const paragraph = footnoteElement.closest('p');
        if (paragraph) {
          paragraph.classList.add('citation-paragraph-highlight');
          setTimeout(() => {
            paragraph.classList.remove('citation-paragraph-highlight');
          }, 3000);
        }
        
        // Also highlight the footnote itself
        footnoteElement.classList.add('citation-footnote-highlight');
        setTimeout(() => {
          footnoteElement.classList.remove('citation-footnote-highlight');
        }, 3000);
      }
    }
  };

  if (!citations || citations.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#FCFCFC] w-[350px] border-l border-[#E3E4E6] shadow-xl items-center justify-center text-gray-400 p-8 text-center">
        <Scale className="size-8 mb-3 opacity-20" />
        <p className="text-sm">No sources found in this document.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FCFCFC] w-[350px] border-l border-[#E3E4E6] shadow-xl">
      {/* Header with Title and Close */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#E3E4E6] bg-white">
        <h2 className="text-sm font-semibold text-gray-900">Sources</h2>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <MoreHorizontal className="size-4 text-gray-600" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Close sources panel"
            >
              <X className="size-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {citations.map((citation) => {
          const isActive = activeCitation?.id === citation.id;
          return (
            <motion.div
              key={citation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group p-3 rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-orange-50 border-2 border-orange-300 shadow-sm'
                  : 'bg-white border border-[#E3E4E6] hover:border-[#D64000]/30 hover:shadow-sm'
              }`}
              onClick={() => handleCitationClick(citation)}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  {citation.type === 'case' && <Scale className="size-3.5 text-[#666]" />}
                  {citation.type === 'statute' && <BookOpen className="size-3.5 text-[#666]" />}
                  {citation.type === 'article' && <FileText className="size-3.5 text-[#666]" />}
                  {citation.type === 'record' && <FileText className="size-3.5 text-[#666]" />}
                  <span className="text-[11px] font-medium text-[#666] uppercase tracking-wide">{citation.source}</span>
                </div>
                <ExternalLink className="size-3 text-gray-300 group-hover:text-[#D64000] transition-colors" />
              </div>
              
              <h4 className="text-[13px] font-semibold text-[#212223] leading-snug mb-2 group-hover:text-[#D64000] transition-colors">
                {citation.title}
              </h4>
              
              <p className="text-[12px] text-[#666] leading-relaxed line-clamp-3">
                {citation.snippet}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}