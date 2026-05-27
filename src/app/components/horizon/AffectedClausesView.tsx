import { ChevronDown, ChevronRight, AlertTriangle, FileText } from 'lucide-react';
import { useState } from 'react';

interface Clause {
  id: string;
  reference: string;
  impact: 'high' | 'medium' | 'low';
  originalText: string;
  suggestedText: string;
  rationale: string;
}

interface AffectedDocument {
  id: string;
  title: string;
  clauses: Clause[];
}

interface AffectedClausesViewProps {
  documents: AffectedDocument[];
  regulationTitle: string;
}

export function AffectedClausesView({
  documents,
  regulationTitle,
}: AffectedClausesViewProps) {
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(
    new Set(documents.length > 0 ? [documents[0].id] : [])
  );
  const [expandedClauses, setExpandedClauses] = useState<Set<string>>(new Set());

  const toggleDoc = (id: string) => {
    setExpandedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleClause = (id: string) => {
    setExpandedClauses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const impactColors = {
    high: 'bg-[#dc2626] text-white',
    medium: 'bg-[#f59e0b] text-white',
    low: 'bg-[#6b7280] text-white',
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="border border-[#e5e5e5] rounded-[8px] p-4 bg-white">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-['Clario:Medium',sans-serif] text-[15px] text-[#1a1a1a]">
              Affected clauses: {regulationTitle}
            </h4>
            <p className="text-[13px] text-[#525252] mt-1">
              {documents.length} document{documents.length !== 1 ? 's' : ''} with potential conflicts
            </p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="space-y-2">
        {documents.map((doc) => {
          const isDocExpanded = expandedDocs.has(doc.id);
          return (
            <div
              key={doc.id}
              className="border border-[#e5e5e5] rounded-[8px] bg-white overflow-hidden"
            >
              {/* Document header */}
              <button
                onClick={() => toggleDoc(doc.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fafafa] transition-colors text-left"
              >
                {isDocExpanded ? (
                  <ChevronDown className="w-4 h-4 text-[#737373] flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                )}
                <FileText className="w-4 h-4 text-[#737373] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-['Clario:Medium',sans-serif] text-[#1a1a1a] truncate">
                    {doc.title}
                  </p>
                  <p className="text-[12px] text-[#737373] mt-0.5">
                    {doc.clauses.length} clause{doc.clauses.length !== 1 ? 's' : ''} flagged
                  </p>
                </div>
              </button>

              {/* Clauses */}
              {isDocExpanded && (
                <div className="border-t border-[#e5e5e5] bg-[#fafafa]">
                  {doc.clauses.map((clause, idx) => {
                    const isClauseExpanded = expandedClauses.has(clause.id);
                    return (
                      <div
                        key={clause.id}
                        className={idx !== 0 ? 'border-t border-[#e5e5e5]' : ''}
                      >
                        {/* Clause header */}
                        <button
                          onClick={() => toggleClause(clause.id)}
                          className="w-full flex items-start gap-3 px-4 py-3 hover:bg-[#f5f5f5] transition-colors text-left"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-[13px] font-['Clario:Medium',sans-serif] text-[#525252]">
                              {clause.reference}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-['Clario:Medium',sans-serif] uppercase ${impactColors[clause.impact]}`}
                            >
                              {clause.impact}
                            </span>
                          </div>
                          {isClauseExpanded ? (
                            <ChevronDown className="w-4 h-4 text-[#737373] flex-shrink-0 mt-0.5" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0 mt-0.5" />
                          )}
                        </button>

                        {/* Clause details */}
                        {isClauseExpanded && (
                          <div className="px-4 pb-4 space-y-3">
                            {/* Rationale */}
                            <div>
                              <p className="text-[11px] text-[#737373] uppercase tracking-wide font-['Clario:Medium',sans-serif] mb-1">
                                Why this matters
                              </p>
                              <p className="text-[13px] text-[#525252] leading-relaxed">
                                {clause.rationale}
                              </p>
                            </div>

                            {/* Redline */}
                            <div className="bg-white border border-[#e5e5e5] rounded-[4px] p-3 space-y-3">
                              {/* Original */}
                              <div>
                                <p className="text-[11px] text-[#737373] uppercase tracking-wide font-['Clario:Medium',sans-serif] mb-2">
                                  Current Language
                                </p>
                                <p className="text-[13px] text-[#dc2626] leading-relaxed line-through">
                                  {clause.originalText}
                                </p>
                              </div>

                              {/* Suggested */}
                              <div>
                                <p className="text-[11px] text-[#737373] uppercase tracking-wide font-['Clario:Medium',sans-serif] mb-2">
                                  Suggested Revision
                                </p>
                                <p className="text-[13px] text-[#059669] leading-relaxed">
                                  {clause.suggestedText}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
