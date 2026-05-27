import React, { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowUp, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InlineEditPopoverProps {
  position: { top: number; left: number } | null;
  onClose: () => void;
  onSubmit: (text: string) => void;
  isOpen: boolean;
}

export function InlineEditPopover({ position, onClose, onSubmit, isOpen }: InlineEditPopoverProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure render
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
        setText("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!position) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed z-50 bg-white rounded-xl shadow-xl border border-gray-200 w-[380px] overflow-hidden"
          style={{ 
            top: position.top, 
            left: position.left,
            transform: 'none' // Align left directly
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <Sparkles className="size-3.5 text-[#D64000]" fill="#D64000" />
                    <span>Instruct CoCounsel</span>
                </div>
                <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 p-1"
                >
                    <X className="size-3.5" />
                </button>
            </div>
            
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe changes (e.g., 'Change to Defendant')..."
              className="w-full resize-none outline-none text-[#212223] placeholder:text-gray-400 text-sm bg-transparent leading-relaxed"
              rows={2}
            />
            
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className="bg-[#1D4B34] text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-[#153826] transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Update</span>
                <ArrowUp className="size-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
