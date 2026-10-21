import { useCallback, useState } from 'react';
import { ChevronDown, ChevronUp, Bell, CheckCircle2, X, ArrowUpRight, SquareDot } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useMonitoring } from '../../contexts/MonitoringContext';
import { FileChipsArea, MoreDocsChip, SupportingDocChip } from '../ui/SupportingDocChip';
import { AffectedDocumentPreview } from './AffectedDocumentPreview';
import { getAffectedDocuments } from './affectedDocumentRedlines';

const VISIBLE_DOC_CHIPS = 5;

type RelevanceSegment = string | { strong: string } | { cite: string };

interface TopFinding {
  regulation: string;
  impact: 'High' | 'Medium' | 'Low';
  status: string;
  statusDate?: string;
  relevance: RelevanceSegment[];
}

function RelevanceText({ segments }: { segments: RelevanceSegment[] }) {
  return (
    <p className="text-[14px] font-['Source_Sans_3'] text-[#212223] leading-[1.6] text-pretty">
      {segments.map((segment, i) => {
        if (typeof segment === 'string') return <span key={i}>{segment}</span>;
        if ('strong' in segment) return <strong key={i} className="font-semibold">{segment.strong}</strong>;
        return (
          <span
            key={i}
            className="inline-flex items-baseline gap-1.5 mx-0.5 px-2 py-0.5 rounded-md bg-[#f0f0f0] text-[13px] leading-[1.4] text-[#666666] align-baseline"
          >
            <span>1</span>
            <SquareDot className="size-3 self-center shrink-0" strokeWidth={1.75} aria-hidden="true" />
            <span>{segment.cite}</span>
          </span>
        );
      })}
    </p>
  );
}

interface RegulatoryScanSummaryProps {
  totalFindings: number;
  highestImpact: string;
  topFindings: TopFinding[];
  documentsAffected: number;
  onViewAffectedClauses?: () => void;
  variant?: 'ma' | 'ai-gov';
}

