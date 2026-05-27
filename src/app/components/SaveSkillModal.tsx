import { X } from 'lucide-react';

interface SaveSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  onConfirm: () => void;
}

export function SaveSkillModal({ isOpen, onClose, skillName, onConfirm }: SaveSkillModalProps) {
  if (!isOpen) return null;

  const handleSave = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="p-6">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223]">
              Save skill
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0"
            >
              <X className="size-5 text-gray-500" />
            </button>
          </div>
          
          <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223] mb-0">
            Save "<span className="font-semibold">{skillName}</span>" to your Skills library?
          </p>
        </div>

        <div className="flex items-center justify-end gap-[8px] p-6 pt-0">
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
          
          <div className="bg-[#1d4b34] hover:bg-[#3d5e4d] transition-colors content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0">
            <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
            <button
              onClick={handleSave}
              className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
            >
              <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
                <p className="leading-[1.35]">Save skill</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}