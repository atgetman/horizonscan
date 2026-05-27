import { useState } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';

interface RegulatoryFinding {
  id: string;
  source: string;
  sourceUrl: string;
  type: 'TR Product' | 'Reuters News' | 'Web Source';
  summary: string;
  rationale: string;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  relevance: number; // 0-100
  complianceDeadline: string;
}

interface RegulatoryFindingsTableProps {
  findings: RegulatoryFinding[];
  onSaveAsAlert?: () => void;
  onSaveScan?: () => void;
}

const impactConfig = {
  Critical: {
    bgColor: 'bg-[#FEE2E2]',
    textColor: 'text-[#991B1B]',
    borderColor: 'border-[#FCA5A5]'
  },
  High: {
    bgColor: 'bg-[#FEF3C7]',
    textColor: 'text-[#92400E]',
    borderColor: 'border-[#FCD34D]'
  },
  Medium: {
    bgColor: 'bg-[#DBEAFE]',
    textColor: 'text-[#1E40AF]',
    borderColor: 'border-[#93C5FD]'
  },
  Low: {
    bgColor: 'bg-[#F3F4F6]',
    textColor: 'text-[#4B5563]',
    borderColor: 'border-[#D1D5DB]'
  }
};

const typeConfig = {
  'TR Product': {
    bgColor: 'bg-[#E8F2ED]',
    textColor: 'text-[#1d4b34]'
  },
  'Reuters News': {
    bgColor: 'bg-[#FFF7ED]',
    textColor: 'text-[#C2410C]'
  },
  'Web Source': {
    bgColor: 'bg-[#F3F4F6]',
    textColor: 'text-[#4B5563]'
  }
};

export function RegulatoryFindingsTable({ findings, onSaveAsAlert, onSaveScan }: RegulatoryFindingsTableProps) {
  const [impactFilter, setImpactFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('impact');

  const filteredFindings = findings.filter(f =>
    impactFilter === 'all' || f.impact === impactFilter
  ).sort((a, b) => {
    if (sortBy === 'impact') {
      const impactOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      return impactOrder[a.impact] - impactOrder[b.impact];
    } else if (sortBy === 'relevance') {
      return b.relevance - a.relevance;
    } else if (sortBy === 'deadline') {
      return new Date(a.complianceDeadline).getTime() - new Date(b.complianceDeadline).getTime();
    }
    return 0;
  });

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
      {/* Filter Bar */}
      <div className="px-4 py-3 border-b border-[#E5E5E5] bg-[#F9FAFB] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={impactFilter}
              onChange={(e) => setImpactFilter(e.target.value)}
              className="appearance-none bg-white border border-[#E5E5E5] rounded-md px-3 py-1.5 pr-8 text-[13px] font-['Source_Sans_3'] text-[#212223] cursor-pointer hover:border-[#8a8a8a] transition-colors"
            >
              <option value="all">All Impact Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-[#666] pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#E5E5E5] rounded-md px-3 py-1.5 pr-8 text-[13px] font-['Source_Sans_3'] text-[#212223] cursor-pointer hover:border-[#8a8a8a] transition-colors"
            >
              <option value="impact">Sort by Impact</option>
              <option value="relevance">Sort by Relevance</option>
              <option value="deadline">Sort by Deadline</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-[#666] pointer-events-none" />
          </div>

          <span className="text-[13px] font-['Source_Sans_3'] text-[#666]">
            {filteredFindings.length} {filteredFindings.length === 1 ? 'result' : 'results'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onSaveAsAlert && (
            <button
              onClick={onSaveAsAlert}
              className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all"
            >
              Save as alert
            </button>
          )}
          {onSaveScan && (
            <button
              onClick={onSaveScan}
              className="h-[24px] px-[8px] py-[4px] flex items-center gap-1.5 text-[14px] font-['Clario'] font-medium text-[#1d4b34] rounded-[4px] border border-transparent hover:bg-[#edf2f0] hover:border-[#8a8a8a] transition-all"
            >
              Save scan
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E5E5]">
              <th className="text-left px-4 py-3 text-[12px] font-['Source_Sans_3'] font-semibold text-[#666] uppercase tracking-wide">
                Source
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-['Source_Sans_3'] font-semibold text-[#666] uppercase tracking-wide">
                Type
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-['Source_Sans_3'] font-semibold text-[#666] uppercase tracking-wide">
                Summary & Rationale
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-['Source_Sans_3'] font-semibold text-[#666] uppercase tracking-wide">
                Impact
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-['Source_Sans_3'] font-semibold text-[#666] uppercase tracking-wide">
                Relevance
              </th>
              <th className="text-left px-4 py-3 text-[12px] font-['Source_Sans_3'] font-semibold text-[#666] uppercase tracking-wide">
                Compliance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5]">
            {filteredFindings.map((finding) => {
              const impactStyle = impactConfig[finding.impact];
              const typeStyle = typeConfig[finding.type];

              return (
                <tr key={finding.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-3">
                    <a
                      href={finding.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[14px] font-['Source_Sans_3'] text-[#1d4b34] hover:underline"
                    >
                      <span>{finding.source}</span>
                      <ExternalLink className="size-3 shrink-0" />
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-[11px] font-['Source_Sans_3'] font-semibold ${typeStyle.bgColor} ${typeStyle.textColor}`}>
                      {finding.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-md">
                    <div className="text-[14px] font-['Source_Sans_3'] text-[#212223] font-semibold mb-1">
                      {finding.summary}
                    </div>
                    <div className="text-[13px] font-['Source_Sans_3'] text-[#666] italic">
                      {finding.rationale}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-[11px] font-['Source_Sans_3'] font-semibold border ${impactStyle.bgColor} ${impactStyle.textColor} ${impactStyle.borderColor}`}>
                      {finding.impact}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1d4b34] rounded-full transition-all"
                          style={{ width: `${finding.relevance}%` }}
                        />
                      </div>
                      <span className="text-[13px] font-['Source_Sans_3'] text-[#666] min-w-[3ch]">
                        {finding.relevance}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[14px] font-['Source_Sans_3'] text-[#212223]">
                      {finding.complianceDeadline}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
