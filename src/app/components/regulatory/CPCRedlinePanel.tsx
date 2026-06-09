import { useMemo, useState } from 'react';
import {
  X,
  Check,
  FileText,
  ChevronDown,
  ChevronRight,
  Sparkles,
  CheckCheck,
  AlertTriangle,
  Filter,
  Download,
  Pencil,
} from 'lucide-react';
import { clsx } from 'clsx';

interface ClauseRow {
  id: string;
  documentName: string;
  category: string;
  section: string;
  issue: string;
  original: string;
  suggested: string;
  explanation: string;
}

interface CPCRedlinePanelProps {
  isOpen: boolean;
  onClose: () => void;
  regulation: string;
  onAcceptAll?: () => void;
}

const COMPLIANCE_DEADLINE = 'July 1, 2024';

// Clause-level redlines for the M&A templates affected by the regulation,
// organised so they can be grouped by document category.
const CLAUSE_ROWS: ClauseRow[] = [
  {
    id: 'redline-1',
    documentName: 'M&A Purchase Agreement',
    category: 'Purchase Agreements',
    section: 'Section 4.12 — Compliance with Laws',
    issue: 'Representation does not reference the new disclosure regime.',
    original:
      'The Company is in compliance in all material respects with all applicable laws and regulations.',
    suggested:
      'The Company is in compliance in all material respects with all applicable laws and regulations, including the SEC Climate Disclosure Rules and any related reporting obligations.',
    explanation:
      'Expands the compliance representation to expressly cover the new regulatory regime so the buyer obtains a specific climate-disclosure rep.',
  },
  {
    id: 'redline-2',
    documentName: 'M&A Purchase Agreement',
    category: 'Purchase Agreements',
    section: 'Section 6.3 — Pre-Closing Covenants',
    issue: 'No covenant requiring continued regulatory reporting before closing.',
    original:
      'Between signing and closing, the Company shall conduct its business in the ordinary course consistent with past practice.',
    suggested:
      'Between signing and closing, the Company shall conduct its business in the ordinary course consistent with past practice and shall timely prepare and file all disclosures required under the SEC Climate Disclosure Rules.',
    explanation:
      'Adds an affirmative covenant ensuring the target maintains regulatory reporting through closing, reducing post-closing exposure.',
  },
  {
    id: 'redline-3',
    documentName: 'Stock Purchase Agreement',
    category: 'Purchase Agreements',
    section: 'Section 8.1 — Indemnification',
    issue: 'Indemnity does not cover losses from non-compliant disclosures.',
    original:
      'The Seller shall indemnify the Buyer for losses arising out of any breach of the representations and warranties.',
    suggested:
      'The Seller shall indemnify the Buyer for losses arising out of any breach of the representations and warranties, including any failure to comply with the SEC Climate Disclosure Rules prior to the Closing.',
    explanation:
      'Ensures pre-closing disclosure failures are expressly captured by the indemnity so the buyer is protected for newly regulated obligations.',
  },
  {
    id: 'redline-4',
    documentName: 'Disclosure Schedule Template',
    category: 'Disclosure Schedules',
    section: 'Schedule 4.12(b) — Environmental Disclosures',
    issue: 'Schedule lacks a category for climate-related disclosures.',
    original:
      'List all material environmental permits and pending environmental proceedings.',
    suggested:
      'List all material environmental permits, pending environmental proceedings, and any climate-related disclosures or filings made under the SEC Climate Disclosure Rules.',
    explanation:
      'Adds a dedicated disclosure category so diligence captures climate filings required by the rule.',
  },
  {
    id: 'redline-5',
    documentName: 'Disclosure Schedule Template',
    category: 'Disclosure Schedules',
    section: 'Schedule 5.4 — Regulatory Filings',
    issue: 'No line item for emissions reporting filings.',
    original:
      'List all regulatory filings made with federal and state agencies in the past three years.',
    suggested:
      'List all regulatory filings made with federal and state agencies in the past three years, including Scope 1 and Scope 2 emissions reporting required under the SEC Climate Disclosure Rules.',
    explanation:
      'Captures the new emissions reporting obligations within the standard regulatory-filings disclosure.',
  },
  {
    id: 'redline-6',
    documentName: 'Due Diligence Checklist',
    category: 'Due Diligence',
    section: 'Item 9 — Regulatory Compliance',
    issue: 'Checklist omits climate-disclosure review.',
    original:
      'Confirm the target has filed all required periodic reports with applicable regulators.',
    suggested:
      'Confirm the target has filed all required periodic reports with applicable regulators, including climate-related disclosures mandated by the SEC Climate Disclosure Rules.',
    explanation:
      'Ensures the diligence team verifies compliance with the new disclosure requirements during review.',
  },
];

