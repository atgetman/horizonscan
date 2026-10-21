import type { SupportingDocFileType } from '../ui/SupportingDocChip';

export interface RedlineSegment {
  text: string;
  change?: 'deleted' | 'inserted';
}

export interface RedlineClause {
  heading: string;
  segments: RedlineSegment[];
  driver: string;
  rationale: string;
}

export interface AffectedDocument {
  name: string;
  fileType: SupportingDocFileType;
  workspace: string;
  clauses: RedlineClause[];
}

const AI_GOV_DOCUMENTS: AffectedDocument[] = [
  {
    name: 'AI Governance Policy.docx',
    fileType: 'docx',
    workspace: 'AI Governance',
    clauses: [
      {
        heading: 'Section 5.2 — Bias testing of employment tools',
        segments: [
          { text: 'Any AI system used to screen, rank, or assess candidates or employees shall be tested for bias ' },
          { text: 'at the discretion of the system owner', change: 'deleted' },
          { text: 'by an independent auditor before deployment and at least annually thereafter, with a summary of results published on the careers site', change: 'inserted' },
          { text: '.' },
        ],
        driver: 'NYC Local Law 144',
        rationale: 'Local Law 144 requires an independent bias audit within one year before use and public posting of the audit summary. Discretionary testing does not meet that standard.',
      },
      {
        heading: 'Section 7.1 — Notice to candidates and employees',
        segments: [
          { text: 'The Company ' },
          { text: 'may', change: 'deleted' },
          { text: 'shall', change: 'inserted' },
          { text: ' notify individuals when an automated employment decision tool is used' },
          { text: ' at least 10 business days before use, describing the job qualifications assessed and how to request an alternative process', change: 'inserted' },
          { text: '.' },
        ],
        driver: 'NYC Local Law 144 · Illinois HB 3773',
        rationale: 'Notice is now mandatory in New York City and Illinois, with specific timing and content. Permissive language leaves the Company out of compliance.',
      },
      {
        heading: 'Section 9.3 — Human oversight of consequential decisions',
        segments: [
          { text: 'Hiring, promotion, and termination decisions informed by AI ' },
          { text: 'should be reviewed where practical', change: 'deleted' },
          { text: 'must be reviewed by a qualified person who can override the output, and affected individuals may appeal an adverse decision', change: 'inserted' },
          { text: '.' },
        ],
        driver: 'Colorado AI Act (SB 24-205)',
        rationale: 'The Colorado AI Act treats employment as a consequential decision and requires a right to correct data and appeal adverse outcomes with human review.',
      },
    ],
  },
  {
    name: 'Bias Testing Log (Q1 2026).docx',
    fileType: 'docx',
    workspace: 'AI Governance',
    clauses: [
      {
        heading: 'Testing methodology',
        segments: [
          { text: 'Selection rates are compared across ' },
          { text: 'sex', change: 'deleted' },
          { text: 'sex, race/ethnicity, and intersectional categories, with impact ratios calculated for each category', change: 'inserted' },
          { text: '.' },
        ],
        driver: 'NYC Local Law 144',
        rationale: 'Required bias audits must report selection rates and impact ratios by sex, race/ethnicity, and intersectional categories.',
      },
      {
        heading: 'Record retention',
        segments: [
          { text: 'Test inputs and results are retained for ' },
          { text: 'one year', change: 'deleted' },
          { text: 'four years', change: 'inserted' },
          { text: ' from the date of the decision.' },
        ],
        driver: 'California Civil Rights Council ADS rules',
        rationale: 'California’s automated-decision system rules extend recordkeeping for ADS data to four years.',
      },
    ],
  },
  {
    name: 'Model Inventory (Q2 2026).docx',
    fileType: 'docx',
    workspace: 'AI Governance',
    clauses: [
      {
        heading: 'Inventory fields',
        segments: [
          { text: 'Each model entry records the owner, vendor, and purpose' },
          { text: ', whether the model is used in a consequential employment decision, and the jurisdictions where it is deployed', change: 'inserted' },
          { text: '.' },
        ],
        driver: 'Colorado AI Act (SB 24-205)',
        rationale: 'Deployers must identify high-risk systems used in consequential decisions to scope impact assessments and notices.',
      },
    ],
  },
  {
    name: 'AI Use Case Intake Form.docx',
    fileType: 'docx',
    workspace: 'AI Governance',
    clauses: [
      {
        heading: 'Question 6 — Employment use',
        segments: [
          { text: 'Will this tool be used in hiring, promotion, or performance evaluation? ' },
          { text: 'If yes, identify the states where affected workers are located and whether video interviews are analyzed.', change: 'inserted' },
        ],
        driver: 'Illinois AI Video Interview Act',
        rationale: 'Illinois requires consent and disclosure before AI analysis of video interviews, so intake must capture this upfront.',
      },
    ],
  },
  {
    name: 'Risk Management Framework.docx',
    fileType: 'docx',
    workspace: 'AI Governance',
    clauses: [
      {
        heading: 'Section 4 — Risk program alignment',
        segments: [
          { text: 'The program follows ' },
          { text: 'internal best practices', change: 'deleted' },
          { text: 'the NIST AI Risk Management Framework, which supports the affirmative defense available under the Colorado AI Act and Texas TRAIGA', change: 'inserted' },
          { text: '.' },
        ],
        driver: 'Colorado AI Act · Texas TRAIGA',
        rationale: 'Both statutes recognize alignment with a nationally recognized framework such as NIST AI RMF as a defense or safe harbor.',
      },
    ],
  },
  {
    name: 'Colorado Gap Assessment.docx',
    fileType: 'docx',
    workspace: 'AI Governance',
    clauses: [
      {
        heading: 'Effective date and runway',
        segments: [
          { text: 'Obligations take effect ' },
          { text: 'February 1, 2026', change: 'deleted' },
          { text: 'June 30, 2026', change: 'inserted' },
          { text: ', following the legislature’s delay of the original effective date.' },
        ],
        driver: 'Colorado AI Act (SB 24-205)',
        rationale: 'The effective date was pushed back, which changes remediation sequencing in the assessment.',
      },
    ],
  },
  {
    name: 'Annual Impact Assessment Template.docx',
    fileType: 'docx',
    workspace: 'AI Governance',
    clauses: [
      {
        heading: 'Section 2 — Required contents',
        segments: [
          { text: 'Each assessment describes the system’s purpose and benefits' },
          { text: ', known risks of algorithmic discrimination, data categories processed, performance metrics, and post-deployment monitoring safeguards', change: 'inserted' },
          { text: '.' },
        ],
        driver: 'Colorado AI Act (SB 24-205)',
        rationale: 'Deployers must complete annual impact assessments with these specific elements for each high-risk system.',
      },
    ],
  },
];

