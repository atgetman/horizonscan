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
    <div className="w-full max-w-[800px] mx-auto bg-white border border-[#e5e5e5] rounded-[16px] shadow-[0px_8px_32px_0px_rgba(214,64,0,0.1),0px_8px_16px_0px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-4 px-6 pt-5 pb-2">
        {/* Question */}
        <div className="flex gap-2 items-start">
          <div className="flex items-center pt-[5px] shrink-0">
            <div
              className="w-[10px] h-[10px] rotate-45 bg-[#de6633]"
              style={{ boxShadow: '0px 4px 33px rgba(247, 93, 27, 0.4)' }}
            />
          </div>
          <p className="font-['Source_Sans_3:Regular',sans-serif] text-[#212223] text-[16px] leading-[1.5] text-pretty">
            {question}
          </p>
        </div>

        {/* Frequently relevant divider */}
        <div className="flex items-center gap-3 pt-1">
          <div className="flex-1 h-px bg-[#e5e5e5]" />
          <span className="font-['Source_Sans_3:SemiBold',sans-serif] font-semibold text-[#8a8a8a] text-[11px] tracking-[0.08em] uppercase">
            Frequently relevant
          </span>
          <div className="flex-1 h-px bg-[#e5e5e5]" />
        </div>

        {/* State chips */}
        <div className="flex flex-wrap gap-2">
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
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleAddKeyDown}
            placeholder="Add a state..."
            className="flex-1 h-[48px] px-4 rounded-[10px] border border-[#d2d2d2] bg-white text-[16px] text-[#212223] placeholder:text-[#8a8a8a] font-['Source_Sans_3:Regular',sans-serif] focus:outline-none focus:border-[#1d4b34]"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!draft.trim()}
            className="h-[48px] px-5 rounded-[10px] border border-[#d2d2d2] bg-white text-[15px] font-['Source_Sans_3:SemiBold',sans-serif] font-semibold text-[#212223] hover:bg-[#f7f7f7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#e5e5e5]">
        <span className="text-[14px] text-[#8a8a8a] font-['Source_Sans_3:Regular',sans-serif]">
          {count} {count === 1 ? 'state' : 'states'} selected
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSkip}
            className="h-[40px] px-5 rounded-[10px] border border-[#d2d2d2] bg-white text-[15px] font-['Source_Sans_3:SemiBold',sans-serif] font-semibold text-[#212223] hover:bg-[#f7f7f7] transition-colors"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={() => onSubmit(selected)}
            aria-label="Submit selected jurisdictions"
            className="h-[40px] w-[44px] flex items-center justify-center rounded-[10px] border border-[#1d4b34] bg-[#1d4b34] text-white hover:bg-[#163a28] transition-colors"
          >
            <ArrowUpRight className="size-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
