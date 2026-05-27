import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollableDropdownProps {
  children: ReactNode;
  maxHeight?: string;
}

export function ScrollableDropdown({ children, maxHeight = '350px' }: ScrollableDropdownProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const isOverflowing = scrollHeight > clientHeight;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;
      
      // Show fade only if content overflows AND user is not at bottom
      setShowFade(isOverflowing && !isAtBottom);
    };

    // Check initially and on scroll
    checkScroll();
    scrollElement.addEventListener('scroll', checkScroll);

    // Also check when content changes (via MutationObserver)
    const observer = new MutationObserver(checkScroll);
    observer.observe(scrollElement, { childList: true, subtree: true });

    return () => {
      scrollElement.removeEventListener('scroll', checkScroll);
      observer.disconnect();
    };
  }, [children]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-[#e5e5e5] rounded-lg shadow-sm relative overflow-hidden"
      style={{ maxHeight }}
    >
      <div 
        ref={scrollRef}
        className="overflow-y-auto py-2 px-4"
        style={{ maxHeight }}
      >
        <div className="text-[14px]">
          {children}
        </div>
      </div>
      
      {/* Bottom fade indicator - only visible when content overflows and not at bottom */}
      {showFade && (
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
      )}
    </motion.div>
  );
}
