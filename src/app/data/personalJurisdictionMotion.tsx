import React from 'react';
import { Citation } from "../components/Citation";

export const PersonalJurisdictionMotion = (
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
        <p className="font-bold mt-4 text-lg">DEFENDANT'S MEMORANDUM OF LAW IN SUPPORT OF MOTION TO DISMISS FOR LACK OF PERSONAL JURISDICTION</p>
        <p className="mt-2 font-bold">ORAL ARGUMENT REQUESTED</p>
      </div>
    </div>
    
    <p className="mb-6 text-[15px] leading-relaxed text-justify">
      Defendant Pacific Builders Inc. ("Defendant") respectfully submits this Memorandum of Law in support of its Motion to Dismiss the Complaint pursuant to Federal Rule of Civil Procedure 12(b)(2) for lack of personal jurisdiction.
    </p>

     <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">PRELIMINARY STATEMENT</h3>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Plaintiff Maria Hernandez ("Plaintiff") is a New York resident who has sued Defendant, a Delaware corporation with its principal place of business in California, in this Court. However, Defendant lacks sufficient minimum contacts with New York to satisfy the requirements of personal jurisdiction under the Due Process Clause of the Fourteenth Amendment. Defendant has never maintained an office or property in New York, has never been registered to do business in New York, and its sole alleged contact with the forum—a construction project managed remotely from California—is insufficient to establish jurisdiction. Accordingly, this Court lacks personal jurisdiction over Defendant, and the Complaint must be dismissed.
     </p>
     
     <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">LEGAL STANDARD</h3>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       A federal court sitting in diversity may exercise personal jurisdiction over a non-resident defendant only if: (1) the defendant is amenable to service of process under the forum state's long-arm statute; and (2) the exercise of jurisdiction comports with due process under the Fourteenth Amendment.
       <Citation 
         id="cit-pj1"
         type="case"
         source="2d Cir."
         title="Licci ex rel. Licci v. Lebanese Canadian Bank, SAL"
         snippet="Held that federal courts in diversity cases apply the forum state's long-arm statute and the Due Process Clause."
       />
       New York's long-arm statute permits jurisdiction to the full extent allowed by the Constitution, so the two inquiries merge.
       <Citation 
         id="cit-pj2"
         type="case"
         source="2d Cir."
         title="Chloé v. Queen Bee of Beverly Hills, LLC"
         snippet="Reaffirmed that New York's long-arm statute is coextensive with federal due process requirements."
       />
     </p>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Due process requires that a defendant have "minimum contacts" with the forum state such that the maintenance of the suit does not offend "traditional notions of fair play and substantial justice."
       <Citation 
         id="cit-pj3"
         type="case"
         source="U.S. Supreme Court"
         title="International Shoe Co. v. Washington"
         snippet="Established the minimum contacts test for personal jurisdiction under the Due Process Clause."
       />
       The plaintiff bears the burden of establishing that jurisdiction exists.
       <Citation 
         id="cit-pj4"
         type="case"
         source="2d Cir."
         title="In re Terrorist Attacks on Sept. 11, 2001"
         snippet="Clarified that the plaintiff bears the burden of proving the court has jurisdiction over the defendant."
       />
     </p>

     <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">ARGUMENT</h3>
     <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">I. This Court Lacks General Jurisdiction Over Defendant</h4>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       General jurisdiction permits a court to hear any claim against a defendant, regardless of where the claim arose. However, general jurisdiction is limited to forums where the defendant is "essentially at home."
       <Citation 
         id="cit-pj5"
         type="case"
         source="U.S. Supreme Court"
         title="Daimler AG v. Bauman"
         snippet="Held that general jurisdiction is limited to places where the defendant is 'essentially at home'—typically the defendant's place of incorporation and principal place of business."
       />
       For a corporation, this generally means only the state of incorporation and the state of principal place of business.
       <Citation 
         id="cit-pj6"
         type="case"
         source="U.S. Supreme Court"
         title="Goodyear Dunlop Tires Operations, S.A. v. Brown"
         snippet="Established that for a corporation, being 'at home' typically means the place of incorporation and principal place of business."
       />
     </p>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Here, Defendant is incorporated under Delaware law and maintains its principal place of business in Los Angeles, California. Defendant has never had an office, employees, bank accounts, or property in New York. Defendant is not registered to do business in New York and does not hold any licenses issued by New York State. These facts are undisputed in Plaintiff's Complaint. Accordingly, Defendant is not "at home" in New York, and this Court lacks general jurisdiction.
     </p>

     <h4 className="font-bold mt-4 mb-2 uppercase text-sm tracking-wide">II. This Court Lacks Specific Jurisdiction Over Defendant</h4>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Specific jurisdiction requires that: (1) the defendant purposefully availed itself of the privilege of conducting activities in the forum state; (2) the claim arises out of or relates to those forum-related activities; and (3) the exercise of jurisdiction is reasonable.
       <Citation 
         id="cit-pj7"
         type="case"
         source="2d Cir."
         title="Metropolitan Life Ins. Co. v. Robertson-Ceco Corp."
         snippet="Set forth the three-part test for specific personal jurisdiction in the Second Circuit."
       />
       The defendant's contacts with the forum must be such that the defendant "should reasonably anticipate being haled into court there."
       <Citation 
         id="cit-pj8"
         type="case"
         source="U.S. Supreme Court"
         title="World-Wide Volkswagen Corp. v. Woodson"
         snippet="Held that the defendant must have 'purposefully directed' activities toward the forum state and should 'reasonably anticipate being haled into court there.'"
       />
     </p>

     <h5 className="font-bold mt-3 mb-2 text-sm">A. Defendant Did Not Purposefully Avail Itself of New York</h5>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Purposeful availment requires that the defendant's contacts with the forum be the result of the defendant's own actions, not the unilateral activity of the plaintiff. Mere foreseeability that a product or service will end up in the forum state is insufficient.
       <Citation 
         id="cit-pj9"
         type="case"
         source="U.S. Supreme Court"
         title="Burger King Corp. v. Rudzewicz"
         snippet="Held that personal jurisdiction requires the defendant's own actions, not the unilateral activity of the plaintiff or third parties."
       />
       The plaintiff cannot create jurisdiction by its own contacts with the defendant.
       <Citation 
         id="cit-pj10"
         type="case"
         source="2d Cir."
         title="Sunward Electronics, Inc. v. McDonald"
         snippet="Reaffirmed that the plaintiff cannot create personal jurisdiction over the defendant by its own unilateral contacts."
       />
     </p>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Here, Defendant's involvement in the New York construction project was minimal and incidental. Although the construction site is located in New York, all project management, decision-making, and material procurement were conducted from Defendant's California headquarters. Defendant never sent employees to New York, never advertised or marketed its services in New York, and never solicited business in New York. The contract was negotiated and executed in California. The mere fact that the construction site happens to be located in New York does not establish purposeful availment.
       <Citation 
         id="cit-pj11"
         type="case"
         source="2d Cir."
         title="Waldman v. Palestine Liberation Org."
         snippet="Held that a defendant's minimal and incidental contacts with the forum state are insufficient to establish purposeful availment."
       />
     </p>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Moreover, the contract at issue contains a choice-of-law provision specifying that California law governs, and a forum selection clause designating California state courts as the exclusive forum for disputes. These provisions further demonstrate that Defendant did not purposefully avail itself of New York law or New York courts.
       <Citation 
         id="cit-pj12"
         type="case"
         source="U.S. Supreme Court"
         title="Carnival Cruise Lines, Inc. v. Shute"
         snippet="Held that forum selection clauses are presumptively valid and demonstrate the parties' expectations regarding where disputes will be litigated."
       />
     </p>

     <h5 className="font-bold mt-3 mb-2 text-sm">B. Exercising Jurisdiction Would Be Unreasonable</h5>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Even if the first two prongs of the specific jurisdiction test were satisfied, the exercise of jurisdiction must still be reasonable. Courts consider: (1) the burden on the defendant; (2) the forum state's interest in adjudicating the dispute; (3) the plaintiff's interest in obtaining relief; (4) the interstate judicial system's interest in efficiency; and (5) the shared interest of the states in furthering substantive social policies.
       <Citation 
         id="cit-pj13"
         type="case"
         source="2d Cir."
         title="PDK Labs, Inc. v. Friedlander"
         snippet="Set forth the five factors for assessing the reasonableness of exercising personal jurisdiction."
       />
     </p>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       Here, requiring Defendant to defend this action in New York would impose a substantial burden. All of Defendant's employees, documents, and witnesses are located in California. Conversely, the contract expressly designates California law as controlling and California courts as the exclusive forum. California has a strong interest in applying its own law to a contract governed by California law. New York has no meaningful interest in this dispute beyond the fortuitous location of the construction site. Accordingly, the exercise of jurisdiction would be unreasonable.
       <Citation 
         id="cit-pj14"
         type="case"
         source="2d Cir."
         title="Asahi Metal Indus. Co. v. Superior Court"
         snippet="Held that the burden on the defendant is a significant factor in determining whether the exercise of jurisdiction is reasonable."
       />
     </p>

     <h3 className="font-bold mt-8 mb-3 text-lg border-b border-gray-300 pb-1">CONCLUSION</h3>
     <p className="mb-4 text-[15px] leading-relaxed text-justify">
       For the foregoing reasons, Defendant respectfully requests that the Court grant this Motion to Dismiss for lack of personal jurisdiction pursuant to Federal Rule of Civil Procedure 12(b)(2).
     </p>
     <p className="mb-4 text-[15px] leading-relaxed">
       Dated: February 23, 2026<br/>
       Respectfully submitted,<br/>
       <br/>
       /s/ Attorney for Defendant<br/>
       WILSON & ASSOCIATES LLP<br/>
       500 S. Grand Avenue, Suite 2500<br/>
       Los Angeles, CA 90071<br/>
       Attorneys for Defendant Pacific Builders Inc.
     </p>
  </div>
);
