import {
  ChevronDown,
  ChevronRight,
  Folder,
  FileText,
  Table,
  Plus,
  FilePlus,
  FileUp,
  MessageCircleMore,
  MessageCircleQuestion,
  MessageCirclePlus,
  Home,
  PanelLeftClose,
  MoreHorizontal,
  Share,
  FolderInput,
  Trash2,
  Upload,
  Globe,
  Search,
  X,
  Clock,
  MoreVertical,
  Edit,
  FolderDot,
  FolderUp,
  FolderPlus,
  TriangleAlert,
  Component,
  UserCog,
  FolderClock,
  Info
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLocation, Link, matchPath } from "react-router";
import { clsx } from "clsx";
import { createPortal } from "react-dom";
import { ALL_FILES, FileSystemItem } from "../data/mockData";
import { useWorkspaceNavigation } from "../contexts/WorkspaceNavigationContext";
import { useDrag } from "react-dnd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { WorkspaceDetailsPanel } from "./WorkspaceDetailsPanel";
import { ShareModal } from "./ShareModal";
import { AuditLogModal } from "./AuditLogModal";

// Updated WorkspaceSidebar - no tabs, integrated search toolbar
export function WorkspaceSidebar({ onToggle, dynamicOutputs = [] }: { onToggle: () => void, dynamicOutputs?: Array<{type: string, name: string}> }) {
  const location = useLocation();
  const match = matchPath({ path: "/workspace/:workspaceName" }, location.pathname);
  const workspaceName = match?.params.workspaceName;
  const decodedName = decodeURIComponent(workspaceName || "Untitled Project");
  const { openItem, attachItem } = useWorkspaceNavigation();

  const [inputsOpen, setInputsOpen] = useState(true);
  const [outputsOpen, setOutputsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const [fileCountMenuOpen, setFileCountMenuOpen] = useState(false);
  const [artifactsMenuOpen, setArtifactsMenuOpen] = useState(false);
  const [addFilesMenuOpen, setAddFilesMenuOpen] = useState(false);
  
  // Share modal state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareModalItem, setShareModalItem] = useState<{ name: string; type: 'output' | 'file' | 'folder' | 'matter' | 'document' | 'tab'; initialMode?: 'share' | 'manage' }>({ name: '', type: 'file' });
  
  // Audit log modal state
  const [auditLogOpen, setAuditLogOpen] = useState(false);
  
  // Navigation State
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  // Check if we're in the Artifacts folder
  const isArtifactsFolder = currentFolderId === 'artifacts';

  // Derived state for current folder items
  const currentItems = isArtifactsFolder ? [] : ALL_FILES.filter(f => f.parentId === currentFolderId);
  const isRoot = currentFolderId === null;
  
  // Breadcrumb generation
  const getBreadcrumbs = () => {
    const crumbs = [];
    
    // If we're in Artifacts folder, add it
    if (isArtifactsFolder) {
      crumbs.push({ id: 'artifacts', name: 'Artifacts', type: 'folder', parentId: null });
      return crumbs;
    }
    
    let currentId = currentFolderId;
    while (currentId) {
      const folder = ALL_FILES.find(f => f.id === currentId);
      if (folder) {
        crumbs.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }
    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const handleItemClick = (item: FileSystemItem) => {
    if (item.type === 'folder') {
      setCurrentFolderId(item.id);
    } else {
      openItem({ name: item.name, type: item.type });
    }
  };

  const outputFiles = [
    ...dynamicOutputs, // Add dynamic outputs first (at the top)
    { type: "table", name: "Vendor Risk Register" },
    { type: "doc", name: "SEC Comment Letter Response Draft" },
    { type: "research", name: "GDPR Cross-Border Transfer Rules" },
    { type: "doc", name: "Memo on Data Transfer Obligations" },
  ];

  const recentChats = [
    { type: "chat", name: "Research on SEC climate rules" },
    { type: "chat", name: "Summary of vendor risk findings" },
    { type: "chat", name: "Drafting disclosure language" },
  ];

  return (
    <div className="h-full flex flex-col bg-[#FCFCFC] shrink-0 overflow-y-auto">
      {/* Header with Back Button */}
      <div className="px-[16px] pt-[13px] pb-[8px]">
         <div className="flex items-center justify-between mb-4">
            <Link to={(location.state as any)?.backPath || "/"} className="flex items-center gap-1 text-[#808080] hover:text-[#212223] text-[13px] font-medium">
                <ChevronRight className="size-3 rotate-180" />
                {(location.state as any)?.backLabel || "Home"}
            </Link>
            <div className="flex items-center gap-1">
              {/* Ellipsis menu button */}
              <div className="relative">
                <button 
                    className="text-[#808080] hover:bg-gray-100 p-1 rounded"
                    title="More options"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHeaderMenuOpen(!headerMenuOpen);
                    }}
                >
                    <MoreHorizontal className="size-4" />
                </button>
                {headerMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-[90]"
                      onClick={() => setHeaderMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-[91]">
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeaderMenuOpen(false);
                          setShareModalItem({ name: decodedName, type: 'matter' });
                          setShareModalOpen(true);
                        }}
                      >
                        <Share className="size-3.5 text-gray-500" />
                        Share
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeaderMenuOpen(false);
                          setShareModalItem({ name: decodedName, type: 'matter', initialMode: 'manage' });
                          setShareModalOpen(true);
                        }}
                      >
                        <UserCog className="size-3.5 text-gray-500" />
                        Manage access
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeaderMenuOpen(false);
                          setAuditLogOpen(true);
                        }}
                      >
                        <FolderClock className="size-3.5 text-gray-500" />
                        Audit log
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeaderMenuOpen(false);
                        }}
                      >
                        <Edit className="size-3.5 text-gray-500" />
                        Rename
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeaderMenuOpen(false);
                        }}
                      >
                        <Trash2 className="size-3.5 text-gray-500" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              {/* Collapse button */}
              <button 
                  onClick={onToggle}
                  className="text-[#808080] hover:bg-gray-100 p-1 rounded"
                  title="Collapse sidebar"
              >
                  <PanelLeftClose className="size-4" />
              </button>
            </div>
         </div>

         <div className="flex items-start justify-between px-[0px] pt-[12px] pb-[0px]">
            <h2 className="text-[20px] font-medium text-[#212223] leading-snug mb-3 line-clamp-2">
                {decodedName}
            </h2>
         </div>

         {/* Toolbar with Search and New button */}
         <div className="flex items-center gap-2 pt-2 pb-2">
           <div className={clsx("relative transition-all duration-[400ms] ease-out", searchFocused ? "flex-1" : "flex-1")}>
             <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#666666]" />
             <input
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onFocus={() => setSearchFocused(true)}
               onBlur={() => setSearchFocused(false)}
               placeholder="Search workspace"
               className={clsx(
                 "w-full h-8 pl-[30px] text-[13px] bg-white border rounded-lg focus:outline-none transition-all duration-[400ms] ease-out",
                 searchFocused ? "border-[#1D4B34] pr-9" : "border-gray-300 pr-3"
               )}
             />
             {searchFocused && (
               <button
                 onMouseDown={(e) => {
                   e.preventDefault();
                   setSearchQuery("");
                   // Blur the input to deactivate search state
                   const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                   if (input) input.blur();
                 }}
                 className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
               >
                 <X className="size-3.5" />
               </button>
             )}
           </div>
           <div className={clsx(
             "relative transition-all duration-[400ms] ease-out",
             searchFocused ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
           )}>
             <button
               onClick={() => setNewMenuOpen(!newMenuOpen)}
               className="h-8 pl-3 pr-2 bg-[#1D4B34] border border-[#1D4B34] rounded-lg text-[13px] font-medium text-white hover:bg-[#163d29] transition-colors flex items-center gap-0.5 whitespace-nowrap"
             >
               <span className="relative -top-[1px]">New</span>
               <ChevronDown className="size-3.5" />
             </button>
             {newMenuOpen && (
               <>
                 <div 
                   className="fixed inset-0 z-[90]"
                   onClick={() => setNewMenuOpen(false)}
                 />
                 <div className="absolute right-0 top-full mt-1 w-[160px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-[91]">
                   <button
                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                     onClick={(e) => {
                       e.stopPropagation();
                       setNewMenuOpen(false);
                     }}
                   >
                     <MessageCirclePlus className="size-3.5 text-gray-500" />
                     New chat
                   </button>
                   <button
                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                     onClick={(e) => {
                       e.stopPropagation();
                       setNewMenuOpen(false);
                     }}
                   >
                     <Table className="size-3.5 text-gray-500" />
                     Tabular analysis
                   </button>
                   <div className="border-t border-gray-200 my-1" />
                   <button
                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                     onClick={(e) => {
                       e.stopPropagation();
                       setNewMenuOpen(false);
                       setAddFilesMenuOpen(true);
                     }}
                   >
                     <FileUp className="size-3.5 text-gray-500" />
                     Upload files
                   </button>
                   <button
                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                     onClick={(e) => {
                       e.stopPropagation();
                       setNewMenuOpen(false);
                     }}
                   >
                     <FolderUp className="size-3.5 text-gray-500" />
                     Upload folders
                   </button>
                   <div className="border-t border-gray-200 my-1" />
                   <button
                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                     onClick={(e) => {
                       e.stopPropagation();
                       setNewMenuOpen(false);
                     }}
                   >
                     <Info className="size-3.5 text-gray-500" />
                     File limit info
                   </button>
                   <div className="px-[12px] pt-[4px] pb-[8px]">
                     <div className="text-xs text-gray-600 mb-1.5">
                       {ALL_FILES.length} of 200 files used
                     </div>
                     <div className="bg-gray-200 h-1.5 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-[#1D4B34] rounded-full transition-all duration-300"
                         style={{ width: `${(ALL_FILES.length / 200) * 100}%` }}
                       />
                     </div>
                   </div>
                 </div>
               </>
             )}
           </div>
         </div>

         {/* Breadcrumbs */}
         {!isRoot && (
            <div className="flex items-center gap-1 text-[11px] text-[#666666] border-b border-transparent h-[30px] px-[0px] py-[2px] mt-3">
              <button 
                onClick={() => setCurrentFolderId(null)}
                className={clsx("hover:text-[#212223] flex items-center p-1 rounded hover:bg-gray-100", currentFolderId === null && "text-[#212223]")}
                title="Home"
              >
                <Home className="size-3.5" />
              </button>
              {breadcrumbs.map((crumb) => (
                <div key={crumb.id} className="flex items-center gap-1 min-w-0">
                  <ChevronRight className="size-3 text-[#999999] shrink-0" />
                  <button 
                    onClick={() => setCurrentFolderId(crumb.id)}
                    className={clsx("text-[12px] text-[#808080] hover:text-[#212223] hover:underline truncate", currentFolderId === crumb.id && "font-semibold text-[#212223]")}
                  >
                    {crumb.name}
                  </button>
                </div>
              ))}
            </div>
         )}
      </div>

      {/* Files Section */}
      <div className="mt-1">
        {isRoot ? (
            <>
            <div className="group/header relative w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => setInputsOpen(!inputsOpen)} data-tour-step="5">
              <div className="flex items-center gap-2" onClick={() => setInputsOpen(!inputsOpen)}>
                {inputsOpen ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
                <span className="text-[13px] font-semibold text-[#212223]">Files</span>
              </div>
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddFilesMenuOpen(!addFilesMenuOpen);
                  }}
                  className="p-1 hover:bg-gray-100 rounded border border-gray-300 text-[#666666] transition-colors"
                  title="Add files"
                >
                  <FilePlus className="size-3.5" />
                </button>
                {addFilesMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-[90]"
                      onClick={() => setAddFilesMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-[160px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-[91]">
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddFilesMenuOpen(false);
                        }}
                      >
                        <FileUp className="size-3.5 text-gray-500" />
                        Upload files
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddFilesMenuOpen(false);
                        }}
                      >
                        <FolderUp className="size-3.5 text-gray-500" />
                        Upload folders
                      </button>
                      <div className="border-t border-gray-200 my-1" />
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddFilesMenuOpen(false);
                        }}
                      >
                        <Info className="size-3.5 text-gray-500" />
                        File limit info
                      </button>
                      <div className="px-[12px] pt-[4px] pb-[8px]">
                        <div className="text-xs text-gray-600 mb-1.5">
                          {ALL_FILES.length} of 200 files used
                        </div>
                        <div className="bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#1D4B34] rounded-full transition-all duration-300"
                            style={{ width: `${(ALL_FILES.length / 200) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {inputsOpen && (
              <div className="flex flex-col pb-2">
                {/* Special Artifacts folder - filtered by search like everything else */}
                {(!searchQuery || 'artifacts'.includes(searchQuery.toLowerCase())) && (
                  <div 
                    onClick={() => setCurrentFolderId('artifacts')}
                    className="group relative flex items-center gap-2 px-4 py-1.5 hover:bg-gray-100 text-left pl-5 cursor-pointer select-none h-[36px]"
                  >
                    <FolderDot className="size-4 text-[#DE6633] fill-[#F8EADD] shrink-0" />
                    <span className="text-[14px] text-[#212223] truncate leading-tight flex-1 group-hover:pr-12 transition-all">
                      Chat outputs
                    </span>
                    <div className={clsx("absolute right-2 flex items-center gap-1 transition-opacity z-20", artifactsMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          attachItem({ name: "Artifacts", type: "folder" });
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-[#666666] relative z-[21] pointer-events-auto"
                        title="Add to prompt"
                      >
                        <Plus className="size-3.5" />
                      </button>
                      <DropdownMenu onOpenChange={setArtifactsMenuOpen}>
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
                          <DropdownMenuItem onClick={(e) => {
                            e.preventDefault();
                            setShareModalItem({ name: "Artifacts", type: 'folder' });
                            setShareModalOpen(true);
                          }}>
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
                )}
                
                {/* Regular files - filtered by search */}
                {(() => {
                  const hasArtifacts = !searchQuery || 'artifacts'.includes(searchQuery.toLowerCase());
                  const filteredFiles = currentItems.filter(item => 
                    !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                  const hasFiles = filteredFiles.length > 0;
                  const showNoResults = searchQuery && !hasArtifacts && !hasFiles;
                  
                  if (showNoResults) {
                    return <div className="px-8 py-2 text-xs text-gray-400 italic">No results in files</div>;
                  }
                  
                  return filteredFiles.map((item) => (
                    <DraggableItem 
                        key={item.id} 
                        item={{ name: item.name, type: item.type }} 
                        onClick={() => handleItemClick(item)}
                        onAttach={() => attachItem({ name: item.name, type: item.type })}
                        onShare={(name, type) => {
                          setShareModalItem({ name, type });
                          setShareModalOpen(true);
                        }}
                    />
                  ));
                })()}
              </div>
            )}
            </>
        ) : (
            <div className="flex flex-col py-1">
                {isArtifactsFolder ? (
                  // Show outputs when inside Artifacts folder
                  outputFiles
                    .filter(item => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item, i) => (
                      <DraggableItem 
                        key={i} 
                        item={item} 
                        onClick={() => openItem({ name: item.name, type: item.type })}
                        onAttach={() => attachItem({ name: item.name, type: item.type })}
                        onShare={(name, type) => {
                          setShareModalItem({ name, type: type as any });
                          setShareModalOpen(true);
                        }}
                      />
                    ))
                ) : (
                  // Show regular files when in other folders
                  renderFileList(currentItems, handleItemClick, attachItem, (name, type) => {
                    setShareModalItem({ name, type });
                    setShareModalOpen(true);
                  }, searchQuery)
                )}
            </div>
        )}
      </div>

      {/* Recent Activity Section - Only at Root */}
      {isRoot && (
        <div className="mt-2 border-t border-[#E5E5E5] pt-2">
          <button 
            onClick={() => setOutputsOpen(!outputsOpen)}
            className="w-full flex items-center gap-2 px-4 py-2 text-[#212223] hover:bg-gray-50"
          >
            {outputsOpen ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
            <span className="text-[13px] font-semibold text-[#212223]">Recent activity</span>
          </button>
          
          {outputsOpen && (
            <div className="flex flex-col pb-2">
              {/* Mix chats and outputs together - intersperse chats among outputs */}
              {(() => {
                const mixed = [];
                const outputs = outputFiles.filter(item => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()));
                const chats = recentChats.filter(item => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()));
                
                // Start with first output
                if (outputs[0]) mixed.push(outputs[0]);
                if (outputs[1]) mixed.push(outputs[1]);
                
                // Add first chat
                if (chats[0]) mixed.push(chats[0]);
                
                // Add more outputs
                if (outputs[2]) mixed.push(outputs[2]);
                
                // Add second chat
                if (chats[1]) mixed.push(chats[1]);
                
                // Add remaining outputs
                if (outputs[3]) mixed.push(outputs[3]);
                
                // Add third chat
                if (chats[2]) mixed.push(chats[2]);
                
                // Add any remaining items
                outputs.slice(4).forEach(item => mixed.push(item));
                chats.slice(3).forEach(item => mixed.push(item));
                
                // If search is active and no results, show message
                if (searchQuery && mixed.length === 0) {
                  return <div className="px-8 py-2 text-xs text-gray-400 italic">No results in recent activity</div>;
                }
                
                return mixed.map((item, i) => (
                  <DraggableItem 
                      key={i} 
                      item={item} 
                      onClick={() => openItem({ name: item.name, type: item.type })}
                      onAttach={() => attachItem({ name: item.name, type: item.type })}
                      onShare={(name, type) => {
                        setShareModalItem({ name, type });
                        setShareModalOpen(true);
                      }}
                  />
                ));
              })()}
            </div>
          )}
        </div>
      )}

      {/* File Count Indicator */}
      <div className="mt-auto px-4 py-3">
        <div className="relative bg-gradient-to-t from-[rgba(214,64,0,0.06)] to-[rgba(0,0,0,0)] rounded-lg">
          <button
            onClick={() => setFileCountMenuOpen(!fileCountMenuOpen)}
            className="w-full bg-[rgba(250,250,250,0.5)] rounded-lg relative cursor-pointer hover:bg-[rgba(250,250,250,0.8)] transition-colors h-[50px]"
          >
            <div className="flex items-center gap-3 px-[12px] py-[8px] pb-[12px] opacity-0">
              <FolderUp className="size-4 text-[#404040] shrink-0" />
            </div>
          </button>
          
          {fileCountMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-[90]"
                onClick={() => setFileCountMenuOpen(false)}
              />
              <div className="absolute left-0 bottom-full mb-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-[91]">
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileCountMenuOpen(false);
                  }}
                >
                  <Upload className="size-3.5 text-gray-500" />
                  Add from device
                </button>
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileCountMenuOpen(false);
                  }}
                >
                  <Component className="size-3.5 text-gray-500" />
                  Search all sources
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        itemName={shareModalItem.name}
        itemType={shareModalItem.type}
        initialMode={shareModalItem.initialMode}
      />

      {/* Audit Log Modal */}
      <AuditLogModal
        isOpen={auditLogOpen}
        onClose={() => setAuditLogOpen(false)}
        projectName={decodedName}
      />

    </div>
  );
}

function DraggableItem({ item, onClick, onAttach, onShare }: { 
  item: {name: string, type: string}, 
  onClick: () => void, 
  onAttach: () => void,
  onShare: (name: string, type: 'file' | 'folder' | 'output' | 'document') => void
}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'FILE_ITEM',
        item: { name: item.name, type: item.type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Mock Presence Logic
    let presence: { initials: string, color: string, name: string }[] | null = null;
    if (item.name === "SEC Comment Response Draft") {
        presence = [
            { initials: "A", color: "#EAB308", name: "Alice Johnson" }, // Yellow
            { initials: "K", color: "#2563EB", name: "Kevin Smith" }, // Blue
            { initials: "+5", color: "#F3F4F6", name: "5 others" }, // Gray
        ];
    } else if (item.name === "Vendor Risk Register") {
        presence = [
            { initials: "M", color: "#9333EA", name: "Michael Brown" } // Purple
        ];
    }

    return (
        <div 
          ref={drag}
          onClick={onClick}
          style={{ opacity: isDragging ? 0.5 : 1 }}
          className="group relative flex items-center gap-2 px-4 py-1.5 hover:bg-gray-100 text-left pl-5 cursor-pointer select-none h-[36px]"
        >
           {item.type === 'table' && <Table className="size-4 text-[#666666] shrink-0" />}
           {item.type === 'doc' && <FileText className="size-4 text-[#666666] shrink-0" />}
           {item.type === 'research' && <MessageCircleQuestion className="size-4 text-[#666666] shrink-0" />}
           {item.type === 'chat' && <MessageCircleMore className="size-4 text-[#666666] shrink-0" />}
           {item.type === 'folder' && <Folder className="size-4 text-[#DE6633] fill-[#F8EADD] shrink-0" />}
           {item.type === 'file' && <FileText className="size-4 text-[#054688] shrink-0" />}
          <span className="text-[14px] text-[#212223] truncate leading-tight flex-1 group-hover:pr-12 transition-all">
            {item.name}
          </span>
          
          {/* Presence Avatars */}
          {presence && (
            <div 
                className={clsx(
                    "absolute flex items-center -space-x-1.5 transition-all duration-200 ease-in-out z-10 right-4",
                    (isMenuOpen || "group-hover:translate-x-[-48px]") // Shift left on hover
                )}
            >
                {presence.map((u, i) => (
                    <Tooltip key={i}>
                        <TooltipTrigger asChild>
                            <div 
                                className={clsx(
                                    "w-[18px] h-[18px] rounded-full flex items-center justify-center text-[8px] font-medium border border-white ring-1 ring-white shadow-sm cursor-default",
                                    u.initials.startsWith("+") ? "bg-gray-100 text-gray-500 ring-gray-100" : "text-white"
                                )}
                                style={{ backgroundColor: u.initials.startsWith("+") ? undefined : u.color }}
                            >
                                {u.initials}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs bg-black text-white border-0">
                            {u.name}
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
          )}

          <div 
            className={clsx(
              "absolute right-2 flex items-center gap-1 transition-opacity z-20",
              isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <button 
                onClick={(e) => {
                e.stopPropagation();
                onAttach();
                }}
                className="p-1 hover:bg-gray-200 rounded text-[#666666] relative z-[21] pointer-events-auto"
                title="Add to prompt"
            >
                <Plus className="size-3.5" />
            </button>
            <DropdownMenu onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200"
                        title="More options"
                    >
                        <MoreHorizontal className="size-3.5" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={(e) => {
                        e.preventDefault();
                        onShare(item.name, item.type === 'folder' ? 'folder' : item.type === 'file' ? 'file' : 'output');
                    }}>
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

function renderFileList(
  items: FileSystemItem[], 
  onClick: (item: FileSystemItem) => void, 
  onAttach: (item: {name: string, type: string}) => void,
  onShare: (name: string, type: 'file' | 'folder' | 'output' | 'document') => void,
  searchQuery: string
) {
    // Filter items based on search query
    const filteredItems = items.filter(item => 
      !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filteredItems.length === 0) {
        return <div className="px-8 py-2 text-xs text-gray-400 italic">Empty folder</div>;
    }
    return filteredItems.map((item) => (
        <DraggableItem 
            key={item.id} 
            item={{ name: item.name, type: item.type }} 
            onClick={() => onClick(item)}
            onAttach={() => onAttach({ name: item.name, type: item.type })}
            onShare={onShare}
        />
    ));
}

// Search Modal Component
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onItemClick: (item: { name: string; type: string }) => void;
  allInputs: FileSystemItem[];
  allOutputs: { type: string; name: string }[];
  allChats: { type: string; name: string }[];
}

function SearchModal({ 
  isOpen, 
  onClose, 
  searchQuery, 
  setSearchQuery, 
  onItemClick,
  allInputs,
  allOutputs,
  allChats
}: SearchModalProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-focus search input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Combine all items for search
  const allItems = [
    ...allChats.map(item => ({ ...item, category: 'chat', time: 'Today' })),
    ...allOutputs.map(item => ({ ...item, category: 'output', time: 'Previous 7 Days' })),
    ...allInputs.map(item => ({ ...item, category: 'input', time: 'Previous 30 Days' }))
  ];

  // Filter items based on search query
  const filteredItems = searchQuery
    ? allItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allItems;

  // Group by time periods
  const recentItems = filteredItems.filter(item => item.time === 'Today');
  const previous7Days = filteredItems.filter(item => item.time === 'Previous 7 Days');
  const previous30Days = filteredItems.filter(item => item.time === 'Previous 30 Days');

  const getIcon = (type: string) => {
    switch (type) {
      case 'chat': return <MessageCircleMore className="size-5 text-gray-500" />;
      case 'table': return <Table className="size-5 text-gray-500" />;
      case 'doc': return <FileText className="size-5 text-gray-500" />;
      case 'research': return <MessageCircleQuestion className="size-5 text-gray-500" />;
      case 'folder': return <Folder className="size-5 text-[#DE6633] fill-[#F8EADD]" />;
      case 'file': return <FileText className="size-5 text-[#054688]" />;
      default: return <FileText className="size-5 text-gray-500" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-start justify-center z-[100] pt-40"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[600px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
          <Search className="size-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats, files, and outputs..."
            className="flex-1 text-[16px] text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto relative">
          {!searchQuery && (
            <div className="px-3 py-3">
              <button
                onClick={() => {
                  onItemClick({ name: 'New Chat', type: 'chat' });
                }}
                className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MessageCirclePlus className="size-5 text-gray-500" />
                <span className="text-[15px] font-medium text-gray-900">New chat</span>
              </button>
            </div>
          )}

          {/* Recent (Today) */}
          {recentItems.length > 0 && (
            <div className="px-3 py-2">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                Recent
              </div>
              {recentItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => onItemClick({ name: item.name, type: item.type })}
                  className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  {getIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium text-gray-900 truncate">{item.name}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Previous 7 Days */}
          {previous7Days.length > 0 && (
            <div className="px-3 py-2">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                Previous 7 Days
              </div>
              {previous7Days.map((item, i) => (
                <button
                  key={i}
                  onClick={() => onItemClick({ name: item.name, type: item.type })}
                  className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  {getIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium text-gray-900 truncate">{item.name}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Previous 30 Days */}
          {previous30Days.length > 0 && (
            <div className="px-3 py-2">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                Previous 30 Days
              </div>
              {previous30Days.map((item, i) => (
                <button
                  key={i}
                  onClick={() => onItemClick({ name: item.name, type: item.type })}
                  className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  {getIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium text-gray-900 truncate">{item.name}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {searchQuery && filteredItems.length === 0 && (
            <div className="px-3 py-12 text-center">
              <p className="text-[14px] text-gray-500">No results found for "{searchQuery}"</p>
            </div>
          )}

          {/* Fade overlay at bottom to suggest scroll */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-2xl" />
        </div>
      </div>
    </div>
  );
}
