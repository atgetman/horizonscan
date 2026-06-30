import { Folder, Plus, Search, ChevronDown, Info, MoreHorizontal, Share, Edit, Trash2, UserCog } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { clsx } from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ShareModal } from "../components/ShareModal";

interface Project {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  recencyRank: number;
  isPlaceholder?: boolean;
}

const projectsData: Project[] = [
  {
    id: "8",
    name: "AI Governance",
    description: "Defining model risk, oversight, and responsible-AI policies across the enterprise.",
    timestamp: "30 minutes ago",
    recencyRank: 0
  },
  {
    id: "1",
    name: "SEC Climate Disclosure Program",
    description: "Preparing Meridian's climate-related risk disclosures for the upcoming 10-K filing.",
    timestamp: "2 days ago",
    recencyRank: 1
  },
  {
    id: "2",
    name: "GDPR Cross-Border Data Transfer Review",
    description: "Validating SCCs and transfer impact assessments for EU customer data flows.",
    timestamp: "2 days ago",
    recencyRank: 2
  },
  {
    id: "3",
    name: "CCPA & State Privacy Compliance",
    description: "Building a multi-state consumer privacy program across new 2025 statutes.",
    timestamp: "2 days ago",
    recencyRank: 3
  },
  {
    id: "5",
    name: "Vendor DPA Remediation",
    description: "Reviewing data processing agreements across third-party vendors for compliance gaps.",
    timestamp: "2 days ago",
    recencyRank: 4
  },
  {
    id: "6",
    name: "EU AI Act Readiness",
    description: "Establishing governance controls for ML credit and underwriting models.",
    timestamp: "2 days ago",
    recencyRank: 5
  },
  {
    id: "7",
    name: "AML / KYC Policy Refresh",
    description: "Updating Meridian's anti-money-laundering program against new FinCEN guidance.",
    timestamp: "2 days ago",
    recencyRank: 6
  },
  {
    id: "4",
    name: "Project Harbor — Fintech Acquisition Diligence",
    description: "Regulatory diligence for the $85M acquisition of Sterling Capital, including licensing and HSR.",
    timestamp: "3 days ago",
    recencyRank: 7
  }
];

export function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Recent");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareModalItem, setShareModalItem] = useState<{ name: string; type: 'output' | 'file' | 'folder' | 'matter' | 'document' | 'tab'; initialMode?: 'share' | 'manage' }>({ name: '', type: 'matter' });

  const filteredProjects = projectsData
    .filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "A to Z"
        ? a.name.localeCompare(b.name)
        : a.recencyRank - b.recencyRank
    );

  return (
    <div className="bg-[#fcfcfc] h-full w-full overflow-y-auto shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1100px] mx-auto pt-[50px] px-[32px]">
        {/* Page Header */}
        <div className="flex items-start justify-between mb-7">
          <div className="flex items-center gap-2">
            <h1 className="text-[32px] font-['Clario'] font-medium text-[#314b3e] leading-[1.1]">Workspaces</h1>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Info className="size-4.5 text-[#212223]" />
            </button>
          </div>
          <button className="h-9 bg-[#314b3e] rounded-lg px-3.5 flex items-center gap-1.5 hover:bg-[#3d5e4d] transition-colors">
            <Plus className="size-4.5 text-white" />
            <span className="text-[14.5px] font-['Clario'] font-medium text-white">New project</span>
          </button>
        </div>

        {/* Search Bar and Sort */}
        <div className="flex items-start justify-between h-9 mb-7">
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="Search projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 bg-white border border-[#d2d2d2] rounded-lg pl-3.5 pr-9 text-[16.5px] font-['Source_Sans_3'] text-[#212223] placeholder:text-[#666] focus:outline-none focus:border-gray-400"
            />
            <div className="absolute right-0 top-0 h-9 w-9 flex items-center justify-center border-l border-[rgba(255,255,255,0.01)]">
              <Search className="size-4.5 text-[#212223]" />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-9 bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.01)] rounded-lg px-2.5 flex items-center gap-1.5 hover:bg-gray-50 transition-colors data-[state=open]:bg-gray-50">
                <span className="text-[14.5px] font-['Clario'] text-[#212223]">
                  <span className="font-normal">Sort by:</span> <span className="font-medium">{sortBy}</span>
                </span>
                <ChevronDown className="size-4 text-[#212223]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {["Recent", "A to Z"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onSelect={() => setSortBy(option)}
                  className={clsx(
                    "text-[14.5px] font-['Source_Sans_3']",
                    sortBy === option && "bg-gray-100 font-medium"
                  )}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-14">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onShare={(name) => {
                setShareModalItem({ name, type: 'matter', initialMode: 'share' });
                setShareModalOpen(true);
              }}
              onManageAccess={(name) => {
                setShareModalItem({ name, type: 'matter', initialMode: 'manage' });
                setShareModalOpen(true);
              }}
            />
          ))}
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
    </div>
  );
}

function ProjectCard({ project, onShare, onManageAccess }: { project: Project | undefined, onShare: (name: string) => void, onManageAccess: (name: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  if (!project) return <div className="w-full" />;

  const bgColor = project.isPlaceholder ? "bg-[#f5f7f6]" : "bg-white";

  return (
    <div className={`${bgColor} relative w-full rounded-lg border border-[#e5e5e5] p-5 flex flex-col gap-3 hover:border-gray-300 hover:shadow-sm transition-all group`}>
      <Link
        to={`/workspace/${encodeURIComponent(project.name)}`}
        className="flex flex-col gap-3"
      >
        {/* Project Name */}
        <div className="flex items-center gap-2">
          <Folder className="size-4.5 text-[#DE6633] fill-[#F8EADD] shrink-0" />
          <h3 className="text-[16px] font-['Clario'] font-medium text-[#212223] leading-[1.2]">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[14.5px] font-['Source_Sans_3'] text-[#404040] leading-[1.35] min-h-[40px]">
          {project.description}
        </p>

        {/* Timestamp */}
        <p className="text-[14.5px] font-['Source_Sans_3'] text-[#666] leading-[1.35]">
          {project.timestamp}
        </p>
      </Link>

      {/* Dropdown Menu */}
      <div 
        className={clsx(
          "absolute top-3 right-3 transition-opacity",
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
            <DropdownMenuItem onSelect={() => onShare(project.name)}>
              <Share className="size-3.5 mr-0 text-gray-500" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onManageAccess(project.name)}>
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
