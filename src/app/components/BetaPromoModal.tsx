import { X, Plug, Workflow, Layout, FileText } from 'lucide-react';
import { LeftIllustrations } from './LeftIllustrations';

interface BetaPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryNow: () => void;
}

export function BetaPromoModal({ isOpen, onClose, onTryNow }: BetaPromoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Illustration */}
          <div className="md:w-[40%] bg-gradient-to-br from-[#fcfcfc] to-[#f8f8f8] rounded-l-2xl">
            <LeftIllustrations />
          </div>

          {/* Right side - Content */}
          <div className="md:w-[60%] p-6 md:p-8 relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Header */}
            <div className="mb-5">
              <div className="text-[#D64000] text-xs font-semibold tracking-wide mb-2">
                NOW AVAILABLE
              </div>
              <h2 className="text-2xl font-bold text-[#212223] mb-2">
                Try the New CoCounsel
              </h2>
              <p className="text-[#666] text-sm leading-relaxed">
                The most powerful legal AI assistant just got even better.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 mb-5"></div>

            {/* Features list */}
            <div className="space-y-4 mb-[22px]">
              {/* Feature 1 */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-[#D64000]/10 rounded-lg flex items-center justify-center">
                  <Plug className="w-4 h-4 text-[#D64000]" />
                </div>
                <div>
                  <h3 className="text-[#212223] font-semibold text-sm mb-0.5">
                    Seamless Legal Research Integration
                  </h3>
                  <p className="text-[#666] text-xs leading-relaxed">
                    Access Practical Law and Westlaw directly within CoCounsel for unified, powerful legal research
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-[#D64000]/10 rounded-lg flex items-center justify-center">
                  <Workflow className="w-4 h-4 text-[#D64000]" />
                </div>
                <div>
                  <h3 className="text-[#212223] font-semibold text-sm mb-0.5">
                    Intelligent Workflow Automation
                  </h3>
                  <p className="text-[#666] text-xs leading-relaxed">
                    Simply describe what you need - our AI instantly creates and executes complex multi-step workflows
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-[#D64000]/10 rounded-lg flex items-center justify-center">
                  <Layout className="w-4 h-4 text-[#D64000]" />
                </div>
                <div>
                  <h3 className="text-[#212223] font-semibold text-sm mb-0.5">
                    Context-Aware Workspace
                  </h3>
                  <p className="text-[#666] text-xs leading-relaxed">
                    Organize chats, files, and projects in one intelligent workspace that remembers everything you're working on
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 bg-[#D64000]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#D64000]" />
                </div>
                <div>
                  <h3 className="text-[#212223] font-semibold text-sm mb-0.5">
                    Advanced Document Generation
                  </h3>
                  <p className="text-[#666] text-xs leading-relaxed">
                    Create sophisticated legal documents and spreadsheets through natural conversation - no templates required
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={onTryNow}
                className="bg-[#1d4b34] hover:bg-[#163d2a] text-white font-semibold px-5 py-2 text-sm rounded-lg transition-colors shadow-sm"
              >
                Try now
              </button>
              <button
                onClick={onClose}
                className="bg-white hover:bg-gray-50 text-[#212223] font-semibold px-5 py-2 text-sm rounded-lg transition-colors border border-gray-300"
              >
                Ask me later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}