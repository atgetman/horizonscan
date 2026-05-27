import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Bold, Italic, Underline, Strikethrough, List, ChevronDown, Link2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { PromptInput } from './PromptInput';

interface TextSelectionToolbarProps {
  selection: Selection | null;
  onAskAI: (instruction: string, selectedText: string) => void;
}

export function TextSelectionToolbar({ selection, onAskAI }: TextSelectionToolbarProps) {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [showInstructPopover, setShowInstructPopover] = useState(false);
  const [instruction, setInstruction] = useState<string | undefined>(undefined);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRects, setSelectionRects] = useState<DOMRect[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Don't reset if popover is showing
    if (showInstructPopover) {
      return;
    }
    
    if (!selection || selection.isCollapsed) {
      setPosition(null);
      setShowInstructPopover(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rects = Array.from(range.getClientRects());
    const text = selection.toString();
    setSelectedText(text);
    
    // Save the range for later use
    savedRangeRef.current = range.cloneRange();

    // Position toolbar below the selection
    if (rects.length > 0) {
      const lastRect = rects[rects.length - 1];
      setPosition({
        top: lastRect.bottom + window.scrollY + 8,
        left: lastRect.left + window.scrollX + (lastRect.width / 2)
      });
      setSelectionRects(rects);
    }
  }, [selection, showInstructPopover]);

  // Click outside handler
  useEffect(() => {
    if (!showInstructPopover) return;

    // Small delay to prevent immediate closure when opening
    let cleanup: (() => void) | undefined;
    
    const timeoutId = setTimeout(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
          setShowInstructPopover(false);
          setInstruction(undefined);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      
      cleanup = () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      cleanup?.();
    };
  }, [showInstructPopover]);

  const handleAskAIClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Preserve the current selection before showing popover
    const currentSelection = window.getSelection();
    if (currentSelection && !currentSelection.isCollapsed) {
      const range = currentSelection.getRangeAt(0);
      savedRangeRef.current = range.cloneRange();
    }
    
    setShowInstructPopover(true);
    setInstruction(undefined);
  };

  // Auto-focus the prompt input when popover opens
  useEffect(() => {
    if (showInstructPopover) {
      // Small delay to ensure the component is rendered
      setTimeout(() => {
        // Find the textarea inside PromptInput via the popover ref
        const textarea = popoverRef.current?.querySelector('textarea');
        
        if (textarea) {
          // Focus the window and textarea
          window.focus();
          (textarea as HTMLTextAreaElement).focus();
        }
      }, 50);
    }
  }, [showInstructPopover]);

  const handleInstructSubmit = () => {
    if (instruction && selectedText) {
      console.log('[TextSelectionToolbar] Submit clicked');
      console.log('[TextSelectionToolbar] Instruction:', instruction);
      console.log('[TextSelectionToolbar] Selected text:', selectedText);
      console.log('[TextSelectionToolbar] Calling onAskAI...');
      
      onAskAI(instruction, selectedText);
      setShowInstructPopover(false);
      setInstruction(undefined);
      // Clear selection
      window.getSelection()?.removeAllRanges();
    }
  };

  if (!position) return null;

  return createPortal(
    <>
      {/* Fake selection highlight overlay - only show when popover is open */}
      {showInstructPopover && selectionRects.length > 0 && selectionRects.map((rect, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `${rect.top + window.scrollY}px`,
            left: `${rect.left + window.scrollX}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            backgroundColor: 'rgba(0, 123, 255, 0.3)', // Blue highlight similar to browser selection
            pointerEvents: 'none', // Don't interfere with clicks
            zIndex: 9998 // Below popover (9999) but above content
          }}
        />
      ))}
      
      {/* Toolbar/Popover */}
      <div
        ref={popoverRef}
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: 'translateX(-50%)',
          zIndex: 9999
        }}
      >
        {!showInstructPopover ? (
          // Toolbar View
          <div 
            className="bg-white border border-gray-200 rounded-lg shadow-xl flex items-center gap-0.5 p-1"
            onMouseDown={(e) => {
              // Prevent document selection from being cleared when clicking in toolbar
              e.preventDefault();
            }}
          >
            {/* Ask AI Button */}
            <button
              onClick={handleAskAIClick}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-gray-100 text-sm font-medium text-gray-700 transition-colors whitespace-nowrap"
            >
              <Sparkles className="size-4 fill-[#D64000] text-[#D64000] shrink-0" />
              Ask AI
            </button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Formatting Dropdown */}
            <button className="flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 transition-colors text-sm">
              <span>Paragraph</span>
              <ChevronDown className="size-3" />
            </button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Font Size Dropdown */}
            <button className="flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 transition-colors text-sm">
              <span>14</span>
              <ChevronDown className="size-3" />
            </button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Formatting Buttons */}
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <Bold className="size-4" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <Italic className="size-4" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <Underline className="size-4" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <Strikethrough className="size-4" />
            </button>

            <div className="w-px h-6 bg-gray-200" />

            {/* List Dropdown */}
            <button className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <List className="size-4" />
              <ChevronDown className="size-3" />
            </button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Color Picker */}
            <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <div className="size-4 rounded-full bg-gray-900 border border-gray-300" />
            </button>

            <div className="w-px h-6 bg-gray-200" />

            {/* Link Button */}
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <Link2 className="size-4" />
            </button>
          </div>
        ) : (
          // Instruct CoCounsel Popover View
          <div 
            className="w-[420px] bg-white border border-gray-200 rounded-lg shadow-xl p-4"
            onMouseDown={(e) => {
              // Allow focus for form elements (textarea, input, button)
              const target = e.target as HTMLElement;
              const isFormElement = ['TEXTAREA', 'INPUT', 'BUTTON'].includes(target.tagName);
              
              if (!isFormElement) {
                // Only prevent default for non-interactive elements
                e.preventDefault();
              }
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="size-5 text-[#D64000] fill-[#D64000]" />
              <h3 className="text-sm font-semibold text-gray-900">Instruct CoCounsel</h3>
            </div>

            {/* Compact prompt input */}
            <PromptInput
              value={instruction}
              onChange={setInstruction}
              onSubmit={(text) => {
                if (text.trim() && selectedText) {
                  onAskAI(text, selectedText);
                  setShowInstructPopover(false);
                  setInstruction(undefined);
                  window.getSelection()?.removeAllRanges();
                }
              }}
              placeholder="Ask for changes..."
              compact={true}
            />
          </div>
        )}
      </div>
    </>,
    document.body
  );
}