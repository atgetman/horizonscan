import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface TopFinding {
  regulation: string;
  impact: 'Critical' | 'High';
  deadline: string;
}

interface RegulatoryScanSummaryProps {
  totalFindings: number;
  highestImpact: string;
  topFindings: TopFinding[];
  documentsAffected: number;
  onViewAffectedClauses?: () => void;
}

const impactColors = {
  Critical: {
    bgColor: 'bg-[#FFEDED]',
    textColor: 'text-[#DC0A0A]'
  },
  High: {
    bgColor: 'bg-[#FFF8E5]',
    textColor: 'text-[#AB3300]'
  }
};

export function RegulatoryScanSummary({
  totalFindings,
  highestImpact,
  topFindings,
  documentsAffected,
  onViewAffectedClauses
}: RegulatoryScanSummaryProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['what-found']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="my-4">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-[20px] font-['Clario'] font-medium text-[#212223]">
          Summary
        </h3>
      </div>

      <div className="space-y-0">
        {/* Section 1: What was found */}
        <div className="border-b border-[#E5E5E5]">
          <button
            onClick={() => toggleSection('what-found')}
            className="w-full py-1 flex items-center justify-between transition-colors"
          >
            <span className="text-[15px] font-['Clario'] font-medium text-[#212223]">
              What was found
            </span>
            {expandedSections.has('what-found') ? (
              <ChevronUp className="size-4 text-[#666]" />
            ) : (
              <ChevronDown className="size-4 text-[#666]" />
            )}
          </button>

          {expandedSections.has('what-found') && (
            <div className="mt-2 pb-4">
              <p className="text-[15px] font-['Source_Sans_3'] text-[#212223] leading-[1.5] mb-3">
                Scanned federal and state regulatory sources for changes affecting M&A transactions. Found {totalFindings} regulatory updates with {highestImpact} impact items requiring immediate attention.
              </p>

              {/* Top findings mini table */}
              <div className="relative">
                <div className="overflow-clip">
                  {/* Header Row */}
                  <div className="content-stretch flex items-center w-full">
                    <div className="bg-[#f0f2f1] content-stretch flex items-center min-h-[40px] flex-[1_0_0]">
                      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
                      <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] w-full">
                        <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] text-[#212223]">
                          <p className="leading-[1.2] text-[14px]">Regulation</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f0f2f1] content-stretch flex items-center min-h-[40px] flex-[1_0_0]">
                      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
                      <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] w-full">
                        <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] text-[#212223]">
                          <p className="leading-[1.2] text-[14px]">Impact</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f0f2f1] content-stretch flex items-center min-h-[40px] flex-[1_0_0]">
                      <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid border-t inset-0 pointer-events-none" />
                      <div className="content-stretch flex gap-[16px] items-center min-h-[inherit] px-[12px] py-[4px] w-full">
                        <div className="[word-break:break-word] flex flex-col font-['Source_Sans_3:SemiBold',sans-serif] font-semibold justify-center leading-[0] text-[#212223]">
                          <p className="leading-[1.2] text-[14px]">Deadline</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Rows */}
                  {topFindings.map((finding, idx) => (
                    <div key={idx} className="content-stretch flex items-center w-full h-[40px]">
                      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative">
                          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
                          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] size-full">
                            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px">
                              <p className="[word-break:break-word] flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden text-[#404040] text-[14px] text-ellipsis">
                                {finding.regulation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative">
                          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
                          <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] size-full">
                            <div className={`${impactColors[finding.impact].bgColor} relative rounded-[88px]`}>
                              <div className="content-stretch flex gap-[4px] items-center justify-center min-h-[inherit] overflow-clip px-[8px] py-[2px] relative rounded-[inherit]">
                                <div className="content-stretch flex items-start relative shrink-0">
                                  <div className={`[word-break:break-word] flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 ${impactColors[finding.impact].textColor} text-[12px] whitespace-nowrap`}>
                                    <p className="leading-[1.2]">{finding.impact}</p>
                                  </div>
                                </div>
                              </div>
                              <div aria-hidden="true" className="absolute border border-[rgba(252,252,252,0)] border-solid inset-[-1px] pointer-events-none rounded-[89px] shadow-[0px_0px_0px_1px_white]" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                        <div className="bg-white flex-[1_0_0] h-full min-h-[40px] min-w-px relative">
                          <div aria-hidden="true" className="absolute border-[#ededed] border-b border-solid inset-0 pointer-events-none" />
                          <div className="content-stretch flex items-start min-h-[inherit] px-[12px] py-[8px] size-full">
                            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-w-px">
                              <p className="[word-break:break-word] flex-[1_0_0] font-['Source_Sans_3:Regular',sans-serif] font-normal leading-[1.2] min-w-px overflow-hidden text-[#404040] text-[14px] text-ellipsis">
                                {finding.deadline}
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

        {/* Section 2: Documents affected */}
        <div className="border-b border-[#E5E5E5] pb-2 pt-2">
          <button
            onClick={() => toggleSection('docs-affected')}
            className="w-full py-1 flex items-center justify-between transition-colors"
          >
            <span className="text-[15px] font-['Clario'] font-medium text-[#212223]">
              Documents affected
            </span>
            {expandedSections.has('docs-affected') ? (
              <ChevronUp className="size-4 text-[#666]" />
            ) : (
              <ChevronDown className="size-4 text-[#666]" />
            )}
          </button>

          {expandedSections.has('docs-affected') && (
            <div className="mt-2">
              <p className="text-[15px] font-['Source_Sans_3'] text-[#212223] leading-[1.5] mb-3">
                {documentsAffected} workspace documents contain clauses that may need updates based on these regulatory changes.
              </p>
              {onViewAffectedClauses && (
                <button
                  onClick={onViewAffectedClauses}
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
                  <span>Review Critical items before their compliance deadlines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">•</span>
                  <span>Run Contract Policy Check on affected templates to identify specific clause updates needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1d4b34] shrink-0">•</span>
                  <span>Set up monitoring for M&A regulatory changes to stay updated on new developments</span>
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
                This regulatory scan is generated by AI and should be reviewed by a qualified professional.
                Impact assessments and relevance scores are estimates based on document content analysis.
                Always consult with legal counsel before making compliance decisions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
