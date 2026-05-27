import { ChevronDown, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface ScanStep {
  label: string;
  completed: boolean;
}

interface ScanResult {
  id: string;
  regulation: string;
  impact: 'high' | 'medium' | 'low';
  rationale: string;
  docsAffected: number;
  jurisdiction: string;
  effectiveDate: string;
}

interface HorizonScanResultsProps {
  steps: ScanStep[];
  results: ScanResult[];
  onViewDocs?: (resultId: string) => void;
  onCreateMonitor?: (resultId: string) => void;
}

export function HorizonScanResults({
  steps,
  results,
  onViewDocs,
  onCreateMonitor,
}: HorizonScanResultsProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const impactColors = {
    high: 'bg-[#dc2626] text-white',
    medium: 'bg-[#f59e0b] text-white',
    low: 'bg-[#6b7280] text-white',
  };

  return (
    <div className="space-y-4">
      {/* Agentic task card */}
      <div className="border border-[#e5e5e5] rounded-[8px] p-4 bg-white">
        <h4 className="font-['Clario:Medium',sans-serif] text-[14px] text-[#1a1a1a] mb-3">
          Scanning regulatory landscape
        </h4>
        <div className="space-y-2">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2
                className={`w-4 h-4 ${
                  step.completed ? 'text-[#1d4b34]' : 'text-[#d4d4d4]'
                }`}
              />
              <span
                className={`text-[13px] ${
                  step.completed ? 'text-[#525252]' : 'text-[#a3a3a3]'
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Results table */}
      <div className="border border-[#e5e5e5] rounded-[8px] bg-white overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 bg-[#fafafa] border-b border-[#e5e5e5] text-[12px] font-['Clario:Medium',sans-serif] text-[#737373] uppercase tracking-wide">
          <div className="w-6"></div>
          <div>Regulation</div>
          <div>Impact</div>
          <div>Docs</div>
          <div className="w-20"></div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-[#e5e5e5]">
          {results.map((result) => {
            const isExpanded = expandedRows.has(result.id);
            return (
              <div key={result.id}>
                {/* Main row */}
                <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 hover:bg-[#fafafa] transition-colors">
                  <button
                    onClick={() => toggleRow(result.id)}
                    className="flex items-center justify-center"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#737373]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#737373]" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <p className="text-[13px] text-[#1a1a1a] font-['Clario:Medium',sans-serif] truncate">
                      {result.regulation}
                    </p>
                    <p className="text-[12px] text-[#737373] mt-0.5">
                      {result.jurisdiction} • Effective {result.effectiveDate}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-['Clario:Medium',sans-serif] uppercase h-fit ${impactColors[result.impact]}`}
                  >
                    {result.impact}
                  </span>
                  <div className="flex items-center gap-1 text-[13px] text-[#525252]">
                    <FileText className="w-3.5 h-3.5 text-[#737373]" />
                    <span>{result.docsAffected}</span>
                  </div>
                  <button
                    onClick={() => onCreateMonitor?.(result.id)}
                    className="text-[12px] text-[#1d4b34] hover:text-[#123021] font-['Clario:Medium',sans-serif]"
                  >
                    Monitor
                  </button>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-4 pb-4 bg-[#fafafa] space-y-3">
                    <div className="ml-10">
                      <p className="text-[12px] text-[#737373] uppercase tracking-wide font-['Clario:Medium',sans-serif] mb-2">
                        Impact Rationale
                      </p>
                      <p className="text-[13px] text-[#525252] leading-relaxed">
                        {result.rationale}
                      </p>
                    </div>
                    {result.docsAffected > 0 && (
                      <div className="ml-10">
                        <button
                          onClick={() => onViewDocs?.(result.id)}
                          className="text-[13px] text-[#1d4b34] hover:text-[#123021] font-['Clario:Medium',sans-serif] flex items-center gap-1.5"
                        >
                          <FileText className="w-4 h-4" />
                          View affected clauses in {result.docsAffected} document
                          {result.docsAffected !== 1 ? 's' : ''}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
