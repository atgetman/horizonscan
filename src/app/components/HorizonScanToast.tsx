import { useEffect, useState } from "react";
import { ArrowUpRight, X, Bell } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";

export interface HorizonScanAlert {
  id: string;
  title: string;
  detail: string;
}

/**
 * Proactive notification toast for Horizon Scan alerts.
 *
 * Surfaces a dismissible card in the bottom-right while the user is working,
 * letting them know a scan has impacted documents in one of their workspaces
 * without leaving their current view.
 *
 * Trigger from anywhere via:
 *   window.dispatchEvent(new CustomEvent("horizonScanAlert", { detail: { ... } }))
 */
export function HorizonScanToast() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<HorizonScanAlert | null>(null);

  useEffect(() => {
    function handleAlert(event: Event) {
      const custom = event as CustomEvent<Partial<HorizonScanAlert>>;
      setAlert({
        id: custom.detail?.id ?? `scan-${Date.now()}`,
        title: custom.detail?.title ?? "Documents impacted in M&A Diligence",
        detail:
          custom.detail?.detail ??
          "3 documents affected by new SEC guidance",
      });
    }

    window.addEventListener("horizonScanAlert", handleAlert);

    return () => {
      window.removeEventListener("horizonScanAlert", handleAlert);
    };
  }, []);

  const handleReview = () => {
    setAlert(null);
    navigate("/knowledge");
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("openMonitoringSection"));
    }, 100);
  };

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
            className="pointer-events-auto w-[320px] bg-[#FEF6EC] border border-[#E5E5E5] rounded-xl shadow-[0px_8px_24px_0px_rgba(31,31,31,0.12)] px-4 py-3.5 font-['Source_Sans_3']"
          >
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
                <button
                  onClick={handleReview}
                  className="inline-flex items-center gap-1 mt-2.5 text-[14px] font-medium text-[#0062C4] hover:text-[#004a96] transition-colors"
                >
                  Review
                  <ArrowUpRight className="size-3.5" strokeWidth={2} />
                </button>
              </div>
              <button
                onClick={() => setAlert(null)}
                aria-label="Dismiss notification"
                className="size-6 flex items-center justify-center text-[#999999] hover:text-[#212223] transition-colors shrink-0 -mt-1 -mr-1"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
