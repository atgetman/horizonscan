import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Bell, CheckCircle2, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useMonitoring } from '../../contexts/MonitoringContext';

interface TopFinding {
  regulation: string;
  impact: 'High' | 'Medium' | 'Low';
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
  High: {
    bgColor: 'bg-[#FFEDED]',
    textColor: 'text-[#DC0A0A]'
  },
  Medium: {
    bgColor: 'bg-[#FFF8E5]',
    textColor: 'text-[#AB3300]'
  },
  Low: {
    bgColor: 'bg-[#EDF6FF]',
    textColor: 'text-[#0062C4]'
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
  // Shared alert state — synced across the chat summary and the tabular toolbar
  const { savedAlerts, addAlert, removeAlert } = useMonitoring();
  const regulatoryAlert = savedAlerts.find(a => a.sourceType === 'regulatory-table');
  const alertSaved = Boolean(regulatoryAlert);
  // Inline confirmation strip is shown right after saving from this surface
  const [showAlertSavedStrip, setShowAlertSavedStrip] = useState(false);
  const [showFrequencyChips, setShowFrequencyChips] = useState(false);
  const monitoringFrequency = (regulatoryAlert?.frequency === 'instant' ? 'weekly' : regulatoryAlert?.frequency) ?? 'weekly';

  const handleSaveAsAlert = () => {
    setShowFrequencyChips(false);
    if (!alertSaved) {
      addAlert({
        topic: 'M&A Regulatory Updates',
        criteria: 'Monitor regulatory changes affecting M&A transactions',
        frequency: 'weekly',
        practiceAreas: ['Corporate', 'M&A'],
        jurisdictions: ['Federal', 'Multi-jurisdictional'],
        status: 'active',
        lastScan: 'Just now',
        nextScan: '7 days',
        alertCount: 0,
        sourceType: 'regulatory-table'
      });
    }
    setShowAlertSavedStrip(true);
  };

  const handleChangeFrequency = (freq: 'daily' | 'weekly' | 'monthly') => {
    if (regulatoryAlert) {
      removeAlert(regulatoryAlert.id);
    }
    addAlert({
      topic: 'M&A Regulatory Updates',
      criteria: 'Monitor regulatory changes affecting M&A transactions',
      frequency: freq,
      practiceAreas: ['Corporate', 'M&A'],
      jurisdictions: ['Federal', 'Multi-jurisdictional'],
      status: 'active',
      lastScan: 'Just now',
      nextScan: freq === 'daily' ? 'Tomorrow' : freq === 'weekly' ? '7 days' : '30 days',
      alertCount: 0,
      sourceType: 'regulatory-table'
    });
    setShowFrequencyChips(false);
  };

  const handleDismissAlert = () => {
    setShowAlertSavedStrip(false);
    setShowFrequencyChips(false);
  };

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
                Potential impact across {documentsAffected} standard M&A templates. Connect a document library to see impact on your own documents.
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
                  <span>Review High impact items before their compliance deadlines</span>
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

        {/* Save as alert action + inline confirmation strip */}
        <div className="pt-4 flex flex-col gap-2">
          {/* The button is never replaced — it stays and becomes disabled once an alert is saved */}
          <div>
            <button
              onClick={handleSaveAsAlert}
              disabled={alertSaved}
              className={`h-9 px-4 flex items-center gap-2 rounded-lg text-[14px] font-['Clario'] font-medium transition-colors ${
                alertSaved
                  ? 'bg-white border border-[#D2D2D2] text-[#1d4b34] cursor-not-allowed'
                  : 'bg-[#1d4b34] text-white hover:bg-[#153a28]'
              }`}
            >
              {alertSaved ? (
                <CheckCircle2 className="size-4" strokeWidth={2} />
              ) : (
                <Bell className="size-4" strokeWidth={1.5} />
              )}
              {alertSaved ? 'Alert saved' : 'Save as alert'}
            </button>
          </div>

          {alertSaved && showAlertSavedStrip && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <div className="flex items-center gap-[12px] flex-wrap w-full bg-[#EDF2F0] rounded-[8px] px-[12px] py-[10px]">
                <div className="flex items-center gap-[8px] min-w-0">
                  <CheckCircle2 className="size-[18px] text-[#1d4b34] shrink-0" strokeWidth={2} />
                  <span className="text-[14px] font-['Source_Sans_3'] text-[#1d4b34]">
                    {"You'll get "}
                    <strong className="font-semibold">{`${monitoringFrequency} alerts`}</strong>
                    {' when new changes affect these documents'}
                  </span>
                </div>

                <div className="ml-auto flex items-center gap-[8px] shrink-0">
                  {!showFrequencyChips ? (
                    <button
                      onClick={() => setShowFrequencyChips(true)}
                      className="h-8 px-3 flex items-center bg-white border border-[#8a8a8a] rounded-lg text-[13px] font-['Clario'] font-medium text-[#212223] underline hover:bg-[#F5F5F5] transition-colors"
                    >
                      Change frequency
                    </button>
                  ) : (
                    <div className="flex items-center gap-[6px] flex-wrap">
                      {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                        <button
                          key={freq}
                          onClick={() => handleChangeFrequency(freq)}
                          className={`h-8 px-[12px] flex items-center text-[13px] font-['Source_Sans_3'] rounded-full border transition-colors capitalize ${
                            monitoringFrequency === freq
                              ? 'bg-[#1d4b34] border-[#1d4b34] text-white'
                              : 'bg-white border-[#8a8a8a] text-[#212223] hover:bg-[#dde7e2]'
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={handleDismissAlert}
                    aria-label="Dismiss alert confirmation"
                    className="size-8 flex items-center justify-center bg-white border border-[#8a8a8a] rounded-lg text-[#212223] hover:bg-[#F5F5F5] transition-colors"
                  >
                    <X className="size-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
