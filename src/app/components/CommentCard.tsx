import { MoreHorizontal } from 'lucide-react';

export interface CommentCardProps {
  id: string;
  author: string;
  role?: string;
  timestamp: string;
  text: string;
  mentions?: string[];
  avatar?: string;
  avatarColor?: string;
  avatars?: string[];
  number?: number;
  document?: string;
  column?: string;
  replyCount?: number;
  showLocationLine?: boolean;
  showUnreadIndicator?: boolean;
  onClick?: () => void;
}

// Helper function to render text with highlighted mentions
function renderTextWithMentions(text: string, mentions: string[] = []) {
  if (!mentions || mentions.length === 0) {
    return text;
  }
  
  const parts = text.split(/(@\w+(?:\s+\w+)*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('@')) {
      return <span key={idx} className="text-orange-600 font-medium">{part}</span>;
    }
    return <span key={idx}>{part}</span>;
  });
}

export function CommentCard({
  author,
  role,
  timestamp,
  text,
  mentions = [],
  avatar,
  avatarColor = 'bg-[#1d4b34]',
  avatars,
  number,
  document,
  column,
  replyCount,
  showLocationLine = true,
  showUnreadIndicator = false,
  onClick
}: CommentCardProps) {
  return (
    <div 
      className="px-4 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
      onClick={onClick}
    >
      {/* Avatar and Author */}
      <div className="flex items-center gap-2 mb-2">
        {/* Avatar */}
        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white font-semibold text-[9px] ${avatarColor}`}>
          {avatar || author.charAt(0)}
        </div>
        
        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {/* Unread Indicator */}
            {showUnreadIndicator && number === 4 && (
              <div className="size-2 bg-teal-500 rounded-full flex-shrink-0" />
            )}
            <span className="text-xs font-semibold text-gray-900">{author}</span>
            <span className="text-xs text-gray-400">• {timestamp}</span>
          </div>
        </div>
        
        {/* More Options */}
        <button 
          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MoreHorizontal className="size-4 text-gray-600" />
        </button>
      </div>

      {/* Document/Column Reference Line (for spreadsheet type) */}
      {showLocationLine && document && column && (
        <div className="mb-1.5 flex items-start gap-2">
          <div className="w-6 shrink-0"></div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className="truncate">{document}</span>
            <span className="shrink-0">/</span>
            <span className="truncate">{column} column</span>
          </div>
        </div>
      )}

      {/* Comment Text with Mentions */}
      <div className="flex items-start gap-2">
        <div className="w-6 shrink-0"></div>
        <div className="flex-1 min-w-0 text-[13px] text-gray-700 leading-relaxed">
          {renderTextWithMentions(text, mentions)}
        </div>
      </div>

      {/* Reply Count */}
      {replyCount && replyCount > 0 && (
        <div className="mt-2 flex items-start gap-2">
          <div className="w-6 shrink-0"></div>
          <div className="flex-1">
            <button className="text-xs text-blue-600 hover:underline font-medium">
              {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}