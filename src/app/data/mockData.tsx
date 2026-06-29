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
  "Motion to Dismiss - Personal Jurisdiction": PersonalJurisdictionMotion,
  "Motion to Dismiss": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-2xl font-bold mb-6 text-center">UNITED STATES DISTRICT COURT<br/>SOUTHERN DISTRICT OF NEW YORK</h1>
      <div className="flex justify-between mb-12 text-sm border-b-2 border-black pb-8">
        <div className="w-1/2 border-r-2 border-black pr-4">
          <p className="font-bold">MARIA HERNANDEZ,</p>
          <p className="ml-8 italic">Plaintiff,</p>
          <p className="my-4 text-center">- against -</p>
          <p className="font-bold">PACIFIC BUILDERS INC., a Delaware Corporation,</p>
          <p className="ml-8 italic">Defendant.</p>
        </div>
        <div className="w-1/2 pl-4 flex flex-col justify-center">
          <p>Civil Action No. 24-cv-01234</p>
          <p className="font-bold mt-4 text-lg">DEFENDANT'S NOTICE OF MOTION AND MOTION TO DISMISS COMPLAINT</p>
          <p className="mt-2 font-bold">ORAL ARGUMENT REQUESTED</p>
        </div>
      </div>
      
      <p className="mb-6 text-[15px] leading-relaxed text-justify">
        PLEASE TAKE NOTICE that upon the accompanying Memorandum of Law, the Declaration of John Smith, and all prior pleadings and proceedings herein, Defendant Pacific Builders Inc. ("Defendant") will move this Court, before the Honorable Judge [Name], at the United States Courthouse, 500 Pearl Street, New York, New York, for an order dismissing the Complaint pursuant to Federal Rule of Civil Procedure 12(b)(6) for failure to state a claim upon which relief can be granted.
      </p>

       <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">PRELIMINARY STATEMENT</h3>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Plaintiff Maria Hernandez ("Plaintiff") attempts to transform a simple breach of contract dispute into a tort action to recover punitive damages that are not available under New York contract law. Her negligence and fraudulent misrepresentation claims are duplicative of her breach of contract claim and are barred by the economic loss rule. Accordingly, Counts II and III of the Complaint must be dismissed as a matter of law.
       </p>
       
       <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">ARGUMENT</h3>
       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">I. The Economic Loss Rule Bars Plaintiff's Negligence Claim</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Under New York law, a plaintiff cannot recover in tort for purely economic losses resulting from a breach of contract. This well-established principle prevents contract disputes from morphing into tort litigation.
         <Citation 
           id="cit-1"
           type="case"
           source="N.Y. Ct. App."
           title="532 Madison Ave. Gourmet Foods, Inc. v. Finlandia Ctr., Inc."
           snippet='Held that "a plaintiff cannot recover in tort for purely economic losses resulting from a breach of contract" absent personal injury or property damage.'
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Here, Plaintiff alleges only economic damages—specifically, the cost to repair the foundation—arising from Defendant's alleged failure to perform under the Contract. Because Plaintiff has not alleged any personal injury or damage to property other than the subject of the contract itself, her negligence claim (Count III) is barred. The damages sought are identical to those recoverable under a breach of contract theory.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         The purpose of the economic loss rule is to keep contract law and tort law separate. As the Second Circuit has explained, allowing tort recovery for economic loss would "blur the distinct lines between contract and tort." 
         <Citation 
           id="cit-2"
           type="case"
           source="2d Cir."
           title="Bellevue South Assocs. v. HRH Constr. Corp."
           snippet='Reaffirming that the economic loss rule prevents recovery in tort for economic damages resulting from a breach of contract.'
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
          Plaintiff's remedy, if any, lies in contract, not tort. She cannot circumvent the limitations of contract law—such as the bar on punitive damages—by simply relabeling her claim as "negligence."
       </p>

       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">II. The Fraudulent Misrepresentation Claim Is Duplicative of the Breach of Contract Claim</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         A fraud claim cannot stand where the only fraud alleged is that the defendant entered into a contract with no intention of performing it. This is a fundamental tenet of New York commercial litigation.
         <Citation 
           id="cit-3"
           type="case"
           source="2d Cir."
           title="Bridgestone/Firestone, Inc. v. Recovery Credit Servs., Inc."
           snippet="Established that a fraud claim cannot be maintained when the only fraud alleged is that the defendant entered into a contract with no intention of performing it."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Plaintiff's fraud allegations (Count II) are based on the same facts as her breach of contract claim: that Defendant used Grade C concrete instead of Grade A. This is a classic breach of performance, not a separate tort. The alleged misrepresentation is simply the failure to perform the contract specifications.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         New York courts consistently dismiss fraud claims that are merely duplicative of breach of contract claims. To maintain a separate fraud claim, a plaintiff must allege: (1) a legal duty separate from the duty to perform under the contract; (2) a fraudulent misrepresentation collateral or extraneous to the contract; or (3) special damages that are caused by the misrepresentation and unrecoverable as contract damages.
         <Citation 
           id="cit-4"
           type="case"
           source="S.D.N.Y."
           title="Telecom Int'l Am., Ltd. v. AT&T Corp."
           snippet="Held that a plaintiff must allege a legal duty separate from the duty to perform under the contract to maintain a fraud claim."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Plaintiff has failed to allege any of these elements. She does not claim any damages distinct from the cost of replacing the concrete.
       </p>

       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">III. Plaintiff Fails to Plead Fraud with Particularity Under Rule 9(b)</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Even if the fraud claim were not duplicative, it fails to meet the heightened pleading standard of Federal Rule of Civil Procedure 9(b). Rule 9(b) requires a party alleging fraud to "state with particularity the circumstances constituting fraud or mistake." 
         <Citation 
           id="cit-5"
           type="statute"
           source="FRCP"
           title="Federal Rule of Civil Procedure 9(b)"
           snippet='Requires a party alleging fraud to "state with particularity the circumstances constituting fraud or mistake."'
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         This means the plaintiff must (1) specify the statements that the plaintiff contends were fraudulent, (2) identify the speaker, (3) state where and when the statements were made, and (4) explain why the statements were fraudulent. 
         <Citation 
           id="cit-6"
           type="case"
           source="2d Cir."
           title="Mills v. Polar Molecular Corp."
           snippet="Clarified the requirements for pleading fraud with particularity under Rule 9(b)."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Plaintiff's Complaint contains only vague and conclusory allegations that Defendant "concealed" the substitution of materials. She fails to identify who made the alleged misrepresentations, when they were made, or the specific content of any false statement. Such generalized allegations are insufficient to survive a motion to dismiss. Without specific details, Defendant cannot adequately prepare a defense.
       </p>

       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">IV. The Negligent Misrepresentation Claim Fails for Lack of a Special Relationship</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         To state a claim for negligent misrepresentation, a plaintiff must demonstrate the existence of a special or privity-like relationship imposing a duty on the defendant to impart correct information. 
         <Citation 
           id="cit-7"
           type="case"
           source="N.Y. Ct. App."
           title="J.A.O. Acquisition Corp. v. Stavitsky"
           snippet="Held that a negligent misrepresentation claim requires a special or privity-like relationship imposing a duty on the defendant to impart correct information."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         An arm's-length business relationship between a contractor and a property owner does not give rise to such a special relationship. The parties here are sophisticated entities who negotiated a contract.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Here, the relationship between Plaintiff and Defendant is defined solely by the Contract. There are no allegations suggesting a unique degree of trust or confidence that would elevate this commercial transaction into a fiduciary or special relationship. Without this element, the negligent misrepresentation claim must be dismissed.
       </p>
       
       <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">V. Plaintiff's Claim for Punitive Damages Must Be Stricken</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Punitive damages are generally not available in breach of contract actions in New York. To recover punitive damages, a plaintiff must establish that the defendant's conduct was actionable as an independent tort, was egregious in nature, was directed at the plaintiff, and was part of a pattern directed at the public generally.
         <Citation 
           id="cit-8"
           type="case"
           source="N.Y. Ct. App."
           title="Rocanova v. Equitable Life Assur. Soc'y"
           snippet="Established the four-part test for punitive damages in contract actions."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         Plaintiff has not alleged any conduct directed at the public generally. At most, this is a private dispute between two parties. There is no public interest involved that would justify the imposition of punitive damages. Therefore, the request for punitive damages should be stricken from the Complaint.
       </p>

       <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">CONCLUSION</h3>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         For the foregoing reasons, Defendant respectfully requests that the Court grant this Motion to Dismiss Counts II and III of the Complaint with prejudice and strike the demand for punitive damages.
       </p>
    </div>
  ),
  "Complaint.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-2xl font-bold mb-6 text-center">UNITED STATES DISTRICT COURT<br/>SOUTHERN DISTRICT OF NEW YORK</h1>
      <div className="flex justify-between mb-12 text-sm border-b-2 border-black pb-8">
        <div className="w-1/2 border-r-2 border-black pr-4">
          <p className="font-bold">MARIA HERNANDEZ,</p>
          <p className="ml-8 italic">Plaintiff,</p>
          <p className="my-4 text-center">- against -</p>
          <p className="font-bold">PACIFIC BUILDERS INC., a Delaware Corporation,</p>
          <p className="ml-8 italic">Defendant.</p>
        </div>
        <div className="w-1/2 pl-4 flex flex-col justify-center">
          <p>Civil Action No. 24-cv-01234</p>
          <p className="font-bold mt-4 text-lg">COMPLAINT</p>
          <p className="mt-2 font-bold">JURY TRIAL DEMANDED</p>
        </div>
      </div>
      
      <p className="mb-6 text-[15px] leading-relaxed text-justify">
        Plaintiff Maria Hernandez ("Plaintiff"), by and through her undersigned counsel, complaining of Defendant Pacific Builders Inc. ("Defendant"), hereby alleges as follows:
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">I. NATURE OF THE ACTION</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        1. This is a civil action seeking monetary damages, specific performance, and other relief arising out of Defendant's breach of contract, professional negligence, and fraudulent misrepresentation in connection with a major residential construction project located at 123 Main Street, New York, New York (the "Property"). Defendant, holding itself out as a premier luxury home builder, engaged in a systematic pattern of deception to substitute inferior building materials for the high-grade specifications required by the architectural plans and the construction agreement.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        2. As detailed herein, Defendant—a licensed general contractor—agreed to construct a custom single-family home for Plaintiff using specific high-grade materials. Instead, Defendant surreptitiously substituted inferior materials, failed to adhere to architectural plans, and repeatedly delayed the project without cause, resulting in significant structural defects and financial loss to Plaintiff. The substitution of "Grade C" concrete for the specified "Grade A" reinforced concrete has compromised the structural integrity of the foundation, rendering the home unsafe for occupancy.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        3. Plaintiff brings this action to recover the costs of remediation, which are estimated to exceed $1.5 million, as well as punitive damages for Defendant's willful and deceptive conduct. The conduct alleged herein was not merely a breach of contract but a fraudulent scheme to defraud Plaintiff and potentially other homeowners.
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">II. THE PARTIES</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        4. Plaintiff Maria Hernandez is an individual residing in the County of New York, State of New York. Plaintiff is the owner of the Property.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        5. Defendant Pacific Builders Inc. is a corporation organized and existing under the laws of the State of Delaware, with its principal place of business located at 450 Lexington Avenue, New York, NY. At all relevant times, Defendant conducted business as a general contractor in the State of New York.
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">III. JURISDICTION AND VENUE</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        6. This Court has subject matter jurisdiction over this action pursuant to 28 U.S.C. § 1332(a) because there is complete diversity of citizenship between the parties and the amount in controversy exceeds the sum or value of $75,000, exclusive of interest and costs.
        <Citation 
           id="cit-c1"
           type="statute"
           source="28 U.S.C. § 1332"
           title="Diversity of Citizenship"
           snippet="The district courts shall have original jurisdiction of all civil actions where the matter in controversy exceeds the sum or value of $75,000... and is between citizens of different States."
         />
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        7. Venue is proper in this District pursuant to 28 U.S.C. § 1391(b)(2) because a substantial part of the events or omissions giving rise to the claim occurred in this District, and the Property that is the subject of the action is situated in this District.
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">IV. FACTUAL ALLEGATIONS</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        8. On or about January 15, 2023, Plaintiff and Defendant entered into a written construction agreement (the "Contract") wherein Defendant agreed to build a 3,500 square foot residence on the Property for a fixed price of $2,500,000.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        9. The Contract explicitly required the use of "Grade A" reinforced concrete for the foundation and structural pillars, as specified by Plaintiff's architect. The use of this specific material was a material term of the Contract due to the specific soil conditions at the Property. Specifically, Section 4.2 of the Contract states: "All foundation work shall be performed using 5,000 PSI reinforced concrete ('Grade A') mixed with a water-reducer admixture."
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        10. Work commenced on March 1, 2023. From the outset, the project was plagued by delays. Defendant failed to staff the site adequately and frequently left the site dormant for weeks at a time.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        11. Upon information and belief, on or about May 10, 2023, Defendant's project manager, John Smith, authorized the substitution of "Grade C" concrete—a cheaper and weaker alternative—for the foundation pour, without notifying Plaintiff or obtaining approval from the architect. This decision was motivated solely by Defendant's desire to increase its profit margin at the expense of safety and quality.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        12. This substitution was concealed from Plaintiff. Defendant submitted progress reports falsely stating that "Grade A" concrete had been procured and installed. Defendant invoiced Plaintiff for the higher cost of Grade A concrete, which Plaintiff paid in full.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        13. On August 20, 2023, Plaintiff discovered significant cracking in the foundation walls. An independent engineering inspection revealed the use of inferior concrete and demonstrated that the foundation does not meet the load-bearing requirements for the structure. The core samples tested at 3,200 PSI, far below the required 5,000 PSI.
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">V. CAUSES OF ACTION</h3>
      
      <h4 className="font-bold mt-6 mb-2 uppercase text-sm tracking-wide">Count I: Breach of Contract</h4>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        14. Plaintiff repeats and realleges the allegations contained in paragraphs 1 through 13 as if fully set forth herein.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        15. The Contract is a valid and binding agreement between Plaintiff and Defendant. Plaintiff has performed all conditions precedent to the Defendant's performance under the Contract.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        16. Plaintiff has fully performed all of her obligations under the Contract, including the timely payment of all invoices.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        17. Defendant breached the Contract by, among other things:
      </p>
      <ul className="list-disc pl-10 mb-4 space-y-2 text-[15px]">
        <li>Failing to complete the project by the agreed-upon completion date;</li>
        <li>Using materials that did not meet the specifications set forth in the Contract;</li>
        <li>Failing to perform work in a workmanlike manner; and</li>
        <li>Failing to adhere to applicable building codes and regulations.</li>
      </ul>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        18. As a direct and proximate result of Defendant's breach, Plaintiff has suffered damages in an amount to be determined at trial, but estimated to exceed $1,000,000. These damages include the cost of removing the defective foundation, shoring up the existing structure, and pouring a new foundation.
      </p>

      <h4 className="font-bold mt-6 mb-2 uppercase text-sm tracking-wide">Count II: Fraudulent Misrepresentation</h4>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        19. Plaintiff repeats and realleges the allegations contained in paragraphs 1 through 18 as if fully set forth herein.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        20. Defendant made material misrepresentations of fact to Plaintiff regarding the quality of materials used in the construction of the home. Specifically, Defendant represented in written invoices and progress reports that it had purchased and installed "Grade A" concrete.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        21. Defendant knew these representations were false at the time they were made. Defendant's project manager explicitly authorized the substitution of inferior materials.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        22. Defendant made these misrepresentations with the intent to induce Plaintiff to rely on them and to continue making payments under the Contract.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        23. Plaintiff justifiably relied on Defendant's misrepresentations. Plaintiff is not a construction professional and relied on the expertise and honesty of her licensed contractor.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        24. As a result of this reliance, Plaintiff has suffered damages.
      </p>

       <h4 className="font-bold mt-6 mb-2 uppercase text-sm tracking-wide">Count III: Negligence</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         25. Plaintiff repeats and realleges the allegations contained in paragraphs 1 through 24 as if fully set forth herein.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         26. Defendant, as a licensed general contractor, owed a duty of care to Plaintiff to perform construction services with the degree of skill and care reasonably expected of a competent contractor. This duty exists independent of the contract.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         27. Defendant breached this duty by failing to properly supervise the foundation pour, failing to test the materials used, and failing to construct the residence in accordance with industry standards.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         28. As a direct and proximate result of Defendant's negligence, Plaintiff has suffered significant property damage and financial loss.
       </p>

       <h4 className="font-bold mt-6 mb-2 uppercase text-sm tracking-wide">Count IV: Unjust Enrichment</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         29. Plaintiff repeats and realleges the allegations contained in paragraphs 1 through 28 as if fully set forth herein.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         30. Plaintiff conferred a benefit on Defendant by paying the full contract price, including the premium cost for "Grade A" concrete.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         31. Defendant accepted and retained this benefit while providing inferior "Grade C" concrete.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         32. It would be inequitable and unjust for Defendant to retain the benefit of these payments without compensating Plaintiff for the value of the materials actually received.
       </p>

       <h4 className="font-bold mt-6 mb-2 uppercase text-sm tracking-wide">Count V: Violation of GBL § 349</h4>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         33. Plaintiff repeats and realleges the allegations contained in paragraphs 1 through 32.
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         34. Defendant's deceptive practices in misrepresenting the quality of building materials constitute "deceptive acts or practices in the conduct of any business, trade or commerce" in violation of New York General Business Law § 349.
         <Citation 
           id="cit-c2"
           type="statute"
           source="N.Y. Gen. Bus. Law § 349"
           title="Deceptive Acts and Practices"
           snippet="Deceptive acts or practices in the conduct of any business, trade or commerce or in the furnishing of any service in this state are hereby declared unlawful."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         35. As a result of Defendant's violation of GBL § 349, Plaintiff is entitled to actual damages and attorney's fees.
       </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">PRAYER FOR RELIEF</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        WHEREFORE, Plaintiff Maria Hernandez respectfully requests that this Court enter judgment in her favor and against Defendant Pacific Builders Inc. as follows:
      </p>
      <ol className="list-decimal pl-10 mb-8 space-y-2 text-[15px]">
        <li>Awarding Plaintiff compensatory damages in an amount to be proven at trial;</li>
        <li>Awarding Plaintiff punitive damages for Defendant's fraudulent conduct;</li>
        <li>Awarding Plaintiff pre-judgment and post-judgment interest;</li>
        <li>Awarding Plaintiff her reasonable attorneys' fees and costs;</li>
        <li>Awarding treble damages pursuant to GBL § 349(h); and</li>
        <li>Granting such other and further relief as the Court deems just and proper.</li>
      </ol>
      
      <div className="mt-16 mb-8">
        <p className="mb-2">Dated: New York, New York<br/>October 1, 2024</p>
        <div className="mt-8 w-64 border-t border-black pt-2">
          <p className="font-bold">By: ______________________</p>
          <p>Robert L. Counsel</p>
          <p>Counsel & Associates LLP</p>
          <p>123 Legal Avenue</p>
          <p>New York, NY 10001</p>
          <p>(212) 555-0123</p>
          <p>Attorneys for Plaintiff</p>
        </div>
      </div>
    </div>
  ),
  "Strategy.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <div className="flex justify-between items-start mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1D4B34]">CASE STRATEGY MEMORANDUM</h1>
          <p className="text-gray-500 mt-1">Hernandez v. Pacific Builders Inc.</p>
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
        Our primary objective in this litigation is to secure a favorable settlement that covers the cost of remediation ($1.5M) plus legal fees. We have a strong case for breach of contract and fraud given the documented substitution of materials. However, we must be prepared for Defendant to argue "Force Majeure" or supply chain impossibility.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        The discovery phase will be critical. We need to uncover internal communications at Pacific Builders that prove they knowingly substituted the concrete to cut costs, rather than due to unavailability. We have already identified several potential witnesses who may have knowledge of the decision-making process.
      </p>

      <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">II. PROCEDURAL POSTURE</h2>
      <ul className="list-disc pl-5 space-y-2 text-[15px] mb-4">
        <li><strong>Complaint Filed:</strong> October 1, 2024</li>
        <li><strong>Service Effectuated:</strong> October 3, 2024</li>
        <li><strong>Answer Deadline:</strong> October 24, 2024</li>
        <li><strong>Rule 26(f) Conference:</strong> Anticipated mid-November 2024</li>
        <li><strong>Initial Disclosures:</strong> Due 14 days after Rule 26(f) conference</li>
      </ul>

      <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">III. KEY LEGAL ARGUMENTS</h2>
      
      <h3 className="font-bold text-md mb-2">A. Breach of Contract</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        The contract is unambiguous regarding the specifications of the concrete ("Grade A"). Pacific Builders' admission in the site foreman's log (if we can obtain it) that they used "Grade C" will be dispositive on the issue of breach.
        <Citation 
           id="cit-s1"
           type="case"
           source="N.Y. Ct. App."
           title="W.W.W. Assocs., Inc. v. Giancontieri"
           snippet="Held that when parties set down their agreement in a clear, complete document, their writing should be enforced according to its terms."
         />
      </p>
      
      <h3 className="font-bold text-md mb-2">B. Fraudulent Inducement / Misrepresentation</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        To prove fraud, we must show intent. The "smoking gun" would be an email from the Project Manager (John Smith) instructing the team to hide the substitution. We will target his communications in our first set of document requests.
        <Citation 
           id="cit-s2"
           type="case"
           source="N.Y. Ct. App."
           title="Lama Holding Co. v. Smith Barney Inc."
           snippet="Established the elements of fraud: misrepresentation, falsity, scienter, reliance, and injury."
         />
      </p>

      <h3 className="font-bold text-md mb-2">C. Anticipated Defenses</h3>
      <ul className="list-disc pl-5 space-y-2 text-[15px] mb-4">
        <li><strong>Force Majeure:</strong> Defendant may claim supply chain issues made Grade A concrete unavailable. We have already contacted three other suppliers in the region who confirmed they had ample stock during the relevant period.</li>
        <li><strong>Waiver:</strong> Defendant may argue Plaintiff waived the defect by paying invoices. We will counter that Plaintiff had no knowledge of the defect at the time of payment.
          <Citation 
             id="cit-s3"
             type="case"
             source="N.Y. Ct. App."
             title="Gilbert Frank Corp. v. Fed. Ins. Co."
             snippet="Held that waiver is an intentional relinquishment of a known right and should not be lightly presumed."
           />
        </li>
      </ul>

      <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">IV. DISCOVERY PLAN</h2>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        We will serve the following requests immediately after the Rule 26(f) conference:
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-[15px] mb-4">
        <li><strong>Interrogatories:</strong> Identify all suppliers used, all individuals with knowledge of the foundation pour, and the dates of decision-making regarding material procurement.</li>
        <li><strong>Requests for Production:</strong> All internal emails regarding "concrete", "foundation", "substitution", or "Hernandez project"; all invoices from suppliers; site logs and daily reports.</li>
        <li><strong>Depositions:</strong> John Smith (Project Manager), Site Foreman, and the Chief Financial Officer (to establish motive/profitability pressure).</li>
        <li><strong>Third-Party Subpoenas:</strong> Subpoenas to the concrete supplier to verify what was ordered versus what was delivered.</li>
      </ol>

      <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">V. SETTLEMENT & BUDGET</h2>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        <strong>Estimated Budget to Trial:</strong> $250,000 - $300,000. This includes expert witness fees for structural engineers and potential forensic accounting.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        <strong>Settlement Target:</strong> We should open with a demand of $2.5M (remediation + punitive/consequential damages) and be prepared to settle in the $1.8M range. This avoids the risk of trial and gets the client the funds needed to fix the house sooner.
      </p>

       <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">VI. RISK ANALYSIS</h2>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         <strong>High Risk:</strong> The "Economic Loss Rule" could bar our negligence claim, limiting recovery to contract damages (no punitive damages). We must emphasize the independent fraudulent conduct to survive a Motion to Dismiss.
         <Citation 
           id="cit-s4"
           type="case"
           source="N.Y. Ct. App."
           title="New York Univ. v. Cont'l Ins. Co."
           snippet="Discussing the economic loss rule and the need for a separate legal duty independent of the contract."
         />
       </p>
       <p className="mb-4 text-[15px] leading-relaxed text-justify">
         <strong>Medium Risk:</strong> Defendant may attempt to shift blame to the architect or other subcontractors. We need to lock in their testimony early that they followed the plans provided by Pacific Builders.
       </p>

       <h2 className="text-lg font-bold text-[#1D4B34] border-b border-gray-200 pb-2 mb-4 mt-8">VII. NEXT STEPS</h2>
       <ol className="list-decimal pl-5 space-y-2 text-[15px] mb-4">
         <li>Finalize and file the Amended Complaint if necessary.</li>
         <li>Prepare Initial Disclosures.</li>
         <li>Draft First Set of Interrogatories and Document Requests.</li>
         <li>Schedule strategy call with Client to discuss settlement parameters.</li>
       </ol>
    </div>
  ),
  "Discovery overview": () => <DiscoveryOverviewSpreadsheet />,
  "Amended Complaint.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">Amended Complaint</h1>
      <p className="text-[15px] leading-relaxed mb-4">
        Plaintiff Maria Hernandez, by and through her undersigned counsel, as and for her Amended Complaint, alleges as follows:
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        1. This Amended Complaint is filed pursuant to Rule 15(a)(1)(B) of the Federal Rules of Civil Procedure.
      </p>
      <h3 className="font-bold mt-6 mb-2">ADDITIONAL ALLEGATIONS</h3>
      <p className="text-[15px] leading-relaxed mb-4">
        25. Since the filing of the original Complaint, Plaintiff has learned that Defendant's fraudulent conduct extended beyond the substitution of concrete.
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        26. Specifically, Defendant also failed to install the specified copper piping, substituting it with PEX plastic piping in violation of the Contract.
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        27. This additional breach was discovered on October 15, 2024, when a wall was opened to inspect electrical wiring.
      </p>
      {/* Expanded content placeholder to imply length */}
      <div className="space-y-4 text-gray-400 mt-8">
        <p>[... Paragraphs 28-50 detailing additional defects ...]</p>
        <p>[... Expanded Causes of Action including Count III: Unjust Enrichment ...]</p>
      </div>
    </div>
  ),
  "Motion to Dismiss.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34] text-center">DEFENDANT'S MOTION TO DISMISS</h1>
      <p className="text-[15px] leading-relaxed mb-6">
        Defendant Pacific Builders Inc. respectfully moves this Court to dismiss Plaintiff's Complaint pursuant to Fed. R. Civ. P. 12(b)(6) for failure to state a claim upon which relief can be granted.
      </p>
      <h3 className="font-bold mt-6 mb-2">I. ARGUMENT</h3>
      <h4 className="font-bold mt-4 mb-2 text-sm uppercase">A. The Fraud Claim is Duplicative of the Breach of Contract Claim</h4>
      <p className="text-[15px] leading-relaxed mb-4">
        Under New York law, a fraud claim that arises from the same facts as a breach of contract claim is redundant and must be dismissed. See <i>Bridgestone/Firestone, Inc. v. Recovery Credit Servs., Inc.</i>, 98 F.3d 13, 20 (2d Cir. 1996).
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        Here, Plaintiff's allegations of fraud are based entirely on Defendant's alleged failure to perform under the Contract—specifically, the failure to use Grade A concrete. There is no separate legal duty owed by Defendant to Plaintiff independent of the Contract.
      </p>
      <h4 className="font-bold mt-4 mb-2 text-sm uppercase">B. Plaintiff Fails to Plead Fraud with Particularity</h4>
      <p className="text-[15px] leading-relaxed mb-4">
        Rule 9(b) requires that fraud be pled with particularity. Plaintiff's Complaint fails to identify the specific individual who made the alleged misrepresentations, or the time and place of such statements.
      </p>
    </div>
  ),
  "Expert Witness Report.pdf": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">EXPERT WITNESS REPORT</h1>
      <div className="flex justify-between mb-8 border-b border-gray-200 pb-4">
        <div>
          <p className="font-bold">Prepared by: Dr. Alan Grant, P.E.</p>
          <p>Grant Structural Engineers, LLC</p>
          <p>License No. 12345-NY</p>
        </div>
        <div className="text-right">
          <p><strong>Date:</strong> September 15, 2024</p>
          <p><strong>Subject:</strong> 123 Main St. Foundation Analysis</p>
        </div>
      </div>

      <h3 className="font-bold mt-6 mb-2">1. QUALIFICATIONS</h3>
      <p className="text-[15px] leading-relaxed mb-4">
        I am a licensed Professional Engineer in the State of New York with over 30 years of experience in structural engineering and materials science. I hold a Ph.D. in Civil Engineering from MIT. My specialization is in concrete failure analysis and forensic engineering. I have testified as an expert witness in over 50 cases involving structural defects.
      </p>

      <h3 className="font-bold mt-6 mb-2">2. ASSIGNMENT</h3>
      <p className="text-[15px] leading-relaxed mb-4">
        I was retained by Plaintiff Maria Hernandez to inspect the foundation of the residence located at 123 Main Street, New York, NY, and to determine the cause of the cracking observed on the basement walls. I was also asked to determine whether the materials used complied with the construction contract and architectural specifications.
      </p>

      <h3 className="font-bold mt-6 mb-2">3. METHODOLOGY</h3>
      <p className="text-[15px] leading-relaxed mb-4">
        On September 1, 2024, I visited the Property to inspect the foundation. I observed extensive vertical and diagonal cracking on the North and East walls. To determine the material properties, I extracted three core samples (4-inch diameter) from the foundation walls in accordance with ASTM C42.
        <Citation 
           id="cit-e1"
           type="record"
           source="ASTM C42"
           title="Standard Test Method for Obtaining and Testing Drilled Cores and Sawed Beams of Concrete"
           snippet="Provides standardized procedures for obtaining and testing concrete core samples to determine compressive strength."
         />
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        These samples were labeled "Core A" (North Wall), "Core B" (East Wall), and "Core C" (West Wall). They were transported to my certified laboratory for compressive strength testing (ASTM C39) and petrographic analysis (ASTM C856).
      </p>

      <h3 className="font-bold mt-6 mb-2">4. FINDINGS</h3>
      <h4 className="font-bold mt-2 mb-1 text-sm">A. Compressive Strength</h4>
      <p className="text-[15px] leading-relaxed mb-4">
        The contract specifications and architectural plans called for concrete with a minimum compressive strength of 5,000 psi at 28 days ("Grade A"). The results of the compressive strength tests were as follows:
      </p>
      <ul className="list-disc pl-10 mb-4 text-[15px]">
        <li>Core A: 3,150 psi</li>
        <li>Core B: 3,220 psi</li>
        <li>Core C: 3,180 psi</li>
      </ul>
      <p className="text-[15px] leading-relaxed mb-4">
        The average compressive strength is approximately 3,183 psi. This is consistent with "Grade C" concrete (typically 3,000 psi) and is 36% lower than the specified strength. This discrepancy is a material deviation from the design requirements.
      </p>

      <h4 className="font-bold mt-2 mb-1 text-sm">B. Petrographic Analysis</h4>
      <p className="text-[15px] leading-relaxed mb-4">
        Petrographic analysis reveals a water-to-cement ratio of approximately 0.65, significantly higher than the maximum 0.45 allowed for high-strength foundations. This high ratio results in increased porosity and reduced durability. I also observed a lack of the specified water-reducing admixture.
        <Citation 
           id="cit-e2"
           type="record"
           source="Lab Report #8842"
           title="Petrographic Analysis of Concrete Samples"
           snippet="Detailed microscopic analysis confirming high water-cement ratio and absence of admixtures."
         />
      </p>

      <h3 className="font-bold mt-6 mb-2">5. CONCLUSION</h3>
      <p className="text-[15px] leading-relaxed mb-4">
        It is my professional opinion, to a reasonable degree of engineering certainty, that the concrete used in the foundation is materially non-compliant with the design specifications. The use of 3,000 psi concrete instead of the specified 5,000 psi concrete has compromised the structural integrity of the home. The observed cracking is a direct result of the foundation's inability to support the design loads.
      </p>
      <p className="text-[15px] leading-relaxed mb-4">
        The foundation is not safe for long-term occupancy. Immediate remediation is required, which will likely involve shoring the house and replacing the foundation walls.
      </p>
    </div>
  ),
  "Privilege Log.xlsx": (
    <div className="flex flex-col h-full bg-white text-[#212223] text-sm font-sans">
      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <div className="inline-block min-w-full">
            {/* Column Headers */}
            <div className="flex sticky top-0 z-10 bg-[#F5F5F5] border-b border-[#E5E5E5]">
                <div className="w-10 shrink-0 border-r border-[#E5E5E5] bg-[#F5F5F5]"></div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Doc ID</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Date</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Author</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Recipient</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Privilege Type</div>
                <div className="w-[150px] shrink-0 border-r border-[#E5E5E5] px-2 py-1.5 font-semibold text-[#4A4A4A]">Description</div>
            </div>

            {/* Rows */}

            {[
                ['PRIV-001', '2024-01-15', 'J. Smith', 'Legal Dept', 'Attorney-Client', 'Request for legal advice re: contract terms'],
                ['PRIV-002', '2024-02-10', 'Outside Counsel', 'CEO', 'Attorney-Client', 'Legal opinion on liability'],
                ['PRIV-003', '2024-03-05', 'J. Smith', 'Legal Dept', 'Work Product', 'Draft timeline for litigation']
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
  "Federal Court Rules.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34]">Federal Rules of Civil Procedure</h1>
      
      <h3 className="font-bold mt-4 mb-2">Rule 8. General Rules of Pleading</h3>
      <p className="mb-4 text-[15px] leading-relaxed">
        (a) Claim for Relief. A pleading that states a claim for relief must contain:
        (1) a short and plain statement of the grounds for the court's jurisdiction, unless the court already has jurisdiction and the claim needs no new jurisdictional support;
        (2) a short and plain statement of the claim showing that the pleader is entitled to relief; and
        (3) a demand for the relief sought, which may include relief in the alternative or different types of relief.
      </p>

      <h3 className="font-bold mt-4 mb-2">Rule 9. Pleading Special Matters</h3>
      <p className="mb-4 text-[15px] leading-relaxed">
        (b) Fraud or Mistake; Conditions of Mind. In alleging fraud or mistake, a party must state with particularity the circumstances constituting fraud or mistake. Malice, intent, knowledge, and other conditions of a person's mind may be alleged generally.
      </p>

      <h3 className="font-bold mt-4 mb-2">Rule 12. Defenses and Objections</h3>
      <p className="mb-4 text-[15px] leading-relaxed">
        (a) Time to Serve a Responsive Pleading.
        (1) In General. Unless another time is specified by this rule or a federal statute, the time for serving a responsive pleading is as follows:
        (A) A defendant must serve an answer:
        (i) within 21 days after being served with the summons and complaint; or
        (ii) if it has timely waived service under Rule 4(d), within 60 days after the request for a waiver was sent.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed">
        (b) How to Present Defenses. Every defense to a claim for relief in any pleading must be asserted in the responsive pleading if one is required. But a party may assert the following defenses by motion:
        (1) lack of subject-matter jurisdiction;
        (2) lack of personal jurisdiction;
        (3) improper venue;
        (4) insufficient process;
        (5) insufficient service of process;
        (6) failure to state a claim upon which relief can be granted; and
        (7) failure to join a party under Rule 19.
      </p>

      <h3 className="font-bold mt-4 mb-2">Rule 26. Duty to Disclose; General Provisions Governing Discovery</h3>
      <p className="mb-4 text-[15px] leading-relaxed">
        (a) Required Disclosures.
        (1) Initial Disclosure.
        (A) In General. Except as exempted by Rule 26(a)(1)(B) or as otherwise stipulated or ordered by the court, a party must, without awaiting a discovery request, provide to the other parties:
        (i) the name and, if known, the address and telephone number of each individual likely to have discoverable information—along with the subjects of that information—that the disclosing party may use to support its claims or defenses...
        (ii) a copy—or a description by category and location—of all documents, electronically stored information, and tangible things that the disclosing party has in its possession, custody, or control and may use to support its claims or defenses...
      </p>
    </div>
  ),
  "Memo of Law.docx": (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-xl font-bold mb-4 text-[#1D4B34] text-center">MEMORANDUM OF LAW</h1>
      <h2 className="text-md font-bold text-center mb-8 uppercase">In Support of Plaintiff's Opposition to Defendant's Motion to Dismiss</h2>
      <h3 className="font-bold mt-4 mb-2">PRELIMINARY STATEMENT</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        This memorandum is submitted in support of Plaintiff's opposition to Defendant's Motion to Dismiss. The facts as alleged in the complaint must be taken as true at this stage of the proceedings.
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        Defendant's motion relies on a misapplication of the economic loss rule. While that rule generally separates contract and tort claims, New York courts have long recognized an exception where, as here, the defendant engages in fraudulent conduct that is extraneous to the contract itself.
      </p>
      <h3 className="font-bold mt-4 mb-2">ARGUMENT</h3>
      <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">I. The Economic Loss Rule Does Not Bar Plaintiff's Fraud Claim</h4>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        The misrepresentations made by Defendant's project manager regarding the specific grade of concrete purchased were distinct from the contractual obligation to build the house. They were active concealments intended to deceive the Plaintiff into making progress payments she otherwise would have withheld.
        <Citation 
           id="cit-m1"
           type="case"
           source="N.Y. App. Div."
           title="Deerfield Commc'ns Corp. v. Chesebrough-Ponds, Inc."
           snippet="Held that a fraud claim may be maintained where the misrepresentation is collateral to the contract."
         />
      </p>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        Plaintiff has alleged that Defendant made specific false statements about the grade of concrete in monthly progress reports. These statements were not merely "promises to perform" but misrepresentations of present facts (i.e., that Grade A concrete had been poured).
      </p>

      <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">II. Plaintiff Has Pled Fraud with Sufficient Particularity</h4>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        Defendant argues that the Complaint fails to meet the requirements of Rule 9(b). However, the Complaint identifies the speaker (John Smith), the approximate dates of the misrepresentations (May-June 2023), and the specific content of the falsehoods (Grade A vs. Grade C). This is sufficient to put Defendant on notice of the claims against it.
      </p>

      <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">CONCLUSION</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-justify">
        For the foregoing reasons, Plaintiff respectfully requests that the Court deny Defendant's Motion to Dismiss in its entirety.
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
