import { useState } from 'react';
import { FileText, ChevronDown, ChevronRight, AlertCircle } from 'lucide-react';

interface ClauseFlag {
  id: string;
  clauseTitle: string;
  issue: string;
  original: string;
  suggested: string;
}

interface AffectedDocument {
  id: string;
  name: string;
  type: string;
  clauseFlags: ClauseFlag[];
}

interface AffectedClausesDrilldownProps {
  regulationTitle: string;
  documents: AffectedDocument[];
}

export function AffectedClausesDrilldown({
  regulationTitle,
  documents
}: AffectedClausesDrilldownProps) {
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set());
  const [expandedClauses, setExpandedClauses] = useState<Set<string>>(new Set());

  const toggleDocument = (docId: string) => {
    const newExpanded = new Set(expandedDocs);
    if (newExpanded.has(docId)) {
      newExpanded.delete(docId);
    } else {
      newExpanded.add(docId);
    }
    setExpandedDocs(newExpanded);
  };

  const toggleClause = (clauseId: string) => {
    const newExpanded = new Set(expandedClauses);
    if (newExpanded.has(clauseId)) {
      newExpanded.delete(clauseId);
    } else {
      newExpanded.add(clauseId);
    }
    setExpandedClauses(newExpanded);
  };

  return (
    <div className="my-4">
      <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[#E5E5E5] bg-[#F9FAFB]">
          <h4 className="text-[14px] font-['Clario'] font-semibold text-[#212223]">
            Affected clauses: {regulationTitle}
          </h4>
          <p className="text-[13px] font-['Source_Sans_3'] text-[#666] mt-1">
            {documents.length} {documents.length === 1 ? 'document' : 'documents'} with potential compliance issues
          </p>
        </div>

        <div className="divide-y divide-[#E5E5E5]">
          {documents.map((doc) => {
            const isDocExpanded = expandedDocs.has(doc.id);

            return (
              <div key={doc.id}>
                {/* Document Header */}
                <button
                  onClick={() => toggleDocument(doc.id)}
                  className="w-full px-4 py-3 hover:bg-[#F9FAFB] transition-colors text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-1">
                      {isDocExpanded ? (
                        <ChevronDown className="size-4 text-[#666]" strokeWidth={2} />
                      ) : (
                        <ChevronRight className="size-4 text-[#666]" strokeWidth={2} />
                      )}
                    </div>
                    <FileText className="size-4 text-[#666] shrink-0 mt-1" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[14px] font-['Clario'] font-semibold text-[#212223] mb-0.5">
                        {doc.name}
                      </h5>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-['Source_Sans_3'] text-[#666]">
                          {doc.type}
                        </span>
                        <span className="text-[#666]">•</span>
                        <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#DE6633] bg-[#FFF9F5] px-2 py-0.5 rounded-full border border-[#FFE5D3]">
                          {doc.clauseFlags.length} {doc.clauseFlags.length === 1 ? 'issue' : 'issues'}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Clause Flags */}
                {isDocExpanded && (
                  <div className="bg-[#FAFBFC] border-t border-[#E5E5E5]">
                    {doc.clauseFlags.map((clause, idx) => {
                      const isClauseExpanded = expandedClauses.has(clause.id);

                      return (
                        <div
                          key={clause.id}
                          className={idx > 0 ? 'border-t border-[#E5E5E5]' : ''}
                        >
                          <button
                            onClick={() => toggleClause(clause.id)}
                            className="w-full px-4 py-3 pl-11 hover:bg-white transition-colors text-left"
                          >
                            <div className="flex items-start gap-3">
                              <div className="pt-0.5">
                                {isClauseExpanded ? (
                                  <ChevronDown className="size-3.5 text-[#666]" strokeWidth={2} />
                                ) : (
                                  <ChevronRight className="size-3.5 text-[#666]" strokeWidth={2} />
                                )}
                              </div>
                              <AlertCircle className="size-4 text-[#DE6633] shrink-0 mt-0.5" strokeWidth={1.5} />
                              <div className="flex-1 min-w-0">
                                <h6 className="text-[13px] font-['Clario'] font-semibold text-[#212223] mb-0.5">
                                  {clause.clauseTitle}
                                </h6>
                                <p className="text-[13px] font-['Source_Sans_3'] text-[#666]">
                                  {clause.issue}
                                </p>
                              </div>
                            </div>
                          </button>

                          {/* Redline Block */}
                          {isClauseExpanded && (
                            <div className="px-4 pb-4 pl-[4.5rem] bg-white">
                              <div className="border border-[#E5E5E5] rounded-lg overflow-hidden">
                                <div className="px-3 py-2 bg-[#F9FAFB] border-b border-[#E5E5E5]">
                                  <span className="text-[12px] font-['Source_Sans_3'] font-semibold text-[#666]">
                                    Suggested revision
                                  </span>
                                </div>
                                <div className="p-3 space-y-3">
                                  {/* Original (struck through) */}
                                  <div>
                                    <div className="text-[11px] font-['Source_Sans_3'] font-semibold text-[#666] mb-1 uppercase tracking-wide">
                                      Original
                                    </div>
                                    <p className="text-[13px] font-['Source_Sans_3'] text-[#991B1B] bg-[#FEE2E2] px-2 py-1 rounded leading-relaxed">
                                      <span className="line-through">{clause.original}</span>
                                    </p>
                                  </div>

                                  {/* Suggested (highlighted) */}
                                  <div>
                                    <div className="text-[11px] font-['Source_Sans_3'] font-semibold text-[#666] mb-1 uppercase tracking-wide">
                                      Suggested
                                    </div>
                                    <p className="text-[13px] font-['Source_Sans_3'] text-[#166534] bg-[#DCFCE7] px-2 py-1 rounded leading-relaxed">
                                      {clause.suggested}
                                    </p>
                                  </div>
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
    </div>
  );
}