type Status = 'pending' | 'accepted';
type StatusFilter = 'all' | 'pending' | 'accepted';

export function CPCRedlinePanel({ isOpen, onClose, regulation, onAcceptAll }: CPCRedlinePanelProps) {
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(CLAUSE_ROWS.map((r) => r.category))),
    [],
  );

  if (!isOpen) return null;

  const statusFor = (id: string): Status => statuses[id] ?? 'pending';

  const setStatus = (id: string, status: Status) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const toggleRow = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleGroup = (category: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  // Apply filters
  const filteredRows = CLAUSE_ROWS.filter((r) => {
    const statusOk = statusFilter === 'all' || statusFor(r.id) === statusFilter;
    const categoryOk = categoryFilter === 'all' || r.category === categoryFilter;
    return statusOk && categoryOk;
  });

  // Group filtered rows by category
  const groups = categories
    .filter((c) => filteredRows.some((r) => r.category === c))
    .map((category) => ({
      category,
      rows: filteredRows.filter((r) => r.category === category),
    }));

  const totalClauses = filteredRows.length;
  const documentCount = new Set(filteredRows.map((r) => r.documentName)).size;
  const pendingCount = CLAUSE_ROWS.filter((r) => statusFor(r.id) === 'pending').length;

  // Download label depends on how many distinct documents are in view.
  const downloadLabel = documentCount <= 1 ? 'Download .docx' : 'Download all as .zip';

  const acceptAllPending = () => {
    const next: Record<string, Status> = { ...statuses };
    CLAUSE_ROWS.forEach((r) => {
      next[r.id] = 'accepted';
    });
    setStatuses(next);
    setShowAcceptConfirm(false);
    onAcceptAll?.();
  };

  return (
    <div className="w-[720px] shrink-0 border-l border-[#E5E5E5] bg-white flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 border-b border-[#E5E5E5] px-6 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <h2 className="text-[18px] font-['Clario'] font-medium text-[#212223] leading-tight">
              Cross-product clause analysis
            </h2>
            <p className="text-[13px] font-['Source_Sans_3'] text-[#666] truncate">
              {regulation}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-8 rounded-lg hover:bg-[#F0F2F1] text-[#666] hover:text-[#212223] transition-colors shrink-0"
            aria-label="Close clause analysis panel"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="shrink-0 border-b border-[#E5E5E5] bg-[#FCFCFC] px-4 py-2 flex items-center gap-2 flex-wrap">
        {/* Filter by status */}
        <div className="flex items-center gap-1.5">
          <Filter className="size-3.5 text-[#666]" strokeWidth={1.5} />
          <span className="text-[12px] font-['Source_Sans_3'] text-[#666]">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="h-7 text-[13px] font-['Source_Sans_3'] text-[#212223] bg-white border border-[#D2D2D2] rounded px-2 hover:border-[#8a8a8a] focus:outline-none focus:border-[#1d4b34]"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>

        {/* Filter by document category */}
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] font-['Source_Sans_3'] text-[#666]">Category</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-7 text-[13px] font-['Source_Sans_3'] text-[#212223] bg-white border border-[#D2D2D2] rounded px-2 hover:border-[#8a8a8a] focus:outline-none focus:border-[#1d4b34]"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1" />

        {/* Accept all pending */}
        <button
          onClick={() => setShowAcceptConfirm(true)}
          disabled={pendingCount === 0}
          className="flex items-center gap-1.5 h-7 px-2.5 bg-[#1d4b34] hover:bg-[#153a28] disabled:opacity-40 disabled:hover:bg-[#1d4b34] text-white text-[13px] font-['Clario'] font-medium rounded-md transition-colors"
        >
          <CheckCheck className="size-3.5" />
          Accept all pending
        </button>

        {/* Download */}
        <button className="flex items-center gap-1.5 h-7 px-2.5 bg-white hover:bg-[#F5F5F5] text-[#212223] text-[13px] font-['Clario'] font-medium rounded-md border border-[#D2D2D2] transition-colors">
          <Download className="size-3.5" />
          {downloadLabel}
        </button>
      </div>

      {/* Banner */}
      <div className="shrink-0 bg-[#FFF9F0] border-b border-[#F5D6A3] px-4 py-2 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#F5A623] flex items-center justify-center shrink-0">
          <AlertTriangle className="size-2.5 text-white" />
        </div>
        <span className="text-[13px] font-['Source_Sans_3'] text-[#1F1F1F]">
          <span className="font-semibold">{`${totalClauses} clauses across ${documentCount} documents`}</span>
          <span className="text-[#666] mx-2">·</span>
          <span>{`Compliance deadline ${COMPLIANCE_DEADLINE}`}</span>
        </span>
      </div>

      {/* Inline confirmation for high-consequence bulk action */}
      {showAcceptConfirm && (
        <div className="shrink-0 bg-[#FFF8E5] border-b border-[#F5D6A3] px-4 py-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-[#AB3300] shrink-0 mt-0.5" strokeWidth={2} />
            <div className="flex-1">
              <p className="font-['Clario'] font-semibold text-[14px] text-[#212223] mb-1">
                {`Accept all ${pendingCount} pending ${pendingCount === 1 ? 'clause' : 'clauses'}?`}
              </p>
              <p className="font-['Source_Sans_3'] text-[13px] text-[#666] leading-[1.5] mb-3">
                This applies every pending suggested redline at once and cannot be undone in a single step. Review individual clauses first if you need to make exceptions.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={acceptAllPending}
                  className="h-[30px] px-3 flex items-center justify-center text-[13px] font-['Clario'] font-medium text-white bg-[#1d4b34] rounded-[4px] hover:bg-[#153a28] transition-colors"
                >
                  Yes, accept all pending
                </button>
                <button
                  onClick={() => setShowAcceptConfirm(false)}
                  className="h-[30px] px-3 flex items-center justify-center text-[13px] font-['Clario'] font-medium text-[#212223] bg-white border border-[#8a8a8a] rounded-[4px] hover:bg-[#F5F5F5] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {/* Column headers */}
        <div className="flex sticky top-0 z-10 bg-[#F5F5F5] border-b border-[#E5E5E5] text-[12px] font-['Source_Sans_3'] font-semibold text-[#4A4A4A]">
          <div className="w-7 shrink-0 border-r border-[#E5E5E5]" />
          <div className="w-[170px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5">Document name</div>
          <div className="w-[120px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5">Category</div>
          <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5">Section</div>
          <div className="flex-1 min-w-[160px] border-r border-[#E5E5E5] px-2 py-1.5">Issue</div>
          <div className="w-[200px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5">Suggested redline</div>
          <div className="w-[110px] shrink-0 px-2 py-1.5">Status</div>
        </div>

        {groups.length === 0 && (
          <div className="px-4 py-10 text-center text-[13px] font-['Source_Sans_3'] text-[#999]">
            No clauses match the current filters.
          </div>
        )}

        {groups.map((group) => {
          const collapsed = collapsedGroups.has(group.category);
          const groupDocCount = new Set(group.rows.map((r) => r.documentName)).size;
          return (
            <div key={group.category}>
              {/* Group header */}
              <button
                onClick={() => toggleGroup(group.category)}
                className="w-full flex items-center gap-2 bg-[#F0F2F1] border-b border-[#E5E5E5] px-3 py-2 hover:bg-[#E8ECEA] transition-colors text-left"
              >
                {collapsed ? (
                  <ChevronRight className="size-4 text-[#666]" strokeWidth={2} />
                ) : (
                  <ChevronDown className="size-4 text-[#666]" strokeWidth={2} />
                )}
                <span className="text-[13px] font-['Clario'] font-semibold text-[#212223]">
                  {group.category}
                </span>
                <span className="text-[12px] font-['Source_Sans_3'] text-[#666]">
                  {`${groupDocCount} ${groupDocCount === 1 ? 'document' : 'documents'} · ${group.rows.length} ${group.rows.length === 1 ? 'clause' : 'clauses'}`}
                </span>
              </button>

              {!collapsed &&
                group.rows.map((row) => {
                  const status = statusFor(row.id);
                  const isExpanded = expanded.has(row.id);
                  return (
                    <div key={row.id} className="border-b border-[#E5E5E5]">
                      {/* Row */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleRow(row.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleRow(row.id);
                          }
                        }}
                        className="flex text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-[#EDF2F0] cursor-pointer"
                      >
                        <div className="w-7 shrink-0 border-r border-[#E5E5E5] flex items-start justify-center pt-2">
                          {isExpanded ? (
                            <ChevronDown className="size-3.5 text-[#666]" strokeWidth={2} />
                          ) : (
                            <ChevronRight className="size-3.5 text-[#666]" strokeWidth={2} />
                          )}
                        </div>
                        <div className="w-[170px] shrink-0 border-r border-[#E5E5E5] px-2 py-2 flex items-start gap-1.5">
                          <FileText className="size-3.5 text-[#8a8a8a] shrink-0 mt-0.5" strokeWidth={1.5} />
                          <span className="line-clamp-2">{row.documentName}</span>
                        </div>
                        <div className="w-[120px] shrink-0 border-r border-[#E5E5E5] px-2 py-2">
                          {row.category}
                        </div>
                        <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-2">
                          <span className="line-clamp-2">{row.section}</span>
                        </div>
                        <div className="flex-1 min-w-[160px] border-r border-[#E5E5E5] px-2 py-2">
                          <span className="line-clamp-2 text-[#666]">{row.issue}</span>
                        </div>
                        <div className="w-[200px] shrink-0 border-r border-[#E5E5E5] px-2 py-2">
                          <span className="line-clamp-2 text-[#166534]">{row.suggested}</span>
                        </div>
                        <div className="w-[110px] shrink-0 px-2 py-2">
                          <span
                            className={clsx(
                              'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold',
                              status === 'accepted'
                                ? 'bg-[#DCFCE7] text-[#166534]'
                                : 'bg-[#FFF8E5] text-[#AB3300]',
                            )}
                          >
                            {status === 'accepted' ? 'Accepted' : 'Pending'}
                          </span>
                        </div>
                      </div>

                      {/* Expanded inline detail */}
                      {isExpanded && (
                        <div className="bg-[#FAFBFC] border-t border-[#E5E5E5] px-4 py-4 pl-9">
                          <div className="flex flex-col gap-3 max-w-[620px]">
                            {/* Current clause - struck through red */}
                            <div>
                              <p className="text-[12px] font-['Source_Sans_3'] font-semibold text-[#666] mb-1">
                                Current clause
                              </p>
                              <p className="text-[14px] font-['Source_Sans_3'] leading-relaxed line-through text-[#991B1B] bg-[#FEE2E2] rounded-md px-3 py-2">
                                {row.original}
                              </p>
                            </div>

                            {/* Suggested replacement - green */}
                            <div>
                              <p className="text-[12px] font-['Source_Sans_3'] font-semibold text-[#666] mb-1">
                                Suggested replacement
                              </p>
                              <p className="text-[14px] font-['Source_Sans_3'] leading-relaxed text-[#166534] bg-[#DCFCE7] rounded-md px-3 py-2">
                                {row.suggested}
                              </p>
                            </div>

                            {/* Explanation */}
                            <div className="flex items-start gap-2">
                              <div className="flex items-center justify-center size-6 rounded-full bg-white border border-[#E5E5E5] shrink-0 mt-0.5">
                                <Sparkles className="size-3.5 text-[#DE6633] fill-[#DE6633]" />
                              </div>
                              <p className="text-[13px] font-['Source_Sans_3'] text-[#666] leading-relaxed">
                                {row.explanation}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => setStatus(row.id, 'accepted')}
                                disabled={status === 'accepted'}
                                className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#1d4b34] hover:bg-[#153a28] disabled:opacity-40 disabled:hover:bg-[#1d4b34] text-white text-[13px] font-['Clario'] font-medium rounded-md transition-colors"
                              >
                                <Check className="size-3.5" />
                                {status === 'accepted' ? 'Accepted' : 'Accept'}
                              </button>
                              <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F9FAFB] text-[#212223] text-[13px] font-['Clario'] font-medium rounded-md border border-[#D2D2D2] transition-colors">
                                <Pencil className="size-3.5" />
                                Edit
                              </button>
                              <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F9FAFB] text-[#212223] text-[13px] font-['Clario'] font-medium rounded-md border border-[#D2D2D2] transition-colors">
                                <Sparkles className="size-3.5" />
                                Explain change
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}

        {/* Caveat */}
        <p className="text-[12px] font-['Source_Sans_3'] text-[#999] italic leading-relaxed px-4 py-3">
          Suggested redlines are AI-generated recommendations based on regulatory language comparison.
          Always consult with legal counsel before accepting changes to contract templates.
        </p>
      </div>
    </div>
  );
}
