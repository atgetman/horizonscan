import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DocumentCategory {
  name: string;
  documentCount: number;
  clauseCount: number;
}

interface CPCScanSummaryProps {
  regulation: string;
  docsAffected: number;
  clausesAffected: number;
  impactLevel: string;
  onReviewRedlines?: () => void;
  onAcceptAllRedlines?: () => void;
}

export function CPCScanSummary({
  regulation,
  docsAffected,
  clausesAffected,
  impactLevel,
  onReviewRedlines,
  onAcceptAllRedlines
}: CPCScanSummaryProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['what-checked']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const documentCategories: DocumentCategory[] = [
    { name: 'Purchase agreements', documentCount: 8, clauseCount: 23 },
    { name: 'Disclosure schedules', documentCount: 6, clauseCount: 12 },
    { name: 'Ancillary agreements', documentCount: 5, clauseCount: 8 },
    { name: 'Closing documents', documentCount: 4, clauseCount: 4 }
  ];

  return (
    <div className="my-4">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-[20px] font-['Clario'] font-medium text-[#212223]">
          Summary
        </h3>
      </div>

      <div className="space-y-0">
        {/* Section 1: What was checked */}
        <div className="border-b border-[#E5E5E5]">
          <button
            onClick={() => toggleSection('what-checked')}
            className="w-full py-1 flex items-center justify-between transition-colors"
          >
            <span className="text-[15px] font-['Clario'] font-medium text-[#212223]">
              What was checked
            </span>
            {expandedSections.has('what-checked') ? (
              <ChevronUp className="size-4 text-[#666]" />
            ) : (
              <ChevronDown className="size-4 text-[#666]" />
            )}
          </button>

          {expandedSections.has('what-checked') && (
            <div className="mt-2 pb-4">
              <p className="text-[15px] font-['Source_Sans_3'] text-[#212223] leading-[1.5] mb-3">
                Analyzed all M&A transaction documents in the Project Atlas workspace for compliance with {regulation}.
              </p>

              {/* Document categories list */}
              <ul className="space-y-1.5 text-[15px] font-['Source_Sans_3'] text-[#212223] leading-[1.5]">
                {documentCategories.map((category, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#1d4b34] shrink-0">•</span>
                    <span>
                      <span className="font-semibold">{category.name}:</span> {category.documentCount} documents, {category.clauseCount} affected clauses
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section 2: Documents requiring updates */}
        <div className="border-b border-[#E5E5E5] pb-2 pt-2">
          <button
            onClick={() => toggleSection('docs-updates')}
            className="w-full py-1 flex items-center justify-between transition-colors"
          >
            <span className="text-[15px] font-['Clario'] font-medium text-[#212223]">
              Documents requiring updates
            </span>
            {expandedSections.has('docs-updates') ? (
              <ChevronUp className="size-4 text-[#666]" />
            ) : (
              <ChevronDown className="size-4 text-[#666]" />
            )}
          </button>

          {expandedSections.has('docs-updates') && (
            <div className="mt-2">
              <p className="text-[15px] font-['Source_Sans_3'] text-[#212223] leading-[1.5] mb-3">
                {docsAffected} documents contain {clausesAffected} clauses that require updates to comply with the new regulatory requirements. Impact level: <span className="font-semibold">{impactLevel}</span>.
              </p>

              <ul className="space-y-1.5 text-[15px] font-['Source_Sans_3'] text-[#212223] leading-[1.5]">
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">•</span>
                  <span><span className="font-semibold">M&A Purchase Agreement Template</span> - 8 clauses requiring disclosure updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">•</span>
                  <span><span className="font-semibold">Due Diligence Checklist</span> - 3 sections requiring regulatory compliance additions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">•</span>
                  <span><span className="font-semibold">Disclosure Schedule Template</span> - 1 new schedule item required</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Section 3: Recommended next steps */}
        <div className="border-b border-[#E5E5E5] pb-2 pt-2">
          <button
            onClick={() => toggleSection('next-steps')}
            className="w-full py-1 flex items-center justify-between transition-colors"
          >
            <span className="text-[15px] font-['Clario'] font-medium text-[#212223]">
              Recommended next steps
            </span>
            {expandedSections.has('next-steps') ? (
              <ChevronUp className="size-4 text-[#666]" />
            ) : (
              <ChevronDown className="size-4 text-[#666]" />
            )}
          </button>

          {expandedSections.has('next-steps') && (
            <div className="mt-2">
              <ul className="space-y-1.5 text-[15px] font-['Source_Sans_3'] text-[#212223] leading-[1.5]">
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">1.</span>
                  <span>Review the suggested redlines for each affected document</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">2.</span>
                  <span>Consult with deal team leads on high-impact clause changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">3.</span>
                  <span>Accept approved redlines to update templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">4.</span>
                  <span>Run compliance check on updated documents to verify changes</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Section 4: Caveats */}
        <div className="border-b border-[#E5E5E5] pb-2 pt-2">
          <button
            onClick={() => toggleSection('caveats')}
            className="w-full py-1 flex items-center justify-between transition-colors"
          >
            <span className="text-[15px] font-['Clario'] font-medium text-[#212223]">
              Caveats
            </span>
            {expandedSections.has('caveats') ? (
              <ChevronUp className="size-4 text-[#666]" />
            ) : (
              <ChevronDown className="size-4 text-[#666]" />
            )}
          </button>

          {expandedSections.has('caveats') && (
            <div className="mt-2">
              <p className="text-[13px] font-['Source_Sans_3'] text-[#666] leading-[1.5] italic">
                This clause analysis is generated by AI and should be reviewed by a qualified legal professional.
                Suggested redlines are recommendations based on regulatory language comparison.
                Always consult with legal counsel before accepting changes to contract templates.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onReviewRedlines}
          className="h-[40px] px-[16px] flex items-center justify-center text-[15px] font-['Clario'] font-medium text-white bg-[#1d4b34] rounded-[4px] hover:bg-[#153a28] transition-colors"
        >
          Review redlines
        </button>
        <button
          onClick={onAcceptAllRedlines}
          className="h-[40px] px-[16px] flex items-center justify-center text-[15px] font-['Clario'] font-medium text-[#1d4b34] bg-white border border-[#1d4b34] rounded-[4px] hover:bg-[#edf2f0] transition-colors"
        >
          Accept all redlines
        </button>
      </div>
    </div>
  );
}
