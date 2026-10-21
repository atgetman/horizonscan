import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Folder } from 'lucide-react';

export type SupportingDocFileType = 'docx' | 'pdf' | 'txt' | 'folder';

function WordGlyph() {
  return (
    <span
      aria-hidden="true"
      className="flex items-center justify-center size-[18px] rounded-[3px] border border-[#8a8a8a] bg-white text-[11px] font-['Source_Sans_3'] font-bold leading-none text-[#185ABD] shrink-0"
    >
      W
    </span>
  );
}

function PdfGlyph() {
  return (
    <span
      aria-hidden="true"
      className="flex items-center justify-center size-[18px] rounded-[3px] border border-[#8a8a8a] bg-white text-[8px] font-['Source_Sans_3'] font-bold leading-none text-[#DC0A0A] shrink-0"
    >
      PDF
    </span>
  );
}

function TextGlyph() {
  return (
    <span
      aria-hidden="true"
      className="flex flex-col items-center justify-center gap-[2px] size-[18px] rounded-[3px] border border-[#8a8a8a] bg-white shrink-0"
    >
      <span className="h-px w-2.5 bg-[#666]" />
      <span className="h-px w-2.5 bg-[#666]" />
      <span className="h-px w-1.5 self-start ml-[3px] bg-[#666]" />
    </span>
  );
}

export function SupportingDocFileIcon({ fileType }: { fileType: SupportingDocFileType }) {
  if (fileType === 'pdf') return <PdfGlyph />;
  if (fileType === 'txt') return <TextGlyph />;
  if (fileType === 'folder') {
    return <Folder aria-hidden="true" className="size-[18px] text-[#B35C3C] shrink-0" strokeWidth={1.5} />;
  }
  return <WordGlyph />;
}

interface SupportingDocChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  name: string;
  fileType?: SupportingDocFileType;
  selected?: boolean;
}

/**
 * Supporting document chip (Composite · SupportingDocChip).
 * Unselected: white fill. Selected: --gray-100 fill. Both use a --gray-500
 * border, --radius-sm, and Source Sans 3 15px / 1.5 in --graphite.
 */
export function SupportingDocChip({
  name,
  fileType = 'docx',
  selected = false,
  className = '',
  ...buttonProps
}: SupportingDocChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      title={name}
      className={`inline-flex max-w-full items-center gap-2 rounded-[8px] border border-[#D2D2D2] px-3 py-1 text-left text-[15px] font-['Source_Sans_3'] font-normal leading-[1.5] text-[#212223] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4b34] focus-visible:ring-offset-1 ${
        selected ? 'bg-[#F7F7F7]' : 'bg-white hover:bg-[#F7F7F7]'
      } ${className}`}
      {...buttonProps}
    >
      <SupportingDocFileIcon fileType={fileType} />
      <span className="truncate">{name}</span>
    </button>
  );
}

/** "+ N items more" overflow chip that shares the SupportingDocChip shape. */
export function MoreDocsChip({ count, ...buttonProps }: { count: number } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-[8px] border border-[#D2D2D2] bg-white px-3 py-1 text-[15px] font-['Source_Sans_3'] font-normal leading-[1.5] text-[#212223] transition-colors hover:bg-[#F7F7F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4b34] focus-visible:ring-offset-1"
      {...buttonProps}
    >
      {`+ ${count} ${count === 1 ? 'item' : 'items'} more`}
    </button>
  );
}

/** Wrapping horizontal chip row (FileChipsArea). */
export function FileChipsArea({ children, label }: { children: ReactNode; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2 text-[15px] font-['Source_Sans_3'] leading-[1.5] text-[#212223]">
      {children}
    </ul>
  );
}
