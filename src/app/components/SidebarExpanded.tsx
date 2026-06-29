import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router";
import { clsx } from "clsx";
import { createPortal } from "react-dom";
import {
  Plus,
  Table,
  ChevronDown,
  ChevronRight,
  Folder,
  MoreHorizontal,
  Share,
  UserCog,
  Edit,
  Trash2,
  FileText,
  MessageCircleMore,
  MessageCircleQuestion,
  Bell,
  FolderInput,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ShareModal } from "./ShareModal";
import { MatterDropdown } from "./MatterDropdown";
import { OmniSearchModal } from "./OmniSearchModal";
import { useWorkspaceNavigation } from "../contexts/WorkspaceNavigationContext";

// Track if sidebar has loaded in this session (resets on page refresh)
let hasSidebarLoaded = false;

export function SidebarExpanded() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [isRecentWorkspacesOpen, setIsRecentWorkspacesOpen] = useState(true);
  const [isRecentActivityOpen, setIsRecentActivityOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loading on initial app load (not on navigation)
    return !hasSidebarLoaded;
  });

  // Share modal state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareModalItem, setShareModalItem] = useState<{ name: string; type: 'output' | 'file' | 'folder' | 'matter' | 'document' | 'tab'; initialMode?: 'share' | 'manage' }>({ name: '', type: 'matter' });

  // History modal state
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Simulate loading delay
      const timer = setTimeout(() => {
        setIsLoading(false);
        hasSidebarLoaded = true;
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const recentWorkspaces = [
    "Hernandez v. Pacific Builders Inc",
    "In re: Blue Ridge Trust 2025",
    "State v. Marcus T. Reynolds",
    "Rivera Compliance Review",
    "Doe v. Apex Corp.",
    "Matter of Green Estates",
  ];

  return (
    <div className="w-[280px] h-full flex flex-col bg-[#FCFCFC] border-r border-[#E5E5E5] shrink-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="h-[60px] flex flex-col justify-center px-4 shrink-0 pt-[10px]">
        <Link to="/" className="block">
           <div className="text-[11px] font-medium text-[#212223] leading-none mb-0.5 p-[0px]">Thomson Reuters®</div>
           <div className="text-[16px] font-medium text-[#D64000] leading-none">CoCounsel</div>
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 flex flex-col gap-3">
        <button className="w-full h-9 bg-[#1D4B34] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#153826] transition-colors shadow-sm">
          <Plus className="size-4" strokeWidth={2.5} />
          <span className="text-[14px] font-medium">New workspace</span>
        </button>
        <button className="w-full h-9 bg-white text-[#212223] border border-[#E5E5E5] rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <Table className="size-4 text-[#212223]" strokeWidth={2} />
          <span className="text-[14px] font-medium">New tabular analysis</span>
        </button>
      </div>

      {/* Recent Workspaces */}
      <div className="mt-4">
        <button 
          onClick={() => setIsRecentWorkspacesOpen(!isRecentWorkspacesOpen)}
          className="w-full flex items-center gap-2 px-4 py-2 text-[#212223] hover:bg-gray-50 -mt-2"
          data-tour-step="3"
        >
          {isRecentWorkspacesOpen ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
          <span className="text-[13px] font-semibold text-[#212223]">Recent workspaces</span>
        </button>
        
        {isRecentWorkspacesOpen && (
          <div className="flex flex-col pb-2">
            {isLoading ? (
              <>
                <WorkspaceSkeleton />
                <WorkspaceSkeleton />
                <WorkspaceSkeleton />
                <WorkspaceSkeleton />
                <WorkspaceSkeleton />
                <WorkspaceSkeleton />
              </>
            ) : (
              <>
                {recentWorkspaces.map((workspace, i) => (
                  <WorkspaceItem
                    key={i}
                    workspace={workspace}
                    onShare={(name) => {
                      console.log('[SidebarExpanded] Share clicked for:', name);
                      setShareModalItem({ name, type: 'matter', initialMode: 'share' });
                      setShareModalOpen(true);
                      console.log('[SidebarExpanded] Modal should now be open');
                    }}
                    onManageAccess={(name) => {
                      console.log('[SidebarExpanded] Manage access clicked for:', name);
                      setShareModalItem({ name, type: 'matter', initialMode: 'manage' });
                      setShareModalOpen(true);
                    }}
                  />
                ))}
                <button
                  onClick={() => navigate('/projects')}
                  className="px-4 pt-3 pb-2 text-left text-[13px] font-normal text-[#777777] hover:text-[#1D4B34] transition-colors"
                >
                  View all
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="mt-2">
        <button 
          onClick={() => setIsRecentActivityOpen(!isRecentActivityOpen)}
          className="w-full flex items-center gap-2 px-4 py-2 text-[#212223] hover:bg-gray-50"
          data-tour-step="2"
        >
          {isRecentActivityOpen ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
          <span className="text-[13px] font-semibold text-[#212223]">Recent activity</span>
        </button>
        
        {isRecentActivityOpen && (
          <div className="flex flex-col pb-2">
            {isLoading ? (
              <>
                <ActivitySkeleton />
                <ActivitySkeleton />
                <ActivitySkeleton />
                <ActivitySkeleton />
                <ActivitySkeleton />
              </>
            ) : (
              <>
                {[
                  { type: 'regulatory-table', name: 'SEC regulatory findings', workspace: null },
                  { type: 'table', name: 'Vendor Risk Register', workspace: null },
                  { type: 'doc', name: 'SEC Comment Response Draft', workspace: null },
                  { type: 'chat', name: 'Research on SEC climate rules', workspace: null },
                  { type: 'chat', name: 'Drafting disclosure language', workspace: null },
                  { type: 'research', name: 'CCPA Consumer Rights Research', workspace: null },
                ].map((item, i) => (
                  <ActivityItem
                    key={i}
                    item={item}
                    onShare={(name, type) => {
                      setShareModalItem({ name, type });
                      setShareModalOpen(true);
                    }}
                  />
                ))}
                <button
                  onClick={() => setShowHistoryModal(true)}
                  className="px-4 pt-3 pb-2 text-left text-[13px] font-normal text-[#777777] hover:text-[#1D4B34] transition-colors"
                >
                  View all
                </button>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        itemName={shareModalItem.name}
        itemType={shareModalItem.type}
        initialMode={shareModalItem.initialMode}
      />

      {/* History Modal - rendered via portal to escape sidebar stacking context */}
      {showHistoryModal && createPortal(
        <OmniSearchModal
          isOpen={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
        />,
        document.body
      )}
    </div>
  );
}

function WorkspaceItem({ workspace, onShare, onManageAccess }: { workspace: string, onShare: (name: string) => void, onManageAccess: (name: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="group relative flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left pl-5">
      <Link
        to={`/workspace/${encodeURIComponent(workspace)}`}
        className="flex items-center gap-2 flex-1 min-w-0"
      >
        <Folder className="size-4 text-[#DE6633] fill-[#F8EADD] shrink-0" />
        <span className="text-[14px] font-['Clario'] font-normal text-[#212223] truncate leading-tight group-hover:text-[#1D4B34] transition-colors flex-1 group-hover:pr-8">
          {workspace}
        </span>
      </Link>
      
      {/* Dropdown Menu - appears on hover */}
      <div 
        className={clsx(
          "absolute right-2 transition-opacity z-20",
          isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <DropdownMenu onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200"
              title="More options"
            >
              <MoreHorizontal className="size-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onSelect={() => {
              console.log('=== SHARE BUTTON CLICKED ===');
              console.log('Workspace:', workspace);
              onShare(workspace);
            }}>
              <Share className="size-3.5 mr-0 text-gray-500" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onManageAccess(workspace)}>
              <UserCog className="size-3.5 mr-0 text-gray-500" />
              Manage access
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => console.log('Rename clicked')}>
              <Edit className="size-3.5 mr-0 text-gray-500" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => console.log('Delete clicked')}>
              <Trash2 className="size-3.5 mr-0 text-gray-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function WorkspaceSkeleton() {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 pl-5">
      <div className="size-4 bg-gray-50 rounded shimmer shrink-0"></div>
      <div className="w-40 h-3.5 bg-gray-50 rounded shimmer"></div>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-2 px-4 py-1.5 pl-5">
      <div className="size-4 bg-gray-50 rounded shimmer shrink-0 mt-0.5"></div>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="w-36 h-3.5 bg-gray-50 rounded shimmer"></div>
        <div className="w-28 h-2.5 bg-gray-50 rounded shimmer"></div>
      </div>
    </div>
  );
}

function ActivityItem({ item, onShare }: { item: { type: 'table' | 'doc' | 'chat' | 'research' | 'monitor' | 'regulatory-table', name: string, workspace: string | null }, onShare: (name: string, type: 'output' | 'file' | 'folder' | 'matter' | 'document' | 'tab') => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Map activity type to share type
  const getShareType = (): 'output' | 'file' | 'folder' | 'matter' | 'document' | 'tab' => {
    if (item.type === 'table') return 'output';
    if (item.type === 'doc') return 'document';
    return 'output'; // chat and research are treated as outputs
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (item.workspace) {
      // Navigate to workspace with the specific item
      console.log('[v0] Navigating to workspace with item:', item.workspace, item.name, item.type);
      navigate(`/workspace/${encodeURIComponent(item.workspace)}?open=${encodeURIComponent(item.name)}&type=${item.type}`);
    } else {
      // Workspace-agnostic: Navigate to /chat with URL params to open just this item
      // Add from=recent-activity so CPC flow knows to create a new chat instead of going to workspace
      console.log('[v0] Navigating to workspace-agnostic view:', item.name, item.type);
      navigate(`/chat?open=${encodeURIComponent(item.name)}&type=${item.type}&from=recent-activity`);
    }
  };

  return (
    <div className="group relative flex items-start gap-2 px-4 py-1.5 hover:bg-gray-100 text-left pl-5">
      <button
        onClick={handleClick}
        className="flex items-start gap-2 flex-1 min-w-0 text-left"
      >
        {item.type === 'table' && <Table className="size-4 text-[#666666] shrink-0 mt-0.5" />}
        {item.type === 'doc' && <FileText className="size-4 text-[#666666] shrink-0 mt-0.5" />}
        {item.type === 'chat' && <MessageCircleMore className="size-4 text-[#666666] shrink-0 mt-0.5" />}
        {item.type === 'research' && <MessageCircleQuestion className="size-4 text-[#666666] shrink-0 mt-0.5" />}
        {item.type === 'monitor' && <Bell className="size-4 text-[#666666] shrink-0 mt-0.5" />}
        {item.type === 'regulatory-table' && <Table className="size-4 text-[#666666] shrink-0 mt-0.5" />}
        <div className="flex flex-col min-w-0 flex-1 group-hover:pr-8">
          <span className="text-[14px] text-[#212223] truncate leading-tight group-hover:text-[#1D4B34] transition-colors">
            {item.name}
          </span>
          <span className="text-[11px] text-[#999999] truncate">
            {item.workspace || 'Quick chat'}
          </span>
        </div>
      </button>
      
      {/* Dropdown Menu - appears on hover */}
      <div 
        className={clsx(
          "absolute right-2 top-1.5 transition-opacity z-20",
          isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <DropdownMenu onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200"
              title="More options"
            >
              <MoreHorizontal className="size-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onSelect={() => onShare(item.name, getShareType())}>
              <Share className="size-3.5 mr-0 text-gray-500" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="size-3.5 mr-0 text-gray-500" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderInput className="size-3.5 mr-0 text-gray-500" />
              Move
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="size-3.5 mr-0" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
