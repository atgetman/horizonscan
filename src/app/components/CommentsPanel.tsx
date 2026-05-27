import { Search, MoreHorizontal, ListFilter, X } from 'lucide-react';
import { CommentCard, CommentCardProps } from './CommentCard';

export interface Comment {
  id: string;
  // For spreadsheets
  document?: string;
  column?: string;
  // For documents
  number?: number;
  scope?: string;
  // Common fields
  author: string;
  role: string;
  timestamp: string;
  text: string;
  mentions: string[];
  replyCount?: number;
  avatar?: string;
  avatarColor?: string;
  avatars?: string[];
}

interface CommentsPanelProps {
  isOpen: boolean;
  comments: Comment[];
  onCommentClick?: (comment: Comment) => void;
  onClose?: () => void;
  type: 'document' | 'spreadsheet';
  title?: string;
}

export function CommentsPanel({ 
  isOpen, 
  comments, 
  onCommentClick, 
  onClose,
  type,
  title = 'Comments'
}: CommentsPanelProps) {
  if (!isOpen) return null;

  const handleCommentClick = (comment: Comment) => {
    if (onCommentClick) {
      onCommentClick(comment);
    }
  };

  const isSpreadsheet = type === 'spreadsheet';

  return (
    <div className="flex flex-col h-full bg-[#FCFCFC] w-[350px] border-l border-[#E3E4E6] shadow-xl">
      {/* Header with Title and Close */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#E3E4E6] bg-white">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <MoreHorizontal className="size-4 text-gray-600" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Close comments panel"
            >
              <X className="size-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 py-3 border-b border-[#E3E4E6] bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-12 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <ListFilter className="size-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            id={comment.id}
            author={comment.author}
            role={comment.role}
            timestamp={comment.timestamp}
            text={comment.text}
            mentions={comment.mentions}
            avatar={comment.avatar}
            avatarColor={comment.avatarColor}
            number={comment.number}
            document={comment.document}
            column={comment.column}
            replyCount={comment.replyCount}
            showLocationLine={isSpreadsheet}
            showUnreadIndicator={!isSpreadsheet && comment.number === 4}
            onClick={() => handleCommentClick(comment)}
          />
        ))}
      </div>
    </div>
  );
}