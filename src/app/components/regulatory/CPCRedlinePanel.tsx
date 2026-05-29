import { useState } from 'react';
import { X, Check, Undo2, FileText, ChevronDown, ChevronRight, Sparkles, CheckCheck } from 'lucide-react';

interface RedlineSuggestion {
  id: string;
  documentName: string;
  clauseTitle: string;
  issue: string;
  original: string;
  suggested: string;
  explanation: string;
}

interface CPCRedlinePanelProps {
  isOpen: boolean;
  onClose: () => void;
  regulation: string;
  onAcceptAll?: () => void;
}

// Default suggested redlines for the M&A templates affected by the regulation.
const DEFAULT_SUGGESTIONS: RedlineSuggestion[] = [
  {
    id: 'redline-1',
    documentName: 'M&A Purchase Agreement',
    clauseTitle: 'Section 4.12 — Compliance with Laws',
    issue: 'Representation does not reference the new disclosure regime.',
    original:
      'The Company is in compliance in all material respects with all applicable laws and regulations.',
    suggested:
      'The Company is in compliance in all material respects with all applicable laws and regulations, including the SEC Climate Disclosure Rules and any related reporting obligations.',
    explanation:
      'Expands the compliance representation to expressly cover the new regulatory regime so the buyer obtains a specific climate-disclosure rep.',
  },
  {
    id: 'redline-2',
    documentName: 'M&A Purchase Agreement',
    clauseTitle: 'Section 6.3 — Pre-Closing Covenants',
    issue: 'No covenant requiring continued regulatory reporting before closing.',
    original:
      'Between signing and closing, the Company shall conduct its business in the ordinary course consistent with past practice.',
    suggested:
      'Between signing and closing, the Company shall conduct its business in the ordinary course consistent with past practice and shall timely prepare and file all disclosures required under the SEC Climate Disclosure Rules.',
    explanation:
      'Adds an affirmative covenant ensuring the target maintains regulatory reporting through closing, reducing post-closing exposure.',
  },
  {
    id: 'redline-3',
    documentName: 'Disclosure Schedule Template',
    clauseTitle: 'Schedule 4.12(b) — Environmental Disclosures',
    issue: 'Schedule lacks a category for climate-related disclosures.',
    original:
      'List all material environmental permits and pending environmental proceedings.',
    suggested:
      'List all material environmental permits, pending environmental proceedings, and any climate-related disclosures or filings made under the SEC Climate Disclosure Rules.',
    explanation:
      'Adds a dedicated disclosure category so diligence captures climate filings required by the rule.',
  },
  {
    id: 'redline-4',
    documentName: 'Due Diligence Checklist',
    clauseTitle: 'Item 9 — Regulatory Compliance',
    issue: 'Checklist omits climate-disclosure review.',
    original:
      'Confirm the target has filed all required periodic reports with applicable regulators.',
    suggested:
      'Confirm the target has filed all required periodic reports with applicable regulators, including climate-related disclosures mandated by the SEC Climate Disclosure Rules.',
    explanation:
      'Ensures the diligence team verifies compliance with the new disclosure requirements during review.',
  },
];

type Status = 'pending' | 'accepted' | 'rejected';

