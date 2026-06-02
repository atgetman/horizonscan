import { ExternalLink, Clock, X } from 'lucide-react';
import { clsx } from 'clsx';

export type AlertCategory = 'regulatory' | 'deadline' | 'contract';

export interface FiredAlert {
  id: string;
  category: AlertCategory;
  title: string;
  body: string;
  sourceType: string;
  matterName: string;
  topic: string;
  matterPath: string;
  timestamp: string; // ISO string
  isRead: boolean;
}

interface AlertFeedCardProps {
  alert: FiredAlert;
  onReview: (alert: FiredAlert) => void;
  onDismiss: (id: string) => void;
  onSnooze: (id: string) => void;
}

const CATEGORY_ACCENT: Record<AlertCategory, string> = {
  regulatory: 'border-l-[#DE6633]',
  deadline: 'border-l-[#dc2626]',
  contract: 'border-l-[#2563eb]',
};

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  const weeks = Math.round(days / 7);
  return `${weeks}w ago`;
}

export function AlertFeedCard({ alert, onReview, onDismiss, onSnooze }: AlertFeedCardProps) {
  return (
    <div
      className={clsx(
        'bg-white relative rounded-lg border border-[#e5e5e5] border-l-4 p-4 hover:border-gray-300 hover:shadow-sm transition-all',
        CATEGORY_ACCENT[alert.category]
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {!alert.isRead && <div className="size-2 rounded-full bg-[#DE6633] shrink-0" />}
          <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight">
            {alert.title}
          </h3>
        </div>
        <span className="text-[13px] font-['Source_Sans_3'] font-normal text-[#8A8A8A] whitespace-nowrap shrink-0">
          {relativeTime(alert.timestamp)}
        </span>
      </div>

      <p className="text-[13px] font-['Source_Sans_3'] font-normal text-gray-500 mt-1 mb-3 leading-[1.4]">
        {alert.body}
      </p>

      <div className="flex flex-wrap gap-1.5 items-center mb-3">
        {[alert.sourceType, alert.matterName, alert.topic].map((tag, i) => (
          <span
            key={i}
            className="text-[12px] font-['Source_Sans_3'] font-medium text-[#666] bg-[#f0f2f1] px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onReview(alert)}
          className="h-8 px-3 flex items-center gap-1.5 bg-[#314b3e] rounded-lg text-[13px] font-['Clario'] font-medium text-white hover:bg-[#3d5e4d] transition-colors"
        >
          Review
          <ExternalLink className="size-3.5" strokeWidth={2} />
        </button>
        <button
          onClick={() => onSnooze(alert.id)}
          className="h-8 px-3 flex items-center gap-1.5 rounded-lg text-[13px] font-['Source_Sans_3'] font-medium text-[#666] hover:bg-gray-100 transition-colors"
        >
          <Clock className="size-3.5" strokeWidth={1.5} />
          Snooze
        </button>
        <button
          onClick={() => onDismiss(alert.id)}
          className="h-8 px-3 flex items-center gap-1.5 rounded-lg text-[13px] font-['Source_Sans_3'] font-medium text-[#666] hover:bg-gray-100 transition-colors"
        >
          <X className="size-3.5" strokeWidth={1.5} />
          Dismiss
        </button>
      </div>
    </div>
  );
}
