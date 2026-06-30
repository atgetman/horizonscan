import { clsx } from "clsx";
import { FileText, ExternalLink, Flag, Sparkles, ChevronRight, Bell, X, Database, Newspaper, Globe } from "lucide-react";
import { useState } from "react";
import { RegulatoryFindingDrawer } from "./RegulatoryFindingDrawer";

const COLUMN_HEADERS = [
  'Source title',
  'Source type', 
  'Source summary', 
  'Impact level',
  'Relevance',
  'Rationale',
  'Compliance date',
  'Actions'
];

interface RegulatoryFinding {
  title: string;
  sourceType: 'TR Product' | 'Reuters News' | 'Web Source';
  summary: string;
  impactLevel: 'High' | 'Medium' | 'Low';
  relevance: string;
  rationale: string;
  complianceDate: string;
  docsAffected: number;
  clausesAffected: number;
}

// M&A regulatory findings data
const MA_REGULATORY_DATA: RegulatoryFinding[] = [
  {
    title: 'DOJ/FTC 2023 Merger Guidelines - Final Version',
    sourceType: 'TR Product',
    summary: 'Updated merger review standards emphasizing market concentration, vertical integration risks, and digital platform acquisitions. Key changes include lower thresholds for competitive concerns and expanded HSR notification requirements.',
    impactLevel: 'High',
    relevance: '95%',
    rationale: 'Directly impacts M&A due diligence timelines and antitrust risk assessment. May require restructuring of pending transactions.',
    complianceDate: '2024-01-15',
    docsAffected: 23,
    clausesAffected: 47
  },
  {
    title: 'SEC Announces Enhanced SPAC Disclosure Requirements',
    sourceType: 'Reuters News',
    summary: 'New rules require detailed projections disclosure, enhanced liability for forward-looking statements, and revised accounting treatment for warrants in SPAC transactions.',
    impactLevel: 'High',
    relevance: '92%',
    rationale: 'Affects all SPAC merger agreements and requires updated disclosure schedules in business combination agreements.',
    complianceDate: '2024-02-01',
    docsAffected: 18,
    clausesAffected: 34
  },
  {
    title: 'CFIUS Expands Critical Technology Review Categories',
    sourceType: 'TR Product',
    summary: 'Committee on Foreign Investment broadens definition of "critical technologies" to include AI/ML systems, quantum computing, and advanced semiconductor manufacturing equipment.',
    impactLevel: 'High',
    relevance: '88%',
    rationale: 'Triggers mandatory CFIUS filing requirements for cross-border M&A in tech sector, extending deal timelines by 45-90 days.',
    complianceDate: '2024-03-01',
    docsAffected: 31,
    clausesAffected: 52
  },
  {
    title: 'FTC Proposes Ban on Non-Compete Clauses in M&A Context',
    sourceType: 'Reuters News',
    summary: 'Proposed rule would invalidate most non-compete agreements, including those negotiated as part of business acquisitions, with limited exceptions for substantial owners.',
    impactLevel: 'Medium',
    relevance: '85%',
    rationale: 'Impacts earnout structures and seller employment agreements. May require alternative restrictive covenant approaches.',
    complianceDate: '2024-04-30',
    docsAffected: 29,
    clausesAffected: 61
  },
  {
    title: 'Delaware Court Issues Ruling on Merger Agreement MAE Clauses',
    sourceType: 'Web Source',
    summary: 'Chancery Court provides detailed guidance on what constitutes a Material Adverse Effect, tightening standards for buyer walk-rights.',
    impactLevel: 'Medium',
    relevance: '83%',
    rationale: 'Affects MAE definition drafting and allocation of risk in acquisition agreements. Precedent limits buyer termination rights.',
    complianceDate: 'N/A',
    docsAffected: 41,
    clausesAffected: 73
  },
  {
    title: 'EU Digital Markets Act - Implementation Guidelines for M&A',
    sourceType: 'TR Product',
    summary: 'European Commission releases guidance on merger notification requirements for digital gatekeepers, including retroactive review provisions.',
    impactLevel: 'Medium',
    relevance: '79%',
    rationale: 'Relevant for cross-border transactions involving EU market presence. May trigger dual filing requirements.',
    complianceDate: '2024-05-15',
    docsAffected: 12,
    clausesAffected: 28
  },
  {
    title: 'IRS Updates Section 368 Reorganization Regulations',
    sourceType: 'TR Product',
    summary: 'Revised tax treatment for certain stock-for-stock mergers and triangular reorganizations, with new continuity of interest requirements.',
    impactLevel: 'Low',
    relevance: '71%',
    rationale: 'Primarily affects tax structuring in reorganizations. Modest impact on standard M&A agreements.',
    complianceDate: '2024-06-01',
    docsAffected: 8,
    clausesAffected: 19
  },
  {
    title: 'SEC Climate Disclosure Rules - Impact on M&A Due Diligence',
    sourceType: 'Reuters News',
    summary: 'Final rules require Scope 1 and 2 emissions disclosure for public companies, affecting target company due diligence obligations.',
    impactLevel: 'Medium',
    relevance: '77%',
    rationale: 'Expands due diligence checklists and rep/warranty packages for acquisitions of public companies.',
    complianceDate: '2024-07-01',
    docsAffected: 15,
    clausesAffected: 22
  },
];

