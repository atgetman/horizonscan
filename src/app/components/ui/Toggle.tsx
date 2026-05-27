"use client";

import * as React from "react";
import { cn } from "./utils";

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleProps {
  value: string;
  onChange: (value: string) => void;
  options: ToggleOption[];
  className?: string;
}

export function Toggle({ value, onChange, options, className }: ToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg bg-[#f5f5f5] p-1",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
            value === option.value
              ? "bg-white text-[#314b3e] shadow-sm"
              : "text-[#6b7280] hover:text-[#314b3e]"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
