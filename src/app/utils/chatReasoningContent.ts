// Dynamic chat reasoning content based on task type

export interface ReasoningContent {
  step1: string;
  step2Title: string;
  step2Items: string[];
  step3: string;
  step4Title: string;
  step4Items: string[];
  step5: string;
}

export function getReasoningContent(
  taskType: 'draft' | 'research' | 'analyze' | 'regulatory-scan' | 'cpc-analysis',
  topic: string
): ReasoningContent {
  if (taskType === 'cpc-analysis') {
    return {
      step1: `I'll initiate a Cross-Product Clause analysis to identify all documents and clauses affected by ${topic || 'this regulatory change'}.`,
      step2Title: `First, I'll scan your document library for affected templates:`,
      step2Items: [
        'M&A agreement templates and deal documents',
        'Due diligence checklists and schedules',
        'Disclosure templates and rep & warranty provisions'
      ],
      step3: `Now I'll analyze each document to identify specific clauses that require updates based on the new regulatory requirements.`,
      step4Title: `I'm cross-referencing affected clauses with the regulatory changes:`,
      step4Items: [
        'Mapping clause language to regulatory requirements',
        'Identifying required disclosure updates',
        'Flagging high-risk provisions needing immediate attention'
      ],
      step5: `Finally, I'll compile recommended redlines and updates for each affected document, prioritized by impact level.`
    };
  } else if (taskType === 'regulatory-scan') {
    return {
      step1: `To conduct a comprehensive regulatory horizon scan, I'll identify the practice area and jurisdiction scope based on your workspace documents.`,
      step2Title: `I'll query federal regulatory databases for recent changes:`,
      step2Items: [
        'SEC final rules and proposed changes',
        'CFPB consumer protection regulations',
        'FTC enforcement actions and policy updates'
      ],
      step3: `I'll check state-level regulatory updates in relevant jurisdictions to capture regional compliance requirements.`,
      step4Title: `Now I'll analyze the potential impact of each change on your contract templates:`,
      step4Items: [
        'Which documents are affected by each regulatory change',
        'Specific clauses that need updating',
        'Risk assessment based on effective dates'
      ],
      step5: `Finally, I'll prioritize findings by severity and effective date to help you address the most critical updates first.`
    };
  } else if (taskType === 'research') {
    return {
      step1: `Okay, I need to research ${topic || 'this legal issue'}. Let me think through this systematically to find the most relevant authorities and analysis.`,
      step2Title: `First, I'll identify the key legal questions and framework. I'm looking for:`,
      step2Items: [
        'The controlling legal standards and tests that courts apply',
        'Any recent developments or changes in the law',
        'Jurisdictional variations that might affect the analysis'
      ],
      step3: `I should check Practical Law for research guides and make sure I understand the current state of the law. This will help me structure my research strategy efficiently.`,
      step4Title: `Now I'll search Westlaw and other legal databases for the most authoritative sources. I need:`,
      step4Items: [
        'Supreme Court and circuit court decisions establishing the framework',
        'Recent cases applying the law to similar fact patterns',
        'Law review articles and secondary sources for deeper analysis'
      ],
      step5: `Finally, I'll synthesize this into a comprehensive analysis. I need to organize the authorities by issue, identify any splits in authority, and provide clear guidance on how the law applies to our situation.`
    };
  } else if (taskType === 'analyze') {
    return {
      step1: `I need to analyze these materials carefully. Let me break this down step by step to identify the key issues and supporting evidence.`,
      step2Title: `First, I'll review all the relevant documents systematically. I'm looking for:`,
      step2Items: [
        'Key facts and timeline of events',
        'Relevant contractual provisions or legal obligations',
        'Strengths and weaknesses in the available evidence'
      ],
      step3: `I should check Practical Law for analytical frameworks and checklists to ensure I'm not missing any important considerations.`,
      step4Title: `Now I'll cross-reference the facts against legal standards. I need to:`,
      step4Items: [
        'Identify which legal elements are supported by the evidence',
        'Spot any gaps or inconsistencies in the record',
        'Consider alternative interpretations and counterarguments'
      ],
      step5: `Finally, I'll pull this together into a clear assessment with specific recommendations. I need to highlight the strongest arguments, flag potential issues, and provide a realistic evaluation of the position.`
    };
  } else {
    // Default to draft motion content
    return {
      step1: `Okay, so I need to draft a Motion to Dismiss based on lack of personal jurisdiction. Let me think through this step by step.`,
      step2Title: `First, I'll review the project files to get a clear picture of the case. I'm looking for:`,
      step2Items: [
        'What the complaint alleges about the defendant\'s contacts with the forum',
        'Any precedents or similar cases we\'ve dealt with before',
        'Specific facts I can use to challenge jurisdiction'
      ],
      step3: `I should check Practical Law for motion templates and make sure I'm following the right procedural format. Don't want to miss any technical requirements that could get this kicked back.`,
      step4Title: `Now I'll search Westlaw for the strongest authorities on personal jurisdiction. I need:`,
      step4Items: [
        'Recent cases with similar fact patterns',
        'Circuit-specific precedents that favor our position',
        'Any Supreme Court decisions that support dismissal'
      ],
      step5: `Finally, I'll pull this together into a compelling argument. I need to select the most persuasive authorities, distinguish any cases that might hurt our position, and craft a narrative showing why the court clearly lacks jurisdiction over the defendant.`
    };
  }
}

