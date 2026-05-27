import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, ExternalLink, Scale, FileText } from 'lucide-react';
import { useCitation } from '../contexts/CitationContext';

interface CitationProps {
  id: string;
  source: string;
  title: string;
  snippet: string;
  type?: 'case' | 'statute' | 'article' | 'record';
}

export function Citation({ id, source, title, snippet, type = 'case' }: CitationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { openCitation, activeCitation } = useCitation();

  // Check if this citation is currently active
  const isActive = activeCitation?.id === id;

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popoverWidth = 320;
      const viewportWidth = window.innerWidth;
      
      let left = rect.left + window.scrollX;
      
      // Check if popover would go off the right edge
      if (left + popoverWidth > viewportWidth - 20) { // 20px buffer
        left = viewportWidth - popoverWidth - 20;
      }
      
      // Ensure it doesn't go off the left edge
      if (left < 20) {
        left = 20;
      }

      setCoords({
        top: rect.bottom + window.scrollY + 8, // 8px gap
        left: left,
      });
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updatePosition();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100); 
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCitation({ id, source, title, snippet, type });
  };

  // Recalculate position on scroll or resize if open
  useEffect(() => {
    if (!isOpen) return;
    
    const handleScrollOrResize = () => {
       updatePosition();
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen]);

  return (
    <>
      <span
        ref={triggerRef}
        onClick={handleClick}
        id={`footnote-${id}`}
        className={`inline-flex items-center gap-1.5 ml-1 px-2 py-0.5 rounded-md border text-[11px] font-medium cursor-pointer transition-colors align-baseline relative -top-[1px] ${
          isActive 
            ? 'bg-orange-100 border-orange-300 text-[#212223] hover:bg-orange-200' 
            : 'bg-gray-100 border-gray-200 text-[#212223] hover:bg-gray-200'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {type === 'case' && <Scale className="size-3 text-[#666]" />}
        {type === 'statute' && <BookOpen className="size-3 text-[#666]" />}
        {type === 'record' && <FileText className="size-3 text-[#666]" />}
        <span>{source}</span>
      </span>

      {isOpen && createPortal(
        <div 
          ref={popoverRef}
          className="fixed z-[9999] w-[320px] bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-in fade-in zoom-in-95 duration-150 pointer-events-none"
          style={{ top: coords.top, left: coords.left }}
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="mb-2">
             <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">{type}</p>
             <h4 className="text-sm font-bold text-[#212223] leading-snug">{title}</h4>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-2 mt-2">
            {snippet}
          </p>
          <div className="mt-3 flex justify-end">
            <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded">ID: {id}</span>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}