export function CPCRedlinePanel({ isOpen, onClose, regulation, onAcceptAll }: CPCRedlinePanelProps) {
  const suggestions = DEFAULT_SUGGESTIONS;
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(suggestions.map((s) => s.id)));

  if (!isOpen) return null;

  const setStatus = (id: string, status: Status) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const acceptAll = () => {
    const all: Record<string, Status> = {};
    suggestions.forEach((s) => (all[s.id] = 'accepted'));
    setStatuses(all);
    onAcceptAll?.();
  };

  const pendingCount = suggestions.filter((s) => (statuses[s.id] ?? 'pending') === 'pending').length;

  return (
    <div className="w-[600px] shrink-0 border-l border-[#E5E5E5] bg-white flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 border-b border-[#E5E5E5] px-6 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <h2 className="text-[18px] font-['Clario'] font-medium text-[#212223] leading-tight">
              Suggested redlines
            </h2>
            <p className="text-[13px] font-['Source_Sans_3'] text-[#666] truncate">
              {regulation}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-8 rounded-lg hover:bg-[#F0F2F1] text-[#666] hover:text-[#212223] transition-colors shrink-0"
            aria-label="Close redline panel"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Accept all action */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-[13px] font-['Source_Sans_3'] text-[#666]">
            {pendingCount} {pendingCount === 1 ? 'suggestion' : 'suggestions'} pending review
          </span>
          <button
            onClick={acceptAll}
            disabled={pendingCount === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00563B] hover:bg-[#004530] disabled:opacity-40 disabled:hover:bg-[#00563B] text-white text-[13px] font-['Clario'] font-medium rounded-md transition-colors"
          >
            <CheckCheck className="size-3.5" />
            Accept all
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
        {suggestions.map((s) => {
          const status = statuses[s.id] ?? 'pending';
          const isExpanded = expanded.has(s.id);
          return (
            <div
              key={s.id}
              className="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white"
            >
              {/* Clause header */}
              <button
                onClick={() => toggle(s.id)}
                className="w-full px-4 py-3 hover:bg-[#F9FAFB] transition-colors text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    {isExpanded ? (
                      <ChevronDown className="size-4 text-[#666]" strokeWidth={2} />
                    ) : (
                      <ChevronRight className="size-4 text-[#666]" strokeWidth={2} />
                    )}
                  </div>
                  <FileText className="size-4 text-[#666] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-['Clario'] font-semibold text-[#212223]">
                        {s.clauseTitle}
                      </h3>
                      {status === 'accepted' && (
                        <span className="text-[11px] font-['Source_Sans_3'] font-semibold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                          Accepted
                        </span>
                      )}
                      {status === 'rejected' && (
                        <span className="text-[11px] font-['Source_Sans_3'] font-semibold text-[#991B1B] bg-[#FEE2E2] px-2 py-0.5 rounded-full">
                          Rejected
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] font-['Source_Sans_3'] text-[#666] mt-0.5">
                      {s.documentName} — {s.issue}
                    </p>
                  </div>
                </div>
              </button>

              {/* Redline body */}
              {isExpanded && (
                <div className="px-4 pb-4 pl-11 border-t border-[#E5E5E5] pt-3">
                  {/* Inline redline */}
                  <div className="text-[14px] font-['Source_Sans_3'] leading-relaxed text-[#212223] border border-[#E5E5E5] rounded-lg p-3 bg-[#FAFBFC]">
                    <span className="line-through text-[#991B1B] bg-[#FEE2E2] px-0.5">
                      {s.original}
                    </span>{' '}
                    <span className="underline text-[#166534] bg-[#DCFCE7] px-0.5">
                      {s.suggested}
                    </span>
                  </div>

                  {/* Explanation (CoCounsel comment) */}
                  <div className="flex items-start gap-2 mt-3">
                    <div className="flex items-center justify-center size-6 rounded-full bg-white border border-[#E5E5E5] shrink-0 mt-0.5">
                      <Sparkles className="size-3.5 text-[#DE6633] fill-[#DE6633]" />
                    </div>
                    <p className="text-[13px] font-['Source_Sans_3'] text-[#666] leading-relaxed">
                      {s.explanation}
                    </p>
                  </div>

                  {/* Per-clause actions */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setStatus(s.id, 'accepted')}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#00563B] hover:bg-[#004530] text-white text-[13px] font-['Clario'] font-medium rounded-md transition-colors"
                    >
                      <Check className="size-3.5" />
                      Accept
                    </button>
                    <button
                      onClick={() => setStatus(s.id, 'rejected')}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F9FAFB] text-[#212223] text-[13px] font-['Clario'] font-medium rounded-md border border-[#D2D2D2] transition-colors"
                    >
                      <Undo2 className="size-3.5" />
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Caveat */}
        <p className="text-[12px] font-['Source_Sans_3'] text-[#999] italic leading-relaxed mt-2">
          Suggested redlines are AI-generated recommendations based on regulatory language comparison.
          Always consult with legal counsel before accepting changes to contract templates.
        </p>
      </div>
    </div>
  );
}
