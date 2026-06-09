import { ChevronDown, ChevronUp, FileText, CheckCircle2, AlertTriangle, Radar } from 'lucide-react';
import { useState } from 'react';

interface CPCHandoffScreenProps {
  regulation: string;
  docsAffected: number;
  clausesAffected: number;
  impactLevel: string;
  onOpenRegulation?: () => void;
}

export function CPCHandoffScreen({ regulation, docsAffected, clausesAffected, impactLevel, onOpenRegulation }: CPCHandoffScreenProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('what-checked');
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);
  const [redlinesAccepted, setRedlinesAccepted] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Carrying-forward context pill — confirms regulatory context auto-carried into CPC */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF8E5] border border-[#F5D6A3] rounded-lg w-fit">
        <Radar className="size-3.5 text-[#AB3300] shrink-0" strokeWidth={2} />
        <span className="text-[13px] font-['Source_Sans_3'] text-[#7A4A00]">
          {'Carrying forward: '}
          <span className="font-semibold">{regulation}</span>
          {' · '}
          <span className="font-semibold">{impactLevel} impact</span>
          {' · '}
          <span className="font-semibold">{`${docsAffected} documents`}</span>
        </span>
      </div>

      {/* System Action Line */}
      <div className="flex items-center gap-2 text-[13px] text-[#666]">
        <div className="w-1 h-1 rounded-full bg-[#1d4b34]" />
        <span>Cross-Product Clause analysis initiated from regulatory scan</span>
      </div>

      {/* Context Pill */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-[#666]">Regulation:</span>
        <button
          onClick={onOpenRegulation}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EDF2F0] border border-[#8a8a8a] rounded-full hover:bg-[#dde9e4] transition-colors"
        >
          <FileText className="size-3.5 text-[#1d4b34]" />
          <span className="text-[13px] font-['Source_Sans_3'] font-medium text-[#212223]">{regulation}</span>
        </button>
      </div>

      {/* Agentic Task Card */}
      <div className="bg-white border border-[#E5E5E5] rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#EDF2F0] flex items-center justify-center shrink-0">
            <CheckCircle2 className="size-4 text-[#1d4b34]" />
          </div>
          <div className="flex-1">
            <h3 className="font-['Clario'] font-semibold text-[15px] text-[#212223] mb-1">
              Cross-Product Clause Analysis
            </h3>
            <p className="font-['Source_Sans_3'] text-[13px] text-[#666] leading-[1.5]">
              Analyzing {docsAffected} documents and {clausesAffected} clauses for compliance with new regulation
            </p>
          </div>
        </div>

        {/* CPC Steps */}
        <div className="space-y-2 ml-11">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#1d4b34] flex items-center justify-center shrink-0">
              <CheckCircle2 className="size-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-[13px] font-['Source_Sans_3'] text-[#212223]">Identified affected documents and clauses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#1d4b34] flex items-center justify-center shrink-0">
              <CheckCircle2 className="size-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-[13px] font-['Source_Sans_3'] text-[#212223]">Generated compliance redlines</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#1d4b34] flex items-center justify-center shrink-0">
              <CheckCircle2 className="size-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-[13px] font-['Source_Sans_3'] text-[#212223]">Verified consistency across document set</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#1d4b34] flex items-center justify-center shrink-0">
              <CheckCircle2 className="size-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-[13px] font-['Source_Sans_3'] text-[#212223]">Prepared summary report</span>
          </div>
        </div>
      </div>

      {/* Summary Output - Expandable Sections */}
      <div className="border border-[#E5E5E5] rounded-lg overflow-hidden">
        {/* What was checked */}
        <div className="border-b border-[#E5E5E5]">
          <button
            onClick={() => toggleSection('what-checked')}
            className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-[#F9FAFB] transition-colors"
          >
            <span className="font-['Clario'] font-semibold text-[14px] text-[#212223]">What was checked</span>
            {expandedSection === 'what-checked' ? (
              <ChevronUp className="size-4 text-[#666]" />
            ) : (
              <ChevronDown className="size-4 text-[#666]" />
            )}
          </button>
          {expandedSection === 'what-checked' && (
            <div className="px-4 pb-4 bg-white">
              <p className="font-['Source_Sans_3'] text-[13px] text-[#666] leading-[1.5] mb-3">
                Analyzed all M&A transaction documents in the Project Atlas workspace for compliance with {regulation}.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#666] shrink-0 mt-2" />
                  <span className="font-['Source_Sans_3'] text-[13px] text-[#212223]">
                    <strong>Purchase agreements:</strong> 8 documents, 23 affected clauses
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#666] shrink-0 mt-2" />
                  <span className="font-['Source_Sans_3'] text-[13px] text-[#212223]">
                    <strong>Disclosure schedules:</strong> 6 documents, 12 affected clauses
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#666] shrink-0 mt-2" />
                  <span className="font-['Source_Sans_3'] text-[13px] text-[#212223]">
                    <strong>Ancillary agreements:</strong> 5 documents, 8 affected clauses
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#666] shrink-0 mt-2" />
                  <span className="font-['Source_Sans_3'] text-[13px] text-[#212223]">
                    <strong>Closing documents:</strong> 4 documents, 4 affected clauses
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Documents requiring updates */}
        <div className="border-b border-[#E5E5E5]">
          <button
            onClick={() => toggleSection('docs-requiring-updates')}
            className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-[#F9FAFB] transition-colors"
          >
            <span className="font-['Clario'] font-semibold text-[14px] text-[#212223]">Documents requiring updates</span>
            {expandedSection === 'docs-requiring-updates' ? (
              <ChevronUp className="size-4 text-[#666]" />
            ) : (
              <ChevronDown className="size-4 text-[#666]" />
            )}
          </button>
          {expandedSection === 'docs-requiring-updates' && (
            <div className="px-4 pb-4 bg-white">
              <p className="font-['Source_Sans_3'] text-[13px] text-[#666] leading-[1.5] mb-3">
                {docsAffected} documents need revisions to comply with the new regulation. Priority updates flagged below:
              </p>
              <div className="space-y-3">
                <div className="bg-[#FFF9F0] border border-[#F5D6A3] rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="size-4 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-['Source_Sans_3'] font-medium text-[13px] text-[#212223]">
                        Stock Purchase Agreement - Acme Corp.docx
                      </p>
                      <p className="font-['Source_Sans_3'] text-[12px] text-[#666]">
                        7 clauses require updates • High priority
                      </p>
                    </div>
                  </div>
                  <p className="font-['Source_Sans_3'] text-[12px] text-[#666] ml-6">
                    Sections 4.2, 5.1, 6.3, 8.1, 9.2, 11.4, 12.1 need compliance updates
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="size-4 text-[#666] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-['Source_Sans_3'] font-medium text-[13px] text-[#212223]">
                        Disclosure Schedule 4.18 - Material Contracts.docx
                      </p>
                      <p className="font-['Source_Sans_3'] text-[12px] text-[#666]">
                        4 clauses require updates • Medium priority
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <FileText className="size-4 text-[#666] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-['Source_Sans_3'] font-medium text-[13px] text-[#212223]">
                        Transition Services Agreement.docx
                      </p>
                      <p className="font-['Source_Sans_3'] text-[12px] text-[#666]">
                        3 clauses require updates • Medium priority
                      </p>
                    </div>
                  </div>
                </div>

                <p className="font-['Source_Sans_3'] text-[12px] text-[#666] italic">
                  + {docsAffected - 3} more documents
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Recommended next steps */}
        <div>
          <button
            onClick={() => toggleSection('next-steps')}
            className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-[#F9FAFB] transition-colors"
          >
            <span className="font-['Clario'] font-semibold text-[14px] text-[#212223]">Recommended next steps</span>
            {expandedSection === 'next-steps' ? (
              <ChevronUp className="size-4 text-[#666]" />
            ) : (
              <ChevronDown className="size-4 text-[#666]" />
            )}
          </button>
          {expandedSection === 'next-steps' && (
            <div className="px-4 pb-4 bg-white">
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDF2F0] flex items-center justify-center shrink-0 font-['Source_Sans_3'] font-semibold text-[12px] text-[#1d4b34]">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-['Source_Sans_3'] font-medium text-[13px] text-[#212223] mb-1">
                      Review generated redlines
                    </p>
                    <p className="font-['Source_Sans_3'] text-[12px] text-[#666]">
                      Examine suggested changes across all {docsAffected} documents to ensure accuracy and completeness
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDF2F0] flex items-center justify-center shrink-0 font-['Source_Sans_3'] font-semibold text-[12px] text-[#1d4b34]">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-['Source_Sans_3'] font-medium text-[13px] text-[#212223] mb-1">
                      Coordinate with counterparty
                    </p>
                    <p className="font-['Source_Sans_3'] text-[12px] text-[#666]">
                      Share compliance updates with Acme Corp legal team for alignment on required changes
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDF2F0] flex items-center justify-center shrink-0 font-['Source_Sans_3'] font-semibold text-[12px] text-[#1d4b34]">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-['Source_Sans_3'] font-medium text-[13px] text-[#212223] mb-1">
                      Execute amendments
                    </p>
                    <p className="font-['Source_Sans_3'] text-[12px] text-[#666]">
                      Finalize and execute amendment documents before the compliance deadline
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col gap-3 pt-2">
        {!showAcceptConfirm ? (
          <div className="flex items-center gap-3">
            <button className="h-[32px] px-[12px] py-[6px] flex items-center justify-center text-[14px] font-['Clario'] font-medium text-white bg-[#1d4b34] rounded-[4px] hover:bg-[#153a28] transition-colors">
              Review redlines
            </button>
            {redlinesAccepted ? (
              <span className="h-[32px] px-[12px] py-[6px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34]">
                <CheckCircle2 className="size-4" strokeWidth={2} />
                {`All ${clausesAffected} redlines accepted`}
              </span>
            ) : (
              <button
                onClick={() => setShowAcceptConfirm(true)}
                className="h-[32px] px-[12px] py-[6px] flex items-center justify-center text-[14px] font-['Clario'] font-medium text-[#1d4b34] bg-white border border-[#8a8a8a] rounded-[4px] hover:bg-[#F5F5F5] transition-colors"
              >
                Accept all redlines
              </button>
            )}
          </div>
        ) : (
          /* Inline confirmation for high-consequence bulk action */
          <div className="bg-[#FFF8E5] border border-[#F5D6A3] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 text-[#AB3300] shrink-0 mt-0.5" strokeWidth={2} />
              <div className="flex-1">
                <p className="font-['Clario'] font-semibold text-[14px] text-[#212223] mb-1">
                  {`Accept all ${clausesAffected} redlines across ${docsAffected} documents?`}
                </p>
                <p className="font-['Source_Sans_3'] text-[13px] text-[#666] leading-[1.5] mb-3">
                  This bulk action applies every suggested change at once and cannot be undone in a single step. Review individual redlines first if you need to make exceptions.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setRedlinesAccepted(true);
                      setShowAcceptConfirm(false);
                    }}
                    className="h-[32px] px-[12px] py-[6px] flex items-center justify-center text-[14px] font-['Clario'] font-medium text-white bg-[#1d4b34] rounded-[4px] hover:bg-[#153a28] transition-colors"
                  >
                    Yes, accept all
                  </button>
                  <button
                    onClick={() => setShowAcceptConfirm(false)}
                    className="h-[32px] px-[12px] py-[6px] flex items-center justify-center text-[14px] font-['Clario'] font-medium text-[#212223] bg-white border border-[#8a8a8a] rounded-[4px] hover:bg-[#F5F5F5] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