const MA_DOCUMENTS: AffectedDocument[] = [
  'Stock Purchase Agreement',
  'Asset Purchase Agreement',
  'Merger Agreement',
  'Disclosure Schedules',
  'Mutual NDA',
  'Escrow Agreement',
  'Transition Services Agreement',
].map((title) => ({
  name: `${title}.docx`,
  fileType: 'docx' as const,
  workspace: 'M&A templates',
  clauses: [
    {
      heading: 'Regulatory approvals',
      segments: [
        { text: 'Each party shall file any required premerger notification ' },
        { text: 'within 30 days', change: 'deleted' },
        { text: 'within 10 business days, including the expanded transaction disclosures now required', change: 'inserted' },
        { text: ' after signing.' },
      ],
      driver: 'HSR premerger notification rule',
      rationale: 'The updated HSR form requires more transaction detail, so filing timelines and covenants need to account for added preparation.',
    },
    {
      heading: 'Restrictive covenants',
      segments: [
        { text: 'Seller shall not compete with the Business ' },
        { text: 'anywhere in the United States for five years', change: 'deleted' },
        { text: 'in the markets where the Business operates for a period reasonable in light of the goodwill acquired', change: 'inserted' },
        { text: '.' },
      ],
      driver: 'State non-compete limits',
      rationale: 'Overbroad sale-of-business non-competes face growing state scrutiny; narrowing scope reduces enforceability risk.',
    },
  ],
}));

export function getAffectedDocuments(variant: 'ma' | 'ai-gov'): AffectedDocument[] {
  return variant === 'ai-gov' ? AI_GOV_DOCUMENTS : MA_DOCUMENTS;
}

export function countChanges(doc: AffectedDocument): number {
  return doc.clauses.reduce(
    (total, clause) => total + clause.segments.filter((segment) => segment.change === 'inserted' || segment.change === 'deleted').length,
    0,
  );
}
