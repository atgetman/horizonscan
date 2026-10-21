import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { SupportingDocChip, SupportingDocFileIcon } from '../ui/SupportingDocChip';
import type { AffectedDocument, RedlineSegment } from './affectedDocumentRedlines';

interface AffectedDocumentPreviewProps {
  documents: AffectedDocument[];
  activeIndex: number | null;
  onSelect: (index: number) => void;
  onClose: () => void;
}

function RedlineText({ segment, showRedlines }: { segment: RedlineSegment; showRedlines: boolean }) {
  if (segment.change === 'deleted') {
    if (!showRedlines) return null;
    return (
      <del className="rounded-[2px] bg-[#FFEDED] px-0.5 text-[#DC0A0A] decoration-[#DC0A0A]">
        {segment.text}
      </del>
    );
  }
  if (segment.change === 'inserted') {
    if (!showRedlines) return <span>{segment.text}</span>;
    return (
      <ins className="rounded-[2px] bg-[#EDF2F0] px-0.5 text-[#1d4b34] underline decoration-[#1d4b34] underline-offset-2">
        {segment.text}
      </ins>
    );
  }
  return <span>{segment.text}</span>;
}

export function AffectedDocumentPreview({ documents, activeIndex, onSelect, onClose }: AffectedDocumentPreviewProps) {
  const [showRedlines, setShowRedlines] = useState(true);
  const [activeClause, setActiveClause] = useState(0);
  const clauseRefs = useRef<(HTMLElement | null)[]>([]);
  const isOpen = activeIndex !== null;
  const doc = activeIndex !== null ? documents[activeIndex] : null;

  useEffect(() => {
    setActiveClause(0);
    clauseRefs.current = [];
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const scrollToClause = (index: number) => {
    setActiveClause(index);
    clauseRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const changeCount = doc ? doc.clauses.length : 0;
  const title = doc?.name.replace(/\.docx$/, '') ?? '';

  return (
    <AnimatePresence>
      {isOpen && doc && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${doc.name} redline preview`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-[76vw] flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#E5E5E5] bg-white px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <SupportingDocFileIcon fileType={doc.fileType} />
                <span className="truncate text-[15px] font-['Clario'] font-medium text-[#212223]">{doc.name}</span>
                <span className="shrink-0 rounded-full bg-[#FFF8E5] px-2 py-0.5 text-[12px] font-['Source_Sans_3'] font-semibold text-[#AB3300]">
                  {`${changeCount} suggested ${changeCount === 1 ? 'change' : 'changes'}`}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button type="button" aria-label="Expand" className="rounded p-1.5 hover:bg-[#F5F5F5]">
                  <Maximize2 className="size-4 text-[#404040]" />
                </button>
                <button type="button" aria-label="Close preview" onClick={onClose} className="rounded p-1.5 hover:bg-[#F5F5F5]">
                  <X className="size-4 text-[#404040]" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Left panel: document switcher + change list */}
              <aside className="flex w-[400px] shrink-0 flex-col border-r border-[#E5E5E5] bg-white">
                <div className="border-b border-[#E5E5E5] bg-[#F7F7F7] p-4">
                  <h3 className="mb-3 text-[14px] font-['Clario'] font-medium text-[#212223]">
                    {`Documents affected (${documents.length})`}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {documents.map((item, idx) => (
                      <li key={item.name} className="max-w-full">
                        <SupportingDocChip
                          name={item.name}
                          fileType={item.fileType}
                          selected={idx === activeIndex}
                          onClick={() => onSelect(idx)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <h3 className="mb-3 text-[14px] font-['Clario'] font-medium text-[#212223]">
                    {`Suggested changes (${doc.clauses.length})`}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {doc.clauses.map((clause, idx) => (
                      <li key={clause.heading}>
                        <button
                          type="button"
                          onClick={() => scrollToClause(idx)}
                          className={`w-full rounded-lg border p-3 text-left transition-colors ${
                            activeClause === idx
                              ? 'border-[#1d4b34] bg-[#EDF2F0]'
                              : 'border-[#E5E5E5] bg-white hover:border-[#D2D2D2]'
                          }`}
                        >
                          <span className="block text-[14px] font-['Source_Sans_3'] font-semibold leading-[1.4] text-[#212223]">
                            {clause.heading}
                          </span>
                          <span className="mt-1 block text-[12px] font-['Source_Sans_3'] font-semibold text-[#1d4b34]">
                            {clause.driver}
                          </span>
                          <span className="mt-1 block text-[14px] font-['Source_Sans_3'] leading-[1.5] text-[#404040] text-pretty">
                            {clause.rationale}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Right panel: document preview */}
              <div className="flex min-w-0 flex-1 flex-col bg-[#F0F0F0]">
                <div className="flex items-center justify-between gap-4 border-b border-[#E5E5E5] bg-white px-4 py-2">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={showRedlines}
                    onClick={() => setShowRedlines((value) => !value)}
                    className="flex items-center gap-2 rounded-full border border-[#D2D2D2] py-1 pl-1 pr-3 text-[14px] font-['Source_Sans_3'] text-[#212223] hover:bg-[#F7F7F7]"
                  >
                    <span className={`relative h-4 w-7 rounded-full transition-colors ${showRedlines ? 'bg-[#1d4b34]' : 'bg-[#D2D2D2]'}`}>
                      <span
                        className={`absolute top-0.5 size-3 rounded-full bg-white transition-transform ${showRedlines ? 'translate-x-3.5' : 'translate-x-0.5'}`}
                      />
                    </span>
                    Show redlines
                  </button>

                  <div className="flex items-center gap-2 text-[14px] font-['Source_Sans_3'] text-[#404040]">
                    <button type="button" aria-label="Previous page" className="rounded p-1.5 hover:bg-[#F5F5F5]">
                      <ChevronLeft className="size-4" />
                    </button>
                    <span>1 of 1</span>
                    <button type="button" aria-label="Next page" className="rounded p-1.5 hover:bg-[#F5F5F5]">
                      <ChevronRight className="size-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button type="button" aria-label="Zoom out" className="rounded p-1.5 hover:bg-[#F5F5F5]">
                      <ZoomOut className="size-4 text-[#404040]" />
                    </button>
                    <button type="button" aria-label="Zoom in" className="rounded p-1.5 hover:bg-[#F5F5F5]">
                      <ZoomIn className="size-4 text-[#404040]" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-8">
                  <article className="mx-auto min-h-[1000px] max-w-[820px] bg-white p-12 shadow-lg">
                    <header className="mb-8 text-center">
                      <h1 className="mb-2 text-[20px] font-['Clario'] font-medium text-[#212223] text-balance">{title}</h1>
                      <p className="text-[14px] font-['Source_Sans_3'] text-[#666]">{`${doc.workspace} workspace`}</p>
                    </header>

                    <div className="flex flex-col gap-8 text-[15px] font-['Source_Sans_3'] leading-[1.6] text-[#212223]">
                      {doc.clauses.map((clause, idx) => (
                        <section
                          key={clause.heading}
                          ref={(el) => {
                            clauseRefs.current[idx] = el;
                          }}
                          className={`scroll-mt-4 rounded-md p-3 transition-colors ${activeClause === idx ? 'bg-[#FAFAFA] ring-1 ring-[#E5E5E5]' : ''}`}
                        >
                          <h2 className="mb-2 text-[15px] font-['Clario'] font-medium text-[#212223]">{clause.heading}</h2>
                          <p>
                            {clause.segments.map((segment, sIdx) => (
                              <RedlineText key={sIdx} segment={segment} showRedlines={showRedlines} />
                            ))}
                          </p>
                        </section>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
