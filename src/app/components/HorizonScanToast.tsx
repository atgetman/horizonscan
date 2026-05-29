import { useEffect, useState } from "react";
import { Bell, ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";

export interface HorizonScanAlert {
  id: string;
  title: string;
  detail: string;
}

/**
 * Inline notification toast for Horizon Scan alerts.
 *
 * Lightweight stand-in for a full notification center: when a new scan
 * impacts one or more workspaces/files, a dismissible toast surfaces inline
 * so the user is aware of it without leaving their current view.
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
        title: custom.detail?.title ?? "New Horizon Scan results",
        detail:
          custom.detail?.detail ??
          "A scan impacted Employment Agreement and 2 other files",
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
            className="pointer-events-auto w-[340px] bg-white border border-[#E5E5E5] rounded-xl shadow-lg p-4 font-['Source_Sans_3']"
          >
            <div className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="size-3.5 text-amber-600" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-[1.35]">
                  {alert.title}
                </p>
                <p className="text-[14px] text-[#666666] mt-0.5 leading-[1.4]">
                  {alert.detail}
                </p>
                <button
                  onClick={handleReview}
                  className="inline-flex items-center gap-1 mt-2.5 text-[14px] font-medium text-[#1D4B34] hover:text-[#163b29] transition-colors"
                >
                  Review
                  <ArrowUpRight className="size-3.5" strokeWidth={2} />
                </button>
              </div>
              <button
                onClick={() => setAlert(null)}
                aria-label="Dismiss notification"
                className="size-6 flex items-center justify-center text-[#999999] hover:text-[#212223] transition-colors shrink-0 -mt-0.5 -mr-1"
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
