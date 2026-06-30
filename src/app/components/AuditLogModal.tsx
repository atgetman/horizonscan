import { X, Search, FileText, MessageCircleMore, UserPlus, UserMinus, Shield, Trash2, Edit, Upload, MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface AuditEvent {
  id: string;
  type: 'file_added' | 'file_created' | 'chat_created' | 'comment_added' | 'share_change' | 'access_change' | 'renamed' | 'deleted' | 'permission_changed';
  user: {
    name: string;
    email: string;
    initials: string;
    color: string;
  };
  timestamp: string;
  action: string;
  target?: string;
  details?: string;
}

// Mock audit log data based on CoCounsel functionality
const AUDIT_EVENTS: AuditEvent[] = [
  {
    id: '1',
    type: 'file_created',
    user: { name: 'Emily Chen', email: 'emily@lawfirm.com', initials: 'EC', color: '#3B82F6' },
    timestamp: '2026-03-16T09:23:00',
    action: 'Created document',
    target: 'SEC Comment Response Draft',
    details: 'Generated from chat conversation'
  },
  {
    id: '2',
    type: 'comment_added',
    user: { name: 'Michael Roberts', email: 'michael@lawfirm.com', initials: 'MR', color: '#8B5CF6' },
    timestamp: '2026-03-16T08:45:00',
    action: 'Added comment',
    target: 'Vendor Risk Register',
    details: 'Reviewed the risk table and suggested adding two more vendors'
  },
  {
    id: '3',
    type: 'share_change',
    user: { name: 'Sarah Johnson', email: 'sarah@lawfirm.com', initials: 'SJ', color: '#EC4899' },
    timestamp: '2026-03-16T07:30:00',
    action: 'Shared document',
    target: 'SEC Comment Response Draft',
    details: 'Shared with kevin@lawfirm.com'
  },
  {
    id: '4',
    type: 'file_added',
    user: { name: 'David Kim', email: 'david@lawfirm.com', initials: 'DK', color: '#10B981' },
    timestamp: '2026-03-15T16:15:00',
    action: 'Uploaded file',
    target: 'Cloudspan_Interview_Notes.pdf',
    details: '2.4 MB'
  },
  {
    id: '5',
    type: 'chat_created',
    user: { name: 'Emily Chen', email: 'emily@lawfirm.com', initials: 'EC', color: '#3B82F6' },
    timestamp: '2026-03-15T15:45:00',
    action: 'Started chat',
    target: 'Research on SEC climate rules',
  },
  {
    id: '6',
    type: 'access_change',
    user: { name: 'Sarah Johnson', email: 'sarah@lawfirm.com', initials: 'SJ', color: '#EC4899' },
    timestamp: '2026-03-15T14:30:00',
    action: 'Changed permissions',
    target: 'kevin@lawfirm.com',
    details: 'Updated from Can view to Can edit'
  },
  {
    id: '7',
    type: 'file_created',
    user: { name: 'Michael Roberts', email: 'michael@lawfirm.com', initials: 'MR', color: '#8B5CF6' },
    timestamp: '2026-03-15T13:20:00',
    action: 'Generated table',
    target: 'Vendor Risk Register',
    details: 'Created from document analysis'
  },
  {
    id: '8',
    type: 'renamed',
    user: { name: 'Emily Chen', email: 'emily@lawfirm.com', initials: 'EC', color: '#3B82F6' },
    timestamp: '2026-03-15T11:45:00',
    action: 'Renamed document',
    target: 'SEC Comment Response Draft',
    details: 'From "Untitled Document"'
  },
  {
    id: '9',
    type: 'comment_added',
    user: { name: 'David Kim', email: 'david@lawfirm.com', initials: 'DK', color: '#10B981' },
    timestamp: '2026-03-15T10:30:00',
    action: 'Added comment',
    target: 'SEC Comment Response Draft',
    details: 'Suggested revisions to paragraph 3 regarding emissions metrics'
  },
  {
    id: '10',
    type: 'file_added',
    user: { name: 'Sarah Johnson', email: 'sarah@lawfirm.com', initials: 'SJ', color: '#EC4899' },
    timestamp: '2026-03-14T17:10:00',
    action: 'Uploaded file',
    target: 'contract_v2.docx',
    details: '1.8 MB'
  },
  {
    id: '11',
    type: 'share_change',
    user: { name: 'Emily Chen', email: 'emily@lawfirm.com', initials: 'EC', color: '#3B82F6' },
    timestamp: '2026-03-14T16:00:00',
    action: 'Added team member',
    target: 'alice@lawfirm.com',
    details: 'Granted Can edit access'
  },
  {
    id: '12',
    type: 'deleted',
    user: { name: 'Michael Roberts', email: 'michael@lawfirm.com', initials: 'MR', color: '#8B5CF6' },
    timestamp: '2026-03-14T14:45:00',
    action: 'Deleted chat',
    target: 'Draft outline discussion',
  },
  {
    id: '13',
    type: 'chat_created',
    user: { name: 'David Kim', email: 'david@lawfirm.com', initials: 'DK', color: '#10B981' },
    timestamp: '2026-03-14T13:20:00',
    action: 'Started chat',
    target: 'Summary of vendor interview',
  },
  {
    id: '14',
    type: 'file_created',
    user: { name: 'Emily Chen', email: 'emily@lawfirm.com', initials: 'EC', color: '#3B82F6' },
    timestamp: '2026-03-13T15:30:00',
    action: 'Created document',
    target: 'Memo on Employee Data Privacy',
    details: 'Generated from compliance research'
  },
  {
    id: '15',
    type: 'access_change',
    user: { name: 'Sarah Johnson', email: 'sarah@lawfirm.com', initials: 'SJ', color: '#EC4899' },
    timestamp: '2026-03-13T14:15:00',
    action: 'Changed role',
    target: 'michael@lawfirm.com',
    details: 'Promoted to Admin'
  },
  {
    id: '16',
    type: 'comment_added',
    user: { name: 'Michael Roberts', email: 'michael@lawfirm.com', initials: 'MR', color: '#8B5CF6' },
    timestamp: '2026-03-13T12:00:00',
    action: 'Added comment',
    target: 'Memo on Employee Data Privacy',
    details: 'Added citation for the controlling regulation'
  },
  {
    id: '17',
    type: 'file_added',
    user: { name: 'David Kim', email: 'david@lawfirm.com', initials: 'DK', color: '#10B981' },
    timestamp: '2026-03-13T10:30:00',
    action: 'Uploaded file',
    target: 'data_flow_diagrams.zip',
    details: '15.2 MB'
  },
  {
    id: '18',
    type: 'renamed',
    user: { name: 'Emily Chen', email: 'emily@lawfirm.com', initials: 'EC', color: '#3B82F6' },
    timestamp: '2026-03-12T16:00:00',
    action: 'Renamed chat',
    target: 'Research on SEC climate rules',
    details: 'From "New Chat"'
  }
];

function getEventIcon(type: string) {
  switch (type) {
    case 'file_added':
      return <Upload className="size-3" />;
    case 'file_created':
      return <FileText className="size-3" />;
    case 'chat_created':
      return <MessageCircleMore className="size-3" />;
    case 'comment_added':
      return <MessageSquare className="size-3" />;
    case 'share_change':
      return <UserPlus className="size-3" />;
    case 'access_change':
    case 'permission_changed':
      return <Shield className="size-3" />;
    case 'renamed':
      return <Edit className="size-3" />;
    case 'deleted':
      return <Trash2 className="size-3" />;
    default:
      return <FileText className="size-3" />;
  }
}

function formatTimestamp(timestamp: string): { date: string; time: string; relative: string; fullDate: string } {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  let relative = '';
  if (diffMins < 1) {
    relative = 'Just now';
  } else if (diffMins < 60) {
    relative = `${diffMins}m ago`;
  } else if (diffHours < 24) {
    relative = `${diffHours}h ago`;
  } else if (diffDays === 1) {
    relative = 'Yesterday';
  } else if (diffDays < 7) {
    relative = `${diffDays}d ago`;
  } else {
    relative = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    relative,
    fullDate: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  };
}

interface AuditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

export function AuditLogModal({ isOpen, onClose, projectName }: AuditLogModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter events based on search query
  const filteredEvents = searchQuery
    ? AUDIT_EVENTS.filter(event => 
        event.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.target?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.details?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : AUDIT_EVENTS;

  // Group events by date
  const groupedEvents: { [key: string]: AuditEvent[] } = {};
  filteredEvents.forEach(event => {
    const { fullDate } = formatTimestamp(event.timestamp);
    if (!groupedEvents[fullDate]) {
      groupedEvents[fullDate] = [];
    }
    groupedEvents[fullDate].push(event);
  });

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[10000]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[22px] font-semibold text-gray-900 mb-1">
                Activity log
              </h2>
              <p className="text-[14px] text-gray-500">
                {projectName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Search */}
          <div className="mt-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activity by user, action, or file..."
              className="w-full h-10 pl-10 pr-4 text-[14px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1D4B34] focus:ring-2 focus:ring-[#1D4B34]/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="size-6 text-gray-400" />
              </div>
              <p className="text-[15px] font-medium text-gray-900 mb-1">
                No activity found
              </p>
              <p className="text-[14px] text-gray-500">
                {searchQuery ? `Try adjusting your search for "${searchQuery}"` : 'Activity will appear here as team members interact with the project'}
              </p>
            </div>
          ) : (
            <div className="py-4">
              {Object.entries(groupedEvents).map(([date, events], groupIndex) => (
                <div key={date} className="mb-8 last:mb-4">
                  {/* Date divider */}
                  <div className="relative px-8 mb-4">
                    {/* Vertical line from dot to first event */}
                    <div className="absolute left-[46px] top-1/2 -translate-x-1/2 w-px h-[calc(100%+12px)] bg-gray-200 z-0" />
                    
                    {/* Racing green dot on timeline */}
                    <div className="absolute left-[46px] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[13px] h-[13px] rounded-full bg-[#2a7049] border-[3px] border-white shadow-[0_2px_4px_rgba(0,0,0,0.18)] z-10" />
                    
                    {/* Date pill */}
                    <div className="ml-[42px] inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
                      <span className="text-[12px] font-semibold text-gray-600 uppercase tracking-wider">
                        {date}
                      </span>
                    </div>
                  </div>

                  {/* Events list */}
                  <div className="space-y-1">
                    {events.map((event, eventIndex) => {
                      const { time, relative } = formatTimestamp(event.timestamp);
                      const isLastEventInGroup = eventIndex === events.length - 1;
                      const isLastGroup = groupIndex === Object.entries(groupedEvents).length - 1;
                      const showConnectorToNextGroup = isLastEventInGroup && !isLastGroup;
                      
                      return (
                        <div 
                          key={event.id} 
                          className="group px-8 py-3 hover:bg-gray-50 transition-colors cursor-default relative z-0"
                        >
                          <div className="flex items-start gap-3">
                            {/* Event icon with timeline line */}
                            <div className="relative flex flex-col items-center">
                              <div className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center shrink-0 text-gray-600 z-10 relative">
                                {getEventIcon(event.type)}
                              </div>
                              {/* Vertical timeline line to next event in same group */}
                              {!isLastEventInGroup && (
                                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-px h-[calc(100%+56px)] bg-gray-200 z-10" />
                              )}
                              {/* Vertical timeline line connecting to next date group */}
                              {showConnectorToNextGroup && (
                                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-px h-[calc(100%+180px)] bg-gray-200 z-10" />
                              )}
                            </div>

                            {/* Event details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-[15px] font-semibold text-gray-900">
                                  {event.user.name}
                                </span>
                                <span className="text-[14px] text-gray-600">
                                  {event.action.toLowerCase()}
                                </span>
                                {event.target && (
                                  <span className="text-[14px] font-medium text-gray-900 truncate">
                                    {event.target}
                                  </span>
                                )}
                              </div>
                              {event.details && (
                                <p className="text-[13px] text-gray-500 mb-2 leading-relaxed">
                                  {event.details}
                                </p>
                              )}
                              <div className="flex items-center gap-2 text-[12px] text-gray-400">
                                <span>{relative}</span>
                                <span className="text-gray-300">•</span>
                                <span>{time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-[12px] text-gray-500 text-center">
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
