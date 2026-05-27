import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import {
  RegulatorySignalCard,
  HorizonScanResults,
  AffectedClausesDrilldown,
  MonitoringConfirmation
} from '../components/regulatory';

export function RegulatoryDemo() {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState<'signal' | 'scan' | 'clauses' | 'confirmation'>('signal');

  // Demo data
  const signalData = {
    title: 'SEC Climate Disclosure Rules',
    impact: 'high' as const,
    rationale: 'New requirements mandate disclosure of climate-related risks and greenhouse gas emissions in annual reports. Your merger agreement template includes environmental representations that may need updating to reflect these enhanced disclosure obligations.',
    docsAffected: 3,
    monitorPrompt: 'Monitor SEC climate disclosure updates'
  };

  const scanSteps = [
    { id: '1', label: 'Analyzing workspace documents', status: 'completed' as const },
    { id: '2', label: 'Checking federal regulatory changes', status: 'completed' as const },
    { id: '3', label: 'Checking state regulatory changes', status: 'completed' as const },
    { id: '4', label: 'Evaluating impact on documents', status: 'completed' as const }
  ];

  const scanChanges = [
    {
      id: '1',
      regulation: 'SEC Climate Disclosure Rules (Final)',
      jurisdiction: 'Federal (SEC)',
      effectiveDate: 'Jan 1, 2027',
      impact: 'high' as const,
      rationale: 'Your M&A due diligence templates contain environmental disclosure checklists that will need to be updated to reflect the new Scope 1, 2, and 3 emissions reporting requirements. The enhanced materiality standard for climate risks may also affect your risk assessment frameworks.',
      docsAffected: 12,
      suggestedAction: 'Update due diligence checklists to include specific questions about Scope 1, 2, and 3 emissions tracking. Review and revise materiality thresholds in environmental risk assessment templates.'
    },
    {
      id: '2',
      regulation: 'CFPB Consumer Data Rights Rule',
      jurisdiction: 'Federal (CFPB)',
      effectiveDate: 'Apr 1, 2027',
      impact: 'medium' as const,
      rationale: 'Your standard privacy policies and data sharing agreements may need updates to comply with new consumer rights to authorize data sharing with third parties. The rule establishes technical standards for secure data transfer that affect vendor agreements.',
      docsAffected: 8,
      suggestedAction: 'Add consumer authorization provisions to privacy policies. Update vendor agreements to include CFPB technical security requirements for consumer data transfers.'
    },
    {
      id: '3',
      regulation: 'FTC Non-Compete Ban (Proposed Amendments)',
      jurisdiction: 'Federal (FTC)',
      effectiveDate: 'TBD (Pending)',
      impact: 'low' as const,
      rationale: 'Proposed amendments clarify exemptions for non-compete agreements in sale-of-business contexts. Your current templates already include carve-outs that align with proposed safe harbors, so minimal changes likely needed.',
      docsAffected: 5,
      suggestedAction: 'Monitor final rule issuance. Consider adding explicit reference to FTC safe harbor exemptions in non-compete provisions of asset purchase agreements.'
    }
  ];

  const affectedDocsData = {
    regulationTitle: 'SEC Climate Disclosure Rules',
    documents: [
      {
        id: 'doc1',
        name: 'Merger Agreement Template - Tech Sector.docx',
        type: 'Agreement Template',
        clauseFlags: [
          {
            id: 'clause1',
            clauseTitle: 'Environmental Representations (Section 4.12)',
            issue: 'Current language does not address Scope 3 emissions or climate-related financial risks',
            original: 'Seller represents that it is in material compliance with all applicable environmental laws and has obtained all necessary environmental permits.',
            suggested: 'Seller represents that it is in material compliance with all applicable environmental laws, has obtained all necessary environmental permits, and has established processes to track and disclose Scope 1, 2, and 3 greenhouse gas emissions in accordance with SEC climate disclosure requirements effective January 1, 2027.'
          },
          {
            id: 'clause2',
            clauseTitle: 'Material Disclosure Requirements (Section 3.7)',
            issue: 'Missing climate risk materiality assessment requirements',
            original: 'Seller has disclosed all material risks and liabilities in the disclosure schedules.',
            suggested: 'Seller has disclosed all material risks and liabilities in the disclosure schedules, including any climate-related risks that meet the materiality threshold established under SEC climate disclosure rules, and any physical or transition risks that could materially affect the business, operations, or financial condition.'
          }
        ]
      },
      {
        id: 'doc2',
        name: 'Due Diligence Checklist - Environmental.docx',
        type: 'Checklist',
        clauseFlags: [
          {
            id: 'clause3',
            clauseTitle: 'GHG Emissions Assessment',
            issue: 'Checklist does not include questions about Scope 3 emissions tracking',
            original: 'Does the target company track greenhouse gas emissions? If yes, describe monitoring systems.',
            suggested: 'Does the target company track Scope 1, 2, and 3 greenhouse gas emissions in accordance with SEC requirements? Describe monitoring systems, methodologies, and verification processes. Identify any gaps in Scope 3 emissions tracking.'
          }
        ]
      }
    ]
  };

  const monitoringData = {
    monitors: [
      {
        id: 'm1',
        topic: 'SEC climate disclosure updates',
        jurisdictions: ['Federal', 'SEC'],
        frequency: 'weekly' as const
      },
      {
        id: 'm2',
        topic: 'ESG regulatory developments',
        jurisdictions: ['Federal', 'New York', 'California'],
        frequency: 'daily' as const
      }
    ]
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[14px] font-['Source_Sans_3'] text-[#666] hover:text-[#212223] transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </button>
        </div>
        <h1 className="text-[24px] font-['Clario'] font-semibold text-[#314b3e]">
          Regulatory Intelligence Components
        </h1>
        <p className="text-[14px] font-['Source_Sans_3'] text-[#666] mt-1">
          Inline chat components for regulatory signals, horizon scans, and monitoring
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-[#E5E5E5] p-4 overflow-y-auto">
          <div className="space-y-1">
            <button
              onClick={() => setActiveDemo('signal')}
              className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-['Source_Sans_3'] transition-colors ${
                activeDemo === 'signal'
                  ? 'bg-[#edf2f0] text-[#1d4b34] font-medium'
                  : 'text-[#666] hover:bg-[#F5F5F5]'
              }`}
            >
              1. Inline Signal Card
            </button>
            <button
              onClick={() => setActiveDemo('scan')}
              className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-['Source_Sans_3'] transition-colors ${
                activeDemo === 'scan'
                  ? 'bg-[#edf2f0] text-[#1d4b34] font-medium'
                  : 'text-[#666] hover:bg-[#F5F5F5]'
              }`}
            >
              2. Horizon Scan Results
            </button>
            <button
              onClick={() => setActiveDemo('clauses')}
              className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-['Source_Sans_3'] transition-colors ${
                activeDemo === 'clauses'
                  ? 'bg-[#edf2f0] text-[#1d4b34] font-medium'
                  : 'text-[#666] hover:bg-[#F5F5F5]'
              }`}
            >
              3. Affected Clauses
            </button>
            <button
              onClick={() => setActiveDemo('confirmation')}
              className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-['Source_Sans_3'] transition-colors ${
                activeDemo === 'confirmation'
                  ? 'bg-[#edf2f0] text-[#1d4b34] font-medium'
                  : 'text-[#666] hover:bg-[#F5F5F5]'
              }`}
            >
              4. Monitoring Confirmation
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {/* Simulated chat context */}
            <div className="mb-6 p-4 bg-[#F9FAFB] border border-[#E5E5E5] rounded-lg">
              <p className="text-[14px] font-['Source_Sans_3'] text-[#666] leading-relaxed">
                <span className="font-semibold text-[#212223]">Chat context:</span> These components appear inline within CoCo's responses, surfacing regulatory intelligence without interrupting the conversation flow.
              </p>
            </div>

            {/* Demo Component */}
            {activeDemo === 'signal' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-[18px] font-['Clario'] font-semibold text-[#212223] mb-2">
                    Inline Regulatory Signal
                  </h2>
                  <p className="text-[14px] font-['Source_Sans_3'] text-[#666]">
                    Surfaces mid-research as an inline card within a normal response. Includes impact badge, plain-language rationale, affected docs count, and monitor setup prompt.
                  </p>
                </div>

                <div className="p-4 bg-[#F9FAFB] rounded-lg mb-2">
                  <p className="text-[14px] font-['Source_Sans_3'] text-[#212223] leading-relaxed">
                    I've reviewed your merger agreement templates and cross-referenced them with recent regulatory developments...
                  </p>
                </div>

                <RegulatorySignalCard
                  {...signalData}
                  onMonitor={() => alert('Navigate to Knowledge → Monitoring setup')}
                />

                <div className="p-4 bg-[#F9FAFB] rounded-lg mt-2">
                  <p className="text-[14px] font-['Source_Sans_3'] text-[#212223] leading-relaxed">
                    ...The environmental representations sections look otherwise up to date with current EPA requirements.
                  </p>
                </div>
              </div>
            )}

            {activeDemo === 'scan' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-[18px] font-['Clario'] font-semibold text-[#212223] mb-2">
                    Horizon Scan Results
                  </h2>
                  <p className="text-[14px] font-['Source_Sans_3'] text-[#666]">
                    Agentic task card showing steps (including checking workspace documents), followed by tabular results with expandable rows.
                  </p>
                </div>

                <HorizonScanResults
                  steps={scanSteps}
                  changes={scanChanges}
                  onViewDetails={(id) => {
                    alert(`View details for change ${id}`);
                    setActiveDemo('clauses');
                  }}
                />
              </div>
            )}

            {activeDemo === 'clauses' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-[18px] font-['Clario'] font-semibold text-[#212223] mb-2">
                    Affected Clauses Drill-down
                  </h2>
                  <p className="text-[14px] font-['Source_Sans_3'] text-[#666]">
                    Per-document collapsible sections with clause-level flags and redline blocks showing struck-through original and suggested replacement.
                  </p>
                </div>

                <AffectedClausesDrilldown {...affectedDocsData} />
              </div>
            )}

            {activeDemo === 'confirmation' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-[18px] font-['Clario'] font-semibold text-[#212223] mb-2">
                    Monitoring Confirmation
                  </h2>
                  <p className="text-[14px] font-['Source_Sans_3'] text-[#666]">
                    One compact card per topic added, showing CoCo-inferred topic pills and frequency. Single "Manage in Knowledge ↗" footer CTA.
                  </p>
                </div>

                <div className="p-4 bg-[#F9FAFB] rounded-lg mb-2">
                  <p className="text-[14px] font-['Source_Sans_3'] text-[#212223] leading-relaxed">
                    I've set up monitoring for the regulatory areas we discussed...
                  </p>
                </div>

                <MonitoringConfirmation
                  {...monitoringData}
                  onManage={() => navigate('/knowledge')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
