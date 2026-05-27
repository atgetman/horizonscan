import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoadingInterstitialProps {
  onComplete: () => void;
}

export function LoadingInterstitial({ onComplete }: LoadingInterstitialProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleComplete = () => {
    setIsExiting(true);
    // Delay the actual completion to allow fade-out animation
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] bg-[#FCFCFC] flex items-center justify-center cursor-pointer"
          onClick={handleComplete}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Circular loader */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer static circle - light */}
              <div className="absolute inset-0 rounded-full border-4 border-[#e8f3ef]"></div>
              
              {/* Animated rotating arc */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#5cb890"
                    strokeWidth="4"
                    strokeDasharray="72 216"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
              
              {/* Center green circle */}
              <div className="absolute inset-[20%] bg-[#1d4b34] rounded-full flex items-center justify-center shadow-lg">
                {/* Animated sliders in center */}
                <div className="flex flex-col gap-2 w-8">
                  {/* Slider 1 */}
                  <div className="relative h-[2px] bg-white/30 rounded-full">
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"
                      animate={{
                        left: ["20%", "70%", "20%"]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0
                      }}
                    />
                  </div>
                  {/* Slider 2 */}
                  <div className="relative h-[2px] bg-white/30 rounded-full">
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"
                      animate={{
                        left: ["60%", "15%", "60%"]
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3
                      }}
                    />
                  </div>
                  {/* Slider 3 */}
                  <div className="relative h-[2px] bg-white/30 rounded-full">
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"
                      animate={{
                        left: ["35%", "80%", "35%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.6
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text content */}
            <div className="text-center max-w-md px-6">
              <div className="text-[#D64000] text-xs font-semibold tracking-wide mb-3">
                Upgrading your experience
              </div>
              <h2 className="text-2xl font-bold text-[#212223] mb-3">
              </h2>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}