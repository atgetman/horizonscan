import { X, AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning';
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = 'warning'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden flex flex-col p-6 gap-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-amber-600 mt-0.5" />
            <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223]">{title}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">
          {message}
        </p>

        <div className="flex items-center justify-end">
          <div className="flex items-center gap-[8px]">
            <div className="bg-white content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 group hover:bg-[#edf2f0]">
              <div aria-hidden="true" className="absolute border border-[#d2d2d2] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
              <button
                onClick={onClose}
                className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
              >
                <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#212223] group-hover:text-[#1d4b34] text-[15px] whitespace-nowrap">
                  <p className="leading-[1.35]">{cancelText}</p>
                </div>
              </button>
            </div>
            <div className="bg-[#1d4b34] content-stretch flex items-start justify-center min-h-[32px] relative rounded-[4px] shrink-0 hover:bg-[#163a28] transition-colors">
              <div aria-hidden="true" className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
              <button
                onClick={onConfirm}
                className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0"
              >
                <div className="flex flex-col font-['Clario'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[15px] whitespace-nowrap">
                  <p className="leading-[1.35]">{confirmText}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}