import React from 'react';
import { clsx } from "clsx";
import { Bot, User, FileText, Folder, Table } from 'lucide-react';
import { Citation } from "../components/Citation";
import { PersonalJurisdictionMotion } from "./personalJurisdictionMotion";
import { DiscoveryOverviewSpreadsheet } from "../components/DiscoveryOverviewSpreadsheet";

export type FileSystemItem = {
  id: string;
  parentId: string | null;
  type: 'folder' | 'file' | 'table' | 'doc';
  name: string;
};

export const ALL_FILES: FileSystemItem[] = [
  { id: '1', parentId: null, type: 'folder', name: 'Disclosures' },
  { id: '2', parentId: null, type: 'folder', name: 'Vendor Reviews' },
  { id: '3', parentId: null, type: 'folder', name: 'Data Mapping' },
  { id: '4', parentId: null, type: 'file', name: 'Compliance Risk Assessment.docx' },
  { id: '5', parentId: null, type: 'file', name: 'SEC Disclosure Rules.docx' },
  { id: '6', parentId: null, type: 'file', name: 'Compliance Strategy.docx' },
  
  // Nested files - Disclosures
  { id: '11', parentId: '1', type: 'file', name: 'Memo on Disclosure Obligations.docx' },
  { id: '12', parentId: '1', type: 'file', name: 'Climate Risk Disclosure Memo.docx' },
  { id: '13', parentId: '1', type: 'file', name: 'Updated Risk Assessment.docx' },
  { id: '14', parentId: '1', type: 'file', name: 'SEC Comment Letter Response.docx' },
  
  // Nested files - Vendor Reviews
  { id: '21', parentId: '2', type: 'file', name: 'Cloudspan Vendor Review.pdf' },
  { id: '22', parentId: '2', type: 'file', name: 'Atlas Payments Vendor Review.pdf' },
  { id: '23', parentId: '2', type: 'file', name: 'Privacy Impact Assessment.pdf' },
  
  // Nested files - Data Mapping
  { id: '31', parentId: '3', type: 'table', name: 'Vendor Register.xlsx' },
  { id: '32', parentId: '3', type: 'folder', name: 'Vendor Correspondence' },
  { id: '33', parentId: '3', type: 'file', name: 'Data Inventory.xlsx' },
  
  // Nested files - Vendor Correspondence (Level 3)
  { id: '321', parentId: '32', type: 'file', name: 'Vendor_Correspondence_001.pst' },
  { id: '322', parentId: '32', type: 'file', name: 'Vendor_Correspondence_002.pst' },
];

