import React from 'react';
import { cn } from './utils';

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownSeparatorProps {
  className?: string;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "bg-white text-popover-foreground z-50 min-w-[8rem] origin-top-right overflow-hidden rounded-md border border-[#E3E4E6] p-1 shadow-md",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export function DropdownItem({ children, onClick, className, icon, disabled }: DropdownItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && onClick) {
      onClick();
    }
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-left outline-hidden select-none transition-colors font-normal",
        disabled 
          ? "opacity-50 cursor-not-allowed" 
          : "cursor-default hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:text-gray-500",
        className
      )}
    >
      {icon}
      {children}
    </button>
  );
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return (
    <div 
      className={cn(
        "h-px bg-border my-1",
        className
      )} 
    />
  );
}