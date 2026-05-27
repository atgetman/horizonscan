import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoreHorizontal, Download, ExternalLink, Share2, FolderInput, Trash2 } from 'lucide-react';
import svgPaths from '../../imports/svg-1wkqh0ufu9';

interface ArtifactCardProps {
  title: string;
  content: string;
  artifactId: string;
  artifactType: string;
  onClick?: () => void;
}

function Frame() {
  return (
    <div className="col-1 ml-0 mt-0 relative row-1 size-[24px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p28462800} fill="white" id="Vector" />
          <path d={svgPaths.p1170c200} fill="white" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p1d481700} fill="#605E5C" fillRule="evenodd" id="Vector_3" opacity="0.64" />
          {/* Add document lines - properly centered */}
          <line x1="9" y1="11" x2="19" y2="11" stroke="#605E5C" strokeWidth="0.8" opacity="0.5" />
          <line x1="9" y1="14" x2="19" y2="14" stroke="#605E5C" strokeWidth="0.8" opacity="0.5" />
          <line x1="9" y1="17" x2="17" y2="17" stroke="#605E5C" strokeWidth="0.8" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <Frame />
    </div>
  );
}

function FileIcon3() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-center max-h-[28px] max-w-[28px] p-[10px] relative shrink-0" data-name="File icon">
      <Group />
    </div>
  );
}

function Text({ title, subtitle, isContentGenerating }: { title: string; subtitle: string; isContentGenerating?: boolean }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[0] min-h-px min-w-0 relative" data-name="text">
      <div className={`flex flex-col font-['Clario:Medium',sans-serif] justify-center min-w-0 w-full not-italic overflow-hidden relative shrink-0 text-[15px] text-ellipsis ${isContentGenerating ? 'text-[#8a8a8a] animate-shimmer' : 'text-[#212223]'}`}>
        <p className="leading-[1.35] overflow-hidden font-medium font-bold truncate">{title}</p>
      </div>
      <div className="flex flex-col font-['Source_Sans_3:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#404040] text-[13px] min-w-0 w-full">
        <p className="leading-[1.35] truncate">{subtitle}</p>
      </div>
    </div>
  );
}

export function ArtifactCard({ title, content, artifactId, artifactType, onClick }: ArtifactCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu]);

  const handleClick = () => {
    console.log('Artifact content:', content);
    onClick?.();
  };

  return (
    <div
      className="bg-white relative rounded-[8px] shrink-0 w-full z-[1] hover:bg-[#fafafa] transition-colors shadow-sm" 
      data-name="artifact card"
    >
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap gap-y-[4px] items-center py-[12px] relative w-full">
          <div className="flex-[1_0_0] min-h-px min-w-px relative cursor-pointer" onClick={handleClick}>
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center pl-[8px] relative w-full">
                <FileIcon3 />
                <Text title={title} subtitle={artifactType} />
              </div>
            </div>
          </div>
          
          {/* Ellipsis Menu Button */}
          <div className="relative pr-[12px]" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1.5 hover:bg-[#f0f0f0] rounded transition-colors"
            >
              <MoreHorizontal className="size-4 text-[#8a8a8a]" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#e5e5e5] rounded-lg shadow-lg z-50 py-1"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    // Handle download
                    console.log('Download artifact:', artifactId);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#212223] hover:bg-[#f5f5f5] transition-colors"
                >
                  <Download className="size-4 text-[#8a8a8a]" />
                  <span>Download</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    handleClick();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#212223] hover:bg-[#f5f5f5] transition-colors"
                >
                  <ExternalLink className="size-4 text-[#8a8a8a]" />
                  <span>Open in...</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    // Handle share
                    console.log('Share artifact:', artifactId);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#212223] hover:bg-[#f5f5f5] transition-colors"
                >
                  <Share2 className="size-4 text-[#8a8a8a]" />
                  <span>Share</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    // Handle move
                    console.log('Move artifact:', artifactId);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#212223] hover:bg-[#f5f5f5] transition-colors"
                >
                  <FolderInput className="size-4 text-[#8a8a8a]" />
                  <span>Move</span>
                </button>
                
                <div className="border-t border-[#e5e5e5] my-1" />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    // Handle delete
                    console.log('Delete artifact:', artifactId);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[14px] text-[#212223] hover:bg-[#f5f5f5] transition-colors"
                >
                  <Trash2 className="size-4 text-[#8a8a8a]" />
                  <span>Delete</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}