import React from 'react';
import { Citation } from "../components/Citation";

export const PersonalJurisdictionMotion = (
  <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
    <h1 className="text-2xl font-bold mb-6 text-center">MERIDIAN FINANCIAL GROUP, INC.<br/>OFFICE OF THE GENERAL COUNSEL</h1>
    <div className="flex justify-between mb-12 text-sm border-b-2 border-black pb-8">
      <div className="w-1/2 border-r-2 border-black pr-4">
        <p className="font-bold">PRIVILEGED &amp; CONFIDENTIAL</p>
        <p className="ml-8 italic">Attorney Work Product</p>
        <p className="my-4 text-center">— re —</p>
        <p className="font-bold">CLOUDSPAN INC. — Vendor Data Transfer</p>
        <p className="ml-8 italic">Compliance Assessment</p>
      </div>
      <div className="w-1/2 pl-4 flex flex-col justify-center">
        <p>Matter No. PRIV-2026-014</p>
        <p className="font-bold mt-4 text-lg">MEMORANDUM RE: GDPR CROSS-BORDER DATA TRANSFER ASSESSMENT</p>
        <p className="mt-2 font-bold">FOR INTERNAL REVIEW</p>
      </div>
    </div>
    
    <p className="mb-6 text-[15px] leading-relaxed text-justify">
      This memorandum assesses whether Meridian Financial Group, Inc. ("Meridian" or the "Company") may lawfully transfer the personal data of its EU customers to Cloudspan Inc. ("Cloudspan"), a U.S.-based processor, under the General Data Protection Regulation ("GDPR").
    </p>

     <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">EXECUTIVE SUMMARY</h3>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Meridian processes personal data of data subjects located in the European Economic Area ("EEA") and proposes to transfer that data to Cloudspan in the United States. Such a transfer is a restricted transfer under Chapter V of the GDPR and requires an appropriate transfer mechanism. Based on the current record, Cloudspan has not executed Standard Contractual Clauses ("SCCs"), and no transfer impact assessment has been completed. Accordingly, the transfer cannot proceed in its current form, and the deficiencies described below must be remediated before any EU personal data is shared with Cloudspan.
     </p>
     
     <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">LEGAL STANDARD</h3>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       The GDPR prohibits the transfer of personal data to a third country unless the transfer is made to a country with an adequacy decision or is subject to appropriate safeguards.
       <Citation 
         id="cit-pj1"
         type="statute"
         source="GDPR Art. 44"
         title="General principle for transfers"
         snippet="Any transfer of personal data to a third country shall take place only if the conditions of Chapter V are met, to ensure the level of protection of natural persons is not undermined."
       />
       Where no adequacy decision applies, a controller or processor may transfer personal data only if it has provided appropriate safeguards, such as Standard Contractual Clauses.
       <Citation 
         id="cit-pj2"
         type="statute"
         source="GDPR Art. 46"
         title="Transfers subject to appropriate safeguards"
         snippet="In the absence of an adequacy decision, a controller or processor may transfer personal data to a third country only if it has provided appropriate safeguards, including approved Standard Contractual Clauses."
       />
     </p>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Following the invalidation of the Privacy Shield, transfers relying on SCCs must be supported by an assessment of whether the law of the destination country ensures an essentially equivalent level of protection, supplemented by additional measures where necessary.
       <Citation 
         id="cit-pj3"
         type="case"
         source="CJEU"
         title="Data Protection Commissioner v. Facebook Ireland (Schrems II)"
         snippet="Held that exporters relying on SCCs must verify, on a case-by-case basis, whether the law of the third country ensures adequate protection and adopt supplementary measures where it does not."
       />
       The exporter bears the burden of demonstrating that an appropriate transfer mechanism is in place.
       <Citation 
         id="cit-pj4"
         type="record"
         source="EDPB"
         title="Recommendations 01/2020 on supplementary measures"
         snippet="Clarified that the data exporter is responsible for assessing the level of protection in the destination country and documenting the transfer mechanism relied upon."
       />
     </p>

     <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">ANALYSIS</h3>
     <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">I. No Adequacy Decision Covers the Proposed Transfer</h4>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Transfers to a country benefiting from an adequacy decision do not require additional authorization.
       <Citation 
         id="cit-pj5"
         type="statute"
         source="GDPR Art. 45"
         title="Transfers on the basis of an adequacy decision"
         snippet="A transfer may take place where the Commission has decided that the third country ensures an adequate level of protection."
       />
       While the EU-U.S. Data Privacy Framework ("DPF") provides an adequacy basis for transfers to certified U.S. organizations, the record does not show that Cloudspan is a current DPF participant. Until Cloudspan's certification is verified, Meridian cannot rely on the DPF as the transfer mechanism, and an alternative safeguard under Article 46 is required.
     </p>

     <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">II. Cloudspan Has Not Executed Standard Contractual Clauses</h4>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       In the absence of adequacy, SCCs are the most common appropriate safeguard, but they must be incorporated in full and properly executed by both parties.
       <Citation 
         id="cit-pj6"
         type="record"
         source="Commission Decision 2021/914"
         title="Standard Contractual Clauses for the transfer of personal data to third countries"
         snippet="Sets out the modular Standard Contractual Clauses that, when adopted in full, provide appropriate safeguards for restricted transfers."
       />
       The Cloudspan data processing agreement references SCCs but does not attach or execute them. A reference to SCCs without the operative clauses and completed annexes does not constitute an appropriate safeguard. Meridian must require Cloudspan to execute the applicable SCC modules, complete the annexes describing the processing, and append its technical and organizational security measures.
     </p>

     <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">III. A Transfer Impact Assessment Is Required and Outstanding</h4>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Even where SCCs are executed, the exporter must conduct a transfer impact assessment to determine whether U.S. law affords essentially equivalent protection, and must implement supplementary measures where it does not.
       <Citation 
         id="cit-pj7"
         type="case"
         source="CJEU"
         title="Data Protection Commissioner v. Facebook Ireland (Schrems II)"
         snippet="Required exporters to assess the destination country's surveillance laws and adopt supplementary measures, such as strong encryption, where protection is not equivalent."
       />
       No transfer impact assessment has been completed for the Cloudspan transfer. Meridian should document an assessment of relevant U.S. surveillance authorities and adopt supplementary measures—such as end-to-end encryption with exporter-held keys and contractual transparency commitments—before the transfer proceeds.
     </p>

     <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">IV. The Breach-Notification Term Is Non-Compliant</h4>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       A processor must notify the controller of a personal data breach without undue delay so the controller can meet its own 72-hour notification obligation.
       <Citation 
         id="cit-pj8"
         type="statute"
         source="GDPR Art. 33"
         title="Notification of a personal data breach to the supervisory authority"
         snippet="The controller shall notify the competent supervisory authority of a personal data breach without undue delay and, where feasible, not later than 72 hours after becoming aware of it; the processor shall notify the controller without undue delay."
       />
       Cloudspan's proposed 14-day notification window is incompatible with this requirement. The agreement must be revised to require notification without undue delay and in any event within a timeframe that allows Meridian to comply with its 72-hour obligation.
     </p>

     <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">RECOMMENDATION</h3>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       The proposed transfer should not proceed until Meridian (1) verifies Cloudspan's DPF certification or executes the applicable SCC modules with completed annexes; (2) completes and documents a transfer impact assessment with appropriate supplementary measures; and (3) revises the breach-notification term to meet GDPR timelines. Once these steps are completed, the transfer may proceed on the basis of the executed safeguards.
     </p>
     <p className="mb-4 text-[15px] leading-relaxed">
       Dated: February 23, 2026<br/>
       Prepared by:<br/>
       <br/>
       Office of the General Counsel<br/>
       Meridian Financial Group, Inc.<br/>
       200 Harbor Street<br/>
       New York, NY 10004<br/>
       Privacy &amp; Data Protection Team
     </p>
  </div>
);
