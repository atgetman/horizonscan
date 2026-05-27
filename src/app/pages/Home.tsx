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
    { label: "Draft a motion to dismiss for lack of jurisdiction", fullPrompt: "Review the complaint and jurisdictional discovery responses in Master Services Agreement. Draft a comprehensive motion to dismiss under FRCP 12(b)(2) for lack of personal jurisdiction, including: (1) factual background showing insufficient minimum contacts, (2) legal argument citing controlling Second Circuit precedent on specific jurisdiction, (3) supporting declaration from corporate representative, and (4) proposed order." },
    { label: "Draft a mutual non-disclosure agreement", fullPrompt: "Draft a mutual non-disclosure agreement for a technology partnership between two software companies. Include: (1) definition of confidential information with specific carve-outs, (2) permitted disclosures to employees and advisors, (3) 5-year confidentiality term, (4) return/destruction obligations, (5) remedies including injunctive relief, and (6) governing law provisions. Ensure compliance with trade secret protection standards." },
    { label: "Draft an opposition to motion for summary judgment", fullPrompt: "Review the plaintiff's motion for summary judgment and all discovery materials including deposition transcripts and document productions. Draft a comprehensive opposition brief showing genuine issues of material fact preclude summary judgment. Include: (1) statement of disputed facts with record citations, (2) legal argument on burden of proof, (3) rebuttal to each element of plaintiff's claim, and (4) supporting affidavits." },
    { label: "Draft a demand letter for breach of contract", fullPrompt: "Review the Subcontractor Agreement and email correspondence showing breach. Draft a formal demand letter including: (1) summary of contractual relationship and obligations, (2) detailed description of specific breaches with dates and evidence, (3) calculation of damages including lost profits and additional costs incurred, (4) demand for payment within 30 days, and (5) notice of intent to pursue litigation and all available remedies." },
    { label: "Draft a settlement agreement and release", fullPrompt: "Draft a comprehensive settlement agreement resolving employment discrimination claims. Include: (1) factual recitals without admission of liability, (2) payment terms with structured settlement over 6 months, (3) full mutual release of all known and unknown claims, (4) confidentiality provisions with liquidated damages clause, (5) non-disparagement obligations, (6) tax characterization of payments, and (7) representation by counsel acknowledgment." },
    { label: "Draft a licensing agreement for software IP", fullPrompt: "Draft a non-exclusive software licensing agreement for enterprise SaaS platform. Include: (1) scope of license with user limitations and permitted uses, (2) tiered royalty structure based on revenue, (3) IP ownership and derivative works provisions, (4) warranties and disclaimers of liability, (5) audit rights for royalty verification, (6) termination rights for material breach, and (7) post-termination data transition obligations." },
    { label: "Draft interrogatories and document requests", fullPrompt: "Review the complaint allegations and initial disclosures. Draft comprehensive interrogatories and document requests for plaintiff including: (1) contention interrogatories on each element of claims, (2) interrogatories on damages calculation and supporting evidence, (3) requests for all communications regarding the disputed transaction, (4) financial records supporting damages claim, and (5) requests for expert reports and underlying data. Ensure compliance with FRCP 33 and 34 limitations." },
    { label: "Draft deposition outline for expert witness", fullPrompt: "Review the expert's written report on damages calculation and Q3_Financials.xlsx. Draft comprehensive deposition outline including: (1) qualification challenges and bias inquiry, (2) methodology cross-examination with alternative assumptions, (3) questions on data sources and reliability, (4) challenges to opinions under Daubert standard, (5) impeachment using prior inconsistent statements, and (6) foundational questions for excluding testimony." },
  ],
  research: [
    { label: "Research jurisdictional requirements", fullPrompt: "Research personal jurisdiction requirements under International Shoe and progeny for out-of-state defendants in federal district courts in New York. Focus on: (1) minimum contacts analysis for corporations with limited presence, (2) stream of commerce theory under Asahi and McIntyre, (3) specific vs. general jurisdiction after Daimler, and (4) due process considerations. Provide case citations from Second Circuit and New York courts from past 5 years." },
    { label: "Research statute of limitations defenses", fullPrompt: "Research New York statute of limitations for breach of contract and fraud claims in commercial disputes. Analyze: (1) accrual of action triggers and discovery rule application, (2) tolling provisions including fraudulent concealment, (3) relation back doctrine for amended claims, and (4) borrowing statute for out-of-state defendants. Include New York Court of Appeals and appellate division cases from past 7 years with detailed analysis of fact patterns." },
    { label: "Research GDPR compliance for US companies", fullPrompt: "Research current GDPR compliance requirements for U.S. companies processing EU customer data. Cover: (1) territorial scope and when GDPR applies to U.S. entities, (2) lawful basis for processing including consent requirements, (3) data subject rights and procedures for responding to requests, (4) data breach notification obligations and timelines, (5) appointment of EU representative requirements, and (6) penalties and enforcement trends. Include recent CJEU decisions and regulatory guidance." },
    { label: "Research discovery sanctions standards", fullPrompt: "Research standards for imposing discovery sanctions under FRCP 37 for failure to preserve electronically stored information. Analyze: (1) duty to preserve triggers and scope, (2) sanctions framework under amended Rule 37(e), (3) showing required for adverse inference instruction, (4) proportionality considerations, and (5) bad faith vs. negligence standards. Provide detailed case law analysis from federal courts including controlling circuit precedent." },
    { label: "Research employment discrimination prima facie case", fullPrompt: "Research the legal standard for establishing prima facie case of employment discrimination under Title VII and New York State Human Rights Law. Include: (1) McDonnell Douglas burden-shifting framework, (2) comparator evidence requirements and recent circuit splits, (3) pretext analysis and proof standards, (4) mixed-motive vs. single-motive framework after Desert Palace, and (5) cat's paw liability theory. Cite Second Circuit and New York Court of Appeals decisions from past 5 years with factual analogies to our case." },
    { label: "Research patent eligibility under Section 101", fullPrompt: "Research patent eligibility standards for software and business method patents under 35 U.S.C. § 101. Analyze: (1) Alice/Mayo two-step framework for abstract idea analysis, (2) Federal Circuit guidance on applying Alice in software cases, (3) inventive concept requirement and what constitutes significantly more, (4) practical application test from recent USPTO guidance, and (5) successful claim drafting strategies. Include detailed case study analysis of claims held eligible vs. ineligible." },
    { label: "Research force majeure in commercial contracts", fullPrompt: "Research New York law on force majeure clauses and impossibility of performance in commercial lease and service agreements, with focus on COVID-19 pandemic cases. Analyze: (1) strict construction of force majeure clauses and specific language required, (2) impossibility vs. impracticability standards, (3) frustration of purpose doctrine, (4) how courts have applied these doctrines to pandemic-related performance issues, and (5) foreseeability considerations. Provide analysis applicable to our Subcontractor Agreements." },
    { label: "Research class action certification standards", fullPrompt: "Research Rule 23 class certification requirements for consumer fraud class actions, including recent Supreme Court developments. Cover: (1) numerosity and ascertainability requirements, (2) commonality and predominance showing under Wal-Mart and Dukes, (3) typicality of class representative, (4) adequacy of counsel and conflicts of interest, (5) superiority of class action mechanism, and (6) standards for opposing certification. Include statistical and economic expert evidence standards." },
  ],
  analyze: [
    { label: "Analyze contract provisions", fullPrompt: "Review the Master Services Agreement and analyze the indemnification, limitation of liability, and warranty provisions. Identify: (1) scope of indemnity obligations and what events trigger indemnification, (2) liability caps and whether they apply to indemnification, (3) warranty disclaimers and their enforceability, (4) allocation of risk and which party bears greater liability exposure, (5) insurance requirements and gaps in coverage, and (6) recommended redline changes to better protect client's interests. Provide risk assessment matrix." },
    { label: "Analyze discovery materials for summary judgment", fullPrompt: "Review all documents in the Discovery overview table, deposition transcripts, and expert reports. Analyze materials to identify: (1) undisputed material facts supporting our motion for summary judgment, (2) evidence establishing each element of plaintiff's claim lacks genuine dispute, (3) contradictions and inconsistencies in plaintiff's evidence, (4) gaps in plaintiff's proof on causation and damages, and (5) admissibility issues with plaintiff's evidence. Create detailed fact chart with record citations for motion." },
    { label: "Analyze regulatory impact on operations", fullPrompt: "Review the recent SEC amendments to Regulation S-K disclosure requirements and analyze impact on client's public company reporting obligations. Assess: (1) new disclosure items required in 10-K and 10-Q filings, (2) changes to MD&A requirements and forward-looking statement protections, (3) cybersecurity incident reporting timeline and scope, (4) human capital management disclosure obligations, (5) compliance deadline and transition period, and (6) recommended updates to disclosure controls and procedures." },
    { label: "Analyze opposing party's summary judgment brief", fullPrompt: "Carefully review plaintiff's summary judgment motion and supporting materials. Identify and analyze: (1) gaps and weaknesses in factual record citations, (2) disputed facts that plaintiff incorrectly characterizes as undisputed, (3) legal errors in applying summary judgment standard, (4) inadmissible evidence relied upon, (5) factual disputes requiring credibility determinations, (6) areas where discovery is incomplete, and (7) alternative legal theories we should develop. Prepare detailed outline for opposition brief." },
    { label: "Analyze deposition testimony for impeachment", fullPrompt: "Review all deposition transcripts from key witnesses in Discovery overview and compare with their declarations, email communications in Email_Batch_001.pst, and contemporaneous meeting minutes. Identify: (1) contradictions between deposition testimony and prior statements, (2) inconsistencies between witnesses on material facts, (3) admissions supporting our affirmative defenses, (4) evasive answers suggesting knowledge witness denied, and (5) impeachment opportunities for trial. Create witness-by-witness impeachment outline with exhibit references." },
    { label: "Analyze damages calculation and financial records", fullPrompt: "Review Q3_Financials.xlsx, plaintiff's damages expert report, and supporting financial documentation. Analyze: (1) methodology used to calculate lost profits and whether it complies with legal standards, (2) baseline assumptions and whether they are supported by evidence, (3) alternative causes for financial losses not accounted for, (4) failure to mitigate damages and offset calculations, (5) whether new business rule bars lost profits claim, and (6) tax implications of damage award. Prepare report identifying vulnerabilities for expert rebuttal." },
    { label: "Analyze patent claims for infringement", fullPrompt: "Review the asserted patent claims and conduct detailed claim construction analysis comparing with accused product specifications. Perform: (1) element-by-element claim chart showing literal infringement or doctrine of equivalents, (2) analysis of claim limitations and whether each is met, (3) prosecution history estoppel considerations limiting equivalents, (4) prior art analysis for invalidity defenses under 35 U.S.C. §§ 102-103, (5) written description and enablement challenges, and (6) recommended claim construction positions. Include Markman hearing preparation strategy." },
    { label: "Analyze M&A agreement terms and deal risk", fullPrompt: "Review the merger agreement and analyze key provisions affecting deal certainty and risk allocation. Assess: (1) material adverse effect definition and what events qualify as MAE, (2) conditions precedent to closing and probability of satisfaction, (3) termination rights and breakup fee triggers, (4) representations and warranties with survival periods, (5) indemnification structure and caps, (6) regulatory approval requirements and antitrust risk, and (7) financing conditions and certainty of funding. Provide deal risk matrix and recommended negotiation priorities." },
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
