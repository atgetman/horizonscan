export interface CitationData {
  id: string;
  type: 'case' | 'statute' | 'article' | 'record';
  source: string;
  title: string;
  snippet: string;
  footnoteNumber?: number; // Optional footnote number for scroll-to functionality
}

export interface HistoryEvent {
  id: string;
  user: string;
  action: 'edited' | 'commented' | 'viewed' | 'created';
  description: string;
  timestamp: string;
  avatarColor?: string;
  editId?: string; // ID of the edit element in the document (for scrolling)
  originalText?: string; // Original text that was changed
  revisedText?: string; // Revised text after change
}

export const FILE_CITATIONS: Record<string, CitationData[]> = {
  "GDPR Data Transfer Assessment": [
    {
      id: "cit-pj1",
      type: "statute",
      source: "GDPR Art. 44",
      title: "General principle for transfers",
      snippet: "Any transfer of personal data to a third country may take place only if the conditions of Chapter V are complied with by the controller and processor."
    },
    {
      id: "cit-pj2",
      type: "statute",
      source: "GDPR Art. 45",
      title: "Transfers on the basis of an adequacy decision",
      snippet: "A transfer may take place where the Commission has decided that the third country ensures an adequate level of protection."
    },
    {
      id: "cit-pj3",
      type: "statute",
      source: "GDPR Art. 46",
      title: "Transfers subject to appropriate safeguards",
      snippet: "In the absence of an adequacy decision, a controller may transfer personal data only if it has provided appropriate safeguards, including Standard Contractual Clauses."
    },
    {
      id: "cit-pj4",
      type: "case",
      source: "CJEU",
      title: "Data Protection Commissioner v. Facebook Ireland (Schrems II)",
      snippet: "Invalidated the Privacy Shield and required exporters to assess the destination country's protections and adopt supplementary measures where necessary."
    },
    {
      id: "cit-pj5",
      type: "record",
      source: "EDPB Recommendations 01/2020",
      title: "Supplementary measures for transfer tools",
      snippet: "Provides a six-step methodology for assessing transfers and identifying supplementary measures to ensure an essentially equivalent level of protection."
    },
    {
      id: "cit-pj6",
      type: "statute",
      source: "GDPR Art. 28",
      title: "Processor obligations",
      snippet: "Processing by a processor must be governed by a contract setting out the subject matter, duration, and the obligations and rights of the controller."
    },
    {
      id: "cit-pj7",
      type: "statute",
      source: "EU Commission SCCs (2021/914)",
      title: "Standard Contractual Clauses",
      snippet: "Provide modular contractual safeguards for transfers of personal data to third countries under Article 46(2)(c) GDPR."
    },
    {
      id: "cit-pj8",
      type: "statute",
      source: "GDPR Art. 5(1)(c)",
      title: "Data minimisation",
      snippet: "Personal data shall be adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed."
    },
    {
      id: "cit-pj9",
      type: "statute",
      source: "GDPR Art. 32",
      title: "Security of processing",
      snippet: "Requires appropriate technical and organisational measures, including encryption, to ensure a level of security appropriate to the risk."
    },
    {
      id: "cit-pj10",
      type: "statute",
      source: "GDPR Art. 33",
      title: "Notification of a personal data breach",
      snippet: "Requires notification to the supervisory authority without undue delay and, where feasible, not later than 72 hours after becoming aware of a breach."
    },
    {
      id: "cit-pj11",
      type: "statute",
      source: "GDPR Art. 35",
      title: "Data protection impact assessment",
      snippet: "Requires an assessment where processing is likely to result in a high risk to the rights and freedoms of natural persons."
    },
    {
      id: "cit-pj12",
      type: "record",
      source: "EDPB Guidelines 07/2020",
      title: "Concepts of controller and processor",
      snippet: "Clarifies the allocation of responsibilities between controllers and processors under the GDPR."
    },
    {
      id: "cit-pj13",
      type: "statute",
      source: "GDPR Art. 83",
      title: "General conditions for imposing administrative fines",
      snippet: "Sets out the tiered framework for administrative fines, including for infringements of the transfer provisions."
    },
    {
      id: "cit-pj14",
      type: "record",
      source: "EDPB Recommendations 02/2020",
      title: "European Essential Guarantees",
      snippet: "Provides the benchmarks for assessing whether surveillance measures in a third country are justifiable interferences."
    }
  ],
  "SEC Comment Letter Response": [
    {
      id: "cit-1",
      type: "statute",
      source: "17 C.F.R. § 229.1501",
      title: "Regulation S-K, Item 1501 (Governance)",
      snippet: "Requires disclosure of the board's oversight of climate-related risks and management's role in assessing and managing such risks."
    },
    {
      id: "cit-2",
      type: "statute",
      source: "17 C.F.R. § 229.1502",
      title: "Regulation S-K, Item 1502 (Strategy)",
      snippet: "Requires disclosure of climate-related risks reasonably likely to have a material impact over the short, medium, and long term."
    },
    {
      id: "cit-3",
      type: "statute",
      source: "17 C.F.R. § 229.1505",
      title: "Regulation S-K, Item 1505 (GHG Metrics)",
      snippet: "Requires disclosure of the methodology, organizational boundaries, and assurance obtained with respect to greenhouse gas emissions metrics."
    },
    {
      id: "cit-4",
      type: "statute",
      source: "17 C.F.R. § 229.1506",
      title: "Regulation S-K, Item 1506 (Assurance)",
      snippet: "Establishes attestation requirements for emissions disclosures, subject to phase-in periods based on filer status."
    },
    {
      id: "cit-5",
      type: "statute",
      source: "17 C.F.R. § 240.13a-15",
      title: "Exchange Act Rule 13a-15",
      snippet: "Requires issuers to maintain disclosure controls and procedures and to evaluate their effectiveness."
    },
    {
      id: "cit-6",
      type: "record",
      source: "GHG Protocol",
      title: "Corporate Accounting and Reporting Standard",
      snippet: "Provides the operational control approach and accounting boundaries widely used for Scope 1 and Scope 2 emissions reporting."
    },
    {
      id: "cit-7",
      type: "statute",
      source: "Securities Act Rule 408",
      title: "Additional information",
      snippet: "Requires a registrant to include material information necessary to make the required statements not misleading."
    },
    {
      id: "cit-8",
      type: "record",
      source: "SEC Staff Guidance",
      title: "Standard Acknowledgments in Comment Responses",
      snippet: "Reflects the customary acknowledgments that registrants are responsible for the adequacy and accuracy of their disclosures."
    }
  ],
  "SEC Comment Letter Response.docx": [
    {
      id: "cit-1",
      type: "statute",
      source: "17 C.F.R. § 229.1501",
      title: "Regulation S-K, Item 1501 (Governance)",
      snippet: "Requires disclosure of the board's oversight of climate-related risks and management's role in assessing and managing such risks."
    },
    {
      id: "cit-2",
      type: "statute",
      source: "17 C.F.R. § 229.1502",
      title: "Regulation S-K, Item 1502 (Strategy)",
      snippet: "Requires disclosure of climate-related risks reasonably likely to have a material impact over the short, medium, and long term."
    },
    {
      id: "cit-3",
      type: "statute",
      source: "17 C.F.R. § 229.1505",
      title: "Regulation S-K, Item 1505 (GHG Metrics)",
      snippet: "Requires disclosure of the methodology, organizational boundaries, and assurance obtained with respect to greenhouse gas emissions metrics."
    },
    {
      id: "cit-4",
      type: "statute",
      source: "17 C.F.R. § 229.1506",
      title: "Regulation S-K, Item 1506 (Assurance)",
      snippet: "Establishes attestation requirements for emissions disclosures, subject to phase-in periods based on filer status."
    },
    {
      id: "cit-5",
      type: "statute",
      source: "17 C.F.R. § 240.13a-15",
      title: "Exchange Act Rule 13a-15",
      snippet: "Requires issuers to maintain disclosure controls and procedures and to evaluate their effectiveness."
    },
    {
      id: "cit-6",
      type: "record",
      source: "GHG Protocol",
      title: "Corporate Accounting and Reporting Standard",
      snippet: "Provides the operational control approach and accounting boundaries widely used for Scope 1 and Scope 2 emissions reporting."
    },
    {
      id: "cit-7",
      type: "statute",
      source: "Securities Act Rule 408",
      title: "Additional information",
      snippet: "Requires a registrant to include material information necessary to make the required statements not misleading."
    },
    {
      id: "cit-8",
      type: "record",
      source: "SEC Staff Guidance",
      title: "Standard Acknowledgments in Comment Responses",
      snippet: "Reflects the customary acknowledgments that registrants are responsible for the adequacy and accuracy of their disclosures."
    }
  ],
  "CCPA Consumer Rights Research": [
    {
      id: "cit-ny1",
      type: "statute",
      source: "Cal. Civ. Code § 1798.121",
      title: "Right to Limit Use of Sensitive Personal Information",
      snippet: "Grants consumers the right to direct a business to limit its use of sensitive personal information to specified purposes."
    },
    {
      id: "cit-ny2",
      type: "statute",
      source: "Cal. Civ. Code § 1798.120",
      title: "Right to Opt Out of Sale or Sharing",
      snippet: "Grants consumers the right to opt out of the sale or sharing of their personal information."
    }
  ],
  "Compliance Risk Assessment.docx": [
    {
      id: "cit-c1",
      type: "statute",
      source: "17 C.F.R. § 229.1500",
      title: "Regulation S-K, Subpart 1500 (Climate Disclosures)",
      snippet: "Requires registrants to disclose climate-related risks, governance, strategy, and certain greenhouse gas emissions metrics."
    },
    {
      id: "cit-c2",
      type: "statute",
      source: "31 C.F.R. § 1020.210",
      title: "Anti-Money-Laundering Program Requirements",
      snippet: "Requires financial institutions to establish and maintain a risk-based anti-money-laundering program reasonably designed to prevent money laundering."
    }
  ],
  "Compliance Strategy.docx": [
    {
      id: "cit-s1",
      type: "statute",
      source: "17 C.F.R. § 229.1501",
      title: "Regulation S-K, Item 1501 (Governance)",
      snippet: "Requires disclosure of the board's oversight of climate-related risks and management's role in assessing and managing such risks."
    },
    {
      id: "cit-s2",
      type: "statute",
      source: "GDPR Art. 46",
      title: "Transfers subject to appropriate safeguards",
      snippet: "Permits transfers where the controller has provided appropriate safeguards, including approved Standard Contractual Clauses."
    },
    {
      id: "cit-s3",
      type: "case",
      source: "CJEU",
      title: "Data Protection Commissioner v. Facebook Ireland (Schrems II)",
      snippet: "Required exporters to assess the destination country's protections and adopt supplementary measures where protection is not equivalent."
    },
    {
      id: "cit-s4",
      type: "statute",
      source: "GDPR Art. 83",
      title: "General conditions for imposing administrative fines",
      snippet: "Infringements of the provisions on transfers of personal data may be subject to administrative fines of up to the higher statutory tier."
    }
  ]
};

