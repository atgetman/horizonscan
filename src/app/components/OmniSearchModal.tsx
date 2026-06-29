import { useState, useEffect, useRef } from "react";
import { Search, X, FileText, MessageCircleMore, Folder, Table, ArrowRight, Upload, User, Bot, SquareArrowOutUpRight, FolderInput, Share, Edit, Eye, MoreHorizontal, Sparkles } from "lucide-react";
import svgPaths from "../../imports/svg-1wkqh0ufu9";
import { useNavigate } from "react-router";
import { clsx } from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MOCK_RESULTS, SearchResult } from "./OmniSearchModalData";

type FilterType = 'all' | 'chats' | 'outputs' | 'workspaces' | 'files';

interface OmniSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OmniSearchModal({ isOpen, onClose }: OmniSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>(MOCK_RESULTS);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(MOCK_RESULTS);
  const [previewedResult, setPreviewedResult] = useState<SearchResult | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    // Parse "April 12, 2024 at 3:42 PM" to "Apr 12, 3:42 PM"
    const match = dateStr.match(/(\w+)\s+(\d+),\s+\d+\s+at\s+(.+)/);
    if (match) {
      const [, month, day, time] = match;
      const shortMonth = month.slice(0, 3);
      return `${shortMonth} ${day}, ${time}`;
    }
    return dateStr;
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults(MOCK_RESULTS);
    } else {
      const filtered = MOCK_RESULTS.filter((result) =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.preview?.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.workspace?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(0);
    }
  }, [searchQuery]);

  // Apply filter
  useEffect(() => {
    let filtered = results;
    
    switch (activeFilter) {
      case 'chats':
        filtered = results.filter(r => r.type === 'chat');
        break;
      case 'outputs':
        filtered = results.filter(r => r.type === 'artifact' || r.type === 'document');
        break;
      case 'workspaces':
        filtered = results.filter(r => r.type === 'workspace');
        break;
      case 'files':
        filtered = results.filter(r => r.type === 'file' || r.type === 'table');
        break;
      default:
        filtered = results;
    }
    
    setFilteredResults(filtered);
    setSelectedIndex(0);
  }, [results, activeFilter]);


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      handleNavigate(filteredResults[selectedIndex]);
    }
  };

  const handleNavigate = (result: SearchResult) => {
    if (result.path) {
      navigate(result.path);
      onClose();
    }
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'chat':
        return MessageCircleMore;
      case 'artifact':
      case 'document':
        return FileText;
      case 'workspace':
        return Folder;
      case 'table':
        return Table;
      case 'file':
        return Upload;
      default:
        return FileText;
    }
  };

  const getCategoryLabel = (result: SearchResult) => {
    // Check title for common document types
    const title = result.title.toLowerCase();
    if (title.includes('response') || title.includes('comment')) return 'Response';
    if (title.includes('contract') || title.includes('agreement') || title.includes('dpa')) return 'Contract';
    if (title.includes('memo') || title.includes('memorandum')) return 'Memo';
    if (title.includes('summary') || title.includes('report')) return 'Report';
    if (title.includes('analysis') || title.includes('assessment')) return 'Analysis';
    if (title.includes('outline')) return 'Outline';
    if (title.includes('research')) return 'Research';
    if (title.includes('policy')) return 'Policy';
    if (title.includes('checklist')) return 'Checklist';
    if (title.includes('register') || title.includes('matrix')) return 'Register';
    if (title.includes('plan')) return 'Plan';

    // Default based on type
    if (result.type === 'document') return 'Document';
    if (result.type === 'artifact') return 'Draft';
    return 'File';
  };

  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'chats', label: 'Chats' },
    { type: 'outputs', label: 'Outputs' },
    { type: 'workspaces', label: 'Workspaces' },
    { type: 'files', label: 'Uploaded files' },
  ];

  const renderChatPreview = (content: string) => {
    const paragraphs = content.split('\\n\\n').filter(p => p.trim());
    const messages: { role: 'user' | 'assistant'; content: string }[] = [];

    // Parse paragraphs into alternating user/assistant messages
    for (let i = 0; i < paragraphs.length; i++) {
      const trimmed = paragraphs[i].trim();
      if (!trimmed) continue;

      // First message is always user, then alternate
      const role = i % 2 === 0 ? 'user' : 'assistant';

      // If there's already a message with the same role, append to it (for lists/continuations)
      if (messages.length > 0 && messages[messages.length - 1].role === role) {
        messages[messages.length - 1].content += '\n\n' + trimmed;
      } else {
        messages.push({ role, content: trimmed });
      }
    }

    // Ensure every user message has an assistant response
    const completeMessages: { role: 'user' | 'assistant'; content: string }[] = [];
    for (let i = 0; i < messages.length; i++) {
      completeMessages.push(messages[i]);
      // If this is a user message and either it's the last message or the next message is also user
      if (messages[i].role === 'user' && (i === messages.length - 1 || messages[i + 1].role === 'user')) {
        completeMessages.push({ role: 'assistant', content: '[Response in progress...]' });
      }
    }

    return (
      <div className="space-y-6">
        {completeMessages.map((message, i) => (
          <div key={i} className="flex gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              message.role === 'user' ? 'bg-gray-100' : 'bg-[#1D4B34]'
            }`}>
              {message.role === 'user' ? (
                <User className="size-4 text-gray-600" />
              ) : (
                <Bot className="size-4 text-white" />
              )}
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-line">
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTablePreview = (content: string) => {
    const lines = content.split('\n');
    const dataRows: string[][] = [];
    let headers: string[] = [];
    let inTableSection = false;

    for (const line of lines) {
      const trimmed = line.trim();

      // Detect header row (contains multiple whitespace-separated columns)
      if (trimmed.includes('DOC ID') || trimmed.includes('BATES') || trimmed.includes('CATEGORY')) {
        headers = trimmed.split(/\s{2,}/).filter(h => h.length > 0);
        inTableSection = true;
        continue;
      }

      // Skip separator lines
      if (trimmed.match(/^[─═]+$/) || trimmed.length === 0) {
        continue;
      }

      // Parse data rows
      if (inTableSection && trimmed.match(/^[A-Z0-9-]+\s+/)) {
        const cells = trimmed.split(/\s{2,}/).filter(c => c.length > 0);
        if (cells.length >= 3) {
          dataRows.push(cells);
        }
      }
    }

    // If we didn't find headers, create default ones
    if (headers.length === 0 && dataRows.length > 0) {
      headers = dataRows[0].map((_, i) => `Column ${i + 1}`);
    }

    return (
      <div className="flex flex-col h-full bg-white text-[#212223] text-sm font-sans -mx-8 -my-6">
        <div className="flex-1 overflow-auto">
          <div className="inline-block min-w-full">
            {/* Column Headers */}
            <div className="flex sticky top-0 z-10 bg-[#F5F5F5] border-b border-[#E5E5E5]">
              <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5]"></div>
              {headers.map((header, idx) => (
                <div key={idx} className="min-w-[180px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">
                  {header}
                </div>
              ))}
            </div>

            {/* Rows */}
            {dataRows.slice(0, 20).map((row, rowIdx) => (
              <div key={rowIdx} className="flex border-b border-[#E5E5E5] hover:bg-blue-50">
                <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center font-semibold text-gray-600 text-[11px]">
                  {rowIdx + 1}
                </div>
                {row.map((cell, cellIdx) => (
                  <div key={cellIdx} className="min-w-[180px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 truncate text-[12px]">
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Get outputs for a chat
  const getChatOutputs = (chatTitle: string) => {
    return MOCK_RESULTS.filter(
      result => result.chatTitle === chatTitle && (result.type === 'artifact' || result.type === 'document')
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-12" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-[95vw] max-w-[1200px] h-[88vh] flex flex-col overflow-hidden"
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
          <Search className="size-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search CoCounsel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-[15px] text-[#212223] placeholder:text-gray-400 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left side - Filters + Results */}
          <div
            ref={resultsRef}
            className="w-full max-w-[480px] border-r border-gray-200 overflow-y-auto flex flex-col"
          >
            {/* Filters */}
            <div className="px-6 py-2.5">
              <div className="flex flex-wrap gap-1.5">
                {filters.map((filter) => (
                  <button
                    key={filter.type}
                    onClick={() => setActiveFilter(filter.type)}
                    className={clsx(
                      "px-2.5 py-1 rounded-full text-[12px] font-medium transition-all",
                      activeFilter === filter.type
                        ? "bg-[#1D4B34] text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {filteredResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Search className="size-12 mb-3 opacity-30" />
                <p className="text-sm">No results found</p>
              </div>
            ) : (
              <div>
                {filteredResults.map((result, index) => {
                  const Icon = getIcon(result.type);
                  const isSelected = index === selectedIndex;
                  const isHovered = index === hoveredIndex;

                  return (
                    <div key={result.id}>
                      <div
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={clsx(
                          "w-full flex items-start gap-3 px-6 py-3 transition-all border-l-2 group",
                          isSelected
                            ? "bg-gray-100 border-[#1D4B34]"
                            : "border-transparent hover:bg-gray-50"
                        )}
                      >
                        <div className={clsx(
                          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                          isSelected ? "bg-white" : "bg-gray-100"
                        )}>
                          <Icon className="size-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <button
                              onClick={() => handleNavigate(result)}
                              className="flex-1 min-w-0 text-left"
                            >
                              <h3 className="font-medium text-[#212223] text-[14px] truncate">
                                {result.title}
                              </h3>
                            </button>
                            {isHovered && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewedResult(result);
                                  }}
                                  className="shrink-0 p-1 hover:bg-gray-200 rounded transition-colors"
                                  title="Preview"
                                >
                                  <Eye className="size-3.5 text-gray-600" />
                                </button>
                                <button
                                  onClick={() => handleNavigate(result)}
                                  className="shrink-0"
                                >
                                  <SquareArrowOutUpRight className="size-3.5 text-gray-500" />
                                </button>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 min-w-0">
                            {/* For workspace items */}
                            {result.type === 'workspace' && (
                              <span className="shrink-0">Workspace</span>
                            )}

                            {/* For chat items */}
                            {result.type === 'chat' && (
                              <>
                                {result.isQuickChat && (
                                  <>
                                    <span className="shrink-0">Quick chat</span>
                                    <span className="text-gray-400 shrink-0">•</span>
                                  </>
                                )}
                                {result.workspace && (
                                  <>
                                    <span className="flex items-center gap-1 min-w-0 shrink">
                                      <Folder className="size-3 shrink-0" />
                                      <span className="truncate">{result.workspace}</span>
                                    </span>
                                    <span className="text-gray-400 shrink-0">•</span>
                                  </>
                                )}
                                {(() => {
                                  const outputs = getChatOutputs(result.title);
                                  return (
                                    <span className="flex items-center gap-1 shrink-0">
                                      <Sparkles className="size-3" />
                                      {outputs.length} {outputs.length === 1 ? 'output' : 'outputs'}
                                    </span>
                                  );
                                })()}
                              </>
                            )}

                            {/* For output items (artifacts/documents) */}
                            {(result.type === 'artifact' || result.type === 'document') && result.chatTitle && (
                              <>
                                <span className="flex items-center gap-1 min-w-0 shrink">
                                  <MessageCircleMore className="size-3 shrink-0" />
                                  <span className="truncate">{result.chatTitle}</span>
                                </span>
                                {result.workspace && <span className="text-gray-400 shrink-0">•</span>}
                              </>
                            )}

                            {/* Workspace for non-chat, non-workspace items */}
                            {result.workspace && result.type !== 'workspace' && result.type !== 'chat' && (
                              <span className="flex items-center gap-1 min-w-0 shrink">
                                <Folder className="size-3 shrink-0" />
                                <span className="truncate">{result.workspace}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {index < filteredResults.length - 1 && (
                        <div className="border-b border-gray-100 mx-6" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right side - Preview */}
          <div className="flex-1 overflow-y-auto bg-white">
            {previewedResult ? (
              <div className="h-full flex flex-col">
                {/* Compact header */}
                <div className="border-b border-gray-200 px-6 py-2.5">
                  <div className="flex items-center gap-2.5">
                    {(() => {
                      const Icon = getIcon(previewedResult.type);
                      return (
                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                          <Icon className="size-4 text-gray-600" />
                        </div>
                      );
                    })()}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-[13px] font-semibold text-[#212223] leading-tight">
                        {previewedResult.preview?.title || previewedResult.title}
                      </h2>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        {previewedResult.workspace && (
                          <span className="flex items-center gap-1">
                            <Folder className="size-3" />
                            {previewedResult.workspace}
                          </span>
                        )}
                        {previewedResult.isQuickChat && <span>Quick chat</span>}
                        {(previewedResult.workspace || previewedResult.isQuickChat) && previewedResult.date && (
                          <span>•</span>
                        )}
                        {previewedResult.date && (
                          <span>
                            {formatDate(previewedResult.date)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Move:', previewedResult.title);
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-100 rounded transition-colors"
                      >
                        <FolderInput className="size-3.5 text-gray-600" />
                        <span className="text-[12px] font-medium text-gray-700">Move</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Share:', previewedResult.title);
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Share className="size-3.5 text-gray-600" />
                        <span className="text-[12px] font-medium text-gray-700">Share</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Rename:', previewedResult.title);
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Edit className="size-3.5 text-gray-600" />
                        <span className="text-[12px] font-medium text-gray-700">Rename</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview content */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                  {previewedResult.type === 'chat' ? (
                    (() => {
                      const outputs = getChatOutputs(previewedResult.title);
                      return (
                        <div className="space-y-8">
                          {/* Outputs section */}
                          {outputs.length > 0 && (
                            <div>
                              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Outputs</h3>
                              <div className="space-y-3">
                                {outputs.map((output) => {
                                  const Icon = getIcon(output.type);
                                  return (
                                    <div
                                      key={output.id}
                                      className="w-full flex items-center gap-3 pr-4 pl-3 py-3 rounded-lg border border-gray-200 hover:border-[#1D4B34] hover:bg-gray-50 transition-all group"
                                    >
                                      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                        <Icon className="size-4 text-gray-600" />
                                      </div>
                                      <button
                                        onClick={() => handleNavigate(output)}
                                        className="flex-1 min-w-0 text-left"
                                      >
                                        <h3 className="text-[13px] font-medium text-[#212223] mb-0.5">
                                          {output.title}
                                        </h3>
                                        <p className="text-[11px] text-gray-500">
                                          {getCategoryLabel(output)}
                                        </p>
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          console.log('More options:', output.title);
                                        }}
                                        className="shrink-0 p-1 hover:bg-gray-200 rounded transition-opacity"
                                      >
                                        <MoreHorizontal className="size-4 text-gray-600" />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {/* Transcript section */}
                          {previewedResult.preview?.type === 'chat' && (
                            <div>
                              <div className="border-t border-gray-200 mb-6" />
                              <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Transcript</h3>
                              {renderChatPreview(previewedResult.preview.content)}
                            </div>
                          )}
                        </div>
                      );
                    })()
                  ) : previewedResult.preview?.type === 'chat' ? (
                    renderChatPreview(previewedResult.preview.content)
                  ) : previewedResult.preview?.type === 'table' ? (
                    renderTablePreview(previewedResult.preview?.content || previewedResult.content || '')
                  ) : (
                    <div className="text-[13px] leading-relaxed prose prose-sm max-w-none text-gray-700">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-[18px] font-bold text-[#212223] mt-6 mb-3" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-[16px] font-bold text-[#212223] mt-5 mb-2.5" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-[14px] font-semibold text-[#212223] mt-4 mb-2" {...props} />,
                          p: ({node, ...props}) => <p className="text-[13px] text-gray-700 leading-relaxed mb-3" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="text-[13px] text-gray-700" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold text-[#212223]" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                          code: ({node, className, ...props}) =>
                            className ? (
                              <code className="block bg-gray-100 rounded-lg p-3 text-[12px] font-mono overflow-x-auto mb-3" {...props} />
                            ) : (
                              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px] font-mono" {...props} />
                            ),
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3" {...props} />,
                        }}
                      >
                        {previewedResult.preview?.content || previewedResult.content || 'No preview available'}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full px-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Eye className="size-8 text-gray-400" />
                </div>
                <h3 className="text-[15px] font-semibold text-gray-700 mb-2">No preview selected</h3>
                <p className="text-[13px] text-gray-500 max-w-[320px]">
                  Hover over a result and click the preview icon to see its contents here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-[11px] font-medium text-gray-700 shadow-sm">↑</kbd>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-[11px] font-medium text-gray-700 shadow-sm">↓</kbd>
              <span className="text-gray-600">to navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-[11px] font-medium text-gray-700 shadow-sm">Enter</kbd>
              <span className="text-gray-600">to open</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-[11px] font-medium text-gray-700 shadow-sm">Esc</kbd>
              <span className="text-gray-600">to close</span>
            </span>
          </div>
          <span className="text-gray-600 font-medium">{filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'}</span>
        </div>
      </div>
    </div>
  );
}
