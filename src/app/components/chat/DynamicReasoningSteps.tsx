import React from 'react';
import { motion } from 'motion/react';
import { ReasoningContent } from '../../utils/chatReasoningContent';

interface DynamicReasoningStepsProps {
  reasoningSteps: number;
  reasoningContent: ReasoningContent;
}

export function DynamicReasoningSteps({ reasoningSteps, reasoningContent }: DynamicReasoningStepsProps) {
  return (
    <>
      {/* Step 1 - Understanding Request */}
      {reasoningSteps >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[#404040] leading-relaxed">
            {reasoningContent.step1}
          </p>
        </motion.div>
      )}

      {/* Step 2 - Reviewing Files */}
      {reasoningSteps >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[#404040] leading-relaxed mb-2">
            {reasoningContent.step2Title}
          </p>
          <ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
            {reasoningContent.step2Items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#d64000] shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Step 3 - Checking Practical Law */}
      {reasoningSteps >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[#404040] leading-relaxed">
            {reasoningContent.step3}
          </p>
        </motion.div>
      )}

      {/* Step 4 - Searching Westlaw */}
      {reasoningSteps >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[#404040] leading-relaxed mb-2">
            {reasoningContent.step4Title}
          </p>
          <ul className="text-[#404040] leading-relaxed space-y-1 pl-4">
            {reasoningContent.step4Items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#d64000] shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Step 5 - Building Arguments */}
      {reasoningSteps >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[#404040] leading-relaxed">
            {reasoningContent.step5}
          </p>
        </motion.div>
      )}
    </>
  );
}
