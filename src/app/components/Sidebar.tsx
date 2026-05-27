import { Home, Folders, Library, Search, UserCircle, Settings, MessageCircleCode, Bell, MessageCirclePlus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { clsx } from "clsx";
import { Logo } from "./Logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FigmaLink } from "./FigmaLink";
import { OmniSearchModal } from "./OmniSearchModal";
import { NotificationPanel, MonitoringAlert } from "./monitoring/NotificationPanel";

const navItems = [
  { icon: MessageCirclePlus, label: "New chat", path: "/" },
  { icon: Folders, label: "Workspaces", path: "/projects" },
  { icon: Search, label: "Search", path: "/search", isModal: true },
  { icon: Library, label: "Knowledge", path: "/knowledge" },
];

// Mock alerts data
const MOCK_ALERTS: MonitoringAlert[] = [
  {
    id: 'alert-1',
    monitorId: 'monitor-1',
    monitorTopic: 'Personal jurisdiction developments',
    title: 'New Second Circuit decision on minimum contacts',
    summary: 'The Second Circuit issued a decision refining the analysis for specific jurisdiction in cases involving limited contacts with the forum state.',
    date: '2 hours ago',
    isRead: false,
    type: 'case',
  },
  {
    id: 'alert-2',
    monitorId: 'monitor-2',
    monitorTopic: 'GDPR enforcement and guidance',
    title: 'EU Commission publishes new data transfer guidance',
    summary: 'The European Commission has released updated guidance on international data transfers following recent CJEU decisions.',
    date: '1 day ago',
    isRead: false,
    type: 'guidance',
  },
  {
    id: 'alert-3',
    monitorId: 'monitor-1',
    monitorTopic: 'Personal jurisdiction developments',
    title: 'District court applies Daimler in corporate presence case',
    summary: 'Southern District of New York applies the Daimler general jurisdiction framework to dismiss claims against foreign corporation.',
    date: '3 days ago',
    isRead: true,
    type: 'case',
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showOmniSearch, setShowOmniSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [alerts, setAlerts] = useState<MonitoringAlert[]>(MOCK_ALERTS);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    }

    if (showAccountMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAccountMenu]);

  const handleShowOnboarding = () => {
    setShowAccountMenu(false);
    
    // Navigate to home page first if not already there
    if (location.pathname !== '/') {
      navigate('/');
      // Delay the tour trigger to allow navigation to complete
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('showOnboardingTour'));
      }, 300);
    } else {
      // Already on home, trigger immediately
      window.dispatchEvent(new CustomEvent('showOnboardingTour'));
    }
  };

  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.isModal) {
      e.preventDefault();
      setShowOmniSearch(true);
    } else if (item.path === '/knowledge') {
      // Dispatch custom event to signal Knowledge panel should open
      window.dispatchEvent(new CustomEvent('openKnowledgePanel'));
    }
  };

  const handleMarkAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const handleViewAllAlerts = () => {
    setShowNotifications(false);
    // Navigate to monitoring section in Knowledge page
    navigate('/knowledge');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('openMonitoringSection'));
    }, 100);
  };

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="group w-[60px] h-full flex flex-col bg-[#F2F2F2] border-r border-[#E5E5E5] shrink-0 z-20">
      {/* Brand Header */}
      <div className="h-[60px] flex items-center justify-center pt-2">
        <Link to="/">
          <Logo className="size-7" />
        </Link>
      </div>

      {/* Nav Menu */}
      <div className="flex flex-col flex-1 items-center gap-2 mt-4">
        {navItems.map((item) => {
          const isActive = showOmniSearch
            ? item.label === 'Search'
            : location.pathname === item.path ||
              (item.path === '/projects' && location.pathname.startsWith('/workspace/'));
          return (
            <Tooltip key={item.path}>
              <TooltipTrigger asChild>
                {item.isModal || item.path === '/knowledge' ? (
                  <button
                    onClick={(e) => {
                      handleNavClick(item, e);
                      if (item.path === '/knowledge' && !item.isModal) {
                        navigate(item.path);
                      }
                    }}
                    className={clsx(
                      "w-10 h-10 flex items-center justify-center rounded-md transition-colors",
                      isActive
                        ? "bg-white shadow-sm text-[#1D4B34]"
                        : "text-[#666666] hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="size-[18px]" strokeWidth={1.5} />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={clsx(
                      "w-10 h-10 flex items-center justify-center rounded-md transition-colors",
                      isActive
                        ? "bg-white shadow-sm text-[#1D4B34]"
                        : "text-[#666666] hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="size-[18px]" strokeWidth={1.5} />
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs bg-black text-white border-0">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-1 pb-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <FigmaLink
              to="/developer-guide"
              className="w-12 h-12 flex items-center justify-center text-[#212223] hover:bg-gray-100 rounded-md transition-all opacity-0 group-hover:opacity-100"
            >
              <MessageCircleCode className="size-5" />
            </FigmaLink>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs bg-black text-white border-0">
            Notes for developers
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 flex items-center justify-center text-[#212223] hover:bg-gray-100 rounded-md transition-colors relative"
            >
              <Bell className="size-[18px]" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-[#dc2626] border border-white rounded-full" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs bg-black text-white border-0">
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center text-[#212223] hover:bg-gray-100 rounded-md transition-colors">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                alt="Region"
                className="w-[18px] h-[13.5px] object-cover rounded-[1px]"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs bg-black text-white border-0">
            United States
          </TooltipContent>
        </Tooltip>
        <div ref={menuRef} className="relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="w-10 h-10 flex items-center justify-center text-[#212223] hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
              >
                <UserCircle className="size-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs bg-black text-white border-0">
              Account
            </TooltipContent>
          </Tooltip>
          {showAccountMenu && (
            <div className="absolute left-full bottom-0 ml-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
              <button
                className="w-full text-left px-4 py-2.5 text-[13px] text-[#212223] hover:bg-gray-50 rounded-lg transition-colors whitespace-nowrap"
                onClick={handleShowOnboarding}
              >
                Show onboarding tour
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Modal - rendered via portal to escape sidebar stacking context */}
      {showOmniSearch && createPortal(
        <OmniSearchModal
          isOpen={showOmniSearch}
          onClose={() => setShowOmniSearch(false)}
        />,
        document.body
      )}

      {/* Notification Panel - rendered via portal */}
      {createPortal(
        <NotificationPanel
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          alerts={alerts}
          onMarkAsRead={handleMarkAsRead}
          onViewAll={handleViewAllAlerts}
        />,
        document.body
      )}
    </div>
  );
}