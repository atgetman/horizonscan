import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-12 right-12 z-[100] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex items-center justify-center min-w-[208px] shadow-[0px_4px_12px_0px_rgba(31,31,31,0.1)]">
        <div className="bg-white content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0">
          <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <circle cx="8" cy="8" r="7" fill="#387c2b" />
              <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="content-start flex flex-wrap gap-[16px] items-center min-w-[100px] relative shrink-0">
            <p className="font-['Source_Sans_3'] font-normal leading-[1.5] min-w-[100px] relative shrink-0 text-[#212223] text-[15px] whitespace-nowrap">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-8 hover:bg-gray-100 rounded transition-colors !border-0"
            title="Close"
          >
            <X className="size-[18px] text-[#666]" />
          </button>
        </div>
      </div>
    </div>
  );
}