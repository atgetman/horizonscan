import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Citation } from './Citation';

const FULL_DOCUMENT_TEXT = `UNITED STATES DISTRICT COURT
SOUTHERN DISTRICT OF NEW YORK

MARIA HERNANDEZ,
        Plaintiff,

- against -

PACIFIC BUILDERS INC., a Delaware Corporation,
        Defendant.

Civil Action No. 24-cv-01234

DEFENDANT'S NOTICE OF MOTION AND MOTION TO DISMISS COMPLAINT

ORAL ARGUMENT REQUESTED

PLEASE TAKE NOTICE that upon the accompanying Memorandum of Law, the Declaration of John Smith, and all prior pleadings and proceedings herein, Defendant Pacific Builders Inc. ("Defendant") will move this Court, before the Honorable Judge [Name], at the United States Courthouse, 500 Pearl Street, New York, New York, for an order dismissing the Complaint pursuant to Federal Rule of Civil Procedure 12(b)(6) for failure to state a claim upon which relief can be granted.

PRELIMINARY STATEMENT

Plaintiff Maria Hernandez ("Plaintiff") attempts to transform a simple breach of contract dispute into a tort action to recover punitive damages that are not available under New York contract law. Her negligence and fraudulent misrepresentation claims are duplicative of her breach of contract claim and are barred by the economic loss rule. Accordingly, Counts II and III of the Complaint must be dismissed as a matter of law.

ARGUMENT

I. THE ECONOMIC LOSS RULE BARS PLAINTIFF'S NEGLIGENCE CLAIM

Under New York law, a plaintiff cannot recover in tort for purely economic losses resulting from a breach of contract. This well-established principle prevents contract disputes from morphing into tort litigation.

Here, Plaintiff alleges only economic damages—specifically, the cost to repair the foundation—arising from Defendant's alleged failure to perform under the Contract. Because Plaintiff has not alleged any personal injury or damage to property other than the subject of the contract itself, her negligence claim (Count III) is barred. The damages sought are identical to those recoverable under a breach of contract theory.

The purpose of the economic loss rule is to keep contract law and tort law separate. As the Second Circuit has explained, allowing tort recovery for economic loss would "blur the distinct lines between contract and tort."

II. PLAINTIFF'S FRAUD CLAIM MUST BE DISMISSED BECAUSE IT IS DUPLICATIVE OF THE BREACH OF CONTRACT CLAIM

Under New York law, a fraud claim that is merely a restatement of breach of contract claim must be dismissed. To survive a motion to dismiss, a fraud claim must allege a separate duty arising apart from the contractual obligations.

Here, Plaintiff's fraud claim alleges that Defendant misrepresented its intention to use Grade A concrete. However, this duty to use Grade A concrete arises entirely from the Construction Contract. Plaintiff has not alleged any independent duty outside the four corners of the contract. Without such an independent duty, the fraud claim is merely duplicative and must be dismissed.

Furthermore, courts have held that claims for fraudulent inducement may only survive where the plaintiff alleges fraud in the inducement of the contract itself, not fraud in the performance of contractual obligations. Here, Plaintiff does not allege that Defendant fraudulently induced her to enter into the Contract; rather, she alleges that Defendant breached its contractual duties by substituting Grade B concrete. This is a classic breach of contract claim, not fraud.

CONCLUSION

For the foregoing reasons, Defendant respectfully requests that this Court grant its Motion to Dismiss Counts II and III of the Complaint pursuant to Federal Rule of Civil Procedure 12(b)(6).

Dated: New York, New York
       February 23, 2026

Respectfully submitted,

SMITH & ASSOCIATES LLP

By: _________________________
    Jonathan Smith, Esq.
    Attorney for Defendant
    123 Legal Plaza
    New York, NY 10004
    (212) 555-0100
    jsmith@smithlaw.com`;

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