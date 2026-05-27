import { MoreHorizontal, Share, Edit, Trash2, UserCog } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface MatterDropdownProps {
  matterName: string;
  onShare: (name: string) => void;
  onManageAccess: (name: string) => void;
  className?: string;
  buttonClassName?: string;
}

export function MatterDropdown({ 
  matterName, 
  onShare, 
  onManageAccess,
  className,
  buttonClassName 
}: MatterDropdownProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={className}>
      <DropdownMenu onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button 
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              "p-1 hover:bg-gray-200 rounded text-[#666666] data-[state=open]:bg-gray-200",
              buttonClassName
            )}
            title="More options"
          >
            <MoreHorizontal className="size-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onSelect={() => onShare(matterName)}>
            <Share className="size-3.5 mr-0 text-gray-500" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onManageAccess(matterName)}>
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
  );
}
