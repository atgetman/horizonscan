import { Bell, Pause, Play, MoreHorizontal, Trash2, Edit, Eye } from 'lucide-react';
import { clsx } from 'clsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export interface Monitor {
  id: string;
  topic: string;
  criteria: string;
  frequency: 'real-time' | 'daily' | 'weekly';
  practiceAreas: string[];
  jurisdictions?: string[];
  status: 'active' | 'paused';
  lastScan?: string;
  nextScan?: string;
  alertCount: number;
  createdDate: string;
}

interface MonitoringCardProps {
  monitor: Monitor;
  onEdit: (monitor: Monitor) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onDelete: (id: string) => void;
  onViewResults: (id: string) => void;
}

export function MonitoringCard({
  monitor,
  onEdit,
  onPause,
  onResume,
  onDelete,
  onViewResults
}: MonitoringCardProps) {
  // Monitor card component
  const isPaused = monitor.status === 'paused';

  return (
    <div className={clsx(
      "bg-white relative rounded-lg border border-[#e5e5e5] p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group",
      isPaused && "opacity-60"
    )}>
      <div className="flex items-start gap-3 pr-8">
        <div className="flex items-center justify-center shrink-0 pt-0.5">
          <Bell className={clsx(
            "size-5",
            isPaused ? "text-gray-400" : "text-[#DE6633]"
          )}
          strokeWidth={1.5}
          fill={isPaused ? "#f5f5f5" : "#f8eadd"}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-['Clario'] font-medium text-[#212223] leading-tight mb-1">
            {monitor.topic}
          </h3>
          <p className="text-[13px] font-['Source_Sans_3'] font-normal text-gray-500 line-clamp-2 mb-2">
            {monitor.criteria}
          </p>
          <div className="flex gap-1.5 items-center">
            <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
              <p className="leading-[1.2]">{monitor.frequency}</p>
            </div>
            {monitor.lastScan && (
              <>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <div className="flex flex-col font-['Source_Sans_3'] font-normal justify-center leading-[0] text-[#666] text-[14px]">
                  <p className="leading-[1.2]">Last scan {monitor.lastScan}</p>
                </div>
              </>
            )}
            {monitor.alertCount > 0 && (
              <>
                <div className="size-1 rounded-full bg-[#8A8A8A]" />
                <span className="text-[12px] font-['Source_Sans_3'] font-medium text-[#1d4b34] bg-[#edf2f0] px-2.5 py-0.5 rounded-full">
                  {monitor.alertCount} new
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu - positioned in top right */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
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
            <DropdownMenuItem onClick={() => onEdit(monitor)}>
              <Edit className="size-3.5 mr-0 text-gray-500" />
              Edit
            </DropdownMenuItem>
            {isPaused ? (
              <DropdownMenuItem onClick={() => onResume(monitor.id)}>
                <Play className="size-3.5 mr-0 text-gray-500" />
                Resume
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onPause(monitor.id)}>
                <Pause className="size-3.5 mr-0 text-gray-500" />
                Pause
              </DropdownMenuItem>
            )}
            {monitor.alertCount > 0 && (
              <DropdownMenuItem onClick={() => onViewResults(monitor.id)}>
                <Eye className="size-3.5 mr-0 text-gray-500" />
                View results
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onDelete(monitor.id)}>
              <Trash2 className="size-3.5 mr-0 text-gray-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