// AI governance / AI legislation findings data (consumer lending & credit decisioning focus)
const AI_GOV_REGULATORY_DATA: RegulatoryFinding[] = [
  {
    title: 'Colorado AI Act (SB 24-205) - Consumer Protections for Artificial Intelligence',
    sourceType: 'TR Product',
    summary: 'First comprehensive US state AI law imposing a duty of reasonable care on developers and deployers of high-risk AI systems to prevent algorithmic discrimination, including consumer lending and credit decisioning. Requires impact assessments, consumer notices, and disclosure of automated decisions.',
    impactLevel: 'High',
    relevance: '96%',
    rationale: 'Directly governs automated credit and lending decisions. Requires impact assessments and consumer disclosures that affect your Credit Decisioning Policy and Consumer Disclosure Templates.',
    complianceDate: '2026-06-30',
    docsAffected: 9,
    clausesAffected: 21
  },
  {
    title: 'EU AI Act - High-Risk Classification for Creditworthiness Scoring',
    sourceType: 'TR Product',
    summary: 'Classifies AI systems used to evaluate creditworthiness or establish credit scores as "high-risk," triggering conformity assessments, risk management, data governance, human oversight, and transparency obligations.',
    impactLevel: 'High',
    relevance: '93%',
    rationale: 'Applies to any consumer-facing credit scoring offered to EU data subjects. Requires documented risk management and human oversight controls in your AI use guidelines.',
    complianceDate: '2026-08-02',
    docsAffected: 7,
    clausesAffected: 18
  },
  {
    title: 'CFPB Guidance on Adverse Action Notices for AI Credit Denials',
    sourceType: 'Reuters News',
    summary: 'CFPB circular confirms ECOA/Reg B require specific, accurate reasons for adverse credit actions even when lenders use complex algorithms or "black-box" AI models. Generic or checklist reasons are insufficient.',
    impactLevel: 'High',
    relevance: '91%',
    rationale: 'Affects adverse action notice workflows and model explainability requirements for AI-driven credit denials. Impacts Consumer Disclosure Templates.',
    complianceDate: 'In effect',
    docsAffected: 6,
    clausesAffected: 14
  },
  {
    title: 'California ADMT Regulations (CPPA) - Automated Decisionmaking Technology',
    sourceType: 'TR Product',
    summary: 'CPPA rulemaking establishes consumer rights to access and opt out of automated decisionmaking technology used for significant decisions, including financial services and lending, with pre-use notice requirements.',
    impactLevel: 'Medium',
    relevance: '87%',
    rationale: 'Introduces opt-out and pre-use notice obligations for ADMT in lending. Requires updates to consumer-facing disclosures and data handling procedures.',
    complianceDate: '2027-01-01',
    docsAffected: 8,
    clausesAffected: 16
  },
  {
    title: 'NYC Local Law 144 - Automated Employment Decision Tools (AEDT)',
    sourceType: 'Web Source',
    summary: 'Requires independent bias audits and candidate notice for automated employment decision tools used in hiring and promotion within New York City.',
    impactLevel: 'Medium',
    relevance: '78%',
    rationale: 'Relevant to workplace AI use governed by your Internal AI Use Guidelines, though not directly tied to consumer lending.',
    complianceDate: 'In effect',
    docsAffected: 3,
    clausesAffected: 7
  },
  {
    title: 'Utah Artificial Intelligence Policy Act (SB 149)',
    sourceType: 'TR Product',
    summary: 'Requires clear disclosure when consumers interact with generative AI in regulated occupations and consumer transactions, with liability for deceptive AI use under existing consumer protection law.',
    impactLevel: 'Medium',
    relevance: '74%',
    rationale: 'Imposes consumer disclosure obligations for AI interactions in consumer-facing products. May require updates to chatbot and disclosure language.',
    complianceDate: 'In effect',
    docsAffected: 4,
    clausesAffected: 9
  },
  {
    title: 'Illinois HB 3773 - AI Use in Employment Decisions',
    sourceType: 'Reuters News',
    summary: 'Amends the Illinois Human Rights Act to prohibit AI that has a discriminatory effect in employment decisions and requires notice when AI is used.',
    impactLevel: 'Low',
    relevance: '69%',
    rationale: 'Primarily workplace-focused; modest impact on internal AI governance policies rather than consumer lending products.',
    complianceDate: '2026-01-01',
    docsAffected: 2,
    clausesAffected: 5
  },
  {
    title: 'Federal — OMB / White House AI Governance Guidance',
    sourceType: 'Web Source',
    summary: 'Federal executive guidance directs agencies on safe, secure, and trustworthy AI, signaling forthcoming expectations for risk management and transparency that may shape financial-services supervision.',
    impactLevel: 'Low',
    relevance: '64%',
    rationale: 'No direct private-sector mandate yet, but flagged for planning as it signals likely federal direction beyond 12 months.',
    complianceDate: 'TBD (Pending)',
    docsAffected: 1,
    clausesAffected: 3
  },
];

