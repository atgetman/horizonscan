import { X, Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, count }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white content-stretch flex flex-col gap-[24px] items-center px-[24px] py-[32px] relative rounded-[16px] w-full max-w-[548px]">
        <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_8px_12px_0px_rgba(0,0,0,0.16)]" />
        
        {/* Header with close button */}
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-center pb-[40px] relative shrink-0 w-full">
            {/* Close button */}
            <div className="content-stretch flex items-center justify-end mb-[-40px] relative shrink-0 w-full">
              <button 
                onClick={onClose}
                className="bg-[rgba(252,252,252,0)] content-stretch flex gap-[8px] items-center justify-center p-[12px] relative shrink-0 size-[40px] hover:bg-gray-100 rounded transition-colors"
              >
                <X className="size-4 text-[#212223]" />
              </button>
            </div>
            
            {/* Icon */}
            <div className="mb-[-40px] relative shrink-0 size-[64px]">
              <div className="absolute bg-[#ffeded] content-stretch flex flex-col items-start left-0 p-[18px] rounded-[50px] top-0">
                <div aria-hidden="true" className="absolute border-2 border-[#ffbfbf] border-solid inset-0 pointer-events-none rounded-[50px]" />
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
                  <circle cx="14" cy="14" r="11" stroke="#dc0a0a" strokeWidth="2" fill="none"/>
                  <path d="M14 8v6M14 18v1" stroke="#dc0a0a" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Title and Message */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-col items-center justify-center size-full">
              <div className="content-stretch flex flex-col gap-[8px] items-center justify-center px-[48px] relative size-full">
                <p className="font-['Clario'] font-medium leading-[1.2] not-italic relative shrink-0 text-[#212223] text-[28px] text-center w-full">
                  Delete {count} skill{count > 1 ? 's' : ''}?
                </p>
                <div className="content-start flex flex-wrap gap-[16px] items-start justify-center min-w-[92px] py-[4px] relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-['Source_Sans_3'] font-normal leading-[1.35] min-w-[92px] relative text-[#212223] text-[16px] text-center">
                    This action cannot be undone. The skill{count > 1 ? 's' : ''} will be permanently deleted from your knowledge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-[8px]">
          <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0]">
            <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
            <button
              onClick={onClose}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
            >
              <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                <p className="leading-[1.35]">Cancel</p>
              </div>
            </button>
          </div>
          <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 hover:bg-[#163a28] transition-colors">
            <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
            <button
              onClick={onConfirm}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
            >
              <Trash2 className="size-4 text-[#fcfcfc]" />
              <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
                <p className="leading-[1.35]">Delete</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}