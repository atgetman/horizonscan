import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, FileText, ExternalLink, ChevronDown, ZoomIn, ZoomOut, Flag } from 'lucide-react';
import { clsx } from 'clsx';
import { useState, useRef } from 'react';

interface AffectedDocument {
  id: string;
  title: string;
  clausesAffected: string[];
  highlights: { text: string; concern: string }[];
}

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
  sourceUrl?: string;
  sourceContent?: string;
}

interface RegulatoryFindingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  finding: RegulatoryFinding | null;
}

// Mock affected documents with clause highlights tailored to each regulatory finding
function getAffectedDocuments(finding: RegulatoryFinding | null): AffectedDocument[] {
  if (!finding) return [];

  const docCount = Math.min(finding.docsAffected, 5);
  const docs: AffectedDocument[] = [];

  // Determine content based on the specific regulatory finding
  const findingTitle = finding.title.toLowerCase();

  // DOJ/FTC Merger Guidelines - affects antitrust/HSR clauses
  if (findingTitle.includes('merger guideline') || findingTitle.includes('doj') || findingTitle.includes('ftc')) {
    const docNames = ['Sterling Capital Acquisition Agreement', 'Merger Protocol - Sterling Capital', 'Stock Purchase Agreement - Sterling Capital', 'Asset Purchase Agreement', 'Joint Venture Agreement'];
    for (let i = 0; i < docCount; i++) {
      docs.push({
        id: `doc-${i}`,
        title: `${docNames[i]}.docx`,
        clausesAffected: [
          'Section 5.3 - HSR Filing Requirements',
          'Section 5.5 - Antitrust Clearance Conditions',
          'Section 8.1 - Regulatory Compliance Representations',
          'Schedule B - Required Government Filings'
        ],
        highlights: [
          {
            text: 'The parties shall file all required notifications under the Hart-Scott-Rodino Antitrust Improvements Act of 1976, as amended, within ten (10) business days of execution.',
            concern: 'New DOJ/FTC guidelines lower thresholds for competitive concerns and extend review timelines. Filing deadlines may need extension to 15-20 business days.'
          },
          {
            text: 'Buyer shall use commercially reasonable efforts to obtain antitrust clearance from applicable governmental authorities.',
            concern: '"Commercially reasonable efforts" standard may be insufficient under new guidelines - consider strengthening to "best efforts" for high-risk sectors.'
          }
        ]
      });
    }
  }

  // SEC SPAC Disclosure - affects financial disclosure and projection clauses
  else if (findingTitle.includes('spac') || findingTitle.includes('sec') && findingTitle.includes('disclosure')) {
    const docNames = ['Business Combination Agreement - SPAC Alpha', 'De-SPAC Merger Agreement', 'PIPE Investment Agreement', 'Sponsor Agreement', 'Registration Rights Agreement'];
    for (let i = 0; i < docCount; i++) {
      docs.push({
        id: `doc-${i}`,
        title: `${docNames[i]}.docx`,
        clausesAffected: [
          'Section 4.2 - Financial Projections',
          'Section 6.1 - Disclosure Schedules',
          'Section 7.3 - Forward-Looking Statements',
          'Exhibit C - Earn-Out Provisions'
        ],
        highlights: [
          {
            text: 'Target Company may include forward-looking financial projections in the proxy statement/prospectus, subject to customary cautionary language.',
            concern: 'New SEC rules require enhanced disclosure of assumptions underlying projections and increase liability for forward-looking statements in SPAC transactions.'
          },
          {
            text: 'Warrant accounting shall follow GAAP principles applicable at the time of measurement.',
            concern: 'SEC now requires warrants in SPAC transactions to be classified as liabilities rather than equity. Accounting treatment must be updated.'
          }
        ]
      });
    }
  }

  // CFIUS - affects foreign investment and critical technology clauses
  else if (findingTitle.includes('cfius') || findingTitle.includes('foreign investment')) {
    const docNames = ['Cross-Border Acquisition Agreement', 'Technology Asset Purchase - AI Systems', 'Joint Venture Agreement - Quantum Computing', 'Semiconductor Licensing Agreement', 'Strategic Investment Agreement'];
    for (let i = 0; i < docCount; i++) {
      docs.push({
        id: `doc-${i}`,
        title: `${docNames[i]}.docx`,
        clausesAffected: [
          'Section 5.7 - CFIUS Filing Obligations',
          'Section 3.4 - Critical Technology Definitions',
          'Section 9.2 - National Security Representations',
          'Schedule D - Export Control Classifications'
        ],
        highlights: [
          {
            text: 'If the transaction involves "critical technology" as defined under 31 C.F.R. § 800.215, parties shall file a voluntary notice with CFIUS.',
            concern: 'Expanded CFIUS definition now includes AI/ML systems, quantum computing, and advanced semiconductors. This transaction likely triggers mandatory filing requirement.'
          },
          {
            text: 'Seller represents that none of the transferred assets are subject to export control restrictions.',
            concern: 'Representation should explicitly address new critical technology categories and confirm whether assets fall under mandatory CFIUS declaration requirements.'
          }
        ]
      });
    }
  }

  // FTC Non-Compete Ban - affects restrictive covenants in M&A
  else if (findingTitle.includes('non-compete') || findingTitle.includes('ftc') && findingTitle.includes('ban')) {
    const docNames = ['Acquisition Agreement - ServiceCo', 'Asset Purchase Agreement w/ Seller Employment', 'Earnout Agreement - Key Employees', 'Management Services Agreement', 'Transition Services Agreement'];
    for (let i = 0; i < docCount; i++) {
      docs.push({
        id: `doc-${i}`,
        title: `${docNames[i]}.docx`,
        clausesAffected: [
          'Section 10.4 - Non-Competition Covenant (Seller)',
          'Section 10.5 - Non-Solicitation of Employees',
          'Exhibit B - Employment Agreement - CEO',
          'Section 2.3 - Earnout Conditions'
        ],
        highlights: [
          {
            text: 'For a period of three (3) years following the Closing Date, Seller shall not, directly or indirectly, engage in any business competitive with the Business within the Territory.',
            concern: 'Proposed FTC rule would invalidate most non-compete agreements, including those negotiated as part of business sales. Consider relying on trade secret protections and narrower non-solicitation covenants instead.'
          },
          {
            text: 'As a condition to receiving the Earnout Payment, Seller must remain employed by Buyer and comply with all restrictive covenants.',
            concern: 'Linking earnout to non-compete compliance may be unenforceable if FTC rule is finalized. Restructure earnout conditions to focus on business performance metrics rather than employment restrictions.'
          }
        ]
      });
    }
  }

  // Delaware MAE Ruling - affects material adverse effect clauses
  else if (findingTitle.includes('delaware') || findingTitle.includes('mae') || findingTitle.includes('material adverse')) {
    const docNames = ['Merger Agreement - Delaware Corp', 'Stock Purchase Agreement', 'Asset Sale Agreement', 'Recapitalization Agreement', 'Going Private Transaction Agreement'];
    for (let i = 0; i < docCount; i++) {
      docs.push({
        id: `doc-${i}`,
        title: `${docNames[i]}.docx`,
        clausesAffected: [
          'Section 11.1 - Definition of Material Adverse Effect',
          'Section 12.3 - Buyer Termination Rights',
          'Section 6.2 - Bring-Down Conditions',
          'Section 7.1 - MAC/MAE Exceptions'
        ],
        highlights: [
          {
            text: 'A "Material Adverse Effect" means any event, change, or effect that is materially adverse to the business, financial condition, or results of operations of the Company and its subsidiaries, taken as a whole.',
            concern: 'Recent Delaware Chancery Court ruling tightens MAE standards. Definition should include "durationally significant" language and specify temporal requirements to align with current case law.'
          },
          {
            text: 'Buyer may terminate this Agreement if a Material Adverse Effect has occurred and is continuing as of the Closing Date.',
            concern: 'Courts now require buyers to demonstrate MAE effects are both substantial and long-term. Add specific thresholds (e.g., "reasonably expected to last 12+ months") to support enforceability.'
          }
        ]
      });
    }
  }

  // EU Digital Markets Act - affects EU market transactions
  else if (findingTitle.includes('eu') || findingTitle.includes('digital markets')) {
    const docNames = ['Cross-Border Merger - EU Operations', 'Platform Acquisition Agreement', 'Digital Services Acquisition', 'European Subsidiary Purchase', 'Technology Transfer Agreement - EU'];
    for (let i = 0; i < docCount; i++) {
      docs.push({
        id: `doc-${i}`,
        title: `${docNames[i]}.docx`,
        clausesAffected: [
          'Section 5.9 - EU Merger Notification',
          'Section 3.8 - Digital Gatekeeper Status',
          'Section 8.5 - EU Regulatory Compliance',
          'Schedule E - EU Member State Filings'
        ],
        highlights: [
          {
            text: 'If the combined worldwide turnover exceeds €5 billion, parties shall file merger notification with the European Commission.',
            concern: 'Digital Markets Act introduces additional notification requirements for "gatekeepers" and allows retroactive review of completed transactions. May require dual filing even below traditional thresholds.'
          },
          {
            text: 'Seller represents compliance with all applicable EU competition and data protection laws.',
            concern: 'Representation should explicitly address DMA gatekeeper obligations and potential retroactive review provisions that could affect transaction structure.'
          }
        ]
      });
    }
  }

  // IRS Section 368 / Tax Reorganizations - affects tax structure clauses
  else if (findingTitle.includes('irs') || findingTitle.includes('368') || findingTitle.includes('tax')) {
    const docNames = ['Tax-Free Reorganization Agreement', 'Stock-for-Stock Merger Agreement', 'Triangular Merger Agreement', 'Reverse Triangular Merger', 'Type A Reorganization Agreement'];
    for (let i = 0; i < docCount; i++) {
      docs.push({
        id: `doc-${i}`,
        title: `${docNames[i]}.docx`,
        clausesAffected: [
          'Section 2.5 - Tax Treatment of Merger',
          'Section 4.7 - Tax Representations',
          'Section 9.1 - Tax Opinions and Rulings',
          'Exhibit F - Continuity of Interest Analysis'
        ],
        highlights: [
          {
            text: 'The parties intend for the Merger to qualify as a tax-free reorganization under Section 368(a)(1)(A) of the Internal Revenue Code.',
            concern: 'Revised IRS regulations modify continuity of interest requirements for stock-for-stock mergers. Transaction structure should be reviewed to ensure at least 40% equity continuity under new standards.'
          },
          {
            text: 'Buyer shall obtain a tax opinion confirming the intended tax treatment of the transaction.',
            concern: 'Updated Section 368 regs impose stricter requirements on triangular reorganizations. Tax opinion should address new continuity of business enterprise tests.'
          }
        ]
      });
    }
  }

  // SEC Climate Disclosure - affects ESG due diligence
  else if (findingTitle.includes('climate') || findingTitle.includes('sec') && findingTitle.includes('disclosure')) {
    const docNames = ['Public Company Acquisition Agreement', 'Merger Agreement - Manufacturing Co', 'Asset Purchase - Industrial Facilities', 'Stock Purchase - Energy Sector', 'Going Private Transaction'];
    for (let i = 0; i < docCount; i++) {
      docs.push({
        id: `doc-${i}`,
        title: `${docNames[i]}.docx`,
        clausesAffected: [
          'Section 6.8 - Environmental Disclosure Schedules',
          'Section 3.15 - Climate-Related Representations',
          'Section 7.4 - Post-Closing Reporting Obligations',
          'Exhibit G - ESG Due Diligence Checklist'
        ],
        highlights: [
          {
            text: 'Seller shall disclose all material environmental liabilities and pending environmental claims.',
            concern: 'New SEC climate disclosure rules require Scope 1 and 2 emissions disclosure for public companies. Due diligence checklist should explicitly request emissions data and climate risk assessments.'
          },
          {
            text: 'Target Company represents that it is in compliance with all applicable environmental laws and regulations.',
            concern: 'Representation should be expanded to cover climate disclosure obligations and material climate-related risks that may affect financial statements under new SEC rules.'
          }
        ]
      });
    }
  }

  // Default/generic - if no specific match
  else {
    const docNames = ['Atlas Acquisition Agreement', 'Merger Protocol', 'Stock Purchase Agreement', 'Asset Purchase Agreement', 'Joint Venture Agreement'];
    for (let i = 0; i < docCount; i++) {
      docs.push({
        id: `doc-${i}`,
        title: `${docNames[i]}.docx`,
        clausesAffected: [
          'Section 5.3 - Regulatory Approvals',
          'Section 8.1 - Representations and Warranties',
          'Section 11.2 - Closing Conditions',
          'Schedule B - Required Filings'
        ],
        highlights: [
          {
            text: 'The parties shall comply with all applicable laws and regulations in connection with this transaction.',
            concern: 'General compliance provision should be reviewed to ensure coverage of recent regulatory changes specific to this industry and transaction type.'
          },
          {
            text: 'Each party represents that it has obtained all necessary governmental approvals for the transaction.',
            concern: 'Representation may need updating to reflect new filing requirements or expanded regulatory review procedures.'
          }
        ]
      });
    }
  }

  return docs;
}

