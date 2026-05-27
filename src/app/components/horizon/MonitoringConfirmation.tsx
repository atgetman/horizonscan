import { CheckCircle2, ExternalLink } from 'lucide-react';

interface MonitorTopic {
  id: string;
  title: string;
  topics: string[];
  jurisdiction: string;
  frequency: 'daily' | 'weekly' | 'monthly';
}

interface MonitoringConfirmationProps {
  monitors: MonitorTopic[];
  onManageInKnowledge?: () => void;
}

export function MonitoringConfirmation({
  monitors,
  onManageInKnowledge,
}: MonitoringConfirmationProps) {
  const frequencyLabels = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
  };

  return (
    <div className="space-y-3">
      {monitors.map((monitor) => (
        <div
          key={monitor.id}
          className="border border-[#e5e5e5] rounded-[8px] p-4 bg-white"
        >
          {/* Header with checkmark */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-5 h-5 rounded-full bg-[#1d4b34] flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-['Clario:Medium',sans-serif] text-[14px] text-[#1a1a1a]">
                Monitoring: {monitor.title}
              </h4>
              <p className="text-[12px] text-[#737373] mt-1">
                {frequencyLabels[monitor.frequency]} updates
              </p>
            </div>
          </div>

          {/* Inferred topics */}
          <div className="ml-8 space-y-2">
            <p className="text-[11px] text-[#737373] uppercase tracking-wide font-['Clario:Medium',sans-serif]">
              Topics
            </p>
            <div className="flex flex-wrap gap-1.5">
              {monitor.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-[#f5f5f5] text-[#525252] text-[12px] rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* Jurisdiction */}
            <div className="pt-1">
              <span className="text-[12px] text-[#737373]">
                Jurisdiction: <span className="text-[#1a1a1a]">{monitor.jurisdiction}</span>
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Footer CTA */}
      {onManageInKnowledge && (
        <button
          onClick={onManageInKnowledge}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#e5e5e5] rounded-[8px] hover:bg-[#fafafa] transition-colors"
        >
          <span className="text-[13px] font-['Clario:Medium',sans-serif] text-[#1a1a1a]">
            Manage in Knowledge
          </span>
          <ExternalLink className="w-4 h-4 text-[#737373]" />
        </button>
      )}
    </div>
  );
}