export interface SourceContent {
  items: Array<{
    icon: 'BookOpen' | 'Scale' | 'FileCheck';
    title: string;
    domain: string;
  }>;
}

export function getSourceContent(
  taskType: 'draft' | 'research' | 'analyze' | 'regulatory-scan' | 'cpc-analysis',
  topic: string
): SourceContent {
  const topicLower = topic.toLowerCase();

  if (taskType === 'cpc-analysis') {
    return {
      items: [
        { icon: 'FileCheck', title: 'M&A Purchase Agreement Template', domain: 'workspace' },
        { icon: 'FileCheck', title: 'Due Diligence Checklist - Regulatory', domain: 'workspace' },
        { icon: 'FileCheck', title: 'Disclosure Schedule Template', domain: 'workspace' },
        { icon: 'Scale', title: 'Rep & Warranty Provisions Library', domain: 'workspace' },
        { icon: 'BookOpen', title: 'Regulatory Change Summary', domain: 'federalregister.gov' },
        { icon: 'BookOpen', title: 'Compliance Requirements Update', domain: 'regulations.gov' }
      ]
    };
  } else if (taskType === 'regulatory-scan') {
    return {
      items: [
        { icon: 'FileCheck', title: 'Final Rules & Proposed Changes - Federal Register', domain: 'federalregister.gov' },
        { icon: 'Scale', title: 'Climate Disclosure Rules - SEC', domain: 'sec.gov' },
        { icon: 'FileCheck', title: 'Consumer Data Rights Rule - CFPB', domain: 'consumerfinance.gov' },
        { icon: 'Scale', title: 'Non-Compete Ban Updates - FTC', domain: 'ftc.gov' },
        { icon: 'BookOpen', title: 'Federal Rulemaking Database - Regulations.gov', domain: 'regulations.gov' },
        { icon: 'BookOpen', title: 'Regulatory Intelligence - Thomson Reuters', domain: 'thomsonreuters.com' }
      ]
    };
  } else if (taskType === 'research') {
    // Research-specific sources
    if (topicLower.includes('jurisdiction')) {
      return {
        items: [
          { icon: 'BookOpen', title: 'Personal Jurisdiction Standards - Practical Law', domain: 'practicallaw.com' },
          { icon: 'Scale', title: 'International Shoe v. Washington Analysis', domain: 'westlaw.com' },
          { icon: 'BookOpen', title: 'Minimum Contacts Framework - Research Guide', domain: 'practicallaw.com' },
          { icon: 'Scale', title: 'Daimler AG v. Bauman (Supreme Court)', domain: 'supremecourt.gov' },
          { icon: 'FileCheck', title: 'Federal Rules of Civil Procedure - Rule 12(b)(2)', domain: 'uscourts.gov' },
          { icon: 'Scale', title: 'Recent Circuit Decisions on Personal Jurisdiction', domain: 'westlaw.com' }
        ]
      };
    } else if (topicLower.includes('gdpr') || topicLower.includes('privacy')) {
      return {
        items: [
          { icon: 'BookOpen', title: 'GDPR Compliance Overview - Practical Law', domain: 'practicallaw.com' },
          { icon: 'FileCheck', title: 'General Data Protection Regulation (Official Text)', domain: 'eur-lex.europa.eu' },
          { icon: 'Scale', title: 'Schrems II Decision Analysis', domain: 'westlaw.com' },
          { icon: 'BookOpen', title: 'Data Subject Rights Guide', domain: 'practicallaw.com' },
          { icon: 'FileCheck', title: 'EDPB Guidelines and Recommendations', domain: 'edpb.europa.eu' },
          { icon: 'Scale', title: 'Cross-Border Data Transfer Requirements', domain: 'westlaw.com' }
        ]
      };
    } else if (topicLower.includes('employment')) {
      return {
        items: [
          { icon: 'BookOpen', title: 'Employment Discrimination Prima Facie Case - Practical Law', domain: 'practicallaw.com' },
          { icon: 'Scale', title: 'McDonnell Douglas Burden-Shifting Framework', domain: 'westlaw.com' },
          { icon: 'FileCheck', title: 'Title VII of the Civil Rights Act', domain: 'eeoc.gov' },
          { icon: 'Scale', title: 'Recent Circuit Split on Comparator Evidence', domain: 'westlaw.com' },
          { icon: 'BookOpen', title: 'Pretext Analysis Standards', domain: 'practicallaw.com' },
          { icon: 'Scale', title: 'State Human Rights Law Comparison', domain: 'westlaw.com' }
        ]
      };
    } else {
      // Generic research sources
      return {
        items: [
          { icon: 'BookOpen', title: `${topic} - Research Guide`, domain: 'practicallaw.com' },
          { icon: 'Scale', title: 'Leading Cases and Authorities', domain: 'westlaw.com' },
          { icon: 'BookOpen', title: 'Legal Framework Overview', domain: 'practicallaw.com' },
          { icon: 'FileCheck', title: 'Relevant Statutes and Regulations', domain: 'law.cornell.edu' },
          { icon: 'Scale', title: 'Recent Case Law Developments', domain: 'westlaw.com' },
          { icon: 'BookOpen', title: 'Practice Notes and Commentary', domain: 'practicallaw.com' }
        ]
      };
    }
  } else {
    // Default motion sources
    return {
      items: [
        { icon: 'BookOpen', title: 'Motion to Dismiss for Lack of Personal Jurisdiction - Practical Law', domain: 'practicallaw.com' },
        { icon: 'Scale', title: 'Personal Jurisdiction Standards and Requirements', domain: 'westlaw.com' },
        { icon: 'BookOpen', title: 'Federal Civil Procedure: Jurisdiction Challenges', domain: 'practicallaw.com' },
        { icon: 'FileCheck', title: 'Federal Rules of Civil Procedure - Rule 12(b)(2)', domain: 'uscourts.gov' },
        { icon: 'Scale', title: 'Recent Case Law: Minimum Contacts Analysis', domain: 'westlaw.com' },
        { icon: 'FileCheck', title: 'Supreme Court Decisions on Personal Jurisdiction', domain: 'supremecourt.gov' }
      ]
    };
  }
}
