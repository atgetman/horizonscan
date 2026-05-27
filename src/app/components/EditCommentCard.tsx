import React, { useState, useEffect, useRef } from 'react';
import { Check, Undo2, Sparkles, X } from 'lucide-react';

interface EditCommentCardProps {
  explanation: string;
  targetElement: HTMLElement;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

export function EditCommentCard({ explanation, targetElement, onAccept, onReject, onClose }: EditCommentCardProps) {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [timestamp] = useState(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm} Today`;
  });

  useEffect(() => {
    const updatePosition = () => {
      if (!targetElement || !cardRef.current) return;

      const rect = targetElement.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      
      // Position to the right of the redlined text
      const left = rect.right + 16;
      const top = rect.top;

      // Adjust if it goes off screen
      const maxLeft = window.innerWidth - cardRect.width - 16;
      const adjustedLeft = Math.min(left, maxLeft);

      setPosition({ top, left: adjustedLeft });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [targetElement]);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'fixed',
        left: `${position.left}px`,
        top: `${position.top}px`,
        zIndex: 1000,
      }}
      className="w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
    >
      {/* Arrow pointing to the text */}
      <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-200" />
      <div className="absolute -left-1.5 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white" />

      {/* Card content */}
      <div className="p-5">
        {/* Header with avatar and timestamp */}
        <div className="flex items-start justify-between mb-4">
          {/* Left side: Avatar and timestamp */}
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-200 flex-shrink-0">
              <Sparkles className="w-4 h-4 text-orange-600 fill-orange-600" />
            </div>
            {/* Label and Timestamp */}
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-900">CoCounsel</span>
              <span className="text-xs text-gray-500">{timestamp}</span>
            </div>
          </div>

          {/* Right side: Close button */}
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Explanation */}
        <p className="text-[13px] text-gray-700 leading-relaxed mb-4">
          {explanation}
        </p>

        {/* Action buttons below explanation */}
        <div className="flex gap-2">
          <button
            onClick={onAccept}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#00563B] hover:bg-[#004530] text-white text-xs font-medium rounded-md transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Accept
          </button>
          <button
            onClick={onReject}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-md border border-gray-300 transition-colors"
          >
            <Undo2 className="w-3.5 h-3.5" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}