// Scenario-specific copy + alert payloads so this summary can serve both the
// M&A regulatory scan and the AI governance legislation scan.
const SCAN_VARIANTS = {
  'ma': {
    scopeText: 'Scanned federal and state regulatory sources for changes affecting M&A transactions.',
    docsText: (n: number) => `Potential impact across ${n} standard M&A templates. Connect a document library to see impact on your own documents.`,
    nextSteps: [
      'Review High impact items before their compliance deadlines',
      'Run Contract Policy Check on affected templates to identify specific clause updates needed',
      'Set up monitoring for M&A regulatory changes to stay updated on new developments',
    ],
    alert: {
      topic: 'M&A Regulatory Updates',
      criteria: 'Monitor regulatory changes affecting M&A transactions',
      practiceAreas: ['Corporate', 'M&A'],
      jurisdictions: ['Federal', 'Multi-jurisdictional'],
    },
  },
  'ai-gov': {
    scopeText: 'Scanned federal and state sources for legislation governing the use of AI in the workplace — automated employment decision tools, hiring and promotion, and employee monitoring — flagging enacted requirements and pending bills.',
    docsText: (n: number) => `Potential impact across ${n} documents in your AI Governance workspace, including your AI Governance Policy, Bias Testing Log, and Model Inventory.`,
    nextSteps: [
      'Prioritize enacted High impact items (NYC Local Law 144 in effect, California ADS employment rules effective Oct 1 2025, Illinois HB 3773 and the Colorado AI Act in 2026) by their effective dates',
      'Run Contract Policy Check on affected AI governance documents to identify specific clause updates needed',
      'Set up monitoring for workplace AI legislation to track pending federal bills and new state requirements',
    ],
    alert: {
      topic: 'Workplace AI Legislation Updates',
      criteria: 'Monitor legislation governing AI in the workplace — automated employment decision tools, hiring, and employee monitoring',
      practiceAreas: ['AI Governance', 'Employment & Labor'],
      jurisdictions: ['Federal', 'New York', 'Colorado', 'California', 'Illinois'],
    },
  },
} as const;

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
  onViewAffectedClauses,
  variant = 'ma'
}: RegulatoryScanSummaryProps) {
  const config = SCAN_VARIANTS[variant];
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['what-found']));
  const affectedDocs = getAffectedDocuments(variant);
  const [showAllDocs, setShowAllDocs] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const closePreview = useCallback(() => setPreviewIndex(null), []);
  const visibleDocs = showAllDocs ? affectedDocs : affectedDocs.slice(0, VISIBLE_DOC_CHIPS);
  const hiddenDocCount = affectedDocs.length - visibleDocs.length;
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
        topic: config.alert.topic,
        criteria: config.alert.criteria,
        frequency: 'weekly',
        practiceAreas: [...config.alert.practiceAreas],
        jurisdictions: [...config.alert.jurisdictions],
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
      topic: config.alert.topic,
      criteria: config.alert.criteria,
      frequency: freq,
      practiceAreas: [...config.alert.practiceAreas],
      jurisdictions: [...config.alert.jurisdictions],
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
                {config.scopeText} Found {totalFindings} regulatory updates with {highestImpact} impact items requiring immediate attention.
              </p>

              {/* Top findings mini table */}
              <div className="border border-[#ededed] overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <colgroup>
                    <col className="w-[26%]" />
                    <col className="w-[88px]" />
                    <col />
                    <col className="w-[132px]" />
                  </colgroup>
                  <thead>
                    <tr className="bg-[#f0f2f1]">
                      {['Regulation', 'Impact', 'Why is this relevant?', 'Status'].map((label) => (
                        <th
                          key={label}
                          scope="col"
                          className="px-3 py-2.5 border-b border-[#ededed] text-[14px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.2]"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topFindings.map((finding) => (
                      <tr key={finding.regulation} className="bg-white align-top border-b border-[#ededed] last:border-b-0">
                        <td className="px-3 py-3 text-[14px] font-['Source_Sans_3'] text-[#404040] leading-[1.4]">
                          {finding.regulation}
                        </td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[12px] font-['Source_Sans_3'] leading-[1.2] whitespace-nowrap ${impactColors[finding.impact].bgColor} ${impactColors[finding.impact].textColor}`}>
                            {finding.impact}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <RelevanceText segments={finding.relevance} />
                        </td>
                        <td className="px-3 py-3">
                          <p className="text-[15px] font-['Source_Sans_3'] font-semibold text-[#212223] leading-[1.3]">
                            {finding.status}
                          </p>
                          {finding.statusDate && (
                            <p className="mt-0.5 text-[13px] font-['Source_Sans_3'] text-[#666666] leading-[1.4]">
                              {finding.statusDate}
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                {config.docsText(documentsAffected)}
              </p>
              <FileChipsArea label="Affected documents">
                {visibleDocs.map((doc, idx) => (
                  <li key={doc.name} className="max-w-full">
                    <SupportingDocChip
                      name={doc.name}
                      fileType={doc.fileType}
                      selected={previewIndex === idx}
                      onClick={() => setPreviewIndex(idx)}
                    />
                  </li>
                ))}
                {hiddenDocCount > 0 && (
                  <li>
                    <MoreDocsChip count={hiddenDocCount} onClick={() => setShowAllDocs(true)} />
                  </li>
                )}
              </FileChipsArea>
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
                {config.nextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#1d4b34] shrink-0">•</span>
                    <span>{step}</span>
                  </li>
                ))}
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
              <div className="flex items-center gap-[12px] w-full bg-[#EDF2F0] rounded-[8px] px-[12px] py-[10px]">
                <div className="flex items-center gap-[8px] flex-1 min-w-0">
                  <span className="text-[14px] font-['Source_Sans_3'] text-[#1d4b34] text-pretty">
                    {"You'll get "}
                    <strong className="font-semibold">{`${monitoringFrequency} alerts`}</strong>
                    {' when new changes affect your document. Manage anytime in the '}
                    <Link
                      to="/knowledge"
                      className="inline-flex items-center gap-0.5 font-medium text-[#1d4b34] underline underline-offset-2 hover:text-[#143626] transition-colors"
                    >
                      Knowledge center
                      <ArrowUpRight className="size-3" strokeWidth={2} />
                    </Link>
                    {'.'}
                  </span>
                </div>

                <div className="ml-auto flex items-center gap-[8px] shrink-0">
                  {!showFrequencyChips ? (
                    <button
                      onClick={() => setShowFrequencyChips(true)}
                      className="h-8 px-3 flex items-center bg-white border border-[#8a8a8a] rounded-lg text-[13px] font-['Clario'] font-medium text-[#212223] hover:bg-[#F5F5F5] transition-colors"
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

      <AffectedDocumentPreview
        documents={affectedDocs}
        activeIndex={previewIndex}
        onSelect={setPreviewIndex}
        onClose={closePreview}
      />
    </div>
  );
}
