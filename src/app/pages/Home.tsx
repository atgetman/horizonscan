import { Sparkles, FileText, Table, MessageCircleQuestion, Pencil, Search, BarChart3, Sheet, RefreshCw, BookOpen } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { PromptInput } from "../components/PromptInput";
import { createPortal } from "react-dom";
import { Library } from "./Library";

// Track if home has loaded in this session (resets on page refresh)
let hasHomeLoaded = false;

// Prompt suggestions for each task type
const PROMPT_SUGGESTIONS = {
  draft: [
    { label: "Draft climate risk disclosures for the 10-K", fullPrompt: "Review Meridian's emissions data and the SEC Climate Disclosure Rules. Draft the climate-related disclosure section for our upcoming 10-K, including: (1) governance of climate-related risks at the board and management level, (2) material physical and transition risks to the business, (3) Scope 1 and Scope 2 greenhouse gas metrics with assurance status, (4) financial statement effects, and (5) any climate-related targets and transition plans." },
    { label: "Draft a vendor data processing agreement", fullPrompt: "Draft a GDPR- and CCPA-compliant data processing agreement for a third-party SaaS vendor (Cloudspan Inc.) that will process Meridian customer personal data. Include: (1) scope and nature of processing, (2) processor obligations and confidentiality, (3) sub-processor approval and flow-down terms, (4) Standard Contractual Clauses for cross-border transfers, (5) security measures and breach notification timelines, and (6) audit and deletion rights." },
    { label: "Draft an SEC comment letter response", fullPrompt: "Review the SEC Staff's comment letter on our latest 10-K and the relevant disclosures. Draft a comprehensive response letter that: (1) addresses each numbered comment in order, (2) explains our disclosure rationale with citations to the applicable rules, (3) proposes any revised disclosure language, and (4) commits to prospective changes where appropriate. Maintain a cooperative, precise tone." },
    { label: "Draft a data breach notification", fullPrompt: "Review the incident summary involving vendor Atlas Payments LLC and applicable breach notification laws. Draft notification materials including: (1) individual notice describing the incident, data involved, and remediation steps, (2) regulator notifications meeting GDPR 72-hour and state-law timelines, (3) a factual chronology, and (4) recommended credit monitoring and contact resources. Avoid admissions of liability while remaining transparent." },
    { label: "Draft a records retention policy", fullPrompt: "Draft an enterprise records retention and information governance policy for Meridian. Include: (1) retention schedules by record category and regulatory driver (SEC, FinCEN, IRS, privacy laws), (2) legal hold procedures, (3) defensible deletion standards, (4) roles and responsibilities, (5) handling of personal data under GDPR/CCPA minimization principles, and (6) audit and exception processes." },
    { label: "Draft an AI governance policy for ML models", fullPrompt: "Draft an internal AI governance policy covering Meridian's machine-learning credit and underwriting models in light of the EU AI Act. Include: (1) risk classification of each model, (2) human oversight and contestability requirements, (3) data governance and bias testing, (4) documentation and logging obligations, (5) transparency disclosures to customers, and (6) roles for model validation and ongoing monitoring." },
    { label: "Draft an AML/KYC onboarding procedure", fullPrompt: "Review current FinCEN guidance and draft updated customer onboarding procedures for Meridian's AML/KYC program. Include: (1) customer identification and verification steps, (2) beneficial ownership collection, (3) risk-based customer due diligence and enhanced due diligence triggers, (4) sanctions and PEP screening, (5) ongoing monitoring and suspicious activity escalation, and (6) recordkeeping requirements." },
    { label: "Draft a privacy notice update for new state laws", fullPrompt: "Review Meridian's current privacy notice and the 2025 state privacy statutes. Draft an updated consumer privacy notice that: (1) describes categories of personal data collected and purposes, (2) explains consumer rights and how to exercise them, (3) covers sensitive data and opt-out of sale/sharing, (4) addresses automated decision-making, and (5) harmonizes disclosures across applicable state laws." },
  ],
  research: [
    { label: "Research SEC climate disclosure obligations", fullPrompt: "Research the current SEC Climate Disclosure Rules and what they require of public companies like Meridian. Focus on: (1) scope of required climate risk disclosures in registration statements and periodic reports, (2) greenhouse gas emissions reporting and any assurance requirements, (3) governance and risk-management disclosure items, (4) financial statement footnote impacts, and (5) phase-in timelines and accommodations. Cite the final rule release and recent SEC staff guidance." },
    { label: "Research GDPR cross-border transfer requirements", fullPrompt: "Research current GDPR requirements for transferring EU personal data to the United States. Cover: (1) the EU-U.S. Data Privacy Framework and self-certification, (2) Standard Contractual Clauses and when they are required, (3) transfer impact assessments after Schrems II, (4) supplementary measures, (5) documentation obligations, and (6) recent EDPB guidance and enforcement trends. Provide guidance applicable to Meridian's vendor data flows." },
    { label: "Research CCPA and 2025 state privacy laws", fullPrompt: "Research CCPA/CPRA and the new 2025 state consumer privacy statutes applicable to a financial services company. Cover: (1) applicability thresholds and the GLBA exemption scope, (2) consumer rights and required response timelines, (3) sensitive personal information handling, (4) opt-out of sale/sharing and global privacy controls, (5) data minimization and purpose limitation, and (6) enforcement and cure periods. Highlight where state requirements diverge." },
    { label: "Research EU AI Act obligations for credit models", fullPrompt: "Research the EU AI Act's requirements for AI systems used in credit scoring and underwriting. Analyze: (1) classification of credit-scoring systems as high-risk, (2) risk management and data governance obligations, (3) transparency and human oversight requirements, (4) conformity assessment and documentation, (5) the implementation timeline, and (6) penalties for non-compliance. Provide guidance applicable to Meridian's ML models." },
    { label: "Research FinCEN AML program requirements", fullPrompt: "Research FinCEN's requirements for an effective AML program at a financial institution. Include: (1) the five pillars of an AML program, (2) customer due diligence and beneficial ownership rules, (3) suspicious activity report filing standards and timelines, (4) sanctions screening obligations, (5) recent FinCEN priorities and guidance, and (6) recordkeeping requirements. Cite the BSA implementing regulations and recent advisories." },
    { label: "Research FTC Safeguards Rule requirements", fullPrompt: "Research the FTC Safeguards Rule and its application to a financial services company. Analyze: (1) the required elements of an information security program, (2) the role of a qualified individual, (3) risk assessment and access control requirements, (4) encryption and multi-factor authentication mandates, (5) service provider oversight, and (6) incident response and reporting obligations. Provide a gap-assessment framework for Meridian." },
    { label: "Research breach notification timelines by jurisdiction", fullPrompt: "Research data breach notification obligations across GDPR, U.S. state laws, and financial-sector regulators. Analyze: (1) what triggers a notifiable breach in each regime, (2) notification timelines (e.g., GDPR's 72 hours) and to whom, (3) content requirements for individual and regulator notices, (4) risk-of-harm thresholds, and (5) documentation obligations. Provide a comparative matrix Meridian can use during incident response." },
    { label: "Research consumer financial data rights rules", fullPrompt: "Research the CFPB's rules on consumer access to financial data and what they require of providers. Cover: (1) covered data and covered providers, (2) consumer access and authorized third-party access, (3) data security and privacy obligations, (4) prohibited uses of accessed data, (5) the compliance timeline, and (6) intersection with state privacy laws. Provide guidance applicable to Meridian's products." },
  ],
  analyze: [
    { label: "Analyze a vendor data processing agreement", fullPrompt: "Review the Cloudspan Inc. data processing agreement and analyze it against GDPR Article 28 and CCPA service-provider requirements. Identify: (1) gaps in processor obligations and confidentiality terms, (2) adequacy of cross-border transfer mechanisms, (3) sub-processor approval and flow-down provisions, (4) security and breach-notification commitments, (5) audit and deletion rights, and (6) recommended redline changes to close compliance gaps. Provide a risk assessment matrix." },
    { label: "Analyze our 10-K against new climate rules", fullPrompt: "Review Meridian's most recent 10-K disclosures and analyze them against the SEC Climate Disclosure Rules. Identify: (1) required disclosures not yet addressed, (2) governance and risk-management gaps, (3) emissions metrics and assurance readiness, (4) financial statement footnote impacts, (5) areas needing new disclosure controls, and (6) a prioritized remediation plan with owners and timelines." },
    { label: "Analyze regulatory impact on operations", fullPrompt: "Review the recent SEC amendments to Regulation S-K disclosure requirements and analyze the impact on Meridian's public-company reporting obligations. Assess: (1) new disclosure items required in 10-K and 10-Q filings, (2) changes to MD&A requirements and forward-looking statement protections, (3) cybersecurity incident reporting timeline and scope, (4) human capital management disclosure obligations, (5) compliance deadline and transition period, and (6) recommended updates to disclosure controls and procedures." },
    { label: "Analyze cross-border data flows for GDPR risk", fullPrompt: "Review Meridian's data inventory and vendor list and analyze cross-border data flows for GDPR transfer risk. Identify: (1) which flows transfer EU personal data outside the EEA, (2) the transfer mechanism relied upon for each, (3) flows lacking adequate SCCs or DPF coverage, (4) transfer impact assessment gaps after Schrems II, (5) supplementary measures needed, and (6) a prioritized remediation list. Create a transfer register with risk ratings." },
    { label: "Analyze vendor population for DPA gaps", fullPrompt: "Review the vendor risk register and contracts and analyze the vendor population for data processing agreement gaps. Identify: (1) vendors processing personal data without an executed DPA, (2) DPAs missing required GDPR/CCPA terms, (3) sub-processor and transfer deficiencies, (4) security and breach-notification shortfalls, and (5) a remediation roadmap prioritized by data sensitivity and volume. Create a vendor-by-vendor gap chart." },
    { label: "Analyze emissions data for disclosure accuracy", fullPrompt: "Review Meridian's Scope 1 and Scope 2 emissions data and supporting documentation. Analyze: (1) completeness of the organizational and operational boundaries, (2) methodology and emission factors used, (3) data quality and assurance readiness, (4) consistency with prior periods and any restatements, (5) gaps that could undermine disclosure accuracy, and (6) recommended controls before the data is disclosed in the 10-K." },
    { label: "Analyze acquisition target for regulatory risk", fullPrompt: "Review the diligence materials for Sterling Capital in Project Harbor and analyze regulatory risk for the acquisition. Assess: (1) the target's licensing and registration status, (2) outstanding regulatory examinations or enforcement matters, (3) AML/KYC and privacy compliance posture, (4) data transfer and vendor risk inherited post-close, (5) HSR and other regulatory approval requirements, and (6) a risk matrix with recommended reps, warranties, and closing conditions." },
  ],
};

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loading on initial app load (not on navigation)
    return !hasHomeLoaded;
  });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [promptInputValue, setPromptInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [isSkillCreation, setIsSkillCreation] = useState(false);

  // Check for skill creation pre-filled prompt from navigation state
  useEffect(() => {
    const state = location.state as { prefilledPrompt?: string; isSkillCreation?: boolean } | null;
    if (state?.prefilledPrompt) {
      setPromptInputValue(state.prefilledPrompt);

      // Store the skill creation flag for when chat is created
      if (state.isSkillCreation) {
        sessionStorage.setItem('skillCreation_active', 'true');
        setIsSkillCreation(true);
      }

      // Clear the state by replacing history
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (isLoading) {
      // Simulate loading delay
      const timer = setTimeout(() => {
        setIsLoading(false);
        hasHomeLoaded = true;
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Reset current page when dropdown changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeDropdown]);

  const handlePromptSelect = (fullPrompt: string) => {
    setPromptInputValue(fullPrompt);
    setActiveDropdown(null);
  };

  const handleShowMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleOpenLibrary = () => {
    setIsLibraryModalOpen(true);
  };

  const handleCloseLibrary = () => {
    // Use requestAnimationFrame to ensure proper cleanup
    requestAnimationFrame(() => {
      setIsLibraryModalOpen(false);
    });
  };

  const handleLibraryPromptSelect = (promptText: string) => {
    setPromptInputValue(promptText);
    setIsLibraryModalOpen(false);
  };

  const handlePromptSubmit = (text: string, files: any[]) => {
    // Generate unique chat ID
    const chatId = Math.random().toString(36).substring(2, 11);

    // Check if this is a skill creation flow
    const isSkillCreation = sessionStorage.getItem('skillCreation_active') === 'true';

    // Store prompt in session storage for this chat
    sessionStorage.setItem(`chat_${chatId}_prompt`, text);

    if (isSkillCreation) {
      sessionStorage.setItem(`chat_${chatId}_skillCreation`, 'true');
      sessionStorage.removeItem('skillCreation_active');
    }

    // Navigate to chat page with unique ID
    navigate(`/chat/${chatId}`);
  };

  const currentSuggestions = activeDropdown
    ? PROMPT_SUGGESTIONS[activeDropdown as keyof typeof PROMPT_SUGGESTIONS]
    : [];
  
  // Show 4 items at a time, cycling through
  const itemsPerPage = 4;
  const startIndex = (currentPage * itemsPerPage) % currentSuggestions.length;
  const visibleSuggestions = currentSuggestions.slice(startIndex, startIndex + itemsPerPage);
  const hasMore = currentSuggestions.length > itemsPerPage;

  return (
    <div className="flex h-full w-full bg-[#FCFCFC]">
      {/* Main Content Area */}
      <div className="flex-1 h-full flex flex-col relative">
        {/* Main Content Centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 w-full max-w-5xl mx-auto -mt-20 pt-[96px]">
        <div className="flex items-center gap-3 mb-3">
             <div className="text-[#de6633] drop-shadow-[0_4px_12px_rgba(247,93,27,0.4)]">
                <Sparkles className="size-5.5 fill-current" />
             </div>
             <span className="text-[21px] text-[#666666] font-normal tracking-tight">Good morning, Alex</span>
        </div>
        
        <h1 className="text-[30px] font-medium text-[#123021] mb-8 text-center tracking-tight leading-[1.2]">
          {isSkillCreation ? "Let's create your skill" : "Let's take some work off your plate"}
        </h1>

        {/* Chat Input Area */}
        <div className="w-full max-w-[750px] mx-auto pb-8" data-tour-step="1">
            <PromptInput
              withFlourish={true}
              externalValue={promptInputValue}
              onExternalValueUsed={() => setPromptInputValue("")}
              onSubmit={handlePromptSubmit}
            />
        </div>

        {/* Suggestion Pills with Dropdowns */}
        <div className="flex flex-col gap-4 w-full justify-center items-center mb-8">
          <div className="flex gap-2">
            {isLoading ? (
              <>
                <SuggestionPillSkeleton />
                <SuggestionPillSkeleton />
                <SuggestionPillSkeleton />
              </>
            ) : (
              <>
                <SuggestionPill 
                  icon={<Pencil className="size-3.5" />}
                  text="Draft full documents..."
                  type="draft"
                  isActive={activeDropdown === 'draft'}
                  onClick={() => setActiveDropdown(activeDropdown === 'draft' ? null : 'draft')}
                />
                <SuggestionPill 
                  icon={<Search className="size-3.5" />}
                  text="Conduct deep research..."
                  type="research"
                  isActive={activeDropdown === 'research'}
                  onClick={() => setActiveDropdown(activeDropdown === 'research' ? null : 'research')}
                />
                <SuggestionPill 
                  icon={<Sheet className="size-3.5" />}
                  text="Analyze document sets..."
                  type="analyze"
                  isActive={activeDropdown === 'analyze'}
                  onClick={() => setActiveDropdown(activeDropdown === 'analyze' ? null : 'analyze')}
                />
              </>
            )}
          </div>
          
          {/* Embedded Suggestions Container */}
          {activeDropdown && !isLoading && (
            <>
              <div className="w-[528px] bg-white rounded-lg border border-[#e5e5e5] shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col gap-1">
                  {visibleSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptSelect(suggestion.fullPrompt)}
                      className="text-left px-2.5 py-2 rounded-lg text-[14px] font-['Source_Sans_3'] font-normal leading-[1.2] transition-colors hover:bg-[#f5f5f5]"
                    >
                      <span className="text-[#8a8a8a]">{activeDropdown.charAt(0).toUpperCase() + activeDropdown.slice(1)}</span>
                      <span className="text-[#212223]">{suggestion.label.replace(activeDropdown.charAt(0).toUpperCase() + activeDropdown.slice(1), '')}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tertiary Buttons */}
              <div className="flex gap-[14px] items-center">
                <button
                  onClick={handleShowMore}
                  className="flex items-center gap-1.5 text-[#666666] hover:text-[#212223] transition-colors text-[14px] font-['Source_Sans_3'] font-normal"
                >
                  <RefreshCw className="size-3.5" />
                  <span>More ideas</span>
                </button>
                <button
                  onClick={handleOpenLibrary}
                  className="flex items-center gap-1.5 text-[#666666] hover:text-[#212223] transition-colors text-[14px] font-['Source_Sans_3'] font-normal"
                >
                  <BookOpen className="size-3.5" />
                  <span>Browse library</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      </div>

      {/* Library Modal */}
      {isLibraryModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            // Close modal if clicking the backdrop
            if (e.target === e.currentTarget) {
              handleCloseLibrary();
            }
          }}
        >
          <div className="w-full max-w-[95vw] h-[95vh] bg-white rounded-lg shadow-xl overflow-hidden">
            <Library 
              key="home-library-modal"
              isModal={true} 
              onPromptSelect={handleLibraryPromptSelect}
              onClose={handleCloseLibrary}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

interface SuggestionPillProps {
  icon: React.ReactNode;
  text: string;
  type: string;
  isActive: boolean;
  onClick: () => void;
}

function SuggestionPill({ icon, text, type, isActive, onClick }: SuggestionPillProps) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-[14px] font-['Source_Sans_3'] font-normal
        ${isActive 
          ? 'bg-[#1d4b34] text-white border border-[#1d4b34]' 
          : 'bg-white text-[#212223] border border-[#d2d2d2] hover:border-[#999] hover:shadow-sm'
        }
      `}
    >
      <span className={isActive ? 'text-white' : 'text-[#404040]'}>{icon}</span>
      <span>{text}</span>
    </button>
  );
}

function SuggestionPillSkeleton() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full">
      <div className="size-3.5 bg-gray-50 rounded shimmer shrink-0"></div>
      <div className="h-3.5 w-[120px] bg-gray-50 rounded shimmer"></div>
    </div>
  );
}
