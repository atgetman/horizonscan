import { MoreHorizontal, Share, Edit, Star, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface CardDropdownMenuProps {
  prompt: {
    id: string;
    title: string;
    isFavorite: boolean;
  };
  onToggleFavorite: (id: string) => void;
}

export function CardDropdownMenu({ prompt, onToggleFavorite }: CardDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 transition-all text-gray-600 hover:text-[#314b3e]"
        title="More options"
      >
        <MoreHorizontal className="size-3.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Share prompt:', prompt.title);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
          >
            <Share className="size-3.5 text-gray-500" />
            Share
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Rename prompt:', prompt.title);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
          >
            <Edit className="size-3.5 text-gray-500" />
            Rename
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(prompt.id);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
          >
            <Star className={`size-3.5 ${prompt.isFavorite ? 'fill-[#5a7867] text-[#5a7867]' : 'text-gray-500'}`} />
            {prompt.isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Delete prompt:', prompt.title);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-['Source_Sans_3'] text-[#212223] hover:bg-gray-50 transition-colors text-left"
          >
            <Trash2 className="size-3.5 text-gray-500" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
