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
    // Default to draft comment-response content
    return {
      step1: `Okay, so I need to draft a response to the SEC comment letter on climate disclosures. Let me think through this step by step.`,
      step2Title: `First, I'll review the project files to get a clear picture of the filing. I'm looking for:`,
      step2Items: [
        'What each staff comment is asking the company to clarify or revise',
        'The relevant disclosure language already in the filing',
        'Specific facts I can use to support each response'
      ],
      step3: `I should check Practical Law for comment-response templates and make sure I'm following the expected format. Don't want to miss any procedural requirements that could prompt a follow-up comment.`,
      step4Title: `Now I'll search Westlaw and the rules for the controlling authorities on each comment. I need:`,
      step4Items: [
        'The specific Regulation S-K items that govern each disclosure',
        'Recent SEC guidance and interpretive releases on point',
        'Any phase-in provisions that affect the company\'s obligations'
      ],
      step5: `Finally, I'll pull this together into a clear response. I need to map each comment to the governing rule, cite the controlling authority, and explain the revisions the company will make in future filings.`
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
    if (topicLower.includes('disclosure') || topicLower.includes('climate') || topicLower.includes('sec')) {
      return {
        items: [
          { icon: 'BookOpen', title: 'SEC Climate Disclosure Rules - Practical Law', domain: 'practicallaw.com' },
          { icon: 'Scale', title: 'Regulation S-K Items 1500-1507 Analysis', domain: 'westlaw.com' },
          { icon: 'BookOpen', title: 'GHG Emissions Disclosure Framework - Research Guide', domain: 'practicallaw.com' },
          { icon: 'Scale', title: 'SEC Final Rule: Climate-Related Disclosures', domain: 'sec.gov' },
          { icon: 'FileCheck', title: 'Assurance Phase-In Requirements', domain: 'sec.gov' },
          { icon: 'Scale', title: 'Recent Staff Comment Letter Trends', domain: 'westlaw.com' }
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
    // Default comment-response sources
    return {
      items: [
        { icon: 'BookOpen', title: 'Responding to SEC Comment Letters - Practical Law', domain: 'practicallaw.com' },
        { icon: 'Scale', title: 'Regulation S-K Climate Disclosure Requirements', domain: 'westlaw.com' },
        { icon: 'BookOpen', title: 'Securities Disclosure: Staff Comment Process', domain: 'practicallaw.com' },
        { icon: 'FileCheck', title: 'Regulation S-K Items 1500-1507', domain: 'sec.gov' },
        { icon: 'Scale', title: 'Recent Guidance: GHG Emissions Metrics', domain: 'westlaw.com' },
        { icon: 'FileCheck', title: 'SEC Final Rule on Climate-Related Disclosures', domain: 'sec.gov' }
      ]
    };
  }
}