export function RegulatoryFindingDrawer({
  isOpen,
  onClose,
  finding
}: RegulatoryFindingDrawerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoc, setSelectedDoc] = useState(0);
  const [activeSection, setActiveSection] = useState<number>(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (!finding) return null;

  const affectedDocs = getAffectedDocuments(finding);
  const totalPages = 1;

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    const sectionElement = sectionRefs.current[index];
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[76vw] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FileText className="size-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">{finding.title}</span>
                <span className={clsx(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold",
                  finding.impactLevel === 'High' ? "bg-[#FFEDED] text-[#DC0A0A]" :
                  finding.impactLevel === 'Medium' ? "bg-[#FFF8E5] text-[#AB3300]" :
                  "bg-[#EDF6FF] text-[#0062C4]"
                )}>
                  {finding.impactLevel} Impact
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#1d4b34] hover:bg-gray-100 rounded"
                >
                  <ExternalLink className="size-3.5" />
                  View source
                </a>
                <button className="p-1.5 hover:bg-gray-100 rounded">
                  <Maximize2 className="size-4 text-gray-600" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-gray-100 rounded"
                >
                  <X className="size-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Panel - Affected Documents */}
              <div className="w-[480px] border-r border-gray-200 flex flex-col bg-white">
                {/* Summary Section */}
                <div className="border-b border-gray-200 p-4 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Regulatory Source</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{finding.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Type:</span> {finding.sourceType}
                    </div>
                    <div>
                      <span className="font-medium">Relevance:</span> {finding.relevance}
                    </div>
                    <div>
                      <span className="font-medium">Compliance:</span> {finding.complianceDate}
                    </div>
                  </div>
                </div>

                {/* Impact Analysis */}
                <div className="border-b border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Impact Analysis</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{finding.rationale}</p>
                </div>

                {/* Affected Documents List */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Affected Documents ({finding.docsAffected})
                      </h3>
                      <span className="text-xs text-gray-600">
                        {finding.clausesAffected} clauses impacted
                      </span>
                    </div>

                    {affectedDocs.map((doc, idx) => (
                      <div
                        key={doc.id}
                        className={clsx(
                          "mb-3 rounded-lg border transition-all cursor-pointer",
                          selectedDoc === idx
                            ? "border-[#1d4b34] bg-[#EDF2F0]"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        )}
                        onClick={() => {
                          setSelectedDoc(idx);
                          setActiveSection(0);
                          sectionRefs.current = [];
                        }}
                      >
                        <div className="p-3">
                          <div className="flex items-start gap-2 mb-2">
                            <FileText className="size-4 text-gray-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 mb-1">{doc.title}</div>
                              <div className="text-xs text-gray-600">
                                {doc.clausesAffected.length} clauses require review
                              </div>
                            </div>
                          </div>

                          {/* Affected Clauses */}
                          <div className="ml-6 space-y-1.5">
                            {doc.clausesAffected.map((clause, cIdx) => (
                              <button
                                key={cIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  scrollToSection(cIdx);
                                }}
                                className={clsx(
                                  "w-full flex items-center gap-2 text-left px-2 py-1 rounded transition-colors",
                                  activeSection === cIdx && selectedDoc === idx
                                    ? "bg-[#1d4b34]/10"
                                    : "hover:bg-gray-100"
                                )}
                              >
                                <Flag className="size-3 text-[#F5A623] shrink-0" />
                                <span className="text-xs text-gray-700">{clause}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Document Preview with Highlights */}
              <div className="flex-1 flex flex-col bg-gray-100">
                {/* Document Toolbar */}
                <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 font-medium">
                      {affectedDocs[selectedDoc]?.title || 'Document'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <ChevronLeft className="size-4 text-gray-600" />
                    </button>
                    <input
                      type="number"
                      value={currentPage}
                      onChange={(e) => setCurrentPage(Number(e.target.value))}
                      className="w-10 text-center text-sm border border-gray-300 rounded px-1 py-1"
                    />
                    <span className="text-sm text-gray-600">of {totalPages}</span>
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <ChevronRight className="size-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <ZoomOut className="size-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <ZoomIn className="size-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Document Content with Highlights */}
                <div className="flex-1 overflow-auto p-8">
                  <div className="max-w-[820px] mx-auto bg-white shadow-lg p-12 min-h-[1100px]">
                    <div className="text-center mb-8">
                      <h1 className="text-xl font-bold text-gray-900 mb-4">
                        {affectedDocs[selectedDoc]?.title.replace('.docx', '').toUpperCase() || 'AGREEMENT'}
                      </h1>
                      <p className="text-sm text-gray-600">Project Harbor</p>
                    </div>

                    <div className="text-sm text-gray-700 leading-relaxed space-y-6">
                      {/* Dynamic content based on selected document */}
                      {affectedDocs[selectedDoc]?.clausesAffected.map((clause, idx) => (
                        <div
                          key={idx}
                          ref={(el) => (sectionRefs.current[idx] = el)}
                          className="scroll-mt-4"
                        >
                          <h2 className="font-bold text-gray-900 mb-3">{clause}</h2>

                          {/* Context paragraph before highlight */}
                          <p className="mb-4">
                            The following provision relates to {clause.toLowerCase()} and requires review in light of recent regulatory changes:
                          </p>

                          {/* Highlighted clause with specific concern */}
                          {affectedDocs[selectedDoc]?.highlights[idx] && (
                            <div className="bg-[#FFF9F0] border-l-4 border-[#F5D6A3] p-4 mb-4 relative group">
                              <div className="absolute -left-8 top-4">
                                <Flag className="size-5 text-[#F5A623]" />
                              </div>
                              <p className="mb-3">
                                <span className="font-semibold text-[#1F1F1F]">
                                  {affectedDocs[selectedDoc].highlights[idx].text}
                                </span>
                              </p>
                              <div className="mt-3 pt-3 border-t border-[#F5D6A3]">
                                <div className="flex items-start gap-2">
                                  <div className="size-2 rounded-full bg-[#F5A623] mt-1.5 shrink-0"></div>
                                  <div>
                                    <div className="text-xs font-semibold text-[#1F1F1F] mb-1">Compliance Concern:</div>
                                    <div className="text-xs text-[#666]">
                                      {affectedDocs[selectedDoc].highlights[idx].concern}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Context paragraph after highlight */}
                          <p className="mb-6">
                            The parties acknowledge that compliance with applicable regulatory requirements is a material term of this Agreement and agree to cooperate in good faith to address any required updates.
                          </p>
                        </div>
                      ))}

                      {/* Additional standard clauses */}
                      <div>
                        <h2 className="font-bold text-gray-900 mb-3">General Provisions</h2>
                        <p className="mb-4">
                          This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflicts of law principles.
                        </p>
                        <p>
                          The parties agree to cooperate in good faith to amend this Agreement as necessary to ensure compliance with all applicable laws and regulations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
