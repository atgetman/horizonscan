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
        "inline-flex items-center rounded-[8px] bg-[#f0f2f1] p-[4px] gap-[2px]",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "px-[16px] py-[6px] text-[14px] font-medium rounded-[6px] transition-all font-['Source_Sans_3',sans-serif]",
            value === option.value
              ? "bg-white text-[#1d4b34] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
              : "text-[#5c5c5c] hover:text-[#1d4b34] bg-transparent"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