export const MOCK_CHATS: Record<string, React.ReactNode> = {
  "Research on SEC climate rules": (
    <div className="flex flex-col gap-6 p-8 max-w-3xl mx-auto">
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <User className="size-5 text-gray-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-[#212223] mb-1">You</p>
          <p className="text-[#212223] leading-relaxed">Summarize the key SEC and EU guidance on climate-related disclosure for public companies from the last 2 years.</p>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-[#1D4B34] flex items-center justify-center shrink-0">
          <Bot className="size-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-[#212223] mb-1">CoCounsel</p>
          <p className="text-[#212223] leading-relaxed mb-4">I found several relevant authorities issued within the last 2 years:</p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
             <h4 className="font-bold text-[#054688] mb-1">1. SEC Climate Disclosure Rules (2024)</h4>
             <p className="text-sm text-gray-600">Require registrants to disclose material climate-related risks, governance, and certain greenhouse gas metrics, with phased-in compliance and assurance requirements.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
             <h4 className="font-bold text-[#054688] mb-1">2. EU CSRD Implementing Guidance (2023)</h4>
             <p className="text-sm text-gray-600">Establishes detailed sustainability reporting standards that may apply to large issuers with EU operations, emphasizing double-materiality assessment.</p>
          </div>
        </div>
      </div>
    </div>
  ),
  "Summary of vendor risk findings": (
    <div className="flex flex-col gap-6 p-8 max-w-3xl mx-auto">
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <User className="size-5 text-gray-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-[#212223] mb-1">You</p>
          <p className="text-[#212223] leading-relaxed">Summarize the key compliance gaps from the Cloudspan Inc. vendor review.</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-[#1D4B34] flex items-center justify-center shrink-0">
          <Bot className="size-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-[#212223] mb-1">CoCounsel</p>
          <p className="text-[#212223] leading-relaxed mb-4">Here are the key compliance gaps identified in the Cloudspan Inc. vendor review on Aug 14, 2024:</p>
          <ul className="list-disc pl-5 space-y-2 text-[15px] text-[#212223]">
            <li>No executed data processing agreement covering EU personal data transfers.</li>
            <li>Standard Contractual Clauses are referenced but not attached or signed.</li>
            <li>Breach-notification commitment is 14 days, exceeding the GDPR 72-hour requirement.</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  "Drafting disclosure language": (
    <div className="flex flex-col gap-6 p-8 max-w-3xl mx-auto">
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <User className="size-5 text-gray-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-[#212223] mb-1">You</p>
          <p className="text-[#212223] leading-relaxed">Help me draft the climate risk governance disclosure for the 10-K.</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-[#1D4B34] flex items-center justify-center shrink-0">
          <Bot className="size-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-[#212223] mb-1">CoCounsel</p>
          <p className="text-[#212223] leading-relaxed mb-4">Certainly. The disclosure should describe board and management oversight of climate-related risks and how those risks are integrated into the broader enterprise risk-management process.</p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
             <h4 className="font-bold text-[#054688] mb-1">Proposed Disclosure Text</h4>
             <p className="text-sm text-gray-600">"The Board's Risk Committee oversees climate-related risks, receiving quarterly reports from management. Material physical and transition risks are assessed through the Company's enterprise risk-management framework and reflected in strategic planning..."</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const MOCK_FILES: Record<string, React.ReactNode | (() => React.ReactNode)> = {
  "GDPR Data Transfer Assessment": PersonalJurisdictionMotion,
  "SEC Comment Letter Response": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-2xl font-bold mb-6 text-center">MERIDIAN FINANCIAL GROUP, INC.<br/>OFFICE OF THE GENERAL COUNSEL</h1>
      <div className="flex justify-between mb-12 text-sm border-b-2 border-black pb-8">
        <div className="w-1/2 border-r-2 border-black pr-4">
          <p className="font-bold">U.S. SECURITIES AND EXCHANGE COMMISSION</p>
          <p className="ml-8 italic">Division of Corporation Finance</p>
          <p className="my-4 text-center">— re —</p>
          <p className="font-bold">Form 10-K, FY Ended December 31, 2025</p>
          <p className="ml-8 italic">Response to Staff Comment Letter</p>
        </div>
        <div className="w-1/2 pl-4 flex flex-col justify-center">
          <p>File No. 001-38291</p>
          <p className="font-bold mt-4 text-lg">RESPONSE TO STAFF COMMENT LETTER DATED FEBRUARY 9, 2026</p>
          <p className="mt-2 font-bold">SUBMITTED VIA EDGAR</p>
        </div>
      </div>
      
      <p className="mb-6 text-[15px] leading-relaxed text-justify">
        On behalf of Meridian Financial Group, Inc. ("Meridian" or the "Company"), we respectfully submit the following responses to the comments of the Staff of the Division of Corporation Finance (the "Staff") relating to the above-referenced Annual Report on Form 10-K. Each comment is reproduced below, followed by the Company's response.
      </p>

       <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">CLIMATE-RELATED DISCLOSURES</h3>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         The Staff requested that the Company expand its disclosure regarding the governance of climate-related risks, including the board committee responsible for oversight and the frequency of management reporting. The Company will revise its disclosure consistent with the SEC's climate disclosure rules.
       </p>
       
       <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">RESPONSES</h3>
       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">I. Governance of Climate-Related Risks</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Registrants are required to describe the board's oversight of climate-related risks and management's role in assessing and managing those risks.
         <Citation 
           id="cit-1"
           type="statute"
           source="17 C.F.R. § 229.1501"
           title="Regulation S-K, Item 1501 (Governance)"
           snippet="Requires disclosure of the board's oversight of climate-related risks and management's role in assessing and managing such risks."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         The Company advises the Staff that the Board's Risk Committee has primary oversight responsibility for climate-related risks and receives reports from the Chief Risk Officer no less than quarterly. The Company will revise its disclosure in future filings to identify the Risk Committee and the cadence of management reporting.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Material climate-related matters are escalated to the full Board as appropriate, and the Company's enterprise risk-management framework integrates climate considerations into its broader risk assessment processes.
       </p>

       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">II. Materiality of Physical and Transition Risks</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         A registrant must disclose climate-related risks that have had or are reasonably likely to have a material impact on its business or results of operations.
         <Citation 
           id="cit-3"
           type="statute"
           source="17 C.F.R. § 229.1502"
           title="Regulation S-K, Item 1502 (Strategy)"
           snippet="Requires disclosure of climate-related risks reasonably likely to have a material impact on the registrant, including over the short, medium, and long term."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Based on its current assessment, the Company advises the Staff that the identified physical and transition risks have not had a material impact on its results of operations during the periods presented. The Company will disclose any reasonably likely material impacts, with quantification where practicable, in future periodic reports.
       </p>

       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">III. Greenhouse Gas Metrics and Assurance</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Where a registrant discloses Scope 1 and Scope 2 emissions, it must describe the methodology, organizational boundaries, and assurance status of those metrics.
         <Citation 
           id="cit-5"
           type="statute"
           source="17 C.F.R. § 229.1505"
           title="Regulation S-K, Item 1505 (GHG Emissions Metrics)"
           snippet="Requires disclosure of the methodology, organizational boundaries, and any assurance obtained with respect to greenhouse gas emissions metrics."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         The Company confirms that its Scope 1 and Scope 2 emissions are calculated using the operational control approach consistent with the GHG Protocol Corporate Standard and are currently subject to limited assurance by an independent third party.
         <Citation 
           id="cit-6"
           type="record"
           source="GHG Protocol"
           title="Corporate Accounting and Reporting Standard"
           snippet="Provides the operational control approach and accounting boundaries widely used for Scope 1 and Scope 2 emissions reporting."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         In response to the Staff's comment, the Company will expand its disclosure to describe the organizational boundaries, methodology, emission factors, and assurance level applied to these metrics.
       </p>

       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">IV. Disclosure Controls and Procedures</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         A registrant must maintain disclosure controls and procedures designed to ensure that information required to be disclosed is recorded, processed, and reported accurately and on a timely basis.
         <Citation 
           id="cit-7"
           type="statute"
           source="17 C.F.R. § 240.13a-15"
           title="Exchange Act Rule 13a-15"
           snippet="Requires issuers to maintain disclosure controls and procedures and to evaluate their effectiveness."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         The Company is enhancing its disclosure controls to incorporate the collection and review of climate-related data, including emissions metrics, ahead of the applicable compliance dates.
       </p>
       
       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">V. Acknowledgments</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         The Company acknowledges that it is responsible for the adequacy and accuracy of the disclosure in its filings, and that Staff comments do not foreclose any action the Commission may take with respect to the filing.
         <Citation 
           id="cit-8"
           type="record"
           source="SEC Staff Guidance"
           title="Standard Acknowledgments in Comment Responses"
           snippet="Reflects the customary acknowledgments that registrants are responsible for the adequacy and accuracy of their disclosures."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         The Company believes its responses are fully responsive to the Staff's comments and welcomes the opportunity to discuss any remaining questions.
       </p>

       <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">CONCLUSION</h3>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         For the foregoing reasons, the Company respectfully submits that the revised disclosures it has agreed to provide in future filings address each of the Staff's comments in full.
       </p>
    </div>
  ),
  "Compliance Risk Assessment.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-2xl font-bold mb-6 text-center">MERIDIAN FINANCIAL GROUP, INC.<br/>ENTERPRISE COMPLIANCE RISK ASSESSMENT</h1>
      <div className="flex justify-between mb-12 text-sm border-b-2 border-black pb-8">
        <div className="w-1/2 border-r-2 border-black pr-4">
          <p className="font-bold">PREPARED FOR:</p>
          <p className="ml-8 italic">Board Risk Committee</p>
          <p className="my-4 text-center">— and —</p>
          <p className="font-bold">PREPARED BY: Office of the General Counsel</p>
          <p className="ml-8 italic">Privacy & Regulatory Compliance</p>
        </div>
        <div className="w-1/2 pl-4 flex flex-col justify-center">
          <p>Assessment No. CRA-2026-Q1</p>
          <p className="font-bold mt-4 text-lg">ANNUAL ENTERPRISE COMPLIANCE RISK ASSESSMENT</p>
          <p className="mt-2 font-bold">PRIVILEGED & CONFIDENTIAL</p>
        </div>
      </div>
      
      <p className="mb-6 text-[15px] leading-relaxed text-justify">
        This assessment summarizes the principal regulatory compliance risks facing Meridian Financial Group, Inc. ("Meridian" or the "Company") for the current fiscal year, and identifies the priority remediation actions recommended by the Office of the General Counsel.
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">I. PURPOSE AND SCOPE</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        1. This assessment evaluates Meridian's exposure across its core regulatory obligations, including securities disclosure, data privacy, AI governance, and anti-money-laundering requirements. It is intended to inform the Board Risk Committee's annual review and to prioritize the compliance program's resourcing for the coming year.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        2. As a publicly-traded financial services company operating in the United States and the European Union, Meridian is subject to overlapping regulatory regimes administered by the SEC, FinCEN, the FTC, and EU data-protection authorities. The assessment treats areas where these regimes intersect as elevated-priority risks.
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">II. KEY RISK AREAS</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        3. <strong>Securities disclosure.</strong> The SEC's climate disclosure rules impose new governance, strategy, and emissions-reporting obligations. Meridian's current disclosure controls do not yet capture the climate-related data required for its 10-K, creating a near-term disclosure risk.
        <Citation 
           id="cit-c1"
           type="statute"
           source="17 C.F.R. § 229.1500"
           title="Regulation S-K, Subpart 1500 (Climate Disclosures)"
           snippet="Requires registrants to disclose climate-related risks, governance, strategy, and certain greenhouse gas emissions metrics in registration statements and annual reports."
         />
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        4. <strong>Cross-border data transfers.</strong> Meridian transfers EU customer personal data to U.S. vendors. Several transfers lack executed Standard Contractual Clauses or completed transfer impact assessments, exposing the Company to GDPR enforcement risk.
        <Citation 
           id="cit-c2"
           type="statute"
           source="GDPR Art. 44"
           title="General principle for transfers"
           snippet="Any transfer of personal data to a third country shall take place only if the conditions of Chapter V are met."
         />
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        5. <strong>State privacy compliance.</strong> The expansion of state consumer privacy statutes in 2025 requires Meridian to harmonize its consumer disclosures, rights-handling processes, and opt-out mechanisms across multiple jurisdictions.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        6. <strong>AI governance.</strong> Meridian's machine-learning credit and underwriting models are likely to be classified as high-risk systems under the EU AI Act, requiring documented risk management, human oversight, and transparency controls.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        7. <strong>AML / KYC.</strong> Updated FinCEN guidance requires enhancements to Meridian's customer due diligence, beneficial-ownership collection, and suspicious-activity monitoring procedures.
        <Citation 
           id="cit-c3"
           type="statute"
           source="31 C.F.R. § 1020.210"
           title="Anti-Money-Laundering Program Requirements"
           snippet="Requires financial institutions to establish and maintain a risk-based anti-money-laundering program reasonably designed to prevent the institution from being used for money laundering."
         />
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">III. RISK RATINGS</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        8. The Office of the General Counsel has assigned the following preliminary risk ratings, reflecting both likelihood and potential impact:
      </p>
      <ul className="list-disc pl-10 mb-4 space-y-2 text-[15px]">
        <li><strong>High:</strong> Cross-border data transfers; SEC climate disclosure readiness.</li>
        <li><strong>Medium:</strong> State privacy harmonization; AI governance controls.</li>
        <li><strong>Monitored:</strong> AML / KYC program refresh (remediation underway).</li>
      </ul>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">IV. RECOMMENDED REMEDIATION</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        9. Execute Standard Contractual Clauses and complete transfer impact assessments for all vendors processing EU personal data.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        10. Enhance disclosure controls to capture climate-related and emissions data ahead of the next 10-K filing.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        11. Stand up an AI governance committee and model inventory aligned to the EU AI Act's high-risk requirements.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        12. Complete the AML/KYC procedure refresh and deliver updated training to customer-facing teams.
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">V. CONCLUSION</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        13. The Company's most significant near-term exposure arises from cross-border data transfers and SEC climate disclosure readiness. The Office of the General Counsel recommends that the Board Risk Committee prioritize the remediation actions above and receive quarterly progress reporting.
      </p>
      
      <div className="mt-16 mb-8">
        <p className="mb-2">Dated: New York, New York<br/>February 23, 2026</p>
        <div className="mt-8 w-64 border-t border-black pt-2">
          <p className="font-bold">By: ______________________</p>
          <p>Jordan Avery</p>
          <p>EVP & General Counsel</p>
          <p>Meridian Financial Group, Inc.</p>
          <p>200 Harbor Street</p>
          <p>New York, NY 10004</p>
          <p>Office of the General Counsel</p>
        </div>
      </div>
    </div>
  ),
  "Compliance Strategy.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <div className="flex justify-between items-start mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1D4B34]">COMPLIANCE STRATEGY MEMORANDUM</h1>
          <p className="text-gray-500 mt-1">Meridian Financial Group — Regulatory Compliance Program</p>
        </div>
        <div className="text-right">
          <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-1">
             Privileged & Confidential
          </div>
          <p className="text-xs text-gray-400">Attorney Work Product</p>
        </div>
      </div>
      
      <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4">I. EXECUTIVE SUMMARY</h2>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        Our primary objective this cycle is to bring Meridian into full compliance with the SEC climate disclosure rules and the GDPR cross-border transfer requirements ahead of the next 10-K filing. We have a strong foundation in our existing privacy program, but several vendor transfers and disclosure controls require remediation before the filing deadline.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        The vendor review phase will be critical. We need to inventory all third parties processing EU personal data and confirm that each transfer is supported by executed Standard Contractual Clauses and a completed transfer impact assessment. We have already identified several vendors whose agreements lack adequate safeguards.
      </p>

      <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">II. PROGRAM TIMELINE</h2>
      <ul className="list-disc pl-5 space-y-2 text-[15px] mb-4">
        <li><strong>Risk Assessment Completed:</strong> February 1, 2026</li>
        <li><strong>Vendor Inventory Due:</strong> February 28, 2026</li>
        <li><strong>SCC Remediation Target:</strong> March 31, 2026</li>
        <li><strong>10-K Climate Disclosure Draft:</strong> Mid-March 2026</li>
        <li><strong>Board Risk Committee Review:</strong> Quarterly</li>
      </ul>

      <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">III. KEY COMPLIANCE PRIORITIES</h2>
      
      <h3 className="font-bold text-md mb-2">A. SEC Climate Disclosure</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        The climate disclosure rules require governance, strategy, and emissions disclosures. Confirming our Risk Committee oversight language and the assurance status of our emissions metrics will be dispositive on the adequacy of the disclosure.
        <Citation 
           id="cit-s1"
           type="statute"
           source="17 C.F.R. § 229.1501"
           title="Regulation S-K, Item 1501 (Governance)"
           snippet="Requires disclosure of the board's oversight of climate-related risks and management's role in assessing and managing such risks."
         />
      </p>
      
      <h3 className="font-bold text-md mb-2">B. Cross-Border Data Transfers</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        To support EU data transfers, we must execute SCCs and document transfer impact assessments. The priority is the Cloudspan transfer, which currently lacks executed clauses. We will require completed SCC annexes in the next contract cycle.
        <Citation 
           id="cit-s2"
           type="statute"
           source="GDPR Art. 46"
           title="Transfers subject to appropriate safeguards"
           snippet="In the absence of an adequacy decision, a controller or processor may transfer personal data to a third country only if it has provided appropriate safeguards, including approved Standard Contractual Clauses."
         />
      </p>

      <h3 className="font-bold text-md mb-2">C. Anticipated Challenges</h3>
      <ul className="list-disc pl-5 space-y-2 text-[15px] mb-4">
        <li><strong>Vendor pushback:</strong> Some vendors may resist our standard SCC modules. We have prepared fallback positions and escalation paths for high-volume processors.</li>
        <li><strong>Data adequacy gaps:</strong> Transfers may rely on the DPF where vendors are certified; we will verify each certification before relying on it.
          <Citation 
             id="cit-s3"
             type="case"
             source="CJEU"
             title="Data Protection Commissioner v. Facebook Ireland (Schrems II)"
             snippet="Required exporters to assess the destination country's protections and adopt supplementary measures where protection is not equivalent."
           />
        </li>
      </ul>

      <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">IV. VENDOR REVIEW PLAN</h2>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        We will execute the following steps as part of the vendor remediation program:
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-[15px] mb-4">
        <li><strong>Inventory:</strong> Identify all vendors processing personal data and the categories of data and transfer mechanisms involved.</li>
        <li><strong>Gap analysis:</strong> Review each data processing agreement for missing SCCs, sub-processor terms, security commitments, and breach-notification timelines.</li>
        <li><strong>Remediation:</strong> Execute updated DPAs and SCC modules with priority vendors, including Cloudspan and Atlas Payments.</li>
        <li><strong>Documentation:</strong> Complete and retain transfer impact assessments for each restricted transfer.</li>
      </ol>

      <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">V. RESOURCING & BUDGET</h2>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        <strong>Estimated Program Budget:</strong> $250,000 - $300,000. This includes outside privacy counsel support and emissions-data assurance services.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        <strong>Resourcing Target:</strong> We recommend dedicating two compliance analysts to vendor remediation and engaging outside counsel for the transfer impact assessments to meet the filing timeline.
      </p>

       <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">VI. RISK ANALYSIS</h2>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         <strong>High Risk:</strong> Incomplete SCCs could expose Meridian to GDPR enforcement and order suspension of transfers. We must prioritize the Cloudspan remediation to mitigate this exposure.
         <Citation 
           id="cit-s4"
           type="statute"
           source="GDPR Art. 83"
           title="General conditions for imposing administrative fines"
           snippet="Infringements of the provisions on transfers of personal data to third countries may be subject to administrative fines of up to the higher statutory tier."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         <strong>Medium Risk:</strong> Disclosure controls may not fully capture emissions data in time for the 10-K. We will coordinate with Finance to lock in the data-collection process early.
       </p>

       <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">VII. NEXT STEPS</h2>
       <ol className="list-decimal pl-5 space-y-2 text-[15px] mb-4">
         <li>Finalize the vendor inventory and gap analysis.</li>
         <li>Prepare the climate disclosure draft for the 10-K.</li>
         <li>Execute SCCs with priority vendors.</li>
         <li>Schedule a review with the Board Risk Committee on remediation progress.</li>
       </ol>
    </div>
  ),
  "Vendor Risk Register": () => <DiscoveryOverviewSpreadsheet />,
  "Updated Risk Assessment.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">Updated Compliance Risk Assessment</h1>
      <p className="text-[15px] leading-relaxed mb-4">
        The Office of the General Counsel, having completed additional vendor review, updates the enterprise compliance risk assessment as follows:
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        1. This update supplements the annual Compliance Risk Assessment with findings from the latest vendor data-mapping exercise.
      </p>
      <h3 className="font-bold mt-6 mb-2">ADDITIONAL FINDINGS</h3>
      <p className="text-[15px] leading-relaxed mb-4">
        25. Since the original assessment, the team has identified that the Company's exposure extends beyond the Cloudspan transfer.
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        26. Specifically, a second processor, Atlas Payments LLC, is receiving EU personal data without an executed data processing agreement, in violation of GDPR Article 28.
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        27. This additional gap was discovered on February 15, 2026, during the vendor data-flow mapping review.
      </p>
      {/* Expanded content placeholder to imply length */}
      <div className="space-y-4 text-gray-400 mt-8">
        <p>[... Findings 28-50 detailing additional vendor gaps ...]</p>
        <p>[... Expanded Remediation Plan including sub-processor flow-down terms ...]</p>
      </div>
    </div>
  ),
  "SEC Comment Letter Response.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34] text-center">RESPONSE TO SEC STAFF COMMENT LETTER</h1>
      <p className="text-[15px] leading-relaxed mb-6">
        Meridian Financial Group, Inc. respectfully submits this response to the Staff's comment letter regarding its Annual Report on Form 10-K, addressing each comment in turn.
      </p>
      <h3 className="font-bold mt-6 mb-2">I. RESPONSES</h3>
      <h4 className="font-bold mt-4 mb-2 text-sm uppercase">A. Governance of Climate-Related Risks</h4>
      <p className="text-[15px] leading-relaxed mb-4">
        The Company confirms that the Board's Risk Committee oversees climate-related risks and receives quarterly reports from management. See Regulation S-K, Item 1501, 17 C.F.R. § 229.1501.
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        In response to the Staff's comment, the Company will revise its disclosure to identify the Risk Committee and the cadence of management reporting in future filings.
      </p>
      <h4 className="font-bold mt-4 mb-2 text-sm uppercase">B. Greenhouse Gas Metrics and Assurance</h4>
      <p className="text-[15px] leading-relaxed mb-4">
        The Company's Scope 1 and Scope 2 emissions are calculated using the operational control approach and are subject to limited assurance. The Company will expand its disclosure to describe the methodology, boundaries, and assurance level applied.
      </p>
    </div>
  ),
  "Privacy Impact Assessment.pdf": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">DATA PROTECTION IMPACT ASSESSMENT</h1>
      <div className="flex justify-between mb-8 border-b border-gray-200 pb-4">
        <div>
          <p className="font-bold">Prepared by: Data Protection Office</p>
          <p>Meridian Financial Group, Inc.</p>
          <p>DPIA Ref. No. DPIA-2026-007</p>
        </div>
        <div className="text-right">
          <p><strong>Date:</strong> February 15, 2026</p>
          <p><strong>Subject:</strong> Cloudspan Vendor Data Transfer</p>
        </div>
      </div>

      <h3 className="font-bold mt-6 mb-2">1. SCOPE</h3>
      <p className="text-[15px] leading-relaxed mb-4">
        This Data Protection Impact Assessment ("DPIA") evaluates the processing of EU customer personal data by Cloudspan Inc., a U.S.-based cloud processor engaged by Meridian. It is conducted in accordance with the GDPR's requirement to assess high-risk processing operations before they commence.
      </p>

      <h3 className="font-bold mt-6 mb-2">2. PROCESSING DESCRIBED</h3>
      <p className="text-[15px] leading-relaxed mb-4">
        The proposed processing involves the transfer of customer contact details, account identifiers, and transaction metadata to Cloudspan for analytics services. The data originates from EEA data subjects and is transferred to servers located in the United States.
      </p>

      <h3 className="font-bold mt-6 mb-2">3. NECESSITY AND PROPORTIONALITY</h3>
      <p className="text-[15px] leading-relaxed mb-4">
        The Data Protection Office assessed whether the processing is necessary and proportionate to its purpose, applying the GDPR's data-minimization principle. The transfer relies on a restricted-transfer mechanism that must be documented before processing begins.
        <Citation 
           id="cit-e1"
           type="statute"
           source="GDPR Art. 35"
           title="Data protection impact assessment"
           snippet="Requires a controller to carry out an assessment of the impact of envisaged processing operations where processing is likely to result in a high risk to the rights of data subjects."
         />
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        The data categories were reviewed against the stated analytics purpose, and unnecessary fields were flagged for exclusion before any transfer proceeds.
      </p>

      <h3 className="font-bold mt-6 mb-2">4. RISK FINDINGS</h3>
      <h4 className="font-bold mt-2 mb-1 text-sm">A. Transfer Mechanism</h4>
      <p className="text-[15px] leading-relaxed mb-4">
        The GDPR requires an appropriate transfer mechanism for restricted transfers. The review identified the following deficiencies in the current arrangement:
      </p>
      <ul className="list-disc pl-10 mb-4 text-[15px]">
        <li>No executed Standard Contractual Clauses</li>
        <li>No completed transfer impact assessment</li>
        <li>Breach-notification window of 14 days</li>
      </ul>
      <p className="text-[15px] leading-relaxed mb-4">
        Each deficiency represents a material gap relative to the GDPR's Chapter V requirements and must be remediated before the transfer proceeds.
      </p>

      <h4 className="font-bold mt-2 mb-1 text-sm">B. Supplementary Measures</h4>
      <p className="text-[15px] leading-relaxed mb-4">
        Following Schrems II, the assessment evaluated whether supplementary measures are required to ensure an essentially equivalent level of protection. Strong encryption with exporter-held keys and contractual transparency commitments are recommended.
        <Citation 
           id="cit-e2"
           type="record"
           source="EDPB Recommendations 01/2020"
           title="Supplementary measures for transfer tools"
           snippet="Provides a framework for assessing and adopting supplementary measures where the destination country's protection is not essentially equivalent."
         />
      </p>

      <h3 className="font-bold mt-6 mb-2">5. CONCLUSION</h3>
      <p className="text-[15px] leading-relaxed mb-4">
        It is the assessment of the Data Protection Office that the proposed transfer presents a high residual risk in its current form due to the absence of executed safeguards. The transfer is materially non-compliant with the GDPR's transfer requirements.
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        The transfer should not proceed until Standard Contractual Clauses are executed, a transfer impact assessment is documented, and the breach-notification term is revised to meet GDPR timelines.
      </p>
    </div>
  ),
  "Data Inventory.xlsx": (
    <div className="flex flex-col h-full bg-white text-[#212223] text-sm font-sans">
      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <div className="inline-block min-w-full">
            {/* Column Headers */}
            <div className="flex sticky top-0 z-10 bg-[#F5F5F5] border-b border-[#E5E5E5]">
                <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5]"></div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Record ID</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Date</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Data Category</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">System</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Lawful Basis</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Description</div>
            </div>

            {/* Rows */}

            {[
                ['DATA-001', '2026-01-15', 'Customer Contact', 'CRM', 'Contract', 'EU customer names and email addresses'],
                ['DATA-002', '2026-02-10', 'Transaction Data', 'Core Banking', 'Legal Obligation', 'Payment records retained for AML purposes'],
                ['DATA-003', '2026-03-05', 'Account Identifiers', 'Analytics', 'Legitimate Interest', 'Pseudonymized identifiers shared with processor']
            ].map((row, idx) => (
                <div key={idx} className="flex border-b border-[#E5E5E5]">
                    <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center font-semibold text-gray-600">{idx + 1}</div>
                    {row.map((cell, cIdx) => (
                        <div key={cIdx} className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1 truncate hover:bg-blue-50 cursor-cell selection:bg-blue-100">
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
            
             {/* Empty Rows to fill space */}
            {Array.from({ length: 15 }).map((_, idx) => (
                <div key={`empty-${idx}`} className="flex border-b border-[#E5E5E5]">
                    <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center font-semibold text-gray-600">{idx + 4}</div>
                    {Array.from({ length: 6 }).map((_, cIdx) => (
                        <div key={cIdx} className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1 hover:bg-blue-50 cursor-cell"></div>
                    ))}
                </div>
            ))}
        </div>
      </div>
      
      {/* Footer Sheet Tabs */}
      <div className="bg-[#F5F5F5] border-t border-[#E5E5E5] px-1 flex gap-1 h-[32px] items-end">
          <div className="px-4 py-1 bg-white border-t border-x border-[#E5E5E5] text-sm font-medium rounded-t text-[#1D4B34] border-b border-white relative top-[1px]">Sheet1</div>
          <div className="px-4 py-1 hover:bg-[#E5E5E5] text-sm font-medium rounded-t text-gray-600 cursor-pointer">Sheet2</div>
          <div className="px-2 py-1 hover:bg-[#E5E5E5] text-sm font-medium rounded-t text-gray-600 cursor-pointer">+</div>
      </div>
    </div>
  ),
  "SEC Disclosure Rules.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">SEC Climate Disclosure Rules — Reference</h1>
      
      <h3 className="font-bold mt-4 mb-2">Item 1501. Governance</h3>
      <p className="mb-4 text-[15px] leading-relaxed">
        A registrant must describe:
        (1) the board of directors' oversight of climate-related risks, including any board committee responsible for such oversight;
        (2) management's role in assessing and managing the registrant's material climate-related risks; and
        (3) the processes by which the board and management are informed about and monitor climate-related risks.
      </p>

      <h3 className="font-bold mt-4 mb-2">Item 1502. Strategy, Risks, and Impacts</h3>
      <p className="mb-4 text-[15px] leading-relaxed">
        A registrant must disclose any climate-related risks that have had or are reasonably likely to have a material impact on its business, results of operations, or financial condition over the short, medium, and long term, and describe how it manages those risks.
      </p>

      <h3 className="font-bold mt-4 mb-2">Item 1505. Greenhouse Gas Emissions Metrics</h3>
      <p className="mb-4 text-[15px] leading-relaxed">
        Where required, a registrant must disclose its Scope 1 and Scope 2 greenhouse gas emissions, including:
        (1) the organizational boundaries used;
        (2) the methodology, significant inputs, and significant assumptions;
        (3) the emission factors applied; and
        (4) the level of assurance, if any, obtained with respect to the metrics.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed">
        Emissions should be presented in gross terms, and a registrant may not exclude emissions from investments or other interests solely to present a more favorable metric.
      </p>

      <h3 className="font-bold mt-4 mb-2">Item 1506. Assurance and Attestation</h3>
      <p className="mb-4 text-[15px] leading-relaxed">
        A registrant subject to the assurance requirements must:
        (1) obtain an attestation report covering its emissions disclosures at the prescribed level of assurance;
        (2) include the attestation report in the relevant filing; and
        (3) disclose information about the assurance provider, including whether it is subject to oversight and any related conflicts of interest. Phase-in periods apply based on filer status.
      </p>
    </div>
  ),
  "Memo on Disclosure Obligations.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34] text-center">MEMORANDUM</h1>
      <h2 className="text-md font-bold text-center mb-8 uppercase">Re: Meridian's Climate-Related Disclosure Obligations</h2>
      <h3 className="font-bold mt-4 mb-2">PRELIMINARY STATEMENT</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        This memorandum analyzes Meridian's disclosure obligations under the SEC climate disclosure rules and recommends revisions to the Company's draft 10-K disclosures.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        The rules require governance, strategy, and emissions disclosures. The Company's current draft adequately addresses strategy but should be strengthened with respect to governance specifics and the assurance status of its emissions metrics.
      </p>
      <h3 className="font-bold mt-4 mb-2">ANALYSIS</h3>
      <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">I. Governance Disclosure Must Identify the Responsible Committee</h4>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        The governance item requires the Company to identify the board committee responsible for overseeing climate-related risks and to describe management's role. The draft should be revised to name the Risk Committee and describe the quarterly reporting cadence.
        <Citation 
           id="cit-m1"
           type="statute"
           source="17 C.F.R. § 229.1501"
           title="Regulation S-K, Item 1501 (Governance)"
           snippet="Requires disclosure of the board's oversight of climate-related risks and management's role in assessing and managing such risks."
         />
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        The Company should describe how the Risk Committee receives and monitors climate-related information, including the frequency of management reporting and escalation to the full Board.
      </p>

      <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">II. Emissions Metrics Require Methodology and Assurance Disclosure</h4>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        Where the Company discloses Scope 1 and Scope 2 emissions, it must describe the organizational boundaries, methodology, emission factors, and assurance level. The draft should be expanded to include these elements and to confirm the operational control approach used.
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">CONCLUSION</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        For the foregoing reasons, we recommend revising the governance and emissions sections of the draft 10-K disclosures before filing.
      </p>
    </div>
  ),
  "Reply Brief.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34] text-center">PLAINTIFF'S REPLY BRIEF</h1>
      <h3 className="font-bold mt-4 mb-2">ARGUMENT</h3>
      <p className="mb-4 text-[15px] leading-relaxed">
        Defendant's opposition brief fails to address the core holding of <i>Smith v. Jones</i>, which establishes that the discovery rule applies to latent construction defects.
        <Citation 
           id="cit-r1"
           type="case"
           source="N.Y. Ct. App."
           title="Smith v. Jones Construction Co."
           snippet="Applying the discovery rule to latent defects in residential construction."
         />
      </p>
      <p className="mb-4 text-[15px] leading-relaxed">
        Defendant argues that the statute of limitations began to run when the concrete was poured. This is nonsensical. Plaintiff could not possibly have known of the defect until the foundation walls began to crack, months later.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed">
        Furthermore, Defendant's reliance on the "merger clause" in the contract is misplaced. A general merger clause does not bar a claim for fraudulent inducement where the fraud is extraneous to the contract.
        <Citation 
           id="cit-r2"
           type="case"
           source="N.Y. Ct. App."
           title="Sabo v. Delman"
           snippet="Held that a general merger clause does not bar a claim for fraud in the inducement."
         />
      </p>
      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">CONCLUSION</h3>
      <p className="mb-4 text-[15px] leading-relaxed">
        The Motion to Dismiss should be denied.
      </p>
    </div>
  ),
  "Smith Deposition.pdf": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">Deposition of John Smith</h1>
      <p className="font-mono text-sm mb-4">Date: August 14, 2024</p>
      <p className="font-mono text-sm mb-8">Case: Hernandez v. Pacific Builders Inc.</p>
      <div className="font-mono text-sm space-y-6">
         <div>
            <p><span className="font-bold">Q:</span> Please state your name for the record.</p>
            <p><span className="font-bold">A:</span> John Michael Smith.</p>
         </div>
         <div>
            <p><span className="font-bold">Q:</span> What is your current position at Pacific Builders?</p>
            <p><span className="font-bold">A:</span> Senior Project Manager.</p>
         </div>
         <div>
            <p><span className="font-bold">Q:</span> Were you the project manager for the Hernandez residence at 123 Main Street?</p>
            <p><span className="font-bold">A:</span> Yes, I was.</p>
         </div>
         <div>
            <p><span className="font-bold">Q:</span> Did you order the concrete for the foundation?</p>
            <p><span className="font-bold">A:</span> My assistant placed the order, but I approved it.</p>
         </div>
         <div>
            <p><span className="font-bold">Q:</span> Did you know at the time that the order was for Grade C concrete, not Grade A?</p>
            <p><span className="font-bold">A:</span> (Pause) I knew there were supply issues with Grade A. We had to keep the project moving.</p>
         </div>
         <div>
            <p><span className="font-bold">Q:</span> So you knowingly authorized the substitution?</p>
            <p><span className="font-bold">A:</span> I authorized the purchase of available materials. It was a business decision.</p>
         </div>
         <div>
             <p><span className="font-bold">Q:</span> Did you inform Ms. Hernandez of this substitution?</p>
             <p><span className="font-bold">A:</span> I don't recall specific conversations.</p>
         </div>
         <div>
             <p><span className="font-bold">Q:</span> Did you review the progress reports sent to Ms. Hernandez?</p>
             <p><span className="font-bold">A:</span> Yes.</p>
         </div>
         <div>
             <p><span className="font-bold">Q:</span> And those reports stated that Grade A concrete was used, correct?</p>
             <p><span className="font-bold">A:</span> That was the template language, yes.</p>
         </div>
      </div>
    </div>
  ),
  "Jones Deposition.pdf": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">Deposition of Sarah Jones</h1>
      <p className="font-mono text-sm mb-4">Date: August 15, 2024</p>
      <div className="font-mono text-sm space-y-6">
         <div>
             <p><span className="font-bold">Q:</span> What is your role at Pacific Builders?</p>
             <p><span className="font-bold">A:</span> I am the Chief Structural Engineer.</p>
         </div>
         <div>
             <p><span className="font-bold">Q:</span> Did you review the plans for the Hernandez foundation?</p>
             <p><span className="font-bold">A:</span> Yes.</p>
         </div>
         <div>
             <p><span className="font-bold">Q:</span> Would Grade C concrete be sufficient for those plans?</p>
             <p><span className="font-bold">A:</span> No. The load calculations assume 5,000 psi concrete.</p>
         </div>
         <div>
             <p><span className="font-bold">Q:</span> Why?</p>
             <p><span className="font-bold">A:</span> Because of the soil composition. It's clay-heavy. You need the extra strength to prevent shearing.</p>
         </div>
         <div>
             <p><span className="font-bold">Q:</span> Were you consulted about the substitution?</p>
             <p><span className="font-bold">A:</span> No. I found out when the cracks appeared.</p>
         </div>
      </div>
    </div>
  ),
  "Production Log.xlsx": (
    <div className="flex flex-col h-full bg-white text-[#212223] text-sm font-sans">
      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <div className="inline-block min-w-full">
            {/* Column Headers */}
            <div className="flex sticky top-0 z-10 bg-[#F5F5F5] border-b border-[#E5E5E5]">
                <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5]"></div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Vol</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Date</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Size</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Contents</div>
            </div>

            {/* Rows */}

            {[
                ['VOL-001', '2024-09-01', '4.2 GB', 'Email Archives (PST)'],
                ['VOL-002', '2024-09-15', '1.8 GB', 'PDF Drawings'],
                ['VOL-003', '2024-10-01', '0.5 GB', 'Financial Records']
            ].map((row, idx) => (
                <div key={idx} className="flex border-b border-[#E5E5E5]">
                    <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center font-semibold text-gray-600">{idx + 1}</div>
                    {row.map((cell, cIdx) => (
                        <div key={cIdx} className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1 truncate hover:bg-blue-50 cursor-cell selection:bg-blue-100">
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
            
             {/* Empty Rows to fill space */}
            {Array.from({ length: 15 }).map((_, idx) => (
                <div key={`empty-${idx}`} className="flex border-b border-[#E5E5E5]">
                    <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-center font-semibold text-gray-600">{idx + 4}</div>
                    {Array.from({ length: 4 }).map((_, cIdx) => (
                        <div key={cIdx} className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1 hover:bg-blue-50 cursor-cell"></div>
                    ))}
                </div>
            ))}
        </div>
      </div>
      
      {/* Footer Sheet Tabs */}
      <div className="bg-[#F5F5F5] border-t border-[#E5E5E5] px-1 flex gap-1 h-[32px] items-end">
          <div className="px-4 py-1 bg-white border-t border-x border-[#E5E5E5] text-sm font-medium rounded-t text-[#1D4B34] border-b border-white relative top-[1px]">Sheet1</div>
          <div className="px-4 py-1 hover:bg-[#E5E5E5] text-sm font-medium rounded-t text-gray-600 cursor-pointer">Sheet2</div>
          <div className="px-2 py-1 hover:bg-[#E5E5E5] text-sm font-medium rounded-t text-gray-600 cursor-pointer">+</div>
      </div>
    </div>
  ),
  "Batch 001.pst": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">Email Archive: Batch 001</h1>
      <div className="p-4 bg-gray-50 border border-gray-200 rounded mb-4">
        <p className="font-bold">Metadata</p>
        <p>Custodian: John Smith</p>
        <p>Date Range: Jan 2023 - Dec 2024</p>
        <p>Item Count: 1,402</p>
      </div>
      <p className="text-[15px]">This file is an Outlook Data File (.pst) containing email communications. Use the "Analyze document sets" tool to search and review contents.</p>
    </div>
  ),
  "Batch 002.pst": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">Email Archive: Batch 002</h1>
      <div className="p-4 bg-gray-50 border border-gray-200 rounded mb-4">
        <p className="font-bold">Metadata</p>
        <p>Custodian: Sarah Jones</p>
        <p>Date Range: Jan 2023 - Dec 2024</p>
        <p>Item Count: 850</p>
      </div>
      <p className="text-[15px]">This file is an Outlook Data File (.pst) containing email communications.</p>
    </div>
  ),
  "Motion to Dismiss Draft": (
     <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#1D4B34]">Motion to Dismiss - DRAFT</h1>
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-8 text-sm text-yellow-800">
        <strong>STATUS:</strong> Working Draft v.0.1<br/>
        <strong>LAST EDITED:</strong> Just now<br/>
        <strong>AUTHOR:</strong> CoCounsel AI
      </div>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">PRELIMINARY STATEMENT</h3>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Plaintiff Maria Hernandez ("Plaintiff") attempts to transform a simple breach of contract dispute into a tort action to recover punitive damages that are not available under New York contract law. Her negligence and fraudulent misrepresentation claims are duplicative of her breach of contract claim and are barred by the economic loss rule. Accordingly, Counts II and III of the Complaint must be dismissed as a matter of law.
       </p>
       
       <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">ARGUMENT</h3>
       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">I. The Economic Loss Rule Bars Plaintiff's Negligence Claim</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Under New York law, a plaintiff cannot recover in tort for purely economic losses resulting from a breach of contract. 
         <Citation 
           id="cit-d1"
           type="case"
           source="96 N.Y.2d 280 (2001)"
           title="532 Madison Ave. Gourmet Foods, Inc. v. Finlandia Ctr., Inc."
           snippet='Held that "a plaintiff cannot recover in tort for purely economic losses resulting from a breach of contract" absent personal injury or property damage.'
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Here, Plaintiff alleges only economic damages—specifically, the cost to repair the foundation—arising from Defendant's alleged failure to perform under the Contract. Because Plaintiff has not alleged any personal injury or damage to property other than the subject of the contract itself, her negligence claim (Count III) is barred.
       </p>

       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">II. The Fraudulent Misrepresentation Claim Is Duplicative of the Breach of Contract Claim</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         A fraud claim cannot stand where the only fraud alleged is that the defendant entered into a contract with no intention of performing it. 
         <Citation 
           id="cit-d2"
           type="case"
           source="2d Cir."
           title="Bridgestone/Firestone, Inc. v. Recovery Credit Servs., Inc."
           snippet="Established that a fraud claim cannot be maintained when the only fraud alleged is that the defendant entered into a contract with no intention of performing it."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Plaintiff's fraud allegations (Count II) are based on the same facts as her breach of contract claim: that Defendant used Grade C concrete instead of Grade A. This is a classic breach of performance, not a separate tort.
       </p>

       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         New York courts consistently dismiss fraud claims that are merely duplicative of breach of contract claims. To maintain a separate fraud claim, a plaintiff must allege: (1) a legal duty separate from the duty to perform under the contract; (2) a fraudulent misrepresentation collateral or extraneous to the contract; or (3) special damages that are caused by the misrepresentation and unrecoverable as contract damages.
         <Citation 
           id="cit-d3"
           type="case"
           source="S.D.N.Y."
           title="Telecom Int'l Am., Ltd. v. AT&T Corp."
           snippet="Held that a plaintiff must allege a legal duty separate from the duty to perform under the contract to maintain a fraud claim."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Plaintiff has failed to allege any of these elements.
       </p>
    </div>
  ),
  "New York Freedom of Speech": (
     <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
       <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">Research: NY Freedom of Speech</h1>
       <div className="bg-gray-50 border border-gray-200 p-4 mb-6 rounded">
         <p className="text-sm font-bold text-gray-700 uppercase mb-1">Source</p>
         <p className="text-[15px] font-serif">NY State Constitution, Article I, Section 8</p>
       </div>

       <h3 className="font-bold mt-4 mb-2">I. Constitutional Text</h3>
       <p className="mb-4 text-[15px] leading-relaxed">
         "Every citizen may freely speak, write and publish his or her sentiments on all subjects, being responsible for the abuse of that right; and no law shall be passed to restrain or abridge the liberty of speech or of the press."
       </p>

       <h3 className="font-bold mt-6 mb-2">II. Comparison with First Amendment</h3>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         While the First Amendment to the U.S. Constitution provides a floor for free speech protections, state constitutions may provide broader guarantees. The New York Court of Appeals has long recognized that Article I, Section 8 is "broader" than its federal counterpart.
         <Citation 
            id="cit-ny1"
            type="case"
            source="N.Y. Ct. App."
            title="Immuno AG. v. Moor-Jankowski"
            snippet="Noting that the state constitution's free speech provision is often interpreted more broadly than the First Amendment, particularly in libel cases."
          />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         This broader protection is particularly evident in cases involving:
       </p>
       <ul className="list-disc pl-5 mb-4 text-[15px] space-y-2">
         <li><strong>Defamation:</strong> New York requires a plaintiff to prove "gross irresponsibility" by a publisher, a standard that can be more protective of the press than the federal "actual malice" standard for public figures.</li>
         <li><strong>Prior Restraint:</strong> The state constitution has been interpreted to be even more hostile to prior restraints on speech than the First Amendment.
           <Citation 
              id="cit-ny2"
              type="case"
              source="N.Y. Ct. App."
              title="O'Neill v. Oakgrove Constr., Inc."
              snippet="Discussing the strong presumption against prior restraints under the New York Constitution."
            />
         </li>
       </ul>

       <h3 className="font-bold mt-6 mb-2">III. Speech on Private Property</h3>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Unlike the federal constitution, which generally does not apply to private actors, the New York Constitution has been interpreted in limited circumstances to protect speech on private property that functions as a public forum, such as large shopping malls. However, this "state action" doctrine is narrow.
         <Citation 
            id="cit-ny3"
            type="case"
            source="N.Y. Ct. App."
            title="SHAD Alliance v. Smith Haven Mall"
            snippet="Holding that the state constitution does not compel a private shopping mall owner to permit political leafleting."
          />
       </p>
     </div>
   ),
  "Memo for New York Freedom": (
     <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34] text-center">MEMORANDUM</h1>
       <div className="mb-8 border-b border-gray-300 pb-4">
         <div className="grid grid-cols-[80px_1fr] gap-y-2 text-[15px]">
           <span className="font-bold text-gray-600">TO:</span>
           <span>Senior Partner</span>
           
           <span className="font-bold text-gray-600">FROM:</span>
           <span>Associate</span>
           
           <span className="font-bold text-gray-600">DATE:</span>
           <span>October 20, 2024</span>
           
           <span className="font-bold text-gray-600">RE:</span>
           <span>Employee Political Speech and "Moonlighting" Protections in New York</span>
         </div>
       </div>

       <h3 className="font-bold mt-6 mb-2 text-sm uppercase tracking-wide">Question Presented</h3>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         To what extent does New York law protect a private sector employee from termination for engaging in political speech or activities outside of working hours?
       </p>

       <h3 className="font-bold mt-6 mb-2 text-sm uppercase tracking-wide">Brief Answer</h3>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         While the First Amendment and the New York Constitution generally do not restrain private employers, New York Labor Law § 201-d provides statutory protection. It prohibits employers from discriminating against employees for their "political activities" outside of working hours, off the employer's premises, and without use of the employer's equipment. However, this protection is limited to "running for public office, campaigning for a candidate... or participating in fund-raising activities." It does not necessarily cover general political speech or social media posts.
       </p>

       <h3 className="font-bold mt-6 mb-2 text-sm uppercase tracking-wide">Discussion</h3>
       <h4 className="font-bold mt-4 mb-2 text-[15px]">A. Constitutional Protections (or lack thereof)</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         It is axiomatic that constitutional free speech guarantees protect against government action, not private conduct. Therefore, a private employer is generally free to terminate an at-will employee for their speech, even if that speech is political in nature.
         <Citation 
            id="cit-mny1"
            type="case"
            source="N.Y. Sup. Ct."
            title="Novak v. The Sisters of the Heart of Mary"
            snippet="Reaffirming that private employers are not subject to the First Amendment's constraints."
          />
       </p>

       <h4 className="font-bold mt-4 mb-2 text-[15px]">B. New York Labor Law § 201-d</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Enacted to prevent employers from regulating the off-duty conduct of their workforce, Section 201-d makes it unlawful to discharge an employee because of their "political activities."
         <Citation 
            id="cit-mny2"
            type="statute"
            source="NY Labor Law § 201-d"
            title="Discrimination against engagement in certain activities"
            snippet="Prohibits discrimination based on political activities, legal use of consumable products, and legal recreational activities outside work hours."
          />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         The definition of "political activities" is specific: running for public office, campaigning for a candidate, or fundraising for a candidate or party. Courts have strictly construed this definition. For example, in <i>Cavanaugh v. Doherty</i>, the court held that an employee's argument with a supervisor about a political issue was not protected "political activity" under the statute.
       </p>

       <h4 className="font-bold mt-4 mb-2 text-[15px]">C. "Recreational Activities" Catch-All?</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Plaintiffs have attempted to argue that political speech falls under the statute's protection for "legal recreational activities." However, the Court of Appeals in <i>Hudson v. Goldman Sachs</i> rejected an expansive reading of this term, limiting it to leisure activities like sports or hobbies.
         <Citation 
            id="cit-mny3"
            type="case"
            source="N.Y. Ct. App."
            title="Hudson v. Goldman Sachs"
            snippet="Narrowly construing 'recreational activities' under § 201-d."
          />
       </p>

       <h3 className="font-bold mt-6 mb-2 text-sm uppercase tracking-wide">Conclusion</h3>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Unless the employee's conduct fits squarely within the narrow definition of "political activities" (campaigning/fundraising), New York law offers little protection against termination for off-duty political speech.
       </p>
    </div>
  ),
};
