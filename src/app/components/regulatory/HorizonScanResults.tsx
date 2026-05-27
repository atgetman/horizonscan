import { useState } from 'react';
import { Search, FileText, ChevronDown, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';

interface ScanStep {
  id: string;
  label: string;
  status: 'completed' | 'in-progress' | 'pending';
}

interface RegulatoryChange {
  id: string;
  regulation: string;
  jurisdiction: string;
  effectiveDate: string;
  impact: 'high' | 'medium' | 'low';
  rationale: string;
  docsAffected: number;
  suggestedAction: string;
}

interface HorizonScanResultsProps {
  steps: ScanStep[];
  changes: RegulatoryChange[];
  onViewDetails?: (changeId: string) => void;
}

const impactConfig = {
  high: {
    label: 'High',
    bgColor: 'bg-[#FEE2E2]',
    textColor: 'text-[#991B1B]',
    borderColor: 'border-[#FCA5A5]'
  },
  medium: {
    label: 'Medium',
    bgColor: 'bg-[#FEF3C7]',
    textColor: 'text-[#92400E]',
    borderColor: 'border-[#FCD34D]'
  },
  low: {
    label: 'Low',
    bgColor: 'bg-[#DBEAFE]',
    textColor: 'text-[#1E40AF]',
    borderColor: 'border-[#93C5FD]'
  }
};

export function HorizonScanResults({ steps, changes, onViewDetails }: HorizonScanResultsProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="my-4">
      {/* Agentic Task Card - only show if steps are provided */}
      {steps.length > 0 && (
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <Search className="size-5 text-[#1d4b34] shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex-1">
              <h3 className="text-[15px] font-['Clario'] font-semibold text-[#212223] mb-1">
                Regulatory horizon scan
              </h3>
              <p className="text-[13px] font-['Source_Sans_3'] text-[#666]">
                Scanning for regulatory changes that may affect your workspace
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                {step.status === 'completed' && (
                  <CheckCircle2 className="size-4 text-[#1d4b34]" strokeWidth={2} />
                )}
                {step.status === 'in-progress' && (
                  <Loader2 className="size-4 text-[#1d4b34] animate-spin" strokeWidth={2} />
                )}
                {step.status === 'pending' && (
                  <div className="size-4 rounded-full border-2 border-gray-300" />
                )}
                <span className={`text-[13px] font-['Source_Sans_3'] ${
                  step.status === 'completed' ? 'text-[#666]' : 'text-[#212223]'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Table */}
      {changes.length > 0 && (
        <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E5E5E5] bg-[#F9FAFB]">
            <h4 className="text-[14px] font-['Clario'] font-semibold text-[#212223]">
              {changes.length} regulatory {changes.length === 1 ? 'change' : 'changes'} detected
            </h4>
          </div>

          <div className="divide-y divide-[#E5E5E5]">
            {changes.map((change) => {
              const config = impactConfig[change.impact];
              const isExpanded = expandedRows.has(change.id);

              return (
                <div key={change.id}>
                  <button
                    onClick={() => toggleRow(change.id)}
                    className="w-full px-4 py-3 hover:bg-[#F9FAFB] transition-colors text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-1">
                        {isExpanded ? (
                          <ChevronDown className="size-4 text-[#666]" strokeWidth={2} />
                        ) : (
                          <ChevronRight className="size-4 text-[#666]" strokeWidth={2} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h5 className="text-[14px] font-['Clario'] font-semibold text-[#212223]">
                            {change.regulation}
                          </h5>
                          <span className={`text-[11px] font-['Source_Sans_3'] font-semibold px-2 py-0.5 rounded-full ${config.bgColor} ${config.textColor} border ${config.borderColor} shrink-0`}>
                            {config.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] font-['Source_Sans_3'] text-[#666]">
                          <span>{change.jurisdiction}</span>
                          <span>•</span>
                          <span>Effective {change.effectiveDate}</span>
                          <span>•</span>
                          <span>{change.docsAffected} docs affected</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pl-11 bg-[#F9FAFB]">
                      <div className="space-y-3">
                        <div>
                          <div className="text-[12px] font-['Source_Sans_3'] font-semibold text-[#666] mb-1">
                            Impact rationale
                          </div>
                          <p className="text-[13px] font-['Source_Sans_3'] text-[#212223] leading-relaxed">
                            {change.rationale}
                          </p>
                        </div>
                        <div>
                          <div className="text-[12px] font-['Source_Sans_3'] font-semibold text-[#666] mb-1">
                            Suggested action
                          </div>
                          <p className="text-[13px] font-['Source_Sans_3'] text-[#212223] leading-relaxed">
                            {change.suggestedAction}
                          </p>
                        </div>
                        {onViewDetails && (
                          <button
                            onClick={() => onViewDetails(change.id)}
                            className="flex items-center gap-1.5 text-[13px] font-['Source_Sans_3'] font-medium text-[#1d4b34] hover:text-[#163f2b] transition-colors"
                          >
                            <FileText className="size-3.5" strokeWidth={2} />
                            View affected clauses
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
