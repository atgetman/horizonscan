import { useState, useRef, useEffect } from "react";
import { ChevronsUpDown, Check } from "lucide-react";

interface MultiSelectProps {
  label: string;
  pluralLabel: string; // e.g., "task types", "practice areas", "tags"
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

export function MultiSelect({
  label,
  pluralLabel,
  options,
  selectedValues,
  onChange,
  className = "",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const selectedLabels = selectedValues
    .map((value) => options.find((opt) => opt.value === value)?.label)
    .filter(Boolean) as string[];

  return (
    <div ref={containerRef} className={`relative w-[176px] ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-9 pl-3 pr-9 border border-[#d2d2d2] rounded-lg text-[13px] font-['Source_Sans_3'] bg-white hover:bg-gray-50 transition-colors text-left ${
          selectedValues.length === 0 ? "text-[#999]" : "text-[#212223]"
        }`}
      >
        {selectedValues.length === 0 ? (
          label
        ) : selectedValues.length === 1 ? (
          selectedLabels[0]
        ) : (
          `${selectedValues.length} ${pluralLabel}`
        )}
      </button>

      <ChevronsUpDown 
        className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#666] cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-[240px] bg-white border border-[#d2d2d2] rounded-md shadow-lg z-50 max-h-[300px] flex flex-col">
          {/* Search Input */}
          <div className="p-2 border-b border-[#e5e5e5]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full h-8 px-3 border border-[#d2d2d2] rounded text-[13px] font-['Source_Sans_3'] text-[#212223] placeholder:text-[#999] focus:outline-none focus:border-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options List */}
          <div className="overflow-y-auto flex-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-[13px] font-['Source_Sans_3'] text-[#999]">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleToggleOption(option.value)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
                  >
                    <div
                      className={`size-4 flex items-center justify-center border rounded ${
                        isSelected
                          ? "bg-[#314b3e] border-[#314b3e]"
                          : "border-[#d2d2d2]"
                      }`}
                    >
                      {isSelected && <Check className="size-3 text-white" />}
                    </div>
                    <span className="flex-1">{option.label}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Clear All Button */}
          {selectedValues.length > 0 && (
            <div className="p-2 border-t border-[#e5e5e5]">
              <button
                type="button"
                onClick={handleClearAll}
                className="w-full h-8 px-3 text-[13px] font-['Source_Sans_3'] text-[#314b3e] hover:bg-gray-50 rounded transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}