export function MARegulatoryTable() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [dismissedBanner, setDismissedBanner] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<RegulatoryFinding | null>(null);

  // Scenario variant — the AI governance scan reuses this tabular view with a
  // different dataset and labels. Read once from sessionStorage (set when the
  // scan artifact is opened) so the standalone route renders the right content.
  const isAiGov =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('regulatoryScanVariant') === 'ai-gov';
  const REGULATORY_DATA = isAiGov ? AI_GOV_REGULATORY_DATA : MA_REGULATORY_DATA;
  const templatesLabel = isAiGov ? 'AI governance policies' : 'standard M&A templates';

  const handleCellClick = (rowIndex: number) => {
    setSelectedRow(rowIndex);
    setSelectedFinding(REGULATORY_DATA[rowIndex]);
    setDrawerOpen(true);
  };

  const handleExpandRow = (rowIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedFinding(null);
  };

  // Calculate stats
  const totalDocuments = REGULATORY_DATA.reduce((sum, finding) => sum + finding.docsAffected, 0);
  const highPriorityCount = REGULATORY_DATA.filter(f => f.impactLevel === 'High').length;

  return (
    <>
    <div className="flex flex-col h-full bg-white text-[#212223] text-sm font-sans">
      {/* Summary Banner */}
      {!dismissedBanner && (
        <div className="bg-[#FFF9F0] border-b border-[#F5D6A3] px-4 py-2.5 relative">
          <button
            onClick={() => setDismissedBanner(true)}
            className="absolute top-2 right-3 p-1 hover:bg-[#F5D6A3]/50 rounded text-[#666666] transition-colors"
            title="Dismiss"
          >
            <X className="size-3.5" />
          </button>
          <div className="flex items-center gap-2 pr-8">
            <div className="w-4 h-4 rounded-full bg-[#F5A623] flex items-center justify-center shrink-0">
              <Bell className="size-3 text-white" />
            </div>
            <span className="text-[13px] text-[#1F1F1F]">
              <span className="font-medium">{REGULATORY_DATA.length} of {REGULATORY_DATA.length} regulatory findings</span>
              <span className="text-[#666] mx-2">•</span>
              <span className="font-medium">{totalDocuments} documents affected across {templatesLabel}</span>
              <span className="text-[#666] mx-2">•</span>
              <span className="text-[#D97706] font-medium">{highPriorityCount} high priority items require immediate attention</span>
            </span>
          </div>
        </div>
      )}

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <div className="inline-block min-w-full">
          {/* Column Headers */}
          <div className="flex sticky top-0 z-10 bg-[#F5F5F5] border-b border-[#E5E5E5]">
            <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5]"></div>
            <div className="w-[380px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Source title</div>
            <div className="w-[140px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Source type</div>
            <div className="w-[320px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Source summary</div>
            <div className="w-[120px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Impact level</div>
            <div className="w-[100px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Relevance</div>
            <div className="w-[320px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Rationale</div>
            <div className="w-[140px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Compliance date</div>
            <div className="w-[200px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Actions</div>
          </div>

          {/* Rows */}
          {REGULATORY_DATA.map((finding, idx) => (
            <div 
              key={idx} 
              className={clsx(
                "flex border-b border-[#E5E5E5] group",
                selectedRow === idx && "bg-[#EDF2F0]"
              )}
              onClick={() => handleCellClick(idx)}
            >
              {/* Row number */}
              <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center font-semibold text-gray-600 py-2">{idx + 1}</div>
              
              {/* Source Title */}
              <div className={clsx(
                "w-[380px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 cursor-pointer selection:bg-blue-100 flex items-start gap-2",
                selectedRow === idx ? "bg-[#EDF2F0]" : "hover:bg-[#EDF2F0] group-hover:bg-[#EDF2F0]"
              )}>
                <FileText className="size-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{finding.title}</span>
              </div>

              {/* Source Type */}
              <div className={clsx(
                "w-[140px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 cursor-pointer selection:bg-blue-100",
                selectedRow === idx ? "bg-[#EDF2F0]" : "hover:bg-[#EDF2F0] group-hover:bg-[#EDF2F0]"
              )}>
                <span className={clsx(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
                  "bg-[#EDEDED] text-[#404040]"
                )}>
                  {finding.sourceType === 'TR Product' && <Database className="size-3 shrink-0" />}
                  {finding.sourceType === 'Reuters News' && <Newspaper className="size-3 shrink-0" />}
                  {finding.sourceType === 'Web Source' && <Globe className="size-3 shrink-0" />}
                  {finding.sourceType}
                </span>
              </div>

              {/* Source Summary */}
              <div className={clsx(
                "w-[320px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 cursor-pointer selection:bg-blue-100",
                selectedRow === idx ? "bg-[#EDF2F0]" : "hover:bg-[#EDF2F0] group-hover:bg-[#EDF2F0]"
              )}>
                <span className="line-clamp-3 text-xs leading-relaxed">{finding.summary}</span>
              </div>

              {/* Impact Level */}
              <div className={clsx(
                "w-[120px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 cursor-pointer selection:bg-blue-100",
                selectedRow === idx ? "bg-[#EDF2F0]" : "hover:bg-[#EDF2F0] group-hover:bg-[#EDF2F0]"
              )}>
                <span className={clsx(
                  "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                  finding.impactLevel === 'High' ? "bg-[#FFEDED] text-[#DC0A0A]" :
                  finding.impactLevel === 'Medium' ? "bg-[#FFF8E5] text-[#AB3300]" :
                  "bg-[#EDF6FF] text-[#0062C4]"
                )}>
                  {finding.impactLevel}
                </span>
              </div>

              {/* Relevance */}
              <div className={clsx(
                "w-[100px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 cursor-pointer selection:bg-blue-100",
                selectedRow === idx ? "bg-[#EDF2F0]" : "hover:bg-[#EDF2F0] group-hover:bg-[#EDF2F0]"
              )}>
                <span className="font-medium">{finding.relevance}</span>
              </div>

              {/* Rationale */}
              <div className={clsx(
                "w-[320px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 cursor-pointer selection:bg-blue-100",
                selectedRow === idx ? "bg-[#EDF2F0]" : "hover:bg-[#EDF2F0] group-hover:bg-[#EDF2F0]"
              )}>
                <span className="line-clamp-3 text-xs leading-relaxed">{finding.rationale}</span>
              </div>

              {/* Compliance Date */}
              <div className={clsx(
                "w-[140px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 cursor-pointer selection:bg-blue-100",
                selectedRow === idx ? "bg-[#EDF2F0]" : "hover:bg-[#EDF2F0] group-hover:bg-[#EDF2F0]"
              )}>
                <span className={finding.complianceDate === 'N/A' ? 'text-gray-400' : ''}>{finding.complianceDate}</span>
              </div>

              {/* Actions */}
              <div
                className={clsx(
                  "w-[200px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 selection:bg-blue-100 flex flex-col gap-1.5 items-start",
                  selectedRow === idx ? "bg-[#EDF2F0]" : "hover:bg-[#EDF2F0] group-hover:bg-[#EDF2F0]"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-xs text-[#666] flex items-center gap-1 pointer-events-none">
                  <Flag className="size-3" />
                  {finding.docsAffected} docs, {finding.clausesAffected} clauses
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🚀 Storing CPC workflow data for:', finding.title);

                    // Store workflow data for CPC
                    sessionStorage.setItem('pendingCPCWorkflow', JSON.stringify({
                      docsAffected: finding.docsAffected,
                      clausesAffected: finding.clausesAffected,
                      impactLevel: finding.impactLevel
                    }));

                    // Dispatch event to close table and trigger CPC workflow
                    const event = new CustomEvent('initiateCPC', {
                      detail: {
                        regulation: finding.title,
                        docsAffected: finding.docsAffected,
                        clausesAffected: finding.clausesAffected,
                        impactLevel: finding.impactLevel
                      }
                    });
                    window.dispatchEvent(event);
                    console.log('✅ CPC workflow initiated!');
                  }}
                  className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[13px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all cursor-pointer z-10 relative"
                >
                  <Sparkles className="size-3.5" />
                  Initiate CPC
                </button>
              </div>
            </div>
          ))}

          {/* Empty Rows to fill space */}
          {Array.from({ length: 10 }).map((_, idx) => (
            <div key={`empty-${idx}`} className="flex border-b border-[#E5E5E5]">
              <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center font-semibold text-gray-600 py-2">{REGULATORY_DATA.length + idx + 1}</div>
              <div className="w-[380px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 hover:bg-[#EDF2F0] cursor-cell"></div>
              <div className="w-[140px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 hover:bg-[#EDF2F0] cursor-cell"></div>
              <div className="w-[320px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 hover:bg-[#EDF2F0] cursor-cell"></div>
              <div className="w-[120px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 hover:bg-[#EDF2F0] cursor-cell"></div>
              <div className="w-[100px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 hover:bg-[#EDF2F0] cursor-cell"></div>
              <div className="w-[320px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 hover:bg-[#EDF2F0] cursor-cell"></div>
              <div className="w-[140px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 hover:bg-[#EDF2F0] cursor-cell"></div>
              <div className="w-[200px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 hover:bg-[#EDF2F0] cursor-cell"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Sheet Tabs */}
      <div className="bg-[#F5F5F5] border-t border-[#E5E5E5] px-1 flex gap-1 h-[32px] items-end">
        <div className="px-4 py-1 bg-white border-t border-x border-[#E5E5E5] text-sm font-medium rounded-t text-[#1D4B34] border-b border-white relative top-[1px]">Sheet1</div>
        <div className="px-4 py-1 hover:bg-[#E5E5E5] text-sm font-medium rounded-t text-gray-600 cursor-pointer">Sheet2</div>
        <div className="px-2 py-1 hover:bg-[#E5E5E5] text-sm font-medium rounded-t text-gray-600 cursor-pointer">+</div>
      </div>
    </div>

    {/* Finding Detail Drawer */}
    <RegulatoryFindingDrawer
      isOpen={drawerOpen}
      onClose={handleCloseDrawer}
      finding={selectedFinding}
    />
    </>
  );
}
