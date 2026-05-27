import { Check, X } from "lucide-react";

interface ShareConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareTarget?: 'firm' | 'workspace';
  workspaceName?: string;
  onConfirm: () => void;
  confirmButtonText: string;
}

export function ShareConfirmationModal({ isOpen, onClose, shareTarget = 'firm', workspaceName, onConfirm, confirmButtonText }: ShareConfirmationModalProps) {
  if (!isOpen) return null;

  const isFirmShare = shareTarget === 'firm';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
              <div className="absolute bg-[#eaffe5] content-stretch flex flex-col items-center justify-center left-0 p-[18px] rounded-[50px] top-0 size-[64px]">
                <div aria-hidden="true" className="absolute border-2 border-[#bce0a2] border-solid inset-0 pointer-events-none rounded-[50px]" />
                <Check className="size-7 text-[#387c2b] stroke-[2.5]" />
              </div>
            </div>
          </div>
          
          {/* Title and Message */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-col items-center justify-center size-full">
              <div className="content-stretch flex flex-col gap-[8px] items-center justify-center px-[48px] relative size-full">
                <p className="font-['Clario'] font-medium leading-[1.2] not-italic relative shrink-0 text-[#212223] text-[28px] text-center w-full">
                  {isFirmShare ? 'Shared for review' : `Shared to ${workspaceName}`}
                </p>
                <div className="content-start flex flex-wrap gap-[16px] items-start justify-center min-w-[92px] py-[4px] relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-['Source_Sans_3'] font-normal leading-[1.35] min-w-[92px] relative text-[#212223] text-[16px] text-center">
                    {isFirmShare 
                      ? 'The Caldwell & Sterling knowledge team will review your skill.'
                      : 'All members of this workspace can now use this skill.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 hover:bg-[#3d5e4d] transition-colors">
          <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
          <button
            onClick={onConfirm}
            className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
          >
            <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
              <p className="leading-[1.35]">{confirmButtonText}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}