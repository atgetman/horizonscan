import { useState } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';

interface JurisdictionClarifyingPanelProps {
  question: string;
  /** States shown under the "Frequently relevant" header. */
  suggestedStates?: string[];
  /** States that should be pre-selected when the panel opens. */
  defaultSelected?: string[];
  onSubmit: (selectedStates: string[]) => void;
  onSkip: () => void;
}

const DEFAULT_SUGGESTED = [
  'California',
  'New York',
  'Texas',
  'Illinois',
  'Colorado',
  'Washington',
  'Florida',
  'Massachusetts',
  'Virginia',
];

export function JurisdictionClarifyingPanel({
  question,
  suggestedStates = DEFAULT_SUGGESTED,
  defaultSelected = ['New York'],
  onSubmit,
  onSkip,
}: JurisdictionClarifyingPanelProps) {
  // Custom states the user typed in are appended to the suggested list.
  const [customStates, setCustomStates] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const [draft, setDraft] = useState('');

  const allStates = [...suggestedStates, ...customStates];

  const toggleState = (state: string) => {
    setSelected((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
  };

  const handleAdd = () => {
    const value = draft.trim();
    if (!value) return;
    // Avoid duplicates (case-insensitive) against everything already shown.
    const exists = allStates.some((s) => s.toLowerCase() === value.toLowerCase());
    if (!exists) {
      setCustomStates((prev) => [...prev, value]);
    }
    setSelected((prev) =>
      prev.some((s) => s.toLowerCase() === value.toLowerCase()) ? prev : [...prev, value]
    );
    setDraft('');
  };

  const handleAddKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault();
      handleAdd();
    }
  };

  const count = selected.length;

  return (
    <div className="content-stretch flex flex-col isolate items-start relative shadow-[0px_8px_32px_0px_rgba(214,64,0,0.1),0px_8px_16px_0px_rgba(0,0,0,0.05)] w-full max-w-[800px] mx-auto">
      {/* Header */}
      <div className="bg-white content-stretch flex flex-col items-start relative w-full rounded-tl-[16px] rounded-tr-[16px]">
        <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] pt-[20px] pb-[12px] relative w-full">
          {/* Question / title */}
          <div className="content-stretch flex gap-[8px] items-start relative w-full">
            <div className="content-stretch flex items-center pt-[4px] relative shrink-0">
              <div className="w-[20px] h-[20px] flex items-center justify-center">
                <div
                  className="w-[10px] h-[10px] rotate-45 bg-[#de6633]"
                  style={{ boxShadow: '0px 4px 33px rgba(247, 93, 27, 0.4)' }}
                />
              </div>
            </div>
            <div className="flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[1.5] relative text-[16px] text-[#212223] text-pretty">
              <p>{question}</p>
            </div>
          </div>

          {/* Frequently relevant divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-[#e5e5e5]" />
            <span className="font-['Source_Sans_3:SemiBold',sans-serif] font-semibold text-[#8a8a8a] text-[11px] tracking-[0.08em] uppercase">
              Frequently relevant
            </span>
            <div className="flex-1 h-px bg-[#e5e5e5]" />
          </div>

          {/* State chips */}
          <div className="flex flex-wrap gap-2 w-full">
            {allStates.map((state) => {
              const isSelected = selected.includes(state);
              return (
                <button
                  key={state}
                  type="button"
                  onClick={() => toggleState(state)}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-[14px] font-['Source_Sans_3'] font-normal ${
                    isSelected
                      ? 'bg-[#1d4b34] text-white border-[#1d4b34]'
                      : 'bg-white text-[#212223] border-[#d2d2d2] hover:border-[#999] hover:shadow-sm'
                  }`}
                >
                  {isSelected && <Check className="size-3.5 shrink-0 text-white" strokeWidth={2.5} />}
                  <span>{state}</span>
                </button>
              );
            })}
          </div>

          {/* Add a state */}
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleAddKeyDown}
              placeholder="Add a state..."
              className="flex-1 h-[40px] px-[12px] py-[8px] rounded-lg border border-[#d2d2d2] bg-white text-[15px] text-[#212223] placeholder:text-[#666] font-['Source_Sans_3:Regular',sans-serif] focus:outline-none focus:border-[#1d4b34]"
            />
            <button
              type="button"
              onClick={handleAdd}
              disabled={!draft.trim()}
              className="bg-white content-stretch flex items-center justify-center h-[40px] px-[12px] rounded-[8px] shrink-0 border border-[#d2d2d2] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span className="font-['Clario:Medium',sans-serif] text-[14px] text-[#212223] leading-[1.2]">Add</span>
            </button>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-[-1px_-1px_0_-1px] pointer-events-none rounded-tl-[17px] rounded-tr-[17px]" />
      </div>

      {/* Footer Buttons */}
      <div className="bg-white relative rounded-bl-[16px] rounded-br-[16px] w-full">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-l border-r border-solid inset-[0_-1px_-1px_-1px] pointer-events-none rounded-bl-[17px] rounded-br-[17px]" />
        <div className="content-stretch flex items-center pb-[16px] pt-[12px] px-[24px] relative w-full">
          <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[1.5] relative shrink-0 text-[#8a8a8a] text-[14px] whitespace-nowrap">
            <p>{count} {count === 1 ? 'state' : 'states'} selected</p>
          </div>
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-w-px relative">
            <button
              type="button"
              onClick={onSkip}
              className="bg-white content-stretch flex items-start justify-center min-h-[24px] relative rounded-[8px] shrink-0 border border-[#d2d2d2]"
            >
              <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
                <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
                  <p className="leading-[1.2]">Skip</p>
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => onSubmit(selected)}
              aria-label="Submit selected jurisdictions"
              className="bg-[#1d4b34] content-stretch flex items-center justify-center min-h-[24px] relative rounded-[8px] shrink-0 border border-[#1d4b34]"
            >
              <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
                <ArrowUpRight className="size-4 text-[#fcfcfc]" strokeWidth={2} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
