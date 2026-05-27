import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, MoreVertical, MoreHorizontal, Download, RotateCcw, X } from 'lucide-react';
import { HistoryEvent } from '../data/citationAndHistoryData';

interface HistoryPanelProps {
  history: HistoryEvent[];
  onHistoryClick?: (event: HistoryEvent) => void;
  onClose?: () => void;
}

export function HistoryPanel({ history, onHistoryClick, onClose }: HistoryPanelProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Group history by time periods
  const groupedHistory = React.useMemo(() => {
    const groups: { [key: string]: HistoryEvent[] } = {
      'Today': [],
      'Yesterday': [],
      'Earlier': []
    };

    history.forEach(event => {
      const timestamp = event.timestamp.toLowerCase();
      // Check if timestamp contains "feb 25, 2026" (today) or mentions "today"
      if (timestamp.includes('feb 25, 2026') || timestamp.startsWith('today')) {
        groups['Today'].push(event);
      } else if (timestamp.includes('feb 24, 2026') || timestamp.startsWith('yesterday')) {
        groups['Yesterday'].push(event);
      } else {
        groups['Earlier'].push(event);
      }
    });

    // Remove empty groups
    return Object.entries(groups).filter(([_, events]) => events.length > 0);
  }, [history]);

  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#FCFCFC] w-[350px] border-l border-[#E3E4E6] shadow-xl items-center justify-center text-gray-400 p-8 text-center">
        <History className="size-8 mb-3 opacity-20" />
        <p className="text-sm">No history available for this document.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FCFCFC] w-[350px] border-l border-[#E3E4E6] shadow-xl">
      {/* Header with Title and Close */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#E3E4E6] bg-white">
        <h2 className="text-sm font-semibold text-gray-900">History</h2>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <MoreHorizontal className="size-4 text-gray-600" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Close history panel"
            >
              <X className="size-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {groupedHistory.map(([group, events]) => (
          <div key={group} className="space-y-2">
            {/* Group Header */}
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-1 mb-2">{group}</h4>
            
            {/* History Cards */}
            <div className="space-y-2">
              {events.map((event, index) => {
                const isFirst = history.indexOf(event) === 0; // Check if this is the very first entry overall
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`relative flex items-start gap-3 p-3 bg-white border border-[#E3E4E6] rounded-lg transition-colors group ${
                      event.editId && onHistoryClick ? 'cursor-pointer hover:border-[#de6633] hover:shadow-sm' : 'hover:border-gray-300'
                    }`}
                    onClick={() => {
                      if (event.editId && onHistoryClick) {
                        onHistoryClick(event);
                      }
                    }}
                  >
                    {/* Small Avatar */}
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white font-semibold text-[9px] bg-[#1d4b34]">
                      {event.user.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Full Timestamp as Title with Current Badge */}
                      <div className="flex items-start justify-between mb-[2px]">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[13px] font-semibold text-[#212223]">
                            {event.timestamp}
                          </h4>
                          {isFirst && (
                            <span className="px-1.5 py-0.5 text-[10px] font-semibold text-white bg-[#de6633] rounded">
                              Current
                            </span>
                          )}
                        </div>
                        
                        {/* Ellipsis Menu Button */}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === event.id ? null : event.id);
                            }}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <MoreVertical className="size-4 text-gray-400" />
                          </button>
                        
                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {openMenuId === event.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -5 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#E3E4E6] rounded-lg shadow-lg z-50 py-1"
                            >
                              <button
                                onClick={() => {
                                  console.log('Restore version:', event.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-[#212223] hover:bg-gray-50 flex items-center gap-2"
                              >
                                <RotateCcw className="size-4" />
                                Restore this version
                              </button>
                              <button
                                onClick={() => {
                                  console.log('Download version:', event.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-[#212223] hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Download className="size-4" />
                                Download version
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      </div>
                      
                      {/* Modified by */}
                      <p className="text-[11px] text-gray-500 mb-[2px]">
                        Modified by {event.user === 'CoCounsel' ? <span className="font-medium text-[#de6633]">CoCounsel</span> : event.user}
                      </p>
                      
                      {/* Description */}
                      <p className="text-[12px] text-[#666666] leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}