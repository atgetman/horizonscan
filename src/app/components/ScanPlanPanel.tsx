import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface PlanDocument {
  title: string;
  date?: string;
}

interface ScanPlanPanelProps {
  /** Priority jurisdictions chosen in the previous step. */
  priorityStates: string[];
  /** Documents found in the workspace (editable). */
  defaultDocuments?: PlanDocument[];
  onProceed: (documents: PlanDocument[]) => void;
  onAdjust: () => void;
}

const DEFAULT_DOCUMENTS: PlanDocument[] = [
  { title: 'Credit Decisioning Policy', date: 'March 2026' },
  { title: 'Consumer Disclosure Templates', date: 'January 2026' },
  { title: 'Internal AI Use Guidelines', date: 'April 2026' },
];

// Render the priority jurisdictions as a readable, comma + "and" joined list
// with each state bolded, e.g. "California and New York" or "A, B, and C".
function PriorityList({ states }: { states: string[] }) {
  const list = states.length > 0 ? states : ['California', 'New York'];
  return (
    <>
      {list.map((state, i) => (
        <span key={state}>
          <span className="font-semibold">{state}</span>
          {i < list.length - 2 ? ', ' : i === list.length - 2 ? (list.length > 2 ? ', and ' : ' and ') : ''}
        </span>
      ))}
    </>
  );
}

function PlanSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[4px] w-full">
      <h4 className="font-['Source_Sans_3:SemiBold',sans-serif] font-semibold text-[#212223] text-[15px] leading-[1.4]">
        {label}
      </h4>
      <div className="font-['Source_Sans_3:Regular',sans-serif] text-[#4a4a4a] text-[15px] leading-[1.5]">
        {children}
      </div>
    </div>
  );
}

export function ScanPlanPanel({
  priorityStates,
  defaultDocuments = DEFAULT_DOCUMENTS,
  onProceed,
  onAdjust,
}: ScanPlanPanelProps) {
  const [documents, setDocuments] = useState<PlanDocument[]>(defaultDocuments);
  const [draft, setDraft] = useState('');

  const handleAdd = () => {
    const value = draft.trim();
    if (!value) return;
    const exists = documents.some((d) => d.title.toLowerCase() === value.toLowerCase());
    if (!exists) {
      setDocuments((prev) => [...prev, { title: value }]);
    }
    setDraft('');
  };

  const handleAddKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="content-stretch flex flex-col isolate items-start relative shadow-[0px_8px_32px_0px_rgba(214,64,0,0.1),0px_8px_16px_0px_rgba(0,0,0,0.05)] w-full max-w-[800px] mx-auto">
      {/* Header / Plan body */}
      <div className="bg-white content-stretch flex flex-col items-start relative w-full rounded-tl-[16px] rounded-tr-[16px]">
        <div className="content-stretch flex flex-col gap-[20px] items-start px-[24px] pt-[20px] pb-[16px] relative w-full">
          {/* Title */}
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
              <p>Here&apos;s what I&apos;ll scan for:</p>
            </div>
          </div>

          {/* Sections */}
          <PlanSection label="Topic">
            US AI regulation governing automated decision-making, workplace AI use, and
            consumer-facing applications, with a focus on consumer lending and credit
            decisioning.
          </PlanSection>

          <PlanSection label="Jurisdictions">
            Federal + all 50 states, with priority on <PriorityList states={priorityStates} />.
          </PlanSection>

          <PlanSection label="Time horizon">
            In effect now and within 12 months. Significant pending legislation beyond that
            will be flagged separately.
          </PlanSection>

          <PlanSection label="Sources">
            Westlaw, Practical Law, International Research, and web sources.
          </PlanSection>

          <PlanSection label="Documents">
            Found in your AI Governance workspace — I&apos;ll flag clauses that may need review.
            <div className="flex flex-col gap-[2px] pt-[6px]">
              {documents.map((doc) => (
                <div key={doc.title} className="text-[15px] leading-[1.5]">
                  <span className="font-semibold text-[#212223]">{doc.title}</span>
                  {doc.date && <span className="text-[#8a8a8a]"> · {doc.date}</span>}
                </div>
              ))}
            </div>
          </PlanSection>

          {/* Add another document */}
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleAddKeyDown}
              placeholder="Add another document..."
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
        <div className="content-stretch flex items-center gap-[8px] justify-between pb-[16px] pt-[12px] px-[24px] relative w-full">
          <button
            type="button"
            onClick={onAdjust}
            className="bg-white content-stretch flex items-center justify-center min-h-[24px] relative rounded-[8px] shrink-0 border border-[#d2d2d2] hover:bg-gray-50 transition-colors"
          >
            <div className="content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
              <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#212223] text-[14px] whitespace-nowrap">
                <p className="leading-[1.2]">Let me adjust something</p>
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => onProceed(documents)}
            className="bg-[#1d4b34] content-stretch flex items-center justify-center min-h-[24px] relative rounded-[8px] shrink-0 border border-[#1d4b34] hover:bg-[#163a28] transition-colors"
          >
            <div className="content-stretch flex gap-[6px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
              <div className="flex flex-col font-['Clario:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#fcfcfc] text-[14px] whitespace-nowrap">
                <p className="leading-[1.2]">Looks good — proceed</p>
              </div>
              <ArrowUpRight className="size-4 text-[#fcfcfc]" strokeWidth={2} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
