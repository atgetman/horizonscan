import { Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

interface OnboardingPopoverProps {
  isOpen: boolean;
  onNext: () => void;
  onSnooze: () => void;
}

const TOUR_STEPS = [
  {
    number: 1,
    title: "CoCounsel can now handle complex, multi-step tasks.",
    body: "Just describe what you need - it'll work through the steps and ask if it needs more.",
    position: "center-bottom", // Below the chat input on home
    targetSelector: null,
  },
  {
    number: 2,
    title: "Pick up where you left off. Nothing gets buried.",
    body: "Find your chats and file outputs here whenever you need them.",
    position: "left-sidebar-middle", // Pointing at Recent Activity section in home sidebar
    targetSelector: null,
  },
  {
    number: 3,
    title: "Ground CoCounsel in your matter files with Workspaces.",
    body: "Add your files once - CoCounsel draws on them across every task in the workspace.",
    position: "left-sidebar-upper", // Pointing at Recent Workspaces section in home sidebar
    targetSelector: null,
  },
  {
    number: 4,
    title: "Mention files by name or drag and drop to attach.",
    body: "No need to re-attach every time - CoCounsel already knows what's in your project. Simply say \"Based on the depositions\" or \"Using the complaint.\"",
    position: "center-bottom", // Below chat input in project view
    targetSelector: null,
  },
  {
    number: 5,
    title: "Organize your files here.",
    body: "Note: Chat attachments bubble up to its parent by default.",
    position: "left-sidebar-inputs", // Pointing at Inputs section in workspace sidebar
    targetSelector: null,
  },
  {
    number: 6,
    title: "Chats, files and outputs open in tabs.",
    body: "Tabs persist scroll position and keep your work within reach. Double-click to pin.",
    position: "top-tabbar", // Pointing down at tab bar
    targetSelector: null,
  },
  {
    number: 7,
    title: "Highlight text to ask CoCounsel to edit it.",
    body: "Highlight any text, then tell it what to fix - language, arguments, case law.",
    position: "center-editor", // Pointing at document editor
    targetSelector: null,
  },
  {
    number: 8,
    title: "You're all set! Give it a try.",
    body: "Start with a suggestion below, or describe any legal task in your own words.",
    position: "center-suggestions", // Pointing at suggestion chips below prompt input
    targetSelector: null,
  },
];

export function OnboardingPopover({ isOpen, onNext, onSnooze }: OnboardingPopoverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number } | null>(null);
  const [hasFoundTarget, setHasFoundTarget] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const step = TOUR_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  // Recalculate position when step changes or window resizes
  useEffect(() => {
    if (!isOpen) return;

    const calculatePosition = () => {
      const targetElement = document.querySelector(`[data-tour-step="${step.number}"]`);
      
      console.log(`Tour step ${step.number}: Looking for element with data-tour-step="${step.number}"`, targetElement);
      
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        
        console.log(`Tour step ${step.number}: Found element at`, rect);
        
        // Position based on the target element
        let top = 0;
        let left = 0;
        
        // Different positioning strategies based on step number
        if (step.number === 1) {
          // Home chat input - below and centered (move up 64px)
          top = rect.bottom + 20 - 64;
          left = rect.left + rect.width / 2;
        } else if (step.number === 2) {
          // Recent Activity - to the right (move left 40px)
          top = rect.top;
          left = rect.right + 20 - 40;
        } else if (step.number === 3) {
          // Recent Workspaces - to the right (move left 40px)
          top = rect.top;
          left = rect.right + 20 - 40;
        } else if (step.number === 4) {
          // Project chat input - below and centered (move up 64px)
          top = rect.bottom + 20 - 64;
          left = rect.left + rect.width / 2;
        } else if (step.number === 5) {
          // Inputs section - to the right (move left 40px)
          top = rect.top;
          left = rect.right + 20 - 40;
        } else if (step.number === 6) {
          // Tab bar - below and centered (move 340px left - increased from 290px)
          top = rect.bottom + 20;
          left = rect.left + rect.width / 2 - 340;
        } else if (step.number === 7) {
          // Document editor - bottom center of viewport, pointing up at document (move 80px right, 200px up)
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          top = viewportHeight - 450; // 450px from bottom of viewport (moved up 200px)
          left = viewportWidth / 2 + 80; // Center of viewport + 80px right
        } else if (step.number === 8) {
          // Suggestion chips - above the chip element itself
          top = rect.top - 220; // Position above with proper spacing
          left = rect.left + rect.width / 2; // Center on the chip
        }
        
        setPopoverPosition({ top, left });
        setHasFoundTarget(true);
      } else {
        console.warn(`Tour step ${step.number}: Element not found, will keep retrying...`);
        // Don't set position or hasFoundTarget - keep waiting
        setHasFoundTarget(false);
      }
    };

    // Initial calculation with retries for steps 4-8
    if (step.number >= 4) {
      // Retry positioning multiple times for workspace pages
      let retries = 0;
      const maxRetries = 15; // Increased retry count
      const retryInterval = setInterval(() => {
        const targetElement = document.querySelector(`[data-tour-step="${step.number}"]`);
        if (targetElement) {
          calculatePosition();
          clearInterval(retryInterval);
        }
        retries++;
        if (retries >= maxRetries) {
          console.warn(`Tour step ${step.number}: Max retries reached, element not found`);
          clearInterval(retryInterval);
        }
      }, 300);
      
      return () => clearInterval(retryInterval);
    } else {
      // For steps 1-3, also add a retry mechanism in case DOM isn't ready
      let retries = 0;
      const maxRetries = 10;
      const retryInterval = setInterval(() => {
        const targetElement = document.querySelector(`[data-tour-step="${step.number}"]`);
        if (targetElement) {
          calculatePosition();
          clearInterval(retryInterval);
        }
        retries++;
        if (retries >= maxRetries) {
          console.warn(`Tour step ${step.number}: Max retries reached, element not found`);
          clearInterval(retryInterval);
        }
      }, 100);
      
      return () => clearInterval(retryInterval);
    }
    
    window.addEventListener('resize', calculatePosition);
    
    return () => window.removeEventListener('resize', calculatePosition);
  }, [isOpen, step.number]);

  useEffect(() => {
    if (isOpen) {
      // Reset hasFoundTarget when step changes
      setHasFoundTarget(false);
      setIsVisible(false);
    } else {
      setIsVisible(false);
      setHasFoundTarget(false);
      setCurrentStep(0); // Reset to first step when closed
    }
  }, [isOpen, currentStep]);

  // Show popover only after target is found
  useEffect(() => {
    if (isOpen && hasFoundTarget && popoverPosition) {
      // Small delay for smooth animation
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasFoundTarget, popoverPosition]);

  const handleNext = () => {
    if (isLastStep) {
      onNext(); // Complete the tour
    } else {
      // Hide the current popover immediately
      setIsVisible(false);
      
      // Check if we're going from step 1 to step 2
      if (currentStep === 0) {
        // Add delay before polling since element already exists
        setTimeout(() => {
          let pollAttempts = 0;
          const maxPollAttempts = 30;
          const pollInterval = setInterval(() => {
            const step2Element = document.querySelector('[data-tour-step="2"]');
            pollAttempts++;
            
            if (step2Element) {
              console.log(`Step 2 element found after ${pollAttempts} attempts`);
              clearInterval(pollInterval);
              setCurrentStep(currentStep + 1);
            } else if (pollAttempts >= maxPollAttempts) {
              console.warn(`Step 2 element not found after ${maxPollAttempts} attempts`);
              clearInterval(pollInterval);
              setCurrentStep(currentStep + 1);
            }
          }, 100);
        }, 250); // Wait for hide animation
        return;
      }

      // Check if we're going from step 2 to step 3
      if (currentStep === 1) {
        // Add delay before polling since element already exists
        setTimeout(() => {
          let pollAttempts = 0;
          const maxPollAttempts = 30;
          const pollInterval = setInterval(() => {
            const step3Element = document.querySelector('[data-tour-step="3"]');
            pollAttempts++;
            
            if (step3Element) {
              console.log(`Step 3 element found after ${pollAttempts} attempts`);
              clearInterval(pollInterval);
              setCurrentStep(currentStep + 1);
            } else if (pollAttempts >= maxPollAttempts) {
              console.warn(`Step 3 element not found after ${maxPollAttempts} attempts`);
              clearInterval(pollInterval);
              setCurrentStep(currentStep + 1);
            }
          }, 100);
        }, 250); // Wait for hide animation
        return;
      }
      
      // Check if we're going from step 3 to step 4
      if (currentStep === 2) {
        // We're at step 3, about to go to step 4
        // Check if user is on home page
        if (location.pathname === '/') {
          // Use the same hard-coded recent workspaces from SidebarExpanded
          const recentWorkspaces = [
            "Hernandez v. Pacific Builders Inc",
            "In re: Blue Ridge Trust 2025",
            "State v. Marcus T. Reynolds",
            "Rivera Compliance Review",
            "Doe v. Apex Corp.",
            "Matter of Green Estates",
          ];
          
          if (recentWorkspaces.length > 0) {
            // Navigate to the first project
            const firstWorkspace = recentWorkspaces[0];
            console.log('Navigating to workspace:', firstWorkspace);
            navigate(`/workspace/${encodeURIComponent(firstWorkspace)}`);
            
            // Poll for step 4 element before advancing
            let pollAttempts = 0;
            const maxPollAttempts = 30;
            const pollInterval = setInterval(() => {
              const step4Element = document.querySelector('[data-tour-step="4"]');
              pollAttempts++;
              
              if (step4Element) {
                console.log(`Step 4 element found after ${pollAttempts} attempts`);
                clearInterval(pollInterval);
                setCurrentStep(currentStep + 1);
              } else if (pollAttempts >= maxPollAttempts) {
                console.warn(`Step 4 element not found after ${maxPollAttempts} attempts`);
                clearInterval(pollInterval);
                setCurrentStep(currentStep + 1);
              }
            }, 200);
            return;
          }
        }
      }

      // Check if we're going from step 4 to step 5
      if (currentStep === 3) {
        // Add delay before polling since element already exists
        setTimeout(() => {
          let pollAttempts = 0;
          const maxPollAttempts = 30;
          const pollInterval = setInterval(() => {
            const step5Element = document.querySelector('[data-tour-step="5"]');
            pollAttempts++;
            
            if (step5Element) {
              console.log(`Step 5 element found after ${pollAttempts} attempts`);
              clearInterval(pollInterval);
              setCurrentStep(currentStep + 1);
            } else if (pollAttempts >= maxPollAttempts) {
              console.warn(`Step 5 element not found after ${maxPollAttempts} attempts`);
              clearInterval(pollInterval);
              setCurrentStep(currentStep + 1);
            }
          }, 100);
        }, 250); // Wait for hide animation
        return;
      }

      // Check if we're going from step 5 to step 6
      if (currentStep === 4) {
        // Add delay before polling since element already exists
        setTimeout(() => {
          let pollAttempts = 0;
          const maxPollAttempts = 30;
          const pollInterval = setInterval(() => {
            const step6Element = document.querySelector('[data-tour-step="6"]');
            pollAttempts++;
            
            if (step6Element) {
              console.log(`Step 6 element found after ${pollAttempts} attempts`);
              clearInterval(pollInterval);
              setCurrentStep(currentStep + 1);
            } else if (pollAttempts >= maxPollAttempts) {
              console.warn(`Step 6 element not found after ${maxPollAttempts} attempts`);
              clearInterval(pollInterval);
              setCurrentStep(currentStep + 1);
            }
          }, 100);
        }, 250); // Wait for hide animation
        return;
      }

      // Check if we're going from step 6 to step 7 (open first document)
      if (currentStep === 5) {
        // We're at step 6, about to go to step 7
        // Find and click "Motion to Dismiss Draft" in the Outputs section
        const outputItems = Array.from(document.querySelectorAll('.flex.items-center.gap-2.px-4.py-1\\.5.hover\\:bg-gray-100'));
        const motionDocument = outputItems.find(item => {
          const text = item.textContent || '';
          return text.includes('Motion to Dismiss Draft');
        }) as HTMLElement;
        
        if (motionDocument) {
          console.log('Found Motion to Dismiss Draft, clicking...');
          motionDocument.click();
          
          // Poll for step 7 element before advancing
          let pollAttempts = 0;
          const maxPollAttempts = 30;
          const pollInterval = setInterval(() => {
            const step7Element = document.querySelector('[data-tour-step="7"]');
            pollAttempts++;
            
            if (step7Element) {
              console.log(`Step 7 element found after ${pollAttempts} attempts`);
              clearInterval(pollInterval);
              setCurrentStep(currentStep + 1);
            } else if (pollAttempts >= maxPollAttempts) {
              console.warn(`Step 7 element not found after ${maxPollAttempts} attempts`);
              clearInterval(pollInterval);
              setCurrentStep(currentStep + 1);
            }
          }, 200);
          return;
        } else {
          console.warn('Could not find Motion to Dismiss Draft');
        }
      }

      // Check if we're going from step 7 to step 8 (go back to chat tab)
      if (currentStep === 6) {
        // We're at step 7, about to go to step 8
        // First try to find and click the "New chat" tab
        const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
        const newChatTab = tabs.find(tab => {
          const text = tab.textContent || '';
          return text.includes('New chat');
        }) as HTMLElement;
        
        if (newChatTab) {
          console.log('Found existing New chat tab, clicking...');
          newChatTab.click();
        } else {
          console.log('New chat tab not found (likely collapsed), looking for Plus button to create one...');
          // If "New chat" tab doesn't exist, find and click the Plus button to create one
          const allButtons = Array.from(document.querySelectorAll('button'));
          const plusButton = allButtons.find(btn => {
            return btn.title === 'New chat' && btn.querySelector('svg');
          }) as HTMLElement;
          
          if (plusButton) {
            console.log('Found Plus button, clicking to create new chat...');
            plusButton.click();
          } else {
            console.warn('Could not find Plus button either');
          }
        }
        
        // Poll for the suggestion element before advancing to step 8
        let pollAttempts = 0;
        const maxPollAttempts = 30;
        const pollInterval = setInterval(() => {
          const suggestionElement = document.querySelector('[data-tour-step="8"]');
          pollAttempts++;
          
          if (suggestionElement) {
            console.log(`Suggestion element found after ${pollAttempts} attempts`);
            clearInterval(pollInterval);
            setCurrentStep(currentStep + 1);
          } else if (pollAttempts >= maxPollAttempts) {
            console.warn(`Suggestion element not found after ${maxPollAttempts} attempts`);
            clearInterval(pollInterval);
            setCurrentStep(currentStep + 1);
          }
        }, 200);
        
        return;
      }
      
      // Fallback: should not reach here
      console.warn('Unexpected step transition');
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  // Arrow direction based on position
  const getArrowClasses = () => {
    switch (step.position) {
      case "center-bottom":
        return "absolute -z-10 -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border-l border-t border-[#2d5a3f] rotate-45";
      case "left-sidebar":
      case "left-sidebar-top":
      case "left-sidebar-middle":
      case "left-sidebar-upper":
      case "left-sidebar-inputs":
        return "absolute -z-10 top-6 -left-2 w-4 h-4 border-l border-b border-[#2d5a3f] -rotate-45";
      case "center-top":
      case "top-center":
      case "top-tabbar":
        return "absolute -z-10 -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border-l border-t border-[#2d5a3f] rotate-45";
      case "center-right":
      case "center-editor":
        return "absolute -z-10 -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border-l border-t border-[#2d5a3f] rotate-45"; // Pointing up for step 7
      case "center-suggestions":
        return "absolute -z-10 -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 border-r border-b border-[#2d5a3f] rotate-45"; // Pointing down for step 8
      default:
        return "absolute -z-10 -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border-l border-t border-[#2d5a3f] rotate-45";
    }
  };

  const getArrowBackground = () => {
    switch (step.position) {
      case "center-bottom":
        return 'linear-gradient(135deg, #1f4130, #1a3527)';
      case "left-sidebar":
      case "left-sidebar-top":
      case "left-sidebar-middle":
      case "left-sidebar-upper":
      case "left-sidebar-inputs":
        return 'linear-gradient(225deg, #1f4130, #1a3527)';
      case "center-top":
      case "top-center":
      case "top-tabbar":
        return 'linear-gradient(135deg, #1f4130, #1a3527)';
      case "center-editor":
        return 'linear-gradient(135deg, #1f4130, #1a3527)'; // Same as pointing up
      case "center-suggestions":
        return 'linear-gradient(315deg, #1f4130, #1a3527)'; // Pointing down for step 8
      default:
        return 'linear-gradient(135deg, #1f4130, #1a3527)';
    }
  };

  const arrowClasses = getArrowClasses();
  const arrowBackground = getArrowBackground();

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Subtle backdrop - visual only, doesn't block clicks */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      
      {/* Popover positioned dynamically based on step */}
      <div 
        className="absolute w-full max-w-[380px] px-4 pointer-events-none"
        style={{
          top: popoverPosition ? `${popoverPosition.top}px` : '50%',
          left: popoverPosition ? `${popoverPosition.left}px` : '50%',
          transform: popoverPosition 
            ? (step.number === 1 || step.number === 4 || step.number === 6 || step.number === 7 || step.number === 8 ? 'translateX(-50%)' : 'none')
            : 'translate(-50%, -50%)'
        }}
      >
        <div className={`relative rounded-xl shadow-2xl border border-[#2d5a3f] p-5 pointer-events-auto transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        style={{
          background: 'linear-gradient(to bottom, #1d3d2a, #152a1f)',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Arrow pointing to target */}
          {arrowClasses && (
            <div className={arrowClasses}
            style={{
              background: arrowBackground,
              zIndex: -1
            }}></div>
          )}

          {/* Close button */}
          <button
            onClick={onSnooze}
            className="absolute top-2.5 right-2.5 p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white/60 hover:text-white/90" />
          </button>

          {/* Step counter only */}
          <div className="flex items-center mb-2">
            <div className="text-[#5fb574] text-[12px] font-semibold">
              {step.number} of {TOUR_STEPS.length}
            </div>
          </div>

          {/* Header */}
          <div className="mb-4 mt-1">
            <h3 className="text-white font-semibold text-[16px] mb-2">
              {step.title}
            </h3>
            <p className="text-white/80 text-[14px] leading-relaxed mb-1">
              {step.body}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 justify-between items-center">
            {/* Progress dots on the left */}
            <div className="flex items-center gap-1.5">
              {TOUR_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-6 bg-[#5fb574]'
                      : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {!isFirstStep && (
                <button
                  onClick={onSnooze}
                  className="px-3 py-1.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Finish later
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-4 py-1.5 text-[13px] font-semibold bg-white text-[#1d3d2a] hover:bg-white/90 rounded-lg transition-colors shadow-sm"
              >
                {isLastStep ? 'Done' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}