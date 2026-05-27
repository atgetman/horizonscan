import { X } from "lucide-react";

interface SkillTooShortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAnyway: () => void;
  lineCount: number;
}

export function SkillTooShortModal({ isOpen, onClose, onSaveAnyway, lineCount }: SkillTooShortModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-1 hover:bg-gray-100 rounded transition-colors">
          <X className="size-5 text-gray-500" />
        </button>
        <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223] mb-3">
          Skill may be too short
        </h2>
        <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#666] mb-6">
          This skill is {lineCount} lines. Skills work best between 180-280 lines. Short skills may not provide enough guidance. Save anyway?
        </p>
        <div className="flex items-center justify-end gap-3">
          <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 group hover:bg-[#edf2f0]">
            <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
            <button
              onClick={onClose}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
            >
              <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[16px] whitespace-nowrap">
                <p className="leading-[1.35]">Go back and edit</p>
              </div>
            </button>
          </div>
          <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[8px] shrink-0 hover:bg-[#3d5e4d] transition-colors">
            <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
            <button
              onClick={onSaveAnyway}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
            >
              <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
                <p className="leading-[1.35]">Save anyway</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
