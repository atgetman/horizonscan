import { FileText, Bell } from 'lucide-react';

interface RegulatorySignalCardProps {
  title: string;
  impact: 'high' | 'medium' | 'low';
  rationale: string;
  docsAffected: number;
  onMonitor?: () => void;
}

export function RegulatorySignalCard({
  title,
  impact,
  rationale,
  docsAffected,
  onMonitor,
}: RegulatorySignalCardProps) {
  const impactColors = {
    high: 'bg-[#dc2626] text-white',
    medium: 'bg-[#f59e0b] text-white',
    low: 'bg-[#6b7280] text-white',
  };

  return (
    <div className="border border-[#e5e5e5] rounded-[8px] p-4 bg-white space-y-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <FileText className="w-5 h-5 text-[#737373]" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-['Clario:Medium',sans-serif] text-[15px] text-[#1a1a1a]">
              {title}
            </h4>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-['Clario:Medium',sans-serif] uppercase tracking-wide ${impactColors[impact]}`}
            >
              {impact} impact
            </span>
          </div>
          
          {/* Rationale */}
          <p className="text-[13px] text-[#525252] leading-relaxed">
            {rationale}
          </p>

          {/* Docs affected */}
          <div className="flex items-center gap-1.5 text-[13px] text-[#737373]">
            <FileText className="w-3.5 h-3.5" />
            <span>{docsAffected} workspace document{docsAffected !== 1 ? 's' : ''} potentially affected</span>
          </div>
        </div>
      </div>

      {/* Monitor prompt */}
      {onMonitor && (
        <div className="pt-2 border-t border-[#f5f5f5]">
          <button
            onClick={onMonitor}
            className="w-full flex items-center justify-between px-3 py-2 rounded-[4px] hover:bg-[#f5f5f5] transition-colors text-left group"
          >
            <span className="text-[13px] text-[#525252] group-hover:text-[#1a1a1a]">
              Monitor this regulation for updates
            </span>
            <Bell className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#1a1a1a]" />
          </button>
        </div>
      )}
    </div>
  );
}
