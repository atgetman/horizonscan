import { useState } from 'react';
import { X, ExternalLink, Download, FileText } from 'lucide-react';
import { Toggle } from '../ui/Toggle';

export interface MonitoringResult {
  id: string;
  monitorId: string;
  monitorTopic: string;
  scanDate: string;
  findings: MonitoringFinding[];
}

export interface MonitoringFinding {
  id: string;
  type: 'case' | 'regulation' | 'guidance' | 'statute';
  title: string;
  jurisdiction: string;
  date: string;
  summary: string;
  keyPoints: string[];
  citation?: string;
  url?: string;
  relevanceScore: number;
}

interface MonitoringResultsViewerProps {
  isOpen: boolean;
  onClose: () => void;
  result: MonitoringResult | null;
}

export function MonitoringResultsViewer({
  isOpen,
  onClose,
  result,
}: MonitoringResultsViewerProps) {
  const [filterType, setFilterType] = useState<string>('all');

  if (!isOpen || !result) return null;

  const filteredFindings = filterType === 'all'
    ? result.findings
    : result.findings.filter(f => f.type === filterType);

  const handleExport = () => {
    const exportData = {
      monitor: result.monitorTopic,
      scanDate: result.scanDate,
      findings: result.findings,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monitoring-results-${result.scanDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h2 className="text-[20px] font-['Clario'] font-semibold text-[#212223]">
                Monitoring results
              </h2>
              <p className="text-[16px] font-['Source_Sans_3'] font-normal text-[#212223] mt-1">
                {result.monitorTopic} • Scanned {result.scanDate}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-1.5 text-[14px] font-['Clario'] font-medium text-[#212223] hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Download className="size-4" />
                Export
              </button>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
                <X className="size-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 pb-6">
          <Toggle
            value={filterType}
            onChange={(value) => setFilterType(value)}
            options={[
              { value: 'all', label: `All (${result.findings.length})` },
              { value: 'case', label: `Cases (${result.findings.filter(f => f.type === 'case').length})` },
              { value: 'regulation', label: `Regulations (${result.findings.filter(f => f.type === 'regulation').length})` },
              { value: 'guidance', label: `Guidance (${result.findings.filter(f => f.type === 'guidance').length})` },
            ]}
          />
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-4">
            {filteredFindings.map((finding) => (
              <div
                key={finding.id}
                className="bg-white border border-[#e5e5e5] rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-0.5 rounded-full capitalize">
                        {finding.type}
                      </span>
                      <span className="text-[13px] font-['Source_Sans_3'] text-[#666]">
                        {finding.jurisdiction}
                      </span>
                      <span className="text-[13px] text-[#666]">•</span>
                      <span className="text-[13px] font-['Source_Sans_3'] text-[#666]">
                        {finding.date}
                      </span>
                      {finding.relevanceScore >= 80 && (
                        <>
                          <span className="text-[13px] text-[#666]">•</span>
                          <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-0.5 rounded-full">
                            High relevance
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-[15px] font-['Clario'] font-semibold text-[#212223] leading-tight mb-2">
                      {finding.title}
                    </h3>
                    {finding.citation && (
                      <p className="text-[13px] font-['Source_Sans_3'] text-[#666] mb-3">
                        {finding.citation}
                      </p>
                    )}
                  </div>
                  {finding.url && (
                    <a
                      href={finding.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <ExternalLink className="size-4 text-[#666]" />
                    </a>
                  )}
                </div>

                {/* Summary */}
                <p className="text-[13px] font-['Source_Sans_3'] text-gray-500 leading-relaxed mb-3">
                  {finding.summary}
                </p>

                {/* Key Points */}
                {finding.keyPoints.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#e5e5e5]">
                    <p className="text-[13px] font-['Source_Sans_3'] font-semibold text-[#212223] mb-2">
                      Key points:
                    </p>
                    <ul className="space-y-1.5">
                      {finding.keyPoints.map((point, idx) => (
                        <li key={idx} className="text-[13px] font-['Source_Sans_3'] text-gray-500 flex gap-2">
                          <span className="text-[#1d4b34] shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {filteredFindings.length === 0 && (
              <div className="text-center py-12">
                <FileText className="size-12 text-gray-300 mx-auto mb-3" />
                <p className="text-[14px] font-['Source_Sans_3'] text-[#666]">
                  No {filterType !== 'all' ? filterType + 's' : 'results'} found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