export const FILE_HISTORY: Record<string, HistoryEvent[]> = {
  "GDPR Data Transfer Assessment": [
    {
      id: "h1",
      user: "HorizonScan",
      action: "created",
      description: "Drafted cross-border data transfer assessment for the Cloudspan vendor",
      timestamp: "Just now",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "SEC Comment Letter Response": [
    {
      id: "h1",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Revised the climate governance response to identify the Risk Committee",
      timestamp: "Oct 12, 2:45 PM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h2",
      user: "Michael Ross",
      action: "commented",
      description: "Added a note about the emissions assurance phase-in",
      timestamp: "Oct 12, 11:30 AM",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h3",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Formatted citations and updated the references to Regulation S-K",
      timestamp: "Oct 11, 4:15 PM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h4",
      user: "HorizonScan",
      action: "created",
      description: "Drafted initial response based on the Staff comment letter",
      timestamp: "Oct 11, 9:00 AM",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "SEC Comment Letter Response.docx": [
    {
      id: "h1",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Revised the climate governance response to identify the Risk Committee",
      timestamp: "Oct 12, 2:45 PM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h2",
      user: "Michael Ross",
      action: "commented",
      description: "Added a note about the emissions assurance phase-in",
      timestamp: "Oct 12, 11:30 AM",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h3",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Formatted citations and updated the references to Regulation S-K",
      timestamp: "Oct 11, 4:15 PM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h4",
      user: "HorizonScan",
      action: "created",
      description: "Drafted initial response based on the Staff comment letter",
      timestamp: "Oct 11, 9:00 AM",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "SEC Comment Response Draft": [
    {
      id: "h1",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Updated conclusion to confirm the revised disclosures",
      timestamp: "3:45 PM, Feb 25, 2026",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h2",
      user: "Michael Ross",
      action: "commented",
      description: "Suggested revisions to the governance disclosure",
      timestamp: "2:20 PM, Feb 25, 2026",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h3",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Refined the response on emissions assurance",
      timestamp: "11:15 AM, Feb 25, 2026",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h4",
      user: "Rachel Martinez",
      action: "viewed",
      description: "Reviewed draft before the disclosure committee meeting",
      timestamp: "4:30 PM, Feb 24, 2026",
      avatarColor: "bg-teal-600"
    },
    {
      id: "h5",
      user: "HorizonScan",
      action: "edited",
      description: "Added supporting regulatory citations to Section II",
      timestamp: "2:10 PM, Feb 24, 2026",
      avatarColor: "bg-[#de6633]"
    },
    {
      id: "h6",
      user: "Michael Ross",
      action: "edited",
      description: "Corrected formatting in the response headers",
      timestamp: "10:05 AM, Feb 24, 2026",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h7",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Expanded the governance background section",
      timestamp: "3:50 PM, Feb 23, 2026",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h8",
      user: "HorizonScan",
      action: "created",
      description: "Drafted initial version based on the Staff comment letter",
      timestamp: "9:00 AM, Feb 23, 2026",
      avatarColor: "bg-[#de6633]"
    }
  ],
  "CCPA Consumer Rights Research": [
    {
      id: "h1",
      user: "HorizonScan",
      action: "created",
      description: "Completed research on CCPA/CPRA consumer rights",
      timestamp: "Oct 10, 2:15 PM",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "Compliance Risk Assessment.docx": [
    {
      id: "h1",
      user: "Jordan Avery",
      action: "edited",
      description: "Finalized findings regarding the cross-border data transfers",
      timestamp: "Sep 28, 5:30 PM",
      avatarColor: "bg-gray-700"
    },
    {
      id: "h2",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Added the AML/KYC program refresh to the risk register",
      timestamp: "Sep 28, 2:15 PM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h3",
      user: "HorizonScan",
      action: "created",
      description: "Generated draft based on the enterprise risk-management review",
      timestamp: "Sep 27, 10:00 AM",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "Compliance Strategy.docx": [
    {
      id: "h1",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Updated resourcing target based on the vendor remediation scope",
      timestamp: "Oct 15, 10:30 AM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h2",
      user: "Michael Ross",
      action: "viewed",
      description: "Reviewed the vendor review plan",
      timestamp: "Oct 14, 3:45 PM",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h3",
      user: "HorizonScan",
      action: "created",
      description: "Drafted strategy memo based on the current compliance program",
      timestamp: "Oct 14, 9:15 AM",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "Vendor Risk Register": [
    {
      id: "h1",
      user: "Sarah Chen",
      action: "commented",
      description: "Added comment on the Cloudspan SCC status needing escalation",
      timestamp: "2:15 PM, Feb 25, 2026",
      avatarColor: "bg-[#1D4B34]"
    },
    {
      id: "h2",
      user: "Michael Torres",
      action: "edited",
      description: "Updated Status column for Atlas Payments to 'DPA Review Required'",
      timestamp: "11:30 AM, Feb 25, 2026",
      avatarColor: "bg-[#1D4B34]"
    },
    {
      id: "h3",
      user: "Jessica Park",
      action: "edited",
      description: "Added 5 new vendor rows from the latest data-mapping exercise",
      timestamp: "9:45 AM, Feb 25, 2026",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h4",
      user: "David Kumar",
      action: "commented",
      description: "Flagged concern about a sub-processor lacking flow-down terms",
      timestamp: "4:20 PM, Feb 24, 2026",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h5",
      user: "HorizonScan",
      action: "edited",
      description: "Auto-populated the lawful-basis field for 12 records based on metadata",
      timestamp: "2:00 PM, Feb 24, 2026",
      avatarColor: "bg-[#de6633]"
    },
    {
      id: "h6",
      user: "Emily Rodriguez",
      action: "commented",
      description: "Updated the register with 47 additional vendor data flows",
      timestamp: "11:15 AM, Feb 24, 2026",
      avatarColor: "bg-teal-600"
    },
    {
      id: "h7",
      user: "Michael Torres",
      action: "edited",
      description: "Added custom question 'Transfer Impact Assessment?' to the columns",
      timestamp: "10:30 AM, Feb 24, 2026",
      avatarColor: "bg-[#1D4B34]"
    },
    {
      id: "h8",
      user: "Sarah Chen",
      action: "edited",
      description: "Uploaded 23 vendor agreements from the procurement folder",
      timestamp: "3:15 PM, Feb 23, 2026",
      avatarColor: "bg-[#1D4B34]"
    },
    {
      id: "h9",
      user: "HorizonScan",
      action: "created",
      description: "Created vendor risk register with the initial vendor set",
      timestamp: "9:00 AM, Feb 23, 2026",
      avatarColor: "bg-[#de6633]"
    }
  ]
};
