import { useState, useRef, useEffect } from "react";
import { ChevronsUpDown, Check } from "lucide-react";

interface SingleSelectProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SingleSelect({
  label,
  options,
  selectedValue,
  onChange,
  className = "",
}: SingleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label || label;

  return (
    <div ref={containerRef} className={`relative w-[176px] ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-9 pl-3 pr-9 border border-[#d2d2d2] rounded-lg text-[13px] font-['Source_Sans_3'] bg-white hover:bg-gray-50 transition-colors text-left text-[#212223]"
      >
        {selectedLabel}
      </button>

      <ChevronsUpDown 
        className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#666] cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#d2d2d2] rounded-md shadow-lg z-50 max-h-[300px] overflow-y-auto">
          {/* Options List */}
          {options.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelectOption(option.value)}
                className={`w-full flex items-center px-3 py-2 text-[13px] font-['Source_Sans_3'] hover:bg-gray-50 transition-colors text-left ${
                  isSelected ? 'text-[#314b3e] font-semibold' : 'text-[#212223]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}