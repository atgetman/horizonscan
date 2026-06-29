// Data file for Omni Search - separate to keep main component clean

export interface SearchResult {
  id: string;
  type: 'chat' | 'artifact' | 'workspace' | 'file' | 'table' | 'document';
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  path?: string;
  content?: string;
  workspace?: string;
  isQuickChat?: boolean;
  chatTitle?: string;
  preview?: {
    title: string;
    content: string;
    type?: 'text' | 'chat' | 'document' | 'table';
    metadata?: { label: string; value: string }[];
  };
}

export const MOCK_RESULTS: SearchResult[] = [
  // ── Chats ──────────────────────────────────────────────
  {
    id: '4',
    type: 'chat',
    title: 'Third-party data-sharing risk analysis',
    date: 'February 18, 2026 at 2:30 PM',
    path: '/chat/4',
    workspace: 'Vendor DPA Remediation',
    preview: {
      title: 'Third-party data-sharing risk analysis',
      type: 'chat',
      content: `Analyze the data flows from Meridian to Beacon Analytics and flag any data-minimization or sub-processor risks.

I've completed a review of the Meridian → Beacon Analytics data flow. Here's my assessment:

## DATA FLOW OVERVIEW

- **Source:** Meridian customer account platform
- **Recipient:** Beacon Analytics (data vendor)
- **Purpose:** Marketing analytics and segmentation
- **Volume:** ~2.4M EU/UK customer records

## KEY FINDINGS

- **Excessive collection:** Beacon ingests raw account identifiers where pseudonymized IDs would suffice (data-minimization gap under GDPR Art. 5(1)(c)).
- **Undisclosed sub-processor:** Beacon routes data to a downstream analytics provider with no flow-down terms in place.
- **Lawful basis unclear:** The data-sharing relies on "legitimate interests" without a documented balancing test.

## RECOMMENDATIONS

1. **Restrict fields** to pseudonymized identifiers in the data pipeline.
2. **Execute flow-down DPA terms** with the downstream sub-processor.
3. **Document a legitimate interests assessment** (LIA) for the analytics use.
4. **Add deletion SLAs** so data is purged when the analytics purpose ends.`,
      metadata: [
        { label: 'Date', value: 'February 18, 2026 at 2:30 PM' },
        { label: 'Messages', value: '6' },
        { label: 'Workspace', value: 'Vendor DPA Remediation' },
      ]
    }
  },
  {
    id: '1',
    type: 'chat',
    title: 'Research on SEC climate rules',
    date: 'February 12, 2026 at 3:42 PM',
    path: '/chat/1',
    isQuickChat: true,
    preview: {
      title: 'Research on SEC climate rules',
      type: 'chat',
      content: `Summarize the SEC's climate-related disclosure requirements for governance and GHG metrics.

Here is a summary of the key requirements under the SEC climate disclosure rules:

1. Governance (Regulation S-K Item 1501): Registrants must describe the board's oversight of climate-related risks, including any committee responsible, and management's role in assessing and managing those risks.

2. Strategy & Impacts (Item 1502): Registrants must disclose material climate-related risks reasonably likely to affect the business, and any material impacts on results of operations, quantified where practicable.

3. GHG Metrics (Item 1505): Where disclosed, Scope 1 and Scope 2 emissions must be presented gross, with the methodology, organizational boundaries, and emission factors described.

4. Assurance (Item 1506): Emissions disclosures are subject to attestation requirements that phase in over time based on filer status, moving from limited to reasonable assurance.

The key takeaway is that disclosures must be specific and consistent year over year, and emissions metrics must describe their methodology and assurance status. Would you like me to draft proposed disclosure language for any of these items?`,
      metadata: [
        { label: 'Date', value: 'February 12, 2026 at 3:42 PM' },
        { label: 'Messages', value: '8' },
        { label: 'Location', value: 'Quick chat' },
      ]
    }
  },
  {
    id: '2',
    type: 'chat',
    title: 'Summary of vendor interview',
    date: 'February 16, 2026 at 11:20 AM',
    path: '/chat/2',
    workspace: 'GDPR Cross-Border Data Transfer Review',
    preview: {
      title: 'Summary of vendor interview',
      type: 'chat',
      content: `Summarize the key admissions from the Cloudspan security interview.

Here are the key admissions from the Cloudspan Inc. interview on February 14, 2026:

BACKGROUND
• Daniel Okafor, VP of Security, confirmed Cloudspan hosts Meridian's EU customer data.
• Data is stored primarily in the U.S. East region with backups in U.S. West.

CRITICAL ADMISSIONS REGARDING TRANSFER SAFEGUARDS
• Admitted that the master agreement references Standard Contractual Clauses but the annexes were never completed.
• Conceded that no transfer impact assessment has been performed for the EU data.
• Acknowledged that Cloudspan, not Meridian, controls the encryption keys for data at rest.

BREACH NOTIFICATION
• Confirmed the current contract provides for breach notification within 14 days, which is incompatible with Meridian's 72-hour obligation under GDPR Art. 33.

SUB-PROCESSORS
• Admitted a downstream analytics provider receives the data, and was unable to confirm whether flow-down terms mirror Cloudspan's obligations.

This interview establishes several compliance gaps that must be remediated before EU personal data continues to flow to Cloudspan.`,
      metadata: [
        { label: 'Date', value: 'February 16, 2026 at 11:20 AM' },
        { label: 'Messages', value: '4' },
        { label: 'Workspace', value: 'GDPR Cross-Border Data Transfer Review' },
      ]
    }
  },
  {
    id: '3',
    type: 'chat',
    title: 'Contract review analysis',
    date: 'February 7, 2026 at 9:45 AM',
    path: '/chat/3',
    isQuickChat: true,
    preview: {
      title: 'Contract review analysis',
      type: 'chat',
      content: `Review the Cloud Services Agreement with Cloudspan and flag any data-protection gaps.

I reviewed the Cloud Services Agreement with Cloudspan Inc. Here are the key findings:

1. Data Processing Terms: The agreement lacks a complete Article 28 data processing addendum. Processing purposes and instructions are not adequately specified.

2. Standard Contractual Clauses: SCCs are referenced but not attached or executed, leaving cross-border transfers without an appropriate safeguard.

3. Security Measures: The technical and organizational measures (TOMs) annex is missing, so the agreed security baseline is undefined.

4. Audit Rights: Meridian's audit and inspection rights are limited to a third-party report rather than a direct audit.

5. Sub-processing: The agreement permits sub-processing without a flow-down requirement or an objection mechanism.

Recommendation: Pause new data transfers until the DPA, SCC annexes, and TOMs are executed.`,
      metadata: [
        { label: 'Date', value: 'February 7, 2026 at 9:45 AM' },
        { label: 'Messages', value: '5' },
        { label: 'Location', value: 'Quick chat' },
      ]
    }
  },
  {
    id: '5',
    type: 'chat',
    title: 'CCPA opt-out compliance review',
    date: 'February 4, 2026 at 1:20 PM',
    path: '/chat/5',
    workspace: 'CCPA & State Privacy Compliance',
    preview: {
      title: 'CCPA opt-out compliance review',
      type: 'chat',
      content: `Assess whether Meridian's website honors CCPA/CPRA opt-out of sale and sharing requirements.

Here is my assessment of Meridian's opt-out compliance:

• "Do Not Sell or Share My Personal Information" link is present but does not process Global Privacy Control (GPC) signals automatically.
• The opt-out for cross-context behavioral advertising ("sharing") is not clearly separated from the sale opt-out.
• Service provider contracts do not all contain the contractual restrictions required to avoid "sale" treatment under Cal. Civ. Code § 1798.140(ag).

Recommendation: Implement GPC honoring, separate the sharing opt-out, and remediate service provider contracts.`,
      metadata: [
        { label: 'Date', value: 'February 4, 2026 at 1:20 PM' },
        { label: 'Messages', value: '7' },
        { label: 'Workspace', value: 'CCPA & State Privacy Compliance' },
      ]
    }
  },
  {
    id: '6',
    type: 'chat',
    title: 'EU AI Act readiness discussion',
    date: 'January 28, 2026 at 11:30 AM',
    path: '/chat/6',
    isQuickChat: true,
    preview: {
      title: 'EU AI Act readiness discussion',
      type: 'chat',
      content: `What obligations apply to our credit underwriting model under the EU AI Act?

Credit scoring and underwriting models are generally classified as high-risk AI systems under the EU AI Act (Annex III). Key obligations include:

• Risk management system maintained across the model lifecycle.
• Data governance covering training, validation, and testing datasets.
• Technical documentation and record-keeping (logging).
• Human oversight measures and transparency to affected persons.
• Accuracy, robustness, and cybersecurity requirements.

Recommendation: Stand up a model inventory, classify each model, and begin assembling the technical documentation for the underwriting model first.`,
      metadata: [
        { label: 'Date', value: 'January 28, 2026 at 11:30 AM' },
        { label: 'Messages', value: '6' },
        { label: 'Location', value: 'Quick chat' },
      ]
    }
  },
  {
    id: '7',
    type: 'chat',
    title: 'AML transaction monitoring review',
    date: 'January 22, 2026 at 9:15 AM',
    path: '/chat/7',
    workspace: 'AML / KYC Policy Refresh',
    preview: {
      title: 'AML transaction monitoring review',
      type: 'chat',
      content: `Review our transaction monitoring thresholds against current BSA/AML expectations.

Summary of the transaction monitoring review:

• Current thresholds have not been recalibrated in 18 months and generate a high false-positive rate.
• SAR filing timelines are within regulatory limits, but documentation of investigation rationale is inconsistent.
• Customer risk rating model does not incorporate recent geographic risk guidance.

Recommendation: Recalibrate thresholds, standardize investigation documentation, and update the customer risk rating methodology.`,
      metadata: [
        { label: 'Date', value: 'January 22, 2026 at 9:15 AM' },
        { label: 'Messages', value: '5' },
        { label: 'Workspace', value: 'AML / KYC Policy Refresh' },
      ]
    }
  },

  // ── Workspaces ────────────────────────────────────────
  {
    id: '21',
    type: 'workspace',
    title: 'GDPR Cross-Border Data Transfer Review',
    date: 'February 5, 2026',
    path: '/workspace/gdpr-cross-border-data-transfer-review',
    preview: {
      title: 'GDPR Cross-Border Data Transfer Review',
      type: 'text',
      content: `# MATTER OVERVIEW

## Matter

**GDPR Cross-Border Data Transfer Review — Cloudspan Inc.**

### Owner & Status

- **Lead:** Office of the General Counsel, Privacy & Data Protection Team
- **Matter No.:** PRIV-2026-014
- **Opened:** January 15, 2026
- **Status:** Active — Remediation in progress
- **Next milestone:** Vendor SCC execution by March 1, 2026

---

## Background

Meridian Financial Group transfers personal data of EEA-located customers to Cloudspan Inc., a U.S.-based cloud processor. The transfer is a restricted transfer under Chapter V of the GDPR and requires an appropriate transfer mechanism.

## Key Issues

### 1. No executed transfer mechanism

- Master agreement references Standard Contractual Clauses but annexes are incomplete.
- Cloudspan's EU-U.S. Data Privacy Framework certification is unverified.

### 2. No transfer impact assessment

- No assessment of U.S. surveillance laws has been completed.
- No supplementary measures (e.g., encryption with exporter-held keys) are documented.

### 3. Non-compliant breach notification

- Contract provides 14-day breach notice, incompatible with the 72-hour controller obligation under GDPR Art. 33.

---

## Workstreams

- Execute SCC modules with completed annexes and TOMs.
- Complete and document a transfer impact assessment.
- Revise breach-notification timelines.
- Map sub-processors and add flow-down terms.

KEY DOCUMENTS IN WORKSPACE

Memos (2):
• Climate Risk Disclosure Memo
• Memo on Employee Data Privacy

Assessments (2):
• Privacy Impact Assessment
• Data Inventory & Mapping

Vendor materials (3):
• Cloud Services Agreement — Cloudspan
• Vendor Data Processing Agreement
• Cloudspan Interview Notes

WORKSPACE CONTENTS: 9 items
Last Updated: February 23, 2026`,
      metadata: [
        { label: 'Created', value: 'January 15, 2026' },
        { label: 'Items', value: '9' },
        { label: 'Last updated', value: 'February 23, 2026' },
      ]
    }
  },
  {
    id: '22',
    type: 'workspace',
    title: 'CCPA & State Privacy Compliance',
    date: 'January 10, 2026',
    path: '/workspace/ccpa-state-privacy-compliance',
    preview: {
      title: 'CCPA & State Privacy Compliance',
      type: 'text',
      content: `# MATTER OVERVIEW

## Matter

**CCPA & State Privacy Compliance Program**

### Owner & Status

- **Lead:** Privacy Compliance Team
- **Status:** Active — Ongoing program
- **Scope:** California (CCPA/CPRA) plus Virginia, Colorado, Connecticut, and additional state laws

---

## Objectives

- Maintain compliant consumer rights workflows (access, delete, correct, opt-out).
- Honor Global Privacy Control signals for opt-out of sale/sharing.
- Keep service provider contracts within the statutory exemption from "sale" treatment.
- Track new and amended state privacy laws via Horizon Scan.

## Open Items

- Implement automated GPC honoring on web properties.
- Separate the "sharing" opt-out from the "sale" opt-out.
- Refresh the consumer-facing privacy notice for new state requirements.

WORKSPACE CONTENTS: 6 items
Last Updated: February 6, 2026`,
      metadata: [
        { label: 'Created', value: 'January 10, 2026' },
        { label: 'Items', value: '6' },
        { label: 'Last updated', value: 'February 6, 2026' },
      ]
    }
  },
  {
    id: '23',
    type: 'workspace',
    title: 'SEC Climate Disclosure Program',
    date: 'December 12, 2025',
    path: '/workspace/sec-climate-disclosure-program',
    preview: {
      title: 'SEC Climate Disclosure Program',
      type: 'text',
      content: `# MATTER OVERVIEW

## Matter

**SEC Climate Disclosure Program — Form 10-K**

### Owner & Status

- **Lead:** Securities & Disclosure Team
- **Status:** Active — Responding to staff comments
- **Filing:** Form 10-K for fiscal year ended December 31, 2025

---

## Objectives

- Prepare climate-related governance and risk disclosures consistent with Regulation S-K Items 1500–1507.
- Respond to the SEC staff comment letter dated February 9, 2026.
- Document the assurance status and methodology for Scope 1 and Scope 2 emissions.

## Open Items

- Finalize the SEC Comment Letter Response.
- Expand governance disclosure to name the responsible board committee.
- Describe emissions methodology, boundaries, and assurance phase-in.

WORKSPACE CONTENTS: 7 items
Last Updated: February 22, 2026`,
      metadata: [
        { label: 'Created', value: 'December 12, 2025' },
        { label: 'Items', value: '7' },
        { label: 'Last updated', value: 'February 22, 2026' },
      ]
    }
  },
  {
    id: '24',
    type: 'workspace',
    title: 'EU AI Act Readiness',
    date: 'December 1, 2025',
    path: '/workspace/eu-ai-act-readiness',
    preview: {
      title: 'EU AI Act Readiness',
      type: 'text',
      content: `# MATTER OVERVIEW

## Matter

**EU AI Act Readiness — Credit & Underwriting Models**

### Owner & Status

- **Lead:** AI Governance Working Group
- **Status:** Active — Model inventory and classification

---

## Objectives

- Inventory and classify ML models used in credit and underwriting.
- Implement risk management, data governance, logging, and human oversight controls for high-risk systems.
- Assemble technical documentation required under the EU AI Act.

## Open Items

- Complete model classification for the underwriting model.
- Draft the high-risk system technical documentation.
- Define human oversight procedures and transparency notices.

WORKSPACE CONTENTS: 5 items
Last Updated: January 30, 2026`,
      metadata: [
        { label: 'Created', value: 'December 1, 2025' },
        { label: 'Items', value: '5' },
        { label: 'Last updated', value: 'January 30, 2026' },
      ]
    }
  },
  {
    id: '25',
    type: 'workspace',
    title: 'Project Harbor — Fintech Acquisition Diligence',
    date: 'November 20, 2025',
    path: '/workspace/project-harbor-fintech-acquisition-diligence',
    preview: {
      title: 'Project Harbor — Fintech Acquisition Diligence',
      type: 'text',
      content: `# MATTER OVERVIEW

## Matter

**Project Harbor — Acquisition of Sterling Capital**

### Owner & Status

- **Lead:** Corporate & Regulatory Team
- **Status:** Active — Regulatory diligence
- **Target:** Sterling Capital (fintech lender)

---

## Objectives

- Conduct regulatory diligence on licensing, AML/KYC, and consumer-finance compliance.
- Prepare and submit Hart-Scott-Rodino (HSR) premerger notification.
- Identify privacy and data-transfer obligations arising from the combined entity.

## Open Items

- Complete the HSR filing within the waiting-period deadline.
- Review state lending licenses held by Sterling Capital.
- Assess data integration against GDPR and CCPA requirements.

WORKSPACE CONTENTS: 8 items
Last Updated: February 1, 2026`,
      metadata: [
        { label: 'Created', value: 'November 20, 2025' },
        { label: 'Items', value: '8' },
        { label: 'Last updated', value: 'February 1, 2026' },
      ]
    }
  },

  // ── Drafts / Documents (linked to chats via chatTitle) ─
  {
    id: '11',
    type: 'artifact',
    title: 'Vendor Risk Assessment Memo',
    date: 'February 17, 2026 at 2:15 PM',
    path: '/chat/11',
    workspace: 'GDPR Cross-Border Data Transfer Review',
    chatTitle: 'Summary of vendor interview',
    preview: {
      title: 'Vendor Risk Assessment Memo',
      type: 'document',
      content: `# MEMORANDUM — CLOUDSPAN VENDOR RISK ASSESSMENT

**TO:** General Counsel
**FROM:** Privacy & Data Protection Team
**RE:** Cross-border transfer risk — Cloudspan Inc.
**DATE:** February 17, 2026

---

## I. EXECUTIVE SUMMARY

This memorandum assesses whether Meridian may continue transferring EU personal data to Cloudspan Inc. Based on the current record, the transfer lacks an executed safeguard and a transfer impact assessment, and the breach-notification term is non-compliant. The transfer should be paused pending remediation.

## II. LEGAL STANDARD

Transfers of personal data to a third country require an adequacy decision or appropriate safeguards under Chapter V of the GDPR (Arts. 44–46). Following Schrems II, exporters relying on SCCs must assess the destination country's protections and adopt supplementary measures where necessary.

## III. ANALYSIS

### A. No executed transfer mechanism
The master agreement references SCCs but the annexes are incomplete, and Cloudspan's Data Privacy Framework certification is unverified.

### B. No transfer impact assessment
No assessment of U.S. surveillance law has been performed, and no supplementary measures are documented.

### C. Non-compliant breach notification
The 14-day notice term is incompatible with the controller's 72-hour obligation under Art. 33.

## IV. RECOMMENDATION

Pause the transfer until Meridian executes SCCs with completed annexes, completes a transfer impact assessment, and revises the breach-notification timeline.`,
    }
  },
  {
    id: '51',
    type: 'document',
    title: 'SEC Comment Letter Response',
    date: 'February 20, 2026 at 4:30 PM',
    path: '/workspace/sec-climate-disclosure-program',
    workspace: 'SEC Climate Disclosure Program',
    chatTitle: 'Research on SEC climate rules',
    preview: {
      title: 'SEC Comment Letter Response',
      type: 'document',
      content: `# RESPONSE TO STAFF COMMENT LETTER

**Re:** Meridian Financial Group, Inc. — Form 10-K
**Response to Staff Comment Letter dated February 9, 2026**

---

## CLIMATE-RELATED DISCLOSURES

**Comment 1.** Please expand your governance disclosure to identify the responsible board committee and the frequency of management reporting.

**Response.** The Board's Risk Committee oversees climate-related risks and receives reports from the Chief Risk Officer on at least a quarterly basis. The Company will revise its disclosure in future filings accordingly.

## GREENHOUSE GAS METRICS

**Comment 3.** Please disclose the organizational boundaries, methodology, emission factors, and assurance status of your Scope 1 and Scope 2 metrics.

**Response.** The Company calculates emissions using the operational control approach consistent with the GHG Protocol and currently obtains limited assurance. The Company will expand its disclosure to describe boundaries, methodology, and the assurance phase-in.

## CONCLUSION

The Company believes these responses, together with the revised disclosures it will include in future filings, are fully responsive to the Staff's comments.`,
    }
  },
  {
    id: '52',
    type: 'document',
    title: 'Climate Risk Disclosure Memo',
    date: 'February 11, 2026 at 11:15 AM',
    path: '/workspace/sec-climate-disclosure-program',
    workspace: 'SEC Climate Disclosure Program',
    chatTitle: 'Research on SEC climate rules',
    preview: {
      title: 'Climate Risk Disclosure Memo',
      type: 'document',
      content: `# MEMORANDUM — CLIMATE RISK DISCLOSURE OBLIGATIONS

**RE:** Disclosure obligations under Regulation S-K Items 1500–1507

---

## Summary

This memo outlines the Company's disclosure obligations for climate-related risks and greenhouse gas metrics in the Form 10-K, including governance, strategy, risk management, and metrics.

## Key Requirements

- **Governance (Item 1501):** Describe board oversight and management's role.
- **Strategy (Item 1502):** Disclose material climate-related risks and impacts.
- **Risk Management (Item 1503):** Describe processes for identifying and managing risks.
- **Metrics (Items 1504–1505):** Present Scope 1 and Scope 2 emissions gross, with methodology and boundaries.
- **Assurance (Item 1506):** Disclose assurance status, subject to phase-in.

## Recommendation

Ensure disclosures are specific, consistent year over year, and clearly describe the assurance status of emissions metrics.`,
    }
  },
  {
    id: '53',
    type: 'document',
    title: 'Vendor Data Processing Agreement — Draft',
    date: 'February 9, 2026 at 11:15 AM',
    path: '/workspace/vendor-dpa-remediation',
    workspace: 'Vendor DPA Remediation',
    chatTitle: 'Third-party data-sharing risk analysis',
    preview: {
      title: 'Vendor Data Processing Agreement — Draft',
      type: 'document',
      content: `# DATA PROCESSING AGREEMENT (DRAFT)

This Data Processing Agreement ("DPA") supplements the services agreement between Meridian Financial Group, Inc. ("Controller") and the Vendor ("Processor").

## 1. Subject Matter and Duration
The Processor processes personal data on behalf of the Controller only for the documented purposes set out in Annex I.

## 2. Processor Obligations (Art. 28)
The Processor shall process personal data only on documented instructions, ensure confidentiality, and implement appropriate technical and organizational measures.

## 3. Sub-processing
The Processor shall not engage a sub-processor without prior authorization and shall impose flow-down obligations equivalent to this DPA.

## 4. International Transfers
Any transfer of personal data to a third country shall be subject to executed Standard Contractual Clauses and a documented transfer impact assessment.

## 5. Personal Data Breach
The Processor shall notify the Controller without undue delay, and in any event within a timeframe enabling the Controller to meet its 72-hour obligation under GDPR Art. 33.`,
    }
  },
  {
    id: '13',
    type: 'artifact',
    title: 'CCPA Consumer Rights Playbook',
    date: 'February 3, 2026 at 3:10 PM',
    path: '/chat/13',
    workspace: 'CCPA & State Privacy Compliance',
    chatTitle: 'CCPA opt-out compliance review',
    preview: {
      title: 'CCPA Consumer Rights Playbook',
      type: 'document',
      content: `# CCPA/CPRA CONSUMER RIGHTS PLAYBOOK

## Rights Covered
- Right to know / access
- Right to delete (subject to exceptions)
- Right to correct
- Right to opt out of sale and sharing
- Right to limit use of sensitive personal information

## Opt-Out Implementation
- Provide a "Do Not Sell or Share My Personal Information" link.
- Honor Global Privacy Control (GPC) signals automatically.
- Separate the "sharing" (cross-context behavioral advertising) opt-out from the "sale" opt-out.

## Service Providers
- Ensure service provider contracts include the restrictions required by Cal. Civ. Code § 1798.140(ag) so disclosures are not treated as a "sale".

## Response Timelines
- Acknowledge requests within 10 business days; respond within 45 days (extendable by 45).`,
    }
  },

  // ── Files ──────────────────────────────────────────────
  {
    id: '31',
    type: 'file',
    title: 'Cloud Services Agreement - Cloudspan.pdf',
    date: 'February 3, 2026',
    path: '/workspace/gdpr-cross-border-data-transfer-review',
    workspace: 'GDPR Cross-Border Data Transfer Review',
    chatTitle: 'Contract review analysis',
    preview: {
      title: 'Cloud Services Agreement - Cloudspan.pdf',
      type: 'text',
      content: `CLOUD SERVICES AGREEMENT

This Cloud Services Agreement is entered into between Meridian Financial Group, Inc. ("Customer") and Cloudspan Inc. ("Provider").

1. Services. Provider will host and process Customer data in accordance with the applicable order form and this Agreement.

2. Data Protection. The parties acknowledge that processing of personal data is subject to a Data Processing Addendum. [Note: DPA annexes incomplete.]

3. Cross-Border Transfers. The parties agree that Standard Contractual Clauses apply to transfers of personal data outside the EEA. [Note: SCC annexes not attached.]

4. Security. Provider will implement appropriate technical and organizational measures. [Note: TOMs annex missing.]

5. Breach Notification. Provider will notify Customer of a personal data breach within fourteen (14) days. [Note: incompatible with 72-hour controller obligation.]`,
    }
  },
  {
    id: '32',
    type: 'file',
    title: 'Privacy Impact Assessment.pdf',
    date: 'January 29, 2026',
    path: '/workspace/gdpr-cross-border-data-transfer-review',
    workspace: 'GDPR Cross-Border Data Transfer Review',
    chatTitle: 'Summary of vendor interview',
    preview: {
      title: 'Privacy Impact Assessment.pdf',
      type: 'text',
      content: `DATA PROTECTION IMPACT ASSESSMENT (DPIA)

Processing Activity: Transfer of EU customer data to Cloudspan Inc. (U.S.)

1. Description of Processing: Hosting and processing of EEA customer account data in U.S. data centers.

2. Necessity and Proportionality: Hosting is necessary to deliver the platform; data minimization controls require review.

3. Risks to Data Subjects: Government access in the destination country; lack of executed transfer safeguards; extended breach-notification window.

4. Mitigating Measures: Execute SCCs, implement encryption with exporter-held keys, and revise breach-notification timelines.

Residual Risk: HIGH until safeguards are executed.`,
    }
  },
  {
    id: '33',
    type: 'file',
    title: 'Vendor_Correspondence_001.pst',
    date: 'February 1, 2026',
    path: '/workspace/vendor-dpa-remediation',
    workspace: 'Vendor DPA Remediation',
    chatTitle: 'Third-party data-sharing risk analysis',
    preview: {
      title: 'Vendor_Correspondence_001.pst',
      type: 'text',
      content: `OUTLOOK DATA FILE (.pst)

Custodian: Cloudspan Inc.
Date Range: Jan 2024 – Dec 2025
Item Count: 1,402

This archive contains vendor correspondence regarding data processing terms, security questionnaires, and sub-processor disclosures. Use the document-set analysis tool to search and review contents.`,
    }
  },
  {
    id: '36',
    type: 'file',
    title: 'Q3_Financials.xlsx',
    date: 'January 25, 2026',
    path: '/workspace/project-harbor-fintech-acquisition-diligence',
    workspace: 'Project Harbor — Fintech Acquisition Diligence',
    chatTitle: 'Due diligence',
    preview: {
      title: 'Q3_Financials.xlsx',
      type: 'text',
      content: `FINANCIAL STATEMENTS — Q3

Target: Sterling Capital

Contents:
• Income statement
• Balance sheet
• Loan portfolio summary
• Regulatory capital ratios

Prepared for regulatory diligence in Project Harbor.`,
    }
  },

  // ── Tables ─────────────────────────────────────────────
  {
    id: '41',
    type: 'table',
    title: 'Vendor Risk Register',
    date: 'February 6, 2026',
    path: '/workspace/vendor-dpa-remediation',
    workspace: 'Vendor DPA Remediation',
    chatTitle: 'Third-party data-sharing risk analysis',
    preview: {
      title: 'Vendor Risk Register',
      type: 'table',
      content: `Vendor  Data Category  Transfer Mechanism  Risk  Status
Cloudspan Inc.  EU customer data  SCC (incomplete)  High  Remediation
Beacon Analytics  Account identifiers  None documented  High  Open
Atlas Payments LLC  Payment data  SCC (executed)  Medium  Monitoring
Sterling Capital  Loan data  Pending diligence  Medium  Open`,
    }
  },
  {
    id: '42',
    type: 'table',
    title: 'Data Inventory & Mapping',
    date: 'January 27, 2026',
    path: '/workspace/gdpr-cross-border-data-transfer-review',
    workspace: 'GDPR Cross-Border Data Transfer Review',
    chatTitle: 'Summary of vendor interview',
    preview: {
      title: 'Data Inventory & Mapping',
      type: 'table',
      content: `System  Data Type  Location  Lawful Basis  Retention
Account platform  Customer PII  US East  Contract  7 years
Marketing CRM  Contact data  EU  Consent  Until withdrawal
Analytics pipeline  Pseudonymized IDs  US East  Legitimate interest  24 months
Backup store  Customer PII  US West  Contract  7 years`,
    }
  },
  {
    id: '43',
    type: 'table',
    title: 'Compliance Obligations Tracker',
    date: 'February 6, 2026',
    path: '/workspace/sec-climate-disclosure-program',
    workspace: 'SEC Climate Disclosure Program',
    chatTitle: 'Research on SEC climate rules',
    preview: {
      title: 'Compliance Obligations Tracker',
      type: 'table',
      content: `Requirement  Rule  Owner  Due  Status
Governance disclosure  S-K Item 1501  Securities  Q1 2026  In progress
Risk disclosure  S-K Item 1502  Securities  Q1 2026  In progress
GHG metrics  S-K Item 1505  ESG  Q1 2026  Drafting
Assurance  S-K Item 1506  ESG  Phase-in  Planned`,
    }
  },
];
