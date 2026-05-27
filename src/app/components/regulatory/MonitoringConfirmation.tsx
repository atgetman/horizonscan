import { CheckCircle2, ExternalLink } from 'lucide-react';

interface MonitorTopic {
  id: string;
  topic: string;
  jurisdictions: string[];
  frequency: 'real-time' | 'daily' | 'weekly';
}

interface MonitoringConfirmationProps {
  monitors: MonitorTopic[];
  onManage?: () => void;
}

const frequencyLabels = {
  'real-time': 'Real-time',
  'daily': 'Daily',
  'weekly': 'Weekly'
};

export function MonitoringConfirmation({
  monitors,
  onManage
}: MonitoringConfirmationProps) {
  return (
    <div className="my-4">
      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl overflow-hidden">
        <div className="px-4 py-3 flex items-start gap-3">
          <CheckCircle2 className="size-5 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={2} />
          <div className="flex-1 min-w-0">
            <h4 className="text-[14px] font-['Clario'] font-semibold text-[#212223] mb-1">
              Monitoring set up
            </h4>
            <p className="text-[13px] font-['Source_Sans_3'] text-[#666] mb-3">
              You'll receive alerts when new developments are detected
            </p>

            {/* Monitor Cards */}
            <div className="space-y-2 mb-3">
              {monitors.map((monitor) => (
                <div
                  key={monitor.id}
                  className="bg-white border border-[#E5E5E5] rounded-lg p-3"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h5 className="text-[13px] font-['Clario'] font-semibold text-[#212223]">
                      {monitor.topic}
                    </h5>
                    <span className="text-[11px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2 py-0.5 rounded-full shrink-0">
                      {frequencyLabels[monitor.frequency]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {monitor.jurisdictions.map((jurisdiction, idx) => (
                      <span
                        key={idx}
                        className="text-[12px] font-['Source_Sans_3'] text-[#666] bg-[#F9FAFB] px-2 py-0.5 rounded border border-[#E5E5E5]"
                      >
                        {jurisdiction}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            {onManage && (
              <button
                onClick={onManage}
                className="flex items-center gap-1.5 text-[13px] font-['Source_Sans_3'] font-medium text-[#1d4b34] hover:text-[#163f2b] transition-colors"
              >
                Manage in Knowledge
                <ExternalLink className="size-3.5" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
