import { useEffect, useState } from "react";
import { ArrowUpRight, X, Bell, FileText, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";

export interface ImpactedDocument {
  name: string;
  clause: string;
  impact: "high" | "medium" | "low";
}

export interface HorizonScanAlert {
  id: string;
  title: string;
  detail: string;
  /** Workspace where the impacted documents live (display name). */
  workspace: string;
  /** Specific documents impacted by the regulatory change. */
  documents: ImpactedDocument[];
}

const DEFAULT_ALERT: Omit<HorizonScanAlert, "id"> = {
  title: "Documents impacted by SEC climate disclosure update",
  detail: "New SEC climate disclosure guidance affects 3 documents in the SEC Climate Disclosure Program",
  workspace: "SEC Climate Disclosure Program",
  documents: [
    { name: "SEC Comment Letter Response.docx", clause: "Governance Disclosure §I", impact: "high" },
    { name: "Compliance Risk Assessment.docx", clause: "Securities Disclosure", impact: "medium" },
    { name: "Memo on Disclosure Obligations.docx", clause: "Emissions Metrics §II", impact: "low" },
  ],
};

const IMPACT_STYLES: Record<ImpactedDocument["impact"], string> = {
  high: "text-[#dc2626]",
  medium: "text-[#d97706]",
  low: "text-[#737373]",
};

/**
 * Proactive notification toast for Horizon Scan alerts.
 *
 * Surfaces a dismissible card in the bottom-right while the user is working,
 * letting them know a scan has impacted documents in one of their workspaces.
 * The card expands to list the specific affected documents, and "Review in
 * workspace" deep-links into that workspace's impact analysis.
 *
 * Trigger from anywhere via:
 *   window.dispatchEvent(new CustomEvent("horizonScanAlert", { detail: { ... } }))
 */
export function HorizonScanToast() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<HorizonScanAlert | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    function handleAlert(event: Event) {
      const custom = event as CustomEvent<Partial<HorizonScanAlert>>;
      setIsExpanded(false);
      setAlert({
        id: custom.detail?.id ?? `scan-${Date.now()}`,
        title: custom.detail?.title ?? DEFAULT_ALERT.title,
        detail: custom.detail?.detail ?? DEFAULT_ALERT.detail,
        workspace: custom.detail?.workspace ?? DEFAULT_ALERT.workspace,
        documents: custom.detail?.documents ?? DEFAULT_ALERT.documents,
      });
    }

    window.addEventListener("horizonScanAlert", handleAlert);

    return () => {
      window.removeEventListener("horizonScanAlert", handleAlert);
    };
  }, []);

  const handleReview = () => {
    if (!alert) return;
    const target = alert.workspace;
    setAlert(null);
    // Deep-link into the workspace and auto-open its regulatory impact analysis.
    navigate(`/workspace/${encodeURIComponent(target)}?impact=1`);
  };

  const docCount = alert?.documents.length ?? 0;

  return (
    <div className="fixed bottom-6 right-6 z-[60] pointer-events-none">
      <AnimatePresence>
        {alert && (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto w-[340px] bg-[#FEF6EC] border border-[#E5E5E5] rounded-xl shadow-[0px_8px_24px_0px_rgba(31,31,31,0.12)] overflow-hidden font-['Source_Sans_3']"
          >
            <div className="px-4 py-3.5">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex items-center justify-center size-7 rounded-full bg-[#f59e0b] shrink-0">
                  <Bell className="size-4 text-white" strokeWidth={2} fill="currentColor" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-[1.35] pr-4">
                    {alert.title}
                  </p>
                  <p className="text-[14px] text-[#666666] mt-0.5 leading-[1.4]">
                    {alert.detail}
                  </p>
                </div>
                <button
                  onClick={() => setAlert(null)}
                  aria-label="Dismiss notification"
                  className="size-6 flex items-center justify-center text-[#999999] hover:text-[#212223] transition-colors shrink-0 -mt-1 -mr-1"
                >
                  <X className="size-4" strokeWidth={1.75} />
                </button>
              </div>

              {/* Expandable list of impacted documents */}
              {docCount > 0 && (
                <div className="mt-2.5 pl-[38px]">
                  <button
                    onClick={() => setIsExpanded((v) => !v)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-[#212223] hover:text-[#1d4b34] transition-colors"
                  >
                    {isExpanded ? "Hide" : "Show"} {docCount} impacted document{docCount !== 1 ? "s" : ""}
                    <ChevronDown
                      className={`size-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      strokeWidth={2}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden mt-2 space-y-1.5"
                      >
                        {alert.documents.map((doc) => (
                          <li
                            key={doc.name}
                            className="flex items-start gap-2 rounded-lg bg-white/70 border border-[#EFE3D2] px-2.5 py-1.5"
                          >
                            <FileText className="size-3.5 text-[#737373] mt-0.5 shrink-0" strokeWidth={1.75} />
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] text-[#212223] leading-[1.3] truncate">{doc.name}</p>
                              <p className="text-[12px] text-[#888888] leading-[1.3] truncate">{doc.clause}</p>
                            </div>
                            <span className={`text-[11px] font-semibold uppercase tracking-wide shrink-0 mt-0.5 ${IMPACT_STYLES[doc.impact]}`}>
                              {doc.impact}
                            </span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleReview}
                    className="inline-flex items-center gap-1 mt-2.5 text-[14px] font-medium text-[#0062C4] hover:text-[#004a96] transition-colors"
                  >
                    Review in workspace
                    <ArrowUpRight className="size-3.5" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
