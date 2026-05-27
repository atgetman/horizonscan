import { TrendingUp, FileText, Bell } from 'lucide-react';

interface RegulatorySignalCardProps {
  title: string;
  impact: 'high' | 'medium' | 'low';
  rationale: string;
  docsAffected: number;
  monitorPrompt: string;
  onMonitor?: () => void;
}

const impactConfig = {
  high: {
    label: 'High impact',
    bgColor: 'bg-[#FEE2E2]',
    textColor: 'text-[#991B1B]',
    borderColor: 'border-[#FCA5A5]'
  },
  medium: {
    label: 'Medium impact',
    bgColor: 'bg-[#FEF3C7]',
    textColor: 'text-[#92400E]',
    borderColor: 'border-[#FCD34D]'
  },
  low: {
    label: 'Low impact',
    bgColor: 'bg-[#DBEAFE]',
    textColor: 'text-[#1E40AF]',
    borderColor: 'border-[#93C5FD]'
  }
};

export function RegulatorySignalCard({
  title,
  impact,
  rationale,
  docsAffected,
  monitorPrompt,
  onMonitor
}: RegulatorySignalCardProps) {
  const config = impactConfig[impact];

  return (
    <div className="bg-[#FFF9F5] border border-[#FFE5D3] rounded-xl p-4 my-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex items-center justify-center shrink-0 pt-0.5">
          <TrendingUp className="size-5 text-[#DE6633]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <h3 className="text-[15px] font-['Clario'] font-semibold text-[#212223] flex-1">
              {title}
            </h3>
            <span className={`text-[11px] font-['Source_Sans_3'] font-semibold px-2 py-0.5 rounded-full ${config.bgColor} ${config.textColor} border ${config.borderColor} shrink-0`}>
              {config.label}
            </span>
          </div>
          <p className="text-[13px] font-['Source_Sans_3'] text-gray-600 mb-3 leading-relaxed">
            {rationale}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="size-3.5 text-[#666]" strokeWidth={1.5} />
            <span className="text-[13px] font-['Source_Sans_3'] text-[#666]">
              {docsAffected} {docsAffected === 1 ? 'document' : 'documents'} in this workspace may be affected
            </span>
          </div>
          <div className="pt-3 border-t border-[#FFE5D3]">
            <button
              onClick={onMonitor}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white hover:bg-[#FFF9F5] border border-[#FFE5D3] rounded-lg transition-colors text-left group"
            >
              <div className="flex items-center gap-2">
                <Bell className="size-3.5 text-[#DE6633]" strokeWidth={1.5} />
                <span className="text-[13px] font-['Source_Sans_3'] text-[#212223]">
                  {monitorPrompt}
                </span>
              </div>
              <span className="text-[13px] font-['Source_Sans_3'] text-[#DE6633] opacity-0 group-hover:opacity-100 transition-opacity">
                Set up →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
