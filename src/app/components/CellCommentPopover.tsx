import { X, Check, MoreHorizontal, ArrowUp, Smile, AtSign, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { MentionDropdown } from './MentionDropdown';

// Helper function to render text with highlighted mentions
function renderTextWithMentions(text: string) {
  const parts = text.split(/(@\w+(?:\s+\w+)*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('@')) {
      return <span key={idx} className="text-orange-600 font-medium">{part}</span>;
    }
    return <span key={idx}>{part}</span>;
  });
}

interface CellCommentPopoverProps {
  isVisible: boolean;
  onClose: () => void;
  comment: {
    id: string;
    author: string;
    role: string;
    timestamp: string;
    text: string;
    mentions: string[];
    avatar: string;
    avatarColor: string;
    column?: string;
  } | null;
  position?: { x: number; y: number };
}

export function CellCommentPopover({ isVisible, onClose, comment, position }: CellCommentPopoverProps) {
  const [replyText, setReplyText] = useState('');
  const [isReplyFocused, setIsReplyFocused] = useState(false);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset state when popover becomes visible to prevent dropdown from showing
  useEffect(() => {
    if (isVisible) {
      setReplyText('');
      setShowMentionDropdown(false);
      setMentionQuery('');
      setCursorPosition(0);
    }
  }, [isVisible]);

  // Detect @ symbol and show mention dropdown
  useEffect(() => {
    const lastAtIndex = replyText.lastIndexOf('@', cursorPosition);
    if (lastAtIndex !== -1) {
      const textAfterAt = replyText.substring(lastAtIndex + 1, cursorPosition);
      // Check if there's no space after @
      if (!textAfterAt.includes(' ') && textAfterAt.length <= 50) {
        setMentionQuery(textAfterAt);
        setShowMentionDropdown(true);
        
        // Calculate position for dropdown - below the textarea
        if (textareaRef.current) {
          const rect = textareaRef.current.getBoundingClientRect();
          setMentionPosition({
            top: rect.bottom + 4,
            left: rect.left
          });
        }
      } else {
        setShowMentionDropdown(false);
      }
    } else {
      setShowMentionDropdown(false);
    }
  }, [replyText, cursorPosition]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  const handleMentionSelect = (user: { name: string }) => {
    const lastAtIndex = replyText.lastIndexOf('@', cursorPosition);
    const beforeMention = replyText.substring(0, lastAtIndex);
    const afterMention = replyText.substring(cursorPosition);
    const newText = `${beforeMention}@${user.name} ${afterMention}`;
    const newCursorPos = beforeMention.length + user.name.length + 2;
    
    setReplyText(newText);
    setShowMentionDropdown(false);
    setCursorPosition(newCursorPos);
    
    // Focus back on textarea
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleAtButtonClick = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const cursorPos = textarea.selectionStart;
      const beforeCursor = replyText.substring(0, cursorPos);
      const afterCursor = replyText.substring(cursorPos);
      const newText = `${beforeCursor}@${afterCursor}`;
      const newPos = cursorPos + 1;
      
      setReplyText(newText);
      setCursorPosition(newPos);
      setMentionQuery('');
      setShowMentionDropdown(true);
      
      // Calculate position for dropdown - below the textarea
      const rect = textarea.getBoundingClientRect();
      setMentionPosition({
        top: rect.bottom + 4,
        left: rect.left
      });
      
      // Set cursor position after @
      setTimeout(() => {
        textarea.setSelectionRange(newPos, newPos);
        textarea.focus();
      }, 0);
    }
  };

  if (!isVisible || !comment) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 w-[400px] z-50"
        style={{
          top: position?.y || '50%',
          left: position?.x || '50%',
          transform: position ? 'none' : 'translate(-50%, -50%)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">
            {comment.column ? `Comment on ${comment.column}` : 'Comment'}
          </h3>
          <div className="flex items-center gap-1">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <MoreHorizontal className="size-4 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Check className="size-4 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="size-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Comment Content */}
        <div className="px-3 py-3">
          {/* Author Info */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white font-semibold text-xs ${comment.avatarColor}`}>
              {comment.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold text-gray-900">{comment.author}</span>
                <span className="text-xs text-gray-500">({comment.role})</span>
                <span className="text-xs text-gray-400">• {comment.timestamp}</span>
              </div>
            </div>
            <button className="p-0.5 hover:bg-gray-100 rounded transition-colors">
              <MoreHorizontal className="size-4 text-gray-600" />
            </button>
          </div>

          {/* Comment Text */}
          <div className="text-[13px] text-gray-700 leading-relaxed mb-3.5 pl-8">
            {renderTextWithMentions(comment.text)}
          </div>

          {/* Reply Input */}
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white font-semibold text-xs mt-2 bg-teal-600">
              B
            </div>
            <div className="flex-1 relative">
              <div className="relative border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <textarea
                  ref={textareaRef}
                  placeholder="Reply"
                  value={replyText}
                  onChange={handleTextChange}
                  onFocus={() => setIsReplyFocused(true)}
                  onBlur={() => {
                    // Delay to allow clicking buttons
                    setTimeout(() => setIsReplyFocused(false), 200);
                  }}
                  onClick={(e) => setCursorPosition(e.currentTarget.selectionStart)}
                  onKeyUp={(e) => setCursorPosition(e.currentTarget.selectionStart)}
                  rows={isReplyFocused ? 3 : 1}
                  className="w-full px-3 py-2 text-[13px] bg-transparent border-none focus:outline-none resize-none"
                  style={{ minHeight: isReplyFocused ? '80px' : '36px' }}
                />
                
                {/* Integrated toolbar */}
                {isReplyFocused && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center justify-between px-2 py-1.5 border-t border-gray-200"
                  >
                    <div className="flex items-center gap-0.5">
                      <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                        <Smile className="size-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={handleAtButtonClick}
                        className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                      >
                        <AtSign className="size-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                        <Image className="size-4 text-gray-600" />
                      </button>
                    </div>
                    <button 
                      className="p-1.5 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!replyText.trim()}
                    >
                      <ArrowUp className="size-3.5 text-white" />
                    </button>
                  </motion.div>
                )}
              </div>
              
              {/* Mention Dropdown */}
              {showMentionDropdown && (
                <MentionDropdown
                  searchQuery={mentionQuery}
                  onSelect={handleMentionSelect}
                  position={mentionPosition}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}