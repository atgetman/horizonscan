import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

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
                Analyzed all M&A transaction documents in the Project Harbor workspace for compliance with {regulation}.
              </p>

              {/* Table - matching RegulatoryScanSummary */}
              <div className="relative">
                <div className="overflow-clip">
                  {/* Header Row */}
                  <div className="content-stretch flex items-center w-full">
                    <div className="bg-[#f0f2f1] content-stretch flex items-center min-h-[40px] flex-[2_0_0]">
                      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
                      <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] w-full">
                        <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3'] font-semibold justify-center leading-[0] text-[#212223]">
                          <p className="leading-[1.2] text-[14px]">Document Category</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f0f2f1] content-stretch flex items-center min-h-[40px] flex-[1_0_0]">
                      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
                      <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] w-full">
                        <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3'] font-semibold justify-center leading-[0] text-[#212223]">
                          <p className="leading-[1.2] text-[14px]">Documents</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f0f2f1] content-stretch flex items-center min-h-[40px] flex-[1_0_0]">
                      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
                      <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] w-full">
                        <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3'] font-semibold justify-center leading-[0] text-[#212223]">
                          <p className="leading-[1.2] text-[14px]">Affected Clauses</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Rows */}
                  {documentCategories.map((category, idx) => (
                    <div key={idx} className="content-stretch flex items-center w-full h-[40px]">
                      <div className="flex flex-[2_0_0] flex-row items-center self-stretch">
                        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative">
                          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
                          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] size-full">
                            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px">
                              <p className="[word-break:break-word] flex-[1_0_0] font-['Source_Sans_3'] font-normal leading-[1.2] min-w-px overflow-hidden text-[#404040] text-[14px] text-ellipsis">
                                {category.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative">
                          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
                          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] size-full">
                            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px">
                              <p className="[word-break:break-word] flex-[1_0_0] font-['Source_Sans_3'] font-normal leading-[1.2] min-w-px overflow-hidden text-[#404040] text-[14px] text-ellipsis">
                                {category.documentCount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative">
                          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
                          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] size-full">
                            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px">
                              <p className="[word-break:break-word] flex-[1_0_0] font-['Source_Sans_3'] font-normal leading-[1.2] min-w-px overflow-hidden text-[#404040] text-[14px] text-ellipsis">
                                {category.clauseCount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 pointer-events-none" />
              </div>
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
                {docsAffected} documents contain {clausesAffected} clauses that may need updates based on the new regulatory requirements.
              </p>
              {onReviewRedlines && (
                <button
                  onClick={onReviewRedlines}
                  className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all"
                >
                  View affected clauses
                  <ExternalLink className="size-3.5" />
                </button>
              )}
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
              <ul className="space-y-2 text-[15px] font-['Source_Sans_3'] text-[#212223] leading-[1.5]">
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">•</span>
                  <span>Review the suggested redlines for each affected document</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">•</span>
                  <span>Consult with deal team leads on high-impact clause changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">•</span>
                  <span>Accept approved redlines to update templates</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Section 4: Caveats (collapsed by default) */}
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
    </div>
  );
}
