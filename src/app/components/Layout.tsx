import { Outlet, useLocation, matchPath, useNavigate, useSearchParams } from "react-router";
import { Sidebar } from "./Sidebar";
import { SidebarExpanded } from "./SidebarExpanded";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { AnimatePresence, motion } from "motion/react";
import { useWorkspaceNavigation } from "../contexts/WorkspaceNavigationContext";
import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { OnboardingPopover } from "./OnboardingPopover";
import { HorizonScanToast } from "./HorizonScanToast";
import ToggleActive from "../../imports/Container-3417-18";
import ToggleInactive from "../../imports/Container-3417-35";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isHome = location.pathname === "/";
  const { isSidebarOpen, setSidebarOpen, dynamicOutputs, isRowDrawerOpen } = useWorkspaceNavigation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const isNextVersion = location.pathname !== '/classic'; // Next version = not /classic
  
  // Check version preference on mount
  useEffect(() => {
    const version = localStorage.getItem('cocounsel-version');
    if (version === 'classic' && location.pathname === '/') {
      navigate('/classic');
    }
  }, []);

  // Reset sidebar state when navigating to home
  useEffect(() => {
    if (isHome) {
      setSidebarOpen(false);
    }
  }, [isHome, setSidebarOpen]);

  // Handle onboarding display
  useEffect(() => {
    // Check if coming from Now (via URL parameter)
    const fromNow = searchParams.get('from') === 'now' || searchParams.get('showOnboarding') === 'true';
    
    // If coming from Now, always show onboarding (regardless of localStorage)
    if (fromNow && isHome) {
      setShowOnboarding(true);
      return;
    }

    // Listen for custom event to show onboarding tour (only on home)
    if (isHome) {
      const handleShowTour = () => {
        setShowOnboarding(true);
      };

      window.addEventListener('showOnboardingTour', handleShowTour);
      return () => window.removeEventListener('showOnboardingTour', handleShowTour);
    }
  }, [isHome, searchParams]);

  const handleNextOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  const handleSnoozeOnboarding = () => {
    setShowOnboarding(false);
  };

  const handleToggleClick = () => {
    if (isNextVersion) {
      // Currently on Next, switch to Now (classic)
      localStorage.setItem('cocounsel-version', 'classic');
      navigate('/classic');
    } else {
      // Currently on Now, switch to Next (home)
      localStorage.setItem('cocounsel-version', 'next');
      navigate('/');
    }
  };
  
  // Determine direction
  // If going to Home, direction is -1 (Back)
  // If going to Workspace, direction is 1 (Forward)
  const direction = isHome ? -1 : 1;

  const workspaceMatch = matchPath(
    { path: "workspace/:workspaceName" },
    location.pathname
  );
  
  const workspaceName = workspaceMatch?.params.workspaceName;

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="flex h-screen w-full bg-white text-[#212223] font-sans overflow-hidden">
      <Sidebar />
      
      {/* Sliding Sidebar Container */}
      <AnimatePresence mode="wait">
        {(isHome || (isSidebarOpen && !!workspaceMatch && !isRowDrawerOpen)) && (
            <motion.div 
                className="w-[280px] min-[1440px]:w-[328px] h-full relative bg-[#FCFCFC] border-r border-[#E5E5E5] shrink-0 z-10 overflow-hidden"
                initial={{ width: isHome ? 280 : 0, opacity: isHome ? 1 : 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    <motion.div
                        key={isHome ? "home" : "workspace"}
                        custom={direction}
                        variants={{
                            enter: (direction: number) => ({
                                x: direction > 0 ? "100%" : "-20%",
                                opacity: 1,
                                zIndex: direction > 0 ? 1 : 0,
                            }),
                            center: {
                                x: 0,
                                opacity: 1,
                                zIndex: 0,
                            },
                            exit: (direction: number) => ({
                                x: direction < 0 ? "100%" : "-20%",
                                opacity: 1,
                                zIndex: direction < 0 ? 1 : 0,
                            }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 40,
                            mass: 0.8
                        }}
                        className="absolute inset-0 w-full h-full bg-[#FCFCFC]"
                    >
                        {isHome ? (
                            <SidebarExpanded />
                        ) : (
                            <WorkspaceSidebar onToggle={() => setSidebarOpen(false)} dynamicOutputs={dynamicOutputs} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        )}
      </AnimatePresence>
      
      <main className="flex-1 flex min-w-0 overflow-hidden relative h-full bg-[#FCFCFC]">
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative h-full">
            {/* Top Right Version Toggle - Visible on Home and Classic */}
            <AnimatePresence>
              {(isHome || location.pathname === '/classic') && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleToggleClick}
                  className="absolute top-4 right-6 w-[214px] h-[42px] z-50 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  {isNextVersion ? <ToggleActive /> : <ToggleInactive />}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={location.pathname}
                className="flex-1 h-full flex flex-col w-full bg-[#FCFCFC]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1] // Custom ease for smooth "dip" feel
                }}
              >
                 <Outlet />
              </motion.div>
            </AnimatePresence>
        </div>
      </main>

      {/* Onboarding Popover - rendered at root level */}
      <OnboardingPopover 
        isOpen={showOnboarding}
        onNext={handleNextOnboarding}
        onSnooze={handleSnoozeOnboarding}
      />

      {/* Inline Horizon Scan notification toast */}
      <HorizonScanToast />
    </div>
    </DndProvider>
  );
}
