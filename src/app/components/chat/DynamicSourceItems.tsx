import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Scale, FileCheck } from 'lucide-react';
import { SourceContent } from '../../utils/chatReasoningContent';

interface DynamicSourceItemsProps {
  sourcesItems: number;
  sourceContent: SourceContent;
}

export function DynamicSourceItems({ sourcesItems, sourceContent }: DynamicSourceItemsProps) {
  return (
    <div className="text-[14px]">
      {/* Dynamic Source Items */}
      {sourceContent.items.map((source, index) => (
        sourcesItems >= (index + 1) && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 py-1.5 px-2 -mx-2 rounded hover:bg-[#f5f5f5] cursor-pointer transition-colors"
          >
            {source.icon === 'BookOpen' && <BookOpen className="size-4 text-[#8a8a8a] shrink-0" />}
            {source.icon === 'Scale' && <Scale className="size-4 text-[#8a8a8a] shrink-0" />}
            {source.icon === 'FileCheck' && <FileCheck className="size-4 text-[#8a8a8a] shrink-0" />}
            <p className="text-[#212223] leading-relaxed flex-1 min-w-0">
              {source.title}
            </p>
            <span className="text-[#8a8a8a] text-[13px] shrink-0">{source.domain}</span>
          </motion.div>
        )
      ))}
    </div>
  );
}
