import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Citation } from './Citation';

const FULL_DOCUMENT_TEXT = `MERIDIAN FINANCIAL GROUP, INC.
Office of the General Counsel

VIA EDGAR AND ELECTRONIC MAIL

U.S. Securities and Exchange Commission
Division of Corporation Finance
100 F Street, N.E.
Washington, D.C. 20549

Re: Meridian Financial Group, Inc.
    Form 10-K for the Fiscal Year Ended December 31, 2025
    Response to Staff Comment Letter dated February 9, 2026

Ladies and Gentlemen:

On behalf of Meridian Financial Group, Inc. ("Meridian" or the "Company"), we respectfully submit the following responses to the comments of the Staff of the Division of Corporation Finance (the "Staff") set forth in your letter dated February 9, 2026, relating to the above-referenced Annual Report on Form 10-K. For the Staff's convenience, each comment is reproduced below in italics, followed by the Company's response.

CLIMATE-RELATED DISCLOSURES

Comment 1. We note your disclosure regarding the governance of climate-related risks. Please expand your disclosure to describe the board committee responsible for oversight of such risks and the frequency with which it receives reports from management.

Response. The Company respectfully advises the Staff that the Board's Risk Committee has primary oversight responsibility for climate-related risks. The Risk Committee receives reports from the Chief Risk Officer on no less than a quarterly basis, and material climate-related matters are escalated to the full Board as appropriate. In response to the Staff's comment, the Company will revise its disclosure in future filings to include the following language: "The Risk Committee of the Board oversees the Company's climate-related risks and receives quarterly reports from management regarding the identification, assessment, and management of such risks."

Comment 2. Please clarify whether the material physical and transition risks you identify have had, or are reasonably likely to have, a material impact on your results of operations, and quantify such impacts where practicable.

Response. The Company advises the Staff that, based on its current assessment, the identified physical and transition risks have not had a material impact on the Company's results of operations during the periods presented. The Company assesses these risks through its enterprise risk-management framework and will disclose any reasonably likely material impacts, together with quantification where practicable, in future periodic reports as required by Item 1502 of Regulation S-K.

GREENHOUSE GAS METRICS

Comment 3. We note that you present Scope 1 and Scope 2 greenhouse gas emissions metrics. Please disclose the organizational boundaries used, the methodology and emission factors applied, and the assurance status of these metrics.

Response. The Company confirms that its Scope 1 and Scope 2 emissions are calculated using the operational control approach consistent with the GHG Protocol Corporate Standard, applying published emission factors from recognized governmental sources. The metrics presented are currently subject to limited assurance by an independent third party. In response to the Staff's comment, the Company will expand its disclosure to describe the organizational boundaries, methodology, emission factors, and assurance level applied to these metrics.

CONCLUSION

The Company believes the foregoing responses, together with the revised disclosures it has agreed to include in future filings, are fully responsive to the Staff's comments. The Company acknowledges that it is responsible for the adequacy and accuracy of the disclosure in its filings. Please direct any questions regarding this response to the undersigned.

Respectfully submitted,

MERIDIAN FINANCIAL GROUP, INC.

By: _________________________
    Jordan Avery
    Executive Vice President & General Counsel
    Meridian Financial Group, Inc.
    200 Harbor Street
    New York, NY 10004
    (212) 555-0142
    javery@meridianfg.com`;

// Split document into chunks (paragraphs/sections)
const DOCUMENT_CHUNKS = FULL_DOCUMENT_TEXT.split('\n\n').filter(chunk => chunk.trim().length > 0);

export function StreamingDocument({ shouldStream = true }: { shouldStream?: boolean }) {
  const [visibleChunks, setVisibleChunks] = useState<number>(shouldStream ? 0 : DOCUMENT_CHUNKS.length);
  const [isStreaming, setIsStreaming] = useState(shouldStream);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldStream) {
      // If not streaming, just show all content immediately
      return;
    }

    let chunkIndex = 0;
    
    const streamNextChunk = () => {
      if (chunkIndex < DOCUMENT_CHUNKS.length) {
        setVisibleChunks(chunkIndex + 1);
        chunkIndex++;
        
        // Vary timing - some chunks come faster, some slower
        const delays = [300, 400, 350, 450, 380, 420, 360, 400, 380, 410, 390, 420];
        const delay = delays[chunkIndex % delays.length] || 400;
        
        setTimeout(streamNextChunk, delay);
      } else {
        setIsStreaming(false);
        setShowScrollButton(false); // Hide button when streaming completes
      }
    };
    
    // Start streaming after a brief delay
    setTimeout(streamNextChunk, 200);
  }, [shouldStream]);

  // Check if content has gone below the fold
  useEffect(() => {
    if (!isStreaming) return;

    const checkScroll = () => {
      if (!contentRef.current || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      
      // Show button if content extends beyond the visible viewport
      const isContentBelowFold = contentRect.bottom > window.innerHeight;
      setShowScrollButton(isContentBelowFold && isStreaming);
    };

    // Check on each chunk update
    checkScroll();
    
    // Also check on window resize
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [visibleChunks, isStreaming]);

  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setShowScrollButton(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
        <div ref={contentRef} className="text-[15px] leading-relaxed space-y-4">
          {DOCUMENT_CHUNKS.slice(0, visibleChunks).map((chunk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="whitespace-pre-wrap"
            >
              {chunk}
            </motion.div>
          ))}
          {isStreaming && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block w-1.5 h-4 bg-[#212223] animate-pulse"
            />
          )}
        </div>
      </div>

      {/* Floating Scroll to Bottom Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToBottom}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white hover:bg-gray-50 rounded-full p-3 border border-gray-200 cursor-pointer z-50 group animate-shimmer-shadow"
          >
            <ArrowDown className="size-5 text-[#666666]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
