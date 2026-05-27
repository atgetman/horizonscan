import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { X, Blocks, PanelLeft } from 'lucide-react';
import { SkillTestingContent } from '../components/SkillTestingContent';
import { useWorkspaceNavigation } from '../contexts/WorkspaceNavigationContext';

export default function SkillTesting() {
  const navigate = useNavigate();
  const location = useLocation();
  const skillName = location.state?.skillName || 'Unnamed Skill';
  const { isSidebarOpen, setSidebarOpen } = useWorkspaceNavigation();
  const [showTab, setShowTab] = useState(false);
  
  // Collapse sidebar when component mounts
  useEffect(() => {
    setSidebarOpen(false);
    
    // Restore sidebar when leaving
    return () => {
      setSidebarOpen(true);
    };
  }, [setSidebarOpen]);

  const handleClose = () => {
    navigate('/knowledge');
  };

  const handleShowTab = () => {
    setShowTab(true);
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#FCFCFC]">
      {/* Tab Bar - only shown after first message */}
      {showTab && (
        <>
          <style>{`
            @keyframes slideDown {
              0% { transform: translateY(-100%); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
          `}</style>
          <div 
            className="h-[44px] flex items-end px-2 border-b border-[#E3E4E6] shrink-0 gap-1 pt-2 overflow-visible bg-[#f7f7f7]"
            style={{
              transform: 'translateY(-100%)',
              opacity: 0,
              animation: 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards'
            }}
          >
            {/* Sidebar toggle when collapsed */}
            {!isSidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-md hover:bg-[#f3f4f6] text-[#666666] shrink-0 mb-1"
              >
                <PanelLeft className="size-4" />
              </button>
            )}

            {/* Tab */}
            <div className="flex items-end gap-1 flex-1 min-w-0">
              <div 
                className="group relative flex items-center gap-1.5 py-1.5 rounded-t-lg cursor-pointer text-[13px] select-none border-t border-x px-2 bg-[#FCFCFC] border-[#E3E4E6] text-[#212223] shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.03)] -mb-[1px] z-10 h-[37px] font-medium min-w-[120px] max-w-[200px] transition-[width,background-color,border-color,box-shadow] duration-200 ease-in-out"
              >
                <Blocks className="size-3.5 shrink-0 pl-0.5 text-[#212223]" />
                <span className="truncate flex-1 min-w-0">
                  {skillName}
                </span>
                <button
                  onClick={handleClose}
                  className="p-0.5 rounded-md hover:bg-black/10 shrink-0 block"
                >
                  <X className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <SkillTestingContent skillName={skillName} onShowTab={handleShowTab} />
      </div>
    </div>
  );
}
