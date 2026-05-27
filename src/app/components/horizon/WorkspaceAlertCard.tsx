import { X, Bell, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface RegulatoryChange {
  title: string;
  docsAffected: number;
  impact: 'high' | 'medium' | 'low';
}

interface WorkspaceAlertCardProps {
  changes: RegulatoryChange[];
  onDismiss?: () => void;
  onViewDetails?: () => void;
}

export function WorkspaceAlertCard({
  changes,
  onDismiss,
  onViewDetails,
}: WorkspaceAlertCardProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (isDismissed) return null;

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    onDismiss?.();
  };

  const impactColors = {
    high: 'text-[#dc2626]',
    medium: 'text-[#f59e0b]',
    low: 'text-[#737373]',
  };

  const totalDocs = changes.reduce((sum, c) => sum + c.docsAffected, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Collapsed header - clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <Bell className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
          <span className="text-[14px] text-[#474747] font-['Source_Sans_3'] font-normal">
            {changes.length} regulatory change{changes.length !== 1 ? 's' : ''} detected
          </span>
          <span className="text-[13px] text-[#666666]">
            · {totalDocs} doc{totalDocs !== 1 ? 's' : ''} affected
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-[#666666]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[#666666]" />
          )}
          <button
            onClick={handleDismiss}
            className="p-0.5 hover:bg-gray-200 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5 text-[#666666]" />
          </button>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-3 pt-1 border-t border-gray-100">
          <div className="space-y-2 mb-3">
            {changes.map((change, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 text-[13px]"
              >
                <p className="text-[#474747] flex-1 min-w-0">
                  {change.title}
                </p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[#666666] text-[12px]">
                    {change.docsAffected} doc{change.docsAffected !== 1 ? 's' : ''}
                  </span>
                  <span className={`text-[11px] font-medium uppercase ${impactColors[change.impact]}`}>
                    {change.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="flex items-center gap-1.5 text-[#666666] hover:text-[#212223] transition-colors text-[13px] font-['Source_Sans_3'] font-normal"
            >
              <span>Review changes</span>
              <ChevronRight className="size-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}