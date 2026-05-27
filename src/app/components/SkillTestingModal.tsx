import { useState } from "react";
import { X, ChevronLeft, ThumbsUp, ThumbsDown, ArrowUp, Paperclip, FileText, Gavel } from "lucide-react";

interface SkillTestingModalProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
}

const SUGGESTED_PROMPTS = [
  { 
    icon: <FileText className="size-[19px] text-[#666666]" />,
    title: "Draft mutual indemnification clause",
    description: "for software licensing agreement",
    prompt: "Draft mutual indemnification clause for software licensing agreement"
  },
  { 
    icon: <Gavel className="size-[19px] text-[#666666]" />,
    title: "Need vendor IP indemnity language",
    description: "for SaaS contract",
    prompt: "Need vendor IP indemnity language for SaaS contract"
  },
];

export function SkillTestingModal({ isOpen, onClose, skillName }: SkillTestingModalProps) {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handlePromptSelect = (prompt: string, index: number) => {
    setCurrentPrompt(prompt);
    setSelectedPromptIndex(index);
  };

  const handleCompare = () => {
    if (currentPrompt) {
      setShowComparison(true);
    }
  };

  const renderInitialView = () => (
    <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
      <div className="p-6">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223]">
            Testing: {skillName}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
            <X className="size-5 text-gray-500" />
          </button>
        </div>
        <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223]">Compare responses with and without this skill</p>
      </div>

      <div className="px-6 pb-6 pt-2 flex-1 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-[16px] font-['Clario'] font-semibold text-[#212223] mb-4">Suggested prompts</h3>
          <div className="grid grid-cols-2 gap-3">
            {SUGGESTED_PROMPTS.map((item, index) => (
              <button
                key={index}
                onClick={() => handlePromptSelect(item.prompt, index)}
                className="flex items-start gap-3 px-4 py-3.5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-left shadow-sm"
              >
                <div className="shrink-0 mt-0.5">{item.icon}</div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[15px] font-medium leading-tight text-[#474747]">{item.title}</span>
                  <span className="text-[#666666] text-[13px] leading-tight">{item.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center py-6">
          <p className="text-[14px] font-['Source_Sans_3'] text-[#212223]">
            Or send your own message to compare responses
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Figma Sprint6ChatThread styled input with orange glow */}
        <div className="bg-[#ebf0ed] rounded-[13px] shadow-[0px_8px_32px_0px_rgba(214,64,0,0.1),0px_8px_16px_0px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col justify-end size-full">
            <div className="content-stretch flex flex-col items-start justify-end p-px relative size-full">
              <div className="bg-white relative rounded-[12px] w-full">
                <div className="flex items-center pl-[16px] pr-[12px] py-[8px] gap-[8px] min-h-[44px]">
                  {/* Textarea */}
                  <textarea
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleCompare();
                      }
                    }}
                    placeholder="Ask CoCounsel to compare..."
                    rows={1}
                    className="flex-1 resize-none outline-none text-[#212223] placeholder:text-[#999] text-[15px] font-['Source_Sans_3'] font-normal leading-[20px] bg-transparent self-center"
                    style={{
                      minHeight: '20px',
                      maxHeight: '200px',
                      overflow: 'auto'
                    }}
                  />

                  {/* Button Row */}
                  <div className="flex gap-[8px] items-center shrink-0">
                    {/* Left button */}
                    <button
                      type="button"
                      className="text-[#999999] hover:text-[#666666] transition-colors p-[4px]"
                      title="Attach file"
                    >
                      <Paperclip className="size-[16px]" />
                    </button>

                    {/* Right button */}
                    <button
                      type="button"
                      onClick={handleCompare}
                      disabled={!currentPrompt?.trim()}
                      className={`bg-[#1d4b34] relative rounded-full size-[32px] flex items-center justify-center ${
                        !currentPrompt?.trim()
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-[#153826]"
                      }`}
                      title="Submit"
                    >
                      <ArrowUp className="size-[16px] text-[#fcfcfc]" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderComparisonView = () => (
    <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
      <div className="p-6">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowComparison(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors -ml-1"
            >
              <ChevronLeft className="size-5 text-gray-500" />
            </button>
            <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223]">
              Testing: {skillName}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
            <X className="size-5 text-gray-500" />
          </button>
        </div>
        <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223] ml-9">Compare responses with and without this skill</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-2 divide-x divide-gray-200">
          {/* Without Skill */}
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 bg-[#FFF5F0]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[14px] font-['Source_Sans_3'] font-semibold text-[#8B4513]">Without skill</h3>
                <span className="text-[12px] text-[#A0522D]">Base system prompt only</span>
              </div>
              <p className="text-[13px] text-[#8B4513] italic">{currentPrompt}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="p-4 bg-[#FFF5F0] border border-[#FFE0CC] rounded-lg">
                  <p className="text-[14px] font-['Source_Sans_3'] leading-relaxed text-gray-700">
                    <span className="font-semibold">Indemnification Clause</span>
                    <br /><br />
                    Each party agrees to indemnify and hold harmless the other party from any claims arising from their respective performance under this agreement.
                    <br /><br />
                    [Generic boilerplate response without specific SaaS context or detailed provisions]
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[12px] text-gray-500">Level 1</span>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <ThumbsUp className="size-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <ThumbsDown className="size-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* With Skill */}
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 bg-[#edf2f0]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="relative rounded-[2px] shrink-0 size-[16px] bg-[#1d4b34]">
                    <div className="flex items-center justify-center size-full">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7.5L5.5 10L11 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="absolute border border-[#1d4b34] border-solid inset-[-1px] pointer-events-none rounded-[3px]" />
                  </div>
                  <h3 className="text-[14px] font-['Source_Sans_3'] font-semibold text-[#1d4b34]">With skill</h3>
                </div>
                <span className="text-[12px] text-[#1d4b34]">Skill-backed content</span>
              </div>
              <p className="text-[13px] text-[#1d4b34] italic">{currentPrompt}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="p-4 bg-[#edf2f0] border border-[#c9dcd3] rounded-lg">
                  <p className="text-[14px] font-['Source_Sans_3'] leading-relaxed text-gray-700">
                    <span className="font-semibold">IP Indemnification Clause for Software Licensing Agreement</span>
                    <br /><br />
                    <span className="font-semibold">Vendor IP Indemnity:</span> Vendor shall indemnify and defend Customer against all third-party claims alleging that Customer's use of the Software, when used in accordance with the Agreement, infringes any valid patent, copyright, or trade secret of such third party.
                    <br /><br />
                    <span className="font-semibold">Exclusions:</span> Vendor's indemnification obligations shall not apply to claims arising from: (i) Customer's modification of the Software; (ii) use in combination with third-party products, services, or data not provided by Vendor; or (iii) use outside the scope permitted under this Agreement.
                    <br /><br />
                    <span className="font-semibold">Customer Indemnity:</span> Customer shall indemnify Vendor for claims arising from Customer Data, Customer's breach of the Agreement, or Customer's violation of applicable law.
                    <br /><br />
                    <span className="font-semibold">Procedures:</span> The indemnified party must provide prompt written notice of claims, cooperate with defense, and allow indemnifying party sole control of defense and settlement (provided that no admission of liability is made on behalf of indemnified party).
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-[12px] text-[#1d4b34] font-medium">Level 2</span>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <ThumbsUp className="size-4 text-gray-400 hover:text-[#1d4b34]" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <ThumbsDown className="size-4 text-gray-400 hover:text-[#DE6633]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {showComparison ? renderComparisonView() : renderInitialView()}
    </div>
  );
}